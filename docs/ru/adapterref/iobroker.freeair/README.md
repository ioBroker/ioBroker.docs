---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.freeair/README.md
title: ioBroker.freeair
hash: 071HoZn58gexhUgL6j0Qf1IiGB9GHN+qih2FWHUiBS8=
---
![Логотип](../../../en/adapterref/iobroker.freeair/admin/freeair.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.freeair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.freeair.svg)
![Количество установок](https://iobroker.live/badges/freeair-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/freeair-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.freeair.png?downloads=true)

# IoBroker.freeair
**Тесты:** ![Тестирование и выпуск](https://github.com/Scrounger/ioBroker.freeair/workflows/Test%20and%20Release/badge.svg)

## Бесплатный адаптер для ioBroker
локальное подключение к вашей [BluMartin FreeAir 100](https://blumartin.de/wohnraumlueftung-freeair-dezentral-mit-waermerueckgewinnung/) системе вентиляции

## Настройки
### FreeAir 100
![информация об изображении](../../../en/adapterref/iobroker.freeair/doc/freeair_config.png)

- в разделе `bluHome` добавьте IP-адрес вашего ioBroker

### Адаптер
![информация об изображении](../../../en/adapterref/iobroker.freeair/doc/adapter_config.png)

#### Настройки сервера
- Адрес адаптера: IP-адрес вашего ioBroker
- Порт: порт по умолчанию — 80, поскольку устройства FreeAir 100 отправляют данные на порт 80.<br> **_ПРИМЕЧАНИЕ:_** Вы можете изменить порт, например, настроив правило DNAT в своем шлюзе.
- интервал проверки активности: если в течение этого интервала данные не получены, устройства будут отображаться как отключенные

#### Учетные данные устройств
- добавьте серийный номер ваших устройств FreeAir 100
- добавьте пароль, который вы установили на своем устройстве FreeAir 100

#### Черный / белый список точек данных
- черный или белый список точек данных.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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