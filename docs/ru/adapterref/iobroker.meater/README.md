---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meater/README.md
title: ioBroker.meater
hash: 0QY2CYMGDCchaoxExOHPm2dTsUJt0NIzyfz3F8LshT0=
---
![Логотип](../../../en/adapterref/iobroker.meater/admin/meater.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.meater.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meater.svg)
![Количество установок](https://iobroker.live/badges/meater-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/meater-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.meater.png?downloads=true)
![Тестирование и выпуск](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

# ioBroker.meater

## Адаптер Meater для ioBroker

Этот адаптер позволяет интегрировать ваш беспроводной термометр для мяса MEATER с ioBroker.

Он получает данные с вашего зонда через API облака MEATER. Вы можете настроить 2 интервала:

1. Интервал обновления, когда все датчики находятся в режиме ожидания (не готовят пищу).
2. Интервал обновления устанавливается при запуске как минимум одной сессии приготовления пищи.

## Предварительные требования

Вам необходимо создать облачную учетную запись MEATER (используйте приложение для смартфона) и активировать MEATER Link.

## Конфигурация

- `Username for MEATER cloud` : ваш зарегистрированный адрес электронной почты
- `Password for MEATER cloud` : пароль, который вы использовали для доступа к облаку
- `Language` Некоторые (но не все!) значения будут переведены, например, название мяса.
- `Update interval idle` : время в секундах, как часто следует получать данные из облака
- `Update interval cook` : время в секундах. Как часто следует получать данные из облака, когда активен Cook Sension?
- `Temperature unit` Используется для создания единиц измерения в состояниях ioBroker. Установите ту же единицу измерения, что и в приложении. Если единица измерения изменится после создания состояний, удалите все состояния зондирования и перезапустите адаптер.
- `Clear old values` API облака MEATER отправляет только значения активных датчиков/запущенных сеансов приготовления пищи. Если сеанс завершился, вы не получаете обновлений температуры и статуса. Активируйте этот флажок, чтобы очистить старые значения, которые не были обновлены, во избежание недоразумений.

## Используйте адаптер

После настройки адаптер автоматически подключится к облаку MEATER и получит доступ к данным.

Если вы не видите показания датчика и/или значения, начните готовить и подождите немного. Возможно, вам придется нагреть датчик, чтобы получить какие-либо значения (горячая вода хорошо подходит для проверки).

## ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ

MEATER® — товарный знак компании Apption Labs™ Limited. Данный адаптер использует [общедоступный API.](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2026-01-02)

-   Fixed issues of Adapter checker
-   updated depencies and devDepencies

### 1.1.1 (2024-07-08)

-   Fixed some messages of Adapter checker
-   Updated depencies
-   Detailed error message

### 1.1.0 (2024-04-25)

-   Tried to fix restart loop at the end of cooking
-   Dropped node v16 support

### 1.0.2 (2023-09-08)

-   Updated depencies
-   Dropped node v14 support

### 1.0.0 (2023-05-12)

-   First stable release

## License

MIT License

Copyright (c) 2024-2026 Standarduser

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