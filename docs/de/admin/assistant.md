---
title:       "KI-Assistent"
lastChanged: "10.09.2026"
---

# Der KI-Assistent im Admin

Seit Admin 8 sitzt unten rechts eine schwebende Schaltfläche, hinter der ein
Assistent steckt. Er beantwortet Fragen zur eigenen Anlage, schlägt Adapter für
ein Gerät oder einen Dienst vor und kann auf Wunsch auch Änderungen vornehmen.

!> **Das Sprachmodell kommt nicht von ioBroker.** Der Admin bringt die Bedienung
   mit, den Zugang zu einem Modell bringt jeder selbst mit: ein Konto bei einem
   Anbieter oder ein Modell im eigenen Netz. Was dieser Zugang voraussetzt, legt
   der jeweilige Anbieter fest. Ab Werk ist der Assistent **aus**.

## Einschalten

Der Assistent hängt am MCP-Zugang des Admin, und der ist ab Werk abgeschaltet.
Zwei Schritte sind nötig:

1. In den **Instanzeinstellungen des Admin** das Häkchen bei *Assistenten in der
   Benutzeroberfläche deaktivieren* entfernen.
2. Die Schaltfläche unten rechts öffnen und unter *Einstellungen des
   KI-Assistenten* **Anbieter**, **Zugangsdaten** und **Modell** wählen. Über
   *Modelle laden* holt der Admin die Liste beim Anbieter; er meldet
   „Verbindung OK" mit der Anzahl der gefundenen Modelle.

Solange das nicht eingerichtet ist, antwortet der Assistent mit dem Hinweis,
zuerst Anbieter, Zugangsdaten und Modell zu konfigurieren.

?> Wer die Schaltfläche nicht sehen will, ohne den Zugang abzuschalten, blendet
   sie über *Assistent-Schaltfläche ausblenden* aus.

## Nur lesen oder handeln

Der Assistent kennt zwei Betriebsarten. In **Nur lesen** schaut er sich das
System an und antwortet. In der Betriebsart mit Aktionen darf er auch etwas tun,
etwa einen Adapter installieren oder eine Einstellung ändern. Er führt das nicht
still aus: er zeigt vorher an, welche Aktionen er ausführen möchte, und wartet
auf die Bestätigung.

## Ohne eigenen Schlüssel: ein externer Klient

Wer keinen Anbieter im ioBroker eintragen möchte, kann den Assistenten von außen
steuern. Der Admin bringt dafür einen eingebauten MCP-Server mit; MCP ist die
Schnittstelle, über die ein KI-Klient die Werkzeuge einer Anwendung benutzt.

Im Dialog *Ohne API-Schlüssel verwenden (externer MCP-Client)* stehen die drei
Schritte:

1. **MCP-Server bereitstellen.** Der Admin hat einen eingebauten, für ihn ist
   nichts zu installieren. Alternativ gibt es den Adapter `iobroker.mcp`, am
   besten als Web-Erweiterung einer web-Instanz.
2. **Den Server im eigenen Klienten eintragen**, etwa in Claude Desktop, Codex
   oder Gemini CLI. Die Adresse zeigt der Dialog an, in der Form
   `http(s)://<host>:<port>/mcp`; sie lässt sich dort kopieren.
3. **Den System-Prompt übernehmen.** Derselbe Dialog zeigt den Text, mit dem der
   eingebaute Assistent arbeitet. Wer ihn in seinem Klienten als Anweisung
   einsetzt, bekommt dasselbe Verhalten.

## Was dabei nach draußen geht

Der Assistent arbeitet mit dem, was in der Anlage steht: Objekte, Zustände und
Protokolle werden dem gewählten Anbieter zur Verarbeitung übergeben. Das steht
so auch im Dialog. Wer das nicht möchte, betreibt ein Modell im eigenen Netz
oder lässt den Assistenten aus.

## Weiter

* [Systemeinstellungen](/docs/admin/settings.md)
* [Adapter](/docs/admin/adapter.md)
