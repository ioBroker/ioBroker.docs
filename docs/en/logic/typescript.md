---
title: TypeScript
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/typescript.md
hash: v2Xn0gKtWTCbNDYNBD0MzIkQ9JXitf8QnfOGUThlwt4=
---
# TypeScript

TypeScript is JavaScript with types. The [JavaScript adapter](/adapters/javascript) translates a TypeScript script to JavaScript upon saving and executes the result. Nothing changes for the script API.`on` ,`setState` ,`schedule` and everything else is called and works the same way as in [JavaScript](/docs/logic/javascript.md) .

The difference lies before the start. Where JavaScript only reports an error when the affected line is executed – possibly weeks later, in the middle of the night – TypeScript rejects it upon saving.

## Invest

When creating a new script, _TypeScript_ is selected as the type. An existing JavaScript script cannot be switched to TypeScript; however, its content can be copied into a new TypeScript script, because valid JavaScript is also valid TypeScript.

## What it brings

```ts
const id = 'hm-rpc.0.LEQ1234567.1.STATE';

on({ id, change: 'ne', ack: true }, obj => {
    // obj.state.val ist als ioBroker.StateValue bekannt
    const helligkeit: number = obj.state.val as number;
    setState('deconz.0.Lights.1.bri', helligkeit);
});
```

The editor recognizes the types of the script API and the included libraries. In practical terms, this means that after a period, it suggests what's actually there, a misspelled function name is immediately highlighted, and`getState(...)` It doesn't deliver just anything, but a state with`val` ,`ack` and`ts` .

## Translator settings

The instance settings have a dedicated _TypeScript_ tab where the translation options for all scripts in this instance are set.

The rigorous examination (`strict` The \`state\` flag is disabled for scripts, although TypeScript has enabled it automatically since version 6. This is intentional: state values are inherently uncertain, and with`strict` Every access to`obj.state.val` It will be secured. Those who want stricter protection can activate it in this tab.

## When it's worth it

TypeScript isn't worthwhile for every three-liner. It's worthwhile when

- the script is longer than about fifty lines,
- it is rarely touched and therefore one no longer remembers its construction
- It works with data structures - lists of rooms, allocation tables, configurations in the script header,
- An external library is included, the calls to which one does not know by heart.

For the "if motion, then light" scenario, the effort outweighs the benefit. [Blockly](/docs/logic/blockly.md) or a rule-based approach is a better solution.

## Please note

- A translation error is preventing the script from starting. The message appears in the log window below the editor and specifies the line and column.
- The line numbers in runtime errors refer to the translated code and may differ from the editor.
- Values from states are initially undefined for TypeScript.`as number` Or a check in the code is the usual way - and the check is the better answer anyway, because an adapter can certainly`null` delivery.