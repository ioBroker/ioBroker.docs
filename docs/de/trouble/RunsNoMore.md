---
title:       "ioBroker läuft nicht mehr"
lastChanged: "05.10.2025"
---

# ioBroker läuft nicht mehr - Vollständige Problemsammlung mit Lösungen

## Übersicht der Problemkategorien

Wenn ioBroker nicht mehr startet oder nicht mehr erreichbar ist, liegt meist eines von **sieben Hauptproblemen** vor. Diese Sammlung behandelt alle bekannten und wiederkehrenden Fehler systematisch mit bewährten Lösungsansätzen.

## 1. Datenbank-Sperren und Korruption

### 1.1 Database Lock Fehler (Häufigster Fehler)

**Symptome:**
```
Server Cannot start inMem-states on port 9000: Failed to lock DB file "/opt/iobroker/iobroker-data/states.jsonl"!
Server Cannot start inMem-objects on port 9001: Failed to lock DB file "/opt/iobroker/iobroker-data/objects.jsonl"!
```

**Ursachen:**
- Unsauberes Herunterfahren (Stromausfall, harter Reset)
- Noch laufende ioBroker-Prozesse nach Crash
- Korrupte oder übermäßig große Datenbankdateien
- Unzureichende Systemberechtigungen

**Lösungssequenz:**
```bash
# 1. Alle ioBroker-Prozesse prüfen und beenden
ps auxwww | grep iobroker
sudo killall -9 node
sudo killall -9 iobroker

# 2. System neu starten (sicherste Methode)
sudo reboot

# 3. Nach Neustart: Datenbank aus Backup wiederherstellen
cd /opt/iobroker/iobroker-data/backup-objects
iob stop
gunzip -ck [neueste_datei]_objects.jsonl.gz > /opt/iobroker/iobroker-data/objects.jsonl
gunzip -ck [neueste_datei]_states.gz > /opt/iobroker/iobroker-data/states.jsonl
iob start

# 4. Notfall-Lösung (Verlust aktueller Zustände):
iob stop
rm /opt/iobroker/iobroker-data/states.jsonl
rm /opt/iobroker/iobroker-data/objects.jsonl
iob start
```

### 1.2 Redis-Datenbank-Probleme

**Symptome:**
- ioBroker extrem langsam
- Admin-Interface lädt minutenlang
- Unendlich viele Datenpunkte durch fehlerhafte Adapter

**Diagnose:**
```bash
# In Redis-Datenbank schauen:
redis-cli
KEYS *
# Vorsicht: Bei vielen Keys dauert das sehr lange!
```

**Lösungsansätze:**
```bash
# 1. Problematische Adapter identifizieren und entfernen
# Beispiel Withings-Adapter mit 130.000 Datenpunkten:
iob stop withings
iob del withings

# 2. Redis-Datenbank bereinigen
redis-cli FLUSHALL  # ACHTUNG: Löscht ALLE Daten!

# 3. Zurück zu Files wechseln (bei weniger als 50.000 Objekten empfohlen):
iob stop
iobroker setup custom
# Files für Objects und States wählen
```

**Redis-Wartung:**
```bash
# Backup der Redis-Datenbank:
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/pfad/

# Redis-Speicher optimieren:
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

## 2. Admin-Adapter und Web-Interface Probleme

### 2.1 Admin-Adapter gestoppt

**Symptome:**
- http://IP:8081 nicht erreichbar
- "Connection refused" oder Timeout-Fehler
- Admin-Interface lädt nicht

**Sofort-Lösungen:**
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

**Docker-spezifische Lösung:**
```bash
# In Container-Console:
docker exec -it iobroker-container bash
iobroker start admin

# Oder Container neu starten:
docker restart iobroker-container
```

### 2.2 Web-Adapter Konflikte

**Problem:** Mehrere Web-Adapter auf gleichem Port oder Port-Konflikte

**Lösung:**
```bash
# Alle Web-Instanzen auflisten:
iobroker list instances | grep web

# Port-Belegung prüfen:
sudo netstat -tulpn | grep :8081
sudo netstat -tulpn | grep :8082

# Web-Adapter-Ports anpassen:
# Über Admin-Interface: Instanzen → web.0 → Konfiguration → Port ändern
```

## 3. Node.js und Dependency-Probleme

### 3.1 Node.js Versionskonflikt

**Symptome:**
- `SyntaxError: Unexpected token` bei js-controller Updates
- Adapter starten nicht nach Node.js-Update
- NPM-Befehle funktionieren nicht

**Diagnose:**
```bash
# Aktuelle Versionen prüfen:
node -v
npm -v
iob --version

# Empfohlene Versionen (2025):
# Node.js: 20.x, 22.x (LTS)
# js-controller: 7.x
```

**Korrektes Update-Verfahren:**
```bash
# 1. Backup erstellen:
iob backup

# 2. System stoppen:
iob stop

# 3. Node.js korrekt aktualisieren:
iob nodejs-update 20  # Für Node.js 20.x LTS

# 4. System reparieren:
iob fix

# 5. System starten:
iob start
```

### 3.2 NPM-Installation Fehler

**Häufige Fehler:**
- `ENOTFOUND registry.npmjs.org`
- `ENOENT: no such file or directory`
- `npm: not found`

**Lösungsansätze:**
```bash
# 1. NPM-Cache bereinigen:
npm cache clean --force

# 2. NPM neu installieren:
sudo apt-get update
sudo apt-get install npm

# 3. NPM-Registry prüfen/zurücksetzen:
npm config get registry
npm config set registry https://registry.npmjs.org/

# 4. Proxy-Probleme (Unternehmensnetze):
npm config set proxy http://proxy-server:port
npm config set https-proxy https://proxy-server:port
```

### 3.3 js-controller Update-Fehler

**Problem:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`

**Lösungsansätze:**
```bash
# 1. Fix ausführen vor Update:
iob fix

# 2. Manuelles Update bei UI-Fehlern:
iob upgrade self

# 3. Bei persistenten Problemen:
iob stop
npm install iobroker.js-controller@latest --production --prefix /opt/iobroker
iob start
```

## 4. System-Ressourcen und Performance

### 4.1 Arbeitsspeicher-Probleme

**Symptome:**
- System friert ein bei weniger als 20% freiem RAM
- Adapter werden automatisch gestoppt
- Admin-Interface reagiert nicht mehr

**Sofort-Diagnose:**
```bash
# RAM-Nutzung prüfen:
free -m
# Prozess-spezifischer Verbrauch:
top -p $(pgrep -d',' iobroker)
# Swap-Nutzung:
swapon --show
```

**Lösungsansätze:**
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

**Hardware-Empfehlungen:**
- Raspberry Pi 3: Maximal 30-40 Adapter-Instanzen[124][130]
- Mindestens 4 GB RAM für produktive Systeme[130]
- SSD statt SD-Karte für bessere Performance[124]

### 4.2 Festplatten-Probleme

**Symptome:**
- `/` zeigt 100% Belegung
- Log-Dateien erreichen GB-Größen
- System reagiert nicht mehr

**Notfall-Bereinigung:**
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

**Log-Rotation konfigurieren:**
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

### 4.3 Überhitzung und Hardware-Probleme

**Symptome:**
- Raspberry Pi schaltet sich ab
- CPU-Temperatur über 80°C
- Zufällige System-Crashes

**Diagnose:**
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

**Lösungsansätze:**
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

## 5. Netzwerk und DNS-Probleme

### 5.1 DNS-Auflösung fehlgeschlagen

**Symptome:**
- `getaddrinfo ENOTFOUND` Fehler
- Adapter können nicht mit externen Services verbinden
- `iob fix` und `iob diag` funktionieren nicht

**Diagnose:**
```bash
# DNS-Konfiguration prüfen:
cat /etc/resolv.conf
nslookup google.com
dig google.com

# Netzwerk-Interface prüfen:
ip addr
ip route
```

**Lösungsansätze:**
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

### 5.2 Firewall und Proxy-Probleme

**Unternehmensnetze:**
```bash
# Proxy für NPM konfigurieren:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy https://proxy.company.com:8080

# Git-Proxy (für GitHub-Dependencies):
git config --global http.proxy http://proxy.company.com:8080
```

**Reverse-Proxy-Probleme:**
- WebSocket-Verbindungen funktionieren nicht[147][149]
- Socket.io-Pfade nicht korrekt weitergeleitet[147]

## 6. Berechtigungen und User-Probleme

### 6.1 Permission Denied Fehler

**Symptome:**
- `EACCES: permission denied`
- Backup-Fehler trotz `chmod 777`
- Adapter können nicht schreiben

**Niemals chmod 777 verwenden!** Das ist ein Sicherheitsrisiko und löst oft nicht das Problem[142][145][148].

**Korrekte Lösungsansätze:**
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

### 6.2 Docker-spezifische Berechtigungsprobleme

**Problem:** Volume-Berechtigungen in Docker-Containern[153]

**Lösung:**
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

## 7. Adapter-spezifische Systemfehler

### 7.1 HomeMatic/CCU3-Verbindungsprobleme

**Problem:** JSON-Parser-Fehler bei CCU3-Kommunikation[108]

**Lösungsansätze:**
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

### 7.2 MQTT-Adapter Log-Spam

**Problem:** MQTT füllt Logs mit unnötigen Meldungen[133]

**Lösung:**
```bash
# In MQTT-Adapter Konfiguration:
# "Eigene States bekanntgeben" → nur "info.0.*"
# Log-Level auf "info" oder "warn" setzen
```

## Systematische Fehlerdiagnose

### Standard-Diagnoseverfahren

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

### Notfall-Reparatursequenz

Bei unklaren Problemen diese Sequenz durchführen:

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

### Wann Neuinstallation erforderlich ist

**Neuinstallation bei:**
- Korrupte Node.js-Installation nach falschen Updates
- Massive Systemschäden durch root-Operationen
- Hardware-Wechsel (andere Architektur)
- Mehr als 3 fehlgeschlagene Reparaturversuche

**Vorbereitung für Neuinstallation:**
```bash
# Vollständiges Backup:
iob backup
cp -R /opt/iobroker/backups /external/storage/

# Wichtige Konfigurationsdateien sichern:
cp /opt/iobroker/iobroker-data/iobroker.json /backup/
cp -R /opt/iobroker/node_modules/iobroker.vis/www/vis-views /backup/
```

## Präventive Maßnahmen

### Überwachung einrichten

```bash
# 1. Automatische Backups (täglich):
# Backitup-Adapter konfigurieren

# 2. System-Monitoring:
# SystemInfo-Adapter für Temperatur, RAM, Festplatte
# Grenzwerte für Alarme setzen

# 3. Log-Monitoring:
# Bei kritischen Fehlern E-Mail-Benachrichtigung
```

### Wartungsroutine

**Wöchentlich:**
```bash
sudo apt update && sudo apt upgrade
iob update
# Log-Größen prüfen: du -h /opt/iobroker/log/
```

**Monatlich:**
```bash
iob fix
iob backup
# Alte Backups bereinigen
# System-Ressourcen analysieren
```

Diese umfassende Problemsammlung deckt alle bekannten ioBroker-Systemfehler ab und bietet bewährte Lösungsansätze für jeden Problembereich. Die Reihenfolge der Lösungsversuche ist nach Erfolgswahrscheinlichkeit und Sicherheit optimiert.
