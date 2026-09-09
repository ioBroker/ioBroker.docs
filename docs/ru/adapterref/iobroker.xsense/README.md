---
BADGE-NPM: https://nodei.co/npm/iobroker.xsense.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xsense.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xsense.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.xsense
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.xsense
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/xsense-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/xsense-stable.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xsense/README.md
title: ioBroker.xsense
hash: cVs2+UpS0IqpiAnic2+rk8AT9SiVDu+pPnOkHD/lBzU=
---
![логотип](../../../de/adapterref/iobroker.xsense/admin/xsense.png)

![НПМ](https://nodei.co/npm/iobroker.xsense.png?downloads=true)
![Версия NPM](http://img.shields.io/npm/v/iobroker.xsense.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xsense.svg)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![Проблемы на GitHub](https://img.shields.io/github/issues/arteck/ioBroker.xsense)
![Лицензия](https://img.shields.io/badge/License-MIT-blue.svg)
![Количество установок](http://iobroker.live/badges/xsense-installed.svg)
![бета](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/xsense-stable.svg)

# ioBroker.xsense

\=================

</br>
**Version:** </br>

## Адаптер XSense для ioBroker

Этот адаптер ioBroker позволяет интегрировать следующие компоненты: [устройства XSense](https://de.x-sense.com/) в систему умного дома ioBroker.\
Он предназначен для приема данных от датчиков дыма, датчиков угарного газа и других совместимых устройств XSense, делая их доступными в ioBroker для автоматизации и мониторинга.\
Адаптер взаимодействует с облачным сервером XSense и обеспечивает простой способ интеграции устройств XSense в существующие системы ioBroker.\
Для работы требуется мост XSense Bridge SBS50.

---

## ❗ ВНИМАНИЕ

Адаптер **нет** Предназначено для использования в целях оповещения — в первую очередь для мониторинга состояния батареи устройства. Я не несу ответственности, если помещение сгорит.

---

### 🔧 Поддерживаемые устройства

- Детекторы дыма
- Детекторы угарного газа
- Детекторы тепла
- Детекторы протечек воды
- Гигрометры
- Базовые станции (если поддерживаются)

---

### ⚠️ Требования

- Учетная запись XSense с зарегистрированными устройствами
- Подключение к интернету для облачной связи
- MQTT-сервер для сообщений

---

### 📦 Подготовка

Поскольку XSense не допускает одновременного входа в систему из приложения и стороннего программного обеспечения, рекомендуется следовать следующей процедуре:

- Создайте вторую учетную запись в приложении XSense.
- Войдите в систему под новой учетной записью, затем выйдите из нее.
- Войдите снова, используя свою первоначальную учетную запись.
- Предоставьте доступ к нужным устройствам из основной учетной записи новой учетной записи.
- Войдите снова в новую учетную запись и примите приглашение.
- Наконец, введите новые учетные данные в настройках адаптера.

  **В качестве альтернативы:** Вы можете использовать только одну учетную запись, и недостаток этого заключается в том, что вас постоянно будут выводить из приложения.

---

## ❗ Устранение неполадок

Сообщение об ошибке после установки

\[XSense] Не удалось найти пакет '@mongodb-js/zstd'

Проверьте версию Node.js. У zstd возникла проблема с Node.js 24.

или, если у вас установлена виртуальная машина на Proxmox, проверьте настройки процессора. <img width="676" height="140" alt="grafik" src="https://github.com/user-attachments/assets/68658aab-5336-4493-9a51-f833c3238a5a" />

---

---

<img width="1425" height="768" alt="grafik" src="https://github.com/user-attachments/assets/fd52869a-48f3-403a-a97c-dfef587e02bf" />

<img width="2028" height="577" alt="grafik" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

---

<!--
      ### **WORK IN PROGRESS**
-->

## Changelog
### 0.6.5 (2026-08-27)
* (arteck) async fix
* (arteck) fix battery info
* (arteck) fix orphaned states without house folder from MQTT messages for stations not yet known (startup race and newly added devices)

### 0.6.4 (2026-06-22)
* (arteck) Dependencies have been updated

### 0.6.3 (2026-05-20)
* (arteck) Dependencies have been updated

### 0.6.2 (2026-05-20)
* (copilot) Adapter requires node.js >= 22 now
* (arteck) Dependencies have been updated

### 0.6.1 (2026-05-03)
* (arteck) fix deviceManager

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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