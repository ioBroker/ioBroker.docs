---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: gmjZSEUabprBE9/QQWdIuYgax6cnMmNaMF1Jacukr+0=
---
![Logo](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.extron.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.extron.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/extron-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/extron-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![NPM](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
![Testen und Freigeben](https://github.com/bannsaenger/iobroker.extron/workflows/Test%20and%20Release/badge.svg)

## Referenzen
Extron®, CrossPoint®, DTP®, NetPA®, XPA®, XTP® sind eingetragene Marken von RGB Systems, Incorporated\ Siehe [www.extron.com](https://www.extron.com/article/termsprivacy)

Das Logo stammt aus der Extron Control App von Extron

Dante® ist eine Marke von [Audinate](https://www.audinate.com/)

## Extron-Adapter für ioBroker
Extron SIS-Adapter

Steuergeräte von Extron.
Dieser Adapter ist dafür ausgelegt, einige der Audio-Video-Produkte von Extron über das **S**imple **I**nstruction **S**et Protocol zu steuern.
Der Funktionsumfang der Geräte ist enorm. Nicht alle Funktionen sind sinnvollerweise mit dem Adapter und der Interaktion mit iobroker unterstützt.

**Achtung:** Der einmal in der Adapterkonfiguration ausgewählte Gerätetyp kann später nicht mehr geändert werden!

In einer iobroker-Installation können mehrere Instanzen unterschiedlichen oder gleichen Typs dieses Adapters vorhanden sein. Für zukünftige Versionen müssen Sie der Adapterkonfiguration für jede Instanz eine gültige Lizenz hinzufügen.
Wenn Sie eine nichtkommerzielle Organisation sind oder ihn für private Zwecke verwenden, können Sie eine kostenlose Lizenz erhalten. Bitte kontaktieren Sie den Autor.

### Unterstützte Geräte
8x2 Präsentationsmatrix-Umschalter (DTP2 CrossPoint 82)
H.264-Streaming-Media-Player und -Decoder (SMD 202)
Streaming Media Encoder (SME 211)
- 6x4 ProDSP-Prozessor mit AEC und Dante (DMP 64 Plus C AT)
- 12x8 ProDSP-Prozessor mit Dante (DMP 128 Plus AT)
- 12x8 ProDSP-Prozessor mit AEC, VoIP und Dante (DMP 128 Plus C V AT)
- Dante Audio Matrix-Prozessor mit AEC (XMP 240 C AT)

## Aufgaben
- Der Gerätetyp wird zu Beginn der Konversation geprüft. Dies schlägt manchmal fehl. Muss auf einen zuverlässigeren Mechanismus umgestellt werden.
- Treffen Sie eine granularere Auswahl der verwendeten Ein- und Ausgänge, um die Datenbankgröße bei DSP-Geräten zu reduzieren
- weitere Befehle und deren Implementierung auf der Datenbankseite hinzufügen
- Verbesserung des Mechanismus zur Wiederverbindung mit dem Netzwerk

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) updated dependencies
* (Bannsaenger) introducing jsonConfig
* (mschlgl) add more DSP SIS commands
* (mschlgl) enhanced network reconnect functionality, added DANTE remote commands, additional devices

### 0.2.15 (2024-06-12)
* (mschlgl) fixed typo in io-package.json

### 0.2.14 (2024-06-10)
* (mschlgl) changed function createDatabase to use setObj()

### 0.2.13 (2024-06-06)
* (mschlgl) corrected instance.comon.titleLang to be set at startup, updated role definitions, added audiofile transfer functionality for DMPxxx

### 0.2.12
* (mschlgl) added instance.comon.title / .titleLang to be set at startup

### 0.2.11
* (mschlgl) added instance.device.name to be set at startup

### 0.2.10
* (mschlgl) corrected preset list handling on SMD202

### 0.2.9
* (mschlgl) disable subtitle command on startup added for SMD202

### 0.2.8
* (mschlgl) onStreamData command debug msg added

### 0.2.7
* (mschlgl) SMD202 preset list handling updated

### 0.2.6
* (mschlgl) added SMD202 preset list handling on startup
### 0.2.5
* (mschlgl) added SMD202 preset list handling

### 0.2.4
* (mschlgl) corrected typo in object_templates

### 0.2.3
* (mschlgl) fixed DMP128 file handling

### 0.2.2
* (mschlgl) fixed SMD202 loopmode command

### 0.2.1
* (mschlgl) updated log messages, improved group control on DMP128

### 0.2.0
* (Bannsaenger) updated dependencies

### 0.1.16
* (mschlgl) fixed group command issues, added statedelay log message on DMP128

### 0.1.15
* (mschlgl) added statedelay log message on DMP128

### 0.1.14
* (mschlgl) fixed group command issues on DMP128

### 0.1.13
* (mschlgl) fixed source code version issues

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202

### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2024 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.