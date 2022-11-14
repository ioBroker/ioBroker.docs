---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung/README.md
title: без заголовка
hash: fMqJKEXdLxR/Yz6PqBYEwadR+vbNNnWrf9oAuEToQ3Y=
---
![Логотип](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![Количество установок](http://iobroker.live/badges/samsung-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.samsung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### IoBroker.samsung
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg) <!-- [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

#### Описание
Адаптер для телевизоров Samsung

### Первоначальное создание
Этот адаптер изначально был создан @soef по адресу https://github.com/soef/ioBroker.samsung, но больше не поддерживается, поэтому мы переместили его в сообщество iobroker, чтобы можно было исправить ошибки. спасибо @soef за его работу.
С тех пор адаптер был расширен jogibear9988 и mwp007 с дополнительным API.

#### Конфигурация
Введите IP-адрес вашего телевизора Samsung.
Выберите свой API: Samsung Remote — телевизоры до 2014 г. После установки вам необходимо подтвердить новое подключение на телевизоре Samsung HJ — 2014 и 2015 гг. После первого подключения вам необходимо ввести PIN-код, отображаемый на вашем телевизоре.
Samsung2016 — самоочевидный SamsungTV — телевизоры Tizen после 2016 года

#### Монтаж
через админку ioBroker.

В противном случае выполните следующую команду в корневом каталоге ioBroker (например, в /opt/iobroker)

```
iobroker install samsung
```

или же

```
npm install iobroker.samsung
```

#### Требования
Самсунг ТВ<br> Серия HJ тестировалась мной на UE55HU7200. Поддержка устройств с 2016 года экспериментальная, если что-то не работает, смотрите в лог.

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.9 (2022-05-27)
* (Apollon77) fix crash when initializing a SamsungTV (Tizen)

### 0.5.8 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.7 (2022-04-19)
* (Apollon77) Adjust logic to detect if TV is on or off

### 0.5.6 (2022-03-31)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.5 (2022-03-30)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.4 (2022-03-30)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.3 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-25)
* (Apollon77) General updates
* (Apollon77) Add Sentry for Crash reporting

### 0.5.0
* New api Type for H and J Series (2014 + 2015)

### 0.4.0
* New api Type, removed node 4 check

### 0.2.9
* Update utils.js and usage, CI Testing and deps (Apollon77)",

## License
The MIT License (MIT)

Copyright (c) 2015-2017 soef <soef@gmx.net>, 2018-2022 ioBroker Community