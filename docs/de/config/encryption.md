---
title:       "Verschlüsselung für den Webzugriff"
lastChanged: "08.09.2026"
---

# Verschlüsselung für den Webzugriff

Ohne Verschlüsselung gehen Passwörter und Messwerte im Klartext über die
Leitung. Im eigenen Netz ist das meist hinnehmbar. Sobald eine Oberfläche über
das Heimnetz hinaus erreichbar ist, gehört HTTPS dazu, und zwar zusammen mit der
[Authentifizierung](/docs/config/login.md).
Eines von beidem allein bringt wenig: eine Anmeldung ohne Verschlüsselung
verschickt das Passwort offen, eine Verschlüsselung ohne Anmeldung schützt eine
Tür, die ohnehin offen steht.

## Drei Wege

| Weg | Wann er passt |
| --- | --- |
| **Selbstsigniertes Zertifikat** | Nur im eigenen Netz. Die Verbindung ist verschlüsselt, aber der Browser warnt bei jedem Aufruf, weil niemand für das Zertifikat bürgt. |
| **Let's Encrypt** | Wenn eine eigene Domain vorhanden ist und Port 80 von außen erreichbar gemacht werden kann. Kostenlos und vom Browser akzeptiert. |
| **[iot-Adapter](/docs/cloud/iot.md)** | Wenn kein Port geöffnet werden soll. Die Verbindung geht von innen nach außen, die Verschlüsselung übernimmt der Dienst. |

?> Für den Zugriff von unterwegs ist der dritte Weg der einfachste und der
sicherste, weil dabei kein Port im Router aufgemacht wird. Die beiden anderen
Wege sind für den Zugriff im eigenen Netz gedacht.

## Zertifikate hinterlegen

ioBroker verwaltet die Zertifikate zentral. Sie werden einmal in den
[Systemeinstellungen](/docs/admin/settings.md)
im Reiter **Zertifikate** eingetragen und stehen danach allen Adaptern zur
Auswahl. Ab Werk liegen dort die drei selbstsignierten Einträge
`defaultPublic`, `defaultPrivate` und `defaultChained`.

Dort steht auch, wie ein eigenes Zertifikat eingebunden wird, welche
Dateirechte der Benutzer `iobroker` dafür braucht und wie Let's Encrypt
angebunden wird.

## HTTPS einschalten

In der Konfiguration der jeweiligen Instanz, etwa `web.0` oder `admin.0`, wird
**Verschlüsselte Verbindung (HTTPS)** angehakt. Danach ist die Oberfläche nur
noch über `https://` erreichbar, der alte Aufruf mit `http://` läuft ins Leere.

!> Zuerst am **web**-Adapter ausprobieren, nicht am Admin. Wenn etwas nicht
stimmt, ist der Admin sonst nicht mehr erreichbar. Über die Kommandozeile
kommt man wieder heraus: `iobroker set admin.0 --secure false`.

Der Ablauf, der sich bewährt hat:

1. Zertifikat in den Systemeinstellungen hinterlegen.
2. An `web.0` HTTPS einschalten und speichern.
3. Die Oberfläche im Browser mit `https://` aufrufen und prüfen, dass sie kommt.
4. Ins [Protokoll](/docs/admin/log.md)
   sehen. Fehler beim Lesen der Zertifikatsdateien stehen dort im Klartext.
5. Erst danach denselben Schritt am Admin.

## Was danach nicht mehr geht

Nach dem Umstellen sprechen einige Dinge noch die alte Adresse:

* Lesezeichen und Verknüpfungen auf `http://…`.
* Skripte und Adapter, die per HTTP auf `web` oder auf `simple-api` zugreifen.
* Eingebundene Seiten in einer Visualisierung. Ein Browser lädt in eine
  HTTPS-Seite keine HTTP-Inhalte nach.

Deshalb nach der Umstellung einmal durch die Visualisierung gehen und ins
Protokoll sehen.

?> Ein selbstsigniertes Zertifikat ist auf jeder ioBroker-Installation dasselbe
und damit **nicht sicher** im Sinne einer Identitätsprüfung. Es verschlüsselt
die Verbindung, beweist aber nicht, dass der Server der ist, für den er sich
ausgibt. Für das eigene Netz genügt das, für den Zugriff von außen nicht.
