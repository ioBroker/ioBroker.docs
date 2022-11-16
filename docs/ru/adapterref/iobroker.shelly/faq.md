---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/faq.md
title: ioBroker.шелли
hash: NDDhNg0fxdi8wrvTfPp4zBUw+iKban+8GM5Y/yH/Uc4=
---
![логотип](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.шелли
## Могу ли я одновременно использовать CoAP и MQTT?
Нет, но вы можете создать второй экземпляр адаптера Shelly, который затем будет настроен для MQTT (а другой — для CoAP).

## Я не знаю, как работает MQTT, сложно ли им пользоваться?
Нет, вам просто нужно настроить устройства Shelly, как объясняется в [здесь](protocol-mqtt.md). Адаптер Shelly делает все остальное внутри.

## Могу ли я переключаться между CoAP и MQTT?
Вы можете изменить конфигурацию экземпляра Shelly в любое время. Все объекты и состояния останутся прежними. Меняется только связь с устройствами.

## Можно ли подключить адаптер Shelly к существующему брокеру MQTT?
Невозможно подключить адаптер Shelly к существующему брокеру MQTT в вашей сети. Адаптер Shelly запускает своего собственного брокера MQTT, который запускается на порту `1882``, чтобы избежать конфликта с другими брокерами MQTT в той же системе.

## Могу ли я по-прежнему использовать облачное соединение при работе с адаптером Shelly?
Если вы используете устройства **Поколения 1**, вы не можете одновременно использовать MQTT и облако Shelly. В этом случае CoAP должен использоваться для интеграции, если облачное соединение должно существовать одновременно.

Устройства **Поколения 2** можно подключать через MQTT, сохраняя облачное соединение.