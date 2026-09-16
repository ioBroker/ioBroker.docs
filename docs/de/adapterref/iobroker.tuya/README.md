---
chapters: {"pages":{"en/adapterref/iobroker.tuya/README.md":{"title":{"en":"ioBroker.tuya"},"content":"en/adapterref/iobroker.tuya/README.md"},"en/adapterref/iobroker.tuya/PROXY.md":{"title":{"en":"Proxy instructions for mobile Phones"},"content":"en/adapterref/iobroker.tuya/PROXY.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: +h2lzblNtCaJsmIO0aT58QkIMbodiFiABq6EAwdlKj4=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# ioBroker.tuya

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der ioBroker-Adapter verbindet mehrere kleine und kostengünstige WLAN-Geräte mit der Tuya Cloud und nutzt hauptsächlich die Smartlife App/Alexa-Skill. Nach der Synchronisierung mit der jeweiligen Smartphone-App unterstützt der Adapter das Auslesen von Echtzeit-Statusaktualisierungen und die Steuerung dieser Geräte.

Abgesehen von Geräten, die mit der Smart Live App oder der Tuya App kompatibel sind.

Der Adapter verbindet sich lokal mit allen Geräten, die „immer mit WLAN verbunden“ sind. Geräte, die nur bei einem Ereignis online gehen, ihre Daten senden und dann wieder offline gehen (meist **batteriebetriebene Geräte** ), werden nur über die Tuya IoT Platform MQTT-Verbindung unterstützt (siehe unten).

Eine einzige Adapterinstanz kann lokal alle Geräte in einem Netzwerk erkennen und sich mit ihnen verbinden, die UDP-Pakete weiterleiten! In Docker-Umgebungen sind dafür zusätzliche Maßnahmen und möglicherweise Macvlan oder ähnliches erforderlich!

**Hinweis: Aufgrund der verwendeten Netzwerkports kann nur eine Instanz dieses Adapters auf einem Host ausgeführt werden.**

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.** **TUYA ist eine Marke der Tuya Global Inc.**

## Funktionalität: Lokale Funktionen vs. Cloud-Unterstützung

Dieser Adapter kann, falls gewünscht, größtenteils auch ohne die Tuya Cloud funktionieren.

Wenn Sie dies wünschen, ist eine einmalige Synchronisierung mit Ihrem Tuya Cloud-App-Konto erforderlich, sobald neue Geräte hinzugefügt werden. Geben Sie dazu die Cloud-Zugangsdaten in der Adapterkonfiguration ein und klicken Sie auf die Schaltfläche „Einmalig synchronisieren“. Die Cloud-Zugangsdaten müssen nicht gespeichert werden!

**Hinweis: Nach Abschluss der App-Synchronisierung kann es vorkommen, dass die Tuya Mobile App eine Anmeldung von einem Android-Gerät im Tuya-Konto meldet. Dies wird vom Adapter verursacht!**

Der Adapter empfängt dann lokale UDP-Nachrichten, um die lokalen IP-Adressen der Geräte zu ermitteln und eine lokale Verbindung herzustellen. Dies ist nur möglich, wenn die Tuya-App auf keinem Gerät geöffnet ist, da die meisten Geräte nur eine lokale Verbindung zulassen.

Wenn Sie Ihre Anmeldedaten für die Tuya-App (Smart Life App oder Tuya Smart App) in der Adapterkonfiguration speichern, werden die Geräte bei jedem Neustart des Adapters automatisch aktualisiert. Zusätzlich können die Zustände von Geräten, die nicht lokal verbunden sind, über die Tuya Cloud abgefragt und gesteuert werden.

Um Echtzeit-Updates für Geräte zu unterstützen, die nicht lokal verbunden sind, beispielsweise auch für batteriebetriebene Geräte, können Sie sich zusätzlich ein Konto auf der Tuya IoT-Plattform erstellen, Ihr App-Konto verknüpfen und eine Cloud-MQTT-Verbindung nutzen. Folgen Sie dazu den Anweisungen auf der Tuya IoT [-Plattform](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx) . **Hinweis: Das IoT-Plattform-Konto ist zeitlich begrenzt und muss anschließend monatlich verlängert werden!**

Wenn Sie die Tuya IoT-Plattform nutzen und im Protokoll eine Meldung wie „Verwenden Sie App-Cloud-Polling, da die letzte MQTT-Aktualisierung 29 Stunden zurückliegt. Bitte überprüfen Sie Ihren Tuya IoT Cloud-Status, um sicherzustellen, dass kein Dienst abgelaufen ist.“ erhalten, bedeutet dies, dass in letzter Zeit keine MQTT-Nachrichten empfangen wurden und der IoT Core Service höchstwahrscheinlich abgelaufen ist. Melden Sie sich bei der Tuya IoT-Plattform an und überprüfen Sie den Status des IoT Core Service. Falls dieser abgelaufen ist, verlängern Sie ihn (entweder monatlich direkt oder für bis zu 6 Monate nach einer manuellen Überprüfung durch Tuya-Mitarbeiter). Direktlink: <https://eu.iot.tuya.com/cloud/products?productType=all>

Mit diesem Funktionsumfang können Sie zwischen allen verfügbaren Optionen wählen und mit oder (abgesehen von den einmaligen Synchronisierungen) ohne die Tuya Cloud-Systeme arbeiten. Sie entscheiden.

Die frühere App-Proxy-Synchronisierung ist zwar noch in der Adapterkonfiguration verfügbar, wird aber nicht mehr empfohlen. Die neue einmalige Cloud-Synchronisierung ist wesentlich einfacher.

### Wenn die UDP-Erkennung nicht funktioniert

Werden die Geräte nicht korrekt über ihre UDP-Pakete erkannt, können Sie die IP-Adresse manuell festlegen, indem Sie den IP-Status des Geräts auf die korrekte IP-Adresse setzen. Alternativ können Sie das Geräteobjekt bearbeiten. Siehe <https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636>

### Hinweis für batteriebetriebene Geräte

Wie bereits erwähnt, werden batteriebetriebene Geräte von diesem Adapter bei rein lokalen Verbindungen nicht unterstützt. Der Grund dafür ist, dass sie nicht permanent online sind, um Strom zu sparen. Sobald sie ein Signal empfangen, schalten sie sich online, senden das Update an die Tuya-Cloud-Server und schalten sich anschließend wieder ab. Sie senden keine UDP-Pakete und sind nicht lange genug online, damit der Adapter eine Verbindung zu ihnen herstellen kann.

Mithilfe der Tuya App Cloud-Funktion können Daten abgefragt werden, dies reicht jedoch möglicherweise nicht für Tür-/Fenster-/Präsenzmelder aus. Diese funktionieren nur mit der Tuya IoT Platform MQTT-Verbindung.

## Proxy-Synchronisierung (Fallback): Kompatible mobile Apps und Versionen

Die aktuellen Versionen der Tuya Smart und Smartlife App sind **nicht mehr mit der Funktionsweise des Adapters kompatibel** , da Tuya den gesamten vom Adapter abfangbaren Datenverkehr verschlüsselt hat. Einige ältere Versionen der Apps funktionieren derzeit noch.

- Smartlife App <3.14, beste Version 3.12.6!!
- Tuya Smart App <3.14, beste Version 3.12.x
- STL Smart Home App 1.1.1 (zuletzt aktualisiert im September 2019)
- Ucomen Home App (??)

**Wichtiger Hinweis für iOS-Nutzer:** Die hier beschriebene Proxy-Methode funktioniert nicht mehr. Ab Version 3.10 der Smart Life App ist die Kommunikation der App für den Proxy nicht mehr sichtbar. Mit allen Android-App-Versionen funktioniert sie jedoch weiterhin. Daher ist die beste Lösung ein Android-Emulator, wie er unter <https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19> kurz beschrieben wird.

Dazu müssen Sie zunächst ein benutzerdefiniertes Stammzertifikat auf Ihrem Mobilgerät hinzufügen. Wenn Sie in der Adapterinstanzkonfiguration auf „Proxy starten“ klicken, wird das Zertifikat für Ihr System erstellt und ein QR-Code mit dem Download-Link angezeigt. Scannen Sie den QR-Code idealerweise mit Ihrem Mobilgerät und folgen Sie den Anweisungen, um das Stammzertifikat hinzuzufügen und ihm zu vertrauen. Falls der QR-Code nicht erreichbar ist (was beispielsweise bei der Verwendung von Docker vorkommen kann), öffnen Sie den „Proxy-Web-Info-Port“ in Ihrem Browser und klicken Sie in der Navigation auf „Root-CA“. Dort können Sie die CA-Datei ebenfalls herunterladen.

Schließen Sie nun die entsprechende Tuya Smart-App. Fügen Sie anschließend den Proxy-Port und den ioBroker-Host als „Manuellen“ Proxy für Ihre WLAN-Verbindung auf Ihrem Mobiltelefon hinzu.

Öffnen Sie nun die entsprechende Tuya Smart App und/oder laden Sie die Seite neu.

Die Administratorkonfiguration zeigt eine Erfolgsmeldung an, sobald das entsprechende Datenpaket empfangen wurde, und deaktiviert den Proxy 10 Sekunden später. Sie können den Proxy nun von Ihrem Telefon entfernen und das Zertifikat als vertrauenswürdig einstufen.

Unmittelbar danach sollten die Objekte mit aussagekräftigeren Namen versehen werden und von da an automatisch Live-Updates erhalten und miteinander kommunizieren können.

Die Synchronisierung ist nur bei der ersten Installation oder nach dem Hinzufügen neuer Geräte zu Ihrer App erforderlich.

Einige Images für bestimmte mobile Betriebssysteme finden Sie auf der [Proxy-Seite](/#/docs/adapterref/iobroker.tuya/PROXY.md) .

## Geräte, die keine aktuellen Daten liefern

Wir haben einige Geräte entdeckt – höchstwahrscheinlich solche mit Strom-/Energiestatusanzeige –, die nur dann aktuelle Werte anzeigen, wenn die mobile App mit ihnen verbunden ist. Sobald die App geschlossen wird, bleiben die alten Werte erhalten.

Diese Geräte funktionieren derzeit in den meisten Fällen nur über ein Abfrageintervall. Sie liefern nicht selbstständig aktuelle Werte. Sie können versuchen, dieses Problem zu umgehen, indem Sie die IoT-Plattform von Tuya verwenden und die MQTT-Option aktivieren.

Einige dieser Geräte liefern bei der Abfrage keine aktuellen Werte. Falls Sie ein solches Gerät besitzen, muss die Abfrage möglicherweise anders konfiguriert werden. Gehen Sie dazu wie folgt vor:

- Stoppe die Tuya-Instanz.
- Öffnen Sie die Admin-Oberfläche und wechseln Sie zum Tab „Objekte“. Suchen Sie dort das Objekt vom Typ „Gerät“, das dem betroffenen Gerät entspricht. Klicken Sie in der Ansicht „Admin-Objekte“ in dieser Zeile auf das Stiftsymbol.
- In der JSON-Ansicht des Objekts sehen Sie einen Abschnitt namens „native“. Fügen Sie in diesem Abschnitt „native“ einen neuen JSON-Schlüssel hinzu:

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

- Speichern Sie das Objekt, starten Sie den Adapter neu und prüfen Sie, ob die Werte nun aktualisiert wurden.

## Funktionen des Infrarot-Gateways

Im Objektbaum gibt es verschiedene Arten von IR-Geräten.

### Die IR-Gateway-/Sendergeräte

Dies ist das eigentliche Gerät, das Sie als Hardware besitzen. Dieses Gerät wird von in der mobilen App definierten Untergeräten (siehe unten) verwendet und kann zum Erlernen und Senden benutzerdefinierter IR-Codes genutzt werden.

Der Zustand „ir-learn“ dieses Geräts ist ein Trigger, der zum Erlernen von IR-Codes verwendet werden kann. Der erlernte Code wird anschließend im Zustand „202“ als Base64-kodierte Daten empfangen.

Der Zustand „ir-send“ kann verwendet werden, um einen Base64-kodierten IR-Code an das Gerät zu senden. Damit lässt sich der im Zustand „ir-learn“ gelernte Code senden.

**Diese Steuerungsmethode funktioniert nur mit dem „Haupt-IR-Gerät“.**

### Die IR-Teilgeräte

Die IR-Untergeräte verfügen über zahlreiche „ir-\*“-Zustände, die allesamt Tasten zur Auslösung des jeweiligen Tasten-/IR-Codes darstellen. Die IR-Zustände sollten dem Tastenlayout in der mobilen App entsprechen.

Manche Geräte verfügen über Kombinationszustände wie „M0\_T20\_S3“ (z. B. bei einer Daikin-Klimaanlage), was Modus 0, Temperatur 20 und Lüfterstufe 3 bedeutet. Tatsächlich muss die richtige Taste ausgewählt werden. Bisher haben wir keine allgemeine/automatische Methode gefunden, um die Tastenbelegung zu ermitteln. Die mobile App selbst versucht, diese Einstellungen zu speichern. Sobald Sie also etwas mit dem Adapter (oder der Infrarot-Fernbedienung des Geräts) auslösen, sind die Informationen in der App veraltet.

## Szenenmerkmale

Sobald die Cloud-Anmeldeinformationen der App eingegeben und gespeichert sind, liest der Adapter die Szenen aus der App aus und erstellt sie als Objekte im Adapter. Die Szenen können durch Setzen des Szenenstatus auf „true“ ausgelöst werden.

Der Auslöser wird dann an die Cloud gesendet.

## Gruppenfunktionen

Der Adapter liest außerdem definierte Gruppen aus und erstellt entsprechende Zustände. Der Gruppenwert wird zudem aus der Cloud abgefragt und im Adapter aktualisiert. Die Steuerung von Gruppen erfolgt ebenfalls über die Cloud, da der Gruppenstatus sonst nicht synchron wäre.

## Konvertierte/Verbesserte Datenpunkte

Die Daten einiger Datenpunkte sind kodiert und müssen daher entschlüsselt und neu verschlüsselt werden, wenn Änderungen zugelassen werden.

### Bitmap-Felder

Einige Felder enthalten Bitmaps, d. h. sie bestehen aus einer Zahl, wobei jedes Bit einen Zustand repräsentiert. Der Adapter wandelt diese Felder in Unterzustände wie X-0 (für Bit 0), X-1 (für Bit 1) usw. um. Die Bezeichnung des Bits wird dem Zustandsnamen hinzugefügt. Bitfelder sind derzeit nicht beschreibbar.

### RGB-Farbzustände (IDs 24/5/colour/colour\_data)

RGB-Farbdatenpunkte werden in ein 5-RGB/24-RGB-Objekt als RGB-Wert im Format „#rrggbb“ dekodiert. Die aktuelle Farbe wird in diesem Zustand dekodiert und kann auch durch Setzen dieses Zustands festgelegt werden. Achten Sie darauf, den richtigen Lampenmodus (Weiß/Farbe) zu verwenden, da die Farbe nur im Farbmodus relevant ist.

### Leistungsmesszustände (IDs 5/6/7/Phase\_a/Phase\_b/Phase\_c)

Die Leistungsmesszustände werden in die Objekte X-Strom, X-Leistung und X-Spannung dekodiert. X-Leistung besitzt nur für einige Geräte einen Wert. Diese Zustände sind nicht beschreibbar.

### Gerätealarmzustände (IDs 17/alarm\_set\_2)

Die Alarmzustände werden in ein 17-dekodiertes Objekt mit einem JSON-Wert dekodiert. Das JSON enthält ein Array mit der Liste der definierten Alarmtypen und ihrer Schwellenwerte. Sie können dieses JSON bearbeiten und die Alarmeinstellungen ändern. Folgende Alarmtypen sind bekannt (möglicherweise werden jedoch nicht alle von allen Geräten unterstützt):

- Überstrom
- Dreiphasen-Stromungleichgewicht
- Amperemeter\_Überspannung
- Unterspannung
- dreiphasigen Stromverlust
- Stromausfall
- magnetisch
- Unzureichendes Guthaben
- Verzug
- Batterieüberspannung
- Abdeckung\_öffnen
- Zählerabdeckung offen
- Fehler

## Credits

Die Entwicklung des Adapters wäre ohne die großartige Arbeit von @codetheweb, @kueblc und @NorthernMan54 ( <https://github.com/codetheweb/tuyapi> ) und <https://github.com/clach04/python-tuya,https://github.com/uzlonewolf/tinytuya> und vielen anderen nicht möglich gewesen.

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie hierfür die GitHub-Issues.

Am besten stellen Sie den Adapter auf Debug-Log-Modus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierung). Laden Sie anschließend die Logdatei von Ihrer Festplatte herunter (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Falls Sie die Datei nicht in einem GitHub-Issue bereitstellen möchten, können Sie sie mir auch per E-Mail senden ( <iobroker@fischer-ka.de> ). Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Issue hinzu und beschreiben Sie, welche Einträge in der Logdatei zu welchem Zeitpunkt angezeigt werden.

Wenn Probleme mit der Tuya App Cloud-Synchronisierung auftreten, können zusätzliche Protokolle durch den folgenden Prozess generiert werden:

- Den Adapter im Administratormodus stoppen.
- Öffnen Sie eine Shell auf dem ioBroker-Host.
- ausführen`DEBUG=@tuyapi/cloud* iobroker debug tuya`
- Rufen Sie das Protokoll über die Kommandozeile ab. Senden Sie das Protokoll mit Bezug auf das generierte GitHub-Issue an [iobroker@fischer-ka.de.](mailto:iobroker@fischer-ka.de)

## Changelog
### 3.18.2 (2026-08-25)
* (@Apollon77) Removes the http-mitm-proxy patching because no longer needed

### 3.18.1 (2026-08-24)
* (@Apollon77) Fixed initial setting and value correction for special Temp values
* (@Apollon77) Updating Tuyapi to latest version to prevent parsing issues
* (@Apollon77) Adjust timestamps from MQTT
* (@Apollon77) More schema information were added/updated

### 3.17.0 (2025-01-08)
* (@Apollon77) Added support for Tuya 3.5 devices
* (@Apollon77) Fixed several errors report by Sentry
* (@Apollon77) Tried to reduce memory usage by only loading Schema definitions when needed and giving memory free afterward
* (@Apollon77) More schema information were added/updated
* (@Apollon77) Added enhanced logic for AC/DC states and generalized it for more devices
* (@Apollon77) Fixed raw data parsing for some devices
* (@Apollon77) Adjusted special handling for TempSet, TempCurrent and FloorTemp states to return correct values
* (@simatec) Responsive Design added

### 3.16.0 (2024-08-15)
* js-controller 5.0 is now required at least
* (Apollon77) Improves stability
* (Apollon77) Tries to support phase_X information with 10 bytes
* (Apollon77) More schema information were added/updated

### 3.15.0 (2023-11-23)
* (agraf) Add support to login with "Ledvance" App account
* (Apollon77) Add support to login with "Sylvania" App account
* (Apollon77) Fixed several smaller issues reported by Sentry
* (Apollon77) More schema information added/updated

### 3.14.2 (2023-03-24)
* (Apollon77) prevent state polling to hang when decide do not return new data
* (Apollon77) More schema information added/updated

### 3.14.1 (2023-02-09)
* (Apollon77) Also adjust min/max when using multipliers
* (Apollon77) More schema information added/updated

### 3.14.0 (2023-01-28)
* (Apollon77) Added special handling for needed multiplier for TempSet(2), TempCurrent(3) and floorTemp(102) objects
* (Apollon77) More schema information added/updated

### 3.13.1 (2023-01-16)
* (Apollon77) More schema information added/updated

### 3.13.0 (2023-01-10)
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

Copyright (c) 2018-2026 Apollon77 <iobroker@fischer-ka.de>

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