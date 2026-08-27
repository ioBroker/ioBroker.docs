---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cctvql/README.md
title: ioBroker.cctvql
hash: zhl1HEiRIs5r2vb+G2rCYPPqUPRKSl+D4BWY4haQAl8=
---
<p align="center"><img src="docs/assets/cover.svg" alt="ioBroker.cctvql cover" width="100%"></p>

<p align="center"><img src="docs/assets/logo.svg" alt="логотип ioBroker.cctvql" width="96" height="96"></p>

# IoBroker.cctvql
Адаптер ioBroker для [cctvQL](https://github.com/arunrajiah/cctvql) — слой обработки запросов на естественном языке для систем видеонаблюдения.

Задавайте вопросы типа: «Были ли люди у входной двери прошлой ночью?»* непосредственно из скриптов ioBroker и потоков Blockly, получайте данные об обнаружении в режиме реального времени с устройств Frigate, Hikvision, Synology, Dahua, Milestone, ONVIF и других.

---

## Предварительные условия
Бегущий [сервер cctvQL](https://github.com/arunrajiah/cctvql):

```bash
docker run -p 8000:8000 \
  -e CCTVQL_ADAPTER=frigate \
  -e CCTVQL_FRIGATE_HOST=http://192.168.1.100:5000 \
  ghcr.io/arunrajiah/cctvql:latest
```

---

## Конфигурация
| Поле | По умолчанию | Описание |
|---|---|---|
| Хост | `localhost` | Имя хоста или IP-адрес сервера cctvQL |
| Протокол | `http` | `http` или `https` |
| Протокол | `http` | `http` или `https` |
| Интервал опроса | `30` с | Как часто получать события обнаружения |
| Интервал опроса | 30 с | Как часто получать события обнаружения |

---

## Точки данных
### Запрос
| ID | Тип | Описание |
|---|---|---|
| `cctvql.0.query.send` | строка (доступна для записи) | Напишите здесь вопрос на естественном языке, чтобы инициировать запрос |
| `cctvql.0.query.intent` | строка | Обнаруженное намерение (например, `query_events`) |
| `cctvql.0.query.intent` | строка | Обнаруженное намерение (например, `query_events`) |

### События
| ID | Тип | Описание |
|---|---|---|
| `cctvql.0.events.latest` | Строка JSON | Массив последних событий обнаружения |
| `cctvql.0.cameras.<id>.lastEvent` | Строка JSON | Последнее событие для каждой камеры (создано автоматически) |
| `cctvql.0.cameras.<id>.lastEvent` | Строка JSON | Последнее событие для каждой камеры (создается автоматически) |

### Статус
| ID | Тип | Описание |
|---|---|---|
| `cctvql.0.info.connection` | логическое значение | `true` когда cctvQL доступен |

---

## Пример: Запрос в скрипте
```javascript
// In an ioBroker JavaScript adapter script:
setState('cctvql.0.query.send', 'Any cars in the driveway today?');

on({ id: 'cctvql.0.query.answer', change: 'any' }, (obj) => {
    log('cctvQL says: ' + obj.state.val);
    // → "Yes, a white SUV was detected at 14:32 and 17:10."
});
```

---

## Changelog

### 1.0.5 (2026-07-20)
* Remove spurious `localhost` key from all 11 i18n translation files
* Align polling interval UI minimum to 15 s (matches code floor)
* Remove PTZ claim from adapter descriptions and README intro

### 1.0.4 (2026-07-11)
* Remove npm-token from deploy step to enable OIDC trusted publishing (E3019)
* Add v1.0.3 and v1.0.4 entries to README changelog (E6029)
* Merge bot PRs: fix schema links, add CHANGELOG_OLD.md, optimize Dependabot config

### 1.0.3 (2026-06-27)
* Use self-rescheduling setTimeout for poll loop to prevent overlapping cycles
* Clamp pollingInterval in code (min 15 s, max 3600 s) independent of UI limits
* Remove unimplemented PTZ state handler
* Require Node.js >= 22; drop Node.js 20 (EOL) from test matrix

### 1.0.2 (2026-06-07)
* Update @alcalzone/release-script* to 5.2.x (checker E0036)
* Require Node.js >= 24; update CI deploy job to node 24 (checker E3022)
* Add i18n key for `placeholder` in jsonConfig host field (checker E5612)

### 1.0.1 (2026-04-27)
* Add bluefox as npm collaborator

### 1.0.0 (2026-04-21)
* Initial release — natural-language queries and event polling

---

## License

MIT License

Copyright (c) 2026 arunrajiah <arunrajiah@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.