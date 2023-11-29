---
BADGE-NPM: https://nodei.co/npm/iobroker.fullybrowser.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fullybrowser.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fullybrowser.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.fullybrowser
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.fullybrowser
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/fullybrowser-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.fullybrowser.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/fullybrowser-stable.svg
---
![Logo](../../admin/fully.png)

## Über diesen Adapter

Mit diesem Adapter kann der [Fully Kiosk Browser](https://www.fully-kiosk.com) (mit Plus-Lizenz) gesteuert werden. Über die [REST API](https://www.fully-kiosk.com/en/#rest) können diverse Befehle wie "Bildschirm an/aus", "Bildschirmschoner an/aus", etc. an den Fully gesendet werden.

Außerdem werden Events (wie z.B. "Bildschirm an") immer sofort via [MQTT](https://www.fully-kiosk.com/en/#mqtt) dem Adapter mitgeteilt und in den entsprechenden Datenpunkten angezeigt/gesetzt. Desweiteren sendet der Fully Browser via MQTT sämtliche Geräteinformationen immer automatisch mindestens alle 60 Sekunden, welche entsprechend in die Info-Datenpunkte geschrieben werden. Das Senden von Befehlen erfolgt übrigens über die REST API, da der Fully Browser das Senden über MQTT nicht unterstützt.

## Fully-Browser vorbereiten

### Remote Admin aktivieren
1. Auf dem Tablet die Fully Browser App öffnen und die Einstellungen (Settings) öffnen.
1. Menüpunkt **Remote Administration (PLUS)** aufrufen
1. **Enable Remote Administration** aktivieren
1. Bei **Remote Admin Password** ein Passwort vergeben
1. **Remote Admin from Local Network** aktivieren

![Logo](../_img/fully-browser-settings-remote-admin.png)

### MQTT aktivieren
1. Auf dem Tablet die Fully Browser App öffnen und die Einstellungen (Settings) öffnen. Alternativ kannst du den Remote Admin auch von einem anderen Endgerät (z.B. PC) von einem Browser aus aufrufen, die Basis-URL ist hierbei immer http://ip-address:2323, nach dem Aufruf wirst du nach dem oben vergebenen Passwort gefragt.
2. Im Menü aufrufen: **Settings** -> **Other Settings** -> **MQTT Integration (PLUS)**
3. **Enable MQTT**: aktivieren
4. **MQTT Broker URL**: Im Format `mqtt://iobroker-ip-address:3000` eingeben. Dabei entspricht `iobroker-ip-address` der IP-Adresse vom ioBroker, und `3000` die Port-Nummer, die für die MQTT-Verbindung verwendet wird. 
5. **MQTT Broker Username**: hier kannst du optional einen Benutzernamen vergeben.
6. **MQTT Broker Password**: hier kannst du optional ein Passwort vergeben.
7. **MQTT Client ID**: kannst du leer lassen
8. **MQTT Device Info Topic**: hier kannst du die Voreinstellung so belassen, wird vom Adapter nicht weiter beachtet.
8. **MQTT Event Topic**: hier kannst du die Voreinstellung so belassen, wird vom Adapter nicht weiter beachtet.

![Logo](../_img/fully-browser-settings-mqtt.png)


## Adapter-Einstellungen

### Fully-Browser-Geräte
Fully-Browser-Gerät(e), also die Tablets, auf denen der Fully-Browser läuft, entsprechend hinzufügen, dabei:
1. **Gerätename**: Beliebiger Name des Tablets, wird gleichzeitig als Bestandteil der Objekte/Datenpunkte verwendet, z.B. aus `Tablet Flur` wird dann `fully-mqtt.0.Tablet-Flur`.
1. **Protokoll**: `http` so belassen. Falls `https` verwendet werden soll: siehe Hinweise unter [Remote Admin](https://www.fully-kiosk.com/en/#remoteadmin).
1. **Remote Admin Passwort**: das oben vergebene Passwort eintragen
1. **MQTT**: sollte aktiviert werden um alle Features des Adapters zu nutzen.

### MQTT-Konfiguration
 * **Port**: Dieselbe Portnummer wie oben in den Fullybrowser MQTT-Einstellungen verwenden (z.B. `3000`).
 * **Benutzername und Passwort nicht verifizieren**: Damit kann die Überprüfung von Benutzernamen und Passwort deaktiviert werden.
 * **Benutzername**: Optional
 * **Passwort**: Optional

### Experten-Einstellungen: MQTT
 * **Publizierte Infos nicht öfter als alle x Sekunden verarbeiten**: Lt. [Fully-Dokumentation](https://www.fully-kiosk.com/en/#mqtt) werden Infos nur alle 60 Sekunden publiziert, in meinen Tests erfolgte dies aber deutlich öfter, also kann hiermit ein Limit gesetzt werden.
 * **Info-Datenpunkte immer aktualisieren**: Normalerweise werden alle Info-Datenpunkte nur dann neu gesetzt, wenn es eine Änderung gab. Ist dies aktiviert, werden diese immer aktualisiert (mit ack:true), auch wenn es keine Änderung zum vorherigen Wert gab.
 * **Client- und Connection-Fehler als info im Log**: Wenn aktiviert, werden Client- und Verbindungsfehler immer als Info und nicht als Error im Log ausgegeben. Dies dient dazu, das Log sauber zu halten und nicht unnötig zu füllen, nur weil sich mal kurzzeitig ein Tablet abmeldet und nach wenigen Sekunden wieder anmeldet. Längerzeitige Fehler und Warnungen werden immer im Log entsprechend angezeigt.

### Experten-Einstellungen: Remote Admin (REST API)
 * **Request Timeout**: Nach Anzahl dieser Millisekunden wird ein REST API Request (also das Senden von Kommandos) abgebrochen, wenn nicht erfolgreich.

 ## Links

* [ioBroker-Forum: Adapter Fully Browser mit MQTT](https://forum.iobroker.net/topic/69729/)
* [fully-kiosk.com REST API](https://www.fully-kiosk.com/en/#rest)
* [fully-kiosk.com MQTT Integration](https://www.fully-kiosk.com/en/#mqtt)

## Changelog
### 3.0.7 (2023-11-20)
* (arteck) check credentials

### 3.0.6 (2023-11-11)
* (arteck) add mqttTimeout in settings

### 3.0.5 (2023-11-09)
* (arteck) add setRAW DP, this allows you to send a fullbrowser command directly

### 3.0.4 (2023-11-06)
* (arteck) set to zero corr

### 3.0.3 (2023-11-04)
 * (arteck) setStringSettings corr

### 3.0.2 (2023-11-02)
* (arteck) add motionDetection
* (arteck) for Rooted Devices add rebootDevice

### 3.0.0 (2023-11-02)
* (arteck) breaking change - new structure from fully-mqtt Adapter from Acgua
* here is the Orginal https://github.com/Acgua/ioBroker.fully-mqtt

#----------------------------------------------------------------------

### 2.2.0 (2023-10-27)
* (arteck) intervall corr

### 2.1.6 (2022-11-23)
* (arteck) add name of device to admin
* (arteck) corr status when login fail
* (arteck) corr psw typo

### 2.1.2 (2022-04-05)
* (arteck) encodeUri in psw

### 2.1.1 (2022-02-07)
* (arteck) js-controller 4.x

### 2.1.0 (2022-02-07)
* (arteck) js-controller 4

### 2.0.14 (2022-01-31)
* (arteck) life tick error


...
...
...

### 1.0.1 (2019-06-20)
* (arteck) encodeURL

## License
The MIT License (MIT)

Copyright (c) 2014-2023 Arthur Rupp arteck@outlook.com

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