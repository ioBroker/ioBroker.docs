---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: UTpkl3VurYY2nwv7WNVQlk5UkRFhLRNI6n5HQjN73a8=
---
![Logo](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Anzahl der Installationen](https://iobroker.live/badges/proxy-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.proxy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.proxy/actions/workflows/test-and-release.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# ioBroker.proxy

## Verwendung

Ermöglicht den Zugriff auf definierte URLs oder lokale Dateien über einen Webserver.

Die konfigurierten Routen sind verfügbar unter `http://ip:8082/proxy.0/context/...` Port, Protokoll und `proxy.0` variieren je nach Einstellungen.

## Konfiguration

- Als Webadaptererweiterung verwenden: die Webinstanz, die dieser Proxy erweitert.
- Routenpfad: Pfad zum Proxy. Falls es sich um einen handelt `/proxy.0` Die Routen sind verfügbar unter `http://webIP:8082/proxy.0/...` Leer bedeutet `proxy.<instance>/` Stellen Sie es ein auf `/` um die Routen direkt unterhalb des Stammverzeichnisses des Webservers zu installieren, z. B. in einem Kontext `.well-known/acme-challenge/` ist dann verfügbar unter `http://webIP:8082/.well-known/acme-challenge/...`
- Verwenden Sie einen einfachen Proxy (ohne Sockets): Hierbei handelt es sich um eine sehr einfache, aber robuste Methode. Sie ist nicht für WebSockets oder POST-Anfragen geeignet. Verwenden Sie sie, wenn Probleme mit der Webinstanz oder der Socket.IO-Kommunikation auftreten.
- Fehler-Timeout (ms): Minimales Intervall zwischen Wiederholungsversuchen, falls die angeforderte Ressource nicht verfügbar war oder einen Fehler zurückgegeben hat.
- Maximale Anzahl paralleler Anfragen: Standardwert für alle Pfade, wie viele Anfragen gleichzeitig bearbeitet werden dürfen (wird vom einfachen Proxy nicht verwendet).

## Beispieleinstellungen

| Kontext   | URL                              | Beschreibung                                                                             |
| --------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| admin/    | <http://localhost:8081>          | Zugriff auf die Admin-Seite                                                              |
| Router/   | <http://192.168.1.1>             | Zugriff auf lokalen Router                                                               |
| Nocken/   | <http://user:pass@192.168.1.123> | Zugriff auf die Webcam (z. B. Aufruf von <http://ip:8082/proxy.0/cam/web/snapshot.jpg> ) |
| dir/      | /tmp/                            | Zugriff auf das lokale Verzeichnis "/tmp/"                                               |
| dir/      | tmp/                             | Zugriff auf das lokale Verzeichnis "/opt/iobroker/node\_modules/tmp"                     |
| Datei.jpg | /tmp/picture.jpg                 | Zugriff auf die lokale Datei "/tmp/picture.jpg"                                          |

Relative Pfade lokaler Dateien und Verzeichnisse beziehen sich auf das übergeordnete Verzeichnis. `node_modules` Verzeichnis von ioBroker (z. B. `/opt/iobroker/node_modules`).

Jede Regel kann ein eigenes Timeout und eine eigene maximale Anzahl paralleler Anfragen haben. Sind diese Werte leer, werden das Fehler-Timeout und die maximale Anzahl paralleler Anfragen aus den Haupteinstellungen verwendet.

**Nicht alle Geräte können über einen Proxy aufgerufen werden.**

Manche Geräte möchten im Stammverzeichnis installiert werden. `http://ip/` und kann nicht ausgeführt werden unter `http://ip/proxy.0/context/` Die

Mehr zum Thema Kontext können Sie [hier](https://www.npmjs.com/package/http-proxy-middleware#context-matching) lesen.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 2.0.1 (2026-11-02)
- (bluefox) **Breaking change:** Node.js >= 22.19 and admin >= 7.6.20 are required now
- (bluefox) The adapter was refactored to TypeScript and JsonConfig; `request` was replaced by `axios` and `mime` by `mime-types`
- (bluefox) Fixed: files outside of a configured local directory could be read via ".." in the path
- (bluefox) Fixed: the timeout check was not stopped when web unloaded the extension
- (bluefox) Documented how to install the routes directly below the root of the web server (route path `/`) (#133)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (ipod86) Credentials are masked in all log lines (`user:pass@` and query parameters like `password`, `user`, `token`, `apikey`); the proxy options are logged at debug level only (#276)

### 1.3.2 (2022-10-01)
* (Apollon77) Allow to also proxy files directly

### 1.3.1 (2022-06-02)
* (Apollon77) Revert the automatic WS upgrade call added in 1.3.0 because produced sometimes issues with websocket connections

### 1.3.0 (2022-05-30)
* (Apollon77) Allow to configure the maximum parallel requests by route and/or globally. Default is 10 as of now too
* (Apollon77) Try to prevent crashes by socket errors

### 1.2.2 (2021-03-07)
* (Apollon77) Fallback to "application/octet-stream" when mime type for a file could not be determined
* (Apollon77) Cut filenames when looking them up in the filesystem if "?" or "#" are included

## License
The MIT License (MIT)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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