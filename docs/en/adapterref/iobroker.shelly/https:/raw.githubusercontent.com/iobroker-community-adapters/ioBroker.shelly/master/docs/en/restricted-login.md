---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md
title: ioBroker.shelly
hash: EGaADnnibnxatRZByNCswqiZD/5YEwI6XQehKJ3UB/4=
---
![logo](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.shelly
## Restricted login
To protect your Shelly devices with a restricted login, choose a username and a password in the ioBroker configuration on the *general settings* tab.

![iobroker_general_restrict_login](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_restrict_login.png)

Activate the login restriction on all your Shelly devices.

**Generation 2 devices don't provide a username option. If you use Gen 1 and Gen 2 devices, use the same password on all devices.**

### Gen 1
1. Open the Shelly web configuration in your web browser (not in the Shelly App!)
2. Go to ```Internet & Security settings -> Restricted Login```
3. Activate the checkbox and enter the previously configured username and password
4. Save the configuration - the Shelly will reboot automatically
5. Ensure to configure the same username and password on all your Shelly devices

![shelly gene 1](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen1.png)

### Gen 2
1. Open the Shelly web configuration in your web browser (not in the Shelly App!)
2. Go to ```Device -> Authentication```
3. Enable the authentication feature and enter the previously configured password
4. Save the configuration

![shelly gene 2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen2.png)