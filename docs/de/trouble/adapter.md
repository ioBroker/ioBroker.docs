---
title:       "Adapterfehler"
lastChanged: "05.10.2025"
---

## Kapitel „Adapterfehler“ – Installations-, Start- und Performanceprobleme

Dieser Abschnitt erläutert die häufigsten Fehler bei Adaptern und liefert gezielte Lösungsschritte.

### 1. Installationsprobleme

**Symptome:**
- `npm ERR! code ENOTFOUND registry.npmjs.org`  
- `npm ERR! syscall rename`  
- Adapter lässt sich gar nicht installieren oder bricht mitten im Download ab.

**Ursachen:**
- Netzwerk- oder DNS-Probleme  
- Veralteter NPM-Cache  
- Inkonsistente Node.js-/NPM-Versionen  

**Lösungen:**
1. **NPM-Cache bereinigen**  
   ```bash
   npm cache clean --force
   ```
2. **Registry prüfen und zurücksetzen**  
   ```bash
   npm config get registry
   npm config set registry https://registry.npmjs.org/
   ```
3. **Proxy-Einstellungen (wenn nötig)**  
   ```bash
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy https://proxy.company.com:8080
   ```
4. **Adapterinstallation erzwingen**  
   ```bash
   iobroker install <adaptername> --force
   ```
5. **Node-Modules-Ordner neu anlegen**  
   ```bash
   iobroker stop
   rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>
   iobroker start
   iobroker install <adaptername>
   ```

### 2. Start- und Laufzeitprobleme

**Symptome:**
- Adapter bleibt im Admin-Interface rot  
- Keine „Connected“-Meldung in den Logs  
- Crash mit Ausgaben wie `Error: Cannot find module <...>` oder `SyntaxError: Unexpected token`.

**Ursachen:**
- Fehlende Abhängigkeiten  
- Konflikte durch alte Konfigurationsreste  
- Inkompatible Node.js-Version  

**Lösungen:**
1. **Logs beobachten**  
   ```bash
   iobroker logs --watch
   iobroker logs <adaptername>
   ```
2. **Adapter reparieren**  
   ```bash
   iobroker stop <adaptername>
   iobroker fix
   iobroker start <adaptername>
   ```
3. **Neuinstallation und Defaults löschen**  
   ```bash
   iobroker del <adaptername>
   rm -rf /opt/iobroker/iobroker-data/<adaptername>.*   # kann objektspezifische Daten löschen
   iobroker install <adaptername>
   ```
4. **Node.js-Version prüfen und aktualisieren**  
   ```bash
   node -v
   iobroker nodejs-update 20
   iobroker fix
   ```

### 3. Adapter-Performanceprobleme

**Symptome:**
- Starke Verzögerungen bei Datenaktualisierungen  
- Hoher CPU-/RAM-Verbrauch  
- Timeouts oder regelmäßige Disconnects.

**Ursachen:**
- Zu kurze Polling-Intervalle  
- Unnötig viele Objekte/States aktiviert  
- Ineffiziente Skripte  

**Lösungen:**
1. **Ressourcenverbrauch prüfen**  
   ```bash
   top -p $(pgrep -d',' -f node)
   free -m
   ```
2. **Polling-Intervalle erhöhen**  
   - In Adapterkonfiguration das Abfrageintervall anpassen (z. B. von 1 auf 10 Sek.)  
3. **Unnötige Objekte deaktivieren**  
   - Selektiv nur benötigte States aktivieren  
4. **Log-Level reduzieren**  
   - Adapter-Logging auf „warn“ oder „error“ setzen  
5. **Skripte optimieren**  
   - Blockierende oder endlose Schleifen in Scripts vermeiden  
   - `setTimeout`/`setInterval` bedingt stoppen  

### 4. Häufige Adapter-Spezialfälle

| Adaptertyp           | Typischer Fehler                                                            | Lösung                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| HomeMatic (hm-rpc)   | Verbindung zur CCU schlägt fehl; `503 Service Unavailable`                  | CCU-Firmware prüfen; IP statt Hostname verwenden; Firewall und Zugangsdaten kontrollieren; Adapter neu installieren.                    |
| JavaScript/TypeScript| Eigene Scripte starten nicht, `error exception getaddrinfo ENOTFOUND`       | `iobroker stop javascript` → `iobroker fix` → `iobroker start javascript`; DNS und Proxy prüfen.                                         |
| Backitup             | `EACCES Permission denied` bei Backup-Erstellung in Docker                   | Docker-Host: `sudo apt-get install cifs-utils nfs-common`; Berechtigungen für Volume prüfen und iobroker-User vergeben.             |
| MQTT (mqtt.0)        | Log-Flood durch zu viele Topics; Broker-Disconnects                         | In Konfiguration nur relevante Topics abonnieren; QoS-Level überprüfen; Log-Level auf „info“ reduzieren; Keep-Alive verlängern[11].          |
| ioBroker.vis         | Ansichten werden nicht geladen; 404-Fehler für `/vis-views/`                  | Verzeichnisrechte prüfen (`chown -R iobroker:iobroker /opt/iobroker/www/vis-views`); Adapter neu installieren; Cache leeren.               |
| Zigbee-Adapter       | Serial-Port nicht gefunden; `Error: Cannot open serial port`                | Benutzer zur `dialout`-Gruppe hinzufügen; `/dev/ttyUSB*`-Rechte prüfen; USB-Kabel und Stick testen; Adapter-Konfiguration und Port korrekt setzen. |
| Alexa2               | Auth-Token erneuern schlägt fehl; `login failed`                             | `iobroker del alexa2` → `iobroker install alexa2`; Neu-Login in Admin-Interface; AWS-Zugangsdaten prüfen.                                  |

Jede dieser Lösungen wurde in der Community vielfach bestätigt und deckt die wichtigsten Szenarien ab. Durch systematisches Vorgehen bei Installation, Start und Performance lassen sich die meisten Adapterprobleme nachhaltig beheben.
