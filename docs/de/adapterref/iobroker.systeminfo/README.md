---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.systeminfo/README.md
title: Systeminformationen
hash: odLDzGgWMmm8TyukkzeJEYqTRvfMCQURckiSgpDYbfY=
---
![Logo](../../../en/adapterref/iobroker.systeminfo/admin/systeminfo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI-Build-Status](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

# Systeminformationen
Liest (und schreibt) Informationen von System(en)

## Adapter verarbeitet (System-)Informationen von eigenen oder anderen Systemen und Webquellen
Es generiert Zustände aus den gefundenen Informationen über verschiedene Methoden

- Im Betriebssystem ausgeführte Befehle
- Dateien zum Lesen auf lokalen oder verbundenen Systemen
- Ergebnisse von Webseiten oder APIs
- Nodejs-Tools-Befehle

- Befehle und Dateien funktionieren auch in beide Richtungen, was bedeutet, dass Sie auch Informationen in das System schreiben können.
- Dies ermöglicht den Zugriff und das Schreiben der GPIO-Pins auf Raspi oder OrangePi oder auch die Steuerung der grünen oder roten LEDs auf Raspi/Opi
- Es ermöglicht auch das Abrufen/Festlegen einiger Systeminformationen, auf die über /sys in Lunux zugegriffen wird
- Es wird ein „Systeminformation“-Teil verwendet, der unter Windows und Linux funktioniert

Es verarbeitet Text-, HTML-, JSON- und XML-Datentypen mit speziellen Abfragemechanismen.

### Notiz
- Ich möchte mich bei einigen Modulen im Web bedanken, die ich verwendet oder mit meinem eigenen Code implementiert habe. Der Adapter verwendet einige externe Module wie [cheerio](https://github.com/cheeriojs/cheerio), [systeminformation](https://github.com/sebhildebrandt/systeminformation) und [node-schedule](https:/ /github.com/node-schedule/node-schedule) so wie sie sind. Es wurde auch durch Code von [JSONPath](http://goessner.net/articles/JsonPath/index.html#e2) und [scrape-it](https://github.com/IonicaBizau/scrape-it) inspiriert. Ihr Code wurde jedoch nicht direkt verwendet, sondern für den unterschiedlichen Bedarf neu implementiert.

## Aufbau
- In der Adapterkonfiguration konfigurieren (Seite vergrößern)
- Ich habe ein Bild einer Beispielkonfiguration [hier](./admin/Systeminfo.Config.jpg) gespeichert.
    – Das erste Element ist eine Befehlsliste, die beim Start des Adapters (Zeile für Zeile) ausgeführt wird. Es kann zum Einrichten der verwendeten GPIO-Ports verwendet werden.
    - Zeilen, die mit „#“ beginnen, werden nicht ausgeführt
    - Wenn der erste Text „debug!“ lautet, wird der Adapter in den Debug-Modus versetzt, der viel mehr Informationen darüber anzeigt, was er abzurufen versucht und empfängt.
- Nach der Startkonfiguration kommt die Konfigurationsliste für jede Datenquelle bestehend aus

    - Namensfeld, das auch enthalten kann

        - Wenn ein Name mit „-“ beginnt, wird die Zeile ignoriert (abgeschaltet), genau wie wenn kein Zeitplan vorhanden ist
        - Syntax „[*]“, „[Name, ...]“, „[Name/(Wert)]“.
        - Ohne die oben genannten Punkte wird der Name verwendet, um einen Staat so zu erstellen, wie er ist.
        - Wenn „[]“ irgendwo verwendet wird, werden hier Namen mit unterschiedlichen Methoden eingefügt
            - „[*]“ Wenn mehrere Elemente zurückgegeben werden, werden sie als Zahlen eingefügt. Beispiel: „Meldung[]“ würde „Meldung0“-„Meldung(n)“ generieren, wenn (n) Elemente zurückgegeben werden
            - „[name1,name2, ...]“ erstellt genau diese Namen (Beispiel „System.Memory_[used, free, available]“ würde drei Zustände mit den Namen „System.Memory_used, System.Memory_free, System.Memory_available“ erstellen)
            - „[Name/Wert]“ übernimmt den Namen aus der Objekteigenschaft „Name“ (kann unterschiedlich sein) und den Wert aus der Eigenschaft „Wert“. Es kann jeder Eigenschafts- oder Wertname verwendet werden.
            - „[name/]“ ohne Wert würde den Namen von „name“ übernehmen und Unterzustände für alle anderen in diesem Objekt gefundenen Eigenschaften erstellen (Beispiel „System.Network.[iface/]“)

    - Der „Typ“ und die „Quelle“ der möglichen Informationsquelle

        - „Datei“: Das Feld „Quelle“ beschreibt einen Dateinamen, der gelesen wird
        - „exec“: Das Feld „Quelle“ beschreibt einen einzeiligen Befehl, der ausgeführt wird
        - „Info“: Das Feld „Quelle“ beschreibt eine einzeilige „Systeminfo“-Befehlsfunktion
        - „Web“: Das Feld „Quelle“ beschreibt eine Web-URL, die gelesen wird (oder ein Objekt, das den Zugriff beschreibt, dies muss später dokumentiert werden!).
        - Die Anfragen werden zwischengespeichert, wenn gleichzeitig mehrere Einträge mit demselben Typ/Quellinhalt angefordert werden! Das heißt, wenn Sie jede Minute die Ausführung eines Befehls einplanen und zwei verschiedene Datenelemente aus demselben Befehl entnehmen, wird dieser nur einmal ausgeführt und nur der Datenfilter wird mehrmals angewendet.
        - Dies hilft, dieselbe Seite nicht mehrmals herunterzuladen, wenn Sie mehr Artikel abrufen möchten.

    - Mit „regexp/filter“ wird beschrieben, wie der empfangene Text gefiltert wird
        - „Regexp“-Anweisung, bei der die einzelnen Elemente mit „()“ umgeben werden müssen.

            Beispiel: `/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` würde in allen Zeilen nach dem Text `lic` suchen, gefolgt von Leerzeichen und dann Zahlen, die mit `K` enden, und die 3 Zahlen zurückgeben. Dies wird im Befehl `df -BK` von Linux verwendet, um mir die Größe einer gemounteten NFS-Freigabe anzuzeigen, deren Name mit „lic“ endet.

        - `JsonPath`-Anweisung. Ich habe eine spezielle Version von JsonPath erstellt, um Daten aus Json oder anderen Javascript-Objekten auszuwählen.
            - Seine Syntax besteht aus einer Reihe von Selektoren, die sein können
            - „Name“ ein Eigenschaftsname
            - „*“ jedes Element in diesem Objekt. Dies können alle Eigenschaften sein oder, wenn das Objekt ein Array ist, alle Array-Elemente
            - „[(...)]“ wertet „...“ aus, um den Eigenschaftsnamen zu erhalten, der ausgewählt wird. „@“ wird als Platzhalter für das aktuelle Objekt verwendet und kann in der eval-Anweisung verwendet werden.
            - `[?(...)]` Filtern Sie die Elemente dieses Elements nach ...,

                Beispiel: `list[?(@.user == 'pi')]` würde zuerst die Eigenschaft `list` (die ein Array ist) auswählen und dann die Liste filtern, indem nur diese Listenelemente ausgewählt werden, für die `.user` auf `pi` gesetzt ist.

            - `[!(...)]` Gibt den ausgewerteten Wert als neues Element zurück. Auf diese Weise können Sie aus den gefundenen Objekten Ihre eigenen Daten berechnen.
            - „[Name1, Name2, Name3]“ würde nur diese Eigenschaftsnamen auswählen
            - „[0]“ würde nur das „erste“ (oder n-te) Element oder die Eigenschaft auswählen
            - „[start:end:step]“ würde die Elemente beginnend mit „start“ und „<end“ mit „step“ übernehmen. Alle müssen Zahlen sein oder leer bleiben. „start“ und „end“ können negativ sein, was bedeuten würde, dass sie vom Ende ausgehen. Beispiel: „[1:-1:2]“ würde jedes zweite Element vom zweiten bis zum letzten Element übernehmen, jedoch nicht einschließlich. Das letzte wäre „[-1::]“, die ersten 3 wären „[:3:]“ und die letzten 3 wären „[-3::]“.
            - „..“ ist ein rekursiver Abstiegsselektor, was bedeutet, dass „..name“ den Eigenschaftsnamen in „jeder Abteilung“ des Objekts auswählen würde!
        - „HTML-WebObject-Abfrage“ Für den Fall, dass HTML analysiert wird, habe ich ein spezielles Abfragetool erstellt, um Elemente aus Web-Seiten auszuwählen, ähnlich wie jQuery. Dieses Tool erstellt ein Objekt, das schließlich mit „JsonPath“ analysiert wird. **Dokumentation folgt**
    - Der Eintrag „convert“ kann entweder sein

        - „json“ für zu analysierende JSON-Daten. Bei Webeinträgen bedeutet dies, dass der empfangene Text direkt als JSON behandelt wird und der reguläre Ausdruck/Filter eine „JsonParse“-Anweisung/einen Filter ist.
        - „xml“ für XML-Daten, das bedeutet, dass die empfangenen Daten von XML in JSON konvertiert und wie oben behandelt werden
        - „html“ würde ein „cheerio“-Objekt generieren, das dann mit der speziellen WebObject-Abfrage durchsucht wird
        - „number“ oder „boolean“ würde versuchen, den Wert in Zahlen oder boolesche Werte umzuwandeln, wobei bei booleschen Werten Zahlen > 0 wahr sind, aber auch Zeichenfolgen wie **on** oder **ein** und **true** als ausgewertet werden WAHR.
        - „...“ alles andere wie „!parseInt(@)“ würde ausgewertet und in diesem Fall **true** zurückgeben, wenn der Wert „0“ ist, oder **false**, wenn der Wert eine größere Ganzzahl ist.

    - Das Feld „Rolle/Typ“ beschreibt die ioBroker-Feldart und kann auch eine Einheit benennen. Der normale Feldtyp ist Text oder der in der Konvertierung angezeigte Wert.

        - „json“ bedeutet, dass die Feldeigenschaft vom Objekt übernommen wird
        - `number|MB` würde ein Zahlenfeld mit der Einheit MB (Megabyte) definieren

    - Das Feld „Write Command“ beschreibt Anweisungen oder Auswertungen, die zum Zurückschreiben in das Element verwendet werden. Es funktioniert derzeit nur für die Typen „exec“ und „file“.

        - Bei „exec“ handelt es sich um eine Befehlszeile, die „@(...)“-Anweisungen enthalten kann, die ausgewertet werden. Beispiel: „gpio write 1 @(@ ? '0' : '1')“ würde in „gpio write 1 0“ übersetzt werden, wenn der Status wahr ist, und in „gpio write 1 1“, wenn er falsch ist. Dies steuert meine IR-LEDs, die aufleuchten, wenn der GPIO-Pin „low“ (0) ist.
        - Bei „Datei“ handelt es sich um einen einfachen Auswertungsausdruck, der ausgeführt und in die Datei geschrieben wird. Beispiel: `@ ? '1' : '0' ` würde '1' schreiben, wenn der Wert wahr ist, und '0', wenn er falsch ist.

    - Das Letzte ist der „Zeitplan“. Wenn es leer ist, wird das Element überhaupt nicht ausgeführt! Alle Zeitpläne, die genau den gleichen Wert haben, werden zusammen mit demselben Cache ausgeführt.
        - „cron-syntax“ Sie können dieselbe „cron“-Syntax verwenden, die oBroker in Javascript-Zeitplänen verwendet, die in [node-schedule](https://github.com/node-schedule/node-schedule) beschrieben wird.
        - „time-syntax“ Ich habe eine spezielle Zeitsyntax „?:?(:?)“ erstellt, die es einfacher macht
            - „*:16“ würde diese Daten in Minute 15 jeder Stunde anfordern
            - „*/2:1:1“ würde jede zweite Stunde in der 1. Minute und 1 Sekunde anfordern.
            - `?s`, `?m`, `?h ` mit ? Da es sich um Ziffern >0 handelt, wird die Anfrage alle ? Sekunden, Monate oder Stunden ausgeführt. Sie können nicht mehrere Elemente gleichzeitig angeben!
        - Zeitpläne werden nach derselben Zeit gruppiert. Wenn Sie die Sekunden wie im ersten Beispiel oben weglassen, werden sie einer Nummer zugewiesen, um zu vermeiden, dass alle Elemente dieselbe Sekunde haben. Dies geschieht, um nicht zu viele Befehle gleichzeitig auszuführen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-07-13)

-   (mcm1957) changed: Testing has been changed to support node 16, 18 and 20
-   (mcm1957) changed: Dependencies have been updated
-   (mcm1957) changed: Code has been adapted to meet js-controller 5.x requirements

### 0.3.0

-   Added save and load config in admin screen

### 0.2.2

-   First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
-   New icon to separate it from info-Adapter

### 0.2.0

-   First public beta includes jsonParse and WebQuery parse

## License

The MIT License (MIT)

Copyright (c) 2023, ioBroker community, mcm1957 <mcm57@gmx.at>
Copyright (c) 2017-2019, frankjoke <frankjoke@hotmail.com>

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