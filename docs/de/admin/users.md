---
title:       "Benutzer"
lastChanged: "10.09.2026"
---

# Reiter Benutzer

Hier werden Benutzer und Gruppen verwaltet. Links stehen die Gruppen, rechts die
Benutzer; ein Benutzer wird einer Gruppe zugeordnet, indem er mit der Maus auf
die Gruppe gezogen wird.

<img src="media/admin_benutzer.png" alt="Der Reiter Benutzer mit Gruppen und Benutzern" width="900" />

Ab Werk gibt es zwei Gruppen:

| Gruppe | Rechte |
| ------ | ------ |
| **Administrator** (`system.group.administrator`) | Darf alles. Hier liegt der Benutzer `admin`. |
| **Benutzer** (`system.group.user`) | Eingeschränkte Rechte. |

Über die Schaltfläche oben rechts wird ein neuer Benutzer angelegt, über die
links eine neue Gruppe. Der Bleistift öffnet die Bearbeitung: Name, Beschreibung,
Symbol, Farbe und beim Benutzer auch das Passwort. Die Rechte einer Gruppe werden
ebenfalls dort gesetzt, getrennt nach Objekten, Zuständen, Benutzern, Dateien
und einigen Sonderrechten. Was die einzelnen Rechte bedeuten, steht unter
[Zugriffsverwaltung](/docs/config/userrights.md).

?> Diese Benutzer sind **nicht** die Benutzer des Betriebssystems. Sie gelten nur
innerhalb von ioBroker: für die Anmeldung am Admin, an vis und an den
Web-Adaptern.

Welche Rechte **neu angelegte** Objekte bekommen, steht in den
[Systemeinstellungen](/docs/admin/settings.md)
unter *Standard ACL*.

## Wie lange eine Anmeldung gilt

Ist die Authentifizierung eingeschaltet, bestimmen zwei Werte in der
Konfiguration der admin-Instanz, wie lange man angemeldet bleibt:

| Einstellung | Bedeutung |
| ----------- | --------- |
| **Dauer der Anmeldesitzung** | Die Lebensdauer des Zugangstokens. Sie läuft nicht ab, während der Admin offen ist: die Oberfläche erneuert das Token selbständig. |
| **Angemeldet bleiben für** | Wie viele Tage die Anmeldung ohne erneute Passworteingabe erhalten bleibt, wenn der Admin zwischendurch geschlossen wird. |

?> Beide Werte standen früher fest bei einer Stunde und einer Woche. Wer den
Admin auf einem Tablet an der Wand betreibt, setzt den zweiten Wert höher; wer
von außen zugreift, eher niedriger.

!> In einer frischen Installation ist die Anmeldung am Admin nicht aktiv. Jeder
im Netz kann die Oberfläche öffnen. Wer ioBroker über das Heimnetz hinaus
erreichbar macht, schaltet die Authentifizierung in der Konfiguration der
admin-Instanz ein und vergibt ein Passwort für `admin`. Mehr dazu unter
[Benutzerrechte](/docs/config/userrights.md).
