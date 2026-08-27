---
BADGE-Number of Installations: https://iobroker.live/badges/motioneye-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/motioneye-stable.svg
BADGE-NPM Version: https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.motioneye.svg
BADGE-COMMUNITY: https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg
BADGE-MAINTAINER: https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg
BADGE-AI: https://img.shields.io/badge/ai%20assisted-cursor-blue.svg
BADGE-Paypal Donation: https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/README.md
title: без названия
hash: 3wNYB1rOKEVLL/JLKuXKZX/7Mspz3y+Bw4HwU3WDlBE=
---
![Логотип](../../../en/admin/motioneye.png)

### Адаптер ioBroker для MotionEye
## Документация
- [Настройки](settings.md)
- [Камеры](cameras.md)
- [Режимы камеры](modes.md)
- [Уровень оповещения (VIS)](alert-level.md)
- [Datapoints](datapoints.md)
- [Прямая трансляция в VIS](vis-stream.md)
- [Помощь и часто задаваемые вопросы](faq.md)

#### Требования к ioBroker
1. Node.js 22 или более поздняя версия.
2. js-controller 6.0.11 или более поздняя версия.
3. Административный адаптер версии 7.6.20 или новее.

#### Требования MotionEye
1. MotionEye с API конфигурации на порту **8765** (по умолчанию)
2. **MotionEye 0.44+:** адаптер **0.5.0** или новее (вход через сессию) — см. [FAQ](faq.md#motioneye-044-adapter-050)

## Быстрый старт
— Создайте по одному экземпляру адаптера для каждого сервера MotionEye.
- В **Настройках**: укажите хост MotionEye, учетные данные и **хост веб-перехватчика** (IP-адрес ioBroker, доступный с MotionEye).
- В разделе **Камеры**: добавьте камеры или используйте **Загрузить камеры из MotionEye**, затем сохраните и перезапустите экземпляр.
— Проверьте `motioneye.<instance>._info.connection` — значение должно быть `true`, когда MotionEye доступен.
- Для прямой трансляции видео в VIS: HTML-виджет с привязкой к `<camera>.streamUrl` (см. [Прямая трансляция в VIS](vis-stream.md)).

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