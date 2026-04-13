---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enpal/README.md
title: без названия
hash: vKO+Q2VLzuldwLkkQcycfuE09hl4BBMfd8Wbup5+i+A=
---
![Логотип](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![Количество установок](https://iobroker.live/badges/enpal-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/enpal-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Адаптер ioBroker для Enpal Solar
## Что делает этот адаптер
Считывает данные об энергопотреблении из локального экземпляра InfluxDB 2.x, предоставленного компанией Enpal Solar Systems, и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг производства солнечной энергии
- Отслеживание уровня заряда батареи (SoC)
- Анализ потребления электроэнергии из сети и выработки электроэнергии, подаваемой в сеть.
- Автоматизация на основе выработки электроэнергии
- Визуализация потоков энергии на панели управления ioBroker.

## Функции
Адаптер подключается напрямую к **локальной базе данных InfluxDB**, в которую записывает данные устройство Enpal — облачная учетная запись или доступ в интернет не требуются.

- Автоматическое обнаружение всех измерений, устройств и полей, хранящихся в вашем хранилище InfluxDB.
- Динамическое создание состояния в рамках `enpal.0.<измерение>.<устройство>.<поле>`
- Настраиваемый интервал опроса (по умолчанию: 60 секунд)
— Статус подключения через `info.connection` — экземпляр адаптера становится красным, когда база данных недоступна.

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

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройте следующие параметры:
- **URL InfluxDB**: Адрес вашей локальной базы данных InfluxDB (например, `http://192.168.1.100:8086`)
- **API-токен**: Ваш API-токен InfluxDB (достаточно доступа на чтение)
- **Идентификатор организации**: Ваша организация в InfluxDB
- **Корзина**: Корзина, в которую Enpal записывает данные (обычно `enpal` или аналогичное название).
- **Интервал обновления**: Интервал обновления данных в секундах (по умолчанию: `60`)
4. Сохраните и запустите экземпляр.

### Как найти свои учетные данные InfluxDB
1. Войдите в веб-интерфейс вашего устройства Enpal или подключитесь к нему через SSH.
2. Откройте пользовательский интерфейс InfluxDB по адресу `http://<enpal-box-ip>:8086`
3. Перейдите в **Данные → Токены API** и создайте токен только для чтения.
4. Запишите название организации и категорию данных в разделе **Данные → Категории**.

## Конфиденциальность и обработка данных
Этот адаптер подключается только к вашей **локальной базе данных InfluxDB** — данные не передаются ни в какие облачные сервисы.
— Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.
- Внешние серверы не подключаются

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-04-06)
- (skvarel) Updated minimum Node.js version requirement to >=22
- (skvarel) Normalize unit display: "Percent" is now shown as "%"

### 0.1.10 (2026-04-04)
- (skvarel) Fix prettier formatting in main.js

### 0.1.9 (2026-04-04)
- (skvarel) Update node version to 24.x for check-and-lint workflow

### 0.1.8 (2026-04-04)
- (skvarel) Fixed display of unit "None" in data points - now hidden for cleaner UI

### 0.1.7 (2026-04-04)
- (skvarel) Title and description edited

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