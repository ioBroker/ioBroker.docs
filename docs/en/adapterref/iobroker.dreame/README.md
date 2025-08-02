![Logo](admin/dreame.png)

# ioBroker.dreame

[![NPM version](https://img.shields.io/npm/v/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)](https://www.npmjs.com/package/iobroker.dreame)
![Number of Installations](https://iobroker.live/badges/dreame-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/dreame-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)](https://nodei.co/npm/iobroker.dreame/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## dreame adapter for ioBroker

Adapter for dreame home devices tested with L10 L20 and x40

#### deviceId.status

Current Status of the devices

#### deviceId.remote

Remote control of the devices
Start: dreame.0.xxxxx.remote.start-sweep
Stop: dreame.0.xxxxx.remote.start-charge

Start Shortcut:

dreame.0.XXXXXXXX.remote.start-clean

```
[
                {
                    "piid": 1,
                    "value": 25
                },
                {
                    "piid": 10,
                    "value": "32"
                }
]
```

"value": "32" -> Shortcut id

List of shortcuts:

dreame.0.XXXXX.status.4-48

Names are base64 encoded
If there is no 4-48 state you have to start a short cut

### Room cleaning

dreame.0.XXXX.remote.start-clean

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1]]}"
                }
            ]
```

X = room id

Multiple Rooms:

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}"
                }
            ]
```

X = room 1
Y = room 2

Karte wechseln
dreame.XXXXXXX.remote.update-map

```
 [
                {
                    "piid": 4,
                    "value": "{\"sm\":{},\"mapid\":X}"
                }
            ]
```

X = mapId
dreame.0.XXXX.status.6-99
oder
dreame.0.XXXX.map.curid

### Control Clean Modes

Enable CleanGenius:
dreame.0.XXXXXX.remote.customCommand

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":1}",
    "siid": 4,
    "piid": 50
  }
]
```

Disable CleanGenius:

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":0}",
    "siid": 4,
    "piid": 50
  }
]
```

CleanGenius Deep Cleaning: \"v\":2

CleanGenius Mode: value: 3 or value 2

```
[
            {

                "value": 2,
                "siid": 28,
                "piid": 5
            }
        ]

```

Change Cleaning Mode:

```
[
{

                "value": 5122,
                "siid": 4,
                "piid": 23
            }
        ]
```

Values: 5120, 5121, 5122...

Vaccuum Mode:

```
[
{

                "value": 2,
                "siid": 4,
                "piid": 4
            }
        ]

```

Mop Intensity:

```
[
            {

                "value": 28,
                "siid": 28,
                "piid": 1
            }
        ]
```

Route:

```
 [
            {

                "value": "{\"k\":\"CleanRoute\",\"v\":1}",
                "siid": 4,
                "piid": 50
            }
        ]
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2025-01-24)

- reduce cpu load while cleaning

### 0.2.1 (2025-01-15)

- fix for canvas installation

### 0.2.0 (2024-12-28)

- add simple maps

### 0.1.0 (2024-12-14)

- bugfixes

### 0.1.0 (2024-12-14)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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

````

```

```
````
