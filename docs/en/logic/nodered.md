---
title: Node-RED
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/logic/nodered.md
hash: ueb5GUTbBr4Yp+ShMpL2brc/uayyZhpncf98pJ19GMA=
---
# Node-RED

Node-RED is a standalone workflow control tool that is not part of ioBroker, but integrates well with it. Programming in Node-RED is done using...
_Flows_: Nodes are placed on a surface and connected with lines along which messages run.

Access is via the
[node-red adapter](/adapters/node-red)He brings Node-RED with him, starts it, and establishes the connection to the ioBroker states. Since adapter version 7, Node-RED 5 has been included; it is updated together with the adapter and not separately.

!> Node-RED runs as **own process** Besides ioBroker, it has its own memory consumption and editor. For simple automations, this represents a noticeable overhead – but it is
[Blockly](/docs/logic/blockly.md)
the easier way.

## Furnish

1. The adapter _node-red_ Install and create an instance.
2. Adjust the port and access protection settings in the instance settings if necessary. The default port is... **1880** on all network interfaces, without registration.
3. The editor is opened via the instance button in the admin panel or directly under
   `http://<adresse-des-servers>:1880`.

!> Accessible without registration and on all interfaces means: Anyone on the network can change the flows and thus control everything that ioBroker controls. Users of Node-RED should configure access protection in the instance settings.

## The ioBroker nodes

A separate group appears in the editor's palette. _ioBroker_ with six nodes:

| node                | For what                                                                    |
| ------------------- | --------------------------------------------------------------------------- |
| ioBroker in         | Trigger: outputs a message as soon as a state changes.                      |
| ioBroker out        | Writes the message content to a state                                       |
| ioBroker get        | Retrieves the current value of a state without waiting for a change.        |
| ioBroker get object | Retrieves the object by its ID, i.e., its description instead of its value. |
| ioBroker list       | Returns a list of states for a pattern                                      |
| ioBroker sendTo     | Sends a command to an adapter instance, such as Telegram.                   |

A simple flow therefore consists of two nodes: _ioBroker in_ for the trigger,
_ioBroker out_ for the reaction, and in between, what needs to be decided.

## What's important in the instance settings

- **Storage limit.** The default setting is 128 MB. Flows that hold large amounts of data need more – otherwise Node-RED will terminate without any apparent reason.
- **Additional nodes.** Palette management is disabled by default. Users wishing to install additional node packages must enable it or add the packages in the settings.
- **Create foreign objects.** Also disabled by default. As long as it remains disabled, a flow can only create states below its own instance.
- **Storage of the context.** Node-RED can retain values across a restart. From adapter version 7 onwards, the file-based storage is called... `file` instead of
  `default`Anyone who has explicitly selected a storage location in a node must select it again there.

## Why Node-RED is worthwhile

Node-RED is strong where data _flo&#x77;_&#x49;t can combine multiple sources, query and respond to HTTP interfaces, use MQTT, perform multi-step transformations, and manage queues. For classic home automation – triggers, conditions, and actions – it's not superior to the JavaScript adapter, but it does require a second process and a second editor.

Both happening simultaneously is possible and common. The states are the common language: what a flow writes, a script sees immediately, and vice versa.