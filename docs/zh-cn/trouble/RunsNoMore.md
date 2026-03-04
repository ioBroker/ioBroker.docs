---
title: ioBroker 已停止运行
lastChanged: 24.10.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/RunsNoMore.md
hash: Pzd/BPnQ2vPUNUd7CaZLkxWLhoWz+MoUp+oYFe6Qxcs=
---
# IoBroker 已停止运行 - 问题及解决方案完整汇总
## 问题类别概述
如果 ioBroker 无法启动或无法访问，通常是以下七个主要问题之一造成的。本文档系统地列出了所有已知和常见错误及其有效的解决方案。

## 1. 数据库锁和数据损坏
### 1.1 数据库锁定错误（最常见错误）
**症状：**

```
Server Cannot start inMem-states on port 9000: Failed to lock DB file "/opt/iobroker/iobroker-data/states.jsonl"!
Server Cannot start inMem-objects on port 9001: Failed to lock DB file "/opt/iobroker/iobroker-data/objects.jsonl"!
```

**原因：**

非正常关机（断电、硬重启）
- ioBroker进程在崩溃后仍在运行
- 数据库文件损坏或过大
系统权限不足
- 文件系统损坏（SD卡、固态硬盘）

**解决方案顺序：**

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

**重要提示：**对象数据库必须始终从备份中恢复，而不能删除！只有在必要时才能删除状态。

### 1.2 Redis数据库问题
**症状：**

- ioBroker 速度极慢
管理界面加载需要几分钟。
- 由于适配器故障，导致数据点数量无穷无尽

**诊断：**

```bash
# In Redis-Datenbank schauen (VORSICHT: dauert bei vielen Keys sehr lange!):
redis-cli
KEYS *
# Anzahl der Keys prüfen:
DBSIZE
```

**解决方案方法：**

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

Redis 维护：

```bash
# Backup der Redis-Datenbank:
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/pfad/

# Redis-Speicher optimieren (nur wirksam wenn kein AOF genutzt wird):
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

**注意：** Redis 内存优化只能在一定程度上发挥作用，并且高度依赖于配置。

## 2. 管理适配器和 Web 界面问题
### 2.1 管理适配器已停止
**症状：**

- `http://IP:8081` 无法访问
- “连接被拒绝”或超时错误
- 管理界面无法加载

**即时解决方案：**

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

**Docker 专用解决方案：**

```bash
# In Container-Console:
docker exec -it iobroker-container bash
iobroker start admin

# Oder Container neu starten:
docker restart iobroker-container
```

### 2.2 Web Adapter 冲突
**问题：**多个 Web 适配器占用同一端口或端口冲突

**解决方案：**

```bash
# Alle Web-Instanzen auflisten:
iobroker list instances | grep web

# Port-Belegung prüfen:
sudo netstat -tulpn | grep :8081
sudo netstat -tulpn | grep :8082

# Web-Adapter-Ports anpassen:
# Über Admin-Interface: Instanzen → web.0 → Konfiguration → Port ändern
```

## 3. Node.js 和依赖问题
### 3.1 Node.js 版本冲突
**症状：**

- js-controller 更新期间出现 `SyntaxError: Unexpected token` 错误（也可能是由于文件系统损坏导致的！）
Node.js 更新后适配器无法启动
NPM 命令无法正常工作

**诊断：**

```bash
# Aktuelle Versionen prüfen:
node -v
npm -v
iob --version

# Empfohlene Versionen (2025):
# Node.js: 20.x, 22.x (LTS)
# js-controller: 7.x
```

正确的更新步骤：

有关 Node.js 更新的详细信息可在 [Node.js 更新指南](https://www.iobroker.net/#de/documentation/install/updatenode.md) 中找到。

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

### 3.2 NPM 安装错误
常见错误：

- `ENOTFOUND registry.npmjs.org`
- `ENOENT: 没有该文件或目录`
- `npm: 未找到`

**重要提示：**Node.js 会自动正确安装 NPM。如果您遇到 NPM 问题，请勿手动尝试安装！

有关 Node.js 和 NPM 安装的更多信息，请参阅 [Node.js 安装指南](https://www.iobroker.net/#de/documentation/install/nodejs.md)。

**推荐解决方案：**

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

**Node.js 更新后遇到“npm not found”错误时：**

```bash
# System neu starten, damit PATH aktualisiert wird:
sudo reboot

# Nach Neustart prüfen:
node -v
npm -v
```

**重要提示：**切勿尝试手动卸载或重新安装 NPM！这通常会导致更多问题。请使用 `iob nodejs-update`，它会自动配置 NPM。

### 3.3 js-controller 更新错误
**问题：** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`

**解决方案方法：**

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

4. 系统资源和性能
### 4.1 内存问题
**症状：**

- 当可用内存低于 20% 时，系统会冻结
适配器自动停止
管理员界面已无响应

立即诊断：

```bash
# RAM-Nutzung prüfen:
free -m

# Prozess-spezifischer Verbrauch:
top -p $(pgrep -d',' iobroker)

# Swap-Nutzung:
swapon --show
```

**解决方案方法：**

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

硬件推荐：

- 树莓派 3：最多 30-40 个适配器实例
生产系统至少需要 4 GB 内存
使用固态硬盘 (SSD) 而非 SD 卡以获得更好的性能

### 4.2 硬盘问题
**症状：**

- `/` 表示 100% 入住率
日志文件大小达到 GB 级别
系统已停止响应。

紧急清理：

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

配置日志轮换：

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

### 4.3 过热和硬件问题
**症状：**

树莓派关机
- CPU温度高于80°C
- 系统随机崩溃

**诊断：**

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

**解决方案方法：**

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

5. 网络和 DNS 问题
### 5.1 DNS 解析失败
**症状：**

- `getaddrinfo ENOTFOUND` 错误
- 适配器无法连接到外部服务
`iob fix` 和 `iob diag` 都无法正常工作

**诊断：**

```bash
# DNS-Konfiguration prüfen:
cat /etc/resolv.conf
nslookup google.com
dig google.com

# Netzwerk-Interface prüfen:
ip addr
ip route
```

**解决方案方法：**

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

### 5.2 防火墙和代理问题
企业网络：

```bash
# Proxy für NPM konfigurieren:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy https://proxy.company.com:8080

# Git-Proxy (für GitHub-Dependencies):
git config --global http.proxy http://proxy.company.com:8080
```

反向代理问题：

WebSocket 连接无法正常工作
- Socket.io 路径未正确重定向

## 6. 权限和用户问题
### 6.1 权限被拒绝错误
**症状：**

- `EACCES: 权限被拒绝`
尽管执行了 `chmod 777` 命令，备份仍然失败。
- 适配器无法写入

**重要提示：** 切勿使用 `chmod 777`！这存在安全风险，而且通常无法解决问题。

**正确答案：**

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

### 6.2 Docker特有的权限问题
**问题：** Docker 容器中的卷权限

**解决方案：**

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

7. 适配器特定的系统错误
### 7.1 HomeMatic/CCU3 连接问题
**问题：** CCU3 通信期间 JSON 解析器错误

**解决方案方法：**

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

### 7.2 MQTT 适配器日志垃圾邮件
**问题：** MQTT 日志中充斥着不必要的消息

**解决方案：**

```bash
# In MQTT-Adapter Konfiguration:
# "Eigene States bekanntgeben" → nur "info.0.*"
# Log-Level auf "info" oder "warn" setzen
```

## 系统故障诊断
### 标准诊断程序
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

### 紧急维修步骤
如果问题仍不清楚，请按以下步骤操作：

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

### 何时需要进行新安装
**新安装地点：**

- 不正确的更新导致 Node.js 安装损坏
- 根操作造成大规模系统损坏
- 硬件变更（不同的架构）
- 超过 3 次修复尝试失败

**新安装前的准备工作：**

```bash
# Vollständiges Backup:
iob backup
cp -R /opt/iobroker/backups /external/storage/

# Wichtige Konfigurationsdateien sichern:
cp /opt/iobroker/iobroker-data/iobroker.json /backup/
cp -R /opt/iobroker/node_modules/iobroker.vis/www/vis-views /backup/
```

预防措施
### 设置监控
```bash
# 1. Automatische Backups (täglich):
# Backitup-Adapter konfigurieren

# 2. System-Monitoring:
# SystemInfo-Adapter für Temperatur, RAM, Festplatte
# Grenzwerte für Alarme setzen

# 3. Log-Monitoring:
# Bei kritischen Fehlern E-Mail-Benachrichtigung
```

### 维护程序
**每周：**

```bash
sudo apt update && sudo apt upgrade
iob update
# Log-Größen prüfen: du -h /opt/iobroker/log/
```

**每月：**

```bash
iob fix
iob backup
# Alte Backups bereinigen
# System-Ressourcen analysieren
```

＃＃ 概括
这份全面的问题集涵盖了所有已知的ioBroker系统错误，并针对每个问题领域提供了经过验证的解决方案。解决方案尝试的顺序根据成功概率和可靠性进行了优化。

最重要的基本规则：

1. 务必先执行 `iob fix`。
2. 在进行重大操作之前创建备份
3. 切勿在没有备份的情况下删除对象数据库。
4. 永远不要使用 `chmod 777`
5. 使用 Redis 时请注意：FLUSHALL 将删除所有内容！
6. 权限更改后：重新登录系统。
7. 使用 `iob nodejs-update` 解决 NPM 问题，不要手动尝试。