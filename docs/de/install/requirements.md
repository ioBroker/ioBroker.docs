---
title:       "Anforderungen"
lastChanged: "21.10.2023"
---


## Systemanforderungen
| Betriebssystem | Varianten | Hardwareumgebungen (z.B.) | Mindestanforderungen für ioBroker | Empfohlene Ressourcen für ioBroker <sup>2</sup> 
|---|:---------:|:---------:|:---------:|:---------:|
Linux-Distributionen | Arch, <br>Debian, <br> Gentoo, <br> Red-Hat, <br> Slackware<sup>1</sup> | <br> Raspberry PI, <br> Einplantinencomputer, <br> Mini-PC (z.B. NUC), <br> Hardware mit einer Virtualisierungsumgebung | 2 GB RAM <br> 32 GB Speicherkapazität  | >= 4 GB (besser 6 GB - 8 GB) RAM <br> >= 64 GB Speicherkapazität 
Docker | | Mini-PC (z.B. NUC), <br> NAS <br> | x GB RAM <br> y GB Speicherkapazität  | x GB RAM <br> y GB Speicherkapazität 
Windows | Windows xx | PC, <br> Mini-PC (z.B. NUC)| 4 GB RAM <br> 50 GB Speicherkapazität  (inkl. OS) | 8 GB RAM <br> 100 GB Speicherkapazität  (inkl. OS)
macOS | | MAC |x GB RAM <br> y GB Speicherkapazität  | x GB RAM <br> y GB Speicherkapazität 

<sup>1</sup> Derivate der genannten Distributionen können ebenfalls verwendet werden

<sup>2</sup> Diese Werte basieren auf Erfahrungen einer typischen Durchschnittsinstallation eines ioBroker Systems mit ~40 aktiven Adaptern, Grafana und einer externen Datenbank

<br>
<br>

- Es wird empfohlen ioBroker auf einer Debian/Ubuntu basierten Linux Distributionen zu installieren.
- ioBroker kann auf allen Systemen installiert werden, auf denen Node.js zur Verfügung steht.
- Der benötigte RAM sowie die Speicherkapazität steigt, wenn z.B. Datenpunkte historisiert werden (z.b. mit dem History Adapter welcher Text Dateien auf dem System speichert) oder wenn Datenbanken wie Influx oder mysql oder andere Anwendungen zusätzlich installiert und betrieben werden
- Achte bei der Hardwareauswahl auf den Stromverbrauch der Hardware, da ioBroker rund um die Uhr (24/7 Betrieb) laufen wird. Wenige Watt Unterschied machen sich im Laufe des Jahres beim Stromverbrauch bemerkbar.
