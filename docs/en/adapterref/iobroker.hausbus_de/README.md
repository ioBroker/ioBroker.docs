![Logo](admin/hausbusde.png)

# iobroker.hausbus_de
IO Broker Adapter that supports all haus-bus.de components.<br>
For a documentation about the supported hardware and IO Broker integration please check<br>www.haus-bus.de/iobroker

## Installation <a name="installation"></a>
This adapter is available as stable release in the official ioBroker catalog.<br>
It's recommended to install it directly from the catalog within ioBroker.<br>
If you need a newer version than available in the official ioBroker catalog you can also directly install this version here from github.<br>
If you are facing any problems or bugs please contact info@haus-bus.de<br>

## Setup
The HausBus.de adapter is ready to use without further configurations. It is automatically searching for haus-bus.de components using UDP broadcast requests. Its mandatory to have at least one haus-bus.de component with a network interface (for example any relay module) that is connected to the same network like io broker. Any further components can be connected by RS485 to the module with ethernet gateway.

<br>
<br>
<br>

## Changelog
### 1.6.14 (2026-05-03) 
  * fixed faulty detection of GIRA multi buttons

### 1.6.12 (2026-03-28)  
* support for new 4 channel relay module and 2 channel shutter module

### 1.5.2 (2025-12-23)
* support for WLAN socket

### 1.4.11 (2024-10-01)
* removed js-controller as dependency

### 1.4.10 (2024-09-07)
* check health for devices that do not respond during search devices

## License
MIT License

Copyright (c) 2026 Hermann Hoeschen <info@haus-bus.de>

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
