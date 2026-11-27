---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# Example sentences for smart-text2command (English)

The sentences below illustrate the command types currently supported.
**Device, room, function, and state names are examples:** replace them with the
names or aliases in your ioBroker setup. Device names are not built into
the adapter. The device must be discovered and the action must be approved for
its state. If several devices or states match, the adapter asks you to choose.

## Lights, dimmers, and colored lights

**Switching** requires an approved switch state:

- “Turn on the lamp in the living room.”
- “Turn off the lamp in the living room.”
- “Switch the light on.”
- “Is the lamp in the living room on?”

**Brightness** requires a suitable numeric state, such as `level.brightness`
or `value.brightness`:

- “Set the lamp brightness to 40 percent.”
- “Dim the lamp to 60 percent.”
- “How bright is the lamp in the living room?”
- “Make the lamp a little brighter.”
- “Make the lamp much darker.”
- “Set the lamp to full brightness.”
- “Set the lamp to minimum.”

For a generic percentage state with role `level`, its configured name can
identify the target: “Make the lamp5 dimmer much brighter.” If several
percentage states qualify, the adapter asks which one you mean.

**Colors and white light** require `level.color.rgb` or `level.color.rgbw` for
named colors, or `level.color.temperature` for Warm White and Cool White:

- “Set lamp5 to Straw yellow.”
- “Set lamp5 to Purple.”
- “Set lamp4 to Warm White.”
- “Set lamp4 to Cool White.”
- “Make lamp5 a little more saturated.”
- “Make lamp5 paler.”
- “Make lamp4 warmer.”
- “Make lamp4 cooler.”

More color names are listed in [`resources/colors/names.json`](https://github.com/oweitman/ioBroker.smart-text2command/blob/main/resources/colors/names.json);
you can also define your own. An unknown color name triggers a question.
Relative color changes require a valid current value.
Setting a color does not automatically switch the light on.

## Thermostats and heating

Setting a temperature requires an approved target state. A temperature question
can read an approved measured state:

- “Set the heating in the living room to 21 degrees.”
- “Set the target temperature in the living room to 21.5 degrees.”
- “How warm is it in the living room?”
- “What temperature does the thermostat measure in the living room?”
- “Make the heating a little warmer.”
- “Make the heating warmer by 2 degrees.”
- “Make the heating significantly cooler.”

Relative changes support suitable °C and °F states with valid bounds and a
current value. Celsius targets are rounded to half degrees.

## Fans and other percentage controls

An approved numeric percentage state with valid bounds can be adjusted
continuously. These examples assume a device named “fan”:

- “Make the fan in the fan room faster.”
- “Make the fan a little slower.”
- “Make the fan much faster.”
- “Set the fan in the fan room to maximum.”
- “Set the fan to minimum.”

Relative changes such as “faster” require a valid current value. “To maximum”
and “to minimum” use `common.max` and `common.min` directly.
If several percentage states qualify, the adapter asks which one to use.
A state with ordered numeric keys in `common.states` can move through its
declared stages, for example “Make the fan stronger by 2 steps.” The keys must
be the actual writable values, such as `0`, `30`, `60`, and `100`; the
associated text provides labels. “Set the fan to step 2” does not currently
select a stage number directly. Use “Set the fan to 60 percent” for the second
stage when `60` is a configured value.

## Blinds and slats

These examples require approved states for blind position (`level.blind`) and
slat tilt (`level.tilt`):

- “Set the living room blind to 25 percent.”
- “What is the blind position in the living room?”
- “Set the slats in the living room to 40 percent.”
- “What is the slat tilt in the living room?”
- “Fully open the blind.”
- “Fully close the blind.”
- “Move the blind up.”
- “Make the slats steeper.”
- “Make the slats flatter.”

With the current mapping, `level.blind` uses **0% for open and 100% for closed**.
For `level.tilt`, **0% means horizontal/open and 100% vertical/closed**.
Relative direction can be inverted per state.

## Audio and media

Volume requires an approved numeric state with role `level.volume` or
`value.volume`. Track navigation requires approved `button.next` or
`button.previous` states:

- “Make the music a little louder.”
- “Make the music much quieter.”
- “Music next.”
- “Music previous.”

## Plugs, switches, and buttons

Switchable devices need an approved switch state for commands and state
questions. Named buttons need approval for the press action:

- “Turn on the plug.”
- “Turn off the plug.”
- “Is the plug on?”
- “Press the UP button on the living room blind.”
- “Push the STOP button.”

## Sensors, readings, and other states

Readable, approved states can be queried by device or state name. A writable
numeric state can be set to a specific value when the target is clear:

- “What is the room temperature?”
- “What value does the sensor have?”
- “Show the lamp brightness.”
- “What value do the slats have in the living room?”
- “Set the slat value in the living room to 60 percent.”

For an approved humidity target with a suitable role and unit, relative requests
such as “Make the humidifier more humid” or “Make the humidifier drier” are also
available. Actual behavior depends on the roles and bounds of the configured states.

## Ask about devices and rooms

- “Which rooms do you know?”
- “Which devices are in the living room?”
- “Which devices do you know?”
- “What functions does the lamp have in the living room?”
- “What can the lamp in the living room do?”

When a request is unclear, the adapter asks for the room, device, state, or
value. You can answer the question or say “Cancel”. In the test lab, an action
can first be analyzed without writing a state.