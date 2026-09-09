---
title: The first automation
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/logic.md
hash: JExuqNaNxHMoB9L/rmJ4QNncOJUqbGrnRXFPSHcDluY=
---
# The first automation

Up to this point, ioBroker has been collecting data. Now we want something to happen automatically. We'll build the simplest, most sensible rule: **When a situation changes, do something.**&#x45;verything else is a variation of that.

## What you need

The **JavaScript**-Adapter. It brings Blockly, rules, JavaScript and TypeScript with it, so all four methods at once.

1. In the rider [adapter](/docs/admin/adapter.md)
   after `javascript` search and create an instance.
2. Then the new tab appears on the left. **Scripts**.

You also need two data points: one that changes and one that you are authorized to set. If you haven't connected any devices yet, you can do so in the tab.
[objects](/docs/admin/objects.md) under
`0_userdata.0` two separate data points, one of type _Number_ and one of the type _Logic valu&#x65;_&#x54;his is the most convenient way to practice because you can adjust both by hand.

## Blockly or text

|           | Blockly                         | JavaScript                         |
| --------- | ------------------------------- | ---------------------------------- |
| operation | Assembling the building blocks  | Tap                                |
| Good for  | Getting started and clear rules | Anything that gets longer          |
| Mistake   | Almost no typos possible        | Typographical errors are possible. |

For the first rule, we'll use Blockly. Switching later is easy: Blockly generates JavaScript in the background, and you can view it.

## The rule builds

1. In the rider **Scripts** Create a new Blockly script and give it a name that will later indicate what it does.
2. From the group **Trigger** Take the building block for the state change and place it on the workspace. It asks three things: which state, what it should react to, and what type of change.
3. Select the data point to be observed.
4. From the group **Actions** the building block for setting a state
   **below** Insert the trigger and enter the second data point and the desired value there.
5. Save and start the script.

To try it out, manually change the first data point in the Objects tab and see if the second one follows.

?> Building blocks that **outside** The events triggered by a single event only run once, namely when the script starts. This is one of the most common sources of confusion for beginners.

## The three classic beginner mistakes

**Confusing command and feedback.** Each condition, in addition to its value, bears a characteristic: `ack = false` means "someone wants that", `ack = true` This means "that's how it is." A trigger that reacts to both fires twice.

**The feedback loop.** Script A modifies data point 1, which triggers script B, which modifies data point 2, which in turn triggers script A. This is visible in the log as the same lines appearing in rapid succession.

**Too much in one script.** It's better to have several small scripts with descriptive names than one that can do everything. Otherwise, in six months you won't even remember why the light turns on.

## If it doesn't

Each script has its own log output, and in the tab
[Protocols](/docs/admin/log.md) This indicates what the JavaScript instance encountered difficulties with. A log entry is the most useful tool for troubleshooting: it shows whether the trigger actually fired.

## What happens next?

The individual building block groups and the transition to JavaScript are described below.
[Blockly](/docs/logic/blockly.md)An overview of all ways to write logic can be found at
[Logic and automation](/docs/logic/README.md).

Next in the tutorial:
[The first visualization](/docs/tutorial/viz.md).