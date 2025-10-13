---
title: Node.js und npm  
lastChanged: 13.10.2025
---

!> Mit dem iobroker-Installationsskript ist eine getrennte Installation von Node.js und npm auf den empfohlenen Linux-Systemen nicht mehr erforderlich! Siehe [Installation unter Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker und Adapter sind vorwiegend in der Programmiersprache JavaScript geschrieben. Da ein Computer JavaScript nicht direkt ausführen kann, wird eine Laufzeitumgebung benötigt – dafür sorgt Node.js.

?> Empfohlen werden Debian- und Ubuntu-basierte Distributionen.

!> Aktuell empfiehlt ioBroker die LTS-Version **Node.js 22**. Ungerade Versionen dürfen nicht verwendet werden.

## Standardmäßiges Update von Node.js

Ab js-controller 5.5.x steht der neue Konsolen-Befehl zur Aktualisierung von Node.js zur Verfügung:

```
iobroker nodejs-update
```

Dieser Befehl lädt und installiert automatisch die empfohlene LTS-Version **Node.js 22** sowie das passende npm.

Möchten Sie gezielt auf eine andere Version (z. B. Node.js 24) wechseln, geben Sie die gewünschte Version als Parameter an:

```
iobroker nodejs-update 24
```

## Alternative manuelle Installation

Falls eine manuelle Installation oder spezielle Version gewünscht ist, verwenden Sie das Nodesource-Repository:

```
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Für eine andere Version passen Sie `setup_22.x` entsprechend an (z. B. `setup_24.x`).
