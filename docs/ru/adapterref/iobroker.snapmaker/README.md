---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.snapmaker/README.md
title: Адаптер ioBroker для Snapmaker 2.0
hash: jL5I3T6YygBEmn6o51FJPkAgvy66EfIrqNqExdAbGgM=
---
![Логотип](../../../en/adapterref/iobroker.snapmaker/admin/snapmaker-logo.png)

![Количество установок](https://iobroker.live/badges/snapmaker-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/snapmaker-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.snapmaker.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.snapmaker.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для Snapmaker 2.0

---

## Для чего нужен этот адаптер?

Подключает станки **Snapmaker 2.0** (основная целевая платформа: **A350** , также с лазерными/станками с ЧПУ) к ioBroker через локальный HTTP API на порту `8080`.

Типичные ценности, проявляющиеся в процессе работы:

- Текущее / последнее **имя файла**
- **Оставшееся** и прошедшее время
- Ход работ и состояние оборудования (`IDLE`, `RUNNING`, `PAUSED`, …)

Connection использует поток токенов Snapmaker (`POST /api/v1/connect` → Дополнительное подтверждение на сенсорном экране → Опрос `GET /api/v1/status`).

Вы можете вставить существующий токен Любана (`%APPDATA%\snapmaker-luban\machine.json` →`server.token` Введите UUID в настройках адаптера, чтобы пропустить новую авторизацию.

Производитель: [Snapmaker](https://snapmaker.com/) . Другие модели Snapmaker 2.0 (A150 / A250) могут работать с перебоями; модели Artisan / U1 используют другие протоколы и не входят в область их применения.

## Конфигурация

| Параметр        | По умолчанию | Описание                                                                                                                                                                                                                                                                                     |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-адрес        | —            | Адрес компьютера (обязательно), например `192.168.150.150`                                                                                                                                                                                                                                    |
| Интервал опроса | `10` с       | Интервал опроса состояния (мин. 2 с)                                                                                                                                                                                                                                                         |
| API-токен       | пустой       | Необязательный UUID от Любана `server.token` в `machine.json` (`%APPDATA%\snapmaker-luban\machine.json` в Windows; `~/.config/snapmaker-luban/machine.json` на Linux; `~/Library/Application Support/snapmaker-luban/machine.json` (в macOS). Оставьте поле пустым, чтобы запросить новый токен. |

На один экземпляр адаптера приходится одна машина.

## Точки данных

Под `snapmaker.<instance>.*`:

| Состояние                              | Описание                                                                                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                      | Индикатор подключения                                                                                                                                |
| `info.series`                          | Серия машины (например, Snapmaker 2.0 A350)                                                                                                          |
| `info.toolHead`                        | Инструментальная головка от Connect `headType` (например `10W Laser` /`1.6W Laser` /`CNC` /`Print`)                                                   |
| `info.x` /`info.y` /`info.z`           | Положение станка (мм)                                                                                                                                |
| `info.homed`                           | Оси были направлены в дом                                                                                                                            |
| `status`                               | Состояние машины (`IDLE`, `RUNNING`, `PAUSED`, …)                                                                                                   |
| `printStatus`                          | Задание / текст статуса печати                                                                                                                       |
| `currentJob.fileName`                  | Имя текущего/последнего файла задания (полное, например) `Weihnachtsbude.nc`)                                                                        |
| `currentJob.fileBase`                  | Имя файла задания без расширения (например) `Weihnachtsbude`)                                                                                        |
| `currentJob.progress`                  | Прогресс в %                                                                                                                                         |
| `currentJob.elapsedTime`               | Прошедшее время (в секундах)                                                                                                                         |
| `currentJob.elapsedText`               | Прошедшее время (`HH:MM:SS`)                                                                                                                        |
| `currentJob.remainingTime`             | Оставшееся время (в секундах)                                                                                                                        |
| `currentJob.remainingText`             | Оставшееся время (`HH:MM:SS`)                                                                                                                       |
| `currentJob.estimatedTime`             | Расчетное общее время выполнения работы, по данным станка (в секундах)                                                                               |
| `currentJob.estimatedText`             | Примерное общее время выполнения работы (`HH:MM:SS`)                                                                                                |
| `currentJob.finishAt`                  | Примерное время завершения (местное) `YYYY-MM-DD HH:MM`)                                                                                             |
| `currentJob.currentLine` /`totalLines` | Ход выполнения строки G-кода                                                                                                                         |
| `modules.enclosure`                    | Прилагаемое приложение                                                                                                                               |
| `modules.rotary`                       | Вращающийся модуль прикреплен                                                                                                                        |
| `modules.emergencyStop`                | Прикреплена кнопка аварийной остановки.                                                                                                              |
| `modules.airPurifier`                  | В комплекте очиститель воздуха.                                                                                                                      |
| `enclosure.doorOpen`                   | Дверь корпуса открыта.                                                                                                                               |
| `enclosure.ready`                      | Отчеты о состоянии корпуса готовы (только при наличии корпуса).                                                                                      |
| `enclosure.doorDetection`              | Функция обнаружения двери включена (только при наличии защитного кожуха).                                                                            |
| `enclosure.light`                      | Яркость подсветки корпуса в % (только при наличии корпуса)                                                                                           |
| `enclosure.fan`                        | Скорость вращения вентилятора корпуса в % (только при наличии корпуса)                                                                               |
| `laser.modulePower`                    | Номинальная мощность лазерного модуля (Вт) от подключения `headType` (3→1.6, 4→10, 6→20, 7→40, 9→2; `0` (если не лазер)                                |
| `laser.power`                          | Мощность лазера (%) — последнее ненулевое значение во время выполнения задания. `RUNNING` /`PAUSED` (отсутствие мерцания между векторами, равного 0%) |
| `laser.powerRaw`                       | Мощность лазера (%) — снимок в реальном времени с аппарата (может быть) `0` (между строками)                                                          |
| `laser.on`                             | `true` при активной мощности больше 0                                                                                                                |
| `laser.workSpeed`                      | Скорость работы (`mm/min`)                                                                                                                          |
| `laser.focalLength`                    | Фокусное расстояние лазера, указанное прибором (мм)                                                                                                  |
| `laser.errorState`                     | Состояние ошибки лазерного модуля (`0` = ОК)                                                                                                         |
| `laser.camera`                         | Обнаружена лазерная камера                                                                                                                           |

Поля задания заполняются, пока задание активно; простаивающие станки могут оставлять их пустыми/нулевыми. Для более точного отображения лазерного изображения в реальном времени уменьшите интервал опроса (например, 2–3 с) и используйте `laser.powerRaw` /`laser.on`.

Опрос конечной точки корпуса производится только при обнаружении корпуса. `modules.enclosure`), потому что машины без корпуса возвращают бессмысленные значения по умолчанию. `modules.*` Состояния заполняются только в том случае, если микропрограмма предоставляет список модулей.

## Поддерживать

Если вам нравится наша работа и вы хотели бы нас поддержать, мы будем благодарны за любое пожертвование. (Эта ссылка ведет на наш счет PayPal и не связана с ioBroker.)

[![Пожертвовать](https://github.com/inventwo/ioBroker.snapmaker/blob/main/img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-18)
- (skvarel) Added `currentJob.fileBase` (job file name without extension)

### 0.5.3 (2026-11-17)
- (skvarel) Bump `@iobroker/testing` to 6.3.2 (`S0064`)

### 0.5.2 (2026-11-15)
- (skvarel) Clamp poll interval in code (min 2 s, max so timeout stays within setTimeout limits)

### 0.5.1 (2026-11-14)
- (skvarel) Fixed state roles: use `value` instead of `level` for read-only laser/enclosure percent states (`E1011`)

### 0.5.0 (2026-11-13)
- (skvarel) Added `laser.focalLength`, `laser.errorState`, `laser.camera`
- (skvarel) Added `currentJob.estimatedTime` / `estimatedText`
- (skvarel) Added `modules.*` (enclosure, rotary, emergency stop, air purifier) and `enclosure.ready` / `doorDetection` / `light` / `fan`
- (skvarel) Set `info.connection` to `false` on adapter stop
- (skvarel) Fixed `laser.modulePower` / `info.toolHead`: use connect `headType` (10W module was shown as 1.6W)

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