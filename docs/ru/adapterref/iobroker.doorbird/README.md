---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: /40V0ry/4JPiH4ksWi+hfkq7gH//s9zMYYThERI6TaE=
---
![Логотип](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.doorbird?label=npm%20dependencies&style=flat-square)
![Гитхаб](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Активность фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![НПМ](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/doorbird-stable.svg)
![Установлен](http://iobroker.live/badges/doorbird-installed.svg)

# IoBroker.doorbird
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

## Версии
## Что такое Doorbird?
DoorBird — это дверной домофон, который работает и как дверной звонок, и как система безопасности. Продукт размещается снаружи дома, где обычно находится дверной звонок, и имеет кнопку дверного звонка с камерой наверху.

## Конфигурация
1. Введите IP-адрес, на котором адаптер должен прослушивать события с устройства Doorbird.

(Обычно это IP-адрес вашего хоста ioBroker).
Адаптер пытается предварительно заполнить поле правильным IP-адресом. Если предварительно заполненный IP-адрес не является IP-адресом вашего хоста ioBroker, измените его на правильный IP-адрес.

2. Порт предварительно определен как «8100». Вы можете изменить его, если порт уже используется другой службой.

   Просто попробуйте запустить адаптер с этим портом. Если порт недоступен, вы получите сообщение об ошибке при запуске адаптера. Затем просто вернитесь сюда и измените порт.

3. Введите IP-адрес вашего устройства Doorbird. Вы можете нажать на «значок поиска» слева от поля ввода. После нажатия на значок появится сообщение в верхней части экрана конфигурации. Теперь у вас есть 60 секунд, чтобы нажать кнопку звонка на вашем устройстве Doorbird. Адаптер пытается определить IP и заполнить все поля за вас.
4. Идентификатор устройства (НЕ IP!) вашего Doorbird.
5. Имя пользователя, которое должно иметь разрешение API на устройстве Doorbird.
6. Пароль для имени пользователя, введенного в поле 5.

![Скриншот](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

После того, как вы ввели всю необходимую информацию в диалоговое окно конфигурации, нажмите «Сохранить и закрыть».
Теперь адаптер должен перезапуститься, и вы готовы к работе!

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

### Отправить снимок в телеграмму
#### Пример
```
sendTo('telegram.0', {
   text: '/opt/iobroker/iobroker-data/files/doorbird.0/Doorbell1_1.jpg',
   type: 'Foto'
});
```

или

```
setState('doorbird.0.TakeSnapshot'/*Schnappschuss holen*/, true);
timeout = setTimeout(function () {
   sendTo('telegram.0', {
      text: '/opt/iobroker/iobroker-data/files/doorbird.0/TakeSnapshot_1.jpg',
      type: 'Foto'
   });
}, 1000);
```

## Совместимые устройства
| Устройство | Аппаратная версия | Версия прошивки |
| -------------------------------- | ---------------- | ---------------- |
| Видеодомофон DoorBird D10x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D20x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D21x | 1.00 и выше | 000108 и выше |
| Защита от птиц B10x | 1.00 и выше | 000099 и выше |
| Видеодомофон DoorBird D11x | 1.00 и выше | 000130 и выше |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (Schmakus) Update documentation
-   (Schmakus) Update dependencies

### 1.0.5 (2023-07-05)

-   (Schmakus) Fixed AxiosError (deletion of duplicates) [#55]

### 1.0.4 (2023-07-05)

-   (Schmakus) Interim solution because deletion of duplicate favorites

### 1.0.2 (2023-07-04)

-   (Schmakus) Hotfix because dev-mode was active

### 1.0.1 (2023-07-04)

-   (Schmakus) remove unused packages
-   (Schmakus) added migration from older versions to delete unused snapshot states
-   (Schmakus) some code improvements

### 1.0.0 (2023-07-04)

-   (Schmakus) Re-new with adapter creator
-   (Schmakus) Changed snapshot handling! Find snapshot at ioBroker Files now!
-   (Schmakus) Support take snapshot manually has been added
-   (Schmakus) Support for light-On has been added

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