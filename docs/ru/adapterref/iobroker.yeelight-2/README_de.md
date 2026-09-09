---
chapters: {"pages":{"en/adapterref/iobroker.yeelight-2/README.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README.md"},"en/adapterref/iobroker.yeelight-2/README_de.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yeelight-2/README_de.md
title: ioBroker.yeelight-2
hash: OjcWtWtbhqSGdRkxZB/W4HovbYwhlDzDU91uZfR1dMo=
---
![Логотип](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Количество установок](http://iobroker.live/badges/yeelight-2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

# ioBroker.yeelight-2

Адаптер для дизельного двигателя steuert Yeelight Lampen. Statusänderungen durch die App работает напрямую.

## Установка

Если вы хотите использовать лампу, приложение Yeelight App «LAN-Steuerung» будет активным, чтобы вы могли его использовать и совершать действия, которые вам нужны.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Конфигурация

Lampen können manuell hinzugefügt или gesucht werden. IP, Smartname, порт и имя должны быть указаны. Der Standard-Port ist 55443. Wenn ein Leerzeichen im Namen verwendet wird, wird es durch "\_" ersetzt.

### умное имя

Включив конфигурацию, вы можете включить Smartname, автоматически включить лампочку от Cloud Adaptor и включить Alexa.

### Geräte suchen

С этой функцией лампа автоматически включается и включается. die Muche dauert ок. 20 секунд. Danach werden die gefundenen Geräte in der Tablele aufgelistet.

## Änderungsprotokoll

Этот протокол находится в дате [README.md](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/tree/master?tab=readme-ov-file#changelog) , которую можно найти.