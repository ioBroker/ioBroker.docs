---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: dKou9UsuRwTDEpxx02fHxmREnUPTepWzl5Jrkw6oN/I=
---
![Logo](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mytime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mytime-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mytime-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mytime.png?downloads=true)

# IoBroker.mytime
**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

## WICHTIG
Es ist ausschließlich die englische Dokumentation gültig, da durch die automatische Übersetzung auch Bereiche übersetzt werden, die nicht übersetzt werden sollen.

## Mytime-Adapter für ioBroker
Dieser Adapter verarbeitet Zeit (z. B. Countdown usw.).
Die Countdown-Funktionalität bietet Datenpunkte, die Sie zum Verwalten eines Countdowns verwenden können (z. B. in einem Skript). Der Adapter enthält auch mehrere Widgets zum Visualisieren dieser Countdowns. Zeitreihen können zum Erstellen komplexer Zeitreihen verwendet werden, bei denen die Datenpunkte ausgelöst werden.

### Konfiguration
#### Countdown
Im Konfigurationsdialogfeld „Countdown“ können Sie einen neuen Countdown (z. B. „Test“) erstellen, den Timer auf 10 Sekunden einstellen und die folgenden Widgets importieren.
Datenpunkte sind für einen Countdown mit dem Namen „Test“ vorkonfiguriert.

##### Verhaltenstimer stoppen
Nachdem der Countdown das Stoppsignal erhalten hat, wird er auf die vom Timer eingestellte Zeit zurückgesetzt.

##### Stoppverhalten Null
Nachdem der Countdown das Signal zum Stoppen erhält, bleibt der Countdown bei 0 stehen.

#### Zeitreihen
Im Konfigurationsdialog Tab „Zeitreihen“ können Sie eine neue Zeitreihe mit einer oder mehreren Zeitregeln erstellen. Für jede Zeitregel können Sie verschiedene Parameter definieren. Jede Zeitreihe erstellt einen separaten Datenpunkt, der bei den berechneten Zeitereignissen ausgelöst wird.
Die Zeitereignisse werden in Echtzeit berechnet. Die verwendete Regelbibliothek ist jedoch noch nicht in allen Parameterkombinationen perfekt.
Dies zeigt, dass die Seite bei einigen Kombinationen in eine Endlosschleife gerät.
Die Demoseite <http://jakubroztocil.github.io/rrule/> kann auch für Experimente verwendet werden.
Zusätzlich zum Hinzufügen einer Zeitregel können Sie eine Zeitregel hinzufügen, um Zeitereignisse auszuschließen, um einzelne Zeitereignisse hinzuzufügen und auch um einzelne Zeitereignisse auszuschließen.

### Verwendung
#### Verwendung von Zeitreihen
##### Verfügbare Datenpunkte einer Zeitreihe
Nach der Konfiguration einer neuen Zeitreihe erstellt der Adapter die folgenden Datenpunkte:

| Datenpunkt | Beschreibung |
| --------- | ------------------------------------------------------------ |
| Aktion | aktueller Status dieser Zeitreihe. Mögliche Werte sind „stop“, „run“ |
| cmd | im Moment keine Funktion |

##### Verfügbare Aktionszustände
| Aktion | Beschreibung |
| ------ | --------------------------------------------------------------------------------------------- |
| Stopp | momentan ist kein Zeitereignis aktiv |
| Ausführen | Ein Zeitereignis wurde ausgelöst. Nach der konfigurierten Dauer wechselt der Datenpunkt auf Stopp |

#### Verwendung des Countdowns
##### Verfügbare Datenpunkte eines Countdowns
Nach der Konfiguration eines neuen Countdowns erstellt der Adapter folgende Datenpunkte:

| Datenpunkt | Beschreibung |
| --------- | ---------------------------------------------------------------------- |
| Aktion | aktueller Stand des Countdowns. Mögliche Werte sind Stopp, Ausführen, Pause, Ende |
| cmd | Datenpunkt für Befehle. Mögliche Befehle sind unten beschrieben |
| Start | Datenpunkt für die Startzeit in Millisekunden |
| Ende | Datenpunkt für die Endzeit in Millisekunden |
| Timer | Datenpunkt für die eingestellte Gesamtzeit in Millisekunden |

##### Verfügbare Aktionszustände eines Countdowns
| Aktion | Beschreibung |
| ------ | ----------------------------------------------------------------------------------------------------- |
| Stopp | der Countdown wird gestoppt, Start- und Endzeit werden auf 0 gesetzt |
| laufen | der Countdown läuft. Erreicht der Countdown die Endzeit, wechselt die Aktion auf Ende |
| Pause | Countdown ist im Pausenmodus. Die Endzeit wurde auf die Zeit der Pause eingestellt |
| Ende | Der Countdown ist beendet. Diesen Zustand kannst du als Auslöser für weitere Aktionen (Sound, Popups etc.) verwenden. |

##### Verfügbare Befehle für den cmd-Datenpunkt
| Befehl | Beispiel | Beschreibung |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| +Wert | +1:10 | fügt der Countdown-Einstellung Zeit hinzu. Die Einstellung wird beim nächsten Start berücksichtigt |
| +!Wert | +!1:10 | wie +-Operator und verlängere den laufenden Timer |
| -Wert | -1:2:3 | zieht Zeit vom Countdown ab. Einstellung wird beim nächsten Start berücksichtigt |
| -!value | -!1:2:3 | wie - Operator und reduziere den laufenden Timer |
| =Wert | =5:00 | Setze den Countdowntimer auf diese Zeit. |
| =!Wert | =!5:00 | wie = Operator und setze laufenden Timer auf die angegebene Zeit |
| #ISO-Datum | #2025-01-01T10:00:00 | setze den Countdowntimer auf eine Zielzeit. Die Zeit muss als ISO-Datumsstring formatiert sein |
| #!ISO-Date | #!2025-01-01T10:00:00 | wie # Operator und Setzen des laufenden Timers auf die angegebene Zielzeit |
| $Time | $20:15 | setze den Countdowntimer auf eine Zielzeit. Wenn die Zeit vor der aktuellen Zeit liegt, wird der nächste Tag eingestellt. |
| $!Time | $!20:15 | wie $-Operator und setzt den laufenden Timer auf die angegebene Zielzeit |
| Start | Start | startet den Countdown |
| Stopp | Stopp | stoppt den Countdown. Die Countdownzeit wird auf die Einstellung zurückgesetzt |
| Pause | Pause | unterbricht den Countdown |
| Ende | Ende | stoppt den Countdown. Der Countdown wird auf 0 gesetzt |
| zurücksetzen | zurücksetzen | setzt den Timer auf den Konfigurationszustand zurück |
| setstop2timer | setstop2timer | Stoppverhaltenskonfiguration auf Timer setzen |
| setstop2zero | setstop2zero | Konfiguration des Stoppverhaltens auf Nullen setzen |
| speichern | speichern | die in Datenpunkten definierte Konfiguration in der Iobroker-Konfiguration speichern |
| | | iobroker startet den Adapter nach dem Speichern automatisch neu |

##### Format des Wertes zum Einstellen des Countdown-Timers
Sie können den Countdown auf eine unbegrenzte Zeit einstellen.
Die Notation des Wertes ist [Tage:[Stunden:[Minuten:[Sekunden]]]] Tage, Stunden und Minuten sind optional.
Wenn Sie den Timer auf einen Tag einstellen möchten, müssen Sie auch Stunden, Minuten und Sekunden einstellen. Sie müssen die normalen Wertebereiche (z. B. Stunden 0-24) nicht einhalten.
Sie können auch 48 Stunden einstellen.
Wenn Sie möchten, können Sie unregelmäßige Zeitnotationen einstellen. Die Zeit wird separat summiert

**Beispiele:**

| Einstellung | Beschreibung |
| --------- | ------------------------------------------- |
| 1:0:0:0 | setzt/addiert/subtrahiert 1 Tag zum Timer |
| 2:0:0 | stellt 2 Stunden ein/addiert/subtrahiert sie zum Timer |
| 3:0 | stellt 3 Minuten auf den Timer ein/addiert/subtrahiert sie |
| 120 | stellt/addiert/subtrahiert 120 Sekunden zum Timer |
| 48:0:0 | stellt 48 Stunden ein/addiert/subtrahiert sie zum Timer |
| 48:75:120 | setzt/addiert/subtrahiert den Timer |

##### Format der Vorlage zum Formatieren der Countdown-Ausgabe im Widget
Folgende Platzhalter stehen zur Verfügung:

| Platzhalter | Beschreibung |
| ----------- | --------------------------------------------------------------- |
| d | Tage ohne führende Nullen |
| tt | Tage mit führenden Nullen |
|H | Stunden ohne führende Nullen |
| HH | Stunden mit führenden Nullen |
| m | Minuten ohne führende Nullen |
| mm | Minuten mit führenden Nullen |
| s | Sekunden ohne führende Nullen |
| ss | Sekunden mit führenden Nullen |
| \ | Escape-Zeichen, wenn Sie in der Ausgabe einen Platzhalter verwenden möchten |

**Beispiele:**

Alle folgenden Beispiele mit Countdown-Timer 1:2:3:4

| Vorlage | Beispiel | Ergebnis |
| ------------------ | --------------- | ------------------------------------------------ |
| d\d Hh m\m s\s | 1d 2h 3m 4s | mit Escape-Zeichen und ohne führende Nullen |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s | mit Escape-Zeichen und führenden Nullen |
| ss\s | 93784s | nur Sekunden |
| tt\t HH\h | 01d 02h | nur Tage und Stunden |
| HH\h mm\m | 26h 03m | nur Stunden und Minuten |

### Widgets
Ab Version 1.2.0 sollten die Widgets mit vis1 und vis2 kompatibel sein.

#### Widget Countdown einfach
Ein Countdown-Widget für eine reine Textausgabe

##### Widget-Eigenschaften
###### Nicht
Der Timer-Datenpunkt eines Countdown-Datenpunkts.

###### Format
Formatiert die Timer-Ausgabe. Standard ist mm:ss. Einzelheiten finden Sie im Kapitel „Formatvorlage“.

##### Beispiel-Widget-Code
Die Widgets sind für einen Countdown namens Test vorkonfiguriert.
Es gibt 2 separate Versionen für vis1 und vis2

**VIS1:**

<details><summary>Details</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;g_fixed&quot;:false,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:false,&quot;g_css_background&quot;:false,&quot;g_css_shadow_padding&quot;:false,&quot;g_css_border&quot;:false,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;format&quot;:&quot;d H ms&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;771px&quot;,&quot;top&quot;:&quot;143px&quot;,&quot;width&quot;:&quot;151px&quot;,&quot;height&quot;:&quot;16px&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;+10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;+10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;-10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;-10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;=10&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;=10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;start&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;start&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;pause&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;pause&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;stop&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;stop&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;}]</code></pre></details>

**VIS2:**

<details><summary>Details</summary><pre> <code>[{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;pause&quot;,&quot;value&quot;:&quot;pause&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000001&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;start&quot;,&quot;value&quot;:&quot;start&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000002&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;stop&quot;,&quot;value&quot;:&quot;stop&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000003&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+10&quot;,&quot;value&quot;:&quot;+10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000004&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=100&quot;,&quot;value&quot;:&quot;=100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000005&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-10&quot;,&quot;value&quot;:&quot;-10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000006&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+!10&quot;,&quot;value&quot;:&quot;+!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000007&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=!100&quot;,&quot;value&quot;:&quot;=!100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000008&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-!10&quot;,&quot;value&quot;:&quot;-!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000009&quot;},{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;countdown_format&quot;:&quot;dd\\d HH\\h mm\\m ss\\s&quot;,&quot;g_common&quot;:true,&quot;g_css_border&quot;:true,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;g_css_font_text&quot;:true},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;375.00001525878906px&quot;,&quot;width&quot;:&quot;182px&quot;,&quot;height&quot;:&quot;24px&quot;,&quot;border-width&quot;:&quot;0&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;rgba(237,235,243,1)&quot;,&quot;text-align&quot;:&quot;center&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;,&quot;_id&quot;:&quot;i000010&quot;}]</code></pre></details>

**Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Widget Reverse Countdown einfach
Ein Widget, das die verstrichene Zeit ab einem bestimmten Zeitpunkt anzeigt

##### Widget-Eigenschaften von Reverse Countdown plain
| Datenpunkt | Beschreibung |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datetime | Ein DateTime-String der Startzeit. Der Ausdruck muss von der Javascript-Funktion new Date(expression) interpretiert werden können. Siehe auch <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse> Beispiel: 2022-01-10 23:12 oder 2022-01-104T23:12:00.000Z |
| Format | Formatiert die Timerausgabe. Standard ist mm:ss. Details siehe Kapitel Formatvorlage |
| HTML-Prepend | Dieser Text oder HTML wird der Ausgabe des Widgets vorangestellt |
| HTML-Anhang | Dieser Text oder HTML wird an die Ausgabe des Widgets angehängt |

#### Widget Countdown-Kreis
Ein Countdown-Widget im Ring-/Kreisdesign.

##### Widget-Eigenschaften des Countdown-Kreises
| Datenpunkt | Beschreibung |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| oid | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| notimetext | Deaktiviert den Zeittext über der Polar-Uhr |
| Format | Formatiert die Timer-Ausgabe. Standard ist mm:ss. Einzelheiten siehe Kapitel Formatvorlage. ReversevEinstellung zum Vergrößern oder Verkleinern des Rings/Kreises |
| Breite | Die Breite des Rings oder Kreises. |
| Ringlücke | Lücke im Pixel zwischen den Ringen |
| Kappen | Fassung für Ring-/Kreisenden: rund oder gerade |
| Hintergrund | Hintergrundfarbe des Rings/Kreises |
| Vordergrund | Vordergrundfarbe des Rings/Kreises |
| showsec | Sekundenring anzeigen |
| showmin | Minutenring anzeigen |
| showhrs | Minutenring anzeigen |
| Showtag | Den Ring der Tage anzeigen |

**Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Widget Countdown FlipClock
Ein Countdown-Widget im Flughafen-Flipboard-Stil

##### Widget-Eigenschaften von Countdown FlipClock
| Datenpunkt | Beschreibung |
| -------------------------- | --------------------------------------------------------------- |
| oid | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| countdown_showsec | Zeigt den Sekundenteil. Es darf keine Lücke zwischen zwei Einheiten geben. |
| countdown_showmin | Zeigt den Minutenanteil. Zwischen zwei Einheiten darf keine Lücke sein. |
| countdown_showhrs | Zeigt den Stundenanteil. Zwischen zwei Einheiten darf keine Lücke sein. |
| countdown_showday | Zeigt den Tagesanteil. Es darf keine Lücke zwischen zwei Einheiten geben. |
| countdown_color | Farbe des Countdowntimers |
| countdown_background_color | Hintergrundfarbe des Countdowntimers |
| countdown_dot_color | Farbe der Punkte des Countdowntimers |

**Tipps:**

Wenn du die Größe der Countdown-Flipclock anpassen möchtest, kannst du unter den CSS-Einstellungen in Vis für die halbe Größe Folgendes eingeben: Group CSS-Common / transform "scale(0.5)"

**Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

#### Widget Countdown NixieClock
Ein Countdown-Widget im Nixie-Tube/LED-Stil

##### Widget-Eigenschaften von Countdown NixieClock
| Datenpunkt | Beschreibung |
| -------------------------- | --------------------------------------------------------------- |
| oid | Der Timer-Datenpunkt eines Countdown-Datenpunkts. |
| countdown_showsec | Zeigt den Sekundenteil. Es darf keine Lücke zwischen zwei Einheiten geben. |
| countdown_showmin | Zeigt den Minutenanteil. Zwischen zwei Einheiten darf keine Lücke sein. |
| countdown_showhrs | Zeigt den Stundenanteil. Zwischen zwei Einheiten darf keine Lücke sein. |
| countdown_showday | Zeigt den Tagesanteil. Es darf keine Lücke zwischen zwei Einheiten geben. |
| countdown_color_active | Farbe des Countdowntimers |
| countdown_color_inactive | Farbe der inaktiven Ziffern |
| countdown_opacity_inactive | Opazität der Farbe der inaktiven Ziffern |
| countdown_glowcolor | Farbe des Leuchtens um diese Nixie-Ziffern |

#### Widget Wortuhr
Ein Widget zum Anzeigen einer Wordclock mit vielen Optionen

##### Widget-Eigenschaften von Wordclock
| Datenpunkt | Beschreibung |
| ----------------- | -------------------------------------------------------- |
| Sprache | Für die Wordclock sind verschiedene Sprachen verfügbar |
| letterActivated | Farbe für die hervorgehobenen Wörter |
| letterDeactivated | Farbe für die normalen Buchstaben |
| wordclockMargin | Abstand zwischen der Wordclock und den LEDs |
| mitMinuten | Zeigt die Minuten-LEDs in der Ecke der Wordclock an |
| minuteSize | Größe der winzigen LEDs in Pixeln |
| minuteColor | Farbe der Minuten-LED |
| withSeconds | Zeigt die Sekunden-LEDs der Wordclock an |
| secondSize | Größe der Sekunden-LEDs in Pixeln |
| secondColor | Farbe der Sekunden-LED |
| Zeitzone | Es wird die Zeit der ausgewählten Zeitzone angezeigt |

**Tipps:**

Wenn Sie die Größe der Countdown-Nixieuhr anpassen möchten, können Sie unter den CSS-Einstellungen in Vis für die halbe Größe Folgendes eingeben: Group CSS-Common / transform "scale(0.5)"

**Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenselektor verfügbar:**

```css
#w00000 .timer.cdend {
  color: red;
}
#w00000 .timer.cdrun {
  color: green;
}
```

## Aufgaben
- 7-Segment-Anzeige
- rollende Zahlen
- anpassbare Schriftarten
- ts: Zeitregeln für Ausschlüsse (Zeitraum, einzelne Daten)
- ~~Zeitzone für Wordclock hinzufügen~~
- ~~Wordclock-Timer~~
- ~~Zeitplaner: Planen Sie einzelne Termine/Uhrzeiten und wiederkehrende Ereignisse wie Outlook~~
- ~~Nixie-Stil~~
- ~~Flipboard-Anzeige (Flughafen-Anzeige)~~
- ~~Neuer Befehl, um nur die Zielzeit ohne Datum festzulegen~~
- ~~Countdown-Kreis-Widget mit Option zum Deaktivieren des Countdown-Textes
- ~~Gruppentrennzeichen '.' im Namen~~
- ~~Polaruhr~~
- ~~Kreis umkehren~~
- ~~Kreis mit runden Kappen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.0 (2025-01-02)

- to update the time from the configuration i added a SetDP Button

### 1.3.0 (2025-01-02)

- switch to iobroker eslint
- adjust many code to follow the new rules
- add some jsdoc
- implement servertimediff calculation and correction
- fix datapoint names for the vis1 example controls
- set nogit
- adjust year in readme and license

### 1.2.2 (2024-11-18)

- improve readme
- improve widget js
- remove word test from widgets html, sorry

### 1.2.1 (2024-11-17)

- interprete all commands in lowercase

### 1.2.0 (2024-11-15)

- widgets are now compatible with vis2

### 1.1.1 (2024-11-13)

- fix problem with start of vis2, exclude widgets for vis2

### 1.1.0 (2024-11-12)

- IMPORTANT: Changed Datapoint names and datastructure for the configuration,
  no migration you have to enter all configurations again
- add some new commands to restart the countdown time in place
- repair save command
- removed vis dependency from io-package.json

### 1.0.15 (2024-11-11)

- repair issues from repochecker

### 1.0.14 (2024-11-11)

- improve test and release process
- update github workflow
- remove eslint command from package.json
- switch back to node 18 for testing due to airbnb error
- more repair
- add package-lock.json to git
- remove unused library
- add lint and lint
- remove iobroker eslint
- general revision
- updating the configuration dialogs for countdown and timeseries
  in jsonConfig and custom react

### 0.7.12

- add html_prepend and html_append properties to the widget reverse countdown

### 0.7.10

- add widget reverse countdown

### 0.7.9

- add more wordclock tests
- fix wordclock matrix swiss

### 0.7.8

- add timezone for wordclock

### 0.7.7

- add timezone for wordclock

### 0.7.6

- add tests for wordclock \* remove admin tab

### 0.7.5

- Remove comments in io-package

### 0.7.4

- fix spanish language pack

### 0.7.3

- add turkish language for wordclock

### 0.7.2

- add russian and espaniol language for wordclock

### 0.7.1

- add margin property for wordclock
- add italiano and francais for wordclock
- wordclock remove border

### 0.7.0

- New widget wordclock

### 0.6.1

- remove beta tag from widgets \* m,assive reengeneering of the react classes,
  add functions für exclusion rules, adding single time events
  and exclude single time events

### 0.6.0

- Introduction of new functionality timeseries

### 0.5.2

- fix an issue and introduce a new command save to save the configuration
  defined in datapoints to the iobroker configuration data

### 0.5.1

- Migration of old counters

### 0.5.0

- Change settings dialog to react

### 0.4.2

- performance optimization. mytime now checks the data from internal
  and did not read the data allways from datapoints | update dependencies

### 0.4.1

- widget cd flipclock: remove dot labels

### 0.4.0

- New widget NixieClock

### 0.3.1

- remove mytime tile in iobroker overview
- set initial visual countdown value to 0
- prefix css classes, due css artefacts from other adapters
  (eg kodi and css class stop)

### 0.3.0

- new command to set only target time without date
- countdown circle widget now with option to disable countdown text
- timers are now groupable in subdirectories.
  you can now enter dots (.) as a groupseperater in the name of a timer

### 0.2.1

- fix timer display in configuration dialog
- fix default template of countdown plain
- add icons for countdonw plain and countdown circle widgets
- fix startangle calculation for countdown circle if time values are 0
- remove timer intervals in editmode due to interfer with
  the configuration dialog and didnt save the ne values

### 0.2.0

- extend the countdown circle with more rings for days, hours and minutes

### 0.1.2

- Setting for growing or shrinking the ring/circle
- Setting for the ends of the ring/circle: round or straight
- Extend special char filtering with umlauts
- Fix state request issue in widget countdown circle

### 0.1.1

- Add a countdown name datapoint

### 0.1.0

- Forum release
- initial release

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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