---
title: Troubleshooting
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/help.md
hash: gaMn0ubzJVKGm8AvkQxGjITSyMXJlxKwabbilgUobag=
---
# Script debugging
Most logic errors aren't crashes, but rather things that silently go unnoticed. This page goes through the most common cases in the order they can be checked.

## The script does nothing
**Is it even running?** A script only executes when it has been activated in the list on the left using the play button. An active script is highlighted in the list. `javascript.<Instanz>.scriptEnabled.<Skriptname>` indicates the same state.

**Is the instance running?** Under *Instances*, the JavaScript instance must be green.

A script in a stopped instance is enabled but still not running.

**Is the state ID correct?** A non-existent ID is not an error - the trigger simply waits indefinitely. Find the ID in the object tree and copy it from there, do not type it in.

**Is the trigger too narrow?** `change: 'ne'` only triggers at a *different* value. A button that sends `true` every time never changes its value and therefore never triggers. For such devices, the update (`any`) is the correct trigger.

## The script is triggering too often
The ack flag is usually the culprit. If a script writes a state, the device acknowledges the execution, and the script also responds to this acknowledgment, it runs twice - and if it writes again during this process, it runs indefinitely.

Rule of thumb: The trigger listens for **feedback** (`ack: true`), and is written as a **command** (`ack: false`). In Blockly and in the rules, this is a selection in the trigger block; in JavaScript, it's the third parameter of `setState`.

The second common cause is a trigger on *update* instead of *change* for a sensor that reports at a fixed interval.

## Finding errors in the log
Below the editor is a log window that only displays messages from the currently open script. It populates from the moment the script is started; to find a message that has already finished, check the general log under *Log*.

Blockly scripts display an error message indicating the line of code that was generated.

This code can be viewed and the line number looked up via the tab above the workspace.

Messages of level `debug` only appear if the protocol level of the instance is set accordingly - under *Instances* in expert mode.

## Create a test instance
A script with a critical error can terminate the entire instance. If the heating control system is running in the same instance, it will also terminate.

Therefore: create a second JavaScript instance and run new or larger scripts there first. The instance is selected in the editor above the script. It sees the same states - the separation only affects the process, not the data.

## Typical stumbling blocks
**Two scripts do not share variables.** Not even within the same instance, not even across the *global* folder. The *global* folder shares functions, not values. To pass values, create a state.

**`getState` directly after `setState` returns the old value.** The writing process is not immediately complete. Either continue working with the value you already have, or use the variant with `Async`.

**A value can be `null`.** An adapter that has no data yet will not return a numerical value. A calculation with this value will result in `NaN` and silently write nonsense to the state.

**Schedules accumulate.** When a script is modified and restarted, the adapter cleans up its own schedules. It does not clean up schedules that one script has created within another.

**The value is a string.** Some adapters return `"22.5"` instead of `22.5`.

A comparison with `>` then behaves differently than expected.

## If nothing else helps
* Reduce the script to the smallest case that still contains the error

shows that the cause usually reveals itself.

* Set an output directly in the trigger to see if it even works.

fires.

* Ask in the [ioBroker forum](https://forum.iobroker.net). This includes: the

Script, the error message verbatim, the adapter version and the js-controller version.

For problems that are not due to the script but to the system, see [Adapter error](/docs/trouble/adapter.md) and [ioBroker is no longer working](/docs/trouble/RunsNoMore.md).