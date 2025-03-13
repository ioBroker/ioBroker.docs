---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ankersolix2/README.md
title: ioBroker.ankersolix2
hash: rRSfHrrOlDzK9QTnaYIIJW2Lap1bqlUAjx1nWjoC2k4=
---
![Логотип](../../../en/adapterref/iobroker.ankersolix2/admin/ankersolix2.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ankersolix2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ankersolix2.svg)
![Количество установок](https://iobroker.live/badges/ankersolix2-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/ankersolix2-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ankersolix2.png?downloads=true)

# IoBroker.ankersolix2
**Тесты:** ![Тест и выпуск](https://github.com/ronny130286/ioBroker.ankersolix2/workflows/Test%20and%20Release/badge.svg)

## Адаптер ankersolix2 для ioBroker
Интегрировать Anker Solix 2

## Описание
Этот проект создан на основе https://github.com/tomquist/solix2mqtt и переносит информацию из API Anker непосредственно в ioBroker.

## Поддерживаемые устройства
У меня не все [Оборудование Anker](https://www.ankersolix.com/) доступно для тестирования. Я могу только перечислить оборудование, которое я протестировал. Возможно, что все остальные [оборудование Anker](https://www.ankersolix.com/) также совместимы

| Устройство | Описание |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `Solarbank` | - A17C0: Solarbank E1600 (1-е поколение)<br> - A17C1: Solarbank 2 E1600 Pro<br> - A17C3: Solarbank 2 E1600 Plus<br> |
| `Умный счетчик` | - A17X7: Anker 3-фазный Wi-Fi умный счетчик<br> - SHEM3: интеллектуальный счетчик Shelly 3EM<br> - SHEMP3: Умный счетчик Shelly 3EM Pro |

## Важное изменение
Если вы обновляетесь с v1.x до 2.x, вам придется снова ввести свой пароль! Если вы этого не сделаете, вы заблокируете свой аккаунт!!!

## Конфигурация
1. Создайте семейный аккаунт в приложении Anker и добавьте его к своему основному аккаунту.
2. установить адаптер
3. перейдите в настройки адаптера и укажите свои учетные данные
4. В первый раз, пожалуйста, используйте большое время опроса (180 секунд), чтобы у вас было достаточно времени остановить адаптер, если что-то пойдет не так.

Обычно в файле журнала вы можете увидеть, что у вас есть site_id и вы получили сообщение: Опубликовано.

## Помогает
Если у вас есть ошибки типа 401, проверьте свои учетные данные.
Если у вас снова есть ошибки и вы не можете войти в систему, остановите адаптер и удалите session.data в iobroker-data/ankersolix2.0 (например, /opt/iobroker/iobroker-data/ankersolix2/), после этого снова запустите адаптер.

## Благодарности

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.0.0 (2025-03-09)

- (ronny130286) update packages
- (ronny130286) decrypt password in adminui
- (ronny130286) add more language codes
- (ronny130286) reorganized some DP

### 1.1.0 (2025-02-08)

- (ronny130286) add analysis data for week/day
- (ronny130286) update packages

### 1.0.3 (2024-12-06)

- (ronny130286) edit refreshtimer
- (ronny130286) add to repo

### 1.0.2 (2024-12-04)

- (ronny130286) bugfix

### 1.0.1 (2024-12-01)

- (ronny130286) ESLint 9.x

### 1.0.0 (2024-11-29)

- (ronny130286) stable release
- (ronny130286) fixed backup_info object

### 0.1.0-beta.0 (2024-10-02)

- (ronny130286) beta release

### 0.0.3-alpha.0 (2024-09-25)

- (ronny130286) fix session.data
- (ronny130286) npm release

### 0.0.2-alpha.0 (2024-09-20)

- (ronny130286) initial release

## License

MIT License

Copyright (c) 2025 ronny130286 <ronnymatthei@gmx.de>

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