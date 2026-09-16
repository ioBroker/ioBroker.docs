---
title: Add device to voice assistant
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adddevice.md
hash: T/CGxpZ5nCX+GW90S16P24GtZf8atAMsSh+Kgtn8DMU=
---
# Add a device to the voice assistants

For Alexa, Google Home, or Yandex to understand a new device type, it's not enough to simply add it to an adapter. The type must be known in four places, and the order is important:

1. Add the **roles** if the existing ones are insufficient.
2. Expand the **type detector** to include the device.
3. Add the device to **iobroker.devices** so that it can be added and tested there.
4. Pass the device through the **IoT adapter** to Alexa, Google, etc.

## 1. Roles

Before creating a new device type, three sources must be checked, because what the assistants don't know, they can't control:

- [Alexa Smart Home API](https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html)
- [Google Smart Home](https://developers.google.com/assistant/smarthome/guides)
- [Yandex Dialogues](https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/)

It is also useful to look at an existing device in an adapter that already replicates the same functionality.

**Example: Air conditioning.** The three providers describe it with varying degrees of detail:

- [Yandex: Thermostat and air conditioning](https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/)
- [Alexa: Thermostat Controller](https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html)
- [Google: Air cooler](https://developers.google.com/assistant/smarthome/guides/aircooler)

Yandex has the most complete picture of the states, therefore it is the most sensible basis. During the comparison, it was noticed that no roles were yet documented for thermostat mode and swivel position; these are now listed under [state roles](/docs/dev/stateroles.md#klimaanlage-oder-thermostat) . The other states, such as power and setpoint temperature, were already documented.

## 2. Type detector

Once the role is determined, the [type detector](https://github.com/ioBroker/ioBroker.type-detector) is next. The new device type is added to the global list and receives an entry in the...`patterns` the class`ChannelDetector` one entry; the easiest way to do this is by using a similar device as a template.

Two factors determine whether the recognition works:

- **The set of roles must be unambiguous.** In the case of air conditioning, these are...`level.temperature` and`level.mode.thermostat` , both as`required` Marked. The detector recognizes them by this pair.
- **The order matters.** The most complex devices are at the top of the list and are tested first, the simpler ones last. Otherwise, a more general pattern will trigger a test before the more specific one gets its turn.

After that, a new version of the npm package will be released.`iobroker.type-detector` published.

## 3. iobroker.devices

In the adapter's [device settings](/adapters/devices) , the version of the type detector is updated, and the list of symbols is expanded to include the new type. This also requires a new version.

This allows the device to be created and tested in the adapter _device management section_ without requiring any actual hardware.

## 4. With the assistant

Finally, the [IoT adapter](/adapters/iot) must forward the new device type to Alexa, Google Assistant, or Yandex. Only then will the device appear in the assistant's database.

The sequence cannot be shortened. A device that the type detector does not recognize will not reach the assistants, even if all states are present.