---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.valloxmv/README.md
title: нет названия
hash: /KlW44vUuW6HwukABQM0FnDr1Hfo0C9q6ARHvBvzjzk=
---
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/valloxmv-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.valloxmv.svg)
![Количество установок](https://iobroker.live/badges/valloxmv-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![Известные уязвимости](https://snyk.io/test/github/hacki11/ioBroker.valloxmv/badge.svg)
![Статус зависимости](https://img.shields.io/david/hacki11/iobroker.valloxmv.svg)
![НПМ](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/hacki11/ioBroker.valloxmv/master.svg)

<h1><img src="admin/valloxmv.png" width="64"/>ioBroker.valloxmv</h1>

![Тест и выпуск](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

## Адаптер ValloxMV для ioBroker
Подключает вашу систему вентиляции Vallox к системе домашней автоматизации ioBroker.

## Использование
* Установить адаптер
* Настройте адрес устройства и интервал опроса (минимум 60)
* Чтение и запись состояний как обычно

## 1.4.0
* Техническая версия
* Повышение версии движков до NodeJS 20 как минимальной

## 1.3.0
* Техническая версия
* Обновлены зависимости (iobroker-core и node)
* Изменение пользовательского интерфейса на jsconConfig и исправление проблем, обнаруженных средством проверки репозитория
* Обновление перевода с использованием i18n от iobroker/adapter-dev
* Обновите год в лицензии и файле readme

### 1.2.0
* Удалить поддержку NodeJS 10.x
* Обновление до js-controller 3.3 и Admin 5

### 1.1.3
* Исправлен неверный тип данных (число вместо логического значения) в записях профиля *_ENABLED [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33).
* Исправлена настройка информации о подключении без значения ack.

### 1.1.2
* Исправлен неверный тип данных (строка) в температурных состояниях вместо чисел

### 1.1.1
* Исправление проблем с проверкой адаптера

### 1.1.0
* Добавлен A_CYC_BYPASS_LOCKED
* Добавлен A_CYC_SUPP_FAN_BALANCE_BASE
* Добавлен A_CYC_EXTR_FAN_BALANCE_BASE
* Добавлен A_CYC_IP_ADDRESS
* A_CYC_CELL_STATE изменен на «только для чтения»

### 1.0.3
* Исправление проблем с проверкой адаптера

### 1.0.2
* Добавлены подписки собственных объектов для возможности записи значений

### 1.0.1
* Исправлен сброс пользовательской конфигурации объектов
* Удалена подписка на собственные объекты

### 1.0.0
* Исправлены пустые состояния
* Изменены логические состояния на переключатели

### 0.1.3
* добавлены экспертные настройки (@williandalton, @hliebscher)
* A_CYC_RH_BASIC_LEVEL
* A_CYC_CO2_THRESHOLD
* A_CYC_RH_LEVEL_MODE
* A_CYC_SUPPLY_HEATING_ADJUST_MODE
* A_CYC_OPT_TEMP_SENSOR_MODE

### 0.1.2
* добавить состояние «NORMAL» в A_CYC_MODE (@williandalton)

### 0.1.1
* исправлен номер версии io-package.json

### 0.1.0
* добавлено переключение и редактирование профиля

### 0.0.1
* (hacki11) начальный релиз

## Changelog

## License
MIT License

Copyright (c) 2025 hacki11