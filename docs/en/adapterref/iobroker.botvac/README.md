![Logo](admin/botvac.png)
# ioBroker.botvac
![Number of Installations](http://iobroker.live/badges/botvac-installed.svg) ![Number of Installations](http://iobroker.live/badges/botvac-stable.svg) 
## Installation
- Install the adapter
- fill in your Botvac user credentials
- if needed change the poll interval (60 is minimum)

## Usage
- use the states in the commands channel to control your Botvac
- use the can* states in the status channel to see which commands are valid
- all states in the status channel are read-only

## Examples
### clean in eco mode
- check if status.canStart is ```true```
- set commands.eco to ```true```
- set commands.clean to ```true```

### clean a 150cm * 150cm spot
- place the Botvac in front of the desired location
- check if status.canStart is ```true```
- set commands.spotHeight and commands.spotWidth to ```150``` 
- set commands.cleanSpot to ```true```

### return to base
- status.dockHasBeenSeen has to be ```true```
- Botvac has to be in paused or stopped state (commands.stop / commands.pause)
- set commands.goToBase to ```true```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.3.1 (2026-02-17)
- (copilot) Replaced deprecated deleteState(), deleteChannel(), and deleteDevice() methods with delObject()
- (copilot) Replaced setObjectNotExists with extendObject to automatically update object configurations on adapter upgrades
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config
- (copilot) Fixed undefined variable bugs in schedule handling code
- (copilot) Fixed async callback bugs with mode and boundary variables

### 2.3.0 (2026-02-16)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-04)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.0 (2024-03-21)
- (mcm1957) Adapter requires node 18 or newer now.
- (mcm1957) Dependencies have been updated.

### 2.0.2 (2023-12-23)
- (ar7bd) SpotWidth and spotHeight are now allowed to be zero. [#29]
- (mcm1957) Dependencies have been updated.

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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
