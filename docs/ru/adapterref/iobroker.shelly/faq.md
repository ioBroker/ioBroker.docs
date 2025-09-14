---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: uQfzqoWLL+OdUCyI8jyCYSMf4WG5TQUQ/fPAMi5pjy0=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Немецкая версия](../en/faq.md)

## Можно ли также выполнить настройку с помощью приложения Shelly?
Вся документация основана на настройках веб-интерфейса устройства. Некоторые опции могут отсутствовать в приложении. Поэтому такой подход не рекомендуется!

## Можно ли использовать CoAP (CoIoT) и MQTT одновременно?
Нет, но вы можете создать второй экземпляр адаптера Shelly, который затем будет настроен для MQTT (а другой — для CoAP/CoIoT).

## Я не знаю, как работает MQTT, сложно ли его использовать?
Нет, вам просто нужно настроить устройства Shelly, как описано в [здесь](protocol-mqtt.md). Адаптер Shelly сделает всё остальное самостоятельно.

## Могу ли я переключаться между CoAP (CoIoT) и MQTT?
Вы можете изменить конфигурацию экземпляра Shelly в любое время. Все объекты и состояния останутся прежними. Изменится только взаимодействие с устройствами.

## Я настроил CoAP (CoIoT), но Shelly не появляется
Скорее всего, настроена многоадресная передача `mcast`. Это работает ненадёжно, поэтому следует настроить *unicast*. Как это сделать, описано в [здесь](protocol-coap.md).

*CoAP/CoIoT поддерживается только устройствами поколения 1 (Gen1)!*

## Мое устройство не распознается адаптером Shelly
Либо устройство ещё не указано в списке поддерживаемых адаптером устройств, либо идентификатор клиента был изменён в настройках MQTT на Shelly. Согласно [документация](protocol-mqtt.md), этот идентификатор менять нельзя, так как он используется для определения типа устройства!

## Можно ли подключить адаптер Shelly к существующему брокеру MQTT?
Адаптер Shelly невозможно подключить к существующему брокеру MQTT в вашей сети. Адаптер Shelly запускает собственный брокер MQTT внутри себя, используя порт ``1882``, чтобы избежать конфликтов с другими брокерами MQTT в той же системе.

## Могу ли я использовать облачное соединение, если работаю с адаптером Shelly?
При использовании устройств первого поколения (Gen1) вы не сможете одновременно использовать MQTT и облако Shelly. В этом случае вам потребуется использовать CoAP/CoIoT для интеграции с ioBroker, если вы хотите поддерживать одновременное подключение к облаку.

Устройства **Generation 2+ (Gen2+)** можно подключать через MQTT, сохраняя при этом соединение с облаком.

## Какие устройства Shelly могут измерять отрицательную мощность/обратную энергию?
Смотрите список на форуме Shelly: https://support.shelly.cloud/de/support/solutions/articles/103000316350-welche-shelly-ger%C3%A4te-k%C3%B6nnen-negative-leistung-f%C3%BCr-zur%C3%BCckgespeiste-energie-messen