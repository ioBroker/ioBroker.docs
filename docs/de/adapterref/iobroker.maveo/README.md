---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maveo/README.md
title: ioBroker.maveo
hash: +GQ5WqtQ2YUxOnIFrRAURFLWvp9VbO/KPPHm/Qut4m0=
---
![Logo](../../../en/adapterref/iobroker.maveo/admin/maveo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.maveo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.maveo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/maveo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/maveo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.maveo.png?downloads=true)

# IoBroker.maveo
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

## Maveo-Adapter für ioBroker
Adapter für die Maveo Garagentorsysteme von Marantec. Zwei Betriebsmodi:

- **Cloud-Modus (Standard)** — Anmeldung über die Marantec-Cloud (Amazon Cognito),

Steuerung über den Nymea-Tunnel `wss://remoteproxy.nymea.io`.

Die Box muss **per Bluetooth-Onboarding** in der Maveo-App gekoppelt werden (die App schreibt die Cognito-Identitäts-ID während des Onboardings in die Box).

Wenn die Box nur lokal hinzugefügt wurde, ist die Cloud-Geräteliste leer. In diesem Fall meldet der Adapter dies im Protokoll, und Sie können in den LAN-Modus wechseln.

- **LAN-Modus** — direkte JSON-RPC-Verbindung zur Box (`<boxIp>:2222` über

TLS ist standardmäßig aktiviert. Beim ersten Start erfolgt eine Authentifizierung per Knopfdruck: Drücken Sie innerhalb von 60 Sekunden die gelbe Taste auf der Rückseite der Maveo-Box. Das generierte Token wird im Adapter gespeichert. Diese Funktion ist unabhängig vom Cognito-Konto und stellt die zuverlässigste Option dar, wenn die Box im lokalen Netzwerk erreichbar ist.

Statusaktualisierungen (Position, Bewegung, Sensoren) werden in beiden Modi als Push-Benachrichtigungen über `Integrations.StateChanged` übermittelt; Öffnen/Schließen wird über `Integrations.ExecuteAction` ausgelöst.

## Konfiguration
| Feld | Bedeutung | Standardwert |
|---|---|---|
| `App Email` / `App Password` | Anmeldeinformationen der Maveo-App (nur Cloud-Modus) | — |
| `IoT wake topic` | Optionales AWS IoT-Thema zum Aufwecken der Box | leer |
| `Maveo box IP` | Aktiviert den LAN-Modus, wenn | leer |
| `Port` | JSON-RPC-Port | 2222 |
| `TLS` | SSL für den JSON-RPC-Socket | ein |
| `TLS` | SSL für den JSON-RPC-Socket | ein |

Die Cognito-Pool-/Client-IDs und IoT-Endpunkte sind in der Maveo-App 2.6.1 fest codiert und regionsabhängig. Das lokale Druckknopf-Token wird verschlüsselt in `native.localToken` gespeichert.

## Kontrolle
Für jedes Objekt erstellt der Adapter beschreibbare Zustände unter `maveo.<inst>.<thingId>.remote.<action>` (z. B. `open`, `close`).
Das Schreiben eines beliebigen Werts in einen solchen Zustand löst `Integrations.ExecuteAction` aus.
Zustandsänderungen werden automatisch als Push-Updates in `maveo.<inst>.<thingId>.<stateTypeId>` übernommen.

## Diskussion
https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x

## Wächter
Dieser Adapter verwendet die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an den Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry).

## Changelog

### 0.1.0

* Two operating modes: cloud (Cognito + Nymea tunnel) and LAN (direct
  connection to the box with push-button auth). Region selectable (EU/US).
  Cognito pool/client IDs and cloud endpoints verified against the maveo app
  2.6.1 (Ghidra decompile). Thing/action discovery over Nymea, push-based
  state updates, working remote control, message buffering and exponential
  reconnect back-off.

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