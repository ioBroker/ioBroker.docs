---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-light?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-light?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-light?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-light?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-light?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-light/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-light.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-light-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-light-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
---
![Logo](../../admin/awtrix-light.png)

# ioBroker.awtrix-light

## Anforderungen

- nodejs 18 (oder neuer)
- js-controller 6.0.0 (oder neuer)
- Admin Adapter 6.6.0 (oder neuer)
- _Awtrix 3_ Gerät mit Firmware-Version _0.98_ (oder neuer) - z.B. Ulanzi TC001

Hier kaufen: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) oder hier: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (Affiliate-Links)

## Erste Schritte

1. Flashe die Firmware auf das Gerät und füge es zu deinem lokalen Netzwerk per WLAN hinzu - siehe [Dokumentation](https://blueforcer.github.io/awtrix3/#/quickstart)
2. Installiere den awtrix-light Adapter im ioBroker (und erstelle eine neue Instanz)
3. Öffne die Instanz-Konfiguration und hinterlege die IP-Adresse des Gerätes im lokalen Netzwerk

## FAQ (häufig gestellte Fragen)

**Kann ich den Adapter verwenden, um die Standard-Apps zu deaktivieren (wie den Batteriestand oder die Sensordaten)?**

Nein, dieses Feature wurde in der awtrix-light Firmware mittlerweile entfernt. Nutze das Menu auf dem Gerät selbst um diese Apps dauerhaft zu verstecken.

**Kann man Logikwerte (true/false) mit anderen Texten ersetzen?**

Erstelle dafür einfach einen Alias in `alias.0` vom Typ `string` (Zeichenkette) und konvertiere den Logikwert mit einer Lesefunktion in einen beliebigen anderen Wert (beispielsweise `val ? 'offen' : 'geschlossen'`). *Das ist ein Standard-Feature vom ioBroker und hat nichts direkt mit diesem Adapter zu tun.*

**Wie kann ich zur aktuellsten Firmware-Version wechseln?**

Nutze einfach das [Menu auf dem Gerät](https://blueforcer.github.io/awtrix3/#/onscreen) um zum Punkt `update` zu navigieren. Den Rest erledigt die Uhr dann selbst. Es ist nicht nötig, den Web-Flasher erneut zu verwenden (außer, ein Firware-Update erfordert dies explizit).

**Das Gerät wird heiß während es geladen wird.**

Das Hardware-Design ist leider nicht optimal. Es wird empfohlen, ein möglichst schwaches Netzteil zu verwenden, welches maximal 1A liefern kann.

**Kann man den Akku aus dem Gerät entfernen?**

Ja, es gibt diese Möglichkeit. Allerdings muss das Gerät dazu mit einem Heißluftföhn geöffnet werden, da die Frontscheibe verklebt ist. Außerdem ist es nötig einen [Step-Down-Converter zu verlöten](https://github.com/Blueforcer/awtrix3/issues/67#issuecomment-1595418765), damit alles funktioniert.

**Kann man die Apps auf dem Gerät anders sortieren?**

Im Standard werden die Apps in die gleichen Reihenfolge angezeigt, wie sie auch in den Instanz-Einstellungen angelegt wurden. Bewege einfach die Apps nach oben oder unten um die Position zu verändern. Apps mit historischen Daten / Graphen sind dabei hinter den anderen benutzerdefinierten Apps positioniert.

Sollen eigene Positionen festgelegt werden, können die benutzerdefinierten Positionen in den Experten-Optionen aktiviert werden. Danach ist es möglich, für jede App eine numerische Position zu vergeben.

**Kann ein anderes Zahlenformat hinterlegt werden?**

Alle Zustände vom Typ Zahl (common.type `number`) werden so formatiert, wie es im ioBroker konfiguriert ist. Das Standard-Format des Systems kann mit einer Experten-Einstellung überschrieben werden (seit Adapter-Version 0.7.1). Zahlen können in den folgenden Formaten dargestellt werden:

- System-Standard
- `xx.xxx,xx`
- `xx,xxx.xx` (US-Format)
- `xxxxx,xx`
- `xxxxx.xx` (US-Format)

**Kann man den Zugriff auf die Weboberfläche der awtrix-light beschränken?**

Ja, seit Firware-Version 0.82 kann der Zugriff mit einem Benutzernamen und Passwort geschützt werden. Seit Adapter-Version 0.8.0 können diese Benutzerdaten ebenfalls in den Instanz-Einstellungen hinterlegt werden.

**Wie funktioniert die halten-Option bei Benachrichtigungen?**

Wenn eine Benachrichtigung mit der Option `hold: true` gesendet wird, bleibt der Text auf dem Display so lange stehen, bis die Benachrichtigung bestätigt wird. Das kann entweder über den mittleren Taster auf dem Gerät passieren, oder indem der Zustand `notification.dismiss` auf `true` gesetzt wird.

**Einige Zustandsänderungen werden nich sofort dargestellt.**

Falls ein Zustand sehr oft geändert wird (z.B. jede Sekunde), werden einige Änderungen ignoriert und nicht übertragen, damit die Last auf dem Gerät gering gehalten wird. Dafür hat jede App eine eigene "Block-Zeit", welche global in den Instanz-Einstellungen konfiguriert werden kann. Die Standard-Zeit ist 3 Sekunden. Es ist nicht empfohlen, ein Wert kleiner als 3 zu setzen.

## Identische Apps auf mehreren Geräten

Falls mehrere awtrix-light Geräte mit den gleichen Apps angesteuert werden sollen, **muss eine eigene Instanz für jedes Gerät angelegt werden.** Allerdings kann in den Instanzeinstellungen der weiteren Geräte dann festgelegt werden, dass die Apps aus einer anderen Instanz übernommen werden sollen.

Beispiel

1. Konfiguriere alle gewünschten Apps in der Instanz `awtrix-light.0`
2. Lege eine weitere Instanz für das zweite Gerät an (`awtrix-light.1`)
3. Wähle `awtrix-light.0` in den Instanz-Einstellungen von `awtrix-light.1` um die gleichen Apps auf dem zweiten Gerät darzustellen

Seit Version 0.15.0 (und neuer) wird die Sichtbarkeit von benutzerdefinierten Apps und alle Inhalte der Experten-Apps auch auf andere Geräte übertragen, welche die App-Einstellungen kopieren. Im Beispiel oben werden z.B. die Apps der Instanz `awtrix-light.1` ebenfalls versteckt, sobald die Sichtbarkeit der App in der Hauptinstanz `awtrix-light.0` geändert wird. Das gleiche gilt für alle Inhalte der Experten-Apps.

## Blockly und JavaScript

`sendTo` / messagebox kann genutzt werden um

- eine einmalige Notification / Benachrichtigung darzustellen (mit Text, Ton, Symbol, ...)
- einen Ton abzuspielen

### Benachrichtigungen

Sende eine einmalige Benachrichtigung an das Gerät:

```javascript
sendTo('awtrix-light.0', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true, hold: false }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Das Nachrichten-Objekt unterstützt dabei alle Optionen, welche in der Firmware verfügbar sind. Siehe [Dokumentation](https://blueforcer.github.io/awtrix3/#/api?id=json-properties) für Details.

*Außerdem kann ein Blockly-Block verwendet werden um die Benachrichtigung zu erstellen (dort werden nicht alle verfügbaren Optionen angeboten).*

### Töne

Um eine (vorher angelegte) Ton-Datei abzuspielen:

```javascript
sendTo('awtrix-light.0', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Das Nachrichten-Objekt unterstützt dabei alle Optionen, welche in der Firmware verfügbar sind. Siehe [Dokumentation](https://blueforcer.github.io/awtrix3/#/api?id=sound-playback) für Details.

*Es kann ein Blockly-Block verwendet werden, um diesen Aufruf noch einfacher zu verwenden.*

Um einen eigenen Klingelton abzuspielen:

```javascript
sendTo('awtrix-light.0', 'rtttl', 'Beep: d=32,o=7,b=120: a,P,c#', (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

## Apps

**App-Namen dürfen nur Kleinbuchstaben (a-z) enthalten und müssen eindeutig sein. Keine Zahlen, keine Sonderzeichen, keine Leerzeichen.**

Die folgenden App-Namen sind von den internen apps reserviert und können nicht verwendet werden: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`.

- Mit dem `activate`-Zustand jeder App kann diese in den Vordergrund geholt werden
- Diese Zustände haben die Rolle `button` und erlauben nur den boolschen Wert `true` (andere Werte führen zu einer Warnung im Log)

Jede selbst angelegte App hat einen Zustand mit der ID `apps.<name>.visible`. Wenn dieser Zustand auf `false` (falsch) gesetzt wird, wird die App vom Gerät entfernt und nicht mehr dargestellt. Dies ist nützlich, um bestimmte Apps z.B. nur tagsüber oder in bestimmten Zeiträumen darzustellen.

### Benutzerdefinierte Apps

- `%s` ist ein Platzhalter für den Zustands-Wert
- `%u` ist ein Platzhalter für die Einheit des Zustandes (z.B. `°C`)

Diese Platzhalter können in den Texten benutzerdefinierter Apps verwendet werden (z.B. `Außentemperatur: %s %u`).

**Benutzerdefinierte Apps stelle nur bestätigte Werte dar! Steuere-Werte mit `ack: false` werden ignoriert (um doppelte Anfragen an das Gerät zu vermeiden und um sicherzustellen, dass die dargestellten Werte gültig sind)!**

Der ausgewählte Zustand sollte vom Datentyp Zeichenkette `string` oder Zahl `number` sein. Andere Typen (wie `boolean`) werden auch unterstützt, aber generieren Warnungen. Es wird empfohlen, einen Alias mit einer Konvertierungsfunktion zu verwenden um Logikwerte mit Text zu ersetzen (z.B. `val ? 'an' : 'aus'` oder `val ? 'offen' : 'geschlossen'`). Siehe ioBroker-Dokumentation für Details. *Dieses Standard-Feature hat nichts mit dem Adapter zu tun.*

Die folgenden Kombinationen führen zu einer Warnung im Log:

- Eine benutzerdefinierte App mit einer gewählten Objekt-ID enthält nicht den Platzhalter `%s` im Text
- Eine benutzerdefinierte App wird mit einer gewählten Objekt-ID ohne Einheit in `common.unit` angelegt, aber `%u` ist im Text enthalten
- Es wird keine Objekt-ID ausgewählt, aber `%s` im Text verwendet

### Historische Apps / Graphen

TODO

**In den Graphen werden nur bestätigte Werte dargestellt. Steuere-Werte mit `ack: false` werden gefiltert und ignoriert!**

### Experten Apps

Experten-Apps sind seit Adapter-Version 0.10.0 verfügbar. Diese Apps erlauben es, alle Werte manuell über Zustände zu setzen und diese mit eigenen Logiken zu steuern. Um eine neue Experten-App zu erstellen:

- Öffne das Tab Expertenoptionen in den Instanz-Einstellungen
- Erstelle eine neue Experten-App mit einem frei wählbaren Namen (z.B. `test`)
- Speichere die Instanz-Einstellungen

Danach werden alle steuerbaren Zustände der App `test` unter `awtrix-light.0.apps.test` erstellt. Um die jeweiligen Werte einer App zu verändern, kann einfach der Wert der Zustände `icon`, `text`, usw. mit eigenen Scripts (z.B. JavaScript oder Blockly) gesetzt werden.

Beispiel: [Wetter-App](weather-app.md)

## Native Apps verstecken

Um die Standard-Apps auf dem Gerät zu verstecken (wie die Temperatur oder die Luftfeuchtigkeit): Nutze das Menu auf dem Gerät selbst! Siehe [Dokumentation](https://blueforcer.github.io/awtrix3/#/onscreen) für Details.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) Improved error handling when adapter is not ready (starting)

### 1.6.0 (2025-01-27)

Updated recommended firmware version to 0.98

* (@klein0r) Updated dependencies

### 1.5.0 (2025-01-07)

Updated recommended firmware version to 0.97

* (@klein0r) Updated dependencies

### 1.4.1 (2024-11-20)

NodeJS >= 20.x and js-controller >= 6 is required

### 1.4.0 (2024-11-20)

* (@klein0r) Added support for notification manager

### 1.3.0 (2024-08-01)

* (@klein0r) Added sentry plugin for error reporting

## License

MIT License

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.