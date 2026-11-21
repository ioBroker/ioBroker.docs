---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nspanel-lovelace-ui/README.md
title: ioBroker.nspanel-lovelace-ui
hash: X1m4wEjdGQMHpHRA46AxLw77uSHUgwYoCFM9sQ/cM78=
---
![Logo](../../../en/adapterref/iobroker.nspanel-lovelace-ui/admin/nspanel-lovelace-ui.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nspanel-lovelace-ui.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nspanel-lovelace-ui.svg)
![Anzahl der Installationen](https://iobroker.live/badges/nspanel-lovelace-ui-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/nspanel-lovelace-ui-stable.svg)
![NPM](https://nodei.co/npm/iobroker.nspanel-lovelace-ui.png?downloads=true)
![Test und Freigabe](https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/actions/workflows/test-and-release.yml/badge.svg?branch=main)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nspanel-lovelace-ui/287x66-grey.png)

# ioBroker.nspanel-lovelace-ui

## nspanel-lovelace-ui-Adapter für ioBroker

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
- Anzeige der Sensorwerte (z. B. Temperatur, Luftfeuchtigkeit)
- Szenen und Automatisierungen steuern
- Steuern Sie Beleuchtung, Thermostate und andere Geräte direkt über den Bildschirm.

---

### Installation & Fragen

Dokumentation: <https://ticaki.github.io/ioBroker.nspanel-lovelace-ui> (Deutsch und Englisch, Symbolübersicht unter `/icons/`)\
&#x20;Adapter-Community (ioBroker-Forum): [Forum](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## Folgende HMI-Komponenten sind bereits in den NSPanel-Adapter integriert:

### HMI-Karten

- [x] Bildschirmschoner
- [x] Bildschirmschoner2
- [x] Bildschirmschoner3
- [x] Kartendiagramm
- [x] cardLChart
- [x] cardPChart
- [ ] cardLChart2 (neu - in Bearbeitung)
- [x] Kartenentitäten
- [x] Kartenplan
- [x] Kartenraster
- [x] Kartenraster2
- [x] Kartenraster 3
- [x] cardThermo
- [ ] cardMedia
- [x] Karte entsperren
- [x] Karten-QR
- [ ] Kartenalarm
- [x] Kartenleistung

### HMI-Popups

- [x] popupInSel
- [x] Popup-Lüfter
- [x] Popup-Thermo
- [x] Popup-Benachrichtigung
- [x] Popup-Verschluss
- [x] Popup-Verschluss 2
- [x] Popup-Licht
- [x] popupLight2
- [x] Popup-Timer
- [x] Popup-Slider
- [ ] popupColor (neu - in Bearbeitung)

---

## Summersteuerung

Der Adapter unterstützt die Summersteuerung für NSPanel-Geräte mithilfe von Tasmota. `Buzzer` Befehl. Dies aktiviert Tastentöne, Benachrichtigungen über dringende Meldungen und die allgemeine Summersteuerung.

### Voraussetzungen

Um die Summerfunktion nutzen zu können, stellen Sie sicher, dass Ihre NSPanel Tasmota-Firmware über die entsprechende Firmware verfügt. `SetOption111 1` Aktiviert. Hierbei wird BuzzerPwm für die Frequenzausgabe des Piezo-Summers anstelle eines Ein-/Aus-Signals verwendet.

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

Der Buzzer-Befehl folgt dem Format von Tasmota: `tone,duration,count,frequency`

- **Tonhöhe** : 1-4 (Tonart)
- **Dauer** : 1-10 (Dauereinheiten, jeweils ca. 100 ms)
- **Anzahl** : 1-255 (Anzahl der Pieptöne)
- **Frequenz** : 0x100-0xFFFF (Piezo-Frequenz in Hexadezimaldarstellung)

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
### **WORK IN PROGRESS**
- (tt-tom17) Revision of the language files

### 2.4.1 (2026-11-18)
- (ticaki) TFT 6.1.1: popups opened from the screensaver (Advanced and Tiles, long press of an indicator) show the full name as heading - the light popup with color showed "change model conf to us-l/p", other popups cut the name after 11 characters
- (ticaki) Web panel: a browser that kept the page open over an adapter update reloads itself once and gets the new frontend
- (ticaki) Web panel: the long press of a screensaver indicator no longer operates the popup it opens (releasing the finger moved the shutter or picked a color)
- (ticaki) admin developer: download the configuration of a single page with its page items (stored and runtime) for support
- (ticaki) web panel: colour temperature slider of the light popup was inverted
- (ticaki) colour temperature with min/max of the state was set mirrored
- (ticaki) colour temperature: fallback to the state's min/max or the defaults when the scale is missing, values outside are limited

### 2.4.0 (2026-11-17)
- (ticaki) screensaver: new long press action "Open popup" for indicators (Advanced and Tiles, TFT 6.0.9+) - opens the popup of the light, shutter, fan, selection or timer channel and returns to the screensaver afterwards (script: `ScreensaverEntityLongPressPopup: true`)
- (ticaki) screensaver notifications: tapping away a dismissible notification with a group ID writes that ID to `panels.<panel>.screensaverNotify.id` and `screensaverNotify.id`; sendTo `screensaverNotify` finds the panel given in `panel` (topic) again and answers with `result: 'ok'`
- (ticaki) panel setup: an existing panel is recognized by its MAC address - changing topic, name or IP updates it instead of creating a duplicate and moves its pages, screensaver and navigation assignments, its script configuration and its configuration script along (fixed #899)
- (ticaki) admin: panel names and topics must be unique, orphaned panel assignments of pages and screensavers are marked and can be removed, a duplicated panel entry can be deleted on its own and is skipped with a warning on start
- (ticaki) admin, screensaver items: new option to fill free slots even while hidden - by default a hidden item no longer fills a free slot
- (ticaki) admin, panel cards (Maintain, Panelinfo, panel overview): one "?" per card for its documentation, buttons and fields link their help in the tooltip; a long panel title no longer widens the Panelinfo card
- (ticaki) gate channel: a boolean status (`sensor.gate`) or a channel with only SET is shown, up/down work again; with a boolean status up is disabled when open and down when closed, stop no longer depends on the status
- (ticaki) fixes: a temperature offset set in Tasmota (`TempOffset`) is taken over instead of overwritten; the internal MQTT server matches topics exactly and no longer mistakes a panel whose name starts with the name of another one; a failed Berry driver download restores the previous driver
- (ticaki) log: no error without configured panels, no "Update detected" on every MQTT connect, panel name in the screensaver message, clearer script update errors, "setActivePage called but nothing changed" only as debug

### 2.3.1 (2026-11-16)
- (ticaki) Admin: help links to the documentation at many settings, in the ioBroker system language
- (tt-tom17) Admin, developer tab: flashing a custom TFT also works with an external MQTT broker - the box asks for the "IP of the ioBroker" itself
- (ticaki) color scale: with a best value and a best color, the range above the best value is no longer inverted - the colors now run min color → best color → max color; no more invalid color when the best value equals the max value (fixed #896)
- (ticaki) Admin, color options: in the gradient modes (triGrad, quadriGrad and their anchor variants) the color fields Min/Max/Best are disabled, as these modes do not use them

### 2.3.0 (2026-11-16)
- (ticaki) panel: with the TFT 6.1.0 and the berry driver 12 the display confirms every message with its checksum and the adapter sends the next one right away instead of waiting 250 ms - pages and the screensaver build up noticeably faster; the screensaver takes its colors with the page change (no black flash), screensaver advanced follows the color theme
- (ticaki) berry driver 12 (also the emulator berry): faster checksum, takes it ready-made from the adapter, a message split over two serial reads is no longer lost; the maintain tab shows the berry driver of every panel and offers an update
- (ticaki) screensaver: changes arriving right after each other are sent together, weatherUpdate at most once per second instead of every 2 s, outdated values no longer pile up in the send queue; the update symbol only shows for a TFT older than the recommended one
- (ticaki) screensaver notification at standby brightness 0: the first tap wakes the display, the second clears the notification, the third leaves the screensaver
- (ticaki) adapter start: one startup per panel instead of a startup storm; an adapter restart during a TFT update no longer breaks the update
- (ticaki) changed state texts and display values (`common.states`, unit, min, max, step, name) are picked up at runtime without an adapter restart
- (ticaki) icons: media player logos `alexa`, `mpd`, `sonos`, `bose` and `volumio` (TFT 6.1.0)
- (ticaki) admin: flash a custom TFT on one or all panels (tab developer, expert mode); page name filter in the page config, search in the navigation flow, readable zoom buttons in the dark theme
- (ticaki) Admin >= 8.1.0 required; dependencies updated (MQTT broker aedes 1.2.0 with security fixes)
- (tt-tom17) popup notification: the left button writes the plain id to `setStateID` and the id with the panel name to `setGlobalID` like the other buttons - **check scripts that read the local datapoint**; a missing `textSize` falls back to 3
- (tt-tom17) cardThermo/cardThermo2: mode row also with `common.states` as object, fan mode `FAN_ONLY` shown, no outline A on inactive modes, no doubled wrench; fan and dry mode translated by what they do (de: `Lüften`/`Trocknen`)
- (tt-tom17) screensaver: a tap on a notification that cannot be dismissed is no longer lost; an acknowledged notification of the ioBroker host no longer comes back
- (tt-tom17) admin: color scale checkbox for item colors, value condition for more navigation roles, "navigation" and "custom button" exclude each other, clearer start page summary and notices, failed script updates are reported, timezone hint, warning about unsaved panels

### 2.2.0 (2026-11-12)
- (ticaki) web panel: smartphone models `web-p` and `web-l`, portrait layout for all cards, popups and screensavers on us-p/web-p, hardware buttons can be switched off, many layout fixes; no crash on the first connection, less log noise without browser
- (ticaki) admin: export and import the configuration of one panel (merge or overwrite completely, conflict review, secrets only on request)
- (ticaki) screensaver: long press action and own icon font for indicators (TFT 6.0.9), new indicator action "values to cycle through", trash date templates `text.trash.next` / `text.trash.afterNext`
- (ticaki) screensaver: an indicator only acts when an action is configured, the option "indicators act as buttons" is removed - **check your indicators**
- (ticaki) screensaver: only changed values are sent, a press shows its result at once; fixes for TFT 6.0.8/6.1.0 indicators, Bright Sky sunrise, battery icons and the color scale in the admin
- (ticaki) admin: colors follow the color theme of the instance, developer tab with "Create test states"
- (ticaki) navigation: a missing target opens the system page "Nav error"; the service page no longer mixes up the navigation of several panels
- (ticaki) panel: Tasmota safeboot is detected, messages longer than 1017 bytes are reported, long headlines are shortened with …
- (ticaki) fixes: status datapoint of new alarm/unlock pages, emulator detection, less info logging at startup
- (tt-tom17) admin: QR, chart, trash and menu page editors reworked (clearer labels, menu preview like the panel, trash "Apply selection" fills the page completely), remaining fixed texts translated
- (tt-tom17) pageQR: WPA2 is the default wifi encryption

## License

MIT License

Copyright (c) 2024-2026 ticaki <github@renopoint.de>  
Copyright (c) 2024-2026 tt-tom17 <tgb@kabelmail.de>

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