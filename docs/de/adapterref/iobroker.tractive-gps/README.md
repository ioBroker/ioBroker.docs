---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: CYDbmFIkHsg8o4GoRx1JVxUXyU05/uSXPlSA97SfWNU=
---
![Logo](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tractive-gps-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tractive-gps-stable.svg)

# IoBroker.tractive-gps
**Tests:** ![Test und Freigabe](https://github.com/xXBJXx/ioBroker.tractive-gps/workflows/Test%20and%20Release/badge.svg)

##tractive-gps-Adapter für ioBroker
### HAFTUNGSAUSSCHLUSS
Alle Produkt- und Firmennamen oder Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Eigentümer. Ihre Verwendung impliziert keine Zugehörigkeit oder Billigung durch sie oder verbundene Partner! Dieses persönliche Projekt wird auf Freizeitbasis verfolgt und hat keine geschäftlichen Ziele. **[Zug](https://tractive.com/de/)** ist eine Marke der **Tractive GmbH**.

### Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**\ Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter.
[Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

### Beschreibung
Mit diesem Adapter können Sie eine Verbindung zum Tractive GPS-Dienst herstellen und den Standort Ihrer Haustiere abrufen. Der Adapter erstellt für jedes Haustier ein Gerät und einen Status für jeden Standort. Der Adapter erstellt außerdem einen Status für den Batteriestand des Trackers und vieles mehr Status, die von der API bereitgestellt werden.

### Voraussetzungen
Um diesen Adapter nutzen zu können, müssen Sie über ein Tractive-Konto und einen Tracker für Ihr Haustier verfügen (siehe [Zug](https://tractive.com/de/)) ( **Achtung:** Monatliche / jährliche Gebühr für die Nutzung des Tractive-Dienstes)

### Installation
Der Adapter wird über den ioBroker-Adaptermanager installiert.\ **Achtung:** Der Adapter erfordert mindestens Node.js >= 16 und js-controller 3.3.22 und admin >=6! Nach der Installation müssen Sie sich mit Ihrem Tractive-Konto anmelden und das Abfrageintervall festlegen. Der Adapter holt sich dann ein Token von der Tractive-API und speichert es in der Konfiguration. Dieses Token hat eine Ablaufzeit, die automatisch erneuert wird, wenn es abläuft.

### Aufbau
In der Adapterkonfiguration gibt es zwei Einstellungsmöglichkeiten:

* **Anmeldung**.
  1. Hier können Sie sich mit Ihrem Tractive-Konto anmelden.\
  2. Legen Sie das Abfrageintervall fest.\
  3. Stellen Sie den Token manuell erneut aus.\

  ![Instanzen-tractive-gps-login.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-login.png)

* **Alle Geräte** – Hier wird eine Liste aller vom Adapter gefundenen Geräte angezeigt. Sie können den Namen des Geräts in der Liste ändern.

Dieser wird dann auch in den Objekten angezeigt.\ ![Instanzen-tractive-gps-allDevices-table.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png) Um den Namen zu ändern, klicken Sie auf das Stiftsymbol und geben Sie den neuen Namen ein.
![Instanzen-tractive-gps-allDevices-modal.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### Tab
Im Tab werden alle gefundenen Geräte mit einer Karte und einigen Informationen zum Gerät angezeigt.\ ![tab-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ftab-tractive-gps.png) Das Bild kann auch durch das eigene Bild des Tieres ersetzt werden.\ Dazu wird eine PNG-Datei mit dem Namen des Trackers erstellt (z. B. ZSDLINVD.png) muss im Ordner **iobroker-data/files/tractive-gps** abgelegt werden.
Alternativ können Sie die Datei auch über die Registerkarte **Dateien** hochladen. (siehe Bild unten)\ **Die empfohlene Größe für das Bild beträgt 1920x1080 Pixel.**\ ![files-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ffiles-tractive-gps.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.2 (2023-02-24)
* (xXBJXx) Dependencies updated
* (xXBJXx) UI updated

### 0.1.1 (2023-02-05)
* (xXBJXx) Dependencies updated

### 0.1.0 (2023-02-05)
* (xXBJXx) first release

## License
MIT License

Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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