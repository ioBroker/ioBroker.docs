---
title: Adapterreferenz
lastChanged: "09.09.2026"
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterref.md
---

# Adapterreferenz

Nachschlagewerk für die Programmierschnittstelle eines Adapters: die Klasse aus
`@iobroker/adapter-core`, ihre Eigenschaften, ihre Ereignisse und die Aufrufe,
mit denen sie Objekte und Zustände liest und schreibt.

Diese Seite setzt voraus, dass ein Gerüst bereits vorhanden ist. Der Einstieg
steht unter [Überblick](/docs/dev/adapterdev.md), die Datei `io-package.json`
unter [io-package.json](/docs/dev/iopackage.md), der Aufbau der Objekte selbst
unter [Kernkonzept](/docs/dev/objectsschema.md).

## Objekte und Zustände

Ein Adapter ist ein eigener Prozess. Er redet nie direkt mit der Datenbank,
sondern immer über diese Schnittstelle; ob die Daten in `jsonl`-Dateien oder in
Redis liegen, spielt für den Code keine Rolle.

Es gibt zwei Arten von Daten:

* **Objekte** beschreiben, was ein Datenpunkt ist: Name, Typ, Einheit, Rolle,
  Lese- und Schreibrechte. Sie ändern sich selten.
* **Zustände** (states) sind die Werte dazu, zusammen mit Zeitstempel,
  Bestätigungsflag und Herkunft. Sie ändern sich ständig.

Zu jedem Zustand gehört ein Objekt. Umgekehrt gilt das nicht: Objekte
beschreiben auch Hosts, Adapter, Instanzen, Kategorien, Benutzer und die
Gliederung in Geräte und Kanäle.

Jede Kennung besteht aus durch `.` getrennten Teilen. Objekte einer Instanz
beginnen immer mit `<adaptername>.<instanz>`:

```
hm-rpc.0.IEQ1234567              device
hm-rpc.0.IEQ1234567.0            channel
hm-rpc.0.IEQ1234567.0.STATE      state
```

Die Kennung eines Zustands beginnt mit der Kennung seines Kanals, die des
Kanals mit der des Geräts. Ist der Adapter einfach gebaut, dürfen Geräte und
Kanäle entfallen.

?> Für jede Instanz legt der js-controller `alive`, `connected`, `uptime` und
die drei Speicherzustände unter `system.adapter.<name>.<instanz>` selbst an.
Bei den Betriebsarten `none` und `once` entfallen sie.

## Grundgerüst

Ein Adapter bindet die gemeinsame Grundlage über `@iobroker/adapter-core` ein
und leitet seine eigene Klasse von `utils.Adapter` ab:

```js
'use strict';

const utils = require('@iobroker/adapter-core');

class MeinAdapter extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'meinadapter' });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        await this.setState('info.connection', false, true);
        this.subscribeStates('*');
        // this.config.<feld> enthält die Konfiguration der Instanz
    }

    onStateChange(id, state) {
        if (!state || state.ack) {
            return; // nur Befehle interessieren
        }
        this.log.debug(`Befehl für ${id}: ${state.val}`);
    }

    onUnload(callback) {
        try {
            this.clearInterval(this.pollTimer);
            callback();
        } catch {
            callback();
        }
    }
}

if (require.main !== module) {
    module.exports = options => new MeinAdapter(options);
} else {
    new MeinAdapter();
}
```

Alle Aufrufe stehen damit als Methoden der eigenen Klasse zur Verfügung:
`this.setState(...)`, `this.getStateAsync(...)`, `this.log.info(...)`.

Der Name im `super`-Aufruf muss genau dem Verzeichnisnamen und dem Feld
`common.name` in der `io-package.json` entsprechen.

!> In Adaptern von vor 2019 steht stattdessen `require('./lib/utils')` und
`utils.adapter('name')` mit Handlern als Optionen. Dieser Weg wird nicht mehr
gepflegt; die Datei `lib/utils.js` gehört nicht mehr in ein neues Paket.

## Eigenschaften der Adapterklasse

| Eigenschaft | Inhalt |
|---|---|
| `this.name` | Name des Adapters, z. B. `meinadapter` |
| `this.instance` | Nummer dieser Instanz |
| `this.namespace` | `<name>.<instanz>`, das Präfix aller eigenen Kennungen |
| `this.config` | der `native` Teil der Instanzkonfiguration, also die Werte aus dem Konfigurationsdialog |
| `this.common` | der `common` Teil der Instanzkonfiguration |
| `this.host` | Host, auf dem die Instanz läuft |
| `this.adapterDir` | Verzeichnis des installierten Adapters |
| `this.ioPack` / `this.pack` | Inhalt von `io-package.json` bzw. `package.json` |
| `this.log` | Logger, siehe unten |
| `this.connected` | Verbindung zur Datenbank |
| `this.constants` | Konstanten des js-controller, z. B. `STATE_QUALITY` |

Zwei Eigenschaften gibt es nur auf Anforderung im Konstruktor:
`systemConfig: true` füllt `this.systemConfig` mit dem Inhalt von
`iobroker-data/iobroker.json`, `useFormatDate: true` füllt `this.dateFormat`,
`this.language`, `this.isFloatComma`, `this.longitude` und `this.latitude` aus
`system.config`.

?> `this.config` enthält genau das, was unter `native` in `io-package.json`
steht, ergänzt um die Eingaben des Benutzers. Alles andere wird mit
`getForeignObjectAsync` gelesen.

## Protokollierung

```js
this.log.silly('sehr ausführlich');
this.log.debug('Details für die Fehlersuche');
this.log.info('normale Meldung');
this.log.warn('Warnung');
this.log.error('Fehler');
```

Herkunft und Zeit fügt der js-controller selbst hinzu. `console.log` ist nur
sichtbar, wenn der Adapter von Hand in der Konsole gestartet wurde.

Wie ausführlich protokolliert werden soll, steht unter
[Empfehlungen](/docs/dev/bestpractices.md).

## Ereignisse

| Ereignis | Wird ausgelöst |
|---|---|
| `ready` | wenn die Konfiguration geladen ist. **Erst hier** darf initialisiert werden |
| `stateChange(id, state)` | ein abonnierter Zustand hat sich geändert. `state` ist `null`, wenn er gelöscht wurde |
| `objectChange(id, obj)` | ein abonniertes Objekt hat sich geändert. `obj` ist `null`, wenn es gelöscht wurde |
| `fileChange(id, fileName, size)` | eine abonnierte Datei hat sich geändert |
| `message(obj)` | eine Nachricht ist eingegangen, siehe [Nachrichten](/docs/dev/messagebox.md) |
| `unload(callback)` | die Instanz wird beendet. Timer schließen, Verbindungen trennen, dann `callback()` |
| `install` | einmalig bei der Installation (Start mit `--install`) |
| `log(message)` | Protokollmeldungen aller Instanzen, nur mit `logTransporter` |

## Zustände abonnieren

Ereignisse kommen nur für abonnierte Muster:

```js
this.subscribeStates('*');                       // alles der eigenen Instanz
this.subscribeStates('memory*');                 // nur passende eigene Zustände
this.subscribeForeignStates('yr.*.forecast.*');  // Zustände anderer Instanzen
```

Dazu gibt es `subscribeObjects`, `subscribeForeignObjects`,
`subscribeForeignFiles` und jeweils ein `unsubscribe…`.

?> Ein Abonnement liefert keinen Anfangswert, nur Änderungen. Den Ausgangswert
liest man in `onReady` einmal selbst.

## Zustände lesen

```js
const state = await this.getStateAsync('myState');
this.log.info(`${state.val}, bestätigt: ${state.ack}, Zeit: ${state.ts}`);

const fremd = await this.getForeignStateAsync('hm-rpc.0.IEQ123.1.STATE');
```

`getStatesAsync('muster*')` liefert mehrere auf einmal,
`getForeignStatesAsync` dasselbe über Instanzgrenzen hinweg. Platzhalter gibt
es nur bei den Mehrzahlformen.

## Zustände schreiben

Das Flag `ack` unterscheidet Befehl und Rückmeldung, und diese Unterscheidung
trägt das ganze System:

* `ack: false` ist ein **Befehl**. Er kommt vom Benutzer, aus VIS, aus einem
  Skript, und heißt: mach das.
* `ack: true` ist eine **Rückmeldung**. Sie kommt vom Gerät oder vom Dienst und
  heißt: so ist es jetzt.

```js
await this.setState('myState', { val: 21.5, ack: true });  // Rückmeldung
await this.setState('myState', 21.5, true);                // dasselbe, kurz
await this.setForeignState('hm-rpc.0.kitchen.light', true); // Befehl an andere
```

Ohne Callback liefert `setState` ein Promise; die alte Form `setStateAsync` ist
abgekündigt. `setStateChanged` schreibt nur, wenn sich der Wert tatsächlich
geändert hat.

Der Ablauf am Beispiel einer Lampe: VIS schreibt `{val: true, ack: false}`.
Der Adapter hat seine eigenen Zustände abonniert, erkennt am fehlenden `ack`
einen Befehl und schaltet das Gerät. Das Gerät meldet zurück, der Adapter
schreibt `{val: true, ack: true}`. Diese zweite Änderung führt er nicht
nochmals aus.

!> Der eigene `stateChange`-Handler bekommt auch die eigenen Schreibvorgänge
zu sehen. Ohne die Abfrage auf `state.ack` entsteht eine Endlosschleife.

## Aufbau eines Zustands

| Feld | Bedeutung |
|---|---|
| `val` | der Wert |
| `ack` | `false` = Befehl, `true` = Rückmeldung |
| `ts` | Zeitstempel in Millisekunden seit 1970 |
| `lc` | Zeitstempel der letzten *Wert*änderung. Bleibt stehen, wenn derselbe Wert erneut geschrieben wird |
| `from` | Instanz, die geschrieben hat, z. B. `system.adapter.web.0` |
| `q` | Qualität, siehe `this.constants.STATE_QUALITY` |
| `expire` | optional, Sekunden bis der Wert auf `null` fällt |
| `user` | optional, Benutzer, in dessen Namen geschrieben wurde |

`expire` benutzt der js-controller selbst für `alive`: Meldet sich eine Instanz
30 Sekunden nicht, gilt sie als gestoppt.

## Objekte lesen und schreiben

```js
const obj = await this.getObjectAsync('myState');
const fremd = await this.getForeignObjectAsync('system.adapter.web.0');

await this.setObjectNotExistsAsync('temperatur', {
    type: 'state',
    common: {
        name: 'Temperatur',
        type: 'number',
        role: 'value.temperature',
        unit: '°C',
        read: true,
        write: false
    },
    native: {}
});

await this.extendObject('temperatur', { common: { unit: 'K' } });
await this.delObject('temperatur');
```

* `setObject` schreibt vollständig und überschreibt, was da war.
* `setObjectNotExists` legt nur an, wenn noch nichts da ist. Das ist der
  Normalfall beim Start, weil eigene Änderungen des Benutzers erhalten bleiben.
* `extendObject` liest, führt zusammen und schreibt zurück. Der Weg für
  nachträgliche Korrekturen.
* Alle Formen ohne `Foreign` ergänzen die Kennung selbst um `this.namespace`.

Für ganze Bäume gibt es `getAdapterObjectsAsync`, `getForeignObjectsAsync`,
`getDevicesAsync`, `getChannelsOfAsync` und `getStatesOfAsync`.

!> `createDevice`, `createChannel`, `createState` und die zugehörigen
`delete…`-Aufrufe sind abgekündigt. An ihre Stelle treten `extendObject` und
`delObject` mit der vollständigen Kennung.

Welche Felder ein Objekt haben muss und welche Rollen es gibt, steht unter
[Kernkonzept](/docs/dev/objectsschema.md) und
[Zustandsrollen](/docs/dev/stateroles.md).

## Objektansichten

Für wiederkehrende Abfragen kann ein Adapter eine eigene Ansicht in
`io-package.json` hinterlegen und sie mit `getObjectView` abfragen:

```js
const doc = await this.getObjectViewAsync('hm-rpc', 'listDevices', {
    startkey: `hm-rpc.${this.instance}.`,
    endkey: `hm-rpc.${this.instance}.\u9999`
});
doc.rows.forEach(row => this.log.info(`${row.id}`));
```

?> Ansichten sind selten nötig. Für die meisten Adapter genügt
`getForeignObjectsAsync` mit einem Muster.

## info.connection

Ein Adapter, der eine Verbindung zu einem Gerät oder Dienst unterhält, legt den
Zustand `info.connection` an und pflegt ihn. Der Admin zeigt daraufhin auf der
Kachel der Instanz an, ob die Verbindung steht.

```js
await this.setState('info.connection', true, true);
```

Am einfachsten wird der Zustand in `instanceObjects` der `io-package.json`
angelegt, dann entsteht er mit jeder neuen Instanz von selbst.

## Timer und Beenden

Timer immer über die Adapterklasse anlegen. Sie werden dann beim Beenden
mitgeräumt und tauchen nicht als offene Handles auf:

```js
this.pollTimer = this.setInterval(() => this.poll(), 60_000);
this.retry = this.setTimeout(() => this.connect(), 5_000);
await this.delay(500);
```

Dazu gehören `clearInterval` und `clearTimeout` derselben Klasse. Im
`unload`-Handler wird aufgeräumt und danach `callback()` aufgerufen. Ohne das
beendet der js-controller die Instanz nach einer Wartezeit hart.

`this.terminate('Grund')` beendet die Instanz geordnet, `this.restart()`
startet sie neu.

## Weitere Aufrufe

**Nachrichten**: `sendTo`, `sendToHost`, `sendToUI`; siehe
[Nachrichten](/docs/dev/messagebox.md).

**Benachrichtigungen**: `registerNotification`; siehe
[Benachrichtigungen](/docs/dev/notifications.md).

**Dateien**: `readFileAsync`, `writeFileAsync`, `readDirAsync`, `mkdirAsync`,
`unlinkAsync`, `renameAsync`, `fileExistsAsync`, `chmodFileAsync`,
`chownFileAsync`; siehe [Dateispeicherung](/docs/dev/filestorage.md).

**Konfiguration und Geheimnisse**: `updateConfig`, `getEncryptedConfig`,
`encrypt`, `decrypt`, `getCertificatesAsync`, `getSuitableLicenses`; siehe
[Sicherheit](/docs/dev/adaptersecurity.md).

**Benutzer und Rechte**: `checkPasswordAsync`, `setPasswordAsync`,
`checkGroupAsync`, `calculatePermissionsAsync`, `getUserID`.

**Verlauf**: `getHistoryAsync` liest Werte aus dem eingerichteten
Verlaufsadapter (History, SQL, InfluxDB).

**Kategorien**: `getEnumAsync`, `getEnumsAsync`, `addStateToEnumAsync`,
`deleteStateFromEnumAsync`.

**System**: `getPortAsync` sucht einen freien Port, `supportsFeature` fragt
Fähigkeiten des laufenden js-controller ab, `getPluginInstance` und
`getPluginConfig` erreichen Plugins wie Sentry, `formatDate` und `formatValue`
formatieren nach den Systemeinstellungen.

?> Zu fast jedem Aufruf mit Callback gibt es eine Form mit dem Zusatz `Async`,
die ein Promise liefert. Bei den Schreibaufrufen für Objekte und Zustände ist
es umgekehrt: dort liefert die Grundform ohne Callback bereits ein Promise, und
die `Async`-Form ist abgekündigt.

## Startflags

Der js-controller startet den Adapter als eigenen Prozess und übergibt ihm
Instanznummer und Protokollebene. Darum kümmert sich `adapter-core`. Von Hand
sind drei weitere Flags nützlich:

* `--install`: startet den Adapter auch ohne Konfiguration, für den
  Installationsvorgang.
* `--force`: startet ihn auch, wenn die Instanz deaktiviert ist.
* `--logs`: schreibt die Protokollmeldungen zusätzlich auf die Konsole.

## Weiterführend

* [Überblick](/docs/dev/adapterdev.md): der Weg vom leeren Ordner zum Adapter
* [io-package.json](/docs/dev/iopackage.md): Betriebsart, Abhängigkeiten,
  Konfigurationswerte, `instanceObjects`
* [Kernkonzept](/docs/dev/objectsschema.md): vollständiges Schema der Objekte
* [JSON-Config](/docs/dev/adapterjsonconfig.md): Konfigurationsdialog
* [dev-server](/docs/dev/devserver.md) und
  [Debugging](/docs/dev/adapterdebug.md): ausprobieren und Fehler suchen
* [Empfehlungen](/docs/dev/bestpractices.md): was einen Adapter gut macht
* [Veröffentlichen](/docs/dev/adapterpublish.md): der Weg ins Repository
