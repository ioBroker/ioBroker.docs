---
title:       "Visualisierungen über die Cloud"
lastChanged: "08.09.2026"
---

# Visualisierungen über die Cloud

Eine Visualisierung, die zu Hause im Browser läuft, ist von unterwegs zunächst
nicht erreichbar. Der naheliegende Gedanke, dafür einen Port im Router
freizugeben, ist der schlechteste der möglichen Wege: die Oberfläche steht dann
im Internet, und alles, was sie schützt, ist ein Passwort.

Der vorgesehene Weg führt über den
[iot-Adapter](/docs/cloud/iot.md). Er baut
die Verbindung von innen nach außen auf. Der Router bleibt zu, und die
Oberfläche ist trotzdem über eine Adresse des Dienstes erreichbar.

## Wie es zusammenhängt

Die Visualisierung selbst wird von einer Instanz des `web`-Adapters
ausgeliefert. Der iot-Adapter reicht genau diese Instanz nach außen durch. In
seiner Konfiguration wird dazu ausgewählt, welche `web`-Instanz das sein soll.

Damit gilt für den Zugriff von außen dasselbe wie zu Hause: dieselbe Oberfläche,
dieselben Benutzer, dieselben Rechte.

## Vorgehen

1. Den [iot-Adapter](/docs/cloud/iot.md)
   einrichten und prüfen, dass die Verbindung steht.
2. In seiner Konfiguration die `web`-Instanz auswählen, unter der die
   Visualisierung läuft.
3. An dieser `web`-Instanz die
   [Anmeldung](/docs/config/login.md)
   einschalten und für die betreffenden Personen Benutzer anlegen.
4. Von einem Mobilfunknetz aus ausprobieren, nicht aus dem eigenen WLAN. Sonst
   prüft man nur den Weg im Haus.

!> Ohne eingeschaltete Anmeldung wäre die Oberfläche für jeden zugänglich, der
die Adresse kennt. Was ein Benutzer sehen und schalten darf, steht unter
[Zugriffsverwaltung](/docs/config/userrights.md).

## Grenzen

* Der Weg über den Dienst kostet etwas Zeit. Für das Bedienen von Schaltern und
  das Ablesen von Werten fällt das nicht auf, für Videobilder in Echtzeit schon.
* Eingebundene Inhalte aus dem eigenen Netz funktionieren von außen nicht. Wer
  in seiner Visualisierung das Bild einer Kamera über deren lokale Adresse
  einbindet, sieht von unterwegs ein leeres Feld.
* Die Zahl der Anfragen ist je nach Paket begrenzt. Eine Oberfläche, die
  sekündlich Werte nachlädt, verbraucht mehr als eine, die auf Änderungen wartet.

?> Wer die Oberfläche vor allem auf dem Telefon nutzt, sollte sich die
[offizielle App](/docs/cloud/app.md)
ansehen. Sie geht denselben Weg, ist aber für das Telefon gemacht.
