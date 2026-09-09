---
title: Visualization
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/README.md
hash: MZ2xdiEU9vg7M/NYu/VfCrmzW+KR/B37fSzUC89qXyc=
---
# Visualization
A visualization is the interface that someone ultimately interacts with: a page in a browser or on a tablet where rooms, devices, and measurements are displayed and can be controlled. ioBroker itself doesn't include one. It's created using an adapter, and there are several of these available, each with very different approaches.

## Two ways
**Design it yourself.** You create pages and drag controls onto them, link each one to a data point, and define its size, color, and behavior.

The result looks exactly the way you want it, and you do all the work yourself.

**Let it be generated.** The adapter builds the interface itself, based on what the system knows about the devices: from the created [devices](/docs/viz/devices.md) and from the [Categories](/docs/basics/enums.md). Rooms become pages, functions become groups on them. Customization options are limited, but a new device automatically appears in the correct location as soon as it is assigned.

Those who choose the second approach first manage rooms and functions. Without proper assignments, the interface remains empty, regardless of the adapter used.

## The most common adapters
| Adapter | Approach | Note |
| --- | --- | --- |
| **[vis-2](/adapters/vis-2)** | Design it yourself | The successor to vis and the first choice for new projects. |
| **[webUI](/docs/viz/webui.md)** | Design it yourself | A standalone system of web components. Powerful, but requires HTML knowledge. |
| **[Device adapter](/docs/viz/devices.md)** | Generate | Builds the interface from the connected devices. The quickest way to a usable view. |
| **[Lovelace](/docs/viz/lovelace.md)** | Generate your own maps | Brings the Home Assistant interface to ioBroker. Ready-made maps, built-in editor. |
| **[Lovelace](/docs/viz/lovelace.md)** | Generate maps | Brings the Home Assistant interface to ioBroker. Pre-made maps, built-in editor. |

Several of them can be operated simultaneously. This is practical when testing: one surface for the tablet on the wall, another for the phone.

With vis and vis-2, the adapter itself is less important than which **widget sets** are installed. There are over thirty of these; see [Widget sets](/docs/viz/widgetsets.md).

The repository contains almost seventy visualization adapters, along with widget sets and symbol collections. The table lists the four that are actively maintained. If you're looking for something specific, filter by the **Visualization** group in the [adapter](/docs/admin/adapter.md) tab. It's worth checking the date of the last publication: for some well-known names, it's been years.

## What belongs here
**A web server.** vis, vis-2, and webui do not have their own. They are delivered via an instance of the `web` adapter, where [Registration](/docs/config/login.md) is also enabled. Lovelace includes its own.

**Recorded values** are used when charts are to be displayed. A data point only knows its current value. The historical data is provided by `history`, `influxdb`, or `sql`, and displayed using `echarts` or `flot`.

**Access from anywhere**, if the interface is not only accessible at home. Instructions are available under [Visualizations via the cloud](/docs/cloud/viz.md).

## Getting Started
1. Rooms and functions in the tab

Maintain [Categories](/docs/admin/enums.md). This pays off with every adapter.

2. Group the data points in the **Devices** tab into devices. This way you know

The system will clarify what constitutes a lamp and what constitutes a roller shutter, and all subsequent steps will become easier. See [Device adapter](/docs/viz/devices.md).

3. Generate the surface and observe how far it carries: with the

Devices adapter or with [Lovelace](/docs/viz/lovelace.md).

4. Only if that's not enough, design it yourself with vis-2.

This sequence saves a lot of work. Many installations manage without a single hand-drawn page.