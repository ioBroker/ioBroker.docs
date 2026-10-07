---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miele-local/README.md
title: ioBroker.miele-local
hash: UJZlgBKJ1sq67WN9MUZZiJQcXcMdVuNOyRe4vl/fBnI=
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
| `temperature`, `targetTemperature` (plus Zonen 2 und 3) | Temperaturen |
| `signalDoor`, `signalInfo`, `signalFailure` | Tür- und Signalfahnen |
| `mobileStart` | ob das Gerät derzeit Fernsteuerung akzeptiert |
| `light`, `spinningSpeed`, `dryingStepText` | gerätespezifisch |
| `light`, `spinningSpeed`, `dryingStepText` | gerätespezifisch |

Die Rohwerte und ihre entsprechenden `…Text`-Werte existieren absichtlich nebeneinander: Der Rohwert dient zum Vergleichen und Darstellen, der Textwert zur Anzeige. Seit Version 0.3.37 enthält der Rohwert selbst die Klartextliste, sodass der Textstatus in den meisten Fällen nicht mehr benötigt wird.

### `info` - Was ist das Gerät?
`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`, `protocolVersion`, `operatingHours` und die Abfragezähler `pollTotal`, `pollErrors`, `pollRetries`, `pollErrorRate`. `lastError` enthält den Grund für das Fehlschlagen der letzten Anfrage.

### `eco` - Energie und Wasser
`eco.energy` (kWh), `eco.energyWh` (Wh), `eco.water` (l), sofern vom Gerät angegeben, sowie `eco.source` mit Angabe der Quelle des Wertes. Lesen Sie DOP2; bisher liefern Waschmaschinen diesen Wert. **Der vom Gerät gemeldete Wert ist ein Schätzwert, keine Messung.** Um einen tatsächlichen Wert zu erhalten, geben Sie den Zählerstand des Messsteckers auf der Registerkarte **Abfrage & Werte** ein - der Adapter zeichnet dann den tatsächlichen Stromverbrauch jedes Programms auf.

### `history` und `stats` - was ist gelaufen
Jedes abgeschlossene Programm wird mit Dauer, Programm, Energie- und Wasserverbrauch protokolliert. Die Geräte selbst speichern keine Daten, daher beginnt die Historie mit dem Einschalten der Funktion und kann nicht nachträglich aktualisiert werden. `history.cyclesJson` enthält die letzten Programme, `stats.week`, `stats.month`, `stats.year` und `stats.total` die jeweils daneben stehenden Summen.

### `control` - nur wenn Sie es zulassen
`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`. Das Schreiben von `true` löst den Befehl aus; der Status wird anschließend zurückgesetzt. Befehle funktionieren nur, wenn **MobileStart / Fernsteuerung** auf dem Gerät aktiviert ist, und einige Firmware-Versionen lehnen DOP2-Schreibvorgänge kategorisch ab.

## Einstellungen
| Registerkarte | Inhalt |
|---|---|
| **Anmeldung** | Land, geführte Anmeldung, erfasste Adresse |
| **Geräte** | mDNS-Erkennung, Fallback-IP-Scan, manuelle IP-Adressen |
| **Abfrage & Werte** | Abfrageintervalle, deutsche Bundeslandnamen, sekundengenaue Zeiten, EcoFeedback, Energiezähler, Geräteinterna |
| **Push & Ports** | der optionale Echtzeitkanal und sein Eingangsport |
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

Ohne Push-Benachrichtigung ist **kein eingehender Port** erforderlich. Für mDNS müssen sich ioBroker und die Appliances im selben Broadcast-Segment befinden. Separate IoT-WLANs oder VLANs, Firewalls (einschließlich der Windows-Firewall auf einem Testrechner) und Router, die Multicast filtern, verhindern die Erkennung ebenfalls. In all diesen Fällen ist die manuelle IP-Liste die zuverlässigste Methode.

**Docker.** In einem Container mit Bridge-Netzwerk wird Multicast nicht weitergeleitet, daher findet die Erkennung keine Ergebnisse. Geben Sie die IP-Adressen manuell ein, dann funktioniert das Polling normal. Push funktioniert dort überhaupt nicht, da die Appliances den Container nicht erreichen können: Die Callback-Adresse befindet sich hinter NAT. Für zuverlässiges Push ist `network_mode: host` erforderlich.

**So funktioniert Push-Benachrichtigung.** Der Adapter registriert sich pro Gerät als Haushalts-Peer (`PUT /Devices/<series>/SuperVision/<own-fab>`) und abonniert eine Callback-URL. Das Gerät sendet dann Änderungen unaufgefordert innerhalb einer Sekunde. Nicht jedes Modul unterstützt diese Funktion: Die älteren Module XKM EK037 und EK057 akzeptieren zwar die Anmeldung, senden aber keine Daten. In diesem Fall ist das Polling die zuverlässigste Methode.

## Datenschutz
Der Adapter speichert **keine personenbezogenen Daten**. GroupID, GroupKey und Refresh-Token befinden sich ausschließlich in der verschlüsselten Instanzkonfiguration oder in ioBroker-Objekten. Es werden keine Daten an Dritte übermittelt; im Normalbetrieb besteht keinerlei Cloud-Verbindung.

Eine wichtige Ausnahme: Die Diagnosedatenerfassung zeichnet **Start- und Endzeitpunkt jedes Programms** auf. Diese Daten bleiben in Ihrer Instanz gespeichert - wenn Sie die Sammlung oder deren CSV-Export jedoch weitergeben, werden auch diese Zeitangaben übermittelt.

## Kompatibilität und Einschränkungen
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

**Blattscan.** DOP2 adressiert Daten als `unit/attribute`, und nur wenige dieser Adressen sind dokumentiert. Der Scan durchläuft den Adressraum so schonend, dass das Modul nicht überlastet wird; `collection.scanJson` erfasst die Ergebnisse. `collection.trendLeaf` speichert während der Programmausführung ein einzelnes Blatt - das Feld, dessen Wert mit dem Verbrauch steigt, ist das gesuchte.

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

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.3.45
- (SmarthomeElektroniker) The last German state ID is gone: `eco.quelle` is now `eco.source`, its value is always English. Existing installations are migrated on start
- (SmarthomeElektroniker) `statusText`, `programText`, `programPhaseText`, `programTypeText` and `dryingStepText` follow the "German names" option - with the option off they are English (until now they were always German)
- (SmarthomeElektroniker) Remaining German log and error messages translated; CSV export files are named `collection-<date>.csv` and `finding-<date>.csv`
- (SmarthomeElektroniker) All JSDoc comments complete (no lint warnings left); `@iobroker/testing` 6.3.0
- (SmarthomeElektroniker) `eco.felderJson` is now `eco.fieldsJson` (migrated on start)
- (SmarthomeElektroniker) Settings use English keys: `sammlerAktiv`/`sammlerCloud`/`sammlerCloudInstanz` became `collectorActive`/`collectorCloud`/`collectorCloudInstance`, `leafDatenpunkte` became `leafStates`, the energy meter table `zaehler` became `energyMeters`. Existing settings are carried over once on start (review 2026-10-03)
- (SmarthomeElektroniker) Background loops (eco, operating hours, seconds, discovery, push renewal, leaf trend) schedule their next run only after the previous one finished - no overlapping runs when an appliance answers slowly

### 0.3.44
- (SmarthomeElektroniker) History objects are only rewritten when they actually changed - this prevents an empty (null) point in the history adapter after every adapter restart

### 0.3.43

- (SmarthomeElektroniker) All log messages are English now; diagnostic texts in states (`finding`, `check`, `progress`, `scanState`, `trendSize`), error messages and the CSV export too (review 2026-09-27)
- (SmarthomeElektroniker) Admin UI: all texts use English i18n keys; the diagnostics tab is translated into all 11 languages
- (SmarthomeElektroniker) README: diagnostics section uses the current English state IDs
- (SmarthomeElektroniker) `@iobroker/testing` 6.2.2; `common.news` limited to 7 entries

### 0.3.42

- (SmarthomeElektroniker) All program phases have German names now, a new test keeps it that way; status codes 144 (default) and 145 (locked) added. Translations and test idea by @meistermopper (#14)
- (SmarthomeElektroniker) Tumble dryer phases no longer point at the washing machine phase table (no visible change, the numbers never overlapped)

### 0.3.41

- (SmarthomeElektroniker) Device types corrected: 16 is the microwave (was: steam oven combi), 67 the dialog oven (was: dish warmer, now 25), the washer-dryer (24) uses the washing machine programs, the oven with microwave (13) its own phases
- (SmarthomeElektroniker) New device types: semi-professional/professional washers, dryers and dishwashers, robot vacuum (23), steam oven combi (31), steam oven with microwave (45, 418 programs), steam oven MK2 (73); dishwasher program 5 added
- (SmarthomeElektroniker) Programs without a German name are shown readably ("Artichokes small") instead of as raw identifier
- (SmarthomeElektroniker) Credits for the tables taken over from Home Assistant, ha-miele-at-lan and ioBroker.miele-unbound

### 0.3.40

- (SmarthomeElektroniker) README: hints for a failing login (ad blocker), moving to another system and why mDNS may find nothing; clearer log message when no appliance is found (#12, thanks @meistermopper)

### 0.3.39

- (SmarthomeElektroniker) Unknown program or phase IDs are now shown as "Programm 201" / "Phase 1234" instead of keeping the text of the previous program (#13)
- (SmarthomeElektroniker) Dishwasher program IDs of the G7771 added (201, 206, 208, 211, 212, 213) (#13)

### 0.3.38
- **Object IDs are now consistently English.** The diagnostics channel was named `sammlung`
  and carried German datapoint names throughout (`befund`, `fortschritt`, `datenJson`,
  `leafVerlaufFein` …), plus four German ones in the otherwise English `history` channel
  (`laufendSeit`, `zaehlerStart`, `gemessenLetzter`, `gemessenTotal`) - 57 of 446 objects in
  total. In the repository request the reviewer therefore took them for hand-made script
  datapoints. `sammlung` became `collection`, `befund` became `finding`, `laufendSeit`
  became `runningSince`.
- **On first start the adapter migrates.** Every existing value moves to its new ID, and only
  then is the old datapoint removed. Collected data is not lost - in a running installation
  that is the field-search records, the leaf scan over 882 probed addresses and the trend
  recording. A freshly set up instance finds nothing to migrate and writes nothing.
- **Recorded history stays**, but under the old ID: history is attached to the object and does
  not move with it. Only the four numbers in the `history` channel are affected.
- **Anyone using the old IDs in their own scripts must follow suit.** Checked before renaming:
  none of them appeared in 56 ioBroker scripts or in the operator's Android app.
- The IDs now live in one place, `lib/ids.js`, instead of scattered through the source.

### 0.3.37
- **Plain text on the raw values.** `status`, `programType`, `programPhase` and `programId` now
  carry their value list in `common.states`, built from the same tables the `…Text` states come
  from, so the two cannot drift apart. The object browser and VIS show the text, the value stays a
  number. The `…Text` states remain unchanged. Programme lists above 64 entries are left out - an
  oven has 168 of them, and they do not belong inside every object.
- **Descriptions where they were missing.** Not one of the 446 objects carried a `common.desc`.
  Everything writable now does, plus the whole diagnostic branch, the three timestamps in
  milliseconds, and the five raw values whose meaning is documented nowhere. At
  `sammlung.leafVerlaufFein` the format and an example are part of the description - without them
  nobody could guess what to type in.
- **Admin rearranged.** "Appliances & polling" carried 25 fields from six unrelated topics and is
  now split into **Appliances** and **Polling & values**; the three eco field indices moved to
  Diagnostics, next to the collection that determines them. 18 blocks of running text disappeared:
  their content now sits as one or two sentences under the field it belongs to, where the admin
  shows it. Seven of 69 fields had a help text before, 28 have one now.
- **The diagnostic branch is only created when it is used.** Its fourteen states per appliance
  used to appear for everyone. They now require data collection or the leaf scan to be switched
  on; the scan and the close recording bring the channel with them so they cannot fail silently.
- **CSV: start, end and difference per leaf field.** Until now a record only held the final state
  of the other leaves. For a lifetime counter like `hoursOfOperation` that says nothing about a
  single programme - only the difference does, and those leaves are the only route for appliances
  that do not answer 2/6195 at all. The adapter now reads the state at the start of a programme as
  well. The export also gained the serial number as its own column, the adapter version, the
  divisor and unit in the field headings, a unit on the temperature, and a note on records that
  predate timestamps instead of silently empty cells.
- **Second file with the analysis.** `befund-<date>.csv` holds one row per field: match against the
  reference, best divisor, average and largest deviation. That is the question the collection
  exists for, and it no longer has to be rebuilt by hand in a spreadsheet.
- **Fix: role `value.volume` had returned.** A newly added table reintroduced a role the ioBroker
  catalogue does not know; the repository check reports it as E1008. It is `value` again.
- **Object IDs of the diagnostic branch in one table.** They are not renamed yet, but they now live
  in `lib/ids.js` instead of scattered through 180 kB of source, so a later rename is an edit to a
  table rather than a search.
- **Device internals as datapoints.** The adapter now carries the field tables of every DOP2 leaf
  documented by the public reverse-engineering projects `MieleRESTServer` (akappner) and
  `ha-miele-at-lan` (tiehfood) - 52 structures, including those for ovens, coffee machines,
  failures and the communication module, not just washing machines. A datapoint is created only
  when the appliance actually delivers the field; nothing is created blindly. The values are
  written from polls that already run, so no additional requests are made. New branch per device:
  `detail.<channel>.<field>`. Off switch in the Diagnostics tab.
- **Fix: Generic value wrappers were read at the wrong position.** Miele wraps every measurement
  in a small structure, and there are two shapes: `[mask, value, interpretation]` and
  `[mask, min, max, current, step]`. The adapter always read the second entry - correct for the
  first shape, the *minimum* for the second, which is 0 on every observed field. Seven fields of
  the eco leaf were affected, among them `heatingTargetTemperature`: during a 40 °C programme the
  appliance reported `[9, 0, 0, 40, 0, 0]` and the adapter 0. Field numbers inside structures are
  now preserved and used.
- **Water: the appliance's own EcoFeedback comes first.** Where DOP2 2/1585 exists, its value for
  the last programme is used; only where it does not does the adapter fall back to counting flow
  meter impulses (field 21 / 200, verified against the house water meter over 24 programmes). The
  new datapoint `eco.source` (called `eco.quelle` before 0.3.45) says which of the two a value came from.
- **The collector records every leaf.** At the end of a programme the adapter reads each answering
  leaf once, gently (five seconds between requests, in the background), and appends the final state
  to the record. This is what makes the collection useful for appliances that do not answer 2/6195
  at all - a dishwasher that stays silent there answers nineteen other addresses. The CSV export
  lists them as columns named `2/119.1 hoursOfOperation`.
- **Leaf scan covers unit 14.** An oven that answered all 882 scanned addresses with 404 was being
  asked in the wrong units: `ha-miele-at-lan` documents the cooking programme lists at 14/1570 and
  14/1571.

### 0.3.36
- **Fix: the final water reading of short programs is no longer missed.** With the regular ten-minute interval the last reading of a 35-minute
  program fell up to nine minutes before the end, and the appliance resets its counters
  immediately afterwards - the intermediate value was then stored as the final one. Eco
  readings now switch to a one-minute interval for the last ten minutes of a program.
- A reading that still did not catch the end is **kept but marked**: it counts as a gap
  rather than as a deviation, so a correct field assignment no longer looks faulty.
- **Admin translations completed.** Twelve texts of the settings page had no translation
  entry and showed German to every other language; six stale keys were removed and the
  language files moved to the short format (`admin/i18n/<lang>.json`). A test now keeps
  the translations and `jsonConfig.json` in step.
- Configurable intervals are capped at runtime - Node fires a timer above 2^31-1 ms
  immediately instead of late.
- `npm run test:unit` now picks up every test file; three of them had never run.
- Leaf scan: a pass aborted because the appliance is busy is now logged as info instead of a
  warning - it is expected during programmes and resumes automatically from the saved progress.
- **Object structure check:** the data points added since 0.3.5 (data collection, metering
  socket, operating hours) now carry names in all eleven languages, and the two input fields
  for values from the Miele app use the writable role `level` instead of read-only `value.*`
  roles. Existing objects are updated on start; a new test fails whenever a data point name
  lacks one of the eleven languages.
- Repository checker: `common.news` limited to published versions and translated into all eleven
  languages, size attributes for the new settings, `node:http` instead of `http`, contact e-mail
  address in `package.json`, `io-package.json` and README.
- **Fix: water field divisor.** The setting was a unit select with 1, 10 or 100, while the default
  for field 21 is 200 (5 ml per step) - the correct value could not be selected, and a missing
  value fell back to 100 in one place and 10 in another. It is now a free number ("water field
  divisor", decimals allowed, default 200); invalid values fall back to 200.
- **Fix: the measured energy of the metering socket was dropped** before it reached the
  field check - every collected cycle lacked it. The field check now compares energy
  fields against the measurement instead of the cloud value rounded to 0.1 kWh.

### 0.3.18
- Leaf scan now separates a genuine refusal from a fault - a 503 or dropped socket no longer marks an address as checked that was never really asked.

### 0.3.17
- Leaf scan with short timeout and incremental saving - a full pass takes minutes instead of hours.

### 0.3.16
- Leaf scan: systematically probes the appliance for DOP2 leaves and records their fields - two passes (idle and running) reveal which fields move with the programme.

### 0.3.15
- Ongoing check: compares delivered values against cloud or app readings after each cycle and reports when the field mapping drifts.

### 0.3.14
- Water consumption verified: field 21 at 5 ml per count matches within 0.5% (8 cycles against the cloud) - field 26 was configured before and carries no measurement at all.

### 0.3.13
- Field analysis detects empty fields and rigidly coupled values - a field that is a fixed multiple of another carries no measurement of its own.

### 0.3.12
- Field analysis: evaluates collected cycles and reports which field carries energy and water - a field that stays constant is rejected.

### 0.3.11
- Renaming of the energy fields now actually takes effect - it was reset by object creation as soon as a programme was running.

### 0.3.10
- Total operating hours from DOP2 leaf 2/119.

### 0.3.9
- Water field corrected (#26); hold rule no longer keeps stale values during a run.

### 0.3.8
- Water value of a finished programme is kept instead of falling back to zero.

### 0.3.7
- Water consumption read from the correct field; eco field indices are now configurable.

### 0.3.6
- Optional raw eco field recording for diagnosing model-specific field indices.

### 0.3.5
- **Fix: appliance status no longer flips to "off" during a running program.** A failed status
  request was reported as a state change instead of being retried; every twenty-fifth poll
  produced a spurious "off". Requests now get a second attempt, and an implausible jump from
  "running" to "off" is discarded when the remaining time says the program is still going.
  The retry count is exposed as `info.pollRetries`.
- **Fix: remaining time was read from the wrong field.** `remainingSeconds` carries only the
  seconds component - at "2:01" it reads 0. The plausibility check now uses
  `remainingMinutes`.
- **Fix: frozen EcoFeedback values are no longer booked as consumption.** When an appliance
  keeps reporting the previous cycle's figures, the unchanged value is skipped instead of
  being added to the new cycle.
- Requests are serialised per appliance, and a cycle now survives an adapter restart.
- **EcoFeedback is only requested while an appliance is actually running.** The DOP2 leaf
  only answers while the appliance is awake - a switched-off machine returns HTTP 500. The
  washing machine's last reading came in mid-programme; afterwards every poll ran into the
  void, one per minute for days, each one occupying the XKM module that answers only one
  request at a time. Polling now happens while a programme runs, during a ten-minute
  follow-up afterwards (the final reading is not settled the moment the status flips), and
  once at startup so that appliances without the leaf can still be identified. The follow-up
  ends early once two consecutive readings are identical.
- **All object names are complete in eleven languages.** The repository check reported 147
  W1001 warnings for `common.name`; channels, EcoFeedback data points, appliance names and the
  instance objects were still English- or German-only. Appliance categories are translated
  while model and serial number stay untouched - they are proper names.

### 0.3.4
- **New: cycle history.** Every completed program is recorded with duration, program name,
  energy and water. The appliances do not keep finished cycles themselves, so the history
  starts when the feature is enabled - it cannot be filled retroactively. Recent cycles are
  kept as JSON in `<serial>.history.cyclesJson`, alongside running totals for cycle count,
  runtime, energy and water. Optionally each cycle is also written to the history adapter,
  timestamped at the end of the cycle, so charts can cover any period.
  Configurable on the new **History** tab: ring buffer size (default 50), retention in days
  (default 730) and the history instance.
- The step-by-step login instructions were stored in English in nine of the eleven language
  files. All eight texts are now translated into es, fr, it, nl, pl, pt, ru, uk and zh-cn.
- `common.news` no longer lists versions that were never published to npm.
- Dependabot: raised the PR limit, spread the schedule over a cron slot, added automerge.

### 0.3.3
- Fix E3005: states declared as `number` no longer receive `null` when the appliance does not
  report a value - the datapoint keeps its default instead. `estimatedEndTime` is cleared with
  0 rather than null.
- Fix E1011: `state.light` is read-only and now carries role `sensor.light`; switching happens
  through `control.lightOn`/`lightOff`.

### 0.3.2
- EcoFeedback conversion moved into `dop2.ecoValues()` and covered by unit tests against the
  cloud-verified reference values (1991 Wh = 1.991 kWh, 953 = 95.3 l).

### 0.3.1
- Fix: `applyIdent` threw on the new `connected` field, which has no ident path. Because that
  entry comes first, **all** device data stayed empty - model, serial number, firmware.
- Eco polling now logs why it skips a device instead of failing silently.

### 0.3.0
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
- mDNS auto-discovery is no longer marked experimental - confirmed working.

Most of the above was contributed by [meistermopper](https://github.com/meistermopper).

### 0.2.1
- Released via GitHub Actions with npm provenance (trusted publishing). No functional
  changes.

### 0.2.0
- Renamed from `miele-lokal` to `miele-local`: English adapter name and title.
  First release under the new package name.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction. See the [LICENSE](https://github.com/SmarthomeElektroniker/ioBroker.miele-local/blob/main/LICENSE) file for the full text.