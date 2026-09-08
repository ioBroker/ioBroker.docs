---
title:       "Docker"
lastChanged: "07.09.2026"
---

# ioBroker unter Docker

Docker steckt ioBroker in einen Container: ein abgeschlossenes Paket mit allem,
was er braucht. Das Wirtssystem bleibt sauber, und der Container lässt sich
austauschen, ohne dass die Konfiguration verloren geht.

Das Abbild wird von **buanet** gepflegt, nicht vom ioBroker-Projekt selbst. Es
ist das einzige, das im Forum unterstützt wird, und seine
[offizielle Dokumentation](https://docs.buanet.de/de/iobroker-docker-image/) ist
ausführlicher als diese Seite - dort steht alles zu Umgebungsvariablen,
Zeitzone, Rechten und den Feinheiten der einzelnen Adapter.

?> Docker lohnt sich, wenn schon ein Docker-Host oder ein NAS vorhanden ist.
   Für den ersten eigenen ioBroker auf einem eigenen Gerät ist die
   [Installation unter Linux](https://www.iobroker.net/#de/documentation/install/linux.md)
   der kürzere Weg - eine Ebene weniger, die im Fehlerfall dazwischensteht.

## Voraussetzungen

Vor der Installation prüfen, ob das System die
[Anforderungen](https://www.iobroker.net/#de/documentation/install/requirements.md)
erfüllt. Für den Container gelten dieselben Werte wie für eine normale
Installation, zuzüglich dessen, was das Wirtssystem selbst braucht.

## Der schnellste Weg

```bash
docker run -p 8081:8081 --name iobroker \
  -v iobrokerdata:/opt/iobroker \
  buanet/iobroker:latest
```

Danach ist die Oberfläche unter `http://<adresse-des-hosts>:8081` erreichbar.

## Mit docker compose

Für den Dauerbetrieb ist eine Compose-Datei die bessere Wahl, weil die
Einstellungen damit nachlesbar an einer Stelle stehen:

```yaml
services:
  iobroker:
    image: buanet/iobroker:latest-v11
    container_name: iobroker
    restart: always
    ports:
      - "8081:8081"
    volumes:
      - iobrokerdata:/opt/iobroker

volumes:
  iobrokerdata:
```

## Die drei Punkte, an denen es hakt

### Das Volume ist die Installation

Alles, was ioBroker ausmacht - Konfiguration, Adapter, Datenbank, Skripte -
liegt unter `/opt/iobroker`. Ohne ein Volume an dieser Stelle ist beim nächsten
Austausch des Containers alles weg.

!> Ein Container ist kein Speicherort. Der Container wird ersetzt, das Volume
   bleibt - das ist der ganze Sinn der Sache. Wer das Volume vergisst, merkt es
   beim ersten Update.

### Ein fester Tag statt `latest`

`latest` zeigt immer auf die neueste Fassung, auch über einen Versionssprung
hinweg. Beim nächsten `docker pull` kann also eine Hauptversion weitergeschaltet
werden, ohne dass jemand das entschieden hat. Für eine Anlage, die laufen soll,
ist ein Tag mit Hauptversion oder eine feste Version die richtige Wahl. Die
buanet-Dokumentation empfiehlt das ausdrücklich. Die Hauptversion des Abbilds
war im September 2026 die 11, der Tag heißt entsprechend `latest-v11`.

### Das Netz

Im normalen Brückenmodus sieht der Container das Heimnetz nur über
weitergereichte Ports. Für die meisten Adapter genügt das. **Nicht** genügt es
dort, wo Geräte im Netz gesucht werden - alles, was mit Rundrufen oder
Multicast arbeitet: Philips Hue, Sonos, Chromecast, die Gerätesuche im Admin.
Solche Adapter brauchen den Host-Modus oder ein MACVLAN-Netz.

Ebenso muss angesteckte Hardware - ein Zigbee-Stick, ein CUL - dem Container
ausdrücklich durchgereicht werden.

## Sichern

Die Sicherung läuft wie sonst auch: `iob backup` im Container, und die
entstehende Datei liegt im Volume. Wer das Volume sichert, hat alles. Zusätzlich
lohnt sich der Adapter *backitup*, der die Sicherung planen und aus dem Haus
schaffen kann.

## Weiterlesen

* [Offizielle Dokumentation des Abbilds](https://docs.buanet.de/de/iobroker-docker-image/)
* [Anforderungen](https://www.iobroker.net/#de/documentation/install/requirements.md)
* [Updaten](https://www.iobroker.net/#de/documentation/install/update.md)
