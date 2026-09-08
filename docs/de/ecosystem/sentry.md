---
title:       "Absturzmeldungen"
lastChanged: "08.09.2026"
---

# Absturzmeldungen

Wenn ein Adapter abstürzt, steht im Log eine Fehlermeldung. Der Entwickler
sieht sie nur, wenn jemand sie meldet. Genau das ist die Lücke, die
Absturzmeldungen schließen: ein abgestürzter Adapter schickt den Fehler
automatisch an seinen Entwickler, ohne dass jemand ein Issue schreiben muss.

Dahinter steht **Sentry**, ein verbreiteter Dienst zum Sammeln von
Programmfehlern. ioBroker verwendet dafür ein eigenes Plugin, das ein Adapter
einbauen kann. Nicht jeder Adapter tut das.

## Was übertragen wird

Eine Absturzmeldung enthält den Fehler selbst: die Meldung, die Stelle im
Programmcode, die Aufrufkette dorthin, die Version des Adapters und die
Umgebung, in der er lief. Dazu kommt die anonyme Installations-ID, damit der
Entwickler erkennt, ob hundert Meldungen von hundert Systemen stammen oder
hundertmal vom selben.

Nicht übertragen werden Name, E-Mail-Adresse oder IP-Adresse. Die Meldungen
werden nach spätestens 90 Tagen gelöscht.

Was ein Absturz *nicht* mitschickt, sind Ihre Daten: keine Objektwerte, keine
Zugangsdaten, keine Adapterkonfiguration. Übertragen wird der Programmfehler,
nicht der Zustand Ihrer Anlage.

## Welche Adapter das können

In der Adapterliste tragen Adapter, die Abstürze melden, ein eigenes Symbol:
die **grünen Berge**. Auf der Kachel eines Adapters lässt sich damit auf einen
Blick sehen, ob der Entwickler von einem Absturz überhaupt erfährt.

Dasselbe steht in der Instanzliste in der Spaltenübersicht: dort zeigt ein
Symbol pro Instanz, ob diese Instanz Abstürze meldet.

## Abschalten

Es gibt drei Ebenen, und sie greifen unabhängig voneinander.

**Für die ganze Installation** über Systemeinstellungen, Reiter *Statistik*.
Steht dort **keins**, werden nach dem Hinweistext des Dialogs weder
Nutzungsstatistiken noch Absturzmeldungen übertragen. Das ist der Schalter für
alle, die grundsätzlich nichts senden wollen. Wie der Reiter im Einzelnen
aussieht, steht unter [Nutzungsstatistik](/docs/ecosystem/statistics.md).

**Für einen einzelnen Host** oder eine einzelne Instanz über die Kommandozeile:

```bash
iobroker plugin disable sentry
iobroker plugin disable sentry --instance adaptername.0
```

Der erste Befehl gilt für den Host, auf dem er ausgeführt wird, der zweite nur
für die genannte Instanz. Mit `enable` statt `disable` wird es wieder
eingeschaltet.

**Im Objektbaum**, wenn Sie ohnehin dort unterwegs sind. Der Schalter liegt in
`system.host.NAME.plugins.sentry.enabled` für einen Host und in
`system.adapter.NAME.INSTANCE.plugins.sentry.enabled` für eine Instanz. Das ist
dieselbe Einstellung, die die Kommandozeile setzt, nur von Hand.

## Für Entwickler

Ein Adapter bekommt Absturzmeldungen über
[plugin-sentry](https://github.com/ioBroker/plugin-sentry). Eingetragen wird
das in der `io-package.json` unter `common.plugins.sentry`, mit der `dsn` des
eigenen Sentry-Projekts als Pflichtangabe. Optional lassen sich Pfade und
Fehlerarten ein- oder ausschließen, damit nicht jede belanglose Ausnahme im
Postfach landet.

Wer die Meldung für eine Instanz grundsätzlich unterbinden will, setzt
`common.disableDataReporting` im Instanzobjekt. Die Felder sind unter
[Objekt-Schema](/docs/dev/objectsschema.md) beschrieben.
