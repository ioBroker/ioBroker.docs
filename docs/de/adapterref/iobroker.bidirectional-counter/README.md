---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bidirectional-counter/README.md
title: ioBroker.bidirektionaler Zähler
hash: VQRM1yPne/H+CEd1AsSojSOan53JJwXTJWyQGzsSyyU=
---
![Logo](../../../en/adapterref/iobroker.bidirectional-counter/admin/bidirectional-counter.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bidirectional-counter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bidirectional-counter.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bidirectional-counter-installed.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.bidirectional-counter.png?downloads=true)

# IoBroker.bidirektionaler Zähler
![Testen und freigeben](https://github.com/BenAhrdt/ioBroker.bidirectional-counter/workflows/Test%20and%20Release/badge.svg)

## Bidirektionaler Counter-Adapter für ioBroker
Zähler zum separaten Verbrauch (positive Änderungen) und geliefert (negative Änderungen)

Mit diesem Zähler können Sie jeden Status vom Typ Nummer in der benutzerdefinierten Konfiguration auswählen.
Der Adapter erstellt intern 3 Zustände. (verbraucht, geliefert und insgesamt).
verbraucht wird zugewiesen, wenn eine positive Änderung des abonnierten Zustands festgestellt wird.
zugestellt wird, wenn eine negative Änderung des abonnierten Zustands festgestellt wird.
Gesamtbetrag wird in jedem Fall zugeordnet.

z.B. Dieser Adapter ist nützlich, um einen Energiezähler mit einem bestimmten Energiewert von einem fremden Gerät zu emulieren.
Zum Beispiel wird Shelly die Energie eines Kanals im Falle eines Neustarts auf Null zurücksetzen.
Der Adapter ignoriert Null und der Zählerwert wird zur Verwendung in anderen Adaptern/Skripten gespeichert.
Der Zählerstand erhöht sich von seinem gespeicherten Wert, wenn der Shelly-Energiezustand das nächste Mal ansteigt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 2.0.8 (2022-06-17) - Readme updated
* (BenAhrdt) readme updated with paypal link

### 2.0.7 (2022-06-16) - loglevel query deleted
* (BenAhrdt) dont check loglevel before log.debug()

### 2.0.6 (2022-06-13) - adapter type changed
* (BenAhrdt) change adapter type into misc-data

### 2.0.5 (2022-06-08) - rewrite additional state with ack true
* (BenAhrdt) write ack = true in case of additional state is subscribed

### 2.0.4 (2022-06-08) - do not unsubscribe
* (BenAhrdt) unsubscribe fixed

### 2.0.3 (2022-06-06)
* (BenAhrdt) readme fixed

### 2.0.2 (2022-06-04)
* (BenAhrdt) fixed a comment Bug

### 2.0.1 (2022-06-04)
* (BenAhrdt) first try to release and push with Token

### 2.0.0 (2022-06-03)
* (BenAhrdt) release script implemented

### 1.14.9
* (BenAhrdt) fixed some changes in readme

### 1.13.8
* (BenAhrdt) fixed changes for official version
  use seState to write internal adapter states

### 1.8.7
* (BenAhrdt) edit changelog

### 1.8.6
* (BenAhrdt) first official version

## License
MIT License

Copyright (c) 2022 BenAhrdt <bsahrdt@gmail.com>

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