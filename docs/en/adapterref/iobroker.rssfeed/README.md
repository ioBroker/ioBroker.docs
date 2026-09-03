# ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)

![Logo](admin/rssfeed.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
![Number of Installations](https://iobroker.live/badges/rssfeed-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/rssfeed-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)](https://nodei.co/npm/iobroker.rssfeed/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Overview

This adapter requests and stores RSS feeds of different standards, including Atom, RSS, and RDF. The included VIS
1 and VIS 2 widgets can display the stored feeds. Their template-enabled widgets support customized HTML and CSS
output through EJS.

Important: Only the English translation is valid due to errors in automatically generated translations.

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [Documentation](#documentation)
    - [VIS 1 widgets](#vis-1-widgets)
    - [VIS 2 widgets](#vis-2-widgets)
    - [EJS template notation](#ejs-template-notation)
- [Todo](#todo)
- [Changelog](#changelog)
- [License](#license)

## Configuration

Install the adapter from the stable repository. New features and fixes may also be tested from the beta
repository. See the adapter's test and support thread in the ioBroker forum for announcements.

[iobroker Forum rssfeed support thread](https://mdcldn.short.gy/GqaIDT)

After installation, the adapter appears in the ioBroker adapter list. If web changes such as widgets or the
configuration dialog are not visible, upload the adapter files again:

```bash
iobroker upload rssfeed
```

Create an instance with the plus button in the adapter list.

### General settings

| Setting                | Description                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Default Refresh (min)  | Default interval, in minutes, for requesting feeds. The initial value is 60 minutes.                                           |
| Max Articles (default) | Default maximum number of articles stored for a feed.                                                                          |
| User Agent             | Optional but recommended HTTP user agent sent when requesting a feed. Update it if a provider rejects old browser identifiers. |

The release default for the user agent is:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36
```

### Feed settings

| Setting       | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| Name          | Name used for the created state. A name must be unique inside its folder.       |
| Category      | Optional subfolder in which the state is created.                               |
| URL           | Complete feed address, including `http://` or `https://`.                       |
| Refresh (min) | Optional feed-specific refresh interval. When empty, the general value is used. |
| Max Articles  | Optional feed-specific article limit. When empty, the general value is used.    |

After saving the configuration, each feed is available as a JSON state in the object tree. Removing a feed from
the configuration does not automatically delete its existing states.

## Documentation

The detailed user documentation is divided by VIS generation and by template language. Each widget guide was
checked against its current source definition and documents the settings, defaults, template data, and relevant
runtime behavior.

### VIS 1 widgets

The VIS 1 guide covers every classic widget: single feed, combined feeds, metadata and article helpers, and the
title marquee. It includes a separate chapter and configuration table for each widget as well as VIS 1-specific
template variables and behavior.

[Open the VIS 1 widget documentation](docs/vis1-widgets.md)

### VIS 2 widgets

The VIS 2 guide covers all five React-based components, their complete property-editor settings, defaults,
template variables, feed aggregation behavior, and known user-visible limitations.

[Open the VIS 2 widget documentation](docs/vis2-widgets.md)

### EJS template notation

The EJS guide explains the general template notation independently of a particular widget. It covers escaped and
unescaped output, conditions, loops, fallback values, CSS, links, scripts, timers, and troubleshooting. The
widget-specific variables and examples remain in the corresponding VIS guide.

[Open the EJS template documentation](docs/ejs-templates.md)

## Todo

- Clean up unused entries in `info.lastRequest` when saving the admin configuration.
- Add a button for deleting unused feed states from the object tree.

## Changelog

[Older changelogs can be found here](CHANGELOG_OLD.md)

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.1 (2026-09-01)

- update EJS and update preparation mechanism
- integrate the VIS 2 RSS feed widgets into this adapter
- split the VIS 1, VIS 2, and EJS documentation into dedicated user guides
- add automatic overflow handling and scrollbars to widgets
- fix date/publish date usage in templates
- updated and reworked readme

### 4.1.2 (2026-06-10)

- fix package lock

### 4.1.0 (2026-06-10)

- fix repochecker

### 4.0.4-alpha.0 (2026-06-09)

- add user agent to settings and Axios requests

### 4.0.3 (2026-03-26)

- update packages
- fix repochecker

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

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
