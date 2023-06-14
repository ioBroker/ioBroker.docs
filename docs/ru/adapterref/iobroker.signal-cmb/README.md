---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.signal-cmb/README.md
title: ioBroker.signal-cmb
hash: PZVkglcc7BEgZVqVzLkmFoR8CwxHW8xJR5P+i6DkWfY=
---
![Логотип](../../../en/adapterref/iobroker.signal-cmb/admin/signal-cmb.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.signal-cmb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.signal-cmb.svg)
![НПМ](https://nodei.co/npm/iobroker.signal-cmb.png?downloads=true)

# IoBroker.signal-cmb
**Тесты**: [![Тестирование и выпуск] (https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/necotec/ioBroker.signal-cmb/actions/workflows/test-and-release.yml)

## Адаптер signal-cmb для ioBroker
Большое спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-signal-send-messages/), этот адаптер позволяет отправлять сообщения Signal на себя или на другой номер.

**Примечание** : *Бесплатный API предназначен только для личного использования!*

### Конфигурация
*Следующая документация была скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-signal-send-messages/).*

Вам необходимо получить ключ API от бота перед использованием API:

- Добавьте номер телефона CallMeBot в свои телефонные контакты (назовите его по своему усмотрению). Актуальный номер телефона можно найти здесь: https://www.callmebot.com/blog/free-api-signal-send-messages/
- Отправьте это сообщение «Я разрешаю callmebot отправлять мне сообщения» (на английском языке) новому созданному контакту (конечно, используя Signal).<br>

Если вы получаете GUID внутри «тестовой ссылки», вы можете использовать этот GUID вместо своего номера телефона внутри адаптера. Вы также можете отправить<br> сообщение `I allow callmebot to send me messages` еще раз. Обычно вы должны видеть свой номер телефона внутри ссылки, и вы можете использовать свой номер телефона внутри адаптера.

- Подождите, пока не получите сообщение «API активирован для вашего номера телефона». Ваш APIKEY 123123` от бота. Поскольку это все еще находится в стадии бета-тестирования, активация может занять до 2 минут.
- Сигнальное сообщение от бота будет содержать ключ API, необходимый для отправки сообщений с использованием API.
- Теперь вы можете использовать API KEY в конфигурации ioBroker.

Пример: ![Пример](../../../en/adapterref/iobroker.signal-cmb/img/signal.jpg)

### Использование
Есть две возможности отправить сообщение: ВНИМАНИЕ! Замечено, что при отправке нескольких сообщений в течение одной секунды CallMeBot блокирует пользователя на 15 минут. Следовательно, следует обеспечить отправку только одного сообщения в секунду.

- через `signal-cmb.0.sendMessage`. Просто напишите текст в этом состоянии, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоге настроек.
- через сообщение от javascript-адаптера:

```
sendTo('signal-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блочный](../../../en/adapterref/iobroker.signal-cmb/img/blockly-signal.png)

### Смайлики
Чтобы отправить смайлики, вы должны добавить в сообщение несколько **'кодов'**. Вы можете найти все доступные коды здесь: https://www.callmebot.com/uncategorized/list-of-urlencoded-unicode-emoticons-emojis/

### Доступные эмодзи
CallMeBot официально поддерживает следующие эмодзи:

|Код|Эмодзи|
|%F0%9F%98%80|![ухмыляясь](../../../en/adapterref/iobroker.signal-cmb/img/emojies/01_grinning.png)|
|%F0%9F%98%83|![ухмыляясь большими глазами](../../../en/adapterref/iobroker.signal-cmb/img/emojies/02_grinning_big_eyes.png)|
|%F0%9F%98%84|![ухмыляющиеся улыбающиеся глаза](../../../en/adapterref/iobroker.signal-cmb/img/emojies/03_grinning_smiling_eyes.png)|
|%F0%9F%98%81|![сияющие улыбающиеся глаза](../../../en/adapterref/iobroker.signal-cmb/img/emojies/04_beaming_smiling_eyes.png)|
|%F0%9F%98%86|![ухмыляющееся брызгающее лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/05_grinning_squinting_face.png)|
|%F0%9F%98%85|![ухмыляясь](../../../en/adapterref/iobroker.signal-cmb/img/emojies/06_grinning_sweat.png)|
|%F0%9F%A4%A3|![катаюсь по полу от смеха](../../../en/adapterref/iobroker.signal-cmb/img/emojies/07_rolling_on_the_floor_laughing.png)|
|%F0%9F%A4%A3|![лицо со слезами радости](../../../en/adapterref/iobroker.signal-cmb/img/emojies/08_face_with_tears_of_joy.png)|
|%F0%9F%98%82|![слегка улыбающееся лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/09_slightly_smiling_face.png)|
|%F0%9F%99%82|![перевернутое лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/10_upside_down_face.png)|
|%F0%9F%98%89|![подмигивающее лицо](../../../en/adapterref/iobroker.signal-cmb/img/emojies/11_winking_face.png)|
|%F0%9F%98%8A|![улыбающееся лицо с улыбающимися глазами](../../../en/adapterref/iobroker.signal-cmb/img/emojies/12_smiling_face_with_smiling_eyes.png)|
|%F0%9F%98%87|![улыбающееся лицо с ореолом](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|
|%F0%9F%98%87|![улыбающееся лицо с нимбом](../../../en/adapterref/iobroker.signal-cmb/img/emojies/13_smiling_face_with_halo.png)|

#### Используйте смайлики
Чтобы использовать Emojie, вы должны вставить код Emojie в свой текст, который вы хотите отправить.

![Вставить смайлик](../../../en/adapterref/iobroker.signal-cmb/img/add_emojies.png)

Адаптер **signal-cmb** закодирует этот код, и вы увидите в Signal Messenger на своем телефоне Emojie.

![Сигнальный мессенджер Emojie](../../../en/adapterref/iobroker.signal-cmb/img/emojie_signal_mesenger.png)

## **РАБОТА В ПРОЦЕССЕ**
* Сделал некоторые изменения
* Сделал еще несколько изменений

-->

### 0.3.1 (28.12.22)
* (derAlff) Обновлен 'package.json' для использования минимальной версии NodeJS.
* (derAlff) Обновлено описание для настройки CallMeBot в 'index_m.html'
* (derAlff) Обновлен текст конфигурации с проблемой GUID в README

### 0.2.3 (08.12.22)
* (derAlff) Добавлена поддержка «закодированного перехода на новую строку» в строке.
* (derAlff) Обновлен README

### 0.2.2 (07.12.22)
* (derAlff) Изменение версии для NPM

### 0.2.1 (07.12.22)
* (derAlff) Изменение версии для NPM

### 0.2.0 (07.12.22)
* (derAlff) Добавлена поддержка эмодзи.
* (derAlff) Добавлена информация об смайликах в README
* (derAlff) Номер телефона в README/Configuration заменен ссылкой на актуальный номер телефона на сайте CallMeBot.

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

## Делать
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