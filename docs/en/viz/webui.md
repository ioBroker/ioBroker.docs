---
title: webUI
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/webui.md
hash: QVEPXV9O9eIv7Ai53T0ESa3B5vs4mv3mZZ89b1YjXdw=
---
# webUI

[webui](/adapters/webui) is a completely independent visualization system, developed by jogibear9988 in the ioBroker community. It takes a different approach than vis: what you assemble in the editor is real HTML from **Web Components** , and the editor is a tool for drawing HTML, not a box of pre-made building blocks.

This makes webui powerful and, at the same time, more demanding than other interfaces. Those familiar with HTML and CSS can get very far. Those who don't want to learn that are better served by [vis-2](/docs/viz/README.md) or the [Devices adapter](/docs/viz/devices.md) .

## What it can do

- Bindings to ioBroker objects, optionally with conversion or a JavaScript expression in between.
- Drag an object from the tree into the drawing area, and the connection is created automatically. The same works for a single property.
- Insert images from the clipboard or drag and drop them in from outside.
- Split view: the drawing area on the left, the HTML code on the right, both simultaneously.
- Custom reusable building blocks with their own properties, appearance, and JavaScript.
- Screens within screens, a global stylesheet, npm packages with Web Components, the ioBroker symbol collections, and the charts from ioBroker.
- A simple scripting language for processes within a page.

## Furnish

WebUI requires the **web** adapter; it won't work without it. The adapter doesn't have its own configuration page; everything is done in the editor.

1. The adapter`webui` Install in the [Adapter](/docs/admin/adapter.md) tab and create an instance.
2. Open the editor:`http://<adresse>:8082/webui/` .
3. Create a screen and use i&#x74;**`start`** Call it that. This is the screen that the finished interface displays first.
4. The finished surface lies beneath`http://<adresse>:8082/webui/runtime.html` .

Another screen can be accessed via the following address:`runtime.html?screenName=zweiterbildschirm` .

## What you need to know before you begin

Everything you draw is located in the shadow tree of a web component. This leads to two rules that everyone else eventually gets stuck on:

- **`<body>`and`<html>` They cannot be addressed in the stylesheet.** For the external appearance, the selector is used.`:host` .
- **Events are not recorded with`onclick` bound, but with`@click` .** The`on…` The - notation doesn't work there.

A custom building block can have a function`init(instance)` provide, which is called up during creation, for this purpose`connected()` and`disconnected()` .

## Where does it go from here?

The adapter has its own [wiki](https://github.com/iobroker-community-adapters/ioBroker.webui/wiki) ; the German section is more detailed than the English one. There are also video tutorials from the developer on [YouTube](https://www.youtube.com/@jogibear9988) , also in German.

Beneath the surface lies the [web-component-designer](https://github.com/node-projects/web-component-designer) , a standalone project by the same developer.

## Further information

- [Overview](/docs/viz/README.md) : the other ways to reach a surface
- [vis-2](/docs/viz/vis-2.md) and [widget sets](/docs/viz/widgetsets.md) : the way with ready-made building blocks