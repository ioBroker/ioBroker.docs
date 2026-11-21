---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: /6vetXymLtvFQbJ39PxNSgcMHo2tB2PEPZwtWaBsPlI=
---
![Logo](../../../en/adapterref/iobroker.alpha2/admin/mh-logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alpha2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alpha2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alpha2-stable.svg)
![Test und Freigabe](https://github.com/Eisbaeeer/ioBroker.alpha2/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.alpha2

Lokale Steuerung der **[Möhlenhoff](https://www.moehlenhoff.de) Alpha 2** Fußbodenheizungssteuerung (Basisstation EZR) in ioBroker. Der Adapter kommuniziert mit der XML-API der Basisstation in Ihrem Netzwerk. Es ist kein Cloud-Konto erforderlich.

Version 2 ist eine Neuentwicklung. **Es handelt sich um ein direktes Update für Version 1.x** : Der Adaptername, alle Status-IDs und deren Typen bleiben gleich, sodass Aliase, Skripte, Visualisierungen und der Verlauf (InfluxDB, SQL, History) weiterhin funktionieren.

## Was ist neu in Version 2.0?

- **Es wird jeweils nur eine Anfrage bearbeitet.** Der Webserver der Basisstation kann nur eine Verbindung verarbeiten; parallele Anfragen werden abgebrochen (`Error: aborted` Der Adapter reiht nun jede Anfrage in eine Warteschlange ein, ähnlich wie die Weboberfläche der Basisstation, mit einem Timeout pro Anfrage und einer längeren Pause, wenn die Basisstation nicht antwortet.
- **Lichtabtastung.** Aktuelle Werte stammen aus kleinen Umfragen. `cyclic.xml` (Standardeinstellung alle 10 Sekunden). Die vollständige `static.xml` Die Aktuatoren und Einstellungen werden alle 30 Sekunden und nach jeder Änderung eingelesen. Version 1.x liest die gesamte Datei alle 10 Sekunden ein.
- ** `info.connection` ** Zeigt an, ob die Basisstation antwortet; eine Warnung im Protokoll, wenn sie nicht mehr antwortet, eine Information, wenn sie wieder antwortet.
- **Weitere Werte:** Party- und Anwesenheitsmodus, Sollwertbereich, Sollwert des Programms, Offset, Heizbereichszustand, `HEATING` pro Wärmefläche (ein Aktor der Fläche ist geöffnet), `LOWBAT` Und `UNREACH` pro Raumeinheit, Firmware-Versionen, Fehlerzähler, Relais, Kühlung, ECO-Eingang, Frostschutz, Cloud-Verbindungsstatus.
- **Geprüftes Schreiben:** Es können nur die unten aufgeführten Einstellungen geschrieben werden. Werte werden vor dem Senden geprüft (Bereich, Viertelstunden, Datum), Temperaturen sind auf den Bereich des Heizfelds begrenzt. Ein abgelehnter Wert wird protokolliert, und der Status zeigt wieder den Wert der Basisstation an. Bei einer schnellen Wertefolge (z. B. über einen Schieberegler) wird nur der letzte Wert gesendet.
- **Bei ioBroker gibt es keine Geheimnisse:** Cloud-Zugangsdaten, Netzwerkeinstellungen, der Expertencode und die Schließcodes der Zimmereinheiten werden niemals in die Statusmeldungen eingelesen.
- Beschreibbare Temperaturen `min` /`max` ihrer Wärmefläche, damit die Schieberegler in den Visualisierungen den richtigen Bereich haben.
- Keine weiteren Abhängigkeiten `@iobroker/adapter-core` Einstellungsseite als JSON-Konfiguration in allen 11 ioBroker-Sprachen.

## Anforderungen

- Alpha 2 Basisstation mit Netzwerkanschluss, erreichbar über ioBroker (die XML-API erfordert keine Anmeldung)
- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer, Admin 7.6.20 oder neuer

## Installation

Installieren Sie den Adapter in der Administration unter _Adapter_ . Der Discovery-Adapter (`iobroker.discovery` Version 5.4.1 oder neuer) findet Alpha-2-Basisstationen im Netzwerk und schlägt diesen Adapter vor. Andernfalls erstellen Sie eine Instanz und geben Sie die IP-Adresse der Basisstation in deren Einstellungen ein.

## Einstellungen

| Einstellung                           | Standard | Bedeutung                                                         |
| ------------------------------------- | -------- | ----------------------------------------------------------------- |
| IP-Adresse der Basisstation           | –        | z.B `192.168.1.100` optional mit `:port`                            |
| Live-Werte alle (ms)                  | 10000    | Temperaturen, Sollwerte, Pumpe (`cyclic.xml` mindestens 2000      |
| Aktuatoren und Einstellungen alle (s) | 30       | vollständige Daten (`static.xml` zusätzlich nach jeder Änderung   |
| Zeitüberschreitung pro Anfrage (ms)   | 5000     | Eine Anfrage ohne Antwort wird nach Ablauf dieser Zeit storniert. |
| Uhr automatisch einstellen            | aus      | siehe unten                                                       |

Wenn Sie mehr als eine Basisstation verwenden, fügen Sie pro Basisstation eine Instanz hinzu.

### Immer nur ein Programm gleichzeitig

Die Basisstation beantwortet immer nur eine Anfrage gleichzeitig. Andere Skripte, Adapter oder Tools, die sie gleichzeitig abfragen, können dazu führen, dass Anfragen fehlschlagen (`aborted` Auf beiden Seiten. Dieser Adapter soll als einziger die Basisstation abfragen und deren Zustände in Skripten verwenden. Ein separates Skript zum Einstellen der Uhr der Basisstation ist nicht mehr erforderlich (siehe unten). Das gelegentliche Öffnen der Weboberfläche der Basisstation ist unproblematisch: Eine einzelne fehlgeschlagene Anfrage wird nur auf Debug-Ebene protokolliert und beim nächsten Abruf wiederholt; eine Warnung und `info.connection` =`false` Folgen Sie dem Versuch erst nach drei aufeinanderfolgenden Fehlschlägen.

### Uhr der Basisstation

Die Basisstation steuert ihre Schaltzeiten mit ihrer eigenen Uhr. Da die NTP-Synchronisierung oft deaktiviert ist, driftet die Uhrzeit ab. Mit _der Option „Uhr automatisch einstellen“_ vergleicht der Adapter stündlich die Uhrzeit der Basisstation mit der von ioBroker und stellt sie auf die Zeit von ioBroker ein, wenn die Abweichung mehr als 30 Sekunden beträgt. Während die Basisstation selbst über NTP synchronisiert, werden keine Einstellungen vorgenommen. `DEVICE.NTPSYNC`) und in den Stunden um den Wechsel zwischen Sommer- und Winterzeit. ioBroker und die Basisstation müssen dieselbe Zeitzone verwenden. `DEVICE.DATETIME` zeigt die Uhr der Basisstation an.

## Staaten

`HEATAREA.<n>` (Heizbereich / Raum), `HEATCTRL.<n>` (Aktorausgang), `IODEVICE.<n>` (Raumeinheit / Sensor), `PROGRAM.<program>.<period>`, `VACATION`, `DEVICE` (Basisstation) und `info.connection` Die

### Beschreibbar

| Zustand                                        | Werte                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `HEATAREA.<n>.T_TARGET`                        | Sollwert in °C, gerundet auf 0,1, begrenzt auf `T_TARGET_MIN…MAX` |
| `HEATAREA.<n>.T_HEAT_DAY` /`T_HEAT_NIGHT`      | Tag-/Nachttemperatur für die Heizung in °C                       |
| `HEATAREA.<n>.T_COOL_DAY` /`T_COOL_NIGHT`      | Tag-/Nachttemperatur zur Kühlung in °C                           |
| `HEATAREA.<n>.HEATAREA_MODE`                   | `0` Auto, `1` Tag, `2` Nacht                                       |
| `HEATAREA.<n>.PROGRAM_WEEK` /`PROGRAM_WEEKEND` | Programm `0` …`3`                                                 |
| `HEATAREA.<n>.PARTY` /`PRESENCE`               | `true` / `false`                                                 |
| `HEATAREA.<n>.ISLOCKED`                        | `0` entsperrt `1` verriegelt (Kindersicherung der Zimmereinheit)  |
| `PROGRAM.<p>.<period>.START` /`END`            | `hh:mm` in Viertelstunden, `END` Auch `24:00`                      |
| `VACATION.START_DATE` / `END_DATE`             | `YYYY-MM-DD`                                                     |
| `VACATION.STATE`                               | `false` beendet einen Urlaub                                     |
| `DEVICE.T_HEAT_VACATION`                       | Temperatur während des Urlaubs in °C                             |
| `DEVICE.LOCK_MODE`                             | `0` /`1` (Hotelmodus)                                            |

Die Zieltemperatur wurde eingestellt mit `T_TARGET` ist bis zum nächsten Schaltzeitpunkt des Programms gültig.

Um einen Urlaub festzulegen, stellen Sie zunächst ein `DEVICE.T_HEAT_VACATION`, Dann `VACATION.START_DATE` Und `VACATION.END_DATE` Die `VACATION.STATE` zeigt an, ob es sich um einen Aktivurlaub handelt.

Systembefehle der Basisstation (Werksreset, Netzwerk- oder Cloud-Einstellungen, Datenlöschung) können von diesem Adapter nicht gesendet werden.

### Wertformate

Aus Gründen der Kompatibilität mit Version 1.x bleiben einige Werte als Text erhalten: `HEATAREA_MODE`, `PROGRAM_WEEK`, `PROGRAM_WEEKEND`, `ISLOCKED`, `HEATAREA_NR` und alle `IODEVICE` Werte außer `LOWBAT` /`UNREACH` (z.B `BATTERY` =`"0"` Rot, `"1"` Gelb, `"2"` grün). Neue Werte verwenden Zahlen und boolesche Werte.

## Aktualisierung von Version 1.x

Installieren Sie die neue Version über die alte; die Instanz und ihre Einstellungen bleiben erhalten. Objekte werden erweitert, nicht ersetzt, sodass benutzerdefinierte Einstellungen wie die Verlaufsprotokollierung unverändert bleiben. Zustände von Version 1.x, die die Basisstation nicht bereitstellt (z. B. ungenutzte Programmplätze), bleiben unberührt.

## Entwicklung

| Befehl                                | Was es tut                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `npm test`                            | Unit-Tests und Pakettests                                                                                                     |
| `npm run test:integration`            | Startet den Adapter in einem Test-ioBroker gegen eine simulierte Basisstation                                                 |
| `npm run check`                       | Typüberprüfung der JavaScript-Quellen mit ihren JSDoc-Typen (`tsconfig.json`)                                                |
| `npm run lint`                        | ESLint und Prettier                                                                                                           |
| `npm run translate`                   | übersetzt neue Texte von `io-package.json` Und `admin/i18n/en.json` in alle Sprachen                                            |
| `node tools/read-device.js <address>` | Liest eine Basisstation einmalig aus und gibt die Zustände aus, die der Adapter erzeugen würde; sendet keine Daten.           |
| `npm run release`                     | Neue Version mit Änderungsprotokoll und Tag; GitHub Actions veröffentlichen sie auf npm (vertrauenswürdige Veröffentlichung). |

Die Integrationstests benötigen einen Pfad ohne Leerzeichen. Die Tests verwenden eine fiktive Basisstation (`test/fixtures`), keine Daten einer realen Installation.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (djlex83) Settings page translated into all 11 ioBroker languages
- (djlex83) Requires admin 7.6.20 or newer
- (djlex83) Findings of the repository checker fixed (#80)
- (djlex83) Link to the manufacturer added to the README; a connection that breaks off during an answer is detected without the deprecated `aborted` event; contact address instead of the GitHub noreply address (#82)
- (djlex83) Type check of the sources (`npm run check`, also in CI), `@iobroker/adapter-dev` for translations (`npm run translate`), manual review step in the release script (#83)
- (djlex83) README: badges, requirements, installation with discovery (`iobroker.discovery` 5.4.1 or newer), note on other programs polling the base station, development

### 2.1.0 (2026-11-18)

- (djlex83) Optional: sets the clock of the base station when it is more than 30 s wrong (checked every hour)
- (djlex83) Requires Node.js 22 or newer
- (djlex83) Tested on Node.js 22, 24 and 26; release workflow with npm trusted publishing
- (djlex83) Roles of text, date and time states corrected (`text`, `date`); old 1.x changelog moved to `CHANGELOG_OLD.md`

### 2.0.0 (2026-11-17)

- (djlex83) Rewrite: one request at a time with timeout and back-off, `info.connection`
- (djlex83) Polls the small `cyclic.xml` for live values, `static.xml` only every 30 s and after changes
- (djlex83) New values: party, presence, set point range, program set point, offset, `HEATING`, `LOWBAT`, `UNREACH`,
  firmware, error counter, relay, cooling, ECO input, frost protection, cloud state
- (djlex83) Checked writing with whitelist, ranges and quarter hours; only the last value of a quick series is sent
- (djlex83) Cloud credentials, network settings and codes are no longer read
- (djlex83) Objects are extended instead of replaced (keeps history settings); state IDs and types unchanged
- (djlex83) JSON config, current adapter-core, tests with a simulated base station, no `request`/`xml2js`

### 1.0.4

- (bigluke26) Added PUMP status issue #26

### 1.0.3

- (Eisbaeeer) Fixed error messages in log

### 1.0.2

- (oHa510) Fixed an issue if you don't use all 4/8/12 heat areas, then heat areas could get assigned to the wrong
  heat area object in ioBroker
- (oHa510) Expanded heat areas and heat controls to the maximum of 12
- (oHa510) Changed heat area and heat control indexing to 1–12 (old 0–11 was very confusing)
- (oHa510) Added support for locking controllers (kids mode)
- (oHa510) Added support for locking set temperature (hotel mode)
- (oHa510) Added some new objects and infos like IODEVICEs etc.

### 1.0.1

- (Eisbaeeer) Fixed issues

### 1.0.0 (2019-06-24)

- (Eisbaeeer) Fixed issue #6 (HEATAREA_NAME)

## License

The MIT License (MIT)

Copyright (c) 2026 djlex83 <dj-lex@gmx.de>  
Copyright (c) 2018-2021 Eisbaeeer <eisbaeeer@gmail.com>

See [LICENSE](https://github.com/Eisbaeeer/ioBroker.alpha2/blob/master/LICENSE). Möhlenhoff and Alpha 2 are trademarks of their owners; this project is not
affiliated with Möhlenhoff GmbH.