---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: KQthFLMbBqvB2XPYBIcGynnO7ygCWHkWE7rsnXuKQlk=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/faq.md).

## Можете ли вы использовать CoAP и MQTT одновременно?
Нет, но вы можете создать второй экземпляр адаптера Shelly, который затем будет настроен для MQTT (а другой для CoAP).

## Я не знаю, как работает MQTT, сложно ли им пользоваться?
Нет, вам просто нужно настроить устройства Shelly, как объясняет [здесь](protocol-mqtt.md). Адаптер Shelly сделает все остальное самостоятельно.

## Могу ли я переключаться между CoAP и MQTT?
Вы можете изменить конфигурацию экземпляра Shelly в любое время. Все объекты и состояния останутся прежними. Меняется только связь с устройствами.

## Можно ли подключить адаптер Shelly к существующему MQTT-брокеру?
Невозможно подключить адаптер Shelly к существующему брокеру MQTT в вашей сети. Адаптер Shelly запускает свой собственный брокер MQTT внутри, который запускается на порту ``1882``, чтобы избежать конфликта с другими MQTT-брокерами в той же системе.

## Могу ли я по-прежнему использовать облачное соединение при использовании адаптера Shelly?
Если вы используете устройства **Generation 1 (Gen1)**, вы не сможете использовать MQTT и Shelly Cloud одновременно. В этом случае CoAP/CoIoT необходимо использовать для интеграции ioBroker, если одновременно должно существовать облачное соединение.

**Устройства поколения 2 (Gen2)** можно подключать через MQTT, сохраняя при этом облачное соединение.