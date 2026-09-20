---
title:       "Zugangsdaten"
lastChanged: "20.09.2026"
---

# Zugangsdaten

Viele Adapter und Skripte brauchen ein Passwort oder einen API-Schlüssel: die
Anmeldung an einer Kamera, der Schlüssel eines KI-Anbieters, die Zugangsdaten
des Mailkontos. Bisher wurde so etwas an jeder Stelle einzeln hinterlegt, in
der jeweiligen Instanzkonfiguration oder direkt im Skript.

Seit Admin 8 gibt es dafür eine zentrale Ablage. Passwörter und Schlüssel
liegen dort verschlüsselt, und alles, was sie braucht, verweist nur noch über
eine ID darauf.

Das hat drei Vorteile:

* Ein Schlüssel liegt an genau einer Stelle. Ändert er sich, ändern Sie ihn
  einmal statt in jeder Instanz und jedem Skript.
* Skripte lassen sich weitergeben oder im Forum zeigen, ohne dass ein
  Geheimnis mitgeht.
* Sie sehen auf einen Blick, welche Instanz welchen Eintrag benutzt.

?> Es gibt dazu auch ein Video: [Zugangsdaten zentral verwalten](https://youtu.be/mwOQPv-5n24)

## Wo Sie sie finden

Im Admin unter **System**, dort im Reiter **Zugangsdaten**.

![Der Reiter Zugangsdaten in den Systemeinstellungen](media/admin_zugangsdaten_tab.webp)

Die Tabelle zeigt je Eintrag den Typ, die ID, den Namen und die Spalte
**Benutzt von**. Dort steht, welche Instanz den Eintrag gerade verwendet. Bevor
Sie einen Eintrag ändern oder löschen, sehen Sie also, was davon betroffen ist.

## Einen Eintrag anlegen

Über das Plus links oben.

![Der Dialog zum Anlegen](media/admin_zugangsdaten_anlegen.webp)

Es gibt drei Angaben:

**Vorlage.** Sie bestimmt, welche Felder der Eintrag bekommt. Mitgeliefert sind
Vorlagen für die großen KI-Anbieter (Anthropic, ChatGPT, Google Gemini,
DeepSeek), für AWS und Azure, für E-Mail sowie für iobroker.pro und
iobroker.net. Dazu kommen zwei allgemeine Vorlagen: **Login/Passwort** für
alles mit Benutzername und Kennwort, und **Schlüssel** für einen einzelnen
Wert.

![Die verfügbaren Vorlagen](media/admin_zugangsdaten_vorlagen.webp)

**Typ.** Die grobe Einordnung, etwa KI, E-Mail oder Benutzerdefiniert. Sie
dient der Übersicht in der Tabelle.

**Eindeutiger Name.** Unter diesem Namen sprechen Sie den Eintrag später an, in
der Instanzkonfiguration ebenso wie im Skript. Wählen Sie ihn sprechend, zum
Beispiel `Kamera` oder `anthropic`.

Nach **Erstellen** füllen Sie die Felder der Vorlage aus. Passwörter und
Schlüssel werden verschlüsselt gespeichert und in der Oberfläche nicht im
Klartext angezeigt.

## In der Instanzkonfiguration verwenden

Die häufigste Verwendung. Adapter, die den Speicher unterstützen, zeigen statt
eines Eingabefelds eine Auswahlliste der passenden Einträge.

![Auswahl eines Eintrags in den Instanzeinstellungen](media/admin_zugangsdaten_instanz.webp)

Das Beispiel zeigt die KI-Einstellungen des JavaScript-Adapters. Unter
**Anmeldedaten-Typ** wählen Sie `Systemanmeldedaten`, darunter je Anbieter den
gewünschten Eintrag. Über das Plus daneben legen Sie einen neuen Eintrag direkt
an, ohne die Seite zu verlassen.

Genauso funktioniert es beim [KI-Assistenten](/docs/admin/assistant.md) in den
Einstellungen des Admin-Adapters.

## Im JavaScript-Adapter verwenden

Ab JavaScript-Adapter **10.1.1** stehen alle Einträge im Skript als globales
Objekt `SECRETS` bereit.

```javascript
const user = SECRETS.Kamera.user;
const pass = SECRETS.Kamera.password;
const key  = SECRETS.anthropic.key;
```

Nach `SECRETS` folgt der eindeutige Name des Eintrags, danach das gewünschte
Feld. Welche Felder es gibt, hängt von der Vorlage ab.

Drei Eigenschaften sind dabei wichtig:

* Die Werte kommen **bereits entschlüsselt** an, Sie müssen nichts selbst
  entschlüsseln.
* `SECRETS` ist **schreibgeschützt**. Ein Skript kann einen Eintrag lesen, aber
  nicht verändern.
* Änderungen im Admin wirken **sofort**. Das Skript muss dafür nicht neu
  gestartet werden.

Der Skript-Editor kennt die vorhandenen Einträge. Nach `SECRETS.` schlägt er
die Namen vor, nach dem nächsten Punkt genau die Felder, die dieser Eintrag
hat.

Mehr zum Adapter selbst steht unter [JavaScript](/docs/logic/javascript.md).

## In Blockly verwenden

Für [Blockly](/docs/logic/blockly.md) gibt es den Block **Zugangsdaten** in der
Kategorie **System**.

Sie ziehen ihn an die Stelle, an der sonst das Passwort stünde, und wählen in
den beiden Aufklappmenüs den Eintrag und das Feld. Auch hier steht der
Schlüssel nirgends im Projekt.

## Gut zu wissen

* Der Zugangsdaten-Speicher ersetzt die bisherigen Eingabefelder nicht
  überall. Adapter müssen ihn unterstützen. Wo er noch nicht angeboten wird,
  bleibt alles wie gewohnt.
* Der eindeutige Name lässt sich nachträglich ändern, dann müssen Sie aber alle
  Stellen nachziehen, die ihn verwenden. Die Spalte **Benutzt von** zeigt Ihnen
  die Instanzen, Skripte prüfen Sie selbst.

!> Die Einträge liegen verschlüsselt in der Konfiguration dieser Installation.
Sie gehören damit auch in die Sicherung: siehe [Backup](/docs/config/backup.md).
