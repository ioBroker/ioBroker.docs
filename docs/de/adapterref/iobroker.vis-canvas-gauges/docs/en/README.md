---
chapters: {"pages":{"en/adapterref/iobroker.vis-canvas-gauges/README.md":{"title":{"en":"ioBroker.vis-canvas-gauges"},"content":"en/adapterref/iobroker.vis-canvas-gauges/README.md"},"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md":{"title":{"en":"Canvas gauges for vis-2"},"content":"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md
title: Canvas-Messgeräte für Vis-2
hash: evdkh0LYM7h5Kt5bW02OCgscx/uQAQU0HROGc+37p68=
---
# Canvas-Messgeräte für Vis-2

Das Widget-Set enthält fünf Anzeigen, die Zahlen darstellen: eine **lineare** Anzeige, eine **radiale** Anzeige, einen **Kompass** , einen **Balken** und einen **Fortschrittsbalken** . Diese Seite beschreibt die Version **vis-2** . Die ersten vier Anzeigen sind in vis (vis-1) mit denselben Einstellungen verfügbar; sie werden von derselben Bibliothek gezeichnet und sehen daher dort identisch aus. Der Fortschrittsbalken ist nur in vis-2 enthalten.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen und Migration](#requirements-and-migration)
  - [Der Wert](#the-value)
  - [Highlights](#highlights)
  - [Zecken](#ticks)
  - [Animation](#animation)
  - [Farben](#colors)
  - [Dunkles Thema](#dark-theme)
  - [Nadel](#needle)
  - [Grenzen](#borders)
  - [Wertbox](#value-box)
  - [Schriftarten](#fonts)
- [Linear](#linear---tplcglineargauge)
- [Radial](#radial---tplcgradialgauge)
- [Kompass](#compass---tplcgcompas)
- [Wohnung](#flat---tplcgflatgauge)
- [Fortschritt](#progress---tplcgprogress)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein

### Anforderungen und Migration

Die Widgets befinden sich im Widget-Set **„Canvas Gauges“** in der Widget-Liste des vis-2-Editors. Die hier beschriebenen React-Versionen benötigen **vis-2 Version 2.12.8** oder neuer. Ältere vis-2-Versionen zeigen stattdessen die vis-1-Widgets an.

Mit vis-1 erstellte Projekte funktionieren weiterhin ohne Änderungen. Beide Versionen verwenden dieselben Widget-IDs (`tplCGlinearGauge`, `tplCGradialGauge`, `tplCGCompas`, `tplCGflatGauge`) und dieselben Attributnamen, und vis-2 wählt die React-Version automatisch aus. Alle Einstellungen werden übernommen. `tplCGprogress` hat kein Gegenstück in vis-1 und erscheint daher nur im vis-2-Editor.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

**„Leer“ bedeutet „Standardwert der Bibliothek“.** Fast alle Felder sind optional. Solange ein Feld leer ist, verwendet das Messgerät den Standardwert von [canvas-gauges](https://canvas-gauges.com) , wo auch die Bedeutung jeder Option detailliert dokumentiert ist. Nur die in den Tabellen mit einem Standardwert gekennzeichneten Einstellungen werden immer gespeichert.

Die Größe eines Messgeräts entspricht der Größe des zugehörigen Widgets. Die Zeichnung wird jedes Mal neu gerendert, wenn die Größe des Widgets geändert wird, daher kann ein Messgerät beliebig skaliert werden – runde Messgeräte sehen in einem quadratischen Rahmen am besten aus.

### Der Wert

| Einstellung      | Attribut      | Standard | Beschreibung                                                                                                                                                                         |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Objekt-ID        | `oid`         |          | Der Zustand, dessen Wert die Anzeige anzeigt. Wenn Sie einen Zustand auswählen, werden _Min_ , _Max_ , _Einheiten_ und _Titel_ aus dem Objekt übernommen, sofern sie noch leer sind. |
| Min              | `minValue`    | 0        | Anfang der Tonleiter.                                                                                                                                                                |
| Max              | `maxValue`    | 100      | Am Ende der Skala.                                                                                                                                                                   |
| Einheiten        | `units`       |          | Text unter dem Wert, z.B. `°C` Die                                                                                                                                                    |
| Titel            | `title`       |          | Text über der Mitte des Messgeräts.                                                                                                                                                  |
| Faktor           | `factor`      | 1        | Der Wert des Zustands wird vor der Ziehung mit diesem Faktor multipliziert.                                                                                                          |
| Wertverschiebung | `valueOffset` | 0        | ... und dies wird anschließend hinzugefügt. Zusammen mit _dem Faktor_ wandelt dies eine Einheit um, z. B. `1.8` /`32` von °C in °F.                                                   |

Der Zeiger verharrt so lange auf _Min_ , wie der Zustand keinen Wert hat.

### Highlights

![Highlights](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/highlights.png)

Abschnitte der Skala in einer eigenen Farbe, zum Beispiel grün bis 50, gelb bis 80 und rot darüber.

| Einstellung       | Attribut                                   | Standard                 | Beschreibung                                                                                                                 |
| ----------------- | ------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Highlights Nummer | `hCount`                                   | 1                        | Wie viele Abschnitte es gibt. `0` schaltet sie aus. Jeder Abschnitt fügt einen Satz der drei unten aufgeführten Felder hinzu. |
| Aus               | `highlightsFrom1`, `highlightsFrom2`, ... |                          | Anfang des Abschnitts, in den Skalenwerten. Ein Abschnitt mit einem leeren _„Von“-Feld_ wird übersprungen.                   |
| Zu                | `highlightsTo1`, ...                      |                          | Ende des Abschnitts.                                                                                                         |
| Farbe             | `highlightsColor1`, ...                   |                          | Farbe des Abschnitts.                                                                                                        |
| Abschnittsbreite  | `highlightsWidth`                          | 15 (radial), 10 (linear) | Breite des farbigen Streifens in Prozent der Plattenfläche. Die Abbildung unten zeigt dies.                                  |
| Abschnitt endet   | `highlightsLineCap`                        | gerade                   | `round` rundet die äußeren Enden des Bandes ab.                                                                              |

![Abschnittsbreite](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/highlightswidth.png)

### Zecken

![Zecken](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/ticks.png)

| Einstellung        | Attribut        | Standard     | Beschreibung                                                                                                                                                                                                                                                                                                                     |
| ------------------ | --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wichtige Zecken    | `majorTicks`    |              | Die beschrifteten Linien. Ein leerer Bereich teilt die Skala in fünf Abschnitte. Eine Zahl, z. B. `11`, gibt so viele gleichmäßig von _Min_ bis _Max_ verteilte Labels an. Eine durch Kommas getrennte Liste, z. B. `off,low,mid,high,max`, werden als Beschriftungen selbst verwendet – so erhält der Kompass seine Richtungen. |
| Kleine Zecken      | `minorTicks`    | siehe Widget | Anzahl der unbeschrifteten Linien zwischen zwei Hauptmarkierungen.                                                                                                                                                                                                                                                               |
| Schlaganfall-Ticks | `strokeTicks`   | siehe Widget | Zeichnet eine Linie entlang der Skala, die die Teilstriche verbindet.                                                                                                                                                                                                                                                            |
| Exakte Ticks       | `exactTicks`    | aus          | Platziert die Beschriftungen an ihren jeweiligen Werten, anstatt sie gleichmäßig zu verteilen. Dies macht sich nur bemerkbar, wenn _„Major ticks“_ eine Zahlenliste ist.                                                                                                                                                         |
| Vor dem Komma      | `majorTicksInt` | 4            | Ziffern vor dem Komma der Kontrollkästchen; kürzere Zahlen erhalten führende Nullen.                                                                                                                                                                                                                                             |
| Nach dem Komma     | `majorTicksDec` | 2            | Ziffern nach dem Komma der Häkchenbezeichnungen.                                                                                                                                                                                                                                                                                 |
| Zahlenrand         | `numbersMargin` | 1            | Abstand der Markierungen vom Tellerrand in Prozent.                                                                                                                                                                                                                                                                              |

![Exakte Ticks](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/exactticks.png)

_Hauptzecken_ sind `0,10,50,100` auf beiden Bildern.

### Animation

| Einstellung          | Attribut            | Standard | Beschreibung                                                                                                                                                  |
| -------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ermöglicht           | `animation`         | An       | Der Zeiger bewegt sich zum neuen Wert, anstatt zu springen.                                                                                                   |
| Dauer                | `animationDuration` | 500      | Reisedauer in ms.                                                                                                                                             |
| Regel                | `animationRule`     | `linear` | Reiseverlauf: `linear`, `quad`, `quint`, `cycle`, `bounce`, `elastic` und ihre `de...` Gegenstücke, die in die entgegengesetzte Richtung verlaufen.             |
| Wert animieren       | `animatedValue`     | aus      | Die Zahl im Wertfeld zählt mit dem Zeiger nach oben.                                                                                                          |
| Animation beim Start | `animateOnInit`     | aus      | Beim Öffnen der Ansicht startet der Zeiger bei _Min_ und bewegt sich zum aktuellen Wert.                                                                      |
| Animationsziel       | `animationTarget`   | `needle` | Nur Radialinstrument und Kompass: `needle` dreht die Nadel, `plate` Die Platte dreht sich unter einer feststehenden Nadel – so funktioniert ein echter Kompass. |

### Farben

Jeder Bereich eines Messgeräts hat seine eigene Farbe, und ein leeres Feld behält die Farbe der Bibliothek. Eine Einstellung, die mit _„end“_ endet, ist die zweite Farbe eines Farbverlaufs.

![Farben](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/colors.png)

| Einstellung                                            | Attribut                                                                    | Beschreibung                                        |
| ------------------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------- |
| Platte / Plattenende                                   | `colorPlate`, `colorPlateEnd`                                               | Die Skala des Messgeräts.                           |
| Große Zecken / Kleine Zecken                           | `colorMajorTicks`, `colorMinorTicks`                                        | Die Linien der Skala.                               |
| Zeckenstich                                            | `colorStrokeTicks`                                                          | Die Linie entlang der Skala, die _Stroke_ ankreuzt. |
| Titel / Einheiten / Zahlen                             | `colorTitle`, `colorUnits`, `colorNumbers`                                  | Die drei Texte auf dem Teller.                      |
| Nadel / Nadelspitze                                    | `colorNeedle`, `colorNeedleEnd`                                             | Die Nadel, von ihrem Ansatz bis zur Spitze.         |
| Nadelschatten nach oben / unten                        | `colorNeedleShadowUp`, `colorNeedleShadowDown`                              | Der Schatten, den die Nadel auf den Teller wirft.   |
| Werttext / Werttextschatten                            | `colorValueText`, `colorValueTextShadow`                                    | Die Zahl im Wertfeld.                               |
| äußerer / mittlerer / innerer Rand (+ _Ende_ )         | `colorBorderOuter`, `colorBorderMiddle`, `colorBorderInner`, ...           | Die drei Ringe um den Teller.                       |
| Randschatten                                           | `colorBorderShadow`                                                         | Der Schatten unter dem äußeren Ring.                |
| Wertfeld-Rechteck / Hintergrund / Schatten (+ _Ende_ ) | `colorValueBoxRect`, `colorValueBoxBackground`, `colorValueBoxShadow`, ... | Der Rahmen um den Wert.                             |

### Dunkles Thema

![Dunkles Thema](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/darktheme.png)

Die gleichen zwei Widgets in einer dunklen Ansicht, mit ein- und ausgeschaltetem Schalter.

| Einstellung      | Attribut      | Standard | Beschreibung                                                                                                    |
| ---------------- | ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| Dem Thema folgen | `followTheme` | An       | Im düsteren Thema von vis-2 werden die Platte, die Skala, die Texte, die Ringe und die Spur des Balkens dunkel. |

Das _Material_ des Instruments behält in beiden Darstellungsformen seine Farbe: Die Nadel bleibt lachsfarben, die rote Nadel des Flachmessgeräts bleibt rot und der farbige Teil eines Balkens behält die von Ihnen gewählte Farbe. Nur das, was es mit der darunterliegenden Ansicht gemeinsam hat, passt sich der Darstellung an. Eine eingeschaltete Lampe wird nachts ja auch nicht grau.

**Eine geänderte Farbe bleibt unverändert.** Der Schalter ändert eine Farbe nur, solange das Feld leer ist oder noch die Voreinstellung enthält, mit der das Widget erstellt wurde – beispielsweise die weiße Platte des Flachanzeige-Displays. Sobald Sie selbst eine Farbe auswählen, wird diese in beiden Designs übernommen.

**Widgets, die vor dem Inkrafttreten dieser Einstellung platziert wurden, bleiben unverändert.** `followTheme` wird beim Erstellen eines Widgets in dieses geschrieben, sodass ein altes Projekt – und ein von vis-1 migriertes Projekt – sein Aussehen beibehält, bis Sie den Schalter einschalten.

Das Thema ist auch der Grund, warum sich der Kompass kaum verändert: Fast alle seine Farben sind Teil seiner Voreinstellung und bereits dunkel.

Die Radiallehre und der Kompass fügen die Farben des Kreises in der Mitte hinzu: `colorNeedleCircleOuter`, `colorNeedleCircleOuterEnd`, `colorNeedleCircleInner` Und `colorNeedleCircleInnerEnd` Die

Die lineare Messskala, die Flächenmessskala und der Fortschrittsbalken fügen die Farben des Balkens hinzu: `colorBarStroke`, `colorBar`, `colorBarEnd`, `colorBarProgress`, `colorBarProgressEnd` Und `colorBarShadow` Die

### Nadel

| Einstellung    | Attribut                   | Beschreibung                                                                                                |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Nadel anzeigen | `needle`                   | Off erzeugt ein Manometer ohne Zeiger – nützlich, wenn nur der Balken oder das Wertfeld sichtbar sein soll. |
| Schatten       | `needleShadow`             | Die Nadel wirft einen Schatten auf den Teller.                                                              |
| Typ            | `needleType`               | `arrow` ist der sich verjüngende Zeiger, `line` eine gerade Linie mit _der Breite_ Pixel.                    |
| Start / Ende   | `needleStart`, `needleEnd` | Wo die Nadel beginnt und endet, in Prozent des Radius (der Länge des Längenmessgeräts). `0` ist das Zentrum. |
| Breite         | `needleWidth`              | Breite der Nadel an ihrer Basis.                                                                            |

### Grenzen

![Grenzen](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/borders.png)

Drei Ringe und ein Schattenrahmen umrahmen den Teller. Breite einstellen auf `0` verbirgt diesen Ring.

| Einstellung                       | Attribut                                                    | Beschreibung                                     |
| --------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Ermöglicht                        | `borders`                                                   | Die Aus-Funktion entfernt alle Ringe auf einmal. |
| Äußere / Mittlere / Innere Breite | `borderOuterWidth`, `borderMiddleWidth`, `borderInnerWidth` | Breite der drei Ringe.                           |
| Schattenbreite                    | `borderShadowWidth`                                         | Breite des Schattens unter dem äußeren Ring.     |

### Wertbox

![Wertbox](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/valuebox.png)

Das Kästchen unterhalb der Mitte, das den Wert als Zahl anzeigt.

| Einstellung          | Attribut               | Standard | Beschreibung                                                                                                                                                     |
| -------------------- | ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ermöglicht           | `valueBox`             | aus      | Zeigt die Box.                                                                                                                                                   |
| Boxstrich            | `valueBoxStroke`       |          | Breite des Rahmens um die Schachtel.                                                                                                                             |
| Boxbreite            | `valueBoxWidth`        | 0        | Feste Breite des Feldes in Prozent. `0` lässt es mit seinem Text mitwachsen.                                                                                      |
| Text                 | `valueText`            |          | Anstelle des Werts wird ein fester Text angezeigt. Dieser wird nur so lange angezeigt, wie _die Objekt-ID_ keinen Wert hat; andernfalls wird der Wert verwendet. |
| Textschatten         | `valueTextShadow`      |          | Die Zahl wirft einen Schatten.                                                                                                                                   |
| Radius der Boxränder | `valueBoxBorderRadius` |          | Abrundung der Ecken der Schachtel.                                                                                                                               |
| Vor dem Komma        | `valueInt`             | 0        | Ziffern vor dem Komma. Eine kürzere Zahl erhält führende Nullen, z. B. `007.25` mit 3 / 2.                                                                        |
| Nach dem Komma       | `valueDec`             | 0        | Ziffern nach dem Komma. `0` wird auf eine ganze Zahl gerundet.                                                                                                    |

> **Die Widgets „Linear“, „Flach“ und „Fortschritt“ zeigen das Wertefeld nur im aufrechten Zustand an.** Die Bibliothek zeichnet das Wertefeld eines linearen Balkens nur dann, wenn das Widget mindestens so hoch wie breit ist. Bei einem liegenden Balken hat diese Einstellung keine Auswirkung – platzieren Sie stattdessen ein Text-Widget daneben.

### Schriftarten

Familie, Größe, Stil und Gewicht der vier Texte - _Zahlen_ (die Skala), _Titel_ , _Einheiten_ und _Wert_ .

| Einstellung                       | Attribut                                                             | Beschreibung                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Zahlen / Titel / Einheiten / Wert | `fontNumbers`, `fontTitle`, `fontUnits`, `fontValue`                 | Die Schriftfamilie.                                                                                                       |
| ... Größe                         | `fontNumbersSize`, `fontTitleSize`, `fontUnitsSize`, `fontValueSize` | Die Größe. Sie ist auf die Spurweite skaliert, daher handelt es sich um eine relative Zahl und nicht um eine Pixelangabe. |
| ... Stil                          | `fontNumbersStyle`, ...                                             | `normal`, `italic` oder `oblique` Die                                                                                      |
| ... Gewicht                       | `fontNumbersWeight`, ...                                            | `normal`, `bold`, `bolder`, `lighter` oder eine Zahl wie `600` Die                                                         |

## Linear - `tplCGlinearGauge`

![Linear](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/linear.png)

Das aufrechte Messgerät: eine Platte mit Rahmen, der Skala auf beiden Seiten und einem Balken, der bis zum angezeigten Wert gefüllt ist. Die Standardgröße beträgt 150 x 250 Pixel mit einem Eckenradius von 10 Pixeln – die Platte folgt diesem Radius, sodass das Messgerät die Form des Widgets beibehält.

Neben den oben genannten Einstellungen bietet es die Leiste:

| Einstellung       | Attribut         | Standard | Beschreibung                                                                                                                                             |
| ----------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beginne den Kreis | `barBeginCircle` |          | Durchmesser des runden Endes am unteren Ende des Stabes, in Prozent der Stabbreite. `0` ist ein gerader Balken; dies ist der Messkolben des Thermometers. |
| Breite            | `barWidth`       |          | Breite des Balkens in Prozent der Plattenbreite.                                                                                                         |
| Länge             | `barLength`      |          | Länge des Balkens in Prozent der Platte.                                                                                                                 |
| Strichbreite      | `barStrokeWidth` |          | Breite der Linie um den Balken.                                                                                                                          |
| Schatten          | `barShadow`      | 0        | Breite des Schattens, den der Balken wirft, in Pixeln. Seine Farbe ist `colorBarShadow` Die                                                               |
| Fortschritt       | `barProgress`    | An       | Füllt den Balken bis zum angezeigten Wert. Im ausgeschalteten Zustand bleibt der Balken leer und nur der Zeiger bewegt sich.                             |

und wo die Waage positioniert ist:

| Einstellung        | Attribut          | Standard | Beschreibung                                                                             |
| ------------------ | ----------------- | -------- | ---------------------------------------------------------------------------------------- |
| Ticks Seite        | `tickSide`        | `both`   | Auf welcher Seite des Balkens die Striche gezeichnet sind: `both`, `left` oder `right` Die |
| Nadels Seite       | `needleSide`      | `both`   | Gleiches gilt für die Nadel.                                                             |
| Seite der Nummer   | `numberSide`      | `both`   | Gleiches gilt für die Kontrollkästchen.                                                  |
| Breite             | `ticksWidth`      |          | Länge der Hauptstriche in Prozent.                                                       |
| Breite geringfügig | `ticksWidthMinor` |          | Länge der kleineren Zecken.                                                              |
| Polsterung         | `ticksPadding`    |          | Abstand zwischen den Markierungen und dem Balken.                                        |

Standardeinstellungen dieses Widgets: _Kleine Teilstriche_ 5, _Rahmen_ ein, _Fortschrittsanzeige_ ein.

## Radial - `tplCGradialGauge`

![Radial](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/radial.png)

Das runde Instrument: eine Skala über 270 Grad, die unten links beginnt, drei Ringe um die Platte und ein Zeiger in Pfeilform. Die Standardgröße beträgt 200 x 200 mm.

| Einstellung   | Attribut            | Standard | Beschreibung                                                                              |
| ------------- | ------------------- | -------- | ----------------------------------------------------------------------------------------- |
| Ticks Winkel  | `ticksAngle`        | 270      | Wie weit sich die Skala um den Teller erstreckt, in Grad. `360` ist der Kreis geschlossen. |
| Startwinkel   | `startAngle`        | 45       | Wo die Skala beginnt, in Grad vom unteren Ende.                                           |
| Kreisgröße    | `needleCircleSize`  |          | Größe des Kreises in der Mitte, um den sich die Nadel dreht, in Prozent.                  |
| Innerer Kreis | `needleCircleInner` |          | Zeichnet den inneren Kreis.                                                               |
| Äußerer Kreis | `needleCircleOuter` |          | Zeichnet den äußeren Kreis.                                                               |

Standardeinstellungen dieses Widgets: 4 _kleine Teilstriche_ , _Nadel anzeigen_ , _Schatten_ ein, _Typ_ `arrow`, _Ränder_ mit allen vier Breiten bei 2.

## Kompass - `tplCGCompas`

![Kompass](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/compas.png)

Eine radiale Skala über den vollen Kreis, voreingestellt als Kompassrose: Die Skala reicht von 0 bis 360, die Hauptmarkierungen sind `N,NE,E,SE,S,SW,W,NW,N` Zwischen ihnen befinden sich 22 kleinere Striche, und die Nadel ist eine dünne Linie auf einer dunklen Platte.

Es hat genau die gleichen Einstellungen wie das [Radialinstrument](#radial---tplcgradialgauge) , nur mit anderen Standardwerten:

| Einstellung                          | Attribut                                                | Standard                                      |
| ------------------------------------ | ------------------------------------------------------- | --------------------------------------------- |
| Min. / Max.                          | `minValue` /`maxValue`                                  | 0 / 360                                       |
| Wichtige Zecken                      | `majorTicks`                                            | `N,NE,E,SE,S,SW,W,NW,N`                       |
| Kleinere Zecken / Schlaganfallzecken | `minorTicks`/`strokeTicks`                              | 22 / Aus                                      |
| Dauer                                | `animationDuration`                                     | 1000                                          |
| Platte                               | `colorPlate`                                            | `#222`                                        |
| Hauptzecken / Nebenzecken / Zahlen   | `colorMajorTicks` /`colorMinorTicks` /`colorNumbers`    | `#f5f5f5` /`#ddd` /`#ccc`                     |
| Nadel / Nadelspitze                  | `colorNeedle` /`colorNeedleEnd`                         | `rgba(240,128,128,1)` /`rgba(255,160,122,.9)` |
| äußere Grenze (+ Ende)               | `colorBorderOuter`, `colorBorderOuterEnd`              | `#ccc`                                        |
| Nadelschatten nach unten             | `colorNeedleShadowDown`                                 | `#222`                                        |
| Typ / Start / Ende / Breite          | `needleType` /`needleStart` /`needleEnd` /`needleWidth` | `line` / 75 / 99 / 3                          |
| Außenbreite                          | `borderOuterWidth`                                      | 10, die anderen drei 0                        |
| Ticks-Winkel / Startwinkel           | `ticksAngle` /`startAngle`                              | 360 / 180                                     |
| Nadelkreis außen                     | `colorNeedleCircleOuter`                                | `#ccc`                                        |
| Kreisgröße / Kreisaußendurchmesser   | `needleCircleSize` /`needleCircleOuter`                 | 15 / Rabatt                                   |

Für eine Windrichtung, die sich wie ein echter Kompass dreht, stellen Sie _das Animationsziel_ auf ein. `plate` Dann bleibt die Nadel stehen und die Rose dreht sich darunter.

## Wohnung - `tplCGflatGauge`

![Wohnung](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/flat.png)

Ein lineares Messgerät, das auf der Seite liegt und keinen Rand hat: eine weiße Platte, die Skala und der Zeiger über einem schmalen farbigen Balken. Die Standardgröße beträgt 360 x 100 mm.

Es verfügt über die Einstellungen des [Linear](#linear---tplcglineargauge) -Messgeräts mit weiteren Standardwerten:

| Einstellung                                 | Attribut                                | Standard                   |
| ------------------------------------------- | --------------------------------------- | -------------------------- |
| Kleinere Zecken / Schlaganfallzecken        | `minorTicks` /`strokeTicks`             | 10 / am                    |
| Platte                                      | `colorPlate`                            | `#fff`                     |
| Nadel / Nadelspitze                         | `colorNeedle` /`colorNeedleEnd`         | `red` /`rgba(255,0,0,0.7)` |
| Typ / Breite                                | `needleType` /`needleWidth`             | `line` / 3                 |
| Grenzen                                     | `borders`                               | Aus, alle vier Breiten 0   |
| Kreis beginnen / Breite                     | `barBeginCircle` /`barWidth`            | 0 / 5                      |
| Fortschrittsbalken                          | `colorBarProgress`                      | `#db9994`                  |
| Seite des Häkchens / der Nadel / der Nummer | `tickSide` /`needleSide` / `numberSide` | `left`                     |
| Breite / Breite kleiner                     | `ticksWidth` / `ticksWidthMinor`        | 50 / 15                    |

![Positionen](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/positions.png)

Die drei Seiten einstellen `both` Die Skala wird oberhalb und unterhalb des Balkens platziert.

## Fortschritt - `tplCGprogress`

![Fortschritt](../../../../../en/adapterref/iobroker.vis-canvas-gauges/docs/img/progress.png)

Der einfache Balken: ein linearer Messwertaufnehmer, reduziert auf die Schiene und den Bereich bis zum Messwert – ohne Platte, Ringe, Zeiger und sichtbare Skala. Diese Form repräsentiert eine Batterie, einen Tank, ein Feuchtigkeitsmessgerät oder eine sich füllende Scheibe. Um diese Form mit dem Linear-Widget zu erreichen, sind zahlreiche Einstellungen nötig, weshalb es eine eigene Voreinstellung gibt.

**Dieses Widget existiert nur in vis-2.** Es hat keine Vorlage im Widget-Set von vis-1, daher sieht eine Ansicht, die es verwendet, in vis (vis-1) leer aus.

Es bietet die Einstellungen des [Linear-](#linear---tplcglineargauge) Messgeräts mit folgenden Standardwerten:

| Einstellung                                       | Attribut                                                    | Standard                                                       |
| ------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Min. / Max.                                       | `minValue` /`maxValue`                                      | 0 / 100                                                        |
| Highlights Nummer                                 | `hCount`                                                    | 0 (aus)                                                        |
| Große Zecken / Kleine Zecken / Schlaganfallzecken | `majorTicks` /`minorTicks` /`strokeTicks`                   | 2 / 0 / aus                                                    |
| Platte                                            | `colorPlate`                                                | `rgba(0,0,0,0)` - transparent, die Sicht ist durchscheinend    |
| Zahlen                                            | `colorNumbers`                                              | `rgba(0,0,0,0)` - transparent, sodass die Skala unsichtbar ist |
| Nadel anzeigen                                    | `needle`                                                    | aus                                                            |
| Grenzen                                           | `borders`                                                   | Aus, alle vier Breiten 0                                       |
| Wertbox                                           | `valueBox`                                                  | aus                                                            |
| Kreis beginnen / Breite / Länge / Strichstärke    | `barBeginCircle` /`barWidth` /`barLength` /`barStrokeWidth` | 0 / 45 / 95 / 0                                                |
| Balken / Balkenfortschritt                        | `colorBar` /`colorBarProgress`                              | `#e0e0e0` /`#4b8bd6`                                           |
| Seite des Häkchens / der Nadel / der Nummer       | `tickSide` /`needleSide` / `numberSide`                     | `right`                                                        |
| Breite / Breite kleiner                           | `ticksWidth` /`ticksWidthMinor`                             | 0 / 0                                                          |

Die Leiste passt sich der Form des Widgets an: Breiter als hoch liegt sie, höher als breit steht sie. Die Standardgröße beträgt 300 x 60.

**Um die Skala wiederherzustellen,** sind zwei Einstellungen erforderlich: Geben Sie _den Zahlen_ wieder eine Farbe und stellen Sie _die Breite_ der Balkenmarkierungen auf einen Wert über 0 ein (das mittlere Bild verwendet …). `#888`, _Hauptstriche_ 6, _Nebenstriche_ 5, _Breite_ 12 und _Breite Nebenstriche_ 6).

**Das Wertfeld** wird nur angezeigt, wenn der Balken aufrecht steht – siehe den Hinweis unter [„Wertfeld“](#value-box) . Das dritte Bild zeigt es.

## Unterschiede zu vis-1

Die React-Widgets zeichnen mit derselben Bibliothek dieselben Anzeigen, sodass ein migriertes Projekt unverändert aussieht. Dabei wurden einige Fehler behoben:

- ** `Padding` Die Balkenmarkierungen funktionieren.** Das Widget „vis-1“ schrieb _„Padding_ into _Begin circle“_ , sodass die Einstellung das runde Ende des Balkens anstatt des Abstands der Markierungen verschob.
- ** `Value weight` Es funktioniert.** Das VIS-1-Widget schrieb _den Wert „Gewicht“_ in die Schriftart der Zahlen, wodurch die Schriftart der Skala durch das Wort ersetzt wurde. `bold` Die
- **Die Skala behält ihre letzte Beschriftung.** Bei _numerischen Hauptteilungen_ werden die Beschriftungen anhand der Anzahl der Abschnitte berechnet. Das Widget „vis-1“ addierte die Schritte wiederholt und entfernte die letzte Beschriftung, sobald die Summe den Maximalwert um einen Rundungsfehler überschritt, z. B. bei einem Bereich von 0 bis 0,3 und 4 Beschriftungen.
- **Ein Zustand, der beim Öffnen der Ansicht leer ist, wird dennoch erreicht.** Das Widget „vis-1“ abonnierte den Zustand nur, wenn dieser bereits einen Wert enthielt. Daher blieb ein Messwert auf einem neu gestarteten Adapter so lange auf seinem Minimalwert, bis die Ansicht neu geladen wurde.
- **Der Nadeltyp des Radialmessgeräts ist `arrow` Sein** Standardwert für vis-1 war das Wort `select`, der Name des Feldtyps, der sich in die Standardeinstellung eingeschlichen hatte. Die Bibliothek hat trotzdem einen Pfeil dafür gezeichnet, sodass sich in der Ansicht nichts ändert.
- _„Major ticks“_ ist jetzt in allen Widgets ein Textfeld. In Vis-1 war es ein Schieberegler, außer im Kompass, sodass nur dort eine Liste von Beschriftungen eingegeben werden konnte.
- _Die kleineren Teilstriche_ gehen bis 50 statt 20 - der Kompass hat standardmäßig 22, was mit dem Schieberegler nicht erreicht werden kann.

Außerdem wurden einige Bibliothekseinstellungen hinzugefügt, die im Attributsatz „vis-1“ nicht enthalten waren: _Abschnittsbreite_ und _Abschnittsenden_ der Hervorhebungen, _Exakte Teilstriche_ , _Nummernrand_ , _Strichstärke der Teilstriche_ , _Breite_ des Wertfelds und _Schatten_ / _Balkenschatten_ . Alle diese Einstellungen sind optional und haben erst dann eine Auswirkung, wenn sie ausgefüllt werden.