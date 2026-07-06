---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.foxesscloud/README.md
title: Адаптер ioBroker для FoxESS Cloud
hash: NGU6JXedkBMtdUikAU5X0+04Q7QPIytB5IzX6ONtG7M=
---
![Логотип](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Количество установок](https://iobroker.live/badges/foxesscloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/foxesscloud-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для FoxESS Cloud
---

## Что делает этот адаптер
Получает данные из API FoxESS Cloud для солнечных инверторов (например, используемых в системах Enpal) и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг производства солнечной энергии
- Отслеживание уровня заряда батареи (SoC)
- Анализ потребления электроэнергии из сети и выработки электроэнергии, подаваемой в сеть.
- Автоматизация на основе выработки электроэнергии
- Визуализация потоков энергии на панелях мониторинга ioBroker.

## Функции
### Значения мощности
- **`pvPower`**: Текущая выработка электроэнергии солнечными батареями (кВт)
- **`generationPower`**: Общая мощность генерации/выходная мощность (кВт)
- **`нагрузка`**: Текущая нагрузка/потребляемая мощность (кВт)
- **`gridConsumption`**: Мощность, импортируемая из сети (кВт)
- **`feedinPower`**: Электроэнергия, экспортируемая в сеть (кВт)

### Батарея
- **`soc`**: Уровень заряда батареи (%)
- **`batCharge`**: Мощность зарядки аккумулятора (кВт)
- **`batDischarge`**: Мощность разряда батареи (кВт)

### Состояние подключения
- **`info.connection`**: Статус соединения в **1440 вызовах в день**. При интервале в 60 секунд этот лимит используется полностью (1440 минут = 24 часа).

## Точки данных
Адаптер создает следующие точки данных:

- `foxesscloud.0.pvPower` - Мощность фотоэлектрических панелей (кВт)
- `foxesscloud.0.pv1Power` - Мощность фотоэлектрической сети 1 (кВт)
- `foxesscloud.0.pv2Power` - Мощность фотоэлектрической сети 2 (кВт)
- `foxesscloud.0.generationPower` - Мощность/выход генерации (кВт)
- `foxesscloud.0.soc` - Уровень заряда батареи (%)
- `foxesscloud.0.load` - Мощность нагрузки (кВт)
- `foxesscloud.0.gridConsumption` - Потребление/импорт электроэнергии из сети (кВт)
- `foxesscloud.0.feedinPower` - Мощность, поступающая в сеть/экспорт (кВт)
- `foxesscloud.0.batCharge` - Мощность зарядки аккумулятора (кВт)
- `foxesscloud.0.batDischarge` - Мощность разряда батареи (кВт)
- `foxesscloud.0.batTemperature` - Температура батареи (°C)
- `foxesscloud.0.invTemperature` - Внутренняя температура инвертора (°C)
- `foxesscloud.0.runningState` - Состояние работы инвертора
- `foxesscloud.0.info.connection` - Состояние подключения

### Статистика потребления солнечной энергии в формате JSON (если включена)
- `foxesscloud.0.pvPowerJSON.daily` - Ежедневная статистика потребления энергии (формат JSON) - текущая неделя с понедельника по воскресенье
- `foxesscloud.0.pvPowerJSON.weekly` - Еженедельная статистика потребления энергии (в формате JSON) - за последние 4 недели, включая текущую неделю.
- `foxesscloud.0.pvPowerJSON.monthly` - Ежемесячная статистика потребления энергии (в формате JSON) - за все 12 месяцев, включая текущий месяц.

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройка:
- **API-токен**: Ваш API-ключ с портала FoxESS Cloud.
- **Серийный номер (SN)**: Серийный номер вашего инвертора.
- **Интервал обновления**: Интервал обновления данных в секундах (по умолчанию: 60, минимум: 60)
4. При желании можно включить сбор статистики PV Power в формате JSON:
- **Включить генерацию JSON-данных для солнечных электростанций**: Активировать генерацию JSON-таблиц для виджетов VIS.
- **Ежедневная статистика**: Формирование ежедневных данных об энергопотреблении за текущую неделю (понедельник-воскресенье).
- **Еженедельная статистика**: Формирование еженедельных данных об энергопотреблении (за последние 4 недели, включая текущую неделю).
- **Ежемесячная статистика**: Формирование ежемесячных данных об энергопотреблении (за все 12 месяцев, включая текущий месяц)
- **Цена за кВт·ч**: Необязательно - введите вашу цену за кВт·ч для расчета стоимости.
- **Начальное значение за сутки / неделю / месяц**: Дополнительные начальные значения кВт·ч для периодов работы, если адаптер включен после начала производства.
5. Сохраните и запустите экземпляр.

### Как получить учетные данные API
1. Войдите в [FoxESS Cloud](https://www.foxesscloud.com)
2. Перейдите в свой профиль/настройки.
3. Сгенерируйте ключ API (токен).
4. Найдите серийный номер вашего инвертора в списке устройств.

## Статистика потребления электроэнергии от фотоэлектрических систем в формате JSON для панелей мониторинга VIS
При включении в конфигурации адаптер генерирует таблицы JSON со статистикой энергопотребления, которые можно отображать в ioBroker VIS с помощью виджетов, таких как **inventwo JSON Widget**.

### Формат JSON
JSON-таблицы содержат данные об энергии со следующей структурой:

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **дата**: Название дня недели (локализованное), номер недели (KW XX) или название месяца.
- **Значение**: Выработанная энергия в кВт·ч (3 знака после запятой)
- **Цена**: Стоимость в евро (только если указана цена за кВтч, с двумя знаками после запятой)

### Сбор данных
- **Ежедневно**: Отображает текущую календарную неделю с понедельника по воскресенье и обновляет текущий день в режиме реального времени.
- **Еженедельно**: Накапливает данные за неделю (с понедельника по воскресенье), сохраняет данные за последние 4 недели и включает текущую неделю.
- **Ежемесячно**: Накапливает данные за месяц (с первого по последний день), сохраняет все 12 месяцев и включает текущий месяц.

Если адаптер включен во время работы производственного процесса, вы можете настроить дополнительные начальные значения для текущего дня, текущей недели и текущего месяца. Эти значения добавляются один раз в начале соответствующего периода работы.

Язык обозначений дат (названия дня/недели/месяца) автоматически адаптируется к системному языку вашего ioBroker:

- **Немецкий** (de): Монтаг, Динстаг, январь, февраль и т. д.
- **English** (en): Monday, Tuesday, Januar, Februar, etc.

### Использование с VIS
1. Включите генерацию JSON-данных о мощности фотоэлектрических систем в конфигурации адаптера.
2. Добавьте виджет JSON на панель мониторинга VIS.
3. Привяжите виджет к одному из следующих состояний:
- `foxesscloud.0.pvPowerJSON.daily` для ежедневной статистики
- `foxesscloud.0.pvPowerJSON.weekly` для еженедельной статистики
- `foxesscloud.0.pvPowerJSON.monthly` для ежемесячной статистики
4. Настройте виджет для отображения данных об энергопотреблении/ценах в табличном формате.

## Конфиденциальность и обработка данных
- Этот адаптер считывает данные только из **FoxESS Cloud API**, используя ваш персональный API-токен.
— Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-05-25)
- (skvarel) Replaced process.env and process.exit usage in tools/api-test.js to fix compatibility issues reported by ioBroker repository checker (E5049, E5050)
- (skvarel) Downgraded @types/node from ^25 to ^22 to match supported Node.js version (W0066)

### 0.5.0 (2026-05-23)
- (skvarel) Added PV Power JSON statistics (daily, weekly, monthly) for VIS widget integration with optional cost calculation per kWh

### 0.4.0 (2026-05-19)
- (skvarel) Added PV string 1 and string 2 power datapoints (pv1Power, pv2Power)
- (skvarel) Added battery temperature datapoint (batTemperature)
- (skvarel) Added inverter running state datapoint (runningState)

### 0.3.1 (2026-05-19)
- (skvarel) Adjusted real-time API parsing to keep the typecheck green without changing runtime behavior

### 0.3.0 (2026-05-19)
- (skvarel) Added inverter internal temperature datapoint in °C

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