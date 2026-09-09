---
title:       "Visu App"
lastChanged: "09.09.2026"
---

# Die App für Telefon und Tablet

Die offizielle App heißt **ioBroker Visu**. Sie zeigt die eigene Visualisierung
auf dem Telefon oder dem Tablet an, zu Hause wie unterwegs, und ist kostenlos.

* [Android im Play Store](https://play.google.com/store/apps/details?id=com.iobroker.visu)
* [iOS im App Store](https://apps.apple.com/de/app/iobroker-visu/id1673095774)

Herausgeber ist die ioBroker GmbH. Die App sammelt keine Daten und enthält
keine Werbung.

?> Sie ist der Nachfolger der alten App **ioBroker.vis**, die noch das
vis-1-Projekt auf das Telefon herunterlud und dort zwischenspeicherte. Diese
alte App wird nicht mehr weiterentwickelt. Wer sie noch benutzt, richtet die
Verbindung in der neuen App einmal neu ein; übernommen wird nichts.

## Was sie anzeigt

Die App ist ein Rahmen um die Oberfläche, die ohnehin schon läuft. Sie zeichnet
nichts selbst, sondern öffnet die gewählte Visualisierung im Vollbild, ohne
Adresszeile und ohne Browserleisten. In den Einstellungen wird unter
**Anwendung** ausgewählt, welche das sein soll:

[vis-2](/docs/viz/vis-2.md) · [vis](/docs/viz/vis.md) ·
[Lovelace](/docs/viz/lovelace.md) · Material · iQontrol · Jarvis

Für neue Projekte ist vis-2 die richtige Wahl. Die drei zuletzt genannten sind
noch enthalten, damit bestehende Installationen weiterlaufen; ihre Adapter
werden kaum noch gepflegt.

## Voraussetzungen

* Eine fertige Ansicht in der gewählten Visualisierung.
* Der [web-Adapter](/adapters/web), über den sie ausgeliefert wird,
  üblicherweise auf Port 8082. Lovelace bringt seinen eigenen Server mit
  (Port 8091).
* Für den Zugriff von unterwegs ein Zugang bei
  [ioBroker.pro](https://iobroker.pro/www/pricing#remote), siehe
  [IoT-Adapter](/docs/cloud/iot.md).

## Einrichten

Beim ersten Start öffnet sich der Einstellungsdialog von selbst. Später
erreicht man ihn wieder, indem man **mit drei Fingern gleichzeitig** auf die
Anzeige tippt. Das ist bewusst so gelöst: An einem Wandtablet soll niemand
versehentlich in die Einstellungen geraten.

### Verbindung zu Hause

Adresse und Port des ioBroker-Servers, etwa `192.168.0.10` und `8082`. Benutzer
und Kennwort nur, wenn in der Instanz des web-Adapters die Anmeldung
eingeschaltet ist; im eigenen Netz ist sie meistens aus.

### Verbindung von unterwegs

Hier stehen die Zugangsdaten des ioBroker.pro-Kontos. Die Verbindung läuft dann
über die Cloud, es muss also kein Port geöffnet und keine feste Adresse
eingerichtet werden.

### Umschalten zwischen beiden

Die App entscheidet anhand des WLAN-Namens. In den Einstellungen wird eine
Liste von **SSIDs** hinterlegt, mehrere durch Komma getrennt. Ist das Telefon
in einem dieser Netze, nimmt die App die lokale Verbindung, sonst die Cloud.

!> Der Name muss **genau** stimmen, mit Leer- und Sonderzeichen. Der häufigste
Grund dafür, dass die App auch zu Hause über die Cloud geht, ist ein
Tippfehler in der SSID. Am schnellsten prüft man ihn, indem man den Namen aus
den WLAN-Einstellungen des Telefons kopiert.

### Projekt und Instanz

* **Projekt** ist der Name des vis-Projekts, das geöffnet werden soll, etwa
  `main`.
* **Instanz-ID** ist eine frei gewählte Kennung dieses Geräts. Damit lassen sich
  Befehle gezielt an ein bestimmtes Tablet schicken, statt an alle.

### Darstellung

Zoom erlauben oder sperren, Statusleiste und Android-Navigationsleiste ein- und
ausblenden, helles oder dunkles Thema. Für ein fest montiertes Wandtablet
sperrt man den Zoom und blendet beide Leisten aus.

## Was das Gerät zurückmeldet

Die App kann Werte des Geräts an ioBroker zurückgeben, etwa den Ladezustand des
Akkus. Sie erscheinen im Objektbaum unter `vis.0.<Instanz-ID>.battery.level`.
Damit lässt sich zum Beispiel eine Meldung auslösen, wenn das Wandtablet nicht
mehr lädt.

## Stand der Fassungen

| | Fassung | Stand |
| --- | --- | --- |
| Android | 2.2.1 | 06/2026, ab Android 8 |
| iOS | 1.4.2 | 09/2025, ab iOS 15.1 |

Die Android-Fassung wurde 2026 von Grund auf neu geschrieben, weil die alte
unter Android 16 nicht mehr lief. Beim Umstieg auf die 2er-Fassung werden die
alten Einstellungen nicht übernommen, sie müssen einmal neu eingegeben werden.

Fehler und Wünsche werden im
[Fehlerverzeichnis der App](https://github.com/foxriver76/ioBroker-Visu-App)
gesammelt.
