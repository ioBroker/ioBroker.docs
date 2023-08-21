---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.multicast/README.md
title: Multicast-API-Adapter für ioBroker
hash: XlqUkNYCj9aeZw7d9E3YOLDU99ujqoUYwCtqx3WXJlU=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.multicast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/multicast-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/multicast-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/DrozmotiX/ioBroker.multicast/master.svg)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker.multicast

</h1>

# Multicast-API-Adapter für ioBroker
Dieser Adapter bietet eine auf dem Multicast-Kommunikationsprotokoll basierende API zum Senden und Empfangen von Zuständen an Geräte mit benutzerdefinierter Firmware.

Zweck dieses Adapters war:

* bieten eine Alternative zu http-Post und MQTT-Protokoll
* Verfügen Sie über eine einheitliche API basierend auf Multicast-Kommunikation und JSON-formatierter Datenübertragung
* Halten Sie einen Zero-Touch-Adapter bereit, um jedes Ethernet-Gerät zu integrieren (Beispiel: ESP-basiertes Board eq Wemos D1 mini), wie Vansware/Gosound Smart Plugs oder andere benutzerdefinierte Build-Automatisierungen.

### Nullberührung?
Das APi ist so aufgebaut, dass keine zusätzliche Konfiguration des Endbenutzers im Adapter selbst oder im zu verwendenden Gerät erforderlich ist.
Falls die Wi-Fi-Umstellung verwendet wird, müssen nur die Wi-Fi-Anmeldeinformationen angegeben werden (LAN-basierte Geräte werden vollautomatisch gehandhabt).
Dies erfordert Aufwand seitens des Entwicklers der Binärdatei, die auf dem entsprechenden Chipsatz (z. B. ESP-basierten Chipsätzen) geflasht werden muss.

Wenn die Firmware alle Regeln des APi befolgt (siehe weiter unten), wird die Kommunikation wie folgt gehandhabt:

* Gerät sendet Statuswerte per UDP-Multicast
* Der Adapter erkennt diese Nachricht und prüft, ob in ioBroker Zustände für dieses Gerät vorhanden sind

#### Neues Gerät
Aus einer vorherigen Nachricht geht hervor, dass der Adapter kein Gerät gefunden hat. Die folgende Routine wird ausgeführt:

* ioBroker sendet eine Broadcast-Nachricht, um das Gerät zu initialisieren
* Das Gerät sendet alle Zustände und die zugehörige Struktur an ioBroker
* ioBroker erstellt das neue Gerät und alle erforderlichen Zustände
* Wenn alle Zustände erstellt sind, sendet ioBroker einen Handshake an das Gerät „bereit zum Empfangen von Daten“.
* Das Gerät beginnt, seine Zustände in Intervallen oder durch Änderungen zu senden (wie durch die Firmware-Konfiguration definiert).

#### Wiederverbindung bestehender Geräte
Aus einer vorherigen Nachricht geht hervor, dass der Adapter angegeben hat, dass das Gerät bereits vorhanden ist. Die folgende Routine wird ausgeführt:

* ioBroker prüft, ob die Konfiguration auf „Wiederherstellen“ eingestellt ist.
* Wenn die Wiederherstellung aktiviert ist, sendet ioBroker alle Zustände (außer Info-Zustände) an das Gerät
* Wenn alle Zustände empfangen wurden, sendet das Gerät einen Handshake an ioBroker „Bereit zum Empfangen von Daten“.
* ioBroker bestätigt
* Das Gerät beginnt, seine Zustände in Intervallen oder durch Änderungen zu senden (wie durch die Firmware-Konfiguration definiert).

#### Zustandsänderungen
Der Adapter ist so konzipiert, dass er bis zu fünf Wiederholungsversuche sendet, um sicherzustellen, dass alle Statusänderungen vom Gerät empfangen werden. Dieser Vorgang wird wie folgt abgewickelt:

* Der Status wurde in ioBroker geändert
* Der Adapter erkennt die Wertänderung und sendet den neuen Wert an das Gerät
* Das Gerät muss die Nachricht innerhalb von 500 ms bestätigen
* Wenn die Nachricht nicht bestätigt wird, sendet der Adapter den Wert erneut
* Dies wird bis zu maximal 5 Wiederholungen durchgeführt. Danach wird eine Fehlermeldung angezeigt, die auf einen Kommunikationsverlust hinweist

### APi-Struktur und Dokumentation
{ noch zu erledigen / in Bearbeitung }

## To-Do geplant:
* [] Implementieren Sie Warteschlangen, warten Sie 20 ms nach der Statusänderung für ein Gerät und senden Sie ein Array mit allen Statusaktualisierungen
* [x] Implementieren Sie den Ablaufwert per API
* [x] Zustandswiederholung optimieren, nicht alle 500 ms weitere Warteschlange auslösen
* [x] Wiederherstellungsdaten senden, wenn Harbert empfangen wird und die Verbindung zum Gerät FALSCH ist
* [x] Gerätezustände (Fähigkeit für Werteliste)
* [x] Korrekte Handhabung von Hostnamen und Hostnamenänderungen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* ([Andiling](https://github.com/andiling)) Expire value by API implemented
* (DutchmanNL) Rebuild retry functionality

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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