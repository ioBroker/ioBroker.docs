---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md
title: Команды тестирования MQTT MCDU
hash: PhT9uecledY5u+hBmGLNwCdPLuMk2wsUVZgrNQlZYoI=
---
# Команды тестирования MQTT MCDU

**Данные для подключения:**

- Маклер:`YOUR_BROKER_IP:1883`
- Имя пользователя:`iobroker`
- Пароль: (используйте свой настоящий пароль MQTT)

Заменять`[password]` Введите свои MQTT-пароль в командах ниже!

## 1. Включите подсветку (если экран темный):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

## 2. Отправить обновление дисплея:

### Простой режим (один цвет на строку):

```bash
# Green text on line 1
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"text":"HELLO FROM MAC!      ","color":"green"}'
```

### Сегментный режим (несколько цветов на строку):

```bash
# Living room temperature: "Living Room: " (white) + "22°C" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# High temperature warning: "Bedroom: " (white) + "32°C" (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Aviation style: "Take off Rwy " (white) + "08L" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Take off Rwy ","color":"white"},{"text":"08L","color":"green"}]}'

# Warning message: "WARNING: " (red) + "High Temp" (amber)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":4,"segments":[{"text":"WARNING: ","color":"red"},{"text":"High Temp","color":"amber"}]}'
```

## 3. Включите светодиод:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"RDY","state":true}'
```

## 4. Отслеживание событий нажатия кнопок (нажатие кнопок на MCDU):

```bash
mosquitto_sub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/buttons/event -v
```

---

## Управление подсветкой:

### Включите обе подсветки (максимальную яркость):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

### Установите максимальную яркость подсветки экрана (255):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"SCREEN_BACKLIGHT","brightness":255}'
```

### Установите яркость подсветки экрана на 50% (128):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"SCREEN_BACKLIGHT","brightness":128}'
```

### Настройте яркость подсветки обеих панелей по своему усмотрению:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":200,"SCREEN_BACKLIGHT":255}}'
```

### Включить подсветку только кнопок:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/single -m '{"name":"BACKLIGHT","state":true}'
```

### Выключите подсветку:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"BACKLIGHT":false,"SCREEN_BACKLIGHT":false}}'
```

---

## Примеры многоцветных умных домов:

### Дисплей управления климат-контролем

```bash
# Line 1: "Living Room: " (white) + "22°C" (green) - comfortable
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# Line 2: "Bedroom: " (white) + "32°C" (red) - too hot
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Line 3: "Kitchen: " (white) + "18°C" (cyan) - too cold
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Kitchen: ","color":"white"},{"text":"18°C","color":"cyan"}]}'
```

### Отображение состояния

```bash
# Line 1: "Lights: " (white) + "ON" (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Lights: ","color":"white"},{"text":"ON","color":"green"}]}'

# Line 2: "Security: " (white) + "ARMED" (amber)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Security: ","color":"white"},{"text":"ARMED","color":"amber"}]}'

# Line 3: "Door: " (white) + "OPEN" (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Door: ","color":"white"},{"text":"OPEN","color":"red"}]}'
```

### Мониторинг энергопотребления

```bash
# Power consumption with color-coded values
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"Power: ","color":"white"},{"text":"2.3kW","color":"green"}]}'

# High consumption warning
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":2,"segments":[{"text":"Power: ","color":"white"},{"text":"5.8kW","color":"red"}]}'
```

---

## Другие примеры:

### Полное обновление дисплея (все 14 строк):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/set -m '{
  "lines": [
    {"text":"SMART HOME MCDU      ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"<LIGHTS      STATUS> ","color":"amber"},
    {"text":"<CLIMATE       TEMP> ","color":"amber"},
    {"text":"<SECURITY     ALARM> ","color":"amber"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"                     ","color":"white"},
    {"text":"<PREV         NEXT>  ","color":"green"},
    {"text":"                     ","color":"white"}
  ]
}'
```

### Четкое отображение:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/clear -m '{}'
```

### Настройте несколько светодиодов:

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/leds/set -m '{"leds":{"RDY":true,"FAIL":false,"MCDU":true,"BACKLIGHT":true,"SCREEN_BACKLIGHT":true}}'
```

### Проверка работоспособности (пинг):

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/status/ping -m '{"requestId":"test-123"}'

# Listen for response:
mosquitto_sub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/status/pong -C 1 -v
```

---

## Доступные цвета:

- белый
- янтарь
- голубой
- зеленый
- пурпурный
- красный
- желтый
- серый

## Доступные светодиоды:

- НЕУДАЧА
- ФМ
- MCDU
- МЕНЮ
- ФМ1
- ИНД
- РДИ
- СТАТУС
- ФМ2
- ПОДСВЕТКА
- ПОДСВЕТКА ЭКРАНА