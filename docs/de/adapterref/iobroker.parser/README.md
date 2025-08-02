---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parser/README.md
title: ioBroker-Parser-Adapter
hash: JGWFOrJmQiymwBAKSTgMT/ZQacopD19LF+/l++bVvxk=
---
![Logo](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Anzahl der Installationen](http://iobroker.live/badges/parser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.parser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)

# IoBroker-Parser-Adapter
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter analysiert Daten, die über eine URL oder aus einer Datei empfangen wurden, mithilfe regulärer Ausdrücke. Für jede Regel, die in den Einstellungen dieses Adapters konfiguriert wird, wird ein Status unter `parser.<instance number>` erstellt und mit den analysierten Informationen gefüllt und aktualisiert.

## Einstellungen
### 1. Standard-Abfrageintervall
Dieser Standard-Pollingintervallwert wird verwendet, wenn für einen Eintrag in der Konfigurationstabelle (Spalte: "Intervall") kein individueller Pollingintervallwert angegeben ist. Das Intervall wird in Millisekunden angegeben und definiert, wie oft der Link oder die Datei gelesen und die Zustände aktualisiert werden.

**Hinweis:** Verwenden Sie kein zu aggressives Abfrageintervall, insbesondere für Website-URLs. Wenn Sie beispielsweise den Preis Ihrer Aktien von einer bestimmten Website abrufen möchten, sollten Sie wahrscheinlich mit einem Intervall von nur 24 Stunden (= 86400000 ms) auskommen, wenn Sie kein Daytrader sind. Wenn Sie zu oft versuchen, Daten von bestimmten URLs abzurufen, kann die Website Sie sperren und auf eine Server-Blacklist setzen. Verwenden Sie das Abfrageintervall daher bitte mit Vorsicht.

### 2. Anforderungs-Timeout
Geben Sie an, wie lange der Adapter bei Website-Abfragen auf eine HTTP-Antwort wartet

### 3. Verzögerung zwischen Anfragen
Geben Sie an, wie lange der Adapter bei der Ausführung von Remoteabfragen zwischen HTTP-Anfragen wartet. Nützlich beim Abrufen von Daten von langsamen Hosts oder über langsame Verbindungen, um eine Überlastung beider Hosts zu vermeiden. Null (Standard) bedeutet keine Verzögerung.

Diese Verzögerung gilt für jeden Host einzeln. Wenn Remoteabfragen so konfiguriert sind, dass sie von mehreren Remotehosts abgerufen werden, wird jeder Host parallel abgefragt.

Die Verzögerung ist ein Mindestwert zwischen dem Einleiten jeder Anfrage. Das heißt, wenn das Lesen einer Anfrage länger dauert als dieser Verzögerungsparameter, wird die nächste sofort gestartet, sobald der Lesevorgang abgeschlossen ist.

### 4. Akzeptieren Sie ungültige Zertifikate
Geben Sie an, ob selbstsignierte/ungültige SSL/TLS-Zertifikate bei HTTPS-Anfragen akzeptiert oder abgelehnt werden.

### 5. Verwenden Sie einen unsicheren HTTP-Parser
Geben Sie an, dass ein unsicherer HTTP-Parser verwendet werden soll, der ungültige HTTP-Header akzeptiert. Dies kann die Interoperabilität mit nicht konformen HTTP-Implementierungen ermöglichen.
Die Verwendung des unsicheren Parsers sollte vermieden werden.

### 6. Tabelle
Klicken Sie auf die Schaltfläche „Plus“, um der Tabelle einen neuen Eintrag hinzuzufügen.

**Leistungshinweis:** Wenn Sie dieselbe URL oder denselben Dateinamen mehr als einmal in verschiedene Tabellenzeilen eingeben und die Werte der Spalte „Intervall“ identisch sind, wird der Inhalt der URL oder des Dateinamens nur **einmal** abgerufen und zwischengespeichert, um mehrere Tabellenzeilen zu verarbeiten, die mit URL/Dateiname und Intervall übereinstimmen. Auf diese Weise können Sie mehrere reguläre Ausdrücke (also mehrere Tabellenzeilen) auf eine einzelne URL oder einen einzelnen Dateinamen anwenden, ohne die Daten mehrmals aus der Quelle abrufen zu müssen.

**Tabellenfelder:**

- **_Name_** – Name des Status, der unter „parser.<Instanznummer>“ erstellt wird. Leerzeichen sind nicht zulässig. Sie können Punkte „.“ als Trennzeichen verwenden, um Unterordner zu erstellen. Beispiel: „Shares.Microsoft.Current“ ergibt „parser.<Instanznummer>.Shares.Microsoft.Current“.
- **_URL oder Dateiname_** - entweder eine URL einer Website oder der Pfad zu einer Datei, zu der wir Informationen abrufen möchten. Beispiele: `https://darksky.net/forecast/48.1371,11.5754/si24/de` (Wetterinformationen München) oder `/opt/iobroker/test/testdata.txt` (Datei aus ioBroker).
- **_RegEx_** - regulärer Ausdruck, wie Daten aus einem Link extrahiert werden. Es gibt einen guten Dienst zum Testen regulärer Ausdrücke: [regex101](https://regex101.com/). Z. B. `temp swip">(-?\d+)˚<` für die obige Zeile.
- **_Item_** (deutsch: "Num") - ein regulärer Ausdruck kann mehrere Einträge finden (entsprechen). Mit dieser Option können Sie festlegen, welcher Treffer ausgewählt werden soll. 0 = erster Treffer, 1 = zweiter Treffer, 2 = dritter Treffer usw. Standard ist 0 (erster Treffer).
- **_Role_** – eine der Rollen:
- benutzerdefiniert - Benutzer definiert sich selbst über _admin_ die Rolle
- Temperatur – der Wert ist die Temperatur
- Wert – der Wert ist eine Zahl (z. B. Dimmer)
- Blinds - der Wert ist eine Blindposition
- Schalter – der Wert ist die Schalterposition (true/false)
- Schaltfläche - der Wert ist eine Schaltfläche
- Indikator - Boolescher Indikator
- **_Typ_** – der Variablentyp gemäß Pulldown-Menü.
- **_Unit_** – Optional: Einheit des Wertes, der dem Statuseintrag hinzugefügt wird. Z. B. „°C“, „€“, „GB“ usw.
- **_Alt_** – Wenn aktiviert, wird der Status _nicht_ aktualisiert, wenn der Wert im angegebenen Datum (URL oder Datei) nicht gelesen oder gefunden werden kann. In diesem Fall wird der vorherige Wert beibehalten.
- **_Subs_** - Optional: Ersatz-URL oder Dateiname. Diese Ersatz-URL/Dateiname wird verwendet, wenn die URL/Dateiname der ersten Spalte nicht verfügbar ist.
- **_Faktor/Offset_** (nur für „Typ“-Nummern) – ermöglicht die Änderung der abgerufenen Daten vor dem Setzen in den Status:
- _berechneter Wert_ = _extrahierter Wert_ \* Faktor + Offset, um sofortige Wertänderungen vorzunehmen
- **_Interval_** - Abfrageintervall in ms (Millisekunden). Wenn leer oder 0, wird das Standardabfrageintervall verwendet. Weitere Informationen finden Sie oben.

## Beispieleinstellungen
| Name | URL oder Dateiname | RegEx | Rolle | Typ | Einheit | Intervall |
|-------------------|:-------------------------------------------------------|:-------------------------------------|-------------|---------|------|-----------|
| TemperaturMünchen | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<` | Temperatur | Zahl | °C | 180000 |
| cloudRunning | `https://iobroker.net/` | `Privacy Notice` | Indikator | Boolesch | | 60000 |
| CPU-Temperatur | `/sys/devices/virtual/thermal/thermal_zone0/temp` | `(.*)` | Temperatur | Zahl | °C | 30000 |
| stockPrice.Visa | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | Wert | Anzahl | € | 86400000 |
| kleinanzeigen | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | Standard | Zeichenfolge |      | 600000 |
| kleinanzeigen | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | Standard | Zeichenfolge |      | 600000 |

*Hinweis:* Beim Anwenden von regulären Ausdrücken auf die abgerufenen URL-/Dateidaten werden alle Zeilenumbrüche durch Leerzeichen ersetzt, um eine mehrzeilige Suche zu ermöglichen.

## Über reguläre Ausdrücke (RegExp)
Reguläre Ausdrücke sind ein leistungsfähiges Werkzeug zum Parsen und Extrahieren bestimmter Daten aus Zeichenfolgen. Und was noch wichtiger ist: Sie ermöglichen durch Anwenden von Regeln das Extrahieren bestimmter Werte/Texte aus einer gegebenen Zeichenfolge (beispielsweise aus dem HTML einer Webseite oder aus Text aus einer Datei).

Für Boolesche Typen ist der reguläre Ausdruck ziemlich einfach. Für numerische Typen sollten Sie die Zahl mit Klammern markieren - `()`. Um beispielsweise die Zahl aus *Die Temperatur beträgt 5°C* zu extrahieren, sollten Sie den Ausdruck ` (\d+)` verwenden.

Weitere Informationen zu RegExp:

– [MDN/Mozilla-Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [regex101: Online-Tool zum Erstellen und Testen von regulären Ausdrücken](https://regex101.com/)

### Beispiele
- „.at“ passt zu jeder dreistelligen Zeichenfolge, die mit „at“ endet, einschließlich „hat“, „cat“ und „bat“.
- `[hc]at` passt zu `hat` und `cat`.
- `[^b]at` stimmt mit allen Zeichenfolgen überein, die mit .at übereinstimmen, außer mit `bat`.
- `[^hc]at` stimmt mit allen Zeichenfolgen überein, die mit .at übereinstimmen, außer mit `hat` und `cat`.
- `^[hc]at` entspricht `hat` und `cat`, aber nur am Anfang der Zeichenfolge oder Zeile.
- `[hc]at$` entspricht `hat` und `cat`, aber nur am Ende der Zeichenfolge oder Zeile.
- „\[.\]“ entspricht jedem einzelnen Zeichen, das von „[“ und „]“ umgeben ist, da die Klammern maskiert sind, zum Beispiel: „[a]“ und „[b]“.
- „s.\*“ entspricht „s“, gefolgt von null oder mehr Zeichen, zum Beispiel: „s“ und „saw“ und „seed“.
- „[hc]+at“ entspricht „hat“, „cat“, „hhat“, „chat“, „hcat“, „cchchat“ usw., aber nicht „at“.
- `[hc]?at` entspricht `hat`, `cat` und `at`.
- `[hc]\*at` entspricht `hat`, `cat`, `hhat`, `chat`, `hcat`, `cchchat`, `at` usw.
- „Katze|Hund“ passt zu „Katze“ oder „Hund“.
- `(\d+)` – Ruft die Zahl aus der Zeichenfolge ab
- `now (\w+)` later - Holen Sie sich das Wort zwischen `now` und `later`

### Andere nützliche Ausdrücke
- `(-?\d+)` Zahl abrufen (sowohl negative als auch positive Zahlen)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` erhält eine Zahl mit Dezimalstellen (und `.` als Dezimaltrennzeichen)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` erhält eine Zahl mit Dezimalstellen (und `,` als Dezimaltrennzeichen)

## Benachrichtigungsbeispiel
### Telegram
```Javascript
on("parser.0.kleinanzeigen", (obj) => {
    sendTo("telegram.0", {
        text: "https://www.ebay-kleinanzeigen.de" + obj.state.val,
    });
});
```

## Qualitätscodes
Werte können Qualitätscodes haben:

- 0 - OK
– 0x82 – Die URL oder Datei kann nicht gelesen werden.
- 0x44 - Zahl oder Zeichenfolgewert im Text nicht gefunden

## Auslösen
Zusätzlich zum Polling-Intervall kann die Analyse bestimmter Regeln durch das Schreiben eines leeren Wertes (`false`, `0`, '' - hängt von der Art des Status ab) in den Status mit dem Bestätigungsflag `false` ausgelöst werden.
In diesem Fall wird der Wert aus der URL/Datei gelesen und sofort analysiert.

Sie können dem Adapter auch mit dem Befehl `sendTo` eine Nachricht senden:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Unterstützung
1. Allgemein: [ioBroker Forum](https://forum.iobroker.net/). Deutschsprachige Benutzer: siehe [ioBroker-Forumsthread Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. Bei Problemen lesen Sie bitte [ioBroker Parser Adapter: GitHub Issues](https://github.com/ioBroker/ioBroker.parser/issues).

<!--

### **IN ARBEIT** -->

## Changelog
### 2.2.4 (2024-08-26)
* (bluefox) updated packages
* (bluefox) corrected a problem with the creation of rule

### 2.2.2 (2024-07-14)
* (bluefox) GUI was migrated for admin v7

### 2.1.0 (2023-12-14)
* (mcm1957) Only node 16 and higher is supported

### 2.0.7 (2023-10-25)
* (TA2k) added the user agent to prevent timeout blocking
* (bluefox) Added a configurable userAgent option

### 2.0.5 (2023-06-19)
* (bluefox) The result could be an array of values

### 2.0.3 (2023-04-02)
* (bluefox) Corrected subscription on too many objects

### 2.0.2 (2023-04-01)
* (bluefox) Added possibility to trigger the parsing by writing of empty value to the state

### 2.0.1 (2023-03-31)
* (bluefox) Updated timestamp of non changed values

### 2.0.0 (2023-03-29)
* (TA2k) added translations
* (bluefox) Migrated GUI to admin v6

### 1.3.2 (2022-12-09)
* (Apollon77) In error cases return error as string

### 1.3.1 (2022-11-09)
* (raintonr) added delay option for slow connections
* (bluefox) added compact mode

### 1.2.1 (2022-09-15)
* (Apollon77) Always use raw response and not try to parse it

### 1.2.0 (2022-09-12)
* (Apollon77) Allow specifying if self-signed/invalid SSL certificates are ignored or not (default is to ignore as till now)
* (Apollon77) Allow specifying if an "insecure HTTP parser" is used which also enables HTTP implementations that are not compliant to specifications
* (Apollon77) Allow specifying the HTTP request timeout

### 1.1.8 (2022-06-27)
* (Apollon77) Check that a link is configured

### 1.1.7 (2022-06-16)
* (Apollon77) Fix potential crash cases reported by Sentry

### 1.1.6 (2022-05-28)
* (Apollon77) Set method to "GET" when requesting URLs

### 1.1.5 (2022-04-19)
* (Apollon77) Ignore objects without configuration for parser and log it

### 1.1.4 (2022-03-21)
* (Apollon77) Fixed a crash case reported by Sentry

### 1.1.3 (2022-03-20)
* (Apollon77) if regex did not match set defined replacement value (or null)

### 1.1.2 (2022-03-09)
* (Apollon77) Fix initialization of new parser objects

### 1.1.1 (2022-03-07)
* IMPORTANT: js-controller 2.0 is required at least now!
* (Apollon77) ignore self signed ssl certificates
* (Apollon77) make sure object changes do not block further updates of values
* (Apollon77) Add Sentry to get crash reports

### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow setting the number of found items

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to a common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2024 bluefox <dogafox@gmail.com>

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