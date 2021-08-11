
---
title: Arbeiten mit Images
lastChanged: 31.07.2019
---


# Vorgehen bei Verwendung von Images

Nach dem Herunterladen von Images auf der Downloadseite werden diese mit einem Image-Tool (z.B. Balena-Etcher) auf die SD-Karte geschrieben.

Das weitere Vorgehen für jedes einzelne Image kann unterschiedlich sein.
Daher befindet sich auf der Downloadseite unter jedem Image der Button **Info**.

Klickt man dieses an, erscheint das zu diesem Image gehörende ReadMe.

Dort ist das weitere Vorgehen sowie Sicherheitshinweise hinterlegt.

Das aktuelle TestImage "2021-07-30-ioBrokerPi-lite.img"
kann mittels der folgenden Befehle unter Unix auf die SD-Karte geschrieben werden:

**sudo umount /dev/sdx**

**sudo dd bs=1M if=2021-07-30-ioBrokerPi-lite.img of=/dev/sdx***
