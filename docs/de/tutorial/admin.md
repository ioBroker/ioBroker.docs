---
title:       "Rundgang durch die Oberfläche"
lastChanged: "08.09.2026"
---

# Rundgang durch die Oberfläche

Der Admin hat viele Reiter, und beim ersten Öffnen sieht das nach mehr aus, als
es ist. Tatsächlich brauchen Sie im Alltag vier davon. Dieser Rundgang sagt,
welche das sind und wofür die übrigen da sind. Die ausführliche Beschreibung
jedes einzelnen Reiters steht im Kapitel
[Admin-Oberfläche](/docs/admin/README.md).

## Der Aufbau

Die Seite besteht aus drei Bereichen: links die **Menüleiste** mit den Reitern,
rechts daneben das **Hauptfenster** und darüber eine **Symbolleiste**, deren
Inhalt vom gerade geöffneten Reiter abhängt.

Ganz unten links sitzt **System**. Dort werden die
[Systemeinstellungen](/docs/admin/settings.md)
vorgenommen, und daneben liegt der Schalter für den Expertenmodus.

## Die vier, die Sie täglich brauchen

| Reiter | Wofür |
| --- | --- |
| [Adapter](/docs/admin/adapter.md) | Neue Anbindungen dazunehmen und vorhandene aktualisieren. |
| [Instanzen](/docs/admin/instances.md) | Die laufenden Anbindungen: konfigurieren, starten, stoppen, und sehen, ob sie laufen. |
| [Objekte](/docs/admin/objects.md) | Der Baum aller Datenpunkte. Hier sehen Sie nach, ob ein Wert ankommt. |
| [Protokolle](/docs/admin/log.md) | Was das System zu sagen hat. Der Menüpunkt wird rot, wenn ein Fehler aufgetreten ist. |

?> Wenn etwas nicht funktioniert, ist die Reihenfolge fast immer dieselbe:
Instanzen (läuft sie?), Objekte (kommt ein Wert an?), Protokolle (was sagt das
System?).

## Die übrigen

| Reiter | Wofür |
| --- | --- |
| [Übersicht und Schnellzugriff](/docs/admin/overview.md) | Systemstatus auf einen Blick und Kacheln zu allen Oberflächen. |
| [Kategorien](/docs/admin/enums.md) | Räume und Funktionen. Sieht nach Kleinkram aus, ist aber die Grundlage für Visualisierung und Sprachsteuerung. |
| [Benutzer](/docs/admin/users.md) | Wer sich anmelden darf und was er darf. |
| [Hosts](/docs/admin/hosts.md) | Der Rechner selbst, Updates des js-controllers, Meldungen des Systems. |
| [Dateien](/docs/admin/files.md) | Der Dateispeicher, etwa für Bilder in einer Visualisierung. |
| Backup | Kommt vom Adapter BackItUp, siehe [Datensicherung](/docs/config/backup.md). |

Weitere Reiter kommen mit den installierten Adaptern dazu, etwa *Skripte*,
*Kalender* oder *Geräte*.

## Der Expertenmodus

Unten links schaltet ein Symbol den Expertenmodus ein. Er blendet zusätzliche
Spalten und Einstellungen ein, unter anderem die Zugriffsrechte an Objekten und
die internen Datenpunkte der Adapter.

?> Für den Anfang bleibt er aus. Er zeigt sehr viel mehr, und das meiste davon
brauchen Sie erst, wenn Sie einem Problem nachgehen.

## Wenn Ihnen der Platz fehlt

Der Pfeil oben in der Menüleiste verkleinert sie auf die Symbole. Auf einem
Tablet ist das der Unterschied zwischen bedienbar und nicht bedienbar.

## Wie es weitergeht

Als nächstes kommt der Reiter, in dem Sie am Anfang am meisten unterwegs sind:
[Adapter verwalten](/docs/tutorial/adapter.md).
