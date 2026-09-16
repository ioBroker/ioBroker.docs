---
title:       "Im Team arbeiten"
lastChanged: "08.09.2026"
---

# Zur Weiterentwicklung beitragen

Alles, was zu ioBroker gehört, liegt offen auf
[GitHub](https://github.com/ioBroker). Das ist kein Detail für Entwickler,
sondern der Grund, warum jeder mitarbeiten kann: es gibt keine geschlossene
Version, keinen internen Zweig und keine Stelle, an der man um Erlaubnis fragen
muss, bevor man etwas vorschlägt.

## Wie das Projekt aufgeteilt ist

| Teil | Was darin steckt |
| --- | --- |
| `ioBroker.js-controller` | Der Kern: Datenbanken, Instanzverwaltung, die `iobroker`-Befehle. |
| `ioBroker.admin` | Die Oberfläche, die dieses Handbuch im Kapitel Admin beschreibt. |
| `ioBroker.<name>` | Je ein Repository pro Adapter, meist von einer einzelnen Person betreut. |
| `ioBroker/ioBroker` | Die Installationsskripte für Linux, darunter der Installation Fixer. |
| `ioBroker.docs` | Diese Dokumentation. |

Adapter sind eigenständig. Wer einen Adapter verbessern will, hat es mit der
Person zu tun, die ihn betreut, nicht mit einem zentralen Gremium. Bei Adaptern,
deren Betreuer nicht mehr aktiv ist, springen die
[iobroker-community-adapters](https://github.com/iobroker-community-adapters)
ein.

## Wo anfangen

**Ohne Programmierkenntnisse.** Übersetzungen fehlen fast überall. Jeder Adapter
hat eine Datei mit den Texten seiner Konfigurationsoberfläche; eine fehlende
Sprache zu ergänzen ist eine überschaubare, klar abgegrenzte Aufgabe. Ebenso
gefragt: Dokumentation, siehe
[Artikel schreiben](/docs/community/doc.md).

**Mit Programmierkenntnissen.** Der bequemste Einstieg ist nicht der eigene neue
Adapter, sondern ein bestehender: einen Fehlerbericht heraussuchen, den man
nachvollziehen kann, und einen Vorschlag einreichen. Dabei lernt man den Aufbau
kennen, ohne alles selbst entscheiden zu müssen.

**Ein eigener Adapter.** Wenn ein Gerät oder ein Dienst noch fehlt. Der Weg
dorthin steht unter
[Adapterentwicklung](/docs/dev/adapterdev.md),
die Regeln für die Aufnahme in das offizielle Repository unter
[Adapter veröffentlichen](/docs/dev/adapterpublish.md).

?> Bevor Sie mit einem neuen Adapter anfangen: im
[Forum](https://forum.iobroker.net) fragen, ob schon jemand daran arbeitet. Es
kommt vor, dass zwei Leute unabhängig voneinander dasselbe bauen.

## Wie ein Vorschlag abläuft

1. Das Repository abzweigen (*Fork*).
2. Einen Zweig für die Änderung anlegen.
3. Die Änderung machen, möglichst klein und auf eine Sache beschränkt.
4. Einen Pull Request stellen und darin erklären, **warum** die Änderung nötig
   ist, nicht nur was sie tut.
5. Auf Rückfragen antworten. Ein Vorschlag, der nach der ersten Rückfrage
   liegenbleibt, wird nicht übernommen.

Kleine, klar begründete Änderungen werden schnell aufgenommen. Große Umbauten
sollten vorher besprochen werden, sonst steckt viel Arbeit in etwas, das so
nicht gewollt war.

## Was das Projekt trägt

Neben Quelltext braucht ioBroker Menschen, die im Forum antworten, Betaversionen
ausprobieren und Fehler sauber beschreiben. Das ist weniger sichtbar als ein
Adapter, aber ohne diese Arbeit funktioniert der Rest nicht.
