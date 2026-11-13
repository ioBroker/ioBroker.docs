---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.proxmox?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.proxmox?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.proxmox?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.proxmox?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.proxmox?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.proxmox/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.proxmox.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/proxmox-stable.svg
BADGE-Installed: https://iobroker.live/badges/proxmox-installed.svg
---
![Logo](../../admin/proxmox.png)

# ioBroker.proxmox

## Anforderungen
- Node.js 22.19 (oder neuer)
- js-controller 6.0.11 (oder neuer)
- Admin Adapter 7.7.22 (oder neuer)  
  
***  
>Die Dokumentation basiert auf dem Stand der Version 2.4.0  
Alle Bilder sind Beispiele und können je nach Systemkonfiguration abweichen.

## Nodes

![Option](../pictures/optionen.png)  
  
### Anfrage-Intervall  
Standard sind 30 Sekunden. Der kleinste Wert sind 5 Sekunden.  
  
> Mit klicken auf das Plussymbol wird eine neue Zeile für ein Node hinzugefügt. in einer Insatnnz können alle Nodes eingetragen werden.  
  
### IP Adresse 
Die IP Adresse des Proxmox Server bzw. der Servername.
  
### Port  
Standard ist der Port 8006, wenn bei der Installation ein anderer Port eingestell wurde, muss dieser hier auch geändert.  

### Nutzername  
Bei der Installation wird root als Standard eingestellt. Wenn ein neuer User für den Abruf der Daten in Proxmox erstellt wird, kommt hier sein Loginname rein.  
  
### Passwort  
Passwort vom root bzw. vom neu erstellten User.  

### Realm
Auswahl zwischen `Standard Authentifizierung` und dem `Proxmox Authentifizierungsserver`.  
Als Standard sollte hier der selbe Dienst gewählt werden, wie im Login auf der Weboberfläche.  
![proxmox login](../pictures/proxmox_login.png)  
  
***
## Weitere Informationen  
    
### Festplatten Informationen
Bei der Auswahl werden in den Objekten diese Datenpunkte angelegt, diese können sich je nach Festplattentyp unterscheiden.  
![disk info](../pictures/disk_info.png)  
  
### HA informationen  
Es werden alle Nodes des HA-Cluster aufgelistet. Welcher Node Master ist und welcher das Quorum übernimmt.  
![HA Strucktur](../pictures/HA_structure.png)    

### Ceph Informationen  
in Arbeit  

### neue Baumstruktur  
Bei der neuen Baumstruktur werden `LXC Container` und `VM` unter einen Hauptordner gesammelt.  
  
alte Struktur  
![object strcture](../pictures/object_structure.png)  
  
neue Struktur    
![new object structure](../pictures/new_object_structure.png)  
  
### Speicher Informationen / storage information
Hiermit werden die Informationen zu den verwendeten Speichertypen hinterlegt. 
![storage](../pictures/storage.png)  
  
### Backup Informationen
Es wird der Datenpunkt `backupJSON` unter den einzelnen Speicher / Storage angelegt.  
Hier im Beispiel des Backup-Speichers werden in dem JSON die Backups gelistet, welche in Proxmox konfiguriert wurden.  
![backupJSON](../pictures/backupJSON.png)  

zum Beispiel
```json
  "backup_pve:backup/vzdump-lxc-100-2024_12_24-03_00_03.tar.zst": {
    "subtype": "lxc",
    "format": "tar.zst",
    "volid": "backup_pve:backup/vzdump-lxc-100-2024_12_24-03_00_03.tar.zst",
    "ctime": 1735005603,
    "notes": "iobDev, 100",
    "vmid": 100,
    "content": "backup",
    "size": 3486489024
  },
  "backup_pve:backup/vzdump-lxc-100-2024_12_25-03_00_00.tar.zst": {
    "size": 3487399986,
    "notes": "iobDev, 100",
    "content": "backup",
    "vmid": 100,
    "format": "tar.zst",
    "volid": "backup_pve:backup/vzdump-lxc-100-2024_12_25-03_00_00.tar.zst",
    "ctime": 1735092000,
    "subtype": "lxc"
  },
  "backup_pve:backup/vzdump-lxc-100-2024_12_26-03_00_02.tar.zst": {
    "size": 3486595678,
    "content": "backup",
    "vmid": 100,
    "notes": "iobDev, 100",
    "ctime": 1735178402,
    "volid": "backup_pve:backup/vzdump-lxc-100-2024_12_26-03_00_02.tar.zst",
    "format": "tar.zst",
    "subtype": "lxc"
  },
```

## vis-2-Widget

Der Widget-Satz „Proxmox“ enthält ein Widget für eine VM oder einen Container. Wähle die Maschine aus der Liste aus. Das Widget zeigt Zustand, Laufzeit, CPU und RAM und hat Tasten zum Starten und Stoppen.

- **Laufzeit anzeigen:** Die Laufzeit erscheint, solange die Maschine läuft.
- **Symbol anzeigen:** Die Farbe des Symbols zeigt den Zustand. Unter **Icon** kannst du ein eigenes Icon wählen, unter **Bild** eine eigene Bilddatei. Ein Bild hat Vorrang vor dem Icon und behält seine eigenen Farben.
- **Steuerung anzeigen:** Ohne diese Option zeigt das Widget nur den Zustand an. Das ist sinnvoll, wenn ein vis-Projekt für Personen erreichbar ist, die keine Maschinen stoppen sollen. Die Rückfrage ist kein Zugriffsschutz.
- **Stopp-Taste:** Standardmäßig fährt sie die Maschine sauber herunter. „Sofort ausschalten“ nutzt den Proxmox-Befehl `stop`, dabei können nicht gespeicherte Daten verloren gehen.
- Nach einem Befehl aktualisiert sich der Zustand mit der nächsten Abfrage, also nach etwa 10 Sekunden. Bis dahin zeigt das Widget „Wird ausgeführt“.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.0 (2026-11-08)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (bluefox) The adapter was refactored to TypeScript. It can only be installed from npm now, not from GitHub
- (bluefox) Fixed the cleanup button in the configuration dialog, it never got an answer from the adapter
- (bluefox) Repaired the translations of the configuration dialog, which were broken since 2.5.0
- (bluefox) VMs and containers with the same name no longer share their states and buttons: all of them get the object ID `<name>_<vmid>`. Other object IDs do not change (#702)
- (bluefox) Buttons no longer execute their command twice when the states are stored in Redis (#703)
- (bluefox) With several individual nodes, the instances no longer delete each other's objects, which caused a restart loop and missing data. If a node does not answer during the start, old objects are kept until the next start (#697, #622, #612)
- (bluefox) The first poll runs right after the start instead of after the configured interval, so the instance turns green sooner (#678)
- (bluefox) Individual hosts with the same node name, or with VMs and storages of the same name, no longer share their objects: all of them get `_<host>` added to the object ID, for example `node_pve_192-168-1-10`. A button now always reaches the host it belongs to. Other object IDs do not change
- (bluefox) Added the device manager: nodes, VMs and containers with status, CPU and RAM, and start, shutdown, reboot and stop with a confirmation
- (bluefox) Added a vis-2 widget that shows the state of a VM or container and can start and stop it. An option hides the controls
- (bluefox) The device manager cards show an icon per type, the status in color, the uptime, the load with warning colors and a details dialog
- (bluefox) The widget selects the machine from a list and shows the uptime and load bars. An own icon or image can be selected
- (bluefox) Added the state `uptime_text` to nodes, VMs and containers, for example `3 d 4 h`

### 2.6.3 (2026-07-31)
* (arteck) fix next node reconnect
* (arteck) add state info.node for actual node ip

### 2.6.2 (2026-07-15)
* (arteck) restructure ceph health message

### 2.6.1 (2026-05-21)
* (arteck) fix reconnect

### 2.6.0 (2026-05-13)
* (arteck) fix high i/o
* (copilot) Adapter requires node.js >= 22 now

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 MeisterTR <meistertr.smarthome@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN


THE SOFTWARE.