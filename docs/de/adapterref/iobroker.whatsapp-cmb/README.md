---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: p1uoOf8Ped3iQt9DWuJEsFehO449X+1sww2jj/JWI5I=
---
![Logo](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Anzahl der Installationen](https://iobroker.live/badges/whatsapp-cmb-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# ioBroker.whatsapp-cmb

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## WhatsApp-CMB-Adapter für ioBroker

Dank des kostenlosen [CallMeBot-](https://www.callmebot.com/blog/free-api-whatsapp-messages/) Dienstes ermöglicht dieser Adapter das Senden von WhatsApp-Nachrichten an sich selbst oder an andere Nummern.

**Hinweis** : _Die kostenlose API ist nur für den persönlichen Gebrauch bestimmt!_

### Konfiguration

_Die folgende Dokumentation wurde von [der CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) -Seite kopiert._

Sie müssen den API-Schlüssel vom Bot erhalten, bevor Sie die API verwenden können:

- Fügen Sie die Telefonnummer XXXX (die aktuelle Nummer finden Sie auf der CallMeBot-Seite) zu Ihren Telefonkontakten hinzu. (Vergeben Sie einen beliebigen Namen.)
- Sende diese Nachricht `I allow callmebot to send me messages` (auf Englisch) an den neu erstellten Kontakt (natürlich über WhatsApp).
- Warten Sie, bis Sie die Nachricht erhalten. `API Activated for your phone number. Your APIKEY is 123123` vom Bot. Da sich dies noch in der Beta-Testphase befindet, kann die Aktivierung bis zu 2 Minuten dauern.
- Die WhatsApp-Nachricht des Bots enthält den API-Schlüssel, der zum Senden von Nachrichten über die API benötigt wird.
- Sie können den API-Schlüssel nun in der ioBroker-Konfiguration verwenden.

Beispiel:![Beispiel](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Verwendung

Es gibt zwei Möglichkeiten, eine Nachricht zu senden:

- über `whatsapp-cmb.0.sendMessage` Geben Sie einfach einen Text in dieses Feld ein, und die Nachricht wird an die in den Einstellungen konfigurierte Standardnummer gesendet.
- per Nachricht vom JavaScript-Adapter:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

`sendTo('whatsapp-cmb.0', 'help', {})` Antworten `{ help, commands }`: eine Beschreibung aller Nachrichten mit ihren Parametern für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren sowie die Liste aller Befehle mit `write` (ob der Befehl eine Wirkung hat, z. B. eine Nachricht sendet).

![Blockly](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Wenn Sie Emojis senden möchten, lesen Sie bitte <https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.1.0 (2026-11-19)
- (bluefox) Added the message `help`: a description of all messages for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 1.0.0 (2026-10-13)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (bluefox) The adapter was refactored to TypeScript and JsonConfig
- (bluefox) Breaking: Node.js >= 22.19, js-controller >= 6.0.11 and admin >= 7.0.0 are required now
- (bluefox) Replaced the deprecated `request` package with `axios`
- (bluefox) The Blockly block was migrated to TypeScript and works again with the current Blockly editor
- (bluefox) Blockly: an empty message no longer breaks the script, the log shows the phone number value

### 0.3.0 (2024-05-25)
* Important: Node.js 18 and js-controller 5.0.19 is required at least
* (Sneak-L8) Treats all response codes other than 200 as errors

### 0.2.3 (2022-08-29)
* (Apollon77) Refer to website for current phone number

### 0.2.2 (2022-03-27)
* (Apollon77) Fix message encoding

## License
MIT License

Copyright (c) 2020-2026 Bluefox <dogafox@gmail.com>

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