---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: OydPxDhsoZzUB2HSvX5SMY6HIfGNYkUrbYr07NfKRGc=
---
![Logo](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.enocean.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/enocean-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/enocean-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![NPM](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# IoBroker.enocean
## EnOcean-Adapter für ioBroker
Verbindet EnOcean-Geräte über USB/serielle Geräte mit TCM300-Chips

## Treten Sie dem Discord-Server bei, um alles über die ioBroker-enocean-Integration zu diskutieren!
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Sponsoren](./SPONSORS.md)
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende machen (dies ist ein persönlicher Spendenlink für Jey Cee, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Kompatible USB-Sticks und -Module
USB300

DOSMUNG USB-Stick mit SMA-Anschluss

FAM-USB (ESP3-Firmware)

EnOcean Pi Modul **Wichtiger Hinweis:** Auf Pi3 & Pi4 muss das Onboard Bluetooth Modul deaktiviert werden, sonst funktioniert das EnOcean Modul nicht!

Eltako FGW14: **Wichtige Hinweise**: Dieses Gateway unterstützt nicht alle Features und Geräte dieses Adapters.
Bekannte Funktionen, die nicht funktionieren: RSSI, Gateway-Informationen können nicht gelesen werden und nur RS485-Bus-Geräte können ohne FTD14 gesteuert werden (noch nicht getestet). Wenn es keinen technischen Grund gibt, dieses Gateway zu verwenden, wird dringend empfohlen, ein anderes zu verwenden.
Die Busteilnehmer melden sich mit ihrer Busadresse, d. h. sie beginnt mit 00 00 00 01.

ALL SMART EnOcean LAN Gateway - ~~[KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ Nicht mehr verfügbar.

ALL SMART EnOcean Multi-Gateway - [KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

## Geräte steuern Im Allgemeinen gibt es ein cmd-Objekt, in dem Sie den Befehl auswählen können, den Sie ausführen möchten. Bevor Sie einen Befehl ausführen können, müssen Sie alle notwendigen Attribute setzen, diese Information finden Sie in der Profildefinition.
Speziell:

* A5-20-xx: Geräte mit diesem Profil akzeptieren Befehle nur innerhalb von 1 Sekunde, nachdem sie eine Nachricht gesendet haben. Sie senden periodisch (10 Minuten?), lesen Sie bitte das Handbuch.

## Einlernen
- Der Vorgang ist mit (kurzen) Schritt-für-Schritt-Anleitungen in der Adapterkonfiguration dokumentiert. Dort können Sie wählen

  Ihr Gerät und die Anweisungen werden angezeigt. Folge ihnen.

- Geräte ohne Anlernmöglichkeit (wie Eltako Serie 12 auch bekannt als Opus Green Net):

Sie können mit einem virtuellen Schalter (F6-02-02) gesteuert werden: Öffnen Sie die Konfiguration und klicken Sie auf Neues Gerät hinzufügen.
Wählen Sie nun X_Virtual als Hersteller und Switch als Gerät, verwenden Sie die ID fffffff0. Zählen Sie das letzte Zeichen, 1-9 und a-f, für jeden neuen virtuellen Schalter.
Klicken Sie auf Gerät hinzufügen und Konfiguration schließen. Dann Anlernen an Ihrem Gerät gemäß Anleitung starten, Befehl vom virtuellen Schalter senden.
Jetzt sollten Sie das Gerät steuern können.

## Teach-out (Adapter Binding vom Gerät löschen)
- Eltako Tipp-Funk: 3 mal Lernbefehl während 2 Sekunden von ioBroker an Gerät senden
- Geräte mit UTE: Teach-in für den Adapter starten und den Geräteanweisungen folgen.
- RPS: Einfach die Objekte löschen
- none: Nur die Objekte löschen

## Fehlerbehebung
1. Gerät reagiert nicht auf Befehl:
   - Der Einlernvorgang war nicht erfolgreich. Je nach Gerät wird ein erfolgreiches Einlernen signalisiert, achten Sie auf dieses Signal. Wenn kein Signal vorhanden ist, versuchen Sie es erneut.
   - Überprüfen Sie, ob alle Attribute, die sich auf die CMD beziehen, korrekt gesetzt sind.
   - Wenn der RSSI-Wert höher als -70 dBm ist, könnte das Signal zu schwach sein. Versuchen Sie, das Gerät näher an das Gateway zu stellen.
   - Ventilantriebe (Thermostate) senden alle x Minuten eine Nachricht. Nach Erhalt der Nachricht akzeptiert das Gerät einen Befehl innerhalb einer Sekunde. Verwenden Sie dazu ein Skript, das den Befehl nach Erhalt der Nachricht sendet. Ein guter Auslöser im Skript ist der RSSI-Wert.

## Profildefinitionsdatei
#### Datenstruktur
***case:*** Kann ein einzelnes Element oder ein Array sein, das eine Reihe von Datenfeldern enthält. Bei einem Array ist das Element an eine Bedingung gebunden.

***send:*** true bedeutet, dass dieser Datensatz ein Befehl ist, der an das Gerät gesendet wird.

***auto_answer:*** true bedeutet, dass dieser Befehl ausgeführt wird, nachdem ein Telegramm vom Gerät empfangen wurde.

***Bedingung:*** Die Bedingung, die wahr sein muss, damit dieser Satz von Datenfeldern verarbeitet wird. In den meisten Fällen ist die Bedingung ein bestimmter Wert aus dem Datenpaket.

***Datenfeld:*** Informationen, wo sich die Daten im Datenpaket befinden und wie mit dem Wert umgegangen wird. Außerdem gibt es die Objektdefinition für ioBroker.

***datafield -> secondArgument:*** Wird verwendet, um sekundäre Informationen/Werte aus dem Datenpaket zu erhalten. Anwendungsfall: Einheiten können in ihrer Menge variieren, daher sendet das Gerät die Einheit als separate Information.
Um die Einheit innerhalb von ioBroker abhängig von den gesendeten Informationen zu ändern, ist es notwendig, diese während der Verarbeitung des Werts zu kennen.

***Datenfeld -> Bedingung:*** Dies könnte eine Formel sein, um einen Wert umzuwandeln. Dies basiert auf JSON-Logik. Detaillierte Informationen finden Sie unter http://jsonlogic.com/operations.html.

Beispiel:

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

***Datenfeld -> Wert:*** Dies stellt den Wert dar, der zurückgegeben wird, außer dass die Bedingung der Ausgabewert ist. Als Wert sollte nicht definiert werden.

Beispiel:

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

***datafield -> value_out:*** Dies stellt den Wert dar, der an das Gerät gesendet wird. Dies muss nur definiert werden, wenn eine Konvertierung erforderlich ist.

Beispiel:

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

***Datenfeld -> Dezimalstellen:*** Legt fest, wie viele Nachkommastellen angezeigt werden.

***Datenfeld -> Einheit:*** Verwenden Sie dies, wenn die Einheit variabel ist, ansonsten definieren Sie sie in iobroker.

Beispiel:

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

## Gerätedefinition
Die vollständige Implementierung eines Geräts besteht aus mindestens zwei Teilen: Einem Eintrag in 'lib/definitions/devices.json' und einer EEP-Datei, die die Objekte definiert und wie mit dem Datentelegramm umgegangen wird.
Es gibt Geräte, die mehr als einen Datentelegrammtyp zur Kommunikation verwenden, dh sie haben mehr EEP-Dateien.
In Sonderfällen, wie bei Eltako, ist auch ein herstellerspezifischer Teil in der 'packet_handler.js' definiert.

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

## Zur Entwicklung
Um das Telegrammhandling zu testen, erstellen Sie einen Kanal mit Namensentwicklung und in diesem Kanal ein Objekt mit Namen Telegramm, geben Sie string ein.

## Changelog

### **WORK IN PROGRESS**
* fix F6-10-00: The close state was not set, the window was always shown as open.
* fix & rework TF-13-25 Eltako DSZ14 (#87)
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

Copyright (c) 2022 Jey Cee <jey-cee@live.com>

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