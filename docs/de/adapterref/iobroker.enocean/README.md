---
chapters: {"pages":{"en/adapterref/iobroker.enocean/README.md":{"title":{"en":"ioBroker.enocean"},"content":"en/adapterref/iobroker.enocean/README.md"},"en/adapterref/iobroker.enocean/SPONSORS.md":{"title":{"en":"Sponsors"},"content":"en/adapterref/iobroker.enocean/SPONSORS.md"},"en/adapterref/iobroker.enocean/docs/devices.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.enocean/docs/devices.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: DJE7o/fG7sQrBhhgxMYAD/sXPGFFuMJ2cZkixm/iWxc=
---
![Logo](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.enocean.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/enocean-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/enocean-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![NPM](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# ioBroker.enocean

## EnOcean-Adapter für ioBroker

Verbindet EnOcean-Geräte über USB/Seriell-Schnittstellen mit TCM300-Chips

## Tritt dem Discord-Server bei, um alles über die ioBroker-enocean-Integration zu diskutieren!

<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Sponsoren](/#/docs/adapterref/iobroker.enocean/SPONSORS.md)

Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende.\
&#x20;(Dies ist ein persönlicher Spendenlink für Jey Cee und steht in keiner Verbindung zum ioBroker-Projekt!)\
[![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=95YZN2LR59Q64\&source=url)

## Kompatible USB-Sticks und Module

USB300

DOSMUNG USB-Stick mit SMA-Anschluss

FAM-USB (ESP3 Firmware)

**Wichtiger Hinweis zum EnOcean Pi Modul:** Bei Pi3 und Pi4 muss das integrierte Bluetooth-Modul deaktiviert werden, sonst funktioniert das EnOcean Modul nicht!

Eltako FGW14:\
&#x20;**Wichtige Hinweise** : Dieses Gateway unterstützt nicht alle Funktionen und Geräte dieses Adapters.\
&#x20;Bekannte Funktionsstörungen: RSSI-Wert und Gateway-Informationen können nicht ausgelesen werden. Ohne FTD14 können nur RS485-Bus-Geräte gesteuert werden (noch nicht getestet). Falls kein technischer Grund für die Verwendung dieses Gateways besteht, wird dringend empfohlen, ein anderes zu verwenden.\
&#x20;Die Busgeräte melden sich mit ihrer Busadresse, d. h. sie beginnt mit 00 00 00 01.

ALL SMART EnOcean LAN Gateway - ~~[KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ Nicht mehr verfügbar.

ALL SMART EnOcean Multi-Gateway - [KAUFEN](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [Unterstützte Geräte](/#/docs/adapterref/iobroker.enocean/docs/devices.md)

## Steuergeräte

Im Allgemeinen gibt es ein cmd-Objekt, mit dem Sie den auszuführenden Befehl auswählen können. Bevor Sie einen Befehl ausführen können, müssen Sie alle erforderlichen Attribute festlegen; diese Informationen finden Sie in der Profildefinition.

Besonders:

- A5-20-xx: Geräte mit diesem Profil akzeptieren Befehle nur innerhalb einer Sekunde nach dem Senden einer Nachricht. Sie senden Nachrichten periodisch (alle 10 Minuten?). Bitte lesen Sie das Handbuch.

## Lehrveranstaltung

- Der Vorgang ist in der Adapterkonfiguration mit einer kurzen Schritt-für-Schritt-Anleitung dokumentiert. Dort können Sie Ihr Gerät auswählen, woraufhin die Anweisungen angezeigt werden. Folgen Sie diesen.
- Geräte ohne Teach-in-Funktion (wie die Eltako Serie 12, auch bekannt als Opus Green Net) können mit einem virtuellen Switch (F6-02-02) gesteuert werden: Öffnen Sie die Konfiguration und klicken Sie auf „Neues Gerät hinzufügen“. Wählen Sie nun „X\_Virtual“ als Hersteller und „Switch“ als Gerät aus. Verwenden Sie die ID „ffffffff0“. Zählen Sie die letzten Ziffern (1–9 oder „af“) für jeden neuen virtuellen Switch hoch. Klicken Sie auf „Gerät hinzufügen“ und schließen Sie die Konfiguration. Starten Sie anschließend den Teach-in Ihres Geräts gemäß der Anleitung und senden Sie einen Befehl vom virtuellen Switch. Nun sollte das Gerät steuerbar sein.

## Teach-out (Adapterbindung vom Gerät löschen)

- Eltako Tipp-Funk: Sende innerhalb von 2 Sekunden 3 Teach-in-Befehle vom ioBroker an das Gerät
- Geräte mit UTE: Starten Sie den Teach-in-Vorgang für den Adapter und folgen Sie den Anweisungen des Geräts.
- RPS: Löschen Sie einfach die Objekte.
- keine: Löschen Sie einfach die Objekte.

## Fehlerbehebung

1. Das Gerät reagiert nicht auf den Befehl:
   - Der Anlernvorgang war nicht erfolgreich. Je nach Gerät wird ein erfolgreiches Anlernsignal angezeigt; achten Sie auf dieses Signal. Falls kein Signal angezeigt wird, versuchen Sie es erneut.
   - Prüfen Sie, ob alle Attribute im Zusammenhang mit CMD korrekt eingestellt sind.
   - Wenn der RSSI-Wert über -70 dBm liegt, ist das Signal möglicherweise zu schwach. Versuchen Sie, das Gerät näher an das Gateway zu bringen.
   - Ventilantriebe (Thermostate) senden alle x Minuten eine Nachricht. Nach dem Empfang der Nachricht akzeptiert das Gerät innerhalb einer Sekunde einen Befehl. Um dies zu erreichen, verwenden Sie ein Skript, das den Befehl nach dem Empfang der Nachricht sendet. Ein geeigneter Auslöser im Skript ist der RSSI-Wert.

## Profildefinitionsdatei

#### Datenstruktur

_**Fall:**_ Es kann sich um ein einzelnes Element oder ein Array handeln, das eine Reihe von Datenfeldern enthält. Im Falle eines Arrays ist das Element an eine Bedingung gebunden.

_**send:**_ true bedeutet, dass dieser Datensatz ein Befehl ist, der an das Gerät gesendet wird.

_**auto\_answer:**_ true bedeutet, dass dieser Befehl nach dem Empfang eines Telegramms vom Gerät ausgeführt wird.

_**Bedingung:**_ Die Bedingung, die erfüllt sein muss, damit dieser Satz von Datenfeldern verarbeitet wird. In den meisten Fällen handelt es sich bei der Bedingung um einen bestimmten Wert aus dem Datenpaket.

_**Datenfeld:**_ Informationen darüber, wo sich die Daten im Datenpaket befinden und wie der Wert verarbeitet wird. Außerdem ist die Objektdefinition für ioBroker enthalten.

_**datafield -> secondArgument:**_ Dient zum Abrufen einer zusätzlichen Information/eines zusätzlichen Werts aus dem Datenpaket. Anwendungsfall: Einheiten können in ihrer Menge variieren, daher sendet das Gerät die Einheit als separate Information. Um die Einheit in ioBroker abhängig von der gesendeten Information zu ändern, muss diese Information bei der Wertverarbeitung bekannt sein.

_**Datenfeld -> Bedingung:**_ Dies könnte eine Formel zur Wertumwandlung sein. Dies basiert auf JSON-Logik; detaillierte Informationen finden Sie unter <http://jsonlogic.com/operations.html> .

Beispiel:

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

_**Datenfeld -> Wert:**_ Dies repräsentiert den zurückgegebenen Wert, außer wenn die Bedingung der Ausgabewert ist. Dann sollte kein Wert definiert werden.

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

_**Datenfeld -> Wert\_Ausgabe:**_ Dies repräsentiert den Wert, der an das Gerät gesendet wird. Dies muss nur definiert werden, wenn eine Konvertierung erforderlich ist.

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

_**Datenfeld -> Dezimalstellen:**_ Definiert, wie viele Ziffern nach dem Dezimalpunkt angezeigt werden.

_**Datenfeld -> Einheit:**_ Verwenden Sie dies, wenn die Einheit variabel ist, andernfalls definieren Sie sie in iobroker.

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

Die vollständige Implementierung eines Geräts besteht aus mindestens zwei Teilen: einem Eintrag in der Datei „lib/devices/MANUFACTURER/MODEL/device.json“ und einer EEP-Datei, die die Objekte und die Verarbeitung des Datentelegramms definiert. Die Datei „lib/definitions/devices.js“ muss für das neue Gerät aktualisiert werden. Manche Geräte verwenden mehrere Datentelegrammtypen zur Kommunikation; in diesem Fall sind mehrere EEP-Dateien erforderlich.\
&#x20;In Sonderfällen, wie bei Eltako, gibt es auch einen herstellerspezifischen Teil in der definierten Datei 'packet\_handler.js'.

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

## Für die Entwicklung

Um die Telegram-Verarbeitung zu testen, erstellen Sie einen Kanal mit dem Namen „development“ und in diesem Kanal ein Objekt mit dem Namen „telegram“ vom Typ „string“.

## Changelog

### 0.9.4 (2024-10-12)
* (Jey Cee) fix use gateway fgw(-14) with ser2net
* (Jey Cee) add notice to the ser2net switch 

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

[Older changelog entries are moved to changelog.md](https://github.com/jey-cee/ioBroker.enocean/blob/master/changelog.md)

## License
Attribution-NonCommercial 3.0 (CC BY-NC 3.0)

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).