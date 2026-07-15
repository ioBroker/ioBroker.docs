---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schlueter-thermostat/README.md
title: ioBroker.schlueter-thermostat
hash: XsM1CXUOLgWGPWM/rQJ6W+lOzuTdSFDDotXkTOKqYTE=
---
# IoBroker.schlueter-термостат

![Версия NPM](https://img.shields.io/npm/v/iobroker.schlueter-thermostat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schlueter-thermostat.svg)
![Количество установок](https://iobroker.live/badges/schlueter-thermostat-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/schlueter-thermostat-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.schlueter-thermostat.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
![Лицензия](https://img.shields.io/badge/License-MIT-lightgrey)
![Облачная архитектура](https://img.shields.io/badge/Architecture-Cloud%20API%20Bridge-blue?style=for-the-badge&logo=cloudflare)
![Применение концепции](https://img.shields.io/badge/Control-Apply%20Based-green?style=for-the-badge)
![Поддержка режимов](https://img.shields.io/badge/Modes-Schedule%20|%20Comfort%20|%20Manual%20|%20Boost%20|%20Eco%20|%20Frost%20Protection%20|%20Vacation-orange?style=for-the-badge)

**Тесты:** ![Тестирование и выпуск](https://github.com/patricknitsch/ioBroker.schlueter-thermostat/workflows/Test%20and%20Release/badge.svg)

---

##
## 🌍 Обзор
<img align="left" src="admin/schlueter-thermostat.png" alt="изображение" width="128" /><p> Этот адаптер интегрирует <strong>термостаты Schlüter / OJ Microline OWD5</strong> в ioBroker через <strong>официальные облачные API</strong> .

Он основан на интеграции с Home Assistant от @robbinjanssen. Для получения дополнительной информации см. документацию.

> **Только облачное решение** — локальный шлюз, Modbus или API локальной сети не требуются.

##
## 🚀 Как начать
1. Установите адаптер в ioBroker.
2. Открытие конфигурации экземпляра
3. Введите:

| Настройки | Описание |
| ----------------- | ----------------------------- |
| Имя пользователя | Ваш логин в облачное хранилище Schlüter/OJ |
| Пароль | Пароль для облака |
| Ключ API | Приведенный ниже ключ работает в большинстве случаев |
| Идентификатор клиента | Найден в информации о термостате |
| Версия клиентского ПО | Числовое значение с термостата |
| Интервал опроса | По умолчанию: 60 секунд |

4. Сохраните и запустите адаптер.

Для API-ключа можно попробовать: `f219aab4-9ac0-4343-8422-b72203e2fac9`.
Этот ключ можно найти на форуме: `https://community.home-assistant.io/t/mwd5-wifi-thermostat-oj-electronics-microtemp/445601`, поэтому он выглядит как глобальный ключ.

##
## Документация
[🇺🇸 Документация](./docs/en/README.md)

[🇩🇪 Документация](./docs/de/README.md)

##
## Обзор компактной архитектуры
### Значки по архитектуре
### Компактная структура программы
```mermaid
flowchart LR
  UI[User / UI] --> IO[ioBroker States]
  IO --> ADP[Adapter]

  ADP -->|read| OWD5[OWD5 Cloud]
  ADP -->|write| OCD5[OCD5 Cloud]
  OCD5 --> TH[Thermostat]

  ADP --> OBJ[Object Tree]
  OBJ --> RO[Read States]
  OBJ --> AP[Apply Controls]
```

### Внутренний поток (мини)
```mermaid
flowchart TB
  READY[onReady] --> LOGIN[Cloud Login]
  LOGIN --> POLL[pollOnce]
  POLL --> UPSERT[Update Objects + States]
  UPSERT --> BACKOFF{All offline?}
  BACKOFF -- yes --> INC[Increase interval up to 1h then 12:00/00:00]
  BACKOFF -- no --> RESET[Reset to base interval]
  INC --> POLL
  RESET --> POLL

  APPLYBTN[Apply Button] --> ROUTER[applyRouter]
  ROUTER --> API[updateThermostat]
```

##
## 📌 Примечания
- Разработано и протестировано с использованием одного термостата.
— Поддерживается работа с несколькими устройствами, но отзывы приветствуются.

##

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.4 (2026-06-05)
* (copilot) Fixes for Repo Checker

### 0.7.3 (2026-05-25)
* (copilot) Fixes for Repo Checker

### 0.7.2 (2026-05-23)
* (copilot) Add Icons for Notifications

### 0.7.1 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 0.7.0 (2026-05-14)

- (claude) Add Notification Manager

**Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.