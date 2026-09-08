---
title:       "Benutzer"
lastChanged: "07.09.2026"
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
ebenfalls dort gesetzt, getrennt nach Objekten, Zuständen, Dateien, Benutzern
und den einzelnen Reitern des Admin.

?> Diese Benutzer sind **nicht** die Benutzer des Betriebssystems. Sie gelten nur
innerhalb von ioBroker: für die Anmeldung am Admin, an vis und an den
Web-Adaptern.

Welche Rechte **neu angelegte** Objekte bekommen, steht in den
[Systemeinstellungen](https://www.iobroker.net/#de/documentation/admin/settings.md)
unter *Standard ACL*.

!> In einer frischen Installation ist die Anmeldung am Admin nicht aktiv. Jeder
im Netz kann die Oberfläche öffnen. Wer ioBroker über das Heimnetz hinaus
erreichbar macht, schaltet die Authentifizierung in der Konfiguration der
admin-Instanz ein und vergibt ein Passwort für `admin`. Mehr dazu unter
[Benutzerrechte](https://www.iobroker.net/#de/documentation/config/userrights.md).
