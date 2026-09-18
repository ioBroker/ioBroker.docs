---
title:       "Zugriffsrechte (ACL) im Detail: Objekte, Zustände und Dateien"
lastChanged: "17.09.2026"
---

# Zugriffsrechte (ACL) im Detail

Diese Seite erklärt, **wie** ioBroker entscheidet, ob ein Benutzer etwas lesen,
auflisten, schreiben, anlegen oder löschen darf: bei Objekten, bei Zuständen und
bei Dateien. Wer nur einen eingeschränkten Benutzer anlegen möchte, findet die
Schritt-für-Schritt-Anleitung unter
[Zugriffsverwaltung mit Benutzern und Gruppen](/docs/config/userrights.md).
Hier geht es um das Modell dahinter.

## Das Wichtigste in Kürze

* Jeder Zugriff muss **zwei Schranken** passieren: die **Gruppenrechte** des
  Benutzers und die **ACL** am einzelnen Eintrag. Sperrt eine davon, passiert
  nichts.
* Die ACL funktioniert wie die Dateirechte unter Linux: **Besitzer**,
  **Besitzergruppe**, **Jeder**, jeweils mit **lesen** und **schreiben**.
* Die Zahl ist **hexadezimal**, nicht oktal wie unter Linux: `0x664`, nicht
  `0664`.
* Es gilt immer **genau eine** der drei Rollen, und zwar die erste, die passt.
* Objekt, Zustand und Datei haben **getrennte** Rechte, auch wenn Objekt und
  Zustand dieselbe ID tragen.
* Der Benutzer **admin** und die Mitglieder der **Administratorgruppe** sind von der ACL
  an Objekten, Dateien und Zuständen ausgenommen und dürfen alles.

## Zwei Schranken

Gruppenrechte und ACL beantworten zwei verschiedene Fragen:

| Schranke          | Frage                                                                                       | Wo eingestellt                                            |
|-------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Gruppenrechte** | Darf dieser Benutzer diese **Art** von Zugriff überhaupt? Zum Beispiel: Zustände schreiben. | an der Gruppe, im Reiter [Benutzer](/docs/admin/users.md) |
| **ACL**           | Gilt das für **diesen einen** Eintrag? Zum Beispiel: für `alias.0.Licht`.                   | am Objekt, am Zustand, an der Datei                       |

Ein Benutzer, dessen Gruppe Zustände schreiben darf, scheitert trotzdem an einem
Datenpunkt, dessen ACL ihm nur Lesen erlaubt. Umgekehrt nützt eine offene ACL
nichts, wenn die Gruppe das Schreiben von Zuständen gar nicht erlaubt.

```
Anfrage: Benutzer "fred" will alias.0.Licht schalten
   │
   ├─ 1. Gruppenrechte: darf fred Zustände schreiben?      nein → abgelehnt
   │                                                          ja ↓
   └─ 2. ACL von alias.0.Licht: welche Rolle hat fred,
         und erlaubt die Ziffer dieser Rolle das Schreiben?  nein → abgelehnt
                                                               ja → erlaubt
```

## Was geschützt wird

| Eintrag                  | Was es ist                                                                                   | Rechte-Feld in der ACL                       |
|--------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------|
| **Objekt**               | Die Beschreibung eines Eintrags: Name, Rolle, Einheit, Einstellungen (`common`, `native`).   | `acl.object`                                 |
| **Zustand**              | Der Wert selbst: `val`, `ack`, Zeitstempel. Schalten ist ein Schreibzugriff auf den Zustand. | `acl.state`                                  |
| **Datei**                | Der Dateispeicher von ioBroker: vis-Projekte, Web-Dateien der Adapter, hochgeladene Bilder.  | `acl.permissions`                            |
| **Benutzer und Gruppen** | Die Objekte `system.user.*` und `system.group.*`.                                            | wie Objekte, zusätzlich eigene Gruppenrechte |
| **Andere**               | Kein Eintrag, sondern Fähigkeiten: HTTP-Abrufe, Shell-Befehle, `sendTo`.                     | keine ACL, nur Gruppenrechte                 |

?> Ein Datenpunkt hat damit **zwei** ACL-Zahlen: eine für das Objekt und eine für
den Zustand. Wer nur schalten können soll, braucht Schreibrechte am
**Zustand**. Schreibrechte am Objekt erlauben dagegen, den Datenpunkt
umzubauen.

## Wer fragt: Benutzer, Gruppen und Sonderfälle

### Benutzer und Gruppen

Benutzer sind Objekte mit der ID `system.user.<name>`, Gruppen haben die ID
`system.group.<name>`. Diese Benutzer gibt es nur innerhalb von ioBroker, mit
den Benutzern des Betriebssystems haben sie nichts zu tun.

Wer in einer Gruppe ist, steht **in der Gruppe**, in `common.members`, nicht beim
Benutzer:

```json
{
  "_id": "system.group.user",
  "type": "group",
  "common": {
    "name": "User",
    "members": ["system.user.fred"],
    "acl": { "...": "..." }
  }
}
```

### Mehrere Gruppen

Ein Benutzer kann in beliebig vielen Gruppen sein. Seine Gruppenrechte sind dann
die **Vereinigung** aller Gruppen: jedes einzelne Recht ist erlaubt, sobald
**eine** seiner Gruppen es erlaubt. Eine Gruppe kann einem Benutzer also nichts
wegnehmen, was eine andere ihm gibt.

Ein Benutzer in **keiner** Gruppe darf nichts.

### Sonderfälle: admin und die Administratorgruppe

| Wer                                         | Gruppenrechte   | ACL an Objekten | ACL an Zuständen | ACL an Dateien |
|---------------------------------------------|-----------------|-----------------|------------------|----------------|
| Benutzer `system.user.admin`                | alle            | ausgenommen     | ausgenommen      | ausgenommen    |
| Mitglieder von `system.group.administrator` | alle            | ausgenommen     | ausgenommen      | ausgenommen    |
| alle anderen                                | wie eingestellt | gilt            | gilt             | gilt           |

Die Administratorgruppe darf damit immer alles, genau wie der Benutzer `admin`.
Ihre Rechte lassen sich im Admin auch nicht bearbeiten. Einschränken lässt sich
deshalb nur ein Benutzer, der **nicht** in dieser Gruppe ist.

!> Wer einen Benutzer in die Administratorgruppe aufnimmt, gibt ihm Zugriff auf
alles, unabhängig von jeder ACL. Für eingeschränkte Zugänge eine eigene Gruppe
anlegen.

### Wer ist „der Benutzer" bei einem Zugriff?

* **Angemeldet im Admin oder in einer Visualisierung:** der angemeldete
  Benutzer.
* **Anmeldung ausgeschaltet:** der Benutzer, der in der Instanz als
  Standardbenutzer eingetragen ist. Bei *admin* und *web* ist das ab Werk
  `admin`, also ohne jede Einschränkung.
* **Adapter und Skripte intern:** Ein Zugriff ohne Benutzerangabe gilt als
  `admin`.

!> ACLs schützen damit vor allem, was **angemeldete Benutzer über die
Web-Oberflächen** tun. Solange die Anmeldung ausgeschaltet ist, greift keine der
hier beschriebenen Einschränkungen.

## Schranke 1: Gruppenrechte

### Die Operationen

Die Rechte einer Gruppe sind in Blöcke geteilt: Objekte, Zustände, Benutzer,
Dateien und Andere. Die ersten vier kennen dieselben Operationen:

| Recht                    | Bedeutung                                                               |
|--------------------------|-------------------------------------------------------------------------|
| **auflisten** (`list`)   | Eine Liste abfragen, etwa den Objektbaum oder den Inhalt eines Ordners. |
| **lesen** (`read`)       | Einen einzelnen Eintrag abrufen oder abonnieren.                        |
| **schreiben** (`write`)  | Einen Eintrag ändern. Bei Objekten auch: neu anlegen.                   |
| **erstellen** (`create`) | Einen Eintrag neu anlegen, wo das getrennt geprüft wird.                |
| **löschen** (`delete`)   | Einen Eintrag entfernen.                                                |

Der Block **Andere** hat drei eigene Rechte:

| Recht                            | Bedeutung                                                          |
|----------------------------------|--------------------------------------------------------------------|
| **http-Anfragen** (`http`)       | Der Server ruft im Auftrag der Oberfläche eine Adresse im Netz ab. |
| **Shell-Ausführung** (`execute`) | Befehle auf dem Betriebssystem ausführen, das Log des Hosts lesen. |
| **sendTo** (`sendto`)            | Nachrichten an Adapter-Instanzen und Hosts schicken.               |

!> **Shell-Ausführung** bedeutet Zugriff auf das Betriebssystem, mit den Rechten
des Benutzers, unter dem ioBroker läuft. Und **sendTo** erlaubt Nachrichten an
jede Instanz und jeden Host, über die sich viele Adapter fernsteuern lassen.
Beide Rechte gehören nur Personen, denen man auch den Server anvertrauen würde.

### Welche Aktion welches Recht braucht

So prüfen die Web-Schnittstellen (Admin, web, socketio und weitere):

| Aktion                                                                   | Recht                    |
|--------------------------------------------------------------------------|--------------------------|
| Objekt lesen, Objekte abonnieren                                         | Objekte: lesen           |
| Objektbaum, Objektliste abfragen                                         | Objekte: auflisten       |
| Objekt ändern oder anlegen                                               | Objekte: schreiben       |
| Objekt löschen                                                           | Objekte: löschen         |
| Zustand lesen, abonnieren, Historie abfragen                             | Zustände: lesen          |
| mehrere Zustände auf einmal abfragen                                     | Zustände: auflisten      |
| Zustand setzen (schalten)                                                | Zustände: schreiben      |
| Zustand anlegen                                                          | Zustände: erstellen      |
| Zustand löschen                                                          | Zustände: löschen        |
| Benutzer oder Gruppe anlegen                                             | Benutzer: erstellen      |
| Benutzer oder Gruppe löschen                                             | Benutzer: löschen        |
| Passwort ändern                                                          | Benutzer: schreiben      |
| Ordnerinhalt anzeigen                                                    | Dateien: auflisten       |
| Datei lesen, prüfen ob sie existiert                                     | Dateien: lesen           |
| Datei anlegen                                                            | Dateien: erstellen       |
| Datei schreiben, umbenennen, Ordner anlegen, Rechte oder Besitzer ändern | Dateien: schreiben       |
| Datei löschen                                                            | Dateien: löschen         |
| Adresse im Netz abrufen lassen                                           | Andere: http-Anfragen    |
| Shell-Befehl, Host-Log lesen                                             | Andere: Shell-Ausführung |
| Nachricht an Instanz oder Host                                           | Andere: sendTo           |

### Voreinstellung der beiden Gruppen

| Block    | Administrator | Benutzer                               |
|----------|---------------|----------------------------------------|
| Objekte  | alles         | auflisten, lesen                       |
| Zustände | alles         | auflisten, lesen, schreiben, erstellen |
| Benutzer | alles         | auflisten, lesen                       |
| Dateien  | alles         | auflisten, lesen                       |
| Andere   | alles         | nur http-Anfragen                      |

Ein Mitglied der Gruppe *Benutzer* kann damit alles sehen und schalten, aber
nichts umbauen, keine Dateien ändern und keine Aufträge an Adapter schicken.

## Schranke 2: die ACL am einzelnen Eintrag

### So sieht sie aus

An einem Objekt, das zugleich Zustand ist:

```json
{
  "_id": "alias.0.Licht",
  "type": "state",
  "common": { "...": "..." },
  "acl": {
    "owner": "system.user.admin",
    "ownerGroup": "system.group.administrator",
    "object": 1636,
    "state": 1636
  }
}
```

An einer Datei im Dateispeicher:

```json
{
  "acl": {
    "owner": "system.user.admin",
    "ownerGroup": "system.group.administrator",
    "permissions": 1636
  }
}
```

`1636` ist die dezimale Schreibweise von `0x664`. Die Datenbank speichert die Zahl
dezimal, der Admin zeigt sie hexadezimal als `664`.

### Die Zahl lesen: wie Linux, aber hexadezimal

Die ACL-Zahl hat drei Stellen, eine je Rolle, in dieser Reihenfolge:

| Stelle | Rolle                             | lesen   | schreiben | ausführen |
|--------|-----------------------------------|---------|-----------|-----------|
| erste  | **Besitzer** (`owner`)            | `0x400` | `0x200`   | `0x100`   |
| zweite | **Besitzergruppe** (`ownerGroup`) | `0x40`  | `0x20`    | `0x10`    |
| dritte | **Jeder** (alle anderen Benutzer) | `0x4`   | `0x2`     | `0x1`     |

Jede Stelle ist die Summe ihrer Rechte, genau wie unter Linux:

| Ziffer | Bedeutung           | Linux-Schreibweise |
|--------|---------------------|--------------------|
| `0`    | nichts              | `---`              |
| `4`    | lesen               | `r--`              |
| `2`    | schreiben           | `-w-`              |
| `6`    | lesen und schreiben | `rw-`              |

Das Ausführen-Bit (`1`) gibt es, ioBroker wertet es aber nicht aus. Eine `7`
bedeutet also dasselbe wie eine `6`.

Übliche Werte:

| Hex     | dezimal | Besitzer         | Gruppe           | Jeder            | Typischer Einsatz                         |
|---------|---------|------------------|------------------|------------------|-------------------------------------------|
| `0x664` | 1636    | lesen, schreiben | lesen, schreiben | lesen            | Voreinstellung                            |
| `0x644` | 1604    | lesen, schreiben | lesen            | lesen            | nur der Besitzer ändert                   |
| `0x666` | 1638    | lesen, schreiben | lesen, schreiben | lesen, schreiben | jeder angemeldete Benutzer darf schreiben |
| `0x660` | 1632    | lesen, schreiben | lesen, schreiben | –                | für Fremde unsichtbar                     |
| `0x640` | 1600    | lesen, schreiben | lesen            | –                | Gruppe liest, Fremde sehen nichts         |
| `0x600` | 1536    | lesen, schreiben | –                | –                | nur der Besitzer                          |
| `0x444` | 1092    | lesen            | lesen            | lesen            | für alle schreibgeschützt                 |

!> In Skripten und in JSON **nie** `664` schreiben. Das ist dezimal 664, also
`0x298`: der Besitzer dürfte nur schreiben und nicht lesen, Gruppe und Jeder
bekämen Bits, die gar nichts bedeuten. Richtig ist `0x664` oder dezimal `1636`.
Auch Linux-Gewohnheit hilft hier nicht: das oktale `0o664` ist dezimal 436, also
`0x1b4`.

### Welche Stelle gilt: immer genau eine Rolle

ioBroker sucht die Rolle des Benutzers in dieser Reihenfolge und nimmt die
**erste**, die passt:

1. Ist der Benutzer der **Besitzer**? Dann gilt nur die **erste** Stelle.
2. Sonst: Ist er in der **Besitzergruppe**, egal ob in seiner ersten oder in
   einer weiteren Gruppe? Dann gilt nur die **zweite** Stelle.
3. Sonst gilt die **dritte** Stelle.

Die Stellen werden nicht zusammengezählt. Wie unter Linux kann der Besitzer
deshalb weniger dürfen als seine Gruppe: Bei `0x464` darf der Besitzer nur
lesen, obwohl die Besitzergruppe schreiben darf. Die zweite Stelle gilt für ihn
nicht, weil schon die erste passt.

### Wenn nichts eingetragen ist

| Fall                             | Was gilt                                                                                                                                    |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Objekt ohne `acl`                | Keine ACL-Prüfung, nur die Gruppenrechte zählen.                                                                                            |
| Zustand ohne eigenes `acl.state` | Die Zahl aus `acl.object` gilt auch für den Zustand.                                                                                        |
| Datei ohne ACL                   | Geprüft wird, als gehöre sie `admin` und der Gruppe *administrator*, mit der Standard-Dateizahl aus den Systemeinstellungen, sonst `0x644`. |

## Wie eine Anfrage geprüft wird

Die folgenden Tabellen gelten für alle Benutzer außer den oben genannten
Sonderfällen. „ACL" meint das Bit der Rolle, die der Benutzer an diesem Eintrag
hat.

### Objekte

| Operation   | Gruppenrecht       | ACL (`acl.object`)                            |
|-------------|--------------------|-----------------------------------------------|
| lesen       | Objekte: lesen     | lesen                                         |
| auflisten   | Objekte: auflisten | lesen, für jedes einzelne Objekt in der Liste |
| schreiben   | Objekte: schreiben | schreiben                                     |
| neu anlegen | Objekte: schreiben | – (es gibt noch keine ACL)                    |
| löschen     | Objekte: löschen   | **schreiben**                                 |

?> Eine Liste enthält nur Objekte, die der Benutzer auch lesen darf. Was seine
ACL nicht lesen lässt, taucht im Objektbaum gar nicht erst auf. Löschen hat kein
eigenes ACL-Bit: wer ein Objekt schreiben darf, darf es mit dem passenden
Gruppenrecht auch löschen.

### Zustände

| Operation         | Gruppenrecht        | ACL (`acl.state`) |
|-------------------|---------------------|-------------------|
| lesen, abonnieren | Zustände: lesen     | lesen             |
| setzen (schalten) | Zustände: schreiben | schreiben         |
| löschen           | Zustände: löschen   | **schreiben**     |

Wird ein Zugriff abgelehnt, schreibt die Instanz eine Warnung ins Log, die mit
`Permission error for user` beginnt und den Benutzer, die ID und den Befehl
nennt.

### Dateien

| Operation                             | Gruppenrecht       | ACL (`acl.permissions`) |
|---------------------------------------|--------------------|-------------------------|
| lesen                                 | Dateien: lesen     | lesen                   |
| Ordnerinhalt anzeigen                 | Dateien: auflisten | lesen                   |
| schreiben, umbenennen, Ordner anlegen | Dateien: schreiben | schreiben               |
| Rechte oder Besitzer ändern           | Dateien: schreiben | schreiben               |
| löschen                               | Dateien: löschen   | siehe Hinweis           |

Eine **neue** Datei gehört dem Benutzer, der sie schreibt. Ihre Rechte kommen
aus der Standard-ACL.

!> Nach dem aktuellen Stand des js-controllers scheitert das **Löschen** von
Dateien für alle Benutzer außerhalb der Administratorgruppe, auch wenn
Gruppenrecht und Datei-ACL es erlauben. Wer Dateien löschen können soll, muss
derzeit in die Administratorgruppe.

### Benutzer und Gruppen

Die Objekte `system.user.*` und `system.group.*` sind gewöhnliche Objekte mit
einer zusätzlichen Schranke. Für sie müssen **drei** Dinge erlauben:

1. das Gruppenrecht im Block **Benutzer**, also lesen, auflisten, schreiben,
   erstellen oder löschen,
2. das passende Gruppenrecht im Block **Objekte**,
3. die ACL des Benutzer- oder Gruppenobjekts.

Die beiden mitgelieferten Gruppen stehen auf `0x644` und gehören `admin`. Ohne
Administratorrechte kann sie deshalb niemand ändern, selbst mit allen Häkchen im
Block *Benutzer*.

## Voreinstellungen für neue Einträge

Was neue Objekte, Zustände und Dateien bekommen, steht in den
[Systemeinstellungen](/docs/admin/settings.md) unter **Standard ACL**.
Gespeichert wird es in `system.config`, im Feld `common.defaultNewAcl`:

```json
"defaultNewAcl": {
  "owner": "system.user.admin",
  "ownerGroup": "system.group.administrator",
  "object": 1636,
  "state": 1636,
  "file": 1636
}
```

Ist dort nichts eingetragen, gilt genau das: Besitzer `admin`, Gruppe
*administrator*, `0x664` für Objekte, Zustände und Dateien.

Wird die Standard-ACL geändert, bekommen auch **bestehende** Objekte die neuen
Werte, allerdings nur die, die noch gar keine ACL haben. Objekte mit eigener ACL
bleiben, wie sie sind.

!> Objekte, die ein Adapter selbst anlegt, gehören ihm. Legt er sie bei einem
Update neu an, stehen auch die Rechte wieder so, wie der Adapter sie vorsieht.
Wo eine Einschränkung dauerhaft halten soll, ist ein
[Alias](/docs/basics/alias.md) der verlässlichere Weg: er gehört Ihnen, und der
Adapter fasst ihn nicht an.

## Rechte setzen

### Im Admin

**Gruppenrechte:** Reiter **Benutzer**, Bleistift an der Gruppe, Reiter
**Berechtigungen**.

<img src="media/config_gruppe_berechtigungen.png" alt="Der Reiter Berechtigungen einer Gruppe" width="588" />

**ACL eines Objekts:** Im Reiter [Objekte](/docs/admin/objects.md) den
**Expertenmodus** einschalten. Dann erscheint eine Spalte mit der ACL-Zahl, ein
Klick darauf öffnet den Dialog:

<img src="media/config_objekt_acl.png" alt="Die Zugriffssteuerungsliste eines Datenpunkts" width="722" />

Oben stehen **Besitzer-Nutzer** und **Besitzer-Gruppe**, darunter die Rechte
getrennt nach Objekt und Zustand, jeweils für **Besitzer**, **Gruppe** und
**Jeder**. Der Schalter **Auf das Objekt und seine Unterobjekte anwenden**
überträgt die Einstellung auf den ganzen Teilbaum.

### Auf der Kommandozeile

Alle Zahlen werden **hexadezimal** gelesen, `644` bedeutet also `0x644`. Benutzer
und Gruppen dürfen ohne Präfix angegeben werden, `fred` wird zu
`system.user.fred`.

```bash
# Objekt- und Zustandsrechte: erst die Objektzahl, dann optional die Zustandszahl
iobroker object chmod 644 664 alias.0.*

# nur die Objektrechte
iobroker object chmod 644 system.adapter.*

# Besitzer und Besitzergruppe von Objekten
iobroker object chown fred user alias.0.*

# Dateirechte: erstes Pfadstück ist der Namensraum, etwa vis-2.0
iobroker chmod 644 /vis-2.0/main/*
iobroker chown fred user /vis-2.0/main/*

# Benutzer und Gruppen
iobroker user add fred --ingroup user
iobroker user passwd fred
iobroker group adduser user fred
iobroker group deluser user fred
iobroker user get fred
iobroker group get user
```

Weitere Befehle stehen unter [Kommandozeile](/docs/config/cli.md).

### Im Skript

Im JavaScript-Adapter mit `extendObject`. Die Zahlen als Hex-Literal schreiben:

```javascript
extendObject('0_userdata.0.Gast.Licht', {
    acl: {
        owner: 'system.user.admin',
        ownerGroup: 'system.group.gast',
        object: 0x644,
        state: 0x664,
    },
});
```

## Linux und ioBroker im Vergleich

|                             | Linux                          | ioBroker                                                |
|-----------------------------|--------------------------------|---------------------------------------------------------|
| Benutzer                    | `uid`                          | `system.user.<name>`                                    |
| Gruppen                     | `gid` und weitere Gruppen      | `system.group.<name>`, Mitglieder stehen in der Gruppe  |
| Rollen                      | Besitzer, Gruppe, Andere       | Besitzer, Besitzergruppe, Jeder                         |
| Rechte-Zahl                 | **oktal**, `0664`              | **hexadezimal**, `0x664`                                |
| welche Rolle gilt           | genau eine, die erste passende | genau eine, die erste passende                          |
| Ausführen-Bit               | ausführen, Ordner betreten     | vorhanden, ohne Bedeutung                               |
| Superuser                   | `root` umgeht alles            | `admin` und die ganze Administratorgruppe umgehen alles |
| zusätzliche Schranke        | –                              | Gruppenrechte je Operation, etwa „Zustände schreiben"   |
| getrennte Rechte je Eintrag | eine Zahl je Datei             | Objekt und Zustand je eine eigene Zahl                  |

## Beispiel: ein Gast, der nur seine eigenen Geräte schaltet

Ziel: Ein Benutzer *gast* sieht alles, schaltet aber nur die Datenpunkte unter
`0_userdata.0.Gast`.

**1. Gruppe und Benutzer anlegen**

```bash
iobroker group add gast
iobroker user add gast --ingroup gast
```

Im Admin, an der Gruppe *gast*, die Rechte setzen:

| Block    | Rechte                      |
|----------|-----------------------------|
| Objekte  | auflisten, lesen            |
| Zustände | auflisten, lesen, schreiben |
| Dateien  | auflisten, lesen            |
| Benutzer | –                           |
| Andere   | –                           |

**2. Die eigenen Datenpunkte der Gruppe geben**

```bash
iobroker object chown admin gast 0_userdata.0.Gast.*
iobroker object chmod 644 664 0_userdata.0.Gast.*
```

**3. Was jetzt passiert**

| Datenpunkt                        | ACL                                     | Rolle von *gast*           | Ergebnis           |
|-----------------------------------|-----------------------------------------|----------------------------|--------------------|
| `0_userdata.0.Gast.Licht`         | Gruppe *gast*, Zustand `0x664`          | Besitzergruppe, Ziffer `6` | sehen und schalten |
| `alias.0.Heizung`                 | Gruppe *administrator*, Zustand `0x664` | Jeder, Ziffer `4`          | nur sehen          |
| `0_userdata.0.Gast.Licht`, Objekt | Objekt `0x644`                          | Besitzergruppe, Ziffer `4` | nicht umbauen      |

Soll *gast* die übrigen Datenpunkte gar nicht erst sehen, bekommen diese als
dritte Stelle eine `0`, etwa `0x660`. Dann fehlen sie in seinem Objektbaum.

**4. Anmelden** — in der [Authentifizierung](/docs/config/login.md) des
Web-Adapters die Anmeldung einschalten, sonst arbeitet jeder als `admin`. Dann
mit *gast* anmelden und prüfen, ob wirklich nur das geht, was gehen soll.

## Fehlersuche

| Beobachtung                                             | Wahrscheinliche Ursache                                                    | Abhilfe                                                 |
|---------------------------------------------------------|----------------------------------------------------------------------------|---------------------------------------------------------|
| Alles ist erlaubt, obwohl Rechte gesetzt sind           | Anmeldung ist aus, es wird als `admin` gearbeitet                          | Anmeldung in der Instanz einschalten                    |
| Der Benutzer sieht einen Datenpunkt nicht im Objektbaum | Gruppenrecht *auflisten* fehlt, oder die ACL lässt seine Rolle nicht lesen | Gruppenrecht prüfen, dann die Ziffer seiner Rolle       |
| Er sieht den Datenpunkt, kann aber nicht schalten       | Schreibrecht am **Zustand** fehlt, oft wurde nur die Objekt-ACL geändert   | `acl.state` prüfen, nicht `acl.object`                  |
| Der Besitzer darf weniger als seine Gruppe              | Es gilt nur die erste Stelle, nicht die zweite                             | erste Stelle anpassen                                   |
| Rechte im Skript gesetzt, danach geht gar nichts        | Zahl dezimal geschrieben, `664` statt `0x664`                              | Hex-Literal verwenden                                   |
| Nach einem Adapter-Update sind die Rechte zurückgesetzt | Der Adapter hat seine Objekte neu angelegt                                 | Alias verwenden                                         |
| Eine Änderung an Benutzer oder Gruppe wirkt nicht       | Die Instanz hat die Rechte zwischengespeichert                             | betroffene Instanz neu starten, etwa *web* oder *admin* |
| Ein Benutzer kann keine Datei löschen                   | Löschen von Dateien geht derzeit nur für die Administratorgruppe           | siehe Hinweis bei Dateien                               |

!> Vor größeren Umstellungen ein [Backup](/docs/config/backup.md) anlegen. Wer
sich mit zu strengen Rechten selbst aussperrt, kommt nur noch über die
[Kommandozeile](/docs/config/cli.md) wieder hinein: `iobroker object chmod` und
`iobroker object chown` arbeiten immer mit Administratorrechten.
