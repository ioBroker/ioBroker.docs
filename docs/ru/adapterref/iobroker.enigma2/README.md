---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enigma2/README.md
title: ioBroker энигма2
hash: WZfonWlqEmvTcgfdLvPJ8wK+96I2Yvv4xtYCHi/9rdI=
---
![Логотип](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![НПМ](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker enigma2
- Адаптер для ioBroker для получения информации от приемника enigma2 и отправки команд
- (Адаптер работает только на одном хосте! С установкой клиента в настоящее время все еще возникают проблемы.)

- (DE) Адаптер для ioBroker и получения информации от einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)(Адаптер не работает на своем хосте! При установке клиента возникла актуальная проблема.)

## Форум
[![ioBroker](https://forum.iobroker.net/assets/uploads/system/site-logo.png)](https://forum.iobroker.net/topic/25112/enigma2-adapter-ab-v1-2-3)

----

### Функции
- BOX_IP
- СЕТЬ
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- КАНАЛ
- ОПИСАНИЕ СОБЫТИЯ
- ПРОДОЛЖИТЕЛЬНОСТЬ СОБЫТИЯ
– EVENTDURATION_MIN
- СОБЫТИЕ
– EVENTREMAINING_MIN
- EVENT_PROGRESS_PERCENT
- EVENT_TIME_START
- EVENT_TIME_END
- EVENT_TIME_PASSED
- HDD_CAPACITY
- HDD_FREE
- MESSAGE_ANSWER
- МОДЕЛЬ
- ВЫКЛЮЧЕНО
- ПРОГРАММА
- ПРОГРАММА_ИНФО
- ПРОГРАММА_AFTER
- PROGRAMM_AFTER_INFO
- ПОДДЕРЖИВАТЬ
- ОБЪЕМ
- WEB_IF_VERSION
- isRecording
- Таймер_is_set
- MOVIE_LIST (только openwebif)
- СПИСОК ТАЙМЕРА
- CHANNEL_PICON (путь к значку - только openwebif)

----

### Основной
- enigma2-СОЕДИНЕНИЕ

----

### Команда
- команда.CHANNEL_DOWN
- команда.CHANNEL_UP
- команда.ВНИЗ
- команда.ВВЕРХ
- команда.EPG
- команда.ВЫХОД
- команда.ВЛЕВО
- команда.МЕНЮ
- команда.MUTE_TOGGLE
- команда.ОК
- команда.ПАУЗА
- команда.ИГРАТЬ
- команда.РАДИО
- команда.REC
- команда.ДИСТАНЦИОННОЕ УПРАВЛЕНИЕ
- команда.ВПРАВО
- команда.SET_VOLUME
- команда.STANDBY_TOGGLE
- команда.СТОП
- команда.ТВ
- команда.ВВЕРХ
- команда.VOLUME_DOWN
- команда.VOLUME_UP
- команда.ZAP = отправить неверную ссылку на службу

----

### Основная команда
- main_command.DEEP_STANDBY = Глубокий режим ожидания
- main_command.REBOOT = Перезагрузка
- main_command.RESTART_GUI = Перезапустить Enigma2 (GUI)
- main_command.STANDBY = Режим ожидания
- main_command.WAKEUP_FROM_STANDBY = Выход из режима ожидания

----

### Сообщение
 - Message.Text = Текст сообщения (Ввод -> Отправить)
 - Message.Type = Число от 0 до 3 (0= Да/Нет; 1= Информация; 2=Сообщение; 3=Внимание)
 - Message.Timeout = тайм-аут сообщения в секундах. Может быть пустым или указать количество секунд, через которое сообщение должно исчезнуть.

----

### Alexa_Command
 - Alexa_Command.Mute = Команда Alexa
 - Alexa_Command.Standby = Команда Alexa

----

### Отправить
#### В Blockly
 - сообщение = Текст сообщения
 - msgType = Число от 0 до 3 (0= Да/Нет; 1= Информация; 2=Сообщение; 3=Внимание)
 - таймаут = таймаут сообщения в секундах. Может быть пустым или указать количество секунд, через которое сообщение должно исчезнуть.

![Изображение текста](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### Или ![Изображение текста](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> zum Blockly Импорт <](admin/Blockly_Import.md)

#### В JavaScript
```js
sendTo('enigma2.0', 'send', {
    message: 'Test Nachricht', /* Text of Message */
    timeout: 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
    msgType: 1,                /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

### 2.1.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.5 (2023-09-18)
* (mcm1957) A problem causing missing descriptions for timer entryies and warnings has been fixed. #119 
* (mcm1957) Dependencies have been updated.

### 2.0.3 (2023-09-06)
* (TDCroPower) fixed the problem that no objects are updated

### 2.0.2 (2023-08-17)
* (Lucky-ESA) Bugfixes: [#61](https://github.com/Matten-Matten/ioBroker.enigma2/issues/61)
* (Lucky-ESA) Bugfixes: undefined e2eventlist
* (bluefox) Added json config
* (mcm1957) Adapter now requires node 16

## License
MIT License

Copyright (c) 2023-2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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
