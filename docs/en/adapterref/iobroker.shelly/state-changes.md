---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-coap.md"},"en/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/restricted-login.md"},"en/adapterref/iobroker.shelly/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/state-changes.md"}}}
---
![Logo](../../admin/shelly.png)

# ioBroker.shelly

## State changes

By default, only if a value of a state changes, you will see the change. In this case *Update objects even if there is no value change* is deactivated.

Example:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 **10:20:00**) - there is no change shown in ioBroker because value is the same
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Last Changed Timestamp: 01.02.2020 10:22:00)

If you activate *Update objects even if there is no value change*, the state will be updated without a value change. The only thing that will be changed in this case is the *Last Changed Timestamp*

Example:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 **10:21:00**) - timestamp change  in ioBroker, value is the same
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Last Changed Timestamp: 01.02.2020 10:22:00)