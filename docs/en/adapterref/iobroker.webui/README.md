# ioBroker.webui

![Number of Installations](https://iobroker.live/badges/webui-installed.svg) 
![Stable version](https://iobroker.live/badges/webui-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.webui.svg)](https://www.npmjs.com/package/iobroker.webui)
[![Downloads](https://img.shields.io/npm/dm/iobroker.webui.svg)](https://www.npmjs.com/package/iobroker.webui)

[![NPM](https://nodei.co/npm/iobroker.webui.png?downloads=true)](https://nodei.co/npm/iobroker.webui/)

webui for ioBroker

![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Tutorial Videos (atm. in german only)

https://www.youtube.com/@jogibear9988

## Description

This is a complete visualization system for ioBroker.

It includes features like:

  - simple scripting language
  - binding to ioBroker objects including converters & javascript expressions
  - pasting of images from clipboard
  - drag&drop of external images
  - drag&drop of ioBroker objects to automaticy create bindings
  - drag&drop of ioBroker objects to Properties to create Bindings to them
  - relative signal paths to ioBroker objects in screens (the full path can be handed over from outside into the screen)
  - split view editing of layout and html code
  - global stylesheet support
  - usage of npm packages containing webcomponents
  - usage of the ioBroker web components of installed adapters (the same components vis-2, devices and admin show)
  - screens inside of screens
  - use all icon packages from ioBroker
  - use charts from ioBroker
  - use combined signals object id's  e.g. "webui.0.test3.{webui.0.test3.select}" -> this will use the value from webui.0.test3.select for the signal name

There is more information about specific topics in the [wiki](https://github.com/iobroker-community-adapters/ioBroker.webui/wiki) (the German section has a few more articles than the English one).

## Installation

### Dependecies

  - You need the Web Adapter installed. It works with the following settings: ![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)
  
## Concepts

### Description

The Designer uses Web Components, so the HTML you design is inside of a Shadowroot of a Webcomponent. This means, you cannot style <body> or <html> inside of the Stylesheet. To style the outer Layout, use the ":host" selector.
This also means, you cannot use "on..." eventhandlers. Use the "@..." event assignment.

### Custom Controls in WebUI

You can create your own reusable CustomControls in WebUI, each of which can have its own Javascript, Properties and a template.

You can use Double-Bracket Syntax and Double-Curly-Bracket Syntax of the "BaseCustomWebcomponent" to create bindings from the Template to the properties defined in the Designer. Curylbrackets create two way Bindings.
If you use the Bindings Dialog, you can Bind to a Property with ??Propertyname and to IoBroker Object in the Property via ?Propertyname.
In Scripts you can also write to Signals defined in Custom Properties.

You can include Javascript in your CustomControl or Screen.
In addition, you can export a function `init(instance)` wich will be called when your CustomControl will be instantiated.
Finally, `connected()` and `disconnected()` functions can be defined to be called when ...

### ioBroker web components

Adapters can bring [ioBroker web components](https://github.com/ioBroker/web-components): custom elements that every ioBroker UI shows alike. Their adapters list them in `common.webComponents`. The designer shows them in the palette under **Controls → Designer → ioBroker web components**; components that edit a value of their own (`editsValue`) are left out, because webui does not store such values.

A placed component is stored like this:

```html
<iobroker-webui-web-component adapter="flow" component="flow-diagram" setting-oid="flow.0.diagrams.main" theme="dark"></iobroker-webui-web-component>
```

- Every setting of the component is an attribute `setting-<name>` (`textTrue` becomes `setting-text-true`). Edit it in the property grid or bind it to an ioBroker state like any other attribute. A checkbox setting works like an HTML boolean attribute: present means true.
- `theme` is `light` (default), `dark` or `auto` (follows the browser). The CSS custom properties `--iob-primary`, `--iob-paper`, `--iob-text`, ... on or above the element override single colors when the component is shown.
- In the designer the component gets `editMode` and does not write states. At runtime it gets the socket of webui.
- The event `iob-navigate` opens the webui screen of that name, if there is one.
- The components are read once when the page loads: reload the designer after installing an adapter.

## AI screen assistant

Open **AI** in the designer toolbar. Configure a provider in **ioBroker Admin → System settings → AI**, then choose its model in the assistant. The adapter uses the same [`@iobroker/ai-core`](https://github.com/ioBroker/ai-core) backend as vis-2; provider credentials stay on the server. A local ai-server/Ollama endpoint can be selected through the system AI configuration. Node.js 22.19 or newer is required; AI chat also needs a current controller/web adapter with instance-message subscriptions.

The assistant starts as a collapsed tab on the right edge. Open it from that tab or the **AI** toolbar command. Its Close button hides the dock without losing drafts or running chats; the toolbar command reopens it.

Type and press **Enter** to create a chat automatically. **Shift+Enter** inserts a new line. Click a chat tab to continue it; click the selected tab again to return to your fresh draft. Right-click a tab to rename or delete that chat. Provider/model selectors sit below the message box; right-click the composer controls to reload them. Chats and the unsent fresh draft are stored in this browser for the current installation and ioBroker user. Reloading interrupts running turns.

While the assistant works, keep typing and send with **Steer** to redirect its next safe step, or select **Queue** to send a follow-up after the current turn. Pending messages can be edited or removed above the composer. **Stop** immediately ends the local turn, skips subsequent tools and clears unsent pending messages; an already-sent provider request may still finish in the background. Running tabs and the conversation show activity indicators.

The microphone button dictates into the message field without submitting it. It uses browser speech recognition and needs microphone permission; availability depends on the browser. Stop dictation with the same button. Closing the AI dock stops dictation.

The assistant can inspect saved screens and controls, unsaved open editors, HTML/CSS/JavaScript, global styles/scripts, installed palette elements, and searchable ioBroker object metadata/current values. It has documentation for bindings, event handlers and the actual generated simple-script command schemas. Object native configuration is excluded, and there is no live-state write tool. Source and object context requested by the assistant is sent to the provider selected in ioBroker.

Use **Attach files** for text/source files and PNG/JPEG/WebP/GIF images, or paste screenshots into the message box. Choose a vision-capable model for images. Limits are eight attachments and 10 MB per message. The current ioBroker Anthropic bridge supports text only; screenshot chats must use an OpenAI-compatible vision provider (for example OpenAI, Gemini, OpenRouter or a suitable local model).

Changes appear as proposals with the original and proposed source. **Apply to editor** updates the screen without saving it. Review it in the designer and use the normal **Save** command to persist it. If the source changed after the assistant read it, Apply refuses to overwrite it; ask the assistant to read it again and make a fresh proposal. New screens are created through the same proposal workflow.

## Sponsoring

If you want to help the development, sponsor this project at https://github.com/sponsors/jogibear9988

## Developing
  * Install Repository as Adapter in IOBroker
  * Download the Repository to an extra "dev" directory, do not develop inside the ioBroker Node_modules directory.
  * Do the following steps inside of the "dev" dirctory.

  * Install dependencies 
```
  $ npm install
```

  * Compile Typescript after doing changes (or press Ctrl + Shift + B in VsCode and select "tsc watch")
```
  $ npm run tsc
```

  * Adjust 'config.js' to match you ip-adress and port for your iobroker
   (The config.js in the repository root will be replaced with the one in '/config' when running 'npm build')
```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

  * Run the app in a local server
```
  $ npm start
```

  * Navigate Chrome to [localhost:8000]() to see the app.

### More about Development

  - Run 
```
  $ npm run reflection
``` 
   to recreate reflection files for Scripting wich are used for the property grid

  - Run 
```
  $ npm run build
``` 
   to copy compiled files and node_modules to www folder so adapter is installable via github

  - Run 
```
  $ npm run release
  $ npm publish
``` 
   to create correct release commit for iobroker, Be carefull this also pushes to git repo.
   Be sure to edit "CHANGELOG.md" before, the text in "## **WORK IN PROGRESS**" in README.Md will be used for version info

## Info about the Adapter.

The Adapter is based on the following Designer component:
https://github.com/node-projects/web-component-designer

You need to create a screen "start", this is the first one called when you open runtime.html, 
but you can change this via query parameter:
runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.4.0 (2026-11-11)
- Use the ioBroker web components of installed adapters (`common.webComponents`, `@iobroker/web-components`) in screens: palette entries, a settings section in the property grid with every setting as a bindable `setting-*` attribute, theme support and `iob-navigate` to screens.
- dark mode changed
- components list

### 2.3.0 (2026-11-10)
- Expand AI context with current/open editors, selected screen elements, separate CSS/JavaScript, settings and component properties.
- Add paged discovery of components, installed component APIs, signals, images, icons and chart presets, with on-demand image/icon previews for vision models.
- Improve AI guidance for CSS bindings, converters and simple scripts, preferring the separate CSS/JavaScript fields.
- Apply AI proposals as one Undo/Redo step covering HTML, CSS, JavaScript, settings and properties while preserving earlier manual history.
- Show proposal review and Apply/Discard actions below AI answers, outside collapsed work outputs.
- Add chat message timestamps, elapsed thinking time and cost totals in the chat list/footer when explicitly reported.
- Balance the default dock column widths and fix document context-menu colors in light/dark mode.
- Keep detached screens, AI chats and tool/global-editor windows editable, including component drops, shared models, Save and Undo/Redo. Closing a popup returns its unsaved panel to the main editor.
- Fix missing script command details, including SetSignalValue signal/target fields, by resolving scalar schema aliases.

### 2.2.0 (2026-11-10)
- (copilot) Adapter requires node.js >= 22.19.0 now
* (GermanBluefox) Repochecker warnings fixed (#563)
- new features, AI, new designer, ...

### 2.1.0 (2026-09-15)
- fix blockly scripts
- add dark/light mode

### 2.0.3 (2026-08-21)
- fix help dlg pos

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 jogibear9988 <jochen.kuehner@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.