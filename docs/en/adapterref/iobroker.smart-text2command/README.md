---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# ioBroker.smart-text2command

![Logo](https://raw.githubusercontent.com/oweitman/ioBroker.smart-text2command/main/admin/smart-text2command.png)

[![npm version](https://img.shields.io/npm/v/iobroker.smart-text2command.svg)](https://www.npmjs.com/package/iobroker.smart-text2command)
[![npm downloads](https://img.shields.io/npm/dm/iobroker.smart-text2command.svg)](https://www.npmjs.com/package/iobroker.smart-text2command)
![Installations](https://iobroker.live/badges/smart-text2command-installed.svg)
![Stable version](https://iobroker.live/badges/smart-text2command-stable.svg)

**smart-text2command** understands German and English text commands for approved
ioBroker devices. Text analysis and command processing run locally.
You can enter commands in the test lab, connect another adapter through `sendTo`,
or write text to the `input.text` state for analysis only. The adapter does not
include speech-to-text (STT); an external service can supply the recognized text.

## Quick start

You need **Node.js 22 or later** and **ioBroker Admin 8 or later**.
A virtual state under `0_userdata.0` is enough for a first test.
The [test guide for setups without physical devices](/#/docs/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md)
explains how to create one step by step.

1. Install and enable `smart-text2command`. Wait until `info.modelStatus`
   is `ready`. Training can take a while on the first start or after changes to
   the bundled training data.
2. In ioBroker **Enums**, assign the device or its channel to at least
   one **room or function**. For example, create a "Lamp" channel in the
   "Living room" with a boolean `POWER` state, role `switch`, `read: true`, and
   `write: true`.
3. Open **Devices** in the adapter settings and select **Rescan devices** if
   needed. Enable the device and approve the desired actions for its data point.
   An enabled device cannot perform an action until that action is approved.
4. Open the **Test lab**, select **Analyze**, and enter
   `Turn on the lamp in the living room`. Press **Enter** to submit it. Check the
   detected action and target state. Only **Execute** sends an approved write
   operation to ioBroker.

The Devices tab shows existing devices that have a supported capability and at
least one room or function assignment. Discovery runs when the adapter starts
and when you select **Rescan devices**. Changes to ioBroker objects after startup
appear after a rescan or adapter restart. A rescan hides objects that no longer
exist; you do not need to delete data points.

## Supported commands

| Purpose                 | Example                                                                                                                       | Requirement                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Switch a device         | "Turn on the lamp in the living room" / "Turn it off"                                                                         | Writable boolean state with role `switch`; approve `turnOn`/`turnOff`                                                      |
| Read the switch state   | "Is the lamp in the living room on?"                                                                                          | The same state must be readable; approve `getState`                                                                        |
| Set a numeric value     | "Set the brightness to 40 percent" or "Set the slats in the living room to 50 percent"                                        | Writable state with role `value`/`value.*` or `level`/`level.*`; approve `setValue`                                        |
| Read a value            | "How warm is it in the bedroom?" or "What is the value of the slats in the living room?"                                      | Readable `value`/`value.*`, `level`/`level.*`, `sensor`/`sensor.*`, or `indicator`/`indicator.*` state; approve `getValue` |
| Press a button          | "Press the UP button on the shutter in the living room"                                                                       | Writable boolean state with role `button`/`button.*`; approve `press`                                                      |
| Ask about the inventory | "Which rooms do you know?", "Which devices are in the living room?", "Which functions does the lamp in the living room have?" | Available, enabled, and approved devices                                                                                   |

An ioBroker **function** from `enum.functions.*` groups a device,
for example under "Lighting" or "Shading". A **data point** name identifies a
specific property, such as "Position" or "Slats". The adapter uses `common.name`
first, then the last segment of the state ID. You can also define device aliases
for each language. Add a new name for a device as an alias; this does not require
retraining the model.

Boolean `sensor` and `indicator` states, including their subroles, are available
as generic read-only values. Responses say `On`/`Off` in English or `An`/`Aus`
in German without inferring meanings such as open/closed or alarm/normal from
the subrole.

Numbers may arrive as words, such as "fifty percent", "twenty-one point five",
or "einundzwanzig Komma fünf". If a write command has no value, the adapter asks
for it. If the device, room, or data point is ambiguous, it asks a follow-up
question. A short reply such as "Living room", "Position", or "50 percent" is
enough; you do not need to repeat the full command.
If speech recognition produces a similar but inexact room, device, or function
name, the adapter asks you to confirm the suggested name before using it.

**Analyze** shows only the planned access. **Execute** can use only enabled
devices and explicitly approved actions. Submitting a write command does not
confirm the resulting device state; a read action can return the value it read.
Changes to a data point's target, type, read/write permissions, or value range
can invalidate its approval. Check and renew the affected approval
in the Devices tab.

The two documents provide an overview of the possibilities of command sentences.

- [English](/#/docs/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md)
- [Deutsch](/#/docs/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md)

## Manage devices and approvals

In **Devices**, you can filter by name, room, ioBroker function, and capability.
Expand cards individually or all at once. The technical ID appears next to each
device name. Each card shows room and function assignments, aliases, and the
available read and write actions for each data point. Device-wide controls let
you approve or revoke several read or write actions at once; individual controls
remain available.

Below the action approvals, you can expand the alias editor and, for readable
boolean data points, the output-word editor. Output words are optional per data
point and language; empty fields retain the default `An`/`Aus` or `On`/`Off`.

New devices are disabled by default. Before approving an action, check its
target state, data type, value range, and read/write permissions. Unknown or
security-sensitive roles and unresolved alias targets are not offered as
executable actions. The adapter relies on existing ioBroker permissions and
does not execute operating-system commands.

## Test lab and conversations

The Test lab displays user input and speakable responses as a chat. Below
the chat, technical diagnostics show the intent, confidence, detected rooms,
device and data point candidates, and planned access. **Execute** controls
whether an approved action may actually run; **Enter** submits the message.

You can answer a follow-up question with a short reply within five minutes.
While a question is open, a message such as "Stop" or "Cancel" ends the
conversation. **New session** starts a separate conversation. **Session history**
stores Test lab requests and their technical results so you can reopen or delete
earlier conversations. It keeps up to 30 sessions with 50 requests each.

In **Settings**, you can choose the default language and enable recording of
external `processText` requests in the same history. This additional recording
is **off by default**. When enabled, the history shows the source and calling
adapter. The [API guide](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md) explains separate sessions
for multiple users, `clarificationId`, expiration, and response formats.

## Custom intents

In **Intents**, you can create your own intents with training examples and one
of these action types:

- **Device action**: `turnOn`, `turnOff`, `setValue`, `press`, `getState`, or
  `getValue` on a matching, approved data point.
- **Response template**: A fixed response for each language,
  without accessing a device.
- **sendTo call**: A configured recipient, command, and JSON message template.
  Optional string and numeric parameters can be extracted from the text or
  collected through follow-up questions.

A custom intent currently needs
**at least two training examples in each configured language**.
The editor initially shows only the selected language; you can add other supported
languages individually. The examples should express the same intent with
different verbs and sentence structures. Keep reads distinct from writes, and
switching on distinct from switching off. Use realistic devices, rooms, and
values, but avoid ambiguous multi-action commands or time conditions. After
saving, retrain the model under **Training**; new examples take effect only
after training. A new model replaces the active one only after regression
checks pass, and you can restore the previous model there.

For a writable string state, you could create a `Play favorite` intent using
**Device action → Set value**. Training examples could be `Play favorite` and
`Start favorite`, plus German equivalents. After enabling the device, approving
the write action, and training, `Play favorite SWR` writes `SWR` to the
matching state. Without a value, the adapter asks for it.

**Prompt for generating more training variations:**

```text
Generate 10 German and 10 English training sentences for my ioBroker intent "<INTENT-ID>".
The intended action is: <ACTION AND MEANING>.
Examples that belong to it: <2–3 EXAMPLES>.
Similar but different intents are: <COUNTEREXAMPLES>.

Every sentence must express exactly this one intent. Vary sentence structure,
politeness, verbs, devices, rooms, and numbers/values where appropriate. Avoid
multiple actions, time conditions, exceptions, negation, and ambiguous wording.
Do not include near-duplicates or comments. Return two blocks, "de" and "en",
with one sentence per line so I can paste them directly into the input fields.
```

Check AI-generated sentences before saving them: an example with the wrong
meaning can reduce recognition accuracy for other intents. You can duplicate
an existing custom intent with the copy icon and then edit it.

### Connect a custom intent through `sendTo`

Select **sendTo call**, enter a recipient instance such as `javascript.0`,
a command such as `toScript`, and a valid JSON object. If the message contains
only fixed values, training examples are enough; leave parameters and extraction
patterns empty. A dynamic parameter occupies an entire JSON value, for
example `{"$param":"value"}`. Define its type, follow-up question, and
extraction patterns for each language. The recipient must return an object such
as `{"version":1,"status":"success","text":"Done."}` through its callback.
The adapter uses `text` as its response.
The [configuration guide](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md)
includes a complete example with a JavaScript target script.

### Export and import intents

Under **Settings**, you can select which custom intents to export. When
importing a JSON file, you can likewise select individual entries; they are
added to the existing custom intents. An existing ID is never overwritten.
Devices, aliases, and action approvals are not part of the file. Retrain the
model after importing.

The import format is UTF-8 JSON with `schemaVersion: 1` and an `intents` array.
Each ID starts with a letter, followed only by letters, digits, `_`, `-`, or `.`
(up to 100 characters). IDs starting with `device.` and the ID `None`
are reserved. Each entry needs `source: "user"`, `enabled`, at least two training
examples in each configured language, and a valid `action`.

Example of a response template:

```json
{
    "schemaVersion": 1,
    "intents": [
        {
            "id": "user.greeting",
            "source": "user",
            "enabled": true,
            "utterances": {
                "de": ["Sag Hallo", "Begrüße mich"],
                "en": ["Say hello", "Greet me"]
            },
            "action": {
                "kind": "response",
                "response": { "de": "Hallo!", "en": "Hello!" }
            }
        }
    ]
}
```

For a device action, `action` can be `{"kind":"capability","operation":"turnOn"}`.
The [sendTo action guide](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md)
describes the format for an outgoing `sendTo` call.

## Call from another adapter

Another adapter sends `processText` to `smart-text2command.0`. Each request
needs `requestId`, `text`, and `mode` (`analyze` or `execute`). The call
requires a callback; its result is in `reply.message`.

```json
{
    "requestId": "command-1",
    "sessionId": "living-room-voice-device",
    "language": "en",
    "text": "What is the temperature?",
    "mode": "execute"
}
```

If the result has `status: "clarification"`, speak its response and send the
next user input with a **new** `requestId`, the same `sessionId`, and the
returned `clarification.id` as `clarificationId`. Without `clarificationId`,
the input starts a new request. The [sendTo API documentation](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md)
shows a complete call, JSON responses, and error cases.

Alternatively, write text to `smart-text2command.0.input.text`.
This path **only analyzes** the text; it never executes a device action.
The response appears in `output.response` and the structured result in `output.result`.

## Troubleshooting

| Symptom                                          | Check                                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| A device is missing from the Devices tab         | Room or function assignment, supported state role, and `read`/`write`; then use **Rescan devices**      |
| "Action planned" instead of a device change      | **Analyze** is still selected in the Test lab                                                           |
| A device is found but the action is rejected     | Device **Enabled**, appropriate individual or device-wide approval, and data point still exists         |
| "Capability has changed"                         | Check the target state and metadata; approve the affected action again                                  |
| "I could not understand the request confidently" | Check the active model under **Training**, training examples, and aliases; inspect Test lab diagnostics |
| A follow-up question expires                     | Reply within five minutes using the same `sessionId` and `clarificationId`                              |

More information: [test guide](/#/docs/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md),
[sendTo API](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md),
[sendTo intent configuration](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md),
[development and architecture](/#/docs/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md), and
[technical specification](/#/docs/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**

-->
### 0.0.17 (2026-11-25)

- add roles sensor and indicator
- By default, the system responds to Boolean values ​​with "An/Aus" or "On/Off."
  It is also possible to define custom terms—for example, for a door, you could
  use "geöffnet/geschlossen" or "opened/closed."

### 0.0.16 (2026-11-25)

- add clarification functionality for sendto scripts

### 0.0.15 (2026-11-24)

- Performance improved; external objects are no longer continuously
  monitored for changes.

### 0.0.14 (2026-11-23)

- Implemented the option for relative values and color names

### 0.0.13 (2026-11-17)

- update advices of repochecker
- rework readme
- Own intents can now also be maintained in just a single language.
- fix test

## License

MIT. See [LICENSE](https://github.com/oweitman/ioBroker.smart-text2command/blob/main/LICENSE)
Copyright (c) 2026 oweitman <oweitman@gmx.de>".