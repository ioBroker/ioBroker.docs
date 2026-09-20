---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-gauges/README.md":{"title":{"en":"Gauge widgets for ioBroker.vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/README.md"},"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md":{"title":{"en":"Gauges for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md
title: Messgeräte für Vis-2
hash: 8u/EiZ68Nep8u0YkheHDIm0PetgX+4oTUmGOE7buOX0=
---
# Messgeräte für Vis-2

Zehn Widgets, die einen Wert als Messinstrument darstellen: ein farbiger Halbkreis mit Nadel, ein mit Flüssigkeit gefüllter Kreis, eine Batterie, ein rundes Instrument, ein moderner Bogen, ein Balken, ein Thermometer, ein Kompass, ein Tank und konzentrische Ringe.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen](#requirements)
  - [Projekte ab Version 2.0](#projects-from-version-20)
  - [Einstellungen, die von allen Widgets gemeinsam genutzt werden](#settings-shared-by-all-widgets)
  - [Farben und Pegel](#colors-and-levels)
  - [Animation](#animation)
  - [Dunkles Thema](#dark-theme)
- [Farbskala](#color-gauge---tplgauge2color)
- [Wasserstandsanzeiger](#water-gauge---tplgauge2water)
- [Batterieanzeige](#battery-gauge---tplgauge2battery)
- [Radiallehre](#radial-gauge---tplgauge2radial)
- [Lichtbogenmessgerät](#arc-gauge---tplgauge2arc)
- [Lineare Messlehre](#linear-gauge---tplgauge2linear)
- [Thermometer](#thermometer---tplgauge2thermometer)
- [Kompass](#compass---tplgauge2compass)
- [Tank](#tank---tplgauge2tank)
- [Ringe](#rings---tplgauge2rings)

## Allgemein

### Anforderungen

Die Widgets befinden sich im Widget-Set **„Anzeigen“** des vis-2-Editors. Sie benötigen den Adapter vis-2; vis (vis-1) kann sie nicht anzeigen.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren. **„Standard“** ist der Wert, den ein Widget verwendet, wenn das Feld leer ist; bei einem neuen Widget füllt der Editor die Standardeinstellungen, die mit _„(neues Widget)“_ gekennzeichnet sind, bereits automatisch aus.

### Projekte ab Version 2.0

Version 2.0 nutzte die Bibliotheken react-gauge-chart, react-liquid-gauge und react-battery-gauge (alle basierend auf d3), um Farbe, Wasserstand und Akkustand anzuzeigen. Diese Bibliotheken sind nicht mehr vorhanden; die Widgets sind jetzt reine SVG-Grafiken – kleiner, schneller und kompatibel mit der React-Version von vis-2. Die Widget-IDs und alle Attributnamen blieben unverändert, sodass bestehende Projekte ihre Einstellungen beibehalten. Einige Dinge sehen anders aus:

- **Farbanzeige** : Der Wert wird unterhalb der Nadelachse anstatt dahinter angezeigt. Minimum und Maximum können an den Skalenenden angezeigt werden. _Die Nadellänge_ ist nun anpassbar. Ein Eckradius, ein Bogenabstand oder ein Rand von `0` ist jetzt wirklich 0 - vorher `0` bedeutete die Standardeinstellung.
- **Farbanzeige** : Eine leere _Einheit_ zeigt keine Einheit an. Nur ein Widget, dessen Einheit nie festgelegt wurde, zeigt sie an. `%`, wie zuvor.
- **Wasserstandsanzeige** : Der Wert wurde zuvor mit allen Ziffern angezeigt; jetzt werden maximal zwei oder so viele angezeigt, wie unter _„Ziffern nach dem Komma“_ eingestellt sind. Während der Anstiegsanimation zählt die Zahl mit dem Flüssigkeitsstand hoch.
- **Akkuanzeige** : Bei einem vertikalen Akku bleibt der Text horizontal, die Ladeanzeige steht aufrecht.
- Ein Wert, der keine Zahl ist (z. B. `offline`) wird als Text angezeigt; ein Zustand ohne Wert zeigt `–` Die

### Einstellungen, die von allen Widgets gemeinsam genutzt werden

| Einstellung               | Attribut           | Standard | Beschreibung                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ohne Karte                | `noCard`           | aus      | Zeichnet das Messinstrument direkt in die Ansicht ein. Ohne diese Funktion wird das Messinstrument wie die anderen Vis-2-Widgets in einer Karte angezeigt.                                                                                                                              |
| Titel                     | `widgetTitle`      |          | Titel der Karte.                                                                                                                                                                                                                                                                        |
| Objekt-ID                 | `oid`              |          | Der anzuzeigende Zustand. Durch Auswahl eines Objekts werden dessen Einheit und, falls vom Objekt definiert, dessen Minimal- und Maximalwert übernommen. Anstelle einer ID kann das Feld auch eine Konstante annehmen: Eine Zahl wird als Wert, ein Wort ohne Punkt als Text angezeigt. |
| Minimalwert / Maximalwert | `min` /`max`       | 0 / 100  | Wertebereich der Skala. Werte außerhalb des Bereichs enden an dessen Ende.                                                                                                                                                                                                              |
| Einheit                   | `unit`             |          | Wird nach dem Wert angezeigt.                                                                                                                                                                                                                                                           |
| Ziffern nach dem Komma    | `digitsAfterComma` |          | Leer: so viele wie nötig, höchstens zwei. Das Dezimaltrennzeichen richtet sich nach den Systemeinstellungen von ioBroker.                                                                                                                                                               |

Die Textfarbe des Stils eines Widgets (`color`) wird als Wert verwendet, wenn das Widget keine eigene Textfarbe hat.

### Farben und Pegel

Die meisten Messinstrumente stellen ihre Skala oder ihren Wert anhand von **Stufen** farblich dar. Alle Widgets beschreiben die Stufen auf die gleiche Weise:

| Einstellung       | Attribut                                   | Beschreibung                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzahl der Ebenen | `levelsCount`                              | Anzahl der Ebenen. Jeder Ebene ist eine Gruppe zugeordnet _: Ebene 1_ , _Ebene 2_ , ...                                                                                                                           |
| Farbe             | `color1`... `colorN`                       | Farbe des Levels. Falls nicht jedem Level eine Farbe zugewiesen ist, verläuft die Farbreihe von der ersten bis zur letzten festgelegten Farbe; ohne dabei eine Farbabfolge von Grün über Gelb zu Rot einzuhalten. |
| Schwellenwert     | `levelThreshold1`... `levelThreshold(N-1)` | Absolutwert am Ende dieser Ebene. Die letzte Ebene endet immer beim Maximum. Ein leerer Schwellenwert teilt den restlichen Skalenbereich gleichmäßig auf.                                                         |

Der Bogen, die Längenanzeige, das Thermometer und der Tank verfügen außerdem über eine **Farbgebung** (`colorMode`):

| Wert                               | Beschreibung                                                    |
| ---------------------------------- | --------------------------------------------------------------- |
| Eine Farbe (`fixed`)              | Der Wert wird immer in _Farbe_ dargestellt (`valueColor`).     |
| Farbe des Niveaus (`levels`)      | Der Wert erhält die Farbe der Ebene, auf der er sich befindet.  |
| Gradient der Niveaus (`gradient`) | Die Farben der einzelnen Ebenen gehen fließend ineinander über. |

![Level](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/levels.png)

Beispiel: CO₂ von 400 bis 2000 ppm mit vier Stufen (`levelThreshold1` = 800, `levelThreshold2` = 1000, `levelThreshold3` = 1400) im Bogenmaß mit jeder Färbung, in Segmenten und als Farbbänder des Radialmaßes.

### Animation

Die neuen Widgets bewegen sich reibungslos zu einem neuen Wert:

| Einstellung              | Attribut          | Standard             | Beschreibung                                                                                                                                                                             |
| ------------------------ | ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animieren                | `animate`         | auf _(neues Widget)_ | Ohne sie steigt der Wert sprunghaft an.                                                                                                                                                  |
| Animationsdauer          | `animateDuration` | hängt vom Widget ab  | Dauer in ms.                                                                                                                                                                             |
| Animationsbeschleunigung | `animationEasing` | hängt vom Widget ab  | Verlauf der Bewegung: `linear`, `quadIn`, `cubicOut`, `backOut` (schießt ein wenig über das Ziel hinaus), `elasticOut` (Schwingungen), `bounceOut` (Bounces), ... - die Lockerungen von d3. |

### Dunkles Thema

Im dunklen Design von vis-2 passen sich alle nicht festgelegten Farben dem Design an: Text, Skalen, die leere Spur eines Bogens, die Skala des Radialmessers und der Kompass. Festgelegte Farben bleiben unverändert.

![Dunkles Thema](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/dark-theme.png)

## Farbskala -`tplGauge2Color`

Ein Halbkreis aus farbigen Segmenten mit einer Nadel.

![Farbskala](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/color.png)

| Einstellung                  | Attribut           | Standard             | Beschreibung                                                                                                                         |
| ---------------------------- | ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Anzahl der Ebenen            | `levelsCount`      | 3                    | Anzahl der farbigen Segmente, siehe [Farben und Stufen](#colors-and-levels) . Ohne Farben verlaufen sie von Grün über Gelb nach Rot. |
| Ziffern nach dem Komma       | `digitsAfterComma` | 2 _(neues Widget)_   |                                                                                                                                      |
| Einheit                      | `unit`             | `%` nie eingestellt  |                                                                                                                                      |
| Nadelfarbe                   | `needleColor`      | Textfarbe            |                                                                                                                                      |
| Farbe der Nadelbasis         | `needleBaseColor`  | Textfarbe            |                                                                                                                                      |
| Nadellänge                   | `needleScale`      | 0.55                 | Länge als Teil des Radius.                                                                                                           |
| Marge                        | `marginInPercent`  | 0.05                 | Der Freiraum um das Messinstrument herum wird als Teil der Widget-Größe betrachtet.                                                  |
| Eckradius                    | `cornerRadius`     | 6                    | Rundung der Segmente in Pixeln.                                                                                                      |
| Bogenpolsterung              | `arcPadding`       | 0.05                 | Abstand zwischen den Segmenten, in Radiant.                                                                                          |
| Bogenbreite                  | `arcWidth`         | 0.2                  | Dicke des Bogens als Teil des Radius.                                                                                                |
| Wert ausblenden              | `hideText`         | aus                  |                                                                                                                                      |
| Textfarbe                    | `textColor`        | Textfarbe            | Farbe des Wertes.                                                                                                                    |
| Minimum und Maximum anzeigen | `showMinMax`       | auf _(neues Widget)_ | Minimum und Maximum an den Enden des Bogens.                                                                                         |
| Animieren                    | `animate`          | auf _(neues Widget)_ | Die Nadel schlägt auf den neuen Wert aus.                                                                                            |
| Animationsverzögerung        | `animDelay`        | 500                  | Warten Sie in Millisekunden, bevor sich die Nadel bewegt.                                                                            |
| Animationsdauer              | `animateDuration`  | 3000                 | Dauer in ms.                                                                                                                         |

## Wasserstandsanzeiger -`tplGauge2Water`

Ein Kreis, der sich mit einer wellenförmigen Flüssigkeit füllt.

![Wasserstandsanzeiger](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/water.png)

| Einstellung                     | Attribut                     | Standard             | Beschreibung                                                                                                                                         |
| ------------------------------- | ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Größe                           | `size`                       |                      | Durchmesser in Pixel. Leer: passt in das Widget.                                                                                                     |
| Ziffern nach dem Komma          | `digitsAfterComma`           |                      | Leer: höchstens zwei.                                                                                                                                |
| Textgröße                       | `textSize`                   | 1                    | Relative Größe des Wertes; 1 entspricht der Hälfte des Radius. Die Einheit beträgt 60 % davon.                                                       |
| Textversatz x / y               | `textOffsetX` /`textOffsetY` | 0 / Durchmesser ÷ 15 | Verschiebt den Wert in Pixeln.                                                                                                                       |
| Aufstiegsanimation              | `riseAnimation`              | auf _(neues Widget)_ | Der Flüssigkeitsstand steigt bis zum neuen Pegel; die Zahl zählt weiter.                                                                             |
| Animationszeit des Aufstiegs    | `riseAnimationTime`          | 2000                 | In Frau                                                                                                                                              |
| Animationsverlauf beschleunigen | `riseAnimationEasing`        | `cubicInOut`         | Siehe [Animation](#animation) .                                                                                                                      |
| Wellenanimation                 | `waveAnimation`              | auf _(neues Widget)_ | Die Wellen bewegen sich.                                                                                                                             |
| Zeit für Wellenanimation        | `waveAnimationTime`          | 2000                 | Zeit in Millisekunden für eine vollständige Welle.                                                                                                   |
| Wellenanimations-Easing         | `waveAnimationEasing`        | `linear`             |                                                                                                                                                      |
| Wellenfrequenz                  | `waveFrequency`              | 2                    | Anzahl der Wellen über den Kreis.                                                                                                                    |
| Wellenamplitude                 | `waveAmplitude`              | 1                    | Die Wellenhöhe wird in Prozent der Füllhöhe angegeben. Die Wellen sind bei 50 % Füllstand am höchsten und flach, wenn das System leer oder voll ist. |
| Innenradius / Außenradius       | `innerRadius` /`outerRadius` | 0.9 / 1              | Der Ring um die Flüssigkeit herum, als Teil des Radius.                                                                                              |
| Marge                           | `margin`                     | 0.025                | Spalt zwischen dem Ring und der Flüssigkeit.                                                                                                         |
| Textfarbe                       | `textColor`                  | Textfarbe            | Wert über der Flüssigkeit.                                                                                                                           |
| Textfarbe in der Flüssigkeit    | `textWaveColor`              | Weiß                 | Der Teil des Wertes, den die Flüssigkeit abdeckt.                                                                                                    |
| Kreisfarbe                      | `circleColor`                | Blau                 | Farbe des Rings.                                                                                                                                     |
| Flüssigfarbe                    | `waveColor`                  | Blau                 | Farbe der Flüssigkeit, wenn kein Farbverlauf verwendet wird.                                                                                         |
| Gradient                        | `gradient`                   | aus                  | Füllt die Flüssigkeit mit einem vertikalen Gradienten.                                                                                               |
| Anzahl der Ebenen               | `levelsCount`                |                      | Anzahl der Gradientenstopps.                                                                                                                         |

Jeder Gradientenstopp ( _Gruppenebene_ ):

| Einstellung                    | Attribut              | Beschreibung                                                                                           |
| ------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------ |
| Farbe des Farbverlaufsstopps   | `stopColor1`...      |                                                                                                        |
| Deckkraft des Gradientenstopps | `stopOpacity1`...    | 0 bedeutet transparent, 1 bedeutet undurchsichtig (Standardwert).                                      |
| Schwellenwert                  | `levelThreshold2`... | Position des Anschlags als Absolutwert. Der erste Anschlag befindet sich immer unten, der letzte oben. |

## Batterieanzeige -`tplGauge2Battery`

Eine Batterie mit ihrem Ladezustand. Alle Längenangaben beziehen sich auf Einheiten der Zeichnung, die 100 Einheiten breit ist. Für einige dieser Einstellungen `0` Gilt als nicht festgelegt.

![Batterieanzeige](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/battery.png)

| Einstellung      | Attribut       | Standard   | Beschreibung                                                                     |
| ---------------- | -------------- | ---------- | -------------------------------------------------------------------------------- |
| Ladeobjekt-ID    | `charging-oid` |            | Während dieser Zustand `true` Die Batterie blinkt und lädt sich immer wieder auf. |
| Orientierung     | `orientation`  | horizontal | `vertical` Die Batterie wird gedreht; der Text bleibt horizontal.                |
| Polsterung       | `padding`      | 0          | Platz um die Batterie herum.                                                     |
| Größe            | `size`         |            | Länge der Batterie in Pixeln. Leer: passt in das Widget.                         |
| Seitenverhältnis | `aspectRatio`  | 0.52       | Höhe als Anteil der Länge: D = 0,56, C = 0,52, AA = 0,28, AAA = 0,23.            |
| animiert         | `animated`     | aus        | Die Ladung steigt von 0 an, sobald das Widget erscheint.                         |

Der Text zeigt die Ladung in Prozent des Bereichs _Minimum_ ... _Maximum an_ .

**Batteriegehäuse** , **Batteriepol**

| Einstellung              | Attribut                                            | Standard  |
| ------------------------ | --------------------------------------------------- | --------- |
| Eckradius                | `batteryBodyCornerRadius` /`batteryCapCornerRadius` | 6 / 2     |
| Füllen                   | `batteryBodyFill` /`batteryCapFill`                 | keiner    |
| Strichfarbe              | `batteryBodyStrokeColor` /`batteryCapStrokeColor`   | Textfarbe |
| Strichbreite             | `batteryBodyStrokeWidth` /`batteryCapStrokeWidth`   | 4 / 4     |
| Verhältnis Pol zu Körper | `batteryCapCapToBodyRatio`                          | 0.4       |

**Batterieanzeige**

| Einstellung                               | Attribut                         | Standard | Beschreibung                                                                                   |
| ----------------------------------------- | -------------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| Füllen                                    | `batteryMeterFill`               | Grün     |                                                                                                |
| Niedriger Batteriestand                   | `batteryMeterLowBatteryValue`    | 15 %     | In der Werteinheit. Darunter wechseln der Zähler und der Text zu dunklen Farben.               |
| Füllen Sie bei niedrigem Wasserstand auf. | `batteryMeterLowBatteryFill`     | Rot      |                                                                                                |
| Mittlere Batterie unten                   | `batteryMeterMediumBatteryValue` |          | Optionale dritte Stufe zwischen _niedrig_ und _voll_ .                                         |
| Füllen Sie die mittlere Stufe.            | `batteryMeterMediumBatteryFill`  | orange   |                                                                                                |
| Innerer Spalt                             | `batteryMeterOuterGap`           | 1        | Abstand zwischen Gehäuse und Messgerät.                                                        |
| Anzahl der Zellen                         | `batteryMeterNoOfCells`          | 1        | Bei mehr als 1 werden einzelne Zellen gezeichnet; es werden nur vollständige Zellen angezeigt. |
| Lücke zwischen den Zellen                 | `batteryMeterInterCellsGap`      | 1        |                                                                                                |

**Text**

| Einstellung                       | Attribut                        | Standard  | Beschreibung            |
| --------------------------------- | ------------------------------- | --------- | ----------------------- |
| Textfarbe im leeren Bereich       | `readingTextLightContrastColor` | Textfarbe |                         |
| Textfarbe im ausgefüllten Bereich | `readingTextDarkContrastColor`  | Weiß      |                         |
| Textfarbe bei niedriger           | `readingTextLowBatteryColor`    | Rot       |                         |
| Schriftfamilie                    | `readingTextFontFamily`         | Helvetica |                         |
| Schriftgröße                      | `readingTextFontSize`           | 14        | 0 blendet den Text aus. |
| Prozentzeichen anzeigen           | `readingTextShowPercentage`     | An        |                         |

**Ladeblitz** (nur mit einer Ladeobjekt-ID)

| Einstellung     | Attribut                         | Standard | Beschreibung       |
| --------------- | -------------------------------- | -------- | ------------------ |
| Skala           | `chargingFlashScale`             | 1        | Größe des Blitzes. |
| Füllen          | `chargingFlashFill`              | orange   |                    |
| animiert        | `chargingFlashAnimated`          | An       | Der Blitz blinkt.  |
| Animationsdauer | `chargingFlashAnimationDuration` | 1000     | In Frau            |

## Radialmessgerät -`tplGauge2Radial`

Das klassische runde Instrument mit Skala, Farbringen und Nadel – für Kraft, Geschwindigkeit, Druck und Temperatur.

![Radiallehre](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/radial.png)

| Einstellung                      | Attribut                                        | Standard           | Beschreibung                                                                                                                                                     |
| -------------------------------- | ----------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Winkel der Skala                 | `angle`                                         | 270                | Wie weit reicht die Skala ungefähr? 180 Grad entsprechen einem Halbkreis, 360 Grad einem vollen Kreis.                                                           |
| Drehung                          | `rotate`                                        | 0                  | Die Skala wird im Uhrzeigersinn gedreht; 0 ist symmetrisch zum oberen Wert.                                                                                      |
| Hauptabteilungen                 | `majorTicks`                                    | 10                 | Anzahl der Abschnitte zwischen den markierten Markierungen.                                                                                                      |
| Kleinere Divisionen              | `minorTicks`                                    | 5                  | Kleine Schritte innerhalb einer großen Abteilung.                                                                                                                |
| Etiketten anzeigen               | `showLabels`                                    | An                 | Zahlen an den wichtigsten Ticks.                                                                                                                                 |
| Skalenfarbe                      | `scaleColor`                                    | Textfarbe          | Striche und Zahlen.                                                                                                                                              |
| Beschriftung auf dem Zifferblatt | `label`                                         |                    | Kurzer Text in der oberen Hälfte, z. B. `Power` Die                                                                                                               |
| Zifferblattfarbe                 | `dialColor`                                     | weiß / dunkel      | Ohne Lünette hat das Zifferblatt keinen Hintergrund, es sei denn, eine Farbe ist eingestellt.                                                                    |
| Lünette                          | `bezel`                                         | Metall             | `none`, `thin` (eine Linie in _der Farbe der Lünette_ ) oder `metal` Ohne Lünette ist nur die Skala in das Bauteil eingelassen, sodass ein Halbkreis es ausfüllt. |
| Nadel                            | `needleType`                                    | Pfeil              | `arrow`, `line` oder `triangle` Die                                                                                                                               |
| Nadelfarbe                       | `needleColor`                                   | Rot                |                                                                                                                                                                  |
| Nabenfarbe                       | `hubColor`                                      | Dunkelgrau         |                                                                                                                                                                  |
| Wert anzeigen                    | `showValue`                                     | An                 | Wert und Einheit im unteren Teil des Zifferblatts.                                                                                                               |
| Textfarbe                        | `textColor`                                     | Textfarbe          |                                                                                                                                                                  |
| Anzahl der Ebenen                | `levelsCount`                                   | 3                  | Farbbänder entlang der Skala, siehe [Farben und Stufen](#colors-and-levels) . 0 bedeutet, dass nichts gezeichnet wird.                                           |
| Breite des Farbbandes            | `bandWidth`                                     | 0.06               | Als Teil des Radius.                                                                                                                                             |
| Animation                        | `animate`, `animateDuration`, `animationEasing` | an, 1000, `backOut` | Die Nadel schießt ein wenig über den Anschlag hinaus, wie bei einem echten Instrument.                                                                           |

## Lichtbogenmessgerät -`tplGauge2Arc`

Ein moderner Bogen mit dem Wert in der Mitte. Er kann wie LEDs in Segmente unterteilt werden und eine Markierung für einen Zielwert, z. B. einen Sollwert, anzeigen.

![Lichtbogenmessgerät](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/arc.png)

| Einstellung                  | Attribut                                        | Standard          | Beschreibung                                                                                                                                |
| ---------------------------- | ----------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Winkel der Skala             | `angle`                                         | 240               | 180 Grad entsprechen einem Halbkreis, 360 Grad einem vollen Ring.                                                                           |
| Drehung                      | `rotate`                                        | 0                 |                                                                                                                                             |
| Bogenbreite                  | `arcWidth`                                      | 0.16              | Dicke als Teil des Radius.                                                                                                                  |
| Abgerundete Enden            | `roundedCaps`                                   | An                |                                                                                                                                             |
| Spurfarbe                    | `trackColor`                                    | hellgrau          | Der leere Teil des Bogens.                                                                                                                  |
| Segmente                     | `segments`                                      | 0                 | 0: ein durchgehender Bogen. Mehr: so viele Segmente; jedes beleuchtete Segment erhält die Farbe seines jeweiligen Platzes auf der Skala.    |
| Lücke zwischen den Segmenten | `segmentGap`                                    | 2                 | In Grad.                                                                                                                                    |
| Beginnen wir bei Null.       | `fromZero`                                      | aus               | Wenn der Skalenwert unter Null sinkt, beginnt der Bogen bei 0 und wächst zu beiden Seiten hin an – z. B. für die Leistung am Netzanschluss. |
| Färbung                      | `colorMode`                                     | Farbe des Niveaus | Siehe [Farben und Stufen](#colors-and-levels) .                                                                                             |
| Farbe                        | `valueColor`                                    | Blau              | Für _eine Farbe_ .                                                                                                                          |
| Anzahl der Ebenen            | `levelsCount`                                   | 3                 |                                                                                                                                             |
| Wert anzeigen                | `showValue`                                     | An                |                                                                                                                                             |
| Textfarbe                    | `textColor`                                     | Textfarbe         |                                                                                                                                             |
| Größe des Wertes             | `valueSize`                                     | 0.36              | Schriftgröße als Teil des Radius; lange Texte werden verkleinert, um hineinzupassen.                                                        |
| Text unterhalb des Wertes    | `subText`                                       |                   | z.B `Bathroom` Die                                                                                                                           |
| Minimum und Maximum anzeigen | `showMinMax`                                    | An                | Unterhalb der Enden des Bogens.                                                                                                             |
| Zielwertobjekt-ID            | `targetOid`                                     |                   | Optional: eine Markierung an dieser Stelle.                                                                                                 |
| Markerfarbe                  | `targetColor`                                   | Textfarbe         |                                                                                                                                             |
| Animation                    | `animate`, `animateDuration`, `animationEasing` | auf 800 `cubicOut` |                                                                                                                                             |

## Lineares Messgerät -`tplGauge2Linear`

Ein horizontaler oder vertikaler Balken mit einer Skala.

![Lineare Messlehre](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/linear.png)

| Einstellung                         | Attribut                                        | Standard             | Beschreibung                                                                                                                              |
| ----------------------------------- | ----------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Orientierung                        | `orientation`                                   | horizontal           | `vertical` Das Minimum befindet sich ganz unten.                                                                                          |
| Anzeige                             | `displayMode`                                   | Bar                  | `bar`: ein gefüllter Balken. `pointer` Die Stufen werden auf der gesamten Skala angezeigt, und ein Dreieck zeigt auf den jeweiligen Wert. |
| Stabdicke                           | `barSize`                                       | 0.8                  | Als Teil des freien Platzes.                                                                                                              |
| Gerundet                            | `rounded`                                       | An                   | Runde Enden des Stabes.                                                                                                                   |
| Spurfarbe                           | `trackColor`                                    | hellgrau             | Der leere Teil der Bar.                                                                                                                   |
| Beginnen wir bei Null.              | `fromZero`                                      | aus                  | Siehe das Lichtbogenmessgerät.                                                                                                            |
| Maßstab anzeigen                    | `showScale`                                     | An                   | Unterhalb des Balkens, oder rechts davon, falls dieser vertikal ist.                                                                      |
| Hauptabteilungen / Nebenabteilungen | `majorTicks` /`minorTicks`                      | 5 / 4                |                                                                                                                                           |
| Skalenfarbe                         | `scaleColor`                                    | grau                 |                                                                                                                                           |
| Färbung                             | `colorMode`                                     | Gradient der Niveaus | Durch den Farbverlauf werden die Farben der Skala sichtbar.                                                                               |
| Farbe                               | `valueColor`                                    | Blau                 |                                                                                                                                           |
| Anzahl der Ebenen                   | `levelsCount`                                   | 3                    |                                                                                                                                           |
| Wert anzeigen                       | `showValue`                                     | An                   | Über der Leiste, rechts.                                                                                                                  |
| Textfarbe                           | `textColor`                                     | Textfarbe            | Auch die Farbe des Mauszeigers.                                                                                                           |
| Zielwertobjekt-ID                   | `targetOid`                                     |                      | Optional: ein Strich durch den Balken an dieser Stelle.                                                                                   |
| Markerfarbe                         | `targetColor`                                   | Textfarbe            |                                                                                                                                           |
| Animation                           | `animate`, `animateDuration`, `animationEasing` | auf 800 `cubicOut`    |                                                                                                                                           |

## Thermometer -`tplGauge2Thermometer`

Ein Glasthermometer mit Skala.

![Thermometer](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/thermometer.png)

| Einstellung                         | Attribut                                        | Standard              | Beschreibung                                                                                                                                    |
| ----------------------------------- | ----------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum / Maximum                   | `min` /`max`                                    | -20 / 40              |                                                                                                                                                 |
| Einheit                             | `unit`                                          | °C                    |                                                                                                                                                 |
| Ziffern nach dem Komma              | `digitsAfterComma`                              | 1                     |                                                                                                                                                 |
| Seite der Skala                     | `scaleSide`                                     | Rechts                | `left`, `right` oder `both` Die                                                                                                                  |
| Hauptabteilungen / Nebenabteilungen | `majorTicks` /`minorTicks`                      | 6 / 5                 | Bei -20 ... 40: eine Beschriftung alle 10°, ein Strich alle 2°.                                                                                 |
| Skalenfarbe                         | `scaleColor`                                    | grau                  |                                                                                                                                                 |
| Glasfarbe                           | `tubeColor`                                     | grau                  |                                                                                                                                                 |
| Färbung                             | `colorMode`                                     | Eine Farbe            | Bei der _Einstellung „Farbe des Niveaus“_ oder _„Farbverlauf“_ ändert die Spalte ihre Farbe mit der Temperatur (Standardniveaus: blau bis rot). |
| Farbe                               | `valueColor`                                    | Rot                   |                                                                                                                                                 |
| Wert anzeigen / Textfarbe           | `showValue` /`textColor`                        | an / Textfarbe        | Der Wert über dem Thermometer.                                                                                                                  |
| Animation                           | `animate`, `animateDuration`, `animationEasing` | an, 1000, `cubicInOut` |                                                                                                                                                 |

## Kompass -`tplGauge2Compass`

Eine Kompassrose zur Angabe einer Richtung, z. B. der Windrichtung oder der Fahrtrichtung eines Roboters, optional mit einer Geschwindigkeitsangabe in der Mitte.

![Kompass](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/compass.png)

| Einstellung                                      | Attribut                                        | Standard              | Beschreibung                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                                        | `oid`                                           |                       | Richtungsangabe in Grad: 0 ist Norden, 90 ist Osten.                                                                                           |
| Versetzt nach Norden                             | `offset`                                        | 0                     | Wird zum Wert addiert, z. B. wenn der Sensor nicht genau nach Norden zeigt.                                                                    |
| Zeige, wohin es führt                            | `invert`                                        | aus                   | Die Windrichtung gibt an, **aus** welcher Richtung der Wind kommt. Bei dieser Option zeigt die Nadel in die Richtung, aus der er weht (+180°). |
| Geschwindigkeitsobjekt-ID                        | `speedOid`                                      |                       | Optional: Wird in der Mitte angezeigt. Durch Auswahl wird die entsprechende Einheit übernommen.                                                |
| Einheit                                          | `speedUnit`                                     |                       |                                                                                                                                                |
| Ziffern nach dem Komma                           | `speedDigits`                                   | 1                     |                                                                                                                                                |
| Nadel                                            | `needleType`                                    | Pfeil                 | `arrow` zeigt in die Richtung `compass` ist eine zweifarbige Nadel, `wind` ist eine Markierung auf dem Ring, die auf die Mitte zeigt.            |
| Drehen Sie den Drehknopf                         | `rotateDial`                                    | aus                   | Das Zifferblatt dreht sich und eine feste Markierung oben zeigt die Richtung an, ähnlich wie ein Kompass im Auto.                              |
| Nadelfarbe                                       | `needleColor`                                   | Rot                   |                                                                                                                                                |
| Farbe des Nordens                                | `northColor`                                    | Rot                   |                                                                                                                                                |
| Zifferblattfarbe                                 | `dialColor`                                     | weiß / dunkel         |                                                                                                                                                |
| Skalenfarbe                                      | `scaleColor`                                    | Textfarbe             |                                                                                                                                                |
| Zeige Nordosten, Südosten, Südwesten, Nordwesten | `showIntercardinal`                             | An                    |                                                                                                                                                |
| Abschlüsse anzeigen                              | `showDegrees`                                   | An                    | 30, 60, 120, ...                                                                                                                               |
| Lünette                                          | `bezel`                                         | Dünne Linie           | `none`, `thin` oder `metal` Die                                                                                                                 |
| Wert anzeigen                                    | `showValue`                                     | An                    |                                                                                                                                                |
| Zeigen                                           | `valueFormat`                                   | Richtung und Grad     | `both` (`SW 225°`), `direction` (`SW`) oder `degrees` (`225°` Bei einer bestimmten Geschwindigkeit entspricht dies der Linie darunter.         |
| Textfarbe                                        | `textColor`                                     | Textfarbe             |                                                                                                                                                |
| Animation                                        | `animate`, `animateDuration`, `animationEasing` | an, 1000, `cubicInOut` | Immer den kürzesten Weg: von 350° nach 10° durch Norden.                                                                                       |

Die Namen der Himmelsrichtungen orientieren sich an der Sprache von vis-2 (z. B. N, NO, O, SO, S, SW, W, NW auf Deutsch).

## Panzer -`tplGauge2Tank`

Der Füllstand eines Tanks, einer Zisterne oder eines Pelletlagers.

![Tank](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/tank.png)

| Einstellung                                    | Attribut                                        | Standard              | Beschreibung                                                                                                                   |
| ---------------------------------------------- | ----------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Ziffern nach dem Komma                         | `digitsAfterComma`                              | 0                     |                                                                                                                                |
| Form                                           | `shape`                                         | Stehender Zylinder    | `cylinder`, `rect` (Rechteck) oder `horizontal` (liegender Tank, z. B. für Heizöl). Die Füllhöhe ist proportional zum Füllwert. |
| Tankfarbe                                      | `tankColor`                                     | grau                  | Umriss des Panzers.                                                                                                            |
| Wellenanimation                                | `waveAnimation`                                 | An                    | Eine sich langsam bewegende Oberfläche; nur ein Rechteck und ein liegender Tank.                                               |
| Tonleiter anzeigen / Dur / Moll Unterteilungen | `showScale` /`majorTicks` /`minorTicks`         | am / 4 / 5            | Rechts vom Panzer.                                                                                                             |
| Skalenfarbe                                    | `scaleColor`                                    | grau                  |                                                                                                                                |
| Färbung                                        | `colorMode`                                     | Eine Farbe            | Mit verschiedenen Füllständen, z. B. rot, wenn der Tank fast leer ist (Standardfüllstände: rot bis grün).                      |
| Farbe                                          | `valueColor`                                    | Blau                  |                                                                                                                                |
| Wert anzeigen                                  | `showValue`                                     | An                    | In der Mitte des Tanks.                                                                                                        |
| Prozent anzeigen                               | `showPercent`                                   | aus                   | Der Füllstand in Prozent unterhalb des Wertes.                                                                                 |
| Textfarbe                                      | `textColor`                                     | Textfarbe             |                                                                                                                                |
| Animation                                      | `animate`, `animateDuration`, `animationEasing` | am, 1200, `cubicInOut` |                                                                                                                                |

## Ringe -`tplGauge2Rings`

Bis zu fünf Werte als konzentrische Ringe - z. B. PV-Leistung, Hausverbrauch und Batterieladung.

![Ringe](../../../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/rings.png)

| Einstellung                 | Attribut       | Standard       | Beschreibung                                                                                                                                                                                                                                                    |
| --------------------------- | -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzahl der Ringe            | `ringsCount`   | 3              | 1 bis 5.                                                                                                                                                                                                                                                        |
| Winkel der Skala            | `angle`        | 270            |                                                                                                                                                                                                                                                                 |
| Drehung                     | `rotate`       | 135            | Bei 270° und 135 beginnen die Ringe oben und lassen das obere linke Viertel frei.                                                                                                                                                                               |
| Ringbreite                  | `ringWidth`    | 0.14           | Breite eines Rings als Teil des Radius.                                                                                                                                                                                                                         |
| Abstand zwischen den Ringen | `ringGap`      | 0.04           |                                                                                                                                                                                                                                                                 |
| Abgerundete Enden           | `roundedCaps`  | An             |                                                                                                                                                                                                                                                                 |
| Transparenz der Spur        | `trackOpacity` | 0.18           | Der leere Teil eines Rings wird in seiner Farbe mit dieser Deckkraft gezeichnet.                                                                                                                                                                                |
| Legende                     | `legend`       | Im Freiviertel | `gap`: rechtsbündig vor dem Beginn jedes Rings - benötigt Ringe, die oben beginnen und einen Bogen von höchstens 300° haben, andernfalls wird die Legende neben die Ringe gestellt. `side`: neben den Ringen oder darunter in einem schmalen Widget. `none` Die |
| Text in der Mitte           | `centerText`   |                |                                                                                                                                                                                                                                                                 |
| Textfarbe                   | `textColor`    | Textfarbe      |                                                                                                                                                                                                                                                                 |

Jeder Ring (Gruppe _Ring 1_ , _Ring 2_ , ...):

| Einstellung            | Attribut           | Standard                         | Beschreibung |
| ---------------------- | ------------------ | -------------------------------- | ------------ |
| Objekt-ID              | `oid1`...         |                                  |              |
| Etikett                | `label1`...       |                                  |              |
| Minimum / Maximum      | `min1` /`max1`... | 0 / 100                          |              |
| Einheit                | `unit1`...        |                                  |              |
| Ziffern nach dem Komma | `digits1`...      |                                  |              |
| Farbe                  | `color1`...       | rot, grün, blau, orange, violett |              |