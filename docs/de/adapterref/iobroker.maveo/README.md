---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maveo/README.md
title: ioBroker.maveo
hash: vTNzWEpWpuE7gNqDA3o4btfxKhZvPphlE9WLKanaZvk=
---
![Logo](../../../en/adapterref/iobroker.maveo/admin/maveo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.maveo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maveo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/maveo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/maveo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.maveo.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

# ioBroker.maveo

## Maveo-Adapter für ioBroker

Adapter für die Maveo Garagentorsysteme von Marantec. Zwei Betriebsmodi:

- **Cloud-Modus (Standard)** – Anmeldung an der Marantec-Cloud (Amazon Cognito), Steuerung über den Nymea-Tunnel`wss://remoteproxy.nymea.io` Die Box muss **über Bluetooth-Onboarding** in der Maveo-App gekoppelt werden (die App schreibt die Cognito-Identitäts-ID während des Onboardings in die Box). Wurde die Box nur lokal hinzugefügt, ist die Liste der Cloud-Geräte leer; in diesem Fall meldet der Adapter dies im Protokoll, und Sie können in den LAN-Modus wechseln.
- **LAN-Modus** — direkte JSON-RPC-Verbindung zum Gerät (`<boxIp>:2222` Die Authentifizierung erfolgt standardmäßig über TLS. Beim ersten Start wird eine Authentifizierung per Knopfdruck durchgeführt: Drücken Sie innerhalb von 60 Sekunden die gelbe Taste auf der Rückseite der Maveo-Box. Das generierte Token wird im Adapter gespeichert. Diese Methode funktioniert unabhängig vom Cognito-Konto und ist die zuverlässigste Option, wenn die Box im lokalen Netzwerk erreichbar ist.

Statusaktualisierungen (Position, Bewegung, Sensoren) werden in beiden Modi als Push-Benachrichtigungen übermittelt.`Integrations.StateChanged` ; Öffnen/Schließen wird ausgegeben über`Integrations.ExecuteAction` Die

## Konfiguration

| Feld                        | Bedeutung                                            | Standard |
| --------------------------- | ---------------------------------------------------- | -------- |
| `App Email` /`App Password` | Anmeldeinformationen der Maveo-App (nur Cloud-Modus) | —        |
| `Region`                    | `eu` (Europa) oder`us` (USA)                         | `eu`     |
| `IoT wake topic`            | Optionales AWS IoT-Thema zum Aktivieren der Box      | leer     |
| `Maveo box IP`              | Aktiviert den LAN-Modus, wenn eingestellt            | leer     |
| `Port`                      | JSON-RPC-Port                                        | 2222     |
| `TLS`                       | SSL für den JSON-RPC-Socket                          | An       |

Die Cognito-Pool-/Client-IDs und IoT-Endpunkte sind in der Maveo-App 2.6.1 fest codiert und regionsabhängig. Das lokale Druckknopf-Token wird verschlüsselt gespeichert.`native.localToken` Die

## Kontrolle

Für jedes Element erzeugt der Adapter beschreibbare Zustände unter`maveo.<inst>.<thingId>.remote.<action>` (Zum Beispiel`open` ,`close` ). Das Schreiben eines beliebigen Wertes in einen solchen Zustand führt zu Problemen`Integrations.ExecuteAction` Statusänderungen werden automatisch als Push-Updates übernommen.`maveo.<inst>.<thingId>.<stateTypeId>` Die

## Diskussion

<https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x>

## Posten

Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an den Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry) .

## Changelog

### 0.1.2

* Garage door position and movement are now also published as simple boolean
  states in the `status` channel — `isOpen`, `isClosed`, `isOpening`,
  `isClosing` and `isMoving`. These are much easier to use in logic blocks and
  visualizations than the original text value (`open`/`closing`/…) and arrow
  glyph (`↑`/`↓`/`-`), which remain available unchanged.

### 0.1.1

* **Local (LAN) control added — this is the easy, recommended way and needs no
  cloud account:**
  1. Find the IP address of your maveo box (check your router's device list).
  2. In the adapter settings enter it under **Maveo box IP** and save.
  3. On the first start the adapter asks you to press the **yellow button on
    the maveo box**. You have 5 minutes — just walk over and press it once.
  4. Done. The token is stored, future restarts connect on their own.
* Cloud login (maveo app e-mail/password) still works as an alternative.
* Your garage door, light and sensors show up as ready-to-use data points
  under `maveo.0.<device>` — with an `open`/`close`/`light` control section
  and a `status` section.

### 0.1.0

* First working version against the current Marantec/nymea backend: cloud
  login, device discovery and remote control.

### 0.0.5

* (TA2k) update login keys

### 0.0.4

* (TA2k) fix status

### 0.0.1

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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