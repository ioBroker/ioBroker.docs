---
title:       "Kategorien"
lastChanged: "16.09.2026"
---

# Reiter Kategorien

Kategorien ordnen Datenpunkte nach **Räumen** und **Funktionen**. Ein Datenpunkt
kann in beiden stehen: das Deckenlicht im Wohnzimmer gehört zum Raum
*Wohnzimmer* und zur Funktion *Licht*.

?> Dieser Reiter hieß früher **Aufzählungen**. Intern heißen die Objekte
weiterhin `enum.rooms.*` und `enum.functions.*`.

Der Nutzen liegt bei allem, was darauf aufbaut: Visualisierungen, Sprachsteuerung
über Alexa oder Google Home und Skripte greifen darüber auf Gruppen von Geräten
zu. „Schalte das Licht im Wohnzimmer aus" funktioniert nur, wenn Raum und
Funktion gepflegt sind.

Oben im Reiter stehen drei Bereiche:

| Bereich | Wofür |
|---|---|
| **Kategorien** | Räume und Funktionen anlegen, umbenennen und ihre Mitglieder pflegen |
| **Zuordnung** | eine Tabelle aller erkannten Geräte, um Lücken zu schließen |
| **Assistent** | die Ersteinrichtung in fünf Schritten |

## Kategorien

### Funktionen

<img src="media/admin_kategorien_funktionen.webp" alt="Der Bereich Kategorien mit den Funktionen" width="900" />

Links steht die Liste der Kategorien, die Zahl dahinter nennt die Zahl der
Mitglieder. Rechts stehen die Mitglieder der gewählten Kategorie: oben das Gerät
oder der Kanal, darunter eingerückt die Datenpunkte. Am rechten Rand jeder Zeile
zeigen kleine Schilder, in welchen anderen Kategorien der Eintrag noch steht, das
**X** entfernt ihn aus der aktuellen.

Über der Liste sitzen ein **Filter** und ein **+**, das eine neue Kategorie
anlegt. Über den Mitgliedern stehen der interne Name der Kategorie, etwa
`enum.functions.Aktor`, und die Schaltflächen:

| Schaltfläche | Wirkung |
|---|---|
| **Objekte hinzufügen** | öffnet die Auswahl und nimmt mehrere Datenpunkte auf einmal auf |
| **+** | legt eine untergeordnete Kategorie an |
| Stift | ändert Name, Symbol und Farbe |
| Blätter | dupliziert die Kategorie |
| Papierkorb | löscht sie, die Datenpunkte selbst bleiben |

### Räume

<img src="media/admin_kategorien_raeume.webp" alt="Der Bereich Kategorien mit den Raeumen" width="900" />

Die Räume funktionieren genauso. Der farbige Balken links am Eintrag ist die
Farbe der Kategorie, sie macht lange Listen übersichtlich.

Räume dürfen verschachtelt werden: *Erdgeschoss* kann *Wohnzimmer* und *Küche*
enthalten. Die eingerückten Einträge in der Liste zeigen diese Ebenen.

### Die Objektliste

<img src="media/admin_kategorien_objektliste.webp" alt="Die ausgeklappte Objektliste neben den Kategorien" width="900" />

Am rechten Rand liegt die **Objektliste** als Schublade. Ein Klick auf den
senkrechten Schriftzug klappt sie auf und zeigt den Objektbaum. Von dort lässt
sich ein Eintrag auf eine Kategorie ziehen. Wer viele Datenpunkte auf einmal
zuordnen will, ist mit **Objekte hinzufügen** schneller.

## Zuordnung

<img src="media/admin_kategorien_zuordnung.webp" alt="Der Bereich Zuordnung mit der Tabelle aller Geraete" width="900" />

Dieser Bereich dreht die Sache um: Statt von der Kategorie auszugehen, listet er
alle Geräte und Kanäle auf und zeigt in zwei Spalten, welcher Raum und welche
Funktion daran hängen. Über **+** kommt eine Zuordnung dazu, über das **X** an
einem Schild geht sie weg.

Oben stehen die Werkzeuge, um die Lücken zu finden:

* ein **Filter** für den Namen
* eine Auswahl der **Instanz**, etwa nur `alias.0`
* die Schalter **Alle**, **Ohne Raum** und **Ohne Funktion**, jeweils mit Anzahl
* **Nur erkannte Geräte**, das die Liste auf das beschränkt, was ioBroker als
  Gerät erkannt hat

Der Weg über **Ohne Raum** und **Ohne Funktion** ist der schnellste Weg zu einer
vollständig gepflegten Anlage: die Liste wird abgearbeitet, bis die Zahl auf null
steht.

## Assistent

<img src="media/admin_kategorien_assistent.webp" alt="Der Assistent, Schritt Raeume" width="900" />

Der Assistent richtet Räume und Funktionen in fünf Schritten ein: **Etagen**,
**Räume**, **Funktionen**, **Geräte zuordnen**, **Übersicht**. In den Schritten
Räume und Funktionen stehen fertige Vorschläge als Kacheln bereit, angehakt und
mit *Bereits vorhanden* beschriftet sind die, die es schon gibt. Was fehlt, wird
angeklickt, eigene Namen kommen über **Benutzerdefiniert** dazu.

?> Vorhandene Räume und Funktionen bleiben unverändert, der Assistent legt nur an
und ordnet zu. Er eignet sich deshalb auch für eine Anlage, die schon läuft.

?> Zuordnen lässt sich ein Datenpunkt auch direkt im Reiter
[Objekte](/docs/admin/objects.md) über die
Spalten *Raum* und *Funktion*. Alle Wege ändern dieselben Objekte.

!> Zuordnungen gehören an den **Datenpunkt**, nicht an den Kanal oder das Gerät,
sonst wissen die auswertenden Adapter nicht, welchen Wert sie schalten sollen.
