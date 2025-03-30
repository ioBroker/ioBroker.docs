---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dnscope/README.md
title: ioBroker.dnscope
hash: q1/5Gmkk07joBqUydHoSeR9eI4zDKKfruoBil8eWV2E=
---
![Logo](../../../en/adapterref/iobroker.dnscope/admin/dnscope.png)

![Anzahl der Installationen](http://iobroker.live/badges/dnscope-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.dnscope.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dnscope.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/simatec/ioBroker.dnscope/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.dnscope?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.dnscope
![Testen und Freigeben](https://github.com/simatec/ioBroker.dnscope/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter nutzt den Dienst `Sentry.io`, um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemata zu melden. Weitere Details siehe unten!

---

## Adapterentwicklung unterstützen
**Wenn Ihnen DNScope gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Beschreibung
Mit DNScope können Sie Ihr dynamisches DNS-Konto direkt in ioBroker aktualisieren.
Es ist möglich, Ihr DNS-Konto ohne Umwege oder zusätzliche Hardware mit der aktuellen IP-Adresse Ihrer Umgebung zu aktualisieren.

Sie können das Intervall festlegen, in dem die Prüfung und Aktualisierung erfolgen soll.
Das Standardintervall beträgt 10 Minuten.

Folgende DynDNS-Anbieter werden derzeit unterstützt:

* IPv64
* DuckDNS
* Keine IP
* Dynv6
* Brauch

Bei der Auswahl von `Custom` besteht die Möglichkeit, eine direkte Update-URL anzugeben, um alle Provider einzubinden, die dies unterstützen.

---

## Adapterkonfiguration
Für die Adapterkonfiguration werden Ihre Zugangsdaten zum DynDNS-Dienst benötigt.
Je nach Anbieter kann es sich dabei um einen Token oder um Benutzername/Passwort handeln.

Außerdem müssen Sie die Domäne angeben, die aktualisiert werden soll.

Wenn Sie mehrere Domänen haben, die aktualisiert werden sollen, benötigen Sie eine Instanz pro Domäne

--- <!-- ### **IN ARBEIT** -->

## Changelog
### 0.2.0 (2025-03-23)
* (simatec) Fix Delay
* (simatec) Fix States
* (simatec) dependencies updated

### 0.1.0 (2025-03-16)
* (simatec) First Beta

---

## License
MIT License

Copyright (c) 2025 simatec

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