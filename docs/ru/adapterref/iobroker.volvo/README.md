---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: ogikgBRX+HhwKNH0ZUMAQu4yHaTSBYC5/ieF9/u8AkU=
---
![Логотип](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.volvo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volvo.svg)
![Количество установок (последних)](http://iobroker.live/badges/volvo-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/volvo-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.volvo/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.volvo.png?downloads=true)

# IoBroker.volvo
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.volvo/workflows/Test%20and%20Release/badge.svg)

## Адаптер Volvo для ioBroker
Volvo On Call и новый электрический API для автомобильного автомобильного адаптера Android

## Вход для неэлектрических автомобилей
В неэлектрический автомобиль можно войти, используя имя пользователя и пароль.

## Автомобильным автомобилям Eletric Android требуется ключ API VCC
Зарегистрируйтесь/войдите в <https://developer.volvocars.com/account/>

Вам нужна учетная запись Google или Github, она не связана с вашими учетными данными приложения.

Создать заявку

Скопировать основной ключ API VCC

![API-ключ VCC](../../../en/adapterref/iobroker.volvo/vccapikey.png)

Вставьте ключ API в настройки экземпляра.

Введите имя пользователя и пароль приложения Volvoe.

## Управление Eletric Android
Управление Eletric Android с помощью volvo.0.id.remote в настоящее время невозможно. Команды успешно отправляются в API и принимаются, но похоже, что API не является полным для управления автомобилем.

## Начиная
Используйте объекты под дистанционным управлением для управления автомобилем

## Changelog
### 0.1.2 (2024-05-02)

- added support for v2 api

### 0.1.1

- added location api information

### 0.1.0

- (TA2k) add new api for electric cars

### 0.0.6

- (TA2k) fix trip object naming

### 0.0.5

- (TA2k) fix receiving data

### 0.0.4

- (TA2k) fix jscontroller

### 0.0.3

- (TA2k) fix preclimate

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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