---
title:       "Objekte"
lastChanged: "07.09.2026"
---

# Reiter Objekte

Unter diesem Reiter liegen alle Objekte, die ioBroker verwaltet. Jede Instanz legt hier
einen eigenen Namespace an und darunter ihre Geräte, Kanäle und Datenpunkte. Objekte
können hier auch von Hand angelegt, bearbeitet und gelöscht werden, und ganze Teilbäume
lassen sich als JSON-Datei sichern und wieder einspielen.

Was Objekte und Zustände überhaupt sind, steht unter
[Objekte](/docs/basics/objects.md) und
[Zustände](/docs/basics/states.md).

## Die Werkzeugleiste

Am oberen Rand stehen die wichtigsten Befehle. Zu jedem Symbol gibt es einen
Hinweistext. Dazu einfach mit dem Mauszeiger eine Weile darauf stehen bleiben.

<img src="media/admin_objekte_leiste.png" alt="Die Werkzeugleiste des Reiters Objekte" width="900" />

| Nr. | Funktion |
| --- | -------- |
| 1 | **Baum aktualisieren.** Sind gerade angelegte Objekte noch nicht zu sehen, hilft ein Klick hierauf. |
| 2 | **Konfigurieren.** Legt fest, welche Spalten die Tabelle zeigt und wie breit sie sind. |
| 3 | **Alle Knoten auf- bzw. zuklappen.** |
| 4 | **Eine Ebene aufklappen.** |
| 5 | **Eine Ebene zuklappen.** |
| 6 | **Statusansicht umschalten** (siehe unten). |
| 7 | **Objektbeschreibungen ein-/ausblenden.** Zeigt zusätzlich zum Namen den Beschreibungstext des Objekts. |
| 8 | **Neues Objekt hinzufügen** (siehe unten). |
| 9 | **Objektbaum aus einer JSON-Datei hinzufügen.** |
| 10 | **Objektbaum als JSON-Datei speichern.** Gesichert wird der gerade ausgewählte Teilbaum. |

Ganz rechts in der Werkzeugleiste stehen die Zahl der Objekte und Zustände sowie das
Schraubenschlüssel-Symbol **Bearbeite benutzerdefinierte Konfiguration**. Damit werden
die Aufzeichnungseinstellungen für **alle** Datenpunkte gesetzt, die gerade den
Filterkriterien entsprechen.

!> Vor dem Klick auf den Schraubenschlüssel unbedingt prüfen, welche Filter gesetzt
sind. Sonst werden Einstellungen auf sehr viel mehr Datenpunkte angewendet als
beabsichtigt.

## Der Seiteninhalt

Die Objekte stehen in einer Tabelle. Die Eingabefelder und Auswahlmenüs unter den
Spaltenköpfen filtern die Anzeige.

<img src="media/admin_objekte_spalten.png" alt="Die Spalten der Objekttabelle" width="900" />

| Nr. | Spalte | Bedeutung |
| --- | ------ | --------- |
| 1 | **ID** | Die Objekthierarchie. Ganz oben stehen die Namespaces, darunter Geräte, Kanäle und Datenpunkte. Im Filterfeld darf `*` als Platzhalter stehen. |
| 2 | **Name** | Die Bezeichnung des Objekts, davor ein Symbol für die Hierarchieebene. Der Name lässt sich direkt bearbeiten. |
| 3 | **Typ** | Gerät, Kanal, Zustand oder Verzeichnis. Über das Auswahlmenü lässt sich zum Beispiel auf Zustände einschränken. |
| 4 | **Rolle** | Sagt Oberflächen wie vis, was der Datenpunkt darstellt (`switch.lock`, `indicator.alarm`, `button` …). Bearbeitbar, mit Vorschlagsliste, freie Eingaben sind erlaubt. |
| 5 | **Raum** | Der zugeordnete Raum. Ein Klick auf das Feld öffnet die Liste der angelegten Räume. |
| 6 | **Funktion** | Das zugeordnete Gewerk, zum Beispiel Licht oder Heizung. |
| 7 | **Wert** | Bei Datenpunkten der aktuelle Wert. **Rot** bedeutet: noch nicht vom Gerät bestätigt (`ack = false`). |
| 8 | **Rechte** | Die Zugriffsrechte des Objekts als Oktalzahl, wie bei Linux-Dateirechten. |
| 9 | | Die Schaltflächen der Zeile (siehe unten). |

Räume und Gewerke werden im Reiter
[Kategorien](/docs/admin/enums.md) angelegt.

## Die Statusansicht

Symbol **6** blendet weitere Spalten zu jedem Zustand ein: von wem er zuletzt gesetzt
wurde, seine Qualität, der Zeitstempel und der Zeitpunkt der letzten Änderung.

<img src="media/admin_objekte_status.png" alt="Die Statusansicht mit Qualitaet und Zeitstempeln" width="900" />

?> `0x00 - good` heißt: der Wert ist gültig. Andere Werte weisen auf ein Problem hin,
zum Beispiel `0x20 - substitute` für einen Ersatzwert.

## Ein neues Objekt anlegen

Symbol **8** legt ein Objekt unterhalb des gerade ausgewählten Eintrags an.

<img src="media/admin_objekte_neu.png" alt="Der Dialog Neues Objekt hinzufuegen" width="820" />

Als Typ stehen **Zustand**, **Kanal**, **Gerät** und **Verzeichnis** zur Verfügung, für
Zustände zusätzlich der Zustandstyp: Logikwert, Zahl, Zeichenkette, Werteliste, Feld,
Objekt oder gemischt. Erlaubt sind die Strukturen Verzeichnis → Zustand,
Verzeichnis → Kanal → Zustand, Verzeichnis → Gerät → Kanal → Zustand,
Gerät → Kanal → Zustand und Kanal → Zustand.

!> Ohne Expertenmodus dürfen eigene Objekte nur unter `0_userdata.0` und `alias.0`
angelegt werden. Das ist keine Einschränkung, sondern der richtige Ort: Objekte in den
Namespaces der Adapter werden bei deren nächstem Start überschrieben.

## Die Schaltflächen einer Zeile

<img src="media/admin_objekte_zeile.png" alt="Rechte und Schaltflaechen einer Tabellenzeile" width="700" />

1. Die **Rechte** des Objekts.
2. Der **Bleistift** öffnet den Objekteditor mit allen Eigenschaften. Änderungen hier
   wirken sofort. Nur benutzen, wenn klar ist, was sie bewirken.
3. Der **Mülleimer** löscht das Objekt und alles, was in der Hierarchie darunter liegt.
   Vorher erscheint eine Sicherheitsabfrage.
4. Das **Zahnrad** öffnet die *Benutzerdefinierten Einstellungen*. Dort wird festgelegt,
   ob und wie der Datenpunkt aufgezeichnet wird. Es erscheint nur, wenn mindestens eine
   Instanz von history, InfluxDB oder SQL installiert ist.
