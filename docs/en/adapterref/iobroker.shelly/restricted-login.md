---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-coap.md"},"en/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/restricted-login.md"},"en/adapterref/iobroker.shelly/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/state-changes.md"}}}
---
![Logo](../../admin/shelly.png)

# ioBroker.shelly

## Restricted login

To protect your Shelly devices with a restricted login, choose a username and a password in the ioBroker configuration on the *general settings* tab.

![iobroker_general_restrict_login](./img/iobroker_general_restrict_login.png)

Activate the login restriction on all your Shelly devices.

**Generation 2 devices don't provide a username option. If you use Gen 1 and Gen 2 devices, use the same password on all devices.**

### Gen 1

1. Open the Shelly web configuration in your webbrowser (not in the Shelly App!)
2. Go to ```Internet & Security settings -> Restricted Login```
3. Activate the checkbox and enter the previously configured username and password
4. Save the configuration - the Shelly will reboot automatically
5. Ensure to configure the same username and password on all your Shelly devices

![shelly gen 1](./img/shelly_restrict_login-gen1.png)

### Gen 2

1. Open the Shelly web configuration in your webbrowser (not in the Shelly App!)
2. Go to ```Device -> Authentication```
3. Enable the authentication feature and enter the previously configured password
4. Save the configuration

![shelly gen 2](./img/shelly_restrict_login-gen2.png)