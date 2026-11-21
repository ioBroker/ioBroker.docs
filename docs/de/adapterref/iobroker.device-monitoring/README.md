---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.device-monitoring/README.md
title: ioBroker.device-monitoring
hash: YUOJQix1fj45AU2xxaeXsrh/JtljYPWcEFUc0SlmZ90=
---
![Logo](../../../en/adapterref/iobroker.device-monitoring/admin/device-monitoring.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.device-monitoring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.device-monitoring.svg)
![Anzahl der Installationen](https://iobroker.live/badges/device-monitoring-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/device-monitoring-stable.svg)
![NPM](https://nodei.co/npm/iobroker.device-monitoring.png?downloads=true)
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.device-monitoring/workflows/Test%20and%20Release/badge.svg)

# ioBroker.device-monitoring

## Geräteüberwachungsadapter für ioBroker

Überwacht die von Ihnen definierten Gerätezustände und erstellt Warnungen und Alarme.

<img width="1037" height="899" alt="image" src="https://github.com/user-attachments/assets/8ae6d145-90eb-437f-89b5-ce823d63f210" />

## Standardausgabekategorien

Die Standardausgabekategorien sind wie folgt zugeordnet:

| Ereignis                                   | Kategorie |
| ------------------------------------------ | --------- |
| Warnschwelle erreicht                      | `warnung` |
| Alarmgrenze erreicht                       | `alarm`   |
| Zeitüberschreitung bei Quellaktualisierung | `alarm`   |
| Quelle fehlt oder ist ungültig             | `warnung` |
| Der Zustand normalisierte sich.            | `info`    |

## Benachrichtigungsstufen pro Bundesstaat

Dies bietet die Möglichkeit, von der Standardbenachrichtigung abzuweichen (zum Beispiel vorübergehend).

Jeder überwachte Zustand verfügt über sechs beschreibbare Zustände. `devices.<deviceId>.<stateId>.level`:

| Zustand        | Ereignis                                                  |
| -------------- | --------------------------------------------------------- |
| `warning`      | Warnschwelle erreicht                                     |
| `alarm`        | Alarmgrenze erreicht                                      |
| `timeout`      | Zeitüberschreitung bei Quellaktualisierung                |
| `invalid`      | Quell-ID fehlt oder wurde gelöscht                        |
| `invalidValue` | Die Quelle existiert, liefert aber einen ungültigen Wert. |
| `recovered`    | Der Zustand normalisierte sich.                           |

Jeder Levelzustand akzeptiert folgende Werte:

| Wert              | Bedeutung                                                             |
| ----------------- | --------------------------------------------------------------------- |
| `0` — Standard    | Verwenden Sie die Standardbenachrichtigungskategorie des Ereignisses. |
| `1` - Deaktiviert | Dieses Ereignis unterdrücken                                          |
| `2` — Info        | Senden Sie die Veranstaltung mit dem `info` Kategorie                  |
| `3` — Warnung     | Senden Sie die Veranstaltung mit dem `warnung` Kategorie               |
| `4` — Alarm       | Senden Sie die Veranstaltung mit dem `alarm` Kategorie                 |

Der Adapter erkennt erkannte Werte von `0` Zu `4` indem der ausgewählte Wert zurückgeschrieben wird `ack = true` Die

## `info.message` Zustand

Nur lesbar `info.message` Der Zustand enthält eine JSON-Zeichenkette für das letzte Benachrichtigungsereignis. Jedes neue Ereignis ersetzt das vorherige; dieser Zustand ist keine Historie. Ereignisse werden hier auch dann gespeichert, wenn Benachrichtigungen über … gesendet werden. `notify` ist deaktiviert. Ein Level ist auf `Disabled` unterdrückt das Ereignis vollständig.

Das JSON-Objekt enthält folgende Felder:

| Feld                     | Beschreibung                                                                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                   | Ursprünglicher Ereignistyp: `warning`, `alarm`, `timeout`, `invalidSource`, `invalidValue` oder `recovered`; wiederkehrende Zusammenfassungen verwenden `summary` |
| `category`               | Ausgabebenachrichtigungskategorie nach Anwendung der Stufe: `info`, `warnung` oder `alarm`                                                                        |
| `title`                  | Gerenderter Benachrichtigungstitel                                                                                                                               |
| `message`                | Benachrichtigungsnachricht gerendert                                                                                                                             |
| `deviceId`, `deviceName` | Geräte-ID und Anzeigename                                                                                                                                        |
| `stateId`, `stateName`   | Überwachter Statusbezeichner und Anzeigename                                                                                                                     |
| `function`               | Name der konfigurierten Überwachungsfunktion; leer, wenn keine Funktion zugewiesen ist.                                                                          |
| `sourceId`               | Quellstatus-ID                                                                                                                                                   |
| `remark`                 | Konfigurierter Kommentar für den überwachten Zustand                                                                                                             |
| `value`, `unit`          | Aktueller Quellwert und seine Einheit                                                                                                                            |
| `previousValue`          | Vorheriger numerischer Wert für eine änderungsbasierte Warnung oder einen Alarm; wird bei anderen Ereignissen weggelassen.                                       |
| `triggeredAt`            | Ereigniszeit als Unix-Zeitstempel in Millisekunden                                                                                                               |
| `lastUpdate`             | Letzte Aktualisierungszeit der Quelle als Unix-Zeitstempel in Millisekunden, oder `null`                                                                         |
| `timeoutMinutes`         | Konfigurierte Timeout-Dauer; nur bei Timeout-Ereignissen vorhanden.                                                                                              |

Der `type` Das Feld behält seinen ursprünglichen Ereignistyp bei, wenn seine Benachrichtigungskategorie um eine Ebene geändert wird. `info.message` Der Zustand wird anerkannt (`ack = true`) durch den Adapter.

## Wiederkehrende Erinnerungen

Im Bereich „Benachrichtigungen“ können wiederkehrende Erinnerungen aktiviert werden. Der Zeitplan wird mit einem Cron-Selektor konfiguriert, und die ausgewählte `info`, `warnung` oder `alarm` Die Kategorie wird für die Zusammenfassung verwendet. Zu jedem geplanten Zeitpunkt prüft der Adapter alle überwachten Zustände und sendet für jeden aktuell nicht normalen Zustand eine Zusammenfassung (`warning`, `alarm`, `timeout`, `invalid` oder `invalidValue` Wenn alle Zustände normal sind, wird keine Benachrichtigung gesendet. Startet der Adapter nach einem geplanten Erfassungsstart, aber während der konfigurierten Dauer noch läuft, wird der verpasste Erfassungsstart mit seiner ursprünglichen Endzeit wiederhergestellt. Die Zusammenfassung wird gespeichert in `info.message` enthält nur `type`, `category`, `title` Und `message` Die

## Reaktionszeit begrenzen

Warn- und Alarmgrenzwerte können optional mit einer Reaktionszeit in Minuten versehen werden. Der entsprechende Status und die Benachrichtigung werden erst aktiv, wenn der Grenzwert über die konfigurierte Dauer überschritten wird. Kehrt der Wert vorher in den Normalbereich zurück, wird keine Warnung oder kein Alarm ausgelöst. Der Adapter plant die Aktivierung zum exakten Fälligkeitszeitpunkt, anstatt auf die periodische Aktualisierung zu warten. Der Beginn einer drohenden Grenzwertüberschreitung wird unterhalb der Expertendaten des überwachten Zustands gespeichert und bleibt auch nach Neustarts des Adapters erhalten. Ändert sich ein Quellzustand, während der Adapter gestoppt ist und beim Neustart noch aktiv ist, wird die Änderung erfasst und kann einer aktiven Benachrichtigungssammlung hinzugefügt werden.

Vorlagen für Warn- und Alarmmeldungen können verwendet werden `{{warningResponseTime}}` Und `{{alarmResponseTime}}` Jeder Platzhalter enthält ein optionales lokalisiertes Suffix wie z. B. ` (Ansprechzeit 5 Minuten)` und ist leer, wenn keine positive Reaktionszeit konfiguriert ist. Änderungsbasierte Warn- und Alarmmeldungen liefern ebenfalls Informationen. `{{previousValue}}` Und `{{changeFrom}}` Letzteres ist ein optionales lokalisiertes Suffix wie z. B. ` (vorheriger Wert: 1 °C)` und ist für andere Ereignistypen leer. Standardmäßig wird das Suffix des vorherigen Werts ganz am Ende der Nachricht angehängt, zum Beispiel: `... ({{remark}}){{warningResponseTime}}{{changeFrom}}` Die

Ungültige Quellen und ungültige Werte verwenden die globale `invalidResponseTimeSeconds` Einstellung (Standard: 10 Sekunden). Der ungültige Status und die zugehörige Benachrichtigung werden erst nach Ablauf dieser Zeitspanne aktiv; stellen Sie ihn entsprechend ein. `0` zur sofortigen Aktivierung. Vorlagen für ungültige Quellen und ungültige Werte können verwendet werden. `{{invalidResponseTime}}` für das lokalisierte Antwortzeit-Suffix.

### Beispiel

`http://192.168.0.222:8081/#tab-objects/select/device-monitoring.0.info.message`

```

{
  "type": "timeout",
  "category": "alarm",
  "title": "Aktualisierungs-Timeout: Timmerflotte Schlafzimmer - Temperatur",
  "deviceId": "device_002",
  "deviceName": "Timmerflotte Schlafzimmer",
  "stateId": "timmerflotte_schlafzimmer",
  "stateName": "Temperatur",
  "sourceId": "lorawan.0.bridge.devices.70c0cc1b11042a812825444dc65d04f5.sensor.schlafzimmer_timmerflotte_temperatur",
  "remark": "",
  "value": 21.39,
  "unit": "°C",
  "triggeredAt": 1790071578722,
  "lastUpdate": 1790071509083,
  "timeoutMinutes": 1,
  "message": "Der State Temperatur vom Gerät Timmerflotte Schlafzimmer hat sich mindestens 1 Minuten nicht gemeldet. Letzte Aktualisierung: 2026-09-22 12:05:09.083"
}

```

### Benachrichtigungsstufen im Benachrichtigungsmanager verwenden

<img width="797" height="331" alt="image" src="https://github.com/user-attachments/assets/1772680b-68ab-45d3-947e-4d43610c92b4" />

### Benachrichtigungsstufen in (Blockly-)Skripten verwenden

<img width="1232" height="725" alt="image" src="https://github.com/user-attachments/assets/2d1229ec-ed2b-4974-9625-3be823a8f392" />

### Ergebnis (Beispiel)

<img width="591" height="1280" alt="image" src="https://github.com/user-attachments/assets/f6c94e61-a233-4c17-8792-f898b34e80e3" />

### Adapter-Wiki

[Link zum Adapter-Wiki](https://github.com/BenAhrdt/ioBroker.device-monitoring/wiki)

## ioBroker Forum Link

[https://forum.iobroker.net/test-adapter-device-monitoring](https://forum.iobroker.net/topic/85477/test-adapter-device-monitoring?_=1791737589435)

## Zusammenarbeit

Der Adapter wurde in Zusammenarbeit mit Jörg Froehner entwickelt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (BenAhrdt) Use the adapter-managed timeout while waiting for pending operations during shutdown.

### 0.0.48 (2026-11-01)
* (BenAhrdt) Keep the adapter configuration unchanged when it is only opened and render notification previews instead of their JavaScript expressions.

### 0.0.47 (2026-10-29)
* (BenAhrdt) Limit configuration rebuilds and monitoring refreshes to affected devices and states to reduce database and Device Manager load.

### 0.0.46 (2026-10-29)
* (BenAhrdt) Wait for running asynchronous state and object operations before adapter shutdown.
* (BenAhrdt) Handle asynchronous event and timer errors to prevent unhandled database rejections.
* (BenAhrdt) Return structured errors from Device Manager actions and allow longer state-form saves, preventing silent backend timeouts.

### 0.0.45 (2026-10-14)
* (BenAhrdt) Rebuild card details on startup, ignore rapid source duplicates, and display sub-second intervals as `<1s`.

### 0.0.44 (2026-10-14)
* (BenAhrdt) Rebuild device-card details during the initial refresh even when the current source event is an already processed acknowledgement duplicate.

## License
MIT License

Copyright (c) 2026 BenAhrdt <github@ben-schmidt.net>

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