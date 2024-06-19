---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.javascript/javascript.md
title: kein Titel
hash: dViRabKp0N5ZMlnv3odq50RMtCrHkYEoCks8bqFaFyQ=
---
## Inhalt
- [Anmerkung](#Anmerkung)
- [Globale Funktionen](#globale-funktionen)
- [Bewährte Vorgehensweise](#best-practice)

- [Funktionen](#folgende-Funktionen-können-in-Skripten-verwendet-werden)
- [erforderlich - ein Modul laden](#erforderlich---ein-Modul-laden)
- [Konsole – Gibt die Nachricht ins Protokoll aus](#Konsole---gibt-die-Nachricht-in-das-Protokoll-aus)
- [exec - führe einen Betriebssystembefehl aus, etwa „cp file1 file2“](#exec---execute-some-os-command-like-cp-file1-file2)
- [on - Abonnieren Sie Änderungen oder Aktualisierungen eines bestimmten Status](#on---subscribe-on-changes-or-updates-of-some-state)
- [einmal](#einmal)
- [abonnieren - dasselbe wie am](#abonnieren---selbe-wie-am)
- [abbestellen](#abbestellen)
- [getSubscriptions](#getsubscriptions)
- [getFileSubscriptions](#getfilesubscriptions)
    - [Zeitplan Zeitplan)
- [Zeitplan](#time-schedule)
- [Astro-Funktion](#Astro-Funktion)
- [scheduleById](#schedulebyid)
- [getSchedules](#getschedules)
- [Zeitplan löschen](#Zeitplan löschen)
- [getAttr](#getattr)
- [getAstroDate](#getastrodate)
- [istAstroDay](#istastroday)
- [Vergleichszeit](#Vergleichszeit)
- [Zustand festlegen](#Zustand festlegen)
- [setStateAsync](#setstateasync)
- [setStateDelayed](#setstatedelayed)
- [clearStateDelayed](#clearstatedelayed)
- [getStateDelayed](#getstatedelayed)
- [getState](#getstate)
- [getStateAsync](#getstateasync)
- [existiertZustand](#existiertZustand)
- [Objekt abrufen](#Objekt abrufen)
- [Objekt festlegen](#Objekt festlegen)
- [existiertes Objekt](#existiertes Objekt)
- [Objekt erweitern](#Objekt erweitern)
- [Objekt löschen](#Objekt löschen)
- [getIdByName](#getidbyname)
- [getEnums](#getenums)
- [Zustand erstellen](#Zustand erstellen)
- [createStateAsync](#createstateasync)
- [Status löschen](#Status löschen)
- [deleteStateAsync](#deletestateasync)
- [sendenAn](#sendenan)
- [sendToAsync](#sendtoasync)
- [an Host senden](#an Host senden)
- [sendToHostAsync](#sendtohostasync)
- [Intervall festlegen](#Intervall festlegen)
- [Löschintervall](#Löschintervall)
- [Zeitlimit festlegen](#Zeitlimit festlegen)
- [Zeitüberschreitung löschen](#Zeitüberschreitung löschen)
- [Sofort festlegen](#Sofort festlegen)
- [formatDate](#formatdate)
- [formatTimeDiff](#formattimediff)
- [getDateObject](#getDateObject)
– [Formatwert](#Formatwert)
- [adapterAbonnieren](#adaptersubscribe)
- [adapterUnsubscribe](#adapterunsubscribe)
- [$ - Selektor](#---Selektor)
- [Datei lesen](#Datei lesen)
- [Datei schreiben](#Datei schreiben)
- [Datei löschen](#Datei löschen)
- [Datei umbenennen](#Datei umbenennen)
- [inDatei](#inDatei)
- [ausDatei](#ausDatei)
- [beiStopp](#beiStopp)
- [History abrufen](#gehistory)
- [Skript ausführen](#Skript ausführen)
- [runScriptAsync](#runScriptAsync)
- [Startskript](#Startskript)
– [startScriptAsync](#startscriptasync)
- [Stoppskript](#Stoppskript)
- [stopScriptAsync](#stopScriptAsync)
- [istScriptActive](#isscriptactive)
    - [Name Name)
- [Instanz](#Instanz)
- [Nachricht an](#Nachricht an)
- [Nachricht an Async](#Nachricht an Async)
- [beiNachricht](#beiNachricht)
- [beiNachrichtenabmeldung](#beiNachrichtenabmeldung)
- [beimLog](#beimLog)
- [beiAbmeldung](#onlogunregister)
    - [warte warte)
    - [Schlaf Schlaf)
- [httpGet](#httpget)
- [httpPost](#httppost)
- [Temporäre Datei erstellen](#temporäre Datei erstellen)

- [Skriptaktivität](#scripts-activity)
- [Änderungsprotokoll](#changelog)

## Globale Funktionen
Sie können die globalen Skripte im Ordner `global` definieren.
Alle globalen Skripte sind auf allen Instanzen verfügbar. Wenn ein globales Skript deaktiviert ist, wird es nicht verwendet.
Globale Skripte werden einfach dem normalen Skript vorangestellt und kompiliert, sodass Sie keine Daten zwischen Skripten über globale Skripte austauschen können. Verwenden Sie dafür Zustände.

Um globale Funktionen in TypeScript zu verwenden, müssen Sie diese zuerst `declare`, damit der Compiler über die globalen Funktionen informiert ist. Beispiel:

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

#### Beste Übung:
Erstellen Sie zwei Instanzen des JavaScript-Adapters: eine „Test“- und eine „Produktions“-Instanz.
Nachdem das Skript in der „Test“-Instanz getestet wurde, kann es in die „Produktion“ verschoben werden. Dadurch können Sie die „Test“-Instanz nach Belieben neu starten.

## Die folgenden Funktionen können in Skripten verwendet werden:
### Erfordern - einige Module laden
```js
const mod = require('module_name');
```

Folgende Module sind vorinstalliert: `node:dgram`, `node:crypto`, `node:dns`, `node:events`, `node:fs`, `node:http`, `node:https`, `node:http2`, `node:net`, `node:os`, `node:path`, `node:util`, `node:stream`, `node:zlib`, `suncalc2`, `axios`, `wake_on_lan`, `request` (veraltet)

Um andere Module zu verwenden, geben Sie den Namen (und die Version) des Moduls in der Instanzkonfiguration ein. ioBroker installiert das Modul. Sie können es anschließend anfordern und in Ihren Skripten verwenden.

### Konsole - Gibt die Nachricht ins Protokoll aus
Die Verwendung ist die gleiche wie in `javascript`

### Exec – führe einen Betriebssystembefehl aus, etwa `cp file1 file2`
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

Node.js verwendet /bin/sh, um Befehle auszuführen. Wenn Sie eine andere Shell verwenden möchten, können Sie das Optionsobjekt wie in [Node.js-Dokumentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) für child_process.exec beschrieben verwenden.
Es empfiehlt sich, immer vollständige Pfadnamen für Befehle zu verwenden, um sicherzustellen, dass der richtige Befehl ausgeführt wird.

**Hinweis:** Sie müssen die Option *Befehl „setObject“ aktivieren* aktivieren, um ihn aufzurufen.

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

**Hinweis:** `state` hieß früher `newState`. Das funktioniert immer noch.

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

Um den Auslöser festzulegen, können Sie folgende Parameter verwenden:

| Parameter | Typ/Wert | Beschreibung |
|-------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Logik | Zeichenfolge | „und“ oder „oder“-Logik zum Kombinieren der Bedingungen \(Standard: „und“\) |
|             |            |                                                                                                                                                     |
| ID | Zeichenfolge | ID ist gleich der angegebenen |
| | RegExp | ID mit regulärem Ausdruck abgeglichen |
| | Array | ID wurde mit einer Liste zulässiger IDs abgeglichen |
|             |            |                                                                                                                                                     |
| Name | Zeichenfolge | Name ist gleich dem angegebenen |
| | RegExp | Name stimmt mit regulärem Ausdruck überein |
| | Array | Name, der mit einer Liste zulässiger Namen übereinstimmt |
|             |            |                                                                                                                                                     |
| ändern | Zeichenfolge | „eq“, „ne“, „gt“, „ge“, „lt“, „le“, „any“ |
| | "eq" | (gleich) Der neue Wert muss dem alten entsprechen (state.val == oldState.val) |
| | "ne" | (ungleich) Der neue Wert darf nicht mit dem alten identisch sein (state.val != oldState.val) **Wenn das Muster eine ID-Zeichenfolge ist, wird standardmäßig dieser Wert verwendet** |
| | "gt" | (größer) Der neue Wert muss größer sein als der alte Wert (state.val > oldState.val) |
| | "ge" | (größer oder gleich) Der neue Wert muss größer oder gleich dem alten sein (state.val >= oldState.val) |
| | "lt" | (kleiner) Der neue Wert muss kleiner sein als der alte (state.val < oldState.val) |
| | "le" | (kleiner oder gleich) Der neue Wert muss kleiner oder gleich dem alten Wert sein (state.val <= oldState.val) |
| | "any" | Trigger wird ausgelöst, wenn gerade der neue Wert kommt |
|             |            |                                                                                                                                                     |
| val | gemischt | Neuer Wert muss gleich dem angegebenen sein |
| valNe | gemischt | Neuer Wert darf nicht gleich dem angegebenen sein |
| valGt | gemischt | Neuer Wert muss größer als vorgegeben sein |
| valGe | gemischt | Der neue Wert muss größer oder gleich dem angegebenen sein |
| valLt | gemischt | Neuer Wert muss kleiner als vorgegeben sein |
| valLe | gemischt | Der neue Wert muss kleiner oder gleich dem angegebenen sein |
|             |            |                                                                                                                                                     |
| ack | boolean | Bestätigter Status des neuen Werts ist gleich dem angegebenen |
| q | Zahl | Der Qualitätscodestatus des neuen Werts ist gleich dem angegebenen. Sie können '*' zum Zuordnen zu jedem Code verwenden. **Wenn nicht angegeben, wird q = 0 als Muster festgelegt!** |
|             |            |                                                                                                                                                     |
| oldVal | gemischt | Vorheriger Wert muss mit dem angegebenen übereinstimmen |
| oldValNe | gemischt | Vorheriger Wert darf nicht mit dem angegebenen identisch sein |
| oldValGt | gemischt | Vorheriger Wert muss größer als der angegebene sein |
| oldValGe | gemischt | Der vorherige Wert muss größer oder gleich dem angegebenen sein |
| oldValLt | gemischt | Vorheriger Wert muss kleiner als der angegebene sein |
| oldValLe | gemischt | Vorheriger Wert muss kleiner oder gleich dem angegebenen sein |
|             |            |                                                                                                                                                     |
| oldAck | bool | Der bestätigte Status des vorherigen Werts ist gleich dem angegebenen |
| oldQ | Nummer | Der Qualitätscodestatus des vorherigen Wertes ist gleich dem angegebenen. Sie können '*' zum Zuordnen zu jedem Code verwenden |
|             |            |                                                                                                                                                     |
| ts | Zeichenfolge | Der Zeitstempel des neuen Werts muss mit dem angegebenen übereinstimmen (state.ts == ts) |
| tsGt | Zeichenfolge | Der Zeitstempel des neuen Werts darf nicht mit dem angegebenen übereinstimmen (state.ts != ts) |
| tsGe | Zeichenfolge | Der Zeitstempel des neuen Werts muss größer sein als der angegebene Wert (state.ts > ts) |
| tsLt | Zeichenfolge | Der Zeitstempel des neuen Werts muss größer oder gleich dem angegebenen sein (state.ts >= ts) |
| tsLe | Zeichenfolge | Der Zeitstempel des neuen Werts muss kleiner als der angegebene sein (state.ts < ts) |
|             |            |                                                                                                                                                     |
| oldTs | Zeichenfolge | Vorheriger Zeitstempel muss mit dem angegebenen übereinstimmen (oldState.ts == ts) |
| oldTsGt | Zeichenfolge | Vorheriger Zeitstempel darf nicht mit dem angegebenen übereinstimmen (oldState.ts != ts) |
| oldTsGe | Zeichenfolge | Vorheriger Zeitstempel muss größer als angegebener Wert sein (oldState.ts > ts) |
| oldTsLt | Zeichenfolge | Vorheriger Zeitstempel muss größer oder gleich dem angegebenen sein (oldState.ts >= ts) |
| oldTsLe | Zeichenfolge | Vorheriger Zeitstempel muss kleiner als der angegebene sein (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| lc | Zeichenfolge | Der Zeitstempel der letzten Änderung muss dem angegebenen Wert entsprechen (state.lc == lc) |
| lcGt | Zeichenfolge | Der Zeitstempel der letzten Änderung darf nicht mit dem angegebenen übereinstimmen (state.lc != lc) |
| lcGe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer sein als der angegebene Wert (state.lc > lc) |
| lcLt | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer oder gleich dem angegebenen sein (state.lc >= lc) |
| lcLe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss kleiner als der angegebene sein (state.lc < lc) |
|             |            |                                                                                                                                                     |
| oldLc | Zeichenfolge | Der Zeitstempel der letzten Änderung muss mit dem angegebenen übereinstimmen (oldState.lc == lc) |
| oldLcGt | Zeichenfolge | Der Zeitstempel der letzten Änderung darf nicht mit dem angegebenen übereinstimmen (oldState.lc != lc) |
| oldLcGe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer sein als der angegebene Wert (oldState.lc > lc) |
| oldLcLt | Zeichenfolge | Der Zeitstempel der letzten Änderung muss größer oder gleich dem angegebenen sein (oldState.lc >= lc) |
| oldLcLe | Zeichenfolge | Der Zeitstempel der letzten Änderung muss kleiner sein als der angegebene (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| channelId | Zeichenfolge | Die Kanal-ID muss mit der angegebenen übereinstimmen |
| | RegExp | Kanal-ID stimmt mit regulärem Ausdruck überein |
| | Array | Kanal-ID stimmt mit einer Liste zulässiger Kanal-IDs überein |
|             |            |                                                                                                                                                     |
| Kanalname | Zeichenfolge | Der Kanalname muss dem angegebenen entsprechen |
| | RegExp | Kanalname stimmt mit regulärem Ausdruck überein |
| | Array | Kanalname stimmt mit einer Liste zulässiger Kanalnamen überein |
|             |            |                                                                                                                                                     |
| Geräte-ID | Zeichenfolge | Die Geräte-ID muss mit der angegebenen übereinstimmen |
| | RegExp | Geräte-ID mit regulärem Ausdruck abgeglichen |
| | Array | Geräte-ID mit einer Liste zulässiger Geräte-IDs abgeglichen |
|             |            |                                                                                                                                                     |
| Gerätename | Zeichenfolge | Der Gerätename muss mit dem angegebenen übereinstimmen |
| | RegExp | Gerätename stimmt mit regulärem Ausdruck überein |
| | Array | Gerätename stimmt mit einer Liste zulässiger Gerätenamen überein |
|             |            |                                                                                                                                                     |
| enumId | string | Status gehört zum angegebenen Enum |
| | RegExp | Eine Enumerations-ID des Staates erfüllt den angegebenen regulären Ausdruck |
| | Array | Eine Enumerations-ID des Staates befindet sich in der angegebenen Liste von Enumerations-IDs |
|             |            |                                                                                                                                                     |
| Enumerationsname | Zeichenfolge | Der Status gehört zur angegebenen Enumeration |
| | RegExp | Ein Enumerationsname des Staates erfüllt den angegebenen regulären Ausdruck |
| | Array | Ein Enumerationsname des Staates ist in der angegebenen Liste von Enumerationsnamen |
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
| | RegExp | Der alte Wert stammt von einem Adapter, der dem regulären Ausdruck entspricht |
| | Array | Der alte Wert stammt von einem Adapter, der in der angegebenen Liste zulässiger Adapter erscheint |
|             |            |                                                                                                                                                     |
| oldFromNe | Zeichenfolge | Alter Wert stammt nicht vom definierten Adapter |
| | RegExp | Der alte Wert stammt nicht von einem Adapter, der dem regulären Ausdruck entspricht |
| | Array | Der alte Wert stammt nicht von einem Adapter, der in der angegebenen Liste verbotener Adapter erscheint |

Beispiele: Triggern auf alle Zustände mit der ID `'*.STATE'`, wenn diese bestätigt sind und den neuen Wert `true` haben.

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

Um zwei Zustände einfach miteinander zu verbinden, schreibt man:

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

Die Funktion `on` gibt den Handler zurück. Dieser Handler kann durch Abbestellen verwendet werden.

*Hinweis:* Standardmäßig werden nur Zustände mit der Qualität 0x00 an die Callback-Funktion übergeben. Wenn Sie alle Ereignisse erhalten möchten, fügen Sie der Musterstruktur `{q: '*'}` hinzu.

*Hinweis:* Bitte beachten Sie, dass „change“ standardmäßig gleich „any“ ist, außer wenn nur die ID als Zeichenfolge festgelegt ist (wie `on('id', () => {});`). In letzterem Fall wird „change“ auf „ne“ festgelegt.

*Hinweis:* Wenn Sie auch Statuslöschungen/-abläufe als Auslöser erhalten möchten, müssen Sie „change“ mit `ne` oder `any` UND q mit `*` als Filter verwenden!

*Hinweis:* Ab 4.3.2 ist es möglich, einen Triggertyp als zweiten Parameter anzugeben: `on('my.id.0', 'any', obj => log(obj.state.val));`

### Einmal
Registriert ein einmaliges Abonnement, welches nach dem ersten Aufruf automatisch gekündigt wird. Wie [An](#on---subscribe-on-changes-or-updates-of-some-state), wird aber nur einmal ausgeführt.

```js
once(pattern, callback);
```

### Abonnieren – dasselbe wie **[An](#on---subscribe-on-changes-or-updates-of-some-state)**
### Abbestellen
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Entfernt alle Abonnements für die angegebene Objekt-ID oder den angegebenen Handler.

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

- `zweite`
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

Wenn Start- oder Endzeiten für einen Zeitplan benötigt werden, kann dies auch mithilfe eines Objekts umgesetzt werden. In diesem Szenario hat das Objekt die Eigenschaften:

- `Start`
- `Ende`
- `Regel`

Start und Ende definieren ein Datumsobjekt, einen Datumsstring oder eine Anzahl von Millisekunden seit dem 01. Januar 1970 00:00:00 UTC.
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
Astro-Funktion kann über das Attribut „Astro“ genutzt werden:

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

Das Attribut „shift“ ist der Versatz in Minuten. Es kann auch negativ sein, um die Zeit vor einem Astroereignis zu definieren.

Die folgenden Werte können als Attribut in der Astrofunktion verwendet werden:

- „Sonnenaufgang“: Sonnenaufgang (Oberkante der Sonne erscheint am Horizont)
- „sunriseEnd“: Sonnenaufgang endet (Unterkante der Sonne berührt den Horizont)
- „goldenHourEnd“: die goldene Stunde am Morgen (weiches Licht, die beste Zeit zum Fotografieren) endet
- „solarNoon“: Sonnenmittag (Sonne steht am höchsten)
- „goldenHour“: Beginn der goldenen Stunde am Abend
- „sunsetStart“: Sonnenuntergang beginnt (Unterkante der Sonne berührt den Horizont)
- „Sonnenuntergang“: Sonnenuntergang (die Sonne verschwindet unter dem Horizont, die bürgerliche Abenddämmerung beginnt)
- „Dusk“: Dämmerung (Beginn der abendlichen nautischen Dämmerung)
- „nauticalDusk“: nautische Dämmerung (Beginn der abendlichen astronomischen Dämmerung)
- „Nacht“: die Nacht beginnt (dunkel genug für astronomische Beobachtungen)
- „nightEnd“: die Nacht endet (die astronomische Morgendämmerung beginnt)
- „nauticalDawn“: nautische Morgendämmerung (Beginn der morgendlichen nautischen Dämmerung)
- „Dawn“: Morgendämmerung (die morgendliche nautische Dämmerung endet, die morgendliche bürgerliche Dämmerung beginnt)
- „Nadir“: Nadir (der dunkelste Moment der Nacht, die Sonne steht am tiefsten)

**Hinweis:** Um die „Astro“-Funktion zu verwenden, müssen „Breitengrad“ und „Längengrad“ in den Einstellungen des JavaScript-Adapters definiert werden.

**Hinweis:** An manchen Stellen kann es vorkommen, dass keine Nacht/NachtEnde vorhanden ist. Bitte lesen Sie dazu [Hier](https://github.com/mourner/suncalc/issues/70).

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

## ZeitplanById
```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

Ermöglicht das Erstellen eines Zeitplans basierend auf einem Statuswert. Wenn sich der Statuswert ändert, wird der alte Zeitplan gelöscht und automatisch ein neuer Zeitplan erstellt.

Unterstützte Formate:

- `[h]h:[m]m:ss` (z. B. `12:42:15`, `15:3:12`, `3:10:25`)
- `[h]h:[m]m` (z. B. `13:37`, `9:40`)

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

Beispiel: Status erstellen und Zeitplan für Änderungen registrieren:

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

Gibt die Liste aller CRON-Jobs und -Zeitpläne zurück (außer Astro).
Das Argument muss `true` sein, wenn Sie die Liste für **jedes laufende Skript** erhalten möchten. Andernfalls werden nur Zeitpläne im aktuellen Skript zurückgegeben.

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

### Zeitplan löschen
Wenn **keine** "Astro"-Funktion verwendet wird, kann der Zeitplan nachträglich abgebrochen werden. Hierzu muss das Zeitplanobjekt gespeichert werden:

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

Gibt ein JavaScript-Datumsobjekt für den angegebenen Astronamen zurück (z. B. `"sunrise"` oder `"sunriseEnd"`). Gültige Werte finden Sie in der Liste der zulässigen Werte im Abschnitt [Astro](#astro--function) in der Funktion *Schedule*.

Das zurückgegebene Date-Objekt wird für das übergebene *Datum* berechnet. Wenn kein Datum angegeben ist, wird das aktuelle Datum verwendet.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Hinweis: Abhängig von Ihrem geografischen Standort kann es Fälle geben, in denen z. B. „Nacht“/„Nachtende“ zu bestimmten Zeitpunkten nicht existieren (z. B. Standorte im Norden jedes Jahr im Mai/Juni!**

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

Wenn `timeToCompare` nicht angegeben ist, wird die tatsächliche Uhrzeit verwendet.

Folgende Operationen sind möglich:

- `">"` - wenn die angegebene Zeit größer als `startTime` ist
- `">="` - wenn die angegebene Zeit größer oder gleich `startTime` ist
- `"<"` - wenn die angegebene Zeit kleiner ist als `startTime`
- `"<="` - wenn die angegebene Zeit kleiner oder gleich `startTime` ist
- `"=="` - wenn die angegebene Zeit gleich `startTime` ist
- `"<>"` - wenn die angegebene Zeit ungleich `startTime` ist
- „between“ – wenn die angegebene Zeit zwischen „startTime“ und „endTime“ liegt.
- „nicht zwischen“ – wenn die angegebene Zeit nicht zwischen „Startzeit“ und „Endzeit“ liegt.

Die Zeit kann ein Datumsobjekt oder ein Datum mit Zeit oder nur die Zeit sein.

Für die Zeitdefinition können Astronamen verwendet werden. Alle 3 Parameter können als Astrozeit eingestellt werden.
Folgende Werte sind möglich: `sunrise`, `sunset`, `sunriseEnd`, `sunsetStart`, `dawn`, `dusk`, `nauticalDawn`, `nauticalDusk`, `nightEnd`, `night`, `goldenHourEnd`, `goldenHour`.
Siehe [Astro](#astro--function) für Details.

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

### SetzeStatus
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
Kurz:

- `ack` = `false` : Das Skript möchte einen Befehl senden, der vom Zielgerät/Adapter ausgeführt werden soll
- „ack“ = „true“: Der Befehl wurde erfolgreich ausgeführt und der Status wird als positives Ergebnis aktualisiert.

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

Wie setState, aber mit `promise`.

### SetStateDelayed
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

Dasselbe wie setState, aber mit Verzögerung in Millisekunden. Sie können alle laufenden Verzögerungen für diese ID löschen (standardmäßig). Z. B.

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

Wie setState, aber Wert nur setzen, wenn sich der Wert wirklich geändert hat.

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

Dies ist ein synchroner Aufruf und Sie erhalten die Liste aller laufenden Timer (setStateDelayed) für diese ID.
Sie können diese Funktion ohne ID aufrufen und Timer für alle IDs abrufen.
Falls Sie diese Funktion für eine bestimmte Objekt-ID aufrufen, erhalten Sie die folgende Antwort:

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

Sie können direkt nach TimerId fragen. In diesem Fall lautet die Antwort:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### Status abrufen
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

Wenn der Status nicht vorhanden ist, wird eine Warnung in die Protokolle gedruckt und das Objekt `{ val: null, notExist: true }` zurückgegeben.
Um die Warnung zu unterdrücken, prüfen Sie, ob der Status vorhanden ist, bevor Sie getState aufrufen (siehe [existiertZustand](#existsState)).

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

Wie getState, aber mit `promise`.

### ExistiertZustand
```js
existsState(id, (err, isExists) => {});
```

Wenn die Option „Beim Start nicht alle Zustände abonnieren“ deaktiviert ist, kann ein einfacherer Aufruf verwendet werden:

```js
existsState(id)
```

die Funktion gibt in diesem Fall true oder false zurück.

Überprüfen Sie, ob ein Status vorhanden ist.

### Objekt abrufen
```js
getObject(id, enumName);
```

Beschreibung der Objekt-ID abrufen, wie sie in einem System gespeichert ist.
Sie können den Enumerationsnamen angeben. Wenn dieser definiert ist, werden dem Ergebnis zwei zusätzliche Attribute hinzugefügt: enumIds und enumNames.
Diese Arrays enthalten alle Enumerationen, bei denen die ID ein Mitglied ist. Beispiel:

```js
getObject('adapter.N.objectName', 'rooms');
```

gibt in enumIds alle Räume zurück, in denen das angeforderte Objekt Mitglied ist. Sie können "true" als enumName definieren, um *alle* Enumerationen zurück zu erhalten.

### Objekt festlegen
```js
setObject(id, obj, callback);
```

Schreibt ein Objekt in die Datenbank. Dieser Befehl kann in den Adaptereinstellungen deaktiviert werden. Verwenden Sie diese Funktion mit Vorsicht, da die globalen Einstellungen beschädigt werden können.

Sie sollten es verwenden, um ein vorhandenes Objekt zu **ändern**, das Sie vorher gelesen haben, zB:

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

Wenn die Option "Nicht alle Zustände beim Start abonnieren" deaktiviert ist, kann man auch einen einfacheren Aufruf verwenden:

```js
existsObject(id)
```

die Funktion gibt in diesem Fall true oder false zurück.

Überprüfen Sie, ob ein Objekt vorhanden ist.

### Objekt erweitern
```js
extendObject(id, obj, callback);
```

Es ist fast dasselbe wie `setObject`, aber zuerst liest es das Objekt und versucht, alle Einstellungen zusammenzuführen.

Verwenden Sie es wie folgt:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### Objekt löschen
```js
deleteObject(id, isRecursive, callback);
```

Löscht ein Objekt anhand der ID aus der Datenbank. Wenn das Objekt den Typ `state` hat, wird auch der Statuswert gelöscht.

Der zusätzliche Parameter `isRecursive` könnte angegeben werden, sodass alle untergeordneten Elemente der angegebenen ID gelöscht werden. Sehr gefährlich!

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
Wenn es mehr als ein Objekt mit diesem Namen gibt, ist das Ergebnis ein Array.
Wenn das Flag `alwaysArray` gesetzt ist, ist das Ergebnis immer ein Array, wenn eine ID gefunden wird.

### GetEnums
```js
getEnums(enumName);
```

Holen Sie sich die Liste der vorhandenen Aufzählungen mit Mitgliedern, wie:

```js
getEnums('rooms');

// returns:
[
    {
        "id":"enum.rooms.LivingRoom",
        "members":["hm-rpc.0.JEQ0024123.1","hm-rpc.0.BidCoS-RF.4"],
        "name": "Living room"
    },
    {
        "id":"enum.rooms.Bath",
        "members":["hm-rpc.0.JEQ0024124.1","hm-rpc.0.BidCoS-RF.5"],
        "name": "Bath"
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
- „name“: Name des Status ohne Namespace, zB „mystate“
- `initialValue`: Variable kann nach Erstellung initialisiert werden. Wert „undefined“ bedeutet, Wert nicht initialisieren.
- „forceCreation“: Status erstellen/überschreiben, unabhängig davon, ob der Status bereits existiert oder nicht.
- „common“: allgemeine Beschreibung des Objekts, siehe Beschreibung [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
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

Es ist ein Kurztyp von createState möglich:

- `createState('myDatapoint')` - erstellt einfach einen Datenpunkt, wenn er nicht existiert
- `createState('myDatapoint', 1)` - Datenpunkt erstellen, falls er nicht existiert und mit dem Wert 1 initialisieren
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` – mit allgemeinen Definitionen wie Typ, Lesen, Schreiben und Rolle
- `createState('myDatapoint', { name: 'Mein eigener Datenpunkt', unit: '°C' }, () => { log('erstellt'); });`
- `createState('myDatapoint', 1, { name: 'Mein eigener Datenpunkt', unit: '°C' })` - Datenpunkt erstellen, wenn er nicht mit spezifischem Namen und Einheiten existiert

### CreateStateAsync
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

Dasselbe wie `createState`, aber das Versprechen wird zurückgegeben.

### Status löschen
```js
deleteState(name, callback);
```

Status und Objekt im Javascript-Bereich löschen, z.B. `javascript.0.mystate`. Status von anderen Adaptern können nicht gelöscht werden.

```js
deleteState('myDatapoint')
```

Löschen Sie einfach den Datenpunkt, falls vorhanden.

### DeleteStateAsync
```js
await deleteStateAsync(name);
```

Wie `deleteState`, aber das Versprechen wird zurückgegeben.

### Alias erstellen
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Erstellen Sie einen Alias im Bereich `alias.0`, falls dieser nicht existiert, z. B. `javascript.0.myalias`, und verweisen Sie auf einen Status oder Lese-/Schreibstatus.
Die gemeinsame Definition wird aus dem gelesenen Alias-ID-Objekt übernommen, aber eine bereitgestellte gemeinsame Definition hat Vorrang.

#### Parameter:
- `name`: ID des neuen Alias-Status (möglich ohne Alias-Namespace), zB `test.mystate` (Namespace `alias.0.` wird hinzugefügt = `alias.0.test.mystate`)
- `alias`: kann entweder eine vorhandene Status-ID als Zeichenfolge oder ein Objekt mit vollständiger Alias-Definition einschließlich Lese-/Schreib-IDs und Lese-/Schreibfunktionen sein. Hinweis: Alias-Definitionen können nicht als Teil des gemeinsamen Parameters festgelegt werden!
- „forceCreation“: Alias erstellen/überschreiben, unabhängig davon, ob der Status bereits existiert oder nicht.
- `common`: allgemeine Beschreibung des Alias-Objekts, siehe Beschreibung [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state). Die hier angegebenen Werte haben Vorrang vor der allgemeinen Definition des gelesenen Alias-ID-Objekts. Hinweis: Alias-Definitionen können nicht als Teil dieses allgemeinen Parameters festgelegt werden, siehe Alias-Parameter!
- „native“: native Beschreibung eines Objekts. Alle spezifischen Informationen.
- „Callback“: wird aufgerufen, nachdem der Status erstellt und initialisiert wurde.

Es ist eine Kurzform von createAlias möglich:

- `createAlias('myAlias', 'myDatapoint')` - erstellt einfach alias.0.myAlias, das auf javascript.X.myDatapoint verweist, wenn es nicht existiert
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - erstellt Alias und Referenz für verschiedene Lese-/Schreibzustände

Weitere Einzelheiten finden Sie unter „createState“, es ist ähnlich.

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

Senden Sie eine Nachricht an die Controllerinstanz.

Die folgenden Befehle werden unterstützt:

- `"cmdExec"`
- `"getRepository"`
- `"getInstalled"`
- `"getVersion"`
- `"getDiagData"`
- `"getLocationOnDisk"`
- `"getDevList"`
- `"getLogs"`
- `"getHostInfo"`

Es handelt sich eher um spezifische Befehle, die nicht oft benötigt werden.

Beispiel:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Hinweis:** Sie müssen die Option *Befehl „setObject“ aktivieren* aktivieren, um ihn aufzurufen.

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

Wie sendToHost, aber mit `promise`.

### Intervall festlegen
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

Gleich wie Javascript `setInterval`.

### Intervall löschen
```js
clearInterval(id);
```

Gleich wie Javascript `clearInterval`.

### Zeitüberschreitung festlegen
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

Gleich wie Javascript `setTimeout`.

### Zeitüberschreitung löschen
```js
clearTimeout(id);
```

Gleich wie Javascript `clearTimeout`.

### Sofort festlegen
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

Gleich wie JavaScript `setImmediate` und fast dasselbe wie `setTimeout(callback, 0, arg1, arg2, arg3, arg4)`, aber mit höherer Priorität.

### FormatDate
```js
formatDate(millisecondsOrDate, format);
```

#### Parameter:
- `millisecondsOrDate`: Anzahl der Millisekunden aus state.ts oder state.lc (Anzahl der Millisekunden vom 01.01.1970 00:00:00) oder Javascript *new Date()*-Objekt oder Anzahl der Millisekunden aus *(new Date().getTime())*
- `format`: Kann `null` sein, dann wird das Systemzeitformat verwendet, andernfalls

* YYYY, JJJJ, ГГГГ – vollständiges Jahr, z. B. 2015
* YY, JJ, ГГ - kurzes Jahr, zB 15
* MM, ММ (kyrillisch) – vollständiger Monat, z. B. 01
* M, М (kyrillisch) - kurzer Monat, z. B. 1
* TT, TT, ДД - ganzer Tag, zB 02
* D, T, Ä - kurzer Tag, z. B. 2
* hh, SS, чч – volle Stunden, zB 03
* h, S, ч - kurze Stunden, zB 3
* mm, мм(kyrillisch) – volle Minuten, zB 04
* m, м (kyrillisch) – kurze Minuten, z. B. 4
* ss, сс (kyrillisch) – volle Sekunden, zB 05
* s, с (kyrillisch) – kurze Sekunden, z. B. 5
* sss, ссс(kyrillisch) - Millisekunden
* WW, НН(kyrillisch) - ganzer Wochentag als Text
* W, Н (kyrillisch) - kurzer Wochentag als Text
* OO, ОО (kyrillisch) – vollständiger Monat als Text
* OOO, ООО (kyrillisch) - ganzer Monat als Text im Genitiv
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
- „Millisekunden“: Differenz in Millisekunden*
- `format`: Kann `null` sein, daher wird das Format `hh:mm:ss` verwendet, andernfalls

* TT, TT, ДД – ganzer Tag, zB „02“
* D, T, Д - kurzer Tag, z. B. „2“
* hh, SS, чч – volle Stunden, zB „03“
* h, S, ч – kurze Stunden, zB „3“
* mm, мм(kyrillisch) – volle Minuten, zB „04“
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

Wandelt eine Zeichenfolge oder Zahl in ein Datumsobjekt um.
Wenn nur Stunden angegeben sind, wird das aktuelle Datum hinzugefügt und eine Konvertierung versucht.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### Formatwert
```js
formatValue(value, decimals, format);
```

Formatiert jeden Wert (auch Zeichenfolgen) in eine Zahl. Ersetzt Punkt durch Komma, wenn im System konfiguriert.
Dezimalstellen geben Ziffern nach dem Komma an. Der Standardwert ist 2.
Format ist optional:

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### AdapterAbonnieren
```js
adapterSubscribe(id);
```

Senden Sie an einen Adapter die Nachricht „subscribe“, um den Adapter zu informieren. Wenn der Adapter das allgemeine Flag „subscribeable“ hat, wird diese Funktion bei der Funktion „subscribe“ automatisch aufgerufen.

### AdapterAbmelden
```js
adapterUnsubscribe(id);
```

Sendet an einen Adapter die Nachricht `unsubscribe`, um den Adapter mitzuteilen, dass die Werte nicht abgefragt werden sollen.

### $ - Selektor
```js
$(selector).on(function(obj) {});
$(selector).toArray(); // Requires version >= 8.2.0
$(selector).each(function(id, i) {});
$(selector).setState(value, ack);
$(selector).getState();
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

- „$('state[id=*.STATE]')“ oder „$('state[state.id=*.STATE]')“ oder „$('*.STATE')“ – wählt alle Staaten aus, deren ID mit „.STATE“ endet.
- `$('state[id='hm-rpc.0.*]')` oder `$('hm-rpc.0.*')` - gibt alle Zustände der Adapterinstanz hm-rpc.0 zurück
- `$('channel(rooms=Wohnzimmer)')` - alle Zustände im Raum "Wohnzimmer"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Alle Rollläden von Homematic abrufen
- `$('channel[role=switch](rooms=Wohnzimmer)[state.id=*.STATE]').setState(false)` - Alle Zustände mit .STATE von Kanälen mit der Rolle „switch“ im „Wohnzimmer“ auf „false“ umschalten
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - alle Zustände der Aufzählung „Windows“ im Protokoll ausgeben
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` – druckt alle Zeitpläne mit 65 am Ende
- `$('.switch §"Wohnzimmer")` - Zustände mit allen Schaltern im 'Wohnzimmer' übernehmen ***(nicht implementiert – sollte besprochen werden)***
- `$('channel .switch §"Wohnzimmer")` - Zustände mit allen Schaltern im 'Wohnzimmer' annehmen ***(nicht implementiert – sollte besprochen werden)***

***Erklärung*** Werfen wir einen Blick auf:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Dieser Code sucht in Kanälen.
Finden Sie alle Kanäle mit `common.role="switch"` und gehören zu `enum.rooms.Wohnzimmer`.
Nehmen Sie alle ihre Zustände, deren ID mit `".STATE"` endet, und abonnieren Sie alle diese Zustände.
Wenn sich einige dieser Zustände ändern, wird der Rückruf wie bei der Funktion „on“ aufgerufen.

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
Datei aus DB aus Ordner `javascript.0` lesen.

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

Der optionale Fehlercode wird im Rückruf zurückgegeben. Das Argument *Adapter* kann weggelassen werden.
fileName ist der Name der Datei in der Datenbank. Alle Dateien werden im Ordner „javascript“ gespeichert.
Wenn Sie in andere Ordner schreiben möchten, z. B. in „/vis.0/“, verwenden Sie dazu setFile.

Die Datei, die wie `'/subfolder/file.txt'` aussieht, wird unter `"/javascript/subfolder/file.txt"` gespeichert und kann über den Webserver mit `"http://ip:8082/javascript/subfolder/file.txt"` abgerufen werden.

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

Datei oder Verzeichnis löschen. Dateiname ist der Name der Datei oder des Verzeichnisses in der Datenbank.

Der alternative Name dieser Methode ist `unlink`

### Datei umbenennen
```js
renameFile(adapter, oldName, newName, (error) => {});
```

Datei oder Verzeichnis umbenennen. „oldName“ ist der Name der Datei oder des Verzeichnisses in der Datenbank und wird in „newName“ umbenannt.

Der alternative Name dieser Methode ist `rename`

### Aktenkundig
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Dateiänderungen abonnieren:

- „id“ ist die ID eines Objekts vom Typ „Meta“, wie „vis.0“
- „fileName“ ist ein Dateiname oder ein Muster, wie „main/*“ oder „main/vis-view.json“.
- „withFile“, ob der Inhalt der Datei im Rückruf übermittelt werden soll oder nicht. Die Übermittlung von Dateiinhalten kostet Speicher und Zeit. Wenn Sie also nur über Änderungen informiert werden möchten, setzen Sie „withFile“ auf „false“.

Argumente im Rückruf:

- „id“ – ID des „Meta“-Objekts;
- „fileName“ – Dateiname (nicht Muster);
- „Größe“ – neue Dateigröße;
- „fileData“ – Dateiinhalt vom Typ „Buffer“, wenn die Datei binär (anhand der Erweiterung erkannt) oder „String“ ist. Wird nur geliefert, wenn „withFile“;
- `mimeType` – MIME-Typ der Datei, z. B. `image/jpeg`. Wird nur übermittelt, wenn `withFile`;

**Wichtig**: Diese Funktion ist nur mit js-controller@4.1.x oder neuer verfügbar.

### AusDatei
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Abbestellen von Dateiänderungen:

- „id“ ist die ID eines Objekts vom Typ „Meta“, wie „vis.0“
- „fileName“ ist ein Dateiname oder ein Muster, wie „main/*“ oder „main/vis-view.json“.

**Wichtig**: Diese Funktion ist nur mit js-controller@4.1.x oder neuer verfügbar.

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

`timeout` beträgt standardmäßig 1000 ms.

### GetHistory
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Verlauf aus angegebener Instanz lesen. Wenn keine Instanz angegeben ist, wird die standardmäßige Verlaufsinstanz des Systems verwendet.

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

Mögliche Optionen finden Sie [Hier](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter).

Zusätzlich zu diesen Parametern müssen Sie „id“ angeben und Sie können ein Timeout angeben (Standard: 20000 ms).

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

Startet andere Skripte (und auch sich selbst) oder startet sie neu, und zwar anhand des Namens.

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

### StartSkript
```js
startScript('scriptName', ignoreIfStarted, callback);
```

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, wird nichts unternommen, wenn ein Skript bereits ausgeführt wird. Andernfalls wird das Skript neu gestartet.

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

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, wird nichts unternommen, wenn ein Skript bereits ausgeführt wird. Andernfalls wird das Skript neu gestartet.

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
Wie stopScript, aber mit `promise`:

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

### IstScriptActive
```js
isScriptActive('scriptName');
```

Gibt zurück, ob ein Skript aktiviert oder deaktiviert ist. Bitte beachten Sie, dass dies keine Auskunft darüber gibt, ob das Skript gerade ausgeführt wird oder nicht.
Das Skript kann beendet, aber dennoch aktiviert sein.

Es handelt sich nicht um eine Funktion. Es handelt sich um eine Variable mit einer JavaScript-Instanz, die im Gültigkeitsbereich des Skripts sichtbar ist.

### ZuInt
### Schweben
### ZuBoolean
### JsonataAusdruck
### Warten
Unterbrechen Sie einfach die Ausführung des Skripts.
Achtung, diese Funktion ist `promise` und muss wie folgt aufgerufen werden:

```js
await wait(1000);
```

### Schlafen
Das Gleiche wie [Warten](#wait)

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

### Nachricht an Async
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

Abonniert den Message Bus des JavaScript-Adapters und liefert die Antwort per Rückruf.
Die Antwort des Skripts, das als erstes eine Antwort sendet, wird als Antwort akzeptiert, alle anderen Antworten werden ignoriert.

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

Um eine Nachricht über die CLI zu senden, verwenden Sie

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

Hiermit kündigen Sie das Abonnement dieser Nachricht.

### Beim Anmelden
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Abonnieren Sie Protokolle mit angegebenem Schweregrad.

*Wichtig:* Um Endlosschleifen zu vermeiden, können Sie Protokolle nicht mit derselben Schwere im Handler ausgeben.

Dies führt beispielsweise dazu, dass keine Protokolle erstellt werden:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Um alle Logs zu empfangen, kann `*` verwendet werden. In diesem Fall wird die Logausgabe im Handler komplett deaktiviert.

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

- „timeout“ (Zahl) – Zeitüberschreitung in Millisekunden
- `responseType` (Zeichenfolge) - Unterstützte Werte sind `text` (Standard) oder `arraybuffer` für Binärdaten in der Antwort
- „basicAuth“ (Objekt) – Grundlegende HTTP-Authentifizierungsdaten. z. B. „{ Benutzer: „admin“, Passwort: „iobroker“ }“
- `bearerAuth` (Zeichenfolge) – Token für die Trägerauthentifizierung
- „headers“ (Objekt) – Zusätzliche benutzerdefinierte HTTP-Header, z. B. „{ „Accept-Language“: „en-GB,en;q=0.9“ }“
- `validateCertificate` (Boolesch) - Lässt selbstsignierte Zertifikate zu, wenn `false`

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

Zertifikatsüberprüfung deaktivieren - *Erfordert Version >= 8.4.0*

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

### TempDatei erstellen
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
onFile('0_userdata.0', 'test.jpg', true, async (id, fileName, size, data, mimeType) => {
    const tempFilePath = createTempFile(fileName, response.data);

    // Use the new path in other scripts (e.g. sendTo)
});
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

### Standarddatenverzeichnis
`defaultDataDir` – Absoluter Pfad zu den Iobroker-Daten.

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

## Option - „Beim Start nicht alle Zustände abonnieren“
Es gibt zwei Arten, Zustände zu abonnieren:

- Der Adapter abonniert alle Änderungen beim Start und empfängt alle Änderungen aller Zustände (es ist einfach, getStates(id) zu verwenden, erfordert aber mehr CPU und RAM):

```js
log(getState('someID').val);
```

- Der Adapter abonniert jedes Mal die angegebene ID, wenn "on/subscribe" aufgerufen wird. In diesem Modus empfängt der Adapter nur Updates für gewünschte Zustände.

Es ist sehr leistungsstark und RAM-effizient, aber Sie können in getState nicht direkt auf Zustände zugreifen. Sie müssen Callback verwenden, um das Ergebnis des Zustands abzurufen:

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Dies liegt daran, dass der Adapter den Statuswert nicht im RAM hat und die zentrale Datenbank nach dem Wert fragen muss.

## Skriptaktivität
Es besteht die Möglichkeit, Skripte über Zustände zu aktivieren und zu deaktivieren. Für jedes Skript wird ein Zustand mit dem Namen `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME` angelegt.
Skripte können aktiviert und deaktiviert werden, indem dieser Zustand mit `ack=false` gesteuert wird.