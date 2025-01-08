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
BADGE-Stable: http://iobroker.live/badges/proxmox-stable.svg
BADGE-Installed: http://iobroker.live/badges/proxmox-installed.svg
---
![Logo](../../admin/proxmox.png)

# ioBroker.proxmox

## Anforderungen
- Node.js 18 (oder neuer)
- js-controller 5.0.19 (oder neuer)
- Admin Adapter 6.13.16 (oder neuer)  
  
***  
## Einstellungen  
![Option](../pictures/option.png)  
  
### IP Adresse 
Die IP Adresse des Proxmox Server bzw. der Servername.  
  
### Port  
Standard ist der Port 8006, wenn bei der Installation ein anderer Port eingestell wurde, muss dieser hier auch geändert.  

### Anfrage-Intervall  
Standard sind 30 Sekunden. Der kleinste Wert sind 5 Sekunden.  
  
### Nutzername  
Bei der Installation wird root als Standard eingestellt. Wenn ein neuer User für den Abruf der Daten in Proxmox erstellt wird, kommt hier sein Loginname rein.  
  
### Passwort  
Passwort vom root bzw. vom neu erstellten User.  

### Realm
Auswahl zwischen `Standard Authentifizierung` und dem `Proxmox Authentifizierungsserver`.  
Als Standard sollte hier der selbe Dienst gewählt werden, wie im Login auf der Weboberfläche.  
![proxmox login](../pictures/proxmox_login.png)  
  
### Festplatten Informationen
Bei der Auswahl werden in den Objekten diese Datenpunkte angelegt, diese können sich je nach Festplattentyp unterscheiden.  
![disk info](../pictures/disk_info.png)  
  
### HA informationen  
in Arbeit  

### Ceph Informationen  
in Arbeit  

### neue Baumstruktur  
Bei der neuen Baumstruktur werden `LXC Container` und `VM` unter einen Hauptordner gesammelt.  
  
alte Struktur  
![object strcture](<../pictures/object_structure.png>)  
  
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

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (arteck) add new eslint file
* (arteck) fix node message

### 2.3.0 (2024-04-26)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (jens-maus) fix ha and ceph object type
* (mcm1957) Dependencies have been updated

### 2.2.3 (2024-02-01)
* (arteck) add icon status available for lxc and vm
* (arteck) settings adjustment

### 2.2.2 (2023-11-06)
* (arteck) storage message corr

### 2.2.1 (2023-10-28)
* (arteck) machines delete after restart corr
* (arteck) vmid type corr
* (arteck) corstorage error message

### 2.2.0 (2023-10-21)
* (arteck) new Object tree structure (selectable)
* (arteck) added HA Information
* (arteck) Storage info is selectable
* (arteck) Backup info are under Storage info as Object backupJson
* (arteck) corr info for offline container
* (arteck) axios timout is now 5 sec.

## License

The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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