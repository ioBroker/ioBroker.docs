---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: 3zdAYVO9z2O5PfXBD40rhpwxUdw5kaRqio9wN1QM51A=
---
![Logo](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/e3oncan-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/e3oncan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Tests:** ![Test und Freigabe](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## E3oncan-Adapter für ioBroker
# Basiskonzept
Viessmann Geräte der E3-Serie (One Base) tauschen viel Daten über den CAN-Bus aus.

Dieser Adapter kann diese Kommunikation abhören und viele nützliche Informationen extrahieren. Auch der häufig eingesetzte Energiezähler E380 CA wird unterstützt.

Parallel dazu wird das **Lesen von Datenpunkten** (ReadByDid) unterstützt. Informationen, die über das Zuhören nicht verfügbar sind, können aktiv nachgefragt werden. Das UDSonCAN-Protokoll wird auch von anderen Geräten verwendet, z. B. über das bekannte WAGO-Gateway.

**Das Schreiben von Datenpunkten** über UDSonCAN (WriteByDid) wird ebenfalls unterstützt. Durch das Schreiben in Datenpunkte ist es möglich, Sollwerte, Zeitpläne usw. zu ändern. Es ist sogar möglich, neue Zeitpläne hinzuzufügen, z. für Warmwasser-Zirkulationspumpe.

Das Schreiben von Daten wird durch das Speichern des entsprechenden Status mit nicht aktiviertem `Acknowledged` (ack=false) ausgelöst – ja, so einfach ist das! Der Datenpunkt wird erneut vom Gerät gelesen und 2,5 Sekunden nach dem Schreiben im Zustand gespeichert. Wenn der Status nicht bestätigt wird, sehen Sie sich bitte die Protokolle an.

Das Schreiben ist mithilfe einer **Whitelist** auf eine Reihe von Datenpunkten beschränkt. Die Liste wird im Infobereich jedes Geräts gespeichert, z.B. unter `e3oncan.0.vitocal.info.udsDidsWritable`. Sie können weitere Datenpunkte hinzufügen, indem Sie diesen Status bearbeiten. Stellen Sie sicher, dass Sie `Acknowledged` beim Speichern des Status **nicht** aktivieren.

Beim ersten Start der Adapterinstanz wird ein Gerätescan durchgeführt, der eine Liste aller verfügbaren Geräte für den Konfigurationsdialog bereitstellt.
Bei der ersten Einrichtung sollte eine Suche nach Datenpunkten jedes Geräts durchgeführt werden.

Wichtige Teile dieses Adpaters basieren auf dem Projekt [open3e](https://github.com/open3e).

Eine Python-basierte Implementierung eines reinen Listening-Ansatzes mit MQTT-Messaging ist ebenfalls verfügbar, siehe [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Erste Schritte
**Voraussetzungen:**

* Sie haben einen (USB-zu-)CAN-Bus-Adapter, der an den externen CAN-Bus des Viessmann E3-Geräts angeschlossen ist
* Derzeit werden nur Linux-basierte Systeme unterstützt.
* CAN-Adapter ist aktiv und im System sichtbar, z.B. als „can0“ (zur Überprüfung ifconfig verwenden).
* Weitere Einzelheiten finden Sie im open3e-Projekt
* **Stellen Sie sicher, dass während der Ersteinrichtung kein anderer UDSonCAN-Client (z. B. Open3Eclient.py) läuft!** Dies könnte zu Kommunikationsfehlern in beiden Anwendungen führen.

Alle von diesem Adapter bereitgestellten Dienste basieren auf der Geräteliste Ihres spezifischen Viessmann E3-Setups. Daher müssen Sie bei der Ersteinrichtung folgende Schritte befolgen:

**Aufbau**

* Wenn die Installation des Adapters abgeschlossen ist, wird ein Konfigurationsdialog angezeigt, in dem Sie bis zu zwei CAN-Bus-Adapter konfigurieren können (Registerkarte „CAN-ADAPTER“).
* Bearbeiten Sie den Namen des Adapters und aktivieren Sie das Kontrollkästchen „Mit Adapter verbinden“ zumindest für den externen Adapter
* Wenn Sie fertig sind, klicken Sie auf die Schaltfläche „SPEICHERN“, um die Änderungen zu übernehmen. Dieser Schritt ist **obligatorisch**. Die Instanz wird neu gestartet und mit dem CAN-Adapter verbunden.
* Gehen Sie zur Registerkarte „LISTE DER UDS-GERÄTE“ und führen Sie eine Suche nach am Bus verfügbaren Geräten durch, indem Sie auf die Schaltfläche „Scannen“ klicken. **Dies dauert einige Sekunden.** Sie können die Aktivitäten in einem zweiten Browser-Tab verfolgen, indem Sie sich die Protokollierungsinformationen des Adapters ansehen.
* Sie können die Benennung der Geräte in der 2. Spalte ändern. Diese Namen werden verwendet, um alle gesammelten Daten im Objektbaum von ioBoker zu speichern. Klicken Sie erneut auf die Schaltfläche „SPEICHERN“, wenn Sie Ihre Änderungen vorgenommen haben.
* Die Instanz wird erneut neu gestartet und nach einigen Sekunden sind Sie bereit, einen Scan nach verfügbaren Datenpunkten durchzuführen. Gehen Sie zum Reiter „LISTE DER DATENPUNKTE“, drücken Sie die Schaltfläche „Scan starten ...“ und bestätigen Sie mit „OK“. **Bitte haben Sie etwas Geduld** – dies kann **bis zu 5 Minuten** dauern. Sie können den Fortschritt in einem zweiten Browser-Tab verfolgen, indem Sie sich die Protokollierungsinformationen des Adapters ansehen.

Dieser Schritt ist nicht obligatorisch, wird aber dringend empfohlen. Wenn Sie auf Datenpunkte schreiben möchten, müssen Sie zunächst einen Datenpunktscan durchführen.

* Wenn der Datenpunktscan erfolgreich abgeschlossen wurde, sind die Datenpunkte im Objektbaum für jedes Gerät verfügbar. Sie können die Datenpunkte in der Konfiguration anzeigen, indem Sie ein Gerät auswählen und auf die Schaltfläche „Liste der Datenpunkte aktualisieren“ klicken. Drücken Sie das Filtersymbol und geben Sie ein Suchmuster ein, um nach Name und/oder Codec zu filtern. Dies dient nur Ihrer Information. Bitte deaktivieren Sie die Filterung, bevor Sie ein anderes Gerät auswählen, um Fehlermeldungen zu vermeiden.
* Der letzte Schritt besteht darin, Zeitpläne für die Datenerfassung auf der Registerkarte „ZUWEISUNGEN ZUM EXTERNEN CAN-ADAPTER“ zu konfigurieren.
* Für **Energiezähler E380** (falls in Ihrem Setup verfügbar) können Sie einfach aktivieren oder nicht. Bitte beachten Sie den Wert „Min. Aktualisierungszeit (s)“. Aktualisierungen einzelner Datenpunkte erfolgen nicht schneller als der angegebene Wert (Standard ist 5 Sekunden). Bei Auswahl von Null werden alle empfangenen Daten gespeichert. Da E380 Daten sehr schnell sendet (mehr als 20 Werte pro Sekunde), wird empfohlen, hier keine Null zu verwenden. Dies würde eine hohe Belastung für das ioBroker-System bedeuten.
* Wenn Sie E3-Geräte über CAN-Bus angeschlossen haben, z.B. Mit Vitocal und VX3 können Sie durch Abhören die zwischen diesen Geräten ausgetauschten Daten in Echtzeit erfassen. Drücken Sie „+“, um eine Zeile hinzuzufügen, aktivieren Sie das Kontrollkästchen „aktiv“, wählen Sie ein Gerät aus und bearbeiten Sie „Min. Aktualisierungszeit (s)“. Es ist durchaus möglich, hier 0-Werte zu verwenden, ich empfehle jedoch, bei den 5-Werten zu bleiben.
* Schließlich können Sie Zeitpläne für die Datenanforderung über das UDSonCAN-Protokoll hinzufügen. Drücken Sie erneut die Taste „+“ und bearbeiten Sie die Einstellungen. Möglicherweise haben Sie auf jedem Gerät mehrere Zeitpläne. Dadurch können Sie einige Datenpunkte häufiger anfordern als andere. Der Standardwert 0 für „Schedule(s)“ bedeutet, dass diese Datenpunkte beim Start der Instanz nur einmal angefordert werden.

Sie können die Datenpunktinformationen auf der Registerkarte „LISTE DER DATENPUNKTE“ als Referenz verwenden (das Öffnen der zweiten Registerkarte könnte hilfreich sein).

* Wenn Sie einen CAN-Adapter konfiguriert haben, der an den **internen CAN-Bus** angeschlossen ist, ist ein Reiter „ZUWEISUNGEN ZUM INTERNEN CAN-ADAPTER“ sichtbar. Bitte konfigurieren Sie dort die Geräte zur Abholung. UDSonCAN wird auf dem internen CAN-Bus von E3-Geräten nicht unterstützt.
* Das ist es. Klicken Sie auf die Schaltfläche „SPEICHERN & SCHLIESSEN“ und überprüfen Sie die im Objektbaum gesammelten Daten.

# E380-Daten und -Einheiten
| ID | Daten| Einheit |
| ------|:--- |------|
| 0x250 | Wirkleistung L1, L2, L3, Gesamt | W |
| 0x252 | Blindleistung L1, L2, L3, Gesamt | VA |
| 0x254 | Strom, L1, L2, L3, cosPhi | A, - |
| 0x256 | Spannung, L1, L2, L3, Frequenz | V, Hz |
| 0x258 | Kumulierter Import, Export | kWh |
| 0x25A | Gesamtwirkleistung, Gesamtblindleistung | W, VA |
| 0x25C | Kumulierter Import | kWh |

# Hinweise und Einschränkungen
## Dieser ioBroker-Adapter befindet sich in der Entwicklung und im *Beta-Stadium*
* Datenstruktur und Funktionalität können sich in zukünftigen Versionen ändern.
* Gerne können Sie den Adapter in Ihrer Umgebung testen. Bitte geben Sie mir Feedback zu Ihren Erfahrungen und Erkenntnissen.

## Warum Datenerfassung (nur Zuhören) und UDSonCAN (ReadByDid) parallel verwenden?
* Wenn Sie E3-Geräte angeschlossen haben, können Sie von den ausgetauschten Daten profitieren. Durch einfaches Zuhören erhalten Sie direkt bei der Änderung verfügbare Daten in Echtzeit. So können Sie sich schnell ändernde Daten (z. B. Energieflusswerte) und sich langsam ändernde Daten (z. B. Temperaturen) direkt bei jeder Änderung erhalten. Sie sind jederzeit über diese Werte auf dem Laufenden.
* Weitere Daten, die nicht oder nur selten über die Sammlung verfügbar sind, können Sie über UDSonCAN ReadByDid hinzufügen. Normalerweise ist dies für Sollwertdaten der beste Ansatz.
* Daher ist aus meiner Sicht die Kombination beider Methoden der beste Ansatz.

## Einschränkung der Datenerfassung
* Derzeit ist das Kommunikationsprotokoll nur für Vitocal (Lister auf CAN-ID 0x693), Vitocharge VX3 und Vitoair (beide Listener auf CAN-ID 0x451) bekannt.

## Was ist der Unterschied zum open3e-Projekt?
* Der Hauptunterschied ist natürlich die direkte Integration in ioBroker. Die Konfiguration kann über Dialoge erfolgen, die Daten werden direkt in Objektbäumen aufgelistet.
* Zusätzlich zu open3e wird die Echtzeiterfassung von Daten durch Abhören unterstützt.
* Das Schreiben von Daten ist viel einfacher. Ändern Sie einfach die Daten im entsprechenden Status und klicken Sie auf die Schaltfläche „Speichern“.

## Darf open3e parallel genutzt werden?
Ja, das ist unter bestimmten Voraussetzungen möglich:

* Wenn Sie hier nur die Datenerfassung nutzen, können Sie open3e ohne Einschränkungen nutzen.
* Wenn Sie hier UDSonCAN verwenden, ist es wichtig, dies nicht für dieselben Geräte zu tun wie open3e. Wenn Sie dies tun würden, würden sporadische Kommunikationsfehler auftreten.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of datapoints during startup
* (MyHomeMyData) Update of list of datapoints to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of datapoints and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed datapoints to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in datapoint ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added datapoints to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2024 MyHomeMyData <juergen.bonfert@gmail.com>

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