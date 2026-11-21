---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mg-saic/README.md
title: ioBroker MG/SAIC
hash: JbGEdB75jW8iPcscAwyobGX7L1qsM56WuVOJbO6btNo=
---
# ioBroker MG/SAIC

![Версия NPM](https://img.shields.io/npm/v/iobroker.mg-saic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mg-saic.svg)

<img src="admin/MG.png" alt="MG" width="314">

Данный адаптер предназначен для подключения автомобилей MG и SAIC к ioBroker через облачный сервис iSmart. Он не связан с компаниями MG, SAIC или iSmart и не поддерживается ими.

Информацию о производителях можно найти на сайтах [MG Motor](https://www.mgmotor.eu/) и [SAIC Motor](https://www.saicmotor.com/) .

## Настраивать

### Прежде чем начать

- Требуется Node.js версии 22.22.2 или более поздней.
- Требуется ioBroker js-controller версии 7.2.2 или более поздней.
- Требуется ioBroker Admin версии 8.2.0 или более поздней.
- Используйте учетную запись iSmart, имеющую доступ к автомобилю. Рекомендуется использовать отдельную учетную запись, совместно используемую с автомобилем, чтобы избежать помех для работы мобильного приложения.
- Подготовьте пароль от учетной записи. Адаптер сохраняет его как защищенную настройку.
- Выберите регион для учетной записи. Доступные регионы: Европейский Союз, Китай, Австралия, Бразилия, Израиль, Турция, Таиланд и остальной мир. Индия не поддерживается.

### Настройте адаптер

1. Установите адаптер и создайте экземпляр в административной панели ioBroker.
2. Выберите регион учетной записи и тип входа (адрес электронной почты или номер телефона).
3. Введите адрес электронной почты или номер телефона учетной записи и пароль. Для входа по телефону также введите код страны, по которой был открыт телефонный номер.
4. Установите интервал опроса состояния на 60 секунд или более. Значение по умолчанию — 1800 секунд.
5. Сохраните настройки и запустите экземпляр. Доступные для учетной записи транспортные средства отобразятся в разделе `vehicles.<VIN>` Существующие идентификаторы объектов транспортных средств используются повторно, если облачный API изменяет регистр VIN-кода. Метки устройств используют локализованное общее название транспортного средства; VIN, марка, модель и другие доступные метаданные транспортного средства предоставляются в виде состояний только для чтения.

## Функции

- Подключает ioBroker к облачному сервису iSmart и получает информацию о состоянии автомобиля.
- Предоставляет дистанционное управление поддерживаемыми функциями автомобиля.
- Поддерживает функции климат-контроля, отопления и зарядки, если они доступны в данном автомобиле.
- Исключает нераспознанный текст свободной формы, относящийся к зарядке, сохраняя при этом числовые измерения и проверенные идентификаторы зарядных станций.

## Установка

Адаптер опубликован на npm и доступен в репозитории Latest adapter на ioBroker.

## Поддерживать

[![Пожертвовать](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
### 0.1.4 (2026-11-11)

- (Voodoo2man) Corrected command-response validation, status values, charging-field handling, vehicle ID reuse, and cloud polling intervals; removed the non-informative vehicle name state.

### 0.1.3 (2026-11-08)

- (Voodoo2man) Retry startup initialization after temporary cloud login and vehicle-list outages with bounded backoff, prevent false setting writes from triggering remote setting actions, and add the missing region labels in the Admin UI.

### 0.1.2 (2026-11-08)

- (Voodoo2man) Prevented unsafe or case-colliding API fields and vehicle IDs from creating duplicate datapoints, kept status IDs stable across field-casing changes, scheduled polling after each completed cycle while honoring queued manual refreshes, and removed an unused cloud-backend translation.
- (Voodoo2man) Replaced untrusted cloud error text with English code-based diagnostics and standardized the product title as MG/SAIC across locales.
- (Voodoo2man) Reused dynamic charging datapoints across field-name casing changes and normalized known status fields.

### 0.1.1 (2026-11-07)

- (Voodoo2man) Lowered the minimum Node.js requirement to 22.22.2.
- (Voodoo2man) Improved charging datapoint labels and units, enforced safe polling interval limits, and added manufacturer references.

### 0.1.0 (2026-11-01)

- (Voodoo2man) Reported real-time charging power in kW using the pack current and voltage.
- (Voodoo2man) Applied confirmed profile-specific charging conversions.
- (Voodoo2man) Calculated available battery energy from battery level and usable capacity.

Older changelog entries are available in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Voodoo2man Voodoo2man@outlook.de

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