---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: ly78//DTy60i1/39twovzSQq4xN3Sq0/9E0dP0KP8xY=
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
# Grundkonzept
Die Geräte der Viessmann E3-Serie (One Base) tauschen viele Daten über den CAN-Bus aus.

Dieser Adapter kann diese Kommunikation abhören und zahlreiche nützliche Informationen extrahieren. Die Energiezähler E380CA und E3100CB werden ebenfalls unterstützt. Dieser Betriebsmodus wird als **Collect** bezeichnet.

Paralleles Lesen und Schreiben von Datenpunkten wird unterstützt. Informationen, die nicht über die Datenerfassung verfügbar sind, können aktiv angefordert werden. Durch das Schreiben von Datenpunkten lassen sich Sollwerte, Zeitpläne usw. ändern. Es ist sogar möglich, neue Zeitpläne hinzuzufügen, z. B. für die Warmwasserzirkulationspumpe. Dieser Betriebsmodus wird als UDSonCAN bezeichnet. Das UDSonCAN-Protokoll (Universal Diagnostic Services basierend auf dem CAN-Bus) wird auch von anderen Geräten verwendet, z. B. vom bekannten WAGO-Gateway.

Das Schreiben von Daten wird ausgelöst, indem der entsprechende Zustand mit nicht geprüftem `Acknowledged` (ack=false) gespeichert wird – so einfach ist das! Der Datenpunkt wird 2,5 Sekunden nach dem Schreiben erneut vom Gerät gelesen und im Zustand gespeichert. Falls der Zustand nicht bestätigt wird, überprüfen Sie bitte die Protokolle.

Das Schreiben ist auf eine bestimmte Menge von Datenpunkten mithilfe einer **Whitelist** beschränkt. Die Liste ist im Infobereich jedes Geräts gespeichert, z. B. unter `e3oncan.0.vitocal.info.udsDidsWritable`. Sie können weitere Datenpunkte hinzufügen, indem Sie diesen Status bearbeiten. Achten Sie darauf, `Acknowledged` beim Speichern des Status **nicht** auszuwählen.
Einige Datenpunkte können nicht geändert werden, selbst wenn sie auf der Whitelist stehen. Das Gerät gibt dann einen Fehlercode zurück. In diesem Fall wiederholt der Adapter den Schreibvorgang mit einem anderen Dienst. Dies funktioniert nur auf dem internen CAN-Bus. Allerdings kann auch dieser Ansatz fehlschlagen. Generell sollten Schreibvorgänge immer überprüft werden.

Beim ersten Start der Adapterinstanz wird ein Gerätescan durchgeführt, der eine Liste aller verfügbaren E3-Geräte für den Konfigurationsdialog bereitstellt (Energiezähler werden nicht aufgeführt).
Während der Ersteinrichtung sollte ein Scan der Datenpunkte jedes E3-Geräts durchgeführt werden; Details dazu finden Sie weiter unten.

Welche Betriebsmodi (Collect und/oder UDSonCAN) verwendet werden können, hängt von Ihrer **Gerätetopologie** ab. Weitere Informationen finden Sie unter [Hier](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34).

Mögliche **Anwendungsfälle** finden Sie in diesem [Diskussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) (in Bearbeitung).

Wichtige Teile dieses Adapters basieren auf dem Projekt [open3e](https://github.com/open3e).

Eine Python-basierte Implementierung eines reinen Listening-Ansatzes (nur Collect) unter Verwendung von MQTT-Messaging ist ebenfalls verfügbar, siehe [E3onCAN](https://github.com/MyHomeMyData/E3onCAN).

# Erste Schritte
**Voraussetzungen:**

* Sie haben einen (USB-zu-)CAN-Bus-Adapter an den externen oder internen CAN-Bus des Viessmann E3-Geräts angeschlossen.
* Derzeit werden nur Linux-basierte Systeme unterstützt.
* Der CAN-Adapter ist aktiv und im System sichtbar, z. B. als "can0" (überprüfen Sie dies mit ifconfig).
Weitere Details finden Sie im [open3e-Projekt](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry).
* **Stellen Sie sicher, dass während der Ersteinrichtung kein anderer UDSonCAN-Client (z. B. open3e) ausgeführt wird!** Dies könnte zu Kommunikationsfehlern in beiden Anwendungen führen.

Alle von diesem Adapter bereitgestellten Dienste basieren auf der Geräteliste Ihrer spezifischen Viessmann E3-Konfiguration. Daher müssen Sie für die Ersteinrichtung die folgenden Schritte befolgen:

**Konfiguration**

* Nach Abschluss der Adapterinstallation wird ein Konfigurationsdialog angezeigt, in dem bis zu zwei CAN-Bus-Adapter konfiguriert werden können (Registerkarte „CAN-Adapter“).
* Bearbeiten Sie den Namen des CAN-Adapters und aktivieren Sie das Kontrollkästchen „Mit Adapter verbinden“ für mindestens einen CAN-Adapter.
Wenn Sie fertig sind, drücken Sie auf „SPEICHERN“, um die Änderungen zu übernehmen. Dieser Schritt ist **obligatorisch**. Die Instanz wird neu gestartet und verbindet sich mit dem CAN-Adapter.
* Wechseln Sie zum Tab „LISTE DER UDS-GERÄTE“ und suchen Sie nach verfügbaren Geräten im Bus, indem Sie auf die Schaltfläche „Scannen“ klicken. **Dies dauert einige Sekunden.** Sie können die Aktivitäten in einem zweiten Browser-Tab in den Protokollinformationen des Adapters verfolgen.
Sie können die Benennung der Geräte in der zweiten Spalte ändern. Diese Namen werden verwendet, um alle erfassten Daten im Objektbaum von ioBoker zu speichern. Klicken Sie nach Ihren Änderungen erneut auf „Speichern“.
Die Instanz wird neu gestartet und nach wenigen Sekunden können Sie nach verfügbaren Datenpunkten suchen. Wechseln Sie zum Tab „DATENPUNKTE LISTE“, klicken Sie auf „Scan starten…“ und bestätigen Sie mit „OK“. **Bitte haben Sie etwas Geduld** – dies kann **bis zu 5 Minuten** dauern. Sie können den Fortschritt in einem zweiten Browser-Tab anhand der Protokollinformationen des Adapters verfolgen.

Dieser Schritt ist nicht zwingend erforderlich, wird aber dringend empfohlen. Wenn Sie Datenpunkte beschreiben möchten, müssen Sie zuerst einen Datenpunktscan durchführen.

Nach erfolgreichem Scan der Datenpunkte sind diese in der Objektstruktur für jedes Gerät verfügbar. Sie können die Datenpunkte in der Konfiguration anzeigen, indem Sie ein Gerät auswählen und auf „Datenpunktliste aktualisieren“ klicken. Klicken Sie auf das Filtersymbol und geben Sie ein Suchmuster ein, um nach Name und/oder Codec zu filtern. Diese Informationen dienen nur Ihrer Information. Deaktivieren Sie die Filterung, bevor Sie ein anderes Gerät auswählen, um Fehlermeldungen zu vermeiden.
* Der letzte Schritt besteht darin, Zeitpläne für die Datenanforderung auf der Registerkarte "ZUWEISUNGEN AN UDS CAN ADAPTER" zu konfigurieren.
* Für **Energiezähler** (sofern in Ihrer Konfiguration verfügbar) können Sie diese Option aktivieren oder deaktivieren. Beachten Sie den Wert „Min. Aktualisierungszeit (s)“. Aktualisierungen einzelner Datenpunkte erfolgen nicht schneller als mit dem angegebenen Wert (Standardwert: 5 Sekunden). Bei Auswahl von Null werden alle empfangenen Daten gespeichert. Da Energiezähler Daten sehr schnell senden (mehr als 20 Werte pro Sekunde), wird empfohlen, hier nicht Null zu verwenden. Dies würde das ioBroker-System stark belasten.
Wenn Sie E3-Geräte über den CAN-Bus verbunden haben, z. B. Vitocal und VX3, können Sie die zwischen diesen Geräten ausgetauschten Daten in Echtzeit erfassen. Drücken Sie „+“, um eine Zeile hinzuzufügen, aktivieren Sie das Kontrollkästchen „Aktiv“, wählen Sie ein Gerät aus und bearbeiten Sie die „Mindestaktualisierungszeit (s)“. Die Verwendung von 0 Sekunden ist zwar möglich, ich empfehle jedoch, 5 Sekunden beizubehalten.
* Abschließend können Sie Zeitpläne für die Datenabfrage über das UDSonCAN-Protokoll hinzufügen. Drücken Sie erneut die Schaltfläche „+“ und bearbeiten Sie die Einstellungen. Sie können mehrere Zeitpläne pro Gerät erstellen. Dadurch können Sie bestimmte Datenpunkte häufiger als andere abfragen. Der Standardwert 0 für „Zeitplan(e)“ bedeutet, dass diese Datenpunkte nur einmal beim Start der Instanz angefordert werden.

Sie können die Datenpunktinformationen auf der Registerkarte "LISTE DER DATENPUNKTE" als Referenz verwenden (das Öffnen auf der zweiten Registerkarte könnte hilfreich sein).

* Wenn Sie einen CAN-Adapter an den **zweiten CAN-Bus** angeschlossen haben, wird die Registerkarte „Zuordnungen zum zweiten CAN-Adapter“ angezeigt. Bitte konfigurieren Sie dort die zu erfassenden Geräte.
Das war's. Klicken Sie auf die Schaltfläche „SPEICHERN & SCHLIESSEN“ und überprüfen Sie die im Objektbaum gesammelten Daten.

# Warnung: Nach dem Upgrade von Node.js funktioniert der Adapter wahrscheinlich nicht mehr.
**Der Adapter verwendet sogenannte native Module, die bei einer Änderung der Node.js-Version neu kompiliert werden müssen.** Daher wird der Adapter nach einem Node.js-Upgrade höchstwahrscheinlich beim nächsten Start nicht mehr funktionieren. In diesem Fall stoppen Sie bitte den Adapter, geben Sie in der Kommandozeile ``iob rebuild`` ein und starten Sie den Adapter anschließend neu. Dies sollte das Problem beheben. Falls das Problem weiterhin besteht, melden Sie es bitte.

# E380 Daten und Einheiten
Es werden bis zu zwei E380-Energiezähler unterstützt. Die IDs der Datenpunkte hängen von der CAN-Adresse des Geräts ab.

CAN-Adresse=97: Datenpunkte mit geraden IDs

CAN-Adresse=98: Datenpunkte mit ungeraden IDs

| ID | Daten | Einheit |
| ------|:--- |------|
| 592,593 | Wirkleistung L1, L2, L3, Gesamt | W |
| 594,595 | Blindleistung L1, L2, L3, Gesamt | var |
| 596,597 | Absolutstrom, L1, L2, L3, cosPhi | A, - |
| 598,599 | Spannung, L1, L2, L3, Frequenz | V, Hz |
| 600.601 | Kumulierte Importe, Exporte | kWh |
| 602,603 | Gesamtwirkleistung, Gesamtblindleistung | W, var |
| 604.605 | Kumulierte Importe | kWh |

# E3100CB Daten und Einheiten
| ID | Daten | Einheit |
| ------|:--- |------|
| 1385_01 | Kumulierter Import | kWh |
| 1385_02 | Kumulierte Exporte | kWh |
| 1385_03 | Status: -1 => Zufuhr | +1 => Versorgung | |
| 1385_04 | Gesamtleistung (Wirkleistung) | W |
| 1385_08 | Wirkleistung L1 | W |
| 1385_12 | Wirkleistung L2 | W |
| 1385_16 | Wirkleistung L3 | W |
| 1385_05 | Blindleistung gesamt | var |
| 1385_09 | Blindleistung L1 | var |
| 1385_13 | Blindleistung L2 | var |
| 1385_17 | Blindleistung L3 | var |
| 1385_06 | Stromstärke, absolut L1 | A |
| 1385_10 | Stromstärke, absolut L2 | A |
| 1385_14 | Stromstärke, absolut L3 | A |
| 1385_07 | Spannung, L1 | V |
| 1385_11 | Spannung, L2 | V |
| 1385_15 | Spannung, L3 | V |

# Hinweise und Einschränkungen
## Warum werden Datenerfassung (Modus Collect) und UDSonCAN parallel verwendet?
Sobald Sie E3-Geräte angeschlossen haben, profitieren Sie von den ausgetauschten Daten ([weitere Details](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)). Durch einfaches Zuhören erhalten Sie verfügbare Daten in Echtzeit, sobald sich diese ändern. So erhalten Sie sowohl schnell (z. B. Energieflusswerte) als auch langsam (z. B. Temperaturen) veränderliche Daten direkt bei jeder Änderung. Ihre Werte sind somit stets aktuell.
* Weitere Daten, die nicht oder nur selten über die Datenerfassung verfügbar sind, können Sie über UDSonCAN ReadByDid hinzufügen. Dies ist in der Regel die beste Vorgehensweise für Sollwertdaten.
Aus meiner Sicht ist daher die Kombination beider Methoden der beste Ansatz.

## Einschränkung der Datenerhebung
* Derzeit ist das Kommunikationsprotokoll nur für Vitocal (Listener auf CAN-ID 0x693 auf internem CAN), Vitocharge VX3 und Vitoair (beide Listener auf CAN-ID 0x451 auf externem und internem CAN) bekannt.

## Begrenzung des Scanbereichs für Datenpunkte
* Der numerische Bereich für die Datenpunktsuche ist auf den Minimal- und Maximalwert der gemeinsamen Datenpunktliste beschränkt, z. B. 256 bis 3338 (Version 0.10.14).
Sie können mithilfe des Befehls „ReadByDid“ nach Datenpunkten außerhalb dieses Bereichs für ein bestimmtes Gerät suchen: Bearbeiten Sie `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` und fügen Sie Ihre Liste der gewünschten Datenpunkte hinzu, z. B. `[3350,3351,3352,3353]`. Ist ein angeforderter Datenpunkt verfügbar, wird der Wert in der Objektstruktur angezeigt. Sie können diese Datenpunkte auch in Leseplänen der Gerätekonfiguration verwenden. Ist ein angeforderter Datenpunkt **nicht** verfügbar, erscheint eine Fehlermeldung („Negative Antwort“) im iobroker-Protokoll.

## Was ist der Unterschied zum open3e-Projekt?
Der Hauptunterschied liegt offensichtlich in der direkten Integration in ioBroker. Die Konfiguration erfolgt über Dialoge, die Daten werden direkt in Objektstrukturen aufgelistet.
* Zusätzlich zur Echtzeit-Datenerfassung durch open3e wird auch das Abhören unterstützt.
* Das Schreiben von Daten ist viel einfacher. Ändern Sie einfach die Daten im entsprechenden Zustand und drücken Sie die Schaltfläche „Speichern“.
* Der Datenaustausch über MQTT ist nicht zwingend erforderlich. Er ist jedoch selbstverständlich durch die Konfiguration von Datenzuständen möglich.
Die Kodierung von 64-Bit-Ganzzahlen (zum Schreiben von Daten) ist auf Werte < 2^52 (4.503.599.627.370.496) beschränkt. Die Dekodierung (zum Lesen von Daten) funktioniert im gesamten 64-Bit-Bereich korrekt.

## Kann open3e parallel verwendet werden?
Ja, das ist unter bestimmten Bedingungen möglich:

* Wenn Sie hier nur die Datenerfassung nutzen, können Sie open3e ohne Einschränkungen verwenden.
* Wenn Sie hier UDSonCAN verwenden, ist es wichtig, dies nicht für dieselben Geräte wie open3e zu tun. Andernfalls treten sporadische Kommunikationsfehler auf.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### 0.10.13 (2025-09-30)
* (MyHomeMyData) Fix for issue #162

### 0.10.12 (2025-09-15)
* (MyHomeMyData) Migration to ESLint 9, refer to issues #141 and #152

### 0.10.11 (2025-09-06)
* (MyHomeMyData) Fix for issue #152 (repository checker) and #126 (node.js 24)
* (MyHomeMyData) Added hint to readme regarding user action after upgrading version of node.js
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250903

### 0.10.10 (2025-08-07)
* (MyHomeMyData) Fix for issue #142 (WriteByDid not working in case of specific UDS control frame)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250729
* (MyHomeMyData) Added codec for 64-bit integers. Remark: Encoding (for writing of data) is limited to values < 2^52 (4.503.599.627.370.496).

### 0.10.9 (2025-05-22)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250422
* (MyHomeMyData) Fixed version number of enum info
* (MyHomeMyData) Fix for issue #125 (findings of repository checker)

### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

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

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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