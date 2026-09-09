---
title: The first visualization
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/viz.md
hash: E/IKU+ZnZIs8bI5oMC8x8QRvqC7i6QYIz4iT1Xzzrig=
---
# The first visualization

A visualization is a page that is ultimately used by someone who doesn't want to know anything about the administrator. This page shows the shortest path to such a page.

## First the categories

Before you draw anything: maintain spaces and functions in the tab
[Categories](/docs/admin/enums.md)Each data point that is to appear later belongs to a **Space** and one
**function** to.

The reason: several visualization adapters build their interfaces entirely from this information. Half an hour of mapping can potentially save an entire evening of drawing. And even if you design it yourself later, voice control and automatic device detection require the same information.

!> The following is assigned to the **Data point**, not the device and not the channel.

## Try the easy way first.

Install an adapter that builds the surface itself, for example.
[material](/docs/viz/material.md), and look at the result. That takes five minutes. If it's sufficient, you're done.

A comparison of the adapters is available in the
[Introduction](/docs/viz/README.md) of the Visualization chapter.

## Design it yourself with vis-2

That's not enough, then... **vis-2**, the successor to vis. The process:

1. The adapter `vis-2` Install and create an instance. The necessary widget sets are included as separate adapters.
2. Open the editor. It's accessible via the tile in the
   [Quick access](/docs/admin/overview.md)
   or accessible via the instance link in the Instances tab.
3. One **Opinion** Create one view. One view corresponds to one page. Start with one, not the whole house.
4. A **Widget** Drag from the bar onto the surface, for example a switch.
5. The widget with a **Connect data point**This is the real step: only then does an image become a user interface.
6. Save the file and access the view via the runtime address, not in the editor. This is the only way to see what others see.

Set the view size to the device it will later run on. A page built for a large screen is unusable on a phone, and changing that later is tedious.

## Things to pay attention to

- **One widget, one data point.** If a switch does nothing, it almost always means that the connection to the data point is not established or is pointing to the wrong one.
- **Distinguish between reading and writing.** A display field reads, a switch writes. A data point that may only be read cannot be switched, regardless of the widget in front of it.
- **Don't put everything on one page.** I prefer multiple views with navigation in between.
- **View license terms.** vis-2 requires a license; it's free for private use, but commercial use is subject to a fee. See \[link/reference].
  [Adapter licenses](/docs/licenses/adapter.md).

## On the go

The finished interface is initially only accessible within the local network. Access to the outside world is available under \[link/section name].
[Visualizations via the cloud](/docs/cloud/viz.md). Before that, it belongs to the associated `web`-instance
[Registration](/docs/config/login.md)
turned on.

## What happens next?

In a visualization, you usually want to see trends. For this, values need to be recorded:
[Record values](/docs/tutorial/history.md).