---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: Ewia+qvur97RITkQTmXU/gfhaVZ6TCaKBMr5XZWoOTA=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# IoBroker.tuya
![Testen und freigeben](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

ioBroker-Adapter zur Verbindung mit mehreren kleinen und günstigen WLAN-Geräten, die mit der Tuya-Cloud verbunden sind und meistens die Smartlife-App/Alexa-Skill verwenden. Der Adapter unterstützt das Lesen von Statusaktualisierungen in Echtzeit und die Steuerung dieser Geräte, sobald sie mit der jeweiligen Mobiltelefon-App synchronisiert wurden.

Tuya-Geräte sind ESP8266MOD WiFi-Smart-Geräte von Shenzhen Xenon.

Neben Geräten, die mit der Smart Live App nutzbar sind, soll auch die Nutzung der Jinvoo Smart App, Xenon Smart App, eFamilyCloud, io.e (Luminea oder ähnliche) App möglich sein. Bei Erfolg bitte melden. <img src="https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/admin/warning.png" width="50" height="50"> **Der Adapter funktioniert nur mit Tuya und kompatiblen Apps, solange deren Version &lt;3.14 (!!) ist**

Der Adapter verbindet sich lokal mit allen Geräten, die "immer im WLAN" sind. Geräte, die nur bei einem Ereignis online gehen, ihre Daten senden und wieder offline gehen (meistens **batteriebetriebene Geräte**), werden nur über die MQTT-Verbindung der Tuya IoT-Plattform unterstützt.

Eine Adapterinstanz kann alle Geräte in einem Netzwerk, das UDP-Pakete weiterleitet, lokal erkennen und sich mit ihnen verbinden! Für Docker-Umgebungen erfordert dies zusätzliche Aktionen und möglicherweise Macvlan oder ähnliches!

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit betrieben und hat kein geschäftliches Ziel.** **TUYA ist eine Marke von Tuya Global Inc.**

## Funktionalität: Nur lokale vs. von der Cloud unterstützte Funktionen
Dieser Adapter kann, wenn gewünscht, größtenteils ohne die Tuya Cloud funktionieren.

Wenn dies gewünscht wird, ist eine einmalige Synchronisierung mit dem Tuya Cloud App Account erforderlich, sobald neue Geräte hinzugefügt werden. Geben Sie dazu die Cloud-Anmeldeinformationen in der Adapterkonfiguration ein und betätigen Sie die Schaltfläche „Einmal synchronisieren“. Es ist nicht erforderlich, die Cloud-Anmeldeinformationen zu speichern!

**Hinweis: Wenn die App-Synchronisierung abgeschlossen ist, kann es sein, dass die Tuya Mobile App über eine Anmeldung von einem Android-Gerät in das Tuya-Konto informiert. Das ist vom Adapter!**

Der Adapter wartet dann auf lokale UDP-Nachrichten, um die lokalen IPs der Geräte zu finden und eine lokale Verbindung herzustellen. Dies ist nur möglich, wenn die Tuya-App auf KEINEM Gerät geöffnet ist, da die meisten Geräte nur eine lokale Verbindung zulassen.

Wenn Sie sich entscheiden, Ihre Tuya-App-Anmeldeinformationen (Smart Life-App oder Tuya Smart-App) in der Adapterkonfiguration zu speichern, werden die Geräte bei jedem Adapterstart automatisch aktualisiert. Zusätzlich können die Zustände von nicht lokal verbundenen Geräten über die Tuya Cloud abgefragt und gesteuert werden.

Um Echtzeit-Updates von Geräten zu unterstützen, die nicht lokal verbunden sind, und auch z. batteriebasierte Geräte können Sie sich zusätzlich ein Konto auf der Tuya IoT-Plattform registrieren und Ihr App-Konto verknüpfen und eine Cloud-MQTT-Verbindung verwenden. Um ein Konto auf der Tuya IoT-Plattform zu registrieren, befolgen Sie bitte die Anweisungen unter [Tuya IoT-Plattform](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).
**Hinweis: Der IoT Platform Account ist nur für einige Zeit aktiv und muss danach monatlich verlängert werden!**

Mit diesem Feature-Set können Sie zwischen allen verfügbaren Optionen wählen und mit oder (neben den einmaligen Synchronisierungen) ohne die Tuya Cloud-Systeme arbeiten. Du entscheidest.

Der "ehemalige" App-Proxy-Sync ist noch in der Adapter Config verfügbar, wird aber nicht mehr empfohlen. Es ist viel einfacher, die neue One Time Cloud Sync durchzuführen.

### Wenn die UDP-Erkennung nicht funktioniert
Wenn die Geräte nicht korrekt über ihre UDP-Pakete erkannt werden, können Sie die IP manuell festlegen, indem Sie das Geräteobjekt bearbeiten. siehe https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

### Hinweis für batteriebetriebene Geräte
Wie bereits oben erwähnt, werden batteriebetriebene Geräte von diesem Adapter nicht unterstützt, wenn nur lokale Verbindungen verwendet werden! Der Grund ist, dass sie nicht ständig online sind, um Strom zu sparen. Immer wenn sie ein Signal bekommen, gehen sie online, senden das Update an die Tuya-Cloud-Server und gehen wieder offline. Sie senden keine UDP-Pakete aus oder sind lange genug online, damit sich der Adapter mit ihnen verbinden kann.

Durch die Verwendung der Tuya App Cloud können Daten abgefragt werden, was aber für Tür-/Fenster-/Präsenzmelder immer noch nicht ausreicht. Sie sollten nur mit der MQTT-Verbindung der Tuya IoT-Plattform funktionieren.

## Proxy-Sync (Fallback): Kompatible mobile Apps und Versionen
Die aktuellen Versionen des Tuya Smart und auch der Smartlife App sind **nicht mehr kompatibel** mit der Funktionsweise des Adapters, da Tuya den gesamten Datenverkehr verschlüsselt, den der Adapter ausspionieren könnte. Vorerst funktionieren noch einige ältere Versionen der Apps ...

* Smartlife-App <3.14, am besten 3.12.6!!
* Tuya Smart App <3.14, am besten 3.12.x
* STL Smart Home App 1.1.1 (zuletzt datiert Sept. 2019)
* Ucomen Home-App (??)

**Wichtiger Hinweis für iOS-Benutzer:** Der hier beschriebene Proxy-Ansatz funktioniert nicht mehr. Sobald Sie die Smart Life App Version 3.10 oder höher haben, ist die Kommunikation von der App für den Proxy nicht mehr sichtbar. Aber es funktioniert immer noch mit allen Android-App-Versionen, daher ist der beste Ansatz ein Androis-Emulator, wie grob beschrieben unter https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- ger%C3%A4te/19

Dazu müssen Sie zunächst ein benutzerdefiniertes Root-Zertifikat auf Ihrem Mobilgerät hinzufügen.
Wenn Sie in der Konfiguration der Adapterinstanz auf „Proxy starten“ klicken, wird das Zertifikat für Ihr System erstellt und zeigt einen QR-Code zum Download-Speicherort. Scannen Sie idealerweise den QR-Code mit Ihrem mobilen Gerät und folgen Sie dem Prozess, um dieses Root-Zertifikat hinzuzufügen und ihm zu vertrauen.
Wenn der Ort des QR-Codes nicht erreichbar ist (kann passieren, wenn Sie Docker oder ähnliches verwenden), öffnen Sie den „Proxy Web Info Port“ in Ihrem Browser und klicken Sie in der Navigation auf „Root-CA“ und Sie können auch die CA-Datei herunterladen.

Stellen Sie nun sicher, dass Sie die jeweilige Tuya Smart App schließen / beenden.
Fügen Sie danach den Proxy-Port und den ioBroker-Host als "Manuellen" Proxy für Ihre WLAN-Verbindung auf Ihrem Handy hinzu.

Öffnen Sie nun die jeweilige Tuya Smart App und/oder laden Sie neu.

Die Admin-Konfiguration zeigt eine Erfolgsmeldung an, wenn das entsprechende Datenpaket empfangen wurde, und schaltet den Proxy 10 Sekunden später ab. Sie können den Proxy jetzt von Ihrem Telefon entfernen und dem Zertifikat auch nicht mehr vertrauen.

Direkt danach sollten die Objekte mit aussagekräftigeren Namen aktualisiert werden und fortan automatisch Live-Updates erhalten und kommunizieren können.

Die Synchronisierung wird nur anfänglich benötigt oder nachdem Sie Ihrer App neue Geräte hinzugefügt haben.

Einige Bilder für einige mobile Betriebssysteme finden Sie unter [Proxy-Seite](PROXY.md).

## Funktionen des Infrarot-Gateways
Im Objektbaum gibt es verschiedene Arten von IR-Geräten

### Die IR-Gateway/Sender-Geräte
Dies ist das eigentliche Gerät, das Sie als Hardware haben. Dieses Gerät wird von Untergeräten verwendet, die in der mobilen App definiert sind (siehe unten) und kann verwendet werden, um benutzerdefinierte IR-Codes zu lernen und zu senden.

Der Zustand "ir-learn" in diesem Gerät ist ein Trigger, der zum Lernen von IR-Codes verwendet werden kann. Der gelernte Code wird dann im "202"-Zustand als base64-codierte Daten empfangen.

Der Status „ir-send“ kann verwendet werden, um einen Base64-codierten IR-Code an das Gerät zu senden. Dies kann verwendet werden, um den gelernten Code aus dem "ir-learn"-Zustand zu senden.

**Diese Art der Steuerung funktioniert nur auf dem "Haupt-IR-Gerät" und nur bei lokaler Verbindung (keine Cloud-Verbindung) (derzeit).**

### Die IR-Untergeräte
Die IR-Sub-Geräte haben viele "ir-*"-Zustände, die alle Tasten sind, um den jeweiligen Button/IR-Code auszulösen. Die IR-Zustände sollten mit dem Layout der Schaltflächen in der mobilen App übereinstimmen.

Einige Geräte haben Kombizustände wie „M0_T20_S3“ (gefunden von einer Daikin-Klimaanlage), was Modus 0, Temperatur 20 und (Lüfter-)Geschwindigkeit 3 bedeutet. Tatsächlich müssen Sie die richtige Taste auswählen. Bis jetzt haben wir keinen generischen/automatischen Weg gefunden, um herauszufinden, welcher Button welcher ist.
Die mobile App selbst versucht auch, sich diese Einstellungen zu merken, sobald Sie also etwas mit dem Adapter (oder dem echten IR-Controller des Geräts) auslösen, sind die Informationen der App veraltet.

**Diese Art der Steuerung funktioniert nur, wenn App-Cloud-Anmeldeinformationen eingegeben werden. Die Befehle werden vorerst auch über die Cloud versendet.**

## Szenenfunktionen
Wenn die App-Cloud-Credentials eingegeben und gespeichert werden, liest der Adapter auch die Szenen aus der App aus und legt sie als Objekte im Adapter an. Die Szenen können ausgelöst werden, indem der Szenenzustand auf wahr gesetzt wird.

Die Auslösung wird dann an die Cloud gesendet.

## Credits
Die Arbeit des Adapters wäre ohne die großartige Arbeit von @codetheweb, @kueblc und @NorthernMan54 (https://github.com/codetheweb/tuyapi) und https://github.com/clach04/python-tuya nicht möglich gewesen , https://github.com/uzlonewolf/tinytuya und viele mehr.

## So melden Sie Probleme und Funktionsanfragen
Bitte verwenden Sie hierfür GitHub-Issues.

Am besten stellen Sie den Adapter auf den Debug-Protokollmodus ein (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Dann holen Sie sich bitte die Logdatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht vom Admin, da der Admin die Zeilen kürzt). Wenn Sie es nicht im GitHub-Issue bereitstellen möchten, können Sie es mir auch per E-Mail (iobroker@fischer-ka.de) zusenden. Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

Wenn es Probleme mit der Synchronisierung der Tuya App Cloud gibt, kann durch den folgenden Prozess eine zusätzliche Protokollierung generiert werden:

* Stoppen Sie den Adapter in Admin
* Öffnen Sie eine Shell auf dem ioBroker-Host
* Führen Sie `DEBUG=@tuyapi/cloud* iobroker debug tuya` aus
* Holen Sie sich das Protokoll von der Befehlszeile

Senden Sie das Log mit Bezug auf das generierte GitHub-Issue an iobroker@fischer-ka.de

## Changelog
### 3.9.1 (2022-11-14)
* (Apollon77) Add support for local control of Tuya protocols 3.2 and 3.4
* (TA2k/Apollon77) Add basic support for IR devices (Gateway and Sub Devices)
* (Apollon77) Convert special colour/colour_data values to an additional rgb state
* (Apollon77) Allow to define that devices do not connect locally (this prevents error logs, and they work via cloud if data are provided)
* (Apollon77) Add custom handling for bright_value fields with missing scale factor (10..1000 will be now 1..100);
* (Apollon77) Add support for more cloud MQTT notifications
* (Apollon77) More schema information added/updated

### 3.8.1 (2022-11-06)
* (TA2k/Apollon77) Add App-Cloud Sync deceasing the proxy
* (Apollon77) Add support for device polling using App-Cloud for devices not connected
* (Apollon77) Add support for realtime cloud state updates using Tuya IoT Platform MQTT connection
* (Apollon77) Allow to update names of device objects when changed in App
* (Apollon77) Use read Schema details from Sync instead the already contained ones
* (Apollon77) React to device infos from MQTT connection and update/add device objects
* (Apollon77) When Datapoints (e.g sockets) have custom names, also use them as State Names
* (Apollon77) More schema information added

### 3.7.2 (2022-10-23)
* (Apollon77) Prevent warnings for invalid min/max values

### 3.7.0 (2022-10-22)
* (Apollon77) Optimizations for Proxy mode to prevent certificate issues
* (Apollon77) Allow to also "click" on the certificate to download the certificate file
* (Apollon77) Adjust min/max values if a scale is defined
* (Apollon77) More schema information added

### 3.6.15 (2022-01-24)
* (Apollon77) More schema information added
* (Apollon77) Recreate Proxy SSL certificates once older than 3 months to prevent ssl errors

### 3.6.14 (2021-11-07)
* (Apollon77) More schema information added

### 3.6.13 (2021-10-28)
* (Apollon77) More schema information added

### 3.6.11 (2021-09-05)
* (Apollon77) More schema information added

### 3.6.9 (2021-07-18)
* (Apollon77) Adjust reconnect handling on initialization

### 3.6.8 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.7 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.6 (2021-07-17)
* (Apollon77) Fix reconnect handling
* (Apollon77) More schema information added

### 3.6.5 (2021-06-23)
* (Apollon77) Make sure for enums values are set with correct type
* (Apollon77) More schema information added

### 3.6.3 (2021-06-04)
* (Apollon77) More schema information added
* (Apollon77) Update tuyapi

### 3.6.2 (2021-05-10)
* (Apollon77) type "bitmap" is a number
* (Apollon77) More schema information added

### 3.6.1 (2021-04-11)
* (Apollon77) More schema information added

### 3.6.0 (2021-04-02)
* (Apollon77) Fix broken data updates because of tuyaapi change
* (Apollon77) Optimize "json unvalid" cases by refreshing data manually differently 
* (Apollon77) More schema information added

### 3.5.9 (2021-03-28)
* (Apollon77) More schema information added

### 3.5.8 (2021-03-24)
* (Apollon77) More schema information added

### 3.5.7 (2021-03-18)
* (Apollon77) Fix crash case (Sentry IOBROKER-TUYA-P9)
* (Apollon77) More schema information added

### 3.5.6 (2021-02-09)
* (Apollon77) More schema information added

### 3.5.4 (2021-01-30)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-TUYA-MG)
* (Apollon77) More schema information added

### 3.5.3 (2021-01-13)
* (Apollon77) More schema information added

### 3.5.2 (2020-12-24)
* (Apollon77) More schema information added

### 3.5.0 (2020-12-10)
* (Apollon77) More schema information added
* (Apollon77) Try to decode "raw" values via base64

### 3.4.3 (2020-11-29)
* (Apollon77) More schema information added

### 3.4.2 (2020-11-19)
* (Apollon77) More schema information added

### 3.4.1 (2020-11-05)
* (Apollon77) More schema information added
* (Apollon77) fix IP lookup via UDP

### 3.4.0 (2020-10-29)
* (Apollon77) update tuya-api library

### 3.3.15 (2020-10-29)
* (Apollon77) More schema information added

### 3.3.14 (2020-09-15)
* (Apollon77) More schema information added

### 3.3.12 (2020-08-26)
* (Apollon77) More schema information added
* (Apollon77) Crash case prevented (Sentry IOBROKER-TUYA-89)

### 3.3.11 (2020-08-18)
* (Apollon77) More schema information added

### 3.3.10 (2020-08-02)
* (Apollon77) More schema information added

### 3.3.9 (2020-07-16)
* (Apollon77) More schema information added

### 3.3.8 (2020-07-09)
* (Apollon77) Work around invalid data that are returned by some devices
* (Apollon77) More schema information added

### 3.3.7 (2020-07-01)
* (Apollon77) More schema information added

### 3.3.6 (2020-06-29)
* (Apollon77) More schema information added

### 3.3.5 (2020-06-11)
* (Apollon77) More schema information added
* (Apollon77) Optimizations and fixes

### 3.3.2 (2020-03-19)
* (Apollon77) Many new schemas added

### 3.2.3 (2020-03-08)
* (Apollon77) Many new schemas added

### 3.2.2 (2020-02-08)
* (Apollon77) New schemas added
* (Apollon77) Better handle strange case where qrcode library is not existing

### 3.2.0 (2020-02-05)
* (Apollon77) Many new schemas added
* (Apollon77) Add Infos about compatible App versions with link to enhanced docs
* (Apollon77) try to detect unsupported apps when trying to sync and write warning in logfile
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.1.16 (2019-12-26)
* (Apollon77) New schemas added
* (Apollon77) prevent crash when proxy request had no hosts array

### 3.1.15 (2019-12-24)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.14 (2019-12-20)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.13 (2019-12-11)
* (Apollon77) New schemas added

### 3.1.12 (2019-12-07)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.11 (2019-12-06)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.10 (2019-12-05)
* (Apollon77) New schemas added

### 3.1.9 (2019-11-30)
* (Apollon77) New schemas added
* (Apollon77) Improve error handling for proxy web port

### 3.1.8 (2019-11-28)
* (Apollon77) New schemas added
* (Apollon77) Add check for invalid proxy port

### 3.1.7 (2019-11-26)
* (Apollon77) New schemas added

### 3.1.6 (2019-11-25)
* (Apollon77) New schemas added
* (Apollon77) Optimize Sentry integration and dedupe errors

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <iobroker@fischer-ka.de>

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