![Logo](admin/enocean.png)
# ioBroker.enocean

[![NPM version](http://img.shields.io/npm/v/iobroker.enocean.svg)](https://www.npmjs.com/package/iobroker.enocean)
[![Downloads](https://img.shields.io/npm/dm/iobroker.enocean.svg)](https://www.npmjs.com/package/iobroker.enocean)
![Number of Installations (latest)](http://iobroker.live/badges/enocean-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/enocean-stable.svg)
[![Dependency Status](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)](https://david-dm.org/jey-cee/iobroker.enocean)

[![NPM](https://nodei.co/npm/iobroker.enocean.png?downloads=true)](https://nodei.co/npm/iobroker.enocean/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)](https://travis-ci.org/jey-cee/ioBroker.enocean)

## EnOcean adapter for ioBroker

Connects EnOcean devices via USB/Serial devices with TCM300 Chips

## Join the Discord server to discuss everything about ioBroker-enocean integration!

<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Sponsors](./SPONSORS.md)
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for Jey Cee, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Compatible USB Sticks & Modules
USB300

DOSMUNG USB Stick with SMA port

FAM-USB (ESP3 Firmware)

EnOcean Pi Modul
**Important Note:** On Pi3 & Pi4 you have to disable the onboard Bluetooth module, otherwise the EnOcean module will not work!

Eltako FGW14:  
**Important Notes**: This gateway does not support all features and devices of this adapter.  
Known features that does not work: RSSI, Gateway information can not be read and only RS485 Bus devices can be controlled without FTD14 (not tested yet).  If there is no technical reason to use this gateway it is highly recomended to use an other one.  
The bus devices report with their bus address, i.e. it starts with 00 00 00 01.

ALL SMART EnOcean LAN Gateway - ~~[BUY](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ No longer available.  

ALL SMART EnOcean Multi-Gateway - [BUY](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [Supported devices](./docs/devices.md)

## Control devices
In general there is a cmd object where you can choose the command that you want to execute. Before you can execute a command you have to set all attributes that are necessary, 
you can find this information in the profile definition.

Special:
* A5-20-xx: Devices with this profile does only accept commands within 1 second after they have sent a message. They send periodically (10 minutes?), please read the manual.


## Teach-in
- The process is documented with (short) step-by-step instructions in the adapter configuration. There you can Choose
  your device and the instructions will be displayed. Follow them.
- Devices without possibility to teach-in to another device (like Eltako Series 12 also known as Opus Green Net): 
They can be controlled with an virtual switch (F6-02-02): Open configuration and click add new device. 
Now choose X_Virtual as manufacturer and Switch as device, use ID fffffff0. Count up the last sign, 1-9 and a-f, for each new virtual switch.
Click add device and close configuration. Then start teach-in on your device according to the manual, send command from virtual switch.
Now you should be able to control the device.

## Teach-out (delete adapter binding from the device)
- Eltako Tipp-Funk: Send 3 times teach-in command during 2 seconds from ioBroker to device
- Devices with UTE: Start Teach-in for the adapter and follow the device instructions.
- RPS: Just delete the obejcts
- none: Just delete the objects

## Troubleshooting
1. Device does not react to command: 
   - The teachin process was not successful. Depending on the device, successful teach-in is signalled, pay attention to this signal. If there is no signal, try again.  
   - Check if all attributes related to the CMD are set correctly. 
   - If the rssi value is higher than -70 dBm, the signal could be too weak. Try to move the device closer to the gateway. 
   - Valve actuators (thermostats) are sending a message every x minutes. After receiving the message the device accept a command within a second. To achive this use a script that sends the command after receiving the message. A good trigger in the script is the rssi value.

## Profile definition file

#### Data structure

***case:*** Could be a single element or an array, that holds a set of datafields. In case of an array the element is bound to a condition.

***send:*** true means this set of data is a command that will be sent to the device.

***auto_answer:*** true means this command will be executed after receiving a telegram from the device.

***condition:*** The condition which has to be true that this set of datafields is processesd. In the most cases the condition is a specific value from the data package.

***datafield:*** Information where in the data package the data are and how to handle the value. Also, there is the object definition for ioBroker.

***datafield -> secondArgument:*** Used to get a secondary information/value from the data package. Use case: Units can vary on their amount, so the device sends the unit as a separate information. 
To change the unit inside ioBroker depending on the sent information, it is necessary to know this while processing the value.

***datafield -> condition:*** This could be a formula to convert a value. This is based on JSON-logic for detailed information
refer to  http://jsonlogic.com/operations.html. 

Example: 

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

***datafield -> value:*** This represents the value that is given back, except the condition is the output value. Than value should not be defined.

Example:

```
//Temperature conversion from received data
 "+": [{
         "*": [
              { "-": [{"var": "value"}, 0] },
              0.2
            ]}, 0]

//This is a more complex looking formula.
//It is based on this one: Device Value = Multiplier * ( rawValue - Range min) + Scale min
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

***datafield -> value_out:*** This represents the value that will be sent to the device. This has only to be defined if a conversion is needed.

Example:

```
//Temperature conversion from ioBroker
 "/": [{
         "+": [
              { "-": [{"var": "value"}, 0] },
              0
            ]}, 0.2]

//This is a more complex looking formula.
//It is based on this one: Device Value = ( ( rawValue - Range min) + Scale min ) / Multiplier
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

***datafield -> decimals:*** Defines how many digits after decimal point will be shown. 

***datafield -> unit:*** Use this if the Unit is variable otherwise define it in iobroker.

Example:
```
//Choose between Watt(W) and Kilowatt(kW) depending on the unit information from the device
 "unit":{
            "if": [
              {"==":[{"var": "value2"}, 3]}, "W",
              {"==":[{"var": "value2"}, 4]}, "kW"
            ]
          }

//value2 comes from secondArgument. 
```

## Device definition

The full implementation of a device consists minimum of two parts: A entry in 'lib/devices/MANUFACTURER/MODEL/device.json' and a EEP file, 
which defines the objects and how to handle the data telegram.
The lib/definitions/devices.js has to be updated with the new device.
There are devices which uses more than one data telegram type to communicate, this means they have more EEP files.  
In special cases, as Eltako, there is also a manufacturer specific part in the 'packet_handler.js' defined.

```
"Model name or type" : {
      "EEP": [                    //The EEP(s) that will be used for this device. First one has to be the one that controlls the device.
        "TF-13-07",
        "TF-13-06"
      ],
      "autocreate": false,         //false if the device needs additional steps for teachin
      "teachin_method": "none",    //filter for automated teachin telegrams
      "id_offset": true,           //not all devices checks if the telegram whether it is for them. Not applicable where teachin_method is 4BS.
      "broadcast": false,          //true if the receiver id has to be ffffffff. This is used for virtual devices like a switch.
      "help": {                    //a step by step instruction how to add the device.
        "en": {
          "1": "Enter device ID.",
          "2": "Click on 'Add Device'."
        },
        "de": {
          "1": "Geräte ID eintragen.",
          "2": "Auf 'Gerät Hinzufügen' klicken."
        }
      }
    }
```

## For development
To test telegram handling create a channel with name development and in this channel an object with name telegram, type string.

## Changelog

### 0.9.1 (2023-09-01)
* (Jey Cee) added support for Eltako FKD-am
* (Jey Cee) added Afriso ASD 20
* (Jey Cee) added EEP F6-05-02
* (Jey Cee) change log level for missing /dev/serial/by-id
* (Jey Cee) change log level for initial information request on gateway
* (Holger Will) update X1-01-02.json

### 0.9.0 (2023-07-27)
* added Afriso ASD 10
* fix D2-05-00 Goto top/bottom
* catch error while update objects on adapter start
* workaround for serial port selection does not display all options

### 0.8.5 (2023-02-11)
* rework TF-13-25, fixes Eltako DSZ14 (#87)
* rework TF-13-14, SP uses now temperature range 0-40°C
* remove useless object ASC from A5-20-01
* added Afriso FT & FTF
* added R-Tronic RT B (A5-10-06 + RPS)
* added Eltako F3Z14D, FWZ14, FRGBW14, FWS81
* added new teachin telegram for FUD61NPN-230V
* added remove button to device list in config
* added profile F6-05-01
* fix F6-10-00: The close state was not set, the window was always shown as open.
* fix multiple conditions in eep's
* fix Eltako FGW14-USB does not receive status updates
* fix lastID is null when using Eltako FGW14-USB
* fix TF-01-01 TT and TTT both set on incoming telegram, only TT has to be set
* fix I1-01-01 invalid telegram send by on and off
* fix device definition Oventrop mote 420
* fix missing zeros in front of sender IDs while using FGW14
* fix incomplete data while receiving type 10 messages
* fix missing device name
* code cleanup and refactoring

[Older changelog entries are moved to changelog.md](changelog.md)

## License
Attribution-NonCommercial 3.0 (CC BY-NC 3.0)

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).
