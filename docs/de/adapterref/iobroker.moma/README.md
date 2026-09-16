---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.moma/README.md
title: kein Titel
hash: Ix3OpWeB2VypjxxdUXrFWxN+Ra/jToA8BhsRSe1OhwE=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.moma.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Anzahl der Installationen](http://iobroker.live/badges/moma-installed.svg)
![Stabile Version](http://iobroker.live/badges/moma-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)

<h1>
	<img src="admin/moma.png" width="64"/>
	ioBroker.moma
</h1>

## MAMA-Adapter für ioBroker

**MoMa** ist ein Adapter zur **Überwachung** und **Wartung** von ioBroker-basierten Hausautomatisierungssystemen. **MoMa** ist für komplexere Hausautomatisierungssysteme konzipiert, die über einen einzelnen Rechner mit All-in-One-Funktionalität oder wenige Rechner mit einfacher Lastverteilung innerhalb eines Netzwerks hinausgehen.

Es ist nicht als Ersatz für Administrationswerkzeuge wie **Puppet** , **Chef** , **Salt** oder **Ansible** gedacht. Diese sind für große Umgebungen mit vielen Computern konzipiert und ermöglichen die Ferninstallation von Paketen. **MoMa** kann lediglich bestehende Installationen per Fernzugriff aktualisieren, jedoch keine Ferninstallationen oder Fernkonfigurationen durchführen.

**Aufmerksamkeit:**

Wenn Sie den JavaScript-Adapter verwenden, setzen Sie das Flag "do not register all states on startup" auf true, wenn der Fehler "RangeError: Maximum call stack size exceeded" auftritt.<br> Wenn Sie alle Zustände beim Start registrieren, löst jede Zustandsänderung auch ein Ereignis im JavaScript-Adapter aus. Insbesondere unter Windows kann diese größere Anzahl an Ereignissen problematisch werden.<br> Eine weitere Lösung besteht darin, den Zeitwert für Intervall0 zu erhöhen.

MoMa verwendet die plattformunabhängige Bibliothek „systeminformation“ ( <https://github.com/sebhildebrandt/systeminformation> ), um Informationen über den Computer zu sammeln. Viele der Aufrufe können in Zeitintervallen ausgeführt werden – siehe untenstehende Referenz.

MoMa benötigt mindestens Node.js Version 10.

## Installation

Verfügbar im ioBroker-Repository „latest“

Alternative:

npm install iobroker.moma

Funktioniert auch in Multi-Host-Umgebungen – stellen Sie vor der Installation sicher, dass die richtige Instanz ausgewählt ist.

**Achtung:** Derzeit müssen Sie als Workaround auf jedem Slave eine Instanz des Admin-Adapters installieren. Der Admin-Adapter muss nicht aktiv sein!

## Kernkonzept

Noch im Aufbau – Ideen, Vorschläge, Hinweise usw. sind willkommen!

Forum: <https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma>

GitHub: <https://github.com/AWhiteKnight/ioBroker.moma>

Die Grundidee ist, dass man

- Für jede Instanz (moma.\<instance-id>) wird ein Baum erstellt, der alle Informationen über den Rechner enthält, auf dem die Instanz ausgeführt wird.
- ein gemeinsamer Baum (moma.meta), unterhalb dessen jede Instanz ein Gerät \<hostname> erstellt, das einen Verweis auf die Instanz und einige Überwachungsinformationen enthält.
- ein Admin-Tab für Wartungsarbeiten (Aktualisierungen des Betriebssystems, des JS-Controllers und der Adapter).

## Referenz

Über den Admin-TabMoMa können Sie Aktualisierungen starten oder, falls erforderlich, einen Neustart durchführen.

Folgende Funktionen des Bibliothekssystems werden beim Start einmalig aufgerufen:

- Grundplatte – Informationen über das Motherboard von Computern
- Chassis – Informationen über Computergehäuse
- BIOS – Informationen über das Computer-BIOS
- System – Informationen über den Computerhersteller
- CPU – Informationen über die CPU von Computern
- cpuFlags – Verfügbare CPU-Flags
- memLayout – Informationen über Computerspeicherchips
- diskLayout – Informationen über Computerfestplatten

Folgende Funktionen des Bibliothekssystems werden im Intervall 0 (standardmäßig jede Sekunde) aufgerufen:

- Zeit – Tatsächliche Zeit, Zeitzone und Betriebszeit
- Aktuelle CPU-Geschwindigkeit – Tatsächliche CPU- und Kernfrequenzen
- Netzwerkverbindungen – Tatsächliche Netzwerkverbindungen
- aktuelle Auslastung - Tatsächliche CPU-Auslastung
- Prozesse – Prozessübersicht mit process.list als HTML-Tabelle

Folgende Funktionen des Bibliothekssystems werden im Intervall 1 aufgerufen (standardmäßig alle 10 Sekunden):

- mem – Informationen zur Speichernutzung
- CPU-Temperatur - Temperaturen der CPU und ihrer Kerne
- Netzwerkstatistik – Netzwerkstatistik
- Volllast – Durchschnittliche Auslastung seit dem letzten Systemstart

Folgende Funktionen des Bibliothekssystems werden im Intervall 2 aufgerufen (standardmäßig jede Minute):

- Batterie – Ladezustand und Informationen zur Batterie
- Benutzer - Aktuelle Benutzersitzungen
- fsSize – Informationen über das Dateisystem von Computern
- blockDevices - Verbundene Blockgeräte
- fsStats – Dateizugriffsstatistik – wird unter Windows nicht unterstützt
- disksIO – E/A-Statistiken von Blockgeräten – wird unter Windows nicht unterstützt

Folgende Funktionen des Bibliothekssystems werden im Intervall 3 aufgerufen (standardmäßig stündlich):

- networkInterfaceDefault - Standard-Netzwerkschnittstelle
- Netzwerkschnittstellen - Verfügbare Netzwerkschnittstellen
- Grafik – Informationen über Computergrafikkarten und angeschlossene Monitore
- inetLatency – Überprüfen Sie die Internetlatenz gegenüber 8.8.8.8.
- dockerInfo – Allgemeine Informationen zu Docker – benötigt den Befehl „adduser iobroker docker“ auf dem Rechner, damit es ordnungsgemäß funktioniert.
- dockerContainers – Liste aller Docker-Container – benötigt den Befehl „adduser iobroker docker“ auf dem Rechner, damit es ordnungsgemäß funktioniert.

Folgende Funktionen des Bibliothekssystems werden im Intervall 4 (standardmäßig täglich) aufgerufen:

- osInfo – Informationen über das Betriebssystem von Computern
- uuid - UUIDs der Installation
- Shell – Standard-Systemshell – wird unter Windows nicht unterstützt
- Versionen – Versionen der installierten Softwarepakete

Folgende Funktionen von **MoMa** werden im Intervall 4 aufgerufen (standardmäßig täglich):

- Updates – prüft auf ausstehende Updates und zeigt die Anzahl der Updates in moma.meta.\<Hostname>.updates an (derzeit nur Ubuntu, Debian, openSUSE, RedHat)
- checkIob – prüft alle Adapter und den JS-Controller auf verfügbare Updates
- checkBatteries - prüft Batteriestatusvariablen (derzeit implementierte Statusnamen: LOWBAT, LOW\_BAT)

## Changelog

### 1.2.9 (2021-08-17)
* (AWhiteKnight) issue2 #53-55, upgrade to systeminformation lib 5.8.0, update all dependencies

### 1.2.8 (2021-03-26)
* (AWhiteKnight) eliminate warning messages (issue #52), upgrade to systeminformation lib 5.6.8
	- in systeminformation many states of currentLoad have been renamed. The old ones will be deleted and the new ones created. Have a look into the logs.

### 1.2.7 (2020-10-18)
* (AWhiteKnight) remove leading i in names that are not a number, systeminformation lib 4.27.0 

### 1.2.6 (2020-04-27)
* (AWhiteKnight) fix typo, precise error location, systeminformation lib 4.23.6 

### 1.2.5 (2020-04-12)
* (AWhiteKnight) minor bugfixing, prepare stable release 

### 1.2.4 (2020-03-20)
* (AWhiteKnight) bugfixing: issues #45 #42 #24, controller update working again 

### 1.2.3 (2019-11-06)
* (AWhiteKnight) bugfixing, code cleanup 

### 1.2.2 (2019-09-12)
* (AWhiteKnight) ioBroker adapter/controller updates for windows, issue #24 

### 1.2.1 (2019-08-12)
* (AWhiteKnight) Bugfixing on 1.2.0 

### 1.2.0 (2019-07-26)
* (AWhiteKnight) Library 'systeminformation' version 4.14.4, 
                 check for update of Adapters and JS-Controller in Interval 4,
				 dockerInfo, dockerContainers in Interval 3,
				 moma admin-tab with update buttons for os, js-controller, adapters.

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization,
				 partial fix of Issu #24,
				 Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

### 0.0.1
* (AWhiteKnight) initial version

## License
MIT License

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

Copyright (c) 2021 AWhiteKnight