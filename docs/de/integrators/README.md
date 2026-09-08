---
title:       "Einleitung"
lastChanged: "08.09.2026"
---

# System-Integratoren

Wer ioBroker beruflich einsetzt und Anlagen für Kunden baut, hat andere Fragen
als jemand, der das eigene Haus automatisiert. Nicht andere Technik, aber andere
Randbedingungen: mehrere Anlagen statt einer, fremde Netze, Gewährleistung, und
Menschen, die nicht ins Forum schreiben, wenn etwas klemmt, sondern anrufen.

Dieses Kapitel sammelt, was dafür zusätzlich zu bedenken ist. Die Technik selbst
steht in den übrigen Kapiteln.

## Was sich in der Praxis bewährt

**Jede Anlage gleich aufbauen.** Dieselbe Betriebssystemversion, dieselbe
Node.js-Version, dieselbe Adapterauswahl, dieselben Namen für Räume und
Funktionen. Eine Anlage, die aussieht wie alle anderen, lässt sich am Telefon
unterstützen. Die
[Kategorien](/docs/basics/enums.md) sind
dabei wichtiger, als sie aussehen: Visualisierung und Sprachsteuerung bauen
darauf auf.

**Sicherung vor Übergabe.** Eine eingerichtete
[Datensicherung](/docs/config/backup.md)
mit einem Ziel außerhalb der Anlage gehört zur Abnahme, nicht auf die Liste der
guten Vorsätze. Sie ist der Unterschied zwischen einem halben Tag Arbeit und
einer Woche.

**Getrennte Zugänge.** Der Kunde bekommt einen eigenen Benutzer mit den Rechten,
die er braucht, nicht das Administratorkonto. Wie das eingerichtet wird, steht
unter
[Zugriffsverwaltung](/docs/config/userrights.md)
und
[Authentifizierung](/docs/config/login.md).

**Kein offener Port.** Für den Zugriff von außen ist der Weg über den
[iot-Adapter](/docs/cloud/iot.md) oder eine
VPN-Lösung vorgesehen. Eine Portweiterleitung auf die Anlage eines Kunden ist
ein Haftungsrisiko.

**Versionen einfrieren.** In der Anlage eines Kunden gehört das Repository auf
*stable*, nicht auf *beta*, und schon gar nicht ein Adapter aus GitHub. Siehe
[Repositories](/docs/basics/repositories.md).

## Größere Anlagen

Wenn eine Anlage die Grenzen eines Rechners erreicht, gibt es zwei Stellschrauben:

* [Redis](/docs/config/redis.md) für die
  Zustandsdatenbank, wenn sich sehr viele Werte sehr häufig ändern.
* [Multihost](/docs/config/multihost.md),
  um Aufgaben auf mehrere Rechner zu verteilen, etwa wenn ein Gerät an einem
  bestimmten Ort angeschlossen sein muss.

!> Multihost verteilt Last, es macht die Anlage aber **nicht** ausfallsicher.
Fällt der Rechner mit den Datenbanken aus, steht alles.

## Lizenz und Gewährleistung

ioBroker ist quelloffen und kostenfrei nutzbar. Für den gewerblichen Einsatz
gibt es allerdings eine Einschränkung, die vor dem ersten Kundenprojekt geklärt
sein sollte: **vis-2 braucht dafür eine kostenpflichtige Lizenz**. Das gilt für
den Einsatz in Kundenprojekten, für die Nutzung im Rahmen von Dienstleistungen
und für den Betrieb durch Unternehmen, Behörden oder andere Institutionen.
Einzelheiten unter [Adapterlizenzen](/docs/licenses/adapter.md).

Für Fragen zu Haftung und Gewährleistung ist dieses Handbuch nicht die richtige
Quelle.

## Fernzugriff auf Kundenanlagen

Für den Zugriff auf mehrere Anlagen gibt es neben dem iot-Adapter die
VPN-Lösung [Link-Box](/docs/integrators/linkbox.md).
