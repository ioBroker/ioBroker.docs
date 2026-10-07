---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shoppingroute/README.md
title: ShoppingRoute для ioBroker
hash: NW15kAOFLwVZi4V0z/wE/nlEoAtd8TDfUGvDd+4xFpU=
---
# ShoppingRoute для ioBroker

<p align="center">
  <img src="admin/shoppingroute.png" alt="ShoppingRoute" width="160">
</p>

<p align="center">
  <strong>Smart Alexa shopping lists — sorted by store, product group and your real walking route.</strong>
</p>

<p align="center">
  <img src="http://iobroker.live/badges/shoppingroute-installed.svg" alt="ioBroker installations">
  <img src="http://iobroker.live/badges/shoppingroute-stable.svg" alt="ioBroker stable installations">
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/v/iobroker.shoppingroute.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/dm/iobroker.shoppingroute.svg" alt="npm downloads"></a>
  <a href="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml"><img src="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml/badge.svg" alt="Test and Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

> **Текущая версия: 0.5.1.** ShoppingRoute доступен в **последнем** репозитории ioBroker.

## Что делает ShoppingRoute?

ShoppingRoute превращает обычный список покупок Alexa в практичного помощника для шопинга. **Все магазины могут использовать один список Alexa, или вы можете специально разделить их на несколько списков.** Ключевая особенность — настраиваемая **маршрутизация по магазинам** : для каждого магазина вы определяете свой собственный порядок перемещения по секциям. Затем ShoppingRoute упорядочивает список в соответствии с вашим фактическим перемещением по магазину, сокращая необходимость возвращаться назад и искать **более быстрые и эффективные маршруты покупок** .

Вместо того чтобы хранить товары только в том порядке, в котором их получила Alexa, адаптер может назначать их магазинам, группам товаров и настраиваемому маршруту перемещения внутри каждого магазина. Он использует видимые двухзначные префиксы, такие как `20> Bananas` и дополнительные заголовки рынка, такие как `40> ═════ ALDI ═════`.

Это значит, что список может автоматически превратиться во что-то вроде:

```text
10> Apples
20> Bananas
30> Bread
40> ═════ ALDI ═════
50> Milk
60> Cheese
70> Coffee
```

В приложении Alexa для управляемых списков необходимо задать алфавитный порядок (от **А до Я)** . Затем ShoppingRoute управляет фактическим порядком с помощью своих префиксов.

ShoppingRoute повторно использует локальную аутентификацию адаптера ioBroker **Alexa2** для прямого обновления, удаления и пакетного создания товаров. Состояние списка Alexa2 остается внешним триггером изменений.

**Информация об сервисе/производителе:** ShoppingRoute работает со списками покупок Amazon Alexa. Amazon описывает списки Alexa как функцию, доступную пользователям в экосистеме Alexa; пользователи могут получить доступ к спискам покупок и дел Alexa через приложение Alexa, приложение Amazon и розничный сайт Amazon. См. [официальную документацию для разработчиков Amazon Alexa](https://www.developer.amazon.com/en-US/docs/alexa/ask-overviews/deprecated-features.html#list-skills-and-alexa-shopping-and-to-do-lists) .

## Документация

Выберите язык:

- 🇬🇧 **Английский:** [Руководство пользователя](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md)
- 🇩🇪 **Deutsch:** [Bedienungsanleitung](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) · [Ausführliche README](/#/docs/adapterref/iobroker.shoppingroute/README_DE.md)

Сообщество и поддержка:

- 🧪 [Форум тестировщиков ioBroker – ShoppingRoute](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4)
- 🐞 [Проблемы на GitHub](https://github.com/RaviniZib/ioBroker.shoppingroute/issues)

Настройки адаптера и утилита резервного копирования поддерживают все 11 стандартных языков административной панели ioBroker. Обратная связь по списку покупок доступна на немецком и английском языках.

## Что нового в версии 0.5.1

В этом обновлении исправлены проблемы с сохранением и перемещением данных, о которых сообщалось в связи с новой страницей управления, а также сделано более удобным совершение покупок с телефона:

- **Создание работоспособных списков Alexa:** новый список создается и подтверждается в Alexa, прежде чем ShoppingRoute сможет его использовать. Недействительная новая привязка отклоняется, прежде чем она сможет повлиять на работоспособные списки.
- **Добавление товаров во время покупок:** добавьте товар непосредственно на странице списка покупок, в том числе в пустой список.
- **Перемещайтесь в конец и обратно:** специальные зоны для размещения в конце, сенсорные маркеры перетаскивания, скорректированные позиции вставки и пустые возвратные рынки упрощают перемещения. Используйте «Показать другие рынки в качестве целей для размещения», чтобы отобразить дополнительные пункты назначения.
- **Понимание более длительных обновлений:** видимое сообщение сразу же объясняет ожидающее обновление Alexa. Адаптер сообщает об окончательном результате отдельно, поэтому более длительная операция не будет ошибочно принята за немедленный сбой.
- **Сохранение изменений в каталоге:** удаления, изменения порядка и выбора на странице управления сохраняются автоматически. Вводимые вручную изменения ожидают нажатия кнопки **«Сохранить»** ; **добавление** отправляет новую запись. Сохраненные данные сохраняются при повторном открытии страницы.
- **Избегайте прерываний при сохранении:** локальные сохранения каталога больше не выполняют ненужные проверки Amazon, а изученные данные каталога больше не приводят к перезапуску экземпляра. Быстрые изменения ставятся в очередь, а неудачные сохранения сохраняют внесенные изменения для повторной попытки.
- **Перемещение элемента обратно после перестройки Alexa:** измененные идентификаторы элементов Amazon можно определить по однозначному названию элемента. Повторяющиеся названия никогда не угадываются.

Откройте **ShoppingRoute** в боковой панели ioBroker на своем телефоне. Используйте `⋮⋮` Используйте перетаскивание с помощью маркера или кнопки со стрелками и селектор рынка. После обновления полностью перезагрузите страницу управления, чтобы отобразить новый интерфейс. При записи в список Alexa по-прежнему используются настроенные ограничения скорости, пробный запуск и средства проверки.

## Основные характеристики

- В боковой панели ioBroker расположена специальная **страница управления ShoppingRoute,** где отображаются списки покупок, товары, рынки, группы товаров, маршруты, списки и отзывы.
- Изменения в каталоге сохраняются во время выполнения и не требуют перезапуска адаптера.
- Создавайте подтвержденные списки Alexa и добавляйте товары в корзину прямо с телефона.
- Автоматическое сохранение структурных изменений с возможностью явного сохранения для введенных данных.
- Названия рынков всегда хранятся в **верхнем регистре** , независимо от способа их ввода, при этом все ссылки нормализуются согласованно.
- Защита от случайного сброса каталога во время процессов администрирования/обновления.

### Сортировка по магазинам и маршрутам

- настраиваемые магазины и псевдонимы магазинов
- Индивидуальный пешеходный маршрут для каждого магазина
- товарные группы с независимым порядком сортировки
- предпочтительные и доступные рынки для каждого продукта
- глобальные, по отдельным спискам и временные приоритетные рынки
- дополнительные заголовки рынка, такие как `═════ ALDI ═════`
- необязательная межрыночная консолидация с использованием минимального порогового значения для товаров.
- Запросы, явно отнесенные к конкретному рынку, никогда не передаются в другой магазин.

### Интеллектуальная обработка продукции

- каталог продукции с псевдонимами
- обучение, устойчивое к дублированию
- очередь проверки неизвестных товаров
- автоматический, обзорный и выключенный режимы обучения
- Предложения по категориям и псевдонимам
- Анализ количества по цифрам, числительным, упаковкам, выражениям в виде полукилограмм и т. д. `6x` формы
- ручное изменение рыночной позиции и позиционирования для каждого товара

### Обновления списка безопасных приложений Alexa

- постепенный `00>` –`99>` сортировка по префиксам
- вставки, сохраняющие пробелы, чтобы избежать ненужных переписываний.
- Перестройка только суффиксов происходит при исчерпании числового пробела.
- Прямые ответы Amazon используются для подтверждения операций.
- Окончательный прямой список просмотрен для проверки.
- Эксклюзивная обработка транзакций для предотвращения наложения операций записи.
- Журнал восстановления прерванных операций
- Безопасный режим API с настраиваемым ограничением скорости записи
- Ограниченное количество обратных вызовов Alexa и опрос с задержкой.

### Администрирование и диагностика

- интерактивный просмотр текущего списка покупок
- Перетаскивание и сенсорное управление
- предварительный просмотр сортировки перед записью
- статистика покупок только в местных магазинах
- резервное копирование и восстановление конфигурации
- профили маршрутов сбыта, которыми можно делиться
- диагностический отчет и отчет об обратной связи, обеспечивающие конфиденциальность
- Диагностика прямой сессии Alexa2/alexa-remote2
- режим безопасности "сухого запуска"

## Требования

- ioBroker с **Admin 8 или более новой версией.**
- **js-controller 7.1.0 или новее**
- рабочий экземпляр адаптера ioBroker **Alexa2**
- Список покупок Alexa, управляемый сервисом ShoppingRoute, должен быть отсортирован **по алфавиту** в приложении Alexa.

## Как это работает

1. Alexa2 сообщает ioBroker об изменении списка покупок.
2. ShoppingRoute считывает затронутый список и нормализует названия товаров.
3. Товары сопоставляются с псевдонимами, группами товаров и рыночными сегментами.
4. Адаптер формирует оптимальный план маршрута и выбора рынка.
5. В Amazon записываются только необходимые изменения в список.
6. Окончательный список удаленных устройств перечитывается и проверяется.

Административный интерфейс, работающий через браузер, никогда не получает учетные данные Alexa или Amazon.

## Конфиденциальность и безопасность

Для работы ShoppingRoute не требуется собственная учетная запись Amazon. Он использует локально сохраненную сессию Alexa2 и не регистрирует секретные ключи аутентификации.

Статистические данные хранятся локально. Отчет об обратной связи разработан с учетом требований конфиденциальности, а функция «Тестовый запуск» позволяет проверить запланированные изменения без изменения списка покупок.

## Установка

Установите ShoppingRoute со страницы **адаптеров** ioBroker, используя **последнюю версию** репозитория.

После установки:

1. создать экземпляр ShoppingRoute,
2. выберите/настройте список покупок Alexa.
3. определять рынки и группы товаров.
4. настройте пешеходный маршрут для каждого магазина.
5. Настройте список управляемых устройств Alexa по алфавиту (от **А до Я)** .
6. Начните с **пробного запуска,** если хотите проверить результат перед включением записи.

Подробную информацию о настройке см. в [руководстве пользователя на английском](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md) или [немецком языке](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) .

## Обратная связь и поддержка

ShoppingRoute — ещё молодая компания, поэтому отзывы пользователей, полученные в реальных условиях, особенно ценны.

Пожалуйста, используйте [ветку обсуждения для тестировщиков ioBroker](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4) для общих отзывов о тестировании, а [систему отслеживания ошибок GitHub](https://github.com/RaviniZib/ioBroker.shoppingroute/issues) — для воспроизводимых ошибок или запросов на добавление новых функций.

## Changelog

### 0.5.1 (2026-10-07)
- Create new lists in Alexa and verify them before saving their bindings; add shopping items directly, including to empty lists.
- Show immediate, readable progress for Alexa moves, retain optimistic positions while waiting, and track long operations without the previous UI timeout failure.
- Fix end-drop targets, row insertion positions, touch dragging and empty return markets in the shopping list; restore drag ordering for markets, product groups and walking routes.
- Save deletions, ordering and selections immediately on the management page; preserve typed drafts until Save and queue rapid structural changes without a retry loop.
- Keep local saves independent of unnecessary Amazon list checks; persist learned catalogues in runtime data instead of restarting the instance through native-object writes.
- Safely resolve uniquely named items after Amazon replaces their IDs, retaining rejection for ambiguous duplicate names and all write safeguards.
- Provide German and English shopping feedback, a language-aware help button and updated user guides and READMEs.

### 0.5.0 (2026-10-05)
- Add a dedicated ShoppingRoute management page in the ioBroker sidebar with a fixed header and direct management of shopping list, products, markets, product groups, routes, lists and review queue.
- Persist large catalogue data outside normal instance configuration so catalogue edits no longer require an adapter restart.
- Add defensive recovery and regression coverage for the destructive Admin/default reset reported in issue #59, including a successful real-instance reproduction test.
- Normalize every market name to UPPERCASE on create, rename, load and save, and update market references consistently.
- Refine the management UI with a stable sticky header, logo and shaded/zebra list blocks.

### 0.4.4 (2026-09-25)
- (RaviniZib) Use `No Market` for new fallback-market defaults, add all 11 admin languages to the backup utility, and remove six unused translation keys. Existing market names, routes and product data remain unchanged.

### 0.4.3 (2026-09-25)
- (RaviniZib) Route Alexa callback timeouts through ioBroker-managed timers so stalled callbacks stay bounded without plain Node.js `setTimeout()` calls in adapter source.
- (RaviniZib) Keep `common.news` within the seven entries supported by the repository builder.

### 0.4.2 (2026-09-17)
- (RaviniZib) Bound direct Alexa callbacks to 30 seconds so missing callbacks cannot block startup or sorting.
- (RaviniZib) Poll Amazon lists directly with error backoff when Alexa2 events are missing; keep polling scheduled while sorting is busy or disabled.
- (RaviniZib) Retry delayed final verification and preserve concurrent additions for a follow-up sort. Recover completed transactions without discarding additional items; retain safety stops for incomplete writes.
- (RaviniZib) Refresh the checked-in build and add recovery and polling regression tests.

### 0.4.1 (2026-09-12)

- Validates shopping-list responses before rendering or replacing the current view. Incomplete responses show an error and a Reload button instead of crashing on `.map()`.

- Adds a Delete button for each shopping item. Deletes the selected Amazon ID and empty market headers through the exclusive, journaled transaction with direct final verification. Dry Run and the safety stop block deletion.

- Prevents duplicate shopping items from overlapping drag/drop events and concurrent direct writes. Reserves UI/backend operations synchronously and keeps move errors visible after refresh.

- Corrects checker #16 metadata: removes unpublished 0.3.8 from `common.news`, adds the existing npm maintainer email to author/copyright fields, links the MIT license and declares testing ^6.2.1. Local checker: no errors; repository admission remains pending in PR #6434.

- Updates the catalogue and removes accepted review rows in one Admin draft change, avoiding stale accepted rows after saving. Discarding restores the original draft. The reported errors were confirmed fixed by the user.
- Replaces the review queue’s native multi-select with independently clickable market checkboxes and a visible selection summary. Included in 0.4.1; not in the published 0.4.0.

### 0.4.0 (2026-09-12)

**Correction to the original acceptance claim:** The complete review workflow was not fixed. Accepted rows could remain visible in the Admin draft, and market selection still used a native multi-select. The original “end-to-end test” description was incorrect: tests covered editor/helper functions and serialization, not full Admin interaction.

- Persists startup cleanup of previously accepted review rows even without accepting another product.
- Normalizes legacy product-market strings to arrays at startup and preserves market arrays in acceptance functions.
- The additional local UI correction is listed under “0.4.1”; it is not part of the published 0.4.0 package.

### 0.3.9 (2026-09-11)

- Replaces incomplete 0.3.8 snapshots that may have been installed directly from GitHub with an unambiguous newer version.
- Includes the final product-market normalization, review cleanup, single-column shopping-list view, structural header filtering, and orphaned-header removal verified in PR #37.
- No user configuration migration is required; legacy comma/semicolon market values are normalized automatically.

### 0.3.8 (2026-09-11)

- “Available markets” is stored consistently as a multi-select array; legacy comma/semicolon strings remain readable and are migrated to arrays at startup.
- Accepted review entries are removed after saving once the product catalogue has been updated.
- The current shopping list is presented as a clear single-column sequence of market sections.
- Structurally formatted market headings are filtered even when their label is unknown or misspelled (for example `═════ DROGERIEMART ═════`).
- Market headings without associated active items are deleted from the Alexa shopping list during the next sorting run.
- Fixed the review queue so accepting an item updates the article catalogue and visible status immediately in the same Admin draft.
- Legacy market headings such as `— LIDL —` are recognized as headings and can no longer enter the shopping items or review queue.
- Nested internal sort prefixes are stripped recursively from parsing and the Admin shopping-list display.
- Simplified the current shopping-list view by hiding empty market columns while retaining drag, arrow and market-selector controls.
- Updated current ioBroker CI/checker compatibility: testing-action-check v2, Node.js 26 matrix coverage, current @iobroker/testing and bounded common.news history.

### 0.3.7 (2026-09-11)

- Added an interactive current shopping-list view to Admin with drag-and-drop plus touch-friendly arrow/market controls.
- Manual item positions and market moves are persisted locally and take precedence over automatic sorting while that active list item exists.
- Alexa writes are performed by the adapter; the browser receives no Alexa/Amazon credentials, and failed moves reload the confirmed list state.
- Improved responsive Admin layouts for xs/sm screens and added the repository Responsive Design tab width recommendation.
- Review entries now retain an idempotent “Accepted” status after a normal Save instead of falling back to “Pending”.

### 0.3.6 (2026-09-04)

- Cleaned up avoidable repository-checker warnings.
- Made the JSON Config i18n mode explicit and moved all existing translations into the standard language-file structure.
- Removed obsolete prepublish protection and archived older changelog entries.
- No sorting or runtime behavior was changed.

### 0.3.5 (2026-08-17)

- Completed the remaining repository re-review cleanup with an English statistics fallback.
- Aligned release deployment with the regular tested `npm run build` path.
- Removed the obsolete `stable:build` / source-map cleanup path and updated its regression protection.
- No sorting behavior or adapter functionality was changed.

### 0.3.4 (2026-08-14)

- Added Admin 8 compatibility for all custom Admin components and set the minimum Admin version to 8.0.0.
- Improved logging with an optional sort-summary message and made market headings clearer (`═════ MARKET ═════`).
- Fixed the review queue’s “Accept all” action and now process foreign Alexa2 states only when their values are acknowledged.
- Removed obsolete timing/API configuration options and the internal npm version check.
- Removed code obfuscation and obsolete package-preparation paths.
- Completed repository-review compatibility cleanup, including English runtime log/state texts and bounded `maxWritesPerMinute` handling.

### 0.3.3 (2026-08-13)

- New direct `00>`–`99>` prefix sorting for Alexa lists configured to A–Z.
- Added very fast incremental insertion into free numeric gaps; only the affected suffix is rebuilt when a gap is exhausted.
- Direct Amazon responses confirm each operation, followed by one final direct verification of the complete list result.
- Managed Alexa lists must be set to **A–Z** in the Alexa app.

### 0.3.2 (2026-08-11)

- Replaced the former buffered/marker/`updatedDateTime` sorter with one direct `00>`–`99>` prefix architecture for Alexa A–Z lists.
- Added midpoint insertion into existing numeric gaps; if a gap is exhausted, only the smallest necessary suffix is deleted serially and recreated with one batch request.
- Reuses Alexa2 credentials locally without logging secrets or writing Alexa2 item states. Direct Amazon responses confirm each operation and one final direct list read verifies the complete apply.
- Added a simple exclusive `IDLE`/`COLLECTING`/`APPLYING` lifecycle: one new item waits at most five seconds, while a second new item starts the collected run immediately.
- Replaced the old marker transaction with a compact persistent direct-apply journal and a safety stop for incomplete or ambiguous remote results.

### 0.3.1 (2026-08-10)

- Fixed a restart loop in Review learning: repeated identical observations no longer rewrite `reviewItems` solely to refresh `lastSeen`.

### 0.3.0 (2026-08-10)

- Added optional market headings (now formatted as `═════ MARKET ═════`).
- A heading stays active until the last real item for that market is completed and is then deleted completely instead of remaining among completed items.
- Added configurable minimum-items-per-market consolidation for flexible articles.
- Explicit market phrases always remain assigned to the requested market.
- Header management uses Alexa2 states (`#New`, `#delete`) and does not create a second Amazon session; normal shopping items are never automatically deleted or completed.

Older releases: CHANGELOG_OLD.md.

## License

Licensed under the MIT License. See [LICENSE](https://github.com/RaviniZib/ioBroker.shoppingroute/blob/main/LICENSE) for the complete terms.

Copyright (c) 2026 RaviniZib <zib@ravini.org>