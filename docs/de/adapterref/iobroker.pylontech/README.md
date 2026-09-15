---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pylontech/README.md
title: ioBroker.pylontech
hash: xFaKkCvuVyNFvikBIRlLTk1HaL8RP5N3Nz0ez+56L00=
---
![Logo](../../../en/adapterref/iobroker.pylontech/media/logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pylontech.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pylontech.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pylontech-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pylontech-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pylontech.png?downloads=true)
![Test und Freigabe](https://github.com/PLCHome/ioBroker.pylontech/workflows/Test%20and%20Release/badge.svg)

![Logo](../../../en/adapterref/iobroker.pylontech/media/pytes.jpg)

# ioBroker.pylontech

## pylontech- und pytes-Adapter für ioBroker

Über die Konsole können Sie die Zellspannungen und den Status von Pylontech- oder Pytes-Batterien abfragen. Ich stehe in keiner Verbindung zu diesen Unternehmen.

**Bitte beachten Sie, dass Sie für alles, was Sie bauen oder anschließen, stets selbst verantwortlich sind. Der Entwickler dieses Adapters übernimmt keinerlei Haftung für etwaige Schäden!**

## So funktioniert es

Dieser Adapter dient zur Überprüfung des Gesundheitszustands und der Funktionen eines Pylontech- oder Pytes-Arrays, das aus einer bis zu fünfzehn Batterien bestehen kann. Er dient nicht der Batteriesteuerung, sondern ist Bestandteil eines Lade- und Netzteils oder eines Wechselrichters. Die Batterien verfügen über einen Konsolenanschluss mit RS232- oder V24-Schnittstelle. Der Adapter wird über eine serielle Schnittstelle angeschlossen. Die erste Batterie liefert alle Daten und fragt die anderen über den Uplink ab. Achtung: Ein direkter Anschluss eines Raspberry Pi oder ESP ist nicht möglich. Die RS232-Schnittstellen verfügen nicht über einen TTL-Pegel und sind nicht für 3 oder 5 Volt ausgelegt. Für den Anschluss ist ein Pegelwandler erforderlich. Die Bauanleitung finden Sie weiter unten.

## Was wird für die Verbindung benötigt?

Für den Anschluss werden ein Kabel und ein serieller Konverter benötigt. Eine serielle Verbindung erfordert drei Leitungen: RXD, TXD und Masse.

Rxd und Txd müssen gekreuzt werden, damit das, was der eine sendet (Txd), vom anderen empfangen werden kann (Rxd). Eine Erdung ist erforderlich, damit eine Spannung aufgebaut und ein Stromfluss in Gang gesetzt werden kann.

### Das serielle Verbindungskabel für Pylontech

Pylontech hat die RJ-Stecker der Akkus im Laufe der Zeit geändert. Anfangs waren es RJ11-Stecker wie beim Telefon, jetzt RJ45-Stecker wie bei Netzwerkanschlüssen. Die folgenden Abbildungen zeigen einen standardmäßigen neunpoligen D-Sub-Buchsenstecker am Kabel. Dieses Kabel lässt sich einfach über den USB-Anschluss mit einem RS232-zu-USB-Adapter oder einem RS232-zu-LAN- bzw. WLAN-Konverter verbinden. Nur der erste Akku im Array liefert alle Informationen. Sie benötigen lediglich ein Kabel und einen seriellen Anschluss.

Sie können ein solches Kabel mit einem [konfigurierbaren Stecker](https://www.amazon.de/gp/product/B0C8JFWNR7) selbst zusammenstellen. Dieser ist mit einem RJ45-Stecker und einer D-SUB9-Buchse erhältlich. Schließen Sie einfach ein Patchkabel daran an. **Achten Sie jedoch darauf, die übrigen Kabel gut zu isolieren, damit sie sich nicht berühren. Nicht alle Akkus haben freie Pins.** Prinzipiell können Sie auch ein RJ11-Kabel an einen solchen Adapter anschließen. Ich finde das aber sehr wackelig und habe immer den Eindruck, dass der Kontakt nicht richtig funktioniert.

![Stecker](../../../en/adapterref/iobroker.pylontech/media/configurablePlug.jpg)

Oder fertige Kabel im [Forum](https://forum.iobroker.net/topic/68707) anfragen.

![Kabel](../../../en/adapterref/iobroker.pylontech/media/Kabel.jpg)

#### RJ45

| RJ45 | Signal | DSUB | Signal |
| ---- | ------ | ---- | ------ |
| 3    | TxD    | 2    | RxD    |
| 6    | RxD    | 3    | TxD    |
| 8    | Boden  | 5    | Boden  |

![RJ45](../../../en/adapterref/iobroker.pylontech/media/8p.jpg)

#### RJ11 / RJ12

RJ11- und RJ12-Stecker sind gleich groß. Der RJ11-Stecker hat vier Kontakte, der RJ12-Stecker sechs. Die Kontakte des RJ11-Steckers befinden sich in der Mitte des Steckers, weshalb sie anders gezählt werden. Die Kontakte selbst sind jedoch an derselben Stelle.

| RJ11     | RJ12     | Signal | DSUB | Signal |
| -------- | -------- | ------ | ---- | ------ |
| 1 oder 4 | 2 oder 5 | Boden  | 5    | Boden  |
| 3        | 4        | TxD    | 2    | RxD    |
| 2        | 3        | RxD    | 3    | TxD    |

![RJ11 / RJ12](../../../en/adapterref/iobroker.pylontech/media/4p.jpg)

### Das serielle Verbindungskabel für Pytes

#### RJ45

| RJ45 | Signal | DSUB | Signal |
| ---- | ------ | ---- | ------ |
| 3    | TxD    | 2    | RxD    |
| 4    | Boden  | 5    | Boden  |
| 6    | RxD    | 3    | TxD    |

### Es gibt RJ45-Konsolenkabel mit USB-Anschluss für Cisco-Router. Diese haben keine kompatibel. Mit etwas Geschick lässt sich der RJ45-Stecker jedoch austauschen.

### Bitte beachten Sie, dass das Kabel aufgrund der relativ hohen Übertragungsrate von 115200 Baud bei RS232-Verbindungen nicht besonders lang sein darf.

| max. Baud   | maximale Länge |
| ----------- | -------------- |
| 2400        | 900 m          |
| 4800        | 300 m          |
| 9600        | 152 m          |
| 19.200      | 15 m           |
| 57.600      | 5 m            |
| **115.200** | **2 m**        |

Falls kein USB-Anschluss in der Nähe ist, kann man mit einem ESP einen seriellen zu WLAN-Adapter bauen.

Diese Adapter nutzen eine Art Telnet und erweitern die serielle Schnittstelle über WLAN. Hierfür ist die Installation eines Treibermoduls für die serielle Schnittstelle wichtig, z. B. des MAX3232. Beachten Sie die Spannungen; die meisten benötigen 3 V.

#### Raspi mit MAX

Da der Raspberry Pi auch eine TTL-Schnittstelle mit 3V bietet, kann man hier auch einen MAX3232 anschließen.

![Raspi mit MAX](../../../en/adapterref/iobroker.pylontech/media/rpicom.jpg)

Mehr dazu [unter http://www.savagehomeautomation.com/projects/raspberry-pi-rs232-serial-interface-options-revisit.html](http://www.savagehomeautomation.com/projects/raspberry-pi-rs232-serial-interface-options-revisit.html)

#### Den Port unter Linux (Debian / Raspi) finden

Unter Linux kann eine Verbindung zu dem Port hergestellt werden, an dem der USB-Seriell-Konverter angeschlossen ist. Anschließend können den Geräten aussagekräftige Namen zugewiesen werden.

```
$ ls -l /dev
crw-rw---- 1 root dialout 188,     0 29. Sep 21:32 ttyUSB0
lrwxrwxrwx 1 root root             7 29. Sep 21:32 ttyUSB_pylontech -> ttyUSB0
```

Die Seriennummer kann ermittelt werden, sofern der USB-Konverter über eine solche verfügt.

```
$ udevadm info -a /dev/ttyUSB0 | grep ATTRS{serial}
      ATTRS{serial}=="thisisit"
```

Falls hier keine Seriennummer vorhanden ist, ist das Gerät leider nicht mehr verfügbar. Bitte stellen Sie sicher, dass das Gerät ttyUSBx angeschlossen ist.

Erstellen Sie eine neue Konfigurationsdatei. Verwenden Sie dazu einen Editor Ihrer Wahl, VI ist ebenfalls möglich.

```
sudo nano /etc/udev/rules.d/20_pylontech.rules
```

Mit folgendem Inhalt

```
# File: /etc/udev/rules.d/20_pylontech.rules
# FTDI USB <-> Serial
SUBSYSTEM=="tty", \
ATTRS{serial}=="thisisit", \
SYMLINK+="ttyUSB_pylontech"
```

Dann sollten Sie udev neu starten und das Gerät einmal trennen und wieder verbinden.

```
sudo /etc/init.d/udev restart
```

#### Den Port unter Linux finden (zweite Methode)

Sie können jedem Gerät einen eindeutigen Namen zuweisen. Dieser ändert sich nicht, egal ob es sich um FTDI oder ähnliches handelt. Dieser Name kann auch im Adapter eingegeben werden.

```
$ ls -l /dev/serial/by-id
lrwxrwxrwx 1 root root 13 10. Okt 11:37 usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0 -> ../../ttyUSB0
```

Das Gerät ist also`/dev/serial/by-id/usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0`

### com über TCP

Statt einer lokalen Verbindung:

```
+--------+   comport  +----------+
| DEVICE | ~~~~~~~~~~ | ioBroker |
+--------+            +----------+
```

Unterstützt dieser Adapter auch Netzwerkverbindungen?

```
+--------+   comport  +--------+       network        +----------+
| DEVICE | ~~~~~~~~~~ | SERVER |========....==========| ioBroker |
+--------+            +--------+                      +----------+
```

#### ESP mit MAX

Es gibt verschiedene Projekte, die ESP oder ESP32 mit Telnet verbinden. Beachten Sie bitte die maximale Betriebsspannung (MAX). Wenn die MAX heiß wird, ist entweder der 5-V-Signalpegel zu hoch, weil Sie ein 3,3-V-Modell verwenden, oder Sie haben ein 3,3-V-Modell an eine 5-V-Betriebsspannung angeschlossen.

![ESP-LINK](../../../en/adapterref/iobroker.pylontech/media/esp-link.jpg)

Hier einige Beispiele:

ESP-LINK: <https://github.com/jeelabs/esp-link>

ESP-Serielle Brücke: [https://github.com/yuri-rage/ESP-Serielle](https://github.com/yuri-rage/ESP-Serial-Bridge) Brücke

Serielle Schnittstelle über WLAN: <https://www.instructables.com/Serial-Port-Over-WiFi/>

Tasmota verursachte Probleme, da die Blöcke nicht in der richtigen Reihenfolge übertragen wurden und sollte daher momentan nicht verwendet werden: <https://tasmota.github.io/docs/Serial-to-TCP-Bridge/>

Nur die folgenden oder selbst kompilierte Versionen können als Binärdateien verwendet werden, andernfalls ist der TCP-Server nicht enthalten:

- <http://ota.tasmota.com/tasmota32/release/tasmota32-zbbrdgpro.bin>
- <http://ota.tasmota.com/tasmota/release/tasmota-zbbrdgpro.bin>

Die GIP-Anschlüsse müssen vorher konfiguriert werden. Je einer für TCP Rx und TCP Tx.

```
TCPBaudRate 115200
TCPStart 23
Rule1 ON System#Boot do TCPStart 23 endon
Rule1 1
```

Es funktioniert, weil ein transparenter TCP-Server beispielsweise auf Port 23 bereitgestellt wird. Der Port kann frei gewählt werden; ersetzen Sie einfach 23 durch 9000. **Und natürlich muss ein MAX2323 zwischen die GIPO-Anschlüsse und den RJ/DSUB-Stecker gelötet werden!**

#### Linux zu Net

Mit ser2net können Sie den Port eines PCs oder Mini-Raspi über das Netzwerk freigeben.

```
sudo apt-get ser2net            #install
sudo vim /etc/ser2net.conf      #configure
ser2net                         #run service
```

Die Konfigurationszeile (für /etc/ser2net.conf), die der obigen Windows-Einrichtung entspricht

```
7000:telnet:0:/dev/ttyUSB0:115200 8DATABITS NONE 1STOPBIT remctl
```

RFC Hier sind die Einstellungen der obigen Konfiguration. Der Geräteport ist 7000.

- 7000 - Port
- /dev/ttyUSB0 - Name des seriellen Ports
- 115200 ... - Baudrate usw. (eigentlich können Sie diesen Schritt aufgrund von remctl überspringen)
- remctl bedeutet die Verwendung der Remote-Port-Konfiguration gemäß RFC 2217.

Weitere Informationen finden Sie hier: <https://gist.github.com/DraTeots/e0c669608466470baa6c>

#### Fertige Hardware

Es gibt fertige Hardware, die über WLAN und/oder LAN verbunden werden kann. Solange ein transparenter TCP-Server verwendet wird, sollte es funktionieren.

Beispiel:

- Waveshare RS232/485 zu ETH (für die EU)

## Sie können mich aber auch gerne im ioBroker-Forum per PM kontaktieren, falls Sie etwas benötigen.

Noch ein Tipp: Es gibt günstige und teure USB-Seriell-Konverter. Konverter mit Bezeichnungen wie CHxxx, PLxxx oder CPxxx haben keine eindeutigen Identifizierungsmerkmale. Schließt man zwei davon an und tauscht dann die Ports oder startet den Computer neu, weiß man nicht mehr, welches Gerät welches ist. Daher empfiehlt es sich, ein hochwertiges Modell mit FTDI-Chip und Seriennummer zu wählen. Es gibt auch gute Seriell-Konverter ohne FTDI-Chip, die ebenfalls eine Seriennummer besitzen.

### Getestete Hardware

Ich stehe noch ganz am Anfang. Folgendes wurde getestet:

#### RS232 zu ioBroker

| Kommunikationshardware                  | Typ      | Funktioniert | Kommentare                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seriell zu USB                          | lokal    | Ja           | Für die Adapter steht eine große Auswahl an Chips zur Verfügung. Je nach Modell können Identifizierungsprobleme auftreten, wenn die Adapter keine Seriennummer besitzen und mehrere angeschlossen sind. Windows weist jedem USB-Stecker bereits einen COM-Port zu.                                                                                |
| LogiLink AU0034                         | lokal    | Ja           |                                                                                                                                                                                                                                                                                                                                                   |
| ESP-LINK                                | Netzwerk | Ja           | Weisen Sie dem Gerät eine IP-Adresse im Netzwerk zu. Überprüfen Sie die Übertragungsgeschwindigkeit (115200, 8 N, 1). Alle anderen Einstellungen bleiben unverändert. Denken Sie daran, einen Konverter wie den MAX zu verwenden.                                                                                                                 |
| Tasmota                                 | Netzwerk | NEIN         | Bei der Verwendung von Tasmota auf einem ESP8266 wurden Blöcke nicht in der korrekten Reihenfolge übertragen, was zu fehlerhaften Objekten und Daten führte. Tasmota wird daher nicht empfohlen.                                                                                                                                                  |
| Waveshare RS232/485 zu ETH (für die EU) | Netzwerk | Ja           | Weisen Sie dem Gerät eine IP-Adresse im Netzwerk zu. Überprüfen Sie die Übertragungsgeschwindigkeit (115200 8 N 1). Alle anderen Einstellungen bleiben unverändert. Verwenden Sie den RS232-SUBD-Port.                                                                                                                                            |
| Waveshare RS232/485/422 zu PoE ETH      | Netzwerk | Ja           | Weisen Sie dem Gerät eine IP-Adresse im Netzwerk zu. Überprüfen Sie die Übertragungsgeschwindigkeit (115200 8 N 1). Alle anderen Einstellungen bleiben unverändert. Verwenden Sie den RS232-SUBD-Anschluss. Der Konverter kann über PoE mit Strom versorgt werden. Wenn PoE verfügbar ist, benötigen Sie kein Netzteil in der Nähe der Batterien. |
| Elfin EW10A                             | Netzwerk | Ja           | Stellen Sie sicher, dass Ihre WLAN-Verbindung über ausreichend Bandbreite und Signalstärke verfügt, um eine stabile Verbindung zu gewährleisten. Überprüfen Sie die Übertragungsgeschwindigkeit (115200 8 N 1).                                                                                                                                   |
| Elfin EW10A-0                           | Netzwerk | Ja           | Stellen Sie sicher, dass Ihre WLAN-Verbindung über ausreichend Bandbreite und Signalstärke verfügt, um eine stabile Verbindung zu gewährleisten. Überprüfen Sie die Übertragungsgeschwindigkeit (115200 8 N 1).                                                                                                                                   |
| Elfin EE10-A                            | Netzwerk | Ja           | Weisen Sie dem Gerät eine IP-Adresse im Netzwerk zu. Überprüfen Sie die Übertragungsgeschwindigkeit (115200 8 N 1). Alle anderen Einstellungen bleiben unverändert.                                                                                                                                                                               |

#### Batterien

| Pylontech-Modell | Modell | Firmware        | Funktioniert | Kommentar                                                                                                                                                                                 |
| ---------------- | ------ | --------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US5000           | UNS    | V1.3 22.08.2010 | Bußgeld      |                                                                                                                                                                                           |
| US2000C          | UNS    | V2.6 21.09.2026 | Bußgeld      |                                                                                                                                                                                           |
| US2000C          | UNS    | V2.1            | Bußgeld      |                                                                                                                                                                                           |
| US2000C          | UNS    | V2.8            | Bußgeld      |                                                                                                                                                                                           |
| US2000 (US2KBPL) | UNS    | V2.8 21.04.29   | Bußgeld      | Temperaturen nur in Ein-Grad-Schritten                                                                                                                                                    |
| Force H2         | Gewalt | V1.5 21.06.2018 | Bußgeld      | Achtung: In einigen Force-Handbüchern sind in der Steckerbeschreibung nur die RX- und TX-Anschlüsse aufgeführt. Die Masse befindet sich an Pin 8 und muss ebenfalls angeschlossen werden. |

| Pytes-Modell   | Modell | Firmware         | Funktioniert | Kommentar                                                                                                                                                                                         |
| -------------- | ------ | ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-BOX-4850P    | UNS    | V1.3 22.12.2020  | Bußgeld      | Vielen Dank an kletternaut für die Testdaten.                                                                                                                                                     |
| E-BOX-48100V-D | UNS    | V1.10 23.10.2013 | Bußgeld      | Adapterversion >= 0.0.9. Die Optionen „Batteriezellenzustand herunterladen“ und „Batteriestatistikdaten herunterladen“ sollten deaktiviert sein. (soh -n- und stst -n- werden nicht unterstützt.) |

Falls Sie Hardware verwenden, schreiben Sie mir bitte im Forum oder erstellen Sie ein Issue auf GitHub. Wir führen diese Liste gerne weiter.

ioBroker-Forum: <https://forum.iobroker.net/topic/68707>

### Verbindung

Nur der erste Accu im Array liefert alle Informationen. Wenn Sie diesen Adapter an einen der folgenden Accus anschließen, funktioniert er nicht mehr, da dieser Accu nicht alle Anfragen beantworten kann.

Bitte beachten Sie: **Die RS485- und CAN-Bus-Schnittstellen sind nicht für diesen Adapter geeignet. Sie verwenden unterschiedliche Schnittstellen.**

![Batteriestapel](../../../en/adapterref/iobroker.pylontech/media/battery_stack.JPG)

Im Force-Gebäude befindet sich auch ein Terminal.

![Gewalt](../../../en/adapterref/iobroker.pylontech/media/H2.JPG)

## Administratorschnittstelle

Die Einstellungen in der IoBroker-Admin-Oberfläche:

### Verbindung

#### Verbindung über

Sie können zwischen einem lokalen Gerät, d. h. einer Schnittstelle, die lokal mit dem Computer verbunden ist, z. B. einem USB-Konverter, oder einem TCP/IP-Netzwerkserver als Schnittstelle wählen.

Optionen:

- Lokales Gerät
- Netzwerkgerät

### Lokales Gerät

Die folgenden Felder werden nur angezeigt, wenn unter Verbindung über die Option Lokales Gerät ausgewählt wurde.

#### Lokaler Gerätepfad

Wurde „Lokales Gerät“ ausgewählt, muss der Pfad oder Port angegeben werden. Node.js arbeitet mit Linux-Systemen, daher wird auch dann eine Fehlermeldung ausgegeben, wenn das angegebene Windows-Gerät nicht gefunden wird. Der Adapter sucht nach Standardgeräten und bietet diese in einer Auswahlliste an. Dies funktioniert jedoch nur, wenn der Adapter ausgeführt wird, da hierfür eine Kommunikation mit der Instanz erforderlich ist. Es werden ausschließlich Geräte angeboten, keine alternativen Geräte-IDs oder Unicode-Namen. Diese können jedoch manuell eingegeben werden. Weitere Informationen finden Sie im Abschnitt „Lokale Schnittstellen“.

#### Getriebegeschwindigkeit

Die Übertragungsgeschwindigkeit kann hier eingestellt werden. Bei neueren Modellen ist sie auf 115200 eingestellt, bei älteren Modellen auf 1200. Falls keine Verbindung hergestellt werden kann, prüfen Sie, ob der Adapter mit 1200 arbeitet. Ist dies der Fall, kann die Geschwindigkeit mit dem Befehl „pylontech. -n- . config.set\_speed“ auf 115200 gesetzt werden. Anschließend muss die Adaptergeschwindigkeit wieder auf 115200 zurückgesetzt werden.

### Netzwerkgerät

Die folgenden Felder werden nur angezeigt, wenn unter „Verbindung über“ ein Netzwerkgerät ausgewählt wurde. Es können noch keine verschlüsselten Netzwerkverbindungen hergestellt werden.

#### Netzwerk-Host

Geben Sie hier den Namen des COM-Servers ein. Der Name darf kein „http“ oder Ähnliches enthalten. Sie können IP-Adressen oder Namen wie ESP-LINK.FRITZ.BOX eingeben. Beachten Sie bei DHCP-Geräten, dass sich die IP-Adresse ändern kann.

#### Netzwerkanschluss

Um eine Kommunikation herzustellen, muss der Port angegeben werden, über den der Server die Kommunikation bereitstellt. Für ESP-Link ist dies beispielsweise Port 23.

#### Getriebegeschwindigkeit

Die Geschwindigkeit muss am Netzwerkgerät eingestellt werden.

### Zykluszeit in Minuten

Die Zykluszeit kann hier eingestellt werden. Ich persönlich halte 5 Minuten für ausreichend, um festzustellen, ob die Batterien einwandfrei funktionieren. Bitte beachten Sie, dass die Batterien primär mit dem Wechselrichter und nicht mit dem Debugger kommunizieren sollten.

### Modell

Hier können Sie das Modell auswählen. Aktuell stehen Ihnen die Modelle US und Force zur Verfügung. Sie können nichts zerstören. Testen Sie daher gerne, mit welcher Einstellung Ihr Pylontech-Gerät läuft. Einige Modelle sind auch oben in der Kompatibilitätsliste aufgeführt. Sollte es nicht funktionieren, kontaktieren Sie mich bitte über das ioBroker-Forum. Wir finden dann heraus, warum die Daten nicht gelesen werden können.

ioBroker-Forum: <https://forum.iobroker.net/topic/68707>

### Ermitteln Sie, welche Daten für das Modell US gelesen werden.

Falls Fehler auftreten, weil der Adapter Daten anfordert, die die Batterien nicht liefern, kann die Anfrage hier abgebrochen werden. Der Adapter wurde im Rahmen einer Überarbeitung neu entwickelt, daher sind möglicherweise noch Verbesserungen nötig. Falls die Datenmenge zu groß ist, können Sie sie hier reduzieren.

#### Laden Sie die Batteriezellendaten herunter.

Der Befehl „bat -n-“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie den Zustand der Batteriezellen herunter.

Der Befehl „soh -n-“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Batterieinformationsdaten herunter.

Der Befehl „info -n-“ wird immer in der Konsole ausgegeben. Hier finden Sie Informationen zu den Seriennummern der einzelnen Batterien. Diese Informationen werden für die Objektstruktur benötigt. Wenn diese Option deaktiviert ist, werden die Informationen nicht an den ioBroker übertragen.

#### Laden Sie die Protokolldaten herunter

Der Befehl „log“ wird nur dann in der Konsole ausgegeben, wenn diese Option hier aktiviert ist.

#### Laden Sie die Akkuleistungsdaten herunter.

Der Befehl „pwr“ wird immer in der Konsole ausgegeben. Der Befehl „pwr -n-“ wird nur dann in der Konsole ausgegeben, wenn diese Option hier aktiviert ist. Hier finden Sie Informationen über die Positionen der einzelnen Batterien. Diese werden für die Objektstruktur benötigt. Wenn diese Option deaktiviert ist, werden die Informationen des Befehls „pwr“ nicht an den ioBroker übertragen und der Befehl „pwr -n-“ wird nicht ausgeführt.

#### Laden Sie die Batteriestatistikdaten herunter

Der Befehl „stat -n-“ wird nur dann in der Konsole ausgegeben, wenn diese Option hier eingestellt ist.

#### Zeitinformationen herunterladen

Der Befehl „time“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

### Ermitteln Sie, welche Daten für das Modell Force ausgelesen werden.

Falls Fehler auftreten, weil der Adapter Daten anfordert, die die Batterien nicht liefern, kann die Anfrage hier abgebrochen werden. Der Adapter wurde im Rahmen einer Überarbeitung neu entwickelt, daher sind möglicherweise noch Verbesserungen nötig. Falls die Datenmenge zu groß ist, können Sie sie hier reduzieren.

#### Laden Sie die Batteriezellendaten herunter.

Der Befehl „bat“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie den Zustand der Batteriezellen herunter.

Der Befehl „soh“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Batterieinformationsdaten herunter.

Der Befehl „info“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Protokolldaten herunter

Der Befehl „log“ wird nur dann in der Konsole ausgegeben, wenn diese Option hier aktiviert ist.

#### Laden Sie die Akkuleistungsdaten herunter.

Der Befehl „pwr“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Batteriestatistikdaten herunter

Der Befehl „stat“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Batteriesystem-Informationsdaten herunter.

Der Befehl „sysinfo“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

#### Laden Sie die Gerätedaten herunter.

Die Befehlseinheit wird nur dann in die Konsole geschrieben, wenn diese Einstellung hier vorgenommen wurde.

#### Zeitinformationen herunterladen

Der Befehl „time“ wird nur dann in der Konsole ausgegeben, wenn diese Einstellung hier vorgenommen wurde.

## Werte und Operationen für das Modell US

Fast alle Messwerte werden hier in Milli (ein Tausendstel) gespeichert.

- Milligrad Celsius
- Milliampere
- Milliamperestunden

Die meisten Werte müssen durch Tausender geteilt werden, um sie anzuzeigen.

### Kanal -SN-.Battery-nn-

Die Informationen zu den folgenden Befehlen sind hier gespeichert.

- Befehl „soh -n-“
- Befehl „bat -n-“

### Kanal -SN-.info

Die Informationen des folgenden Befehls sind hier gespeichert.

- Befehl „info -n-“

### Kanal -SN-.power

Die Informationen zu den folgenden Befehlen sind hier gespeichert.

- Befehl „pwr“
- Befehl „pwr -n-“

### Kanal -SN-.Statistik

Die Informationen des folgenden Befehls sind hier gespeichert.

- Befehl „stat -n-“

## Werte und Operationen für das Modell Force

todo

### Kanalkonfiguration

#### Zustand set\_speed

Sie können den Status „set\_speed“ ohne Bestätigung auf „true“ setzen. Bei älteren Modellen wird ein Befehl an den Akku gesendet, der die Geschwindigkeit korrigiert. Bei neueren Modellen wird eine Fehlermeldung zurückgegeben. Der Wert „ack“ wird auf „true“ gesetzt, sobald der Befehl gesendet wurde.

### Kanalinformationen USA

#### Zustandsverbindung

Trifft zu, wenn der Adapter eine Kommunikation herstellen konnte.

#### Status -n-.verbunden

Wird auf „true“ gesetzt, wenn die Batterie gefunden wurde.

#### Status -n-.Barcode

Enthält den Barcode (Seriennummer), um nachzuverfolgen, welche Batterie an welcher Stelle im Stapel installiert ist.

### Kanalprotokoll

Der Log-Kanal enthält 31 Kanäle mit den letzten 31 Log-Informationen. Der Neuset-Wert liegt immer bei 31 und wird bei neuen Nachrichten nach unten verschoben.

### Kanalzeit

#### Status DS3231, RTC oder Zeit

Die vom Wechselrichter abgelesene Zeit wird hier gespeichert. Beim US3000 heißt diese Einheit RTC, beim älteren VS2000 DS3231. Wenn Sie die Zeit hier eintragen, wird sie an die Batterie übertragen und die Batteriezeit entsprechend angepasst.

#### Zustandseinstellung

Wird „true“ ohne Bestätigung (ack) in die Variable „set“ geschrieben, wird die aktuelle Zeit an Pylontech gesendet. Nach Ausführung des Befehls wird der Status auf „ack = true“ gesetzt.

### Kanalinformationen Force

#### Zustandsverbindung

Trifft zu, wenn der Adapter eine Kommunikation herstellen konnte.

### Kanalprotokoll

Der Log-Kanal enthält 31 Kanäle mit den letzten 31 Log-Informationen. Der Neuset-Wert liegt immer bei 31 und wird bei neuen Nachrichten nach unten verschoben.

### Kanalzeit

#### Status DS3231, RTC oder Zeit

Die vom Wechselrichter abgelesene Zeit wird hier gespeichert. Beim US3000 heißt diese Einheit RTC, beim älteren VS2000 DS3231. Wenn Sie die Zeit hier eintragen, wird sie an die Batterie übertragen und die Batteriezeit entsprechend angepasst.

#### Zustandseinstellung

Wird „true“ ohne Bestätigung (ack) in die Variable „set“ geschrieben, wird die aktuelle Zeit an Pylontech gesendet. Nach Ausführung des Befehls wird der Status auf „ack = true“ gesetzt.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.10 (2024-03-01)

- (PLCHome) Hex numbers are also recognized as such if text follows them.

### 0.0.9 (2024-02-29)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) Improved "bat n" for E-BOX-48100V-D on 100%.
- (PLCHome) Waiting time between commands of 20ms.
- (PLCHome) If the timeout occurs, send the last command again.
- (PLCHome) No further commands after a timeout.

### 0.0.8 (16.02.2024)

- (PLCHome) improved "bat n" for E-BOX-48100V-D

### 0.0.7 (01.11.2023)

- (PLCHome) issue "Cannot read properties of undefined (reading 'trim') at Parser" fixed, so E-BOX-4850P works now.

### 0.0.6 (09.10.2023)

- (PLCHome) The sent command was recognized from the response. Now the command is passed to the parser.

### 0.0.5 (05.10.2023)

- (PLCHome) Implemenmt the force H2. Thanx to radi for suppoting this project!

### 0.0.4 (04.10.2023)

- (PLCHome) Removed RFC2217.
- (PLCHome) Changed interval to this.interval.
- (PLCHome) Change the connection procedure to catch the exception.

### 0.0.3

- (PLCHome) initial release

## License

MIT License

Copyright (c) 2024 PLCHome

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
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