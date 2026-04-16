---
title: 介绍
lastChanged: 05.10.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/README.md
hash: NTA2o0nW9VvzoSsjrl2s8CcA3LI2t3CVjcxuMmsvduw=
---
# IoBroker故障排除 - 全面指南
## 初学者入门
ioBroker 是一个功能强大的基于 Node.js 的智能家居平台，它通过适配器连接各种物联网设备和服务。对于初学者来说，了解 ioBroker 的稳定安装依赖于五个基本支柱至关重要，当出现问题时，应系统地检查这些支柱。

## 稳定安装 ioBroker 的 5 个支柱
### 1. 操作系统选择与配置
**推荐操作系统：**

- **Debian**（稳定版）：稳定性最高，支持周期最长，是生产系统的理想选择
- **Ubuntu LTS**：在保持更新和稳定性之间取得了良好的平衡，拥有庞大的社区
- **Raspberry Pi OS**：针对树莓派硬件优化，基于 Debian

- **可行，但不推荐：**

- **macOS**

**基本系统要求：**

- 至少需要 2 GB 内存（大型安装建议使用 4 GB 内存）
- 至少需要 16 GB 的存储空间（大型安装需要 32 GB 以上）
- 稳定的网络连接，用于更新和适配器下载
- 用于维护工作的 SSH 访问权限

**操作系统选择的重要性：** 选择错误的操作系统会导致反复出现问题。Ubuntu 的中间版本支持周期短，很快就会过时。虽然可以安装 Windows，但不建议这样做。

### 2. 操作系统维护
**日常维护程序：**

```bash
# Wöchentlich ausführen:
sudo apt update          # Paketlisten aktualisieren
sudo apt upgrade -y      # Sicherheitsupdates installieren
sudo apt autoremove      # Nicht benötigte Pakete entfernen
```

```bash
# Monatliche Vollwartung:
sudo apt update
sudo apt full-upgrade    # Größere Systemupdates
sudo apt autoclean       # Paket-Cache bereinigen
sudo reboot             # Neustart nach Kernel-Updates
```

**自动化维护：**经验丰富的用户可以使用维护脚本自动执行系统和 ioBroker 更新。但是，这些脚本只能在生产环境中经过充分测试后才能使用。

### 3. **正确安装 ioBroker**
**单线安装（推荐）：**

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

安装脚本的功能：

- 自动创建用户 `iobroker`
- 安装正确的 Node.js 版本
- 设置所有必要的目录和权限
- 安装基本适配器（管理、发现）
- 配置自动启动服务

**避免常见的安装错误：**

- **请勿**以 root 用户身份安装
- **请勿**手动预先安装 Node.js（脚本会自动安装）。
- **请勿**在 curl 命令前使用 sudo
始终使用最新、更新的系统。

### 4. **与合适的用户合作**
**理解用户概念：** ioBroker 以名为 `iobroker` 的系统用户身份运行，**而非**以 root 用户身份运行。这是至关重要的安全方面。

用户层级结构：

- **您的登录用户名**（例如，pi、ubuntu）：用于 SSH 登录和系统管理
- **iobroker-User**：执行所有 ioBroker 进程，拥有有限的 sudo 权限
- **root**：仅用于系统管理，绝不能用于 ioBroker 操作

**解决典型法律问题：**

```bash
# Wenn ioBroker-Befehle nicht funktionieren:
sudo usermod -aG iobroker $(whoami)  # Ihren User zur iobroker-Gruppe hinzufügen
# Danach: Aus- und wieder einloggen

# Fixer-Script bei Rechteproblemen:
iob fix
# als Fallback, falls die Kurzform nicht greift
curl -sL https://iobroker.net/fix.sh | bash -
```

**你绝对不应该做的事：**

- 使用 `sudo iobroker ...` 运行 ioBroker
- 以 root 用户身份执行常规 ioBroker 操作
- 使用 chmod 777 手动“修复”文件权限

### 5. **保持 Node.js 更新**
了解兼容性：

- **js-controller 7.x**：Node.js 18.x、20.x、22.x、24.x
- **js-controller 6.x**：Node.js 18.x、20.x、22.x
- **js-controller 5.x**：Node.js 16.x、18.x、20.x
- **过时的版本**：Node.js 版本低于 20.x 已停止维护。

**正确更新 Node.js：**

```bash
# Moderne Methode (seit 2024):
iob stop                 # ioBroker stoppen
iob fix                  # System reparieren
iob nodejs-update     # Auf empfohlene Node.js 20.x wechseln
sudo reboot             # System neu starten
iob start               # ioBroker starten
```

为什么 Node.js 更新至关重要：

- 安全更新修复漏洞
- 新适配器需要最新版本的 Node.js。
- 性能提升
- LTS 版本（20、22、24）稳定且长期支持。

**更新频率：**

- **安全更新**：立即安装
- **小幅更新**：每月查看
- **重大更新**：基于社区反馈，并非在发布后立即更新

## 初学者需要注意的其他重要概念
### 设置和使用 SSH 访问
SSH（安全外壳协议）是管理ioBroker系统的标准方法：

- **Windows**：使用 PuTTY 或 Windows 终端
- **macOS/Linux**：使用内置的终端应用程序
- **连接**: `ssh 用户名@IP 地址`

### 从一开始就制定备份策略
```bash
# Manuelles Backup:
iob backup

# Automatisches Backup mit backitup-Adapter:
# Über Admin-Interface installieren und konfigurieren
```

### 学习理解日志文件
```bash
# Live-Logs anzeigen:
iob logs --watch

# Spezifische Adapter-Logs:
iob logs adaptername

# System-Logs:
sudo journalctl -u iobroker -f
```

### 基本故障排除思路
1. **进行任何更改前务必备份**
2. **一次只做一项改变**
3. **在进行任何大规模实验之前，请务必阅读日志。**
4. **遇到复杂问题，请使用社区论坛**
5. 请耐心等待——系统需要时间启动。

## 初学者常犯的错误
### 1. 变化太多，速度太快
- **问题**：并行安装多个适配器会导致无法确定问题的原因。
- **解决方案**：一次测试一个适配器

### 2. 无备份更新
- **问题**：系统更新后崩溃，无法恢复
- **解决方案**：在每次重大更新前执行自动备份

### 3. 以root权限作为“解决方案”
- **问题**：在 ioBroker 命令前添加 `sudo` 会导致某些功能无法正常工作。
- **解决方法**：找到原因，不要强行“解决”症状。

### 4. 遵循过时的指示
- **问题**：按照 2018 年的互联网教程操作
- **解决方案**：优先参考官方文档和最新的论坛帖子。

### 5. 无需 Linux 基础知识的 Docker
- **问题**：在不了解卷、网络等的情况下使用 Docker 容器。
- **解决方案**：先学习 Linux 基础知识，再深入学习 Docker。

## 这些基本原理如何帮助解决问题
理解这五大支柱将有助于你更好地理解接下来的章节：

- **“ioBroker 不再工作”**：解决数据库锁定、管理员中断和 Node.js 冲突等问题。
- “适配器错误”：重点关注单个适配器的安装、启动和性能问题。

**重要提示**：大多数ioBroker问题都源于一个或多个基本要素被忽略。在尝试进行复杂的修复之前，请系统地检查以下五个方面。

---

接下来的章节将在此基本理解的基础上，针对具体问题提供具体的解决方案。