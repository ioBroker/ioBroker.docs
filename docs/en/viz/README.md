---
title: Visualization
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/README.md
hash: qKehV3VZa5Ft8jnladpDBSONZXtRgKQW4nZ0DnAblLU=
---
# Visualization

A visualization is the interface that someone ultimately interacts with: a page in a browser or on a tablet where rooms, devices, and measurements are displayed and can be controlled. ioBroker itself doesn't include one. It's created using an adapter, and there are several of these available, each with very different approaches.

## Two ways

**Design it yourself.** You create pages and drag controls onto them, linking each one to a data point and defining its size, color, and behavior. The result looks exactly as you want it to, and all the work falls to you.

**Have it produced.** The adapter builds the surface itself, specifically from the
[Categories](/docs/basics/enums.md)Rooms become pages, functions become groups on them. Customization options are limited, but a new device automatically appears in the correct location once it's assigned.

Those who choose the second approach first manage rooms and functions. Without clear assignments, the interface remains empty, regardless of the adapter used.

## The common adapters

| adapter                               | Approach           | note                                                            |
| ------------------------------------- | ------------------ | --------------------------------------------------------------- |
| **[vis-2](/adapters/vis-2)**          | Design it yourself | The successor to vis. The first choice for new projects.        |
| **[vis](/docs/viz/vis.md)**           | Design it yourself | The older version. Very common, many widget sets.               |
| **[material](/docs/viz/material.md)** | have it produced   | Build the surface from spaces and functions.                    |
| **[Lovelace](/adapters/lovelace)**    | have it produced   | Brings the Home Assistant interface to ioBroker.                |
| **[iQ control](/adapters/iqontrol)**  | Mixed              | Device-oriented, achieving a usable result with minimal effort. |
| **[jarvis](/adapters/jarvis)**        | Mixed              | Also device-oriented, highly configurable.                      |

Several of them can be operated simultaneously. This is practical when testing: one surface for the tablet on the wall, another for the phone.

## What belongs there

**A web server.** Visibility and material do not have their own. They are accessed via an instance of the `web`-adapter is delivered, and that's where the
[Registration](/docs/config/login.md)
turned on.

**Recorded values**, when charts are to be displayed. A data point only knows its current value. The historical data is provided. `history`, `influxdb` or
`sql`, he is depicted with `echarts` or `flot`.

**Access from anywhere**, in case the surface is not only to be accessible at home. The way there is described below.
[Visualizations via the cloud](/docs/cloud/viz.md).

## The beginning

1. Rooms and functions in the tab
   [Categories](/docs/admin/enums.md)
   Maintain it. It pays off with every adapter.
2. Install a generating adapter and see how far it carries.
3. Only if that's not enough, design it yourself with vis-2.

This sequence saves a lot of work. Many installations manage without a single hand-drawn page.