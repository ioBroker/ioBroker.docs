---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: t0hprmXWqAcvpKhDsvzKKIKMcgqXnZXQeneXlp5Q6Y0=
---
![Logo](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/e3oncan-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/e3oncan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Tests:** ![Testen und Freigeben](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## E3oncan-Adapter für ioBroker
# Basiskonzept
Geräte der Viessmann E3-Serie (One Base) tauschen viele Daten über den CAN-Bus aus.

Dieser Adapter kann diese Kommunikation abhören und viele nützliche Informationen extrahieren. Energiezähler E380CA und E3100CB werden ebenfalls unterstützt.

Parallel dazu wird das **Lesen von Datenpunkten** (ReadByDid) unterstützt. Informationen, die beim Mithören nicht verfügbar sind, können aktiv abgefragt werden. Das UDSonCAN-Protokoll wird auch von anderen Geräten verwendet, z.B. von bekannten WAGO-Gateways.

Das **Schreiben von Datenpunkten** über UDSonCAN (WriteByDid) wird ebenfalls unterstützt. Durch das Schreiben auf Datenpunkte ist es möglich, Sollwerte, Zeitpläne usw. zu ändern. Es ist sogar möglich, neue Zeitpläne hinzuzufügen, z. B. für die Brauchwasserzirkulationspumpe.

Das Schreiben der Daten wird durch das Speichern des entsprechenden Status mit `Acknowledged` nicht aktiviert (ack=false) ausgelöst - ja, so einfach ist das! Der Datenpunkt wird 2,5 Sekunden nach dem Schreiben erneut vom Gerät gelesen und im Status gespeichert. Wenn der Status nicht bestätigt wird, sehen Sie bitte in den Protokollen nach.

Das Schreiben ist mithilfe einer **Whitelist** auf eine Reihe von Datenpunkten beschränkt. Die Liste wird im Infobereich jedes Geräts gespeichert, z. B. unter `e3oncan.0.vitocal.info.udsDidsWritable`. Sie können weitere Datenpunkte hinzufügen, indem Sie diesen Status bearbeiten. Achten Sie darauf, beim Speichern des Status `Acknowledged` **nicht** zu aktivieren.

Beim ersten Start der Adapterinstanz wird ein Gerätescan durchgeführt, der eine Liste aller verfügbaren Geräte für den Konfigurationsdialog bereitstellt.

Bei der ersten Einrichtung sollte ein Scan nach Datenpunkten jedes Geräts durchgeführt werden.

Wichtige Teile dieses Adapters basieren auf dem Projekt [offen3e](https://github.com/open3e).

Eine Python-basierte Implementierung eines reinen Listening-Ansatzes mit MQTT-Messaging ist ebenfalls verfügbar, siehe [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Erste Schritte
**Voraussetzungen:**

* Sie haben einen (USB-zu-) CAN-Bus-Adapter, der an den externen CAN-Bus eines Viessmann E3-Geräts angeschlossen ist
* Derzeit werden nur Linux-basierte Systeme unterstützt.
* Der CAN-Adapter ist aktiv und im System sichtbar, z. B. als „can0“ (zur Überprüfung mit ifconfig verwenden).
* Weitere Einzelheiten finden Sie im open3e-Projekt
* **Stellen Sie sicher, dass während der Ersteinrichtung kein anderer UDSonCAN-Client (z. B. Open3Eclient.py) ausgeführt wird!** Dies könnte zu Kommunikationsfehlern in beiden Anwendungen führen.

Alle von diesem Adapter bereitgestellten Dienste basieren auf der Geräteliste Ihres spezifischen Viessmann E3-Setups. Daher müssen Sie bei der ersten Einrichtung die folgenden Schritte ausführen:

**Aufbau**

* Nach Abschluss der Installation des Adapters wird ein Konfigurationsdialog angezeigt, in dem Sie bis zu zwei CAN-Bus-Adapter konfigurieren können (Registerkarte „CAN-ADAPTER“).
* Bearbeiten Sie den Namen des Adapters und aktivieren Sie das Kontrollkästchen "Mit Adapter verbinden" zumindest für den externen Adapter
* Wenn Sie fertig sind, drücken Sie die Schaltfläche „SPEICHERN“, um die Änderungen anzuwenden. Dieser Schritt ist **obligatorisch**. Die Instanz wird neu gestartet und stellt eine Verbindung zum CAN-Adapter her.
* Gehen Sie zur Registerkarte „LISTE DER UDS-GERÄTE“ und führen Sie einen Scan nach auf dem Bus verfügbaren Geräten durch, indem Sie die Scan-Schaltfläche drücken. **Dies dauert einige Sekunden.** Sie können die Aktivitäten in einer zweiten Browser-Registerkarte verfolgen, indem Sie sich die Protokollinformationen des Adapters ansehen.
* Sie können die Benennung der Geräte in der 2. Spalte ändern. Diese Namen werden verwendet, um alle erfassten Daten im Objektbaum von ioBoker zu speichern. Drücken Sie erneut die Schaltfläche „SPEICHERN“, wenn Sie Ihre Änderungen vorgenommen haben.
* Die Instanz wird neu gestartet und nach einigen Sekunden können Sie einen Scan nach verfügbaren Datenpunkten durchführen. Gehen Sie zur Registerkarte „LISTE DER DATENPUNKTE“, klicken Sie auf „Scan starten ...“ und bestätigen Sie mit „OK“. **Bitte haben Sie Geduld** – dies kann **bis zu 5 Minuten** dauern. Sie können den Fortschritt in einem zweiten Browser-Tab verfolgen, indem Sie sich die Protokollinformationen des Adapters ansehen.

Dieser Schritt ist nicht zwingend erforderlich, wird aber dringend empfohlen. Wenn Sie Datenpunkte beschreiben möchten, müssen Sie zuerst einen Datenpunktscan durchführen.

* Nach erfolgreichem Datenpunktscan stehen die Datenpunkte im Objektbaum des jeweiligen Gerätes zur Verfügung. Sie können die Datenpunkte in der Konfiguration einsehen, indem Sie ein Gerät auswählen und auf „Liste der Datenpunkte aktualisieren“ klicken. Klicken Sie auf das Filtersymbol und geben Sie ein Suchmuster ein, um nach Name und/oder Codec zu filtern. Dies dient nur zu Ihrer Information. Bitte deaktivieren Sie die Filterung, bevor Sie ein anderes Gerät auswählen, um Fehlermeldungen zu vermeiden.
* Der letzte Schritt besteht darin, Zeitpläne für die Datenerfassung auf der Registerkarte „ZUWEISUNGEN ZU EXTERNEN CAN-ADAPTERN“ zu konfigurieren.
* Bei **Energiezählern** (sofern in Ihrem Setup vorhanden) können Sie diese Option nur aktivieren oder deaktivieren. Beachten Sie dabei den Wert „Min. Aktualisierungszeit (s)“. Aktualisierungen einzelner Datenpunkte werden nicht schneller als der angegebene Wert durchgeführt (Standard ist 5 Sekunden). Bei Auswahl von Null werden alle empfangenen Daten gespeichert. Da Energiezähler Daten sehr schnell senden (mehr als 20 Werte pro Sekunde), wird empfohlen, hier nicht Null zu verwenden. Dies würde das ioBroker-System stark belasten.
* Wenn Sie E3-Geräte über den CAN-Bus angeschlossen haben, z. B. Vitocal und VX3, können Sie die zwischen diesen Geräten ausgetauschten Daten in Echtzeit mithören. Drücken Sie „+“, um eine Zeile hinzuzufügen, aktivieren Sie das Kontrollkästchen „aktiv“, wählen Sie ein Gerät aus und bearbeiten Sie „Min. Aktualisierungszeit (s)“. Es ist möglich, hier 0 Sekunden zu verwenden, ich empfehle jedoch, bei 5 Sekunden zu bleiben.
* Schließlich können Sie Zeitpläne für die Datenanforderung über das UDSonCAN-Protokoll hinzufügen. Drücken Sie erneut die Schaltfläche „+“ und bearbeiten Sie die Einstellungen. Sie können auf jedem Gerät mehrere Zeitpläne haben. Auf diese Weise können Sie einige Datenpunkte häufiger anfordern als andere. Der Standardwert 0 für „Zeitplan(e)“ bedeutet, dass diese Datenpunkte beim Start der Instanz nur einmal angefordert werden.

Sie können die Datenpunktinformationen auf der Registerkarte „LISTE DER DATENPUNKTE“ als Referenz verwenden (das Öffnen der zweiten Registerkarte könnte hilfreich sein).

* Wenn Sie einen CAN-Adapter konfiguriert haben, der an den **internen CAN-Bus** angeschlossen ist, wird eine Registerkarte „ZUWEISUNGEN ZUM INTERNEN CAN-ADAPTER“ angezeigt. Bitte konfigurieren Sie dort die zu erfassenden Geräte. UDSonCAN wird von E3-Geräten auf dem internen CAN-Bus nicht unterstützt.
* Das ist alles. Klicken Sie auf die Schaltfläche „SPEICHERN & SCHLIESSEN“ und überprüfen Sie die im Objektbaum gesammelten Daten.

# E380 Daten und Einheiten
Es werden bis zu zwei E380-Energiezähler unterstützt. Die IDs der Datenpunkte hängen von der CAN-Adresse des Geräts ab:

CAN-Adresse=97: Datenpunkte mit geraden IDs

CAN-Adresse=98: Datenpunkte mit ungeraden IDs

| ID | Daten| Einheit |
| ------|:--- |------|
| 592,593 | Wirkleistung L1, L2, L3, Gesamt | W |
| 594,595 | Blindleistung L1, L2, L3, Gesamt | var |
| 596,597 | Absoluter Strom, L1, L2, L3, cosPhi | A, - |
| 598,599 | Spannung, L1, L2, L3, Frequenz | V, Hz |
| 600.601 | Kumulierter Import, Export | kWh |
| 602,603 | Gesamtwirkleistung, Gesamtblindleistung | W, var |
| 604.605 | Kumulierter Import | kWh |

# E3100CB Daten und Einheiten
| ID | Daten| Einheit |
| ------|:--- |------|
| 1385_01 | Kumulierter Import | kWh |
| 1385_02 | Kumulierter Export | kWh |
| 1385_03 | Zustand: -1 => Einspeisung \| +1 => Lieferung | |
| 1385_04 | Wirkleistung gesamt | W |
| 1385_08 | Wirkleistung L1 | W |
| 1385_12 | Wirkleistung L2 | W |
| 1385_16 | Wirkleistung L3 | W |
| 1385_05 | Blindleistung gesamt | var |
| 1385_09 | Blindleistung L1 | var |
| 1385_13 | Blindleistung L2 | var |
| 1385_17 | Blindleistung L3 | var |
| 1385_06 | Aktuell, Absolut L1 | A |
| 1385_10 | Aktuell, Absolut L2 | A |
| 1385_14 | Aktuell, Absolut L3 | A |
| 1385_07 | Spannung, L1 | V |
| 1385_11 | Spannung, L2 | V |
| 1385_15 | Spannung, L3 | V |

# Hinweise und Einschränkungen
## Dieser ioBroker-Adapter befindet sich in der Entwicklung und im *Beta-Stadium*
* Datenstruktur und Funktionalität können sich in zukünftigen Versionen ändern.
* Gerne können Sie den Adapter in Ihrer Umgebung testen. Bitte geben Sie mir Feedback zu Ihren Erfahrungen und Erkenntnissen.

## Warum Datenerfassung (nur Abhören) und UDSonCAN (ReadByDid) parallel verwenden?
* Wenn Sie E3-Geräte angeschlossen haben, können Sie von den ausgetauschten Daten profitieren. Durch bloßes Zuhören erhalten Sie verfügbare Daten in Echtzeit direkt bei der Änderung. So können Sie schnell wechselnde Daten (z. B. Energieflusswerte) und langsam wechselnde Daten (z. B. Temperaturen) direkt bei jeder Änderung erhalten. Sie sind über diese Werte immer auf dem Laufenden.
* Andere Daten, die nicht oder nur selten über die Sammlung verfügbar sind, können Sie über UDSonCAN ReadByDid hinzufügen. Normalerweise ist dies für Sollwertdaten der beste Ansatz.
* Daher ist aus meiner Sicht die Kombination beider Methoden der beste Ansatz.

## Einschränkung der Datenerfassung
* Derzeit ist das Kommunikationsprotokoll nur für Vitocal (Listener auf CAN-ID 0x693), Vitocharge VX3 und Vitoair (beide Listener auf CAN-ID 0x451) bekannt.

## Was ist anders am open3e-Projekt?
* Der Hauptunterschied liegt natürlich in der direkten Integration in ioBroker. Die Konfiguration kann über Dialoge erfolgen, Daten werden direkt in Objektbäumen aufgelistet.
* Zusätzlich zu open3e wird das Echtzeit-Erfassen von Daten durch Abhören unterstützt.
* Das Schreiben von Daten ist viel einfacher. Ändern Sie einfach die Daten im entsprechenden Status und drücken Sie die Schaltfläche Speichern.

## Darf open3e parallel verwendet werden?
Ja, das ist unter bestimmten Voraussetzungen möglich:

* Wenn Sie hier nur die Datenerfassung nutzen, können Sie open3e ohne Einschränkungen nutzen.
* Wenn Sie hier UDSonCAN verwenden, ist es wichtig, dies nicht für dieselben Geräte zu tun wie open3e. Andernfalls treten sporadisch Kommunikationsfehler auf.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
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