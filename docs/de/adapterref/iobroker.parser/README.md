---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parser/README.md
title: ioBroker-Parser-Adapter
hash: Le4c+UayImhSKld1ia2TKTckHZUsW4qw9xKSC9LG2fk=
---
![Logo](../../../en/adapterref/iobroker.parser/admin/parser.png)

![Anzahl der Installationen](http://iobroker.live/badges/parser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.parser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)

# IoBroker-Parser-Adapter
![Test und Freigabe](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter analysiert Daten, die über eine URL oder aus einer Datei empfangen werden, mithilfe regulärer Ausdrücke. Für jede Regel, die in den Einstellungen dieses Adapters konfiguriert wird, wird ein Status unter `parser.<instance number>` erstellt und mit den geparsten Informationen gefüllt und aktualisiert.

## Einstellungen
### 1. Standardabfrageintervall
Dieser Standardwert für das Abfrageintervall wird verwendet, wenn für einen Eintrag in der Konfigurationstabelle (Spalte: „Intervall“) kein individueller Abfrageintervallwert angegeben ist. Das Intervall wird in Millisekunden angegeben und definiert, wie oft der Link oder die Datei gelesen und die Zustände aktualisiert werden.

**Hinweis:** Verwenden Sie insbesondere für Website-URLs kein zu aggressives Abfrageintervall. Wenn Sie beispielsweise den Preis Ihrer Aktien von einer bestimmten Website abrufen möchten, sollten Sie wahrscheinlich mit einem Intervall von nur 24 Stunden (= 86400000 ms) auskommen, wenn Sie kein Daytrader sind. Wenn Sie zu oft versuchen, Daten von bestimmten URLs abzurufen, kann die Website Sie sperren und auf eine Server-Blacklist setzen. Bitte nutzen Sie das Abfrageintervall daher mit Vorsicht.

### 2. Timeout anfordern
Geben Sie an, wie lange der Adapter bei Website-Abfragen auf eine HTTP-Antwort wartet

### 3. Verzögerung zwischen Anfragen
Geben Sie an, wie lange der Adapter zwischen dem Senden von HTTP-Anfragen bei der Durchführung von Remote-Abfragen wartet. Nützlich beim Abrufen von Daten von langsamen Hosts oder über langsame Verbindungen, um eine Überlastung beider Hosts zu vermeiden. Null (Standard) bedeutet keine Verzögerung.

Diese Verzögerung gilt pro Host. Wenn Remote-Abfragen für den Abruf von mehreren Remote-Hosts konfiguriert sind, wird jeder Host parallel abgefragt.

Die Verzögerung ist ein Mindestwert zwischen der Initiierung jeder Anfrage. Das heißt, wenn das Lesen einer Abfrage länger als dieser Verzögerungsparameter dauert, wird die nächste sofort gestartet, nachdem der Lesevorgang abgeschlossen ist.

### 4. Ungültige Zertifikate akzeptieren
Geben Sie an, ob selbstsignierte/ungültige SSL/TLS-Zertifikate bei HTTPS-Anfragen akzeptiert oder abgelehnt werden

### 5. Verwenden Sie einen unsicheren HTTP-Parser
Geben Sie an, dass ein unsicherer HTTP-Parser verwendet werden soll, der ungültige HTTP-Header akzeptiert. Dies ermöglicht möglicherweise die Interoperabilität mit nicht konformen HTTP-Implementierungen.
Die Verwendung des unsicheren Parsers sollte vermieden werden.

### 6. Tisch
Klicken Sie auf die Schaltfläche „Plus“, um der Tabelle einen neuen Eintrag hinzuzufügen.

**Leistungshinweis:** Wenn Sie dieselbe URL oder denselben Dateinamen mehr als einmal in verschiedene Tabellenzeilen eingeben und die Werte der Spalte „Intervall“ gleich sind, wird nur der Inhalt der URL oder des Dateinamens abgerufen ** einmal** und zwischengespeichert für die Verarbeitung mehrerer Tabellenzeilen, die URL/Dateiname und Intervall entsprechen. Dadurch können Sie mehrere reguläre Ausdrücke (also mehrere Tabellenzeilen) auf eine einzelne URL oder einen einzelnen Dateinamen anwenden, ohne die Daten mehrmals aus der Quelle abrufen zu müssen.

**Tabellenfelder:**

- **_Name_** – Name des Status, der unter „parser.<Instanznummer>“ erstellt wird. Leerzeichen sind nicht erlaubt. Sie können Punkte „.“ als Trennzeichen verwenden, um Unterordner zu erstellen. Beispiel: „Shares.Microsoft.Current“ ergibt „parser.<Instanznummer>.Shares.Microsoft.Current“.
- **_URL oder Dateiname_** – entweder eine URL einer Website oder der Pfad zu einer Datei, über die wir Informationen abrufen möchten. Beispiele „https://darksky.net/forecast/48.1371,11.5754/si24/de“ (Wetterinformationen München) oder „/opt/iobroker/test/testdata.txt“ (Datei aus ioBroker).
- **_RegEx_** – regulärer Ausdruck, wie man Daten aus einem Link extrahiert. Es gibt einen guten Dienst zum Testen von Regula-Ausdrücken: [regex101](https://regex101.com/). Z.B. `temp swip">(-?\d+)˚<` für die Zeile oben.
- **_Item_** (deutsch: „Num“) – ein regulärer Ausdruck kann mehrere Einträge finden (zuordnen). Mit dieser Option können Sie festlegen, welches Match ausgewählt werden soll. 0 = erste Übereinstimmung, 1 = zweite Übereinstimmung, 2 = dritte Übereinstimmung usw. Der Standardwert ist 0 (erste Übereinstimmung).
- **_Role_** – eine der Rollen:
    - Benutzerdefiniert - Benutzer definiert sich über _admin_ die Rolle
    - Temperatur – der Wert ist die Temperatur
    - Wert – der Wert ist eine Zahl (z. B. Dimmer)
    - Jalousien – der Wert ist eine Jalousieposition
    - Schalter – der Wert ist die Schalterposition (wahr/falsch)
    - Schaltfläche – der Wert ist eine Schaltfläche
    - Indikator - boolescher Indikator
- **_Type_** – der Typ der Variablen gemäß dem Pulldown-Menü.
- **_Unit_** – Optional: Einheit des zum Statuseintrag hinzugefügten Werts. Z.B. „°C“, „€“, „GB“ usw.
- **_Old_** – Wenn aktiviert, wird der Status _nicht_ aktualisiert, wenn der Wert im angegebenen Datum (URL oder Datei) nicht gelesen oder gefunden werden kann, sodass in diesem Fall der vorherige Wert beibehalten wird.
- **_Subs_** – Optional: Ersatz-URL oder Dateiname. Dieser Ersatz-URL/Dateiname wird verwendet, wenn die URL/der Dateiname der ersten Spalte nicht verfügbar ist.
- **_Factor/Offset_** (nur für „Typ“-Nummern) – ermöglicht die Änderung der abgerufenen Daten, bevor sie in den Status versetzt werden:
  - _berechneter Wert_ = _extrahierter Wert_ \* Faktor + Offset, um sofort Änderungen am Wert vorzunehmen
- **_Interval_** – Abfrageintervall in ms (Millisekunden). Wenn leer oder 0, wird das Standardabfrageintervall verwendet. Weitere Informationen finden Sie oben.

## Beispieleinstellungen
| Name | URL oder Dateiname | RegEx | Rolle | Geben Sie | ein Einheit | Intervall |
| ----------------- | :----------------------------------------------------- | :----------------------------------- | ----------- | ------- | ---- | -------- |
| TemperaturMünchen | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<` | Temperatur | Nummer | °C | 180000 |
| cloudRunning | `https://iobroker.net/` | `Privacy Notice` | Indikator | boolescher Wert | | 60000 |
| cpuTemperature | `/sys/devices/virtual/thermal/thermal_zone0/temp` | `(.*)` | Temperatur | Nummer | °C | 30000 |
| stockPrice.Visa | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | Wert | Nummer | € | 86400000 |
| kleinanzeigen | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | Standard | Zeichenfolge | | 600000 |
| kleinanzeigen | `https://www.ebay-kleinanzeigen.de/s-iobroker/k0` | `data-href="(.*?).">` | Standard | Zeichenfolge | | 600000 |

*Hinweis:* Beim Anwenden von Regex auf die abgerufenen URL-/Dateidaten werden alle Zeilenumbrüche durch Leerzeichen ersetzt, um eine mehrzeilige Suche zu ermöglichen.

## Über reguläre Ausdrücke (RegExp)
Reguläre Ausdrücke sind ein leistungsstarkes Werkzeug zum Analysieren und Extrahieren bestimmter Daten aus Zeichenfolgen. Und was noch wichtiger ist: Sie ermöglichen das Extrahieren bestimmter Werte/Texte aus einer bestimmten Zeichenfolge (z. B. aus dem HTML-Code einer Webseite oder Text aus einer Datei) durch Anwendung von Regeln .

Für boolesche Typen ist der reguläre Ausdruck eher einfach. Bei numerischen Typen sollten Sie die Zahl mit Klammern markieren – `()`. Z.B. Um die Zahl aus *Die Temperatur beträgt 5°C* zu extrahieren, sollten Sie den Ausdruck ` (\d+)` verwenden.

Weitere Informationen zu RegExp:

- [MDN/Mozilla-Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [regex101: Online-Tool zum Erstellen und Testen regulärer Ausdrücke](https://regex101.com/)

### Beispiele
- „.at“ entspricht jeder dreistelligen Zeichenfolge, die mit „at“ endet, einschließlich „hat“, „cat“ und „bat“.
- „[hc]at“ entspricht „hat“ und „cat“.
- „[^b]at“ stimmt mit allen Zeichenfolgen überein, mit denen .at übereinstimmt, mit Ausnahme von „bat“.
- „[^hc]at“ findet alle Zeichenfolgen, die mit .at übereinstimmen, außer „hat“ und „cat“.
- „^[hc]at“ stimmt mit „hat“ und „cat“ überein, jedoch nur am Anfang der Zeichenfolge oder Zeile.
- „[hc]at$“ entspricht „hat“ und „cat“, aber nur am Ende der Zeichenfolge oder Zeile.
- „\[.\]“ entspricht jedem einzelnen Zeichen, das von „[“ und „]“ umgeben ist, da die Klammern maskiert sind, zum Beispiel: „[a]“ und „[b]“.
- „s.\*“ entspricht „s“, gefolgt von null oder mehr Zeichen, zum Beispiel: „s“ und „saw“ und „seed“.
- „[hc]+at“ entspricht „hat“, „cat“, „hhat“, „chat“, „hcat“, „cchchat“ usw., aber nicht „at“.
- „[hc]?at“ entspricht „hat“, „cat“ und „at“.
- „[hc]\*at“ entspricht „hat“, „cat“, „hhat“, „chat“, „hcat“, „cchchat“, „at“ usw.
- „cat|dog“ entspricht „cat“ oder „dog“.
- `(\d+)` – Ruft die Zahl aus der Zeichenfolge ab
- „now (\w+)“ später – das Wort zwischen „jetzt“ und „später“ ermitteln

### Weitere nützliche Ausdrücke
- `(-?\d+)` Nummer abrufen (sowohl negative als auch positive Zahlen)
- `[+-]?([0-9]+.?[0-9]|.[0-9]+)` erhält eine Zahl mit Dezimalstellen (und `.` als Dezimaltrennzeichen)
- „[+-]?([0-9]+,?[0-9]|,[0-9]+)“ erhält eine Zahl mit Dezimalstellen (und „,“ als Dezimaltrennzeichen)

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
Werte können Qualitätscodes haben:

- 0 - OK
- 0x82 – Die URL oder Datei kann nicht gelesen werden.
- 0x44 – Zahlen- oder Zeichenfolgenwert im Text nicht gefunden

## Auslösen
Zusätzlich zum Abfrageintervall kann das Parsen bestimmter Regeln durch das Schreiben eines leeren Werts (`false`, `0`, '' – abhängig von der Art des Status) in den Status mit §§SSSSS_2 ausgelöst werden §§ Acknowledge-Flag.
In diesem Fall wird der Wert aus der URL/Datei gelesen und sofort geparst.

Sie können auch mit dem Befehl `sendTo` eine Nachricht an den Adapter senden:

```Javascript
sendTo("parser.0", "trigger", "temperatureMunich" /* name of rule, or parser.0.temperatureMunich */, result => {
    console.log(JSON.stringify(result)); // {"value": 10, "error": null}
});
```

## Unterstützung
1. Allgemein: [ioBroker-Forum](https://forum.iobroker.net/). Deutschsprachige Benutzer: siehe [ioBroker-Forumsthread Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. Bei Problemen schauen Sie sich bitte [ioBroker Parser Adapter: GitHub Issues](https://github.com/ioBroker/ioBroker.parser/issues) an.

<!--

### **ARBEIT IN ARBEIT** -->

## Changelog
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

Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>

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