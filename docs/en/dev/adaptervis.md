---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adaptervis.md
title: Debugging VIS widgets
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: LwLCEyIDeyyVNWt0EGQtQO6x84LtmAGIWjzwYvSEX3Q=
---
# Debugging VIS widgets

A widget runs in the browser, not in Node.js. Therefore, the debugger is the browser's, not the debugger for \` [debugging\`](/docs/dev/adapterdebug.md) . The path to the debugger depends on whether the widget is built for **vis-2** or the older **vis-1** .

## vis-2

Widgets for vis-2 are React components and are developed in a separate package. The starting point is the template [ioBroker.vis-2-widgets-react-template](https://github.com/ioBroker/ioBroker.vis-2-widgets-react-template) .

### Without ioBroker running

Your own development server is sufficient for working on the appearance and logic. In the widgets' source directory:

```bash
npm run start
```

After that, the widget is located under`http://localhost:4173` It is displayed in a demo environment, changes appear instantly, and the browser's developer tools show the unbuilt source code with breakpoints and readable names.

### With ioBroker running

The [dev-server](/docs/dev/devserver.md) comes into play as soon as the widget needs real states:

1. `dev-server watch --noStart` Start in the adapter directory.
2. `npm run start` Start in the source directory of the widgets.
3. In the object`system.adapter.<adaptername>.0` the field`common.visWidgets.<widgetname>.url` on`http://localhost:4173/customWidgets.js` set.
4. `dev-server upload` call up.
5. Reload the vis-2 editor in the browser.

vis-2 then loads the widgets from the development server instead of the installed adapter. A page reload is sufficient after each change.

!> The changed value of`common.visWidgets…url` Reset before publishing. Otherwise, the installation will search the user for...`localhost:4173` .

Helper classes and the migration of older widgets are described in the package [@iobroker/vis-2-widgets-react-dev](https://www.npmjs.com/package/@iobroker/vis-2-widgets-react-dev) .

## vis 1

Widgets for vis 1 are HTML files using jQuery. They are located in the data store under`vis/widgets/` and are delivered from there, not from the adapter directory. Therefore, simply changing the file in the package is not enough.

The way:

1. In the adapter`web` Disable the cache in the instance configuration. It's enabled by default.
2. In`iobroker-data/iobroker.json` under`objects` the attribute`noFileCache` on`true` set up and use ioBroker with`iobroker restart` start anew.
3. The modified widget file with`iobroker upload vis` move to the data storage.
4. Reload the page in your browser while holding down the Shift key.

Widgets are loaded dynamically, which is why the file doesn't initially appear in the browser's source code.`console.log` or a [`debugger`The \`-instruction\`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/debugger) in the widget helps: You can jump to the file via the output in the console and set breakpoints there.

Instructions for replacing`index.html` through`index.html.original` and changing`vis/cache.manifest` These descriptions are outdated. The underlying browser cache (application cache) was removed from all browsers in 2021.

## Further information

- [vis](/docs/viz/vis.md) and [widgets](/docs/viz/widgets.md) from the user's perspective
- [dev-server](/docs/dev/devserver.md)
- [Debugging](/docs/dev/adapterdebug.md) the Node.js part of an adapter