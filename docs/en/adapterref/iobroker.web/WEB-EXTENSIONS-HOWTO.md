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
    const that       = this;

    // instanceSettings and this.config contain instance config (not web adapter, but this one with web-extension)
    this.config.demoParam = this.config.demoParam || 'demo';

    this.unload = function () {
        return new Promise(resolve => {
            adapter.log.debug('Demo extension unloaded!');
            
            // unload app path
            const middlewareIndex = app._router.stack.findIndex(layer => 
                layer && layer.route === '/' + that.config.demoParam);
                
            if (middlewareIndex !== -1) {
                // Remove the matched middleware
                app._router.stack.splice(middlewareIndex, 1);
            }
            
            resolve();
        });
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
    // Used if initalisation lasts some time
    this.readyCallback = null; 
    this.waitForReady = cb => {
        this.readyCallback = cb;
    }

    // self invoke constructor
    (function __constructor () {
        adapter.log.info('Install extension on /' + that.config.demoParam);
        
        that.app.use('/' + that.config.demoParam, (req, res) => {
            res.setHeader('Content-type', 'text/html');
            res.status(200).send('You called a demo web extension with path "' + req.url + '"');
        });
        
        // inform web about that all routes are installed
        this.readyCallback && this.readyCallback(that);
    })();
}

module.exports = ExtensionExample;
```

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