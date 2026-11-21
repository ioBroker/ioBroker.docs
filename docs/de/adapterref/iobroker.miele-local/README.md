---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miele-local/README.md
title: ioBroker.miele-local
hash: SVst0I2yT29yy+nVo0oiHAVhQ0FmawLLWHSmdh40gnY=
---
![Logo](../../../en/adapterref/iobroker.miele-local/admin/miele-local.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.miele-local.svg)
![Lizenz: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

# IoBroker.miele-local
*Lesen Sie dies in einer anderen Sprache: [Deutsche Dokumentation](/#/docs/adapterref/iobroker.miele-local/README_de.md).*

Dieser Adapter verbindet moderne **Miele@Home**-Geräte **lokal, ohne Internetverbindung**.
Er kommuniziert direkt über das lokale Miele-Protokoll (`MieleH256` / DOP2) im LAN - ohne Cloud-Konto und ohne Umweg über die Miele-API von Drittanbietern.

Die einmalige **Anmeldung** mit Ihrem Miele-Konto dient lediglich dazu, den haushaltsweiten lokalen Schlüssel (Gruppen-ID/Gruppenschlüssel) zu erhalten. Danach läuft der Adapter offline, und die Miele-App funktioniert weiterhin unverändert.

**Funktionsweise:** Es liest den aktuellen Status aller Geräte im Klartext aus, protokolliert jedes abgeschlossene Programm mit seinem Verbrauch und kann - falls Sie dies zulassen - Programme starten, stoppen und pausieren.

**Voraussetzungen:** Ein Login und entweder mDNS in Ihrem Netzwerk oder die IP-Adressen der Geräte.

## Schnellstart
1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Wählen Sie auf der Registerkarte **Anmelden** Ihr Land aus und folgen Sie den drei unten stehenden Schritten.
3. Fügen Sie die erfasste Adresse `miele://…` ein und klicken Sie auf **Gruppenschlüssel abrufen**.
4. Speichern. Der Adapter erkennt Ihre Geräte und erstellt deren Zustände.

Läuft der Adapter in einem Docker-Container mit Bridge-Netzwerk, findet die Erkennung keine Ergebnisse - geben Sie die IP-Adressen manuell auf der Registerkarte **Geräte** ein. Siehe [Netzwerk](#network-ports-docker-push).

### Der Login, Schritt für Schritt
Die endgültige Adresse verwendet das `miele://`-Schema der mobilen App. Desktop-Browser können sie nicht öffnen, daher bleibt die Seite bei einem Ladekreis hängen und Sie müssen die Adresse selbst aus dem Browser ablesen.

1. **Entwicklertools vorbereiten.** Klicken Sie auf **Anmeldeseite öffnen** - ein neuer Tab öffnet sich. Drücken Sie dort **F12**, um zu wechseln.

Wechseln Sie zum Tab **Netzwerk** und behalten Sie das Protokoll bei:

- **Chrome / Edge / Brave:** Aktivieren Sie **Protokoll beibehalten**.
- **Firefox:** Zahnradsymbol ⚙️ → **Protokolle speichern**.
2. **Anmelden.** Geben Sie die E-Mail-Adresse und das Passwort Ihres Miele-App-Kontos ein. Die Seite bleibt dann hängen.

Ein sich drehendes Rad oder eine Meldung über eine fehlgeschlagene Ladung - so sieht Erfolg hier aus.

3. **Adresse kopieren.** Scrollen Sie im Netzwerk-Tab zum letzten (normalerweise roten) Eintrag, beginnend mit

`redirect?redirect_uri=miele…` oder `miele://oauth2-code/…`. Rechtsklick → **URL kopieren**, in das Feld **miele:// Umleitungs-URL** einfügen und auf **Gruppenschlüssel abrufen** klicken.

GroupID und GroupKey werden anschließend in der Instanzkonfiguration gespeichert, der Schlüssel wird verschlüsselt. Dieser Vorgang ist danach nicht mehr erforderlich.

**Anmeldung schlägt mit `invalid_request … unknown contextId` fehl?** Der Anmeldedienst von Miele wechselt während des Anmeldevorgangs zwischen zwei Domänen und verliert die Sitzung, wenn ein Werbeblocker oder ein strenger Cookie-Schutz von Drittanbietern dies verhindert. Öffnen Sie die Anmeldeseite in einem privaten Fenster ohne Erweiterungen.

**Umzug auf ein anderes System.** GroupID und GroupKey bleiben unverändert. Eine Sicherung der ioBroker-Konfiguration (z. B. mit BackItUp) sichert diese Daten; auf einem neuen System dauert die erneute Anmeldung zwei Minuten. Die Admin-Seite zeigt den Schlüssel lediglich als Platzhalter an.

## Was Sie erhalten
Jedes Gerät wird zu einem einzigen Gerät, dessen Seriennummer als ID dient. Darunter:

### `state` - Was das Gerät gerade tut
| Zustand | Bedeutung |
|---|---|
| `status` | Betriebszustand. Die Zahl enthält den Klartext als Werteliste, daher zeigen der Objektbrowser und VIS „In Verwendung“ anstelle von `5` an. |
| `programId` / `programText` | laufendes Programm |
| `programPhase` / `programPhaseText` | Phase innerhalb des Programms |
| `remainingMinutes`, `elapsedMinutes`, `startInMinutes` | Zeiten in Minuten |
| `remainingSeconds`, `elapsedSeconds` | bis zur Sekunde, falls aktiviert |
| `estimatedEndTime` / `estimatedEndTimeText` | Voraussichtliches Ende (Zeitstempel in ms / `HH:MM`) |
| `progress` | Programmfortschritt in % (verstrichen / (verstrichen + verbleibend)), 0, solange nichts ausgeführt wird |
| `temperature`, `targetTemperature` (plus Zonen 2 und 3) | Temperaturen |
| `signalDoor`, `signalInfo`, `signalFailure` | Tür- und Signalfahnen |
| `mobileStart` | ob das Gerät derzeit Fernsteuerung akzeptiert |
| `light`, `spinningSpeed`, `dryingStepText` | gerätespezifisch |
| `light`, `spinningSpeed`, `dryingStepText` | gerätespezifisch |

Die Rohwerte und ihre entsprechenden `…Text`-Werte existieren absichtlich nebeneinander: Der Rohwert dient zum Vergleichen und Darstellen, der Textwert zur Anzeige. Seit Version 0.3.37 enthält der Rohwert selbst die Klartextliste, sodass der Textstatus in den meisten Fällen nicht mehr benötigt wird.

**Sprache der Texte.** Die Statusbezeichnungen `…Text` sind auf Deutsch oder, falls die Option „Statusbezeichnungen auf Deutsch“ deaktiviert ist, auf Englisch angegeben - daran hat sich nichts geändert, Skripte vergleichen sie weiterhin.

Die Gerätemanager-Karten verwenden diese Bezeichnungen nicht: Seit Version 0.5.1 zeigt eine Karte den Rohwert zusammen mit einer Wertetabelle in der **Systemsprache** von ioBroker (alle elf Administratorsprachen). Status, Programmtyp, Trocknungsschritt und -phase sind in jeder Sprache vollständig. Die Programmbezeichnungen stammen aus den Community-Übersetzungen von Home Assistant; für Polnisch stammen die Programme für Waschmaschine und Wäschetrockner aus der polnischen Bedienungsanleitung von Miele (`lib/werte_eigen.js`, nur die dort wortwörtlich vorkommenden Bezeichnungen). Wo keine der Quellen eine Bezeichnung enthält (komplett ukrainisch, polnisch für die anderen Geräte und für Programme, die in der Bedienungsanleitung fehlen, teilweise russisch und niederländisch), zeigt die Karte die englische Bezeichnung an - es wird nichts erraten. Ein unbekannter Rohwert wird als seine Nummer angezeigt.

**Textstatus in einer anderen Sprache (optional).** *Abfrage & Werte → Sprache der Textstatus* gibt `statusText`, `programText`, `programPhaseText`, `programTypeText` und `dryingStepText` - sowie die Wertelisten der Rohstatus - in einer der elf Administratorsprachen anstelle von Deutsch oder Englisch aus. Falls eine Sprache nicht übersetzt werden kann, wird der englische Text angezeigt. Die Programmnamen stammen von Home Assistant und, bei polnischen Waschmaschinen und Wäschetrocknern, aus der polnischen Bedienungsanleitung von Miele (siehe Karten). Die Standardeinstellung bleibt unverändert.

Wenn die Option „Bundeslandnamen auf Deutsch“ deaktiviert ist, bleiben die Bundeslandnamen und -beschreibungen absichtlich in reinem Englisch: Eine mehrsprachige Bezeichnung würde in einem deutschen Adminbereich wieder den deutschen Namen anzeigen und die Option überflüssig machen.

### `control` - Befehle (nur bei aktivierter Gerätesteuerung)
`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`: Schreiben Sie `true`, um den Befehl zu senden; der Adapter bestätigt jeden Befehl, der Grund für einen Fehler ist im Statuskommentar angegeben.

`canStart`, `canStop`, `canPause`, `canPowerOn`, `canPowerOff` (schreibgeschützt) geben an, ob der Befehl im aktuellen Zustand sinnvoll ist und vom Gerät unterstützt wird - die Gerätekarten zeigen ihre Tasten dazu an, VIS kann dasselbe tun.

### `info` - Was ist das Gerät?
`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`, `protocolVersion`, `operatingHours` und die Abfragezähler `pollTotal`, `pollErrors`, `pollRetries`, `pollErrorRate`. `lastError` enthält den Grund für das Fehlschlagen der letzten Anfrage.

### `eco` - Energie und Wasser
`eco.energy` (kWh), `eco.energyWh` (Wh), `eco.water` (l), sofern vom Gerät angegeben, sowie `eco.source` mit Angabe der Quelle des Wertes. Siehe DOP2; bisher liefern Waschmaschinen diese Information. **Die Energieangabe ist keine Messung:** Eine Waschmaschine meldet die Heizenergie, die sie für den Hauptwaschgang *plant* - geplante Heizzeit × Nennleistung des Heizelements bei 230 V (WCR860: 2020 W).
Diese Angabe wird einmalig beim Heizstart festgelegt und nicht aktualisiert; sie berücksichtigt weder Motor, Pumpen und Elektronik noch die Heizung anderer Phasen. Kalt- oder Kurzprogramme melden 0. Gemessen an einer WCR860 entspricht diese Angabe der tatsächlichen Heizleistung normaler Warmprogramme innerhalb weniger Prozent, jedoch nicht dem Gesamtverbrauch. Um einen konkreten Wert zu erhalten, geben Sie den Zählerstand eines Messsteckers auf der Registerkarte **Abfrage & Werte** ein - der Adapter zeichnet dann auf, wie viel jedes Programm tatsächlich verbraucht hat.

Der Adapter fragt außerdem den Gerätekontext `2/1585` (und `2/391`) unabhängig vom Waschmaschinenblatt `2/6195` ab. Dessen Werte erscheinen unter `detail.ecoFeedback` (nur wenn das Gerät sie tatsächlich speichert): Energie- und Wasserverbrauch des letzten Programms (6.3/6.4), Betriebsstundenzähler (6.5/6.6) und TwinDos/AutoDos-Behälter (6.7). Die Werte des „letzten Programms“ ersetzen **nicht** `eco.*` - während eines Waschgangs wird weiterhin das vorherige Programm angezeigt. Geräte ohne `2/6195` (z. B. ein Geschirrspüler) ermitteln ihren Verbrauch pro Programm aus der **Differenz der Betriebsstundenzähler** zwischen Start und Ende. dann trägt `eco.*` diesen Wert und `eco.source` sagt `Appliance (lifetime counters 2/1585)`.

### `history` und `stats` - was ist gelaufen
Jedes abgeschlossene Programm wird mit Dauer, Programm, Energie- und Wasserverbrauch protokolliert. Die Geräte selbst speichern keine Daten, daher beginnt die Historie mit dem Einschalten der Funktion und kann nicht nachträglich aktualisiert werden. `history.cyclesJson` enthält die letzten Programme, `stats.week`, `stats.month`, `stats.year` und `stats.total` die jeweils daneben stehenden Summen.

### `control` - nur wenn Sie es zulassen
`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`. Das Schreiben von `true` löst den Befehl aus; der Status wird anschließend zurückgesetzt. Befehle funktionieren nur, wenn **MobileStart / Fernsteuerung** auf dem Gerät aktiviert ist, und einige Firmware-Versionen lehnen DOP2-Schreibvorgänge kategorisch ab.

Die Schalter `powerOn` und `powerOff` funktionieren wie die Miele-App (ab Version 0.4.3): Sie schreiben den Gerätestatus in das DOP2-Leaf `2/1586` (4 = ein, 1 = aus). Befindet sich das Gerät im Ruhemodus und antwortet mit HTTP 500, wird es mit `{"DeviceAction":2}` aufgeweckt und der Schreibvorgang maximal zweimal wiederholt. Erst dann wird die ältere UserRequest `2/1583` versucht. Kaffeemaschinen mit Protokollversion 2 werden über Dop1 geschaltet. Anschließend wird der Status erneut ausgelesen; der Kommentar `c` des Status gibt an, welche Methode funktioniert hat und ob sich der Status geändert hat. Schlägt dies fehl, erläutert Abschnitt `c` den HTTP-Status: **404** = Das Kommunikationsmodul bietet keine DOP2-Steuerung (z. B. XKM EK057), **403** = Die Fernsteuerung ist am Gerät deaktiviert, **500** = Das Gerät akzeptiert den Befehl im aktuellen Zustand nicht. Bei der Protokollierungsstufe **debug** wird jeder Schritt mit Ressource, HTTP-Status und der Antwort als Hexadezimalwert (ohne Schlüssel) protokolliert.

## Einstellungen
| Registerkarte | Inhalt |
|---|---|
| **Anmeldung** | Land, geführte Anmeldung, erfasste Adresse |
| **Geräte** | mDNS-Erkennung, Fallback-IP-Scan, manuelle IP-Adressen |
| **Abfrage & Werte** | Abfrageintervalle, deutsche Bundeslandnamen, sekundengenaue Zeiten, EcoFeedback, Energiezähler, Geräteinterna |
| **Push & Ports** | der optionale Echtzeitkanal und sein Eingangsport, der optionale Zeitserver |
| **Steuerung** | der Schalter, der die beschreibbaren Zustände erzeugt |
| **Verlauf** | Aufzeichnung abgeschlossener Programme, Ringpuffer, Aufbewahrung, Verlaufsadapter |
| **Diagnose** | Alles zur Fehlersuche und Feldzuordnung - standardmäßig deaktiviert |
| **Fortgeschritten** | Gruppen-ID und Gruppenschlüssel manuell |

Jedes Feld hat im Adminbereich eine eigene Erklärung; diese Seite wiederholt sie nicht.

## Netzwerk: Ports, Docker, Push
| Richtung | Hafen | Zweck | Erforderlich |
|---|---|---|---|
| eingehend | TCP *Push-Port* (Standard 18082) | Appliances senden Updates an ioBroker | nur mit Push |
| Ein-/Ausgang | UDP 5353 (mDNS) | Erkennung und Push-Registrierung | für die Erkennung |
| ausgehend | TCP 80 → Geräte | Zustände lesen, Befehle senden | ja |
| Ausgehend | TCP 443 → miele-iot.com | Gruppenschlüssel abrufen | Nur für Anmeldungen |
| eingehend | TCP *Zeitserver-Port* (Standard 8780) | Geräte beziehen ihre Uhrzeit | nur vom Zeitserver |

Ohne Push-Benachrichtigung ist **kein eingehender Port** erforderlich. Für mDNS müssen sich ioBroker und die Appliances im selben Broadcast-Segment befinden. Separate IoT-WLANs oder VLANs, Firewalls (einschließlich der Windows-Firewall auf einem Testrechner) und Router, die Multicast filtern, verhindern die Erkennung ebenfalls. In all diesen Fällen ist die manuelle IP-Liste die zuverlässigste Methode.

**Docker.** In einem Container mit Bridge-Netzwerk wird Multicast nicht weitergeleitet, daher findet die Erkennung keine Ergebnisse. Geben Sie die IP-Adressen manuell ein, dann funktioniert das Polling normal. Push funktioniert dort überhaupt nicht, da die Appliances den Container nicht erreichen können: Die Callback-Adresse befindet sich hinter NAT. Für zuverlässiges Push ist `network_mode: host` erforderlich.

**So funktioniert Push-Benachrichtigung.** Der Adapter registriert sich pro Gerät als Haushalts-Peer (`PUT /Devices/<series>/SuperVision/<own-fab>`) und abonniert eine Callback-URL. Das Gerät sendet dann Änderungen unaufgefordert innerhalb einer Sekunde. Nicht jedes Modul unterstützt diese Funktion: Die älteren Module XKM EK037 und EK057 akzeptieren zwar die Anmeldung, senden aber keine Daten. In diesem Fall ist das Polling die zuverlässigste Methode.

## Zeitserver für die Geräte (optional)
Miele-Geräte steuern ihre Uhrzeit **mit einer eigenen HTTP-Anfrage, nicht mit NTP**. Das Kommunikationsmodul löst `ntp.mcs2.miele.com` auf und fragt alle 30 Sekunden ab, bis es eine Antwort erhält.

```
GET http://ntp.mcs2.miele.com/V2/NTP/ HTTP/1.1
Host: ntp.mcs2.miele.com
Accept: application/vnd.miele.v1+json
```

Miele antwortet mit `{"time":<Unix seconds>}`. Ein Gerät **ohne Internetzugang** (IoT-Netzwerk ohne Ausgang) erhält diese Antwort nie: Seine Uhrzeit driftet ab und kann nach der Umstellung auf Sommerzeit verbleiben. Eine DHCP-NTP-Option oder ein NTP-Server im Netzwerk helfen nicht - das Gerät verwendet kein NTP.

Der Adapter kann dieselbe Antwort aus Ihrem Netzwerk liefern. Aktivieren Sie **Push & Ports → Zeitanfrage der Geräte beantworten** (standardmäßig deaktiviert) und wählen Sie einen Port (Standard: 8780). **Dies allein bewirkt nichts:** Das Ziel ist im Modul festgelegt, daher müssen Sie die Geräte umleiten - entweder auf einen der folgenden Ports:

1. **Router: Ziel-NAT / Portweiterleitung.** Quelle = die Miele-Geräte, Ziel

`ntp.mcs2.miele.com` (derzeit `52.136.223.17`; bitte mit `nslookup` abgleichen) TCP 80, übersetzt in die ioBroker-IP-Adresse und den hier festgelegten Port. Auf UniFi: *Einstellungen → Routing → NAT → Ziel-NAT*.

Der Dienst kann auf einem hohen Port bleiben; die Portübersetzung von 80 auf den Zielport erfolgt durch den Router.

**Wenn sich ioBroker im selben Subnetz wie die Appliances befindet**, fügen Sie für diesen Datenfluss ebenfalls ein Source-NAT hinzu (z. B. durch Masquerading auf die Router-Adresse). Andernfalls antwortet ioBroker der Appliance direkt, die Antwort stammt nicht von der angeforderten Adresse und wird verworfen.

Erlauben Sie den Datenfluss außerdem in der Router-Firewall, falls diese den Datenverkehr innerhalb dieses Netzwerks oder dieser Zone filtert.

2. **DNS-Umleitung** (AdGuard Home, Pi-hole, dnsmasq): `ntp.mcs2.miele.com` → ioBroker-IP.

Das Gerät verbindet sich dann mit **Port 80** dieser IP-Adresse, daher muss der Dienst dort erreichbar sein: In Docker ordnen Sie Host-Port 80 dem konfigurierten Port (`-p 80:8780`) zu; ohne Docker legen Sie entweder Port 80 fest (erfordert Root-Rechte oder `CAP_NET_BIND_SERVICE`) oder leiten Sie Port 80 mit der Host-Firewall weiter. Port 80 darf nicht von einem anderen Webserver auf diesem Host belegt sein.

**Docker:** Bei Bridge-Netzwerken muss der Port in der Portweiterleitung des Containers enthalten sein. Das Hinzufügen eines Ports erfordert die Neuerstellung des Containers. Ist einer der zugeordneten Ports nicht frei, verwenden Sie diesen.

**Firewall:** Eine Firewall auf dem Host (z. B. Synology DSM) muss TCP-Verbindungen von den Appliances zu diesem Port zulassen.

**Prüfen Sie:** `info.timeServer.running` entspricht `true`; `info.timeServer.requests`, `lastRequest`, `lastClient` und `info.timeServer.clients.<ip>.*` zählen jede beantwortete Anfrage. Abhängig von der Docker-Konfiguration und dem Source-NAT kann der Absender als Docker-Gateway (z. B. `172.17.0.1`) oder als Router anstelle des Geräts erscheinen. Wenn keine Pakete ankommen, liegt das Problem an der Umleitung oder der Firewall, nicht am Adapter.

**Einschränkungen:** Der Dienst liefert **nur UTC**. Zeitzone und Sommerzeit werden vom Gerät selbst angewendet (eingestellt am Gerät oder in der Miele App). Alle Anfragen außer `GET /V2/NTP/` führen zu einem 404-Fehler. Anfragen werden nur im Debug-Modus protokolliert.

### Beibehalten der Geräteuhr auf Ortszeit (optional)
Einige Geräte verwenden zwar die korrekte UTC-Zeit, wenden die Sommerzeit aber nach eigenem Zeitplan an - ein Backofen H2469BP lief beispielsweise noch Stunden nach der Umstellung am 25.10.2026 auf Sommerzeit. **Push & Ports → Geräteuhr auf lokaler Zeit halten** (standardmäßig deaktiviert) prüft jedes Gerät beim Start und stündlich über `Settings/TimeSync`. Weicht die Geräteuhr um mehr als 2 Minuten von der lokalen Zeit des ioBrokers (Zeitzone des ioBroker-Hosts/Containers) ab, wird sie mit einer signierten Anfrage, die nur `DateTime` enthält, korrigiert (`NTPEnabled`, `UTCOffset` und `TimeMaster` bleiben unverändert). Jede Korrektur wird im Info-Protokoll erfasst. `<appliance>.info.timeSync.lastDeviation` (Sekunden, positiv = Gerät voraus) und `lastSet` zeigen das Ergebnis an. Geräte, die `TimeSync` nicht melden (z. B. G5840, WCR860 Antwort 503), werden nicht berücksichtigt. Funktioniert auch ohne den oben genannten Zeitserver und ohne „Steuerung zulassen“.

## Datenschutz
Der Adapter speichert **keine personenbezogenen Daten**. GroupID, GroupKey und Refresh-Token befinden sich ausschließlich in der verschlüsselten Instanzkonfiguration oder in ioBroker-Objekten. Es werden keine Daten an Dritte übermittelt; im Normalbetrieb besteht keinerlei Cloud-Verbindung.

Eine wichtige Ausnahme: Die Diagnosedatenerfassung zeichnet **Start- und Endzeitpunkt jedes Programms** auf. Diese Daten bleiben in Ihrer Instanz gespeichert - wenn Sie die Sammlung oder deren CSV-Export jedoch weitergeben, werden auch diese Zeitangaben übermittelt.

## Kompatibilität und Grenzen
- Getestet mit einer Waschmaschine (WCR860/EK037), einem Geschirrspüler (G5840/EK037) und einem Backofen

(H2469BP/EK057).

- Kühlgeräte sind in der Regel lokal nur lesbar; die Firmware lehnt Schreibvorgänge ab.
- Control benötigt MobileStart auf dem Gerät; einige Firmwares antworten auf DOP2-Schreibvorgänge mit 404 oder 500.
EcoFeedback ist nicht überall verfügbar. Der hier getestete Geschirrspüler liefert weder Energie noch Wasser.

Zähler über jedem lesbaren Blatt - für dieses Gerät müssen die Werte aus der Cloud stammen.

- Push ist eine bestmögliche Ergänzung, die den Standardwert abfragt.

## Diagnose
Alle Funktionen in diesem Abschnitt sind **standardmäßig deaktiviert** und werden für den täglichen Betrieb nicht benötigt. Sie dienen lediglich der Beantwortung der Frage, welches Rohdatenfeld *Ihres* Geräts Energie und Wasser speichert. Die Feldnummern variieren je nach Serie, und die Standardeinstellungen im Adapter stammen von einem WCR860.

**Rohdaten.** Schreibt alle Felder des Öko-Blatts in `eco.fieldsJson` anstatt nur die beiden ausgewerteten.

**Datenerfassung.** Pro abgeschlossenem Programm wird ein Datensatz erfasst - Modell, Programm, alle Rohdatenfelder und am Ende der Endzustand jedes Antwortknotens. Um daraus eine Zuordnung zu erstellen, benötigt der Adapter einen Referenzwert: entweder von einem Cloud-Adapter oder manuell in `collection.inputEnergy` und `collection.inputWater` eingegeben nach einem Programm. `collection.progress` gibt an, was noch fehlt, `collection.finding` enthält das Ergebnis: welches Feld mit welchem Divisor und wie genau passt.

**Blattscan.** DOP2 adressiert Daten als `unit/attribute`, und nur wenige dieser Adressen sind dokumentiert. Der Scan durchläuft den Adressraum so schonend, dass das Modul nicht überlastet wird. `collection.scanJson` erfasst die Antworten - einschließlich Seriennummer, MAC-Adresse, IP-Adresse und WLAN-Name. **Zum Teilen verwenden Sie `collection.scanJsonAnonym` **: dieselben Daten, jedoch maskiert. Adressen, deren Antwort der Adapter noch nicht dekodieren kann, werden zusammen mit dem Fehlertext und den Rohdaten als beantwortet gespeichert, sodass der Scan immer abgeschlossen wird. `collection.trendLeaf` zeichnet während der Programmausführung ein einzelnes Blatt genau auf - das Feld, dessen Wert mit dem Verbrauch ansteigt, ist das gesuchte.

**CSV-Export.** Die Schaltfläche auf der Registerkarte „Diagnose“ schreibt zwei Tabellen in den Dateibereich der Instanz und öffnet die erste:

- `collection-<date>.csv` - eine Zeile pro Programm: Zeiten, Programm, die Referenzwerte, jede Zeile

Das Feld wird in einer eigenen Spalte angezeigt, und für jedes Blattfeld werden der Anfangs- und Endwert sowie die Differenz zwischen diesen Werten erfasst. Bei Lebensdauerzählern ist nur diese Differenz relevant.

- `finding-<date>.csv` - eine Zeile pro Feld: wie gut es mit der Referenz übereinstimmt, der beste Teiler,

Der Mittelwert und die größte Abweichung. Dies ist die Antwort, für die diese Datensammlung existiert.

Semikolon-getrennt, Dezimalkomma, BOM - ein Doppelklick öffnet sie in einer Tabellenkalkulation.

**Erkundung eines unbekannten Geräts.** [docs/geraet-erkunden.md](/#/docs/adapterref/iobroker.miele-local/docs/geraet-erkunden.md) (Deutsch) beschreibt die gesamte Vorgehensweise: Wann scannt man, wie man eine Ablehnung von einem Besetztzeichen unterscheidet, wie man eine Zahlenfolge liest, sobald man eine hat, und was ein neu erkanntes Feld benötigt, um einen Status anzunehmen. Es wird auch festgehalten, was *nicht* funktioniert hat, damit es niemand wiederholt.

## Rechtliches / Haftungsausschluss
Dies ist ein **inoffizielles, privat entwickeltes** Projekt und steht **in keiner Verbindung zu [Miele & Cie. KG](https://www.miele.com/)**, noch wird es von diesem unterstützt oder geprüft. „Miele“, „Miele@home“ und ähnliche Bezeichnungen sind Marken von [Miele & Cie. KG](https://www.miele.com/) und werden hier lediglich beschreibend verwendet, um die Kompatibilität anzugeben. Informationen zu den Geräten selbst erhalten Sie beim Hersteller unter <https://www.miele.com/>.

Der Adapter verwendet ein lokales Protokoll, das durch **Reverse Engineering** öffentlich dokumentiert wurde. Die Nutzung erfolgt **auf eigene Gefahr**; je nach Gerät/Firmware kann dies Auswirkungen auf Garantieansprüche haben. Die Software wird unter der MIT-Lizenz **ohne jegliche Gewährleistung** bereitgestellt (siehe LICENSE). Der Autor haftet nicht für Schäden an Geräten, Daten oder sonstige Folgen der Nutzung.

## Danksagungen
Besonderer Dank gilt **[Meistermopp](https://github.com/meistermopper)**, einem erfahrenen ioBroker-Adapterentwickler, der diesen Adapter unaufgefordert geprüft und wesentliche Verbesserungen beigetragen hat: regelmäßige Hintergrunderkennung für aus dem Standby-Modus aufwachende Geräte, ein gerätespezifischer Verbindungsstatus, korrigierte Statusrollen und -einheiten, explizite Standardwerte für alle Status und eine deutsche Dokumentation. Seine Arbeit floss in Version 0.3.0 ein.

Das lokale Protokoll (`MieleH256`, DOP2, Provisionierung) basiert auf der öffentlichen Reverse-Engineering-Arbeit der Projekte `MieleRESTServer` (akappner), `home-assistant-miele-mobile` und `ha-miele-at-lan`.

## Credits
Die Programm- und Phasentabellen in `lib/enums.js` sowie die Zuordnung der Gerätetypen zu den Tabellen stammen aus [Home Assistant](https://github.com/home-assistant/core) (Apache-Lizenz 2.0, © Home Assistant-Autoren), wurden über [ha-miele-at-lan](https://github.com/tiehfood/ha-miele-at-lan) (MIT, © tiehfood) übernommen und mit [ioBroker.miele-unbound](https://github.com/meistermopper/ioBroker.miele-unbound) (MIT, © meistermopper) abgeglichen. Vielen Dank an alle drei Projekte.

Die Übersetzungen der Status-, Phasen- und Programmnamen in `lib/werte_ha.js` (angezeigt auf den Gerätemanagerkarten) sind die Community-Übersetzungen der Home Assistant Miele-Integration (Apache License 2.0, © Home Assistant Authors), extrahiert mit `tools/werte-uebersetzungen.js`; Lücken und einige Korrekturen befinden sich in `lib/werte_eigen.js`.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-19)
- (SmarthomeElektroniker) DOP2 parser reads type 33 (list of structures, AStruct). Until now a leaf containing it (e.g. `2/1585`, `2/17`, `2/131`) failed completely with "Unknown DOP2 field type 33".
- (SmarthomeElektroniker) The device context `2/1585` (and `2/391` as fallback) is queried independently of the washing-machine leaf `2/6195`. Values of the appliance's own EcoFeedback (fields 6.3–6.6, 6.29, 6.31) honour the unit type (121/46 = Wh, 45 = kWh, 44 = l) and are only created if the appliance keeps them; TwinDos/AutoDos containers (6.7) appear as JSON. Appliances without `2/6195` (dishwasher) get energy and water per programme from the difference of the lifetime counters 6.5/6.6. The "last programme" values no longer replace `eco.*` while a programme runs.
- (SmarthomeElektroniker) Leaf scan: answers that cannot be decoded count as answered (status 200, error text and raw bytes kept separately), so the scan always completes. New `collection.scanJsonAnonym` without serial number, module number, MAC, IP and Wi-Fi name, for sharing.
- (SmarthomeElektroniker) Leaf scan is now slow and gentle: each appliance has its own independent pace, at most one request every 25 s per appliance and never two at once to the same appliance - a hanging appliance no longer holds up the others; the scan gives way while the regular polling of that appliance is running (during a programme at most one per minute per appliance, where a 500 never counts), back-off of 5 → 30 min after connection errors. Rejections (404/500) only become final after two answers at least 6 h apart while the module is proven awake; 500s from old scans are asked again. `14/1565` is masked in `scanJsonAnonym`.
- (SmarthomeElektroniker) `/State.ExtendedState` is logged (debug) and kept as raw hex in `collection.extendedState`, for diagnostics only.
- (SmarthomeElektroniker) Names according to the measurements of 13.11.2026 (object IDs unchanged): `eco.energy`/`eco.energyWh` "Heating energy (setpoint at 230 V)", `detail.process.heatingEnergy`/`heatingTime` "(setpoint)", field 16 `energyConsumed` "Drive energy" in Wh (final value kept after the programme), field 4 "Elapsed time".
- (SmarthomeElektroniker) Debug log: one line per appliance for 2/6195, 2/1585, 2/391 and ExtendedState, without the full serial number.
- (SmarthomeElektroniker) Debug log: no more "final phase" / "final reading attempt" lines for appliances that have rejected the eco leaf and both context leaves - nothing was queried there anyway.
- (KPIotr89) New option **Language of the text states** (Polling & values): `statusText`, `programText`, `programPhaseText`, `programTypeText`, `dryingStepText` and the value lists of the raw states in any of the eleven admin languages. Default unchanged (German or English, following "State names in German"); missing translations fall back to English. Polish programme names for washing machines and tumble dryers, word for word from Miele's Polish operating instructions, also on the device manager cards. Thanks to @KPIotr89 for the contribution (PR #23)

### 0.5.2 (2026-11-12)
- (SmarthomeElektroniker) Fix: a card could show "not connected" and still offer the On button (or the light). After a stop or restart of the adapter the `control.can*` states kept their last value, and appliances not found at start kept them as well. Now the adapter clears them on stop and for every appliance not found at start; an appliance that is not reachable or reports status 255 ("not connected") gets no button at all
- (SmarthomeElektroniker) The light button now also follows two read-only states, `control.canLightOn` and `control.canLightOff` (exactly one is true while the appliance is reachable). The card looks as before
- (SmarthomeElektroniker) German texts: `fan_plus` is now „Heißluft plus“ (was „Umluft“, also in the combined modes with moisture plus and microwave), `eco_fan_heat` „Eco-Heißluft“, programme `automatic` „Automatik“ (was „Automatic“), drying steps 4–7 corrected (they had wrong names) to „Handbügelfeucht 1/2“, „Maschinenbügelfeucht“, „Glätten“. **Visible change:** the German `state.programText` and `state.dryingStepText` change accordingly - scripts that compare against the old German text must be adjusted
- (SmarthomeElektroniker) French: the Off button reads „Éteindre“ (was „Arrêt“) and On „Allumer“, so Off and Stop („Arrêter“) are clearly distinguishable

### 0.5.1 (2026-11-12)
- (SmarthomeElektroniker) Device manager cards show status, programme, phase, programme type and drying step in the system language of ioBroker, in all eleven admin languages. Until now the card showed the `…Text` states, which the adapter writes only in German or English. The card now uses the raw values (`state.status`, `programId`, `programPhase`, `programType`, `dryingStep`) with a value table in the system language; the `…Text` states are unchanged, scripts that compare against them keep working
- (SmarthomeElektroniker) Translations: the community translations of the Home Assistant Miele integration, own translations where a language is missing there (Ukrainian, Polish, large parts of Russian and Dutch, status 144/145) and a few corrections. Programme names only from Home Assistant, otherwise English - nothing guessed
- (SmarthomeElektroniker) Descriptions of `control.can*` and `state.progress` in all eleven languages

### 0.5.0 (2026-11-12)
- (SmarthomeElektroniker) Device manager support (`@iobroker/dm-utils`, issue #22, suggested by mcm1957): one card per appliance for the running operation. The header shows name and model, the serial number appears once below it. Status, programme, phase, start time, remaining time and estimated end (large), plus a progress bar; empty values are hidden instead of showing as blank lines. Fault, door open, notices on the appliance display and a locked remote start (MobileStart) are shown as coloured lines while they are active. Expanding the card shows further values (temperatures, elapsed time, spin speed, light, MobileStart, EcoFeedback, operating hours). Deliberately no configuration actions on the cards
- (SmarthomeElektroniker) With device control enabled the card shows only the commands that make sense right now and that the appliance supports: off → On; ready/programmed → Start, Off; running → Pause, Stop; paused → Start, Stop; end/fault → Off. Start only with MobileStart, Pause only on washing machines and dryers, no switching of fridges and hobs. The buttons follow the state live; every command except the light asks for confirmation and writes the existing `control.*` states
- (SmarthomeElektroniker) The light is a single toggle button: symbol, label and tooltip show the current state, a click switches to the opposite, without confirmation. The percentage sits right next to the progress bar
- (SmarthomeElektroniker) Fix: manual inputs, the scan switch and the fine recording of the data collection (`collection.*`) had no effect since the channel was renamed from `sammlung` in 0.3.38
- (SmarthomeElektroniker) New states `control.canPowerOn`, `canPowerOff`, `canStart`, `canPause`, `canStop` (read only, also usable in VIS) and `state.progress` (programme progress in %)

### 0.4.3 (2026-11-10)
- (SmarthomeElektroniker) `control.powerOn`/`powerOff` now switch like the Miele app: DOP2 leaf `2/1586` (appliance state 4 = on, 1 = off), on HTTP 500 wake-up with `{"DeviceAction":2}` and retry (at most two rounds), the previous UserRequest `2/1583` only as fallback; coffee machines with protocol version 2 via Dop1 object 1101. The effect is checked by reading the status again, failures are explained by HTTP status (403/404/500), RemoteEnable is only logged, every step is in the debug log

### 0.4.2
- (SmarthomeElektroniker) Maintenance: trimmed the version news in `io-package.json` (repository checker W1032/W2004), no functional change

### 0.4.1
- (SmarthomeElektroniker) New option **Keep the appliance clock on local time** (Push & ports, off by default): checks `Settings/TimeSync` at start and every hour and sets the appliance clock to the local time of ioBroker if it differs by more than 2 minutes. Only the `DateTime` field is written. States `info.timeSync.lastSet` and `info.timeSync.lastDeviation` per appliance

### 0.4.0
- (SmarthomeElektroniker) New optional **Miele time server** (Push & ports, off by default): answers the appliances' HTTP time request `GET http://ntp.mcs2.miele.com/V2/NTP/` with `{"time":<Unix seconds>}`, so appliances without internet keep the right time. The appliances must be redirected to it (destination NAT on the router or a DNS rewrite) - see "Time server for the appliances". Answered requests are counted under `info.timeServer.*`, per sender under `info.timeServer.clients.*`
- (SmarthomeElektroniker) Leaf table: `DateTimeInfo` is attribute 122 in unit 14 (`14/122`), not `2/122`

### 0.3.47
- (SmarthomeElektroniker) A command under `control.*` that cannot be executed (control disabled, appliance not connected, HTTP error, connection error) is now acknowledged (`val=false`, `ack=true`) with the reason in the state comment `c` and a matching quality `q`. Until now it stayed unacknowledged - one `control.powerOn` stood there for 52 days
- (SmarthomeElektroniker) Unacknowledged commands left over from before a restart are closed on start and are **not** sent to the appliance
- (SmarthomeElektroniker) `remainingMinutes`/`remainingHHMM` are 0 while the appliance is off, finished or not connected (status 1/7/255), and no end time is calculated. A G5840 reported a remaining time of 0:01 while switched off
- (SmarthomeElektroniker) A lost connection to an appliance and its return are logged once at info level (until now only at debug)
- (SmarthomeElektroniker) The IP fallback search ("Search the subnet for the new IP if a device drops out") also runs in the background when mDNS discovery is off - exactly the Docker bridge setup it is meant for. It only probes appliances that currently fail, and searches every /24 network that has a missing appliance, not only the network of the first configured IP

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction. See the [LICENSE](https://github.com/SmarthomeElektroniker/ioBroker.miele-local/blob/main/LICENSE) file for the full text.