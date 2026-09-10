---
chapters: {"pages":{"en/adapterref/iobroker.tractive-next/README.md":{"title":{"en":"ioBroker.tractive-next"},"content":"en/adapterref/iobroker.tractive-next/README.md"},"en/adapterref/iobroker.tractive-next/docs/PUBLISHING.md":{"title":{"en":"Veröffentlichung: Checkliste bis ioBroker Latest"},"content":"en/adapterref/iobroker.tractive-next/docs/PUBLISHING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-next/docs/PUBLISHING.md
title: Veröffentlichung: Контрольный список последних версий ioBroker
hash: FKN7SI9SOBbYIql/aUY26ujg5JyQJoU/pMrQdKn8Ek8=
---
# Veröffentlichung: Контрольный список последних версий ioBroker

Ziel: Andere Nutzer sollen`tractive-next` Под администратором **адаптера** можно найти, установить и активировать его.

Установка для окончательной установки:

1. npm-Paket`iobroker.tractive-next`
2. Eintrag im **Latest** -Repository (`ioBroker.repositories` )
3. дополнительная опция **Stable** mit freeigegebener Versionsnummer

Этот документ выдается на стенде проектов (0.2.x) в официальном порядке.

Официальное происхождение:

- [Публикация вашего адаптера](https://iobroker.github.io/dev-docs/getting-started/04-publish-adapter/)
- [ioBroker.repositories README](https://github.com/ioBroker/ioBroker.repositories)
- [Проверка адаптера](https://adapter-check.iobroker.in/)
- [iobroker.dev](https://www.iobroker.dev/)

---

## Ist-Stand (kurz)

| Берейх                                                           | Статус                                                                                                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Функциональный адаптер (аутентификация, опрос, объекты, вкладка) | weitgehend vorhanden                                                                                                          |
| Открытый репозиторий GitHub                                      | erledigt (öffentlich)                                                                                                         |
| npm-Paket                                                        | erledigt (`0.2.9` , Владелец`bluefox` )                                                                                       |
| GitHub Actions / Release-Pipeline                                | CI вкл. Развертывание-Job и Node 22/24                                                                                        |
| Adapter-Checker / ESLint / Тесты                                 | Ошибки на E2000 erledigt; nach npm erneut prüfen                                                                              |
| Метадатен (`news` ,`author` Ключевые слова, …)                   | erledigt (`nogit` , макс. 7 новостей, Übersetzungen)                                                                          |
| Passwort-Verschlüsselung (`encryptedNative` )                    | erledigt (0.2.2)                                                                                                              |
| Eintrag Latest/Stable                                            | PR [#6370](https://github.com/ioBroker/ioBroker.repositories/pull/6370) – Checker-Fixes in 0.5.2; nach npm-Publish`RE-CHECK!` |

---

## Фаза A – Репо и базисные метаданные

- [x] GitHub-Repository **öffentlich** schalten
- [x] Repo-Name bleibt`ioBroker.tractive-next` (großes **B** )
- [x] GitHub **Topics** setzen (`iobroker` ,`tractive` ,`gps` ,`geoposition` ,`pet` ,`tracker` )
- [x] `package.json` ergänzen:
  - [x] `repository` ,`bugs` , `homepage`
  - [x] `keywords`
  - [x] `author` формат`Name <email>`
  - [x] sinnvolle Scripts (`lint` ,`test:package` ,`check` (Выпуск/Развертывание позже)
- [x] `io-package.json` ergänzen:
  - [x] `common.authors` mit E-Mail (kein ungültiges`common.author` )
  - [x] `common.titleLang` (ohne veraltetes`common.title` )
  - [x] `common.news` для выпусков (макс. 7, все Sprachen)
  - [x] `common.licenseInformation` (современный формат лицензии)
  - [x] `common.readme` /`common.extIcon` (Опубликованные исходные URL-адреса)
  - [x] `common.nogit: true` (Build local, kein)`build/` я Репо; Схема-Имя kleingeschrieben)
  - [x] ggf.`tier`
- [x] README auf Veröffentlichungsniveau:
  - [ ] English verpflichtend, Deutsch willkommen
  - [x] Ссылка на Herstellerseite (Tractive)
  - [ ] Установка über Admin beschreiben
  - [x] `## Changelog` унд`## License` в файле README
  - [x] Подробные сведения: **неофициальный API**
- [ ] Datenschutz-/Sicherheitshinweise (Zugangsdaten, Token, Logging)

## Фаза B – Sicherheit und Objektqualität

- [x] `password` в`encryptedNative` +`protectedNative`
- [x] Abhängigkeiten:`js-controller >=6.0.11` ,`admin >=7.6.20` Узел`>=22`
- [ ] Rollen prüfen: keine „faulen“ Rollen wie reines`state` , wo vermeidbar
- [ ] `null` -Behandlung und Typwechsel Final Absichern
- [ ] Проверка компактного режима (старт/лауф/стоп без таймера)
- [ ] Вкладка «Администратор» для актуального администратора (7.x) стабильно проверена

## Фаза C – Qualitätssicherung (Pflicht für Latest)

- [ ] Адаптер и стандарт Creator/Template-Standard (`npx @iobroker/create-adapter` (als Referenz)
- [x] ESLint einrichten und grün fahren
- [x] GitHub Actions:
  - [x] Тесты пакетов/адаптеров
  - [x] Интеграционные тесты (предварительный сценарий)
  - [x] `test-and-release` Рабочий процесс, включая задание развертывания (тег)`v*` )
- [ ] Release-Script (`@alcalzone/release-script` /`@iobroker/adapter-dev` )
- [ ] [https://adapter-check.iobroker.in/bzw](https://adapter-check.iobroker.in/) .`npx @iobroker/repochecker` nach npm-Publish erneut (E2000 sollte weg sein)
- [x] behebbar Checker-Fehler aus 0.2.7/0.2.9-Lauf adressiert

## Фаза D – npm

- [x] Создание учетной записи npm (2FA empfohlen/pflichtig für Publish)
- [x] Erstveröffentlichung manuell:`npm publish --access public` (`0.2.9` )
- [x] Владелец hinzufügen (ioBroker-Anforderung):
  - `npm owner add bluefox iobroker.tractive-next` (angenommen:`bluefox` +`fraese_73` )
- [x] Trusted Publishing на npmjs.com eingerichtet
- [x] CI Deploy-Job bereit (`id-token: write` , Узел 24, kein`npm-token` )
- [x] Paketinhalt geprüft (`npm pack --dry-run` :`build/` ,`admin/` ,`io-package.json` (README, LICENSE)

### Erstpublish (manuell, einmalig)

Прежде всего, Trusted Publishing получит пакет, который существует. Первая публикация на местном уровне:

```bash
cd ~/Documents/Coding/ioBroker.tractive-next
npm login                 # Browser/OTP
npm run build
npm publish --access public
npm owner add bluefox iobroker.tractive-next
npm view iobroker.tractive-next version
```

### Надежное издательство (für künftige`v*` -Теги)

1. <https://www.npmjs.com/package/iobroker.tractive-next> → **Настройки** → **Доступ для публикации**
2. Доверенные действия издателя/GitHub:
   - Владелец репозитория:`Fraese73`
   - Название репозитория:`ioBroker.tractive-next`
   - Имя файла рабочего процесса:`test-and-release.yml` (точно, с учетом регистра)
   - Окружающая среда: leer lassen
3. Шпайхерн
4. Ab dann: Версия erhöhen → committen → Тег`vX.Y.Z` pushen → Автоматическое развертывание задания

Официальная документация: <https://docs.npmjs.com/trusted-publishers/>\
&#x20;ioBroker-Hinweis: разверните Node.js 24 (требуется такая конфигурация).

### Необязательно: релиз на GitHub.

После публикации npm для версии 0.2.9:

```bash
gh release create v0.2.9 --title "0.2.9" --notes "Adapter-checker fixes: nogit, news translations, deploy Node 24."
```

## Фаза E – Последний репозиторий

Voraussetzungen: öffentliches Repo ✅, npm-Paket ✅, владелец`bluefox` ✅, Checker без критических ошибок, CI grün.

### Убер iobroker.dev (empfohlen)

1. <https://www.iobroker.dev/> с учетной записью GitHub`Fraese73` анмелден
2. Адаптер`tractive-next` sollte gelistet sein
3. **ДОБАВИТЬ В ПОСЛЕДНИЕ** auslösen (öffnet/erstellt PR an`ioBroker.repositories` )
4. PR-проверки и обзоры; bei Nachfragen im PR antworten
5. Nach Merge: собственный ioBroker для Adaptor-Repos **Последняя** активация и`tractive-next` установить

### Мануэль (альтернативный вариант)

PR и <https://github.com/ioBroker/ioBroker.repositories> с Eintrag в`sources-dist.json` Тип`geoposition` , просмотрите GitHub-Repo и npm-пакет.

- [x] Über [iobroker.dev](https://www.iobroker.dev/) → Управление → **ДОБАВИТЬ В ПОСЛЕДНИЕ** ausgelöst\
  &#x20;→ Запрос на слияние: <https://github.com/ioBroker/ioBroker.repositories/pull/6370> (`auto-checked ✔` (ошибок нет)
- [x] **Objektstruktur-Dump** PR #6370 angehängt
- [ ] Nach Merge: im ioBroker **Latest** — активация репозитория и проверка установки
- [ ] Форум-Тема в [тестере-Bereich](https://forum.iobroker.net/category/91/tester) anlegen

### Objektstruktur für den Обзор экспорта

Описание: <https://github.com/ioBroker/ioBroker.repochecker/blob/master/OBJECTDUMP.md>

1. Адаптер для пускового устройства Pi (verbunden, typische States vorhanden)
2. Администратор → Expertenmodus (grunes Gesicht)
3. Объекты →`tractive-next.0` markieren
4. Скачать → Настройки по умолчанию → **Только выбранные**
5. Wegen Имя пользователя: ggf. **Не экспортировать значения активных состояний** (Passwort/Token nicht mit Exportieren)
6. Датей (з. Б.`tractive-next.0.json` ) PR #6370 как Kommentar/Anhang hochladen

## Фаза F – Стабильная (später)

- [ ] Längerer Betrieb im Latest
- [ ] Положительные отзывы пользователей на форуме
- [ ] Feste Версия в стабильной версии eintragen (`addToStable` )
- [ ] Discovery nur Falls Sinnvoll (типичный вход в Cloud-Login)

---

## Empfohlene Reihenfolge for dieses Projekt

1. Passwort-Verschlüsselung + Metadaten nachziehen
2. Repo öffentlich + Topics
3. ESLint + GitHub Actions + Adapter-Checker
4. npm publish + Owner ✅ (`bluefox` ангеноммен)
5. Доверенное издание на npmjs.com ✅
6. ДОБАВИТЬ В ПОСЛЕДНИЕ über iobroker.dev ✅ (PR/Обзор)
7. Nach Merge: Latest im Admin aktivieren + Forum-Tests → irgendwann Stable

Функция Feature-Arbeit (Activität, Live-Tracking,…) может быть параллельно включена, поэтому Veröffentlichung aber nichtblockieren, sobald der Adaptor Stabil und Checker-Grün ist.

---

## Was Endnutzer danach tun

Я администратор:

1. **Последняя версия** репозитория адаптеров (для новых адаптеров)
2. Адаптер типа: **Tractive Next** /`tractive-next`
3. Установка/актуализация с использованием адаптера

Мануэльс`git pull` auf dem Pi это действительно важно для Энтвиклера.