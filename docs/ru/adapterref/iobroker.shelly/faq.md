---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: JnJPee9cDlktLgrVB+3UuZNBND5ByJ/AxeQ6j5XT9/A=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/faq.md)

## Можно ли выполнить настройку также через приложение Shelly?
Вся документация основана на настройках веб-интерфейса устройства. Некоторые параметры могут отсутствовать в приложении. Поэтому этот метод не рекомендуется!

## Можно ли использовать CoAP (CoIoT) и MQTT одновременно?
Нет, однако можно создать второй экземпляр адаптера Shelly, который затем будет настроен для работы с MQTT (а другой — для CoAP/CoIoT).

Я не знаю, как работает MQTT; насколько он сложен в использовании?
Нет, устройства Shelly нужно настраивать только так, как описано в [здесь](protocol-mqtt.md). Адаптер Shelly позаботится обо всем остальном внутри себя.

Можно ли переключаться между CoAP (CoIoT) и MQTT?
Конфигурацию экземпляра Shelly можно изменить в любое время. Все объекты и состояния сохраняются. Изменяется только взаимодействие с устройствами.

Я настроил CoAP (CoIoT), но устройство Shelly не отображается.
Скорее всего, настроена многоадресная рассылка (`mcast`). Это работает ненадежно, поэтому следует настроить *одноадресную* рассылку. Как это сделать, описано в [здесь](protocol-coap.md).

*CoAP/CoIoT поддерживается только устройствами первого поколения (Gen1)!*

Моё устройство не распознаётся адаптером Shelly.
Либо устройство еще не указано в списке поддерживаемых устройств адаптера, либо идентификатор клиента был изменен в настройках MQTT на устройстве Shelly. Согласно [документация](protocol-mqtt.md), этот идентификатор изменять нельзя, поскольку он используется для идентификации типа устройства!

## Возможно ли подключить адаптер Shelly к существующему MQTT-брокеру?
Подключить адаптер Shelly к существующему MQTT-брокеру в сети невозможно. Адаптер Shelly запускает собственный внутренний MQTT-брокер, работающий на порту ``1882``, чтобы избежать конфликтов с другими MQTT-брокерами в той же системе.

Можно ли продолжать использовать облачное соединение, даже если адаптер Shelly уже используется?
В устройствах **первого поколения (Gen1)** невозможно одновременно использовать MQTT и облако Shelly. В этом случае для интеграции с ioBroker необходимо использовать CoAP/CoIoT, если требуется поддерживать одновременное подключение к облаку.

Устройства **2-го поколения и старше (Gen2+)** могут подключаться через MQTT, сохраняя при этом связь с облаком.

## Какие устройства Shelly могут измерять отрицательную мощность / энергию обратной связи?
См. список на форуме Shelly: https://support.shelly.cloud/de/support/solutions/articles/103000316350-welche-shelly-ger%C3%A4te-k%C3%B6nnen-negative-leistung-f%C3%BCr-zur%C3%BCckgespeiste-energie-messen