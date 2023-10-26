---
title:       "Linux"
lastChanged: "23.10.2022"
---


# ioBroker Installation unter Linux & auf einem Raspberry Pi

Die Installation von ioBroker erfolgt über ein Skript, welches die notwendigen 
Installationsschritte durchführt und evtl. noch erforderliche Softwarepakete nachlädt.


## Voraussetzungen prüfen
Vor der Installation prüfe bitte, ob das System alle notwendigen [Installationsvoraussetzungen](./requirements.md) erfüllt.

## Wichtige Punkte die beachtet werden müssen

- KEINE Installation von ioBroker als **root** User! Das Ausführen des Installationsskriptes **muss** als ein normaler User durchgeführt werden,
durch diesen User wird auch das System zukünftig administriert. Der `normale` User sollte, nicht `iobroker` heißen, es sollte der bei der Basisinstallation, angelegte User sein.
- Benötigte Hardware: Raspberry Pi mit Raspberry OS oder jede andere beliebige Hardware mit einem gängigen Linux. Empfohlen wird jedoch Debian, Ubuntu oder eine der darauf basierenden Distributionen 
- Einsteiger sollten mit Debian / Raspberrypi OS / Armbian ohne  zusätzliche Virtualisierungsschicht wie Docker oder Proxmox beginnen, da mit jeder weiteren Ebene weiterer administrativer Aufwand und mögliche Problemquellen hinzukommen
- Installiere dein Betriebssystem als Servervariante ohne einen Desktop
  - ioBroker arbeitet als Server 24/7 und wird über Terminalprogramme wie Putty, Powershell o.ä. administriert. Eine Desktop Umgebung verbraucht unnötige Ressourcen und vergrößert das Fehlerpotential
- Hardware Raspberry Pi: Es ist wichtig ein gutes Netzteil zu verwenden. Mit schwachem Netzteil (z.B. Handy Netzteile) 
sind Stabilitätsprobleme zu erwarten


## Raspberry Pi 
Anleitung zur Installation von ioBroker auf einem Raspberry Pi: https://forum.iobroker.net/topic/51869/installation-auf-raspi-einfacher-geht-s-nicht

## Linux 

* Das gewünschte aktuelle Basis-Betriebssystem (Debian, Ubuntu, usw.) – je nach verwendeter Hardware installieren.

  Hilfe und Anleitungen zu den jeweiligen Versionen gibt es auf entsprechenden Supportseiten, Youtube, usw.
 
* Über die Konsole und je nach verwendetem OS ein System-Update  mit ``sudo apt update && sudo apt full-upgrade`` durchführen.

* ioBroker mit dem Befehl ``curl -sLf https://iobroker.net/install.sh | bash -`` installieren.

  Es wird das Installationsskript ausgeführt. Je nach Hardware kann die Installation etwas Zeit in Anspruch nehmen.
  
  Die Installation erfolgt in 4 Schritten welche in der Konsole zu sehen sind:

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  Zum Abschluss kommt dann noch die Meldung 
  
  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

ioBroker kann nun über die angegebene IP im Webbrowser aufgerufen werden ``http://<IP-Adresse>:8081`` und eingerichtet werden.


# ioBroker Installation unter Docker
## Voraussetzungen prüfen
Vor der Installation prüfe bitte, ob das System alle notwendigen [Installationsvoraussetzungen](./requirements.md) erfüllt.


## Installation
Auf dieser Seite findest du die offizielle Dokumentation, um ioBroker unter Docker zu installieren: https://docs.buanet.de/de/iobroker-docker-image/