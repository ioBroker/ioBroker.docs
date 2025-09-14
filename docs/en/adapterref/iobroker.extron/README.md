![Logo](admin/extron.png)
# ioBroker.extron

[![NPM version](http://img.shields.io/npm/v/iobroker.extron.svg)](https://www.npmjs.com/package/iobroker.extron)
[![Downloads](https://img.shields.io/npm/dm/iobroker.extron.svg)](https://www.npmjs.com/package/iobroker.extron)
![Number of Installations (latest)](http://iobroker.live/badges/extron-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/extron-stable.svg)
![Test and Release](https://github.com/bannsaenger/iobroker.extron/workflows/Test%20and%20Release/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)](https://snyk.io/test/github/Bannsaenger/ioBroker.extron)

[![NPM](https://nodei.co/npm/iobroker.extron.png?downloads=true)](https://nodei.co/npm/iobroker.extron/)

## References
Extron®, CrossPoint®, DTP®, NetPA®, XPA®, XTP® are registered trademarks of RGB Systems, Incorporated\
See [www.extron.com](https://www.extron.com/article/termsprivacy)

The logo is taken from the Extron Control App by Extron

Dante® is a trademark of [Audinate](https://www.audinate.com/)

## extron adapter for ioBroker

Extron SIS adapter

Control devices from Extron. 
This Adapter is designed to control some of the Extron Audio Video Products via the 
**S**imple **I**nstruction **S**et Protocol.
The functional scope of the devices is tremendous. Not all of the features make sense
to be supported with the adapter and the interaction with iobroker.

**Be aware:** When the device type is chosen in the adapter configuration it cannot be changed in the future !

There can be multiple instances of different or same types from this adapter in a iobroker installation. For future releases you have to add a valid license to the adapter configuration for each instance.
If you are a non commercial organisation or use it for private use you can get a licence for free. Please contact the author. 

### Supported devices
- 8x2 Presentation Matrix Switcher (DTP2 CrossPoint 82)
- H.264 Streaming Media Player and Decoder (SMD 202)
- Streaming Media Encoder (SME 211)
- 6x4 ProDSP Processor w/AEC and Dante (DMP 64 Plus C AT)
- 12x8 ProDSP Processor w/Dante (DMP 128 Plus AT)
- 12x8 ProDSP Processor w/AEC, VoIP, and Dante (DMP 128 Plus C V AT)
- Dante Audio Matrix Processor with AEC (XMP 240 C AT)

## ToDo
- The device type is checked on begin of the conversation. This fails sometimes. Must be changed to a more reliable mechanism. 
- Make a more granular selection of used in- and outputs to reduce database size at DSP devices
- add more commands and their implementation on the database side
- improve network reconnect machanism

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) updated dependencies
* (Bannsaenger) introducing jsonConfig
* (mschlgl) add more DSP SIS commands
* (mschlgl) enhanced network reconnect functionality, added DANTE remote commands, additional devices
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.2.15 (2024-06-12)
* (mschlgl) fixed typo in io-package.json

### 0.2.14 (2024-06-10)
* (mschlgl) changed function createDatabase to use setObj()

### 0.2.13 (2024-06-06)
* (mschlgl) corrected instance.comon.titleLang to be set at startup, updated role definitions, added audiofile transfer functionality for DMPxxx

### 0.2.12
* (mschlgl) added instance.comon.title / .titleLang to be set at startup

### 0.2.11
* (mschlgl) added instance.device.name to be set at startup

### 0.2.10
* (mschlgl) corrected preset list handling on SMD202

### 0.2.9
* (mschlgl) disable subtitle command on startup added for SMD202

### 0.2.8
* (mschlgl) onStreamData command debug msg added

### 0.2.7
* (mschlgl) SMD202 preset list handling updated

### 0.2.6
* (mschlgl) added SMD202 preset list handling on startup
### 0.2.5
* (mschlgl) added SMD202 preset list handling

### 0.2.4
* (mschlgl) corrected typo in object_templates

### 0.2.3
* (mschlgl) fixed DMP128 file handling

### 0.2.2
* (mschlgl) fixed SMD202 loopmode command

### 0.2.1
* (mschlgl) updated log messages, improved group control on DMP128

### 0.2.0
* (Bannsaenger) updated dependencies

### 0.1.16
* (mschlgl) fixed group command issues, added statedelay log message on DMP128

### 0.1.15
* (mschlgl) added statedelay log message on DMP128

### 0.1.14
* (mschlgl) fixed group command issues on DMP128

### 0.1.13
* (mschlgl) fixed source code version issues

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202

### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2025 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.