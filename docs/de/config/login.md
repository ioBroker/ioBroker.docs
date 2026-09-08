---
title:       "Authentifizierung"
lastChanged: "08.09.2026"
---

# Authentifizierung

!> In einer frischen Installation ist **keine Anmeldung** aktiv. Wer die Adresse
des Servers kennt, kann den Admin öffnen und alles ändern. Im abgeschotteten
Heimnetz ist das bequem, sobald ioBroker aber darüber hinaus erreichbar ist, ist
es das erste, was eingeschaltet gehört.

Die Anmeldung wird **je Instanz** eingeschaltet, nicht einmal für das ganze
System. Jede Oberfläche bringt einen eigenen Webserver mit und hat deshalb einen
eigenen Schalter: der Admin, jede `web`-Instanz, `vis` über die zugehörige
`web`-Instanz und so weiter. Die Benutzer und Gruppen sind dabei überall
dieselben, siehe
[Zugriffsverwaltung](/docs/config/userrights.md).

## Der Admin

Im Reiter **Instanzen** öffnet der Schraubenschlüssel an `admin.0` die
Konfiguration:

<img src="media/config_admin_authentifizierung.png" alt="Die allgemeinen Einstellungen der Admin-Instanz" width="864" />

Wichtig sind zwei Felder:

| Feld | Bedeutung |
| --- | --- |
| **Authentifizierung** | Schaltet die Anmeldemaske ein. Ohne Haken kommt jeder ohne Passwort hinein. |
| **Ausführen als** | Legt fest, mit wessen Rechten gearbeitet wird, solange keine Anmeldung stattfindet. Voreingestellt ist `admin`, also Vollzugriff. |

Vorgehen:

1. Im Reiter [Benutzer](/docs/admin/users.md)
   dem Benutzer `admin` ein Passwort geben. **Vorher** nicht die
   Authentifizierung einschalten, sonst gibt es nichts, womit man sich anmelden
   könnte.
2. Das Passwort notieren, bevor es weitergeht.
3. In den Einstellungen von `admin.0` den Haken bei **Authentifizierung**
   setzen und speichern. Die Instanz startet neu.
4. Die Seite neu laden. Jetzt erscheint die Anmeldemaske.

?> Sperrt man sich aus, hilft die Kommandozeile. `iobroker set admin.0
--auth false` schaltet die Anmeldung wieder ab. Derselbe Befehl kennt auch
`--secure` für HTTPS und `--ttl` für die Gültigkeitsdauer einer Anmeldung in
Sekunden. Alle Befehle stehen unter
[CLI](/docs/config/cli.md).

Die weiteren Felder auf dieser Seite betreffen nicht die Anmeldung: **IP** und
**Port** legen fest, worauf der Admin lauscht, **Verschlüsselte Verbindung
(HTTPS)** gehört zur
[Verschlüsselung](/docs/config/encryption.md),
und **ACME-Challenges beantworten** braucht der `acme`-Adapter, um sich ein
Let's-Encrypt-Zertifikat zu holen, ohne dass der Admin dafür gestoppt werden
muss.

Im Reiter **Zugriff auf Instanzen (Einfacher Modus)** lässt sich zusätzlich
einschränken, welche Instanz-Konfigurationsseiten überhaupt erreichbar sind und
welche Benutzer sie öffnen dürfen.

## Der web-Adapter

Bei `web.0` heißt der Schalter **Authentifikation** und sitzt direkt neben der
Verschlüsselung:

<img src="media/config_web_authentifizierung.png" alt="Die allgemeinen Einstellungen der web-Instanz" width="900" />

Solange er aus ist, sind die beiden Reiter **Zugangsliste** und
**Benutzerzugriffsliste** ausgegraut. Mit eingeschalteter Anmeldung werden sie
nutzbar und erlauben es, den Zugriff auf einzelne Seiten und je Benutzer weiter
einzugrenzen.

?> Wer den Zugriff nur für vis braucht, schaltet die Anmeldung an der
`web`-Instanz ein, unter der vis läuft. vis selbst hat keinen eigenen
Webserver.

## Was danach zu prüfen ist

Adapter, die selbst auf eine dieser Oberflächen zugreifen, brauchen nun
Zugangsdaten. Das betrifft vor allem Verbindungen von außen und Skripte, die
über HTTP auf `web` zugreifen. Nach dem Umstellen deshalb einmal das
[Protokoll](/docs/admin/log.md) ansehen und
auf Meldungen über abgewiesene Anfragen achten.

!> Anmeldung allein reicht nicht, wenn ioBroker aus dem Internet erreichbar ist.
Das Passwort geht sonst unverschlüsselt über die Leitung. Dann gehört die
[Verschlüsselung](/docs/config/encryption.md)
dazu, oder besser der Weg über den
[iot-Adapter](/docs/cloud/iot.md), der ganz
ohne offene Ports auskommt.
