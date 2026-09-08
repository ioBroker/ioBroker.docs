---
title:       "Zugriffsverwaltung mit Benutzern und Gruppen"
lastChanged: "08.09.2026"
---

# Zugriffsverwaltung mit Benutzern und Gruppen

Wer sich an ioBroker anmeldet, tut das als **Benutzer**. Was dieser Benutzer
darf, entscheiden zwei Dinge zusammen: die **Rechte seiner Gruppen** und die
**Zugriffsrechte am einzelnen Objekt**. Beides muss erlauben, was er vorhat.
Verbietet eines von beidem, passiert nichts.

?> Diese Benutzer sind nicht die Benutzer des Betriebssystems. Sie gelten nur
innerhalb von ioBroker: für die Anmeldung am Admin, an vis und an den
Web-Adaptern. Angelegt werden sie im Reiter
[Benutzer](/docs/admin/users.md).

## Die beiden vorhandenen Gruppen

| Gruppe | Gedacht für |
| --- | --- |
| **Administrator** (`system.group.administrator`) | Vollzugriff. Hier liegt der Benutzer `admin`. |
| **Benutzer** (`system.group.user`) | Alltagsbetrieb: schalten und ablesen, aber nichts umbauen. |

Ein Benutzer kann in mehreren Gruppen sein. Seine Rechte sind dann die Summe
aller Gruppenrechte.

## Was eine Gruppe darf

Im Reiter **Benutzer** öffnet der Bleistift an einer Gruppe die Bearbeitung, der
Reiter **Berechtigungen** zeigt die Rechte:

<img src="media/config_gruppe_berechtigungen.png" alt="Der Reiter Berechtigungen einer Gruppe mit den fuenf Rechteblöcken" width="588" />

Fünf Blöcke, jeweils mit denselben fünf Rechten:

| Block | Wofür er gilt |
| --- | --- |
| **Objektberechtigungen** | Die Beschreibung eines Datenpunkts: Name, Rolle, Einheit, Zuordnungen. |
| **Zustandsberechtigungen** | Der Wert selbst. Schalten ist ein Schreibzugriff auf den Zustand. |
| **Benutzerberechtigungen** | Benutzer und Gruppen verwalten. |
| **Andere Berechtigungen** | `http-Anfragen`, `Shell-Ausführung` und `sendTo`. |
| **Dateiberechtigungen** | Der Dateispeicher, also alles im Reiter Dateien. |

Die fünf Rechte bedeuten: **lesen** einzeln abrufen, **auflisten** überhaupt
sehen, dass es etwas gibt, **schreiben** ändern, **löschen** entfernen,
**erstellen** neu anlegen.

Die Gruppe *Benutzer* ist ab Werk so eingestellt, dass sie den Alltag abdeckt:

| Block | Erlaubt |
| --- | --- |
| Objekte | lesen, auflisten |
| Zustände | lesen, auflisten, schreiben, erstellen |
| Benutzer | lesen, auflisten |
| Andere | nur `http-Anfragen` |
| Dateien | lesen, auflisten |

Damit kann so ein Benutzer alles sehen und Geräte schalten, aber keine Objekte
umbauen, keine Skripte über `sendTo` anstoßen und keine Shell-Befehle absetzen.

!> `Shell-Ausführung` bedeutet, dass Skripte dieses Benutzers Befehle auf dem
Betriebssystem ausführen dürfen. Dieses Recht gehört nur in die
Administratorgruppe.

## Rechte am einzelnen Objekt

Jedes Objekt trägt eigene Zugriffsrechte, ähnlich wie eine Datei unter Linux.
Sichtbar werden sie im **Expertenmodus**: der Reiter
[Objekte](/docs/admin/objects.md) bekommt
dann eine Spalte mit einer dreistelligen Zahl, etwa `664`. Ein Klick darauf
öffnet die Zugriffssteuerungsliste:

<img src="media/config_objekt_acl.png" alt="Die Zugriffssteuerungsliste eines Datenpunkts" width="722" />

Oben stehen **Besitzer-Nutzer** und **Besitzer-Gruppe**, darunter die Rechte,
getrennt nach Objekt und Zustand und jeweils für drei Rollen:

* **Besitzer**: der eingetragene Benutzer.
* **Gruppe**: wer in der eingetragenen Gruppe ist.
* **Jeder**: alle übrigen angemeldeten Benutzer.

Die drei Ziffern sind genau diese drei Rollen. Lesen zählt `4`, Schreiben `2`,
zusammen also `6`. `664` heißt damit: Besitzer und Gruppe dürfen lesen und
schreiben, alle anderen nur lesen.

Der Schalter **Auf das Objekt und seine Unterobjekte anwenden** überträgt die
Einstellung auf den ganzen Teilbaum. Das ist der bequeme Weg, um zum Beispiel
einen kompletten Adapter-Namensraum auf Nur-Lesen zu setzen.

?> Welche Rechte **neu angelegte** Objekte bekommen, steht in den
[Systemeinstellungen](/docs/admin/settings.md)
unter *Standard ACL*. Bestehende Objekte ändert diese Einstellung nicht.

## Einen eingeschränkten Benutzer anlegen

Der übliche Fall: jemand soll die Visualisierung bedienen, aber nichts am System
ändern können.

1. Im Reiter **Benutzer** einen Benutzer anlegen und ein Passwort vergeben.
2. Ihn in die Gruppe **Benutzer** ziehen, nicht in **Administrator**.
3. In der [Authentifizierung](/docs/config/login.md)
   des betreffenden Web-Adapters die Anmeldung einschalten.
4. Mit diesem Benutzer anmelden und ausprobieren, ob wirklich nur das geht, was
   gehen soll.

Reicht die Gruppe *Benutzer* nicht aus, wird eine eigene Gruppe angelegt und nur
mit den nötigen Rechten versehen. Soll ein einzelner Bereich zusätzlich gesperrt
werden, geschieht das über die Zugriffsrechte am Objekt.

!> Vor dem Umstellen ein
[Backup](/docs/config/backup.md) anlegen.
Wer sich mit zu strengen Rechten selbst aussperrt, kommt sonst nur noch über die
[Kommandozeile](/docs/config/cli.md) wieder
hinein.
