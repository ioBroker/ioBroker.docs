---
title: Best practices
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/examples.md
hash: NLFc6tKpQEwEMaq58rMuuCo0I3ZJwz3dLJMrjrmj/l4=
---
# Best practices

The following points apply to all ways of building logic – to rules and Blockly as well as to JavaScript. They are based on the most frequently reported errors in the forum.

## React instead of asking

A script that checks every second for changes is almost always the wrong approach. ioBroker reports every change automatically. A trigger based on the status is more efficient, accurate, and shorter than any loop.

There are exceptions: Devices that do not report anything on their own must be queried. However, this should be done at the device's own rate, and not faster.

## Distinguishing command and feedback

The`ack` -Flag is the most important term on the entire page.

- `ack: false` - a **command** : "Lamp, turn on." That's how logic writes.
- `ack: true` - a **response** : "Lamp is on." That's how adapters write.

Responding to both creates feedback loops that, depending on the device, may manifest as flickering, constant noise, or go unnoticed. Triggers respond to feedback, while data is written as commands.

## Only write if something changes.

`setStateChanged` It only writes when the new value differs from the old one. For values calculated at regular intervals, this saves the majority of all write operations – and thus entries in the history, triggered scripts from other users, and load on the database.

## States are the common memory

Scripts do not share variables, not even within the same instance. If one script needs to communicate something to another, it does so via its own state. Such states belong under the script's own instance – via \`\<script>\`.`createState` in JavaScript or the corresponding building block in Blockly - and they get a descriptive name.

## Do not address devices directly

A script that`hm-rpc.0.LEQ1234567.1.STATE` The switching function is tied to this specific device. If the actuator is replaced, all scripts containing the ID must be re-uploaded.

An [alias](/docs/basics/alias.md) solves that:`alias.0.Wohnzimmer.Deckenlicht` The result remains the same, even if a different device is involved. A device replacement then only results in a change at one point instead of twenty.

## No login credentials in the script

Passwords, access keys, and similar information should not be included in the script text. A script is copied, posted to the forum, and saved – the login credentials are copied along with it.

The JavaScript adapter has a central storage location for this: Access data is stored in the instance settings under _"Access data"_ and is available in the script via \[link/button name].`SECRETS` available, for example`SECRETS.Kamera.key` The values are decrypted and read-only, and the editor suggests possible values as you type. Blockly has a dedicated building block for this.

## Start small, divide big

- One script, one task. "Shading" and "heating" do not belong in the same file, even if they both monitor the same temperature.
- Place recurring functions in a script located in the **global** folder. Its contents will be available to all other scripts.
- Create folders by room or trade. The storage location has no effect on the execution, but a significant impact on finding the files again after six months.

## Only in a test instance

A critical error terminates the instance in which the script is running—and consequently all other scripts within it. Therefore: create a second JavaScript instance and run new scripts there first. The instance is selected in the editor above the script.

## Secure

Scripts are stored in the ioBroker database and are therefore included in the regular backup. Users who also want to store them as files can specify a mirror directory in the instance settings; the scripts will then be backed up continuously.`.js` -Files are written there and can be versioned.

## Write clearly

- Names that state the purpose:`Beschattung Süd` instead of`Skript 3` .
- A line of commentary at the beginning: What does it do, what does it react to?
- In Blockly, use the comment block instead of relying on the arrangement of the blocks.

## Examples

Complete solutions and examples are collected in the [ioBroker forum](https://forum.iobroker.net) . The Blockly reference for the JavaScript adapter also contains three fully worked-out examples, from the first building block to the finished script: [Blockly reference](/adapters/javascript) .