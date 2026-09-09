---
title: The first visualization
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/viz.md
hash: 6Js6n2Pop6Y1WKR3LYhaGI666YkvwX77uvJwg7mBJSY=
---
# The first visualization

A visualization is a page that is ultimately used by someone who doesn't want to know anything about the administrator. This page shows the shortest path to such a page.

## First the categories

Before you draw anything: define rooms and functions in the [Categories](/docs/admin/enums.md) tab. Every data point that should appear later belongs to a **room** and a **function** .

The reason: several visualization adapters build their interfaces entirely from this information. Half an hour of mapping can potentially save an entire evening of drawing. And even if you design it yourself later, voice control and automatic device detection require the same information.

The **data point** is assigned, not the device and not the channel.

## Try the easy way first.

Install an adapter that builds the interface itself, such as the [Devices adapter](/docs/viz/devices.md) or [Lovelace](/docs/viz/lovelace.md) , and see the result. This will take five minutes. If it's sufficient, you're done.

A comparison of the adapters can be found in the [introduction](/docs/viz/README.md) to the Visualization chapter.

## Design it yourself with vis-2

If that's not enough, **vis-2** , the successor to vis, will be used. The process is as follows:

1. The adapter`vis-2` Install and create an instance. The necessary widget sets are included as separate adapters.
2. Open the editor. It can be accessed via the tile in the [quick access menu](/docs/admin/overview.md) or via the instance link in the Instances tab.
3. Create a **view** . One view corresponds to one page. Start with one, not the whole house.
4. Drag a **widget** from the bar onto the canvas, such as a switch.
5. **Connecting the widget to a data point** is the crucial step: only then does an image become a user interface.
6. Save the file and access the view via the runtime address, not in the editor. This is the only way to see what others see.

Set the view size to the device it will later run on. A page built for a large screen is unusable on a phone, and changing that later is tedious.

## Things to pay attention to

- **A widget, a data point.** If a switch does nothing, it's almost always because the connection to the data point is either not established or points to the wrong one.
- **Distinguish between reading and writing.** A display field reads, a switch writes. A data point that may only be read cannot be switched, regardless of the widget in front of it.
- **Don't put everything on one page.** Multiple views with navigation in between are preferable.
- **View license terms.** vis-2 requires a license; it's free for private use, but commercial use is subject to a fee. See [adapter licenses](/docs/licenses/adapter.md) .

## On the go

The finished interface is initially only accessible within the local network. Access to external networks is described under ["Visualizations via the Cloud](/docs/cloud/viz.md) ." Beforehand, the associated \[unclear text] must be \[unclear text].`web` -Instance has the [login](/docs/config/login.md) enabled.

## What happens next?

A visualization usually also shows trends. For this, values need to be recorded: [Record values](/docs/tutorial/history.md) .