---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.systeminfo/README.md
title: Systeminfo
hash: mlbA7fpSodGXZ30SfqL9u8n24OHol25b1tmdBEPeCzM=
---
![Logo](../../../en/adapterref/iobroker.systeminfo/admin/systeminfo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI Build-Status](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

# Systeminfo

Liest (und schreibt) Informationen aus dem/den System(en)

## Der Adapter verarbeitet (System-)Informationen aus eigenen oder anderen Systemen und Webquellen.

Es generiert Zustände aus den Informationen, die es über verschiedene Methoden findet.

- Im Betriebssystem ausgeführte Befehle

- Dateien, die auf lokalen oder verbundenen Systemen gelesen werden sollen

- Ergebnisse von Webseiten oder APIs

- Node.js-Tools-Befehle

- Befehle und Dateien funktionieren auch in beide Richtungen, was bedeutet, dass Sie auch Informationen in das System schreiben können.

- Dies ermöglicht den Zugriff auf und das Beschreiben der GPIO-Pins auf dem Raspberry Pi oder Orange Pi sowie die Steuerung der grünen oder roten LEDs auf dem Raspberry Pi/Opi.

- Es ermöglicht außerdem das Abrufen und Festlegen einiger Systeminformationen, die unter Linux über /sys zugänglich sind.

- Es wird ein „Systeminformations“-Teil verwendet, der unter Windows und Linux funktioniert.

Es verarbeitet Text-, HTML-, JSON- und XML-Datentypen mithilfe spezieller Abfragemechanismen.

### Notiz

- Ich möchte mich bei einigen Webmodulen bedanken, die ich verwendet oder in meinen eigenen Code integriert habe. Der Adapter nutzt externe Module wie [cheerio](https://github.com/cheeriojs/cheerio) , [systeminformation](https://github.com/sebhildebrandt/systeminformation) und [node-schedule](https://github.com/node-schedule/node-schedule) unverändert. Er wurde außerdem von [JSONPath](http://goessner.net/articles/JsonPath/index.html#e2) und [scrape-it](https://github.com/IonicaBizau/scrape-it) inspiriert, deren Code jedoch nicht direkt übernommen, sondern für die jeweiligen Anforderungen angepasst wurde.

## Konfiguration

- In der Adapterkonfiguration konfigurieren (Seite vergrößern)
- Ich habe [hier](https://github.com/iobroker-community-adapters/ioBroker.systeminfo/blob/master/admin/Systeminfo.Config.jpg) ein Bild einer Beispielkonfiguration gespeichert.
  - Der erste Eintrag ist eine Befehlsliste, die beim Start des Adapters zeilenweise ausgeführt wird. Sie dient zur Konfiguration der verwendeten GPIO-Ports.
  - Zeilen, die mit ' beginnen`#` ' werden nicht ausgeführt
  - Wenn der erste Text '`debug!` 'Es versetzt den Adapter in den Debug-Modus, wodurch wesentlich mehr Informationen darüber angezeigt werden, was er abzurufen versucht und empfängt.
- Nach der Startkonfiguration folgt die Konfigurationsliste für jede Datenquelle, bestehend aus

  - Namensfeld, das auch Folgendes enthalten kann

    - Wenn ein Name mit ' beginnt`-` Die Leitung wird ignoriert (abgeschaltet), genau wie wenn kein Zeitplan vorhanden ist.
    - `[*]` ,`[name, ...]` ,`[name/(value)]` Syntax
    - Ohne die oben genannten Angaben wird der Name verwendet, um einen Zustand zu erstellen, wie er ist.
    - Wenn`[]` wird irgendwo verwendet, hier werden Namen mit verschiedenen Methoden eingefügt
      - `[*]` Werden mehrere Elemente zurückgegeben, werden diese als Zahlen eingefügt. Beispiel:`Meldung[]` würde erzeugen`Meldung0` -`Meldung(n)` Wenn (n) Elemente zurückgegeben werden
      - `[name1,name2, ...]` erstellt genau diese Namen (Beispiel)`System.Memory_[used, free, available]` würde drei Staaten schaffen, die`System.Memory_used, System.Memory_free, System.Memory_available` )
      - `[name/value]` nimmt den Namen aus der Objekteigenschaft auf.`name` (könnte abweichen) und der Wert aus der Eigenschaft`value` Es kann jeder beliebige Eigenschafts- oder Wertname verwendet werden.
      - `[name/]` ohne Wert würde der Name übernommen werden von`name` und erstellen Sie Unterzustände für alle anderen Eigenschaften dieses Objekts (Beispiel)`System.Network.[iface/]` )

  - Der`type` Und`source` der Informationsquelle, die sein kann

    - `file` : Der`source` Das Feld beschreibt einen Dateinamen, der gelesen wird.
    - `exec` : Der`source` Das Feld beschreibt einen einzeiligen Befehl, der ausgeführt wird
    - `info` : Der`source` Das Feld beschreibt eine einzelne Zeile`systeminfo` Befehlsfunktion
    - `web` : Der`source` Das Feld beschreibt eine Web-URL, die gelesen wird (oder ein Objekt, das den Zugriff beschreibt; dies muss später dokumentiert werden!).
    - Die Anfragen werden zwischengespeichert, wenn gleichzeitig mehrere Einträge mit demselben Typ/Quellinhalt angefordert werden! Das bedeutet: Wenn Sie die Ausführung eines Befehls jede Minute planen und zwei verschiedene Datenelemente aus demselben Befehl extrahieren, wird dieser nur einmal ausgeführt und lediglich der Datenfilter wird mehrfach angewendet.
    - Dadurch wird vermieden, dass dieselbe Seite mehrfach heruntergeladen wird, wenn Sie weitere Elemente abrufen möchten.

  - Der \`regexp/filter\` wird verwendet, um zu beschreiben, wie der empfangene Text gefiltert werden soll, entweder mit
    - `Regexp` Aussage, in der die einzelnen Gegenstände umgeben werden müssen mit`()` . Beispiel:`/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` würde nach dem Text suchen`lic` gefolgt von Leerzeichen und dann Zahlen, die mit`K` In allen Zeilen würden die drei Zahlen zurückgegeben. Dies wird verwendet in der`df -BK` Linux-Befehl, um mir die Größe einer eingebundenen NFS-Freigabe anzuzeigen, deren Name auf „lic“ endet.
    - `JsonPath` Ich habe eine spezielle Version von JsonPath erstellt, um Daten aus JSON-Objekten oder beliebigen JavaScript-Objekten auszuwählen.
      - Seine Syntax besteht aus einer Zeile von Selektoren, die sein können
      - `name` ein Immobilienname
      - `*` Jedes Element in diesem Objekt, dies können alle Eigenschaften oder, falls das Objekt ein Array ist, alle Array-Elemente sein.
      - `[(...)]` auswerten`...` um den Namen der auszuwählenden Eigenschaft zu erhalten.`@` wird als Platzhalter für das aktuelle Objekt verwendet und kann in der eval-Anweisung verwendet werden.
      - `[?(...)]`Filtern Sie die Elemente dieses Eintrags nach ..., Beispiel:`list[?(@.user == 'pi')]` würde zuerst die Immobilie auswählen`list` (was ein Array ist) und filtern Sie dann die Liste, indem Sie nur diese Listenelemente auswählen, die`.user` eingestellt auf`pi` Die
      - `[!(...)]` Gibt den ausgewerteten Wert als neues Element zurück. Auf diese Weise können Sie aus den gefundenen Objekten Ihre eigenen Daten berechnen.
      - `[name1,name2,name3]` würde nur diese Eigenschaftsnamen auswählen
      - `[0]` würde nur das erste (oder n-te) Element oder die erste Eigenschaft auswählen.
      - `[start:end:step]` würde die Elemente nehmen, beginnend mit`start` Und`<end` Verwendung`step` Alle Felder müssen Zahlen enthalten oder leer bleiben.`start` Und`end` kann negativ sein, was bedeutet, dass sie vom Ende her gezählt werden. Beispiel:`[1:-1:2]` würde jedes zweite Element vom zweiten bis zum letzten (ausschließlich) nehmen. Das letzte Element wäre`[-1::]` Die ersten 3 wären`[:3:]` und die letzten 3 wären`[-3::]`
      - `..` ist ein rekursiver Abstiegselektor, was bedeutet, dass`..name` würde den Eigenschaftsnamen in „einer beliebigen Abteilung“ des Objekts auswählen!
    - `html WebObject query` Falls HTML geparst wird, habe ich ein spezielles Abfragetool entwickelt, um Elemente von Webseiten ähnlich wie jQuery auszuwählen. Dieses Tool erzeugt ein Objekt, das schließlich geparst wird.`JsonPath` **Die Dokumentation folgt** .

  - Der`convert` Der Eintrag kann entweder sein

    - `json` Damit JSON-Daten geparst werden können, bedeutet dies bei Web-Einträgen, dass der empfangene Text direkt als JSON verarbeitet wird und der reguläre Ausdruck/Filter ein`JsonParse` Anweisung/Filter.
    - `xml` Für XML-Daten bedeutet dies, dass die empfangenen Daten von XML in JSON konvertiert und wie oben beschrieben verarbeitet werden.
    - `html` Würde ein`cheerio` Objekt, das dann mit der speziellen WebObject-Abfrage durchsucht wird.
    - `number` oder`boolean` würde versuchen, den Wert in Zahlen oder boolesche Werte umzuwandeln, wobei bei booleschen Werten Zahlen > 0 als wahr gelten, aber auch Zeichenketten wie **on** oder **ein** und **true** als wahr ausgewertet werden.
    - `...` alles andere wie`!parseInt(@)` würde ausgewertet werden und in diesem Fall **true** zurückgeben, wenn der Wert`0` oder **falsch,** wenn der Wert eine größere ganze Zahl ist.

  - `role/type` Das Feld beschreibt den ioBroker-Feldtyp und kann auch eine Einheit benennen. Der normale Feldtyp ist Text oder der in der Konvertierung angezeigte Wert.

    - `json` bedeutet, dass die Feldeigenschaft vom Objekt übernommen wird.
    - `number|MB` würde ein Zahlenfeld mit der Einheit MB (Megabyte) definieren

  - `Write Command` Das Feld beschreibt Anweisungen oder Auswertungen, die verwendet werden, um in das Element zurückzuschreiben. Es funktioniert derzeit nur für „`exec` ' oder '`file` ' Typen.

    - Für`exec` Es handelt sich um eine Befehlszeile, die Folgendes beinhalten kann:`@(...)` Aussagen, die ausgewertet würden. Beispiel:`gpio write 1 @(@ ?  '0' : '1')` würde übersetzt werden zu`gpio write 1 0` wenn der Zustand wahr ist und zu`gpio write 1 1` Wenn es falsch ist. Dies steuert meine IR-LEDs, die aufleuchten, wenn der GPIO-Pin auf „Low“ (0) liegt.
    - Für`file` Es handelt sich um einen einfachen Auswertungsausdruck, der ausgeführt und in die Datei geschrieben wird. Beispiel:`@ ? '1' : '0' ` würde '1' schreiben, wenn der Wert wahr ist, und '0', wenn er falsch ist.

  - Das letzte ist das`schedule` Ist der Cache leer, wird die Iteration überhaupt nicht ausgeführt! Alle Zeitpläne mit exakt demselben Wert werden zusammen mit demselben Cache ausgeführt.
    - `cron-syntax` Sie können dieselbe 'cron'-Syntax wie oBroker in JavaScript-Zeitplänen verwenden, die in [node-schedule](https://github.com/node-schedule/node-schedule) beschrieben ist.
    - `time-syntax` Ich habe eine spezielle Zeitsyntax erstellt.`?:?(:?)` was es einfacher macht
      - `*:16` würde diese Daten in der 15. Minute jeder Stunde anfordern.
      - `*/2:1:1` würde jede zweite Stunde um die 1. Minute und 1 Sekunde eine Anfrage stellen.
      - `?s` ,`?m` ,`?h ` Wenn Sie Ziffern >0 angeben, wird die Anfrage alle ? Sekunden, Minuten oder Stunden ausgeführt. Sie können nicht mehrere Elemente gleichzeitig angeben!
    - Zeitpläne werden nach der gleichen Zeit gruppiert. Wenn Sie die Sekundenangabe wie im ersten Beispiel oben weglassen, wird sie einer beliebigen Zahl zugewiesen, um zu vermeiden, dass alle Elemente in derselben Sekunde ausgeführt werden. Dies dient dazu, nicht zu viele Befehle gleichzeitig auszuführen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.3.0 (2025-05-27)

* (lfischer85) Creation and update of states has been fixed. [#214, #139]
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-28)

* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-09-08)

-   (mcm1957) Adapter requires node 16 or newer now
-   (mcm1957) Dependencies have been updated

### 1.0.0 (2023-07-13)

-   (mcm1957) changed: Testing has been changed to support node 16, 18 and 20
-   (mcm1957) changed: Dependencies have been updated
-   (mcm1957) changed: Code has been adapted to meet js-controller 5.x requirements

### 0.3.0

-   Added save and load config in admin screen

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.systeminfo/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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