---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ring/README.md
title: Ringadapter
hash: n3Ge+4riAnBNpF9sAyd8urV5uUKVbssKbfosGzTCKeU=
---
![Logo](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Anzahl der Installationen](http://iobroker.live/badges/ring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)
![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Ringadapter

Der Ring-Adapter ist mit Ring-Geräten wie der Ring Video Doorbell und der Ring Cam kompatibel und zeigt an, ob jemand klingelt oder eine Bewegung erkannt wird. Die Ring Video Doorbell bzw. Cam sendet einen Videostream, sobald eine Bewegung erkannt oder das Klingeln an der Tür ausgelöst wird.

## Installation & Konfiguration

Nach der Installation des Adapters müssen Sie Ihr Token eingeben. Ring erfordert nun die Zwei-Faktor-Authentifizierung (2FA) für alle Konten. Um das Token zu erhalten, führen Sie bitte die folgenden Schritte in Ihrer Shell aus.

```shell
npx -p ring-client-api ring-auth-cli
```

oder

```bash
## Unix 
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

Sie können spezielle Variablen für den Pfad und den Dateinamen Ihres Livestreams und Snapshots verwenden. Diese Variablen werden durch einen Zähler, einen Zeitstempel, eine Ring-ID oder eine Ringart ersetzt.

- `%d`Unix-Zeitstempel. Beispiel: `test_%d -> test_1588331430061`
- `%g`: Formatiertes Datum im Format JJJJMMTT. Beispiel: `test_%g -> test_20240614`
- `%t`: Formatierte Zeit HHiiss. Beispiel: `test_%t -> test_235901`
- `%i`: ID Ihres Ringgeräts: Beispiel: `test_%i -> test_234567890`
- `%n`Zähler seit Beginn der Ringinstanz. Beispiel: `test_%n -> test_1`
- `%k`Art Ihres Ringgeräts: Beispiel: `test_%k -> test_doorbell`

### Häufig gestellte Fragen

#### Ich erhalte keine Ereignisse, Schnappschüsse oder Videos bei Bewegung oder erkannten Personen.

Herzlichen Glückwunsch! Es ist sehr wahrscheinlich, dass Ihr aktuelles Token von Ring auf eine Blacklist gesetzt wurde, wodurch Ihnen die benötigten Push-Benachrichtigungen verweigert werden. Am besten entfernen Sie alle vorherigen Browser-/Adapter-Tokens auf der Ring-Website und generieren ein neues Token für den Adapter.

Damit dieser Adapter ordnungsgemäß auf Ereignisse reagieren kann, muss Ring die Push-Benachrichtigung an den verwendeten Empfänger senden. [Ring API-Client](https://github.com/dgreif/ring) Damit dieser Adapter darauf reagiert. Die Logik dieses Adapters wurde mehrfach geprüft und funktioniert für viele Benutzer. Sollten Sie also Probleme mit fehlenden Ereignissen feststellen, liegt dies wahrscheinlich nicht an diesem Adapter.

### Änderungen in Version 5

1. Einige Datenpunkte wurden umbenannt, um eine einheitlichere Benennung zu gewährleisten (z. B. `livestream_request` wurde reduziert auf `request` wie es bereits im Kanal ist `livestream`).
2. Sie können nun konfigurieren, ob Sie auf Ereignisse reagieren möchten (z. B. durch Aufzeichnung, Snapshot usw.) oder nicht.
3. Binäre Zustände wurden entfernt.

### V3 Überarbeitung – Inkompatible Änderungen

1. Die Gerätenamen wurden um ihre Beschreibung erweitert (z. B. von `Device 1234567`
   Zu `Device 1234567 ("Floodlight Garden")`)
2. Die Snapshot-/Livestream-Daten befinden sich nun in einem separaten Kanal, der auch die anderen Datenpunkte enthält.
3. Das Snapshot-/Livestream-Objekt wurde vom Typ Meta in den Status mit dem Typ Datei geändert.
4. Ereignisse (Bewegung, Klingeln usw.) befinden sich nun im jeweiligen Kanal.
5. Wegen `ring-api` die Unterstützung für Node vor `v16.x` Dieser Adapter benötigt `node v16.x` oder `node v18.x`
6. Die Aktualisierungsfrequenz wird auf einmal alle zwei Stunden reduziert, da wir auf Ereignisse reagieren.

### SIP (vor Version 3.x)

Sie können die SIP-Informationen für eine SIP-Videokonferenz mit Ihrem SIP-Client verwenden. Der Adapter stellt nicht alle Rufgeräte bereit, da die verwendete API nicht alle Rufgeräte umfasst.

Sie können beispielsweise den Blink SIP-Client verwenden auf <http://icanblink.com/>Um Video zu ermöglichen, gehen Sie in die Blink-Einstellungen und wechseln Sie unter „Accounts“ zum Tab „Medien“. Deaktivieren Sie dort unter „RTP-Optionen“ die Option „Audio und Video verschlüsseln“. Achtung: Die SIP-Informationen laufen nach wenigen Sekunden ab! Ich hoffe, ich kann bald einen Videostream anbieten. [ring.com](https://ring.com) verfügt über keine offizielle API, die diese Funktion unterstützt. Wenn Sie die Taste drücken `livestream request` Über diese Schaltfläche erhalten Sie neue SIP-Informationen zum Aufbau einer SIP-Videoanrufsitzung. Wenn Sie die [ring.com](https://ring.com) In der Cloud finden Sie unter Verlauf einen HTTP-Link zu Ihrem zuletzt aufgezeichneten Bewegungs-/Türklingel-Video.

## Installation

Installieren Sie diesen Adapter mithilfe der ioBroker-Repositories.

> \[!NOTE] Dieser Adapter unterstützt keine Installation von GitHub.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 7.0.1 (2026-09-04)
- (mcm1957) **BREAKING:** enhanced security (added encryption) requires that you enter the access refreshtoken one more time 
- (bluefox) The admin tab was rewritten in React (`src-tab/`), replacing the materialize page - doorbell cameras are listed now, they were silently skipped before
- (bluefox) The tab no longer assumes the web adapter runs on port 8082; it derives host, port and protocol from the URL states
- (bluefox) The adapter was refactored: TypeScript 6, @iobroker/eslint-config, gulp removed
- (bluefox) **BREAKING:** `build/` is no longer committed and `common.nogit` is set - the adapter can only be installed from npm, no longer directly from GitHub
- (bluefox) `ring-client-api` is ESM only and is loaded dynamically now, which fixes `ERR_REQUIRE_ESM` on Node.js 22.0 - 22.11
- (bluefox) All backend timers are managed by js-controller now and are stopped when the instance unloads
- (bluefox) Scheduled jobs (daily sun calculation, auto save) are cancelled on unload and no longer collide between instances
- (bluefox) Fixed: the health state was never refreshed after switching a camera light
- (bluefox) Fixed: a failing livestream target preparation still deleted the target file and never reported the error to the caller
- (bluefox) Fixed: several `async` methods returned before the work they started was finished
- (bluefox) Removed the unused config values `email`, `password`, `pollsec`, `sentry_enable`, `timeout` and `twofaceauth`; `renew_registration` has a default now
- (bluefox) Removed the leftover `admin/index_m.html` - the configuration dialog has been JsonConfig for a while
- (Speedbreaker12) #993 Add doorbell_sunray (Battery Video Doorbell 2K) as doorbell
- (Speedbreaker12) #993 #854 Add stickup_cam_mini_ptz_v1 (Pan-Tilt Indoor Cam) as stickup cam
- (Speedbreaker12) #993 Unsupported device logging no longer dumps the whole device object (could expose the Ring refresh token in the log)
- (GermanBluefox) Devices previously created below `unknown_<id>` are recreated below `doorbell_<id>` / `stickup_<id>`; the old objects stay behind and have to be deleted manually
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

* (copilot) **CI/CD**: Updated ioBroker Copilot Instructions template from v0.4.0 to v0.4.2

### 6.4.0 (2025-06-27)

* (theimo1221) #820 Support Node-JS 22

### 6.3.0 (2024-11-08)

* (theimo1221) #768 Add df_doorbell_clownfish
* (theimo1221) #738 Add stickup_cam_medusa
* (theimo1221) #685 Add cocoa_doorbell_v3

### 6.2.4 (2024-10-31)

* (simatec) Settings for responsive Design
* (theimo1221) Update some developer packages

### 6.2.3 (2024-10-31)

* (theimo1221) Fix License-Info object in io-package.json
* (theimo1221) Update iobroker test package
* (theimo1221) Update some test packages regarding mocha


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2025 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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