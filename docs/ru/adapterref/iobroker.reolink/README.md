---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: 50y3ZeJ3MS1dkRKIpyBd3FY/d1+0pNHJpsSoWBp/fKA=
---
![Логотип](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Количество установок](https://iobroker.live/badges/reolink-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/reolink-stable.svg)
![Статус зависимости](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![НПМ](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**Тесты:** ![Тестирование и выпуск](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## Адаптер reolink для ioBroker
Адаптер для платформы ioBroker для получения информации [Камера Reolink](https://reolink.com/).

В целом, все новые камеры Reolink поддерживают команды API. Разница лишь в наборе поддерживаемых команд.

Напоминание о пароле. Попробуйте использовать кодировку URI или нет, если у вас всего один специальный символ. Лучше вообще не использовать специальные символы и просто придумать более длинный пароль для обеспечения той же безопасности. Проверьте, работают ли ваши учетные данные, используя http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity.

Если вам необходимо включить какую-либо конкретную команду API... просто дайте мне знать.

## Реализованные функции
### НАБОР
- Управление PTZ / Защита PTZ
- Push-уведомления
- Установить автофокус

значения: 0,1

- Включить ИК-подсветку

Значения: Авто, Выкл.

- Включить светодиодную подсветку
- Настроить уведомления по электронной почте

значения: 0, 1

- Воспроизвести звуковой сигнал тревоги
- Увеличение фокуса

Функции можно активировать, изменяя состояние reolink.<Instanze>.settings.

 ### ПОЛУЧАТЬ
- Информация об устройстве
- Информация о PTZ
- Информация о диске
- Информация о сети
- Обнаружение движения
- Автофокус
- Снимок
- ИК-свет
- Светодиодная подсветка
- Уведомление по почте

### Настройки push-уведомлений
Push-уведомления на телефон будут отправляться только при соблюдении следующих условий:

— Переключатель push-уведомлений в адаптере включен.
- Для сетевых видеорегистраторов (NVR) включены как глобальный переключатель, так и переключатель каналов.
— В приложении Reolink на этом телефоне включены push-уведомления.

Функция push-уведомлений в приложении Reolink не зависит от настроек адаптера. Она также не зависит от настроек других телефонов, подключенных к той же камере. Reolink делает это для того, чтобы у вас был независимый способ отключения push-уведомлений для каждого телефона. Это означает, что отключение push-уведомлений в iobroker никак не влияет на кнопку переключения в приложении.

### Пример использования функции получения изображения:
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// Содержимое из **результата** представляет собой JSON:

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

Для Telegram это работает.

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## Известные рабочие камеры (прошивка выпущена до 2023 года)
- RLC-420-5MP
- E1 Outdoor
- E1 Zoom
- RLC-522
- RLC-810A
- RLC-823A
- Дуэт 3 PoE

## Известные *НЕ* работающие камеры
- E1 Pro
- Argus 4 (возможно, не все Argus работают)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2025 Andy Grundt <andygrundt@gmail.com>

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