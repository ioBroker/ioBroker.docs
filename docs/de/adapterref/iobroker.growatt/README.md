---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: kein Titel
hash: YdfudKT/nSsn/evo14cJPoW2778r2dEB+x7J4d6Y7Z0=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/growatt-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/growatt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
### Growatt-Adapter für ioBroker
ioBroker Growatt Adapter zur Kommunikation mit Growatt Shine Server.
Ich bin nicht angeschlossen.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger in die Cloud gesendet.
Sie können es ändern, siehe unten.

Nicht alle Anlagentypen sind implementiert.

Aktuell können nur Daten gelesen werden, das Schreiben von Parametern oder das Ändern von Parametern ist nicht möglich.

---

## Adapter-Admin-Seite
### Haupteinstellungen
#### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine-App oder im Webportal verwenden.

#### Anmeldung mit gemeinsamem Schlüssel
Auf der Growatt-Website unter Energie, Anlagenmanagement, Betriebstools können Sie sich selbst einen Schlüssel per E-Mail zusenden.

#### Anlagendaten lesen
Dieser Datensatz enthält die hinterlegten Stammdaten

#### Letzte Verlaufsdaten lesen
Liest den letzten Datensatz aus der Historie des Datenloggers.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Statusdaten lesen
Diese Daten sind nicht für alle Anlagen (nicht INV/MAX/TLX) verfügbar. Dieser Datensatz enthält Live-Daten.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Gesamtdaten lesen
Dieser Datensatz enthält Aggregationsdaten.

#### Gerätedaten lesen
Dieser Datensatz enthält einige Daten des Geräts. Einige Daten sind auch in den anderen Kategorien verfügbar.

#### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

#### Timeout in Sekunden
Das Standardzeitlimit für HTTP-Anforderungen. Der Standardwert 60 Sekunden, wie bei Webbrowsern

#### Prozesszeitüberschreitung in Sekunden
Dieses Timeout überwacht die Sammlung von Daten vom Growatt-Server. Wenn der Server innerhalb dieser Zeit nicht alle Daten verarbeitet, wird ein Fehler gemeldet, die Sitzung beendet und ein neuer Zyklus-Timer gestartet. Der Standardwert ist 600 Sekunden.
Wenn der Wert 0 ist, wird diese Prüffunktion nicht ausgeführt.

#### Websitzung beibehalten
Der Adapter meldet sich nur einmal an und nicht bei jeder Datenanfrage vom Growatt-Server. Standardmäßig ist es eingeschaltet.

#### Sitzungszeit in Minuten
Hier können Sie einstellen, wann sich der Adapter vom Server ab- und wieder anmeldet. Eine 0 bedeutet nie abmelden. Der Standardwert ist 0 = unendlich.

#### Zykluszeit in Sekunden
Das Intervall, in dem die Daten vom Server angefordert werden. Die für die Datenabfrage benötigte Zeit wird dann von der nächsten abgezogen. Dauert die Abfrage länger als die Wartezeit, schläft der Adapter nur 100ms. Der Standardwert ist 30 Sekunden.

#### Fehlerzykluszeit in Sekunden
Tritt bei der Abfrage der Werte beim Growatt-Server ein Fehler auf, wird diese Zeit anstelle der Zykluszeit verwendet. Der Standardwert ist 120 Sekunden

### Objekte verwalten
Hier können Sie festlegen, was mit jedem Wert (Objekt) passieren soll, der vom Umrichter abgeholt wird.
Es gibt viele Werte, die nicht zu Ihrem Wechselrichter gehören. Diese können hier entfernt werden.
Da es kein Ereignis gibt, mit dem die Objektliste beim Speichern neu geladen werden kann. Die Schaltfläche „Aktualisieren“ muss verwendet werden, wenn „Speichern“ gedrückt wird.

#### Normal
Das Objekt bleibt bestehen, der Wert wird aktualisiert.

#### Löschen
Das Objekt wird gelöscht und der vom Umrichter geladene Wert wird verworfen.
Nach der Aktualisierung werden nur die ID und die Aktion angezeigt, da das Objekt nicht mehr existiert. Wenn Sie normal auswählen, wird das Objekt nach dem Speichern erneut erstellt.

#### Kein Update
Das Objekt bleibt bestehen, die Werte aus dem Wechselrichter werden verworfen.

---

## Datenintervall beschleunigen neue Methode
- Öffnen Sie die ShinePhone-App
- Klicken Sie unten auf den Anhang
- Oben rechts +, dann Datenlogger auflisten
- Klicken Sie auf vorhandenen Datenlogger
- Datenlogger konfigurieren
- WLAN-Hotspot-Modus
- Bringen Sie den Stick in den AP-Modus
- Mit WLAN-Hotspot verbinden, PW 123456789 ? <- erneut prüfen
- Fortsetzen
- Fortschrittlich
- Zeiteinstellung
- Intervall bis 1
- Geben Sie das Passwort growattJJJJMMTT ein (z. B. growatt20220209)
- Freischalten
- Klicken Sie auf und übernehmen Sie die Änderungen
- Beenden Sie den Hotspot-Modus

---

## Datenintervall beschleunigen alte Methode
### Sie können das Logger-Intervall von 5 Minuten bis 1 Minute einstellen
Entfernen Sie den Gummistopfen der KEY-Taste von ShineWiFi-S und drücken Sie kurz die Taste im Inneren. Die blaue LED leuchtet auf. Verwenden Sie Ihr Telefon oder Ihren Computer, um sich mit dem drahtlosen Netzwerk zu verbinden, das vom ShineWiFi-S-Modul ausgegeben wird. Der Netzwerkname/SSID ist die Seriennummer des ShineWiFi-S-Moduls.

### Loginseite
Nachdem die Verbindung erfolgreich hergestellt wurde, öffnen Sie den Webbrowser auf Ihrem Telefon oder Computer und geben Sie 192.168.10.100 in die Adressleiste ein. Der Benutzername ist admin, das Standardpasswort ist 12345678.

![Loginseite](../../../en/adapterref/iobroker.growatt/docs/login.png)

### Erweiterte Einstellungen
Ändern Sie die Datenintervallzeit auf 1 Minute

![Erweiterte Einstellungen](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

### Systemneustart
Starten Sie Ihr ShineWiFi-S-Modul auf dieser Seite neu, klicken Sie auf „Sofort neu starten“, um die neuen Einstellungen zu aktivieren, die Sie gerade vorgenommen haben, und melden Sie sich vom internen Webserver Ihres ShineWiFi-Moduls ab.

![Systemneustart](../../../en/adapterref/iobroker.growatt/docs/restart.png)

**Es gibt keine Änderung an den Diagrammen auf der Growatt-Seite. Dort sehen Sie nur eine Änderung der Daten des Datenloggers.**

-\*-

## Changelog

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2020 - 2022 PLCHome

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