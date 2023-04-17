---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.logparser
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.logparser.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.logparser/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.logparser
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.logparser.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/logparser-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/logparser-installed.svg
---
## Logparser Adapter für das Parsen (Filtern) von ioBroker Logs

Mit diesem Adapter können die ioBroker-Logs aller Adapter entsprechend geparsed, also gefiltert werden.

# Konfiguration

## Registerkarte "Parser Regeln (Filter)"

Für jeden gesetzten Filter Filter (Regel) werden jeweils Datenpunkte unterhalb von `logparser.[instanz].filters` angelegt.

| **Spalte**            | **Erklärung**                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiv                 | Filter aktivieren/deaktivieren                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Name                  | Beliebiger Name (Leerzeichen und Sonderzeichen werden automatisch entfernt), wird als Datenpunkt unter 'filters' verwendet                                                                                                                                                                                                                                                                                                                                                    |
| Whitelist: UND        | All diese Ausdrücke müssen vorkommen. Um diese Regel zu überspringen, einfach `*` eintragen oder leer lassen.                                                                                                                                                                                                                                                                                                                                                                 |
| Whitelist: ODER       | Mindestens einer dieser Ausdrücke muss vorkommen. Um diese Regel zu überspringen, einfach `*` eintragen oder leer lassen.                                                                                                                                                                                                                                                                                                                                                     |
| Blacklist             | Sobald einer dieser Ausdrücke vorhanden ist, wird das Log nicht übernommen, egal was sonst für Filter definiert sind.                                                                                                                                                                                                                                                                                                                                                         |
| Debug/Info/Warn/Error | Welche Log-Level sollen berücksichtigt werden?                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Bereinigen            | Ungewünschte Zeichenfolgen aus Logzeile entfernen.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Max                   | Maximale Anzahl Zeichen der Logzeile, alles was länger ist, wird abgeschnitten. Leer lassen, falls nicht gebraucht.                                                                                                                                                                                                                                                                                                                                                           |
| Merge                 | Hiermit werden Logeinträge mit gleichem Inhalt zusammengefasst und ein Zähler vorangestellt.<br>Ohne Merge:<br>`2019-08-17 20:00:00 - Wetterdaten abrufen.`<br>`2019-08-17 20:15:00 - Wetterdaten abrufen.`<br>`2019-08-17 20:30:00 - Wetterdaten abrufen.`<br>Mit Merge:<br>`2019-08-17 20:30:00 - [3 Einträge] Wetterdaten abrufen.`<br>D.h. es wird dann daraus nur noch eine Logzeile mit letztem Datum/Uhrzeit und hinzügefügtem "[3 Einträge]".                         |
| Datumsformat          | `YYYY` = Jahr 4-stellig, `YY` = Jahr 2-stellig, `MM` = Monat, `DD` = Tag, `hh` = Stunde, `mm` = Minute, `ss` = Sekunde. Teile innerhalb `#`-Zeichen werden durch "Heute" bzw. "Gestern" ersetzt.<br>Beispiele:<br>Aus `#DD.MM.# hh:mm` wird 'Heute 20:35', falls der Log von heute ist.<br>Aus `#DD.MM.YYYY# hh:mm` wird 'Gestern 20:35', falls der Log von gestern ist.<br>Aus `#DD.MM.YYYY# hh:mm` wird '18.02.2020 20:35', falls der Log nicht von heute oder gestern ist. |

#### String / Regex

Bei den Spalten _Whitelist: UND_, _Whitelist: ODER_, _Blacklist_ und _Bereinigen_ ist sowohl normaler Text (String) als auch Regex erlaubt. Mehrere Ausdrücke mit Komma trennen. Regex bitte zwischen `/` und `/` setzen, damit erkennt der Adapter, ob es sich um eine Regexp handelt. Falls String: es wird stets auf teilweise Übereinstimmung geprüft. Zum ignorieren/deaktivieren: leer lassen.

Beispiele für Einträge unter "Bereinigen":
| **Eintrag** | **Erklärung** |
|-----------------------|-----------------------------------------------------------------------|
| `/script\.js\.[^:]*: /, +++, !!!!` | Entfernen der Zeichenfolgen "script.js.xxxx:" (per Regex), sowie aller Vorkommnisse von "+++" und "!!!!" |
| `+++, !!!!` | Entfernen aller Vorkommnisse von "+++" und "!!!!" |

## Registerkarte "Weitere Einstellungen"

-   **PID entfernen**: Der js-Controller Version 2.0 oder größer fügt Logs teils vorne die PID in Klammern hinzu, also z.B. `(12234) Terminated: Without reason`. Mit dieser Option lassen sich die PIDs inkl. Klammern, wie z.B. `(1234)`, aus den Logzeilen entfernen.

-   **Entferne script.js.Script_Name:**: Vom JavaScript-Adapter generierte Logs beginnen mit `script.js.<Script_Name>:`. Wenn diese Option aktiviert ist, werden diese automatisch aus der Logzeile immer entfernt.

-   **Datum durch "Heute" / "Gestern" ersetzen**: In den Filtern kann beim Datumsformat für mittels Hash-Zeichen (#) das heutige bzw. gestrige Datum durch 'Heute' bzw. 'Gestern' ersetzt werden. Hier können andere Begriffe statt "Heute"/"Gestern" definiert werden.

-   **Text für "Merge" (Logs zusammenfassen)** Dieser Text wird jeder Logzeile vorangestellt, wenn _Merge_ aktiviert ist. Das `#`-Zeichen wird dabei dann durch die Anzahl der Logs mit dem gleichen Inhalt ersetzt. Sonderzeichen wie `[](){}/\` etc. sind erlaubt. Beispiele (ohne Anführungszeichen): "`[# Einträge] `", "`(#) `", "`# Einträge: `"

## Registerkarte "Visualisierung"

-   **Anzahl verwendeter JSON-Tabellen in VIS**: Hiermit werden zusätzliche Datenpunkte für die Ausgabe als JSON-Tabelle in VIS erzeugt. Damit ist es möglich, in einer VIS-Tabelle zwischen den einzelnen Filtern umzuschalten (z.B. 'Homematic', 'Warnungen', 'Fehler' usw.), die dann dynamisch jeweils in nur einer Tabelle ausgegeben werden.
    <br>Hier die Anzahl der unterschiedlichen JSON-Tabellen angeben, in denen du das brauchst. Diese werden angelegt unter 'visualization.table1', 'visualization.table2', usw. Zum deaktivieren: 0 eintragen (dann werden diese zusätzlichen Datenpunkte nicht erstellt)

-   **Spalten-Reihenfolge für JSON-Tabelle**: Hier kann die Reihenfolge der einzelnen Spalten verändert werden. Als zusätzliche Spalte wird immer ts (timestamp) hinzugefügt. In VIS usw. bei Bedarf einfach ausblenden.<br>Falls du weniger als 4 Spalten brauchst: Wähle einfach einen Eintrag der ersten Spalten aus, die du brauchst, und blende den Rest dann mit dem VIS JSON-Table-Widget (o.ä.) aus.

-   **Sortierung**: Wenn aktiviert: sortiert die Logeinträge absteigend, also neuester oben. Wenn deaktiviert: Sortiert die Logeinträge aufsteigend, also ältester oben. Empfohlen ist absteigende Sortierung, also diese Option aktivieren.

## Registerkarte "Globale Blacklist"

Falls einer dieser Satzteile/Begriffe in einer Logzeile enthalten ist, dann wird der Log-Eintrag von diesem Adapter ignoriert, auch unabhängig davon, was in den Parser-Regeln (Filter) eingestellt ist. Es ist sowohl String als auch Regex erlaubt. Falls String: es wird auf teilweise Übereinstimmung geprüft, d.h. wenn du z.B. „echo“ einträgst, dann wird jede Logzeile, die „echo“ enthält, ausgefiltert, also auch z.B. „Command sent to echo in kitchen.“

Regex bitte zwischen `/` und `/` setzen, damit erkennt der Adapter, ob es sich um eine Regexp handelt.

In der Spalte "Kommentar" kannst du beliebig den jeweiligen Eintrag kommentieren/erklären, etwa damit du später nachvollziehen kannst, warum du diesen Blacklist-Eintrag gesetzt hast.

## Registerkarte "Experten-Einstellungen"

-   **Update-Intervall: Datenpunkte aktualisieren**: Neu reinkommende Logeinträge werden gesammelt und regelmäßig in die Datenpunkte geschrieben. Hiermit kann das Intervall definiert werden.<br>_Hinweis_: Die Datenpunkte werden nur geschrieben, falls es eine Änderung gab. Dennoch ist es aus Performance-Sicht nicht sinnvoll, hier ein zu kurzes Intervall einzustellen. Kleiner als 2 Sekunden ist nicht erlaubt.
-   **Maximale Anzahl Logeinträge**: Die maximale Anzahl an Logeinträgen, die in den Datenpunkten behalten werden (ältere werden entfernt). Bitte keine zu hohe Anzahl, je größer, desto mehr Auslastung für den Adapter und damit deinen ioBroker-Server. Eine Zahl von 100 hat sich gut bewährt.

# Visualisierung (Log-Ausgaben im VIS darstellen)

Hier ist ein VIS-Beispielprojekt, welches in VIS importiert werden kann: [vis-project-ex_logparser-adapter.zip](https://github.com/iobroker-community-adapters/ioBroker.logparser/raw/master/accessories/vis/vis-project-ex_logparser-adapter.zip). Diese zip-Datei einfach herunterladen, und in VIS im Menü `Setup > Projekt-Export/Import > Import` auswählen, um dann entsprechend als Projekt zu importieren. Bitte beachte, dass du die [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) benötigt, denn sonst wird das nicht richtig dargestellt.

![main.jpg](img/visintro.gif)

# Weitere Funktionen

## Manipulation der JSON-Spalteninhalte durch Log

Es gibt die Möglichkeit, über JavaScript, Blockly, etc. Logs abzusetzen und dabei zu beeinflussen, welcher Inhalt in die Spalten 'date','severity','from','message' der JSON-Tabellen gesetzt wird.

### Beispiel

Folgender Befehl wird in einem JavaScript ausgeführt:
`log('[Alexa-Log-Script] ##{"message":"' + 'Befehl [Musik an].' + '", "from":"' + 'Alexa Flur' + '"}##');`

Damit wird nun der Teil `##{"message":"' + 'Befehl [Musik an].' + '", "from":"' + 'Alexa Flur' + '"}##` genommen, als Log-Text 'Befehl [Musik an].' (anstatt der Logzeile) angezeigt, und als Quelle wird 'Alexa Flur' (anstatt javascript.0) angezeigt.

### Syntax

In die Logzeile folgendes aufnehmen: `##{"date":"", "severity":"", "from":"", "message":""}##`
Dabei können einzelne Werte entfernt werden, also z.B. nur um den Logtext (message) zu ändern, nimmt man `##{"message":"hier der Text."}##`

### Use Cases

Da der Adapter umfangreiche Filter bietet, von denen beliebig viele angelegt werden können und dann in Datenpunkten verfügbar sind, können mit dieser Funktion einfach per [log()](https://github.com/ioBroker/ioBroker.javascript/blob/master/docs/en/javascript.md#log---gives-out-the-message-into-log) entsprechend Tabellen gefüllt werden.

### Script-Beispiel (für JavaScript-Adapter): Alexa History - alle Sprach-Kommandos im VIS ausgeben

Hier ist ein [Beispiel-Script](https://github.com/iobroker-community-adapters/ioBroker.logparser/blob/master/accessories/alexa-history.js) für den JavaScript-Adapter.

**Installation:**

1. [Script-Code](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.logparser/master/accessories/alexa-history.js) öffnen.
2. Alles kopieren (Strg + a)
3. Zur ioBroker-Administration wechseln und dort im linken Menü "Skripte" auswählen.
4. Mit dem "+"-Menüpunkt ein neues Script hinzufügen, dann "Javascript" auswählen, und einen Namen vergeben (z.B. "Alexa-History") und speichern.
5. Dieses neue Script öffnen (ist jetzt natürlich noch leer), den zuvor kopierten Code mit Strg+v einfügen und Speichern.

**Wie funktioniert das Script?**

1. Sobald ein Kommando an ein Alexa-Gerät gesprochen wird, wird der Datenpunkt `alexa2.x.History.json` entprechend gefüllt und enthält das Kommando, das an das Alexa-Gerät gesprochen wurde. Dieses Script wandelt diese Sprachkommandos in ein durch diesen Adapter verstandene Syntax um (siehe oben unter Beispiel).

2. Der Adapter erhält dann z.B. folgendes Log: `javascript.0 (12345) script.js.Alexa: [Alexa-Log-Script] ##{"msg":"Licht An", "source":"Sonos Küche"}##`

3. Dies wandelt der Adapter um in: `Licht An`, und als Quelle wird nicht mehr `javascript.0` angezeigt, sondern `Sonos Küche`.

**Einrichtung**

Sobald das Script läuft, in den Admin-Einstellungen des Adapters einen neuen Filter erstellen:
![main.jpg](img/alexa-log-filter.png)

Dabei darauf achten, dass in der Spalte "Whitelist UND" `[Alexa-Log-Script]` steht.

**Ergebnis**

Damit werden dann nur die Logs vom Alexa-Script in diesem Filter angezeigt.

![main.jpg](img/alexa-log-filter.vis.png)

Wie zu sehen wird damit also "Quelle" (wäre hier normalerweise `javascript.0`) durch das Alexa-Gerät (hier: `Sonos Küche`) ersetzt. Außerdem wird die Message durch den gesprochenen Befehl (hier: `Licht An`) ersetzt. Genauso können auch noch das Datum (`date`) und das Log-Level (`level`) ersetzt werden.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.2 (2023-04-07)

-   (ciddi89) Fixed: Visualization tables was not working correctly
-   (ciddi89) Fixed: Issue if no dateformat was selected correctly

### 2.1.1 (2023-04-05)

-   (ciddi89) Fixed: [#25](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/25) Missing CSS class in date if it's older than today
-   (ciddi89) Changed: Moved Dateformat option from table to other settings
-   (ciddi89) Updated: Dependencies

### 2.1.0 (2023-03-05)

-   (ciddi89) Added: [#24](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/24) Option to remove 'COMPACT' in log entries
-   (ciddi89) Added: [#21](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/21) Option to remove only 'script.js' in log entries
-   (ciddi89) Fixed: [#46](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/46) Midnight function to change today/yesterday
-   (ciddi89) Fixed: [#23](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/23) When nothing selected in blacklist, adapter didn't work anymore
-   (ciddi89) Other: Small code and translation improvements

### 2.0.0 (2023-03-02)

-   (ciddi89) Dropped: Admin 5 support
-   (ciddi89) Changed: Admin html to jsonConfig [#36](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/36)
-   (ciddi89) Fixed: Issue with Midnight function
-   (ciddi89) Added: Translations of admin ui [#28](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/28)
-   (ciddi89) Updated: Readme

### 1.2.3 (2023-02-25)

-   (ciddi89) Fixed: Alexa-History script
-   (ciddi89) Fixed: adjusted links in admin/docs to new repo
-   (ciddi89) Rebuilded main.js

### 1.2.2 (2023-02-23)

-   (McM1957) sentry integration has been fixed

### 1.2.1 (2023-02-23)

-   (McM1957) Adapter has been moved to iobroker-community-adapters

### 1.1.0

-   (Mic-M) Fixed issue [#15](https://github.com/Mic-M/ioBroker.logparser/issues/15) regarding regex for tab "Parser Rules", column "Blacklist"
-   (Mic-M) Enhancement [#16](https://github.com/Mic-M/ioBroker.logparser/issues/16) - add specific CSS classes to any element of the JSON log per adapter option.
-   (Mic-M) Major improvement: Implemented entire documentation into adapter itself to significantly improve usability.
-   (Mic-M) A few improvements under the hood.

### 1.0.4

-   (Mic-M) Fixed 'Today/Yesterday' updating issue - https://forum.iobroker.net/post/469757. Thanks to (Kuddel) for reporting and (Glasfaser) for further debugging.

### 1.0.3

-   (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 1.0.2

-   (Mic-M) Added debug logging for callAtMidnight() and updateTodayYesterday()

### 1.0.1

-   (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 1.0.0

-   (Mic-M) No changes - just prepare versioning to add adapter to stable repository per [Adapter dev docu](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)

## License

MIT License

Copyright (c) 2020 - 2023 Mic-M, McM1957 <mcm57@gmx.at>, ciddi89 <mail@christian-behrends.de>, ioBroker Community Developers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.