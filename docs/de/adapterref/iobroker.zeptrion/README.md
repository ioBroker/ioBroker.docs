---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zeptrion/README.md
title: ioBroker.zeptrin
hash: ztWGkf72+py74kSJkY91gZHTRmvxRisq5o8YkM5ki4A=
---
# IoBroker.zeptrion
![Logo](../../../en/adapterref/iobroker.zeptrion/admin/zeptrion.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zeptrion.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![Kauf mir einen Kaffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

[![Tests](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)](https://github.com/bueste/ioBroker.zeptrion/actions)

Adapter für [Feller](https://www.feller.ch/) **[zeptrion / zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN-Aktoren (WLAN Nebenstelle 4K = zApp Gateway, WLAN Zwischenmodul 2K = zApp Booster) zur Licht- und Rollladen-/Jalousiesteuerung, basierend auf der zrap Webservice API (Feller Dokument 10.ZEPAPI-E.1612 / Version 1.0, Firmware vom 01.08.18).

_(Eine deutsche Version dieser README ist verfügbar unter [README_de.md](README_de.md).)_

## Funktionsübersicht
- **Kanalsteuerung** (`zrap/chctrl`): ein/aus/stopp/umschalten, öffnen/schließen, move_open/move_close,

dim_up/dim_down einschließlich zeitgesteuerter Varianten (`_t` in ms) sowie Szenen recall_s1-4 / store_s1-4 / delete_s1-4 - sowohl als einzelne Schaltflächen ALS AUCH als Freitextfeld `command`.

- **Kanalstatus** (`zrap/chscan` als periodische Resynchronisierung + `zrap/chnotify` als Long-Polling)

(Push für nahezu Echtzeit-Updates) und **Kanalbeschreibung** (`zrap/chdes`, Lese-/Schreibzugriff: Name, Gruppe, Symbol, Typ, Kategorie).

- **Geräteinformationen** (`zrap/id`): Hardware-/Software-/Bootloader-Version, Seriennummer,

Systemname, Gerätetyp.

- **Signalstärke** (`zrap/rssi`, abgefragt).
- **Netzwerkstatus** (`zrap/net`, schreibgeschützt): SSID, IP, MAC, Modus, Verschlüsselung,

Maske, Gateway.

- **Systembefehle** (`zrap/sys`): Neustart, Zurücksetzen auf Werkseinstellungen, Zurücksetzen auf Access-Point-Modus.
- **Standort** (`zrap/loc`), **NTP-Konfiguration** (`zrap/ntp`) und **Datum/Uhrzeit**

(`zrap/date`) einschließlich der Ein-Klick-Synchronisierung der Geräteuhr mit dem ioBroker-Host.

- **mDNS-Erkennung** (Kapitel 4 der API-Dokumentation): durchsucht das lokale Netzwerk nach

zeptrion devices und fügt Einträge in der Konfigurationstabelle im deaktivierten Zustand hinzu (Erkennung kombiniert mit manueller Überprüfung/Aktivierung).

- **Massenbefehle für Hagelwarnungen**: `control.closeAllShutters` / `openAllShutters` /

`stopAllShutters` Alle konfigurierten Kanäle auf allen aktiven Geräten gleichzeitig steuern

- dank Multicast-Bündelung (siehe unten), als eine einzige Anfrage pro Gerät, nicht pro Kanal.
- **Multicast-Befehlsbündelung**: Kanalbefehle für dasselbe Gerät, die innerhalb von

50 ms voneinander werden automatisch zu einem einzigen `zrap/chctrl` Multicast POST (Kapitel 3.6.5 der API-Dokumentation) zusammengefasst, anstatt zu mehreren aufeinanderfolgenden Einzelanfragen.

- **Schätzung der Verschlussposition** (optional, `posEstimate`): Da die Hardware, gemäß der

Die Dokumentation meldet praktisch immer `-1` (unbekannt) für Verschlusskanäle; pro Gerät kann eine Motorlaufzeit konfiguriert werden; der Adapter schätzt die Position anhand der Bewegungsrichtung und der verstrichenen Zeit (bestmögliche Schätzung, keine Hardware-Rückmeldung, manuell kalibrierbar).

- **Smartfront-Unterstützung** (optional, `zapi/smartfront/*`): Temperatur/Helligkeit auslesen/

Luftfeuchtigkeit, LED-Hintergrundfarbe einstellen (nur für Geräte mit angeschlossenem Feller Smartfront-Schalter, Kontrollkästchen in der Konfiguration).

- Robuste Fehlerbehandlung: Unterscheidet zwischen ECONNREFUSED-, Timeout- und DNS-Fehlern und löst bei Bedarf eine Wartezeit aus.

Wiederholte Fehler, gerätespezifischer und globaler Verbindungsstatus. Die mDNS-Erkennung ist zusätzlich gegen Ausnahmen durch fehlerhafte/nicht zugehörige Netzwerkpakete abgesichert.

Nicht implementiert (siehe „Bekannte Einschränkungen“): Schreibzugriff auf `zrap/net` (Ändern der WLAN-Zugangsdaten), `zrap/scheduler`, Smartbutton-Webhook-Programmierung (`zapi/smartbt/*`).

## Installation
Admin-Oberfläche -> Adapter -> Suche nach "zeptrion" -> Installieren.

## Konfiguration
- **HTTP-Timeout**: Timeout pro Anfrage an ein Gerät (Standardwert 4000 ms).
- **Erkennungsschaltfläche**: durchsucht das lokale Netzwerk über mDNS (Diensttyp `_zapp._tcp`,

Für Firmware-Versionen vor 01.08.xx wird auf das Hostnamensmuster `zapp-YYWWNNNN` zurückgegriffen (Fallback `_http._tcp`). Neu gefundene Geräte werden der Tabelle im **deaktivierten** Zustand hinzugefügt.

- Überprüfen Sie anschließend die Zeile, weisen Sie ihr eine ID/einen Namen zu und überprüfen Sie die Kanalanzahl.

(3340-4-x = 4 Kanäle, 3340-2-x = 2 Kanäle) und aktivieren Sie es. mDNS funktioniert nur innerhalb desselben Netzwerksegments/VLANs.

- **Gerätetabelle** (kann auch vollständig manuell ausgefüllt werden, ohne automatische Erkennung):
- `Aktiv`, `ID` (a-z 0-9 _ -), `Name`, `IP-Adresse/Hostname`,

`Channels` (1-4), `Kind` (Verschluss/Licht/unbekannt – steuert die ioBroker-Objektrollen, siehe unten), `Shutter motor travel time` (Sekunden, 0 = deaktiviert – aktiviert `posEstimate`, siehe unten, dient als Standard für alle Kanäle), `Travel time/channel` (optional, durch Komma getrennt, z. B. `22,28` – überschreibt die Standard-Verfahrzeit individuell pro Kanal; nützlich für 2K-Geräte, bei denen die beiden Kanäle unterschiedliche Motorfahrzeiten haben; leere Einträge verwenden die Standard-Verfahrzeit), `Smartfront` (Kontrollkästchen, nur aktivieren, wenn ein Feller Smartfront-Schalter angeschlossen ist), `Poll (s)` (Standard 30, für RSSI + periodisch) chscan resync; die eigentlichen Kanalaktualisierungen erfolgen unabhängig über chnotify long-poll).

## Objektbaum pro Gerät (`zeptrion.0.<id>`)
```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (buttons; factoryDefault requires unlock within 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + button)

<id>.channels.chN.val                                    channel state 0-100 / -1 (raw hardware value)
<id>.channels.chN.posEstimate                             only for kind=Shutter: software position estimate
                                                           0=closed/100=open, also manually writable (calibration)
<id>.channels.chN.name / group / icon / type / cat        channel description (read/write)
<id>.channels.chN.command                                 free-text command (string)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (buttons)

<id>.smartfront.temp / lux / hum       only if "Smartfront" is enabled (read)
<id>.smartfront.ledState               current LED status as JSON (read)
<id>.smartfront.ledSet                 set LED(s), JSON array (write)
```

Weltweit:

```
info.connection                at least one device reachable
control.closeAllShutters       button: ALL configured channels -> "close"
control.openAllShutters        button: ALL configured channels -> "open"
control.stopAllShutters        button: ALL configured channels -> "stop"
```

## Objektrollen und „Art“
Die zrap-API selbst unterscheidet nicht zwischen Licht- und Verschlusskanälen – dies ist ausschließlich eine Frage der Verkabelung/des Aktuators. Damit Visualisierungen (VIS, möglicherweise eine zukünftige ioBroker.iot/Alexa-Integration) Kanäle weiterhin sinnvoll klassifizieren können, kann die „Art“ pro Gerät festgelegt werden:

| Art | `<ch>.val` Rolle | `stop`/`open`/`close` Rolle |
| Rollladen/Jalousie | `level.blind` | `button.stop` / `button.open.blind` / `button.close.blind` |
| Licht | `level.dimmer` | generisch `button` |
| unbekannt (Standard) | `value` | generisch `button` |
| unbekannt (Standard) | `Wert` | generischer `Button` |

Wichtig: `level.blind` simuliert **keine** echte Positionsrückmeldung. Laut Feller-Dokumentation liefert `chscan`/`chnotify` für einen Verschlusskanal fast immer `-1` (unbekannt), da die Hardware selbst keine Blindposition meldet. Die Rolle verbessert lediglich die Erkennung durch VIS-Widgets; der numerische Wert bleibt im Allgemeinen nicht aussagekräftig.

## Nutzung der Hagelwarnung
```javascript
// JavaScript adapter example
on({id: 'weather.0.warnings.hail', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

Ausfälle einzelner Geräte (Offline-Status usw.) unterbrechen nicht die übrigen Kanäle – jeder ausgefallene Kanal wird einzeln protokolliert und in `<id>.info.lastError` aufgezeichnet.

## Bekannte Einschränkungen / bewusste Entscheidungen
- **Smartbutton-Webhook-Programmierung** (`zapi/smartbt/prgm`/`prgn`/`prgs`) ist nicht

Implementiert: Der Schalter würde beim Drücken einer Taste direkt eine URL auf ioBroker aufrufen (echtes Push-Verfahren, kein Polling). Dies würde einen eingehenden HTTP-Server im Adapter erfordern, der aktuell nicht existiert – eine größere Architekturerweiterung, keine kleine Ergänzung. Als mögliche zukünftige Verbesserung dokumentiert.

- **Schreibzugriff auf `zrap/net`** ist nicht implementiert - Änderung des WLAN eines Aktors

Die Eingabe von Zugangsdaten per Skript ist riskant (Verbindungsverlust, Neustart erforderlich). Kann bei Bedarf hinzugefügt werden.

- **Scheduler (`zrap/scheduler`)** und die **zeptrionAir Smartfront-Dienste**

Die Abschnitte (`zapi/smartfront/*`, `zapi/smartbt/*`) sind nicht implementiert, da sie für den Anwendungsfall Rollladen/Hagel nicht relevant sind. Die bestehende Struktur `zrapGet`/`zrapPost` in `main.js` lässt sich problemlos erweitern.

Laut Dokumentation gibt `chctrl` einen HTTP-302-Status ohne Body zurück – Weiterleitungen erfolgen durch

absichtlich nicht befolgt (`maxRedirects: 0`), um unnötige Zusatzanfragen zu vermeiden.

Bei wiederholten Geräteausfällen wird das Abfrageintervall auf maximal

5x (einfaches Zurückweichen).

## Entwicklung / Tests
```bash
npm install
npm run lint
npm test              # package consistency + unit tests
npm run test:integration   # starts a real js-controller (takes longer)
```

## Changelog

### 1.0.13 (2026-08-11)

- Fix E5606 (untranslated i18n entries): testDeviceOk was never actually translated for de/es/it/nl/pl/pt (silently kept the English copy). Also fixed the identical issue in fr, missed by the checker's exact-match heuristic due to a spacing difference. Verified with a full sweep of all 11 i18n files against the English source - no other matches found.

### 1.0.12 (2026-08-10)

- Fix a real i18n gap found during independent end-to-end testing of v1.0.11: embedded field-validation messages in the CSV import report stayed English even in the localized report. validateDeviceRow() now returns structured {key, args} entries with two explicit renderers: always-English for logs, I18n.translate() for the UI. Added 13 new i18n keys across all 11 languages. Also added the missing README_de.md to package.json's "files" allowlist - npm auto-includes README.md in every package but NOT README_de.md, so it was silently absent from the published tarball. Verified end-to-end: loaded the real I18n module directly, confirmed log output stays English regardless of active UI language across EN/DE/FR/ZH, and downloaded + extracted the real published npm tarball to confirm packaging.

### 1.0.11 (2026-08-10)

- Fix: v1.0.10 translated all onMessage() UI text to plain English only. Implemented full multi-language support instead, using the official @iobroker/adapter-core I18n module (reads system.config.common.language automatically, falls back to English for unsupported languages). Added a new i18n/ directory with all 11 required languages. ioBroker log entries remain English-only; only the admin-dialog result text is now localized. Also fixed a packaging bug: the new i18n/ folder was missing from package.json's "files" allowlist, which would have excluded it from the published npm package - caught via an actual npm pack + tarball-extraction test before pushing. Verified round-trip in German, English, and French.

### 1.0.10 (2026-08-10)

- Fix all remaining findings from the follow-up review: translated 18 German error messages in validateDeviceRow(), the 5 error-code-to-message translations in handleDeviceError(), 9 German strings in thrown Error objects, and the bonjour-service install-hint rejection message. Per explicit maintainer direction, all UI-facing result text in onMessage (CSV import report, device test results, discovery summary) is now English as well, superseding the earlier decision to keep it German for the target audience. No migration needed - none of these fixes touch persisted object common properties.

### 1.0.9 (2026-08-08)
- Fix: the common.name i18n conversion from 1.0.8 only applied to newly created objects (setObjectNotExistsAsync/ensureState never update existing ones) - any installation upgrading from <=1.0.7 kept the old plain-German name strings forever. migrateObjectRoles() now also force-corrects these on every startup via a value-based lookup table generated from the same translations already used in the object-creation code, plus dedicated regex rules for the two dynamic cases (scene button names, tilt pulse duration). Also fixes two translation gaps that were missed in 1.0.8 (network info fields and the shutter position estimate/move descriptions) which the extraction script used to build the migration table happened to catch. Verified against a live object dump (409 objects, 4 devices): corrects exactly the 385 affected objects, 0 false positives on user-configured device/room names.

### 1.0.8 (2026-08-08)
- Fix all findings from the manual maintainer review (PR #6327): removed the manual npm installation section from README.md/README_de.md (E6012, prohibited regardless of stated intent); added a verified link to the Feller product page; translated all 40+ German log messages to English (UI-facing result text for CSV import/discovery, shown in the admin config dialog, is intentionally kept German and decoupled from the log call); converted all 50 German common.name strings (incl. the CH_BUTTONS constant and dynamic channel/scene names) to full 11-language i18n objects; completed io-package.json instanceObjects translations for 'info' and 'control' (info.connection already had all 11 languages).

### 1.0.7 (2026-07-22)
- Enable global i18n support (jsonConfig i18n: true) with translation files under admin/i18n/ for all 11 supported languages, resolving the checker's i18n warnings the correct way (validatorErrorText stays a plain string per schema; ioBroker resolves the translation via the files, falling back to the English text if no entry is found). Added @iobroker/adapter-dev and @alcalzone/release-script as devDependencies with translate/release npm scripts. (Migrating to @iobroker/eslint-config was evaluated but reverted: its eslint-plugin-import dependency does not yet support eslint 10.x, which broke npm install.)

### 1.0.6 and older

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Stefan Bühler

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