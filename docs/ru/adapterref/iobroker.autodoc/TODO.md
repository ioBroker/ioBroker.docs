---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/TODO.md
title: Адаптер AutoDoc - TODO-Liste
hash: pFPK7rZ7f+FzlKkhwwhSqlZ/gshKxaNlbFd8Aglujcs=
---
# Адаптер AutoDoc - TODO-Liste
Diese Datei ist die **Arbeitsliste**: было **оскорбление** ist steht oben; **erledigte** Meilensteine sind im **Anhang** vollständig als Referenz erhalten (nichts streichen - nur sortiert).

| Документ | Роль |
| -------- | ----- |
| **TODO.md** (здесь) | Флажок, Оффене, Анханг «Эрледигт» |
| **[PLAN.md](/#/docs/adapterref/iobroker.autodoc/PLAN.md)** | Vision, Begründungen, Architektur, Festlegungen (ua Visitenkarte, KI+Skript), Мозговой штурм, **[Produkt-Merkliste](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-produktluecken-platform)** |
| **[README.md](/#/adapters/autodoc)** | Nutzer-README + **Журнал изменений** (Уведомление о выпуске) |

## Важные ссылки
- [**Adapter-Referenzen (нейтральный)**](/#/docs/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md) - Gedächtnisstützen für regelkonformen Adapterbau (Checker, Review, Best Practices); Для **другого адаптера** необходимо использовать (Подробные сведения и специальные документы AutoDoc: [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md))
- [Портал разработчиков ioBroker](https://www.iobroker.dev)
- [Руководство разработчика ioBroker AI](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Создатель адаптеров](https://github.com/ioBroker/create-adapter)
- [Проверка адаптеров](https://adapter-check.iobroker.in/)
- [ioBroker.repositories - Лучшие практики](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) - Listen, Einreichung, Coding-Konventionen
- [REVIEW_CHECKLIST](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md) - Review-Matrix vor Listen-PR
- [type-detector](https://github.com/ioBroker/ioBroker.type-detector) - State-Rollen / Gerätetypen
- Mitwirkung: [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md)

---

## Легенда
| Символ | Значение |
| ------ | ----------- |
| ✅ | Umgesetzt (im Repo nachvollziehbar) |
| 🟡 | Teilweise / später ausbaufähig |
| ⬜ | Ночь ничто umgesetzt |
| ❓ | Konzept offen - Подробности в [ПЛАН.мд](/#/docs/adapterref/iobroker.autodoc/PLAN.md) |
| *необязательно* | Bewusster **Backlog** / Приятно иметь - нет приоритета, bei Bedarf nachziehen |

---

<a id="stand-uebersicht"></a>

## Übersicht - Umsetzung vs. Rest (Стандарт с **Version** в `package.json` / `io-package.json`: derzeit ** `0.9.48` ** на ** `main`/`dev` ** - ** `npm` последняя** версия** [npm - iobroker.autodoc](https://www.npmjs.com/package/iobroker.autodoc) prüfen; bei Releases diese Zeile + **Tabellen-Stichtag** mitziegen; Выпускает версию/`news`/Tag/GitHub с **[ВКЛАДЫВАНИЕ](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**; Tabellen-Stichtag **22 сентября 2026** - Филиал je nach Arbeitskopie, z. B. `main` / `dev`)
| Тема | Статус | Краткий |
| ----- | ------ | ---- |
| Phasen **1-4** (Основа… Редизайн профиля) | ✅ | Модульный, профиль drei, Discovery, Renderer, i18n EN/DE/FR,… |
| **Delta seit letztem Lauf** (Дополнительная панель управления администратором; Журнал изменений-Zusammenfassung в **Export-Sprache**; User Kurzinfo bei echten Inventar-Deltas) | ✅ | ** `hideAdminDeltaSinceLastRun` **, `localizeCompareSummary` / `docChangeFormat`, Пользовательский HTML+MD - ** `dev` **; ЧИТАЙТЕ |
| **0.9.x** RC-функции (псевдоним, диагностика, QR/копирование, `exportPath`, …) | ✅ | Вот README-журнал изменений |
| **KI** (Поставщик, вкладка `hidden`, Тайм-ауты, Температура, **Контекстные подсказки AI**, `guestHelpNote` / `homeRoutinesNote` / `ownerPlaybookNote`) | ✅ | Sprachqualität kleiner Modelle bleibt iterativ |
| **Пользовательские шаблоны** (главные разделы, пользовательские разделы, элементы тем) | 🟡 | [PLAN.md - Пользовательские шаблоны](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail); **0.9.17:** Admin-Reihenfolge + **Farb-Presets** (без Roh-CSS); **main:** Reihenfolge **Пользователь/регистрация** (`userChapterOrderJson`, `onboardingChapterOrderJson`); **0.9.33:** PDF; оффен: ДнД |
| **Admin-HTML Lesbarkeit** (язык Listen eingeklappt; Оценка без «Strafe» для лучшей деактивации мгновенно) | ✅ | В **0.9.17** README-Changelog (блок «Также в `dev`…») + Feature-Bullets oben drunter |
| **States entlasten** (Платцхалтер в `documentation.*`, канонич `/files`, ** `documentation.exportHashes` **) | ✅ | Ab **0.9.39:** kein `documentationStatesMode` mehr - большой вдох **immer** nur unter ** `/files/` **; ** `documentation.markdown` / `.html` / `.json` ** на Platzhalter |
| **Фаза 5** (PDF, адаптер резервного копирования, остальные пользовательские шаблоны) | 🟡 | **PDF 0.9.33** ([§ 1.2a](#phase-5-pdf-offline-mermaid)); **Резервное копирование** bewusst **zurückgestellt** (Resonanz nach **latest**-Repo - [§ 1.2](#phase-5-features)); DnD offen |
| **Фаза 5.x.1** Непадение/Устранение неполадок «Гибрид» | ✅ | Kurzzeilen, Doku-Links (0.9.18), **Автоматический контрольный список** bei Node-Befund + Disclaimer (0.9.19); **dev:** Admin-Kapitel **Betrieb - Referenz** (ehem. Fehlerbehebung) + Top-Disclaimer; **Диагностика:** Schnappschuss-Text, Node-Euristik и allgemeiner Wartungshinweis - `RENDERER_VERSION` |
| **Этап 5.x.2** Краткое руководство / Raumguides | 🟡 | Керн **0.9.20**; Гостевой дом **0.9.26**; Feinschliff Sortierung/Caps/Automations-Zähler **0.9.48** - опционально: weitere Caps/i18n - [§ 1.3 - 5.x.2](#phase-5x) |
| **Этап 5.x.2** Краткое руководство / Raumguides | 🟡 | Керн **0.9.20**; Гостевой дом **0.9.26**; Feinschliff Sortierung/Caps/Automations-Zähler **0.9.48** - опционально: weitere Caps/i18n - [§ 1.3 - 5.x.2](#phase-5x) |
| **Фаза 5.x.3** Русалка | ✅ | **0.9.27** куратьерт; **0.9.28** Автотопология; **0.9.48** версия Linux/Chromium-Hinweise + Hilfsscript |
| **Система-Посетительная карта** / Forum-Copy | ✅ | `textSendTo` **getForumCard** + Состояние `info.forumCardPlain`; Диагностика-HTML nutzt `forumCard.js` |
| **KI + Скрипт-Quellcode** | 🟡 | **A** umgesetzt (`aiAnalyzeScriptSources`); **B** резервное копирование - **gleicher Zeitpunkt** с резервным копированием ([§ 1.2](#phase-5-features)) |
| **npm + ioBroker.repositories** | 🟡 | **npm** ** `0.9.48` ** ✅ (Trusted Publishing / **E2008**, дата **0.9.48**). **последнее:** Eintrag в ** `sources-dist.json` ** fehlt (**W4001**) - PR bei Bedarf. **стабильно:** zurückgestellt (**[#54](https://github.com/crunchip77/ioBroker.autodoc/issues/54)**). Тег + релиз на GitHub: **[ВНЕСШИЙ ВКЛАД](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)** |
| **Documentations-Score** (Оценка - Контрольный список с заданными критериями) | ✅ | **0.9.30-0.9.31:** Оценка Dreiteiliger (Datenerfassung/Manuelle Inhalte/Dokumentationstiefe); instanceWithoutRoom завершено; neue Проверки: Схема, Räume m. Гератен, Эйджин Капитель, KI-Provider - [§ 1.6](#dokumentations-score-checkliste) |
| **Admin-Markdown: Diagnose-Kapitel** (Parität zu Admin-HTML) | ✅ | `renderDiagnosis` / `renderDiagnosisMarkdown` - TOC-Zeile, ausblendbar с HTML; **dev:** Kapitel-Einleitung «Schnappschuss»; **Автоматическое выполнение** (Node-Euristik) выполняется из **Allgemeine Erinnerungen** (OS-Hinweis). Подробности [§ 1.6](#admin-markdown-diagnose-optional), АньханА |
| **Admin-Konfig - Hilfen / Mini-Beispiele** (`manualMermaidDiagram`, JSON-Felder …) | 🟡 | **0.9.32** Русалка-/Состояния-/Хеши; **актуальный репо-стенд:** просматривайте Mini-Beispiele в Hilfetexten (`jsonConfig` / i18n EN/DE/FR) - [§ 1.7](#admin-config-hilfen-beispiele); опционально, больше Felder |
| **Nutzer-Handbuch / Wiki** (`docs/user-guide/`) | 🟡 | EN/DE ** `README` ** + **Wiki Schritt6** (Ausblenden/Reihenfolge); Администратор ** `staticLink` **‑Paar unter Kapitelsichtbarkeit (JSON‑Kochbuch + Wiki); PNG + **SCREENSHOTS.md** - [§ 1.1b](#nutzer-handbuch-wiki); по желанию: weitere Sprachen |
| **React Admin-UI** (statt/nur wo notig neben `jsonConfig`) | *необязательно* | Нужен jsonConfig для встроенных функций на английском языке - [§ 1.8](#admin-react-optional) |
| **React Admin-UI** (statt/nur wo nötig neben `jsonConfig`) | *необязательно* | Нужен jsonConfig для предлагаемых функций на английском языке - [§ 1.8](#admin-react-optional) |

---

<a id="offene-arbeit"></a>

## 1. Offene & nächste Arbeit (приоритет)
Reihenfolge bewusst knapp; Подробности и рекомендации: [PLAN.md - Фаза 5.x](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan). **Архитектура** (jsonl/Redis, States, Medien): festgelegt - [PLAN - Nächste Schritte](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-naechste-schritte).

### Abgestimmte Umsetzungsreihenfolge (Стенд Konzept 2026-04)
> Reihenfolge **Projekt/Features** - **npm** и **ioBroker.repositories**, а также **danach** (см. § 1.1).

| # | Тема | Вервейс |
| - | ----- | ------- |
| 1 | **Пользовательские шаблоны - Остальные (0.9.17 / `main`)** | Объяснение: `adminChapterOrderJson`, `htmlThemePreset` - сообщение: **Фаза 5** (PDF, Пользователь/адаптация, DnD) - [ПЛАН](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail), [§ 1.2](#phase-5-features) |
| 3 | **Этап 5.x.2** Краткое руководство / Raumguides | 🟡 Керн **0.9.20**; Файншлифф **0,9,48**; необязательно: [§ 1.3 - 5.x.2](#phase-5x) |
| 4 | **Фаза 5.x.3** Русалка (гестафельт) | ✅ **Стуф 1** **0.9.27**; **Stufe 2** **0.9.28** (`autoMermaidHostGraph`): [§ 1.3 - 5.x.3](#phase-5x) |
| 5 | **Этап 5:** PDF ✅ - **Резервное копирование** / **Остальные пользовательские шаблоны** (DnD) | Резервная копия **zurückgestellt** bis User-Resonanz nach Eintrag в **latest** (Repo); DnD weiter offen - [§ 1.2](#phase-5-features), [Резервное копирование/Backitup]](#backup-backitup-festlegung) |
| 6 | **npm** ✅ **0.9.48** (Провенанс). **последние** 🟡 Репо-ПР. **стабильно** ⬜ спатер | [§ 1.1](#release-veroeffentlichung), [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md) |
| 6 | **npm** ✅ **0.9.48** (Происхождение). **последняя** 🟡 Запрос на слияние репозитория. **стабильная** ⬜ позже | [§ 1.1](#release-veroeffentlichung), [CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md) |

<a id="backup-backitup-festlegung"></a>

### Резервное копирование / ioBroker.backitup - Festlegung für die spätere Umsetzung
> **Цитируемое сообщение:** keine Umsetzung kurzfristig - Приоритетное использование **Checker**, **ioBroker.repositories** (панель в **последней версии**) и обмен информацией в **последних версиях. **Größere Brocken** (Парсер, Архив, ggf. `sendTo`) сначала **wenn** sich der Nutzen bestätigt. Die folgenden Punkte bleiben **Referenz** für eine spätere Phase.

> **Noch nichtimplementiert** - Включите aus Abstimmung (Backitup-Repo, типичные Nutzer-Setups). В качестве einheitliche Referenz, PLAN/KI-B не имеет значения «ZIP».

- **Типовой архив:** [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) erzeugt u. а. ** `*.tar.gz` ** (z.B. `iobroker_…_backupiobroker.tar.gz`, `javascripts_…` - vgl. `lib/list.js` в Backitup-Repo). **Nicht nur ZIP** - AutoDoc-Parser/Doku müssen **tar.gz** abbilden, sobald Backup verarbeitet wird.
- **Цугриф (без Cloud-Zugänge в AutoDoc zu duplizieren):**
  - **Установка:** для ioBroker **lesbarer Pfad** (NAS для **SMB/NFS/Mount**, Docker-Volume) - можно использовать для Host/Backitup.
  - **Необязательно:** потерять копию для ** `sendTo` ** в своем Backitup-Instanz (`list`, `getSystemInfo` ua, siehe Backitup `main.js`) - **keine** feste API-Garantie durch Dritte, пока не будет выбрана актуальная версия Backitup-Version.
- **Создание локального режима:** необходимо выполнить **Монтирование**, **Скопировать стабильный режим** или **Триггер** непосредственно для запуска резервного копирования.
- **KI + Сценарий, вариант B:** использование KI-Pipeline с A, данные из резервного копирования - использование **Phase-5-Backup-Umsetzung** ([PLAN - KI + Skript](/#/docs/adapterref/iobroker.autodoc/PLAN.md#ki-skript-festlegung)).

<a id="release-veroeffentlichung"></a>

### 1.1 Релиз / Veröffentlichung
> **npm:** Деффентличный пакет heißt **[** `iobroker.autodoc` **](https://www.npmjs.com/package/iobroker.autodoc)** (`package.json` → ** `name` **). Хосты могут установить Tarball без Git. **Стандартный адаптер** nutzen **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)**. **последнее:** PR **#5978** началась война; ** `autodoc` указан в `sources-dist.json` ** - **W4001** активен, и программа проверки работает с адаптером как **neu** (Предупреждения → Ошибки). **стабильный:** **nicht** beantragen, solange Tester fehlen (**#54**). Теги/релизы: **[ВНОСИМ](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**.

**Остановка синхронизации** (выпуск): `package.json` ** `version` **, `io-package.json` ** `common.version` **, ** `common.news` ** (в версиях для **npm**, Checker **E2004**), README-**Changelog**-Fenster - здесь **[CONTRIBUTING.md](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md)** (**npm-Paketidentität**, ** `npm run release` **).

- [ ] [Проверка адаптера](https://adapter-check.iobroker.in/) **ohne vermeidbare Errors** - **E6034/E4052** ✅ **0.9.47**; **E2008** ✅ **0.9.48**; **W4001** бис **последняя**-Wiedereintrag. **W5042** потрясающе: **[ВКЛАД - Необязательный Puppeteer + mermaid-cli](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#optional-puppeteer-mermaid-cli)**
- [x] **npm**-Paketname ** `iobroker.autodoc` ** и документация Release-Prozess (**CONTRIBUTING.md**, [npm](https://www.npmjs.com/package/iobroker.autodoc))
- [x] Erstes und **fortlaufende** **npm** - Релизы: синхронизация версий/`news`/README-Fenster (**0.9.35** и далее; derzeit ** `0.9.48` **)
- [x] `npm publish` через GitHub ** `deploy` ** (Trusted Publishing)
- [x] **Git-Tags** для проверенных npm-версий (**v0.9.35** … **v0.9.48**)
- [x] **Релизы GitHub** с npm-Parität (**v0.9.48** inkl. Provenance - **[ВНОС - Schritt 7](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**)
- [ ] PR [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) (`sources-dist.json`) - **erneut nötig** (листинг fehlt trotz früherem Merge **#5978**). **Сначала** грюнем Чекер. **Kein** Stable-PR (**#54** zurückgestellt).

- [x] ** `dev` → `main` ** (перемотка вперед, **0.9.17**, включая пресеты, Kapitelreihenfolge, i18n-Id-Listen)
- [x] **Foren-Ankündigung** 0.9.17 (Kurztext wahlweise im Chat/Notiz, nicht im README)
- [x] README-Changelog + diese TODO-Zeilen als Quelle für Tester (Git-URL-Installation)

<a id="nutzer-handbuch-wiki"></a>

### 1.1b Nutzer-Handbuch / Wiki *(опционально - Backlog)*
> ** `docs/user-guide/` ** (`README.md` **EN**, ** `README.de.md` ** DE как **Wiki zu Admin-Tabs** + Muster-Szenario): **Wiki Schritt6** (`#wiki-admin-json-cookbook`) для **Ausblenden/Reihenfolge**‑Rezepte; **engl.** Haupt-`README.md` для **JSON/Mermaid/CSS**‑Kochbücher - **Verbund** zur Instanzkonfig über ** `staticLink` ** (например, Tab **HTML-Export**, Abschnitt Kapitelsichtbarkeit) **und** Feldhilfen; **Скриншоты**/Unterschriften siehe ** `assets/SCREENSHOTS.md` **; по желанию: weitere Sprachen.

- [x] Ablage festlegen (`docs/user-guide/` в репо) + Verweis в **README**
- [x] Используйте **Demo-/Platzhalterdaten** (указанные URL-адреса, IP-адреса, форумные карты в процессе производства) - **Schemas** `fig-*.svg` + Anleitung ** `assets/SCREENSHOTS.md` **
- [x] Добавлены **PNG-скриншоты** на вкладках конфигурации в ** `assets/` ** и отдельно в **README.md** / **README.de.md**
- [x] Снимки экрана с **AutoDoc-/Admin-Versionshinweis** в Bildunterschrift (например, **[SCREENSHOTS.md](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** и `README.md` / `README.de.md`)
- [x] Mindeststruktur: Erste Schritte (Tabs), 1-2 Szenarien (z.B. Einfamilienhaus, Gäste), Hinweis Exporte / Forum

<a id="phase-5-features"></a>

### 1.2 Этап 5 - Функции (желательные)
- [x] PDF-экспорт - **0.9.33:** необязательный ** `puppeteer` **, `pdfExportAfterGeneration`, ** `action.exportPdf` **, `/files` + `exportPath`; Merker / Randbed.: [§ 1.2a](#phase-5-pdf-offline-mermaid)
- [ ] Резервное копирование - **zurückgestellt** (kein kurzfristiger Bau); Принцип: [Backup / ioBroker.backitup](#backup-backitup-festlegung) - **tar.gz**, Pfad и/или `sendTo` Backitup; **KI + вариант сценария B** уже появился раньше
- [x] Пользовательские шаблоны - **Reihenfolge User/Onboarding** (`userChapterOrderJson`, `onboardingChapterOrderJson`) - [PLAN.md - Пользовательские шаблоны](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail)
- [ ] Пользовательские шаблоны - **Остальное**: Перетаскивание - [PLAN.md - Пользовательские шаблоны](/#/docs/adapterref/iobroker.autodoc/PLAN.md#custom-templates-detail)

<a id="phase-5-pdf-offline-mermaid"></a>

#### 1.2a Merker: PDF, Druck, Offline & Mermaid *(Фаза 5 - Festlegung; PDF-Umsetzung 0.9.33)*
> **Контекст:** Heute lädt **HTML** Mermaid **10.9.1** от **jsDelivr**, если вы используете диаграмму при экспорте - **PDF**, **Druck** и **Offline-Kopien** ohne Netz zeigen dann **kein** gerendertes Diagramm, solange nur der Quelltext bzw. Клиент-скрипт fehlt.

**Festlegung (abgestimmt mit [PLAN.md - Verbindliche Leitplanken (Schicht 2)](/#/docs/adapterref/iobroker.autodoc/PLAN.md#verbindliche-leitplanken-schicht-2--beschlossen), Таблица *Графен / Русалка*):**

- [x] **Конвейер для создания HTML-артефактов:** Mermaid-Blöcke (kuratiert + Auto-Topologie) работает **bei der Generierung servereitig в SVG** überführt und **ins HTML eingebettet** - **ohne** zwingende **externe** Mermaid-JS-Laufzeit для получения информации (vergleichbar QR: eingebettetes SVG). Дайте синд **Druck**, **PDF в формате HTML** и ** `file://`/NAS** - соответствующую строку ввода.
- [x] **PDF:** Сначала **используйте созданный HTML** (начиная с SVG-Einbettung), z. B. **Headless-Browser** `page.pdf()` (Кукловод/Драматург) или документальный **Browser-Workflow** «Пьяный → PDF». **Keine** отдельно, nur-PDF-eigene Mermaid-Render-Kette notig.
- [x] **Markdown-Export:** для **unverändert** **Mermaid-Quelltext** в Fences; дополнительный später angularichen - то же самое, что и Leitplanken beschrieben.

**Перевод:**

- [x] **SVG-рендеринг** при создании ** `@mermaid-js/mermaid-cli` ** (`lib/mermaidServerSvg.js`, optionDependency) - для `<pre class="mermaid">` в HTML-профилях; **светлый/темный** aus `htmlColorScheme` (**auto** → Default-Theme); ohne Paket bleibt **jsDelivr** - Русалка, как Бишер.
- [x] **PDF aus HTML:** ** `lib/htmlToPdf.js` ** + необязательно ** `puppeteer` ** (**^24.x**, gemeinsam mit ** `@mermaid-js/mermaid-cli` 11** - Peer-Lock, вот так **[CONTRIBUTING](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#optional-puppeteer-mermaid-cli)**), ** `pdfExportAfterGeneration` **, ** `action.exportPdf` ** - Артефакт в `/files` и необязательный `exportPath` (**0.9.33**, Best Effort) ohne Puppeteer/OS-Chromium).

**Festgehalten (Монтаж/Laufzeit - 2026-05):**

- ** `iobroker url …/tarball/main` ** (или `…/tarball/dev` для Entwicklungsbranch): Erfolgreicher Lauf **Exit 0**; ** `@mermaid-js/mermaid-cli` ** zieht **переходные Puppeteer** nach - im npm-Log ggf. **Предупреждение об устаревании** (`puppeteer`, `uuid`): **нормальное**, подключение к CLI, отсутствие собственных адаптеров-`зависимости`. Сначала вы можете выполнить **Обновление/форк** CLI или использовать PDF-Puppeteer-Linie.
- **Chromium-Download** (z.B. unter ** `…/.cache/puppeteer` **) beim ersten Install или ersten mmdc-Lauf: **erwartet**; Лучше всего, это Headless для **SVG-Einbettung** verfügbar ist.
- **Node `package.exports`:** `require.resolve('@mermaid-js/mermaid-cli/package.json')` **scheitert** при экспорте CLI - адаптер потерян ** `src/cli.js` ** для ** `node_modules` **-Pfad ab Adaptor-Root (und Elternverzeichnissen bei Hoisting), вот `resolveMmdcCliJs` в `lib/mermaidServerSvg.js`.

**Проверка вручную (для установки разработчика, с дополнительным установочным интерфейсом командной строки):**

1. **Администратор:** в разделе «Моя документация» ** `manualMermaidDiagram` ** z. B. `блок-схема LR\n A-->B` eintragen; дополнительная активация ** `autoMermaidHostGraph` **.
2. **Doku Generieren** wie gewohnt (Кнопка/триггер в адаптере).
3. **Export-HTML** (Администратор/Пользователь/Ввод в систему) открыт - **Quelltext:** bei funktionierendem mmdc ** `<div class="mermaid-wrap mermaid-svg-embedded">` ** mit eingebettetem ** `<svg` …**; das ursprüngliche ** `<pre class="mermaid">` ** für diesen Inhalt **entfällt** (bleibt nur bei leerem Block, mmdc-Fehler или wenn die CLI fehlt → jsDelivr-Fallback).
4. **Offline / `file://`:** в формате HTML-Datei **ohne Internet** öffnen - Диаграмма sollte **sichtbar** bleiben (статистика SVG), sobald es eingebettet wurde.
5. ** `htmlColorScheme`:** **темная** против **светлой**/**авто** - описание диаграмм и **mmdc-Theme** **темная** против **стандартной** prüfen.

**Linux/Контейнер: Chromium startet nicht**

- **Симптом A - обнаружение библиотеки:** «Не удалось запустить процесс браузера» и z. B. ** `libnss3.so: невозможно открыть общий объектный файл` ** - **входящий в комплект Chromium** браузер **Distro-Pakete** (отображен в виде изображений).
- **Симптом B - Docker/Unraid/LXC:** ** `Нет пригодной для использования песочницы` ** / **Песочница SUID** - ошибка ядра/пространства имен **Chrome-Standard-Sandbox** часто отсутствует.
- **Umsetzung im Adaptor** (Stand **main / dev**): mmdc wird с ** `-p` ** и **Puppeteer-JSON** дополнительно: ** `--no-sandbox` **, ** `--disable-setuid-sandbox` **, ** `--disable-dev-shm-usage` ** (`lib/mermaidServerSvg.js`, `writeMmdcPuppeteerConfigFile`). Типичный **Симптом B**; **Симптом А** weiterhin durch **ПАКЕТЫ** / apt (siehe unten).
- **Folge bei Fehler:** Diagramme bleiben ** `<pre class="mermaid">` **; **jsDelivr** в браузере с Netz; **Не в сети** без использования SVG.
- **Абхильфе Пакете (Distro):** u. а. `libnss3`, `libatk1.0-0`, `libatk-bridge2.0-0`, `libcups2`, `libdrm2`, `libgbm1`, `libasound2`, `libxkbcommon0`, `libxcomposite1`, `libxdamage1`, `libxfixes3`, `libxrandr2` - [Кукловод Linux](https://pptr.dev/troubleshooting); **buanet-Image:** Переменная Umgebungs ** `PACKAGES` **.
- **Проверка:** Doku neu Generieren - **keine** mmdc-Warnung; я HTML ** `mermaid-svg-embedded` **.

**Мультиплатформенность (Pi, Docker, LXC, VM, nativ) - kein «Zwang» zum OS-Paketbau:**

- **ioBroker** может быть использован в других целях; Адаптер **darf** не имеет значения **hart** для использования с Headless-Chromium, работающим в составе Distro-Libs.
- **Серверный SVG (mmdc)** доступен **наилучшим образом**: при использовании CLI **и** прохода OS-Stack → подключенного SVG, **Offline/PDF-файла** Pfad; wenn nicht → ** `<pre class="mermaid">` ** + **jsDelivr** bei **Онлайн-браузер** - **Kernfunktion** (Документация, просмотр браузера) bleibt.
- **Spätere Grafiken** в Freitext-/Beschreibungs-Kontexten (Фото, Планы, Скриншоты) sollten **primär** über Wege laufen, die **ohne** Puppeteer auskommen - siehe [PLAN.md - Medien / User-Assets](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) (например, **внешний URL**, **кляйн SVG** в ** `/files/` **, Größenlimits); **Русалка** создана для специальной **диаграммы отношений**. Rastergrafiken servereitig «rendert» AutoDoc **nicht** pauschal voraus; das hält **Docker/LXC/Minimal-Images** tragfähig.

**Банк данных, автономный режим без ioBroker, новая установка:**

- **DB darf nicht «mit der Doku mitwachsen»:** keine großen **User-Medien** в штатах или **virtuellen Dateischicht** с Redis - это находится в [PLAN.md - Medien / User-Assets](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp) начинается (Blob-Bloat vermeiden). Konfig bleibt schlank; **schwere** Включите файл bewusst в **echten Dateien** (`/files/…`, `exportPath`) или **extern**.
- **«Все оффлайн»** в Sinne **Notfall / ioBroker aus / Neuaufbau:** die **maßgeblichen Artefakte** sind die **mit Export Geschriebenen** Dateien (HTML, MD, ggf. später PDF) - die man auf **NAS, USB, Mail-Anhang** legt. Sie sollen **möglichst ohne laufenden ioBroker** и **ohne Internet** в вашем браузере nutzbar sein (bereits: **QR als SVG**; **Ziel:** **Mermaid als eingebettetes SVG** sobald mmdc auf dem Generator-Host klappt - sonst Lücke bis Netz oder OS-Fix).
- **Копия для новой установки:** Nutzer sichern den **Export-Ordner** (плюс резервное копирование-Strang на этапе 5). Doku dient dann als **Referenz beim Wiederaufbau**, unabhängig vom alten Laufzeit-System.

- [x] **Client-Mermaid (jsDelivr):** Nur noch **Fallback** im **HTML**-Export - Скрипт, который работает, когда ** `<pre class="mermaid">` ** vorkommt (**0.9.34**); используйте SVG, используя CDN. **Markdown** позволяет использовать Fences с Quelltext.
- [x] **PDF:** ** `autodoc-*.pdf` ** под `/files` bzw. `exportPath` - **0.9.33** (`кукловод` необязательно).
- [x] README / **common.news** / Admin-Hilfen: Chromium опционально, RAM/CPU, Offline/PDF по сравнению с jsDelivr - например, README **Необязательный экспорт в PDF** и **Дополнительно** - Felder.

<a id="phase-5x"></a>

### 1.3 Фаза 5.x - Рейхенфольге 1 → 2 → 3
#### 5.x.1 Предотвращение падений и устранение неполадок (гибридный режим)
**Bereits da (abgrenzen):** manuelle Felder **«Помощь и чрезвычайные ситуации»** / **«Рутина своими словами»** / **«Playbook»** (`guestHelpNote`, `homeRoutinesNote`, `ownerPlaybookNote`, u. a. 0.9.9 / 0.9.25) - Freitext in Onboarding/User, keine эрфундене Диагностика.

Ночью (größere Ausbaustufe als reiner Freitext):

- [x] Структурный блок **über** в новых уведомлениях: **Обзор** (WLAN/Strom/Wasser/Sonstiges) + **автоматические ссылки на документацию** (Пользователь/регистрация/администратор, логическая логика с QR - **0.9.18**)
- [x] Kurze **Auto-Checklisten** nur bei **konkreten** Diagnose-Befunden (aktuell: **Node.js** wie Admin-Diagnose) + **Momentaufnahme-Hinweis** - **0.9.19** (`lib/diagnosisSnapshot.js`)
- [x] **dev (начиная с 0.9.39):** Администратор-Экспорт **Betrieb - Referenz** (Дополнения + Отказ от ответственности); **Diagnose-Kapitel:** Einleitung «Schnappschuss», **Automatische Prüfungen** vs. **Allgemeine Erinnerungen** - Копия; `RENDERER_VERSION`-Bump bei Template-Änderung
- [x] **dev (начиная с 0.9.39):** **Delta seit letztem Lauf** - необязательный ausblendbar (`hideAdminDeltaSinceLastRun`); **Список изменений**-/Vergleichs-Einzeiler в Export-Sprache; **Пользователь** Kurzinfo bei echten Deltas (HTML+MD); Тесты `docChangeFormat.test.js`

#### 5.x.2 Краткое руководство и руководства по Raum
- [x] `documentModel`: Feste Blöcke (`docModel.quickStart` / `lib/quickStartGuide.js`)
- [x] Адаптация рендерера + Пользователь: Strukturierte Listen + Raumkacheln (HTML) / übersichtliche Abschnitte (MD)
- [x] KI nur Formulierung, nicht alleinige Struktur (unverändert: keine KI-Strukturierung)
- [x] **0.9.26:** Gäste kürzer (`sliceQuickStartForOnboarding`); Пользовательская ссылка zum Räume-Kapitel
- [x] **0.9.48:** Крышки быстрого запуска (Скрипты/Функции); Raum-Sortierung nach deduplizierter Gerätezahl; Автоматизация-Zähler ohne Gäste-Skriptnamen

**5.x.2 - опционально (kein Muss):** введите Caps/Layout pro Profil; Венигер Доппелинфос; Feintuning Sortierung/i18n - см. README **0.9.48** / `lib/quickStartGuide.js`.

**Варианты (Abschnittsreihenfolge):** **User-HTML** и **User-Markdown** nutzen DieselBen Inhalte, а также **nicht** Dieselbe Kapitelreihenfolge (z.B. Manuelles Kapitel und Hilfe im HTML oben, im Markdown-Export erst nach System/Adaptern/Räumen/Skripten) - beabsichtigt, Кейн Фелер.

**Информация (Admin-UI-Sprache):** **Обязательная информация** (внутренняя): **EN / DE / FR**. Für **es, it, nl, pl, pt, ru, uk, zh-cn** sind **alle** `jsonConfig`-Keys mit Text aus ** `en.json` **hinterlegt, bis Muttersprachler nachziehen; falsche «Übersetzungen» так vermeidbar. Комментарии: [`CONTRIBUTING.md` - Интерфейс интернационализации для административной панели](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#admin-ui-translations-i18n).

####5.x.3 Русалка / Кляйн Графен
- [x] Stufe 1: Mermaid aus **kuratiertem** Inhalt (`manualMermaidDiagram` → `manualContext.mermaidDiagram`, **0.9.27**)
- [x] Ausgabe **Markdown** (забор «русалка») + **HTML:** при установке CLI **eingebettetes SVG** («mermaid-svg-embedded»); sonst **pre.mermaid** + Mermaid **10.9.1** от jsDelivr при отображении диаграммы
- [x] Stufe 2: дополнительный kleiner **Auto-Graph** с **hartem Knotenlimit** (Multihost Host → Instanzen, **0.9.28** `autoMermaidHostGraph` / `lib/autoHostTopologyMermaid.js`)
- [ ] Nicht Ziel: Ungefilterter Gesamtgraph

<a id="nachzuege"></a>

### 1.4 Kleine Nachzüge / Триггер
- [x] **README-Changelog** + **io-package `news`:** Gäste-Onboarding **Skript-Datenschutz** (`onboardingGuestShowScriptNames`, `lib/guestScriptPrivacy.js`) и Schnellstart-Logik (**kein** Ersatz aus `common.desc`, когда имя скрипта находится внутри Gäste-Ansicht verborgen sind) + **RENDERER_VERSION** - в **0.9.21** nachgezogen.
- [x] ** `documentationStatesMode` entfallen** (**0.9.39**) - nur noch Platzhalter в большой `documentation.*`-States; Админ-Auswahl entfernt
- [x] ** `io-package` news** по умолчанию ** `documentationStatesMode` = `metadata` ** для нового мгновенного использования (**0.9.38**)
- [x] **README-Changelog** + Версия **0.9.11** um States/Hashes/Changelog-i18n ergänzt

<a id="todo-festlegt-umsetzung"></a>

### 1.5 Festgelegt - Umsetzung (Referenz)
Подробности: [ПЛАН - System-Visitenkarte](/#/docs/adapterref/iobroker.autodoc/PLAN.md#system-visitenkarte-festlegung), [ПЛАН - КИ + Скрипт](/#/docs/adapterref/iobroker.autodoc/PLAN.md#ki-skript-festlegung).

- [x] **Системная визитная карточка:** **jsonConfig** `textSendTo` `getForumCard` (+ Копировать); Состояние `info.forumCardPlain`; Gemeinsame Logik `lib/forumCard.js`
- [x] **KI + Skriptquellcode:** **Вариант A** - `aiAnalyzeScriptSources`, Zeilen-Redaktion, User/Onboarding HTML + Markdown; **Вариант B** → с [Phase-5-Backup](#phase-5-features) **zurückgestellt** ([Backup-Backitup](#backup-backitup-festlegung))

<a id="dokumentations-score-checkliste"></a>

### 1.6 Оценка документации (Wartung) - контрольный список
> **Стенд 0.9.32:** Dreiteiliger Score komplett umgesetzt; Betriebsdoku `docs/user-guide`, Admin-Hilfen & Repo-“main“-Linie siehe README / `common.news`.

- [x] **Umgesetzt (0.9.22):** Projektbeschreibung >= 40 Zeichen; Базовый URL-адрес; Instanzen ohne Raum (Швелле).
- [x] **Расширение 0.9.23:** Pro Check `maintenanceScoreCheck*`, `maintenanceScoreMinDescriptionChars`, `maintenanceScoreUnassignedWarnAt`.
- [x] **Klarstellung 0.9.24:** Kapitel-Texte Wartung vs. Diagnose; Быстрый старт сортировки; КИ-Владелец-Контекст.
- [x] **UX-Корректура 0.9.29:** `scriptsWithoutDescription` entfernt; `unassignedCount` сейчас активен; Пользовательский вид адаптера-сетки; Перерисовка Русалки в темном режиме.
- [x] **Оценка Dreiteiliger 0.9.30:** Оценка 1 = Datenerfassung; Оценка 2 = Мануэль Инхальте; Оценка 3 = Документация. Gesamtpunktzahl = Durchschnitt. HTML + Markdown, i18n, EN/DE/FR.
- [x] **Оценка 3 Переработка 0.9.31:** `instancesWithoutRoom` vollstaendig aus Score entfernt; ersetzt durch `checkHasCustomSections` и `checkAiConfigured` (bedingt). Admin-Config-Felder позволяет использовать различные эффекты.
- [x] **Не показывать** в счете: деактивация мгновенного действия (только в Inventar); `common.desc` / Skript-Beschreibungen.

#### Администрирование Markdown: Диагностика
<a id="admin-markdown-diagnose-optional"></a>

- [x] **Admin-Markdown: Diagnose-Kapitel:** `renderDiagnosisMarkdown` в `lib/markdownRenderer.js`; Используйте Admin-HTML-`renderDiagnosis` (включая ausblendbar über versteckte Kapitel / TOC wie bei anderen Admin-Kapiteln). Вервейс **АнхангА**.

<a id="admin-config-hilfen-beispiele"></a>

### 1.7 Админ-конфигурация - Hilfen / Mini-Beispiele *(teilweise)*
> **Merker:** Лучшее ориентирование в комплексе Feldern, **ohne** Demo-Inhalt в Exporten durch `native`-** `default` ** (der wäre echter Gespeicherter Text). В разделе ioBroker-Admin-Versionen используйте `jsonConfig`-/`i18n`-** `help` **-Strings **keine** zuverlässige Markdown-Fettung (`**`); Структура с **Обратными кавычками** (`\n\n`), техническими действиями с **Обратными кавычками** - также и с `scripts/sync-mermaid-help-i18n-key.js`, когда вы находитесь в длинном тексте Mermaid-Hilfetext.

- [x] **teilweise umgesetzt:** **Mermaid** (`manualMermaidDiagram`): **Placeholder** в текстовом поле (нейтральное `DEMO*`, некоторые `native`-Defaults). **JSON-Felder** (**Kapitelreihenfolge/Ausblenden/Пользовательские разделы**): **Placeholder** в пользовательском интерфейсе + Verweis в Hilfetext **„Пользовательские разделы (JSON)“** в ** `docs/user-guide/README.de.md` ** (Musterszenario); weiterhin **kein** получает ** `default` **-JSON в `io-package` `native`.
- [x] **0.9.32:** Hilfetexte **Mermaid** (Клиент против SVG-экранов / Авто против Kurzdiagramm nach Bedarf); ** `documentation.exportHashes` **; Документация **указывает** ** `полную` ** / ** `метаданные` **; **KI**: заголовок/блокировка от поставщика bzw. Скрипт-Анализ Венигер Грелль.
- [x] **Weitere Mini-Beispiele** в `jsonConfig`/`i18n` (Projektname, Beschreibung/Score, Timer, Basis-URL, States-Modus-Tipp, Adaptor-/Raum-Notizen, Benachrichtigungen, JSON **hide**-Felder, Logo-Pfad, Extra-CSS, KI-Kontext) - EN/DE/FR + Английские ключи в локальных настройках (**Repo-Stand**, nicht an eine einzelne npm-Version Gebunden).
- [x] **Порядок глав пользователя** (`userChapterOrderJson`): Обратите внимание, что ** `atAGlance` ** nur bei vorhandenem Quick-Start-Inhalt erscheint (kein leeres Kapitel durch JSON) - EN/DE/FR.
- [x] **Порядок глав при вводе** + **Base-URL-Kontext:** `quickstart` и Discovery-Block (`quickStart.hasContent`) в Hilfetexten; **Advanced**-Hinweis‑Box vor ** `baseUrl` ** (Gäste/QR/Docker/Proxy) - все локали для вызовов (EN в ES/IT/…).
- [x] **Versteckte Räume/Adapter (User & Onboarding):** Hilfen EN/DE/FR - точное администрирование, мгновенный суффикс для адаптера, «все мгновенные»-семантики.
- [x] **Дополнительно - Inhaltsfilter:** `onlyEnabledInstances`, `hideInstanceDetailsInMarkdown`, `maxDocumentedInstances` - курс, исправление (HTML vs. Markdown, Discovery-Reihenfolge, **0** = unbegrenzt) - EN/DE/FR + gleiche i18n-Keys in ЭС/ИТ/…
- [x] **Дополнительно - Admin-Delta ausblenden:** `hideAdminDeltaSinceLastRun` - gelbe Box **Systemübersicht** (Admin-HTML) и gleichlautender Unterabschnitt **Admin-Markdown** необязательно; **Änderungsprotokoll**-Kapitel und User/Onboarding **unverändert**; Хильфен, EN/DE/FR (`admin/i18n`).
- [x] **Export-Sprache / Inventar-Vergleich:** добавлен **Changelog**-Karten Zeigen die Einzeiler-Zusammenfassung in der **aktuellen Dokumentationssprache** (`localizeCompareSummary`); ** `compareVersions`-Summary** в зависимости от локализации (`main.js`). **Профиль пользователя**: kurzer Alltagssatz bei **mindestens einem** erkannten Delta (nicht Erstlauf, nicht «keine Änderung») - HTML + Markdown; **Ввод в систему** ohne diesen Block.
- [x] **Basic / Notify / Hide-Hinweise:** Документация (все профили + Markdown по сравнению с Rohdaten), Adaptor-Änderungen (30 секунд отладки), Benachrichtigungen (erfolgreicher Lauf, Messaging-Instanz), ausführlichere **User/Onboarding скрыть подсказку** - EN/DE/FR + ключи в allen Локали; `jsonConfig`-`help` не работает.

<a id="admin-react-optional"></a>

### 1.8 Admin-UI - React statt/neben `jsonConfig`? *(необязательно - Зукунфт)*
- [ ] *optional / nicht Priorisiert* **Prüfen**, получите **React-basierte** Admin-Oberfläche (собственная вкладка или Teilersetzung) **je nach Bedarf** sinnvoll wird - z. Б. используйте **jsonConfig** для встроенных функций **systematisch** на английском языке (например, **DnD** для Kapitelreihenfolge, **Live-Preview** для Mermaid, **Medien-Galerie**/Upload-UI).
- **Для этого:** используйте ** `jsonConfig.json` + `admin/i18n` ** bleiben - weniger Build-/Wartungslast, идиоматический вариант для обычного ioBroker-Adapter.
- **Nicht** als kurzfristiges Ziel: Umstellung **ohne** конкретный UI-Anforderung, die sich mit jsonConfig nicht mehr sinnvoll abbilden lässt.

---

## 2. Teilweise umgesetzt - kurz erklärt
| Берейх | Был Шон да Ист | Была «Фаза 5.х» / PLAN noch meint |
| ------- | ---------------- | ---------------------------------- |
| Непадение / Гостевой дом | wie oben + Диагностический снимок (узел) | Weitere Befund-Typen nur bei tragfähigen Daten |
| Настройка | `*HiddenChaptersJson`, `customDocSectionsJson`, `htmlThemePreset`, `adminChapterOrderJson` (Администратор), Theme-Felder, Markdown-Export | Перетаскивание; **Резервное копирование** на этапе 5 (**zurückgestellt**) |
| Доку в Штатах | `full` / `metadata`, Platzhalter, Dateizugriff, **exportHashes** | Нур **Коммуникация** (новости), когда Default wechselt |
| Доку в Штатах | `full` / `метаданные`, Platzhalter, Dateizugriff, **exportHashes** | Нур **Коммуникация** (новости), когда Default wechselt |

---

## 3. Zur Klärung (дорожная карта фестиваля)
Ausführlich: [PLAN.md - Zukunftsvision](/#/docs/adapterref/iobroker.autodoc/PLAN.md#zukunftsvision) inkl. **[Merkliste - Produkt-Lücken & Plattform-Reconnaissance](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-produktluecken-platform)** (stückweise umsetzbar). **Diskussions-Nachzeichnung** (Контрольный список продуктов, nichts vergessen für Fortführung): [PLAN - Nachzeichnung 2026-05](/#/docs/adapterref/iobroker.autodoc/PLAN.md#merkliste-nachzeichnung-2026-05). **Weitere Ausbaustufen** (Roadmap-Vorschlag js-controller/Admin/Adapter, Pakete 1-3): [PLAN - Weitere Möglichkeiten](/#/docs/adapterref/iobroker.autodoc/PLAN.md#weitere-moeglichkeiten-roadmap-2026-05). **Medien, Redis/jsonl, Штаты:** Arbeitsweise und Leitplanken sind festgelegt - [PLAN - Medien-MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp), [Architektur](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-grenzen).

---

<a id="anhang-a-erledigt"></a>

## Anhang A - Контрольный список Vollständige: Erledigt (Referenz)
Der folgende Stand ist **historisch vollständig** ( ✅). Загрузите **Git / README-Changelog**.

### Версия 0.9.47-0.9.48 ✅
- [x] **0.9.47:** Проверка репозитория (#60): Ссылка на лицензию, почта сопровождающего, узел CI 26
- [x] **0.9.48:** Администратор **Автоматизация в Überblick**; Raum/Funktion-Gerätehierarchie (`lib/roomDeviceResolver.js`); Быстрый запуск/автоматизация-Feinschliff; HTML einklappbar; Русалка/Linux-Hinweise; Происхождение npm (**E2008**)

### Dev - Delta-UX и Vergleichstexte (Export-Sprache) ✅
- [x] ** `lib/docChangeFormat.js`:** `localizeCompareSummary`, `shouldShowUserFriendlyDocChange`; использовать `buildDocChangeSinceLastRun`
- [x] ** `main.js`:** nach `compareVersions` Сводка для локального снимка/журнала изменений; `i18n.setLanguage(config.language)` для экспорта
- [x] **Admin:** gelbe **Änderungen seit letztem Lauf**-Box + Markdown-Analog - nur wenn `hideAdminDeltaSinceLastRun` больше не активен
- [x] **Admin Changelog-Kapitel:** `renderChangelogChapter` nutzt `localizeCompareSummary(entry)` für Anzeige
- [x] **User HTML/Markdown:** Указан `userDocChangeSinceLastPlain` в заголовке/TOC, если указаны дельты; Регистрация в Интернете
- [x] **Konfig / `native`:** `hideAdminDeltaSinceLastRun` (по умолчанию false); Admin-i18n EN/DE/FR; `RENDERER_VERSION`-Bump в HTML-шаблоне

### Dev (начиная с 0.9.28) - Adaptor-Ansicht, Chapter-Reihenfolge, mermaidAuto ✅
- [x] **Adapter-Details Admin-HTML:** Tabelle → zugeklappter `<details>`-Block + Responses **Karten-Grid** (автозаполнение, мин. 300 пикселей); Мгновенная информация по щелчку мыши на панели управления; JS-фильтр для карточек; `enabledShort` i18n (EN/DE/FR)
- [x] **Adapter-Details Admin-Markdown:** kompakte Übersichtstabelle (Name, Beschreibung, Badges, Aktiv/Gesamt) + Instant-Details je активный адаптер + деактивировать адаптер в `<details>`-Block; gesamter Abschnitt в `<details>` zugeklappt (alle drei Profile); `mermaidAutoTopologyMdHint` i18n statt rohem Code-Block
- [x] **Последовательность глав о пользователе/вводе в эксплуатацию:** `userChapterOrderJson` + `onboardingChapterOrderJson` (аналог `adminChapterOrderJson`); `parseUserChapterOrder` / `parseOnboardingChapterOrder` в `lib/docTemplateConfig.js`; `docModel.userChapterOrder` / `.onboardingChapterOrder`; Диспетчер HTML + Markdown; интернационализация EN/DE/FR
- [x] **mermaidAuto:** отдельный идентификатор главы для автоматического создания топологии хоста (для перехода в профиль адаптации); `mermaid` = manuell, `mermaidAuto` = auto-Topologie; `EXTRA_HIDDEN_CHAPTER_IDS`; i18n Актуальный текст сообщения
- [x] **Admin-Markdown: Diagnose-Kapitel** - `renderDiagnosisMarkdown` в `lib/markdownRenderer.js`; Учет администратора-HTML; TOC-Цайле

### Релиз 0.9.17 - Пользовательские шаблоны (Rest, Teil) ✅
- [x] **Admin**-Kapitelreihenfolge: `adminChapterOrderJson` → `documentModel.adminChapterOrder`; **HTML**-Seitenleiste + Kapitel; **Markdown** (Администратор профиля) TOC + Inhalt в gleicher Reihenfolge
- [x] **HTML**-цветные-**пресеты** без Roh-CSS: `htmlThemePreset`, `lib/htmlThemePresets.js` (CSS-переменные, Hell/Dunkel)
- [x] собственный `io-package`, `jsonConfig`, **i18n** EN/DE/FR; **Новости**; `RENDERER_VERSION` изменен

### Этап 1 - База ✅ (v0.1.0)
- [x] Модульная архитектура: `lib/discovery.js`, `lib/documentModel.js`, `lib/markdownRenderer.js`, `lib/htmlRenderer.js`, `lib/versionTracker.js`, `lib/i18n.js`
- [x] Экспорт дат: Markdown, HTML, JSON с использованием `/files/autodoc.0/`
- [x] Пользовательский интерфейс администратора: `jsonConfig.json5` + i18n EN + DE + FR
- [x] Профиль Drei: Администратор, Пользователь, Ввод в должность
- [x] Адаптер-Beschreibungen aus ioBroker-Metadatan
- [x] Версии с различиями и журналом изменений
- [x] Автоматическое создание: запуск, таймер, база событий (отказ в течение 30 секунд)
- [x] HTML-рендерер с боковой панелью, статистическими карточками, картами-адаптерами и профилем

### Фаза 2 - Содержание ✅
- [x] 2.1 `enum.rooms` + `enum.functions` auslesen und als Kapitel rendern
- [x] 2.2 Скрипт для `script.js.*`: имя, статус, описание, тип триггера
- [x] 2.3 Wartungs-Score/Checkliste (nur echte Warnungen; deaktivierte Instanzen = Inventar), Диагностика; Admin-HTML: lange Tabellen-Abschnitte необязательный eingeklappt
- [x] 2.4 Функция поиска/фильтрации в HTML (Nav-Suchbox, Escape-Reset)

### Фаза 3 - Глубоко ✅
- [x] 3.1 Уведомления: `sendTo` для создания (Telegram, электронная почта, Pushover, общий)
- [x] 3.2 Анализ зависимостей: `lib/dependencyAnalyzer.js`, stateRefs + Перекрестные ссылки
- [x] 3.3 Документы AI-Enhanced: `lib/aiEnhancer.js`, подключаемые поставщики (Anthropic/Groq/Ollama), подписка, профиль администратора wird übersprungen
- [x] 3.x i18n-Fix: все жесткие английские строки изменены (EN/DE/FR vollständig)
- [x] Метаданные адаптера 3.x: `connectionType`, `dataSource`, `tier` из ioBroker-Metadatan; gefilterter `native`-Config в профиле администратора (автоматический ввод чувствительных ключей)
- [x] 3.x Strukturierter `manualContext`: `adapters{}` + `rooms{}` - для каждого адаптера/Raum-Notizen, в полном профиле Profilen angezeigt

### Этап 4 - Переработка профиля ✅
#### 4.1 Discovery-Erweiterungen ✅
- [x] `system.config` добавлен: Stadt, Land, Systemsprache → `rawData.systemConfig`
- [x] Geräte-Namen-Auflösung: Raum-Mitglieder → Device-Objekte через `getForeignObjectAsync`
- [x] Опциональные Live-состояния: Schlüssel-Rollen (`level.temperature`, `sensor.door`, `sensor.window`, `alarm`), просмотреть
- [x] Новая опция конфигурации `readLiveStates` в `jsonConfig.json5` + интернационализация

#### 4.2 Составление карты ролей ✅
- [x] `lib/roleMapper.js` - 29 шаблонов → 14 категорий + иконки
- [x] i18n-Клавиши для ярлыков категорий (EN/DE/FR)

#### 4.3 DocumentModel-Erweiterungen ✅
- [x] `buildSystemConfig(rawData)` → `docModel.systemConfig`
- [x] `buildRooms()`: `rooms[].devices[]` mit `{ id, deviceName, category, icon, currentValue, unit }`

#### 4.4 Рендерер-Архитектура: Диспетчер ✅
- [x] `renderHtml()` в качестве диспетчера → `renderAdminHtml()` / `renderUserHtml()` / `renderOnboardingHtml()`

#### 4.5 Онбординг-профиль ✅
- [x] Stadt-bewusster Willkommenstext, Räume mit Device-Grid + Icons + Live-Values
- [x] «Было ли läuft autotisch?» как простые предложения, карты-адаптеры (фрейндлих)
- [x] Виден AI-Box, подсказка при наличии руководстваКонтекст

#### 4.6 Профиль пользователя/семьи ✅
- [x] Räume mit Device-Cards, только имя скрипта+описание, только название адаптера

#### 4.7 Профиль администратора ✅
- [x] Таблица иерархии устройств для определения OID

#### 4.x Исправления ошибок и настройки пользовательского интерфейса ✅
- [x] `room.members` → `room.devices` (DocumentModel ↔ Renderer Alignment)
- [x] Введение: Адаптер-Abschnitt fehlte (renderAdaptersChapter nicht aufgerufen)
- [x] markdownRenderer: ошибка gleicher room.devices → UNCAUGHT_EXCEPTION в профиле администратора
- [x] Значки адаптера: «нет»/«предположение», уровень с Qualitätsbezeichnung
- [x] «Instanzen ohne Raumzuweisung» entfernt (konzeptionell falsch)
- [x] Hosts-Tabelle: откройте адаптерCount-Spalte entfernt
- [x] Диагностический раздел neu aufgebaut: Erfassungsstatus, Wo nachschauen (живой/подключенный), Befunde

#### 4.x UI-Verbesserungen Сессия 2 ✅
- [x] Таблица адаптера: деактивация мгновенного eingeklappt (`<details>`), локальный фильтр-вход с подробным текстом
- [x] Версия Node.js из `host.native` (через `getForeignObjectAsync`) + значок зеленый/красный (LTS ≥ v20)
- [x] Информация об ОС (ядро, архитектура) в системной главе и таблице хостов
- [x] Node.js-Warnung + OS-Update-Hinweis в Diagnose-Befunde
- [x] Script-Ordner-Labels: `null` → Root-Verzeichnis, `common` → Allgemeine Skripte, `global` → Globale Skripte

#### 4.x Отказ
- [x] i18n: все новые клавиши (EN/DE/FR)
- [x] Lint sauber (0 ошибок)
- [x] README.md (вкл. журнал изменений) + TODO.md + PLAN.md актуализированный (Abschluss RC 0.9.x)
- [x] `dev` → Объединить с `main` (RC-Stand für Forum; weiteres Testing + Adaptor-Checker для npm)

#### 4.y Release-Kandidat (0.9.x) - umgesetzt
- [x] Псевдоним (`alias.0.*`), собственная переменная с фильтром; Репозиторий в Диагностике; RAM-сумма адаптер
- [x] Мануэль Хинвейзе Обен (Администратор/Пользователь); Оценка Doku-Score; visuelle Akzente (Золото/Оранжевый/Синий)
- [x] Регистрация: возможности, подсказки для входа в систему, ⏱ в Cron-Skripten, QR + Copy
- [x] `RENDERER_VERSION` / `info.templateVersion` для обновлений шаблонов без версий-хаоса

#### Пользовательский интерфейс администратора: Bedingte Sichtbarkeit im KI-Tab (обратная связь на форуме) ✅
> Umgesetzt mit `jsonConfig`-Eigenschaft ** `hidden` **. Смесь Anbieter «Deaktiviert» KI-Felder aus.

- [x] Anbieter = `none` / deaktiviert → KI-Felder ausgeblendet
- [x] Anbieter = `ollama` → API-Schlüssel ausgeblendet, Basis-URL sichtbar
- [x] Anbieter = `anthropic` / `groq` / `mistral` → API-Schlüssel sichtbar, Basis-URL je nach Feld
- [x] Температура + Тайм-аут, когда панель активна

### КИ - Zusammenfassung & Backlog ✅
- [x] Необязательно **Температура** пользователя и адаптация (`jsonConfig`); leer = Anbieter-Default
- [x] **HTTP-Timeout** pro Request konfigurierbar
- [x] **Контекстные подсказки Bewohner-Stichpunkte / AI** (nur LLM-Prompt)

<a id="multihost-done"></a>

### Multihost-Unterstützung ✅
> Задний фон: [PLAN.md - Многохостовый](/#/docs/adapterref/iobroker.autodoc/PLAN.md#multihost-plan)

- [x] Администратор: Хост-Распределение (нужно > 1 Хост); Неверный вариант с одним хостом
- [x] Предупреждение, если AutoDoc не будет доступен на первом хосте
- [x] Необязательный `exportPath`, HTML-профиль, не указан
- [x] QR: servereitig `qrcode`, kein CDN

### Architektur - Штаты entlasten ✅ (Umsetzung)
**Проблема/Цель** отображается: большой канонический вдох под ** `/files/` **; Состояния не могут быть отключены от мегабайтных строк - siehe [PLAN.md - Doppelte Ablage](/#/docs/adapterref/iobroker.autodoc/PLAN.md#doppelte-ablage-states).

- [x] ** `documentationStatesMode` **: bis **0.9.38** `full` \| `метаданные` (по умолчанию ** `метаданные` ** neu); ab **0.9.39** entfernt - immer ** `/files/` ** + Platzhalter-States
- [x] ** `persistDocumentation` **: добавление метаданных в `documentation.markdown` / `.html` / `.json`; `documentation.stateSummary` unverändert
- [x] Действия по загрузке: Quelle `autodoc-latest.*` / `autodoc-admin.html`, Fallback Legacy-State
- [x] ** `documentation.exportHashes` **: SHA-256 (шестнадцатеричный) из последнего экспорта (**MD / JSON / Admin-HTML**); bei PDF-Lauf auch ** `autodoc-*.pdf` ** - bei Modi (**0.9.34** ergänzt PDF-Fingerabdrücke)
- [x] README-Kurztext zu Modus + Hashes

---

## Anhang B - Процесс выпуска (подробно)
> Oberste Priorität: **Abschnitt 1.1** oben. Diese Zeilen sind die gleiche Liste, kompakt.

- [ ] Средство проверки адаптера для получения дополнительной информации (**E2000** o.Ä. nicht dauerhaft; документированная документация **Предупреждения** - **CONTRIBUTING.md**)
- [x] npm-Paket ** `iobroker.autodoc` ** и сопровождающий-Abgleich (например, **CONTRIBUTING.md**)
- [x] Версия + `news` bei jedem Синхронизация выпуска; Дерзейт **0.9.48**
- [x] `npm publish` через CI Trusted Publishing (**E2008** ab **0.9.48**)
- [x] Git-теги **v0.9.35** … **v0.9.48**
- [x] **Релизы GitHub** - **[ВНЕСЕНИЕ УЧАСТИЯ - Шаг 7](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)**
- [ ] **latest**-Eintrag в ** `sources-dist.json` ** wiederherstellen (**W4001**)
- [ ] **стабильный** - **zurückgestellt** с использованием тестера (**#54**)

Bereits erledigt:

- [x] README, вкл. **Журнал изменений** (отправление `CHANGELOG.md` - eine Quelle)
- [x] `dev` → `main` (RC-Forum-Stand)

---

## Bewusst weggelassen
- ❌ Ungefilterte «Komplett-Graphen» (Skript-/State ohne Knotenlimit) - игровой процесс Русалка: Фаза 5.x
- ❌ Дополнительный анализ кода для Abhängigkeiten
- ❌ REST-API / Веб-хуки
- ❌ Интеграция с Alexa/Google Home
- ❌ Аналитика/Популярность адаптера
- ❌ Мобильное приложение
- ❌ Функции для совместной работы