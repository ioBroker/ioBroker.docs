---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pylontech/README.md
title: ioBroker.pylontech
hash: Tr0p2E//0Nakw+VgLJt20DY6J87OlwBeeHTrwx6j7Q4=
---
![Logo](../../../en/adapterref/iobroker.pylontech/media/logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pylontech.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pylontech.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pylontech-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pylontech-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pylontech.png?downloads=true)

![Logo](../../../en/adapterref/iobroker.pylontech/media/pytes.jpg)

# IoBroker.pylontech
**Tests:** ![Test und Freigabe](https://github.com/PLCHome/ioBroker.pylontech/workflows/Test%20and%20Release/badge.svg)

## Pylontech- und Pytes-Adapter für ioBroker
Fragen Sie über die Konsole die Zellspannungen und den Status von Pylontech- oder Pytes-Akkus ab. Ich bin nicht angeschlossen.

**Bitte beachten Sie, dass alles, was Sie bauen oder anschließen, immer in Ihrer Verantwortung liegt. Der Entwickler dieses Adapters übernimmt keine Haftung für etwaige Schäden!**

## Wie es funktioniert
Dieser Adapter wird verwendet, um den Gesundheitszustand und die Funktionen eines Pylontech- oder Pytes-Arrays zu ermitteln, das aus einer oder bis zu fünfzehn Batterien bestehen kann.
Dieser Adapter dient nicht zur Steuerung des Akkus. Dies ist der Teil einer Lade- und Stromversorgungseinheit oder eines Wechselrichters.
Die Akkus verfügen über einen Konsolenanschluss, der eine RS232- oder V24-Schnittstelle bereitstellt. Dieser Adapter wird über eine serielle Schnittstelle daran angeschlossen.
Die erste Batterie stellt alle Daten bereit und fragt die anderen über den Uplink an.
Achtung, der direkte Anschluss eines Raspberry oder ESP ist nicht möglich. Die RS232-Schnittstellen verfügen über keinen TTL-Pegel und sind nicht für 3 Volt oder 5 Volt ausgelegt. Für den Anschluss ist ein Pegelwandler erforderlich. Nachfolgend finden Sie eine Bauanleitung.

## Was wird für die Verbindung benötigt?
Für den Anschluss sind ein Kabel und ein serieller Konverter erforderlich.
Eine serielle Verbindung erfordert drei Leitungen RxD, TXD und Masse.

Rxd und Txd müssen gekreuzt werden. so dass das, was der eine sendet (Txd), vom anderen empfangen werden kann (Rxd). Damit eine Spannung aufgebaut und ein elektrischer Strom gestartet werden kann, wird Erde benötigt.

### Das serielle Verbindungskabel für Pylontech
Pylontech hat im Laufe der Zeit die RJ-Stecker an den Batterien ausgetauscht.
Am Anfang gab es einen RJ11-Stecker wie beim Telefon. Jetzt handelt es sich um einen RJ45-ähnlichen Netzwerkanschluss.
Die folgenden Zeichnungen zeigen eine standardmäßige neunpolige D-SUB-Buchse am Kabel.
Dieses Kabel kann einfach über den USB-Anschluss mit einem RS232-zu-USB-Adapter oder an einen RS232-zu-LAN- oder WIFI-Konverter angeschlossen werden.
Nur die erste Batterie im Array liefert alle Informationen. Sie benötigen lediglich ein Kabel und einen seriellen Anschluss

Mit einem [konfigurierbarer Stecker](https://www.amazon.de/gp/product/B0C8JFWNR7) können Sie ein solches Kabel selbst konfektionieren. Dieses ist mit einem RJ45-Stecker und einem weiblichen D-SUB9-Stecker erhältlich. Sie schließen einfach ein Patchkabel daran an. **Achten Sie aber darauf, die restlichen Kabel gut zu isolieren, damit sie sich nicht berühren. Nicht bei allen Akkus sind die restlichen Pins ungenutzt.** Grundsätzlich können Sie an einen solchen Adapter auch ein RJ11-Kabel anschließen. Aber ich finde es sehr wackelig und denke immer, dass es keinen guten Kontakt hat.

![Stecker](../../../en/adapterref/iobroker.pylontech/media/configurablePlug.jpg)

Oder fertig konfektionierte Kabelkontakt in den [Forum](https://forum.iobroker.net/topic/68707).

![Kabel](../../../en/adapterref/iobroker.pylontech/media/Kabel.jpg)

#### RJ45
| RJ45 | Signal | DSUB | Signal |
| ---- | ------ | ---- | ------ |
| 3 | TxD | 2 | RxD |
| 6 | RxD | 3 | TxD |
| 8 | Boden | 5 | Boden |

![RJ45](../../../en/adapterref/iobroker.pylontech/media/8p.jpg)

#### RJ11 / RJ12
Die RJ11- und RJ12-Stecker sind gleich groß. Der RJ11 hat nur vier Kontakte, der RJ12 hat sechs Kontakte. Die Kontakte des RJ11 liegen in der Mitte des Steckers, weshalb sie unterschiedlich gezählt werden. Physisch befinden sich die Kontakte am selben Ort.

| RJ11 | RJ12 | Signal | DSUB | Signal |
| ------ | ------ | ------ | ---- | ------ |
| 1 oder 4 | 2 oder 5 | Boden | 5 | Boden |
| 3 | 4 | TxD | 2 | RxD |
| 2 | 3 | RxD | 3 | TxD |

![RJ11 / RJ12](../../../en/adapterref/iobroker.pylontech/media/4p.jpg)

### Das serielle Verbindungskabel für Pytes
#### RJ45
| RJ45 | Signal | DSUB | Signal |
| ---- | ------ | ---- | ------ |
| 3 | TxD | 2 | RxD |
| 4 | Boden | 5 | Boden |
| 6 | RxD | 3 | TxD |

### Für Cisco-Router gibt es RJ45-Konsolenkabel mit USB-Anschluss. Für diese gibt es keine passende Belegung. Mit etwas Erfahrung lässt sich der RJ45-Stecker jedoch austauschen.
### Bitte beachten Sie, dass aufgrund der relativ hohen Übertragungsrate bei RS232-Verbindungen von 115200 Baud das Kabel nicht besonders lang sein kann.
| max. Baud | max. Länge |
| ----------- | ----------- |
| 2400 | 900m |
| 4800 | 300m |
| 9600 | 152m |
| 19.200 | 15m |
| 57.600 | 5m |
| **115.200** | **2m** |

Wenn kein USB-Anschluss in der Nähe ist, können Sie mit einem ESP einen Seriell-WLAN-Adapter bauen.

Diese Adapter sprechen eine Art Telnet und erweitern im Wesentlichen die serielle Schnittstelle durch das WLAN. Hier ist es wichtig, ein Treibermodul für die serielle Schnittstelle zu installieren. Z.B. der MAX3232. Bitte achten Sie auf die Spannungen, die meisten betragen jedoch 3V.

#### Raspi mit MAX
Da der Raspberry auch eine TTL-Schnittstelle mit 3V bietet, kann man hier auch einen MAX3232 anschließen.

![Raspi mit MAX](../../../en/adapterref/iobroker.pylontech/media/rpicom.jpg)

Weitere Informationen finden Sie unter http://www.savagehomeautomation.com/projects/raspberry-pi-rs232-serial-interface-options-revisit.html

#### Finden Sie den Port unter Linux (Debian / Raspi)
Unter Linux ist es möglich, eine Verknüpfung zu dem Port zu setzen, an dem der USB-Seriell-Konverter angeschlossen ist.
Den Geräten können dann aussagekräftige Namen zugewiesen werden.

```
$ ls -l /dev
crw-rw---- 1 root dialout 188,     0 29. Sep 21:32 ttyUSB0
lrwxrwxrwx 1 root root             7 29. Sep 21:32 ttyUSB_pylontech -> ttyUSB0
```

Hierfür kann die Seriennummer ermittelt werden, sofern der USB-Konverter über diese verfügt.

```
$ udevadm info -a /dev/ttyUSB0 | grep ATTRS{serial}
      ATTRS{serial}=="thisisit"
```

Wenn hier keine Seriennummer steht, haben Sie verloren. Bitte achten Sie darauf, das Gerät ttyUSBx anzupassen.

Erstellen Sie eine neue Konfigurationsdatei. Benutzen Sie den Editor Ihrer Wahl, auch VI ist möglich.

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

Dann sollten Sie das udev neu starten und das Gerät einmal trennen und wieder anschließen.

```
sudo /etc/init.d/udev restart
```

#### Finden Sie den Port unter Linux mit der zweiten Methode
Sie können für jedes Gerät einen eindeutigen Namen finden. Mit FTDI oder so etwas ändert sich nichts. Dies kann auch im Adapter eingetragen werden.

```
$ ls -l /dev/serial/by-id
lrwxrwxrwx 1 root root 13 10. Okt 11:37 usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0 -> ../../ttyUSB0
```

also ist das Gerät `/dev/serial/by-id/usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0`

### Com über TCP
Anstelle einer lokalen Verbindung:

```
+--------+   comport  +----------+
| DEVICE | ~~~~~~~~~~ | ioBroker |
+--------+            +----------+
```

Unterstützt dieser Adapter auch Netzwerkverbindungen:

```
+--------+   comport  +--------+       network        +----------+
| DEVICE | ~~~~~~~~~~ | SERVER |========....==========| ioBroker |
+--------+            +--------+                      +----------+
```

#### ESP mit MAX
Es gibt mehrere Projekte, die ESP oder ESP32 mit Telnet verbinden. Bitte denken Sie an den MAX. Wenn der MAX heiß wird, ist entweder der Signalpegel von 5V zu hoch, weil Sie ein 3,3V-Modell haben oder Sie haben eine 3,3V-Version an 5V-Betriebsspannung angeschlossen.

![ESP-LINK](../../../en/adapterref/iobroker.pylontech/media/esp-link.jpg)

Hier sind einige Beispiele:

ESP-LINK: https://github.com/jeelabs/esp-link

ESP-Serial-Bridge: https://github.com/yuri-rage/ESP-Serial-Bridge

Serieller Port über WLAN: https://www.instructables.com/Serial-Port-Over-WiFi/

Tasmota hat Probleme verursacht, da Blöcke nicht in der richtigen Reihenfolge übertragen wurden und daher derzeit nicht verwendet werden sollten: https://tasmota.github.io/docs/Serial-to-TCP-Bridge/

Als Bin können nur folgende oder selbst kompilierte verwendet werden, ansonsten wird der TCP-Server nicht einbezogen:

- http://ota.tasmota.com/tasmota32/release/tasmota32-zbbrdgpro.bin
- http://ota.tasmota.com/tasmota/release/tasmota-zbbrdgpro.bin

Die Gipos müssen vorher eingestellt werden. Jeweils eine auf TCP Rx und TCP Tx.

```
TCPBaudRate 115200
TCPStart 23
Rule1 ON System#Boot do TCPStart 23 endon
Rule1 1
```

Dies funktioniert, da auf beispielsweise Port 23 ein transparenter TCP-Server bereitgestellt wird. Der Port kann ausgewählt werden, einfach 23 gegen beispielsweise 9000 austauschen.
**Und natürlich einen MAX2323 zwischen die Gipos und den RJ/DSUB-Stecker löten!!!!**

#### Linux zu Net
Mit ser2net können Sie den Port eines PCs oder Mini-Raspis über das Netzwerk freigeben.

```
sudo apt-get ser2net            #install
sudo vim /etc/ser2net.conf      #configure
ser2net                         #run service
```

Die Konfigurationszeile (für /etc/ser2net.conf), die dem oben genannten Windows-Setup entspricht

```
7000:telnet:0:/dev/ttyUSB0:115200 8DATABITS NONE 1STOPBIT remctl
```

RFC Hier sind die Einstellungen der obigen Konfiguration. Der Geräteport ist 7000.

- 7000 - Port
- /dev/ttyUSB0 – Name des seriellen Ports
- 115200 ... - Baudrate usw. (eigentlich kann man es wegen remctl überspringen)
- remctl – bedeutet die Verwendung der Remote-Port-Konfiguration gemäß RFC2217

Weitere Informationen finden Sie hier: https://gist.github.com/DraTeots/e0c669608466470baa6c

#### Bereite Hardware
Es gibt fertige Hardware, die über WLAN und/oder LAN verbunden werden kann. Solange es einen transparenten TCP-Server verwendet, sollte es funktionieren.

Beispiel:

- Waveshare RS232/485 TO ETH (für EU)

## Wie auch immer, Sie können mich auch im ioBroker-Forum per PN kontaktieren, wenn Sie etwas benötigen.
Noch ein Tipp: Es gibt günstige und teure USB-Seriell-Konverter. Konverter mit CHxxx PLxxx und CPxxx im Namen haben keine Erkennungsmerkmale. Wenn man zwei davon verbindet und dann die Ports vertauscht oder zum ersten Mal bootet, weiß man nicht mehr, wer wer ist. Daher ist es besser, die guten mit FTDI und Seriennummer zu nehmen. Es gibt auch gute serielle Konverter ohne FTDI-Chip, die eine Seriennummer haben.

### Getestete Hardware
Ich stehe noch am Anfang.
Was wurde getestet:

#### RS232 zu ioBroker
| Kommunikationshardware | Geben Sie | ein Funktioniert | Kommentare |
| ----------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seriell zu USB | lokal | ja | Für die Adapter gibt es eine große Auswahl an Chips. Je nach Modell kann es zu Identifikationsproblemen kommen, wenn die Adapter keine Seriennummer haben und mehr als einer angeschlossen ist. Windows weist jedem USB-Stecker bereits einen COM-Port zu. |
| LogiLink AU0034 | lokal | ja | |
| ESP-LINK | Netzwerk | ja | Weisen Sie dem Gerät eine IP im Netzwerk zu. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. Alles andere bleibt unverändert. Denken Sie daran, einen Konverter wie den MAX | zu verwenden |
| Tasmota | Netzwerk | nein | Bei Tasmota auf einem ESP8266 wurden Blöcke nicht in der richtigen Reihenfolge übertragen, was zu falschen Objekten und Daten führte. Tasmota ist daher nicht zu empfehlen. |
| Waveshare RS232/485 TO ETH (für EU) | Netzwerk | ja | Weisen Sie dem Gerät eine IP im Netzwerk zu. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. Alles andere bleibt unverändert. Verwenden Sie den RS232-SUBD-Anschluss. |
| Waveshare RS232/485/422 TO POE ETH | Netzwerk | ja | Weisen Sie dem Gerät eine IP im Netzwerk zu. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. Alles andere bleibt unverändert. Verwenden Sie den RS232-SUBD-Anschluss. Der Konverter kann über POE mit Strom versorgt werden. Wenn POE verfügbar ist, benötigen Sie keine Stromversorgung in der Nähe der Batterien. |
| Elfin EW10A | Netzwerk | ja | Stellen Sie sicher, dass in Ihrem WLAN genügend Bandbreite und Signalstärke vorhanden ist, damit die Verbindung stabil ist. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. |
| Elfin EW10A-0 | Netzwerk | ja | Stellen Sie sicher, dass in Ihrem WLAN genügend Bandbreite und Signalstärke vorhanden ist, damit die Verbindung stabil ist. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. |
| Elfin EE10-A | Netzwerk | ja | Weisen Sie dem Gerät eine IP im Netzwerk zu. Übertragungsgeschwindigkeit prüfen 115200 8 N 1. Alles andere bleibt unverändert. |

#### Batterien
| Pylontech-Modell | Modell | Firmware | Funktioniert | Kommentar |
| ---------------- | ----- | ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US5000 | USA | V1.3 22.08.10 | gut | |
| US2000C | USA | V2.6 21.09.26 | gut | |
| US2000C | USA | V2.1 | gut | |
| US2000C | USA | V2.8 | gut | |
| US2000 (US2KBPL) | USA | V2.8 21.04.29 | gut | Temperaturen nur in Ein-Grad-Schritten |
| Kraft H2 | Kraft | V1.5 21.06.18 | gut | Achtung: In einigen Force-Handbüchern sind in der Steckerbeschreibung nur die RX- und TX-Anschlüsse aufgeführt. Die Masse liegt auf PIN 8 und muss ebenfalls angeschlossen werden. |

| Pytes-Modell | Modell | Firmware | Funktioniert | Kommentar |
| ----------- | ----- | ------------- | ---------- | -------------------------------------- |
| E-BOX-4850P | USA | V1.3 22.12.20 | gut | Vielen Dank an kletternaut für die Testdaten |

Wenn Sie Hardware verwenden, schreiben Sie mir bitte im Forum oder in Github als Problem. Gerne führen wir diese Liste weiter.

ioBroker-Forum: https://forum.iobroker.net/topic/68707

### Verbindung
Nur der erste Akku im Array liefert alle Informationen. Wenn Sie diesen Adapter an einen der folgenden Akkus anschließen, funktioniert er nicht mehr, da dieser Akku nicht alle Anfragen beantworten kann.

Bitte beachten Sie: **Die RS485- und Canbus-Schnittstellen sind nicht für diesen Adapter geeignet. Sie sprechen eine andere Sprache.**

![Batteriestapel](../../../en/adapterref/iobroker.pylontech/media/battery_stack.JPG)

Bei der Force gibt es auch ein Terminal.

![Gewalt](../../../en/adapterref/iobroker.pylontech/media/H2.JPG)

## Admin-Oberfläche
Die Einstellungen in der ioBroker-Administratoroberfläche:

### Verbindung
#### Verbindung über
Sie können zwischen einem lokalen Gerät, also einer lokal am Computer angeschlossenen Schnittstelle, z.B. ein USB-Konverter oder ein TCP-IP-Netzwerkserver als Schnittstelle.

Optionen:

- Lokales Gerät
- Netzwerkgerät

### Lokales Gerät
Die folgenden Felder werden nur angezeigt, wenn bei Verbindung über Lokales Gerät ausgewählt wurde.

#### Lokaler Gerätepfad
Wurde „lokales Gerät“ ausgewählt, muss der Pfad bzw. Port eingestellt werden. NodeJs denkt in Linux, daher wird „Pfad nicht gefunden“ auch dann gemeldet, wenn das angegebene Windows-Gerät nicht gefunden wird. Die Standardgeräte werden vom Adapter gesucht und als Auswahlliste angeboten, dies funktioniert jedoch nur, wenn der Adapter läuft, da hierfür eine Kommunikation mit der Instanz erforderlich ist. Es werden nur Geräte angeboten, keine alternativen Gerätekennungen und keine Unicnames, diese können aber manuell eingegeben werden.
Siehe den Abschnitt über lokale Schnittstellen.

#### Übertragungsgeschwindigkeit
Hier kann die Übertragungsgeschwindigkeit eingestellt werden. Bei neueren Modellen ist dieser auf 115200 eingestellt. Bei älteren Modellen liegt sie bei 1200. Kommt keine Verbindung zustande, können Sie versuchen, ob der Adapter mit 1200 läuft. Sollte dies der Fall sein, kann die Geschwindigkeit über den Status „pylontech. -n- .config.set_speed“ auf 115200 gesetzt werden. Die Adaptergeschwindigkeit muss dann wieder auf 115200 gesetzt werden.

### Netzwerkgerät
Die folgenden Felder werden nur angezeigt, wenn unter Verbindung über Netzwerkgerät ausgewählt wurde.
Es können noch keine verschlüsselten Netzwerkverbindungen hergestellt werden.

#### Netzwerkhost
Geben Sie hier den Namen des Com-Servers ein. Kein http oder ähnliches am Anfang des Namens. Es können IP-Adressen oder Namen wie ESP-LINK.FRITZ.BOX eingegeben werden. Beachten Sie bei DHCP-Geräten, dass sich die IP-Adresse ändern kann.

#### Netzwerkport
Um die Kommunikation aufzubauen, muss der Port angegeben werden, unter dem der Server die Kommunikation bereitstellt. Für ESP-Link beträgt er beispielsweise 23.

#### Übertragungsgeschwindigkeit
Die Geschwindigkeit muss am Netzwerkgerät eingestellt werden.

### Zykluszeit in Minuten
Hier kann die Zykluszeit eingestellt werden. Persönlich denke ich, dass 5 Minuten ausreichen, um eine Vorstellung davon zu bekommen, ob die Batterien gut funktionieren. Bitte beachten Sie, dass die Batterien in erster Linie mit dem Wechselrichter und nicht mit dem Debugger kommunizieren sollten.

### Modell
Hier können Sie das Modell auswählen. Sie können derzeit zwischen US und Force wählen. Du kannst nichts zerstören. Testen Sie also gerne, auf welcher Einstellung Ihr Pylontech läuft. Einige sind auch ganz oben in der Kompatibilitätsliste aufgeführt. Wenn es nicht funktioniert, können Sie mich über das ioBroker-Forum kontaktieren und wir können sehen, warum die Daten nicht gelesen werden können.

ioBroker-Forum: https://forum.iobroker.net/topic/68707

### Bestimmen Sie, welche Daten für das Modell US gelesen werden
Sollten Fehler auftreten, weil der Adapter Daten anfragt, die die Akkus nicht liefern, kann die Anfrage hier gestoppt werden. Der Adapter wurde auf Basis eines Re-Engineerings gebaut, daher kann es sein, dass ich Verbesserungen vornehmen muss.
Sollten für Sie zu viele Objekte vorhanden sein, können Sie hier auch die Daten reduzieren.

#### Laden Sie die Batteriezellendaten herunter
Der Befehl „bat -n-“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie den Gesundheitszustand der Batteriezellen herunter
Der Befehl „soh -n-“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Batterieinformationsdaten herunter
Der Befehl „info -n-“ wird immer in die Konsole geschrieben. Hier finden Sie Informationen darüber, welche Seriennummer die einzelnen Akkus haben. Es wird für den Objektbaum benötigt. Ist dies ausgeschaltet, werden die Informationen nicht an den ioBroker übermittelt.

#### Laden Sie die Protokolldaten herunter
Der Befehl „log“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Batterieleistungsdaten herunter
Der Befehl „pwr“ wird immer in die Konsole geschrieben. Der Befehl „pwr -n-“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist. Hier finden Sie Informationen zu den Positionen der einzelnen Batterien. Es wird für den Objektbaum benötigt. Ist dies ausgeschaltet, werden die Informationen aus dem „pwr“-Befehl nicht an den ioBroker übertragen und der „pwr -n-“-Befehl wird nicht ausgegeben.

#### Laden Sie die Batteriestatistikdaten herunter
Der Befehl „stat -n-“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Zeitinformationen herunter
Der Befehl „time“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

### Bestimmen Sie, welche Daten für das Modell Force gelesen werden
Sollten Fehler auftreten, weil der Adapter Daten anfragt, die die Akkus nicht liefern, kann die Anfrage hier gestoppt werden. Der Adapter wurde auf Basis eines Re-Engineerings gebaut, daher kann es sein, dass ich Verbesserungen vornehmen muss.
Sollten für Sie zu viele Objekte vorhanden sein, können Sie hier auch die Daten reduzieren.

#### Laden Sie die Batteriezellendaten herunter
Der Befehl „bat“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie den Gesundheitszustand der Batteriezellen herunter
Der Befehl „soh“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Batterieinformationsdaten herunter
Der Befehl „info“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Protokolldaten herunter
Der Befehl „log“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Batterieleistungsdaten herunter
Der Befehl „pwr“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Batteriestatistikdaten herunter
Der Befehl „stat“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Informationsdaten zum Batteriesystem herunter
Der Befehl „sysinfo“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Gerätedaten herunter
Die „Command Unit“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

#### Laden Sie die Zeitinformationen herunter
Der Befehl „time“ wird nur dann auf die Konsole geschrieben, wenn dies hier eingestellt ist.

## Werte und Operationen für das Modell US
Fast alle Messungen werden hier in Milli (ein Teil von Tausend) gespeichert.

- Milligrad Celsius
- Milliampere
- Milliamperestunden

Die meisten Werte müssen zur Anzeige durch Tausender geteilt werden.

### Kanal -SN-.battery-nn-
Hier werden die Informationen der folgenden Befehle gespeichert

- Befehl „soh -n-“
- Befehl „bat -n-“

### Kanal -SN-.info
Hier werden die Informationen des folgenden Befehls gespeichert

- Befehl „info -n-“

### Kanal -SN-.power
Hier werden die Informationen der folgenden Befehle gespeichert

- Befehl „pwr“
- Befehl „pwr -n-“

### Kanal -SN-.statistic
Hier werden die Informationen des folgenden Befehls gespeichert

- Befehl „stat -n-“

## Werte und Operationen für das Modell Force
machen

### Kanalkonfiguration
#### Zustand set_speed
Sie können den Status „set_speed“ ohne Bestätigung auf „true“ schreiben. Bei älteren Modellen wird ein Befehl an die Batterie gesendet, der die Geschwindigkeit korrigiert. Bei neueren Modellen kommt eine Fehlermeldung zurück.
Ack wird auf true gesetzt, wenn der Befehl geschrieben wird.

### Kanalinfo USA
#### Statusverbindung
Ist wahr, wenn der Adapter eine Kommunikation herstellen konnte

#### State -n-.connected
Wird auf „true“ gesetzt, wenn die Batterie gefunden wird.

#### State -n-.barcode
Enthält den Barcode (Seriennummer), um zu verfolgen, welche Batterie an welcher Stelle im Stapel installiert ist.

### Kanalprotokoll
Der Protokollkanal enthält 31 Kanäle mit den letzten 31 Protokollinformationen. Das Neuset befindet sich immer in 31 und wird dann nach unten verschoben, wenn neue Nachrichten vorliegen.

### Kanalzeit
#### Status ds3231, RTC oder Zeit
Hier wird die vom Wechselrichter ausgelesene Uhrzeit gespeichert. Auf dem US3000 heißt es RTC und auf dem alten VS2000 heißt es ds3231. Wenn Sie auf die Uhrzeit schreiben, wird Ihre Uhrzeit auf den Akku übertragen und die Akkulaufzeit angepasst.

#### Statussatz
Wenn true ohne ack geschrieben wird, um zu setzen, wird die aktuelle Zeit an den Pylontech gesendet. Wenn der Befehl ausgeführt wurde, wird der Status auf ack = true gesetzt.

### Kanalinfo erzwingen
#### Statusverbindung
Ist wahr, wenn der Adapter eine Kommunikation herstellen konnte

### Kanalprotokoll
Der Protokollkanal enthält 31 Kanäle mit den letzten 31 Protokollinformationen. Das Neuset befindet sich immer in 31 und wird dann nach unten verschoben, wenn neue Nachrichten vorliegen.

### Kanalzeit
#### Status ds3231, RTC oder Zeit
Hier wird die vom Wechselrichter ausgelesene Uhrzeit gespeichert. Auf dem US3000 heißt es RTC und auf dem alten VS2000 heißt es ds3231. Wenn Sie auf die Uhrzeit schreiben, wird Ihre Uhrzeit auf den Akku übertragen und die Akkulaufzeit angepasst.

#### Statussatz
Wenn true ohne ack geschrieben wird, um zu setzen, wird die aktuelle Zeit an den Pylontech gesendet. Wenn der Befehl ausgeführt wurde, wird der Status auf ack = true gesetzt.

## Changelog

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

Copyright (c) 2023 PLCHome

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