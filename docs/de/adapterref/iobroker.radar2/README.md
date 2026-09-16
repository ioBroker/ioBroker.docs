---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.radar2/README.md
title: radar2-Netzwerk- und Bluetooth-Verfügbarkeit
hash: xQ0fMnwrMY7ivi+/NmGLWvGOpVt7AcjnXmXXsBW7KmQ=
---
![Logo](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.radar2)
![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.radar2)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/radar2/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.radar2)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.radar2/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.radar2)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.radar2)
![NPM-Version](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/radar2-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/radar2-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml/badge.svg)

# radar2-Netzwerk- und Bluetooth-Verfügbarkeit

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## ioBroker radar2 Sichtbarkeitstests für Netzwerk- und Bluetooth-Geräte, HP-Drucker, UWZ-Warnungen und EZB-Währungen

Dieser Adapter sucht nach Geräten im Netzwerk oder per Bluetooth. Er zeigt außerdem die aktuelle externe IP-Adresse des Netzwerks an, kann den Tintenstand von HP-Druckern auslesen und Wetterwarnungen des UWZ für verschiedene europäische Länder abrufen. Darüber hinaus kann er die täglichen Wechselkurse der EZB abrufen.

Es funktioniert folgendermaßen:

- Mit arp-scan und ping können Geräte im Netzwerk mit IPv4 und IPv6 gefunden werden!
- Empfangt DHCP-Nachrichten, die neue Geräte im Netzwerk ankündigen.
- Es funktioniert auf mehreren Schnittstellen, was bedeutet, dass, wenn Ihr System WLAN und LAN in unterschiedlichen Netzwerken hat, es beide LANs sehen kann.
- Normales Bluetooth und Bluetooth LE werden unterstützt.
- HP-Druckertintenstatus
- Währungsumrechnung der Europäischen Zentralbank für Euro
- UWZ-Wetterwarnungen für das Gebiet, in dem ioBroker eingerichtet ist
- Verwendet arp-scan und ping im Netzwerk als einzige externe Programme, alles andere ist intern in nodejs.
- Der Adapter funktioniert auch ohne Root-Rechte, jedoch sind vor der Installation einige Konfigurationsmaßnahmen erforderlich.
- Jedes Element kann nun mit einer individuellen Zeitdauer konfiguriert werden, bevor es verschwindet, oder es kann auch deaktiviert werden.

Wenn Sie ein`-` Am Ende eines Namens wird das Gerät nicht in \_notHere oder \_isHere gezählt.

Beginnt eine IP-Adresse mit „http“, interpretiert radar2 sie als URL/Webadresse und versucht, eine Seite vom Server abzurufen. Dies kann genutzt werden, um die Verfügbarkeit von Webservern zu testen (z. B. <http://iobroker.net> ). Im Falle von HTTPS kann es vorkommen, dass der Server nicht erreichbar ist, wenn seine Sicherheitsschlüssel nicht aktuell sind.

Um UWZ zu nutzen, muss Ihr Standort in ioBroker.Admin konfiguriert sein! Ist der Wert für „max messages“ größer als 0, wird jede Warnung in einem separaten Status protokolliert, andernfalls werden sie zusammengefasst. Sie können auch festlegen, ob ein ausführlicher Warntext verwendet werden soll; alle Informationen sind aber auch in einer Kurzfassung verfügbar.

Die Währungen der Europäischen Zentralbank können Sie hier einsehen:`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Bluetooth-Nutzung

Es gibt zwei verschiedene Arten von Bluetooth-Geräten: BT-LE (Version 4.x+) und normales Bluetooth (Version ≤ 3.x). Der Adapter verfügt über zwei verschiedene Scanfunktionen für jeden Gerätetyp.

1. für BT-LE: Noble (Node.js-Modul) und der Befehl 'hcitool lescan'
2. Für normales Bluetooth: Bluetooth-Scan (Node.js-Modul) und Befehl 'l2ping'

Jedes BT-Gerät kann nur eine der beiden Methoden gleichzeitig verwenden.

Noble und BT Scan sind Module, die bei der Adapterinstallation mit npm kompiliert werden und unter Linux sowie den meisten Windows-Systemen funktionieren sollten. Hcitool und l2ping werden zusammen mit den Bluetooth-Tools im Installationsskript installiert und sind nur für Linux verfügbar.

In der Adapterkonfiguration sollten BT-LE-MAC-Adressen mit einem Ausrufezeichen („!“) vor der MAC-Adresse gekennzeichnet werden, um zu verhindern, dass sie von normalen Bluetooth-Scannern wie l2ping erfasst werden. Noble ist in der Regel etwas besser als hcitool lescan bei der Geräteerkennung, erzeugt aber auch mehr Fehler und lässt sich möglicherweise nicht auf allen Systemen installieren. Ebenso ist l2ping besser geeignet, normale Bluetooth-Geräte zu finden, ist aber nur unter Linux verfügbar. Daher können Sie die Verwendung separat in der Adapterkonfiguration festlegen.

Wenn Sie mehrere Bluetooth-Geräte verwenden, können Sie die Gerätenummer in der Konfiguration festlegen. Der Standardwert ist „-1“, wodurch das erste verfügbare Gerät verwendet wird. Eine Liste aller verfügbaren Geräte kann unter Linux mit folgendem Befehl angezeigt werden:`lescan dev` Mit demselben Adapter kann nur ein Gerät verwendet werden. Wenn Sie mehrere Geräte scannen möchten, benötigen Sie einen oder mehrere andere Adapter bzw. Instanzen.

## Installation

Bevor Sie den Adapter in ioBroker installieren, müssen Sie ihn unter Linux installieren.`arp-scan` Und`libcap2-bin` und einige Treiber, die Sie mit den folgenden Befehlen installieren können. Unter Debian (Raspi-Stretch, Ubuntu usw.) sieht das folgendermaßen aus:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

Die folgenden Befehle müssen immer dann ausgeführt werden, wenn Sie oder das System Node.js oder eine der oben installierten Anwendungen aktualisieren!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Wenn die erste Zeile alles außer installiert`readlink` oder`hcitools` Es konnte kein Pfad gefunden werden. Wahrscheinlich fehlt ein Pfad. Versuchen Sie, den Pfad mit folgendem Befehl zu suchen:`sudo find / -name readlink` (in meinem Fall war es`/usr/bin` ) das nicht in $PATH enthalten war! Bearbeiten Sie dann`.bashrc` und fügen Sie eine Zeile hinzu mit`export PATH=$PATH:/usr/bin` !

Wenn Sie Node oder einige Systemtools aktualisieren, muss das oben Genannte erneut ausgeführt werden!

Unter Windows (und möglicherweise auch unter macOS) gibt es keinen ARP-Scan, was bedeutet, dass nur Ping verwendet wird, aber keine IP- oder MAC-Adressen gescannt werden können!

Auch unter OSX funktioniert Bluetooth möglicherweise überhaupt nicht!

Nach der Installation und Konfiguration des Setup-Adapters können Sie die Demo-Zeilenelemente entfernen.

### Spezielle Informationen für arp-scan:

Es gibt eine Standard-Befehlszeile`-lgq --retry=5 --timeout=400` Es wurde definiert, dass alle IPv4-Schnittstellen und alle 254 Adressen gescannt werden. Wenn innerhalb von 400 ms keine Antwort erfolgt, werden fünf Wiederholungsversuche unternommen. Um nur eine bestimmte Schnittstelle zu scannen, können Sie beispielsweise Folgendes hinzufügen:` --interface=br0` Normalerweise werden heutzutage Bridge-Schnittstellen korrekt verwendet, aber in Docker-Umgebungen kann IoT weiterhin erforderlich sein. Der Wert für \`repeat=5\` kann für eine bessere Erkennung auf 6 oder 7 geändert werden; bei Werten über 7 konnte ich keine Verbesserung feststellen. Dasselbe gilt für das Timeout: Auch hier konnte ich bei Werten über 500 keine Verbesserung feststellen.

### Tipp für alle, die von Radar auf Radar2-Adapter oder von Maschine 1 auf Maschine 2 umsteigen

- Wenn Sie Radaradapter verschieben, können Sie die gesamte Geräteliste oder die Einstellungen ganz einfach kopieren.
- - Gehen Sie im Administratorbereich zu Objekte und aktivieren Sie den Expertenmodus.
- - Suchen Sie nach einem Objektbaum, der so genannt wird`system.adapter.radar.0` (Wo`0` (Dies ist die Instanz; falls mehrere Instanzen vorhanden sind, wählen Sie die richtige aus.)
- - Ganz rechts neben dieser Zeile befindet sich ein Button mit einem Stift. Klicken Sie darauf.
- - Im Fenster wählen Sie „Nativ“ aus.
- - Anschließend sollten Sie die Konfigurationsfelder sehen. Markieren Sie den Inhalt des Felds „Geräte“ und kopieren Sie ihn in die Zwischenablage.
- - Führen Sie die gleichen Schritte auf dem Zielrechner durch.`system.adapter.radar2.0` Gehen Sie in Admin/objects und dort auch zu NATIVE.
- - Löschen Sie den Text im Feld „Geräte“ und fügen Sie die alten Einträge aus der Zwischenablage ein.
- - Änderungen speichern

Diese Methode zum Übertragen von Einstellungen funktioniert auch zwischen Systemen, jedoch möglicherweise nicht, wenn der andere Adapter eine andere Struktur aufweist. Die Geräteliste ist für Radar und Radar2 identisch; der einzige Unterschied besteht darin, dass in Radar2 mehrere IP-Adressen/Einträge durch Kommas getrennt werden können.

## Wichtig/Wichtig

- Der Adapter benötigt Node.js >= v10.1 und npm >= 6.4.
- Der Adapter unterstützt unter OSX möglicherweise nicht Bluetooth und ARP-Scan, sondern nur Ping ROR IP, wobei IP- und MAC-Adressen nicht erkannt werden können!
- Der Adapter kann auch unter Windows Probleme mit Bluetooth haben, außerdem ist arp-scan unter Windows nicht verfügbar, daher wird nur ping verwendet, welches keine IP- oder MAC-Adressen erkennen kann!

## Unterschiede zum Radar-Adapter

Radar2 listet Geräte auf, die sofort sichtbar sind, sobald sie verfügbar sind, und zwar für neue IP-Adressen, noch bevor der Scan erneut startet. Radar2 nutzt Node.js-Bibliotheken, um Bluetooth-Geräte zu finden, kann aber jetzt auch im Benutzermodus von iobroker ausgeführt werden und benötigt keinen Root-Zugriff (siehe Installationsvoraussetzungen unten). Sie können mehrere IP-Adressen (jetzt IPv4 UND IPv6) oder Hostadressen (keine URLs) in derselben Zeile konfigurieren, um Geräte auf verschiedenen Wegen anzupingen.`arp-scan` Wird verwendet, um nach MAC-Adressen zu suchen. Es wird (sofern in der Befehlszeile nicht anders angegeben) auf allen Netzwerkschnittstellen mit externer IPv4-Adresse ausgeführt, sodass es keine Geräte anhand von MAC-Adressen in IPv6-Netzwerken erkennt, aber es erkennt jetzt gleichzeitig Geräte in drahtlosen und festen Netzwerken!

Die Verfügbarkeit von Geräten wird unterschiedlich gehandhabt. Jedes Gerät erhält eine`_lasthere` Der Status wird bei jeder Erkennung mit dem aktuellen Datum und der aktuellen Uhrzeit aktualisiert. Am Ende jedes Scans prüft der Adapter alle Einträge unter „Zuletzt hier“, ob sie älter als die aktuelle Uhrzeit – die konfigurierte Abwesenheitsdauer in Minuten – sind. Geräte, die sich noch nie hier befunden haben, besitzen ebenfalls keinen Status.`_lasthere` Zustand!

Web-URLs können nun besser mit HTTPS-Servern umgehen. Die MAC-Adressenauflösung erfolgt jetzt intern und nicht mehr über das Web. Die Datei lib/vendor.json wird nur beim Start des Adapters geladen. Ist diese Datei älter als 31 Tage, wird eine neue Version aus dem Web heruntergeladen – und zwar ausschließlich beim Start des Adapters!

Die Bluetooth-Funktion wurde aktualisiert, sodass Sie das zu verwendende Bluetooth-Gerät auswählen können (0, 1, ... Standard: -1 = erstes Gerät). Dadurch können Sie mehrere Bluetooth-Sticks verwenden, um verschiedene Adapter wie BLE und radar2 auf demselben Gerät zu betreiben (die Bluetooth-LE-Treiber eines Geräts können nicht gleichzeitig von mehreren Programmen genutzt werden).

Werden IP-Adressen oder Bluetooth-Geräte gefunden, die Sie nicht in Ihrer Geräteliste angegeben haben, werden diese in den Listen „Unbekannte IP-Adressen“ und „Unbekannte Bluetooth-Geräte“ angezeigt und ein Status für jedes Gerät generiert. So können Sie Personen identifizieren, die sich in Ihr Netzwerk einloggen, oder neue Geräte, die integriert werden können. Wenn Sie nicht möchten, dass diese Geräte als unbekannt aufgeführt werden, tragen Sie sie in den entsprechenden Listen „Bekannte IP-Adressen“ bzw. „Bekannte Bluetooth-Geräte“ in der Adapterkonfiguration ein.

Neu ist auch, dass Intervalle für HP-Drucker-, ECB-, UWZ- und normale Scans separat definiert werden können.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.4.0 (2025-08-24)
* (Apollon77) Only execute arpscan if there are IPs configured
* (mcm1957) Adapter requires admin >= 7.6.17 now
* (mcm1957) 'debug:' logs are recorded with level 'debug' now [#391].
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

### 2.3.1 (2025-08-16)
* (Apollon77) Updates dependencies

### 2.3.0 (2025-05-14)
* (speebreaker12) Deprecated 'delObject' call have been replaced to meet current standards.
* (mcm1957) Adapter requires node.js 20, js-controller >= 6.0.11 and admin >= 7.4.10 now
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.0 (2023-10-29)
* (mcm1957) Adapter has been moved to iobroker-community-adapters area
* (mcm1957) Adapter requires nodejs 16 now
* (mcm1957) Dependencies have been updated

### 2.0.8
* (ta2k) fix arp-scan detection for debian 12

### 2.0.7 (2023-01-05)
* (Apollon77) Upgrade noble

### 2.0.5 (2022-12-31)
* (Apollon77) Downgrade noble again

### 2.0.4 (2022-12-22)
* Update noble

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.radar2/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023, frankjoke <frankjoke@hotmail.com>

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