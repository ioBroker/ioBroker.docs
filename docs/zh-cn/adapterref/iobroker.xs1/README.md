---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xs1/README.md
title: ioBroker.xs1
hash: IeybNGgMEMa/IF18ankudZnwKWWL8wrsSWuzSaS5VS4=
---
![商标](../../../en/adapterref/iobroker.xs1/admin/xs1.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.xs1.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xs1.svg)
![特拉维斯-CI](http://img.shields.io/travis/frankjoke/ioBroker.xs1/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.xs1?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.xs1.png?downloads=true)

#ioBroker.xs1
=================

## ioBroker适配器zu EZcontrol XS1 Der适配器kommuniziertüberdieRestAPI des XS1undhängtsichauch an das XS1 als listener umalleÄnderungensofort an den ioBroker weiterzuleiten。
Befehle vom ioBroker werden zuerst mit ack = false gesendet und wenn etwas vom Listener kommt dann passiert das mit ack = true。男人weißdannzumindest dass XS1 den Befehl gesendet帽子。
Der Adapter scanntalleverfügbarenSensoren（只读）和Aktoren（读/写）和verwendet die am XS1 vergebenen Namen。

Momentan werden keine Spezialinformationen wieBatterielevelunterstütztdadiese dem Listener leider nicht weitergegeben werden。

Der link ist die gesamte link mit dem man sonst im Heimnetz auf das XS1 zugreifen kann。
Momentan ist noch kein Passwort-Zugriff implementiert und damit darf auf dem XS1 kein Passwort gesetzt sein！

  FürSensorenwelche im state eine'Teed low'-Meldung anzeigen wird ein .LOWBAT-State erzeugt。

Die Copylist erlaubt direktes Gleichschalten zwischen Listener und Aktoren。
Damit kann man Aktoren zusammenschalten welche ohne im ioBroker scrips schreibenzumüssen。
还有Wenn Aktor A von XS！ auf ein geht wird auch Aktor B（und C ..）auf ein geschaltet。
Das ist sinnvoll wenn Aktoren verschiedene Systeme benutzen（Aktor A = FS20，B = AB400，C = HMS）和zusammen geschaltet werden sollen（Ein funksender von FS20 kann dann direkt auch einen AB400 Funkstekdose schalten）。

Die Syntax ist {“von_a”：“auf_b（，auf_c，...）”，“von_b”：“auf_c”，....} Die runden klammern zeigen dass mehrere Destinationen mit comma getrennt angegebenwerdenkönnen。
Ein Beispiel von mir：{“UWPumpeT2”：“UWPumpe”，“UWPumpe”：“UWPumpeT2”，“Schalter1”：“Licht1，Licht2”} Damit wird der Taster（UWPumpeT2）mit der UWPumpe in beide Richtungen gleichgeschalten und man braucht im ioBroker nur noch einen Aktor verwenden。
'Schalter1'würde'Licht1'und'Licht2'gleichzeitigmitschalten。

FürdieneuhinzugefügteWeddog-Funktion sollte im XS1 ein virtueller Aktuator namens'Watchdog'kreiert werden。
Dieser wird jede Minute umgeschaltet und falls 4 Minuten lan dieser Umschaltvorgangnichtzurückgemeldetwirdwird der Adapter neu gestartet。

## Wichtig！
* DerAdapterbenötigtNode> = v4.3！
* Einen blinden（aber nicht virtuellen）Aktuator mit dem Namen'Watchdog'erstellen。

## Changelog
### 1.0.2
* Added more sensors. All unknown types will use 'value' role. This can lead to problems if actual type is a boolean, but should work otherwise. As a result all sensors should be listed now.

### 1.0.0
* Update accepted device list and test for node v 8
* Tarvis updated to test right repository

### 0.5.2
* Update variables list and values from XS1 but change values only if they are different than in state not to create false state updates

### 0.5.1
* Adapter test auf Node 4.x und 6.x für Windows und Linux.
* Fehler beim ersten Einlesen von boolean states korrigiert.

### 0.5.0 
* LOWBAT für Sensoren mit Battery low state.
* Abhängigkeit von 'async' und 'request' entfernt, damit braucht xs1 keine zusätzlichen Module mehr.
* Watchdog mit XS1-Aktuator implementiert.
* Cleanup der states wenn sie nicht mehr verwendet werden (und z.B. vom XS1 gelöscht werden)

### 0.4.2
  Watchdog von 4 Minuten implementiert, wenn 4 Minuten kein Signal vom XS1 kommt wird Adapter gestoppt.
  jede Minute sendet der Adapter ein Signal an den Aktuator 'Watchdog' der dies bestätigen sollte.
  iobroker sollte den Adapter dann neu starten.
 
### 0.4.0
  Erster öffentliche Version, kann lesen und Aktuatoren schreiben (Befehle absetzten).
  TODO: Dokumentieren und Batteriestatus polling implementieren.

### 0.1.0
  Erster Test, Kann nur lesen und mithören

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke

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