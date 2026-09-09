---
chapters: {"pages":{"en/adapterref/iobroker.vis-homekittiles/README.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/README.md"},"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-de.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-de.md"},"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-en.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-homekittiles/doc/homekittiles-en.md
title: ioBroker.vis-homekittiles
hash: VweukcsCGFpJwt8YngM824DXdF0SkKU/HOND56xxZo0=
---
# ioBroker.vis-homekittiles

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-homekittiles-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)
![Test und Freigabe](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

<img src="img/title-pic_hkt-on-ipad.png" />

## 🇺🇸 HomeKit-Tiles für ioBroker-VIS

HomeKit Tiles ist ein Widget-Set, das auf dem Design von Apple HomeKit basiert. Die Besonderheit der Widgets besteht darin, dass sie keine festen Stilelemente enthalten, sondern alles über CSS formatiert wird. Daher gibt es im VIS-Editor keine separaten Einstellungen für die Position und/oder Größe von Symbolen, Beschriftungen usw. Das Design wird durch Ändern des CSS-Codes angepasst. Zu diesem Zweck wird der CSS-Code aus der Datei verwendet.`/widgets/homekittiles/css/style.css` Kann als Vorlage verwendet werden. Der Code wird im CSS-Tab des VIS-Editors eingefügt und kann nach Belieben angepasst werden. Es ist auch möglich, eigene CSS-Klassen über den VIS-Editor im Bereich „Allgemein“ der Widgets hinzuzufügen.

Die Widgets sind für VIS 1.x konzipiert.

**Hinweis:** Aus Lizenzgründen sind in diesem Adapter keine Symbole enthalten. Sehr gute Symbolquellen sind:

- <https://www.flaticon.com>
- <https://icons8.com>

## Widget-Typen

### hkt-Benachrichtigung

<img src="/doc/img/hkt-Notification.png" width="120" />

Die Benachrichtigungsfunktion kann verwendet werden, um Hinweise (ähnlich den roten Sprechblasen in Smartphone-Apps) an beliebiger Stelle anzuzeigen. Sie eignet sich ideal in Kombination mit einer Navigationsschaltfläche, um auf Störungen, Fehler oder wichtige Informationen in der jeweiligen Ansicht hinzuweisen. Es werden 5 Datenpunkte und 5 verschiedene Farben für die Benachrichtigungen unterstützt. Mithilfe von Kontrollkästchen können Sie auswählen, ob die Benachrichtigungen auch mit dem jeweiligen Wert angezeigt werden sollen.`0` Die

### hkt-Datumsauswahl

<img src="/doc/img/hkt-Datepicker.png" height="120" />

Mit dem Datumsauswahlfeld kann ein Datum aus dem Kalender ausgewählt werden; das Widget verwendet hierfür das jqui-Datumsauswahlfeld. Da dieses sehr komplex ist und nicht kopiert/nachgebaut werden sollte, und um andere VIS-Projekte auf demselben System nicht zu beeinträchtigen, enthält das Widget keine integrierte Formatierung für das Datumsauswahlfeld. Um das Erscheinungsbild dennoch anzupassen, kann der folgende CSS-Code in das VIS-Projekt eingefügt werden:

```CSS
.ui-datepicker {
     padding: 0;
     font-size: 15px;
     border-radius: 5px;
     font-family: -apple-system;
     border: unset;
     background: unset;
     color: unset;
     background-color: #888;
}
.ui-datepicker .ui-datepicker-header {
     padding: .2em 0;
     border-radius: 5px 5px 0 0;
     color: unset;
     border: unset;
     background: unset;
     background-color: var(--hkt-color-tile-on-background);
     font-weight: bold;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev-hover,
.ui-datepicker .ui-datepicker-header .ui-datepicker-next-hover {
     border: unset;
     background: unset;
     font-weight: unset;
     color: unset;
     top: 2px;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev .ui-icon-circle-triangle-w,
.ui-datepicker .ui-datepicker-header .ui-datepicker-next .ui-icon-circle-triangle-e {
     background-image: unset;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev .ui-icon-circle-triangle-w:before {
     content: "";
     position: relative;
     width: 20px;
     height: 20px;
     display: block;
     color: #000;
     border-width: 3px 0 0 3px;
     border-color: #000;
     border-style: solid;
     transform: rotate(-45deg);
     top: -3px;
     left: 5px;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-next .ui-icon-circle-triangle-e:before {
     content: "";
     position: relative;
     width: 20px;
     height: 20px;
     display: block;
     color: #000;
     border-width: 3px 3px 0 0;
     border-color: #000;
     border-style: solid;
     transform: rotate(45deg);
     top: -3px;
     left: -12px;
}
.ui-datepicker .ui-state-default {
     border: unset;
     background: unset;
     font-weight: unset;
     color: unset;
}
.ui-datepicker .ui-datepicker-current-day {
     color: var(--hkt-color-tile-on-foreground);
     background-color: var(--hkt-color-tile-on-background);
     font-weight: bold;
}
.ui-datepicker .ui-datepicker-today {
     color: orange;
}
```

### hkt-Radiobuttons

<img src="/doc/img/hkt-Radiobuttons.png" height="100" />

Optionsfelder dienen primär dazu, vordefinierte Werte für einen Zustand auszuwählen. Die Anordnung der Felder (nebeneinander oder untereinander) erfolgt nicht automatisch, sondern muss über ein Kontrollkästchen festgelegt werden. Die Anzahl der Felder kann nach Bedarf eingestellt und die Werte, die in den Zustand geschrieben werden sollen, frei gewählt werden. Zusätzlich kann jedem Feld eine Beschriftung und/oder ein Symbol zugewiesen werden. Weitere Funktionen:

- **Bestätigte Änderung:** Ein Symbol wird angezeigt, wenn das Bestätigungsflag des Status nicht gesetzt ist (=unbestätigte Änderung). Die Logik kann mithilfe einer Checkbox umgekehrt werden, sodass das Symbol erscheint, wenn das Bestätigungsflag gesetzt ist (=bestätigte Änderung). Mit einer weiteren Checkbox kann das Symbol dauerhaft rotieren (CSS-Klasse).`spin` wird hinzugefügt). Das Bestätigungssymbol ist im Quellcode jedem Button hinzugefügt, wird aber im beigefügten Quellcode nur auf dem aktiven Button angezeigt.

### hkt-Switch-Bool

<img src="/doc/img/hkt-Switch-Bool.png" height="120" />

Das Switch-Bool-Widget dient als einfacher Ein-/Ausschalter für Zustände des Typs`boolean` und zeigt ein Symbol an. Es verfügt über zwei Beschriftungsgruppen und eine Sperrfunktion, die mit dem beigefügten CSS-Code wie folgt funktionieren:

- **Beschriftungsgruppe 1:** erscheint am unteren Rand des Widgets. „Beschriftung“ (Zeile 1) ist ein fester Text. Eine zweite Zeile kann mit „Beschriftung 2“ definiert werden und besteht aus mehreren Elementen (einem einleitenden statischen Text, dem Wert eines Datenpunkts, der Einheit des Wertes (ohne Leerzeichen an den Wert angehängt) und einem zusätzlichen Text am Ende).
- **Labelgruppe 2:** erscheint oben rechts im Widget und kann bis zu 3 zusätzliche Informationen anzeigen, die auf die gleiche Weise wie „Label 2“ konfiguriert werden. Je nach Widget-Größe ist der Platz begrenzt, aber völlig ausreichend, um technische Informationen anzuzeigen (z. B. „U: 230 V, P: 12 W“).
- **Wert erhöhen:** Diese Schaltfläche befindet sich oben rechts im Widget und zeigt zwei zusätzliche Schaltflächen mit den Bezeichnungen (+) und (-) an. Durch Drücken dieser Schaltflächen kann der Wert eines beliebigen Zustands erhöht oder verringert werden. Dies ist beispielsweise ideal, um einen Sollwert zu ändern, der in der Beschriftungsgruppe 1 angezeigt wird.
- **Blockiervorgang:** Diese Einstellung ermöglicht es, den Betrieb des Widgets zu verhindern, wenn der Wert des Zustands … ist.`true` oder`false` So kann beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, aber nicht eingeschaltet werden (oder umgekehrt). Durch Aktivieren beider Kontrollkästchen lässt sich die Bedienung vollständig verhindern, und das Widget dient lediglich der Statusanzeige. Optional kann ein zusätzliches Symbol angezeigt werden, wenn die Bedienung blockiert ist. „Betrieb sperren“ wirkt sich auch auf „Wert erhöhen“ aus.
- **Bestätigte Änderung:** Ein Symbol wird angezeigt, wenn das Bestätigungsflag des Status nicht gesetzt ist (=unbestätigte Änderung). Die Logik kann mithilfe einer Checkbox umgekehrt werden, sodass das Symbol erscheint, wenn das Bestätigungsflag gesetzt ist (=bestätigte Änderung). Mit einer weiteren Checkbox kann das Symbol dauerhaft rotieren (CSS-Klasse).`spin` wird hinzugefügt).

**Hinweis:** Der beigefügte CSS-Code ermöglicht nicht die gleichzeitige Verwendung von „Label Group 2“, „Increment Value“, „Lock Operation“ und „Confirmed Change“. Dies ist jedoch durch Vergrößern des Widgets und/oder Anpassen des Codes möglich.

### hkt-Wert

<img src="/doc/img/hkt-Value.png" height="120" />

Das Wert-Widget dient zur Anzeige von Werten, vorwiegend numerischen Werten. Es verfügt über zwei Beschriftungsgruppen und (+)/(-) Schaltflächen, die mit dem beigefügten CSS-Code wie folgt funktionieren:

- **Beschriftungsgruppe 1:** erscheint am unteren Rand des Widgets. „Beschriftung“ (Zeile 1) ist ein fester Text. Eine zweite Zeile kann mit „Beschriftung 2“ definiert werden und besteht aus mehreren Elementen (einem einleitenden statischen Text, dem Wert eines Datenpunkts, der Einheit des Wertes (ohne Leerzeichen an den Wert angehängt) und einem zusätzlichen Text am Ende).
- **Labelgruppe 2:** erscheint oben rechts im Widget und kann bis zu 3 zusätzliche Informationen anzeigen, die auf die gleiche Weise wie „Label 2“ konfiguriert werden. Je nach Widget-Größe ist der Platz begrenzt, aber völlig ausreichend, um technische Informationen anzuzeigen (z. B. „H: 64 %, Y: 10 %).
- **Wert erhöhen:** Diese Schaltfläche befindet sich oben rechts im Widget und zeigt zwei zusätzliche Schaltflächen mit den Bezeichnungen (+) und (-) an. Durch Drücken dieser Schaltflächen kann der Wert eines beliebigen Zustands erhöht oder verringert werden. Dies ist beispielsweise ideal, um einen Sollwert zu ändern, der in der Beschriftungsgruppe 1 angezeigt wird.

**Hinweis:** Der beigefügte CSS-Code legt nicht fest, dass „Label Group 2“ und „Increment Value“ gleichzeitig verwendet werden müssen. Dies ist jedoch durch Vergrößern des Widgets oder Anpassen des Codes möglich.

### hkt-ViewInWidget-Dialog

<img src="/doc/img/hkt-ViewInWidget-Dialog.png" height="120" />

Das Widget öffnet ein Dialogfenster mit einer anderen Ansicht. Dieses Dialogfenster besitzt keine eigene Schaltfläche zum Schließen. Diese muss in die angezeigte Ansicht eingefügt werden. Beim Öffnen und Schließen kann ein beliebiger Zustand festgelegt werden; die Werte sind frei wählbar. Bitte beachten Sie jedoch, dass der Wert nur dann beim Schließen übernommen wird, wenn das Dialogfenster über eine Schaltfläche zum Schließen geschlossen wurde, nicht aber beim Neuladen der gesamten Ansicht.

Der enthaltene CSS-Code funktioniert wie folgt:

- **Beschriftungsgruppe 1:** erscheint am unteren Rand des Widgets. „Beschriftung“ (Zeile 1) ist ein fester Text. Eine zweite Zeile kann mit „Beschriftung 2“ definiert werden und besteht aus mehreren Elementen (einem einleitenden statischen Text, dem Wert eines Datenpunkts, der Einheit des Wertes (ohne Leerzeichen an den Wert angehängt) und einem zusätzlichen Text am Ende).
- **Labelgruppe 2:** erscheint oben rechts im Widget und kann bis zu 3 zusätzliche Informationen anzeigen, die auf die gleiche Weise wie „Label 2“ konfiguriert werden. Je nach Widget-Größe ist der Platz begrenzt, aber völlig ausreichend, um technische Informationen anzuzeigen (z. B. „H: 64 %, Y: 10 %).
- **Dialog:** Definiert die Eigenschaften des Dialogfensters. Die Eigenschaften „Dialoghöhe“ und „Dialogbreite“ beziehen sich auf den angezeigten Inhalt. Die Titelzeile wird zur Gesamthöhe addiert. Mit der Eigenschaft „Pfeil im Dialog anzeigen“ kann ein Pfeil am Rand des Dialogfensters hinzugefügt werden, der den Eindruck einer Sprechblase erweckt.

### hkt-Einstellungen-Bool

<img src="/doc/img/hkt-Settings-Bool.png" height="30px" />

Das Widget „Einstellungen (Boolesch)“ dient als einfacher Ein-/Ausschalter für boolesche Zustände und ist für Seiten mit mehreren Einstellungsoptionen vorgesehen. Es verfügt über eine Sperrfunktion, die mithilfe des beigefügten CSS-Codes wie folgt funktioniert:

- **Blockiervorgang:** Diese Einstellung ermöglicht es, den Betrieb des Widgets zu verhindern, wenn der Wert des Zustands … ist.`true` oder`false` So kann beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, aber nicht eingeschaltet werden (oder umgekehrt). Durch Aktivieren beider Kontrollkästchen lässt sich die Bedienung vollständig unterbinden, und das Widget dient lediglich der Statusanzeige. Optional kann ein zusätzliches Symbol angezeigt werden, wenn die Bedienung blockiert ist.

### hkt-Einstellungen-Wert

<img src="/doc/img/hkt-Settings-Value.png" height="30px" />

Das Widget „Einstellungen Wert“ dient zur Anzeige von Werten, hauptsächlich numerischen Werten. Es verfügt über (+)/(-) Schaltflächen, die mithilfe des enthaltenen CSS-Codes wie folgt funktionieren:

- **Wert erhöhen:** Zusätzlich zum angezeigten Wert werden zwei Schaltflächen mit den Bezeichnungen (+) und (-) angezeigt. Durch Drücken dieser Schaltflächen kann der Wert erhöht oder verringert werden. \* **Blockieren:** Diese Einstellung verhindert die Ausführung des Widgets, wenn der Statuswert null ist.`true` oder`false` So kann beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, aber nicht eingeschaltet werden (oder umgekehrt). Durch Aktivieren beider Kontrollkästchen lässt sich die Bedienung vollständig unterbinden, und das Widget dient lediglich der Statusanzeige. Optional kann ein zusätzliches Symbol angezeigt werden, wenn die Bedienung blockiert ist.

### hkt-Button-DialogClose

<img src="/doc/img/hkt-Button-DialogClose.png" height="50px" />

Diese Schaltfläche schließt ein geöffnetes Dialogfenster. Befindet sich die Schaltfläche außerhalb des Fensters, muss die Widget-ID des Dialogfensters angegeben werden.

### hkt-Tasten-Set

<img src="/doc/img/hkt-Button-Set.png" height="50px" />

Dieses Widget erzeugt eine anpassbare Anzahl von Schaltflächen, wobei jede Schaltfläche ihren eigenen Zustand steuern kann. Der anzuzeigende Wert kann für jede Schaltfläche festgelegt werden. Durch Aktivieren des Kontrollkästchens „Dialog schließen“ wird das Dialogfenster, in dem sich das Widget befindet, beim Drücken der Schaltfläche geschlossen. Das Widget kann auch außerhalb eines Dialogfensters platziert werden, dann hat die Funktion „Dialog schließen“ jedoch keine Auswirkung.

### hkt-Button-Navigation

<img src="/doc/img/hkt-Button-Navigation.png" height="30px" />

Durch die Schaltfläche wird die Set-Ansicht aufgerufen.

### hkt-Button-Set-Navigation

<img src="/doc/img/hkt-Button-Set-Navigation.png" height="30px" />

Das Widget erstellt eine anpassbare Anzahl von Schaltflächen zur Navigation zwischen verschiedenen Ansichten. Mithilfe des beigefügten CSS-Codes lässt sich die Anordnung der Schaltflächen per Checkbox zwischen horizontal und vertikal umschalten. Bei horizontaler Anordnung beträgt die Breite jeder Schaltfläche 120 Pixel, bei vertikaler Anordnung die Höhe 30 Pixel.

### hkt-ViewInWidget-Swipe

Das Widget dient als Container für Unteransichten, zwischen denen per Scrollen gewechselt wird. Dank des mitgelieferten CSS-Codes muss nur ein Teil einer Unteransicht in den sichtbaren Bereich verschoben werden; die Scroll-Snap-Funktion erledigt den Rest.