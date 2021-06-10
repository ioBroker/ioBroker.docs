---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

#ioBroker.tr-064
### Die Info
Dieser Adapter liest die wichtigsten Informationen der AVM Fritz!Box, wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Auf dieser Grundlage [AVM Dokumentationen](https://avm.de/service/schnittstellen/)

### Einfache Zustände und Funktionen
- WLAN für 2,4 GHz und 5 GHz ein-/ausschalten,
- Gäste-WLAN ein-/ausschalten,
- Fritz!Box neu starten,
- WPS-Prozess starten,
- Internet wieder verbinden
- externe IP-Adresse

### Klingeln (wählen Sie eine Nummer)
- Wenn Sie eine interne Nummer (wie **610) verwenden, lässt der Rufstatus das interne Telefon klingeln.

z.B.: **610[,Zeitüberschreitung]

- Bei Verwendung einer externen Nummer verbindet Sie der Ruftonstatus mit der externen Nummer.

Die FritzBox ruft die externe Nummer an und Ihr Standardtelefon klingelt, wenn das angerufene Telefon abgenommen wird.
Das Standardtelefon kann in der FritsBox konfiguriert werden unter: Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### ToPauseState
- Werte: klingeln, verbinden, beenden
- Kann verwendet werden, um einen Videoplayer bei einem eingehenden Anruf (Klingeln) oder beim Abheben des Telefons (Verbinden) anzuhalten.
- Resume kann am Endwert erfolgen.

### Präsenz
Sie können eine Liste der zu hörenden Geräte konfigurieren.
Kann durch mDNS ausgelöst werden. Bei Verwendung von MDNS ist kein Polling erforderlich und es ist schneller

### AB - Anrufbeantworter (Anrufbeantworter)
Kann ein-/ausgeschaltet werden.
Der Zustand cbIndex kann auf die Adresse # des Anrufbeantworters gesetzt werden.

### Anrufüberwachung
Der Callmonitor erstellt Echtzeitstatus für jeden eingehenden und ausgehenden Anruf.
Wenn das Telefonbuch aktiviert ist (Standard), werden Nummern in Namen aufgelöst. Es gibt auch einen Status, der ein klingelndes Telefon anzeigt.

### Telefonbuch
- Das Telefonbuch, falls aktiviert, wird verwendet, um den Namen der Telefonnummer des Anrufers abzurufen.
- Weiterhin gibt es drei Zustände um eine Nummer oder einen Namen aufzulösen. Falls vorhanden, erhalten Sie auch die Bild-URL des Kontakts.

  Bsp.: Wenn Sie den Status Telefonbuch.Nummer setzen, werden alle 3 Staaten, Name, Nummer und Bild auf den gefundenen Kontakt gesetzt. Beachten Sie, dass die Suche nach Namen zuerst den vollständigen Namen vergleicht, wenn er nicht gefunden wird, wird ein Teil davon verwendet.

### Anruflisten
Ausgabeformate:

-json
-html

Anruflisten sind:

- alle Anrufe
- Anrufe in Abwesenheit
- eingehende Anrufe
- ausgehende Anrufe

Anrufzähler: Der Anrufzähler kann auf 0 gesetzt werden. Der nächste Anruf wird um 1 erhöht.

Die HTML-Ausgabe kann durch eine Vorlage konfiguriert werden

### Befehl & BefehlErgebnisstatus
Mit dem Befehl state können Sie jeden tr-064 Befehl aus diesem [Dokumentation](https://avm.de/service/schnittstellen/) aufrufen.
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

Der Befehlsstatus sollte auf einen JSON der obigen Zeilen gesetzt werden. Also { ... } (ohne Befehl = und Zeilenumbrüche) Der Rückruf des Aufrufs setzt den Befehlsergebniszustand.

### Anrufüberwachung aktivieren
Um die Anrufüberwachung nutzen zu können, muss diese zunächst in der AVM Fritz!Box aktiviert werden.
Um die Anrufüberwachung zu aktivieren, wählen Sie ```#96*5*``` und der TCP/IP-Port 1012 wird geöffnet. Um den Port zu schließen, wählen Sie ```#96*4*```.

### Vorabversionen
Vorabversionen sind bei npm mit dem Tag dev verfügbar.
Sie können sie aus dem ioBroker-Stammverzeichnis installieren mit:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog

### 4.2.12 (2021-04-16)
* (Apollon77) prevent html template for calllists to be overwritten by default one
* (Apollon77) fix crash case (Sentry IOBROKER-TR-064-2M)

### 4.2.11 (2021-03-12)
* (Apollon77) fix id-reset detection for single calls

### 4.2.10 (2021-03-11)
* (Apollon77) better handle caller id resets by reboots/FW updates to also update list specific counter and log when this happened

### 4.2.9 (2021-03-10)
* (Apollon77) try to better handle calllist resets on FW updates
* (Apollon77) Make sure jsonDeviceList do not get deleted on start
* (Apollon77) Better handle not initialized calllist templates

### 4.2.8 (2021-03-09)
* (Apollon77) Optimize customized HTML templates if state is empty

### 4.2.7 (2021-03-08)
* (Apollon77) Allow customized HTML templates again

### 4.2.6 (2021-02-18)
* (Apollon77) Fix crash case (IOBROKER-TR-064-20)
* (Apollon77) Get calllists working again

### 4.2.4 (2021-02-02)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TR-064-1T)

### 4.2.3 (2021-01-16)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1N)

### 4.2.2 (2020-12-25)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1K)

### 4.2.1 (2020-11-13)
* (Apollon77) try to fix pot. not working disabling commands

### 4.2.0 (2020-11-09)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-15, IOBROKER-TR-064-16)
* (Apollon77) Try to solve error 500 problem with offline devices
* (SliX185) Add IPv6 states
* (foxriver76) optimizations
* (Apollon77) Fix initialization if ip/host

### 4.1.0 (2020-09-17)
* (Apollon77) Fix crash case (Sentry IOBROKER-TR-064-14)
* (bazidibavaria) added tablesort to device search
* (bazidibavaria) added Fritzbox link to admin

### 4.0.13 (2020-08-17)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-10)

### 4.0.12 (2020-08-06)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-Y)

### 4.0.11 (2020-07-26)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-W)

### 4.0.9 (2020-07-01)
* (Apollon77) handle cases correctly when no hosts are existing on device (Sentry IOBROKER-TR-064-R)

### 4.0.8 (2020-06-20)
* (Apollon77) Make sure states are only subscribed if initialization is done (Sentry IOBROKER-TR-064-J)

### 4.0.7 (2020-06-09)
* (Apollon77) Fix Admin UI to allow setting poll Interval correctly again

### 4.0.4 (2020-06-05)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-D)
* (Apollon77) Make sure adapter do not crash when invalid parameter are provided (Sentry IOBROKER-TR-064-B)
* (Apollon77) https is not supported right now (Sentry IOBROKER-TR-064-E)

### 4.0.3 (2020-05-11)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-7)
* (Apollon77) Make sure adapter do not crash when providing a non string to "ring" state (Sentry IOBROKER-TR-064-8) 

### 4.0.1 (2020-04-23)
* (Apollon77) handle case where no Phone deflections are available (Sentry IOBROKER-TR-064-1/2)

### 4.0.0 (2020-04-12)
* (Apollon77) update dependencies, use auto decrypt features with js-controller 3.0
* (foxriver76) make callmonitor compatible with js-controller 3.0

### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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