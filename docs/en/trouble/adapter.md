---
title: Adapter error
lastChanged: 23.10.2025
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/adapter.md
hash: lIClIaBhU2DmDN73iu+GwEdTeFPQ6Qtxs4laS4nv8Ac=
---
# Adapter errors: Installation, startup, and performance problems

This chapter focuses exclusively on **adapter-specific problems** . For general system problems (ioBroker not starting, database locks, Node.js updates), see: [ioBroker is no longer working.](/docs/trouble/RunsNoMore.md)

---

## 1. Adapter installation problems

### Typical error messages

- `npm ERR! code ENOTFOUND` /`ENOTEMPTY` /`EINTEGRITY`
- Installation aborts or adapter does not appear in the list
- `Cannot install adapter` despite seemingly correct configuration

### Diagnosis with iob diag

**First step - system diagnostics:**

```
iob diag
```

The`iob diag` The command already shows:

- ✅ Repository configuration and availability
- ✅ OS version and pending updates
- ✅ Node.js/NPM versions and compatibility
- ✅ Recent log entries
- ✅ Permission problems

**Check the output for:**

- ❌ Missing repository list
- ❌ Incorrect repository configuration (latest instead of stable)
- ❌ Outdated Node.js version
- ❌ NPM error
- ❌ Permission error

### Solutions based on iob diag

**In case of repository problems:**

**a) Repository list is completely missing:**

```
iob repo add stable http://download.iobroker.net/sources-dist.json
iob update
```

**b) Problems with latest/beta adapters - revert to stable:**

```
# Aktuelle Repository-Konfiguration anzeigen:
iob repo list

# Latest/Beta deaktivieren, stable aktivieren:
iob repo unset beta
iob repo unset latest
iob repo set stable
iob update
```

**Important:** After switching from latest to stable, installed beta versions will **not** be automatically downgraded. You must wait until stable catches up or downgrade manually.

```
iobroker upgrade <adaptername>@<stable-version>
```

**Understanding repository differences:** → See [What is a repository](/docs/basics/repositories.md)

**Regarding Node.js version problems:**\
&#x20;→ See [Node.js update instructions](/docs/install/updatenode.md)

**Regarding npm cache problems:**

```
# Cache-Integrität prüfen:
npm cache verify
```

**What does`npm cache verify` ?**

- Verifies the integrity of all cached packets
- Automatically removes corrupted or inconsistent cache data (garbage collection)
- Validates the cache index
- Since npm\@5, the cache is self-healing and repairs itself automatically.

**Only clear the cache completely if errors are displayed:**

```
npm cache clean --force
```

⚠️ **Note:** This will clear the entire cache and should only be used for actual cache problems.

**Reinstall the adapter cleanly:**

```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>

# Neuinstallation über Admin-Oberfläche (empfohlen)
# ODER per Konsole:
iobroker install <adaptername>
```

---

## 2. Adapter startup problems

### Typical symptoms

- Adapter remains red/yellow in the instance list
- `Error: Cannot find module <...>`
- The adapter starts briefly and then stops immediately.
- `SyntaxError: Unexpected token` in adapter files

### Specific adapter diagnostics

**Targeted analysis of adapter logs:**

```
# Live-Logs für spezifischen Adapter:
iobroker logs <adaptername> --watch

# Letzte 100 Zeilen:
iobroker logs <adaptername> | tail -100
```

**Start the adapter in debug mode:**

```
# Adapter-Instanz deaktivieren
# Dann manuell im Debug-Modus starten:
cd /opt/iobroker/node_modules/iobroker.<adaptername>
node main.js 0 --debug
```

This shows significantly more information than the standard log.

### Possible solutions

**1. Repair the ioBroker installation:**

```
iobroker fix
```

⚠️ **Important:**`iobroker fix` Repairs the entire ioBroker installation, including:

- File permissions for all directories
- System users and groups
- Dependencies and links
- It's **always** possible and should be the first step when problems arise.

**2. Reset adapter configuration:**

```
# Adapter stoppen:
iobroker stop <adaptername>

# Konfiguration in Admin-Interface überprüfen
# Oft helfen Werkseinstellungen
```

**3. Reinstall dependencies:**

```
cd /opt/iobroker/node_modules/iobroker.<adaptername>
npm install --production
```

**4. Reinstallation (last resort):**

```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>
iobroker install <adaptername>
```

**5. For native modules after a major Node.js update:**

```
# Nur bei Major-Versionswechsel (20→22):
iobroker rebuild <adaptername>
```

### Hardware-related startup problems

**When using "Unexpected token" in combination with Raspberry Pi:**\
&#x20;→ Possibly a faulty SD card! See [hardware diagnostics.](/docs/trouble/RunsNoMore.md)

---

## 3. Adapter performance issues

### Symptoms

- Adapter reacts with a delay
- High CPU load due to single adapter
- Adapter causes memory leaks
- States are only updated sporadically.

### diagnosis

**1. Determine the resource consumption of individual adapters:**

```
# Alle ioBroker-Prozesse mit Ressourcen:
top -u iobroker

# Oder detaillierter mit htop:
htop -u iobroker
```

**2. Adapter-specific performance logs:**

```
# Adapter auf "debug" Log-Level setzen
# Dann Logs beobachten:
iobroker logs <adaptername> | grep -i "slow\|timeout\|warning"
```

### Solutions

**1. Optimize polling intervals**

In the adapter configuration:

- Standard: 5-10 seconds → better: 30-60 seconds
- Short intervals only for truly necessary data points
- Completely disable unnecessary objects/states

**2. Reduce log levels**

```
# In Admin → Instanzen → Adapter-Konfiguration:
# Log-Level von "debug" auf "info" oder "warn"
```

Debug logs can cause significant performance load!

**3. Adjust adapter cache settings**

### Adapter-specific performance tips

**JavaScript/Blockly adapter:**

- Activate scripts individually and monitor performance.
- `setInterval()` avoid short intervals
- Do not keep large arrays/objects in RAM
- `schedule()` instead of permanent polling

**History/InfluxDB/SQL:**

- Log only relevant data points
- Use retention policies (automatically delete old data)
- Enable aggregation for high-frequency data

**MQTT/Modbus/KNX:**

- Use subscription filters (not all topics)
- Increase reconnect intervals
- Reduce QoS level where possible

**Zigbee/Z-Wave:**

- Perform network optimization
- Remove unnecessary devices
- Strategically place router devices

---

## 4. Common adapter-specific problems

### HomeMatic (hm-rpc, hm-rega)

**Problem:** Connection to the CCU keeps dropping\
&#x20;**Solution:**

- Use IP address instead of hostname
- Check CCU firewall settings
- Update adapter version

### JavaScript/TypeScript

**Problem:** Scripts do not start after restart\
&#x20;**Solution:**

- Check DNS and proxy

```
iobroker stop javascript
iobroker upload javascript
iobroker fix
iobroker start javascript
```

### Zigbee

**Problem:**`Error: Cannot open serial port /dev/ttyUSB0`\
&#x20;**Solution:**

- Check /dev/ttyUSB\* permissions
- Testing USB cables and sticks
- Correctly configure the adapter and port.

```
# User zur dialout-Gruppe hinzufügen:
sudo usermod -aG dialout iobroker
sudo reboot
```

### Backitup (Docker)

**Problem:**`EACCES: permission denied`\
&#x20;**Solution:** See [Backup problems in Docker](https://docs.buanet.de/de/iobroker-docker-image/docs/)

### MQTT

**Problem:** Logs are flooded with messages\
&#x20;**Solution:**

- In configuration: Subscribe only to relevant topics
- Set log level to "warning".
- Disable "Advertise own states"

### ioBroker.vis

**Problem:** Views are not loading; 404 error for /vis-views/ **Solution:**

- Check directory permissions (chown -R iobroker:iobroker /opt/iobroker/www/vis-views)
- Clear cache

---

## Best practices for error prevention

### Before installation

1. `iob diag` execute and check
2. Set the repository to **stable** (not latest!)
3. Read the adapter readme and known issues.
4. Search the forum for current problems
5. Create a backup:`iob backup`

### After installation

1. Monitor adapter logs:`iobroker logs <adapter> --watch`
2. Check resource consumption:`top -u iobroker`
3. Adjust the configuration step by step
4. Only install additional adapters once the system is stable.

### During updates

1. Read the adapter's changelog
2. For major updates, test first in the test system.
3. Create a backup before updating
4. Check the update logs.

### Important instructions

✅ **Always do:**

- Install adapter via admin interface
- In case of problems first`iob diag` carry out
- Set repository to **stable** for production systems
- `iobroker fix` execute in case of any problems
- Read adapter logs instead of experimenting blindly.
- Search for solutions on GitHub issues

❌ **Never do this:**

- Install adapter permanently from GitHub
- With`sudo` working before ioBroker commands
- Fix multiple problems at once
- Test adapters in the production system in the Beta/Latest branch
- Creating multiple instances to improve performance (only consumes more RAM)

---

**For further problems:** Create a forum thread with complete information.`iob diag` -Output and adapter logs.