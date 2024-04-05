---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/history/history.md
title: Was ist neu
hash: 3AgwSsEUQCN7bG9gvTq1HVyE3E9b+0FlQzhILNtQqcY=
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
- wenn Sie Neuigkeiten zum neuen Adapter haben, fügen Sie bitte einen GitHub-Link und ein Logo des Adapters hinzu

  Beispiel:

``` 
    ## frigate (2023-08-20) - new adapter
    https://github.com/Bettman66/ioBroker.frigate

    <img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />
```

## Fregatte (2023-08-20) - neuer Adapter
https://github.com/Bettman66/ioBroker.frigate

<img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />

Frigate ist ein Open-Source-NVR, der auf der Echtzeit-KI-Objekterkennung basiert. Dieser Adapter analysiert die MQTT-Nachrichten von Frigate und erstellt daraus Datenobjekte

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

- z. B. einfache Erstellung von Aliasnamen

  ![Bild 1](../../en/history/media/2023_09_26_admin_context.png)

## Javascript (01.09.2023)
Spielplatz für JavaScript-Code:

- Sie können ChatGPT (erforderlicher API-Schlüssel) verwenden, um das Skript zu generieren. Es dient nur dazu, die Möglichkeiten von ChatGPT zu testen

  ![Bild 1](../../en/history/media/2023_09_27_javascript_chat_gpt.png)

## Cec2 (06.09.2023)
https://github.com/iobroker-community-adapters/ioBroker.cec2

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.cec2/master/admin/cec2.png" width="100" height="100" />

Adapter für HDMI CEC - Sie können Geräte mit HDMI CEC überwachen/steuern. Die meisten modernen Fernseher und Multimediageräte unterstützen CEC bis zu einem gewissen Grad.

## Alexa2 (09.09.2023)
* (Apollon77) Aktualisieren Sie den Alexa2-Adapter, um ihn an das geänderte Push-Benachrichtigungssystem von Amazon anzupassen und wieder das Abrufen von Verlaufs- und Interaktionsinformationen zu ermöglichen

## Vis-2-widgets-material (10.09.2023)
* (Bluefox) Türschloss-Widget wurde hinzugefügt

![Bild 1](media/2023_09_10_vis-2-widgets-material-lock-1.png) ![Bild 1](../../en/history/media/2023_09_10_vis-2-widgets-material-lock-2.png)

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
* (bluefox) Horizontaler Menü

  ![Bild 1](../../en/history/media/2023_09_12_vis-2-menu.png)

## Echarts (12.09.2023)
* (Bluefox) Möglichkeit zum Exportieren der Daten in eine JSON-Datei hinzugefügt

  ![Bild 1](../../en/history/media/2023_09_12_echart-1.png)

* (Bluefox) Möglichkeit hinzugefügt, Zoom und Schwenken nach X Sekunden Inaktivität wiederherzustellen

  ![Bild 1](../../en/history/media/2023_09_12_echart-2.png)

* (bluefox) Legende als Dialog anzeigen

  ![Bild2](../../en/history/media/2023_09_13_echart-3.png)

## Js-controller (14.09.2023)
* (foxriver76) js-controller 5 stabil veröffentlichen
* (foxriver76) Upgrade-Installationsprogramm, um nur Node.js 16.x+ zuzulassen

## Apg-info (16.09.2023)
https://github.com/HGlab01/ioBroker.apg-info - neuer Adapter

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.apg-info/master/admin/apg-info.png" width="100" height="100" />

Dieser Adapter liefert die Spitzenzeiten für das österreichische Stromnetz, in denen der Stromverbrauch vermieden werden soll. Darüber hinaus liefert der Adapter die PHELIX-AT Day-Ahead (EPEX Spot) Preise für Österreich.

## Tinymqttbroker (2023-09-16) - neuer Adapter
https://github.com/HGlab01/ioBroker.tinymqttbroker

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.tinymqttbroker/master/admin/tinymqttbroker.png" width="100" height="100" />

Dies ist ein sehr kleiner MQTT-Broker, der keine Objekte/Zustände im iobroker verwaltet, sondern eine zentrale MQTT-Broker-Instanz zum Veröffentlichen und Abonnieren von Themen als MQTT-Client bietet.

## Awtrix-light (2.10.2023) - neuer Adapter
https://github.com/klein0r/ioBroker.awtrix-light

<img src="https://raw.githubusercontent.com/klein0r/ioBroker.awtrix-light/master/admin/awtrix-light.png" width="100" height="100" />

Integrieren Sie Ihr Awtrix Light-Gerät (z. B. Ulanzi TC001) über HTTP

## Webui (3.10.2023) - neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.webui

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/admin/logo.png" width="100" height="100" />

Dies ist ein vollständiges Visualisierungssystem für ioBroker.

* komplett auf Webkomponenten basierend
* WYSIWYG-Editor für die Benutzeroberfläche, Sie können aber auch zur Quellansicht oder zur geteilten Ansicht wechseln
* Multi-Window-Benutzeroberfläche in der Bearbeitungsansicht, wie in Visal Studio
* Bindungen per Drag & Drop von ioBroker-Objekten auf UI-Elemente oder Eigenschaften
* komplexe Bindungen mit Javascript darin und Konverter
* einfache Skriptsprache, die über die Benutzeroberfläche erstellt werden kann

## Heizungssteuerung (4.10.2023) - neuer Adapter
https://github.com/jbeenenga/ioBroker.heizungssteuerung

<img src="https://raw.githubusercontent.com/jbeenenga/ioBroker.heizungssteuerung/master/admin/heizungssteuerung.png" width="100" height="100" />

Mit diesem Adapter können Sie Heizungsanlagen steuern.

Sie können zwischen Kühl- und Heizbetrieb wählen und Boost oder Pause für einen Raum aktivieren.

Darüber hinaus können Sie die Zieltemperatur für einen Raum überschreiben.

## Admin und mqtt (11.10.2023) - neue Funktion
Admin- und MQTT-Adapter prüfen nun, ob sie vom öffentlichen Internet aus erreichbar sind, wenn keine Authentifizierung aktiviert ist. Wenn nicht, zeigen sie eine Warnung im Protokoll und im Admin an.

Dies ist eine nützliche Funktion, da nicht alle Benutzer wissen, wie sie ihre Adapter sichern, und es gefährlich ist, MQTT- oder Admin-Adapter ohne Authentifizierung für das Internet geöffnet zu haben.

## Iobroker (11.10.2023) - neue Funktion
Jetzt ist es möglich, Ihr node.js über die Befehlszeile zu aktualisieren: `iob nodejs-update` https://forum.iobroker.net/topic/69067/neuer-befehl-iob-nodejs-update

Sie können ohne zusätzliche Parameter auf eine vorgeschlagene Version (aktuell 18) aktualisieren oder eine Version angeben: `iob nodejs-update 20`

## Vis-2-widgets-material (13.10.2023) - neues Widget
Staubsauger-Widget wurde hinzugefügt.

Dieses Widget ist primär für Xiaomi-Staubsauger gedacht.
Es kann aber auch für jeden anderen Staubsauger verwendet werden.
Der einzige Unterschied besteht darin, dass Xiaomi die Raumreinigung unterstützt.

![Bild 1](../../en/history/media/2023_10_13_material-vacuum.png)

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

Fragen Sie die Zellspannungen und den Status von pylontech Batterien über die Konsole ab.

## Signifylights (26.10.2023) - neuer Adapter
https://github.com/disaster123/ioBroker.signifylights

<img src="https://raw.githubusercontent.com/disaster123/ioBroker.signifylights/main/admin/signifylights.png" width="100" height="100" />

Signify Lights-Adapter für alle Arten von Signify WLAN-Leuchten wie WIZ, Philips WLAN und viele mehr ...

## Esphome (01.11.2023) - neue Funktion
In einer wichtigen Entwicklung für Heimautomatisierungs-Enthusiasten wurde in der ESPHome-Dokumentation die Integration von ioBroker mit seiner nativen API offiziell anerkannt.
Dieses Update folgt der Annahme einer kürzlichen PR, die ioBroker neben Home Assistant als eines der exklusiven Heimautomatisierungssysteme platziert, das die native API von ESPHome für die direkte Client-Kommunikation nutzt.

Die native API, die für ihr hochoptimiertes Netzwerkprotokoll bekannt ist, bietet zahlreiche Vorteile gegenüber herkömmlichen MQTT-Methoden und optimiert die Art und Weise, wie intelligente Geräte innerhalb des Ökosystems interagieren.
Mit dieser Anerkennung bekräftigt ESPHome sein Engagement, effiziente und robuste Kommunikationskanäle für die Smart-Home-Branche bereitzustellen.

## Vis (06.11.2023) - neue Funktion
Die Lizenz von vis wurde auf MIT geändert. Dies bedeutet, dass Sie vis in kommerziellen Projekten kostenlos verwenden können und keine Lizenz erforderlich ist.

## Willkommen (07.11.2023) - neue Funktion
Möglichkeit hinzugefügt, benutzerdefinierte Links zur Willkommensseite hinzuzufügen. Die Seiten werden auf ihre Aktivität geprüft.

<img src="media/2023_11_07_welcome.png" width="500" />

## Echarts (08.11.2023) - neues Feature
Vis-2-Widget wurde hinzugefügt. Jetzt können Sie zusätzlich zu den Voreinstellungen die Objekt-ID direkt mit Verlaufsdaten verwenden.

<img src="media/2023_11_08_echarts.png" width="500" />

## Renacidc (17.11.2023) - neuer Adapter
https://github.com/raschy/ioBroker.renacidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.renacidc/main/admin/renacidc.png" width="100" height="100" />

Auslesen der Daten von Renacpower Solarwechselrichtern

## Wetterwarnungen (24.11.2023) - neuer Adapter
https://github.com/ticaki/ioBroker.weather-warnings

<img src="https://raw.githubusercontent.com/ticaki/ioBroker.weather-warnings/main/admin/weather-warnings.png" width="100" height="100" />

Dieser Adapter greift auf Wetterwarnungen verschiedener Wetterdienste zu und gibt diese als Text- oder Sprachnachricht aus. Zusätzlich werden nach Typ gruppierte Staaten erstellt, mit deren Hilfe auf aktuelle Warnungen reagiert werden kann.

## Tractive-gps (06.12.2023) - neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.tractive-gps

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.tractive-gps/main/admin/tractive-gps.png" width="100" height="100" />

Mit diesem Adapter können Sie eine Verbindung zum Tractive GPS-Dienst herstellen und den Standort Ihrer Haustiere abrufen.

## Admin (06.12.2023) - neue Funktion
Es ist möglich, Menüfarben im Admin zu ändern

<img src="media/2023_12_06_admin.png" width="500" />

##emporia (07.12.2023) - neuer Adapter
https://github.com/Chris-656/ioBroker.emporia

<img src="https://raw.githubusercontent.com/Chris-656/ioBroker.emporia/main/admin/emporia.png" width="100" height="100" />

Dieser Adapter ruft Daten vom Emporia Energiesystem ab.

## Reolink (27.12.2023) - neuer Adapter
https://github.com/aendue/ioBroker.reolink

<img src="https://raw.githubusercontent.com/aendue/ioBroker.reolink/main/admin/reolink_logo.png" width="100" height="100" />

Adapter für die ioBroker-Plattform zum Abrufen von Reolink-Kamerainformationen.

## Vis-2 (08.01.2024) - neuer Adapter
https://github.com/ioBroker/ioBroker.vis-2

vis-2 befindet sich nun in einem stabilen Repository. Es ist eine neue Generation von vis. Es basiert auf ReactJS und verfügt über viele neue Funktionen.

## Artnet-recorder (08.01.2024) - neuer Adapter
https://github.com/Bannsaenger/ioBroker.artnet-recorder

<img src="https://raw.githubusercontent.com/Bannsaenger/ioBroker.artnet-recorder/master/admin/artnet-recorder.png" width="100" height="100" />

Aufzeichnen von Art-Net-Daten in einer Datei zur späteren Wiedergabe

##energiefluss (25.01.2024) - neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss/main/admin/energiefluss.png" width="100" height="100" />

Es bietet einen animierten Energiefluss des Stromverbrauchs für Photovoltaik, Batterie, Eigenverbrauch, Netzeinspeisung (Netzverbrauch), Autoladung und bis zu 10 mögliche Elemente (Kreis oder Rechteck).

## Amtronwallbox (28.01.2024) - neuer Adapter
https://github.com/rg-engineering/ioBroker.amtronwallbox

<img src="https://raw.githubusercontent.com/rg-engineering/ioBroker.amtronwallbox/master/admin/amtronwallbox.png" width="100" height="100" />

Der Adapter dient als Schnittstelle zu verschiedenen Amtron Wallboxen. Die von der Box bereitgestellten Daten werden ausgelesen und als Stand im Adapter bereitgestellt. Die Daten werden nur lokal verarbeitet, eine Cloudanbindung ist nicht notwendig.

## Zendure-solarflow (30.01.2024) - neuer Adapter
https://github.com/nograx/ioBroker.zendure-solarflow

<img src="https://raw.githubusercontent.com/nograx/ioBroker.zendure-solarflow/main/admin/zendure-solarflow.png" width="100" height="100" />

Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API. Es verwendet die offizielle API von Zendure.

# Echarts (03.02.2024) - neues Feature
Diagrammtyp „Radar“ hinzugefügt

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.echarts/master/img/radar.png" width="300" height="230" />

## Soliscloud (3.2.2024) - neuer Adapter
https://github.com/Trixx34/ioBroker.soliscloud

<img src="https://raw.githubusercontent.com/Trixx34/ioBroker.soliscloud/main/admin/solis.png" width="100" height="100" />

Dieser Adapter liest mehrere verfügbare Werte aus der Soliscloud-API und speichert sie zur Verwendung in ioBroker.

## Sun2000-modbus (8.2.2024) - neuer Adapter
https://github.com/daolis/ioBroker.sun2000-modbus

<img src="https://raw.githubusercontent.com/daolis/ioBroker.sun2000-modbus/main/admin/sun2000-modbus.png" width="100" height="100" />

Lesen Sie Daten vom Huawei SUN2000-Wechselrichter und LUNA2000-Speicher mit Modbus TCP.

## Szenen (10.2.2024) - neue Funktion
Es ist möglich, Kategorien in Szenen zu verwenden

<img src="media/2024_02_16_scenes-enums.png" width="500" />

##solaredge (15.2.2024) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.solaredge

<img src="https://raw.githubusercontent.com/ioBroker.solaredge/master/admin/solaredge.png" width="100" height="100" />

Holen Sie sich Daten vom SolarEdge-Überwachungsportal. Derzeit wird nur der Datenpunkt /overview verwendet, um die aktuellen Leistungs- und Energiewerte für Tag/Monat/Jahr/Lebensdauer abzurufen.

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

Zunächst auf das Senec Home V2.1 System ausgerichtet. Im Senec.Home System können nur ausgewählte Werte durch den Adapter verändert werden. Senec bietet aktuell auch keine zuverlässige Möglichkeit mehr, Peak Shaving über die Weboberfläche zu beeinflussen. Ob auch andere Systeme (z.B. V3) damit funktionieren, hängt davon ab, ob diese ebenfalls auf lala.cgi basieren und die gleichen JSON-Informationen liefern.

##energiefluss-erweitert (11.3.2024) – neuer Adapter
https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert

<img src="https://raw.githubusercontent.com/SKB-CGN/ioBroker.energiefluss-erweitert/main/admin/energiefluss-erweitert.png" width="100" height="100" />

Der Adapter sorgt für einen animierten Energiefluss aller Elemente, die Sie hinzufügen. Dies können sein: Photovoltaik, Batterie, Eigenverbrauch, Netzeinspeisung (Netzverbrauch), Autoladung usw.

## Nmea (17.3.2024) – neuer Adapter
https://github.com/ioBroker/ioBroker.nmea

<img src="https://raw.githubusercontent.com/ioBroker/ioBroker.nmea/main/admin/nmea.png" width="100" height="100" />

Mit diesem Adapter können Sie ioBroker an den NMEA-2000-Yachtbus anschließen. Sie können SOG, COG, GPS-Position, Tiefe, Wind, Temperatur und viele andere Daten vom NMEA-2000-Bus lesen.
Und sogar den Raymarine-Autopiloten steuern.

![nmea](../../en/history/media/2024_03_17_nmea.png)

## Vis-homekittiles (25.3.2024) – neuer Adapter
https://github.com/Standarduser/ioBroker.vis-homekittiles

<img src="https://github.com/Standarduser/ioBroker.vis-homekittiles/blob/main/admin/vis-homekittiles.png" width="100" height="100" />

Homekit Tiles ist ein Widget-Set, das sich am Design von Apple HomeKit orientiert. Das Besondere an den Widgets ist, dass diese keine festen Style-Elemente enthalten, sondern alles über CSS formatiert ist. Dadurch gibt es im VIS-Editor keine eigenen Einstellungen für die Position und/oder Größe der Icons, Labels etc. Das Design wird durch Veränderung des CSS-Codes angepasst. Hierzu kann der CSS-Code aus der Datei /widgets/homekittiles/css/style.css als Vorlage verwendet werden. Der Code wird im VIS-Editor in den Reiter CSS eingefügt und kann beliebig angepasst werden. Es ist auch möglich, über den VIS-Editor im Bereich „Allgemein“ der Widgets eigene CSS-Klassen hinzuzufügen.

Die Widgets sind für VIS 1.x konzipiert.

## Scheduler (05.4.2024) – neue Funktion
Der Scheduler unterstützt jetzt Feiertage und benutzerdefinierte Typen.