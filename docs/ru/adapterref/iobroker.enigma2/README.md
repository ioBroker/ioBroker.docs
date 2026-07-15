---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enigma2/README.md
title: ioBroker enigma2
hash: teRzjARBlwSRw3sMfaN5ubviI/pLHk0inOiRsQ7vdkk=
---
![Логотип](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![НПМ](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker enigma2
- Адаптер для ioBroker, позволяющий получать информацию от приемника enigma2 и отправлять команды.
— (Адаптер работает только на одном хосте! При установке на клиентском компьютере пока сохраняются проблемы.)

----

### Функции
- BOX_IP
- СЕТЬ
- СПРАВОЧНИК ПО СЕРВИСАМ КАНАЛА
- CHANNEL_SERVICEREFERENCE_NAME
- КАНАЛ
- ОПИСАНИЕ СОБЫТИЯ
- ПРОДОЛЖИТЕЛЬНОСТЬ СОБЫТИЯ
- ПРОДОЛЖИТЕЛЬНОСТЬ_СОБЫТИЯ_МИН
- EVENTREMAINING
- EVENTREMAINING_MIN
- ПРОЦЕНТ ВЫПОЛНЕНИЯ СОБЫТИЯ
- EVENT_TIME_START
- EVENT_TIME_END
- EVENT_TIME_PASSED
- Емкость жесткого диска
- HDD_FREE
- ОТВЕТ_СООБЩЕНИЯ
- МОДЕЛЬ
- ОТКЛЮЧЕНО
- ПРОГРАММА
- PROGRAMM_INFO
- PROGRAMM_AFTER
- PROGRAMM_AFTER_INFO
- ПОДДЕРЖИВАТЬ
- ОБЪЕМ
- WEB_IF_VERSION
- isRecording
- Таймер_установлен
- MOVIE_LIST (только openwebif)
- TIMER_LIST
- CHANNEL_PICON (Путь к иконке - только для OpenWebIF)

----

### Основной
- enigma2-CONNECTION

----

### Команда
- command.CHANNEL_DOWN
- command.CHANNEL_UP
- команда.ВНИЗ
- команда.UP
- команда.EPG
- команда.ВЫХОД
- команда.ЛЕВАЯ
- команда.МЕНЮ
- command.MUTE_TOGGLE
- команда.ОК
- command.PAUSE
- команда.PLAY
- команда.РАДИО
- command.REC
- команда.ДИСТАНЦИОННОЕ УПРАВЛЕНИЕ
- команда.ПРАВО
- command.SET_VOLUME
- command.STANDBY_TOGGLE
- команда.СТОП
- command.TV
- команда.UP
- команда.VOLUME_DOWN
- команда.VOLUME_UP
- command.ZAP = отправить недействительную ссылку на сервис

----

### Главная команда
- main_command.DEEP_STANDBY = Deepstandby
- main_command.REBOOT = Перезагрузка
- main_command.RESTART_GUI = Перезапустить Enigma2 (GUI)
- main_command.STANDBY = Standby
- main_command.WAKEUP_FROM_STANDBY = Пробуждение из режима ожидания

----

### Сообщение
- Message.Text = Текст сообщения (Enter -> Send)
- Message.Type = Число от 0 до 3 (0 = Да/Нет; 1 = Информация; 2 = Сообщение; 3 = Внимание)
- Message.Timeout = время ожидания сообщения в секундах. Может быть пустым значением или числом секунд, через которое сообщение должно исчезнуть.

----

### Alexa_Command
- Alexa_Command.Mute = Команда Alexa
- Alexa_Command.Standby = Команда Alexa

----

### SendTo
#### В Blockly
- сообщение = Текст сообщения
- msgType = Число от 0 до 3 (0 = Да/Нет; 1 = Информация; 2 = Сообщение; 3 = Внимание)
- timeout = время ожидания сообщения в секундах. Может быть пустым значением или числом секунд, через которое сообщение должно исчезнуть.

![Текст с изображением](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### Или ![Текст с изображением](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> Импорт Blockly <](admin/Blockly_Import.md)

#### На JavaScript
```js
sendTo('enigma2.0', 'send', {
    message: 'Test Messaget', /* Text of Message */
    timeout: 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
    msgType: 1,                /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2026-03-05)
- (mcm1957) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated.

### 2.2.3 (2024-12-22)
* (mcm1957) Adapter has been moigrated to @iobroker/eslint-config. [#266]

### 2.2.2 (2024-12-22)
* (mcm1957) States 'message.*' are writeable again now. [#273]
* (mcm1957) Dependencies have been updated.

### 2.2.1 (2024-11-13)
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
* (mcm1957) Message states have been added. [#229]
* (simatec) Adapter changed to meet Responsive Design rules.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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