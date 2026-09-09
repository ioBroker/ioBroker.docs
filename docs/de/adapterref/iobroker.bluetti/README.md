---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluetti/README.md
title: ioBroker.bluetti
hash: +wXYYauQ116L0dVJ2PWBVKd3DG3WljKGa40LMAflRmM=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bluetti.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bluetti.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bluetti-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bluetti-stable.svg)

<div align="center">

<img src="admin/bluetti.png" alt="BLUETTI" width="120" />

# ioBroker.bluetti

**schreibgeschützter ioBroker-Adapter für [BLUETTI](https://www.bluettipower.com) Kraftwerke – Batterie-, Solar-, Netz- und Lasttelemetrie aus der BLUETTI-Cloud.**

<!-- Badges removed until adapter is in ioBroker repository (#81) -->

![Test und Freigabe](https://github.com/Percy2Live/ioBroker.bluetti/workflows/Test%20and%20Release/badge.svg)

</div>

---

Integrieren Sie die Live-Daten Ihrer BLUETTI-Powerstation in ioBroker: Ladezustand, PV-/Netzeingang und AC/DC-Ausgangsleistung sowie Verbindungs- und Statusanzeigen für USV-ähnliche Automatisierungen. Die Authentifizierung erfolgt über denselben BLUETTI-Cloud-Login wie bei der offiziellen Home Assistant-Integration – keine App-Passwörter, kein Scraping.

> **Status:** Funktioniert einwandfrei und wurde vollständig mit einem Live-BLUETTI-Konto (Elite 30 V2) unter js-controller 7.0.7 verifiziert. Noch nicht in den ioBroker-Repositories veröffentlicht. Die Kerntelemetrie ist stabil; die detailliertere modellspezifische Telemetrie wird derzeit noch mit realen Daten validiert.

## ✨ Funktionen

- 🔋 **Batterie- und Leistungstelemetrie** — Ladezustand, PV-Eingangsleistung, Netzeingangsleistung, AC/DC-Ausgangsleistung
- 🔐 **Sichere Cloud-Anmeldung** — BLUETTI OAuth mit integrierten Anmeldeinformationen; das Token wird verschlüsselt gespeichert und automatisch aktualisiert
- 🔎 **Geräteerkennung** — Wählen Sie nach dem Anmelden Ihr Gerät aus einer Liste aus.
- 🩺 **Gesundheits- und Vernetzungszustände** — Erreichbarkeit, aufeinanderfolgende Ausfälle und ein konservatives Ausfallverdachtssignal für USV-Automatisierungen
- 👀 **Nur lesbar und sicher** — Der Adapter schreibt niemals auf Ihr Gerät (keine Modus-/AC/DC-/Firmware-Änderungen).

## 🔌 Unterstützte Geräte

| Modell              | Produktcodes       | Status        |
| ------------------- | ------------------ | ------------- |
| BLUETTI Elite 30 V2 | `EL30V2`, `PR30V2` | ✅ Verifiziert |

Andere BLUETTI-Modelle, die dieselbe Cloud-API bereitstellen, funktionieren wahrscheinlich, sind aber noch nicht validiert. Bereinigtere, reale Nutzdaten sind willkommen, um die Unterstützung zu erweitern.

## 📦 Anforderungen

- ioBroker mit **js-controller ≥ 6.0.11** Und **admin ≥ 7.6.20**
- Ein BLUETTI-Konto, dessen Gerät in der BLUETTI-App verknüpft ist.
- Das Gerät ist mit der BLUETTI-Cloud verbunden (online in der App).

## 🚀 Installation & Einrichtung

> Der Adapter ist noch nicht im ioBroker-Repository enthalten. Sobald er akzeptiert wurde, können Sie ihn direkt über die ioBroker-Admin-Benutzeroberfläche installieren (**Adapter** → Suche nach "bluetti").

1. Installieren Sie den Adapter und erstellen Sie eine `bluetti.0` Beispiel.
2. Öffnen Sie die Instanzkonfiguration in ioBroker Admin.
3. Klicken **Authentifizieren Sie sich mit BLUETTI** Schließen Sie die Anmeldung im sich öffnenden Browserfenster ab. Der Adapter verwendet seine integrierten BLUETTI-Client-Anmeldeinformationen, daher werden in der Admin-Benutzeroberfläche keine Felder für Client-ID/Client-Geheimnis angezeigt.
4. Wählen Sie Ihr Gerät aus der **Geräteauswahl**.
5. **Speichern.** Die Abstimmung startet automatisch; `info.connection` Wendungen `true` sobald die erste Abstimmung erfolgreich war.

Sie authentifizieren sich nur einmal – das Token wird verschlüsselt gespeichert. `auth.tokenJson` Status und Aktualisierung im Hintergrund.

> **Sicherheitshinweis:** Das OAuth-Token wird in einem verschlüsselten ioBroker-Status gespeichert (`auth.tokenJson`) mit `read: false, write: false`Die Verschlüsselung schützt vor versehentlichem Zugriff und dem Zugriff auf Backups/Dateisysteme. Jeder ioBroker-Administrator kann den Status weiterhin per Skript oder über die REST-API lesen und entschlüsseln, da der Verschlüsselungsschlüssel instanzweit gilt. Dies ist ein akzeptabler Kompromiss: ioBroker-Administratoren haben bereits vollen Systemzugriff, daher schwächt der verschlüsselte Status die allgemeine Sicherheitslage nicht.

Wenn Sie die integrierten Client-Anmeldeinformationen für die Verwendung im Experten-/Debug-Modus überschreiben müssen, bearbeiten Sie das native Objekt der Instanz direkt in ioBroker. Der Adapter greift weiterhin auf seine Standardeinstellungen zurück, wenn diese nativen Werte leer sind.

## 📊 Objekte & Zustände

Alle Staaten sind **Nur lesbar**.

### `info`

| Zustand           | Typ       | Beschreibung                                                                                               |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `info.connection` | `boolean` | Trifft zu, wenn die Authentifizierung erfolgreich war und das ausgewählte Gerät verwendbare Daten liefert. |

### `device`

| Zustand           | Typ       | Beschreibung                                                                          |
| ----------------- | --------- | ------------------------------------------------------------------------------------- |
| `device.serial`   | `string`  | Geräteseriennummer                                                                    |
| `device.model`    | `string`  | Gerätemodell                                                                          |
| `device.name`     | `string`  | Gerätename                                                                            |
| `device.online`   | `boolean` | Ob das Gerät in der BLUETTI-Cloud online ist                                          |
| `device.workMode` | `string`  | Aktueller Betriebsmodus, wie vom Gerät gemeldet (Roh-Enumeration, z. B. `workmode_3`) |

### `battery`

| Zustand                      | Typ          | Beschreibung                                                       |
| ---------------------------- | ------------ | ------------------------------------------------------------------ |
| `battery.soc`                | `number %`   | Batterieladezustand                                                |
| `battery.dischargeRemaining` | `number min` | Geschätzte Restlaufzeit bei aktueller Beladung                     |
| `battery.chargeRemaining`    | `number min` | Geschätzte Ladezeit in Minuten; 0 Minuten, wenn nicht geladen wird |

### `power`

| Zustand                | Typ        | Beschreibung                                         |
| ---------------------- | ---------- | ---------------------------------------------------- |
| `power.pvInput`        | `number W` | Photovoltaische (solare) Eingangsleistung            |
| `power.gridInput`      | `number W` | Netzeingangsleistung                                 |
| `power.acOutput`       | `number W` | Wechselstromausgangsleistung (Last)                  |
| `power.dcOutput`       | `number W` | Gleichstromausgangsleistung (Last)                   |
| `power.acOutputActive` | `boolean`  | Ob der Wechselstromausgang aktuell eingeschaltet ist |
| `power.dcOutputActive` | `boolean`  | Ob der Gleichstromausgang aktuell eingeschaltet ist  |
| `power.acEco`          | `boolean`  | Ob der AC ECO-Energiesparmodus aktiviert ist         |
| `power.dcEco`          | `boolean`  | Ob der DC ECO-Energiesparmodus aktiviert ist         |

### `health`

| Zustand                      | Typ       | Beschreibung                                           |
| ---------------------------- | --------- | ------------------------------------------------------ |
| `health.outageSuspected`     | `boolean` | Auslöser für konservativen Stromausfallverdacht        |
| `health.consecutiveFailures` | `number`  | Aufeinanderfolgende Fehlschläge bei Umfragen           |
| `health.authFailed`          | `boolean` | Ob der letzte Fehler ein Authentifizierungsproblem war |

### `status`

| Zustand             | Typ      | Beschreibung                                  |
| ------------------- | -------- | --------------------------------------------- |
| `status.lastUpdate` | `string` | Zeitstempel der letzten erfolgreichen Umfrage |
| `status.lastError`  | `string` | Letzte bereinigte Fehlermeldung               |

## ⚙️ Konfiguration

| Option                       | Standard  | Beschreibung                                                                                                             |
| ---------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Umfrageintervall             | `300 s`   | Wie oft die BLUETTI-Cloud nach aktuellen Telemetriedaten abgefragt wird                                                  |
| OAuth-Client-ID / -Geheimnis | eingebaut | Im Adminbereich nicht sichtbar; Expertenüberschreibungen bleiben über die direkte Bearbeitung nativer Objekte verfügbar. |

## ⚠️ Cloud-Abhängigkeit & USV-Hinweis

Dieser Adapter liest von der **BLUETTI-Wolke**Es hängt also davon ab, ob Ihre Internetverbindung besteht und die Server von BLUETTI erreichbar sind.

Ein reiner Cloud-Adapter **kann einen Stromausfall nicht allein beweisen**Es kann lediglich Indizien aufdecken – veraltete Telemetriedaten, Erreichbarkeit von Cloud/Gerät und wiederholte Abfragefehler. Für zuverlässige Automatisierungen bei Stromausfällen sollten diese Zustände mit mindestens einem weiteren kombiniert werden. **lokal** Signal, wie zum Beispiel ein Router-/Ping-Check, ein Smart Meter, ein Shelly-/Energiezähler oder ein dediziertes USV-Signal.

## 🛠️ Entwicklung

Der Adapter ist ein TypeScript-basierter, klassenbasierter ioBroker-Adapter mit einer JSON-Admin-Konfiguration, der mit folgendem Code erstellt wurde: `@iobroker/create-adapter`.

| Skript                     | Zweck                                                 |
| -------------------------- | ----------------------------------------------------- |
| `npm run build`            | TypeScript-Quellen kompilieren                        |
| `npm run check`            | Typüberprüfung ohne Ausgabe                           |
| `npm run lint`             | ESLint ausführen                                      |
| `npm test`                 | Führen Sie Unit- und Pakettests durch                 |
| `npm run test:integration` | Führen Sie den ioBroker-Startintegrationstest aus     |
| `npm run test:repo`        | Führen Sie den ioBroker-Repository-Checker lokal aus. |

Architektur- und Forschungsnotizen:

- [Hinweise zur BLUETTI Home Assistant-API](docs/research/bluetti-ha-api-notes.md) — Quellcodebasierte Upstream-OAuth-, Token-, Geräte- und Telemetrie-Ergebnisse.
- [Authentifizierungs-, Token- und Geräteauswahlablauf](docs/auth-flow.md) — die OAuth/Token/Gerätearchitektur, wobei der aktuelle Implementierungsstatus oben vermerkt ist.

> Bis der Adapter veröffentlicht und getaggt ist, `npm run test:repo` Berichtet über erwartete Ergebnisse vor der Veröffentlichung (Paket nicht auf npm, Release nicht getaggt, Adapter noch nicht im ioBroker-Repository).

## Changelog

<!-- markdownlint-disable-next-line MD024 -->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.0

- First stable release: full repochecker compliance, OIDC trusted publishing with provenance signing.
- All pre-release repochecker findings resolved (#103–#107, #123, #124).
- Object structure dump validated and attached to ioBroker repository submission (#108).
- Adapter submitted to ioBroker latest repository (#81).

### 0.0.2

- Trusted publishing setup: OIDC-based npm publish with provenance signing, registry-url and npm 11 in CI.
- Populate `device.model` and `device.name` from `getUserProducts` cache; resolve `workMode` labels via `supportModeValues`.
- Device selector always visible; empty list signals unauthenticated state.
- Degrade gracefully when persisted OAuth token is corrupt instead of crashing the adapter.
- Refresh device list after OAuth completes without reopening the config dialog.
- Redact device serial in info-level polling log line.
- Repo cleanup: remove non-adapter files, redundant `publishConfig`, and GitHub/npm install instructions from README.
- Remove `prepare` lifecycle script and set `common.nogit` to suppress repochecker warnings.
- Add local repochecker audit results and prepare `ioBroker.repositories` submission entry.

### 0.0.1

- Initial release: BLUETTI cloud OAuth login, device discovery/selection, and read-only telemetry polling for the Elite 30 V2.
- Added verified Elite 30 V2 telemetry from a real `deviceStates` payload: battery discharge/charge time remaining, AC/DC output and ECO status, and working mode.

Older entries are kept in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Percy2Live