---
lastChanged: 2021.03.18
---
# Adapter developing for ioBroker

## Concept of ioBroker

ioBroker is open source and based on an open concept.

A team of experienced developers maintain the core components of ioBroker.
These core components are amongst others:

* [JS-Controller](https://github.com/ioBroker/ioBroker.js-controller):  The core of ioBroker
* [Admin](https://github.com/ioBroker/ioBroker.admin): The admin interface
* [Javascript engine](https://github.com/ioBroker/ioBroker.javascript): Functionallity to create scripts in different type (JS, Blockly, ...)

Then there are a lot of adapters. Adapters add functionality to ioBroker for differnt use-cases, like integrating and controlling Devices, getting information, ...
Most used Adapters are:

* [ioBroker.ping](https://github.com/ioBroker/ioBroker.ping): Ping configured IPs
* [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup): Handles backup of ioBroker and Homematic installations
* [ioBroker.tr-064](https://github.com/iobroker-community-adapters/ioBroker.tr-064): Integrate AVM FritzBox into ioBroker
* [ioBroker.alexa2](https://github.com/Apollon77/ioBroker.alexa2): Control Amazon Alexa/Echo devices

Adapters can be developed and added to ioBroker by everyone.

## Adapter development basics

ioBroker is based on NodeJS. This runtime environment is available for different plattforms like Linux, Windows and MacOS.

The programming language is JavaScript.

Also TypeScript can be used, which enhances JavaScript with functions like classes. The greatest benefit is extending JavaScript by adding types, which results in better code with fewer runtime errors.

## Structure of documentation

[Getting started]() - How to start developing an Adapter

[Schema]() - Schema of ioBroker - Namespace, objects, states

[Reference]() - Files, structures and informations about Adapter development

[Tools]() - IDEs and other usefull utilities for Adapter development

