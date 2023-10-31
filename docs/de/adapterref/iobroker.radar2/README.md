---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.radar2/README.md
title: Radar2-Netzwerk- und Bluetooth-Verfügbarkeit
hash: ui5trG7dVr4zZ47eDTJ9ZvnJ76AIGsrS7M9A9+yQjuM=
---
![Logo](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.radar2)
![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.radar2)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.radar2)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.radar2/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.radar2)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.radar2)
![NPM-Version](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/radar2-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/radar2-installed.svg)

# Radar2-Netzwerk- und Bluetooth-Verfügbarkeit
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/radar2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## IoBroker Radar2-Sichtbarkeitstest für Netzwerk- und Bluetooth-Geräte, HP-Drucker, UWZ-Warnungen und ECB-Währungen
Dieser Adapter versucht, die angegebenen Geräte im Netzwerk oder über Bluetooth zu finden. Es zeigt auch die aktuelle externe IP des Netzwerks an, kann den Tintenstatus von HP-Druckern lesen und auch Wetterwarnungen von UWZ für mehrere europäische Länder. Es kann auch die täglichen Wechselkurse der EZB lesen.

Es funktioniert durch:

* Verwenden Sie Arp-Scan und Ping, um Geräte im Netzwerk mit IPv4 und IPv6 zu suchen!
* Abhören von DHCP-Nachrichten, die die Ankunft neuer Geräte im Netzwerk ankündigen.
* Es funktioniert auf mehreren Schnittstellen, d. h. wenn Ihr System über WLAN und LAN in verschiedenen Netzwerken verfügt, kann es beide LANs sehen.
* Normales Bluetooth und Bluetooth LE werden unterstützt
* Tintenstatus des HP-Druckers
* Währungsumtausch der Europäischen Zentralbank für Euro
* UWZ-Wetterwarnungen für das Gebiet, auf das ioBroker eingestellt ist
* Verwendet Arp-Scan und Ping im Netzwerk nur als externe Programme, alles andere ist intern von NodeJS.
* Der Adapter funktioniert auch ohne Root-Rechte, allerdings sind vor der Installation einige Konfigurationsschritte erforderlich
* Für jedes Element kann jetzt eine individuelle Zeit konfiguriert werden, bevor es verschwindet, oder es kann auch deaktiviert werden.

Wenn Sie am Ende eines Namens einen `-` einfügen, wird das Gerät nicht in _notHere oder _isHere gezählt.

Wenn die IP-Adresse mit „http“ beginnt, interpretiert Radar2 sie als URL/Webadresse und versucht, eine Seite vom Server zu lesen. Dies kann verwendet werden, um die Verfügbarkeit von Webservern zu testen (wie zum Beispiel http://iobroker.net). ). Bei https kann es vorkommen, dass der Server nicht erreichbar ist, wenn er nicht über aktualisierte Sicherheitsschlüssel verfügt!

Um UWZ nutzen zu können, muss Ihr Standort in ioBroker.Admin konfiguriert sein! Wenn der Wert der maximalen Meldungen >0 ist, wird jede Warnung in einem separaten Status geschrieben, andernfalls werden sie kombiniert.
Sie können auch festlegen, ob Sie einen langen Warntext verwenden möchten, alle Informationen aber auch in einem kurzen Text verfügbar sind.

Währungen der Europäischen Zentralbank können hier eingesehen werden: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Bluetooth-Nutzung
Es gibt zwei verschiedene Arten von BT-Geräten: BT-LE (V 4.x+) und normales BT (V<=3.x). Für die unterschiedlichen Gerätetypen verfügt der Adapter über zwei unterschiedliche Scanfunktionen.

1) für BT-LE: Noble (Nodejs-Modul) und Befehl „hcitool lescan“ 2) für normales BT: BT-Scan (Nodejs-Modul) und Befehl „l2ping“.

Jedes BT-Gerät kann nur eine der beiden Methoden gleichzeitig verwenden.

Noble und BT Scan sind Module, die bei der Adapterinstallation mit npm kompiliert werden und unter Linux und auch den meisten Windows-Setups funktionieren sollten.
Hcitool und l2ping werden mit den Bluetooth-Tools im Setup-Skript installiert und sind nur für Linux verfügbar.

In der Adapter-Konfiguration sollten BT-LE-Macs mit einem „!“ gekennzeichnet werden. vor der Mac-Adresse, um zu vermeiden, dass sie mit normalen BT-Scans wie l2ping gescannt werden.
Normalerweise ist Noble bei der Identifizierung von Geräten etwas besser als hcitool lescan, erzeugt aber auch mehr Fehler und wird möglicherweise nicht auf allen Systemen installiert.
Ebenso eignet sich l2ping besser zum Auffinden normaler BT-Geräte, ist jedoch auf anderen Plattformen als Linux nicht verfügbar.
Daher können Sie die Verwendung separat in der Adapterkonfiguration konfigurieren.

Wenn Sie mehrere BT-Geräte verwenden, können Sie die Gerätenummer in der Konfiguration angeben. Der Standardwert ist „-1“, wodurch das erste verfügbare Gerät verwendet wird. Eine Liste aller verfügbaren Geräte kann unter Linux mit `lescan dev` eingesehen werden.
Mit demselben Adapter können Sie nur ein Gerät verwenden. Wenn Sie mehrere Geräte scannen möchten, müssen Sie unterschiedliche Adapter oder Instanzen verwenden.

## Installation
Bevor Sie den Adapter in ioBroker installieren, müssen Sie unter Linux `arp-scan` und `libcap2-bin` sowie einige Treiber installieren, was Sie durch Ausführen der folgenden Befehle tun können.
Unter Debian (Raspi-Stretch, Ubuntu, ...) sieht es so aus:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

und unten müssen jedes Mal ausgeführt werden, wenn Sie oder das System NodeJS oder eine der oben installierten Apps aktualisieren!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Wenn in der ersten Zeile alles installiert wird, außer dass `readlink` oder `hcitools` nicht gefunden werden kann, fehlt höchstwahrscheinlich ein Pfad. Versuchen Sie, den Pfad mit `sudo find / -name readlink` zu suchen (in meinem Fall war es `/usr/bin` ), was nicht in $PATH enthalten war! Bearbeiten Sie dann `.bashrc` und fügen Sie eine Zeile mit `export PATH=$PATH:/usr/bin` hinzu!

Wenn Sie den Knoten oder einige Systemtools aktualisieren, sollte das oben Genannte erneut ausgeführt werden!

Unter Windows (und vielleicht auch OSX) gibt es keinen ARP-Scan, was bedeutet, dass nur Ping verwendet wird, aber keine IP-Mac-Adressen gescannt werden können!

Unter OSX funktioniert Bluetooth möglicherweise überhaupt nicht!

Nach der Installation der Setup-Adapterkonfiguration können Sie die Demo-Werbebuchungen entfernen.

### Besondere Informationen zum Arp-Scan:
Es ist eine Standardbefehlszeile `-lgq --retry=5 --timeout=400` definiert, die auf allen IPv4-Schnittstellen alle 254 Adressen scannt, wenn sie nicht innerhalb von 400 ms antwortet, und es fünfmal erneut versucht! Wenn Sie nur die spezifische Schnittstelle scannen müssen, können Sie zum Beispiel ` --interface=br0` hinzufügen, aber normalerweise werden Bridge-Schnittstellen jetzt rechtmäßig verwendet, aber in Docker-Umgebungen ist möglicherweise noch nichts erforderlich. Die Wiederholung=5 kann in 6 oder 7 geändert werden bessere Erkennung, über 7 konnte ich keine Verbesserung feststellen! Das Gleiche gilt für den Timeout. Über 500 konnte ich keine Verbesserung feststellen.

### Tipp für alle, die vom Radar zum Radar2-Adapter oder von Maschine zu Maschine wechseln
* Wenn Sie Radaradapter verschieben, können Sie ganz einfach die gesamte Geräteliste oder Einstellungen kopieren
* - Gehen Sie im Admin zu Objekten und aktivieren Sie den Expertenmodus
* - Suchen Sie nach einem Objektbaum mit dem Namen „system.adapter.radar.0“ (wobei „0“ die Instanz ist. Wenn Sie mehrere Instanzen hatten, wählen Sie die richtige aus).
* - Ganz rechts in dieser Zeile befindet sich ein Stiftknopf, klicken Sie darauf
* - Im Fenster erhalten Sie die Option NATIVE
* – Sie sollten dann die Konfigurationsfelder sehen, den Inhalt des Feldes „Geräte“ auswählen und ihn in die Zwischenablage kopieren
* – Machen Sie dasselbe auf dem Zielcomputer, wählen Sie „system.adapter.radar2.0“ in Admin/Objects aus und gehen Sie auch hier zu NATIVE.
* - Löschen Sie den Text im Feld „Geräte“ und fügen Sie die alten aus der Zwischenablage ein
* - Speichern Sie die Änderungen

Diese Methode zum Verschieben von Einstellungen funktioniert auch zwischen Systemen, funktioniert jedoch möglicherweise nicht, wenn andere Adapter eine andere Struktur haben. Die Geräteliste ist für Radar und Radar2 dieselbe. Der einzige Unterschied besteht darin, dass Sie in Radar2 mehrere IP-Adressen/Einträge haben können, die durch „,“ getrennt sind.

## Wichtig/Wichtig
* Adapter benötigt Knoten >= v10.1! und npm >=6,4
* Der Adapter ist möglicherweise nicht für die Verwendung von Bluetooth und ARP-Scan unter OSX verfügbar, sondern nur für Ping-ROR-IP, das keine IP-Mac-Adressen erkennen kann!
* Der Adapter kann auch unter Windows Probleme mit Bluetooth haben, außerdem ist der Arp-Scan unter Windows nicht verfügbar, er verwendet dann nur Ping, der keine IP-Mac-Adressen erkennen kann!

## Unterschiede zum Radar-Adapter
Radar2 setzt Geräte, die sofort gesehen werden, wenn sie sichtbar werden, auf neue IPs, noch bevor der Scan erneut beginnt.
Radar2 verwendet NodeJS-Bibliotheken, um Bluetooth-Geräte zu finden, kann aber jetzt auch im Benutzerbereich von iobroker ausgeführt werden und benötigt keinen Root-Zugriff (siehe Installationsanforderungen unten).
Sie können mehr als eine IP-Adresse (jetzt IPv4 UND IPv6) oder Hostadresse (keine URLs) in derselben Zeile konfigurieren, wodurch Sie Geräte auf mehreren Wegen anpingen können.
`arp-scan` wird verwendet, um nach Mac-Adressen zu suchen. Es wird (sofern in der Befehlszeile nicht anders angegeben) auf allen Netzwerkschnittstellen ausgeführt, die über externes IPv4 verfügen, sodass es keine Geräte erkennt, die auf Mac-Adressen auf IPv6 basieren, aber es erkennt jetzt Geräte in drahtlosen und festen Netzwerken gleichzeitig!

Die Verfügbarkeit von Geräten wird unterschiedlich gehandhabt. Jedes Gerät erhält einen `_lasthere`-Status, der mit dem aktuellen Datum und der aktuellen Uhrzeit aktualisiert wird, wann immer es angezeigt wird. Am Ende jedes Scans überprüft der Adapter alle Lasthere-Einträge, ob sie älter sind als die aktuelle Zeit – die konfigurierten Abwesenheitsminuten. Geräte, die noch nie hier waren, werden auch keinen `_lasthere`-Status haben!

Web-URLs können jetzt https-Server besser verwalten.
Die Lösung des MAC-Adressenanbieters erfolgt jetzt intern und nicht über das Internet. Nur beim Start des Adapters wird die Datei lib/vendor.json geladen. Wenn diese Datei älter als 31 Tage wird, wird eine neue Version aus dem Internet heruntergeladen – NUR beim Start des Adapters!

Der Bluetooth-Teil wurde so aktualisiert, dass Sie das zu verwendende Bluetooth-Gerät definieren können (0,1, ... Standard: -1=first). Auf diese Weise können Sie mehrere BT-Sticks verwenden, um mehrere Adapter wie BLE und Radar2 auf demselben Gerät auszuführen (auf Bluetooth LE-Treiber für ein Gerät können nicht mehrere Programme gleichzeitig zugreifen).

Wenn IP-Adressen oder Bluetooth-Geräte gefunden werden, die Sie nicht in Ihrer Geräteliste angegeben haben, werden diese in unbekannten IP- und BT-Listen angezeigt und für jedes davon wird ein Status generiert. Auf diese Weise können Sie Personen identifizieren, die sich in Ihr Netzwerk einloggen oder Geräte benötigen, die eingebunden werden können.
Wenn Sie nicht möchten, dass sie als unbekannt aufgeführt werden, fügen Sie sie in der Adapterkonfiguration in die entsprechenden bekannten IP-/BT-Listen ein.

Neu ist auch, dass Intervalle für HP-Drucker-, ECB-, UWZ- und normale Scans separat definiert werden können.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

## License

The MIT License (MIT)

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