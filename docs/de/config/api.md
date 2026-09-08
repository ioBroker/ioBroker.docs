---
title:       "Schnittstellen nach außen"
lastChanged: "08.09.2026"
---

# Schnittstellen nach außen

Irgendwann soll etwas mit ioBroker reden, das kein Adapter ist: ein
Shell-Skript, Node-RED, Grafana, eine Wetterstation, die Hausautomatisierung
eines Nachbarn oder eine selbst gebaute App. Dafür gibt es Adapter, die einen
Zugang von außen bereitstellen.

## Welcher Zugang

| Adapter | Art | Port ab Werk | Gut für |
| --- | --- | --- | --- |
| **simple-api** | HTTP, feste Adressen | 8087 | Ein Wert lesen oder setzen, aus einem Skript oder einem Browser heraus |
| **rest-api** | HTTP, REST mit Swagger | 8093 | Programme, die eine saubere Schnittstelle erwarten, mit Anmeldung über Token |
| **ws** | WebSocket | über den `web`-Adapter | Anwendungen, die Änderungen **sofort** mitbekommen sollen, ohne nachzufragen |

Die Faustregel: **abfragen** über HTTP, **zuhören** über WebSocket. Wer alle
zehn Sekunden dieselbe Adresse aufruft, um zu sehen, ob sich etwas geändert hat,
braucht eigentlich einen WebSocket.

## simple-api

Der einfachste Zugang. Nach dem Anlegen einer Instanz liefert
`http://<adresse>:8087/help` die Liste der möglichen Aufrufe. Die wichtigsten:

```
http://<adresse>:8087/getPlainValue/<id>        nur der Wert, als Text
http://<adresse>:8087/get/<id>                  der Zustand als JSON
http://<adresse>:8087/getBulk/<id1>,<id2>       mehrere auf einmal
http://<adresse>:8087/set/<id>?value=1          einen Wert setzen
http://<adresse>:8087/toggle/<id>               umschalten
http://<adresse>:8087/setBulk?<id1>=0.7&<id2>=0 mehrere setzen
http://<adresse>:8087/states?pattern=hm-rpc.0*  Zustände suchen
http://<adresse>:8087/objects?pattern=hm-rpc.0* Objekte suchen
```

Angehängt an einen Aufruf formatiert `?prettyPrint` die Ausgabe lesbar. Damit
lässt sich alles im Browser ausprobieren, bevor es in ein Skript wandert.

?> `getPlainValue` liefert wirklich nur den Wert, ohne Anführungszeichen und
ohne Klammern. Genau das braucht ein Shell-Skript, das den Wert weiterreicht.

Auch der Verlauf lässt sich abfragen, wenn eine
[Aufzeichnung](/docs/config/history.md) läuft:

```
http://<adresse>:8087/query/<id>?dateFrom=2026-09-01T00:00:00.000Z&aggregate=minmax&count=2000
```

## rest-api

Der modernere Zugang. Ein Aufruf von `http://<adresse>:8093/` öffnet eine
Swagger-Oberfläche, in der sich alle Aufrufe ausprobieren lassen, ohne dass man
sie erst nachschlagen muss.

```
http://<adresse>:8093/v1/state/<id>             Zustand als JSON
http://<adresse>:8093/v1/state/<id>/plain       nur der Wert
http://<adresse>:8093/v1/sendto/javascript.0    eine Nachricht an eine Instanz
http://<adresse>:8093/v1/command/<name>         einen Befehl ausführen
```

Zustände lassen sich außerdem **abonnieren**, und über
`http://<adresse>:8093/oauth/token` gibt es eine Anmeldung mit Token statt mit
Benutzername und Passwort in der Adresse.

## ws

Der WebSocket-Zugang. Er wird nicht direkt aufgerufen, sondern von einer
Anwendung benutzt, die eine dauerhafte Verbindung aufbaut und über Änderungen
benachrichtigt wird, statt nachzufragen. vis und echarts holen ihre Daten auf
diesem Weg.

Seit Version 4 arbeitet der Adapter mit reinen WebSockets; socket.io wird nur
noch nachgebildet. Ein Beispiel liegt im
[Repository](https://github.com/ioBroker/ioBroker.ws).

## Sicherheit

!> Diese Adapter geben Zugriff auf Ihre Datenpunkte, und ohne Anmeldung ist der
Zugriff für jeden offen, der die Adresse kennt. Im eigenen Netz mag das genügen,
darüber hinaus nicht.

Drei Dinge gehören dazu, bevor eine Schnittstelle über das Heimnetz
hinausgeht:

1. **Anmeldung einschalten** an der betreffenden Instanz. Siehe
   [Authentifizierung](/docs/config/login.md).
2. **Einen eigenen Benutzer anlegen** mit nur den Rechten, die das aufrufende
   Programm braucht, nicht `admin`. Siehe
   [Zugriffsverwaltung](/docs/config/userrights.md).
3. **Verschlüsseln**, sonst gehen die Zugangsdaten im Klartext über die Leitung.
   Siehe [Verschlüsselung](/docs/config/encryption.md).

!> Bei `simple-api` stehen Benutzername und Passwort in der Adresse und landen
damit in Protokollen und in der Verlaufsliste des Browsers. Für Zugriffe von
außen ist `rest-api` mit Token die bessere Wahl.

?> Von unterwegs erreichbar machen geht ohne offenen Port über den
[iot-Adapter](/docs/cloud/iot.md). Eine Portweiterleitung auf eine dieser
Schnittstellen ist die schlechteste der möglichen Lösungen.

## Der umgekehrte Weg

Soll nicht abgefragt, sondern **gemeldet** werden, also ein fremdes System
schickt etwas an ioBroker, kommen andere Wege in Frage:

* **MQTT** über den gleichnamigen Adapter, wenn das andere System das spricht.
* **URL-Services** über die Cloud, wenn die Meldung aus dem Internet kommt und
  kein Port geöffnet werden soll. Siehe
  [Dienste](/docs/cloud/services.md).
* **simple-api** mit `set`, wenn das fremde System schlicht eine Adresse
  aufrufen kann.
