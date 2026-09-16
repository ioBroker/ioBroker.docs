---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md
title: Начало работы с ioBroker.mcdu
hash: 9CN0h34BwMlzHjLwNnnej+UBZOUBLsPnrf171gZvHbc=
---
# Начало работы с ioBroker.mcdu

В этом руководстве описан процесс установки и подключения обоих компонентов системы «умный дом» MCDU.

## Обзор архитектуры

```
┌──────────────────┐        MQTT        ┌──────────────────┐       USB HID      ┌──────────────┐
│   ioBroker       │ <────────────────> │   mcdu-client    │ <────────────────> │  MCDU-32-    │
│   Adapter        │                    │   (Raspberry Pi) │                    │  CAPTAIN     │
│   (iobroker.mcdu)│                    │                  │                    │  (Hardware)  │
└──────────────────┘                    └──────────────────┘                    └──────────────┘
         │                                       │
         │  Runs on your ioBroker server         │  Runs on a Raspberry Pi
         │  Handles pages, rendering, logic      │  USB HID ↔ MQTT bridge (no logic)
```

**Для установки необходимы два компонента:**

1. **Адаптер ioBroker** (`iobroker.mcdu` ) -- работает на вашем сервере ioBroker, обрабатывает отрисовку страниц, навигацию и состояния автоматизации.
2. **Клиент MCDU** (`mcdu-client` ) -- работает на Raspberry Pi с подключенным через USB модулем MCDU, обеспечивает связь USB HID с MQTT.

Оба устройства обмениваются данными по протоколу MQTT. Для этого необходим работающий MQTT-брокер (например, Mosquitto), доступный для обоих устройств.

## Предварительные требования

- Работающая установка **ioBroker**
- **MQTT-брокер** (например, Mosquitto), доступный как для ioBroker, так и для Raspberry Pi.
- **Raspberry Pi 4** (или 3B+) с 64-битной версией Pi OS Lite и платой WinWing MCDU-32-CAPTAIN, подключенной через USB.
- **Node.js 18+** на Raspberry Pi

---

## 1. Установите адаптер ioBroker.

### Вариант A: Через административный интерфейс (из npm)

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку **«Адаптеры»** .
3. Поиск **mcdu**
4. Нажмите **«Установить»**
5. Пример`mcdu.0` создается автоматически

Это рекомендуемый метод для стабильных релизов.

### Вариант B: Через административный интерфейс (из GitHub)

Используйте это для предварительных или тестовых версий:

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку **«Адаптеры»** .
3. Нажмите на **значок GitHub/Octocat** (вверху слева).
4. Перейдите на вкладку **«Пользовательские настройки»** .
5. Вставьте URL-адрес репозитория:
   ```
   https://github.com/Flixhummel/ioBroker.mcdu
   ```
6. Нажмите **«Установить»**

### Вариант C: Через командную строку

```bash
cd /opt/iobroker
iobroker add mcdu
```

Или сначала установите из npm, а затем добавьте:

```bash
npm install iobroker.mcdu
iobroker add mcdu
```

### Настройте адаптер

1. Откройте административный интерфейс и перейдите в **раздел «Экземпляры».**
2. Нажмите на значок гаечного ключа.`mcdu.0`
3. Необходимо выполнить как минимум следующие настройки:
   - **Адрес MQTT-брокера** — IP-адрес/имя хоста вашего MQTT-брокера (например,`localhost` )
   - **Порт MQTT** — по умолчанию`1883`
4. Сохраните и закройте — адаптер запустится и подключится к MQTT.

В административном интерфейсе есть четыре вкладки для настройки:

- **Общие настройки** — адрес MQTT-брокера, оптимизация производительности
- **Устройство и страницы** — настройка страницы для каждого устройства, цвет по умолчанию, шаг регулировки яркости.
- **Функциональные клавиши** — сопоставьте 11 функциональных клавиш с навигацией по страницам.
- **Расширенные настройки и информация о программе** — отладка, информация о версии

---

## 2. Установите клиент MCDU (Raspberry Pi).

mcdu-client — это USB HID-мост, работающий на Raspberry Pi рядом с физическим оборудованием MCDU.

> Полное пошаговое руководство по устранению неполадок см. в разделе[`mcdu-client/GETTING-STARTED.md`](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md) .

### Установите Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
node --version   # Should show v20.x
```

### Клонируйте и установите

```bash
cd ~
git clone https://github.com/Flixhummel/ioBroker.mcdu.git
cd ioBroker.mcdu/mcdu-client
./install.sh
```

Скрипт установки выполнит следующие действия:

- Бегать`npm install` (предварительно созданные двоичные файлы для node-hid, компилятор не требуется)
- Создавать`config.env` из шаблона
- Установите правило udev для доступа hidraw через USB.
- При желании можно установить службу systemd.

### Настройка

```bash
nano config.env
```

Установите минимальный уровень:

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883
MQTT_TOPIC_PREFIX=mcdu
```

### Тестовый запуск

```bash
node mcdu-client.js
```

Вы должны увидеть, как клиент подключается к MQTT и отображает сообщение. Нажмите`Ctrl+C` остановиться.

### Запустить как сервис

```bash
sudo systemctl start mcdu-client
sudo journalctl -u mcdu-client -f
```

### Обновление

```bash
cd ~/ioBroker.mcdu/mcdu-client
git pull
npm install
sudo systemctl restart mcdu-client
```

---

## 3. Проверка от начала до конца.

После запуска обоих компонентов:

1. **Проверьте подключение адаптера** в ioBroker:
   - В административном интерфейсе перейдите в **раздел «Объекты»** .
   - Перейти к`mcdu.0.info.connection` — должно быть`true`

2. **Проверьте журналы mcdu-client:**
   ```bash
   journalctl -u mcdu-client -f
   ```

3. **Нажмите кнопку на MCDU:**
   - В логах mcdu-client вы должны увидеть событие нажатия кнопки.
   - В ioBroker соответствующее состояние кнопки находится в разделе`mcdu.0.devices.{deviceId}.buttons.*` следует обновить

4. **Проверьте дисплей:**
   - На экране MCDU должна отображаться настроенная домашняя страница со строкой состояния и содержимым.

Если что-то не работает, проверьте:

- MQTT-брокер доступен как с ioBroker, так и с Raspberry Pi.
- Префикс темы совпадает как в конфигурации адаптера, так и в конфигурации самого адаптера.`config.env`
- Устройство MCDU определяется через USB:`lsusb | grep 4098` (должно показать)`ID 4098:bb36` )

---

## Дополнительная литература

- [Руководство по настройке страниц](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) — как настроить страницы и навигацию.
- [Быстрый старт автоматизации](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md) — создание сценариев с 32 состояниями автоматизации.
- [Архитектура](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md) — проектирование систем
- [Концепция UX](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md) — шаблоны UX для кабины пилота
- [README для mcdu-client](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) — Темы MQTT, протокол отображения, устранение неполадок
- [документация по разработке адаптера ioBroker](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)