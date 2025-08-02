---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: LQx3Ecwqu+UAsQ6tKBY9Hs7TfKBTpH2ygoIwMmVSC64=
---
![Logo](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Anzahl der Installationen](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

# IoBroker.yeelight-2
[Deutsche Beschreibung hier](README_de.md)

Dieser Adapter steuert Ihre Yeelight-Geräte über Ihr lokales Netzwerk.

## Installation
Für alle Yeelights, die Sie steuern möchten, müssen Sie in den Einstellungen der Yeelight-App „LAN-Steuerung“ aktivieren.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Konfiguration
Sie können Geräte manuell hinzufügen oder im Netzwerk suchen. Der Standardport ist 55443. Bei Bedarf können Sie Name, IP, Port und Smartname ändern.

### Intelligenter Name
Wenn Sie einen Smartname eingeben, wird das Gerät zur iobroker.cloud hinzugefügt und kann von Alexa gesteuert werden.

### Gerät finden
Mit dieser Schaltfläche können Sie Ihr Netzwerk nach Geräten durchsuchen. Wenn welche gefunden werden, werden die Geräte der Tabelle hinzugefügt. Der Netzwerkscan dauert etwa 20 Sekunden. Werden die Geräte nicht gefunden, ist die LAN-Steuerung nicht aktiviert oder die Geräte befinden sich in einem anderen Netzwerk.

### Gerät nicht in der Liste
Sollte Ihr Gerät nicht in der Liste enthalten sein, z.B. YLTD003, verwenden Sie in diesem Fall eine andere Lampe mit den gleichen Eigenschaften (Schreibtischlampe oder Color oder etwas anderes).

## Szene einstellen
Verwendung: Mit dieser Methode wird die Smart LED direkt in einen bestimmten Zustand versetzt. Ist das Gerät ausgeschaltet, wird es zunächst eingeschaltet und anschließend der angegebene Befehl ausgeführt.

Parameter: 3 ~ 4.

„Klasse“ kann „Farbe“, „hsv“, „ct“, „cf“, „auto_dealy_off“ sein.

- „Farbe“ bedeutet, die Smart-LED auf die angegebene Farbe und Helligkeit zu ändern.
- „hsv“ bedeutet, die Smart-LED auf die angegebene Farbe und Helligkeit zu ändern.
- „ct“ bedeutet, die Smart-LED auf die angegebene ct und Helligkeit zu ändern.
- „cf“ bedeutet, einen Farbfluss auf eine bestimmte Weise zu starten.
- „auto_delay_off“ bedeutet, die Smart-LED auf die angegebene Helligkeit einzuschalten und einen Sleep-Timer zu starten, um das Licht nach den angegebenen Minuten auszuschalten.

„val1“, „val2“, „val3“ sind klassenspezifisch.

Anforderungsbeispiel:

- `["Farbe", 65280, 70]`
- `["hsv", 300, 70, 100]`
- `["ct", 5400, 100]`
- `["cf",0,0,"500,1,255,100,1000,1,16776960,70"]`
- `["auto_delay_off", 50, 5]`

HINWEIS: Wird sowohl im Zustand „Ein“ als auch „Aus“ akzeptiert.

Für die obigen Beispiele:

- Die erste besteht darin, die Farbe auf „652280“ und die Helligkeit auf 70 % einzustellen.
- Die zweite Möglichkeit besteht darin, die Farbe auf Farbton: 300, Sättigung: 70 und maximale Helligkeit einzustellen.
- Die dritte Möglichkeit besteht darin, CT auf 5400 K und 100 % Helligkeit einzustellen.
- Die vierte besteht darin, einen unendlichen Farbfluss auf zwei Flusstupeln zu starten.
- Die fünfte Möglichkeit besteht darin, das Licht auf 50 % Helligkeit einzuschalten und es dann nach 5 Minuten auszuschalten.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.2 (2025-02-28)

-   (Black-Thunder) Incompatibilities with the dependency "joy" have been fixed and "joy" has been updated.

### 1.5.1 (2025-02-26)

-   (mcm1957) Update of joi has been reverted due to incompatibilities.

### 1.5.0 (2025-02-26)

-   (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now
-   (Black-Thunder) Online status for each device has been added (visible in admin object tree).
-   (Black-Thunder) Support for compact mode has been added.
-   (Black-Thunder) Code has been partially refeactored.
-   (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-29)

-   (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
-   (mcm1957) Dependencies have been updated

### 1.3.1 (2024-02-15)

-   (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
-   (Black-Thunder) Crashes at startup of adapter have been fixed. [#271, #227 and #222]
-   (mcm1957) Testing has been changed to support node 18 and 20
-   (mcm1957) Dependencies have been updated
-   (Apollon77) make sure reconnects work correctly

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2024 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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