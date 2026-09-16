---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sofarcloud/README.md
title: ioBroker.sofarcloud
hash: 0lsPEJwMLxyEt/JLISDvmnG5Yv81xQZ9pacM0Y4CJqw=
---
![Logo](../../../en/adapterref/iobroker.sofarcloud/admin/sofarcloud.jpg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sofarcloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sofarcloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sofarcloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sofarcloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sofarcloud.png?downloads=true)
![Test und Freigabe](https://github.com/ltspicer/ioBroker.sofarcloud/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sofarcloud

## sofarcloud-Adapter für ioBroker

Dieser Adapter liest die Daten vom SofarCloud-Server und speichert sie im Datenpunkt sofarcloud.

Der SofarCloud-Server speichert Daten von Sofar-Wechselrichtern.

Installieren Sie zunächst die App ( <https://de.sofarsolar.com/cloud.html> ) und registrieren Sie Ihren Sofar-Wechselrichter.

Anschließend müssen Sie Ihre Anmeldedaten (E-Mail-Adresse und Passwort) im Adapter eingeben.

Die Daten können bei Bedarf über MQTT an ein anderes System gesendet werden.

Die empfangenen Daten können auch als JSON (sofar\_realtime.json) gespeichert werden.

## Changelog
### 3.4.3 (2026-06-12)

- changed setTimeout to this.setTimeout

### 3.4.2 (2026-05-29)

- Translation issues resolved

### 3.4.1 (2026-05-26)

- process.exit() issue resolved

### 3.4.0 (2026-04-06)

- node > 20

### 3.3.0 (2026-01-28)

- Better Admin menu

[Older changelogs can be found there](https://github.com/ltspicer/ioBroker.sofarcloud/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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