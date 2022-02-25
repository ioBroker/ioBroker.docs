---
title: Proxmox
Version: 0.1
Autoren: TeNNo2k5
Schlüsselworte: Proxmox, LXC, USB Passthrough
lastChanged: 15.02.2022
---

# Proxmox 

![proxmoxlogo](media/proxmox/Proxmox-logo-860.png)

## Proxmox Installation

Proxmox Virtual Environment (kurz Proxmox VE) ist eine auf Debian basierende Virtualisierungsplattform. Die Technik der Virtualisierung basiert bei Proxmox auf QEMU/KVM.

Proxmox „verpackt“ QEMU/KVM in eine eigenen Web-Oberfläche und macht die Administration damit recht einfach (und unterstützt darüber hinaus auch noch Linux Containers – LXC). Dadurch ist Proxmox auf der einen Seite einsteigerfreundlich, auf der anderen Seite aber auch so mächtig, dass es auch im professionellen Umfeld genutzt werden kann.

Dieser Abschnitt zeigt an einem Beispiel die Installation und Grundkonfiguration von Proxmox in der kostenlosen Variante (non-subscription).

Aufgrund der Übersichtlichkeit, sind Bildbeschreibungen und Zusatzinfo's zum aufklappen.


### Voraussetzungen

<details>
<summary>Voraussetzungen</summary>
   
- 64 Bit CPU
- CPU und Mainboard müssen Intel VT/AMD-V für die Virtualisierung unterstützen und im Bios aktiviert sein.
- 1 GB RAM (nur für Proxmox) – abhängig von der Anzahl der zu betreibenden virtuellen Maschinen wird hier natürlich mehr RAM benötigt. Daher sind hier minimal 8 GB, besser noch 16 GB RAM empfehlenswert.
   
</details>

### ISO Image/bootfähigen USB-Stick erstellen

Zunächst benöigt man ein ISO-Image, welches auf der [Proxmox-Download-Seite](https://www.proxmox.com/de/downloads/category/iso-images-pve) heruntergeladen werden kann.

<details>
<summary>Proxmox Iso</summary>
   
![proxmox-iso](media/proxmox/proxmox-iso)
   
</details>

Zur Installation muss mit diesem ISO-Image noch ein bootfähiger USB-Stick erstellt werden. Dieser sollte dabei mindestens 2 GB Speicher haben. Zur Erstellung eines bootfähigen Sticks gibt es mehrere Möglichkeiten, siehe [Installationmedien vorbereiten](https://pve.proxmox.com/wiki/Prepare_Installation_Media#_instructions_for_windows)

### Installation

Das System muss im UEFI/BIOS so konfiguriert werden, dass von einem USB-Device gestartet werden kann. Nach dem Einstecken des USB-Sticks erscheint dann nach kurzer Zeit das Installations-Menü von Proxmox (falls nicht, kann man den USB-Stick auch manuell als Startmedium angeben (bei den meisten Mainboards kann man dies mit F8 oder F11 bewerkstelligen).

Im Installations-Menü wird nun einfach **Install Proxmox VE** ausgewählt.

<details>
<summary>Installations Menü</summary>
   
![installationsmenü](media/proxmox/installationsmenü)
   
</details>

Im nächsten Schritt muss den Nutzungsbedingungen (EULA) zugestimmt werden.

<details>
<summary>Eula</summary>
   
![eula](media/proxmox/eula)
   
</details>

Es folgt die Wahl der Festplatte, auf der Proxmox installiert werden soll. Falls mehrere Platten am Server installiert sind, sollte man hier darauf achten, auch die richtige Festplatte zu wählen!

<details>
<summary>Auswahl der Festplatte</summary>
   
![festplattenauswahl](media/proxmox/festplattenauswahl)
   
</details>

Mit dem **Button Options** kann man auch noch weitere Parameter zur Installations-Festplatte angeben:

<details>
<summary>Erweiterte Optionen Festplatte</summary>
   
![harddisk-options](media/proxmox/harddisk-options)
   
</details>

Proxmox nutzt den [Logical Volume Manager](https://de.wikipedia.org/wiki/Logical_Volume_Manager) (LVM). Mit den erweiterten Optionen an dieser Stelle kann u.a. das LVM in Detail konfiguriert werden.
Der Installer erstellt eine Volume Group (VG) mit dem Namen pve und zusätzliche Logical Volumes (LVs) mit den Namen root (hier wird Proxmox selbst installiert), data (Speicher, auf dem die virtuellen Platten der VMs gespeichert werden) und swap (hier wird das Swapfile gelagert).

<details>
<summary>Mit den erweiterten Einstellungen können hier gewisse Parameter angegeben werden:</summary>

- Filesystem: Hier kann man das Dateisystem wählen. Standard ist hier ext4 und in den meisten Fällen ist dies eine gute Wahl. Wenn mehrere Festplatten auf dem Host-System zur Verfügung stehen (und viel RAM), macht hier die Option zfs mit dem entsprechenden RAID-Level durchaus Sinn. In diesem Fall sollte man sich aber grundlegend mit ZFS beschäftigt haben.
- hdsize: Gibt Festplatten-Größe an, die für Proxmox insgesamt genutzt werden soll. Hier wählt man normalerweise die komplette Festplatten-Größe, es sei denn, man möchte später noch weitere Partitionen hinzufügen.
- swapsize: Bestimmt die Größe des Swap-Volumes. Standard ist hier die gleiche Größe wie der verbaute Speicher, jedoch minimal 4 GB und maximal 8 GB.
- maxroot: Gibt die maximal Größe des root-Volumes an(Proxmox selbst). **Hier ist zu erwähnen, das in der Grundinstallation, spätere benötigte Template's und Iso-Image's ebenfalls hier abgelegt werden.**
- minfree: Speicherplatz, der auf der LVM Volume Group pve freigelassen wird. Wenn die Festplatte größer als 128 GB ist, werden hier standardmäßig 16 GB frei gelassen (LVM benötigt immer etwas freien Speicher für die Erzeugung von Snapshots).
- maxvz: Legt die maximale Größe des data-Volumes fest.
   
</details>

Im Normalfall kann man hier alle Optionen auf der Standard-Einstellung belassen (d.h. hier wird nichts angegeben). Diese sind für die meisten Installationen bereits optimal eingestellt.

Nach der Wahl der Festplatte für Proxmox werden die Optionen zur Lokalisierung abgefragt (Land, Zeit und das dazugehörige Keyboard-Layout):

<details>
<summary>Lokalisierung</summary>
   
![location](media/proxmox/location)
   
</details>

Im Anschluss wird das Passwort des root-Users eingegeben. Ebenso wird hier eine Mail-Adresse angefragt. Diese wird dazu verwendet, bei wichtigen Systemmeldungen eine E-Mail an die hier angegebene Adresse zu senden. Dies muss aber nicht zwingend eine echte E-Mail-Adresse sein (dann wird man als Admin aber nicht mehr per Mail auf wichtige Ereignisse des Systems hingewiesen).

<details>
<summary>Passwort und Email</summary>
   
![password](media/proxmox/password)
   
</details>

Der nächste Schritt des Installers beschäftigt sich mit den Netzwerk-Einstellungen. Hier ist eine statische IP-Adresse anzugeben (kein DHCP). Dazu zählt die IP-Adresse selbst (als CIDR-Notation), die Gateway-IP (normalerweise die IP-Adresse des Routers) und der zu verwendende DNS-Server (im privaten Umfeld meist auch die IP-Adresse des Routers). Proxmox erkennt meist das Netzwerk automatisch.

<details>
<summary>Netzwerk</summary>
   
![network](media/proxmox/network)
   
</details>

Am Ende wird noch eine Zusammenfassung der Installation angezeigt:

<details>
<summary>Zusammenfassung</summary>
   
![zusammenfassung](media/proxmox/zusammenfassung)
   
</details>

Durch eine Kontrolle der Einstellungen und einem Klick auf Install wird das System installiert.

<details>
<summary>Installation</summary>
   
![installation](media/proxmox/installation)
   
</details>

Nach einer kurzen Wartezeit ist die Installation abgeschlossen und das System muss neu gebootet werden (dazu vorher den USB-Stick mit dem ISO-Image entfernen).

Anschließend sieht man das Terminal. Hier wird schon die Anweisung angezeigt, wie nun auf das System zugegriffen werden kann:

<details>
<summary>Konsole</summary>
   
![konsole](media/proxmox/konsole)
   
</details>

Nun geht es im Browser weiter (beispielhaft https://10.1.1.89:8006). Als erstes wird allerdings eine Warnung angezeigt. Dies liegt daran, dass während der Installation ein selbst signiertes Zertifikat erzeugt wurde, welches dem Browser natürlich nicht bekannt ist. Diese Meldung kann man an dieser Stelle getrost ignorieren – die Verbindung ist auf jeden Fall über HTTPS verschlüsselt. Die Meldung ansich, ist Browserabhängig. In diesem Beispiel, ein Klick auf **Erweitert** und anschließend auf **Weiter zu 10.1.1.89(unsicher)**

<details>
<summary>Datenschutzfehler</summary>
   
![datenschutzfehler](media/proxmox/datenschutzfehler)
   
</details>

Die Anmeldung erfolgt dann mit dem User root und dem während der Installation gewähltem Passwort. Die Sprache kann man hier **zuerst** auf Deutsch umstellen, ansonsten wird die Oberfläche von Proxmox in Englisch angezeigt und man muss Benutzername und Kennwort nicht ein zweites mal  eingeben.

<details>
<summary>Anmeldung</summary>
   
![anmeldung](media/proxmox/anmeldung)
   
</details>

Direkt nach dieser Anmeldung wird man von einer Meldung begrüßt, dass man keine gültige Subscription für diesen Server hat. Diese Meldung wird erst einmal mit einem Klick auf OK bestätigt.

<details>
<summary>Subscription</summary>
   
![subskription](media/proxmox/subskription)
   
</details>

Nun müssen die Proxmox Paketquellen angepasst werden, damit man Updates erhalten kann.

<details>
<summary>Paketquellen</summary>
   
![paketquellen](media/proxmox/paketquellen)
   
</details>

Dazu wird das **Non-Subscription-Repository** zu den Paketquellen hinzugefügt. Dies kann im Menü der Proxmox-Instanz unter `Updates > Repositories` erledigt werden. Über den Button Hinzufügen kann das Non-Subscription-Repository hinzugefügt werden:

<details>
<summary>Non-Subscription</summary>
   
![no-subscription](media/proxmox/no-subscription)
   
</details>

Nun sollte noch das **Enterprise-Repository** deaktiviert werden. Dazu einfach in der Repository-Ansicht das Repo pve-enterprise anwählen und auf den Button **Deaktivieren** klicken.

Die Konfiguration der Repositories sieht danach dann so aus:

<details>
<summary>Enterprise-Repository</summary>
   
![enterprise](media/proxmox/enterprise)
   
</details>

### Updates
Nachdem die Paketquellen umgestellt wurden, sollte im Anschluß ein erstes System Update durchgeführt werden. Hier geht man am besten über die Web-Oberfläche:

<details>
<summary>Updates</summary>
   
![updates](media/proxmox/updates)
   
</details>

Einfach den gewünschten Proxmox-Knoten aussuchen (z.B. „pve“) und dann unter Updates auf **Aktualisieren** klicken. Hier öffnet sich dann der sog. Task Viewer, der immer angezeigt wird, wenn irgendwelche Aktivitäten am System durchgeführt werden. Der Task-Viewer kann nun wieder geschlossen werden. Übrigens muss bei der Anzeige des Task-Viewers nicht gewartet werden, bis der Task abgeschlossen wurde („TASK OK“), sondern dieser Dialog kann immer direkt wieder geschlossen werden – der Task an sich läuft im Hintergrund weiter.
Falls nun Updates verfügbar sind, können diese mit einem Klick auf **Upgrade** eingespielt werden.

Hier öffnet sich dann die Web-Konsole und man kann den Fortschritt beobachten.

<details>
<summary>Web-Konsole</summary>
   
![web-konsole](media/proxmox/web-konsole)
   
</details>

Es ist natürlich auch möglich, den Proxmox-Server über die Kommandozeile (z.B. per SSH) upzudaten:

~~~
apt update && apt dist-upgrade
~~~

Wichtig ist hier nur, dass man ein **apt dist-upgrade** verwendet (auf „normalen“ Debian/Ubuntu-Maschinen nutzt man ja eher apt upgrade). Das „dist-upgrade“ ist bei Proxmox allerdings wichtig, da hier Abhängigkeiten besser aufgelöst werden, die zum Betrieb von Proxmox benötigt werden.

Insofern ist Proxmox nun in seiner Grundkonfiguration abgeschlossen. Wenn man sich ausgiebiger mit Proxmox beschäftigen möchte, lohnt ein Blick ins [Proxmox Wiki](https://pve.proxmox.com/wiki/Main_Page) bzw. ins [offizielle Forum](https://forum.proxmox.com/).

---

## Proxmox - ioBroker Installation in einer VM (Virtuellen Maschine) 

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md), 
   damit die Änderungen einfacher übernommen werden können.

<details>
 
</details>

---

## Proxmox - Erstellen eines [Linux Containers (LXC)](https://pve.proxmox.com/wiki/Linux_Container) + ioBroker Installation im Anschluß

Diese Beispiel-Anleitung zeigt wie ein LXC Container (debian11) erstellt und anschließend ioBroker darin installiert wird.

Aufgrund der Übersichtlichkeit, sind Bildbeschreibungen und Zusatzinfo's zum aufklappen.
 
### 1 - Container Template herunterladen

Zuerst wird ein Template benötigt, welches in der Grundinstallation (sofern keine weiteren Laufwerke angelegt wurden) ins root Verzeichnis (local) geladen werden muss.

Hierzu geht man auf local > Container Templates. Mit einem Klick auf **Templates** öffnet sich eine Auswahliste. Hier wählt man debian-11-standard(bullseye) und klickt auf herunterladen.


<details>
<summary>Template herunterladen</summary>

![local](media/proxmox/local)

![pemplates](media/proxmox/templates)

![pemplate-laden](media/proxmox/template-laden)

</details>

### 2 - LXC erstellen

Mit einem Klick auf den blauen Button **Erstelle CT** öffnet sich ein Fenster, in dem nun folgende Einstellungen getroffen werden müssen.

- Allgemein: Vergabe des Hostname und Passwort, ID wird vorgegeben (beginnt mit 100), kann jedoch geändert werden.
- Template: Storage Auswahl(local) und Template(debian-11-standard)
- Disks: Vergabe der Diskgröße(nicht zu großzügig sein, vergrößern kann man jederzeit)
- CPU: Ist abhängig wie Leistungsstark der Rechner ist (kann ebenfalls jederzeit angepasst werden)
- Speicher: Ram/Swap-Vergabe (kann jederzeit, auch im laufendem Betrieb angepasst werden)
- Netzwerk: statische IP/CIDR Vergabe, Gateway, sofern kein Ipv6 eingerichtet, wird dies auf SLAAC gestellt
- DNS: wird in der Regel nichts verändert(verwende Werte vom Host)
- Bestätigen: Hier sieht man noch einmal eine Zusammenfassung, wenn alle Eingaben stimmen, anschließend auf **Abschließen** klicken.


<details>
<summary>Bilderserie Erstelle CT</summary>

![pve](media/proxmox/pve)

![lxc-allgemein](media/proxmox/lxc-allgemein)

![lxc-template](media/proxmox/lxc-template)

![lxc-disks](media/proxmox/lxc-disks)

![lxc-cpu](media/proxmox/lxc-cpu)

![lxc-speicher](media/proxmox/lxc-speicher)

![lxc-netzwerk](media/proxmox/lxc-netzwerk)

![lxc-dns](media/proxmox/lxc-dns)

![lxc-bestätigen](media/proxmox/lxc-bestätigen)

![lxc-taskviewer](media/proxmox/lxc-taskviewer)


</details>


### 3 - LXC einrichten

Nachdem der Container nun gestartet wurde, begibt man sich auf die Konsole des LXC

<details>
<summary>Konsole</summary>

![lxc-konsole](media/proxmox/lxc-konsole)

</details>

Hier loggt man sich zunächst als root mit dem zuvor vergebenen Passwort, welches beim LXC erstellen vergeben wurde, ein und bringt diesen erst einmal auf einen aktuellen  Stand.

~~~
apt update && apt upgrade
~~~


<details>
<summary>Upgrade</summary>

![lxc-upgrade](media/proxmox/lxc-upgrade)

</details>

Hierbei wird direkt darauf hingewiesen, das die Zeitzone noch eingestellt werden muss.

~~~
dpkg-reconfigure tzdata
~~~


<details>
<summary>Zeitzone</summary>

![lxc-tzdata](media/proxmox/lxc-tzdata)

![lxc-area](media/proxmox/lxc-area)

![lxc-timezone](media/proxmox/lxc-timezone)

</details>


Nun wird **sudo** und **curl** nachinstalliert. Sudo wird benötigt, um wie im nächsten Schritt, einen Benutzer korrekt anzulegen, mit dem zukünftig auf der Konsole gearbeitet wird. Curl ist nötig, um im letzten Schritt das IoBroker Installationsscript abzurufen.

~~~
apt install sudo curl
~~~


<details>
<summary>Nachinstallieren</summary>

![lxc-sudo](media/proxmox/lxc-sudo)

</details>


Jetzt legt man den zukünftigen Benutzer an. "Benutzername" in dem Fall ersetzen. Passwortvergabe für den User. Der Rest kann mit ENTER bestätigt werden.

~~~
adduser benutzername
~~~


<details>
<summary>User anlegen</summary>

![lxc-adduser](media/proxmox/lxc-adduser)

</details>


Im letzen Schritt, bevor nun ioBroker installiert wird, einmal ausloggen

~~~
exit
~~~

und anschließend mit den Neuen Benutzer einloggen. Im Anschluß kann nun iobroker installiert werden.

<details>
<summary>ausloggen und mit Benutzer anmelden</summary>

![lxc-useranmeldung](media/proxmox/lxc-useranmeldung)

</details>

---

## ioBroker installieren

Für die Installation von ioBroker benötigt man lediglich einen einzigen Befehl.

~~~
curl -sLf https://iobroker.net/install.sh | bash -
~~~

Die Installationschritte dabei, sind in 4 Schritten unterteilt, welche vollautomatisch durchlaufen.

- Installing prerequisites (1/4)
- Creating ioBroker user and directory (2/4)
- Installing ioBroker (3/4)
- Finalizing installation (4/4)

<details>
<summary>Installer</summary>

![iobroker-installer](media/proxmox/iobroker-installer)

![iobroker-installer1](media/proxmox/iobroker-installer1)

![iobroker-installer2](media/proxmox/iobroker-installer2)

![iobroker-installer3](media/proxmox/iobroker-installer3)

</details>

Die Installation ist erfolgreich abgeschlossen, wenn am Ende folgendes erscheint.

~~~
ioBroker was installed successfully
Open http://10.1.1.222:8081 in a browser and start configuring!
~~~

Dies bedeutet auch zugleich, das über die Adresse, ioBroker nun im Browser aufgerufen werden kann. Wenn alles problemlos funktioniert hat, wird man mit dem ioBroker-Setup berüßt. Nun sind es nur noch ein paar Schritte, durch die man mit dem Assistenten geleitet wird.


<details>
<summary>Bilderserie ioBroker Assistent</summary>

![iobroker-setup](media/proxmox/iobroker-setup)

![iobroker-setup1](media/proxmox/iobroker-setup1)

![iobroker-setup2](media/proxmox/iobroker-setup2)

![iobroker-setup3](media/proxmox/iobroker-setup3)

![iobroker-setup4](media/proxmox/iobroker-setup4)

![iobroker-setup5](media/proxmox/iobroker-setup5)

![iobroker-setup6](media/proxmox/iobroker-setup6)

</details>

Im Anschluss hat man noch die Möglichkeit, nach Geräten und Diensten suchen zu lassen. Benötigte Adapter/Instanzen können dadurch automatisch angelegt werden.

<details>
<summary>Bilderserie Geräte/Dienst Suche</summary>

![gerätesuche](media/proxmox/gerätesuche)

![instanzen](media/proxmox/instanzen)

![iobroker-fertig](media/proxmox/iobroker-fertig)
   
</details>

Somit ist die ioBroker Installation beendet. Weitere Adapter können je nach Anwendungsfall und Wunsch, jederzeit zusätzlich installiert werden.

---
   
## Proxmox - LXC (Linux Containers) -> USB Geräte durchreichen

Dieser Teil der Anleitung erklärt Schritt für Schritt das durchreichen eines USB-Gerätes (USB Passthrough) in Proxmox an einen LXC (Linux Container).

Bei einer VM ist das durchreichen eines USB-Gerätes direkt über die Web Oberfläche von Proxmox möglich, bei einem Linux Container muss hierfür aktuell noch manuell die Konfigurationsdatei des lxc bearbeitet werden. 

In der Anleitung wird das Einbinden eines **Texas Instruments Inc. CC2531** Zigbee Stick beschrieben, dieselben Schritte können aber analog für andere Zigbee Sticks (ConBee, CC2652P etc.) oder für andere USB-Geräte mit der Ausnahme von USB Netzwerk Geräten (Bluetooth/Wlan) verwendet werden.

* Für diesen Teil der Anleitung wurde Proxmox in der Version 7.1 verwendet. 


### 1.) Informationen zum USB-Gerät sammeln

<details>

Aufbau einer SSH-Verbindung zu Proxmox:

~~~
ssh root@IP-Adresse
~~~

<span style="color:red">**Sollte das USB-Gerät bereits mit dem Proxmox Host verbunden sein, stecke das Gerät vorerst ab.**</span>

Mit folgendem Befehl werden alle aktuell verbunden USB-Geräte am Proxmox Host aufgelistet: 

~~~
lsusb
~~~
 
![proxmoxlxc00](media/proxmox/proxmoxlxc00.PNG)

Nun wird das zu einbindende USB-Gerät am Proxmox Host eingesteckt und der Befehl lsusb erneut ausgeführt

![proxmoxlxc01](media/proxmox/proxmoxlxc01.PNG) 

Im Screenshot ist zusehen das ein neues Gerät mit der USB-Bus-Nummer: **001** und der Device-Nummer: **003** gelistet wird.

Diese Informationen werden benötigt um mit dem folgenden Befehl u. a. die **major device number** vom Gerät auszugeben:

~~~
ls -l /dev/bus/usb/001/003
~~~

Wichtig verwende bei dem Befehl die Ausgabe deiner USB-Bus-Nummer und Device-Nummer!

***ls -l /dev/bus/usb/USB-Bus-Nummer/Device-Nummer***

![proxmoxlxc02](media/proxmox/proxmoxlxc02.PNG)

Das USB-Gerät hat in diesem Beispiel die major device number **189**, notiere dir den Wert deines Gerätes in einer Textdatei mit dem Vermerk: #1

![proxmoxlxc03](media/proxmox/proxmoxlxc03.PNG)
 
Als nächstes geben wir die unique id des USB-Gerätes aus und notieren den Ausgabe Wert in der Textdatei mit dem Vermerk: #2
 
~~~
ls /dev/serial/by-id/
~~~

![proxmoxlxc04](media/proxmox/proxmoxlxc04.PNG)

![proxmoxlxc05](media/proxmox/proxmoxlxc05.PNG)
 
Als letzten Schritt wird die major device number des ttyACM ausgegeben und mit dem Vermerk: #3 notiert:

~~~
ls -l /dev/ttyACM*
~~~

![proxmoxlxc06](media/proxmox/proxmoxlxc06.PNG)
 
>*Sollte hierbei keine Ausgabe erfolgen, prüfe mit „ls -l /dev/serial/by-id/“ ob das USB-Gerät vom System als ttyUSB eingebunden wird, wenn ja ersetze alle folgenden Befehle die sich auf **ttyACM…** beziehen durch **ttyUSB…**  sollte keine Ausgabe erscheinen ist es kein USB CDC class Gerät (Serielle Kommunikation) damit können alle Punkte zum Einbinden vom ttyACM ignoriert werden.*

Somit haben wir **drei** Werte vom USB-Gerät notiert die für das Einbinden in der Konfigurationsdatei des lxc benötigt werden.
 
![proxmoxlxc07](media/proxmox/proxmoxlxc07.PNG)

</details>

###  2.) LXC Konfigurationsdatei bearbeiten

<details>

Am Proxmox Host ins LXC Konfigurationsverzeichnis wechseln mit:

~~~
cd /etc/pve/lxc
~~~

Die Konfigurationsdatei hat die gleiche ID Nummer die bei der Erstellung des lxc vergeben wurde!
 
![proxmoxlxc08](media/proxmox/proxmoxlxc08.PNG)

![proxmoxlxc09](media/proxmox/proxmoxlxc09.PNG)
 
Bevor die Konfigurationsdatei bearbeitet wird, sollte eine Sicherheitskopie erstellt werden:

~~~
cp 201.conf 201.conf.backup
~~~

![proxmoxlxc10](media/proxmox/proxmoxlxc10.PNG)
 
Nun wird die Konfigurationsdatei mit vi oder nano bearbeitet:

~~~
nano 201.conf
~~~
 
![proxmoxlxc11](media/proxmox/proxmoxlxc11.PNG)

Ans Ende der Konfigurationsdatei wird folgendes hinzugefügt:

~~~
lxc.cgroup2.devices.allow: c 189:* rwm
lxc.mount.entry: usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 dev/serial/by-id/usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 none bind,optional,create=file

lxc.cgroup2.devices.allow: c 166:* rwm
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
~~~

Ersetze die markierten Werte mit den vermerkten Einträgen aus deiner Notiz!

![12](media/proxmox/proxmoxlxc12.PNG)


* Die erste Zeile bezieht sich auf die major device number **189** Vermerk: #1
* In der zweiten Zeile wird die unique id (usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00) aus Vermerk: #2 einzeln und mit dem absoluten Pfad angegeben, beachte das der komplette Text in einer Zeile ohne Zeilenumbruch geschrieben wird.
* In der dritten Zeile wird die major device number **166** von ttyACM aus Vermerk: #3 angegeben.

Die Konfigurationsdatei abspeichern (Im Nano Editor mit der Tastenkombination: STRG + o & STRG + x zum beenden des Editors)

</br>  

<span style="color:orange">**ACHTUNG! - Sollte dein Container aktive Snapshots besitzen:**</span>

<details>

Dann gehört der lxc.cgroup Code nicht an das Ende der Config Datei sondern vor den ersten Eintrag eines Snaphots. 

![proxmoxlxc18](media/proxmox/proxmoxlxc18.PNG)

</details>

<span style="color:orange">**ACHTUNG! - Proxmox Installation vor Version 7.0:**</span>

<details>

Ersetze die Einträge mit
   
~~~
lxc.cgroup2
~~~   

durch
   
~~~
lxc.cgroup
~~~

</details>

</br>  
Abschließend noch folgenden Befehl absetzen um die benötigten Rechte für ttyACM0 zu setzen:

~~~
chmod o+rw /dev/ttyACM*
~~~

Um die Anpassungen am lxc zu übernehmen einen cold boot vom Container mit **pct stop id / pct start id** durchführen:

~~~
pct stop 201
~~~

~~~
pct start 201
~~~

</br>  

<span style="color:green">**Tipp lege dir eine Kopie deiner funktionierenden Config Datei am besten extern ab, da z. B. der integrierte Proxmox Backup Dienst nicht den Inhalt deiner Config mit sichert!**</span>

</br>  

</details>

### 3.) LXC USB Passthrough prüfen & Zigbee Instanz Konfiguration

<details>

Aufbau einer SSH-Verbindung zum LXC:

~~~
ssh Benutzer@IP-Adresse
~~~

Mit den befehlen:

~~~
lsusb
~~~

&

~~~
ls -l /dev
~~~

wird überprüft ob die Anpassungen an der Konfigurationsdatei erfolgreich waren.
 
![proxmoxlxc13](media/proxmox/proxmoxlxc13.PNG)
 
* Wie im Screenshot zu sehen hat nun der Container Zugriff auf das USB-Gerät.

* Wichtig hierbei ist das ttyACM0 die gleichen Rechte hat im Screenshot also **crw-rw-rw- 1 nobody nogroup**
>***Wenn nicht überprüfe ob alle Werte in der Konfigurationsdatei so gesetzt sind wie beschrieben, sollten die Rechte dann immer noch nicht übereinstimmen springe zu Punkt 5.***

* Im Screenshot ist ebenfalls zusehen das sich die Device Nummer vom cc2531 von dem Wert 3 auf 4 verändert hat, dies liegt daran das der Stick zwischenzeitlich einmal aus- und wieder angesteckt wurde. Da in der Konfigurationsdatei aber die unique id und nicht die Bus/Device Nummer angegeben ist funktioniert der USB Passthrough weiterhin.



Wird wie eingangsbeschrieben ein Zigbee Stick an den Container durchgereicht muss im iobroker in den Einstellungen des Zigbee Adapters unter dem Punkt COM-Anschlussname

~~~
/dev/ttyACM0
~~~

angegeben werden damit das korrekte Gerät vom Adapter angesprochen wird.
 
![proxmoxlxc14](media/proxmox/proxmoxlxc14.PNG)

</details>

### 4.) UDEV Regel für permanente Rechte Anpassung von ttyACM0

<details>

Am Ende von Schritt 3 wurde mit dem Befehl 

~~~
chmod o+rw /dev/ttyACM*
~~~

die passenden Rechte für ttyACM0 gesetzt, diese Rechte Änderungen werden aber mit Neustart des Proxmox Host zurückgesetzt, für eine permanente Anpassung wird auf dem Proxmox Host eine udev Regel benötigt. 

Mit lsusb listen wir wieder die aktuell verbunden USB-Geräte auf:

~~~
lsusb
~~~

![proxmoxlxc15](media/proxmox/proxmoxlxc15.PNG)
 
Diesmal notieren wir uns die Zahlenwerte Werte nach ID in diesem Fall also **0451:16a8**

* Der erste Wert: ***0451*** steht hierbei für den **idVendor** und der zweite Wert: ***16a8*** für **idProduct**.

Nun wird mit vi oder nano die udev Regel unter /etc/udev/rules.d erstellt:

~~~
nano /etc/udev/rules.d/50-myusb.rules
~~~

und folgender Inhalt eingefügt:

~~~
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0451", ATTRS{idProduct}=="16a8", GROUP="users", MODE="0666"
~~~

![proxmoxlxc16](media/proxmox/proxmoxlxc16.PNG)
 

Abschließend noch folgenden Befehl ausführen um die udev Regel zu aktivieren:

~~~
udevadm control –reload
~~~

</details>

### 5.) Troubleshooting

<details>

**Fehler:** ttyACM0 Rechte im lxc passen nicht bzw. gehen nach kurzer Zeit verloren (ConBee II).

~~~
ls -l /dev/ttyACM0
 c--------- 0 nobody nogroup 166, 0 Feb  7 14:29 ttyACM0
~~~

</br>

**Lösung:** mit mknod eine dauerhafte Bindung für den Container erstellen. 



Dazu wird im Pfad **"/var/lib/lxc/CONTAINERID"** der Ordner **devices** erstellt und in diesem Ordner mit mknod die Bindung erzeugt: 

~~~
mkdir /var/lib/lxc/201/devices
~~~

~~~
cd /var/lib/lxc/201/devices
~~~

~~~
mknod -m 666 ttyACM0 c 166 0
~~~

+ *mknod erstellt in dem Pfad eine Datei namens ttyACM0 (solange die Datei existiert ist das Gerät an den lxc gebunden)*

![proxmoxlxc17](media/proxmox/proxmoxlxc17.PNG)

***major device number und ttyACM.. ggbfs. anpassen***

Anschließend muss noch der Eintrag der lxc Konfigurationsdatei angepasst werden:

~~~
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
~~~

wird ersetzt durch:

~~~
lxc.mount.entry: /var/lib/lxc/CONTAINERID/devices/ttyACM0 dev/ttyACM0 none bind,optional,create=file
~~~

</details>

