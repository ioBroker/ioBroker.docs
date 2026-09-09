---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: dz3MPzIYcKLeDV62P+U0th7ufAFURanRp24L1wPkkpQ=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# ioBroker Sonoff

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Vergleich von ioBroker-Adaptern unter Verwendung des MQTT-Protokolls

Wenn Sie nur Tasmotas haben, das das MQTT-Protokoll unterstützt, dann wählen Sie`ioBroker.sonoff` Für andere Szenarien sollten Sie die verschiedenen Optionen in Betracht ziehen:

| Besonderheit                                        | ioBroker.sonoff           | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Broker-Modus) | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Client-Modus) | [ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
| --------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Verfügt über einen integrierten MQTT-Broker.        | Ja                        | Ja                                                                            | NEIN                                                                          | NEIN                                                                   |
| Leitet Nachrichten an andere MQTT-Abonnenten weiter | NEIN!!!                   | Ja                                                                            | nicht zutreffend                                                              | nicht zutreffend                                                       |
| Externer MQTT-Broker                                | optional (Brückenmodus)   | nicht unterstützt                                                             | erforderlich                                                                  | erforderlich                                                           |
| Tasmota MQTT-Nachrichten an ioBroker-Objekte        | intelligente Verarbeitung | 1:1-Verarbeitung aller Nachrichten                                            | 1:1-Verarbeitung abonnierter Nachrichten                                      | 1:1-Verarbeitung abonnierter Nachrichten                               |
| Nicht-Tasmota-MQTT-Nachrichten an ioBroker-Objekte  | keine Verarbeitung        | 1:1-Verarbeitung aller Nachrichten                                            | 1:1-Verarbeitung abonnierter Nachrichten                                      | 1:1-Verarbeitung abonnierter Nachrichten                               |
| ioBroker-Werte als MQTT-Nachrichten veröffentlichen | keiner                    | konfigurierte Teilbäume                                                       | konfigurierte Teilbäume                                                       | individuell konfigurierte Werte                                        |

## Verwendung

Dieser Adapter kommuniziert über MQTT mit Sonoff-Geräten mit Tasmota-Firmware oder ESP-Geräten.

Folgende Themen werden erwartet:

- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `cmnd/DeviceNAME/POWERx`
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/Temperature`
- `/DeviceNAME/BM280/Humidity`
- `/DeviceNAME/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/DeviceNAME/BM280/Vcc`
- `/DeviceNAME/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/DeviceNAME/BM280/RSSI`
- `/DeviceNAME/BM280/POWER`
- `/DeviceNAME/BM280/POWER1`
- `/DeviceNAME/BM280/POWER2`
- `/DeviceNAME/BM280/POWER3`
- `/DeviceNAME/BM280/POWER4`
- `/DeviceNAME/BM280/Switch1`
- `/DeviceNAME/BM280/Switch2`
- `/DeviceNAME/BM280/Total`
- `/DeviceNAME/BM280/Today`
- `/DeviceNAME/BM280/heute`
- `/DeviceNAME/BM280/Yesterday`
- `/DeviceNAME/BM280/gestern`
- `/DeviceNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/DeviceNAME/BM280/Voltage`
- `/DeviceNAME/BM280/Spannung`
- `/DeviceNAME/BM280/Current`
- `/DeviceNAME/BM280/Strom`
- `/DeviceNAME/BM280/Punkt`
- `/DeviceNAME/BM280/Counter1`
- `/DeviceNAME/BM280/Counter2`
- `/DeviceNAME/BM280/Counter3`
- `/DeviceNAME/BM280/Counter4`
- `/DeviceNAME/BM280/Pressure`
- `/DeviceNAME/BM280/SeaPressure`
- `/DeviceNAME/BM280/Druck`
- `/DeviceNAME/BM280/Approx. Altitude`
- `/DeviceNAME/BM280/Module`
- `/DeviceNAME/BM280/Version`
- `/DeviceNAME/BM280/Hostname`
- `/DeviceNAME/BM280/IPAddress`
- `/DeviceNAME/BM280/IPaddress`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/CarbonDioxide`
- `/DeviceNAME/DHT11/Illuminance`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/Latitude`
- `/DeviceNAME/SDS0X1/Longitude`
- `/DeviceNAME/SR04/Distance`

**Hinweis** : Die Liste kann problemlos erweitert werden. Bitte senden Sie uns Ihre Anfrage.`Pull Requests` oder _Debug-Daten_ für unbekannte Zustände an den Entwickler (über ein Ticket) weiterleiten.

## Brückenmodus

Standardmäßig verwendet der Adapter einen integrierten TCP-Broker, mit dem sich Tasmota-Geräte direkt verbinden. Wenn Sie bereits einen dedizierten MQTT-Broker (z. B. Mosquitto) verwenden, können Sie stattdessen den Bridge-Modus nutzen – der Adapter verbindet sich dann als Client mit Ihrem bestehenden Broker.

### Konfiguration

Aktivieren Sie in den Adaptereinstellungen **die Option „Externen MQTT-Broker verwenden“** und geben Sie **die URL des externen Brokers** auf die Adresse Ihres Brokers ein, z. B.`mqtt://192.168.1.10:1883` oder einfach`192.168.1.10:1883` Optional können Sie Benutzername und Passwort festlegen. Wenn diese Option deaktiviert ist (oder keine URL eingegeben wird), wird der integrierte Broker wie zuvor gestartet.

**Die Option „Zu abonnierende Themen“** definiert, welche Themen der Adapter standardmäßig überwacht.`tele/#, stat/#, +/tele/+, +/stat/+` Erweitern Sie diese Liste, wenn Ihre Geräte andere Themen verwenden, z. B. OpenBeken-Geräte, die Daten an folgende Adresse veröffentlichen:`<devicename>/...` oder ein globales Präfix im vollständigen Thema (`myPrefix/tele/#` ).

Optional können Sie die beim Broker verwendete **Client-ID** festlegen (Standardwert).`iobroker_sonoff_<instance>` ), das **Keepalive-** Intervall und **die Clean-Session** . Deaktivieren Sie die Clean-Session, wenn der Broker die Nachrichten der Geräte speichern soll, während der Adapter nicht ausgeführt wird.

### Vollständige Themenstrukturen

Das übliche Tasmota`FullTopic` Einstellungen werden gerätespezifisch unterstützt und automatisch erkannt, Befehle werden in derselben Struktur zurückgesendet:

| FullTopic                      | Beispiel                  | Befehl                    |
| ------------------------------ | ------------------------- | ------------------------- |
| `%prefix%/%topic%/` (Standard) | `tele/lamp/STATE`         | `cmnd/lamp/POWER`         |
| `%topic%/%prefix%/`            | `lamp/tele/STATE`         | `lamp/cmnd/POWER`         |
| `gateway/%prefix%/%topic%/`    | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/`    | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Verschachtelte Themen wie`tele/house/floor1/lamp/STATE` Das funktioniert auch. Ein festes Präfix vor dem vollständigen Topic (die letzten beiden Zeilen, z. B. für mehrere Gateways auf einem Broker) wird nur erkannt, wenn die Subscriptions es abdecken. Fügen Sie also z. B. Folgendes hinzu:`gateway/tele/#, gateway/stat/#` zu **den Themen, die Sie abonnieren möchten** . Dasselbe gilt für die`%topic%/%prefix%/` Struktur, die bedeckt ist von`+/tele/+, +/stat/+` standardmäßig.

### Verschlüsselte Verbindungen

Verwenden`mqtts://broker:8883` (oder`wss://` ) als URL. Deaktivieren Sie bei selbstsignierten Zertifikaten **die Option „Zertifikat des Brokers prüfen“** oder geben Sie den Pfad zu Ihrem **CA-Zertifikat** an. Falls der Broker Clientzertifikate benötigt, können Sie auch die Pfade zum **Clientzertifikat** und zum **Clientschlüssel** angeben. Die Dateien werden aus dem Dateisystem des ioBroker-Hosts gelesen.

### Gerätebenennung

Im Bridge-Modus kann der Adapter die MQTT CONNECT-Pakete der Geräte nicht sehen (Einschränkung des MQTT-Protokolls), daher wird der Name eines Geräts aus seinen Nachrichten entnommen:

1. `MqttClient` aus`stat/<topic>/STATUS6` - Dies ist die MQTT-Client-ID, damit die Geräte die gleichen Namen wie beim integrierten Broker erhalten. Der Adapter fordert diese Informationen an (`cmnd/<topic>/Status 6` ) sobald ein unbekanntes Gerät auftaucht.
2. `Hostname` aus`tele/<topic>/STATE` ,`tele/<topic>/INFO2` oder`stat/<topic>/STATUS5` , wenn das Gerät die Statusanfrage nicht beantwortet.
3. Das Thema selbst, falls innerhalb von 30 Sekunden keine Antwort eingeht (z. B. bei Geräten mit benutzerdefinierter Firmware).

Ein Gerät wird nur dann umbenannt, wenn der neue Name aus derselben oder einer besseren Quelle stammt, sodass die Objekte nicht ständig zwischen den Namen hin und her wechseln. Wird ein Gerät in Tasmota umbenannt, benennt der Adapter die entsprechenden ioBroker-Objekte um, Referenzen in anderen Adaptern (History, VIS usw.) müssen jedoch manuell angepasst werden.

Da der externe Broker auch während des Neustarts des Adapters weiterläuft, wiederholen die Geräte ihre Boot-Meldungen nicht.`INFO.Hostname` ,`INFO.IPAddress` Und`INFO.Version` Der Adapter fordert sie an (`cmnd/<topic>/Status 5` Und`cmnd/<topic>/Status 2` ) wenn ein Gerät zum ersten Mal gesehen wird.`Module` (von INFO1) kann nicht angefordert werden und bleibt leer.

### Verfügbarkeit

Mit dem integrierten Broker`alive` Der Status folgt der TCP-Verbindung des Geräts. Im Bridge-Modus wird das letzte Thema (`tele/<topic>/LWT` ) wird stattdessen verwendet:`Online` Sets`alive` wahr,`Offline` zu falsch.

## Automatische Objekterstellung

In der Webkonfiguration können Sie festlegen, welche MQTT-Telegramme die neuen Objekte erzeugen, die nicht zu den Standarddatenpunkten gehören:

- `TELE_SENSOR` - erstellt Objekte aus`tele/xxx/SENSOR` Telegramme
- `TELE_STATE` - erstellt Objekte aus`tele/xxx/STATE` Telegramme
- `STAT_RESULT` - erstellt Objekte aus`stat/xxx/RESULT` Telegramme

Normalerweise sollte TELE\_SENSOR für die meisten Benutzer ausreichend sein.

- `Create object tree` erstellt Objekte als Baumstruktur

**Achtung!** Diese Option beschädigt Ihre Sonoff-Objektstruktur! Sie müssen alle Speichereinstellungen neu vornehmen. Speichern Sie die Objektstruktur als JSON-Datei, um Ihre ursprüngliche Struktur wiederherstellen zu können. Am besten stoppen Sie den Adapter, löschen alle Objekte unter „sonoff“ und starten den Adapter anschließend neu.

## Flaggen für LED-Controller

Die Moduszustände werden nur dann erstellt, wenn das Gerät einen der folgenden Zustände aufweist:

- `Red` ,`Green` ,`Blue` ,`WW` ,`CW` ,`Color` ,`RGB_POWER` ,`WW_POWER` ,`CW_POWER` ,`Hue` ,`Saturation`

Staaten:

- `modeLedExor` - exor für weiße LEDs und farbige LEDs => Wenn die weißen LEDs eingeschaltet sind, sind die farbigen LEDs ausgeschaltet und umgekehrt (Standardwert: true)
- `modeReadColors` - Farbinformationen von MQTT auslesen (Standardwert: false)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.0 (2026-09-07)
* (@patricknitsch) Added Device Manager for existing devices

### 4.0.0 (2026-08-13)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (stony2k) Added bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fixed the alive state object not being created (warning "has no existing object")
* (@GermanBluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (@GermanBluefox/baetzst) The MAC address and the other network and firmware information of a device are stored as data points (`INFO.Mac`, `INFO.Gateway`, `INFO.Hardware`, ...) (#513)
* (@GermanBluefox) Server mode: the adapter requests `Status 5` and `Status 2` from a device with its first message, so the INFO states are filled even if the device did not reboot
* (@GermanBluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (@GermanBluefox) Bridge mode: the topics to subscribe are configurable now, and nested full topics as well as OpenBeken topics are supported
* (@GermanBluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (@GermanBluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (@GermanBluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (@GermanBluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (@GermanBluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (@GermanBluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (@GermanBluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Added support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Added PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers
* (@GermanBluefox) Breaking: a minimal supported Node.js version is now 22

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use `cmnd/` prefix instead of `tele/` prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fixed shutter command mapping to use the correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fixed IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Added Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Added support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fixed POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fixed pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Added support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fixed RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fixed the deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Added support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Updated admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Added support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Added meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Added a configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Added Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fixed a write flag for all Switch datapoints to enable proper control from ioBroker

### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.sonoff/blob/master/CHANGELOG_OLD.md)

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