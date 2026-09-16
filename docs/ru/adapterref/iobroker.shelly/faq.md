---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"},"de/adapterref/iobroker.shelly/devicemanager.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/devicemanager.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: hYWB6SHDURIxSvya1hE7KTTQSAzyOEOr4kdtaop7b0Y=
---
![логотип](../../../de/admin/shelly.png)

# ioBroker.shelly

Это немецкая версия документации - [🇺🇸 Английская версия](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/master/docs/en/faq.md)

## Можно ли выполнить настройку также через приложение Shelly?

Вся документация основана на настройках веб-интерфейса устройства. Некоторые параметры могут отсутствовать в приложении. Поэтому этот метод не рекомендуется!

## Возможно ли одновременное использование CoAP (CoIoT) и MQTT?

Нет, однако можно создать второй экземпляр адаптера Shelly, который затем будет настроен для работы с MQTT (а другой — для CoAP/CoIoT).

## Я не знаю, как работает MQTT; насколько он сложен в использовании?

Нет, устройства Shelly нужно только настроить, как описано [здесь](/#/docs/adapterref/iobroker.shelly/protocol-mqtt.md) . Адаптер Shelly позаботится обо всем остальном внутри себя.

## Можно ли переключаться между CoAP (CoIoT) и MQTT?

Конфигурацию экземпляра Shelly можно изменить в любое время. Все объекты и состояния сохраняются. Изменяется только взаимодействие с устройствами.

## Я настроил CoAP (CoIoT), но устройство Shelly не отображается.

Скорее всего, это многоадресная рассылка.`mcast` Настроено. Это работает ненадежно, поэтому необходимо настроить _одноадресную передачу_ . Как это сделать, описано [здесь](/#/docs/adapterref/iobroker.shelly/protocol-coap.md) .

_Поддержка CoAP/CoIoT доступна только для устройств первого поколения (Gen1)!_

## Моё устройство не распознаётся адаптером Shelly.

Либо устройство еще не указано в списке поддерживаемых устройств адаптера, либо идентификатор клиента был изменен в настройках MQTT на устройстве Shelly. Согласно [документации](/#/docs/adapterref/iobroker.shelly/protocol-mqtt.md) , этот идентификатор изменять нельзя, поскольку он используется для идентификации типа устройства!

## Возможно ли подключить адаптер Shelly к существующему MQTT-брокеру?

Подключить адаптер Shelly к существующему MQTT-брокеру в сети невозможно. Адаптер Shelly запускает собственный внутренний MQTT-брокер, работающий на этом порту.`1882` Это сделано для предотвращения конфликтов с другими MQTT-брокерами в той же системе.

## Можно ли продолжать использовать облачное соединение, даже если адаптер Shelly уже используется?

В устройствах **первого поколения (Gen1)** невозможно одновременно использовать MQTT и облако Shelly. В этом случае для интеграции с ioBroker, если требуется одновременное подключение к облаку, необходимо использовать CoAP/CoIoT.

Устройства **Gen2+** можно подключать через MQTT, сохраняя при этом связь с облаком.

## Какие устройства Shelly могут измерять отрицательную мощность/рециркуляцию энергии?

Список можно посмотреть на форуме Шелли:\
&#x20;<https://support.shelly.cloud/de/support/solutions/articles/103000316350-welche-shelly-ger%C3%A4te-k%C3%B6nnen-negative-leistung-f%C3%BCr-zur%C3%BCckgespeiste-energie-messen>