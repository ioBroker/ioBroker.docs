## Wie installiere ich ioBroker?

Der Weg hängt vom Betriebssystem ab:

| System                                      | Weg                                                                                                                           |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Linux** (Debian, Ubuntu, Raspberry Pi OS) | Der Normalfall. Ein Befehl, fertig: [Installation unter Linux](https://www.iobroker.net/#de/documentation/install/linux.md)   |
| **Docker**                                  | Wenn schon ein Docker-Host oder ein NAS vorhanden ist: [Docker](https://www.iobroker.net/#de/documentation/install/docker.md) |
| **Proxmox**                                 | Wenn ioBroker neben anderen Diensten laufen soll: [Proxmox](https://www.iobroker.net/#de/documentation/install/proxmox.md)    |
| **Windows**                                 | [Windows](https://www.iobroker.net/#de/documentation/install/windows.md)                                                      |
| **macOS**                                   | Nur zum Ausprobieren und Entwickeln: [macOS](https://www.iobroker.net/#de/documentation/install/macos.md)                     |

Unter Linux genügt:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

Danach ist der Admin unter `http://<IP-Adresse>:8081` erreichbar.

?> Wer sich unsicher ist: Debian ohne Oberfläche auf einem Mini-PC mit SSD ist
der Weg mit den wenigsten Überraschungen.
