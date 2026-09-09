---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: jdhiIl/mtRCBKLYLztCtaZ29lMUVU6JE5CgHe31GWU0=
---
![Logo](../../../en/adapterref/iobroker.devices/admin/devices.svg)

![Anzahl der Installationen](http://iobroker.live/badges/devices-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.devices.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)

# ioBroker.devices

## Geräteadapter für ioBroker

Geräte verwalten und erstellen, um sie in anderen Adaptern wie Material, IoT, Matter usw. zu verwenden...

**Wichtig: Aktivieren Sie im Adminbereich Registerkarten wie „Protokoll“ und „Skripte“.**

![Bildschirm](../../../en/adapterref/iobroker.devices/img/screen.png)

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## ioBroker.devices Adapter – Benutzerhandbuch

### Überblick

Der`ioBroker.devices` Der Adapter ist eine Komponente der ioBroker Smart-Home-Plattform, die die Geräteverwaltung durch die Erstellung und Verwaltung virtueller Geräte vereinfachen soll.

Diese virtuellen Geräte bieten eine standardisierte Schnittstelle für physische Geräte und erleichtern so die Integration, Skripterstellung, Visualisierung und Steuerung von Geräten verschiedener Hersteller und Protokolle.

Der Adapter gewährleistet Konsistenz bei der Benennung und Strukturierung der Datenpunkte, wodurch der Bedarf an Änderungen an Skripten oder Visualisierungen bei Hardwareänderungen reduziert wird.

Es kapselt beliebige Sammlungen von Zuständen in ioBroker (physisch **oder** virtuell) in wohlgeformte **Geräte** mit umfangreichen Informationen:

- `type` ,`role` ,`smartName` ,`color` ,`room` ,`function` ,`icon` ,`unit` und mehr

Das Ergebnis wird von Dashboards (Material UI, VIS‑2), Sprachassistenten (Alexa/Google), dem Matter-Adapter, dem **IoT/Cloud** -Adapter und Skripten genutzt und bietet Ihnen so eine übersichtliche, zukunftssichere Objektstruktur.

**Hinweis:** Der Adapter fragt die Hardware **nicht** ab. Er läuft als reine Tab-Webinstanz → keine CPU-/RAM-Belastung.

### Zweck

Der`ioBroker.devices` Der Adapter dient folgenden Zwecken:

- Standardisierung: Erzeugt virtuelle Geräte mit konsistenten Datenpunktstrukturen, unabhängig von der zugrunde liegenden Hardware oder dem Protokoll aus verschiedenen Datenpunkten.
- Vereinfachte Wartung: Ermöglicht Benutzern den Austausch physischer Geräte, ohne Skripte oder Visualisierungen aktualisieren zu müssen, indem Datenpunkte im Adapter neu zugeordnet werden.
- Verbesserte Kompatibilität: Lässt sich nahtlos in Visualisierungsadapter (z. B. Material UI, VIS) und IoT-Adapter (z. B. Alexa, Google Home) integrieren.
- Benutzerfreundlich: Vereinfacht die Geräteverwaltung für Einsteiger und bietet gleichzeitig Flexibilität für fortgeschrittene Benutzer.

#### Standardisierung

Viele Adapter wie MQTT, KNX oder ähnliche liefern Datenpunkte mit unterschiedlichen Namen und Strukturen. Dieser Adapter erstellt ein virtuelles Gerät mit einer einheitlichen Struktur, wodurch die Verwaltung und Visualisierung von Geräten vereinfacht wird. Er fügt den Zuständen automatisch Rollen, Einheiten und Namen hinzu.

#### Vereinfachte Wartung

Der`ioBroker.devices` Der Adapter ermöglicht es Benutzern, virtuelle Geräte zu erstellen, die sich problemlos verschiedenen physischen Geräten zuordnen lassen. Das bedeutet: Wenn Sie ein physisches Gerät ändern, müssen Sie weder Ihre Skripte, Visualisierungen noch die Verlaufseinstellungen aktualisieren; Sie müssen lediglich die Datenpunkte im Adapter neu zuordnen.

#### Verbesserte Kompatibilität

Der Adapter weiß, wie die Geräte aussehen und wie sie verwendet werden. Er erstellt ein virtuelles Gerät mit der gleichen Struktur wie das physische Gerät, wodurch die Integration mit anderen Adaptern vereinfacht wird.

#### Benutzerfreundlich

Der`ioBroker.devices` Der Adapter ist benutzerfreundlich gestaltet und somit sowohl für Einsteiger als auch für erfahrene Anwender mit erweiterten Funktionen geeignet. Dank der intuitiven Benutzeroberfläche können Benutzer virtuelle Geräte erstellen und verwalten, ohne über umfassende technische Kenntnisse verfügen zu müssen.

## Konfiguration

Nach der Installation konfigurieren Sie den Adapter über die Registerkarte „Geräte“ in der ioBroker-Administrationsoberfläche.

### Erstellen eines virtuellen Geräts

Öffnen Sie den Geräte-Tab im Adminbereich.

#### Gerät hinzufügen

- Klicken Sie auf die Schaltfläche "+", um ein neues virtuelles Gerät zu erstellen.
- Geben Sie einen Namen für das Gerät ein (z. B. „Wohnzimmerleuchte“).
- Wählen Sie einen Gerätetyp (z. B. Licht, Schalter, Thermostat) aus der vordefinierten Liste aus.
- Optional kann der Organisation eine Kategorie (z. B. Beleuchtung, Heizung) zugewiesen werden.

Kartendatenpunkte:

Ordnen Sie für jede Funktion (z. B. Ein/Aus, Helligkeit) den Datenpunkt des virtuellen Geräts dem entsprechenden Zustand des physischen Geräts zu (z. B.`hm-rpc.0.12345.1.STATE` (für einen Homematic-Schalter).

Über die Benutzeroberfläche können Sie Zustände anderer Adapter durchsuchen und auswählen.

Speichern: Klicken Sie auf „Speichern“, um das virtuelle Gerät zu erstellen. Es wird unter alias.0 angezeigt.<DeviceName> auf der Registerkarte „Objekte“.

#### Gerätetypen

Der`ioBroker.devices` Der Adapter unterstützt drei Hauptansätze zur Geräteerstellung:

1. Automatisch erkannte Geräte

Einige Adapter (z. B. ioBroker.zigbee, ioBroker.hm-rpc) stellen bereits eine gültige Struktur für die Geräte bereit. Diese werden automatisch erkannt **, sobald eine Kategorie (Funktion oder Raum) zugewiesen ist** . Ohne zugewiesene Kategorie wird das automatisch erkannte Gerät nicht verarbeitet.

2. Verbundene Geräte

Verknüpfte Geräte sind virtuelle Geräte, die manuell erstellt werden, um die Datenpunkte eines bestimmten physischen Geräts widerzuspiegeln.`ioBroker.linkeddevices` Die

Es wird empfohlen,`ioBroker.devices` Und`alias.0` Zweig statt`linkeddevices` Die

3. Aliase

Aliase sind leichtgewichtige virtuelle Geräte, die als Abkürzungen oder vereinfachte Verweise auf bestehende Zustände fungieren, ohne eine vollständige Gerätestruktur zu erzeugen.

Sie können ein neues virtuelles Gerät in einem erstellen`alias.0` Zweig. Wählen Sie den Gerätetyp aus und füllen Sie alle erforderlichen Zustände (mit \* gekennzeichnet) aus. Optional können Sie nicht erforderliche Zustände hinzufügen (z. B. Luftfeuchtigkeit über einen Temperatursensor). Für jeden erforderlichen und ausgefüllten optionalen Zustand erstellt der Adapter eine Aliasstruktur. Wenn Sie beispielsweise ein Temperaturgerät mit dem Namen „Temperaturgerät“ erstellt haben, …`Temperature` und wenn beide Zustände (Temperatur und Luftfeuchtigkeit) angegeben werden, finden Sie die folgenden Zustände und Kanäle in`alias.0` Zweig:

- `alias.0.Temperature` - Kanal
- `alias.0.Temperature.temperature` - Zustand mit der Einheit '°C'. Es sollte eine virtuelle Verknüpfung zu einem realen Zustand mit Temperaturangabe geben. Wenn Sie den Alias entfernen in`ioBroker.devices` Adapter, dieser Zustand bleibt ohne Verbindung bestehen.
- `alias.0.Temperature.humidity` - Zustand mit der Einheit '%'. Dieser hat eine virtuelle Verknüpfung zum realen Zustand (z. B. zu`hm-rpc.0.JHAGHGJJJ.1.HUMIDITY` Wenn Sie den Alias entfernen in`ioBroker.devices` Adapter, dieser Zustand wird gelöscht.

Nahezu jeder Gerätetyp könnte zusätzliche Statusanzeigen (Indikatoren) für Akku, Verbindung, Fehler und weitere Funktionen aufweisen. Diese sind optional, aber einige Adapter (z. B. …)`material` oder`matter` ) könnte es interpretieren.

Für jeden Bundesstaat können Sie alle Einstellungen angeben, die von Aliasen unterstützt werden:

- Unterschiedliche Zustände für Lesen und Schreiben
- Umrechnungsformel zum Lesen und Schreiben

#### Geräteverwaltung

Gerät bearbeiten: Klicken Sie auf der Registerkarte „Geräte“ auf das Stiftsymbol neben einem Gerät, um dessen Namen, Typ, Kategorie, Farbe, Symbol oder Datenpunktzuordnungen zu ändern.

Gerät löschen: Klicken Sie auf das Papierkorbsymbol, um ein virtuelles Gerät zu entfernen. Dies hat keine Auswirkungen auf das physische Gerät oder dessen Adapter.

Geräte organisieren: Verwenden Sie Kategorien, um Geräte zu gruppieren (z. B. „Beleuchtung“, „Heizung“), um die Verwaltung in Visualisierungen zu vereinfachen.

## Gerätetypen

Dieser Adapter wurde mithilfe von`type-detector` Alle möglichen Geräte finden Sie [hier](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) .

## Video

[![Video](https://img.youtube.com/vi/0Aecm5YAk7M/0.jpg)](https://www.youtube.com/watch?v=0Aecm5YAk7M)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.2.0 (2026-08-28)
* (@GermanBluefox) The devices of this adapter are now reachable in the ioBroker Device Manager: each one appears as a card with its name, icon, battery and reachability. Readings are shown on the card itself, and only states that can actually be operated become controls (switch, slider, select), so a read-only device has no control button at all. A control writes to the command state but reads from its feedback partner where the device has one, so a switch shows what the device reports rather than what it was last told. The instance already advertised Device Manager support, but answered none of its requests
* (@GermanBluefox) Added the "Clean Light" theme: white cards on a light grey page with coloured icons, where a tile stays white when its device is on and only the label and the toggle turn blue
* (@GermanBluefox) Added the "Tech Blue" theme: near-black tiles set apart by a lit blue outline, with monochrome blue icons and toggles
* (@krobipd) Fixed "Create new folder" only showing a white screen since 4.0.0 (#679)
* (@krobipd) Fixed the room column filter emptying the device list: it showed the function filter's value and wrote the picked room into the function filter (#680)
* (@krobipd) Fixed an added state being deleted when it was edited without renaming it (#360)
* (@krobipd) Moving, renaming or copying a device no longer deletes the original when the copy failed halfway through (#151, #513)
* (@GermanBluefox) A failed copy is only cleaned up when its target path was free beforehand, so renaming a device onto an existing name cannot delete that device's objects
* (@krobipd) Manually added states are now deleted together with their device, instead of staying behind as ghost objects after a move, rename or delete (#684)
* (@krobipd) Cancel in the device editor now really cancels: deleting a state and picking a device icon are applied on Save instead of the moment they are clicked
* (@krobipd) The read/write function preview shows boolean results and reports an invalid formula, instead of staying empty in both cases (#683)
* (@krobipd) A string-typed alias no longer inherits `min`/`max`/`step` from its source, which made js-controller warn about an invalid object on every check (#682)
* (@GermanBluefox) An alias or linked state now takes its type from the source wherever the device type allows more than one, so a thermostat or air conditioner that spells its modes out instead of numbering them is no longer written back as a number (#614). Needs the matching `@iobroker/type-detector` release
* (@krobipd) A linkeddevices state now inherits the real range of its source instead of a hard 0...100, so a linked thermostat no longer shows 0...100 instead of e.g. 5...35
* (@krobipd) `TreeView.getDerivedStateFromProps` returns its derived state instead of mutating the state it was handed, which React 19 does not guarantee to keep

### 4.1.1 (2026-08-17)
* (@GermanBluefox) Fixed states being written without `common.read` and `common.write`, which every state object must carry: the "add state" dialog left both out for the deprecated `file` type, and dropped them from any state it edited that did not have them yet (#535, #533, #463)
* (@GermanBluefox) States written by earlier versions have the two attributes added once when the device list is loaded. What is missing is taken from the device type and from the aliased source, so a state the device really can write does not turn read-only

### 4.1.0 (2026-08-16)
* (@Apollon77) Added support for new device types
* (@GermanBluefox) Datapoints added to an alias device by hand now reach the widget GUI, so a tank can show the litres it has left next to its fill level
* (@GermanBluefox) The tank tile shows that second reading where it used to print its fill level a second time
* (@GermanBluefox) Fixed the settings button of a 2x0.5 tank tile sitting in the middle of the tile instead of in its top-right corner

### 4.0.2 (2026-08-10)
* (@SimonFischer04) Added WindowTilt support in the widgets GUI (#609)
* (@GermanBluefox) Added min/max values (last 24 hours or today) for widgets with history (#610)
* (@GermanBluefox) Reworked the "Blue dark" theme into a deep navy look and gave the category icons a coloured round badge
* (@GermanBluefox) Added role icons for UV index, knots, rpm, operating hours and W/kW/Wh
* (@GermanBluefox) The device list now shows the icon configured for a widget, and falls back to the role icon instead of the generic type icon
* (@GermanBluefox) Info devices are no longer hidden by default; the "i" button in the toolbar now shows whether the filter is active
* (@GermanBluefox) Fixed widgets vanishing from the GUI when they were assigned to a category that no longer exists
* (@GermanBluefox) Fixed categories being dropped as empty although widgets had been moved into them
* (@GermanBluefox) Fixed the "record history" switch: it now follows the alias to the recorded source and is highlighted while recording
* (@GermanBluefox) Fixed clipped values in the wind widget
* (@GermanBluefox) Fixed emoji icons sitting off-centre in the category badges and header
* (@GermanBluefox) Fixed an alias assignment being dropped silently when saving a device whose state was not cached yet
* (@GermanBluefox) Implemented user-specific views
* (@Apollon77) Added widgets for button, buttonSensor, camera and vacuumCleaner, which were shown as "Widget type not supported" before
* (@Apollon77) Added mute and the separate volume feedback state (`VOLUME_ACTUAL`) to the media player widget
* (@Apollon77) Added the missing tilt controls to the blind widgets: tilt now works for button blinds too, has a stop button, and uses the min/max of the state instead of assuming percent
* (@Apollon77) Added an active icon for windowTilt
* (@Apollon77) The light widget now shows the real state from `ON_ACTUAL` instead of echoing the commanded value
* (@Apollon77) Fixed image widgets: the configured defaults were ignored until the settings dialog was opened once, and the refresh button was answered from the cache
* (@Apollon77) Fixed newer device types (windowTilt, camera, percentage, fillLevel, …) landing in the "other" group when auto-grouping is switched on
* (@Apollon77) Fixed the type of created alias states: `defaultType` is now honoured, so the ERROR state is no longer created as boolean
* (@Apollon77) Fixed the air conditioner editor showing the swing state twice and writing it twice on save
* (@Apollon77) Fixed the enum assignment of created devices: it ran once per state and not at all for devices with only optional states
* (@Apollon77) Fixed the build and the CI (unresolvable react-input-color dependency, out-of-sync lock files, node versions)

### 4.0.0 (2026-08-03)
* (@GermanBluefox) Added min/max values (last 24 hours or today) for widgets with history
* (@GermanBluefox) Fixed the history options (chart, trend, min/max) not being offered in the widget settings
* (@GermanBluefox) Recreate all missing instance monitoring objects, not only alive/connected
* (@GermanBluefox) Migrated to react 19 and MUI 9

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.devices/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 bluefox <dogafox@gmail.com>

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