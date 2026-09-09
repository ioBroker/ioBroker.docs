---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md
title: Web-Erweiterungen
hash: AaH4aiQEUPCVtA3nCZW/pJ2Fcw+ZrXNntm0ZSrfk2Xk=
---
# Web-Erweiterungen

Wenn ein Adapter unter demselben Port wie der Webadapter verfügbar sein soll, muss er die Funktionalität der Web-Erweiterung implementieren.

Erstens muss es ein`common.webExtension` Flagge in`io-package.json` Datei, die auf die Web-Erweiterungsdatei verweist. Zum Beispiel.`"webExtension": "lib/web.js"` Die

Zweite,`native.webInstance` Flagge in`io-package.json` muss auf den Instanznamen des Webadapters verweisen, für den die Erweiterung geladen werden soll. Alternativ kann sie einfach für alle Instanzen geladen werden.`"webInstance": "*"` Die

Drittens, stellen Sie sicher`common.enabled` des jeweiligen Web-Erweiterungsadapters ist auf „true“ gesetzt in`io-package.json` :`"enabled": true` Wenn Sie mit **dev-server** arbeiten, beachten Sie bitte Folgendes: dev-server **aktiviert die Instanz nicht automatisch** beim Befehl „dev-server watch“. Dies müssen Sie manuell tun: Navigieren Sie zu`system.adapter.<ADAPTER_NAME>.0` , verwenden`edit object` einstellen`"enabled": true` innerhalb der Objektdaten. Wenn diese nicht korrekt konfiguriert sind, wird die Web-Erweiterung vom Webadapter nicht aktiviert.

Als Nächstes sollten Sie ein Zustandsobjekt erstellen.`info.extension` und legen Sie es auf Codeebene auf „true“ oder „false“ fest. Dieser Status steuert die Anzeige des Adapterstatus durch den Administrator.

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

Fünftens, die Datei`lib/web.js` (oder was auch immer) muss existieren und eine Klasse exportieren.

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

`common.mode` könnte sein:

- `daemon` Die Instanz wird gestartet, aber wenn main.js zurückgibt`utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION` Da es sich um einen Exit-Code handelt, wird die Instanz nicht neu gestartet.
- `extension` - Die Instanz wird niemals gestartet, da sie nur als Teil einer Webinstanz ausgeführt wird.

## Beispiele

Folgende Adapter unterstützen Web-Erweiterungen:

- Kameras: <https://github.com/ioBroker/ioBroker.cameras/blob/master/lib/web.js>
- Simple-API: <https://github.com/ioBroker/ioBroker.simple-api/blob/master/build/lib/SimpleAPI.js#L73>
- Proxy: <https://github.com/ioBroker/ioBroker.proxy/blob/master/lib/proxy.js#L20>
- Eufy-Security: <https://github.com/bropat/ioBroker.eufy-security/blob/master/src/lib/web.ts> (Typescript-Implementierung)
- REST-API: <https://github.com/ioBroker/ioBroker.rest-api/blob/master/src/lib/rest-api.js#L67>
- Energiefluss-erweitert: <https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/blob/main/lib/web.js>