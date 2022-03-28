---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: +4R0b4EKTxlIOP+ASeqLAdhQ4h9URBWifmI6ci2xrow=
---
![Logo](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Anzahl der Installationen](http://iobroker.live/badges/whatsapp-cmb-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# IoBroker.whatsapp-cmb
![Testen und freigeben](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Whatsapp-cmb-Adapter für ioBroker
Dank des kostenlosen [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/)-Dienstes können Sie mit diesem Adapter WhatsApp-Nachrichten an sich selbst oder eine andere Nummer senden.

**Hinweis** : *Die kostenlose API ist nur für den persönlichen Gebrauch bestimmt!*

### Aufbau
*Folgende Dokumentation wurde von [callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) Seite kopiert.*

Sie müssen den API-Schlüssel vom Bot abrufen, bevor Sie die API verwenden:

- Fügen Sie die Telefonnummer **+34 644 44 21 48** zu Ihren Telefonkontakten hinzu. (Nennen Sie es, wie Sie möchten.)
- Senden Sie diese Nachricht „Ich erlaube Callmebot, mir Nachrichten zu senden“ (auf Englisch) an den neu erstellten Kontakt (natürlich mit WhatsApp).
- Warten Sie, bis Sie die Meldung „API aktiviert für Ihre Telefonnummer“ erhalten. Ihr APIKEY ist 123123` vom Bot. Da sich dies noch im Beta-Test befindet, kann die Aktivierung bis zu 2 Minuten dauern.
- Die WhatsApp-Nachricht des Bots enthält den API-Schlüssel, der zum Senden von Nachrichten über die API erforderlich ist.
- Sie können jetzt den API KEY in der ioBroker-Konfiguration verwenden.

Beispiel: ![Beispiel](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Verwendungszweck
Es gibt zwei Möglichkeiten, eine Nachricht zu senden:

- über `whatsapp-cmb.0.sendMessage`. Schreiben Sie einfach einen Text in diesen Zustand und die Nachricht wird an die Standardnummer gesendet, die im Einstellungsdialog konfiguriert wurde.
- per Nachricht vom Javascript-Adapter:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Blockartig](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Wenn Sie Emojis senden möchten, lesen Sie bitte https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog
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

Copyright (c) 2020-2022 Bluefox <dogafox@gmail.com>

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