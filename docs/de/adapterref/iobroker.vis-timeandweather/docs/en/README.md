---
chapters: {"pages":{"en/adapterref/iobroker.vis-timeandweather/README.md":{"title":{"en":"ioBroker.vis-timeandweather"},"content":"en/adapterref/iobroker.vis-timeandweather/README.md"},"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md":{"title":{"en":"Time and weather widgets for vis-2"},"content":"en/adapterref/iobroker.vis-timeandweather/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-timeandweather/docs/en/README.md
title: Zeit- und Wetter-Widgets für vis-2
hash: VMca8HcC1CK33fAhQE+s1XZbTpbwM3Bffed4BYdMxZI=
---
# Zeit- und Wetter-Widgets für vis-2

Die Zeit- und Wetter-Widgets umfassen sieben Widgets für Uhrzeit, Datum und Wetter. Diese Seite beschreibt die Version **vis-2** . vis (vis-1) bietet dieselben Widgets mit denselben Einstellungen, allerdings mit leicht abweichender Darstellung.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen und Migration](#requirements-and-migration)
  - [Sprache](#language)
  - [Eigenes CSS](#own-css)
  - [Dunkles Thema](#dark-theme)
- [SimpleClock](#simpleclock---tpltwsimpleclock)
- [SimpleDate](#simpledate---tpltwsimpledate)
- [CoolClock](#coolclock---tpltwcoolclock)
- [FlipClock](#flipclock---tpltwflipclock)
- [Wetterbenutzerdefinierte](#weathercustom---tpltwweather)
- [SVG-Uhr](#svg-clock---tplsvgclock)
- [Segmentuhr](#segment-clock---tplsegmentclock)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein

### Anforderungen und Migration

Die Widgets befinden sich im Widget-Set **„Zeit und Wetter“** in der Widget-Liste des vis-2-Editors. Die hier beschriebenen React-Versionen benötigen **vis-2 Version 2.12.8** oder neuer. Ältere vis-2-Versionen zeigen stattdessen die vis-1-Widgets an.

Mit vis-1 erstellte Projekte funktionieren weiterhin ohne Änderungen. Beide Versionen verwenden dieselben Widget-IDs (`tplTwSimpleClock`, `tplTwCoolClock`, ...) und dieselben Attributnamen, und vis-2 wählt die React-Version automatisch aus. Alle Einstellungen werden übernommen.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

Die Uhren zeigen die Zeit des Geräts an, das die Ansicht darstellt, nicht die Zeit des ioBroker-Servers. Alle Uhren schalten gleichzeitig, zur vollen Sekunde, um.

### Sprache

Wochentage, Monatsnamen und die Beschriftung des Wetter-Widgets sind in allen Sprachen von vis-2 verfügbar: Englisch, Deutsch, Russisch, Portugiesisch, Niederländisch, Französisch, Italienisch, Spanisch, Polnisch, Ukrainisch und Chinesisch. Die Widgets verwenden die Sprache von vis-2. Das Wetter-Widget verfügt über eine eigene Einstellung, um diese zu überschreiben.

### Eigenes CSS

Die Widgets verwenden die Klassennamen von vis-1, und die Regeln haben dieselbe Bedeutung wie dort. Daher gilt das CSS, das Sie für vis-1 im CSS des Projekts geschrieben haben, weiterhin, zum Beispiel:

```css
/* grey background for the forecast days */
.weatherForecastItem { background-color: #444; }
/* red digits of the flip clock */
.flip-clock-wrapper ul li a div div.inn { color: #e53935; }
```

| Widget                   | Klassen                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SimpleClock              | `clock` auf dem Widget                                                                                                                                                                                                                                                                                  |
| SimpleDate               | `date` auf dem Widget                                                                                                                                                                                                                                                                                   |
| FlipClock                | `flip-clock-wrapper`, `flip`, `play`, `flip-clock-before`, `flip-clock-active`, `up`, `down`, `inn`, `shadow`, `flip-clock-divider`, `flip-clock-dot`, `flip-clock-meridium`                                                                                                                            |
| Wetterbenutzerdefinierte | `weatherFeed` auf dem Widget, `weatherItem` (Plus `day` oder `night`), `weatherCity`, `weatherTemp`, `weatherDesc`, `weatherRange`, `weatherWind`, `weatherHumidity`, `weatherForecast`, `weatherForecastItem`, `weatherForecastDay`, `weatherForecastDate`, `weatherForecastText`, `weatherForecastRange` |

Die CSS-Einstellungen eines Widgets im Editor (Schriftart, Farbe, Rahmen usw.) gelten für das Widget selbst. Sie haben Vorrang vor `clock`, `date` Und `weatherFeed` Die Elemente des Widgets befinden sich im Inneren der Flip-Uhr und des Wetterfelds. Die Farben der inneren Bereiche behalten ihre jeweiligen Farben; diese lassen sich mit Regeln wie den oben genannten ändern. Die Schriftgröße des Wetter-Widgets skaliert das gesamte Feld. Die Farben der SVG-Uhr, der CoolClock und der Segment-Uhr sind Widget-Einstellungen.

### Dunkles Thema

Die Zifferblätter der Uhren und die Wetteranzeige behalten in beiden Vis-2-Themen ihre Farben. Nur das, was direkt im Sichtfeld liegt, ändert sich: die Punkte und die AM/PM-Anzeige der Flip-Clock. Siehe [FlipClock](#flipclock---tpltwflipclock) .

## SimpleClock - `tplTwSimpleClock`

![SimpleClock](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/simple-clock.png)

Die Uhrzeit als Text: `hh:mm:ss` oder `hh:mm` Immer mit 24-Stunden-Anzeige und führenden Nullen. Das Bild zeigt die Standardeinstellung, die Uhr ohne Sekunden und eine Uhr ohne _Stil_ mit eigener Schriftart und Farbe.

**Schau mal.** Das Widget erhält die Klasse. `clock` Große, graue, fette Ziffern mit Schatten (Trebuchet MS, 80 px). Die CSS-Einstellungen des Widgets im Editor überschreiben einzelne Eigenschaften, beispielsweise nur die Schriftgröße. Wenn Sie die Uhr komplett mit einer eigenen Klasse gestalten möchten, aktivieren Sie _„Kein Stil“_ : Das Widget hat dann kein eigenes Design.

| Einstellung         | Attribut      | Standard | Beschreibung                                                                                         |
| ------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| Sekunden ausblenden | `hideSeconds` | aus      | Shows `hh:mm` Die                                                                                     |
| Blinken             | `blink`       | aus      | Nur ohne Sekunden: Der Doppelpunkt verschwindet jede zweite Sekunde. Die Minuten bewegen sich nicht. |
| Kein Stil           | `noClass`     | aus      | Entfernt die Klasse `clock`, siehe oben.                                                             |

Standardgröße: 316 x 92 px.

## SimpleDate - `tplTwSimpleDate`

![SimpleDate](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/simple-date.png)

Das heutige Datum als Text. Es ändert sich direkt nach Mitternacht.

| Einstellung              | Attribut        | Standard | Beschreibung                                                                                                                    |
| ------------------------ | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Zeigen Sie den Wochentag | `showWeekDay`   | aus      | Stellt den Wochentag voran: `Thursday, ...` Die                                                                                  |
| Kurzer Wochentag         | `shortWeekDay`  | aus      | Nur mit _Show am Wochentag_ : `Thu`, `Do`, ...                                                                                  |
| Kurzes Jahr              | `shortYear`     | aus      | `26` anstatt `2026` Die                                                                                                          |
| Füge eine Null voran     | `prependZero`   | An       | `05` anstatt `5` für Tag und Monat.                                                                                              |
| Monat als Wort           | `monthWord`     | aus      | `21st May, 2026` oder `21. Mai 2026` statt Zahlen.                                                                               |
| Kurzmonat                | `shortMonth`    | aus      | Nur wenn _Monat als Wort_ verwendet wird: die ersten drei Buchstaben, z. B. `Sep` Die                                            |
| Amerikanisches Format    | `americanOrder` | aus      | Nur auf Englisch: Monat vor Tag.                                                                                                |
| Kein Stil                | `noClass`       | aus      | Entfernt die Klasse `date` (grauer, fetter Text, 26 px), wie „ _Kein Stil_ der [SimpleClock“](#simpleclock---tpltwsimpleclock) . |

Die Formate hängen von der Sprache von vis-2 ab:

|                | Englisch         | Amerikanisches Format (Englisch) | Alle anderen Sprachen |
| -------------- | ---------------- | -------------------------------- | --------------------- |
| Zahlen         | `21/05/2026`     | `05/21/2026`                     | `21.05.2026`          |
| Monat als Wort | `21st May, 2026` | `May 21st, 2026`                 | `21. Mai 2026`        |

Standardgröße: 134 x 33 Pixel. Längere Texte, beispielsweise mit dem Wochentag, werden in eine zweite Zeile umgebrochen, es sei denn, das Widget ist breit genug.

## CoolClock -`tplTwCoolClock`

Eine analoge Uhr mit 21 Designs, gezeichnet auf einer Zeichenfläche. Die Uhr ist immer rund. Ihr Durchmesser entspricht der kürzeren Seite des Widgets, und der Editor sorgt dafür, dass das Widget quadratisch bleibt.

![Skins](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/cool-clock-skins.png)

![Optionen](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/cool-clock-options.png)

| Einstellung         | Attribut      | Standard  | Beschreibung                                                                   |
| ------------------- | ------------- | --------- | ------------------------------------------------------------------------------ |
| Thema               | `theme`       | Klassiker | Die Haut, siehe Abbildung. Ein unbekannter Name ist zu sehen. `chunkySwiss` Die |
| Sekunden ausblenden | `noSeconds`   | aus       | Ohne Sekundenzeiger. Die Uhr wird dann alle 15 Sekunden neu gezeichnet.        |
| Digitaluhr          | `showDigital` | aus       | Zeigt die Zeit als Text unterhalb der Mitte an, ohne Sekunden.                 |
| AM/PM anzeigen      | `showAmPm`    | aus       | Nur mit _Digitaluhr_ : 12-Stunden-Anzeige `am` /`pm` Die                        |

Einige Skins (`Sand`, `Sun`, `Tumb`, `Stone`, `Disc`) zeichnen über die runde Fläche hinaus und werden am Rand des Widgets abgeschnitten, wie in vis-1. Standardgröße: 150 x 150 px.

## FlipClock - `tplTwFlipClock`

![FlipClock](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/flip-clock.png)

Eine Uhr mit Klappkarten für Stunden, Minuten und Sekunden. Wenn sich eine Ziffer ändert, klappt die obere Hälfte der Karte herunter.

| Einstellung | Attribut | Standard   | Beschreibung                                                                                                                                              |
| ----------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zifferblatt | `face`   | 24 Stunden | `24 hours` (`TwentyFourHourClock`) oder `12 hours (AM/PM)` (`TwelveHourClock` Die 12-Stunden-Uhr zeigt 12:00 bis 11:59 an. `AM` /`PM` hinter den Sekunden. |

Die Uhr hat eine feste Größe und kann nicht skaliert werden: 500 px breit (24-Stunden-Anzeige), 600 px breit (12-Stunden-Anzeige), ca. 110 px hoch. Wie in vis-1 beginnen die Karten 1 em rechts und unterhalb der oberen linken Ecke des Widgets. Die Farben können per [CSS](#own-css) angepasst werden.

Im dunklen Thema von vis-2 die Punkte und `AM` /`PM` Sie werden hell, damit sie auch in dunkler Umgebung sichtbar bleiben:

![FlipClock im dunklen Design](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/flip-clock-dark.png)

## WeatherCustom - `tplTwWeather`

![Wetterbenutzerdefinierte](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/weather.png)

Das aktuelle Wetter und eine Vorhersage für heute und bis zu sechs weitere Tage. Das Widget bezieht seine Werte aus beliebigen Bundesstaaten, beispielsweise vom Adapter von _daswetter_ , _accuweather_ oder _weatherunderground_ : Sie wählen einen Bundesstaat pro Wert aus.

Die Box zeigt von oben nach unten:

- Stadt, aktuelle Temperatur, Wetterlage
- _Höchst-_ / _Tiefstwert_ : Maximal- und Minimalwert von heute
- _Wind_ : Richtung und Geschwindigkeit. Eine Richtung in Grad wird als Kompassrichtung angegeben (`255` →`WSW`), ein Text wie `SW` bleibt so, wie es ist.
- _Luftfeuchtigkeit_ in %
- Die Vorhersage: eine Zeile pro Tag mit Wochentag, Datum, Wetterlage und Temperaturen, beginnend mit heute.

Das Symbol für _„Jetzt“_ dient als Hintergrundbild des Feldes, die Symbole der einzelnen Tage befinden sich links neben jeder Zeile. Ohne das Symbol für _„Jetzt“_ hat das Feld einen Farbverlauf von Grau zu Dunkelgrau. Das Widget schneidet alles ab, was nicht hineinpasst: Bei der Standardgröße von 250 x 107 Pixeln ist nur der obere Teil sichtbar. Passen Sie die Höhe des Widgets daher an die Anzahl der anzuzeigenden Tage an.

**Wetterbedingungen.** Wenn es sich bei einer Bedingung um einen der bekannten Wetterbegriffe handelt (`Cloudy`, `Rain`, `Wolkig`, `Regen`, `Облачно`...) wird in der Sprache des Widgets angezeigt. Jeder andere Text wird exakt so angezeigt, wie er vom Adapter geliefert wird.

| Einstellung               | Attribut      | Standard  | Beschreibung                                                                   |
| ------------------------- | ------------- | --------- | ------------------------------------------------------------------------------ |
| Stadt                     | `city`        |           | Name über der Temperaturangabe, in Großbuchstaben.                             |
| Sprache                   | `language`    | als Sicht | Die Sprache der Wochentage, der Monate, der Bezeichnungen und der Bedingungen. |
| Geschwindigkeitseinheiten | `units_speed` | `km/h`    | Angehängt an die Windgeschwindigkeit.                                          |

**Gruppe „Jetzt“** – heute und das aktuelle Wetter:

| Einstellung                                 | Attribut                                         | Beschreibung                                           |
| ------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Temperatur-ID                               | `temperature-0-oid`                              | Aktuelle Temperatur.                                   |
| Zustands-ID                                 | `condition-0-oid`                                | Aktuelle Wetterbedingungen wie im Text angegeben.      |
| Feuchtigkeits-ID                            | `humidity-0-oid`                                 | Luftfeuchtigkeit in %.                                 |
| Mindesttemperatur ID / Maximaltemperatur ID | `temperature-min-0-oid` /`temperature-max-0-oid` | Minimum und Maximum von heute.                         |
| Windgeschwindigkeit ID                      | `wind-speed-0-oid`                               | Windgeschwindigkeit. Ohne sie gibt es keine Windlinie. |
| Windrichtung ID                             | `wind-dir-0-oid`                                 | Richtung in Grad (0 = Norden) oder als Text.           |
| Symbol-URL-ID                               | `icon-0-oid`                                     | Ein Zustand mit der URL eines Bildes.                  |

**Gruppen „Morgen“, „Übermorgen“, „In 3 Tagen“ ... „In 6 Tagen“** – die Vorhersage, Attributnamen mit der Nummer des Tages (`1` = morgen ... `6`):

| Einstellung                                 | Attribut                                         | Beschreibung                     |
| ------------------------------------------- | ------------------------------------------------ | -------------------------------- |
| Zustands-ID                                 | `condition-1-oid`                                | Wetterbedingungen an diesem Tag. |
| Mindesttemperatur ID / Maximaltemperatur ID | `temperature-min-1-oid` /`temperature-max-1-oid` | Temperaturen an diesem Tag.      |
| Symbol-URL-ID                               | `icon-1-oid`                                     | URL des Bildes von diesem Tag.   |

Die Vorhersage endet am ersten Tag, an dem weder Temperaturen noch eine Wetterlage vorliegen. Zeilen für nicht festgelegte Werte werden ausgelassen. Anstelle einer Objekt-ID benötigt jedes Feld auch eine Bindung wie z. B. `{weather.0.current.temp}` Die

## SVG-Uhr - `tplSvgClock`

![SVG-Uhr](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/svg-clock.png)

Eine analoge Uhr, dargestellt als SVG. Sie lässt sich beliebig skalieren, die Linien behalten ihre Pixelbreite. Der Editor sorgt dafür, dass das Widget quadratisch bleibt.

| Einstellung            | Attribut         | Standard  | Beschreibung                                                                  |
| ---------------------- | ---------------- | --------- | ----------------------------------------------------------------------------- |
| Viertel Textgröße      | `quadSize`       | 60        | Größe der Zahlen 12, 3, 6 und 9 im Verhältnis zu einer Uhr mit 900 Einheiten. |
| Vierteltextfarbe       | `quadColor`      | `#333`    | Farbe dieser Zahlen.                                                          |
| Viertel-Häkchenfarbe   | `quadTickColor`  | `#333`    | Farbe der Häkchen alle fünf Minuten.                                          |
| Minuten Textgröße      | `textSize`       | 30        | Größe der Minutenzahlen 0, 5, 10, ... außerhalb des Rings.                    |
| Minutentextfarbe       | `textColor`      | `#555`    | Farbe der Minutenzahlen.                                                      |
| Kleine Zeckenfarbe     | `tickColor`      | `#555`    | Farbe der anderen Zecken.                                                     |
| Gebrauchte Anzeige     | `isSeconds`      | aus       | Zeigt den Sekundenzeiger an.                                                  |
| Handfarbe              | `handsColor`     | `#111`    | Farbe des Stunden- und Minutenzeigers.                                        |
| Farbwölbung der Hände  | `handsColorLine` | `#666`    | Farbe der Linie im Inneren der Hände.                                         |
| Farbe aus zweiter Hand | `handsSecColor`  | `#be5639` | Nur mit _Gebrauchtwagen_ .                                                    |
| Schriftart             | `textFont`       | Verdana   | Schriftart aller Zahlen.                                                      |

Standardgröße: 100 x 100 px.

## Segmentuhr - `tplSegmentClock`

![Segmentuhr](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/segment-clock.png)

Eine Anzeige mit 7, 14 oder 16 Segmenten pro Zeichen, ähnlich wie bei einem Radiowecker. Sie zeigt die Zeichen in dieser Reihenfolge an:

1. der Wert der _Objekt-ID_ , falls festgelegt,
2. andernfalls der _Text_ , falls festgelegt,
3. andernfalls die Zeit, falls _die Uhr aktiviert_ ist.
4. ansonsten `no oid, no text, no clock` Die

Die Anzeige wird an das Widget angepasst und behält ihre Proportionen bei: _Ziffernhöhe_ , _Ziffernbreite_ und die anderen Größenangaben beziehen sich auf relative Werte, nicht auf Pixel. Buchstaben werden so weit angezeigt, wie es die Segmente zulassen; 7 Segmente zeigen nur Ziffern und einige wenige Buchstaben an, 16 Segmente fast alle. Groß- und Kleinbuchstaben sehen gleich aus.

**Gruppe "Gemeinsam"**

| Einstellung | Attribut | Standard | Beschreibung                             |
| ----------- | -------- | -------- | ---------------------------------------- |
| Objekt-ID   | `oid`    |          | Ein Zustand, dessen Wert angezeigt wird. |
| Text        | `text`   |          | Ein fester Text. Nur ohne _Objekt-ID_ .  |

**Gruppe "Uhr"**

| Einstellung       | Attribut  | Standard | Beschreibung                                                                                                                                                                  |
| ----------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uhr aktivieren    | `clock`   | An       | Zeigt die Uhrzeit an, wenn weder _Objekt-ID_ noch _Text_ festgelegt sind.                                                                                                     |
| Sekunden anzeigen | `seconds` | An       | `hh:mm:ss` anstatt `hh:mm` Wenn es deaktiviert ist und das Muster auf „Standard“ eingestellt ist. `##:##:##` Das Widget verwendet `##:##` - auch für einen Wert oder einen Text. |

**Gruppe „Stil“**

| Einstellung                 | Attribut                    | Standard               | Beschreibung                                                                                                                                                                                                                                                    |
| --------------------------- | --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Muster                      | `pattern`                   | `##:##:##`             | Eins `#` pro Zeichen. `.` Und `:` Es gibt schmale Stellen für einen Punkt oder einen Doppelpunkt, ein Leerzeichen ist eine Lücke. Jede Stelle belegt ein Zeichen des Wertes, also ein Wert `21.5` benötigt das Muster `##.#` Andere Zeichen lassen die Anzeige leer. |
| Segmentfarbe EIN / AUS      | `colorOn` /`colorOff`       | Schwarz / 10 % Schwarz | Farben der beleuchteten und der dunklen Abschnitte.                                                                                                                                                                                                             |
| Textintervall (ms)          | `runStepInterval`           | 0                      | Für einen Wert oder Text: Verschiebt den Text alle 10 Millisekunden um ein Zeichen nach links und lässt ihn von rechts wieder einfließen. 0: Kein Lauftext.                                                                                                     |
| Segmentanzahl               | `segmentCount`              | 7                      | 7, 14 oder 16 Segmente pro Zeichen.                                                                                                                                                                                                                             |
| Anzeigewinkel               | `displayAngle`              | 9                      | Neigung der Zeichen in Grad.                                                                                                                                                                                                                                    |
| Ziffernhöhe / Ziffernbreite | `digitHeight` /`digitWidth` | 20 / 12                | Proportionen einer Figur.                                                                                                                                                                                                                                       |
| Fingerabstand               | `digitDistance`             | 2                      | Abstand zwischen den Zeichen.                                                                                                                                                                                                                                   |
| Segmentbreite               | `segmentWidth`              | 3                      | Dicke der Segmente.                                                                                                                                                                                                                                             |
| Segmentabstand              | `segmentDistance`           | 0.5                    | Lücke zwischen den Segmenten.                                                                                                                                                                                                                                   |
| Ecktyp                      | `cornerType`                | spitz                  | Form der Segmentenden siehe unten.                                                                                                                                                                                                                              |

![Eckarten](../../../../../en/adapterref/iobroker.vis-timeandweather/docs/img/segment-corners.png)

Die Bezeichnungen der Eckformen stammen aus vis-1 und passen nicht ganz zu dem, was sie darstellen: _„Spitz“_ ergibt abgerundete Enden, und _„abgerundet“_ sieht aus wie _„symmetrisch“_ . Sie wurden beibehalten, damit bestehende Projekte einheitlich aussehen.

Standardgröße: 100 x 30 px.

## Unterschiede zu vis-1

Die vis-2-Widgets verwenden weder jQuery noch die Bibliotheken von vis-1 (CoolClock, FlipClock.js, zWeatherFeed, segment-display.js). Die Darstellung der CoolClock und des Segmentdisplays wird unverändert übernommen. Projekte bleiben unverändert. Einige Details funktionieren jedoch anders:

- **Sprachen:** Wochentage, Monate und Wetterbezeichnungen existieren in allen Sprachen von vis-2. vis-1 kannte nur Englisch, Deutsch und Russisch und zeigte `undefined` für andere Sprachen.
- **Wetterbedingungen:** Es werden nur exakte Wetterbezeichnungen übersetzt. vis-1 akzeptierte auch Bezeichnungen, die lediglich den Text enthielten, und zeigte `Rain` als _Mischregen und Schneefall_ und ein leerer Zustand wie bei _einem Tornado_ .
- **Wetter:** Nicht festgelegte Werte hinterlassen keine leeren Zeilen wie `High: ° Low: °` Die Yahoo!-Icons, die vis-1 als Ersatz für ein fehlendes Icon verwendet hatte, sind verschwunden, ebenso wie der Dienst.
- **Wetter:** Die Gruppen der Vorhersagetage sind korrekt benannt. In vis-1 wurde der Tag in drei Tagen als _„In 2 Tagen“_ bezeichnet.
- **SimpleDate:** Englische Ordnungszahlen sind für den 21., 22., 23. und 31. korrekt, auch mit einer führenden Null.
- **SVG-Uhr:** Mehrere Uhren in einer Ansicht können unterschiedliche Strichfarben haben. In Ansicht 1 haben alle die Farben der ersten Uhr übernommen.
- **CoolClock und Segment Clock:** gestochen scharf auf hochauflösenden Bildschirmen.
- Die Widgets **HtcWeather** und **YahooWeather** von vis-1 sind nicht verfügbar, da der benötigte Yahoo!-Wetterdienst eingestellt wurde. Verwenden Sie stattdessen _WeatherCustom_ mit den Zuständen eines Wetteradapters.