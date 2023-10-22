---
title:       "Linux"
lastChanged: "11.10.2022"
---

Auf diser Seite wird beschrieben, wie ioBroker unter Linux installiert wird

# Linux & Raspberry Pi

Die Installation von ioBroker erfolgt über ein Skript, welches die notwendigen 
Installationsschritte durchführt und evtl. noch erforderliche Softwarepakete nachlädt.
Während der Installation wird im System ein neuer Benutzer “iobroker” angelegt sowie ein
zugehöriges Home-Verzeichnis (/home/iobroker). Der ioBroker läuft dann unter diesem User. 


## Voraussetzungen prüfen
Vor der Installation prüfe bitte, ob das System alle notwendigen [Installationsvoraussetzungen](requirements.md) erfüllt.

## Wichtige Punkte die beachtet werden müssen
- KEINE Installation von ioBroker als root User
- ioBroker arbeitet als Server 24/7 und wird über Terminalprogramme wie Putty o.ä. administriert. Ein Desktop zu installieren bindet Ressourcen und ist nicht notwendig!
- Wir raten, aus den bekannten Sicherheitsaspekten, davon ab den Root Zugang für SSH freizuschalten. Für die Installation von ioBroker reicht es aus, *sudo* dem jeweiligen Befehl voran zu stellen.
- Einsteiger sollten mit Debian (Raspberrypi OS / Armbian) ohne weitere zusätzliche Schichten/Ebenen wie Docker, proxmox (bes. lxc) beginnen, da mit jeder weiteren Ebene weiterer administrativer Aufwand und mögliche Problemquellen hinzukommen.
Eigenen User anlegen (der nicht iobroker heißt, dieser wird bereits verwendet)
- Benötigte Hardware: Raspberry Pi mit Raspberry OS oder jede andere beliebige Hardware mit einem gängigen Linux. Empfohlen wird jedoch Debian, Ubuntu oder eine der darauf basierenden Distributionen. 
- Hardware Raspberry Pi: Es ist wichtig ein gutes ***Netzteil*** zu haben. Mit schwachem Netzteil (z.B. Handy Netzteile) 
sind Stabilitätsprobleme zu erwarten.


## Raspberry Pi Installationsanleitung
Anleitung zur Installation von ioBroker auf einem Raspberry Pi: https://forum.iobroker.net/topic/51869/installation-auf-raspi-einfacher-geht-s-nicht

## Linux Installationsanleitung

* Das gewünschte aktuelle Basis-Betriebssystem (Raspberry OS,  Debian, Ubuntu, usw.) – je nach verwendeter Hardware installieren.

  Hilfe und Anleitungen zu den jeweiligen Versionen gibt es auf entsprechenden Supportseiten, Youtube, usw.
  
* Verwende für die Installation einen normalen User und verwendet NICHT den root User

* Über die Konsole und je nach verwendetem OS ein System-Update  mit ``sudo apt update && sudo apt full-upgrade`` durchführen.

* ioBroker mit dem Befehl ``curl -sLf https://iobroker.net/install.sh | bash -`` installieren.

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


# Docker
## Voraussetzungen prüfen
Vor der Installation prüfe bitte, ob das System alle notwendigen [Installationsvoraussetzungen](requirements.md) erfüllt.

## Installation
Auf dieser Seite findest du die offizielle Dokumentation, um ioBroker unter Docker zu installieren: https://docs.buanet.de/de/iobroker-docker-image/docs/