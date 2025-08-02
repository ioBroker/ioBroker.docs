---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.javascript/upgrade-guide.md
title: Upgrade-Anleitung
hash: 419X0Zch8gHqehaZE1IsqpfUeQSR8YCsQdZ4zzqWFaE=
---
# Upgrade-Anleitung
## Verbotene Verzeichnisse für die Skript-Dateisystemspiegelung
**Seit v5.5.0 des JavaScript-Adapters** dürfen die folgenden Speicherorte (relativ zum ioBroker-Basisverzeichnis, normalerweise `/opt/iobroker`) nicht verwendet werden:

* Das ioBroker-Basisverzeichnis selbst und alle darüber liegenden Pfade!
* `./iobroker-data` selbst, benutzerdefiniertes Unterverzeichnis (wählen Sie einen Namen, der sich mit keinem Adapter überschneidet!)
* `./iobroker-data/backup-objects` oder irgendetwas darunter
* `./iobroker-data/files` oder irgendetwas darunter
* `./iobroker-data/backitup` oder irgendetwas darunter
* `./backups` oder irgendetwas darunter
* `./node_modules` oder irgendetwas darunter
* `./log` oder irgendetwas darunter

Die Skript-Dateisystemspiegelung speichert alle Quelldateien der Skripte in Ihrem Dateisystem und ermöglicht Ihnen die Bearbeitung der Dateien in Ihrem bevorzugten Skript-Editor neben dem Web-Editor. Alle Änderungen werden in beide Richtungen synchronisiert.

Wenn Sie die Systemspiegelung für Skriptdateien aktivieren, erstellen Sie bitte ein **eigenes neues Verzeichnis** und verwenden Sie **kein** vorhandenes Verzeichnis mit anderen Inhalten.

Stellen Sie außerdem sicher, dass keine anderen Skripte oder Prozesse Dateien im angegebenen Verzeichnis ändern, um Zugriffsprobleme zu vermeiden.

Alle Speicherorte müssen für den Benutzer „iobroker“ beschreibbar sein!

## Anfrage an httpGet
**Seit Version 8.0.0 des JavaScript-Adapters** ist das Paket `request` veraltet. Die Verwendung in Ihren Skripten führt zu einer Warnung.
Der JavaScript-Adapter muss das Paket irgendwann entfernen.
Um die Migration so einfach wie möglich zu gestalten, bietet die Sandbox eine neue Funktion zum Anfordern von HTTP-Ressourcen.

### JavaScript
Beispielcode:

```js
const request = require('request');

schedule('*/30 * * * *', () => {
    const options = ;

    request({ url: 'https://api.forecast.solar/estimate/', method: 'GET' }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const resObj = JSON.parse(body);

            // ...
        }
    });
});
```

Migration:

1. Entfernen Sie den Import des `request`-Pakets
2. Verwenden Sie die native Methode „httpGet“ (Details finden Sie in der Dokumentation).
3. Aktualisieren Sie die Parameter der Rückruffunktion
4. Ersetzen Sie `body` durch `response.data`

```js
schedule('*/30 * * * *', () => {
    httpGet('https://api.forecast.solar/estimate/', (err, response) => {
        if (err) {
            console.error(err);
        } else if (response.statusCode == 200) {
            const resObj = JSON.parse(response.data);

            // ...
        }
    });
});
```

### Blockly
- Der `request`-Block unterstützte nur HTTP GET (andere Methoden wurden nicht unterstützt) - ersetzen Sie den Block durch `http (GET)`
- Um die Antwort zu verwenden, musste eine benutzerdefinierte Variable namens „result“ erstellt werden. Dies ist nicht mehr erforderlich. Löschen Sie die Variable und verwenden Sie den dedizierten Block, um mit den Ergebnisparametern zu arbeiten (wie in Triggerblöcken).

![Blockly-Anfrage an httpGet](../../../en/adapterref/iobroker.javascript/img/upgrade-guide/request-httpGet.png)