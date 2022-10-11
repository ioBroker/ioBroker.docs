---
title:       "ioBroker Installation unter Linux"
lastChanged: "11.10.2022"
---


!> Diese Anleitung gilt NICHT für fertige Images der Webseite! Die hier beschriebene manuelle Installation ist einem Image gegenüber zu bevorzugen! 

## Allgemeines
Die manuelle Installation von ioBroker erfolgt über ein Skript, welches die notwendigen 
Installationsschritte durchführt und evtl. noch erforderliche Softwarepakete nachlädt.
Während der Installation wird im System ein neuer Benutzer “iobroker” angelegt sowie ein
zugehöriges Home-Verzeichnis (/home/iobroker). Der ioBroker läuft dann unter diesem User. 

Diese Installationsanleitung beschreibt eine *Neuinstallation* von ioBroker auf Linux am 
Beispiel vom Raspberry Pi mit Raspberry OS 'Bullseye'. 

## Benötigte Hardware

***Raspberry Pi 2/3/4*** mit Raspberry OS oder jede andere beliebige Hardware mit einem 
gängigen Linux. Empfohlen wird jedoch Debian, Ubuntu oder eine der darauf basierenden Distributionen. 

Wir raten davon ab, einen Pi 1 als Master einzusetzen, da dieser einfach nicht leistungsstark 
genug (500 MB RAM, usw.) ist. Aufgrund der unterschiedlichen Hardware passt diese Anleitung 
ohnehin nicht für einen Pi 1.

Auch ein Pi 2 oder Pi 3 hat nur max. 1 GB RAM. Bei 15 Adapter-Instanzen sollte dieser noch 
ausreichen, aber darüberhinaus kann es knapp werden. Jede Adapter-Instanz benötigt etwa 40 MB 
(und auch schon mal 200MB und mehr) an RAM. Daher sollte immer die RAM-Auslastung im Auge behalten 
werden, bevor weitere Adapter-Instanzen aktiviert werden – 1 GB RAM sind endlich.

Daher empfiehlt sich aus der Raspberry-Reihe der Raspberry4 mit 4, besser 8 GB RAM. 

Es ist wichtig ein gutes ***Netzteil*** zu haben. Mit schwachem Netzteil (z.B. Handy Netzteile) 
sind Stabilitätsprobleme zu erwarten.

***Speicherkarte*** oder SSD, USB-Stick, usw. (je nach verwendeter Hardware)

## benötigte / wichtige Links
* Download Image: https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/  **oder**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installationsanleitung

* Das gewünschte Basis-Betriebssystem (Raspberry OS Bullseye, Ubuntu, Debian, usw.) – je nach verwendeter Hardware installieren.

  Hilfe und Anleitungen zu den jeweiligen Versionen gibt es auf entsprechenden Supportseiten, Youtube, usw.
  
?> ioBroker arbeitet als Server 24/7 und wird über Terminalprogramme wie Putty o.ä. administriert. Ein Desktop zu installieren bindet Ressourcen und ist nicht notwendig!

?> Wir raten, aus den bekannten Sicherheitsaspekten, davon ab den Root Zugang für SSH freizuschalten. Für die Installation von ioBroker reicht es aus, *sudo* dem jeweiligen Befehl voran zu stellen.

* Über die Konsole und je nach verwendetem OS ein System-Update  mit ``sudo apt-get update && sudo apt-get upgrade`` bzw. ``sudo apt update && sudo apt upgrade`` durchführen.

* ioBroker mit dem ``curl -sLf https://iobroker.net/install.sh | bash -`` installieren.

  Es wird das Installationsskript ausgeführt. Je nach Hardware kann die Installation dauern.
  
  Die Installation erfolgt in 4 Schritten welche in der Konsole zu sehen sind:

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  Zum Abschluss kommt dann noch die Meldung 
  
  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

ioBroker kann nun über die angegebene IP im Webbrowser aufrufen werden ``http://<IP-Adresse>:8081`` und eingerichtet werden.
