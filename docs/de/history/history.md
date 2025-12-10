---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/history/history.md
title: Was ist neu
hash: O+UfdgISkRr8gHDKj4AJqdCRYdHznItfHA1IoYCB/Qg=
---
# Was ist neu
## Hinweise für Autoren
- Bitte definieren Sie die Kopfzeile als

## Adaptername (JJJJ-MM-TT) - [Kurzbeschreibung]
- Die Beschreibung der Aufnahme könnte lauten:
- neuer Adapter
- stabile Version
- neue Funktion
- neues Widget
- Falls Sie Neuigkeiten zum neuen Adapter haben, fügen Sie bitte einen GitHub-Link und ein Logo des Adapters hinzu.

  Beispiel:

```markdown
    ## frigate (2023-08-20) - new adapter
    https://github.com/Bettman66/ioBroker.frigate

    <img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />
```

## Ecoflow-mqtt (14.10.2024) - neuer Adapter
https://github.com/foxthefox/ioBroker.ecoflow-mqtt

<img src="https://raw.githubusercontent.com/foxthefox/ioBroker.ecoflow-mqtt/main/admin/ecoflow-mqtt.png" width="100" height="100" />

Der ioBroker-Adapter zur Verbindung mit dem Ecoflow MQTT-Server (Emulation der App-Kommunikation) bietet außerdem ein Home Assistant Gateway über die Discovery-Funktion.

## Fregatte (2023-08-20) - neuer Adapter
https://github.com/Bettman66/ioBroker.frigate

<img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />

Frigate ist ein Open-Source-NVR, der auf KI-gestützter Objekterkennung in Echtzeit basiert. Dieser Adapter analysiert die MQTT-Nachrichten von Frigate und erstellt daraus Datenobjekte.

## Notification-manager (2023-08-21) - neuer Adapter
https://github.com/foxriver76/ioBroker.notification-manager

<img src="https://raw.githubusercontent.com/foxriver76/ioBroker.notification-manager/master/admin/notification-manager.png" width="100" height="100" />

Verwalten Sie ioBroker-Benachrichtigungen, z. B. durch Senden als Nachrichten

## Procon-ip (2023-08-24)
https://github.com/ylabonte/ioBroker.procon-ip

<img src="https://raw.githubusercontent.com/ylabonte/ioBroker.procon-ip/master/admin/procon-ip.png" width="100" height="100" />

ioBroker-Adapter zur grundlegenden Unterstützung der Schwimmbadsteuereinheit `ProCon.IP`.

## Deyeicd (2023-08-29)
https://github.com/raschy/ioBroker.deyeidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.deyeidc/master/admin/deyeidc.png" width="100" height="100" />

Datensammler vor `Deye`-kompatibler Wechselrichter

## Acme (2023-09-01)
https://github.com/iobroker-community-adapters/ioBroker.acme

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.acme/master/admin/acme.png" width="100" height="100" />

Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Admin (01.09.2023)
Kontextmenü:

- z. B. einfache Erstellung von Aliasen

  ![Bild 1](../../en/history/media/2023_09_26_admin_context.png)

## JavaScript (01.09.2023)
Spielplatz für JavaScript-Code:

Sie können ChatGPT (API-Schlüssel erforderlich) verwenden, um das Skript zu generieren. Dies dient lediglich dazu, die Möglichkeiten von ChatGPT zu testen.

  ![Bild 1](../../en/history/media/2023_09_27_javascript_chat_gpt.png)

## Cec2 (2023-09-06)
https://github.com/iobroker-community-adapters/ioBroker.cec2

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.cec2/master/admin/cec2.png" width="100" height="100" />

Adapter für HDMI CEC – Sie können Geräte über HDMI CEC überwachen und steuern. Die meisten modernen Fernseher und Multimedia-Geräte unterstützen CEC zumindest teilweise.

## Alexa2 (09.09.2023)
* (Apollon77) Aktualisieren Sie den Alexa2-Adapter, um ihn an das geänderte Push-Benachrichtigungssystem von Amazon anzupassen und so wieder den Zugriff auf Verlaufs- und Interaktionsinformationen zu ermöglichen.

## Vis-2-widgets-material (2023-09-10)
* (bluefox) Das Türschloss-Widget wurde hinzugefügt

![Bild 1](media/2023_09_10_vis-2-widgets-material-lock-1.png) ![Bild 1](../../en/history/media/2023_09_10_vis-2-widgets-material-lock-2.png)

## Pushbullet (10.09.2023)
<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.pushbullet/master/admin/pushbullet.png" width="100" height="100" />

* Die (bluefox) API wurde auf Version 3 aktualisiert.
* (bluefox) JSON-Konfiguration hinzugefügt

  ![JSON-Konfiguration](../../en/history/media/2023_09_10_pushbullet.png)

## JSON-Konfigurationsdokumentation
* (bluefox) Die JSON-Config-Dokumentation wurde der ioBroker-Website hinzugefügt [hinzugefügt](https://www.iobroker.net/#en/documentation/dev/adapterjsonconfig.md).

## Telegram-Menü (11.09.2023)
https://github.com/MiRo1310/ioBroker.telegram-menu

<img src="https://raw.githubusercontent.com/MiRo1310/ioBroker.telegram-menu/master/admin/telegram-menu.png" width="100" height="100" />

Erstellen Sie ganz einfach Telegram-Menüs

## Vis-2 (2023-09-12)
* (bluefox) Horizontales Menü

  ![Bild 1](../../en/history/media/2023_09_12_vis-2-menu.png)

## Echarts (12.09.2023)
* (bluefox) Die Möglichkeit, die Daten in eine JSON-Datei zu exportieren, wurde hinzugefügt.

  ![Bild 1](../../en/history/media/2023_09_12_echart-1.png)

* (bluefox) Die Möglichkeit, Zoom und Schwenken nach X Sekunden Inaktivität wiederherzustellen, wurde hinzugefügt.

  ![Bild 1](../../en/history/media/2023_09_12_echart-2.png)

* (bluefox) Legende als Dialog anzeigen

  ![Bild 2](../../en/history/media/2023_09_13_echart-3.png)

## Js-controller (2023-09-14)
* (foxriver76) Veröffentlichung von js-controller 5 in die stabile Version
* (foxriver76) Installer so aktualisieren, dass nur noch Node.js 16.x+ zugelassen wird.

## Apg-info (2023-09-16)
https://github.com/HGlab01/ioBroker.apg-info - neuer Adapter

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.apg-info/master/admin/apg-info.png" width="100" height="100" />

Dieser Adapter liefert die Spitzenzeiten des österreichischen Stromnetzes, in denen ein hoher Stromverbrauch vermieden werden sollte. Zusätzlich stellt er die PHELIX-AT-Day-Ahead-Preise (EPEX Spot) für Österreich bereit.

## Tinymqttbroker (16.09.2023) - neuer Adapter
https://github.com/HGlab01/ioBroker.tinymqttbroker

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.tinymqttbroker/master/admin/tinymqttbroker.png" width="100" height="100" />

Dies ist ein sehr kleiner MQTT-Broker, der keine Objekte/Zustände in ioBroker verwaltet, sondern eine zentrale MQTT-Broker-Instanz zum Veröffentlichen und Abonnieren von Themen als MQTT-Client bietet.

## Awtrix-light (2.10.2023) - neuer Adapter
https://github.com/klein0r/ioBroker.awtrix-light

<img src="https://raw.githubusercontent.com/klein0r/ioBroker.awtrix-light/master/admin/awtrix-light.png" width="100" height="100" />

Integrieren Sie Ihr Awtrix Light-Gerät (z. B. Ulanzi TC001) über HTTP

## Webui (3.10.2023) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.webui

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/admin/logo.png" width="100" height="100" />

Dies ist ein komplettes Visualisierungssystem für ioBroker.

* vollständig auf Webkomponenten basierend
* WYSIWYG-Editor für die Benutzeroberfläche, aber Sie können auch zur Quelltextansicht oder geteilten Ansicht wechseln.
* Mehrfenster-Benutzeroberfläche in der Bearbeitungsansicht, wie in Visual Studio
* Bindungen pro Drag & Drop von ioBroker-Objekten auf UI-Elemente oder Eigenschaften
* komplexe Bindungen mit JavaScript-Einbindung und Konvertern
* eine einfache Skriptsprache, die über die Benutzeroberfläche erstellt werden kann.

## Heizungssteuerung (4.10.2023) - neuer Adapter
https://github.com/jbeenenga/ioBroker.heizungssteuerung

<img src="https://raw.githubusercontent.com/jbeenenga/ioBroker.heizungssteuerung/master/admin/heizungssteuerung.png" width="100" height="100" />

Dieser Adapter dient zur Steuerung von Heizsystemen.
Sie können zwischen Kühl- und Heizbetrieb wählen und die Boost- oder Pausenfunktion für einen Raum aktivieren. Außerdem können Sie die Zieltemperatur für einen Raum überschreiben.

## Admin und MQTT (11.10.2023) – neue Funktion
Die Admin- und MQTT-Adapter prüfen nun, ob sie aus dem öffentlichen Internet erreichbar sind, wenn keine Authentifizierung aktiviert ist. Falls nicht, wird eine Warnung im Protokoll und in der Admin-Oberfläche angezeigt.

Dies ist eine nützliche Funktion, da nicht alle Benutzer wissen, wie sie ihre Adapter sichern können, und es ist gefährlich, einen MQTT- oder Admin-Adapter ohne Authentifizierung mit dem Internet zu verbinden.

## Iobroker (11.10.2023) - neue Funktion
Node.js lässt sich nun über die Kommandozeile aktualisieren: `iob nodejs-update` https://forum.iobroker.net/topic/69067/neuer-befehl-iob-nodejs-update

Sie können ohne zusätzliche Parameter auf eine empfohlene Version (derzeit 18) aktualisieren oder eine Version angeben: `iob nodejs-update 20`

## Vis-2-widgets-material (13.10.2023) - neues Widget
Ein Staubsauger-Widget wurde hinzugefügt.

Dieses Widget ist primär für Xiaomi-Staubsauger gedacht.
Es kann aber auch für andere Staubsauger verwendet werden.
Der einzige Unterschied besteht darin, dass Xiaomi die Raumreinigung unterstützt.

![Bild 1](../../en/history/media/2023_10_13_material-vacuum.png)

## Willkommen (17.10.2023) – neuer Adapter
https://github.com/ioBroker/ioBroker.welcome

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.welcome/master/admin/welcome.png" width="100" height="100" />

Dieser Adapter zeigt alle Web- und Admin-Instanzen von ioBroker auf einer Seite auf Port 80 (konfigurierbar) an.

![Bild](https://raw.githubusercontent.com/ioBroker/ioBroker.welcome/master/img/screen.png)

## Govee-local (20.10.2023) - neuer Adapter
https://github.com/boergegrunicke/ioBroker.govee-local

<img src="https://raw.githubusercontent.com/boergegrunicke/ioBroker.govee-local/main/admin/govee-local.png" width="100" height="100" />

Govee-Geräte über lokalen Zugriff steuern (keine Cloud)

## Pylontech (23.10.2023) - neuer Adapter
https://github.com/PLCHome/ioBroker.pylontech

<img src="https://raw.githubusercontent.com/PLCHome/ioBroker.pylontech/master/admin/logo.png" width="100" height="100" />

Über die Konsole können Sie die Zellspannungen und den Status der Pylontech-Batterien abfragen.

## Signifylights (26.10.2023) - neuer Adapter
https://github.com/disaster123/ioBroker.signifylights

<img src="https://raw.githubusercontent.com/disaster123/ioBroker.signifylights/main/admin/signifylights.png" width="100" height="100" />

Signify Lights Adapter für alle Arten von Signify WLAN-Leuchten wie WIZ, Philips WLAN und viele mehr...

## Esphome (01.11.2023) - neue Funktion
Für Smart-Home-Fans gibt es eine wichtige Neuigkeit: Die ESPHome-Dokumentation hat die Integration von ioBroker in die native API offiziell bestätigt.
Dieses Update folgt der Annahme eines kürzlich eingereichten Pull Requests und positioniert ioBroker neben Home Assistant als eines der wenigen Smart-Home-Systeme, die die native ESPHome-API für die direkte Client-Kommunikation nutzen.

Die native API, bekannt für ihr hochoptimiertes Netzwerkprotokoll, bietet zahlreiche Vorteile gegenüber herkömmlichen MQTT-Methoden und vereinfacht die Interaktion von Smart-Geräten innerhalb des Ökosystems.
Mit dieser Anerkennung bekräftigt ESPHome sein Engagement für effiziente und robuste Kommunikationskanäle für die Smart-Home-Branche.

## Vis (06.11.2023) - neue Funktion
Die Lizenz von vis wurde auf MIT geändert. Das bedeutet, dass Sie vis kostenlos in kommerziellen Projekten verwenden können und keine weitere Lizenz erforderlich ist.

## Willkommen (07.11.2023) – neue Funktion
Es wurde die Möglichkeit hinzugefügt, benutzerdefinierte Links zur Startseite hinzuzufügen. Die Seiten werden auf ihre Erreichbarkeit überprüft.

<img src="media/2023_11_07_welcome.png" width="500" />

## Echarts (08.11.2023) - neue Funktion
Das Vis-2-Widget wurde hinzugefügt. Zusätzlich zu den Voreinstellungen können Sie nun die Objekt-ID direkt mit Verlaufsdaten verwenden.

<img src="media/2023_11_08_echarts.png" width="500" />

## Renacidc (17.11.2023) - neuer Adapter
https://github.com/raschy/ioBroker.renacidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.renacidc/main/admin/renacidc.png" width="100" height="100" />

Auslesen der Daten von Renacpower-Solarwechselrichtern

## Wetterwarnungen (24.11.2023) - neuer Adapter
https://github.com/ticaki/ioBroker.weather-warnings

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.weather-warnings/main/admin/weather-warnings.png" width="100" height="100" />

Dieser Adapter greift auf Wetterwarnungen verschiedener Wetterdienste zu und gibt sie als Text- oder Sprachnachrichten aus. Zusätzlich erstellt er nach Typ gruppierte Zustände, mit denen auf aktuelle Warnungen reagiert werden kann.

## Tractive-gps (06.12.2023) - neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.tractive-gps

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.tractive-gps/main/admin/tractive-gps.png" width="100" height="100" />

Mit diesem Adapter können Sie eine Verbindung zum Tractive GPS-Dienst herstellen und den Standort Ihrer Haustiere abrufen.

## Admin (06.12.2023) – Neue Funktion
Es ist möglich, die Menüfarben im Adminbereich zu ändern.

<img src="media/2023_12_06_admin.png" width="500" />

## Emporia (07.12.2023) - neuer Adapter
https://github.com/Chris-656/ioBroker.emporia

<img src="https://raw.githubusercontent.com/Chris-656/ioBroker.emporia/main/admin/emporia.png" width="100" height="100" />

Dieser Adapter ruft Daten vom Emporia-Energiesystem ab.

## Reolink (27.12.2023) - neuer Adapter
https://github.com/aendue/ioBroker.reolink

<img src="https://raw.githubusercontent.com/aendue/ioBroker.reolink/main/admin/reolink_logo.png" width="100" height="100" />

Adapter für die ioBroker-Plattform zum Abrufen von Reolink-Kamerainformationen.

## Vis-2 (08.01.2024) - neuer Adapter
https://github.com/ioBroker/ioBroker.vis-2

vis-2 ist jetzt in einem stabilen Repository verfügbar. Es handelt sich um eine neue Generation von vis. Es basiert auf ReactJS und bietet viele neue Funktionen.

## Artnet-recorder (08.01.2024) - neuer Adapter
https://github.com/Bannsaenger/ioBroker.artnet-recorder

<img src="https://raw.githubusercontent.com/Bannsaenger/ioBroker.artnet-recorder/master/admin/artnet-recorder.png" width="100" height="100" />

Art-Net-Daten in einer Datei speichern, um sie später wiederzugeben

##energiefluss (25.01.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss/main/admin/energiefluss.png" width="100" height="100" />

Es bietet einen animierten Energiefluss des aktuellen Verbrauchs für Photovoltaik, Batterie, Hausverbrauch, Netzeinspeisung (Netzverbrauch), Autoladung und bis zu 10 mögliche Elemente (Kreis oder Rechteck).

## Amtronwallbox (28.01.2024) - neuer Adapter
https://github.com/rg-engineering/ioBroker.amtronwallbox

<img src="https://raw.githubusercontent.com/rg-engineering/ioBroker.amtronwallbox/master/admin/amtronwallbox.png" width="100" height="100" />

Der Adapter dient als Schnittstelle zu verschiedenen Amtron-Wanddosen. Die von der Dose gelieferten Daten werden ausgelesen und als Status im Adapter bereitgestellt. Die Datenverarbeitung erfolgt ausschließlich lokal; eine Cloud-Verbindung ist nicht erforderlich.

## Zendure-solarflow (30.01.2024) - neuer Adapter
https://github.com/nograx/ioBroker.zendure-solarflow

<img src="https://raw.githubusercontent.com/nograx/ioBroker.zendure-solarflow/main/admin/zendure-solarflow.png" width="100" height="100" />

Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API. Es verwendet die offizielle API von Zendure.

## Echarts (03.02.2024) - neue Funktion
Diagrammtyp „Radar“ hinzugefügt

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.echarts/master/img/radar.png" width="300" height="230" />

## Soliscloud (3.2.2024) - neuer Adapter
https://github.com/Trixx34/ioBroker.soliscloud

<img src="https://raw.githubusercontent.com/Trixx34/ioBroker.soliscloud/main/admin/solis.png" width="100" height="100" />

Dieser Adapter liest mehrere Werte aus der SolisCloud-API und speichert sie zur Verwendung in ioBroker.

## Sun2000-modbus (8.2.2024) - neuer Adapter
https://github.com/daolis/ioBroker.sun2000-modbus

<img src="https://raw.githubusercontent.com/daolis/ioBroker.sun2000-modbus/main/admin/sun2000-modbus.png" width="100" height="100" />

Daten vom Huawei SUN2000 Wechselrichter und dem LUNA2000 Speicher mittels Modbus TCP auslesen.

## Szenen (10.2.2024) – neue Funktion
Es ist möglich, Kategorien in Szenen zu verwenden.

<img src="media/2024_02_16_scenes-enums.png" width="500" />

## Solaredge (15.2.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.soleredge

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.solaredge/master/admin/solaredge.png" width="100" height="100" />

Rufen Sie Daten vom SolarEdge-Überwachungsportal ab. Derzeit wird nur der Datenpunkt „/overview“ verwendet, um die aktuelle Leistung sowie die Energiewerte für Tag, Monat, Jahr und die gesamte Lebensdauer zu erhalten.

## Elgato-key-light (18.2.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.elgato-key-light/main/admin/elgato-key-light.png" width="100" height="100" />

Mit diesem Adapter können Sie Elgato Key Lights über ioBroker steuern.

## Myuplink (18.2.2024) – neuer Adapter
https://github.com/sebilm/ioBroker.myuplink

<img src="https://raw.githubusercontent.com/sebilm/ioBroker.myuplink/main/admin/myuplink.png" width="100" height="100" />

Dieser ioBroker-Adapter empfängt Daten von myUplink.com.

## Sun2000 (19.2.2024) – neuer Adapter
https://github.com/bolliy/ioBroker.sun2000

<img src="https://raw.githubusercontent.com/bolliy/ioBroker.sun2000/main/admin/sun2000.png" width="100" height="100" />

Auslesen von Registerdaten vom Huawei SUN2000 Wechselrichter und der LUNA2000 Batterie mittels Modbus TCP.

## Opcua (21.2.2024) – neue Funktion
Der Adapter ist jetzt lizenzfrei.

## Senec (25.2.2024) – neuer Adapter
https://github.com/nobl/ioBroker.senec

<img src="https://raw.githubusercontent.com/nobl/ioBroker.senec/master/admin/senec.png" width="100" height="100" />

Ursprünglich für das Senec Home V2.1-System entwickelt. Im Senec.Home-System lassen sich über den Adapter nur ausgewählte Werte ändern. Senec bietet derzeit auch keine zuverlässige Möglichkeit mehr, die Spitzenlastreduzierung über die Weboberfläche zu beeinflussen. Ob andere Systeme (z. B. V3) damit kompatibel sind, hängt davon ab, ob sie ebenfalls auf lala.cgi basieren und dieselben JSON-Informationen bereitstellen.

## Energiefluss-erweitert (11.3.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss-erweitert/main/admin/energiefluss-erweitert.png" width="100" height="100" />

Der Adapter visualisiert den Energiefluss für alle hinzugefügten Elemente. Dies können beispielsweise Photovoltaikanlagen, Batteriespeicher, Eigenverbrauch im Haus, Netzeinspeisung (Netzverbrauch), Autoladung usw. sein.

## Nmea (17.3.2024) – neuer Adapter
https://github.com/ioBroker/ioBroker.nmea

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.nmea/main/admin/nmea.png" width="100" height="100" />

Dieser Adapter ermöglicht den Anschluss von ioBroker an den NMEA-2000-Yachtbus. Sie können Geschwindigkeit über Grund (SOG), Kurs über Grund (COG), GPS-Position, Tiefe, Wind, Temperatur und viele weitere Daten vom NMEA-2000-Bus auslesen.

Und sogar den Raymarine-Autopiloten steuern.

![NMEA](../../en/history/media/2024_03_17_nmea.png)

## Vis-homekittiles (25.3.2024) – neuer Adapter
https://github.com/Standarduser/ioBroker.vis-homekittiles

<img src="https://raw.githubusercontent.com/Standarduser/ioBroker.vis-homekittiles/main/admin/vis-homekittiles.png" width="100" height="100" />

HomeKit Tiles ist ein Widget-Set, das auf dem Design von Apple HomeKit basiert. Die Besonderheit der Widgets liegt darin, dass sie keine festen Stilelemente enthalten, sondern alles über CSS formatiert wird. Daher gibt es im VIS-Editor keine separaten Einstellungen für Position und/oder Größe von Symbolen, Beschriftungen usw. Das Design wird durch Ändern des CSS-Codes angepasst. Hierfür kann der CSS-Code aus der Datei `/widgets/homekittiles/css/style.css` als Vorlage verwendet werden. Der Code wird im CSS-Tab des VIS-Editors eingefügt und kann nach Belieben angepasst werden. Es ist außerdem möglich, im VIS-Editor im Bereich „Allgemein“ der Widgets eigene CSS-Klassen hinzuzufügen.

Die Widgets sind für VIS 1.x konzipiert.

## Scheduler (05.04.2024) – neue Funktion
Der Scheduler unterstützt jetzt Feiertage und benutzerdefinierte Typen.

## Admin (6.4.2024) – neue Funktion
Admin unterstützt nun die Einbindung in JSONConfig-Dateien:

```json5
{
    "tabs": {
        "tab1": {
            "type": "panel", // data will be combined with the content of "tab1.json". If the same attribute is defined in both files, the value from the included file will be used.
            "#include": "tab1.json"
        }
    }
}
```

https://github.com/ioBroker/ioBroker.admin/blob/master/packages/jsonConfig/SCHEMA.md#includes

## Glättung (8.4.2024) – neuer Adapter
https://github.com/BenAhrdt/ioBroker.smoothed

<img src="https://raw.githubusercontent.com/BenAhrdt/ioBroker.smoothed/main/admin/smoothed.png" width="100" height="100" />

Dieser Adapter vereinfacht die Auswahl von Symbolen zur Glättung anhand eines ausgewählten Algorithmus und der Glättungszeit (Filterzeit). Sie können ein Symbol mehrmals auswählen, um es mit verschiedenen Algorithmen und/oder Zeiträumen zu glätten. Das Ziel ist ein Verzeichnis im Filter, das die geglätteten Werte liefert. Sie können Minimal- und Maximalwerte sowie die Anzahl der Dezimalstellen begrenzen oder Werte mit hoher Standardabweichung ignorieren.

## Heizoel24-mex (14.4.2024) – neuer Adapter
https://github.com/ltspicer/ioBroker.heizoel24-mex

<img src="https://raw.githubusercontent.com/ltspicer/ioBroker.heizoel24-mex/main/admin/heizoel24-mex.png" width="100" height="100" />

Das MEX ist ein Heizöl-Füllstandsmessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

## Hydrawise (17.4.2024) – neuer Adapter
https://github.com/SentiQ/ioBroker.hydrawise

<img src="https://raw.githubusercontent.com/SentiQ/ioBroker.hydrawise/main/admin/hydrawise.jpg" width="100" height="100" />

Integrieren Sie Ihren Hydrawise-Controller in ioBroker. Sie haben Zugriff auf alle Controller-Informationen, Zeitpläne und Sensoren. Außerdem können Sie die geplante Bewässerung um x Sekunden unterbrechen.

## Tedee (17.4.2024) – neuer Adapter
https://github.com/TA2k/ioBroker.tedee

<img src="https://raw.githubusercontent.com/TA2k/ioBroker.tedee/main/admin/tedee.png" width="100" height="100" />

Adapter für Tedee-Schlösser. Dieser Adapter nutzt die lokale Bridge-API zur Steuerung eines Tedee-Schlosses.
Alle Schlösser von Tedee werden unterstützt.

## Prozess-ID (22.4.2024) – neuer Adapter
https://github.com/mcm4iob/ioBroker.pid

<img src="https://raw.githubusercontent.com/mcm4iob/ioBroker.pid/master/admin/pid.png" width="100" height="100" />

Dieser Adapter bietet die Funktionalität eines PID-Reglers.

## Unifi-protect (28.4.2024) – stabile Version
https://github.com/iobroker-community-adapters/ioBroker.unifi-protect

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.unifi-protect/master/admin/unifi-protect.png" width="100" height="100" />

Verbindet sich mit dem Unifi Protect Controller und ruft alle Daten von den hinzugefügten Kameras ab.

## Air-q (1.5.2024) – neuer Adapter
https://github.com/CorantGmbH/ioBroker.air-q

<img src="https://raw.githubusercontent.com/CorantGmbH/ioBroker.air-q/main/admin/air-q.png" width="100" height="100" />

Dieser ioBroker-Adapter wird in Verbindung mit unserem air-Q-Gerät verwendet. Er ruft die Werte unserer Sensoren ab und zeigt sie Ihnen in der ioBroker-Umgebung an.

## Boschindego (4.5.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.boschindego

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.boschindego/main/admin/boschindego.png" width="100" height="100" />

Adapter für Bosch Indego Rasenmäher zur Anzeige des Mäherstatus und zur Steuerung des Mähers.

## Windows-Installer (20.05.2024) – neue Funktion
Es ist eine neue Version des Windows-Installationsprogramms verfügbar: 3.1.0 Neue Funktionen:

- Aktualisierung/Upgrade des JS-Controllers implementiert
- Einige Fehlerbehebungen

## Radar-trap (29.05.2024) – neuer Adapter in stabil
https://github.com/Steiger04/ioBroker.radar-trap

<img src="https://raw.githubusercontent.com/Steiger04/ioBroker.radar-trap/main/admin/radar-trap.png" width="100" height="100" />

Adapter zur Erkennung von Geschwindigkeitskontrollen und Hindernissen.

## Waterkotte-easycon (12.4.2024) – neuer Adapter spätestens
https://github.com/theknut/ioBroker.waterkotte-easycon

<img src="https://raw.githubusercontent.com/theknut/ioBroker.waterkotte-easycon/main/admin/waterkotte-easycon.png" width="100" height="100" />

Adapter für Gree- und C&H-Wasserfilter.

## Vis-2-widgets-inventwo (25.4.2024) – neuer Adapter spätestens
https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo

<img src="https://raw.githubusercontent.com/inventwo/ioBroker.vis-2-widgets-inventwo/main/admin/vis-2-widgets-inventwo.png" width="100" height="100" />

Fügt Schalter, Schaltflächen, Schieberegler und mehr als Widgets für ioBroker VIS 2.0 hinzu.

## Webui (3.10.2023) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.webui

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/admin/logo.png" width="100" height="100" />

Dies ist ein komplettes Visualisierungssystem für ioBroker.

* vollständig auf Webkomponenten basierend
* WYSIWYG-Editor für die Benutzeroberfläche, aber Sie können auch zur Quelltextansicht oder geteilten Ansicht wechseln.
* Mehrfenster-Benutzeroberfläche in der Bearbeitungsansicht, wie in Visual Studio
* Bindungen pro Drag & Drop von ioBroker-Objekten auf UI-Elemente oder Eigenschaften
* komplexe Bindungen mit JavaScript-Einbindung und Konvertern
* eine einfache Skriptsprache, die über die Benutzeroberfläche erstellt werden kann.

## Hiob (22.5.2024) – neuer Adapter spätestens
https://github.com/moba15/ioBroker.hiob

<img src="https://raw.githubusercontent.com/moba15/ioBroker.hiob/main/admin/hiob.png" width="100" height="100" />

Mit dieser App können Sie Ihr ioBroker Smarthome-System über die hiob-App steuern. Sie ist eine einfachere und schnellere Alternative zu vergleichbaren Lösungen mit weniger Konfigurationsmöglichkeiten. Die App ist primär für Android-Geräte gedacht, funktioniert aber auch auf Windows- und Linux-Desktop-Computern.

## Notificationforandroidtv (22.5.2024) – neuer Adapter ab spätestens
https://github.com/DNAngelX/ioBroker.notificationforandroidtv

<img src="https://raw.githubusercontent.com/DNAngelX/ioBroker.notificationforandroidtv/main/admin/notificationforandroidtv.png" width="100" height="100" />

Die Benachrichtigungsintegration für ioBroker unterstützt Benachrichtigungen für Android TV und Fire TV. Damit können Sie Benachrichtigungen an Ihr Android-TV-Gerät senden. Die Benachrichtigung wird als Overlay für eine anpassbare Dauer angezeigt, bevor sie wieder verschwindet. Zusätzlich können Sie Bilder, beispielsweise von Überwachungskameras, und benutzerdefinierte Symbole senden. Symbole funktionieren ähnlich wie Bilder: Sie werden kleiner links neben der Benachrichtigung angezeigt, während Bilder größer über der Benachrichtigung erscheinen.

Diese Benachrichtigungen funktionieren im globalen Bereich Ihres Android TV-Geräts und werden unabhängig von der aktiven Anwendung angezeigt.

## IOB Mobile App für Android und iOS (04.6.2024) - neue App
![Logo](https://raw.githubusercontent.com/iobroker/iobroker.docs/master/docs/en/history/media/2024_06_30_iob_mobile.png)

Wiki: https://github.com/peter9teufel/iobmobile-issues/wiki/IOB-Mobile-Quickstart

## Gree-hvac (10.6.2024) – neuer Adapter bei stabil
https://github.com/XHunter74/ioBroker.gree-hvac

<img src="https://raw.githubusercontent.com/XHunter74/ioBroker.gree-hvac/master/admin/air-conditioner.png" width="100" height="100" />

Adapter für Gree- und C&H-Wasserfilter.

## Admin (10.6.2024) – neue Funktion
- Der Protokoll-Tab wurde verbessert. (Hauptsächlich Layout und Benutzeroberfläche)
- Unterstützung für die automatische Aktualisierungsoption des Adapters hinzugefügt. Neue Version von js-controller erforderlich.
Es werden nur die im Adapter-Tab aufgeführten oder die ersten 100 Adapter angezeigt. Um weitere Adapter zu sehen, muss der Benutzer einen Filter eingeben.

## Opcua (13.6.2024) – neuer Adapter in stabil
https://github.com/ioBroker/ioBroker.opcua

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.opcua/master/admin/opcua.png" width="100" height="100" />

ioBroker OPC-UA Adapter.

## E3oncan (25.7.2024) – Neuer Adapter in stabil
https://github.com/MyHomeMyData/ioBroker.e3oncan

<img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/e3oncan_small.png" width="100" height="100" />

Geräte der Viessmann E3-Serie (One Base) tauschen viele Daten über den CAN-Bus aus. Dieser Adapter kann diese Kommunikation abhören und zahlreiche nützliche Informationen extrahieren. Die Energiezähler E380CA und E3100CB werden ebenfalls unterstützt. Dieser Betriebsmodus wird als `Collect` bezeichnet.

Hinweis: Dieser Adapter wird nur auf Linux-Systemen unterstützt.

## Egigeozone2 (6.8.2024) – neuer Adapter in der stabilen Version
https://github.com/obakuhl/ioBroker.egigeozone2

<img src="https://raw.githubusercontent.com/obakuhl/ioBroker.egigeozone2/master/admin/egigeozone.png" width="100" height="100" />

Dies ist ein ioBroker-Adapter für die Android-Geofencing-App „EgiGeoZone“. Er kann Geofence-Ereignisse als HTTP-Anfragen empfangen, wenn Sie mit Ihrem Mobilgerät einen definierten Bereich betreten oder verlassen.

## Hiob (17.8.2024) – neuer Adapter in der stabilen Version
https://github.com/moba15/ioBroker.hiob

<img src="https://raw.githubusercontent.com/moba15/ioBroker.hiob/main/admin/hiob.png" width="100" height="100" />

Mit dieser App können Sie Ihr ioBroker Smarthome-System über die hiob-App steuern. Sie ist eine einfachere und schnellere Alternative zu vergleichbaren Lösungen mit weniger Konfigurationsmöglichkeiten. Die App ist primär für Android-Geräte gedacht, funktioniert aber auch auf Windows- und Linux-Desktop-Computern.

## Extron (17.8.2024) – neuer Adapter bei stabil
https://github.com/Bannsaenger/ioBroker.extron

<img src="https://raw.githubusercontent.com/Bannsaenger/ioBroker.extron/master/admin/extron.png" width="100" height="100" />

Steuergeräte von Extron. Dieser Adapter dient zur Steuerung einiger Extron-Audio-/Videoprodukte über das Simple Instruction Set Protocol (SIPS). Der Funktionsumfang der Geräte ist enorm. Nicht alle Funktionen lassen sich mit diesem Adapter und der Interaktion mit ioBroker sinnvoll unterstützen.

## Ping (23.08.2024) – neue Funktion
Der Ping-Adapter kann den IP-Adressbereich erkennen, sofern dieser weniger als 4096 Adressen umfasst.

Benutzer können die IP-Adressen direkt aus der Benachrichtigung hinzufügen.

![Dynamische Benachrichtigungen](../../en/history/media/2024_09_24_dynamic_notifications.png)

## Admin (23.08.2024) – Neue Funktion
Zustände könnten direkt über die JSON-Konfiguration gesteuert werden, um beispielsweise eine Bereichserkennung zu starten.

## Admin (01.09.2024) - Neue Funktion
![Kontextmenü](../../en/history/media/2024_09_10_admin_context_menu.png)

Einigen Nutzern ist das Kontextmenü im ioBroker Admin-Objektbrowser möglicherweise bereits bekannt. Wir möchten jedoch alle daran erinnern, dass ein einfacher Linksklick schnellen Zugriff auf das Kontextmenü ermöglicht, über das Sie verschiedene Operationen an Objekten durchführen können, beispielsweise das Erstellen eines Alias.

## Gotify-ws (4.9.2024) – neuer Adapter in der stabilen Version
https://github.com/simatec/ioBroker.gotify-ws

<img src="https://raw.githubusercontent.com/simatec/ioBroker.gotify-ws/master/admin/gotify-ws.png" width="100" height="100" />

Gotify-WS ist ein Adapter, der eine WebSocket-Verbindung zu einem Gotify-Server herstellt und somit alle Nachrichten vom Server empfangen und verarbeiten kann.

## Wifilight (05.09.2024) - neue Funktion
Der wifilight-Adapter wurde komplett neu geschrieben und unterstützt nun den Kompaktmodus und die JSON-Konfiguration.

## Rainbird (17.9.2024) – neuer Adapter im stabilen Zustand
https://github.com/iobroker-community-adapters/ioBroker.rainbird

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.rainbird/master/admin/rainbird.png" width="100" height="100" />

Ein ioBroker-Adapter für Rain Bird mit LNK-WLAN-Adapter. Dieses Projekt steht in keiner Verbindung zu Rain Bird.

## Vis-2-widgets-rssfeed (18.9.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.vis-2-widgets-rssfeed

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.vis-2-widgets-rssfeed/main/admin/vis-2-widgets-rssfeed.png" width="100" height="100" />

Dieser Adapter enthält ausschließlich die vis-2-Widgets für den Adapter rssfeed. Eine detaillierte Beschreibung der Widgets und ihrer Funktionen finden Sie unter Adapter rssfeed.

## Kisshome-research (19.9.2024) – neuer Adapter
https://github.com/ioBroker/ioBroker.kisshome-research

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.kisshome-research/main/admin/kisshome-research.png" width="100" height="100" />

Dieser Spezialadapter wurde für das Forschungsprojekt KISSHome entwickelt. Er ist nicht für den allgemeinen Gebrauch bestimmt.

## Admin (21.09.2024) – Neue Funktion
![Passwort](../../en/history/media/2024_10_01_admin_back_alias.gif)

Benutzer können vom Alias-Ziel zum Alias selbst springen.

## Admin (28.09.2024) – Neue Funktion
![Passwort](../../en/history/media/2024_09_28_admin_password.png)

Der Administrator prüft nun auf Linux-Systemen, ob ein Systembenutzer mit einem bekannten Passwort existiert, und fordert gegebenenfalls zur Änderung des Passworts auf.

Administratoren unterstützen die grafische Benutzeroberfläche für dynamische Benachrichtigungen.

## Node-red (30.09.2024) - neue Funktion
![Dialogfeld „ID auswählen“](../../en/history/media/2024_09_30_node_red.png)

Node-RED verfügt über denselben Dialog zur ID-Auswahl wie andere Adapter.
Dazu ist eine laufende Administratorinstanz auf demselben Host erforderlich.

Die Version des Node-RED-Pakets wurde von 3 auf 4.0.3 erhöht.

## Ecoflow-mqtt (14.10.2024) – neuer Adapter
https://github.com/foxthefox/ioBroker.ecoflow-mqtt

<img src="https://raw.githubusercontent.com/foxthefox/ioBroker.ecoflow-mqtt/main/admin/ecoflow-mqtt.png" width="100" height="100" />

Dieser Adapter verbindet sich mit Produkten von Ecoflow ([https://www.ecoflow.com]).

## Remeha-home (28.10.2024) – neuer Adapter
https://github.com/simatec/ioBroker.remeha-home

<img src="https://raw.githubusercontent.com/simatec/ioBroker.remeha-home/master/admin/remeha-home.png" width="100" height="100" />

Der ioBroker.remeha-home-Adapter ermöglicht die Integration und Steuerung von Remeha-Heizsystemen über die Remeha Home-Plattform. Der Adapter stellt eine kontinuierliche Verbindung zur Remeha Home-API her und ruft aktuelle Daten ab, um diese im ioBroker-System bereitzustellen. Dadurch lässt sich das Heizsystem optimal überwachen und steuern.

## Vis-2-widgets-ovarious (12.11.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.vis-2-widgets-ovarious

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.vis-2-widgets-ovarious/main/admin/vis-2-widgets-ovarious.png" width="100" height="100" />

Dieser Adapter enthält verschiedene Vis-2-Widgets. Okay, eigentlich gibt es nur ein Vis-2-Widget, aber weitere sind in Planung.

## Gotify (16.11.2024) – neuer Adapter
https://github.com/ThomasPohl/ioBroker.gotify

<img src="https://raw.githubusercontent.com/ThomasPohl/ioBroker.gotify/main/admin/gotify.png" width="100" height="100" />

Sende Push-Benachrichtigungen von ioBroker an Gotify.

## Google Tabellen (3.12.2024) – neuer Adapter
https://github.com/ThomasPohl/ioBroker.google-spreadsheet

<img src="https://raw.githubusercontent.com/ThomasPohl/ioBroker.google-spreadsheet/main/admin/Google_Sheets_logo.svg" width="100" height="100" />

Dieser Adapter ermöglicht die automatische Interaktion mit Google Tabellen.

## Minuaru (3.12.2024) – neuer Adapter
https://github.com/minukodu/ioBroker.minuaru

<img src="https://raw.githubusercontent.com/minukodu/ioBroker.minuaru/main/admin/minuaru.png" width="100" height="100" />

Alarmsystem für ioBroker und minuvis

## Mytime (29.12.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.mytime

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.mytime/main/admin/mytime.png" width="100" height="100" />

Dieser Adapter verarbeitet Zeitdaten (z. B. Countdowns). Die Countdown-Funktionalität stellt Datenpunkte bereit, mit denen Sie einen Countdown steuern können (z. B. in einem Skript). Der Adapter enthält außerdem verschiedene Widgets zur Visualisierung dieser Countdowns. Mithilfe von Zeitreihen lassen sich komplexe Zeitreihen erstellen, bei denen die Datenpunkte ausgelöst werden.

## Vis-2-widgets-weather-and-heating (29.12.2024) – neuer Adapter
https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating

<img src="https://raw.githubusercontent.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating/master/admin/vis-2-widgets-weather-and-heating.png" width="100" height="100" />

Dieses Vis-2-Widget zeigt Wettervorhersagedaten von `DasWetter.com` oder `weatherunderground` an. Sie benötigen den DasWetter-Adapter oder den `weatherunderground`-Adapter, der auf Ihrem System ausgeführt wird.

## Mywallbox (29.12.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.mywallbox

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.mywallbox/main/admin/wallbox.png" width="100" height="100" />

Verbinden Sie Ihre My-Wallbox (z. B. Pulsar Plus) über den Cloud-Service von My Wallbox mit ioBroker.

## Bluesound (11.1.2025) – neuer Adapter
https://github.com/Uwe1958/ioBroker.bluesound

<img src="https://raw.githubusercontent.com/Uwe1958/ioBroker.bluesound/main/admin/bluesound.png" width="100" height="100" />

Adapter zur Steuerung von Bluesound-Geräten

## Ta-blnet (11.1.2025) – neuer Adapter
https://github.com/weberk/ioBroker.ta-blnet

<img src="https://raw.githubusercontent.com/weberk/ioBroker.ta-blnet/main/admin/ta-blnet.png" width="100" height="100" />

Ein ioBroker-Adapter von Technische Alternative zum Auslesen von Daten von einem oder bis zu acht Klimareglern über BL-NET. Alternativ kann eine unbegrenzte Anzahl von Klimareglern an CMI angeschlossen werden.

## Teslafi (11.1.2025) – neuer Adapter
https://github.com/hombach/ioBroker.teslafi

<img src="https://raw.githubusercontent.com/hombach/ioBroker.teslafi/master/admin/teslafi.png" width="100" height="100" />

Der TeslaFi-Adapter ermöglicht die mühelose Integration von Fahrzeugdaten aus Ihrem TeslaFi-Konto in das ioBroker-System. Nutzen Sie diese Daten, um Ihr Tesla-Erlebnis zu verbessern und Ihre Hausautomatisierungsabläufe zu optimieren.

## Flexcharts (15.01.2025) - neuer Adapter
https://github.com/MyHomeMyData/ioBroker.flexcharts

<img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/flexcharts-icon-small.png" width="100" height="100" />

Dieser Adapter erweitert ioBroker um nahezu den gesamten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html). Er ist nicht für die schnelle Erstellung einfacher Diagramme gedacht. Sollten Sie jedoch ein komplexeres Diagramm planen, bietet Ihnen flexcharts die Möglichkeit, dieses umzusetzen.

## Paperless-ngx (27.1.2025) – neuer Adapter
https://github.com/BenAhrdt/ioBroker.paperless-ngx

<img src="https://raw.githubusercontent.com/BenAhrdt/ioBroker.paperless-ngx/main/admin/paperless-ngx.png" width="100" height="100" />

Die paperless-ngx-API ermöglicht den Abruf von Informationen zu laufenden paperless-ngx-Instanzen. Beispielsweise können Sie die Tags, Dokumente, Dokumenttypen, Benutzer oder Korrespondenten der jeweiligen paperless-Instanz auslesen.

## Sternchen (12.2.2025) – neuer Adapter
https://github.com/schmupu/ioBroker.asterisk

<img src="https://raw.githubusercontent.com/schmupu/ioBroker.asterisk/master/admin/asterisk.png" width="100" height="100" />

Der Asterisk-Adapter wandelt Textnachrichten in Audiodateien um und ruft dann über Asterisk per VoIP eine beliebige Telefonnummer an, um die Audionachricht abzuspielen.

##tagesschau (15.2.2025) – neuer Adapter
https://github.com/ticaki/ioBroker.tagesschau

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.tagesschau/main/admin/tagesschau.png" width="100" height="100" />

Ruft Nachrichten- und Videolinks von der Tagesschau ab.

## Maxxi-charge (15.2.2025) – neuer Adapter
https://github.com/blabond/ioBroker.maxxi-charge

<img src="https://raw.githubusercontent.com/blabond/ioBroker.maxxi-charge/main/admin/maxxi-charge.png" width="100" height="100" />

ioBroker.MaxxiCharge ist ein Adapter für das ioBroker-System, der die Integration und Steuerung von MaxxiCharge CCU-Geräten ermöglicht. Der Adapter bietet verschiedene Funktionen, darunter das Auslesen von Gerätedaten, das Anpassen von Konfigurationen und das Senden von Steuerbefehlen.

## Admin (2.3.2025) – neue Funktion
Die Admin-Version 7.5.0 enthält wichtige und nützliche neue Funktionen:

- OAuth2-Authentifizierung.
- Objekte umbenennen/kopieren

Der Authentifizierungsprozess wurde komplett neu geschrieben, und nun wird die angemeldete Sitzung ordnungsgemäß beibehalten.

Der Benutzer kann die Objekte über das Kontextmenü umbenennen, verschieben oder eine Kopie davon erstellen.

## Luftqualität (3.3.2025) – neuer Adapter
https://github.com/raschy/ioBroker.airquality

<img src="https://raw.githubusercontent.com/raschy/ioBroker.airquality/main/admin/airquality.png" width="100" height="100" />

Daten von der deutschen UBA abrufen.

## Oxxify-Lüftersteuerung (17.3.2025) – neuer Adapter
https://github.com/N-b-dy/ioBroker.oxxify-fan-control

<img src="https://raw.githubusercontent.com/N-b-dy/ioBroker.oxxify-fan-control/main/admin/oxxify-fan-control.png" width="100" height="100" />

Integrieren Sie Ihre Oxxify-Ventilatoren in Ihr Smart Home. Alle bereitgestellten ioBroker-Datenpunkte basieren auf dem hier beschriebenen Kommunikationsprotokoll. Da auch andere Hersteller dasselbe Protokoll verwenden (z. B. Blauberg-Lüfter), ist die Wahrscheinlichkeit hoch, dass sie ebenfalls funktionieren.

## Seplos-v3-sniffer (12.3.2025) – neuer Adapter
https://github.com/DpunktS/ioBroker.seplos-v3-sniffer

<img src="https://raw.githubusercontent.com/DpunktS/ioBroker.seplos-v3-sniffer/main/admin/seplos-v3-sniffer.jpg" width="100" height="100" />

Dieser Adapter wurde entwickelt, um das Seplos V3 BMS in einer Multipack-Konfiguration auszulesen. In der V3-Generation fungiert das erste BMS als Modbus-Master, alle weiteren als Slaves. In dieser Konfiguration ist der Zugriff auf das BMS über Modbus von einem dritten Gerät aus nicht mehr möglich, da in einem RS-485-Modbus-System nicht zwei Master-Geräte gleichzeitig existieren können. Der Adapter erkennt die Kommunikation zwischen den Geräten passiv, sodass die Kommunikation der einzelnen BMS nicht beeinträchtigt wird. Die Kommunikation kann entweder über eine lokale Schnittstelle (z. B. /dec/ttyS0) oder über Ser2Net (tcp://ip:2001) erfolgen.

## Lcn (12.3.2025) – neue Funktion
https://github.com/ioBroker/ioBroker.lcn

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.lcn/master/admin/lcn.png" width="100" height="100" />

Der LCN-Adapter ist jetzt kostenlos. Jeder kann ihn ohne Einschränkungen nutzen.

## Bayernluft (29.3.2025) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.bayernluft

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.bayernluft/main/admin/bayernluft.png" width="100" height="100" />

Verbindet Lüftungsgeräte der Firma BayernLuft mit ioBroker-Systemen.

## Controme (3.4.2025) – neuer Adapter
https://github.com/MadErstam/ioBroker.controme

<img src="https://raw.githubusercontent.com/MadErstam/ioBroker.controme/main/admin/controme.png" width="100" height="100" />

Stellen Sie über die offizielle API eine Verbindung zum lokalen Controme-Mini-Server her.

Controme ist ein Heizungssteuerungssystem, mit dem Sie Ihre Fußbodenheizung, Zentralheizung, Heizkörper oder andere Klimatisierungssysteme steuern können. Herzstück eines Controme Smart-Heat-Systems ist der Controme Mini-Server, ein lokales System auf Basis eines Raspberry Pi. Weitere Informationen zum Controme Smart-Heat-System finden Sie auf der Controme-Website.

## Batrum-bms (4.4.2025) – neuer Adapter
https://github.com/bembelstemmer/ioBroker.batrium-bms

<img src="https://raw.githubusercontent.com/bembelstemmer/ioBroker.batrium-bms/main/admin/batrium-bms.png" width="100" height="100" />

Ein ioBroker-Adapter zur Verfolgung von Metriken Ihres Batrium BMS, die über UDP veröffentlicht werden.

Dieser Adapter basiert auf der offiziellen Batrium WatchMonUdpListener-Implementierung unter: https://github.com/Batrium/WatchMonUdpListener

## Fyta (9.4.2025) – neuer Adapter
https://github.com/muffin142/ioBroker.fyta

<img src="https://raw.githubusercontent.com/muffin142/ioBroker.fyta/main/admin/fyta.png" width="100" height="100" />

Inoffizieller Adapter zur Verbindung von ioBroker mit FYTA-Pflanzensensoren. Sensoren sind im FYTA-Shop erhältlich.

## Shrdzm (16.4.2025) – neuer Adapter
https://github.com/mcm4iob/ioBroker.shrdzm

<img src="https://raw.githubusercontent.com/mcm4iob/ioBroker.shrdzm/main/admin/shrdzm.png" width="100" height="100" />

Dieser Adapter integriert die von SHRDZM IT Services e.U. bereitgestellte Smartmeter-Schnittstelle von SHRDZM in ioBroker. Eine Beschreibung der Schnittstelle finden Sie unter [Hier](https://cms.shrdzm.com/produkt/smartmeter-modul/).

## Js-controller (16.4.2025) - neue Funktion
Der js-Controller 7.0.7 ist jetzt in der neuesten Version verfügbar. Sie enthält Fehlerbehebungen und Verbesserungen. Die wichtigsten Änderungen sind:

- Die Klassen `encryptedNative` und `protectedNative` wurden erweitert. Entwickler können nun in Strukturen und Arrays auf `encryptedNative` und `protectedNative` zugreifen.
- Die Tippgeschwindigkeit wurde verbessert.

## Ankersolix2 (18.4.2025) – neuer Adapter
https://github.com/ronny130286/ioBroker.ankersolix2

<img src="https://raw.githubusercontent.com/ronny130286/ioBroker.ankersolix2/main/admin/ankersolix2.png" width="100" height="100" />

Integration von Anker Solix 2. Dieses Projekt basiert auf https://github.com/tomquist/solix2mqtt und bringt Informationen von der Anker-API direkt in ioBroker.

## Geräte (20.4.2025) – neue Funktion
<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.devices/master/admin/devices.png" width="100" height="100" />

Der `devices`-Adapter wurde auf Version 1.2.0 aktualisiert. Er wurde komplett mit TypeScript und Vite-Technologien neu geschrieben. Die neue Version ist schneller und stabiler.

## Mhi-wfrac (30.4.2025) – neuer Adapter
https://github.com/hacki11/ioBroker.mhi-wfrac

<img src="https://raw.githubusercontent.com/hacki11/ioBroker.mhi-wfrac/main/admin/mhi-wfrac.png" width="100" height="100" />

Klimaanlagen von Mitsubishi Heavy Industries mit WLAN-Adapter WF-RAC.
Dieser Adapter integriert WF-RAC (WLAN)-fähige Klimaanlagen von Mitsubishi Heavy Industries in ioBroker.

## Refoss (7.5.2025) – neuer Adapter
https://github.com/Refoss/ioBroker.refoss

<img src="https://raw.githubusercontent.com/Refoss/ioBroker.refoss/main/admin/refoss.png" width="100" height="100" />

Integrieren Sie Refoss-Geräte in ioBroker.
Weitere und detailliertere Informationen zum Gerät finden Sie hier: [Refoss](https://www.amazon.de/dp/B0D3PY4RVZ)

## Plenticore-g3 (9.5.2025) – neuer Adapter
https://github.com/FernetMenta/ioBroker.plenticore-g3

<img src="https://raw.githubusercontent.com/FernetMenta/ioBroker.plenticore-g3/main/admin/plenticore-g3.png" width="100" height="100" />

Adapter zur Kommunikation mit einem KOSTAL Plenticore plus über die REST-API. Diese API ist deutlich leistungsfähiger als Modbus. Sie ermöglicht den Zugriff auf ca. 200 schreibgeschützte Datenpunkte (`processdata`) und ca. 250 beschreibbare Einstellungen. Die API ist unter folgender URL dokumentiert:

http://<plenticore host>/api/v1

## Dnscope (17.5.2025) – neuer Adapter
https://github.com/simatec/ioBroker.dnscope

<img src="https://raw.githubusercontent.com/simatec/ioBroker.dnscope/main/admin/dnscope.png" width="100" height="100" />

Mit DNScope können Sie Ihr dynamisches DNS-Konto direkt in ioBroker aktualisieren. So können Sie Ihr DNS-Konto ohne Umwege oder zusätzliche Hardware mit der aktuellen IP-Adresse Ihrer Umgebung aktualisieren.

## Skiinfo (16.5.2025) – neuer Adapter
https://github.com/oweitman/ioBroker.skiinfo

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.skiinfo/main/admin/skiinfo.png" width="100" height="100" />

Mit diesem Adapter können Sie die aktuellen Schneehöhen für Berg-, Tal- und Neuschneegebiete sowie die geöffneten Lifte für verschiedene europäische Skigebiete abrufen.

## N8n (31.6.2025) – neuer Adapter (Entwicklung läuft - noch nicht im Repository verfügbar)
https://github.com/ioBroker/ioBroker.n8n

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.n8n/main/admin/n8n.svg" width="100" height="100" />

Mit diesem Adapter können Sie n8n-Workflows in ioBroker ausführen und die Daten von ioBroker in n8n-Workflows verwenden.

## Backend-Socket-Kommunikation (22.06.2025) – neue Funktion
Zusätzlich zur WebSocket-Kommunikation im Browser können Entwickler die Backend-Socket-Kommunikation nutzen, um mit dem ioBroker-System zu kommunizieren.
Sie können mit bestehenden WebSocket- oder Admin-Adaptern kommunizieren oder einen eigenen Socket-Server erstellen.

Dies ist nützlich für Drittanbieteranwendungen, die mit dem ioBroker-System kommunizieren müssen.

## Vis-2-widgets-collection (13.7.2025) – Neuer Adapter im stabilen Repository
https://github.com/Steiger04/ioBroker.vis-2-widgets-collection

<img src="https://raw.githubusercontent.com/Steiger04/ioBroker.vis-2-widgets-collection/main/admin/vis-2-widgets-collection.png" width="100" height="100" />

Sammlung von Widgets für ioBroker.vis 2.0

## Onlycat (21.7.2025) – Neuer Adapter im stabilen Repository
https://github.com/Sickboy78/ioBroker.onlycat

<img src="https://raw.githubusercontent.com/Sickboy78/ioBroker.onlycat/main/admin/onlycat.png" width="100" height="100" />

Adapter für OnlyCat® Katzenklappen mit Beuteerkennung.

## Drops-weather (21.7.2025) – Neuer Adapter im stabilen Repository
https://github.com/iobroker-community-adapters/ioBroker.drops-weather

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.drops-weather/main/admin/drops-weather.png" width="100" height="100" />

Dieser Adapter liefert Regendaten von https://www.drops.live

## Srm (27.7.2025) – Neuer Adapter im stabilen Repository
https://github.com/iobroker-community-adapters/ioBroker.srm

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.srm/main/admin/srm.png" width="100" height="100" />

Dies ist ein iobroker-Adapter zur Verbindung mit Synology-Routern. Der Adapter nutzt die Synology-API zum Datenabruf. Er wurde mit der SRM-Version 1.3.1 und dem Routermodell RT6600 getestet, sollte aber auch mit anderen Modellen funktionieren.

## Pi-hole2 (16.8.2025) – Neuer Adapter im stabilen Repository
https://github.com/oweitman/ioBroker.pi-hole2

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.pi-hole2/main/admin/pi-hole2.png" width="100" height="100" />

Eine Pi-hole-Installation ab Version 6 verwalten. Informationen von Pi-hole abrufen. Domains blockieren/beenden. (Für Pi-hole-Versionen unter 6 verwenden Sie bitte den Adapter ioBroker.pi-hole.)

## Energy-tracker (21.8.2025) – Neuer Adapter im stabilen Repository
https://github.com/energy-tracker/ioBroker.energy-tracker

<img src="https://raw.githubusercontent.com/energy-tracker/ioBroker.energy-tracker/main/admin/energy-tracker.png" width="100" height="100" />

Adapter zum Senden von Zählerständen an die Energy Tracker-Plattform.

## Vis-2-widgets-icontwo (9.9.2025) – Neuer Adapter im stabilen Repository
https://github.com/inventwo/ioBroker.vis-2-widgets-icontwo

<img src="https://raw.githubusercontent.com/inventwo/ioBroker.vis-2-widgets-icontwo/main/admin/vis-2-widgets-icontwo.png" width="100" height="100" />

Symboladapter für den ioBroker.vis-Adapter (nur für VIS-2)

## Pirate-weather (10.9.2025) – Neuer Adapter im stabilen Repository
https://github.com/ticaki/ioBroker.pirate-weather

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.pirate-weather/main/admin/pirate-weather.png" width="100" height="100" />

Daten von Pirate-Weather abrufen.

## Brightsky (14.9.2025) – Neuer Adapter im stabilen Repository
https://github.com/ticaki/ioBroker.brightsky

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.brightsky/main/admin/brightsky.png" width="100" height="100" />

Die Bright Sky API ist eine kostenlose, öffentliche API, die Wetterdaten des Deutschen Wetterdienstes (DWD) bereitstellt. Sie wurde entwickelt, um den Zugriff auf diese Daten zu vereinfachen, da die Originaldaten des DWD oft in schwer verständlichen Formaten vorliegen. Bright Sky konvertiert diese Daten in ein benutzerfreundliches JSON-Format und stellt sie über eine API zur Verfügung.

## Weathersense (2.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/ltspicer/ioBroker.weathersense

<img src="https://raw.githubusercontent.com/ltspicer/ioBroker.weathersense/main/admin/weathersense.png" width="100" height="100" />

WeatherSense ist eine Cloud-Plattform für Wetterstationen. Dieser Adapter liest Daten vom WeatherSense-Server.

## Sofarcloud (2.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/ltspicer/ioBroker.sofarcloud

<img src="https://raw.githubusercontent.com/ltspicer/ioBroker.sofarcloud/main/admin/sofarcloud.jpg" width="100" height="100" />

Dieser Adapter liest die Daten vom SofarCloud-Server und speichert sie im Datenpunkt sofarcloud.
Der SofarCloud-Server speichert Daten von Sofar-Wechselrichtern.

## Ping (05.10.2025) - neue Funktion
Der Ping-Adapter kann die TCP-Ports untersuchen.

https://github.com/ioBroker/ioBroker.ping

## Vis-jsontemplate (15.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/oweitman/ioBroker.vis-jsontemplate

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.vis-jsontemplate/main/admin/vis-jsontemplate.png" width="100" height="100" />

Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2. Die Datenausgabe lässt sich mithilfe eines Vorlagensystems anpassen. In den Vorlagen können HTML, CSS und JavaScript eingebunden werden.

## Freeair (18.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/Scrounger/ioBroker.freeair

<img src="https://raw.githubusercontent.com/Scrounger/ioBroker.freeair/main/admin/freeair.png" width="100" height="100" />

Lokale Verbindung zu Ihrem BluMartin FreeAir 100 Lüftungssystem

## Unifi-netzwerk (18.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/Scrounger/ioBroker.unifi-network

<img src="https://raw.githubusercontent.com/Scrounger/ioBroker.unifi-network/main/admin/unifi-network.png" width="100" height="100" />

Unifi Network nutzt die WebSocket-Schnittstelle, um Echtzeitinformationen von der Unifi-Netzwerk-Anwendung zu empfangen.

## Weatherflow-tempest-api (21.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/Scrounger/ioBroker.weatherflow-tempest-api

<img src="https://raw.githubusercontent.com/Scrounger/ioBroker.weatherflow-tempest-api/main/admin/weatherflow-tempest-api.png" width="100" height="100" />

Rufen Sie Daten für Ihre Tempest-Wetterstation über die WeatherFlow Tempest-API ab.

## Openmediavault (21.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/Scrounger/ioBroker.openmediavault

<img src="https://raw.githubusercontent.com/Scrounger/ioBroker.openmediavault/main/admin/openmediavault.png" width="100" height="100" />

Dieser Adapter ermöglicht das Auslesen von Informationen aus Ihrem OpenMediaVault über die RPC-Schnittstelle.

## Admin (21.10.2025) – Neue Funktion
Geräte per Drag & Drop zwischen Kategorien verschieben

## Xsense (22.10.2025) – Neuer Adapter im stabilen Repository
https://github.com/arteck/ioBroker.xsense

<img src="https://raw.githubusercontent.com/arteck/ioBroker.xsense/main/admin/xsense.png" width="100" height="100" />

Dieser ioBroker-Adapter ermöglicht die Integration von XSense-Geräten in das ioBroker Smart-Home-System.
Er empfängt Daten von XSense-Rauchmeldern, CO-Meldern und anderen kompatiblen Geräten und stellt diese in ioBroker für Automatisierung und Überwachung zur Verfügung. Der Adapter kommuniziert mit dem XSense-Cloud-Server und bietet eine einfache Möglichkeit, XSense-Geräte in bestehende ioBroker-Installationen zu integrieren.

## Sbms (28.11..2025) – Neuer Adapter im stabilen Repository
https://github.com/buffoletti/ioBroker.sbms

<img src="https://raw.githubusercontent.com/buffoletti/ioBroker.sbms/main/admin/sbms.png" width="100" height="100" />

Einfacher Adapter, um Daten von Electrodacus SBMS als Zustände über MQTT, die rawData-HTML-Seite oder die serielle Schnittstelle verfügbar zu machen.

## BMW (28.11.2025) – Neuer Adapter im stabilen Repository
https://github.com/TA2k/ioBroker.bmw

<img src="https://raw.githubusercontent.com/TA2k/ioBroker.bmw/master/admin/bmw.png" width="100" height="100" />

Dieser Adapter integriert BMW-Fahrzeuge in ioBroker mithilfe der neuen BMW CarData API mit OAuth2-Authentifizierung und Echtzeit-MQTT-Streaming. Er ermöglicht die umfassende Überwachung von Fahrzeugdaten für alle mit Ihrem BMW-Konto verknüpften BMW-Modelle.

<!-- ACHTUNG: Verwenden Sie die Adresse https://raw.githubusercontent.com/... für Symbole ! -->