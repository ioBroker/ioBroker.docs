---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_cloud/010_zugriff_von_unterwegs.md
title: no title
hash: cd3CIIp/qkLefvv3uzebWb5of4kE8rQXmNF5t3mTOFU=
---
## How can I access ioBroker while on the go?

The easy way is the
[IoT adapter](/adapters/iot)He establishes the connection from the inside out. Therefore, it must be **No port should be opened in the router**, and a separate certificate is not required either.

!> Port forwarding to the admin account is strongly discouraged. By default, the admin account does not have login credentials; exposing it to the internet is like exposing your entire system.

## Alexa and Google Home

Both run via the same IoT adapter. In broad strokes:

1. A free account on [iobroker.pro](https://iobroker.pro) invest.
2. The adapter **IoT** Install and enter the access data.
3. Selecting the devices to be enabled is best done via the adapter. _devices_ or via rooms and functions in the tab
   [Categories](/docs/admin/enums.md).
4. Link the ioBroker service in the Alexa or Google app and have it search for devices.

For "Turn off the light in the living room" to work, the room and its function must be configured correctly. **Data point** be well-maintained, not on the device or channel.

Detailed instructions, including troubleshooting, can be found in the documentation for the IoT adapter.