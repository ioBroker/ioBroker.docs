---
chapters: {"pages":{"en/adapterref/iobroker.semp/README.md":{"title":{"en":"ioBroker.semp"},"content":"en/adapterref/iobroker.semp/README.md"},"en/adapterref/iobroker.semp/docu/docu_en.md":{"title":{"en":"Documentation for iobroker.semp"},"content":"en/adapterref/iobroker.semp/docu/docu_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.semp/README.md
title: ioBroker.semp
hash: HY0Ka2oIdnNbZBzRL6zS3SsOIxHOreapk8p6Cw6BsrA=
---
![Логотип](../../../en/adapterref/iobroker.semp/admin/semp.png)

![Количество установок](http://iobroker.live/badges/semp-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.semp.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.semp.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.semp.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.semp?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.semp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.semp?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.semp?logo=github&style=flat-square)

# ioBroker.semp

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## Адаптер SMA SEMP для ioBroker

Интерфейс для подключения к SMA SunnyPortal через SunnyHomeManager и SEMP

Добавьте свои устройства из ioBroker в SunnyPortal. SunnyPortal сможет точнее оценивать ваше энергопотребление и, следовательно, делать более точные прогнозы и рекомендации. Но вы также можете управлять своими устройствами через SunnyPortal. Если солнечной энергии достаточно, SunnyPortal может включить ваши устройства, а если недостаточно — выключить их. Таким образом, вы оптимизируете собственное потребление, но не зависите от нескольких устройств, поддерживаемых SunnyPortal. С помощью адаптера любое устройство из ioBroker может быть интегрировано в SunnyPortal. Даже не обязательно измерять потребление отдельного устройства. Достаточно даже приблизительных значений.

## документация пользователя

см [. документ](/#/docs/adapterref/iobroker.semp/docu/docu_en.md)

Подробную информацию о протоколе и его использовании см. [в документации SMA](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf) .

Описание общего характера использования запросов на электроэнергию см. [в документации SMA](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf) (только на немецком языке).

## Функции

- Добавление устройств из ioBroker в SunnyPortal через SMA SEMP
- информирует SunnyPortal о текущем потреблении
- Пусть SunnyPortal управляет этими устройствами (включает, когда солнечной энергии достаточно, и выключает, когда её недостаточно).

## Требования

## Режим посудомоечной машины: Функциональность адаптера

Этот адаптер позволяет управлять посудомоечной машиной или другими устройствами, потребляющими электроэнергию в режиме ожидания. Он работает следующим образом:

- Пользователь вручную включает устройство, как обычно.
- Вместо немедленного запуска устройство выключается и остается в режиме паузы.
- Как только будет накоплено достаточно солнечной энергии, устройство автоматически запустится и будет работать до завершения программы.
- В ходе этого процесса любые рекомендации от менеджера умного дома (SHM) по выключению устройства будут игнорироваться.

> **Примечание:**\
> &#x20;Подробную информацию о технической реализации можно найти в [выпуске № 333](https://github.com/rg-engineering/ioBroker.semp/issues/333) и на блок-схеме ниже.

![Блок-схема](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/settings/semp_dishwasher_sequence.png)

## известные проблемы

- Пожалуйста, создавайте запросы на [GitHub](https://github.com/rg-engineering/ioBroker.semp/issues) , если обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
-->
### 2.1.0 (2026-09-08)
* (René) semp protocol verifaction added
* (René) added some additional verification checks for DeviceId and others 
* (copilot) Adapter requires node.js >= 22 now
* (René) dependencies updated

### 2.0.12 (2026-04-24)
* (René) bug fix for issue #451: device base ID is editable now

### 2.0.10 (2026-04-21)
* (René) bug fix for issue #445: planning requests corrected

### 2.0.9 (2026-04-13)
* (René) bug fix in admin, see issue #442: time settings in energy request corrected

### 2.0.8 (2026-04-12)
* (René) bug fix in admin, see issue #442: time settings in energy request corrected

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.semp/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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