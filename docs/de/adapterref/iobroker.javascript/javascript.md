---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.javascript/javascript.md
title: kein Titel
hash: GAJA8RS9IaFYK+wuVs1bjbRRKC6HtRWjGW6E6KDCY74=
---
## Inhalt
- [Hinweis](#Hinweis)
- [Globale Funktionen](#global-functions)
- [Beste Praxis](#best-practice)

- [Funktionen](#folgende-Funktionen-können-in-Skripten-verwendet-werden)
- [erfordert - lade ein Modul](#erfordert---lade-ein-Modul)
- [Konsole – Gibt die Nachricht ins Protokoll aus](#Konsole---gibt-die-Nachricht-in-das-Protokoll-aus)
- [exec - führe einen Betriebssystembefehl aus, z. B. „cp file1 file2“](#exec---execute-some-os-command-like-cp-file1-file2)
- [on - Abonnieren Sie Änderungen oder Aktualisierungen eines bestimmten Status](#on---subscribe-on-changes-or-updates-of-some-state)
- [einmal](#einmal)
- [abonnieren - dasselbe wie am](#abonnieren---selbe-wie-am)
- [abbestellen](#abbestellen)
- [getSubscriptions](#getsubscriptions)
- [getFileSubscriptions](#getfilesubscriptions)
- [Zeitplan](#Zeitplan)
- [Zeitplan](#time-schedule)
- [Astro-Funktion](#astro-function)
- [scheduleById](#schedulebyid)
- [getSchedules](#getschedules)
- [Zeitplan löschen](#Zeitplan löschen)
- [getAttr](#getattr)
- [getAstroDate](#getastrodate)
- [istAstroTag](#istastrotag)
- [Vergleichszeit](#Vergleichszeit)
- [setState](#setstate)
    - [setStateAsync](#setstateasync)
    - [setStateDelayed](#setstatedelayed)
- [clearStateDelayed](#clearstatedelayed)
- [getStateDelayed](#getstatedelayed)
- [getState](#getstate)
- [getStateAsync](#getstateasync)
- [existsState](#existsState)
- [Objekt abrufen](#Objekt abrufen)
- [Objekt festlegen](#Objekt festlegen)
- [existiertObjekt](#existiertObjekt)
- [Objekt erweitern](#Objekt erweitern)
- [Objekt löschen](#Objekt löschen)
- [getIdByName](#getidbyname)
- [getEnums](#getenums)
- [createState](#createstate)
- [createStateAsync](#createstateasync)
- [deleteState](#deletestate)
- [deleteStateAsync](#deletestateasync)
- [sendTo](#sendto)
- [sendToAsync](#sendtoasync)
- [sendToHost](#sendtohost)
- [sendToHostAsync](#sendtohostasync)
- [setInterval](#setinterval)
- [clearInterval](#clearinterval)
- [Zeitüberschreitung festlegen](#Zeitüberschreitung festlegen)
- [clearTimeout](#cleartimeout)
- [sofort festlegen](#sofort festlegen)
- [formatDate](#formatdate)
- [formatTimeDiff](#formattimediff)
- [getDateObject](#getDateObject)
– [Formatwert](#Formatwert)
- [adapterSubscribe](#adaptersubscribe)
- [adapterUnsubscribe](#adapterunsubscribe)
- [$ - Selektor](#---Selektor)
- [Datei lesen](#Datei lesen)
- [writeFile](#writefile)
- [delFile](#delFile)
- [Datei umbenennen](#Datei umbenennen)
- [inDatei](#inDatei)
- [offFile](#offFile)
- [onStop](#onstop)
- [getHistory](#gethistory)
- [Skript ausführen](#Skript ausführen)
- [runScriptAsync](#runScriptAsync)
- [Startskript](#Startskript)
- [startScriptAsync](#startscriptasync)
- [Stoppskript](#Stoppskript)
- [stopScriptAsync](#stopScriptAsync)
- [isScriptActive](#isscriptactive)
- [Name](#Skriptname)
- [Instanz](#Instanz)
- [Nachricht an](#Nachricht an)
- [messageToAsync](#messagetoasync)
- [beiNachricht](#beiNachricht)
- [onMessageUnregister](#onmessageunregister)
- [onLog](#onlog)
    - [onLogUnregister](#onlogunregister)
- [warten](#warten)
- [schlafen](#schlafen)
- [httpGet](#httpget)
- [httpPost](#httppost)
- [Temporäre Datei erstellen](#temporäre Datei erstellen)
- [Benachrichtigung registrieren](#Benachrichtigung registrieren)

- [Skriptaktivität](#scripts-activity)
- [Änderungsprotokoll](#changelog)

## Globale Funktionen
Sie können die globalen Skripte im Ordner `global` definieren.
Alle globalen Skripte sind auf allen Instanzen verfügbar. Ist ein globales Skript deaktiviert, wird es nicht verwendet.
Globale Skripte werden dem normalen Skript einfach vorangestellt und kompiliert. Sie können daher keine Daten zwischen Skripten über globale Skripte austauschen. Verwenden Sie hierfür Status.

Um globale Funktionen in TypeScript zu verwenden, müssen Sie diese zunächst `declare`, damit der Compiler über die globalen Funktionen informiert ist. Beispiel:

```typescript
// global script:
// ==============
function globalFn(arg: string): void {
    // actual implementation
}

// normal script:
// ==============
declare function globalFn(arg: string): void;
// use as normal:
globalFn('test');
```

#### Bewährte Methode:
Erstellen Sie zwei Instanzen des JavaScript-Adapters: eine Test- und eine Produktionsinstanz.
Nachdem das Skript in der Testinstanz getestet wurde, kann es in die Produktionsinstanz verschoben werden. Anschließend können Sie die Testinstanz nach Belieben neu starten.

## Die folgenden Funktionen können in Skripten verwendet werden:
### Erfordern - einige Module laden
```js
const mod = require('module_name');
```

Folgende Module sind vorinstalliert: `node:dgram`, `node:crypto`, `node:dns`, `node:events`, `node:fs`, `node:http`, `node:https`, `node:http2`, `node:net`, `node:os`, `node:path`, `node:util`, `node:stream`, `node:zlib`, `suncalc2`, `axios`, `wake_on_lan`, `request` (veraltet)

Um andere Module zu verwenden, geben Sie den Namen (und die Version) des Moduls in der Instanzkonfiguration ein. ioBroker installiert das Modul. Sie können es anschließend anfordern und in Ihren Skripten verwenden.

### Konsole - Gibt die Nachricht ins Protokoll aus
Die Verwendung ist die gleiche wie in `javascript`

### Exec – führe einen Betriebssystembefehl aus, z.`cp file1 file2`
```js
exec(cmd, [options], callback);
```

Führen Sie den Systembefehl aus und erhalten Sie die Ausgaben.

```js
// Get the list of files and directories in /var/log
exec('ls /var/log', (error, stdout, stderr) => {
    log('stdout: ' + stdout);
});
```

Node.js verwendet /bin/sh zur Ausführung von Befehlen. Wenn Sie eine andere Shell verwenden möchten, können Sie das Optionsobjekt wie in [Node.js-Dokumentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) für child_process.exec beschrieben verwenden.
Es empfiehlt sich, immer vollständige Pfadnamen für Befehle zu verwenden, um sicherzustellen, dass der richtige Befehl ausgeführt wird.

**Hinweis:** Sie müssen die Option *Befehl „setObject“ aktivieren* aktivieren, um es aufzurufen.

### On - Abonnieren Sie Änderungen oder Aktualisierungen eines bestimmten Status
```js
on(pattern, callbackOrId, value);
```

Die Callback-Funktion gibt das Objekt als Parameter mit folgendem Inhalt zurück:

```js
{
    id: 'javascript.0.myplayer',
    state: {
        val:  'new state',
        ts:   1416149118,
        ack:  true,
        lc:   1416149118,
        from: 'system.adapter.sonos.0'
    },
    oldState: {
        val:  'old state',
        ts:   1416148233,
        ack:  true,
        lc:   1416145154,
        from: 'system.adapter.sonos.0'
    }
}
```

**Hinweis:** `state` hieß zuvor `newState`. Das funktioniert immer noch.

Beispiel:

```js
let timer;

// Create state "javascript.0.counter"
createState('counter', 0);

// On change
on('adapter.0.device.channel.sensor', (data) => {
    // But not ofter than 30 seconds
    if (!timer) {
        timer = setTimeout(() => {
            timer = null;
        }, 30000);

        // Set acknowledged value
        setState('counter', 1 + getState('counter'), true);

        // Or to set unacknowledged command
        setState('adapter.0.device.channel.actor', true);
    }
});
```

Zur Festlegung des Auslösers können Sie folgende Parameter verwenden:

| Parameter | Typ/Wert | Beschreibung |
|-------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Logik | Zeichenfolge | "und"- oder "oder"-Logik zum Kombinieren der Bedingungen \(Standard: "und"\) |
|             |            |                                                                                                                                                     |
| ID | Zeichenfolge | ID ist gleich der angegebenen |
| | RegExp | ID mit regulärem Ausdruck abgeglichen |
| | Array | ID mit einer Liste zulässiger IDs abgeglichen |
|             |            |                                                                                                                                                     |
| Name | Zeichenfolge | Name ist gleich dem angegebenen |
| | RegExp | Name passt zum regulären Ausdruck |
| | Array | Name, der mit einer Liste zulässiger Namen übereinstimmt |
|             |            |                                                                                                                                                     |
| ändern | Zeichenfolge | "eq", "ne", "gt", "ge", "lt", "le", "any" |
| | "eq" | (gleich) Der neue Wert muss dem alten entsprechen (state.val == oldState.val) |
| | "ne" | (ungleich) Der neue Wert muss ungleich dem alten sein (state.val != oldState.val) **Wenn das Muster eine ID-Zeichenfolge ist, wird standardmäßig dieser Wert verwendet** |
| | "gt" | (größer) Der neue Wert muss größer sein als der alte Wert (state.val > oldState.val) |
| | "ge" | (größer oder gleich) Der neue Wert muss größer oder gleich dem alten sein (state.val >= oldState.val) |
| | "lt" | (kleiner) Der neue Wert muss kleiner sein als der alte (state.val < oldState.val) |
| | "le" | (kleiner oder gleich) Der neue Wert muss kleiner oder gleich dem alten Wert sein (state.val <= oldState.val) |
| | "any" | Trigger wird ausgelöst, wenn nur der neue Wert kommt |
|             |            |                                                                                                                                                     |
| val | gemischt | Der neue Wert muss dem angegebenen entsprechen |
| valNe | gemischt | Neuer Wert muss ungleich dem angegebenen sein |
| valGt | gemischt | Neuer Wert muss größer als der angegebene sein |
| valGe | gemischt | Der neue Wert muss größer oder gleich dem angegebenen sein |
| valLt | gemischt | Neuer Wert muss kleiner sein als der angegebene |
| valLe | gemischt | Der neue Wert muss kleiner oder gleich dem angegebenen sein |
|             |            |                                                                                                                                                     |
| ack | Boolean | Bestätigter Status des neuen Werts ist gleich dem angegebenen |
| q | Zahl | Der Qualitätscodestatus des neuen Werts entspricht dem angegebenen. Sie können '*' für die Zuordnung zu jedem Code verwenden. **Falls nicht angegeben, wird q = 0 als Muster festgelegt!** |
|             |            |                                                                                                                                                     |
| oldVal | gemischt | Der vorherige Wert muss dem angegebenen entsprechen |
| oldValNe | gemischt | Vorheriger Wert muss ungleich dem angegebenen sein |
| oldValGt | gemischt | Der vorherige Wert muss größer als der angegebene sein |
| oldValGe | gemischt | Der vorherige Wert muss größer oder gleich dem angegebenen sein |
| oldValLt | gemischt | Der vorherige Wert muss kleiner sein als der angegebene |
| oldValLe | gemischt | Der vorherige Wert muss kleiner oder gleich dem angegebenen sein |
|             |            |                                                                                                                                                     |
| oldAck | bool | Der bestätigte Status des vorherigen Werts ist gleich dem angegebenen |
| oldQ | Nummer | Der Qualitätscodestatus des vorherigen Werts entspricht dem angegebenen. Sie können '*' für die Zuordnung zu jedem Code verwenden |
|             |            |                                                                                                                                                     |
| ts | Zeichenfolge | Der Zeitstempel des neuen Werts muss dem angegebenen entsprechen (state.ts == ts) |
| tsGt | Zeichenfolge | Der Zeitstempel des neuen Werts muss ungleich dem angegebenen sein (state.ts != ts) |
| tsGe | Zeichenfolge | Der Zeitstempel des neuen Werts muss größer sein als der angegebene Wert (state.ts > ts) |
| tsLt | Zeichenfolge | Der Zeitstempel des neuen Werts muss größer oder gleich dem angegebenen sein (state.ts >= ts) |
| tsLe | Zeichenfolge | Der Zeitstempel des neuen Werts muss kleiner sein als der angegebene (state.ts < ts) |
|             |            |                                                                                                                                                     |
| oldTs | Zeichenfolge | Vorheriger Zeitstempel muss mit dem angegebenen übereinstimmen (oldState.ts == ts) |
| oldTsGt | Zeichenfolge | Vorheriger Zeitstempel darf nicht mit dem angegebenen übereinstimmen (oldState.ts != ts) |
| oldTsGe | Zeichenfolge | Vorheriger Zeitstempel muss größer als der angegebene Wert sein (oldState.ts > ts) |
| oldTsLt | Zeichenfolge | Vorheriger Zeitstempel muss größer oder gleich dem angegebenen sein (oldState.ts >= ts) |
| oldTsLe | Zeichenfolge | Vorheriger Zeitstempel muss kleiner sein als der angegebene (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| lc | Zeichenfolge | Der Zeitstempel der letzten Änderung muss dem angegebenen entsprechen (state.lc == lc) |
| lcGt | Zeichenfolge | Der Zeitstempel der letzten Änderung darf nicht mit dem angegebenen übereinstimmen (state.lc != lc) |
| lcGe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer als der angegebene Wert sein (state.lc > lc) |
| lcLt | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer oder gleich dem angegebenen sein (state.lc >= lc) |
| lcLe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss kleiner als der angegebene sein (state.lc < lc) |
|             |            |                                                                                                                                                     |
| oldLc | Zeichenfolge | Der Zeitstempel der letzten Änderung muss dem angegebenen entsprechen (oldState.lc == lc) |
| oldLcGt | Zeichenfolge | Der Zeitstempel der letzten Änderung darf nicht mit dem angegebenen übereinstimmen (oldState.lc != lc) |
| oldLcGe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer sein als der angegebene Wert (oldState.lc > lc) |
| oldLcLt | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer oder gleich dem angegebenen sein (oldState.lc >= lc) |
| oldLcLe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss kleiner sein als der angegebene (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| channelId | Zeichenfolge | Die Kanal-ID muss der angegebenen entsprechen |
| | RegExp | Kanal-ID stimmt mit regulärem Ausdruck überein |
| | Array | Kanal-ID, die mit einer Liste zulässiger Kanal-IDs übereinstimmt |
|             |            |                                                                                                                                                     |
| Kanalname | Zeichenfolge | Der Kanalname muss dem angegebenen entsprechen |
| | RegExp | Kanalname stimmt mit regulärem Ausdruck überein |
| | Array | Kanalname stimmt mit einer Liste zulässiger Kanalnamen überein |
|             |            |                                                                                                                                                     |
| Geräte-ID | Zeichenfolge | Die Geräte-ID muss mit der angegebenen übereinstimmen |
| | RegExp | Geräte-ID stimmt mit regulärem Ausdruck überein |
| | Array | Geräte-ID mit einer Liste zulässiger Geräte-IDs abgeglichen |
|             |            |                                                                                                                                                     |
| Gerätename | Zeichenfolge | Der Gerätename muss dem angegebenen entsprechen |
| | RegExp | Gerätename stimmt mit regulärem Ausdruck überein |
| | Array | Gerätename stimmt mit einer Liste zulässiger Gerätenamen überein |
|             |            |                                                                                                                                                     |
| enumId | Zeichenfolge | Der Status gehört zur angegebenen Aufzählung |
| | RegExp | Eine Enumerations-ID des Staates erfüllt den angegebenen regulären Ausdruck |
| | Array | Eine Enumerations-ID des Staates ist in der angegebenen Liste von Enumerations-IDs |
|             |            |                                                                                                                                                     |
| Enumerationsname | Zeichenfolge | Der Status gehört zur angegebenen Enumeration |
| | RegExp | Ein Enumerationsname des Status erfüllt den angegebenen regulären Ausdruck |
| | Array | Ein Enumerationsname des Staates ist in der angegebenen Liste der Enumerationsnamen enthalten |
|             |            |                                                                                                                                                     |
| von | Zeichenfolge | Neuer Wert stammt vom definierten Adapter |
| | RegExp | Der neue Wert stammt von einem Adapter, der dem regulären Ausdruck entspricht |
| | Array | Der neue Wert stammt von einem Adapter, der in der angegebenen Liste zulässiger Adapter erscheint |
|             |            |                                                                                                                                                     |
| fromNe | Zeichenfolge | Neuer Wert stammt nicht vom definierten Adapter |
| | RegExp | Der neue Wert stammt nicht von einem Adapter, der dem regulären Ausdruck entspricht |
| | Array | Der neue Wert stammt nicht von einem Adapter, der in der angegebenen Liste verbotener Adapter erscheint |
|             |            |                                                                                                                                                     |
| oldFrom | Zeichenfolge | Der alte Wert stammt vom definierten Adapter |
| | RegExp | Der alte Wert stammt von einem Adapter, der mit dem regulären Ausdruck übereinstimmt |
| | Array | Der alte Wert stammt von einem Adapter, der in der angegebenen Liste zulässiger Adapter erscheint |
|             |            |                                                                                                                                                     |
| oldFromNe | Zeichenfolge | Alter Wert stammt nicht vom definierten Adapter |
| | RegExp | Alter Wert stammt nicht von einem Adapter, der dem regulären Ausdruck entspricht |
| | Array | Der alte Wert stammt nicht von einem Adapter, der in der angegebenen Liste verbotener Adapter erscheint |

Beispiele: Trigger auf alle Zustände mit der ID `'*.STATE'`, wenn diese bestätigt werden und den neuen Wert `true` haben.

```js
{
    "id": /\.STATE$/,
    "val": true,
    "ack": true,
    "logic": "and"
}
```

**Hinweis:** Sie können RegExp direkt verwenden:

```js
on(/^system\.adapter\..*\.\d+\.memRss$/, function (obj) {
});

// same as
on({id: /^system\.adapter\..*\.\d+\.memRss$/, change: "ne"}, function (obj) {
});
```

Um zwei Zustände einfach miteinander zu verbinden, schreiben Sie:

```js
on('stateId1', 'stateId2');
```

Alle Änderungen von *stateId1* werden in *stateId2* geschrieben.

Wenn der Parameter `value` in Kombination mit der Status-ID als zweitem Parameter gesetzt ist, wird der Status bei jeder Änderung mit `value` gefüllt.

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

Die Funktion `on` gibt den Handler zurück. Dieser Handler kann durch Abmeldung verwendet werden.

*Hinweis:* Standardmäßig werden nur Zustände mit der Qualität 0x00 an die Rückruffunktion übergeben. Wenn Sie alle Ereignisse erhalten möchten, fügen Sie der Musterstruktur `{q: '*'}` hinzu.

*Hinweis:* Bitte beachten Sie, dass "change" standardmäßig "any" ist, außer wenn nur die ID als String gesetzt ist (z. B. `on('id', () => {});`). In diesem Fall wird "change" auf "ne" gesetzt.

*Hinweis:* Wenn Sie auch Statuslöschungen/-abläufe als Auslöser erhalten möchten, müssen Sie „change“ mit `ne` oder `any` UND q mit `*` als Filter verwenden!

*Hinweis:* Ab 4.3.2 ist es möglich, einen Triggertyp als zweiten Parameter zu schreiben: `on('my.id.0', 'any', obj => log(obj.state.val));`

### Einmal
Registriert ein einmaliges Abonnement, das nach dem ersten Aufruf automatisch abbestellt wird. Wie [An](#on---subscribe-on-changes-or-updates-of-some-state), wird aber nur einmal ausgeführt.

```js
once(pattern, callback);
```

### Abonnieren - dasselbe wie **[An](#on---subscribe-on-changes-or-updates-of-some-state)**
### Abbestellen
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Entfernen Sie alle Abonnements für die angegebene Objekt-ID oder den angegebenen Handler.

```js
// By handler
let mySubscription = on({ id: 'javascript.0.myState', change: 'any' }, (data) => {
    // unsubscribe after first trigger
    if (unsubscribe(mySubscription)) {
        log('Subscription deleted');
    }
});

// by Object ID
on({ id: 'javascript.0.myState1', change: 'ne' }, (data) => {
    log('Some event');
});

on({ id: 'javascript.0.myState1', change: 'any' }, (data) => {
    // unsubscribe
    if (unsubscribe('javascript.0.myState1')) {
        log('All subscriptions deleted');
    }
});
```

### Abonnements abrufen
Holen Sie sich die Liste der Abonnements.

Beispiel für ein Ergebnis:

```js
{
    'megad.0.dataPointName': [
        {
            name : 'script.js.NameOfScript',
            pattern : {
                id : 'megad.0.dataPointName',
                change : 'ne'
            }
        }
    ]
}
```

### GetFileSubscriptions
Rufen Sie die Liste der Dateiabonnements ab.

Beispiel für ein Ergebnis:

```js
{
    'vis.0$%$main/*': [
        {
            name : 'script.js.NameOfScript',
            id : 'vis.0',
            fileNamePattern: 'main/*'
        }
    ]
}
```

### Zeitplan
```js
schedule(pattern, callback);
```

Zeitplaner mit Astrofunktion.

#### Zeitplan
Muster kann eine Zeichenfolge mit [Cron-Syntax](http://en.wikipedia.org/wiki/Cron) sein, die aus 5 (ohne Sekunden) oder 6 (mit Sekunden) Ziffern besteht:

```
* * * * * *
│ │ │ │ │ │
│ │ │ │ │ │
│ │ │ │ │ └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
│ │ │ │ └────────── month (1 - 12)
│ │ │ └─────────────── day of month (1 - 31)
│ │ └──────────────────── hour (0 - 23)
│ └───────────────────────── min (0 - 59)
└───────────────────────────── [optional] sec (0 - 59)
```

```js
// Example with 5 digits:
schedule('*/2 * * * *', () => {
    log('Will be triggered every 2 minutes!');
});

// Example with 6 digits:
schedule('*/3 * * * * *', () => {
    log('Will be triggered every 3 seconds!');
});
```

Das Muster kann auch ein Objekt sein, es wird insbesondere dann verwendet, wenn Sekunden benötigt werden:

Das Objekt könnte folgende Eigenschaften haben:

- `Sekunde`
- `Minute`
- `Stunde`
- `Datum`
- `Monat`
- `Jahr`
- `Wochentag`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

Das Muster kann ein Javascript-Datumsobjekt (ein bestimmter Zeitpunkt) sein – in diesem Fall wird es nur einmal ausgelöst.

Wenn Start- oder Endzeiten für einen Zeitplan benötigt werden, kann dies ebenfalls mithilfe eines Objekts umgesetzt werden. In diesem Szenario verfügt das Objekt über die folgenden Eigenschaften:

- `Start`
- `Ende`
- `Regel`

Start und Ende definieren ein Datumsobjekt, einen Datumsstring oder eine Anzahl von Millisekunden seit dem 1. Januar 1970, 00:00:00 UTC.
Regel ist eine Zeitplanzeichenfolge mit [Cron-Syntax](http://en.wikipedia.org/wiki/Cron) oder ein Objekt:

```js
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
schedule({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, () => {
    log('It will run after 5 seconds and stop after 10 seconds');
});
```

Die Regel selbst könnte auch ein Objekt sein:

```js
let today = new Date();
let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let endTime =  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
let ruleData = { hour: 12, minute: 30 };
schedule({ start: startTime, end: endTime, rule: ruleData }, () => {
    log('Will be triggered at 12:30, starting tomorow, ending in 7 days');
});
```

#### Astro-Funktion
Astro-Funktion kann über das Attribut „astro“ genutzt werden:

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

Das Attribut "shift" gibt den Versatz in Minuten an. Es kann auch negativ sein, um die Zeit vor dem Astro-Ereignis zu definieren.

Die folgenden Werte können als Attribut in der Astrofunktion verwendet werden:

- „Sonnenaufgang“: Sonnenaufgang (Oberkante der Sonne erscheint am Horizont)
- „sunriseEnd“: Sonnenaufgang endet (Unterkante der Sonne berührt den Horizont)
- „goldenHourEnd“: Die goldene Stunde am Morgen (weiches Licht, die beste Zeit zum Fotografieren) endet
- `"solarNoon"`: Sonnenmittag (Sonne steht am höchsten)
- `"goldenHour"`: Beginn der goldenen Abendstunde
- „sunsetStart“: Sonnenuntergang beginnt (Unterkante der Sonne berührt den Horizont)
- „Sonnenuntergang“: Sonnenuntergang (die Sonne verschwindet hinter dem Horizont, die bürgerliche Abenddämmerung beginnt)
- „Dusk“: Dämmerung (Beginn der abendlichen nautischen Dämmerung)
- „nauticalDusk“: nautische Dämmerung (Beginn der abendlichen astronomischen Dämmerung)
- „Nacht“: Die Nacht beginnt (dunkel genug für astronomische Beobachtungen)
- „nightEnd“: Die Nacht endet (die astronomische Morgendämmerung beginnt)
- `"nauticalDawn"`: nautische Morgendämmerung (Beginn der morgendlichen nautischen Dämmerung)
- „Morgendämmerung“: Morgendämmerung (die morgendliche nautische Dämmerung endet, die morgendliche bürgerliche Dämmerung beginnt)
- „Nadir“: Nadir (der dunkelste Moment der Nacht, die Sonne steht am tiefsten)

**Hinweis:** Um die „Astro“-Funktion zu verwenden, müssen „Breitengrad“ und „Längengrad“ in den Einstellungen des JavaScript-Adapters definiert werden.

**Hinweis:** An manchen Stellen kann es vorkommen, dass die Option „night/nightEnd“ nicht vorhanden ist. Bitte lesen Sie dazu [Hier](https://github.com/mourner/suncalc/issues/70).

**Hinweis:** Sie können die Funktion „Ein“ mit kleinen Änderungen für den Zeitplan verwenden:

```js
on({ time: '*/2 * * * *' }, () => {
    log((new Date()).toString() + " - Will be triggered every 2 minutes!");
});

on({ time: { hour: 12, minute: 30 }}, () => {
    log((new Date()).toString() + " - Will be triggered at 12:30!");
});

on({ astro: 'sunset', shift: 10 }, () => {
    log((new Date()).toString() + " - 10 minutes after sunset!");
});
```

## ScheduleById
```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

Ermöglicht die Erstellung eines Zeitplans basierend auf einem Statuswert. Ändert sich der Statuswert, wird der alte Zeitplan gelöscht und automatisch ein neuer Zeitplan erstellt.

Unterstützte Formate:

- `[h]h:[m]m:ss` (z. B. `12:42:15`, `15:3:12`, `3:10:25`)
- `[h]h:[m]m` (z. B. `13:37`, `9:40`)

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

Beispiel: Status erstellen und Zeitplan bei Änderungen registrieren:

```js
createState(
    '0_userdata.0.myTime',
    '00:00:00', // default value
    {
        type: 'string',
        read: true,
        write: true
    },
    () => {
        scheduleById('0_userdata.0.myTime', () => {
            log('Executed!');
        });
    }
);
```

### GetSchedules
```js
const list = getSchedules(true);
```

Gibt die Liste aller CRON-Jobs und Zeitpläne (außer Astro) zurück.
Das Argument muss `true` sein, wenn Sie die Liste für **jedes laufende Skript** erhalten möchten. Andernfalls werden nur die Zeitpläne im aktuellen Skript zurückgegeben.

```js
const list = getSchedules(true);
list.forEach(schedule => log(JSON.stringify(schedule)));

// clear all schedules in all scripts!
list.forEach(schedule => clearSchedule(schedule));
```

Beispielausgabe:

```
2020-11-01 20:15:19.929  - {"type":"cron","pattern":"0 * * * *","scriptName":"script.js.Heizung","id":"cron_1604258108384_74924"}
2020-11-01 20:15:19.931  - {"type":"schedule","schedule":"{"period":{}}","scriptName":"script.js.Heizung","id":"schedule_19576"}
```

### ClearSchedule
Wenn **keine** Astrofunktion verwendet wird, kann der Zeitplan später abgebrochen werden. Dazu muss das Zeitplanobjekt gespeichert werden:

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

### GetAttr
```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

Gibt ein Attribut des Objekts zurück. Der Pfad zum Attribut kann wie im Beispiel verschachtelt sein.

Wenn das erste Attribut eine Zeichenfolge ist, versucht die Funktion, die Zeichenfolge als JSON-Zeichenfolge zu analysieren.

### GetAstroDate
```js
getAstroDate(pattern, date, offsetMinutes);
```

Gibt ein JavaScript-Datumsobjekt für den angegebenen Astronamen zurück (z. B. `"sunrise"` oder `"sunriseEnd"`). Gültige Werte finden Sie in der Liste der zulässigen Werte im Abschnitt [Astro](#astro--function) der Funktion *schedule*.

Das zurückgegebene Date-Objekt wird für das übergebene *Datum* berechnet. Wenn kein Datum angegeben ist, wird der aktuelle Tag verwendet.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Hinweis: Abhängig von Ihrem geografischen Standort kann es Fälle geben, in denen z. B. „Nacht“/„Nachtende“ zu bestimmten Zeitpunkten nicht existieren (z. B. Standorte im Norden jedes Jahres im Mai/Juni!**

Sie können Webseiten wie [suncalc.net](http://suncalc.net) verwenden, um zu überprüfen, ob die Zeitpunkte korrekt sind.

### IstAstroDay
```js
isAstroDay();
```

Gibt `true` zurück, wenn die aktuelle Zeit zwischen dem Astro-Sonnenaufgang und -Sonnenuntergang liegt.

### Vergleichszeit
```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Vergleichen Sie die vorgegebene Zeit mit den Grenzwerten.

Wenn `timeToCompare` nicht angegeben ist, wird die tatsächliche Zeit verwendet.

Folgende Operationen sind möglich:

- `">"` - wenn die angegebene Zeit größer als `startTime` ist
- `">="` - wenn die angegebene Zeit größer oder gleich `startTime` ist
- `"<"` – wenn die angegebene Zeit kleiner als `startTime` ist
- `"<="` - wenn die angegebene Zeit kleiner oder gleich `startTime` ist
- `"=="` - wenn die angegebene Zeit gleich `startTime` ist
- `"<>"` – wenn die angegebene Zeit nicht gleich `startTime` ist
- „zwischen“ – wenn die angegebene Zeit zwischen „Startzeit“ und „Endzeit“ liegt
- „nicht zwischen“ – wenn die angegebene Zeit nicht zwischen „Startzeit“ und „Endzeit“ liegt

Bei der Zeit kann es sich um ein Datumsobjekt, ein Datum mit Zeit oder nur um die Zeit handeln.

Sie können Astronamen für die Zeitdefinition verwenden. Alle drei Parameter können als Astrozeit festgelegt werden.
Folgende Werte sind möglich: `sunrise`, `sunset`, `sunriseEnd`, `sunsetStart`, `dawn`, `dusk`, `nauticalDawn`, `nauticalDusk`, `nightEnd`, `night`, `goldenHourEnd`, `goldenHour`.
Weitere Informationen finden Sie unter [Astro](#astro--function).

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

Es ist auch möglich, die Zeit mit Offset zu definieren:

```js
log(compareTime({ astro: 'sunsetStart', offset: 30 }, { astro: 'sunrise', offset: -30 }, '>') ? 'Now is at least 30 minutes after sunset' : 'No idea');
```

Aufbau eines Astroobjekts.

```js
{
    astro: 'sunsetStart',// mandatory, can be written as string and not as object if offset and date are default
    offset: 30,          // optional
    date:   new Date()   // optional
}
```

### SetState
```js
setState(id, state, ack, callback);
```

*Hinweis*: Die folgenden Befehle sind identisch

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

Informationen zur Verwendung von `ack` finden Sie unter https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses.
Kurzfassung:

- `ack` = `false` : Das Skript möchte einen Befehl senden, der vom Zielgerät/Adapter ausgeführt werden soll
- `ack` = `true`: Befehl wurde erfolgreich ausgeführt und der Status wird als positives Ergebnis aktualisiert

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

Wie setState, aber mit `promise`.

### SetStateDelayed
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

Wie setState, jedoch mit einer Verzögerung in Millisekunden. Sie können alle laufenden Verzögerungen für diese ID löschen (standardmäßig). Beispiel:

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

Diese Funktion gibt den Handler des Timers zurück, und dieser Timer kann einzeln durch clearStateDelayed gestoppt werden

### SetStateChanged
```js
await setStateChanged(id, state, ack);
```

Dasselbe wie setState, aber der Wert wird nur gesetzt, wenn er wirklich geändert wird.

### SetStateChangedAsync
```js
await setStateChangedAsync(id, state, ack);
```

Wie setStateChanged, aber mit `promise`.

### ClearStateDelayed
```js
clearStateDelayed(id);
```

Löscht alle verzögerten Aufgaben für die angegebene Status-ID oder eine bestimmte verzögerte Aufgabe.

```js
setStateDelayed('Kitchen.Light.Lamp', false,  10000); // Switch OFF the light in the kitchen in ten second
let timer = setStateDelayed('Kitchen.Light.Lamp', true, 5000, false); // Switch ON the light in the kitchen in five second
clearStateDelayed('Kitchen.Light.Lamp', timer); // Nothing will be switched on
clearStateDelayed('Kitchen.Light.Lamp'); // Clear all running delayed tasks for this ID
```

### GetStateDelayed
```js
getStateDelayed(id);
```

Dies ist ein synchroner Aufruf. Sie erhalten die Liste aller laufenden Timer (setStateDelayed) für diese ID.
Sie können diese Funktion auch ohne ID aufrufen und erhalten Timer für alle IDs.
Wenn Sie diese Funktion für eine bestimmte Objekt-ID aufrufen, erhalten Sie folgende Antwort:

```js
getStateDelayed('hm-rpc.0.LQE91119.1.STATE');

// returns an array like
[
    { timerId: 1, left: 1123,   delay: 5000,  val: true,  ack: false },
    { timerId: 2, left: 12555,  delay: 15000, val: false, ack: false },
]
```

Wenn Sie nach allen IDs fragen, sieht die Antwort folgendermaßen aus:

```js
getStateDelayed();

// returns an object like
{
    'hm-rpc.0.LQE91119.1.STATE': [
        { timerId: 1, left: 1123,   delay: 5000,   val: true,  ack: false },
        { timerId: 2, left: 12555,  delay: 15000,  val: false, ack: false },
    ],
    'hm-rpc.0.LQE91119.2.LEVEL': [
        { timerId: 3, left: 5679, delay: 10000,   val: 100,  ack: false },
    ],
}
```

- `left` ist die verbleibende Zeit in Millisekunden
- `delay` ist der anfängliche Verzögerungswert in Millisekunden

Sie können direkt nach der Timer-ID fragen. In diesem Fall lautet die Antwort:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### GetState
```js
getState(id);
```

Gibt den Status mit der angegebenen ID in der folgenden Form zurück:

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

Wenn der Status nicht vorhanden ist, wird eine Warnung in den Protokollen ausgegeben und das Objekt `{ val: null, notExist: true }` zurückgegeben.
Um die Warnung zu unterdrücken, prüfen Sie vor dem Aufruf von getState, ob der Status vorhanden ist (siehe [ExistiertZustand](#existsState)).

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

Wie getState, aber mit `promise`.

### ExistiertStatus
```js
existsState(id, (err, isExists) => {});
```

Wenn die Option „Nicht alle Zustände beim Start abonnieren“ deaktiviert ist, können Sie einen einfacheren Aufruf verwenden:

```js
existsState(id)
```

die Funktion gibt in diesem Fall true oder false zurück.

Überprüfen Sie, ob ein Status vorhanden ist.

### Objekt abrufen
```js
getObject(id, enumName);
```

Ruft die Beschreibung der im System gespeicherten Objekt-ID ab.
Sie können den Enumerationsnamen angeben. Ist dieser definiert, werden dem Ergebnis zwei zusätzliche Attribute hinzugefügt: enumIds und enumNames.
Diese Arrays enthalten alle Enumerationen, zu denen die ID gehört. Beispiel:

```js
getObject('adapter.N.objectName', 'rooms');
```

Gibt in EnumIds alle Räume zurück, in denen das angeforderte Objekt Mitglied ist. Sie können "true" als EnumName definieren, um *alle* Enumerationen zurückzugeben.

### Objekt festlegen
```js
setObject(id, obj, callback);
```

Schreibt ein Objekt in die Datenbank. Dieser Befehl kann in den Adaptereinstellungen deaktiviert werden. Verwenden Sie diese Funktion mit Vorsicht, da die globalen Einstellungen beschädigt werden können.

Sie sollten es verwenden, um ein vorhandenes Objekt zu **ändern**, das Sie zuvor gelesen haben, z. B.:

```js
const obj = getObject('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, (err) => {
    if (err) log('Cannot write object: ' + err);
});
```

### ExistiertObjekt
```js
existsObject(id, function (err, isExists) {});
```

Wenn die Option „Nicht alle Zustände beim Start abonnieren“ deaktiviert ist, können Sie einen einfacheren Aufruf verwenden:

```js
existsObject(id)
```

die Funktion gibt in diesem Fall true oder false zurück.

Überprüfen Sie, ob ein Objekt vorhanden ist.

### Objekt erweitern
```js
extendObject(id, obj, callback);
```

Es ist fast dasselbe wie `setObject`, liest aber zuerst das Objekt und versucht, alle Einstellungen zusammenzuführen.

Verwenden Sie es wie folgt:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### Objekt löschen
```js
deleteObject(id, isRecursive, callback);
```

Löscht ein Objekt anhand der ID aus der Datenbank. Wenn das Objekt vom Typ `state` ist, wird auch der Statuswert gelöscht.

Der zusätzliche Parameter `isRecursive` kann angegeben werden, sodass alle untergeordneten Elemente der angegebenen ID gelöscht werden. Sehr gefährlich!

Verwenden Sie es wie folgt:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

*Hinweis: Die Option `isRecursive` ist nur mit js-controller >= 2.2.x verfügbar*

### GetIdByName
```js
getIdByName(name, alwaysArray);
```

Gibt die ID des Objekts mit dem angegebenen Namen zurück.
Gibt es mehrere Objekte mit diesem Namen, ist das Ergebnis ein Array.
Ist das Flag `alwaysArray` gesetzt, ist das Ergebnis immer ein Array, wenn eine ID gefunden wurde.

### GetEnums
```js
getEnums(enumName);
```

Rufen Sie die Liste der vorhandenen Aufzählungen mit Mitgliedern ab, wie:

```js
getEnums('rooms');

// returns all rooms - e.g.:
[
    {
        id: 'enum.rooms.LivingRoom',
        members: [ 'hm-rpc.0.JEQ0024123.1', 'hm-rpc.0.BidCoS-RF.4' ],
        name: 'Living room'
    },
    {
        id: 'enum.rooms.Bath',
        members: [ 'hm-rpc.0.JEQ0024124.1', 'hm-rpc.0.BidCoS-RF.5' ],
        name: 'Bath'
    }
]

getEnums('functions');

// returns all functions - e.g.:
[
    {
        id: 'enum.functions.light',
        members: [
            '0_userdata.0.AnotherOne',
            '0_userdata.0.MyLigh'
        ],
        name: {
            en: 'Light',
            ru: 'Свет',
            de: 'Licht',
            fr: 'Lumière',
            it: 'Leggero',
            nl: 'Licht',
            pl: 'Lekki',
            pt: 'Luz',
            es: 'Luz',
            'zh-cn': '光'
        }
    }
]
```

### Zustand erstellen
```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Erstellen Sie Status und Objekt im JavaScript-Bereich, falls diese nicht vorhanden sind, z. B. `javascript.0.mystate`.

!! Eigene Datenpunkte bevorzugt mit der vollständigen ID `0_userdata.0.mystate` anlegen!!!

#### Parameter:
- `name`: Name des Status ohne Namespace, zB `mystate`
- `initialValue`: Variable kann nach der Erstellung initialisiert werden. Der Wert „undefined“ bedeutet, dass der Wert nicht initialisiert wird.
- „forceCreation“: Status erstellen/überschreiben, unabhängig davon, ob der Status bereits vorhanden ist oder nicht.
- `common`: allgemeine Beschreibung des Objekts, siehe Beschreibung [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- „native“: native Beschreibung eines Objekts. Alle spezifischen Informationen.
- „Callback“: wird aufgerufen, nachdem der Status erstellt und initialisiert wurde.

Wenn Sie in `common` das Flag `alias` auf `true` setzen, wird ein Alias mit demselben Namen (aber im `alias.0`-Namespace) wie der Status erstellt.
Ein Alias wird nur erstellt, wenn er noch nicht existiert.

Die folgenden Einstellungen für Aliase sind ebenfalls gültig:

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
        write: 'val * 1000', // convert function for write to created state
        read: 'val / 1000'   // convert function to read from created state
    }
}
```

oder

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
    }
}
```

Es ist ein kurzer Typ von createState möglich:

- `createState('myDatapoint')` - einfach Datenpunkt erstellen, wenn er nicht existiert
- `createState('myDatapoint', 1)` - Datenpunkt erstellen, falls er nicht existiert und mit dem Wert 1 initialisieren
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` – mit allgemeinen Definitionen wie Typ, Lesen, Schreiben und Rolle
- `createState('myDatapoint', { name: 'Mein eigener Datenpunkt', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'Mein eigener Datenpunkt', unit: '°C' })` – Datenpunkt erstellen, wenn er nicht mit spezifischem Namen und Einheiten existiert

### CreateStateAsync
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

Dasselbe wie `createState`, aber das Versprechen wird zurückgegeben.

### DeleteState
```js
deleteState(name, callback);
```

Löschen Sie Status und Objekt im JavaScript-Bereich, z. B. `javascript.0.mystate`. Status von anderen Adaptern können nicht gelöscht werden.

```js
deleteState('myDatapoint')
```

Löschen Sie einfach den Datenpunkt, falls vorhanden.

### DeleteStateAsync
```js
await deleteStateAsync(name);
```

Dasselbe wie `deleteState`, aber das Versprechen wird zurückgegeben.

### Alias erstellen
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Erstellen Sie einen Alias im Bereich `alias.0`, falls dieser nicht existiert, z. B. `javascript.0.myalias`, und verweisen Sie auf einen Status oder Lese-/Schreibstatus.
Die gemeinsame Definition wird aus dem gelesenen Alias-ID-Objekt übernommen, ein bereitgestellter gemeinsamer Name hat jedoch Vorrang.

#### Parameter:
- `name`: ID des neuen Alias-Status (möglich ohne Alias-Namespace), zB `test.mystate` (Namespace `alias.0.` wird hinzugefügt = `alias.0.test.mystate`)
- `alias`: Kann entweder eine vorhandene Status-ID als Zeichenfolge oder ein Objekt mit vollständiger Alias-Definition inklusive Lese-/Schreib-IDs und Lese-/Schreibfunktionen sein. Hinweis: Alias-Definitionen können nicht als Teil des gemeinsamen Parameters festgelegt werden!
- „forceCreation“: Alias erstellen/überschreiben, unabhängig davon, ob der Status bereits vorhanden ist oder nicht.
- `common`: Allgemeine Beschreibung des Alias-Objekts, siehe Beschreibung [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state). Die hier angegebenen Werte haben Vorrang vor der allgemeinen Definition des gelesenen Alias-ID-Objekts. Hinweis: Alias-Definitionen können nicht als Teil dieses allgemeinen Parameters gesetzt werden, siehe Alias-Parameter!
- „native“: native Beschreibung eines Objekts. Alle spezifischen Informationen.
- „Callback“: wird aufgerufen, nachdem der Status erstellt und initialisiert wurde.

Es ist eine Kurzform von createAlias möglich:

- `createAlias('myAlias', 'myDatapoint')` - erstellen Sie einfach alias.0.myAlias, das auf javascript.X.myDatapoint verweist, falls es nicht existiert
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` – erstellt Alias und Referenz auf verschiedene Lese-/Schreibzustände

Weitere Einzelheiten finden Sie unter createState, es ist ähnlich.

### CreateAliasAsync
```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

Dasselbe wie `createAlias`, aber das Versprechen wird zurückgegeben.

### Senden an
```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

Senden Sie eine Nachricht an eine bestimmte oder alle Adapterinstanzen. Bei Verwendung des Adapternamens wird die Nachricht an alle Instanzen gesendet.

Um spezifische Informationen zu Nachrichten zu erhalten, müssen Sie die Dokumentation für einen bestimmten Adapter lesen.

Beispiel (mit benutzerdefiniertem Timeout):

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

Einige Adapter unterstützen auch Antworten auf die gesendeten Nachrichten. (z. B. Verlauf, SQL, Telegramm) Die Antwort wird nur dann an den Rückruf zurückgegeben, wenn die Nachricht an eine bestimmte Instanz gesendet wird!

Beispiel (mit Rückruf):

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

*Standard-Timeout beträgt 20000 Millisekunden (wenn eine Rückruffunktion definiert wurde)*

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, { timeout: 2000 }, (res) => {
    log(`Sent to ${res} users`);
});
```

### SendToAsync
```js
await sendToAsync(adapter, command, message);
await sendToAsync(adapter, command, message, options);
```

Wie sendTo, aber mit `promise`.

Beispiel:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### SendToHost
```js
sendToHost(hostName, command, message, callback);
```

Senden Sie eine Nachricht an die Controller-Instanz.

Die folgenden Befehle werden unterstützt:

- `'cmdExec'`
- `'getRepository'`
- `'getInstalled'`
- `'getVersion'`
- `'getDiagData'`
- `'getLocationOnDisk'`
- `'getDevList'`
- `'getLogs'`
- `'getLogFile'`
- `'getLogFiles'`
- `'delLogs'`
- `'getHostInfo'`
- `'getHostInfoShort'`
- `'updateMultihost'`
- `'upgradeController'` - Aktualisieren Sie den JS-Controller auf die neueste Version
- `'getInterfaces'` - Gibt alle verfügbaren Netzwerkschnittstellen des Systems zurück
- `'getInterfaces'` - Startet einen Adapter-Upload
- `'Adapter neu erstellen'`
- `'readBaseSettings'`
- `'writeBaseSettings'`
- `'Benachrichtigung hinzufügen'`
- `'clearNotifications'`
- `'Benachrichtigungen erhalten'`
- `'updateLicenses'` - Lizenzen von iobroker.net lesen
- `'upgradeOsPackages'`
- `'restartController'`

Es handelt sich eher um spezifische Befehle und diese werden nicht oft benötigt.

Beispiel:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Hinweis:** Sie müssen die Option *Befehl „setObject“ aktivieren* aktivieren, um es aufzurufen.

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

Dasselbe wie sendToHost, aber mit `promise`.

### Intervall festlegen
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

Gleich wie Javascript `setInterval`.

### ClearInterval
```js
clearInterval(id);
```

Gleich wie Javascript `clearInterval`.

### SetTimeout
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

Gleich wie Javascript `setTimeout`.

### Zeitüberschreitung löschen
```js
clearTimeout(id);
```

Gleich wie Javascript `clearTimeout`.

### SetImmediate
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

Gleich wie JavaScript `setImmediate` und fast dasselbe wie `setTimeout(callback, 0, arg1, arg2, arg3, arg4)`, aber mit höherer Priorität.

### FormatDate
```js
formatDate(millisecondsOrDate, format);
```

#### Parameter:
- `millisecondsOrDate`: Anzahl der Millisekunden aus state.ts oder state.lc (Anzahl der Millisekunden seit 01.01.1970 00:00:00) oder Javascript *new Date()*-Objekt oder Anzahl der Millisekunden aus *(new Date().getTime())*
- `format`: Kann `null` sein, dann wird das Systemzeitformat verwendet, andernfalls

* JJJJ, JJJJ, ГГГГ – ganzes Jahr, z. B. 2015
* YY, JJ, ГГ – kurzes Jahr, z. B. 15
* MM, ММ (kyrillisch) – vollständiger Monat, z. B. 01
* M, М (kyrillisch) – kurzer Monat, z. B. 1
* TT, TT, DD - ganzer Tag, zB 02
* D, T, Д - kurzer Tag, z. B. 2
* hh, SS, чч – volle Stunden, zB 03
* h, S, ч – kurze Stunden, zB 3
* mm, мм (kyrillisch) – volle Minuten, zB 04
* m, м (kyrillisch) – kurze Minuten, z. B. 4
* ss, сс (kyrillisch) – volle Sekunden, zB 05
* s, с (kyrillisch) – kurze Sekunden, z. B. 5
* sss, ссс(kyrillisch) - Millisekunden
* WW, НН (kyrillisch) - ganzer Wochentag als Text
* W, Н (kyrillisch) - kurzer Wochentag als Text
* OO, ОО (kyrillisch) – vollständiger Monat als Text
* OOO, ООО (kyrillisch) – ganzer Monat als Text im Genitiv
* O, О (kyrillisch) - kurzer Monat als Text

#### Beispiel
```js
formatDate(new Date(), "YYYY-MM-DD") // => Date "2015-02-24"
formatDate(new Date(), "hh:mm") // => Hours and minutes "17:41"
formatDate(state.ts) // => "24.02.2015"
formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss") // => "2015.02.15 17:41:98.123"
formatDate(new Date(), "WW") // => Day of week "Tuesday"
formatDate(new Date(), "W") // => Day of week "Tu"
```

### FormatTimeDiff
```js
formatTimeDiff(milliseconds, format);
```

#### Parameter:
- `Millisekunden`: Differenz in Millisekunden*
- `format`: Kann `null` sein, daher wird das Format `hh:mm:ss` verwendet, andernfalls

* TT, TT, ДД – ganzer Tag, zB „02“
* D, T, Д - kurzer Tag, z. B. „2“
* hh, SS, чч – volle Stunden, zB „03“
* h, S, ч – kurze Stunden, zB „3“
* mm, мм (kyrillisch) – volle Minuten, zB „04“
* m, м (kyrillisch) – kurze Minuten, z. B. „4“
* ss, сс (kyrillisch) – volle Sekunden, zB „05“
* s, с (kyrillisch) – kurze Sekunden, z. B. „5“

#### Beispiel
```js
formatTimeDiff(60000, "mm:ss") // => "01:00"

const diff = 172800000 + 10800000 + 540000 + 15000; // 2 days, 3 hours, 9 minutes + 15 secoonds
formatTimeDiff(diff); // "51:09:15"
formatTimeDiff(diff, 'DD hh:mm'); // "02 03:09"
formatTimeDiff(diff, 'D hh:mm'); // "2 03:09"
formatTimeDiff(diff, 'hh:mm:ss'); // "51:09:15"
formatTimeDiff(diff, 'h:m:s'); // "51:9:15"
formatTimeDiff(diff, 'hh:mm'); // "51:09"
formatTimeDiff(diff, 'mm:ss'); // "3069:15"
formatTimeDiff(diff, 'hh'); // "51"
formatTimeDiff(diff, 'mm'); // "3069"
```

### Datumsobjekt abrufen
```js
getDateObject(stringOrNumber);
```

Konvertiert eine Zeichenfolge oder Zahl in ein Datumsobjekt.
Wenn nur Stunden angegeben sind, wird das aktuelle Datum hinzugefügt und die Konvertierung versucht.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### FormatValue
```js
formatValue(value, decimals, format);
```

Formatiert beliebige Werte (auch Zeichenfolgen) in Zahlen. Ersetzt Punkt durch Komma, sofern im System konfiguriert.
Dezimalstellen geben die Ziffern nach dem Komma an. Der Standardwert ist 2.
Das Format ist optional:

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### AdapterAbonnieren
```js
adapterSubscribe(id);
```

Senden Sie die Nachricht "subscribe" an einen Adapter, um diesen zu informieren. Wenn der Adapter bei der Funktion "subscribe" das allgemeine Flag "subscribeable" hat, wird diese Funktion automatisch aufgerufen.

### AdapterAbmelden
```js
adapterUnsubscribe(id);
```

Sendet an einen Adapter die Nachricht `unsubscribe`, um den Adapter anzuweisen, die Werte nicht abzufragen.

### $ - Selektor
```js
$(selector).on((obj) => {}); // Register a subscription for each matching state
$(selector).toArray(); // Get all matching object IDs of the selector expression (requires version >= 8.2.0)
$(selector).each((id, i) => {}); // iterate over all matching states
$(selector).setState(value, ack, callback); // set state value of all matching object IDs (callback is optional)
$(selector).setStateAsync(value, ack); // set state value of all matching object IDs - returns a promise
$(selector).setStateChanged(value, ack, callback); // set state value of all matching object IDs if value has changed (callback is optional)
$(selector).setStateChangedAsync(value, ack, callback); // set state value of all matching object IDs if value has changed - returns a promise
$(selector).setStateDelayed(state, isAck, delay, clearRunning, callback); // // set state value of all matching object IDs with a given delay
$(selector).getState(); // get all states
$(selector).getStateAsync(); // get all states - returns a promise
```

Format des Selektors:

```js
"name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]"
```

Name kann sein: Status, Kanal, Gerät oder Zeitplan `idfilter` kann Platzhalter '*' enthalten

Präfixe ***(nicht implementiert – sollte besprochen werden)*** :

* \# - nach Namen und nicht nach ID nehmen
* . - Filtern nach Rolle
* § - Filtern nach Zimmer

***Beispiel***:

- `$('state[id=*.STATE]')` oder `$('state[state.id=*.STATE]')` oder `$('*.STATE')` – wählt alle Staaten aus, deren ID mit „.STATE“ endet.
- `$('state[id='hm-rpc.0.*]')` oder `$('hm-rpc.0.*')` – gibt alle Zustände der Adapterinstanz hm-rpc.0 zurück
- `$('channel(rooms=Wohnzimmer)')` - alle Zustände im Raum "Wohnzimmer"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Alle Rollläden von Homematic abrufen
- `$('channel[role=switch](rooms=Wohnzimmer)[state.id=*.STATE]').setState(false)` - Alle Zustände mit .STATE von Kanälen mit der Rolle "switch" im "Wohnzimmer" auf "false" umschalten
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - druckt alle Zustände der Aufzählung "windows" im Protokoll
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - druckt alle Zeitpläne mit 65 am Ende
- `$('.switch §"Wohnzimmer")` - Zustände mit allen Schaltern im 'Wohnzimmer' übernehmen ***(nicht implementiert – sollte besprochen werden)***
- `$('channel .switch §"Wohnzimmer")` - Zustände mit allen Schaltern im 'Wohnzimmer' übernehmen ***(nicht implementiert – sollte besprochen werden)***

***Erklärung*** Werfen wir einen Blick auf:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Dieser Code durchsucht Kanäle.
Findet alle Kanäle mit `common.role="switch"` und gehört zu `enum.rooms.Wohnzimmer`.
Übernimmt alle Zustände, deren ID auf `".STATE"` endet, und abonniert alle diese Zustände.
Ändert sich einer dieser Zustände, wird der Callback wie bei der Funktion „Ein“ aufgerufen.

Folgende Funktionen sind möglich: setState, getState (nur vom ersten), on, each, toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(true);
```

Sie können die „each“-Schleife unterbrechen, indem Sie den falschen Wert zurückgeben, etwa:

```js
// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').each((id, i) => {
    log(id);
    if (i == 1) {
        return false;
    }
});
```

Oder Sie können ein normales ID-Array abrufen und es auf Ihre eigene Weise verarbeiten:

```js
// get some state and filter only which has an `true` value
const enabled = $('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').toArray().filter((id) => getState(id)?.val === true);
```

### Datei lesen
```js
readFile(adapter, fileName, (error, bytes) => {});
```

Das Ergebnis wird im Rückruf zurückgegeben.
Datei aus der Datenbank aus dem Ordner `javascript.0` lesen.

Das Argument *Adapter* kann weggelassen werden.

```js
// read vis views
readFile('vis.0', '/main/vis-views.json', (error, data) => {
    log(data.substring(0, 50));
});

// The same as
//readFile('/../vis.0/main/vis-views.json', (error, data) => {
//     log(data.substring(0, 50));
//});
```

Standardmäßig ist das Arbeitsverzeichnis/der Adapter `javascript.0`.

### Datei schreiben
```js
writeFile(adapter, fileName, bytes, (error) => {});
```

Der optionale Fehlercode wird im Callback ausgegeben. Das Argument *adapter* kann weggelassen werden.
fileName ist der Name der Datei in der Datenbank. Alle Dateien werden im Ordner „javascript“ gespeichert.
Wenn Sie in andere Ordner schreiben möchten, z. B. nach „/vis.0/“, verwenden Sie dazu setFile.

Die Datei, die wie `'/subfolder/file.txt'` aussieht, wird unter `"/javascript/subfolder/file.txt"` gespeichert und kann über den Webserver mit `"http://ip:8082/javascript/subfolder/file.txt"` abgerufen werden

```js
// store screenshot in DB
const fs = require('node:fs');
let data = fs.readFileSync('/tmp/screenshot.png');
writeFile(null, '/screenshots/1.png', data, (error) => {
    log('file written');
});

// The same as
//writeFile('/screenshots/1.png', data, function (error) {
//    log('file written');
//});
```

```js
// store file in '/vis.0' in DB
const fs = require('node:fs');
let data = fs.readFileSync('/tmp/screenshot.png');
writeFile('vis.0', '/screenshots/1.png', data, (error) => {
    log('file written');
});
```

### DelFile
```js
delFile(adapter, fileName, (error) => {});
```

Datei oder Verzeichnis löschen. fileName ist der Name der Datei oder des Verzeichnisses in der Datenbank.

Der alternative Name dieser Methode ist `unlink`

### Datei umbenennen
```js
renameFile(adapter, oldName, newName, (error) => {});
```

Datei oder Verzeichnis umbenennen. „oldName“ ist der Name der Datei oder des Verzeichnisses in der Datenbank und wird in „newName“ umbenannt.

Der alternative Name dieser Methode ist `rename`

### In Datei
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Dateiänderungen abonnieren:

- „id“ ist die ID eines Objekts vom Typ „Meta“, wie „vis.0“
- „fileName“ ist ein Dateiname oder ein Muster, wie „main/*“ oder „main/vis-view.json“.
- „withFile“, ob der Inhalt der Datei im Rückruf übermittelt werden soll oder nicht. Die Übermittlung des Dateiinhalts kostet Speicher und Zeit. Wenn Sie also nur über Änderungen informiert werden möchten, setzen Sie „withFile“ auf „false“.

Argumente im Rückruf:

- `id` – ID des `Meta`-Objekts;
- `fileName` – Dateiname (kein Muster);
- „Größe“ – neue Dateigröße;
- `fileData` – Dateiinhalt vom Typ `Buffer`, wenn die Datei binär (anhand der Erweiterung erkannt) oder `string` ist. Wird nur übermittelt, wenn `withFile`;
- `mimeType` – MIME-Typ der Datei, z. B. `image/jpeg`. Wird nur übermittelt, wenn `withFile`;

**Wichtig**: Diese Funktionalität ist nur mit js-controller@4.1.x oder neuer verfügbar.

### OffFile
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Abmeldung von Dateiänderungen:

- `id` ist die ID eines Objekts vom Typ `meta`, wie `vis.0`
- „fileName“ ist ein Dateiname oder ein Muster, wie „main/*“ oder „main/vis-view.json“.

**Wichtig**: Diese Funktionalität ist nur mit js-controller@4.1.x oder neuer verfügbar.

### Bei Stopp
```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Installiere einen Callback, der aufgerufen wird, wenn ein Skript gestoppt wird. Wird beispielsweise verwendet, um die Kommunikation zu stoppen oder Verbindungen zu schließen.

```js
// establish connection
const conn = require('net');
// ...

// close connection if script stopped
onStop((callback) => {
    if (conn) {
        // close connection
        conn.destroy();
    }
    callback();
}, 2000 /*ms*/);
```

`timeout` beträgt standardmäßig 1000 ms.

### GetHistory
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Liest den Verlauf aus der angegebenen Instanz. Wenn keine Instanz angegeben ist, wird die Standard-Verlaufsinstanz des Systems verwendet.

```js
// Read history of 'system.adapter.admin.0.memRss' from sql driver
const end = new Date().getTime();
getHistory(
    'sql.0',
    {
        id:         'system.adapter.admin.0.memRss',
        start:      end - 3600000,
        end:        end,
        aggregate:  'm4',
        timeout:    2000
    },
    (err, result) => {
        if (err) console.error(err);
        if (result) {
            for (let i = 0; i < result.length; i++) {
                log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
            }
        }
    }
);
```

Mögliche Optionen finden Sie unter [Hier](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter).

Zusätzlich zu diesen Parametern müssen Sie „id“ angeben und Sie können ein Timeout angeben (Standard: 20000 ms).

Noch ein Beispiel:

```js
// Get last 50 entries from default history instance with no aggregation:
getHistory({
        id:         'system.adapter.admin.0.alive',
        aggregate:  'none',
        count:      50
    }, (err, result) => {
        if (err) console.error(err);
        if (result) {
            for (let i = 0; i < result.length; i++) {
                log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
            }
        }
    });
```

**Hinweis:** Natürlich muss der Verlauf zuerst für die ausgewählte ID im Administrator aktiviert werden.

### Skript ausführen
```js
runScript('scriptName', () => {
    // Callback is optional
    log('Srcipt started, but not yet executed');
});
```

Startet oder startet andere Skripte (und auch sich selbst) nach Namen neu.

```js
// restart script
runScript('groupName.scriptName1');
```

### RunScriptAsync
Wie runScript, aber mit `promise`.

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### Startskript
```js
startScript('scriptName', ignoreIfStarted, callback);
```

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, wird nichts unternommen, wenn ein Skript bereits läuft. Andernfalls wird das Skript neu gestartet.

```js
startScript('scriptName', true); // start script if not started
```

### StartScriptAsync
Wie runScript, aber mit `promise`.

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, wird nichts unternommen, wenn ein Skript bereits läuft. Andernfalls wird das Skript neu gestartet.

```js
startScript('scriptName', true); // start script if not started
```

### Skript stoppen
```js
stopScript('scriptName', callback);
```

Wenn stopScript ohne Argumente aufgerufen wird, stoppt es sich selbst:

```js
stopScript();
```

### StopScriptAsync
Wie StopScript, aber mit `promise`:

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

Wenn stopScript ohne Argumente aufgerufen wird, stoppt es sich selbst:

```js
stopScript();
```

### IstSkriptaktiv
```js
isScriptActive('scriptName');
```

Gibt an, ob ein Skript aktiviert oder deaktiviert ist. Beachten Sie, dass dies keine Rückschlüsse darauf zulässt, ob das Skript gerade ausgeführt wird oder nicht.
Das Skript kann beendet, aber dennoch aktiviert sein.

Es handelt sich nicht um eine Funktion. Es handelt sich um eine Variable mit einer JavaScript-Instanz, die im Gültigkeitsbereich des Skripts sichtbar ist.

### ZuInt
### ZuFloat
### ToBoolean
### JsonataExpression
### Warten
Pausieren Sie einfach die Ausführung des Skripts.
Warnung: Diese Funktion ist `promise` und muss wie folgt aufgerufen werden:

```js
await wait(1000);
```

### Schlafen
Gleich wie [Warten](#wait)

### Nachricht an
```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, {timeout: 1000}, result =>
    log(JSON.stringify(result)));
```

Senden Sie die Nachricht über den „Nachrichtenbus“ an ein anderes Skript. Oder sogar an einen Handler im selben Skript.

Das Timeout für den Rückruf beträgt standardmäßig 5 Sekunden.

Das Ziel könnte verkürzt werden auf:

```js
messageTo('messageName', data, result => {
    log(JSON.stringify(result));
});
```

Rückruf und Optionen sind optional und das Timeout beträgt standardmäßig 5000 Millisekunden (sofern ein Rückruf bereitgestellt wird).

```js
messageTo('messageName', dataWithNoResponse);
```

### MessageToAsync
```js
onMessage('myTopic', async (data, callback) => {
    log(data);

    if (!data.myPayload) {
        // return error (promise reject)
        callback({ error: 'something went wrong!!' });
    } else {
        // return result (promise resolve)
        callback({ result: 'ok' });
    }
});

(async () => {
    try {
        const msg = await messageToAsync({ instance: 0, script: 'script.js.test2', message: 'myTopic' }, { myPayload: true }, { timeout: 1000 });
        log(`Done with: ${JSON.stringify(msg)}`);
    } catch (error) {
        // contents of result.error
        console.error(error);
    }
})();
```

### BeiNachricht
```js
onMessage('messageName', (data, callback) => {
    log(`Received data: ${data}`); callback({ result: Date.now() });
});
```

Abonniert den Message Bus des JavaScript-Adapters und liefert die Antwort per Callback.
Die Antwort des Skripts, das zuerst eine Antwort sendet, wird als Antwort akzeptiert, alle anderen Antworten werden ignoriert.

Um eine Nachricht an ein JavaScript-Skript zu senden, die dann von diesem Handler empfangen wird, verwenden Sie [Nachricht an](#messageTo).

Um eine Nachricht von einem anderen Adapter zu senden, verwenden Sie

```js
adapter.sendTo('javascript.0', 'toScript', {
    script: 'script.js.messagetest',
    message: 'messageName',
    data: {
        flag: true
    }
});
```

um eine Nachricht von der CLI zu senden, verwenden Sie

```bash
iob message javascript.0 toScript '{"script": "script.js.messagetest", "message": "messageName", "data": { "flag": true }}'
```

### BeiMessageUnregister
```js
const id = onMessage('messageName', (data, callback) => {
    log(data);
    callback(Date.now());
});

// unsubscribe specific handler
onMessageUnregister(id);
// or unsubscribe by name
onMessageUnregister('messageName');
```

Beendet das Abonnement dieser Nachricht.

### OnLog
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Abonnieren Sie Protokolle mit angegebenem Schweregrad.

*Wichtig:* Sie können im Handler keine Protokolle mit derselben Schwere ausgeben, um Endlosschleifen zu vermeiden.

Dies erzeugt beispielsweise keine Protokolle:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Um alle Logs zu empfangen, kann der Wert `*` verwendet werden. In diesem Fall wird die Logausgabe im Handler komplett deaktiviert.

```js
onLog('*', data => {
    console.error('Error: ' + data.message); // will produce no logs
});
```

### BeiLogUnregister
```js
function logHandler(data) {
    console.error('Error: ' + data.message);
}
const id = onLog('warn', logHandler);

// unsubscribe by ID
onLogUnregister(id);
// or unsubscribe by function handler
onLogUnregister(logHandler);
// or unsubscribe all handlers with specific severity
onLogUnregister('warn');
```

Meldet sich von diesen Protokollen ab.

### HttpGet
*Erfordert Version >= 7.9.0*

```js
httpGet('http://jsonplaceholder.typicode.com/posts', (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

Der zweite Parameter kann ein Objekt mit weiteren Optionen sein (optional). Alle Optionen sind optional. Unterstützte Flags:

- `timeout` (Zahl) – Timeout in Millisekunden
- `responseType` (Zeichenfolge) - Unterstützte Werte sind `text` (Standard) oder `arraybuffer` für Binärdaten in der Antwort
- `basicAuth` (Objekt) – Anmeldeinformationen für die grundlegende HTTP-Authentifizierung. z. B. `{ Benutzer: 'admin', Passwort: 'iobroker' }`
- `bearerAuth` (Zeichenfolge) – Token für die Trägerauthentifizierung
- `headers` (Objekt) – Zusätzliche benutzerdefinierte HTTP-Header, z. B. `{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (Boolesch) – Lässt selbstsignierte Zertifikate zu, wenn `false`

```js
httpGet('http://jsonplaceholder.typicode.com/posts', { timeout: 1000 }, (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

Datei in das ioBroker-Dateisystem herunterladen:

```js
httpGet('http://1.2.3.4/image.jpg', { responseType: 'arraybuffer' }, async (err, response) => {
    if (!err) {
        writeFile('0_userdata.0', 'test.jpg', response.data, (err) => {
            if (err) {
                console.error(err);
            }
        });
    } else {
        console.error(err);
    }
});
```

Zertifikatsvalidierung deaktivieren – *Erfordert Version >= 8.4.0*

```js
httpGet('http://jsonplaceholder.typicode.com/posts', { validateCertificate: false }, (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

### HttpPost
*Erfordert Version >= 7.9.0*

```js
httpPost('http://jsonplaceholder.typicode.com/posts', { title: 'foo', body: 'bar', userId: 1 }, (error, response) => {
    if (!error) {
        console.log(response.statusCode);
        console.log(response.data);
        console.log(response.headers);
    } else {
        console.error(error);
    }
});
```

Mit benutzerdefinierten Headern und Authentifizierung

```js
httpPost(
    'http://jsonplaceholder.typicode.com/posts',
    {
        title: 'foo',
        body: 'bar',
        userId: 1
    },
    {
        timeout: 2000,
        basicAuth: {
            user: 'admin',
            password: 'dg2LdALNznHFNo'
        },
        headers: {
            'Cookie': 'PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1'
        }
    },
    (error, response) => {
        if (!error) {
            console.log(response.statusCode);
            console.log(response.data);
            console.log(response.headers);
        } else {
            console.error(error);
        }
    }
);
```

### Temporäre Datei erstellen
*Erfordert Version >= 8.3.0*

```js
httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.png', { responseType: 'arraybuffer' }, async (err, response) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('javascript.png', response.data);
        console.log(`Saved to ${tempFilePath}`);

        // Use the new path in other scripts (e.g. sendTo)
    }
});
```

```js
onFile('0_userdata.0', '*.jpg', true, async (id, fileName, size, data, mimeType) => {
    const tempFilePath = createTempFile(fileName, response.data);

    // Use the new path in other scripts (e.g. sendTo)
});
```

```js
readFile('0_userdata.0', 'test.jpg', (err, data, mimeType) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('test.jpg', data);

        // Use the new path in other scripts (e.g. sendTo)
        sendTo('telegram.0', 'send', {
            text: tempFilePath,
            caption: 'Just a test image',
            user: 'yourUsername',
        });
    }
});
```

## Benachrichtigung registrieren
*Erfordert Version >= 8.8.0*

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## Globale Skriptvariablen
### Skriptname
`scriptName` – Der Name des Skripts.

```js
log(`Script ${scriptName} started!`);
```

### Instanz
`instance` – Die JavaScript-Instanz, in der ein Skript ausgeführt wird (z. B. `0`).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### DefaultDataDir
`defaultDataDir` – Absoluter Pfad zu den iobroker-Daten.

```js
log(`Data dir: ${defaultDataDir}`);
```

### Ausführlich
`verbose` - Ausführlicher Modus aktiviert?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

## Option - "Beim Start nicht alle Zustände abonnieren"
Es gibt zwei Möglichkeiten, Zustände zu abonnieren:

1. Der Adapter abonniert beim Start alle Zustände und empfängt alle Änderungen aller Zustände (die Verwendung von getState(id) ist einfacher, erfordert aber mehr CPU und RAM):

```js
log(getState('someID').val);
```

2. Der Adapter abonniert jedes Mal die angegebene ID, wenn „on/subscribe“ aufgerufen wird. In diesem Modus erhält der Adapter nur Updates für gewünschte Zustände. Diese Option benötigt weniger RAM und ist effizienter, allerdings ist der synchrone Zugriff auf Zustände über getState nicht möglich. **Sie müssen Callbacks oder Promises verwenden, um auf die Zustände zuzugreifen**:

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Grund: Der Adapter hat den Statuswert nicht im RAM und muss ihn aus der zentralen Statusdatenbank anfordern.

## Skriptaktivität
Es besteht die Möglichkeit, Skripte über Zustände zu aktivieren und zu deaktivieren. Für jedes Skript wird der Zustand mit dem Namen `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME` angelegt.
Skripte können aktiviert und deaktiviert werden, indem dieser Zustand mit `ack=false` gesteuert wird.