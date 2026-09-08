---
title:       "Kategorien und Aufzählungen"
lastChanged: "08.09.2026"
---

# Kategorien und Aufzählungen

Kategorien fassen Geräte und Datenpunkte zu Gruppen zusammen: nach Raum, nach
Funktion oder nach einem selbst gewählten Kriterium. Im Objektbaum heißen sie
`enum`, in älteren Texten und in der Adapter-Dokumentation stehen dafür auch die
Begriffe *Aufzählungen* und *Enums*.

Der Nutzen liegt darin, dass Skripte, Visualisierungen und die Sprachsteuerung
mit der Gruppe arbeiten statt mit einzelnen Datenpunkten. Wird ein Gerät
getauscht oder kommt eines dazu, ändert sich nur die Zuordnung. Das Skript und
die Visualisierung bleiben, wie sie sind.

Angelegt und gepflegt werden Kategorien im Reiter
[Kategorien](https://www.iobroker.net/#de/documentation/admin/enums.md) des
Admin.

## Die drei Arten

| Objekt | Bedeutung | Beispiele |
| --- | --- | --- |
| `enum.rooms` | Räume | Wohnzimmer, Küche, Schlafzimmer |
| `enum.functions` | Funktionen, früher Gewerke | Licht, Heizung, Fenster, Sicherheit |
| `enum.<eigener Name>` | Selbst angelegte Gruppen | `enum.custom.batterie`, `enum.custom.heimkino` |

Räume und Funktionen sind vorgegeben, weil viele Adapter sie auswerten. Eigene
Kategorien sind frei benennbar und für alles gedacht, was sich weder als Raum
noch als Funktion beschreiben lässt.

?> Zuordnen lassen sich Geräte, Kanäle und Datenpunkte. Für die Sprachsteuerung
und für die meisten auswertenden Adapter muss die Zuordnung am **Datenpunkt**
hängen. Sonst ist nicht klar, welcher Wert gelesen oder geschaltet werden soll.

## Wozu das gut ist

* **Wartungsfreundlich.** Ein getauschtes Gerät bekommt dieselbe Zuordnung, alles
  andere bleibt unverändert.
* **Skalierbar.** Neue Geräte fügen sich ein, ohne dass Skripte angefasst werden.
* **Übersichtlich.** Auch bei mehreren hundert Datenpunkten bleibt eine klare
  Struktur erhalten.
* **Herstellerunabhängig.** Die Gruppe beschreibt, was ein Datenpunkt tut, nicht
  von wem er stammt.

## Kategorien anlegen und zuordnen

Drei Wege führen zum selben Ergebnis:

1. Im Reiter **Kategorien** eine Kategorie anlegen und die Mitglieder auswählen.
2. Im Reiter **Objekte** in den Spalten **Räume** und **Funktionen** direkt am
   Datenpunkt zuordnen.
3. Per Skript, wenn viele Zuordnungen auf einmal entstehen sollen.

## Verwendung in Skripten

Der JavaScript-Adapter wählt Objekte über einen Selektor aus. Kategorien stehen
darin in **runden** Klammern, alles andere in eckigen:

```js
"name[commonAttr=wert](enumName=wert){nativeName=wert}[id=filter][state.id=filter]"
```

Beispiele:

```js
// Alle Lichter im Wohnzimmer ausschalten
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(false);

// Alle Fensterkontakte protokollieren
$('channel[state.id=*.STATE](functions=Fenster)').each((id) => log(id));

// Alle Datenpunkte der eigenen Kategorie "enum.custom.batterie" überwachen
$('state(custom=batterie)').on(obj => {
    if (obj.state.val < 20) {
        sendTo('telegram', 'Batterie schwach: ' + obj.id);
    }
});
```

Der Name in der runden Klammer ist die erste Ebene unterhalb von `enum`, der
Wert dahinter die Kategorie selbst. `enum.custom.batterie` wird also zu
`(custom=batterie)`. Die vollständige Beschreibung des Selektors steht in der
Dokumentation des
[JavaScript-Adapters](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/README.md).

?> Kommt ein Gerät hinzu, genügt die Zuordnung zur Kategorie. Am Skript ist
nichts zu ändern.

## Verwendung in der Visualisierung

Visualisierungsadapter wie iQontrol oder die Material-Widgets von vis lesen
`enum.rooms` und `enum.functions` aus und bauen daraus ihre Ansichten. Räume
werden zu Seiten, Funktionen zu Gruppen darauf. Ein neu zugeordneter Datenpunkt
erscheint dadurch von selbst an der richtigen Stelle.

## Verwendung in der Sprachsteuerung

Alexa und Google Home bekommen über die Cloud-Adapter Raum und Funktion
mitgeliefert. Erst dadurch versteht „Schalte das Licht im Wohnzimmer ein“, welche
Datenpunkte gemeint sind. Ohne Zuordnung bleibt nur der einzelne Gerätename.

## Empfehlungen

* Räume und Funktionen konsequent pflegen, auch wenn zunächst nur ein Skript sie
  braucht. Später greifen weitere Adapter darauf zu.
* Sprechende Namen vergeben. Die Namen tauchen in der Sprachsteuerung und in der
  Visualisierung wieder auf.
* Eigene Kategorien nur dort anlegen, wo Raum und Funktion nicht ausreichen.
* Die Struktur kurz dokumentieren, wenn mehrere Personen am System arbeiten.
