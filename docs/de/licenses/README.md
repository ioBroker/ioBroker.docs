---
title:       "Lizenzen im Überblick"
lastChanged: "08.09.2026"
---

# Lizenzen im Überblick

Fast alles an ioBroker ist kostenfrei. Der js-controller, der Admin und nahezu
alle Adapter stehen offen auf [GitHub](https://github.com/ioBroker), in den
allermeisten Fällen unter der MIT-Lizenz. Geld kostet nur, was laufende Kosten
verursacht: drei Adapter und die Dienste in der Cloud.

?> **Der Normalfall braucht keine Lizenz.** Wer ioBroker zu Hause betreibt,
Geräte anbindet, Skripte schreibt und alles im eigenen Netz bedient, zahlt
nichts.

## Zwei Arten von Lizenzen

Sie unterscheiden sich in allem: wofür sie gelten, woran sie gebunden sind und
wo sie verwaltet werden.

| | [Adapterlizenz](/docs/licenses/adapter.md) | [Zugangslizenz](/docs/licenses/cloud.md) |
| --- | --- | --- |
| Wofür | Einen bestimmten Adapter auf dem eigenen Server nutzen | Dienste in der Cloud nutzen |
| Betrifft | vis-2, KNX, JägerDesign-Widgets | Sprachassistenten, Fernzugriff |
| Gebunden an | Die Seriennummer (UUID) der Installation | Das Konto |
| Verwaltet auf | [ioBroker.net](https://iobroker.net) | [ioBroker.pro](https://iobroker.pro) |

## Warum zwei Server

Das verwirrt am Anfang zuverlässig, folgt aber der Aufteilung oben:

* **ioBroker.net** ist der kostenfreie Zugang. Dort werden Adapterlizenzen
  verwaltet, und dort liegt auch das Konto für den kostenfreien Fernzugriff.
* **ioBroker.pro** ist die kostenpflichtige Cloud, also Sprachassistenten und
  der erweiterte Fernzugriff.

Ein Konto auf dem einen Server ist nicht automatisch eines auf dem anderen.

## Wo die Konditionen stehen

Preise, Pakete und Kontingente ändern sich, deshalb stehen sie nicht in dieser
Dokumentation, sondern auf der Produktseite:

* **[Lizenzen](/productoverview)** ist die Übersicht mit allen Paketen und
  Preisen. Sie ist auch im Kopf jeder Seite verlinkt.
* Adapterlizenzen werden auf der
  [Preisseite von ioBroker.net](https://iobroker.net/www/pricing) bestellt.
* Zugangslizenzen auf der
  [Preisseite von ioBroker.pro](https://iobroker.pro/www/pricing#remote).

Diese Seiten hier erklären, **wie** die Lizenzen funktionieren, nicht, was sie
kosten.

## Wie sich das Projekt finanziert

Ein Open-Source-Projekt kann keine Einnahmen erzielen, um etwa Server zu
bezahlen. Dafür gibt es die ioBroker GmbH. Sie stellt dem Community-Projekt die
Infrastruktur wie den Forum-Server kostenfrei zur Verfügung und hat in der
Vergangenheit Entwicklungsleistung eingekauft, die in die Open-Source-Projekte
geflossen ist, etwa in den Admin.

Wer keine Lizenz braucht und trotzdem etwas beitragen möchte: über eine
[Spende](https://www.paypal.com/donate?campaign_id=MJBDJ9TGBQ7GN) freut sich das
Projekt ebenso. Weitere Wege, mitzumachen, stehen unter
[Mitmachen](/docs/community/README.md).
