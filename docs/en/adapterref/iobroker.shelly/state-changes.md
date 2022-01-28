---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.shelly/state-changes.md
title: ioBroker.shelly
hash: /CtJFOi7c6OZS8TDpUPQzlWXdoqcwtTIhw+TzVPRW/Q=
---
![logo](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
## State changes
By default, a state is only updated when the value changes. In this case, *Update objects even if there is no value change* is disabled.

Example:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Time of last change: 02/01/2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (time of last change: 02/01/2020 **10:20:00**) - the status in the ioBroker is not updated
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Time of last change: 02/01/2020 10:22:00)

If you activate *Update objects even if there is no value change*, all states are constantly updated even if there is no value change. So only the time of the last update changes.

Example:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Time of last change: 02/01/2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (time of last change: 02/01/2020 **10:21:00**) - the time is updated although there was no value change
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Time of last change: 02/01/2020 10:22:00)