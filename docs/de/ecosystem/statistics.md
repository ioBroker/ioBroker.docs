---
title:       "Nutzungsstatistik"
lastChanged: "08.09.2026"
---

# Nutzungsstatistik

Jede Installation kann anonym melden, womit sie läuft. Daraus entsteht die
[Statistikseite](/statistics) dieser Website: wie viele Installationen es gibt,
auf welchen Betriebssystemen sie laufen, mit welchen Node.js-Versionen, in
welchen Ländern und mit welchen Adaptern.

Das ist freiwillig, und es ist die einzige Möglichkeit, die das Projekt hat,
solche Fragen überhaupt zu beantworten. Ob ein Adapter noch benutzt wird, ob
eine alte Node.js-Version noch unterstützt werden muss, ob sich ein Aufwand für
eine bestimmte Plattform lohnt: das steht in keiner Verkaufsstatistik, weil es
keine gibt.

## Wo das eingestellt wird

Im Admin unter **System**, Reiter **Statistik**. Dort stehen vier
Einstellungen:

| Einstellung | Bedeutung |
| --- | --- |
| **keins** | Es wird nichts übermittelt. |
| **Normal** | Der übliche Umfang. |
| **ohne Stadt** | Wie oben, aber der Ort bleibt weg. |
| **erweitert** | Der volle Umfang, unter anderem mit der Liste der installierten Adapter. |

Der entscheidende Punkt an diesem Dialog: **er zeigt links die Liste der Felder
und rechts den tatsächlichen Datensatz**, so wie er übermittelt würde, im
Klartext und für Ihre Installation. Sie müssen also niemandem glauben, was
gesendet wird, Sie können es ablesen.

## Was übermittelt wird

Bei der umfangreichsten Einstellung sind das unter anderem:

* die **UUID** der Installation, also eine Kennung ohne Bezug zu einer Person,
* **Sprache** und **Land**, je nach Einstellung auch die Stadt,
* je Host die **Version des js-controllers**, die Plattform und der Systemtyp,
* die **Node.js-Version**, die Prozessorarchitektur und ob es eine
  Docker-Installation ist,
* die **installierten Adapter** mit Version und Herkunft,
* welche Datenbanktypen für Objekte und Zustände verwendet werden.

Übermittelt wird beim Aktualisieren der Adapterliste, also nicht laufend.

?> Land und Stadt stammen aus dem Reiter **System** derselben
[Systemeinstellungen](/docs/admin/settings.md), aus denen ioBroker auch
Sonnenauf- und -untergang berechnet. Es wird nichts geortet und keine
IP-Adresse ausgewertet.

!> Dieselbe Einstellung regelt auch die **Absturzmeldungen**, siehe
[Fehlerberichte](/docs/ecosystem/sentry.md). Wer auf *keins* stellt, schaltet
beides ab.

## Was daraus entsteht

Auf der [Statistikseite](/statistics) stehen die Auswertungen: die Zahl der
Installationen und ihre Entwicklung seit 2015, die Verteilung nach Ländern,
Betriebssystemen, Sprachen und Node.js-Versionen, und wie viele Anlagen mit
mehreren Hosts arbeiten.

?> Die Karte auf dieser Seite wird von Google Maps geladen und deshalb erst
angezeigt, wenn Sie es ausdrücklich möchten. Bis dahin geht keine Anfrage dorthin.

Die Kurve zählt übrigens Installationen, nicht Menschen. Wer neu aufsetzt, statt
eine Sicherung zurückzuspielen, bekommt eine neue UUID und zählt neu.

## Was das mit Ihnen macht

Nichts. Es gibt keine Werbung, keinen Verkauf von Daten und keine Rückverfolgung
auf eine Person. Der Nutzen liegt auf der anderen Seite: die Zahlen entscheiden
mit, welcher Adapter gepflegt wird und wann eine alte Node.js-Version fallen
gelassen werden kann.
