---
title:       "ioBroker"
lastChanged: "07.09.2026"
---

# js-controller aktualisieren

Der js-controller ist der Kern von ioBroker: Er hält die Datenbanken, startet
die Adapter und überwacht sie. Er wird selten aktualisiert - wenige Male im
Jahr -, und weil alles darauf aufsetzt, gehört dieser Schritt vorbereitet.

## Vorher

1. **Sichern.** `iob stop`, `iob backup`, `iob start`. Auf einer Virtualisierung
   zusätzlich ein Schnappschuss.
2. **Adapter zuerst aktualisieren.** Ein neuer js-controller setzt mitunter
   neuere Adapter voraus. Siehe
   [Adapter updaten](/docs/install/updateadapter.md).
3. **Die Änderungen lesen.** Bei einem Sprung der Hauptversion stehen dort die
   Punkte, die Arbeit machen können - eine geforderte Node.js-Version, eine
   abgeschaffte Einstellung.
4. **Zeit einplanen.** Nicht kurz vor dem Weggehen.

## Aktualisieren

Im Admin erscheint ein Hinweis, sobald eine neuere Version im Repository steht;
dort lässt sich das Update auch anstoßen. Auf der Konsole:

```bash
iob update          # zeigt, welche Version das Repository führt
iob upgrade self    # aktualisiert den js-controller
```

Der Befehl hält ioBroker während des Updates selbst an und startet ihn danach
wieder.

?> `iob upgrade self` folgt dem eingestellten Repository. Führt dieses eine
   **niedrigere** Version, wird auch heruntergestuft - das ist der Weg zurück,
   wenn eine Version Ärger macht, und zugleich der Grund, das Repository vorher
   zu prüfen.

## Danach

* Läuft alles wieder? Unter *Instanzen* dürfen keine roten Einträge stehen.
* Das Protokoll der ersten Minuten lesen. Meldungen über veraltete Aufrufe
  betreffen meist einen einzelnen Adapter, der nachziehen muss.
* `iob diag` fasst den Zustand zusammen und ist die Grundlage jeder Frage im
  [Forum](https://forum.iobroker.net).

## Wenn es schiefgeht

Zuerst
[ioBroker läuft nicht mehr](/docs/trouble/RunsNoMore.md) -
dort stehen die häufigen Ursachen der Reihe nach. Hilft das nicht, ist die
Sicherung von vorhin der schnellste Weg:

```bash
iob restore <datei>
```

## Weiterlesen

* [Updates durchführen](/docs/install/update.md)
* [Node.js & npm aktualisieren](/docs/install/updatenode.md)
* [Konsolenbefehle](/docs/config/cli.md)
