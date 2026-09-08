---
title:       "Die ersten Schritte"
lastChanged: "08.09.2026"
---

# Die ersten Schritte

ioBroker ist installiert und läuft. Diese Seite geht die Handgriffe durch, die
vor allem anderen kommen. Sie dauern zusammen etwa eine halbe Stunde und
ersparen später viel Ärger.

?> Noch nicht installiert? Dann zuerst
[Installation](/docs/install/README.md).

## 1. Die Oberfläche öffnen

Im Browser die Adresse des Servers mit dem Port `8081` aufrufen:

```
http://<adresse-des-servers>:8081
```

Es erscheint der Admin, ohne Anmeldung. Das ist zunächst richtig so und wird in
Schritt 4 geändert.

## 2. Die Systemeinstellungen ausfüllen

Unten links über das Zahnrad die
[Systemeinstellungen](/docs/admin/settings.md)
öffnen. Vier Angaben sollten stimmen, bevor der erste Adapter dazukommt:

| Angabe | Warum |
| --- | --- |
| **Sprache** | Gilt für die Oberfläche und für die Namen, die Adapter anlegen. |
| **Standort** | Aus Breiten- und Längengrad berechnet ioBroker Sonnenaufgang und Sonnenuntergang. Fast jede Zeitautomatik hängt daran. |
| **Temperatureinheit** | Grad Celsius oder Fahrenheit. |
| **Währung** | Für Adapter, die Preise oder Verbrauchskosten liefern. |

!> Den Standort wirklich eintragen. Wird das versäumt, rechnet ioBroker mit
einem voreingestellten Ort, und die Beleuchtung geht zur falschen Zeit an.

## 3. Nach Updates sehen

Im Reiter [Hosts](/docs/admin/hosts.md)
steht, ob eine neuere Version des js-controllers vorliegt. Bei einer frischen
Installation ist meist alles aktuell. Wie ein Update abläuft, steht unter
[Updates einspielen](/docs/tutorial/updates.md).

## 4. Ein Passwort vergeben

Solange keine Anmeldung eingeschaltet ist, kann jeder im Netz die Oberfläche
öffnen und alles ändern.

1. Im Reiter [Benutzer](/docs/admin/users.md)
   dem Benutzer `admin` ein Passwort geben.
2. Danach in den Einstellungen der Instanz `admin.0` die **Authentifizierung**
   einschalten.

Die Reihenfolge ist wichtig: erst das Passwort, dann die Anmeldung. Ausführlich
steht das unter
[Authentifizierung](/docs/config/login.md).

## 5. Die Datensicherung einrichten

Der Schritt, den fast alle aufschieben und später bereuen. Der Adapter
**BackItUp** legt regelmäßig Sicherungen an; ein Ziel außerhalb des Rechners
gehört dazu. Das Vorgehen steht unter
[Datensicherung](/docs/config/backup.md).

?> Danach einmal von Hand eine Sicherung auslösen und nachsehen, ob die Datei
tatsächlich am Ziel angekommen ist. Eine Sicherung, die nie geprüft wurde, ist
eine Vermutung.

## 6. Den ersten Adapter installieren

Jetzt kommt der Teil, wegen dem Sie ioBroker installiert haben. Im Reiter
[Adapter](/docs/admin/adapter.md) den
passenden Adapter suchen und über das Pluszeichen eine Instanz anlegen. Der
Unterschied zwischen Adapter und Instanz und die Fallstricke dabei stehen unter
[Adapter verwalten](/docs/tutorial/adapter.md).

Zum Ausprobieren eignen sich Adapter ohne Hardware, etwa `openweathermap` für
das Wetter oder `ping`, um zu sehen, welche Geräte im Netz erreichbar sind.

## Wie es weitergeht

| Als nächstes | Worum es geht |
| --- | --- |
| [Rundgang](/docs/tutorial/admin.md) | Was die Reiter der Oberfläche tun und welche Sie täglich brauchen. |
| [Adapter verwalten](/docs/tutorial/adapter.md) | Installieren, aktualisieren, wieder loswerden. |
| [Erste Automatisierung](/docs/tutorial/logic.md) | Aus Werten Verhalten machen. |
