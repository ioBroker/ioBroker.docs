---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.panasonic-viera/README.md
title: ioBroker.panasonic-viera
hash: +nvR4AcRog79ShVYmtLuauzVCTS/AidGc8z3dlgx+aU=
---
![Logo](../../../en/adapterref/iobroker.panasonic-viera/admin/panasonic-viera.png)

![Build-Status](https://github.com/iobroker-community-adapters/ioBroker.panasonic-viera/actions/workflows/test-and-release.yml/badge.svg)
![Anzahl der Installationen](https://iobroker.live/badges/panasonic-viera-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.panasonic-viera.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.panasonic-viera.svg)
![NPM](https://nodei.co/npm/iobroker.panasonic-viera.png?downloads=true)

# ioBroker.panasonic-viera

## Ein Panasonic Viera Smart-TV-Adapter für ioBroker

Dies ist ein ioBroker-Adapter für Ihren Panasonic Viera Smart-TV.

## Einrichtung und Kopplung

### 1. Bereiten Sie den Fernseher vor.

1. Schalten Sie den Fernseher ein.
2. Offen `Menu -> Network -> TV Remote App Settings` und schalten Sie **all** diese **EIN** :
   - **Fernbedienung**
   - **Unterstützt von Apps**
   - **Netzwerk-Standby**
3. Offen `Menu -> Network -> Network Status -> Status Details` Notieren Sie sich die IP-Adresse des Fernsehers. Am besten weisen Sie dem Fernseher in Ihrem Router eine feste IP-Adresse zu, damit diese sich später nicht ändert.

### 2. Prüfen Sie, ob Ihr Fernseher gekoppelt werden muss.

- **Ältere Fernseher (etwa vor 2019)** kommunizieren unverschlüsselt mit dem Adapter. Sie müssen **nicht gekoppelt werden** : Geben Sie einfach die IP-Adresse ein und lassen Sie die Felder **für Anwendungs-ID** und **Verschlüsselungsschlüssel** leer.
- **Neuere Fernseher** akzeptieren nur verschlüsselte Befehle. Sie benötigen eine **Anwendungs-ID** und einen **Verschlüsselungsschlüssel** , den der Adapter einmalig durch Kopplung mit einer auf dem Fernseher angezeigten PIN erhält (Schritt 4).

Wenn Sie sich nicht sicher sind, versuchen Sie es zunächst ohne Kopplung: Geben Sie nur die IP-Adresse ein, speichern Sie die Einstellungen und drücken Sie eine beliebige Taste im Menü **„Fernbedienung“** . Reagiert der Fernseher, ist der Vorgang abgeschlossen. Andernfalls koppeln Sie ihn.

### 3. Geben Sie die IP-Adresse ein.

1. Stellen Sie sicher, dass `panasonic-viera` Die Instanz **läuft** (im Protokoll wird möglicherweise noch „Bitte konfigurieren“ angezeigt – das ist normal). Die Suche nach Fernsehern und die Kopplung werden von der laufenden Instanz durchgeführt.
2. Öffnen Sie die Einstellungen der Instanz.
3. **IP** : Klicken Sie in das Feld. Die in Ihrem Netzwerk gefundenen Fernseher werden zur Auswahl angezeigt. Andernfalls geben Sie die IP-Adresse ein.

### 4. Fernseher koppeln (nur neuere Fernseher)

Alles im Reiter **„Einstellungen“** , Abschnitt **„Kopplung“ (nur bei neueren Fernsehern)** :

1. Schalten Sie den Fernseher **ein** (nicht in den Standby-Modus).
2. Drücken Sie **auf dem Fernseher die Taste „PIN anzeigen“** . Der Fernseher zeigt eine 4-stellige PIN für die Fernbedienung „ioBroker“ an.
3. Geben Sie die PIN in **das auf dem Fernseher angezeigte Feld** ein.
4. Drücken Sie auf **„Koppeln“** . **Anwendungs-ID** und **Verschlüsselungsschlüssel** werden automatisch ausgefüllt.
5. **Speichern Sie** die Einstellungen. Die Instanz startet neu und kommuniziert ab sofort verschlüsselt mit dem Fernseher.

Die PIN selbst wird nicht gespeichert, nur die Anwendungs-ID und der Verschlüsselungsschlüssel.

Falls es nicht funktioniert:

- **Es wird keine PIN angezeigt** oder die Meldung besagt, dass der Fernseher nicht antwortet: Der Fernseher muss **eingeschaltet** sein (nicht im Standby-Modus), **die Fernbedienung** muss eingeschaltet sein (Schritt 1) und die IP-Adresse muss die des Fernsehers sein.
- **Ungültiger PIN-Code** : Er wurde falsch eingegeben. Geben Sie ihn erneut ein und drücken Sie auf **„Koppeln“** . Falls die PIN nicht mehr auf dem Fernseher angezeigt wird, drücken Sie erneut **auf „PIN anzeigen“** – der Fernseher zeigt dann eine neue PIN an.
- **„Bitte lassen Sie sich zuerst die PIN vom Fernseher anzeigen“** : Drücken Sie zuerst **die Taste „PIN anzeigen“ auf dem Fernseher** . Auch nach einem Neustart der Instanz oder nach mehr als 5 Minuten ist eine neue PIN erforderlich.
- Bei älteren Fernsehern **tritt direkt nach der Eingabe von „PIN auf dem Fernseher anzeigen“ ein Fehler auf** : Ältere Fernseher unterstützen keine Kopplung – sie benötigen keine (Schritt 2).

### 5. Überprüfen Sie, ob es funktioniert.

`panasonic-viera.0.info.connection` wird `true` Während der Fernseher antwortet, wird der Fernseher über die Registerkarte **„Fernbedienung“** in den Einstellungen gesteuert.

Wenn der Fernseher nach einem Firmware-Update oder einem Werksreset nicht mehr reagiert, koppeln Sie ihn erneut (Schritt 4).

## Kanal `tv` (Typendetektor)

Zusätzlich zu den vorhandenen Objekten erstellt der Adapter den Kanal `panasonic-viera.0.tv`, das der ioBroker-Typdetektor (>= 6.2.0) als Gerätetyp erkennt `tv` Visualisierungen und der Geräteadapter können den Fernseher damit steuern:

| Zustand         | Rolle                           | Beschreibung                                                                           |
| --------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| `tv.power`      | `switch.power`                  | Ein/Aus (der Fernseher hat nur eine Umschalttaste; diese wird nur bei Bedarf gesendet) |
| `tv.key`        | `media.key`                     | ein Schlüssel: `UP`, `DOWN`, `SELECT`, `BACK`, `HOME`, `NUMBER_1`, `RED`, ...          |
| `tv.volume`     | `level.volume`                  | Lautstärke 0-100                                                                       |
| `tv.muted`      | `media.mute`                    | stumm                                                                                  |
| `tv.volumeUp`   | `button.volume.up`              | Lautstärke erhöhen                                                                     |
| `tv.volumeDown` | `button.volume.down`            | Lautstärke verringern                                                                  |
| `tv.input`      | `media.input`                   | `TV`, `HDMI1`... `HDMI4`                                                              |
| `tv.app`        | `media.app`                     | App starten: `YOUTUBE`, `NETFLIX`, `PRIME_VIDEO`, `BROWSER`, ...                       |
| `tv.unreach`    | `indicator.maintenance.unreach` | Der Fernseher antwortet nicht auf den Ping.                                            |

`tv.app` Der Adapter bietet standardmäßig YouTube, Netflix, Prime Video und den Browser an. Sobald der Fernseher eingeschaltet ist, erkennt der Adapter die installierten Apps und zeigt diejenigen an, die er erkennt. Die **Fernbedienung** verfügt über Tasten für dieselben Apps.

Zum Einschalten des Fernsehers über das Netzwerk sind die **Modi „Netzwerk-Standby“** und **„Einschalten durch Apps“** auf dem Fernseher erforderlich.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (bluefox) Added connectionType and dataSource to io-package.json
- (bluefox) Corrected the role of info.tv_on
- (bluefox) Adapter is tested with node.js 22, 24 and 26

### 2.2.0 (2026-10-29)
- (bluefox) The adapter was refactored to TypeScript and JsonConfig
- (bluefox) Fixed the buttons basic.VOLUP, basic.VOLDOWN and basic.LEFT, they sent an invalid key
- (bluefox) The adapter no longer restarts when the TV answers the ping but not the mute request
- (bluefox) The IP field offers the TVs found in the network
- (bluefox) Newer (encrypted) TVs can be paired with a PIN directly in the settings
- (bluefox) Added a remote control to the instance settings (tab "Remote control", requires admin 8)
- (bluefox) Added the channel `tv` for the device type `tv` of the type-detector, so visualizations and the devices adapter can control the TV
- (bluefox) Apps like YouTube and Netflix can be started (`tv.app` and buttons in the remote control)
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (copilot) **CI/CD**: Updated GitHub Copilot instructions template to v0.5.7

### 2.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.0 (2021-05-09)
* (jens-maus) added support to set Application and Encryption Key in adapter admin
* (jens-maus) changed adapter to use node-panasonic-viera to support modern TV models

### 1.0.2
* (cyberindy) some fixes

### 1.0.1
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2021 ldittmar <iobroker@lmdsoft.de>, Jens Maus <mail@jens-maus.de>

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