---
title: JavaScript
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/javascript.md
hash: dz81L4i1e4HLKxPeo+oDp6irTGb0OXhJDus1sPsT2Lw=
---
# JavaScript

The [JavaScript adapter](/adapters/javascript) executes standard JavaScript and provides a number of additional functions for reading, writing, and monitoring state. These functions constitute the ioBroker scripting API; they are the only difference compared to JavaScript as it normally runs in Node.js.

## A first script

```js
on({ id: 'hm-rpc.0.LEQ1234567.1.STATE', change: 'ne', ack: true }, obj => {
    if (obj.state.val) {
        setState('hm-rpc.0.LEQ7654321.1.STATE', true);
    }
});
```

Translated: As soon as the motion detector reports a _change_ (`change: 'ne'` , also _not equal_ ) and it is a feedback from the device (`ack: true` ), the lamp is switched on.

## The most important functions

The complete reference with all parameters can be found in the [adapter's script documentation](/adapters/javascript) . A handful will suffice to begin with.

**Responding to changes**

| function                 | For what                                            |
| ------------------------ | --------------------------------------------------- |
| `on(muster, callback)`   | Responding to changes in one or more states         |
| `once(muster, callback)` | The same, but only the first time.                  |
| `unsubscribe(handler)`   | Cancel a subscription                               |
| `$('...')`               | Addressing multiple states at once using a selector |

**Reading and writing states**

| function                        | For what                                               |
| ------------------------------- | ------------------------------------------------------ |
| `getState(id)`                  | Get the current value                                  |
| `setState(id, wert, ack)`       | Setting a value                                        |
| `setStateChanged(id, wert)`     | Only write if the value differs.                       |
| `setStateDelayed(id, wert, ms)` | Set after a waiting period without pausing the script. |
| `existsState(id)`               | Check if the condition even exists.                    |
| `createState(name, wert)`       | Create a separate state below the instance             |

**Time**

| function                     | For what                                               |
| ---------------------------- | ------------------------------------------------------ |
| `schedule(muster, callback)` | Run recurringly at a specific time, also known as CRON |
| `getAstroDate(name)`         | Sunrise, sunset, twilight, and similar events          |
| `setTimeout` /`setInterval`  | As in any JavaScript                                   |

**Talk to other adapters**

`sendTo('telegram.0', 'send', { text: 'Fenster offen' })` Sends a message to an adapter instance. The documentation for each adapter specifies which commands an instance understands.

!>`schedule` and`setInterval` They don't survive a script restart, but they also don't survive being forgotten: If you create an interval in the script and later modify the script, intervals will accumulate. The adapter cleans up its own schedules automatically when a script is restarted.

## How a script is executed

Each script is its own separate area. Two scripts do **not** share variables – not even within the same instance. To pass values, you create a state for that purpose.

Scripts in the **global** folder are the exception: their contents are prepended to every other script. This allows you to maintain your own functions in one place and use them everywhere. However, even here, each execution gets its own copy of the variables. A global script is a shared collection of functions, not shared memory.

The adapter sets a state for each script.`javascript.<Instanz>.scriptEnabled.<Skriptname>` It indicates whether the script is running and can also be set – one script can therefore turn another on and off.

## Additional modules

The instance settings allow you to enter npm modules that will then be used in all scripts of this instance.`require` available. For everything that Node.js brings with it - such as`fs` or`http` - No entry is required.

## Log

`console.log` ,`console.warn` and`console.error` The output is written to the log below the editor and simultaneously to the ioBroker log. The log window only displays messages from the currently open script.

?> Messages on`debug` These entries only appear if the instance's protocol level is set accordingly. This is the correct level for scripts that run continuously.`info` The log is filled with each motion detection.

## Further

- [TypeScript](/docs/logic/typescript.md) - the same API with type checking
- [Best practices](/docs/logic/examples.md)
- [Troubleshooting](/docs/logic/help.md)