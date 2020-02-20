---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wm-bus/README.md
title: kein Titel
hash: 6njKhpGr6/kOA37w9bFfDaO2DkjSIZlXknJm5sm7v8M=
---
![Logo](../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.wm-bus.svg)
![Tests](http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Build-Status](https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true)

### IoBroker.wm-bus
*** Dieser Adapter benötigt mindestens Node 4.4 ***

#### Beschreibung
Adapter für Wireless M-Bus

#### Die Info
Unterstützte USB-Adapter:

+ [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) + [CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) + [Amber 8465-M](https://www.amber-wireless.de/en/amb8465-m.html)

#### Aufbau
Falls verwendet, ein AES-Schlüssel zum Entschlüsseln der Nachricht.
Hersteller-ID, Typ und Version werden nach der ersten empfangenen Nachricht ermittelt

#### Installation
Führen Sie den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in / opt / iobroker).

```
npm install iobroker.wm-bus
```

#### Bedarf
+ einen [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) USB-Stick + oder einen [CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) USB-Stick + ein WM-Bus-Gerät, z. [EasyMeter](http://www.easymeter.com/)

## Changelog
### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library