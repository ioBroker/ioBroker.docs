---
BADGE-Number of Installations: https://iobroker.live/badges/motioneye-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/motioneye-stable.svg
BADGE-NPM Version: https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.motioneye.svg
BADGE-COMMUNITY: https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg
BADGE-MAINTAINER: https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg
BADGE-AI: https://img.shields.io/badge/ai%20assisted-cursor-blue.svg
BADGE-Paypal Donation: https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg
---
![Logo](../../admin/motioneye.png)

### ioBroker-Adapter für MotionEye

## Dokumentation

- [Einstellungen](settings.md)
- [Kameras](cameras.md)
- [Kameramodi](modes.md)
- [Schutzstufe (VIS)](alert-level.md)
- [Datenpunkte](datapoints.md)
- [Livestream in VIS](vis-stream.md)
- [Hilfe & FAQ](faq.md)

#### ioBroker-Voraussetzungen

1. Node.js 22 oder neuer
2. js-controller 6.0.11 oder neuer
3. Admin-Adapter 7.6.20 oder neuer

#### MotionEye-Voraussetzungen

1. MotionEye mit Config-API auf Port **8765** (Standard)
2. **MotionEye 0.44+:** Adapter **0.5.0** oder neuer (Session-Login) — siehe [FAQ](faq.md#motioneye-044-adapter-050)

## Schnellstart

- Pro MotionEye-Server eine Adapter-Instanz anlegen.
- Unter **Einstellungen**: MotionEye-Host, Zugangsdaten und **Webhook-Host** setzen (ioBroker-IP, von MotionEye aus erreichbar).
- Unter **Kameras**: Kameras eintragen oder **Kameras aus MotionEye laden**, speichern und Instanz neu starten.
- `motioneye.<Instanz>._info.connection` prüfen — sollte `true` sein, wenn MotionEye erreichbar ist.
- Livebild in VIS: HTML-Widget mit Binding auf `<kamera>.streamUrl` (siehe [Livestream in VIS](vis-stream.md)).

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->

### 1.3.1 (2026-07-12)
- (skvarel) Fixed Telegram snapshot notifications ignored or text-only on some cameras: legacy saved flags (`notificationEnabled`, `notificationImageExcluded`) no longer override per-camera **On snapshot** / **Send image** = Yes
- (skvarel) Telegram snapshot images sent as photo buffer with caption (reliable delivery vs. absolute file path)

### 1.3.0 (2026-07-11)
- (skvarel) Instance `_info` disk usage from MotionEye: `diskUsedGb`, `diskTotalGb`, `diskUsedPercent` (filesystem of first online camera)

### 1.2.0 (2026-07-11)
- (skvarel) Per-camera **`alertLevel`** datapoint: one VIS dropdown for off / motion-only / motion+Telegram / motion+video / full protection; syncs `mode` and Telegram-on-motion; legacy `mode` writes still supported
- (skvarel) Fixed Telegram-on-motion image: trigger MotionEye snapshot before download when `lastsnap.jpg` is not ready yet (same path as manual snapshot button)
- (skvarel) Telegram notification timestamps use local time (`YYYY-MM-DD HH:mm:ss`) instead of UTC ISO (`…Z`)

### 1.1.0 (2026-07-11)
- (skvarel) Per-camera Telegram triggers: separate **On motion** / **On snapshot** Yes/No dropdowns in the table (no global motion/snapshot checkboxes)

### 1.0.0 (2026-07-11)
- (skvarel) Notifications tab: built-in Telegram on motion and/or snapshot — recipients with Active toggle, per-camera message template (Yes/No dropdowns), per-camera recipient filter, test message
- (skvarel) Snapshot cache: `lastsnap.jpg` in ioBroker file storage, **Snapshots** tab, datapoints `snapshots.*` for VIS/Telegram/scripts
- (skvarel) Per-camera motion detection tuning under `motiondetection.*`
- (skvarel) FAQ: snapshot storage, Telegram hints, notifications tab

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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