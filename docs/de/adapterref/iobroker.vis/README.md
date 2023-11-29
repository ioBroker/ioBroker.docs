---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis/README.md
title: Visualisierung
hash: hyk2is8CltwN54o8devI0fHbnhr3fgj4ePi+Rtoa0nY=
---
![Logo](../../../en/adapterref/iobroker.vis/admin/vis.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# Visualisierung
WEB-Visualisierung für die ioBroker-Plattform.

## Installation und Dokumentation
![Demo-Schnittstelle](img/user0.png) ![Demo-Schnittstelle](../../../en/adapterref/iobroker.vis/img/user7.png)

[Online-Demos](https://iobroker.click/)

## Bindungen von Objekten
Normalerweise verfügen die meisten Widgets über das ObjectID-Attribut und dieses Attribut kann mit einem bestimmten Wert der Objekt-ID verknüpft werden.
Es gibt aber noch eine andere Möglichkeit, *beliebiges* Attribut eines Widgets an eine ObjectID zu binden.

Schreiben Sie einfach in das Attribut `{object.id}` und es wird (nicht im Bearbeitungsmodus) an den Wert dieses Objekts gebunden.
Wenn Sie das spezielle Format verwenden, können Sie damit sogar einige einfache Operationen durchführen, z. B. Multiplizieren oder Formatieren.
Patten hat das folgende Format:

```
{objectID;operation1;operation2;...}
```

Folgende Operationen werden unterstützt:

- `\*` - multiplizieren. Das Argument muss in Klammern stehen, z. B. „*(4)“. In diesem Beispiel multiplizieren wir den Wert mit 4.
- `\+` - hinzufügen. Das Argument muss in Klammern stehen, z. B. „+(4,5)“. In diesem Beispiel addieren wir zum Wert 4,5.
- `\-` - subtrahieren. Das Argument muss in Klammern stehen, z. B. „-(-674,5)“. In diesem Beispiel subtrahieren wir vom Wert -674,5.
- `/` - Teilen. Das Argument muss in Klammern stehen, z. B. „/(0,5)“. In diesem Beispiel teilen wir den Wert durch 0,5.
- `%` – Modulo. Das Argument muss in Klammern stehen, z. B. „%(5)“. In diesem Beispiel nehmen wir Modulo von 5.
- „round“ – den Wert runden.
- „round(N)“ – Runden Sie den Wert mit N Stellen nach dem Punkt, z. B. 34,678;round(1) => 34,7
- „hex“ – Wert in Hexadezimalwert umwandeln. Alle Buchstaben werden in Kleinbuchstaben geschrieben.
- „hex2“ – Wert in Hexadezimalwert umwandeln. Alle Buchstaben werden in Kleinbuchstaben geschrieben. Wenn der Wert kleiner als 16 ist, wird die führende Null hinzugefügt.
- „HEX“ – dasselbe wie Hex, aber in Großbuchstaben.
- „HEX2“ – wie hex2, jedoch in Großbuchstaben.
- „Datum“ – Datum entsprechend dem angegebenen Format formatieren. Das Format ist das gleiche wie in [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate)
- „min(N)“ – wenn der Wert kleiner als N ist, nimm den N-Wert, sonst den Wert
- „max(M)“ – wenn der Wert größer als M ist, nimm den M-Wert, sonst den Wert
- „sqrt“ – Quadratwurzel
- „pow(n)“ – Potenz von N.
- „pow“ – Potenz von 2.
- `floor` – Math.floor
- `ceil` - Math.ceil
- „json“ – Vorgang zum Abrufen von JSON- oder Objekteigenschaften. Zum Beispiel „{id;json(common.name.en)}“.
- „random(R)“ – Math.random() * R, oder einfach Math.random(), wenn kein Argument vorhanden ist
- „formatValue(decimals)“ – Wert entsprechend den Systemeinstellungen formatieren und Dezimalzahlen verwenden
- `date(format)` – Wert als Datum formatieren. Das Format ist wie folgt: „JJJJ-MM-TT hh:mm:ss.sss“.
- „momentDate(format, useTodayOrYesterday)“ – Wert mit Moment.js als Datum formatieren. [Genehmigte Formate müssen gemäß der moment.js-Bibliothek eingegeben werden](https://momentjs.com/docs/#/displaying/format/). Mit „useTodayOrYesterday=true“ wird das Momentjs-Format „ddd“/„dddd“ mit heute/gestern überschrieben
- „array(element1,element2[,element3,element4])“ – gibt das Element des Index zurück. z.B.: „{id.ack;array(ack is false,ack is true)}“.

Sie können dieses Muster in jedem Text verwenden, z

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

oder Farbberechnungen:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Um den Zeitstempel des Objekts anzuzeigen, schreiben Sie `.ts` oder `.lc` (für letzte Änderung) an das Ende der Objekt-ID, z. B.:

```
Last change: {objectRed.lc;date(hh:mm)}
```

Es gibt noch eine andere Möglichkeit, das Muster zu schreiben:

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}` wird als Funktion interpretiert:

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

Sie können *beliebige* Javascript-Funktionen verwenden. Argumente müssen mit „:“ definiert werden, andernfalls werden sie als Formel interpretiert.

Achten Sie auf Typen. Alle von ihnen sind als Zeichenfolgen definiert. Um sicherzugehen, dass dieser Wert als Zahl behandelt wird, verwenden Sie die Funktion parseFloat.

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Spezielle Bindungen
Es gibt verschiedene interne Bindungen, um zusätzliche Informationen in Ansichten bereitzustellen:

* „Benutzername“ – zeigt den angemeldeten Benutzer an
* „Ansicht“ – Name der tatsächlichen Ansicht
* „wname“ – Widget-Name
* „Widget“ – ist ein Objekt mit allen Daten des Widgets. Kann nur im JS-Teil verwendet werden, wie „{a:a;widget.data.name}“.
* „wid“ – Name des tatsächlichen Widgets
* „Sprache“ – kann „de“, „en“ oder „ru“ sein.
* „Instanz“ – Browserinstanz
* „Anmelden“ – ob eine Anmeldung erforderlich ist oder nicht (z. B. um die Schaltfläche „Abmelden“ anzuzeigen/auszublenden)
* „local_*“ – wenn der Statusname von „local_“ aus gestartet wird, wird er nicht an ioBroker gemeldet, sondern aktualisiert alle Widgets, die von diesem Status abhängen. (Lokale Variable für aktuelle Browsersitzung)

Hinweis: Um „:“ in Berechnungen (z. B. in einer Zeichenfolgenformel) zu verwenden, verwenden Sie stattdessen „::“.

**Denken Sie daran**, dass Stildefinitionen als Bindungen interpretiert werden. Verwenden Sie daher `{{style: value}}` oder einfach

```
{
	style: value
}
```

dafür.

## Filter
Um die gesamte Anzahl der Widgets in einer Ansicht anzuzeigen, können Sie Filter verwenden, um die Anzahl der gleichzeitig in der Ansicht angezeigten Widgets zu reduzieren.

Jedes Widget hat ein Feld `filter`. Wenn Sie es auf einen Wert festlegen, z. `light`, sodass Sie über ein anderes Widget `(bars - filters, filter - dropdown)` steuern können, welcher Filter tatsächlich aktiv ist.

## Steuerschnittstelle
Vis erstellt 3 Variablen:

- „control.instance“ – Hier sollte die Browser-Instanz geschrieben werden oder „FFFFFFFF“, wenn jeder Browser gesteuert werden muss.
- `control.data` – Parameter für Befehl. Siehe spezifische Befehlsbeschreibung.
- `control.command` – Befehlsname. Das Schreiben dieser Variablen löst den Befehl aus. Das heißt, bevor der Befehl geschrieben wird, müssen die „Instanz“ und die „Daten“ mit Daten vorbereitet werden.

Befehle:

* „alert“ – zeigt ein Warnfenster in der Vis an. „control.data“ hat das folgende Format „message;title;jquery-icon“. Titel und JQuery-Icon sind optional. Symbolnamen finden Sie [hier](http://jqueryui.com/themeroller/). Um das Symbol „ui-icon-info“ anzuzeigen, schreiben Sie „Message;;info“.
* „changeView“ – zur gewünschten Ansicht wechseln. „control.data“ muss den Namen der Ansicht haben. Sie können den Projektnamen auch als „Projekt/Ansicht“ angeben. Das Standardprojekt ist „main“.
* „Aktualisieren“ – lädt die Vis neu, zum Beispiel nachdem ein Projekt geändert wurde, um sie in allen Browsern neu zu laden.
* „Neu laden“ – dasselbe wie Aktualisieren.
* „dialog“ – Dialogfenster anzeigen. Der Dialog muss angezeigt werden. Einer von:

    - `statisch - HTML - Dialog`,
    - „Statisch – Symbol – Dialog“,
    - „Container – HTML – Ansicht im JQUI-Dialog“,
    - „Container – ext cmd – Ansicht im JQUI-Dialog“,
    - „Container – Symbol – Ansicht im JQUI-Dialog“,
    - „Container – Schaltfläche – Ansicht im JQUI-Dialog“.

    `control.data` muss die ID des Dialog-Widgets haben, z. B. `w00056`.

* `dialogClose`
* „Popup“ – öffnet ein neues Browserfenster. Der Link muss in „control.data“ angegeben werden, z. B. http://google.com
* „playSound“ – Sounddatei abspielen. Der Link zur Datei ist in „control.data“ angegeben, z. B. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Sie können Ihre eigene Datei in vis hochladen und sie abspielen lassen, z. B. `/vis.0/main/img/myFile.mp3`.

Wenn der Benutzer die Ansicht wechselt oder beim Start, werden die Variablen von der Vis mit gefüllt

- „control.instance“: Browserinstanz und „ack=true“.
- „control.data“: Projekt- und Ansichtsname in der Form „Projekt/Ansicht“, z.B. „main/view“ (und „ack=true“)
- „control.command“: „changedView“ und „ack=true“.

Sie können den JSON-String oder das Objekt als `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}` in `control.command` schreiben. In diesem Fall werden die Instanz und die Daten vom JSON-Objekt übernommen.

Beispiel für einen Javascript-Adapter:

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Standardansicht
Sie können für jede Ansicht die gewünschte Auflösung festlegen (Menü=>Extras=>Auflösung). Dies ist nur der visuelle Rahmen im Bearbeitungsmodus, um Ihnen die Bildschirmgröße auf einem bestimmten Gerät anzuzeigen. Im Echtzeitmodus ist es nicht sichtbar und alle Widgets außerhalb des Rahmens sind sichtbar.

Zusätzlich können Sie festlegen, ob diese Ansicht als Standard für diese Auflösung verwendet werden soll.

Bei jedem Aufruf der `index.html` (ohne `#viewName`) wird also die für diese Auflösung am besten geeignete Ansicht geöffnet.
Wenn nur eine Ansicht das Flag *"Standard"* hat, wird diese Ansicht unabhängig von der Bildschirmauflösung oder Ausrichtung geöffnet.

Sie können beispielsweise zwei Ansichten „Querformat-Mobil“ und „Hochformat-Mobil“ erstellen und diese beiden Ansichten werden automatisch umgeschaltet, wenn Sie die Ausrichtung oder Bildschirmgröße ändern.

Es gibt ein Hilfs-Widget „Basic – Bildschirmauflösung“, das die tatsächliche Bildschirmauflösung und die am besten geeignete Standardansicht für diese Auflösung anzeigt.

## Einstellungen
### Neu laden, wenn der Schlaf länger dauert als
Es gibt eine Regel, dass nach einer gewissen Zeit der Verbindungsunterbrechung die gesamte VIS-Seite neu geladen wird, um das Projekt zu synchronisieren.
Sie können es im Menü „Einstellungen…“ konfigurieren. Wenn Sie ein Intervall auf „Nie“ einstellen, wird die Seite nie neu geladen.

### Wiederverbindungsintervall
Legen Sie das Intervall zwischen den Verbindungsversuchen fest, wenn die Verbindung getrennt wird. Wenn Sie 2 Sekunden einstellen, wird alle 2 Sekunden versucht, die Verbindung herzustellen.

### Dunkler Bildschirm zum erneuten Verbinden
Manchmal (nachts) ist ein dunkler Ladebildschirm erforderlich. Mit dieser Option können Sie es einstellen.

Beachten Sie, dass diese Einstellungen nur für die erneute Verbindung und nicht für die erste Verbindung gültig sind.

![Dunkel](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 1.5.4 (2023-11-29)
* (agav99) added the new binding operation for getting property of JSON or object
* (agav99) Checked the initialization of the `local_` variables
* (agav99) fixed subscribeOidAtRuntime
* (stephanritscher) Added dynamic web manifest
* (agav99) Optimization for basic-view in widget8
* (oweitman) Changed binding regex to accept umlauts
* (mcm1957) Corrected first installation of vis

### 1.5.1 (2023-11-06)
* (bluefox) Changed License: it is now MIT, and the license check was removed

### 1.4.16 (2023-01-27)
* (bluefox) Corrected connection with "only port" URLs

### 1.4.15 (2022-04-10)
* (bluefox) Better check of the offline license

### 1.4.14 (2022-03-31)
* (bluefox) Corrected GUI bug

### 1.4.13 (2022-03-22)
* (pascal-hari) The group attributes will be replaced recursively

### 1.4.12 (2022-02-12)
* (bluefox) Fixed bug with the export of specific widgets

### 1.4.11 (2022-02-12)
* (bluefox) Removed ES6 commands to be supported by older browsers
* (oweitman) Fixed problem with update of grouped widgets
* (stephanritscher) Added web manifest to be able to handle vis as the web app

### 1.4.8 (2022-01-29)
* (bluefox) Added support for js-controller 4.x

### 1.4.7 (2021-12-28)
* (mswiege) Fixed subscribeOidAtRuntime if called with invalid IDs
* (bluefox) Added support of license manager

### 1.4.6 (2021-11-20)
* (bluefox) Added the license check even without internet

### 1.4.5 (2021-10-08)
* (jens-maus) Added frame-src spec to content-security-policy header fixing frame related content blocking issues (e.g. using KioskPro iOS app).
* (bluefox) Showed the extended error messages by license check
* (Scrounger) Patch visibility oid binding

### 1.4.4 (2021-08-31)
* (jobe451) Allowed to have ":" in the binding object IDs

### 1.4.3 (2021-07-11)
* (bluefox) Added possibility to check license offline (only special once)

### 1.4.0 (2021-07-01)
* (bluefox) Changed path for check of certificates 
* (thost96) fixes for issues found by adapter-checker

### 1.3.10 (2021-05-25)
* (bluefox) Fixed the support of admin5

### 1.3.9 (2021-04-29)
* (agav99) Added support of local browser variables
* (Scrounger) Bug fix for null & NaN values in width and height
* (bluefox) Added support for admin5

### 1.3.8 (2021-03-03)
* (bluefox) fix play sounds on iOS Safari an android
* (Scrounger) visEditInspect: format dimension added
* (foxriver76) Replace travis and appveyor by the GitHub actions
* (Excodibur) Allow resources to be loaded as blob
* (Excodibur ) Allow resources to be loaded as blob

### 1.3.7 (2021-01-20)
* (Scrounger) Bug Fixed - Binding in JSON string

### 1.3.6 (2020-12-13)
* (twonky4) Corrected: old browser issue
* (rbaranga) Corrected: play sounds on iOS Safari
* (Scrounger) Added the optional arguments to support Material Design Widgets

### 1.3.4 (2020-10-04)
* (foxriver76) Corrected the error on older devices

### 1.3.3 (2020-09-21)
* (bluefox) Return de-bounce settings back
* (bluefox) Corrected error with {username} binding
* (bluefox) Fixed "show last change" option

### 1.3.1 (2020-09-18)
* (bluefox) Added the auto-focus option to the input widgets

### 1.3.0 (2020-09-17)
* (foxriver76) on pending getStates, try again instead of drop
* (foxriver76) fixed the file manager typos
* (Scrounger) Added momentDate for the bindings

### 1.2.12 (2020-09-08)
* (foxriver76) only parse arrays and json objects, not booleans, normal strings etc

### 1.2.11 (2020-08-25)
* (bluefox) The error message about the non-found chart view was fixed.

### 1.2.10 (2020-08-23)
* (gsicilia82/fceller) JSON strings will be parsed in VIS bindings

### 1.2.9 (2020-08-22)
* (bluefox) Charts are now supported

### 1.2.6 (2020-03-22)
* (bluefox) Added the better error message if license could not be parsed

### 1.2.4 (2020-02-11)
* (bluefox) Table widget was extended with the selected object ID.

### 1.2.3 (2019-12-14)
* (bluefox) Small changes in license handling were made

### 1.2.2 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined adn null.

### 1.2.1 (2019-09-10)
* (bluefox) fixed upload of files

### 1.2.0 (2019-05-07)
* (bluefox) add translations

### 1.1.11 (2019-02-07)
* (bluefox) improve Bool HTML

### 1.1.10 (2019-01-30)
* Add Chinese support

### 1.1.8 (2018-10-29)
* (bluefox) File dialog was corrected

### 1.1.7 (2018-07-24)
* (bluefox) view8 corrected

### 1.1.6 (2018-07-18)
* (bluefox) support of new variables (see [Special bindings](#special-bindings) )
* (bluefox) fix error if fast view changes
* (bluefox) fix "jqui - ctrl - IconState / val - Icon Bool"

### 1.1.5 (2018-06-10)
* (bluefox) show more information if widget cannot be rendered
* (bluefox) fix saving of widgets if they have bindings
* (bluefox) show error stack
* (bluefox) fix binding
* (Apollon77) fix testing
* (bluefox) fix for iobroker.pro and external socket.io settings
* (bluefox) A user variable was added into bindings.
* (bluefox) Fixed widget tabs

### 1.1.4 (2018-04-23)
* (bluefox) fix bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) ignore click by scrolling on touch devices
* (bluefox) remove wrong state vis.0.command
* (bluefox) fix error with jPlot
* (bluefox) better widget behaviour in edit Mode (basic, jqui)
* Fix config dialog

### 1.1.2 (2018-02-02)
* (bluefox) Fixing the saving of project
* (bluefox) Fixing the background selector
* (bluefox) Fixing the null pointer problem
* (bluefox) Fixing the selection helper
* Update translations

### 1.1.1 (2018-01-07)
* (bluefox) The problem with view change on the touch devices fixed

### 1.0.5 (2017-11-19)
* (bluefox) show number of data points in every project

### 1.0.4 (2017-10-22)
* (bluefox) Add autocomplete for view CSS options
* (bluefox) change edit of view CSS background options

### 1.0.3 (2017-10-20)
* (bluefox) Fix parse of invalid bindings
* (bluefox) add moment.js

### 1.0.0 release candidate (2017-10-13)
* (bluefox) fix iframe and image updates
* (bluefox) fix fonts

### 0.15.7 (2017-10-01)
* (bluefox) allow update of images without additional query (but it works only in some very specific cases)
* (bluefox) zoom of iframes

### 0.15.5 (2017-07-24)
* (bluefox) Fix widgets upload

### 0.15.4 (2017-07-19)
* (bluefox) Add swipe

### 0.15.3 (2017-07-12)
* (bluefox) Add full screen widget
* (bluefox) Fix timestamp widget

### 0.15.2 (2017-07-07)
* (bluefox) Fix binding if it has "-" in the OID

### 0.15.1 (2017-06-30)
* (bluefox) Fix error with context menu
* (bluefox) Allow adding of class to view

### 0.15.0 (2017-05-25)
* (bluefox) fix copy of grouped widgets
* (bluefox) fix subscribe if empty states

### 0.14.7 (2017-05-19)
* (bluefox) add templates

### 0.14.6 (2017-05-16)
* (bluefox) Fix error by groups selection
* (apollon77) fix jqui-dialog for auto-open

### 0.14.3 (2017-05-11)
* (bluefox) fix export/import of grouped widgets

### 0.14.2 (2017-04-29)
* (bluefox) Fix install error

### 0.14.1 (2017-04-27)
* (bluefox) move beta to main
* (bluefox) fix choose filter
* (bluefox) fix error if some views do not exist
* (bluefox) fix binding problem, e.g. "a:-45?0" was detected as variable too.
* (bluefox) fix some font sizes
* (bluefox) fix undo
* (bluefox) fix themes change
* (bluefox) optimize load of pages
* (bluefox) check license
* (bluefox) fix basic views 8
* (bluefox) fix time picker if opened in dialog

### 0.14.0 (2017-04-10)
* (bluefox) add mandatory license input

### 0.12.7 (2017-02-09)
* (bluefox) prepare beta

### 0.12.6 (2017-01-29)
* (pmant) fix view copy
* (pmant) Improvements to context menu
* (pmant) usability improvements for both view dropdowns
* (bluefox) small fix of dragging

### 0.12.6 (2017-01-29)
* (pmant) add dropdown menu to views bar
* (pmant) sort widgets widget selector by name
* (bluefox) fix groupAttr in signals and visibility

### 0.12.2 (2016-12-04)
* (bluefox) fix errors with grouping

### 0.12.1 (2016-11-30)
* (bluefox) fix errors with containers

### 0.12.0 (2016-11-24)
* (bluefox) subscribe mode for faster state loading
* (bluefox) add grouping

### 0.10.15 (2016-11-06)
* (bluefox) remove weather-adapter.html
* (bluefox) clean config.js
* (bluefox) remove old widgets
* (bluefox) improve authentication in app
* (bluefox) allow creation of instance from helper widget

### 0.10.14 (2016-10-09)
* (bluefox) fix rendering of widgets
* (bluefox) working on relative positions.
* (bluefox) destroy widgets before views deletion

### 0.10.13 (2016-09-23)
* (bluefox) fixed errors for iPad 1
* (bluefox) start working on relative positions

### 0.10.12 (2016-09-16)
* (bluefox) group specific visibility of widgets and views

### 0.10.11 (2016-09-15)
* (bluefox) fix for iOS 10
* (bluefox) allow disabling of groups for performance

### 0.10.10 (2016-09-14)
* (bluefox) add text2speech widget
* (bluefox) try to fix problem with iOS 10

### 0.10.9 (2016-09-04)
* (bluefox) support of web-sockets force
* (bluefox) destroy unused views after 30 seconds
* (bluefox) do not show middle leading lines if top and bottom are shown
* (bluefox) let timestamp and last-change to show time as interval

### 0.10.7 (2016-07-09)
* (bluefox) add settings to reload vis
* (bluefox) add dark reload screen
* (bluefox) fix reload interval
* (bluefox) export/import
* (bluefox) add global script
* (bluefox) add 'not exist'/'not consist'/'exist' to signal and visibility
* (bluefox) fix OIDs in editor

### 0.10.5 (2016-06-15)
* (bluefox) fix select ID dialog
* (bluefox) add align help lines
* (bluefox) never store data in non-edit mode

### 0.10.4 (2016-06-14)
* (bluefox) fix drag and resize
* (Patrick) fix QuoJS
* (bluefox) support of milliseconds in formatDate
* (bluefox) support of getHistory
* (bluefox) support of show history instances
* (bluefox) grid
* (bluefox) add previews

### 0.10.3 (2016-05-30)
* (bluefox) update canJS
* (pmant) fixes bugs with dialogs on touchscreens
* (bluefox) speedUP show attributes at 300ms
* (bluefox) fix click on widget if signal is active

### 0.10.2 (2016-05-24)
* (bluefox) fix widgets with timestamps

### 0.10.1 (2016-05-23)
* (bluefox) change version

### 0.10.0 (2016-05-23)
* (bluefox) translates
* (bluefox) fix 'no widgets selected'
* (bluefox) change widget icons
* (bluefox) add signals
* (bluefox) add app.css for cordova
* (bluefox) change icons preview
* (bluefox) show properties of widget as icon
* (bluefox) fix error with external commands
* (bluefox) add types icon to preview
* (bluefox) support edit on iPad1
* (bluefox) change security settings

## License
To use this adapter in ioBroker, you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on https://iobroker.net . The license if checked online against the ioBroker license server when the vis adapter is started, so an online connection at this timepoint is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
The MIT License (MIT)

Copyright (c) 2013-2023 Denis Haev <dogafox@gmail.com>,
Copyright (c) 2013      hobbyquaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.