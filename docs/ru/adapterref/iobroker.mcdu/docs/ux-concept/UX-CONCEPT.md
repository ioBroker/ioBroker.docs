---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md
title: Контроллер умного дома MCDU: концепция пользовательского интерфейса
hash: xCglm5YuYvlCN15LQ2bp0Dv7CSI9FV4B2QQTBgIwKgU=
---
# Контроллер умного дома MCDU: концепция пользовательского интерфейса

## Назначение документа

Полная система проектирования взаимодействия для контроллера умного дома MCDU. Определяет все шаблоны взаимодействия с пользователем, компоновку дисплея, правила навигации и механизмы визуальной обратной связи. Данный документ служит авторитетной спецификацией для реализации.

**Целевое оборудование** : WinWing MCDU-32-CAPTAIN\
&#x20;**Целевая платформа** : система «умный дом» ioBroker\
&#x20;**Философия дизайна** : точность авиационного класса + практичность для умного дома.

---

## А. Гибкость конфигурации

### A.1. Возможность настройки функциональных клавиш

⚠️ **КЛЮЧЕВОЙ ПРИНЦИП ПРОЕКТИРОВАНИЯ** : Назначение функциональных клавиш настраивается **ПОЛЬЗОВАТЕЛЕМ** , а не задается жестко.

**Сопоставление по умолчанию и пользовательское сопоставление** :

Сопоставления, определенные в`MCDU-SMARTHOME-MAPPING.md` Это **РЕКОМЕНДУЕМАЯ КОНФИГУРАЦИЯ ПО УМОЛЧАНИЮ,** оптимизированная для типичных сценариев использования умного дома. Пользователи должны иметь возможность настраивать эти сопоставления в соответствии со своими конкретными потребностями.

**Настраиваемые элементы** :

1. **Назначение функциональных клавиш** (12 клавиш):
   - Какую категорию/страницу открывает каждая функциональная клавиша
   - Исключение: клавиша MENU всегда открывает главное меню (не настраивается).

2. **Содержимое страницы быстрого доступа** :
   - Какие действия отображаются на странице QUICK (LSK1-6 L/R = 12 ячеек)?
   - Порядок быстрых действий
   - Метки для каждого действия

3. **Распределение светодиодов** (11 светодиодов):
   - Какие состояния системы запускают какие светодиоды?
   - Уровни яркости светодиодов (выкл/тусклый/яркий)
   - Шаблоны мигания для различных типов оповещений

**Неконфигурируемые элементы** (для обеспечения единообразия):

- Стандартные ключевые функции: BRT, DIM, CLR, OVFY, SLEW
- Поведение блокнота
- LSK-контекстная чувствительность (определяемая содержимым страницы)
- Основные шаблоны навигации
- Значения цветовой кодировки

### A.2. Сопоставление по умолчанию (рекомендуется)

**Функциональные клавиши → Категории** (из MCDU-SMARTHOME-MAPPING.md):

| Физический ключ     | Сопоставление по умолчанию | Обоснование                                          |
| ------------------- | -------------------------- | ---------------------------------------------------- |
| ТОПЛИВО             | ЭНЕРГИЯ                    | Прямая аналогия: Топливо = Энергия                   |
| ДИР                 | БЫСТРЫЙ                    | Быстрый доступ к избранному                          |
| ПРОГ                | СТАТУС                     | Отслеживание хода выполнения системы                 |
| ИДЕАЛЬНОЕ СОСТОЯНИЕ | СЗЕНЕН                     | Производительность = Предварительные настройки сцены |
| ИНИЦИАЛИЗАЦИЯ       | EINSTELLUNGEN              | Инициализация/настройка системы                      |
| ДАННЫЕ              | ГЕРАТЭ                     | База данных/каталог устройств                        |
| Ф-ПЛН               | ZEITPLAN                   | Расписание = План полета                             |
| РАД                 | КЛИМА                      | Ручная настройка аналогового                         |
| СЕК                 | СИХЕРХАЙТ                  | Безопасность (удачное совпадение!)                   |
| УВД                 | МЕЛДУНГЕН                  | Системные коммуникации                               |
| МЕНЮ                | HAUPTMENÜ                  | Корневое меню (исправлено)                           |
| АЭРОПОРТ            | РЮМЕ                       | Информация, основанная на местоположении             |

**Почему именно этот вариант по умолчанию?**

- Наиболее часто встречающиеся категории на прямых клавишах (ENERGIE, STATUS, SZENEN)
- Логические аналогии с функциями авиации
- Доступ к 12 категориям одним нажатием
- Остальные категории доступны через HAUPTMENÜ.

### Примеры пользовательских сопоставлений A.3

**Пример 1: Пользователь-владелец пула** хочет получить прямой доступ к элементам управления пулом:

```
FUEL     → ENERGIE (keep)
DIR      → QUICK (keep)
PROG     → POOL (changed from STATUS)
PERF     → SZENEN (keep)
INIT     → EINSTELLUNGEN (keep)
DATA     → GERÄTE (keep)
F-PLN    → ZEITPLAN (keep)
RAD      → KLIMA (keep)
SEC      → SICHERHEIT (keep)
ATC      → MELDUNGEN (keep)
MENU     → HAUPTMENÜ (fixed)
AIRPORT  → RÄUME (keep)
```

**Пример 2: Владелец электромобиля** отдает приоритет зарядке электромобиля:

```
FUEL     → E-MOBILITÄT (changed - energy theme fits!)
DIR      → QUICK (keep)
PROG     → STATUS (keep)
...
```

**Пример 3: Пользователь, которому важна безопасность,** хочет иметь прямой доступ к оповещению:

```
SEC      → ALARMANLAGE (changed from SICHERHEIT)
ATC      → SICHERHEIT (changed from MELDUNGEN)
...
```

### Интерфейс конфигурации A.4

**Где пользователи настраивают сопоставления** :

**Основной способ** : административный интерфейс ioBroker (веб-интерфейс)

- Перейдите к настройкам адаптера MCDU.
- Вкладка «Назначение функциональных клавиш»
- Интерфейс с функцией перетаскивания:
  ```
  [FUEL  ] ⇄ [Dropdown: ENERGIE ▼]
  [DIR   ] ⇄ [Dropdown: QUICK   ▼]
  [PROG  ] ⇄ [Dropdown: STATUS  ▼]
  ...
  ```
- Раздел «Быстрая настройка доступа»:
  - 12 слотов (LSK1-6 L/R)
  - Перетаскивайте действия из библиотеки.
  - Задать метки (максимум 20 символов)
  - Предварительный просмотр на виртуальном дисплее MCDU

**Вторичный метод** : Настройка устройства с помощью MCDU (расширенные настройки)

- EINSTELLUNGEN → TASTENBELEGUNG
- Ограниченные возможности редактирования (выберите из списка)
- Не рекомендуется для первоначальной настройки (веб-интерфейс проще).

**Хранилище конфигурации** :

- Сохраняется в конфигурации адаптера ioBroker (JSON).
- Резервное копирование выполнено с помощью резервных копий ioBroker.
- Профили с возможностью экспорта/импорта (совместное использование конфигураций пользователями)

### A.5 Проверка конфигурации

**Правила предотвращения некорректных конфигураций** :

1. **Нет дублирующихся сопоставлений** :
   - Каждая функциональная клавиша может быть назначена только на ОДНУ категорию.
   - Система предотвращает присвоение одной и той же категории нескольким ключам.
   - Исключение: Доступ к категории возможен как с помощью функциональной клавиши, так и с помощью клавиши HAUPTMENÜ.

2. **Меню. Зарезервированные клавиши** :
   - Меню всегда открывает HAUPTMENÜ (это нельзя изменить)
   - Гарантирует пользователям возможность всегда вернуться в главное меню.

3. **Минимальное количество страниц** :
   - Программа HAUPTMENÜ должна быть доступна (через клавишу MENU).
   - Как минимум один из следующих вариантов: быстрый доступ, доступ к статусу или прямой доступ к категории.
   - Предотвращает ситуации "блокировки доступа".

4. **Конфликты светодиодов** :
   - Один и тот же светодиод может загораться при выполнении нескольких условий (в порядке приоритета).
   - Невозможно отключить критически важные светодиоды (FAIL, MCDU, RDY).

**Ошибки валидации** (отображаются в веб-интерфейсе):

```
❌ Error: Function key "FUEL" already assigned to ENERGIE
❌ Error: No access to STATUS page (recommended to keep)
⚠️  Warning: QUICK page empty (no quick actions configured)
✅ Configuration valid - Save to apply
```

### A.6 Профили конфигурации

**Готовые шаблоны** (пользователь может выбрать и настроить):

**Профиль 1: «Сбалансированный дом»** (по умолчанию)

- Равный акцент на энергетику, климат и безопасность.
- Быстрый доступ к общим сценам
- Центральный мониторинг состояния

**Профиль 2: «Энергетически ориентированный»**

- ЭНЕРГИЯ, ФОТОВОЛТАИКА, Э-МОБИЛИТЭТ на прямых клавишах
- Быстрый доступ отображает статистику энергопотребления.
- ориентированный на мониторинг

**Профиль 3: «Ориентирован на комфорт»**

- SZENEN, KLIMA, LICHT, МУЛЬТИМЕДИЯ в приоритете
- Короткие сцены для создания атмосферы.
- Меньше внимания уделяется техническим данным

**Профиль 4: «Безопасность прежде всего»**

- ЗИКЕРХАЙТ, АЛАРМАНЛАЖ, ВЕРШЛУСС прямой доступ
- Быстрый доступ отображает состояние безопасности.
- Мониторинг с помощью камер/датчиков

**Профиль 5: «Минимальная настройка»**

- Только HAUPTMENÜ, QUICK, STATUS
- Всё остальное через дерево меню.
- Простейшая кривая обучения

**Как подать заявку** :

```
ioBroker Admin UI:
  MCDU Adapter Settings
    → Configuration Profiles
      → Select: "Energy Focused" ▼
      → [Preview]
      → [Apply Profile]
      → (Optional) Customize further
      → [Save Configuration]
```

---

## B. Иерархия навигации

### B.1 Общая структура

**Четырехслойная архитектура** :

```
Layer 0: Function Keys (Direct Jump)
    ↓
Layer 1: Category Main Page
    ↓
Layer 2: Sub-Category / Device List / Detail Page
    ↓
Layer 3: Action Confirmation / Edit Mode
```

**Правило максимальной глубины** : ни одно взаимодействие не должно требовать более чем 3 уровней навигации при нажатии функциональной клавиши.

**Примеры путей** :

**Путь 1: Быстрое действие (2 уровня)**

```
Press QUICK → Press LSK (Scene) → ✓ Done
```

**Путь 2: Поиск информации (2 уровня)**

```
Press ENERGIE → View data → Done
```

**Путь 3: Управление устройством (3 уровня)**

```
Press KLIMA → Select Room → Edit Temp → ✓ Done
```

**Путь 4: Изменение конфигурации (3 уровня)**

```
Press EINSTELLUNGEN → Select Option → Confirm → ✓ Done
```

### B.2 Структура главного меню

**HAUPTMENÜ** (доступ через кнопку MENU):

```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
                   WEITER>

[SLEW → to page 2]

HAUPTMENÜ               2/2
---
< GERÄTE               (LSK1L)
< ALARMANLAGE          (LSK2L)
< ANWESENHEIT          (LSK3L)
< STATUS               (LSK4L)
< MELDUNGEN            (LSK5L)
< EINSTELLUNGEN        (LSK6L)

> QUICK ACCESS          (LSK1R)
> [CUSTOM 1]            (LSK2R: User-defined)
> [CUSTOM 2]            (LSK3R: User-defined)
< ZURÜCK
```

**Особенности меню** :

- Доступны все 13+ категорий.
- Две страницы (максимум 12 элементов на странице)
- Настраиваемые слоты для категорий, добавляемых пользователем.
- Всегда доступно через клавишу МЕНЮ
- «< ZURÜCK» возвращается на предыдущую страницу

### B.3 Правила навигации по подменю

**Правило 1: Единый формат заголовка**

```
[CATEGORY] > [SUB-PAGE]  X/Y
```

Примеры:

```
ENERGIE > PV DETAILS     1/1
KLIMA > WOHNZIMMER       1/1
GERÄTE > STEHLAMPE       1/1
```

**Правило 2: Индикаторы страниц**

- Всегда отображать текущую страницу / общее количество страниц (например,`1/3` )
- Если только одна страница: показать`1/1` (обозначает отсутствие страниц)
- Количество страниц включает в себя подкатегории, а не только прокрутку.

**Правило 3: Типы подстраниц**

**Тип A: Информационный дисплей** (действия LSK не требуются)

```
ENERGIE                 1/3
AKTUELL:    2340 W
HEUTE:      12.4 kWh
KOSTEN:     2.48 €
---
NETZ:       +340 W
PV:         2500 W
BATTERIE:   -500 W
< INDEX            WEITER>
```

- Отображение чистых данных
- Для навигации по страницам используйте клавишу SLEW.
- LSK-корпуса для более глубокого бурения (опционально)

**Тип B: Меню выбора**

```
SZENEN                  1/2
AKTIV:      FILM MODUS
---
< GUTE NACHT           (LSK3L)
< GUTEN MORGEN         (LSK4L)
< FILM MODUS ✓         (LSK5L: Active)
< ABWESEND             (LSK6L)
< INDEX          WEITER>
```

- LSK выполняют действия или осуществляют навигацию.
- Активный элемент отмечен знаком ✓
- Надписи четко указывают на действие.

**Тип C: Форма ввода данных**

```
KLIMA > WOHNZIMMER      1/1
IST:        21.8°C
SOLL:       [  .  ]°C  (LSK2L: Edit)
VENTIL:     45%
MODUS:      AUTO       (LSK4L: Change)
---
< ZURÜCK
```

- Поля с`[ ]` или стрелки указывают на возможность редактирования
- LSK рядом с полем активирует режим редактирования
- Блокнот используется для ввода данных.

**Тип D: Прокручиваемый список**

```
GERÄTE                  1/1
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
↓ MEHR               FILTER>
```

- Количество отображаемых элементов превышает допустимое (14 строк)
- ПРОДОЛЖИТЬ ↓↑ для прокрутки
- `↓ MEHR` Индикатор показывает больше информации ниже.
- ЛСК выбирает товар

### B.4 Концепция хлебных крошек

**Всегда отображать текущий путь** :

**Одноуровневый** (основная категория):

```
ENERGIE                 1/3
```

**Два уровня** (категория > подстраница):

```
ENERGIE > PV DETAILS    1/1
```

**Три уровня** (категория > список > элемент):

```
GERÄTE > LICHT > STEHLAMPE  1/1
```

**Максимальная длина навигационной цепочки** : 27 символов (чтобы поместиться на первой строке).

**Сокращение** (при необходимости):

```
GERÄTE > ... > STEHLAMPE    1/1
```

**Хлебные крошки = Подсказка для навигации** :

- Показывает, где вы находитесь.
- Клавиша CLR возвращает на один уровень назад.
- Одинаковый на всех страницах

### B.5 Навигация назад (клавиша CLR)

**Поведение клавиш CLR в зависимости от контекста** :

**Контекст 1: Блокнот содержит данные**

```
Action: CLR → Clear scratchpad
Result: Scratchpad empty, stay on page
```

**Контекст 2: Блокнот пуст, на подстранице**

```
Current: KLIMA > WOHNZIMMER
Action: CLR
Result: Return to KLIMA main page
```

**Контекст 3: Блокнот пуст, на главной странице категории**

```
Current: ENERGIE (main)
Action: CLR
Result: Return to previous category OR HAUPTMENÜ
```

**Контекст 4: Двойное нажатие (аварийный выход)**

```
Current: Any page (even 3 levels deep)
Action: CLR CLR (within 1 second)
Result: Return to HAUPTMENÜ or STATUS
```

**Визуальная обратная связь** :

```
After CLR:
[Brief flash] ← BACK (amber text, 0.5s)
Then: Display previous page
```

**"< ZURÜCK" LSK** (явная кнопка возврата):

- Альтернатива ключу CLR
- Всегда отображается на страницах с подробным описанием.
- Аналогично поведению при однократном нажатии кнопки CLR.
- Более удобен для поиска новыми пользователями

### B.6 Навигация по главному экрану (клавиша МЕНЮ)

**Клавиша MENU = Мгновенный возврат в HAUPTMENÜ.**

**Поведение** :

- Однократное нажатие MENU → HAUPTMENÜ стр. 1
- Работает с ЛЮБОЙ страницы, на ЛЮБОЙ глубине
- Не очищает черновик (черновик остается)
- Не настраивается (всегда HAUPTMENÜ)

**Примеры использования** :

1. **Заблудились в навигации** : МЕНЮ → вернуться в главное меню
2. **Сменить категорию** : МЕНЮ → выбрать другую категорию
3. **Отметьте все пункты** : МЕНЮ → просмотреть полный список категорий

**После нажатия кнопки МЕНЮ** :

```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
...
```

**Комбинированная навигация** :

```
User on: GERÄTE > LICHT > STEHLAMPE (3 levels deep)
User wants: KLIMA category

Option A (via MENU):
  Press MENU → HAUPTMENÜ
  Press LSK2L → KLIMA

Option B (via Function Key, if configured):
  Press RAD (mapped to KLIMA) → Direct jump

Option B is faster IF function key is mapped!
```

### B.7 Круговая навигация (SLEW)

**На главных страницах категорий SLEW переносится на следующую страницу** :

**Навигация влево/вправо** (эквивалент функциональной клавиши):

```
ENERGIE → SLEW → → KLIMA → SLEW → → LICHT → ... → SLEW → → ENERGIE
```

**Назначение функциональных клавиш для определения порядка действий** (настраивается пользователем):

- Если пользователь настроил меню FUEL→ENERGIE, DIR→QUICK, PROG→STATUS...
- Порядок НАВОРА: ЭНЕРГИЯ → БЫСТРЫЙ → СТАТУС → СЗЕНЕН → ...
- Круговая структура: последняя категория → первая категория

**Почему именно круговая модель?**

- Нет тупиков
- Удобный просмотр категорий
- Мышечная память (удерживайте SLEW → для перехода к категориям X)

**Навигация вверх/вниз** (прокрутка):

```
On long lists (>14 lines):
SLEW ↓ → Scroll down one line
SLEW ↑ → Scroll up one line
Hold SLEW ↓ → Continuous scroll (smooth)
```

**Индикаторы прокрутки** :

```
Top of list:
GERÄTE                  1/4

Middle of list:
↑ OBEN
...
↓ MEHR

Bottom of list:
...
< ZURÜCK
```

### B.8 Контроль за соблюдением ограничений по глубине

**Цель** : Ни одно действие пользователя не должно требовать более 3 шагов навигации с помощью функциональной клавиши.

**Как этого добиться** :

**Метод 1: Прямые функциональные клавиши**

- 12 категорий, доступных напрямую (1 нажатие)
- Остальные категории через HAUPTMENÜ (2 нажатия)

**Метод 2: БЫСТРАЯ страница**

- 10-12 действий, выполняемых непосредственно в кнопке QUICK (всего 2 нажатия).
- Пример: QUICK → LSK1L (GUTE NACHT) → ✓ Готово.

**Метод 3: Сглаживание глубоких иерархий**

- Избегайте: Категория → Подкатегория → Под-подкатегория → Товар
- Вместо этого: Категория → Список товаров (с фильтром/поиском)

**Метод 4: LSK с учетом контекста**

- LSK демонстрируют наиболее релевантные действия
- Пример: На странице устройства LSK отображает "TOGGLE", а не "VIEW DETAILS".
- Уменьшает необходимость в дополнительной навигации.

**Примеры глубины** :

**✅ Хорошо (2 уровня)** :

```
Press SZENEN → Press LSK (GUTE NACHT) → ✓ Scene activated
```

**✅ Приемлемо (3 уровня)** :

```
Press KLIMA → Select WOHNZIMMER → Edit temp → ✓ Confirmed
```

**❌ Плохо (4+ уровня) - ИЗБЕГАЙТЕ** :

```
Press MENU → LICHT → RÄUME → WOHNZIMMER → STEHLAMPE → Edit
(This is too deep! Should be: Press RÄUME → WOHNZIMMER → Device list)
```

---

## C. Основные модели взаимодействия

### C.1 Навигация (Просмотр информации)

**Шаблон** : DIR, MENU, выбор LSK.

**Пример использования** : просмотр категорий, просмотр данных, изучение устройств.

**Последовательность взаимодействий** :

**Шаг 1: Доступ к категории**

```
Action: Press function key (e.g., ENERGIE)
       OR Press MENU → Select category with LSK
Result: Category main page displayed
```

**Шаг 2: Просмотр контента**

```
Action: Press SLEW ←→ (navigate between sub-pages)
       OR Press SLEW ↑↓ (scroll within long lists)
Result: Display updates with new content
```

**Шаг 3: Выберите товар** (необязательно)

```
Action: Press LSK next to item
Result: Navigate to detail page OR execute action
```

**Пример схемы работы** :

```
1. Press ENERGIE
   Display: ENERGIE main page

2. Press SLEW →
   Display: PV DETAILS page

3. Press SLEW →
   Display: BATTERIE page

4. Press LSK4L (detail view)
   Display: BATTERIE > DETAILS
```

**Сводка элементов управления навигацией** :

| Контроль               | Функция                       | Контекст              |
| ---------------------- | ----------------------------- | --------------------- |
| Функциональная клавиша | Прямой переход по категории   | В любом месте         |
| МЕНЮ                   | Открыть главное меню          | В любом месте         |
| ЛСК                    | Выберите элемент / действие   | На этикетке товара    |
| СМОТРЕТЬ ←→            | Следующая/предыдущая страница | Та же категория       |
| СЛУШАТЬ ↑↓             | Список прокрутки              | Только длинные списки |
| CLR                    | Возвращаться                  | Подстраницы           |

### C.2 Переключатель (Вкл./Выкл.)

**Шаблон** : LSK для переключения состояний

**Пример использования** : включение/выключение света, блокировка/разблокировка, включение/выключение.

**Последовательность взаимодействий** :

**Шаг 1: Перейдите в раздел «Устройство/Параметры».**

```
Example: LICHT > Device List
Display:
  < STEHLAMPE      ON    (LSK1L)
  < DECKENLAMPE    OFF   (LSK2L)
```

**Шаг 2: Нажмите LSK для переключения**

```
Action: Press LSK1L (next to STEHLAMPE ON)
Result: State toggles immediately
Display updates:
  < STEHLAMPE      OFF ✓ (green flash)
```

**Визуальная обратная связь** :

- Состояние мгновенно меняется (белый → зеленый на 1 секунду).
- На мгновение появляется галочка ✓.
- Если устройство медленно реагирует: индикатор "ОТПРАВИТЬ..."

**Обработка ошибок** :

```
If device offline:
  < STEHLAMPE      OFFLINE (amber)
  Press LSK → Error: "GERÄT NICHT ERREICHBAR"
```

**Переключить состояния** :

| Отображать | Значение                  | Следующий штат     |
| ---------- | ------------------------- | ------------------ |
| `ON`       | В данный момент на        | → ВЫКЛ.            |
| `OFF`      | В данный момент выключено | → ВКЛ              |
| `AUTO`     | Автоматический режим      | → Ручной или Выкл. |
| `AKTIV`    | Активно/включено          | → INAKTIV          |
| `LOCKED`   | Заблокировано             | → РАЗБЛОКИРОВАНО   |

**Подтверждение для критически важных переключателей** :

```
Critical actions (e.g., alarm disarm) require confirmation:

Step 1: Press LSK (ALARM SCHARF)
Display:
  ALARM DEAKTIVIEREN?
  < NEIN             JA*> (LSK6R)

Step 2: Press LSK6R or OVFY
Result: ✓ ALARM UNSCHARF (green)
```

### C.3 Номер редактирования (запись в блокноте)

**Шаблон** : Блокнот + LSK

**Пример использования** : установка температуры, яркости, громкости, времени.

**Последовательность взаимодействий** :

**Шаг 1: Перейдите в раздел «Поле».**

```
Example: KLIMA > WOHNZIMMER
Display:
  IST:        21.8°C
  SOLL:       22.0°C  ← (LSK2L)
  MODUS:      AUTO
```

**Шаг 2: Введите значение в блокноте.**

```
Action: Type "23" (on numeric keypad)
Scratchpad shows: 23*
Display unchanged (field still shows 22.0°C)
```

**Шаг 3: Нажмите LSK для подтверждения.**

```
Action: Press LSK2L (next to SOLL field)
Result: Value transfers to field
Display:
  SOLL:       23.0°C ✓ (green flash)
Scratchpad: (clears automatically)
```

**Проверка** :

**Допустимый ввод** :

```
Typed: 22.5
Scratchpad: 22.5* (green asterisk)
Press LSK → ✓ Accepted
```

**Недопустимый ввод** (вне допустимого диапазона):

```
Typed: 35
Scratchpad: 35* (red asterisk)
Error Line: BEREICH 16-30°C (amber)
Press LSK → Rejected, error beep
Scratchpad: (stays, waits for correction)
```

**Неверный формат** :

```
Typed: 22.5.5
Scratchpad: 22.5.5* (red asterisk)
Error Line: UNGÜLTIGES FORMAT (red)
Press LSK → Rejected
```

**Исправление** :

```
If invalid input in scratchpad:
  Press CLR → Scratchpad clears
  Type correct value → Continue
```

**Типы числового ввода** :

| Тип              | Формат  | Пример  | Диапазон    |
| ---------------- | ------- | ------- | ----------- |
| Целое число      | `NN`    | `75`    | 0-100       |
| Десятичная дробь | `NN.N`  | `22.5`  | 16.0-30.0   |
| Процент          | `NN%`   | `75%`   | 0-100       |
| Время            | `HH:MM` | `08:30` | 00:00-23:59 |

**Автоформатирование** :

```
User types: 22
System formats as: 22.0°C (adds decimal + unit)

User types: 75
For brightness field: 75% (adds %)
```

### C.4 Редактирование текста (клавиатура + блокнот)

**Схема** : буквенно-цифровая клавиатура + блокнот + LSK

**Пример использования** : названия сцен, поисковые запросы, названия устройств.

**Последовательность взаимодействий** :

**Шаг 1: Перейдите к текстовому полю.**

```
Example: SZENEN > NEUE SZENE
Display:
  NAME:       [          ]← (LSK1L)
  GERÄTE:     [AUSWÄHLEN]→ (LSK2L)
```

**Шаг 2: Введите текст**

```
Action: Type "ABENDESSEN" (using A-Z keyboard)
Scratchpad shows: ABENDESSEN*
Display: Field still shows [ ]
```

**Шаг 3: Подтвердите с LSK.**

```
Action: Press LSK1L
Result: Text transfers to field
Display:
  NAME:       ABENDESSEN ✓ (green)
Scratchpad: (clears)
```

**Автозаполнение** (для известных значений):

```
Example: Room search

Typed: WOH
Scratchpad: WOH*
Display updates with suggestions:
  < WOHNZIMMER           (LSK2L)
  < WOHNZIMMER OG        (LSK3L)

Press LSK2L → "WOHNZIMMER*" in scratchpad
Press LSK1L → Accepted
```

**Ограничения на ввод текста** :

| Тип поля         | Максимальная длина | Допустимые символы    | Пример       |
| ---------------- | ------------------ | --------------------- | ------------ |
| Название сцены   | 20 символов        | АЗ, 0-9, пространство | "GUTE NACHT" |
| Поиск устройств  | 15 символов        | Аризона, 0-9          | "ЛАМПА"      |
| Название комнаты | 15 символов        | АЗ, 0-9, пространство | "Вонциммер"  |

**Запись о персонаже** :

```
On A-Z keyboard:
  Single press: Letter appears in scratchpad
  Hold: Repeat letter (AAAA...)
  Numeric keys: Numbers (if allowed)
  Special: Space, period, hyphen (if available)
```

**Редактирование существующего текста** :

```
Field shows: GUTE NACHT
Press LSK → Copies to scratchpad: GUTE NACHT*
Edit in scratchpad (not possible - must re-type fully)
Alternative: CLR + re-type

Note: No cursor-based editing (MCDU limitation)
Workaround: Copy existing, clear, type new
```

### C.5 Выполнить действие (Подтверждение)

**Шаблон** : LSK или OVFY для подтверждения

**Вариант использования** : Активировать сцену, запустить процесс, удалить элемент.

**Два уровня подтверждения** :

**Уровень 1: Без подтверждения** (безопасные действия)

```
Example: Activate scene "FILM MODUS"

Step 1: Press SZENEN
Step 2: Press LSK5L (FILM MODUS)
Result: ✓ SZENE AKTIV (immediate execution)

No confirmation needed - action is safe and reversible.
```

**Уровень 2: Мягкое подтверждение** (потенциально деструктивное)

```
Example: Activate "GUTE NACHT" (turns off all lights!)

Step 1: Press QUICK
Step 2: Press LSK1L (GUTE NACHT)
Display:
  SZENE STARTEN?
  GUTE NACHT
  ---
  ALLE LICHTER AUS
  TÜREN SPERREN
  ---
  < NEIN             JA*> (LSK6R)

Step 3: Press LSK6R OR press OVFY
Result: ✓ SZENE AKTIV

Confirmation shows WHAT will happen.
User can cancel with LSK (NEIN) or CLR.
```

**Уровень 3: Жесткое подтверждение** (критическое/необратимое)

```
Example: Disarm security alarm

Step 1: Navigate to ALARMANLAGE
Step 2: Press LSK (DEAKTIVIEREN)
Display:
  ALARM DEAKTIVIEREN?
  ⚠️  SICHERHEIT REDUZIERT
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY

Step 3: Press OVFY (LSK not accepted here)
Result: ✓ ALARM DEAKTIVIERT

Hard confirmation requires OVFY key specifically.
Prevents accidental execution.
```

**Дерево решений подтверждения** :

```
Is action reversible immediately? (e.g., toggle light)
  YES → No confirmation
  NO ↓

Is action disruptive? (e.g., "all lights off")
  YES → Soft confirmation (LSK or OVFY)
  NO ↓

Is action security-critical? (e.g., unlock door, disarm alarm)
  YES → Hard confirmation (OVFY only)
```

**Примеры по типу** :

| Действие                           | Подтверждение | Требуется ключ    |
| ---------------------------------- | ------------- | ----------------- |
| Переключатель света                | Никто         | LSK переключатель |
| Активируйте сцену "Фильм".         | Никто         | ЛСК               |
| Активируйте сцену «Все выключено». | Мягкий        | ЛСК или ОВФЙ      |
| Откройте входную дверь             | Жесткий       | OVFY только       |
| Отключить сигнализацию             | Жесткий       | OVFY только       |
| Удалить расписание                 | Мягкий        | ЛСК или ОВФЙ      |
| Сброс к заводским настройкам       | Жесткий       | OVFY только       |

**Визуальная обратная связь для подтверждения** :

```
After action executes:
  ✓ AKTION ABGESCHLOSSEN (green, 2s)
  [Details of what happened]
  
Or:
  ✓ SZENE AKTIV
  12 GERÄTE GESTEUERT
```

### C.6 Прокрутка (Навигация по списку)

**Шаблон** : клавиши перемотки для длинных списков

**Пример использования** : списки устройств, журналы событий, расписания, превышающие 14 строк.

**Типы списков** :

**Краткий список** (помещается на экране, не более 10 пунктов):

```
SZENEN                  1/1
---
< GUTE NACHT           (LSK1L)
< GUTEN MORGEN         (LSK2L)
< FILM MODUS           (LSK3L)
< ABWESEND             (LSK4L)
< PARTY                (LSK5L)
< ARBEIT               (LSK6L)
< INDEX

No SLEW needed - all items visible.
```

**Длинный список** (>14 строк, требуется прокрутка):

```
GERÄTE                  1/4  ← Page indicator
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
↓ MEHR (15 weitere)    ← Scroll indicator

Press SLEW ↓ to scroll down...
```

**Поведение при прокрутке** :

**Дискретная прокрутка** (однократное нажатие):

```
Action: Press SLEW ↓ once
Result: List shifts up by ~6 lines
        New items appear at bottom
        Top items disappear
```

**Непрерывная прокрутка** (удерживайте):

```
Action: Hold SLEW ↓
Result: List scrolls smoothly (1 line per 200ms)
        Stops when bottom reached
        Release to stop
```

**Индикаторы прокрутки** :

```
Top of list:
  (no "↑ OBEN" indicator)
  
Middle of list:
  ↑ OBEN
  ...content...
  ↓ MEHR (X weitere)
  
Bottom of list:
  ↑ OBEN
  ...content...
  < ZURÜCK
  (no "↓ MEHR")
```

**Пагинация** (альтернатива прокрутке):

```
Some lists use pages instead:

MELDUNGEN               1/3  ← Page 1 of 3
---
 19:34  BATTERIE SENSOR
 18:45  SZENE AKTIV
 14:20  LADEN FERTIG
 12:30  SYSTEM UPDATE
 11:15  BEWEGUNG GARTEN
 09:45  ALARM TEST
< ZURÜCK         WEITER> (LSK6R)

Press LSK6R → Jump to page 2 (shows next 6 messages)
Press SLEW → → Same as LSK6R (next page)
```

**Перейти к началу/концу** :

```
Action: Press SLEW ↑ + SLEW ↓ simultaneously
Result: Jump to top of list

Action: Press CLR CLR (double-tap)
Result: Jump to bottom OR exit list (context-dependent)
```

**Выбрать из прокручиваемого списка** :

```
User scrolls to find item:
  Press SLEW ↓ until "HEIZUNG BÜRO" visible
  
Item appears next to LSK:
  < HEIZUNG BÜRO   19.5  (LSK3L)
  
Press LSK3L:
  Navigate to HEIZUNG BÜRO detail page
```

**Интеллектуальная прокрутка** (с учетом контекста):

```
If list has categories/headers:
  SLEW ↓ → Jumps to next category header (not line-by-line)
  
Example:
  GERÄTE
   WOHNZIMMER
   ...devices...
   KÜCHE         ← SLEW ↓ jumps here
   ...devices...
   SCHLAFZIMMER  ← SLEW ↓ jumps here
```

---

## D. Шаблоны компоновки отображения

### D.1 Макет страницы меню

**Цель** : Представить список выбираемых вариантов.

**Структура** (всего 14 строк):

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [SUBTITLE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [OPTION 1]            (LSK1L/R)
Line 5:  [OPTION 2]            (LSK2L/R)
Line 6:  [OPTION 3]            (LSK3L/R)
Line 7:  [OPTION 4]            (LSK4L/R)
Line 8:  [OPTION 5]            (LSK5L/R)
Line 9:  [OPTION 6]            (LSK6L/R)
Line 10: [OPTION 7]            (LSK1L/R, if scrolled)
Line 11: [OPTION 8]            ...
Line 12: [OPTION 9]            ...
Line 13: [NAV: < INDEX]    [NAV: WEITER>]
Line 14: [SCRATCHPAD CONTENT]
```

**Пример** :

```
HAUPTMENÜ               1/2    ← Line 1: Title + page
ALL CATEGORIES              ← Line 2: Subtitle (optional)
---                         ← Line 3: Separator
< ENERGIE              (LSK1L) ← Lines 4-9: Options (6 per side)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
< INDEX          WEITER>       ← Line 13: Navigation
                                ← Line 14: Scratchpad (empty here)
```

**Индикаторы LSK** :

- `<` = Левая кнопка LSK выбирает этот вариант
- `>` = Правая LSK выбирает этот вариант
- Нет индикатора = Нет действия (только отображение)

**Варианты государств** :

```
Normal:     < SZENE NAME       (white)
Active:     < SZENE NAME ✓     (green)
Unavailable:  SZENE NAME       (grey, no LSK)
Warning:    < GERÄT NAME !     (amber)
Error:      < GERÄT NAME ❌     (red)
```

### D.2 Схема отображения данных

**Назначение** : Отображение информации, текущего состояния и значений датчиков.

**Структура** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [PRIMARY VALUE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [LABEL 1]:    [VALUE] [UNIT]
Line 5:  [LABEL 2]:    [VALUE] [UNIT]  (LSK if interactive)
Line 6:  [LABEL 3]:    [VALUE] [UNIT]
Line 7:  [SEPARATOR / CATEGORY HEADER]
Line 8:  [LABEL 4]:    [VALUE] [UNIT]
Line 9:  [LABEL 5]:    [VALUE] [UNIT]
Line 10: [LABEL 6]:    [VALUE] [UNIT]
Line 11: [...]
Line 12: [...]
Line 13: [NAV: < INDEX]    [NAV: DETAILS>]
Line 14: [SCRATCHPAD]
```

**Пример** :

```
ENERGIE                 1/3    ← Line 1
AKTUELL:    2340 W             ← Line 2: Primary value
---                            ← Line 3
HEUTE:      12.4 kWh           ← Line 4: Data field
KOSTEN:     2.48 €             ← Line 5: Data field
SELBST:     78%                ← Line 6: Data field
---                            ← Line 7: Separator
NETZ:       +340 W  (LSK3L)    ← Line 8: Interactive field
PV:         2500 W  (LSK4L)    ← Line 9: Drilldown option
BATTERIE:   -500 W  (LSK5L)    ← Line 10: Drilldown option
WALLBOX:    0 W                ← Line 11
                               ← Lines 12-13: Empty or more data
< INDEX          DETAILS>      ← Line 13: Navigation
                               ← Line 14: Scratchpad
```

**Форматирование значений** :

| Тип         | Формат                | Пример       | Цвет  |
| ----------- | --------------------- | ------------ | ----- |
| Власть      | `NNNN W` или `N.N kW` | `2340 W`     | Белый |
| Энергия     | `NN.N kWh`            | `12.4 kWh`   | Белый |
| Температура | `NN.N°C`              | `22.5°C`     | Белый |
| Процент     | `NN%`                 | `78%`        | Белый |
| Валюта      | `N.NN €`              | `2.48 €`     | Белый |
| Время       | `HH:MM:SS`            | `14:32:15`   | Белый |
| Дата        | `DD.MM.YYYY`          | `14.02.2026` | Белый |

**Особые ценности** :

```
Unknown:    ---        (grey dashes)
Error:      ERR        (red)
Offline:    OFFLINE    (amber)
N/A:        N/A        (grey)
Infinite:   ∞          (white)
```

**Интерактивные данные** (LSK рядом со значением):

```
NETZ:       +340 W  ← (LSK3L)

Pressing LSK3L → Navigate to NETZ details page
OR
Pressing LSK3L → Edit value (if modifiable)
```

**Цветовая кодировка значений** :

```
Normal:         2340 W         (white)
User-modified:  22.5°C         (green)
Warning:        LOW            (amber)
Critical:       OFFLINE        (red)
Predicted:      ~12.5 kWh      (magenta, with ~ prefix)
```

### Макет страницы ввода D.3

**Цель** : Сбор пользовательской информации (температура, время, имя и т. д.).

**Структура** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [INSTRUCTION / CONTEXT]
Line 3:  [SEPARATOR] ---
Line 4:  [FIELD 1 LABEL]: [VALUE/BOX]  ← (LSK1L)
Line 5:  [FIELD 2 LABEL]: [VALUE/BOX]  ← (LSK2L)
Line 6:  [FIELD 3 LABEL]: [VALUE/BOX]  ← (LSK3L)
Line 7:  [...]
Line 8:  [HINT / EXAMPLE]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [VALIDATION ERROR] (if any)
Line 13: [< ABBRECHEN]  [SPEICHERN*>]
Line 14: [SCRATCHPAD]
```

**Пример 1: Ввод температуры**

```
KLIMA > WOHNZIMMER      1/1
TEMPERATUR EINSTELLEN
---
IST:        21.8°C
SOLL:       [  .  ]°C  ← (LSK2L)
MODUS:      AUTO       (LSK3L)
---
HINWEIS: 16-30°C
SCHRITT: 0.5°C
---

< ABBRECHEN      ÜBERNEHMEN*
[Scratchpad: type value here]

User flow:
1. Type "22.5" → Scratchpad: 22.5*
2. Press LSK2L → Value transfers to SOLL field
3. Press ÜBERNEHMEN* (LSK6R) → Saved
```

**Пример 2: Ввод времени**

```
ZEITPLAN > NEUE REGEL   1/1
ALARMZEIT FESTLEGEN
---
ZEIT:       [  :  ]    ← (LSK1L: HH:MM)
TAGE:       MO-FR      (LSK2L: Select)
AKTION:     SZENE      (LSK3L: Select)
---
FORMAT: HH:MM (24h)
BEISPIEL: 08:30
---

< ABBRECHEN      SPEICHERN*
[Scratchpad]
```

**Полевые индикаторы** :

```
Empty field:     [     ]    (brackets, no content)
Placeholder:     [HH:MM]    (format hint)
Filled:          22.5°C     (value shown)
Editable:        22.5°C  ← (arrow indicates LSK)
Dropdown:        AUTO    ▼ (down arrow = options)
```

**Состояния проверки** :

```
Valid input:
  Scratchpad: 22.5* (green asterisk)
  Field: Ready to accept
  
Invalid input:
  Scratchpad: 35* (red asterisk)
  Error line 12: BEREICH 16-30°C (amber)
  Field: Rejects transfer
  
Empty required:
  Field: [     ] (red border if validation fails)
  Error: PFLICHTFELD (red)
```

**Многоступенчатый ввод** :

```
Some inputs require multiple steps:

Step 1: Select option from list
  SZENE:      [AUSWÄHLEN]→ (LSK3L)
  
  Press LSK3L → Navigate to scene selection
  
Step 2: Select scene
  < GUTE NACHT       (LSK1L)
  < FILM MODUS       (LSK2L)
  
  Press LSK1L → "GUTE NACHT" selected
  
Step 3: Return to input page
  SZENE:      GUTE NACHT ✓ (green)
```

### Макет страницы подтверждения D.4

**Цель** : Подтверждение перед выполнением критически важного действия.

**Структура** :

```
Line 1:  [ACTION TITLE]
Line 2:  [WARNING / IMPACT]
Line 3:  [SEPARATOR] ---
Line 4:  [DETAIL 1: What will happen]
Line 5:  [DETAIL 2: Affected items]
Line 6:  [DETAIL 3: Consequences]
Line 7:  [SEPARATOR] ---
Line 8:  [COUNTDOWN or INSTRUCTIONS]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [...]
Line 13: [< NEIN / ABBRECHEN]  [JA* / BESTÄTIGEN*>]
Line 14: [SCRATCHPAD - IGNORED]
```

**Пример 1: Мягкое подтверждение**

```
SZENE STARTEN?          ← Line 1: Question
GUTE NACHT              ← Line 2: Scene name
---                     ← Line 3
AKTION:
  12 LICHTER AUS        ← Lines 4-6: What will happen
  3 TÜREN SPERREN
  HEIZUNG 18°C
---
FORTFAHREN?
---


< NEIN               JA*  ← Line 13: Cancel / Confirm
                            (Scratchpad not used)

User can:
  - Press LSK (NEIN) → Cancel, return to previous page
  - Press LSK6R (JA*) or OVFY → Execute
```

**Пример 2: Жесткое подтверждение**

```
ALARM DEAKTIVIEREN?
⚠️  SICHERHEIT REDUZIERT
---
AKTION:
  ALLE SENSOREN INAKTIV
  KAMERAS AUF INFO-MODUS
  TÜRSCHLÖSSER BLEIBEN GESPERRT
---
BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY

< ABBRECHEN
                     ← Line 14: Scratchpad (not used)

User must:
  - Press OVFY → Execute
  - LSK (JA) not accepted! (hard confirmation)
  - Press CLR or LSK (ABBRECHEN) → Cancel
```

**Подтверждение обратного отсчета** (для деструктивных действий):

```
SYSTEM NEUSTART?
⚠️  ALLE VERBINDUNGEN GETRENNT
---
NEUSTART IN: 10s       ← Countdown (updates each second)
---
ABBRECHEN?
  DRÜCKE CLR ODER LSK


< ABBRECHEN
                     ← Scratchpad

Countdown:
  10, 9, 8, 7...
  At 0 → Action executes
  Press CLR or LSK → Cancels countdown
```

### D.5 Макет страницы списка

**Назначение** : Отображение прокручиваемого списка элементов (устройств, событий, журналов).

**Структура** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [COUNT / FILTER INFO]
Line 3:  [SEPARATOR] ---
Line 4:  [CATEGORY HEADER] (optional)
Line 5:  [< ITEM 1]            (LSK1L)
Line 6:  [< ITEM 2]            (LSK2L)
Line 7:  [< ITEM 3]            (LSK3L)
Line 8:  [CATEGORY HEADER] (optional)
Line 9:  [< ITEM 4]            (LSK4L)
Line 10: [< ITEM 5]            (LSK5L)
Line 11: [< ITEM 6]            (LSK6L)
Line 12: [↓ MEHR (X weitere)] or [...]
Line 13: [< ZURÜCK]        [FILTER>]
Line 14: [SCRATCHPAD]
```

**Пример 1: Список устройств**

```
GERÄTE                  1/4  ← Page 1 of 4 (48 devices, 12/page)
ALLE (48 GERÄTE)             ← Filter status
---
 WOHNZIMMER                  ← Category header (not selectable)
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
< THERMOSTAT     20.0  (LSK6L)
↓ MEHR (42 weitere)          ← Scroll indicator
< ZURÜCK         FILTER>     ← Navigation
                             ← Scratchpad

Press SLEW ↓ or LSK (WEITER) → Next items
```

**Пример 2: Журнал событий**

```
MELDUNGEN               1/3
NEU: 2 | ALLE: 24
---
!19:34  BATTERIE SENSOR (LSK1L) ← ! = Warning (amber)
 18:45  SZENE AKTIV     (LSK2L)
 14:20  LADEN FERTIG    (LSK3L)
 12:30  SYSTEM UPDATE   (LSK4L)
 11:15  BEWEGUNG GARTEN (LSK5L)
 09:45  ALARM TEST      (LSK6L)


< ZURÜCK         WEITER>
                         ← Scratchpad

Icon meanings:
  ! = Warning (amber)
  ❌ = Error (red)
  ✓ = Success (green)
  (space) = Info (white)
```

**Пример 3: Сгруппированный список**

```
KLIMA                   1/2
8 RÄUME | Ø 21.2°C
---
< WOHNZIMMER     22.0  (LSK1L: Detail)
< KÜCHE          20.5  (LSK2L)
< SCHLAFZIMMER   19.5  (LSK3L)
< KINDERZIMMER   21.0  (LSK4L)
< BAD            23.0  (LSK5L)
< BÜRO           20.0  (LSK6L)
↓ MEHR (2 weitere)
< ZURÜCK         ALLE→
                      ← Scratchpad

LSK actions:
  Press LSK → Navigate to room detail
  Press "ALLE→" → Set all rooms to same temp
```

**Формат элемента списка** :

```
General pattern:
[ICON] [TIME] [NAME]      [VALUE] [(LSK)]

Examples:
 19:34  LICHT AN              (timestamp, event, no value)
< STEHLAMPE      ON     (LSK) (device, state, interactive)
!14:20  BATTERIE     15% (LSK) (warning, device, value, interactive)
 WOHNZIMMER                   (category header, not interactive)
```

**Индикаторы прокрутки** :

```
Top of list:
  (no ↑ indicator)
  
Middle:
  ↑ OBEN (shows if scrolled down)
  ...items...
  ↓ MEHR (X weitere)
  
Bottom:
  ↑ OBEN
  ...items...
  < ZURÜCK
```

---

## E. Стандартные функции (всегда доступны)

### E.1 BRT/DIM (Регулировка яркости)

**Назначение** : Регулировка яркости дисплея MCDU.

**Поведение** :

- Работает на ЛЮБОЙ странице (не переходит на другую).
- Нет взаимодействия с блокнотом.
- Мгновенная визуальная обратная связь
- 5-10 дискретных уровней яркости

**Применение** :

```
Press BRT → Brightness +1 level
Press DIM → Brightness -1 level
Hold BRT → Continuous increase (to max)
Hold DIM → Continuous decrease (to min)
```

**Визуальная обратная связь** :

```
Brief overlay (1 second):
┌─────────────────────┐
│  HELLIGKEIT: ████░  │  ← Bar graph (5 of 8)
└─────────────────────┘

Then: Overlay disappears, normal page shown
```

**Уровни яркости** :

```
Level 1: 10% (night mode - very dim)
Level 2: 20%
Level 3: 35%
Level 4: 50%
Level 5: 65% (default)
Level 6: 80%
Level 7: 90%
Level 8: 100% (maximum, outdoor/daylight)
```

**Автоматическая регулировка яркости** (опционально, если имеется датчик освещенности):

```
In EINSTELLUNGEN > ANZEIGE:
  AUTO-HELLIGKEIT: AN  (LSK toggle)
  
If enabled:
  - System adjusts brightness based on ambient light
  - BRT/DIM still work (manual override for 5 minutes)
  - After 5 min, returns to auto mode
```

**Упорство** :

- Настройки яркости сохраняются после перезагрузки.
- Настройки для каждого пользователя (в многопользовательской системе)

### E.2 CLR (Очистить / Назад / Отменить)

**Назначение** : Многофункциональная контекстно-зависимая клавиша

**Поведение в зависимости от контекста** (порядок приоритета):

**Контекст 1: Блокнот содержит данные**

```
Scratchpad: 22.5*
Press: CLR
Result: Scratchpad clears → (empty)
Page: Unchanged
```

**Контекст 2: Блокнот пуст, режим редактирования активен**

```
Field: SOLL: [  .  ]°C  ← (cursor/edit active)
Press: CLR
Result: Exit edit mode, field unchanged
Page: Unchanged
```

**Контекст 3: Блокнот пуст, на подстранице**

```
Current page: KLIMA > WOHNZIMMER
Press: CLR
Result: Navigate back to KLIMA main page
```

**Контекст 4: Блокнот пуст, на главной странице категории**

```
Current: ENERGIE (main page)
Press: CLR
Result: Return to HAUPTMENÜ or previous category
```

**Контекст 5: Двойное нажатие (аварийный выход)**

```
Current: Any page (any depth)
Action: CLR CLR (within 1 second)
Result: Jump to HAUPTMENÜ or STATUS page
Visual: [BRIEF FLASH] "ZURÜCK ZU HAUPTMENÜ"
```

**Контекст 6: Во время подтверждения**

```
Confirmation page showing:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: CLR
Result: Cancel = same as pressing NEIN (LSK)
Return to previous page
```

**Визуальная обратная связь** :

```
On scratchpad clear:
  Scratchpad: 22.5* → (flash) → (empty)
  
On navigation back:
  Current page fades out (100ms)
  Previous page fades in (100ms)
  Optional: Brief "← ZURÜCK" indicator (amber, 0.5s)
```

**Предотвращение ошибок** :

```
If CLR would cause data loss:
  Display warning:
    ÄNDERUNGEN VERWERFEN?
    < NEIN         JA*>
    
  User must confirm or CLR again to proceed
```

### E.3 OVFY (Подтвердить / Выполнить)

**Цель** : Подтверждение важных действий, выполнение ожидающих изменений.

**Примеры использования** :

**Вариант использования 1: Требуется подтверждение подтверждения.**

```
Confirmation page shows:
  ALARM DEAKTIVIEREN?
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY
  
  < ABBRECHEN

Press: OVFY
Result: Action executes
Visual: ✓ ALARM DEAKTIVIERT (green flash)

Note: LSK (JA) NOT accepted here - OVFY only!
```

**Вариант использования 2: Быстрый способ подтверждения**

```
Confirmation page shows:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: OVFY (instead of LSK JA)
Result: Action executes immediately
Benefit: Faster than aiming for LSK6R
```

**Вариант использования 3: Выполнение ожидающих изменений**

```
After editing multiple fields:
  Display shows:
    3 ÄNDERUNGEN AUSSTEHEND
    DRÜCKE OVFY ZUM SPEICHERN
    
Press: OVFY
Result: All changes saved at once
Visual: ✓ GESPEICHERT
```

**Вариант использования 4: Обход предупреждения** (использовать с осторожностью!)

```
Warning shown:
  ⚠️  GERÄT OFFLINE
  TROTZDEM SENDEN?
  
Press: OVFY
Result: Sends command despite warning
Use case: User knows device will come online soon
```

**Визуальная обратная связь** :

```
After OVFY press:
  Brief flash (green if success, red if error)
  
  ✓ BESTÄTIGT (green, 1s)
  or
  ❌ ABGELEHNT (red, 2s with reason)
```

**Когда OVFY ничего не делает** :

- На обычных страницах отображения данных (без необходимости подтверждения)
- На страницах меню (выбор LSK, OVFY не требуется)
- Если запрос на подтверждение не активен

**Звук** (если есть):

- Успех: Один звуковой сигнал (приятный тон)
- Ошибка: Двойной звуковой сигнал (предупреждающий тон)
- Важное подтверждение: Тройной звуковой сигнал + действие

### E.4 МЕНЮ (Переход в главное меню)

**Назначение** : Мгновенный возврат в HAUPTMENÜ из любой точки мира.

**Поведение** :

```
Current page: ANY page, any depth
Press: MENU
Result: Immediate jump to HAUPTMENÜ page 1
Scratchpad: Preserved (not cleared)
```

**Примеры использования** :

**Вариант использования 1: Заблудился в навигации**

```
User: "Where am I? Too deep!"
Action: Press MENU
Result: Back to familiar main menu
```

**Вариант использования 2: Переключение категорий**

```
Current: KLIMA > WOHNZIMMER > Editing temp
Want: Check ENERGIE status
Action: Press MENU → Select ENERGIE
Alternative: Press FUEL function key (if mapped)
```

**Вариант использования 3: Начать заново**

```
User made errors in scratchpad/navigation
Action: Press MENU → Reset to known state
Note: Scratchpad NOT cleared (intentional - data preserved)
```

**Всегда возвращается на страницу 1** :

```
HAUPTMENÜ always shows page 1 first:
  HAUPTMENÜ               1/2
  ---
  < ENERGIE
  < KLIMA
  ...
  
User can SLEW → to page 2 if needed
```

**Не подлежит настройке** :

- Клавиша MENU ВСЕГДА открывает HAUPTMENÜ
- Не может быть переназначено на другую функцию.
- Функция безопасности — всегда доступный путь эвакуации.

**Взаимодействие с блокнотом** :

```
Before:
  Page: KLIMA > WOHNZIMMER
  Scratchpad: 22.5*
  
Press: MENU

After:
  Page: HAUPTMENÜ
  Scratchpad: 22.5* (still there!)
  
Reason: User might want to use same value elsewhere
If not needed: Press CLR to clear
```

### E.5 SLEW (Навигация / Прокрутка)

**Назначение** : Многонаправленная навигация и прокрутка списка.

**Четыре направления** : ←, →, ↑, ↓

**Поведение в зависимости от контекста** :

**Контекст 1: На главной странице категории (горизонтальная навигация)**

```
Current: ENERGIE (main page)
Press: SLEW →
Result: Navigate to next category (per function key order)
Example: ENERGIE → KLIMA → LICHT → ...

Press: SLEW ←
Result: Navigate to previous category
Example: ENERGIE → ZEITPLAN → ... (circular)
```

**Контекст 2: Многостраничная категория (навигация по страницам)**

```
Current: ENERGIE page 1/3
Press: SLEW →
Result: Navigate to ENERGIE page 2/3

Press: SLEW ←
Result: Navigate back to ENERGIE page 1/3
```

**Контекст 3: При просмотре длинного списка (вертикальная прокрутка)**

```
Current: GERÄTE list (50 items, showing 1-12)
Press: SLEW ↓
Result: Scroll down ~6 lines
Display: Now showing items 7-18

Press: SLEW ↑
Result: Scroll up ~6 lines
Display: Back to items 1-12
```

**Контекст 4: Отсутствие эффекта**

```
Current: Single-page info display (1/1)
Press: SLEW (any direction)
Result: No action (nothing to navigate)
Optional: Brief "← →" flash (indicates navigation available)
```

**Удержание поведения** (непрерывное действие):

```
Action: Hold SLEW ↓ for >0.5s
Result: Continuous scroll (smooth, ~5 lines/second)
Release: Stop at current position

Action: Hold SLEW → for >0.5s
Result: Rapid page navigation
Visual: Page numbers flash (1/3, 2/3, 3/3, 1/3...)
```

**Круговая навигация** (зацикливается):

```
Categories:
  ENERGIE → ... → ZEITPLAN → SLEW → → ENERGIE (wraps)
  
Pages within category:
  Page 1/3 → Page 2/3 → Page 3/3 → SLEW → → Page 1/3 (wraps)
```

**Визуальная обратная связь** :

```
On page change:
  Current page: ENERGIE 1/3
  Press SLEW →
  Brief transition (100ms slide animation if possible)
  New page: ENERGIE 2/3
  
On scroll:
  Items shift up/down
  Scroll indicators update:
    ↓ MEHR (X weitere) → Decrements X
```

**Ярлыки** :

```
SLEW ↑ + SLEW ↓ simultaneously:
  → Jump to top of list
  
SLEW ← + SLEW → simultaneously:
  → Jump to page 1 (reset pagination)
```

---

## F. Стратегия цветового кодирования

### Цветовая палитра F.1

**Доступные цвета** (WinWing MCDU-32-CAPTAIN):

- **W** = Белый
- **G** = Зеленый
- **А** = Янтарь
- **R** = Красный
- **Y** = Жёлтый (если есть в наличии)
- **M** = пурпурный (если есть в наличии)
- **E** = голубой (если имеется)

**Примечание** : Синий (B) цвет недоступен в нашей палитре — используйте белый для заголовков/меток.

### F.2 Значения цветов (семантическое использование)

**Белый (W) - Обычные данные и метки**

**Применение** :

- Цвет по умолчанию для всего текста
- Текущие значения (температура, мощность и т. д.)
- Заголовки страниц
- Метки для полей данных
- Названия устройств
- Индикаторы нормального состояния

**Примеры** :

```
ENERGIE                 1/3    (White title)
AKTUELL:    2340 W             (White label & value)
NETZ:       +340 W             (White value)
```

---

**Зеленый (G) - Активно, Подтверждено, Установлено пользователем**

**Применение** :

- Данные, введенные пользователем (после подтверждения)
- Активные состояния (свет включен, обогрев активен)
- Подтвержденные действия (символы ✓)
- Успешные операции
- В данный момент сцена активна.

**Примеры** :

```
SOLL:       22.5°C ✓      (Green - user just set this)
< STEHLAMPE      ON       (Green ON - light is on)
✓ SZENE AKTIV             (Green checkmark & text)
FILM MODUS ✓              (Green - scene active)
```

**Продолжительность** :

- Постоянно зелёный цвет: Активные состояния (ВКЛ, АКТИВНО и т. д.)
- Временно зеленый свет: Подтверждения (мигание 1-2 секунды, затем белый свет)

---

**Янтарный (А) - Изменяемый, Предупреждения, Требует внимания**

**Применение** :

- Редактируемые поля (обозначает «вы можете это изменить»)
- Предупреждения (некритические проблемы)
- Устройства, требующие внимания (низкий заряд батареи, отключены от сети)
- Ожидающие действия (ожидание подтверждения)
- Предупреждающие сообщения

**Примеры** :

```
SOLL:       [  .  ]°C  ←  (Amber brackets/arrow - editable)
!BATTERIE NIEDRIG         (Amber ! and text - warning)
GERÄT OFFLINE             (Amber - needs attention)
DRÜCKE OVFY               (Amber - action pending)
```

**Сообщения об ошибках** (янтарные и красные):

- Amber: Восстанавливаемые предупреждения, низкий приоритет
- Красный: Критические ошибки, сбои

---

**Красный (R) — Предупреждения, сбои, критические ошибки**

**Применение** :

- Критические ошибки
- Сработали оповещения системы безопасности (сработала сигнализация)
- Системные сбои
- Опасные состояния
- Неверный ввод (отклонение)

**Примеры** :

```
❌ GERÄT FEHLER           (Red X and text - device failed)
ALARM AUSGELÖST!          (Red - security alert!)
FEHLER: OFFLINE           (Red - critical error)
Scratchpad: 35* (RED)     (Red asterisk - invalid input)
```

**Когда использовать красный цвет** :

- Что-то сломано или вышло из строя
- Безопасность скомпрометирована
- Действия пользователя требуются незамедлительно.
- Данные выходят за пределы допустимого диапазона (жесткая ошибка).

---

**Желтый (Y) - Меры предосторожности (если имеются)**

**Применение** :

- Менее суровый, чем янтарь.
- Информационные предостережения
- Временные состояния
- Предупреждения уровня «для сведения»

**Примеры** :

```
SYSTEM NEUSTART BALD      (Yellow - heads up)
GERÄTE NICHT OPTIMAL      (Yellow - sub-optimal but OK)
```

**Если желтый цвет недоступен** : используйте янтарный цвет для обозначения предупреждающих знаков.

---

**Пурпурный (M) - Прогнозируемые/будущие значения (если имеются)**

**Применение** :

- Прогнозируемые данные (производство энергии, погода)
- Запланированные будущие мероприятия
- Прогнозируемые состояния
- Цели автоматизации

**Примеры** :

```
PV PROGNOSE: ~15.2 kWh    (Magenta ~ and value - forecast)
20:00  SZENE GEPLANT      (Magenta time - future event)
ERWARTET:    18°C         (Magenta - predicted temp)
```

**Соглашение о префиксах** : Используйте`~` для обозначения прогнозируемого значения.

**Если пурпурный цвет недоступен** : используйте белый цвет.`~` префикс.

---

**Голубой/Е — Специальные индикаторы (если имеются)**

**Применение** :

- Специальные режимы (ручное управление, режим отпуска)
- Системные показатели
- Необычные состояния (не ошибки, просто другие)

**Примеры** :

```
MANUELL AKTIV             (Cyan - manual override mode)
URLAUBS-MODUS             (Cyan - special mode)
```

**Если голубой цвет недоступен** : используйте белый или янтарный.

---

### F.3 Цветовые сочетания и приоритеты

**Порядок приоритета** (от наивысшего к наинизшему):

1. **Красный** — Критические ошибки, оповещения о безопасности
2. **Янтарный** - Предупреждение, требует внимания
3. **Зеленый** — Активное/подтвержденное состояние
4. **Пурпурный** - Прогнозируемые значения
5. **Белый** - Нормальные данные

**Разрешение конфликтов** :

```
Device is:
  - ON (green)
  - But OFFLINE (amber/red)
  
Display:
  < STEHLAMPE      OFFLINE  (Red - error takes precedence)
  
Not:
  < STEHLAMPE      ON       (Would hide the problem!)
```

**Разноцветные линии** :

```
Some lines use multiple colors:

NETZ:       +340 W  (LSK)
[Label: White] [Value: White] [(LSK): Amber if interactive]

!BATTERIE     15%   (LSK)
[!: Amber] [Label: White] [Value: Amber] [(LSK): Amber]

✓ SZENE AKTIV
[✓: Green] [Text: Green for 1s, then white]
```

### F.4 Цветовые переходы

**Изменения в состоянии** :

```
Light toggled OFF → ON:
  Before: < STEHLAMPE      OFF  (white)
  Action: Press LSK
  During: < STEHLAMPE      ... (amber, sending)
  After:  < STEHLAMPE      ON ✓ (green flash 1s)
  Final:  < STEHLAMPE      ON  (green, permanent)
```

**Ввод данных пользователем принят** :

```
Scratchpad: 22.5* (green asterisk)
Press LSK:
  Field: 22.5°C ✓ (green flash 1s)
  Then:  22.5°C   (green, permanent as user-set)
After some time (device settles):
  Field: 22.5°C   (white, now "normal" state)
```

**Исправление ошибок** :

```
Invalid: Scratchpad: 35* (red asterisk)
Error:   BEREICH 16-30°C  (red, 2s)
Correct: Scratchpad: 22.5* (green asterisk)
Accept:  ✓ GESPEICHERT    (green, 1s)
```

---

## G. Обработка ошибок и обратная связь

### G.1 Обработка недопустимых входных данных

**Уровни проверки** :

**Уровень 1: Проверка нажатий клавиш** (предотвращение ввода недопустимых символов)

```
Context: Numeric field (temperature)
User presses: Letter "A"
Result: Keystroke rejected, no character in scratchpad
Feedback: Brief beep (if sound enabled)
```

**Уровень 2: Проверка формата** (черновик)

```
User types: "22.5.5" (invalid decimal)
Scratchpad shows: 22.5.5* (RED asterisk)
Error line: UNGÜLTIGES FORMAT (red)
Action: User must CLR and re-type
```

**Уровень 3: Проверка диапазона** (перед передачей)

```
User types: "35" (out of range for temp)
Scratchpad shows: 35* (RED asterisk)
Error line: BEREICH 16-30°C (amber)
Press LSK: Rejected (beep), scratchpad stays
Action: User must CLR and type valid value
```

**Уровень 4: Проверка бизнес-логики** (после передачи)

```
User sets temp to 16°C (minimum)
System checks: Window is OPEN
Error: FENSTER OFFEN - HEIZUNG INAKTIV (amber warning)
Temp field: 16°C (amber - set but not effective)
User action: Close window OR override warning
```

**Формат сообщения об ошибке** :

```
[Normal page content above]
...
Line 12: [ERROR ICON] [ERROR MESSAGE]
Line 13: [HINT or CORRECTION]
Line 14: [SCRATCHPAD with invalid data]

Example:
...
FEHLER: BEREICH 16-30°C     (Line 12, red)
SCHRITT: 0.5°C              (Line 13, amber hint)
35*                         (Line 14, scratchpad red)
```

**Распространённые ошибки** :

| Тип ошибки           | Сообщение            | Цвет    | Решение                            |
| -------------------- | -------------------- | ------- | ---------------------------------- |
| Вне зоны действия    | `BEREICH 16-30°C`    | Янтарь  | Введите значение в диапазоне       |
| Неверный формат      | `FORMAT UNGÜLTIG`    | Красный | Формат проверки (ЧЧ:ММ, НН.Н)      |
| Обязательное поле    | `PFLICHTFELD`        | Красный | Введите значение                   |
| Устройство отключено | `GERÄT OFFLINE`      | Красный | Подождите или проверьте устройство |
| Не найдено           | `NICHT GEFUNDEN`     | Красный | Проверить орфографию/ID            |
| Уже существует       | `BEREITS VORHANDEN`  | Янтарь  | Выберите другое имя                |
| Система занята       | `BITTE WARTEN...`    | Янтарь  | Подождите минутку                  |
| Доступ запрещен      | `KEINE BERECHTIGUNG` | Красный | Проверьте права пользователя       |

### Требования к подтверждению G.2

**Классификация рисков действий** :

**Низкий риск** (подтверждение не требуется):

- Включение/выключение света
- Отрегулируйте яркость/громкость
- Просмотреть информацию
- Перемещайтесь между страницами
- Активировать обратимый режим съемки (например, «Режим кино»)

**Средний риск** (мягкое подтверждение):

- Активировать мешающий сценарий (например, «Все огни выключены»).
- Включение/выключение отопления
- Запирать/отпирать дверь (если безопасность не является критически важной)
- Удалить расписание
- Отправить уведомление

**Высокий риск** (требуется подтверждение диагноза - OVFY):

- Отключить охранную сигнализацию
- Откройте главную входную дверь.
- Удалить все расписания
- Сброс к заводским настройкам
- Применить меры экстренного реагирования

**Схема подтверждения по риску** :

**Мягкое подтверждение** :

```
Step 1: User triggers action (LSK)
Display:
  [ACTION NAME]
  [DESCRIPTION OF IMPACT]
  ---
  < NEIN         JA*>
  
Step 2: User presses LSK (JA) or OVFY
Result: Action executes

Cancel: Press LSK (NEIN) or CLR
```

**Жесткое подтверждение** :

```
Step 1: User triggers action
Display:
  [ACTION NAME]
  ⚠️  [WARNING / CONSEQUENCES]
  ---
  BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY
  
  < ABBRECHEN

Step 2: User MUST press OVFY (LSK not accepted)
Result: Action executes

Cancel: Press LSK (ABBRECHEN) or CLR
```

**Подтверждение тайм-аута** :

```
For destructive actions, add countdown:

SYSTEM NEUSTART?
NEUSTART IN: 10s
---
ABBRECHEN?
  DRÜCKE CLR

[Countdown 10, 9, 8, 7...]

Press CLR → Cancels
Timeout reaches 0 → Executes
```

### G.3 Отзывы об успехе

**Визуальная обратная связь** (основная):

**Тип 1: Мигающая галочка**

```
Action: Toggle light on
Display:
  Before: < STEHLAMPE      OFF  (white)
  After:  < STEHLAMPE      ON ✓ (green, 1s)
  Final:  < STEHLAMPE      ON   (green)
```

**Тип 2: Подтверждающее сообщение**

```
Action: Scene activated
Display (brief overlay, 2s):
  ┌─────────────────────┐
  │  ✓ SZENE AKTIV      │
  │  12 GERÄTE          │
  └─────────────────────┘
Then: Return to previous page or scene list
```

**Тип 3: Обновление поля**

```
Action: Set temperature
Display:
  Before: SOLL: 21.0°C
  During: SOLL: ...      (amber, processing)
  After:  SOLL: 22.5°C ✓ (green flash 1s)
  Final:  SOLL: 22.5°C   (green/white)
```

**Тип 4: Светодиодный индикатор**

```
Action: Activate scene
LED: CLR (Scene Active LED)
  Before: Off
  After:  Solid green
  
Action: System error
LED: FAIL
  Before: Off
  After:  Blinking red
```

**Звуковая обратная связь** (если включена):

- Успех: Один звуковой сигнал (приятный тон, \~440 Гц, 100 мс)
- Ошибка: Двойной звуковой сигнал (предупреждающий тон, \~220 Гц, 100 мс + 100 мс)
- Критическое подтверждение: Тройной звуковой сигнал (перед действием)

**Тактильная обратная связь** (если доступна):

- Обычно недоступно на оборудовании MCDU.
- В случае реализации: Кратковременная вибрация при нажатии кнопки.

**Время предоставления обратной связи** :

```
Instant feedback (<100ms):
  - Visual button press highlight
  - Scratchpad character appears
  - Page navigation
  
Quick feedback (100-500ms):
  - Toggle state change (if device responds fast)
  - Menu selection
  
Delayed feedback (500ms-2s):
  - Network device control (show "SENDE..." then result)
  - Scene activation (multiple devices)
  - System operations
  
Timeout (>5s):
  - Show error if no response
```

### Сообщения об ошибках G.4 (подробные)

**Структура сообщения об ошибке** :

```
[ICON] [CATEGORY]: [SPECIFIC MESSAGE]

Examples:
❌ GERÄT: NICHT ERREICHBAR
⚠️  EINGABE: BEREICH 16-30°C
ℹ️  HINWEIS: FENSTER OFFEN
```

**Категории ошибок** :

**Ошибки устройства** :

```
GERÄT OFFLINE              (Red - device not responding)
GERÄT FEHLER               (Red - device reported error)
VERBINDUNG VERLOREN        (Red - network issue)
TIMEOUT                    (Amber - device slow to respond)
```

**Ошибки ввода** :

```
UNGÜLTIGE EINGABE          (Red - invalid data)
BEREICH X-Y                (Amber - value out of range)
FORMAT UNGÜLTIG            (Red - wrong format)
PFLICHTFELD                (Red - required field empty)
```

**Системные ошибки** :

```
SYSTEM BESCHÄFTIGT         (Amber - wait)
SPEICHER VOLL              (Red - storage issue)
VERBINDUNG GETRENNT        (Red - ioBroker offline)
UNBEKANNTER FEHLER         (Red - catch-all)
```

**Ошибки авторизации** :

```
KEINE BERECHTIGUNG         (Red - user not allowed)
PIN ERFORDERLICH           (Amber - need authentication)
GESPERRT                   (Red - locked out)
```

**Инструкции по восстановлению** :

```
Error messages should include recovery hint:

GERÄT OFFLINE
→ PRÜFE VERBINDUNG

BEREICH 16-30°C
→ WERT ANPASSEN

VERBINDUNG VERLOREN
→ WARTE ODER NEUSTART
```

**Коды ошибок** (необязательно, для устранения неполадок):

```
For advanced users, show error codes:

FEHLER: TIMEOUT [E304]
```

---

## H. Стратегия использования светодиодов

### Назначение светодиодов H.1

**Доступно 11 светодиодов** (WinWing MCDU-32-CAPTAIN):

- FAIL, MCDU, FM1, FM2, IND, RDY, DSPY, OFST, MSG, CLR, EXEC

**Семантическое сопоставление** (из файла MCDU-SMARTHOME-MAPPING.md):

| ВЕЛ                 | Значение понятия «умный дом»                           | Штаты                                                                     | Приоритет |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- | --------- |
| **НЕУДАЧА**         | Сработала охранная сигнализация                        | Выкл. / Мигает (критическое состояние) / Постоянно горит (предупреждение) | ВЫСШИЙ    |
| **MCDU**            | Соединение MCDU в порядке                              | Постоянно горит (подключено) / Выключено (отключено)                      | Высокий   |
| **ФМ1**             | ioBroker Host 1 онлайн                                 | Solid (online) / Off (offline)                                            | Высокий   |
| **ФМ2**             | ioBroker Host 2 онлайн (настройка высокой доступности) | Solid (online) / Off (offline)                                            | Середина  |
| **ИНД**             | Активно ручное управление                              | Постоянно горит (ручной режим) / Выключено (автоматический режим)         | Середина  |
| **РДИ**             | Система готова                                         | Постоянно горит (готов) / Выключено (не готов)                            | Высокий   |
| **ДСПЙ**            | Новое сообщение/уведомление                            | Мигание (непрочитано) / Выкл. (нет)                                       | Середина  |
| **ОФСТ**            | Автоматизация запущена                                 | Постоянно горит (активно) / Выключено (нет)                               | Низкий    |
| **Глутамат натрия** | Критическое предупреждение                             | Мигание (критическое) / Выкл. (нет)                                       | Высокий   |
| **CLR**             | Сцена активна                                          | Постоянно горит (активен) / Выключен (неактивен)                          | Низкий    |
| **ИСПОЛНИТЕЛЬ**     | Ожидаются действия (требуется подтверждение)           | Мигание (ожидание) / Выключение (нет)                                     | Середина  |

### Состояния и значения светодиодов H.2

**СБОЙ** - Охранная сигнализация

**Штаты** :

- **Выкл** .: Сигнализация не сработала, все в порядке.
- **Быстрое мигание** (2 Гц): Сработала сигнализация (обнаружено вторжение!)
- **Мигание медленно** (0,5 Гц): Предупреждение о тревоге (датчик неисправен, низкий заряд батареи)
- **Постоянно** : Сигнализация включена, но не сработала.

**Пример использования** :

```
Scenario 1: Alarm triggers
  FAIL LED: Off → Blink fast (red)
  MSG LED: Blink (critical alert)
  Display: ALARM! BEWEGUNG ERKANNT
  
Scenario 2: Sensor battery low
  FAIL LED: Off → Blink slow (amber)
  DSPY LED: Blink (notification)
  Display: Warning message in MELDUNGEN
```

---

**MCDU** - Статус подключения MCDU

**Штаты** :

- **Зеленый цвет** : MCDU подключен к ioBroker
- **Выкл** .: MCDU отключен или находится в автономном режиме.

**Пример использования** :

```
System starts:
  MCDU LED: Off → Solid green (connected)
  
Connection lost:
  MCDU LED: Solid → Off
  Display: VERBINDUNG VERLOREN (red error)
```

**Индикатор постоянной подсветки** : этот светодиод должен гореть постоянно зеленым цветом во время нормальной работы.

---

**FM1 / FM2** - Статус хоста ioBroker

**Штаты** :

- **Зеленый цвет** : экземпляр ioBroker онлайн
- **Выкл** .: экземпляр ioBroker отключен
- **Blink** : запуск/перезапуск ioBroker

**Пример использования** :

```
Single ioBroker setup:
  FM1 LED: Solid green
  FM2 LED: Off (not used)
  
High-availability setup:
  FM1 LED: Solid green (primary)
  FM2 LED: Solid green (backup)
  
Failover:
  FM1 LED: Off (primary failed)
  FM2 LED: Solid green (backup took over)
```

---

**ИНД** - Активно ручное управление

**Штаты** :

- **Ярко-янтарный цвет** : активен ручной режим (автоматический режим отключен)
- **Выкл** .: Автоматический режим (нормальная работа)

**Пример использования** :

```
User manually sets temperature:
  IND LED: Off → Solid amber
  Indicates: Heating schedule is overridden
  
Return to auto:
  Press "AUTO" mode LSK
  IND LED: Solid amber → Off
```

---

**RDY** - Система готова

**Штаты** :

- **Зеленый цвет** : Все системы в рабочем состоянии.
- **Выкл** .: Система не готова (ошибки, устройства отключены)
- **Blink slow** : Ухудшенное состояние (некоторые устройства отключены, но основная часть работает исправно)

**Пример использования** :

```
Startup:
  RDY LED: Off → Blink → Solid green (ready)
  
5 of 50 devices offline:
  RDY LED: Solid → Blink slow (degraded)
  
Critical device offline:
  RDY LED: Blink slow → Off (not ready)
```

**Критерии готовности** :

- ioBroker онлайн
- MCDU подключен
- Менее 10% устройств отключены от сети
- Критических ошибок нет.

---

**DSPY** - Новое сообщение/уведомление

**Штаты** :

- **Мигание янтарным цветом** (1 Гц): Непрочитанные сообщения
- **Выкл** .: Нет непрочитанных сообщений

**Пример использования** :

```
New notification arrives:
  DSPY LED: Off → Blink amber
  
User views MELDUNGEN page:
  DSPY LED: Blink amber → Off (acknowledged)
```

---

**OFST** - Автоматизация запущена

**Штаты** :

- **Зеленый цвет** : Автоматизация/планирование активно.
- **Выкл** .: Автоматизация не запущена

**Пример использования** :

```
Schedule triggers:
  18:00 - "Abend" scene scheduled
  OFST LED: Off → Solid green (scene executing)
  After 30s: OFST LED → Off (complete)
```

---

**MSG** - Критическое предупреждение

**Штаты** :

- **Мигание красным** (2 Гц): Критическая ситуация (безопасность, пожар, наводнение)
- **Выкл** .: Нет критических оповещений

**Пример использования** :

```
Water leak detected:
  MSG LED: Off → Blink red
  FAIL LED: Blink slow (amber warning)
  Display: ⚠️  WASSER ERKANNT! (red)
  
User acknowledges:
  MSG LED: Blink → Off
```

---

**CLR** - Активная сцена

**Штаты** :

- **Сплошной зеленый цвет** : активна одна или несколько сцен.
- **Выкл** .: Нет активных сцен.

**Пример использования** :

```
Activate "Film Modus":
  CLR LED: Off → Solid green
  
Deactivate scene:
  CLR LED: Solid green → Off
  
Multiple scenes:
  CLR LED stays solid green (as long as ANY scene active)
```

---

**Исполнительный директор** - Ожидается решение

**Штаты** :

- **Мигание янтарным цветом** (1 Гц): требуется подтверждение.
- **Выкл** .: Нет ожидающих действий

**Пример использования** :

```
User triggers critical action:
  Display: ALARM DEAKTIVIEREN? DRÜCKE OVFY
  EXEC LED: Off → Blink amber
  
User presses OVFY:
  EXEC LED: Blink → Off (action executed)
  
User cancels (CLR):
  EXEC LED: Blink → Off (action cancelled)
```

---

### Приоритет и конфликты светодиодов H.3

**Конфликт** : Несколько условий требуют использования одного и того же светодиода.

**Решение по приоритету** :

```
Example: FAIL LED
  Condition 1: Alarm triggered (critical)
  Condition 2: Sensor battery low (warning)
  
  Result: FAIL LED blinks fast (critical takes precedence)
  Warning shown in MELDUNGEN instead
```

**Порядок приоритета** (от наивысшего к наинизшему):

1. Критические оповещения (тревога, пожар, наводнение) → MSG, FAIL быстро мигают
2. Охрана включена → Отказ надежен
3. Системные ошибки → RDY выключен, FM1/FM2 выключен
4. Предупреждения → СБОЙ, медленное мигание, мигание DSPY
5. Активные состояния → CLR, OFST, IND твердые
6. Ожидающие действия → EXEC blink
7. Нормальное состояние → MCDU, RDY горит постоянно

**Многосветодиодные сценарии** :

```
Scenario: Alarm triggered + unread messages
  FAIL: Blink fast (red) - alarm
  MSG: Blink fast (red) - critical
  DSPY: Blink (amber) - messages
  RDY: Off (system not ready)
  MCDU: Solid (still connected)
  
Scenario: Normal operation, scene active
  RDY: Solid green (ready)
  MCDU: Solid green (connected)
  FM1: Solid green (online)
  CLR: Solid green (scene active)
  All others: Off
```

### Уровни яркости H.4

**Три уровня яркости** (если оборудование это поддерживает):

- **Выкл** .: Светодиод полностью выключен (0%)
- **Приглушенный свет** : низкая яркость (20-30%) - ночной режим
- **Яркий** : Максимальная яркость (100%) - дневной режим

**Автоматическое затемнение** (опционально):

```
Time-based:
  22:00-06:00 → All LEDs dim mode
  06:00-22:00 → All LEDs bright mode
  
Or ambient light sensor:
  Dark room → Dim
  Bright room → Bright
  
User override:
  EINSTELLUNGEN > LED HELLIGKEIT
    AUTO / DIM / HELL
```

**Яркость каждого светодиода** :

```
Critical LEDs (always bright):
  - FAIL (when blinking)
  - MSG (when blinking)
  
Normal LEDs (respect dim mode):
  - RDY, MCDU, FM1, FM2
  - DSPY, CLR, EXEC, OFST, IND
```

### Схемы мигания H.5

**Стандартная частота мигания** :

- **Быстрое моргание** : 2 Гц (0,25 с включено, 0,25 с выключено) - Критически важное внимание
- **Нормальное мигание** : 1 Гц (0,5 с включено, 0,5 с выключено) - Стандартное оповещение
- **Медленное мигание** : 0,5 Гц (1 с включено, 1 с выключено) - Предупреждение низкого приоритета

**Примеры шаблонов** :

```
FAIL (alarm triggered):
  ████░░░░████░░░░████░░░░  (2 Hz fast)
  
EXEC (pending confirm):
  ████████░░░░░░░░████████░░░░░░░░  (1 Hz normal)
  
RDY (degraded):
  ████████████████░░░░░░░░░░░░░░░░  (0.5 Hz slow)
```

**Особые узоры** :

```
Heartbeat (system alive):
  RDY: ██░░██░░░░░░░░░░░░██░░██░░░░  (double pulse every 2s)
  
Attention (new message):
  DSPY: ██░░██░░██░░░░░░░░  (triple pulse, then pause)
```

---

## Краткое содержание: Ключевые принципы UX

### ✅ Что нужно делать

1. **В первую очередь, возможность настройки** : функциональные клавиши, быстрые действия, светодиоды — настраиваются пользователем.
2. **Минимизировать глубину** : максимум 3 уровня от функциональной клавиши до действия.
3. **Единые цвета** : белый = нормальный, зеленый = активный, янтарный = предупреждение, красный = критический
4. **Четкая обратная связь** : каждое действие получает визуальное подтверждение (галочка, изменение цвета, светодиод).
5. **Блокнот для ввода данных** : весь ввод данных осуществляется через блокнот + LSK.
6. **Контекстно-зависимые LSK-теги** : метки LSK изменяются на каждой странице.
7. **Всегда возможен выход** : сочетание клавиш MENU + CLR всегда обеспечивает путь к выходу.
8. **Проверка на ранней стадии** : проверяйте входные данные перед передачей, удаляйте сообщения об ошибках.
9. **Подтверждение критического состояния** : Жесткое подтверждение (OVFY) для необратимых действий.
10. **Отображаемый статус** : светодиоды + страница статуса = мгновенный обзор состояния дома.

### ❌ Чего не следует делать

1. **Не следует жестко прописывать назначения клавиш** : функциональные клавиши должны быть настраиваемыми.
2. **Не скрывайте ошибки** : всегда показывайте, что пошло не так и как это исправить.
3. **Не скрывайте часто используемые действия** : Быстрый доступ > Вложенные древовидные меню
4. **Не смешивайте значения цветов** : придерживайтесь семантической цветовой стратегии.
5. **Не блокируйте на медленных устройствах** : покажите «ОТПРАВИТЬ...», затем продолжите.
6. **Не теряйте данные блокнота** : сохраняйте их при переходе между страницами (если они не были удалены).
7. **Не забывайте о подтверждении** : критически важные действия требуют точного подтверждения.
8. **Не злоупотребляйте светодиодами** : используйте их только для важных состояний, а не для каждого действия.

---

**Статус документа** : ✅ Завершен - Спецификация UX, готовая к внедрению в производство\
&#x20;**Следующий документ** : INTERACTION-EXAMPLES.md (Конкретные сценарии взаимодействия пользователей с указанием точной последовательности действий)\
&#x20;**Общая длина** : \~23 КБ (соответствует целевому значению 15-20 КБ)