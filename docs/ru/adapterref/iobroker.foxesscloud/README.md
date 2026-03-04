---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.foxesscloud/README.md
title: без названия
hash: RqMV8EnSC6IFUOtQBbkiYdIvCJmEOg0WY/uNku/rb7E=
---
![Логотип](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Количество установок](https://iobroker.live/badges/foxesscloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/foxesscloud-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Адаптер ioBroker для FoxESS Cloud
## Что делает этот адаптер
Получает данные в реальном времени из API FoxESS Cloud для солнечных инверторов (например, используемых в системах Enpal) и предоставляет доступ к состояниям ioBroker для домашней автоматизации:

- Мониторинг выработки солнечной энергии в режиме реального времени.
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
- `foxesscloud.0.generationPower` - Мощность/выход генерации (кВт)
- `foxesscloud.0.soc` - Уровень заряда батареи (%)
- `foxesscloud.0.load` - Мощность нагрузки (кВт)
- `foxesscloud.0.gridConsumption` - Потребление/импорт электроэнергии из сети (кВт)
- `foxesscloud.0.feedinPower` - Мощность, поступающая в сеть/экспорт (кВт)
- `foxesscloud.0.batCharge` - Мощность зарядки аккумулятора (кВт)
- `foxesscloud.0.batDischarge` - Мощность разряда батареи (кВт)
- `foxesscloud.0.info.connection` - Состояние подключения

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройка:
- **API-токен**: Ваш API-ключ с портала FoxESS Cloud.
- **Серийный номер (SN)**: Серийный номер вашего инвертора.
- **Интервал обновления**: Интервал обновления данных в секундах (по умолчанию: 60, минимум: 60)
4. Сохраните и запустите экземпляр.

### Как получить учетные данные API
1. Войдите в [FoxESS Cloud](https://www.foxesscloud.com)
2. Перейдите в свой профиль/настройки.
3. Сгенерируйте ключ API (токен).
4. Найдите серийный номер вашего инвертора в списке устройств.

## Конфиденциальность и обработка данных
- Этот адаптер считывает данные только из **FoxESS Cloud API**, используя ваш персональный API-токен.
— Ваш API-токен хранится в зашифрованном виде в базе данных ioBroker.

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-02-28)
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.6 (2026-02-01)
- (skvarel) Improved: Use node: prefix for core modules and adapter timer wrappers for better compatibility
- (skvarel) Fixed: Added .env.example to .gitignore

### 0.1.5 (2026-01-31)
- (skvarel) Improved: Removed unnecessary devDependencies (eslint, should, dotenv) to follow ioBroker best practices.
- (skvarel) Improved: Updated test scripts to use standard mocha command instead of hardcoded paths.
- (skvarel) Improved: Switched Node.js core module imports to node:xxx format where applicable.
- (skvarel) Improved: Enforced minimum and maximum interval limits for data polling to comply with Node.js timer restrictions.
- (skvarel) Improved: Code formatting and configuration files updated for consistency with ioBroker standards.
- (skvarel) Fixed: Addressed review feedback for ioBroker latest repository inclusion.
- (skvarel) Added: Full multi-language support for all state names (EN, DE, RU, PT, NL, FR, IT, ES, PL, UK, ZH-CN).

### 0.1.2 (2026-01-23)
- (skvarel) Fix .vscode/settings.json

### 0.1.1 (2026-01-23)
- (skvarel) Remove mocha from devDependencies (included in @iobroker/testing)
- (skvarel) Add .vscode/settings.json with JSON schema definitions

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