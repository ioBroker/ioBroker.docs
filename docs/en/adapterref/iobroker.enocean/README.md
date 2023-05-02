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

The full implementation of a device consists minimum of two parts: A entry in 'lib/definitions/devices.json' and a EEP file, 
which defines the objects and how to handle the data telegram.
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
      "id_offset": true,           //not all devices checks if the telegram whether it is for them
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

### 0.8.5 (2023-02-11)
* rework TF-13-25, fixes Eltako DSZ14
* rework TF-13-14, SP uses now temperature range 0-40°C
* remove useless object ASC from A5-20-01
* added Afriso FT & FTF
* added R-Tronic RT B (A5-10-06 + RPS)
* added new teachin telegram for FUD61NPN-230V
* fix F6-10-00: The close state was not set, the window was always shown as open.
* fix & rework TF-13-25 Eltako DSZ14 (#87)
* fix multiple conditions in eep's
* fix Eltako FGW14-USB does not receive status updates
* fix lastID is null when using Eltako FGW14-USB
* fix TF-01-01 TT and TTT both set on incoming telegram, only TT has to be set
* fix I1-01-01 invalid telegram send by on and off
* fix device definition Oventrop mote 420
* fix missing zeros in front of sender IDs while using FGW14
* fix incomplete data while receiving type 10 messages
* code cleanup and refactoring

### 0.8.4 (2022-11-17)
* added Eltako FSSG-230V, TF100A, FM4H
* added Afriso APR234(-NF)
* added EASYFIT ETHSx (ETSHA/ETSHU)
* added Oventrop mote 420
* added support information tab
* update TF-01-01 (Eltako FTA55J & TF-TA55J)
* update Eltako TF-4FT, switch EEP from F6-02-02 to F6-02-03
* highlight too short ID in add device dialog

### 0.8.3 (2022-09-28)
* fix TTT and TT handling in TF-14-04 (Eltako FSB14 and similar)
* remove RT from TF-14-04 (Eltako FSB14 and similar)

### 0.8.2 (2022-09-25)
* Fix: Wrong or missing Base ID for gateway

### 0.8.0 (2022-09-16)
* added EIMSIG EM-USE-00 & EM-FSGE-00
* added Kieback & Peter RBW322-FTL
* added MICROPELT MVA002
* added EEP A5-14-07
* added Traveled Time & Time to travel objects to TF-14-04 (FSB14)
* added EnOcean Pi & FAM-USB (ESP3 Firmware) as choice in admin
* added translation for object names
* change teachin method for Kieback and Peter MD15-FTL-HE
* check on startup if all objects for existing devices are exists, if not create them
* fix D2-10-01 sending configuration message

### 0.7.1 (2022-07-24)
* increase timeout for response time from gateway
* change base id for dummy gateway info (effects Eltako FGW14)
* change EEP for TF-TAx5J
* update FSR61-230V (>10/14) help text
* update PSC 234 help text
* update TF61L-230V help text
* update help for Eltako FSR14-2/4x
* fix Teachin for Eltako FAFT60

### 0.7.0 (2022-05-30)
* added ELTAKO FGW14-USB as possible Gateway (Please read the notes in readme for FGW14-USB)
* added PEHA 452 FU-EBIM JR o.T.
* added EUROTRONIC Stella E
* added SIEGENIA senso secure
* added new Eltako MSC Teachin Telegram for FSR71-2x
* added state for window to F6-10-00
* updated settings page 
* fix HORA SmartDrive MX teachin
* fix A5-20-01 CMD default value string to number

### 0.6.4 (2022-02-22)
* fix split Eltako FSVA-230V & FSR61VA into to sepperate devices for control and measurement

### 0.6.3 (2022-02-07)
* added SODA S8
* added Thermokon SAB+
* added Eltako FHB, FWRB, TF-RWB, FSR61VA, FFT65B, FFT55B, FFTF65B, FTFB & FTFSB
* added Battery state to D2-06-01
* added default values to all objects
* updated Eltako FSVA-230V
* fix FJ62/12-36V DC teachin

### 0.6.2 (2022-01-08)
* fix teachin

### 0.6.1 (2022-01-08)
* added Dimplex DL 50 WE2
* added EnOcean STM 350
* added Eltako & MACO eTronic
* added Afriso CO2-Sensor
* change TF-13-03 set time to 100ms for sending cases
* change TF-13-07 add On with last value
* fix teachin which makes it hard to add new devices
* (uklatt) fix Humidity datapoint & change decimals from 2 to 1

### 0.6.0 (2021-11-22)
* (j1s2e3 / Jey-Cee) added Eltako FL62NPN-230V, FD62NPN-230V, FSSA-230V, FTAF55D/230V, FRGBW71L, FMS65ESB, FAH, FKS-SV, TF-TTB(PioTek Tracker), FLGTF55
* (j1s2e3) added virtual Window/Door contact
* use /dev/serial/by-id/xxx as path for USB device #104
* use index for sender ID. Remeber already learnd device IDs.
* seperated objects from datafields
* detect when socket connection is broken #72
* fix Teachin for Eltako devices

### 0.5.4 (2021-09-10)
* added Kessel Staufix Control
* added Thermokon SR-MDS Solar
* added Omnio WS-CH-102
* added PENTAIR Transmitter FTJP
* split datapoint PAE for D2-06-10 & 11 to EPA und PAE

### 0.5.3 (2021-08-08)
* fix context for sendData when called from packet handler
* fix teachin method
* fix ser2net reconnect

### 0.5.1 (2021-07-25)
* fix crash if no mailboxes present in controller

### 0.5.0 (2021-07-25)
* added serial over network (ser2net) capabilities
* added release script

### 0.4.0
* added Permundo PSC 234 & PSC 152 
* added Nodon Soft Button (TSB-2-2-01)
* added Eltako FFT60SB 
* added REHAU Smart Guard & Smart Guard Inline / Ontop 
* added Hoppe eHandle ConnectHome
* added SCHÜCO SenseTrack wireless
* added Smart ACK teachin procedure
* fix teach-in Nodon SDO-2-1-05
* TF-13-07 set Dimming Level to 100% with on command

### 0.3.8
* added Thermokon SR04 & SR07
* added Micropelt MVA003
* added Eltako FWG14MS & FSR61-230V KW 02/21 and newer

### 0.3.7
* added WINKHAUS FM.V.SW
* added Eltako TF-TA55DL, DSZ14
* added PHEA D 451 FU-BM, D 4511 FU-BM, D450 FU FK 
* added telegram repeater count object
* fix numbers with decimals are strings
* fix warning "Read-only state "enocean.0.gateway.lastID" has been written without ack-flag with value "xxxxxxxx""
* fix A5-20-01 remove conversion for valve position in summer mode & summer mode valve position
* fix TF-14-06

### 0.3.6
* added Eltako FMS14 (<32/19)
* added Eltako FTS14EM
* revised profiles
* fix FUD14 ON command

### 0.3.5
* added Eltako FMZ61-230V, FSR70S-230V 
* added Trio2Sys OUTDOOR -30/+50°C TEMPERATURE SENSOR 
* added Nodon Motion Sensor PIR-2-1-01 
* added Virtual Room operating panel EEP: A5-10-06 
* added Oventrop R-Tronic RT B
* change help description for eltako rs485 devices
* update FFR61-230V
* make id always lower case
* fix Eltako F4HK14

### 0.3.4
* added PHEA 451 FU-EBI PF o.T. 
* added Hora SmartDrive MX
* added Eltako FAFT60, FWZ-65A, FSVA-230V
* extended teachin description for Eltako FSB14
* fix A5-02-05 calculation
* fix A5-04-02

### 0.3.3
* add techin procedure for FSR61 to Packet_handler.js
* add ack for cmd & optionals
* added A5-14-09 
* use queue for sending message 
* changed Telefunken SES FS-EO to D2-01-08
* fix A5-04-01 calculation
* fix TF-13-10 calculation

### 0.3.2
* added possibility to request a device directly 
* added Base ID & Sender ID to configuration 
* added Eltako F4SR14-LED
* added Afriso FTM T, FTM TF & Viessmann Temperature sensor 7554507, Temperature- and humidity sensor 7554951
* added Eltako FFG7B (A5-14-09) & FFG7B (F6-10-00)
* added Micropelt MVA005
* added Eltako FKF65 & Nodon Card Switch (CCS-2-1-01)
* added Eltako FSS12-12V-DC
* added OPUS GN-BH63AP-pw
* added Thermokon SR04
* revised D2-01-0E, this effects Micro Smart Plug (MSP-2-1-11) & Plug actuator (SES FS-EO)
* fix A5-20-06
* fix TF-13-01 Windspeed, Rain, Dawn Sensor
* fix Eltako Teachin ID offset
* fix TF-13-13: removed useless fixed parameter
* small fixes
* Eltako automatic device teachin wait before send teachin telegram
* use serialport esp3 parser in getGatewayInfos
* close listener properly
* change Hoppe SecuSignal teachin procedure

### 0.3.1
* added Eltako FABH65S, FBH65, FBH65S, FHF, FTR65DSB, FTR55DSB, FTR65HB, FTR55HB, FTR65SB, FTR55SB, FTRF65HB, FTRF65SB
* added Hoppe SecuSignal Window Handle 
* added Telefunken SES FS-EO
* updated: FTA65J teachin
* changed: FWS61 teachin
* fix TF-13-12 & TF-13-10 
* fixed TF-13-03
* use sender ID instead offset

### 0.3.0
* added Eltako devices: TF61D, TF100D, FTA65D, FTA55D, TF100L, TF100SSR, FTA65L, FTA55L, TF-1FT, TF-2FT, TF-2FT55, TF-2ZT, 
  TF-2ZT55, F4PT, F4PT55, TF-4FT, TF-4FT55, TF-8FM, FUD71, FSUD-230V, FSG71/1-10V, FDG71L, FKLD61, FLD61, FL62-230V, 
  FL62NP-230V, FR62-230V, FR62NP-230V FSR61NP-230V, TF-TA55D, TF-TA65D, TF-TA55J, TF-TA65J, TF-TA55L, TF-TA65L, FTK, 
  FTKB-RW, FFKB, FTKB-gr, FAH65S, FIH65S   
* re-add virtual switch with broadcast
* added possibility to use json logic for conditions
* added send converted value
* added value out to a5-20-01
* added double response for UTE 
* added send eltako teachin response twice
* added filter telegrams in addEltakoDevices
* update FSUD-230V teachin help
* update device list in config during teachin
* fix id offset for Eltako devices
* fix teachin for eltako devices when no offset in gateway is defined
* fix teachin for Eltako FTKB-hg
* fix manaual teachin devices
* fix correct formula in EEPs
* fix name of Eltako TF100L
* fix id offset for manual teachin

### 0.2.1
* fix for UTE teachin
* double response for UTE
* fix id offset for Eltako devices
* added Eltako devices: TF61D, TF100D, FTA65D, FTA55D, TF100L, TF100SSR, FTA65L, FTA55L, TF-1FT, TF-2FT, TF-2FT55, TF-2ZT, TF-2ZT55, F4PT, F4PT55, TF-4FT, TF-4FT55, TF-8FM, FUD71, FSUD-230V, FSG71/1-10V, FDG71L, FKLD61, FLD61
* update fsud-230v teachin help

### 0.2.0
* fix calculation for temperature in A5-02-13
* added Eltako FMMS44SB
* correct formula in readme
* add commands for D2-05-00
* json-logic-js security update
* change UI for add new devices
* teachin procedure revised

### 0.1.8
* added devices Eltako FUD61NPN-230V, FRW, TF61L-230V, FTKB
* fix teachin: was not set to false

### 0.1.7
* added profiles for Eltako F4HK14, FSB14, FUD14
* fix tf-14-01

### 0.1.5
* added virtual switch
* rewrite A5-20-01
* fix profile A5-02-13

### 0.1.4
* added base id offset
* added new devices

### 0.1.3
* fix profile F6-10-00

### 0.1.2
* fix 4BS Teach-in
* added profile A510-20
* added profile TF14-02 relais contact
* fix profile D5-00-01
* fix profile A5-04-01
* fix profile TF-13-02

### 0.1.1
* fix Teach-in/out
* fix send data
* fix profile D2-05-00

### 0.1.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is**
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
