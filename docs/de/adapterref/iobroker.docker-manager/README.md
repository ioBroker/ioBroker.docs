---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.docker-manager/README.md
title: ioBroker Docker Manager Adapter
hash: e8mI5CeLmFSozh/5vqtfUDR3jl8rVjakBC7nLylVF78=
---
![Logo](../../../en/adapterref/iobroker.docker-manager/admin/docker-manager.svg)

![Anzahl der Installationen](http://iobroker.live/badges/docker-manager-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.docker-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.docker-manager.svg)

# IoBroker Docker Manager Adapter
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.docker-manager/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/docker-manager/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einführung
Dieser Adapter ist eine grafische Benutzeroberfläche zur Verwaltung von Docker-Containern.
Er ermöglicht Ihnen das einfache Erstellen, Starten, Stoppen und Löschen von Docker-Containern direkt über die ioBroker-Administrationsoberfläche.

Der Adapter bietet eine benutzerfreundliche Möglichkeit, Ihre Docker-Umgebung zu verwalten, ohne Befehlszeilentools verwenden zu müssen.

### Erklärung des Docker-Images und des Containers
Docker ist eine Open-Source-Plattform zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von Anwendungen in Containern.
Container sind schlanke, isolierte Umgebungen, die alle notwendigen Komponenten wie Code, Laufzeit, Bibliotheken und Konfigurationen für die Ausführung einer Anwendung enthalten.
Mit Docker können Entwickler Anwendungen unabhängig von der zugrunde liegenden Infrastruktur konsistent und portabel bereitstellen.
Dies erleichtert die Teamzusammenarbeit, vereinfacht die Ausführung von Anwendungen auf verschiedenen Systemen und verbessert die Skalierbarkeit.

Ein Docker-Image ist ein kompaktes, eigenständiges und ausführbares Softwarepaket, das alles enthält, was zum Ausführen einer Software benötigt wird, einschließlich Code, Laufzeit, Bibliotheken, Umgebungsvariablen und Konfigurationsdateien.
Stellen Sie es sich als eine Momentaufnahme einer Anwendung und ihrer Abhängigkeiten zu einem bestimmten Zeitpunkt vor.
In der ioBroker-Notation entspricht es einem Adapter.

Ein Docker-Container hingegen ist eine Laufzeitinstanz eines Docker-Images. Es handelt sich um eine schlanke, isolierte Umgebung, in der die durch das Docker-Image definierte Anwendung ausgeführt wird.
Wenn Sie ein Docker-Image ausführen, wird ein Container erstellt, der die Anwendung und ihre Abhängigkeiten kapselt und so eine konsistente Ausführung in verschiedenen Umgebungen ermöglicht.
In der ioBroker-Notation entspricht dies einer Adapterinstanz.

## Voraussetzungen
– Docker muss auf Ihrem System installiert und ausgeführt sein.
- Der Benutzer, der den ioBroker-Prozess ausführt, muss über die Berechtigung zum Zugriff auf den Docker-Daemon verfügen. Dies geschieht typischerweise durch Hinzufügen des Benutzers zur Gruppe „Docker“. Alternativ können Sie auch „iob fix“ aufrufen, um die Berechtigungen festzulegen.

## So installieren Sie Docker
- Installationsanweisungen finden Sie in der offiziellen Docker-Dokumentation: https://docs.docker.com/get-docker/
- Stellen Sie nach der Installation von Docker sicher, dass der Docker-Dienst ausgeführt wird. Sie können den Status des Docker-Dienstes mit dem folgenden Befehl überprüfen:
- Unter Linux: `systemctl status docker`
– Unter Windows und macOS sollte Docker Desktop ausgeführt werden.

## Verwenden der Docker-API
Der Adapter kann die Docker-API verwenden, um mit dem Docker-Daemon auf anderen Hosts zu kommunizieren. Um diese Funktion zu aktivieren, müssen Sie den Docker-Daemon so konfigurieren, dass er auf einem TCP-Socket lauscht.

### Docker-API unter Linux aktivieren
1. Öffnen Sie die Konfigurationsdatei des Docker-Dienstes. Der Speicherort dieser Datei kann je nach Linux-Distribution variieren. Gängige Speicherorte sind:
- `/lib/systemd/system/docker.service`
- `/etc/docker/daemon.json`
- `/etc/systemd/system/docker.service`
2. Wenn die Datei `/etc/docker/daemon.json` heißt, fügen Sie den Eintrag `hosts` hinzu oder ändern Sie ihn, um den TCP-Socket einzuschließen. Beispiel:

```json
{
    "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}
```

Wenn es sich bei der Datei um eine systemd-Dienstdatei handelt (z. B. `/lib/systemd/system/docker.service`), ändern Sie die Zeile `ExecStart`, um die Option `-H tcp://0.0.0.0:2375` einzuschließen. Beispiel:

```
ExecStart=/usr/bin/dockerd -H fd:// -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock
```

3. Speichern Sie die Änderungen und beenden Sie den Editor.
4. Starten Sie den Docker-Dienst neu, um die Änderungen zu übernehmen:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

5. Überprüfen Sie, ob der Docker-Daemon auf dem TCP-Socket lauscht, indem Sie Folgendes ausführen:

```bash
netstat -tuln | grep 2375
```

## Aufgaben
- BackItUp sollte `/opt/iobroker/docker-volumes` unterstützen
- Denken Sie daran, dass der js-Controller Docker entfernt, die nicht mehr verwendet werden, aber ein Label haben
- Docker-Installer: `iob docker <remove>`

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 0.1.3 (2025-10-15)

- (@GermanBluefox) Updated packages

### 0.1.2 (2025-10-09)

- (@GermanBluefox) Added volume browsing
- (@GermanBluefox) Added text file read from volume

### 0.1.1 (2025-09-26)

- (@GermanBluefox) Added network tab

### 0.0.3 (2025-09-17)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>