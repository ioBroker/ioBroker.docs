---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: AIanR7D4MkMVi+1aVctXl3fS6CJleCBBuN/BRuRYvLQ=
---
![Logo](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mytime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/mytime-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/mytime-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

#ioBroker.mytime
## Mytime-Adapter für ioBroker
Dieser Adapter verarbeitet Zeit (zB: Countdown, etc.).
Die Countdown-Funktionalität stellt Datenpunkte bereit, mit denen Sie einen Countdown (z. B. in einem Skript) verwalten können. Der Adapter enthält auch mehrere Widgets, um diese Countdowns zu visualisieren.
Mit Zeitreihen können komplexe Zeitreihen erstellt werden, bei denen die Datenpunkte getriggert werden.

### Aufbau
#### Countdown
Im Konfigurationsdialog Reiter "Countdown" können Sie einen neuen Countdown zB 'Test' erstellen, Timer auf 10 Sekunden setzen und folgende Widgets importieren.
Datenpunkte sind für einen Countdown namens Test vorkonfiguriert.

##### Verhaltenstimer stoppen
Nachdem der Countdown das Signal Stopp erhält, wird der Countdown auf die vom Timer eingestellte Zeit zurückgesetzt.

##### Stoppverhalten Null Nachdem der Countdown das Signal Stopp erhält, bleibt der Countdown auf 0.
#### Zeitfolgen
Im Konfigurationsdialog Reiter "Zeitreihen" können Sie eine neue Zeitreihe mit einer oder mehreren Zeitreihen erstellen. Für jede Timerule können Sie verschiedene Parameter definieren. Jede Timeserie erzeugt einen separaten Datenpunkt, der bei den berechneten Zeitereignissen getriggert wird.
Die Zeitereignisse werden in Echtzeit berechnet. Allerdings ist die verwendete Regelbibliothek noch nicht in allen Parameterkombinationen perfekt.
Dies zeigt, dass bei einigen Kombinationen die Seite in eine Endlosschleife geht.
Für Experimente kann auch die Demoseite http://jakubroztocil.github.io/rrule/ genutzt werden.
Zusätzlich zum Hinzufügen einer Timerule können Sie eine Timerule hinzufügen, um Zeitereignisse auszuschließen, einzelne Zeitereignisse hinzuzufügen und auch einzelne Zeitereignisse auszuschließen.

### Verwendungszweck
#### Zeitfolgen
##### Verfügbare Datenpunkte
Nach der Konfiguration einer neuen Zeitreihe erstellt der Adapter folgende Datenpunkte:

| Datenpunkt | Beschreibung |
|-----------|---------------------------------------------------------------------------|
| Aktion | aktueller Stand dieser Zeitreihe. mögliche Werte sind stop,run |
| cmd | keine Funktion atm |

##### Verfügbare Aktionszustände
| Aktion | Beschreibung |
|-----------|-------------------------------------------------------------------------------------------------------|
| halt | Zur Zeit ist kein Zeitereignis aktiv |
| laufen | ein Zeitereignis wurde ausgelöst. nach der konfigurierten Dauer wechselt der Datenpunkt zu Stopp |

#### Countdown
##### Verfügbare Datenpunkte
Nach der Konfiguration eines neuen Countdowns erstellt der Adapter folgende Datenpunkte:

| Datenpunkt | Beschreibung |
|-----------|---------------------------------------------------------------------------|
| Aktion | aktueller Stand dieses Countdowns. mögliche Werte sind stop,run,pause,end |
| cmd | Datenpunkt für Befehle. mögliche Befehle sind unten beschrieben |
| starten | Datenpunkt für die Startzeit in Millisekunden |
| Ende | Datenpunkt für die Endzeit in Millisekunden |
| Timer | Datenpunkt für die Gesamtzeit in Millisekunden |

##### Verfügbare Aktionszustände
| Aktion | Beschreibung |
|-----------|-------------------------------------------------------------------------------------------------------|
| halt | der Countdown wird gestoppt, Start- und Endzeit wird auf 0 gesetzt |
| laufen | der Countdown läuft. wenn der Countdown die Endzeit erreicht. die Aktion wechselt zum Ende |
| Pause | Countdown ist im Pausemodus. die Endzeit wurde auf die Zeit der Pause gesetzt |
| Ende | der Countdown ist beendet. diesen Zustand können Sie als Auslöser für weitere Aktionen verwenden (Sound, Popups, etc.) | |

##### Verfügbare Befehle für den cmd-Datenpunkt
| Befehl | Beispiel | Beschreibung |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| +Wert | +1:10 | fügt der Countdown-Einstellung Zeit hinzu. die Einstellung wird beim nächsten Start berücksichtigt |
| -Wert | -1:2:3 | subtrahiert die Zeit vom Countdown. die Einstellung wird beim nächsten Start berücksichtigt |
| =Wert | =5:00 | stellen Sie den Countdowntimer auf diese Zeit ein. |
| #ISO-Datum | #2020-01-01T10:00:00 | Stellen Sie den Countdowntimer auf eine Zielzeit ein. Die Uhrzeit muss als ISO-Datestring formatiert sein |
| $Zeit | $20:15 | Stellen Sie den Countdowntimer auf eine Zielzeit ein. Wenn die Uhrzeit vor der aktuellen Uhrzeit liegt. der nächste Tag steht fest.|
| starten | starten | startet den Countdown |
| halt | halt | stoppt den Countdown. die Countdownzeit wird auf die Einstellung | . zurückgesetzt |
| Pause | Pause | hält den Countdown an |
| Ende | Ende | stoppt den Countdown. der Countdown wird auf 0 gesetzt |
| setstop2timer | setstop2timer | Konfiguration des Stoppverhaltens auf Timer setzen |
| setstop2zero | setstop2zero | Konfiguration des Stoppverhaltens auf Null setzen |
| speichern | speichern | Speichern Sie die in Datenpunkten definierte Konfiguration in der iobroker-Konfiguration |
| | | iobroker startet den Adapter nach dem automatischen Speichern neu |

##### Format des Wertes zum Einstellen des Countdown-Timers
Sie können den Countdown auf eine unbegrenzte Zeit einstellen.
die Notation des Wertes ist [Tage:[Stunden:[Minuten:[Sekunden]]]] Tage, Stunden und Minuten sind optional.
Wenn Sie den Timer auf einen Tag stellen möchten, müssen Sie Stunden, Minuten und Sekunden einstellen. Sie müssen die normalen Wertebereiche (zB Stunden 0-24) nicht einhalten. Sie können auch 48 Stunden einstellen.
Wenn Sie möchten, können Sie unregelmäßige Zeitangaben einstellen. die Zeit wird separat zusammengezählt

**Beispiele**

| Einstellung | Beschreibung |
|-----------|---------------------------------------------|
| 1:0:0:0 | setze/addiert/subtrahiert 1 Tag zum Timer |
| 2:0:0 | setzt/addiert/subtrahiert 2 Stunden zum Timer |
| 3:0 | setzt/addiert/subtrahiert 3 Minuten zum Timer |
| 120 | setzt/addiert/subtrahiert 120 Sekunden zum Timer |
| 48:0:0 | setzt/addiert/subtrahiert 48 Stunden zum Timer |
| 48:75:120 | setze/addiert/subtrahiert den Timer |

##### Format der Vorlage zum Formatieren der Countdown-Ausgabe im Widget
Folgende Platzhalter stehen zur Verfügung:

| Platzhalter | Beschreibung |
|-------------|-----------------------------------------------------------------|
| d | Tage ohne führende Nullen |
| dd | Tage mit führenden Nullen |
| H | Stunden ohne führende Nullen |
| HH | Stunden mit führenden Nullen |
| m | Minuten ohne führende Nullen |
| mm | Minuten mit führenden Nullen |
| s | Sekunden ohne führende Nullen |
| ss | Sekunden mit führenden Nullen |
| \ | Escape-Zeichen, wenn Sie einen Platzhalter in der Ausgabe verwenden möchten |

**Beispiele**

Alle folgenden Beispiele mit Countdown-Timer 1:2:3:4

| Vorlage | Beispiel | Ergebnis |
|-----------------------|-------------------|--------------------------------------------------|
| d\d Hh m\m s\s | 1d 2h 3m 4s | mit Escape-Zeichen und ohne führende Nullen |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s | mit Escape-Zeichen und mit führenden Nullen |
| ss\s | 93784s | nur Sekunden |
| dd\d HH\h | 01d 02h | nur Tage und Stunden |
| HH\h mm\m | 26h 03m | nur Stunden und Minuten |

###Widgets
#### Widget-Countdown-Ebene
Ein Countdown-Widget für eine reine Textausgabe

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Format Formatiert die Timer-Ausgabe. Standard ist mm:ss. Details siehe Kapitelformatvorlage
##### Beispiel-Widget-Code
die Widgets sind für einen Countdown namens test vorkonfiguriert.

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### Der aktuelle Aktionszustand (cdstop,cdrun,cdpause,cdend) des Countdowns steht als CSS-Klassenselektor zur Verfügung.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget-Countdown-Kreis
Ein Countdown-Widget im Ring-/Kreis-Design.

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Notimetext Deaktiviert den Zeittext über die Polaruhr
###### Format Formatiert die Timer-Ausgabe. Standard ist mm:ss. Details siehe Kapitelformatvorlage
###### Umgekehrte Einstellung zum Vergrößern oder Verkleinern des Rings/Kreises
###### Breite Die Breite des Rings oder Kreises.
###### Ringlücke Pixellücke zwischen den Ringen
###### Kappeneinstellung für die Enden des Rings/Kreises: rund oder gerade
###### Hintergrund Hintergrundfarbe des Rings/Kreises
###### Vordergrund Vordergrundfarbe des Rings/Kreises
###### Showsec Zeigt den Sekundenring an
###### Showmin Zeigt den Minutenring an
###### Showhrs Zeigt den Minutenring an
###### Showday Zeige den Ring der Tage
##### Der aktuelle Aktionszustand (cdstop,cdrun,cdpause,cdend) des Countdowns steht als CSS-Klassenselektor zur Verfügung.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown FlipClock
Ein Countdown-Widget im Flughafen-Flipboard-Stil

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Countdown_showsec Zeigt den Sekundenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showmin Zeigt den Minutenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showhrs Zeigt den Stundenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showday Zeigt den Tagesabschnitt an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_color Farbe des Countdowntimers
###### Countdown_background_color Hintergrundfarbe des Countdowntimers
###### Countdown_dot_color Farbe der Punkte des Countdowntimers
##### Tipps
Wenn Sie die Größe der Countdown-Flipclock anpassen möchten, können Sie unter CSS-Einstellungen in vis für halbe Größe eingeben: Group CSS-Common / transform "scale(0.5)"

##### Der aktuelle Aktionszustand (cdstop,cdrun,cdpause,cdend) des Countdowns steht als CSS-Klassenselektor zur Verfügung.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget-Countdown NixieClock
Ein Countdown-Widget im Nixie-Tube/LED-Stil

##### Widget-Eigenschaften
###### Oid
Der Timer-Datenpunkt eines Countdown-Datenpunkts.

###### Countdown_showsec Zeigt den Sekundenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showmin Zeigt den Minutenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showhrs Zeigt den Stundenteil an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_showday Zeigt den Tagesabschnitt an. Zwischen zwei Einheiten darf keine Lücke sein.
###### Countdown_color_active Farbe des Countdowntimers
###### Countdown_color_inactive Farbe der inaktiven Ziffern
###### Countdown_opacity_inactive Deckkraft der Farbe der inaktiven Ziffern
###### Countdown_glowcolor Farbe des Leuchtens um die Nixie-Ziffern
#### Widget Wordclock
Ein Widget zum Anzeigen einer Wordclock mit vielen Optionen

##### Widget-Eigenschaften
###### Sprache
Einige verschiedene Sprachen für die Wordclock sind verfügbar

###### LetterActivated Farbe für die hervorgehobenen Wörter
###### LetterDeaktiviert Farbe für die normalen Buchstaben
###### WordclockMargin Margin zwischen der Wordclock und den LEDs
###### WithMinutes Zeigt die Minuten-LEDs in der Ecke der Wordclock
###### MinuteSize Größe in Pixel der Minute LEDs
###### MinuteFarbe der Minute LED
###### WithSeconds Zeigt die Sekunden-LEDs der Wordclock
###### SecondSize Größe in Pixel der Sekunden LEDs
###### SekundeFarbe der Sekunden-LED
##### Tipps
Wenn Sie die Größe der Countdown-Nixieclock anpassen möchten, können Sie unter CSS-Einstellungen in vis für halbe Größe eingeben: Group CSS-Common / transform "scale(0.5)"

##### Der aktuelle Aktionszustand (cdstop,cdrun,cdpause,cdend) des Countdowns steht als CSS-Klassenselektor zur Verfügung.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

## Machen
* 7-Segment-Anzeige
* rollierende Zahlen
* anpassbare Schriftarten
* ts: Timerules zum Ausschluss (Zeitraum, einzelne Daten)
* ~~Wordclock-Timer~~
* ~~zeitgesteuerter Planer: Plane einzelnes Datum/Uhrzeit und wiederkehrende Ereignisse wie Outlook~~
* ~~Nixie-Stil~~
* ~~Flipboard-Anzeige (Flughafen-Anzeige)~~
* ~~neuer Befehl, um nur die Zielzeit ohne Datum einzustellen~~
* ~~Countdown-Kreis-Widget mit Option zum Deaktivieren des Countdown-Textes
* ~~Gruppentrenner '.' im Namen~~
* ~~Polaruhr~~
* ~~Kreis rückwärts~~
* ~~Kreis mit runden Kappen~~

## Changelog


### 0.7.2
* * add russian and espaniol for wordclock
### 0.7.1
* add margin property for wordclock * add italiano and francais for wordclock * wordclock remove border
### 0.7.0
* New widget wordclock
### 0.6.1
* remove beta tag from widgets * m,assive reengeneering of the react classes, add functions für exclusion rules, adding single time events and exclude single time events
### 0.6.0
* Introduction of new functionality timeseries
### 0.5.2
* fix an issue and introduce a new command save to save the configuration defined in datapoints to the iobroker configuration data
### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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