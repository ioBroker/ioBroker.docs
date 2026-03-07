---
title: ioBroker is no longer working
lastChanged: 24.10.2025
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/RunsNoMore.md
hash: Pzd/BPnQ2vPUNUd7CaZLkxWLhoWz+MoUp+oYFe6Qxcs=
---
# IoBroker is no longer working - Complete collection of problems and solutions
## Overview of Problem Categories
If ioBroker no longer starts or is no longer accessible, one of **seven main problems** is usually the cause. This collection systematically addresses all known and recurring errors with proven solutions.

## 1. Database Locks and Corruption
### 1.1 Database Lock Error (Most Common Error)
**Symptoms:**

```
Server Cannot start inMem-states on port 9000: Failed to lock DB file "/opt/iobroker/iobroker-data/states.jsonl"!
Server Cannot start inMem-objects on port 9001: Failed to lock DB file "/opt/iobroker/iobroker-data/objects.jsonl"!
```

**Causes:**

- Unclean shutdown (power outage, hard reset)
- ioBroker processes still running after crash
- Corrupt or excessively large database files
- Insufficient system permissions
- Corrupted file system (SD card, SSD)

**Solution sequence:**

```bash
# 1. Zuerst iob fix ausführen - komprimiert Datenbanken
cd /opt/iobroker
iob fix

# 2. System neu starten (wenn fix nicht hilft)
sudo reboot

# 3. Nach Neustart: Verfügbare Backups prüfen
cd /opt/iobroker/iobroker-data/backup-objects
ls -la

# Backup-Größe beachten: Wenn Größe plötzlich massiv kleiner wurde,
# ist die Datenbank an diesem Punkt kaputt gegangen

# 4. Datenbank aus Backup wiederherstellen
iob stop
gunzip -ck [neueste_datei]_objects.jsonl.gz > /opt/iobroker/iobroker-data/objects.jsonl
gunzip -ck [neueste_datei]_states.gz > /opt/iobroker/iobroker-data/states.jsonl
iob start

# 5. NUR States zurücksetzen (Verlust nur aktueller Zustände):
iob stop
rm /opt/iobroker/iobroker-data/states.jsonl
iob start

# 6. NOTFALL: Kompletter Reset (ACHTUNG: Verlust aller Objekte UND States!)
# Nur wenn Objects-Datenbank irreparabel beschädigt ist
iob stop
rm /opt/iobroker/iobroker-data/states.jsonl
rm /opt/iobroker/iobroker-data/objects.jsonl
iob setup first  # Grundinitialisierung durchführen
iob start
```

**Important:** The Objects database should ALWAYS be restored from a backup, not deleted! Only states can be deleted if necessary.

### 1.2 Redis Database Problems
**Symptoms:**

- ioBroker extremely slow
- Admin interface takes minutes to load
- Infinitely many data points due to faulty adapters

**Diagnosis:**

```bash
# In Redis-Datenbank schauen (VORSICHT: dauert bei vielen Keys sehr lange!):
redis-cli
KEYS *
# Anzahl der Keys prüfen:
DBSIZE
```

**Approaches to solutions:**

```bash
# 1. Problematische Adapter identifizieren und entfernen
# Beispiel Withings-Adapter mit 130.000 Datenpunkten:
iob stop withings
iob del withings

# 2. Redis-Datenbank komplett zurücksetzen (ACHTUNG!)
# Wenn nur States in Redis: OK
# Wenn auch Objects in Redis: Alle Daten weg!
# Nach FLUSHALL muss "iob setup first" ausgeführt werden
iob stop
redis-cli FLUSHALL
iob setup first
iob start

# 3. Zurück zu Files wechseln (bei weniger als 50.000 Objekten empfohlen):
iob stop
iobroker setup custom
# Files für Objects und States wählen
```

**Redis Maintenance:**

```bash
# Backup der Redis-Datenbank:
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/pfad/

# Redis-Speicher optimieren (nur wirksam wenn kein AOF genutzt wird):
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

**Note:** Redis memory optimization only works to a limited extent and is highly dependent on the configuration.

## 2. Admin Adapter and Web Interface Problems
### 2.1 Admin adapter stopped
**Symptoms:**

- `http://IP:8081` is not reachable
- "Connection refused" or timeout error
- Admin interface not loading

**Instant solutions:**

```bash
# 1. Admin-Adapter über Konsole starten:
iobroker start admin

# 2. Status aller Instanzen prüfen:
iobroker list instances

# 3. Admin-Adapter neu starten:
iobroker restart admin

# 4. Falls Admin nicht reagiert:
iobroker stop admin
iobroker start admin
```

**Docker-specific solution:**

```bash
# In Container-Console:
docker exec -it iobroker-container bash
iobroker start admin

# Oder Container neu starten:
docker restart iobroker-container
```

### 2.2 Web Adapter Conflicts
**Problem:** Multiple web adapters on the same port or port conflicts

**Solution:**

```bash
# Alle Web-Instanzen auflisten:
iobroker list instances | grep web

# Port-Belegung prüfen:
sudo netstat -tulpn | grep :8081
sudo netstat -tulpn | grep :8082

# Web-Adapter-Ports anpassen:
# Über Admin-Interface: Instanzen → web.0 → Konfiguration → Port ändern
```

## 3. Node.js and Dependency Problems
### 3.1 Node.js Version Conflict
**Symptoms:**

- `SyntaxError: Unexpected token` during js-controller updates (could also be due to a corrupted file system!)
- Adapters fail to start after Node.js update
- NPM commands do not work

**Diagnosis:**

```bash
# Aktuelle Versionen prüfen:
node -v
npm -v
iob --version

# Empfohlene Versionen (2025):
# Node.js: 20.x, 22.x (LTS)
# js-controller: 7.x
```

**Correct update procedure:**

Detailed information about the Node.js update can be found in [Node.js Update Guide](https://www.iobroker.net/#de/documentation/install/updatenode.md).

```bash
# 1. Backup erstellen:
iob backup

# 2. System stoppen:
iob stop

# 3. Node.js korrekt aktualisieren (aktualisiert automatisch NPM):
iob nodejs-update

# 4. System reparieren:
iob fix

# 5. System starten:
iob start
```

### 3.2 NPM Installation Error
**Common mistakes:**

- `ENOTFOUND registry.npmjs.org`
- `ENOENT: no such file or directory`
- `npm: not found`

**Important:** NPM is automatically installed correctly with Node.js. If you encounter NPM problems, DO NOT manually experiment with the installation!

Further information on Node.js and NPM installation can be found in [Node.js Installation Guide](https://www.iobroker.net/#de/documentation/install/nodejs.md).

**Recommended solutions:**

```bash
# 1. Node.js-Update durchführen (aktualisiert automatisch NPM + behebt meiste NPM-Probleme):
iob nodejs-update

# 2. NPM-Cache verifizieren:
npm cache verify

# 3. NPM-Cache bereinigen (bei Cache-Problemen):
npm cache clean --force

# 4. NPM-Registry prüfen/zurücksetzen (nur bei Registry-Problemen):
npm config get registry
npm config set registry https://registry.npmjs.org/

# 5. Proxy-Probleme (nur in Unternehmensnetzen):
npm config set proxy http://proxy-server:port
npm config set https-proxy https://proxy-server:port
```

**When encountering "npm not found" after a Node.js update:**

```bash
# System neu starten, damit PATH aktualisiert wird:
sudo reboot

# Nach Neustart prüfen:
node -v
npm -v
```

**Important:** NEVER attempt to manually uninstall or reinstall NPM! This usually leads to further problems. Instead, use `iob nodejs-update`, which automatically configures NPM.

### 3.3 js-controller Update Error
**Problem:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`

**Approaches to solutions:**

```bash
# 1. Fix ausführen vor Update:
iob fix

# 2. Manuelles Update bei UI-Fehlern:
iob upgrade self

# 3. Bei persistenten Problemen:
cd /opt/iobroker
iob stop
npm install iobroker.js-controller@latest --production --prefix /opt/iobroker
iob start
```

## 4. System Resources and Performance
### 4.1 Memory Problems
**Symptoms:**

- System freezes when less than 20% free RAM is available
- Adapters are automatically stopped
- Admin interface is no longer responding

**Immediate diagnosis:**

```bash
# RAM-Nutzung prüfen:
free -m

# Prozess-spezifischer Verbrauch:
top -p $(pgrep -d',' iobroker)

# Swap-Nutzung:
swapon --show
```

**Approaches to solutions:**

```bash
# 1. Unnötige Adapter stoppen:
iobroker list instances
iobroker stop [adaptername]

# 2. Problematische Skripte identifizieren:
# Admin → Skripte → alle Skripte temporär deaktivieren
# Einzeln wieder aktivieren und RAM-Verbrauch beobachten

# 3. System-Services reduzieren:
sudo systemctl disable avahi-daemon
sudo systemctl disable cups
sudo systemctl stop desktop-session  # Auf Headless-Systemen
```

**Hardware recommendations:**

- Raspberry Pi 3: Maximum 30-40 adapter instances
- At least 4 GB of RAM for production systems
- SSD instead of SD card for better performance

### 4.2 Hard drive problems
**Symptoms:**

- `/` indicates 100% occupancy
- Log files reach GB sizes
- System is no longer responding

**Emergency Cleanup:**

```bash
# 1. Große Log-Dateien finden:
du -h /opt/iobroker/log/ | sort -hr
du -h /var/log/ | sort -hr

# 2. Sichere Log-Bereinigung:
# Logs älter als 7 Tage löschen:
find /opt/iobroker/log/ -name "*.log" -mtime +7 -delete
find /opt/iobroker/log/ -name "*.gz" -mtime +14 -delete

# 3. System-Logs bereinigen:
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=100M

# 4. NPM-Cache bereinigen:
npm cache clean --force
```

**Configure log rotation:**

```bash
# /etc/logrotate.d/iobroker erstellen:
/opt/iobroker/log/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 iobroker iobroker
}
```

### 4.3 Overheating and Hardware Problems
**Symptoms:**

- Raspberry Pi shuts down
- CPU temperature above 80°C
- Random system crashes

**Diagnosis:**

```bash
# CPU-Temperatur prüfen:
# Raspberry Pi:
/opt/vc/bin/vcgencmd measure_temp

# Allgemeine Linux-Systeme:
sensors
cat /sys/class/thermal/thermal_zone0/temp

# Über ioBroker SystemInfo-Adapter:
# Automatische Temperatur-Überwachung einrichten
```

**Approaches to solutions:**

```bash
# 1. Übertaktung reduzieren (/boot/config.txt):
# Zeilen entfernen oder auskommentieren:
# arm_freq=1400
# gpu_freq=500

# 2. Thermal Throttling prüfen:
dmesg | grep -i thermal

# 3. Hardware-Überwachung aktivieren:
# SystemInfo-Adapter installieren
# Temperatur-Alarme bei >75°C einrichten
```

## 5. Network and DNS problems
### 5.1 DNS resolution failed
**Symptoms:**

- `getaddrinfo ENOTFOUND` error
- Adapters cannot connect to external services
- `iob fix` and `iob diag` do not work

**Diagnosis:**

```bash
# DNS-Konfiguration prüfen:
cat /etc/resolv.conf
nslookup google.com
dig google.com

# Netzwerk-Interface prüfen:
ip addr
ip route
```

**Approaches to solutions:**

```bash
# 1. DNS-Server in /etc/resolv.conf korrigieren:
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

# 2. systemd-resolved neu starten:
sudo systemctl restart systemd-resolved

# 3. Netzwerk-Interface neu starten:
sudo systemctl restart networking

# 4. Bei statischen IPs: /etc/netplan/ Konfiguration prüfen
```

### 5.2 Firewall and Proxy Problems
**Corporate Networks:**

```bash
# Proxy für NPM konfigurieren:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy https://proxy.company.com:8080

# Git-Proxy (für GitHub-Dependencies):
git config --global http.proxy http://proxy.company.com:8080
```

**Reverse proxy problems:**

- WebSocket connections are not working
- Socket.io paths not correctly redirected

## 6. Permissions and User Problems
### 6.1 Permission Denied Error
**Symptoms:**

- `EACCES: permission denied`
Backup error despite `chmod 777`
- Adapters cannot write

**IMPORTANT:** Never use `chmod 777`! This is a security risk and often does not solve the problem.

**Correct solutions:**

```bash
# 1. ioBroker-Berechtigungen reparieren:
iob fix

# 2. Benutzer-Gruppen korrigieren:
sudo usermod -aG iobroker $(whoami)
sudo usermod -aG redis iobroker  # Bei Redis-Nutzung

# 3. Verzeichnis-Eigentümer korrigieren:
sudo chown -R iobroker:iobroker /opt/iobroker
sudo chown -R iobroker:iobroker /opt/iobroker-data  # Docker

# 4. Nach Änderungen: Logout/Login erforderlich
```

### 6.2 Docker-specific permission problems
**Problem:** Volume permissions in Docker containers

**Solution:**

```bash
# Host-System:
sudo chown -R 1000:1000 /pfad/zu/iobroker-data

# Docker-Compose mit korrekter UID:
version: '3'
services:
  iobroker:
    image: buanet/iobroker:latest
    user: "1000:1000"
    volumes:
      - /pfad/zu/iobroker-data:/opt/iobroker
```

## 7. Adapter-specific system errors
### 7.1 HomeMatic/CCU3 connection problems
**Problem:** JSON parser error during CCU3 communication

**Approaches to solutions:**

```bash
# 1. CCU3-Firmware aktualisieren
# 2. URL-Encoding-Probleme beheben:
# In Adapter-Konfiguration: IP statt Hostname verwenden
# Firewall zwischen ioBroker und CCU3 prüfen

# 3. hm-rega Adapter neu installieren:
iob stop hm-rega
iob del hm-rega
iob install hm-rega
```

### 7.2 MQTT Adapter Log Spam
**Problem:** MQTT fills logs with unnecessary messages

**Solution:**

```bash
# In MQTT-Adapter Konfiguration:
# "Eigene States bekanntgeben" → nur "info.0.*"
# Log-Level auf "info" oder "warn" setzen
```

## Systematic fault diagnosis
### Standard diagnostic procedures
```bash
# 1. Grundlegende Systemprüfung:
iob status
iob diag
free -m
df -h

# 2. Prozess-Status:
ps aux | grep iobroker
systemctl status iobroker

# 3. Netzwerk-Connectivity:
ping 8.8.8.8
nslookup registry.npmjs.org

# 4. Log-Analyse:
iob logs --watch
tail -f /var/log/syslog | grep iobroker
```

### Emergency Repair Sequence
If problems are unclear, perform this sequence:

```bash
# 1. Backup (falls System reagiert):
iob backup

# 2. System stoppen:
iob stop

# 3. Alles reparieren:
iob fix

# 4. Updates durchführen:
iob update
iob upgrade self

# 5. System starten:
iob start

# 6. Status prüfen:
iob status
```

### When a new installation is required
**New installation at:**

- Corrupted Node.js installation after incorrect updates
- Massive system damage caused by root operations
- Hardware change (different architecture)
- More than 3 failed repair attempts

**Preparation for new installation:**

```bash
# Vollständiges Backup:
iob backup
cp -R /opt/iobroker/backups /external/storage/

# Wichtige Konfigurationsdateien sichern:
cp /opt/iobroker/iobroker-data/iobroker.json /backup/
cp -R /opt/iobroker/node_modules/iobroker.vis/www/vis-views /backup/
```

## Preventive measures
### Set up monitoring
```bash
# 1. Automatische Backups (täglich):
# Backitup-Adapter konfigurieren

# 2. System-Monitoring:
# SystemInfo-Adapter für Temperatur, RAM, Festplatte
# Grenzwerte für Alarme setzen

# 3. Log-Monitoring:
# Bei kritischen Fehlern E-Mail-Benachrichtigung
```

### Maintenance routine
**Weekly:**

```bash
sudo apt update && sudo apt upgrade
iob update
# Log-Größen prüfen: du -h /opt/iobroker/log/
```

**Monthly:**

```bash
iob fix
iob backup
# Alte Backups bereinigen
# System-Ressourcen analysieren
```

## Summary
This comprehensive collection of problems covers all known ioBroker system errors and offers proven solutions for each problem area. The order of the solution attempts is optimized according to probability of success and reliability.

**Most important basic rules:**

1. Always execute `iob fix` first.
2. Create backups before major interventions
3. Never delete the Objects database without a backup.
4. Never use `chmod 777`
5. When using Redis, please note: FLUSHALL will delete everything!
6. After permission changes: Log back into the system.
7. Solve NPM problems using `iob nodejs-update`, do not experiment manually.