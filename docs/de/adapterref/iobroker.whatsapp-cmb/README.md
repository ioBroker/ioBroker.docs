---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: lYtxUhl+rQUeHLNemk+zcyVV1CgJ01ScINDOgBXnsGI=
---
![Logo](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Anzahl der Installationen](http://iobroker.live/badges/whatsapp-cmb-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
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

- Fügen Sie die Telefonnummer XXXX (die aktuelle Nummer finden Sie auf der CallMeBot-Seite) zu Ihren Telefonkontakten hinzu. (Sie können den Kontakt beliebig benennen.)
- Sende diese Nachricht`I allow callmebot to send me messages` (auf Englisch) an den neu erstellten Kontakt (natürlich über WhatsApp).
- Warten Sie, bis Sie die Nachricht erhalten.`API Activated for your phone number. Your APIKEY is 123123` vom Bot. Da sich dies noch in der Beta-Testphase befindet, kann die Aktivierung bis zu 2 Minuten dauern.
- Die WhatsApp-Nachricht des Bots enthält den API-Schlüssel, der zum Senden von Nachrichten über die API benötigt wird.
- Sie können den API-Schlüssel nun in der ioBroker-Konfiguration verwenden.

Beispiel:![Beispiel](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Verwendung

Es gibt zwei Möglichkeiten, eine Nachricht zu senden:

- über`whatsapp-cmb.0.sendMessage` Geben Sie einfach einen Text in dieses Feld ein, und die Nachricht wird an die in den Einstellungen konfigurierte Standardnummer gesendet.
- per Nachricht vom JavaScript-Adapter:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Blockly](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Wenn Sie Emojis senden möchten, lesen Sie bitte <https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/>

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 0.3.0 (2024-05-25)
* Important: Node.js 18 and js-controller 5.0.19 is required at least
* (Sneak-L8) Treats all response codes other than 200 as errors

### 0.2.3 (2022-08-29)
* (Apollon77) Refer to website for current phone number

### 0.2.2 (2022-03-27)
* (Apollon77) Fix message encoding

### 0.2.1 (2022-03-25)
* (Apollon77) Add Emoticons support
* (Apollon77) Add Sentry for crash reporting

### 0.1.6 (2020-08-31)
* (Apollon77) Fixed the error with the phone number

### 0.1.3 (2020-08-29)
* (bluefox) The documentation and translations were added.

### 0.0.1 (2020-08-27)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2024 Bluefox <dogafox@gmail.com>

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