---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: 8HReow5iLosPiWpHlvtVELR3muKwJBg4i470Pj8oH7U=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# IoBroker.tuya
![Testen und freigeben](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

ioBroker-Adapter zur Verbindung mit mehreren kleinen und günstigen WLAN-Geräten, die mit der Tuya-Cloud verbunden sind und meistens die Smartlife-App/Alexa-Skill verwenden. Der Adapter unterstützt das Lesen von Statusaktualisierungen in Echtzeit und die Steuerung dieser Geräte, sobald sie mit der jeweiligen Mobiltelefon-App synchronisiert wurden.

Neben Geräten, die mit der Smart Live App oder der Tuya App verwendet werden können.

Der Adapter verbindet sich lokal mit allen Geräten, die "immer im WLAN" sind. Geräte, die erst bei einem Ereignis online gehen, ihre Daten senden und wieder offline gehen (meistens **batteriebetriebene Geräte**), werden nur über die MQTT-Verbindung der Tuya IoT-Plattform unterstützt (siehe unten).

Eine Adapterinstanz kann alle Geräte in einem Netzwerk, das UDP-Pakete weiterleitet, lokal erkennen und sich mit ihnen verbinden! Für Docker-Umgebungen erfordert dies zusätzliche Aktionen und möglicherweise Macvlan oder ähnliches!

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit betrieben und hat kein geschäftliches Ziel.** **TUYA ist eine Marke von Tuya Global Inc.**

## Funktionalität: Nur lokale vs. von der Cloud unterstützte Funktionen
Dieser Adapter kann, wenn gewünscht, größtenteils ohne die Tuya Cloud arbeiten.

Wenn dies gewünscht wird, ist eine einmalige Synchronisierung mit dem Tuya Cloud App Account erforderlich, sobald neue Geräte hinzugefügt werden. Geben Sie dazu die Cloud-Anmeldeinformationen in der Adapterkonfiguration ein und betätigen Sie die Schaltfläche „Einmal synchronisieren“. Es ist nicht erforderlich, die Cloud-Anmeldeinformationen zu speichern!

**Hinweis: Wenn die App-Synchronisierung abgeschlossen ist, kann es sein, dass die Tuya Mobile App über eine Anmeldung von einem Android-Gerät in das Tuya-Konto informiert. Das ist vom Adapter!**

Der Adapter wartet dann auf lokale UDP-Nachrichten, um die lokalen IPs der Geräte zu finden und eine lokale Verbindung herzustellen. Dies ist nur möglich, wenn die Tuya-App auf KEINEM Gerät geöffnet ist, da die meisten Geräte nur eine lokale Verbindung zulassen.

Wenn Sie sich entscheiden, Ihre Tuya-App-Anmeldeinformationen (Smart Life-App oder Tuya Smart-App) in der Adapterkonfiguration zu speichern, werden die Geräte bei jedem Adapterstart automatisch aktualisiert. Zusätzlich können die Zustände von nicht lokal verbundenen Geräten über die Tuya Cloud abgefragt und gesteuert werden.

Um Echtzeit-Updates von Geräten zu unterstützen, die nicht lokal verbunden sind, und auch z. batteriebasierte Geräte können Sie sich zusätzlich ein Konto auf der Tuya IoT-Plattform registrieren und Ihr App-Konto verknüpfen und eine Cloud-MQTT-Verbindung verwenden. Um ein Konto auf der Tuya IoT-Plattform zu registrieren, befolgen Sie bitte die Anweisungen unter [Tuya IoT-Plattform](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).
**Hinweis: Der IoT Platform Account ist nur für einige Zeit aktiv und muss danach monatlich verlängert werden!**

Wenn Sie die Tuya IoT-Plattform verwenden und im Protokoll die Meldung „Verwenden Sie die App-Cloud-Abfrage, da das letzte MQTT-Update vor 29 Stunden stattfand. Bitte überprüfen Sie Ihren Tuya IoT Cloud-Status, dass kein Dienst abgelaufen ist.“ dann bedeutet dies, dass es in der letzten Zeit keine MQTT-Nachrichten gab und daher höchstwahrscheinlich der iot Core Service abgelaufen ist. Melden Sie sich bei der Tuya IoT-Plattform an und überprüfen Sie den Status des iot Core Service. Wenn es abgelaufen ist, erneuern Sie es (monatlich direkt oder bis zu 6 Monate mit einem manuellen Überprüfungsprozess durch Tuya-Mitarbeiter).
Direkter Link: https://eu.iot.tuya.com/cloud/products?productType=all

Mit diesem Feature-Set können Sie zwischen allen verfügbaren Optionen wählen und mit oder (neben den einmaligen Synchronisierungen) ohne die Tuya Cloud-Systeme arbeiten. Du entscheidest.

Der "ehemalige" App-Proxy-Sync ist noch in der Adapter Config verfügbar, wird aber nicht mehr empfohlen. Es ist viel einfacher, die neue One Time Cloud Sync durchzuführen.

### Wenn die UDP-Erkennung nicht funktioniert
Wenn die Geräte über ihre UDP-Pakete nicht richtig erkannt werden, können Sie die IP manuell einstellen, indem Sie den IP-Status des Geräts auf die richtige IP setzen.
Die erstere Alternative besteht darin, das Geräteobjekt zu bearbeiten. Siehe https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

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

## Geräte, die keine aktuellen Daten liefern
Wir haben einige Geräte entdeckt - höchstwahrscheinlich Geräte mit Strom-/Stromzuständen - die dazu führen können, dass sie nur dann aktuelle Werte anzeigen, wenn die mobile App mit ihnen verbunden ist. Wenn die App geschlossen wird, bleiben sie auf den alten Werten.

Diese Geräte arbeiten derzeit in den meisten Fällen nur per "Polling-Intervall". Sie liefern selbst keine aktuellen Werte. Sie können versuchen, dies zu umgehen, indem Sie die iot-Plattform von Tuya verwenden und die MQTT-Option aktivieren.

Einige dieser Geräte liefern auch bei Verwendung von Polling keine aktuellen Werte. Wenn Sie ein solches Gerät haben, kann es sein, dass das Gerät anders gepollt werden muss. Dies kann manuell konfiguriert werden. Bitte gehen Sie wie folgt vor:

* Stoppen Sie die Tuya-Instanz
* Verwenden Sie Admin auf der Registerkarte "Objekte" und suchen Sie das Objekt mit dem Typ "Gerät" des betroffenen Geräts. Klicken Sie in dieser Zeile in der Ansicht „Admin-Objekte“ auf das Stiftsymbol.
* In der JSON-Ansicht des Objekts sehen Sie einen "nativen" Abschnitt. Fügen Sie in diesem nativen Abschnitt einen neuen JSON-Schlüssel hinzu:

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

* Speichern Sie das Objekt und starten Sie den Adapter neu und prüfen Sie, ob die Werte jetzt aktualisiert werden.

## Funktionen des Infrarot-Gateways
Im Objektbaum gibt es verschiedene Arten von IR-Geräten

### Die IR-Gateway/Sender-Geräte
Dies ist das eigentliche Gerät, das Sie als Hardware haben. Dieses Gerät wird von Untergeräten verwendet, die in der mobilen App definiert sind (siehe unten) und kann verwendet werden, um benutzerdefinierte IR-Codes zu lernen und zu senden.

Der Zustand "ir-learn" in diesem Gerät ist ein Trigger, der zum Lernen von IR-Codes verwendet werden kann. Der gelernte Code wird dann im "202"-Zustand als base64-codierte Daten empfangen.

Der Status „ir-send“ kann verwendet werden, um einen Base64-codierten IR-Code an das Gerät zu senden. Dies kann verwendet werden, um den gelernten Code aus dem "ir-learn"-Zustand zu senden.

**Diese Art der Steuerung funktioniert nur auf dem "Haupt-IR-Gerät".**

### Die IR-Untergeräte
Die IR-Sub-Geräte haben viele "ir-*"-Zustände, die alle Tasten sind, um den jeweiligen Button/IR-Code auszulösen. Die IR-Zustände sollten mit dem Layout der Schaltflächen in der mobilen App übereinstimmen.

Einige Geräte haben Kombizustände wie „M0_T20_S3“ (gefunden von einer Daikin-Klimaanlage), was Modus 0, Temperatur 20 und (Lüfter-)Geschwindigkeit 3 bedeutet. Tatsächlich müssen Sie die richtige Taste auswählen. Bis jetzt haben wir keinen generischen/automatischen Weg gefunden, um herauszufinden, welcher Button welcher ist.
Die mobile App selbst versucht auch, sich diese Einstellungen zu merken, sobald Sie also etwas mit dem Adapter (oder dem echten IR-Controller des Geräts) auslösen, sind die Informationen der App veraltet.

## Szenenfunktionen
Wenn die App-Cloud-Credentials eingegeben und gespeichert werden, liest der Adapter auch die Szenen aus der App aus und legt sie als Objekte im Adapter an. Die Szenen können ausgelöst werden, indem der Szenenzustand auf wahr gesetzt wird.

Die Auslösung wird dann an die Cloud gesendet.

## Gruppenfunktionen
Der Adapter liest auch definierte Gruppen aus und erzeugt entsprechende Zustände im Adapter. Der Gruppenwert wird auch von der Cloud abgefragt und im Adapter aktualisiert.
Bei der Steuerung von Gruppen erfolgt dies ebenfalls über die Cloud, da sonst der Gruppenstatus asynchron läuft.

## Konvertierte/Erweiterte Datenpunkte
Die Daten einiger Datenpunkte sind verschlüsselt und müssen daher entschlüsselt und erneut verschlüsselt werden, wenn sie sich ändern dürfen.

### Bitmap-Felder
Einige Felder enthalten Bitmaps, was bedeutet, dass es sich um eine Zahl handelt und jedes Bit in dieser Zahl einen Zustand darstellt. Der Adapter konvertiert diese Felder in Unterzustände wie X-0 (für Bit 0), X-1 (für Bit 1) und so weiter. Die Bezeichnung des Bits wird dem Namen des Zustands hinzugefügt.
Derzeit sind Bitfelder nicht beschreibbar.

### RGB-Farbzustände (IDs 24/5/colour/colour_data)
RGB-Farbdatenpunkte werden in ein Objekt 5-rgb/24-rgb als RGB-Wert in der Form „#rrggbb“ dekodiert. Die aktuelle Farbe wird in diesen Zustand decodiert und kann auch durch Setzen dieses Zustands eingestellt werden.
Achten Sie darauf, den richtigen Modus der Lampe (Weiß/Farbe) zu verwenden, da Farbe nur relevant ist, wenn der Farbmodus aktiv ist.

### Leistungsmesszustände (IDs 5/6/7/phase_a/phase_b/phase_c)
Die Leistungsmesszustände werden in ein Objekt X-Strom, X-Leistung und X-Spannung dekodiert. X-Power hat nur für einige Geräte einen Wert.
Diese Zustände sind nicht beschreibbar.

### Gerätealarmzustände (IDs 17/alarm_set_2)
Die Alarmzustände werden in ein 17-dekodiertes Objekt mit einem json als Wert dekodiert. Der JSON enthält ein Array mit der Liste der definierten Alarmtypen und ihren Schwellenwerten.
Sie können diesen JSON ändern und festlegen, um die Alarmeinstellungen zu ändern. Die folgenden Alarmtypen sind bekannt (werden aber möglicherweise nicht von allen Geräten unterstützt):

* Überstrom
* three_phase_current_imbalance
* Amperemeter_Überspannung
* Unterspannung
* dreiphasiger_Stromverlust
* Stromausfall
* magnetisch
* mangelhaftes Gleichgewicht
* Zahlungsrückstände
* Batterie_Überspannung
* cover_open
* meter_cover_open
* Fehler

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

### __WORK IN PROGRESS__
* (Apollon77) Add generic support for gateways (and so also WLAN Gateways)
* (Apollon77) More schema information added/updated

### 3.12.1 (2023-01-03)
* (Apollon77) More schema information added/updated

### 3.12.0 (2022-12-29)
* (Apollon77) Added decoding of phase_a/b/c and alarm_set_2
* (Apollon77) Added fallback for cloud polling when no values were updated using MQTT connection
* (Apollon77) Added decoding of bitmaps (read only for now)

### 3.11.4 (2022-12-28)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.3 (2022-12-22)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.2 (2022-12-20)
* (Apollon77) More schema information added/updated
* (Apollon77) A crash case reported by Sentry is prevented

### 3.11.1 (2022-12-15)
* (Apollon77) More schema information added/updated
* (Apollon77) Prevent crash case reported by Sentry

### 3.11.0 (2022-12-14)
* (Apollon77) Added support to control Zigbee Devices via Hubs locally
* (Apollon77) Prevent crash case when new unencrypted device is discovered
* (Apollon77) More schema information added/updated

### 3.10.2 (2022-12-05)
* (Apollon77) Optimize IR - now works locally and via cloud in all cases

### 3.10.1 (2022-12-05)
* (Apollon77) Make info.ip writable to allow manual setting of IP address

### 3.10.0 (2022-12-05)
* (Apollon77) Added support for groups
* (Apollon77) Add support for a second type of IR blaster
* (Apollon77) Added cloud session refresh while adapter is running
* (Apollon77) Add custom handling for bright_value fields with missing scale factor (10..1000 will be now 1..100);
* (Apollon77) Base64 encoded raw values are now decoded again when the decoded value is readable ascii
* (Apollon77) Allow to flag devices manually that need "refresh instead of get" to get current data - use "useRefreshToGet: true" in device object native section
* (Apollon77) More schema information added/updated

### 3.9.4 (2022-11-19)
* (Apollon77) More schema information added/updated

### 3.9.3 (2022-11-17)
* (Apollon77) Optimize Tuya protocol 3.4 discovery
* (Apollon77) Prevent restart schedules that are too short when cloud is used
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) More schema information added/updated

### 3.9.2 (2022-11-16)
* (Apollon77) Optimize discovery and device connection checks
* (Apollon77) IPs of unconnected devices can be set via the ip state now
* (Apollon77) Fix crash cases reported by Sentry

### 3.9.1 (2022-11-14)
* (Apollon77) Add support for local control of Tuya protocols 3.2 and 3.4
* (TA2k/Apollon77) Add basic support for IR devices (Gateway and Sub Devices)
* (Apollon77) Convert special colour/colour_data values to an additional rgb state
* (Apollon77) Allow to define that devices do not connect locally (this prevents error logs, and they work via cloud if data are provided)
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

Copyright (c) 2018-2023 Apollon77 <iobroker@fischer-ka.de>

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