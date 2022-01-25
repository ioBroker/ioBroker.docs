---
title:       "Update NodeJS"
lastChanged: "30.05.2019"
---

# Update [Node.JS](https://nodejs.org/)
 
Wer mehr über Node.JS wissen will findet bei [Wikipedia einen Artikel](https://de.wikipedia.org/wiki/Node.js) dazu.

### Ablauf:
1. __Backup erstellen:__  
Es gibt verschiedene Varianten ein Backup zu erstellen, entweder das eingebaute Backup oder den Backitup Adapter. 
Weitere Möglichkeiten sind abhängig davon wie/wo ioBroker installiert ist.  
  
2. __Adapter Aktualisieren:__  
Damit es nach dem Update zu keinen Inkompatibilitäten oder Probleme kommt, sollte man alle Adapter prüfen und aktualisieren.  
Vor allem Adapter mit nativen Bestandteilen, z.b Serialport oder Bluetooth können Probleme bereiten.  
Es sollte geprüft werden ob die im System verwendeten Adapter mit der neuen Node.JS version Kompatibel sind. In den meisten fällen findet man informationen dazu im [Changelog](TBD) des Adapters. Selbiges findet sich in der Readme des Adapters, was im [Admin](https://www.iobroker.net/#de/documentation/admin/README.md) abgerufen werden kann oder direkt auf der Github Seite des Adapters.  
  
3. __ioBroker stoppen:__  
Dazu wird das ioBroker eigene Kommando verwendet oder die Systemdienst Verwaltung.  

4. __Prüfen ob ioBroker Vollständig gestoppt wurde:__  
In der Regel werden alle Prozesse durch ioBroker beendet, es kann jedoch vorkommen das einzelne Prozesse weiter laufen.  Daher sollte dieser Schritt unebdingt durchgeführt werden und noch laufende Prozesse beendet werden.  
  
5. __Node.JS Update:__  
Das Update entspricht einer Neu installation, weshalb die selben Befehle wie bei der Installation verwendet werden.
Die Installation Unterscheidet sich je nach verwendetem Betriebssystem, siehe hierzu die Anleitungen zu den jeweiligen Betriebssystemen.  
**Wichtig:** Mit Node.JS wird auch npm Aktualisisert. Bei ioBroker Installationen die mit einer npm Version kleiner 7.x installiert wurden kann es passieren, dass sich keine Adapter mehr installieren oder Updaten lassen.  In diesem Fall muss npm in der Version 6.14.16 installiert werden.  
  
6. __Versionen & Pfade Prüfen:__  
Um sicher zu stellen dass das Update erfolgreich war werden die Version & Pfade von Node.JS und npm Überprüft.   
  
7. __ioBroker fixer Ausführen:__  
 Mit dem Update von Node.JS gibt es einige Änderungen am System, um hier mögliche Probleme für ioBroker zu beheben wird der ioBroker fixer ausgeführt.  
 Er stellt unter anderem die für den Betrieb von ioBroker notwendigen Sicherheitseinstellungen wieder her, prüft und korrigiert alle Berechtigungen.  
   
8. __ioBroker Start:__  
Einige verwendete JavaScript Module beinhalten Teile die [Kompiliert](https://de.wikipedia.org/wiki/Compiler) werden müssen, dieser Prozess findet bei der Installation statt. Durch das Kompilieren sind diese Module an die Node.JS Version gebunden.
Nachdem Update müssen diese Teile neu Kompiliert werden.  
Seit JS-Controller Version 3.0 wird versucht, Adapter die solche Teile beinhalten, zu erkennen und einen rebuild durch zu führen.  
Dieser Prozess kann eingie Zeit in Anspruch nehmen und die betroffenen Adapter können mehrfach neu starten.

----

### Anleitung für Debian und Ubuntu: 
1. Backup:   
```
    iobroker backup 
```
oder  
[Alternative variante](https://www.iobroker.net/#de/documentation/config/backup.md)  
  
2. [Adapter Aktualisieren](https://www.iobroker.net/#de/documentation/tutorial/adapter.md?upgradeeinesadapters)  
  
3. ioBroker stoppen: 
```
iobroker stopp
```  
  
4. Prüfen ob iobroker Vollständig beendet wurde mit [ps](https://wiki.ubuntuusers.de/ps/):   
```
ps aux | grep 'backup\|PID'
```  
und
```
ps auxww | grep 'io\|PID'
```
Bei bedarf
```
sudo kill -9 <ProzessID>
```  
  
5. [Node.JS Update](https://github.com/nodesource/distributions#installation-instructions)  
  
6. Versionen & Pfade Prüfen:  
```
which nodejs node npm && nodejs -v && node -v && npm -v
```  
  
7. ioBroker fixer Ausführen:  
```
iobroker fix
```  
  
 8. ioBroker Starten:  
 ```
 iobroker start
 ``` 

