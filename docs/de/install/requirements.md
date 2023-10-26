---
title:       "Anforderungen"
lastChanged: "21.10.2023"
---


## Systemanforderungen
| Betriebssystem | Varianten | Hardwareumgebungen (z.B.) | Mindestanforderungen für ioBroker | Empfohlene Ressourcen für ioBroker <sup>2</sup> 
|---|:---------:|:---------:|:---------:|:---------:|
Linux-Distributionen | Empfehlung: Debian inkl. entsprechender Derivate <sup>1</sup> | Raspberry PI,  Einplantinencomputer, Mini-PC (z.B. NUC), Hardware mit einer Virtualisierungsumgebung | 2 GB RAM, 32 GB Speicherkapazität  | >= 4 GB (besser 6 GB - 8 GB) RAM , >= 64 GB Speicherkapazität 
Docker | | Mini-PC (z.B. NUC), NAS <sup>3</sup> | 2 GB RAM, 32 GB Speicherkapazität  | >= 4 GB (besser 6 GB - 8 GB) RAM , >= 64 GB Speicherkapazität 
Windows | | PC, Mini-PC (z.B. NUC)| 4 GB RAM, 50 GB Speicherkapazität  (inkl. OS) | 8 GB RAM, 100 GB Speicherkapazität  (inkl. OS)
https://www.iobroker.net/#de/documentation/install/windows.md
<sup>1</sup> Es wird empfohlen ioBroker auf einer Debian/Ubuntu basierten Linux Distributionen (Serverversion ohne Desktop!) zu installieren. Die Installation auf einer anderen Linuxdistribution ist generell möglich (solange die gültige Node.js Version unterstützt wird) bedarf aber Expertenwissens, da die Standardskripte zur Installation / Pflege sowie Anleitungen auf Debian abgestimmt sind

<sup>2</sup> Diese Werte basieren auf Erfahrungen einer typischen Durchschnittsinstallation eines ioBroker Systems mit ~40 aktiven Adaptern, Grafana und einer externen Datenbank

 <sup>3</sup> Für die Installation auf einem NAS gelten die Anforderungen unter Docker, zuzüglich weiterer Ressourcen für die NAS-eigenen Aufgaben.


- ioBroker kann auf allen Systemen installiert werden, auf denen Node.js zur Verfügung steht.
- Der benötigte RAM sowie die Speicherkapazität steigt, wenn z.B. Datenpunkte historisiert werden (z.b. mit dem History Adapter welcher Text Dateien auf dem System speichert) oder wenn Datenbanken wie Influx oder MySQL oder andere Anwendungen auf diesem System zusätzlich installiert und betrieben werden
- Achte bei der Hardwareauswahl auf den Stromverbrauch der Hardware, da ioBroker rund um die Uhr (24/7 Betrieb) laufen wird. Wenige Watt Unterschied machen sich im Laufe des Jahres beim Stromverbrauch bemerkbar.
