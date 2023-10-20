---
title:       "Anforderungen"
lastChanged: "20.10.2023"
---


## Systemanforderungen
| Betriebssystem | Varianten | Hardwareumgebungen (z.B.) | Mindestanforderungen für ioBroker | Empfohlene Ressourcen für ioBroker 
|---|:---------:|:---------:|:---------:|:---------:|
Linux-Distributionen | Arch, <br>Debian, <br> Gentoo, <br> Red-Hat, <br> Slackware<sup>1</sup> | <br> Raspberry PI, <br> Einplantinencomputer, <br> Mini-PC (z.B. NUC), <br> Hardware mit einer Virtualisierungsumgebung | 2 GB RAM <br> 30 GByte HDD | >= 4 GB RAM <br> >30 GByte HDD
Docker | | Mini-PC (z.B. NUC), <br> NAS <br> | x GB RAM <br> y GByte HDD | x GB RAM <br> y GByte HDD
Windows | Windows xx | PC, <br> Mini-PC (z.B. NUC)| x GB RAM <br> y GByte HDD | x GB RAM <br> y GByte HDD
macOS | | MAC |x GB RAM <br> y GByte HDD | x GB RAM <br> y GByte HDD

<sup>1</sup> Derivate der genannten Distributionen können ebenfalls verwendet werden

<br>
<br>
Es wird empfohlen ioBroker auf einer Debian und Ubuntu basierten Linux Distributionen zu installieren.

ioBroker kann auf allen Systemen installiert werden, auf denen Node.js zur Verfügung steht.

Achte bei der Hardwareauswahl auf den Stromverbrauch der Hardware, da ioBroker rund um die Uhr (24/7 Betrieb) laufen wird. Wenige Watt Unterschied machen sich im Laufe des Jahres beim Stromverbrauch bemerkbar.
