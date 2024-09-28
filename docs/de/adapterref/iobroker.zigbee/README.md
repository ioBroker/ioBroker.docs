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

### UNRELEASED
* (lebrinkma) fix linter errors

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

## Changelog
### 1.10.2 (2024-01-25)
* (arteck) dependency update

### 1.10.1 (2024-01-21)
* (arteck) Baudrate is now configurable. works ONLY with Deconz/Conbee(38400)
* (arteck) add nvbackup.json delete button

### 1.10.0 (2024-01-13)
* (arteck) new zigbee-herdsman-converters 18.x
* (arteck) configure message is now a warning

### 1.9.7 (2024-01-05)
* (arteck) corr configure for some devices

### 1.9.6 (2024-01-01)
* (arteck) corr ikea bug 
* (crckmc) trv child lock works

### 1.9.5 (2023-12-29)
* (arteck) update dependency
* (arteck) min node 18.x.

### 1.9.4 (2023-12-29)
* (arteck) typo

### 1.9.3 (2023-12-26)
* (arteck) last zhc Version 16.x
* (arteck) corr reboot in statecontroller

### 1.9.2 (2023-12-25)
* (arteck) gen states from exposes as function
* (arteck) rebuild dev_names.json with state cleanup button

### 1.9.1 (2023-12-23)
* (arteck) corr TypeError: Cannot read properties of undefined (reading 'state')

### 1.9.0 (2023-12-22)
* (arteck) up to new zhc
* (arteck) update dependency

### 1.8.27 (2023-12-22)
* (arteck) update dependency

### 1.8.26 (2023-12-22)
* (arteck) corr toZigbee message
* (arteck) add deviceManager

### 1.8.25 (2023-12-17)
* zhc 16.x 
* (arteck) corr group from exclude dialog

### 1.8.24 (2023-09-05)
* (arteck) switch to exposes tab for some Aqara Devices [more infos](https://github.com/ioBroker/ioBroker.zigbee/wiki/Exposes-for-device-integration)

### 1.8.23 (2023-08-10)
* (arteck) query from xiaomi is now better

### 1.8.22 (2023-08-05)
* (arteck) crash when meta is empty

### 1.8.21 (2023-07-31)
* (arteck) no converter found

### 1.8.20 (2023-07-31)
* (arteck) add log

### 1.8.19 (2023-07-31)
* (arteck) fix occupancy_timeout
* (arteck) fix battery percentage and voltage

### 1.8.18 (2023-07-16)
* (arteck) little fix sentry and error log

### 1.8.17 (2023-07-15)
* (arteck) sentry corr

### 1.8.16 (2023-07-11)
* (arteck) battery corr

### 1.8.15 (2023-07-11)
* (arteck) corr battery status

### 1.8.13 (2023-07-09)
* (arteck) ota corr
* (arteck) devices are wrong with enum exposes
* (arteck) select field for groups is larger 
* (kirovilya) tuya.whitelabel corr

### 1.8.12 (2023-06-30)
* (arteck) new Documentation (thx Stefan)

### 1.8.11 (2022-12-10)
* (arteck) fix compsite exposes with a list

### 1.8.10 (2022-12-12)
* (asgothian) fix group access
* (asgothian) add option for pairing code:
   A new icon allows opening the network after first entering a pairing code
   listed on the device
* (asgothian) easier use of external converters
   - external converters can now be placed in the zigbee adapter data folder
   - no absolite path is required to access them
   - external converters posted on the GitHub for zigbee-herdsman-converters
     should work as they are - folders for libraries are rewritten to match
     the expected location when 'required' from within the zigbee adapter
   - Log entries will identify which files are entered as converters. Errors
     in these files should not cause the adapter to crash - instead, use of
     external converters may be unavailable.

### 1.8.9 (2022-12-10)
* (arteck) fix lidl plug

### 1.8.7 (2022-12-01)
* (arteck) fix exposes

### 1.8.5 (2022-11-30)
* (arteck) fix for new code

### 1.8.3 (2022-11-30)
* (arteck) back to old source

### 1.8.1 (2022-11-28)
* (bluefox) Packages updated
* (bluefox) Added names of serial ports in configuration dialog

### 1.7.7 (2022-11-24)
* dep update

### 1.7.6 (2022-07-23)
* (kirovilya) fix selecting nodes in admin
* (arteck) ikea fix

### 1.7.5 (2022-06-01)
* (arteck) error message for undefined devices or icons

### 1.7.4 (2022-05-30)
* (arteck) missing icons with multiple description

### 1.7.2 (2022-05-28)
* (arteck) download missing icons corr

### 1.7.1 (2022-05-28)
* (arteck) available status in admin is colored
* (arteck) disable Backups checkbox in settings
* (arteck) we keep last 10 backup files
* (arteck) download missing icons automatically (manual upload needed)

### 1.6.18 (2022-04-21)
* (arteck) fix pairing modus

### 1.6.17 (2022-04)
 rollback

### 1.6.16 (2022-02-16)
* (arteck) admin dep fix
* (arteck) colored objects for online/offline state

### 1.6.15 (2022-02-08)
* (arteck) Battery status % calculation was changed for xiaomi devices

### 1.6.14 (2022-01)
* (asgothian) OTA limitation
  - devices with the available state set to false are excluded from OTA updates (and the update check)
  - devices with link_quality 0 are excluded from OTA updates (and the update check)
* (asgothian) Device deactivation:
  - Devices can be marked inactive from the device card.
  - inactive devices are not pinged
  - state changes by the user are not sent to inactive devices.
  - when a pingable device is marked active (from being inactive) it will be pinged again.
  - inactive devices are excluded from OTA updates.
* (asgothian) Group rework part 2:
  - state device.groups will now be deleted with state Cleanup
  - state info.groups is now obsolete and will be deleted at adapter start (after transferring data to
    the new storage)
* (asgothian) Device name persistance.
  - Changes to device names made within the zigbee adapter are stored in the file dev_names.json. This file
    is not deleted when the adapter is removed, and will be referenced when a device is added to the zigbee adapter. Deleting and reinstalling the adapter will no longer remove custom device names, nor will deleting and adding the device anew.
* (asgothian) Readme edit to reflect the current information on zigbee coordinator hardware.
* (arteck) Zigbee-Herdsman 0.14.4, Zigbee-Herdsman-Converters 14.0.394

### 1.6.13 (2022-01)

* (kirovilya) update to Zigbee-Herdsman 0.14

### 1.6.12 (2022-01)
* (asgothian) Groups were newly revised (read [here](https://github.com/ioBroker/ioBroker.zigbee/pull/1327) )
   -  object device.groups is obsolet..the old one is no longer up to date

### 1.6.9 (2021-12)
* (simatec) fix admin Dark-Mode
* (asgothian) Expose Access Handling
* (arteck) translations
* (asgothian) fix groups
* (agross) use different normalization rules

### 1.6.1 (2021-08)
* (kirovilya) herdsman compatibility

### 1.6.0 (2021-08-09)

### 1.5.6 (2021-05-26)
* (kirovilya) new UI add

### 1.5.5 (2021-05-05)
* Fixes for new zigbee-herdsman-converters
* UI fixes

### 1.5.3 (2021-04-30)
* (arteck) Fix for js-controller 3.3.*

### 1.5.2 (2021-04-29)
* (asgothian) Groups on dashboard

### 1.5.1 (2021-04-14)
* (kirovilya) Dashboard
* (asgothian) Groups (reworked)
* [Experimental support EZSP protocol for EFR32 chips](https://github.com/Koenkk/zigbee-herdsman/issues/319) (zigbee-herdsman)

### 1.4.4 (2021-02-14)
* (kirovilya) External converters https://www.zigbee2mqtt.io/information/configuration.html#external-converters-configuration
* (asgothian) Enhancement ping process
* (asgothian) Devive query state-button
* (asgothian) State Cleanup button
* (arteck) Setting to use exposes instead of internal device description

### 1.4.1 (2020-12)
* (o0shojo0o) added a kelvin possibility into colortemp
* (asgothian) Hue_calibration for exposed devices (Use requires PR on zigbee-herdsman-converters, PR is being worked on)
* (asgothian) fix Tuya Thermostat: restore lost property "preset"
* (asgothian) Change for Device Availability: Stagger initial ping by 200 ms to prevent network congestion due to a large number of ping requests
* (asgothian) Change for Device Availability: Ping request triggered on reconnect. Before the herdsman Ping function is used, the adapter attempts to read the "state" dp. If this is successful, no ping is sent and the state is set
* (asgothian) Change for Device Availability: Set link Quality to 0 when a device is not connected, 10 when it is reconnecting.
* (asgothian) fix for message "illegal properties x,y" - remove color and color_temp from readable states on device available again (Issue #607)
* (asgothian) RGB Color can now be entered as "named" color. Implemented names are taken from the list of extended web colors on wikipedia (https://en.wikipedia.org/wiki/Web_colors)
* (asgothian) change in how RGB color is parsed. Incomplete colors will now be parsed successfully. #FFF will result in R 0, G 15, B 255
* (asgothian) change in OTA: Message that a device does not respond for OTA query downgraded to "info" from "error"
* (asgothian) new coordinator card

### 1.4.0 (2020-12)
* Many new devices available

Starting from version 1.4.0, new devices in iobroker.zigbee will be added automatically, based on the *exposes* described in zigbee-herdsman-converters.
The *exposes* section describes the device's capabilities, events and control commands. In iobroker.zigbee these descriptions are converted to iobroker states.
This means that the new device is described correctly enough in zigbee-herdsman-converters to start working with iobroker.zigbee (do not need to add it to our /lib/devices files.js and /lib/states.js).

The only thing that is not described (yet, it may change in the future) in zigbee-herdsman-converters is the device image. This is why the device icon on network map uses external links to the resource https://www.zigbee2mqtt.io/images/devices/*.
If you want to use local images, then you need to put the image file in /admin/img and briefly describe the device in the /lib/devices.js file without the *states*:
```
{
    models: [‘01MINIZB’],
    icon: 'img/ITEAD01ZBMINI. png',
}
```
in this case, the *states* attribute will be formed based on the *exposes* description and the image will be local.

### 1.3.1 (2020-10-30)
* [Experimental Zigate support](https://github.com/Koenkk/zigbee-herdsman/issues/242) (zigbee-herdsman)
* New devices by:
    asgothian, arteck, kirovilya, PaulchenPlump

### 1.3.0 (2020-10-07)
* More stable (zigbee-herdsman)
* Backup prior database and nv-data (for z-stack 3) before start adapter
* Allow to select bind cluster
* Admin Tab support (experimental)
* (UncleSamSwiss, DutchmanNL) Translation
* New devices by:
    arteck, kirovilya, Shade, krumbholz, fre, Alex18081, ae, asgothian,
    Strunzdesign, kairauer, VLGorskij, Hesse-Bub, PaulchenPlump, blackrozes

### 1.2.1 (2020-08-16)
* Fixes after changing device identify method
* (Garfonso) Allow unbinding from coordinator

### 1.2.0 (2020-08-09)
* Serialport 9.0.0. (zigbee-herdsman)
* Drop support Node < 10 (zigbee-herdsman)
* Device now identify (for zigbee-herdsman-converters) by model not zigbeeModel

Improvements and fixes:
* (Strunzdesign) Fixed the mapping between bulb levels and adapter levels
* (kirovilya) Fix ota for unavailable devices
* (kirovilya) Lazy states - created only when an event arrives
* (kirovilya) States generator - states are created depending on the device and its endpoints
* (Shade) Fixed WXKG11LM clicks
* (allofmex) Improved DeveloperTab logs
* (allofmex) Add humidity and temperature calibration state to Tuya RH3052
* (kirovilya) Fixed a typo due to which extPanID was not set
* (allofmex) Retry reconnect gateway all the time for TCP-connected gateway
* (kirovilya) Allow collecting zigbee-herdsman logs to iobroker logs
* (kirovilya) Additional states for QBKG12LM

New devices:
* (kirovilya) BlitzWolf BW-IS3, Paulmann 500.67, Paulmann 798.09
* (kirovilya) DiY Geiger counter https://modkam.ru/?p=1591
* (kirovilya) DiY 8 Relays + 8 switches https://modkam.ru/?p=1638
* (kirovilya) DiY Freepad https://github.com/diyruz/freepad
* (kirovilya) Neo Zigbee Siren Alarm https://szneo.com/en/products/show.php?id=241
* (Shade) RB 278 T
* (arteck) TS0601_thermostat
* (arteck) TS0121
* (arteck) GL-D-004Z
* (Shade) WXKG07LM
* (drohne200) 1746430P7
* (sebastian) 4058075816459
* (itProfi) SGMHM-I1
* (arteck) owvfni3
* (arteck) TS0001, TS0111
* (Daniel Dreier) Paulmann 500.45
* (arteck) ZK-EU-2U
* (Newan) Busch-Jaeger 6735/6736/6737
* (andrico21) ZM-L03E-Z
* (arteck) 915005106701, 9290018187B
* (frankjoke) HGZB-20-UK, GL-W-001Z
* (arteck) 4034031P7, 3435011P7
* (arteck) TS0041
* (agross) 5062231P7, 5062431P7
* (kirovilya) TI0001-switch, TI0001-socket
* (arteck) RB 178 T
* (arteck) HGZB-07A, AV2010/22, AV2010/22A, TS0041, TS0043
* (nbars) E1744
* (Florian Look) GS361A-H04
* (arteck) ICZB-IW11SW
* (kirovilya) HS2WD-E
* (Sacred-Shadow) FL 130 C
* (arteck) HS3SA, 9290022169, 4096730U7, AC10787, SP 220, SP 222, SP 224, 07004D, BW-IS2, InstaRemote
* (kirovilya) MCLH-08, MCLH-05
* (Sacred-Shadow) 1746130P7
* (mar565) GUNNARP panel round
* (Erdnuss3003) 4090531P7

### 1.1.1 (2020-04-17)
* (kirovilya) Critical. Fixed error starting adapter if cc-chip was only flashed
* (kirovilya) Nue/3A FNB56-ZSW02LX2.0
* (Strunzdesign) Added missing raw button events for Philips Hue Smart Button ROM001
* (Sacred-Shadow) Fix Color for Outdoor Lantern W RGBW OSRAM

### 1.1.0 (2020-04-12)
new Zigbee-herdsman features:
* ConBee/RaspBee (experimental support) https://github.com/Koenkk/zigbee-herdsman/issues/72
* OTA update for some devices (IKEA, OSRAM and other) https://github.com/Koenkk/zigbee2mqtt/issues/2921
* Touchlink reset and join https://github.com/Koenkk/zigbee2mqtt/issues/2396
* Green Power devices support https://github.com/Koenkk/zigbee2mqtt/issues/3322
* (peterfido) iCasa KPD14S und KPD18S hinzu
* (kirovilya) Moes Zigbee Thermostatic Radiator
* (kirovilya) LifeControl power plug MCLH-03, bulb MCLH-02, water leak MCLH-07, door sensor MCLH-04
* (kirovilya) Philips LCT002, LCT011, LTW015, LWG004
* (kirovilya) Gledopto GL-C-007 with a channel
* (MultivitaminJuice) Iluminize 511.040
* (Sacred-Shadow) Bitron 902010/24
* (kirovilya) Color indication of LQI and Battery icon
* (kirovilya) Device info modal dialog
* (arteck) Philips LCT026
* (obakuhl) Improvements Osram switch mini
* (arteck) Nue / 3A FB56+ZSW1GKJ2.5, LXN-1S27LX1.0
* (agross) Philips Signe Floor and Table
* (arteck) TRADFRI bulb E14 WS 470lm, OSRAM PAR16 TW Z3
* (kirovilya) Smart remote controller (4 buttons)
* (allofmex) OTA updates
* (kirovilya) Aqara opple change mode keys (for binding)
* (palsch) Heiman HS2WD-E siren

### 1.0.4 (2020-03-14)
* (kirovilya) Philips Hue Adore Bathroom Mirror Light
* (kirovilya) Oujiabao Gas and carbon monoxide alarm
* (kirovilya) Tuya SOS button
* (Erdnuss3003) Schwaiger ZBT-DIMLight-GLS0800
* (arteck) Smart Home Pty FB56-ZCW11HG1.4, LXT56-LS27LX1.7
* (arteck) Xiaomi plug lumi.plug.mmeu01
* (arteck) Innr RS 228 T, RS 230 C
* (arteck) Gledopto GL-MC-001, GL-D-003ZS
* (allmyjoes) Bitron AV2010/21A
* (arteck) Osram Panel TW 595 UGR22
* (kirovilya) IKEA SURTE door WS 38x64
* (andigandi) Philips Hue LCG002, Hue LTG002
* (arteck) iCasa ICZB-FC
* (arteck) Osram A60 DIM Z3
* (arteck) Paulmann 371000001
* (DaCHRIS) Osram PAR16 DIM Z3
* (DaCHRIS) Philips LWG001
* (DaCHRIS) Illuminize 511.202
* (SchumyHao) TERNCY-SD01 knob dimmer
* (SchumyHao) Xiaomi lumi.lock.aq1
* (kirovilya) New eWeLink devices: button, TH sensor, contact sensor, motion sensor
* (kirovilya) Allow pairing to routers (again)
* (Erdnuss3003) Philips Hue LCT021
* (root) Trust ZWLD-100 water leak sensor
* (smartpran) Bitron AV2010/32

### 1.0.3 (2020-02-09)
* (Tw1nh34d) Hornbach FLAIR LED
* (asgothian) Hue smart button, Heiman smoke sensor
* (kirovilya) Philips LTC014, LTC015
* (kirovilya) Power states for QBKG11LM
* (Garfonso) Change role for occupancy state to 'sensor.motion'
* (kirovilya) Change illuminance state to illuminance_lux (for lux value)
* (arteck) Philips LCF002
* (arteck) TRADFRI open/close remote
* (kirovilya) Tuya sensor TS0201

### 1.0.2 (2020-01-29)
* (kirovilya) All button events for Aqara Opple switch
* (ma-john) OSRAM PAR16 RGBW Z3
* (arteck) Phillips LWA004
* (MiniMe6666) Heiman SmokeSendor-N-3.0
* (kirovilya) Force remove device
* (kirovilya) Fix some networkmap bugs
* (kirovilya) Extended info button
* (kirovilya) Long press for WXKG01LM

### 1.0.1 (2020-01-23)
* fix for old z-stack firmware

### 1.0.0 (2020-01-22)
* Powered by new [zigbee-herdsman](https://github.com/Koenkk/zigbee-herdsman) library and new [converters database](https://github.com/Koenkk/zigbee-herdsman-converters)
* Drop support NodeJS 6
* Serialport 8.0.5 (in zigbee-herdsman)
* More new devices
* Some design update
* Binding

## License
The MIT License (MIT)

Copyright (c) 2018-2024 Kirov Ilya <kirovilya@gmail.com>

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