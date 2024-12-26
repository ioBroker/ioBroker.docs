---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.enigma2/README.md
title: ioBroker энигма2
hash: fdyOycvPFspaROEIv+ZQbVNsc4JE0rZ4YKX5UIsZP80=
---
![Логотип](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![НПМ](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker энигма2
- Адаптер для ioBroker для получения информации с приемника enigma2 и отправки команд
- (Адаптер работает только на одном хосте! С установкой клиента в настоящее время все еще возникают проблемы.)

- (DE) Адаптер для ioBroker и получения информации от einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)(Адаптер не работает на своем хосте! При установке клиента возникла актуальная проблема.)

----

### Функции
- ЯЩИК_IP
- СЕТЬ
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- КАНАЛ
- ОПИСАНИЕ СОБЫТИЯ
- ПРОДОЛЖИТЕЛЬНОСТЬ СОБЫТИЯ
- EVENTDURATION_MIN
- СОБЫТИЕ ОСТАВШЕЕСЯ
- EVENTREMAINING_MIN
- СОБЫТИЕ_ПРОГРЕСС_ПЕРЦЕНТ
- СОБЫТИЕ_ВРЕМЯ_НАЧАЛА
- EVENT_TIME_END
- СОБЫТИЕ_ВРЕМЯ_ПРОШЛО
- ЕМКОСТЬ_ЖЕСТКОГО_ДИСКА
- HDD_БЕСПЛАТНО
- СООБЩЕНИЕ_ОТВЕТ
- МОДЕЛЬ
- ПРИГЛУШЕНО
- ПРОГРАММА
- ПРОГРАММНАЯ_ИНФОРМАЦИЯ
- ПРОГРАММА_ПОСЛЕ
- ПРОГРАММА_ПОСЛЕ_ИНФОРМАЦИИ
- ПОДДЕРЖИВАТЬ
- ОБЪЕМ
- WEB_IF_VERSION
- isRecording
- Таймер_установлен
- MOVIE_LIST (только openwebif)
- СПИСОК_ТАЙМЕРОВ
- CHANNEL_PICON (путь к пикоконам - только openwebif)

----

### Основной
- enigma2-СОЕДИНЕНИЕ

----

### Команда
- команда.CHANNEL_DOWN
- команда.CHANNEL_UP
- команда.ВНИЗ
- команда.UP
- команда.EPG
- команда.ВЫХОД
- команда.ЛЕВЫЙ
- команда.МЕНЮ
- команда.MUTE_TOGGLE
- команда.ОК
- команда ПАУЗА
- команда.PLAY
- команда.РАДИО
- команда.REC
- команда.ДИСТАНЦИОННОЕ УПРАВЛЕНИЕ
- команда.ПРАВИЛЬНО
- команда.SET_VOLUME
- команда.STANDBY_TOGGLE
- команда СТОП
- команда.ТВ
- команда.UP
- команда.VOLUME_DOWN
- команда.VOLUME_UP
- command.ZAP = отправить недействительную ссылку на службу

----

### Главное командование
- main_command.DEEP_STANDBY = Глубокий режим ожидания
- main_command.REBOOT = Перезагрузка
- main_command.RESTART_GUI = Перезапустить Enigma2 (графический интерфейс)
- main_command.STANDBY = Режим ожидания
- main_command.WAKEUP_FROM_STANDBY = Пробуждение из режима ожидания

----

### Сообщение
- Message.Text = Текст сообщения (Ввод -> Отправить)
- Тип сообщения = Число от 0 до 3 (0= Да/Нет; 1= Информация; 2=Сообщение; 3=Внимание)
- Message.Timeout = время ожидания сообщения в сек. Может быть пустым или указывать количество секунд, через которое сообщение должно исчезнуть.

----

### Alexa_Command
- Alexa_Command.Mute = Команда Alexa
- Alexa_Command.Standby = Команда Alexa

----

### ОтправитьКому
#### В Блочном
- сообщение = Текст сообщения
- msgType = Число от 0 до 3 (0= Да/Нет; 1= Информация; 2=Сообщение; 3=Внимание)
- timeout = время ожидания сообщения в сек. Может быть пустым или указывать количество секунд, по истечении которых сообщение должно исчезнуть.

![Текст изображения](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### Или ![Текст изображения](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> zum Blockly Import <](admin/Blockly_Import.md)

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

### 2.1.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

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