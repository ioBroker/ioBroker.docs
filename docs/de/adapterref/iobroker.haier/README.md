---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.haier/README.md
title: ioBroker Haier Klimaadapter
hash: lElAdsQSqdcvWBnza70hSO0PKoEFIk/ZAopUAW9LUCw=
---
![Logo](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Haier Klimaadapter
=================

Der ioBroker Haier-Adapter wird verwendet, um Ihre Haier-Klimaanlage über UART in Verbindung mit dem TCP-to-Serial-Gateway zu steuern.
Die Arbeiten werden an der Klimaanlage der 'Lightera'-Serie überprüft.

##Hardware
Als TCP-to-Serial-Gateway verwende ich diese [code](https://github.com/instalator/ESP8266.TelnetToSerial) und dieses [Gerät](https://blog.instalator.ru/archives/433).

## Verwenden
### Energie
Klimaanlage ein- und ausschalten. (wahr falsch)

### Temperatur
Aktuelle Angaben zur Raumtemperatur.(°C)

### Solltemperatur
Temperatur einstellen. (16 - 30 °C)

###-Modus
* **auto** oder **0** - Ein Schlüssel kann Ihnen ein komfortables Zimmer geben! Die Klimaanlage kann die Innentemperatur und Luftfeuchtigkeit beurteilen und die Anpassung entsprechend vornehmen.
* **cool** oder **1** - Kühlraum.
* **Heizen** oder **2** - Raumheizung.
* **Lüfter** oder **3** - Nur Lüfter.
* **trocken** oder **4** - Luftentfeuchtung.
* **aus** oder **5** - Wechselstrom ausschalten.

### Lüftergeschwindigkeit
* **min** oder **2** - Lüftergeschwindigkeit
* **mittel** oder **1** - Lüftergeschwindigkeit
* **max** oder **0** - Lüftergeschwindigkeit
* **auto** oder **3** - Lüftergeschwindigkeit

### Schwingen
* **ud** oder **1** - Auto UP/Down.
* **lr** oder **2** - Auto Links/Rechts.
* **beide** oder **3** - Beide Richtungen.
* **falsch** oder **0** oder **aus** - Aus.

### Gesundheit
(wahr/falsch) Der Wasser-Ionen-Generator in der Klimaanlage kann viel Anion erzeugen, effektiv die Menge an Position und Anion in der Luft ausgleichen und auch Bakterien abtöten und die Staubablagerung im Raum beschleunigen und schließlich die Luft reinigen das Zimmer.

### Fernbedienung sperren
IR-Fernbedienung sperren (wahr/falsch)

### Kompressor
Wenn der Kompressor eingeschaltet ist

### Frisch
(wahr/falsch) Lassen Sie die verunreinigte Luft aus dem Raum ab und atmen Sie frische Luft ein.
(Diese Funktion ist bei einigen Modellen nicht verfügbar.)

### Roh
Senden Sie RAW-HEX-Code ohne Startbytes und Prüfsummenbeispiel: Einschalten - **0A000000000001014D02**

## Changelog

### 1.0.4
   (instalator) change test

### 1.0.3
   (instalator) support admin3
   (instalator) support compact mode
   (instalator) change smart to auto
   (instalator) added role for state

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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