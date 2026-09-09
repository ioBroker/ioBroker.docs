---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/010_adapter.md
title: no title
hash: +TbDim3WL1JBAlc+fDgPiZxbA51cu6qwSvoaINwX6Js=
---
## What is an adapter, what is an instance?

A **adapter** A \`connect\` is a program that connects a system, manufacturer, protocol, or service to ioBroker. Initially, it is just the program itself and does nothing on its own.

One **Instance** This is a running instance of it, with its own configuration. Only this one works. There can be multiple instances of the same adapter, for example, one
`hm-rpc.0` for radio and a `hm-rpc.1` for the wired branch.

The instance name is also the namespace under which its objects reside: everything from `javascript.0` begins with `javascript.0.`.

Instances are created in the tab
[adapter](/docs/admin/adapter.md), managed in the tab [Instance](/docs/admin/instances.md).