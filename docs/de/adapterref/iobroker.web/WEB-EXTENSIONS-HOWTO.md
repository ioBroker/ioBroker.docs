---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md
title: Web-Erweiterungen
hash: ncUHv9aw1g0VDkD+pKAlG66oLB0mM9tgiLIW6bRoZ+I=
---
# Web-Erweiterungen

Wenn ein Adapter unter demselben Port wie der Webadapter verfügbar sein soll, muss er die Funktionalität der Web-Erweiterung implementieren.

Erstens muss es ein `common.webExtension` Flagge in `io-package.json` Datei, die auf die Web-Erweiterungsdatei verweist. Zum Beispiel. `"webExtension": "lib/web.js"` Die

Zweite, `native.webInstance` Flagge in `io-package.json` muss auf den Instanznamen des Webadapters verweisen, für den die Erweiterung geladen werden soll. Alternativ kann sie einfach für alle Instanzen geladen werden. `"webInstance": "*"` Die

Drittens, stellen Sie sicher `common.enabled` des jeweiligen Web-Erweiterungsadapters ist auf „true“ gesetzt in `io-package.json`: `"enabled": true` Wenn Sie mit **dev-server** arbeiten, beachten Sie bitte Folgendes: dev-server **aktiviert die Instanz nicht automatisch** beim Befehl „dev-server watch“. Dies müssen Sie manuell tun: Navigieren Sie zu `system.adapter.<ADAPTER_NAME>.0`, verwenden `edit object` einstellen `"enabled": true` innerhalb der Objektdaten. Wenn diese nicht korrekt konfiguriert sind, wird die Web-Erweiterung vom Webadapter nicht aktiviert.

Als Nächstes sollten Sie ein Zustandsobjekt erstellen. `info.extension` und legen Sie es auf Codeebene auf „true“ oder „false“ fest. Dieser Status steuert die Anzeige des Adapterstatus durch den Administrator.

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

Fünftens, die Datei `lib/web.js` (oder was auch immer) muss existieren und eine Klasse exportieren.

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

### Das Datenverzeichnis Ihrer eigenen Instanz

`adapter` ist die **Webinstanz** , die Sie ausführt, also `getAbsoluteInstanceDataDir(adapter)` Die Antwort enthält das Verzeichnis von web, nicht Ihr eigenes. Übergeben Sie stattdessen Ihren eigenen Namespace – der Helfer erwartet einen, da `@iobroker/adapter-core` 3.3.1:

```js
const { getAbsoluteInstanceDataDir } = require('@iobroker/adapter-core');

// .../iobroker-data/example.0
const dataDir = getAbsoluteInstanceDataDir(this.namespace);
```

Das Gleiche gilt für alles andere, was Sie normalerweise aus Ihrem eigenen Adapterobjekt auslesen würden: `adapter` gehört zum Web, während `instanceSettings` gehört dir.

### Abonnements

Web, seine Socket-Clients und alle Erweiterungen teilen sich eine Verbindung zu den Datenbanken, und js-controller verwaltet dort ein Abonnement pro Muster – unabhängig davon, wer es angefordert hat. Bis Web 9.4 war die erste `unsubscribeForeignStates()` Ein solches Muster beendete es daher für alle: Eine Erweiterung, die einen Zustand aufgab, nahm ihn den Socket-Clients des Webs und den anderen Erweiterungen weg.

Seit Version 9.5.0 werden die Abonnements, die Sie mit `adapter` sind Ihre eigenen:

- Die Web-Notizen erfassen, wer welches Muster besitzt. Die Datenbank wird für den ersten Eintrag abonniert und abgemeldet, sobald der letzte Eintrag das Muster freigibt. `unsubscribe…()` Es endet lediglich Ihr Abonnement.
- Wie zuvor wird ein zweimal abonniertes Muster nur einmal gespeichert: eins `unsubscribe…()` beendet es.
- Abonnements von Objekten und Dateien werden hinsichtlich des Benutzers überprüft. `options` bei jedem Anruf, wie zuvor.
- Wenn Ihre Erweiterung stoppt, gibt das Web alles auf, was Sie noch halten, und ignoriert anschließend Ihre weiteren Anfragen.
- Dies umfasst `subscribeForeignStates()`, `subscribeStates()`, `subscribeForeignObjects()`, `subscribeObjects()` mit ihren `unsubscribe…()` Und `…Async` Varianten und `subscribeForeignFiles()` /`unsubscribeForeignFiles()` Muster zählen so, wie sie geschrieben sind: `hm-rpc.0.*` Und `hm-rpc.0.STATE` Es handelt sich um zwei Abonnements.

`stateChange()`, `objectChange()` Und `fileChange()` Sie erhalten weiterhin alle Änderungen, die das Web empfängt, einschließlich derer von Mustern, die nur andere abonniert haben. Prüfen Sie die ID, bevor Sie darauf reagieren.

### Wege mit eigenen Anmeldeinformationen

Wenn die Authentifizierung aktiviert ist, lässt das Web keine Anfrage ohne Anmeldung durch, und die OAuth2-Schicht beantwortet jedes Bearer-Token, das sie nicht selbst ausgestellt hat. `401` Ein Client, der Anmeldeinformationen mitbringt, die dem Web unbekannt sind – beispielsweise ein MCP-Client mit dem statischen Token Ihres Adapters oder ein Webhook mit Signatur – erreicht daher niemals Ihre Routen.

Benennen Sie solche Pfade in `publicRoutes()`.web übergibt sie Ihrem Handler vor jedem Authentifizierungsschritt:

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

- Der Pfad muss unterhalb des Adapternamens der Erweiterung liegen (`/example` für `example.0` Nur einfache Segmente: nein `.` oder `..` Keine Anfrage, nichts kodiert. Das Web lehnt andere Pfade ab und protokolliert dies; jeder akzeptierte Pfad wird ebenfalls protokolliert.
- Ihr Handler empfängt die Anfrage so, wie sie eingegangen ist: **nein `req.body` ** (lies den Stream selbst), keine Sitzung und keine `req.user`.web weiß nichts über den Anrufer.
- `next()` Die Anfrage wird an web zurückgegeben: Anschließend ist die übliche Anmeldung erforderlich, als wäre der Pfad nicht öffentlich. Ein Pfad, auf den Sie nicht antworten, öffnet also niemals etwas von web.
- Der spezifischere Pfad setzt sich durch, und wenn zwei Instanzen den gleichen Pfad angeben, behält die erste diesen.
- Der Schutz des Pfades liegt nun allein in Ihrer Verantwortung. Ohne Authentifizierung im Web wird der Handler auf demselben Weg erreicht.

### Einstellungen wurden ohne Neustart der Webseite geändert.

Der `app` Eine Erweiterung erhält eine Webanwendung mit einem eigenen Router: alles, was registriert ist bei `app.use()`, `app.get()`, `app.post()`, `app.all()`, `app.route()` oder `app.param()` landet in diesem Router, während Einstellungen, `app.locals` Und `app.get('<setting>')` Es handelt sich um die Routen des Webs. Der Router befindet sich dort, wo sich die Routen der Erweiterungen immer befanden: hinter den Routen des Webs, vor den Dateien aus der Objektdatenbank. Wenn die Erweiterung beendet wird, entfernt das Web den Router und damit alle von ihm registrierten Routen und Middleware. `app._router` Und `app.router` ist dieser Router auch.

Was Web tut, wenn sich das Instanzobjekt einer Erweiterung ändert:

- Ein Schreibvorgang, der weder noch ändert `common` noch `native` (nur `ts`, `from`, `user`) wird ignoriert.
- Eine Erweiterung, die nun zu dieser Webinstanz gehört - aktiviert, oder `native.webInstance` Umstellung auf it - wird gestartet, ohne Neustart der Webseite.
- Eine neue Version des Adapters (`common.version`, `common.installedVersion`, `common.installedFrom` oder ein anderes `common.webExtension` Die Webseite wird immer neu gestartet: Bereits geladener Code kann nicht ersetzt werden.
- Andere Änderungen und eine deaktivierte oder auf eine andere Webinstanz verschobene Erweiterung erfordern einen Neustart der Webanwendung – es sei denn, die Erweiterung legt Folgendes fest: `supportsHotReload` Dann Webaufrufe `unload()` und startet ein neues Objekt mit den neuen Einstellungen oder entlädt es einfach. Die Webanwendung läuft weiter: Die Sitzungen und Socket-Verbindungen aller anderen Benutzer bleiben erhalten.

```js
class MyExtension {
    // or as a field of the object: this.supportsHotReload = true
    static supportsHotReload = true;
    ...
}
```

Stelle es nur ein, wenn `unload()` Gibt alles zurück, was die Erweiterung vom Web übernommen hat, außer ihren Routen und Abonnements:

- Timer und Intervalle,
- Kindprozesse, offene Sockets und Streams,
- Zuhörer `adapter` oder auf `server`, wie `adapter.on('message')` oder `server.on('upgrade')` Die

Was das Web von selbst tut:

- Vor `unload()` wird aufgerufen, die Routen und die öffentlichen Pfade der Erweiterung sind verschwunden, und es erhält keine `stateChange()`, `objectChange()` oder `fileChange()` mehr.
- `unload()` hat 5 Sekunden.
- Listener, die der Konstruktor hinzugefügt hat `adapter` oder zu `server` die noch da sind nach `unload()` werden entfernt, wobei eine Warnung im Protokoll vermerkt wird. Später hinzugefügte Listener bleiben unverändert.
- Abonnements, die Verlängerung gilt weiterhin nach `unload()` werden aufgegeben (siehe [Abonnements](#subscriptions) ). Abonnements für Muster, die auch andere verwenden, bleiben Sie deshalb abonniert.

Ein Fehler, der von einer Middleware der Erweiterung weitergegeben wurde (`next(err)`) wird an die Fehlerbehandlung des Webs weitergeleitet; Fehlerbehandler anderer Erweiterungen sehen dies nicht.

`common.mode` könnte sein:

- `daemon` Die Instanz wird gestartet, aber wenn main.js zurückgibt `utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION` Da es sich um einen Exit-Code handelt, wird die Instanz nicht neu gestartet.
- `extension` - Die Instanz wird niemals gestartet, da sie nur als Teil einer Webinstanz ausgeführt wird.

## Beispiele

Folgende Adapter unterstützen Web-Erweiterungen:

- Kameras: <https://github.com/ioBroker/ioBroker.cameras/blob/master/lib/web.js>
- Simple-API: <https://github.com/ioBroker/ioBroker.simple-api/blob/master/build/lib/SimpleAPI.js#L73>
- Proxy: <https://github.com/ioBroker/ioBroker.proxy/blob/master/lib/proxy.js#L20>
- Eufy-Security: <https://github.com/bropat/ioBroker.eufy-security/blob/master/src/lib/web.ts> (Typescript-Implementierung)
- REST-API: <https://github.com/ioBroker/ioBroker.rest-api/blob/master/src/lib/rest-api.js#L67>
- Energiefluss-erweitert: <https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/blob/main/lib/web.js>