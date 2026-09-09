---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: C77/s6KN2XAqArbUPAGdpTKiVWkd9yskKbayitLGYqU=
---
![Logo](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Gesamte Downloads](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Anforderungen an die Node-Version](https://img.shields.io/node/v/iobroker.eusec)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/eusec-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/eusec-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![NPM](https://nodei.co/npm/iobroker.eusec.png?downloads=true)

# ioBroker.euSec

**Tests:**![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

Dies ist ein [ioBroker-](https://www.iobroker.net) Adapter, der die [eufy-security-client-](https://github.com/bropat/eufy-security-client) Bibliothek zur Kommunikation mit Eufy-Geräten verwendet.

**Dieses Projekt steht in keiner Verbindung zu Anker und Eufy (Eufy Security). Es handelt sich um ein privates Projekt, das in der Freizeit betreut wird.**

## Beschreibung

Mit diesem Adapter können Sie [Eufy-Sicherheitsgeräte](https://us.eufylife.com/collections/security) steuern, indem Sie eine Verbindung zu den Eufy-Cloud-Servern und lokalen/Remote-Stationen herstellen.

Sie müssen Ihre Cloud-Anmeldedaten angeben. Der Adapter verbindet sich mit Ihrem Cloud-Konto und ruft alle Gerätedaten per HTTPS ab. Nun wird auch eine lokale oder Remote-P2P-Verbindung zu den Eufy-Stationen/Geräten unterstützt. Eine Verbindung zur Eufy Cloud ist jedoch immer Voraussetzung.

Eine Adapterinstanz zeigt alle Geräte eines Eufy Cloud-Kontos an und ermöglicht deren Steuerung.

## Dokumentation

Die Dokumentation finden Sie [hier](https://iobroker-community-adapters.github.io/ioBroker.eusec/) .

## Bekannte funktionierende Geräte

Informationen zu unterstützten Geräten finden Sie [hier](https://github.com/bropat/eufy-security-client#known-working-devices) .

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von Patrick Broetto (brobat) <https://github.com/bropat> , der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

## WICHTIGE Informationen zum Upgrade auf Node.js 22

Adapter 2.0.3 und neuere Versionen unterstützen Node.js 22. Ältere Node.js-Versionen erfordern eine spezielle Konfiguration, die mit Node.js 22 nicht mehr erforderlich ist. Gehen Sie daher beim Aktualisieren von Node.js von einer Version unter 22.xx auf Node.js 22 wie folgt vor:

- Falls Sie node.js < 22 und adapter < 2.0.0 installiert haben, aktualisieren Sie bitte zuerst node.js und installieren Sie anschließend adapter 2.0.3.
- Wenn Sie einen Adapter ab Version 2.0.0 mit einer Node-Version vor 22 installiert haben, müssen Sie den Adapter neu installieren. Eine detaillierte Beschreibung (auf Deutsch) finden Sie in unserem Forum ( <https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x> ).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.0 (2026-09-03)
- (typhosj) The adapter requires node.js >= 24 now as`eufy-security-client` 4.x requires `node >=24` itself
- (typhosj) The `livestream`, `livestream_rtsp` and `rtsp_stream_url` states are emptied instead of deleted when a stream ends. 
- (typhosj) Removed the "HTTPS streaming url" setting. The adapter never configures TLS for go2rtc and go2rtc ignores `api.tls_listen` without a certificate, so the option only ever produced a livestream URL that could not be opened. The URL is built with `http` now
- (typhosj) The livestream page (`http://<host>:1984/stream.html?src=<serial>`) is now served by the adapter, with the defaults that make a stream unstable on weak clients such as a Fire tablet
- (typhosj) The `livestream` state now carries `&background=false`, so the player disconnects while its page is not visible. Without it the browser keeps decoding behind a switched off display and leaves a consumer attached that never recovers once the producer is gone
- (typhosj) go2rtc serves its web pages from the adapter directory now (`api.static_dir`). That replaces the files embedded in go2rtc, so the stream list, the log page, the link list and the WebRTC viewer are shipped along and keep answering.

### 3.0.2 (2026-09-02)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Refactoring
- (@GermanBluefox) Fixed login failing with `Get passport profile - Response code not ok` since the eufy cloud started answering successful requests with code 200 instead of 0 (see [bropat/eufy-security-client#975](https://github.com/bropat/eufy-security-client/pull/975))
- (typhosj) Fixed livestreaming being broken when go2rtc is configured to use an API port other than 1984, and the eufy livestream is now stopped when streaming into go2rtc fails ([#151](https://github.com/iobroker-community-adapters/ioBroker.eusec/pull/151), [#160](https://github.com/iobroker-community-adapters/ioBroker.eusec/issues/160))
- (typhosj) go2rtc is now supervised and restarted if it terminates unexpectedly, the livestream states are cleared when a station disconnects, and a warning is logged when a camera streams at "Auto" quality ([#152](https://github.com/iobroker-community-adapters/ioBroker.eusec/pull/152))
- (@GermanBluefox) The warning about the "Auto" streaming quality now also covers devices where "Auto" is not value 0 (eufyCam 3, Professional models and battery doorbells)
- (@GermanBluefox) Removed the obsolete CVE-2023-46809 workaround for node.js 20 from the adapter startup
- (@GermanBluefox) Pinned eufy-security-client to 4.1.1-1 and removed the unused packages mime and @types/ffmpeg-static

### 2.0.3 (2025-10-26)
- (mcm1957) Remove fix for CVE-2023-46809 for node.js 22 and newer

### 2.0.0 (2025-10-26)

- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.3 (2024-09-28)

* (bropat) Updated version of the package eufy-security-client (3.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (3.1.1)


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 bropat <patrick.broetto@gmail.com>

The web pages in `www/` that go2rtc serves are taken from [go2rtc](https://github.com/AlexxIT/go2rtc),
MIT licensed, Copyright (c) 2022 Alexey Khit. Their license text is in `www/LICENSE.go2rtc`, the list
of files and what was changed is in `www/VENDOR.md`.

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