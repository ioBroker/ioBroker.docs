---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.ai-usage
BADGE-stable: https://iobroker.live/badges/ai-usage-stable.svg
BADGE-Installations: https://iobroker.live/badges/ai-usage-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.ai-usage
BADGE-Test and Release: https://github.com/krobipd/ioBroker.ai-usage/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ai-usage/README.md
title: ioBroker.ai-usage
hash: rJZpUMwaAAS3PDwO3/R4xMZJHeEfw/9N6qZt2Zl3pKA=
---
# ioBroker.ai-usage

Он отслеживает потребление, лимиты и затраты ваших учетных записей ИИ и записывает их в доступные только для чтения точки данных ioBroker. Адаптер **только читает** — он никогда не вызывает модель, ничего не меняет у провайдера и никогда не отправляет ваши данные никуда.

---

## Что он может отслеживать

| Счет                                        | Что вы получите                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Как это связано                                                                                                                                                                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Подписка Claude** (Pro / Max)             | Пятичасовые и недельные интервалы с указанием процента и времени сброса, модель окна, дополнительный кредит и понесенные расходы в валюте, в которой производится выставление счета.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Войдите в систему, используя свою учетную запись Anthropic: откройте ссылку, войдите в систему и вставьте код.                                                                                                                  |
| **Подписка на ChatGPT** (Plus / Pro, Codex) | Пятичасовые и недельные окна; отдельное пятичасовое и недельное окно для каждой модели со своим собственным лимитом (например, GPT-5.3-Codex-Spark); кредиты Codex (отдельная единица, а не деньги); приобретаемые ваучеры для сброса лимита. Рабочее место, лимит кредита или расходов которого был исчерпан, считается достигшим своего лимита.                                                                                                                                                                                                                                                                                                                                                  | Адаптер отображает короткий код, который вы вводите на веб-сайте OpenAI. Ваша собственная регистрация в Codex остается неизменной.                                                                                              |
| **Подписка Google Gemini** (Pro / Ultra)    | Квотные лимиты Antigravity (5 часов в неделю, перечитывать не чаще, чем каждые 15 минут), где Google их указывает, и квоты модели.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Откройте ссылку и войдите в систему. Google перенаправит вас на... `localhost` Назад. **Ваш браузер отображает страницу с ошибкой — это сделано намеренно** . Скопируйте полный адрес из адресной строки и вставьте его обратно. |
| **OpenRouter**                              | Потребление в текущий лимитный период, лимит, остаток, проценты; расходы сегодня, в этом месяце и за весь срок действия ключевого показателя, прогноз на конец месяца.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Выберите сохраненный ключ из центрального хранилища администратора.                                                                                                                                                             |
| **DeepSeek**                                | Остаток средств на счете (начисленный и пополненный отдельно) и достаточно ли его для проведения запросов.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Выберите сохраненный ключ                                                                                                                                                                                                       |
| **Организация OpenAI**                      | Стоимость на сегодня и на текущий месяц, прогноз на конец месяца, стоимость токенов на модель на сегодняшний день.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Для работы требуется **административный ключ** от вашей организации.                                                                                                                                                            |
| **Антропическая организация**               | Затраты за сегодня и этот месяц, прогноз на конец месяца, токены за сегодня — Anthropic сообщает о некэшированных входных токенах, поэтому совпадения из кэша запросов не включены. Затраты в Anthropic указаны в центах и конвертируются. 1-го числа каждого месяца отчет о затратах не запрашивается (он отклоняет период, начинающийся с открытого дня), поэтому месяц начинается с 0. Другая интеграция сообщает, что отчет о затратах включает только завершенные дни; в этом случае «сегодня» остается равным 0 до конца дня. Приоритетный уровень оплачивается по-другому и не включен в этот отчет — поэтому организация, находящаяся на этом уровне, тратит больше, чем показывают цифры. | Для работы требуется **административный ключ** от вашей организации.                                                                                                                                                            |

Три указанных адреса подписки используются собственными программами поставщиков. Они **не задокументированы официально** и могут изменяться. Только подписка Claude была протестирована на реальном аккаунте. ChatGPT, Google, OpenRouter, DeepSeek, а также отчеты от организаций OpenAI и Anthropic созданы на основе справочных материалов поставщиков и исходного кода их собственных программ, но никогда не запускались на реальном аккаунте — пожалуйста, сообщайте о любых проблемах.

---

## Требования

- Node.js >= 22
- ioBroker js controller >= 7.2.2
- **В ioBroker Admin >= 8.0.11** адаптер считывает ключи API из центрального хранилища данных доступа администратора, вместо того чтобы повторно запрашивать их.

---

## Меблировать

1. Установите адаптер и откройте настройки экземпляра.
2. На странице отображается **список** : сначала три подписки, затем по одной строке для каждого ключа ИИ, которые вы сохранили в **разделе Администрирование → Настройки → Данные доступа** .
3. Выберите, что вы хотите отслеживать. Для каждой строки установлен свой **порог предупреждения** (10–100%, по умолчанию 80%).
4. При оформлении подписки откроется область входа, которая проведет вас через весь процесс, требуемый этим провайдером. **Сохраните изменения заранее** — вход будет осуществлен через текущий экземпляр.
5. После успешной регистрации ваш аккаунт будет проверен немедленно; вам не нужно ждать следующего цикла.

### Параметры

| вариант              | Эффект                                                                                                                                     | стандарт |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **Интервал запроса** | Частота запросов к каждой учетной записи, в секундах. Минимум 60 секунд.                                                                   | 300 с    |
| **Уведомления**      | Уведомление от ioBroker, когда учетная запись превышает пороговое значение предупреждения или учетные данные для входа перестают работать. | а        |

Запросы к учетным записям выполняются с интервалами, небольшими по времени. Если провайдер отвечает сообщением «слишком много запросов», для данной учетной записи начинается постепенно увеличивающаяся задержка (10 минут, удваивающаяся до одного часа) — при этом сохраняются самые последние считанные значения.

---

## Дерево объектов

На одну учетную запись приходится один узел устройства с одинаковым именем для всех провайдеров:

```
ai-usage.0
├─ info.connection            mindestens ein Konto liefert Daten
├─ <konto>                    z. B. claude, chatgpt, gemini, <name>-api
│  ├─ info.unreach            das Offline-Kennzeichen; steuert das Symbol im Objektbaum
│  ├─ info.error              der Grund im Klartext; leer, solange alles läuft
│  ├─ info.lastUpdate         wann die aktuellen Werte geholt wurden
│  ├─ warning                 über der Warnschwelle des Kontos
│  ├─ limitReached            bei 100 %
│  ├─ limits.<fenster>.percent     Auslastung eines Limit-Fensters
│  ├─ limits.<fenster>.resetAt     wann es zurückgesetzt wird (leer, wenn keins läuft)
│  ├─ limits.<fenster>.active      ob dieses Fenster gerade das gültige Limit ist
│  ├─ credits.*               verbraucht / Grenze / Rest / Prozent, gewährt / aufgeladen,
│  │                          und ob das Guthaben noch für Aufrufe reicht
│  ├─ costs.*                 heute / Monat / gesamt / Monatsend-Prognose
│  ├─ tokens.*                Eingabe- und Ausgabe-Token heute
│  └─ models.<modell>.*       Token je Modell
└─ total
   ├─ costs.today / month / projectedMonth      summiert über alle USD-Konten
   ├─ maxLimitPercent         das vollste Konto (Limit-Fenster oder Budget)
   ├─ warningsActive          Konten über ihrer Schwelle
   ├─ limitReached            irgendein Konto bei 100 %
   ├─ accountsReachable       Konten, die gerade liefern
   └─ accounts                Konten, die du eingeschaltet hast
```

**После создания точки данных сохраняются.** Если поставщик временно пропускает поле, сама точка данных не исчезает — метки времени просто записываются как пустые. Удаляется только целое окно или модель, о которых поставщик больше не сообщает; а деактивированная учетная запись полностью теряет свой узел.

** `total.costs` Суммируются только реальные деньги в одной и той же валюте** — счетчики денежных средств (запросы на пополнение баланса, обнуление ваучеров) и иностранные валюты намеренно исключены.

---

## Предупреждения — и то, что говорит в пользу этой версии.

Только окно **, охватывающее весь тарифный план,** запускает оповещение об учетной записи. Для квоты модели выделяются отдельные точки данных, но оповещение никогда не срабатывает: модель, которую вы никогда не трогаете, может постоянно оставаться на 100%, а оповещение, которое никогда не срабатывает, хуже, чем его отсутствие. Google — особый случай: там, где он сообщает о своих пулах квот, эти пулы представляют собой окна, охватывающие весь тарифный план; там, где он этого не делает, квоты модели ЯВЛЯЮТСЯ тарифным планом — тогда наиболее заполненное окно представляет учетную запись, и оповещение идентифицирует модель.

Выделенный бюджет конкурирует с окнами: счет, деньги на котором почти исчерпаны, так же неактивен, как и счет с постоянно работающим окном. Более высокое значение из двух определяет название предупреждения.

---

## Статус онлайн

`info.unreach` Эта функция называется **"данная учетная запись не выполняет доставку"** и управляет символом подключения рядом с учетной записью в дереве объектов:

| Позиция                                                       | символ                                               | `info.error`                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Всё идёт гладко.                                              | зеленый                                              | пустой                                                       |
| Ограничено поставщиком услуг.                                 | Зеленый — предыдущие значения по-прежнему актуальны. | Там указано время ожидания.                                  |
| Заявка отклонена                                              | красный                                              | «Вход в систему отклонен — …»                                |
| Сервис сообщает о неисправности.                              | красный                                              | «Сервис искусственного интеллекта сообщает о неисправности…» |
| Ответ непригоден для использования.                           | красный немедленно                                   | «Ответ не удалось обработать…»                               |
| Совершенно недостижимый                                       | красный, после трех попыток                          | «Недоступно после N попыток —…»                              |
| Вышел из системы                                              | Красный цвет, для этого аккаунта нет оповещений.     | "Не авторизован — …"                                         |
| Клавиша не выбрана                                            | Красный цвет, для этого аккаунта нет оповещений.     | «Ключ API не выбран — …»                                     |
| Выбранный ключ был удален из памяти.                          | Красный цвет, для этого аккаунта нет оповещений.     | «Выбранный ключ больше не существует —…»                     |
| Выбранная запись не имеет ключа.                              | Красный цвет, для этого аккаунта нет оповещений.     | «Выбранные учетные данные не содержат ключа API —…»          |
| Экземпляр остановлен или запущен, но запрос еще не отправлен. | красный                                              | `Unknown`                                                    |

Если провайдер отправляет собственную причину («недействительный ключ API», «превышен лимит запросов»), это указывается в следующем документе: `info.error` вместо простого числового значения статуса.

---

## Защита данных и доступ к данным

- Токены подписки принадлежат исключительно адаптеру: они зашифрованы в папке данных экземпляра и доступны для чтения только владельцу. Адаптер **никогда не** читает и не записывает файлы ваших собственных программ. `~/.codex/auth.json`, `oauth_creds.json`) — чьи токены обновления меняются; два участника, обновляющие токены, отпишутся друг от друга.
- Ключи API берутся из центрального административного хранилища и не копируются.
- При входе в систему через Claude запрашиваются только права доступа к профилю — токен не может создавать ключи API или вызывать модели.
- Адаптер взаимодействует только с поставщиками ИИ и ни с кем другим.

---

## Если что-то застряло

**Кнопка входа в систему ничего не делает / строка бесконечно вращается.** Сначала сохраните изменения и убедитесь, что экземпляр запущен — вход в систему представляет собой взаимодействие с запущенным адаптером.

**После регистрации Google отображает страницу с ошибкой.** Это сделано намеренно, и именно поэтому этот метод вообще работает. Скопируйте **полный адрес** из адресной строки и вставьте его в поле.

Сообщение **"Не авторизован", хотя вы уже вошли в систему.** Сохраненный логин был отклонен провайдером (токен обновления был отозван или истек срок его действия). Войдите снова — система предложит вам это сделать, вместо того чтобы показывать, что вы подключены.

**Учетная запись OpenAI или Anthropic не предоставит никаких результатов.** Для создания этих отчетов требуется **ключ администратора организации** . Личная учетная запись без организации вообще не сможет их создать — для этого используйте подписку Claude.

**Клод отвечает: «Слишком много запросов».** Увеличьте интервал. Адаптер регистрируется так же, как и собственные инструменты Клода, и ограничивает себя — однако при очень коротких интервалах между запросами в нескольких программах запросы всё равно могут накапливаться.

---

## Поддерживать

Вопросы, сообщения об ошибках и предложения: <https://github.com/krobipd/ioBroker.ai-usage/issues>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
-->

### 0.16.0 (2026-09-25)

- Fixed: ChatGPT limits of a single model (such as GPT-5.3-Codex-Spark) were never shown — each now gets its own 5-hour and weekly window
- Fixed: An OpenRouter key with a monthly limit counted its whole lifetime spend against that limit and could stay at "limit reached" for good
- Changed: OpenRouter `credits.used` now shows the use in the running limit period; the lifetime spend stays in `costs.total`, so the history jumps once
- New: OpenRouter spend today and this month, with a month-end projection, now also counted in the cost totals
- Fixed: Claude extra usage billed in euros was counted as dollars in the cost totals — it now keeps the account's own currency
- Fixed: Alarms of an account stayed on for good when its API key was removed, or when the last account was switched off
- Fixed: After a restart the totals no longer drop to 0 for a moment, and `total.limitReached` no longer flips while the first query fails
- Fixed: Last month's costs of an account that stopped delivering no longer stay in this month's totals
- Fixed: A model limit alone no longer raises the account's warning when the plan-wide windows are still unused
- Fixed: Signing out now clears the account's alarms at once instead of with the next query
- Fixed: The ChatGPT sign-in no longer breaks off while you are still typing the code
- New: The adapter picks up a key that was changed or deleted in the credential storage while it runs
- New: A workspace stopped by its used-up credits or its spend control counts as "limit reached" for ChatGPT
- New: Google's plan-wide quota pools (5-hour and weekly) are shown where Google reports them, and they decide the account's warning
- Improved: `info.error` says why a key account has no key — none selected, deleted from the storage, or holding no key
- Improved: Google accounts without a Code Assist project show Google's own reason, and a refused quota query no longer reports a rejected sign-in
- Fixed: An Anthropic organisation account no longer fails for the whole 1st of every month
- Fixed: The settings page no longer spins forever when the instance does not answer, and shows a key row whose stored key is gone
- Fixed: Copying the sign-in code or link now works on plain http:// as well
- Improved: Several notifications of different accounts are kept instead of the newest replacing the previous one
- Improved: After a throttle the next query waits as long as the provider asks, instead of retrying too early
- Fixed: An instance stopped during its start no longer overwrites the stopped state of its accounts afterwards

Only the Claude subscription runs against a real account here. The ChatGPT, OpenRouter, Google,
DeepSeek and organisation changes follow the providers' references and their own tools' sources
and are covered by tests, but were not seen on a real account.

### 0.15.0 (2026-09-16) — stable

- Fixed: Model channels of an organisation account no longer vanish at the turn of a month — a model with no usage yet was deleted with its history and re-created on its next use
- Fixed: Stopping the instance right after it started no longer leaves the accounts showing as connected while the instance is switched off
- Fixed: Failures that reached the log, the `info.error` datapoint and Sentry as `[object Object]` now name the actual error
- Improved: A provider answer that keeps growing can no longer push the adapter towards running out of memory — it is cut off and reported as a service fault

The month-boundary fix concerns OpenAI organisation accounts, which have no real account here; it is
covered by tests and by the counter-test that limit windows are still cleaned up.

### 0.14.0 (2026-09-15)

- Fixed: A failed write of the token file after a refresh lost the sign-in for good — the provider had already rotated them, so the next poll reported a rejected sign-in
- Fixed: Signing out no longer comes undone by itself — a sign-out that landed during a background token renewal could leave the account signed in
- Fixed: The last-update stamp moved forward on a tolerated connection failure, dating values the round had never fetched
- Fixed: An answer the adapter cannot process is reported as a service fault at once, instead of claiming for three rounds that the service is unreachable
- Fixed: A failed cleanup of vanished windows or models no longer discards the round — the values were in the tree, but the account called them unstored and the totals froze
- Fixed: A connection failure counter that a throttle or a rejected sign-in had interrupted no longer adds up to "not reachable"
- Fixed: An account you signed out of drops its warning and limit alarms and leaves the adapter-wide totals — its measured values stay in the tree
- Fixed: The reset time of the Claude session and week windows is filled from the plan-wide block when the window entry itself carries none
- Improved: Window reset times, the next voucher expiry and the credit ceiling are written only when they change — announced facts, not measurements, so their timestamp stops moving every poll
- Improved: Where a provider sends a reason of its own, `info.error` now says it ("invalid API key") instead of a bare status number
- Improved: An access token the provider invalidated early is refreshed once and the request repeated, instead of reporting a rejected sign-in until it would have expired

Only the Claude subscription runs against a real account here. The token-file fix, the early-refresh
retry and the sign-out behaviour are covered by tests but were not seen on a real ChatGPT, Google,
OpenRouter, DeepSeek, OpenAI or Anthropic account.

### 0.13.0 (2026-09-12)

- Fixed: The costs of an Anthropic organisation account were a hundred times too high — the provider counts them in cents, the adapter read them as dollars
- Fixed: The same error was in the adapter-wide cost totals
- Fixed: An account whose values could not be written to the object database kept reporting itself as delivering, with a last-update stamp that went on moving
- Fixed: An answer still waiting on the object database during shutdown could mark accounts online again afterwards, or delete objects
- Fixed: An answer in a shape the adapter does not recognise now counts as a service fault, instead of reading as "this account has nothing"
- Fixed: Limit windows and model channels are no longer deleted when a single answer says nothing about them
- Fixed: Token counters of an organisation account show 0 after UTC midnight instead of keeping yesterday's numbers
- Fixed: Restarting the instance above the warn threshold no longer raises the warning and the notification again
- Fixed: The "limit reached" total now counts a window the provider has closed, the way each account already did
- Fixed: A configured account row the adapter cannot use now says so in the log instead of disappearing
- Improved: The "active window" and DeepSeek "available" flags are written only when they actually change, so their timestamp stops moving on every poll
- Improved: The ChatGPT voucher inventory is fetched about once an hour instead of every poll, halving that account's requests
- Improved: The settings page shows a finished device-code sign-in right away instead of up to half a minute later
- Improved: The provider table now says that Anthropic's cost report leaves out Priority Tier spend, so an organisation on that tier really spends more than the figures show

### 0.12.1 (2026-09-07)

- Fixed: The last-update stamp of an account no longer moves forward while the provider is only throttling — it dates the values standing next to it, so you can see how old they really are
- Improved: Twenty-five more datapoints explain themselves in the object tree — what "today" means (the provider counts it in UTC), and why the cost totals can be lower than the accounts show

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

_Developed with assistance from Claude.ai_