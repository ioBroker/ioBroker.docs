---
title:       "Installation von Node.js und npm"
lastChanged: "13.10.2022"
---


!> Mit Einführung des Installationsskripts ist eine getrennte Installation von Node.js und npm auf üblichen Linux Systemen nicht mehr notwendig! Siehe [Installation unter Linux][]

ioBroker und Adapter sind vorwiegend in der Programmiersprache JavaScript
geschrieben und da ein Computer Javascript nicht direkt ausführen kann,
benötigt er dazu die Laufzeitumgebung Node.js. 

?> Wir empfehlen die Installation von ioBroker auf Debian und Ubuntu basierten Linux Distributionen.

Node.js wird hier bei Bedarf mit den folgenden Befehlen installiert:

```curl -sL https://deb.nodesource.com/setup_aa.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

Wobei aa mit der zu installierenden Versionsnummer von Node.js zu ersetzen ist.

!> Stand Oktober 2022 ist die Version 16 von Node.js für ioBroker empfohlen! 
!> Ungerade Node.js Versionen dürfen nicht verwendet werden.


Weiterführende Informationen zur Installation von Node.js für unterschiedlichste Betriebssysteme 
sind hier [Node.js-Foundation](https://nodejs.org/en/download/package-manager/) zu finden.



[Installation unter Linux]: https://www.iobroker.net/#de/documentation/install/linux.md
