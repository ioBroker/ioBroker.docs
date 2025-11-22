---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nspanel-lovelace-ui/README.md
title: ioBroker.nspanel-lovelace-ui
hash: uNqdmZ3zPDhZew/erMIJrCG4G4lO3NIkV3l54TFPuEs=
---
![Logo](../../../en/adapterref/iobroker.nspanel-lovelace-ui/admin/nspanel-lovelace-ui.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nspanel-lovelace-ui.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nspanel-lovelace-ui.svg)
![Anzahl der Installationen](https://iobroker.live/badges/nspanel-lovelace-ui-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/nspanel-lovelace-ui-stable.svg)
![NPM](https://nodei.co/npm/iobroker.nspanel-lovelace-ui.png?downloads=true)

# IoBroker.nspanel-lovelace-ui
**Tests:** ![Test und Freigabe](https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/actions/workflows/test-and-release.yml/badge.svg?branch=main)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nspanel-lovelace-ui/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/nspanel-lovelace-ui/)

## Nspanel-lovelace-ui-Adapter für ioBroker
NsPanel Lovelace UI ist eine Firmware für den Nextion-Bildschirm innerhalb von NSPanel im Design von Lovelace UI.

### Kurzbeschreibung
Die NSPanel Lovelace-Benutzeroberfläche ist eine alternative Oberfläche für das Sonoff NSPanel, die speziell für die Integration mit iobroker entwickelt wurde. Sie nutzt in der Regel Tasmota (Firmware) und MQTT (Messaging-Protokoll), um benutzerdefinierte Steuerelemente und Anzeigen direkt auf dem kleinen Touchscreen des NSPanel bereitzustellen.

### Was ist das NSPanel?
Das Sonoff NSPanel ist ein intelligenter Wandschalter mit folgenden Eigenschaften:

- zwei physische Relaisschalter
- ein 3,5-Zoll-Touchscreen
- Temperatur- und Helligkeitssensoren

Es wurde ursprünglich für die eWeLink-App entwickelt, lässt sich aber mithilfe alternativer Firmware wesentlich leistungsfähiger in ioBroker integrieren.

### Was bewirkt die "NSPanel Lovelace UI"?
Mit dieser benutzerdefinierten Benutzeroberfläche können Sie:

- Lovelace-ähnliche Karten auf dem NSPanel anzeigen
- Anzeige von Sensorwerten (z. B. Temperatur, Luftfeuchtigkeit)
- Szenen und Automatisierungen steuern
- Steuern Sie Beleuchtung, Thermostate und andere Geräte direkt über den Bildschirm

---

### Installation & Fragen
Adapter-Wiki: https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/wiki Adapter-Community (ioBroker-Forum): [Forum](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## Die folgenden HMI-Komponenten sind bereits in den NSPanel-Adapter integriert:
### HMI-Karten
- [x] Bildschirmschoner
- [x] Bildschirmschoner2
- [x] Bildschirmschoner3
- [x] Kartendiagramm
- [x] cardLChart
- [ ] cardLChart2 (neu - in Bearbeitung)
- [x] Kartenentitäten
- [x] Kartenplan
- [x] Kartenraster
- [x] Kartenraster2
- [x] Kartenraster3
- [x] cardThermo
- [ ] cardMedia
- [x] Kartenentsperrung
- [x] cardQR
- [ ] Kartenalarm
- [x] Kartenstärke

### HMI-Popups
- [x] popupInSel
- [x] Popup-Lüfter
- [x] popupThermo
- [x] Popup-Benachrichtigung
- [x] Popup-Verschluss
- [x] popupShutter2
- [x] Popup-Licht
- [x] popupLight2
- [x] Popup-Timer
- [x] Popup-Slider
- [ ] popupColor (neu - in Bearbeitung)

---

## Summersteuerung
Der Adapter unterstützt die Summersteuerung für NSPanel-Geräte mithilfe des Tasmota-Befehls `Buzzer`. Dies ermöglicht Tastentöne, Benachrichtigungen über dringende Meldungen und die allgemeine Summersteuerung.

### Voraussetzungen
Um die Summerfunktion zu nutzen, stellen Sie sicher, dass in Ihrer NSPanel Tasmota-Firmware die Option `SetOption111 1` aktiviert ist. Dadurch wird BuzzerPwm für die Frequenzausgabe des Piezo-Summers anstelle eines Ein-/Aus-Signals verwendet.

### Anwendungsmethoden
#### 1. Zustandsbasierte Steuerung
Jedes Bedienfeld verfügt über einen Summer-Steuerungszustand: `panels.{panelName}.cmd.buzzer`

```javascript
// Set buzzer command (tone, duration, count, frequency)
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,2,3,0xF54');

// Examples:
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1'); // Single beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,5'); // Longer beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '2,3,5'); // 5 beeps
```

#### 2. SendTo-Schnittstelle
```javascript
// Basic buzzer command
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'panelTopic',
    command: '1,2,3,0xF54',
});

// Button feedback sound
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'kitchen_panel',
    command: '1',
});

// Urgent notification
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'living_room',
    command: '3,5,10,0x800', // High-pitched, multiple beeps
});
```

### Summer-Befehlsformat
Der Buzzer-Befehl folgt dem Tasmota-Format: `tone,duration,count,frequency`

- **Tonart**: 1-4 (Tontyp)
- **Dauer**: 1-10 (Dauereinheiten, jeweils ca. 100 ms)
- **Anzahl**: 1-255 (Anzahl der Pieptöne)
- **Frequenz**: 0x100-0xFFFF (Piezo-Frequenz in Hexadezimaldarstellung)

**Beispiele:**

- `1` - Einzelner kurzer Piepton
- `1,5` - Einzelner längerer Piepton
- `2,3,5` - 5 mittlere Pieptöne mit Ton 2
- `1,2,3,0xF54` - 3 kurze Pieptöne mit benutzerdefinierter Frequenz

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-11-15)
- (ticaki) first Version at latest
- (ticaki) New attempt to get MQTT TLS keys into the backup

### 0.8.0 (2025-11-13)
- (Armilar) IMPORTANT: update to TFT Version 5.1.0
- (ticaki) pagePopup added
- (ticaki) color for brightsky favorit/bottom day fixed
- (ticaki) unlock pin fail fixed

## License

MIT License

Copyright (c) 2024-2025 ticaki <github@renopoint.de>  
Copyright (c) 2024-2025 tt-tom17 <tgb@kabelmail.de>

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