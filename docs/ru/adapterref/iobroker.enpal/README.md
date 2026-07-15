---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enpal/README.md
title: Адаптер ioBroker для Enpal Solar
hash: Bh8A0oHG4rVcna8B6lrzEWUvAZCzrobxt4wsJQstvQE=
---
![Логотип](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![Количество установок](https://iobroker.live/badges/enpal-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/enpal-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для Enpal Solar
---

## Что делает этот адаптер
Считывает данные об энергопотреблении из локального экземпляра InfluxDB 2.x, предоставленного компанией Enpal Solar Systems, и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг производства солнечной энергии
- Отслеживание уровня заряда батареи (SoC)
- Анализ потребления электроэнергии из сети и выработки электроэнергии, подаваемой в сеть.
- Автоматизация на основе выработки электроэнергии
- Визуализация потоков энергии на панели управления ioBroker.
- При желании вы можете управлять настенным зарядным устройством Enpal (режим зарядки, запуск/остановка) через локальный веб-интерфейс Enpal Box.

## Функции
Адаптер подключается напрямую к **локальной базе данных InfluxDB**, в которую записывает данные устройство Enpal — облачная учетная запись или доступ в интернет не требуются.

- Автоматическое обнаружение всех измерений, устройств и полей, хранящихся в вашем хранилище InfluxDB.
- Динамическое создание состояния в рамках `enpal.0.<измерение>.<устройство>.<поле>`
- Настраиваемый интервал опроса (по умолчанию: 60 секунд)
— Статус подключения через `info.connection` — экземпляр адаптера становится красным, когда база данных недоступна.
- Дополнительное **управление настенным зарядным устройством** (режим зарядки, запуск/остановка) через веб-интерфейс Enpal Box Blazor — используется тот же хост, что и URL-адрес InfluxDB (порт 80)

## Точки данных
Точки данных создаются динамически на основе содержимого вашего хранилища InfluxDB. Структура соответствует следующему шаблону:

```
enpal.0.<measurement>.<device>.<field>
```

Типичные примеры (в зависимости от вашего инвертора и конфигурации Enpal):

- `enpal.0.solar.inverter.power` — Текущая мощность фотоэлектрической системы (Вт)
- `enpal.0.solar.inverter.energy` — Энергия, произведенная сегодня (Вт·ч)
- `enpal.0.battery.storage.soc` — Уровень заряда батареи (%)
- `enpal.0.grid.meter.power` — Мощность импорта/экспорта в сеть (Вт)
- `enpal.0.info.connection` — Статус подключения к InfluxDB

Фактические названия полей зависят от версии вашей системы Enpal и конфигурации оборудования.

### Управление настенным блоком (`wallbox_control`)
Когда в конфигурации адаптера включена функция **управления Wallbox**, создается фиксированный канал (независимо от автоматического обнаружения InfluxDB):

```
enpal.0.wallbox_control.<state>
```

| Состояние | Тип | Чтение | Запись | Описание |
|-------|------|------|-------|-------------|
| `start` | кнопка | нет | да | Начать зарядку (установите значение `true` для запуска) |
| `mode` | значение | да | да | Установить режим зарядки: `eco`, `solar`, `full` или `smart` |
| `currentMode` | текст | да | нет | Текущий режим зарядки, сообщаемый настенным зарядным устройством (например, `Eco`, `Solar`, `Full`) |
| `connectorStatus` | текст | да | нет | Состояние разъема OCPP от настенной коробки (см. [Значения состояния разъема](#connector-status-values)) |
| `automaticChargeStatus` | текст | да | нет | Автоматическая зарядка при подключении (`On` / `Off`; только для чтения, изменение через приложение Enpal) |
| `automaticChargeStatus` | текст | да | нет | Автоматическая зарядка при подключении к сети (`Вкл.` / `Выкл.`; только для чтения, изменить через приложение Enpal) |

**Как это работает**

- **Управление** (режим, запуск, остановка): Адаптер подключается к `http://<enpal-box>/wallbox` через Blazor SignalR (тот же подход, что и в [интеграции Enpal с Home Assistant](https://github.com/derolli1976/enpal)) и имитирует нажатия кнопок.
- **Статус** (`currentMode`, `connectorStatus`, `automaticChargeStatus`): Считывается со страницы Enpal Box `http://<enpal-box>/deviceMessages` (`Mode.Charge.Connector.1`, `Status.Wallbox.Connector.1`, `Wallbox.Settings.AutomaticChargeStatus.Connector.1`). Обновляется при каждом интервале синхронизации и после действий управления.

#### Значения состояния коннектора
`connectorStatus` сообщает о состоянии разъема [OCPP](https://www.openchargealliance.org/) от настенного блока Enpal/StarCharge. Значения нормализованы в соответствии с каноническим написанием (например, `SuspendedEV`, а не `Suspendedev`).

| Ценность | Смысл |
|-------|---------|
| `Available` | Без разъема, автомобиль не подключен |
| `Charging` | Активная зарядка — подача энергии |
| `SuspendedEV` | Зарядка автомобиля приостановлена (например, батарея полностью заряжена, ограничение BMS); автомобиль все еще подключен к зарядке |
| `SuspendedEVSE` | Настенный блок питания приостановил подачу электроэнергии (например, управление нагрузкой); транспортное средство по-прежнему подключено |
| `Finishing` | Сессия завершена, кабель все еще подключен или транспортное средство еще не перемещено |
| `Reserved` | Коннектор зарезервирован для будущей сессии |
| `Unavailable` | Временно недоступно (техническое обслуживание, отключено) |
| `Faulted` | Ошибка, сообщенная настенным устройством |
| `Connected` | Подключенное транспортное средство (специфично для Enpal; может отображаться вместо или перед другими состояниями) |
| `Подключено` | Транспортное средство подключено (специфично для Enpal; может отображаться вместо или перед другими состояниями) |

> **Примечание:** После полной зарядки вы часто будете видеть `SuspendedEV` — это нормально. Автомобиль перестал потреблять энергию; при необходимости отключите или возобновите зарядку.

**Требования**

- Прошивка Enpal Box **8.50+** (страница настенной приставки Blazor)
- Флажок управления настенным блоком включен в конфигурации адаптера.
— Хост ioBroker должен быть подключен к Enpal Box в локальной сети (тот же IP-адрес, что и у InfluxDB, HTTP-порт 80).

**Не поддерживается**

- Изменение автоматического списания средств с плагина через ioBroker (настройка остается только для чтения; для переключения используйте приложение Enpal).

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройте следующие параметры (вкладка **Настройки**):
- **URL InfluxDB**: Адрес вашей локальной базы данных InfluxDB (например, `http://192.168.1.100:8086`)
- **API-токен**: Ваш API-токен InfluxDB (достаточно доступа на чтение)
- **Идентификатор организации**: Ваша организация в InfluxDB
- **Корзина**: Корзина, в которую Enpal записывает данные (обычно `enpal` или аналогичное название).
- **Интервал обновления**: Интервал обновления данных в секундах (по умолчанию: `60`)
- **Управление Wallbox** (опционально): Включите эту опцию, чтобы создать состояния `wallbox_control` и разрешить режим зарядки / запуск / остановку через веб-интерфейс Enpal Box (дополнительный URL не требуется — хост берется из URL InfluxDB). При включении вкладка **Справка Wallbox** объясняет значения параметров, режимов зарядки и состояния разъема.
4. Сохраните и запустите экземпляр.

### Как найти свои учетные данные InfluxDB
1. Войдите в веб-интерфейс вашего устройства Enpal или подключитесь к нему через SSH.
2. Откройте пользовательский интерфейс InfluxDB по адресу `http://<enpal-box-ip>:8086`
3. Перейдите в **Данные → Токены API** и создайте токен только для чтения.
4. Запишите название организации и категорию данных в разделе **Данные → Категории**.

## Конфиденциальность и обработка данных
Этот адаптер подключается только к вашей **локальной базе данных InfluxDB** — данные не передаются ни в какие облачные сервисы.
— При включенном управлении настенным блоком адаптер также подключается к вашему **локальному блоку Enpal** (HTTP и WebSocket на том же хосте, что и InfluxDB) — доступ к облаку по-прежнему отсутствует.
— Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.
- Внешние серверы не подключаются

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.4.2 (2026-06-12)
- (skvarel) Fixed missing wallbox_help_readme translation in English and German admin UI
- (skvarel) Replaced plain timers in wallbox client with adapter-core setInterval, setTimeout and delay helpers
- (skvarel) Updated iobroker/types for js-controller 7.1 compatibility

### 0.4.1 (2026-06-10)
- (skvarel) Typed adapter and instance root namespaces as meta folders for a cleaner object tree

### 0.4.0 (2026-06-07)
- (skvarel) Added read-only wallbox state automaticChargeStatus (automatic charge on plug-in, from /deviceMessages)
- (skvarel) Fixed connectorStatus normalization for OCPP values (e.g. SuspendedEV instead of Suspendedev)
- (skvarel) Documented wallbox connector status values in README
- (skvarel) Added conditional wallbox help tab with data point and status documentation

### 0.3.0 (2026-06-07)
- (skvarel) Added optional wallbox control via Enpal Box web interface (Blazor SignalR)
- (skvarel) New config option: wallbox_enabled (checkbox); Enpal Box URL is derived automatically from InfluxDB URL
- (skvarel) New states under wallbox_control: start, stop, mode, currentMode, connectorStatus

### 0.2.2 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 to fix repository checker error E0036
- (skvarel) Updated @tsconfig/node22 to 22.0.5
- (skvarel) Fixed mixed indentation in admin/jsonConfig.json

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