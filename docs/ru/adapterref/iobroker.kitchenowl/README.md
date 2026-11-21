---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kitchenowl/README.md
title: ioBroker.kitchenowl
hash: Ohmlcnpb24CuiYd/StdGZC9JidQephJXl+oNCafhlMw=
---
<p align="center"> <img src="admin/kitchenowl.png" alt="KitchenOwl" width="120" /> </p>

# IoBroker.kitchenowl
<p align="center">Перенесите свою собственную кухню <a href="https://kitchenowl.org/">KitchenOwl</a> в ioBroker.

</p>

<p align="center"> <a href="https://github.com/n1tr0-5urf3r/ioBroker.kitchenowl/actions/workflows/test-and-release.yml"><img src="https://github.com/n1tr0-5urf3r/ioBroker.kitchenowl/actions/workflows/test-and-release.yml/badge.svg?branch=main" alt="Test and Release" /></a> <a href="https://www.npmjs.com/package/iobroker.kitchenowl"><img src="https://img.shields.io/npm/v/iobroker.kitchenowl.svg" alt="NPM version" /></a> <a <img src="https://www.npmjs.com/package/iobroker.kitchenowl"><img src="https://img.shields.io/npm/dm/iobroker.kitchenowl.svg" alt="Downloads" /></a> <img src="https://iobroker.live/badges/kitchenowl-installed.svg" alt="Number of installations" /> <img src="https://iobroker.live/badges/kitchenowl-stable.svg" alt="Current version in stable repository" /> <a href="LICENSE"><img src="https://img.shields.io/npm/l/iobroker.kitchenowl.svg" alt="License" /></a> </p>

## Функции
- **Списки покупок** - каждый список с указанием товаров, текстовое резюме, разделенное запятыми, для уведомлений, и недавно...

удаленные элементы

- **Планировщик питания** - одна ветка на каждый будний день плюс следующий запланированный прием пищи, готовый для отображения на панели управления или голосовой подсказки.
- **Рецепты** - ингредиенты, время приготовления, количество порций, теги, источник и фото, для каждого рецепта или в виде одного JSON-файла.
- **Расходы** - недавние бронирования, расходы по категориям и обзор статистики за день/неделю/месяц/год
- **Участники и остатки** - кто сколько должен, округленные суммы, готовые к отображению.
- **Каталог товаров** - все известные товары, категории и метки
- **Ответьте** - добавьте и отметьте пункты в списке покупок, забронируйте расходы, спланируйте рецепты, импортируйте рецепт по URL-адресу.
- **Многосемейная синхронизация** - синхронизация одного, нескольких или всех домохозяйств, которые может видеть токен.
- **На немецком и английском языках** представлено повсюду, как в административном интерфейсе, так и в дереве объектов.

Все вышеперечисленные функции можно отключить по отдельности, а доступ на запись по умолчанию отключен.

<подробности> <краткое описание><b>О программе KitchenOwl, совместимость и отказ от ответственности</b></summary>

KitchenOwl - это бесплатный, размещаемый на собственном сервере менеджер списков покупок и рецептов. Проект находится по адресу [github.com/TomBursch/kitchenowl](https://github.com/TomBursch/kitchenowl) и распространяется под лицензией AGPL-3.0.

Протестировано на KitchenOwl v0.7.10 (версия бэкэнда 124). Пути API, привязанные к домохозяйству, остаются стабильными с версии бэкэнда 57, поэтому версии 0.4 и новее должны работать; адаптер считывает версию сервера при запуске и записывает её в `info.serverVersion`.

**Оговорка:** Этот адаптер является независимым проектом и не связан с проектом KitchenOwl или его авторами, не одобрен ими и не поддерживается ими. Название и логотип KitchenOwl принадлежат их соответствующим владельцам; логотип используется здесь только для идентификации сервиса, к которому подключается этот адаптер.

</details>

## Начиная
1. Установите адаптер и создайте экземпляр.
2. В KitchenOwl создайте долгосрочный API-токен: откройте свой профиль, перейдите в раздел **Сессии** и добавьте долгосрочный токен.
3. Введите базовый URL-адрес вашего сервера (например, `https://kitchenowl.example.com`) и токен.

Перейдите на вкладку **Подключение**, затем нажмите **Проверить соединение**. Адаптер добавит к себе `/api` и удалит завершающий `/api`, если вы его введете.

4. На вкладке **Домохозяйства и синхронизация** выберите домохозяйства для синхронизации. Если оставить поле пустым, синхронизация будет выполняться для каждого домохозяйства отдельно.

домохозяйство, которое может видеть токен.

Токен принадлежит пользователю, а не домохозяйству, и предоставляет пользователю все права, которые он имеет во всех домохозяйствах, членом которых он является. Он не истекает, пока вы не отзовете его в KitchenOwl.

<подробности> <краткое описание><b>Все настройки</b></краткое описание>

### Связь
| Настройки | По умолчанию | Описание |
| --- | --- | --- |
| URL сервера | - | Базовый URL экземпляра, без `/api` |
| API-токен | - | Долгосрочный токен; хранится в зашифрованном виде в конфигурации экземпляра |
| Время ожидания запроса | 10000 мс | Сколько времени может занять один запрос |
| Количество попыток на запрос | 2 | При ошибках сервера и сети выполняется повторная попытка; ответы с кодом 4xx не обрабатываются |
| Задержка между повторными попытками | 2000 мс | Увеличивается линейно с номером попытки |
| Проверка TLS-сертификата | включено | Отключить только для самоподписанного сертификата |

### Домохозяйства и синхронизация
| Настройки | По умолчанию | Описание |
| --- | --- | --- |
| Домохозяйства для синхронизации | все | Пустое поле означает, что все домохозяйства видны токену |
| Интервал опроса | 300 с | Минимум 30 с |
| Читайте рецепты и каталог каждые | 10 опросов | Эти два раздела читаются чаще всего и редко меняются; 1 человек читает их в каждом опросе. При обновлении страницы они читаются независимо от того, что там написано |
| Остатки средств на счетах участников и расходов | на | |
| Списки покупок | на | |
| Рецепты | на | |
| Планировщик питания | включен | Пропускается для домохозяйств с отключенной функцией планирования |
| Расходы | включены | Пропускается для домохозяйств с отключенной функцией учета расходов |
| Каталог товаров, категории и теги | выключено | Может содержать несколько сотен записей на одно домохозяйство |
| Создать дерево состояний для каждого рецепта | включено | выключено оставляет только состояние `recipes.json` |
| Создать дерево состояний для каждого элемента списка покупок | вкл | Выкл оставляет только состояние `json` для каждого списка |
| Удалять объекты, исчезнувшие в KitchenOwl | включено | Обрезает состояния для удаленных списков, рецептов и участников |
| Загрузка фотографий для визуализации | включено | Сохраняет копию каждой фотографии вместе с адаптером; примерно 185 КБ на фотографию, загружается один раз |

### Затраты
| Настройки | По умолчанию | Описание |
| --- | --- | --- |
| Перспектива | Вся семья | Личные отчеты содержат только вашу долю расходов |
| Страницы с последними расходами | 1 | Сервер возвращает 30 расходов на странице |
| Временные рамки | Ежемесячно | Размер сегмента обзора статистики |
| Количество периодов | 5 | Сколько периодов охватывает обзор, включая текущий |

### Доступ на запись
По умолчанию отключено. При включении адаптер создает дополнительные состояния и кнопки, доступные для записи; см. раздел **Запись данных в KitchenOwl** ниже.

</details>

<подробности> <краткое описание><b>Дерево объектов</b></краткое описание>

```
kitchenowl.<instance>
├── info
│   ├── connection              adapter reached the server on the last poll
│   ├── lastUpdate              timestamp of the last successful poll
│   ├── lastError               message of the last failure, empty when healthy
│   ├── serverVersion           KitchenOwl backend version
│   └── minFrontendVersion      minimum frontend version the server expects
├── commands
│   └── refresh                 button, polls immediately
└── households.<id>
    ├── name, description, language, photoUrl, viewOrdering
    ├── expensesFeature, plannerFeature, defaultShoppingListId
    ├── members
    │   ├── count, balancesJson
    │   └── <username>          id, name, username, balance, isHouseholdAdmin,
    │                           isOwner, lastSeen, photoUrl
    ├── shoppingLists
    │   ├── count, json
    │   └── <listId>            name, itemCount, itemNames, json, recentItemsJson
    │       └── items.<itemId>  name, category, icon, description
    ├── recipes
    │   ├── count, json
    │   └── <recipeId>          name, description, time, prepTime, cookTime,
    │                           yields, source, photoUrl, tags, planned,
    │                           plannedDays, visibility, itemsJson
    ├── planner
    │   ├── count, json, nextRecipeName, nextRecipeId, nextCookingDate
    │   └── days.<0-6>          count, recipeNames, date, json
    ├── expenses
    │   ├── count, recentJson, overviewJson, currentPeriodTotal
    │   ├── newestName, newestAmount, newestDate, newestPaidBy
    │   └── categories.<id>     name, budget, color, currentPeriodSum
    │       └── uncategorized   currentPeriodSum for expenses with no category
    └── catalog
        └── itemsJson, itemCount, categoriesJson, categoryCount, tagsJson, tagCount
```

**О `photoUrl`:** KitchenOwl отправляет фотографии только в ответ на запрос, содержащий токен API, который браузер никогда не отправляет для тега `<img>`, поэтому адрес на сервере отвечает `Request unauthorized`. Таким образом, адаптер загружает каждую фотографию один раз в собственное файловое хранилище и указывает `photoUrl` на эту копию, что-то вроде `/kitchenowl.0/photos/<name>.jpg`, которую ioBroker предоставляет без токена, и любая визуализация может загрузиться. Фотографии именуются по UUID вышестоящего источника, поэтому изображение загружается один раз и загружается снова только при фактическом изменении; копии, на которые больше ничего не ссылается, удаляются. Сохраняются только фотографии, на которые действительно указывает какое-либо состояние, поэтому отключение **Создать дерево состояний для каждого рецепта** или **Участников** также предотвращает загрузку их изображений. Отключение функции **Загрузка фотографий** приводит к публикации адреса на сервере KitchenOwl, которому затем требуется токен.

**О `icon`:** API KitchenOwl выдает *ключ* для значка, например, `honey`, а изображение, лежащее в его основе, компилируется в приложения KitchenOwl: ни один адрес его не предоставляет, а лицензия запрещает распространение копии. Поэтому адаптер публикует **эмодзи** вместо этого, поэтому состояние отображается где угодно без какого-либо сопоставления с вашей стороны. Для элементов, ключ которых неизвестен, используется эмодзи из их категории, которые пользователи KitchenOwl устанавливают сами; для элементов, у которых нет ни того, ни другого, отображается пустая строка, а не плейсхолдер, который отображался бы как неработающее изображение.

День недели `0` - понедельник. Временные метки указаны в миллисекундах эпохи, что соответствует данным, возвращаемым API KitchenOwl. Дата, которая не задана, отображается как пустая, а не как эпоха 0. Остатки расходов округляются до двух знаков после запятой; API возвращает их в виде чисел с плавающей запятой.

Переименование списка, рецепта, элемента или категории в KitchenOwl переименовывает соответствующий канал в дереве объектов. Имя, которое вы редактируете самостоятельно в административном интерфейсе, сохраняется после перезапуска адаптера, поскольку после перезапуска невозможно отличить ваше переименование от переименования, сделанного выше по потоку.

</details>

<подробности> <краткое содержание><b>Ответ KitchenOwl</b></краткое содержание>

Включите **доступ на запись**, чтобы получить доступ к этим дополнительным состояниям. Запись в одно из них отправляет изменение в KitchenOwl, после чего происходит повторное чтение данных из затронутого домохозяйства.

| Состояние | Тип | Эффект |
| --- | --- | --- |
| `households.<id>.shoppingLists.<listId>.addItemByName` | строка | Добавляет элемент в список. Имя в виде обычного текста; описание также задается в формате JSON, например, `{"name": "Milk", "description": "2 L"}` |
| `households.<id>.shoppingLists.<listId>.items.<itemId>.remove` | кнопка | Удаляет этот элемент из списка |
| `households.<id>.shoppingLists.<listId>.items.<itemId>.description` | строка | Изменяет описание товара, например, количество |
| `households.<id>.expenses.add` | JSON | Учитывает расходы. `name`, `amount`, `paid_by` и `paid_for` являются обязательными, например, `{"name": "Groceries", "amount": 12.5, "paid_by": {"id": 1}, "paid_for": [{"id": 1}, {"id": 2}]}` |
| `households.<id>.expenses.recalculateBalances` | кнопка | Запрашивает у сервера пересчет баланса участников |
| `households.<id>.planner.addRecipe` | JSON | Планирует рецепт, например, `{"recipe_id": 20, "cooking_date": 1700000000000}` |
| `households.<id>.planner.days.<0-6>.removeAll` | кнопка | Удаляет **все** запланированные на этот будний день приемы пищи. В один день может быть запланировано более одного приема пищи, и одна кнопка не может указать, какой именно. |
| `households.<id>.recipes.scrapeUrl` | строка | Импортирует рецепт по URL-адресу; полученный рецепт попадает в `recipes.scrapeResult` в формате JSON |
| `households.<id>.recipes.scrapeUrl` | string | Импортирует рецепт по URL-адресу; полученный рецепт попадает в `recipes.scrapeResult` в формате JSON |

### Сообщения
Данный экземпляр также отвечает на сообщения `sendTo`, что удобно при использовании скриптов:

```javascript
sendTo('kitchenowl.0', 'getHouseholds', {}, result => log(JSON.stringify(result)));
sendTo('kitchenowl.0', 'testConnection', {}, result => log(JSON.stringify(result)));
sendTo('kitchenowl.0', 'refresh', {}, result => log(JSON.stringify(result)));
```

</details>

<подробности> <краткое описание><b>Устранение неполадок</b></краткое описание>

- ** `info.connection` остается false** - проверяем `info.lastError`. Отклоненный токен сообщается явно; адаптер продолжает

Повторная попытка вместо остановки.

- **Выпадающий список домохозяйств остается пустым** - административный интерфейс запрашивает список у запущенного экземпляра, то есть URL-адрес и токен.

Должно быть действительным. Используйте **Проверить соединение**, чтобы увидеть точную ошибку.

- **У домохозяйства нет раздела расходов или раздела планирования** - эти функции включены для каждого домохозяйства в KitchenOwl, и

Адаптер это имитирует.

- **Самоподписанный сертификат** - отключите **Проверку TLS-сертификата** на вкладке «Подключение».
- **Одно домохозяйство отсутствует в списке** - домохозяйство, которое адаптер не может прочитать, регистрируется как предупреждение, и

Информация о других домохозяйствах по-прежнему обновляется; `info.lastError` указывает на это. Пока это продолжается, из дерева ничего не удаляется.

</details>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**

	The release script turns that heading into the version it is releasing and
	copies the entries below it into common.news. Afterwards there is no such
	heading any more, so anything added at the top of this list lands inside a
	version that has already shipped and credits it with changes it does not
	contain. Before adding an entry, check whether the first heading below is
	a released version: if it is, add the placeholder line again above it and
	write underneath that.

	The heading has to be present for a release to run at all; without it the
	script stops with "The changelog placeholder is missing from README.md!".
-->
### 0.0.8 (2026-11-01)

- (n1tr0-5urf3r) The name of the photo storage is brought up to date on an upgrade too. It is created outside the sweep over the synced objects, so the previous version corrected every object name except that one
- (n1tr0-5urf3r) The adapter is built with TypeScript 6. `npm run check:next` type-checks it with TypeScript 7 as well, so the move to the native compiler is a known quantity by the time the tooling around it can follow

### 0.0.7 (2026-10-18)

- (n1tr0-5urf3r) Object names written by an earlier version are brought up to date on an upgrade. Names were only ever created, never corrected, so an installation that already had the tree kept the English and German names of version 0.0.5 even after updating. A name that was edited in the admin interface or that comes from KitchenOwl is still left untouched

### 0.0.6 (2026-10-18)

- (n1tr0-5urf3r) Object names carry every language ioBroker asks for instead of only English and German. They now come from the same translation files the admin interface uses, so `npm run translate` keeps them in step. The photo storage was named in English alone and is covered too
- (n1tr0-5urf3r) The colour of an expense category is a plain text state. Its old role is meant for a colour something can be set to and requires a writable state, which this one is not
- (n1tr0-5urf3r) An installation whose translation files cannot be read logs a warning and keeps the names English instead of refusing to start

### 0.0.5 (2026-10-17)

- (n1tr0-5urf3r) Photos are downloaded into the adapter's own file storage and `photoUrl` points at that copy, so a visualisation can show them. The address on the KitchenOwl server needs the API token, which a browser does not send, so loading one directly answered `Request unauthorized`
- (n1tr0-5urf3r) Items report an emoji instead of KitchenOwl's icon key. The key named artwork that no address serves and whose licence forbids shipping a copy, so a visualisation showed a broken image and the word `honey`. All 403 upstream keys are covered, and an item without one falls back to the emoji on its category, which is taken whole: a skin tone, a flag, a keycap or a sequence such as 👩🏽‍🍳 arrives as the user wrote it rather than cut down to its first character
- (n1tr0-5urf3r) Recipes and the item catalog are read every tenth poll rather than every one. They are 93 % of the traffic a poll makes and change rarely, so a five minute interval now moves around 30 kB instead of 505 kB. The interval is configurable, and 1 restores the old behaviour. A refresh you ask for reads them whatever the setting says, as does the refresh after importing a recipe or adding an item by a name the household has not used before, so a change you just made never waits for the next tenth poll
- (n1tr0-5urf3r) A weekday that holds more than one meal shows all of them. Each day now carries `count`, `recipeNames`, `date` and `json`; the singular `recipeId`, `recipeName` and `yields` are gone, because they described only the first meal and were quietly wrong on a day with two. The per-day button is now `removeAll` and clears every meal on that day, since one button cannot say which of several to drop
- (n1tr0-5urf3r) Removing a planned meal and deleting an expense send a request body, without which the server answered with an error. Removing a planned meal also names the date it refers to, so the right one goes when a recipe is on the plan more than once, and pressing remove on an empty day does nothing instead of logging an error
- (n1tr0-5urf3r) Clearing a shopping list names the items to remove, which is what the endpoint expects; it answered with an error before
- (n1tr0-5urf3r) Adding an expense documents and checks the fields the server actually requires: `paid_by` and `paid_for` are objects, and there is no `paid_by_id`
- (n1tr0-5urf3r) Writing to a state the adapter does not recognise as a command says so in the log instead of doing nothing quietly, which matters after a rename such as the planner's `remove` becoming `removeAll`
- (n1tr0-5urf3r) A member whose username matches one of the member branch's own states, `count` or `balancesJson`, no longer takes that state's object over; such a name gets the user id appended, as a name shared with another member already did

### 0.0.4 (2026-10-17)

- (n1tr0-5urf3r) Removed the id states whose value was already the name of the object they sat in
- (n1tr0-5urf3r) A date that is not set now reads as empty instead of 1 January 1970
- (n1tr0-5urf3r) Expenses name the person who paid instead of exposing a numeric user id
- (n1tr0-5urf3r) Expense category colours are CSS values, and recipe visibility shows a label
- (n1tr0-5urf3r) Existing objects are kept in line with the adapter's own definitions, so enabling write access makes the states that are already there writable rather than only the ones created afterwards
- (n1tr0-5urf3r) A shopping list, recipe, member or category renamed in KitchenOwl is renamed in the object tree as well
- (n1tr0-5urf3r) Names that come from KitchenOwl are no longer run through the German name table, so a list called "Items" keeps its name
- (n1tr0-5urf3r) The result of a recipe import reaches `recipes.scrapeResult` instead of being thrown away and the state wiped on the next poll
- (n1tr0-5urf3r) The next planned meal skips days that are already over
- (n1tr0-5urf3r) One household that cannot be read no longer costs every other household its update
- (n1tr0-5urf3r) A refresh requested while a poll is running is carried out afterwards instead of being dropped, and the refresh button is acknowledged
- (n1tr0-5urf3r) Shopping list items can be added with a description by writing JSON instead of a plain name
- (n1tr0-5urf3r) A server URL entered with a trailing `/api` is accepted, a request that times out says so instead of reporting an aborted operation, and a rate limited request is retried
- (n1tr0-5urf3r) Two members whose usernames differ only in punctuation no longer share one branch
- (n1tr0-5urf3r) `getHouseholds` over the message box keeps the configured TLS setting and no longer leaks its connection when it fails
- (n1tr0-5urf3r) The object database is only read back when a definition actually changed, which takes around a thousand lookups per household out of every poll

### 0.0.3 (2026-10-17)

- (n1tr0-5urf3r) The item payloads no longer repeat the full category object and KitchenOwl's internal bookkeeping, which cuts the catalog state of a 800 item household from roughly 290 kB to 56 kB
- (n1tr0-5urf3r) Removed the household json state, which only repeated the states next to it

### 0.0.2 (2026-10-17)

- (n1tr0-5urf3r) Fixed a retry delay that was not cancelled when the adapter shut down
- (n1tr0-5urf3r) The compiled output is part of the repository again, so installing from a GitHub URL works
- (n1tr0-5urf3r) Translated the admin interface into the remaining languages
- (n1tr0-5urf3r) Raised the requirements to Node.js 22.19 and admin 7.6.20
- (n1tr0-5urf3r) Releases are published automatically from CI

### 0.0.1 (2026-10-17)

- (n1tr0-5urf3r) initial release

## License

MIT License

Copyright (c) 2026 n1tr0-5urf3r <fabi@ihlecloud.de>

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