---
title: Logic & Automation
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/README.md
hash: PEbkWuzMbIUadnOX2EnHr0nuYfAYqtLH7G+66GpwPrA=
---
# Logic and automation

ioBroker collects data: a temperature, a switching state, a time. Only the logic turns this into a smart home. It observes states, makes decisions, and sets other states – "if the balcony door is open for more than five minutes and the heating is on, then turn off the heating and send a message to the phone."

There are several ways to write this logic. They are not mutually exclusive: in a mature installation, graphical rules and JavaScript exist side by side, each in the position that requires the least effort.

## Where the logic runs

Most of the paths belong to **a** adapter, the
[JavaScript adapter](/adapters/javascript)After installation, it brings up the tab. _Scripts_ It accesses the admin interface and runs Blockly, rules, JavaScript, and TypeScript there. Anyone wanting to use one of these four only needs to install this one adapter.

Two other options are using their own adapters:
[node-red](/adapters/node-red)
It includes the Node-RED Flow Editor, and
[scenes](/adapters/scenes)
It saves scenes without requiring any programming.

## The routes at a glance

| Away                                    | What it is                                                        | adapter    |
| --------------------------------------- | ----------------------------------------------------------------- | ---------- |
| [Blockly](/docs/logic/blockly.md)       | Graphic building blocks that can be slotted together              | JavaScript |
| Regulate                                | A form based on the template _if - then_, without building blocks | JavaScript |
| [JavaScript](/docs/logic/javascript.md) | The full programming language with the ioBroker scripting API     | JavaScript |
| [TypeScript](/docs/logic/typescript.md) | JavaScript with type checking before startup                      | JavaScript |
| [Node-RED](/docs/logic/nodered.md)      | A dedicated editor where nodes are connected with lines.          | node-red   |
| scenes                                  | A list of states and their target values, not a program           | scenes     |

## Which path for what

**scenes** These are not programs, but rather stored situations: "Television" sets five lamps to specific values. Anyone who only needs such situations doesn't need logic, but rather the scenes adapter. Scenes can later be recalled from any of the other methods.

**Regulate** are the quickest entry point if automation truly follows the pattern _If this state occurs, then that action is taken._ This follows. Nothing is assembled, but rather selected.

**Blockly** Blockly is the right approach when multiple conditions, delays, or loops come into play, and nobody wants to write code. It's not a toy version: the building blocks cover most of the scripting API, and the generated JavaScript code can be viewed from any Blockly script.

**JavaScript** It becomes worthwhile as soon as a script becomes unwieldy – many similar cases, custom functions, data structures, npm modules. A Blockly script with thirty building blocks is usually ten lines of JavaScript.

**TypeScript** JavaScript with pre-run checks is useful. It's worthwhile for longer scripts that you rarely access and therefore don't remember.

**Node-RED** Its strength lies in situations where data from many sources converges and is processed – protocols, HTTP requests, queues. For "if motion, then light," it's the more complex approach, as it runs as a separate process alongside ioBroker.

One approach doesn't exclude the other. It's common to keep simple automations as rules or in Blockly, and only use JavaScript for what would be cumbersome there.

## This applies to all routes

No matter which path is chosen, three things are always the same.

**Logic reacts, it does not ask.** A script that checks every second for changes is almost always wrong. ioBroker automatically reports every change; the logic then uses this report. This is not only more efficient, but also more accurate.

**The ack flag separates the command and the response.** Each state carries a flag in addition to its value. `ack`. `ack: false` means "this is a command to the device",
`ack: true` This means "the device reports that it is so." If you don't differentiate between the triggers, you create loops: the script switches, the device confirms, the confirmation triggers the script again. More details below.
[Conditions](/docs/basics/states.md).

**States are our collective memory.** Scripts do not share variables – not even two scripts within the same instance. If one script needs to communicate something to another, it does so via state.

## Begin

1. In the admin area under _adapter_ Install the JavaScript adapter and create an instance.
2. Enter the geo-coordinates in the instance settings. Without them, sunrise and sunset cannot be calculated, and you need them quickly.
3. The new rider _Scripts_ It appears. There, on the left, create a new script using the leaf icon and select the type - rules, Blockly, JavaScript or TypeScript.
4. The script will only be executed when it is activated via the play button.

For initial testing, a second JavaScript instance is recommended. A critical error will then only terminate this test instance and not the one running the heating control system. More information can be found at \[link to relevant section].
[Troubleshooting](/docs/logic/help.md).

## Further

- [Blockly](/docs/logic/blockly.md)
- [JavaScript](/docs/logic/javascript.md)
- [TypeScript](/docs/logic/typescript.md)
- [Node-RED](/docs/logic/nodered.md)
- [Troubleshooting](/docs/logic/help.md)
- [Best practices](/docs/logic/examples.md)