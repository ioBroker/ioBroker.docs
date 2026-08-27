---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jetframe/README.md
title: ioBroker.jetframe
hash: /nidYHpoiVmDwthqpQCl4ouR0XiIX9AZ8fIiW+PeLlo=
---
![Логотип](../../../en/adapterref/iobroker.jetframe/admin/jetframe.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.jetframe.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jetframe.svg)
![НПМ](https://nodei.co/npm/iobroker.jetframe.png?downloads=true)

# IoBroker.jetframe
## JetFrame
**JetFrame** — это адаптер ioBroker для отслеживания и визуализации полетов в реальном времени на основе данных ADS-B. Он обнаруживает самолеты, пролетающие мимо вашего окна, и отображает их в современном веб-приложении с фотографиями, информацией о полете и статистикой.

## Функции
- **Отслеживание полета в режиме реального времени** через ADS-B (adsb.lol с автоматическим переключением на adsb.fi)
- **Обнаружение окон** – отображает только те самолеты, которые фактически пролетают в вашем поле зрения.
- **Визуализация в реальном времени** с фотографией самолета, логотипом авиакомпании, логотипом производителя и маршрутом полета.
- **Тепловая карта** – ежедневная статистика с анализом времени наблюдения и указанием лучшего времени для наблюдения.
- **Статистика** – рекордные дни, отслеживание тяжелых самолетов, обнаружение самолетов в специальной ливрее.
- **Вывод речи** – опционально, через TTS браузера или внешние объекты ioBroker.
- **Обнаружение взлетно-посадочной полосы** – показывает вероятную взлетно-посадочную полосу для вылета/прилета.
- **Адаптивный веб-интерфейс** – оптимизирован для iPhone, iPad и настольных компьютеров (портретная и альбомная ориентация)
- **Режим пролёта** – опциональное обнаружение самолётов, пролетающих непосредственно над головой.
- **Обнаружение аварийных ситуаций** – выделены коды 7500/7600/7700

## Требования
- ioBroker js-controller ≥ 6.0.11
- Node.js ≥ 22
- Простой API-адаптер (для веб-интерфейса)
— Зона покрытия ADS-B в вашем районе (используются общедоступные API, собственный приемник не требуется)

## Конфигурация
После установки настройте адаптер в разделе **Администрирование → JetFrame → Экземпляр → Настройки**:

| Настройки | Описание |
|---|---|
| **Домашние координаты** | Широта и долгота вашего местоположения |
| **Аэропорт** | Код IATA, название и координаты ближайшего аэропорта |
| **Радиус поиска (морские мили)** | Радиус (морские мили) вокруг аэропорта, используемый для запросов ADS-B |
| **Направление окна** | По компасу, куда обращено ваше окно (0° = север) |
| **Поле зрения окна** | Поле зрения вашего окна в градусах (например, 90°) |
| **Высотные ограничения** | Минимальная/максимальная высота (футы), на которой отображаются самолеты |
| **Интервал опроса** | Как часто ведется поиск новых самолетов (поиск и отслеживание в реальном времени) |
| **Облеты** | Позволяет обнаруживать самолеты, пролетающие непосредственно над головой |
| **Речевой вывод** | TTS браузера, внешний объект ioBroker или отключено |
| **Изображения** | Настройка для внешних логотипов авиакомпаний и производителей |

## Веб-интерфейс
JetFrame использует собственный встроенный веб-сервер — Simple-API или другие адаптеры не требуются. Веб-приложение доступно напрямую по адресу:

```
http://<iobroker-ip>:<webPort>/index.html
```

Порт (`webPort`, по умолчанию `8189`) можно настроить в параметрах адаптера.

### Страницы
| Страница | URL | Описание |
|---|---|---|
| **Главная** | `index.html` | Обзор, состояние системы, навигация |
| **Тепловая карта** | `heatmap.html` | Ежедневная статистика и лучшее время для наблюдения |
| **Статистика** | `stats.html` | Рекорды, рейтинг за все время, история по дням |
| **Статистика** | `stats.html` | Рекорды, рейтинги за все время, история по дням |

### Параметры URL
| Параметр | Пример | Описание |
|---|---|---|
| `instance` | `?instance=1` | Экземпляр адаптера (по умолчанию: `0`) |
| `source` | `?source=overflight` | Режим отображения: `current`, `airport`, `overflight` |

### Дополнительно: интеграция с ioBroker VIS
Если вы хотите отображать данные JetFrame внутри классического виджета ioBroker VIS вместо (или в дополнение к) встроенным страницам, JetFrame все равно сможет записывать `vis-config.json` для адаптера Simple-API, если вы настроите `Simple-API Host/IP` и `Simple-API Port` в настройках. Это совершенно необязательно и не требуется для встроенных веб-страниц, упомянутых выше.

### Язык
Страницы веб-интерфейса (`index.html`, `frame.html`, `heatmap.html`, `stats.html`) на английском языке. Страница конфигурации администратора полностью переведена на все 11 поддерживаемых ioBroker языков. Дополнительные голосовые объявления (`speechText`, настраиваемые через `speechTemplate`) по умолчанию остаются на немецком языке, поскольку это настраиваемая пользователем функция голосового сопровождения, ориентированная на немецкий язык; шаблон можно свободно редактировать для любого языка.

## Штаты ioBroker
Адаптер создает следующие состояния в разделе `jetframe.0.*`:

### Статус
| Штат | Тип | Описание |
|---|---|---|
| `enabled` | логическое значение | Включить/выключить адаптер |
| `clearImageCache` | логическое значение | Триггер: очистка кэша изображений |
| `clearImageCache` | логическое значение | Триггер: очистка кэша изображений |

### Текущий рейс (`current.*`)
| Штат | Описание |
|---|---|
| `callsign` | Позывной IATA (например, `LH123`) |
| `routeCodesText` | Маршрут в виде кодов IATA (например, `FRA → MUC`) |
| `airlineName` | Название авиакомпании |
| `aircraftTypeText` | Тип самолета (например, `Airbus A321`) |
| `aircraftSize` | Класс размера (`Narrowbody`, `Widebody`, `Jumbo`, …) |
| `registration` | Регистрация (например, `D-AIBL`) |
| `altitudeFt` | Высота в футах |
| `speedKt` | Скорость в узлах |
| `verticalRate` | Скорость набора высоты/снижения (футы/мин) |
| `probableRunwayText` | Вероятная взлетно-посадочная полоса (например, `RWY 25L`) |
| `windowPositionText` | Положение окна (например, `left of window · 12°`) |
| `modeVisText` | Текст режима (например, `🛬 Landing Frankfurt`) |
| `localImageUrl` | URL кэшированного фото самолета |
| `speechText` | Текстовый вывод речи |
| `specialLiveryVisText` | Специальная раскраска (например, `100th Anniversary`) |
| `emergencyText` | Экстренная информация (для кодов 7500/7600/7700) |
| `emergencyText` | Экстренная информация (для кодов 7500/7600/7700) |

### Статистика (`statistics.today.*`, `statistics.yesterday.*`, `statistics.alltime.*`)
Ежедневная статистика с указанием количества полетов, посадок, вылетов, пролетов, лучшего времени для наблюдения за самолетами, счетчика тяжелых самолетов, счетчика самолетов в специальной ливрее, ведущих авиакомпаний и самых популярных маршрутов.

## Изображения и логотипы
JetFrame может отображать фотографии самолетов, логотипы авиакомпаний и производителей. По умолчанию они загружаются из общедоступных API (JetPhotos для фотографий, HexDB для данных о маршрутах/авиакомпаниях). Внешние источники логотипов можно настроить в параметрах адаптера. Дополнительное локальное кэширование уменьшает количество внешних запросов и ускоряет отображение.

## Политика конфиденциальности и юридическая информация
JetFrame запрашивает общедоступные API ADS-B:

- **[adsb.lol](https://adsb.lol)** – основной источник данных
- **[adsb.fi](https://adsb.fi)** – автоматический резервный вариант
- **[Jetphotos.com](https://www.jetphotos.com)** – фотографии самолетов (только поиск по URL, загрузка невозможна, если не включено кэширование)
- **[HexDB.io](https://hexdb.io)** – информация о маршрутах и авиакомпаниях
- **[Flightradar24](https://www.flightradar24.com)** – дополнительная информация о маршруте

Все данные хранятся исключительно локально в ioBroker. Никакие пользовательские данные не передаются третьим лицам.

Данные ADS-B представляют собой общедоступные сигналы, передаваемые воздушными судами. Их использование разрешено в большинстве стран и допускается авиационными властями. Ответственность за законное использование лежит на операторе.

Все товарные знаки, логотипы, названия авиакомпаний, изображения самолетов и связанный с ними контент остаются собственностью соответствующих правообладателей. JetFrame не связан, не одобрен и не имеет официальной связи ни с одной авиакомпанией, аэропортом, производителем самолетов, JetPhotos, поставщиком ADS-B или службой отслеживания рейсов.

Данный адаптер предназначен исключительно для частного, информационного, некоммерческого локального просмотра. Пользователи несут ответственность за соблюдение условий лицензий и API настроенных внешних сервисов.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.3 (2026-08-11)

- (backfisch88) Fixed a flicker regression on the Statistics page (Yesterday/Top Airlines/Top Routes panels) caused by two competing DOM-update mechanisms; unified into a single, race-free update path. Reduced daily history to 5 entries and expanded alltime airline/route rankings to top 10 with column-fill layout. Fixed intermittent mouse-wheel scrolling on the Heatmap hour scroller (scroll-snap was fighting small wheel deltas).

### 1.3.2 (2026-08-09)

- (backfisch88) Translated the remaining hardcoded English hour-card badges (NOW/PEAK/HR) on the Heatmap page to follow the `webLanguage` setting.

### 1.3.1 (2026-08-09)

- (backfisch88) Fixed flicker on all web UI pages caused by redundant DOM writes on every poll cycle (most noticeable on the Live Frame page). Added mouse wheel and click-and-drag support for the heatmap hour scroller (previously touch-only). Fixed runway/window-position display logic that only recognized German words, breaking display in English mode.

### 1.3.0 (2026-08-08)

- (backfisch88) Full bilingual support (English/German) for both the web UI and all dynamic flight/statistics text written to states, following a new `webLanguage` setting (auto/en/de). Adapter log messages remain English-only regardless of this setting, as required.
- (backfisch88) Fixed 404s for cached aircraft/airline images after the Simple-API removal; images are now served directly by the built-in web server.
- (backfisch88) Fixed relative HTTP redirects causing "Invalid URL" errors in external API requests.
- (backfisch88) HTTP 400/404 responses from external flight-data APIs (expected for aircraft with no available data) are now logged at debug level instead of warn.
- (backfisch88) Fixed a visual flicker on the Live Frame page caused by redundant DOM updates every 5 seconds.
- (backfisch88) Various smaller layout and translation fixes across the web UI.

### 1.2.0 (2026-08-07)

- (backfisch88) JetFrame now runs its own built-in web server for the user-facing pages (index.html, frame.html, heatmap.html, stats.html) - no external Simple-API adapter is required anymore. New `webPort` setting (default 8189). Simple-API config is now optional and only used for classic ioBroker VIS widget integration.

Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 backfisch88 <h@h.de>

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