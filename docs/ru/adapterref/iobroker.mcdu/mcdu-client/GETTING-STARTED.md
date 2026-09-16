---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md
title: Начало работы: клиент MCDU на Raspberry Pi
hash: 4XjHyaDVyEoc9yj/IwX+cPfqbKbzofuxn0ogFeHeycg=
---
# Начало работы: клиент MCDU на Raspberry Pi

Инструкция по настройке и запуску mcdu-client на новом Raspberry Pi с операционной системой Pi OS Lite (64-бит).

## Предварительные требования

- Raspberry Pi 4 (или 3B+) с **64-битной версией Pi OS Lite.**
- WinWing MCDU-32-CAPTAIN подключен через USB
- Экземпляр ioBroker с запущенным адаптером mcdu в вашей сети

## 1. Установите Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
node --version  # should show v20.x
```

## 2. Клонируйте и установите

```bash
cd ~
git clone https://github.com/Flixhummel/ioBroker.mcdu.git
cd ioBroker.mcdu/mcdu-client
./install.sh
```

Скрипт установки выполнит следующие действия:

- Бегать`npm install` (Предварительно собранные бинарные файлы, компилятор не требуется)
- Создавать`config.env` из шаблона
- Установите правило udev для доступа по USB (только для Linux).
- При желании можно установить службу systemd.

## 3. Настройка

```bash
nano config.env
```

Набор`MQTT_BROKER` к вашему IP-адресу ioBroker:

```
MQTT_BROKER=mqtt://10.10.5.65:1883
```

## 4. Начало

```bash
sudo systemctl start mcdu-client
```

Или запустите напрямую:

```bash
node mcdu-client.js
```

## 5. Проверить

```bash
sudo journalctl -u mcdu-client -f
```

Вы должны увидеть, как клиент подключается к MQTT и отображает сообщение.

## Обновление

```bash
cd ~/ioBroker.mcdu/mcdu-client
git pull
npm install
sudo systemctl restart mcdu-client
```

## Поиск неисправностей

### Устройство HID не найдено

```bash
# Check the MCDU is connected
lsusb | grep 4098

# Check hidraw device exists
ls -la /dev/hidraw*

# Check udev rule
cat /etc/udev/rules.d/99-winwing-mcdu.rules

# Check group membership (log out/in after install.sh)
id -nG | grep plugdev
```

### Экран завис на экране загрузки WinWing

Прошивка принимает пакеты инициализации только один раз за цикл включения/выключения питания USB. Отключите и снова подключите USB-кабель, затем перезапустите службу.

### Соединение MQTT отклонено

```bash
# Test connectivity to your broker
mosquitto_pub -h YOUR_BROKER_IP -t test -m "hello"
```