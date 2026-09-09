---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_cloud/010_zugriff_von_unterwegs.md
title: no title
hash: cd3CIIp/qkLefvv3uzebWb5of4kE8rQXmNF5t3mTOFU=
---
## How can I access ioBroker while on the go?

The simplest way is the [IoT adapter](/adapters/iot) . It establishes the connection from the inside to the outside. Therefore **, no port needs to be opened in the router** , and a separate certificate is not required.

!> Port forwarding to the admin account is strongly discouraged. By default, the admin account does not have login credentials; exposing it to the internet is like exposing your entire system.

## Alexa and Google Home

Both run via the same IoT adapter. In broad strokes:

1. Create a free account on [iobroker.pro](https://iobroker.pro) .
2. Install the **IoT** adapter and enter the access data.
3. The cleanest way to select the devices to be enabled is via the _devices_ adapter or via rooms and functions in the [Categories](/docs/admin/enums.md) tab.
4. Link the ioBroker service in the Alexa or Google app and have it search for devices.

For "Turn off the light in the living room" to work, the room and function must be maintained at the **data point** , not at the device or channel.

Detailed instructions, including troubleshooting, can be found in the documentation for the IoT adapter.