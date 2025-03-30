---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
---
# ioBroker adapter for ZigBee devices
With the help of a coordinator, based on the chip "Texas Instruments CC253x" (and others), a ZigBee network is created for ZigBee devices (bulbs, dimmers, sensors, …) to join. Thanks to the direct interaction with the coordinator, the ZigBee adapter allows to control the devices without any manufacturer gateways/bridges (Xiaomi/Tradfri/Hue). Additional information about ZigBee can be found [here](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network).

## Hardware
Additional hardware is required for the coordinator (see above), which enables conversion between USB and ZigBee radio signals. There are 2 groups:

• Attachment module for the RaspberryPi (It's old and not supported Zigbee V3)<br>
•	USB stick like hardware

![](../de/img/CC2531.png)
![](../de/img/sku_429478_2.png)
![](../de/img/cc26x2r.PNG)
![](../de/img/CC2591.png)
![](../de/img/sonoff.png)


Some of these devices require the installation of suitable firmware for operation:
The required flasher/programmer and the process of preparation are described [here](https://github.com/Koenkk/zigbee2mqtt/wiki/Getting-started) or [here (Russian)](https://github.com/kirovilya/ioBroker.zigbee/wiki/%D0%9F%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B0). 

The "Sonoff ZIGBEE 3.0 USB STICK CC2652P" is becoming increasingly popular:
![](../de/img/sonoff.png)

   - Flashing of suitable firmware is not absolutely necessary (hardware is already delivered with suitable firmware)
   - Supports the newer ZigBee 3.0 standard

The devices connected to the ZigBee network transmit their status to the coordinator and notify it of events (button press, motion detection, temperature change, ...). This information is displayed in the adapter under the respective ioBroker objects and can thus be further processed in ioBroker. It is also possible to send commands to the ZigBee device (change of status of sockets and lamps, color and brightness settings, ...).


## Software

The software is divided into "converter" and "adapter".

![](img/software1.jpg)

   - Converter
    The converter is divided into two parts: <br>
      a) General provision of the data from the ZigBee radio signals. This [software part](https://github.com/Koenkk/zigbee-herdsman) is used for all ZigBee devices. <br>
      b) Device-specific [processing](https://github.com/Koenkk/zigbee-herdsman-converters) of the data to a defined interface to the adapter.
   - Adapter<br>
      This software part is the connection of the converter to ioBroker. The [adapter](https://github.com/ioBroker/ioBroker.zigbee) includes the graphical user interface for managing the ZigBee devices and the creation of ioBroker objects for controlling the ZigBee devices.

    
## Installation
1.	Connect the coordinator hardware to the RaspberryPi.<br>
2.	Connect to RaspberryPi, e.g., via PuTTY.<br>
3.	Delete any existing ZigBee backup file. Otherwise, the ZigBee adapter will not turn green in ioBroker and the ioBroker log will state that the adapter is misconfigured <br>
4.	Find out the path of the coordinator :
`ls -la /dev/serial/by-id/`
![](../de/img/Bild2.png)
5.	ioBroker -> install ZigBee adapter, here Version 1.8.10 <br> ![](../de/img/Bild3.png)  <br> This will install all the necessary software parts (converter and adapter).
6.	Open adapter -> ![](img/Bild4.png) -> Enter the previously determined path of the coordinator with the addition /dev/serial/by-id/:![](../de/img/Bild5.jpg) <br> There must be NO spaces at the end of the path.
7.	Configure network ID and Pan ID to differentiate from other ZigBee networks within radio range, e.g. <br>
   ![](../de/img/Bild6.png) ![](../de/img/Bild7.png) <br> ![](../de/img/Bild8.png) ![](img/Bild9.png)
8.	Check if the adapter turns green in ioBroker. Target state: <br> ![](../de/img/Bild10.png) <br> Otherwise read the ioBroker log and look for the cause of the error, check also our Forum.

## Pairing
Each ZigBee device (switch, bulb, sensor, ...) must be paired with the coordinator (pairing):  <br>

   - ZigBee device:
    Each ZigBee device can only be connected to exactly 1 ZigBee network. If the ZigBee device still has pairing information saved for a different coordinator (e.g. Philips Hue Bridge), then it must first be decoupled from this ZigBee network. This decoupling from the old ZigBee network preferably is done via the user interface of the old ZigBee network (z.B. Philips Hue App). Alternatively, you can reset the ZigBee device to factory settings.  <br>
There are typically the following options for putting a ZigBee device into pairing mode <br>    
        1.	Unpair a ZigBee device from a ZigBee network
        2.	Press the pairing button on the ZigBee device  
        3.	Switch the supply voltage of the ZigBee device off and then on again

      
The ZigBee device is then in pairing mode for typically 60 seconds. Similar to the procedure for resetting to factory settings, activating the pairing mode also depends on the respective device type (if necessary, read the operating instructions of the ZigBee device).

   - Coordinator:
Press the green button to put the coordinator into pairing mode for 60 seconds. <br>
![](../de/img/Bild12.png)

   - Wait until "New device joined" appears in the dialog:  <br>
![](img/Bild13.png)

   - Check Pairing:
The device to be paired must be supported by the ioBroker ZigBee adapter. In the best case, a new device is displayed in the ZigBee adapter (e.g. Philips Light Stripe) and corresponding ioBroker objects are created:
![](../de/img/Bild14.png) ![](../de/img/Bild15.png)

   - In the worst case, the ZigBee device is not currently supported. The next section describes what needs to be done to use this ZigBee device anyhow.

## Pairing of unknown ZigBee devices so far

With unknown ZigBee devices so far, the ZigBee name of the ZigBee device (e.g., HOMA1001) appears during pairing with the addition "not described in statesMapping" <br>
![](../de/img/Bild28.png) <br>
![](../de/img/Bild16.png) <br>

Turning this tile gives you detailed information about the ZigBee device: <br>
![](../de/img/Bild17.png) ![](img/Bild18.png) <br>

After registering at [github.com](https://github.com/ioBroker/ioBroker.zigbee/issues) the missing ZigBee device must be reported via an "Issue":

![](../de/img/Bild19.png) <br>

   - Insert detailed information of the tile (see above) into the issue, create short documentation (preferably in English) and send it. A developer will then respond via the issue.

After modifying the relevant files, the ZigBee adapter must be restarted, and the ZigBee device must be unpaired from the coordinator:
![](../de/img/Bild20.png) <br>
After that, the pairing can be repeated. Target state after pairing: <br>
![](../de/img/Bild21.png) <br>

With some ZigBee devices, it is necessary to display all software interfaces ("exposes") of the new ZigBee device in the ioBroker objects in order to be able to use all the functions of this ZigBee device. In such cases, the new ZigBee device must be included in the "Exclude" group.

![](../de/img/Bild22.png) <br>

![](img/Bild23.png) -> ![](../de/img/Bild24.png) -> ![](img/Bild25.png) -> select ZigBee device (e.g. HOMA1001)  -> ![](img/Bild26.png)    <br>
After restarting the ZigBee adapter, the new ZigBee device should now work without restrictions.



## Symbols within the ZigBee adapter
    
| Icon                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![](../de/img/Bild30.png)  | **State Cleanup** Deletion of invalid ioBroker objects, which can result from the "Exclude" process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ![](../de/img/Bild31.png)  | **Check firmware updates** Update the firmware of the ZigBee devices (e.g. Philips Hue bulbs).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ![](../de/img/Bild32.png)  | **Add Group** Using this function, ZigBee devices can be combined into a logical group and then be controlled together via one ioBroker object, e.g. brightness=20 sets the brightness of all ZigBee devices in the group to 20.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ![](../de/img/Bild33.png)  | **Touchlink reset and pairing** Touchlink is a ZigBee function that allows devices that are physically close to each other to communicate with each other without being in the same network. Not all devices support this feature.To factory reset a ZigBee device via Touchlink, bring the device close (< 10 cm) to the ZigBee coordinator and then press this green icon.                                                                                                                                                                                                                                                                                                 |
| ![](../de/img/Bild34.png)  | **Pairing with QR code** Bei With some ZigBee devices, pairing is done using a QR code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ![](../de/img/Bild35.png)  | **Let's start Pairing**  Start the pairing process for new ZigBee devices.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ![](../de/img/Bild36.png)  | Time since data was last exchanged with this ZigBee device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ![](../de/img/Bild37.png)  | Strength of the ZigBee radio signal at this ZigBee device (<10 poor, <50 medium, >50 good).ZigBee is a wireless mesh network. Most mains-operated ZigBee devices (e.g. Philips Hue bulbs) can act as a ZigBee router, this means as a radio node. ZigBee devices therefore do not necessarily have to establish a direct wireless connection to the coordinator, but can instead use any router in the network for the wireless connection. The radio range of the network is thus extended with each ZigBee router. All ZigBee devices regularly check whether there is a better radio route and switch over automatically. However, this process can take several minutes. |

## Additional information
There is [another](https://www.zigbee2mqtt.io/) with the same functions and the same technology, which communicates with the same devices via an MQTT protocol. If any improvements or new supported devices are included in the ZigBee2MQTT project, those can also be added to this project. If you notice any differences, please write an issue and we will take care of it.
Other topics related to this adapter are also documented in the associated wiki.

## Changelog
### 2.0.5 (2025-03-25)
* (asgothian) ZHC 23.6.0
* (asgothian) ZH 3.3.x
* (asgothian) removed extra logging
* (asgothian) fixed memory issue.
* (asgothian) Configure on Message - 5 attempts.
* (arteck) update transmitPower
* (asgothian) fix crash in ZigbeeController.ByteArrayToString
* (AlexHaxe) device designation for  devices without mapped model (allows use in groups and bindings)
*

### 2.0.4 (2025-03-09)
* (arteck) back to 2.0.2

### 2.0.3 (2025-03-07)
* (asgothian) fix configured info
* (asgothian) fix battery voltage (V -> mV)
* (asgothian) enable debug interface v1.0
* (asgothian) Push Zigbee-Herdsman to 2.5.7
* (asgothian) Push Zigbee-Herdsman-Converters to 23.1.1
* (asgothian) fix configure on message
* (asgothian) remove extra warning messages
* (asgothian) fix Adapter-Checker notes
* (asgothian) improve base64 image detection
* (asgothian) removed unused adaptert objects (info.groups, excludes) from adapter config
*

### 2.0.2 (2025-03-02)
* (asgothian)  expose generation with expose function requiring a device. (Issue #1842)
* (asgothian) fix failure to configure for devices needing multiple configurations (Issue #2375)
* (asgothian) fix hold/release and press/release action handling (Issue #2387)
* (asgothian) fix lib/legacy requirement for external converters (Issue #2376)
* (asgothian) improved external converter handling
* (asgothian) fix OTA bug
* (asgothian) improved message handling for devices which report values outside their defined ranges
* (asgothian) preparation for ZHC 22.x (model definition loaded on demand
* (asgothian) fix legacy definition for devices
* (asgothian) added action state for remotes.
*

### 2.0.1 (2025-02-25)
* BREAKING CHANGES
*
* switch to converters 21 changes the exposes for a large numbern of devices (mostly remotes)
* new method for controlling color based on subchannels for rgb, hs and xy
* Exposes as default for ALL devices. Use of old definition as option only
* Requires Node 20.x or newer
*
* (asgothian) Fix Pairing
* (asgothian) change ping
* (asgothian) delay map generation until refresh is activated, map messages after generation
* (asgothian) remove bindings tab from zigbee tab
* (asgothian) reorder tabs in configuration
* (asgothian) remove binding tab from configuration
* (asgothian) remove map from configuration
* (asgothian) add debug to zigbee tab
* (asgothian) Herdsman 3.2.5, Converters 21.30.0
* (asgothian) Exposes as default, use of old device definitions as legacy optional
* (asgothian) User specific images (model based, device based)
* (asgothian) Improved group editing - remove members from group card

### 1.10.14 (2025-01-01)
* (arteck) Herdsman 2.1.9, Converters 20.58.0
* (asgothian) Fix: Aqara T1M (CL-L02D)
* (arteck) deleteDeviceStates change to deleteObj

### 1.10.13 (2024-11-10)
* (arteck) corr icon download bug (axios)

### 1.10.12 (2024-11-03)
* (asgothian) corr Channel Scan

### 1.10.11 (2024-11-02)
* BREAKING CHANGE
*
*  bugs : ChannelScan is currently not available
*
*
* (lebrinkma) fix linter errors
* (asgothian) disable map display for deactivated devices
* (asgothian) new option on map: disable physics interaction
* (asgothian) new zigbee-herdsman-converters 20.28.0
* (asgothian) new zigbee-herdsman 2.1.1
* (asgothian) Allow use of keyless converters (used for TuYa and compatible devices in zigbee-herdsman-converters
* (arteck) swap from request to axios
* (arteck) delete groups works again

### 1.10.9 (2024-09-05)
* (arteck) typo admin settings
* (arteck) eslint config

### 1.10.8 (2024-09-05)
* (arteck) corr admin settings
* (arteck) add new eslint version

### 1.10.7 (2024-09-05)
* (arteck) add flow control option
* (asgothian) add new NewHerdsman
* (arteck) add new ezsp coordinator Firmware (7.4.1.0)

### 1.10.5 (2024-06-21)
* (arteck) icon ota device update
* (arteck) icon fix

### 1.10.4 (2024-04-20)
* (arteck) core update
* (arteck) dependency update

### 1.10.3 (2024-04-06)
* (arteck) dependency update

### 1.10.2 (2024-01-25)
* (arteck) dependency update

### 1.10.1 (2024-01-21)
* (arteck) Baudrate is now configurable. works ONLY with Deconz/Conbee(38400)
* (arteck) add nvbackup.json delete button

### 1.10.0 (2024-01-13)
* (arteck) new zigbee-herdsman-converters 18.x
* (arteck) configure message is now a warning

 ***********************************************

### 1.0.0 (2020-01-22)
* Powered by new [zigbee-herdsman](https://github.com/Koenkk/zigbee-herdsman) library and new [converters database](https://github.com/Koenkk/zigbee-herdsman-converters)
* Drop support NodeJS 6
* Serialport 8.0.5 (in zigbee-herdsman)
* More new devices
* Some design update
* Binding


------------------------------------------------------------------------------

## License
The MIT License (MIT)

Copyright (c) 2018-2025 Kirov Ilya <kirovilya@gmail.com>

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