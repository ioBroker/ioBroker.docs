---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.ai-usage
BADGE-stable: https://iobroker.live/badges/ai-usage-stable.svg
BADGE-Installations: https://iobroker.live/badges/ai-usage-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.ai-usage
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
hash: EkQaQ/OTGwDupCcqX9dUNSUaa3IUw9/vTJjlMs0jFvc=
---
# ioBroker.ai-usage

Отслеживает потребление, лимиты и затраты ваших учетных записей ИИ и записывает их в доступные только для чтения точки данных ioBroker. Адаптер **только читает** — Он никогда не обращается к модели, ничего не меняет в отношениях с поставщиком и никуда не отправляет ваши данные.

---

## Что он может отслеживать

| Счет                                         | Что вы получите                                                                                                                                                                        | Как это связано                                                                                                                                                                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Подписка на Клода** (Про / Макс)           | Пятичасовые и недельные интервалы с указанием процента и времени сброса, модель окна, дополнительные баллы и связанные с ними расходы.                                                 | Войдите в систему, используя свою учетную запись Anthropic: откройте ссылку, войдите в систему и вставьте код.                                                                                                                            |
| **Подписка на ChatGPT** (Плюс / Про, Кодекс) | 5-часовые и недельные окна, дополнительные окна на каждую поверхность, баланс кредита, возможность приобретения ваучеров для сброса лимита.                                            | Адаптер отображает короткий код, который вы вводите на веб-сайте OpenAI. Ваша собственная регистрация в Codex остается неизменной.                                                                                                        |
| **Подписка Google Gemini** (Про / Ультра)    | Квоты на модели, о которых сообщает Google.                                                                                                                                            | Откройте ссылку и войдите в систему. Google перенаправит вас на... `localhost` назад, **В вашем браузере отображается страница с ошибкой — это сделано намеренно.**&#x421;копируйте весь адрес из адресной строки и вставьте его обратно. |
| **OpenRouter**                               | Использованные значения баланса, лимита, остатка баланса, процента.                                                                                                                    | Выберите сохраненный ключ из центрального хранилища администратора.                                                                                                                                                                       |
| **DeepSeek**                                 | Остаток средств на счете (начисленный и пополненный отдельно) и достаточно ли его для проведения запросов.                                                                             | Выберите сохраненный ключ                                                                                                                                                                                                                 |
| **Организация OpenAI**                       | Стоимость на сегодня и на текущий месяц, прогноз на конец месяца, стоимость токенов на модель на сегодняшний день.                                                                     | нужен один **ключ администратора** ваша организация                                                                                                                                                                                       |
| **Антропическая организация**                | Затраты на сегодня и текущий месяц, прогноз на конец месяца, токены за сегодня — Anthropic сообщает о некэшированных входных токенах, поэтому данные из кэша подсказок не учитываются. | нужен один **ключ администратора** ваша организация                                                                                                                                                                                       |

Три точки доступа к подписке — это те же самые, которые используют и собственные программы провайдеров. **официально не задокументировано** и могут быть изменены в любое время. Клод был протестирован на реальной подписке; ChatGPT и Google созданы с использованием исходного кода, но никогда не запускались на реальном аккаунте — пожалуйста, сообщите о проблеме, если что-то не так.

---

## Требования

- Node.js >= 22
- ioBroker js controller >= 7.2.2
- **ioBroker Admin >= 8.0.11** — Адаптер считывает ключи API из центрального хранилища данных доступа администратора, вместо того чтобы повторно запрашивать их.

---

## Меблировать

1. Установите адаптер и откройте настройки экземпляра.
2. На странице показано **список**Сначала три подписки, затем по одной строке на каждый ключ ИИ, которые вы можете найти в разделе **Администратор → Настройки → Данные для входа** Вы внесли депозит.
3. Включите мониторинг того, что вы хотите отслеживать. Каждая строка имеет свой собственный интерфейс. **Порог предупреждения**
   (10–100%, стандарт 80%).
4. При оформлении подписки открывается область регистрации, расположенная ниже строки, и ведет по пути, установленному данным провайдером. **Сохраните данные заранее.** — Регистрация осуществляется через текущий экземпляр.
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
│  ├─ info.lastUpdate         letzte erfolgreiche Abfrage
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

**После создания точки данных сохраняются.** Если поставщик временно пропускает поле, точка данных не исчезает — метки времени просто записываются как пустые. Удаляется только целое окно или модель, о которых поставщик больше не сообщает; а деактивированная учетная запись полностью теряет свой узел.

**`total.costs` Суммируются только реальные деньги одной и той же валюты.** — Счетчики товаров (запросы на списание средств, сброс ваучеров) и иностранные валюты намеренно исключены.

---

## Предупреждения — и то, что говорит в пользу этой версии.

Всего один **в масштабах всего плана** Окно запускает предупреждение учетной записи. Квота моделей получает свои собственные данные, но никогда не вызывает оповещения: модель, которую вы никогда не трогаете, может навсегда остаться на 100%, а оповещение, которое никогда не срабатывает, хуже, чем его отсутствие. Google является исключением — там вообще нет окна, охватывающего весь тарифный план, поэтому максимально заполненная квота моделей отражает состояние учетной записи, а уведомление указывает название модели.

Выделенный бюджет конкурирует с окнами: счет, деньги на котором почти исчерпаны, так же неактивен, как и счет с постоянно работающим окном. Более высокое значение из двух определяет название предупреждения.

---

## Статус онлайн

`info.unreach` называется **"Этот аккаунт не доставляется"** и управляет значком подключения рядом с учетной записью в дереве объектов:

| Позиция                                                       | символ                                               | `info.error`                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Всё идёт гладко.                                              | зеленый                                              | пустой                                                       |
| Ограничено поставщиком услуг.                                 | Зеленый — предыдущие значения по-прежнему актуальны. | Там указано время ожидания.                                  |
| Заявка отклонена                                              | красный                                              | «Вход в систему отклонен — …»                                |
| Сервис сообщает о неисправности.                              | красный                                              | «Сервис искусственного интеллекта сообщает о неисправности…» |
| Совершенно недостижимый                                       | красный, после трех попыток                          | «Недоступно после N попыток —…»                              |
| Экземпляр остановлен или запущен, но запрос еще не отправлен. | красный                                              | `Unknown`                                                    |

---

## Защита данных и доступ к данным

- Подписочные токены принадлежат исключительно адаптеру: они зашифрованы в папке данных экземпляра и доступны для чтения только владельцу. Адаптер читает и записывает их. **никогда** файлы ваших собственных программ (`~/.codex/auth.json`, `oauth_creds.json`) — чьи токены обновления меняются; два участника, обновляющие токены, отпишутся друг от друга.
- Ключи API берутся из центрального административного хранилища и не копируются.
- При входе в систему через Claude запрашиваются только права доступа к профилю — токен не может создавать ключи API или вызывать модели.
- Адаптер взаимодействует только с поставщиками ИИ и ни с кем другим.

---

## Если что-то застряло

**Кнопка входа в систему не работает / линия бесконечно вращается.**
Сначала сохраните изменения и убедитесь, что экземпляр запущен — вход в систему осуществляется посредством взаимодействия с работающим адаптером.

**После входа в систему Google отображает страницу с ошибкой.**
Это сделано намеренно, и именно поэтому такой подход вообще работает. **полный адрес** Скопируйте текст из адресной строки и вставьте его в поле.

**«Не авторизован», хотя вы уже вошли в систему.**
Сохраненная учетная запись была отклонена провайдером (токен обновления был отозван или истек срок его действия). Пожалуйста, войдите в систему снова — это сообщение будет отображаться вместо имитации подключения.

**Использование учетных записей OpenAI или Anthropic не дает результатов.**
Эти отчеты нуждаются в **Ключ администратора организации**Создать личный аккаунт без организации невозможно — для этого используйте подписку Claude.

**Клод отвечает: «Слишком много запросов».**
Увеличьте интервал. Адаптер регистрируется так же, как и собственные инструменты Клода, и ограничивает себя — однако, при очень коротких интервалах между запусками нескольких программ это все еще может произойти.

---

## Поддерживать

Вопросы, ошибки и идеи: <https://github.com/krobipd/ioBroker.ai-usage/issues>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.1 (2026-09-07)

- Fixed: The last-update stamp of an account no longer moves forward while the provider is only throttling — it dates the values standing next to it, so you can see how old they really are
- Improved: Twenty-five more datapoints explain themselves in the object tree — what "today" means (the provider counts it in UTC), and why the cost totals can be lower than the accounts show

### 0.12.0 (2026-09-06)

- Fixed: An account that has not been signed in yet no longer reports a rejected sign-in — no warning, no notification, and the settings page keeps offering the sign-in button
- Fixed: An account whose API key is missing or unreadable is now shown as not delivering, instead of leaving its old values standing as though they were current
- Fixed: An answer arriving while the adapter shuts down can no longer mark an account as online again after the shutdown wrote it offline
- Fixed: A throttled account counts as delivering everywhere now — the connection icon and the "reachable accounts" total no longer contradict each other
- Fixed: A limit the provider reports as empty is no longer shown as 0 % used, and a Google quota without a value no longer reads as completely used up
- Fixed: A rejected ChatGPT sign-in now says so at once instead of leaving you waiting for a quarter of an hour, and a Google account keeps delivering when one route is unavailable
- Fixed: A Google account without an AI subscription says so, instead of asking for a sign-in that cannot change the answer
- New: Every limit window shows whether it is the limit currently in force — with Claude the provider states it, elsewhere it is the window that speaks for the account
- Improved: An account is reported as at its limit when the provider says the window is closed, not only when the percentage happens to reach 100
- Improved: A window's reset time is written to the minute, so a recording of it no longer gains an entry on every single query, only on real changes
- Improved: An account that is delivering again says so in the log, instead of leaving the warning about its outage standing as the last word on it
- Improved: The settings page no longer asks the adapter for every status every four seconds — the values now arrive on their own as they change
- Changed: "Balance sufficient for calls" now sits under credits, where it belongs; the datapoint at the old place is removed automatically
- Changed: Each account node shows the readable provider name instead of the internal one — "Claude Max (Claude)" instead of "Claude Max (claude-sub)"
- Fixed: A per-model folder is now named in your ioBroker language as well, instead of carrying the provider's bare model identifier as its only name
- New: The datapoints whose meaning is not obvious from their name now carry a short explanation in eleven languages, shown in the object tree

### 0.11.0 (2026-09-05)

- Fixed: Signing in from the instance settings works again — a leftover setting from an earlier version had silently closed the adapter's message channel, so none of the three flows reached it
- Fixed: A subscription whose stored sign-in was rejected no longer claims to be signed in — the row now offers the sign-in again instead of showing a green check next to an error
- Fixed: The status badge of an account no longer blanks out for a moment when a single status read is missed — a hiccup in the settings page is not an account without a status
- Fixed: A stored credential whose name sorts high in the alphabet is no longer missing from the account list in the instance settings
- Fixed: The settings page falls back to English for a browser language the adapter does not ship, instead of passing that language on unchecked
- Improved: All object names are now available in eleven languages instead of English only, and a renamed object reaches installations that already exist
- Improved: ChatGPT usage is read with the identity that endpoint expects, the way the Claude query already did — fewer rejected requests on that account
- Improved: Monthly cost reports can no longer be cut short in silence — a report that does not fit is reported in the log instead of producing a figure that is too low
- Changed: "Highest account utilisation" says what it always measured — the fullest limit window **or** the account's remaining budget

### 0.10.0 (2026-09-01)

- Fixed: The reset-time datapoint of a limit window no longer disappears and reappears — it stays and simply empties while no window is running
- Fixed: The settings page no longer shows the sign-in screen to a signed-in account, and its rows load without waiting for the credential storage scan
- Improved: Claude usage is read with far fewer rejections — the query now identifies itself the way the endpoint expects
- Changed: New Claude sign-ins request only the profile permission — the stored access can no longer create API keys or run models
- New: ChatGPT accounts show their purchasable limit-reset credits — how many are available and when the next one expires
- Improved: An unreadable provider answer is now reported as a service fault instead of a missing connection

### 0.9.3 (2026-08-27)

- Fixed: The first start after updating no longer leaves a warning in the log

[Older changelogs can be found there](CHANGELOG_OLD.md)

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