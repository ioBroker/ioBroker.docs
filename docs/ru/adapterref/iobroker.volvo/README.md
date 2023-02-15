---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: KQNQQ/Rzgeeh5MCvgqbVVuW6Sf/ZXmF8cDEFXZYqaJc=
---
![Логотип](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.volvo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volvo.svg)
![Количество установок (последние)](http://iobroker.live/badges/volvo-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/volvo-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.volvo/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.volvo.png?downloads=true)

# IoBroker.volvo
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.volvo/workflows/Test%20and%20Release/badge.svg)

## Адаптер volvo для ioBroker
Volvo On Call и новый адаптер Electric API для Android Automotive Cars Adapter

## Вход для неэлектрических автомобилей
Автомобиль Non Eletric может войти в систему с помощью имени пользователя и пароля.

## Eletric Android Automotive Cars требуется ключ API VCC
Зарегистрируйтесь/Войдите в <https://developer.volvocars.com/account/>

Вам нужна учетная запись Google или Github, это не связано с вашими учетными данными приложения.

Создать приложение

Скопировать первичный ключ VCC API

![VCC APIKey](../../../en/adapterref/iobroker.volvo/vccapikey.png)

Вставьте ключ API в настройки экземпляра.

Введите имя пользователя и пароль приложения Volvoe.

## Управление Eletric Android
В настоящее время управление Eletric Android с помощью пульта volvo.0.id.remote невозможно. Команды успешно отправляются в API и принимаются, но похоже, что API не готов для управления автомобилем.

## Начиная
Используйте объекты под пультом дистанционного управления для управления транспортным средством

## Changelog

### 0.1.0

* (TA2k) add new api for electric cars
### 0.0.6

* (TA2k) fix trip object naming
  
### 0.0.5

* (TA2k) fix receiving data

### 0.0.4

* (TA2k) fix jscontroller
  
### 0.0.3

* (TA2k) fix preclimate

### 0.0.2

* (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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