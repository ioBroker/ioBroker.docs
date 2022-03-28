---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: B3LK3xfNX9fmvXuxJxb46Nr0OTCP/yXUM0gYFA2x/i4=
---
![Logo](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Anzahl der Installationen](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

# IoBroker.yeelight-2
[Deutsche Beschreibung hier](README_de.md)

Dieser Adapter steuert Ihr Yeelight-Gerät. Dieser Adapter ist nur für admin3. Admin2 wird nicht unterstützt

## Jump-Version
Beim Wechsel von 0.4.X auf 0.9.X oder höher müssen die Objekte manuell gelöscht werden, damit sie neu erstellt werden können.

## Installation
für RGB Bulbs muss das LAN in den Einstellungen der Yeelight App aktiviert werden.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Konfig
Sie können Geräte manuell hinzufügen oder Geräte im Netzwerk suchen. Der Basisport ist 55443. Wenn Sie möchten, können Sie Name, IP, Port und Smartname ändern

### Smartname
Wenn Sie einen Smartname eingeben, wird das Gerät zur iobroker.cloud hinzugefügt und kann von Alexa gesteuert werden.

### Gerät suchen
Mit dieser Schaltfläche können Sie Ihr Netzwerk nach Geräten durchsuchen, wenn etwas gefunden wird, werden die Geräte der Tabelle hinzugefügt. Das Scannen des Netzwerks dauert etwa 20 Sekunden. Wenn die Geräte nicht gefunden werden, ist der LAN-Modus nicht aktiviert oder die Lampen befinden sich in einem anderen Netzwerk.

### Gerät nicht in der Liste
Wenn Ihr Gerät nicht in der Liste ist, z. yltd003 Verwenden Sie eine andere Lampe mit den gleichen Eigenschaften, in diesem Fall Schreibtischlampe oder Farbe oder etwas anderes.

## Set_scene Verwendung: Diese Methode wird verwendet, um die intelligente LED direkt in den angegebenen Zustand zu versetzen. Wenn die Smart-LED ausgeschaltet ist, wird zuerst die Smart-LED eingeschaltet und dann der angegebene Befehl angewendet.
Parameter: 3 ~ 4.

 „class“ kann „color“, „hsv“, „ct“, „cf“, „auto_dealy_off“ sein.

- "Farbe" bedeutet, dass die Smart-LED auf die angegebene Farbe geändert wird und

Helligkeit.

- "hsv" bedeutet, dass die Smart-LED auf die angegebene Farbe und Helligkeit geändert wird.
- "ct" bedeutet, dass die Smart-LED auf die angegebene ct und Helligkeit geändert wird.
- "cf" bedeutet, einen Farbfluss auf bestimmte Weise zu starten.
- "auto_delay_off" bedeutet, dass die intelligente LED auf die angegebene Weise eingeschaltet wird

Helligkeit und starten Sie einen Sleep-Timer, um das Licht nach den angegebenen Minuten auszuschalten.

 "val1", "val2", "val3" sind klassenspezifisch.

Anforderungsbeispiel:

- ``["Farbe", 65280, 70]``
- ``["hsv", 300, 70, 100]``
- ``["ct", 5400, 100]``
- ``["cf",0,0,"500,1,255,100,1000,1,16776960,70"]``
- ``["auto_delay_off", 50, 5]``

HINWEIS: Akzeptiert sowohl im „Ein“- als auch im „Aus“-Zustand.

 Für obige Beispiele:

 - Die erste besteht darin, die Farbe auf "652280" und 70 % Helligkeit einzustellen.
 - Die zweite besteht darin, die Farbe auf Farbton: 300, Sättigung: 70 und maximale Helligkeit einzustellen.
 - Der dritte CT ist auf 500K und 100% Helligkeit eingestellt.
 - Die vierte besteht darin, einen unendlichen Farbfluss auf zwei Flusstupeln zu starten.
 - Der fünfte ist, das Licht auf 50% Helligkeit einzuschalten und dann auszuschalten

nach 5 Minuten.

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Optimize unload handling and async executions
* (Apollon77) Prevent log on unexpected types
* (Apollon77) Add Sentry for crash reporting

### 1.1.2 (2021-08-05)
* Fix Joi Error
### 1.1.1 (2021-08-03)
* (MeisterTR) js-controller 3.3 fixes
* (jlssmt) fixed unhandled promise rejection causing the adapter to stop
* (jlssmt) adapter won't set power of offline devices to off anymore 
### 1.1.0 (2021-07-26)
* (MeisterTR) add release-script update testing and dependencies
* (Diginix) fixed data types
### 1.0.3 (2019-12-01)
* (MeisterTR) add Pedant
* (MeisterTR) transfer to community
### 1.0.1 (2018-12-08)
* (MeisterTR) push version, added set_scene
### 0.9.6 (2018-12-08)
* (MeisterTR) yeelight-wifi added
* (MeisterTR) fixed  bugs
* (MeisterTR) add manuell light
* (MeisterTR) better error handling
* (MeisterTR) fixed reconnect at start
* (MeisterTR) delete object and smartname bug fixed
### 0.9.1 (2018-10-31)
* (MeisterTR) added offline detection, poll sates, cleanup
### 0.9.0 (2018-08-29)
* (MeisterTR) rebuild
### 0.4.1 (2018-08-29)
* (MeisterTR) fixed JSON error
### 0.4.0 (2018-08-29)
* (MeisterTR) fixed errors
* (MeisterTR) added scenen
### 0.3.6 (2018-07-07)
* (MeisterTR) catch spaces in config, small performance changes
### 0.3.5 (2018-06-18)
* (MeisterTR) added yeelight650, fixed some bugs, power on when ct change
### 0.2.9 (2018-06-07)
* (MeisterTR) change name for repo and npm
### 0.2.8 (2018-06-01)
* (MeisterTR) fixed bug wit port, fixed set ct by alexa
### 0.2.6 (2018-05-31)
* (MeisterTR) fixed manny bugs.
### 0.2.0 (2018-03-07)
* (MeisterTR) many changes add smartname Option, add manual devices, many fixes
* (MeisterTR) fix role for alexa
### 0.1.1 (2018-03-07)
* (MeisterTR)return to default value when turn on
* (MeisterTR)fix role for alexa
### 0.1.0 (2018-03-07)
* (MeisterTR) many changes, add hue and sat for alexa control
### 0.0.2 (2018-03-07)
* (MeisterTR) objects not overwirte after restart
### 0.0.2 (2018-03-07)
* (MeisterTR) testing added, log changed
### 0.0.1 (2018-01-29)
* (cahek2202) initinal version



base from: adb backup https://github.com/cahek2202/ioBroker.yeelight

## License
The MIT License (MIT)

Copyright (c) 2018-2022 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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