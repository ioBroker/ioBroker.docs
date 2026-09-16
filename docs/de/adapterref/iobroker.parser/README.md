---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parser/README.md
title: ioBroker-Parseradapter
hash: FGppS76zclw9eA0vJc7+VFSafTTQph3XnzQ4ZjBovJ4=
---
![Logo](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Anzahl der Installationen](http://iobroker.live/badges/parser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.parser.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)

# ioBroker-Parseradapter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter analysiert Daten, die über eine URL oder aus einer Datei empfangen werden, mithilfe regulärer Ausdrücke. Für jede in den Einstellungen dieses Adapters konfigurierte Regel wird ein Zustand erstellt.`parser.<instance number>` und wurde mit den analysierten Informationen gefüllt und aktualisiert.

## Einstellungen

### 1. Standard-Abfrageintervall

Dieser Standardwert für das Abfrageintervall wird verwendet, wenn für einen Eintrag in der Konfigurationstabelle (Spalte: „Intervall“) kein individueller Wert angegeben ist. Das Intervall wird in Millisekunden angegeben und definiert, wie oft der Link oder die Datei gelesen und die Zustände aktualisiert werden.

**Hinweis:** Verwenden Sie kein zu kurzes Abfrageintervall, insbesondere nicht für Website-URLs. Wenn Sie beispielsweise den Kurs Ihrer Aktien von einer bestimmten Website abrufen möchten, ist ein Intervall von 24 Stunden (entspricht 86.400.000 ms) in der Regel ausreichend, sofern Sie kein Daytrader sind. Versuchen Sie nicht, Daten von bestimmten URLs zu häufig abzurufen, da die Website Sie sonst sperren und auf eine Server-Blacklist setzen könnte. Gehen Sie daher bitte mit dem Abfrageintervall sorgsam um.

### 2. Zeitüberschreitung der Anfrage

Legen Sie fest, wie lange der Adapter bei Website-Abfragen auf eine HTTP-Antwort wartet.

### 3. Verzögerung zwischen Anfragen

Legen Sie fest, wie lange der Adapter zwischen HTTP-Anfragen bei Remote-Abfragen wartet. Dies ist hilfreich, um Daten von langsamen Hosts oder über langsame Verbindungen abzurufen und so eine Überlastung zu vermeiden. Der Standardwert Null bedeutet keine Verzögerung.

Diese Verzögerung gilt pro Host. Wenn Remote-Abfragen so konfiguriert sind, dass sie Daten von mehreren Remote-Hosts abrufen, wird jeder Host parallel abgefragt.

Die Verzögerung ist ein Mindestwert zwischen dem Start jeder Anfrage. Das heißt, wenn eine Anfrage länger als dieser Verzögerungsparameter dauert, wird die nächste Anfrage sofort nach Abschluss der Leseoperation gestartet.

### 4. Ungültige Zertifikate akzeptieren

Legen Sie fest, ob selbstsignierte/ungültige SSL/TLS-Zertifikate bei HTTPS-Anfragen akzeptiert oder abgelehnt werden.

### 5. Unsicheren HTTP-Parser verwenden

Die Verwendung eines unsicheren HTTP-Parsers, der ungültige HTTP-Header akzeptiert, kann die Interoperabilität mit nicht konformen HTTP-Implementierungen ermöglichen. Die Verwendung des unsicheren Parsers sollte jedoch vermieden werden.

### 6. Tabelle

Klicken Sie auf die Schaltfläche „Plus“, um einen neuen Eintrag zur Tabelle hinzuzufügen.

**Hinweis zur Performance:** Wenn Sie dieselbe URL oder denselben Dateinamen mehrfach in verschiedene Tabellenzeilen eingeben und die Werte der Spalte „Intervall“ übereinstimmen, wird der Inhalt der URL oder des Dateinamens nur **einmal** abgerufen und zwischengespeichert. So können Sie mehrere reguläre Ausdrücke (und damit mehrere Tabellenzeilen) auf eine einzelne URL oder einen Dateinamen anwenden, ohne die Daten mehrfach von der Quelle abrufen zu müssen.

**Tabellenfelder:**

- **_Name_** – Name des Staates, der unter diesem Namen erstellt wird`parser.<instance number>` Leerzeichen sind nicht erlaubt. Punkte sind erlaubt.`.` als Trennzeichen zum Erstellen von Unterordnern. Beispiel:`Shares.Microsoft.Current` wird dazu führen`parser.<instance number>.Shares.Microsoft.Current` Die
- **_URL oder Dateiname_** – entweder die URL einer Website oder der Pfad zu einer Datei, aus der wir Informationen abrufen möchten. Beispiele`https://darksky.net/forecast/48.1371,11.5754/si24/de` (Wetterinformationen München) oder`/opt/iobroker/test/testdata.txt` (Datei aus ioBroker).
- **_RegEx_** – regulärer Ausdruck, wie man Daten aus einem Link extrahiert. Es gibt einen guten Dienst zum Testen regulärer Ausdrücke: [regex101](https://regex101.com/) . Beispiel:`temp swip">(-?\d+)˚<` für die obige Zeile.
- **_Element_** (auch: „Num“) – Ein regulärer Ausdruck kann mehrere Einträge finden (übereinstimmen). Mit dieser Option können Sie festlegen, welche Übereinstimmung ausgewählt werden soll. 0 = erste Übereinstimmung, 1 = zweite Übereinstimmung, 2 = dritte Übereinstimmung usw. Standardwert ist 0 (erste Übereinstimmung).
- **_Rolle_** – eine der Rollen:
  - benutzerdefiniert – der Benutzer definiert die Rolle selbst über _den Administrator._
  - Temperatur - der Wert ist die Temperatur
  - Wert – der Wert ist eine Zahl (z. B. Dimmer).
  - Blindpositionen – der Wert ist eine Blindposition
  - Schalter - der Wert ist die Schalterstellung (wahr/falsch)
  - Schaltfläche – der Wert ist eine Schaltfläche
  - Indikator - Boolescher Indikator
- **_Typ_** – der Variablentyp gemäß dem Dropdown-Menü.
- **_Einheit_** – Optional: Einheit des dem Statuseintrag hinzugefügten Wertes. Z. B.`°C` ,`€` ,`GB` , usw.
- **_Alt_** - Wenn diese Option aktiviert ist, wird der Status _nicht_ aktualisiert, wenn der Wert im angegebenen Datum (URL oder Datei) nicht gelesen oder gefunden werden kann. In diesem Fall bleibt der vorherige Wert erhalten.
- **_Ersatz_** -URL oder Dateiname (optional): Diese Ersatz-URL/dieser Ersatzdateiname wird verwendet, falls die URL/der Dateiname der ersten Spalte nicht verfügbar ist.
- **_Faktor/Offset_** (nur für „Typ“-Nummern) – ermöglicht die Modifizierung der abgerufenen Daten vor der Festlegung des Zustands:
  - _Berechneter Wert_ = _extrahierter Wert_ \* Faktor + Offset, um Wertänderungen sofort vorzunehmen
- **_Intervall_** – Abfrageintervall in ms (Millisekunden). Bei leerem Feld oder 0 wird das Standardabfrageintervall verwendet. Weitere Informationen finden Sie oben.

## Beispieleinstellungen

| Name               | URL oder Dateiname                                     | RegEx                                | Rolle      | Typ             | Einheit | Intervall |
| ------------------ | :----------------------------------------------------- | :----------------------------------- | ---------- | --------------- | ------- | --------- |
| Temperatur München | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<`               | Temperatur | Nummer          | °C      | 180000    |
| Forum läuft        | `http://forum.iobroker.net/`                           | `Forum`                              | Indikator  | boolescher Wert |         | 60000     |
| CloudRunning       | `https://iobroker.net/`                                | `Privacy Notice`                     | Indikator  | boolescher Wert |         | 60000     |
| CPU-Temperatur     | `/sys/devices/virtual/thermal/thermal_zone0/temp`      | `(.*)`                               | Temperatur | Nummer          | °C      | 30000     |
| stockPrice.Visa    | `https://www.finanzen.net/aktien/visa-aktie`           | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | Wert       | Nummer          | €       | 86400000  |
| Kleinanzeigen      | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0`      | `data-href="(.*?).">`                | Standard   | Zeichenkette    |         | 600000    |

_Hinweis:_ Beim Anwenden von regulären Ausdrücken auf die abgerufenen URL-/Dateidaten werden alle Zeilenumbrüche durch Leerzeichen ersetzt, um eine mehrzeilige Suche zu ermöglichen.

## Über reguläre Ausdrücke (RegExp)

Reguläre Ausdrücke sind ein leistungsstarkes Werkzeug zum Parsen und Extrahieren bestimmter Daten aus Zeichenketten, und noch wichtiger: Sie ermöglichen es, bestimmte Werte/Texte aus einer gegebenen Zeichenkette (z. B. aus dem HTML-Code einer Webseite oder aus dem Text einer Datei) durch Anwenden von Regeln zu extrahieren.

Für boolesche Datentypen ist der reguläre Ausdruck recht einfach. Für numerische Datentypen sollten Sie die Zahl in eckige Klammern setzen.`()` Um beispielsweise die Zahl aus _„Die Temperatur beträgt 5 °C“_ zu extrahieren, sollten Sie Folgendes verwenden:` (\d+)` Ausdruck.

Weitere Informationen zu regulären Ausdrücken:

- [MDN/Mozilla-Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [regex101: Online-Tool zum Erstellen und Testen regulärer Ausdrücke](https://regex101.com/)

### Beispiele

- `.at` passt auf jede dreistellige Zeichenkette, die mit endet`at` , einschließlich`hat` ,`cat` , Und`bat` Die
- `[hc]at` Spiele`hat` Und`cat` Die
- `[^b]at` Findet alle Zeichenketten, die von .at gefunden werden, außer`bat` Die
- `[^hc]at` Findet alle Zeichenketten, die von .at gefunden werden, außer`hat` Und`cat` Die
- `^[hc]at` Spiele`hat` Und`cat` , aber nur am Anfang der Zeichenkette oder Zeile.
- `[hc]at$` Spiele`hat` Und`cat` , aber nur am Ende der Zeichenkette oder Zeile.
- `\[.\]` passt auf ein beliebiges einzelnes Zeichen, das von`[` Und`]` da die Klammern maskiert sind, zum Beispiel:`[a]` Und`[b]` Die
- `s.\*` Übereinstimmungen mit s, gefolgt von null oder mehr Zeichen, zum Beispiel:`s` Und`saw` Und`seed` Die
- `[hc]+at` Spiele`hat` ,`cat` ,`hhat` ,`chat` ,`hcat` ,`cchchat` und so weiter, aber nicht`at` Die
- `[hc]?at` Spiele`hat` ,`cat` , Und`at` Die
- `[hc]\*at` Spiele`hat` ,`cat` ,`hhat` ,`chat` ,`hcat` ,`cchchat` ,`at` , und so weiter.
- `cat|dog` Spiele`cat` oder`dog` Die
- `(\d+)` - die Zahl aus der Zeichenkette extrahieren
- `now (\w+)` später - lass es uns wissen`now` Und`later`

### Weitere nützliche Ausdrücke

- `(-?\d+)` Zahl erhalten (sowohl negative als auch positive Zahlen)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` eine Zahl mit Dezimalstellen erhalten (und`.` als Dezimaltrennzeichen)
- `[+-]?([0-9]+,?[0-9]|,[0-9]+)` eine Zahl mit Dezimalstellen erhalten (und`,` als Dezimaltrennzeichen)

## Benachrichtigungsbeispiel

### Telegramm

```Javascript
on("parser.0.kleinanzeigen", (obj) => {
    sendTo("telegram.0", {
        text: "https://www.ebay-kleinanzeigen.de" + obj.state.val,
    });
});
```

## Qualitätscodes

Werte können Qualitätsmerkmale aufweisen:

- 0 - OK
- 0x82 - Die URL oder Datei kann nicht gelesen werden.
- 0x44 – Im Text wurde kein Zahlen- oder Zeichenkettenwert gefunden.

## Auslösen

Zusätzlich zum Abfrageintervall kann die Auswertung bestimmter Regeln durch das Schreiben eines leeren Wertes ausgelöst werden (`false` ,`0` , '' - hängt von der Art des Zustands ab) zum Zustand mit`false` Bestätigungsflag. In diesem Fall wird der Wert aus der URL/Datei gelesen und sofort analysiert.

Sie können auch eine Nachricht an den Adapter senden mit`sendTo` Befehl:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Unterstützung

1. Allgemein: [ioBroker-Forum](https://forum.iobroker.net/) . Deutschsprachige Benutzer: siehe [ioBroker-Forum-Thread Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex) .
2. Bei Problemen schauen Sie bitte unter [ioBroker Parser Adapter: GitHub Issues](https://github.com/ioBroker/ioBroker.parser/issues) nach.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.1 (2026-08-03)
* (@GermanBluefox) Migrated for admin 8

### 3.1.0 (2026-04-13)
* (bluefox) Updated dependencies
* (TA2k) Fixed disabled rules still being polled when sharing an interval
* (bluefox) Fixed possible problems
* (bluefox) Added possibility to use CRON as an interval

### 3.0.0 (2026-03-03)
* (bluefox) Migrated the new NPM token
* (bluefox) Migrated to TypeScript
* (bluefox) Added parsing of states, ioBroker files and logs
* (bluefox) Fixing position marking in the test dialog
* (bluefox) Added mobile view
* (bluefox) Minimal Node.js version is now 20
* (bluefox) Added export import via CSV file

### 2.3.1 (2025-03-24)
* (bluefox) Migrated the admin GUI to TypeScript

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

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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