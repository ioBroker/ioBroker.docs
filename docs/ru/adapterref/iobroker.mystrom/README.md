---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: C0fa0+X9Dn85ihw8WkIQQjMOmXkSRXHBS2mT9x8s+34=
---
![Логотип](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Количество установок (последних)](http://iobroker.live/badges/mystrom-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/mystrom-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

# IoBroker.mystrom
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

##адаптер mystrom для ioBroker
адаптер myStrom

Адаптер считывает все данные из приложения myStrom и обновляет их каждые 30 минут. Он также считывает локальные данные устройств, если они находятся в сети и IP-адрес был назначен через приложение или вручную. Для этого все устройства должны быть онлайн на момент запуска адаптера. Кнопки не всегда активны: попробуйте нажать дважды и затем удерживать в течение 8 секунд или выполнить сброс, нажав и удерживая 10 секунд, пока индикатор не начнет мигать красным, а затем нажать один раз. После сброса необходимо повторно подключиться через WLAN. Подключитесь вручную, нажав 3 раза, а затем вручную войдите в WLAN и только затем следуйте пути в приложении. После этого кнопка находится в режиме онлайн, и ее можно считывать.

URL-адреса могут быть введены для соответствующих действий кнопок и детекторов движения. Переключатели также можно переключать через состояние ioBroker.

#### Переключатель Wi-Fi
Для переключения устройств используйте localCommand mystrom.0.XXXXXXX.localCommands.

#### Кнопки
[Простой API](https://github.com/ioBroker/ioBroker.simple-api) необходимо использовать для переключения состояний ioBroker.

SimpleAPI можно активировать через экземпляр ioBroker web.0. Активируйте параметры «Встроенный простой API» в экземпляре web.0.

Затем можно использовать следующее для установки состояния. Установите следующее состояние в разделе «Объекты mystrom.0.XXX.localData.api/v1/device.XXXX.single», «long» или «double» (устройства должны быть в сети при запуске адаптера, дважды нажмите и далее держим 8 секунд. Затем перезапускаем адаптер до заполнения папки localData).

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR-детектор движения
Установите следующее состояние для объектов mystrom.0.XXXXXXX.localData.api/v1/action.pir

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

Подробнее о том, как изменить два состояния одновременно, например [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

ДЭ:

Адаптер находится во всех датах в приложении myStrom и актуален в течение 30 минут. Вы можете использовать локальные данные, когда вы находитесь в сети, и у вас есть приложение или вручную указанный IP-адрес. Попробуйте начать работу с адаптером, начав онлайн-трансляцию. Кнопка не позволяет войти в онлайн-режим, чтобы дважды нажать и нажать 8 секунд, чтобы остановить или сбросить 10 секунд, чтобы мигнуть и затем снова нажать. Nach dem Reset не позволяет выполнить сброс через WLAN. Мануэль перейдет через 3 неправильных подключения и затем вручную подключит WLAN и сначала отправится в приложение. Это кнопка онлайн, и ее можно использовать.

Эти URL-адреса предназначены для действий по использованию кнопок и украшений. Außerdem können die Switch через ioBroker State geschaltet werden.

#### Wi-Fi-переключатель
Вы можете использовать локальную команду вместо mystrom.0.XXXXXXX.localCommands.

#### Кнопки
Zum Schalten von ioBroker заявляет, что человек должен умереть [Простой API](https://github.com/ioBroker/ioBroker.simple-api) verwenden.

SimpleAPI может быть активирован в ioBroker web.0. В Instanz web.0 активирована опция «Eingebautes 'Simple-API'».

Zum setzen eines States kann dann folgende URL<br />

Для заданного состояния folgenden mystrom.0.XXX.localData.api/v1/device.XXXX.single или long или double (если вы используете адаптер, запустите онлайн-режим, запустите его и остановитесь в течение 8 секунд. Danach Adapten neustarten bis der localData gefüllt ист.):

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR Bewegungsmelder
Для следующих объектов задано состояние mystrom.0.XXXXX.localData.api/v1/action.pir

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

Дополнительные сведения о человеке z.B. zwei States gleichzeitig ändert: [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

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
