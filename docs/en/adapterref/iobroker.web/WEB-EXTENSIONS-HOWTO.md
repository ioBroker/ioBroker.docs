---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
---
# Web extensions
If some adapter want to be available under same port as web adapter, it should implement the web extension functionality.

First, it must have a `common.webExtension` flag in `io-package.json` file that points to thw web extension file. Like `"webExtension": "lib/web.js"`.

Second, `native.webInstance` flag in `io-package.json` has to point to the instance name of the web-adapter for which the extension should be loaded. 
Or simply load it for all instances via `"webInstance": "*"`.

Third, make sure `common.enabled` of the respective web-extension adapter is set to true in `io-package.json`: `"enabled": true`.
If you're working with **dev-server** please note: dev-server does **not set the instance to enabled** when using "dev-server watch", you have to do this manually: Navigate to `system.adapter.<ADAPTER_NAME>.0`, use `edit object` to set `"enabled": true` within object data. If not set correctly, the web extension will not be activated by web adapter.

Forth, you should create a state object `info.extension` and set it to true / false at code level. This state will control admin display of adapter status.

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

Fifth, the file `lib/web.js` (or whatever) must exist, and it must export a class.
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

### The data directory of your own instance

`adapter` is the **web** instance that runs you, so `getAbsoluteInstanceDataDir(adapter)` answers with the
directory of web, not with yours. Pass your own namespace instead - the helper takes one since
`@iobroker/adapter-core` 3.3.1:

```js
const { getAbsoluteInstanceDataDir } = require('@iobroker/adapter-core');

// .../iobroker-data/example.0
const dataDir = getAbsoluteInstanceDataDir(this.namespace);
```

The same holds for everything else you would normally read off your own adapter object: `adapter` belongs
to web, while `instanceSettings` is yours.

### Subscriptions

web, its socket clients and all extensions share one connection to the databases, and js-controller keeps
one subscription per pattern there - no matter who asked for it. Up to web 9.4, the first
`unsubscribeForeignStates()` of a pattern therefore ended it for everybody: an extension that gave up a state
took it away from the socket clients of web and from the other extensions.

Since 9.5.0 the subscriptions you make with `adapter` are your own:

- web notes who holds which pattern. The database is subscribed for the first one and unsubscribed when the
  last one gives it up. Your `unsubscribe…()` ends only your subscription.
- As before, a pattern you subscribe twice is held once: one `unsubscribe…()` ends it.
- Subscriptions of objects and files are checked against the user in `options` on every call, as before.
- When your extension stops, web gives up whatever you still hold, and ignores what you ask for afterwards.
- This covers `subscribeForeignStates()`, `subscribeStates()`, `subscribeForeignObjects()`,
  `subscribeObjects()` with their `unsubscribe…()` and `…Async` variants, and
  `subscribeForeignFiles()`/`unsubscribeForeignFiles()`. Patterns count as they are written: `hm-rpc.0.*`
  and `hm-rpc.0.STATE` are two subscriptions.

`stateChange()`, `objectChange()` and `fileChange()` still get every change web receives, including those of
patterns that only others subscribed. Look at the id before you act on it.

### Paths with credentials of their own

With authentication enabled, web lets no request through without its login, and the OAuth2 layer answers
every bearer token it did not issue itself with `401`. A client that brings credentials web does not know - an
MCP client with the static token of your adapter, a webhook with a signature - therefore never reaches your
routes.

Name such paths in `publicRoutes()`. web hands them to your handler in front of every authentication step:

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

- The path must lie below the adapter name of the extension (`/example` for `example.0`). Plain segments
  only: no `.` or `..`, no query, nothing encoded. web refuses other paths and says so in its log; every
  accepted path is logged as well.
- Your handler gets the request as it came in: **no `req.body`** (read the stream yourself), no session and no
  `req.user`. web knows nothing about the caller.
- `next()` hands the request back to web: it then needs the usual login, as if the path were not public. So a
  path you do not answer never opens anything of web.
- The more specific path wins, and of two instances naming the same path the first one keeps it.
- Protecting the path is now your job alone. Without authentication in web the handler is reached the same way.

### Changed settings without a restart of web

The `app` an extension gets is the app of web with a router of its own: everything registered with
`app.use()`, `app.get()`, `app.post()`, `app.all()`, `app.route()` or `app.param()` lands in that router,
while settings, `app.locals` and `app.get('<setting>')` are those of web. The router sits where the
routes of the extensions always were: behind the routes of web, in front of the files from the object
DB. When the extension stops, web drops the router, and with it every route and middleware it
registered. `app._router` and `app.router` are that router as well.

What web does when the instance object of an extension changes:

- A write that changes neither `common` nor `native` (only `ts`, `from`, `user`) is ignored.
- An extension that now belongs to this web instance - enabled, or `native.webInstance` changed to it - is
  started, with no restart of web.
- A new version of the adapter (`common.version`, `common.installedVersion`, `common.installedFrom`) or
  another `common.webExtension` always restarts web: code that is already loaded cannot be replaced.
- Other changes, and an extension that is disabled or moved to another web instance, restart web - unless
  the extension sets `supportsHotReload`. Then web calls `unload()` and starts a new object with the new
  settings, or just unloads it. web keeps running: the sessions and the socket connections of everybody
  else stay.

```js
class MyExtension {
    // or as a field of the object: this.supportsHotReload = true
    static supportsHotReload = true;
    ...
}
```

Set it only if `unload()` gives back everything the extension took from web besides its routes and its
subscriptions:

- timers and intervals,
- child processes, open sockets and streams,
- listeners on `adapter` or on `server`, like `adapter.on('message')` or `server.on('upgrade')`.

What web does itself:

- Before `unload()` is called, the routes and the public paths of the extension are gone, and it gets no
  `stateChange()`, `objectChange()` or `fileChange()` anymore.
- `unload()` has 5 seconds.
- Listeners the constructor added to `adapter` or to `server` that are still there after `unload()` are
  removed, with a warning in the log. Listeners added later are left alone.
- Subscriptions the extension still holds after `unload()` are given up (see [Subscriptions](#subscriptions)).
  Patterns that others hold too, stay subscribed for them.

An error passed on by a middleware of the extension (`next(err)`) goes to the error handling of web; error
handlers of other extensions do not see it.

`common.mode` could be:
- `daemon` - the instance will be started, but if main.js returns `utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION` as exit code, the instance will not be restarted.
- `extension` - the instance will never be started, as it runs only as part of web instance

## Examples
Following adapters support web-extensions:
- Cameras: https://github.com/ioBroker/ioBroker.cameras/blob/master/lib/web.js
- Simple-api: https://github.com/ioBroker/ioBroker.simple-api/blob/master/build/lib/SimpleAPI.js#L73
- Proxy: https://github.com/ioBroker/ioBroker.proxy/blob/master/lib/proxy.js#L20
- Eufy-Security: https://github.com/bropat/ioBroker.eufy-security/blob/master/src/lib/web.ts (Typescript-implementation)
- REST-API: https://github.com/ioBroker/ioBroker.rest-api/blob/master/src/lib/rest-api.js#L67
- Energiefluss-erweitert: https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/blob/main/lib/web.js