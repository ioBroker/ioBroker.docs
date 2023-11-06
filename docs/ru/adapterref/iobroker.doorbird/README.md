---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: Q+foTzjjLCS/dZLAdXis/ktmhO//TJ9nS+1eOGF2pQ0=
---
![Логотип](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![НПМ](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/doorbird-stable.svg)
![Установлен](http://iobroker.live/badges/doorbird-installed.svg)

# IoBroker.doorbird
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

## Версии
## Что такое Doorbird?
DoorBird — это дверной домофон, который функционирует как дверной звонок и система безопасности. Изделие устанавливается снаружи дома, где обычно находится дверной звонок, и оснащено кнопкой дверного звонка с камерой над ней.

## Конфигурация
1. Введите IP-адрес, по которому адаптер должен прослушивать события с устройства Doorbird.

(Обычно это IP-адрес вашего хоста ioBroker).
Адаптер пытается заполнить поле правильным IP-адресом. Если предварительно заполненный IP-адрес не является IP-адресом вашего хоста ioBroker, измените его на правильный IP-адрес.

2. Порт предварительно определен как «8100». Вы можете изменить его, если порт уже используется другой службой.

   Просто попробуйте запустить адаптер с этим портом. Если порт недоступен, при запуске адаптера возникнет ошибка. Тогда просто вернитесь сюда и измените порт.

3. Введите IP-адрес вашего устройства Doorbird. Вы можете нажать на «значок поиска» слева от поля ввода. После того, как вы щелкнете значок, в верхней части экрана конфигурации появится сообщение. Теперь у вас есть 60 секунд, чтобы нажать кнопку звонка на устройстве Doorbird. Адаптер пытается определить IP и заполнить все поля за вас.
4. Идентификатор устройства (НЕ IP!) вашего Doorbird.
5. Имя пользователя, которому необходимо иметь разрешения **API-Оператор** и **Всегда следить** на устройстве Doorbird.
6. Пароль для имени пользователя, введенного в поле 5.

![Скриншот](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

После того, как вы ввели всю необходимую информацию в диалоговое окно конфигурации, нажмите «Сохранить и закрыть».
Теперь адаптер должен перезагрузиться, и вы готовы к работе!

## Доступ к снимкам движения и дверного звонка
Используйте следующий URL-адрес, чтобы получить текущий снимок:

```
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Doorbell<number>_1.jpg
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Motion_1.jpg
```

или

```
/opt/iobroker/iobroker-data/files/doorbird.<instance>/Doorbell<number>_1.jpg'
```

#### Пример:
```
http://192.168.0.2:8081/files/doorbird.0/Doorbell1_1.jpg
```

### Отправить снимок в Telegram
#### Пример
```
readFile("doorbird.0", "TakeSnapshot_1.jpg", function (error, data) {
  if (error) {
    console.error(error);
  } else {
    sendTo("telegram.0", {
      text: data,
      type: "photo",
    });
  }
});
```

или начиная с js-контроллера 5

```
setState('doorbird.0.TakeSnapshot', true);
onFile("doorbird.0", "TakeSnapshot_1.jpg", true, function (id, fileName, size, fileData, mimeType) {
    sendTo('telegram.0', {
        text: fileData,
        type: 'photo'
    });
});
```

## Совместимые устройства
| Устройство | Версия оборудования | Версия прошивки |
| -------------------------------- | ---------------- | ---------------- |
| Видеодомофон DoorBird D10x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D20x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D21x | 1.00 и выше | 000108 и выше |
| БердГард B10x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D11x | 1.00 и выше | 000130 и выше |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2023-10-03)

-   (Schmakus) add debug logs to find out "Maximum call stack size exceeded"
-   (Schmakus) update dependencies

### 1.2.4 (2023-08-31)

-   (Schmakus) tryed to fixed [#73] Maximum call stack size exceeded
-   (Stefan592) fixed 'listen on all interfaces'

### 1.2.3 (2023-08-17)

-   (Schmakus) changed schedule handling. (fix status code 400)

### 1.2.2 (2023-08-17)

-   (Schmakus) some code improvements

### 1.2.1 (2023-08-17)

-   (Schmakus) Issue 'Maximum call stack size exceeded' - try to fix

## License

The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.