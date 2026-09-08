---
title:       "Adressen und Dienste"
lastChanged: "08.09.2026"
---

# Adressen und Dienste

Rund um ioBroker gibt es eine Reihe von Internetadressen. Manche sind
Webseiten, andere werden von Ihrer Installation im Hintergrund angesprochen.
Diese Seite sortiert, was wozu gehört, damit klar ist, wohin ein Klick oder
eine Verbindung führt.

## Die beiden Hauptadressen

| Adresse | Wofür |
| ------- | ----- |
| **iobroker.net** | Diese Website. Dokumentation, Adapterübersicht, Statistik, Downloads. Hier liegt auch das kostenlose Konto, über das Adapterlizenzen verwaltet werden. |
| **iobroker.pro** | Der kostenpflichtige Clouddienst. Fernzugriff, Sprachassistenten, Benachrichtigungen. Zugangslizenzen werden dort verwaltet. |

Die beiden Konten sind getrennt. Was genau zu welchem gehört, steht unter
[Lizenzen](/docs/licenses/README.md).

## Das Forum

**forum.iobroker.net** ist die Anlaufstelle für Fragen, für Fehlermeldungen an
die Gemeinschaft und für Ankündigungen des Projekts. Wie man dort sinnvoll
fragt, steht unter [Im Forum fragen](/docs/trouble/forum.md).

## Was Ihre Installation im Hintergrund abruft

Ein laufendes ioBroker-System spricht von sich aus mit einigen wenigen
Adressen. Alle sind harmlos, aber in einem abgeschotteten Netz muss man sie
kennen.

| Adresse | Wozu |
| ------- | ---- |
| **download.iobroker.net** | Die Adapterliste. Von dort holt der Admin die Repositories *stable* und *beta*, also die Information, welche Adapter es in welcher Version gibt. Siehe [Repositories](/docs/basics/repositories.md). |
| **registry.npmjs.org** | Die Adapter selbst. Installiert wird über npm, deshalb kommt der Programmcode von dort und nicht von ioBroker. |
| **github.com** | Nur, wenn ein Adapter ausdrücklich aus einer eigenen Quelle installiert wird, oder wenn eine Instanz die Entwicklungsversion benutzt. |
| **iobroker.org** | Empfängt die anonyme Nutzungsstatistik, sofern sie eingeschaltet ist. Siehe [Nutzungsstatistik](/docs/ecosystem/statistics.md). |
| **iobroker.live** | Liefert die kleinen Statusgrafiken (*Badges*), die in den Adapterbeschreibungen den aktuellen Versionsstand anzeigen. |

Ist der Clouddienst in Betrieb, kommt die Verbindung zu **iobroker.pro** dazu.
Die baut die Instanz von innen nach außen auf, es muss also keine Öffnung im
Router eingerichtet werden.

## Werkzeuge für Entwickler

Diese Adressen laufen unter **iobroker.in**. Sie werden von Hand im Browser
benutzt, nicht von Ihrer Installation.

| Adresse | Wozu |
| ------- | ---- |
| **adapter-creator.iobroker.in** | Erzeugt das Grundgerüst eines neuen Adapters. Siehe [Empfehlungen](/docs/dev/bestpractices.md). |
| **adapter-check.iobroker.in** | Prüft ein Adapter-Repository vor der Veröffentlichung auf die üblichen Fehler. Siehe [Adapter veröffentlichen](/docs/dev/adapterpublish.md). |
| **translator.iobroker.in** | Übersetzt die Texte eines Adapters in die unterstützten Sprachen. |
| **weblate.iobroker.net** | Die Übersetzungsplattform des Projekts. Dort werden die Texte von Kern und Adaptern gepflegt, ohne dass man dafür programmieren können muss. Siehe [Mitmachen](/docs/community/project.md). |

## Wenn eine Adresse nicht erreichbar ist

Kommt der Admin nicht an die Adapterliste, bleibt der Reiter *Adapter* leer
oder zeigt veraltete Versionen. Das ist fast immer ein Namens- oder
Netzwerkproblem und kein Fehler in ioBroker. Der erste Test ist deshalb, ob
`download.iobroker.net` vom ioBroker-Rechner aus überhaupt aufgelöst wird.
Weiteres unter [Adapterprobleme](/docs/trouble/adapter.md).
