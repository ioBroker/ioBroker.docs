---
title:       "Aufbau der Dokumentation"
lastChanged: "16.09.2026"
---

# Aufbau der Dokumentation

Diese Dokumentation ist die zentrale Anlaufstelle für alle ioBroker-Anwender.
Diese Seite erklärt, wie man sich darin zurechtfindet.

?> Die Website ist **responsiv** gestaltet: Je nach Bildschirmbreite werden
Bedienelemente zusammengefasst oder ausgeblendet, um Platz für den Text zu
schaffen. Auf einem Telefon sieht die Seite deshalb anders aus als auf den
Bildern hier.

## Die Bereiche einer Seite

<img src="media/doku_aufbau.png" alt="Der Aufbau einer Dokumentationsseite mit Hauptmenue, Doku-Menue und Themenmenue" width="900" />

| Nr. | Bereich |
| --- | ------- |
| 1 | **Hauptmenü**: führt zu den anderen Teilen der Website. |
| 2 | **Doku-Menü**: der Baum aller Kapitel. |
| 3 | **Themenmenü**: die Überschriften der gerade geöffneten Seite. |
| 4 | **Sprachauswahl**. |
| 5 | **Suche und Filter**: oben die Suche über die ganze Website, im Doku-Bereich das Feld über dem Text, das den Kapitelbaum filtert und auf die Eingabetaste hin im ganzen Text sucht. |

Über den Bereichen steht die **Brotkrumenspur**: sie zeigt, wo im Baum die
aktuelle Seite liegt, und jeder Teil davon ist anklickbar.

## 1 Hauptmenü

Die wichtigsten Punkte stehen am oberen Rand. Das Symbol mit den drei Strichen
ganz rechts öffnet das vollständige Menü:

<img src="media/doku_hauptmenue.png" alt="Das vollstaendige Hauptmenue" width="900" />

Dort stehen neben den Hauptbereichen **Doku**, **Adapter**, **Lizenzen** und
**Installation** auch Blog, Forum und Statistik sowie Impressum und Datenschutz.
Rechts unten führen die Symbole zu GitHub, Facebook, Discord und Instagram.

Über das Sonnensymbol oben rechts wird zwischen hellem und dunklem Erscheinungsbild
umgeschaltet.

## 2 Doku-Menü

Der Baum links führt durch alle Kapitel. Ein Klick auf einen Ordner klappt ihn
auf, die beiden Pfeile darüber klappen den ganzen Baum auf oder zu.

Das Feld über dem Text ist ein **Filter** und kein Suchfeld: Nach der Eingabe
bleiben im Baum nur die Kapitel stehen, deren Titel zum Begriff passen. Wer den
ganzen Text durchsuchen will, drückt die **Eingabetaste**, unter dem Feld steht
dafür auch ein Link.

<img src="media/doku_menue_filter.png" alt="Der gefilterte Kapitelbaum" width="900" />

Mit dem Doppelpfeil links oben lässt sich der Baum ganz ausblenden, wenn mehr
Platz für den Text gebraucht wird.

## 3 Themenmenü

Rechts oben führt **Auf dieser Seite** zu den Überschriften des gerade
geöffneten Artikels:

<img src="media/doku_themenmenue.png" alt="Das Themenmenue Auf dieser Seite" width="420" />

Bei längeren Seiten ist das der schnellste Weg zum gesuchten Abschnitt.

## 4 Sprachauswahl

Die Dokumentation ist mehrsprachig. Die deutschen Texte sind die Vorlage, die
übrigen Sprachen werden daraus erzeugt und nach und nach von Muttersprachlern
verbessert.

<img src="media/doku_sprachauswahl.png" alt="Die Sprachauswahl im Kopfbereich" width="450" />

## 5 Suche und Filter

Die Website hat zwei Eingabefelder, die leicht verwechselt werden.

| Feld | Was es tut |
| --- | --- |
| Lupe im Kopfbereich | durchsucht die ganze Website: Dokumentation, Adapter und Blog |
| Feld über dem Text, mit Trichtersymbol | filtert den Kapitelbaum nach den Titeln der Kapitel; die Eingabetaste startet mit demselben Begriff die Suche im ganzen Text |

Das Trichtersymbol unterscheidet die beiden: Wo ein Trichter steht, wird
aussortiert, wo eine Lupe steht, wird gesucht. Ein Begriff, der im Text
vorkommt, aber in keiner Überschrift, bleibt im Filter deshalb ohne Treffer. Der
Hinweis unter dem Feld führt dann in die Suche.

Aus der Ergebnisliste führt der Knopf **Zurück** oben rechts wieder dorthin, wo
man hergekommen ist.

## Wo anfangen?

* Wer ioBroker noch nicht kennt, beginnt bei den
  [Grundlagen](/docs/basics/README.md).
* Die [Installation](/docs/install/README.md)
  beschreibt die Wege auf Linux, Docker, Proxmox, Windows und macOS.
* Die [Admin-Oberfläche](/docs/admin/README.md)
  erklärt die Bedienung.
* Wie aus Datenpunkten Abläufe werden, steht unter
  [Logik & Automatisierung](/docs/logic/README.md).
* Alle Adapter im Einzelnen führt die
  [Adapter-Referenz](/adapters) auf.
* Wer selbst einen Adapter schreiben möchte, findet den Einstieg im
  [Entwicklerbereich](/docs/dev/adapterdev.md).

Diese Dokumentation wächst ständig. Wenn etwas fehlt oder besser erklärt werden
sollte: [Wir freuen uns über jede helfende Hand](https://forum.iobroker.net/).
