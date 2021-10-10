---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis/README.md
title: Visualisierung
hash: VCCbc3IpfXz30tkfzq6yRoDI/sZdelGrN1l7tBhblcc=
---
![Logo](../../../en/adapterref/iobroker.vis/admin/vis.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# Visualisierung
WEB-Visualisierung für die ioBroker-Plattform.

##Installation & Dokumentation
![Demo-Schnittstelle](img/user0.png) ![Demo-Schnittstelle](../../../en/adapterref/iobroker.vis/img/user7.png)

[Online-Demos](https://iobroker.click/)

## Bindungen von Objekten
Normalerweise haben die meisten Widgets das Attribut ObjectID, und dieses Attribut kann mit einem Wert der Objekt-ID verbunden werden.
Aber es gibt noch eine andere Option, um *beliebige* Attribute des Widgets an eine ObjectID zu binden.

Schreiben Sie einfach in das Attribut ```{object.id}``` und es wird (nicht im Bearbeitungsmodus) an den Wert dieses Objekts gebunden.
Wenn Sie das spezielle Format verwenden, können Sie damit sogar einige einfache Operationen durchführen, z. multiplizieren oder formatieren.
Patten hat das folgende Format:

```
{objectID;operation1;operation2;...}
```

Folgende Operationen werden unterstützt:

- `\*` - multiplizieren. Argument muss in Klammern stehen, wie "*(4)". In diesem Beispiel multiplizieren wir den Wert mit 4.
- `\+` - hinzufügen. Argument muss in Klammern stehen, wie "+(4.5)". In diesem Beispiel addieren wir den Wert 4,5.
- `\-` - subtrahieren. Argument muss in Klammern stehen, wie "-(-674.5)". In diesem Beispiel subtrahieren wir vom Wert -674,5.
- `/` - teilen. Argument muss in Klammern stehen, wie "/(0.5)". In diesem Beispiel teilen wir den Wert durch 0,5.
- `%` - modulo. Argument muss in Klammern stehen, wie "%(5)". In diesem Beispiel nehmen wir Modulo von 5.
- `round` - rundet den Wert.
- `round(N)` - Runden Sie den Wert mit N Stellen nach dem Punkt, z.B. 34.678;rund(1) => 34.7
- `hex` - Wert in hexadezimalen Wert umwandeln. Alle Buchstaben sind klein geschrieben.
- `hex2` - Wert in hexadezimalen Wert umwandeln. Alle Buchstaben sind klein geschrieben. Bei einem Wert kleiner 16 wird die führende Null hinzugefügt.
- `HEX` - wie hex, aber in Großbuchstaben.
- `HEX2` - wie hex2, aber in Großbuchstaben.
- `date` - Formatieren Sie das Datum gemäß dem angegebenen Format. Das Format ist das gleiche wie in [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate)
- `min(N)` - wenn der Wert kleiner als N ist, nimm das N, sonst Wert
- `max(M)` - wenn der Wert größer als M ist, nimm das M, sonst den Wert
- `sqrt` - Quadratwurzel
- `pow(n)` - Potenz von N.
- `pow` - Potenz von 2.
- `floor` - Math.floor
- `ceil` - Math.ceil
- `random(R)` - Math.random() * R, oder nur Math.random() wenn kein Argument
- `formatValue(decimals)` - Wert gemäß Systemeinstellungen formatieren und Dezimalstellen verwenden
- `date(format)` - Wert als Datum formatieren. Format ist wie: "YYYY-MM-DD hh:mm:ss.sss"
- `momentDate(format, useTodayOrYesterday)` - Formatieren Sie den Wert als Datum mit Moment.js. [Genehmigte Formate müssen gemäß der Bibliothek moment.js eingegeben werden](https://momentjs.com/docs/#/displaying/format/). Mit `useTodayOrYesterday=true` werden die momentjs Formate `ddd`/`dddd` mit heute / gestern überschrieben
- `array(element1,element2[,element3,element4])` - gibt das Indexelement zurück. z.B.: `{id.ack;array(ack ist falsch,ack ist wahr)}`

Sie können dieses Muster in jedem Text verwenden, z

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

oder Farbberechnungen:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Um den Zeitstempel des Objekts anzuzeigen, schreiben Sie `.ts` oder `.lc` (für die letzte Änderung) an das Ende der Objekt-ID, z.B.:

```
Last change: {objectRed.lc;date(hh:mm)}
```

Es gibt noch eine weitere Möglichkeit, das Muster zu schreiben:

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}` werden als Funktion interpretiert:

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

Sie können *beliebige* Javascript-Funktionen verwenden. Argumente müssen mit ':' definiert werden, andernfalls werden sie als Formel interpretiert.

Achten Sie auf Typen. Alle von ihnen als Strings definiert. Um sicher zu sein, dass dieser Wert als Zahl behandelt wird, verwenden Sie die parseFloat-Funktion.

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

###Sonderbindungen
Es gibt eine Reihe verschiedener interner Bindungen, um zusätzliche Informationen in Ansichten bereitzustellen:

* `Benutzername` - zeigt den eingeloggten Benutzer an
* `view` - Name der aktuellen Ansicht
* `wname` - Widget-Name
* `Widget` - ist ein Objekt mit allen Daten des Widgets. Kann nur im JS-Teil verwendet werden, wie `{a:a;widget.data.name}`
* `wid` - Name des aktuellen Widgets
* `Sprache` - kann `de`, `en` oder `ru` sein.
* `Instanz` - Browserinstanz
* `login` - ob eine Anmeldung erforderlich ist oder nicht (z.B. um den Logout-Button anzuzeigen/auszublenden)
* `local_*` - Wenn der Statusname von `local_` gestartet wird, wird er nicht an ioBroker gemeldet, sondern alle Widgets aktualisiert, die von diesem Status abhängen. (Lokale Variable für aktuelle Browsersitzung)

Hinweis: Um ":" in Berechnungen (z. B. in Zeichenfolgenformeln) zu verwenden, verwenden Sie stattdessen "::".

**Denken Sie daran**, dass Stildefinitionen als Bindungen interpretiert werden, also verwenden Sie `{{style: value}}` oder einfach

```
{
	style: value
}
```

dafür.

##Filter
Um die ganze Anzahl von Widgets in einer Ansicht zu visualisieren, können Sie Filter verwenden, um die Anzahl der gleichzeitig in der Ansicht angezeigten Widgets zu reduzieren.

Jedes Widget hat ein Feld `filter`. Wenn Sie es auf einen Wert setzen, z.B. `light`, sodass Sie mit anderen Widgets `(bars - filters, filter - dropdown)` steuern können, welcher Filter tatsächlich aktiv ist.

## Steuerschnittstelle
Vis erstellt 3 Variablen:

- `control.instance` - Hier sollte die Browserinstanz geschrieben werden oder `FFFFFFFF` wenn jeder Browser gesteuert werden muss.
- `control.data` - Parameter für Befehl. Siehe spezifische Befehlsbeschreibung.
- `control.command` - Befehlsname. Diese Variable schreiben löst den Befehl aus. Das heißt, bevor der Befehl geschrieben wird, müssen die "Instanz" und "Daten" mit Daten aufbereitet werden.

Befehle:

* `alert` - Benachrichtigungsfenster im vis anzeigen. "control.data" hat das folgende Format "message;title;jquery-icon". Titel und jquery-Icon sind optional. Symbolnamen finden Sie [hier](http://jqueryui.com/themeroller/). Um das Icon "ui-icon-info" anzuzeigen, schreiben Sie ```Message;;info```.
* `changeView` - Wechseln Sie zur gewünschten Ansicht. "control.data" muss den Namen der Ansicht haben. Sie können den Projektnamen auch als "Projekt/Ansicht" angeben. Standardprojekt ist "main".
* `refresh` - Laden Sie die Vis neu, zum Beispiel nachdem das Projekt geändert wurde, um in allen Browsern neu zu laden.
* `reload` - wie Aktualisieren.
* `dialog` - Dialogfenster anzeigen. Der Dialog muss in der Ansicht vorhanden sein. Einer von:

    - `statisch - HTML - Dialog`,
    - `statisch - Symbol - Dialog`,
    - `Container - HTML - Ansicht im jqui-Dialog`,
    - `Container - ext cmd - Ansicht im jqui-Dialog`,
    - `Container - Icon - Ansicht im jqui-Dialog`,
    - `Container - Schaltfläche - Ansicht im jqui-Dialog`.

    `control.data` muss die ID des Dialog-Widgets haben, z.B. `w00056`.

* `dialogSchließen`
* `popup` - öffnet ein neues Browserfenster. Link muss in `control.data` angegeben werden, z.B. http://google.com
* `playSound` - Sounddatei abspielen. Der Link zur Datei wird in `control.data` angegeben, z.B. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Sie können Ihre eigene Datei in vis hochladen und abspielen lassen wie zB `/vis.0/main/img/myFile.mp3`.

Wenn der Benutzer die Ansicht ändert oder beim Start werden die Variablen von der vis mit gefüllt

- `control.instance`: Browserinstanz und `ack=true`
- `control.data`: Projekt- und Ansichtsname in der Form `Projekt/Ansicht`, z.B. `main/view` (und `ack=true`)
- `control.command`: `changedView` und `ack=true`

Sie können den JSON-String oder das Objekt in `control.command` als `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}` schreiben. In diesem Fall werden die Instanz und die Daten aus dem JSON-Objekt übernommen.

Beispiel für Javascript-Adapter:

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Standardansicht
Sie können für jede Ansicht die gewünschte Auflösung definieren (Menü=>Extras=>Auflösung). Dies ist nur der visuelle Rahmen im Bearbeitungsmodus, um Ihnen die Bildschirmgröße auf einem bestimmten Gerät anzuzeigen. Im Echtzeitmodus ist es nicht sichtbar und alle Widgets außerhalb des Rahmens sind sichtbar.

Außerdem können Sie festlegen, ob diese Ansicht als Standard für diese Auflösung verwendet werden soll.

So wird bei jedem Aufruf der `index.html` (ohne `#viewName`) die für diese Auflösung am besten geeignete Ansicht geöffnet.
Wenn nur eine Ansicht das Flag *"Standard"* hat, wird diese Ansicht unabhängig von Bildschirmauflösung oder Ausrichtung geöffnet.

Z.B. Sie können zwei Ansichten "Landscape-Mobile" und "Portrait-Mobile" erstellen und diese beiden Ansichten werden automatisch umgeschaltet, wenn Sie die Ausrichtung oder Bildschirmgröße ändern.

Es gibt ein Helfer-Widget "einfach - Bildschirmauflösung", das die aktuelle Bildschirmauflösung und die für diese Auflösung am besten geeignete Standardansicht anzeigt.

## Einstellungen
### Nachladen, wenn du länger schläfst als
Es gibt eine Regel, dass nach einer gewissen Unterbrechungszeit die gesamte VIS-Seite neu geladen wird, um das Projekt zu synchronisieren.
Sie können es im Menü "Einstellungen..." konfigurieren. Wenn Sie das Intervall auf "nie" setzen, wird die Seite nie neu geladen.

### Wiederverbindungsintervall
Legen Sie das Intervall zwischen den Verbindungsversuchen fest, wenn die Verbindung getrennt wird. Wenn Sie 2 Sekunden einstellen, wird alle 2 Sekunden versucht, die Verbindung aufzubauen.

### Dunkler Bildschirm zum Wiederverbinden
Manchmal (in der Nacht) ist ein dunkler Ladebildschirm erforderlich. Mit dieser Option können Sie es einstellen.

Beachten Sie, dass diese Einstellungen nur für die erneute Verbindung gültig sind und nicht für die erste Verbindung.

![Dunkel](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->
### 1.4.5 (2021-10-08)
* (jens-maus) Frame-src-Spezifikation zum Content-Security-Policy-Header hinzugefügt, um Probleme beim Blockieren von Frame-bezogenen Inhalten zu beheben (z. B. bei Verwendung der KioskPro iOS-App).
* (bluefox) Zeigte die erweiterten Fehlermeldungen bei der Lizenzprüfung an
* (Scrounger) Patch-Sichtbarkeit oid Bindung

### 1.4.4 (2021-08-31)
* (jobe451) Darf ":" in den Bindungsobjekt-IDs enthalten

### 1.4.3 (2021-07-11)
* (bluefox) Möglichkeit zur Offline-Lizenzprüfung hinzugefügt (nur einmalig)

### 1.4.0 (2021-07-01)
* (bluefox) Pfad zur Zertifikatsprüfung geändert
* (thost96) behebt Probleme, die vom Adapter-Checker gefunden wurden

### 1.3.10 (2021-05-25)
* (bluefox) Die Unterstützung von admin5 wurde behoben

### 1.3.9 (2021-04-29)
* (agav99) Unterstützung für lokale Browservariablen hinzugefügt
* (Scrounger) Bugfix für Null- und NaN-Werte in Breite und Höhe
* (bluefox) Unterstützung für admin hinzugefügt5

### 1.3.8 (2021-03-03)
* (bluefox) Spielsounds auf iOS Safari und Android korrigiert
* (Scrounger) visEditInspect: Formatdimension hinzugefügt
* (foxriver76) Ersetze travis und appveyor durch die GitHub-Aktionen
* (Excodibur) Erlaube das Laden von Ressourcen als Blob
* (Excodibur) Erlaube das Laden von Ressourcen als Blob

### 1.3.7 (2021-01-20)
* (Scrounger) Fehler behoben - Bindung im JSON-String

### 1.3.6 (13.12.2020)
* (twonky4) Korrigiert: altes Browserproblem
* (rbaranga) Korrigiert: Sounds auf iOS Safari abspielen
* (Scrounger) Optionale Argumente hinzugefügt, um Material Design Widgets zu unterstützen

### 1.3.4 (2020-10-04)
* (foxriver76) Fehler bei älteren Geräten behoben

### 1.3.3 (2020-09-21)
* (bluefox) De-Bounce-Einstellungen zurückgeben
* (bluefox) Fehler mit {username}-Bindung behoben
* (bluefox) Option "Letzte Änderung anzeigen" behoben

### 1.3.1 (2020-09-18)
* (bluefox) Autofokus-Option zu den Eingabe-Widgets hinzugefügt

### 1.3.0 (2020-09-17)
* (foxriver76) bei ausstehenden getStates, versuchen Sie es erneut, anstatt zu fallen
* (foxriver76) Fehler im Dateimanager behoben
* (Scrounger) MomentDate für die Bindungen hinzugefügt

### 1.2.12 (2020-09-08)
* (foxriver76) analysiert nur Arrays und Json-Objekte, keine Booleschen, normalen Strings usw

### 1.2.11 (2020-08-25)
* (bluefox) Die Fehlermeldung über die nicht gefundene Kartenansicht wurde behoben.

### 1.2.10 (2020-08-23)
* (gsicilia82/fceller) JSON-Strings werden in VIS-Bindungen geparst

### 1.2.9 (2020-08-22)
* (bluefox) Charts werden jetzt unterstützt

### 1.2.6 (2020-03-22)
* (bluefox) Bessere Fehlermeldung hinzugefügt, wenn die Lizenz nicht geparst werden konnte

### 1.2.4 (2020-02-11)
* (bluefox) Tabellen-Widget wurde um die ausgewählte Objekt-ID erweitert.

### 1.2.3 (2019-12-14)
* (bluefox) Kleine Änderungen im Umgang mit Lizenzen wurden vorgenommen

### 1.2.2 (27.10.2019)
* (bluefox) Vorbereitungen für js-controller 2.0. Überprüfen Sie undefined adn null.

### 1.2.1 (2019-09-10)
* (bluefox) Upload von Dateien behoben

### 1.2.0 (2019-05-07)
* (bluefox) Übersetzungen hinzufügen

### 1.1.11 (2019-02-07)
* (bluefox) Bool HTML verbessern

### 1.1.10 (2019-01-30)
* Chinesische Unterstützung hinzufügen

### 1.1.8 (2018-10-29)
* (bluefox) Dateidialog wurde korrigiert

### 1.1.7 (2018-07-24)
* (bluefox) view8 korrigiert

### 1.1.6 (2018-07-18)
* (bluefox) Unterstützung neuer Variablen (siehe [Special Bindings](#special-bindings) )
* (bluefox) Fehler behoben, wenn sich die schnelle Ansicht ändert
* (bluefox) Fix "jqui - ctrl - IconState / val - Icon Bool"

### 1.1.5 (2018-06-10)
* (bluefox) weitere Informationen anzeigen, wenn das Widget nicht gerendert werden kann
* (bluefox) Speichern von Widgets behoben, wenn sie Bindungen haben
* (bluefox) Fehlerstack anzeigen
* (bluefox) feste Bindung
* (Apollon77) Fix-Tests
* (bluefox) Fix für iobroker.pro und externe socket.io Einstellungen
* (bluefox) Eine Benutzervariable wurde zu Bindings hinzugefügt.
* (bluefox) Widget-Tabs behoben

### 1.1.4 (2018-04-23)
* (bluefox) fix bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) Ignoriere Klick durch Scrollen auf Touch-Geräten
* (bluefox) falschen Status entfernen vis.0.command
* (bluefox) Fehler mit jPlot beheben
* (bluefox) besseres Widget-Verhalten im Bearbeitungsmodus (basic, jqui)
* Konfigurationsdialog reparieren

### 1.1.2 (2018-02-02)
* (bluefox) Behebung des Speicherns des Projekts
* (bluefox) Korrektur der Hintergrundauswahl
* (bluefox) Behebung des Nullzeigerproblems
* (bluefox) Korrektur des Auswahlhelfers
* Übersetzungen aktualisieren

### 1.1.1 (2018-01-07)
* (bluefox) Das Problem mit dem Ansichtswechsel auf den Touch-Geräten behoben

### 1.0.5 (2017-11-19)
* (bluefox) zeigt die Anzahl der Datenpunkte in jedem Projekt an

### 1.0.4 (2017-10-22)
* (bluefox) Autovervollständigung für CSS-Optionen hinzufügen
* (bluefox) Änderung der CSS-Hintergrundoptionen für die Ansicht ändern

### 1.0.3 (2017-10-20)
* (bluefox) Fehler beim Parsen ungültiger Bindungen behoben
* (bluefox) moment.js hinzufügen

### 1.0.0 Release Candidate (2017-10-13)
* (bluefox) iframe und Bild-Updates behoben
* (bluefox) Schriftarten korrigieren

### 0.15.7 (2017-10-01)
* (bluefox) ermöglichen das Aktualisieren von Bildern ohne zusätzliche Abfrage (funktioniert jedoch nur in einigen ganz bestimmten Fällen)
* (bluefox) Zoom von iframes

### 0.15.5 (2017-07-24)
* (bluefox) Widget-Upload korrigieren

### 0.15.4 (2017-07-19)
* (bluefox) Streichen hinzufügen

### 0.15.3 (2017-07-12)
* (bluefox) Vollbild-Widget hinzufügen
* (bluefox) Zeitstempel-Widget reparieren

### 0.15.2 (2017-07-07)
* (bluefox) Fix Binding wenn es "-" in der OID hat

### 0.15.1 (2017-06-30)
* (bluefox) Fehler mit Kontextmenü beheben
* (bluefox) Hinzufügen von Klassen zur Ansicht zulassen

### 0.15.0 (2017-05-25)
* (bluefox) Kopie von gruppierten Widgets reparieren
* (bluefox) Fix abonnieren wenn leere Zustände

### 0.14.7 (2017-05-19)
* (bluefox) Vorlagen hinzufügen

### 0.14.6 (2017-05-16)
* (bluefox) Fehler durch Gruppenauswahl behoben
* (apollon77) jqui-dialog für automatisches Öffnen korrigiert

### 0.14.3 (2017-05-11)
* (bluefox) Export/Import von gruppierten Widgets korrigiert

### 0.14.2 (2017-04-29)
* (bluefox) Installationsfehler beheben

### 0.14.1 (2017-04-27)
* (bluefox) Beta in Main verschieben
* (bluefox) Fix Filter auswählen
* (bluefox) Fehler behoben, wenn einige Ansichten nicht vorhanden sind
* (bluefox) Bindungsproblem beheben, z.B. Als Variable wurde auch "a:-45?0" erkannt.
* (bluefox) einige Schriftgrößen korrigieren
* (bluefox) beheben rückgängig machen
* (bluefox) Themenänderung beheben
* (bluefox) optimiert das Laden von Seiten
* (bluefox) Lizenz prüfen
* (bluefox) Grundansichten korrigieren 8
* (bluefox) feste Zeitauswahl, wenn im Dialog geöffnet

### 0.14.0 (2017-04-10)
* (bluefox) obligatorische Lizenzeingabe hinzufügen

### 0.12.7 (2017-02-09)
* (bluefox) Beta vorbereiten

### 0.12.6 (2017-01-29)
* (pmant) Ansichtskopie korrigieren
* (pmant) Verbesserungen am Kontextmenü
* (pmant) Usability-Verbesserungen für beide Ansichts-Dropdowns
* (bluefox) kleiner Fehler beim Ziehen

### 0.12.6 (2017-01-29)
* (pmant) Dropdown-Menü zur Ansichtsleiste hinzufügen
* (pmant) Widgets Widget-Selektor nach Namen sortieren
* (bluefox) fix groupAttr in Signalen und Sichtbarkeit

### 0.12.2 (2016-12-04)
* (bluefox) Fehler bei der Gruppierung beheben

### 0.12.1 (2016-11-30)
* (bluefox) Fehler mit Containern beheben

### 0.12.0 (2016-11-24)
* (bluefox) Abonnementmodus für schnelleres Laden des Status
* (bluefox) Gruppierung hinzufügen

### 0.10.15 (2016-11-06)
* (bluefox) wetter-adapter.html entfernen
* (bluefox) config.js bereinigen
* (bluefox) alte Widgets entfernen
* (bluefox) verbessert die Authentifizierung in der App
* (bluefox) ermöglicht das Erstellen von Instanzen aus dem Helfer-Widget

### 0.10.14 (2016-10-09)
* (bluefox) Rendering von Widgets korrigiert
* (bluefox) arbeitet an relativen Positionen.
* (bluefox) Widgets zerstören, bevor Ansichten gelöscht werden

### 0.10.13 (2016-09-23)
* (bluefox) Fehler für iPad 1 behoben
* (bluefox) beginnen mit der Arbeit an relativen Positionen

### 0.10.12 (2016-09-16)
* (bluefox) Gruppenspezifische Sichtbarkeit von Widgets und Ansichten

### 0.10.11 (2016-09-15)
* (bluefox) Fix für iOS 10
* (bluefox) ermöglichen das Deaktivieren von Gruppen für die Leistung

### 0.10.10 (2016-09-14)
* (bluefox) text2speech-Widget hinzufügen
* (bluefox) versuchen, das Problem mit iOS 10 zu beheben

### 0.10.9 (2016-09-04)
* (bluefox) Unterstützung von Web-Sockets force
* (bluefox) vernichten ungenutzte Ansichten nach 30 Sekunden
* (bluefox) zeigen keine mittleren Führungslinien, wenn oben und unten angezeigt werden
* (bluefox) Zeitstempel und Last-Änderung lassen, um die Zeit als Intervall anzuzeigen

### 0.10.7 (2016-07-09)
* (bluefox) füge Einstellungen hinzu, um Vis neu zu laden
* (bluefox) dunklen Reload-Bildschirm hinzufügen
* (bluefox) festes Nachladeintervall
* (bluefox) exportieren/importieren
* (bluefox) globales Skript hinzufügen
* (bluefox) füge 'nicht vorhanden'/'nicht bestehen'/'existieren' zu Signal und Sichtbarkeit hinzu
* (bluefox) OIDs im Editor korrigieren

### 0.10.5 (2016-06-15)
* (bluefox) ID-Auswahldialog korrigieren
* (bluefox) füge Hilfslinien zum Ausrichten hinzu
* (bluefox) Daten niemals im Nicht-Bearbeitungsmodus speichern

### 0.10.4 (2016-06-14)
* (bluefox) Drag & Resize korrigiert
* (Patrick) QuoJS reparieren
* (bluefox) Unterstützung von Millisekunden in formatDate
* (bluefox) Unterstützung von getHistory
* (bluefox) Unterstützung von Show-History-Instanzen
* (bluefox) Gitter
* (bluefox) Vorschauen hinzufügen

### 0.10.3 (2016-05-30)
* (bluefox) canJS aktualisieren
* (pmant) behebt Fehler mit Dialogen auf Touchscreens
* (bluefox) speedUP zeigt Attribute bei 300ms
* (bluefox) Klick auf Widget behoben, wenn Signal aktiv ist

### 0.10.2 (2016-05-24)
* (bluefox) Widgets mit Zeitstempeln reparieren

### 0.10.1 (2016-05-23)
* (bluefox) Version ändern

### 0.10.0 (2016-05-23)
* (bluefox) übersetzt
* (bluefox) Fix 'keine Widgets ausgewählt'
* (bluefox) Widget-Symbole ändern
* (bluefox) Signale hinzufügen
* (bluefox) app.css für Cordova hinzufügen
* (bluefox) Vorschau der Symbole ändern
* (bluefox) Eigenschaften des Widgets als Symbol anzeigen
* (bluefox) Fehler mit externen Befehlen beheben
* (bluefox) Typensymbol zur Vorschau hinzufügen
* (bluefox) unterstützt die Bearbeitung auf dem iPad1
* (bluefox) Sicherheitseinstellungen ändern

## License
To use this adapter in ioBroker you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on https://iobroker.net . The license if checked online against the ioBroker license server when the vis adapter is started, so an online connection at this timepoint is required!
* **Private use Offline-License**: For paying a small support fee you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2013-2021 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).