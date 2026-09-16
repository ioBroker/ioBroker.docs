---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.broadlink2/README.md
title: ![Logo](./admin/broadlink2.png) Steuert BroadLink-kompatible Geräte
hash: lTv+nbO2NTMZJdT/7CuVkRIXoYcHIje6M41dld4kXig=
---
# ![Logo](../../../en/adapterref/iobroker.broadlink2/admin/broadlink2.png)Steuert BroadLink-kompatible Geräte

![NPM-Version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![installiert](http://iobroker.live/badges/broadlink2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Deutsche Anleitung, übersetzt von Google](https://translate.google.com/translate?sl=en\&tl=de\&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Russische Anweisungen, die mit der Sprache übersetzt werden](https://translate.google.com/translate?sl=en\&tl=ru\&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

## Adapter für verschiedene Broadlink-kompatible WLAN-Geräte (RM++, SP++, A1, Floureon, S1C, LB1)

Dies ist ein ioBroker-Adapter für verschiedene Broadlink-Switches wie RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus und einige OEM-Produkte von Broadlink. Auch Fernbedienungen wie RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 und RM2 Pro Plus BL werden unterstützt. Jede Fernbedienung generiert eigene Einträge und muss separat trainiert werden. Der Adapter scannt das Netzwerk nach kompatiblen Geräten und installiert diese (derzeit nur Switches des Typs SP?).

Wenn Sie die Bundesstaaten für RM\* gelernt haben und diese dann umbenennen, ändert sich auch die Bundesstaats-ID auf den neuen Namen!

Sie können in LearnedStates auch Ihre eigenen neuen Befehle erstellen, indem Sie 'code' + Ihren Code als Wert verwenden (wobei 'CODE\_' dem Code vorangestellt wird) oder noch besser (da dies auch beim Umbenennen des Zustands erhalten bleibt), fügen Sie mit dem admin.object pencil ein Feld 'code' zu native hinzu und geben Sie dort den Hex-Code ein (ohne 'CODE\_'!).

Der Adapter verfügt über feste Zustände zum Senden von Codes von RM-Geräten oder zum Erlernen dieser. Er kann auch einzelne Szenen (Aktionen auf mehreren Geräten) senden.

Wenn Geräte, die auf einer bestimmten IP-Adresse konfiguriert sind, nicht wiedergefunden werden, werden sie als „nicht erreichbar“ gekennzeichnet. Sobald die Verbindung wiederhergestellt ist, können sie normal verwendet werden.

Wenn ein Gerät 5 Minuten lang nicht antwortet, wird es als nicht erreichbar markiert. Geräte _**im Status „nicht erreichbar“**_ geben nach jeweils x Scans eine Warnmeldung im Protokoll aus. Nach einigen Scans versucht der Adapter, das Gerät unter derselben MAC-Adresse erneut zu finden.

Bitte löschen Sie alte Geräte aus admin.objects, falls Sie diese endgültig entfernt oder in Ihrem Router umbenannt haben!

Der Adapter versucht, das Gerät zunächst anhand seines Namens und anschließend anhand seiner MAC-Adresse zu finden. Ändert sich der Name beispielsweise aufgrund einer IP-Adressänderung, die MAC-Adresse bleibt aber gleich, verwendet das Gerät weiterhin den alten Namen. Wird das Gerät durch ein neues mit neuer MAC-Adresse ersetzt, kann die Option „Gerät umbenennen“ in den Konfigurationseinstellungen verwendet werden, um den alten Gerätenamen wiederherzustellen.

### Anmerkung zur Umfrage

- SP1-Geräte können nicht abgefragt werden.
- Bei Verwendung ausschließlich von RM-Geräten kann das Abfrageintervall auf 2 Minuten (120 Sekunden) eingestellt werden, sollte aber nicht höher eingestellt werden, da die Geräte sonst möglicherweise nicht erneut autorisiert werden.
- Bei Verwendung von Schaltern, die manuell betätigt werden können, sollte die Molling-Zeit 30 Sekunden bis 1 Minute betragen, um Änderungen innerhalb einer Minute widerzuspiegeln.

## Konfiguration

- Geben Sie in der Konfiguration ein Präfix der Netzwerkadresse ein, das beim Generieren von Gerätenamen entfernt werden soll.
- Geben Sie die Anzahl der Sekunden zwischen den Abfragen ein. Bei jeder Abfrage wird der Schaltstatus aller SP\*-Geräte (außer SP1) abgefragt. Diese Funktion kann durch Setzen der Abfrageverzögerung auf 0 deaktiviert werden. Bei einigen RM-Geräten mit Temperaturanzeige wird die Temperatur ebenfalls aktualisiert.
- Sie können nun IP-Adressen von Geräten hinzufügen, die sich in einem anderen Netzwerk als dem des Adapters befinden. In diesem Fall müssen Sie sicherstellen, dass der Computer, auf dem der Adapter läuft, über interne oder externe Routingtabellen weiß, wie er sich mit diesem anderen Netzwerk verbinden kann.
- Der`use IP interface` Diese Option ermöglicht die Verwendung einer bestimmten Schnittstellenadresse. Dies ist hilfreich, wenn auf dem System, auf dem iobroker ausgeführt wird, sowohl LAN als auch WLAN vorhanden sind und Sie nicht die lokale Schnittstelle, sondern nur das WLAN scannen möchten. Auch in Docker- oder VM-Umgebungen, in denen sich die lokale Schnittstelle von der externen unterscheidet, kann diese Option nützlich sein. Sie müssen die IPv4-Adresse der zu verwendenden Schnittstelle als Quelladresse angeben. Andernfalls verwendet der Adapter 0.0.0.0 und überwacht ausschließlich alle lokalen Schnittstellen.

## Anleitung zum Erlernen von Codes auf RMs

- In den Objekten von ioBroker finden Sie "broadlink2.\[Gerätename].Learn oder LearnRF für Geräte vom Typ '+'".
- Bei RM(x)+ (Plus)-Geräten gibt es außerdem eine spezielle RS-Sweep-Lerntaste (\_LearnRF), mit der mehr Geräte als im normalen 433-MHz-Band gelernt werden können.
- Setzen Sie dieses Objekt auf „true“. (Sie können in der Objektansicht auf die Schaltfläche klicken.)
- Drücken Sie nun innerhalb von 30 Sekunden eine beliebige Taste auf Ihrer Fernbedienung. Im Normalmodus drücken Sie die Tasten kurz hintereinander mit etwas Zeit dazwischen, bis die Tastenbelegung gelernt ist.
- Beim RF-Sweep-Lernen müssen Sie die Taste zunächst \~10-20 Sekunden lang gedrückt halten, dann loslassen und 2-3 Sekunden warten, bevor Sie sie erneut für einen sehr kurzen Moment drücken.
- Innerhalb des Objekts "broadlink.\[n].\[devicename].LearnedState" sollte nun ein neues Objekt mit dem Namen "">>> Rename learned @ YYYYMMDDTHHmmSS" erscheinen.
- Sie können in der Objektansicht auf die Schaltfläche klicken, um den Code zu senden.
- Um den Eintrag umzubenennen, klicken Sie auf den Namen (beginnend mit …).`_Rename_learned_` ) und ändern Sie den Namen. Es sollte nicht enthalten`,` ,`.` oder`;` sowie einige andere Zeichen werden durch '\_' ersetzt;

Alternativ können Sie auch die Codes von [RM-Bridge](http://rm-bridge.fun2code.de/) verwenden. Erstellen Sie dazu einfach ein Objekt (z. B. einen Status oder eine Schaltfläche) mit einem Wert, dem Sie „CODE\_“ voranstellen, oder verwenden Sie einen nativen Eintrag.`code` ohne jeglichen 'CODE\_'.

## Hinweis zu den neuen RM4/LB1-Geräten

- Mehrere neue Broadlink-Geräte unterstützen das neue Broadlink-Cloud-Protokoll, das automatisch ausgewählt wird, wenn Sie die neueren Broadlink-Apps verwenden, um das Gerät in Ihr WLAN-Netzwerk einzubinden. Dieses neue Broadlink-Protokoll ist nicht mit dem Broadlink2-Adapter kompatibel, und Sie können keine Geräte verwenden, die dieses neue Protokoll nutzen.
- Um dieses Problem zu vermeiden, verbinden Sie das Gerät mithilfe älterer Broadlink-Apps mit dem Netzwerk, wie zum Beispiel`e smart home` oder`e-control` Und vergewissern Sie sich, dass sich Ihr Telefon im selben 2,4-GHz-WLAN-Netzwerk befindet, in dem Sie es verwenden möchten!
- Diese neueren Geräte müssen außerdem alle 5-10 Minuten neu authentifiziert werden, was der Adapter automatisch erledigt.

## Szenen verwenden

- Szenen können IDs oder Namen sowie durch Striche getrennte Zahlen enthalten.`,` Normalerweise werden die IDs mit einem Zeitabstand von 100 ms ausgeführt/gesendet. Falls Sie eine längere Pause benötigen, können Sie die Wartezeit in Millisekunden angeben. Zum Beispiel`SP:dose=1, 1000, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` Ich würde eine drahtlose Steckdose namens „SP:dose“ einschalten, dann eine Sekunde (genauer gesagt 1,1 Sekunden) warten, die Stereoanlage und nach einer weiteren Sekunde den Fernseher einschalten. Sie können auch Geräte anderer Adapter umschalten, wie zum Beispiel`hm-rpc.0.MEQ1435726.1.STATE=true` würde dieses Homematic-Gerät einschalten! Boolesche Zustände können mit '=1/=on/=true/=ein' umgeschaltet werden, wenn Sie es ohne`=` Dann wird „true“ verwendet. Um ein Gerät auszuschalten, beendet man den Befehl mit „=0/=false/=aus/=off“, was für das Ausschalten notwendig ist!

## Nutzungszustände

- Sie können auch Zustände für Ihre Geräte erstellen, die Ein- und Ausschaltbefehle zu einem einzigen Zustand kombinieren, der wie bei jedem anderen Gerät umgeschaltet werden kann.
- Sie müssen die Befehle zum Ein- und Ausschalten eines Zustands in separaten Spalten auflisten. Es können mehrere Befehle vorhanden sein, damit das System erkennt, wann Ihr Gerät durch einen dieser Befehle ein- oder ausgeschaltet wird.
- Wenn Sie den Zustand auf „Ein“ oder „Aus“ setzen, wird nur der erste Ein-/Aus-Befehl gesendet.
- Sind nur On-Befehle vorhanden, sendet der Schalter den jeweiligen Befehl mit dem numerischen Wert - 1. Das bedeutet, dass er den ersten Befehl sendet, wenn er einen On-Befehl empfängt.`0` , die zweite, falls sie eine`1` Auf diese Weise lassen sich mehrere Zustände innerhalb eines Zustands simulieren.
- Wenn Sie als Ausschaltbefehl nur '+' verwenden, müssen Sie 10 durch ',' getrennte Einschaltbefehle angeben, die die Zahlen widerspiegeln.`0-9` auf der Fernbedienung. Sie können den Status und dann eine Zahl senden, zum Beispiel`123` (maximal 9999) und es würde senden`1` ,`2` Und`3` mit einer Verzögerung von 1/3 Sekunde dazwischen! Auf diese Weise können Sie beispielsweise den Fernsehkanal auf '33' einstellen, indem Sie einfach 'TVchannel=33' eingeben, wenn der Statusname TVchannel lautet.
- Wenn Sie verwenden`-number` wie ein Aus-Befehl wie`-17` Dann können Sie eine Zahl im Zustand speichern, von der 17 subtrahiert wird, und das (x-17)-te Element im Ein-Zustand senden. Auf diese Weise können Sie verschiedene feste Temperaturen für Geräte einrichten, die jeweils unterschiedliche Codes für jede Temperatur haben.

## Verwenden Sie den Adapter zum Senden von Nachrichten.

Der Adapter versteht auch 'sendTo'-Befehle.

- `debug` :`sendTo('broadlink2.0','debug','on')` (auch 0,1,on,off,ein,aus,true,false) würde den Debug-Modus einschalten.
- `get` :`sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` könnte Daten von einem Gerät wie dem folgenden anfordern`{ val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870 }` zurück
- `switch` : kann einen Stecker ein- oder ausschalten:`sendTo('broadlink2.0','switch','SP:your device id=on')`
- `switch_on` /`switch_off` : sendTo('broadlink2.0','switch\_on','SP:Ihre Geräte-ID')\`
- `send` :`sendTo('broadlink2.0','send','RM:yourdev._Learn')` würde anfangen zu lernen und`sendTo('broadlink2.0','send','RM:yourdev.L.yourid')` würde den Code senden.
- `send_scene` :`sendTo('broadlink2.0','send_scene','scene xxx ')` Würde den als Nachricht angegebenen Text als Szene ausführen
- `send_code` :`sendTo('broadlink2.0','send_code','RM:your remote.CODE_xxxxx')` würde den CODE\_xxxx vom R:your name senden.

## Floureon- oder Beok313-Thermostate

- Die meisten Daten können festgelegt werden, die Zeit kann durch Schreiben von beliebigem Text eingestellt werden.`_setTime` In diesem Fall wird die Gerätezeit auf die ioBroker-Systemzeit eingestellt. Dies geschieht automatisch auch beim Start des Adapters.

## Konfigurieren Sie zusätzliche neue Geräte

- Sie können neue Geräte, die dasselbe Protokoll verwenden, hinzufügen, indem Sie sie mit der Geräte-ID (hexadezimal oder dezimal) und der Geräteklasse (in der Liste enthalten: Klasse = A1, MP1, RM, RMP, S1C, SP1, SP2, SP3P, T1) hinzufügen. So können Sie beispielsweise eine neue Fernbedienung, die der Adapter nur als unbekanntes Gerät mit der Hex-ID 0x1234 erkennt, der RM-Liste hinzufügen, indem Sie 0x01234=RMP angeben.

## Geräte umbenennen

- Geräte erhalten normalerweise ihren Netzwerk-Hostnamen oder eine Kombination aus Gerätetyp, ID und MAC-Adresse als Namen, wobei die ersten beiden Buchstaben des Typs mit einem Doppelpunkt (:) beginnen. Sie können ein solches Gerät umbenennen mit`T1:BroadLink-OEM-T1-fa-83-7c=Beok313` In diesem Fall wird nicht der ursprüngliche Name verwendet, sondern der neue Name lautet:`Beok313` Die

## Debug-Modus

- Wenn Sie ein hinzufügen`!` Am Ende der Liste der hinzugefügten neuen Geräte (auch wenn diese leer ist) können Sie den Adapter in den Debug-Modus versetzen, in dem er viele zusätzliche Informationen protokolliert, selbst wenn er im Admin-Bereich nicht auf den 'Info'-Modus eingestellt ist.

## Bekannte Probleme

- Wenn man dasselbe Signal mehrmals lernt, kann der Code jedes Mal anders sein. Das lässt sich nicht ändern.
- Manchmal werden keine Geräte gefunden, wenn diese nicht auf die Suche reagieren. Führen Sie einen erneuten Scan durch oder starten Sie den Adapter neu, um eine neue Instanz zu starten.

## Installation

Mit dem ioBroker-Admin können Sie iobroker.broadlink2 mit npm installieren oder es von <https://github.com/frankjoke/ioBroker.broadlink2> herunterladen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
* (mattreim) Several issues reported by adapter checker have been fixed

### 2.3.0 (2024-05-21)
* (mattreim) Adapter migrated to jsonConfig
* (mcm1957) Adapter requires admin >= 6 now
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

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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