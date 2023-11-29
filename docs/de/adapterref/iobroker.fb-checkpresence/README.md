---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: OdugxapAS9iewTmrgIl680zXsFjafz4WonR+ow1+Uag=
---
![Logo](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![GitHub-Lizenz](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Probleme](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![stabile Version](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Neueste NPM-Version](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-checkpresence
**Tests:** ![Test und Freigabe](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Fb-checkpresence-Adapter für ioBroker
Der Adapter prüft die Anwesenheit von Familienmitgliedern über die Fritzbox.
Sie müssen den Namen des Familienmitglieds und die Mac-Adresse (oder IP-Adresse) des verwendeten Geräts eingeben.
Der Kommentar ist optional und Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Mitgliedsnamen.

### Open-Source-Code verwendet
#### Npm dateformat v4.5.3
(c) 2007-2009 Steven Levithan <stevenlevithan.com> npm: https://www.npmjs.com/package/dateformat github: https://github.com/felixge/node-dateformat Lizenz: MIT

### Adaptervorbedingungen
Für die korrekte Funktion müssen Sie einen History-Adapter installieren. Sie können einen der folgenden Adapter wählen:

* Geschichte
* SQL
* InfluxDB

## Gebrauchtes Gerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Hier finden Sie Informationen zur Fritzbox https://avm.de/produkte/fritzbox/.
Die Fritzbox-Dienste werden über das TR-064-Protokoll genutzt.

### Fritzbox-Bedingungen
Die verwendete TR-064-Schnittstelle der Fritzbox wird hier beschrieben: https://avm.de/service/schnittstellen/.
Folgende TR-064-Dienste und -Aktionen werden verwendet:

* Hosts:1 - X_AVM-DE_GetHostListPath (unterstützt seit 09.01.2017)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 – GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (unterstützt seit 18.05.2016)
* DeviceInfo:1 – GetSecurityPort
* DeviceInfo:1 – GetInfo
* WANPPPConnection:1 – GetInfo
* WANIPConnection:1 – GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 – GetSecurityKeys
* X_AVM-DE_HostFilter – DisallowWANAccessByIP
* X_AVM-DE_HostFilter – GetWANAccessByIP
* DeviceConfig:1 – Neustart
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

Standardmäßig ist die TR-064-Schnittstelle nicht aktiviert. Dies lässt sich jedoch ganz einfach über die FritzBox-Weboberfläche ändern. Melden Sie sich dazu an Ihrer FritzBox an und stellen Sie sicher, dass die Expertenansicht aktiviert ist.
Dann finden Sie unter „Heimnetzwerk » Heimnetzwerk-Übersicht» Netzwerkeinstellungen“ den Punkt „Zugriff für Anwendungen erlauben“. Dort müssen Sie die Checkbox aktivieren und anschließend die FritzBox einmal neu starten.

Hinweis: Vergessen Sie nach dem Ändern der Optionen nicht den Neustart der Fritzbox!<img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Allgemein
Die Konfigurationswerte werden validiert und nur korrekte Werte können gespeichert werden. Andernfalls ist die Schaltfläche „Speichern“ deaktiviert.

### Fritzbox IP-Adresse, Benutzer und Passwort
Die Konfiguration von IP-Adresse, Benutzer und Passwort ist notwendig, um die Gerätedaten von der Fritzbox zu erhalten.
Dazu muss in der Fritzbox ein Benutzer angelegt werden. Dies ist bei neuerer Firmware-Version (>= 7.25) der Fritzbox erforderlich. Weitere Informationen finden Sie hier: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert. Der Benutzername und das Passwort dürfen maximal 32 Zeichen lang sein. Informationen finden Sie unter: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf %20nicht%20leer%20sein.
Hinweis: In manchen Fällen kann es sein, dass die Fritzbox den Benutzer blockiert, wenn das Passwort nicht korrekt eingegeben wurde.
Oftmals steht im Protokoll eine Timeout-Meldung. Bitte überprüfen Sie, ob Sie den richtigen Benutzernamen und das richtige Passwort eingegeben haben. Anschließend müssen Sie die Fritzbox neu starten.

### SSL-Option
In einigen Fällen konnte der Adapter keine Verbindung zur Fritzbox herstellen. Es könnte hilfreich sein, diese Option zu deaktivieren.
In diesem Fall versucht der Adapter, eine Verbindung ohne https herzustellen.

### Intervall
Sie haben getrennte Intervalle für Familienmitglieder und Fritzbox-Geräte.
Das Intervall für Fritzbox-Geräte kann von 10s bis 3600s konfiguriert werden. Normalerweise ist ein Wert zwischen 60 und 300 Sekunden ein optimales Intervall zum Auslesen der Fritzbox-Daten. Familienmitglieder können von 10 bis 600 konfiguriert werden. Jeder neue Zyklus beginnt, wenn der vorherige Zyklus beendet ist.

### Filterzeit
Wenn die Filterzeit größer als 0s ist, wird der Status eines Familienmitglieds zweimal (nach der Filterzeit) überprüft, wenn sich der Status in „falsch“ ändert. Wenn der Zustand wahr ist, wird der Zustand sofort gesetzt.

### Verlaufsadapter
Über den History-Adapter werden einige Werte berechnet. Sie können wählen, ob für diese Berechnungen der Verlauf, der SQL- oder der Influxdb-Adapter verwendet werden soll. Der History-Adapter muss vorab installiert werden und kann dann im Konfigurationsdialog ausgewählt werden.
Wenn die Verlaufskonfiguration deaktiviert ist, konnte die Berechnung einiger Werte nicht durchgeführt werden.

### Datumsformat
Die Optionen für die Datumsformatmaske werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatmaske wird zum Formatieren der HTML- und JSON-Tabellenobjekte verwendet.

### Erstellung von FB-Geräten
Wenn diese Option aktiviert ist, werden die Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.
Wenn diese Option deaktiviert ist, sind auch die Mesh-Informationen deaktiviert.

### Neusynchronisierung von FB-Geräteobjekten
Wenn diese Option aktiviert ist, werden die FB-Geräteobjekte erneut mit der Geräteliste der Fritzbox synchronisiert.

### Erstellung von Netzinformationen
Diese Option kann aktiviert werden, wenn die Erstellung von FB-Geräten erlaubt ist. Wenn diese Option aktiviert ist, werden die Mesh-Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.

### Gäste Information
Wenn diese Option aktiviert ist, werden die Status für Gäste erstellt.

### QR-Code-Generierung
Wenn diese Option aktiviert ist, wird der QR-Code aus dem Gast-WLAN generiert.

### Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied müssen Sie den Mitgliedsnamen, den Hostnamen, die Mac- und IP-Adresse sowie einen Kommentar eingeben und das Mitglied aktivieren oder deaktivieren. Eine Gruppe ist optional.
Wenn Sie die Gruppe leer lassen und das Kompatibilitätsflag auf „true“ setzen, ist das Verhalten wie bei einer älteren Version des Adapters. Sie können den Anwesenheitsstatus des Familienmitglieds oder den direkt dem Namen des Familienmitglieds zugeordneten Status verwenden. In einer zukünftigen Version müssen Sie den Anwesenheitsstatus verwenden. Dieses Verhalten kann mit der Kompatibilitäts-Checkbox ein-/ausgeschaltet werden: -> Kompatibilität = true: Verhalten als ältere Version mit leerer Gruppe.
-> Kompatibilität = wahr und Gruppe nicht leer: neues Verhalten. Alle Zustände unterhalb des Ordners „familymembers“.
-> Kompatibilität = false: neues Verhalten. Alle Zustände unterhalb des Ordners „familymembers“.

Für jedes Mitglied erstellt der Adapter einen Anwesenheitsstatus und prüft, ob das Mitglied vorhanden oder abwesend ist. Der Status wurde geändert, wenn sich der Anwesenheitsstatus änderte.
Sie können die Filterung auch für ein Mitglied aktivieren. Wenn der Zustand wahr ist, ändert sich der Zustand sofort in wahr. Wenn es falsch ist, wird der Wert nach der Filterzeit erneut überprüft.
Wenn der Zustand in beiden Fällen falsch ist, ändert sich der Zustand in falsch. Ansonsten ändert es sich nicht.

Um die Geschwindigkeitsinformationen in den Objekten zu erhalten, müssen Sie die Option fb-devices auswählen.

### Präsenz manuell auslösen
In Javascript können Sie die Präsenz manuell auslösen. Wenn Sie die Nachricht an den Adapter senden, wird jede neue Nachricht für 10 Sekunden blockiert. Sie erhalten ein negatives Ergebnis (false), wenn die Nachricht blockiert ist.
True, wenn die Nachricht vom Adapter empfangen wird.
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### Whitelist-Einstellungen
In die Whitelist können Sie jedes bekannte Gerät einfügen. Alle unbekannten Geräte werden im Blacklist-Objekt aufgelistet.
Wenn Sie das Kontrollkästchen in der Kopfzeile der Tabelle aktivieren, werden alle Geräte ausgewählt.

## Merkmale
### AVM-Support-Check
Die Funktion prüft die Verfügbarkeit genutzter Fritzbox-Funktionen. Die Verfügbarkeit wird als Info protokolliert. Wenn Sie Probleme haben, prüfen Sie, ob alle Funktionen auf „true“ gesetzt sind. Außerdem werden die Zugriffsrechte für den Benutzer überprüft und die Funktion auf „falsch“ gesetzt, wenn das Zugriffsrecht nicht korrekt ist.

### Gast-WLAN ein-/ausschalten
Unter dem Ordner Gast können Sie den WLAN-Zustand auf wahr oder falsch setzen und dann das Gast-WLAN ein- oder ausschalten.

### QR-Code des Gast-Wlans
Der QR-Code des Gast-WLAN wird im Zustand wlanQR im Gastordner gespeichert. Der QR-Code kann im Basic-Bool-SVG-Widget in Vis angezeigt werden.

### Den Internetzugang von Fritzbox-Geräten ein-/ausschalten
Unter dem Ordner FB-Geräte können Sie den deaktivierten Status auf wahr oder falsch setzen und den Internetzugriff dieses Geräts in der Fritzbox blockieren.

### Gäste holen, auf die schwarze Liste setzen
In dieser Funktion wird geprüft, ob ein Benutzer als Gast angemeldet ist. Es wird außerdem geprüft, ob ein Gerät nicht in der Whitelist aufgeführt ist.
Diese Geräte werden zur Blacklist hinzugefügt.

### Aktiv werden
Für jedes Familienmitglied werden die Anwesenheit, die Ankunfts- und Abreisedaten und viele weitere Informationen berechnet und im Mitgliedsobjekt gespeichert, wenn ein Historienadapter ausgewählt ist.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele aktiv sind, wird von der Fritzbox übernommen.

## Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder anwesend sind, ist das Objekt wahr.

### Objektpräsenz
Wenn ein Familienmitglied anwesend ist, ist das Objekt wahr.

### Objektgeräte
Das sind alles gelistete Geräte in der Fritzbox

### Objekt activeDevices
Dies ist die Anzahl aller aktiven Geräte in der Fritzbox

### Objekt html, json
Bei diesen Objekten handelt es sich um Tabellen (JSON und HTML) mit den Eingangs- und Ausgangsinformationen aller Familienmitglieder.

### Objektinfo
Hier werden Informationen zum letzten Update und zum Verbindungsstatus des Adapters aufgelistet.

### Objektgast
Hier werden Informationen über die Anzahl der aktiven Gäste und Tischobjekte mit den darin enthaltenen Geräteinformationen aufgelistet.

### Objekt-Blacklist
Hier werden Informationen über die Anzahl unbekannter Geräte und Tabellenobjekte mit den unbekannten Geräteinformationen aufgeführt.

### Objekt member.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status „true“ hat.

### Objektmitglied.absent
Hier finden Sie Informationen über die Abwesenheit eines Mitglieds am aktuellen Tag und wie lange sich das Mitglied seit der letzten Änderung im Status „false“ befindet.

### Objekt member.comming, member.going
Hier finden Sie Informationen zum Einzug bzw. Auszug des Familienmitglieds.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Geschichte des aktuellen Tages.

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) Readme updated
* (afuerhoff) function jsontables optimized

### 1.2.2 (2023-07-28)
* (afuerhoff) bug fixed json tables [#215](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/215)
* (afuerhoff) link feature optimized. See #206

### 1.2.1 (2023-07-14)
* (afuerhoff) bug fixed property link

### 1.2.0 (2023-07-13)
* (afuerhoff) dependencies updated
* (afuerhoff) mesh link added to family members [#206](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/206)

### 1.1.26 (2023-04-06)
* (afuerhoff) Wrong default settings in io-package.json [#188](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/188)
* (afuerhoff) Wrong Axios parameter in getMeshList [#197](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/197)
* (afuerhoff) dependencies updated

### 1.1.25 (2023-01-21)
* (afuerhoff) Warning message empty hostname optimized. Issue [#180](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/180)

## License
MIT License

Copyright (c) 2019-2023 Achim Fürhoff <achim.fuerhoff@outlook.de>

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