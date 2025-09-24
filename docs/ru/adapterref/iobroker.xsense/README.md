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
hash: lXYKPeJrq1REyGDcyi6qzSM4N0/S0n2sjBJ8GuUJ3Gc=
---
![логотип](../../../de/adapterref/iobroker.xsense/admin/xsense.png)

![НПМ](https://nodei.co/npm/iobroker.xsense.png?downloads=true)
![версия НПМ](http://img.shields.io/npm/v/iobroker.xsense.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xsense.svg)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![Проблемы с GitHub](https://img.shields.io/github/issues/arteck/ioBroker.xsense)
![Лицензия](https://img.shields.io/badge/License-MIT-blue.svg)
![Количество установок](http://iobroker.live/badges/xsense-installed.svg)
![бета](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/xsense-stable.svg)

# IoBroker.xsense
=================

</br> **Версия:** </br>

## Адаптер XSense для ioBroker
Этот адаптер ioBroker позволяет интегрировать [Устройства XSense](https://de.x-sense.com/) в систему умного дома ioBroker.
Он предназначен для получения данных от датчиков дыма XSense, датчиков угарного газа и других совместимых устройств, делая их доступными в ioBroker для автоматизации и мониторинга.
Адаптер взаимодействует с облачным сервером XSense и обеспечивает простую интеграцию устройств XSense в существующие системы ioBroker.
Требуется мост XSense SBS50.

---

## ❗ ВНИМАНИЕ
Слишком частый интервал опроса (по умолчанию: 5 минут) сократит время работы устройства от аккумулятора, поскольку устройства **всегда** активируются.
Адаптер **не** предназначен для использования в качестве будильника — он предназначен в первую очередь для мониторинга состояния аккумулятора устройства.

---

### 🔧 Поддерживаемые устройства
- Детекторы дыма
- Детекторы угарного газа
- Тепловые извещатели
- Детекторы утечки воды
- Гигрометры
- Базовые станции (если поддерживаются)

---

### ⚠️ Требования
- Учетная запись XSense с зарегистрированными устройствами
- подключение к Интернету для облачной коммуникации

---

### 📦 Подготовка
Поскольку XSense не допускает одновременный вход из приложения и стороннего программного обеспечения, рекомендуется следовать следующей процедуре:

- Создайте вторую учетную запись в приложении XSense
- Войдите в систему с новой учетной записью, затем выйдите из системы.
- Войдите в систему снова, используя свою первоначальную учетную запись.
- Поделитесь нужными устройствами из основного аккаунта с новым аккаунтом.
- Войдите в новую учетную запись и примите приглашение.
- Наконец, введите данные новой учетной записи в настройках адаптера.

**Альтернатива:** Вы можете использовать только одну учетную запись, но при этом вы будете постоянно выходить из приложения.

---

## 🚀 Установка Python (если еще не установлен)
Это должна быть официальная и публично выпущенная версия Python.

💻 **Windows**

1. **Установите Python**
- Загрузить: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
- Во время установки **включите «Добавить Python в PATH»**
- Затем проверьте:

```powershell
python --version
pip --version
```

- После этого в объектах под `xsense.0.info.callPython` введите `python` (значение по умолчанию - `python3`).

🐧 **Linux / Docker**

- Это происходит автоматически — просто выберите предпочтительную версию в настройках адаптера.

---

## ❗ Устранение неполадок
Если установлена правильная версия, но адаптер уже скачал неправильную, сначала удалите среду:

```
  rm -Rf /home/iobroker/.cache/autopy/venv/xsense-env
 ```

Затем перезапустите адаптер.
Если он по-прежнему не работает, проверьте файл /home/iobroker/.cache/autopy/venv/xsense-env/pyvenv.cfg.
В нём перечислены версии Python, соответствующие вашей среде — при необходимости откорректируйте.
Если файл отсутствует, значит, вы не дождались запуска адаптера достаточно долго.

------------------------------------------------------------------------------
------------------------------------------------------------------------------

<img width="1029" height="438" alt="графический" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="1387" height="779" alt="графический" src="https://github.com/user-attachments/assets/f065c43d-125b-4ca4-a053-bbf4b926e1f6" />

------------------------------------------------------------------------------

## Changelog
### 0.0.18 (2025-09-06)
* (arteck) fix time state from device

### 0.0.17 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.16 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.15 (2025-08-17)
* (arteck) add forceRefresh button for manual refresh of device data

### 0.0.14 (2025-08-16)
* (arteck) add checkbox for windows
* (arteck) add timeout for python
* (arteck) fix state roles

### 0.0.13 (2025-08-03)
* (arteck) fix io-package

### 0.0.12 (2025-07-30)
* (arteck) fix util

### 0.0.11 (2025-07-30)
* (arteck) fix util missing

### 0.0.10 (2025-07-30)
* (arteck) pip auto install for linux

### 0.0.9 (2025-07-30)
* (arteck) fix callPython Object

### 0.0.8 (2025-07-30)
* (arteck) add callPython Object

### 0.0.6 (2025-07-29)
* (arteck) new error message

### 0.0.5 (2025-07-29)
* (arteck) serialnumber is a string

### 0.0.4 (2025-07-28)
* (arteck) fix language

### 0.0.3 (2025-07-28)
* (arteck) modify Debug method

### 0.0.2 (2025-07-28)
* (arteck) initial release

### 0.0.1 (2025-07-27)
* (arteck) initial release

## License

MIT License

Copyright (c) 2025 Arthur Rupp <arteck@outlook.com>,

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