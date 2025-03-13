---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: RotdyiL8Uu3EFd4EQDhi/2GDpnEOHQo6tMqrv/ZOieY=
---
![Логотип](../../../en/adapterref/iobroker.reolink/admin/reolink_logo.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.reolink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![Количество установок](https://iobroker.live/badges/reolink-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/reolink-stable.svg)
![Статус зависимости](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![НПМ](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**Тесты:** ![Тест и выпуск](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## Адаптер reolink для ioBroker
Адаптер для платформы ioBroker для получения информации [Переподключение камеры](https://reolink.com/).

В целом все новые камеры Reolink поддерживают команды API. Они просто отличаются поддерживаемыми командами.

Одно напоминание о пароле. Попробуйте с кодировкой URI или без нее, когда у вас есть только один специальный символ. Лучше не использовать специальный символ и просто использовать более длинный пароль для той же безопасности.

Если вы хотите включить какую-либо конкретную команду API... просто дайте мне знать.

## Реализованные функции
### НАБОР
- Управление PTZ / Охрана PTZ
- Push-уведомление
- Установить автофокус

значения: 0,1

- Установить ИК-подсветку

значения: Авто, Выкл.

- Установить светодиодную подсветку
- Установить почтовое уведомление

значения: 0, 1

- Воспроизвести звуковой сигнал будильника
- Увеличение фокуса

Функции можно запускать, изменяя состояния reolink.<Instanze>.settings.

 ### ПОЛУЧАТЬ
- Информация об устройстве
- Информация о PTZ
- Информация о диске
- Информация о сети
- Обнаружение движения
- Автофокус
- Снимок
- ИК-свет
- Светодиодный свет
- Уведомление по почте

### Пример использования get image:
```
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// содержимое **результата** — JSON:

```
{type:"image/png",base64:"iVBORw....askldfj"}
```

## Известные рабочие камеры (прошивки не старше 2023 года)
- РЛК-420-5МП
- E1 Наружный
- E1 Zoom
- РЛК-522
- РЛК-810А
- РЛК-823А
- Дуо 3 PoE

## Известные *НЕ* рабочие камеры
- E1 Про

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (oelison) update readme #141

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