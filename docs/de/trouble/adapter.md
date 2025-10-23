---
title:       "Adapterfehler"
lastChanged: "23.10.2025"
---

# Adapterfehler – Installations-, Start- und Performanceprobleme

Dieses Kapitel konzentriert sich ausschließlich auf **adapterspezifische Probleme**. Für allgemeine Systemprobleme (ioBroker startet nicht, Datenbanksperren, Node.js-Updates) siehe: [ioBroker läuft nicht mehr](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)

---

## 1. Adapter-Installationsprobleme

### Typische Fehlermeldungen
- `npm ERR! code ENOTFOUND` / `ENOTEMPTY` / `EINTEGRITY`
- Installation bricht ab oder Adapter erscheint nicht in der Liste
- `Cannot install adapter` trotz scheinbar korrekter Konfiguration

### Diagnose mit iob diag

**Erster Schritt - Systemdiagnose:**
```
iob diag
```

Der `iob diag`-Befehl zeigt bereits:
- ✅ Repository-Konfiguration und Verfügbarkeit
- ✅ OS-Version und ausstehende Updates
- ✅ Node.js/NPM-Versionen und Kompatibilität
- ✅ Letzte Log-Einträge
- ✅ Berechtigungsprobleme

**Prüfen Sie die Ausgabe auf:**
- ❌ Fehlende Repository-Liste
- ❌ Falsche Repository-Konfiguration (latest statt stable)
- ❌ Veraltete Node.js-Version
- ❌ NPM-Fehler
- ❌ Berechtigungsfehler

### Lösungen basierend auf iob diag

**Bei Repository-Problemen:**

**a) Repository-Liste fehlt komplett:**
```
iob repo add stable http://download.iobroker.net/sources-dist.json
iob update
```

**b) Probleme mit latest/beta-Adaptern - zurück zu stable:**
```
# Aktuelle Repository-Konfiguration anzeigen:
iob repo list

# Latest/Beta deaktivieren, stable aktivieren:
iob repo unset beta
iob repo unset latest
iob repo set stable
iob update
```

**Wichtig:** Nach Wechsel von latest zu stable werden installierte Beta-Versionen **nicht** automatisch zurückgestuft. Sie müssen warten bis stable die Versionen "einholt" oder manuell downgraden:
```
iobroker upgrade <adaptername>@<stable-version>
```

**Repository-Unterschiede verstehen:**
→ Siehe [Was ist ein Repository](https://www.iobroker.net/#de/documentation/basics/repositories.md)

**Bei Node.js-Versionsproblemen:**  
→ Siehe [Node.js Update Anleitung](https://www.iobroker.net/#de/documentation/install/updatenode.md)

**Bei npm-Cache-Problemen:**
```
# Cache-Integrität prüfen:
npm cache verify
```

**Was macht `npm cache verify`?**
- Überprüft die Integrität aller gecachten Pakete
- Entfernt automatisch defekte oder inkonsistente Cache-Daten (Garbage Collection)
- Validiert den Cache-Index
- Seit npm@5 ist der Cache selbstheilend und repariert sich automatisch

**Nur bei angezeigten Fehlern Cache komplett löschen:**
```
npm cache clean --force
```
⚠️ **Hinweis:** Dies löscht den kompletten Cache und sollte nur bei tatsächlichen Cache-Problemen verwendet werden.

**Adapter sauber neu installieren:**
```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>

# Neuinstallation über Admin-Oberfläche (empfohlen)
# ODER per Konsole:
iobroker install <adaptername>
```

---

## 2. Adapter-Startprobleme

### Typische Symptome
- Adapter bleibt rot/gelb in der Instanzenliste
- `Error: Cannot find module <...>`
- Adapter startet kurz und stoppt sofort wieder
- `SyntaxError: Unexpected token` in Adapter-Dateien

### Spezifische Adapter-Diagnose

**Adapter-Logs gezielt analysieren:**
```
# Live-Logs für spezifischen Adapter:
iobroker logs <adaptername> --watch

# Letzte 100 Zeilen:
iobroker logs <adaptername> | tail -100
```

**Adapter im Debug-Modus starten:**
```
# Adapter-Instanz deaktivieren
# Dann manuell im Debug-Modus starten:
cd /opt/iobroker/node_modules/iobroker.<adaptername>
node main.js 0 --debug
```
Dies zeigt deutlich mehr Informationen als das Standard-Log.

### Lösungsansätze

**1. ioBroker-Installation reparieren:**
```
iobroker fix
```
⚠️ **Wichtig:** `iobroker fix` repariert die gesamte ioBroker-Installation inklusive:
- Dateiberechtigungen für alle Verzeichnisse
- Systembenutzer und Gruppen
- Dependencies und Links
- Ist **immer** möglich und sollte bei Problemen der erste Schritt sein

**2. Adapter-Konfiguration zurücksetzen:**
```
# Adapter stoppen:
iobroker stop <adaptername>

# Konfiguration in Admin-Interface überprüfen
# Oft helfen Werkseinstellungen
```

**3. Dependencies neu installieren:**
```
cd /opt/iobroker/node_modules/iobroker.<adaptername>
npm install --production
```

**4. Neuinstallation (letztes Mittel):**
```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>
iobroker install <adaptername>
```

**5. Bei nativen Modulen nach Major-Node.js-Update:**
```
# Nur bei Major-Versionswechsel (20→22):
iobroker rebuild <adaptername>
```

### Hardware-bezogene Startprobleme

**Bei "Unexpected token" in Kombination mit Raspberry Pi:**  
→ Möglicherweise defekte SD-Karte! Siehe [Hardware-Diagnose](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)

---

## 3. Adapter-Performance-Probleme

### Symptome
- Adapter reagiert verzögert
- Hohe CPU-Last durch einzelnen Adapter
- Adapter verursacht Speicherlecks
- States werden nur sporadisch aktualisiert

### Diagnose

**1. Ressourcenverbrauch einzelner Adapter ermitteln:**
```
# Alle ioBroker-Prozesse mit Ressourcen:
top -u iobroker

# Oder detaillierter mit htop:
htop -u iobroker
```

**2. Adapter-spezifische Performance-Logs:**
```
# Adapter auf "debug" Log-Level setzen
# Dann Logs beobachten:
iobroker logs <adaptername> | grep -i "slow\|timeout\|warning"
```

### Lösungen

**1. Polling-Intervalle optimieren**

In der Adapter-Konfiguration:
- Standard: 5-10 Sekunden → besser: 30-60 Sekunden
- Nur bei wirklich nötigen Datenpunkten kurze Intervalle
- Nicht benötigte Objekte/States komplett deaktivieren

**2. Log-Level reduzieren**
```
# In Admin → Instanzen → Adapter-Konfiguration:
# Log-Level von "debug" auf "info" oder "warn"
```
Debug-Logs können erhebliche Performance-Last verursachen!

**3. Adapter-Cache-Einstellungen anpassen**

### Adapter-spezifische Performance-Tipps

**JavaScript/Blockly-Adapter:**
- Skripte einzeln aktivieren und Performance beobachten
- `setInterval()` mit kurzen Intervallen vermeiden
- Große Arrays/Objekte nicht im RAM halten
- `schedule()` statt permanentes Polling nutzen

**History/InfluxDB/SQL:**
- Nur relevante Datenpunkte loggen
- Retention-Policies nutzen (alte Daten automatisch löschen)
- Aggregation für hochfrequente Daten aktivieren

**MQTT/Modbus/KNX:**
- Subscription-Filter nutzen (nicht alle Topics)
- Reconnect-Intervalle erhöhen
- QoS-Level reduzieren wo möglich

**Zigbee/Z-Wave:**
- Netzwerk-Optimierung durchführen
- Nicht benötigte Geräte entfernen
- Router-Geräte strategisch platzieren

---

## 4. Häufige adapterspezifische Probleme

### HomeMatic (hm-rpc, hm-rega)
**Problem:** Verbindung zur CCU bricht ab  
**Lösung:** 
- IP statt Hostname verwenden
- CCU-Firewall-Einstellungen prüfen
- Adapter-Version aktualisieren

### JavaScript/TypeScript
**Problem:** Skripte starten nicht nach Neustart  
**Lösung:**
- DNS und Proxy prüfen
```
iobroker stop javascript
iobroker upload javascript
iobroker fix
iobroker start javascript
```

### Zigbee
**Problem:** `Error: Cannot open serial port /dev/ttyUSB0`  
**Lösung:**
- /dev/ttyUSB*-Rechte prüfen
- USB-Kabel und Stick testen
- Adapter-Konfiguration und Port korrekt setzen
```
# User zur dialout-Gruppe hinzufügen:
sudo usermod -aG dialout iobroker
sudo reboot
```

### Backitup (Docker)
**Problem:** `EACCES: permission denied`  
**Lösung:** Siehe [Backup-Probleme in Docker](https://docs.buanet.de/de/iobroker-docker-image/docs/)

### MQTT
**Problem:** Logs werden mit Meldungen geflutet  
**Lösung:**
- In Konfiguration: Nur relevante Topics abonnieren
- Log-Level auf "warn" setzen
- "Eigene States bekanntgeben" deaktivieren

### ioBroker.vis
**Problem:** Ansichten werden nicht geladen; 404-Fehler für /vis-views/
**Lösung:**
- Verzeichnisrechte prüfen (chown -R iobroker:iobroker /opt/iobroker/www/vis-views)
- Cache leeren

---

## Best Practices zur Fehlervermeidung

### Vor Installation
1. `iob diag` ausführen und prüfen
2. Repository auf **stable** setzen (nicht latest!)
3. Adapter-Readme und Known Issues lesen
4. Im Forum nach aktuellen Problemen suchen
5. Backup erstellen: `iob backup`

### Nach Installation
1. Adapter-Logs beobachten: `iobroker logs <adapter> --watch`
2. Ressourcenverbrauch prüfen: `top -u iobroker`
3. Konfiguration Schritt für Schritt anpassen
4. Erst bei stabilem Betrieb weitere Adapter installieren

### Bei Updates
1. Changelog des Adapters lesen
2. Bei Major-Updates erst im Test-System prüfen
3. Backup vor Update erstellen
4. Nach Update Logs kontrollieren

### Wichtige Hinweise

✅ **Immer tun:**
- Adapter über Admin-Oberfläche installieren
- Bei Problemen zuerst `iob diag` ausführen
- Repository auf **stable** setzen für Produktivsysteme
- `iobroker fix` bei jeglichen Problemen ausführen
- Adapter-Logs lesen statt blind experimentieren
- Bei GitHub-Issues nach Lösungen suchen

❌ **Niemals tun:**
- Adapter dauerhaft von GitHub installieren
- Mit `sudo` vor ioBroker-Befehlen arbeiten
- Mehrere Probleme gleichzeitig beheben
- Adapter im Produktivsystem im Beta/Latest-Branch testen
- Mehrere Instanzen zur Performance-Verbesserung erstellen (verbraucht nur mehr RAM)

---

**Bei weiteren Problemen:** Forum-Thread erstellen mit vollständiger `iob diag`-Ausgabe und Adapter-Logs.
