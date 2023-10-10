---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/history/history.md
title: Was ist neu
hash: ydCcQNeaJsdSO0DpIiPNzdsditWhD967JCb2ljfBpI0=
---
# Was ist neu
## Anleitung für Autoren
- Bitte definieren Sie den Header als

  ## AdapterName (JJJJ-MM-TT) – [Kurzbeschreibung]
- Beschreibung des Schusses könnte sein:
  - neuer Adapter
  - stabile Version
  - neue Funktion
- Wenn Sie Neuigkeiten zum neuen Adapter haben, fügen Sie bitte einen GitHub-Link und ein Logo des Adapters hinzu

  Beispiel:

``` 
    ## frigate (2023-08-20) - new adapter
    https://github.com/Bettman66/ioBroker.frigate

    <img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />
```

## Fregatte (20.08.2023) – neuer Adapter
https://github.com/Bettman66/ioBroker.frigate

<img src="https://raw.githubusercontent.com/Bettman66/ioBroker.frigate/master/admin/frigate.png" width="100" height="100" />

Frigate ist ein Open-Source-NVR, der auf der Erkennung von KI-Objekten in Echtzeit basiert. Dieser Adapter analysiert die MQTT-Nachrichten von Frigate und erstellt daraus Datenobjekte

## Notification-manager (21.08.2023) – neuer Adapter
https://github.com/foxriver76/ioBroker.notification-manager

<img src="https://raw.githubusercontent.com/foxriver76/ioBroker.notification-manager/master/admin/notification-manager.png" width="100" height="100" />

Verwalten Sie ioBroker-Benachrichtigungen, indem Sie sie z. B. als Nachrichten versenden

## Procon-ip (24.08.2023)
https://github.com/ylabonte/ioBroker.procon-ip

<img src="https://raw.githubusercontent.com/ylabonte/ioBroker.procon-ip/master/admin/procon-ip.png" width="100" height="100" />

ioBroker-Adapter zur Basisunterstützung der `ProCon.IP` Schwimmbadsteuereinheit.

## Deyeicd (29.08.2023)
https://github.com/raschy/ioBroker.deyeidc

<img src="https://raw.githubusercontent.com/raschy/ioBroker.deyeidc/master/admin/deyeidc.png" width="100" height="100" />

Datensammler für `Deye`-kompatible Wechselrichter

## Acme (01.09.2023)
https://github.com/iobroker-community-adapters/ioBroker.acme

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.acme/master/admin/acme.png" width="100" height="100" />

Dieser Adapter generiert Zertifikate mithilfe von ACME-Herausforderungen.

## Admin (01.09.2023)
Kontextmenü:

- z. B. einfache Erstellung von Aliasen

  ![Bild 1](../../en/history/media/2023_09_26_admin_context.png)

## Javascript (01.09.2023)
Spielplatz für JavaScript-Code:

- Sie können ChatGPT (erforderlicher API-Schlüssel) verwenden, um das Skript zu generieren. Es dient lediglich dazu, die Möglichkeiten von ChatGPT zu testen

  ![Bild 1](../../en/history/media/2023_09_27_javascript_chat_gpt.png)

## Cec2 (06.09.2023)
https://github.com/iobroker-community-adapters/ioBroker.cec2

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.cec2/master/admin/cec2.png" width="100" height="100" />

Adapter für HDMI CEC – Sie können Geräte mit HDMI CEC überwachen/steuern. Die meisten modernen Fernseher und Multimediageräte unterstützen CEC in gewissem Umfang.

## Alexa2 (09.09.2023)
* (Apollon77) Aktualisieren Sie den Alexa2-Adapter, um ihn an das geänderte Push-Benachrichtigungssystem von Amazon anzupassen und den Abruf von Verlaufs- und Interaktionsinformationen wieder zu ermöglichen

## Vis-2-widgets-material (10.09.2023)
* (bluefox) Türschloss-Widget wurde hinzugefügt

![Bild 1](media/2023_09_10_vis-2-widgets-material-lock-1.png) ![Bild 1](../../en/history/media/2023_09_10_vis-2-widgets-material-lock-2.png)

## Pushbullet (10.09.2023)
<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.pushbullet/master/admin/pushbullet.png" width="100" height="100" />

* (bluefox) API wurde auf Version 3 aktualisiert
* (bluefox) JSON-Konfiguration wurde hinzugefügt

  ![JSON-Konfiguration](../../en/history/media/2023_09_10_pushbullet.png)

## JSON-Konfigurationsdokumentation
* (bluefox) JSON-Config-Dokumentation wurde der ioBroker-Website hinzugefügt [hinzugefügt](https://www.iobroker.net/#en/documentation/dev/adapterjsonconfig.md).

## Telegram-menu (11.09.2023)
https://github.com/MiRo1310/ioBroker.telegram-menu

<img src="https://raw.githubusercontent.com/MiRo1310/ioBroker.telegram-menu/master/admin/telegram-menu.png" width="100" height="100" />

Erstellen Sie ganz einfach Telegram-Menüs

## Vis-2 (12.09.2023)
* (bluefox) Horizontales Menü

  ![Bild 1](../../en/history/media/2023_09_12_vis-2-menu.png)

## Echarts (12.09.2023)
* (bluefox) Möglichkeit hinzugefügt, die Daten in eine JSON-Datei zu exportieren

  ![Bild 1](../../en/history/media/2023_09_12_echart-1.png)

* (bluefox) Es wurde die Möglichkeit hinzugefügt, Zoom und Schwenk nach X Sekunden Inaktivität wiederherzustellen

  ![Bild 1](../../en/history/media/2023_09_12_echart-2.png)

* (bluefox) Legende als Dialog anzeigen

  ![Bild2](../../en/history/media/2023_09_13_echart-3.png)

## Js-controller (14.09.2023)
* (foxriver76) Geben Sie js-controller 5 auf stabil frei
* (foxriver76) Aktualisieren Sie das Installationsprogramm, um nur Node.js 16.x+ zuzulassen

## Apg-info (16.09.2023)
https://github.com/HGlab01/ioBroker.apg-info – neuer Adapter

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.apg-info/master/admin/apg-info.png" width="100" height="100" />

Dieser Adapter stellt die Spitzenzeiten für das österreichische Stromnetz bereit, in denen Stromverbrauch vermieden werden soll. Darüber hinaus stellt der Adapter die PHELIX-AT Day-Ahead (EPEX Spot) Preise für Österreich bereit.

## Tinymqttbroker (16.09.2023) – neuer Adapter
https://github.com/HGlab01/ioBroker.tinymqttbroker

<img src="https://raw.githubusercontent.com/HGlab01/ioBroker.tinymqttbroker/master/admin/tinymqttbroker.png" width="100" height="100" />

Dies ist ein sehr kleiner MQTT-Broker, der keine Objekte/Zustände in iobroker verwaltet, sondern eine zentrale MQTT-Broker-Instanz bietet, um Abonnementthemen als MQTT-Client zu veröffentlichen.

## Awtrix-light (2.10.2023) – neuer Adapter
https://github.com/klein0r/ioBroker.awtrix-light

<img src="https://raw.githubusercontent.com/klein0r/ioBroker.awtrix-light/master/admin/awtrix-light.png" width="100" height="100" />

Integrieren Sie Ihr Awtrix Light-Gerät (z. B. Ulanzi TC001) über HTTP

## Webui (3.10.2023) – neuer Adapter
https://github.com/iobroker-community-adapters/ioBroker.webui

<img src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/admin/logo.png" width="100" height="100" />

Dies ist ein vollständiges Visualisierungssystem für ioBroker.

## Heizungssteuerung (4.10.2023) - neuer Adapter
https://github.com/jbeenenga/ioBroker.heizungssteuerung

<img src="https://raw.githubusercontent.com/jbeenenga/ioBroker.heizungssteuerung/master/admin/heizungssteuerung.png" width="100" height="100" />

Mit diesem Adapter können Heizungsanlagen verwaltet werden.
Sie können zwischen Kühl- und Heizmodus wählen und für einen Raum Boost oder Pause aktivieren.
Darüber hinaus können Sie die Solltemperatur für einen Raum überschreiben.