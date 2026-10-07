---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miele-local/README_de.md
title: ioBroker.miele-local
hash: TmQ6r+Jh/fKIX0P8RlkR/0lT3RBrspxP6+eujw/f4ds=
---
![Logo](../../../en/adapterref/iobroker.miele-local/admin/miele-local.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.miele-local.svg)
![Lizenz: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

# ioBroker.miele-local

_Diese Dokumentation in einer anderen Sprache lesen: [Englische Dokumentation](/#/adapters/miele-local) ._

Dieser Adapter verbindet moderne **Miele\@Home** -Geräte **lokal ohne Internet** . Er spricht das lokale Miele-Protokoll (`MieleH256` / DOP2) direkt über das LAN – kein Cloud-Konto im laufenden Betrieb, kein Umweg über die Miele 3rd-Party-Cloud-API.

> Der einmalige **Login** mit dem Miele-Konto dient nur dazu, den haushaltsweiten lokalen Schlüssel (GroupID/GroupKey) abzurufen. Danach läuft der Adapter komplett offline und die Miele-App funktioniert unverändert weiter.

**Was er tut:** Er liest den Zustand jedes Geräts im Klartext, schreibt jedes abgeschlossene Programm mitsamt Verbrauch mit und startet, stoppt und pausiert die Geräte, wenn man es erlaubt. **Was er braucht:** eine einmalige Anmeldung und entweder mDNS im Netz oder die IP-Adressen.

## Schnellstart

1. Adapter installieren und eine Instanz anlegen.
2. Im Reiter **Anmeldung** das Land wählen und den drei Schritten unten folgen.
3. Die abgefangene `miele://…` -Adresse einfügen und auf **GroupKey ermitteln** klicken.
4. Speichern. Der Adapter findet die Geräte und legt ihre Datenpunkte an.

Läuft ioBroker in einem Docker-Container mit Bridge-Netz, findet die Suche nichts – dann die IP-Adressen im Reiter **Geräte** von Hand eintragen. Siehe [Netz](#netz-ports-docker-push) .

### Die Anmeldung, Schritt für Schritt

Die letzte Adresse benutzte das `miele://` -Schema der Handy-App. Browser am Rechner kann sie nicht öffnen, deshalb bleibt die Seite bei einem drehenden Rad stehen und man liest die Adresse selbst aus dem Browser heraus.

1. **Entwicklertools vorbereiten.** Auf **Login-Seite öffnen** klicken – ein neuer Reiter geht auf. Dort **F12** drücken, auf **Netzwerk** wechseln und das Protokoll beibehalten:
   - **Chrome / Edge / Brave:** Haken bei **Log beibehalten** (Preserve log).
   - **Firefox:** Zahnrad ⚙️ → **Protokolle dauerhaft anzeigen** (Persist Logs).
2. **Anmelden.** E-Mail und Passwort des Miele-App-Kontos eingeben. Danach bleibt die Seite bei einem drehenden Rad stehen oder meldet einen Ladefehler – genau so sieht hier Erfolg aus.
3. **Adresse kopieren.** Im Netzwerk-Reiter ganz nach unten zur letzten (meist rot markierten) Zeile scrollen; Sie beginnt mit `redirect?redirect_uri=miele…` Oder `miele://oauth2-code/…`. Rechtsklick → **URL kopieren** , unten in das Feld **miele://-Redirect-URL** einfügen und auf **GroupKey ermitteln** klicken.

GroupID und GroupKey stehen danach in der Instanzkonfiguration, der Schlüssel verschlüsselt. Diese Prozedur braucht man nie wieder.

**Anmeldung scheitert mit `invalid_request … unknown contextId` ?** Mieles Anmeldedienst wechselt beim Login zwischen zwei Domains und verliert die Sitzung, wenn ein Werbeblocker oder ein strenger Schutz vor Drittanbieter-Cookies dazwischenfunkt. Die Login-Seite dann in einem privaten Fenster ohne Erweiterungen öffnen.

**Umzug auf ein anderes System.** GroupID und GroupKey ändern sich nicht. Eine Sicherung der ioBroker-Konfiguration (etwa mit BackItUp) nimmt sie mit; Auf einem frischen System dauert der Login erneut zwei Minuten. Die Admin-Seite zeigt den Schlüssel nur als Platzhalter.

## Was dabei herauskommt

Jedes Gerät wird ein Objekt mit seiner Seriennummer als Kennung sein. Darunter:

### `state` – was das Gerät gerade tut

| Datenpunkt                                             | Bedeutung                                                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                               | Betriebszustand. Die Zahl trägt den Klartext als Werteliste, der Objektbrowser und VIS zeigen deshalb „In Betrieb“ statt `5` Die |
| `statusText`                                           | dasselbe als Text. Bleibt für Aufbauten, die ihn bereits gelesen haben.                                                         |
| `programId` /`programText`                             | dieses Programm                                                                                                                 |
| `programPhase` /`programPhaseText`                     | Phase innerhalb des Programms                                                                                                   |
| `remainingMinutes`, `elapsedMinutes`, `startInMinutes` | Zeiten in Minuten                                                                                                               |
| `remainingSeconds`, `elapsedSeconds`                   | Sekundengenau, wenn eingeschaltet                                                                                               |
| `estimatedEndTime` /`estimatedEndTimeText`             | Voraussichtliches Ende (Zeitstempel in ms /`HH:MM`)                                                                            |
| `temperature`, `targetTemperature` (dazu Zone 2 und 3) | Temperaturen                                                                                                                    |
| `signalDoor`, `signalInfo`, `signalFailure`            | Tür- und Signalmerker                                                                                                           |
| `mobileStart`                                          | ob das Gerät gerade Fernsteuerung annimmt                                                                                       |
| `light`, `spinningSpeed`, `dryingStepText`             | gerätespezifisch                                                                                                                |

Rohwert und `…Text` stehen mit Absicht nebeneinander: Mit der Zahl rechnet und zeichnet man, den Text zeigt man an. Seit 0.3.37 trägt der Rohwert die Klartextliste selbst, der Textdatenpunkt wird damit an den meisten Stellen relevant.

### `info` – was das Gerät ist

`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`, `protocolVersion`, `operatingHours`, dazu die Abfragezähler `pollTotal`, `pollErrors`, `pollRetries`, `pollErrorRate`. In `lastError` steht, woran die letzte Anfrage scheiterte.

### `eco` – Energie und Wasser

`eco.energy`(kWh), `eco.energyWh` (Wh), `eco.water` (l), soweit das Gerät sie liefert, dazu `eco.source` mit der Herkunft des Werts. Gelesen wird über DOP2; Bisher lieferte das Waschmaschinen. **Der vom Gerät gemeldete Wert ist seine eigene Erwartung, keine Messung.** Wer eine echte Zahl will, trägt im Reiter **Abfrage & Werte** den Zähler-Datenpunkt einer Messsteckdose ein – dann schreibt der Adapter mit, was ein Programm wirklich gezogen hat.

### `history` und `stats` – was gelaufen ist

Jedes abgeschlossene Programm wird mit Dauer, Programm, Energie und Wasser festgehalten. Die Geräte selbst heben nichts auf, der Verlauf beginnt auch mit dem Einschalten dieser Funktion und lässt sich nicht rückwirkend füllen. In `history.cyclesJson` stehen die letzten Programme, in `stats.week`, `stats.month`, `stats.year` und `stats.total` die Sommern daneben.

### `control` – nur, wenn man es erlaubt

`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff` Ein `true` löst aus, der Datenpunkt setzt sich selbst zurück. Befehle wirken nur, solange am Gerät **MobileStart / Fernsteuerung** freigegeben ist; Manche Firmwares lehnen DOP2-Schreibbefehle grundsätzlich ab.

## Einstellungen

| Reiter              | Was darin steht                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Anmeldung**       | Land, der geführte Login, die abgefangene Adresse                                          |
| **Geräte**          | mDNS-Suche, Ausfall-Suche im Subnetz, manuelle IP-Adressen                                 |
| **Abfrage & Werte** | Abfrageintervalle, deutsche Namen, Sekundenzeit, EcoFeedback, Energiezähler, interne Werte |
| **Push & Ports**    | der optionale Echtzeitkanal und sein eingehender Port                                      |
| **Steuerung**       | der Schalter, der die beschreibbaren Datenpunkte anlegt                                    |
| **Verlauf**         | Mitschrift abgeschlossenes Programm, Ringpuffer, Aufbewahrung, History-Adapter             |
| **Diagnostizieren** | alles zur Fehlersuche und Feldzuordnung – ab Werk aus                                      |
| **Erweitert**       | GroupID und GroupKey von Hand                                                              |

Jedes Feld trägt seine Erklärung im Admin direkt unter sich; Diese Seite wiederholt sie nicht.

## Netz: Ports, Docker, Push

| Richtung   | Hafen                           | Wozu                                | Nötig                 |
| ---------- | ------------------------------- | ----------------------------------- | --------------------- |
| Ausgeführt | TCP _Push-Port_ (Vorgabe 18082) | Geräteänderungen melden an ioBroker | nur mit Push          |
| ein/aus    | UDP 5353 (mDNS)                 | Gerätesuche und Push-Anmeldung      | für die Suche         |
| aus        | TCP 80 → Geräte                 | Zustände lesen, Befehle senden      | ja                    |
| aus        | TCP 443 → miele-iot.com         | Gruppenschlüssel abrufen            | nur bei der Anmeldung |

Ohne Push ist **kein eingehender Port** nötig. Für mDNS müssen ioBroker und die Geräte im selben Broadcast-Segment liegen. Getrennte IoT-WLANs oder VLANs, Firewalls (auch die Windows-Firewall auf einem Testrechner) und Router, die Multicast-Filter, verhindern die Suche genauso. In all diesen Fällen ist die manuelle IP-Liste der verlässliche Weg.

**Docker.** In einem Container mit Bridge-Netz wird Multicast nicht weitergegeben, die Suche findet auch nichts – die IP-Adressen von Hand eintragen, das Abfragen läuft dann normal. Push funktioniert dort gar nicht, weil die Geräte den Container nicht erreichen: Die Rückadresse liegt hinter NAT. Zuverlässiger Push braucht `network_mode: host` Die

**Wie Push arbeitet.** Der Adapter meldet sich je Gerät als Haushalts-Peer an (`PUT /Devices/<Serie>/SuperVision/<eigene-Fab>`) und abonniert mit einer Rückrufadresse. Das Gerät schickt Änderungen dann von sich aus, im Sekundenbereich. Nicht jedes Modul kann das: Die älteren XKM EK037 und EK057 nehmen das Abonnement an und senden nichts. Das Abfragen bleibt der verlässliche Weg.

## Datenschutz

Der Adapter speichert **keine personenbezogenen Daten** . GroupID, GroupKey und Refresh-Token liegen nur in der verschlüsselten Instanzkonfiguration oder in ioBroker-Objekten. Es wird nichts an Dritte übertragen; Im Normalbetrieb besteht überhaupt keine Cloud-Verbindung.

Eine Ausnahme, die man kennen sollte: Die Datensammlung der Diagnose hält **Anfang und Ende jedes Programms** fest. Das bleibt in der eigenen Instanz – wer die Sammlung oder ihren CSV-Ausdruck weitergibt, gibt diese Zeitpunkte aber mit.

## Kompatibilität und Grenzen

- Geprüft gegen eine Waschmaschine (WCR860/EK037), eine Spülmaschine (G5840/EK037) und einen Backofen (H2469BP/EK057).
- Kühl- und Gefriergeräte sind lokal meist nur lesbar; Die Firmware lehnte Schreibbefehle ab.
- Steuern setzen MobileStart am Gerät voraus; Manche Firmwares antworten auf DOP2-Schreibbefehle mit 404 oder 500.
- EcoFeedback gibt es nicht überall. Die hier geprüfte Spülmaschine führt über kein lesbares Leaf einen Energie- oder Wasserzähler – dort müssen die Werte aus der Cloud kommen.
- Push ist eine Zugabe nach bestem Bemühen, das Abfragen der Normalfall.

## Diagnostizieren

Alles in diesem Abschnitt ist **ab Werk aus** und wird im täglichen Betrieb nicht gebraucht. Es dient einer einzigen Frage: Welches Rohfeld _dieses_ Geräts trägt Energie und Wasser? Die Feldnummern sind je Baureihe verschieden, und die Vorgaben im Adapter stammen von einem WCR860.

**Rohfelder.** Schreibt alle Felder des Eco-Leaf nach `eco.fieldsJson` statt nur der zwei ausgewerteten.

**Datensammlung.** Legt je abgeschlossenem Programm einen Datensatz an – Modell, Programm, alle Rohfelder und am Ende den Schlussstand jedes antwortenden Leafs. Damit sich daraus eine Zuordnung ergibt, braucht der Adapter einen Vergleichswert: entweder aus einem Cloud-Adapter oder nach jedem Programm von Hand in `collection.inputEnergy` und `collection.inputWater` eingetragen. In `collection.progress` steht, was noch fehlt; in `collection.finding` das Ergebnis: welches Feld passt, mit welchem Teiler und wie genau.

**Blatt-Suche.** DOP2 adressiert Daten als `Unit/Attribut`, und nur eine Handvoll dieser Adressen ist überhaupt irgendwo dokumentiert. Die Suche arbeitet den Adressraum schonend genug ab, um das Modul nicht zu überlasten; In `collection.scanJson` sammelte sich, was geantwortet hat. Mit `collection.trendLeaf` Lässt sich ein einzelnes Blatt während eines laufenden Programms engmaschig mitschreiben – das Feld, dessen Wert mit dem Verbrauch mitwächst, ist das Gesuchte.

**CSV-Ausdruck.** Der Knopf im Diagnose-Reiter legt zwei Tabellen im Dateibereich der Instanz ab und öffnet die erste:

- `collection-<Datum>.csv` – eine Zeile je Programm: Zeiten, Programm, die Vergleichswerte, jedes Rohfeld in einer eigenen Spalte, und je Leaf-Feld der Stand bei Anfang, bei Ende und die Differenz dazwischen. Bei Lebenszählern sagt allein die Differenz etwas aus.
- `finding-<Datum>.csv` – eine Zeile je Feld: Übereinstimmung mit dem Vergleichswert, bester Teiler, mittlerer und größter Abweichung. Das ist die Antwort, weil die Sammlung läuft.

Semikolon als Trennzeichen, Komma als Dezimalzeichen, BOM – ein Doppelklick öffnet sie in der Tabellenkalkulation.

**Ein unbekanntes Gerät erkunden.** [docs/geraet-erkunden.md](/#/docs/adapterref/iobroker.miele-local/docs/geraet-erkunden.md) beschreibt das ganze Verfahren der Reihe nach: wann man scannt, woran man eine Abweisung von einem Überlastsignal unterscheidet, wie man eine Zahlenreihe liest, wenn man eine hat, und was ein neu verstandenes Feld braucht, bevor daraus ein Datenpunkt wird. Es hält auch fest, was _nicht_ funktioniert hat, damit es niemand wiederholt.

## Rechtliche Hinweise / Haftungsausschluss

Dies ist ein **inoffizielles, privat entwickeltes** Projekt und steht **in keiner Verbindung zur [Miele & Cie. KG](https://www.miele.com/)** , wird von dieser weder unterstützt noch geprüft. „Miele“, „Miele\@home“ und zugehörige Namen sind Marken der [Miele & Cie. KG](https://www.miele.com/) und werden hier nur beschreibend verwendet, um die Kompatibilität anzugeben. Informationen zu den Geräten selbst gibt es beim Hersteller unter <https://www.miele.com/> .

Der Adapter nutzt ein lokales Protokoll, das durch **Reverse Engineering** öffentlich dokumentiert wurde. Die Nutzung erfolgt **auf eigene Gefahr** ; Je nach Gerät und Firmware können sie Gewährleistungsansprüche berühren. Die Software steht unter der MIT-Lizenz **ohne jede Gewährleistung** (siehe LICENSE). Der Autor haftet nicht für Schäden an Geräten, Daten oder sonstigen Folgen der Nutzung.

## Danksagung

Besonderer Dank gilt **[meistermopper](https://github.com/meistermopper)** , einem erfahrenen ioBroker-Adapterentwickler, der diesen Adapter unaufgefordert durchgesehen und wesentliche Merkmale beigesteuert hat: die periodische Hintergrundsuche für Geräte, die aus der Bereitschaft aufwachen, einen Verbindungszustand je Gerät, korrigierte Rollen und Einheiten, ausdrückliche Vorgabewerte für alle Datenpunkte und die deutsche Dokumentation. Seine Arbeit ist in Version 0.3.0 eingeflossen.

Das lokale Protokoll (`MieleH256`, DOP2, Provisionierung) basiert auf der öffentlichen Reverse-Engineering-Arbeit der Projekte `MieleRESTServer` (akappner), `home-assistant-miele-mobile` und `ha-miele-at-lan` Die

## Danksagung

Die Programm- und Phasentabellen in `lib/enums.js` und die Zuordnung der Gerätetypen stammen aus [Home Assistant](https://github.com/home-assistant/core) (Apache License 2.0, © Home Assistant Authors), übernommen über [ha-miele-at-lan](https://github.com/tiehfood/ha-miele-at-lan) (MIT, © tiehfood) und abgeglichen mit [ioBroker.miele-unbound](https://github.com/meistermopper/ioBroker.miele-unbound) (MIT, © meistermopper). Danke an alle drei Projekte.

## Lizenz

MIT-Lizenz – Copyright (c) 2026 Immanuel <github@freitag.online>

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.3.45
- Die letzte deutsche Datenpunkt-ID ist weg: `eco.quelle` heißt jetzt `eco.source`, der Wert ist immer englisch. Vorhandene Installationen ziehen beim Start um.
- `statusText`, `programText`, `programPhaseText`, `programTypeText` und `dryingStepText` folgen der Option „Deutsche Namen“ - ist sie aus, sind die Texte englisch (bisher immer deutsch).
- Restliche deutsche Log- und Fehlermeldungen übersetzt; die CSV-Dateien heißen `collection-<Datum>.csv` und `finding-<Datum>.csv`.
- Alle JSDoc-Kommentare vollständig (keine Lint-Warnungen mehr); `@iobroker/testing` 6.3.0.
- `eco.felderJson` heißt jetzt `eco.fieldsJson` (Umzug beim Start).
- Einstellungen tragen englische Namen: aus `sammlerAktiv`/`sammlerCloud`/`sammlerCloudInstanz` wurden `collectorActive`/`collectorCloud`/`collectorCloudInstance`, aus `leafDatenpunkte` wurde `leafStates`, aus der Zählertabelle `zaehler` wurde `energyMeters`. Vorhandene Einstellungen werden beim Start einmalig übernommen (Review 03.10.2026).
- Hintergrundschleifen (Eco, Betriebsstunden, Sekunden, Suche, Push-Erneuerung, Leaf-Verlauf) planen den nächsten Lauf erst nach dem Ende des vorigen – keine überlappenden Läufe mehr, wenn ein Gerät langsam antwortet.

### 0.3.38
- **Die Objekt-IDs sind jetzt durchgängig englisch.** Der Diagnosekanal hieß `sammlung` und
  trug ausschließlich deutsche Datenpunktnamen (`befund`, `fortschritt`, `datenJson`,
  `leafVerlaufFein` …), dazu vier deutsche im sonst englischen Kanal `history`
  (`laufendSeit`, `zaehlerStart`, `gemessenLetzter`, `gemessenTotal`) - zusammen 57 von
  446 Objekten. Im Aufnahmeantrag hielt der Prüfer sie deshalb für von Hand angelegte
  Skript-Datenpunkte. Aus `sammlung` wurde `collection`, aus `befund` wurde `finding`,
  aus `laufendSeit` wurde `runningSince`.
- **Beim ersten Start zieht der Adapter um.** Jeder vorhandene Wert wandert an seine neue ID,
  erst danach fällt der alte Punkt weg. Gesammelte Daten gehen nicht verloren - in einer
  laufenden Anlage sind das die Datensätze der Feldsuche, der Leaf-Scan über 882 geprüfte
  Adressen und die Verlaufsaufzeichnung. Eine frisch aufgesetzte Instanz findet nichts
  umzuziehen und schreibt nichts.
- **Aufgezeichnete Verläufe bleiben stehen**, aber unter der alten ID: Die Historie hängt am
  Objekt und zieht nicht mit. Betroffen sind nur die vier Zahlen im Kanal `history`.
- **Wer die alten IDs in eigenen Skripten benutzt, muss nachziehen.** Geprüft vor der
  Umbenennung: In 56 ioBroker-Skripten und in der Android-App des Betreibers kam keine
  einzige davon vor.
- Die IDs stehen jetzt in `lib/ids.js` an einer Stelle statt verstreut im Quelltext.

### 0.3.37
- **Klartext am Rohwert.** `status`, `programType`, `programPhase` und `programId` tragen ihre
  Werteliste jetzt in `common.states`, gebaut aus denselben Tabellen, aus denen auch die
  `…Text`-Datenpunkte kommen – damit können beide nicht auseinanderlaufen. Objektbrowser und VIS
  zeigen den Text, der Wert bleibt eine Zahl. Die `…Text`-Datenpunkte bleiben unverändert.
  Programmtabellen über 64 Einträgen bleiben außen vor; ein Backofen hat 168 davon, und die
  gehören nicht in jedes Objekt.
- **Beschreibungen, wo sie fehlten.** Kein einziges der 446 Objekte trug eine `common.desc`. Alles
  Beschreibbare hat jetzt eine, dazu der ganze Diagnosezweig, die drei Zeitstempel in
  Millisekunden und die fünf Rohwerte, deren Bedeutung nirgends dokumentiert ist. Bei
  `sammlung.leafVerlaufFein` stehen Format und ein Beispiel darin – ohne sie konnte niemand
  erraten, was einzutragen ist.
- **Admin neu geordnet.** „Geräte & Abfrage“ trug 25 Felder aus sechs unabhängigen Themen und ist
  nun in **Geräte** und **Abfrage & Werte** geteilt; die drei Eco-Feldindizes stehen bei der
  Diagnose, neben der Sammlung, die sie ermittelt. 18 Fließtextblöcke sind verschwunden: Ihr
  Inhalt steht als ein bis zwei Sätze unter dem Feld, zu dem er gehört, wo der Admin ihn zeigt.
  Sieben von 69 Feldern hatten vorher eine Hilfe, jetzt sind es 28.
- **Der Diagnosezweig entsteht nur, wenn er benutzt wird.** Seine vierzehn Datenpunkte je Gerät
  standen bisher bei jedem im Baum. Sie setzen jetzt eingeschaltete Datensammlung oder Leaf-Suche
  voraus; Suche und Feinaufzeichnung bringen den Kanal selbst mit, damit sie nicht still
  ausfallen.
- **CSV: Start, Ende und Differenz je Leaf-Feld.** Bisher trug ein Datensatz nur den Schlussstand
  der übrigen Leafs. Bei einem Lebenszähler wie `hoursOfOperation` sagt der über ein einzelnes
  Programm nichts – erst die Differenz tut das, und genau diese Leafs sind der einzige Weg bei
  Geräten, die 2/6195 gar nicht beantworten. Der Adapter liest den Stand jetzt auch bei
  Programmbeginn. Dazu im Ausdruck: die Seriennummer als eigene Spalte, die Adapterversion,
  Teiler und Einheit in den Überschriften, eine Einheit an der Temperatur und ein Vermerk an
  Datensätzen aus der Zeit vor den Zeitstempeln statt stillschweigend leerer Zellen.
- **Zweite Datei mit der Auswertung.** `befund-<Datum>.csv` führt eine Zeile je Feld:
  Übereinstimmung mit dem Vergleichswert, bester Teiler, mittlere und größte Abweichung. Das ist
  die Frage, wegen der die Sammlung läuft, und sie muss nicht mehr von Hand in der
  Tabellenkalkulation nachgebaut werden.
- **Behoben: Die Rolle `value.volume` war zurückgekehrt.** Eine neu hinzugekommene Tabelle führte
  eine Rolle wieder ein, die der ioBroker-Katalog nicht kennt; die Repository-Prüfung meldet sie
  als E1008. Es ist wieder `value`.
- **Objekt-IDs des Diagnosezweigs in einer Tabelle.** Umbenannt ist noch nichts, aber sie stehen
  jetzt in `lib/ids.js` statt verstreut über 180 kB Quelltext – eine spätere Umbenennung ist damit
  eine Änderung an einer Tabelle statt einer Suchaktion.
- **Geräteinterne Messwerte als Datenpunkte.** Der Adapter führt jetzt die Feldtabellen aller
  DOP2-Leafs, die die öffentlichen Reverse-Engineering-Projekte `MieleRESTServer` (akappner) und
  `ha-miele-at-lan` (tiehfood) dokumentieren - 52 Strukturen, darunter die für Backofen,
  Kaffeevollautomat, Störungen und Kommunikationsmodul, nicht nur die der Waschmaschine.
  Angelegt wird ein Datenpunkt erst, wenn das Gerät das Feld tatsächlich liefert; blind entsteht
  nichts. Geschrieben wird aus Abrufen, die ohnehin laufen - es kommt keine einzige Anfrage hinzu.
  Neuer Zweig je Gerät: `detail.<Kanal>.<Feld>`. Abschaltbar im Reiter „Diagnose".
- **Fehlerbehebung: Generic-Wertehüllen wurden an der falschen Stelle gelesen.** Miele verpackt
  jeden Messwert in eine kleine Struktur, und es gibt zwei Bauarten:
  `[Maske, Wert, Deutung]` und `[Maske, min, max, Istwert, Schrittweite]`. Der Adapter las immer
  den zweiten Eintrag - bei der ersten Bauart richtig, bei der zweiten das *Minimum*, und das ist
  bei jedem beobachteten Feld 0. Betroffen waren sieben Felder des Eco-Leaf, darunter
  `heatingTargetTemperature`: Während eines 40-Grad-Programms meldete das Gerät
  `[9, 0, 0, 40, 0, 0]` und der Adapter 0. Die Feldnummern innerhalb von Strukturen bleiben jetzt
  erhalten und werden benutzt.
- **Wasser: das EcoFeedback des Geräts hat Vorrang.** Wo es DOP2 2/1585 gibt, gilt dessen Wert für
  das letzte Programm; nur wo es ihn nicht gibt, zählt der Adapter weiter die Impulse des
  Durchflusszählers (Feld 21 / 200, über 24 Programme gegen den Hauswasserzähler belegt). Der neue
  Datenpunkt `eco.source` (bis 0.3.44 `eco.quelle`) sagt, aus welcher der beiden Quellen ein Wert stammt.
- **Der Datensammler schreibt alle Leafs mit.** Am Programmende liest der Adapter jedes
  antwortende Leaf einmal, schonend (fünf Sekunden zwischen zwei Anfragen, im Hintergrund) und
  hängt den Schlussstand an den Datensatz. Erst das macht die Sammlung für Geräte brauchbar, die
  2/6195 gar nicht beantworten - eine Spülmaschine, die dort schweigt, antwortet auf neunzehn
  andere Adressen. Die CSV führt sie als eigene Spalten, benannt wie `2/119.1 hoursOfOperation`.
- **Der Leaf-Scan durchsucht Unit 14.** Ein Backofen, der alle 882 gescannten Adressen mit 404
  beantwortete, wurde in den falschen Units gefragt: `ha-miele-at-lan` nennt die Programmlisten der
  Gargeräte unter 14/1570 und 14/1571.

### 0.2.1 (2026-08-18)
- Adopt ioBroker development guidelines and conformity rules.
- Translate internal log messages to pure English.
- Add explicit default metadata values (`def`) to all state definitions.
- Sanitize dynamic object IDs against forbidden characters.
- Add local verification test script (`npm run test:local`).
- Add German documentation (`README_de.md`).
- Fix dev-server packaging issue by removing redundant prepare script.
- Clarify step-by-step login instructions and i18n translations.
- Add CHANGELOG_OLD.md for historical pre-rename versions.
- Add per-device connectivity state (`info.connected`).
- Add periodic background discovery for waking/standby appliances.
- Add admin UI configuration for second-precise remaining time polling.
- Refine EcoFeedback state roles and measurement units.

### 0.2.1
- Veröffentlichung über GitHub Actions mit npm-Provenance (Trusted Publishing). Keine funktionalen Änderungen.

### 0.2.0
- Umbenennung von `miele-lokal` in `miele-local`: englischer Adaptername und Titel.
  Erste Version unter dem neuen Paketnamen.