---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/DEVELOPMENT.md
title: Erweiterung der Entdeckung
hash: psdaBwkksLfvlU1//o2SW+rBjfdpGlp9cjbCHfvEf5Q=
---
# Erweiterung der Entdeckung

Dieser Leitfaden richtet sich an Adapterentwickler, die möchten, dass der Discovery-Adapter ihre Geräte findet und ihren Adapter vorschlägt. Eine Discovery-Funktion ist eine der Voraussetzungen für das stabile Repository (siehe die [Regeln von ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-an-adapter-to-get-added-to-the-stable-repository) ).

In den meisten Fällen besteht die gesamte Änderung aus drei Dateien:

| Datei                                 | Was                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `src/lib/adapters/<adaptername>.ts`   | das Erkennungsmodul                                                           |
| `test/adapters/<adaptername>.test.js` | Der Test wurde mit Daten gespeist, die von einem realen Gerät erfasst wurden. |
| `README.md`                           | eine Zeile in „Automatisch erkannt“, ein Änderungsprotokolleintrag            |

Es muss nichts weiter registriert werden: Die Module werden geladen von `build/lib/adapters/` anhand des Dateinamens.

**Der Dateiname muss exakt dem Adapternamen entsprechen** (`myadapter.ts` für `iobroker.myadapter` Discovery lädt ein Modul nur dann, wenn ein Adapter mit diesem Namen im Repository der Installation vorhanden ist, sodass niemals ein Adapter vorgeschlagen wird, den der Benutzer nicht installieren kann. Ein Modul mit einem anderen Namen wird niemals geladen.

## So funktioniert ein Scan

```
discovery methods            devices, grouped by type          detection modules           admin
(src/lib/methods/)                                             (src/lib/adapters/)
 ping   ───────────────►  ip      192.168.1.10, .11, ...  ──►  every module with type 'ip'
 mdns   ───────────────►  mdns    192.168.1.10, ...       ──►  every module with type 'mdns'   ──► proposals in
 upnp   ───────────────►  upnp    192.168.1.11, ...       ──►  every module with type 'upnp'       system.discovery
 serial ───────────────►  serial  /dev/ttyUSB0, ...       ──►  every module with type 'serial' ──► discovery dialog
 ...                                                                                               creates instances
```

1. Die Methoden scannen das Netzwerk und erfassen Geräte. Dieselbe Adresse kann mehrmals auftauchen, einmal pro Typ: `192.168.1.10` als `ip` Gerät (es antwortete auf Pings) und als ein `mdns` Gerät (es kündigte einen Dienst an).
2. Jedes Gerät wird an jedes Modul übergeben, dessen `type` Spiele.
3. Ein Modul, das das Gerät erkennt, fügt einen **Vorschlag** hinzu zu `options.newInstances` Die
4. Die Vorschläge werden gespeichert in `system.discovery` Im Erkennungsdialog im Adminbereich werden sie angezeigt und die vom Benutzer ausgewählten Instanzen erstellt.

## Bevor Sie beginnen

**Der Adapter muss im ioBroker-Repository vorhanden sein.** Die Erkennung schlägt eine Instanz vor, und der Administrator installiert den Adapter aus dem Repository, um diese zu erstellen. Zwei Prüfungen stellen dies sicher:

- **Der Build-Prozess** liest jeden Adapternamen, den ein Modul vorschlagen kann, und schlägt fehl, wenn einer nicht im aktuellsten Repository vorhanden ist (`node scripts/proposedAdapters.js` (wird ebenfalls einmal wöchentlich ausgeführt, was ein Problem verursacht). Es liest das erste Argument von `tools.getNextInstanceID()` Und `tools.proposeSharedInstance()` - übergeben Sie ein Stringliteral oder ein `const` und baue jeden Vorschlag mit einem der beiden auf, andernfalls fällt das Modul aus der Prüfung heraus.
- **Zur Laufzeit** wird ein Modul nur dann ausgeführt, wenn sich sein Adapter im Repository befindet, auf das die Installation eingestellt ist: Während er nur in der neuesten Version verfügbar ist, erhalten Benutzer der stabilen Version diesen Vorschlag nicht. Die **Benennung erfolgt anhand des Dateinamens** – benennen Sie das Modul nach dem erkannten Adapter (`src/lib/adapters/<adaptername>.ts`), oder es läuft nie.

**Finden Sie heraus, wie das Gerät erkannt werden kann.** Wählen Sie die erste funktionierende Option in dieser Reihenfolge aus:

| Option                                                                      | `type`   | Kosten                                                             | Wie findet man das heraus?                                                                                                                                |
| --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mDNS-Dienstankündigung, z. B. `_wled._tcp`                                  | `mdns`   | keine – der Scan hat sie bereits erfasst.                          | Schauen Sie sich an, wonach die Suchfunktion des Adapters selbst sucht; `avahi-browse -art` (Linux) oder `dns-sd -B _services._dns-sd._udp` (macOS/Windows) |
| UPnP/SSDP-Antwort (`USN`, `SERVER`, `ST`, die Beschreibung bei `LOCATION`) | `upnp`   | keine – der Scan hat sie bereits erfasst.                          | ein SSDP-Tool oder `gssdp-discover`                                                                                                                        |
| Eine Antwort über einen festen Port oder HTTP-Pfad                          | `ip`     | eine Anfrage an **jeden** Host, der auf einen Ping geantwortet hat | `curl http://<device>/<path>`                                                                                                                             |
| Ein USB-/Seriell-Stick, der auf eine Anfrage antwortet                      | `serial` | Öffnet alle seriellen Ports des Hosts                              | der eigene Code des Adapters                                                                                                                              |

Ein `ip` Das Modul wird für jede Adresse im Netzwerk ausgeführt – Drucker, NAS, Router, Geräte anderer Benutzer. Verwenden Sie es nur, wenn sich das Gerät nicht selbst meldet.

**Wissen Sie, was der Adapter benötigt? `native` Schau** dir das an `native` im Adapter `io-package.json` Ein Vorschlag enthält nur die Werte, die die Erkennung ermittelt hat (`host`, `port`, `model`, ...). Der Administrator überschreibt damit die Standardeinstellungen des Adapters beim Erstellen der Instanz (`Object.assign` (eine Ebene tief), also lassen Sie alles andere weg.

## Das Detektionsmodul

### Vertrag

```ts
export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void;
export const type: string | string[];   // which devices the module wants to see
export const timeout: number;            // ms, default 2000
export const dependencies?: unknown;     // truthy => run after all other modules (hm-rega waits for hm-rpc)
```

- **Anruf `callback(null, found, ip)` Genau einmal, auf jedem Pfad** – auch wenn nichts gefunden wurde oder ein Fehler auftrat. Ein zweiter Aufruf wird als Fehler protokolliert. Ein fehlender Aufruf blockiert das Gerät, bis der Watchdog auslöst.
- ** `found` Ist `true` nur dann, wenn das Modul einen Vorschlag hinzugefügt oder erweitert hat.** Ein Gerät, das bereits eine Instanz besitzt, wird erkannt, aber `found` Ist `false` Die
- ** `timeout` Der Wert muss größer sein als alles, worauf das Modul wartet.** Der Kern startet seinen Watchdog mit diesem Wert, _bevor_ er ihn aufruft. `detect()` Sind beide gleich, gewinnt der Kontrollhund.
- Es werden keine Fehler ausgelöst. Eine fehlgeschlagene Anfrage bedeutet „nicht gefunden“: `callback(null, false, ip)` Die
- Der Vertrag basiert auf Callbacks – bitte beibehalten. Innerhalb des Moduls sind Promises in Ordnung.

### Gerätetypen

| `type`   | `detect()` wird genannt                                 | Was das Gerät mitführt                                                             |
| -------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `ip`     | für jede Adresse, die auf einen Ping geantwortet hat    | `_addr`, `_name`                                                                  |
| `mdns`   | für jede Adresse, die einen mDNS-Dienst angekündigt hat | `_mdns`- verwenden `tools.hasMdnsService()`, `tools.mdnsName()`, `tools.mdnsTxt()` |
| `upnp`   | für jede Adresse, die SSDP beantwortet hat              | `_upnp`: ein Array von Header-Maps; `_location` hält den Körper von `LOCATION`     |
| `serial` | für jeden seriellen Port                                | `_addr` ist der Portname; testen Sie mit `tools.testSerialPort()`                  |
| `udp`    | einmal, `_addr` Ist `255.255.255.255`                     | Senden Sie Ihre eigene Sendung mit `tools.udpScan()`                               |
| `once`   | einmal pro Scan, `_addr` Ist `0.0.0.0`                    | für Zuhörer, z. B. Multicast                                                       |
| `advice` | einmal am Ende, `detect(null, null, ...)`                | Vorschläge ohne Gerät (JavaScript, Verlauf, Web, ...).                             |

### Vorschläge

Es gibt zwei Arten von Adaptern und daher auch zwei Arten von Vorschlägen.

**Eine Instanz pro Gerät** – der Adapter speichert die Adresse seines Geräts. `native`:

```ts
if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
    return callback(null, false, ip); // already configured
}
options.newInstances.push({
    _id: tools.getNextInstanceID(adapterName, options),
    common: { name: adapterName },
    native: { host: ip },
    comment: { add: [name, ip] }, // what the dialog shows as "found"
});
callback(null, true, ip);
```

**Eine Instanz für alle Geräte** – der Adapter findet seine Geräte selbst und speichert keine Adresse. `native` (shelly, wled, homewizard, ...). Der erste Fund erzeugt den Vorschlag, jeder weitere Fund wird seiner Liste hinzugefügt, und eine bestehende Instanz wird als "erweitert" angeboten:

```ts
callback(null, tools.proposeSharedInstance(adapterName, `${name} (${ip})`, options), ip);
```

**Werte, die die Erkennung nicht kennen kann** (ein Zugangscode, ein Benutzername), werden im Dialog abgefragt mit `comment.inputs` Der Wert wird dem Attribut mit dem Namen zugewiesen. `name`:

```ts
comment: {
    add: [name, ip],
    inputs: [
        { name: 'native.user', def: '', type: 'text', title: 'User name' },
        { name: 'native.password', def: '', type: 'password', title: 'Password' },
    ],
},
```

Eingabetypen, die der Dialog versteht: `text`, `password`, `checkbox`, `select` (mit `options`), `link` (ein Button, die URL in `def`) Und `comment` (eine Textzeile, in `def`).

### Beispiel: mDNS

```ts
import * as tools from '../tools';
import type { DetectCallback, DetectOptions, DiscoveryDevice } from '../types';

const adapterName = 'myadapter';

// What the device announces - seen with `avahi-browse -r` on a Foo Bar 3000, firmware 2.1
const SERVICE = '_foobar._tcp';

export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (!tools.hasMdnsService(device, SERVICE)) {
        return callback(null, false, ip);
    }

    // One instance per device, addressed by `native.host`
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip);
    }

    const name = tools.mdnsName(device) || 'Foo Bar';
    options.log.debug(`Foo Bar detected at ${ip}`);
    options.newInstances.push({
        _id: tools.getNextInstanceID(adapterName, options),
        common: { name: adapterName },
        native: { host: ip },
        comment: { add: [name, ip] },
    });
    callback(null, true, ip);
}

export const type = ['mdns'];
export const timeout = 1500;
```

Zu lesende Module: `wled.ts` Und `shelly.ts` (mDNS, gemeinsam genutzte Instanz), `blackmagic-atem.ts` (mDNS, eine Instanz pro Gerät), `bosesoundtouch.ts` (UPnP), `awtrix-light.ts` (HTTP-Probe), `alpha2.ts` (HTTP-Abfrage eines Geräts, das jeweils nur eine Verbindung zulässt).

### Beispiel: HTTP-Probe

Nur wenn sich das Gerät nicht selbst meldet. Fragen Sie nach einer eindeutigen Identifizierung des Geräts, nicht nur nach „Port 80 beantwortet“:

```ts
const PORT = 80;
const PROBE_TIMEOUT = 1000;

export function detect(ip: string, _device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip); // the adapter talks to it already, leave it alone
    }

    // without a callback, httpGet returns a promise: rejected on errors and non-200 answers
    tools
        .httpGet(`http://${ip}:${PORT}/api/info`, PROBE_TIMEOUT)
        .then(body => {
            let info: { vendor?: string; model?: string } | null = null;
            try {
                info = body ? JSON.parse(body) : null;
            } catch {
                // not JSON - not our device
            }
            if (info?.vendor !== 'FooBar Inc.') {
                return callback(null, false, ip);
            }
            options.newInstances.push({
                _id: tools.getNextInstanceID(adapterName, options),
                common: { name: adapterName },
                native: { host: ip },
                comment: { add: [info.model || 'Foo Bar', ip] },
            });
            callback(null, true, ip);
        })
        .catch(() => callback(null, false, ip));
}

export const type = ['ip'];
export const timeout = PROBE_TIMEOUT + 500;
```

### Regeln

- **Nur lesen.** Das Gerät identifizieren, sonst nichts: keine Schreibvorgänge, keine Anmeldeversuche, keine Standardpasswörter, nichts, was eine Einstellung oder einen Zustand des Geräts ändert.
- **So wenige Anfragen wie möglich stellen.** Eine Anfrage mit kurzem Timeout. Zuerst das günstigste Gerät prüfen. Geräte, auf denen bereits eine Instanz existiert, nicht weiter bearbeiten – der Adapter kommuniziert mit ihnen.
- **Seien Sie präzise.** Verwenden Sie ein Attribut, das nur dieses Gerät sendet: den Diensttyp plus einen TXT-Eintrag, eine Modellbezeichnung oder ein Herstellerfeld. Ein falsch positives Ergebnis schlägt jedem Benutzer mit einem solchen Gerät einen falschen Adapter vor.
- **In einem Angebot gibt es keine Geheimnisse.** Angebote werden gespeichert in `system.discovery` und im Dialogfeld angezeigt werden. Kopieren Sie keine Token oder Passwörter aus der Geräteantwort in `native` oder `comment` - den Benutzer mit einem `inputs` Feld vom Typ `password` stattdessen.
- **Abhängigkeiten.** HTTP durchläuft `tools.httpGet()`, `axios` oder `node:http` Fügen Sie kein Paket für eine einzelne Anfrage hinzu; ein optionales Paket ist `require()` d faul mit einem Ausweichplan.
- **Begründen Sie Ihre Antwort.** Notieren Sie, woher ein Dienstname, ein Port oder eine spezielle Zeichenfolge stammt (Adapterquelle, Herstellerdokumentation, Aufzeichnung von einem realen Gerät). Die nächste Person benötigt diese Information.

## Prüfen

Jedes Modul wird getestet in `test/adapters/<adaptername>.test.js` (Mokka, `node:assert` (keine andere Assertionsbibliothek). Geben Sie ihr die Daten, die ein reales Gerät liefert – die Ausgabe von `avahi-browse -r`, die SSDP-Header, die HTTP-Antwort – und decken Sie mindestens Folgendes ab:

- Das Gerät wurde gefunden und der Vorschlag sieht wie erwartet aus (`_id`, `native`, `comment`),
- Geräte, auf denen bereits eine Instanz existiert, werden übersprungen.
- Ein ähnliches Gerät anderer Art wurde **nicht** gefunden.

```js
const assert = require('node:assert');
const path = require('node:path');

const mod = require(path.join('..', '..', 'build', 'lib', 'adapters', 'myadapter.js'));

function freshOptions(existingInstances = []) {
    return {
        newInstances: [],
        existingInstances,
        enums: null,
        language: 'en',
        log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    };
}

// as announced by a Foo Bar 3000 (avahi-browse -r)
const device = {
    _addr: '192.168.1.50',
    _type: 'mdns',
    _mdns: {
        PTR: { name: '_foobar._tcp.local', data: 'Living room._foobar._tcp.local' },
        SRV: { name: 'Living room._foobar._tcp.local', data: 'foobar-3000.local' },
    },
};

function detect(dev, options, ip = '192.168.1.50') {
    return new Promise(resolve => mod.detect(ip, dev, options, (err, found) => resolve({ err, found })));
}

describe('myadapter detection', () => {
    it('proposes one instance per device', async () => {
        const options = freshOptions();
        const { found } = await detect(device, options);
        assert.strictEqual(found, true);
        assert.deepStrictEqual(options.newInstances[0].native, { host: '192.168.1.50' });
    });

    it('skips a device that already has an instance', async () => {
        const options = freshOptions([
            { _id: 'system.adapter.myadapter.0', common: { name: 'myadapter' }, native: { host: '192.168.1.50' } },
        ]);
        const { found } = await detect(device, options);
        assert.strictEqual(found, false);
        assert.strictEqual(options.newInstances.length, 0);
    });
});
```

Die Tests laden das **kompilierte** Modul von `build/` Also zuerst bauen:

```bash
npm install
npm run build:tsc          # TypeScript -> build/
npm run test:integration   # all tests in test/**/*.test.js
npm run lint
npm run check              # type check
node scripts/proposedAdapters.js   # is every proposed adapter in the latest repository? (network)
```

### Bei einer realen Installation

Führen Sie den Adapter mit [dem Entwicklungsserver](https://github.com/ioBroker/dev-server) oder in einer Testinstallation aus und legen Sie den Protokollierungsgrad fest. `discovery.0` Zu `debug` Starten Sie einen Scan über den Suchdialog. Ein Treffer wird angezeigt als

```
Test 192.168.1.50 myadapter DETECTED!
```

und der Vorschlag erscheint im Dialog. Während der Arbeit an einem Modul, `export const reloadModule = true;` Lädt es bei jedem Scan erneut – entfernen Sie es vor dem Pull Request.

## Pull-Anfrage

1. In `README.md` Fügen Sie das Gerät zu „Automatisch erkannt“ (alphabetisch) hinzu und erstellen Sie einen Änderungsprotokolleintrag unter `### **WORK IN PROGRESS**` Ganz oben im Änderungsprotokoll (fügen Sie die Überschrift hinzu, falls sie noch nicht vorhanden ist):

   ```
   * (your-github-name) Detect Foo Bar devices from their `_foobar._tcp` mDNS announcement and propose the myadapter adapter
   ```

2. Ändern Sie die Version nicht in `package.json` oder `io-package.json` - die Veröffentlichung der Entwickler.

3. Ein Adapter pro Pull-Anfrage. In der Beschreibung: Gerät und Firmware, mit denen der Test durchgeführt wurde, wie sich das Gerät meldet und auf welcher Aufzeichnung der Test basiert.