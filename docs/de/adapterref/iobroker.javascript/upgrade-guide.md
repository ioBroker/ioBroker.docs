---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.javascript/upgrade-guide.md
title: Upgrade-Anleitung
hash: o2Eb9G64jS09GCXeuuf0Re3XwktoidGHb+SLICVLxHk=
---
# Upgrade-Anleitung
## Verbotene Verzeichnisse für die Spiegelung des Skript-Dateisystems
**Seit Version 5.5.0 des JavaScript-Adapters** dürfen die folgenden Verzeichnisse (relativ zum ioBroker-Basisverzeichnis, üblicherweise `/opt/iobroker`) nicht mehr verwendet werden:

* Das ioBroker-Basisverzeichnis selbst und alle darüber liegenden Pfade!
* `./iobroker-data` selbst, benutzerdefiniertes Unterverzeichnis (wählen Sie einen Namen, der sich nicht mit einem Adapter überschneidet!)
* `./iobroker-data/backup-objects` oder alles darunter
* `./iobroker-data/files` oder alles darunter
* `./iobroker-data/backitup` oder irgendetwas darunter
* `./backups` oder alles darunter
* `./node_modules` oder alles darunter
* `./log` oder alles darunter

Die Spiegelung des Skript-Dateisystems speichert alle Quelldateien der Skripte in Ihrem Dateisystem und ermöglicht Ihnen, die Dateien neben dem Web-Editor auch in Ihrem bevorzugten Skripteditor zu bearbeiten. Alle Änderungen werden in beide Richtungen synchronisiert.

Wenn Sie die Spiegelung des Skriptdateisystems aktivieren, erstellen Sie bitte ein **separates neues Verzeichnis** und **verwenden Sie kein** bereits vorhandenes Verzeichnis mit anderen Inhalten.
Stellen Sie außerdem sicher, dass kein anderes Skript oder Prozess Dateien im angegebenen Verzeichnis ändert, um Zugriffsprobleme zu vermeiden. Jeder Speicherort muss für den Benutzer „iobroker“ beschreibbar sein!

Die Synchronisierung erfolgt in beide Richtungen, einschließlich Löschungen: **Wenn ein Ordner aus dem Spiegelverzeichnis verschwindet, werden die darin enthaltenen Skripte aus der ioBroker-Datenbank gelöscht.** Daher kann jede andere Operation, die in dieses Verzeichnis schreibt – beispielsweise ein Backup-Job, eine Bereinigungsaufgabe oder eine Bereitstellung – Ihre Skripte entfernen. Nur wenn das gesamte Spiegelverzeichnis nicht mehr erreichbar ist, z. B. weil eine Freigabe nicht eingebunden ist, bleiben die Skripte erhalten und das Verzeichnis wird beim nächsten Start neu beschrieben.

## Anfrage an httpGet
**Seit Version 8.0.0 des JavaScript-Adapters** ist das Paket `request` veraltet und seine Verwendung in Ihren Skripten führt zu einer Warnung.
Der JavaScript-Adapter muss dieses Paket zu einem späteren Zeitpunkt entfernen.
Um die Migration so einfach wie möglich zu gestalten, stellt die Sandbox eine neue Funktion zum Anfordern von HTTP-Ressourcen bereit.

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

1. Entfernen Sie den Import des `request`-Pakets.
2. Verwenden Sie die native Methode `httpGet` (siehe Dokumentation für Details).
3. Aktualisieren Sie die Parameter der Callback-Funktion.
4. Ersetzen Sie `body` durch `response.data`.

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
Um die Antwort zu verwenden, musste eine benutzerdefinierte Variable namens `result` erstellt werden. Dies ist nun nicht mehr erforderlich. Löschen Sie die Variable und verwenden Sie stattdessen den entsprechenden Block, um mit den Ergebnisparametern zu arbeiten (ähnlich wie in Triggerblöcken).

![Blockly-Anfrage an httpGet](../../../en/adapterref/iobroker.javascript/img/upgrade-guide/request-httpGet.png)