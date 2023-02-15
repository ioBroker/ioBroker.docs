---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.amazon-dash/README.md
title: ioBroker.amazon-dash (nur Linux!)
hash: sGzxItEtI3Jqdb9z3uu0NdbFH9wL1sCN4sBS+ACF/2c=
---
![Logo](../../../en/adapterref/iobroker.amazon-dash/admin/amazon-dash.png)

![Anzahl der Installationen](http://iobroker.live/badges/amazon-dash-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.amazon-dash.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.amazon-dash.svg)
![NPM](https://nodei.co/npm/iobroker.amazon-dash.png?downloads=true)

# IoBroker.amazon-dash (nur Linux!)
Adapter zur Erkennung des Drückens auf Amazon Dash Buttons in ioBroker.

Dieser Adapter funktioniert nicht unter Windows!

## Schritte
1. Installieren Sie `libpcap-dev`:

`sudo apt-get install libpcap-dev`

2. Koppeln Sie Ihren Dash-Adapter in der Amazon App, aber wählen Sie kein Produkt aus!

Beenden Sie einfach den Installationsvorgang auf der Registerkarte Produktauswahl.
Sonst bestellst du jedes Mal ein Produkt ;) [Deutsche Anleitung](https://www.amazon.de/gp/help/customer/display.html?nodeId=201746340).

3. Drücken Sie die Dash-Taste (sollte zuerst weiß sein und dann rot blinken)

4. Innerhalb der Adapterobjekte sollte eine neue Dash-Schaltfläche erscheinen, mit der Sie Szenen oder innerhalb des JS-Adapters starten können

5. Manchmal ist es erforderlich, dem Knoten Netzwerkzugriffsrechte zu erteilen:

`sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which node))`

## STELLENANGEBOTE!
Da dieses Projekt in meiner Freizeit entwickelt wird.
Ich suche aktiv nach Hilfe, um diesen Adapter zu warten und zu erweitern! Wenn Sie bereit sind zu helfen, schreiben Sie mir!

<!--

### **IN ARBEIT** -->

## Changelog
### 1.2.0 (2023-02-10)
* (bluefox) added option to execute `setcap` rights by every start

### 1.1.0 (2020-02-25)
+ (foxriver76) support of compact mode
+ (foxriver76) usage of adapter-core and eslint

### 1.0.1
+ (Apollon77) BREAKING: Upgrade pcap library supports nodejs 10+ and also supports nodejs 12

### 0.3.1
+ (PArns) Added new Amazon MAC family

### 0.3.0
+ (foxriver76) materialize ui
+ (foxriver76) dash buttons are now of type device

### 0.2.9
+ (cernst1980) Ignore duplicate ARPs for 5 seconds
+ (PArns) Added new Amazon MAC family

### 0.2.8
+ (offline4ever) Added new Amazon MAC family

### 0.2.7
+ (arteck) fixed MAC parsing

### 0.2.6
+ (arteck) edit admin
+ (arteck) add manual MAC Addresses 
+ (PArns) Added new Amazon MAC family

### 0.2.5
+ (PArns) Added new Amazon MAC family

### 0.2.4
+ (PArns) Added new Amazon MAC family

### 0.2.3
+ (PArns) Added new Amazon MAC family

### 0.2.2
+ (PArns) Added new Amazon MAC family
+ (PArns) Fixed function name in description

### 0.2.1
+ (PArns) Added new Amazon MAC family

### 0.2.0
+ (PArns) Simplified MAC lookup (thx to GermanBluefox)

### 0.1.2
+ (PArns) Added new Amazon MAC family

### 0.1.1
+ (GermanBluefox) Try to install `libpcap-dev` automatically

### 0.1.0
+ (Niksac) Added the ability to select an interface

### 0.0.5
+ (PArns) Fixed lastPushed
+ (PArns) Fixed GIT dependency which might cause problems on some systems

### 0.0.4
+ (PArns) Removed debug infos

### 0.0.3
+ (PArns) Fixed switch state

### 0.0.2
* (PArns) Added switch state, which toggles between true and false
* (PArns) Changed License

### 0.0.1
* (PArns) Initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2023 Patrick Arns <npm@patrick-arns.de>

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