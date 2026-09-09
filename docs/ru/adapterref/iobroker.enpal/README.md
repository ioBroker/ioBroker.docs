---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enpal/README.md
title: Адаптер ioBroker для Enpal Solar
hash: UEDnBkX44k8a83OVriSLWBXzMf815tvYa3IEimBRMT0=
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

## Для чего нужен этот адаптер?

Считывает данные об энергопотреблении из локального экземпляра InfluxDB 2.x, предоставленного компанией Enpal Solar Systems, и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг производства солнечной энергии
- Отслеживание уровня заряда батареи (SoC)
- Проанализируйте потребление электроэнергии из сети и подачу электроэнергии в сеть.
- Автоматизация на основе выработки электроэнергии
- Визуализация потоков энергии на панели управления ioBroker.
- При желании управлять настенным зарядным устройством Enpal (режим зарядки, запуск/остановка) можно через локальный веб-интерфейс Enpal Box.

## Функции

Адаптер подключается напрямую к **локальной базе данных InfluxDB** , в которую записывает данные устройство Enpal — облачная учетная запись или доступ в интернет не требуются.

- Автоматическое обнаружение всех измерений, устройств и полей, хранящихся в вашем хранилище InfluxDB.
- Динамическое создание состояния в рамках`enpal.0.<measurement>.<device>.<field>`
- Настраиваемый интервал опроса (по умолчанию: 60 секунд)
- статус соединения через`info.connection` — Экземпляр адаптера становится красным, когда база данных недоступна.
- Дополнительное **управление настенным зарядным устройством** (режим зарядки, запуск/остановка) через веб-интерфейс Enpal Box Blazor — используется тот же хост, что и URL-адрес InfluxDB (порт 80).

## Точки данных

Точки данных создаются динамически на основе содержимого вашего хранилища InfluxDB. Структура соответствует следующему шаблону:

```
enpal.0.<measurement>.<device>.<field>
```

Типичные примеры (в зависимости от вашего инвертора и конфигурации Enpal):

- `enpal.0.solar.inverter.power` — Текущая мощность фотоэлектрической системы (Вт)
- `enpal.0.solar.inverter.energy` — Энергия, произведенная сегодня (Вт·ч)
- `enpal.0.battery.storage.soc` — Уровень заряда батареи (%)
- `enpal.0.grid.meter.power` — Мощность импорта/экспорта из сети (Вт)
- `enpal.0.info.connection` — Статус подключения к InfluxDB

> Фактические названия полей зависят от версии вашей системы Enpal и конфигурации оборудования.

### Управление настенным блоком (`wallbox_control` )

Если в конфигурации адаптера включено **управление Wallbox** , создается фиксированный канал (независимо от автоматического обнаружения InfluxDB):

```
enpal.0.wallbox_control.<state>
```

| Состояние               | Тип    | Читать | Писать | Описание                                                                                                                                                        |
| ----------------------- | ------ | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`                 | кнопка | нет    | да     | Начать зарядку (установить на`true` (для запуска)                                                                                                               |
| `stop`                  | кнопка | нет    | да     | Остановить зарядку (установить значение)`true` (для запуска)                                                                                                    |
| `mode`                  | ценить | да     | да     | Управление режимом зарядки:`eco` ,`solar` ,`full` , или`smart` Также данные синхронизируются с настенной приставки при изменении режима через приложение Enpal. |
| `currentMode`           | текст  | да     | нет    | Текущий режим зарядки, отображаемый настенным зарядным устройством (например,`Eco` ,`Solar` ,`Full` )                                                           |
| `connectorStatus`       | текст  | да     | нет    | Состояние разъема OCPP на настенной коробке (см. [Значения состояния разъема](#connector-status-values) )                                                       |
| `automaticChargeStatus` | текст  | да     | нет    | Автоматическая зарядка при подключении к сети (`On` /`Off` (Только для чтения, изменить через приложение Enpal)                                                 |

**Как это работает**

- **Управление** (режим, запуск, остановка): Адаптер подключается к`http://<enpal-box>/wallbox` с помощью Blazor SignalR (тот же подход, что и [в интеграции Home Assistant Enpal](https://github.com/derolli1976/enpal) ) и имитирует нажатия кнопок.
- **Статус** (`currentMode` ,`connectorStatus` ,`automaticChargeStatus` ): Читайте со страницы Enpal Box`http://<enpal-box>/deviceMessages` (`Mode.Charge.Connector.1` ,`Status.Wallbox.Connector.1` ,`Wallbox.Settings.AutomaticChargeStatus.Connector.1` Обновляется при каждом интервале синхронизации и после управляющих действий. Доступно для записи.`mode` Состояние также обновляется (с помощью`ack: true` Таким образом, выпадающие списки VIS остаются синхронизированными при изменении режима вне ioBroker.

#### Значения состояния разъема

`connectorStatus` Сообщает о состоянии разъема [OCPP](https://www.openchargealliance.org/) от настенного зарядного устройства Enpal/StarCharge. Значения нормализованы в соответствии с каноническим написанием (например,`SuspendedEV` , нет`Suspendedev` ).

| Ценить          | Значение                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Available`     | Без разъемов, автомобиль не подключается.                                                                                                 |
| `Preparing`     | Автомобиль подключен, сессия еще не запущена (питание не подается).                                                                       |
| `Charging`      | Активная зарядка — подача электроэнергии                                                                                                  |
| `SuspendedEV`   | Зарядка автомобиля приостановлена (например, батарея полностью заряжена, превышен лимит BMS); автомобиль по-прежнему подключен к зарядке. |
| `SuspendedEVSE` | Настенный блок питания приостановил подачу электроэнергии (например, управление нагрузкой); автомобиль по-прежнему подключен.             |
| `Finishing`     | Сеанс завершился, кабель всё ещё подключен или транспортное средство ещё не сдвинулось с места.                                           |
| `Reserved`      | Коннектор зарезервирован для будущей сессии.                                                                                              |
| `Unavailable`   | Временно недоступно (техническое обслуживание, отключено)                                                                                 |
| `Faulted`       | Ошибка, о которой сообщило настенное устройство.                                                                                          |
| `Connected`     | Подключенное транспортное средство (специфично для Enpal; может отображаться вместо или перед другими состояниями)                        |

> **Примечание:** После полной зарядки вы часто увидите`SuspendedEV` — Это нормально. Автомобиль перестал потреблять энергию; при необходимости отключите или возобновите зарядку.

**Требования**

- Прошивка Enpal Box **8.50+** (страница для настенной приставки Blazor)
- Флажок управления настенным блоком включен в конфигурации адаптера.
- Хост ioBroker должен быть подключен к Enpal Box в локальной сети (тот же IP-адрес, что и у InfluxDB, HTTP-порт 80).

**Не поддерживается**

- Изменение автоматического списания средств с плагина через ioBroker (настройка остается только для чтения; для переключения используйте приложение Enpal).

## Установка

1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройте следующие параметры (вкладка « **Настройки»** ):
   - **URL InfluxDB** : Адрес вашей локальной базы данных InfluxDB (например,`http://192.168.1.100:8086` )
   - **API-токен** : Ваш API-токен InfluxDB (достаточно доступа на чтение)
   - **Идентификатор организации** : Ваша организация в InfluxDB
   - **Корзина** : Корзина, в которую Enpal записывает данные (обычно)`enpal` или аналогичное)
   - **Интервал обновления** : Интервал обновления данных в секундах (по умолчанию:`60` )
   - **Управление настенным боксом** (опционально): Включите для создания`wallbox_control` Позволяет задавать режимы зарядки, запускать и останавливать зарядку через веб-интерфейс Enpal Box (без дополнительного URL — хост берется из URL InfluxDB). При включении этой функции вкладка **справки Wallbox** объясняет значения параметров, режимов зарядки и состояния разъема.
4. Сохраните изменения и запустите экземпляр.

### Как найти свои учетные данные InfluxDB

1. Войдите в веб-интерфейс вашего устройства Enpal или подключитесь к нему через SSH.
2. Откройте пользовательский интерфейс InfluxDB по адресу:`http://<enpal-box-ip>:8086`
3. Перейдите в **раздел Данные → Токены API** и создайте токен только для чтения.
4. Обратите внимание на название организации и категорию данных в разделе **«Данные» → «Категории данных».**

## Конфиденциальность и обработка данных

- Этот адаптер подключается только к вашей **локальной базе данных InfluxDB** — данные не передаются ни в какие облачные сервисы.
- При включенном управлении настенным блоком адаптер также подключается к вашему **локальному устройству Enpal** (HTTP и WebSocket на том же хосте, что и InfluxDB) — доступ к облаку по-прежнему отсутствует.
- Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.
- Внешние серверы не подключаются.

## Более ранние изменения

- [CHANGELOG\_OLD.md](https://github.com/inventwo/ioBroker.enpal/blob/main/CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.4.3 (2026-07-21)
- (skvarel) Sync wallbox_control.mode from status when charge mode is changed via the Enpal app

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