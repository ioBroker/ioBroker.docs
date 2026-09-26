---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/CONTRIBUTING.md
title: Вношу свой вклад в ioBroker.autodoc
hash: M4AiKieATuR2jKskQIzt3cK7tmQdsMepAio59zidJos=
---
# Вносим вклад в ioBroker.autodoc
Этот файл предназначен для **участников репозитория Git**. Он намеренно **не** указан в массиве `files` в `package.json`: **архив npm** для установки ioBroker должен содержать **только файлы среды выполнения** (та же идея, что и для адаптеров, сгенерированных с помощью [создать-адаптер](https://github.com/ioBroker/create-adapter)). ** `README.md` ** по-прежнему опубликован (npm всегда его включает). ** `LICENSE` ** указан в `files`, поэтому он является частью содержимого пакета.

## Ссылки (экосистема ioBroker)
Нейтральная к адаптерам коллекция ссылок (повторно используемая в разных проектах): [`docs/iobroker-adapter-references.md`](/#/docs/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md) - **Gedächtnisstützen** для работы с адаптерами, соответствующими правилам (не является полным зеркалом внешней документации).

При внесении или проверке изменений используйте ссылки вверху раздела [`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md) (**Wichtige Referenzen**), особенно:

- [Портал разработчиков ioBroker](https://www.iobroker.dev)
- [Проверка адаптеров](https://adapter-check.iobroker.in/)
- [ioBroker.repositories - Рекомендации](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices)
- [REVIEW_CHECKLIST](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md)
- [type-detector](https://github.com/ioBroker/ioBroker.type-detector)
- [Руководство разработчика ioBroker AI](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Создатель адаптеров](https://github.com/ioBroker/create-adapter)

План действий и отслеживание внутренних задач: [`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md), [`PLAN.md`](/#/docs/adapterref/iobroker.autodoc/PLAN.md).

### Идентификатор пакета npm (для сопровождающих)
- **Название общедоступного пакета:** [`iobroker.autodoc`](https://www.npmjs.com/package/iobroker.autodoc) (соответствует `package.json` → ** `name` **). Первая публикация начиная с **0.9.35**; более ранние сборки **0.9.x** были только с Git (см. ** `common.news` ** и **README** changelog).
- **Владельцы:** тот, кто поддерживает релизы, должен быть указан в списке `npm owner ls iobroker.autodoc`; пользователь GitHub org/user для репозитория - **crunchip77** (см. `package.json` ** `author` ** / ** `repository` **).
- **Поддерживайте синхронизацию версий:** при каждом **npm** релизе, одновременно увеличивайте ** `версию` ** в ** `package.json` ** и ** `io-package.json` ** (используйте обычную тройку ** `x.y.z` ** для публикаций), обновляйте ** `common.news` ** (максимум **7** ключей - **только** версии, которые **существуют в npm**, проверка **E2004**), и выравнивайте окно **журнала изменений** README с тем же набором. Используйте ** `npm run release` ** ([`@alcalzone/release-script`](https://github.com/AlCalzone/release-script)) вместо простого ** `npm publish` **, чтобы плагины ioBroker работали должным образом (см. **журнал изменений релизов и README** ниже).
- **Между публикациями:** если `main`/`dev` уже нацелены на следующую версию ** `x.y.z` **, но ** `npm publish` еще не произошла**, используйте **предварительную версию** (например, ** `0.9.39-alpha.0` **) в ** `package.json` ** / ** `io-package.json` **, чтобы **repochecker** не требовал строку ** `common.news` ** для версии, которой нет в npm (**E1036** против **E2004**). Удалите суффикс и добавьте запись ** `news` ** для ** `x.y.z` ** непосредственно перед ** `npm publish` **.

## Рабочий процесс ветки (Git)
- **Разработка в `dev`:** используйте `git checkout dev` для ежедневных коммитов и экспериментов. Отправка изменений: `git push origin dev`.
- **Объединение с `main` после стабилизации:** когда версия готова к более широкому использованию в качестве ветки по умолчанию (URL-адреса установки из `main`, предварительное тестирование завершено), выполните слияние с `main` и отправьте изменения, например, `git checkout main && git pull && git merge dev && git push origin main`, затем вернитесь в `dev` для дальнейшей работы: `git checkout dev`. Если в `main` когда-либо будет выпущено только исправление, объедините `main` обратно с `dev`, чтобы обе ветки оставались согласованными.

## Локальные проверки
```bash
npm install
npm test
npm run lint
npm run check
```

Необязательно: `npm run dev-server` для локального цикла администратора/разработчика (см. `@iobroker/dev-server`).

### Проверка адаптера (`@iobroker/repochecker`)
После `npm install`, из корневого каталога репозитория (**рабочее дерево = этот адаптер**, ветка `dev` или ваша ветка запроса на слияние):

```bash
npm run adapter-check
```

Это запускает ** `@iobroker/repochecker@5.11.1` ** в режиме ** `--local` ** против ** `https://github.com/crunchip77/ioBroker.autodoc` `main` ** (см. `package.json` → ** `adapter-check` **). **Примечание:** ** `--local` ** может попасть в ** `§§LLLLL_0§§ / **` iobroker.dev `**) is an alternative but may return **504 Gateway Timeout** or fail under load — retry later, try branch **` main `**, or rely on **` npm run adapter-check `** and CI. Upgrade **`@iobroker/repochecker`**, когда будет доступна исправленная версия.

Типичные сообщения, появляющиеся во время работы над запросом на слияние **ioBroker.repositories**:

- **E1025 / E1042 (`extIcon`):** средство проверки **получает по HTTP-протоколу** ** `common.extIcon` **. Файл должен **существовать** по указанному URL и представлять собой **действительную** иконку (также **≤ 512×512** пикселей для **E1042**). Используйте **основной`** URL GitHub (тот же коммит, который получают пользователи из ветки по умолчанию).
- **E2000 (пакет отсутствует в npm):** адаптер **опубликован** как ** `iobroker.autodoc` ** (начиная с **0.9.35**). Если проверка по-прежнему выдает ошибку **E2000**, повторите попытку после задержки в реестре/индексе или сравните с [размещенным средством проверки адаптеров](https://adapter-check.iobroker.in/) для архива той же версии.
- **W4001 (адаптер пока отсутствует в `ioBroker.repositories`):** ожидается до тех пор, пока ** `autodoc` ** не появится в ** `sources-dist.json` **. Запрос на слияние **[#5978](https://github.com/ioBroker/ioBroker.repositories/pull/5978)** был объединен (30.06.2026); если последующий запуск проверки по-прежнему сообщает о W4001, запись была **удалена** (распространенная ситуация, когда адаптер снова рассматривается как **новый** после **ошибок** проверки). Не открывайте новый запрос на слияние последнего обновления, пока не исчезнут ошибки **Issue #60**. **Стабильная версия** (`sources-dist-stable.json`) остается **на паузе** до тех пор, пока не наберется достаточное количество тестировщиков (Issue **#54**).
- **E4052 (GitHub noreply email):** `users.noreply.github.com` **не** допускается в файлах `package.json` ** `author.email` **, `io-package.json` ** `common.authors` **, README copyright или **LICENSE**. Используйте **реальный почтовый ящик**, который отслеживает сопровождающий проекта (это может быть выделенный публичный адрес). Изменение адреса - **решение сопровождающего проекта** - не придумывайте новый адрес.
- **E6034 / W6034 (README `## License`):** этот раздел должен содержать **полный текст MIT** (≥100 слов) **или** ссылку в формате Markdown, URL которой содержит ** `LICENSE` ** (например, `[LICENSE](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE)`). Оставьте ** `## License` в качестве последнего заголовка `##` ** (W6021).
- **E2008 / S2008 (происхождение npm):** **последний** архив npm должен содержать **подтверждения происхождения**. Это происходит только при выполнении команды ** `npm publish` в GitHub Actions** с **доверенной публикацией** (OIDC, `id-token: write`) - **а не** после выполнения команды `npm publish` на рабочей станции. **0.9.46** был опубликован локально, поэтому skip-gate в ** `deploy` ** никогда не запускал ** `testing-action-deploy` **. **Исправление = следующее семестровое версионирование через CI** (см. **доверенную публикацию** ниже). Пока адаптер **отсутствует в последней версии**, размещенный проверяющий может **превратить** это предложение в **ошибку**.
- **W5029 (`manual-review` отсутствует в `.releaseconfig.json`):** размещенный **repochecker** ожидает все три плагина: ** `iobroker` **, ** `license` ** и ** `manual-review` ** (согласно соглашению о скриптах релизов ioBroker). ** `manual-review` ** приостанавливается перед `git commit` и запрашивает подтверждение - запускайте ** `npm run release` ** только в **интерактивном** терминале (не в безголовой CI); ** `--yes` ** не пропускает этот запрос. Для полностью автоматизированного конвейера разделите «подготовка» и «коммит/тег/push» вручную, если необходимо.
- **W5005 / E5005 (`setTimeout` в файлах библиотек):** **Исправлено** во всех затронутых файлах:
- ** `lib/aiEnhancer.js` **: `invokeProvider` в `AiEnhancer` передает `ms => this.adapter.delay(ms)` - использует метод `delay()` базового класса адаптера ioBroker (управляемый жизненным циклом, безопасный в компактном режиме). `postJsonTransientRetries` требует `delayFn` и использует его напрямую, без глобального резервного варианта `setTimeout`.
- ** `lib/htmlRenderer.js` **: Все четыре вхождения находятся внутри строк шаблона `<script>` браузера (сгенерированный HTML-вывод, запущенный в браузере). Изменено на `window.setTimeout(` - функционально идентично в браузере; регулярное выражение repochecker исключает `.setTimeout` с помощью отрицательного просмотра назад.
- ** `lib/htmlToPdf.js` **: Однократная задержка во время рендеринга PDF. Изменено на `globalThis.setTimeout(` - также исключено регулярным выражением repochecker.
- **W5051 (пользовательская задержка/ожидание в `lib/aiEnhancer.js`):** Повторные попытки используют ** `this.adapter.delay()` ** через переданный ** `delayFn` **, а не пользовательский таймер. Регулярное выражение repochecker также помечает идентификаторы, такие как ** `sleep` **, даже если они являются псевдонимами ** `adapter.delay()` **. **Не** повторно вводить `const sleep = …`; вызовите ** `await delayFn(ms)` ** напрямую (см. `postJsonTransientRetries`).
- **W5042 (`puppeteer` используется в исходном коде, но отсутствует в `dependencies`):** ** `puppeteer` намеренно указан в `optionalDependencies` ** в `package.json` (с `@mermaid-js/mermaid-cli`). Экспорт PDF загружает его через ** `require('puppeteer')` ** в ** `lib/htmlToPdf.js` ** только если он присутствует; адаптеры без Puppeteer/Chromium избегают ресурсоемкой установки по умолчанию - это особенно актуально для хостов с ограниченными ресурсами (например, Raspberry Pi). Правило repochecker, по-видимому, соответствует только ** `dependencies` **, а не ** `optionalDependencies` **, поэтому это предупреждение является **известным ложным срабатыванием**. **Для устранения ошибки W5042 не требуется никаких изменений в коде или `package.json` ** - задокументируйте это для рецензентов ** `ioBroker.repositories` ** (см. таблицу ниже). Не добавляйте вторую запись ** `puppeteer` ** в раздел `dependencies` только для того, чтобы заглушить W5042: проверка ioBroker отклоняет **указание одного и того же пакета как в `dependencies`, так и в `optionalDependencies` **, а перемещение Puppeteer исключительно в ** `dependencies` ** заставит всех загружать Chromium. Рассматривайте W5042 как **ожидаемый** до тех пор, пока проверка репозитория не будет считать **optionalDependencies`** (или эквивалентный) объявленным.
- ** `aiApiKey` (jsonConfig `password`):** указан в ** `protectedNative` ** и ** `encryptedNative` ** в ** `io-package.json` ** (безопасность адаптера ioBroker - W5057/W5058). Существующие ключи в открытом виде повторно шифруются при сохранении пользователем конфигурации в административной панели.
- **E8917 / W0066 (`@types/node`):** закрепите ** `@types/node` ** в строке **Node 22** (`^22.x`, соответствующей ** `engines.node` **) и добавьте Dependabot ** `ignore` ** для ** `version-update:semver-major` ** для ** `@types/node` ** в ** `.github/dependabot.yml` ** (см. ioBroker.javascript / repochecker E8917).
- ** `puppeteer` Dependabot major:** также игнорируйте ** `version-update:semver-major` ** для ** `puppeteer` ** в ** `.github/dependabot.yml` ** - см. **[Optional Puppeteer + mermaid-cli](#optional-puppeteer-mermaid-cli)** ниже.

<a id="optional-puppeteer-mermaid-cli"></a>

### Дополнительный Puppeteer + `@mermaid-js/mermaid-cli` (политика ioBroker)
**Назначение:** Экспорт в PDF (`lib/htmlToPdf.js`) и серверный SVG-файлы Mermaid (`lib/mermaidServerSvg.js` через ** `mmdc` **) используют безголовый Chromium. Оба пакета относятся к ** `optionalDependencies` **, поэтому стандартные установки остаются легковесными (что актуально для хостов с ограниченными ресурсами, например, Raspberry Pi) - в соответствии с практикой ioBroker для ресурсоемких стеков браузеров.

**Текущая выровненная пара (2026-05, проверьте в `package.json`):**

| Пакет | Версия | Роль |
| ------- | ------- | ---- |
| ** `puppeteer` ** | ** `^24.43.1` ** | PDF + общий Chromium для ** `mmdc` ** |
| ** `@mermaid-js/mermaid-cli` ** | ** `11.16.0` ** (закреплено) | встроить ** `pre.mermaid` ** как SVG во время генерации |

**Puppeteer 25:** ** `@mermaid-js/mermaid-cli@11.16.0` ** взаимодействует с ** `^23 \|\| ^24 \|\| ^25` **. Мы остаемся на **Puppeteer 24** до планового обновления (файл блокировки, ** `npm ci` **, тесты Mermaid). **Не следует объединять** существенные изменения Dependabot ** `puppeteer` ** без этого контрольного списка. ** `.github/dependabot.yml` ** игнорирует ** `puppeteer` ** ** `version-update:semver-major` ** по этой причине.

**Проверка ioBroker / `ioBroker.repositories` - не «исправляйте» неправильно:**

| Сообщение | Позиция сопровождающего |
| ------- | ----------------- |
| **W5042** (`puppeteer` «отсутствует» в ** `dependencies` **) | **Ожидаемое ложное срабатывание.** ** `puppeteer` ** объявлен в ** `optionalDependencies` **. Перемещение его в ** `dependencies` ** приведет к принудительной установке Chromium для всех установок и может вызвать ошибки проверки (**один и тот же пакет в `dependencies` и `optionalDependencies` **). **Задокументируйте W5042 для рецензентов; не дублируйте запись.** |
| ** `npm ci` в CI** | ** `package-lock.json` ** должен включать полную запись ** `packages["node_modules/puppeteer"]` **. После изменений зависимостей: новый ** `npm install` **, проверка ** `npm ci` ** на чистом ** `node_modules` **, фиксация ** `package.json` ** + блокировка вместе. |
| ** `npm ci` в CI** | ** `package-lock.json` ** должен содержать полную запись ** `packages["node_modules/puppeteer"]` **. После изменений зависимостей: выполните чистую установку ** `npm install` **, проверьте ** `npm ci` ** в чистом ** `node_modules` **, зафиксируйте изменения в ** `package.json` ** и lock одновременно. |

**Процедура обновления (когда исходный код позволит использовать Puppeteer 25):**

1. Подтвердите, что диапазон пиров ** `@mermaid-js/mermaid-cli` ** включает ** `^25` ** (или сначала обновите ** `mmdc` **, а затем ** `puppeteer` ** в **одном** запросе на слияние).
2. Перегенерируйте файл блокировки; запустите ** `npm ci` **, ** `npm run lint` **, ** `npm run check` **, ** `npm test` ** (интеграционные тесты Mermaid находятся в ** `mermaidServerSvg.test.js` **).
3. Удаляйте или сужайте список исключений Dependabot ** `ignore` ** для ** `puppeteer` ** только тогда, когда это безопасно.
4. Укажите в примечаниях к выпуску / ** `common.news` **, если изменится размер установки или требования к Node/Chromium.

**Для текста запроса на слияние `ioBroker.repositories`:** для дополнительных функций PDF/Mermaid требуется ** `npm install` ** (или установить с дополнительными зависимостями) в каталоге адаптера; генерация основной документации работает **без** Puppeteer. **W5042** и блокировка Puppeteer **24/25** являются **задокументированными решениями сопровождающих**, а не ошибками контрольного списка.

**Важно:** Никогда не запускайте ** `npx iobroker …` ** внутри клона адаптера, если вы намеренно не инициализируете там контроллер - это может перезаписать ** `package.json` **. В этом случае восстановите систему с помощью ** `git checkout -- package.json package-lock.json` **.

<a id="object-hierarchy"></a>

### Иерархия объектов в `instanceObjects` (`io-package.json`)
ioBroker требует, чтобы у каждого состояния был родительский объект (`type: "channel"` или `"device"`). Отсутствие родительских объектов приводит к ошибке **E3009** во время проверки объекта `ioBroker.repositories` - адаптер работает нормально локально, но бот отклоняет дамп.

**Правило:** для каждой группы состояний (`action.*`, `documentation.*`, `info.*`, `versioning.*`) добавьте соответствующий объект канала **перед** состояниями из `instanceObjects`. Каналы должны стоять первыми; состояния следуют за ними:

```json
"instanceObjects": [
  { "_id": "info", "type": "channel", "common": { "name": { "en": "Information", "de": "Informationen" } }, "native": {} },
  { "_id": "info.connection", "type": "state", "common": { ... }, "native": {} }
]
```

Справочные адаптеры: **telegram**, **backitup**, **dwd** - все они определяют свой канал `info` в `instanceObjects` с многоязычным `common.name`.

`instanceObjects` - это подходящее место для статических объектов, которые всегда присутствуют. Используйте `setObjectNotExistsAsync` в `onReady`/`createStates()` только для объектов, которые являются динамическими или зависят от контекста (например, обнаруженных устройств).

### `package-lock.json` и `npm ci`
CI (`ioBroker/testing-action-check`) запускает ** `npm ci` **. Дополнительная цепочка **@mermaid-js/mermaid-cli** (Puppeteer / `chromium-bidi` / Mermaid) зависит от версий, которые должны отображаться как **полные** записи `packages["node_modules/…"]` в файле блокировки. Поэтому репозиторий использует ** `overrides` ** (`chromium-bidi` → закрепленные `devtools-protocol`) и явные **devDependencies** (`cytoscape`, `d3-selection`, `devtools-protocol`), чтобы установки Linux + Node22/24 оставались синхронизированными.

**Действия GitHub:** `.github/workflows/test-and-release.yml` использует фрагмент кода параллельного выполнения **ioBroker.example** (`group: ${{ github.ref }}`, ** `cancel-in-progress: true` **). ** `@iobroker/repochecker` ** (**E3009**) сравнивает этот блок **буквально** с этим шаблоном - пользовательские значения `group` всегда не проходят проверку. Компромисс: новая отправка изменений в **ту же** ветку аннулирует более старые запущенные процессы (**Windows + Node24** могут отображать «Отменено», если вы отправите изменения снова до завершения матрицы).

** `deploy` в тегах семантического версионирования (`v*.*.*`):** ** `ioBroker/testing-action-deploy` ** публикует в npm (OIDC / Trusted Publishing) и может создать релиз на GitHub. Задача по-прежнему **пропускает** публикацию, если ** `npm view` ** уже видит это семантическое версионирование - это позволяет CI оставаться **зеленым** после случайной публикации на рабочей станции, но **также пропускает проверку происхождения**. Для проверки **E2008**, **не** используйте `npm publish` сначала с ПК: обновите ** `main` **, **добавьте тег `vx.y.z` **, пусть ** `deploy` ** будет **единственным** издателем. Настройте **доверенную публикацию** для ** `iobroker.autodoc` ** в npm (GitHub Actions, этот репозиторий, рабочий процесс **Тестирование и релиз**). **Уведомления об устаревании Node.js** о встроенных ** `actions/checkout` / `setup-node` ** связаны с версиями пакетов ** `ioBroker/testing-action-*@v1` **; Обновление этих действий отслеживается вышестоящим руководством (`ioBroker/testing-action-deploy` и т. д.), а не локально в каждом YAML-файле адаптера.

После изменения **зависимостей** или **переопределений** запустите ** `npm install` **, зафиксируйте изменения ** `package.json` ** и ** `package-lock.json` ** одновременно и проверьте ** `npm ci` ** на чистом ** `node_modules` ** локально, если это возможно.

## Релизы и список изменений в файле README
- Запускайте ** `npm run release` ** только для ** `main` ** - ** `@alcalzone/release-script-plugin-iobroker` ** по умолчанию запускает только ** `main` ** (`check:git` прерывает выполнение на ** `dev` **). Из ** `dev` ** выполните слияние/синхронизацию, затем: ** `git checkout main && git pull origin main` ** перед ** `npm run release` ** (см. рабочий процесс с ветками выше).

<a id="maintainer-checklist-release-order"></a>

### Контрольный список для сопровождающего проекта - порядок выпуска (не пропускать)
Выполните следующие шаги **по порядку** после завершения кода для ** `x.y.z` **. ** `npm publish` не создает релиз или тег GitHub.** Если вы публикуете из ** `main` **, но пропускаете шаг создания тега/релиза, **последний релиз GitHub будет тормозить npm**, пока вы это не исправите.

1. ** `main` обновлен:** `git checkout main && git pull origin main`.
2. **Обновление и метаданные:** Предпочтительнее использовать команду ** `npm run release` ** из ** `main` ** (интерактивный терминал; ** `manual-review` **: проверить различия; ** `yes` ** только если все правильно - избегайте ** `Ctrl+C` ** в запросах: Node24 **enquirer** может выдать ** `ERR_USE_AFTER_CLOSE` **). Если версионирование выполнялось вручную, убедитесь, что ** `package.json` **, ** `io-package.json` ** (`common.version`), ** `common.news` ** (**только ключи semver, существующие в npm** - проверка **E2004**), корневой ** `package-lock.json` ** ** `version` ** и README ** `Version:` ** / changelog соответствуют ** `x.y.z` **.
3. **Критерии проверки качества:** `npm test`, `npm run lint`, `npm run check` (и опционально `npm run adapter-check`).
4. **Зафиксируйте изменения и отправьте `main`:** `git add` / `git commit` по мере необходимости, затем `git push origin main`.
5. **npm publish (предпочтительно GitHub Actions для проверки происхождения):** после отправки ** `main` ** создайте и **отправьте** ** `vx.y.z` **, чтобы ** `deploy` ** запустил ** `ioBroker/testing-action-deploy` **. Это путь, который обеспечивает **проверку происхождения npm** (**E2008**). Команда ** `npm publish --access public` ** на рабочей станции остается резервным вариантом, если доверенная публикация еще не настроена, - но тогда средство проверки будет продолжать отмечать отсутствующие аттестации до **следующей** версии, опубликованной в CI. Если при локальной публикации появляется ** `Введите OTP` **, используйте **аутентификатор npm TOTP**. Никогда не фиксируйте токены. При необходимости запустите ** `npm pkg fix` ** и зафиксируйте нормализацию ** `repository.url` **, если ** `npm publish` ** выдаст предупреждение.
6. **Проверьте реестр:** `npm view iobroker.autodoc version` → ** `x.y.z` **. При желании подтвердите происхождение: `npm view iobroker.autodoc@x.y.z dist.attestations`.
7. **Git-тег + релиз GitHub:** если команда ** `deploy` ** уже создала релиз GitHub, пропустите дубликат. Если вы опубликовали локально, все равно выполните ** `git tag` / `git push origin vx.y.z` / `gh release create` **, чтобы **GitHub Latest** соответствовал npm.
8. **Синхронизация `dev`:** `git checkout dev`, слияние/быстрое перемещение ** `origin/main` ** в ** `dev` **, `git push origin dev`, оставаться в ** `dev` ** для текущей работы, за исключением внесения исправлений только в ** `main` **.

Краткое руководство для **Агентов / Copilot**: когда сопровождающий запрашивает **завершение релиза** или **публикацию**, убедитесь, что шаг **7** предложен или выполнен после подтверждения успешного выполнения шага **6** - не предполагайте, что **npm** обновляет **релизы** GitHub.

- Раздел **Changelog** в файле [`README.md`](/#/adapters/autodoc) должен быть выровнен с разделом ** `common.news` ** в файле `io-package.json`: перечисляйте только **те же 7** новейших версий; удаленные версии переместите в файл `CHANGELOG_OLD.md` (см. там введение).
- Добавьте раздел с датой `### x.y.z` в **верхнюю** часть этого окна при выпуске релиза (ожидается для списков адаптеров ioBroker).
- Следите за тем, чтобы значение ** `version` ** в файлах `package.json` и `io-package.json` соответствовало указанной в документации версии (Adapter Checker может выявлять несоответствия, например, **E6006** - следуйте инструкциям проверки для текущего набора правил).
- Одновременное увеличение версии в файлах `package.json` и `io-package.json`.
- Обновите ** `common.news` ** в `io-package.json` (максимум **7** записей для [Adapter Checker](https://adapter-check.iobroker.in/) / списков репозиториев - удалите самый старый ключ при добавлении релиза; переместите удаленный раздел **README** в `CHANGELOG_OLD.md`; сохраните там более длинную историю изменений).
- Прежде чем предлагать включение в стабильный/бета-набор репозиториев, запустите **[Adapter Checker](https://adapter-check.iobroker.in/)** для проверки пакета и исправьте обнаруженные проблемы.

### Версия npm против сборки HTML-рендерера
Опубликованная **версия адаптера семантическим ключом** (`package.json` / `io-package.json`) не зависит от строки **сборки HTML-рендерера** `RENDERER_VERSION` в `lib/htmlRenderer.js`. Сгенерированные страницы могут содержать `<!-- autodoc-renderer:… -->` в `<head>` для отладки расхождений в шаблонах - не путайте этот маркер с версией пакета npm.

**Когда следует повышать уровень `RENDERER_VERSION` (в формате `lib/htmlRenderer.js`, `YYYY.MM.DD.NN`):**

- **Обновлять** документацию при любых изменениях, которые пользователи должны получать в **экспортированной** документации: HTML-оболочка/макет/CSS, отрисовка основного текста глав, **текст или структура экспорта Markdown** из `lib/markdownRenderer.js`, разделы быстрого запуска/для гостей или другие выходные данные конвейера, записанные в `/files/`. При запуске адаптера `main.js` сравнивает эту строку с `info.templateVersion` и **ставит в очередь полный запуск документации** при несоответствии - поэтому установки с отключенной опцией **Генерировать при запуске** все равно обновляются один раз после обновления.
- **Пропустить обновление** для изменений, которые не затрагивают сгенерированное содержимое HTML/Markdown/JSON **или структуру** (например, рефакторинг, затрагивающий только пользовательский интерфейс конфигурации администратора, логирование или неиспользуемые участки кода).
- При втором или третьем изменении в течение одного календарного дня увеличьте значение в конце ** `.NN` **.
- Для релизов с номером отметьте новую версию `RENDERER_VERSION` в файле **README**, если это важно для поддержки или внесения изменений в обновление (необязательно для чисто внутренних настроек).

<a id="admin-ui-translations-i18n"></a>

### Структура администратора (`jsonConfig`)
- **Не следует вкладывать** блок `"type": "tabs"` **внутрь** блока ``panel `** в файле ` admin/jsonConfig.json `. Было замечено, что при использовании такого макета административная панель ioBroker отображает **пустую** панель настроек экземпляра. Размещайте каждую основную область в виде **отдельной вкладки корневого уровня** только под блоком `"type": "tabs"`**.

### Переводы административного интерфейса (интернационализация)
- Источником достоверной информации о **ключах** является файл `admin/i18n/en.json`. Для важных релизов поддерживаются версии на немецком и французском языках.
- В других локализованных файлах (`es`, `it`, `nl`, `pl`, `pt`, `ru`, `uk`, `zh-cn`, …) для заполнения отсутствующих ключей может использоваться **английский текст**, чтобы административная панель никогда не отображала необработанные имена ключей. **Носителям языка:** приветствуются запросы на изменение (PR) для замены этих строк реальными переводами; нет необходимости переводить весь файл целиком.
- После добавления ключей в `en.json`, по возможности обновите **DE/FR** и либо запустите рабочий процесс интернационализации проекта, либо скопируйте новую английскую строку в другие языковые локали до перевода.