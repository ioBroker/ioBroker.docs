---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/README.md
title: ioBroker.autodoc
hash: 51LGCO5BrXAG4xBeyr0pv88o/QMaNGOFFcE+nFnuklE=
---
![Логотип](../../../en/adapterref/iobroker.autodoc/admin/autodoc.png)

![Тестирование и выпуск](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.autodoc

Автоматически генерирует структурированную документацию (HTML, Markdown, JSON) для вашей установки ioBroker — по запросу, по расписанию или при изменении системы.

**Версия:** 0.9.48

**Установка**

1. Откройте **[административную панель ioBroker](https://www.iobroker.net/#en/documentation)** и установите...** `iobroker.autodoc` ** из списка адаптеров.
2. Официальный индекс адаптера: **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** ( **последняя версия** ). Рабочий процесс сопровождающего / PR: **[TODO — § 1.1 Релиз](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung)** .

|                 |                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Репозиторий** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **Проблемы**    | [Проблемы на GitHub](https://github.com/crunchip77/ioBroker.autodoc/issues)              |

## Описание

Адаптер сканирует адаптеры, хосты, комнаты, функции, скрипты, псевдонимы, пользовательские данные и связанные с ними метаданные, а затем за один запуск записывает **три профиля** :

| Профиль              | Аудитория | Фокус                                                                    |
| -------------------- | --------- | ------------------------------------------------------------------------ |
| **Администратор**    | Операторы | Экземпляры, хосты, ресурсы, скрипты, советы по обслуживанию, диагностика |
| **Пользователь**     | Семья     | Помещения, устройства, автоматизация — простым языком.                   |
| **Ввод в должность** | Гости     | Добро пожаловать, возможности, QR-код / ссылка на последнюю версию HTML  |

Экспорт оформляется в соответствии с `/files/autodoc.<instance>/` (последняя версия HTML + повернутая метка времени) `.md` /`.html` /`.json` Дополнительные уведомления и **возможность включения текстовых сообщений с использованием ИИ** (отдельные поставщики) могут обогатить документацию.

## Требования

- **Node.js** ≥ 22 (см. `package.json` →`engines`)
- **ioBroker.js-controller** ≥ 6.0.11 (объявлен в `io-package.json` →`common.dependencies`)
- **ioBroker Admin** ≥ 7.8.23 (объявлено в `io-package.json` →`common.globalDependencies`) — необходимый для пользовательского интерфейса конфигурации **JSON** и `jsonConfig` функции (например) `textSendTo` (складные панели)

Для работы AutoDoc никаких дополнительных адаптеров не **требуется** . Дополнительно: адаптер **веб-сервера** , если вы хотите открывать сгенерированные файлы вне файлового браузера административной панели; экспорт всегда доступен в другом месте. `/files/autodoc.<instance>/` Для создания **PDF-** профилей требуется дополнительный пакет npm.** `puppeteer` ** (Встроенный Chromium) установлен в каталоге адаптера — см. **раздел «Дополнительный экспорт в PDF»** ниже.

## Конфигурация

### Обзор экземпляра документации

Настройте экземпляр в **административной панели ioBroker** (вкладки «Основные параметры», «Примечания вручную», «Расширенные параметры», «Уведомления», «ИИ»). Генерацию можно запускать вручную, при запуске, по таймеру и после изменений адаптера (с задержкой).

**Язык документации** (Основные настройки) определяет заголовки и фиксированный текст во **всех HTML-профилях** и в Markdown. Он также управляет **краткими сводными строками** для сравнения инвентаря («изменения с момента последнего запуска») и для карточек **изменений** при повторной генерации — более старые сохраненные строки изменений отображаются на **текущем** языке экспорта, а не на языке, который был у них при сохранении.

В разделе **«Дополнительно» → «Что включить и ограничения» параметр** « **Скрыть «изменения с момента последнего запуска» в экспорте административной панели»** удаляет только желтый блок «дельта» в верхней части главы «Система **административной** панели HTML» и соответствующий подраздел в экспорте **административной панели** Markdown. Глава **«Журнал изменений»** , экспорт **пользователей** и **адаптация новых сотрудников** остаются без изменений.

В профиле **пользователя/семьи** после заголовка добавляется короткое повседневное предложение, если AutoDoc обнаружил **хотя бы одно** изменение в инвентаризации с момента предыдущего снимка (пропускается при первом запуске и когда ничего не изменилось). **При регистрации** это дополнительное уведомление не включается.

Краткий **инструктаж** для операторов (пути установки, вкладки, экспорт, хеши, проверка):**[`docs/user-guide/README.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.md)** • **Немецкая** вики-страница конфигурации (вкладки, скриншоты, демонстрационный сценарий):**[`docs/user-guide/README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)** .

Полезные **состояния** (выбор): `action.generate`;** `action.exportPdf` ** (записывает **PDF-** профили из последней версии HTML в) `/files` когда необязательн&#x43E;** `puppeteer` ** устанавливается в каталог адаптера — полная регенерация не производится); `info.lastGeneration` /`info.nextGeneration`; `info.htmlUrlAdmin` /`info.htmlUrlUser` /`info.htmlUrlOnboarding`; `info.templateVersion` (Выравнивание HTML-шаблона / средства рендеринга); `info.forumCardPlain` (Текстовая «системная карточка» для форумов, обновляется при создании документации).

**Экспорт и хранение:** после каждого успешного запуска,** `documentation.exportHashes` ** содержит **SHA-256 (шестнадцатеричный код)** для последних файлов MD/JSON/Admin HTML, предоставляемых с сайта. `/files` и **объединяет дайджесты для `autodoc-{admin,user,onboarding}.pdf` ** При каждом выполнении шага экспорта PDF-файлов создавались эти файлы. Полный Markdown от Canonical, модель JSON и HTML-код административной панели доступны **только** в \[укажите местоположение].** `/files/` ** (`autodoc-latest.*` (профиль HTML). Штат&#x44B;** `documentation.markdown` ** ,** `documentation.html` ** , &#x438;** `documentation.json` ** Используйте только **короткие заполнители** .** `info.htmlUrl*` ** ,** `/files/` ** или выполните действия по загрузке для получения полного текста.

### Медиафайлы, Redis и хранилище состояния (кратко)

- **Канонический экспорт** всегда живет по&#x434;** `/files/autodoc.<instance>/` ** и **перезаписываются** при каждом запуске (никакого накопления старых HTML-версий не происходит).
- ** `documentation.*` Состояния тела запроса** являются **лишь заполнителями** (большие объемы данных не дублируются в базе данных объектов). Скрипты и интеграции, требующие чтения **полного текста,** не подходят.** `/files/` ** или использоват&#x44C;** `info.htmlUrl*` ** / действия загрузки.
- **Фотографии и большие бинарные файлы:** **не** храните большие изображения или BLOB-объекты в качестве **больших значений состояния** в **объектной базе данных** ioBroker — **особенно с Redis** (бинарные данные увеличивают объем оперативной памяти). Используйте **внешние URL-адреса** (ваш NAS, HTTP-сервер) или небольшие **встроенные SVG-** диаграммы; это же правило обеспечивает предсказуемость настроек **jsonl** . AutoDoc хранит **полные** Markdown/HTML/JSON по&#x434;** `/files/` ** ;** `documentation.markdown` ** ,** `documentation.html` ** , &#x438;** `documentation.json` ** Это лишь **короткие заглушки** , а не медиамагазин.
- Обоснование, варианты и перспективы работы со СМИ: [`PLAN.md`— Медиа (MVP), ограничения](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) и [границы архитектуры](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-grenzen) .

### Общедоступный базовый URL

HTML-код **для адаптации** включает QR-код и элемент управления **«Копировать ссылку»** . Оба элемента используют один и тот же целевой объект: файл адаптации, расположенный по адресу... `/files/autodoc.<instance>/autodoc-onboarding.html` с префиксом, содержащим **базовый URL-адрес ioBroker** из настроек адаптера (вкладка **«Дополнительно»** : _базовый URL-адрес ioBroker (необязательно)_ ).

- Укажите базовый URL-адрес, который вы используете в браузере для доступа к ioBroker (схема, хост, порт при необходимости), **без** завершающей косой черты. Примеры: `https://home.example.com:8081`, `http://192.168.1.10:8081`.
- Если адрес **пустой или неверный** , посетители, сканирующие QR-код или использующие скопированную ссылку с другого устройства, могут получить неработающий или доступный только внутри сети URL-адрес. После внесения изменений запустите генерацию документации заново, чтобы перестроить HTML-код.

### Дополнительный экспорт файловой системы (Docker / NAS)

**Путь экспорта файловой системы** записывает три HTML-профиля в реальную директорию (в дополнение к директории ioBroker). `/files/…` хранилище). В **Docker** сопоставьте папку хоста с контейнером и укажите **путь экспорта** на **стороне контейнера** (а не на стороне Unraid/хоста). Краткое напоминание см. в справке по полю в разделе «Администрирование».

### Дополнительный экспорт в PDF (Puppeteer)

**Максимально возможное действие:** после успешного выполнения проверки документации вы можете создат&#x44C;** `autodoc-admin.pdf` ** ,** `autodoc-user.pdf` ** , &#x438;** `autodoc-onboarding.pdf` ** из того же HTML-кода, который хранится по адресу `/files/` (безголовый Chromium чере&#x437;** `puppeteer` ** объявлен как **необязательная** зависимость npm — та же основная строка, что &#x438;** `@mermaid-js/mermaid-cli` ** Включите параметр **«Генерировать PDF после каждого запуска документации»** в **разделе «Дополнительно»** рядом с экспортом в файловую систему или триггером.** `action.exportPdf` ** Вручную. PDF-файлы создаются &#x432;** `/files/autodoc.<instance>/` ** и зеркально отображается в **путь экспорта файловой системы** , если этот путь задан. **Встроенный SVG-файл Mermaid** (когда mmdc запускался во время генерации) печатается без дополнительного подключения к сети; клиент **jsDelivr** Mermaid по-прежнему нуждается в интернете на этапе создания PDF-файла. Без работающего стека Chromium создание PDF-файла пропускается с четкой строкой в логе — генерация HTML/Markdown остается без изменений.

### Контекстные подсказки ИИ (гость против жителя)

**Контекстные подсказки ИИ** вводятся только в подсказку LLM; они **не** отображаются в документации. Для **регистрации гостей** предпочтительнее использовать повседневные факты. Обилие терминов, относящихся к ИТ или проектам (адаптеры, репозитории и т. д.), может привести к проникновению профессионального жаргона в текст **гостя** ; в этом случае блок ИИ заменяется нейтральным текстом для гостя. Это сделано намеренно. Профиль **резидента/семьи** не использует такое же ограничение «только для гостей». Настройте их в разделе «Администрирование» в **документации KI / документации ИИ** (после включения поставщика); полный текст отображается в подсказке над полем.

**Примеры** копирования и вставки (идентификаторы полей, синтаксис): [**Mermaid**](#mermaid-cookbook-examples) · [**Массивы JSON**](#json-cookbook-snippets) · [**Пользовательский CSS**](#html-custom-css-examples) · **Стабильные URL-адреса** для закладок / Администрирования `staticLink`:** `blob/main/README.md#…` ** — GitHub открывает Markdown в **режиме предварительного просмотра** (читаемый); фрагменты соответствуют заголовкам ниже (те же имена, что и у локальных файлов). `#…` ссылки). В просмотрщике GitHub функция прокрутки до раздела **работает наилучшим образом** ; **корневые URL-адреса репозитория** , например: `…/ioBroker.autodoc#json-cookbook-snippets` остаются ненадежными. После внесения существенных изменений в файл README **повторно проверьте идентификаторы файлов** на соответствие.** `blob/main` ** .

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">Mermaid cookbook examples</h3>

Вставьте в раздел **«Моя документация» → Диаграмма русалки** (`manualMermaidDiagram` Используйте **обычные переносы строк** внутри поля (без HTML). Предпочтительне&#x435;** `flowchart LR` ** Диаграммы слишком большие и не помещаются на HTML-странице; очень большие графики трудно читать — при необходимости разделите концепции на отдельные диаграммы.

**Встроенный SVG:** когд&#x430;** `@mermaid-js/mermaid-cli` ** Если адаптер установлен в каталоге адаптера и генерация прошла успешно, диаграммы преобразуются в встроенный SVG в HTML (подходит для офлайн-использования/PDF). Если встраивание не удается или отсутствует CLI, экспорт сохраняет результат. `<pre class="mermaid">` блокировка, и браузер может загрузить Mermaid из jsDelivr — см. **Дополнительный экспорт в PDF** &#x438;** `docs/user-guide` ** («Дополнительный CLI Mermaid»).

Краткий обзор слева направо:

```text
flowchart LR
  Internet([Internet]) --> Router[Router]
  Router --> ioB(ioBroker host)
  ioB --> Heating[Heating adapters]
  ioB --> Lights[Lights / rooms]
```

Небольшой **подграф** (группировка связанных узлов):

```text
flowchart LR
  subgraph LAN["Home LAN"]
    A[js-controller] --> B[javascript.0]
    A --> C[other instances]
  end
```

**Советы**

- Используйте только те конструкции **русалок** , которые вы видели в работе в других местах; экзотические директивы могут дать сбой. `mmdc`.
- **Автоматическая топология хоста** — это отдельный процесс (`autoMermaidHostGraph` скрыть это с помощь&#x44E;** `mermaidAuto` ** в разделе **«Администратор/Пользователь»** скрыть списки (см. `EXTRA_HIDDEN_CHAPTER_IDS` в `lib/docTemplateConfig.js` Схема русалки, **созданная вручную** , находится в...** `manual` ** В разделе **«Администрирование»** — скройте этот раздел, если хотите его удалить. В **разделе «Пользователи»** — списки справки по полям.** `mermaid` ** &#x438;** `mermaidAuto` ** отдельно; при **адаптации** используйт&#x435;** `mermaid` ** Схема подключения для владельцев находится в приветственной зоне (см. справку на этой вкладке).

<h3 id="json-cookbook-snippets">JSON cookbook snippets</h3>

Администрация хранит эти поля как **строки** ; содержимое должно быть **допустимым JSON** . `"` ключи/строки, без завершающих запятых). Пустой список означает значения по умолчанию: используйт&#x435;** `[]` ** где вы не хотите нарушать порядок или что-либо скрывать.

Немецкая **страница с описанием сценария** («скрыть первым или изменить порядок», пошаговое руководство с возможностью копирования и вставки, привязанное к шагу 6): **[`README.de.md`— Вики — Шаг 6](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`).

**Допустимые идентификаторы глав** берутся из адаптера (`lib/docTemplateConfig.js`):

| Профиль          | Поля заказа                  | Скрытые поля                   | Примечания                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Администратор    | `adminChapterOrderJson`      | `adminHiddenChaptersJson`      | Порядок по умолчанию: `manual`, `system` …, `appendices` Дополнительный идентификатор, позволяющий только скрыть данные:** `mermaidAuto` ** (Топология с автоматическим размещением хоста). Диаграмма Mermaid, **созданная вручную** , является часть&#x44E;** `manual` ** — Чтобы исключить этот раздел из экспорта администратора, полностью пропустите эту главу. |
| Пользователь     | `userChapterOrderJson`       | `userHiddenChaptersJson`       | В число ключей входят `manual`, `ai`, `guestHelp`, `atAGlance`, `rooms`, `scripts`, `routines`, `ownerPlaybook`, `mermaid`, `adapters`, `custom`, `system`, `troubleshooting`.                                                                                                                                                                                 |
| Ввод в должность | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | В число ключей входят `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`.                                                                                                                                           |

**Reorder Admin** — разместить обзор системы непосредственно после контекста, заданного вручную:

```json
["manual", "system", "adapters", "rooms", "automationOverview", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

**Скрыть** список изменений и приложения административной панели:

```json
["changelog", "appendices"]
```

**Глава «Скрытие пользовательских скриптов»:**

```json
["scripts"]
```

**Изменить порядок пользователя** — принест&#x438;** `system` ** После комнат (полный список ключей, в остальном идентификаторы совпадают с порядком по умолчанию):

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**Настраиваемые главы в формате Markdown** (`customDocSectionsJson`) — массив объектов &#x441;** `title` ** ,** `body` ** (ил&#x438;** `bodyMarkdown` ** ), необязательны&#x439;** `profiles` ** (`"admin"` |`"user"` |`"onboarding"`). Пропускат&#x44C;** `profiles` ** Отображать во **всех** профилях.

```json
[
  {
    "title": "Emergency contacts",
    "body": "## Numbers\n- **Repair:** …\n- **Utility:** …",
    "profiles": ["user", "onboarding"]
  },
  {
    "title": "Operator notes",
    "body": "## Rack layout\nShort **Markdown** only; keep secrets out.",
    "profiles": ["admin"]
  }
]
```

Максимум **12** секций; очень длинные тела обрезаются во время генерации.

<h3 id="html-custom-css-examples">HTML custom CSS examples</h3>

В разделе **Администрирование → Экспорт HTML и дополнительные разделы** , **Набор шрифтов** (`htmlFontStack`) и **Extra CSS** (`htmlExtraCss`) изменяет только **экспортированный HTML** (не Markdown). Рендерер оборачивает страницы в `lib/htmlRenderer.js` (`wrapPage` Ссылки в боковой панели находятся ниж&#x435;** `nav ul li a` ** , макет используе&#x442;** `#layout` ** ,** `nav` ** , &#x438;** `main` ** — Проверьте сгенерированный HTML-код, если вам нужен селектор.

**Набор шрифтов:** один CSS `font-family` список (рискованные персонажи) `< > { }` (удалены). Пример пасты:

```css
"Source Serif 4", Georgia, serif
```

**Дополнительный CSS:** добавить короткие правила после встроенной таблицы стилей. Предпочитать **существующие токены палитры** (`var(--link)`, `var(--nav-bg)`, `var(--border)`, `var(--surface)` … из `:root` /`body.dark` блоки);** `htmlThemePreset` ** обменивает их посредством `html.autodoc-preset-*` классов — отдельных нет. `--accent` токен на `:root` (некоторые компоненты используют) `var(--accent, #0066cc)` (только в качестве **локального** резервного варианта).

Начальный фрагмент кода, который можно вставить в раздел **"Дополнительный CSS"** :

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## Функции (обзор)

- Обнаружение объектов в экземплярах, хостах, перечислениях, скриптах, псевдонимах, пользовательских данных и конфигурации системы.
- Для каждого профиля предусмотрен отдельный HTML-код с функцией поиска, темным режимом и адаптивным дизайном.
- Экспорт в формат Markdown + JSON и история версий (с возможностью настройки ротации).
- Подсказки, ориентированные на техническое обслуживание (оценка качества документации для открытых пунктов контрольного списка; отключенные экземпляры, указанные в инвентаризации, не подвергаются штрафным санкциям).
- Многоязычные строки административного интерфейса (полностью на английском, немецком и французском языках; для других языковых версий текст на английском языке будет переведен — [CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#admin-ui-translations-i18n) ); сгенерированный текст документации соответствует **языку документации** , включая строки сводки изменений/сравнения и необязательные уведомления об изменениях в инвентаризации при экспорте пользовательских данных.
- Поставщики услуг ИИ (например, Ollama, Groq, Anthropic) с возможностью добровольного участия.

Для **составления дорожной карты и планирования** :[`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md) (Открытая работа вверху, полностью заполненные контрольные списки в приложении) и[`PLAN.md`](/#/docs/adapterref/iobroker.autodoc/PLAN.md) (Разработка концепции, обоснования, мозговой штурм по архитектуре).

**Участие в проекте / выпуски:** см.[`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md) .

## Changelog

**Admin `common.news`** in `io-package.json` lists only versions **published on npm** (Adapter Checker **E2004**). The detailed sections below are the **user-facing** changelog (Git-era releases plus npm); older entries are in `CHANGELOG_OLD.md`.

### 0.9.48 (2026-09-22)

- **Admin — Automation overview:** New **Automatisierung im Überblick** chapter collects time-based JavaScript CRON, ioBroker schedule objects, adapter schedule/restart CRON, and a transparent “what AutoDoc cannot list as a schedule” summary for Blockly/subscribe/rule-engine limits.
- **User / Onboarding — automation clarity:** Family docs now keep automation summaries readable even when Blockly/scripts have no `common.desc`; Quick Start counts active JavaScript automations without exposing technical script names to guests.
- **Rooms and functions:** User/Admin exports resolve room/function members through the ioBroker object hierarchy (State → Channel → Device), deduplicate common POWER/state duplicates, show better device names, and list **functions** with per-function devices like the room device hierarchy.
- **HTML UX polish:** Connected systems, host topology, manual Mermaid diagrams, and function sections are collapsible where they would otherwise dominate the page; disclosure arrows use a more consistent muted style. Room notes now live in expanded room details instead of the compact Admin room table.
- **Mermaid / offline SVG:** `@mermaid-js/mermaid-cli` bumped to 11.16.0; logs now point more clearly at missing Chromium libraries, and `scripts/install-chromium-deps-linux.sh` documents Linux/buanet package hints. Renderer marker: `2026.09.22.9`.

### 0.9.47 (2026-09-20)

- **Repository checker (#60):** Maintainer contact email (E4052); README **`## License`** links to [`LICENSE`](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE) (E6034)
- **CI:** Node.js **26.x** added to adapter test matrix (W3026)
- **Release / provenance:** npm publish via GitHub Actions **`deploy`** job (Trusted Publishing) — fixes missing attestations from workstation **0.9.46** (E2008)
- **Dependencies:** `@tsconfig/node22`, `@iobroker/adapter-core` bumps (Dependabot)
- **Docs:** Maintainer notes for latest re-listing, stable deferred (#54), platform reconnaissance
- **Runtime:** no adapter behavior changes

### 0.9.46 (2026-06-28)

- (mcm1957) `info.summary` state now outputs English text by default
- (mcm1957) Periodic documentation generation switched from `setInterval` to `setTimeout`-at-end — prevents overlapping runs
- (mcm1957) `autoGenerateInterval` code-level minimum clamp of 0.1 h with warning log
- (mcm1957) README: GitHub install instruction removed (E6013)
- (fix) `common.news` 0.9.37 / 0.9.38 / 0.9.44 translated into es, it, nl, pl, pt, ru, uk, zh-cn (E1144)
- (fix) `admin` minimum version bumped to `>=7.8.23`

### 0.9.45 (2026-06-18)

- **ioBroker conformance — object structure:** Added channel parent objects (`action`, `documentation`, `info`, `versioning`) to `instanceObjects` in `io-package.json` — required by ioBroker object checker (E3009) for **ioBroker.repositories** review.
- **ioBroker conformance — timers:** `adapter.delay()` (ioBroker base class) for AI retry delays; `window.setTimeout` / `globalThis.setTimeout` in browser-side and utility code — no bare `setTimeout` in adapter runtime (E5005/W5004 fixes).
- **i18n:** All 10 supported languages translated via `@iobroker/adapter-dev` (Google Translate); `de` and `fr` remain manually maintained. Missing keys synced across all locales.
- **Dependencies:** `@iobroker/adapter-core` → 3.4.1, `cytoscape` → 3.34.0.

### 0.9.44 (2026-05-14)

- **Chapter JSON & logs:** Each documentation run evaluates Admin/User/Onboarding chapter order and hide JSON. **English** adapter **`warn`** lines report invalid JSON shape, **unknown** chapter ids, and **duplicate** ids, with a pointer to the **[German user guide — JSON cookbook](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**. Identical warning **lines** are **deduplicated** per adapter **log** reference (process lifetime). Values read only from **legacy** native keys are labeled **`…Json via native …`** in the log. **`lib/chapterConfigWarnings.js`**; wired from **`DocumentModel.buildDocumentModel`**. **`EXTRA_HIDDEN_CHAPTER_IDS`** exported from **`docTemplateConfig`** for hide-list validation.
- **Admin i18n:** Extended **`?`** help for the six chapter order/hide JSON fields (log + GitHub links under **Which chapters to show (per profile)**) — **DE/FR** translated, **EN** + other locales as fallbacks.
- **Quick Start (5.x.2):** Room highlight **`HIGHLIGHT_CATEGORY_RANK`** extended (**`leak`**, **`co2`**, **`valve`**, **`weather`**, **`sensor`**, …); function areas with equal **member count** tie-break by **name**.
- **HTML template:** **`RENDERER_VERSION`** in **`lib/htmlRenderer.js`** bumped so instances that skip “generate on start” still **regenerate once** after the adapter update (**`info.templateVersion`** vs renderer marker).
- **Docs maintainer:** **`docs/user-guide/assets/SCREENSHOTS.md`** notes that tooltip-only changes often need **no** new PNG.

### 0.9.43 (2026-05-13)

- **Admin / Adapter Checker:** **`common.news`** lists only semver versions that exist as tarballs on **npm** (ioBroker Adapter Checker **E2004**). Removed **`news`** keys **0.9.39**, **0.9.40**, and **0.9.41** — those bumps never shipped to the registry between **0.9.38** and **0.9.42**. Full narrative for **0.9.41–0.9.39** is kept in **`CHANGELOG_OLD.md`** (README changelog window matches the **`common.news`** version set).
- **`common.news` copy:** **0.9.42** admin news now compares against **0.9.38** (last npm release before **0.9.42**).
- **Runtime:** unchanged.

### 0.9.42 (2026-05-13)

- **npm / process:** Patch **0.9.42** — **no functional change** vs **0.9.38** (previous tarball on npm before **0.9.42**); `package.json` / `io-package.json` / README **`Version:`** aligned for npm publish only (release-script housekeeping).

<!-- Maintainer: Admin staticLinks — under chapter visibility: English README `#json-cookbook-snippets`, Wiki DE `#wiki-admin-json-cookbook`. Schnellzugriff in README.de; SCREENSHOTS table for PNG drift; Sync jsonConfig/i18n if URLs change. -->

## License

MIT License

Copyright (c) 2026 crunchip77 <crunchip77@gmail.com>

The complete license text is in the [LICENSE](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE) file.