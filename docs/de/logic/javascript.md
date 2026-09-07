---
title:       "JavaScript"
lastChanged: "07.09.2026"
---

# JavaScript

Der
[javascript-Adapter](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/README.md)
führt gewöhnliches JavaScript aus und stellt darin eine Reihe zusätzlicher
Funktionen bereit, mit denen sich Zustände lesen, schreiben und beobachten
lassen. Diese Funktionen sind die ioBroker-Skript-API; sie sind der einzige
Unterschied zu JavaScript, wie es sonst in Node.js läuft.

## Ein erstes Skript

```js
on({ id: 'hm-rpc.0.LEQ1234567.1.STATE', change: 'ne', ack: true }, obj => {
    if (obj.state.val) {
        setState('hm-rpc.0.LEQ7654321.1.STATE', true);
    }
});
```

Übersetzt: Sobald der Bewegungsmelder eine *Änderung* meldet (`change: 'ne'`,
also *not equal*) und es sich um eine Rückmeldung des Geräts handelt
(`ack: true`), wird die Lampe eingeschaltet.

## Die wichtigsten Funktionen

Die vollständige Referenz mit allen Parametern steht in der
[Skript-Dokumentation des Adapters](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/javascript.md).
Für den Anfang reicht eine Handvoll.

**Auf Änderungen reagieren**

| Funktion | Wofür |
|---|---|
| `on(muster, callback)` | Auf Änderungen eines oder mehrerer Zustände reagieren |
| `once(muster, callback)` | Dasselbe, aber nur beim ersten Mal |
| `unsubscribe(handler)` | Ein Abonnement wieder lösen |
| `$('...')` | Mehrere Zustände über einen Selektor auf einmal ansprechen |

**Zustände lesen und schreiben**

| Funktion | Wofür |
|---|---|
| `getState(id)` | Den aktuellen Wert holen |
| `setState(id, wert, ack)` | Einen Wert setzen |
| `setStateChanged(id, wert)` | Nur schreiben, wenn sich der Wert unterscheidet |
| `setStateDelayed(id, wert, ms)` | Nach einer Wartezeit setzen, ohne das Skript anzuhalten |
| `existsState(id)` | Prüfen, ob es den Zustand überhaupt gibt |
| `createState(name, wert)` | Einen eigenen Zustand unterhalb der Instanz anlegen |

**Zeit**

| Funktion | Wofür |
|---|---|
| `schedule(muster, callback)` | Wiederkehrend zu einer Zeit ausführen, auch als CRON |
| `getAstroDate(name)` | Sonnenaufgang, Sonnenuntergang, Dämmerung und Ähnliches |
| `setTimeout` / `setInterval` | Wie in jedem JavaScript |

**Mit anderen Adaptern sprechen**

`sendTo('telegram.0', 'send', { text: 'Fenster offen' })` schickt eine Nachricht
an eine Adapterinstanz. Welche Befehle eine Instanz versteht, steht in der
Dokumentation des jeweiligen Adapters.

!> `schedule` und `setInterval` überleben einen Neustart des Skripts nicht, aber
   sie überleben auch nicht das stille Vergessen: Wer im Skript einen Intervall
   anlegt und das Skript später ändert, sammelt sonst Intervalle an. Der Adapter
   räumt beim Neustart eines Skripts dessen eigene Zeitpläne selbst auf.

## Wie ein Skript ausgeführt wird

Jedes Skript ist ein eigener Bereich. Zwei Skripte teilen sich **keine**
Variablen - auch nicht innerhalb derselben Instanz. Wer Werte weitergeben will,
legt dafür einen Zustand an.

Skripte im Ordner **global** sind die Ausnahme: Ihr Inhalt wird jedem anderen
Skript vorangestellt. Damit lassen sich eigene Funktionen an einer Stelle
pflegen und überall verwenden. Auch hier gilt aber: Jede Ausführung bekommt
ihre eigene Kopie der Variablen. Ein globales Skript ist eine gemeinsame
Funktionssammlung, kein gemeinsamer Speicher.

Für jedes Skript legt der Adapter einen Zustand
`javascript.<Instanz>.scriptEnabled.<Skriptname>` an. Er zeigt an, ob das Skript
läuft, und lässt sich auch setzen - ein Skript kann also ein anderes ein- und
ausschalten.

## Zusätzliche Module

In den Instanzeinstellungen lassen sich npm-Module eintragen, die dann in allen
Skripten dieser Instanz mit `require` zur Verfügung stehen. Für alles, was
Node.js mitbringt - etwa `fs` oder `http` - ist kein Eintrag nötig.

## Protokollieren

`console.log`, `console.warn` und `console.error` schreiben in das Protokoll
unter dem Editor und zugleich in das ioBroker-Log. Das Protokollfenster zeigt
nur die Meldungen des gerade geöffneten Skripts.

?> Meldungen auf `debug` erscheinen nur, wenn das Protokollniveau der Instanz
   entsprechend gesetzt ist. Für dauerhaft laufende Skripte ist das die richtige
   Ebene - `info` für jede Bewegungsmeldung füllt das Log.

## Weiter

* [TypeScript](https://www.iobroker.net/#de/documentation/logic/typescript.md) -
  dieselbe API mit Typprüfung
* [Bewährte Vorgehensweisen](https://www.iobroker.net/#de/documentation/logic/examples.md)
* [Fehlersuche](https://www.iobroker.net/#de/documentation/logic/help.md)
