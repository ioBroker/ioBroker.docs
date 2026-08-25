---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.creality/README.md
title: Адаптер ioBroker для 3D-принтера CREALITY
hash: 03xHafKJgCX1Vnf1EUcczgmVLVNp9wRN5d/efv/usTQ=
---
![Логотип](../../../en/adapterref/iobroker.creality/admin/creality.png)

![Количество установок](https://iobroker.live/badges/creality-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/creality-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.creality.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.creality.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для 3D-принтера CREALITY
---

## Что делает этот адаптер
Обеспечивает подключение принтеров Creality Klipper (основная целевая платформа: **[SPARKX i7](https://store.creality.com/products/sparkx-i7-3d-printer)** с CFS lite) к ioBroker через два локальных API:

1. **Moonraker HTTP** (порт по умолчанию `7125`) — статистика печати, температура, вентиляторы, контейнер для филамента CFS, G-код
2. **Creality WebSocket** (порт по умолчанию `9999`) — светодиод индикатора положения инструмента, пауза/возобновление/остановка, состояние пользовательского интерфейса выравнивания/самотестирования, оставшееся время (`printLeftTime`)

Одного Moonraker недостаточно для отображения состояний пользовательского интерфейса Creality (например, выравнивание, когда Klipper по-прежнему сообщает `standby`) или подсветки инструмента.

Производитель: [Креативность](https://www.creality.com/). Другие модели Creality Klipper могут работать с перебоями; на данный момент протестирована только модель SPARKX i7.

## Конфигурация
| Настройки | По умолчанию | Описание |
|---------|---------|-------------|
| Хост / IP-адрес | — | Адрес принтера (обязательно) |
| HTTP-порт Moonraker | `7125` | Обратный прокси Fluidd часто использует `4408` |
| Интервал опроса | `5` с | Опрос Moonraker (мин. 2 с) |
| Интервал опроса | `5` с | Опрос Moonraker (мин. 2 с) |
| API-ключ | пустой | Дополнительная авторизация в Moonraker |
| Управление печатью / CFS / Вентиляторы | включено | Переключатели функций для дерева состояний |

Один принтер на один адаптер.

## Точки данных
В разделе `creality.<instance>.*` (примеры):

| Штат | Описание |
|-------|-------------|
| `state` / `stateKlipper` / `selfTestStep` | Статус пользовательского интерфейса / Klipper |
| `info.*` | Модель, прошивка, имя хоста, серийный номер, диск, часы/задания печати, ошибки |
| `temp.*` | Сопло, основание, коробка/камера |
| `fans.partCooling` | Охлаждение детали **UI %** (соответствует отображению в слайсере/принтере; Creality `fan0_min` переназначение) |
| `fans.partCoolingPwm` | Охлаждение компонентов **ШИМ %** (рабочий цикл аппаратного обеспечения из Moonraker) |
| `fans.*` / `cfs.*` | Другие вентиляторы / CFS (опционально) |
| `control.light` / `sleepMode` / `pause` / `resume` / `stop` | Элементы управления |
| `webcam.available` | Камера присутствует (только для чтения; локальный API не может выключить ее на SPARKX i7) |
| `webcam.streamUrl` | URL для iframe VIS (страница Creality WebRTC, по умолчанию `http://<host>:8000`) |
| `webcam.webrtcUrl` | Конечная точка сигнализации WebRTC |
| `webcam.webrtcUrl` | Конечная точка сигнализации WebRTC |

**Примечание о веб-камере:** SPARKX использует WebRTC на порту `8000`, а не классический MJPEG. `webcam.streamUrl` указывает на страницу просмотра Creality — её можно использовать в iframe VIS, если браузер может получить доступ к IP-адресу принтера. Для Home Assistant / go2rtc используйте `webcam.webrtcUrl`.

## Поддерживать
Если вам нравится наша работа и вы хотели бы нас поддержать, мы будем благодарны за любое пожертвование.

(Эта ссылка ведет на наш счет PayPal и не связана с ioBroker.)

[![Пожертвовать](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
	### **WORK IN PROGRESS**
-->
### 0.4.1 (2026-08-25)
- (skvarel) Fixed `currentJob.filament*` for external spool holder (`filament_rack`) when CFS is not active

### 0.4.0 (2026-08-20)
- (skvarel) Adapter requires admin >= 7.8.23 now.

### 0.3.0 (2026-08-14)
- (skvarel) Fixed button states `control.pause|resume|stop` to use `read: false`
- (skvarel) Added manufacturer / SPARKX i7 product links to README
- (skvarel) Modified CFS temperature/humidity roles to `value.temperature` / `value.humidity`
- (skvarel) Modified Moonraker poll loop to use `setTimeout` chain instead of `setInterval`
- (skvarel) Modified `currentJob.finishAt` to include local date (`YYYY-MM-DD HH:MM`)

### 0.2.0 (2026-08-08)
- (skvarel) Fixed part cooling fan % to match slicer/display (Creality fan0_min remapping)
- (skvarel) Added `fans.partCoolingPwm` for raw PWM duty cycle

### 0.1.4 (2026-08-02)
- (skvarel) Fixed string state roles for repository object check

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