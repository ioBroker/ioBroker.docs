---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.piface/README.md
title: ioBroker.piface
hash: YhzEdsahinL+9t6a485cFKS8W7qn60bGSPKpDo3zGwg=
---
![Logo](../../../en/adapterref/iobroker.piface/admin/piface.png)

![Anzahl der Installationen](http://iobroker.live/badges/piface-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.piface.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.piface.svg)
![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.piface.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.piface.png?downloads=true)

# ioBroker.piface

Dieser Adapter ermöglicht die Steuerung eines Piface auf einem Raspberry Pi.

Es verwendet node-pifacedigital: <https://github.com/tualo/node-pifacedigital>

Der Adapter erzeugt 8 Eingabe- und Ausgabeobjekte in iobroker. Die Ausgänge können über Schaltflächen in VIS oder durch Setzen des Objekts auf „true“, „false“, „1“ oder „0“ gesteuert werden.

### ! Aufmerksamkeit !

Bitte lesen Sie die Voraussetzungen für den Adapter. Der Adapter benötigt Node.js Version >= v4.0.0. Sie müssen die folgenden Bibliotheken über die Konsole installieren und die SPI-Unterstützung des Raspberry Pi in der Datei „raspi-config“ aktivieren.

```
git clone https://github.com/piface/libmcp23s17.git
cd libmcp23s17/
make
sudo make install
```

```
git clone https://github.com/piface/libpifacedigital.git
cd libpifacedigital/
make
sudo make install
```

Falls Fehler auftreten, weil Ihre Node-Version zu niedrig ist, aktualisieren Sie bitte die Node-Version.

- Die Installation mit Node-Version v4.2.1 war erfolgreich.

### Einstellungen in iobroker

![Alternativtext](../../../en/adapterref/iobroker.piface/admin/settings.png?raw=true "Einstellungen")

## PiFace-Platinennummer

Auf einem Raspberry Pi können bis zu vier Platinen gestapelt werden. Die Platinen müssen über Jumper adressiert werden. Verwenden Sie zum Adressieren der Platinen die folgenden Jumper-Einstellungen:

| Boardnummer | JP1 | JP2 |
| ----------- | :-: | :-: |
| Tafel 0     |  0  |  0  |
| Tafel 1     |  1  |  0  |
| Tafel 2     |  0  |  1  |
| Tafel 3     |  1  |  1  |

Falls Sie mehr als ein Board verwenden, erstellen Sie bitte für jedes Board eine zusätzliche Instanz und ändern Sie die Boardnummer in den Einstellungen der entsprechenden Instanz.

## PiFace liest Eingabe in ms

Dieser Wert definiert das Intervall, in dem die Eingaben geprüft werden. Der Wert wird in Millisekunden angegeben.

## Inverse Eingänge

Sie können die Eingaben umkehren.

## Ausgaben initialisieren

Wenn diese Option aktiviert ist, werden die Ausgänge durch einen Neustart des Adapters auf 0 gesetzt.

## Zu erledigen:

## Changelog

### 1.0.0.(2017-09-19)
* (Eisbaeeer)
* Solving issue #6 (RAM)

### 0.0.9 (2017-03-05)
* (Eisbaeeer)
* Activating Travis - no changes
* (Apollon77)
* Added basic testing

### 0.0.50 (2016-05-07)
* (Eisbeeer)
* Optimized loggin because of RPI´s flash

### 0.0.40
* (Eisbaeeer) RC
added:
* addressing boards

### 0.0.30
* (Eisbaeeer) first aplpha
added:
* Read interval in setup (ms)
* Selectable invers input (pullup)

### 0.0.20
* (Eisbaeeer) first beta

### 0.0.10
* (Eisbaeeer) initial version

## License
MIT