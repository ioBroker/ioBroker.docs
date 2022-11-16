---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: ANcfPN8XM6iNeu0x5GYV3TL+khg8BcdtpfSv7YtbpKM=
---
![Logo](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)

# IoBroker.fb-checkpresence
**Tests:** ![Testen und freigeben](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Fb-checkpresence Adapter für ioBroker
Der Adapter prüft die Anwesenheit von Familienmitgliedern über die Fritzbox.
Sie müssen den Namen des Familienmitglieds und die MAC-Adresse (oder IP-Adresse) des verwendeten Geräts eingeben.
Der Kommentar ist optional und Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Mitgliedsnamen.

### Verwendeter Open-Source-Code
#### Npm-Datumsformat v4.5.3
(c) 2007–2009 Steven Levithan <stevenlevithan.com> npm: https://www.npmjs.com/package/dateformat github: https://github.com/felixge/node-dateformat Lizenz: MIT

### Adaptervoraussetzungen
Für die korrekte Funktion müssen Sie einen History-Adapter installieren. Sie können einen der folgenden Adapter auswählen:

* Geschichte
*SQL
* InfluxDB

## Gebrauchtgerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Hier finden Sie Informationen zur Fritzbox https://avm.de/produkte/fritzbox/.
Die Fritzbox-Dienste werden über das TR-064-Protokoll genutzt.

### Fritzbox-Bedingungen
Die verwendete TR-064 Schnittstelle von der Fritzbox ist hier beschrieben: https://avm.de/service/schnittstellen/.
Die folgenden TR-064-Dienste und -Aktionen werden verwendet:

* Hosts:1 - X_AVM-DE_GetHostListPath (unterstützt seit 09.01.2017)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (unterstützt seit 18.05.2016)
* DeviceInfo:1 - GetSecurityPort
* Geräteinfo:1 - GetInfo
* WANPPPVerbindung:1 - GetInfo
* WANIP-Verbindung: 1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLAN-Konfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - WANAccessByIP nicht zulassen
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig:1 - Neustart
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

Standardmäßig ist die TR-064-Schnittstelle nicht aktiviert. Dies lässt sich jedoch einfach über die Weboberfläche der FritzBox ändern. Loggen Sie sich dazu in Ihre FritzBox ein und stellen Sie sicher, dass die Expertenansicht aktiviert ist.
Dann finden Sie unter „Heimnetz »Heimnetzübersicht» Netzwerkeinstellungen“ den Punkt „Zugriff für Anwendungen erlauben“. Dort müssen Sie die Checkbox aktivieren und anschließend die FritzBox einmalig neu starten.

Hinweis: Nach dem Ändern der Optionen den Neustart der Fritzbox nicht vergessen!<img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Allgemein
Die Konfigurationswerte werden validiert und nur korrekte Werte können gespeichert werden. Andernfalls ist die Speichern-Schaltfläche deaktiviert.

### Fritzbox IP-Adresse, Benutzer und Passwort
Die Konfiguration von IP-Adresse, Benutzer und Passwort ist notwendig, um die Gerätedaten von der Fritzbox zu bekommen.
Dazu muss in der Fritzbox ein Benutzer angelegt werden. Dies wird bei neuerer Firmware-Version (>= 7.25) der Fritzbox benötigt. Siehe hier für Informationen: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert. Benutzername und Passwort dürfen maximal 32 Zeichen lang sein. Informationen siehe: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf %20nicht%20leer%20sein.
Hinweis: In manchen Fällen kann es sein, dass die Fritzbox den Benutzer blockiert, wenn das Passwort nicht korrekt eingegeben wurde.
Oft ist eine Timeout-Meldung im Log. Bitte überprüfen Sie dann, ob Sie den richtigen Benutzernamen und das richtige Passwort eingegeben haben. Anschließend müssen Sie die Fritzbox neu starten.

### SSL-Option
In einigen Fällen konnte der Adapter keine Verbindung zur Fritzbox herstellen. Es könnte helfen, diese Option zu deaktivieren.
In diesem Fall versucht der Adapter, sich ohne https zu verbinden.

### Intervall
Sie haben getrennte Intervalle für Familienmitglieder und Fritzbox-Geräte.
Das Intervall für Fritzbox-Geräte kann von 10s bis 3600s konfiguriert werden. Normalerweise ist ein Wert zwischen 60 und 300 Sekunden ein optimales Intervall, um die Fritzbox-Daten auszulesen. Familienmitglieder können von 10s bis 600s konfiguriert werden. Jeder neue Zyklus beginnt, wenn der vorherige Zyklus beendet ist.

### Filterzeit
Wenn die Filterzeit größer als 0s ist, wird der Zustand eines Familienmitglieds zweimal (nach der Filterzeit) überprüft, wenn der Zustand auf falsch wechselt. Wenn der Zustand wahr ist, wird der Zustand sofort gesetzt.

### History-Adapter
Über den History-Adapter werden einige Werte berechnet. Sie können wählen, ob für diese Berechnungen die Historie, der SQL- oder der Influxdb-Adapter verwendet wird. Der History-Adapter muss vorab installiert werden und kann dann im Konfigurationsdialog ausgewählt werden.
Wenn die History-Konfiguration deaktiviert ist, konnte die Berechnung einiger Werte nicht realisiert werden.

### Datumsformat
Die Maskenoptionen für das Datumsformat werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatmaske wird zum Formatieren der HTML- und JSON-Tabellenobjekte verwendet.

### Erstellung von FB-Geräten
Wenn diese Option aktiviert ist, werden die Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.
Wenn diese Option deaktiviert ist, sind auch die Mesh-Informationen deaktiviert.

### Neusynchronisierung von FB-Geräteobjekten
Wenn diese Option aktiviert ist, werden die FB-Geräteobjekte erneut mit der Geräteliste der Fritzbox synchronisiert.

### Erstellung von Mesh-Informationen
Diese Option kann aktiviert werden, wenn das Erstellen von FB-Geräten erlaubt ist. Wenn diese Option aktiviert ist, werden die Mesh-Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.

### Gäste Information
Wenn diese Option aktiviert ist, werden die Status für Gäste erstellt.

### QR-Code-Generierung
Wenn diese Option aktiviert ist, wird der QR-Code aus dem Gast-WLAN generiert.

### Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied sollten Sie den Mitgliedsnamen, den Hostnamen, die Mac- und IP-Adresse, einen Kommentar eingeben und Sie können das Mitglied aktivieren oder deaktivieren. Eine Gruppe ist optional.
Wenn Sie die Gruppe leer lassen und das Kompatibilitäts-Flag auf true setzen, ist das Verhalten wie bei einer älteren Version des Adapters. Sie können den Anwesenheitsstatus des Familienmitglieds oder den direkt dem Namen des Familienmitglieds zugeordneten Status verwenden. In einer zukünftigen Version müssen Sie den Anwesenheitsstatus verwenden. Dieses Verhalten kann mit der Kompatibilitäts-Checkbox ein-/ausgeschaltet werden: -> Kompatibilität = wahr: Verhalten als ältere Version mit leerer Gruppe.
-> Kompatibilität = wahr und Gruppe nicht leer: neues Verhalten. Alle Staaten unterhalb des Ordners „Familienmitglieder“.
-> Kompatibilität = false: neues Verhalten. Alle Staaten unterhalb des Ordners „Familienmitglieder“.

Für jedes Mitglied erstellt der Adapter einen Anwesenheitsstatus und prüft, ob das Mitglied anwesend oder abwesend ist. Der Status wurde geändert, wenn sich der Anwesenheitsstatus änderte.
Sie können die Filterung auch für ein Mitglied aktivieren. Wenn der Zustand wahr ist, ändert sich der Zustand sofort auf wahr. Wenn es falsch ist, wird der Wert nach der Filterzeit erneut überprüft.
Wenn der Zustand in beiden Fällen falsch ist, dann ändert sich der Zustand zu falsch. Sonst ändert es sich nicht.

Um die Geschwindigkeitsinformationen in den Objekten zu erhalten, müssen Sie die Option fb-devices auswählen.

### Anwesenheit manuell auslösen
In Javascript können Sie die Anwesenheit manuell auslösen. Wenn Sie die Nachricht an den Adapter senden, wird jede neue Nachricht für 10 Sekunden blockiert. Sie erhalten ein negatives Ergebnis (false), wenn die Nachricht blockiert wird.
True, wenn die Nachricht vom Adapter empfangen wird.
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### Whitelist-Einstellungen
In die Whitelist können Sie jedes bekannte Gerät einfügen. Alle unbekannten Geräte werden im Blacklist-Objekt aufgelistet.
Wenn Sie das Kontrollkästchen in der Kopfzeile der Tabelle aktivieren, werden alle Geräte ausgewählt.

## Merkmale
### AVM-Support-Check
Die Funktion prüft die Verfügbarkeit genutzter Fritzbox-Features. Die Verfügbarkeit wird als Info protokolliert. Wenn Sie Probleme haben, schauen Sie, ob die Funktionen alle auf wahr gesetzt sind. Außerdem werden die Zugriffsrechte für den Benutzer geprüft und das Feature auf false gesetzt, wenn das Zugriffsrecht nicht korrekt ist.

### Gast-Wlan ein-/ausschalten
Unter dem Ordner Gast kann man den Status wlan auf true oder false setzen und dann schaltet sich das Gast-Wlan ein oder aus.

### QR-Code des Gäste-Wlan
Der QR-Code des Gäste-Wlans wird im Status wlanQR in der Gästemappe gespeichert. Der QR-Code kann im Basis-Bool-SVG-Widget in Vis angezeigt werden.

### Internetzugang von Fritzbox-Geräten ein-/ausschalten
Unter dem Ordner FB-Geräte könnte man den deaktivierten Zustand auf true oder false setzen und der Internetzugang dieses Gerätes wird in der Fritzbox gesperrt.

### Gäste holen, schwarze Liste
In dieser Funktion wird geprüft, ob ein Benutzer als Gast angemeldet ist. Es wird auch geprüft, ob ein Gerät nicht in der Whitelist aufgeführt ist.
Diese Geräte werden der Blacklist hinzugefügt.

### Aktiv werden
Für jedes Familienmitglied werden die Anwesenheit, das Kommen- und Gehen-Datum und einige andere Informationen berechnet und im Mitgliedsobjekt gespeichert, wenn ein Historienadapter ausgewählt ist.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele aktiv sind bekommt man von der Fritzbox.

## Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder anwesend sind, ist das Objekt wahr.

### Anwesenheit des Objekts
Wenn ein Familienmitglied anwesend ist, ist das Objekt wahr.

### Objektgeräte
Das sind alles gelistete Geräte in der Fritzbox

### Objekt activeDevices
Das sind die Anzahl aller aktiven Geräte in der Fritzbox

### Objekt html, json
Diese Objekte sind Tabellen (json und html) mit den Kommen- und Gehen-Informationen aller Familienmitglieder darin.

### Objektinfo
Hier werden Informationen über das letzte Update und den Verbindungsstatus des Adapters aufgelistet.

### Objekt Gast
Hier sind Informationen über die Anzahl der aktiven Gäste und Tabellenobjekte mit den darin enthaltenen Geräteinformationen aufgelistet.

### Objekt-Blacklist
Hier sind Informationen über die Anzahl der unbekannten Geräte und Tabellenobjekte mit den darin enthaltenen unbekannten Geräteinformationen aufgeführt.

### Objekt member.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status wahr hat.

### Objektmitglied.abwesend
Hier finden Sie Informationen über die Abwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status false hat.

### Objekt member.comming, member.going
Hier finden Sie Informationen, wann das Familienmitglied ankommt oder abreist.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Geschichte des aktuellen Tages.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### 1.1.21 (2022-09-05)
* (afuerhoff) dependencies updated

### 1.1.20 (2022-09-05)
* (afuerhoff) issue [#136](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/136) force update on demand
* (afuerhoff) issue [#139](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/139) Add family members fixed
* (afuerhoff) issue [#140](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/140) Add family members dialogbox fixed
* (afuerhoff) issue [#129](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/129) Dateformat library changed

### 1.1.19 (2022-07-08)
* (afuerhoff) issue [#137](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/137) guest device listed twice

### 1.1.18 (2022-07-04)
* (afuerhoff) issue [#67](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/67) fbdevices states for vpn connection added
* (afuerhoff) issue [#128](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/128) Restart adapter after cycle error

### 1.1.17 (2022-06-15)
* (afuerhoff) issue [#126](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/126) bugfix undefined historyAlive object
* (afuerhoff) log optimized

## License
MIT License

Copyright (c) 2019-2022 Achim Fürhoff <achim.fuerhoff@outlook.de>

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