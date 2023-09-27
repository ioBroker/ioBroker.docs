---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2/README.md
title: Visualisierung der nächsten Generation für ioBroker: vis-2
hash: /XtZjIifd5fOIWxzaFqp8baBG5sSv18DL3sfRGKayMQ=
---
![Logo](../../../en/adapterref/iobroker.vis-2/admin/vis-2.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2.png?downloads=true)

# Visualisierung der nächsten Generation für ioBroker: vis-2
WEB-Visualisierung für die ioBroker-Plattform.

## Installation und Dokumentation
![Demo-Schnittstelle](img/user0.png) ![Demo-Schnittstelle](../../../en/adapterref/iobroker.vis-2/img/user7.png)

[Online-Demos](https://iobroker.click/)

## Bindungen von Objekten
Normalerweise verfügen die meisten Widgets über das ObjectID-Attribut und dieses Attribut kann mit einem bestimmten Wert der Objekt-ID verknüpft werden.
Es gibt aber noch eine andere Möglichkeit, *beliebiges* Attribut eines Widgets an eine ObjectID zu binden.

Schreiben Sie einfach in das Attribut `{object.id}` und es wird an den Wert dieses Objekts gebunden.
Wenn Sie das spezielle Format verwenden, können Sie damit sogar einige einfache Operationen durchführen, z. B. Multiplizieren oder Formatieren.

Um beispielsweise die Hypotenuse eines Dreiecks zu berechnen:

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(h*h + w*w))}` wird als Funktion interpretiert:

```
value = await (async function () {
    var h = (await getState('javascript.0.myCustom.height')).val;
    var w = (await getState('javascript.0.myCustom.width')).val;
    return Math.max(20, Math.sqrt(h * h + w * w));
})();
```

oder

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}` multipliziert nur die Höhe mit der Breite.

Sie können *beliebige* Javascript-(Browser-)Funktionen verwenden. Argumente müssen mit „:“ definiert werden, andernfalls werden sie als Formel interpretiert.

Achten Sie auf Typen. Alle von ihnen sind als Zeichenfolgen definiert. Um sicherzugehen, dass dieser Wert als Zahl behandelt wird, verwenden Sie die Funktion parseFloat.

Unsere Hypotenuse-Berechnung lautet also:

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Veraltetes Format
Patten hat das folgende Format:

```
{objectID;operation1;operation2;...}
```

Die folgenden Operationen werden unterstützt:

- `\*` - Multiplikation. Das Argument muss in Klammern stehen, z. B. „*(4)“. In diesem Beispiel multiplizieren wir den Wert mit 4.
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
- „random(R)“ – Math.random() * R, oder einfach Math.random(), wenn kein Argument vorhanden ist
- „formatValue(decimals)“ – Wert entsprechend den Systemeinstellungen formatieren und Dezimalzahlen verwenden
- `date(format)` – Wert als Datum formatieren. Das Format ist wie folgt: „JJJJ-MM-TT hh:mm:ss.sss“
- „momentDate(format, useTodayOrYesterday)“ – Wert mit Moment.js als Datum formatieren. [Genehmigte Formate müssen gemäß der moment.js-Bibliothek eingegeben werden](https://momentjs.com/docs/#/displaying/format/). Mit `useTodayOrYesterday=true` werden die `moment.js`-Formate `ddd`/`dddd` mit heute/gestern überschrieben
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

* „alert“ – zeigt ein Warnfenster im vis-2 an. „control.data“ hat das folgende Format „message;title;jquery-icon“. Titel und JQuery-Icon sind optional. Symbolnamen finden Sie [hier](http://jqueryui.com/themeroller/). Um das Symbol „ui-icon-info“ anzuzeigen, schreiben Sie „Message;;info“.
* „changeView“ – zur gewünschten Ansicht wechseln. „control.data“ muss den Namen der Ansicht haben. Sie können den Projektnamen auch als „Projekt/Ansicht“ angeben. Das Standardprojekt ist „main“.
* „Aktualisieren“ – Laden Sie vis-2 neu, beispielsweise nachdem das Projekt geändert wurde, um es in allen Browsern neu zu laden.
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

  Sie können Ihre eigene Datei in vis-2 hochladen und sie beispielsweise als `/vis-2.0/main/img/myFile.mp3` abspielen lassen.

Wenn der Benutzer die Ansicht wechselt oder beim Start, werden die Variablen vom vis-2 mit gefüllt

- „control.instance“: Browserinstanz und „ack=true“.
- „control.data“: Projekt- und Ansichtsname in der Form „Projekt/Ansicht“, z.B. „main/view“ (und „ack=true“)
- „control.command“: „changedView“ und „ack=true“.

Sie können den JSON-String oder das Objekt als `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}` in `control.command` schreiben. In diesem Fall werden die Instanz und die Daten vom JSON-Objekt übernommen.

Beispiel für einen Javascript-Adapter:

```
setState('vis-2.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Standardansicht
Sie können für jede Ansicht die gewünschte Auflösung festlegen (Menü=>Extras=>Auflösung).
Dies ist nur der visuelle Rahmen im Bearbeitungsmodus, um Ihnen die Bildschirmgröße auf einem bestimmten Gerät anzuzeigen. Im Echtzeitmodus ist es nicht sichtbar und alle Widgets außerhalb des Randes sind sichtbar.

Zusätzlich können Sie festlegen, ob diese Ansicht als Standard für diese Auflösung verwendet werden soll.

Bei jedem Aufruf der `index.html` (ohne `#viewName`) wird also die für diese Auflösung am besten geeignete Ansicht geöffnet.
Wenn nur eine Ansicht das Flag *"Standard"* hat, wird diese Ansicht unabhängig von der Bildschirmauflösung oder Ausrichtung geöffnet.

Sie können beispielsweise zwei Ansichten „Querformat-Mobil“ und „Hochformat-Mobil“ erstellen und diese beiden Ansichten werden automatisch umgeschaltet, wenn Sie die Ausrichtung oder Bildschirmgröße ändern.

Es gibt ein Hilfs-Widget „Basic – Bildschirmauflösung“, das die tatsächliche Bildschirmauflösung und die am besten geeignete Standardansicht für diese Auflösung anzeigt.

## Einstellungen
### Neu laden, wenn der Schlaf länger dauert als
Es gibt eine Regel, dass nach einer gewissen Zeit der Verbindungsunterbrechung die gesamte VIS-Seite neu geladen wird, um das Projekt zu synchronisieren.
Sie können es im Menü „Einstellungen…“ konfigurieren. Wenn Sie das Intervall auf „nie“ setzen, wird die Seite nie neu geladen.

### Wiederverbindungsintervall
Legen Sie das Intervall zwischen den Verbindungsversuchen fest, wenn die Verbindung getrennt wird. Wenn Sie 2 Sekunden einstellen, wird alle 2 Sekunden versucht, die Verbindung herzustellen.

### Dunkler Bildschirm zum erneuten Verbinden
Manchmal (nachts) ist es erforderlich, dass der Ladebildschirm dunkel ist. Mit dieser Option können Sie es einstellen.

Beachten Sie, dass diese Einstellungen nur für die erneute Verbindung und nicht für die erste Verbindung gültig sind.

![Dunkel](../../../en/adapterref/iobroker.vis-2/img/dark_screen.png)

## SVG und currentColor
Mit dem Schlüsselwort currentColor in CSS können Elemente die aktuelle Textfarbe von ihrem übergeordneten Element erben.
Es kann besonders in SVGs (Scalable Vector Graphics) nützlich sein, da es ein dynamischeres Styling und eine einfachere Integration mit HTML-Inhalten ermöglicht.

Sie können das Schlüsselwort currentColor anstelle eines bestimmten Farbwerts für jede Eigenschaft innerhalb der SVG verwenden, die einen Farbwert akzeptiert.
Hier ist ein einfaches Beispiel mit einem Kreis in einer SVG-Datei:

```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>
```

In diesem Fall nimmt das SVG die Farbe des übergeordneten Elements an.
Wenn es beispielsweise in einem Menü verwendet würde und das Menü rot ist, wäre der Kreis rot.

## Machen
<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 2.2.7 (2023-09-18)
* (bluefox) Improved icon selector: you can upload your own icon directly
* (bluefox) Optimized loading: do not load unused widget sets

### 2.2.6 (2023-09-17)
* (bluefox) Date binding corrected
* (bluefox) Optimized loading of widgeteria
* (bluefox) Horizontal navigation is fixed

### 2.2.5 (2023-09-12)
* (bluefox) Implemented horizontal navigation

### 2.2.4 (2023-09-04)
* (bluefox) Corrected license checking

### 2.2.2 (2023-08-16)
* (bluefox) Changed sentry settings

### 2.2.1 (2023-08-15)
* (bluefox) Added possibility to filter widgets in edit mode
* (bluefox) Added possibility to change the order of relative widgets with drag&drop

### 2.2.0 (2023-08-14)
* (bluefox) Release candidate 1

### 2.1.7 (2023-08-10)
* (bluefox) Optimized the rendering of the widgets

### 2.1.6 (2023-07-30)
* (bluefox) First beta release

### 2.1.4 (2023-07-19)
* (bluefox) Allowed to add widgets to widgets

### 2.0.36 (2023-06-21)
* (bluefox) Added widgeteria

### 2.0.29 (2023-05-17)
* (bluefox) Corrected errors

### 2.0.10 (2022-12-01)
* (bluefox) Added the file browser

### 2.0.8 (2022-11-26)
* (bluefox) Improved the error handling

### 2.0.0 (2022-10-21)
* (bluefox) Completely new visualization, but partly compatible with the previous version

## License
To use this adapter in `ioBroker` you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on [https://iobroker.net](https://iobroker.net). The license if checked online against the ioBroker license server when the vis-2 adapter is started, so an online connection at this time point is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2021-2023 Denis Haev, https://github.com/GermanBluefox <dogafox@gmail.com>,
  
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).