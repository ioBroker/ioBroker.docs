---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lowpass-filter/README.md
title: ioBroker.lowpass-filter
hash: T5f5x6wPgKQP7lkpwQKUjJ04xmlsHLNOFTdU82ZNRCo=
---
![Logo](../../../en/adapterref/iobroker.lowpass-filter/admin/lowpass-filter.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lowpass-filter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lowpass-filter.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lowpass-filter-installed.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.lowpass-filter.png?downloads=true)

# IoBroker.lowpass-filter
![Testen und freigeben](https://github.com/BenAhrdt/ioBroker.lowpass-filter/workflows/Test%20and%20Release/badge.svg)

## Tiefpassfilteradapter für ioBroker
Sie können Zustände vom Typ Zahl nach dem Filteralgorithmus eines Tiefpassfilters erster Ordnung filtern.
z.B. Sie können Leistungswerte filtern, um Leistungsspitzen abzuschneiden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 2.0.5 (2022-06-17) - readme changed
* (BenAhrdt) change some wrong links in readme file

### 2.0.4 (2022-06-16) - loglevel check deleted
* (BenAhrdt) dont check loglevel before log.debug()

### 2.0.3 (2022-06-13) - translate io-package
* (BenAhrdt) implement some translations into io-package

### 2.0.2 (2022-06-13) - adpater type changed
* (BenAhrdt) adapter tpe changed into misc-data

### 2.0.1 (2022-06-08) - loglevel implemented
* (BenAhrdt) logging just in loglevel mode "debug"

### 2.0.0 (2022-06-04)
* (BenAhrdt) workflow implemented

### 1.14.9
* (BenAhrdt) fixed some changes in readme

### 1.14.8
* (BenAhrdt) implements translation

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