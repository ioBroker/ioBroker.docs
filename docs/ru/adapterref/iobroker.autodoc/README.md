---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/README.md
title: ioBroker.autodoc
hash: jmoRTQjUc0jOo2v1G8WdgUEiLsntOD9B9YWSHD4HITU=
---
![Логотип](../../../en/adapterref/iobroker.autodoc/admin/autodoc.png)

# IoBroker.autodoc
Автоматически генерирует структурированную документацию (HTML, Markdown, JSON) для вашей установки ioBroker — по запросу, по расписанию или при изменении системы.

**Версия:** 0.9.46

**Установка**

1. Откройте **[ioBroker Admin](https://www.iobroker.net/#en/documentation)** и установите **`iobroker.autodoc`** из списка адаптеров.
2. Официальный индекс адаптера: **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (**последняя версия**). Рабочий процесс сопровождающего / PR: **[TODO — § 1.1 Release](TODO.md#release-veroeffentlichung)**.

| | |
| --- | --- |
| **Репозиторий** | [github.com/crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc) |
| **Проблемы** | [Проблемы на GitHub](https://github.com/crunchip77/ioBroker.autodoc/issues) |

**CI:** ![Тестирование и выпуск](https://github.com/crunchip77/ioBroker.autodoc/workflows/Test%20and%20Release/badge.svg)

## Описание
Адаптер сканирует адаптеры, хосты, комнаты, функции, скрипты, псевдонимы, пользовательские данные и связанные с ними метаданные, а затем за один запуск записывает **три профиля**:

| Профиль | Аудитория | Фокус |
| --- | --- | --- |
| **Администратор** | Операторы | Экземпляры, хосты, ресурсы, скрипты, советы по обслуживанию, диагностика |
| **Пользователь** | Домохозяйство | Комнаты, устройства, автоматизация простым языком |
| **Ввод в систему** | Гости | Приветствие, возможности, QR-код / ссылка на последнюю версию HTML |

Экспортируемые данные записываются в формате `/files/autodoc.<instance>/` (последняя версия HTML + повернутый текст с временной меткой `.md` / `.html` / `.json`). Дополнительные уведомления и **текст, созданный с помощью ИИ** (отдельные поставщики) могут обогатить документацию.

## Требования
- **Node.js** ≥ 22 (см. `package.json` → `engines`)
- **ioBroker.js-controller** ≥ 6.0.11 (объявлен в `io-package.json` → `common.dependencies`)
- **ioBroker Admin** ≥ 7.6.20 (указано в `io-package.json` → `common.globalDependencies`) — необходимо для пользовательского интерфейса конфигурации **json** и функций `jsonConfig` (например, `textSendTo`, сворачиваемые панели)

Для работы AutoDoc никаких других адаптеров **не требуется**. Дополнительно: адаптер **веб-сервера**, если вы хотите открывать сгенерированные файлы вне файлового браузера административной панели; экспорт всегда доступен в `/files/autodoc.<instance>/`. Для **PDF**-профилей требуется дополнительный пакет npm **`puppeteer`** (входит в состав Chromium), установленный в каталоге адаптера — см. **Дополнительный экспорт PDF** ниже.

## Конфигурация
### Обзор экземпляра документации
Настройте экземпляр в **административной панели ioBroker** (вкладки «Основные параметры», «Примечания вручную», «Расширенные параметры», «Уведомления», «ИИ»). Генерацию можно запускать вручную, при запуске, по таймеру и после изменений адаптера (с задержкой).

**Язык документации** (Основные настройки) определяет заголовки и фиксированный текст во **всех HTML-профилях** и в Markdown. Он также управляет **краткими сводными строками** для сравнения инвентаря («изменения с момента последнего запуска») и для карточек **журнала изменений** при повторной генерации — более старые сохраненные строки журнала изменений отображаются на **текущем** языке экспорта, а не на языке, который был у них при сохранении.

В разделе **Дополнительно → Что включить и ограничения** параметр **Скрыть «изменения с момента последнего запуска» в экспорте административной панели** удаляет только желтый блок дельты в верхней части главы системы **Административная панель** в формате HTML и соответствующий подраздел в формате Markdown для **Административная панель**. Глава **Список изменений**, экспорт **Пользователи** и **Ввод в эксплуатацию** остаются без изменений.

В профиле **Пользователя / Семьи** после заголовка добавляется короткое повседневное предложение, если AutoDoc обнаружил **как минимум одно** изменение в инвентаризации с момента предыдущего снимка (пропускается при первом запуске и когда ничего не менялось). **В процессе регистрации** это дополнительное уведомление не включено.

Краткий **инструктаж** для операторов (пути установки, вкладки, экспорт, хеши, проверка): **[[docs/user-guide/README.md](docs/user-guide/README.md)** · **Немецкая** вики-страница конфигурации (вкладки, скриншоты, демонстрационный сценарий): **[`docs/user-guide/README.de.md`](docs/user-guide/README.de.md)**.

Полезные **состояния** (выбор): `action.generate`; **`action.exportPdf`** (записывает **PDF** профили из последнего HTML в `/files`, если в каталог адаптера установлен необязательный **`puppeteer`** — без полной перегенерации); `info.lastGeneration` / `info.nextGeneration`; `info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`; `info.templateVersion` (выравнивание HTML-шаблона / средства рендеринга); `info.forumCardPlain` (простой текст «системной карточки» для форумов, обновляется при генерации документации).

**Экспорт и хранение:** после каждого успешного запуска **`documentation.exportHashes`** хранит **SHA-256 (шестнадцатеричный код)** для последнего MD/JSON/Admin HTML, полученного из `/files`, и **объединяет дайджесты для `autodoc-{admin,user,onboarding}.pdf`** всякий раз, когда этап экспорта PDF записывал эти файлы. Полный канонический Markdown, модель JSON и Admin HTML хранятся **только** в **`/files/`** (`autodoc-latest.*`, HTML профиля). Штаты **`documentation.markdown`**, **`documentation.html`** и **`documentation.json`** содержат только **короткие заполнители** — используйте **`info.htmlUrl*`**, **`/files/`** или загрузите действия для просмотра полного текста.

### Медиафайлы, Redis и хранилище состояния (кратко)
- **Канонические экспортированные файлы** всегда находятся в папке **`/files/autodoc.<instance>/`** и **перезаписываются** при каждом запуске (старые HTML-версии там не накапливаются).
- Состояния тела документа (`documentation.*`) являются **только заполнителями** (большие объемы данных не дублируются в базе данных объектов). Скрипты и интеграции, которым требуется **полный текст**, читают **`/files/`** или используют **`info.htmlUrl*`** / действия загрузки.
- **Фотографии и большие бинарные файлы:** не храните большие изображения или BLOB-объекты в качестве больших значений состояния в **базе данных объектов** ioBroker — **особенно с Redis** (бинарные данные увеличивают объем оперативной памяти). Используйте **внешние URL-адреса** (ваш NAS, HTTP-сервер) или небольшие **встроенные SVG-диаграммы**; это же правило обеспечивает предсказуемость настроек **jsonl**. AutoDoc хранит **полные** файлы Markdown/HTML/JSON в **`/files/`**; **`documentation.markdown`**, **`documentation.html`** и **`documentation.json`** — это **короткие заполнители**, а не хранилище медиафайлов.
- Обоснование, варианты и будущая работа со СМИ: [`PLAN.md` — Медиа (MVP) и ограничения](PLAN.md#architektur-medien-mvp) и [Границы архитектуры](PLAN.md#architektur-grenzen).

### Общедоступный базовый URL
HTML-код для процесса регистрации включает QR-код и элемент управления «Скопировать ссылку». Оба используют один и тот же целевой объект: файл регистрации в папке `/files/autodoc.<instance>/autodoc-onboarding.html`, с префиксом **базового URL-адреса ioBroker** из настроек адаптера (вкладка **Дополнительно**: *базовый URL-адрес ioBroker (необязательно)*).

— Установите базовый URL-адрес в соответствии с тем, который вы используете в браузере для доступа к ioBroker (схема, хост, порт, если необходимо), **без** завершающей косой черты. Примеры: `https://home.example.com:8081`, `http://192.168.1.10:8081`.
- Если адрес **пустой или неверный**, посетители, сканирующие QR-код или использующие скопированную ссылку с другого устройства, могут получить неработающую или предназначенную только для внутреннего использования ссылку. После внесения изменений запустите генерацию документации заново, чтобы HTML-код был перестроен.

### Дополнительный экспорт файловой системы (Docker / NAS)
**Путь экспорта файловой системы** записывает три HTML-профиля в реальный каталог (в дополнение к хранилищу ioBroker `/files/…`). В **Docker** сопоставьте папку хоста с контейнером и установите **путь экспорта** на **путь на стороне контейнера** (а не на путь Unraid/хоста). Краткое напоминание см. в справке по полю в разделе «Администрирование».

### Дополнительный экспорт в PDF (Puppeteer)
**Наибольшие усилия:** после успешного запуска создания документации вы можете создать **`autodoc-admin.pdf`**, **`autodoc-user.pdf`** и **`autodoc-onboarding.pdf`** из того же HTML-кода, который хранится в `/files/` (в безголовом Chromium через **`puppeteer`**, объявленный как **необязательная** зависимость npm — та же основная строка, что и в **`@mermaid-js/mermaid-cli`**). Включите **Генерировать PDF после каждого запуска создания документации** в **Дополнительно** рядом с экспортом в файловую систему или запустите **`action.exportPdf`** вручную. PDF-файлы записываются в **`/files/autodoc.<instance>/`** и зеркалируются в **путь экспорта в файловую систему**, если этот путь указан. **Встроенный SVG-файл Mermaid** (при запуске mmdc во время генерации) печатается без дополнительного подключения к сети; клиенту **jsDelivr** Mermaid по-прежнему требуется интернет на этапе создания PDF-файла. Без работающего стека Chromium создание PDF-файла пропускается с четкой строкой в логе — генерация HTML/Markdown остается без изменений.

### Подсказки контекста ИИ (гость против жителя)
**Подсказки по контексту ИИ** вводятся только в подсказку LLM; они **не** отображаются в документации. Для **ввода гостей** предпочтительнее использовать повседневные факты. Обилие терминов, относящихся к ИТ или проектам (адаптеры, репозитории и т. д.), может привести к проникновению профессионального жаргона в текст гостя; в этом случае **мера безопасности** этот блок ИИ заменяется нейтральным текстом для гостя. Это сделано намеренно. Профиль **резидента/семьи** не использует такое же ограничение только для гостей. Настройте их в разделе **Документация KI / Документация ИИ** (после включения поставщика); полный текст отображается в подсказке над полем.

Примеры **просмотра и копирования** (идентификаторы полей, синтаксис): [**Русалка**](#mermaid-cookbook-examples) · [**JSON-массивы**](#json-cookbook-snippets) · [**Пользовательский CSS**](#html-custom-css-examples). **Стабильные URL-адреса** для закладок / Администрирования `staticLink`: **`blob/main/README.md#…`** — GitHub открывает Markdown в **предварительном просмотре** (читаемый); фрагменты соответствуют заголовкам ниже (те же имена, что и у локальных ссылок `#…`). Прокрутка до раздела осуществляется **наиболее эффективно** в средстве просмотра GitHub; URL-адреса **корневого каталога репозитория**, такие как `…/ioBroker.autodoc#json-cookbook-snippets`, остаются ненадежными. После внесения больших изменений в README **повторно проверьте слаги** на соответствие **`blob/main`**.

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#documentation-instance-overview`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#public-base-url`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#optional-pdf-export-puppeteer`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#mermaid-cookbook-examples`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#json-cookbook-snippets`

`https://github.com/crunchip77/ioBroker.autodoc/blob/main/README.md#html-custom-css-examples`

<h3 id="mermaid-cookbook-examples">Примеры кулинарных книг о русалках</h3>

Вставьте в **Моя документация → Диаграмма Mermaid** (`manualMermaidDiagram`). Используйте **простые переносы строк** внутри поля (без HTML). Предпочтительнее использовать **`flowchart LR`**, чтобы широкие диаграммы помещались на HTML-странице; очень большие графики трудно читать — при необходимости разделите концепции на отдельные диаграммы.

**Встроенный SVG:** если **`@mermaid-js/mermaid-cli`** установлен в каталоге адаптера и генерация прошла успешно, диаграммы становятся встроенным SVG в HTML (подходит для автономного просмотра / PDF). Если встраивание не удается или отсутствует CLI, экспорт сохраняет блок `<pre class="mermaid">`, и браузер может загрузить Mermaid из jsDelivr — см. **Дополнительный экспорт в PDF** и **`docs/user-guide`** («Дополнительный CLI Mermaid»).

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

- Используйте только те конструкции **поддерживаемых Mermaid**, которые вы видели работающими в других местах; экзотические директивы могут нарушить работу `mmdc`.
- **Автоматическая топология хоста** является отдельной (`autoMermaidHostGraph`); скройте её с помощью **`mermaidAuto`** в списках скрытия **Администратор/Пользователь** (см. `EXTRA_HIDDEN_CHAPTER_IDS` в `lib/docTemplateConfig.js`). **Ручная** диаграмма Mermaid находится в разделе **`manual`** в **Администраторе** — скройте этот раздел, если хотите его удалить. В **Пользователе** справка по полю содержит отдельные разделы **`mermaid`** и **`mermaidAuto`**; в **Вводе в систему** используйте **`mermaid`** для диаграммы владельца в области приветствия (см. справку на этой вкладке).

<h3 id="json-cookbook-snippets">Фрагменты JSON-кулинарных книг</h3>

Администрация хранит эти поля как **строки**; содержимое должно быть **допустимым JSON** (`"` ключи/строки, без завершающих запятых). Пустой список означает значения по умолчанию: используйте **`[]`** там, где вы не хотите изменять порядок или что-либо скрывать.

Немецкая **страница сценария** («скрыть сначала против изменить порядок», пошаговое руководство с копированием и вставкой, привязанное к шагу 6): **[`README.de.md` — Вики — Шаг 6](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** (`docs/user-guide/`).

**Разрешенные идентификаторы глав** берутся из адаптера (`lib/docTemplateConfig.js`):

| Профиль | Поля заказа | Скрытые поля | Примечания |
| --- | --- | --- | --- |
| Администратор | `adminChapterOrderJson` | `adminHiddenChaptersJson` | Порядок по умолчанию: `manual`, `system`, …, `appendices`. Дополнительный идентификатор для скрытия: **`mermaidAuto`** (топология с автоматическим хостом). **Ручная** диаграмма Mermaid является частью **`manual`** — пропустите этот раздел полностью, чтобы удалить его из экспорта администратора. |
| Ввод в должность | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | В число ключей входят `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`. |
| Адаптация | `onboardingChapterOrderJson` | `onboardingHiddenChaptersJson` | Ключевые слова: `welcome`, `quickstart`, `tips`, `guestHelp`, `stats`, `ai`, `capabilities`, `mermaid`, `rooms`, `routines`, `ownerPlaybook`, `automations`, `adapters`, `custom`, `hint`, `system`, `manual`. |

**Переупорядочить административные настройки** — разместить обзор системы непосредственно после контекста, заданного вручную:

```json
["manual", "system", "adapters", "rooms", "scripts", "schedule", "userdata", "aliases", "maintenance", "diagnosis", "troubleshooting", "custom", "changelog", "appendices"]
```

**Скрыть** Журнал изменений и приложения административной панели:

```json
["changelog", "appendices"]
```

**Глава «Скрытие пользовательских скриптов»:**

```json
["scripts"]
```

**Изменить порядок пользователя** — отобразить **`system`** после комнат (полный список ключей, в остальном идентификаторы те же, что и в порядке по умолчанию):

```json
["manual", "guestHelp", "ai", "atAGlance", "rooms", "system", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "troubleshooting"]
```

**Пользовательские главы Markdown** (`customDocSectionsJson`) — массив объектов с **`title`**, **`body`** (или **`bodyMarkdown`**), необязательным **`profiles`** (`"admin"` | `"user"` | `"onboarding"`). Опустите **`profiles`**, чтобы отображать их во **всех** профилях.

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

Максимум **12** участков; очень длинные тела обрезаются во время генерации.

<h3 id="html-custom-css-examples">Примеры пользовательского HTML CSS</h3>

В разделе **Администрирование → Экспорт HTML и дополнительные разделы**, **Стек шрифтов** (`htmlFontStack`) и **Дополнительный CSS** (`htmlExtraCss`) изменяют только **экспортируемый HTML** (а не Markdown). Рендерер оборачивает страницы в `lib/htmlRenderer.js` (`wrapPage`): ссылки в боковой панели находятся под **`nav ul li a`**, макет использует **`#layout`**, **`nav`** и **`main`** — проверьте сгенерированный HTML, если вам нужен селектор.

**Стек шрифтов:** один список CSS `font-family` (рискованные символы `< > { }` удалены). Пример вставки:

```css
"Source Serif 4", Georgia, serif
```

**Дополнительный CSS:** добавляйте короткие правила после встроенной таблицы стилей. Предпочтительнее использовать **существующие токены палитры** (`var(--link)`, `var(--nav-bg)`, `var(--border)`, `var(--surface)`, … из блоков `:root` / `body.dark`); **`htmlThemePreset`** заменяет их через классы `html.autodoc-preset-*` — отдельного токена `--accent` для `:root` нет (некоторые компоненты используют `var(--accent, #0066cc)` только в качестве **локального** запасного варианта).

Начальный фрагмент кода, который можно вставить в **Дополнительный CSS**:

```css
nav { width: 260px; }
nav ul li a:hover { opacity: 0.92; }
h2 { border-bottom-color: var(--link); }
```

## Функции (обзор)
- Обнаружение объектов на уровне экземпляров, хостов, перечислений, скриптов, псевдонимов, пользовательских данных и системной конфигурации.
- Отдельный HTML-код для каждого профиля с поиском, темным режимом и адаптивным дизайном.
- Экспорт в Markdown + JSON и история версий (настраиваемое время ротации)
- Подсказки, ориентированные на техническое обслуживание (оценка качества документации для открытых пунктов контрольного списка; отключенные экземпляры, указанные в инвентаризации, не подвергаются штрафным санкциям)
- Многоязычные строки административного интерфейса (полностью на английском, немецком и французском языках; для других языковых версий текст на английском языке будет переведен — [CONTRIBUTING](CONTRIBUTING.md#admin-ui-translations-i18n)); сгенерированный текст документации соответствует **языку документации**, включая строки сводки изменений/сравнения и необязательные уведомления об изменениях в инвентаризации при экспорте пользовательских данных.
- Необязательные поставщики услуг ИИ (например, Ollama, Groq, Anthropic) со строгим принципом добровольного участия.

Для **планирования и разработки дорожной карты**: [[`TODO.md`](TODO.md) (открытая работа вверху, полностью заполненные контрольные списки в приложении) и [`PLAN.md`](PLAN.md) (концепция, обоснование, мозговой штурм по архитектуре).

**Участие в разработке / выпуски:** см. [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Changelog

**Admin `common.news`** in `io-package.json` lists only versions **published on npm** (Adapter Checker **E2004**). The detailed sections below are the **user-facing** changelog (Git-era releases plus npm); older entries are in [`CHANGELOG_OLD.md`](CHANGELOG_OLD.md).

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

- **Chapter JSON & logs:** Each documentation run evaluates Admin/User/Onboarding chapter order and hide JSON. **English** adapter **`warn`** lines report invalid JSON shape, **unknown** chapter ids, and **duplicate** ids, with a pointer to the **[German user guide — JSON cookbook](https://github.com/crunchip77/ioBroker.autodoc/blob/main/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**. Identical warning **lines** are **deduplicated** per adapter **log** reference (process lifetime). Values read only from **legacy** native keys are labeled **`…Json via native …`** in the log. **`lib/chapterConfigWarnings.js`**; wired from **`DocumentModel.buildDocumentModel`**. **`EXTRA_HIDDEN_CHAPTER_IDS`** exported from **`docTemplateConfig`** for hide-list validation.
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

### 0.9.38 (2026-05-12)

- **Advanced — storage (historical npm note):** release **0.9.38** introduced default **`metadata`** for **new** instances so full exports prefer **`/files/`** (`common.news`). **All** installs now behave like that **without** a toggle — **`documentationStatesMode`** was dropped in **0.9.39** (always placeholders + **`/files/`**).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

<!-- Maintainer: Admin staticLinks — under chapter visibility: English README `#json-cookbook-snippets`, Wiki DE `#wiki-admin-json-cookbook`. Schnellzugriff in README.de; SCREENSHOTS table for PNG drift; Sync jsonConfig/i18n if URLs change. -->

Copyright (c) 2026 crunchip77 <41550245+crunchip77@users.noreply.github.com>