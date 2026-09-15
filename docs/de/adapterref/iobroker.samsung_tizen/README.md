---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsung_tizen/README.md
title: ioBroker.samsung_tizen
hash: g/6UBdA+i0GxfgbXTTp2pgNaVnMUhd3mU05ZPz6XOW8=
---
![Logo](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# ioBroker.samsung\_tizen

Dieser Adapter steuert Samsung-Fernseher mit Tizen OS (ab 2016).

## 1. Konfiguration

So konfigurieren Sie diesen Adapter: Überprüfen Sie zunächst die Einstellungen Ihres Fernsehers: Schalten Sie den Fernseher ein und gehen Sie zu Einstellungen / Allgemein / Externer Geräte-Manager / Geräteverbindungs-Manager. Dort muss die Zugriffsbenachrichtigung auf „Nur beim ersten Mal“ eingestellt sein.

### 1.1. Protokoll

Protokoll für die WebSocket-Verbindung zu Ihrem Fernseher.

Mögliche Werte sind`http` oder`wss` Auf neueren Geräten verwenden`wss` Die

### 1.2. IP-Adresse

Die IP-Adresse Ihres Samsung-Fernsehers.

### 1.3. Hafen

Anschluss für die WebSocket-Verbindung zu Ihrem Fernseher:

- 8001 – unsicherer Port
- 8002 - sicherer Port

### 1.4. Token

Token für eine sichere Verbindung zu Ihrem Fernseher.

Speichern Sie die Adapterkonfiguration mit token = 0 und wechseln Sie zur Registerkarte „Objekte“ im ioBroker-Adminbereich.

Dann geh zu`samsung_tizen.0.config.getToken` Objekt und klicken Sie auf die Schaltfläche.

Wenn alles funktioniert, wird ein neues Objekt erstellt`samsung_tizen.0.config.token` Es erscheint ein Eintrag, dessen Name Ihr Token ist. Kopieren Sie den Namen (z. B. 123456789), gehen Sie zurück zur Adapterkonfiguration und fügen Sie ihn in das Token-Feld ein.

Kann mit dem Wert "0" deaktiviert werden.

#### Wie man manuell ein Token erhält

Installieren`wscat` auf dem Gerät, auf dem ioBroker ausgeführt wird, mit folgendem Befehl:

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

Verzögerung in Millisekunden zwischen den über die`samsung_tizen.0.control.sendCmd` Objekt.

## 2. Verwendung

### 2.1. Kontrolle

#### Senden Sie einen einzelnen Schlüssel

Um eine einzelne Taste zu senden, klicken Sie auf die Schaltfläche des entsprechenden Objekts, z. B.`samsung_tizen.0.control.KEY_MUTE` Die

#### Senden Sie eine Taste ohne vordefinierte Schaltfläche.

Sie können einen benutzerdefinierten (nicht vordefinierten) Schlüssel mit dem senden`samsung_tizen.0.control.sendCmd` Objekt. Geben Sie den Schlüssel ein, den Sie senden möchten, z. B.`KEY_POWER` Die

#### Senden Sie mehrere Tasten in einem einzigen Befehl

Um mehrere Tasten in einem einzigen Befehl zu senden, verwenden Sie die`samsung_tizen.0.control.sendCmd` Objekt. Geben Sie die Tasten durch Kommas getrennt ein, z. B.`KEY_POWER` ,`KEY_HDMI` ,`KEY_VOLUP` Die

#### Makros für Befehle erstellen

Gehe zu`samsung_tizen.0.command` Dort finden Sie Beispielmakros, und Sie können Ihre eigenen erstellen.

### 2.2. Apps

#### Installierte Apps laden

Um die installierten Apps zu laden, klicken Sie auf die Schaltfläche`samsung_tizen.0.apps.getInstalledApps` Schaltfläche. Danach ein separates Objekt namens`start_<app name>` wird für jede installierte App erstellt.

#### Starte eine App

Sie können eine App starten, indem Sie auf die Schaltfläche klicken.`samsung_tizen.0.apps.start_<app name>` Objekt.

### 2.3. Energiezustand

Wenn die Abfrage des Energiestatus wie oben beschrieben konfiguriert ist,`samsung_tizen.0.powerOn` Ist`true` während Ihr Fernseher eingeschaltet ist und`false` während es ausgeschaltet ist.

### 2.4. Befehle

Befehle können manuell über die`samsung_tizen.0.control.sendCmd` Objekt, wie unter Steuerung beschrieben, oder über ein benutzerdefiniertes Objekt unten`samsung_tizen.0.command` Es gibt einige Beispielbefehle, aber Sie können auch Ihre eigenen Makros erstellen.

#### Wie man ein Befehlsmakro erstellt

1. Wechseln Sie zur Registerkarte „Objekte“ und öffnen Sie`samsung_tizen.0.command` Die

2. Klicken Sie auf das Plus-Symbol, um ein neues Objekt zu erstellen.

   ![cmd1](../../../en/adapterref/iobroker.samsung_tizen/images/cmd1.png)

3. Prüfen Sie, ob das übergeordnete Objekt ist`samsung_tizen.0.command` Die

4. Geben Sie einen Namen für Ihren Befehl ein und überprüfen Sie, ob der Typ „Befehl“ lautet.`datapoint` Und`stateType` Ist`boolean` Die

   ![cmd2](../../../en/adapterref/iobroker.samsung_tizen/images/cmd2.png)

5. Geben Sie unter „Name“ die Schlüssel ein, die Sie senden möchten.

6. Die Rolle muss sein`button` Die

7. Speichern Sie das Objekt.

   ![cmd3](../../../en/adapterref/iobroker.samsung_tizen/images/cmd3.png)

8. Jetzt können Sie Ihren Befehl mit dem neu erstellten Objekt senden.

   ![cmd4](../../../en/adapterref/iobroker.samsung_tizen/images/cmd4.png)

## Credits

Die erste Generation dieses Adapters wurde von Stefan0875 ( <https://github.com/Stefan0875> ) entwickelt. Anschließend wurde er von Highpressure ( <https://github.com/Highpressure> ) und schließlich von dahuby ( <https://github.com/dahuby> ) angepasst und weiterentwickelt. Vielen Dank für ihre Arbeit und die Bereitstellung einer öffentlichen Lizenz.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 1.0.0-alpha.2 (2023-09-24)
- (mcm1957) Dependencies have been updated

### 1.0.0-alpha.1 (2023-09-24)
- (mcm1957) Adapter requires node 16 or newer now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization.

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