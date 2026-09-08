---
title:       "macOS"
lastChanged: "07.09.2026"
---

# ioBroker unter macOS

ioBroker läuft auf macOS, weil Node.js dort läuft. Für den Dauerbetrieb ist es
trotzdem nicht der vorgesehene Weg.

!> **Für eine Haussteuerung, die verlässlich laufen soll, ist macOS die falsche
   Wahl.** Das Installationsskript, die Anleitungen im Forum und die Werkzeuge
   zur Fehlersuche sind auf Debian und seine Abkömmlinge abgestimmt. Wer auf
   einem Mac festhängt, fährt mit
   [Docker](https://www.iobroker.net/#de/documentation/install/docker.md) oder
   einer virtuellen Maschine mit Linux besser als mit einer Installation direkt
   im System.

Sinnvoll ist macOS für zwei Zwecke: zum Ausprobieren und zum Entwickeln von
Adaptern.

## Zum Ausprobieren und Entwickeln

Voraussetzung ist eine aktuelle LTS-Version von Node.js, am einfachsten über
[Homebrew](https://brew.sh) oder einen Versionsverwalter wie `nvm`. Welche
Version derzeit empfohlen wird, steht unter
[Node.js & npm](https://www.iobroker.net/#de/documentation/install/updatenode.md).

Danach in einem eigenen Verzeichnis:

```bash
mkdir iobroker && cd iobroker
npm install iobroker.js-controller
npx iobroker setup first
npx iobroker start
```

Die Oberfläche des Admin-Adapters ist anschließend unter
`http://localhost:8081` erreichbar, sobald dieser installiert und gestartet ist:

```bash
npx iobroker add admin
```

?> Der `iob`-Kurzbefehl wird auf diesem Weg nicht angelegt. Die Befehle laufen
   deshalb über `npx iobroker ...` aus dem Installationsverzeichnis heraus.

## Was zu erwarten ist

* Adapter, die auf Linux-Werkzeuge oder auf `systemd` zugreifen, funktionieren
  nicht oder nur eingeschränkt.
* Angesteckte Hardware - Funk-Sticks, serielle Adapter - verhält sich unter
  macOS anders und ist im Forum kaum dokumentiert.
* Ein automatischer Start beim Hochfahren muss selbst eingerichtet werden.

## Der bessere Weg auf einem Mac

Für die Entwicklung eines eigenen Adapters ist ohnehin nicht eine volle
Installation gefragt, sondern der `dev-server`, der eine gekapselte
ioBroker-Umgebung für genau einen Adapter aufsetzt. Für den Betrieb zu Hause
gilt: ein eigenes, sparsames Gerät mit Linux - siehe
[Hardware](https://www.iobroker.net/#de/documentation/install/hardware.md).
