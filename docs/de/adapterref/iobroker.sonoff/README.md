---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: STvU/5u80kIYW6JHWnKFtNkKbiijpC9qTXAxRKNN4Ns=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](https://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.sonoff.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# ioBroker Sonoff

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Vergleich von ioBroker-Adaptern unter Verwendung des MQTT-Protokolls

Wenn Sie nur Tasmotas haben, das das MQTT-Protokoll unterstützt, dann wählen Sie `ioBroker.sonoff` Für andere Szenarien sollten Sie die verschiedenen Optionen in Betracht ziehen:

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
- `tele/DeviceNAME/SWITCH` (Fernbedienungen, siehe [Automatische Objekterstellung](#auto-creation-of-objects) )
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

**Hinweis** : Die Liste kann problemlos erweitert werden. Bitte senden Sie uns Ihre Anfrage. `Pull Requests` oder _Debug-Daten_ für unbekannte Zustände an den Entwickler senden (über ein Ticket). Eigene Themen (z. B. Regeln oder Skripte auf dem Gerät) können in den Einstellungen hinzugefügt werden, siehe `Additional topics` unten.

## Senden eines beliebigen Befehls (`Backlog`)

Jedes Gerät hat den Zustand `Backlog` Sein Text wird gesendet an `cmnd/<topic>/Backlog` Es kann sich also um jeden beliebigen Tasmota-Befehl handeln, auch um Befehle ohne eigenen Zustand, z. B. `POWER1 TOGGLE` oder `POWER1 BLINK` Mehrere Befehle sind durch getrennt `;`: `POWER1 ON; Delay 100; POWER1 OFF` Die Gerätekarte im Geräte-Manager zeigt es als Textfeld an.

Der `POWERx` Die Zustände bleiben boolesch (ein/aus), sodass Visualisierungen, Skripte und Verläufe weiterhin funktionieren. `Backlog` für `TOGGLE` oder `BLINK` Die

## Verschlüsselte Verbindungen (MQTTS)

Bei **Secure (MQTTS)** akzeptiert der integrierte Server nur TLS-Verbindungen. Üblicherweise Port 2020. `8883` Da hierfür ein Port verwendet wird, muss dieser ebenfalls festgelegt werden. Die Zertifikate werden aus den Zertifikaten von ioBroker ausgewählt (Admin: Einstellungen → Zertifikate). Leere Felder verwenden die selbstsignierten Standardzertifikate von ioBroker. Können die Zertifikate nicht gelesen werden, wird der Server nicht gestartet, und der Grund dafür wird im Protokoll angegeben.

Auf der Tasmota-Seite:

- TLS ist nur in der `tasmota32` Und `tasmota-zbbridge` ESP8266-Geräte benötigen einen eigenen Build. `USE_MQTT_TLS` Siehe die [Tasmota TLS-Dokumentation](https://tasmota.github.io/docs/TLS/) .
- `SetOption103 1` aktiviert TLS, `MqttPort 8883` legt den Port fest.
- `SetOption132 1` Tasmota prüft den Fingerabdruck des Servers anstelle der integrierten Zertifizierungsstellen (Let's Encrypt, Amazon). Dies ist für selbstsignierte Zertifikate erforderlich, z. B. die Standardzertifikate von ioBroker. Tasmota ermittelt den Fingerabdruck bei der ersten Verbindung.
- Die Suche nach Geräten im Geräte-Manager schreibt `SetOption103 1; SetOption132 1` automatisch, wenn der Server (oder im Bridge-Modus der externe Broker) `mqtts://`) verwendet TLS.

Ein Gerät ohne TLS am MQTTS-Port wird einmal pro Stunde gemeldet (`TLS connection from <address> failed`), werden die weiteren Versuche als Debug-Versuche protokolliert.

Informationen zur Verbindung mit einem externen Broker finden Sie [unter Verschlüsselte Verbindungen](#encrypted-connections) im Bridge-Modus.

## Brückenmodus

Standardmäßig verwendet der Adapter einen integrierten TCP-Broker, mit dem sich Tasmota-Geräte direkt verbinden. Wenn Sie bereits einen dedizierten MQTT-Broker (z. B. Mosquitto) verwenden, können Sie stattdessen den Bridge-Modus nutzen – der Adapter verbindet sich dann als Client mit Ihrem bestehenden Broker.

### Konfiguration

Aktivieren Sie in den Adaptereinstellungen **die Option „Externen MQTT-Broker verwenden“** und geben Sie **die URL des externen Brokers** auf die Adresse Ihres Brokers ein, z. B. `mqtt://192.168.1.10:1883` oder einfach `192.168.1.10:1883` Optional können Sie Benutzername und Passwort festlegen. Wenn diese Option deaktiviert ist (oder keine URL eingegeben wird), wird der integrierte Broker wie zuvor gestartet.

**Anmeldeinformationen aus dem zentralen Speicher:** Anstatt Benutzername und Passwort einzugeben, können Sie **„Anmeldeinformationen: Aus dem Anmeldeinformationsspeicher** “ auswählen – sowohl für den integrierten Server als auch für den externen Broker – und Anmeldeinformationen im Format „Benutzername & Passwort“ festlegen, die einmalig in den Systemeinstellungen des Administrators verwaltet werden (Einstellungen → Anmeldeinformationen, Administratorversion 7.9.0 oder neuer). Dies ist hilfreich, wenn mehrere Adapter oder Instanzen dieselbe MQTT-Anmeldung verwenden. Der Adapter liest die Anmeldeinformationen beim Start und startet neu, falls diese geändert werden. Können die Anmeldeinformationen nicht gelesen werden, wird der MQTT-Server bzw. die Verbindung nicht gestartet und ein Fehler protokolliert.

**Die Option „Zu abonnierende Themen“** definiert, welche Themen der Adapter standardmäßig überwacht. `tele/#, stat/#, +/tele/+, +/stat/+` Erweitern Sie diese Liste, wenn Ihre Geräte andere Themen verwenden, z. B. OpenBeken-Geräte, die Daten an folgende Adresse veröffentlichen: `<devicename>/...` oder ein globales Präfix im vollständigen Thema (`myPrefix/tele/#`).

Optional können Sie die beim Broker verwendete **Client-ID** festlegen (Standardwert). `iobroker_sonoff_<instance>`), das **Keepalive-** Intervall und **die Clean-Session** . Deaktivieren Sie die Clean-Session, wenn der Broker die Nachrichten der Geräte speichern soll, während der Adapter nicht ausgeführt wird.

### Vollständige Themenstrukturen

Das übliche Tasmota `FullTopic` Einstellungen werden gerätespezifisch unterstützt und automatisch erkannt, Befehle werden in derselben Struktur zurückgesendet:

| FullTopic                      | Beispiel                  | Befehl                    |
| ------------------------------ | ------------------------- | ------------------------- |
| `%prefix%/%topic%/` (Standard) | `tele/lamp/STATE`         | `cmnd/lamp/POWER`         |
| `%topic%/%prefix%/`            | `lamp/tele/STATE`         | `lamp/cmnd/POWER`         |
| `gateway/%prefix%/%topic%/`    | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/`    | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Verschachtelte Themen wie `tele/house/floor1/lamp/STATE` Das funktioniert auch. Ein festes Präfix vor dem vollständigen Topic (die letzten beiden Zeilen, z. B. für mehrere Gateways auf einem Broker) wird nur erkannt, wenn die Subscriptions es abdecken. Fügen Sie also z. B. Folgendes hinzu: `gateway/tele/#, gateway/stat/#` zu **den Themen, die Sie abonnieren möchten** . Dasselbe gilt für die `%topic%/%prefix%/` Struktur, die bedeckt ist von `+/tele/+, +/stat/+` standardmäßig.

### Verschlüsselte Verbindungen

Verwenden `mqtts://broker:8883` (oder `wss://`) als URL. Deaktivieren Sie bei selbstsignierten Zertifikaten **die Option „Zertifikat des Brokers prüfen“** oder geben Sie den Pfad zu Ihrem **CA-Zertifikat** an. Falls der Broker Clientzertifikate benötigt, können Sie auch die Pfade zum **Clientzertifikat** und zum **Clientschlüssel** angeben. Die Dateien werden aus dem Dateisystem des ioBroker-Hosts gelesen.

### Gerätebenennung

Im Bridge-Modus kann der Adapter die MQTT CONNECT-Pakete der Geräte nicht sehen (Einschränkung des MQTT-Protokolls), daher wird der Name eines Geräts aus seinen Nachrichten entnommen:

1. `MqttClient` aus `stat/<topic>/STATUS6` - Dies ist die MQTT-Client-ID, damit die Geräte die gleichen Namen wie beim integrierten Broker erhalten. Der Adapter fordert diese Informationen an (`cmnd/<topic>/Status 6`) sobald ein unbekanntes Gerät auftaucht.
2. `Hostname` aus `tele/<topic>/STATE`, `tele/<topic>/INFO2` oder `stat/<topic>/STATUS5`, wenn das Gerät die Statusanfrage nicht beantwortet.
3. Das Thema selbst, falls innerhalb von 30 Sekunden keine Antwort eingeht (z. B. bei Geräten mit benutzerdefinierter Firmware).

Ein Gerät wird nur dann umbenannt, wenn der neue Name aus derselben oder einer besseren Quelle stammt, sodass die Objekte nicht ständig zwischen den Namen hin und her wechseln. Wird ein Gerät in Tasmota umbenannt, benennt der Adapter die entsprechenden ioBroker-Objekte um, Referenzen in anderen Adaptern (History, VIS usw.) müssen jedoch manuell angepasst werden.

Da der externe Broker auch während des Neustarts des Adapters weiterläuft, wiederholen die Geräte ihre Startmeldungen nicht. `INFO.Hostname`, `INFO.IPAddress` Und `INFO.Version` Der Adapter fordert sie an (`cmnd/<topic>/Status 5` Und `cmnd/<topic>/Status 2`) wenn ein Gerät zum ersten Mal gesehen wird. `Module` (von INFO1) kann nicht angefordert werden und bleibt leer.

### Verfügbarkeit

Mit dem integrierten Broker `alive` Der Status folgt der TCP-Verbindung des Geräts. Im Bridge-Modus wird das letzte Thema (`tele/<topic>/LWT`) wird stattdessen verwendet: `Online` Sets `alive` wahr `Offline` zu falsch.

## Automatische Objekterstellung

In der Webkonfiguration können Sie festlegen, welche MQTT-Telegramme die neuen Objekte erzeugen, die nicht zu den Standarddatenpunkten gehören:

- `TELE_SENSOR` - erstellt Objekte aus `tele/xxx/SENSOR` Telegramme
- `TELE_STATE` - erstellt Objekte aus `tele/xxx/STATE` Telegramme
- `STAT_RESULT` - erstellt Objekte aus `stat/xxx/RESULT` Telegramme
- `TELE_SWITCH` - erstellt Objekte aus `tele/xxx/SWITCH` Telegramme von Fernbedienungen (standardmäßig aktiviert)

Normalerweise sollte TELE\_SENSOR für die meisten Benutzer ausreichend sein.

**Fernbedienungen:** Das Berry-Skript [Tasmota-eWeLinkRemote](https://github.com/Flobul/Tasmota-eWeLinkRemote) (eWeLink R5, S-MATE) sendet jeden Tastendruck als `tele/xxx/SWITCH = {"Button1":{"Action":"single"},"Signal":-61,"DeviceId":"5AC87680",...}` Es wird gespeichert in `Button1_Action` (`single`, `double` oder `hold`) Und `Signal`, `DeviceId`, `DeviceType`, `Sequence`, `Timestamp` Jeder Druckvorgang wird aufgezeichnet, und auch die gleiche Handlung wiederholt sich. `DeviceId` wird geschrieben vor `ButtonX_Action` So kann ein durch den Knopf ausgelöstes Skript auslesen, welche Fernbedienung gedrückt wurde.

**Zusätzliche Themen:** Werte zu anderen als den oben genannten Themen werden ignoriert, es sei denn, der letzte Teil des Themas ist aufgeführt. `Additional topics` (durch Kommas getrennt, `*` (als Platzhalter, Groß-/Kleinschreibung wird ignoriert), z. B. `PIR*, Motion`:

- Ein einfacher Wert erzeugt einen schreibgeschützten Zustand mit dem Namen des Themas: `stat/xxx/PIR1 = ON` erstellt `PIR1` Der Typ wird anhand des ersten Wertes erkannt: einer Zahl (`1`, `25.4`), ein/aus (`ON`, `OFF`) oder ein Text. Ein bestehender Zustand behält seinen Typ, Werte, die nicht passen (z. B. `TOGGLE` (für Ein/Aus) werden ignoriert.
- JSON wird wie folgt verarbeitet: `tele/xxx/SENSOR`, sondern unter dem Namen des Themas: `tele/xxx/Motion = {"State":"detected"}` erstellt `Motion_State` (`Motion.State` mit `Create object tree`).
- Die Tasmota-Telegramme (`STATE`, `SENSOR`, `RESULT`, `STATUSx`, ...) behalten ihre eigenen Optionen, auch mit `*` Die

Bei mehreren Fernbedienungen kann das Berry-Skript für jede Fernbedienung ein separates Thema festlegen, z. B. `EweTopicMode 3 %prefix%/%topic%/Remote_%alias%` mit dem zusätzlichen Thema `Remote_*` Dann erhält jede Fernbedienung ihre eigenen Zustände (`Remote_kitchen_Button1_Action`, ...).

- `Create object tree` erstellt Objekte als Baumstruktur

**Achtung!** Diese Option beschädigt Ihre Sonoff-Objektstruktur! Sie müssen alle Speichereinstellungen neu vornehmen. Speichern Sie die Objektstruktur als JSON-Datei, um Ihre ursprüngliche Struktur wiederherstellen zu können. Am besten stoppen Sie den Adapter, löschen alle Objekte unter „sonoff“ und starten den Adapter anschließend neu.

## Flaggen für LED-Controller

Die Moduszustände werden nur dann erstellt, wenn das Gerät einen der folgenden Zustände aufweist:

- `Red`, `Green`, `Blue`, `WW`, `CW`, `Color`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Hue`, `Saturation`

Staaten:

- `modeLedExor` - exor für weiße LEDs und farbige LEDs => Wenn die weißen LEDs eingeschaltet sind, sind die farbigen LEDs ausgeschaltet und umgekehrt (Standardwert: true)
- `modeReadColors` - Farbinformationen von MQTT auslesen (Standardwert: false)

## Rollen der Objekte seit 5.0

Seit Version 5.0 erhalten Objekte Rollen, die vom Typdetektor korrekt erkannt werden, sodass Adapter wie Alexa (IoT), Matter, Material oder Geräte die richtigen Geräte finden: ein Relais als Lampe oder Steckdose, eine Lampe mit Farbe, Dimmer und Effekt, einen Temperatursensor usw. Zuvor beispielsweise `Wifi_Channel` oder `MqttPort` wurden als dunkler erkannt und `POWER` einer RGB-Leuchte wurde ersetzt durch `WW_POWER` Die

**Das Verhalten der bestehenden Objekte kann sich ändern:**

- Die Rollen der vorhandenen Objekte werden aktualisiert, sobald das Gerät den Wert erneut sendet. Geändert werden nur die Rollen, die von älteren Versionen festgelegt wurden, sowie Rollen, die Sie geändert haben (z. B. `switch.light` An `POWER`) bleibt erhalten. Die ID, der Name, die Verlaufseinstellungen und der Wert bleiben unverändert.
- Visualisierungen, Skripte oder Aliase, die die Zustände anhand ihrer Rolle auswählen, können jetzt auch andere Zustände finden.
- `Switch1`... `Switch28` sind die Eingänge des Geräts und daher jetzt schreibgeschützt.
- Die wichtigsten Änderungen:
  - Netzwerk- und Firmwareinformationen: `info.ip`, `info.name`, `info.firmware`, `info.hardware`, ...
  - diagnostische Werte (`Heap`, `LoadAvg`, `Wifi_Channel`, `HTTP_API`, ...): `info.status`, `UptimeSec`: `value.interval`, `Wifi_Signal`: `value.rssi`
  - `POWER`, `POWER1`... mit `switch.power`: `switch`
  - `RGB_POWER`, `WW_POWER`, `CW_POWER`: `switch.mode.color`, `switch.mode.white`, `switch.mode.coldwhite`, `Fade`, `modeLedExor`, `modeReadColors`: `switch.setting`, `Scheme`: `level.effect`, `CT`: `level.color.temperature`
  - `Today`, `Yesterday`: `value.energy.consumed`, `Vcc`: `value.voltage.vcc`, `DewPoint`: `value.temperature.dewpoint`
  - automatisch erstellte Zustände: Texte `text`, beschreibbare Zahlen `state` (vor `level`)

Ein Gerät mit mehreren Relais (`POWER1`, `POWER2`, ...) in einem Kanal wird weiterhin nur als ein Gerät erkannt, da der Typdetektor jeden Gerätetyp nur einmal pro Kanal findet.

## Gerätemanager

Die Geräte werden im Geräte-Manager des Administrators mit ihren Relais, Dimmern, Farben, Jalousien und Einstellungen angezeigt, die direkt dort gesteuert werden können.

**Firmware-Aktualisierung:** Wenn „Nach Firmware-Aktualisierungen suchen“ aktiviert ist (Standardeinstellung), liest der Adapter einmal täglich die neueste Tasmota-Version von GitHub. Ein Tasmota-Gerät mit älterer Firmware zeigt die Aktualisierungsanzeige und die Aktion „Firmware aktualisieren“ an. Es sendet `Upgrade 1` auf das Gerät, das die Firmware von seiner eigenen OTA-URL herunterlädt (standardmäßig die offizielle Version seiner Build-Variante, z. B. `tasmota` oder `tasmota32`) und startet neu. Der Dialog wartet, bis das Gerät die neue Version meldet, maximal 5 Minuten. Entwicklungsversionen können nicht auf die Version aktualisiert werden, auf der sie basieren.

**Gerätesuche:** Die Aktion „Gerätesuche“ der Instanz fragt über die Weboberfläche von Tasmota den Status jeder Adresse im lokalen Netzwerk (dem /24-Netzwerk jeder eigenen Adresse) ab – die offiziellen Tasmota-Builds melden sich nicht per mDNS an. Die gefundenen Geräte werden mit ihren aktuellen MQTT-Einstellungen aufgelistet, die bereits mit dieser Instanz verbundenen Geräte separat. Für die ausgewählten Geräte aktiviert der Adapter MQTT und schreibt MQTT-Server, Port, Benutzername und Passwort. `Backlog SetOption3 1; MqttHost ...; MqttPort ...; MqttUser ...; MqttPassword ...` Die Einstellungen sind mit der eigenen Adresse, dem Port und den Zugangsdaten des integrierten Servers im Bridge-Modus mit dem externen Broker vorbelegt. Die Geräte starten neu und erscheinen in der Liste, sobald sie verbunden sind. Geräte mit einem Webpasswort müssen dieses im Formular eingeben. Läuft ioBroker in einem Docker-Container ohne Host-Netzwerk, wird nur das Netzwerk des Containers durchsucht.

Die Gerätekarte zeigt die Verbindung und das WLAN-Signal an (`Wifi_Signal` in dBm) live.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.4.0 (2026-11-10)
* (@GermanBluefox) The built-in MQTT server supports encrypted connections (MQTTS) with the certificates of ioBroker, new option "Secure (MQTTS)". The search for devices enables TLS on the devices then (#529)

### 5.3.0 (2026-11-10)
* (@GermanBluefox) Presses of remote controls (`tele/<topic>/SWITCH`, e.g. eWeLink R5 with the Berry script Tasmota-eWeLinkRemote) are stored, new option "For tele/SWITCH" (#515)
* (@GermanBluefox) New option "Additional topics": values of own topics like `stat/<topic>/PIR1` are stored, also with wildcards (`PIR*`) (#281)
* (@GermanBluefox) Every device has the state `Backlog` to send any Tasmota command, e.g. `POWER1 TOGGLE` (#277)

### 5.2.2 (2026-11-10)
* (@patricknitsch) The firmware update dialog of the device manager recognizes the new version also with "Create object tree" ("INFO.Info1.Version"), before it waited till the timeout
* (@patricknitsch) The firmware update from the device manager clears the "Upgrade" command afterwards, so a restart of the external broker (e.g. the ioBroker MQTT adapter) does not start the update again
* (@patricknitsch) Bridge mode: "INFO.Version" and the IP address are requested again after a device restarted (e.g. after a firmware update)
* (@GermanBluefox) A device with a wrong MQTT password is reported only once per hour instead of on every connection attempt, the other attempts are logged as debug (#548)
* (@GermanBluefox) Control characters (e.g. 0x00) of a corrupted payload are escaped in the warning "cannot parse data", so they do not corrupt the log file (#586)
* (@GermanBluefox) The timers use the adapter functions, so they are cleared when the adapter stops

### 5.2.1 (2026-10-23)
* (@GermanBluefox) Firmware with other texts for ON/OFF (e.g. "AN"/"AUS" of a German build) is supported: the texts of every device are requested and recognized automatically

### 5.2.0 (2026-10-22)
* (@GermanBluefox) The MQTT login of the built-in server and of the external broker can be taken from the central credential storage of admin (Settings → Credentials), admin 7.9.0+ is required (#629)

Older changes can be found in CHANGELOG_OLD.md

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