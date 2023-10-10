---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: y/viydDLxV2KiiNnj5jhcxJRBDdNfxzPs6ESoqDTG3w=
---
![Logo](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.enocean.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/enocean-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/enocean-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![NPM](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# IoBroker.enocean
## EnOcean-Adapter für ioBroker
Verbindet EnOcean-Geräte über USB/serielle Geräte mit TCM300-Chips

## Treten Sie dem Discord-Server bei, um alles über die ioBroker-enocean-Integration zu diskutieren!
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Sponsoren](./SPONSORS.md)
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für Jey Cee, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Kompatible USB-Sticks und -Module
USB300

DOSMUNG USB-Stick mit SMA-Anschluss

FAM-USB (ESP3-Firmware)

EnOcean Pi Modul **Wichtiger Hinweis:** Auf Pi3 & Pi4 müssen Sie das integrierte Bluetooth-Modul deaktivieren, sonst funktioniert das EnOcean-Modul nicht!

Eltako FGW14: **Wichtige Hinweise**: Dieses Gateway unterstützt nicht alle Funktionen und Geräte dieses Adapters.
Bekannte Funktionen, die nicht funktionieren: RSSI, Gateway-Informationen können nicht gelesen werden und nur RS485-Bus-Geräte können ohne FTD14 gesteuert werden (noch nicht getestet). Wenn es keinen technischen Grund gibt, dieses Gateway zu verwenden, wird dringend empfohlen, ein anderes zu verwenden.
Die Busteilnehmer melden sich mit ihrer Busadresse, d.h. diese beginnt mit 00 00 00 01.

ALL SMART EnOcean LAN Gateway – ~~[KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ Nicht mehr verfügbar.

ALL SMART EnOcean Multi-Gateway - [KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [Unterstützte Geräte](./docs/devices.md)
## Steuergeräte
Im Allgemeinen gibt es ein cmd-Objekt, in dem Sie den Befehl auswählen können, den Sie ausführen möchten. Bevor Sie einen Befehl ausführen können, müssen Sie alle erforderlichen Attribute festlegen. Diese Informationen finden Sie in der Profildefinition.

Besonders:

* A5-20-xx: Geräte mit diesem Profil akzeptieren Befehle nur innerhalb von 1 Sekunde, nachdem sie eine Nachricht gesendet haben. Sie senden regelmäßig (10 Minuten?), bitte lesen Sie das Handbuch.

## Einlernen
- Der Vorgang ist mit (kurzen) Schritt-für-Schritt-Anleitungen in der Adapterkonfiguration dokumentiert. Dort können Sie wählen

  Ihr Gerät und die Anweisungen werden angezeigt. Folge ihnen.

- Geräte ohne Möglichkeit zum Anlernen an ein anderes Gerät (wie Eltako Serie 12 auch bekannt als Opus Green Net):

Sie können mit einem virtuellen Schalter (F6-02-02) gesteuert werden: Öffnen Sie die Konfiguration und klicken Sie auf Neues Gerät hinzufügen.
Wählen Sie nun X_Virtual als Hersteller und Switch als Gerät, verwenden Sie die ID fffffff0. Zählen Sie das letzte Zeichen, 1-9 und a-f, für jeden neuen virtuellen Schalter hoch.
Klicken Sie auf Gerät hinzufügen und schließen Sie die Konfiguration. Starten Sie dann das Einlernen Ihres Geräts gemäß der Anleitung und senden Sie den Befehl vom virtuellen Schalter.
Jetzt sollten Sie das Gerät steuern können.

## Teach-out (Adapterbindung vom Gerät löschen)
- Eltako Tipp-Funk: 3x Lernbefehl innerhalb von 2 Sekunden vom ioBroker an das Gerät senden
- Geräte mit UTE: Teach-in für den Adapter starten und den Geräteanweisungen folgen.
- RPS: Löschen Sie einfach die Objekte
- keine: Löschen Sie einfach die Objekte

## Fehlerbehebung
1. Gerät reagiert nicht auf Befehl:
   - Der Einlernvorgang war nicht erfolgreich. Je nach Gerät wird ein erfolgreiches Einlernen signalisiert, achten Sie auf dieses Signal. Wenn kein Signal vorhanden ist, versuchen Sie es erneut.
   - Überprüfen Sie, ob alle Attribute im Zusammenhang mit dem CMD korrekt eingestellt sind.
   - Wenn der RSSI-Wert höher als -70 dBm ist, könnte das Signal zu schwach sein. Versuchen Sie, das Gerät näher an das Gateway zu bringen.
   - Ventilantriebe (Thermostate) senden alle x Minuten eine Nachricht. Nach Erhalt der Nachricht akzeptiert das Gerät innerhalb einer Sekunde einen Befehl. Um dies zu erreichen, verwenden Sie ein Skript, das den Befehl nach Erhalt der Nachricht sendet. Ein guter Auslöser im Skript ist der RSSI-Wert.

## Profildefinitionsdatei
#### Datenstruktur
***case:*** Könnte ein einzelnes Element oder ein Array sein, das eine Reihe von Datenfeldern enthält. Im Falle eines Arrays ist das Element an eine Bedingung gebunden.

***send:*** true bedeutet, dass dieser Datensatz ein Befehl ist, der an das Gerät gesendet wird.

***auto_answer:*** true bedeutet, dass dieser Befehl ausgeführt wird, nachdem ein Telegramm vom Gerät empfangen wurde.

***Bedingung:*** Die Bedingung, die erfüllt sein muss, damit dieser Satz von Datenfeldern verarbeitet wird. In den meisten Fällen handelt es sich bei der Bedingung um einen bestimmten Wert aus dem Datenpaket.

***Datenfeld:*** Informationen, wo sich die Daten im Datenpaket befinden und wie mit dem Wert umgegangen wird. Außerdem gibt es die Objektdefinition für ioBroker.

***Datenfeld -> zweitesArgument:*** Wird verwendet, um sekundäre Informationen/Werte aus dem Datenpaket abzurufen. Anwendungsfall: Einheiten können in ihrer Menge variieren, daher sendet das Gerät die Einheit als separate Information.
Um die Einheit innerhalb von ioBroker abhängig von den gesendeten Informationen zu ändern, ist es notwendig, dies bei der Verarbeitung des Werts zu wissen.

***Datenfeld -> Bedingung:*** Dies könnte eine Formel zum Konvertieren eines Werts sein. Dies basiert auf JSON-Logik. Detaillierte Informationen finden Sie unter http://jsonlogic.com/operations.html.

Beispiel:

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

***Datenfeld -> Wert:*** Dies stellt den zurückgegebenen Wert dar, außer dass die Bedingung der Ausgabewert ist. Dieser Wert sollte nicht definiert werden.

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

***datafield -> value_out:*** Dies stellt den Wert dar, der an das Gerät gesendet wird. Dies muss nur dann definiert werden, wenn eine Konvertierung erforderlich ist.

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

***Datenfeld -> Dezimalstellen:*** Definiert, wie viele Nachkommastellen angezeigt werden.

***Datenfeld -> Einheit:*** Verwenden Sie dies, wenn die Einheit variabel ist, andernfalls definieren Sie sie in iobroker.

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
Die vollständige Implementierung eines Geräts besteht mindestens aus zwei Teilen: einem Eintrag in „lib/devices/MANUFACTURER/MODEL/device.json“ und einer EEP-Datei, die die Objekte und den Umgang mit dem Datentelegramm definiert.
Die lib/definitions/devices.js muss mit dem neuen Gerät aktualisiert werden.
Es gibt Geräte, die zur Kommunikation mehr als einen Datentelegrammtyp verwenden, das heißt, sie verfügen über mehr EEP-Dateien.
In besonderen Fällen, wie bei Eltako, ist auch ein herstellerspezifischer Teil in der 'packet_handler.js' definiert.

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

## Zur Entwicklung
Um die Telegrammverarbeitung zu testen, erstellen Sie einen Kanal mit Namensentwicklung und in diesem Kanal ein Objekt mit dem Namen Telegramm, Typ string.

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