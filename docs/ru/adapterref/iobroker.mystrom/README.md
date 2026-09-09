---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: bRYTsCanapQAhTYMJD6OiVMyVqP98ci/pCxbRRT+hg8=
---
![Логотип](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Количество установок (последние)](http://iobroker.live/badges/mystrom-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/mystrom-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

# ioBroker.mystrom

## Адаптер Mystrom для ioBroker

адаптер myStrom

Адаптер считывает все данные из приложения myStrom и обновляет их каждые 30 минут. Он также считывает локальные данные устройств, если они подключены к сети и им был назначен IP-адрес через приложение или вручную. Для этого все устройства должны быть подключены к сети на момент запуска адаптера. Кнопки не всегда находятся в сети; попробуйте нажать их дважды и удерживать в течение 8 секунд, или выполните сброс, нажав кнопку на 10 секунд, пока она не начнет мигать красным, а затем нажав один раз. После сброса необходимо повторно подключиться через WLAN. Подключитесь вручную, нажав кнопку 3 раза, затем вручную войдите в WLAN и только после этого следуйте инструкциям в приложении. После этого кнопка будет подключена к сети, и ее данные можно будет считать.

Для соответствующих действий кнопок и датчиков движения можно ввести URL-адреса. Переключениями также можно управлять через состояние ioBroker.

#### Wi-Fi переключатель

Для переключения между устройствами используйте команду localCommand mystrom.0.XXXXXXX.localCommands.

#### Кнопки

Для переключения состояний ioBroker необходимо использовать [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) .

SimpleAPI можно активировать через экземпляр ioBroker web.0. Активируйте параметры "Встроенный 'Simple API'" в экземпляре web.0.

Для установки состояния можно использовать следующую команду: Установите следующее состояние в разделе Objects mystrom.0.XXX.localData.api/v1/device.XXXX.single или long или double (устройства должны быть подключены к сети при запуске адаптера, нажмите дважды и удерживайте в течение 8 секунд. Затем перезапустите адаптер, пока папка localData не будет заполнена).

##### get://ioBrokerIP:8082/toggle/javascript.0.test

<br />

#### PIR-датчик движения

Установите следующее состояние для объектов mystrom.0.XXXXX.localData.api/v1/action.pir

##### get://ioBrokerIP:8082/toggle/javascript.0.test

   <br />

Более подробную информацию о том, как изменить два состояния одновременно, можно найти, например, по [ссылке: https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

DE:

Адаптер находится во всех датах в приложении myStrom и актуален в течение 30 минут. Вы можете найти локальные данные, когда находитесь в сети, и у вас есть приложение или вручную указанный IP-адрес. Попробуйте начать работу с адаптером, начав онлайн-трансляцию. Кнопка не позволяет войти в онлайн-режим, чтобы дважды нажать и нажать 8 секунд, чтобы остановить или сбросить 10 секунд, чтобы мигнуть и затем снова нажать. Nach dem Reset не позволяет выполнить сброс через WLAN. Мануэль перейдет через 3 неправильных подключения и затем вручную подключит WLAN и сначала отправится в приложение. Это кнопка онлайн, и ее можно использовать.

Эти URL-адреса предназначены для действий по использованию кнопок и украшений. Außerdem können die Switch через ioBroker State geschaltet werden.

#### Wi-Fi-переключатель

Вы можете использовать локальную команду вместо mystrom.0.XXXXXXX.localCommands.

#### Кнопки

Zum Schalten von ioBroker утверждает, что необходимо использовать [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) .

SimpleAPI может быть активирован в ioBroker web.0. В Instanz web.0 активирована опция «Eingebautes 'Simple-API'».

Zum setzen eines States kann dann folgende URL<br />

Для заданного состояния folgenden mystrom.0.XXX.localData.api/v1/device.XXXX.single или long или double (Вы должны запустить адаптер в режиме онлайн, загрузить его и оставить в течение 8 секунд. Адаптер не может быть установлен в соответствии с порядком локальных данных):

##### get://ioBrokerIP:8082/toggle/javascript.0.test

<br />

#### PIR Bewegungsmelder

Для следующих объектов задано состояние mystrom.0.XXXXX.localData.api/v1/action.pir

##### get://ioBrokerIP:8082/toggle/javascript.0.test

   <br />

Дополнительная информация о том, как получить информацию о штатах: <https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332>

## Changelog
### 0.1.0 (2024-04-21)

- improve cpu usage

## License

MIT License

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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