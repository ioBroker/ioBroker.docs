---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: ReLEKv245cIhYjwxe85LVmSsgtje35VZtkOmKfxTUGI=
---
![Logo](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![Anzahl der Installationen](http://iobroker.live/badges/eventlist-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.eventlist/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/eventlist/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)

# ioBroker.eventlist

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Event-List-Adapter für ioBroker

Ermöglicht die Definition der Zustände, die in der Ereignisliste protokolliert werden müssen.

Die Liste kann in Admin, Web, Vis angezeigt, als PDF gespeichert, Material (noch nicht implementiert).

Zusätzlich können Sie Veranstaltungen über Telegram oder WhatsApp versenden.

![Liste](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Einstellungen eines Zustands

Ein Status wird normalerweise in den Instanzeinstellungen zur Liste hinzugefügt, wo der gesamte Satz an Einstellungen verfügbar ist: Texte, Farben, Symbole, Messenger und die Standardmeldungen.

Die wichtigsten Einstellungen befinden sich ebenfalls in den benutzerdefinierten Einstellungen des Objekts selbst, genauer gesagt im Reiter hinter dem Zahnradsymbol in der Objektliste: der Ereignistext, die Option „Nur Änderungen“ sowie bei einem booleschen Zustand der Text und die Farbe für WAHR und FALSCH. Dies entspricht den Einstellungen, die der alte Dialog des Adapters bot, und die Daten werden an derselben Stelle gespeichert.`common.custom.<eventlist.X>` Daher können beide Wege kombiniert werden.

## Alarmmodus

Die Ereignisse konnten nur im Alarmmodus ausgelöst werden. Der Alarmmodus konnte über eine Variable gesteuert werden.`eventlist.X.alarm` Die

Darüber hinaus können Nachrichten an Messenger nur dann gesendet werden, wenn der Alarmmodus aktiviert ist.

Anwendungsfall:

- Beispielsweise kann der Türsensor nur dann Benachrichtigungen senden, wenn niemand zu Hause ist. Andernfalls werden Ereignisse über das Öffnen der Tür lediglich in der Ereignisliste erfasst.

## Nachrichten

Neben der Ereignisliste, die protokolliert, was passiert ist, verwaltet der Adapter eine _Statusliste_ : Eine Nachricht wird gesendet, wenn eine Bedingung erfüllt ist, sie wird gelöscht, wenn die Bedingung nicht mehr erfüllt ist, und sie wird erst aus der Liste entfernt, nachdem sie bestätigt wurde. Dies ist das übliche Verhalten eines Kontrollraums und etwas, was die Ereignisliste allein nicht leisten kann.

Verwechseln Sie dies nicht mit dem oben beschriebenen Alarmmodus. Der Alarmmodus ist ein Aktivierungsschalter, eine Meldung bedeutet eine Störung.

### Level

`fatal` ,`error` ,`warning` Und`info` Die beiden schwerwiegendsten müssen standardmäßig bestätigt werden, die beiden anderen nicht; dies kann durch jede Nachricht außer Kraft gesetzt werden.

### Die vier Zustände einer Nachricht

| Code | aktiv | anerkannt | in der Liste |
| ---- | ----- | --------- | ------------ |
| K    | Ja    | NEIN      | Ja           |
| KQ   | Ja    | Ja        | Ja           |
| KG   | NEIN  | NEIN      | Ja           |
| KGQ  | NEIN  | Ja        | NEIN         |

Eine Nachricht, die wiederholt eingeht, bevor sie bestätigt wurde, erzeugt keinen zweiten Eintrag, sondern zählt stattdessen ihre Wiederholungen. So kann ein inaktiver Kontakt die Liste nicht überfluten.

### Nachrichten aus einem Staat

Die Nachrichteneinstellungen befinden sich neben den anderen Einstellungen eines Status, in`common.custom.<eventlist.X>.message` :

```json
{
    "level": "error",
    "text": "%n too hot: %s%u",
    "condition": { "operator": ">", "limit": 90 },
    "requiresAck": true,
    "priority": 50,
    "hysteresis": 5,
    "delay": 3000,
    "delayGone": 60000,
    "group": "boiler"
}
```

`condition` ist entweder ein Vergleich mit`operator` Und`limit` für Zahlen oder ein`value` Das wirft Fragen zu Booleschen Operationen und Texten auf. Im Text werden die Muster erläutert.`%s` ,`%u` ,`%n` Und`%l` kann verwendet werden.

Bei Zuständen mit einer Aufzählung kann jeder einzelne Wert einen Wert tragen.`level` Stattdessen ist dann jeder Wert eine eigene Nachricht, und nur die des aktuellen Werts bleibt bestehen. Text, Gruppe und Verzögerungen werden von allen gemeinsam genutzt.

### Ruhe in der Liste

Vier Einstellungen sorgen für Lesbarkeit der Liste, alle optional:

| Einstellung        |                                                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delay`            | Die Bedingung muss so viele Millisekunden erfüllt sein, bevor die Nachricht eintrifft.                                                                                       |
| `delayGone`        | Dasselbe gilt fürs Fahren. Ein Fehler, der nur einen Moment anhält, wird nicht behoben.                                                                                      |
| `hysteresis`       | Nur für Zahlen gilt: Eine Aussage bleibt nur dann gültig, wenn der Wert den Grenzwert um diesen Betrag überschritten hat. Gegen einen Wert, der an seinem Grenzwert zittert. |
| flatternder Schutz | Für die gesamte Instanz festgelegt, standardmäßig mehr als zehn Übergänge in fünf Minuten                                                                                    |

Eine Nachricht, die in der Liste verbleibt, ist mit einem Symbol gekennzeichnet.`flapping` und trägt keine weiteren Einträge in die Ereignisliste ein, bis sich die Lage beruhigt hat. Nur der Beginn und das Ende der Unruhe werden festgehalten, sodass ein flüchtiger Kontakt zwei Zeilen und nicht zweihundert kostet.

### Gruppen

`group` ist ein freier Name. Nachrichten derselben Gruppe werden gemeinsam bestätigt, und die zuerst eingegangene Nachricht wird mit einem Sternchen gekennzeichnet.`first` in der Liste – in der Regel der Fehler, der Rest ist seine Folge.

```js
// acknowledge the whole group
setState('eventlist.0.messages.ack', 'boiler');
```

### Meldungen aus einem Skript

Nicht jeder Fehler hängt von einem einzelnen Signal ab. Ein Skript kann selbstständig eine Meldung auslösen und löschen, wobei die frei wählbare`id` hält es während seines gesamten Lebenszyklus zusammen:

```js
sendTo('eventlist.0', 'message', {
    id:    'heating.flow',
    level: 'error',
    text:  'Flow too cold although the pump runs',
});

// the same message goes again
sendTo('eventlist.0', 'message', { id: 'heating.flow', state: 'gone' });
```

Eine Nachricht von einem fremden System kann Folgendes beinhalten:`severity` von 1 bis 1000 anstatt einer Stufe, wie es bei OPC UA der Fall ist. Es wird einer Stufe zugeordnet: über 800`fatal` , über 500`error` , über 200`warning` der Rest`info` Die

### Anerkennung

```js
// one message, a group, or "*" for everything that can be acknowledged
setState('eventlist.0.messages.ack', 'heating.flow');

// with the name of the user, and with the number of acknowledged messages as an answer
sendTo('eventlist.0', 'ack', { id: '*', user: 'ben' }, result => console.log(result.acknowledged));

// read the standing messages
sendTo('eventlist.0', 'messages', null, result => console.log(JSON.stringify(result)));
```

### Während einer Wartung

Während jemand an der Heizung arbeitet, werden alle Meldungen angezeigt. Eine Nachricht oder eine ganze Gruppe kann vorübergehend aus der Liste entfernt werden:

```js
// half an hour of quiet for the group "boiler"
setState('eventlist.0.messages.suppress', 'boiler:30');

// the same with the message API, and "*" suppresses everything
sendTo('eventlist.0', 'suppress', { target: 'boiler', minutes: 30 });

// let it back in
setState('eventlist.0.messages.suppress', 'boiler:0');
```

Ohne Angabe einer Dauer wird die in den Instanzeinstellungen festgelegte Dauer verwendet, standardmäßig eine Stunde. Die Unterdrückung dauert maximal einen Monat. Dieses Ende ist wichtig: Eine dauerhaft unterdrückte Nachricht ist ein Fehler, der niemandem mehr auffällt. Eine unterdrückte Nachricht funktioniert intern weiterhin; sie wird lediglich nicht mehr in der Liste, den Zählern und der Ereignisliste angezeigt. Beginn und Ende der Unterdrückung werden in die Ereignisliste eingetragen, sodass die Lücke im Verlauf einen Grund hat.

### Die Tabelle im Adminbereich

Die Instanzeinstellungen enthalten einen Tab **„Nachrichten“** mit folgenden Informationen: Ebene, kombinierter Status`K` /`KQ` /`KG` Die Tabelle zeigt die Dauer des Vorgangs, den Text, den Wert, die Häufigkeit, die Gruppe und die Status-ID an. Die erste Nachricht einer Gruppe und eine unregelmäßige Nachricht werden markiert, die aktuell unterdrückten Nachrichten werden über der Tabelle angezeigt, und einzelne Nachrichten oder alle gleichzeitig können von dort aus bestätigt werden. Die Reihenfolge entspricht der einer Leitstelle: Ebene, dann Priorität, dann Zeit.

### Das Horn

`messages.horn` ist wahr, solange eine nicht bestätigte Nachricht einer konfigurierbaren oder schwerwiegenderen Stufe vorliegt, standardmäßig von`error` Es ist für eine Sirene, eine Lampe oder eine Fliesenfarbe gedacht und verstummt mit der Bestätigung, nicht mit der Reparatur. Meldungen, die niemand bestätigen muss, ertönen nie.

### Staaten

| Zustand                            |                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `messages.list`                    | Die stehenden Nachrichten, sortiert und bereit zur Anzeige                                                   |
| `messages.raw`                     | Die gleichen Nachrichten mit ihrem internen Zustand bleiben auch nach einem Neustart erhalten.               |
| `messages.count`                   | Wie viele Nachrichten stehen                                                                                 |
| `messages.countFatal` …`countInfo` | gleich pro Stufe                                                                                             |
| `messages.unacknowledged`          | Wie viele von ihnen hat niemand anerkannt?                                                                   |
| `messages.highest`                 | Die höchste Stehplatzstufe, leer, wenn nichts steht                                                          |
| `messages.horn`                    | Eine nicht bestätigte Nachricht von der konfigurierten Ebene auf den Ständen                                 |
| `messages.ack`                     | Hier schreiben, um den Erhalt einer Nachricht, einer Gruppe oder eines anderen Ereignisses zu bestätigen `*` |
| `messages.suppress`                | Hier schreiben, um zu unterdrücken, wie `target:minutes`                                                     |
| `messages.suppressed`              | was im Moment unterdrückt wird und bis wann                                                                  |

Jeder Übergang erzeugt zudem einen normalen Eintrag in der Ereignisliste mit Ebene, Nachrichten-ID und Beschreibung des Ereignisses. So bleibt der Verlauf vollständig und alle bestehenden Ansichten, das PDF und die Messenger funktionieren weiterhin.

Nach einem Neustart werden die Bedingungen erneut geprüft. Eine Nachricht, deren Bedingung nicht mehr erfüllt ist, wird in diesem Moment gesendet und bleibt unbestätigt in der Liste, da sonst niemand den Fehler bemerken würde. Nachrichten aus einem Skript können nicht erneut geprüft werden; nur das Skript kennt ihren Zustand, daher bleiben sie unverändert. Laufzeitverzögerungen überstehen einen Neustart nicht, sie beginnen von Neuem; Unterdrückungen hingegen laufen bis zu ihrem Ende weiter.

## Mögliche Präsentationen

### Im Admin-Tab

Sie können die Ereignisliste als Registerkarte im Adminbereich aktivieren.

### Web

Die Ereignisliste könnte angezeigt werden unter`http://<IP>:8082/eventlist/index.html` (für Instanzen > 0:`http://<IP>:8082/eventlist/index.html?X` (wobei X die Instanznummer ist)

### Vis-Widget

Die Ereignisliste kann als Vis-Widget angezeigt werden.

### Gerätemanager

Der Geräte-Manager zeigt eine Kachel mit dem neuesten Ereignis an. Ein Klick darauf öffnet die vollständige Liste in einem Dialogfeld. Die Kachel kann auf die Ereignisse eines bestimmten Zustands beschränkt werden, sodass jedes Gerät seine eigene Kachel haben kann.

### PDF-Generierung

Es besteht die Möglichkeit, ein PDF-Dokument mit allen Ereignissen zu generieren.

Der Dokumenttitel kann das Erstellungsdatum enthalten, wenn Sie das entsprechende Muster darin einfügen:`Event list on {{YYYY MM DD}}` Die genaue Beschreibung des Zeitformats finden Sie hier: <https://momentjs.com/docs/#/displaying/format/>

Die Generierung von PDF kann durch Schreiben eines`true` hinein`eventlist.0.triggerPDF` Die

Die PDF-Datei kann über folgende Wege aufgerufen werden:

- Web:`http://<IP>:8082/eventlist/eventlist/report.pdf` (für Instanzen > 0:`http://<IP>:8082/eventlist/eventlist/report-X.pdf` , wobei X die Instanznummer ist)
- Admin:`http://<IP>:8081/files/eventlist/report.pdf` (für Instanzen > 0:`http://<IP>:8081/files/eventlist/report-X.pdf` (wobei X die Instanznummer ist)

**Die Symbole konnten in der PDF-Datei nicht angezeigt werden.**

## Nachrichtenfeld

Benutzer können der Liste über JavaScript benutzerdefinierte Ereignisse hinzufügen:

```js
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text', 
    id: 'ID.that.linked.with.this.event',  // optional 
    ts: new Date('2020-09-25T16:11:00'),    // optional. Default is Date.now()
    val: 5,                                // optional 
    duration: 5,                           // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', JSON.stringify({event: 'My custom text %s', val: 5}));
```

Der Benutzer kann eine formatierte JSON-Liste für eine bestimmte ID anfordern. Die ID muss natürlich aktiviert sein.`eventlist` vor.

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

Benutzer können einzelne oder alle Ereignisse aus der Ereignisliste löschen.

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

- %s - Wert (`State changed to %s` =>`State changed to 5` ),
- %u - Einheit (`State changed to %s%u` =>`State changed to 5%` ),
- %n - Name (`%n changed state to %s` =>`Device A changed state to 5` ),
- %t - Zeit (`State changed state on %t` =>`State changed state on Sep Fr, 16:32:00` ),
- %r - relative Zeit (`State changed state %r` =>`State changed state 5 seconds ago` ),
- %d - Dauer (`State was in previous state for %d` =>`State was in previous state for 5s` ),
- %g – Wertdifferenz, also der neue Wert minus der vorherige. Nur für Zustände vom Typ`number` (`State was changed on %g%` =>`State was changed on 1%` ),
- %o - vorheriger Wert (`State changed value from %o to %s` =>`State changed value from 4 to 5` )

## Nutzung mehrerer Instanzen im Web

Beispielsweise können Sie die spezifische Liste für Instanz 2 anzeigen, wie zum Beispiel`http://IP:8082/eventlist/index.html?2` Die

Der generierte Bericht wird beispielsweise unter 0 gespeichert.`eventlist/report.pdf` , aber zum Beispiel 1 in`eventlist/report-1.pdf` Die

## Todo

- Ändern Sie die Anfangstexte in der PDF-Datei in die entsprechende Sprache.
- Viele vordefinierte Symbole (mindestens 100)
- Senden Sie Meldungen an syslog (ggf. Splunk) <https://www.npmjs.com/package/splunk-logging>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Added devices widget
* (@GermanBluefox) Added messages with levels, coming and going, and acknowledgement
* (@GermanBluefox) Added delays, hysteresis, groups, flapping protection, suppression and horn for the messages
* (@GermanBluefox) Added the tab with the standing messages and the acknowledgement in the admin
* (@GermanBluefox) Brought the settings of a state back into the custom tab of the objects, as a JSON config component
* (@GermanBluefox) Fixed the alarm mode, that was switched off by every restart

### 3.0.0 (2026-09-04)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) A Minimum node.js version is 22
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added blockly und vis-2 widgets (only for vis-2 >= 2.20.0)

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
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.2.2 (2022-12-27)
* (bluefox) Corrected web page loading in web adapter

### 1.2.1 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.2.0 (2022-11-12)
* (bluefox) Fixed error with edit of the state settings
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.1.1 (2022-10-12)
* (bluefox) Fixed icons of devices
* (bluefox) Migrated GUI to `mui5`
* (bluefox) Allowed the editing of list name
* (Hirsch-DE) corrected events without a unit

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
* (bluefox) Moved the duration to the previous state
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

Copyright (c) 2020-2026 ioBroker <dogafox@gmail.com>

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