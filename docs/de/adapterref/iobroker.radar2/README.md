---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.radar2/README.md
title: Radar2-Netzwerk und Bluetooth-Verfügbarkeit
hash: I/CU1jFnLVGPsOX8mf0av1Al4HHlfgN7c3vUjZpR9Ro=
---
# Radar2-Netzwerk und Bluetooth-Verfügbarkeit
![Logo](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![Anzahl der Installationen](http://iobroker.live/badges/radar2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)

![Testen und freigeben](https://github.com/frankjoke/iobroker.radar2/workflows/Test%20and%20Release/badge.svg)

[Deutsche Anleitung übersetzt von google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

## IoBroker radar2 Sichtbarkeitstests für Netzwerk- und Bluetooth-Geräte, HP-Drucker, UWZ-Warnungen und EZB-Währungen
Dieser Adapter versucht, die im Netzwerk oder über Bluetooth angegebenen Geräte zu finden. Es zeigt auch die aktuelle externe IP des Netzwerks an, kann den Tintenstatus von HP-Druckern auslesen und auch Wetterwarnungen von UWZ für mehrere europäische Länder. Es kann auch die täglichen Wechselkurse der EZB lesen.

Es funktioniert durch:

* Mit arp-scan und ping nach Geräten im Netzwerk mit IPv4 und IPv6 suchen!
* Abhören von DHCP-Nachrichten, die neue Geräte ankündigen, die ins Netzwerk kommen.
* Es funktioniert auf mehreren Schnittstellen, was bedeutet, dass wenn Ihr System Wlan und LAN in verschiedenen Netzwerken hat, es beide LANs sehen kann.
* Normales Bluetooth und Bluetooth LE werden unterstützt
* Tintenstatus des HP-Druckers
* Währungsumtausch der Europäischen Zentralbank für Euero
* UWZ-Wetterwarnungen für das Gebiet, auf das ioBroker eingestellt ist
* Verwendet arp-scan und ping im Netzwerk nur als externe Programme, alles andere ist intern in nodejs.
* Der Adapter funktioniert auch ohne Root-Rechte, aber vor der Installation sind einige Konfigurationsschritte erforderlich
* Jedes Element kann jetzt mit einer individuellen Zeit konfiguriert werden, bevor es verschwindet, oder es kann auch deaktiviert werden.

Wenn Sie am Ende eines Namens ein `-` setzen, wird das Gerät nicht in _notHere oder _isHere gezählt.

Wenn die IP-Adresse mit „http“ beginnt, interpretiert Radar2 sie als URL/Webadresse und versucht, eine Seite vom Server zu lesen, dies kann verwendet werden, um die Verfügbarkeit von Webservern zu testen (wie zum Beispiel http://iobroker.net ). Bei https kann es passieren, dass der Server nicht erreichbar ist, wenn er nicht über aktualisierte Sicherheitsschlüssel verfügt!

Um UWZ nutzen zu können, müssen Sie Ihren Standort in ioBroker.Admin konfigurieren! Wenn der Wert von max messages >0 ist, wird jede Warnung in einen separaten Zustand geschrieben, ansonsten werden sie kombiniert.
Sie können auch festlegen, ob Sie einen langen Warntext verwenden möchten, aber alle Informationen sind auch in einem kurzen verfügbar.

Währungen der Europäischen Zentralbank können hier eingesehen werden: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Bluetooth-Nutzung
Es gibt zwei verschiedene Typen von BT-Geräten: BT-LE (V 4.x+) und normales BT (V<=3.x). Der Adapter verfügt über zwei unterschiedliche Scan-Funktionen für jeden der unterschiedlichen Gerätetypen.

1) für BT-LE: Noble (Nodejs-Modul) und 'hcitool lescan'-Befehl 2) für normales BT: BT-Scan (Nodejs-Modul) und 'l2ping'-Befehl

Jedes BT-Gerät kann nur eine der beiden Methoden gleichzeitig verwenden.

Noble und BT Scan sind Module, die bei der Adapterinstallation mit npm kompiliert werden und die unter Linux und auch den meisten Windows-Setups funktionieren sollten.
Hcitool und l2ping werden mit den Bluetooth-Tools im Setup-Skript installiert und sind nur für Linux verfügbar.

In der Adapter-Config sollte BT-LE macs mit einem '!' vor der MAC-Adresse, um zu vermeiden, dass sie mit normalen BT-Scans wie l2ping gescannt werden.
Normalerweise ist Noble etwas besser als hcitool lescan, um Geräte zu identifizieren, aber es erzeugt auch mehr Fehler und wird möglicherweise nicht auf allen Systemen installiert.
Ebenso findet l2ping normale BT-Geräte besser, ist aber auf anderen Plattformen als Linux nicht verfügbar.
Daher können Sie die Verwendung in der Adapterkonfiguration separat konfigurieren.

Wenn Sie mehrere BT-Geräte verwenden, können Sie die Gerätenummer in der Konfiguration angeben, der Standardwert ist „-1“, der die erste verfügbare verwendet. Eine Liste aller verfügbaren Geräte kann unter Linux mit `lescan dev` eingesehen werden.
In demselben Adapter können Sie nur ein Gerät verwenden, wenn Sie mehrere Geräte scannen möchten, müssen Sie verschiedene Adapter oder Instanzen verwenden.

## Installation
Bevor Sie den Adapter in ioBroker installieren, müssen Sie unter Linux `arp-scan` und `libcap2-bin` und einige Treiber installieren, was Sie tun können, indem Sie die folgenden Befehle ausführen.
Auf Debian (Raspi-Stretch, Ubuntu, ...) sieht es so aus:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

und unten müssen ausgeführt werden, wenn Sie oder das System nodejs oder eine der oben installierten Apps aktualisieren!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Wenn die erste Zeile alles außer `readlink` oder `hcitools` installiert, fehlt höchstwahrscheinlich ein Pfad, versuchen Sie mit `sudo find / -name readlink` nach dem Pfad zu suchen (in meinem Fall war es `/usr/bin` ), die nicht in $PATH enthalten war! Bearbeiten Sie dann `.bashrc` und fügen Sie eine Zeile mit `export PATH=$PATH:/usr/bin` hinzu!

Wenn Sie den Knoten oder einige Systemtools aktualisieren, sollte das obige erneut ausgeführt werden!

Unter Windows (und vielleicht OSX) gibt es keinen ARP-Scan, was bedeutet, dass nur Ping verwendet wird, aber keine IP-Mac-Adressen gescannt werden können!

Unter Osx funktioniert möglicherweise auch Bluetooth überhaupt nicht!

Nach der Installation und Setup-Adapterkonfiguration können Sie die Demo-Werbebuchungen entfernen.

### Spezielle Informationen für arp-scan:
Es ist eine Standard-Befehlszeile `-lgq --retry=5 --timeout=400` definiert, die auf allen IPv4-Schnittstellen alle 254 Adressen scannen würde, wenn sie nicht innerhalb von 400 ms antwortet, würde sie es 5 Mal wiederholen! Wenn Sie nur die spezifische Schnittstelle scannen müssen, können Sie zum Beispiel ` --interface=br0` hinzufügen, aber normalerweise werden Bridge-Schnittstellen jetzt zu Recht verwendet, aber in Docker-Umgebungen ist dies möglicherweise immer noch erforderlich. Die Wiederholung = 5 kann in 6 oder 7 für geändert werden Bessere Erkennung, über 7 habe ich keine Verbesserung festgestellt! Das gleiche ist mit dem Timeout, über 500 konnte ich keine Verbesserung feststellen.

### Tipp für Umsteiger von Radar auf Radar2-Adapter oder von Maschine zu Maschine
* Wenn Sie Radaradapter verschieben, können Sie ganz einfach die gesamte Geräteliste oder Einstellungen kopieren
* - Gehen Sie im Admin zu Objekten und aktivieren Sie den Expertenmodus
* - Suchen Sie nach einem Objektbaum namens "system.adapter.radar.0" (wobei "0" die Instanz ist, wenn Sie mehrere Instanzen hatten, wählen Sie die richtige aus)
* - Ganz rechts in dieser Zeile ist ein Knopf mit einem Bleistift, klicken Sie darauf
* - In dem Fenster, das Sie erhalten, wählen Sie NATIVE
* - Sie sollten dann die Konfigurationsfelder sehen, wählen Sie den Inhalt des Felds "Geräte" aus und kopieren Sie ihn in die Zwischenablage
* - Machen Sie dasselbe auf dem Zielcomputer, indem Sie "system.adapter.radar2.0" in Admin/objects auswählen und auch hier zu NATIVE gehen.
* - Löschen Sie den Text im Feld "Geräte" und fügen Sie ihn in die alten aus der Zwischenablage ein
* - Speichern Sie die Änderungen

Diese Methode zum Verschieben von Einstellungen funktioniert auch zwischen Systemen, funktioniert jedoch möglicherweise nicht, wenn andere Adapter eine andere Struktur haben. Die Geräteliste ist für Radar und Radar2 gleich, der einzige Unterschied besteht darin, dass Sie in Radar2 mehrere IP-Adressen/Einträge haben können, die durch „,“ getrennt sind.

##Wichtig/Wichtig
* Adapter benötigt Knoten >= v10.1! und npm >=6,4
* Adapter ist möglicherweise nicht verfügbar, um Bluetooth und Arp-Scan unter OSX zu verwenden, nur ping ror ip, das keine IP-Mac-Adressen erkennen kann!
* Adapter kann auch unter Windows Probleme mit Bluetooth haben, außerdem ist ARP-Scan unter Windows nicht verfügbar, verwendet dann nur Ping, das keine IP-Mac-Adressen erkennen kann!.

## Unterschiede zum Radar-Adapter
Radar2 stellt Geräte, die sofort gesehen werden, wenn sie sichtbar werden, für neue IPs ein, noch bevor der Scan erneut beginnt.
Radar2 verwendet nodejs-Bibliotheken, um Bluetooth-Geräte zu finden, aber es kann jetzt auch im Benutzerbereich von iobroker ausgeführt werden und benötigt keinen Root-Zugriff (siehe unten Installationsanforderungen).
Sie können mehr als eine IP-Adresse (jetzt IPv4 UND IPv6) oder Hostadresse (keine URLs) in derselben Zeile konfigurieren, wodurch Sie Geräte auf mehreren Wegen anpingen können.
`arp-scan` wird verwendet, um nach Mac-Adressen zu suchen, es wird (wenn nicht anders in seiner Befehlszeile angegeben) auf allen Netzwerkschnittstellen ausgeführt, die externes IPv4 haben, also wird es keine Geräte erkennen, die auf Mac-Adressen auf IPv6 basieren, aber es erkennt jetzt Geräte in drahtlosen und festen Netzwerken gleichzeitig!

Die Verfügbarkeit von Geräten wird unterschiedlich gehandhabt. Jedes Gerät erhält einen `_lasthere` Status, der mit dem aktuellen Datum und der Uhrzeit aktualisiert wird, wann immer es gesehen wird. Am Ende jedes Scans überprüft der Adapter alle letzten Einträge, ob sie älter sind als die aktuelle Zeit - die konfigurierten Abwesenheitsminuten. Geräte die noch nie hier waren haben auch keinen `_lasthere` Zustand!

Web-URLs können jetzt besser von https-Servern verwaltet werden.
Die Auflösung des Mac-Adressenanbieters erfolgt jetzt intern und nicht über das Internet. Nur beim Adapterstart wird die Datei lib/vendor.json geladen, wenn diese Datei älter als 31 Tage wird, wird eine neue Version aus dem Web heruntergeladen - NUR beim Adapterstart!

Der Bluetooth-Teil wurde so aktualisiert, dass Sie das zu verwendende Bluetooth-Gerät definieren können (0,1, ... Standard: -1=erstes). Auf diese Weise können Sie mehrere BT-Sticks verwenden, um mehrere Adapter wie BLE und Radar2 auf demselben Gerät auszuführen (Bluetooth LE-Treiber für ein Gerät können nicht gleichzeitig von mehreren Programmen aufgerufen werden).

Wenn IP-Adressen oder Bluetooth-Geräte gefunden werden, die Sie nicht in Ihrer Geräteliste angegeben haben, werden sie in unbekannten IP- und BT-Listen angezeigt und für jede von ihnen wird ein Status generiert. Auf diese Weise können Sie Personen identifizieren, die sich in Ihr Netzwerk einloggen, oder Geräte, die integriert werden können.
Wenn Sie nicht möchten, dass sie als unbekannt aufgelistet werden, fügen Sie sie in die entsprechenden bekannten IP/BT-Listen in der Adapterkonfiguration ein.

Neu ist auch, dass Intervalle für HP-Drucker, ECB-, UWZ- und Normalscans separat definiert werden können.

## Changelog

### __WORK IN PROGRESS__
* Update noble

### V2.0.1

* Removed node-bluetooth because package is not updated to run on recent nodejs versions
* Updated noble to more recent version
* Completely rewritten logic for pinging BT with l2ping, or hcitool lescan
* Updated scan methot to reduce process load and also increase hit rate
* Completely re-written config page with new options
* Added possibility to switch off storing of _unknown's
* Added  `._nHere` for each item showing the number of scans device was found, reset to `0` when not found in a scan. This allows to implement delayed here logic.
* Changes to adapter to run on latest js-controller versions (and on older ones as well)
* Added `away time` in config for each item, with this you can set time until item is flagged for away individually for different items. Possible settings are -1 for default configured away time, 0 for item disabled or 1-30 for minutes until item is flagged as away.

### 1.2.5

* Updated to use the adapter for js-controller 3.0 
* Updated HP printer routine to understand some newer inkjet printers

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2022, frankjoke <frankjoke@hotmail.com>

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