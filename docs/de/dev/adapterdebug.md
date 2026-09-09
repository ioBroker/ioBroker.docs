---
title:       "Debugging"
lastChanged: "08.09.2026"
---

# Einen Adapter debuggen

Ein Adapter ist ein Node.js-Programm, also lässt er sich mit den üblichen
Werkzeugen anhalten und Schritt für Schritt durchgehen. Der Debugger von Node.js
ist eingebaut; man muss ihn nur erreichen.

Drei Wege, vom empfohlenen zum letzten Mittel:

| Weg | Wann |
| --- | ---- |
| **dev-server** | Beim Entwickeln. Eigene kleine Installation im Projektordner, `dev-server debug`. Siehe [dev-server](/docs/dev/devserver.md). |
| **`iobroker debug`** | Wenn der Fehler nur auf einem echten System auftritt, mit dessen Konfiguration und Daten. |
| **Von Hand starten** | Wenn man genau steuern will, wie der Prozess anläuft. |

## Der eingebaute Weg: `iobroker debug`

```bash
iobroker debug sayit
iobroker debug sayit.1
```

Der Befehl sucht den Adapter, startet seine Hauptdatei mit dem Node-Inspektor
und hängt sich an. Läuft die Instanz bereits, bricht er ab und sagt das: eine
Instanz kann nicht zweimal laufen. Vorher also `iobroker stop sayit.0`.

| Option | Wirkung |
| ------ | ------- |
| `--wait` | Hält gleich in der ersten Zeile an, statt den Adapter durchlaufen zu lassen. Nötig, wenn der Fehler schon beim Start passiert. |
| `--ip <adresse>` | An welche Adresse der Inspektor gebunden wird. Ohne Angabe nur `127.0.0.1`. |
| `--port <nummer>` | Der Port des Inspektors, sonst 9229. |

## Von Hand

Dasselbe ohne den Befehl:

```bash
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js 0 --debug
```

Wichtig sind zwei Dinge: `--inspect` gehört **vor** die Hauptdatei, es ist eine
Option von Node.js selbst. Und der Adapter braucht seine Instanznummer und
`--debug` als eigene Argumente, sonst versucht er, sich beim Controller
anzumelden.

`--inspect-brk` statt `--inspect` hält in der ersten Zeile an.

## Mit Chrome verbinden

Chrome bringt den Debugger mit. In der Adresszeile:

```
chrome://inspect
```

Unter *Remote Target* erscheint der laufende Adapter, ein Klick auf **inspect**
öffnet die Entwicklerwerkzeuge. Damit stehen Haltepunkte samt Bedingungen,
`watch`, der Aufrufstapel, die Variablenansicht und die Konsole zur Verfügung,
also alles, was man vom Debuggen im Browser kennt.

Läuft ioBroker auf einem anderen Rechner, muss dessen Adresse einmalig unter
**Configure** eingetragen werden, mit demselben Port wie beim Start.

## Mit Visual Studio Code

Den Adapterordner öffnen und in `.vscode/launch.json` zwei Konfigurationen
anlegen:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Adapter starten",
            "program": "${workspaceFolder}/main.js",
            "args": ["0", "--debug"]
        },
        {
            "type": "node",
            "request": "attach",
            "name": "An laufenden Adapter anhängen",
            "address": "127.0.0.1",
            "port": 9229
        }
    ]
}
```

**Adapter starten** führt den Adapter aus VS Code heraus aus. Die Instanz muss
dafür gestoppt sein (`iobroker stop <name>.0`).

![Debuggen in VS Code](media/adapterdebug10.png)

**An laufenden Adapter anhängen** verbindet sich mit einem Adapter, der bereits
mit `--inspect` läuft, auch auf einem anderen Rechner. Dann steht dort die
IP-Adresse des ioBroker-Rechners statt `127.0.0.1`.

![An einen Prozess anhängen](media/adapterdebug11.png)

## Mit WebStorm

WebStorm braucht eine Node.js-Ausführungskonfiguration. Wie sie eingerichtet
wird, steht unter [WebStorm](/docs/dev/webstorm.md).

## Über das Netz debuggen

Damit ein anderer Rechner sich verbinden kann, muss der Inspektor auf einer
erreichbaren Adresse lauschen:

```bash
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js 0 --debug
```

!> **Der Inspektor ist keine Debug-Schnittstelle, sondern eine offene Tür.** Wer
sich damit verbindet, kann beliebigen Code auf dem Rechner ausführen. Es gibt
keine Anmeldung und kein Passwort. `0.0.0.0` gehört deshalb nur in ein
vertrauenswürdiges Netz, nie an einen Router weitergereicht, und der Adapter
wird danach normal neu gestartet. Wer über ein unsicheres Netz muss, leitet den
Port über SSH weiter: `ssh -L 9229:127.0.0.1:9229 benutzer@iobroker-rechner`.
Dann bleibt der Inspektor auf dem Zielrechner an `127.0.0.1` gebunden.
