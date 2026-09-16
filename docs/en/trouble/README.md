---
title: Introduction
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/README.md
hash: mo6AgE5gRLGRDrQBQNCSncZDophHCjq/9wR5KwSYrpM=
---
# ioBroker Troubleshooting - Comprehensive Guide

## Introduction for beginners

ioBroker is a powerful smart home platform based on Node.js that connects various IoT devices and services via adapters. For beginners, it's important to understand that a stable ioBroker installation rests on **five fundamental pillars** , which should be systematically checked when problems arise.

## The 5 pillars of a stable ioBroker installation

### 1. **Operating system selection and configuration**

**Recommended operating systems:**

- **Debian** (Stable): Maximum stability, longest support cycles, ideal for production systems
- **Ubuntu LTS** : A good compromise between up-to-dateness and stability, large community
- **Raspberry Pi OS** : Optimized for Pi hardware, based on Debian
-

**Possible, but not recommended:**

- **macOS**

**Basic system requirements:**

- At least 2 GB RAM (4 GB recommended for larger installations)
- At least 16 GB of storage space (32 GB+ for large installations)
- Stable internet connection for updates and adapter downloads
- SSH access for maintenance work

**Why choosing the right operating system is important:** Choosing the wrong one leads to recurring problems. Ubuntu's intermediate releases have short support cycles and quickly become obsolete. Windows installations are possible, but not recommended.

### 2. **Operating system maintenance**

**Regular maintenance routine:**

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

**Maintenance automation:** Experienced users can employ maintenance scripts that automatically perform system and ioBroker updates. However, these should only be used after extensive testing in production environments.

### 3. **Correct ioBroker installation**

**Single-line installation (recommended):**

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

**What the installation script does:**

- Automatically creates the user`iobroker`
- Install the correct Node.js version
- Set up all necessary directories and permissions.
- Installs basic adapter (Admin, Discovery)
- Configures autostart services

**Avoid common installation errors:**

- **Do not** install as root
- **Do not** manually pre-install Node.js (the script does it automatically)
- **Do not** use sudo before the curl command.
- Always use a fresh, updated system.

### 4. **Work with the right user**

**Understanding the user concept:** ioBroker runs under its own system user named`iobroker` , **not** as root. This is a critical security aspect.

**User hierarchy:**

- **Your login user** (e.g., pi, ubuntu): For SSH login and system administration
- **iobroker-User** : Executes all ioBroker processes, has limited sudo rights.
- **root** : For system administration only, never for ioBroker operation

**Resolving typical legal problems:**

```bash
# Wenn ioBroker-Befehle nicht funktionieren:
sudo usermod -aG iobroker $(whoami)  # Ihren User zur iobroker-Gruppe hinzufügen
# Danach: Aus- und wieder einloggen

# Fixer-Script bei Rechteproblemen:
iob fix
# als Fallback, falls die Kurzform nicht greift
curl -sL https://iobroker.net/fix.sh | bash -
```

**Things you should NEVER do:**

- ioBroker with`sudo iobroker ...` carry out
- Working as root user is required for normal ioBroker operations.
- Manually "repair" file permissions with chmod 777

### 5. **Keep Node.js up to date**

**Understanding compatibility:**

- **js controller 7.x** : Node.js 18.x, 20.x, 22.x, 24.x
- **js controller 6.x** : Node.js 18.x, 20.x, 22.x
- **js controller 5.x** : Node.js 16.x, 18.x, 20.x
- **Outdated versions** : Node.js versions below 20.x are end-of-life.

**Correctly update Node.js:**

```bash
# Moderne Methode (seit 2024):
iob stop                 # ioBroker stoppen
iob fix                  # System reparieren
iob nodejs-update       # Auf die empfohlene Node.js-LTS-Version wechseln
sudo reboot             # System neu starten
iob start               # ioBroker starten
```

**Why Node.js updates are critical:**

- Security updates close vulnerabilities
- New adapters require modern Node.js versions.
- Performance improvements
- LTS versions (20, 22, 24) are stable and supported long-term.

**Update frequency:**

- **Security updates** : Install immediately
- **Minor updates** : Check monthly
- **Major updates** : Based on community feedback, not immediately upon release.

## Additional important concepts for beginners

### Setting up and using SSH access

SSH (Secure Shell) is the standard way to manage ioBroker systems:

- **Windows** : Use PuTTY or Windows Terminal
- **macOS/Linux** : Use the built-in terminal app
- **Connection** :`ssh benutzername@IP-adresse`

### Backup strategy from the start

```bash
# Manuelles Backup:
iob backup

# Automatisches Backup mit backitup-Adapter:
# Über Admin-Interface installieren und konfigurieren
```

### Learn to understand log files

```bash
# Live-Logs anzeigen:
iob logs --watch

# Spezifische Adapter-Logs:
iob logs adaptername

# System-Logs:
sudo journalctl -u iobroker -f
```

### Basic troubleshooting mentality

1. **Always back up before making changes**
2. **One change after another**
3. **Read the logs before experimenting wildly.**
4. **Use the community forum for complex problems**
5. **Please be patient – the system needs time to start up.**

## Typical beginner pitfalls

### 1. Too many changes, too fast

- **Problem** : Installing multiple adapters in parallel leaves it unclear what is causing the problems.
- **Solution** : Test one adapter at a time.

### 2. Updates without backup

- **Problem** : System broken after update, no return possible
- **Solution** : Automatic backup before every major update

### 3. Root privileges as a "solution"

- **Problem** :`sudo` Place before ioBroker commands if something isn't working
- **Solution** : Find the cause, don't forcefully "fix" the symptom.

### 4. Follow outdated instructions

- **Problem** : Following internet tutorials from 2018
- **Solution** : Prefer official documentation and current forum threads

### 5. Docker without Linux basics

- **Problem** : Using Docker containers without an understanding of volumes, networks, etc.
- **Solution** : First Linux basics, then Docker specializations

## How these fundamentals lead to troubleshooting

Understanding these five pillars will help you understand the following chapters much better:

- **"ioBroker is no longer working"** : Addresses problems with database locks, admin outages, and Node.js conflicts.
- **"Adapter errors"** : Focuses on installation, startup, and performance problems of individual adapters.

**Important note** : Most ioBroker problems arise from one or more neglected fundamentals. Before attempting complex repairs, systematically check these five areas.

---

_The following chapters build on this basic understanding and offer concrete solutions for specific problem situations._