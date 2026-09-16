---
title: vis-2
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/vis-2.md
hash: ODtIk7aI+lal/7k5nOJQQlfmh9w/fDuMtmj0WMNGjks=
---
# vis-2

**vis-2** is the visualization tool for ioBroker: a user interface that can be assembled from building blocks without any programming. It is the successor to [vis](/docs/viz/vis.md) and the right choice for any new project.

What sets it apart from other interfaces: vis-2 doesn't build anything automatically. The [Devices adapter](/docs/viz/devices.md) and [Lovelace](/docs/viz/lovelace.md) generate their pages from devices and categories; here, you define each tile yourself. This takes time and is the only way to ensure the interface looks exactly as you envision it.

Ready-made examples are available at <https://iobroker.click> .

## License

vis-2 is the only part of ioBroker that requires a license. The source code is licensed under CC BY-NC, which must be confirmed during installation, and the adapter also requires a license. Three versions are available:

| License          | For whom                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Community**    | Private, free of charge. All you need is an account on [iobroker.net](https://iobroker.net) . |
| **Offline**      | Privately, for a small fee.                                                                   |
| **Commercially** | Commercial use and distribution to customers.                                                 |

The **community license is checked online when the adapter starts** . The device must be connected to the internet at this precise moment. Those who do not want to or cannot do this should use the offline license, which waives the check. Details and prices can be found under [Adapter Licenses](/docs/licenses/adapter.md) and in the [product overview](/productoverview) .

## installation

The adapter is called[`vis-2`](/adapters/vis-2) It requires the [web adapter](/adapters/web) and runs as a **singleton** : there can only be one instance.

After that, there are two addresses:

|                   | address                                 |
| ----------------- | --------------------------------------- |
| Display (Runtime) | `http://<server>:8082/vis-2/index.html` |
| editor            | `http://<server>:8082/vis-2/edit.html`  |

You can reach a specific page with`index.html#Seitenname` . Both addresses are also listed as references in the **Instances** tab .

## The editor

The editor is divided into four areas:

| Area                        | Contents                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Toolbar** at the top      | New page, page list, cut and paste, undo and redo, align multiple widgets, preview, plus **settings** on the right, **projects** , **objects** and **files** |
| **Palette** left            | All available widgets, grouped by widget set, with search field                                                                                              |
| **Work surface** center     | the opened pages as tabs                                                                                                                                     |
| **Attributes** on the right | The settings of the selected item, with the tabs **Page** , **Widget** and **CSS**                                                                           |

The palette and attributes can be narrowed or closed completely if the workspace needs more room.

**In vis-2, a view is called a "page."** In vis-1, the same thing was called "view," and many online tutorials still use that term. They all mean the same thing: a screen full of widgets.

## pages

A project consists of several pages. Each page has its own settings under **Attributes → Page** , grouped by purpose:

- **CSS in general** , **CSS background** and **CSS font and text** for appearance,
- Behavior **options** ,
- **Navigation** and **application bar** for the menu,
- **Responsive settings** for behavior on narrow screens.

### navigation

Instead of manually linking each page, you can include them in the **navigation** . vis-2 then creates a sidebar with a title and order, optionally with an application bar at the top. This is the fastest way to create an interface that can be used on a phone.

### Which side appears first

Each page can be assigned a **resolution** and a **default** checkbox can be set.`index.html` If a page is accessed without a name, vis-2 opens the page that best fits the screen. This allows you to create two pages, one in portrait and one in landscape orientation, which switch between when the phone is rotated. If only one page is selected, that page will always open.

The resolution is only a guideline in the editor. It is invisible in the running view, and widgets outside of it are still visible.

The " **Basic → Screen Resolution"** widget displays the actual screen size and the corresponding default page. It's very useful during setup; afterwards, you can remove it from the page.

## Widgets

A widget is dragged from the palette onto the page and its data points are assigned under **Attributes → Widget** . The available widget sets depend on which widget sets are installed. vis-2 includes five; all others are custom adapters (see [Widget Sets](/docs/viz/widgetsets.md) ).

The classic sentences from vis 1 can also be used. However, they look the same there as in vis 1 and do not follow the theme of vis-2.

### Position: fixed or fluid

By default, a widget is positioned at fixed coordinates. Setting its position to **relative** causes the widgets to automatically arrange themselves in columns and run vertically on a narrow screen. For an interface intended to work on both tablets and phones, this is a simpler approach than using two separate pages with fixed coordinates.

## Bonds

Almost every widget has a field for the object ID. Furthermore, **every** attribute can be bound to a data point: simple.`{objekt.id}` write in the field, for example`{hm-rpc.0.OEQ1880105.4.ACTUAL_TEMPERATURE}` .

With multiple values and a formula, even more is possible:

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}
```

The name under which the value appears in the formula comes before the colon. The last section is the formula itself, which allows any JavaScript function of the browser.

**All values arrive as a string.** Anyone performing calculations then puts them into...`parseFloat()` , otherwise vis-2 concatenates the numbers instead of adding them.

Two subtleties: A colon **within** a formula is called`::` It's written because the simple character separates the names. And a CSS rule like`{style: value}` would be read as a link; therefore, it belongs in double brackets.`{{style: value}}` .

In addition to data points, there are built-in names:

| name           | Value                                                                             |
| -------------- | --------------------------------------------------------------------------------- |
| `username`     | the logged-in user                                                                |
| `view`         | Name of the current page                                                          |
| `wid` ,`wname` | Widget identifier and name                                                        |
| `widgetOid`    | the object ID of the widget, for example `{t:widgetOid.val;t}`                    |
| `language`     | the selected language                                                             |
| `instance`     | the identifier of this browser                                                    |
| `login`        | whether registration is required                                                  |
| `local_*`      | a variable that is only valid in this browser and is not written back to ioBroker |

## filter

Each widget has a **filter** field. If you enter a term there, for example...`licht` , the page can be customized with the widget`filter - dropdown` Limit the selection to this group. This way, many widgets can fit on one page without all of them being visible at once.

The entries carry the CSS class`vis-filter-item` , the active additionally`vis-filter-item-active` Two things are important to know: A color set within the widget itself is an inline style and cannot be overridden by the project's CSS; if you want to color it via CSS, leave it blank. And the entries in a drop-down menu are drawn outside the widget, meaning they can only be addressed generally, not via the identifier of an individual widget.

## Control from outside

vis-2 creates three data points that allow for remote control of a running display:

| Data point                 | Contents                                                       |
| -------------------------- | -------------------------------------------------------------- |
| `vis-2.0.control.instance` | the browser identifier, or`FFFFFFFF` for all                   |
| `vis-2.0.control.data`     | the command's parameters                                       |
| `vis-2.0.control.command`  | The command. **Write this last** ; it will trigger the action. |

Commands:`changeView` (switch to another page, optionally)`projekt/seite` ),`refresh` or`reload` ,`alert` (`Meldung;Titel;Symbol` ),`dialog` and`dialogClose` ,`popup` (opens an address in a new window) and`playSound` .

It can be done more concisely as JSON in a single write operation:

```js
setState('vis-2.0.control.command', { instance: '*', command: 'refresh', data: '' });
```

Conversely, vis-2 reports a page change:`control.command` then stands`changedView` and`control.data` on`projekt/seite` , each with`ack=true` This can be addressed in a script.

?>`playSound` It only works after the user has tapped the page at least once. This is a browser rule, not a bug in vis-2. Therefore, no sound will be produced on a wall-mounted tablet that only displays information.

## right

For each ioBroker user, **read** and **write** permissions can be assigned separately, on three levels:

- **Project** : Reading means the user is allowed to open the display; Writing means they are allowed to use the editor.
- **Page** : the same for individual pages.
- **Widget** : Without read permission, the widget will not be drawn in the display; without write permission, it will not be drawn in the editor.

This permission is granted in the project dialog. A newly created user has both rights. If a right is missing at the project level, setting it on a page won't help. Anyone accessing a page without the necessary rights will be taken to the project selection screen.

## Settings for operation

Under **Settings,** there are three values that are particularly important for wall-mounted tablets:

- **Reload after extended sleep** : How long the connection can be interrupted before the page is fully reloaded. Set to "never" means it will never reload.
- **Reconnection interval** : how often a new connection attempt is made.
- **Dark reconnect screen** : so that a tablet in the bedroom doesn't suddenly light up brightly at night.

All three apply only to reconnecting, not to the initial setup.

## Where the project is located

A project is a single file in the ioBroker file storage:`vis-2.0/<Projekt>/vis-views.json` In addition, there are the uploaded images and the custom stylesheet. Projects can be created, renamed, exported as a ZIP file, and imported again via the **Projects menu** . Exporting is the easiest way to transfer a user interface to a different system.

Exporting data belongs in the data backup. While an ioBroker backup does include the file storage, restoring a single project from it is more cumbersome than importing a ZIP file.

## Switch from vis 1

Both adapters can be used side-by-side without interfering with each other. This is also the smoothest approach: leave the old project in vis, start a new one in vis-2 next to it, and only switch between them once the new interface is complete.

The classic widget sets are available in vis-2, so there's no shortage of familiar building blocks. An exported project can be imported in the project dialog; how much of it is actually imported depends on the widgets used. So try it on a copy first, not on the running project.