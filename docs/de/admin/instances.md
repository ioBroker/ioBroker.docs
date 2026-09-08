---
title:       "Instanzen"
lastChanged: "07.09.2026"
---

# Reiter Instanzen

Hier stehen alle Instanzen, die über den Reiter
[Adapter](https://www.iobroker.net/#de/documentation/admin/adapter.md) angelegt
wurden. Sie werden hier gestartet, gestoppt, konfiguriert und wieder gelöscht.

?> Der Name einer Instanz setzt sich aus dem Adapternamen und einer laufenden
Nummer zusammen, die erste bekommt die `0`. Aus `javascript.0` wird der
Namensraum, unter dem alle Objekte dieser Instanz liegen. Deshalb ändert man
Instanznummern nicht nachträglich.

## Die Werkzeugleiste

<img src="media/admin_instanzen_leiste.png" alt="Die Werkzeugleiste des Reiters Instanzen" width="900" />

| Nr. | Funktion |
| --- | -------- |
| 1 | **Liste ein-/ausblenden**: wechselt zwischen der kompakten Liste und einer Ansicht mit Beschreibungen. |
| 2 | **Kategorie**: gruppiert die Instanzen nach dem Einsatzgebiet des Adapters. |
| 3 | **Neu laden.** |
| 4 | **Laufende oder gestoppte Instanzen anzeigen.** |
| 5 | **Instanzen filtern**: nach Host, Zustand und weiteren Merkmalen. |
| 6 | **Filter** nach Name. |
| 7 | Die Statuszeile: freier Festplattenspeicher, gesamte RAM-Auslastung, freier Speicher, dazu in eckigen Klammern der Server und die Zahl der laufenden Prozesse. |

## Eine Zeile lesen

<img src="media/admin_instanzen_zeile.png" alt="Die Bedienelemente einer Instanzzeile" width="900" />

| Nr. | Bedeutung |
| --- | --------- |
| 1 | **Zustand.** Ein grünes Quadrat heißt: läuft. Ein graues Zahnrad heißt: gestoppt. Eine Uhr steht für eine zeitgesteuerte Instanz, die nur kurz läuft. |
| 2 | Das Symbol des Adapters. |
| 3 | Der **Name der Instanz**. |
| 4 | **Start/Stopp.** Zwei Balken bedeuten „läuft, hier anhalten", das rote Dreieck „gestoppt, hier starten". |
| 5 | **Einstellungen**: öffnet die Konfiguration des Adapters. Was dort steht, beschreibt die Dokumentation des jeweiligen Adapters. |
| 6 | **Neu starten.** |
| 7 | **Instanzlink**: führt zur Weboberfläche dieser Instanz, sofern sie eine hat. |
| 8 | Der **Titel**. Er lässt sich frei ändern, was bei mehreren Instanzen desselben Adapters hilft, etwa `hm-rpc.0` für RF und `hm-rpc.1` für Wired. |
| 9 | Die **Log-Stufe** dieser Instanz. |
| 10 | Der **Port**, auf dem die Instanz lauscht. |
| 11 | Die aktuelle **RAM-Nutzung**. |
| 12 | Ob der Adapter Abstürze über **Sentry** an seinen Entwickler meldet. |
| 13 | Klappt die **Detailzeile** auf. |

## Die Detailzeile

<img src="media/admin_instanzen_details.png" alt="Die aufgeklappte Detailzeile einer Instanz" width="900" />

Aufgeklappt zeigt die Zeile links, ob die Instanz mit dem Host verbunden ist und
ein Lebenszeichen sendet, dazu die installierte Version. Rechts stehen:

* die **Log-Stufe**: von `debug` über `info` und `warn` bis `error`. Läuft etwas
  nicht rund, hilft `debug`; danach wieder zurückstellen, sonst wächst das
  Protokoll schnell.
* **Eingabe- und Ausgabeereignisse**: wie viele Werte die Instanz seit dem Start
  empfangen und gesendet hat.
* **Automatisch neu starten**: ein Zeitplan, nach dem die Instanz neu gestartet
  wird.
* die **RAM-Grenze**. Sie ist eine Obergrenze, keine Reservierung. Auf Systemen
  mit wenig Speicher nicht zu hoch setzen.
* die **Startreihenfolge (Tier)**. Kleinere Zahlen starten zuerst: `1` sind
  Logikadapter, danach folgen Daten- und Oberflächenadapter.
* der **Mülleimer** löscht die Instanz samt ihrer Objekte. Andere Instanzen
  desselben Adapters und der Adapter selbst bleiben bestehen.

!> Zwei grüne Haken links bedeuten nicht automatisch, dass alles stimmt: Sie
sagen nur, dass die Instanz läuft und sich beim Host meldet. Ob die Verbindung
zum Gerät steht, verrät das Objekt `info.connection` der Instanz.
