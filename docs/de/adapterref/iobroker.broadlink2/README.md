---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.broadlink2/README.md
title: ![Logo](./admin/broadlink2.png) Steuert BroadLink-kompatible Geräte
hash: js1mQXxVwhLC6LCXSeKhIWLU1flXYjnv+LvKdEEGFbc=
---
# ![Logo](../../../en/adapterref/iobroker.broadlink2/admin/broadlink2.png) Steuert BroadLink-kompatible Geräte

![NPM-Version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![Eingerichtet](http://iobroker.live/badges/broadlink2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Deutsche Anleitung übersetzt von Google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

## Adapter für verschiedene Broadlink kompatible WLan-Geräte (RM++,SP++,A1, Floureon, S1C, LB1)
Dies ist ein ioBroker-Adapter für mehrere Broadlink-Switches wie RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus und einige OEM-Produkte davon.
Außerdem werden Fernbedienungen wie RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 und RM2 Pro Plus BL unterstützt. Mehrere Controller generieren ihre eigenen Einträge und müssen separat trainiert werden.
Er durchsucht das Netzwerk nach kompatiblen Geräten und installiert diese (derzeit nur Switches vom Typ SP?).

Wenn Sie Bundesstaaten für RM* gelernt und diese dann umbenennen, ändert sich auch die Bundesstaat-ID in den neuen Namen!

Sie können in LearnedStates auch Ihre eigenen neuen Befehle erstellen, indem Sie „Code“ + Ihren Code als Wert verwenden (mit „CODE_“ vor dem Code) oder noch besser (da dieser erhalten bleibt, wenn Sie den Status umbenennen) fügen Sie mit dem Admin.object-Stift ein Feld „Code“ zu Native hinzu und geben Sie dort den Hex-Code ein (ohne „CODE_“!).

Der Adapter verfügt über feste Zustände um Codes von RM-Geräten zu senden bzw. zu lernen. Er kann auch einzelne Szenen (Aktionen auf mehreren Geräten) senden.

Wenn Geräte, die auf einer bestimmten IP konfiguriert sind, nicht wieder gefunden werden, werden sie als „nicht erreichbar“ gekennzeichnet! Wenn sie erneut verbunden werden, sind sie normal nutzbar.

Wenn ein Gerät 5 Minuten lang nicht antwortet, wird es auf nicht erreichbar gesetzt. ***notReachable***-Geräte geben alle x Scans eine Protokollwarnmeldung aus. Nach einigen Scans versucht der Adapter, sie unter derselben Mac-Adresse wie zuvor erneut zu finden.

Bitte löschen Sie alte Geräte aus admin.objects, falls Sie diese dauerhaft entfernen oder in Ihrem Router umbenennen!

Der Adapter versucht, das Gerät zuerst anhand seines Namens und dann anhand seiner Mac-Adresse zu finden. Wenn sich der Name beispielsweise aufgrund einer Änderung der IP-Adresse ändert und die Mac-Adresse gleich bleibt, verwendet das Gerät weiterhin den alten Namen. Wenn das Gerät zu einem neuen Gerät mit neuem Mac wird, können Sie in der Konfiguration die Option „Gerät umbenennen“ verwenden, um stattdessen einen alten Gerätenamen zu verwenden.

### Hinweis zur Umfrage
* SP1-Geräte können nicht abgefragt werden.
* Wenn Sie nur RM-Geräte verwenden, kann die Abfrage auf 2 Minuten (120 Sekunden) eingestellt werden, sollte aber nicht höher eingestellt werden, da sie sonst möglicherweise nicht erneut autorisiert werden
* Wenn Sie Schalter verwenden, die manuell umgeschaltet werden können, sollte das Molling 30 Sekunden bis 1 Minute betragen, um Änderungen innerhalb einer Minute widerzuspiegeln.

## Aufbau
* Geben Sie in der Konfiguration das Präfix der Netzwerkadresse ein, das bei der Generierung von Gerätenamen entfernt werden soll
* Geben Sie die Anzahl der Sekunden zwischen den Abfragen ein. Bei jeder Abfrage werden alle SP*-Geräte außer SP1 nach dem Schaltstatus gefragt. Diese Funktion kann deaktiviert werden, indem die Abfrageverzögerung auf 0 gesetzt wird. Bei einigen RM-Geräten mit Temperaturanzeige wird die Temperatur ebenfalls aktualisiert.
* Sie können nun IP-Adressen von zu findenden/einzuschließenden Geräten hinzufügen, die sich auch in einem anderen Netzwerk als dem Netzwerk des Adapters befinden. In diesem Fall müssen Sie sicherstellen, dass der Computer, auf dem der Adapter läuft, durch interne oder externe Routing-Tabellen weiß, wie er sich mit diesem anderen Netzwerk verbinden kann.
* Die Option „IP-Schnittstelle verwenden“ kann so eingestellt werden, dass eine bestimmte Schnittstellenadresse verwendet wird. Dies kann hilfreich sein, wenn Sie LAN und WLAN auf dem System haben, auf dem iobroker läuft, und Sie nicht die erste Schnittstelle, sondern nur das WLAN scannen möchten. Es kann auch hilfreich sein, wenn sich die lokale Schnittstelle in einigen Docker- oder VM-Umgebungen von der externen unterscheidet. Sie müssen die IPv4-Adresse der Schnittstelle eingeben, die als Quelladresse verwendet werden soll, andernfalls verwendet der Adapter 0.0.0.0 und überwacht nur alle lokalen Schnittstellen.

## So lernen Sie Codes auf RMs
* In den Objekten von ioBroker finden Sie „broadlink2.[Gerätename].Learn oder LearnRF für Gerätetyp ‚+‘“.
* Für RM(x)+ (Plus)-Geräte erhalten Sie auch eine spezielle RS-Sweep-Lerntaste (_LearnRF), mit der Sie mehr Geräte lernen können als auf normalen 433 MHz.
* Setzen Sie dieses Objekt auf „true“. (Sie können in der Objektansicht auf die Schaltfläche klicken.)
* Drücken Sie nun innerhalb von 30 Sekunden eine beliebige Taste auf Ihrer Fernbedienung. Drücken Sie im Normalmodus kurz mit etwas Zeit dazwischen, bis die Taste gelernt ist.
* Beim RF-Sweep-Lernen müssen Sie die Taste zunächst ca. 10–20 Sekunden lang gedrückt halten, sie dann loslassen und 2–3 Sekunden warten, bevor Sie sie erneut ganz kurz drücken.
* Innerhalb des Objekts „broadlink.[n].[devicename].LearnedState“ sollte jetzt ein neues Objekt mit dem Namen ">>> Rename learned @ YYYYMMDDTHHmmSS" erscheinen.
* Zum Senden des Codes können Sie in der Objektansicht auf die Schaltfläche klicken.
* Um das Element umzubenennen, klicken Sie auf den Namen (beginnend mit `_Rename_learned_`) und ändern Sie den Namen. Er darf keine `,`, `.` oder `;` sowie einige andere Zeichen enthalten, diese werden durch '_' ersetzt;

Es ist auch möglich, die Codes aus [RM-Brücke](http://rm-bridge.fun2code.de/) zu verwenden.
Erstellen Sie einfach ein Objekt (Status, Typ Schaltfläche) mit einem Wert, dem Sie „CODE_“ voranstellen, oder mit dem nativen Eintrag `code` ohne „CODE_“.

## Hinweis zu neuen RM4/LB1-Geräten
* Mehrere neue Broadlink-Geräte unterstützen ein neues Broadlink-Cloud-Protokoll, das automatisch ausgewählt wird, wenn Sie die neueren Broadlink-Apps verwenden, um das Gerät in Ihr WLAN-Netzwerk einzubinden. Dieses neue Broadlink-Protokoll ist nicht mit dem Broadlink2-Adapter kompatibel und Sie können keine Geräte verwenden, die dieses neue Protokoll verwenden.
* Um dieses Problem zu vermeiden, bringen Sie das Gerät mithilfe älterer Broadlink-Apps wie „e smart home“ oder „e-control“ in das Netzwerk und stellen Sie sicher, dass sich Ihr Telefon im selben 2,4-GHz-WLAN-Netzwerk befindet, in das Sie es bringen möchten!
* Diese neueren Geräte müssen alle 5–10 Minuten erneut authentifiziert werden, was der Adapter automatisch durchführt.

## Szenen verwenden
* Szenen können IDs oder Namen sowie durch `,` getrennte Zahlen enthalten. Normalerweise werden die IDs mit 100 ms Zeitunterschied ausgeführt/gesendet, aber wenn Sie eine längere Pause dazwischen benötigen, können Sie eine Zahl eingeben, die die zu wartenden Millisekunden widerspiegelt. Beispielsweise würde `SP:dose=1, 1000, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` einen Funkstecker mit dem Namen „SP:dose“ einschalten, dann eine Sekunde warten (tatsächlich 1,1 Sekunden), die Stereoanlage und nach einer weiteren Sekunde den Fernseher einschalten. Sie können auch Geräte anderer Adapter einschalten, beispielsweise würde `hm-rpc.0.MEQ1435726.1.STATE=true` dieses Homematic-Gerät einschalten! Boolesche Zustände können mit '=1/=on/=true/=ein' umgeschaltet werden, wenn Sie es ohne `=` lassen, wird true verwendet. Um ein Gerät auszuschalten beendet man es mit '=0/=false/=aus/=off', was zum Ausschalten notwendig ist!

## Zustände verwenden
* Sie können für Ihre Geräte auch Zustände erstellen, die Ein- und Aus-Befehle zu einem einzigen Zustand kombinieren, der wie bei jedem anderen Gerät umgeschaltet werden kann.
* Sie müssen die Befehle zum Ein- und Ausschalten eines Zustands in den einzelnen Spalten auflisten. Es können mehrere sein, damit der Zustand weiß, wann Ihr Gerät durch einen dieser Befehle ein- oder ausgeschaltet wird.
* Wenn Sie den Status auf Ein oder Aus setzen, wird nur der erste Ein-/Aus-Befehl gesendet.
* Wenn nur ein Befehl vorhanden ist, sendet der Switch den entsprechenden Befehl bei einem numerischen Wert-1, d.h. er sendet den ersten Befehl, wenn er eine `0` empfängt, den zweiten, wenn er eine `1` empfängt. Auf diese Weise können Sie mehrere Zustände innerhalb eines Zustands simulieren.
* Wenn Sie nur „+“ als Aus-Befehl verwenden, müssen Sie 10 Ein-Befehle angeben, die durch „,“ getrennt sind, was den Zahlen „0-9“ auf der Fernbedienung entspricht. Sie können dem Status dann eine Zahl senden, z. B. „123“ (max. 9999), und er sendet „1“, „2“ und „3“ mit einer Verzögerung von 1/3 Sekunde dazwischen! Auf diese Weise können Sie beispielsweise den Kanal im Fernsehen auf „33“ einstellen, indem Sie einfach „TVchannel=33“ schreiben, wenn der Statusname TVchannel ist.
* Wenn Sie `-number` als Aus-Befehl wie `-17` verwenden, können Sie eine Zahl im Status speichern, wobei 17 abgezogen und das (x-17)te Element im Ein-Status gesendet wird. Auf diese Weise können Sie verschiedene feste Temperaturen für Geräte einrichten, die für jede Temperatur unterschiedliche Codes haben.

## Verwenden Sie den Adapter zum Senden von Nachrichten
Der Adapter versteht auch „sendTo“-Befehle.

* `debug`: `sendTo('broadlink2.0','debug','on')` (auch 0,1,on,off,ein,aus,true,false) würde den Debug-Modus einschalten.
* `get`: `sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` könnte Daten vom Gerät anfordern wie `{ val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870 }` zurück
* `switch`: kann einen Stecker ein- oder ausschalten: `sendTo('broadlink2.0','switch','SP:your device id=on')`
* `switch_on`/`switch_off`: sendTo('broadlink2.0','switch_on','SP:Ihre Geräte-ID')`
* `send`: `sendTo('broadlink2.0','send','RM:yourdev._Learn')` würde das Lernen starten und `sendTo('broadlink2.0','send','RM:yourdev.L.yourid')` würde den Code senden.
* `send_scene`: `sendTo('broadlink2.0','send_scene','scene xxx ')` würde den als message angegebenen Text als Szene ausführen
* `send_code`: `sendTo('broadlink2.0','send_code','RM:your remote.CODE_xxxxx')` würde den CODE_xxxx vom R:your name senden.

## Floureon- oder Beok313-Thermostate
* Die meisten Daten können eingestellt werden. Die Zeit kann eingestellt werden, indem irgendetwas in `_setTime` geschrieben wird. In diesem Fall wird die Zeit des Geräts auf die ioBroker-Systemzeit eingestellt. Dies geschieht auch automatisch beim Start des Adapters.

## Zusätzliche dnew-Geräte konfigurieren
* Sie können neue Geräte hinzufügen, die dasselbe Protokoll verwenden, indem Sie sie mit der Geräte-ID (in Hexadezimal- oder Dezimalzahl) und der dort aufgeführten Geräteklasse hinzufügen (Klasse = A1, MP1, RM, RMP, S1C, SP1, SP2, SP3P, T1). So können Sie eine neue Fernbedienung, die der Adapter nur als unbekanntes Gerät mit der Hexadezimal-ID 0x1234 findet, mit 0x01234=RMP zur RM-Liste hinzufügen.

## Geräte umbenennen
* Geräte erhalten normalerweise ihren Netzwerk-Hostnamen oder eine Kombination aus Gerätetyp, ID und Mac-Adresse als Namen, wobei die ersten beiden Buchstaben des Typs mit einem ':' davor beginnen. Sie können ein solches Gerät mit `T1:BroadLink-OEM-T1-fa-83-7c=Beok313` umbenennen. In diesem Fall wird der ursprüngliche Name nicht verwendet, sondern der neue Name lautet `Beok313`.

## Debug-Modus
* Wenn Sie am Ende der Liste der hinzugefügten neuen Geräte ein „!“ hinzufügen (auch wenn diese leer ist), können Sie den Adapter in den Debug-Modus versetzen, in dem er viele zusätzliche Informationen protokolliert, auch wenn er im Admin nicht auf den „Info“-Modus eingestellt ist.

## Bekannte Probleme
* Wenn Sie das gleiche Signal mehrmals lernen, kann der Code jedes Mal anders sein. Dies kann nicht geändert werden.
* Manchmal werden Geräte nicht gefunden, wenn sie nicht auf die Suche reagieren. Führen Sie einen erneuten Scan durch oder starten Sie den Adapter neu, um eine neue Instanz zu starten.

## Installation
mit ioBroker-Admin, npm install iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0-alpha.2 (2024-05-15)
* (mattreim) Adapter migrated to jsonConfig
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-05)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.5

* beta to try to make 0x5f36 working

### 2.1.4

* bug corrections for RM4 temperatures & Humidity

### 2.1.2

* bug corrections for States and Scenes
* Names are now taken from DNS end which mean you may rename devices in router and set their fixed IP address there

### 2.1.0

* Added RM4 protocol for newest RM4 and RM3-Minis 
* Added LB1 Wifi bulb device support
* Added finding of devices if name or ip changes according to mac address
* Added support of devices in other netword with IP address
* Changed learning and device communication for all RM devices
* Re-write of 70% nof the code for new js-controllers and nodejs versions.

### 2.0.3

* changed to new myAdapter to support js-controller 2.0 and 3.0

### 2.0.1

* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Support compact mode
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed

### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

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