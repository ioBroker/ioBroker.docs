---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/history/history.md
title: Was ist neu
hash: +xGmEm4OF2ZaUXTrPEERytK+EfySmeCIo6iTxdeuXJk=
---
# Was ist neu
## Anweisungen für Autoren
- Bitte definieren Sie den Header als

## AdapterName (JJJJ-MM-TT) - [Kurzbeschreibung]
- Die Aufnahmebeschreibung könnte lauten:
- neuer Adapter
- stabile Version
- neue Funktion
- neues Widget
- Wenn Sie Neuigkeiten zum neuen Adapter haben, fügen Sie bitte einen GitHub-Link und ein Logo des Adapters hinzu

  Beispiel:

```markdown
    ## frigate (2023-08-20) - new adapter
    https://github.com/Bettman66/ioBroker.frigate

    <img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />
```

## Ecoflow-mqtt (14.10.2024) - neuer Adapter
https://github.com/foxthefox/ioBroker.ecoflow-mqtt

<img src="https://raw.githubusercontent.com/foxthefox/ioBroker.ecoflow-mqtt/main/admin/ecoflow-mqtt.png" width="100" height="100" />

ioBroker-Adapter für die Verbindung mit dem Ecoflow MQTT-Server (emuliert die App-Kommunikation), bietet auch ein Home Assistant Gateway über die Erkennungsfunktion.

## Fregatte (20.08.2023) - neuer Adapter
https://github.com/Bettman66/ioBroker.frigate

<img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />

Frigate ist ein Open-Source-NVR, der auf der Echtzeit-KI-Objekterkennung basiert. Dieser Adapter analysiert die MQTT-Nachrichten von Frigate und erstellt daraus Datenobjekte.

## Notification-manager (2023-08-21) - neuer Adapter
https://github.com/foxriver76/ioBroker.notification-manager

<img src="https://raw.githubusercontent.com/foxriver76/ioBroker.notification-manager/master/admin/notification-manager.png" width="100" height="100" />

Verwalten Sie ioBroker-Benachrichtigungen, indem Sie sie beispielsweise als Nachrichten senden

## Procon-ip (24.08.2023)
https://github.com/ylabonte/ioBroker.procon-ip

<img src="https://raw.githubusercontent.com/ylabonte/ioBroker.procon-ip/master/admin/procon-ip.png" width="100" height="100" />

ioBroker-Adapter zur Basisunterstützung der Schwimmbadsteuerung `ProCon.IP`.

## Deyeicd (29.08.2023)
https://github.com/raschy/ioBroker.deyeidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.deyeidc/master/admin/deyeidc.png" width="100" height="100" />

Datensammler für `Deye`-kompatible Wechselrichter

## Acme (01.09.2023)
https://github.com/iobroker-community-adapters/ioBroker.acme

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.acme/master/admin/acme.png" width="100" height="100" />

Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Administrator (01.09.2023)
Kontextmenü:

- zB einfache Erstellung von Aliasnamen

  ![Bild1](../../en/history/media/2023_09_26_admin_context.png)

## Javascript (01.09.2023)
Spielplatz für JavaScript-Code:

- Sie können ChatGPT (erforderlicher API-Schlüssel) verwenden, um das Skript zu generieren. Es dient nur dazu, die Möglichkeiten von ChatGPT zu testen

  ![Bild1](../../en/history/media/2023_09_27_javascript_chat_gpt.png)

## Cec2 (06.09.2023)
https://github.com/iobroker-community-adapters/ioBroker.cec2

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.cec2/master/admin/cec2.png" width="100" height="100" />

Adapter für HDMI CEC - Sie können Geräte mit HDMI CEC überwachen/steuern. Die meisten modernen Fernseher und Multimediageräte unterstützen CEC in gewissem Umfang.

## Alexa2 (09.09.2023)
* (Apollon77) Aktualisieren Sie den Alexa2-Adapter, um ihn an das geänderte Push-Benachrichtigungssystem von Amazon anzupassen und so wieder den Abruf von Verlaufs- und Interaktionsinformationen zu ermöglichen

## Vis-2-widgets-material (10.09.2023)
* (Bluefox) Türschloss-Widget wurde hinzugefügt

![Bild1](media/2023_09_10_vis-2-widgets-material-lock-1.png) ![Bild1](../../en/history/media/2023_09_10_vis-2-widgets-material-lock-2.png)

## Pushbullet (10.09.2023)
<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.pushbullet/master/admin/pushbullet.png" width="100" height="100" />

* (Bluefox) API wurde auf Version 3 aktualisiert
* (Bluefox) JSON-Konfiguration wurde hinzugefügt

  ![JSON-Konfiguration](../../en/history/media/2023_09_10_pushbullet.png)

## JSON-Konfigurationsdokumentation
* (bluefox) JSON-Config-Dokumentation wurde der ioBroker-Website hinzugefügt [hinzugefügt](https://www.iobroker.net/#en/documentation/dev/adapterjsonconfig.md).

## Telegrammmenü (11.09.2023)
https://github.com/MiRo1310/ioBroker.telegram-menu

<img src="https://raw.githubusercontent.com/MiRo1310/ioBroker.telegram-menu/master/admin/telegram-menu.png" width="100" height="100" />

Einfaches Erstellen von Telegram-Menüs

## Vis-2 (12.09.2023)
* (bluefox) Horizontales Menü

  ![Bild1](../../en/history/media/2023_09_12_vis-2-menu.png)

## Echarts (12.09.2023)
* (Bluefox) Möglichkeit zum Exportieren der Daten in eine JSON-Datei hinzugefügt

  ![Bild1](../../en/history/media/2023_09_12_echart-1.png)

* (Bluefox) Möglichkeit hinzugefügt, Zoom und Schwenken nach X Sekunden Inaktivität wiederherzustellen

  ![Bild1](../../en/history/media/2023_09_12_echart-2.png)

* (bluefox) Legende als Dialog anzeigen

  ![Bild2](../../en/history/media/2023_09_13_echart-3.png)

## Js-controller (14.09.2023)
* (foxriver76) Release js-controller 5 zu stabil
* (foxriver76) Upgrade-Installationsprogramm, um nur Node.js 16.x+ zuzulassen

## Apg-info (16.09.2023)
https://github.com/HGlab01/ioBroker.apg-info – neuer Adapter

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.apg-info/master/admin/apg-info.png" width="100" height="100" />

Dieser Adapter liefert die Spitzenzeiten für das österreichische Stromnetz, in denen der Stromverbrauch vermieden werden soll. Zusätzlich liefert der Adapter die PHELIX-AT Day-Ahead (EPEX Spot) Preise für Österreich.

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

* vollständig auf Web-Komponenten basierend
* WYSIWYG-Editor für die Benutzeroberfläche, Sie können aber auch zur Quellansicht oder zur geteilten Ansicht wechseln
* Multi-Window-UI in der Bearbeitungsansicht, wie in Visual Studio
* Bindungen per Drag & Drop von ioBroker-Objekten auf UI-Elemente oder Eigenschaften
* komplexe Bindungen mit JavaScript und Konverter
* einfache Skriptsprache, die über die Benutzeroberfläche erstellt werden kann

## Heizungssteuerung (4.10.2023) - neuer Adapter
https://github.com/jbeenenga/ioBroker.heizungssteuerung

<img src="https://raw.githubusercontent.com/jbeenenga/ioBroker.heizungssteuerung/master/admin/heizungssteuerung.png" width="100" height="100" />

Mit diesem Adapter können Sie Heizungsanlagen steuern.
Sie können zwischen Kühl- und Heizbetrieb wählen und für einen Raum Boost oder Pause aktivieren.
Außerdem können Sie die Zieltemperatur für einen Raum überschreiben.

## Admin und mqtt (11.10.2023) - neue Funktion
Admin- und MQTT-Adapter prüfen nun, ob sie vom öffentlichen Internet aus erreichbar sind, wenn keine Authentifizierung aktiviert ist. Andernfalls wird eine Warnung im Protokoll und im Admin-Bereich angezeigt.

Dies ist eine nützliche Funktion, da nicht alle Benutzer wissen, wie sie ihre Adapter sichern, und es gefährlich ist, MQTT- oder Admin-Adapter ohne Authentifizierung für das Internet geöffnet zu haben.

## Iobroker (11.10.2023) - neue Funktion
Jetzt ist es möglich, Ihr node.js über die Befehlszeile zu aktualisieren: `iob nodejs-update` https://forum.iobroker.net/topic/69067/neuer-befehl-iob-nodejs-update

Sie können ohne zusätzliche Parameter auf eine empfohlene Version (aktuell 18) aktualisieren oder eine Version angeben: `iob nodejs-update 20`

## Vis-2-widgets-material (13.10.2023) - neues Widget
Staubsauger-Widget wurde hinzugefügt.

Dieses Widget ist primär für Xiaomi-Staubsauger gedacht.
Es kann aber auch für andere Staubsauger verwendet werden.
Der einzige Unterschied besteht darin, dass Xiaomi die Raumreinigung unterstützt.

![Bild1](../../en/history/media/2023_10_13_material-vacuum.png)

## Willkommen (17.10.2023) - neuer Adapter
https://github.com/ioBroker/ioBroker.welcome

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.welcome/master/admin/welcome.png" width="100" height="100" />

Dieser Adapter zeigt alle Web- und Admin-Instanzen von ioBroker auf einer Seite auf Port 80 (konfigurierbar)

![Bild](https://raw.githubusercontent.com/ioBroker/ioBroker.welcome/master/img/screen.png)

## Govee-local (20.10.2023) - neuer Adapter
https://github.com/boergegrunicke/ioBroker.govee-local

<img src="https://raw.githubusercontent.com/boergegrunicke/ioBroker.govee-local/main/admin/govee-local.png" width="100" height="100" />

Steuern Sie Govee-Geräte über lokalen Zugriff (keine Cloud)

## Pylontech (23.10.2023) - neuer Adapter
https://github.com/PLCHome/ioBroker.pylontech

<img src="https://raw.githubusercontent.com/PLCHome/ioBroker.pylontech/master/admin/logo.png" width="100" height="100" />

Fragen Sie die Zellspannungen und den Status von pylontech-Batterien über die Konsole ab.

## Signifylights (26.10.2023) - neuer Adapter
https://github.com/disaster123/ioBroker.signifylights

<img src="https://raw.githubusercontent.com/disaster123/ioBroker.signifylights/main/admin/signifylights.png" width="100" height="100" />

Signify Lights-Adapter für alle Arten von Signify WLAN-Leuchten wie WIZ, Philips WLAN und viele mehr ...

## Esphome (01.11.2023) - neue Funktion
Eine wichtige Neuerung für Heimautomatisierungs-Enthusiasten: Die ESPHome-Dokumentation bestätigt offiziell die Integration von ioBroker mit seiner nativen API.
Dieses Update folgt auf die Annahme einer kürzlich veröffentlichten PR, die ioBroker neben Home Assistant als eines der exklusiven Heimautomatisierungssysteme ausweist, das die native API von ESPHome für die direkte Client-Kommunikation nutzt.

Die native API, bekannt für ihr hochoptimiertes Netzwerkprotokoll, bietet zahlreiche Vorteile gegenüber herkömmlichen MQTT-Methoden und optimiert die Interaktion intelligenter Geräte innerhalb des Ökosystems.
Mit dieser Anerkennung bekräftigt ESPHome sein Engagement, effiziente und robuste Kommunikationskanäle für die Smart-Home-Branche bereitzustellen.

## Vis (06.11.2023) - neue Funktion
Die Lizenz von vis wurde auf MIT umgestellt. Das bedeutet, dass Sie vis kostenlos in kommerziellen Projekten nutzen können und keine Lizenz erforderlich ist.

## Willkommen (07.11.2023) - Neue Funktion
Möglichkeit hinzugefügt, benutzerdefinierte Links zur Startseite hinzuzufügen. Die Seiten werden auf ihre Verfügbarkeit geprüft.

<img src="media/2023_11_07_welcome.png" width="500" />

## Echarts (08.11.2023) - neue Funktion
Das Vis-2-Widget wurde hinzugefügt. Zusätzlich zu den Voreinstellungen können Sie nun die Objekt-ID direkt mit Verlaufsdaten verwenden.

<img src="media/2023_11_08_echarts.png" width="500" />

## Renacidc (17.11.2023) - neuer Adapter
https://github.com/raschy/ioBroker.renacidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.renacidc/main/admin/renacidc.png" width="100" height="100" />

Auslesen der Daten von Renacpower Solarwechselrichtern

## Wetterwarnungen (24.11.2023) - neuer Adapter
https://github.com/ticaki/ioBroker.weather-warnings

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.weather-warnings/main/admin/weather-warnings.png" width="100" height="100" />

Dieser Adapter greift auf Wetterwarnungen verschiedener Wetterdienste zu und gibt diese als Text- oder Sprachnachricht aus. Zusätzlich werden nach Typ gruppierte Zustände erstellt, mit denen auf aktuelle Warnungen reagiert werden kann.

## Tractive-gps (06.12.2023) - neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.tractive-gps

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.tractive-gps/main/admin/tractive-gps.png" width="100" height="100" />

Mit diesem Adapter können Sie eine Verbindung zum Tractive GPS-Dienst herstellen und den Standort Ihrer Haustiere abrufen.

## Admin (06.12.2023) - neue Funktion
Es ist möglich, die Menüfarben im Admin zu ändern

<img src="media/2023_12_06_admin.png" width="500" />

##emporia (07.12.2023) - neuer Adapter
https://github.com/Chris-656/ioBroker.emporia

<img src="https://raw.githubusercontent.com/Chris-656/ioBroker.emporia/main/admin/emporia.png" width="100" height="100" />

Dieser Adapter ruft Daten vom Emporia-Energiesystem ab.

## Reolink (27.12.2023) - neuer Adapter
https://github.com/aendue/ioBroker.reolink

<img src="https://raw.githubusercontent.com/aendue/ioBroker.reolink/main/admin/reolink_logo.png" width="100" height="100" />

Adapter für die ioBroker-Plattform zum Abrufen von Reolink-Kamerainformationen.

## Vis-2 (08.01.2024) - neuer Adapter
https://github.com/ioBroker/ioBroker.vis-2

vis-2 befindet sich nun in einem stabilen Repository. Es handelt sich um eine neue Vis-Generation. Es basiert auf ReactJS und bietet viele neue Funktionen.

## Artnet-recorder (08.01.2024) - neuer Adapter
https://github.com/Bannsaenger/ioBroker.artnet-recorder

<img src="https://raw.githubusercontent.com/Bannsaenger/ioBroker.artnet-recorder/master/admin/artnet-recorder.png" width="100" height="100" />

Aufzeichnen von Art-Net-Daten in einer Datei zur späteren Wiedergabe

## Energiefluss (25.01.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss/main/admin/energiefluss.png" width="100" height="100" />

Es bietet einen animierten Energiefluss des aktuellen Verbrauchs für Photovoltaik, Batterie, Eigenverbrauch, Netzeinspeisung (Netzverbrauch), Autoladung und bis zu 10 mögliche Elemente (Kreis oder Rechteck).

## Amtronwallbox (28.01.2024) - neuer Adapter
https://github.com/rg-engineering/ioBroker.amtronwallbox

<img src="https://raw.githubusercontent.com/rg-engineering/ioBroker.amtronwallbox/master/admin/amtronwallbox.png" width="100" height="100" />

Der Adapter dient als Schnittstelle zu verschiedenen Amtron Wallboxen. Die von der Box bereitgestellten Daten werden ausgelesen und als Stand im Adapter bereitgestellt. Die Daten werden ausschließlich lokal verarbeitet, eine Cloud-Anbindung ist nicht notwendig.

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

Dieser Adapter liest mehrere von der Soliscloud-API verfügbare Werte und speichert sie zur Verwendung in ioBroker.

## Sun2000-modbus (8.2.2024) - neuer Adapter
https://github.com/daolis/ioBroker.sun2000-modbus

<img src="https://raw.githubusercontent.com/daolis/ioBroker.sun2000-modbus/main/admin/sun2000-modbus.png" width="100" height="100" />

Lesen Sie Daten vom Huawei SUN2000-Wechselrichter und LUNA2000-Speicher mit Modbus TCP.

## Szenen (10.2.2024) - neue Funktion
Es ist möglich, Kategorien in Szenen zu verwenden

<img src="media/2024_02_16_scenes-enums.png" width="500" />

## Solaredge (15.2.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.solaredge

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.solaredge/master/admin/solaredge.png" width="100" height="100" />

Daten vom SolarEdge-Überwachungsportal abrufen. Derzeit wird nur der Datenpunkt /overview verwendet, um die aktuelle Leistung und die Energiewerte für Tag, Monat, Jahr und Lebensdauer abzurufen.

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

Lesen Sie Registerdaten vom Huawei SUN2000-Wechselrichter und der LUNA2000-Batterie mithilfe von Modbus TCP.

## Opcua (21.2.2024) – neue Funktion
Der Adapter verfügt jetzt über eine kostenlose Lizenz.

## Senec (25.2.2024) – neuer Adapter
https://github.com/nobl/ioBroker.senec

<img src="https://raw.githubusercontent.com/nobl/ioBroker.senec/master/admin/senec.png" width="100" height="100" />

Ursprünglich auf das Senec Home V2.1 System ausgerichtet. Im Senec.Home System können nur ausgewählte Werte durch den Adapter geändert werden. Senec bietet aktuell auch keine zuverlässige Möglichkeit mehr, die Spitzenkappung über die Weboberfläche zu beeinflussen. Ob auch andere Systeme (z. B. V3) damit funktionieren, hängt davon ab, ob sie ebenfalls auf lala.cgi basieren und dieselben JSON-Informationen bereitstellen.

## Energiefluss-erweitert (11.3.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss-erweitert/main/admin/energiefluss-erweitert.png" width="100" height="100" />

Der Adapter sorgt für einen animierten Energiefluss aller Elemente, die Sie hinzufügen. Dies können sein: Photovoltaik, Batterie, Eigenverbrauch, Netzeinspeisung (Netzverbrauch), Autoladung usw.

## Nmea (17.3.2024) – neuer Adapter
https://github.com/ioBroker/ioBroker.nmea

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.nmea/main/admin/nmea.png" width="100" height="100" />

Dieser Adapter ermöglicht den Anschluss von ioBroker an den NMEA-2000-Yachtbus. Sie können SOG, COG, GPS-Position, Tiefe, Wind, Temperatur und viele weitere Daten vom NMEA-2000-Bus ablesen.
Und sogar den Raymarine-Autopiloten steuern.

![nmea](../../en/history/media/2024_03_17_nmea.png)

## Vis-homekittiles (25.3.2024) – neuer Adapter
https://github.com/Standarduser/ioBroker.vis-homekittiles

<img src="https://raw.githubusercontent.com/Standarduser/ioBroker.vis-homekittiles/main/admin/vis-homekittiles.png" width="100" height="100" />

Homekit Tiles ist ein Widget-Set, das sich am Design von Apple HomeKit orientiert. Das Besondere an den Widgets ist, dass diese keine festen Style-Elemente enthalten, sondern alles per CSS formatiert ist. Dadurch gibt es im VIS-Editor keine separaten Einstellungen für Position und/oder Größe der Icons, Labels etc. Das Design wird durch Änderung des CSS-Codes angepasst. Hierfür kann der CSS-Code aus der Datei /widgets/homekittiles/css/style.css als Vorlage verwendet werden. Der Code wird im VIS-Editor im Reiter „CSS“ eingefügt und kann beliebig angepasst werden. Es ist zudem möglich, über den VIS-Editor im Bereich „Allgemein“ der Widgets eigene CSS-Klassen hinzuzufügen.

Die Widgets sind für VIS 1.x konzipiert.

## Scheduler (05.4.2024) – neue Funktion
Der Scheduler unterstützt jetzt Feiertage und benutzerdefinierte Typen.

## Admin (6.4.2024) – neue Funktion
Der Administrator unterstützt jetzt die Includes in JSONConfig-Dateien:

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

## Geglättet (8.4.2024) – neuer Adapter
https://github.com/BenAhrdt/ioBroker.smoothed

<img src="https://raw.githubusercontent.com/BenAhrdt/ioBroker.smoothed/main/admin/smoothed.png" width="100" height="100" />

Dieser Adapter ermöglicht die einfache Auswahl einiger Symbole, um diese entsprechend einem ausgewählten Algorithmus und der Glättungszeit (Filterzeit) zu glätten. Sie können eine ID mehrmals auswählen, um sie in verschiedenen Algorithmen und/oder Zeiten zu glätten. Das Ziel ist eine ID im Verzeichnis des Filters, der Ihnen die geglätteten Werte liefert. Sie können die Min- oder Max-Werte begrenzen. Begrenzen Sie die Dezimalstellen. Oder ignorieren Sie Werte mit einer hohen Standardabweichung.

##heizoel24-mex (14.4.2024) – neuer Adapter
https://github.com/ltspicer/ioBroker.heizoel24-mex

<img src="https://raw.githubusercontent.com/ltspicer/ioBroker.heizoel24-mex/main/admin/heizoel24-mex.png" width="100" height="100" />

Der MEX ist ein Heizöl-Füllstandsmessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

## Hydrawise (17.4.2024) – neuer Adapter
https://github.com/SentiQ/ioBroker.hydrawise

<img src="https://raw.githubusercontent.com/SentiQ/ioBroker.hydrawise/main/admin/hydrawise.jpg" width="100" height="100" />

Integrieren Sie Ihren Hydrawise-Controller in ioBroker. Sie sehen alle Controller-Informationen, Zeitpläne und Sensoren. Es ist auch möglich, die geplante Bewässerung um x Sekunden zu unterbrechen.

## Tedee (17.4.2024) – neuer Adapter
https://github.com/TA2k/ioBroker.tedee

<img src="https://raw.githubusercontent.com/TA2k/ioBroker.tedee/main/admin/tedee.png" width="100" height="100" />

Adapter für Tedee-Schlösser. Dieser Adapter nutzt die lokale Bridge-API zur Steuerung eines Tedee-Schlosses.
Alle Tedee-Schlösser werden unterstützt.

## Pid (22.4.2024) – neuer Adapter
https://github.com/mcm4iob/ioBroker.pid

<img src="https://raw.githubusercontent.com/mcm4iob/ioBroker.pid/master/admin/pid.png" width="100" height="100" />

Dieser Adapter bietet die Funktionalität eines PID-Reglers.

## Unifi-protect (28.4.2024) – stabile Version
https://github.com/iobroker-community-adapters/ioBroker.unifi-protect

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.unifi-protect/master/admin/unifi-protect.png" width="100" height="100" />

Stellt eine Verbindung zum Unifi Protect Controller her und ruft alle Daten von hinzugefügten Kameras ab.

## Air-q (1.5.2024) – neuer Adapter
https://github.com/CorantGmbH/ioBroker.air-q

<img src="https://raw.githubusercontent.com/CorantGmbH/ioBroker.air-q/main/admin/air-q.png" width="100" height="100" />

Dieser ioBroker Adapter wird in Verbindung mit unserem air-Q Gerät verwendet. Er fragt die Werte unserer Sensoren ab und zeigt sie Ihnen in der ioBroker Umgebung an.

## Boschindego (4.5.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.boschindego

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.boschindego/main/admin/boschindego.png" width="100" height="100" />

Adapter für Bosch Indego Mower zur Anzeige des Mähzustands und zur Steuerung des Mähers.

## Windows Installer (20.5.2024) – neue Funktion
Es ist eine neue Version des Windows-Installationsprogramms verfügbar: 3.1.0. Neue Funktionen:

- Update/Upgrade des JS-Controllers implementiert
- Einige Fehlerbehebungen

## Radarfalle (29.5.2024) – neuer Adapter im Stall
https://github.com/Steiger04/ioBroker.radar-trap

<img src="https://raw.githubusercontent.com/Steiger04/ioBroker.radar-trap/main/admin/radar-trap.png" width="100" height="100" />

Adapter zur Erkennung von Radarfallen und Hindernissen.

## Waterkotte-easycon (12.4.2024) – spätestens neuer Adapter
https://github.com/theknut/ioBroker.waterkotte-easycon

<img src="https://raw.githubusercontent.com/theknut/ioBroker.waterkotte-easycon/main/admin/waterkotte-easycon.png" width="100" height="100" />

Adapter für Klimaanlagen von Gree und C&H.

## Vis-2-widgets-inventwo (25.4.2024) – spätestens neuer Adapter
https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo

<img src="https://raw.githubusercontent.com/inventwo/ioBroker.vis-2-widgets-inventwo/main/admin/vis-2-widgets-inventwo.png" width="100" height="100" />

Fügt Schalter, Schaltflächen, Schieberegler und mehr als Widgets für ioBroker VIS 2.0 hinzu.

## Webui (3.10.2023) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.webui

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/admin/logo.png" width="100" height="100" />

Dies ist ein komplettes Visualisierungssystem für ioBroker.

* vollständig auf Web-Komponenten basierend
* WYSIWYG-Editor für die Benutzeroberfläche, Sie können aber auch zur Quellansicht oder zur geteilten Ansicht wechseln
* Multi-Window-UI in der Bearbeitungsansicht, wie in Visual Studio
* Bindungen per Drag & Drop von ioBroker-Objekten auf UI-Elemente oder Eigenschaften
* komplexe Bindungen mit JavaScript und Konverter
* einfache Skriptsprache, die über die Benutzeroberfläche erstellt werden kann

## Hiob (22.5.2024) – spätestens neuer Adapter
https://github.com/moba15/ioBroker.hiob

<img src="https://raw.githubusercontent.com/moba15/ioBroker.hiob/main/admin/hiob.png" width="100" height="100" />

Mit dieser App können Sie Ihr ioBroker Smarthome-System über die hiob-App steuern. Sie ist eine einfachere und schnellere Alternative zu vergleichbaren Projekten mit weniger Konfigurationsmöglichkeiten. Sie ist hauptsächlich für Android-Geräte gedacht, funktioniert aber auch auf Windows- und Linux-Desktops.

## Notificationforandroidtv (22.5.2024) – spätestens neuer Adapter
https://github.com/DNAngelX/ioBroker.notificationforandroidtv

<img src="https://raw.githubusercontent.com/DNAngelX/ioBroker.notificationforandroidtv/main/admin/notificationforandroidtv.png" width="100" height="100" />

Die Benachrichtigungsintegration für ioBroker unterstützt Benachrichtigungen für Android TV und Fire TV. Mit dieser Integration können Sie Benachrichtigungen an Ihr Android TV-Gerät senden. Sie ermöglicht ein Overlay, das den Nachrichteninhalt für eine anpassbare Dauer anzeigt und anschließend verschwindet. Zusätzlich unterstützt sie das Senden von Bildern, beispielsweise von Überwachungskameras, und benutzerdefinierten Symbolen. Symbole funktionieren ähnlich wie Bilder: Sie erscheinen kleiner und links neben der Benachrichtigung, während Bilder größer und oberhalb der Benachrichtigung angezeigt werden.

Diese Benachrichtigungen gelten im globalen Bereich Ihres Android TV-Geräts und werden unabhängig von der aktiven Anwendung angezeigt.

## IOB Mobile App für Android und iOS (04.6.2024) - neue App
![Logo](https://raw.githubusercontent.com/iobroker/iobroker.docs/master/docs/en/history/media/2024_06_30_iob_mobile.png)

Wiki: https://github.com/peter9teufel/iobmobile-issues/wiki/IOB-Mobile-Quickstart

## Gree-hvac (10.6.2024) – neuer Adapter im Stall
https://github.com/XHunter74/ioBroker.gree-hvac

<img src="https://raw.githubusercontent.com/XHunter74/ioBroker.gree-hvac/master/admin/air-conditioner.png" width="100" height="100" />

Adapter für Klimaanlagen von Gree und C&H.

## Admin (10.6.2024) – neue Funktion
- Die Registerkarte „Protokoll“ wurde verbessert. (Vor allem Layout und GUI)
- Unterstützung für die automatische Update-Option des Adapters hinzugefügt. Neue Version des JS-Controllers erforderlich.
- Es werden nur die installierten Adapter im Adapter-Tab oder die ersten 100 Adapter angezeigt. Um weitere Adapter anzuzeigen, muss der Benutzer einen Filter eingeben.

## Opcua (13.6.2024) – neuer Adapter im stabilen
https://github.com/ioBroker/ioBroker.opcua

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.opcua/master/admin/opcua.png" width="100" height="100" />

ioBroker OPC-UA-Adapter.

## E3oncan (25.7.2024) – neuer Adapter im stabilen
https://github.com/MyHomeMyData/ioBroker.e3oncan

<img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/e3oncan_small.png" width="100" height="100" />

Geräte der Viessmann E3-Serie (One Base) tauschen intensiv Daten über den CAN-Bus aus. Dieser Adapter kann diese Kommunikation mithören und viele nützliche Informationen extrahieren. Die Energiezähler E380CA und E3100CB werden ebenfalls unterstützt. Dieser Betriebsmodus wird als `Collect` bezeichnet.

Hinweis: Dieser Adapter wird nur auf Linux-Systemen unterstützt.

## Egigeozone2 (6.8.2024) – neuer Adapter im stabilen
https://github.com/obakuhl/ioBroker.egigeozone2

<img src="https://raw.githubusercontent.com/obakuhl/ioBroker.egigeozone2/master/admin/egigeozone.png" width="100" height="100" />

Dies ist ein ioBroker-Adapter für die Android-Geofencing-App „EgiGeoZone“. Er kann Geofence-Ereignisse als HTTP-Anfragen empfangen, wenn Sie mit Ihrem Mobilgerät einen definierten Bereich betreten oder verlassen.

## Hiob (17.8.2024) – neuer Adapter im Stall
https://github.com/moba15/ioBroker.hiob

<img src="https://raw.githubusercontent.com/moba15/ioBroker.hiob/main/admin/hiob.png" width="100" height="100" />

Mit dieser App können Sie Ihr ioBroker Smarthome-System über die hiob-App steuern. Sie ist eine einfachere und schnellere Alternative zu vergleichbaren Projekten mit weniger Konfigurationsmöglichkeiten. Sie ist hauptsächlich für Android-Geräte gedacht, funktioniert aber auch auf Windows- und Linux-Desktops.

## Extron (17.8.2024) – neuer Adapter bei stable
https://github.com/Bannsaenger/ioBroker.extron

<img src="https://raw.githubusercontent.com/Bannsaenger/ioBroker.extron/master/admin/extron.png" width="100" height="100" />

Steuerung von Extron-Geräten. Dieser Adapter dient zur Steuerung einiger Extron Audio-Video-Produkte über das Simple Instruction Set Protocol. Der Funktionsumfang der Geräte ist enorm. Nicht alle Funktionen sind mit dem Adapter und der Interaktion mit ioBroker sinnvoll zu unterstützen.

## Ping (23.08.2024) - neue Funktion
Der Ping-Adapter kann den IP-Adressbereich erkennen, wenn der Bereich weniger als 4096 Adressen umfasst.

Benutzer können die IP-Adressen direkt aus der Benachrichtigung hinzufügen.

![Dynamische Benachrichtigungen](../../en/history/media/2024_09_24_dynamic_notifications.png)

## Admin (23.08.2024) - neue Funktion
Zustände könnten direkt aus der JSON-Konfiguration gesteuert werden, um eine Bereichserkennung oder ähnliches zu starten.

## Admin (01.09.2024) - neue Funktion
![Kontextmenü](../../en/history/media/2024_09_10_admin_context_menu.png)

Einige Benutzer sind möglicherweise bereits mit dem Kontextmenü im ioBroker Admin Object Browser vertraut. Wir möchten jedoch alle daran erinnern, dass ein einfacher Linksklick schnellen Zugriff auf das Kontextmenü bietet und es Ihnen ermöglicht, verschiedene Aktionen an Objekten durchzuführen, z. B. einen Alias für diese zu erstellen.

## Gotify-ws (4.9.2024) – neuer Adapter im stabilen
https://github.com/simatec/ioBroker.gotify-ws

<img src="https://raw.githubusercontent.com/simatec/ioBroker.gotify-ws/master/admin/gotify-ws.png" width="100" height="100" />

Gotify-WS ist ein Adapter, der eine WebSocket-Verbindung zu einem Gotify-Server aufbaut und somit alle Nachrichten vom Server empfangen und verarbeiten kann.

## Wifilight (05.09.2024) - neue Funktion
Der Wifilight-Adapter wurde komplett neu geschrieben und unterstützt jetzt den Kompaktmodus und die JSON-Konfiguration.

##rainbird (17.9.2024) – neuer Adapter im Stall
https://github.com/iobroker-community-adapters/ioBroker.rainbird

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.rainbird/master/admin/rainbird.png" width="100" height="100" />

Ein ioBroker-Adapter für Rain Bird mit LNK-WLAN-Adapter. Dieses Projekt steht in keiner Verbindung zu Rain Bird.

## Vis-2-widgets-rssfeed (18.9.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.vis-2-widgets-rssfeed

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.vis-2-widgets-rssfeed/main/admin/vis-2-widgets-rssfeed.png" width="100" height="100" />

Dieser Adapter enthält ausschließlich die Vis-2-Widgets für den Adapter RSS-Feed. Eine detaillierte Beschreibung der Widgets und der Funktionalität finden Sie unter Adapter RSS-Feed.

## Kisshome-research (19.9.2024) – neuer Adapter
https://github.com/ioBroker/ioBroker.kisshome-research

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.kisshome-research/main/admin/kisshome-research.png" width="100" height="100" />

Dieser spezielle Adapter wurde für das Forschungsprojekt KISSHome entwickelt. Er ist nicht für den allgemeinen Gebrauch bestimmt.

## Admin (21.09.2024) - neue Funktion
![Passwort überprüfen](../../en/history/media/2024_10_01_admin_back_alias.gif)

Benutzer können vom Aliasziel zum Alias selbst springen.

## Admin (28.09.2024) - neue Funktion
![Passwort überprüfen](../../en/history/media/2024_09_28_admin_password.png)

Der Administrator prüft jetzt auf Linux-Systemen, ob ein Systembenutzer mit einem bekannten Passwort vorhanden ist, und fordert zur Änderung auf, wenn ein solcher Benutzer gefunden wurde.

Der Administrator unterstützt die GUI dynamischer Benachrichtigungen.

## Node-red (30.09.2024) - neue Funktion
![Dialogfeld „ID auswählen“](../../en/history/media/2024_09_30_node_red.png)

Node-Red verfügt über mindestens denselben ID-Auswahldialog wie andere Adapter.
Es erfordert die Ausführung einer Administratorinstanz auf demselben Host.

Die Node-Red-Paketversion wurde von 3 auf 4.0.3 erhöht

## Ecoflow-mqtt (14.10.2024) – neuer Adapter
https://github.com/foxthefox/ioBroker.ecoflow-mqtt

<img src="https://raw.githubusercontent.com/foxthefox/ioBroker.ecoflow-mqtt/main/admin/ecoflow-mqtt.png" width="100" height="100" />

Dieser Adapter verbindet sich mit Produkten von Ecoflow ([https://www.ecoflow.com])

## Remeha-home (28.10.2024) – neuer Adapter
https://github.com/simatec/ioBroker.remeha-home

<img src="https://raw.githubusercontent.com/simatec/ioBroker.remeha-home/master/admin/remeha-home.png" width="100" height="100" />

Der ioBroker.remeha-home Adapter ermöglicht die Integration und Steuerung von Remeha-Heizungssystemen über die Remeha Home Plattform. Der Adapter verbindet sich kontinuierlich mit der Remeha Home API und ruft aktuelle Daten ab, um diese im ioBroker-System bereitzustellen. So lässt sich die Heizungsanlage optimal überwachen und steuern.

## Vis-2-widgets-ovarious (12.11.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.vis-2-widgets-ovarious

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.vis-2-widgets-ovarious/main/admin/vis-2-widgets-ovarious.png" width="100" height="100" />

Dieser Adapter enthält verschiedene Vis-2-Widgets. Ok, eigentlich gibt es nur ein Vis-2-Widget, aber weitere sind in Planung.

## Gotify (16.11.2024) – neuer Adapter
https://github.com/ThomasPohl/ioBroker.gotify

<img src="https://raw.githubusercontent.com/ThomasPohl/ioBroker.gotify/main/admin/gotify.png" width="100" height="100" />

Senden Sie Push-Benachrichtigungen von ioBroker an Gotify.

## Google-spreadsheet (3.12.2024) – neuer Adapter
https://github.com/ThomasPohl/ioBroker.google-spreadsheet

<img src="https://raw.githubusercontent.com/ThomasPohl/ioBroker.google-spreadsheet/main/admin/Google_Sheets_logo.svg" width="100" height="100" />

Dieser Adapter kann zur automatischen Interaktion mit Google Spreadsheets verwendet werden.

## Minuaru (3.12.2024) – neuer Adapter
https://github.com/minukodu/ioBroker.minuaru

<img src="https://raw.githubusercontent.com/minukodu/ioBroker.minuaru/main/admin/minuaru.png" width="100" height="100" />

Alarmsystem für ioBroker und minuvis

## Mytime (29.12.2024) – neuer Adapter
https://github.com/oweitman/ioBroker.mytime

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.mytime/main/admin/mytime.png" width="100" height="100" />

Dieser Adapter verarbeitet Zeit (z. B. Countdowns). Die Countdown-Funktionalität stellt Datenpunkte bereit, mit denen Sie einen Countdown verwalten können (z. B. in einem Skript). Der Adapter enthält außerdem verschiedene Widgets zur Visualisierung dieser Countdowns. Mit Zeitreihen können komplexe Zeitreihen erstellt werden, bei denen die Datenpunkte ausgelöst werden.

## Vis-2-widgets-weather-and-heating (29.12.2024) – neuer Adapter
https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating

<img src="https://raw.githubusercontent.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating/master/admin/vis-2-widgets-weather-and-heating.png" width="100" height="100" />

Dieses Vis-2-Widget zeigt Wettervorhersagedaten von `DasWetter.com` oder `weatherunderground` an. Sie benötigen den DasWetter-Adapter oder den `weatherunderground`-Adapter auf Ihrem System.

## Mywallbox (29.12.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.mywallbox

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.mywallbox/main/admin/wallbox.png" width="100" height="100" />

Verbinden Sie Ihre My-Wallbox (z. B. Pulsar Plus) mit ioBroker über den Cloud-Service von My Wallbox

## Bluesound (11.1.2025) – neuer Adapter
https://github.com/Uwe1958/ioBroker.bluesound

<img src="https://raw.githubusercontent.com/Uwe1958/ioBroker.bluesound/main/admin/bluesound.png" width="100" height="100" />

Adapter zur Steuerung von Bluesound-Geräten

## Ta-blnet (11.1.2025) – neuer Adapter
https://github.com/weberk/ioBroker.ta-blnet

<img src="https://raw.githubusercontent.com/weberk/ioBroker.ta-blnet/main/admin/ta-blnet.png" width="100" height="100" />

Ein ioBroker-Adapter zum Auslesen der Daten von einem oder bis zu acht Klimareglern von Technische Alternative über BL-NET. Oder einer unbegrenzten Anzahl an Klimareglern, die an CMI angeschlossen sind.

##teslafi (11.1.2025) – neuer Adapter
https://github.com/hombach/ioBroker.teslafi

<img src="https://raw.githubusercontent.com/hombach/ioBroker.teslafi/master/admin/teslafi.png" width="100" height="100" />

Der TeslaFi-Adapter ermöglicht die mühelose Integration von Fahrzeugdaten aus Ihrem TeslaFi-Konto in das ioBroker-System. Nutzen Sie diese Daten, um Ihr Tesla-Erlebnis zu verbessern und die Arbeitsabläufe der Hausautomation zu optimieren.

## Flexcharts (15.01.2025) - neuer Adapter
https://github.com/MyHomeMyData/ioBroker.flexcharts

<img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/flexcharts-icon-small.png" width="100" height="100" />

Dieser Adapter bringt fast den gesamten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html) in ioBroker. Dieser Adapter ist nicht für die schnelle Erstellung eines einfachen Diagramms gedacht. Wenn Sie jedoch eine konkrete Idee für ein komplexeres Diagramm haben, bietet Flexcharts die Möglichkeit, diese umzusetzen.

## Paperless-ngx (27.1.2025) – neuer Adapter
https://github.com/BenAhrdt/ioBroker.paperless-ngx

<img src="https://raw.githubusercontent.com/BenAhrdt/ioBroker.paperless-ngx/main/admin/paperless-ngx.png" width="100" height="100" />

Paperless-NGX-API zum Abrufen von Informationen zu laufenden Instanzen von Paperless-NGX. Sie können beispielsweise Tags, Dokumente, Dokumenttypen, Benutzer oder Korrespondenten der Paperless-Instanz lesen.

## Asterisk (12.2.2025) – neuer Adapter
https://github.com/schmupu/ioBroker.asterisk

<img src="https://raw.githubusercontent.com/schmupu/ioBroker.asterisk/master/admin/asterisk.png" width="100" height="100" />

Der Asterisk-Adapter wandelt Textnachrichten in Audiodateien um und ruft dann über Asterisk per VoIP jede gewünschte Telefonnummer an und spielt die Audionachricht ab.

##tagesschau (15.2.2025) – neuer Adapter
https://github.com/ticaki/ioBroker.tagesschau

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.tagesschau/main/admin/tagesschau.png" width="100" height="100" />

Ruft Nachrichten und Videolinks der Tagesschau ab.

## Maxxi-charge (15.2.2025) – neuer Adapter
https://github.com/blabond/ioBroker.maxxi-charge

<img src="https://raw.githubusercontent.com/blabond/ioBroker.maxxi-charge/main/admin/maxxi-charge.png" width="100" height="100" />

ioBroker.MaxxiCharge ist ein Adapter für das ioBroker-System, der die Integration und Steuerung von MaxxiCharge CCU-Geräten ermöglicht. Der Adapter bietet verschiedene Funktionen, darunter das Auslesen von Gerätedaten, das Anpassen von Konfigurationen und das Senden von Steuerbefehlen.

## Admin (2.3.2025) - neue Funktion
Die Admin-Version 7.5.0 verfügt über neue wichtige und nützliche Funktionen:

- OAuth2-Authentifizierung.
- Umbenennen/Kopieren der Objekte

Der Authentifizierungsprozess wurde vollständig neu geschrieben und jetzt wird die angemeldete Sitzung ordnungsgemäß aufrechterhalten.

Der Benutzer kann die Objekte über das Kontextmenü umbenennen, verschieben oder eine Kopie erstellen.

## Luftqualität (3.3.2025) – neuer Adapter
https://github.com/raschy/ioBroker.airquality

<img src="https://raw.githubusercontent.com/raschy/ioBroker.airquality/main/admin/airquality.png" width="100" height="100" />

Holen Sie sich Daten vom deutschen UBA.

## Oxxify-fan-control (17.3.2025) – neuer Adapter
https://github.com/N-b-dy/ioBroker.oxxify-fan-control

<img src="https://raw.githubusercontent.com/N-b-dy/ioBroker.oxxify-fan-control/main/admin/oxxify-fan-control.png" width="100" height="100" />

Integrieren Sie Ihre Oxxify-Ventilatoren in Ihr Smart Home. Alle bereitgestellten ioBroker-Datenpunkte basieren auf dem hier beschriebenen Kommunikationsprotokoll. Da andere Hersteller dasselbe Protokoll verwenden (z. B. Blauberg-Ventile), ist es sehr wahrscheinlich, dass diese ebenfalls funktionieren.

## Seplos-v3-sniffer (12.3.2025) – neuer Adapter
https://github.com/DpunktS/ioBroker.seplos-v3-sniffer

<img src="https://raw.githubusercontent.com/DpunktS/ioBroker.seplos-v3-sniffer/main/admin/seplos-v3-sniffer.jpg" width="100" height="100" />

Dieser Adapter wurde entwickelt, um das Seplos V3 BMS in einer Multipack-Konfiguration auszulesen. In der V3-Generation fungiert das erste BMS als Modbus-Master, während alle anderen BMS als Slaves fungieren. In dieser Konfiguration ist es nicht mehr möglich, von einem dritten Gerät über Modbus auf das BMS zuzugreifen, da in einem RS-485-Modbus-System keine zwei Master-Geräte existieren können. Der Adapter erkennt die Kommunikation zwischen den Geräten passiv, sodass die Kommunikation der einzelnen BMS nicht gestört wird. Die Kommunikation kann entweder über eine lokale Schnittstelle (z. B. /dec/ttyS0) oder über Ser2Net (tcp://ip:2001) erfolgen.

## Lcn (12.3.2025) – neue Funktion
https://github.com/ioBroker/ioBroker.lcn

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.lcn/master/admin/lcn.png" width="100" height="100" />

Der LCN-Adapter ist jetzt kostenlos. Jeder kann ihn ohne Einschränkungen nutzen.

##bayernluft (29.3.2025) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.bayernluft

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.bayernluft/main/admin/bayernluft.png" width="100" height="100" />

Verbindet Lüftungsgeräte der BayernLuft mit ioBroker-Systemen.

## Controme (3.4.2025) – neuer Adapter
https://github.com/MadErstam/ioBroker.controme

<img src="https://raw.githubusercontent.com/MadErstam/ioBroker.controme/main/admin/controme.png" width="100" height="100" />

Stellen Sie mithilfe der offiziellen API eine Verbindung zum lokalen Controme-Miniserver her.

Controme ist ein Heizungssteuerungssystem, mit dem Sie Ihre Fußbodenheizung, Zentralheizung, Heizkörper oder andere Klimatisierungsgeräte steuern können. Herzstück des Controme Smart-Heat-Systems ist der Controme Mini-Server, ein lokales Raspberry-Pi-basiertes System. Weitere Informationen zum Controme Smart-Heat-System finden Sie auf der Controme-Website.

## Batrium-bms (4.4.2025) – neuer Adapter
https://github.com/bembelstemmer/ioBroker.batrium-bms

<img src="https://raw.githubusercontent.com/bembelstemmer/ioBroker.batrium-bms/main/admin/batrium-bms.png" width="100" height="100" />

Ein ioBroker-Adapter zum Verfolgen der über UDP veröffentlichten Metriken Ihres Batrium BMS.

Dieser Adapter basiert auf der offiziellen Batrium WatchMonUdpListener-Implementierung unter: https://github.com/Batrium/WatchMonUdpListener

## Fyta (9.4.2025) – neuer Adapter
https://github.com/muffin142/ioBroker.fyta

<img src="https://raw.githubusercontent.com/muffin142/ioBroker.fyta/main/admin/fyta.png" width="100" height="100" />

Inoffizieller Adapter zum Verbinden von ioBroker mit FYTA-Anlagensensoren. Sensoren können im FYTA-Shop erworben werden.

## Shrdzm (16.4.2025) – neuer Adapter
https://github.com/mcm4iob/ioBroker.shrdzm

<img src="https://raw.githubusercontent.com/mcm4iob/ioBroker.shrdzm/main/admin/shrdzm.png" width="100" height="100" />

Dieser Adapter integriert die SHRDZM-Smartmeter-Schnittstelle der SHRDZM IT Services e.U. in den ioBroker. Eine Beschreibung der Schnittstelle finden Sie unter [Hier](https://cms.shrdzm.com/produkt/smartmeter-modul/).

## Js-controller (16.4.2025) - neue Funktion
Der js-controller 7.0.7 ist nun in der neuesten Version verfügbar. Er enthält Fehlerbehebungen und Verbesserungen. Die wichtigsten Änderungen sind:

- Erweiterte „encryptedNative“ und „protectedNative“. Entwickler können nun „encryptedNative“ und „protectedNative“ in Strukturen und Arrays ansprechen.
- Das Tippen wurde verbessert.

## Ankersolix2 (18.4.2025) – neuer Adapter
https://github.com/ronny130286/ioBroker.ankersolix2

<img src="https://raw.githubusercontent.com/ronny130286/ioBroker.ankersolix2/main/admin/ankersolix2.png" width="100" height="100" />

Integrieren Sie Anker Solix 2. Dieses Projekt stammt von https://github.com/tomquist/solix2mqtt und bringt Informationen von der Anker-API direkt in ioBroker.

## Geräte (20.4.2025) – neue Funktion
<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.devices/master/admin/devices.png" width="100" height="100" />

Der `devices`-Adapter wurde auf Version 1.2.0 aktualisiert. Er wurde komplett mit TypeScript- und Vite-Technologien neu geschrieben. Die neue Version ist schneller und stabiler.

## Mhi-wfrac (30.4.2025) – neuer Adapter
https://github.com/hacki11/ioBroker.mhi-wfrac

<img src="https://raw.githubusercontent.com/hacki11/ioBroker.mhi-wfrac/main/admin/mhi-wfrac.png" width="100" height="100" />

Mitsubishi Heavy Industries-Klimaanlagen mit WLAN-Adapter WF-RAC.
Dieser Adapter integriert mit WF-RAC (WLAN) ausgestattete Mitsubishi Heavy Industries-Klimaanlagen in ioBroker.

## Refoss (7.5.2025) – neuer Adapter
https://github.com/Refoss/ioBroker.refoss

<img src="https://raw.githubusercontent.com/Refoss/ioBroker.refoss/main/admin/refoss.png" width="100" height="100" />

Integrieren Sie Refoss-Geräte in ioBroker.
Weitere und detaillierte Informationen zum Gerät finden Sie hier: [Refoss](https://www.amazon.de/dp/B0D3PY4RVZ)

## Plenticore-g3 (9.5.2025) – neuer Adapter
https://github.com/FernetMenta/ioBroker.plenticore-g3

<img src="https://raw.githubusercontent.com/FernetMenta/ioBroker.plenticore-g3/main/admin/plenticore-g3.png" width="100" height="100" />

Adapter zur Kommunikation mit einem KOSTAL Plenticore plus über die REST-API. Diese API ist deutlich leistungsfähiger als Modbus. Sie ermöglicht den Zugriff auf ca. 200 schreibgeschützte Datenpunkte (Prozessdaten) und ca. 250 schreibbare Einstellungen. Die API ist unter folgender URL dokumentiert:

http://<plenticore host>/api/v1

## Dnscope (17.5.2025) – neuer Adapter
https://github.com/simatec/ioBroker.dnscope

<img src="https://raw.githubusercontent.com/simatec/ioBroker.dnscope/main/admin/dnscope.png" width="100" height="100" />

DNScope ermöglicht Ihnen die Aktualisierung Ihres dynamischen DNS-Kontos direkt in ioBroker. Es ist möglich, Ihr DNS-Konto mit der aktuellen IP-Adresse Ihrer Umgebung ohne Umwege oder zusätzliche Hardware zu aktualisieren.

## Skiinfo (16.5.2025) – neuer Adapter
https://github.com/oweitman/ioBroker.skiinfo

<img src="https://raw.githubusercontent.com/oweitman/ioBroker.skiinfo/main/admin/skiinfo.png width="100" height="100" />

Mit diesem Adapter können Sie die aktuellen Schneehöhen für Berg-, Tal- und Neuschnee sowie geöffnete Lifte für verschiedene europäische Standorte abrufen.

<!-- ACHTUNG: Verwenden Sie die Adresse https://raw.githubusercontent.com/... für Symbole! -->