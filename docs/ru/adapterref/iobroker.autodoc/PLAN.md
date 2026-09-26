---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/PLAN.md
title: Адаптер AutoDoc - Проектплан
hash: 9L0p+m+kf8fWkqaOS0LwVAGSKH32vgzG5ucqmnZKIQw=
---
# Адаптер AutoDoc - Projectplan
## Зрение
AutoDoc - это ioBroker-Adapter, предназначенный для автоматической установки простой, структурированной и новой документации. Der Mehrwert Liegt Darin, dass man endlich einen aktuellen Überblick über ein часто sehr complexes System bekommt, ohne alles manuell pflegen zu müssen - auch nach Monaten noch erklärbar, für sich selbst, für Familie, Mitbewohner order bei Миграция.

Drei echte Zielgruppen mit komplett unterschiedlicher Sprache:

- **Администратор**: «Warum macht das System X, когда Y пассивен?» - volle technische Tiefe
- **Пользователь/Семья**: «Какая функция работает в Zuhause?» - verständlich, ключевой JSON
- **Onboarding/Gäste**: «Wie benutze ich dieses Haus?» - null Technik, королева Alltagssprache

Langfristige inhaltliche Richtung (Zusammenhänge, Auto vs. Pflege, обратная связь на форуме): siehe Abschnitt **„Zukunftsvision - Zusammenhänge & Kontext (Мозговой штурм)“** weiter unten.

## Rollen der Dokumente
| Файл | Цвек |
| ----- | ----- |
| **[TODO.md](/#/docs/adapterref/iobroker.autodoc/TODO.md)** | **Offene** Punkte und **Klärungen** oben; **erledigte** Meilensteine im **Anhang** (проверочный список - nichts verloren) |
| **[README.md](/#/adapters/autodoc)** | Nutzer-Dokumentation und **Changelog** (Уведомление о выпуске) |
| **[README.md](/#/adapters/autodoc)** | Nutzer-Dokumentation und **Changelog** (Уведомление о выпуске) |

### Überblick - было umgesetzt ist vs. было noch offen ist
| Берейх | Курц |
| ------- | ---- |
| Phasen 1-4, 0.9.x RC, Multihost, KI-Basis, Custom-Template-**Teile**, ** `documentation.exportHashes` **, большой ** `documentation.*` в версии 0.9.39**, Загрузки из `/files` | ✅ siehe [TODO.md - Übersichtstabelle](/#/docs/adapterref/iobroker.autodoc/TODO.md#stand-uebersicht) |
| Фаза **5.x.2** Быстрый старт / Raumguides | 🟡 Керн **0.9.20**; Feinschliff **0.9.48** - необязательно: [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| Фаза **5.x.2** Быстрый старт / Raumguides | 🟡 Керн **0.9.20**; Feinschliff **0.9.48** - необязательно: [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **Inventar-Delta / Export-Sprache** | ✅ ab **0.9.39** - `hideAdminDeltaSinceLastRun`, `docChangeFormat` |
| Фаза **5.x.3** Русалка | ✅ **0.9.27-0.9.28**; Linux-Hinweise **0.9.48** - [TODO § 5.x.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **npm-Release** + **ioBroker.repositories** | 🟡 **npm** ** `0.9.48` ** ✅ (Провенанс); **последний**-Eintrag fehlt (**W4001**) - [TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung) |
| Фаза **5.x.1** «Устранение неполадок гибридной системы» | ✅ **MVP в 0.9.18/0.9.19:** Freitext (`guestHelpNote` u.a.), **Kurzzeilen** + Doku-Links (URL-закладки), **Node.js**-Checkliste + Snapshot-Hinweis (`lib/diagnosisSnapshot.js`) - [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x); **dev:** Администратор **Betrieb - Referenz** + Diagnose-Copy (Schnappschuss / enge Checks) - необязательно, чтобы добавить Befund-Typen |
| **Архитектура:** Redis/jsonl, States, Medien/Grafiken ([Leitplanken](#architektur-grenzen), [Medien-MVP](#architektur-medien-mvp), [Nächste Schritte](#architektur-naechste-schritte)) | ✅ фестиваль | Umsetzung = README + Фаза 5/5.x |
| **Системная визитная карточка** «Форум копий» | ✅ [Festlegung](#system-visitenkarte-festlegung) | ✅ **jsonConfig** `getForumCard`, Состояние `info.forumCardPlain`, `lib/forumCard.js` + Диагностика-HTML |
| **КИ + Код сценария** | ✅ [Festlegung](#ki-script-festlegung) | **A** ✅ (`aiAnalyzeScriptSources`); **B** ⬜ wie Backup **zurückgestellt** ([TODO Phase 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) |
| **КИ + Код сценария** | ✅ [Festlegung](#ki-script-festlegung) | **A** ✅ (`aiAnalyzeScriptSources`); **B** ⬜ wie Backup **zurückgestellt** ([TODO Phase 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) |

Подробно установите **Флажок**: погрузить **[TODO.md](/#/docs/adapterref/iobroker.autodoc/TODO.md)** на экран; dieser PLAN **Warum** и **Kontext**.

## Технические основы
- **Обсуждение**: JavaScript (стандарт ioBroker Creator)
- **Административный интерфейс**: JSON/jsonConfig
- **Фреймворк**: @iobroker/create-adapter v3.1.2
- **Node.js**: Mindest **22** (`package.json` → `engines` **>= 22**; CI часто **Node 24**)
- **Репозиторий**: [crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc)

## Entwicklungs-Umgebung
- **IDE**: код Visual Studio для Windows.
- **Тестовая система**: ioBroker на Unraid-Server (отдельно от Produktivsystem)
- **Развертывание**: ежедневная работа в ** `dev` ** → отправка изменений → Тестовая установка через административную панель ioBroker (**пользовательский URL**): `https://github.com/crunchip77/ioBroker.autodoc/tarball/dev`; стабильная строка по умолчанию следует за ** `main` **: `…/tarball/main`.
- **Стратегия выпуска**: `dev` testen → Объединить `main` для Forum-/RC-Tester; **npm + репозитории**, сначала с помощью Adaptor-Checker и PR durch sind (номер версии и соответствующий код - **nicht** с RC **0.9.x** verwechseln)

## Адаптер sinnvoll nutzen (Betreiber - empfohlene Reihenfolge)
1. **Grundeinstellungen:** Projectname, Sprache, sinnvolle **Generierungs-Auslöser** (Начало / Интервал / Адаптер-Änderungen nach Bedarf).
2. **Управление → ioBroker-Basis-URL:** Для **QR**, **Ссылки** и **Указания** URL-адресов, **Внедрения в браузере** без изменений (часто ≠ Docker-Interna или внутренние IP-адреса - просто укажите их непосредственно у администратора).
3. **Документация в Штатах:** Entfällt ab **0.9.39** - **Volltext** nur unter ** `/files/` **; Указывает ** `documentation.markdown` / `.html` / `.json` ** sind **immer** kurze Platzhalter ([README - Экспорт и хранилище](/#/adapters/autodoc), `io-package` **0.9.39** `news`).
4. **Моя документация:** Freitexte (Notfall, Routinen, необязательно Русалка); **HTML-экспорт и Zusatzkapitel:** Тема, sichtbare Kapitel, Reihenfolge - ** `atAGlance` ** / Ввод в эксплуатацию ** `quickstart` **: Hilfetexte Beachten (Пользователь против Gast-Kapitel).
5. **Необязательно:** ** `exportPath` ** для NAS/USB-копии; **KI** и **PDF** являются активными (Ressourcen/Datenschutz); ** `docs/user-guide/` ** (Конфигурации-Вики/Скриншоты).

- `main` = стабилизатор Стенд нач Merge aus `dev` (**0.9.x** Release-Kandidat/Forum); **npm**-Paket ** `iobroker.autodoc` ** wird von hier veröffentlicht (Версия/новости в разделе **ВНОС**)
- `dev` = активный Entwicklung; Коммит immer auf `dev`
- Kein direkter Feature-Push auf `main` ohne vorherigen `dev`-Stand; Объединяет `dev` → `main` для проверки RC-шнитте

## Процесс выпуска (echter ioBroker-Release)
**npm** `iobroker.autodoc`: **Версия в репозитории** здесь `package.json` / `io-package.json` (актуально ** `0.9.48` **). **Pre-Release-Suffix** zwischen Публикует сейчас в **[ВКЛАД - Abschnitt Maintenanceer-Versionierung («Между публикациями»)](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#npm-package-identity-for-maintainers)** (Checker **E1036** vs **E2004**); для ** `npmPublish` ** ** `news` ** для **auf npm** новых версий. ** `npm view iobroker.autodoc version` ** gegen Repo abgleichen. **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (**последний**): Eintrag для **PR** с сопровождающим - **Стандартный список адаптеров** в администраторе **nach Merge**; Для установки используйте **npm** или **Git**/URL. URL-установка ** `main`/`dev` ** может быть полезна для тестера.

**Reihenfolge (vollständig und nichts vergessen):** **[CONTRIBUTING.md - Контрольный список сопровождающего - порядок выпуска](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)** (**Тесты → push `main` → `npm publish` → `git tag`/`push` → GitHub Release → `dev` sync**). Kurzfassung älterer Schritte bleibt hilfreich:

1. `package.json` + `io-package.json` (** `version` **, ** `common.news` **) + README/lockfile konsistent (**E2004**)
2. `dev` → ** `main` ** при стабилизации
3. ** `npm run Release` ** и/или ** `npmPublish` ** → Пакет на npmjs.com
4. ** `git tag -a vx.y.z` ** + ** `git push origin vx.y.z` ** + ** `gh Release create` ** (или GitHub-UI) - nicht weglassen
5. ** `ioBroker.repositories` ** в актуальном состоянии (** `sources-dist.json` **)
6. [Проверка адаптера](https://adapter-check.iobroker.in/) - **W4001** раньше **nach Merge** des Listeneintrags ohne die Warnung zu erwarten

## Важные ссылки
- [Руководство разработчика ioBroker AI](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Создатель адаптеров](https://github.com/ioBroker/create-adapter)
- [Проверка адаптеров](https://adapter-check.iobroker.in/)

---

## Фаза 1 - Основа ✅ ABGESCHLOSSEN (v0.1.0)
> Vollständige, zeilenweise Контрольный список всех этапов: [TODO.md - Анханг А](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).

- Модульная архитектура: `lib/discovery.js`, `lib/documentModel.js`, `lib/markdownRenderer.js`, `lib/htmlRenderer.js`, `lib/versionTracker.js`, `lib/i18n.js`
- Экспорт дат: Markdown, HTML, JSON в `/files/autodoc.0/`
- Пользовательский интерфейс администратора: jsonConfig.json5 + i18n (EN, DE, FR)
- Drei Zielgruppenпрофиль: администратор, пользователь, адаптация
- Адаптер-Beschreibungen aus ioBroker-Metadaten (`common.desc`, `common.titleLang`)
- Версии версий с различиями и журналом изменений
- Автоматическое создание: запуск, таймер, база событий (отказ в течение 30 секунд)
- HTML-рендерер с боковой панелью-навигацией, статистическими карточками, макетом профиля-bewusstem

---

## Фаза 2 - Вдох ✅ ABGESCHLOSSEN
Der Sprung von «Adapter-Inventar» или «System-Documentation».

### 2.1 Сохранение и защита ✅
- добавлены `enum.rooms` и `enum.functions`
- Räume-Kapitel в HTML + Markdown

### 2.2 Скрипт-документация ✅
- Все сценарии с использованием `script.js.*` с именем, статусом, описанием и типом триггера.

### 2.3 Бородавки и диагностика ✅
- Администратор: Диагностика-Abschnitt (Сканирование, Befunde, Forum-Visitenkarte); Контрольный список с **Documentations-Score** для **оффовых предупреждений** (деактивация Adaptor-Instanzen sind **Inventar**, kein Score-Abzug - bewusst deaktivierte Instanzen sind üblich)
- Язык администрирования-HTML-блокировка (скрипт-порядок, государственный справочник, общие состояния, пользовательские данные, псевдоним) стандартный **eingeklappt** (`<подробности>`), um die Seite lesbar zu halten

### 2.4 Такие функции/функции фильтра в HTML ✅
- Clientseitiges JS, основной сервер, фильтрация таблиц + карты
- suchbox im Nav-Sidebar, Ergebnis-Zähler, Escape-Reset

---

## Фаза 3 - Тифе ✅ ABGESCHLOSSEN
### 3.1 Уведомления ✅
- `sendTo` для создания: Telegram, электронной почты, Pushover, Signal, WhatsApp и других.
- Панель конфигурации: Instanz, Empfänger, дополнительные Nachrichten-Template.

### 3.2 Анализ зависимостей ✅
- `lib/dependentAnalyzer.js`: Regex-Extraction из State-Referenzen с помощью Script-Quellcode
- `stateRefs` pro Script + Cross-Reference-Tabelle (Shared States)
- HTML: Подробный вывод "Ссылки на состояния" + "Общие состояния" (только для администратора)

### 3.3 Документация с использованием ИИ ✅
- `lib/aiEnhancer.js`: подключаемая архитектура Provider-Architektur, подписка
- Поставщик: «антропный» (Claude Haiku/Sonnet, платный), «groq» (Llama 3.3 70B, уровень бесплатного пользования), «ollama» (локальный, kein Datenschutzproblem)
- Groq + Ollama nutzen OpenAI-совместимый API - минимальные накладные расходы
- Профиль администратора автоматически активируется (все данные должны быть проверены)
- Повествование Zusammenfassung + Maintenance-Empfehlungen (для пользователя/регистрации)
- HTML: Hervorgehobene AI-Box; Уценка: блок-цитата
- Фелер → Stille Warnung, Doku wird trotzdem Generiert

### 3.x i18n-Vollständigkeit ✅
- Все жестко запрограммированные английские строки в htmlRenderer.js для i18n-Schlüssel ersetzt
- EN, DE, FR vollständig

### 3.x Адаптер-Метаданные и ручной контекст ✅
- `discovery.js`: liest `connectionType`, `dataSource`, `tier` aus `common.*` je Instanz
- `discovery.js`: `filterNative()` содержит чувствительные значения (пароль/токен/ключ/секрет/...) для каждого регулярного выражения, от имени страницы ввода → настройки Admin-Detail
- `documentModel.js`: `parseManualContext()` нормальный ручнойконтекст (JSON-строка или объект), gibt immer `{description, contact, Notes, Adaptors:{},rooms:{}}` zurück
- `htmlRenderer.js`: Значки администратора-таблицы (🔌/☁️ ConnectionType, Push/Poll dataSource, Tier); manualContext-Notiz pro Адаптер в Allen Profilen

---

## Этап 4 - Редизайн профиля ✅ ABGESCHLOSSEN
Echte Zielgruppen-Dokus statt «mehr oder weniger Detail vom selben Template».

### Архитектура-Entscheidungen
- **Dispatcher-Muster** в `htmlRenderer.js`: `renderHtml()` → `renderAdminHtml()` / `renderUserHtml()` / `renderOnboardingHtml()`
- Bestehende Kapitel-Methoden bleiben für Admin/User nutzbar
- Вводный сотрудник Эйджина Методена в техническом отделе

### Проблемы и проблемы
- **Дополнительно**: уникальные идентификаторы устройств, например `getForeignObjectsAsync` statt N Einzelaufrufe
- **Вращение-несогласованность**: `lib/roleMapper.js` нормализуется для всех адаптеров-перекатов в категориях + значки.
- **Live-States**: включение (`config.readLiveStates`), дополнительные функции Rollen (термостат, Tür/Fenster, сигнализация), отказоустойчивость
- **Dünner Onboarding-Inhalt**: Обратите внимание на `manualContext` + kein AI → Nutzer zur Konfiguration auffordern
- ** `system.config` **: Изящный запасной вариант, когда Stadt/Land nicht gepflegt

### 4.1 Discovery-Erweiterungen
- `system.config` добавлен (Stadt, Land, Systemsprache)
- Geräte-Namen-Auflösung: Raum-Mitglieder → Device-Objectte → `common.name`
- Geräte nach Device gruppieren (nicht jede State einzeln)
- Live-States für Schlüssel-Rollen (по подписке)

### 4.2 `lib/roleMapper.js`
- ioBroker-Rollen → Категории + Иконки + Ярлыки (EN/DE/FR)
- Подсветка: Свет, Диммер, Ролллад, Термостат, Feuchtigkeit, Bewegung, Tür/Fenster, Medien, Schloss, Alarm, Steckdose, Kamera

### 4.3 Обработка модели документа
- `docModel.systemConfig`: Stadt, Land, Sprache
- `docModel.rooms.rooms[].devices[]`: выберите имя, категорию, значок, ggf. текущее значение + единица измерения
- Abwärtskompatibel: nur neue Felder hinzu

### 4.4 Renderer-Architektur: Диспетчер
- `renderHtml()` как Dispatcher
- `renderAdminHtml()` = актуальный рендеринг (leicht bereinigt)
- `renderUserHtml()` = новый пользовательский метод
- `renderOnboardingHtml()` = полное завершение

### 4.5 Профиль адаптации: шаблон Neues
- Sprache: «Ду», kurze Sätze, kein Passiv, kein Fachjargon
- Включение: Willkommenstext, Räume mit Geräte-Namen, «Was läuft autotisch?», manualContext, AI-Summary.
- Kein: Adaptor-Inventar, OID, State-Counts, Trigger-Typen.
- Текущие значения при активации: Термостат-Температура, Tür/Fenster-Status

### 4.6 Профиль пользователя/семьи: Überarbeitung
- Räume mit aufgelösten Gerätenamen + Funktion
- Скрипт: nur Name + Beschreibung, kein Trigger-Typ
- Wartungshinweise в Alltagssprache (keine OID)
-Адаптер: любое название, определенная версия/идентификатор.

### 4.7 Профиль администратора: Ergänzungen
- Иерархия устройств в Räumen (с OIDs für Vollständigkeit)
- Rest bleibt wie bisher

---

## Этап 5 - Erweiterungen (приятно иметь)
> **Offene Arbeit** (флажок): [TODO.md - § 1](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). **Abgestimmte Reihenfolge** (Пользовательское → 5.x → Фаза 5 → npm): [TODO.md - Umsetzungsreihenfolge](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit).

- Экспорт в PDF
- **Backup-Anbindung** (kein vollständiges «zweites Backitup» im Adaptor): типичный архив ** `.tar.gz` **, последний Pfad und/oder Kopplung an [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) - Подробности [TODO.md - Резервное копирование / Резервное копирование](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)
- Пользовательские шаблоны (Teile bereits umgesetzt - siehe unten «Пользовательские шаблоны» и [TODO.md - Übersicht](/#/docs/adapterref/iobroker.autodoc/TODO.md#stand-uebersicht))

**Применение (например, идея для фазы 5):** QR-код и текстовая ссылка для профиля адаптации - **serveritig** для eingebettetes SVG (npm-Paket `qrcode`), **ohne CDN** и ohne zusätzliches Client-Skript for die QR-Erzeugung. «Ссылка для копирования» может быть отключена `/files/…`-URL с QR-кодом (Voraussetzung: sinnvoll gesetzte **базовый URL-адрес ioBroker** в адаптере-Einstellungen; см. README).

<a id="phase-5x-plan"></a>

### Этап 5.x - Ввод в эксплуатацию / Устранение неполадок / Mermaid (gestaffelt)
> Abgestimmt für die nächste Ausbaustufe. Флажок: [TODO.md - § 1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x). **Приоритет:** 1 → 2 → 3.

**1. Notfall & Troubleshooting für Laien (Hybrid)** **Возможные действия (Abgrenzung):** Manuelle Felder z. B. **Помощь и экстренные ситуации** / **Процедуры** / **Пособие** (`guestHelpNote`, `homeRoutinesNote`, `ownerPlaybookNote`, u. a. ab 0.9.9 / 0.9.25) - Freitext, kein erfundenes Auto-„Notfallwissen“.

**Umgesetzt (нагноившийся MVP laut [TODO - 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x)):**

- **0.9.18:** **Обращение** (WLAN, Strom, Wasser, Sonstiges) + **Lesezeichen-Links** zu Generiertem **User-**, **Onboarding-** и **Admin**-HTML (gleiche Ziele wie wie QR / `info.htmlUrl*`, sinnvoll nur mit gsetzter **ioBroker base URL**).
- **0.9.19:** В **Пользователь/Ввод в эксплуатацию** - экспортируйте список **Автоматических контрольных списков** и **конкретный** Befund (значение: **Node.js** - Regel wie в **Администратор → Диагностика**) плюс **Помощь в моменте**; Gemeinsame Логика: `lib/diagnosisSnapshot.js` - kein doppelter Diagnose-Block im **Admin**-HTML (dort vollwertiges Diagnose-Kapitel).
- **dev (Renderer-Copy, nicht zwingend eigene semver):** Admin-HTML: Kapitel **Betrieb - Referenz** (с заявлением об отказе от ответственности «Fehlerbehebung»-Konnotation); **Диагностика:** Einleitung **Schnappschuss** (kein Voll-Audit), **Automatische Prüfungen** (Node-Euristik) getrennt von **Allgemeine Erinnerungen** (OS-Tipp); `RENDERER_VERSION` в `lib/htmlRenderer.js` в соответствующем шаблоне.

**Später ausbaufähig (nicht blockierend):** weitere Diagnose-Signal-Typen in Dieselbe **„nur bei Befund“**-Logik, падает Daten tragfähig; Кейне Пфлихт, а затем гибрид «KI-Notfallwissen» zu erweitern.

**2. Быстрый старт и руководства (структурист)** MVP ✅ **0.9.20**; Гостевой дом **0.9.26**; Сортировка/Кепки/Автоматизация-Zähler **0.9.48**. Необязательно: введите Caps/i18n - [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x).

**Снимок сценария Festlegung Sortierung (`buildQuickStartGuide`):** Прежде всего, **längere erste Zeile** от `common.desc` (дополнительный информационный центр). **Nicht** primär nach Trigger sortieren - kurze Beschreibungen kämen trotz „wichtigem“ Trigger nach oben. Bei **gleicher** Zeilenlänge: ** `triggerType` ** или `DocumentModel.detectTriggerType` как Tie-Breaker (расписание → подписка → при запуске → блочно → неизвестно), указанное имя - `lib/quickStartGuide.js`.

**3. Русалка / kleine Graphen** **Stufe 1 (MVP):** Русалка из **kuratiertem** Inhalt (eigenes Feld / `manualContext`); При использовании Markdown HTML-Darstellung bewusst wählen (кодовый блок или клиентский рендеринг). **Stufe 2:** опционально kleiner **begrenzter** Auto-Graph (например, Multihost Host → Instanzen mit Knotenlimit). **Nicht Ziel:** требуется большая установка сценария/графика состояния без фильтра.

**Обзор:** **0.9.27** (`manualMermaidDiagram`, HTML + Client-Mermaid jsDelivr; Markdown-Fence); **0.9.28** (`autoMermaidHostGraph`, Knotenlimit). **Нарушение** (Фаза 5 / переносимый Артефакт): серверы **статистика SVG** или **зусацлич цу** Client-Render - такие [TODO § 1.2a](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-pdf-offline-mermaid) и **Graphen/Mermaid** unten.

---

<a id="zukunftsvision"></a>

## Zukunftsvision - Zusammenhänge & Kontext (Мозговой штурм)
> **Статус:** Sammelplatte für Ideen - **keine feste Roadmap** für alles in der Tablele unten. **5.x.3 (Русалка)** - это umgesetzt; **Фаза 5** (например, PDF, Backup-Anbindung) и просмотрите Feintuning bleiben **Umsetzung/Produktentscheid** с [TODO.md - Фаза 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features). Festgehaltene **Produkt-Merkliste** вкл. **Разведывательная платформа:** Abschnitt [Merkliste - Produkt-Lücken & nächste Ausbaustufen](#merkliste-produktluecken-platform). Dieser Abschnitt soll verhindern, dass Diskussionen (Форум, стажер) verloren gehen.

### Auslöser
- **Значение адаптеров:** во время установки **автоматической** актуальности, только лесбийский документ - ohne Pflicht zur manuellen Pflege.
- **Форум** ([Test Adaptor autodoc](https://forum.iobroker.net/topic/84267/test-adapter-autodoc/)): Nutzer **UlliJ** lobt AutoDoc und wünscht sich die **Kombination** mit manuell erstellter Doku, die **Zusammenhänge** verständlich macht (z.B. Topologie-Skizzen: Proxmox, LXC, ioBroker, Influx, Grafana, Funk-Ökosysteme). Verlinkung **von** externer Doku **zu** AutoDoc wurde praktisch gezeigt («быстро и грязно»).
- **Abgrenzung zu «Bilder in Notizen»:** Bilder/Grafiken können *ein* Baustein sein; Для обратной связи используется следующее: **Beziehungen** zwischen Teilen des Systems sichtbar machen - для **Onboarding** (Gäste), **User** (Alltag) и **Admin** (Aufbau, Abhängigkeiten, Sonderfälle, Wiederanlauf).

### Шпаннунгсфельд
- Je **mehr** Nutzer einpflegen müssen, desto eher wird es **nicht** genutzt («zu faul» / kein Zeitbudget) - **Авто-персонаж** leidet.
- **Lösungsrichtung:** стандартное **auto-Basisschicht** из Objekten/Metadata/Analyse (bereits z.B. Inventar, Skript-Übersicht, Dependency-/Referenz-Ideen) + **optional, dünne** Schicht für Dinge, die ioBroker **nicht** weiß (Umgebung, Absicht, Notfall-Infos, внешние ссылки на документацию).

### Профиль администратора - «Wie ist das System aufgebaut?»
**Möglichst ohne Zusatzpflege:**

- Inventar: Hosts, Controller/Node, Instanzen, Adaptor-Metadata, Diagnose, Repos - Landkarte des **Ist-Zustands**.
- **Abhängigkeiten / Querbezüge:** aus vorhandener Analyse (z.B. `stateRefs`, Skript↔Objekt, Instanzübersicht) - например **Auto-Doku**.
- Skript-Landkarte (Trigger, Zeitpläne, Ordner) также как Grundlage für **„was läuft wie autotisch“** и für **Recovery-Listen** (was muss nach Neuaufbau wieder существующие), ohne Romane.

**Nur wo nötig (согласие, Вениг Фельдер):**

- Kurzes Kapitel **"Umgebung & Wiederanlauf"** с праздниками Unterpunkten; Auto-Befüllung wo möglich, **Lücken** опционально от Nutzer (einmalig oder selten).
- **Внешние ссылки:** выдающиеся ссылки (Wiki, BookStack, Markdown-Repo) все в адаптере для дублирования.
- Необязательный вариант: **Mermaid** или **Bilder** nur für diesen Kontext - **Umsetzung Mermaid:** [Phase 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md) (составлено: kuratiert → klein & auto); Обратите внимание на отдельные изображения.

### Профиль пользователя
- **Gleiche Schichtung**, а также **Tiefe und Sprache:** Alltag («Räume, Geräte, was passiert von selbst»), **kein** technisches Recovery-Kapitel wie im Admin.
- **Авто-первый** ноч: kurze Texte, Karten, wenig Pflege-Fläche; опционально **Hausnotizen** bleiben knapp.

### Профиль адаптации
- **Ориентирование** и **«автоматическое ориентирование»** в groben, vertrauenswürdigen Worten; strikt **faktenbasiert** wo KI genutzt wird (Охрана, запасной вариант - bestehende Philosophie fortsetzen).
- **Zusammenhänge** как sehr kurzer Block + ggf. **eine** visuelle или verlinkte Ebene - kein Architektur-Wälzer für Gäste.

<a id="merkliste-produktluecken-platform"></a>

### Список товаров - Produkt-Lücken & nächste Ausbaustufen
> **Цвет:** Sammelt Punkte aus Produkt-/Nutzerperspektive - **keine** автоматически приоритизируется в соответствии с требованиями Abgestimmten Reihenfolge в [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). Umsetzung **stückweise**, wenn Aufwand und Nutzen passen.

**Inhaltliche Lücken («erklären», nicht nur inventarisieren):**

- **Semantik der Automatisierung:** zuverlässiger Überblick «was läuft wie autotisch» über alle **für die Installation**, соответствующий Quellen (Skripte, Schedules, wo erkennbar Adaptor-interne Regeln). Выполните следующие действия: Blockly-Inhalt, **dynamische** State-IDs (высокое Regex-Grenzen), Szenen/Logik/Node-RED и другие Regeladapter - nur wo Daten tragfähig sind or **gezielt** angebunden wird.
- **Текущий анализ скрипта:** с помощью Live-/Regex-Schicht - без подключения к сети **офлайн** при резервном копировании (**KI + вариант скрипта B**, копирование и [Резервное копирование / Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)): längere Läufe, ggf. AST statt nur Muster, ohne das laufende System zu belasten.
- **Gerätemanager (ioBroker Admin Device Manager):** необязательная структурированная запись с помощью ** `dm:` **-/Device-Manager-Protokoll nutzen, wo Adaptor mitspielen - stärkeres «welche Geräte unter welcher Instanz»; **ersetzt nicht** globale Automatisierungs-Semantik.
- **Vertrauen & Zeit:** menschenlesbare **“Was Hat sich seit dem letzten Lauf geändert?”** aus Versions-/Diff-Logik - **Umsetzung (`dev`):** Admin **Systemübersicht** und **Admin-Markdown** mit Inventar-Delta (необязательно для ** `hideAdminDeltaSinceLastRun` ** ausblendbar); **Журнал изменений**-Карта и описание Vergleichs-Zusammenfassungen werden beim Экспорт в **gewählten Dokumentationssprache** angezeigt; **Пользователь** - Экспорт с курсом Alltagszeile bei **echten** Deltas (nicht Erstlauf). Onboarding ohne diesen zusätzlichen Delta-Hinweis. Подробности README / [TODO - Delta-UX](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).
- **Kurierte «Warum»-Ebene:** neben KI/Freitext eine **systematische** Schicht (z.B. knappe Pflicht-/Halbpflichtfelder pro Bereich, Glossar, «Absicht in einem Satz») - skalierbarer als reine KI-Erklärung.
- **Transparenz der Grenzen:** в экспортном отчете, **wo automatische Erkennung endet** (Gerät/Firmware/Cloud/manuelle Schicht) - Erwartungsmanagement für Nutzer. *Базовый уровень (экспорт):* kurzer Hinweis am Ende des **Systemübersicht**-Kapitels (**Admin**-Profil: HTML + Markdown) - `docTransparencyLimitsShort` в `lib/i18n.js`. Пользователь/адаптация-HTML haben **kein** technisches Systemkapitel; dort bleibt der Hinweis bewusst weg.

**Plattform-Reconnaissance (laufend; bei js-controller-/Admin-Sprüngen или größeren AutoDoc-Releases sinnvoll):**

- **js-controller** и Objekt-/State-Zugriffe: welche ** `getObjectView` **-Designs und APIs sind portabel und über Releases hinweg stabil интерпретатор?
- **Администратор** (соответствует **глобальным зависимостям**): **jsonConfig**, **Диспетчер устройств**, Обмен сообщениями - каковы конечные структурированные данные, адаптеры?
- **Referenz-Adapter** stichprobenartig prüfen (z.B. **javascript**, **backitup**, bei Bedarf Szenen/Logik/„IoT“-Regeln o.Ä.): Объектные схемы, типичные состояния, Backup-Artefakte, `sendTo`-Konventionen - kurz festhalten, **was zuverlässig für AutoDoc nutzbar ist** по сравнению с **Best Effort**.

Ergebnisse können in Erweiterungen von `discovery.js` / Hilfstexten münden - ohne dass jedes Diskussionsthema sofort ein eigenes Feature wird.

<a id="merkliste-nachzeichnung-2026-05"></a>

### Nachzeichnung - Produktperspective & Fortführung (12 мая 2026 г.)
> **Zweck:** Vollständige **Formulierung** aus der Projekt-Diskussion («был ли адаптер aus Nutzer-/Produktperspektive noch fehlt»), damit beim Fortsetzen nichts fehlt. **Keine** новый приоритет может быть изменен [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). Die technischen Stichworte sind mit **Inhaltliche Lücken** und **Plattform-Reconnaissance** oben bereits verbunden.

**Контрольный список (дискуссионный стенд):**

1. **“Was autotisiert hier wirklich?”** - Inventar allein reicht nicht ohne **zuverlässige Semantik**: Blockly ohne eigene Auswertung bleibt eine Blackbox; **динамические** государственные идентификаторы unterlaufen die Regex-Schicht; Szenen/Logik/Node-RED/eigene Adaptor-Regeln sind **kein** einheitlicher Automatisierungsüberblick - entweder angehen или Erwartung «vollständige Doku» durch **Transparenz der Grenzen** entschärfen.
2. **Zweite, tiefere Datenquelle für Skripte** - з. B. **Резервное/резервное резервное копирование**, **статус AST и регулярное выражение**, долгий срок хранения, последний Live-Last; bei uns angeplant (**KI + Вариант сценария B**, [Backup-Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)), noch nicht umgesetzt.
3. **Brücken zu neuen Admin-Fähigkeiten** - z. B. **Gerätemanager** (`dm:` / Device Management) для структурированного управления, без адаптера (**ersetzt nicht** globale Automatisierungs-Semantik).
4. **Vertrauen: Änderungen erzählen** - Diff intern vorhanden; в der **lesbaren Doku** das Narrativ «**seit letztem Lauf**…». **Erste Ausbaustufe umgesetzt** (Admin-HTML/Markdown, User-Kurzzeile, дополнительная панель ausblendbar - siehe Bullet **Vertrauen & Zeit** oben und [TODO - Delta-UX](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt)); weitere Ausbaustufen по желанию.
5. **Kuratierte «Warum»-Ebene ohne nur KI** - systematische Schicht (Pflicht-/Halbpflichtfelder, Glossar, «Absicht in einem Satz»), skalierbarer als reine KI-Erklärung.
6. **Transparenz der Grenzen** - пояснение, автоматическое завершение процесса (Gerät/Firmware/Cloud/manuelle Schicht); Базовый уровень з. B. `docTransparencyLimitsShort` в конце администратора-**Systemübersicht**.

**Приоритеты-Empfehlung (Обсуждение):** Richtung „vollwertige Doku“ zuerst **Automatisierungs-Semantik / Inventar-Tiefe** und **Änderungs-Narrativ** stärken - **DnD/Kosmetik** nachrangig.

**Функции:** Активация **js-контроллера**, **Администратора** и **Referenz-/Default-Adaptern** (все API-интерфейсы **tragfähige** Daten или Best Effort?) с **Plattform-Reconnaissance** - большие выпуски или контроллеры-/администраторы курц гегенпрюфен; Эркеннтниссе ггф. более высокий заказ в Issue/TODO nachziehen.

##### Разведка 20 сентября 2026 г. (Live-Host + Ökosystem)
Abgleich gegen eine laufende Installation (MCP `system_info` / `list_adapters`) и актуальная административная документация/MCP-Doku - **kein** Pflicht-Feature-Bau in diesem Schritt.

| Компоненты | Стенд беобахтетера | Помощь AutoDoc |
| ---------- | ------------------ | --------------------- |
| **js-контроллер** | **7.2.2** (Линие **7.x / Люси**); AutoDoc заявляет о себе ** `>= 6.0.11` ** | **Minimum nicht anheben** - 6.x-Hosts bleiben unterstützt. Обнаружение не связано с **Объектами/Представлениями**, а также с внутренними API-интерфейсами контроллера. |
| **сеть** | **9.1.4** | Unverändert: необязательный Auslieferung der HTML-Exporte; AutoDoc schreibt weiter nach ** `/files/` **. |
| **javascript** | **10.2.5** | KI-Вариант A (`common.source`) weiter gültig; Кейн Блокли-Парсер. |
| **iobroker.mcp** | **1.1.7** (потоковая передача HTTP `/mcp`, заголовок сеанса) | Werkzeuge für **externe** KI-Clients (u.a. Cursor). **Kein** Ersatz für AutoDoc-Provider (Ollama/Groq/Anthropic) и **kein** Weg, ein Cursor-Abo также `aiApiKey` einzutragen. Необязательно: в **Admin-Profil** Best-Effort-Hinweis «MCP-Instanz vorhanden» - **nicht** Priorisiert. |
| **ioBroker.repositories** | **последнее:** Eintrag ** `autodoc` fehlt** в актуальном ** `sources-dist.json` ** (оболь PR **#5978** Gemerged War). **стабильно:** bewusst **zurückgestellt** (zu wenige Tester, выпуск **#54**). | Zuerst Checker-**Ошибки** (#60) schließen, dann **erneut late** beantragen. Кейн Стэйбл-PR. |
| **ioBroker.repositories** | **последнее:** Eintrag ** `autodoc` fehlt** в актуальном ** `sources-dist.json` ** (obwohl PR **#5978** Gemerged War). **стабильно:** bewusst **zurückgestellt** (zu wenige Tester, выпуск **#54**). | Zuerst Checker-**Ошибки** (#60) schließen, dann **erneut late** beantragen. Кейн Стэйбл-PR. |

**Документация GitHub (поддержка):** Загрузите `#…` на `github.com` setzen **JavaScript** voraus - сильный блокировщик (например, **NoScript** для GitHub) с помощью Hash-Scroll ausfallen lassen; Соединения адаптера для ** `blob/<branch>/…` **, нет `raw.githubusercontent.com`.

### Umsetzungs-Ideen (ничто не является приоритетным)
| Правовая | Идея |
| -------- | ---- |
| **А - Авто** | Aus `documentModel` Generierte Kurztexte/Kacheln «Zusammenspiel»; **automatische** Mermaid-Graphen *nur* wo Daten tragfähig sind (z.B. kleine Hierarchien). |
| **Б - Полуавтомат** | Конфигурация включает в себя Markdown-Feld «System & Zusammenhänge» с необязательным Mermaid-Blöcken (когда вы используете, какой эффект). |
| **Д - Медиен** | Загрузка изображений или изображений с `files/…` + версия - дополнительные возможности (большой, темный режим, вращение). |
| **Д - Медиен** | Загрузка изображений или добавление `files/…` + Verweise - дополнительные возможности (большой, темный режим, вращение). |

<a id="weitere-moeglichkeiten-roadmap-2026-05"></a>

### Weitere Möglichkeiten - Roadmap-Vorschlag (2026-05)
> **Zweck:** Sammelt **конкретные настройки** в рамках Projekt-Diskussion (Produktperspektive, Plattform **js-controller** / **Admin** / Referenz-Adapter), пусть **nicht verloren** gehen. **Keine** автоматически устанавливается приоритет [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit) - установите флажок и отпустите его в **TODO**; hier nur **Möglichkeiten** und **Begründungen**. Bei Umsetzung: Eintrag in TODO anlegen oder abhaken, ggf. Разведка-Ergebnisse kurz nachziehen.

#### A - Prozess & Sichtbarkeit (Wenig Code, hoher Nutzen)
| Möglichkeit | Kurz |
| ----------- | ---- |
| **PR [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (`sources-dist.json`, **latest**) | Адаптер-контролер Schließt **W4001**; Стандартный список адаптеров в администраторе - [TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung) |
| **Платформа-Разведка** (laufend) | Bei js-controller-/Admin-Sprüngen или большие выпуски: был ли он **стабильным** или **Best Effort**? Курц в выпуске/TODO/ПЛАНЕ - здесь [Платформенная разведка](#merkliste-produktluecken-platform) |
| **Платформа-Разведка** (laufend) | Bei js-controller-/Admin-Sprüngen или большие выпуски: был ли он **стабильным** или **Best Effort**? Курц в выпуске/TODO/ПЛАНЕ - здесь [Plattform-Reconnaissance](#merkliste-produktluecken-platform) |

#### B - Offene Arbeitspakete aus TODO / Phase 5 (bereits festgehalten, hier zur Vollständigkeit)
| Тема | Синн | Ауфванд (гроб) | Вервайс |
| ----- | ---- | -------------- | ------- |
| **Резервное копирование / [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup)** | Оффлайн/Миграция, **KI-Скрипт, вариант B**, Документация с ** `.tar.gz` ** | Хох | [TODO - Backup-Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung), [§ 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |
| **Реакция пользовательского интерфейса администратора** | Нужен **jsonConfig** для DnD, Live-Mermaid-Preview, Medien-Galerie **systematisch** zu eng | Хох, по желанию | [TODO § 1.8](/#/docs/adapterref/iobroker.autodoc/TODO.md#admin-react-optional) |
| **Этап 5.х.2 - Файнтюнинг** | Керн **0.9.48** ✅; дополнительно: Колпачки, Doppelinfos | Кляйн | [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **Фаза 5.x.1 - получение сигнала диагностики** | Автоматический контрольный список **nur bei Befund** (например, Node.js через `lib/diagnosisSnapshot.js`) | Миттель | [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x), [Гибридный MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan) |
| **Фаза 5.x.1 - получение сигнала диагностики** | Автоматический контрольный список **nur bei Befund** (например, Node.js через `lib/diagnosisSnapshot.js`) | Миттель | [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x), [Hybrid MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan) |

#### C - Список «Sinn der Doku» (inhaltliche Vertiefung)
| Люке (ПЛАН) | Эрстер синнволлер Шритт | Кодекс анкнюпфунга |
| ------------ | ------------------------- | ---------------- |
| **«Была ли автоматизация работы?»** | ✅ **0.9.48:** Admin-Kapitel **«Automatisierung im Überblick»** + Transparenz-Grenzen (Blockly/Subscribe/Regel-Adapter) | `lib/automationOverview.js`, Средство рендеринга |
| **Прозрачность Гринцена** | `docTransparencyLimitsShort` **erweitern**: Blockly, Node-RED, Szenen/Logik-Adapter, **dynamische** State-ID (Regex-Grenze) | `lib/i18n.js`, Admin-Systemübersicht |
| **Änderungs-Narrativ** | Дельта-UX ✅; опционально **ein** Onboarding-Satz bei **großen** Inventar-Deltas (heute bewusst ohne) | `docChangeFormat.js`, Средство рендеринга |
| **Änderungs-Narrativ** | Дельта-UX ✅; опционально **ein** Onboarding-Satz bei **großen** Inventar-Deltas (heute bewusst ohne) | `docChangeFormat.js`, средство рендеринга |

**Leitgedanke:** Stärkere Hebel sind **erzählbare Schicht** («был läuft von selbst / было шляпа sich geändert / wo endet AutoDoc») и **Plattform-Brücken** - nicht primär mehr Kapitel oder DnD.

#### D - Платформа и референс-адаптер (был в нуцбаре)
> **Основные сведения:** Данные о **Объектах/Состояниях/Представлениях** js-контроллеров - **Kin** Pflicht-Zugriff в частных Admin-HTTP-API. **Самое лучшее** klar kennzeichnen.

##### Js-контроллер
| Квелле / API | Дополнительные сведения о AutoDoc | Берейты / Стенд |
| ------------ | ----------------------------- | ---------------- |
| `getObjectView(system, host\|instance\|schedule)` | Host-/Instanz-Landkarte, Zeitplan-Übersicht | ✅ веситгехенд |
| ** `system.adapter.*.alive` / `.connected` ** | Kurzzeile User/Onboarding: Automatik/Instanz **nicht erreichbar** (faktenbasiert) | ⬜ Воршлаг |
| ** `system.adapter.*.alive` / `.connected` ** | Kurzzeile User/Onboarding: Automatik/Instanz **nicht erreichbar** (faktenbasiert) | ⬜ Воршлаг |
| **Объект расписания / CRON** | Администратор: Zeitplan-Landkarte; Пользователь: «Было läuft nachts?» без Quelltext | 🟡 Тейле в Дискавери |
| Просмотреть ** `getObjectView` **-Просмотры | Nur nach **Reconnaissance** - портативный и стабильный выпуск | ❓документация для Bau |
| Просмотрите ** `getObjectView` **-Views | Nur nach **Reconnaissance** - портативный и стабильный выпуск | ❓документация для Bau |

**Nicht Ziel:** Vollständiger Objektbaum или ungefilterter State-/Skript-Graph ([Bewusst weggelassen](#bewusst-weggelassen)).

##### IoBroker.admin
| Фахигкейт | Мёглихер Нуцен |
| --------- | ---------------- |
| **Диспетчер устройств** (`dm:` / Управление устройствами) | Структурный список **pro Instanz** - Räume/User verständlicher («Gerät unter Adaptor X») |
| **jsonConfig-Muster** | Nutzer-Doku (`docs/user-guide/`) и Tabs/Kochbücher anbinden - ✅ teilweise |
| **Датенвег** | Используйте **Объект**, чтобы получить доступ к адаптеру DM - Разведка: использование адаптера **deviceManagement** nutzen |

**Pragmatischer MVP (Vorschlag):** `deviceMap` в Discovery anreichern, wo DM-Objekte Existieren; **Пользователь-Раум-Капител** Priorisiert Gerätenamen.

##### IoBroker.javascript
| Обсуждение | Нуцен | Гренце |
| ----------- | ------ | ------ |
| **Блочно** (`common.engine`) | Ярлык «визуальный сценарий - Quelltext nicht ausgewertet» | Кейн Блокли-Парсер |
| **Ordner/`lib/scriptGroups.js` ** | Администратор: Автоматизация на Береих | ✅ |
| **KI Вариант A** (`common.source`, согласие) | Пользователь/регистрация Erklärungen | ✅ |
| **KI Вариант A** (`common.source`, подписка) | Пользователь/регистрация Erklärungen | ✅ |
| **KI Вариант B** (Резервная копия) | Tiefe ohne Live-Last | резервное копирование |

##### IoBroker.backitup (Фаза 5, zurückgestellt)
- Архив ** `*.tar.gz` ** (`iobroker-objects.json`, Skript-Inhalte).
- **Lesbarer Mount-Pfad** или потеряете ** `sendTo` ** (`list`, `getSystemInfo` - автоматически обновляется версия Backitup-Version).
- **Gleiche KI-Pipeline** с вариантом A - **andere Quelle**; Doku bei ioBroker-Ausfall / Миграция.

##### Адаптер Weitere (Best Effort, с прозрачностью)
| Введите | Реалистичность для AutoDoc |
| --- | ------------------------ |
| **сцена/логика/узел-красный** | Instanz + включен + Metadaten-Kurztext; Abschnitt **"Weitere Regel-Engines"** + Рекомендации **nicht vollständig analysiert** |
| **hm-rpc, zigbee, mqtt, …** | Инвентар, Ряме, Роллен, `connectionType`/`tier` | ✅ Керн |
| **приток, графана, sql** | Администратор: Zeile «externe Datenhaltung vorhanden» - **kein** DB-Inhalt |
| **открытие** | Мета в диагностике («Gerätesuche aktiv») |

#### E - Vorgeschlagene Umsetzungs-Reihenfolge (Обсуждение 2026-05, nichtbinend)
| Стуф | Пакет | Начало |
| ----- | ----- | ---------- |
| **1** | **Репозитории-PR** + README-Hinweis Standardliste | Процесс, основная функция-раздувание; Шлис W4001 |
| **2** | ~~**“Automatisierung im Überblick”** (Администратор) + Прозрачность~~ | ✅ **0.9.48** |
| **3** | **Device-Manager-Anreicherung** (максимально возможное) | Лучший ответ/Пользователь без нового HTTP-конечного пункта |
| **Данач** (на форуме/тестере) | **Резервное копирование/Резервное копирование** + KI-B; дайте **DnD** или **проведите диагностику** | Приоритет в обмене |

#### F - Bewusst nicht als „nächste“ Ausbaustufe
Entspricht [Bewusst weggelassen](#bewusst-weggelassen) и [TODO - Bewusst weggelassen](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt): u. а. использовать большой графический интерфейс, использовать Live-AST и все сценарии, REST-API/Webhooks, мобильное приложение, вкладку Asset-Upload-Tab / собственный HTTP-Asset-Server (Medien-MVP: **URLs + kleine SVG**), Admin-React **ohne** конкретный jsonConfig-Engpass.

---

### Skript-Quellcode-Analyse & Smarthome-Beschreibung durch KI
**Основные требования:** Если выбранный сценарий не содержит метаданных (имя, триггер, статус), то дополнительный текст **Quelltext** для KI kurz erklären lassen - был автоматизирован **tatsächlich** (в Alltagssprache für User/Onboarding).

#### Вариант A - Глубокий анализ сценария (действующий, Erweiterung Phase 3.3)
- `discovery.js` находится в `common.source` и **aktiviertem** Config-Flag ein.
- Zusätzlicher KI-Pass в `aiEnhancer.js`: пакеты/усечение лимитов токенов wegen.
- Использование: **pro Skript** kurze Erklärung (2-4 Sätze) + **optional ein** zusammenfassender Absatz «Automatisierung im Überblick» (но не **User/Onboarding**, ничего лишнего из Admin-Profil).

#### Вариант B - База резервного копирования (Erweiterung Phase 5)
- Gleiche Idee, Datenquelle = **ioBroker-Backup** (Inhalt z.B. `iobroker-objects.json` o.ä.; типичный ** `.tar.gz` ** от [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup), не имеет значения **ZIP**).
- Sinn: **Offline**/Migration - **kein** Ersatz für A, sondern **Erweiterung derselben Pipeline**, sobald [Backup-Anbindung / Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung) umgesetzt ist.

<a id="ki-skript-festlegung"></a>

#### Festlegung (Schicht 2)
| Вопрос | Заключение |
| ----- | ---------- |
| **А, что ещё?** | **Zuerst A** (лауфенд-инсталляция, höchster Alltagsnutzen). **B** кристалл **Фаза 5-Интеграция резервного копирования** и связан с этим - gleiche KI-Logik, и другие. |
| **Тифе** | **Pro Script** Kurztext (Pflicht, wenn Feature an); **eine** globale KI-Zusammenfassung необязательно; **Профиль администратора** keine zusätzliche KI-Flut (Метаданные + ggf. bestehende Tabellen reichen). |
| **Дарстеллунг** | **Erweiterung** des Skript-Kapitels / der Skript-Karten bei **User & Onboarding**; Администратор может использовать или использовать технические средства без маркетингового текста. |
| **Датеншуц** | **Согласие** + предупреждение README-Warnung; vor dem Senden **heuristische Redaktion** von Zeilen mit typischen Secret-Mustern (аналог `filterNative()`-Denke) - **kein** Vollversprechen; Оставайтесь с **verantwortungsvollem Opt-in**. |

---

<a id="system-visitenkarte-festlegung"></a>

### System-Visitenkarte / „Für Forum kopieren" (Обратная связь с форумом)
**Grundgedanke:** Kompakte **System-Kurzübersicht** for Helper im Forum - Kerndaten (js-controller, Node.js, RAM, CPU, Instanzen, Repository, …) не входит в генерируемую административную документацию, а не **ein-Klick-teilbar**.

#### Festlegung (Schicht 2)
| Вопрос | Заключение |
| ----- | ---------- |
| **Какая кнопка?** | **Пример:** Кнопка/Действие в **Adapter-Instanz** (**jsonConfig**) → скопируйте в **Изменение**. Nutzer sind beim Schreiben von Forums typischerweise in der **Admin-Oberfläche** - dort Maximumer Nutzen. |
| **Пользовательский HTML?** | **Внимание:** лучше всего использовать фрагмент в **генерированном Admin-HTML** (в документации не должно быть ничего). **Kein** muss für zwei identische Buttons; UI-Instanz ist die Hauptlösung. |
| **Формат** | **Открытый текст** с праздником, без ограничений Макет (Überschriftenzeilen, Key: Value) - **Forum- und Markdown-freundlich**. **Kin** HTML в Zwischenablage (проверьте форматирование в Foren). |
| **Пользовательские шаблоны (Ebene 1)** | **Kein** Ersatz für den Button: Kapitel-Auswahl kann später eine **„nur System“-Doku** erzeugen, ist aber **schwerer** als Copy-Paste foren. Visitenkarte ≠ Шаблон-Тема. |

**Включение (минимум):** версия js-controller, Node.js inkl. LTS-Hinweis, Host/OS падает, RAM/CPU (Kurz), Instanz-Anzahl, Repository-Kanal - как это происходит при диагностике/системном разделении, а также **компакт в Einem Block**.

---

<a id="custom-templates-detail"></a>

### Пользовательские шаблоны (этап 5 - Ausarbeitung)
> **Статус:** На этапе 5 также Stichpunkt vorhanden - hier konkretisiert, noch nicht Priorisiert. Zu gegebenem Anlass weiter ausarbeiten.

Пользовательские шаблоны могут быть использованы. Sinnvolle Scope-Abgrenzung nach Aufwand und Realem Nutzen:

| Эбене | Бесшрайбунг | Ауфванд | Эмпфелунг |
| ----- | ------------ | ------- | ---------- |
| **1 - Капитель-Аусваль** | Nutzer wählt welche Kapitel erscheinen (Checkboxen), Reihenfolge anpassbar | Геринг | ✅ синнволл |
| **2 - Макет/стиль** | CSS-тема Eigenes, логотип, Farben, **Schriftart** (`font-family`), **Hell/Dunkel fest vorgeben oder Auto mit Umschalter**, ggf. **Header-Bild/Logo-URL** - z. B. für Weitergabe an Familie/Hausverwaltung | Миттель | ✅ синнволл |
| **3 - Freie Zusatz-Sektionen** | Nutzer definiert eigene Kapitel mit Markdown-Freitext (Notfallkontakte, WLAN и т. д.) - Ergänzung zu `manualContext`, aber Strukturierter; необязательный **профиль** (`admin` / `user` / `onboarding`) | Миттель | ✅ синнволл |
| **4 - Эйджин Датен-Абфраген** | Nutzer Definiert welche States/Objekte zusätzlich abgefragt werden, eigene Tabellen | Хох | ⚠️ Гренцвертиг |
| **5 - Замена шаблона Vollständiges** | Nutzerliefert eigene Handlebars/Jinja-Vorlage, используйте HTML-контроль | Серьёзный | ❌ Чрезмерная инженерия |

**Особое внимание:** Эбене 1 + 3 также является комбинацией - Kapitel-Auswahl und freee Zusatz-Sektionen. На 90% больше реальных возможностей, связанных с движком шаблонов. Ebene 4-5 Widespricht dem Kern-Versprechen «automatisch ohne Pflege».

**Verbindung zur System-Visitenkarte:** [Festlegung](#system-visitenkarte-festlegung) - der **Forum-Button** в der Instanz ist die Hauptlösung. Ebene 1 (Kapitel-Auswahl) kann **zusätzlich** eine kurze «nur System»-HTMLliefern, ersetzt aber **nicht** den Ein-Klick-Kopier-Fürs Forum.

**Umsetzungsstand (Код адаптера, дополнительная информация):**

- **Ebene 3 (MVP):** JSON `customDocSectionsJson` - Список `{ title, body[, Profiles] }`, Markdown → **все остальные HTML-профили** + **Markdown-Export**; Нав-Эинтрэге; KI-Owner-Context nennt die Kapitelüberschriften.
- **Ebene 2 (часть):** `htmlColorScheme` (авто/светлый/темный), `htmlHeaderLogoUrl` (https или `/…`), `htmlFontStack`, `htmlExtraCss` - без **экспортирования HTML**, без Markdown. **0.9.17:** `htmlThemePreset` - праздничная **Палитра** (по умолчанию, высокая контрастность, тёплый, шифер) как CSS-Variablen, без использования Nutzer Roh-CSS schreiben müssen (например, вместо `htmlExtraCss`).
- **Ebene 1 (части):** `adminHiddenChaptersJson` - добавление **Admin-HTML** (и **Markdown**, когда администратор профиля документации); необязательный ** `custom` ** для собственного Markdown-Kapitel. Zusätzlich ** `userHiddenChaptersJson` ** / ** `onboardingHiddenChaptersJson` **; ** `mermaidAuto` ** как собственный идентификатор главы (авто-топология, переход в адаптацию). **0.9.17:** `adminChapterOrderJson` - **Reihenfolge** der **Admin**-Kapitel; **dev:** `userChapterOrderJson` / `onboardingChapterOrderJson` - Reihenfolge **User/Onboarding**-Kapitel (JSON-Liste, Merge mit Default).

**Ночь (потрясающе):** Перетаскивание, **PDF**, beliebig viele / editierbare **eigene** Предустановки, Ebene 4-5.

---

### Leitplanken (Merksätze)
- Стандарт-Nutzung muss **ohne** Extra-Pflege **lohnen**.
- Мануэльлес должен **согласиться**, начать (Länge/Anzahl) и **nicht** bei jedem Export, если вы не хотите, чтобы его установили.
- **Gemeinsame Datenbasis** для всех профилей, **unterschiedliche Darstellung** (только администратор/все теги пользователя/регистрация).

---

<a id="architektur-grenzen"></a>

## Architektur - Гренцен, Ist-Zustand und Erweiterungen
> **Hintergrund:** Обсуждение на встрече разработчиков 15 апреля 2026 г. и на Folge-сессиях. Hier wird die Architektur **ohne zusätzliche Markdown-Datei** в diesem Projektplan festgehalten.

### Wie Architektur hier «endgültig» документация
Es gibt **drei Schichten** - alles in **diesem** Abschnitt von `PLAN.md` (bzw. nutzerrelevante Kurzfassungen необязательно в **README**, nicht als zweite Architektur-Quelle):

| Шихт | Вдох | Биндунг |
| -------- | ------ | ------- |
| **1 - Iст** | Был ли адаптер в **Code heute**: Ausgabeorte (`/files/`), States-Modus, Hashes, опционально `exportPath`, Multihost-Verhalten, Admin als Viewer, … | Beschreibung des **tatsächlichen** Verhaltens; bei größeren Code-Änderungen hier **mitziehen**. |
| **3 - Оффен** | Был **noch** nicht entschieden ist (то есть **optionale** spätere Erweiterungen wie HTTP-Asset-Endpunkt). **Medien/MVP**, [System-Visitenkarte](#system-visitenkarte-festlegung) и [KI + Скрипт](#ki-skript-festlegung) sind **festgelegt** (Umsetzung = Arbeitspakete). | Wird bei Entscheidung в **1** или **2** überführt и TODO/Release-Notizen angepasst. |
| **3 - Оффен** | Был **noch** nicht entschieden ist (то есть **optionale** spätere Erweiterungen wie HTTP-Asset-Endpunkt). **Medien/MVP**, [System-Visitenkarte](#system-visitenkarte-festlegung) и [KI + Skript](#ki-skript-festlegung) с **festgelegt** (Umsetzung = Arbeitspakete). | Wird bei Entscheidung в **1** или **2** überführt и TODO/Release-Notizen angepasst. |

**Reihenfolge im folgenden Text:** zuerst **technischer Kontext** (warum es Grenzen gibt), dann **bereits umgesetzte** Architekturteile, dann **Richtlinien** für noch nicht gebaute Teile, zuletzt **explizit offene Fragen**.

### Дополнительная проблема: ioBroker-Abhängigkeit
Все было AutoDoc erzeugt, земля в `/files/autodoc.0/` - ioBrokers **virtueller Dateischicht**. Der Zugriff darauf setzt einen laufenden ioBroker voraus (Веб-адаптер или интерфейс администратора). Если у вас есть ioBroker, это больше не документация.

Размер: **nicht jeder Nutzer Hat einen Web-Adapter** installiert - и это действительно так, denn nicht jeder braucht einen. Почта/Уведомление является резервным вариантом (ничто не должно быть целостным или небезопасным).

### Wie ioBroker Dateien стажер
| Бэкэнд | `writeFileAsync()` шрайбт нач... | Бинардатен (Билдер) |
| **jsonl** (по умолчанию) | `iobroker-data/files/` также содержит данные ОС на диске | ⚠️ Disk wächst, jsonl-DB selbst bleibt sauber |
| **jsonl** (по умолчанию) | `iobroker-data/files/` также содержит данные ОС на диске | ⚠️ Disk wächst, jsonl-DB selbst bleibt sauber |
| **редис** | В Redis в качестве бинарного объекта Blobs (RAM/Memory) | ❌ Redis bläht bei Bildern Massiv auf |

### Der kleinste gemeinsame Nenner: Admin-UI
**Администратор ioBroker** (порт 8081) - это дополнительный компонент, который включает в себя **установку** - а также настройки Multihost-Raspberry-Pi-Setups, веб-адаптер, VIS, NAS. Админ:

- Kann Dateien aus `/files/` anzeigen (eingebaut, kein Web-Adapter notig)
- Встроенный рендеринг Kann HTML (Datei-Browser)
- Läuft auf praktisch jedem Host

**Консеквенция:** `/files/autodoc.0/` bleibt der primare Ausgabeort. Администратор - это юниверсальная программа просмотра. Веб-адаптер не является обязательным.

### Проблема: сбор данных и раздувание БД
Венн Бильдер (Grundrisse, Topologie-Skizzen, Скриншоты) в `/files/autodoc.0/` Gespeichert Werden:

- **jsonl-Backend:** Disk wächst, aber jsonl-DB selbst bleibt sauber - vertretbar bei kleinen Dateien
- **Redis-Backend:** Создание в RAM/Speicher → inakzeptabel bei echten Fotos или mehreren Assets

### Saubere Trennung (Lösungsrichtung)
```
/files/autodoc.0/           ← ioBroker-Datenbank (virtual filesystem)
  ├── admin.html             → immer überschrieben bei Regenerierung
  ├── user.html              → immer überschrieben
  ├── onboarding.html        → immer überschrieben
  └── doc.json               → immer überschrieben
                             → KEIN Anwachsen, nur Latest-Stand

Realer Dateisystem-Pfad:    ← AUSSERHALB der ioBroker-Datenbank (opt-in)
  iobroker-data/autodoc-export/
  ├── smarthome.html         → portable, selbst-enthaltende HTML-Kopie
  └── assets/
      └── grundriss.svg      → User-Assets, NICHT in jsonl/redis
```

**Объединяющий контент** → погрузиться в `/files/`, погрузиться в сверхвысокие уровни, накопить больше, раздуть.

**Активы пользователя (изображение)** → большой объем данных **nicht** в надежных датах данных; siehe **[Medien - festgelegte Arbeitsweise](#architektur-medien-mvp)** унтен.

<a id="doppelte-ablage-states"></a>

### Doppelte Ablage: Штаты `documentation.*` против `/files/`
Historisches **Problem:** Большая документация в параллельной работе в **States** и под ** `/files/` ** - двойной Nutzlast (u.a. Redis).

**Umsetzung (Код стенда):** Kanonische Dateien unter ** `/files/` **. Ab **0.9.39** gibt es ** `documentationStatesMode` nicht mehr**: große `documentation.*`-States sind **immer** kurze Platzhalter; Введите текст в формате ** `/files/` ** (и необязательно ** `exportPath` **). Download-Aktionen lesen aus Dateien (`autodoc-latest.*` …), с резервным вариантом в случае необходимости, когда будет использован Legacy-State-Inhalt. ** `documentation.exportHashes` ** (SHA-256 hex der «latest»-Exporte) для Änderungserkennung. Подробности: [TODO.md - Анханг А](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).

### Дополнительный экспорт файловой системы (ioBroker-unabhängiger Zugriff)
Дополнительный параметр конфигурации **realer Ausgabepfad** позволяет изменить документацию и включить ioBroker:

- Nutzer configuriert z.B. `/mnt/nas/autodoc/`, `D:\Docs\smarthome\` или локальный Pfad
- AutoDoc schreibt die Fertige HTML **zusätzlich** dorthin (kein Ersetzen der ioBroker-Ausgabe)
- Браузер открывает `smarthome.html` напрямую через `file://` - **kein Webserver nötig**
- Wer einen шляпа веб-сервера: Pfad ins Webroot → immer online erreichbar
- Основные возможности: подключение к NAS, локальный диск, USB-крепление - напрямую для браузера.
- Wer es nicht braucht: Feld leer lassen

**Обзор:** HTML-код для переносимого экспорта можно легко загрузить (kein CDN). **Стандарт 0.9.x:** QR-код позволяет использовать сервер для npm-пакета `qrcode` как SVG, - kein CDN mehr.

### Активы/Сборка: Lösungsoptionen (Vergleich - Festlegung siehe [Medien - festgelegte Arbeitsweise](#architektur-medien-mvp))
| Вариант | Бесшрайбунг | DB-Раздувание | Админ-Зугрифф | Офлайн |
|--------|-------------|----------|--------------|---------|
| **A - только внешние URL** | URL-адреса ссылок Nutzer (NAS-HTTP, облако, стажер) | Ноль | ✅ Венн Эррайхбар | ⚠️ URL-адрес erreichbar |
| **B - SVG/текст в `/files/` ** | Nur Text-basierte Grafiken (SVG, Mermaid) в БД; Фотографии → внешний URL | Минимальный (SVG Кляйн) | ✅ через Администратор/Интернет | ✅ Встроенный встроенный SVG-интерфейс |
| **C - База данных активов** | Картинка в области Filesystem-Pfad; Адаптер обслуживается через собственный HTTP-Endpunkt | Ноль в БД | ✅ Веб-адаптер erfordert | ✅ Венн Пфад Эррайхбар |
| **D - встроенный Base64** | Изображение прямо в HTML Н/Д (хранилище файлов Kein) | ✅ погружение | ✅ погружение | ❌ Dateigröße ×3-5 среди фотографий |

**Тенденции:** Вариант B als Basis (SVG/Mermaid-Diagramme в `/files/`, klein und sauber) + Вариант A для фотографий (внешние URL-адреса, основные проблемы с хранилищем). Вариант D, если вы хотите, чтобы значки отображались на панели.

**Для Redis-Nutzer:** Разъясните документацию: любые внешние URL-адреса или SVG-файлы, добавленные в формат `/files/`.

### Verbindliche Leitplanken (Schicht 2 - beschlossen)
Die folgenden Regeln sind die **festgelegte Soll-Richtung** для новых функций; sie **widersprechen nicht** dem bestehenden Code (Schicht 1), [Phase 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) (Gestaffelt Русалки, kein Gesamtgraph), [TODO § 1.4](/#/docs/adapterref/iobroker.autodoc/TODO.md#nachzuege) (News bei Default-Wechsel der States) или dem README - sie **präzisieren** nur, было лучше, чем Tendenz/Optionen.

| Тема | Планка |
| ----- | ----------- |
| **Образованные артефакты** | Погрузитесь в `/files/autodoc.0/`, про Lauf überschrieben, **kein** Anwachsen über Versionen. |
| **Необязательный экспорт** | ** `exportPath` bleibt immer opt-in** (не Пфлихтфельд). Schreibt **zusätzlich** zur `/files/`-Ausgabe; Мультихост: экспортируйте номер **Master** (берёт Ist). |
| **Портативный HTML (`file://`/NAS)** | **Kein CDN** для Керн-Доку; В автономном режиме доступны следующие функции: **встроенный SVG** (с высоким QR) или **относительный Pfade** из Assets **im selben Exportordner**. Reine `https://`-Verweise (Логотип в пользовательском шаблоне, внешние фотографии) können offline fehlen - **akzeptiert** или durch Nutzerwahl vermeidbar. |
| **Билдер** | **B + A:** вариант **SVG**/Textgrafiken im Generierten Pfad; **Фотографии** включают **внешние URL-адреса** и/или Dateien **nur** в **реальной Dateisystem** (например, не экспортируются HTML), **nicht** как Redis-lastigen «Загрузить в `/files/`». **D** больше, чем просто иконки. **C** (собственный адаптер-HTTP для активов) nur Falls sich ein Bedarf abzeichnet - **kein** Standard. |
| **Билдер** | **B + A:** вариант **SVG**/Textgrafiken im Generierten Pfad; **Фотографии** или **внешние URL-адреса** и/или Dateien **nur** в **реальной Dateisystem** (например, не требуется экспортировать HTML), **nicht** как Redis-lastigen «Загрузить в `/files/`». **D** больше, чем просто иконки. **C** (собственный адаптер-HTTP для активов) nur Falls sich ein Bedarf abzeichnet - **kein** Standard. |
| **Графен/Русалка** | Wie Phase 5.x: zuerst **kuratiert**; **Auto** с **klein** и **hartem Knotenlimit**. Для **экспортирования HTML** из внешнего JS-обновления: Darstellung **bevorzugt bei der Generierung nach SVG** (или gleichwertig eingebettet); Markdown-Export может быть задан **Mermaid-Quelltext**, если Pipeline einheitlich ist. |

**Важная информация:** Действующий **Базовый URL** для QR/"Ссылки для копирования" в **Онлайн-сценарии**; we **offline** eine Kopie braucht, nutzt `exportPath` und die Leitplanken zu selbstenthaltenden/relativen Medien - das sind **zwei gültige Nutzungsmodi**, kein Widerspruch.

### IoBroker-Backup и AutoDoc (Einordnung)
> **Hintergrund:** Nutzer fragen zuverlässig, ob die Doku «mit dem Normalen Backup weg ist». Курц: **Конфигурация и создание данных в ioBroker** ja - **дополнительный экспорт при дополнительном** и **внешнем входе**, когда дер Nutzer находится отдельно.

Ein **Standard-ioBroker-Backup** (entspricht dem, был `iobroker backup` bzw. das **Haupt-„ioBroker-Backup“** в [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) erzeugt) sichert laut js-controller/backitup-Dokumentation **Objects**, **States** und **Nutzerdateien** (virtuelles Dateisystem, например, VIS-Dateien und alles unter dem Datei-Adapter - damit typischerweise auch ** `/files/autodoc.0/` ** inkl.generierter HTML/MD/JSON).

| Датен | Типично в Standard-ioBroker-Backup? | Информация об AutoDoc |
| ----- | -------------------------------------- | ------------------- |
| Адаптер-Объект, вкл. AutoDoc-**Конфигурация** (`native`, Instanz) | ✅ | Einstellungen überstehen Восстановление |
| ** `documentation.exportHashes` ** | ✅ | Штат |
| Дата для ** `autodoc.0` ** в `/files/` (сгенерированный экспорт) | ✅ | «Последние» - Стенд zum Backupzeitpunkt |
| **Дополнительно `exportPath` ** (например, NAS, `D:\…`, крепление Außerhalb `iobroker-data`) | ⚠️ **nur wenn** dieser Ordner **vom gleichen Backup-Job** или einer **Host-/NAS-Sicherung** erfasst wird | Не работает **автоматически** в архиве ioBroker, когда используется стандартное резервное копирование |
| **Дополнительно `exportPath` ** (z.B. NAS, `D:\…`, Mount außerhalb `iobroker-data`) | ⚠️ **nur wenn** dieser Ordner **vom gleichen Backup-Job** или einer **Host-/NAS-Sicherung** erfasst wird | Не работает **автоматически** в архиве ioBroker, когда используется стандартное резервное копирование |
| **Внешние URL-адреса** (фотографии, Wiki, Cloud) и **Verweise** в Text/Markdown | Если **Ссылка/Текст** не будет найдена дата | Включите ссылку на URL-адрес: **eigenes** Backup der Quelle |
| **Historie-/Zeitreihen-DBs** (Influx, SQL, …), **Zigbee-/Coordinator-Dumps**, … | Включите **backitup** (или другой инструмент) **дополнительную** активацию | Нижняя часть «минимальных» резервных копий ioBroker |

**Architektur-Folge (Schicht 2):** AutoDoc muss **kein** eigenes Backup-Format erfinden; Каноническая документация находится в ** `/files/` ** и больших ** `documentation.*`-States** с **Platzhalter** - это проходит через ioBroker-Restore. ** `exportPath` ** является лучшим **zusätzlich** und erfordert bei Bedarf **eine zweite Sicherungsregel** (Заказ с NAS-Backup, rsync, …). Приготовленная **Фаза-5-Идея «Резервное копирование-Привязка»** (Doku aus einem ioBroker-Backup-Archiv erzeugen, typisch ** `.tar.gz` ** / [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup)) ist ein **anderes** Тема: Offline-Analyse/Migration - **kein Ersatz** für die Nutzer-Strategie «was sichere ich auf dem Host». Siehe [TODO - Резервное копирование / Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung).

<a id="architektur-medien-mvp"></a>

### Medien, Grafiken und externe Daten - festgelegte Arbeitsweise (MVP)
> **Значение:** «Так что, как можно» в ioBroker: **автоматическое определение** из объектов/анализа + **опционально** вручную (текст, ссылки, графические изображения) - **ohne** die interne DB (v.a. **Redis**) с фотографиями или нарисованными Blobs zu полный. **Vollständige Topologie/externe Lebenswelt** bleibt über **Links** und ggf. **BookStack/Wiki** abgedeckt (то есть в Zukunftsvision) - это **kein** Versagen des Adapters, Sondern **Scope-Grenze**.

**jsonl против Redis - что нужно для адаптера:** Настройка Nutzers не выполняется. AutoDoc **vermeidet Aufblähung** durch: (1) большой канонический вход в ** `/files/` **, (2) **keine** Volltext-Duplikation в больших ** `documentation.*`-States** (ab **0.9.39**), (3) **keine** Empfehlung, большой Binärdateien в `/files/autodoc.0/` abzulegen. **Redis:** hier gold die Leitplanke **streng**; **jsonl:** technisch toleranter, trotzdem **dieselbe** Nutzer-Empfehlung (einheitliches Verhalten, spätere Umstellung auf Redis ohne Überraschung).

| Бедарф | Festgelegte Lösung (MVP) | Ничего не известно о Фазе 5 / другие конкретные вопросы |
| ------ | ------------------------- | ----------------------------------------------- |
| **Фотографии, скриншоты, большой PNG/JPEG** | ** `https://`-URLs** в Markdown (`customDocSectionsJson`, `manualContext`, …) на NAS/Nextcloud/statischen Webspace - **kein** Загрузите большие данные в ioBroker-Dateischicht. | Собственный адаптер-**HTTP-Endpunkt** для активов (**Вариант C**) - **nicht** Standard, для оценки, если он уже используется. |
| **Портативная копия (`file://`, NAS-Ordner)** | Unter **§SSSSS_1§§** vom Nutzer einen Unterordner (z.B. `assets/`) anlegen, Dateien dortablegen, в Markdown **relative Pfade** nutzen (sofern vom Renderer unterstützt - sonst weiterhin URLs). | - |
| **Портативная копия (`file://`, NAS-Ordner)** | Unter ** `exportPath` ** от Nutzer einen Unterordner (z.B. `assets/`) anlegen, Dateien dortablegen, в Markdown **relative Pfade** nutzen (sofern vom Renderer unterstützt - sonst weiterhin URLs). | - |
| **Externe Daten / «perfekte» Gesamtdoku** | **URL-адреса и курсы** в адаптере; ausführliche externe Doku **verlinken**. | Alles in einen Адаптер **ziehen** - **nicht** Ziel. |

**Upload-UI / «wo klickt der Nutzer?» - beschlossen:** Es gibt **kein** отделяет AutoDoc-**Asset-Upload-Tab** в первой фазе загрузки. Ausreichend ist: Konfigurationstextfelder (Markdown) + ** `exportPath` ** + ggf. **Admin-Dateizugriff** на ** `/files/` ** для **kleine** Dateien (z.B. SVG). **Большие фотографии** nicht nach `autodoc.0` legen - в README ясно видны.

**Большие лимиты - beschlossen:** **Укажите** технические ограничения в коде адаптера как nächster Schritt. **Empfehlung** в Nutzer-Doku: alles, было под `/files/autodoc.0/` Liegt, **deutlich под ~500КБ про Datei** остановлено; bei Redis **strenger** (читает URL-адреса). Если устройство не работает или не поддерживает функцию поддержки, вы можете использовать **blockiert** keine weitere Arbeit.

**Ehemals Offen (Schicht 3) - damit erledigt für die Arbeitsplanung:** собственный HTTP-Handler или Subordner → **MVP ohne** zusätzlichen Handler; Upload-UI → **nein**, bis auf bestehende Felder; Большой лимит → **Мягкий лимит**, прежде чем перейти к жесткому лимиту.

<a id="multihost-plan"></a>

### Мультихост - анализ и анализ
В конфигурации ioBroker-Multihost-Setups (например, 2-3 Raspberry Pi):

> **Стандартное управление:** Предупреждение хоста, Просмотр хоста в администраторе-HTML, опционально - Экспорт файловой системы и специальные настройки HTML для удаления (siehe [TODO.md - Приложение / Многохостинг](/#/docs/adapterref/iobroker.autodoc/TODO.md#multihost-done)). История (Dev-Meeting 15 апреля 2026 г.): **Двойной выход** - требуется для администратора-Zugriff в `/files/`, а также необязательно для прямого управления Dateisystem-Zugriff (`exportPath`) - этот вариант Ansatz ist aktiv.

#### Был bereits funktioniert (kein Handlungsbedarf)
- `getObjectViewAsync('system', 'host', {})` → самые **все** хосты в центральной базе данных ✅
- `getForeignObjectAsync(host._id)` → использовать собственные данные (Node.js, OS) для **jeden** хоста ✅
- `instance.common.host` → welcher Adaptor auf welchem Host läuft, берется в `rawData` ✅
- `getForeignStateAsync('system.host.{hostId}.*')` → ОЗУ/ЦП для всех хостов ✅
- `host.common.npmVersion` в центральной базе данных → npm-версия для всех хостов, основная проблема ✅
- `writeFileAsync('autodoc.0', ...)` → получить доступ к ioBrokers zentrales File-API → перейти к мастеру ✅

#### Wo AutoDoc laufen soll: Мастер
AutoDoc **muss auf dem Master** laufen. Грюнде:

- `execSync('npm -v')` как локальный резервный вариант для собственного хоста - на главном сервере, на подчиненном устройстве не требуется
- Реализованный экспорт файловой системы в локальную файловую систему - на главном сервере, на подчиненном устройстве
- Der Master ist der Primäre Admin-Zugriffspunkt

**Объявление:** Предупреждение в журнале, когда AutoDoc находится на вашем хосте, а также о том, что хосты в системе не работают, а собственный хост больше не используется. Kein Hartes Blockieren - наш информатор.

#### Host-Zugehörigkeit в документации
**Umgesetzt:** `instance.common.host` wird ausgewertet; im **Admin-Profil** erscheint bei **mehr als einem Host** eine **Host-Distribution** (Карта про хост с мгновенными значками) над адаптером-таблицей; bei **Single-Host** bleibt das Layout ohne diesen Block.

**Entscheidung (реализовано):** Gruppierung nach Host statt nur einer zusätzlichen Tabellenspalte - klare Lastverteilung, kein Overhead bei nur einem Host.

```
┌─ Host: raspi-master ──────────────────────────┐
│  admin.0 · javascript.0 · autodoc.0 · ...     │
└───────────────────────────────────────────────┘
┌─ Host: raspi-slave1 ──────────────────────────┐
│  zigbee.0 · hm-rpc.0 · ...                    │
└───────────────────────────────────────────────┘
```

#### Экспорт файловой системы в многохостовой среде
- AutoDoc läuft auf Master → Export-Pfad auf Master-Filesystem → исправление
- Действия для Multihost-Nutzer: **NAS-Mount als Export-Pfad** - Löst gleichzeitig das ioBroker-Unabhängigkeits-Problem (NAS läuft auch wenn alle Pis down)
- Кейн Цванг - мы были в шляпе NAS, lässt das Feld leer

#### Русалочья топология (Фаза 5+)
Автоматическое создание Topologie-Graph с использованием Daten - обработка всех Daten (адаптер-адаптер на общем хосте) bereits vorhanden. Zurückgestellt für Phase 5.

```
Master → Slave1 (zigbee.0, hm-rpc.0)
       → Slave2 (sonos.0, unifi.0)
```

### Хотите, чтобы Архитектура была полностью завершена, um weiterzumachen?
- **Schicht 2** (Leitplanken) + **Medien-MVP** (Abschnitt oben) и **verbindliche** Zielbeschreibung für alles Weitere - es fehlt **kein** weiterer Architektur-Block, bevor **Phase 5 / 5.x** gearbeitet wird.
- **Фаза 5** уже **Umsetzung** (PDF, Backup-Archive / Backitup-Anbindung, Rest Custom Templates; **Mermaid-Stufen** ✅) **innerhalb** dieser Leitplanken - nicht „noch mehr Architekturraten“, sondern Features bauen und ggf. README pflegen.
- Примечание: **npm-/Repository-Release** ([TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit)) ist **Prozess**, nicht Architektur - kann Parallel ordavour Ligen, je nach Priorität.

<a id="architektur-naechste-schritte"></a>

### Nächste Schritte (empfohlene Reihenfolge)
1. ~~**Nutzer-Doku (README)** - kurzer Abschnitt **“Medien & Redis“** (программные ограничения, количество фотографий на URL-адрес, `метаданные`; подробности в ПЛАНЕ) - **erledigt**.~~
2. ~~**Особенности** в [TODO § 1.5](/#/docs/adapterref/iobroker.autodoc/TODO.md#todo-festlegt-umsetzung): **Системная карта** и **KI + сценарий сценария, вариант A** - **erledigt** (0.9.12).~~ **Вариант B** (Backup-Analyse) выполнить **Backup-Anbindung** ([TODO - Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung), [§ 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) гекоппельт.
3. **Feature-Reihenfolge (Projekt):** [TODO - abgestimmte Umsetzungsreihenfolge](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit) - ~~**5.x.1-5.x.3**~~, ~~**PDF**~~ **0.9.33** ✅, ~~**Фаза B Doku-UX**~~ **0.9.48** ✅, **npm** **0.9.48** (Происхождение). **Дополнительные возможности:** **ioBroker.repositories** (**W4001**), а также Phase‑5‑**Rest** (**Backup**/Backitup, необязательно DnD) - [TODO § 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features).
4. **Проверка адаптера** и **Прослушивание обновлений** в новых версиях npm ([TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung)).
5. ~~Необязательно **По умолчанию `documentationStatesMode` ** auf `metadata` **mit** `io-package` news ([TODO § 1.4](/#/docs/adapterref/iobroker.autodoc/TODO.md#nachzuege))~~ - **0.9.38** ✅; **0.9.39** добавлен `documentationStatesMode` / `full` vollständig
6. **Дополнительно (необязательно):** HTTP-Asset-Endpunkt, Harte Limits, eigenes Asset-UI - nur bei **realem** Bedarf und dann als **Schicht-2-Erweiterung** im PLAN nachziehen.

---

## Bewusst weggelassen
| Особенность | Грунд |
| --------------------------------------------- | ------------------------------------------- |
| Ungefilterte Groß-Grapen (Скрипт/Состояние без ограничения) | Bewusst nicht als «Komplett-Graph»; **Русалка** здесь [Фаза 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md) (курорт → клейн и авто) |
| Дополнительный анализ кода для Abhängigkeiten | Fehleranfällig, unverhältnismäßiger Aufwand |
| REST-API/Вебхуки | Если JSON-шапка может быть занята |
| Домашняя интеграция Alexa/Google | Кейн Безуг к документации |
| Аналитика/Адаптер-Популярность | Kein Документация-Функция |
| Мобильное приложение | Außerhalb des Scope |
| Совместные функции | Außerhalb des Scope |

---

## Ausbaustufen Zusammenfassung
| Версия | Вдох | Статус | Анмеркунг |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------- |
| **v0.x** | Основа: Адаптер-Инвентарь, Экспорт, Профиль, Управление версиями | ✅ главная | интерн Майленштайн |
| **v0.9.x** | RC-функции до **0.9.48** (Профиль, Мультихостинг, KI, Пользовательские шаблоны, 5.x.1-5.x.3, Фаза B Doku-UX) - Подробности README-Changelog | ✅ `main` (= `dev`) | |
| **v1.x** | Фаза 5-Отдых (Резервное копирование, DnD); опционально 5.x.2-Feinschliff, введите Diagnose-Signale | ⬜ геплант | [TODO § 1.2-1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |
| **v1.x** | Фаза 5-Отдых (Резервное копирование, DnD); опционально 5.x.2-Feinschliff, введите Diagnose-Signale | ⬜ геплант | [TODO § 1.2-1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |