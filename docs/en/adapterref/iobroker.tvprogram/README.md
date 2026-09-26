---
chapters: {"pages":{"en/adapterref/iobroker.tvprogram/README.md":{"title":{"en":"ioBroker.tvprogram"},"content":"en/adapterref/iobroker.tvprogram/README.md"},"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md"}}}
---
![Logo](admin/tvprogram.png)

# ioBroker.tvprogram

[![NPM version](https://img.shields.io/npm/v/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
![Number of Installations](https://iobroker.live/badges/tvprogram-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/tvprogram-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)](https://nodei.co/npm/iobroker.tvprogram/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram` adapter for ioBroker

This adapter downloads television programme data and provides it to ioBroker
VIS widgets. Programme data is stored as files and kept in adapter memory
instead of being copied into data points.

## Table of contents

- [Installation](#installation)
- [Adapter configuration](#adapter-configuration)
    - [Programme sources](#programme-sources)
    - [Alternative channel logos](#alternative-channel-logos)
- [Widgets](#widgets)
    - [Common widget configuration](#common-widget-configuration)
    - [Timetable](#timetable)
    - [Favorites](#favorites)
    - [TV Control](#tv-control)
    - [Search](#search)
- [Data points](#data-points)
- [`sendTo` commands](#sendto-commands)
- [Examples](#examples)
- [Features](#features)
- [Planned work](#planned-work)
- [Changelog](#changelog)
- [License](#license)

## Installation

Install the adapter from the ioBroker stable repository. Use the beta or
latest repository to test a development version.

After the first start, wait until the adapter has downloaded programme and
channel data before configuring the widgets.

## Adapter configuration

Create one TV configuration for each independent channel selection, favorites
list and switch target. Each TV gets its own set of data points below the
adapter instance.

### Programme sources

The adapter supports these programme sources:

- **TV für alle**
- **IPTV-EPG.org**

For IPTV-EPG.org, select the required country and a local daily download time
in `HH:mm` format. The download starts at a stable random offset of up to
60 minutes after that time. This distributes requests from separate ioBroker
installations.

At startup, the adapter checks whether the configured source contains usable
channel data and programme data for the current broadcast day. Missing data is
downloaded immediately. Failed downloads are retried after one hour.

Programmes between midnight and 04:59 belong to the previous broadcast day.
Changing the source or IPTV-EPG country clears the programme cache and all
saved channel selections. Select the channels again after the new guide loads.

### Alternative channel logos

Set the `optchnlogopath` data point to a browser accessible directory if you
want to replace source logos, for example:

`http://192.1.2.3:8082/vis.0/icons/tvlogos/`

Use lowercase PNG filenames based on the IPTV-EPG channel ID without its final
country suffix. `DasErste` is an alias and always uses `ard.png`.

| Country     | Channel IDs                            | Logo filenames                       |
| ----------- | -------------------------------------- | ------------------------------------ |
| Germany     | `DasErste.de`, `ZDF.de`, `RTL.de`      | `ard.png`, `zdf.png`, `rtl.png`      |
| Austria     | `DasErste.at`, `ORF1.at`, `PULS4.at`   | `ard.png`, `orf1.png`, `puls4.png`   |
| Switzerland | `DasErste.ch`, `SRF1.ch`, `ORFeins.ch` | `ard.png`, `srf1.png`, `orfeins.png` |

Regional IDs use the same rule: `ORF2Wien.at` becomes `orf2wien.png`, and
`SRFzwei.ch` becomes `srfzwei.png`. Check failed image requests in the browser
developer tools if a filename is unclear.

When `optchnlogopath` is empty, widgets use source logos. The channel selector
always uses source logos so that channels remain identifiable.

See [Alternative channel logo examples](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#alternative-channel-logos)
for setup and conversion examples.

## Widgets

The widgets require a modern browser such as Chrome, Firefox, Safari, Opera or
Chromium based Edge. Internet Explorer and legacy Edge are unsupported.

### Common widget configuration

Select any data point of the required TV, usually its `cmd` data point. The
widget derives the remaining data point IDs automatically.

Common display options control the channel logo width, row height, programme
pictures, font sizes, favorite color and detail dialog dimensions. Configure
an explicit foreground and background color when the view theme does not give
the programme entries enough contrast.

If widgets are missing or outdated after an installation, run:

`iobroker upload tvprogram`

Widget CSS customization examples are available in
[Widget styling](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#widget-styling).

### Timetable

The Timetable widget shows programmes by channel on a time axis. It marks the
current time, supports zoom and day navigation, and opens programme details
from the complete programme card.

Open the channel selector from the widget menu. Click a card to enable or
disable a channel. Active channels appear first and retain their user defined
order. Drag an active card to move it; on touch screens, hold it briefly before
dragging. Search filters the visible cards. The sort button cycles inactive
channels through source order, A–Z and Z–A. The checkmark saves changes, while
the cross or Escape closes without saving. The top right button switches
between the configured size and full screen.

Logos retain their proportions and are centered within the configured channel
width and row height. Images load close to the visible area with up to four
concurrent requests and one retry. The vertical scrollbar is hidden; a slim
horizontal scrollbar remains available below the programme rows.

After the current day loads, the widget waits at least ten seconds and
prefetches the following two broadcast days. Active image downloads may delay
this operation.

| Attribute               | Default/example       | Description                            |
| ----------------------- | --------------------- | -------------------------------------- |
| `tvprogram_oid`         | `tvprogram.0.tv1.cmd` | Data point belonging to the TV         |
| `widthItem`             | `120`                 | Width of a 30 minute segment in pixels |
| `heightRow`             | `35`                  | Programme row height in pixels         |
| `channeliconwidth`      | `35`                  | Available channel logo width in pixels |
| `showpictures`          | enabled               | Show programme pictures when available |
| `headerfontpercent`     | `125`                 | Time header font size in percent       |
| `broadcastfontpercent`  | `75`                  | Programme font size in percent         |
| `highlightcolor`        | `yellow`              | Favorite highlight color               |
| `markerpositionpercent` | `25`                  | Current time marker position           |
| `dialogwidthpercent`    | `90`                  | Dialog width relative to the widget    |
| `dialogheightpercent`   | `90`                  | Dialog height relative to the widget   |

### Favorites

The Favorites widget lists upcoming programmes whose titles are in the TV's
`favorites` data point. Results are sorted by date and time and refresh every
minute.

| Attribute                    | Default/example       | Description                         |
| ---------------------------- | --------------------- | ----------------------------------- |
| `oid`                        | `tvprogram.0.tv1.cmd` | Data point belonging to the TV      |
| `channelname`                | disabled              | Show channel names instead of logos |
| `favorites_selectedchannels` | disabled              | Limit results to selected channels  |
| `showweekday`                | enabled               | Show the weekday                    |
| `maxfavorites`               | `10`                  | Maximum number of results           |
| `highlightcolor`             | `yellow`              | Favorite icon color                 |
| `channeliconwidth`           | `35`                  | Channel logo width in pixels        |

When the selected channel limit is enabled, Favorites uses the Timetable
selection for the same TV. Before a selection has been saved, the first four
channels are used. An explicitly empty selection produces no results.

### TV Control

TV Control shows the programme running now or at a configured time. Clicking a
channel logo writes a switch command; clicking anywhere on a programme card
opens its details. It scrolls vertically without displaying a scrollbar.

| Attribute              | Default/example       | Description                                     |
| ---------------------- | --------------------- | ----------------------------------------------- |
| `oid`                  | `tvprogram.0.tv1.cmd` | Data point belonging to the TV                  |
| `time`                 | empty                 | Show the current programme                      |
| `time`                 | `20:15`               | Show the programme at this time for 120 minutes |
| `time`                 | `20:15/200`           | Use a 200 minute display period                 |
| `time`                 | ISO date string       | Show programmes at an absolute time             |
| `heightRow`            | `35`                  | Programme row height in pixels                  |
| `channeliconwidth`     | `35`                  | Available channel logo width in pixels          |
| `showpictures`         | enabled               | Show programme pictures when available          |
| `broadcastfontpercent` | `75`                  | Programme font size in percent                  |
| `highlightcolor`       | `yellow`              | Favorite highlight color                        |
| `dialogwidthpercent`   | `90`                  | Detail dialog width                             |
| `dialogheightpercent`  | `90`                  | Detail dialog height                            |

### Search

Search finds programmes by title, description, category and start date. At
least the search text or a category must be provided. An unchanged current date
starts the search at the current time; another date starts at midnight.
Alternative channel logos from `optchnlogopath` are supported. Results scroll
vertically without displaying a scrollbar.

| Attribute              | Default/example       | Description                            |
| ---------------------- | --------------------- | -------------------------------------- |
| `Object ID`            | `tvprogram.0.tv1.cmd` | Data point belonging to the TV         |
| `showpictures`         | enabled               | Show programme pictures when available |
| `maxresults`           | `10`                  | Maximum number of results              |
| `heightRow`            | `35`                  | Programme row height in pixels         |
| `broadcastfontpercent` | `75`                  | Programme font size in percent         |
| `highlightcolor`       | `yellow`              | Favorite highlight color               |
| `dialogwidthpercent`   | `90`                  | Detail dialog width                    |
| `dialogheightpercent`  | `90`                  | Detail dialog height                   |

## Data points

Each configured TV provides these data points:

| Data point       | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `channelfilter`  | Selected channel IDs in their display order as JSON     |
| `cmd`            | Internal communication between widgets and the adapter  |
| `favorites`      | Favorite programme titles as a JSON array               |
| `record`         | Programme data written by the detail view record button |
| `selectchannel`  | Channel ID written by logo and switch actions           |
| `show`           | Whether programme widgets show favorites only           |
| `config`         | Deprecated configuration data point                     |
| `optchnlogopath` | Browser accessible base URL for custom channel logos    |

The `record` value contains `startTime`, `endTime`, `title`, `channel`,
`channelid`, `channelname` and `eventid`.

## `sendTo` commands

Use these commands to build custom integrations:

| Command                  | Input                                | Result                   |
| ------------------------ | ------------------------------------ | ------------------------ |
| `getServerData`          | `categories`, `genres` or `channels` | Array                    |
| `getServerTVProgram`     | Broadcast day as `yyyy-mm-dd`        | Array                    |
| `getServerBroadcast`     | `viewdate` and `eventid`             | Object                   |
| `getFavoritesData`       | Array of favorite titles             | Array                    |
| `getServerBroadcastNow`  | Array of channel IDs                 | Array                    |
| `getServerBroadcastDate` | Channel IDs and date                 | Array                    |
| `getServerBroadcastFind` | Filters and date range               | Array                    |
| `getServerInfo`          | Empty object                         | Available broadcast days |

Parameters and runnable calls are documented in
[`sendTo` command examples](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#sendto-command-examples).

## Examples

All longer examples are maintained in [docs/EXAMPLES.md](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md):

- widget CSS customization
- `sendTo` requests
- Harmony and MagentaTV channel switching
- alternative channel logo setup
- recording list and favorite status scripts
- record highlighting templates

## Features

- Programme timeline with current time marker and automatic scrolling
- Configurable channel selection and ordering
- Programme detail dialogs and text copying
- Day navigation and zoom controls
- Favorite filtering and upcoming favorite list
- Channel switching through a data point
- Optional programme pictures and alternative channel logos
- Configurable logo width, row height, colors and dialog dimensions
- Record data point populated from programme details

## Planned work

- Consider an additional widget for highlighted programmes.
- Evaluate other programme sources or hardware sources when there is sufficient
  demand.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.0.1 (2026-09-23)

- fix tests

### 5.0.0 (2026-09-23)

- Comprehensive revision
- New data source added

### 4.0.4 (2026-03-27)

- update dependencies
- fix repochecker
- tranform translation files

### 4.0.3 (2026-02-27)

- update dependencies
- improve error handling

### 4.0.2 (2026-01-27)

- improve position of dialogs
- reduce requests to data provider
- test remove node 18,extend to node 24

## License

MIT License

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

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>