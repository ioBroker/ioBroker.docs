---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roborock/README.md
title: ioBroker.roborock
hash: 9hqz/v5MCibz9LgvvbHfm2zM5NgZ7eOibBdC9MTozj8=
---
![Logo](../../../en/adapterref/iobroker.roborock/admin/roborock.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.roborock.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.roborock.svg)
![Anzahl der Installationen](https://iobroker.live/badges/roborock-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/roborock-stable.svg)
![NPM](https://nodei.co/npm/iobroker.roborock.png?downloads=true)

# IoBroker.roborock
**Tests:** ![Test und Freigabe](https://github.com/copystring/ioBroker.roborock/workflows/Test%20and%20Release/badge.svg)

**Übersetzung:** [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/roborock/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Roborock-Adapter für ioBroker
Mit diesem Adapter können Sie einen in der Roborock-App eingerichteten Roborock-Staubsauger steuern, seinen Status abrufen, die Reinigungshistorie einsehen und seine Karte anzeigen.

- [Anforderungen](#requirements)
- [Unterstützte Roboter](#supported-robots)
- [Zonenreinigung](#zone-cleaning)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#Lizenz)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Anforderungen
- Node.js >= 22.0.0
- ioBroker.admin >= 7.6.17
- ioBroker.js-controller >= 6.0.11

## Unterstützte Roboter
- **S-Serie:** S4, S4 Max, S5 Max, S6, S6 Pure, S6 MaxV, S7, S7 MaxV (Pro/Ultra), S7 Pro Ultra, S7 Max Ultra, S8, S8+, S8 Pro Ultra, S8 MaxV Ultra
- **Q-Serie:** Q5 Pro, Q7, Q7 Max, Q7 L5, Q8 Max
- **Q Revo:** Q Revo, Q Revo Pro
- **Qrevo:** Qrevo Slim, Qrevo S, Qrevo Curve, Qrevo Curv Series, Qrevo Edge, Qrevo Edge Series, Qrevo L, Qrevo Master, Qrevo MaxV
- **Saros:** Saros 10, Saros 10R, Saros 20 / Saros 20X, Saros Z70

## Zonenreinigung
Diese Funktion ist nur verfügbar, wenn die Kartenerstellung in den Adapteroptionen aktiviert ist. Öffnen Sie die Karte über die Registerkarte „Web-UI“ des Adapters in der ioBroker-Administrationsoberfläche; eine manuelle URL ist nicht erforderlich.

### Die Kartenerstellung funktioniert nicht auf dem Raspberry Pi
Zeichnen Sie das Quadrat, das Sie reinigen möchten. Roborock unterstützt bis zu 4 Reinigungszonen gleichzeitig.

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.4 (2026-06-07)

* (copystring) Documented tested Roborock S8+ support.
* (copystring) Fixed consumable percentage values for devices where Roborock reports maintenance data via HomeData.
* (copystring) Re-enabled macOS support and added macOS test coverage.
* (copystring) Improved dependency update automation so updates are checked weekly and merged only after successful checks.
* (copystring) Updated `p-queue` to 9.3.0 and `protobufjs` to 8.5.0.
* (copystring) Improved CI performance for Linux, macOS and Windows adapter tests without reducing test coverage.

### 0.7.3 (2026-05-22)

* (copystring) Fixed V1 auto-empty dust collection to use the AppPlugin-verified `app_start_collect_dust` command.

### 0.7.2 (2026-05-20)

* (copystring) Fixed missing auto-empty command for Roborock Qrevo MaxV (#1272).
* (copystring) Fixed local endpoint refresh after temporary MQTT outages so stale local IP recovery retries immediately again.
* (copystring) Require bug reports to upload a `.txt` debug log file.

### 0.7.1 (2026-05-19)

* (copystring) Fixed local TCP recovery when a Roborock device gets a new LAN IP address.
* (copystring) Updated dependencies: `@napi-rs/canvas` to 1.0.0, `protobufjs` to 8.2.0 and `zod` to 4.4.3.
* (copystring) Resolved npm audit security advisories in transitive dependencies and documented the temporary dependency overrides.

### 0.7.0 (2026-05-04)

* (copystring) Added support for Roborock Q10, including map handling for this model.
* (copystring) Added support for Roborock Saros Z70.
* (copystring) Improved local connections for newer Roborock models so reconnects, keepalive checks and map transfers are more reliable.
* (copystring) Fixed empty images in `mapBase64` and `mapBase64Truncated`.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 copystring <copystring@gmail.com>

See [LICENSE](LICENSE) for the full license text.