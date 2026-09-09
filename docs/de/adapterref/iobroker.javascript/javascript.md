---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.javascript/javascript.md
title: kein Titel
hash: cz5JwxeKJXawetftdS4bm6ZXSVj9sdgtkltRgLEI9Q8=
---
## Inhalt

- [Notiz](#note)

- [Globale Funktionen](#global-functions)
  - [Bewährte Vorgehensweise](#best-practice)

- [Funktionen](#following-functions-can-be-used-in-scripts)
  - [require - ein Modul laden](#require---load-some-module)
  - [Konsole – Gibt die Nachricht im Protokoll aus](#console---gives-out-the-message-into-log)
  - [exec - einen Betriebssystembefehl ausführen, z. B. "cp Datei1 Datei2"](#exec---execute-some-os-command-like-cp-file1-file2)
  - [Abonnieren Sie Benachrichtigungen über Änderungen oder Aktualisierungen bestimmter Bundesstaaten.](#on---subscribe-on-changes-or-updates-of-some-state)
  - [einmal](#once)
  - [abonnieren – dasselbe wie auf](#subscribe---same-as-on)
  - [abbestellen](#unsubscribe)
  - [Abonnements abrufen](#getsubscriptions)
  - [getFileSubscriptions](#getfilesubscriptions)
  - [Zeitplan](#schedule)
    - [Zeitplan](#time-schedule)
    - [Astro-Funktion](#astro-function)
  - [scheduleById](#schedulebyid)
  - [getSchedules](#getschedules)
  - [Termin löschen](#clearschedule)
  - [getAttr](#getattr)
  - [getAstroDate](#getastrodate)
  - [ist AstroDay](#isastroday)
  - [Vergleichszeit](#comparetime)
  - [setState](#setstate)
  - [setStateAsync](#setstateasync)
  - [setStateDelayed](#setstatedelayed)
  - [clearStateDelayed](#clearstatedelayed)
  - [getStateDelayed](#getstatedelayed)
  - [getState](#getstate)
  - [getStateAsync](#getstateasync)
  - [existiertZustand](#existsState)
  - [getObject](#getobject)
  - [setObject](#setobject)
  - [existsObject](#existsObject)
  - [extendObject](#extendobject)
  - [deleteObject](#deleteobject)
  - [getIdByName](#getidbyname)
  - [getEnums](#getenums)
  - [createState](#createstate)
  - [createStateAsync](#createstateasync)
  - [deleteState](#deletestate)
  - [deleteStateAsync](#deletestateasync)
  - [senden an](#sendto)
  - [sendToAsync](#sendtoasync)
  - [sendToHost](#sendtohost)
  - [sendToHostAsync](#sendtohostasync)
  - [setInterval](#setinterval)
  - [clearInterval](#clearinterval)
  - [setTimeout](#settimeout)
  - [clearTimeout](#cleartimeout)
  - [setImmediate](#setImmediate)
  - [Datum formatieren](#formatdate)
  - [formatTimeDiff](#formattimediff)
  - [getDateObject](#getDateObject)
  - [formatValue](#formatvalue)
  - [adapterAbonnieren](#adaptersubscribe)
  - [adapterAbmelden](#adapterunsubscribe)
  - [$ - Selektor](#---selector)
  - [Datei lesen](#readfile)
  - [Datei schreiben](#writefile)
  - [delFile](#delFile)
  - [renameFile](#renameFile)
  - [onFile](#onFile)
  - [Datei aus](#offFile)
  - [onStop](#onstop)
  - [getHistory](#gethistory)
  - [runScript](#runscript)
  - [runScriptAsync](#runScriptAsync)
  - [startScript](#startscript)
  - [startScriptAsync](#startscriptasync)
  - [stopScript](#stopscript)
  - [stopScriptAsync](#stopScriptAsync)
  - [isScriptActive](#isscriptactive)
  - [Name](#scriptName)
  - [Beispiel](#instance)
  - [GEHEIMNISSE](#secrets)
  - [Nachricht an](#messageto)
  - [messageToAsync](#messagetoasync)
  - [onMessage](#onmessage)
  - [onMessageUnregister](#onmessageunregister)
  - [onLog](#onlog)
  - [onLogUnregister](#onlogunregister)
  - [Warten](#wait)
  - [schlafen](#sleep)
  - [httpGet](#httpget)
  - [httpPost](#httppost)
  - [temporäre Datei erstellen](#createtempfile)
  - [Registrierungsbenachrichtigung](#registerNotification)

- [Skriptaktivität](#scripts-activity)

- [Änderungsprotokoll](#changelog)

## Globale Funktionen

Sie können die globalen Skripte in der`global` Ordner. Alle globalen Skripte sind auf allen Instanzen verfügbar. Wenn ein globales Skript deaktiviert ist, wird es nicht verwendet. Globale Skripte werden einfach dem normalen Skript vorangestellt und kompiliert. Daher ist es nicht möglich, Daten zwischen Skripten über globale Skripte auszutauschen. Verwenden Sie hierfür Zustände.

Um globale Funktionen in TypeScript zu verwenden, müssen Sie`declare` Zuerst sollten sie dem Compiler bekannt sein, damit dieser die globalen Funktionen kennt. Beispiel:

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

#### Bewährte Vorgehensweise:

Erstellen Sie zwei Instanzen des JavaScript-Adapters: eine „Test“- und eine „Produktions“-Instanz. Nachdem das Skript in der „Test“-Instanz getestet wurde, kann es in die „Produktions“-Instanz verschoben werden. Dadurch können Sie die „Test“-Instanz nach Belieben neu starten.

## Folgende Funktionen können in Skripten verwendet werden:

### require - ein Modul laden

```js
const mod = require('module_name');
```

Folgende Module sind vorinstalliert:`node:dgram` ,`node:crypto` ,`node:dns` ,`node:events` ,`node:fs` ,`node:http` ,`node:https` ,`node:http2` ,`node:net` ,`node:os` ,`node:path` ,`node:util` ,`node:stream` ,`node:zlib` ,`suncalc2` ,`axios` ,`wake_on_lan` ,`request` (veraltet)

Um andere Module zu verwenden, geben Sie den Namen (und die Version) des Moduls in der Instanzkonfiguration an. ioBroker installiert das Modul. Anschließend können Sie es in Ihren Skripten einbinden und verwenden.

### Konsole – Gibt die Nachricht im Protokoll aus

Die Verwendung ist die gleiche wie in`javascript`

### exec - einen Betriebssystembefehl ausführen, zum Beispiel`cp file1 file2`

```js
exec(cmd, [options], callback);
```

Führe den Systembefehl aus und erhalte die Ausgaben.

```js
// Get the list of files and directories in /var/log
exec('ls /var/log', (error, stdout, stderr) => {
    log('stdout: ' + stdout);
});
```

Node.js verwendet \`/bin/sh\` zur Ausführung von Befehlen. Um eine andere Shell zu verwenden, können Sie das Optionsobjekt wie in der [Node.js-Dokumentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) für \`child\_process.exec\` beschrieben nutzen. Es empfiehlt sich, Befehle stets mit vollständigen Pfadnamen zu versehen, um sicherzustellen, dass der richtige Befehl ausgeführt wird.

**Hinweis:** Sie müssen die Option _"setObject" aktivieren, um den Befehl_ aufrufen zu können.

### Abonnieren Sie Benachrichtigungen über Änderungen oder Aktualisierungen bestimmter Bundesstaaten.

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

**Notiz:**`state` wurde zuvor genannt`newState` Das funktioniert immer noch.

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

Sie können die folgenden Parameter verwenden, um den Auslöser festzulegen:

| Parameter  | Typ/Wert        | Beschreibung                                                                                                                                                                                                    |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logik      | Zeichenkette    | "und"- oder "oder"-Logik zum Kombinieren der Bedingungen (Standard: "und")                                                                                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| Ausweis    | Zeichenkette    | Die ID entspricht der angegebenen ID.                                                                                                                                                                           |
|            | RegExp          | Die ID stimmte mit dem regulären Ausdruck überein.                                                                                                                                                              |
|            | Array           | Die ID stimmte mit einer Liste zulässiger IDs überein.                                                                                                                                                          |
|            |                 |                                                                                                                                                                                                                 |
| Name       | Zeichenkette    | Der Name entspricht dem angegebenen Namen.                                                                                                                                                                      |
|            | RegExp          | Name stimmt mit regulärem Ausdruck überein                                                                                                                                                                      |
|            | Array           | Der Name stimmte mit einer Liste zulässiger Namen überein.                                                                                                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| ändern     | Zeichenkette    | "eq", "ne", "gt", "ge", "lt", "le", "any"                                                                                                                                                                       |
|            | "eq"            | (gleich) Der neue Wert muss mit dem alten Wert übereinstimmen (state.val == oldState.val)                                                                                                                       |
|            | "ne"            | (ungleich) Der neue Wert darf nicht mit dem alten übereinstimmen (state.val != oldState.val). **Wenn das Muster eine ID-Zeichenkette ist, wird dieser Wert standardmäßig verwendet.**                           |
|            | "gt"            | (größer) Der neue Wert muss größer sein als der alte Wert (state.val > oldState.val)                                                                                                                            |
|            | "ge"            | (größer oder gleich) Der neue Wert muss größer oder gleich dem alten Wert sein (state.val >= oldState.val).                                                                                                     |
|            | "lt"            | (kleiner) Der neue Wert muss kleiner sein als der alte (state.val < oldState.val)                                                                                                                               |
|            | "le"            | (kleiner oder gleich) Der neue Wert muss kleiner oder gleich dem alten Wert sein (state.val <= oldState.val)                                                                                                    |
|            | "beliebig"      | Der Trigger wird ausgelöst, sobald der neue Wert eintrifft.                                                                                                                                                     |
|            |                 |                                                                                                                                                                                                                 |
| Wert       | gemischt        | Der neue Wert muss dem gegebenen Wert entsprechen.                                                                                                                                                              |
| valNe      | gemischt        | Der neue Wert darf nicht gleich dem gegebenen Wert sein.                                                                                                                                                        |
| valGt      | gemischt        | Der neue Wert muss größer sein als der bisherige Wert.                                                                                                                                                          |
| valGe      | gemischt        | Der neue Wert muss größer oder gleich dem gegebenen Wert sein.                                                                                                                                                  |
| valLt      | gemischt        | Der neue Wert muss kleiner sein als der bisherige Wert.                                                                                                                                                         |
| valLe      | gemischt        | Der neue Wert muss kleiner oder gleich dem gegebenen Wert sein.                                                                                                                                                 |
|            |                 |                                                                                                                                                                                                                 |
| ack        | boolescher Wert | Der anerkannte Zustand des neuen Wertes ist gleich dem gegebenen Wert.                                                                                                                                          |
| Q          | Nummer          | Der Qualitätscodestatus des neuen Werts entspricht dem angegebenen Wert. Sie können '\*' verwenden, um einen beliebigen Code abzugleichen. **Falls kein Wert angegeben wird, wird q = 0 als Muster verwendet!** |
|            |                 |                                                                                                                                                                                                                 |
| altes Tal  | gemischt        | Der vorherige Wert muss dem gegebenen Wert entsprechen.                                                                                                                                                         |
| oldValNe   | gemischt        | Der vorherige Wert darf nicht gleich dem gegebenen Wert sein.                                                                                                                                                   |
| oldValGt   | gemischt        | Der vorherige Wert muss größer sein als der gegebene Wert.                                                                                                                                                      |
| oldValGe   | gemischt        | Der vorherige Wert muss größer oder gleich dem gegebenen Wert sein.                                                                                                                                             |
| oldValLt   | gemischt        | Der vorherige Wert muss kleiner sein als der gegebene Wert.                                                                                                                                                     |
| altes Tal  | gemischt        | Der vorherige Wert muss kleiner oder gleich dem gegebenen Wert sein.                                                                                                                                            |
|            |                 |                                                                                                                                                                                                                 |
| oldAck     | bool            | Der bestätigte Zustand des vorherigen Wertes ist gleich dem gegebenen Wert.                                                                                                                                     |
| oldQ       | Nummer          | Der Qualitätscodestatus des vorherigen Werts entspricht dem aktuellen Wert. Sie können '\*' verwenden, um einen beliebigen Code zu finden.                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| ts         | Zeichenkette    | Der neue Zeitstempel muss mit dem vorgegebenen übereinstimmen (state.ts == ts).                                                                                                                                 |
| tsGt       | Zeichenkette    | Der neue Zeitstempel darf nicht mit dem gegebenen übereinstimmen (state.ts != ts).                                                                                                                              |
| tsGe       | Zeichenkette    | Der neue Wert des Zeitstempels muss größer als der vorgegebene Wert sein (state.ts > ts).                                                                                                                       |
| tsLt       | Zeichenkette    | Der neue Zeitstempel muss größer oder gleich dem vorgegebenen sein (state.ts >= ts).                                                                                                                            |
| tsLe       | Zeichenkette    | Der neue Zeitstempel muss kleiner sein als der vorgegebene (state.ts < ts).                                                                                                                                     |
|            |                 |                                                                                                                                                                                                                 |
| alte Ts    | Zeichenkette    | Der vorherige Zeitstempel muss mit dem gegebenen übereinstimmen (oldState.ts == ts).                                                                                                                            |
| oldTsGt    | Zeichenkette    | Der vorherige Zeitstempel darf nicht mit dem aktuellen übereinstimmen (oldState.ts != ts).                                                                                                                      |
| oldTsGe    | Zeichenkette    | Der vorherige Zeitstempel muss größer als der angegebene Wert sein (oldState.ts > ts).                                                                                                                          |
| oldTsLt    | Zeichenkette    | Der vorherige Zeitstempel muss größer oder gleich dem angegebenen sein (oldState.ts >= ts).                                                                                                                     |
| oldTsLe    | Zeichenkette    | Der vorherige Zeitstempel muss kleiner sein als der angegebene (oldState.ts < ts).                                                                                                                              |
|            |                 |                                                                                                                                                                                                                 |
| lc         | Zeichenkette    | Der Zeitstempel der letzten Änderung muss mit dem angegebenen übereinstimmen (state.lc == lc).                                                                                                                  |
| lcGt       | Zeichenkette    | Der Zeitstempel der letzten Änderung darf nicht mit dem angegebenen übereinstimmen (state.lc != lc).                                                                                                            |
| lcGe       | Zeichenkette    | Der Zeitstempel der letzten Änderung muss größer als der angegebene Wert sein (state.lc > lc).                                                                                                                  |
| lcLt       | Zeichenkette    | Der Zeitstempel der letzten Änderung muss größer oder gleich dem angegebenen Wert sein (state.lc >= lc).                                                                                                        |
| lcLe       | Zeichenkette    | Der Zeitstempel der letzten Änderung muss kleiner sein als der angegebene (state.lc < lc).                                                                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| oldLc      | Zeichenkette    | Der Zeitstempel der letzten Änderung der vorherigen Version muss mit dem angegebenen übereinstimmen (oldState.lc == lc).                                                                                        |
| oldLcGt    | Zeichenkette    | Der Zeitstempel der letzten Änderung vor dem aktuellen Zeitpunkt darf nicht mit dem aktuellen übereinstimmen (oldState.lc != lc).                                                                               |
| oldLcGe    | Zeichenkette    | Der Zeitstempel der letzten Änderung des vorherigen Zustands muss größer als der angegebene Wert sein (oldState.lc > lc).                                                                                       |
| oldLcLt    | Zeichenkette    | Der Zeitstempel der letzten Änderung vor dem vorherigen Zeitpunkt muss größer oder gleich dem angegebenen Zeitstempel sein (oldState.lc >= lc).                                                                 |
| oldLcLe    | Zeichenkette    | Der Zeitstempel der letzten Änderung des vorherigen Zustands muss kleiner sein als der angegebene (oldState.lc < lc).                                                                                           |
|            |                 |                                                                                                                                                                                                                 |
| Kanal-ID   | Zeichenkette    | Die Kanal-ID muss mit der angegebenen übereinstimmen.                                                                                                                                                           |
|            | RegExp          | Kanal-ID stimmte mit regulärem Ausdruck überein                                                                                                                                                                 |
|            | Array           | Die Kanal-ID wurde mit einer Liste zulässiger Kanal-IDs abgeglichen.                                                                                                                                            |
|            |                 |                                                                                                                                                                                                                 |
| Kanalname  | Zeichenkette    | Der Kanalname muss mit dem angegebenen übereinstimmen.                                                                                                                                                          |
|            | RegExp          | Kanalname stimmte mit regulärem Ausdruck überein                                                                                                                                                                |
|            | Array           | Der Kanalname stimmte mit einer Liste zulässiger Kanalnamen überein.                                                                                                                                            |
|            |                 |                                                                                                                                                                                                                 |
| Geräte-ID  | Zeichenkette    | Die Geräte-ID muss mit der angegebenen übereinstimmen.                                                                                                                                                          |
|            | RegExp          | Geräte-ID stimmte mit regulärem Ausdruck überein                                                                                                                                                                |
|            | Array           | Die Geräte-ID wurde mit einer Liste zulässiger Geräte-IDs abgeglichen.                                                                                                                                          |
|            |                 |                                                                                                                                                                                                                 |
| Gerätename | Zeichenkette    | Der Gerätename muss mit dem angegebenen übereinstimmen.                                                                                                                                                         |
|            | RegExp          | Gerätename stimmte mit regulärem Ausdruck überein                                                                                                                                                               |
|            | Array           | Der Gerätename stimmte mit einer Liste zulässiger Gerätenamen überein.                                                                                                                                          |
|            |                 |                                                                                                                                                                                                                 |
| enumId     | Zeichenkette    | Der Staat gehört zu einer gegebenen Aufzählung.                                                                                                                                                                 |
|            | RegExp          | Eine Enum-ID des Zustands erfüllt den gegebenen regulären Ausdruck                                                                                                                                              |
|            | Array           | Eine Enum-ID des Bundesstaates befindet sich in der gegebenen Liste der Enum-IDs.                                                                                                                               |
|            |                 |                                                                                                                                                                                                                 |
| enumName   | Zeichenkette    | Der Staat gehört zu einer gegebenen Aufzählung.                                                                                                                                                                 |
|            | RegExp          | Ein Enum-Name des Zustands erfüllt den gegebenen regulären Ausdruck                                                                                                                                             |
|            | Array           | Ein Enum-Name des Zustands ist in der gegebenen Liste der Enum-Namen enthalten.                                                                                                                                 |
|            |                 |                                                                                                                                                                                                                 |
| aus        | Zeichenkette    | Der neue Wert stammt vom definierten Adapter.                                                                                                                                                                   |
|            | RegExp          | Der neue Wert stammt von einem Adapter, der dem regulären Ausdruck entspricht.                                                                                                                                  |
|            | Array           | Der neue Wert stammt von einem Adapter, der in der angegebenen Liste der zulässigen Adapter enthalten ist.                                                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| aus Ne     | Zeichenkette    | Der neue Wert stammt nicht vom definierten Adapter.                                                                                                                                                             |
|            | RegExp          | Der neue Wert stammt nicht von einem Adapter, der dem regulären Ausdruck entspricht.                                                                                                                            |
|            | Array           | Der neue Wert stammt nicht von einem Adapter, der in der angegebenen Liste der verbotenen Adapter enthalten ist.                                                                                                |
|            |                 |                                                                                                                                                                                                                 |
| altVon     | Zeichenkette    | Der alte Wert stammt vom definierten Adapter.                                                                                                                                                                   |
|            | RegExp          | Der alte Wert stammt von einem Adapter, der dem regulären Ausdruck entspricht.                                                                                                                                  |
|            | Array           | Der alte Wert stammt von einem Adapter, der in der angegebenen Liste der zulässigen Adapter enthalten ist.                                                                                                      |
|            |                 |                                                                                                                                                                                                                 |
| oldFromNe  | Zeichenkette    | Der alte Wert stammt nicht vom definierten Adapter.                                                                                                                                                             |
|            | RegExp          | Der alte Wert stammt nicht von einem Adapter, der dem regulären Ausdruck entspricht.                                                                                                                            |
|            | Array           | Der alte Wert stammt nicht von einem Adapter, der in der angegebenen Liste der verbotenen Adapter enthalten ist.                                                                                                |

Beispiele: Auslöser für alle Zustände mit ID`'*.STATE'` wenn sie anerkannt werden und einen neuen Wert haben`true` Die

```js
{
    "id": /\.STATE$/,
    "val": true,
    "ack": true,
    "logic": "and"
}
```

**Hinweis:** Sie können reguläre Ausdrücke direkt verwenden:

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

Alle Änderungen von _stateId1_ werden in _stateId2_ geschrieben.

Wenn die`value` Der Parameter wird in Kombination mit der Status-ID als zweitem Parameter festgelegt; bei jeder Änderung wird der Status entsprechend aktualisiert.`value` Die

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

Funktion`on` Gibt den Handler zurück. Dieser Handler kann durch Abmelden verwendet werden.

_Hinweis:_ Standardmäßig werden nur Zustände mit der Qualität 0x00 an die Callback-Funktion übergeben. Um alle Ereignisse zu erhalten, fügen Sie Folgendes hinzu:`{q: '*'}` zur Musterstruktur.

_Hinweis:_ Bitte beachten Sie, dass "change" standardmäßig "any" entspricht, außer wenn nur "id" als Zeichenkette angegeben ist (z. B.`on('id', () => {});` Im letzten Fall wird die Änderung auf „ne“ gesetzt.

_Hinweis:_ Wenn Sie auch Statuslöschungen/Ablaufereignisse als Auslöser erhalten möchten, müssen Sie die Änderungsfunktion verwenden.`ne` oder`any` UND q mit`*` als Filter!

_Hinweis:_ Ab Version 4.3.2 ist es möglich, einen Triggertyp als zweiten Parameter anzugeben:`on('my.id.0', 'any', obj => log(obj.state.val));`

### einmal

Registriert ein einmaliges Abonnement, das sich nach dem ersten Aufruf automatisch abmeldet. Funktioniert wie [bei](#on---subscribe-on-changes-or-updates-of-some-state) , wird aber nur einmal ausgeführt.

```js
once(pattern, callback);
```

### abonnieren – dasselbe wie **[auf](#on---subscribe-on-changes-or-updates-of-some-state)**

### abbestellen

```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Entfernt alle Abonnements für die angegebene Objekt-ID oder für den angegebenen Handler.

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

### getFileSubscriptions

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

Terminplaner mit Astro-Funktion.

#### Zeitplan

Das Muster kann eine Zeichenkette mit [Cron-Syntax](http://en.wikipedia.org/wiki/Cron) sein, die aus 5 (ohne Sekunden) oder 6 (mit Sekunden) Ziffern besteht:

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

Das Muster kann auch ein Objekt sein; dies wird insbesondere dann verwendet, wenn Sekunden benötigt werden:

Das Objekt könnte folgende Eigenschaften haben:

- `second`
- `minute`
- `hour`
- `date`
- `month`
- `year`
- `dayOfWeek`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

Das Muster kann ein Javascript-Datumsobjekt (ein bestimmter Zeitpunkt) sein - in diesem Fall wird es nur einmal ausgelöst.

Falls Start- oder Endzeiten für einen Zeitplan benötigt werden, kann dies auch mithilfe eines Objekts realisiert werden. In diesem Fall besitzt das Objekt folgende Eigenschaften:

- `start`
- `end`
- `rule`

Start und Ende definieren ein Datumsobjekt, eine Datumszeichenfolge oder eine Anzahl von Millisekunden seit dem 1. Januar 1970, 00:00:00 UTC. Regel ist eine Zeitplanzeichenfolge mit [Cron-Syntax](http://en.wikipedia.org/wiki/Cron) oder ein Objekt:

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

Die Astro-Funktion kann über das Attribut „astro“ verwendet werden:

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

Das Attribut „Verschiebung“ gibt den Versatz in Minuten an. Es kann auch negativ sein, um die Zeit vor dem astrologischen Ereignis zu definieren.

Folgende Werte können als Attribut in der Astro-Funktion verwendet werden:

- `"sunrise"` Sonnenaufgang (der obere Rand der Sonne erscheint am Horizont)
- `"sunriseEnd"` : Sonnenaufgang endet (Unterkante der Sonne berührt den Horizont)
- `"goldenHourEnd"` : Die goldene Stunde des Morgens (weiches Licht, die beste Zeit zum Fotografieren) endet
- `"solarNoon"` : Sonnenhöchststand (die Sonne steht am höchsten)
- `"goldenHour"` : Die goldene Stunde am Abend beginnt
- `"sunsetStart"` Sonnenuntergang beginnt (der untere Rand der Sonne berührt den Horizont)
- `"sunset"` Sonnenuntergang (die Sonne verschwindet hinter dem Horizont, die bürgerliche Abenddämmerung beginnt)
- `"dusk"` Dämmerung (die nautische Abenddämmerung beginnt)
- `"nauticalDusk"` : nautische Dämmerung (beginnt die astronomische Abenddämmerung)
- `"night"` : Die Nacht beginnt (dunkel genug für astronomische Beobachtungen)
- `"nightEnd"` : Die Nacht endet (die astronomische Morgendämmerung beginnt)
- `"nauticalDawn"` : nautische Dämmerung (Morgendämmerung auf See beginnt)
- `"dawn"` : Morgendämmerung (die nautische Morgendämmerung endet, die bürgerliche Morgendämmerung beginnt)
- `"nadir"` Nadir (der dunkelste Moment der Nacht, die Sonne steht am tiefsten)

**Hinweis:** Um die "astro"-Funktion zu verwenden, müssen "latitude" und "longitude" in den Javascript-Adaptereinstellungen definiert werden.

**Hinweis:** In manchen Regionen kann es vorkommen, dass weder Nacht noch Nachtende existieren. Weitere Informationen finden Sie [hier](https://github.com/mourner/suncalc/issues/70) .

**Hinweis:** Die "on"-Funktion kann mit geringfügigen Anpassungen für die Zeitplanung verwendet werden:

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

## scheduleById

```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

Ermöglicht die Erstellung eines Zeitplans basierend auf einem Statuswert. Ändert sich der Statuswert, wird der alte Zeitplan gelöscht und automatisch ein neuer erstellt.

Unterstützte Formate:

- `[h]h:[m]m:ss` (z.B`12:42:15` ,`15:3:12` ,`3:10:25` )
- `[h]h:[m]m` (z.B`13:37` ,`9:40` )

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

Beispiel: Zustand erstellen und Zeitplan bei Änderungen registrieren:

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

### getSchedules

```js
const list = getSchedules(true);
```

Gibt die Liste aller CRON-Jobs und -Zeitpläne (außer astro) zurück. Das Argument muss ein`true` Wenn Sie die Liste für **jedes laufende Skript** erhalten möchten. Andernfalls werden nur die Zeitpläne des aktuellen Skripts zurückgegeben.

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

### Termin löschen

Wird **keine** „astro“-Funktion verwendet, kann der Zeitplan später storniert werden. Hierfür muss das Zeitplanobjekt gespeichert werden:

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

`clearSchedule` akzeptiert alles`schedule` Gibt (ein CRON-Job-Objekt oder die ID eines Zeitplans des Zeitassistenten) und auch die Einträge von [getSchedules](#getschedules) zurück:

```js
// Clear all schedules of this script
getSchedules().forEach(sch => clearSchedule(sch));
```

Es kehrt zurück`true` wenn der Zeitplan gefunden und freigegeben wurde, andernfalls`false` Mit der Astro-Option erstellte Zeitpläne können auf diese Weise nicht gelöscht werden.

### getAttr

```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

Gibt ein Attribut des Objekts zurück. Der Pfad zum Attribut kann verschachtelt sein, wie im Beispiel.

Wenn das erste Attribut vom Typ String ist, versucht die Funktion, den String als JSON-String zu parsen.

### getAstroDate

```js
getAstroDate(pattern, date, offsetMinutes);
```

Gibt ein JavaScript-Date-Objekt für den angegebenen Astro-Namen zurück (z. B.`"sunrise"` oder`"sunriseEnd"` Gültige Werte finden Sie in der Liste der zulässigen Werte im Abschnitt [„Astro“](#astro--function) der Funktion _„Zeitplan“_ .

Das zurückgegebene Datumsobjekt wird für das übergebene _Datum_ berechnet. Wird kein Datum angegeben, wird der aktuelle Tag verwendet.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Hinweis: Je nach geografischer Lage kann es Fälle geben, in denen z. B. 'Nacht'/'NachtEnd' zu bestimmten Zeitpunkten nicht existieren (z. B. in nördlichen Regionen im Mai/Juni jedes Jahr!).**

Sie können Webseiten wie [suncalc.net](http://suncalc.net) verwenden, um zu überprüfen, ob die Zeitpunkte korrekt sind.

### ist AstroDay

```js
isAstroDay();
```

Rücksendungen`true` wenn die aktuelle Zeit zwischen dem astronomischen Sonnenaufgang und Sonnenuntergang liegt.

### Vergleichszeit

```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Vergleiche die vorgegebene Zeit mit den Grenzwerten.

Wenn`timeToCompare` Da keine Zeitangabe vorliegt, wird die tatsächliche Zeit verwendet.

Folgende Operationen sind möglich:

- `">"` - wenn die vorgegebene Zeit größer ist als`startTime`
- `">="` - wenn die angegebene Zeit größer oder gleich ist`startTime`
- `"<"` - wenn die vorgegebene Zeit kürzer ist als`startTime`
- `"<="` - wenn die vorgegebene Zeit kleiner oder gleich ist`startTime`
- `"=="` - wenn die gegebene Zeit gleich ist`startTime`
- `"<>"` - wenn die vorgegebene Zeit nicht gleich ist`startTime`
- `"between"` - wenn die angegebene Zeit zwischen`startTime` Und`endTime`
- `"not between"` - wenn die angegebene Zeit nicht zwischen`startTime` Und`endTime`

Die Zeitangabe kann ein Datumsobjekt, ein Datum mit Uhrzeit oder nur die Zeitangabe sein.

Sie können astronomische Namen für die Zeitdefinition verwenden. Alle drei Parameter können als astronomische Zeit eingestellt werden. Folgende Werte sind möglich:`sunrise` ,`sunset` ,`sunriseEnd` ,`sunsetStart` ,`dawn` ,`dusk` ,`nauticalDawn` ,`nauticalDusk` ,`nightEnd` ,`night` ,`goldenHourEnd` ,`goldenHour` Weitere Einzelheiten finden Sie bei [Astro](#astro--function) .

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

Es ist auch möglich, die Zeit mit einem Offset zu definieren:

```js
log(compareTime({ astro: 'sunsetStart', offset: 30 }, { astro: 'sunrise', offset: -30 }, '>') ? 'Now is at least 30 minutes after sunset' : 'No idea');
```

Struktur eines astronomischen Objekts.

```js
{
    astro: 'sunsetStart',// mandatory, can be written as string and not as object if offset and date are default
    offset: 30,          // optional
    date:   new Date()   // optional
}
```

### setState

```js
setState(id, state, ack, callback);
```

_Hinweis_ : Die folgenden Befehle sind identisch.

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

Informationen zur Verwendung finden Sie unter [https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses.](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses)`ack` . Kurz:

- `ack` =`false` Das Skript möchte einen Befehl an das Zielgerät/den Zieladapter senden, der dort ausgeführt werden soll.
- `ack` =`true` Der Befehl wurde erfolgreich ausgeführt, und der Status wurde als positives Ergebnis aktualisiert.

### setStateAsync

```js
await setStateAsync(id, state, ack);
```

Dasselbe wie setState, aber mit`promise` Die

### setStateDelayed

```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

Gleiches Prinzip wie setState, jedoch mit Verzögerung in Millisekunden. Sie können alle laufenden Verzögerungen für diese ID löschen (standardmäßig). Z. B.

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

Diese Funktion gibt den Handler des Timers zurück, und dieser Timer kann einzeln mit clearStateDelayed gestoppt werden.

### setStateChanged

```js
await setStateChanged(id, state, ack);
```

Dasselbe wie setState, aber der Wert wird nur dann gesetzt, wenn er sich tatsächlich geändert hat.

### setStateChangedAsync

```js
await setStateChangedAsync(id, state, ack);
```

Dasselbe wie setStateChanged, aber mit`promise` Die

### clearStateDelayed

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

### getStateDelayed

```js
getStateDelayed(id);
```

Dies ist ein synchroner Aufruf, der die Liste aller laufenden Timer (setStateDelayed) für diese ID zurückgibt. Sie können diese Funktion auch ohne ID aufrufen und erhalten dann Timer für alle IDs. Wenn Sie diese Funktion für eine bestimmte Objekt-ID aufrufen, erhalten Sie folgende Antwort:

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

- `left` ist die verbleibende Zeit in Millisekunden.
- `delay` ist der anfängliche Verzögerungswert in Millisekunden.

Sie können die Anfrage direkt über die Timer-ID stellen. In diesem Fall lautet die Antwort:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### getState

```js
getState(id);
```

Gibt den Zustand mit der angegebenen ID in folgendem Format zurück:

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

Falls kein Zustand existiert, wird eine Warnung in den Protokollen ausgegeben und das Objekt wird entsprechend angepasst.`{ val: null, notExist: true }` wird zurückgegeben. Um die Warnung zu unterdrücken, prüfen Sie, ob der Zustand existiert, bevor Sie getState aufrufen (siehe [existsState](#existsState) ).

### getStateAsync

```js
const stateObject = await getStateAsync(id);
```

Dasselbe wie getState, aber mit`promise` Die

### existiertZustand

```js
existsState(id, (err, isExists) => {});
```

Wenn die Option „Nicht alle Zustände beim Start abonnieren“ deaktiviert ist, können Sie einen einfacheren Aufruf verwenden:

```js
existsState(id)
```

Die Funktion gibt in diesem Fall entweder wahr oder falsch zurück.

Prüfen, ob ein Zustand existiert.

### getObject

```js
getObject(id, enumName);
```

Ruft die Beschreibung der Objekt-ID ab, wie sie im System gespeichert ist. Sie können den Aufzählungsnamen angeben. Wenn dieser definiert ist, werden dem Ergebnis zwei zusätzliche Attribute hinzugefügt: enumIds und enumNames. Diese Arrays enthalten alle Aufzählungen, zu denen ID gehört. Beispiel:

```js
getObject('adapter.N.objectName', 'rooms');
```

Gibt in enumIds alle Räume zurück, in denen das angeforderte Objekt enthalten ist. Sie können "true" als enumName definieren, um _alle_ Aufzählungen zurückzugeben.

### setObject

```js
setObject(id, obj, callback);
```

Schreibt ein Objekt in die Datenbank. Dieser Befehl kann in den Adaptereinstellungen deaktiviert werden. Verwenden Sie diese Funktion mit Vorsicht, da die globalen Einstellungen beschädigt werden können.

Sie sollten es verwenden, um ein zuvor gelesenes, bereits vorhandenes Objekt zu **modifizieren** , z. B.:

```js
const obj = getObject('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, (err) => {
    if (err) log('Cannot write object: ' + err);
});
```

### existsObject

```js
existsObject(id, function (err, isExists) {});
```

Wenn die Option „Nicht alle Zustände beim Start abonnieren“ deaktiviert ist, können Sie einen einfacheren Aufruf verwenden:

```js
existsObject(id)
```

Die Funktion gibt in diesem Fall entweder wahr oder falsch zurück.

Prüfen, ob ein Objekt existiert.

### extendObject

```js
extendObject(id, obj, callback);
```

Es ist fast dasselbe wie`setObject` Zuerst liest es aber das Objekt ein und versucht, alle Einstellungen zusammenzuführen.

Verwenden Sie es folgendermaßen:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### deleteObject

```js
deleteObject(id, isRecursive, callback);
```

Ein Objekt anhand seiner ID aus der Datenbank löschen. Wenn das Objekt den Typ hat.`state` Der Statuswert wird ebenfalls gelöscht.

Zusätzlicher Parameter`isRecursive` Es könnte eine solche ID angegeben werden, sodass alle Kinder mit dieser ID gelöscht werden. Sehr gefährlich!

Verwenden Sie es folgendermaßen:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

_Beachten:`isRecursive` Diese Option ist nur mit js-controller >= 2.2.x verfügbar._

### getIdByName

```js
getIdByName(name, alwaysArray);
```

Gibt die ID des Objekts mit dem angegebenen Namen zurück. Existieren mehrere Objekte mit diesem Namen, ist das Ergebnis ein Array.`alwaysArray` Wenn das Flag gesetzt ist, ist das Ergebnis immer ein Array, falls eine ID gefunden wird.

### getEnums

```js
getEnums(enumName);
```

Ruft die Liste der vorhandenen Aufzählungen mit Elementen ab, wie zum Beispiel:

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

### createState

```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Erstelle einen Zustand und ein Objekt im JavaScript-Bereich, falls diese noch nicht existieren, z. B.`javascript.0.mystate` Die

!! Bevorzugt werden eigene Datenpunkte mit der vollständigen ID erstellt.`0_userdata.0.mystate` !!!

#### Parameter:

- `name` : Name des Zustands ohne Namensraum, z. B.`mystate`
- `initialValue` Eine Variable kann nach ihrer Erstellung initialisiert werden. Der Wert "undefined" bedeutet, dass der Wert nicht initialisiert wird.
- `forceCreation` : Zustand erstellen/überschreiben, unabhängig davon, ob der Zustand bereits existiert oder nicht.
- `common` Allgemeine Beschreibung des Objekts (siehe Beschreibung [hier)](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- `native` : Native Beschreibung eines Objekts. Alle spezifischen Informationen.
- `callback` : wird aufgerufen, nachdem der Zustand erstellt und initialisiert wurde.

Wenn Sie einstellen`common` die Flagge`alias` Zu`true` Dann wird ein Alias mit demselben Namen erstellt (aber in`alias.0` Namespace) als Status. Ein Alias wird nur erstellt, wenn er noch nicht existiert.

Folgende Einstellungen für Aliase sind ebenfalls gültig:

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

Es ist eine mögliche Kurzform von createState:

- `createState('myDatapoint')` - Erstellen Sie einfach einen Datenpunkt, falls dieser noch nicht existiert.
- `createState('myDatapoint', 1)` - Erstelle einen Datenpunkt, falls er noch nicht existiert, und initialisiere ihn mit dem Wert 1.
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - mit gängigen Definitionen wie Typ, Lesen, Schreiben und Rolle
- `createState('myDatapoint', { name: 'My own datapoint', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'My own datapoint', unit: '°C' })` - Erstelle einen Datenpunkt mit dem angegebenen Namen und den angegebenen Einheiten, falls dieser noch nicht existiert.

#### Ein Objekt an der zweiten Position ist immer das`common`

Diese Kurzformen sind der Grund dafür, dass ein Objekt an der zweiten Position **niemals** als Anfangswert gelesen wird.`createState('myDatapoint', {}, { type: 'object' })` tut daher nicht das, was es zu tun scheint:`{}` wird zu`common` , Und`{ type: 'object' }` geht weiter zu`native` Die

Um einem Zustand einen Anfangswert zuzuweisen, der kein primitiver Wert ist, legen Sie ihn in`common.def` :

```js
createState('0_userdata.0.myObject', { name: 'My object', type: 'object', read: true, write: true, def: {} });
```

Ein Zustand vom Typ`object` ,`json` oder`array` behält seinen Wert als JSON bei, daher beginnt der obige Zustand mit der Zeichenkette`'{}'` - genau wie`setState('0_userdata.0.myObject', {})` würde es speichern. Standardmäßig wird es für Sie in einen String umgewandelt; Schreiben`def: '{}'` „Selbst“ funktioniert auch.

### createStateAsync

```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

Dasselbe wie`createState` Aber das Versprechen wird erwidert.

### deleteState

```js
deleteState(name, callback);
```

Zustand und Objekt im JavaScript-Bereich löschen, z. B.`javascript.0.mystate` Zustände von anderen Adaptern können nicht gelöscht werden.

```js
deleteState('myDatapoint')
```

Löschen Sie einfach den Datenpunkt, falls er existiert.

### deleteStateAsync

```js
await deleteStateAsync(name);
```

Dasselbe wie`deleteState` Aber das Versprechen wird erwidert.

### Alias erstellen

```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Erstellen Sie einen Alias in`alias.0` Platzhalter, falls dieser nicht existiert, z. B.`javascript.0.myalias` und Verweise auf einen Zustand oder Lese-/Schreibzustände. Die allgemeine Definition wird aus dem Lesealias-ID-Objekt übernommen, jedoch hat eine bereitgestellte allgemeine Definition Vorrang.

#### Parameter:

- `name` : ID des neuen Alias-Status mit (möglicherweise ohne Alias-Namensraum), z. B.`test.mystate` (Namensraum`alias.0.` wird hinzugefügt =`alias.0.test.mystate` )
- `alias` Kann entweder eine vorhandene Status-ID als Zeichenkette oder ein Objekt mit vollständiger Aliasdefinition einschließlich Lese-/Schreib-IDs und Lese-/Schreibfunktionen sein. Hinweis: Aliasdefinitionen können nicht als Teil des allgemeinen Parameters festgelegt werden!
- `forceCreation` : Alias erstellen/überschreiben, unabhängig davon, ob der Zustand bereits existiert oder nicht.
- `common` Allgemeine Beschreibung des Alias-Objekts (siehe Beschreibung [hier)](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state) . Die hier angegebenen Werte haben Vorrang vor der allgemeinen Definition des gelesenen Alias-ID-Objekts. Hinweis: Aliasdefinitionen können nicht als Teil dieses allgemeinen Parameters festgelegt werden; siehe Parameter „Alias“!
- `native` : Native Beschreibung eines Objekts. Alle spezifischen Informationen.
- `callback` : wird aufgerufen, nachdem der Zustand erstellt und initialisiert wurde.

Es ist möglich, eine Kurzform von createAlias zu verwenden:

- `createAlias('myAlias', 'myDatapoint')` - Erstellen Sie einfach einen Alias alias.0.myAlias, der auf javascript.X.myDatapoint verweist, falls dieser noch nicht existiert.
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - erstellt Aliase und Referenzen auf verschiedene Lese-/Schreibzustände

Weitere Details finden Sie unter createState, es ist ähnlich.

### createAliasAsync

```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

Dasselbe wie`createAlias` Aber das Versprechen wird erwidert.

### senden an

```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

Sendet eine Nachricht an eine bestimmte oder alle Adapterinstanzen. Bei Verwendung des Adapternamens wird die Nachricht an alle Instanzen gesendet.

Um spezifische Informationen über Nachrichten zu erhalten, müssen Sie die Dokumentation für den jeweiligen Adapter lesen.

Beispiel (mit benutzerdefiniertem Timeout):

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

Manche Adapter unterstützen auch Antworten auf gesendete Nachrichten (z. B. Verlauf, SQL, Telegram). Die Antwort wird nur dann an die Callback-Funktion zurückgegeben, wenn die Nachricht an eine bestimmte Instanz gesendet wurde!

Beispiel (mit Callback):

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

_Der Standard-Timeout beträgt 20000 Millisekunden (sofern eine Callback-Funktion definiert wurde)._

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, { timeout: 2000 }, (res) => {
    log(`Sent to ${res} users`);
});
```

### sendToAsync

```js
await sendToAsync(adapter, command, message);
await sendToAsync(adapter, command, message, options);
```

Dasselbe wie sendTo, aber mit`promise` Die

Beispiel:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### sendToHost

```js
sendToHost(hostName, command, message, callback);
```

Sende eine Nachricht an die Controller-Instanz.

Folgende Befehle werden unterstützt:

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
- `'upgradeController'` - Aktualisieren Sie js-controller auf die neueste Version
- `'getInterfaces'` - Gibt alle verfügbaren Netzwerkschnittstellen des Systems zurück.
- `'getInterfaces'` - Startet einen Adapter-Upload
- `'rebuildAdapter'`
- `'readBaseSettings'`
- `'writeBaseSettings'`
- `'addNotification'`
- `'clearNotifications'`
- `'getNotifications'`
- `'updateLicenses'` - Lizenzen von iobroker.net lesen
- `'upgradeOsPackages'`
- `'restartController'`

Es handelt sich um recht spezifische Befehle, die nicht oft benötigt werden.

Beispiel:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Hinweis:** Sie müssen die Option _"setObject" aktivieren, um den Befehl_ aufrufen zu können.

### sendToHostAsync

```js
await sendToHostAsync(hostName, command, message);
```

Dasselbe wie sendToHost, aber mit`promise` Die

### setInterval

```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

Dasselbe wie bei JavaScript`setInterval` Die

### clearInterval

```js
clearInterval(id);
```

Dasselbe wie bei JavaScript`clearInterval` Die

### setTimeout

```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

Dasselbe wie bei JavaScript`setTimeout` Die

### clearTimeout

```js
clearTimeout(id);
```

Dasselbe wie bei JavaScript`clearTimeout` Die

### setImmediate

```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

Dasselbe wie bei JavaScript`setImmediate` und fast identisch mit`setTimeout(callback, 0, arg1, arg2, arg3, arg4)` aber mit höherer Priorität.

### Datum formatieren

```js
formatDate(millisecondsOrDate, format);
```

#### Parameter:

- `millisecondsOrDate` : Anzahl der Millisekunden seit state.ts oder state.lc (Anzahl der Millisekunden seit dem 1970.01.01 00:00:00) oder JavaScript _new Date()_ -Objekt oder Anzahl der Millisekunden seit _(new Date().getTime())_
- `format` Kann sein`null` Daher wird das Systemzeitformat verwendet, andernfalls

* YYYY, JJJJ, ГГГГ – ganzes Jahr, z. B. 2015
* YY, JJ, ГГ – kurzes Jahr, z. B. 15
* MM, MM (kyrillisch) – vollständiger Monat, z. B. 01
* M, M (kyrillisch) – kurzer Monat, z. B. 1
* DD, TT, ДД – ganztägig, z. B. 02
* D, T, Д – kurzer Tag, z. B. 2
* hh, SS, чч - volle Stunden, z. B. 03
* h, S, ч - kurze Stunden, z. B. 3
* mm, мм (kyrillisch) – volle Minuten, z. B. 04
* m, м (kyrillisch) – kurze Minuten, z. B. 4
* ss, сс(kyrillisch) – volle Sekunden, z. B. 05
* s, c (kyrillisch) – kurze Sekunden, z. B. 5
* sss, ссс(kyrillisch) - Millisekunden
* WW, НН (kyrillisch) – vollständiger Wochentag als Text
* W, H (kyrillisch) – Kurzer Wochentag als Text
* OO, ОО (kyrillisch) - vollständiger Monat als Text
* OOO, ООО (kyrillisch) - vollständiger Monat als Text im Genitiv
* O, O (kyrillisch) - Kurzmonat als Text

#### Beispiel

```js
formatDate(new Date(), "YYYY-MM-DD") // => Date "2015-02-24"
formatDate(new Date(), "hh:mm") // => Hours and minutes "17:41"
formatDate(state.ts) // => "24.02.2015"
formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss") // => "2015.02.15 17:41:98.123"
formatDate(new Date(), "WW") // => Day of week "Tuesday"
formatDate(new Date(), "W") // => Day of week "Tu"
```

### formatTimeDiff

```js
formatTimeDiff(milliseconds, format);
```

#### Parameter:

- `milliseconds` : Differenz in Millisekunden\*
- `format` Kann sein`null` , also die`hh:mm:ss` wird das Format verwendet, andernfalls

* DD, TT, ДД – ganztägig, z. B. „02“
* D, T, Д – kurzer Tag, z. B. „2“
* hh, SS, чч - volle Stunden, z. B. "03"
* h, S, ч - kurze Stunden, z. B. "3"
* mm, мм (kyrillisch) – volle Minuten, z. B. „04“
* m, м (kyrillisch) – kurze Minuten, z. B. „4“
* ss, сс(kyrillisch) - volle Sekunden, z. B. "05"
* s, c (kyrillisch) – kurze Sekunden, z. B. „5“

Sie können das Escape-Zeichen verwenden.`\` um den Austausch zu vermeiden. z.B.`DD \Day\s, h \hour\s, m \minute, ss \second\s`

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

### getDateObject

```js
getDateObject(stringOrNumber);
```

Konvertiert eine Zeichenkette oder Zahl in ein Datumsobjekt. Werden nur Stunden angegeben, wird das aktuelle Datum hinzugefügt und die Konvertierung versucht.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### formatValue

```js
formatValue(value, decimals, format);
```

Formatiert beliebige Werte (auch Zeichenketten) in Zahlen. Ersetzt den Punkt durch ein Komma, falls systemseitig konfiguriert. Dezimalzahlen geben die Nachkommastellen an. Der Standardwert ist 2. Die Formatierung ist optional.

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### adapterAbonnieren

```js
adapterSubscribe(id);
```

Sende eine Nachricht „subscribe“ an den Adapter, um ihn zu informieren. Wenn der Adapter das allgemeine Flag „subscribeable“ besitzt, wird die Funktion „subscribe“ automatisch aufgerufen.

### adapterAbmelden

```js
adapterUnsubscribe(id);
```

Sendet die Nachricht an einen Adapter`unsubscribe` um den Adapter anzuweisen, die Werte nicht abzufragen.

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
"name[commonAttr=something1](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]"
```

Der Name kann Folgendes sein: Status, Kanal, Gerät oder Zeitplan`idfilter` kann Platzhalter '\*' enthalten

Präfixe _**(nicht implementiert - sollten diskutiert werden)**_ :

- \# - anhand des Namens und nicht anhand der ID ermitteln
- \- Filter nach Rolle
- § - Nach Raum filtern

_**Beispiel**_ :

- `$('state[id=*.STATE]')` oder`$('state[state.id=*.STATE]')` oder`$('*.STATE')` - Wähle alle Bundesstaaten aus, deren ID mit ".STATE" endet.
- `$('state[id='hm-rpc.0.*]')` oder`$('hm-rpc.0.*')` - Gibt alle Zustände der Adapterinstanz hm-rpc.0 zurück.
- `$('channel(rooms=Living room)')` - alle Zustände im Raum "Wohnzimmer"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Holen Sie sich alle Rollläden von Homematic
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - Alle Zustände mit .STATE von Kanälen mit der Rolle "switch" im "Wohnzimmer" auf false setzen.
- `$('channel[state.id=*.STATE](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/functions=Windows)').each(function (id, i) {log(id);});` - Alle Zustände des Enums "windows" im Log ausgeben
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - Alle Zeitpläne mit der Zahl 65 am Ende ausdrucken
- `$('.switch §"Living room")` - Zustände mit allen Schaltern im 'Wohnzimmer' erfassen _**(nicht implementiert - sollte diskutiert werden)**_
- `$('channel .switch §"Living room")`- Zustände mit allen Schaltern im 'Wohnzimmer' erfassen _**(nicht implementiert - sollte diskutiert werden)**_

_**Erläuterung**_ Schauen wir uns Folgendes an:

```js
$('channel[role=switch][state.id=*.STATE](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Dieser Code durchsucht Kanäle. Alle Kanäle finden mit`common.role="switch"` und gehört zu`enum.rooms.Wohnzimmer` Nehmen Sie alle ihre Zustände, in denen id mit endet`".STATE"` und abonniere alle diese Zustände. Wenn sich einer dieser Zustände ändert, wird die Callback-Funktion wie bei der "on"-Funktion aufgerufen.

Folgende Funktionen sind möglich: setState, getState (nur vom ersten Wert), on, each, toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/rooms=Wohnzimmer)').setState(true);
```

Sie können die "each"-Schleife unterbrechen, indem Sie den Wert "false" zurückgeben, zum Beispiel:

```js
// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/rooms=Wohnzimmer)').each((id, i) => {
    log(id);
    if (i == 1) {
        return false;
    }
});
```

Oder Sie erhalten ein gewöhnliches Array von IDs und verarbeiten es auf Ihre eigene Weise:

```js
// get some state and filter only which has an `true` value
const enabled = $('channel[role=switch][state.id=*.STATE](https://github.com/iobroker/ioBroker.javascript/blob/master/docs/en/rooms=Wohnzimmer)').toArray().filter((id) => getState(id)?.val === true);
```

### Datei lesen

```js
readFile(adapter, fileName, (error, bytes) => {});
```

Das Ergebnis wird in der Callback-Funktion zurückgegeben. Datei aus der Datenbank aus dem Ordner lesen`javascript.0` Die

Der _Argumentadapter_ kann weggelassen werden.

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

Standardmäßig ist das Arbeitsverzeichnis/der Adapter`javascript.0` Die

### Datei schreiben

```js
writeFile(adapter, fileName, bytes, (error) => {});
```

Der optionale Fehlercode wird in der Callback-Funktion übergeben. _Der Argumentadapter_ kann weggelassen werden. \`fileName\` ist der Dateiname in der Datenbank. Alle Dateien werden im Ordner „javascript“ gespeichert. Um in andere Ordner zu schreiben, z. B. nach „/vis.0/“, verwenden Sie \`setFile\`.

Die Datei, die aussieht wie`'/subfolder/file.txt'` wird gespeichert unter`"/javascript/subfolder/file.txt"` und kann über einen Webserver aufgerufen werden mit`"http://ip:8082/javascript/subfolder/file.txt"`

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

### delFile

```js
delFile(adapter, fileName, (error) => {});
```

Datei oder Verzeichnis löschen. Dateiname ist der Name der Datei oder des Verzeichnisses in der Datenbank.

Die alternative Bezeichnung für diese Methode lautet:`unlink`

### renameFile

```js
renameFile(adapter, oldName, newName, (error) => {});
```

Datei oder Verzeichnis umbenennen. oldName ist der Name der Datei oder des Verzeichnisses in der Datenbank und wird in newName umbenannt.

Die alternative Bezeichnung für diese Methode lautet:`rename`

### onFile

```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Abonnieren Sie Dateiänderungen:

- `id` ist die ID eines Objekts vom Typ`meta` , wie`vis.0`
- `fileName` ist ein Dateiname oder ein Muster, wie z. B.`main/*` oder`main/vis-view.json`
- `withFile` ob der Inhalt der Datei im Callback übermittelt werden soll oder nicht. Die Übermittlung des Dateiinhalts kostet Speicher und Zeit. Wenn Sie also nur über Änderungen informiert werden möchten, setzen Sie`withFile` zu falsch.

Argumente im Callback:

- `id` - ID von`meta` Objekt;
- `fileName` - Dateiname (kein Muster);
- `size` - neue Dateigröße;
- `fileData` - Dateiinhalt vom Typ`Buffer` wenn die Datei binär ist (erkennbar an der Dateiendung) oder`string` Lieferung nur bei`withFile` ;
- `mimeType` - MIME-Typ der Datei, wie z. B.`image/jpeg` Lieferung nur bei`withFile` ;

**Wichtig** : Diese Funktionalität ist nur mit <js-controller@4.1.x> oder neuer verfügbar.

### Datei aus

```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Benachrichtigungen über Dateiänderungen abbestellen:

- `id` ist die ID eines Objekts vom Typ`meta` , wie`vis.0`
- `fileName` ist ein Dateiname oder ein Muster, wie z. B.`main/*` oder`main/vis-view.json`

**Wichtig** : Diese Funktionalität ist nur mit <js-controller@4.1.x> oder neuer verfügbar.

### onStop

```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Installieren Sie eine Callback-Funktion, die aufgerufen wird, wenn ein Skript beendet wird. Sie wird beispielsweise verwendet, um die Kommunikation zu beenden oder Verbindungen zu schließen.

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

`timeout` Der Standardwert beträgt 1000 ms.

### getHistory

```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Verlauf aus der angegebenen Instanz lesen. Wenn keine Instanz angegeben ist, wird die systemeigene Verlaufsinstanz verwendet.

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

Mögliche Optionen finden Sie [hier](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter) .

Zusätzlich zu diesen Parametern müssen Sie "id" angeben und können optional ein Timeout festlegen (Standard: 20000 ms).

Ein weiteres Beispiel:

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

\*\*Hinweis:\*\* Selbstverständlich muss der Verlauf für die ausgewählte ID zuerst im Adminbereich aktiviert werden.

### runScript

```js
runScript('scriptName', () => {
    // Callback is optional
    log('Srcipt started, but not yet executed');
});
```

Startet oder startet andere Skripte (und sich selbst) anhand ihres Namens neu.

```js
// restart script
runScript('groupName.scriptName1');
```

### runScriptAsync

Dasselbe wie bei runScript, aber mit`promise` Die

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### startScript

```js
startScript('scriptName', ignoreIfStarted, callback);
```

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, geschieht nichts, falls bereits ein Skript ausgeführt wird; andernfalls wird das Skript neu gestartet.

```js
startScript('scriptName', true); // start script if not started
```

### startScriptAsync

Dasselbe wie bei runScript, aber mit`promise` Die

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

Startet das Skript. Wenn ignoreIfStarted auf true gesetzt ist, geschieht nichts, falls bereits ein Skript ausgeführt wird; andernfalls wird das Skript neu gestartet.

```js
startScript('scriptName', true); // start script if not started
```

### stopScript

```js
stopScript('scriptName', callback);
```

Wird stopScript ohne Argumente aufgerufen, beendet es sich selbst:

```js
stopScript();
```

### stopScriptAsync

Dasselbe wie stopScript, aber mit`promise` :

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

Wird stopScript ohne Argumente aufgerufen, beendet es sich selbst:

```js
stopScript();
```

### isScriptActive

```js
isScriptActive('scriptName');
```

Gibt zurück, ob ein Skript aktiviert oder deaktiviert ist. Beachten Sie, dass diese Funktion nicht angibt, ob das Skript aktuell ausgeführt wird oder nicht. Das Skript kann beendet sein, aber dennoch aktiviert bleiben.

Es handelt sich nicht um eine Funktion. Es ist eine Variable mit einer JavaScript-Instanz, die im Gültigkeitsbereich des Skripts sichtbar ist.

### toInt

### toFloat

### toBoolean

### jsonataExpression

### Warten

Halten Sie die Skriptausführung einfach an. Warnung: Diese Funktion ist`promise` und muss wie folgt aufgerufen werden:

```js
await wait(1000);
```

### schlafen

Dasselbe wie [warten](#wait)

### Nachricht an

```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, { timeout: 1000 }, result =>
    log(JSON.stringify(result)));
```

Sende die Nachricht über den „Message Bus“ an ein anderes Skript. Oder sogar an einen Handler im selben Skript.

Die Standard-Timeout-Zeit für den Callback beträgt 5 Sekunden.

Das Kursziel könnte auf Folgendes verkürzt werden:

```js
messageTo('messageName', data, (result) => {
    log(JSON.stringify(result));
});
```

Callback und Optionen sind optional, das Timeout beträgt standardmäßig 5000 Millisekunden (sofern ein Callback angegeben wurde).

```js
messageTo('messageName', dataWithNoResponse);
```

### messageToAsync

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

### onMessage

```js
onMessage('messageName', (data, callback) => {
    log(`Received data: ${data}`);

    callback({ result: Date.now() });
});
```

Abonnieren auf`javascript` Der Adapter verwendet einen Message Bus und übermittelt die Antwort über einen Callback. Die Antwort des Skripts, das als erstes eine Antwort sendet, wird akzeptiert; alle anderen Antworten werden ignoriert.

Um eine Nachricht an ein JavaScript-Skript zu senden, die dann von diesem Handler empfangen wird, verwenden Sie [messageTo](#messageTo) .

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

Um eine Nachricht über die Befehlszeile zu senden, verwenden Sie

```bash
iob message javascript.0 toScript '{"script": "script.js.messagetest", "message": "messageName", "data": { "flag": true }}'
```

### onMessageUnregister

```js
const id = onMessage('messageName', (data, callback) => {
    log(data);
    callback({ result: Date.now() });
});

// unsubscribe specific handler
onMessageUnregister(id);
// or unsubscribe by name
onMessageUnregister('messageName');
```

Abmeldung von dieser Nachricht.

### onLog

```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Protokolle mit festgelegter Schweregradangabe abonnieren.

_Wichtig:_ Um Endlosschleifen zu vermeiden, dürfen im Handler keine Protokolle mit demselben Schweregrad ausgegeben werden.

Beispielsweise werden dadurch keine Protokolle erzeugt:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Um alle Protokolle zu erhalten`*` könnte verwendet werden. In diesem Fall wird die Protokollausgabe im Handler vollständig deaktiviert.

```js
onLog('*', data => {
    console.error('Error: ' + data.message); // will produce no logs
});
```

### onLogUnregister

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

Abmeldung von diesen Protokollen.

### httpGet

_Erfordert Version >= 7.9.0_

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

- `timeout` (Zahl) - Timeout in Millisekunden
- `responseType` (Zeichenkette) - Unterstützte Werte sind`text` (Standardeinstellung) oder`arraybuffer` für Binärdaten in der Antwort
- `basicAuth` (Objekt) – Anmeldeinformationen für die HTTP-Basisauthentifizierung. Z. B.`{ user: 'admin', password: 'iobroker' }`
- `bearerAuth` (Zeichenkette) - Token für die Bearer-Authentifizierung
- `headers` (Objekt) - Zusätzliche benutzerdefinierte HTTP-Header, z. B.`{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (Boolescher Wert) - Erlaubt selbstsignierte Zertifikate, wenn`false`

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

Zertifikatsvalidierung deaktivieren – _Erfordert Version >= 8.4.0_

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

### httpPost

_Erfordert Version >= 7.9.0_

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

### temporäre Datei erstellen

_Erfordert Version >= 8.3.0_

```js
httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.svg', { responseType: 'arraybuffer' }, async (err, response) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('javascript.svg', response.data);
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

## Registrierungsbenachrichtigung

_Erfordert Version >= 8.8.0_

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## Globale Skriptvariablen

### scriptName

`scriptName` - Der Name des Skripts.

```js
log(`Script ${scriptName} started!`);
```

### Beispiel

`instance` - Die JavaScript-Instanz, in der ein Skript ausgeführt wird (z. B.`0` ).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### Standarddatenverzeichnis

`defaultDataDir` - Absoluter Pfad zu iobroker-data.

```js
log(`Data dir: ${defaultDataDir}`);
```

### wortreich

`verbose` - Ausführlicher Modus aktiviert?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

### GEHEIMNISSE

`SECRETS` - Die Zugangsdaten des zentralen ioBroker-Zugangsdatenspeichers.

Die Zugangsdaten werden in der Administratoroberfläche unter **Grundeinstellungen** -> **Zugangsdaten** verwaltet. Jede Zugangsberechtigung hat eine ID (z. B. 127.12.1).`CameraPassword` ) und enthält entweder einen einzelnen **Schlüssel** (z. B. einen API-Schlüssel oder ein Passwort) oder ein **Login** / **Passwort-** Paar. Die geheimen Felder werden mit dem Systemgeheimnis verschlüsselt gespeichert und den Skripten bereits entschlüsselt übergeben:

```js
// credential of the type "key"
httpGet(`http://camera.local/snapshot?password=${SECRETS.CameraPassword.key}`, (err, result) => {
    // ...
});

// credential of the type "login"
log(`Mail account: ${SECRETS.MyMailAccount.login} / ${SECRETS.MyMailAccount.password}`);

// credential IDs that are no valid variable names
log(SECRETS['My camera'].key);
```

`SECRETS` ist schreibgeschützt und immer aktuell: Wenn Anmeldeinformationen in der Admin-UI hinzugefügt, geändert oder gelöscht werden, wird der neue Wert sofort verwendet – weder der Adapter noch das Skript müssen neu gestartet werden.

Falls keine Anmeldeinformationen existieren,`undefined` wird zurückgegeben:

```js
if (SECRETS.CameraPassword) {
    log('The camera password is defined');
}
```

#### Welche Felder enthält ein Anmeldeinformationsblatt?

Jede Anmeldeinformation hat entweder ein einzelnes`key` oder ein`login` /`password` Paar. Drei Möglichkeiten, um herauszufinden, welches:

- In den Instanzeinstellungen des JavaScript-Adapters listet der Abschnitt " **Verfügbare Anmeldeinformationen"** alle Anmeldeinformationen mit ihren Feldern und dem zum Kopieren bereiten Ausdruck auf.
- Im Editor, die automatische Vervollständigung nach`SECRETS.` bietet die vorhandenen Anmeldeinformationen an und nach dem nächsten Punkt genau die Felder, die diese Anmeldeinformationen enthalten.
- In einem Skript:

```js
log(JSON.stringify(Object.keys(SECRETS.CameraPassword))); // ["key"]
log(JSON.stringify(Object.keys(SECRETS.MyMailAccount))); // ["login","password"]
```

Blockly verfügt über einen **Anmeldeinformationsblock** für denselben Zweck – siehe die [Blockly-Dokumentation](/#/docs/adapterref/iobroker.javascript/blockly.md#credential) .

Der Zugriff kann mit der Instanzoption **"Skripten das Lesen der Anmeldeinformationen erlauben"** deaktiviert werden.`SECRETS` ist dann leer und eine Warnung wird in das Protokoll geschrieben.

**Hinweis:** Hierfür wird js-controller 7.2 oder neuer benötigt.

## Option – „Nicht alle Staaten beim Start abonnieren“

Es gibt zwei Möglichkeiten, Staaten zu abonnieren:

1. Der Adapter abonniert beim Start alle Zustände und empfängt alle Änderungen aller Zustände (die Verwendung von getState(id) ist einfach, erfordert aber mehr CPU und RAM):

```js
log(getState('someID').val);
```

2. Der Adapter abonniert jedes Mal die angegebene ID, wenn`on/subscribe` wird aufgerufen. In diesem Modus empfängt der Adapter nur Aktualisierungen für die gewünschten Zustände. Diese Option benötigt weniger RAM und ist effizienter, jedoch können Sie nicht synchron über getState auf Zustände zugreifen. **Sie müssen Rückruffunktionen oder Promises verwenden, um auf die Zustände zuzugreifen** .

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Grund: Der Adapter verfügt nicht über den Wert des Zustands im Arbeitsspeicher und muss ihn aus der zentralen Zustandsdatenbank anfordern.

## Skriptaktivität

Es besteht die Möglichkeit, Skripte über Zustände zu aktivieren und zu deaktivieren. Für jedes Skript wird ein Zustand mit dem Namen erstellt.`javascript.INSTANCE.scriptEnabled.SCRIPT_NAME` Skripte können durch Steuerung dieses Zustands aktiviert und deaktiviert werden.`ack=false` Die