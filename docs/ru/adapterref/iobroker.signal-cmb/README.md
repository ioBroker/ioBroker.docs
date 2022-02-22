---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: z8ko8/wZBLuqpA4NrhvLfQJ/89LtGyxY9JDC6wI4g4c=
---
![Логотип](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.signal-cmb.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.signal-cmb/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.signal-cmb/master.svg)

# IoBroker.signal-cmb
-->

-->

**Тесты**: [![Тестирование и выпуск] (https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## Адаптер signal-cmb для ioBroker
Большое спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-signal-send-messages/), этот адаптер позволяет отправлять сообщения Signal на себя или на другой номер.

**Примечание** : *Бесплатный API предназначен только для личного использования!*

### Конфигурация
*Следующая документация была скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-signal-send-messages/).*

Вам необходимо получить ключ API от бота перед использованием API:

- Добавьте номер телефона **+34 603 21 25 97** в свои телефонные контакты. (Назовите его как хотите.)
- Отправьте это сообщение «Я разрешаю callmebot отправлять мне сообщения» (на английском языке) новому созданному контакту (конечно, используя Signal).
- Подождите, пока вы не получите сообщение `API активирован для вашего номера телефона. Ваш APIKEY 123123` от бота. Поскольку это все еще находится в стадии бета-тестирования, активация может занять до 2 минут.
- Сигнальное сообщение от бота будет содержать ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать API KEY в конфигурации ioBroker.

Пример: ![Пример](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

### Применение
Есть две возможности отправить сообщение:

- через `signal-cmb.0.sendMessage`. Просто напишите текст в этом состоянии, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоге настроек.
- через сообщение от javascript-адаптера:

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блочный](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

## **РАБОТА В ПРОЦЕССЕ**
* Сделал некоторые изменения
* Сделал еще несколько изменений

-->

### 0.1.7 (16.02.22)
* (derAlff) Изменение версии для NPM

### 0.1.6 (22 января 2022 г.)
* (derAlff) Выпущено на npm
* (derAlff) Обновлен README.md
* (derAlff) Переведено desc в io-package.json
* (derAlff) Изменен тип соединения на облако
* (derAlff) Изменена родная часть

### 0.1.5 (22 января 2022 г.)
* (derAlff) Исправлена проблема с Blockly

### 0.1.4 (2022-01-22)
* (derAlff) Обновлены файлы io-package.json и package.json.
* (derAlff) Добавлено «messagebox»: true для io-package.json.
* (derAlff) Изменен номер телефона в админке.

### 0.1.3 (2022-01-21)
* (derAlff) Обновлены файлы README.md, io-package.json и package.json.

### 0.1.0
* (derAlff) Протестирована и запущена версия 0.1.0.

### 0.0.1 (21 января 2022 г.)
* (derAlff) Первоначальный выпуск.

## Сделать
* Добавить телефонную книгу
* Добавить несколько пользователей (номера телефонов и API-ключи)

## Changelog
<!--
Placeholder for the next version (at the beginning of the line):

## License
MIT License

Copyright (c) 2022 derAlff <derAlff@gmail.com>

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