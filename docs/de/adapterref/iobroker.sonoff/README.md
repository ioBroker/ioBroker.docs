---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: Ge7msvsKgnKuu8OqBfenaEgv5YtfGW0hyL376lwHpUI=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![Test und Freigabe](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Vergleich von ioBroker-Adaptern unter Verwendung des MQTT-Protokolls
Wenn Sie nur Tasmotas verwenden, das das MQTT-Protokoll unterstützt, wählen Sie `ioBroker.sonoff`.
Für andere Szenarien sollten Sie die verschiedenen Optionen in Betracht ziehen:

| Funktion | ioBroker.sonoff | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Broker-Modus) | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Client-Modus) | [ioBroker.mqtt-client](https://github.com/ioBroker/ioBroker.mqtt/)](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Verfügt über einen integrierten MQTT-Broker | ja | ja | nein | nein |
| Leitet Nachrichten an andere MQTT-Abonnenten weiter | NEIN!!! | ja | nicht zutreffend | nicht zutreffend |
| Externer MQTT-Broker | optional (Bridge-Modus) | nicht unterstützt | erforderlich | erforderlich |
| Tasmota MQTT-Nachrichten an ioBroker-Objekte | Intelligente Verarbeitung | 1:1-Verarbeitung aller Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten |
| Nicht-Tasmota-MQTT-Nachrichten an ioBroker-Objekte | Keine Verarbeitung | 1:1-Verarbeitung aller Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten |
| ioBroker-Werte als MQTT-Nachrichten veröffentlichen | keine | konfigurierte Unterbäume | konfigurierte Unterbäume | individuell konfigurierte Werte |

## Verwendung
Dieser Adapter kommuniziert über MQTT mit Sonoff-Geräten mit Tasmota-Firmware oder ESP-Geräten.

Folgende Themen werden erwartet:

- `tele/Gerätename/Bundesland`
- `tele/Gerätename/Sensor`
- `tele/Gerätename/INFOx`
- `tele/Gerätename/ENERGIE`
- `cmnd/Gerätename/POWERx`
- `stat/DeviceNAME/POWERx`
- `/Gerätename/BM280/Temperature`
- `/Gerätename/BM280/Luftfeuchtigkeit`
- `/Gerätename/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/Gerätename/BM280/Vcc`
- `/Gerätename/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/Gerätename/BM280/RSSI`
- `/Gerätename/BM280/POWER`
- `/Gerätename/BM280/POWER1`
- `/Gerätename/BM280/POWER2`
- `/Gerätename/BM280/POWER3`
- `/Gerätename/BM280/POWER4`
- `/Gerätename/BM280/Switch1`
- `/Gerätename/BM280/Switch2`
- `/Gerätename/BM280/Gesamt`
- `/Gerätename/BM280/Heute`
- `/Gerätename/BM280/heute`
- `/Gerätename/BM280/Gestern`
- `/Gerätename/BM280/gestern`
- `/Gerätename/BM280/Faktor`
- `/Gerätename/BM280/Faktor`
- `/Gerätename/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/Gerätename/BM280/Spannung`
- `/DeviceNAME/BM280/Spannung`
- `/Gerätename/BM280/Aktuell`
- `/Gerätename/BM280/Strom`
- `/Gerätename/BM280/Punkt`
- `/Gerätename/BM280/Zähler1`
- `/Gerätename/BM280/Zähler2`
- `/Gerätename/BM280/Zähler3`
- `/Gerätename/BM280/Zähler4`
- `/Gerätename/BM280/Druck`
- `/Gerätename/BM280/SeaPressure`
- `/Gerätename/BM280/Druck`
- `/Gerätename/BM280/Ungefähre Höhe`
- `/Gerätename/BM280/Modul`
- `/Gerätename/BM280/Version`
- `/Gerätename/BM280/Hostname`
- `/Gerätename/BM280/IP-Adresse`
- `/Gerätename/BM280/IP-Adresse`
- `/Gerätename/BM280/Neustartgrund`
- `/Gerätename/BM280/Kohlendioxid`
- `/Gerätename/DHT11/Beleuchtungsstärke`
- `/Gerätename/SonoffSC/Light`
- `/Gerätename/SonoffSC/Noise`
- `/Gerätename/SonoffSC/AirQuality`
- `/Gerätename/SDS0X1/PM2.5`
- `/Gerätename/SDS0X1/PM10`
- `/Gerätename/SDS0X1/UV-Level`
- `/Gerätename/SDS0X1/Latitude`
- `/Gerätename/SDS0X1/Längengrad`
- `/Gerätename/SR04/Distanz`

**Hinweis:** Die Liste kann problemlos erweitert werden. Bitte senden Sie `Pull Requests` oder *Debug-Daten* für unbekannte Zustände an den Entwickler (über ein Issue).

## Brückenmodus
Standardmäßig verwendet der Adapter einen integrierten TCP-Broker, mit dem sich Tasmota-Geräte direkt verbinden. Wenn Sie bereits einen dedizierten MQTT-Broker (z. B. Mosquitto) verwenden, können Sie stattdessen den Bridge-Modus nutzen – der Adapter verbindet sich dann als Client mit Ihrem bestehenden Broker.

### Konfiguration
Aktivieren Sie in den Adaptereinstellungen **Externen MQTT-Broker verwenden** und geben Sie als **Externe Broker-URL** Ihre Broker-Adresse ein, z. B. `mqtt://192.168.1.10:1883` oder einfach `192.168.1.10:1883`. Optional können Sie Benutzername und Passwort festlegen. Wenn die Option deaktiviert ist (oder keine URL angegeben wird), wird wie bisher der integrierte Broker gestartet.

**Zu abonnierende Themen** definiert, auf welche Themen der Adapter hört, standardmäßig `tele/#, stat/#, +/tele/+, +/stat/+`. Erweitern Sie diese Liste, wenn Ihre Geräte andere Themen verwenden, z. B. OpenBeken-Geräte, die auf `<devicename>/...` veröffentlichen, oder ein globales Präfix im vollständigen Thema (`myPrefix/tele/#`).

Optional können Sie die **Client-ID**, die am Broker verwendet wird (Standard: `iobroker_sonoff_<instance>`), das **Keepalive**-Intervall und die **Clean Session** festlegen. Deaktivieren Sie die Clean Session, wenn der Broker die Nachrichten der Geräte speichern soll, während der Adapter nicht ausgeführt wird.

### Vollständige Themenstrukturen
Die üblichen Tasmota-Einstellungen `FullTopic` werden unterstützt und gerätespezifisch automatisch erkannt; Befehle werden in derselben Struktur zurückgesendet:

| Vollständiges Thema | Beispiel | Befehl |
|---|---|---|
| `%prefix%/%topic%/` (Standard) | `tele/lamp/STATE` | `cmnd/lamp/POWER` |
| `gateway/%prefix%/%topic%/` | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Verschachtelte Themen wie `tele/house/floor1/lamp/STATE` funktionieren ebenfalls. Ein festes Präfix vor dem vollständigen Thema (die letzten beiden Zeilen, z. B. für mehrere Gateways auf einem Broker) wird nur erkannt, wenn es von den Abonnements abgedeckt wird. Fügen Sie daher z. B. `gateway/tele/#, gateway/stat/#` zu den **zu abonnierenden Themen** hinzu. Dasselbe gilt für die Struktur `%topic%/%prefix%/`, die standardmäßig von `+/tele/+, +/stat/+` abgedeckt wird.

### Verschlüsselte Verbindungen
Verwenden Sie `mqtts://broker:8883` (oder `wss://`) als URL. Deaktivieren Sie bei selbstsignierten Zertifikaten **Broker-Zertifikat prüfen** oder geben Sie den Pfad zu Ihrem **CA-Zertifikat** an. Falls der Broker Client-Zertifikate benötigt, können Sie auch die Pfade zum **Client-Zertifikat** und zum **Client-Schlüssel** angeben. Die Dateien werden aus dem Dateisystem des ioBroker-Hosts gelesen.

### Gerätebenennung
Im Bridge-Modus kann der Adapter die MQTT CONNECT-Pakete der Geräte nicht sehen (Einschränkung des MQTT-Protokolls), daher wird der Name eines Geräts aus seinen Nachrichten entnommen:

1. `MqttClient` aus `stat/<topic>/STATUS6` – dies ist die MQTT-Client-ID, sodass die Geräte dieselben Namen wie beim integrierten Broker erhalten. Der Adapter fordert diese Information (`cmnd/<topic>/Status 6`) an, sobald ein unbekanntes Gerät auftaucht.
2. `Hostname` aus `tele/<topic>/STATE`, `tele/<topic>/INFO2` oder `stat/<topic>/STATUS5`, falls das Gerät nicht auf die Statusanfrage antwortet.
3. Das Thema selbst, wenn innerhalb von 30 Sekunden keine Nachricht eingeht (z. B. bei Geräten mit benutzerdefinierter Firmware).

Ein Gerät wird nur dann umbenannt, wenn der neue Name aus derselben oder einer besseren Quelle stammt, sodass die Objekte nicht ständig zwischen den Namen hin und her wechseln. Wird ein Gerät in Tasmota umbenannt, benennt der Adapter die entsprechenden ioBroker-Objekte um, Referenzen in anderen Adaptern (History, VIS usw.) müssen jedoch manuell angepasst werden.

Da der externe Broker auch nach dem Neustart des Adapters weiterläuft, wiederholen die Geräte ihre Boot-Meldungen nicht. Um die Felder `INFO.Hostname`, `INFO.IPAddress` und `INFO.Version` zu füllen, fordert der Adapter diese (`cmnd/<topic>/Status 5` und `cmnd/<topic>/Status 2`) beim ersten Erkennen eines Geräts an. `Module` (aus INFO1) kann nicht angefordert werden und bleibt leer.

### Verfügbarkeit
Beim integrierten Broker folgt der Status `alive` der TCP-Verbindung des Geräts. Im Bridge-Modus wird stattdessen das letzte Will-Topic (`tele/<topic>/LWT`) verwendet: `Online` setzt `alive` auf „true“ und `Offline` auf „false“.

## Automatische Objekterstellung
In der Webkonfiguration können Sie festlegen, welche MQTT-Telegramme die neuen Objekte erzeugen, die nicht zu den Standarddatenpunkten gehören:

* `TELE_SENSOR` - erstellt Objekte aus `tele/xxx/SENSOR`-Telegrammen
* `TELE_STATE` - erstellt Objekte aus `tele/xxx/STATE`-Telegrammen
* `STAT_RESULT` - erstellt Objekte aus `stat/xxx/RESULT`-Telegrammen

Normalerweise sollte TELE_SENSOR für die meisten Benutzer ausreichend sein.

* `Objektbaum erstellen` erzeugt Objekte als Baumstruktur

**Achtung!** Diese Option beschädigt Ihre Sonoff-Objektstruktur! Sie müssen alle Speichereinstellungen neu vornehmen. Speichern Sie die Objektstruktur als JSON-Datei, um Ihre ursprüngliche Struktur wiederherstellen zu können. Am besten stoppen Sie den Adapter, löschen alle Objekte unter Sonoff und starten den Adapter anschließend neu.

## Flaggen für LED-Controller
Die Moduszustände werden nur dann erstellt, wenn das Gerät einen der folgenden Zustände aufweist:

- `Rot`, `Grün`, `Blau`, `WW`, `CW`, `Farbe`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Farbton`, `Sättigung`

Staaten:

* `modeLedExor` - Exor für weiße und farbige LEDs => Wenn die weißen LEDs eingeschaltet sind, sind die farbigen LEDs ausgeschaltet und umgekehrt (Standardwert: true)
* `modeReadColors` - Farbinformationen von MQTT auslesen (Standardwert: false)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 4.0.0 (2026-08-13)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (stony2k) Add bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fix alive state object not being created (warning "has no existing object")
* (bluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (bluefox/baetzst) The MAC address and the other network and firmware information of a device are stored as data points (`INFO.Mac`, `INFO.Gateway`, `INFO.Hardware`, ...) (#513)
* (bluefox) Server mode: the adapter requests `Status 5` and `Status 2` from a device with its first message, so the INFO states are filled even if the device did not reboot
* (bluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (bluefox) Bridge mode: the topics to subscribe are configurable now and nested full topics as well as OpenBeken topics are supported
* (bluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (bluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (bluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (bluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (bluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (bluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (bluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Add support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Add PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers
* (@GermanBluefox) Breaking: minimal supported Node.js version is now 22

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use cmnd/ prefix instead of tele/ prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fix shutter command mapping to use correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fix IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Add Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Add support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fix POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fix pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Add support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fix RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fix deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Add support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Update admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Add support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Add meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Add configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Add Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fix write flag for all Switch datapoints to enable proper control from ioBroker

### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

### 3.1.2 (2024-08-17)
* (mattreim) updated packages

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2026, bluefox <dogafox@gmail.com>

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