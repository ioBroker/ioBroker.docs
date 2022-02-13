---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md
title: ioBroker.shelly
hash: Y65Cchw+2llE+cACkPJipIMcUoFkdZb2VxMboLED7gM=
---
![logo](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.shelly
##MQTT
1. Open the Shelly Adapter configuration in ioBroker
2. Choose ```MQTT and HTTP``` as *protocol* in the *general settings*
3. Open the **mqtt settings** tab
4. Choose a secure username and password (you have to configure this information on your Shelly devices)

![iobroker_general](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_mqtt.png)

Activate MQTT on all your Shelly devices:

1. Open the Shelly web configuration in your web browser (not in the Shelly App!)
2. Go to ```Internet & Security settings -> Advanced - Developer settings```
3. Activate MQTT and enter the previously configured username, password and the ip address of your ioBroker installation - followed by port 1882 (e.g. ```192.168.20.242:1882```)
4. Save the configuration - the Shelly will reboot automatically

- For Gen1 devices: Do not change the ```custom MQTT prefix``` (the Adapter will not work if you change the prefix)

![shelly gen1](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen1.png)

![shelly gen2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen2.png)