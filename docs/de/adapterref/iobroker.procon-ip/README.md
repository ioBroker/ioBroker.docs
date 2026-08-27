---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: 4iqN3AF7oKF/D1R7sZG4oIHpqApYO7HiS2XzbVmJ5oQ=
---
![Logo](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

![Anzahl der Installationen](http://iobroker.live/badges/procon-ip-installed.svg)
![Aktuelle stabile Version](http://iobroker.live/badges/procon-ip-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

# IoBroker.procon-ip
[![Test und Release](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

ioBroker-Adapter für den Pool Digital ProCon.IP-Schwimmbadcontroller.
Er dient zur Integration in Ihre ioBroker-Hausautomation, z. B.
um Logik zu erstellen, die andere Geräte einbezieht oder um mit Ihrem/Ihren bevorzugten Sprachassistenten gekoppelt zu werden:

Sie können die [_cloud_](https://github.com/ioBroker/ioBroker.cloud) oder

[_IoT_](https://github.com/ioBroker/ioBroker.iot) Adapter für Alexa (und ich glaube auch für Google Home) und

- [_yahka_](https://github.com/jensweigele/ioBroker.yahka)-Adapter als Brücke zu

Apple HomeKit, das von Siri erreicht werden kann oder

- Verwenden Sie [_javascript_](https://github.com/ioBroker/ioBroker.javascript)

Adapter zum Erstellen eigener benutzerdefinierter Logik.

Weitere Informationen finden Sie in [Wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

## Was ist der ProCon.IP-Pool-Controller?
Die ProCon.IP Poolsteuerung ist eine kostengünstige, netzwerkfähige Steuereinheit für private Schwimmbäder. Mit ihren softwaregesteuerten Relais kann sie mehrere Pumpen (für die Poolfilterung und verschiedene Dosierungen) steuern, entweder nach einem Zeitplan oder abhängig von Messwerten eines ihrer zahlreichen Eingangskanäle (z. B. Durchflusssensoren, Dallas 1-Wire-Thermometer, Redox- und pH-Elektroden). Die Relais lassen sich auch bedarfsgesteuert schalten, wodurch sie sich beispielsweise zum Ein- und Ausschalten von Beleuchtung eignen. Nicht alle Funktionen sind über die API zugänglich. Es gibt zwar eine dokumentierte API zum Auslesen (Abfragen) von Werten im CSV-Format (`/GetState.csv`). Ich erinnere mich an eine weitere API zum Ein- und Ausschalten der Relais sowie zum zeitgesteuerten Einschalten. Diese kann ich jedoch nicht mehr finden. Kurz gesagt: Die ProCon.IP verfügt über zwei native Web-Oberflächen, die analysiert werden können, um bestimmte Funktionen (wie das Schalten der Relais) zu rekonstruieren.

Weitere Informationen finden Sie unter folgendem Link (leider nur auf Deutsch; ich habe bisher keine englische Dokumentation/Informationen gefunden):

- [pooldigital.de Webshop](https://pooldigital.de/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
- [pooldigital.de-Forum](https://www.poolsteuerung.de/)

**Nur um es klarzustellen: Ich habe nichts mit der Entwicklung, dem Vertrieb, dem Marketing oder dem Support der Poolsteuerungseinheit zu tun. Ich habe lediglich eine Lösung entwickelt, um diese in ioBroker zu integrieren und so das Haus meiner Eltern etwas smarter zu machen.**

## Details zum Adapter
Der Adapter nutzt die `/GetState.csv`-API des ProCon.IP, um seine Werte abzufragen, sowie eine weitere – nicht dokumentierte – API, die mit Bitbefehlen die Relais schaltet. Diese zweite API wird auch von den ursprünglichen Web-Oberflächen des ProCon.IP verwendet. Daher kann es zu zukünftigen Firmware-Updates kommen, die die Kompatibilität mit diesem Adapter oder zumindest dessen Relais-Schaltfunktion beeinträchtigen.

### Kompatibilität
Der Adapter wurde bisher in Kombination mit der ProCon.IP-Firmware **Revision 1.7.6.a** getestet und entwickelt. Er sollte aber auch mit allen älteren und zukünftigen Firmware-Versionen funktionieren.

## Entwicklung und Teilhabe
Sie können mich gerne kontaktieren, wenn Sie an der Entwicklung, Übersetzung oder Dokumentation dieses Adapters mitwirken möchten.

Nützliche Links für den Ansatz werden sein

- die [TypeScript-Adaptervorlage](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

Ich hatte angefangen bei und

- der [Leitfaden für Adapterentwickler](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

### Lokales Testen mit dem Entwicklungsserver
Für praktische Tests mit einem echten ProCon.IP-Controller verwenden Sie [`@iobroker/dev-server`](https://github.com/ioBroker/dev-server). Dadurch wird eine temporäre lokale ioBroker-Instanz (js-Controller + Admin-UI) gestartet und dieser Adapter aus Ihrem lokalen Build ausgeführt:

```bash
npm i -g @iobroker/dev-server   # once, globally
npm run dev:setup               # creates the local .dev-server/ profile (git-ignored)
npm run dev                     # builds, runs, admin UI at http://localhost:8081
```

Konfigurieren Sie die Instanz mit Ihrer Controller-URL in der Admin-Oberfläche. `npm run dev` erstellt und lädt den Adapter bei Quellcodeänderungen neu.

## Spende
Wenn Sie diesen Adapter unterstützen oder sich bedanken möchten, können Sie Folgendes tun:

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Kauf mir einen Kaffee" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.9.0 (2026-08-23)

- **DMX512 lighting support (opt-in).** Enable "DMX512 channels" in the adapter settings to expose the controller's 16 DMX channels as writable 0–255 dimmer states (`dmx.CH01` … `dmx.CH16`).
- **Self-healing object definitions.** Objects are now updated on upgrade (via `extendObject`, versioned), so improved roles/types reach existing installations — while your custom object names are preserved.
- **Fewer redundant events.** State values are written only when they actually change, and relay/dosage/timer commands are acknowledged immediately once the controller confirms them.
- Subscriptions are narrowed to the writable command states, and the boolean status flags now use the `indicator` role.
- Large internal refactor for testability: the monolithic adapter was split into a thin shell plus focused, unit-tested modules with a CI coverage gate. No functional change from this part.

### 1.8.1 (2026-08-22)

- **Fixed relay and DMX switching**, which had silently stopped working since 1.8.0's move to the ProCon.IP 2.x library: the controller accepted a write with `200 OK` but ignored it. Updated the library to 2.1.1, which sends the exact HTTP request format the controller's firmware requires. Reads were never affected.
- Resilient startup: the adapter now comes up and keeps polling until the controller becomes reachable, instead of staying inactive when the controller was offline at boot time.
- Fixed a corner case in the forced-update handling that could keep a relay flagged for updates.
- Aligned the admin configuration defaults with the adapter's effective runtime defaults and fixed a help-text typo.
- Maintenance: fixed the unit-test runner so tests actually execute, trimmed the CI test matrix, bumped CI actions (checkout/codeql), and pinned `@types/node` to the supported Node baseline.

### 1.8.0 (2026-08-22)

- Raised the minimum Node.js version to 22 (Node 20 is end-of-life).
- Updated the ProCon.IP library to 2.x, replacing its axios HTTP client with a leaner implementation and typed error handling.
- Updated all dependencies and shrank the security-advisory backlog.
- Internal cleanup: migrated off the deprecated `setStateAsync` API to `setState`.
- Maintenance: adopted npm Trusted Publishing (OIDC), modernized the CI workflow, grouped Dependabot updates, and applied the latest ioBroker repository-checker fixes.

### 1.7.0 (2025-09-20)

- Satisfy latest requirements demanded by the ioBroker-Bot.
- Raise minimum required js-controller version to 7.0.7.
- Raise minimum required admin version to 7.6.17.
- Remove calls to deprecated methods.
- Minor code cleanup.
- Dependency updates.

### 1.6.0 (2024-09-08)

- Fix versioning according to prior changes in requirements (should have happened with v1.5.5).
    - Raise minimum required js-controller version to 5.0.19.
    - Raise minimum required node version to 20.
- Dependency updates.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2019-2026 Yannic Labonte <yannic.labonte@gmail.com>