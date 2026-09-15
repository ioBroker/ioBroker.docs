---
title: Alexa Smart Home Skill
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/alexasmart.md
hash: wqPl4U6FTDIXtdZvRd984GFRGO6rgEA7Zr5E3sPLUKQ=
---
# The Alexa Smart Home Skill

With the Smart Home skill, devices from ioBroker become regular smart home devices for Alexa. They appear in the Alexa app, can be assigned to groups and routines, and are controlled with standard commands.

- "Alexa, turn on the light in the living room."
- "Alexa, set the heating in the bathroom to 21 degrees."
- "Alexa, dim the kitchen lights to 30 percent"

No configuration is required with Alexa for these commands. They are part of Alexa's built-in language set. ioBroker only provides the device list.

## Distinction from Custom Skill

|          | Smart home skill                                 | [Custom Skill](/docs/cloud/alexacustom.md) |
| -------- | ------------------------------------------------ | ------------------------------------------ |
| commands | Suggested by Alexa                               | Free, via the call`i o Broker`             |
| Good for | Switching, dimming, temperature, roller shutters | Status queries, scenes, custom workflows   |
| Expense  | Select devices, done                             | Define commands yourself                   |

Both can be operated simultaneously and complement each other: the smart home skill for everyday use, the custom skill for everything for which Alexa has no suitable phrase.

## Furnish

The smart home skill is part of the [IoT adapter](/docs/cloud/iot.md) . The complete process is described there: Create an account at ioBroker.pro, set up an instance, check the connection, activate the skill in the Alexa app and link it to the account. Then start the device search in the Alexa app.

## Which devices does Alexa see?

The device list is stored in the configuration of the IoT instance. The adapter suggests it automatically, based on the [categories](/docs/basics/enums.md) and [roles](/docs/basics/roles.md) of the data points. The name is derived from the room and function, and the device type from the role.

Therefore, maintaining the categories here is doubly worthwhile. A data point without a room and function won't even appear in Alexa, and the assignment belongs to the **data point** , not to the device or the channel.

In this list, you can rename, turn off, or assign each device to a different room. The name in this list is the name you will use when speaking the device.

Names that Alexa understands well are short, German, and unambiguous.`hm-rpc.0
Wohnzimmer Deckenlampe LEVEL` doesn't work,`Deckenlampe` Yes. Two devices with similar names cause Alexa to switch on the wrong one.

## If a device does not appear

1. Is it listed in the device list of the IoT instance? If not, it's missing a room, function, or a suitable role.
2. Was the device search restarted in the Alexa app after the change? New devices don't appear automatically.
3. Is the connection established? The status of the IoT instance and the [protocol](/docs/admin/log.md) provide this information.
4. Has the quota of requests been exhausted? The limits are listed under [IoT](/docs/cloud/iot.md) .

## What the skill cannot do

Alexa has a fixed set of commands for each type of device. Anything beyond that, such as follow-up questions, reading out measurement values, or multi-stage processes, belongs in a [custom skill](/docs/cloud/alexacustom.md) or an Alexa routine that controls an ioBroker data point.