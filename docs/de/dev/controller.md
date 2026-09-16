---
title:       "JS-Controller"
lastChanged: "08.09.2026"
---

# Der js-controller aus Sicht der Entwicklung

Der js-controller ist der Kern jeder ioBroker-Installation. Für die
Adapterentwicklung ist vor allem wichtig, was er bereitstellt und welche Regeln
sich daraus ergeben. Die Sicht des Anwenders auf denselben Gegenstand steht
unter
[Controller und Adapter](/docs/basics/adapter.md).

## Was er übernimmt

| Aufgabe | Was das für einen Adapter bedeutet |
| --- | --- |
| **Prozesse** | Der Controller startet und beendet Instanzen und startet sie nach einem Absturz neu. Ein Adapter muss sich nicht selbst am Leben halten. |
| **Objektdatenbank** | Alle Beschreibungen: Geräte, Kanäle, Datenpunkte, Instanzen, Benutzer. Selten geändert, oft gelesen. |
| **Zustandsdatenbank** | Die Werte mit Zeitstempel und `ack`-Kennzeichen. Häufig geändert. |
| **Nachrichten** | Instanzen erreichen einander über den Controller, nicht direkt. |
| **Berechtigungen** | Jeder Zugriff läuft gegen die [Rechte](/docs/config/userrights.md) des jeweiligen Benutzers. |

Ein Adapter spricht nie direkt mit den Datenbanken. Er benutzt
`@iobroker/adapter-core`, und diese Bibliothek redet mit dem Controller. Dadurch
ist es dem Adapter gleichgültig, ob die Daten in den eingebauten Dateidatenbanken
oder in [Redis](/docs/config/redis.md)
liegen, und ob der Controller auf demselben Rechner läuft oder in einem
[Multihost-Verbund](/docs/config/multihost.md).

## Objekt und Zustand sind zwei Dinge

Das ist der Punkt, an dem die meisten Missverständnisse anfangen. Ein
**Objekt** beschreibt, ein **Zustand** enthält den Wert. Beide haben dieselbe ID,
liegen aber in verschiedenen Datenbanken und haben verschiedene Lebensdauern.

Ein Objekt wird einmal beim Einrichten angelegt und danach selten angefasst. Ein
Zustand ändert sich womöglich im Sekundentakt. Wer bei jeder Wertänderung auch
das Objekt schreibt, erzeugt unnötige Last.

Der Aufbau eines Objekts steht unter
[Objektschema](/docs/dev/objectsschema.md),
die vorgesehenen Rollen unter
[Zustandsrollen](/docs/dev/stateroles.md).

## Das ack-Kennzeichen

Jeder Zustand trägt neben dem Wert ein `ack`. Es unterscheidet zwei völlig
verschiedene Dinge:

* `ack: false` ist ein **Wunsch**. Jemand möchte, dass etwas geschaltet wird. Ein
  Adapter beobachtet solche Zustände und setzt den Wunsch um.
* `ack: true` ist eine **Tatsache**. Der Adapter hat vom Gerät erfahren, dass es
  so ist, und schreibt den Wert zurück.

Wer beides vermischt, baut Rückkopplungen: der Adapter meldet einen Wert, hält
ihn selbst für einen Befehl und schaltet erneut.

## Lebenslauf einer Instanz

Der Controller startet den Prozess, übergibt ihm die Konfiguration und erwartet,
dass er sich meldet. Beim Beenden bekommt der Adapter die Gelegenheit
aufzuräumen, und das ist keine Höflichkeitsgeste: nicht abgeräumte Zeitgeber und
offene Verbindungen sind die häufigste Ursache dafür, dass eine Instanz sich
nicht sauber neu starten lässt und Speicher verbraucht, bis das System steht.

## Aktualisieren

Der js-controller wird **nicht** über den Reiter Adapter aktualisiert, sondern
über den Reiter
[Hosts](/docs/admin/hosts.md) oder auf der
Kommandozeile:

```bash
iobroker upgrade self
```

!> Vor einem Wechsel der Controller-Version ein
[Backup](/docs/config/backup.md) anlegen.
Ein Adapter, der eine Mindestversion des Controllers voraussetzt, trägt das in
seiner `io-package.json` ein; siehe
[Adapter veröffentlichen](/docs/dev/adapterpublish.md).
