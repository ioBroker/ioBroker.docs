---
title:       "dev-server"
lastChanged: "08.09.2026"
---

# Entwickeln mit dem dev-server

Der schlechteste Weg, einen Adapter zu entwickeln, ist der auf der eigenen
Hausautomatisierung. Jeder Fehlversuch legt eine laufende Anlage lahm, jede
Änderung muss hochgeladen werden, und den Adapter im Debugger anzuhalten heißt,
dass währenddessen nichts mehr geregelt wird.

Der **dev-server** löst das. Er richtet im Projektordner eine eigene kleine
ioBroker-Installation ein, die nur diesen einen Adapter kennt. Sie hat einen
eigenen Admin, ein eigenes Verzeichnis, eigene Objekte und stört nichts.

## Einrichten

Der dev-server wird im Ordner des Adapters ausgeführt, also dort, wo die
`io-package.json` liegt.

```bash
npm install --global @iobroker/dev-server
dev-server setup
```

Das Einrichten lädt einen js-controller und einen Admin herunter und legt sie im
Unterordner `.dev-server` ab. Beim ersten Mal dauert das ein paar Minuten,
danach nicht mehr.

Nützliche Angaben beim Einrichten:

* `--adminPort <nummer>`: für den Fall, dass die Voreinstellung mit etwas
  anderem kollidiert.
* `--jsController <version>` und `--admin <version>`: um gegen eine bestimmte
  Version zu entwickeln, etwa die älteste, die der Adapter unterstützen soll.
* `--backupFile <datei>`: richtet die Umgebung aus einem ioBroker-Backup ein.
  Damit lässt sich ein Fehler nachstellen, den ein Benutzer gemeldet hat.

?> Der Ordner `.dev-server` gehört in die `.gitignore`. Das vom Adapter Creator
erzeugte Gerüst hat ihn bereits dort stehen.

## Arbeiten

| Befehl | Wirkung |
| ------ | ------- |
| `dev-server watch` | Startet alles und **startet den Adapter bei jeder Codeänderung neu**. Der Normalfall beim Entwickeln. |
| `dev-server run` | Startet die Umgebung, lässt den Adapter aber stehen. Zum Arbeiten an der Konfigurationsoberfläche. |
| `dev-server debug` | Startet den Adapter so, dass sich ein Debugger anhängen kann. Mit `--wait` wartet er, bis der Debugger da ist. |
| `dev-server upload` | Überträgt den aktuellen Stand in die Umgebung. Nötig nach Änderungen an der `io-package.json`, weil die nur beim Hochladen gelesen wird. |
| `dev-server update` | Bringt js-controller und Admin der Umgebung auf den neuesten Stand. |

Das Protokoll läuft dabei im Terminal mit. Man sieht also unmittelbar, was der
eigene Adapter tut, ohne im Admin nach dem Log zu suchen.

!> Nach einer Änderung an der `io-package.json` reicht ein Neustart nicht. Erst
`dev-server upload` bringt neue Instanzobjekte, geänderte
Konfigurationsvorgaben oder eine neue Betriebsart in die Umgebung.

## Mehrere Umgebungen

Mit **Profilen** lassen sich mehrere Umgebungen nebeneinander betreiben, zum
Beispiel eine mit dem ältesten unterstützten js-controller und eine mit dem
neuesten.

```bash
dev-server profile
```

listet die vorhandenen Profile auf. Die übrigen Befehle nehmen den Profilnamen
entgegen und arbeiten dann in dieser Umgebung.

## Voraussetzungen und Grenzen

Der dev-server läuft unter Windows, Linux und macOS und braucht mindestens
Node.js 14. Alle Anschlüsse, die er öffnet, sind auf `127.0.0.1` beschränkt,
die Umgebung ist also von außen nicht erreichbar.

Sie ersetzt keinen echten Test auf einem richtigen System. Was sie ersetzt, ist
das zwanzigmalige Hochladen zwischendurch.

## Der übrige Werkzeugkasten

Neben dem dev-server gehört `@iobroker/adapter-dev` ins Projekt. Es liefert die
Skripte für Übersetzung und Bau:

```bash
npm run translate          # übersetzt neue englische Texte in alle Sprachen
npm run build              # baut TypeScript und React-Oberflächen
```

Beides ist im Gerüst des Adapter Creators bereits eingetragen. Siehe
[io-package.json](/docs/dev/iopackage.md) zum Umgang mit den Übersetzungen und
[Adaptertests](/docs/dev/adaptertesting.md) zu den mitgelieferten Tests.
