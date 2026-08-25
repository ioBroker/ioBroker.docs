---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zte-mc888/README.md
title: ioBroker.zte-mc888
hash: v53dMYCwOaCCfF+zXcVK9Zhql55pO/YHWip7D+jETHA=
---
# IoBroker.zte-mc888
Liest LTE- und 5G-Signalwerte von einem ZTE MC888-Router und stellt sie als ioBroker-Zustände bereit.

## Unterstütztes Gerät
[ZTE MC888 5G FWA (Indoor-Router)](https://www.ztedevices.com/de/products/mobile-internet/5g-fwa/MC888.html) — Produktseite bei ZTE Devices.

Der Adapter kommuniziert mit der lokalen HTTP-API `goform` des Routers, daher sind weder ein Cloud-Konto noch eine Internetverbindung erforderlich.

## Staaten
Alle Zustände sind schreibgeschützt. Die Zustände `…Dec` stellen die Dezimaldarstellung des daneben stehenden rohen Hexadezimalwerts dar (so wird es in der Weboberfläche des Routers angezeigt).

### `general`
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `networkType` | Zeichenkette | | Aktueller Netzwerktyp, z. B. `ENDC` oder `LTE` |
| `cellIdDec` | Nummer | | Zellen-ID als Dezimalzahl |
| `cellIdDec` | Nummer | | Zellen-ID als Dezimalzahl |

### `lte` — LTE-Primärzelle
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `rsrp` | Nummer | dBm | Empfangsleistung des Referenzsignals |
| `sinr` | Zahl | dB | Signal-Rausch-Verhältnis |
| `rssi` | Nummer | dBm | Empfangene Signalstärke |
| `band` | Zeichenkette | | Band des primären Trägers, z. B. `3` |
| `bandName` | Zeichenkette | | Band, wie in den Zellinformationen angegeben, z. B. `LTE BAND 3` |
| `arfcn` | Zeichenkette | | Downlink EARFCN (Kanalnummer) |
| `bandwidth` | Zeichenkette | | Bandbreite des primären Trägers |
| `pci` | Zeichenkette | | Physikalische Zellen-ID (hex) |
| `pciDec` | Nummer | | Physikalische Zellen-ID als Dezimalzahl |
| `carrierAggregation` | Zeichenkette | | Vom Router gemeldeter Carrier-Aggregation-Status |
| `carrierAggregation` | Zeichenkette | | Vom Router gemeldeter Carrier-Aggregation-Status |

### `lte.scc0` … `lte.scc3` — LTE-Sekundärträger
Ein Kanal pro sekundärer Trägerzelle (bis zu vier), jeweils mit den gleichen Zuständen:

| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `active` | boolescher Wert | | `true` solange dieser sekundäre Träger verwendet wird |
| `band` | Nummer | | Band |
| `arfcn` | Nummer | | Kanalnummer |
| `bandwidth` | Nummer | MHz | Bandbreite |
| `rsrp` | Nummer | dBm | Empfangsleistung des Referenzsignals |
| `rsrq` | Nummer | dB | Empfangsqualität des Referenzsignals |
| `sinr` | Zahl | dB | Signal-Rausch-Verhältnis |
| `rssi` | Nummer | dBm | Empfangene Signalstärke |
| `rssi` | Zahl | dBm | Empfangene Signalstärke |

### `nr5g` — 5G NR Primärzelle
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `rsrp` | Nummer | dBm | Empfangsleistung des Referenzsignals |
| `sinr` | Zahl | dB | Signal-Rausch-Verhältnis |
| `rssi` | Nummer | dBm | Empfangene Signalstärke |
| `band` | Zeichenkette | | Band, z. B. `78` |
| `bandName` | Zeichenkette | | Band wie in den Zellinformationen angegeben |
| `arfcn` | Zeichenkette | | NR-ARFCN (Kanalnummer) |
| `bandwidth` | Zeichenkette | | Bandbreite |
| `pci` | Zeichenkette | | Physikalische Zellen-ID (hex) |
| `pciDec` | Nummer | | Physikalische Zellen-ID als Dezimalzahl |
| `pciDec` | Nummer | | Physikalische Zellen-ID als Dezimalzahl |

### `info`
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `connection` | boolescher Wert | | `true` während die letzte Umfrage erfolgreich war |

Ohne Anmeldung übermittelt der Router lediglich den Netzwerktyp und die primären RSRP/RSSI-Werte; alle anderen Statusangaben bleiben leer. Siehe [Anmeldung, Sitzungen und die Web-Benutzeroberfläche](#login-sessions-and-the-web-ui).

## Konfiguration
- **Router-IP** — normalerweise `192.168.0.1`, einige Firmwares verwenden `192.168.254.1`.
- **Abfrageintervall** — Sekunden zwischen den Abrufen (5 bis 86400).
- **Anmeldung erforderlich** — aktivieren, wenn die API erst nach Authentifizierung antwortet.
- **Benutzername / Passwort** — die Router-Administratorzugangsdaten (Standardbenutzername ist `admin`).
- **Die Web-Oberfläche hat Priorität** *(nur nach Anmeldung)* — wenn die Router-Weboberfläche protokolliert

Bei Verwendung desselben Benutzers pausiert der Adapter, anstatt sich erneut anzumelden und die Verbindung zu trennen. Siehe unten.

- **Wartezeit nach Web-UI-Login (Minuten)** *(nur mit Login)* — wie lange

Der Adapter bleibt abgemeldet (und behält die letzten Werte bei), nachdem die Web-Oberfläche die Sitzung übernommen hat. Standardwert: 5. Setzen Sie den Wert auf `0`, um sich beim nächsten Abruf erneut anzumelden.

## Anmeldung, Sitzungen und die Web-Benutzeroberfläche
Der MC888 stellt ohne Authentifizierung nur wenige Felder bereit (Netzwerktyp + primäres RSRP/RSSI); für RSRQ, SINR, Frequenzbänder, PCI, Carrier Aggregation und die sekundären Zellen ist eine Anmeldung erforderlich. Der Router erlaubt zudem **nur eine Sitzung pro Benutzer**, und eine zweite Anmeldung beendet die erste.

Um Konflikte mit der Router-Weboberfläche (derselbe Benutzer `admin`) zu vermeiden, wird der Adapter verwendet:

1. Meldet sich einmal an und **behält** die Sitzung über mehrere Umfragen hinweg bei (vollständiger Feldsatz),
2. erkennt, wenn ein anderer Login (die Web-UI) seine Sitzung übernimmt,
3. Anschließend **wartet er die konfigurierte Zeit ab**, anstatt sich sofort wieder abzumelden.

Während dieses Zeitfensters bleiben die letzten Werte erhalten und nur die öffentlichen Felder werden aktualisiert, sodass Ihre Web-UI-Sitzung nicht gestört wird.

4. Erwirbt die Sitzung wieder, sobald die Wartezeit abgelaufen ist.

Wenn Sie lieber immer die vollständigen Daten haben möchten und es Ihnen nichts ausmacht, dass die Web-UI abgemeldet ist, deaktivieren Sie **Web-UI hat Priorität** (oder setzen Sie den Backoff auf `0`).

## Firmware-Unterschiede
Die Feldnamen des Routers variieren je nach Firmware-Version. Daher können einzelne Statuswerte bei manchen Firmware-Versionen leer bleiben. Sollte dies der Fall sein, senden Sie bitte eine Debug-Protokolldatei (Protokollierungsstufe `debug`, die die Router-Rohdaten protokolliert) sowie Ihre Firmware-Version. Anschließend kann die Unterstützung für die abweichenden Feldnamen im Adapter implementiert werden.

## Mitwirken
Hinweise zum Erstellen, Testen und Erweitern des Adapters finden Sie in [DEVELOPMENT.md](https://github.com/muraus/ioBroker.zte-mc888/blob/main/DEVELOPMENT.md).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.5 (2026-08-13)
* (Adapterman) Adapter requires admin >= 7.8.23 now.
* (Adapterman) The poll interval is now capped at 24 h so a huge value cannot overflow the timer
* (Adapterman) The web UI back-off is now capped at 24 h and both limits are enforced in the admin config
* (Adapterman) New adapter icon, delivered only in the admin directory as in the ioBroker template
* (Adapterman) Corrected and completed the list of adapter states in the README
* (Adapterman) Removed the install section from the README and moved the development notes to DEVELOPMENT.md

### 0.0.4 (2026-07-29)
* (Adapterman) Added the supported device section with a link to the ZTE MC888 product page
* (Adapterman) Corrected the required Node.js version in the development section
* (Adapterman) Added the readme link to io-package.json so Admin can link the documentation
* (Adapterman) Completed the author information in package.json, io-package.json and LICENSE

### 0.0.3 (2026-07-25)
* (Adapterman) Added ESLint (@iobroker/eslint-config) and prettier config plus a `lint` script
* (Adapterman) Added a tsconfig.json and a `check` script to type check the JavaScript sources via JSDoc
* (Adapterman) Fixed a crash in the poll loop when the router did not answer and no login is configured
* (Adapterman) Admin config is now translated into all 11 ioBroker languages (jsonConfig i18n)
* (Adapterman) Added dependabot configuration and VS Code JSON schema settings
* (Adapterman) Lint and type checking are now enforced in CI

### 0.0.2 (2026-07-25)
* (Adapterman) Normalized the repository URL in package.json
* (Adapterman) Release is published via npm trusted publishing and signed with provenance

### 0.0.1 (2026-07-25)
* (Adapterman) Initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Adapterman <adapterman@proton.me>

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