![Logo](admin/nmea.png)
# ioBroker.nmea
This adapter allows connecting ioBroker to NMEA-2000 yacht bus.

To use this adapter, you need a hardware that can read NMEA-2000 bus and convert it to the serial port:
- Actisense NGT-1 (USB)
- or Raspberry PI with Pican-M

![Widgets](img/widgetExamples.png)

## How to use it on Raspberry PI with Pican-M

The PiCAN M is a compact add-on board designed for the Raspberry Pi 3/4.
It enables the connection of both NMEA2000 and NMEA0183 networks to a Raspberry Pi.
The board can be powered through an external 12V source.
Additionally, it offers the option to power the Raspberry Pi directly via the NMEA2000 bus when used with the PiCAN-M board.

Because of the high requirements of Raspberry Pi to power supply, we suggest powering the Raspberry PI from the external power source.
Power over NMEA2000 and over USB could function in parallel without a problem.

### Installation
Edit file `/boot/config.txt` (with `sudo nano /boot/config.txt`) and add the following lines to the end of the file:
```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25 
```

Disable outputs on UART console: 
- start in CLI `sudo raspi-config`
- go to `3 Interface Options`
- go ot `I5 Serial Port`
- Disable `shell accessible over serial` and `serial port hardware enabled`
- Exit from raspi-config and reboot

Install can-utils
```
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 is visible on Windows or Linux without any additional drivers. It is visible as a serial port 'COMn' (Windows) or ttyN(on linux).

## Todo
- Encode code
- AIS
- find out why sent data from address 100

<!--
	### **WORK IN PROGRESS**
-->
## Changelog
### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
