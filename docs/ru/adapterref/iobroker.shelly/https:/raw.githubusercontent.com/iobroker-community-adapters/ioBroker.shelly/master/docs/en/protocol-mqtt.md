---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md
title: ioBroker.шелли
hash: Y65Cchw+2llE+cACkPJipIMcUoFkdZb2VxMboLED7gM=
---
![логотип](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.шелли
##MQTT
1. Откройте конфигурацию адаптера Shelly в ioBroker.
2. Выберите ```MQTT и HTTP``` в качестве *протокола* в *общих настройках*.
3. Откройте вкладку **Настройки mqtt**.
4. Выберите безопасное имя пользователя и пароль (вы должны настроить эту информацию на своих устройствах Shelly).

![iobroker_general](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_mqtt.png)

Активируйте MQTT на всех ваших устройствах Shelly:

1. Откройте веб-конфигурацию Shelly в веб-браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности» -> «Дополнительно» — «Настройки разработчика».
3. Активируйте MQTT и введите ранее настроенное имя пользователя, пароль и IP-адрес вашей установки ioBroker, а затем порт 1882 (например, ```192.168.20.242:1882```)
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.

- Для устройств Gen1: не меняйте «пользовательский префикс MQTT» (адаптер не будет работать, если вы измените префикс).

![Шелли gen1](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen1.png)

![Шелли Gen2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen2.png)