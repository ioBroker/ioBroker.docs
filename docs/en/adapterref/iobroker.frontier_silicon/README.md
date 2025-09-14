---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.frontier_silicon.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/frontier_silicon-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/frontier_silicon-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
---
# FSAPI Examples

Read presets  
<http://192.168.178.26/fsapi/LIST_GET_NEXT/netRemote.nav.presets/-1?pin=7389&sid=883168529&maxItems=10>

Nav on  
<http://192.168.178.26/fsapi/SET/netRemote.nav.state?pin=7389&sid=883168529&value=1>

Read modes  
<http://192.168.178.26/fsapi/LIST_GET_NEXT/netRemote.sys.caps.validModes/-1?pin=7389&sid=682647964&maxItems=100>

Read current mode  
<http://192.168.178.26/fsapi/GET/netRemote.sys.mode?pin=7389&sid=682647964>

Search for updates  
<http://192.168.178.26/fsapi/SET/netRemote.sys.isu.control?pin=7389&value=2>

On/Off?  
<http://192.168.178.26/fsapi/GET/netRemote.sys.power?pin=7389&sid=682647964>

Switch On  
<http://192.168.178.26/fsapi/SET/netRemote.sys.power?pin=7389&sid=883168529&value=0>

Other FSAPI documents  
<https://github.com/flammy/fsapi/blob/master/FSAPI.md>
<https://www.niehoff.nl/producthandleiding/PMR4000RMKII-03.pdf>
<https://downloads.biamp.com/assets/docs/default-source/control/apart-pmr4000r-mkii-mkiii-control-command-list.pdf?sfvrsn=13dc3a3e_6&_ga=2.16179958.1900116300.1624008695-122457801.1580652037>
<https://github.com/z1c0/FsApi/blob/master/FsApi/Command.cs>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-08-28) - 2025H2 maintenance release

- (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
- (oelison)  New: Read and write from daylight saving time
- (pdbjjens) Fix: UpdatePreset now handles empty presets correctly (#289)
- (pdbjjens) Change: Adapter and FSAPI documentation was moved to the docs folder (#281)
- (pdbjjens) Change: Cleanup devDependencies

### 0.4.0 (2025-02-01) - 2025H1 maintenance release

- (pdbjjens) Change: media state changed from number to string and readonly (#241)
- (pdbjjens) New: Added media control function "stop" (#241)
- (pdbjjens) New: Optimizations for responsive design (#244)
- (pdbjjens) Change: Migration to ESLint 9 (#253)
- (pdbjjens) Fix: Added button state acknowledgement
- (pdbjjens) Fix: Prevent warning on adapter stop

### 0.3.0 (2024-08-27) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) Change: Removed .npmignore
- (pdbjjens) Change: Cyclic connection retry instead of disabling the adapter (#191)
- (pdbjjens) New: Updated dependencies
- (pdbjjens) Fix: Replace deprecated method "deleteChannel" by "delObject" (#224)

### 0.2.0 (2024-01-28)

- (pdbjjens) Change: Increase minor version number

### 0.1.2 (2024-01-26) - 2024 maintenance release

- (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: Optionally display PIN code and limit to 4 digits in config GUI
- (pdbjjens) Updated dependencies

## License

MIT License

Copyright (c) 2025 halloamt <iobroker@halloserv.de> & IoBroker-Community

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