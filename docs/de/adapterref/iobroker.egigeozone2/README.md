---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.egigeozone2/README.md
title: kein Titel
hash: ukMdhtpnvkfB8vxKtyXYZAvPl6qc2x9EJsiwjftHKGs=
---
![Logo](../../../en/adapterref/iobroker.egigeozone2/admin/egigeozone.png)

![Anzahl der Installationen](http://iobroker.live/badges/egigeozone2-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.egigeozone2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.egigeozone2.svg)
![NPM](https://nodei.co/npm/iobroker.egigeozone2.png?downloads=true)

## IoBroker.egigeozone2
[![Testen und Freigeben](https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/egigeozone2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung
Dies ist ein ioBroker-Adapter für die Android-Geofencing-App „EgiGeoZone“ ([Webseite](https://egigeozone.de/)). Er kann Geofence-Ereignisse als HTTP-Anfragen empfangen, wenn Sie mit Ihrem Mobilgerät einen definierten Bereich betreten oder verlassen.

## Sicherheitshinweis
Es wird nicht empfohlen, diesen Adapter dem öffentlichen Internet zugänglich zu machen (z. B. indem Sie den konfigurierten Port in Ihrem Router öffnen). Dies bedeutet, dass jede Anfrage an diesen Port an die ioBroker-Instanz weitergeleitet wird, auf der der Adapter ausgeführt wird. Es gibt mehrere Möglichkeiten, den Zugriff auf diesen Adapter sicherer zu machen:

* Nutzen Sie für Anfragen oder
* Integrieren Sie einen Proxyserver (z. B. nginx) zum Filtern eingehender Anfragen.

## Aufbau
Innerhalb von EgiGeoZone sollte die URL mit der folgenden Syntax definiert werden:

Protokoll://Adresse:Port/Person

* **Protokoll** könnte **http** oder **https** sein.
* **Adresse** sollte die Adresse sein, unter der die Adapterinstanz zugänglich ist.
* **Port** sollte der Port sein, auf dem der Adapter lauscht.
* **Person** ist die Person, die zur Auflistung im atHome-Array verwendet wird.

### Beispiele
* https://my-domain:7654/John oder
* http://meine-domain:7654/Paul

## Credits
Die Implementierung basiert größtenteils auf [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) & BasGos [ioBroker.egigeozone](https://github.com/BasGo/ioBroker.egigeozone) Adapter. Das Logo wurde von [Free Icons PNG] übernommen.](http://www.freeiconspng.com/images/maps-icon) von dschaedl und wurde so geändert, dass sie einen transparenten Hintergrund hat.

## Changelog

### 1.0.5
* (obakuhl) use `@iobroker/webserver`

### 1.0.4
* (obakuhl) Password encryption active, minor code improvements

### 1.0.3
* (obakuhl) Updating dependencies

### 1.0.2
* (obakuhl) Updating dependencies

### 1.0.1
* (obakuhl) Resolved minor issue when leaving location 
* (obakuhl) Raised minimum version of adapter-core to 3.1.4 and node >= 18

### 1.0.0
* (obakuhl) Refactoring
* (obakuhl) New name (ioBroker.egigeozone -> ioBroker.egigeozone2) necessary due to npm collaborators settings of [previous adapter ioBroker.egigeozone](https://github.com/BasGo/ioBroker.egigeozone)

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2024 obakuhl <hello@obakuhl.com>

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