---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md
title: Веб-расширения
hash: ncUHv9aw1g0VDkD+pKAlG66oLB0mM9tgiLIW6bRoZ+I=
---
# Веб-расширения

Если адаптер должен быть доступен на том же порту, что и веб-адаптер, он должен реализовывать функциональность веб-расширения.

Во-первых, оно должно иметь `common.webExtension` флаг в `io-package.json` файл, указывающий на файл расширения веб-сайта. Например: `"webExtension": "lib/web.js"`.

Второй, `native.webInstance` флаг в `io-package.json` Необходимо указать имя экземпляра веб-адаптера, для которого должно быть загружено расширение. Или же можно просто загрузить его для всех экземпляров через `"webInstance": "*"`.

В-третьих, убедитесь `common.enabled` В соответствующем адаптере веб-расширения установлено значение true. `io-package.json`: `"enabled": true` Если вы работаете с **dev-server,** обратите внимание: dev-server **не включает экземпляр** при использовании команды "dev-server watch", это необходимо сделать вручную: перейдите по адресу `system.adapter.<ADAPTER_NAME>.0`, использовать `edit object` установить `"enabled": true` внутри данных объекта. Если задано неправильно, веб-расширение не будет активировано веб-адаптером.

Далее вам следует создать объект состояния. `info.extension` и установите значение true/false на уровне кода. Это состояние будет управлять отображением статуса адаптера в административной панели.

```json
  "instanceObjects": [
    {
      "_id": "info",
      "type": "channel",
      "common": {
        "name": {
          "en": "Information",
          "de": "Information",
          "ru": "Информация",
          "pt": "Em formação",
          "nl": "Informatie",
          "fr": "Information",
          "it": "Informazione",
          "es": "Información",
          "pl": "Informacja",
          "uk": "Інформація",
          "zh-cn": "信息"
        }
      },
      "native": {}
    },
    {
      "_id": "info.extension",
      "type": "state",
      "common": {
        "role": "indicator",
        "name": "If instance is in only extension mode",
        "type": "boolean",
        "read": true,
        "expert": true,
        "write": false,
        "def": false
      },
      "native": {}
    }
  ]
}
```

В-пятых, файл `lib/web.js` (или что-то подобное) должно существовать, и оно должно экспортировать класс.

```js
/**
 * Web extension example
 *
 * @class
 * @param {object} server http or https node.js object
 * @param {object} webSettings settings of the web server, like <pre><code>{secure: settings.secure, port: settings.port}</code></pre>
 * @param {object} adapter web adapter object
 * @param {object} instanceSettings instance object with common and native
 * @param {object} app express application
 * @return {object} class instance
 */
function ExtensionExample(server, webSettings, adapter, instanceSettings, app) {
    this.app         = app;
    this.config      = instanceSettings ? instanceSettings.native : {};
    // "example.0" - the namespace of THIS instance, not the one of the web instance below
    this.namespace   = instanceSettings._id.substring('system.adapter.'.length);
    const that       = this;

    // instanceSettings and this.config contain instance config (not web adapter, but this one with web-extension)
    this.config.demoParam = this.config.demoParam || 'demo';

    // Optional. When the settings of this instance change, web stops this object and starts a new one
    // instead of restarting itself. Set it only if unload() gives back everything, see below
    this.supportsHotReload = true;

    this.unload = function () {
        // The routes need no cleanup: web drops them together with the router of this extension.
        // Stop here what web cannot know about: timers, subscriptions, listeners, child processes
        adapter.log.debug('Demo extension unloaded!');
        return Promise.resolve();
    };

    // Optional: deliver to web the link to Web interface
    this.welcomePage = () => {
        return {
            link: 'example/',
            name: 'Example',
            img: 'adapter/example/example.png',
            color: '#157c00',
            order: 10,
            pro: false
        };
    }

    // Optional. Say to web instance to wait till this instance is initialized
    // Used if initialisation lasts some time: call onReady when it is done
    this.waitForReady = onReady => onReady();

    // self invoke constructor
    (function __constructor () {
        adapter.log.info('Install extension on /' + that.config.demoParam);
        
        that.app.use('/' + that.config.demoParam, (req, res) => {
            res.setHeader('Content-type', 'text/html');
            res.status(200).send('You called a demo web extension with path "' + req.url + '"');
        });
    })();
}

module.exports = ExtensionExample;
```

### Каталог данных вашего собственного экземпляра

`adapter` Это **веб-** экземпляр, который вас запускает, поэтому `getAbsoluteInstanceDataDir(adapter)` Ответы передаются из каталога веб-сервера, а не из вашего. Вместо этого передайте собственное пространство имен — вспомогательная функция принимает его, поскольку `@iobroker/adapter-core` 3.3.1:

```js
const { getAbsoluteInstanceDataDir } = require('@iobroker/adapter-core');

// .../iobroker-data/example.0
const dataDir = getAbsoluteInstanceDataDir(this.namespace);
```

То же самое относится и ко всему остальному, что вы обычно считываете с собственного адаптера: `adapter` относится к веб-сайтам, в то время как `instanceSettings` это ваше.

### Подписки

Веб-интерфейс, его сокет-клиенты и все расширения используют одно соединение с базами данных, а js-контроллер хранит там одну подписку на каждый шаблон — независимо от того, кто её запросил. Вплоть до версии web 9.4, первой `unsubscribeForeignStates()` Таким образом, эта закономерность положила конец всему для всех: расширение, которое отказывалось от своего состояния, отбирало его у веб-клиентов сокетов и у других расширений.

Начиная с версии 9.5.0, подписки, которые вы оформляете с помощью `adapter` ваши собственные:

- Веб-примечания указывают, кто какой шаблон использует. База данных подписывается на первого пользователя и отписывается, когда последний отказывается от неё. Ваш `unsubscribe…()` Заканчивается только ваша подписка.
- Как и прежде, шаблон, на который вы подписались дважды, сохраняется один раз: один `unsubscribe…()` На этом всё заканчивается.
- Подписки на объекты и файлы проверяются на соответствие настройкам пользователя. `options` Как и прежде, при каждом звонке.
- Когда ваше расширение перестаёт работать, веб-интерфейс отказывается от всего, что у вас ещё осталось, и игнорирует последующие запросы.
- Это охватывает `subscribeForeignStates()`, `subscribeStates()`, `subscribeForeignObjects()`, `subscribeObjects()` с их `unsubscribe…()` и `…Async` варианты и `subscribeForeignFiles()` /`unsubscribeForeignFiles()` Шаблоны учитываются так, как они написаны: `hm-rpc.0.*` и `hm-rpc.0.STATE` Существует две подписки.

`stateChange()`, `objectChange()` и `fileChange()` По-прежнему получайте все изменения, которые получает веб, включая изменения шаблонов, на которые подписаны только другие пользователи. Перед тем как действовать, проверьте идентификатор.

### Пути, обладающие собственными преимуществами.

При включенной аутентификации веб-сервер не пропускает запросы без авторизации, а слой OAuth2 отвечает на каждый токен носителя, который он не выдал сам. `401` Клиент, передающий учетные данные через веб-интерфейс, не знает их — клиент MCP со статическим токеном вашего адаптера, веб-хук с подписью — поэтому он никогда не достигнет ваших маршрутов.

Назовите такие пути в `publicRoutes()`.web передает их вашему обработчику перед каждым этапом аутентификации:

```js
// Optional. Paths this extension protects itself. Called once, right after the constructor
this.publicRoutes = () => [
    {
        path: '/example/api', // "/example/api" and everything below it
        handler: (req, res, next) => {
            if (req.headers.authorization !== `Bearer ${that.config.token}`) {
                res.status(401).json({ error: 'unauthorized' });
                return;
            }
            // ... answer the request
        },
    },
];
```

- Путь должен располагаться ниже имени адаптера расширения (`/example` для `example.0`). Только простые сегменты: нет `.` или `..` Запрос отсутствует, ничего не закодировано. Веб-сайт отклоняет другие пути и сообщает об этом в своем журнале; каждый принятый путь также регистрируется.
- Ваш обработчик получает запрос в том виде, в котором он поступил: **нет `req.body` ** (прочитайте трансляцию сами), нет сессии и нет `req.user` Веб-сайт ничего не знает о звонящем.
- `next()` Запрос возвращается веб-серверу: после этого требуется обычная авторизация, как если бы путь не был общедоступным. Таким образом, путь, на который вы не отвечаете, никогда не откроет ничего в веб-пространстве.
- Побеждает более конкретный путь, и из двух случаев, когда путь назван одинаково, первый сохраняет его.
- Защита пути теперь — исключительно ваша задача. Без аутентификации в веб-среде доступ к обработчику осуществляется тем же путем.

### Изменены настройки без перезапуска веб-сайта.

Он `app` Расширение — это веб-приложение со своим собственным маршрутизатором: всё, что зарегистрировано с помощью `app.use()`, `app.get()`, `app.post()`, `app.all()`, `app.route()` или `app.param()` попадает в этот роутер, при этом настройки... `app.locals` и `app.get('<setting>')` Маршрутизатор находится там, где всегда находились маршруты расширений: за маршрутами веб-сервера, перед файлами из объектной базы данных. Когда расширение останавливается, веб-сервер удаляет маршрутизатор, а вместе с ним и все зарегистрированные им маршруты и промежуточное ПО. `app._router` и `app.router` А этот роутер тоже?

Что происходит с веб-интерфейсом при изменении экземпляра расширения:

- Запись, которая не вносит никаких изменений `common` ни `native` (только `ts`, `from`, `user`) игнорируется.
- Расширение, которое теперь относится к данному экземпляру веб-сайта — включено или `native.webInstance` Переключился на него — запустился, без перезапуска веб-браузера.
- Новая версия адаптера (`common.version`, `common.installedVersion`, `common.installedFrom` или другой `common.webExtension` Веб-интерфейс всегда перезапускается: уже загруженный код нельзя заменить.
- Другие изменения, а также отключение или перемещение расширения на другой экземпляр веб-сайта приводят к перезапуску веб-сайта, если только расширение не устанавливает соответствующие параметры. `supportsHotReload` Затем веб-вызовы `unload()` и запускает новый объект с новыми настройками или просто выгружает его. Веб-сервер продолжает работать: сессии и сокетные соединения всех остальных пользователей сохраняются.

```js
class MyExtension {
    // or as a field of the object: this.supportsHotReload = true
    static supportsHotReload = true;
    ...
}
```

Устанавливайте это только если `unload()` возвращает все, что расширение забрало у веб-сайта, за исключением маршрутов и подписок:

- таймеры и интервалы,
- дочерние процессы, открытые сокеты и потоки,
- слушатели на `adapter` или на `server`, нравиться `adapter.on('message')` или `server.on('upgrade')`.

Что делает сам веб:

- До `unload()` При вызове функции маршруты и общедоступные пути расширения исчезают, и функция не получает никакого результата. `stateChange()`, `objectChange()` или `fileChange()` больше.
- `unload()` имеет 5 секунд.
- Конструктор добавил слушателей к `adapter` или к `server` которые остаются там после `unload()` Удаляются с предупреждением в журнале. Слушатели, добавленные позже, остаются без изменений.
- Подписки, которые по-прежнему сохраняются после... `unload()` От них отказываются (см. [Подписки](#subscriptions) ). Те модели поведения, которых придерживаются и другие, остаются подписанными на них.

Ошибка, переданная промежуточным ПО расширения (`next(err)`) передается в обработчик ошибок веб-приложения; обработчики ошибок других расширений его не видят.

`common.mode` Возможно:

- `daemon` - экземпляр будет запущен, но если main.js вернет результат `utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION` В этом случае код завершения означает, что экземпляр не будет перезапущен.
- `extension` - Этот экземпляр никогда не будет запущен, поскольку он работает только как часть веб-экземпляра.

## Примеры

Следующие адаптеры поддерживают веб-расширения:

- Камеры: <https://github.com/ioBroker/ioBroker.cameras/blob/master/lib/web.js>
- Simple-api: <https://github.com/ioBroker/ioBroker.simple-api/blob/master/build/lib/SimpleAPI.js#L73>
- Прокси: <https://github.com/ioBroker/ioBroker.proxy/blob/master/lib/proxy.js#L20>
- Eufy-Security: <https://github.com/bropat/ioBroker.eufy-security/blob/master/src/lib/web.ts> (реализация на Typescript)
- REST-API: <https://github.com/ioBroker/ioBroker.rest-api/blob/master/src/lib/rest-api.js#L67>
- Energiefluss-erweitert: <https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/blob/main/lib/web.js>