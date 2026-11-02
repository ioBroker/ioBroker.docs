---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.beckhoff
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.beckhoff.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.beckhoff
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/beckhoff/svg-badge.svg
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.beckhoff
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.beckhoff/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.beckhoff
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.beckhoff
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/beckhoff-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/beckhoff-installed.svg
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.beckhoff/actions/workflows/test-and-release.yml/badge.svg
BADGE-CodeQL: https://github.com/iobroker-community-adapters/ioBroker.beckhoff/actions/workflows/codeql.yml/badge.svg
---
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.beckhoff) ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.beckhoff/workflows/Test%20and%20Release/badge.svg) ![npm](https://img.shields.io/npm/dm/iobroker.beckhoff) [![npm](https://img.shields.io/npm/v/iobroker.beckhoff.svg)](https://www.npmjs.com/package/iobroker.beckhoff) ![Number of Installations](http://iobroker.live/badges/beckhoff-stable.svg) ![Number of Installations](http://iobroker.live/badges/beckhoff-installed.svg)

![Logo](img/beckhoff.png)

# ioBroker.beckhoff

Dieser ioBroker Adapter realisiert die Kommunikation mit eine Beckhof Steuerung (Twincat 2 oder 3) über das ADS Protokoll.
Das ADS Protocol ist in jeder Beckhoff Steuerung implementiert und kann ohne Lizenz verwendet werden.

Dieses Projekt hat keine Verbindung mit der Firma Beckhoff

## Beschreibung

### Anforderungen

- Beckhoff mit Netzwerkanschluss die in einem vom ioBroker erreichbaren Netzwerk hängt
  - Der Steuerung muss eine fixe IP-Adresse vergeben werden
  - Die Steuerung muss vom ioBroker pingbar sein
  - TwinCat 2 **ausgenommen BC Steuerungen** oder TwinCat 3

### Konfiguration der Steuerung

1. Im Projekt muss ADS aktiviert sein. Dazu im Steuerungsproject in die Taskkonfiguration gehen und die Checkbox `Symbole erzeugen` aktivieren. Dann die Konfiguration auf die Steuerung laden und diese neu starten. Ein Neustart ist nur nötig wenn TwinCat 2 verwendet wird.

   ![createSymbols](img/createSymbols.png)

2. In der Steuerung muss eine Statische Route angelegt werden. Die Route muss mit dem ioBroker zusammenpassen (IP-Adresse und AMS-Net-ID).

   Hier ein Beispiel wie das aussehen kann wenn die Route direkt auf der Steuerung hinzugefügt wird. Die Route kann auch über den Engineerien Rechner hinzugefügt werden.

   ![createSymbols](img/addRoute.png)

   Weitere Informationen über den TwinCat Router und die Steuerung allgemein kann im [Beckhoff Information System](https://infosys.beckhoff.com/ 'Beckhoff Information System') nachgelesen werden.

3. Bei TwinCat 2 muss in der Steuerung noch eine Struktur angelegt werden. Die Struktur danach zu einer globalen Variablentabelle hinzufügen. Hier können dann alle benötigten Variablen angelegt werden. Der Datenaustausch wird dann von ADS und dem Adapter selbstständig ausgeführt.

   ##### Derzeit unterstützte Datentypen: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, TIME, TIME_OF_DAY, TOD, DATE, DATE_AND_TIME, DT, STRING

   OPTIONAL: Es kann eine Variable direkt in der Variablentabelle ohne Verschachtelung mit einem exakten Namen angelegt werden -> ioBrokerResync (Groß-/Kleinschreibung und Datentyp ist egal) -> Jedes mal wenn sich dieser Wert ändert wird die Variablentabelle im ioBroker neu eingelesen.

4. Bei TwinCat 3 muss in der Steuerung noch eine globale Variablentabelle angelegt werden. Hier können dann alle benötigten Variablen angelegt werden. Der Datenaustausch wird dann von ADS und dem Adapter selbstständig ausgeführt.

   ##### Derzeit unterstützte Datentypen: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, TIME, TIME_OF_DAY, TOD, DATE, DATE_AND_TIME, DT, STRING

   OPTIONAL: Es kann eine Variable direkt in der Variablentabelle ohne Verschachtelung mit einem exakten Namen angelegt werden -> ioBrokerResync (Groß-/Kleinschreibung und Datentyp ist egal) -> Jedes mal wenn sich dieser Wert ändert wird die Variablentabelle im ioBroker neu eingelesen.

### Adapter Einstellungen

#### Twincat 3 und Twincat 2

1. Runtimeversion auswählen
2. Ziel IP-Adress und AMS-Net-ID eintragen.
3. Bei TwinCat 2 den Instanznamen der Struktur aus der globale Variablentabelle eintragen.
4. Bei TwinCat 3 den korrekten Variablentabellennamen eintragen.
5. Die restlichen Punkte müssen normalerweise nicht geändert werden.

#### Twincat 2 <= v2.11.2240

Die \*.tpy Datei aus dem SPS Projekt muss hochgeladen werden. -> Immer wenn am Struct der für die Kommunikation zum ioBroker zuständig ist etwas geändert wird muss diese Datei nochmals hochgeladen werden.

### Datenaustausch

- Sobald sich eine Variable in der Steuerung ändert wird dieser Wert selbstständig in den jeweiligen State im ioBroker übertragen.
- Wird ein Wert im ioBroker geändert (Wichtig: ACK muss FALSE sein!!) wird dieser selbstständig an die Steuerung übertragen. Wird der Wert von der Steuerung übernommen wird ACK auf TRUE gesetz.

### Wichtiges

1. Der TwinCAT AMS Router lässt keine mehrfachen TCP Verbindungen vom gleichen Host zu. Wenn zwei Instanzen vom selben Host zum selben TwinCat Router aufgebaut werden so wird vom Router automatisch die erste Verbindung geschlossen und nur der neusten geantwortet.
2. Der Adapter syncronisiert automatisch alle Variablen im ioBroker. Es gibt mehrere Möglichkeiten wie ein resync getriggert werden kann:
   - Wenn sich der Wert der Resyc Variable ändert (Siehe [hier](#Konfiguration-der-Steuerung))
   - Wenn die Steuerung länger nicht im RUN Modus ist als der Reconnect Interval -> Dann wird beim übergang der Steuerung in den RUN Modus die Variablentabelle resynchronisiert.
   - Wenn das Project auf die Steuerung geladen wird. Ausnahme -> OnlineChange
   - Wenn der Adapter neu gestartet wird.
3. Bei "Synchronisierung" bzw. "Einlesen" ist nicht der Werteaustausch der Variablen gemeint sondern die Synchronisierung der Variablen selbst und das anlegen bzw. löschen derselben im ioBroker

## Verbindung und Symbolcache

Die neue Konfiguration akzeptiert eine IPv4-Adresse oder einen Hostnamen. Die AMS-Net-ID bleibt separat erforderlich.

- `adsTimeout`: Timeout je ADS-Anfrage in Millisekunden, Standard 500. Bei langsamen Verbindungen kann z.B. 2000 sinnvoll sein.
- `reconnectInterval`: Wartezeit vor einem neuen Verbindungsversuch und Intervall der SPS-Statusprüfung, Standard 15 Sekunden.
- `cacheSymbolTable`: Symbolbeschreibungen bei kurzen Verbindungsunterbrechungen wiederverwenden, Standard aktiv.
- `symbolCacheMaxAge`: maximale Ausfalldauer für die Wiederverwendung, Standard 300 Sekunden. Null deaktiviert die Wiederverwendung nach einem Ausfall.

Nach dem Reconnect werden die Symbolversion geprüft, neue ADS-Handles und Benachrichtigungen angelegt und aktuelle Werte gelesen. Bei unveränderter Symbolversion werden die Symbole und Datentypen nicht vollständig heruntergeladen; der Objektabgleich entfällt. Bestehende IDs, Namen und Zuordnungen bleiben erhalten.

Geänderte Symbolversionen, erkannte SPS-STOP/RUN-Wechsel, Fehler mit zwischengespeicherten Symbolen und Änderungen von `ioBrokerResync` lösen eine vollständige Synchronisation aus. Ein ausbleibendes Schreib-Acknowledge aktualisiert nur die Werte und wiederholt keine SPS-Schreibbefehle.

Die Symbolversion ist ein 8-Bit-Zähler. Bei einem während der Unterbrechung unbemerkten SPS-Neustart oder Zählerüberlauf kann dieselbe Version erneut auftreten. Falls dies in der Anlage möglich ist, den Cache deaktivieren oder `ioBrokerResync` in der SPS beim Start und bei Programmänderungen ändern. Die zeitliche Grenze allein erkennt solche Änderungen nicht sicher.

## TPY-Dateiupload

Für TwinCAT 2 <= v2.11.2240 kann eine `.tpy`-Datei hochgeladen und ausgewählt werden. Die Dateien liegen im ioBroker-Dateispeicher unter `beckhoff.<Instanz>.tpy`. Der Adapter liest die Auswahl beim Start. Ohne Dateiauswahl wird der bisherige Inhalt von `xmlTpyData` verwendet, der weiterhin bearbeitet werden kann. Eine ausgewählte Datei hat Vorrang. Nach Änderungen der SPS-Symboldefinitionen muss die TPY-Datei aktualisiert werden.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-10-19)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (zonfacter) Reuse validated symbol metadata after short reconnects, renew ADS handles and refresh values; fully synchronize on metadata changes, observed PLC stops or expired caches
- (zonfacter) Add a configurable ADS request timeout and hostname support; preserve variable-table prefix matching and existing object mappings
- (zonfacter) Migrate to responsive jsonConfig with native TPY upload, persistent filename feedback and packaged translations; retain legacy XML and TPY paths
- (zonfacter) Prepare a named TPY file directory without removing originals or overwriting differing files; support configuration requests through supportedMessages.custom
- (zonfacter) Isolate compact-mode sessions, reject stale callbacks and avoid a metadata reload when only a write acknowledgement is missing
- (zonfacter) Fix synchronization when a metadata notification arrives during the final connection-state write
- (mcm1957) Dependencies have been updated

### 1.7.0 (2026-02-12)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config standard configuration
- (mcm1957) Dependencies have been updated

### 1.6.0 (2024-04-02)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.5.3 (2023-10-29)

- (mcm1957) Dependencies have been updated

### 1.5.3-alpha.0 (2023-10-29)

- (mcm1957) Standard test environment has been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 dkleber89 <dkleber89@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.