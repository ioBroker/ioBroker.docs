---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.electrolux-aeg/README.md
title: ioBroker.electrolux-aeg
hash: L+Ece5rBdU5zl8j2sfAU6V1dIq05WqCG2OczZw/W2Q8=
---
![Logo](../../../en/adapterref/iobroker.electrolux-aeg/admin/electrolux-aeg.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.electrolux-aeg.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.electrolux-aeg.svg)
![Anzahl der Installationen](https://iobroker.live/badges/electrolux-aeg-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/electrolux-aeg-stable.svg)
![NPM](https://nodei.co/npm/iobroker.electrolux-aeg.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.electrolux-aeg/workflows/Test%20and%20Release/badge.svg)

# ioBroker.electrolux-aeg

## Electrolux-AEG-Adapter für ioBroker

Adapter für Electrolux und AEG

Unterstützte Geräte werden über die offiziellen vernetzten Gerätedienste [von Electrolux](https://www.electrolux.com/) und [AEG](https://www.aeg.com/) verwaltet.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kontrolle

electrolux-aeg.0.XXXX.remote

## Einstellungen

electrolux-aeg.0.XXXX.control

Jede vom Gerät gemeldete beschreibbare Funktion wird in diesem Kanal zu einem Zustand: Dropdown-Menüs für Funktionen mit einer festen Werteliste, Schalter zum Ein-/Ausschalten von Funktionen, Zahlen mit ihrem zulässigen Bereich und Schaltflächen für schreibgeschützte Auslöser. In einem Container verschachtelte Funktionen werden benannt.`container_capability` , Zum Beispiel`userSelections_analogTemperature` Beim Schreiben eines Zustands wird die Änderung an das Gerät gesendet und der Wert wird beim nächsten Update vom Gerät zurückgespiegelt.

Die meisten Geräte akzeptieren nur Befehle, einschließlich`remote.START` Nachdem die Fernstartfunktion am Gerät selbst aktiviert wurde, kann der Adapter diese nicht einschalten; er protokolliert eine Warnung, wenn das Gerät meldet, dass die Fernstartfunktion ausgeschaltet ist.

Manche Einstellungen werden von der Cloud für bestimmte Modelle abgelehnt. Der Schreibvorgang wird dann als Warnung protokolliert und der Status auf den gemeldeten Wert zurückgesetzt; verwenden`remote.CustomCommand` In diesem Fall eine Rohnutzlast senden.

## Status

electrolux-aeg.0.XXXX.status

## Live-Events

electrolux-aeg.0.XXXX.events

## Abgeleitete Zustände

Der Adapter berechnet einige Hilfszustände aus den Rohdaten, sodass Skripte dies nicht tun müssen. Sie befinden sich neben den Rohwerten unter`electrolux-aeg.0.XXXX.status` :

| Zustand         | Bedeutung                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `running`       | Ein Programm ist in Arbeit.`PAUSED` Und`DELAYED_START` Als laufend zählen.                                                                                                                                  |
| `finishTime`    | Geschätztes Ende des laufenden Programms in Millisekunden seit dem 1. Januar 1970. Leer, wenn kein Programm ausgeführt wird. Wird nur aktualisiert, wenn sich die Schätzung um mehr als eine Minute ändert. |
| `cycleFinished` | `true` für das einzelne Update, bei dem ein Programm beendet wurde. Auslöser bei Änderung zu`true` Die                                                                                                      |

## Changelog

### 1.0.0 (2026-09-04)

- Breaking: WebSocket updates no longer create a second object tree. Values from `<appliance>.properties.*` now live under `<appliance>.status.*`, and the old tree is deleted on the first start. Update scripts, aliases, VIS and history settings.
- Breaking: `status.finishTime` is a number in milliseconds since the epoch instead of an ISO 8601 string, and `status.timeToEndMinutes` is gone - `status.properties.reported.timeToEnd` carries the remaining time in seconds with a role and a unit.
- Breaking: removed the `status.properties.metadata` tree and the empty `desired` / `metadataDesired` halves of the cloud shadow. The metadata timestamps froze after the first poll; instead every start now stamps the reported values with the moment the appliance changed them.
- Breaking: the enums of the capability document are one JSON list state instead of an empty channel per value, 140 objects on one oven. The empty channels of an older version are removed on the first start.
- Added the derived states `status.running`, `status.finishTime` and `status.cycleFinished`.
- Added a `control` channel with a writable state for every writable capability, so settings no longer have to be sent as a hand written `remote.CustomCommand` payload.
- Well known reported values now carry a role and a unit, so the type detector, VIS and the history adapters can use them.
- The session is kept in the instance data directory and reused after a restart, so a restart no longer needs a new login. The file holds the tokens only, with owner only permissions.
- WebSocket pushes now update the status tree with every derived and control state, not only the `events` channel, and an upgrade the cloud rejects with a 403 refreshes the access token instead of retrying with the dead one. Connect, close and reconnect moved to `debug`, the cloud drops an idle connection every ten minutes.
- Buttons below `remote` are released after the press, `Refresh` in particular stayed pressed for good. Control states the appliance does not report, such as `targetFoodProbeTemperatureC` without a probe, are initialized as empty.
- The network interface commands never become control states - one of them unregisters the appliance from the account - and a command is logged with a warning when the appliance reports remote control as switched off.
- Failures no longer take credentials or the instance with them: a failed request logs neither the Authorization header nor the password, an answer that does not carry what the next step reads is reported instead of ending in a TypeError, the update interval and the appliance brand are validated, and an error while a WebSocket message or a state change is processed is logged instead of ending the adapter process.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.14 (2026-08-06)

- Button states (`remote.Refresh`, `remote.START`, `remote.STOPRESET`) are now write-only (`read: false`) as required by the ioBroker state role specification.
- Sanitize remote command names coming from the cloud API before using them as object IDs; the raw command name is still sent to the API.
- Redact WebSocket debug logs instead of logging the raw payload.
- Await the logout request during unload and give it a shorter timeout than regular requests.
- Update axios to 1.19.0.

### 0.0.13 (2026-07-04)

- Trim old `common.news` entries for repository review.

### 0.0.12 (2026-07-04)

- Exclude `CHANGELOG_OLD.md` and test files from npm publishing.
- Tighten object ID sanitization to replace commas.
- Remove stale commented-out logout code and document raw/sanitized appliance ID mapping.

### 0.0.11 (2026-07-03)

- Republish the latest repository review fixes with npm provenance.
- Remove obsolete ESLint and Prettier dependencies after migrating to `@iobroker/eslint-config`.

Older changes are documented in [CHANGELOG_OLD.md](https://github.com/TA2k/ioBroker.electrolux-aeg/blob/main/CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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