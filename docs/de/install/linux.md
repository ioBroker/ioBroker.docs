---
title:       "Linux"
lastChanged: "08.09.2026"
---

# ioBroker unter Linux installieren

Auf einem Linux-System, also auch auf einem Raspberry Pi, wird ioBroker mit
einem einzigen Befehl installiert. Ein Skript prüft das System, lädt fehlende
Pakete nach, installiert eine passende Node.js-Version, legt den Dienst an und
startet ihn.

Node.js muss also **nicht** vorher von Hand installiert werden. Wer das
trotzdem getan hat, sollte vorher unter
[Node.js](/docs/install/nodejs.md) nachlesen, welche Version
zulässig ist.

## Vorher prüfen

Ob die Hardware reicht und welche Systeme unterstützt werden, steht unter
[Anforderungen](/docs/install/requirements.md).

Fünf Punkte, an denen die meisten Installationen scheitern:

* **Nicht als `root` installieren.** Das Skript wird als **normaler Benutzer**
  ausgeführt, ohne `sudo` davor. Dieser Benutzer verwaltet das System später.
  Er darf nicht `iobroker` heißen: diesen Benutzer legt das Skript selbst an.
* **Kein Desktop.** Die Servervariante des Betriebssystems nehmen. ioBroker
  läuft rund um die Uhr und wird über die Konsole verwaltet, eine grafische
  Oberfläche kostet nur Arbeitsspeicher.
* **Debian oder Ubuntu.** Oder etwas, das darauf aufbaut, etwa Raspberry Pi OS
  oder Armbian. Andere Distributionen funktionieren oft, sind im Forum aber
  kaum jemandem vertraut.
* **Am Anfang keine Zwischenschicht.** Docker und Proxmox haben ihre
  Berechtigung, aber jede weitere Ebene steht im Fehlerfall zwischen dem
  Problem und der Lösung. Umziehen lässt sich später jederzeit über ein Backup.
* **Beim Raspberry Pi auf das Netzteil achten.** Ein schwaches Netzteil, etwa
  ein altes Handy-Ladegerät, führt zu Abstürzen, die aussehen wie
  Softwarefehler und keine sind.

## Die Installation

**1. Das Betriebssystem einspielen** und auf den neuesten Stand bringen:

```bash
sudo apt update && sudo apt full-upgrade
```

**2. ioBroker installieren:**

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

Fehlt `curl`, wird es vorher nachinstalliert: `sudo apt install curl`.

Das Skript arbeitet in vier sichtbaren Schritten und braucht je nach Gerät ein
paar Minuten:

```
Installing prerequisites (1/4)
Creating ioBroker user and directory (2/4)
Installing ioBroker (3/4)
Finalizing installation (4/4)
```

Am Ende steht:

```
ioBroker was installed successfully
Open http://localhost:8081 in a browser and start configuring!
```

**3. Die Oberfläche aufrufen.** Vom eigenen Rechner aus unter
`http://<adresse-des-servers>:8081`. Die Adresse ist die des ioBroker-Rechners,
nicht `localhost`, wenn der Browser woanders läuft.

## Nach der Installation

?> Der Befehl `iobroker` steht erst nach einer **neuen Anmeldung** zur
Verfügung. Wer gleich nach der Installation `iobroker` eingibt und
„command not found" liest, meldet sich einmal ab und wieder an. Kurz
geschrieben geht auch `iob`.

Von hier aus weiter:

* [Die ersten Schritte](/docs/tutorial/setup.md) führen durch die
  Ersteinrichtung.
* [Konsolenbefehle](/docs/config/cli.md) für alles, was nicht über die
  Oberfläche geht.
* Läuft etwas nicht, hilft [Fehlerbehebung](/docs/trouble/README.md).

## Andere Wege

| Weg | Wo beschrieben |
| --- | -------------- |
| Docker | [Docker](/docs/install/docker.md) |
| Proxmox | [Proxmox](/docs/install/proxmox.md) |
| Windows | [Windows](/docs/install/windows.md) |
| macOS | [macOS](/docs/install/macos.md) |
