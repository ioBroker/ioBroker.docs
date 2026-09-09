---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md
title: Веб-расширения
hash: AaH4aiQEUPCVtA3nCZW/pJ2Fcw+ZrXNntm0ZSrfk2Xk=
---
# Веб-расширения

Если адаптер должен быть доступен на том же порту, что и веб-адаптер, он должен реализовывать функциональность веб-расширения.

Во-первых, оно должно иметь`common.webExtension` флаг в`io-package.json` файл, указывающий на файл расширения веб-сайта. Например:`"webExtension": "lib/web.js"` .

Второй,`native.webInstance` флаг в`io-package.json` Необходимо указать имя экземпляра веб-адаптера, для которого должно быть загружено расширение. Или же можно просто загрузить его для всех экземпляров через`"webInstance": "*"` .

В-третьих, убедитесь`common.enabled` В соответствующем адаптере веб-расширения установлено значение true.`io-package.json` :`"enabled": true` Если вы работаете с **dev-server,** обратите внимание: dev-server **не включает экземпляр** при использовании команды "dev-server watch", это необходимо сделать вручную: перейдите по адресу`system.adapter.<ADAPTER_NAME>.0` , использовать`edit object` установить`"enabled": true` внутри данных объекта. Если задано неправильно, веб-расширение не будет активировано веб-адаптером.

Далее вам следует создать объект состояния.`info.extension` и установите значение true/false на уровне кода. Это состояние будет управлять отображением статуса адаптера в административной панели.

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

В-пятых, файл`lib/web.js` (или что-то подобное) должно существовать, и оно должно экспортировать класс.

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

`common.mode` возможно:

- `daemon` - экземпляр будет запущен, но если main.js вернет результат`utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION` В этом случае код завершения означает, что экземпляр не будет перезапущен.
- `extension` - Этот экземпляр никогда не будет запущен, поскольку он работает только как часть веб-экземпляра.

## Примеры

Следующие адаптеры поддерживают веб-расширения:

- Камеры: <https://github.com/ioBroker/ioBroker.cameras/blob/master/lib/web.js>
- Simple-api: <https://github.com/ioBroker/ioBroker.simple-api/blob/master/build/lib/SimpleAPI.js#L73>
- Прокси: <https://github.com/ioBroker/ioBroker.proxy/blob/master/lib/proxy.js#L20>
- Eufy-Security: <https://github.com/bropat/ioBroker.eufy-security/blob/master/src/lib/web.ts> (реализация на Typescript)
- REST-API: <https://github.com/ioBroker/ioBroker.rest-api/blob/master/src/lib/rest-api.js#L67>
- Energiefluss-erweitert: <https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/blob/main/lib/web.js>