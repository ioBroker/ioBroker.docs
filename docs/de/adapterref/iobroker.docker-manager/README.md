---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.docker-manager/README.md
title: ioBroker Docker Manager Adapter
hash: L5iZIMplEN0PQPdM6skQTuquEqZU9VMQocqIZzyDjzY=
---
![Logo](../../../en/adapterref/iobroker.docker-manager/admin/docker-manager.svg)

![Anzahl der Installationen](http://iobroker.live/badges/docker-manager-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.docker-manager.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.docker-manager/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/docker-manager/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.docker-manager.svg)

# ioBroker Docker Manager Adapter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einführung

Dieser Adapter ist eine grafische Benutzeroberfläche zur Verwaltung von Docker-Containern. Er ermöglicht das einfache Erstellen, Starten, Stoppen und Löschen von Docker-Containern direkt über die ioBroker-Administrationsoberfläche.

Der Adapter bietet eine benutzerfreundliche Möglichkeit, Ihre Docker-Umgebung zu verwalten, ohne dass Sie Befehlszeilentools verwenden müssen.

### Erläuterung des Docker-Images und des Containers

Docker ist eine Open-Source-Plattform zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von Anwendungen in Containern. Container sind schlanke, isolierte Umgebungen, die alle notwendigen Komponenten wie Code, Laufzeitumgebung, Bibliotheken und Konfigurationen zum Ausführen einer Anwendung enthalten. Mit Docker können Entwickler Anwendungen konsistent und portabel bereitstellen, unabhängig von der zugrunde liegenden Infrastruktur. Dies erleichtert die Zusammenarbeit im Team, vereinfacht die Ausführung von Anwendungen auf verschiedenen Systemen und verbessert die Skalierbarkeit.

Ein Docker-Image ist ein schlankes, eigenständiges und ausführbares Softwarepaket, das alles enthält, was zum Ausführen einer Software benötigt wird, einschließlich Code, Laufzeitumgebung, Bibliotheken, Umgebungsvariablen und Konfigurationsdateien. Man kann es sich als Momentaufnahme einer Anwendung und ihrer Abhängigkeiten zu einem bestimmten Zeitpunkt vorstellen. In der ioBroker-Notation entspricht es einem Adapter.

Ein Docker-Container hingegen ist eine Laufzeitinstanz eines Docker-Images. Er stellt eine schlanke, isolierte Umgebung dar, in der die durch das Docker-Image definierte Anwendung ausgeführt wird. Beim Ausführen eines Docker-Images wird ein Container erstellt, der die Anwendung und ihre Abhängigkeiten kapselt und so einen konsistenten Betrieb in verschiedenen Umgebungen ermöglicht. In der ioBroker-Notation entspricht er einer Adapterinstanz.

## Voraussetzungen

- Sie benötigen Docker, das auf Ihrem System installiert und ausgeführt wird.
- Der Benutzer, der den ioBroker-Prozess ausführt, benötigt die Berechtigung zum Zugriff auf den Docker-Daemon. Dies geschieht üblicherweise durch Hinzufügen des Benutzers zur entsprechenden Berechtigungsliste.`docker` Gruppe. Oder rufen Sie einfach an.`iob fix` um die Berechtigungen festzulegen.

## Wie installiert man Docker?

- Installationsanweisungen finden Sie in der offiziellen Docker-Dokumentation: <https://docs.docker.com/get-docker/>
- Nach der Installation von Docker stellen Sie sicher, dass der Docker-Dienst ausgeführt wird. Sie können den Status des Docker-Dienstes mit folgendem Befehl überprüfen:
  - Unter Linux:`systemctl status docker`
  - Unter Windows und macOS sollte Docker Desktop ausgeführt werden.

## Verwendung der Docker-API

Der Adapter kann die Docker-API nutzen, um mit dem Docker-Daemon auf anderen Hosts zu kommunizieren. Um diese Funktion zu aktivieren, muss der Docker-Daemon so konfiguriert werden, dass er auf einem TCP-Socket lauscht.

### Docker-API unter Linux aktivieren

1. Öffnen Sie die Docker-Dienstkonfigurationsdatei. Der Speicherort dieser Datei kann je nach Ihrer Linux-Distribution variieren. Übliche Speicherorte sind:
   - `/lib/systemd/system/docker.service`
   - `/etc/docker/daemon.json`
   - `/etc/systemd/system/docker.service`
2. Wenn die Datei`/etc/docker/daemon.json` , hinzufügen oder ändern`hosts` Eintrag zum Einbinden des TCP-Sockets. Zum Beispiel:
   ```json
   {
       "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
   }
   ```
   Wenn es sich bei der Datei um eine systemd-Dienstdatei handelt (z. B.`/lib/systemd/system/docker.service` ), modifizieren`ExecStart` Zeile, die die`-H tcp://0.0.0.0:2375` Option. Zum Beispiel:
   ```
   ExecStart=/usr/bin/dockerd -H fd:// -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock 
   ```
3. Änderungen speichern und Editor verlassen.
4. Starten Sie den Docker-Dienst neu, um die Änderungen anzuwenden:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```
5. Überprüfen Sie, ob der Docker-Daemon auf dem TCP-Socket lauscht, indem Sie Folgendes ausführen:
   ```bash
   netstat -tuln | grep 2375
   ```

## Todo

- BackItUp sollte dies unterstützen`/opt/iobroker/docker-volumes`
- Überlegen Sie, ob der js-Controller Docker-Container entfernt, die nicht mehr verwendet werden, aber das Label haben.
- Docker-Installationsprogramm:`iob docker <remove>`
- Fortschrittsanzeige: Image hinzufügen/abrufen, Container erstellen

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.0.1 (2026-08-07)

- (@GermanBluefox) Added an interactive terminal for running containers (xterm.js)
- (@GermanBluefox) Updated GUI to React 19
- (@GermanBluefox) Added better JSON viewer for container configuration
- (@GermanBluefox) Breaking: Node.js 22 is minimum requirement now

### 0.1.5 (2026-01-09)

- (@GermanBluefox) Updated packages

### 0.1.3 (2025-10-15)

- (@GermanBluefox) Updated packages

### 0.1.2 (2025-10-09)

- (@GermanBluefox) Added volume browsing
- (@GermanBluefox) Added a text file read from volume

### 0.1.1 (2025-09-26)

- (@GermanBluefox) Added network tab

### 0.0.3 (2025-09-17)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025-2026 bluefox <dogafox@gmail.com>