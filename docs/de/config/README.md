---
title:       "Erweiterte Konfiguration"
lastChanged: "08.09.2026"
---

# Erweiterte Konfiguration

Eine frisch installierte ioBroker-Installation läuft, aber sie ist auf Bequemlichkeit eingestellt, nicht auf Dauerbetrieb: keine Anmeldung, keine
Verschlüsselung, keine Sicherung, alle Daten in den eingebauten Dateidatenbanken.
Für den Anfang ist das richtig. Sobald das System aber ernsthaft benutzt wird,
lohnt sich ein Blick auf die Punkte in diesem Kapitel.

| Seite | Worum es geht |
| --- | --- |
| [Zugriffsverwaltung](/docs/config/userrights.md) | Benutzer, Gruppen und die Rechte am einzelnen Objekt. |
| [Authentifizierung](/docs/config/login.md) | Die Anmeldung an Admin, web und den übrigen Oberflächen einschalten. |
| [Verschlüsselung](/docs/config/encryption.md) | HTTPS und Zertifikate für den Webzugriff. |
| [CLI](/docs/config/cli.md) | Die Befehle auf der Kommandozeile. Der Rettungsweg, wenn die Oberfläche nicht mehr erreichbar ist. |
| [Multihost](/docs/config/multihost.md) | Die Last auf mehrere Rechner verteilen. |
| [Redis](/docs/config/redis.md) | Die Zustände in einer schnelleren Datenbank halten. |
| [Datenaufzeichnung](/docs/config/history.md) | Werte mitschreiben: history, influxdb oder sql, und wie man wechselt. |
| [Schnittstellen](/docs/config/api.md) | Zugänge für alles, was kein Adapter ist: simple-api, rest-api, WebSocket. |
| [Datensicherung](/docs/config/backup.md) | Was gesichert wird, wohin, wie oft und wie es zurückkommt. |

?> Wenn Sie nur eine dieser Seiten lesen, dann die
[Datensicherung](/docs/config/backup.md).
Alles andere lässt sich später nachholen, eine fehlende Sicherung nicht.

Eine sinnvolle Reihenfolge für ein System, das bleiben soll:

1. **Sicherung einrichten** und einmal von Hand auslösen.
2. **Passwort** für den Benutzer `admin` vergeben und die **Anmeldung**
   einschalten.
3. Wenn das System über das Heimnetz hinaus erreichbar sein soll:
   **Verschlüsselung** dazu, oder besser gleich der Weg über den
   [iot-Adapter](/docs/cloud/iot.md).
4. Für weitere Personen im Haushalt **eigene Benutzer** mit eingeschränkten
   Rechten anlegen.
5. Erst wenn das System groß wird: **Redis** und gegebenenfalls **Multihost**.
