---
title:       "Einstieg"
lastChanged: "07.09.2026"
---

# ioBroker installieren

ioBroker ist ein Server. Er läuft rund um die Uhr, wartet auf Ereignisse und
steuert Geräte - auch dann, wenn niemand davorsitzt. Die Installation besteht
deshalb aus zwei Entscheidungen: **worauf** er laufen soll und **wie** er dort
installiert wird.

Dieses Kapitel geht beide der Reihe nach durch.

## Der Weg durch dieses Kapitel

1. [Anforderungen](https://www.iobroker.net/#de/documentation/install/requirements.md) -
   was das System mitbringen muss: Arbeitsspeicher, Platz, Betriebssystem.
2. [Hardware](https://www.iobroker.net/#de/documentation/install/hardware.md) -
   welches Gerät sinnvoll ist und welche Fallen es gibt.
3. Die Installation selbst, je nach gewähltem Weg (siehe unten).
4. [Updaten](https://www.iobroker.net/#de/documentation/install/update.md) -
   was später regelmäßig zu tun ist.

## Die Wege im Überblick

| Weg | Wofür | Aufwand |
|---|---|---|
| [Linux](https://www.iobroker.net/#de/documentation/install/linux.md) | Der Normalfall: Debian, Ubuntu, Raspberry Pi OS. Ein Befehl, fertig. | gering |
| [Docker](https://www.iobroker.net/#de/documentation/install/docker.md) | Wenn schon ein Docker-Host oder ein NAS vorhanden ist. | mittel |
| [Proxmox](https://www.iobroker.net/#de/documentation/install/proxmox.md) | Wenn ioBroker neben anderen Diensten auf einem Server laufen soll. | höher |
| [Windows](https://www.iobroker.net/#de/documentation/install/windows.md) | Wenn kein Linux-Gerät zur Verfügung steht. | gering |
| [macOS](https://www.iobroker.net/#de/documentation/install/macos.md) | Nur zum Entwickeln und Ausprobieren. | - |

?> **Für den Anfang: Linux ohne Zwischenschicht.** Debian, Ubuntu oder
   Raspberry Pi OS in der Servervariante, darauf das Installationsskript. Jede
   weitere Ebene - Docker, eine Virtualisierung - bringt eigene Eigenheiten mit,
   die im Fehlerfall zwischen dem Problem und der Lösung stehen. Umziehen lässt
   sich später jederzeit, ein Backup wandert von jedem dieser Wege auf jeden
   anderen.

## Der Installationsbefehl

Auf allen Linux-Systemen ist es derselbe eine Befehl:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

Er lädt fehlende Pakete nach, installiert eine passende Node.js-Version, legt
den Benutzer `iobroker` an und richtet den Dienst ein. Node.js muss also **nicht**
vorher von Hand installiert werden.

!> Das Skript wird als **normaler Benutzer** ausgeführt, nicht als `root` und
   nicht mit `sudo`. Der Benutzer, unter dem es läuft, verwaltet das System
   später. Die Einzelheiten stehen unter
   [Linux](https://www.iobroker.net/#de/documentation/install/linux.md).

## Fertige Images

Für Raspberry Pi und einige Einplatinenrechner gab es einmal fertige
Abbilder mit vorinstalliertem ioBroker. Sie werden nicht mehr gepflegt - die
darin enthaltenen Betriebssysteme sind seit Jahren ohne Sicherheitsunterstützung.
Der Weg ist heute: aktuelles Betriebssystem selbst installieren, danach das
Installationsskript.

## Nach der Installation

Die Oberfläche erreicht man im Browser unter `http://<adresse-des-servers>:8081`.
Von dort geht es weiter:

* [Admin-Oberfläche](https://www.iobroker.net/#de/documentation/admin/README.md) -
  wie die Verwaltung aufgebaut ist
* [Adapter und Instanzen](https://www.iobroker.net/#de/documentation/basics/adapter.md) -
  wie Geräte und Dienste angebunden werden
* [Sicherung](https://www.iobroker.net/#de/documentation/config/backup.md) -
  das erste Backup einrichten, bevor die erste Konfiguration Arbeit gekostet hat

## Wenn es nicht klappt

* [ioBroker läuft nicht mehr](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)
* [Adapterfehler](https://www.iobroker.net/#de/documentation/trouble/adapter.md)
* Der Befehl `iob diag` fasst den Zustand des Systems zusammen und ist das
  Erste, wonach im [Forum](https://forum.iobroker.net) gefragt wird.
