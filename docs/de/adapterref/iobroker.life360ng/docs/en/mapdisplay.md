---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/docs/en/mapdisplay.md
title: Registerkarte: Kartendarstellung
hash: GgWJSoRKIwQukGz8waCvdAbV8qzxMh/l7hW0Em4D6lM=
---
![Logo](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Die nächste Generation

[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

(ab Version 1.4.0 – nur die neueste Version bietet den vollen Funktionsumfang)

# Registerkarte: Kartendarstellung

Alle Einstellungen in diesem Tab steuern die visuelle Darstellung der Tracker-Karten. Änderungen werden automatisch beim nächsten GPS-Update wirksam – ein Neustart ist nicht erforderlich.

---

## Kartendesign

Steuert das Gesamtbild und die Bedienung aller Tracker-Karten.

| Einstellung               | Beschreibung                                                                                        |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| Seitenhintergrund         | Hintergrundfarbe der Kartenseite                                                                    |
| Hintergrund der Kopfzeile | Hintergrundfarbe der Kartenkopfzeile                                                                |
| Kopfzeilentrenner         | Farbe der Trennlinie unterhalb der Überschrift                                                      |
| Linienbreite (px)         | Breite der Routenlinie in Pixeln (1–10)                                                             |
| Routentransparenz         | Transparenz der Routenlinie (0,0 = unsichtbar, 1,0 = vollständig undurchsichtig)                    |
| Deckkraft des Markers     | Transparenz der Positionsmarkierung / des Pins (0,0 = unsichtbar, 1,0 = vollständig undurchsichtig) |
| Markergröße               | Größenfaktor für die Positionsmarkierung (0,5 = halb, 1,0 = Standard, 2,0 = doppelt)                |

---

## Orte auf der Karte

Auf der Karte können Markierungen für Life360-Orte und Ihre eigenen Orte (Meine Orte) angezeigt werden. Jede Datenquelle kann unabhängig konfiguriert werden.

### Life360 Orte

| Einstellung                          | Beschreibung                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| Life360-Orte als Flaggen anzeigen    | Flaggenmarkierungen für Life360-Cloud-Orte aktivieren/deaktivieren                 |
| Flaggenfarbe (Life360-Orte)          | Farbe der Flaggenmarkierungen                                                      |
| Flaggengröße (Life360-Plätze)        | Größenfaktor für die Flaggenmarkierungen (0,5–3,0)                                 |
| Deckkraft der Flaggen (Life360-Orte) | Transparenz der Flaggenmarkierungen (0,0 = unsichtbar, 1,0 = vollständig sichtbar) |

### Eigene Orte (Meine Orte)

| Einstellung                             | Beschreibung                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Eigene Orte als Flaggen anzeigen        | Flaggenmarkierungen für benutzerdefinierte Orte aktivieren/deaktivieren            |
| Flaggenfarbe (eigene Orte)              | Farbe der Flaggenmarkierungen                                                      |
| Flaggengröße (eigene Plätze)            | Größenfaktor für die Flaggenmarkierungen (0,5–3,0)                                 |
| Deckkraft der Flaggen (eigene Bereiche) | Transparenz der Flaggenmarkierungen (0,0 = unsichtbar, 1,0 = vollständig sichtbar) |

---

## Familienkartentitel

| Einstellung                     | Beschreibung                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| Familienkarten-Überschriftsname | Benutzerdefinierter Titel, der in der Kopfzeile der Familien-/Kreiskarte angezeigt wird |