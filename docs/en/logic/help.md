---
title: Troubleshooting
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/help.md
hash: gaMn0ubzJVKGm8AvkQxGjITSyMXJlxKwabbilgUobag=
---
# Script troubleshooting

Most logic errors aren't crashes, but rather things that silently go unnoticed. This page goes through the most common cases in the order they can be checked.

## The script does nothing.

**Is it even working?** A script will only execute once it has been activated in the list on the left using the play button. An active script is highlighted in the list. The same state is indicated by...
`javascript.<Instanz>.scriptEnabled.<Skriptname>`.

**Is the instance running?** Under _Instance_ The JavaScript instance must be green. A script in a stopped instance is enabled but still doesn't run.

**Is the status ID correct?** A non-existent ID is not an error – the trigger simply waits indefinitely. Find the ID in the object tree and copy it from there, do not type it in.

**Is the trigger too narrow?** `change: 'ne'` only solves in one case _others_ Value. A button that every time `true` sends, never changes its value and therefore never triggers. For such devices, the update (`any`) the correct trigger.

## The script is triggering too often.

The ack flag is usually the culprit. If a script writes a state, the device acknowledges the execution, and the script also responds to this acknowledgment, it runs twice – and if it writes again during this process, it runs indefinitely.

Rule of thumb: The trigger stops **Feedback** (`ack: true`), is written as **command** (`ack: false`In Blockly and in the rules, this is a selection in the trigger block; in JavaScript, it's the third parameter of `setState`.

The second common cause is a trigger on _update_ instead of
_the change_ in a sensor that reports at a fixed interval.

## Find errors in the log

Below the editor is a log window that only displays messages from the currently open script. It populates from the moment the script is started; to find a message that has already finished, check the general log under \[path to log file]. _protocol_.

In Blockly scripts, an error message identifies the line of the **generated** Codes. This code can be displayed and the line looked up via the tab above the workspace.

Level reports `debug` They only appear if the instance's protocol level is set accordingly - under _Instance_ in expert mode.

## Create a test instance

A script with a critical error can terminate the entire instance. If the heating control system is running in the same instance, it will also terminate.

Therefore: create a second JavaScript instance and run new or larger scripts there first. The instance is selected in the editor above the script. It sees the same states – the separation only affects the process, not the data.

## Typical stumbling blocks

**Two scripts do not share variables.** Not even in the same instance, not even via the folder _globa&#x6C;_&#x54;he folder _global_ It shares functions, not values. To pass on values, you create a state.

**`getState` immediately after `setState` delivers the old value.** The writing process isn't finished immediately. You can either continue working with the value you already have, or choose the version with... `Async` use.

**A value can `null` be.** An adapter that has no data yet provides no numerical value. A calculation with this value will result in... `NaN` and silently writes nonsense into the state.

**Schedules are piling up.** When a script is modified and restarted, the adapter cleans up its own schedules. Schedules that a script has created within another script are not cleaned up.

**The value is a string.** Some adapters supply `"22.5"` instead of `22.5`A comparison with `>` It then works differently than expected.

## If nothing else helps

- Reduce the script to the smallest case that still shows the error - usually the cause will be found by itself.
- Place an output directly into the trigger to see if it fires at all.
- In the [ioBroker forum](https://forum.iobroker.net) Please ask for the following information: the script, the exact wording of the error message, the adapter version, and the js-controller version.

For problems that are not due to the script but to the system, see
[Adapter error](/docs/trouble/adapter.md)
and [ioBroker is no longer working](/docs/trouble/RunsNoMore.md).