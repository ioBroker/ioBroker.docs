---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.freeair/README.md
title: ioBroker.freeair
hash: njTVR5cc2TJdRqa1vV4a2OWtx3PeVh5s6mARD0hP5nQ=
---
![Логотип](../../../en/adapterref/iobroker.freeair/admin/freeair.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.freeair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.freeair.svg)
![Количество установок](https://iobroker.live/badges/freeair-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/freeair-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.freeair.png?downloads=true)

# IoBroker.freeair
![Веблейт](https://weblate.iobroker.net/widgets/adapters/-/freeair/svg-badge.svg)

**Тесты:** ![Тестирование и выпуск](https://github.com/Scrounger/ioBroker.freeair/workflows/Test%20and%20Release/badge.svg)

## Адаптер Freeair для ioBroker
подключение к вашей системе вентиляции [BluMartin FreeAir 100](https://blumartin.de/wohnraumlueftung-freeair-dezentral-mit-waermerueckgewinnung/)

## Настройки
### FreeAir 100
![информация об изображении](../../../en/adapterref/iobroker.freeair/doc/freeair_config.png)

— В разделе `bluHome` добавьте IP-адрес вашего ioBroker.

### Адаптер
![информация об изображении](../../../en/adapterref/iobroker.freeair/doc/adapter_config.png)

#### Настройки сервера
- Адрес адаптера: IP-адрес вашего ioBroker
- Порт: по умолчанию используется порт 80, поскольку устройства FreeAir 100 отправляют свои данные на порт 80.<br> **_ПРИМЕЧАНИЕ:_** Вы можете изменить порт, например, настроив правило DNAT в вашем шлюзе.
- Интервал проверки работоспособности: если в течение этого интервала данные не получены, устройства будут отображаться как находящиеся в автономном режиме.

#### Учетные данные устройств
- добавьте серийный номер ваших устройств FreeAir 100
- Добавьте пароль, который вы установили на своем устройстве FreeAir 100.

#### Черный/белый список точек данных
- внести данные в черный или белый список.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.8 (2026-03-17)

- (Scrounger) dependencies updated

### 1.0.7 (2026-03-09)

- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases #56
- (Scrounger) device error indicator bug fix

### 1.0.6 (2025-10-19)

- (Scrounger) auto translation bug fix
- (Scrounger) bug fixes

### 1.0.5 (2025-09-30)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.4 (2025-09-27)

- (Scrounger) bug fixes

### 1.0.3 (2025-09-21)

- (Scrounger) if only one devices is configured, show device online status as adapter status
- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.2 (2025-09-11)

- (Scrounger) automatic role assignment implemented
- (Scrounger) code optimizations
- (Scrounger) bug fixes

### 1.0.1 (2025-09-06)

- (Scrounger) bug fixes

### 1.0.0 (2025-09-03)

- (Scrounger) latest fun

### 1.0.0-beta.1 (2025-08-31)

- (Scrounger) i18n translation
- (Scrounger) dependencies updated

### 1.0.0-beta.0 (2025-08-31)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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