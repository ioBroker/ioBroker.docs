---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meater/README.md
title: ioBroker.meater
hash: 4ywg8L04c0K1aEpLqGWc3YiAkBJeMg0owCIxMMyhVMM=
---
![Логотип](../../../en/adapterref/iobroker.meater/admin/meater.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.meater.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meater.svg)
![Количество установок](https://iobroker.live/badges/meater-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/meater-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.meater.png?downloads=true)

# IoBroker.meater
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Standarduser/ioBroker.meater/workflows/Test%20and%20Release/badge.svg)

## Адаптер Meater для ioBroker
Этот адаптер подключает ваш беспроводной термометр для мяса MEATER к ioBroker.

Он извлекает данные из вашего зонда через облачный API MEATER. Вы можете настроить 2 интервала:

1. Интервал обновления, когда все датчики простаивают (не готовят)
2. Интервал обновления при запуске минимум 1 сеанса приготовления

## Предпосылки
Вам необходимо настроить облачную учетную запись MEATER (используйте приложение для смартфона) и активировать MEATER Link.

## Конфигурация
- `Имя пользователя для облака MEATER`: ваш зарегистрированный адрес электронной почты
- `Пароль для облака MEATER`: пароль, который вы использовали для доступа к облаку.
- `Язык`: некоторые (не все!) значения будут переведены, например. название мяса
- `Интервал обновления бездействия`: время в секундах, как часто данные из облака должны быть получены
- `Интервал обновления повара`: время в секундах, как часто данные из облака должны извлекаться, когда активна функция повара.
- «Единица измерения температуры»: используется для создания единицы измерения в состояниях ioBroker. Установите ту же единицу, которую вы используете в приложении. Если единица измерения изменена после создания состояний, удалите все состояния датчиков и перезапустите адаптер.
- «Очистить старые значения»: облачный API MEATER просто отправляет значения для активных зондов / запущенных сеансов приготовления. Если сеанс закончился, вы не получаете обновления температуры и статуса. Активируйте этот флажок, чтобы очистить старые значения, которые не были обновлены, во избежание недоразумений.

## Используйте адаптер
После настройки адаптера он автоматически войдет в облако MEATER и получит свои данные.

Если вы не видите никаких датчиков и/или значений, запустите сеанс приготовления и немного подождите. Возможно, вам придется нагреть датчик, чтобы получить какие-либо значения (горячая вода отлично подходит для тестирования).

## ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
MEATER® является товарным знаком Apption Labs™ Limited.
Этот адаптер использует [общедоступный API](https://github.com/apption-labs/meater-cloud-public-rest-api)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2023-01-14)

-   (Standarduser): improved: error handling if websever sent no response

### 0.2.0 (2022-12-15)

-   (Standarduser) added: State for manually trigger an update
-   (Standarduser) improved: description of errors
-   (Standarduser) fixed: Adapter stopped working if got an error from MEATER Cloud server (not API)

### 0.1.2 (2022-12-05)

-   (Standarduser) Improved error handling for fetch

### 0.1.0 (2022-12-04)

-   (Standarduser) Save password encrypted => please reenter password in adapter config
-   (Standarduser) Some minor improvements

### 0.1.0-alpha.0 (2022-11-21)

-   (Standarduser) First test release

## License

MIT License

Copyright (c) 2023 Standarduser

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
