---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dnscope/README.md
title: ioBroker.dnscope
hash: GUqvuCkQoL1L7hW4h0z+PYupm9bYmJVjCrNgGIjGzkQ=
---
![Logo](../../../en/adapterref/iobroker.dnscope/admin/dnscope.png)

![Anzahl der Installationen](http://iobroker.live/badges/dnscope-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.dnscope.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dnscope.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.dnscope/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.dnscope?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.dnscope
![Test und Freigabe](https://github.com/simatec/ioBroker.dnscope/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter nutzt den Dienst `Sentry.io`, um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemas zu melden. Weitere Details finden Sie unten!

---

## Unterstützungsadapterentwicklung
**Wenn Ihnen DNScope gefällt, erwägen Sie bitte eine Spende:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Beschreibung
Mit DNScope können Sie Ihr dynamisches DNS-Konto direkt in ioBroker aktualisieren.
Sie können Ihr DNS-Konto ohne Umwege oder zusätzliche Hardware mit der aktuellen IP-Adresse Ihrer Umgebung aktualisieren.

Sie können das Intervall für die Überprüfung und Aktualisierung festlegen.
Das Standardintervall beträgt 10 Minuten.

Folgende DynDNS-Anbieter werden derzeit unterstützt:

* IPv64
* DuckDNS
* NoIP
* Dynv6
* Brauch

Bei Auswahl von `Custom` kann eine direkte Update-URL angegeben werden, um jeden Provider zu integrieren, der dies unterstützt.

Folgende Platzhalter können in der benutzerdefinierten URL verwendet werden und werden zur Laufzeit durch die aktuelle IP-Adresse ersetzt:

| Platzhalter | Beschreibung |
|---|---|
| `{{ipv4}}` | Aktuelle öffentliche IPv4-Adresse |
| `{{ip}}` | Aktuelle IP-Adresse (IPv4 im IPv4-Update, IPv6 im IPv6-Update) |
| `{{ip}}` | Aktuelle IP-Adresse (IPv4 im IPv4-Update, IPv6 im IPv6-Update) |

**Beispiel:**

```
https://dynupdate.example.com/update?hostname=myhome.example.com&myip={{ipv4}}&token=abc123
```

---

## Adapterkonfiguration
Für die Adapterkonfiguration benötigen Sie Ihre Zugangsdaten zum DynDNS-Dienst.
Je nach Anbieter kann dies ein Token oder ein Benutzername/Passwort sein.

Sie müssen außerdem die zu aktualisierende Domäne eingeben.

Wenn Sie mehrere Domains aktualisieren müssen, benötigen Sie pro Domain eine Instanz.

--- <!-- ### **IN BEARBEITUNG** -->

## Changelog
### 0.3.0 (2026-08-20)
* (simatec) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Source code cleaned up
* (HJS72) Add detailed debug diagnostics for failed update requests (HTTP status, body, and headers)
* (HJS72) Ship compiled build output with the latest logging changes
* (HJS72) Fix HTTP 400 error when IP address could not be determined (skip update instead)
* (HJS72) Add debug log output for the full update request URL
* (HJS72) Add IP placeholder support for custom update URL (`{{ipv4}}`, `{{ipv6}}`, `{{ip}}`)

### 0.2.9 (2026-04-26)
* (simatec) dependencies updated
* (simatec) Source code cleaned up

### 0.2.8 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 0.2.7 (2025-11-23)
* (simatec) dependencies updated

### 0.2.6 (2025-10-25)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 simatec

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