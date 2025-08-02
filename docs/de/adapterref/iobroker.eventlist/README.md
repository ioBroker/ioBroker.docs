---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: sHAusHqnsC9L3Psm1YNKfTCb9wPAMvs8RxjDlO7c35w=
---
![Logo](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![Anzahl der Installationen](http://iobroker.live/badges/eventlist-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)

# IoBroker.eventlist
![Testen und Freigeben](https://github.com/ioBroker/iobroker.eventlist/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/eventlist/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Event-List-Adapter für ioBroker
Ermöglicht die Definition der Zustände, die in der Ereignisliste protokolliert werden müssen.

Die Liste kann in Admin, Web, Vis angezeigt, als PDF gespeichert und als Material (noch nicht implementiert) werden.

Zusätzlich können Sie Events per Telegram oder WhatsApp versenden.

![Liste](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Alarmmodus
Die Ereignisse konnten nur im Alarmmodus generiert werden.
Der Alarmmodus konnte über die Variable `eventlist.X.alarm` gesteuert werden.

Darüber hinaus können Nachrichten an Messenger nur gesendet werden, wenn der Alarmmodus aktiviert ist.

Anwendungsfall:

- Beispielsweise kann ein Türsensor Nachrichten nur senden, wenn niemand zu Hause ist. Andernfalls werden die Ereignisse zum Öffnen der Tür nur in der Ereignisliste erfasst.

## Mögliche Präsentationen
### Im Admin als Registerkarte
Sie können die Veranstaltungsliste als Reiter im Admin aktivieren.

### Web
Die Ereignisliste könnte unter `http://<IP>:8082/eventlist/index.html` angezeigt werden. (für Instanzen > 0: `http://<IP>:8082/eventlist/index.html?X`, wobei X die Instanznummer ist)

### Vis-Widget
Die Ereignisliste kann als Vis-Widget angezeigt werden.

### PDF-Generierung
Es besteht die Möglichkeit, ein PDF-Dokument mit allen Ereignissen zu generieren.

Der Dokumenttitel kann das Erstellungsdatum enthalten, wenn Sie das Muster „`Event list on {{YYYY MM DD}}`“ einfügen.
Die genaue Beschreibung des Zeitformats finden Sie hier: https://momentjs.com/docs/#/displaying/format/

Die PDF-Generierung kann durch Schreiben eines `true` in `eventlist.0.triggerPDF` ausgelöst werden.

Der Zugriff auf die PDF-Datei ist möglich über:

- Web: `http://<IP>:8082/eventlist/eventlist/report.pdf` (für Instanzen > 0: `http://<IP>:8082/eventlist/eventlist/report-X.pdf`, wobei X die Instanznummer ist)
- admin: `http://<IP>:8081/files/eventlist/report.pdf` (für Instanzen > 0: `http://<IP>:8081/files/eventlist/report-X.pdf`, wobei X die Instanznummer ist)

**Die Symbole konnten im PDF nicht angezeigt werden.**

## Nachrichtenfeld
Benutzer können der Liste über JavaScript benutzerdefinierte Ereignisse hinzufügen:

```js
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text',
    id: 'ID.that.linked.with.this.event',  // optional
    ts: new Date('2020-09-25T16:11:00',    // optional. Default is Date.now()
    val: 5,                                // optional
    duration: 5                            // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', JSON.stringify({event: 'My custom text %s', val: 5}));
```

Der Benutzer kann eine formatierte JSON-Liste für eine bestimmte ID anfordern. Natürlich muss die ID zuvor in `eventlist` aktiviert werden.

```js
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1',
    //
});

// or
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

Benutzer können einige oder alle Ereignisse aus der Ereignisliste löschen.

```js
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

## Muster
In den Ereignistexten und in den Zustandstexten könnten folgende Muster verwendet werden:

- %s - Wert (`Status geändert auf %s` => `Status geändert auf 5`),
- %u - Einheit (`Status geändert auf %s%u` => `Status geändert auf 5%`),
- %n - Name (`%n hat den Status auf %s geändert` => `Gerät A hat den Status auf 5 geändert`),
- %t - Zeit (`Status hat den Status am %t geändert` => `Status hat den Status am Freitag, 16:32:00, geändert`),
- %r - relative Zeit (`Status hat den Status %r geändert` => `Status hat den Status vor 5 Sekunden geändert`),
- %d - Dauer (`Status war im vorherigen Zustand für %d` => `Status war 5 s im vorherigen Zustand`),
- %g - Wertdifferenz (`Status wurde am %g% geändert` => `Status wurde am 1% geändert`),
- %o - Werteunterschied (`Status hat Wert von %o auf % geändert` => `Status wurde um 1% geändert`)

## Verwendung mehrerer Instanzen im Web
Sie können beispielsweise die spezifische Liste für Instanz 2 anzeigen, wie `http://IP:8082/eventlist/index.htmlindex.html?2`.

Der erstellte Bericht wird für die Instanz 0 in `eventlist/report.pdf` gespeichert, für die Instanz 1 jedoch in `eventlist/report-1.pdf`.

## Aufgaben
- Ändern Sie die ursprünglichen Texte im PDF in die entsprechende Sprache
- Viele vordefinierte Symbole (mindestens 100)
- Material-Widget
- Senden Sie Nachrichten an Syslog (möglicherweise Splunk) https://www.npmjs.com/package/splunk-logging

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 2.1.0 (2025-05-20)
* (maeb3) Correction for handover of a message to pushover
* (bluefox) The packages were updated
* (bluefox) GUI migrated to vite

### 2.0.1 (2024-02-11)
* (bluefox) Translated the duration

### 2.0.0 (2023-10-12)
* (bluefox) Caught errors by subscribe
* (bluefox) Minimum node.js version is 16

### 1.2.4 (2023-05-17)
* (bluefox) Just the packages were updated

### 1.2.3 (2023-03-16)
* (bluefox) Corrected the edit of the event sources
* (bluefox) Added possibility to use default texts for strings values like for booleans

### 1.2.2 (2022-12-27)
* (bluefox) Corrected web page loading in web adapter

### 1.2.1 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.2.0 (2022-11-12)
* (bluefox) Fixed error with edit of the state settings
* (bluefox) Added possibility to use default texts for strings values like for booleans

### 1.1.1 (2022-10-12)
* (bluefox) Fixed icons of devices
* (bluefox) Migrated GUI to `mui5`
* (bluefox) Allowed the editing of list name
* (Hirsch-DE) corrected events without unit

### 1.0.1 (2022-06-22)
* (bluefox) Added preparations for ioBroker cloud

### 1.0.0 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 0.5.5 (2022-04-23)
* (Apollon77) Fix a crash issue
* (Apollon77) Add Sentry also for the Node.js part

### 0.5.4 (2022-02-14)
* (bluefox) Corrected the image paths

### 0.5.3 (2022-02-13)
* (bluefox) Corrected the error with "changes only" option
* (bluefox) Added possibility to use icons with custom events

### 0.4.4 (2021-06-24)
* (bluefox) Corrected the warning for js-controller 3.x

### 0.4.3 (2021-04-19)
* (bluefox) Added the support for Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to previous state
* (bluefox) Support for multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector

### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2025 ioBroker <dogafox@gmail.com>

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