# ioBroker.pi-hole2

![Logo](admin/pi-hole2.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)](https://www.npmjs.com/package/iobroker.pi-hole2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)](https://www.npmjs.com/package/iobroker.pi-hole2)
![Number of Installations](https://iobroker.live/badges/pi-hole2-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/pi-hole2-stable.svg)
[![nycrc config on GitHub](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)](https://html-preview.github.io/?url=https://github.com/oweitman/ioBroker.pi-hole2/blob/main/coverage/index.html)

[![NPM](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)](https://nodei.co/npm/iobroker.pi-hole2/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## pi-hole2 adapter for ioBroker

Manage a pi-hole installation >=v6.
Get information from pi-hole.
Start/Stop blocking domains.
(for pi-hole <v6 please use adapter ioBroker.pi-hole)

USE AT YOUR OWN RISK!!! ABSOLUTELY NO WARRANTY FOR DAMAGES, ETC.!!!

Help or hints are welcome.

This adapter was rewritten for pi-hole V6 based on an idea by
Michael Schuster <development@unltd-networx.de>.

## Steps

1. Install the adpater

2. Fill in the fields of the adapter-admin. The url of the pi-hole device, the password, and obligatory the intervall to renew the values of the pi-hole (renew statistic in iobroker). Input in all refresh fields only between 1 second and 86400 seconds (24h) possible.

## Functions

### Enable/Disable the blocking

To Enable/Disable the blocking, please use the switch in Datapoint Blocking. The BlockingTime is only used for disabling the blocking to automaticly reenable the blocking. Enabling takes place immediately.

### Detailed information Summary

Some data from Summary is extracted into data points in Data.Summary.
This can be enabled/disabled in the configuration.
The data points are highlighted green/red when the feature is enabled/disabled.

### Detailed information Version

Some data from Version is extracted into data points in Data.Version.
This can be enabled/disabled in the configuration.
The data points are highlighted green/red when the feature is enabled/disabled.

### General SendTo Function

The sendTo function is used to send commands to the pi-hole device.
You can try the api on your local machine.
Go to [http://pihole/api/docs/#](http://pihole/api/docs/#), enter your password, and click the **Login** button.
If the domain `pihole` doesn't work, please check the hostname of your pi-hole instance in the top right corner of the dashboard page.

#### Example

```javascript
sendTo(
    'pi-hole2.0',
    'piholeapi',
    {
        method: 'GET',
        endpoint: '/history/clients',
        params: {
            N: 20,
        },
    },
    function (data) {
        console.log(data);
    },
);
```

If you want to use timestamps as parameters, please note that pi-hole uses UNIX timestamps.
These count the seconds since January 1, 1970. A JavaScript timestamp can be divided by 1000:

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## Visualization

### Versions with widget jsontemplate for vis and vis2

The jsontemplate widget can be installed via the following documentation: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

In the widget configuration enter the following datapoint:

```javascript
pi-hole2.0.Version
```

and the following template:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 100px;
    }
    p.pihole .version {
        display: inline-block;
        width: 50px;
    }
</style>
<p class="pihole"><span class="pihole name">core.local:</span><span class="pihole version"><%- data.version.core.local.version %></span></p>
<p class="pihole"><span class="pihole name">core.remote:</span><span class="pihole version"><%- data.version.core.remote.version %></span></p>
<p class="pihole"><span class="pihole name">web.local:</span><span class="pihole version"><%- data.version.web.local.version %></span></p>
<p class="pihole"><span class="pihole name">web.remote:</span><span class="pihole version"><%- data.version.web.remote.version %></span></p>
<p class="pihole"><span  class="pihole name">ftl.local:</span><span class="pihole version"><%- data.version.ftl.local.version %></span></p>
<p class="pihole"><span class="pihole name">ftl.remote:</span><span class="pihole version"><%- data.version.ftl.remote.version %></span></p>

```

### Summary with widget jsontemplate for vis and vis2

The jsontemplate widget can be installed via the following documentation: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

In the widget configuration enter the following datapoint:

```javascript
pi-hole2.0.Summary
```

and the following template:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 150px;
    }
    p.pihole .number {
        display: inline-block;
        width: 70px;
        text-align: right;
    }
</style>
<p class="pihole"><span class="pihole name">queries.total:</span><span class="pihole number"><%- data.queries.total %></span></p>
<p class="pihole"><span class="pihole name">queries.blocked:</span><span class="pihole number"><%- data.queries.blocked %></span></p>
<p class="pihole"><span class="pihole name">clients.active:</span><span class="pihole number"><%- data.clients.active %></span></p>
<p class="pihole"><span class="pihole name">clients.total:</span><span class="pihole number"><%- data.clients.total %></span></p>

```

## Todo Existing Functions

- ~~login~~
- ~~interval time~~
- ~~activate / decativate blocking~~
- ~~activating / deactivating timeinterval~~
- ~~version~~
- ~~versions~~
- ~~summary~~
- type
- summaryRaw ? dont know details
- topItems ? dont know details
- getQuerySources ? dont know details
- overTimeData10mins ? dont know details
- getForwardDestinations ? dont know details

## Todo New Functions

- ~~sendTo Functions to control and get informations with parameters~~

## Not Implemented or planned functions

- 2FA
- https protocol (possible but not tested)

## Troubleshooting

### WARNING: No free API seats available

Go to your pi-hole installation and delete in
**Settings / Webinterface/API / Currently active sessions**
alls Sessions with User Agent iobroker.pi-hole2.
You have restarted the adapter too often and each time a new session is requested.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.1.1 (2025-07-25)

- fix translation

### 1.1.0 (2025-07-24)

- add update indicators for different pihole components in the Data/Versions datapoints

### 1.0.0 (2025-07-16)

- If the adapter was already installed, please remove all existing data points of the adapter and restart the adapter.
- first beta channel release

### 0.4.2 (2025-07-16)

- set rejectUnauthorized to false
- remove some double jsdoc blocks
- fixed comments from adapter review

    remove unload event, create datapoint "Data", adjust state roles, check and limit refresh input parameters, fix roles

### 0.4.1 (2025-06-27)

- fix repochecker issues
- update packages
- remove history datapoint
- add jsdoc
- fix Blockingtime enabling
- fix datapoint coloring

### 0.4.0 (2025-06-25)

- Make extraction of detail values ​​for version/summary deactivatable

### 0.3.0 (2025-06-25)

- add translation files
- rework refresh logic aligned with pihole
- encrypt password (Password must be entered again )
- add detailed datapoints for Summary and Version for selected data

### 0.2.3 (2025-06-25)

- small documentation bugfix
- adjust user agent and add trouble shooting info
- add visualization example for versions
- add visualization example for summary

### 0.2.2 (2025-06-24)

- fix github action file

### 0.2.1 (2025-06-24)

- enable NPM deploy

### 0.2.0 (2025-06-24)

- (oweitman) first npm release

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

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
