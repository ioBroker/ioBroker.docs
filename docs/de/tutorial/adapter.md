---
title:       "Adapter verwalten"
lastChanged: "08.09.2026"
---

# Adapter verwalten

Rund um Adapter werden zwei Begriffe ständig verwechselt, und daraus entstehen
die meisten Missverständnisse:

* Ein **Adapter** ist die Software. Sie wird einmal auf den Rechner geladen.
* Eine **Instanz** ist ein laufender Prozess dieses Adapters, mit eigener
  Konfiguration. Vom selben Adapter kann es mehrere geben, etwa `hue.0` für die
  eine und `hue.1` für die zweite Bridge.

Erst die Instanz tut etwas. Ein installierter Adapter ohne Instanz liegt nur
herum.

?> Wie der Reiter *Adapter* im Einzelnen aussieht, welche Symbole die Kachel
trägt und wo die Werkzeugleiste welche Funktion hat, steht unter
[Adapter](/docs/admin/adapter.md). Diese Seite erklärt die Vorgänge dahinter.

## Einen Adapter installieren

**Im Admin** gibt es dafür keinen eigenen Befehl, und das ist Absicht: Beim
Anlegen einer Instanz wird der Adapter, falls nötig, mitinstalliert. Ein Klick
auf das Pluszeichen der Kachel genügt also.

**Auf der Konsole:**

```bash
iobroker install <adaptername>
```

## Eine Instanz anlegen

**Im Admin**: im Reiter *Adapter* auf der Kachel des Adapters das Pluszeichen.
Danach öffnet sich die Konfiguration der neuen Instanz.

**Auf der Konsole:**

```bash
iobroker add <adaptername>
```

Fehlen die Dateien des Adapters noch, führt ioBroker vorher automatisch die
Installation aus.

## Aktualisieren

Liegt eine neuere Version vor, färbt sich die Kachel und die verfügbare Version
erscheint grün. Ein Klick auf das Aktualisierungssymbol spielt sie ein. Im
Hintergrund laufen dann zwei Schritte: die neuen Dateien werden installiert und
anschließend zu den Instanzen hochgeladen.

```bash
iobroker upgrade <adaptername>
```

?> Adapter aktuell zu halten lohnt sich nicht nur wegen neuer Funktionen:
Adapter setzen oft eine bestimmte Version eines anderen voraus. Ein System, in
dem alles auf dem Stand ist, hat weniger Überraschungen.

## Auf eine ältere Version zurück

Macht eine neue Version Ärger, lässt sich eine ältere einspielen.

**Im Admin**: Expertenmodus einschalten, dann auf der Rückseite der Kachel
**Eine bestimmte Version installieren**. Es erscheint die Liste der Versionen,
die der Entwickler dafür freigegeben hat.

**Auf der Konsole:**

```bash
iobroker upgrade <adaptername>@<version>
```

## Dateien hochladen

Ein Sonderfall, der im Normalbetrieb nicht gebraucht wird: Der Upload bringt die
Dateien eines Adapters erneut in die Datenbank. Nötig ist das nur, wenn jemand
Dateien von Hand geändert hat.

**Im Admin**: Expertenmodus, dann auf der Kachelrückseite der **Dateiupload**.

**Auf der Konsole:**

```bash
iobroker upload <adaptername>
```

## Woher die Adapter kommen

Die Liste im Reiter *Adapter* ist zunächst nur ein Katalog. Was dort steht, ist
noch nicht auf dem Rechner. Sie stammt aus dem eingestellten Repository und wird
beim Öffnen des Admin aktualisiert; besteht keine Verbindung, bleibt der letzte
bekannte Stand stehen.

Es gibt drei Bezugsquellen, und sie unterscheiden sich in der Reife:

| Quelle | Was darin steht |
| ------ | --------------- |
| **stable** | Getestete Versionen. Die richtige Wahl für ein System, das laufen soll. |
| **beta** | Neuere Versionen, noch nicht vollständig getestet. Hieß früher *latest*. |
| **GitHub** | Der Entwicklungsstand. Auch unfertige Zwischenstände. |

Dieselbe Versionsnummer kann in allen dreien stehen, wenn sich wenig getan hat.
Sie kann aber auch weit auseinanderliegen. Genau daher kommt die häufige Frage,
warum eine im Forum genannte Version nicht zum Update angeboten wird.

Welches Repository benutzt wird, steht in den
[Systemeinstellungen](/docs/admin/settings.md), Einzelheiten unter
[Repositories](/docs/basics/repositories.md).

## Eine einzelne Version aus beta oder GitHub

Früher musste man dafür das ganze Repository umstellen und hinterher wieder
zurück, was regelmäßig vergessen wurde. Das ist nicht mehr nötig: Über
**Installieren aus eigener Quelle** in der Werkzeugleiste (das Octocat-Symbol)
lässt sich eine einzelne Version aus npm oder von GitHub holen, während alles
Übrige aus *stable* kommt.

!> **Von GitHub nur nach Rücksprache mit dem Entwickler.** Dort liegt der
Arbeitsstand, nicht eine Veröffentlichung. Eine unfertige Version kann die
Installation unbrauchbar machen. Wer eine Testversion einspielt, sollte vorher
eine [Sicherung](/docs/config/backup.md) haben und wissen, wie er zurückkommt.

## Was man nicht tun sollte

!> **Kein `npm install` von Hand.** Der Weg

```bash
cd /opt/iobroker
npm install iobroker.<adaptername>
```

stand früher in vielen Anleitungen. Auf heutigen Installationen führt er zu
Rechteproblemen oder schlägt fehl, weil npm dabei als der falsche Benutzer
arbeitet. Die `iobroker`-Befehle erledigen dasselbe und setzen die Rechte
richtig. Ist es doch passiert, hilft der
[Installation Fixer](/docs/trouble/install_fixer.md).
