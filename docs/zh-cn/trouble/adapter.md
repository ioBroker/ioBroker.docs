---
title: 适配器错误
lastChanged: 23.10.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/adapter.md
hash: nZ9iwqzpPCgUmOMh5sGuI61nhF/AbN4qjs0NScofA38=
---
# 适配器错误 – 安装、启动和性能问题
本章仅关注**适配器特定问题**。对于一般系统问题（ioBroker 启动失败、数据库锁定、Node.js 更新），请参阅：[ioBroker 已停止运行](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)

---

1. 适配器安装问题
### 典型错误信息
- `npm ERR! 代码 ENOTFOUND` / `ENOTEMPTY` / `EINTEGRITY`
安装中止或适配器未出现在列表中
尽管配置看似正确，但仍无法安装适配器。

### 使用 iob 诊断
第一步 - 系统诊断：

```
iob diag
```

`iob diag` 命令已显示：

- ✅ 存储库配置和可用性
- ✅ 操作系统版本和待更新
- ✅ Node.js/NPM 版本和兼容性
- ✅ 最新日志条目
- ✅ 权限问题

**检查以下输出：**

- ❌ 缺少存储库列表
- ❌ 软件源配置错误（使用了 latest 而不是 stable）
- ❌ Node.js 版本过旧
- ❌ NPM 错误
- ❌ 权限错误

### 基于 IOB 诊断的解决方案
**如果存储库出现问题：**

**a) 存储库列表完全缺失：**

```
iob repo add stable http://download.iobroker.net/sources-dist.json
iob update
```

**b) 最新/测试版适配器出现问题 - 请回滚到稳定版：**

```
# Aktuelle Repository-Konfiguration anzeigen:
iob repo list

# Latest/Beta deaktivieren, stable aktivieren:
iob repo unset beta
iob repo unset latest
iob repo set stable
iob update
```

**重要提示：**从最新版本切换到稳定版后，已安装的测试版**不会**自动降级。您必须等待稳定版更新或手动降级。

```
iobroker upgrade <adaptername>@<stable-version>
```

**了解存储库差异：** → 请参阅 [什么是代码仓库？](https://www.iobroker.net/#de/documentation/basics/repositories.md)

**关于 Node.js 版本问题：** → 请参阅 [Node.js 更新说明](https://www.iobroker.net/#de/documentation/install/updatenode.md)

关于 npm 缓存问题：

```
# Cache-Integrität prüfen:
npm cache verify
```

**`npm cache verify` 的作用是什么？**

- 检查所有缓存数据包的完整性
- 自动删除损坏或不一致的缓存数据（垃圾回收）
- 验证缓存索引
- 自 npm@5 起，缓存具有自我修复功能，可自动修复自身。

**仅当出现错误提示时才彻底清除缓存：**

```
npm cache clean --force
```

⚠️ **注意：** 这将清除所有缓存，仅应在出现实际缓存问题时使用。

**彻底重新安装适配器：**

```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>

# Neuinstallation über Admin-Oberfläche (empfohlen)
# ODER per Konsole:
iobroker install <adaptername>
```

---

## 2. 适配器启动问题
### 典型症状
- 实例列表中适配器仍显示为红色/黄色
- `错误：找不到模块 <...>`
适配器短暂启动后立即停止。
- 适配器文件中出现 `SyntaxError: Unexpected token`

### 特定适配器诊断
**针对适配器日志的分析：**

```
# Live-Logs für spezifischen Adapter:
iobroker logs <adaptername> --watch

# Letzte 100 Zeilen:
iobroker logs <adaptername> | tail -100
```

**以调试模式启动适配器：**

```
# Adapter-Instanz deaktivieren
# Dann manuell im Debug-Modus starten:
cd /opt/iobroker/node_modules/iobroker.<adaptername>
node main.js 0 --debug
```

这比标准日志显示的信息要多得多。

### 解决方案
**1. 修复 ioBroker 安装：**

```
iobroker fix
```

⚠️ **重要提示：** `iobroker fix` 会修复整个 ioBroker 安装，包括：

- 所有目录的文件权限
- 系统用户和组
- 依赖关系和链接
- 始终可行，并且应该是出现问题时的第一步

**2. 重置适配器配置：**

```
# Adapter stoppen:
iobroker stop <adaptername>

# Konfiguration in Admin-Interface überprüfen
# Oft helfen Werkseinstellungen
```

**3. 重新安装依赖项：**

```
cd /opt/iobroker/node_modules/iobroker.<adaptername>
npm install --production
```

**4. 重新安装（最后手段）：**

```
iobroker stop <adaptername>
iobroker del <adaptername>
rm -rf /opt/iobroker/node_modules/iobroker.<adaptername>
iobroker install <adaptername>
```

**5. 对于 Node.js 主要更新后的原生模块：**

```
# Nur bei Major-Versionswechsel (20→22):
iobroker rebuild <adaptername>
```

### 硬件相关的启动问题
**当“意外令牌”与树莓派结合使用时：** → 可能是 SD 卡损坏！请参阅 [硬件诊断](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)

---

3. 适配器性能问题
＃＃＃ 症状
适配器响应存在延迟
- 由于单个适配器导致 CPU 负载过高
- 适配器导致内存泄漏
- 各州的数据更新并不及时。

＃＃＃ 诊断
**1. 确定各个适配器的资源消耗：**

```
# Alle ioBroker-Prozesse mit Ressourcen:
top -u iobroker

# Oder detaillierter mit htop:
htop -u iobroker
```

**2. 适配器特定性能日志：**

```
# Adapter auf "debug" Log-Level setzen
# Dann Logs beobachten:
iobroker logs <adaptername> | grep -i "slow\|timeout\|warning"
```

### 解决方案
**1. 优化轮询间隔**

在适配器配置中：

- 标准：5-10 秒 → 更佳：30-60 秒
- 仅对真正必要的数据点采用较短的时间间隔
- 完全禁用不必要的对象/状态

**2. 降低日志级别**

```
# In Admin → Instanzen → Adapter-Konfiguration:
# Log-Level von "debug" auf "info" oder "warn"
```

调试日志会造成严重的性能负担！

**3. 调整适配器缓存设置**

### 适配器特定性能提示
**JavaScript/Blockly适配器：**

- 单独激活脚本并监控性能
- 避免使用 `setInterval()` 函数设置较短的时间间隔。
- 不要将大型数组/对象保存在内存中
- 使用 `schedule()` 代替连续轮询

**历史记录/InfluxDB/SQL：**

- 仅记录相关数据点
- 使用数据保留策略（自动删除旧数据）
- 启用高频数据聚合

**MQTT/Modbus/KNX：**

- 使用订阅筛选器（并非所有主题）
- 增加重连间隔
- 尽可能降低服务质量等级

**Zigbee/Z-Wave：**

- 执行网络优化
- 移除不必要的设备
- 策略性地放置路由器设备

---

4. 常见的适配器特定问题
### HomeMatic（hm-rpc、hm-rega）
问题：与CCU的连接持续断开。解决方案：

- 使用 IP 地址而不是主机名
- 检查 CCU 防火墙设置
- 更新适配器版本

### JavaScript/TypeScript
问题：重启后脚本无法启动。解决方案：

检查 DNS 和代理

```
iobroker stop javascript
iobroker upload javascript
iobroker fix
iobroker start javascript
```

### Zigbee
**问题：** `Error: Cannot open serial port /dev/ttyUSB0` **解决方案：**

检查 /dev/ttyUSB* 权限
- 测试 USB 数据线和 U 盘
- 正确配置适配器和端口

```
# User zur dialout-Gruppe hinzufügen:
sudo usermod -aG dialout iobroker
sudo reboot
```

### Backitup（Docker）
**问题：** `EACCES: permission denied` **解决方案：** 参见 [Docker 中的备份问题](https://docs.buanet.de/de/iobroker-docker-image/docs/)

### MQTT
问题：日志中充斥着大量消息。解决方案：

- 配置：仅订阅相关主题
- 将日志级别设置为“警告”
- 禁用“宣传自身状态”

### IoBroker.vis
问题：视图无法加载；/vis-views/ 返回 404 错误。解决方案：

- 检查目录权限（chown -R iobroker:iobroker /opt/iobroker/www/vis-views）
- 清除缓存

---

## 预防错误的最佳实践
### 安装前
1. 运行 `iob diag` 并检查
2. 将软件仓库设置为**稳定版**（而不是最新版！）
3. 阅读适配器自述文件和已知问题。
4. 在论坛上搜索当前问题
5. 创建备份：`iob backup`

### 安装后
1. 监视适配器日志：`iobroker logs <适配器> --watch`
2. 检查资源消耗：`top -u iobroker`
3. 逐步调整配置
4. 只有在系统稳定后才能安装其他适配器。

### 更新期间
1. 阅读适配器的变更日志
2. 对于重大更新，请先在测试系统中进行测试。
3. 更新前请创建备份
4. 检查更新日志

### 重要说明
✅ **务必做到：**

- 通过管理界面安装适配器
- 如果出现问题，请先运行 `iob diag`
- 将生产系统的存储库设置为**稳定版**
- 如果出现任何问题，请运行`iobroker fix`。
- 阅读适配器日志，而不是盲目试验。
- 在 GitHub 问题中查找解决方案

❌ **切勿这样做：**

- 从 GitHub 永久安装适配器
- 在 ioBroker 命令前使用 `sudo`
- 一次性解决多个问题
- 在 beta/latest 分支的生产系统中测试适配器
- 创建多个实例以提高性能（只会消耗更多内存）

---

**如果您遇到其他问题：** 请创建一个论坛帖子，并附上完整的 `iob diag` 输出和适配器日志。