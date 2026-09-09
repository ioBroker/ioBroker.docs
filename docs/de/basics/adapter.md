---
title:       "Controller und Adapter"
lastChanged: "08.09.2026"
---

# Controller und Adapter

ioBroker besteht aus zwei Sorten von Programmen: dem **js-controller** und den
**Adaptern**. Der Controller hält das System zusammen, die Adapter bringen die
eigentlichen Funktionen mit.

## Der js-controller

Der js-controller ist der Kern jeder Installation. Auf jedem Host läuft genau
einer. Er ist in TypeScript geschrieben und übernimmt vier Aufgaben:

| Aufgabe | Was dahinter steckt |
| --- | --- |
| Instanzen verwalten | Er startet und beendet die Instanzen und startet sie bei Bedarf neu. |
| Daten halten | Er verwaltet die beiden Datenbanken, eine für die Objekte und eine für die Zustände. |
| Kommunikation | Alle Instanzen tauschen ihre Daten über ihn aus, nicht direkt untereinander. |
| Überwachung | Er meldet, wenn eine Instanz nicht mehr läuft, der Speicher knapp wird oder ein Update bereitliegt. |

?> Der js-controller wird nicht im Reiter **Adapter** aktualisiert, sondern über
den Reiter [Hosts](/docs/admin/hosts.md)
oder über die Kommandozeile. Einzelheiten stehen unter
[ioBroker updaten](/docs/install/updateself.md).

## Adapter

Ein Adapter bindet ein System an ioBroker an: ein Gerät, einen Dienst, ein
Protokoll oder auch nur eine Datenquelle im Internet. Nach außen spricht er die
Sprache des angebundenen Systems, nach innen legt er die Daten als Objekte und
Zustände ab. Damit ist er die Schnittstelle zwischen ioBroker und allem, was
nicht zu ioBroker gehört.

Was ein Adapter kann, hängt davon ab, wofür er geschrieben wurde. Typisch sind:

* **Daten holen.** Messwerte, Zustände und Meldungen des angebundenen Systems
  landen als Datenpunkte in ioBroker.
* **Steuern.** Geräte ein- und ausschalten, Werte setzen, Befehle absetzen.
* **Aufzeichnen.** Werte für die spätere Auswertung speichern, etwa `history`,
  `influxdb` oder `sql`.
* **Visualisieren.** Oberflächen bereitstellen, etwa `vis-2` oder `lovelace`.
* **Automatisieren.** Abläufe nach Bedingungen oder Zeitplänen auslösen, etwa
  `javascript` oder `scenes`.
* **Benachrichtigen.** Nachrichten versenden, etwa `telegram` oder `email`.
* **Betreuen.** Sicherungen anlegen, Firmware aktualisieren, das System
  überwachen.

Bekannte Beispiele sind der Zigbee-Adapter für Funkgeräte, der MQTT-Adapter für
alles, was dieses Protokoll spricht, und der JavaScript-Adapter für eigene
Skripte und Blockly.

### Vorteile

* **Flexibilität.** Fast jedes System lässt sich anbinden, unabhängig von seinem
  Protokoll.
* **Erweiterbarkeit.** Für neue Geräte kommen neue Adapter dazu, ohne dass sich
  am Rest der Installation etwas ändert.
* **Zentralisierung.** Alle angebundenen Systeme werden an einer Stelle
  verwaltet und lassen sich miteinander verknüpfen.

### Adapterkategorien

Jeder Adapter trägt eine Kategorie, nach der sich die Liste im Reiter
**Adapter** filtern lässt: `alarm`, `climate-control`, `energy`, `hardware`,
`lighting`, `logic`, `multimedia`, `weather` und weitere. Die vollständige Liste
mit Erläuterungen steht unter
[Adapter veröffentlichen](/docs/dev/adapterpublish.md).

## Instanzen

Ein installierter Adapter läuft noch nicht. Dazu wird eine **Instanz** angelegt,
und erst diese Instanz arbeitet. In ihr steht die Konfiguration, etwa die
Adresse des Gateways oder die Zugangsdaten.

Von einem Adapter kann es mehrere Instanzen geben. Das ist immer dann sinnvoll,
wenn dasselbe System mehrfach vorhanden ist oder wenn Aufgaben getrennt bleiben
sollen: `hm-rpc.0` für die Funkschnittstelle und `hm-rpc.1` für die verdrahtete,
zwei `telegram`-Instanzen für zwei Empfängerkreise.

Jede Instanz bekommt einen eigenen Namensraum im Objektbaum, der aus dem
Adapternamen und einer laufenden Nummer besteht, zum Beispiel `hm-rpc.0`.
Darunter legt die Instanz ihre Geräte, Kanäle und Datenpunkte an.

Angelegt und konfiguriert werden Instanzen im Reiter
[Instanzen](/docs/admin/instances.md).
Mehr zur Datenstruktur steht unter
[Objekte](/docs/basics/objects.md) und
[Zustände](/docs/basics/states.md).
