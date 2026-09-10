---
title:       "JavaScript"
lastChanged: "10.09.2026"
---

# JavaScript

Der
[javascript-Adapter](/adapters/javascript)
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
[Skript-Dokumentation des Adapters](/adapters/javascript).
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

## Der KI-Assistent im Editor

Seit Fassung 10 des javascript-Adapters sitzt im Skripteditor ein Chatfenster,
das beim Schreiben hilft. Es kann Code vorschlagen, vorhandenen Code erklären,
umbauen, kommentieren, Fehler beheben und Tests erzeugen; dazu kommen
Vorschläge während des Tippens und eine Ansicht, die die Änderung neben dem
bisherigen Stand zeigt, bevor man sie übernimmt. Für Blockly schlägt derselbe
Assistent Bausteine vor, siehe [Blockly](/docs/logic/blockly.md).

### Was er dafür braucht

!> **Das Sprachmodell kommt nicht von ioBroker.** Der Adapter bringt die
   Bedienung mit, den Zugang zu einem Modell bringt jeder selbst mit: ein Konto
   bei einem der unterstützten Anbieter oder ein Modell im eigenen Netz. Was
   dieser Zugang voraussetzt, legt der jeweilige Anbieter fest. Solange kein
   Schlüssel eingetragen ist, bleibt die Funktion aus, und alles andere am
   Adapter arbeitet wie bisher.

Unterstützt werden OpenAI, Anthropic Claude, Google Gemini und DeepSeek. Dazu
kommt ein Feld für einen eigenen, OpenAI-kompatiblen Endpunkt: darüber lässt
sich ein Modell ansprechen, das im eigenen Netz läuft, oder ein anderer Dienst,
der dieselbe Schnittstelle spricht. Der Schlüssel wird in den
Instanzeinstellungen hinterlegt oder aus der zentralen Zugangsdatenverwaltung
geholt. Welche Modelle zur Auswahl stehen, holt der Adapter beim Anbieter ab.

### Was dabei nach draußen geht

Der Assistent arbeitet nicht nur mit dem, was im Editor steht. Er darf
Datenpunkte suchen, deren Werte und Objekte lesen, vorhandene Skripte
auflisten und öffnen, den Editorinhalt und die Auswahl lesen und Code zur Probe
ausführen. Was er dabei liest, geht zusammen mit der Frage an den Anbieter des
Modells, also aus dem Haus heraus. Wer das nicht möchte, benutzt entweder ein
Modell im eigenen Netz über den eigenen Endpunkt oder trägt gar keinen
Schlüssel ein.

?> Ein Vorschlag ist ein Vorschlag. Er gehört gelesen und ausprobiert, bevor er
   auf die Heizung, das Garagentor oder die Bewässerung losgelassen wird. Das
   gilt für erzeugten Code genauso wie für einen Umbau, den der Assistent an
   einem laufenden Skript vorschlägt.

## Weiter

* [TypeScript](/docs/logic/typescript.md) -
  dieselbe API mit Typprüfung
* [Bewährte Vorgehensweisen](/docs/logic/examples.md)
* [Fehlersuche](/docs/logic/help.md)
