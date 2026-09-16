---
title:       "Die Geschichte von ioBroker"
lastChanged: "12.09.2026"
---
# Die Geschichte von ioBroker

Am Anfang stand ein einfacher Wunsch: eine Visualisierung für das eigene
Zuhause. Daraus wurde eine Plattform, die heute in vielen tausend Haushalten
läuft, mit Adaptern für fast jede Gerätewelt und einer Community, die größer ist
als das Projekt selbst. Diese Seite erzählt den Weg dorthin, Jahr für Jahr.

## 2013: CCU.IO, der Grundstein

Alles beginnt mit Homematic und mit dem Wunsch, die eigenen Geräte endlich
übersichtlich zu sehen. Sebastian Raff legte in diesem Jahr den Grundstein für
das Projekt CCU.IO. Es war für die Integration von Homematic-Systemen von
zentraler Bedeutung, und seine Architektur war entsprechend stark an Homematic
angelehnt.

Über CCU.IO haben wir uns kennengelernt, und mit ihm entstand die Idee, die
alles Weitere trägt: eine offene und flexible Plattform für die
Heimautomatisierung, die nicht an einen einzelnen Hersteller gebunden ist.

![CCU.IO im Jahr 2013: die Ereignisliste mit Bewegungsmeldern aus dem eigenen Haus](media/ccu-io-2013.png)

*CCU.IO, 2013. Zeit, Zimmer, Gewerk, Name, Typ, Wert: die Spalten von damals
beschreiben dieselben Dinge, die ioBroker heute Objekte und Zustände nennt.*

## 2014: Aus CCU.IO wird ioBroker

Ein Jahr später nutzten etwa 150 Menschen das Projekt, und mit den Nutzern kamen
die Grenzen zum Vorschein. CCU.IO hatte tiefgreifende konzeptionelle Schwächen,
die langfristig die Wartung und die Weiterentwicklung erschwert hätten. Die
Werte lagen in einer JSON-Datei, das war der Standard des Projekts, und für ein
System, das wachsen soll, ist genau das eine Sackgasse.

Deshalb haben wir beschlossen, ioBroker ins Leben zu rufen. Im Zentrum stand von
Anfang an eine hochmodulare Struktur, die es erlaubt, flexibel anzupassen und zu
erweitern, statt an einer gewachsenen Architektur zu reparieren. Aus der
JSON-Datei wurde eine eigene Datenbank, zunächst CouchDB, später Redis.
ioBroker sollte eine Plattform werden, die den Herausforderungen der Zukunft
gewachsen ist.

Sebastian Raff verließ das Projekt 2014. Sein Fundament hat alles getragen, was
danach kam.

## 2016: Sprechen und Fernsteuern

Zwei Funktionen verändern in diesem Jahr, wie ioBroker benutzt wird. Die
Anbindung von Alexa bringt die Sprachsteuerung ins Haus, und die erste
Cloud-Lösung macht den Zugriff von unterwegs möglich, ohne dass im Router Ports
geöffnet werden müssen.

Im selben Jahr kommt Ingo Fischer ([@apollon77](https://github.com/Apollon77))
ins Kernteam. Aus einem Projekt wird eine Gruppe.

## 2017: Eine Firma für die Infrastruktur

Server, Domains, Repositories, Zertifikate: je mehr Menschen ioBroker einsetzen,
desto weniger darf diese Infrastruktur an einzelnen Personen hängen. Mit der
Unterstützung von Ortwin Tischler entsteht deshalb die Firma hinter ioBroker,
deren Aufgabe genau das ist, die Infrastruktur des Projekts abzusichern.

Moritz Heusinger ([@foxriver76](https://github.com/foxriver76)) kommt ins
Kernteam.

## Dazwischen: das Fundament wird erwachsen

Die Jahre zwischen den Zahlen sind die, in denen die Grundlagen stabil werden.
Erfahrungen aus der Arbeit bei Siemens flossen ins Projekt ein und haben den
Blick auf Wartbarkeit und Prozesse verändert. Für die Oberflächen fiel die
Entscheidung für React, und für den Kern kam eine belastbarere Teststrategie
dazu. Ingo und Moritz arbeiteten am js-controller, dem Herzstück des Systems,
und die Admin-Oberfläche wurde Schritt für Schritt zu dem, was sie heute ist.

![Der Admin um 2015: eine Tabelle der Instanzen](media/admin-2015.png)

*Der Admin um 2015: eine Liste von Instanzen, mehr brauchte es damals nicht.*

![Admin 4 mit Kacheln für jeden Adapter](media/admin-4.png)

*Mit Admin 4 kommen Kacheln, Material-Optik und ein Adapter-Katalog.*

![Der heutige Admin mit der Übersichtsseite](media/admin-heute.png)

*Heute: eine Übersicht, die Systemstatus, Adapter, Instanzen und Protokoll auf
einen Blick zeigt.*

## 2022: vis-2

In diesem Jahr beginnt die Arbeit an [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2),
der neuen Visualisierung, und im selben Jahr fällt eine persönliche
Entscheidung: die Kündigung bei Siemens und die volle Konzentration auf
ioBroker. vis-2 erscheint noch im selben Jahr.

## 2024: Zehn Jahre, und ein Treffen in Solingen

2014 bis 2024, zehn Jahre ioBroker. Gefeiert wurde das nicht im Chat, sondern
zum ersten Mal persönlich: am 9. November 2024 in der Gläsernen Werkstatt in
Solingen, beim ersten großen ioBroker Community-Treffen. Rund 160 Menschen
kamen, es gab Vorträge, und viele sahen zum ersten Mal die Gesichter zu den
Namen, die sie aus dem Forum kannten. Organisiert hat das Treffen Ingo Fischer
mit dem Orga-Team, unterstützt von Shelly und Solingen Digital.

## Wer ioBroker macht

ioBroker ist die Arbeit vieler Hände: am Kern, an den Adaptern, an der
Dokumentation, im Forum und in den Übersetzungen. In der Community kennt man
einander an den Kürzeln:

[@bluefox](https://github.com/GermanBluefox),
[@Apollon77](https://github.com/Apollon77),
[@foxriver76](https://github.com/foxriver76),
[@AlCalzone](https://github.com/AlCalzone),
[@arteck](https://github.com/arteck),
[@Garfonso](https://github.com/Garfonso),
[@simatec](https://github.com/simatec),
[@Feuersturm](https://github.com/Feuersturm),
[@Eistee82](https://github.com/Eistee82),
[@Dutchman](https://github.com/DutchmanNL),
[@eric2905](https://github.com/Eric2905),
[@UncleSam](https://github.com/UncleSamSwiss),
[@Jey-Cee](https://github.com/Jey-Cee),
[@mcm1957](https://github.com/mcm1957),
[@ldittmar81](https://github.com/ldittmar81),
[@oelison](https://github.com/oelison),
[@klein0r](https://github.com/klein0r),
[@Homoran](https://github.com/Homoran)

und viele, viele andere Enthusiasten.

## Die Geschichte geht weiter

Was hier als Rückblick steht, ist vor allem eine Einladung: ioBroker wächst mit
den Menschen, die mitmachen. Im [Forum](https://forum.iobroker.net/) wird jeden
Tag geholfen, und wer selbst etwas beitragen möchte, findet den Einstieg im
Kapitel [Mitmachen](/docs/community/README.md).
