---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: LHnIXugR0ViDdnOn37lsQHe2qfEJTfgjn9q6qa9LyC4=
---
![Логотип](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![НПМ](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)
![Тестирование и выпуск](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.signal-cmb

## адаптер signal-cmb для ioBroker

Огромное спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-signal-send-messages/) , этот адаптер позволяет отправлять сообщения Signal себе или на другой номер.

**Примечание** : _Бесплатный API предназначен только для личного использования!_

### Конфигурация

_Приведенная ниже документация скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-signal-send-messages/) ._

Перед использованием API необходимо получить ключ API от бота:

- Добавьте номер телефона CallMeBot в свои телефонные контакты (назовите его как хотите). Сам номер телефона можно найти здесь: <https://www.callmebot.com/blog/free-api-signal-send-messages/>
- Отправить это сообщение`I allow callmebot to send me messages` (на английском языке) новому созданному контакту (разумеется, с помощью Signal).<br> Если вы получили GUID внутри «тестовой ссылки», вы можете использовать этот GUID вместо своего номера телефона в адаптере. Вы также можете отправить<br> сообщение`I allow callmebot to send me messages` Опять же. Обычно теперь вы должны видеть свой номер телефона внутри ссылки, и вы можете использовать свой номер телефона в адаптере.
- Подождите, пока не получите сообщение.`API Activated for your phone number. Your APIKEY is 123123` от бота. Поскольку это все еще находится на стадии бета-тестирования, активация может занять до 2 минут.
- Сообщение Signal от бота будет содержать ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать ключ API в конфигурации ioBroker.

Пример:![Пример](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

### Использование

Существует два способа отправки сообщений: ВНИМАНИЕ! Было замечено, что при отправке нескольких сообщений в течение одной секунды CallMeBot блокирует пользователя на 15 минут. Поэтому необходимо обеспечить отправку только одного сообщения в секунду.

- с помощью`signal-cmb.0.sendMessage` Просто введите какой-нибудь текст в это поле, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоговом окне настроек.
- через сообщение от JavaScript-адаптера:

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блокли](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

### Эмодзи

Чтобы отправить эмодзи, необходимо добавить в сообщение несколько **«кодов»** . Все доступные коды можно найти здесь: <https://www.callmebot.com/uncategorized/list-of-urlencoded-unicode-emoticons-emojis/>

### Доступные эмодзи

CallMeBot официально поддерживает следующие эмодзи:

| Код          | Эмодзи                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------- |
| %F0%9F%98%80 | ![ухмыляясь](../../../en/adapterref/iobroker.signal-cmb/img/emojies/01_grinning.png)                                                     |
| %F0%9F%98%83 | ![широко улыбающиеся глаза](../../../en/adapterref/iobroker.signal-cmb/img/emojies/02_grinning_big_eyes.png)                             |
| %F0%9F%98%84 | ![улыбающиеся глаза](../../../en/adapterref/iobroker.signal-cmb/img/emojies/03_grinning_smiling_eyes.png)                                |
| %F0%9F%98%81 | ![сияющие улыбающиеся глаза](../../../en/adapterref/iobroker.signal-cmb/img/emojies/04_beaming_smiling_eyes.png)                         |
| %F0%9F%98%86 | ![ухмыляющееся лицо, брызгающее жидкостью](../../../en/adapterref/iobroker.signal-cmb/img/emojies/05_grinning_squinting_face.png)        |
| %F0%9F%98%85 | ![ухмыляющийся севат](../../../en/adapterref/iobroker.signal-cmb/img/emojies/06_grinning_sweat.png)                                      |
| %F0%9F%A4%A3 | ![кататься по полу от смеха](../../../en/adapterref/iobroker.signal-cmb/img/emojies/07_rolling_on_the_floor_laughing.png)                |
| %F0%9F%A4%A3 | ![лицо, залитое слезами радости](../../../en/adapterref/iobroker.signal-cmb/img/emojies/08_face_with_tears_of_joy.png)                   |
| %F0%9F%98%82 | ![слегка улыбающееся лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/09_slightly_smiling_face.png)                          |
| %F0%9F%99%82 | ![перевернутое лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/10_upside_down_face.png)                                     |
| %F0%9F%98%89 | ![подмигивающее лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/11_winking_face.png)                                        |
| %F0%9F%98%8A | ![улыбающееся лицо с улыбающимися глазами](../../../en/adapterref/iobroker.signal-cmb/img/emojies/12_smiling_face_with_smiling_eyes.png) |
| %F0%9F%98%87 | ![Улыбающееся лицо с нимбом](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)                       |

#### Используйте эмодзи

Чтобы использовать эмодзи, нужно вставить его код в текст, который вы хотите отправить.

![Вставьте смайлик](../../../en/adapterref/iobroker.signal-cmb/img/add_emojies.png)

Адаптер **signal-cmb** закодирует этот код в URL-адресе, и вы увидите эмодзи в мессенджере Signal на своем телефоне.

![Emojie Signal Messenger](../../../en/adapterref/iobroker.signal-cmb/img/emojie_signal_mesenger.png)

## **РАБОТА В ПРОЦЕССЕ**

- Внесены некоторые изменения.
- Внесла ещё несколько изменений -->

### 0.3.1 (28.12.22)

- (derAlff) Обновлен файл 'package.json' для использования минимальной версии NodeJS.
- (derAlff) Обновлено описание для настройки CallMeBot в файле 'index\_m.html'.
- (derAlff) Обновлен текст конфигурации с учетом проблемы с GUID в файле README.

### 0.2.3 (08.12.22)

- (derAlff) Добавлена поддержка 'закодированного символа новой строки' в строках.
- (derAlff) Обновленный README

### 0.2.2 (07.12.22)

- (derAlff) Изменение версии для NPM

### 0.2.1 (07.12.22)

- (derAlff) Изменение версии для NPM

### 0.2.0 (07.12.22)

- (derAlff) Добавлена поддержка эмодзи.
- (derAlff) Добавлена информация об эмодзи в файл README.
- (derAlff) Номер телефона в файле README/Configuration заменен ссылкой на фактический номер телефона на сайте CallMeBot.

### 0.1.7 (16.02.22)

- (derAlff) Изменение версии для NPM

### 0.1.6 (2022-01-22)

- (derAlff) Выпущено на npm
- (derAlff) Обновлен файл README.md
- (derAlff) Переведенное описание в io-package.json
- (derAlff) Изменил connectionType на cloud
- (derAlff) Измененная исходная часть

### 0.1.5 (2022-01-22)

- (derAlff) Исправлена ошибка Blockly

### 0.1.4 (2022-01-22)

- (derAlff) Обновлены файлы io-package.json и package.json.
- (derAlff) Добавлено "messagebox": true в файл io-package.json.
- (derAlff) Изменил номер телефона на странице администратора.

### 0.1.3 (2022-01-21)

- (derAlff) Обновлены файлы README.md, io-package.json и package.json.

### 0.1.0

- (derAlff) Протестированная и работающая версия 0.1.0

### 0.0.1 (2022-01-21)

- (derAlff) Первый релиз.

## Список дел

- Добавить телефонную книгу
- Добавить нескольких пользователей (номера телефонов и API-ключи).

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