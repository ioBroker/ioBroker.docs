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
hash: ceT3UrkNGF1iTp+oW/Ry7epFUY7GzkAdasLqxCjpwP4=
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

# IoBroker.xsense
=================

</br> **Версия:** </br>

## Адаптер XSense для ioBroker
Этот адаптер ioBroker позволяет интегрировать [устройства XSense](https://de.x-sense.com/) в систему «умного дома» ioBroker.
Он предназначен для приема данных от датчиков дыма, датчиков угарного газа и других совместимых устройств XSense, делая их доступными в ioBroker для автоматизации и мониторинга.
Адаптер взаимодействует с облачным сервером XSense и обеспечивает простой способ интеграции устройств XSense в существующие системы ioBroker.
Требуется XSense Bridge SBS50.

## The [Исходный код на Python (https://github.com/theosnel/python-xsense) взят из [theosnel].](https://github.com/theosnel) .. большое спасибо за
---

## ❗ ПРЕДУПРЕЖДЕНИЕ
Данный адаптер **не** предназначен для использования в качестве тревожной кнопки — он в первую очередь предназначен для мониторинга состояния батареи устройства.

---

### 🔧 Поддерживаемые устройства
- Детекторы дыма
- Детекторы угарного газа
- Тепловые детекторы
- Детекторы протечек воды
- Гигрометры
- Базовые станции (если поддерживаются)

---

### ⚠️ Требования
- Учетная запись XSense с зарегистрированными устройствами
- Подключение к интернету для облачной связи

---

### 📦 Подготовка
Поскольку XSense не допускает одновременного входа в систему из приложения и стороннего программного обеспечения, рекомендуется следовать следующей процедуре:

- Создайте вторую учетную запись в приложении XSense.
— Войдите в систему с новой учетной записью, затем выйдите из нее.
— Войдите снова, используя свою первоначальную учетную запись.
- Предоставьте доступ к нужным устройствам из основной учетной записи новой учетной записи.
— Войдите снова в новую учетную запись и примите приглашение.
— Наконец, введите новые учетные данные в настройках адаптера.

**В качестве альтернативы:** Вы можете использовать только одну учетную запись, с тем недостатком, что вас постоянно будут выводить из приложения.

---

## 🚀 Установка Python (если он еще не установлен)
Это должна быть официальная и общедоступная версия Python.

💻 **Windows**

1. **Установите Python**
- Скачать: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
— Во время установки **включите опцию «Добавить Python в PATH»**.
Затем проверьте:

```powershell
python --version
pip --version
```

— Затем в объектах в разделе `xsense.0.info.callPython` введите `python` (значение по умолчанию — `python3`).

🐧 **Linux / Docker**

— Это происходит автоматически — просто выберите предпочтительную версию в настройках адаптера.

---

## ❗ Устранение неполадок
Если установлена правильная версия, но адаптер уже загрузил неправильную, сначала удалите среду:

```
  rm -Rf /home/iobroker/.cache/autopy/venv/xsense-env
 ```

Затем перезапустите адаптер.
Если это по-прежнему не работает, проверьте файл /home/iobroker/.cache/autopy/venv/xsense-env/pyvenv.cfg.
В нем указаны версии Python, соответствующие вашей среде — при необходимости внесите корректировки.
Если файл отсутствует, значит, вы не дождались запуска адаптера достаточно долго.

Сообщение об ошибке после установки

[XSense] Не удалось найти пакет '@mongodb-js/zstd'

Проверьте версию Node.js. У zstd возникла проблема с Node.js 24.

или, если у вас установлена виртуальная машина на Proxmox, проверьте настройки процессора. <img width="676" height="140" alt="графический" src="https://github.com/user-attachments/assets/68658aab-5336-4493-9a51-f833c3238a5a" />

------------------------------------------------------------------------------
------------------------------------------------------------------------------

<img width="1029" height="438" alt="графический" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="2028" height="577" alt="графический" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

------------------------------------------------------------------------------

## Changelog
### 0.2.2 (2025-12-03)
* (arteck) add XS0D-MR

### 0.2.1 (2025-10-30)
* (arteck) fix link to readme
* (arteck) fix load bridge as first

### 0.2.0 (2025-10-21)
* (arteck) !!!!!!!!!!!!!!!!!!!!!!!   new tree structure, delete all old devices
* (arteck) fix for more bridges

### 0.1.3 (2025-10-20)
* (arteck) fix for more devices than 15

### 0.1.2 (2025-10-06)
* (arteck) fix error message

### 0.1.1 (2025-10-04)
* (arteck) fix

### 0.1.0 (2025-10-04)
* (arteck) improved query handling
* (arteck) add Test button with answer message
* (arteck) shorter request interval (min 10 sec)

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