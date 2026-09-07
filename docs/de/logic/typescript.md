---
title:       "TypeScript"
lastChanged: "07.09.2026"
---

# TypeScript

TypeScript ist JavaScript mit Typen. Der
[javascript-Adapter](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/README.md)
übersetzt ein TypeScript-Skript beim Speichern nach JavaScript und führt das
Ergebnis aus. Für die Skript-API ändert sich nichts: `on`, `setState`,
`schedule` und alles andere heißen und arbeiten genauso wie in
[JavaScript](https://www.iobroker.net/#de/documentation/logic/javascript.md).

Der Unterschied liegt vor dem Start. Wo JavaScript einen Fehler erst dann meldet,
wenn die betroffene Zeile ausgeführt wird - unter Umständen erst Wochen später,
mitten in der Nacht -, weist TypeScript ihn beim Speichern ab.

## Anlegen

Beim Anlegen eines neuen Skripts wird als Typ *TypeScript* gewählt. Ein
bestehendes JavaScript-Skript lässt sich nicht umschalten; sein Inhalt kann aber
in ein neues TypeScript-Skript kopiert werden, denn gültiges JavaScript ist
zugleich gültiges TypeScript.

## Was es bringt

```ts
const id = 'hm-rpc.0.LEQ1234567.1.STATE';

on({ id, change: 'ne', ack: true }, obj => {
    // obj.state.val ist als ioBroker.StateValue bekannt
    const helligkeit: number = obj.state.val as number;
    setState('deconz.0.Lights.1.bri', helligkeit);
});
```

Der Editor kennt dabei die Typen der Skript-API und die der eingebundenen
Bibliotheken. Praktisch heißt das: Nach einem Punkt schlägt er vor, was es dort
wirklich gibt, ein vertippter Funktionsname wird sofort angestrichen, und
`getState(...)` liefert nicht irgendetwas, sondern einen Zustand mit `val`,
`ack` und `ts`.

## Einstellungen des Übersetzers

Die Instanzeinstellungen haben einen eigenen Reiter *TypeScript*, in dem die
Übersetzungsoptionen für alle Skripte dieser Instanz gesetzt werden.

?> Die strenge Prüfung (`strict`) ist für Skripte ausgeschaltet, obwohl
   TypeScript sie seit Version 6 von sich aus einschaltet. Das ist Absicht:
   Zustandswerte sind ihrer Natur nach ungewiss, und mit `strict` müsste jeder
   Zugriff auf `obj.state.val` abgesichert werden. Wer es strenger möchte, kann
   es in diesem Reiter einschalten.

## Wann es sich lohnt

TypeScript zahlt sich nicht bei jedem Dreizeiler aus. Es lohnt sich, wenn

* das Skript länger als etwa fünfzig Zeilen ist,
* es selten angefasst wird und man den Aufbau deshalb nicht mehr im Kopf hat,
* es mit Datenstrukturen arbeitet - Listen von Räumen, Zuordnungstabellen,
  Konfigurationen im Skriptkopf,
* eine externe Bibliothek eingebunden ist, deren Aufrufe man nicht auswendig
  kennt.

Für "wenn Bewegung, dann Licht" ist der Aufwand höher als der Nutzen. Dafür ist
[Blockly](https://www.iobroker.net/#de/documentation/logic/blockly.md) oder eine
Regel der bessere Weg.

## Zu beachten

* Ein Übersetzungsfehler verhindert den Start des Skripts. Die Meldung steht im
  Protokollfenster unter dem Editor und nennt Zeile und Spalte.
* Die Zeilennummern in Laufzeitfehlern beziehen sich auf den übersetzten Code
  und können vom Editor abweichen.
* Werte aus Zuständen sind für TypeScript zunächst unbestimmt. `as number` oder
  eine Prüfung im Code sind der übliche Weg - und die Prüfung ist ohnehin die
  bessere Antwort, denn ein Adapter kann durchaus `null` liefern.
