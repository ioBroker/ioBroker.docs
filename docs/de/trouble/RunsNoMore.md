---
title:       "ioBroker läuft nicht mehr"
lastChanged: "24.10.2025"
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
- Defektes Dateisystem (SD-Karte, SSD)

**Lösungssequenz:**

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

**Wichtig:** Objects-Datenbank sollte IMMER aus Backup wiederhergestellt werden, nicht gelöscht! Nur States können notfalls gelöscht werden.

### 1.2 Redis-Datenbank-Probleme

**Symptome:**
- ioBroker extrem langsam
- Admin-Interface lädt minutenlang
- Unendlich viele Datenpunkte durch fehlerhafte Adapter

**Diagnose:**
```bash
# In Redis-Datenbank schauen (VORSICHT: dauert bei vielen Keys sehr lange!):
redis-cli
KEYS *
# Anzahl der Keys prüfen:
DBSIZE
```

**Lösungsansätze:**
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

**Redis-Wartung:**
```bash
# Backup der Redis-Datenbank:
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/pfad/

# Redis-Speicher optimieren (nur wirksam wenn kein AOF genutzt wird):
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

**Hinweis:** Redis-Speicheroptimierung funktioniert nur bedingt und hängt stark von der Konfiguration ab.

## 2. Admin-Adapter und Web-Interface Probleme

### 2.1 Admin-Adapter gestoppt

**Symptome:**
- `http://IP:8081` nicht erreichbar
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
- `SyntaxError: Unexpected token` bei js-controller Updates (kann auch defektes Dateisystem sein!)
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

Detaillierte Informationen zum Node.js-Update findet man in der [Node.js Update-Anleitung](https://www.iobroker.net/#de/documentation/install/updatenode.md).

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

### 3.2 NPM-Installation Fehler

**Häufige Fehler:**
- `ENOTFOUND registry.npmjs.org`
- `ENOENT: no such file or directory`
- `npm: not found`

**Wichtig:** NPM wird automatisch mit Node.js korrekt installiert. Bei NPM-Problemen NICHT manuell an der Installation experimentieren!

Weitere Informationen zur Node.js und NPM Installation findet man in der [Node.js Installationsanleitung](https://www.iobroker.net/#de/documentation/install/nodejs.md).

**Empfohlene Lösungsansätze:**

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

**Bei "npm not found" nach Node.js-Update:**
```bash
# System neu starten, damit PATH aktualisiert wird:
sudo reboot

# Nach Neustart prüfen:
node -v
npm -v
```

**Wichtig:** Versuche NIE, NPM manuell zu deinstallieren oder neu zu installieren! Dies führt meist zu weiteren Problemen. Nutze stattdessen `iob nodejs-update`, das NPM automatisch mitkonfiguriert.

### 3.3 js-controller Update-Fehler

**Problem:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`

**Lösungsansätze:**
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
- Raspberry Pi 3: Maximal 30-40 Adapter-Instanzen
- Mindestens 4 GB RAM für produktive Systeme
- SSD statt SD-Karte für bessere Performance

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
- WebSocket-Verbindungen funktionieren nicht
- Socket.io-Pfade nicht korrekt weitergeleitet

## 6. Berechtigungen und User-Probleme

### 6.1 Permission Denied Fehler

**Symptome:**
- `EACCES: permission denied`
- Backup-Fehler trotz `chmod 777`
- Adapter können nicht schreiben

**WICHTIG:** Niemals `chmod 777` verwenden! Das ist ein Sicherheitsrisiko und löst oft nicht das Problem.

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

**Problem:** Volume-Berechtigungen in Docker-Containern

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

**Problem:** JSON-Parser-Fehler bei CCU3-Kommunikation

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

**Problem:** MQTT füllt Logs mit unnötigen Meldungen

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

## Zusammenfassung

Diese umfassende Problemsammlung deckt alle bekannten ioBroker-Systemfehler ab und bietet bewährte Lösungsansätze für jeden Problembereich. Die Reihenfolge der Lösungsversuche ist nach Erfolgswahrscheinlichkeit und Sicherheit optimiert.

**Wichtigste Grundregeln:**
1. Immer zuerst `iob fix` ausführen
2. Backups vor größeren Eingriffen erstellen
3. Objects-Datenbank niemals ohne Backup löschen
4. `chmod 777` niemals verwenden
5. Bei Redis-Nutzung beachten: FLUSHALL löscht alles!
6. Nach Berechtigungsänderungen: System neu anmelden
7. NPM-Probleme über `iob nodejs-update` lösen, nicht manuell experimentieren
