---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: hg7iuPPe4NXcmnQfrvXCrazfTU4pd774cCmOJKkuGuA=
---
![Logo](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![GitHub-Lizenz](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub-Probleme](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Stabile Version](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Neueste NPM-Version](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-checkpresence
**Tests:** ![Test und Freigabe](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Fb-checkpresence-Adapter für ioBroker
Der Adapter prüft, ob Familienmitglieder über die Fritzbox verbunden sind.
Sie müssen den Namen des Familienmitglieds und die MAC-Adresse (oder IP-Adresse) des verwendeten Geräts angeben.
Der Kommentar ist optional; Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Namen des Mitglieds.

### Verwendeter Open-Source-Code
#### Npm dateformat v4.5.3
© 2007–2009 Steven Levithan <stevenlevithan.com> npm: https://www.npmjs.com/package/dateformat github: https://github.com/felixge/node-dateformat Lizenz: MIT

### Adapter-Vorbedingungen
Für die korrekte Funktion müssen Sie einen Verlaufsadapter installieren. Sie können einen der folgenden Adapter auswählen:

* Geschichte
* SQL
* InfluxDB

## Verwendetes Gerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Informationen zur Fritzbox finden Sie hier: https://avm.de/produkte/fritzbox/.
Die Fritzbox-Dienste werden über das TR-064-Protokoll genutzt.

### Fritzbox-Bedingungen
Die verwendete TR-064-Schnittstelle der Fritzbox wird hier beschrieben: https://avm.de/service/schnittstellen/. Folgende TR-064-Dienste und -Aktionen werden genutzt:

* Hosts:1 - X_AVM-DE_GetHostListPath (unterstützt seit 2017-01-09)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (unterstützt seit 18.05.2016)
* DeviceInfo:1 - GetSecurityPort
* DeviceInfo:1 - GetInfo
* WANPPPConnection:1 - GetInfo
* WANIPConnection:1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig:1 - Neustart
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

Die TR-064-Schnittstelle ist standardmäßig deaktiviert. Dies lässt sich jedoch ganz einfach über die FritzBox-Weboberfläche ändern. Melden Sie sich dazu an Ihrer FritzBox an und stellen Sie sicher, dass die Expertenansicht aktiviert ist.
Anschließend finden Sie unter „Heimnetzwerk » Heimnetzwerk-Übersicht » Netzwerkeinstellungen“ den Punkt „Zugriff für Anwendungen erlauben“. Aktivieren Sie dort das Kontrollkästchen und starten Sie die FritzBox anschließend neu.

Hinweis: Vergessen Sie nicht, die Fritzbox nach dem Ändern der Optionen neu zu starten!<img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Allgemein
Die Konfigurationswerte werden überprüft und nur korrekte Werte können gespeichert werden. Andernfalls ist die Schaltfläche „Speichern“ deaktiviert.

### Fritzbox IP-Adresse, Benutzername und Passwort
Die Konfiguration von IP-Adresse, Benutzername und Passwort ist erforderlich, um die Gerätedaten von der Fritzbox abzurufen.
Daher muss ein Benutzer in der Fritzbox angelegt werden. Dies ist ab der Firmware-Version 7.25 der Fritzbox erforderlich. Weitere Informationen finden Sie hier: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert. Benutzername und Passwort dürfen maximal 32 Zeichen lang sein. Weitere Informationen finden Sie unter: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein.

Hinweis: In manchen Fällen kann es vorkommen, dass die Fritz!Box den Benutzer gesperrt hat, weil das Passwort nicht korrekt eingegeben wurde. Häufig findet sich im Protokoll eine Timeout-Meldung. Bitte überprüfen Sie anschließend, ob Sie den korrekten Benutzernamen und das korrekte Passwort eingegeben haben. Starten Sie die Fritz!Box dann neu.

### SSL-Option
In einigen Fällen konnte der Adapter keine Verbindung zur Fritzbox herstellen. Es kann helfen, diese Option zu deaktivieren.
In diesem Fall versucht der Adapter, eine Verbindung ohne HTTPS herzustellen.

### Intervall
Sie können separate Intervalle für Familienmitglieder und Fritzbox-Geräte festlegen.
Das Intervall für Fritzbox-Geräte lässt sich von 10 Sekunden bis 3600 Sekunden konfigurieren. Normalerweise ist ein Wert zwischen 60 und 300 Sekunden optimal, um die Fritzbox-Daten auszulesen. Für Familienmitglieder können Intervalle von 10 Sekunden bis 600 Sekunden eingestellt werden. Jeder neue Zyklus beginnt, sobald der vorherige abgeschlossen ist.

### Filterzeit
Ist die Filterzeit größer als 0 Sekunden, wird der Status eines Familienmitglieds zweimal (nach Ablauf der Filterzeit) überprüft, falls er sich auf „falsch“ ändert. Ist der Status „wahr“, wird er sofort gesetzt.

### Verlaufsadapter
Über den History-Adapter werden einige Werte berechnet. Sie können auswählen, ob für diese Berechnungen der History-, der SQL- oder der InfluxDB-Adapter verwendet werden soll. Der History-Adapter muss zuvor installiert werden und kann anschließend im Konfigurationsdialog ausgewählt werden.
Wenn die History-Konfiguration deaktiviert ist, können einige Werte nicht berechnet werden.

### Datumsformat
Die Optionen für die Datumsformatmaske werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatmaske dient zur Formatierung von HTML- und JSON-Tabellenobjekten.

### Erstellung von FB-Geräten
Wenn diese Option aktiviert ist, werden Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.
Wenn diese Option deaktiviert ist, werden auch die Mesh-Informationen deaktiviert.

### Resynchronisierung von FB-Geräteobjekten (einmalig)
Wenn diese Option aktiviert ist, werden die FB-Geräteobjekte einmalig mit der Geräteliste von Fritzbox neu synchronisiert.

### Automatische Resynchronisierung von FB-Geräteobjekten
Wenn diese Option aktiviert ist, werden die FB-Geräteobjekte alle x Tage mit der Geräteliste von Fritzbox neu synchronisiert.

### Erstellung von Netzinformationen
Diese Option kann aktiviert werden, wenn die Erstellung von FB-Geräten erlaubt ist. Wenn diese Option aktiviert ist, werden die Mesh-Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.

### Gästeinformationen
Wenn diese Option aktiviert ist, werden die Zustände für Gäste erstellt.

### QR-Code-Generierung
Wenn diese Option aktiviert ist, wird der QR-Code des Gast-WLANs generiert. Sie können diesen QR-Code in Ihrem VIS mit dem Widget „Basic Boolesches SVG“ anzeigen. Bitte verwenden Sie die folgenden Einstellungen:<img src="doc/QRCode.png"/>

### Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied geben Sie den Mitgliedsnamen, den Hostnamen, die MAC- und IP-Adresse sowie einen Kommentar ein. Anschließend können Sie das Mitglied aktivieren oder deaktivieren. Eine Gruppe ist optional.

Wenn Sie die Gruppe leer lassen und das Kompatibilitätsflag auf „true“ setzen, verhält sich der Adapter wie eine ältere Version. Sie können den Anwesenheitsstatus des Familienmitglieds oder den direkt dem Familienmitgliedsnamen zugeordneten Status verwenden. In einer zukünftigen Version müssen Sie den Anwesenheitsstatus verwenden. Dieses Verhalten lässt sich über das Kompatibilitäts-Kontrollkästchen aktivieren/deaktivieren: -> Kompatibilität = true: Verhalten wie in der älteren Version mit leerer Gruppe.

> Kompatibilität = true und Gruppe nicht leer: Neues Verhalten. Alle Status im Ordner „Familienmitglieder“.

> Kompatibilität = false: Neues Verhalten. Alle Status im Ordner „Familienmitglieder“.

Für jedes Mitglied erstellt der Adapter einen Anwesenheitsstatus und prüft, ob das Mitglied vorhanden oder abwesend ist. Der Status ändert sich, wenn sich der Anwesenheitsstatus ändert.

Sie können die Filterung für ein Mitglied auch aktivieren. Ist der Status „wahr“, ändert sich der Status sofort auf „wahr“. Ist er „falsch“, wird der Wert nach der Filterzeit erneut geprüft.
Ist der Status in beiden Fällen „falsch“, ändert er sich auf „falsch“. Andernfalls bleibt er unverändert.

Um die Geschwindigkeitsinformationen in den Objekten zu erhalten, müssen Sie die Option fb-devices auswählen.

### Anwesenheit manuell auslösen
In JavaScript können Sie die Anwesenheitserkennung manuell auslösen. Wenn Sie die Nachricht an den Adapter senden, werden alle neuen Nachrichten für 10 Sekunden blockiert. Sie erhalten ein negatives Ergebnis (false), wenn die Nachricht blockiert wird.

Sie erhalten „true“, wenn die Nachricht vom Adapter empfangen wird.

` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### Whitelist-Einstellungen
In die Positivliste können Sie alle bekannten Geräte eintragen. Unbekannte Geräte werden in der Negativliste aufgeführt.
Wenn Sie das Kontrollkästchen in der Tabellenüberschrift aktivieren, werden alle Geräte ausgewählt.

In JavaScript können Sie einen Eintrag zur Whitelist hinzufügen.
Die gesendeten Daten (Hostname, MAC-Adresse) werden mit der Geräteliste der Fritzbox verglichen. Ist der Eintrag vorhanden, wird geprüft, ob er bereits in der Whitelist gespeichert ist. Falls nicht, wird der Eintrag in der Whitelist-Konfigurationstabelle gespeichert.

sendTo('fb-checkpresence.0', 'addDeviceToWhitelist', { hostname: 'devicename', mac: '00:00:00:00:00:00' } , function (result) { log(result, 'info'); });

## Merkmale
### AVM-Unterstützungsprüfung
Die Funktion prüft die Verfügbarkeit der verwendeten Fritzbox-Funktionen. Die Verfügbarkeit wird als Information protokolliert. Bei Problemen prüfen Sie, ob alle Funktionen auf „true“ gesetzt sind. Außerdem werden die Zugriffsrechte des Benutzers geprüft und die Funktion auf „false“ gesetzt, falls die Zugriffsrechte nicht korrekt sind.

### Gast-WLAN ein-/ausschalten
Im Ordner „Gast“ können Sie den Status „wlan“ auf „true“ oder „false“ setzen, wodurch das WLAN des Gastes ein- oder ausgeschaltet wird.

### QR-Code des Gast-WLANs
Der QR-Code des Gast-WLANs wird im Ordner „gast“ unter dem Status „wlanQR“ gespeichert. Der QR-Code kann im SVG-Widget „basic - Bool“ angezeigt werden.

### Internetzugriff von Fritzbox-Geräten ein-/ausschalten
Im Ordner FB-Geräte können Sie den deaktivierten Status auf wahr oder falsch setzen, und der Internetzugriff dieses Geräts wird in der Fritzbox gesperrt.

### Gäste abrufen, Blacklist
Diese Funktion prüft, ob ein Benutzer als Gast angemeldet ist. Außerdem wird geprüft, ob sich ein Gerät nicht auf der Whitelist befindet.
Diese Geräte werden der Blacklist hinzugefügt.

### Werde aktiv
Wenn ein Verlaufsadapter ausgewählt ist, werden für jedes Familienmitglied die Anwesenheit, die Ankunfts- und Abreisedaten sowie verschiedene andere Informationen berechnet und im Mitgliedsobjekt gespeichert.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele davon aktiv sind, werden von der Fritzbox abgerufen.

## Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder anwesend sind, dann ist die Aussage wahr.

### Objektpräsenz
Wenn ein Familienmitglied anwesend ist, dann ist die Aussage wahr.

### Objektgeräte
Dies sind alle in der Fritzbox aufgeführten Geräte.

### Objekt activeDevices
Dies ist die Anzahl aller aktiven Geräte in der Fritzbox.

### Objekt html, json
Bei diesen Objekten handelt es sich um Tabellen (JSON und HTML), die die Ankunfts- und Abgangsinformationen aller Familienmitglieder enthalten.

### Objektinformationen
Hier finden Sie Informationen zum letzten Update und zum Verbindungsstatus des Adapters.

### Objekt Gast
Hier finden Sie Informationen über die Anzahl der aktiven Gäste und Tischobjekte mit den dazugehörigen Geräteinformationen.

### Objekt-Blacklist
Hier sind Informationen über die Anzahl unbekannter Geräte und Tabellenobjekte aufgelistet, die Informationen über unbekannte Geräte enthalten.

### Objekt member.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und darüber, wie lange der Status des Mitglieds seit der letzten Änderung bereits „wahr“ ist.

### Objektmitglied fehlt
Hier finden Sie Informationen über die Abwesenheit eines Mitglieds am aktuellen Tag und darüber, wie lange der Status des Mitglieds seit der letzten Änderung „falsch“ ist.

### Objekt member.comming, member.going
Hier finden Sie Informationen zur Ankunft und Abreise des Familienmitglieds.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Geschichte des heutigen Tages.

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#358](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/358)
* (afuerhoff) new fb-devices sync option integrated
* (afuerhoff) readme updated
* (softwarecrash) PR398 fixes a crash in newfilter mode

### 1.4.2 (2025-10-30)
* (afuerhoff) dependencies updated
* (afuerhoff) package.json issues fixed [#350](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/350)
* (afuerhoff) npm security changes
* (afuerhoff) filter time extended to 300s
* (afuerhoff) guest wlan bug fixed [#353](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/353)
* (afuerhoff) deprecated functions changed

### 1.4.1 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker & code scanning issues fixed

### 1.4.0 (2025-05-28)
* (afuerhoff) dependencies updated
* (afuerhoff) error handling optimized
* (afuerhoff) enhancement  [#336](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/336)
* (afuerhoff) issue [#337](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/337)
* (afuerhoff) issue [#335](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/335)

### 1.3.1 (2025-03-02)
* (afuerhoff) dependencies updated
* (afuerhoff) bug fixed [#333](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/333)
* (afuerhoff) bug fixed [#305](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/305)

### 1.3.0 (2025-02-14)
* (afuerhoff) dependencies updated
* (afuerhoff) eslint setup changed
* (afuerhoff) ipv6 ip-address and prefix added

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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