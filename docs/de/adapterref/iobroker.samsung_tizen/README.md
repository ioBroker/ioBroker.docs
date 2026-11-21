---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsung_tizen/README.md
title: ioBroker.samsung_tizen
hash: lPV0xhmcYhsN6JkQEXky/I7+GWuCvmcBCicpBKjJgls=
---
![Logo](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# ioBroker.samsung\_tizen

> \[!IMPORTANT] Dieser Adapter kann nicht von GitHub installiert werden.

Dieser Adapter steuert Samsung-Fernseher mit Tizen OS (ab 2016).

## 1. Konfiguration

So konfigurieren Sie diesen Adapter: Überprüfen Sie zunächst die Einstellungen Ihres Fernsehers: Schalten Sie den Fernseher ein und gehen Sie zu Einstellungen / Allgemein / Externer Geräte-Manager / Geräteverbindungs-Manager. Dort muss die Zugriffsbenachrichtigung auf „Nur beim ersten Mal“ eingestellt sein.

### 1.1. Protokoll

Protokoll für die WebSocket-Verbindung zu Ihrem Fernseher.

Mögliche Werte sind `http` oder `wss` Auf neueren Geräten verwenden `wss` Die

### 1.2. IP-Adresse

Die IP-Adresse Ihres Samsung-Fernsehers.

Sie kennen die Adresse nicht? Klicken Sie oben in den Einstellungen auf **„TV suchen“** . Der Adapter sucht im Netzwerk nach einem eingeschalteten Samsung-Fernseher und trägt dessen IP-Adresse, MAC-Adresse, Protokoll und Port ein. Werden mehrere Fernseher gefunden, wird der erste verwendet. Die anderen werden in der Liste im Feld für die IP-Adresse angezeigt, das beim Öffnen der Einstellungen automatisch ausgefüllt wird. Die Suche kann nur durchgeführt werden, wenn der Adapter aktiv ist. Ein Fernseher im Standby-Modus oder in einem anderen Subnetz kann nicht gefunden werden – geben Sie die Adresse in diesem Fall manuell ein.

### 1.3. Hafen

Anschluss für die WebSocket-Verbindung zu Ihrem Fernseher:

- 8001 – unsicherer Port
- 8002 - sicherer Port

### 1.4. Token

Token für eine sichere Verbindung zu Ihrem Fernseher.

Speichern Sie die Adapterkonfiguration mit token = 0 und wechseln Sie zur Registerkarte „Objekte“ im ioBroker-Adminbereich.

Dann geh zu `samsung_tizen.0.config.getToken` Objekt und klicken Sie auf die Schaltfläche.

Wenn alles funktioniert, wird ein neues Objekt erstellt `samsung_tizen.0.config.token` Es erscheint ein Eintrag, dessen Name Ihr Token ist. Kopieren Sie den Namen (z. B. 123456789), gehen Sie zurück zur Adapterkonfiguration und fügen Sie ihn in das Token-Feld ein.

Kann mit dem Wert "0" deaktiviert werden.

#### Wie man manuell ein Token erhält

Installieren `wscat` auf dem Gerät, auf dem ioBroker ausgeführt wird, mit folgendem Befehl:

```sh
npm install wscat
```

Schalten Sie den Fernseher ein und fragen Sie das Token über eine WebSocket-Verbindung ab:

```sh
wscat -n -c wss://tvIp:8002/api/v2/channels/samsung.remote.control?name=aW9Ccm9rZXI=
```

Auf Ihrem Fernseher erscheint ein Pop-up-Fenster, das Sie bestätigen müssen. Entnehmen Sie das Token aus der zurückgegebenen JSON-Antwort:

```json
{
    "data": {
        "clients": [
            {
                "attributes": { "name": "aW9Ccm9rZXI=" },
                "connectTime": 1575818900205,
                "deviceName": "aW9Ccm9rZXI=",
                "id": "12345678-797c-45b0-b0f1-233535918548",
                "isHost": false
            }
        ],
        "id": "12345678-797c-45b0-b0f1-233535918548",
        "token": "10916644"
    },
    "event": "ms.channel.connect"
}
```

### 1.5. MAC-Adresse

Die MAC-Adresse Ihres Samsung-Fernsehers wird für Wake-on-LAN verwendet.

Die Schaltfläche „MAC-Adresse vom Fernseher lesen“ fragt den Fernseher unter der eingegebenen IP-Adresse nach der MAC-Adresse. Der Fernseher muss eingeschaltet sein.

Dies funktioniert nur, wenn Ihr Fernseher per Kabel und nicht drahtlos angeschlossen ist.

Wenn Ihr Fernseher drahtlos verbunden ist, kann er nur aus dem kurzen Standby-Modus eingeschaltet werden.

Wake-on-LAN kann mit dem Wert „0“ deaktiviert werden.

### 1.6. Fernseh-Umfragen auf Landesebene

#### Wahllokal

Der Port, der zum Abfragen des Energiestatus verwendet wurde.

Standardwert: 9110

Bekannte verfügbare Ports: 9110, 9119, 9197

#### Abstimmungsintervall

Wie oft die Umfrageanfrage gesendet wird.

Standardwert: 60 Sekunden

Kann mit dem Wert "0" deaktiviert werden.

### 1.7. Befehlsverzögerung

Verzögerung in Millisekunden zwischen den über die `samsung_tizen.0.control.sendCmd` Objekt.

## 2. Verwendung

### 2.1. Einrichtungsassistent

Der erste Reiter der Einstellungen, „Einrichtung“, führt Sie durch die gesamte Konfiguration: Er sucht im Netzwerk nach dem Fernseher, koppelt sich mit ihm (der Fernseher fragt einmal, ob ioBroker eine Verbindung herstellen darf – wählen Sie am Fernseher „Zulassen“, der Assistent nimmt das Token automatisch entgegen), liest die MAC-Adresse für Wake-on-LAN und sendet einen Testschlüssel mit den neuen Daten, bevor diese gespeichert werden. Mit „Anwenden und speichern“ werden IP-Adresse, Protokoll, Port, Token und MAC-Adresse in die Einstellungen geschrieben. Die Instanz muss ausgeführt werden; für diesen Reiter ist Administratorrechte der Version 8 oder höher erforderlich. Die manuelle Methode (Status) `config.getToken`, Token im Namen von `config.token`) funktioniert immer noch.

### 2.2. Szenen

Der Tab „Szenen“ enthält eine Tabelle mit benannten Sequenzen, z. B. `SceneYouTube`: `HOME, YOUTUBE, WAIT 3000, OK` - Öffnen Sie YouTube und bestätigen Sie die Kontoauswahl. Ein Schritt ist entscheidend (`HOME`, `OK`, `BACK`, `UP`, `VOLUP`, `0` -`9`, die Namen von `TV_KEYS` des Typendetektors oder eines Samsung-Codes `KEY_...`), eine App (`YOUTUBE`, `NETFLIX`, `DISNEY_PLUS`, ... - die Schlüssel von `TV_APPS`) oder eine Pause (`WAIT 2000` Jede Szene wird zu einem Knopf `samsung_tizen.0.scenes.<name>` und eine Taste der Fernbedienungs-Registerkarte.

### 2.3. Registerkarte „Fernbedienung“

Der Reiter „Fernbedienung“ in den Einstellungen zeigt eine Fernbedienung mit folgenden Funktionen: Ein/Aus, Wake-on-LAN, Quelle, Menü, Info, Pfeiltasten mit OK, Zurück, Home, Stummschaltung, Lautstärke- und Kanalwahltasten, Wiedergabetasten und eine Taste für jede auf dem Fernseher installierte App (YouTube, Netflix, Disney+, Prime Video usw.). Ein Klick darauf aktiviert zusätzlich die Pfeiltasten, Enter, Backspace, + und - der Tastatur. Eine LED zeigt den Betriebszustand an, sofern die Statusabfrage aktiviert ist. Die Tastenanschläge werden über die laufende Instanz mit der gespeicherten Konfiguration ausgeführt. Speichern Sie daher die Einstellungen, nachdem Sie die IP-Adresse oder das Token geändert haben. Wird ein Tastendruck nicht an den Fernseher gesendet, wird unterhalb der Fernbedienung eine Fehlermeldung angezeigt. Für diesen Reiter ist Administratorrechte der Version 8 oder höher erforderlich.

### 2.4. Nachrichten für Skripte und KI-Agenten

`sendTo('samsung_tizen.0', 'help', {})` Beantwortet eine Beschreibung der Nachrichten und Zustände des Adapters für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren: `{ help, commands }`, Wo `commands` listet jede Nachricht auf `write` (ob es etwas ändert). Skripte können verwendet werden `apps` (die bekannten, auf dem Fernseher installierten Apps), `launchApp` (`{ app: 'YOUTUBE' }`), `remote` (`{ key: 'KEY_HOME' }`), `wake`, `scenes` Und `runScene` (`{ scene: '<id>' }`).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (GermanBluefox) The pairing token is no longer written to the log (startup config, websocket URL, getToken)

### 2.2.0 (2026-11-19)
* (GermanBluefox) Fixed the README structure (changelog section) (#321)
* (GermanBluefox) Added the message "help": a description of all messages and states for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 2.1.0 (2026-10-29)
- (GermanBluefox) Added: button "Search TV" that finds the TV in the network and fills in IP address, MAC address, protocol and port; the IP address field lists all TVs found (SSDP, confirmed by the REST API of the TV)
- (GermanBluefox) Added: button to read the MAC address for Wake-on-LAN from the TV
- (GermanBluefox) Added: setup assistant (tab "Setup"): search, pairing without copying the token, Wake-on-LAN, test key and save in one go
- (GermanBluefox) Added: `powerOn` can be written to switch the TV on (Wake-on-LAN, then KEY_POWER) or off (KEY_POWER, held on The Frame); the power state is asked right after that until it is reached
- (GermanBluefox) Added: scenes - named sequences of keys, apps and pauses, configured in a table, each with a button `scenes.<name>`
- (GermanBluefox) Added: buttons for the apps installed on the TV; the adapter knows the Samsung app IDs of YouTube, Netflix, Disney+, Prime Video, Apple TV, Max, Paramount+, DAZN, Joyn, RTL+, MagentaTV, ARD, ZDF, Spotify, Twitch, Plex and the browser and asks the TV which of them are installed
- (GermanBluefox) Added: tab "Remote control" in the settings with a remote control to test the connection right away (custom component, needs admin 8)

### 2.0.2 (2026-09-04)
- (mcm1957) **BREAKING:** enhanced security (added encryption) requires that you enter the access token one more time 
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (AlanSRU) Fixed the installed-app message handlers, which stayed attached to the shared websocket: they piled up with every call and made the adapter crash with "Cannot read properties of undefined (reading 'length')" as soon as another message arrived (#302)
- (AlanSRU) Synced `engines.node` in package-lock.json with package.json (#301)
- (GermanBluefox) The adapter was refactored to TypeScript. 
- (GermanBluefox) The configuration dialog was migrated from the old HTML admin page to JsonConfig
- (GermanBluefox) The states created by the adapter now carry explicit `common.read` / `common.write` flags
- (GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)

### 1.1.0 (2024-04-26)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.0 (2023-09-30)
- (mcm1957) An official release has been created

## License

MIT License 

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020 dahuby

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