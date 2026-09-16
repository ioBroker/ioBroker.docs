---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/010_adapter.md
title: no title
hash: +TbDim3WL1JBAlc+fDgPiZxbA51cu6qwSvoaINwX6Js=
---
## What is an adapter, what is an instance?

An **adapter** is a program that connects a system, manufacturer, protocol, or service to ioBroker. Initially, it is just the program itself and does nothing on its own.

An **instance** is a running copy of the adapter, with its own configuration. Only it is operational. There can be multiple instances of the same adapter, for example, one...`hm-rpc.0` for radio and a`hm-rpc.1` for the wired branch.

The instance name is also the namespace under which its objects reside: everything from`javascript.0` begins with`javascript.0.` .

Instances are created in the [Adapter](/docs/admin/adapter.md) tab and managed in the [Instances](/docs/admin/instances.md) tab.