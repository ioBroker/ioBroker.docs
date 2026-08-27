---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: 4Mu8KDFuLs2kkZws2uBzckf1zjGQjECngtEa+mYUjWs=
---
![Logo](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mytime-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mytime-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mytime.png?downloads=true)

# IoBroker.mytime
**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

## WICHTIG
Nur die englische Dokumentation ist gültig, da die automatische Übersetzung Bereiche mitübersetzt, die nicht übersetzt werden sollten.

## Mytime-Adapter für ioBroker
Dieser Adapter verarbeitet Zeitabläufe (z. B. Countdowns).
Die Countdown-Funktionalität stellt Datenpunkte bereit, mit denen Sie einen Countdown steuern können (z. B. in einem Skript). Der Adapter enthält außerdem verschiedene Widgets zur Visualisierung dieser Countdowns. Mithilfe von Zeitreihen lassen sich komplexe Zeitreihen erstellen, bei denen die Datenpunkte ausgelöst werden.

### Konfiguration
#### Countdown
Im Konfigurationsdialog können Sie auf der Registerkarte „Countdown“ einen neuen Countdown erstellen, z. B. „Test“, die Timerdauer auf 10 Sekunden einstellen und die folgenden Widgets importieren. Datenpunkte sind für einen Countdown namens „Test“ vorkonfiguriert.

##### Stopp-Verhaltenstimer
Sobald der Countdown das Stoppsignal erhält, wird er auf die vom Timer eingestellte Zeit zurückgesetzt.

##### Stoppverhalten Null
Nachdem der Countdown das Stoppsignal erhalten hat, bleibt der Countdown bei 0 stehen.

##### Verhalten erneut ausführen stoppen
Wenn der Timer abgelaufen ist, startet er automatisch neu.

#### Zeitreihen
Im Konfigurationsdialog unter dem Reiter „Zeitreihen“ können Sie eine neue Zeitreihe mit einer oder mehreren Zeitregeln erstellen. Für jede Zeitregel lassen sich verschiedene Parameter definieren. Jede Zeitreihe erzeugt einen separaten Datenpunkt, der bei den berechneten Zeitereignissen ausgelöst wird.

Die Zeitereignisse werden in Echtzeit berechnet. Die verwendete rrule-Bibliothek ist jedoch noch nicht für alle Parameterkombinationen optimal.

Dies führt dazu, dass die Seite bei einigen Kombinationen in einer Endlosschleife hängt.
Die Demoseite <http://jakubroztocil.github.io/rrule/> kann ebenfalls für Experimente verwendet werden.
Neben dem Hinzufügen einer Zeitregel können Sie auch Zeitregeln zum Ausschließen, Hinzufügen und Ausschließen einzelner Zeitereignisse hinzufügen.

Zusätzlich zur Funktionalität von rrule können nun auch dynamisch berechnete Zeiten für die verschiedenen Sonnen- und Mondphasen ermittelt werden.
Diese Berechnung erfolgt nur, wenn das Zeitintervall mindestens einen Tag beträgt (nicht stündlich oder minütlich).

##### Sonnenbasierte Zeitereignisse
- astronomicalDawn
- amateurDawn
- nauticalDawn
- blueHourDawnStart
- civilDawn
- blueHourDawnEnd
- goldenHourDawnStart
- Sonnenaufgang
- Sonnenaufgang Ende
- goldenHourDawnEnd
- solarNoon
- goldene Stunde Dämmerungsstart
- SonnenuntergangStart
- Sonnenuntergang
- goldene Stunde Dämmerung Ende
- blueHourDuskStart
- civilDusk
- blueHourDuskEnd
- nauticalDusk
- amateurDusk
- astronomicalDusk
- Nadir

##### Mondzeitliche Ereignisse
- Mondaufgang
- moonhigh
- Monduntergang

### Verwendung
#### Verwendung von Zeitreihen
##### Verfügbare Datenpunkte einer Zeitreihe
Nach der Konfiguration einer neuen Zeitreihe erzeugt der Adapter die folgenden Datenpunkte:

| Datenpunkt | Beschreibung |
| --------- | ------------------------------------------------------------ |
| Aktion | Aktueller Zustand der Zeitreihe. Mögliche Werte sind Stopp, Ausführung |
| cmd | derzeit keine Funktion |

##### Verfügbare Aktionszustände
| Aktion | Beschreibung |
| ------ | --------------------------------------------------------------------------------------------- |
| Stopp | Derzeit ist kein Zeitereignis aktiv |
| Ausführung | Ein Zeitereignis wurde ausgelöst. Nach Ablauf der konfigurierten Dauer ändert sich der Datenpunkt zu Stopp. |

#### Verwendung des Countdowns
##### Verfügbare Datenpunkte eines Countdowns
Nach der Konfiguration eines neuen Countdowns erstellt der Adapter die folgenden Datenpunkte:

| Datenpunkt | Beschreibung |
| --------- | ---------------------------------------------------------------------- |
| Aktion | Aktueller Status des Countdowns. Mögliche Werte sind: Stopp, Start, Pause, Ende |
| cmd | Datenpunkt für Befehle. Mögliche Befehle werden unten beschrieben. |
| config | Enthält zusätzliche Konfiguration für den Countdowntimer.              |
| Start | Datenpunkt für die Startzeit in Millisekunden |
| Ende | Datenpunkt für die Endzeit in Millisekunden |
| Timer | Datenpunkt für die eingestellte Gesamtzeit in Millisekunden |

##### Verfügbare Aktionszustände eines Countdowns
| Aktion | Beschreibung |
| ------ | ----------------------------------------------------------------------------------------------------- |
| Stopp | Der Countdown ist gestoppt, Start- und Endzeit sind auf 0 gesetzt. |
| Start | Der Countdown läuft. Wenn der Countdown die Endzeit erreicht, wechselt die Aktion zu „Ende“. |
| Pause | Der Countdown befindet sich im Pausenmodus. Die Endzeit wurde auf den Zeitpunkt der Pause eingestellt. |
| Ende | Der Countdown ist beendet. Diesen Zustand können Sie als Auslöser für weitere Aktionen (Ton, Popups usw.) verwenden. |

##### Verfügbare Befehle für den cmd-Datenpunkt
| Befehl | Beispiel | Beschreibung |
| --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `+value` | `+1:10` | Fügt der Countdown-Einstellung Zeit hinzu. Die Einstellung wird beim nächsten Start berücksichtigt. |
| `-value` | `-1:2:3` | Zieht Zeit vom Countdown ab. Die Einstellung wird beim nächsten Start berücksichtigt. |
| `-!value` | `-!1:2:3` | wie - Operator und reduziert die Laufzeit |
| `=value` | `=5:00` | Stelle den Countdowntimer auf diese Zeit ein. |
| `=!value` | `=!5:00` | Gleichheitsoperator verwenden und Laufzeittimer auf die angegebene Zeit einstellen |
| `#ISO-Date` | `#2025-01-01T10:00:00` | Den Countdowntimer auf eine Zielzeit einstellen. Die Zeitangabe muss im ISO-Datumsformat vorliegen. |
| `#!ISO-Date` | `#!2025-01-01T10:00:00` | wie der #-Operator und das Einstellen des laufenden Timers auf die angegebene Zielzeit |
| `$Time` | `$20:15` | Stelle den Countdown-Timer auf eine Zielzeit ein. Wenn die Zeit vor der aktuellen Zeit liegt, wird der nächste Tag eingestellt. |
| `$!Time` | `$!20:15` | wie der $-Operator und das Einstellen des laufenden Timers auf die angegebene Zielzeit |
| `start` | `start` | startet den Countdown |
| `stop` | `stop` | stoppt den Countdown. Die Countdown-Zeit wird auf die Einstellung zurückgesetzt. |
| `pause` | `pause` | pausiert den Countdown |
| `end` | `end` | stoppt den Countdown. Der Countdown wird auf 0 gesetzt. |
| `reset` | `reset` | Timer auf Konfigurationszustand zurücksetzen |
| `setstop2timer` | `setstop2timer` | Stoppverhaltenskonfiguration auf Timer setzen |
| `setstop2zero` | `setstop2zero` | Stoppverhaltenskonfiguration auf Null setzen |
| `setstop2rerun` | `setstop2rerun` | Stoppverhaltenskonfiguration auf erneuten Lauf setzen |
| `save` | `save` | Speichert die in den Datenpunkten definierte Konfiguration in der iobroker-Konfiguration. iobroker startet den Adapter nach dem Speichern automatisch neu. |
| `save` | `save` | Speichert die in den Datenpunkten definierte Konfiguration in der iobroker-Konfiguration. iobroker startet den Adapter nach dem Speichern automatisch neu. |

##### Format des Werts zum Einstellen des Countdown-Timers
Sie können den Countdown auf eine unbegrenzte Zeit einstellen.

Die Wertangabe erfolgt im Format [Tage:[Stunden:[Minuten:[Sekunden]]]. Tage, Stunden und Minuten sind optional.

Wenn Sie den Timer auf einen Tag einstellen möchten, müssen Sie auch Stunden, Minuten und Sekunden angeben. Die üblichen Wertebereiche (z. B. 0–24 Stunden) sind dabei nicht relevant.

Sie können auch 48 Stunden einstellen.

Sie können optional auch ungewöhnliche Zeitangaben verwenden. Die Zeit wird separat summiert.

**Beispiele:**

| Schauplatz | Beschreibung |
| --------- | ------------------------------------------- |
| 1:0:0:0 | 1 Tag zum Timer hinzufügen/hinzufügen/abziehen |
| 2:0:0 | 2 Stunden zum Timer hinzufügen/hinzufügen/abziehen |
| 3:0 | 3 Minuten zum Timer hinzufügen/abziehen |
| 120 | Stellt/Addiert/Subtrahiert 120 Sekunden zum Timer |
| 48:0:0 | 48 Stunden zum Timer hinzufügen/hinzufügen/abziehen |
| 48:75:120 | Timer einstellen/addieren/subtrahieren |

##### Format des Datums/der Uhrzeit zur Formatierung der Ausgabe im Widget
Folgende Platzhalter stehen zur Verfügung:

| Platzhalter | Beschreibung |
| ----------- | --------------------------------------------------------------- |
| JJJJ | Jahre in 4 Ziffern |
| JJ | Jahre in 2 Ziffern |
| w | Monate ohne führende Nullen, (nicht zusammen mit den Monaten) |
| ww | Monate mit führenden Nullen, (nicht zusammen mit den Monaten) |
| M | Monate ohne führende Nullen, (nicht zusammen mit den Wochen) |
| MM | Monate mit führenden Nullen, (nicht zusammen mit den Wochen) |
| d | Tage ohne führende Nullen |
| dd | Tage mit führenden Nullen |
| H | Stunden ohne führende Nullen |
| HH | Stunden mit führenden Nullen |
| m | Minuten ohne führende Nullen |
| mm | Minuten mit führenden Nullen |
| s | Sekunden ohne führende Nullen |
| ss | Sekunden mit führenden Nullen |
| \ | Escape-Zeichen, wenn Sie einen Platzhalter in der Ausgabe verwenden möchten |

Wenn mehrere Teile genommen werden, dürfen keine Lücken zwischen ihnen entstehen.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

**Beispiele:**

Alle folgenden Beispiele mit Countdown-Timer 1:2:3:4

| Vorlage | Beispiel | Ergebnis |
| ------------------ | --------------- | ------------------------------------------------ |
| d\d Hh m\m s\s | 1d 2h 3m 4s | mit Escape-Zeichen und ohne führende Nullen |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s | mit Escape-Zeichen und führenden Nullen |
| ss\s | 93784s | nur Sekunden |
| dd\d HH\h | 01d 02h | nur Tage und Stunden |
| HH\h mm\m | 26h 03m | nur Stunden und Minuten |

### Widgets
Ab Version 1.2.0 sollten die Widgets mit vis1 und vis2 kompatibel sein.

#### Widget Countdown (einfach)
![Widget-Countdown (einfach)](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-countdown.png)

Ein Countdown-Widget für eine einfache Textausgabe.
Die Ausgabe kann detailliert konfiguriert werden.

##### Widget-Attribute
| Attribut | Beschreibung |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | Datenpunkt des Countdown-Timers. Es kann jeder beliebige Datenpunkt verwendet werden. |
| `HTML-Prepend` | Dieser Text oder HTML-Code wird der Ausgabe des Widgets vorangestellt |
| `HTML-Append` | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt |
| `HTML-Anhängen` | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt. |

##### Beispiel-Widget-Code
Die Widgets sind für einen Countdown namens „Test“ vorkonfiguriert.
Es gibt zwei separate Versionen für vis1 und vis2.

![Beispiel](../../../en/adapterref/iobroker.mytime/admin/mytime-example1.png)

**VIS1:**

<details><summary>Details</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;g_fixed&quot;:false,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:false,&quot;g_css_background&quot;:false,&quot;g_css_shadow_padding&quot;:false,&quot;g_css_border&quot;:false,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;format&quot;:&quot;d H ms&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;771px&quot;,&quot;top&quot;:&quot;143px&quot;,&quot;width&quot;:&quot;151px&quot;,&quot;height&quot;:&quot;16px&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;+10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;+10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;-10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;-10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;=10&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;=10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;start&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;start&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;pause&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;pause&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;stop&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;stop&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;}]</code></pre></details>

**VIS2:**

<details><summary>Details</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;pause&quot;,&quot;value&quot;:&quot;pause&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000001&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;start&quot;,&quot;value&quot;:&quot;start&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000002&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;stop&quot;,&quot;value&quot;:&quot;stop&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000003&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+10&quot;,&quot;value&quot;:&quot;+10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000004&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=100&quot;,&quot;value&quot;:&quot;=100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000005&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-10&quot;,&quot;value&quot;:&quot;-10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000006&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+!10&quot;,&quot;value&quot;:&quot;+!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000007&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=!100&quot;,&quot;value&quot;:&quot;=!100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000008&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-!10&quot;,&quot;value&quot;:&quot;-!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000009&quot;},{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;countdown_format&quot;:&quot;dd\\d HH\\h mm\\m ss\\s&quot;,&quot;g_common&quot;:true,&quot;g_css_border&quot;:true,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;g_css_font_text&quot;:true},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;375.00001525878906px&quot;,&quot;width&quot;:&quot;182px&quot;,&quot;height&quot;:&quot;24px&quot;,&quot;border-width&quot;:&quot;0&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;rgba(237,235,243,1)&quot;,&quot;text-align&quot;:&quot;center&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;,&quot;_id&quot;:&quot;i000010&quot;}]</code></pre></details>

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

##### Widget-Eigenschaften von Reverse Countdown (einfach)
| Datenpunkt | Beschreibung |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ISO datetime` | Ein DateTime-String mit der Startzeit. Der Ausdruck muss von der JavaScript-Funktion new Date(Ausdruck) interpretiert werden können. Siehe auch <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse> Beispiel: 2022-01-10 23:12 oder 2022-01-104T23:12:00.000Z |
| `HTML-Prepend` | Dieser Text oder HTML-Code wird der Ausgabe des Widgets vorangestellt |
| `HTML-Append` | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt |
| `HTML-Anhängen` | Dieser Text oder HTML-Code wird an die Ausgabe des Widgets angehängt. |

#### Widget Countdown-Kreis
![Widget-Countdown-Kreis](../../../en/adapterref/iobroker.mytime/admin/mytime-circle-countdown.png)

Ein Countdown-Widget in Ring-/Kreisform.

##### Widget-Eigenschaften des Countdown-Kreises
| Attribut | Beschreibung |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| `Format` | Formatiert die Timer-Ausgabe. Standardwert ist mm:ss. Details finden Sie in Kapitel [Datums-/Zeitformat](#format-of-the-datetime-to-format-the-output-in-the-widget). Umkehrbare Einstellung zum Vergrößern oder Verkleinern des Rings/Kreises |
| `reverse` | Die Breite des Rings oder Kreises. |
| `partring` | Der größte ausgewählte Ring wird proportional und nicht vollständig angezeigt. |
| `Width` | Die Breite des Rings oder Kreises. |
| `Ring gap` | Pixelabstand zwischen den Ringen |
| `Ring Caps` | Einstellung für die Enden des Rings/Kreises: rund oder gerade |
| `background` | Hintergrundfarbe des Rings/Kreises |
| `foreground` | Vordergrundfarbe des Rings/Kreises |
| `countdown_color_second` | Vordergrundfarbe des zweiten Rings/Kreises |
| `countdown_color_hour` | Vordergrundfarbe des Stundenrings/-kreises |
| `countdown_color_day` | Vordergrundfarbe des Tagesrings/Kreises |
| `countdown_color_week` | Vordergrundfarbe des Wochenrings/Kreises |
| `countdown_color_month` | Vordergrundfarbe des Monatsrings/Kreises |
| `countdown_color_year` | Vordergrundfarbe des zweiten Rings/Kreises |
| `showsec` | Sekundenring anzeigen |
| `showmin` | Minutenring anzeigen |
| `showhrs` | Minutenring anzeigen |
| `showday` | Zeige den Ring der Tage an |
| `showmonth` | Monatering anzeigen (nicht zusammen mit den Wochen) |
| `showweek` | Zeige den Wochenring an (nicht zusammen mit den Monaten) |
| `showyear` | Zeige den Jahresring an |
| `showyear` | Jahresring anzeigen |

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

Ein Countdown-Widget im Stil einer Flughafen-Anzeigetafel.
Unterstützt werden nur Zeiträume von 100 Tagen bis 1 Sekunde.
Eine individuelle Umrechnung in die ausgewählten Einheiten erfolgt nicht.

##### Widget-Eigenschaften der Countdown-FlipClock
| Attribut | Beschreibung |
| --------------------- | --------------------------------------------- |
| `Object ID` | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| `showmin` | Zeigt den Minutenteil an. |
| `showhrs` | Zeigt den Stundenteil an. |
| `showday` | Zeigt die Tageszeit an. |
| `color` | Farbe des Countdowntimers |
| `background_color` | Hintergrundfarbe des Countdowntimers |
| `countdown_dot_color` | Farbe der Punkte des Countdowntimers |
| `countdown_dot_color` | Farbe der Punkte des Countdowntimers |

Wenn mehrere Teile ausgewählt werden, dürfen keine Lücken zwischen ihnen vorhanden sein.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

Die Anzeigegröße kann über die CSS-Einstellung `font-size` gesteuert werden.

**Der tatsächliche Aktionsstatus (cdstop,cdrun,cdpause,cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### Widget Countdown NixieClock
![Widget-Countdown NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-countdown.png)

Ein Countdown-Widget im Nixie-Röhren-/LED-Stil

##### Widget-Eigenschaften von Countdown NixieClock
| Attribut | Beschreibung |
| -------------------------- | ---------------------------------------------------- |
| Objekt-ID | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| countdown_showsec | Zeigt den Sekundenanteil an. |
| countdown_showmin | Zeigt den Minutenanteil an. |
| countdown_showhrs | Zeigt den Stundenteil an. |
| countdown_showday | Zeigt den Tagesabschnitt an. |
| countdown_showmonth | Zeigt den Monatsteil an. (nicht zusammen mit den Wochen) |
| countdown_showweek | Zeigt die Wochenübersicht an. (nicht zusammen mit den Monaten) |
| countdown_showyear | Zeigt den Jahresteil an. |
| countdown_color_active | Farbe des Countdowntimers |
| countdown_color_inactive | Farbe der inaktiven Ziffern |
| countdown_opacity_inactive | Deckkraft der Farbe der inaktiven Ziffern |
| countdown_glowcolor | Farbe des Leuchtens um diese Nixie-Ziffern |

Wenn mehrere Teile ausgewählt werden, dürfen keine Lücken zwischen ihnen vorhanden sein.

Beispiel:

Gültig: Jahr, Monat, Tag | Stunde, Minute, Sekunde | Ungültig: Jahr, Minute, Sekunde

##### Tipps
###### Obere/Untere Ränder
Die verwendete Schriftart Lato ist leicht nach unten geneigt, wodurch ungleichmäßige obere und untere Ränder entstehen. Dies lässt sich über die Höhe und einen negativen oberen Rand korrigieren.
Das Widget hat eine Höhe von 1em. Die Höhe kann direkt in den Widget-Eigenschaften festgelegt werden.

Für den negativen Rand muss eine CSS-Klasse erstellt werden.

```css
#w00000 .cdclock {
    margin-top: -5px;
}
```

###### Widgetgröße
Die Anzeigegröße kann über die CSS-Einstellung `font-size` gesteuert werden.

###### Zentrieren der Nixie-Uhr
Um die Uhr zu zentrieren, ist eine zusätzliche CSS-Klasse erforderlich, da die entsprechenden Einstellungen nicht in den Widget-Einstellungen konfiguriert werden können:

```css
#w00000 {
    display: flex;
    justify-content: center;
}
```

#### Widget Uhr einfach
![Widget-Uhr (einfach)](../../../en/adapterref/iobroker.mytime/admin/mytime-plain-clock.png)

Ein konfigurierbares Widget zur Anzeige von Datum und Uhrzeit als Klartext.
Die Uhrzeit kann entweder vom Browser-Client oder vom synchronisierten ioBroker-Server übernommen werden.

##### Widget-Eigenschaften der Uhr (einfach)
| Attribut | Beschreibung |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Wählt `client` für die Browserzeit oder `server` für die synchronisierte ioBroker-Serverzeit aus. |
| `clock_html_prepend` | Text oder HTML, der vor dem formatierten Datum und der Uhrzeit eingefügt wird. |
| `clock_html_append` | Text oder HTML, der nach dem formatierten Datum und der Uhrzeit angehängt wird. |
| `clock_html_append` | Text oder HTML, der nach dem formatierten Datum und der Uhrzeit angehängt wird. |

Folgende Platzhalter können in `clock_format` verwendet werden:

| Platzhalter | Beschreibung |
| ----------- | ----------------------------------- |
| `YYYY` | Vierstellige Jahreszahl |
| `MM` / `M` | Monat mit / ohne führende Null |
| `DD` / `D` | Tag mit / ohne führende Null |
| `HH` / `H` | Stunden mit / ohne führende Null |
| `mm` / `m` | Minuten mit / ohne führende Null |
| `ss` / `s` | Sekunden mit / ohne führende Null |
| `ss` / `s` | Sekunden mit / ohne führende Null |

Die Anzeigegröße kann über die CSS-Einstellung `font-size` gesteuert werden.

#### Widget Uhr FlipClock
![Widget-Uhr FlipClock](../../../en/adapterref/iobroker.mytime/admin/mytime-flip-clock.png)

Ein konfigurierbares Datums- und Zeit-Widget im Stil einer Flughafen-Anzeigetafel.
Jede Datums- und Zeitkomponente kann einzeln ein- oder ausgeblendet werden.

##### Widget-Eigenschaften der FlipClock-Uhr
| Attribut | Beschreibung |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Wählt `client` für die Browserzeit oder `server` für die synchronisierte ioBroker-Serverzeit aus. |
| `clock_showyear` | Zeigt die zweistellige Jahreskomponente an. |
| `clock_showmonth` | Zeigt die Monatskomponente an. |
| `clock_showday` | Zeigt die Tageskomponente an. |
| `clock_showhours` | Zeigt die Stundenkomponente an. |
| `clock_showminutes` | Zeigt die Minutenkomponente an. |
| `clock_showseconds` | Zeigt die Sekundenkomponente an. |
| `clock_color` | Legt die Farbe der Ziffern fest. |
| `clock_background_color` | Legt die Hintergrundfarbe der Flip-Karten fest. |
| `clock_dot_color` | Legt die Farbe der Trennlinien zwischen den Komponenten fest. |
| `clock_dot_color` | Legt die Farbe der Trennlinien zwischen den Komponenten fest. |

Die Zeitkomponenten werden stets nach den ausgewählten Datumskomponenten in der Reihenfolge Stunden, Minuten, Sekunden angezeigt.
Die Anzeigegröße kann über die CSS-Einstellung `font-size` gesteuert werden.

#### Widget-Uhr NixieClock
![Widget-Uhr NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie-clock.png)

Ein konfigurierbares Datums- und Zeit-Widget im Nixie-Röhren-/LED-Stil.
Jede Datums- und Zeitkomponente kann einzeln ein- oder ausgeblendet werden.

##### Widget-Eigenschaften der Uhr NixieClock
| Attribut | Beschreibung |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `clock_time_source` | Wählt `client` für die Browserzeit oder `server` für die synchronisierte ioBroker-Serverzeit aus. |
| `clock_showyear` | Zeigt die zweistellige Jahreskomponente an. |
| `clock_showmonth` | Zeigt die Monatskomponente an. |
| `clock_showday` | Zeigt die Tageskomponente an. |
| `clock_showhours` | Zeigt die Stundenkomponente an. |
| `clock_showminutes` | Zeigt die Minutenkomponente an. |
| `clock_showseconds` | Zeigt die Sekundenkomponente an. |
| `clock_color_active` | Legt die Farbe der aktiven Nixie-Ziffern fest. |
| `clock_color_inactive` | Legt die Farbe der inaktiven Nixie-Ziffern fest. |
| `clock_opacity_inactive` | Legt die Deckkraft der inaktiven Ziffern fest. |
| `clock_glowcolor` | Legt die Farbe des Leuchtens um die aktiven Ziffern fest. |
| `clock_glowcolor` | Legt die Farbe des Leuchtens um die aktiven Ziffern fest. |

Die Zeitkomponenten werden stets nach den ausgewählten Datumskomponenten in der Reihenfolge Stunden, Minuten, Sekunden angezeigt.
Die Anzeigegröße kann über die CSS-Einstellung `font-size` gesteuert werden.

#### Widget Wortuhr
![Widget-Wortuhr](../../../en/adapterref/iobroker.mytime/admin/mytime-wordclock.png)

Ein Widget zur Anzeige einer Wortuhr mit vielen Optionen

##### Widget-Eigenschaften der Wortuhr
| Datenpunkt | Beschreibung |
| ------------------- | -------------------------------------------------------- |
| `language` | Für die Wortuhr stehen verschiedene Sprachen zur Verfügung |
| `letterDeactivated` | Farbe für die normalen Buchstaben |
| `wordclockMargin` | Abstand zwischen dem Worttaktgeber und den LEDs |
| `withMinutes` | Minuten-LEDs in der Ecke der Wortuhr anzeigen |
| `minuteSize` | Größe der Minuten-LEDs in Pixeln |
| `minuteColor` | Farbe der Minuten-LED |
| `withSeconds` | Sekunden-LEDs der Wortuhr anzeigen |
| `secondSize` | Größe der Sekunden-LEDs in Pixeln |
| `secondColor` | Farbe der Sekunden-LED |
| `timezone` | Die Zeit der ausgewählten Zeitzone wird angezeigt |
| `Zeitzone` | Die Zeit der ausgewählten Zeitzone wird angezeigt |

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
- rollierende Zahlen
- anpassbare Schriftarten
- ts: Zeitregeln für den Ausschluss (Zeitraum, einzelne Daten)
- ~~Zeitzone für die Wortuhr hinzufügen~~
- ~~Wortuhr-Timer~~
- ~~Zeitplaner: Planen Sie einzelne Termine und wiederkehrende Ereignisse wie in Outlook~~
- ~~Nixie-Stil~~
- ~~Klapptafel (Flughafenanzeige)~~
- ~~neuer Befehl zum Festlegen der Zielzeit ohne Datum~~
- Countdown-Kreis-Widget mit Option zum Deaktivieren des Countdown-Textes
- ~~Gruppierungstrennzeichen '.' im Namen~~
- ~~Polaruhr~~
- ~~Kreis umkehren~~
- ~~Kreis mit runden Kappen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.5.1 (2026-07-24)

- seperate flipclock css classes from timeandweather adapter

### 2.5.0 (2026-07-21)

- Flip clock size is now adjustable via font-size.
- Defined better initial sizes and defaults for various widgets.

### 2.4.1 (2026-07-20)

- add new clock widgets
- fix prod and dev build
- reengineered widgets

### 2.3.5 (2026-07-14)

- fix repochecker
- update react to 18 and many more packages

### 2.3.4 (2026-03-30)

- update packages
- fix repochecker

[Older changelogs can be found there](CHANGELOG_OLD.md)

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