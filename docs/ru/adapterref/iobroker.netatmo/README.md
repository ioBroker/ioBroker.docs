---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.netatmo/README.md
title: ioBroker.netatmo
hash: SL5lZ9scvkpwCjRYSdXWbjlrZvTu6XwF2XF6+8Obl7Y=
---
![Логотип](../../../en/adapterref/iobroker.netatmo/admin/netatmo.png)

![Количество установок](http://iobroker.live/badges/netatmo-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.netatmo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo.svg)
![НПМ](https://nodei.co/npm/iobroker.netatmo.png?downloads=true)

# IoBroker.netatmo
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер Netatmo для ioBroker

## Установка и настройка
Просто введите имя пользователя и пароль Netatmo в настройках адаптера.

По умолчанию для выполнения запросов используется общий ключ API, который ограничивает интервал обновления до 10 минут!

Чтобы увеличить интервал или получать оперативные обновления от приветствия и присутствия, детекторов CO и дыма, вам нужно всего лишь ввести собственный идентификатор / секрет из вашего приложения NetAtmo.
Для этого перейдите по следующему URL-адресу, войдите в свою учетную запись Netatmo и заполните запрашиваемую форму на https://auth.netatmo.com/access/login?next_url=https%3A%2F%2Fdev.netatmo.com% 2Fapps%2Fcreateanapp !

Убедитесь, что вы настроили свои лимиты так, чтобы они соответствовали https://dev.netatmo.com/guideline#rate-limits (и имейте в виду, что эти лимиты также существуют для ВСЕХ ПОЛЬЗОВАТЕЛЕЙ, если вы не используете собственный идентификатор/секрет)

## Отправить в поддержку
Вы также можете использовать команду sendTo, чтобы установить, что все люди находятся вдали (например, если они используются в качестве системы сигнализации).

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: []});
```

или

```
sendTo('netatmo.0', "setAway");
```

пометить всех людей как отсутствующих для всех камер

также можно пометить одного или нескольких конкретных людей как отсутствующих

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

Параметр homeId — это строка, указанная за именем вашей камеры на вкладке «Объекты» (необязательно, если установлено несколько камер), personId — это идентификатор в папке «Известные» люди.

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog
### 1.5.1 (2022-03-09)
* (Apollon77) Fix jsonconfig for Client secret

### 1.5.0 (2022-03-08)
* (kyuka-dom) Added support for netatmo carbon monoxide sensor.
* (kyuka-dom) Added support for netatmo smoke alarm.
* (foxriver76) prevent crashes if application limit reached
* (Apollon77) Allow to specify own id/secret in all cases
* (Apollon77/foxriver76) ensure that minimum polling interval of 10 minutes is respected if no individual ID/Secret is provided
* (Apollon77) Several pother fixes and optimizations
* (Apollon77) Add Sentry for crash reporting

### 1.4.4 (2021-07-21)
* (Apollon77) Fix typo that lead to a crash

### 1.4.3 (2021-06-27)
* (Apollon77) Fix typo to fix crash

### 1.4.2 (2021-06-27)
* (bluefox) Removed warnings about the type of states

### 1.4.0 (2021-06-24)
* (bluefox) Added the support of admin5 
* (bluefox) Removed warnings about the type of states

### 1.3.3
* (PArns) removed person history

### 1.3.2
* (PArns) Updated libs & merged pending patches
* (PArns) Changed update interval from 5 to 10 minutes (requested by Netatmo)

### 1.3.1
* (PArns) Fixed event cleanup crash

### 1.3.0
* (HMeyer) Added Netatmo Coach

### 1.2.2
* (PArns) Updated meta info

### 1.2.0
* (PArns) Fixed camera picture for events
* (PArns) Added camera vignette for events
* (PArns) Added camera video for events
* (PArns) Added new sub event type (human, vehicle, animal, unknown)
* (PArns) Added LastEventID within the LastEventData section

### 1.1.7
* (PArns) Added missing lib dependencies

### 1.1.6
* (PArns) Removed GIT requirement and included netatmo lib directly

### 1.1.5
* (PArns) Removed 502 error output if API has backend problems

### 1.1.4
* (PArns) Added support for unnamed modules

### 1.1.1
* (PArns) Simplified setAway

### 1.1.0
* (PArns) Added setAway function (Welcome only) to mark all or specific persons as away (requires your own API key!)

### 1.0.1
* (PArns) Fixed scope problems for presence & welcome (requires your own API key!)

### 1.0.0
* (PArns) Added live camera picture & stream for presence & welcome
* (PArns) Fixed known & unknown face image url for presence & welcome

### 0.6.2
* (PArns) Added name of last seen known face

### 0.6.1
* (PArns) Changed realtime server to use new general realtime server
* (PArns) Changed enums to channels to avoid enum creation
* (PArns) Simplified detection for movement-, known- & unknown- face events

### 0.6.0
* (PArns) Rewritten realtime updates to not need a local server any longer! Realtime updates are now turned on by default if a Welcome or Present cam is available

### 0.5.1
* (PArns) Optimized realtime updates to avoid updates if only movement was detected

### 0.5.0
* (PArns) Added realtime events for Netatmo Welcome

### 0.4.1
* (PArns) Removed log warnings for Wind sensor

### 0.4.0
* (PArns) Added absolute humidity
* (PArns) Added dewpoint

### 0.3.1
* (PArns) Reuse of preconfigured OAuth Client data
* (PArns) Added backward compatibility with existing installations

### 0.3.0
* (wep4you) Initial implementation of Netatmo welcome camera

### 0.2.2
* (PArns) Fixed SumRain24MaxDate & SumRain24Max which won't update in some rare cases

### 0.2.1
* (PArns) Corrected DateTime values & object types

### 0.2.0
* (PArns) Added SumRain1Max/SumRain1MaxDate & SumRain24Max/SumRain24MaxDate to get overall rain max since adapter installation

### 0.1.1
* (PArns) Fixed TemperatureAbsoluteMin/TemperatureAbsoluteMax

### 0.1.0
* (PArns) Fixed CO2 calibrating status
* (PArns) Added last update for devices
* (PArns) Added TemperatureAbsoluteMin/TemperatureAbsoluteMax to get overall temperature min/max since adapter installation

### 0.0.4
* (PArns) Fixed typo/missing parameter in GustStrength

### 0.0.3
* (PArns) Added error handling to prevent exceptions for missing parameters

### 0.0.2
* (PArns) Fixed rain sensor

### 0.0.1
* (PArns) Initial release

## License
MIT

Copyright (c) 2016-2022 Patrick Arns <iobroker@patrick-arns.de>