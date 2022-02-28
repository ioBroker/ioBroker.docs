---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.systeminfo/README.md
title: Systeminformationen
hash: YxrTeRdOWPWwOeQiFu2rqefDqRh+wNp9vRhonz20SwA=
---
![Logo](../../../en/adapterref/iobroker.systeminfo/admin/systeminfo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI-Build-Status](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor-Build-Status](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

# Systeminformationen
Liest (und schreibt) Informationen von System(en)

## Adapter verarbeitet (System-)Informationen aus eigenen oder anderen Systemen und Webquellen
Es generiert Zustände aus den Informationen, die es über verschiedene Methoden findet

* Befehle, die im Betriebssystem ausgeführt werden
* Dateien, die auf lokalen oder verbundenen Systemen gelesen werden sollen
* Ergebnisse von Webseiten oder APIs
* Befehle für Nodejs-Tools

* Befehle und Dateien funktionieren auch in beide Richtungen, was bedeutet, dass Sie auch Informationen in das System schreiben können.
* Dies ermöglicht den Zugriff auf und das Schreiben der GPIO-Pins auf Raspi oder OrangePi oder auch die Steuerung der grünen oder roten LEDs auf Raspi/Opi
* Es erlaubt auch, einige Systeminformationen abzurufen/einzustellen, auf die über /sys in Lunux zugegriffen wird
* Es wird ein 'Systeminformation'-Teil verwendet, der unter Windows und Linux funktioniert

Es verarbeitet Text-, HTML-, json- und XML-Datentypen mit speziellen Abfragemechanismen.

### Notiz
* Ich wollte mich bei einigen Modulen im Web bedanken, die ich verwendet oder mit meinem eigenen Code implementiert habe. Der Adapter verwendet einige externe Module wie [cheerio](https://github.com/cheeriojs/cheerio), [systeminformation](https://github.com/sebhildebrandt/systeminformation) und [node-schedule](https:/ /github.com/node-schedule/node-schedule) wie sie sind. Es wurde auch durch Code von [JSONPath](http://goessner.net/articles/JsonPath/index.html#e2) und [scrape-it](https://github.com/IonicaBizau/scrape-it) inspiriert. Ihr Code wurde jedoch nicht direkt verwendet, sondern für die unterschiedlichen Anforderungen neu implementiert.

## Aufbau
* Konfigurieren Sie in der Adapterkonfiguration (vergrößern Sie die Seite)
* Ich habe [hier] ein Bild einer Beispielkonfiguration gespeichert (./admin/Systeminfo.Config.jpg)
    * Das erste Element ist eine Befehlsliste, die (Zeile für Zeile) beim Start des Adapters ausgeführt wird. Es kann verwendet werden, um verwendete GPIO-Ports einzurichten.
    * Zeilen, die mit '`#`' beginnen, werden nicht ausgeführt
    * Wenn der erste Text ''debug!'' ist, versetzt er den Adapter in den Debug-Modus, der viel mehr Informationen anzeigt, was er zu ziehen versucht und erhält.
* Nach der Startkonfiguration kommt die Konfigurationsliste für jede Datenquelle bestehend aus
    * Namensfeld, das auch enthalten kann
        * Beginnt ein Name mit '`-`' wird die Zeile ignoriert (abgeschaltet), genauso wie wenn kein Zeitplan vorhanden ist
        * `[*]`, `[Name, ...]`, `[Name/(Wert)]` Syntax
        * Ohne eines der oben genannten Elemente wird der Name verwendet, um einen Status so zu erstellen, wie er ist.
        * Wenn irgendwo `[]` verwendet wird, werden hier Namen mit unterschiedlichen Methoden eingefügt
            * `[*]` Wenn mehrere Elemente zurückgegeben werden, werden sie als Zahlen eingefügt. Beispiel: `Meldung[]` würde `Meldung0`-`Meldung(n)` erzeugen, wenn (n) Elemente zurückgegeben werden
            * `[name1,name2, ...]` erstellt genau diese Namen (Beispiel `System.Memory_[used, free, available]` würde drei Zustände namens `System.Memory_used, System.Memory_free, System.Memory_available` erstellen)
            * `[name/value]` nimmt den Namen aus der Objekteigenschaft `name` (kann unterschiedlich sein) und den Wert aus der Eigenschaft `value`. Jeder Eigenschafts- oder Wertname kann verwendet werden.
            * `[name/]` ohne einen Wert würde den Namen von `name` übernehmen und Unterzustände für alle anderen in diesem Objekt gefundenen Eigenschaften erstellen (Beispiel `System.Network.[iface/]`)

    * Der „Typ“ und die „Quelle“ der Informationsquelle, die es sein kann
        * `file`: Das Feld `source` beschreibt einen Dateinamen, der gelesen wird
        * `exec`: Das Feld `source` beschreibt einen einzeiligen Befehl, der ausgeführt wird
        * `info`: Das `source`-Feld beschreibt eine einzeilige `systeminfo`-Befehlsfunktion
        * `web`: Das `source`-Feld beschreibt eine Web-URL, die ausgelesen wird (oder Objekt, das den Zugriff beschreibt, dies muss später dokumentiert werden!).
        * Die Anfragen werden zwischengespeichert, wenn gleichzeitig mehrere Einträge mit dem gleichen Typ/Quellinhalt angefordert werden! Wenn Sie also jede Minute die Ausführung eines Befehls planen und zwei verschiedene Datenelemente aus demselben Befehl entnehmen, wird er nur einmal ausgeführt und nur der Datenfilter wird mehrmals angewendet.
        * Dies hilft, dieselbe Seite nicht mehrmals herunterzuladen, wenn Sie mehr Artikel abrufen möchten.

    * Der `regexp/filter`` wird verwendet, um zu beschreiben, wie der empfangene Text entweder mit gefiltert wird
        * `Regexp`-Anweisung, bei der die einzelnen Elemente mit `()` umgeben sein müssen.

        Beispiel: `/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` würde nach dem Text `lic` suchen, gefolgt von Leerzeichen und dann Zahlen, die mit `K` in allen Zeilen enden, es würde die 3 Zahlen zurückgeben. Dies wird im `df -BK`-Befehl von Linux verwendet, um mir die Größe einer gemounteten NFS-Freigabe anzuzeigen, die mit 'lic' im Namen endet.

        * `JsonPath`-Anweisung. Ich habe eine spezielle Version von JsonPath erstellt, um Daten aus Json oder beliebigen Javascript-Objekten auszuwählen.
            * Seine Syntax besteht aus einer Reihe von Selektoren, die sein können
            * `name` ein Eigenschaftsname
            * `*` jedes Element in diesem Objekt, dies können alle Eigenschaften sein oder wenn das Objekt ein Array ist, sind es alle Array-Elemente
            * `[(...)]` wertet `...` aus, um den Eigenschaftsnamen zu erhalten, der ausgewählt wird. `@` wird als Platzhalter für das aktuelle Objekt verwendet und kann in der eval-Anweisung verwendet werden.
            * `[?(...)]` Filtern Sie die Elemente dieses Artikels nach ...,

            Beispiel: `list[?(@.user == 'pi')]` würde zuerst die Eigenschaft `list` (die ein Array ist) auswählen und dann die Liste filtern, indem nur die Listenelemente ausgewählt werden, die `.user`auf `pi` eingestellt sind.

            * `[!(...)]` Gibt den ausgewerteten Wert als neues Element zurück. Auf diese Weise können Sie aus den gefundenen Objekten Ihre eigenen Daten berechnen.
            * `[name1,name2,name3]` würde nur diese Eigenschaftsnamen auswählen
            * `[0]` würde nur das 'erste' (oder n'te) Element oder die Eigenschaft auswählen
            * `[start:end:step]` würde die Elemente beginnend von `start` und `<end` mit `step` nehmen. Alle müssen Zahlen sein oder leer bleiben. `start` und `end` können negativ sein, was bedeuten würde, dass sie vom Ende zählen. Beispiel: `[1:-1:2]` würde jedes zweite Element vom zweiten bis einschließlich des letzten nehmen. Die letzte wäre `[-1::]`, die ersten 3 wären `[:3:]` und die letzten 3 wären `[-3::]`
            * „..“ ist ein rekursiver Abstiegsselektor, was bedeutet, dass „..name“ den Eigenschaftsnamen in „irgendeiner Abteilung“ des Objekts auswählen würde!
        * `html WebObject query` Für den Fall, dass HTML geparst wird, habe ich ein spezielles Abfragetool erstellt, um Elemente aus Webseiten ähnlich wie jQuery auszuwählen. Dieses Tool erstellt ein Objekt, das schließlich mit „JsonPath“ geparst wird. **Dokumentation folgt**

    * Der `convert`-Eintrag kann entweder sein
        * `json` für zu analysierende json-Daten, bei Webeinträgen bedeutet dies, dass der empfangene Text direkt als json behandelt wird und der Regexp/Filter eine `JsonParse`-Anweisung/Filter ist.
        * `xml` für XML-Daten, das bedeutet, dass die empfangenen Daten von XML nach json konvertiert und wie oben behandelt werden
        * „html“ würde ein „cheerio“-Objekt erzeugen, das dann mit der speziellen WebObject-Abfrage durchsucht wird
        * `number` oder `boolean` würde versuchen, den Wert in Zahlen oder Booleans umzuwandeln, während auf Booleans Zahlen > 0 wahr sind, aber auch Strings wie **on** oder **ein** und **true** ausgewertet werden wahr.
        * `...` alles andere wie `!parseInt(@)` würde ausgewertet und in diesem Fall **true** zurückgeben, wenn der Wert `0` ist, oder **false**, wenn der Wert eine größere Ganzzahl ist.

    * Das `role/type`-Feld beschreibt den ioBroker-Feldtyp und kann auch eine Einheit benennen. Der normale Feldtyp ist Text oder der in convert angezeigte Wert.
        * „json“ bedeutet, dass die Feldeigenschaft vom Objekt übernommen wird
        * `number|MB` würde ein Zahlenfeld mit der Einheit MB (Megabyte) definieren

    * Das Feld „Schreibbefehl“ beschreibt Anweisungen oder Auswertungen, die zum Zurückschreiben in das Element verwendet werden. Es funktioniert im Moment nur für die Typen „exec“ oder „file“.
        * Für `exec` ist es eine Befehlszeile, die `@(...)`-Anweisungen enthalten kann, die ausgewertet würden. Beispiel: `gpio write 1 @(@ ? '0' : '1')` würde in `gpio write 1 0` übersetzt, wenn der Status wahr ist, und in `gpio write 1 1`, wenn er falsch ist. Dies steuert meine IR-LEDs, die aufleuchten, wenn der GPIO-Pin "low" (0) ist.
        * Für `file` ist es ein einfacher Auswertungsausdruck, der ausgeführt und in die Datei geschrieben wird. Beispiel: `@ ? '1' : '0' ` würde '1' schreiben, wenn der Wert wahr ist, und '0', wenn er falsch ist.

    * Der letzte ist der „Zeitplan“. Wenn es leer ist, wird es überhaupt nicht ausgeführt! Alle Zeitpläne, die denselben Wert haben, werden zusammen mit demselben Cache ausgeführt.
        * `Cron-Syntax` Sie können dieselbe 'Cron'-Syntax verwenden, die oBroker in JavaScript-Zeitplänen verwendet, die in [node-schedule](https://github.com/node-schedule/node-schedule) beschrieben ist
        * `time-syntax` Ich habe eine spezielle Zeitsyntax `?:?(:?)` erstellt, die es einfacher macht
            * `*:16` würde diese Daten zur 15. Minute jeder Stunde anfordern
            * `*/2:1:1` würde jede zweite Stunde in der 1. Minute und 1 Sekunde anfordern.
            * `?s`, `?m`, `?h ` mit ? Wenn Ziffern > 0 sind, würde die Anfrage alle ?Sekunden, Monate oder Stunden ausgeführt werden, Sie können nicht mehrere Elemente gleichzeitig angeben!
        * Zeitpläne werden zur gleichen Zeit gruppiert, wenn Sie die Sekunden wie im ersten Beispiel oben weglassen, wird sie einer Nummer zugewiesen, die versucht, dieselbe Sekunde für alle Elemente zu vermeiden. Dies geschieht, um nicht zu viele Befehle gleichzeitig auszuführen.

## Bekannte Probleme
* Beta-Test, kein Schreiben auf Webseiten implementiert

##Wichtig/Wichtig
* Benötigt Knoten >=v4.5

## Changelog
### 0.3.0
* Added save and load config in admin screen

### 0.2.2
* First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
* New icon to separate it from info-Adapter

### 0.2.0
* First public beta includes jsonParse and WebQuery parse

### Todo for later revisions
* Allow import/export of configs to easily add new functions
* Allow access of web pages with authentication and also writing/postng web content

## License

The MIT License (MIT)

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