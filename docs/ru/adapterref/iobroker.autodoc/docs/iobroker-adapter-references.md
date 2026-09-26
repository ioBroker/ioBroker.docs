---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md
title: ioBroker-Adapterentwicklung - Referenzen (нейтральный к адаптеру)
hash: Z+8+5PjXf5OOKg1gwnBEMi6BgcsvYDquF+yC+KKQWEE=
---
# IoBroker-Adapterentwicklung - Referenzen (нейтральный к адаптеру)
Выбор **официальных ссылок и типичных ссылок**, а также адаптер **regelkonform** (Checker, npm, ggf. `ioBroker.repositories`) gehalten werden soll. **Оне** проектный пакет или уведомление о выпуске - оно написано в драгоценности `CONTRIBUTING.md` / `TODO.md`.

**Gedächtnisstützen (Pflicht-Abgleich):** Die Links unten sind **keine Volltext-Kopie**, sondern die **maßgeblichen Quellen**, die bei Adaptor-Arbeit (Cursor, Review, Release) **aktiv abgeglichen** werden sollen - damit Checker, **ioBroker.repositories**-Review und Konventionen eingehalten bleiben. Bei Widersprüchen gilt der **aktuelle** Текст на сайте.

## Regelkonform entwickeln - Кернквеллен
| Источник | Ссылка | Wofür |
| ------ | ---- | ----- |
| **Портал разработчиков ioBroker** | https://www.iobroker.dev | Zentraler Einstieg (проверка адаптера gehosteter, Ökosystem-Doku) |
| **Проверка адаптера** (gehostet) | https://adapter-check.iobroker.in/ | Автоматическое регулирование npm / Listen-PR |
| **Лучшие практики кодирования** | https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices | Официальная конвенция по коду адаптера и метаданным |
| **Контрольный список проверки адаптера** | https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md | Manuelle Review-Matrix für **ioBroker.repositories**-PRs (Тестер, README, `io-package.json`, среда выполнения) |
| **детектор типа** | https://github.com/ioBroker/ioBroker.type-detector | State-Rollen, Gerätetypen, Kanäle - Referenz wenn Objekte/Rollen gesetzt or geprüft werden |

Для загрузки ** `io-package.json` **, **Admin-Konfig**, ** `package.json` ** (адаптер-файл), **Runtime** (`main.js`, `lib/`) или **Release-Workflow**: Checker** и **actuallen** Regeltexten abgleichen.

## Официальный офис Einstiege
1. **Руководство разработчика ioBroker AI** - https://github.com/Jey-Cee/iobroker-ai-developer-guide
2. **Создатель адаптеров** (Konventionen/Vorlagen) - https://github.com/ioBroker/create-adapter

## Контрольный список для проверки - Kurzüberblick (Stichpunkte)
Aus **[REVIEW_CHECKLIST.md](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md)** - bei größeren PRs / vor **repositories**-Einreichung querlesen:

- **Тестирование:** Активация GitHub Actions; Пакет и адаптер-интеграционные тесты.
- **README:** English Beschreibung, Changelog, Lizenz; bei Sentry-Nutzung Hinweis oben.
- ** `package.json`:** `adapter-core`; Mindest-**Node.js**-версия имеется в README; grob gegen Лучшие практики fliegen.
- ** `io-package.json`:** `js-controller`-Abhängigkeit; `новости`/Namen übersetzt; `native` пароль администратора (`index_m.html` / `jsonConfig`); Пароль для `protectedNative` / `encryptedNative`; Веб-настройки точны («порт», «привязка», «безопасность», … - nicht für andere Geräte Missbrauchen).
- **Версия:** Widget/`www`/`docs`/`admin` синхронизирован и совместим с `io-package.json`.
- **Логика адаптера:** Тайм-ауты/интервалы в режиме «выгрузки»; externe Kommunikation nicht stumpf per `schedule` (Randomisierung bei Scheduled-Adaptern); обработчик событий; `strictObjectChecks: false` для начала; Объект-Роллен правдоподобен; `setObject` vermeiden; `onStateChange`-Подтверждение; Parallelität bei State/Object-Erzeugung; `info.connection` при определении канала/объекта.

## State-Rollen/Gerätetypen (`type-detector`)
Для адаптера **Rollen**, **Kanäle** или **Gerätetypen** setzt или prüft: **[`@iobroker/type-detector`](https://github.com/ioBroker/ioBroker.type-detector)** als Referenz Nutzen (Offizielle Rollen-/Typ-Liste, nicht frei erfinden). Для дополнительной документации/Utility-Adapter часто требуется - trotzdem bei `common.role` / `setState`-Mustern im Blick behalten.

## Типичный Адаптер-Чекер-Темы (Курц)
- **W4001** («nicht in repositories»): **normal**, с адаптером **tatsächlich** в ** `sources-dist.json` **. Если вы не знаете, что такое последний пиар-рейх, если вы используете Eintrag später Wieder Fehlt - dann behandelt der Checker den Adaptor часто как **neu** и **stuft** Предупреждения/Предложения по поводу **Errors** hoch (`isNewAdapter` / `--strict`).
- **E4052:** GitHub-**noreply**-Адрес (`…@users.noreply.github.com`) указан в поле Автор/Авторские права **unzulässig** - echte erreichbare Mail.
- **E6034 / W6034:** README-Abschnitt ** `## License` ** Braucht **Volltext** или Einen Markdown-Link auf ** `LICENSE` **; ** `## License` ** soll die **letzte** `##`-Überschrift sein (**W6021**).
- **E2008/S2008 (npm Provenance):** `latest` auf npm soll mit **Trusted Publishing** (GitHub Actions OIDC) означает это. Ein Publish vom Arbeitsplatz erzeugt in der Regel **keine** Attestations - nächste Version über den **deploy**-Job.
- **E2004** (`common.news`): nur **Versionen eintragen, die auf npm exitieren**; Альтернативные версии Git-only-Versionen не отображаются в разделе «новости».
- **E2001**: für die zentrale Liste wird **Maintainer «bluefox»** als npm-Owner erwartet - `npm Owner add bluefox <dein-paketname>` (Befehl aus Checker-Doku / Meldung prüfen).
- **E3009 / изменение Eltern-Objecte**: состояние объекта Eltern-Objekt (`type: "channel"` или `"device"`). Fehlen diese, meldet der Objekt-Checker beim `ioBroker.repositories`-Review **E3009** - ioBroker selbst läuft trotzdem, der Fehler fällt erst beim formal Review auf. **Исправление:** Channel-Objekte **vor** ihren States в `instanceObjects` (`io-package.json`) eintragen - канал погружается в состояние, но не возвращается к состояниям. Справочный адаптер для сбора данных: **telegram**, **backitup**, **dwd**.
- **W5042 / необязательные настройки**: manche Pakete (z. B. schwere Browser-Bibliotheken) stehen bewusst unter ** `optionalDependities` **; Локаль Repochecker может быть использована в других местах для проверки подлинности - **Doppel-Eintrag** под `зависимостями` + `optionalDependities` vermeiden (часто очень часто). **W5042 nicht „fixen“** - для проверки документации (**ВНОСИМ**). Если есть дополнительные пакеты дизельного топлива Peer-Linie teilen (z. B. ** `puppeteer` ** + ** `@mermaid-js/mermaid-cli` **), **Peer-Ranges vor Merge prüfen** и в собственном ** `CONTRIBUTING.md` ** festhalten - sonst wirkt es wie ungelöste Технический долг в ** `ioBroker.repositories` ** - Обзор.
- **W5051 / `adapter.delay()` **: KI-Retries в ** `lib/aiEnhancer.js` ** nutzen ** `this.adapter.delay()` ** (über ** `delayFn` **). Имя псевдонима ** `sleep` ** - der Checker означает «настраиваемое ожидание», но это соответствует стандарту ioBroker.

Конкретные решения и обходные пути для проектов в **собственном** репозитории (`CONTRIBUTING.md`) festhalten.

## `@alcalzone/release-script` (можно создать адаптер)
- **README-Changelog:** Unter ** `## Changelog` ** die Überschriftzeile exakt ``### **РАБОТА В ПРОЦЕССЕ**`` stehen lassen (nicht umbenennen oder «schöner» schreiben - sonst schlägt ** `check:changelog` ** mit z. B. «changelog Placeholder is Missing» fehl). Darunter die Work-in-progress-Stichpunkte bis zum nächsten Release. Плагины (**z. B.** `@alcalzone/release-script-plugin-changelog`, ** `release-script-plugin-iobroker` **) vergleichen diese Zeile **wortgetreu**.
- ** `common.news`:** nur **veröffentlichte** npm-Versionen; макс. **7** Einträge üblich (Шашка/Прослушивание).
- **Ветвь:** Viele Setups использует `npm run Release` или ** `main` ** - auf Entwicklungsbranches ggf. `--branchPattern` (например, Repo-Doku/`package.json`).
- **Опубликовать:** Если проект находится в сценарии релиза, он не может быть использован в качестве `npmPublish`, когда документация будет опубликована позже.

## Npm / GitHub (необязательно)
- **npm:** Аккаунт, идеальная версия **2FA**; Реестр `https://registry.npmjs.org/`.
- **GitHub Actions + npm:** **Trusted Publishing** (OIDC, `id-token: write`) находится в пределах **Provenance** (Checker **S2008** / часто используется новый адаптер **E2008**). Ein Publish vom Arbeitsplatz **vor** dem Tag überspringt den Deploy-Job часто - dann fehlt die Signatur.

## Übersetzungen / i18n
ioBroker erwartet Übersetzungen в Allen 10 Sprachen (en, de, ru, pt, nl, fr, it, es, pl, zh-cn). Рабочий процесс:

1. **Основа:** `admin/i18n/en.json` также как Quelle pflegen.
2. **Maschinell vorübersetzen:** `npm run Translate` (@iobroker/adapter-dev `) übersetzt через Google Translate все **fehlenden** Ключи в других языках. Wichtig: nur fehlende Keys werden ergänzt - vorhandene (auch englisch-identische) werden übersprungen. Sollen alle neu übersetzt werden: Zieldatei vorher leeren oder `--rebuild` nutzen.
3. **Качество сообщества:** Адаптер для [Weblate (weblate.iobroker.net)](https://weblate.iobroker.net) и исправление проблемы в [ioBrokerTranslator/requests](https://github.com/ioBrokerTranslator/requests). Для этого: `npm run Translate all` запустите и зафиксируйте, а затем настройте GitHub Webhook (URL-адрес полезной нагрузки `https://weblate.iobroker.net/hooks/github/`). Weblate Schickt danach автоматический PR для Übersetzungsverbesserungen.
- **E5606** (идентичное Übersetzungen): tritt auf wenn Sprachen English Fallbacks enthalten - `npm run Translate` nach dem Leeren der Dateien behebt das.
- **de / fr** (или другие ручные настройки языка): bleiben bei `npm run Translate` unverändert, wenn bereits alle Keys vorhanden sind.

## `ioBroker.repositories`
PR на ** `sources-dist.json` ** - это описание для пользовательского интерфейса в **Standard-Adapterlisten** - **unabhängig** из npm-Tarball. Zeitpunkt und Branch-Policy im Jeweiligen Projekt abstimmen.

Beim Review wird ein **Objekt-Dump** (`adaptername.0.json`) как **Datei-Anhang** в PR-сообщении (nicht als Kommentar-Paste - der Bot verarbeitet nur echte Anhänge). Описание: https://github.com/ioBroker/ioBroker.repochecker/blob/master/OBJECTDUMP_de.md

---

* Панель копирования в других адаптерах-репозиториях; Подробности проекта (имя пакета, Checker-Ausnahmen, Branch-Workflow) до конца.*