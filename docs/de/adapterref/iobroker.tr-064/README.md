---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Die Info
Dieser Adapter liest wichtige Informationen aus der AVM Fritz!Box, wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Basierend auf diesem [AVM Dokumentationen](https://avm.de/service/schnittstellen/)

### Einfache Zustände und Funktionen
- WLAN für 2,4 GHz und 5 GHz ein-/ausschalten,
- WLAN für Gäste ein-/ausschalten,
- Fritz!Box neu starten,
- WPS-Prozess starten,
- Internet erneut verbinden
- externe IP-Adresse

### Klingeln (eine Nummer wählen)
- Wenn Sie eine interne Nummer (wie **610) verwenden, lässt der Klingelstatus das interne Telefon klingeln.

zB: **610[,timeout]

- Wenn Sie eine externe Nummer verwenden, werden Sie über den Klingelzustand mit der externen Nummer verbunden.

Die FritzBox ruft die externe Nummer an und Ihr Standardtelefon klingelt, wenn der Anruf entgegengenommen wird.
Das Standardtelefon kann in der FritzBox unter: Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden konfiguriert werden.

### ToPauseState
- Werte: Klingeln, Verbinden, Ende
- Kann verwendet werden, um einen Videoplayer bei einem eingehenden Anruf (Klingeln) oder beim Abheben des Telefons (Verbinden) anzuhalten.
- Die Wiederaufnahme kann auf der Grundlage des Endwerts erfolgen.

### Präsenz
Sie können eine Liste der abzuhörenden Geräte konfigurieren.
Kann durch mDNS ausgelöst werden. Bei Verwendung von MDNS ist kein Polling erforderlich und es ist schneller

### AB – Anrufbeantworter
Kann ein-/ausgeschaltet werden.
Der Status cbIndex kann auf die Adresse des Anrufbeantworters gesetzt werden.

### Anrufmonitor
Der Callmonitor erstellt Echtzeitzustände für jeden eingehenden und ausgehenden Anruf.
Wenn das Telefonbuch aktiviert ist (Standard), werden Nummern in Namen aufgelöst. Es gibt auch einen Zustand, der ein klingelndes Telefon anzeigt.

### Telefonbuch
- Wenn das Telefonbuch aktiviert ist, wird es verwendet, um den Namen und die Telefonnummer des Anrufers abzurufen.
- Weiterhin gibt es drei Zustände um eine Nummer oder einen Namen aufzulösen. Falls verfügbar wird auch die Bild-URL des Kontakts angezeigt.

Beispiel: Wenn Sie den Status „phonebook.number“ festlegen, werden alle 3 Status, Name, Nummer und Bild für den gefundenen Kontakt festgelegt. Beachten Sie, dass bei der Suche nach Namen zuerst der vollständige Name verglichen wird. Wenn dieser nicht gefunden wird, wird ein Teil davon verwendet.

### Anruflisten
Ausgabeformate:

- json
- html

Anruflisten sind:

- alle Anrufe
- verpasste Anrufe
- eingehende Anrufe
- ausgehende Anrufe

Anrufzähler: Der Anrufzähler kann auf 0 gesetzt werden. Beim nächsten Anruf wird er um 1 erhöht.

Die HTML-Ausgabe kann über eine Vorlage konfiguriert werden

### Befehl & Befehlsergebnisstatus
Mit dem Befehl state können Sie von diesem [Dokumentation](https://avm.de/service/schnittstellen/) aus jeden tr-064-Befehl aufrufen.
z.B.

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Der Befehlsstatus sollte auf ein JSON der obigen Zeilen gesetzt werden. Also { ... } (ohne command = und Zeilenumbrüche). Der Rückruf des Aufrufs setzt den Befehlsstatus „commandResult“.

### Anrufmonitor aktivieren
Um die Anrufüberwachungsfunktion nutzen zu können, muss sie zunächst in der AVM Fritz!Box aktiviert werden.
Um die Anrufüberwachung zu aktivieren, wählen Sie ```#96*5*``` und der TCP/IP-Port 1012 wird geöffnet. Um den Port zu schließen, wählen Sie ```#96*4*```.

### Vorabversionen
Vorabversionen sind bei npm mit dem Tag dev verfügbar.
Sie können sie aus dem ioBroker-Stammverzeichnis mit folgendem Befehl installieren:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller verisons

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure active status of devices in jsonDeviceList is correct

### 4.2.16 (2022-03-21)
* (Apollon77) Fix info logs on callee/caller
* (Apollon77) Add special handling for potential broken external image links in phonebook
* (Apollon77) Prevent some crash cases reported by Sentry

### 4.2.15 (2021-12-08)
* (bluefox) fix crash case (Sentry IOBROKER-TR-064-35)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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