---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/docs/user-guide/README.md
title: AutoDoc - руководство пользователя (первые шаги)
hash: IHmoFDczSkP1TvD53BSSa+vUYbd8Dm0xkgMZutnbyV0=
---
# AutoDoc - руководство пользователя (первые шаги)
Структурированная справка для **операторов**, которые устанавливают и запускают адаптер из [Репозиторий GitHub](https://github.com/crunchip77/ioBroker.autodoc).

- **Немецкая** вики - Вкладки администратора, скриншоты, вымышленный **„Muster‑Einfamilienhaus“** сценарий для практики: **[`README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)**

**Изображения:** Для нескольких вкладок вы получаете **два изображения подряд**: **SVG-макет** (что где находится - не реальные пиксели), а затем **PNG** реального административного интерфейса (все шесть вкладок охвачены). Такое сопоставление **намеренное**. Если встроенные изображения кажутся маленькими на GitHub, **откройте изображение в новой вкладке** или увеличьте масштаб страницы; см. **[[[Скриншоты.md]](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** (*Читабельность*, **когда нужно переснять**, конфиденциальность). Именование и конфиденциальность: один и тот же файл. Подсказки для каждого поля в административной панели (`?`) остаются авторитетными. Обзор проекта: **[README]](/#/adapters/autodoc)**.

## Предварительные условия
- **Node.js** ≥ 22
- Версии ioBroker, указанные в файле README в разделе **Требования**.

## Установка (URL / клонирование)
Установка производится через [npm ** `iobroker.autodoc` **](https://www.npmjs.com/package/iobroker.autodoc), URL Git / клонирование или (после слияния запроса на изменение **ioBroker.repositories**) список адаптеров по умолчанию в административной панели ioBroker - см. основной README **Установка**. Списки по умолчанию хранятся в **[ioBroker.repositories]](https://github.com/ioBroker/ioBroker.repositories)**. После добавления экземпляра откройте **Экземпляры → AutoDoc.X → Конфигурация**.

## Вкладки администратора (что настраивать в первую очередь)
1. **Основные настройки** - название проекта, язык документации, предпочтительный профиль Markdown, таймеры и триггеры («Сгенерировать…»).
2. **Ручная документация («Моя документация»)** - текст, понятный пользователям (`guestHelpNote`, руководство пользователя, краткие инструкции по устранению неполадок). Дополнительные диаграммы **Mermaid**: см. справку по полям (встроенный SVG или резервный вариант в браузере/CDN).
3. **Расширенные настройки** - необязательный **путь экспорта в файловую систему**, необязательный **PDF-файл после каждого запуска** (требуется ** `puppeteer` **), ** `documentation.exportHashes` ** (краткое описание ниже); большие экспортируемые файлы всегда находятся в ** `/files/` ** (см. подсказку администратора).
4. **Экспорт HTML и дополнительные разделы** - темы оформления, видимость/порядок глав, пользовательские разделы; вводный текст на этой вкладке также указывает на настройки **PDF** (они находятся в разделе **Дополнительно**).
5. **Уведомления** / **Искусственный интеллект** - необязательно; включение возможно только по желанию.

### Рисунки
**SVG-макеты** и **PNG-скриншоты** специально подобраны в пару: SVG - это **схема** той же вкладки; PNG - это **реальный** вид административной панели (демо-версия; макет может отличаться в зависимости от темы/версии). Встроенный предварительный просмотр GitHub часто уменьшает изображения - **перейдите по ссылке** к файлу в полном разрешении или используйте масштабирование браузера, чтобы прочитать мелкие надписи.

![Основные настройки - схема](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-grundeinstellungen.svg)

*Реальный административный интерфейс:*

![Вкладка «Основные настройки» - скриншот](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-grundeinstellungen-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

![Моя документация - схема](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-meine-dokumentation.svg)

*Реальный административный интерфейс (демо-версия; **Моя документация** представляет собой длинный список из четырех скриншотов, сверху вниз):*

**1/4 -** Проект, контакты и заметки; тексты для помощи гостям и повседневной автоматизации.

![Моя документация - скриншот (1/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**2/4 -** Руководство пользователя, опциональная схема **Русалка**, автоматическая топология хоста, аварийные однострочные команды (WLAN / питание / вода).

![Моя документация - скриншот (2/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-2.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**3/4 -** Краткая строка «разное» (необязательно); примечания для каждого адаптера и каждой комнаты.

![Моя документация - скриншот (3/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-3.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**4/4 -** Скрытие комнат или адаптеров для каждого профиля (при регистрации или для пользователя/семьи); видимость имен файлов JavaScript для гостей.

![Моя документация - скриншот (4/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-4.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

![Расширенные настройки - схема базового URL (фиктивный хост)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-erweitert-basisurl.svg)

*Реальный административный интерфейс (демоверсия; **Расширенные настройки** - это длинная прокрутка - два скриншота, сверху вниз). **Базовый URL** и пути экспорта - это **заглушки**, а не ваша реальная сеть.*

**1/2 -** Ограничения на контент; **экспорт в файлы** (короткие заполнители в состояниях `documentation.*`); необязательный **базовый URL** для целей закладок/QR-кодов.

![Вкладка «Дополнительно» - скриншот (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**2/2 -** Документация: параметры **настройки оценки**; необязательный путь **экспорта в файловую систему**; **PDF после каждого запуска** (Puppeteer / Chromium).

![Вкладка «Дополнительно» - скриншот (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin-2.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

*Реальный административный интерфейс (демоверсия; вкладка **HTML-экспорт и дополнительные главы** - три скриншота, сверху вниз). В вводном тексте упоминается **PDF** (переключатели находятся в разделе **Дополнительно**). Замените URL-адреса логотипов / текст демонстрации пользовательских глав своими собственными заполнителями для публичных репозиториев.*

**1/3 -** Внешний вид: HTML **цветовая схема** и **предустановленные** параметры, опциональный **логотип боковой панели** URL.

![Экспорт в HTML и дополнительные главы - скриншот (1/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**2/3 -** Профиль **администратора**: порядок глав и скрытые главы (массивы **JSON**). **Пользователь/Семья**: скрытые главы и порядок (**JSON**).

![Экспорт в HTML и дополнительные главы - скриншот (2/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-2.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**3/3 -** **Ввод в курс дела**: скрытые главы и порядок (**JSON**); **пользовательские главы в формате Markdown** (**JSON** объекты); нижний колонтитул содержит ссылки на необязательные шрифты/CSS (поля ниже).

![Экспорт в HTML и дополнительные главы - скриншот (3/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-3.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

*Реальный административный интерфейс (демоверсия; **Уведомления** - пропустите эту вкладку, если вам не нужны сообщения после выполнения). Не размещайте **идентификаторы экземпляров адаптеров**, получателей и пользовательские шаблоны **в публичных репозиториях** или используйте заполнители.*

![Вкладка «Уведомления» - скриншот](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-benachrichtigungen-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

*Реальный административный интерфейс (демоверсия; **документация по ИИ** - длинная вкладка, два скриншота **сверху вниз**). Встроенные уведомления о **конфиденциальности/оборудовании** - это текст продукта. Для публичных репозиториев предпочтительнее использовать **локальные поля Ollama** или **засекреченные** поля облака; никогда не публикуйте **ключи API**.*

**1/2 -** Выбор поставщика и модели, **базовый URL Ollama**, таймаут запроса.

![Документация по ИИ - скриншот (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

**2/2 -** Дополнительные подсказки контекста для оператора (только по запросу); **температура**; опция **«ИИ объясняет скрипты JavaScript»**.

![Документация по ИИ - скриншот (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin-2.png)

*Источник: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*

Именование, подсказки по **PNG**, редактирование: **[`assets/SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)**.

## Примеры использования Cookbook (Mermaid и JSON)
Пошаговый JSON-код для **пользовательских разделов** также представлен в **[[README.de.md](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)** (раздел сценариев). Дополнительные диаграммы для копирования и вставки, шаблоны порядка глав / скрытия списков и варианты пользовательских разделов документа (customDocSectionsJson) см. в основном файле **README](/#/adapters/autodoc)**. Пример описания на немецком языке (скрытие списков перед изменением порядка, мини-рецепты): **[README.de.md` - Шаг 6 - порядок глав / скрытие](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)**.

- [**Примеры рецептов русалок**](/#/adapters/autodoc#mermaid-cookbook-examples)
- [**Фрагменты JSON-редактортов**](/#/adapters/autodoc#json-cookbook-snippets)

Используйте эти целевые объекты при создании ссылок из справки в поле "Администрирование" - ** `blob/main/README.md#…` ** открывает **предварительный просмотр** (читаемый). Фрагменты заголовков соответствуют английским заголовкам `###` в основном файле README; поведение прокрутки **насколько это возможно**. URL-адреса `#…` в корне репозитория остаются ненадежными - всегда используйте ** `blob/main/…#…` **.

## Создание документации
Запустите команду **Генерация** из экземпляра (состояние `action.generate` или включенное вами расписание). После успешного выполнения вы получите:

- **Файлы** в папке `/files/autodoc.<instance>/` - канонический **HTML** (admin, user, onboarding), **Markdown**, **JSON**
- **Состояния**, такие как `info.htmlUrlAdmin` / `info.htmlUrlUser` / `info.htmlUrlOnboarding`, `info.lastGeneration`, …

Большие файлы Markdown, HTML-код для административной панели и модель JSON находятся **только** в ** `/files/` ** (`autodoc-latest.*`, HTML-код профиля). Состояния ** `documentation.markdown` **, ** `documentation.html` ** и ** `documentation.json` ** содержат **короткие заполнители** - используйте ** `info.htmlUrl*` **, ** `/files/` ** или действия загрузки для просмотра полного текста.

**Хэши:** адаптер обновляет ** `documentation.exportHashes` ** - **SHA-256 (шестнадцатеричный)** последних файлов **Markdown**, **Admin HTML**, **JSON** и (после успешного запуска **PDF**) ** `autodoc-*.pdf` **, чтобы интеграции могли легко определять «изменился ли документ?» без анализа полной полезной нагрузки.

## QR-код для регистрации и скопированная ссылка
Гостям необходим **доступный** URL-адрес браузера для просмотра HTML-файла регистрации. Настройте **базовый URL-адрес ioBroker** (расширенные настройки) в соответствии с тем, как *вы* открываете административную панель (схема, хост, порт). Неправильные или пустые значения приводят к сбою QR-кода/копирования на других устройствах - см. README **публичный базовый URL-адрес**.

## Дополнительный интерфейс командной строки Mermaid
Дополнительный пакет ** `@mermaid-js/mermaid-cli` ** (устанавливается вместе с `npm install` на хосте адаптера) отображает диаграммы в **встроенном SVG во время генерации HTML**, если это работает - лучше для офлайн-копий и **без скрипта jsDelivr** в экспорте, когда каждая диаграмма встроена. Если некоторые блоки остаются в состоянии `<pre class="mermaid">` (отсутствует CLI или диаграмма не работает), HTML все равно загружает Mermaid с CDN в браузере. См. ПЛАН/ВЫПОЛНЕНИЕ **Фаза 5** для получения информации о нюансах Puppeteer/OS (PDF и mmdc используют схожие предположения Chromium).

## Проверка репозитория перед релизом
Разработчики запускают **проверку адаптеров** из клонированного репозитория (ожидается ветка по умолчанию, которую вы передаете в `repochecker`; `package.json` использует ** `main` **):

```bash
npm install
npm run adapter-check
```

См. ** `CONTRIBUTING.md` ** для интерпретации (** `common.extIcon` **, пакет npm ** `iobroker.autodoc` **, **W4001** до момента принятия запроса на слияние в репозитории, известные особенности repochecker). CI по-прежнему использует ** `npm test` **, ** `npm run lint` **, ** `npm run check` **.

## Здесь только демонстрационный контент
В примерах в документации используется **нейтральная формулировка для демонстрации**. **Не** используйте реальные IP-адреса, имена хостов локальной сети из рабочей среды или данные с форумов/карточек.