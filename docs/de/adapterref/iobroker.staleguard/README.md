---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.staleguard/README.md
title: ioBroker.staleguard
hash: nYffV3xC8cUuRve7Yfi2SBGV5mrcg3DsKCRRL+ywmg8=
---
![Logo](../../../en/adapterref/iobroker.staleguard/admin/staleguard.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.staleguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.staleguard.svg)
![Anzahl der Installationen](https://iobroker.live/badges/staleguard-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/staleguard-stable.svg)
![NPM](https://nodei.co/npm/iobroker.staleguard.png?downloads=true)
![Test und Freigabe](https://github.com/typhosj/ioBroker.staleguard/workflows/Test%20and%20Release/badge.svg)

# ioBroker.staleguard

## Staleguard-Adapter für ioBroker

### Was es tut

Staleguard benachrichtigt Sie, wenn ein ioBroker-Zustand keine Daten mehr empfängt. Sie markieren einen beliebigen Zustand im Objektbrowser und legen eine Frist fest. Bleibt der Zustand länger inaktiv, löst Staleguard eine ioBroker-Benachrichtigung aus, kann die Adapterinstanz, die den Zustand verwaltet, neu starten und meldet, sobald wieder Daten eintreffen.

Es überwacht Zustände, nicht Geräte oder Adapter, daher funktioniert es mit jedem Adapter und mit Ihren eigenen Skripten. Typische Anwendungsfälle:

- Ein Cloud-Adapter speichert `info.connection` Das stimmt, aber seine Werte haben sich nicht mehr verändert;
- Ein Shelly-, Zigbee- oder Funksensor hat die Übermittlung eingestellt;
- Ein Skript hat aufgehört, seinen Herzschlagzustand zu schreiben.

### Aufstellen

1. Installieren Sie den Adapter und erstellen Sie eine Instanz. Die Standardeinstellungen sind für die meisten Systeme geeignet.
2. Öffnen Sie **Objekte** , klicken Sie auf das Zahnradsymbol (benutzerdefinierte Einstellungen) des Status, den Sie überwachen möchten, und aktivieren Sie die **Option „Aktiviert“** in der `staleguard.0` Abschnitt.
3. Legen Sie die Felder fest:

| Feld                                         | Reichweite                    | Standard             | Bedeutung                                                                                        |
| -------------------------------------------- | ----------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| Frist (Minuten)                              | 1–10080                       | 60                   | Alarm auslösen, wenn über einen längeren Zeitraum (max. 7 Tage) kein Lebenszeichen vorhanden ist |
| Lebenszeichen                                | Aktualisierung / Wertänderung | Gibt es Neuigkeiten? | Welcher Zeitstempel zählt, siehe unten.                                                          |
| Instanz wird bei jedem Ausfall neu gestartet | 0–5                           | 0                    | Die zugehörige Instanz wird neu gestartet, 0 = aus                                               |

Instanzeinstellungen:

| Einstellung              | Reichweite | Standard | Bedeutung                                             |
| ------------------------ | ---------- | -------- | ----------------------------------------------------- |
| Prüfintervall (s)        | 10–600     | 60       | wie oft alle überwachten Zustände überprüft werden    |
| Sperre neu starten (min) | 10–1440    | 60       | Mindestzeit zwischen zwei Neustarts derselben Instanz |

Ungültige länderspezifische Einstellungen werden nicht durch Standardwerte ersetzt: Die Uhr wird zurückgewiesen und als Benachrichtigung gemeldet, damit Sie den Fehler bemerken.

### Jede Aktualisierung oder Wertänderung

- **Bei jeder Aktualisierung** wird der Zeitpunkt des letzten Schreibvorgangs überprüft (`ts` Verwenden Sie es für Sensoren und Skripte, die nur dann schreiben, wenn sie etwas Neues haben.
- **Die Funktion „Wertänderung“** prüft den Zeitpunkt der letzten Wertänderung (`lc` Cloud-Adapter überschreiben oft bei jeder Abfrage denselben Wert mit einem neuen Zeitstempel, sodass eingefrorene Cloud-Daten nur in diesem Modus angezeigt werden.

Zwei Details entscheiden darüber, welcher Modus passt:

- Viele Adapter schreiben einen Zustand nur dann, wenn sich sein Wert ändert. Bei solchen Zuständen verhält sich **jede Aktualisierung** wie **eine Wertänderung** : Ein unveränderter Wert wird nicht gespeichert. `ts` Auch unberührt.
- Jeder Schreibvorgang zählt, auch ein Befehl (`ack: false`) aus einem Skript oder einer Visualisierung. Ein Befehl an ein nicht funktionierendes Gerät erhält dessen Zustand in beiden Modi aufrecht. Achten Sie daher auf den vom Gerät selbst gemeldeten Zustand.

Werte, die über einen längeren Zeitraum tatsächlich konstant bleiben (PV-Leistung nachts, Ladezustand eines geparkten Autos), verursachen Fehlalarme aufgrund von **Wertänderungen** . Bei eingefrorenen Cloud-Daten sollte der von der Cloud selbst gelieferte Zeitstempel beachtet werden (`lastSeen` oder ähnliches) mit **Wertänderung** stattdessen.

Nach dem Start von Staleguard erhält jeder überwachte Zustand seine volle Frist, bevor er gemeldet werden kann, sodass ein Neustart des Hosts keine Flut von Alarmen für Zustände auslöst, die bereits alt waren.

### Benachrichtigungen

Staleguard löst ioBroker-Benachrichtigungen im Bereich aus `staleguard` Sie erscheinen im Benachrichtigungsbereich des Administrators; [der Benachrichtigungsmanager](https://github.com/foxriver76/ioBroker.notification-manager) leitet sie an Telegram, E-Mail und andere Messenger weiter. Staleguard selbst enthält keinen Zustellungscode.

| Kategorie        | Schwere         | Wann                                                                                                             |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| Zustand schweigt | Alarm           | Ein Bundesstaat hat seine Frist verpasst; der letzte Neustartversuch hat nicht geholfen                          |
| Zurück zum Staat | Info            | Ein stiller Zustand sendet erneut.                                                                               |
| Uhrenproblem     | benachrichtigen | Der Zustand existiert nicht oder hat keinen Wert, eine Einstellung ist ungültig, ein Neustart ist fehlgeschlagen |

Ein Zustand wird nur einmal gemeldet, wenn er inaktiv wird und einmal, wenn er wieder aktiv wird, nicht bei jeder Überprüfung. Alle Zustände, die sich in derselben Überprüfung ändern, teilen sich eine Benachrichtigung pro Kategorie. Ein ausgefallenes Gateway mit 40 Sensoren sendet also nur eine Nachricht, nicht 40. Lange Listen werden nach 20 Einträgen abgebrochen, wobei die restlichen Einträge gezählt werden. Ein Zustand, der seinen ersten Wert erhält, wird nicht als wieder aktiv gemeldet, ebenso wenig wie ein inaktiver Zustand, der nur deshalb wieder in Ordnung ist, weil Sie seine Frist verlängert oder sein Lebenszeichen geändert haben. Inaktivitätsphasen von zwei Stunden und mehr werden in Stunden, ab zwei Tagen in Tagen angegeben. Die Texte sind auf deutschen Systemen auf Deutsch und ansonsten auf Englisch verfasst.

### Instanzneustarts

Bei mehr als 0 **Instanzneustarts pro Ausfall** startet Staleguard die Adapterinstanz neu, zu der der Status gehört (`<adapter>.<n>`):

- Der erste Neustart erfolgt, sobald der Zustand „still“ ist;
- Jeder weitere Neustart erfolgt eine volle Frist nach dem vorherigen, sofern der Status weiterhin stumm bleibt.
- Mehrere stille Zustände einer Instanz verursachen höchstens einen Neustart pro **Neustartsperre** ;
- Nach dem letzten Versuch erscheint eine weitere Benachrichtigung, dass keine weiteren Versuche mehr erfolgen.
- Eine deaktivierte Instanz wird niemals gestartet, und Staleguard startet sich niemals selbst neu;
- Ein fehlgeschlagener Neustart wird gemeldet und zählt dennoch als Versuch.

Neustarts sind nur für Zustände einer anderen Adapterinstanz möglich, nicht für `0_userdata`, `alias` oder `system` Staaten.

Für einen Adapter im Zeitplanmodus (er läuft nach einem Zeitplan, z. B. `ical` Bei einem Neustart wird der Adapter sofort neu gestartet. Da ein solcher Adapter seine Zustände nur während der Ausführung schreibt, sollte die Deadline deutlich über dem geplanten Intervall liegen; andernfalls löst die normale Pause zwischen zwei Ausführungen einen Alarm aus.

Ein Neustart betrifft immer die gesamte Instanz. Für einen von einem Skript geschriebenen Heartbeat in `javascript.0` Ein Neustart startet jedes Skript dieser Instanz neu; lassen Sie Neustarts deaktiviert, es sei denn, Sie wünschen dies.

### Staaten

| Zustand                              | Typ             | Bedeutung                                       |
| ------------------------------------ | --------------- | ----------------------------------------------- |
| `staleguard.0.summary.watched`       | Nummer          | Anzahl der überwachten Staaten                  |
| `staleguard.0.summary.stale`         | Nummer          | Anzahl der stillen Zustände                     |
| `staleguard.0.summary.list`          | JSON            | `[{id, name, status, since}]` alle Uhren        |
| `staleguard.0.watches.<id>.stale`    | boolescher Wert | `true` = stumm                                  |
| `staleguard.0.watches.<id>.status`   | Zeichenkette    | `ok`, `stale` oder `missing`                     |
| `staleguard.0.watches.<id>.since`    | Nummer          | Zeitpunkt der letzten Statusänderung            |
| `staleguard.0.watches.<id>.restarts` | Nummer          | Neustartversuche während des aktuellen Ausfalls |

`<id>` ist die überwachte Status-ID mit `.` ersetzt durch `__` und alle anderen Zeichen außer ASCII-Buchstaben und Ziffern, `_` Und `-` ersetzt durch `_` Alle Zustände sind schreibgeschützt. Wenn eine Überwachung deaktiviert wird, wird ihr Kanal entfernt.

### Grenzen

- Es werden maximal 5000 Staaten überwacht; weitere Einträge werden abgelehnt und gemeldet.
- Ein überwachtes Objekt, das zur Laufzeit gelöscht wird, zeigt `missing` Die Überwachungsliste wird erst nach einem Neustart von StaleGuard oder Änderungen an den benutzerdefinierten Einstellungen aktualisiert. Anschließend werden die Überwachung und der zugehörige Kanal ohne weitere Benachrichtigung entfernt.
- Ein Zeitstempel in der Zukunft (die Uhr wurde zurückgestellt) hält eine Uhr `ok` bis die Zeit sie einholt.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (typhosj) The restart setting warns that a restart affects the whole instance, e.g. every script of `javascript.0`
* (typhosj) README: set the deadline of a schedule-mode adapter well above its schedule interval

### 0.1.1 (2026-10-24)
* (typhosj) Log messages are always in English; notifications still use the system language
* (typhosj) Watch channel IDs contain only ASCII letters, digits, underscore and hyphen; affected channels are recreated once after the update

### 0.1.0 (2026-10-06)
* (typhosj) The watch list is reloaded only when Staleguard settings change
* (typhosj) Long silences are shown in hours or days
* (typhosj) No "State back" notification when only the deadline or sign of life was changed
* (typhosj) Clearer log line for a delayed restart

### 0.0.1 (2026-10-06)
* (typhosj) initial release

## License
MIT License

Copyright (c) 2026 typhosj <typhosj@gmx.de>

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