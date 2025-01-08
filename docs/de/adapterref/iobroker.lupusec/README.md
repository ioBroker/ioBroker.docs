---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: aeqUro9fi8zPyF3STAgowIBvf/mvR9OB99/ovH0riTA=
---
![Logo](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Stabile Version](http://iobroker.live/badges/lupusec-stable.svg)
![Anzahl der Installationen](http://iobroker.live/badges/lupusec-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
**Erfordert node.js 20.0 oder höher und Admin v5!**

Dieser Adapter verbindet die Lupusec Alarmanlagen XT1 Plus, XT2, XT2 Plus und XT3 mit ioBroker.
Die XT1 (ohne Plus) wird nicht unterstützt. Sie können den Status der Lupusec Sensoren wie Tür-, Fenster-, Wasser-, Rauchsensoren und den Status der Alarmanlage auslesen.
Sie können beispielsweise Schalter einschalten, Ihre Rollläden steuern und die Alarmanlage scharf-/unscharfschalten.
Da der Adapter die Alarmanlage mehrmals anrufen muss, um alle Informationen zum Status und Gerät abzurufen, ist die CPU-Auslastung und der Speicherverbrauch hoch. Um die CPU-Auslastung zu verringern, können Sie die Polltime erhöhen.

Detaillierte Informationen finden Sie hier: [Lupus](https://www.lupus-electronics.de/en)

## Installation
1. Installieren Sie den Adapter

Am einfachsten ist es, den lupusec.iobroker Adapter über den Discovery Adapter im ioBroker zu konfigurieren. Der Discovery Adapter sucht nach der richtigen IP-Adresse des Lupusec Alarmsystems. Alternativ kann man ihn auch manuell konfigurieren.

2. Manuelle Konfiguration des Adapters

Wählen Sie die IP-Adresse oder den Hostnamen und Port des Lupusec Alarmsystems. Wenn Sie https verwenden, aktivieren Sie das https-Flag. Die CPU-Last ist mit https höher als ohne http.

Um nur den Status zu lesen, wählen Sie einen Benutzer ohne Schreibrechte. Wenn Sie den Status ändern möchten (z. B. das Licht ein-/ausschalten oder den Alarm scharf-/unscharfschalten), wählen Sie einen Benutzer mit Schreibrechten.

Mit der Polltime können Sie konfigurieren, wie oft das Alarmsystem aufgerufen werden soll. Eine hohe Polltime verringert die CPU-Last.

![admin_main](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png) Wenn du Überwachungskameras an dein Lupusec-Alarmsystem angeschlossen hast, kannst du diese in ioBroker angeben. Der Lupusec-Adapter findet alle Lupusec-Kameras von selbst. Du musst eine Adresse (deine ioBroker-IP-Adresse oder 0.0.0.0) und einen Port für die spätere Verbindung mit den Kameras angeben.
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png) Wenn du deinen Nuki-Türöffner an dein Lupusec-Alarmsystem angeschlossen hast, kannst du ihn auch von ioBroker aus verwenden. Im Admin-Menü der ioBroker-Instanz kannst du deinen Lupusec-Türsensor angeben, der an der Nuki-Tür montiert ist. Wenn du nun die Tür öffnest, an der der Nuki montiert ist, hast du den zusätzlichen Status „Tür geöffnet“ statt nur „entriegelt“. Wenn du keinen Lupusec-Türsensor an der Nuki-Tür hast, siehst du nur die Status „verriegelt“ oder „verriegelt“.
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

Standardmäßig werden alle Lupusec-Geräte auf der ioBroker-Objektregisterkarte angezeigt.
Vollständig unterstützt und individuell angepasst werden folgende Geräte:

- Türkontakt / Fensterkontakt (Typ 4)
- Wassersensor (Typ 5)
- Panikknopf (Typ 7)
- Bewegungsmelder / 360 Grad Bewegungsmelder (Typ 9)
- CO-Sensor (Typ 13)
- Rauchmelder / Wärmemelder (Typ 14)
- Temperatursensor V2 (Typ 20)
- Sirene innen (Typ 21)
- Statusanzeige / Mini-Innensirene (Typ 22)
Netzschalter (Typ 24)
- 1-Kanal-Relais mit ZigBee-Repeater (Typ 24)
- 2-Kanal-Relais mit ZigBee-Repeater (Typ 24)
- Repater V2 (Typ 26)
- Tastenfeld (Typ 37)
- Glassensor (Typ 39)
- Sirene innen (Typ 45)
- Sirene außen (Typ 48)
- Leistungsschaltermessgerät (Typ 48)
- Stromzähler (Typ 50)
- Universeller IR-Controller (Typ 52)
- Raumfühler V1 (Typ 54)
- LCD-Temperatursensor (Typ 54)
- Minitemperatur (Typ 54)
- Nuki Türöffner (Typ 57)
- Wärmemelder (Typ 58)
- Dimmer (Typ 66)
- Lichtschalter V2 (Typ 66)
- Farbton (Typ 74)
- Rollladenrelais V1 (Typ 76)
- Heizkörperthermostat (Typ 79)
- Heizkörperthermostat V2 (Typ 79)
- Lichtsensor (Typ 78)
- Szenarioschalter V2 (Typ 81)
- Stoßsensor (Typ 93)
- Rauchmelder V2 (Typ 14)
- Unterputzrelais mit Dimmer V3 (Typ 66)
- Keypad Outdoor V2 (Typ 17)

Die beiden Zustände apple_home_a1 und lupusec.0.status.apple_home_a2 werden für den Apple Homekit Adapter yahka unterstützt. Du kannst zusätzlich zu den lupusec Zuständen die Alarmanlage für Bereich 1 und 2 ein- und ausschalten.

Sollten Sie ein Gerät besitzen, dass in der obigen Liste nicht aufgeführt ist, kontaktieren Sie mich bitte unter Thorsten Stueben <thorsten@stueben.de>.

## Migration von Adapterversion 1.x.x auf 2.x.x
Wenn Sie die Version 1.x.x installiert haben und auf die Version 2.0.0 oder höher umsteigen möchten, müssen Sie die Lupusec-Instanz leider neu konfigurieren.
Die alten Konfigurationswerte aus der Version 1.x.x werden dabei nicht übernommen.

Dies liegt daran, dass die Konfigurationsoberfläche vollständig überarbeitet wurde.

Um die Einstellungen für das Nuki Schloss vorzunehmen, musst du zunächst Hostname, Benutzername und Passwort eingeben und anschließend speichern. Die Instanz wird nun neu gestartet. Sobald diese ohne Fehler startet, öffne erneut die Instanzkonfiguration. Auf dem Reiter Nuki kannst du nun dein Nuki Schloss konfigurieren.

## Objekte
### Lupusec-Status
ioBroker bietet Ihnen die gleichen Statusobjekte wie die Lupusec-App.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec-Geräte
Alle unterstützten Lupsec Sensoren und Geräte findest du unter „Geräte“. Sollte ein Gerät fehlen, melde dich bitte bei mir.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) Detailansicht eines Sensors oder Gerätes. In diesem Beispiel siehst du den CO-Sensor. Bei CO-Alarm ändert sich der Status „alarm_status_ex“ auf „true“ und „alarm_status“ auf „CO“.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Lupusec Webcams
Unter „Webcams“ findest du alle angeschlossenen Überwachungskameras. Den im Status „Bild“ und „Stream“ angegebenen Link kannst du zum Öffnen in deinen Webbrowser kopieren.
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### Lupusec Nuki
Deinen Nuki Türöffner findest du wie die Lupusec Geräte unter „Geräte“. Der Nuki verfügt über 2 Zustände. Der Zustand nuki_state zeigt dir den aktuellen Zustand des Nuki Türöffners an, also ob die Tür verriegelt oder entriegelt ist. Mit dem Zustand nuki_action kannst du deine Tür öffnen, verriegeln oder entriegeln.
![lupusec_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

### Lupusec SMS
Wenn Sie die Lupusec XT1+, XT2+ oder XT3 mit einer SMS-SIM-Karte verwenden, können Sie SMS mit folgenden Zuständen versenden: ![lupusec_obj_sms](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_sms.png)

Alternativ können Sie SMS aus Ihrem JavaScript mit folgendem Befehl versenden:

```
sendTo('lupusec.0', 'sms', { number: '+4917247114711', text: 'Test message' });
```

Wenn Sie das SMS-Gateway verwenden, können Sie in Ihrem Skript den folgenden Befehl verwenden:

```
sendTo('lupusec.0', 'smsgw', { number: '+4917247114711', text: 'Test message' });
```

## Fehlerbehebung
Wenn Sie den Lupusec Adapter starten und die Fehlermeldung erhalten, dass das Alarmsystem nicht erreichbar ist, versuchen Sie bitte, das System von einem Terminalfenster Ihres ioBroker-Systems aus anzupingen.

```
ssh <user>@<iobroker-ip-address>
sudo -u iobroker ping <lupsec-ip-address>
```

Wenn Sie die Fehlermeldung _Ping: ICMP Open Socket: Operation not allowed_ erhalten, gehen Sie bitte wie folgt vor und starten Sie anschließend den Lupusec-Adapter neu.

```
ls -l `which ping`
sudo chmod u+s `which ping`
```

## Geplant
Folgende Dinge sind in der Zukunft geplant:

- unterstützt mehr Sensoren / Geräte
- Schreiben einer [Dokumentation](docs/en/info.md) für jeden Sensor / jedes Gerät

## Changelog
### 2.0.4 (2025-01-05)

- (Stübi) Adjustments of test and release yml
- (Stübi) Readme expanded to include migration instructions (Issue #97)
- (Stübi) Fixed error with HUE lights (Issue #104)
- (Stübi) Added the following values ​​for type 54: air pressure, wind strength, wind angle, wind gust, co2, wind speed
- (Stübi) Added for HUE the values mode (hue or temperature) and tempererature
- (Stübi) Added not used states will be not be shwon.
- (Stübi) Fixed value range for HUE to 0 to 360 degree, saturation from 0% to 100% and temperature from 2200 to 6500 kelvin

### 2.0.3 (2024-12-29)

- (Stübi) Adjustments due to migration from ESLint 8x≤ to 9.x.x (Issue #91)
- (Stübi) Redesign - changed everything from JavaScript to TypeScript
- (Stübi) Using axios for http requests
- (Stübi) the configuration changed. You have to edit the configuration
- (Stübi) js-controller in version 6 and 7 will be supported (Issue #83, #84, #95)
- (Stübi) nodejs 20 and nodejs 22 will be suported (Issue #87)

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de>

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