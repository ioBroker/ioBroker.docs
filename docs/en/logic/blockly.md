---
title: Blockly
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/blockly.md
hash: j0BfJz29f0DKANEs4S97yrEnUFvpc3bDh5cE/az3HSg=
---
# Blockly

Blockly is a graphical editor: the logic is assembled from building blocks that only snap into place where they belong. Once you've connected a trigger to an action, you've written a working program without typing a single line of code.

Blockly is part of the [JavaScript adapter](/adapters/javascript) . A new _Blockly_ script is created in the Admin section under _Scripts_ .

## How a Blockly script is structured

Almost every script begins with a **trigger** , followed by a statement of what should happen. The most common trigger is a change in state, the second most common is a time.

A script can have multiple triggers. Components that lie outside of a trigger are executed exactly once: when the script starts. This is the usual place for initial values.

## The building block groups

The palette on the left is sorted by task. The main groups are:

| group                                         | For what                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| Trigger                                       | Triggers: Change of state, schedule, astronomical times such as sunset |
| System blocks                                 | Read and write states, create objects, query states                    |
| Action blocks                                 | Log output, HTTP calls, operating system commands, email               |
| SendTo                                        | Messages to other adapters, such as Telegram, Pushover or Signal       |
| Timeouts                                      | Delays, recurring execution, cancellations                             |
| Date and time                                 | Compare and format time points, create time differences                |
| Conversion                                    | Text to number, number to text, rounding, time formats                 |
| Logic, loops, mathematics, text, lists, color | The usual programming blocks                                           |
| Variables and functions                       | Intermediate values and custom, reusable blocks                        |

The complete description of each individual building block can be found in the [Blockly reference of the JavaScript adapter](/adapters/javascript) .

## The most important component: the trigger

The trigger block for states queries three things: **which state** , **what** to react to, and **when** .

In the context of "what," the distinction between _change_ and _update_ is crucial. An update occurs every time an adapter writes the value—even if it remains the same. A change only occurs when the value actually differs. A temperature sensor that reports the same value every 30 seconds will trigger 2880 times a day if it's _an update_ , and only when the temperature changes if it's _a change_ .

The trigger also distinguishes between **ack = false** (a command to a device) and **ack = true** (the device's response). Responding to both creates feedback loops. As a rule of thumb: respond to feedback (`ack = true` ) react, commands (`ack = false` ) send it yourself.

## From building block to code

The tab above the workspace displays the generated JavaScript code for each Blockly script. This is more than just a gimmick:

- In the event of an error message in the log, the line number of the generated code is shown, not the component.
- Anyone who wants to continue a Blockly script in JavaScript later has the template. The reverse is not possible – JavaScript cannot be used to create building blocks.

## When Blockly no longer wears

Blockly becomes unwieldy as soon as

- The same chain would have to be repeated for ten lamps.
- Data is kept in lists or tables
- The workspace can only be viewed with a strong zoom.

Then it's time to switch to [JavaScript](/docs/logic/javascript.md) . A script doesn't need to be completely migrated: Blockly scripts and JavaScript scripts run side-by-side and exchange information about their states.

## Help with building

The JavaScript adapter includes an AI code generator that can also generate Blockly scripts. It requires access to a language model, which is configured in the instance settings; in addition to OpenAI, other providers and locally hosted models can also be used. The setup process is described in the [adapter documentation](/adapters/javascript) .

The generated code is a suggestion, not a result. It should be read and tested in a test instance before being deployed to the heating system.