---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: 67yDSjHojqhf+/Wu8Xa3JltuQbiLxDUy8uFlL2KrUdw=
---
![Logo](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mytime-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mytime-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mytime.png?downloads=true)
![Test und Freigabe](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

# ioBroker.mytime

## WICHTIG

Nur die englische Dokumentation ist gültig, da die automatische Übersetzung Bereiche mitübersetzt, die nicht übersetzt werden sollten.

## mytime-Adapter für ioBroker

Dieser Adapter verarbeitet Zeitabläufe (z. B. Countdowns). Die Countdown-Funktionalität stellt Datenpunkte bereit, mit denen Sie einen Countdown steuern können (z. B. in einem Skript). Der Adapter enthält außerdem verschiedene Widgets zur Visualisierung dieser Countdowns. Mithilfe von Zeitreihen lassen sich komplexe Zeitreihen erstellen, bei denen die Datenpunkte ausgelöst werden.

### Konfiguration

#### Countdown

Im Konfigurationsdialog unter dem Reiter „Countdown“ können Sie einen neuen Countdown erstellen, z. B. „Test“, die Timerdauer auf 10 Sekunden einstellen und die folgenden Widgets importieren. Datenpunkte sind für einen Countdown namens „Test“ vorkonfiguriert.

##### Verhaltenstimer stoppen

Sobald der Countdown das Stoppsignal erhält, wird er auf die vom Timer eingestellte Zeit zurückgesetzt.

##### Stoppverhalten Null

Nachdem der Countdown das Stoppsignal erhalten hat, bleibt der Countdown bei 0 stehen.

##### Verhalten stoppen Wiederholung ausführen

Wenn der Timer abgelaufen ist, startet er automatisch neu.

#### Zeitreihen

Im Konfigurationsdialog unter dem Reiter „Zeitreihen“ können Sie eine neue Zeitreihe mit einer oder mehreren Zeitregeln erstellen. Für jede Zeitregel lassen sich verschiedene Parameter definieren. Jede Zeitreihe erzeugt einen separaten Datenpunkt, der bei den berechneten Zeitereignissen ausgelöst wird. Die Zeitereignisse werden in Echtzeit berechnet. Die verwendete rrule-Bibliothek ist jedoch noch nicht für alle Parameterkombinationen optimal. Dies zeigt sich darin, dass die Seite bei einigen Kombinationen in eine Endlosschleife gerät. Die Demoseite <http://jakubroztocil.github.io/rrule/> kann ebenfalls für Experimente verwendet werden. Zusätzlich zum Hinzufügen einer Zeitregel können Sie Zeitregeln hinzufügen, um Zeitereignisse auszuschließen, einzelne Zeitereignisse hinzuzufügen oder auszuschließen.

Zusätzlich zur Funktionalität von rrule können nun auch dynamisch berechnete Zeiten für die verschiedenen Sonnen- und Mondphasen ermittelt werden. Diese Berechnung erfolgt nur, wenn das Zeitintervall mindestens einen Tag beträgt (nicht stündlich oder minütlich).

##### Sonnenbasierte Zeitereignisse

- astronomicalDawn
- Amateur-Morgendämmerung
- nauticalDawn
- blaue Stunde Morgendämmerungsstart
- Civil Dawn
- blaue Stunde Morgendämmerung Ende
- goldene Stunde Morgendämmerungsbeginn
- Sonnenaufgang
- Sonnenaufgang Ende
- goldene Stunde Morgendämmerung Ende
- Sonnenhöchststand
- goldene Stunde Dämmerung Start
- Sonnenuntergang
- Sonnenuntergang
- goldene Stunde Dämmerung Ende
- blaue Stunde Dämmerung Start
- civilDusk
- blaue Stunde Dämmerung Ende
- nauticalDusk
- Amateur-Dämmerung
- astronomische Dämmerung
- Nadir

##### Mondbasierte Zeitereignisse

- Mondaufgang
- Mondhoch
- Monduntergang

### Verwendung

#### Nutzung von Zeitreihen

##### Verfügbare Datenpunkte einer Zeitreihe

Nach der Konfiguration einer neuen Zeitreihe erzeugt der Adapter die folgenden Datenpunkte:

| Datenpunkt | Beschreibung                                                            |
| ---------- | ----------------------------------------------------------------------- |
| Aktion     | Aktueller Status dieser Zeitreihe. Mögliche Werte sind: Stopp, laufend. |
| cmd        | Funktioniert derzeit nicht.                                             |

##### Verfügbare Aktionszustände

| Aktion  | Beschreibung                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| stoppen | Im Moment ist kein Zeitereignis aktiv.                                                                         |
| laufen  | Ein Zeitereignis wurde ausgelöst. Nach Ablauf der konfigurierten Dauer ändert sich der Datenpunkt auf „Stopp“. |

#### Verwendung des Countdowns

##### Verfügbare Datenpunkte eines Countdowns

Nach der Konfiguration eines neuen Countdowns erstellt der Adapter die folgenden Datenpunkte:

| Datenpunkt    | Beschreibung                                                               |
| ------------- | -------------------------------------------------------------------------- |
| Aktion        | Aktueller Status des Countdowns. Mögliche Werte: Stopp, Start, Pause, Ende |
| cmd           | Datenpunkt für Befehle. Mögliche Befehle werden im Folgenden beschrieben.  |
| Konfiguration | Enthält zusätzliche Konfiguration für den Countdowntimer.                  |
| Start         | Datenpunkt für die Startzeit in Millisekunden                              |
| Ende          | Datenpunkt für die Endzeit in Millisekunden                                |
| Timer         | Datenpunkt für die gesamte eingestellte Zeit in Millisekunden              |

##### Verfügbare Aktionszustände eines Countdowns

| Aktion  | Beschreibung                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| stoppen | Der Countdown ist gestoppt, Start- und Endzeit sind auf 0 gesetzt.                                                   |
| laufen  | Der Countdown läuft. Erreicht der Countdown die Endzeit, wechselt die Aktion zu „Ende“.                              |
| Pause   | Der Countdown befindet sich im Pausenmodus. Die Endzeit wurde auf den Zeitpunkt der Pause eingestellt.               |
| Ende    | Der Countdown ist beendet. Diesen Zustand können Sie als Auslöser für weitere Aktionen (Ton, Popups usw.) verwenden. |

##### Verfügbare Befehle für den cmd-Datenpunkt

| Befehl          | Beispiel                | Beschreibung                                                                                                                                                      |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `+value`        | `+1:10`                 | Fügt der Countdown-Einstellung Zeit hinzu. Die Einstellung wird beim nächsten Start berücksichtigt.                                                               |
| `+!value`       | \`\`+!1:10\`            | wie der +-Operator und verlängern den laufenden Timer                                                                                                             |
| `-value`        | `-1:2:3`                | Die Zeit wird vom Countdown abgezogen. Die Einstellung wird beim nächsten Start berücksichtigt.                                                                   |
| `-!value`       | `-!1:2:3`               | wie - Operator und reduzieren Sie die Laufzeit                                                                                                                    |
| `=value`        | `=5:00`                 | Stelle den Countdown-Timer auf diese Zeit ein.                                                                                                                    |
| `=!value`       | `=!5:00`                | wie der Gleichheitsoperator und setze den laufenden Timer auf die angegebene Zeit.                                                                                |
| `#ISO-Date`     | `#2025-01-01T10:00:00`  | Stelle den Countdown-Timer auf eine Zielzeit ein. Die Zeitangabe muss im ISO-Datumsformat vorliegen.                                                              |
| `#!ISO-Date`    | `#!2025-01-01T10:00:00` | wie der #-Operator und das Einstellen eines laufenden Timers auf die angegebene Zielzeit                                                                          |
| `$Time`         | `$20:15`                | Stelle den Countdown-Timer auf eine Zielzeit ein. Liegt die Zielzeit vor der aktuellen Zeit, wird der nächste Tag eingestellt.                                    |
| `$!Time`        | `$!20:15`               | wie der $-Operator und das Einstellen eines laufenden Timers auf die angegebene Zielzeit                                                                          |
| `start`         | `start`                 | Der Countdown startet                                                                                                                                             |
| `stop`          | `stop`                  | Der Countdown wird gestoppt. Die Countdown-Zeit wird auf den eingestellten Wert zurückgesetzt.                                                                    |
| `pause`         | `pause`                 | Der Countdown wird angehalten                                                                                                                                     |
| `end`           | `end`                   | Der Countdown wird gestoppt. Der Countdown ist auf 0 gesetzt.                                                                                                     |
| `reset`         | `reset`                 | Den Timer auf den Konfigurationszustand zurücksetzen                                                                                                              |
| `setstop2timer` | `setstop2timer`         | Stoppverhaltenskonfiguration auf Timer einstellen                                                                                                                 |
| `setstop2zero`  | `setstop2zero`          | Stoppverhaltenskonfiguration auf Null setzen                                                                                                                      |
| `setstop2rerun` | `setstop2rerun`         | Stoppverhaltenskonfiguration auf erneutes Ausführen setzen                                                                                                        |
| `save`          | `save`                  | Die in den Datenpunkten definierte Konfiguration wird in der iobroker-Konfiguration gespeichert. iobroker startet den Adapter nach dem Speichern automatisch neu. |

##### Format des Werts zum Einstellen des Countdown-Timers

Sie können den Countdown auf eine unbegrenzte Zeit einstellen. Die Zeitangabe erfolgt im Format \[Tage:\[Stunden:\[Minuten:\[Sekunden]]]. Tage, Stunden und Minuten sind optional. Um den Timer auf einen Tag einzustellen, müssen Sie auch Stunden, Minuten und Sekunden angeben. Die üblichen Wertebereiche (z. B. 0–24 Stunden) sind nicht relevant. Sie können auch 48 Stunden einstellen. Ungewöhnliche Zeitangaben sind ebenfalls möglich. Die Zeit wird separat summiert.

**Beispiele:**

| Einstellung | Beschreibung                                                  |
| ----------- | ------------------------------------------------------------- |
| 1:0:0:0     | Stellt/fügt 1 Tag zum Timer hinzu/subtrahiert 1 Tag           |
| 2:0:0       | Stellt/fügt 2 Stunden zum Timer hinzu/subtrahiert 2 Stunden   |
| 3:0         | Stellt/fügt 3 Minuten zum Timer hinzu/subtrahiert 3 Minuten   |
| 120         | Stellt/addiert/subtrahiert 120 Sekunden zum Timer             |
| 48:0:0      | Stellt/fügt 48 Stunden zum Timer hinzu/subtrahiert 48 Stunden |
| 48:75:120   | Timer einstellen/addieren/subtrahieren                        |

##### Format des Datums/der Uhrzeit zur Formatierung der Ausgabe im Widget

Folgende Platzhalter stehen zur Verfügung:

| Platzhalter | Beschreibung                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------- |
| YYYY        | Jahre in 4 Ziffern                                                                             |
| YY          | Jahre in 2 Ziffern                                                                             |
| w           | Monate ohne führende Nullen, (nicht zusammen mit den Monaten)                                  |
| ww          | Monate mit führenden Nullen, (nicht zusammen mit den Monaten)                                  |
| M           | Monate ohne führende Nullen, (nicht zusammen mit den Wochen)                                   |
| MM          | Monate mit führenden Nullen, (nicht zusammen mit den Wochen)                                   |
| D           | Tage ohne führende Nullen                                                                      |
| dd          | Tage mit führenden Nullen                                                                      |
| H           | Stunden ohne führende Nullen                                                                   |
| HH          | Stunden mit führenden Nullen                                                                   |
| M           | Minuten ohne führende Nullen                                                                   |
| mm          | Minuten mit führenden Nullen                                                                   |
| S           | Sekunden ohne führende Nullen                                                                  |
| ss          | Sekunden mit führenden Nullen                                                                  |
| \\          | Verwenden Sie ein Escape-Zeichen, wenn Sie einen Platzhalter in der Ausgabe verwenden möchten. |

Wenn mehrere Teile genommen werden, dürfen keine Lücken zwischen ihnen entstehen.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

**Beispiele:**

Alle folgenden Beispiele mit Countdown-Timer 1:2:3:4

| Vorlage            | Beispiel                             | Ergebnis                                    |
| ------------------ | ------------------------------------ | ------------------------------------------- |
| d\d Hh m\ms\s      | 1 Tag 2 Stunden 3 Minuten 4 Sekunden | mit Escape-Zeichen und ohne führende Nullen |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s                      | mit Escape-Zeichen und mit führenden Nullen |
| ss\s               | 93784s                               | nur Sekunden                                |
| dd\d HH\h          | 01d 02h                              | nur Tage und Stunden                        |
| HH\h mm\m          | 26 Uhr 03 Minuten                    | nur Stunden und Minuten                     |

### Widgets

Ab Version 1.2.0 sollten die Widgets mit vis1 und vis2 kompatibel sein.

#### Widget-Countdown (einfach)

![Widget-Countdown (einfach)](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-countdown.png)

Ein Countdown-Widget für eine einfache Textausgabe. Die Ausgabe kann detailliert konfiguriert werden.

##### Widget-Attribute

| Attribut       | Beschreibung                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID`    | Datenpunkt des Countdown-Timers. Es kann jeder beliebige Datenpunkt verwendet werden.                                                        |
| `Format`       | Format der Ausgabe: Einzelheiten finden Sie im Kapitel [Datums- und Zeitformat.](#format-of-the-datetime-to-format-the-output-in-the-widget) |
| `HTML-Prepend` | Dieser Text oder HTML-Code wird der Ausgabe des Widgets vorangestellt.                                                                       |
| `HTML-Append`  | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt.                                                                        |

##### Beispiel-Widget-Code

Die Widgets sind für einen Countdown namens „Test“ vorkonfiguriert. Es gibt zwei separate Versionen für vis1 und vis2.

![Beispiel](../../../en/adapterref/iobroker.mytime/admin/mytime-example1.png)

**VIS1:**

<details>
  <summary>Details</summary>
  <pre><code>[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdowns.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdowns.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]</code></pre>
</details>

**VIS2:**

<details>
  <summary>Details</summary>
<pre><code>[{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"pause","value":"pause"},"style":{"bindings":[],"left":"423.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000001"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"start","value":"start"},"style":{"bindings":[],"left":"361.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000002"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"stop","value":"stop"},"style":{"bindings":[],"left":"485.0000305175781px","top":"402.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000003"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"+10","value":"+10"},"style":{"bindings":[],"left":"423.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000004"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"=100","value":"=100"},"style":{"bindings":[],"left":"361.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000005"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"-10","value":"-10"},"style":{"bindings":[],"left":"485.0000305175781px","top":"349.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000006"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"+!10","value":"+!10"},"style":{"bindings":[],"left":"423.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000007"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"=!100","value":"=!100"},"style":{"bindings":[],"left":"361.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000008"},{"tpl":"tplIconState","data":{"bindings":[],"oid":"mytime.0.Countdowns.test.cmd","type":"value","g_common":true,"step":1,"minmax":1,"repeat_delay":800,"repeat_interval":300,"min":0,"max":100,"variant":"contained","g_style":true,"text":"-!10","value":"-!10"},"style":{"bindings":[],"left":"485.0000305175781px","top":"320.00001525878906px","width":"59px","height":"26px"},"widgetSet":"jqui","_id":"i000009"},{"tpl":"tplMyTimeCountdownPlain","data":{"bindings":[],"countdown_format":"dd\\d HH\\h mm\\m ss\\s","g_common":true,"g_css_border":true,"countdown_oid":"mytime.0.Countdowns.test.timer","g_css_font_text":true},"style":{"bindings":[],"left":"361.0000305175781px","top":"375.00001525878906px","width":"182px","height":"24px","border-width":"0","border-style":"solid","border-color":"rgba(237,235,243,1)","text-align":"center"},"widgetSet":"mytime","_id":"i000010"}]</code></pre>
</details>

**Der tatsächliche Aktionsstatus (cdstop,cdrun,cdpause,cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Widget Rückwärts-Countdown (einfach)

![Widget Rückwärts-Countdown](../../../en/adapterref/iobroker.mytime/admin/mytime-plainreverse-countdown.png)

Ein Widget, das die seit einem bestimmten Zeitpunkt verstrichene Zeit anzeigt.

##### Widget-Eigenschaften von „Umgekehrter Countdown“ (einfach)

| Datenpunkt     | Beschreibung                                                                                                                                                                                                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ISO datetime` | Ein DateTime-String mit der Startzeit. Der Ausdruck muss von der JavaScript-Funktion \`new Date(expression)\` interpretiert werden können. Siehe auch <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse> . Beispiel: \`2022-01-10 23:12\` oder \`2022-01-104T23:12:00.000Z\` |
| `Format`       | Formatiert die Timer-Ausgabe. Standardwert: mm:ss. Weitere Informationen finden Sie im Kapitel [Datums- und Zeitformat.](#format-of-the-datetime-to-format-the-output-in-the-widget)                                                                                                                                    |
| `HTML-Prepend` | Dieser Text oder HTML-Code wird der Ausgabe des Widgets vorangestellt.                                                                                                                                                                                                                                                  |
| `HTML-Append`  | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt.                                                                                                                                                                                                                                                   |

#### Widget-Countdown-Kreis

![Widget-Countdown-Kreis](../../../en/adapterref/iobroker.mytime/admin/mytime-circle-countdown.png)

Ein Countdown-Widget in Ring-/Kreisform.

##### Widget-Eigenschaften des Countdown-Kreises

| Attribut                 | Beschreibung                                                                                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID`              | Der Timer-Datenpunkt eines Countdown-Datenpunkts.                                                                                                                                                                                             |
| `notimetext`             | Deaktiviert die Zeitanzeige über der Polaruhr.                                                                                                                                                                                                |
| `Format`                 | Formatiert die Timer-Ausgabe. Standardwert: mm:ss. Details finden Sie im Kapitel [Datums-/Zeitformat](#format-of-the-datetime-to-format-the-output-in-the-widget) . Umkehrbare Einstellung zum Vergrößern oder Verkleinern des Rings/Kreises. |
| `reverse`                | Die Breite des Rings oder Kreises.                                                                                                                                                                                                            |
| `partring`               | Der größte ausgewählte Ring wird proportional und nicht vollständig angezeigt.                                                                                                                                                                |
| `Width`                  | Die Breite des Rings oder Kreises.                                                                                                                                                                                                            |
| `Ring gap`               | Pixelabstand zwischen den Ringen                                                                                                                                                                                                              |
| `Ring Caps`              | Einstellung für die Enden des Rings/Kreises: rund oder gerade                                                                                                                                                                                 |
| `background`             | Hintergrundfarbe des Rings/Kreises                                                                                                                                                                                                            |
| `foreground`             | Vordergrundfarbe des Rings/Kreises                                                                                                                                                                                                            |
| `countdown_color_second` | Vordergrundfarbe des zweiten Rings/Kreises                                                                                                                                                                                                    |
| `countdown_color_hour`   | Vordergrundfarbe des Stundenrings/Stundenkreises                                                                                                                                                                                              |
| `countdown_color_day`    | Vordergrundfarbe des Tagesrings/Kreises                                                                                                                                                                                                       |
| `countdown_color_week`   | Vordergrundfarbe des Wochenrings/Kreises                                                                                                                                                                                                      |
| `countdown_color_month`  | Vordergrundfarbe des Monatsrings/Kreises                                                                                                                                                                                                      |
| `countdown_color_year`   | Vordergrundfarbe des zweiten Rings/Kreises                                                                                                                                                                                                    |
| `showsec`                | Zeige den Sekundenring an                                                                                                                                                                                                                     |
| `showmin`                | Zeige den Minutenring an                                                                                                                                                                                                                      |
| `showhrs`                | Zeige den Minutenring an                                                                                                                                                                                                                      |
| `showday`                | Zeige den Ring der Tage                                                                                                                                                                                                                       |
| `showmonth`              | Zeige den Monatsring (nicht zusammen mit den Wochen)                                                                                                                                                                                          |
| `showweek`               | Zeige den Wochenring (nicht zusammen mit den Monaten)                                                                                                                                                                                         |
| `showyear`               | Zeig den Ring der Jahre                                                                                                                                                                                                                       |

Wenn mehrere Teile ausgewählt werden, dürfen keine Lücken zwischen ihnen vorhanden sein.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

**Der tatsächliche Aktionsstatus (cdstop,cdrun,cdpause,cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Widget Countdown FlipClock

![Widget Countdown FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-countdown.png)

Ein Countdown-Widget im Stil einer Flughafen-Anzeigetafel. Unterstützt werden nur 100 Tage - 1 Sekunde. Eine individuelle Umrechnung in die gewählten Einheiten erfolgt nicht.

##### Widget-Eigenschaften der Countdown-FlipClock

| Attribut              | Beschreibung                                      |
| --------------------- | ------------------------------------------------- |
| `Object ID`           | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| `showsec`             | Zeigt den Sekundenteil.                           |
| `showmin`             | Zeigt den Minutenteil.                            |
| `showhrs`             | Zeigt den Stundenteil an.                         |
| `showday`             | Zeigt die Tageszeit an.                           |
| `color`               | Farbe des Countdown-Timers                        |
| `background_color`    | Hintergrundfarbe des Countdowntimers              |
| `countdown_dot_color` | Farbe der Punkte des Countdowntimers              |

Wenn mehrere Teile ausgewählt werden, dürfen keine Lücken zwischen ihnen vorhanden sein.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

Die Anzeigegröße kann über CSS gesteuert werden.`font-size` Einstellung.

**Der tatsächliche Aktionsstatus (cdstop,cdrun,cdpause,cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Widget-Countdown NixieClock

![Widget-Countdown NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-countdown.png)

Ein Countdown-Widget im Nixie-Röhren-/LED-Stil

##### Widget-Eigenschaften von Countdown NixieClock

| Attribut                    | Beschreibung                                              |
| --------------------------- | --------------------------------------------------------- |
| Objekt-ID                   | Der Timer-Datenpunkt eines Countdown-Datenpunkts.         |
| countdown\_showsec          | Zeigt den zweiten Teil.                                   |
| countdown\_showmin          | Zeigt den Minutenteil.                                    |
| countdown\_showhrs          | Zeigt den Stundenteil an.                                 |
| Countdown-Tag               | Zeigt die Tageszeit an.                                   |
| Countdown-Monat anzeigen    | Zeigt den Monatsteil an. (nicht zusammen mit den Wochen)  |
| Countdown-Woche anzeigen    | Zeigt den Wochenteil an. (nicht zusammen mit den Monaten) |
| Countdown-Jahr anzeigen     | Zeigt den Jahresteil an.                                  |
| Countdown-Farbe aktiv       | Farbe des Countdown-Timers                                |
| Countdown-Farbe inaktiv     | Farbe der inaktiven Ziffern                               |
| Countdown-Deckkraft inaktiv | Deckkraft der Farbe der inaktiven Ziffern                 |
| Countdown\_Leuchtfarbe      | Farbe des Leuchtens um diese Nixie-Ziffern                |

Wenn mehrere Teile ausgewählt werden, dürfen keine Lücken zwischen ihnen vorhanden sein.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

##### Tipps

###### Obere/Untere Margen

Die verwendete Schriftart Lato ist leicht nach unten geneigt, wodurch ungleichmäßige obere und untere Ränder entstehen. Dies lässt sich über die Höhe und einen negativen oberen Rand anpassen. Das Widget hat eine Höhe von 1em. Die Höhe kann direkt in den Widget-Eigenschaften festgelegt werden.

Für den negativen Rand muss eine CSS-Klasse erstellt werden.

```css
#w00000 .cdclock {
    margin-top: -5px;
}
```

###### Widgetgröße

Die Anzeigegröße kann über CSS gesteuert werden.`font-size` Einstellung.

###### Zentrieren der Nixie-Uhr

Um die Uhr zu zentrieren, ist eine zusätzliche CSS-Klasse erforderlich, da die entsprechenden Einstellungen nicht in den Widget-Einstellungen konfiguriert werden können:

```css
#w00000 {
    display: flex;
    justify-content: center;
}
```

#### Widget-Uhr (einfach)

![Widget-Uhr (einfach)](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-clock.png)

Ein konfigurierbares Widget zur Anzeige des aktuellen Datums und der Uhrzeit als Klartext. Die Uhrzeit kann entweder vom Browser-Client oder vom synchronisierten ioBroker-Server übernommen werden.

##### Widget-Eigenschaften der einfachen Uhr

| Attribut             | Beschreibung                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `clock_time_source`  | Wählt aus`client` für die Browserzeit oder`server` für die synchronisierte ioBroker-Serverzeit. |
| `clock_format`       | Definiert das Datums- und Zeitformat. Der Standardwert ist`DD.MM.YYYY HH:mm:ss` Die             |
| `clock_html_prepend` | Text oder HTML, der vor dem formatierten Datum und der Uhrzeit eingefügt wird.                  |
| `clock_html_append`  | Text oder HTML wird nach dem formatierten Datum und der Uhrzeit angehängt.                      |

Folgende Platzhalter können verwendet werden in`clock_format` :

| Platzhalter | Beschreibung                     |
| ----------- | -------------------------------- |
| `YYYY`      | Vierstelliges Jahr               |
| `YY`        | Zweistelliges Jahr               |
| `MM` /`M`   | Monat mit / ohne führende Null   |
| `DD` /`D`   | Tag mit / ohne führende Null     |
| `HH` /`H`   | Stunden mit / ohne führende Null |
| `mm` /`m`   | Minuten mit / ohne führende Null |
| `ss` /`s`   | Sekunden mit/ohne führende Null  |

Die Anzeigegröße kann über CSS gesteuert werden.`font-size` Einstellung.

#### Widget-Uhr FlipClock

![Widget-Uhr FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-clock.png)

Ein konfigurierbares Datums- und Uhrzeit-Widget im Stil einer Flughafen-Anzeigetafel. Jede Datums- und Uhrzeitkomponente kann einzeln ein- oder ausgeblendet werden.

##### Widget-Eigenschaften der FlipClock-Uhr

| Attribut                 | Beschreibung                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `clock_time_source`      | Wählt aus`client` für die Browserzeit oder`server` für die synchronisierte ioBroker-Serverzeit. |
| `clock_date_order`       | Wählt aus`DMY` ,`MDY` , oder`YMD` als die Reihenfolge der Datumskomponenten.                    |
| `clock_showyear`         | Zeigt die zweistellige Jahreskomponente an.                                                     |
| `clock_showmonth`        | Zeigt die Monatskomponente an.                                                                  |
| `clock_showday`          | Zeigt die Tageskomponente an.                                                                   |
| `clock_showhours`        | Zeigt die Stundenkomponente an.                                                                 |
| `clock_showminutes`      | Zeigt die Minutenkomponente an.                                                                 |
| `clock_showseconds`      | Zeigt die Sekundenkomponente an.                                                                |
| `clock_color`            | Legt die Farbe der Ziffern fest.                                                                |
| `clock_background_color` | Legt die Hintergrundfarbe der Wendekarten fest.                                                 |
| `clock_dot_color`        | Legt die Farbe der Trennlinien zwischen den Komponenten fest.                                   |

Die Zeitkomponenten werden stets nach den ausgewählten Datumskomponenten in der Reihenfolge Stunden, Minuten, Sekunden angezeigt. Die Anzeigegröße kann über CSS gesteuert werden.`font-size` Einstellung.

#### Widget-Uhr NixieClock

![Widget-Uhr NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-clock.png)

Ein konfigurierbares Datums- und Zeit-Widget im Nixie-Röhren-/LED-Stil. Jede Datums- und Zeitkomponente kann einzeln ein- oder ausgeblendet werden.

##### Widget-Eigenschaften der Uhr NixieClock

| Attribut                 | Beschreibung                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `clock_time_source`      | Wählt aus`client` für die Browserzeit oder`server` für die synchronisierte ioBroker-Serverzeit. |
| `clock_date_order`       | Wählt aus`DMY` ,`MDY` , oder`YMD` als die Reihenfolge der Datumskomponenten.                    |
| `clock_showyear`         | Zeigt die zweistellige Jahreskomponente an.                                                     |
| `clock_showmonth`        | Zeigt die Monatskomponente an.                                                                  |
| `clock_showday`          | Zeigt die Tageskomponente an.                                                                   |
| `clock_showhours`        | Zeigt die Stundenkomponente an.                                                                 |
| `clock_showminutes`      | Zeigt die Minutenkomponente an.                                                                 |
| `clock_showseconds`      | Zeigt die Sekundenkomponente an.                                                                |
| `clock_color_active`     | Legt die Farbe der aktiven Nixie-Ziffern fest.                                                  |
| `clock_color_inactive`   | Legt die Farbe der inaktiven Nixie-Ziffern fest.                                                |
| `clock_opacity_inactive` | Legt die Deckkraft der inaktiven Ziffern fest.                                                  |
| `clock_glowcolor`        | Legt die Farbe des Leuchtens um die aktiven Ziffern fest.                                       |

Die Zeitkomponenten werden stets nach den ausgewählten Datumskomponenten in der Reihenfolge Stunden, Minuten, Sekunden angezeigt. Die Anzeigegröße kann über CSS gesteuert werden.`font-size` Einstellung.

#### Widget-Wortuhr

![Widget-Wortuhr](../../../en/adapterref/iobroker.mytime/admin/mytime-wordclock.png)

Ein Widget zur Anzeige einer Wortuhr mit vielen Optionen

##### Widget-Eigenschaften der Wortuhr

| Datenpunkt          | Beschreibung                                                |
| ------------------- | ----------------------------------------------------------- |
| `language`          | Für die Wortuhr stehen verschiedene Sprachen zur Verfügung. |
| `letterActivated`   | Farbe für die hervorgehobenen Wörter                        |
| `letterDeactivated` | Farbe für die normalen Buchstaben                           |
| `wordclockMargin`   | Abstand zwischen der Wortuhr und den LEDs                   |
| `withMinutes`       | Zeigen Sie die Minuten-LEDs in der Ecke der Wortuhr an.     |
| `minuteSize`        | Größe der winzigen LEDs in Pixeln                           |
| `minuteColor`       | Farbe der Minuten-LED                                       |
| `withSeconds`       | Zeigen Sie die Sekunden-LEDs der Wortuhr an.                |
| `secondSize`        | Größe der Sekunden-LEDs in Pixeln                           |
| `secondColor`       | Farbe der Sekunden-LED                                      |
| `timezone`          | Die Uhrzeit der ausgewählten Zeitzone wird angezeigt.       |

**Der tatsächliche Aktionsstatus (cdstop,cdrun,cdpause,cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

## Todo

- 7-Segment-Anzeige
- fortlaufende Zahlen
- anpassbare Schriftarten
- ts: Zeitregeln für den Ausschluss (Zeitraum, einzelne Daten)
- ~~Zeitzone für die Wortuhr hinzufügen~~
- ~~Wortuhr-Timer~~
- ~~Zeitgesteuerter Planer: Planen Sie einzelne Termine und wiederkehrende Ereignisse wie in Outlook.~~
- ~~Nixie-Stil~~
- ~~Klappdisplay (Flughafendisplay)~~
- ~~Neuer Befehl zum Festlegen der Zielzeit ohne Datum~~
- Countdown-Kreis-Widget mit Option zum Deaktivieren des Countdown-Textes
- ~~Gruppentrennzeichen '.' im Namen~~
- ~~Polaruhr~~
- ~~Kreis umkehren~~
- ~~Kreis mit runden Kappen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.5 (2026-09-01)

- prepare for stable release

### 3.0.1 (2026-08-10)

- improve and fix jsonConfig
- switch from build to dist directory
- extend log output for onMessage error
- improve getServerTime timer in widget
- rename subsubdirectory widgets to widgetTypes
- improve race condition with states

### 3.0.0 (2026-08-09)

- update to react 19
- fix repochecker

### 2.5.1 (2026-07-24)

- seperate flipclock css classes from timeandweather adapter

### 2.5.0 (2026-07-21)

- Flip clock size is now adjustable via font-size.
- Defined better initial sizes and defaults for various widgets.

[Older changelogs can be found there](https://github.com/oweitman/ioBroker.mytime/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 oweitman <oweitman@gmx.de>

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