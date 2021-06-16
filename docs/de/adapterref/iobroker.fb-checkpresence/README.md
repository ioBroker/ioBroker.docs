---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpräsenz
hash: Z1IAPH1AFvuhK6O6okTb1JeGm4LYqDzN76Z39ij0Ymw=
---
![Logo](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)

# IoBroker.fb-checkpräsenz
**Tests:** ![Testen und freigeben](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Fb-checkpresence-Adapter für ioBroker
Der Adapter prüft die Anwesenheit von Familienmitgliedern über die fritzbox.
Sie müssen den Namen des Familienmitglieds und die Mac-Adresse (oder IP-Adresse) des verwendeten Geräts eingeben.
Der Kommentar ist optional und Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Mitgliedsnamen.

### Vorbedingungen für den Adapter
Für die korrekte Funktion müssen Sie einen History-Adapter installieren. Sie können einen der folgenden Adapter wählen:

* Geschichte
* SQL
* InfluxDB

## Gebrauchtes Gerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Hier finden Sie Informationen zur Fritzbox https://avm.de/produkte/fritzbox/.
Die Fritzbox-Dienste werden über das TR-064-Protokoll genutzt.

### Fritzbox-Bedingungen
Die verwendete TR-064-Schnittstelle der fritzbox ist hier beschrieben: https://avm.de/service/schnittstellen/.
Folgende TR-064-Dienste und -Aktionen werden verwendet:

* Hosts:1 - X_AVM-DE_GetHostListPath (unterstützt seit 09.01.2017)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (unterstützt seit 2016-05-18)
* Geräteinfo:1 - GetSecurityPort
* Geräteinfo:1 - GetInfo
* WANPPPP-Verbindung:1 - GetInfo
* WANIP-Verbindung:1 - GetInfo
* WLAN-Konfiguration3 - SetEnable
* WLAN-Konfiguration3 - GetInfo
* WLAN-Konfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig:1 - Neustart
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

Standardmäßig ist die TR-064-Schnittstelle nicht aktiviert. Dies kann jedoch ganz einfach über das FritzBox-Webinterface geändert werden. Loggen Sie sich dazu in Ihre FritzBox ein und stellen Sie sicher, dass die Expertenansicht aktiviert ist.
Dann finden Sie unter „Heimnetz »Heimnetzübersicht» Netzwerkeinstellungen“ den Punkt „Zugriff für Anwendungen zulassen“. Dort müssen Sie die Checkbox aktivieren und anschließend die FritzBox einmal neu starten.

Hinweis: Nach dem Ändern der Optionen den Neustart der Fritzbox nicht vergessen!<img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Allgemeines
Die Konfigurationswerte werden validiert und es können nur korrekte Werte gespeichert werden. Andernfalls ist die Schaltfläche Speichern deaktiviert.

### Fritzbox IP-Adresse, Benutzer und Passwort
Die Konfiguration von IP-Adresse, Benutzer und Passwort ist notwendig, um die Gerätedaten von der fritzbox zu erhalten.
Dazu muss in der fritzbox ein Benutzer angelegt werden. Dies wird bei neueren Firmware-Versionen (>= 7.25) der fritzbox benötigt. Siehe hier für Informationen: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert. Benutzername und Passwort dürfen maximal 32 Zeichen lang sein. Informationen siehe: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf %20nicht%20leer%20sein.
Hinweis: In manchen Fällen kann es sein, dass die Fritzbox den Benutzer blockiert, wenn das Passwort nicht richtig eingegeben wurde.
Häufig steht eine Timeout-Meldung im Protokoll. Bitte überprüfen Sie dann, ob Sie den richtigen Benutzernamen und das richtige Passwort eingegeben haben. Anschließend müssen Sie die Fritzbox neu starten.

### SSL-Option
In einigen Fällen konnte der Adapter keine Verbindung zur Fritzbox herstellen. Es könnte helfen, diese Option zu deaktivieren.
In diesem Fall versucht der Adapter, sich ohne https zu verbinden.

### Intervall
Sie haben separate Intervalle für Familienmitglieder und Fritzbox-Geräte.
Das Intervall für Fritzbox-Geräte kann von 1 bis 59 Minuten konfiguriert werden. Normalerweise ist ein Wert zwischen 1 und 5 Minuten ein optimales Intervall, um die Fritzbox-Daten auszulesen. Familienmitglieder können von 10s bis 600s konfiguriert werden. Jeder neue Zyklus beginnt, wenn der vorherige Zyklus beendet ist.

### Filterzeit
Wenn die Filterzeit größer als 0s ist, wird der Status eines Familienmitglieds zweimal (nach der Filterzeit) überprüft, wenn sich der Status auf false ändert. Wenn der Zustand wahr ist, wird der Zustand sofort gesetzt.

###Verlaufsadapter
Über den History-Adapter werden einige Werte berechnet. Sie können wählen, ob für diese Berechnungen die History, der SQL- oder der Influxdb-Adapter verwendet wird. Der History-Adapter muss vorab installiert werden und kann dann im Konfigurationsdialog ausgewählt werden.
Wenn die Verlaufskonfiguration deaktiviert ist, konnte die Berechnung einiger Werte nicht durchgeführt werden.

### Datumsformat
Die Optionen für die Datumsformatmaske werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatmaske wird zum Formatieren der html- und json-Tabellenobjekte verwendet.

### Erstellung von FB-Geräten
Wenn diese Option aktiviert ist, werden die Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.
Wenn diese Option deaktiviert ist, werden auch die Netzinformationen deaktiviert.

### Neusynchronisation von FB-Geräteobjekten
Ist diese Option aktiviert, dann werden die FB-Geräteobjekte mit der Geräteliste der Fritzbox neu synchronisiert.

### Erstellung von Mesh-Informationen
Diese Option kann aktiviert werden, wenn das Anlegen von FB-Geräten erlaubt ist. Wenn diese Option aktiviert ist, werden die Mesh-Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.

### Gäste Information
Wenn diese Option aktiviert ist, werden die Zustände für Gäste erstellt.

### QR-Code-Generierung
Wenn diese Option aktiviert ist, wird der QR-Code aus dem Gast-Wlan generiert.

###Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied geben Sie den Mitgliedsnamen, den Hostnamen, die Mac- und IP-Adresse, einen Kommentar ein und können das Mitglied aktivieren oder deaktivieren. Eine Gruppe ist optional.
Wenn Sie die Gruppe leer lassen und das Kompatibilitätsflag auf true setzen, verhält sich das Verhalten wie bei einer älteren Version des Adapters. Sie können den Anwesenheitsstatus des Familienmitglieds oder den direkt dem Namen des Familienmitglieds zugeordneten Status verwenden. In einer zukünftigen Version müssen Sie den Anwesenheitsstatus verwenden. Dieses Verhalten kann mit der Kompatibilitäts-Checkbox ein-/ausgeschaltet werden: -> Kompatibilität = true: Verhalten als ältere Version mit leerer Gruppe.
-> Kompatibilität = wahr und Gruppe nicht leer: neues Verhalten. Alle Staaten unter dem Ordner "Familienmitglieder".
-> Kompatibilität = false: neues Verhalten. Alle Staaten unter dem Ordner "Familienmitglieder".

Für jedes Mitglied erstellt der Adapter einen Anwesenheitsstatus und prüft, ob das Mitglied anwesend oder abwesend ist. Der Status wurde geändert, wenn sich der Präsenzstatus änderte.
Sie können die Filterung auch für ein Mitglied aktivieren. Wenn der Zustand wahr ist, ändert sich der Zustand sofort zu wahr. Wenn es falsch ist, wird der Wert nach der Filterzeit erneut überprüft.
Wenn der Zustand in beiden Fällen falsch ist, ändert sich der Zustand in falsch. Ansonsten ändert es sich nicht.

Um die Geschwindigkeitsinformationen in den Objekten zu erhalten, müssen Sie die Option fb-devices auswählen.

### Whitelist-Einstellungen
In die Whitelist können Sie jedes bekannte Gerät einfügen. Alle unbekannten Geräte werden im Blacklist-Objekt aufgelistet.
Wenn Sie das Kontrollkästchen in der Kopfzeile der Tabelle aktivieren, werden alle Geräte ausgewählt.

## Eigenschaften
### AVM-Support-Check
Die Funktion prüft die Verfügbarkeit der verwendeten Fritzbox-Features. Die Verfügbarkeit wird als Info protokolliert. Wenn Sie Probleme haben, schauen Sie, ob die Funktionen alle auf "true" gesetzt sind. Außerdem werden die Zugriffsrechte für den Benutzer überprüft und das Feature auf false gesetzt, wenn die Zugriffsrechte nicht korrekt sind.

### Gäste-Wlan ein-/ausschalten
Unter dem Ordner guest kann man den Zustand wlan auf true oder false setzen und dann schaltet sich das Gast-Wlan ein oder aus.

### QR-Code des Gäste-Wlans
Der QR-Code des Gäste-Wlans wird im Zustand wlanQR in der Gästemappe gespeichert. Der QR-Code kann in vis im Basic - Bool SVG-Widget angezeigt werden.

### Internetzugriff von Fritzbox-Geräten ein-/ausschalten
Unter dem Ordner FB-Geräte könnte man den deaktivierten Zustand auf true oder false setzen und der Internetzugang dieses Gerätes wird in der Fritzbox gesperrt.

### Gäste holen, schwarze Liste
In dieser Funktion wird geprüft, ob ein Benutzer als Gast angemeldet ist. Außerdem wird geprüft, ob ein Gerät nicht in der aufgeführten Whitelist aufgeführt ist.
Diese Geräte werden der Blacklist hinzugefügt.

### Aktiv werden
Für jedes Familienmitglied werden die Anwesenheit, das Kommen- und Gehen-Datum und verschiedene andere Infos berechnet und im Mitgliedsobjekt gespeichert, wenn ein Historienadapter ausgewählt ist.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele aktiv sind, werden von der Fritzbox abgerufen.

##Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder vorhanden sind, ist das Objekt wahr.

### Objektpräsenz
Wenn ein Familienmitglied anwesend ist, ist das Objekt wahr.

### Objektgeräte
Das sind alles aufgelistete Geräte in der fritzbox

### Objekt activeDevices
Das sind die Anzahl aller aktiven Geräte in der fritzbox

### Objekt-HTML, json
Diese Objekte sind Tabellen (json und html) mit den Kommen- und Gehen-Informationen aller Familienmitglieder darin.

### Objektinformationen
Hier sind Informationen über das letzte Update und den Verbindungsstatus vom Adapter aufgelistet.

### Objektgast
Hier sind Informationen über die Anzahl der aktiven Gäste und Tabellenobjekte mit den darin enthaltenen Geräteinformationen aufgelistet.

### Objekt-Blacklist
Hier sind Informationen über die Anzahl unbekannter Geräte und Tabellenobjekte mit den darin enthaltenen Informationen zu unbekannten Geräten aufgeführt.

### Objektmember.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status wahr hat.

### Objektmember.absent
Hier finden Sie Informationen zur Abwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status false hat.

### Objekt member.comming, member.going
Hier finden Sie Informationen, wann das Familienmitglied ankommt oder das Haus verlässt.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Historie des aktuellen Tages.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### __WORK IN PROGRESS__
* (afuerhoff) html input pattern fixed for password and user
* (afuerhoff) dependencies updated

### 1.1.5 (2021-06-03)
* (afuerhoff) dependencies updated
* (afuerhoff) checkservice fixed

### 1.1.4 (2021-05-11)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Mesh handling optimized 

### 1.1.3 (2021-03-31)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated

### 1.1.2 (2021-01-13)
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) documentation edited 

### 1.1.1 (2020-12-27)
* (afuerhoff) Configuration optimized
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Documentation added
* (afuerhoff) Mesh handling optimized

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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