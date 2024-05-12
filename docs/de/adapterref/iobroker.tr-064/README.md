---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: rN4KkHkTgQi739/0GZDQZ274L23nvqhd+4OxJHA44Ww=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Die Info
Dieser Adapter liest wichtige Informationen aus der AVM Fritz!Box, wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Auf dieser Grundlage [AVM-Dokumentationen](https://avm.de/service/schnittstellen/)

### Einfache Zustände und Funktionen
- WLAN für 2,4 GHz und 5 GHz ein-/ausschalten,
- Gast-WLAN ein-/ausschalten,
- Fritz!Box neustarten,
- WPS-Prozess starten,
- Internet wieder verbinden
- externe IP-Adresse

### Klingeln (Nummer wählen)
- Wenn Sie eine interne Nummer (wie **610) verwenden, lässt der Klingelstatus dieses interne Telefon klingeln.

Bsp.: **610[,timeout]

- Wenn Sie eine externe Nummer verwenden, verbindet Sie der Klingelstatus mit der externen Nummer.

Die FritzBox ruft die externe Nummer an und Ihr Standardtelefon klingelt, wenn das angerufene Telefon abgenommen wird.
Das Standardtelefon kann in der FritsBox konfiguriert werden unter: Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### ToPauseState
- Werte: klingeln, verbinden, beenden
- Kann verwendet werden, um einen Videoplayer bei einem eingehenden Anruf (Klingeln) oder beim Abheben des Telefons (Verbinden) anzuhalten.
- Fortsetzen kann auf dem Endwert erfolgen.

### Präsenz
Sie können eine Liste von Geräten konfigurieren, auf die Sie hören möchten.
Kann durch mDNS getriggert werden. Bei Verwendung von MDNS ist kein Polling erforderlich und es ist schneller

### AB - Anrufbeantworter (Anrufbeantworter)
Kann ein-/ausgeschaltet werden.
Der Status cbIndex kann auf die Adresse # des Anrufbeantworters gesetzt werden.

### Anrufüberwachung
Der Anrufmonitor erstellt für jeden eingehenden und ausgehenden Anruf Echtzeitzustände.
Wenn das Telefonbuch aktiviert ist (Standardeinstellung), werden Nummern in Namen aufgelöst. Es gibt auch einen Status, der ein klingelndes Telefon anzeigt.

### Telefonbuch
- Das Telefonbuch, falls aktiviert, wird verwendet, um den Namen der Telefonnummer des Anrufers zu erhalten.
- Weiterhin gibt es drei Zustände um eine Nummer oder einen Namen aufzulösen. Falls vorhanden, erhalten Sie auch die Bild-URL des Kontakts.

  z.B.: wenn Sie den Zustand phonebook.number einstellen, werden alle 3 Zustände, Name, Nummer und Bild auf den gefundenen Kontakt gesetzt. Beachten Sie, dass Suchen nach Namen zuerst den vollständigen Namen vergleichen, wenn er nicht gefunden wird, wird ein Teil davon verwendet.

### Anruflisten
Ausgabeformate:

- json
- Html

Anruflisten sind:

- alle Anrufe
- verpasste Anrufe
- eingehende Anrufe
- ausgehende Anrufe

Anrufzähler: Der Anrufzähler kann auf 0 gesetzt werden. Der nächste Anruf wird um 1 erhöht.

Die HTML-Ausgabe kann durch ein Template konfiguriert werden

### Befehl & BefehlErgebnisstatus
Mit dem Befehlsstatus können Sie jeden tr-064-Befehl von diesem [Dokumentation](https://avm.de/service/schnittstellen/) aufrufen.
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

Der Befehlsstatus sollte auf ein JSON der obigen Zeilen gesetzt werden. Also { ... } (ohne command = und Zeilenumbrüche) Der Callback des Aufrufs setzt den Zustand commandResult.

### Anrufüberwachung aktivieren
Um die Anrufüberwachungsfunktion nutzen zu können, muss diese zunächst in der AVM Fritz!Box aktiviert werden.
Um den Anrufmonitor zu aktivieren, wählen Sie ```#96*5*``` und der TCP/IP-Port 1012 wird geöffnet. Um den Port zu schließen, wählen Sie ```#96*4*```.

### Vorabversionen
Vorabversionen sind bei npm mit dem Tag dev verfügbar.
Sie können sie aus dem ioBroker-Stammverzeichnis installieren mit:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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