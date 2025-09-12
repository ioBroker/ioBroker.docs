---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles-ms/README.md
title: ioBroker.hoymiles-ms
hash: BPRyqwDODN2tHAKClSYQAInymu/9hXiS5ctU+20iSyU=
---
![Logo](../../../en/adapterref/iobroker.hoymiles-ms/admin/hoymiles-ms.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/hoymiles-ms-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/hoymiles-ms-stable.svg)
![Lizenz](https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.hoymiles-ms
![Testen und Freigeben](https://github.com/mcm4iob/ioBroker.hoymiles-ms/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.
**************************************************************************************************************

## Hoymiles-ms-Adapter für ioBroker
Dieser Adapter integriert die **HOYMILES** **M**icro**S**torage-Systeme (derzeit nur Hoymiles SM-A2) in ioBroker. Eine Gerätebeschreibung ist verfügbar [Hier](https://www.hoymiles.com/de/products/micro-storage).

Beachten Sie, dass dieser Adapter in keiner Weise mit dem oben genannten Unternehmen verbunden ist und keinerlei Geschäftsbeziehung besteht.

**************************************************************************************************************

## Haftungsausschluss
**Alle Produkt- und Firmennamen sowie Logos sind Warenzeichen™ oder eingetragene Warenzeichen® ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch diese oder verbundene Tochterunternehmen! Dieses persönliche Projekt wird in der Freizeit gepflegt und verfolgt kein Geschäftsziel.**

**************************************************************************************************************

## Dokumentation
Detaillierte Einrichtungsanweisungen, Konfigurationshandbuch und umfassende Referenzdokumentation:

- **[Englische Dokumentation](doc/en/DOCUMENTATION_en.md)**
- **[Deutsche Dokumentation](doc/de/DOCUMENTATION_de.md)**

## Konfiguration
### Konfiguration des Adapters
Der Adapter kann als dedizierter MQTT-Server oder als MQTT-Client konfiguriert werden (Hinweis: Client-Modus noch nicht implementiert).

Für den Betrieb als MQTT-Server müssen die folgenden Parameter konfiguriert werden:

- MQTT-Netzwerk

Geben Sie das Netzwerk an, auf dem gelauscht werden soll. Normalerweise reicht es aus, auf allen Netzwerken (0.0.0.0) zu lauschen.

- MQTT-Port

Geben Sie den zu verwendenden (TCP-)Port an. Da der Standard-MQTT-Port (1883) möglicherweise vom ioBroker.mqtt-Adapter belegt ist und Port 1882 vom Adapter ioBroker.shelly verwendet wird, verwendet dieser standardmäßig Port 1881. Sie können jedoch jeden freien Port verwenden.

### Konfiguration des Hoymiles MS-A2
Um die Hoymiles MS-A2-Einheit zu konfigurieren, öffnen Sie die S-Miles Home App. Wählen Sie die Konfigurationsseite (über das Zahnradsymbol in der oberen rechten Ecke) und scrollen Sie nach unten zu „MQTT-Service“. Aktivieren Sie den MQTT-Service und geben Sie ein

- Serveradresse

die IP-Adresse des ioBroker-Systems (bei Verwendung des MQTT-Servermodus) oder die Adresse Ihres MQTT-Brokers

- Hafen

Die Por-Nummer konfiguriert Ihren MQTT-Broker

- Optional ein Client-Präfix festlegen (Standard: „MSA“)

Dieser Adapter unterstützt derzeit noch keine Authentifizierung. Daher muss diese deaktiviert werden.

## Betrieb
Sobald der Adapter gestartet ist, lauscht er auf MQTT-Pakete, die vom Hoymiles-Gerät empfangen werden. Der Adapter führt keine Abfragen durch – alle Aktivitäten werden von der Hoymiles-Einheit ausgelöst. Beachten Sie, dass Konfigurationsdaten nur einmal nach Verbindungsaufbau gesendet werden, während Echtzeitdaten sekündlich gesendet werden. Systemweite Statistiken werden typischerweise alle fünf Minuten aktualisiert. Beachten Sie, dass diese Intervalle nicht vom Adapter konfigurierbar sind – sie werden von der Hoymiles-API definiert.

**************************************************************************************************************

**Wenn Ihnen dieser Adapter gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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