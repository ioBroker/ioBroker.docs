---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/mcdu-client/README.md
title: MCDU MQTT-клиент
hash: EWRmxAVCM0Akx092SaBo5Ik4tv+hsYg1j3+Dhs4B46Y=
---
# MCDU MQTT-клиент

Аппаратный мост между WINWING MCDU-32-CAPTAIN и MQTT-брокером. Работает как "простой терминал" — без бизнес-логики, просто USB HID <-> MQTT.

## Архитектура

```
┌─────────────────┐      MQTT       ┌──────────────────┐      USB HID     ┌──────────────┐
│   ioBroker      │ <─────────────> │  mcdu-client.js  │ <──────────────> │  MCDU-32-    │
│   Adapter       │                 │                  │                  │  CAPTAIN     │
└─────────────────┘                 └──────────────────┘                  └──────────────┘
```

## Поддержка оборудования

Применение`node-hid` для связи USB HID на всех платформах:

- **macOS** : бэкэнд IOHIDManager (передача управления через IOHIDManager)
- **Linux/Raspberry Pi** : бэкенд hidraw (ядро отправляет управляющие сигналы SET\_REPORT)

> Для работы прошивки WinWing требуется передача управляющих сигналов SET\_REPORT. Ядро hidraw обрабатывает это автоматически — специальная настройка не требуется.

## Быстрый старт

### macOS (разработка)

```bash
cd mcdu-client
npm install
node mcdu-client.js
```

### Raspberry Pi (в производстве)

Полные инструкции по настройке см. в файле [GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md) .

## Конфигурация

Редактировать`config.env` :

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883   # MQTT broker address
MQTT_TOPIC_PREFIX=mcdu                    # Topic prefix (default: mcdu)
MQTT_CLIENT_ID=mcdu-client-mac           # Client ID (auto-derived from hostname if blank)
```

## Протокол отображения (прошивка WinWing)

### Критические ограничения

1. **Однократная инициализация** : прошивка принимает только`0xf0` Пакеты инициализации отправляются **один раз за каждое включение/выключение питания USB** . После закрытия/повторного открытия программного обеспечения пакет инициализации молча игнорируется. Откройте устройство один раз и никогда не закрывайте его.

2. **40 мс между пакетами отображения** : Прошивка требует 40 мс между последовательными пакетами.`0xf2` Отображение пакетов. Более быстрая отправка приводит к ненадежной или незаметной потере отрисовки.

3. **Только ASCII** : все байты символов, отправляемые на дисплей, ДОЛЖНЫ быть <= 0x7F. Прошивка молча отбрасывает весь кадр дисплея, если встречается хотя бы один байт > 0x7F — без ошибок, без подтверждения, дисплей просто зависает. Это обрабатывается в два уровня:
   - **Адаптер** (`lib/rendering/PageRenderer.sanitizeAscii()` ): очищает текст строки состояния / навигационной цепочки
   - **Клиент** (`lib/mcdu.js sanitizeAscii()` ): очищает все содержимое строк в`setLine()` и`_setLineSegments()`

4. **Состояние светодиодов после отображения** : всегда записывайте состояние светодиодов после обновления данных на дисплее, а не до этого.

### Последовательность запуска

```
1. Open HID device once
2. initDisplay()       — 17 x 0xf0 packets, 10ms between each
3. wait 200ms          — firmware settle
4. clear()             — 16 x 0xf2 WHITE+spaces -> WinWing logo disappears
5. Connect MQTT        — in parallel with settle wait
6. wait ~3s total      — firmware fully settled
7. Receive display/set -> updateDisplay() -> setAllLEDs()
```

## Темы MQTT

Все темы начинаются с префикса`{MQTT_TOPIC_PREFIX}/{deviceId}/` .

### Клиент получает (адаптер -> клиент)

| Тема           | Цель                                            |
| -------------- | ----------------------------------------------- |
| `display/set`  | Полное обновление дисплея (14 строк, сохранено) |
| `display/line` | Обновление в одну строку                        |
| `leds/set`     | Включите все светодиоды                         |
| `leds/single`  | Установите один светодиод                       |
| `status/ping`  | Запрос на проверку состояния здоровья           |

### Клиент публикует (клиент -> адаптер)

| Тема            | Цель                                          |
| --------------- | --------------------------------------------- |
| `buttons/event` | события нажатия кнопок                        |
| `status/online` | Онлайн-объявление (LWT)                       |
| `status/pong`   | Ответ на запрос о проверке состояния здоровья |

## Поиск неисправностей

### После перезагрузки программы изображение зависло на экране загрузки WinWing.

После первого выключения и включения питания USB прошивка игнорирует пакеты инициализации. Для сброса состояния прошивки **требуется физическое отключение/повторное подключение** . Это предусмотрено разработчиками — клиент предназначен для работы в качестве постоянно действующей службы, которая запускает устройство только один раз.

### Экран зависает при переходе между страницами.

Прошивка WinWing незаметно сбрасывает весь кадр дисплея при обнаружении любого символьного байта > 0x7F. Дисплей остается зафиксированным на предыдущей странице без сообщения об ошибке.

Несимволы ASCII могут встречаться в двух местах:

- **Строка состояния / навигационная цепочка** : названия страниц, например, "Главное меню" — очищены с помощью`PageRenderer.sanitizeAscii()` в адаптере
- **Содержимое строк** : надписи на кнопках типа "Zuruck" — отредактировано с помощью`mcdu.sanitizeAscii()` в`setLine()` перед написанием

Если зависание экрана повторяется, проверьте следующее:`[DISPLAY] NON-ASCII char at line X col Y` В журнале клиента это означает, что один символ был пропущен.`setLine()` и вызовет падение частоты кадров.

### Устройство HID не найдено (Linux)

```bash
# Check USB connection
lsusb | grep 4098

# Check hidraw device
ls -la /dev/hidraw*

# Check udev rule
cat /etc/udev/rules.d/99-winwing-mcdu.rules

# Check group membership
id -nG | grep plugdev
```

### Соединение MQTT отклонено

```bash
mosquitto_pub -h YOUR_BROKER_IP -t test -m "hello"
```

## Структура файлов

```
mcdu-client/
├── mcdu-client.js        # Main entry point
├── lib/
│   ├── mcdu.js           # USB HID driver (node-hid, all platforms)
│   └── button-map.json   # Button ID -> name mapping
├── config.env            # Local config (gitignored on Pi)
├── config.env.template   # Config template
├── install.sh            # Pi setup script
└── mcdu-client.service   # systemd service file
```

## License

MIT — Felix Hummel