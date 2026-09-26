---
chapters: {"pages":{"en/adapterref/iobroker.hm-rpc/README.md":{"title":{"en":"ioBroker HomeMatic RPC Adapter"},"content":"en/adapterref/iobroker.hm-rpc/README.md"},"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hm-rpc/README.md
title: ioBroker HomeMatic RPC-Adapter
hash: qbx82r748fNIMD7JogRm5wOGF0bf3QP3TStxV/dPmpA=
---
![Logo](../../../en/adapterref/iobroker.hm-rpc/admin/homematic.png)

![Build-Status](https://github.com/ioBroker/ioBroker.hm-rpc/workflows/Test%20and%20Release/badge.svg)
![Anzahl der Installationen](http://iobroker.live/badges/hm-rpc-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hm-rpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hm-rpc.svg)
![NPM](https://nodei.co/npm/iobroker.hm-rpc.png?downloads=true)

# ioBroker HomeMatic RPC-Adapter

Dieser Adapter verbindet HomeMatic-Schnittstellenprozesse (BidCos-Dienste, Homegear und CUxD) mit ioBroker. Die Kommunikation erfolgt über XML-RPC oder BIN-RPC.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Er meldet außerdem neue Geräteschemata. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) , insbesondere im Kapitel [„Was ist Sentry.io?“](#what-is-sentryio) .

## Was ist Homematic?

> Homematic ist das Smart-Home-System von eQ-3. Es ermöglicht die umfassende Steuerung zahlreicher Funktionen in einem Haus oder einer Wohnung. Diese Funktionen lassen sich sowohl in einfachen als auch in komplexen Szenarien kombinieren.

> Das Produktsortiment umfasst Geräte zur Licht-, Rollladen- und Heizungssteuerung, Gefahrenmelder, Sicherheitssensoren und Wettermessgeräte. Dank Funkkommunikation lassen sich die Geräte problemlos in bestehende Gebäude integrieren. In Neubauten können kabelgebundene Buskomponenten zum Einsatz kommen.

Quelle: [Homepage des Herstellers eQ-3](https://www.eq-3.de/produkte/homematic.html)

## Homematic-Komponenten in ioBroker

Zur Verwaltung und Steuerung von Homematic-Komponenten mit ioBroker werden zwei Adapter benötigt:

### 1. Homematic ReGaHss

Dieser Adapter verbindet sich mit der Homematic-Logikschicht „ReGaHSS“ ( **Residential** **Gateway** ). Er synchronisiert die Gerätenamen, die Systemvariablen, die Räume, die Funktionen und die Programme zwischen Homematic und ioBroker.

### 2. Homematic RPC

RPC steht für **Remote** **Procedure** **Call** . Es handelt sich um eine Technik zur Kommunikation zwischen Prozessen. Dieser Adapter verbindet sich mit den Kommunikationsmodulen einer Homematic-Zentrale (CCU, CCU2, CCU3 und neuer). Folgende Module werden unterstützt:

- `rfd` für Funkgeräte
- `HMIP-rfd` für Homematic IP-Geräte
- `hs485d` für kabelgebundene Geräte
- `CUxD` für externe Komponenten wie EnOcean oder FS20 (CUxD ist eine zusätzliche Software für die CCU),
- `Homegear` als Ersatz für eine CCU.

Dieses Diagramm zeigt die Struktur und die Kommunikationsschnittstellen:

![Aufbau einer Homematic-Installation](../../../en/adapterref/iobroker.hm-rpc/img/homematic-structure.png)

Quelle: [wikimatic.de](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Funktionsweise des Adapters

Eine Instanz des Adapters ist für genau ein Kommunikationsmodul zuständig (`rfd`, `hs485d` usw.). Wenn Sie mehrere Module gleichzeitig verwenden möchten, müssen Sie für jedes Modul eine separate Instanz erstellen.

Der Adapter kommuniziert mit dem Modul entweder über BIN-RPC oder über XML-RPC. Die Kommunikation erfolgt über eine Ereignisschnittstelle, daher sind die korrekten Adressen wichtig. Die CCU sendet die Ereignisse automatisch an den Adapter; ein zyklisches Polling ist nicht erforderlich.

Darüber hinaus überprüft der Adapter in einem festgelegten Intervall die Verbindung zur CCU.

Wenn Sie neue Geräte an die CCU anlernen, müssen Sie die Option „Objekte (einmalig) synchronisieren“ aktivieren und den Adapter neu starten. Nur dann werden die Informationen über die neuen Homematic-Geräte an den Adapter übertragen.

## Konfiguration

### Haupteinstellungen

#### HomeMatic-Adresse

Die IP-Adresse der CCU oder des Hosts, auf dem der BidCos-Dienst ausgeführt wird.

#### HomeMatic-Port

Der Port hängt vom ausgewählten Kommunikationsmodul ab. Der Adapter wählt den Port automatisch aus, sobald Sie den Daemon auswählen. Ändern Sie den Port nur, wenn Ihre Ports von den Standardports abweichen.

Folgende Ports werden standardmäßig verwendet:

| Dämon            | Kommunikationsmodul            | Standardanschluss            | HTTPS-Port             |
| ---------------- | ------------------------------ | ---------------------------- | ---------------------- |
| HomeMatic IP     | HMIP-rfd                       | 2010                         | 42010                  |
| rfd              | rfd (Funkgeräte)               | 2001                         | 42001                  |
| Virtuelle Geräte | virtuelle Geräte               | 9292                         | 49292                  |
| hs485d           | hs485d (kabelgebundene Geräte) | 2000                         | 42000                  |
| CUxD             | CUxD                           | 8701                         | wird nicht unterstützt |
| Heimausrüstung   | Heimausrüstung                 | wie in Homegear konfiguriert | wird nicht unterstützt |

Die HTTPS-Ports funktionieren nur mit dem XML-RPC-Protokoll.

#### Adapteradresse

Die IP-Adresse des Hosts, auf dem der Adapter läuft. Die CCU verwendet diese Adresse, um sich mit dem Adapter zu verbinden; daher muss die CCU diese Adresse erreichen können. Die Einträge „0.0.0.0 Lauscht auf allen IPs“ und „127.0.0.1“ sind nur für Sonderfälle vorgesehen, da die CCU ioBroker unter diesen Adressen nicht erreichen kann.

#### Adapteranschluss

Der Port, an dem der Adapter auf die Verbindung der CCU wartet. Belassen Sie den Wert bei „0“, damit ioBroker automatisch einen freien Port auswählt. Ändern Sie diesen Wert nur in Ausnahmefällen.

#### Dämon

Eine CCU unterstützt verschiedene Gerätetypen (Funk, Kabel, Homematic IP, CUxD). Sie müssen für jeden Typ eine separate Instanz des Adapters erstellen.

#### Protokoll

Für die Kommunikation stehen zwei Protokolle zur Verfügung: XML-RPC und BIN-RPC. BIN-RPC ist schneller, wird aber von einigen Geräten nicht oder nur fehlerhaft unterstützt. Wählen Sie in diesem Fall das XML-RPC-Protokoll.

**Hinweis:** CUxD funktioniert nur mit BIN-RPC. Homematic IP und virtuelle Geräte funktionieren nur mit XML-RPC. Für diese Dienste verwendet der Adapter automatisch das richtige Protokoll.

#### Objekte (einmalig) synchronisieren

Beim ersten Start liest die Instanz _alle_ Geräte von der CCU. Wenn Sie die Konfiguration später ändern (Geräte umbenennen, hinzufügen oder entfernen), aktivieren Sie diese Option, um die Konfiguration in ioBroker erneut zu synchronisieren.

Die Instanz startet sofort neu, liest alle Geräte erneut aus und deaktiviert diese Option anschließend selbst.

### Zusätzliche Einstellungen

#### Adapter-Rückrufadresse

ioBroker läuft manchmal hinter einem Router. In diesem Fall unterscheiden sich die eingehende und die ausgehende Adresse. Geben Sie hier die IP-Adresse des Routers ein. Der Router leitet den Datenverkehr über die Portnummer an ioBroker weiter.

Wenn ioBroker in einem Docker-Container ausgeführt wird, geben Sie hier die IP-Adresse des Docker-Hosts ein. Sie müssen außerdem den Adapterport (siehe „Adapterport“) an den Container weiterleiten. Sie können hierfür einen beliebigen freien Port wählen, beispielsweise 12001 oder 12010.

#### Kommunikationsintervall prüfen (in Sekunden)

Der Adapter sendet in diesem Intervall einen Ping an die CCU.

#### Wiederverbindungsintervall (in Sekunden)

Der Adapter wartet diese Zeit ab, bevor er den nächsten Verbindungsversuch startet.

#### Geräte nicht löschen

Standardmäßig entfernt der Adapter ein Gerät aus der Objektstruktur, wenn er es beim Start des Adapters nicht auf der CCU findet oder wenn die CCU das Gerät während des Betriebs des Adapters als gelöscht meldet. Aktivieren Sie diese Option, um solche Geräte beizubehalten, beispielsweise wenn Sie ein Gerät nur vorübergehend von der CCU entfernt haben.

Diese Option behebt auch ein Problem auf der CCU-Seite: Homematic IP-Geräte werden manchmal nicht korrekt an ioBroker übertragen, und die CCU meldet sie beispielsweise während eines Firmware-Updates als gelöscht, obwohl sie noch vorhanden sind. Ohne diese Option werden ihre Objekte gelöscht und erst nach einem Neustart des Adapters neu erstellt. Daher ist die Option automatisch aktiviert, sobald Sie Homematic IP als Daemon auswählen.

Wenn diese Option aktiviert ist, werden die Objekte eines Geräts, das Sie manuell aus der CCU entfernt haben, im Objektbaum gelöscht.

#### Verwenden Sie https

Wenn diese Option aktiviert ist, verwendet der Adapter HTTPS anstelle von HTTP. Dies funktioniert nur mit dem XML-RPC-Protokoll.

#### Benutzername und Passwort

Wenn die Option „https verwenden“ aktiviert ist, geben Sie hier den Benutzernamen und das Passwort eines CCU-Benutzers ein. Geben Sie diese Anmeldeinformationen auch ein, wenn die API der CCU eine Authentifizierung erfordert; der Adapter sendet sie per XML-RPC mit und ohne HTTPS. BIN-RPC unterstützt keine Authentifizierung.

### Gerätemanager

Im Tab „Geräte-Manager“ werden alle Geräte dieser Instanz angezeigt. Sie können ein Gerät umbenennen, es direkt steuern sowie die installierte und die verfügbare Firmware-Version anzeigen.

## Instanzen

![Instanzen des Adapters](../../../en/adapterref/iobroker.hm-rpc/img/instances.png)

Die installierten Instanzen des Adapters werden im Bereich „ioBroker _-Instanzen_ “ aufgelistet. Der farbige Kreis auf der linken Seite zeigt an, ob die Instanz aktiviert und mit der CCU verbunden ist.

Wenn Sie den Mauszeiger über ein Symbol bewegen, erhalten Sie detaillierte Informationen.

## Objekte des Adapters

Der Bereich _„Objekte“_ zeigt alle Werte und Informationen an, die die CCU an den Adapter sendet. Die Werte werden in einer Baumstruktur dargestellt.

Welche Objekte und welche Werte angezeigt werden, hängt von den Geräten (Funktion und Kanälen) und der Struktur innerhalb der CCU ab.

Die zentrale Einheit verwendet die ID `BidCoS-RF` Alle virtuellen Schaltflächen werden unter dieser ID aufgelistet. Geräte werden anhand ihrer Seriennummer erstellt, und Gruppen erhalten den Namen. `INT000000x` Die

### Kanal 0 (alle Geräte)

Dieser Kanal wird für jedes Gerät erstellt. Er enthält folgende Funktionsdaten:

| Datenpunkt                                                  | Bedeutung                                                             |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| AES-Schlüssel                                               | Verschlüsselung aktiviert oder deaktiviert                            |
| Konfiguration (Ausstehend / Alarm ausstehend)               | Konfiguration ausstehend                                              |
| Tastverhältnis / Tastverhältnisalarm                        | Übertragungszeit der Homematic-Geräte                                 |
| RSSI (Gerät / Gegenstelle)                                  | Signalstärke zwischen dem Gerät und der Zentraleinheit                |
| Niedriger Batteriestand / Alarm bei niedrigem Batteriestand | Niedriger Akkustand                                                   |
| Unerreichbarkeitsalarm                                      | Systemmeldung über einen Kommunikationsfehler (Fehler trat zuvor auf) |
| Unerreichbarkeitsalarm                                      | Systemmeldung über einen Kommunikationsfehler (aktueller Status)      |

### Kanäle 1 bis 6

Diese Kanäle enthalten Messwerte, Steuerdaten und Statusdaten. Die angezeigten Daten hängen von der Funktion des Geräts ab. Die folgende Tabelle zeigt einige Beispiele:

| Funktion                | Kanal | Mögliche Werte                                                                      |
| ----------------------- | ----- | ----------------------------------------------------------------------------------- |
| Sensoren                | 1     | Temperatur, Luftfeuchtigkeit, Füllstand, geöffneter oder geschlossener Zustand usw. |
| Heizungsthermostate     | 4     | Betriebsart, Solltemperatur, Isttemperatur, Ventilstellung usw.                     |
| Aktuatoren              | 1     | Pegel (Rollladen, Dimmer), Bewegungsrichtung (Rollladen) usw.                       |
| Geräte mit Messfunktion | 3     | Status                                                                              |
|                         | 6     | Verbrauchszähler, Spannung, Leistung usw.                                           |

## Benutzerdefinierte Befehle

Sie können benutzerdefinierte Befehle an den Adapter senden, beispielsweise um den MASTER-Bereich eines Geräts auszulesen und zu steuern. Im MASTER-Bereich können Sie unter anderem die wöchentlichen Heizprogramme konfigurieren.

Senden Sie zu diesem Zweck eine Nachricht an den Adapter. Die Nachricht enthält die Methode als ersten Parameter, gefolgt von einem Objekt. Dieses Objekt muss Folgendes enthalten: `ID` des Zielgeräts. Optional enthält es die `paramType`, wodurch beispielsweise der MASTER-Bereich ausgewählt wird. Senden Sie zusätzliche Parameter in der `params` Objekt.

**Beispiele:**

Schreibe alle Werte des MASTER-Bereichs eines Geräts in das Protokoll:

```javascript
sendTo('hm-rpc.0', 'getParamset', {ID: 'OEQ1861203', paramType: 'MASTER'}, res => {
    log(JSON.stringify(res));
});
```

Einem Attribut des MASTER-Bereichs einen bestimmten Wert zuweisen:

```javascript
sendTo('hm-rpc.0', 'putParamset', {ID: 'OEQ1861203', paramType: 'MASTER', params: {'ENDTIME_FRIDAY_1': 700}}, res => {
    log(JSON.stringify(res));
});
```

Alle Geräte auflisten:

```javascript
sendTo('hm-rpc.0', 'listDevices', {}, res => {
    log(JSON.stringify(res));
});
```

Legen Sie einen Wert fest, so wie es der Adapter tut. `stateChange`:

```javascript
sendTo('hm-rpc.1', 'setValue', {ID: '000453D77B9EDF:1', paramType: 'SET_POINT_TEMPERATURE', params: 15}, res => {
    log(JSON.stringify(res));
});
```

Lesen Sie die `paramsetDescription` eines Kanals eines Geräts:

```javascript
sendTo('hm-rpc.1', 'getParamsetDescription', {ID: '000453D77B9EDF:1', paramType: 'VALUES'}, res => {
    log(JSON.stringify(res));
});
```

Lesen Sie die Firmware-Informationen eines Geräts. In diesem Beispiel wird der Firmware-Status in das Protokoll geschrieben:

```javascript
sendTo('hm-rpc.1', 'getDeviceDescription', {ID: '0000S8179E3DBE', paramType: 'FIRMWARE'}, res => {
    if (!res.error) {
        log(`FW status: ${res.result.FIRMWARE_UPDATE_STATE}`)
    } else {
        log(res.error)
    }
});
```

## Weitere Informationen

Bei Verwendung von HomeMatic-Schaltern oder HomeMatic-Fernbedienungen bestätigt die CCU die Tastenzustände nur, wenn ein Dummy-Programm auf der CCU ausgeführt wird. Dieses Programm muss den Zustand des jeweiligen Schalters oder der zugehörigen Fernbedienung verwenden. Ohne ein solches Programm erhält ioBroker keine Tastenzustände.

Sie können ein einziges Dummy-Programm für mehrere Schaltflächen verwenden. Fügen Sie alle Schaltflächenzustände in die if-Anweisung ein und verknüpfen Sie diese mit dem Operator „oder“ oder „und“. Die then-Anweisung des Programms kann leer bleiben. Anschließend wird der Zustand in ioBroker bei jedem Tastendruck aktualisiert.

## Was ist Sentry.io?

Sentry.io ist ein Dienst für Entwickler. Er bietet einen Überblick über die Fehler ihrer Anwendungen. Genau dies ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird die Fehlermeldung an Sentry gesendet. Dieselbe Meldung erscheint auch im ioBroker-Protokoll. Wenn Sie der ioBroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird auch Ihre Installations-ID übermittelt. Diese Installations-ID ist lediglich eine eindeutige Kennung **ohne** weitere Informationen über Sie, wie Ihre E-Mail-Adresse oder Ihren Namen. Sie ermöglicht es Sentry, die Fehler zu gruppieren und anzuzeigen, wie viele Benutzer von einem Fehler betroffen sind. All dies hilft dem Entwickler, fehlerfreie und im Grunde absturzsichere Adapter bereitzustellen.

## Entwicklung

Um alle Geräteabbilder zu aktualisieren, führen Sie folgenden Befehl aus:

```bash
npm run update-images
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.1.2 (2026-09-22)
* (bluefox) Philips Hue and Osram Lightify lamps of the CCU lighting gateway: the color temperature `WHITE` is handled in kelvin (2000 - 6500 K), also if the CCU declares it as percent (#694)
* (bluefox) `HUE` and `SATURATION` are sent together in one `putParamset`, HMIP devices like HmIP-RGBW rejected a single value with `MISSING_NON_OPTIONAL_PARAMETER` (#1108)
* (bluefox) Values which the CCU delivers as text for a number are converted (the name of an ENUM to its index, e.g. `STATE_NOT_AVAILABLE` of a `VALVE_STATE`), invalid values become `null` instead of a wrong type (#1342, #1358)
* (bluefox) Events of deleted devices do not warn about missing objects until the next start of the adapter anymore (#1419)

### 4.1.1 (2026-09-22)
* (bluefox) `CONTROL_MODE` and `SET_POINT_MODE` of HmIP thermostats show the mode names (auto, manual, party)
* (bluefox) `SET_TEMPERATURE` of BidCos heating groups accepts 4.5 (OFF) and 30.5 (ON)
* (bluefox) CUxD always uses BIN-RPC, Homematic IP and Virtual Devices always use XML-RPC
* (bluefox) Username and password are sent with XML-RPC also without HTTPS
* (bluefox) Better error message if the CCU answers with an HTML page instead of XML-RPC
* (bluefox) Read-only datapoints do not get the writable roles `level.*` and `switch.*` anymore
* (bluefox) HmIP shutters and blinds: the control channels get `level.blind`/`level.tilt`, the status channel `value.blind`/`value.tilt`; `LEVEL` and `VALVE_STATE` of HmIP thermostats got better roles
* (bluefox) The option "Don't delete devices" also ignores devices that the CCU reports as deleted while the adapter is running (e.g. HmIP during firmware updates)

### 4.1.0 (2026-09-22)
* (krobipd) The device icons were invisible in the object browser: its ID cell sets `width: initial` on every element of an inlined SVG, which collapses the icon's `rect` to 0px. The size is now carried as an inline style as well.
* (bluefox) Updated `binrpc` to 4.x and `homematic-xmlrpc` to 2.x (no dependency on a GitHub tarball anymore)
* (bluefox) If the RPC server cannot listen (e.g. the configured IP address is not available), the error is logged and the adapter restarts after 30 seconds instead of crashing
* (bluefox) On stop, the RPC server and client are closed properly, also for XML-RPC and if the CCU is not reachable
* (bluefox) Updated packages
* (bluefox) Fixed writing of the lines and icons of HM-Dis-EP-WM55: an invalid tone interval (`0xE-1`) was sent if no interval was set
* (bluefox) The device manager does not crash anymore on devices without `native` and does not report the same control twice
* (bluefox) Added icon for HmIP-RFUSB
* (bluefox) PONG events and requests without method are logged only in debug mode
* (bluefox) Replaced the deprecated `deleteDevice` and `deleteChannel` calls
* (bluefox) Fixed issues reported by the repository checker (responsive design of the settings, lint and type check in CI)

### 4.0.0 (2026-08-15)
* (bluefox) Device icons are now delivered as theme-adaptive SVGs and stay visible on the dark admin theme
* (krobipd) Generated the device icon set and the device type map from the OCCU device database
* (krobipd) The device icon is re-applied on start to devices that were created before their type had an icon
* (bluefox) Removed support of Node.js 20

### 3.0.2 (2026-05-07)
* (bluefox) Updated packages
* (bluefox) Migrated to TypeScript 6
* (bluefox) Corrected device manager

### Older changelog
[here](/#/docs/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
Copyright (c) 2014 hobbyquaker <hq@ccu.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.