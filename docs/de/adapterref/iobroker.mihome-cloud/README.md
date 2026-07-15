---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: EgFNTjhuXL4jCtUWDqmgspUKCYzhPQkzbql0DIzpl1o=
---
![Logo](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Mihome-cloud Adapter für ioBroker
Adapter für alle Mi Home Cloud-Geräte. Verbindet sich mit der Xiaomi Cloud API und bietet Status-, Steuerungs- und Szenenausführungsfunktionen für alle in Ihrem Mi Home-Konto registrierten Geräte.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 5.0 verwendet.

## Anforderungen
- Node.js >= 22
- js-controller >= 6.0.11
- Admin >= 7.6.20

## Konfiguration
In den Adaptereinstellungen können Sie Folgendes konfigurieren:

| Schauplatz | Beschreibung |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Region** | Wählen Sie die Xiaomi Cloud-Region, die zu Ihrer Mi Home App passt (Deutschland, China, Russland, Taiwan, Singapur, USA) |
| **Aktualisierungsintervall** | Abfrageintervall in Minuten für Gerätestatusaktualisierungen über die Xiaomi Cloud API (mindestens 1 Minute in der Admin-Benutzeroberfläche) |
| **Zusätzliche Anmeldeversuche zur Laufzeit blockieren** | Wenn diese Option aktiviert ist, werden nach dem ersten Startversuch keine weiteren automatischen Anmeldeversuche zur Laufzeit gestartet. |

## Anmelden
Der Adapter verwendet eine **URL-basierte Anmeldung** (Benutzername/Passwort sind in den Adaptereinstellungen nicht erforderlich).

1. Konfigurieren Sie in den Adaptereinstellungen **Region**, **Aktualisierungsintervall** und (optional) **zusätzliche Anmeldeversuche zur Laufzeit blockieren** und speichern Sie die Einstellungen.
2. Schalten Sie den Adapter ein.
3. Falls keine gültige persistente Sitzung verfügbar ist, erstellt der Adapter eine **Anmelde-URL** und stellt diese an zwei Stellen bereit:
- als Warnung im Adapterprotokoll
- als Status `mihome-cloud.0.auth.loginUrl`
4. Öffnen Sie die URL in Ihrem Browser und melden Sie sich mit Ihrem Xiaomi-Konto an.
5. Der Adapter erkennt die erfolgreiche Anmeldung automatisch und stellt die Verbindung her.

Wenn die Sitzung serverseitig abläuft, löscht der Adapter die ungültige Sitzung und wechselt in den Zustand der erneuten Authentifizierung (`mihome-cloud.0.auth.status = reauth_required`).

- **Startverhalten**: Falls beim Start des Adapters keine gültige Sitzung vorhanden ist, wird ein Anmeldeversuch (Generierung der Anmelde-URL) ausgelöst.
- **Laufzeitverhalten**: Automatische Wiederanmeldeversuche werden nach Authentifizierungsfehlern/Sitzungsablauf geplant.
- **Optionale Laufzeitsperre**: Wenn **Zusätzliche Anmeldeversuche zur Laufzeit blockieren** aktiviert ist, werden während der Laufzeit keine weiteren automatischen Anmeldeversuche gestartet.

Die Sitzung wird in `auth.session` gespeichert und kann nach einem Neustart des Adapters wiederverwendet werden, sofern sie noch gültig ist.

## Objektbaum
Nach dem Start und der Anmeldung erstellt der Adapter die folgende Objektstruktur:

### `mihome-cloud.0.info.connection`
Verbindungsanzeige (`true`/`false`) für die Xiaomi Cloud-Sitzung.

### `mihome-cloud.0.auth.*`
Laufzeit- und Sitzungsstatus der Authentifizierung:

- `auth.status` - aktueller Authentifizierungsstatus (z. B. `connected`, `qr_login_pending`, `reauth_required`, `cooldown_wait`)
- `auth.loginUrl` - die aktuelle Xiaomi-Anmelde-URL, die für die Browseranmeldung verwendet wird.
- `auth.session` - gespeichertes Cookie/Session-JSON zur Wiederherstellung der Sitzung

Der Adapter erzeugt pro Gerät Folgendes:

Wenn sich das Xiaomi-Konto oder die konfigurierte Region ändert, werden alte Geräteobjekte entfernt und für das aktuelle Konto/die aktuelle Region neu erstellt.

### `mihome-cloud.0.<device-id>.general`
Allgemeine Geräteinformationen (Modell, Name, Firmware-Version usw.).

### `mihome-cloud.0.<device-id>.status`
Schreibgeschützte Zustände aus den MIoT-Spezifikationseigenschaften (Abfrage im konfigurierten Aktualisierungsintervall).

Je nach Modell-/Spezifikationsanalyse können Ereignisindikatorzustände vorhanden sein, die Cloud-Ereignisabonnementfunktion ist in diesem Adapter jedoch derzeit nicht aktiv.

### `mihome-cloud.0.<device-id>.remote`
Beschreibbare MIoT-Spezifikationseigenschaften und -Aktionen.

- Schreibbare Eigenschaften werden über MIoT `prop/set` gesendet.
- Aktionen werden über MIoT `action` gesendet.
- Aktionen mit Eingabeargumenten erwarten JSON-Eingaben im Statuswert

Nach der Befehlsausführung führt der Adapter eine automatische Statusaktualisierung für MIoT-Spezifikations- und benutzerdefinierte Zustände durch (Vakuum-Statusaktualisierungen werden über den normalen Abfragezyklus fortgesetzt).

### `mihome-cloud.0.<device-id>.custom`
Modellspezifische Zustände aus internen `configDes` Abbildungen (zum Beispiel Vakuummetriken wie `clean_area`, `clean_time`, `battery`).

### `mihome-cloud.0.<device-id>.remotePlugins`
Zusätzliche beschreibbare Befehle, die aus Xiaomi-Plugin-Bundles extrahiert wurden (nach bestem Wissen und Gewissen, abhängig vom Plugin/Modell).

### `mihome-cloud.0.scenes`
Intelligente Szenen/Automatisierungen aus Ihrem Mi Home-Konto. Stellen Sie den Szenenstatus auf `true` ein, um die Szene auszuführen.

## Beispiel: Roboterstaubsauger-Raumreinigung
1. Zimmer-IDs finden:

`mihome-cloud.0.<id>.remote.get-map-room-list` – benötigt `[cur-map-id]` als Eingabe.

Die aktuelle Karten-ID erhalten Sie über `mihome-cloud.0.<id>.status.cur-map-id`, oder Sie können die Kartenliste wie folgt abfragen:

`mihome-cloud.0.<id>.remote.get-map-list` (keine Eingabe erforderlich) → Ergebnis erscheint unter `mihome-cloud.0.<id>.status.map-list`

2. Karten-ID festlegen und Räume abfragen:

`mihome-cloud.0.<id>.remote.get-map-room-list` mit Eingang `[<map-id>]`

→ Ergebnis: `mihome-cloud.0.<id>.status.room-id-name-list`: `[{"name":"room1","id":10}]`

3. Beginnen Sie mit der Zimmerreinigung:

`mihome-cloud.0.<id>.remote.start-room-sweep` mit Format `["10", "11", "12", "13"]`

   oder

`mihome-cloud.0.<id>.remote.set-room-clean` mit Format `["10",0,1]`

## Fehlerbehebung
- **Warnungen "DB geschlossen"**: Harmlos – diese werden jetzt proaktiv beim Herunterfahren des Adapters durch ein sauberes Beendigungsflag verhindert.
- **„ECONNRESET“-Fehler**: Vorübergehende Netzwerkunterbrechungen zur Xiaomi Cloud. Der Adapter versucht es beim nächsten Abfrageintervall automatisch erneut.
- **"-106 Gerätenetzwerk nicht erreichbar"**: Das Gerät (z. B. ein Staubsauger) ist offline, nicht mit dem WLAN verbunden oder ausgeschaltet. Der Adapter protokolliert dies als Debug-Meldung und versucht weiterhin, eine Verbindung herzustellen.
- **401/400 Authentifizierungsfehler**: Der Adapter löscht die ungültige Sitzung und wechselt in den Modus für die erneute Authentifizierung. Eine neue Anmelde-URL wird über eine Protokollwarnung und `auth.loginUrl` bereitgestellt, falls automatische Anmeldeversuche aktiviert sind.
- **Keine neue Anmelde-URL nach Ablauf der Sitzung**: Aktivieren Sie **Zusätzliche Anmeldeversuche zur Laufzeit blockieren**. Ist diese Option aktiviert, werden automatische Wiederholungsversuche zur Laufzeit standardmäßig unterdrückt.
- **Gerätebaum wird nach Konto-/Regionswechsel neu erstellt**: Erwartetes Verhalten. Der Adapter entfernt alte Geräteobjekte und erstellt sie für das aktive Konto/die aktive Region neu.
- **Keine Geräteeigenschaften**: Einige reine ZigBee/Bluetooth-Sensorgeräte (z. B. `lumi.sensor_switch.v2`) stellen ihren Status nicht über die Cloud-API bereit. Verwenden Sie stattdessen einen lokalen ZigBee-Adapter.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.6 (2026-04-29)
- (lubepi) **NEW**: Added admin option to block additional automatic runtime login attempts to reduce log spam
- (lubepi) **ENHANCED**: Exposed Xiaomi login URL in `auth.loginUrl` for automation and easier re-authentication handling
- (lubepi) **ENHANCED**: Updated README
- (lubepi) **FIXED**: Suppress "DB closed" warnings during adapter shutdown and restart by implementing a clean shutdown flag
- (lubepi) **ENHANCED**: Optimized error handling to prevent uncontrolled adapter crashes from expired sessions and missing null guards

### 1.0.5 (2026-04-01)
- (lubepi) improve 401 authentication error handling and session reset
- (lubepi) validate and limit user configurable update interval
- (lubepi) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- (lubepi) Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- (lubepi) Improved error handling for network interruptions
- (lubepi) Migration to external i18n files and Node.js 20+ requirement
- (lubepi) Updated dependencies and fixed known vulnerabilities
- (lubepi) Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
- (lubepi) Migration to ESLint flat config and release-script support

### 0.2.2

- (lubepi) Minor improvements with device handling

### 0.2.1

- (lubepi) Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

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