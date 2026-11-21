---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/docs/stable-release.md
title: Erste Stable-Aufnahme abgeschlossen
hash: QN4j7JqJtmPZfL62+qXk8LFbaswQrRIizKxBRxH0l5c=
---
# Erste Stable-Aufnahme abgeschlossen
Стенд: 11 октября 2026 г. Стабильная версия: ** `iobroker.skoda-public-api@0.1.11` **.

[Репозиторий-PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832), 11 октября 2026 г., 14:56:48 по всемирному координированному времени (UTC). Der Eintrag в [`sources-dist-stable.json`](https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json) является праздником `0.1.11`.

Der ausgelieferte [Стабильный каталог](https://download.iobroker.net/sources-dist.json), который можно использовать для выбора тега noch den Stand `2026-10-11T08:35:49.417Z` для их слияния и защиты адаптера noch nicht. Обновление каталога - это Sichtbarkeit im Admin zu kontrollieren. Für die Aufnahme ist kein weiteres npm-Release erforderlich.

Die erste Stable-Aufnahme verwendet die bereits veröffentlichte und öffentlich getestete Version. Die Aktualisierung der Testbibliothek verändert das veröffentlichte npm-Paket nicht. Nach `v0.1.11` übernommene Änderungen an Spec und Metadaten Gehören в einen späteren Release.

## Nachweise
| Предварительное заполнение | Примечание |
|---|---|
| В `latest` vorhanden | Eintrag в `ioBroker/ioBroker.repositories/sources-dist.json` |
| Дополнительные тесты | [Тема на форуме](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x) |
| Дополнительные тесты | [Тема форума](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x) |
| Релиз-CI | [Грюнер Таг-Лауф для `v0.1.11`](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/35531311953), einschließlich neun Testkombinationen und Veröffentlichung |
| GitHub-CI для стабильной версии | [Грюнер Лауф на «главном» PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427), новая комбинация из Betriebssystem и Node-Version |
| API-спецификация | [Grüner Spec-Lauf auf `main`](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/36470899807); Выпуск №4 опубликован |
| Репозиторий-Чекер | Шашка в [Stable-PR № 6832] (https://github.com/ioBroker/ioBroker.repositories/pull/6832): keine Fehler und keine Warnungen; W0037 durch `^6.3.0` behoben; [Проблема №6](https://github.com/tmarthy/ioBroker.skoda-public-api/issues/6) утра 11 октября. |
| Конюшня-Ауфнаме | Репозиторий-PR №6832 übernommen, версия `0.1.11` в `sources-dist-stable.json` eingetragen |
| Пакетинхальт | Дополнительные возможности использования npm-Tarball: `build/main.js`, метаданные пакета, конфигурация администратора, все настройки администрирования и лицензирования |
| Пакетинхальт | Дополнительные сведения о npm-Tarball: `build/main.js`, пакетные метаданные, административная конфигурация, все настройки администрирования и лицензирования |

Die Forumberichte bestätigen die genannten Funktionen. Beim Superb Hybrid 2025 во время климатических испытаний сегодня вечером. Echte anonymisierte Fixtures Ligen Bisher nur für den Enyaq vor. Automatische VIN-Ermittlung ist mit der Public API ничего не дает; der Discovery-Hinweis aus den Stable-Anforderungen trifft daher nicht zu.

## Местное использование информации
Der bei der Vorbereitung geprüfte Git-Stand enthält zusätzlich die Spec-Aktualisierung aus PR #5 und ist nicht identisch mit dem Unveränderten veröffentlichten npm-Paket `0.1.11`.
Подключение к macOS с узлами `26.9.0` и `@iobroker/testing` `6.3.0`:

| Prüfung | Ergebnis |
|---|---|
| TypeScript, ESLint и сборка | Бестанден |
| Модульные тесты | 501 место |
| Тесты пакетов | 64 файла |
| Интеграция einschließlich Компактный режим | 14 шагов с js-контроллером `8.0.0-alpha.5-20261004-d0887094b` |
| Lokaler Repository-Checker `5.22.10` с GitHub-Anmeldung | Keine Fehler und keine Warnungen |
| Live-Spec-Vergleich | Unverändert |
| Локалер Пакет-Драй-Ран | 79 Датьен; полезные пакеты для развлечения |
| Конюшня-Айнтраг | Официальная подборка атрибутов, алфавитная сортировка и оформление Latest-Eintrag bestanden |

Местная проверка - это эксперимент с рабочей документацией. Прежде чем перейти к использованию стабильной версии S4047, используйте ее сегодня. Die Vorbereitung wurde mit [PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/pull/7) сверхномен.
Аншлюс GitHub-CI и Checker в Stable-PR лучше всего подходят для поддержки или предупреждения; Checker-Выпуск №6 уже опубликован.

## Konkreter Stable-Antrag
Патч [`stable-repository.patch`](https://github.com/tmarthy/ioBroker.skoda-public-api/blob/main/docs/stable-repository.patch) содержит официальный сценарий `addToStable`. Er fügt ausschließlich den flagisch einsortierten Eintrag für `skoda-public-api` с версией `0.1.11` в `sources-dist-stable.json` позже.
Ausgangsstand des Repositories: `6c21876d88cdbc1528c024b29b89a69f5e5cbd1e`.
Английский Antragstext находится в документации [`stable-pr.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/stable-pr.md); Patch und Antrag dienen als Nachweis der abgeschlossenen Aufnahme.

## Abschluss und Nachbereitung
- [x] Тестирование и документация по адаптеру-PR #7 сверхномера; CI грюн.
- [x] Stable-Antrag für die veröffentlichte Version `0.1.11` как Repository-PR #6832 eingereicht.
- [x] Проверка репозитория без ошибок и предупреждений; Стабильный пиар übernommen.
- [x] README и статус проекта в актуальном состоянии.
- [ ] После обновления каталога выберите контрольную стабильную версию.

Информация на форуме и информация о новостях ioBroker-News не являются обязательными.
Nach `v0.1.11` übernommene Produktänderungen werden mit einem eigenen Release veröffentlicht.