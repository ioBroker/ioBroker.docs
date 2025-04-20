---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: jU9oLzDlmKeLxKpIYsRmcNrrbEgUVX5e7BQk7GH0E6U=
---
![Logo](../../../en/adapterref/iobroker.devices/admin/devices.png)

![Anzahl der Installationen](http://iobroker.live/badges/devices-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.devices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.devices
![Testen und Freigeben](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Geräteadapter für ioBroker
Verwalten und erstellen Sie Geräte zur Verwendung in anderen Adaptern wie Material, IoT, Matter usw.

**Wichtig: Registerkarte im Admin aktivieren, wie Protokoll und Skripte**

![Bildschirm](../../../en/adapterref/iobroker.devices/img/screen.png)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## IoBroker.devices Adapter-Benutzerhandbuch
### Übersicht
Der Adapter `ioBroker.devices` ist eine Komponente der Smart-Home-Plattform ioBroker, die die Geräteverwaltung durch die Erstellung und Verwaltung virtueller Geräte vereinfachen soll.

Diese virtuellen Geräte bieten eine standardisierte Schnittstelle für physische Geräte und erleichtern so die Integration, Skripterstellung, Visualisierung und Steuerung von Geräten verschiedener Hersteller und Protokolle.

Der Adapter gewährleistet Konsistenz bei der Benennung und Struktur von Datenpunkten, sodass bei Hardwareänderungen weniger Änderungen an Skripten oder Visualisierungen erforderlich sind.

### Zweck
Der Adapter `ioBroker.devices` dient folgenden Zwecken:

- Standardisierung: Erstellt virtuelle Geräte mit konsistenten Datenpunktstrukturen, unabhängig von der zugrunde liegenden Hardware oder dem Protokoll verschiedener Datenpunkte.
- Vereinfachte Wartung: Ermöglicht Benutzern das Austauschen physischer Geräte ohne Aktualisierung von Skripten oder Visualisierungen durch Neuzuordnung von Datenpunkten im Adapter.
- Verbesserte Kompatibilität: Nahtlose Integration mit Visualisierungsadaptern (z. B. Material UI, VIS), IoT-Adaptern (z. B. Alexa, Google Home).
- Benutzerfreundlich: Vereinfacht die Geräteverwaltung für Anfänger und bietet gleichzeitig Flexibilität für fortgeschrittene Benutzer.

#### Standardisierung
Viele Adapter wie MQTT, KNX oder ähnliche liefern Datenpunkte mit unterschiedlichen Namen und Strukturen. Dieser Adapter erstellt ein virtuelles Gerät mit einer konsistenten Struktur und vereinfacht so die Verwaltung und Visualisierung von Geräten.
Er fügt den Zuständen automatisch Rollen, Einheiten und Namen hinzu.

#### Vereinfachte Wartung
Mit dem Adapter `ioBroker.devices` können Nutzer virtuelle Geräte erstellen, die sich problemlos anderen physischen Geräten zuordnen lassen.
Das bedeutet: Wenn Sie ein physisches Gerät wechseln, müssen Sie Ihre Skripte, Visualisierungen oder Verlaufseinstellungen nicht aktualisieren. Sie müssen lediglich die Datenpunkte im Adapter neu zuordnen.

#### Verbesserte Kompatibilität
Der Adapter weiß, wie die Geräte aussehen und wie sie verwendet werden sollen. Er erstellt ein virtuelles Gerät mit der gleichen Struktur wie das physische Gerät und erleichtert so die Integration mit anderen Adaptern.

#### Benutzerfreundlich
Der `ioBroker.devices`-Adapter ist benutzerfreundlich gestaltet und eignet sich sowohl für Anfänger als auch für erfahrene Benutzer mit erweiterten Funktionen. Die intuitive Benutzeroberfläche ermöglicht das Erstellen und Verwalten virtueller Geräte ohne umfassende technische Kenntnisse.

## Konfiguration
Konfigurieren Sie den Adapter nach der Installation über die Registerkarte „Geräte“ in der ioBroker-Administrationsoberfläche.

### Erstellen eines virtuellen Geräts
Öffnen Sie die Registerkarte „Geräte“ im Administrator.

#### Gerät hinzufügen
– Klicken Sie auf die Schaltfläche „+“, um ein neues virtuelles Gerät zu erstellen.
- Geben Sie einen Namen für das Gerät ein (z. B. „Wohnzimmerlicht“).
- Wählen Sie einen Gerätetyp (z. B. Licht, Schalter, Thermostat) aus der vordefinierten Liste.
- Optional können Sie zur Organisation eine Kategorie (z. B. Beleuchtung, Heizung) zuweisen.

Kartendatenpunkte:

Ordnen Sie für jede Funktion (z. B. An/Aus, Helligkeit) den Datenpunkt des virtuellen Geräts dem entsprechenden Zustand des physischen Geräts zu (z. B. `hm-rpc.0.12345.1.STATE` für einen Homematic-Schalter).

Verwenden Sie die Schnittstelle, um Zustände anderer Adapter zu durchsuchen und auszuwählen.

Speichern: Klicken Sie auf „Speichern“, um das virtuelle Gerät zu erstellen. Es wird unter alias.0.<Gerätename> auf der Registerkarte „Objekte“ angezeigt.

#### Gerätetypen
Der Adapter `ioBroker.devices` unterstützt drei Hauptansätze zur Geräteerstellung:

1. Automatisch erkannte Geräte

Einige Adapter (z. B. ioBroker.zigbee, ioBroker.hm-rpc) bieten bereits eine gültige Struktur für die Geräte und werden automatisch erkannt, **wenn eine Kategorie (Funktion oder Raum) zugewiesen ist**.
Ohne die zugewiesene Kategorie wird das automatisch erkannte Gerät nicht verarbeitet.

2. Verknüpfte Geräte

Verknüpfte Geräte sind virtuelle Geräte, die manuell erstellt wurden, um die Datenpunkte eines bestimmten physischen Geräts mit `ioBroker.linkeddevices` zu spiegeln.

Es wird empfohlen, die Zweige `ioBroker.devices` und `alias.0` anstelle von `linkeddevices` zu verwenden.

3. Aliase

Aliase sind leichtgewichtige virtuelle Geräte, die als Verknüpfungen oder vereinfachte Verweise auf vorhandene Zustände fungieren, ohne eine vollständige Gerätestruktur zu erstellen.

Sie können ein neues virtuelles Gerät in einem Zweig `alias.0` erstellen. Wählen Sie den Gerätetyp aus und füllen Sie alle erforderlichen Zustände (mit * gekennzeichnet) aus. Optional können Sie nicht erforderliche Zustände hinzufügen (z. B. Luftfeuchtigkeit durch Temperatursensor).
Für jeden erforderlichen Zustand und jeden ausgefüllten optionalen Zustand erstellt der Adapter eine Aliasstruktur.
Wenn Sie beispielsweise ein Temperaturgerät mit dem Namen `Temperature` erstellt und beide Zustände (Temperatur und Luftfeuchtigkeit) angegeben haben, finden Sie im Zweig `alias.0` die folgenden Zustände und Kanäle:

- `alias.0.Temperature` - Kanal
- `alias.0.Temperature.temperature` – Zustand mit der Einheit „°C“. Es sollte eine virtuelle Verknüpfung zu einem realen Zustand mit Temperatur vorhanden sein. Wenn Sie den Alias im Adapter `ioBroker.devices` entfernen, bleibt dieser Zustand ohne Verknüpfung.
- `alias.0.Temperature.humidity` – Status mit der Einheit „%“. Dies hat eine virtuelle Verknüpfung zum tatsächlichen Status (z. B. zu `hm-rpc.0.JHAGHGJJJ.1.HUMIDITY`). Wenn Sie den Alias im Adapter `ioBroker.devices` entfernen, wird dieser Status gelöscht.

Fast jeder Gerätetyp könnte zusätzliche Statusanzeigen (Indikatoren) für Akku, Konnektivität, Fehler und mehr haben. Diese sind optional, können aber von einigen Adaptern (z. B. Material oder Matter) interpretiert werden.

#### Geräte verwalten
Gerät bearbeiten: Klicken Sie auf der Registerkarte „Geräte“ auf das Stiftsymbol neben einem Gerät, um dessen Namen, Typ, Kategorie, Farbe, Namen, Symbol oder Datenpunktzuordnungen zu ändern.

Gerät löschen: Klicken Sie auf das Papierkorbsymbol, um ein virtuelles Gerät zu entfernen. Dies hat keine Auswirkungen auf das physische Gerät oder seinen Adapter.

Geräte organisieren: Verwenden Sie Kategorien, um Geräte zu gruppieren (z. B. „Beleuchtung“, „Heizung“), um die Verwaltung in Visualisierungen zu vereinfachen.

## Gerätetyp
Dieser Adapter wurde mit Hilfe von `type-detector` erstellt. Alle möglichen Geräte wurden gefunden [Hier](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2025-04-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Used vite
* (@GermanBluefox) Used eslint-config of ioBroker
* (@GermanBluefox) Rewritten to TypeScript and corrected all known bugs (Except extension requests)

### 1.1.5 (2023-06-06)
* (Garfonso) fixed: problem with editing imported states
* (Garfonso) fixed: warning
* (Garfonso) fixed: enabling iot again (without setting a custom smartName)
* (Garfonso) fixed: possible crash / typo in 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Updated packages

### 1.1.3 (2023-05-16)
* (bluefox) Better behavior of category selection

### 1.1.2 (2022-11-09)
* (Garfonso) corrected the double states in light devices
* (Garfonso) added CIE color type as equivalent to `rgbSingle` type

### 1.1.1 (2022-11-03)
* (bluefox) Corrected delete dialog
* (bluefox) Added ukrainian translation

### 1.1.0 (2022-09-27)
* (bluefox) Migrated GUI to v5

### 1.0.12 (2022-06-09)
* (bluefox) Allowed to work with devices behind reverse proxy
* (bluefox) Replaced the function icon

### 1.0.11 (2022-06-08)
* (bluefox) Updated some libraries

### 1.0.10 (2022-02-13)
* (bluefox) Corrected edit of folders
* (bluefox) Updated some libraries

### 1.0.9 (2021-07-11)
* (bluefox) Implement the narrow rows

### 1.0.8 (2021-07-04)
* (bluefox) Corrected creation of the devices

### 1.0.7 (2021-06-30)
* (bluefox) Corrected creation the folders

### 1.0.6 (2021-06-27)
* (bluefox) Implemented the filters

### 1.0.5 (2021-06-26)
* (bluefox) Implemented the edit of `states` parameter

### 1.0.4 (2021-06-08)
* (bluefox) Fixed some GUI errors

### 1.0.1 (2021-06-07)
* (bluefox) Added sentry

### 1.0.0 (2021-06-07)
* (bluefox) Added new devices

### 0.3.16 (2021-03-11)
* (bluefox) Fixed the error for IDs with the strange characters

### 0.3.15 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.3.13 (2020-08-17)
* (bluefox) Fixed errors by optional states

### 0.3.12 (2020-08-16)
* (bluefox) added the vacuum cleaner

### 0.3.10 (2020-08-12)
* (bluefox) added the air conditioner

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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