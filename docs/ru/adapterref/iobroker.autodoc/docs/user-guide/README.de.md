---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/docs/user-guide/README.de.md
title: AutoDoc - Конфигурация мгновенного действия (Wiki)
hash: viI8XLWD5IAuoyOtPLLqYN5+rxZf5rJvaR9nY/flgM0=
---
# AutoDoc - Конфигурация мгновенного действия (Вики)
На этом веб-сайте отображаются **Betreuer** и **Haus-Admins**, **AutoDoc-Instanz** im ioBroker-Admin einrichten: Sie beschreibt die **Registerkarten**, был типичным пользователем и **Screenshots** zur Orientierung.

**Inline-Hilfe** в поле под администратором (`jsonConfig`) должен быть **fachliche Referenz** - эти данные ergänzt sie um **Überblick, Bilder und ein Übungsszenario**. **Документация Klickbare:** В Instanz-Tabs zeigt AutoDoc для использования **собственных GitHub-Links** (нет или Fließtext в der `?`-Tooltip-Hilfe - не все URL-адреса больше не используются).

**Je nach Link** öffnet sich im Browser **nicht immer Dieselbe GitHub-Datei:** **Einordnung** (Tabs, Sprache, Basis-URL, PDF, **Kapitelreihenfolge/Ausblenden**, Zusatzkapitel-JSON) → **Wiki DE** (`README.de.md`); **Lange Copy-Paste-Kochbücher** (Mermaid, JSON-Felder, CSS) → **english Haupt-[README](/#/adapters/autodoc)**. Дарунтер в **Übungsszenario** gibt es zusätzlich **dieselben Themen** noch einmal mit **Screenshots** - dort weiterhin die Wiki-Anker ** `#wiki-step…` ** / ** `#wiki-admin…` **.

Я являюсь администратором с **Instanz-Konfiguration** и **Zusätzliche Markdown-Kapitel** zwei **getrennte** Links - erster Sprung **[Registerkarten](#wiki-overview-registerkarten)**, zweiter **[Schritt 4 - Пользовательские разделы](#wiki-step4-custom-sections-json)**. Чтобы получить текстовую отметку на дизельном топливе в адаптере, необходимо указать «Мгновенную настройку» в течение 4 секунд.

## Schnellzugriff - с административными ссылками (например, ссылка: Wiki DE или README EN)
Die **sieben** dokumentierten Hauptthemen im **Schnellzugriff** unten (**vier** deutschsprachige Wiki-Anker ** `README.de.md` **, ** `id=` ** gesetzt · **drei** englische Kochbuch-Sprünge ins Haupt-`README.md`) verlinken ** `blob/main/…` ** (Tagesarbeit der Maintenance of Branch ** `dev` **). **Важная информация:** Чтобы получить мгновенный доступ, нажмите ** `staticLink` **-Zeilen (z.B. Tab **HTML-Export**, Unterabschnitt **Sichtbare Kapitel (je Profil)**: dort **README - JSON-Kochbuch** и прямой доступ к **Wiki ДЭ - Шритт6**).

**Wiki DE** (`blob/main/docs/user-guide/README.de.md`, Markdown-**Vorschau**, праздник ** `id=` **):

- [Язык документации и изменения](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-doc-lang)
- [Открытый Basis-URL/QR](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-step3-qr-base-url)
- [Экспорт PDF (Puppeteer)](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-pdf-export)
- [Шритт 6 - Kapitelreihenfolge или ausblenden](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)

**English Haupt-README - Kochbuch** (`blob/main/README.md`, Überschriften-Slugs, Sprung **лучшая попытка**):

- [Mermaid-Kochbuch](/#/adapters/autodoc#mermaid-cookbook-examples)
- [JSON-Kochbuch](/#/adapters/autodoc#json-cookbook-snippets)
- [HTML - Шрифт и CSS](/#/adapters/autodoc#html-custom-css-examples)

**Technische Grundlagen** (Systemvoraussetzungen, Projektbeschreibung) stehen ebenfalls im english Haupt-[README](/#/adapters/autodoc). **Сценарий и снимки экрана** для Mermaid/JSON/HTML/CSS: используйте несколько дат (**Список 4-7**) и используйте ** `#wiki-step5-mermaid` **. - die **Admin-Kochbuch-Links** zeigen bewusst auf die **englischen** Schnipsel-Abschnitte.

**Мгновенные ссылки (`staticLink`):** Die **Ziele** entsprechen der Schnellzugriffsliste (`blob/main/…`); gleiche Links können **an mehreren** Tab-Stellen erscheinen (es gibt **также mehr** klickbare Zeilen als die **sieben** Themensprünge der Überschrift). Repo-Wurzel-URL с `#…` bleibt unzuverlässig - погрузить ** `blob/main/…` **. Nach großen Umbauten **Slugs** и ** `admin/jsonConfig.json` ** prüfen.

**Häufiger Fehler:** ** `raw.githubusercontent.com/…/README.md` ** ist nur **Plaintext** - общедоступные функции ** `#…`-Sprünge praktisch nicht**. Откройте **GitHub-Vorschau** (`github.com/…/blob/<branch>/…#.…`), где установлены ссылки администратора.

**Sprungmarken:** Ziele wie ** `#wiki-admin-pdf-export` ** и ** `#wiki-step3-qr-base-url` ** sitzen auf ** `h2`/`h3` с праздником `id=` ** - прокрутите GitHub-Vorschau и прокрутите страницу до конца, пока она будет распечатана ** `<a id="…"></a>` ** ohne Überschrift (часто называется «immer Seitenanfang»).

**«В новой вкладке отключена»:** Der Link и das ** `#…` ** будут исправлены - мы будем использовать GitHubs Markdown-Vorschau manchmal **oben**, когда сайт **асинхронно** визуализируется и браузер в Sprung **vor** dem Ziel im DOM ausführt ([bekanntes Verhalten](https://github.com/github/markup/issues/1807), не имеет значения «собственный браузер»). **Возможно:** для ввода адреса **Введите** (Hash erneut anwenden), нажмите **F5**, или ссылка **на вкладке ** будет отключена.

**Anker-ID-Referenz (wartungsfest):** **Haupt-README:** `#mermaid-cookbook-examples`, `#json-cookbook-snippets`, `#html-custom-css-examples` - исправление ** `###`‑Slug-Namen**, nicht хрупкий Zeilennummern. ** `README.de.md`:** и. а. `#wiki-admin-doc-lang`, `#wiki-overview-registerkarten`, `#wiki-step3-qr-base-url`, `#wiki-admin-pdf-export`, `#wiki-admin-json-cookbook`, `#wiki-admin-html-css`, `#wiki-step4-custom-sections-json` (альтернативный вариант Lesezeichen mit langem ** `#schritt-4--…`‑Slug** oft zuverlässiger), `#wiki-step5-mermaid`. **Nach Umbauten** IDs и ** `admin/jsonConfig.json` ** воздержание (Pflegehinweis auch als HTML-Kommentar vor der Lizenz im Haupt-[README](/#/adapters/autodoc)). Unter der Repo-Wurzel `#…` шляпа nur ** `### Optional PDF export …` ** zufällig denselben Slug wie `#optional-pdf-export-puppeteer` geliefert; die anderen Kurz-Hashes passten dort nicht - oder Springen im **Blob**-Viewer trotzdem nicht zuverlässig.

**Отключенный момент:** **Мгновенный** → Ihre AutoDoc-Instanz → **Schraubenschlüssel** (Конфигурация).

**Zu den Bildern:** Wo ein **SVG** steht, beschreibt es die **Tab-Struktur** Schetisch; der **Скриншот** darunter zeigt Dieselbe Stelle в der **echten Oberfläche** (Демо). В GitHub вы можете просмотреть Vorschauen часто - Bild в новой вкладке или увеличить ее. Обратите внимание на **Aufnahmen, Verpixelung und Datenschutz** sowie **wann neue Screenshots notig sind**: **[`SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)**.

---

<h2 id="wiki-admin-doc-lang">Курц Haupt-README (Betrieb)</h2>

- **Documentationssprache** (Grundeinstellungen): использовать все текстовые описания и праздничные тексты в **всех HTML-профилях** и в Markdown; auch die **Kurzzeilen** für Inventarvergleich («изменения с момента последнего запуска») и für **Changelog**-Karten beim erneuten Erzeugen - ältere gespeicherte Changelog-Zeilen erscheinen в der **aktuellen** Export-Sprache. Подробности: gleicher GitHub-Sprung wie unter **"Schnellzugriff"** → *Dokumentationssprache & Deltas*.
- **Изменить → Включить «Änderungen seit letztem Lauf»** (`hideAdminDeltaSinceLastRun`): добавить **gelbe Delta-Box** в **Admin**-HTML-Systemübersicht и пройти мимо блокировки в **Admin**-Markdown aus; **Журнал изменений**, Пользователь и адаптация должны быть неизвестны.
- **Пользователь/Семья**: bei **echten** Inventaränderungen seit dem letzten Schnappschuss (nicht beim ersten Lauf) erscheint ein kurzer **Alltagssatz** unter dem Titelblock - **Onboarding** nicht.
- **Основной URL-адрес / QR / «Ссылка для копирования»**: Dieselbe Einstellung wie der Browser-Zugang zum Admin, **ohne** Slash am Ende; nach Änderung **Документация**. Ausführlich: **«Schnellzugriff»** → *Öffentliche Basis-URL/QR*.

<h3 id="wiki-admin-pdf-export">Экспорт PDF (Puppeteer)</h3>

- **PDF**: дополнительный ** `кукловод` ** в **Adapterverzeichnis**; Используйте **Erweitert** или Datenpunkt ** `action.exportPdf` **. Зихе **«Шнельцугриф»** → *Экспорт в PDF (Кукловод)*.
- **Dateisystem-Export / Docker**: Host-Ordner einbinden und im Adaptor den **Container-Pfad** eintragen - Kurzhinweis auch in der Feldhilfe.
- **Большой список / Redis:** Большой список или бинарный файл **nicht** также как **State-Werte** в **Объектном банке** - в Backend **Redis** требуются большие Blobs в оперативной памяти. Используйте **внешние URL-адреса** или обычные **SVG**. AutoDoc legt Volltext ohnehin nur unter ** `/files/` ** ab; ** `documentation.markdown` / `.html` / `.json` ** и **kurze Platzhalter** (kein Ersatz für Medienspeicher) - здесь [PLAN.md - Medien (MVP)](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp).

---

<h2 id="wiki-overview-registerkarten">Регистрационная карта - было ли это плохо?</h2>

1. **Grundeinstellungen** - **Projektname** и **Documentationssprache** (все экспортированные); welches **Markdown-Profil** Standardmäßig erzeugt wird; **wann** neu Generiert Wird (Start, Zeitplan, Adaptänderungen).
2. **Моя документация** - **Leser-Texte** für Familie und Gäste (Notizen, Abläufe, Playbook); опционально **Notfall-Kurzzeilen**; необязательные **Русалка** и **Автоматическая топология хоста**; Фильтр «был установлен» для пользователя и онбординга.
3. **Erweitert** - **Базовый URL** для QR/ссылок; Гренцен (z.B. nur aktivierte Instanzen); **Экспорт в систему дат**; необязательный **PDF**; **Doku-Setup-Score**; Примечание: вы можете экспортировать файлы в ** `/files` **, Штаты или Platzhalter.
4. **HTML-Экспорт и Zusatzkapitel** - **Erscheinungsbild** (Тема, Логотип); **Kapitelreihenfolge und Ausblenden** je Profil (**JSON**); **eigene Markdown-Kapitel** (`customDocSectionsJson`); необязательные **Schriftart** (`htmlFontStack`) и **zusätzliches CSS** (`htmlExtraCss`, без экспорта HTML) - Добавление и выбор: **„Schnellzugriff“** → *HTML - Schrift & CSS*; PDF-Schalter unter **Erweitert**.
5. **Benachrichtigungen** - дополнительный Nachricht nach erfolgreicher Generierung (abhängig vom Messaging-Adapter).
6. **KI-Dokumentation** - если это актуально, если **Anbieter aktiv** ist; sonst bleiben die Felder ohne KI-Wirkung.

Nach inhaltlichen Änderungen: **Documentation Generieren** (Кнопка или Datenpunkt ** `action.generate` **) auslösen или yingestellten Timer abwarten.

---

## Скриншоты вкладок
**SVG + PNG используется:** Схема отображается в реальном пользовательском интерфейсе (демонстрационный экземпляр; макет может быть изменен в версии администратора).

![Grundeinstellungen - схема überblicksartiges](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-grundeinstellungen.svg)

*Echte Admin-Oberfläche (Demo-Instanz; je nach Theme/Version abweichend):*

![Grundeinstellungen - Скриншот](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-grundeinstellungen-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

![Основная документация - Freitext- und Diagrammbereiche (схема)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-meine-dokumentation.svg)

*Echte Admin-Oberfläche - **Моя документация** - это длинный свиток; vier Скриншоты **von oben nach unten** (Демо):*

**1/4 -** Projekt, Kontakt & Hinweise; Hilfe & Abläufe (Клартекст).

![Моя документация - Скриншот (1/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**2/4 -** Сборник правил, опционально **Mermaid**-Диаграмма, автоматическая топология хоста, Notfall-Kurzzeilen (WLAN/Strom/Wasser).

![Моя документация - Скриншот (2/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-2.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**3/4 -** Kurzzeile Sonstiges (опционально); Адаптер и уведомление.

![Моя документация - Скриншот (3/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-3.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**4/4 -** Выбор/адаптер для профиля (адаптация или пользователь/семья); Внутренний JavaScript-Dateinamen для гостей.

![Моя документация - Скриншот (4/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-4.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

![Erweitert - Basis-URL и Hinweise (Schema, Beispieldomain)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-erweitert-basisurl.svg)

*Echte Admin-Oberfläche - вкладка **Erweitert**, длинный прокрутка; zwei Скриншоты **von oben nach unten** (Демо; **Basis-URL** и Exportpfade nur **Beispiele**):*

**1/2 -** Инхальт и Гренцен; **Экспорт в Дайтеен** (Платцхалтер в `documentation.*`); необязательный **Базовый URL**.

![Эрвейтерт - Скриншот (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**2/2 -** **Doku-Setup-Score**; опционально **Dateisystem-Export**; **PDF nach jedem Lauf** (Кукловод/Chromium).

![Эрвайтерт - Скриншот (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin-2.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

*Echte Admin-Oberfläche - Вкладка **HTML-Export & Zusatzkapitel**, скриншоты **von oben nach unten** (Демо). Im Einleitungstext Hinweis auf **PDF** (Schalter unter **Erweitert**). Для дополнительных репозиториев: URL-адреса логотипов и текстовые сообщения в **eigenen** Zusatzkapiteln durch **generische Beispiele** ersetzen.*

**1/3 -** Информация: **Фарбсхема** и **Предустановка** (HTML), опционально **URL-адрес логотипа** (Seitenleiste).

![HTML-экспорт и Zusatzkapitel - Скриншот (1/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**2/3 -** **Администратор**: Глава и поддержка главы (**JSON**). **Пользователь/Семья**: ausgeblendete Kapitel & Reihenfolge (**JSON**).

![HTML-экспорт и Zusatzkapitel - Скриншот (2/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-2.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**3/3 -** **Внедрение**: ausgeblendete Kapitel & Reihenfolge (**JSON**); **eigene Markdown-Kapitel** (**JSON**-Objecte); несколько дополнительных советов по использованию CSS.

![HTML-экспорт и Zusatzkapitel - Скриншот (3/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-3.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

*Echte Admin-Oberfläche - Tab **Benachrichtigungen** (необязательно; bei Bedarf **überspringen**). **Instanznamen**, Empfänger und Vorlagen in **öffentlichen Repos** nur mit **Platzhaltern** ausfüllen orer weglassen.*

![Бенахрихтигунген - Скриншот](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-benachrichtigungen-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

*Echte Admin-Oberfläche - Вкладка **KI-Документация**, длинный прокрутка; **Zwei Скриншоты от oben nach unten** (Демо). **Datenschutz-** и **Hardware-Hinweise** в пользовательском интерфейсе с лучшими адаптерами - Cloud‑Anbieter nur nutzen, wenn das für euch passt.*

**1/2 -** Anbieter & Modell, **Ollama-Basis-URL**, Anfrage-Timeout.

![КИ-Документация - Скриншот (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

**2/2 -** **KI-Kontexthinweise** (nur für die Anfrage); **Температура**; Подпишитесь на **«KI erklärt JavaScript-Skripte»**.

![КИ-Документация - Скриншот (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin-2.png)

*Дополнительно: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (стенд **2026-05**).*

---

## Wo Liagen Die Fertigen Exporte?
- Все профили (администратор/пользователь/регистрация-HTML, Markdown, JSON) в ** `/files/autodoc.<instanz>/` **, u. а. `autodoc-latest.*` и Bei Bei Bedarf **ältere** zeitgestempelte Dateien.
- Датенпункте з. Б. ** `info.htmlUrlAdmin` ** / ** `Пользователь` ** / ** `Онбординг` **, ** `info.lastGeneration` **.
- ** `documentation.exportHashes` ** - SHA‑256‑Hex для «последнего» экспорта (Markdown, Admin-HTML, JSON); nach **PDF**-Lauf zusätzlich die ** `autodoc-*.pdf` **.

**Speicherlayout:** Volltext Liegt **nur** unter ** `/files` **; ** `documentation.*`-States** с **kurze Platzhalter** (адаптер для стойки **0.9.43**). Мы автоматизируем привязку: Volltext aus ** `/files` **, ** `info.htmlUrl*` ** или загрузочные действия.

---

## Übungsszenario: «Muster-Einfamilienhaus»
> **Nur Übung:** Alle Werte sind **frei erfunden**. Вы можете указать **Адрес**, **WLAN-шлюз**, **внутренние IP-адреса**, **Форум-карту** или сообщения о продуктах в «Снимках экрана» или Git übernehmen - «liber **Platzhalter**» и собственные **локальные** сообщения.

**Ausganglage:** Zweistöckiges Einfamilienhaus mit ioBroker (**Heizszenen**, Licht ua in **Wohnzimmer**, **Treppenhaus**, Kinderzimmer), ergänzend z. B. Использование KNX - это **nachvollziehbare Beispieltexte**, nicht um echte Hausdaten.

<h3 id="wiki-step1-basis">Шритт 1 - Основа</h3>

- Projektbezeichnung: z. Б. **"Musterhaus Schulweg"** (keine echte Anschrift).
- Язык документации: **DE**.
- Nach Änderungen Minestens einmal **Документация**.

### Schritt 2 - Gäste & Familie (вкладка «Моя документация»)
- ** `guestHelpNote` **: Stichworte (**Notfallkontakt**, **Sicherungen**, **Gäste-WLAN getrennt vom Hauptnetz** - теперь это было сделано, поэтому документация будет выполнена).
- Опционально **Kurzzeilen** WLAN/Strom/Wasser.
- ** `ownerPlaybookNote` **: wenige Stichpunkte aus dem Alltag (z.B. **Warmwasser** ext nach …).
- Felder dürfen **leer** bleiben - ohne eure Texte füllt sich nichts von alleine.

<h3 id="wiki-step3-qr-base-url">Шритт 3 - QR &amp; Ссылка (вкладка Erweitert)</h3>

**Basis-URL** = исходный адрес, с **ihr** администратором в браузере (**https://…** или **http://host:8081**), **ohne** Schrägstrich am Ende. Danach Wieder **Документация**. Проверьте работу **Heim-WLAN**, ничего не будет показано. Ausführlicher: **«Schnellzugriff»** доступен → *Öffentliche Basis-URL/QR*.

<h3 id="schritt-4--zusätzliches-markdown-kapitel-tab-html---zusatzkapitel--custom-sections-customdocsectionsjson"><span id="wiki-step4-custom-sections-json"></span>Schritt 4 - Zusätzliches Markdown-Kapitel (Пользовательские разделы, JSON)</h3>

В поле: нужные **JSON-Array** с объектами `title`, `body`, необязательные `profiles` - Platzhalter и Hilfetext в Admin Beachten.

**Weitere Beispiele** (Reihenfolgen, Ausblenden, zweites Mermaid-Muster): **"Schnellzugriff"** → *JSON-Kochbuch* und *Mermaid-Kochbuch* (англ. README); Schritt‑für‑Schritt Ausblenden/**Reihenfolge-Einstieg**: **«Schnellzugriff»** → [Schritt 6 - Wiki DE](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook).

```json
[
  {
    "title": "Musterhilfe Gast-WLAN",
    "body": "Beispieldaten: Hier steht später _Ihr_echter Hinweistext (Markdown)._",
    "profiles": ["onboarding", "user"]
  }
]
```

Максимальное количество **12** очков; sehr lange Texte werden beim Erzeugen gekürzt.

<h3 id="wiki-step5-mermaid">Шритт 5 - Необязательная Русалка (вкладка «Моя документация»)</h3>

Platzhalter im Feld überschreiben. **Копировать-Вставить-Диаграмму:** **«Шнельцугриф»** → *Русалка-Кохбух*.

При установке **Mermaid-CLI** можно использовать диаграммы в формате **SVG** в формате HTML (offlinefreundlich). Любой CLI или любой другой элемент `<pre class="mermaid">` и браузер могут быть загружены **jsDelivr** - здесь есть административная информация.

**Добавление:** Капитель-ID ** `mermaid` ** (вручную) и ** `mermaidAuto` ** (внутренний Auto-Host-Graph) в оригинальном **Добавлении** - прослушивание.

<h3 id="wiki-admin-json-cookbook">Шритт 6 - Kapitelreihenfolge oder ausblenden</h3>

Вкладка **HTML-Экспорт и Zusatzkapitel**: je Profil (Администратор/Пользователь/Семья/Онбординг) gibt es zwei Arten Felder:

- ** `…HiddenChaptersJson` ** - Глава komplett **ausblenden** (fehlen dann auch im gleichen Profil unter **Markdown**).
- ** `…ChapterOrderJson` ** - **Reihenfolge** nur für für Kapitel, die nicht versteckt sind.

Die **Felderhilfe (`?`)** bleibt die **Kanontabelle** der erlaubten English Kapitel-**Ids** für dieses Profil; diese Wikiseite ergänzt **Rezepte**.

### Эрстер Грифф: weniger Pflege durch Ausblenden
Wenn ihr eine Doku nur **„kürzer“** haben wollt, probiert часто zuerst **Ausblenden** statt neue Sortierung zu pflegen («первый weglassen, dann umsortieren»). **Gültige Ids:** находятся в ** `?`‑Tooltipps** в уникальном поле JSON (**Администратор**/Пользователь/Ввод в систему). Bei **Admin** gibt es zusätzlich die Ausblend-Id ** `mermaidAuto` ** (nur Auto-Host‑Topologie im Handbuchteil); das **von euch geschriebene** Русалка лежит в Kapitel ** `manual` ** - es komplett zu entfernen geht dort über ** `manual` ** в Ausblenden-Liste (wie jedes andere Admin‑Kapitel auch). Я **Пользователь**‑Профиль, в котором нет Hilfen ausdrücklich ** `mermaid` ** и ** `mermaidAuto` ** eigene Listinträge.

Копировать-Вставить-Beispiele (z.B. nur Changelog weg или User-Skript-Kapitel aus): **"Schnellzugriff"** → [JSON‑Kochbuch (англ. README)](/#/adapters/autodoc#json-cookbook-snippets).

### Reihenfolge - wie die Logik gedacht ist
- ** `[]` ** или прочитайте ⇒ **Стандартные настройки** адаптеров (**Quellcode‑Referenz** `USER_HTML_CHAPTER_KEYS` / `DEFAULT_ADMIN_CHAPTER_ORDER` / `ONBOARDING_HTML_CHAPTER_KEYS` в `lib/docTemplateConfig.js` - Änderungen im Produkt sollten dort und im JSON‑Kochbuch nachgezogen werden).
- Их текст может быть изменен как **JSON‑Array** в Reihenfolge ein. **Все идентификаторы, которые вы используете**, поместите AutoDoc в отдельные продукты **подсказки** - они должны быть включены в ваш список (außer ihr wollt eine **strikt geschlossene** Reihenfolge).
- ** `Unbekannte` oder falsch geschriebene** Ids (**Groß-/Kleinschreibung** zählt; z.B. `atAGlance`) werden **still übersprungen** - bei „Ändert nichts“, zuerst Tippfehler prüfen.

### Мини‑Резепт: zwei User‑Kapitel nach vorn holen
Nur zwei Ids angeben genügt, um sie **vor** den Rest zu setzen; Адаптер был закреплен в соответствии со стандартными требованиями. Коды: ** `guestHelp` ** и ** `manual` ** можно использовать для профиля пользователя:

```json
["guestHelp", "manual"]
```

Vollständige **volle Reihenfolge** (bei Bedarf kopieren für User‑Profil, Stand Code wie oben beschrieben):

```json
["manual", "ai", "guestHelp", "atAGlance", "rooms", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "system", "troubleshooting"]
```

### Wo noch mehr Schnipsel stehen
- **«Schnellzugriff»** → **[JSON‑Kochbuch](/#/adapters/autodoc#json-cookbook-snippets)** (Удален администратором, нажмите Hidden‑Listen, ** `customDocSectionsJson` ** …).
- Gleicher Abschnitt im **Übungsszenario**, чтобы увидеть **Скриншоты** verknüpfbar.

Nach Änderungen: **Documentation erzeugen** и einen Export-Link (`info.*Url*`) kurz prüfen.

<h3 id="wiki-admin-html-css">Schritt 7 - Необязательно: Schrift &amp; использование CSS</h3>

Nur für den **HTML**-Export (вкладка **HTML-Export & Zusatzkapitel**, Bereich **Необязательно: Эйджин Шрифт и CSS**). Die **Tooltips** (`?`) включает **Copy-Paste-Starter**; Hintergrund und Selektoren (`nav`, `nav ul li a`, …): **«Schnellzugriff»** → *HTML - Schrift & CSS*. Nach Änderung wieder **Документация**.