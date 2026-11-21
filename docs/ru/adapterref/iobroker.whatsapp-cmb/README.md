---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: p1uoOf8Ped3iQt9DWuJEsFehO449X+1sww2jj/JWI5I=
---
![Логотип](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Количество установок](https://iobroker.live/badges/whatsapp-cmb-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.whatsapp-cmb/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/whatsapp-cmb/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)

# ioBroker.whatsapp-cmb

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## адаптер whatsapp-cmb для ioBroker

Огромное спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) , этот адаптер позволяет отправлять сообщения WhatsApp себе или на другой номер.

**Примечание** : _Бесплатный API предназначен только для личного использования!_

### Конфигурация

_Приведенная ниже документация скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) ._

Перед использованием API необходимо получить ключ API от бота:

- Добавьте номер телефона XXXX (актуальный номер можно найти на странице CallMeBot) в свои телефонные контакты. (Назовите его по своему усмотрению.)
- Отправить это сообщение `I allow callmebot to send me messages` (на английском языке) новому созданному контакту (разумеется, через WhatsApp).
- Подождите, пока не получите сообщение. `API Activated for your phone number. Your APIKEY is 123123` от бота. Поскольку это все еще находится на стадии бета-тестирования, активация может занять до 2 минут.
- В сообщении WhatsApp от бота будет содержаться ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать ключ API в конфигурации ioBroker.

Пример:![Пример](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Использование

Существует два способа отправки сообщений:

- с помощью `whatsapp-cmb.0.sendMessage` Просто введите какой-нибудь текст в это поле, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоговом окне настроек.
- через сообщение от JavaScript-адаптера:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

`sendTo('whatsapp-cmb.0', 'help', {})` ответы `{ help, commands }`: описание всех сообщений с их параметрами для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов, а также список всех команд с `write` (имеет ли команда какое-либо действие, например, отправляет ли сообщение).

![Blockly](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

Если вы хотите отправлять эмодзи, пожалуйста, обратитесь к ссылке <https://www.callmebot.com/uncategorized/how-to-use-emoticos-with-the-api/>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.1.0 (2026-11-19)
- (bluefox) Added the message `help`: a description of all messages for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 1.0.0 (2026-10-13)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (bluefox) The adapter was refactored to TypeScript and JsonConfig
- (bluefox) Breaking: Node.js >= 22.19, js-controller >= 6.0.11 and admin >= 7.0.0 are required now
- (bluefox) Replaced the deprecated `request` package with `axios`
- (bluefox) The Blockly block was migrated to TypeScript and works again with the current Blockly editor
- (bluefox) Blockly: an empty message no longer breaks the script, the log shows the phone number value

### 0.3.0 (2024-05-25)
* Important: Node.js 18 and js-controller 5.0.19 is required at least
* (Sneak-L8) Treats all response codes other than 200 as errors

### 0.2.3 (2022-08-29)
* (Apollon77) Refer to website for current phone number

### 0.2.2 (2022-03-27)
* (Apollon77) Fix message encoding

## License
MIT License

Copyright (c) 2020-2026 Bluefox <dogafox@gmail.com>

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