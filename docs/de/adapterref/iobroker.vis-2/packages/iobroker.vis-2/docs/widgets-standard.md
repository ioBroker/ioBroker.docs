---
chapters: {"pages":{"en/adapterref/iobroker.vis-2/README.md":{"title":{"en":"Next generation visualization for ioBroker: vis-2"},"content":"en/adapterref/iobroker.vis-2/README.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md":{"title":{"en":"Standard widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md":{"title":{"en":"jQui widgets - jQuery UI widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md
title: Standard-Widgets
hash: QhcJMUICDsS+p+lvKL/Z6m4Z/G7SDHfYrKH0VbNtJoI=
---
# Standard-Widgets

Zwei Widget-Sets werden mit vis-2 für die Geräte eines Hauses geliefert:

| Satz         | Wozu dient es?                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **relativ**  | Karten für eine Seite mit Abschnitten – jedes Widget füllt ganze Zellen eines Rasters und passt sich der Bildschirmbreite an. |
| **Absolute** | Markierungen für einen Grundriss – jedes Widget ist eine Münze oder eine Kapsel an der Stelle, an die es gezogen wurde.       |

Es handelt sich in beiden Fällen um dieselben siebenundzwanzig Geräte. Ein Gerät wird im Quelltext einmal beschrieben (`src-vis/src/Vis/Widgets/Standard/devices/`) und erscheint zweimal, also ist ein Thermostat derselbe Thermostat auf einem Tablet im Flur und auf dem Grundriss des Erdgeschosses: dieselben Zustände, dieselben Attribute, dieselben Wörter, zwei Formen.

Die folgenden Bilder zeigen die Laufzeitumgebung im dunklen Design. Die Systemsprache des ioBrokers, aus dem sie stammen, ist Deutsch, daher sprechen die Widgets Deutsch; jedes Wort wird in elf Sprachen übersetzt und entspricht der Installationssprache.

- [Schalten](#switch)
- [Dimmer](#dimmer)
- [Farblicht](#colour-light)
- [Thermostat](#thermostat)
- [Knopf](#knob)
- [Messwert](#measured-value)
- [Eingang](#input)
- [Füllstand](#fill-level)
- [Sensor](#sensor)
- [Fenster oder Tür](#window-or-door)
- [Wetter](#weather)
- [Alarmanlage](#alarm-system)
- [Blind](#blind)
- [Sperren](#lock)
- [Kamera](#camera)
- [Saugroboter](#vacuum-robot)
- [Spieler](#player)
- [Taste](#button)
- [Liste](#list)
- [Tisch](#table)
- [Diagramm](#chart)
- [Uhr](#clock)
- [Seitenkachel](#page-tile)
- [Text](#text)
- [Webseite](#web-page)
- [Themenwechsler](#theme-switcher)

## Ein Gerät, zwei Formen

![Die Kennzeichen der Menge absolut](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/markers.png)

Eine Karte sagt alles, was sie sagen will; ein Marker hat die Größe einer Münze und muss eine Wahl treffen. Welche Wahl er trifft, wird von Gerät zu Gerät entschieden:

- Ein Gerät mit einer lesbaren Zahl – ein Dimmer, ein Thermostat, ein Füllstandsanzeiger – wird zu einer **Kapsel** , die diese Zahl enthält;
- Alles andere wird zu einer **Münze** mit seinem Symbol, gefärbt durch das, was es tut;
- Ein Gerät, das sich nicht so weit verkleinern lässt – eine Liste, eine Tabelle, ein Diagramm, eine Kamera, ein Spieler – wird zu einer Münze, die mit einem Klick **ihre Karte öffnet** .

Der Pegel wird als Höhe und nicht als Zahl abgelesen, daher stehen die Markierungen für Dimmer, Jalousie und Füllstand so voll wie das Gerät selbst.

## Was jedes Widget hat

Neben seinen eigenen Zuständen enthält jedes Widget beider Mengen folgende Informationen:

| Attribut      | Nimmt            | Was es tut                                                                                               |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `layout`      | wählen           | Layout —`default` Name oben, Wert unten, `compact` Eine Reihe, `card` Farbige Kachel (Standard) `default`) |
| `widgetTitle` | Text             | Name                                                                                                     |
| `icon`        | Symbol           | Symbol                                                                                                   |
| `noCard`      | Kontrollkästchen | Ohne Rahmen                                                                                              |

Die Werte von `layout` Die Mengen unterscheiden sich, weil die Formen unterschiedlich sind:

| Satz     | `layout`                                                                                  |
| -------- | ----------------------------------------------------------------------------------------- |
| relativ  | `default` Name oben und Wert unten ·`compact` eine Reihe ·`card` eine farbige Fliese      |
| Absolute | `icon` das Symbol allein ·`name` Symbol und Name ·`state` Symbol, Name und seine Funktion |

Alles, was etwas ändert, kann vorher fragen – und zwar nach einer PIN:

| Attribut      | Nimmt  | Was es tut                                                                                                                       |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `confirm`     | wählen | Vor dem Wechsel nachfragen —`none` Niemals, `on` Beim Einschalten `off` Beim Ausschalten `both` Immer (Standardeinstellung) `none`) |
| `confirmText` | Text   | Frage                                                                                                                            |
| `pin`         | Text   | STIFT                                                                                                                            |

Jedes Attribut jedes Widgets kann an einen Zustand gebunden werden, anstatt einen Wert zu erhalten; siehe _Bindungen von Objekten_ in der [README-Datei](https://github.com/iobroker/iobroker.vis-2/blob/master/packages/README.md) .

## Größen

Eine Karte wird in der vom zugehörigen Widget vorgegebenen Größe (die unter jeder Überschrift angegebene Kachel) eingefügt und kann im Editor mithilfe des Griffs in ihrer Ecke zellenweise skaliert werden. Ein Abschnitt besteht aus zwölf Spalten pro Abschnittsspalte, eine Zeile ist standardmäßig 56 Pixel breit; beides kann pro Ansicht und pro Abschnitt angepasst werden.

Eine Karte kann über die ihr zugewiesenen Zeilen hinauswachsen, wenn ihr Inhalt mehr Platz benötigt – die Rasterzeilen sind `minmax(height, auto)` Eine Karte, die ihre Höhe exakt beibehalten soll, erhält die benötigten Zeilen.

## Seiten aus Geräten erstellen

Der Editor kann selbstständig eine Seite füllen: **„Ansichten → Geräte“** liest die Objekte der Installation mithilfe des Typendetektors und zeigt alle gefundenen Geräte, gruppiert nach Räumen, an. Daraus werden die untenstehenden Widgets erstellt – welches Widget einem Gerätetyp zugeordnet ist, wird am Ende jedes Abschnitts vermerkt.

## Schalten

`tplRelSwitch` ( _relativ_ setzen) ·`tplAbsSwitch` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Schalten](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/switch.png)

Alles, was ein- oder ausgeschaltet ist: eine Steckdose, eine Lampe, eine Pumpe. Die Karte kann vor dem Schaltvorgang eine Anfrage stellen und eine PIN verlangen.

| Attribut   | Nimmt            | Was es tut   |
| ---------- | ---------------- | ------------ |
| `oid`      | Zustand          | Objekt-ID    |
| `oid2`     | Zustand          | Rückmeldung  |
| `onValue`  | Text             | Wert für auf |
| `readOnly` | Kontrollkästchen | Nur lesen    |

Der Assistent wählt dieses Widget für die Gerätetypen aus `socket`, `light`, `fan`, `pump`, `airPurifier`, `unknown` Die

## Dimmer

`tplRelDimmer` ( _relativ_ setzen) ·`tplAbsDimmer` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Dimmer](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/dimmer.png)

Eine Lampe mit mehr Funktionen als nur Ein/Aus: Ein Schalter zum Ein- und Ausschalten und ein Schieberegler zur Helligkeitsregulierung. Funktioniert mit einer Skala von 0 bis 100 sowie von 0 bis 255.

| Attribut      | Nimmt   | Was es tut                                                                                                                   |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `oid`         | Zustand | Objekt-ID                                                                                                                    |
| `oidActual`   | Zustand | Rückmeldung                                                                                                                  |
| `oidSwitch`   | Zustand | An und aus                                                                                                                   |
| `min`         | Nummer  | Minimum                                                                                                                      |
| `max`         | Nummer  | Maximal                                                                                                                      |
| `step`        | Nummer  | Schritt                                                                                                                      |
| `onBehaviour` | wählen  | Wenn eingeschaltet —`last` Zurück an seinen ursprünglichen Platz, `preset` Auf einen festgelegten Wert (Standardwert) `last`) |
| `onValue`     | Nummer  | Dieser Wert (%) (Standardwert) `100`)                                                                                        |

Der Assistent wählt dieses Widget für die Gerätetypen aus `dimmer` Die

## Farblicht

`tplRelRgb` ( _relativ_ setzen) ·`tplAbsRgb` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Farblicht](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/rgb.png)

Farblicht mit einem Farbrad, einem Helligkeitsregler und – sofern die Lampe dies unterstützt – Farbtemperatur und Weißkanal. Sechs Möglichkeiten, einer Lampe eine Farbe zuzuweisen.

| Attribut        | Nimmt   | Was es tut                                                                                                                                                                                                                                  |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`          | wählen  | Wie der Lampe die Farbe mitgeteilt wird —`hex` Ein Staat, #rrggbb, `hexw` Ein Staat und weiß, `rgb` Rot, Grün und Blau, `rgbw` Rot, Grün, Blau und Weiß, `hue` Farbton, Sättigung und Helligkeit, `ct` Nur Weiß, warm bis kalt (Standard) `hex`) |
| `oid`           | Zustand | Objekt-ID                                                                                                                                                                                                                                   |
| `oidRed`        | Zustand | Rot                                                                                                                                                                                                                                         |
| `oidGreen`      | Zustand | Grün                                                                                                                                                                                                                                        |
| `oidBlue`       | Zustand | Blau                                                                                                                                                                                                                                        |
| `oidWhite`      | Zustand | Weiß                                                                                                                                                                                                                                        |
| `oidSaturation` | Zustand | Sättigung                                                                                                                                                                                                                                   |
| `oidBrightness` | Zustand | Helligkeit                                                                                                                                                                                                                                  |
| `oidSwitch`     | Zustand | An und aus                                                                                                                                                                                                                                  |
| `oidCt`         | Zustand | Farbtemperatur                                                                                                                                                                                                                              |
| `ctMin`         | Nummer  | Am wärmsten, in Kelvin                                                                                                                                                                                                                      |
| `ctMax`         | Nummer  | Kälteste, in Kelvin                                                                                                                                                                                                                         |

Der Assistent wählt dieses Widget für die Gerätetypen aus `rgb`, `rgbSingle`, `rgbwSingle`, `hue`, `ct`, `cie` Die

## Thermostat

`tplRelThermostat` ( _relativ_ setzen) ·`tplAbsThermostat` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 5 Zeilen

![Thermostat](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/thermostat.png)

Wie der Raum aktuell ist, wie er sein sollte und wie die Heizung darauf reagiert. Bewegen Sie den Drehknopf entlang der Skala; die Modi stammen vom Gerät, unabhängig davon, wie der Hersteller sie bezeichnet.

| Attribut    | Nimmt   | Was es tut                                                                                    |
| ----------- | ------- | --------------------------------------------------------------------------------------------- |
| `oid`       | Zustand | Solltemperatur                                                                                |
| `oidActual` | Zustand | Gemessene Temperatur                                                                          |
| `oidMode`   | Zustand | Modus                                                                                         |
| `oidPower`  | Zustand | An und aus                                                                                    |
| `unit`      | Text    | Einheit                                                                                       |
| `presets`   | Text    | Werte als Schaltflächen                                                                       |
| `controls`  | wählen  | Was gezeigt wird —`dial` Das Zifferblatt, `presets` Die Knöpfe, `both` Beide (Standard) `dial`) |
| `min`       | Nummer  | Minimum                                                                                       |
| `max`       | Nummer  | Maximal                                                                                       |
| `step`      | Nummer  | Schritt                                                                                       |

Der Assistent wählt dieses Widget für die Gerätetypen aus `thermostat`, `airCondition` Die

## Knopf

`tplRelKnob` ( _relativ_ setzen) ·`tplAbsKnob` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Knopf](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/knob.png)

Jede manuell eingestellte Zahl, die keine Leuchte angibt: die Lautstärke, die Lüftergeschwindigkeit, der Öffnungsgrad eines Ventils. Sie kann als Drehknopf aus der Ferne oder als Schieberegler zum Speichern der Höhe in einer Liste verwendet werden.

| Attribut    | Nimmt   | Was es tut                                                                                   |
| ----------- | ------- | -------------------------------------------------------------------------------------------- |
| `oid`       | Zustand | Objekt-ID                                                                                    |
| `oidActual` | Zustand | Rückmeldung                                                                                  |
| `shape`     | wählen  | Gedreht oder geschoben —`dial` Knopf, `slider` Schieberegler (Standardeinstellung) `dial`)    |
| `unit`      | Text    | Einheit                                                                                      |
| `presets`   | Text    | Werte als Schaltflächen                                                                      |
| `controls`  | wählen  | Was gezeigt wird —`control` Der Knauf `presets` Die Knöpfe, `both` Beide (Standard) `control`) |
| `min`       | Nummer  | Minimum                                                                                      |
| `max`       | Nummer  | Maximal                                                                                      |
| `step`      | Nummer  | Schritt                                                                                      |
| `digits`    | Nummer  | Dezimalzahlen                                                                                |
| `ticks`     | Nummer  | Markierungen auf der Skala                                                                   |
| `color`     | Farbe   | Farbe der Schuppe                                                                            |
| `colorTo`   | Farbe   | Farbe im oberen Bereich                                                                      |

Der Assistent wählt dieses Widget für die Gerätetypen aus `slider`, `volume`, `volumeGroup`, `percentage` Die

## Messwert

`tplRelValue` ( _relativ_ setzen) ·`tplAbsValue` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Messwert](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/value.png)

_mit der Geschichte hinter der Zahl und dem zweiten Wert daneben_

Messwerte wie Temperatur, Luftfeuchtigkeit und Stromverbrauch werden angezeigt. Wenn der Zustand protokolliert ist, zeigt die Karte den Verlauf hinter der Zahl an, visualisiert die Entwicklung und öffnet per Klick das Diagramm.

| Attribut | Nimmt   | Was es tut                 |
| -------- | ------- | -------------------------- |
| `oid`    | Zustand | Objekt-ID                  |
| `unit`   | Text    | Einheit                    |
| `oid2`   | Zustand | Zweiter Wert               |
| `unit2`  | Text    | Einheit des zweiten Wertes |
| `digits` | Nummer  | Dezimalzahlen              |
| `min`    | Nummer  | Minimum                    |
| `max`    | Nummer  | Maximal                    |

**Geschichte**

| Attribut         | Nimmt            | Was es tut                                                                                                             |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `chart`          | Kontrollkästchen | Diagramm im Hintergrund (Standard) `true`)                                                                             |
| `chartSmoothing` | wählen           | Glättung —`0` Keiner, `60` 1 Minute `300` 5 Minuten, `900` 15 Minuten `3600` 1 Stunde (Standard) `0`)                      |
| `chartHours`     | wählen           | Zeitraum des Diagramms —`1` 1 Stunde, `6` 6 Stunden, `12` 12 Stunden, `24` 1 Tag `72` 3 Tage, `168` 7 Tage (Standard) `24`) |
| `chartSpline`    | Kontrollkästchen | Glatte Linie                                                                                                           |
| `chartClick`     | Kontrollkästchen | Diagramm bei Klick öffnen (Standardeinstellung) `true`)                                                                |
| `trend`          | Kontrollkästchen | Trendpfeil                                                                                                             |
| `trendHours`     | wählen           | Zeitraum des Trends —`1` 1 Stunde, `6` 6 Stunden, `12` 12 Stunden, `24` 1 Tag `72` 3 Tage, `168` 7 Tage (Standard) `1`)     |
| `trendThreshold` | Nummer           | Änderungen, die kleiner als                                                                                            |
| `trendUpColor`   | Farbe            | Farbe beim Aufgehen                                                                                                    |
| `trendDownColor` | Farbe            | Farbe beim Fallen                                                                                                      |

Der Assistent wählt dieses Widget für die Gerätetypen aus `temperature`, `humidity`, `illuminance`, `pressure`, `airQuality`, `flow`, `electricity`, `info` Die

## Eingang

`tplRelInput` ( _relativ_ setzen) ·`tplAbsInput` ( _absolut_ festlegen) · Standardkachel 4 Spalten × 2 Zeilen

![Eingang](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/input.png)

_ein Textzustand_

![Eingang](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/input-number.png)

_eine Zahl mit `buttons` eingeschaltet_

Ein manuell definierter Zustand: ein Feld, ein Dropdown-Menü oder ein Häkchen. Für alles, was ein Haus hat und was kein Gerätetyp abdeckt – eine Skriptvariable, ein von jemandem entwickelter Modus, ein Sollwert. Die Steuerung ergibt sich aus dem Objekt und kann überschrieben werden; ein Zustand, der nicht beschrieben werden kann, zeigt nur seinen Wert an.

| Attribut  | Nimmt            | Was es tut                                                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `oid`     | Zustand          | Objekt-ID                                                                                                                             |
| `kind`    | wählen           | Eingetragen mit —`auto` Aus dem Objekt heraus `text` Textfeld `number` Zahlenfeld `select` Auswahl, `checkbox` Häkchen (Standard) `auto`) |
| `unit`    | Text             | Einheit                                                                                                                               |
| `min`     | Nummer           | Minimum                                                                                                                               |
| `max`     | Nummer           | Maximal                                                                                                                               |
| `step`    | Nummer           | Schritt                                                                                                                               |
| `buttons` | Kontrollkästchen | Minus und Plus daneben                                                                                                                |
| `options` | Text             | Eigene Entscheidungen                                                                                                                 |
| `textOn`  | Text             | Das Wort ist zwar wahr                                                                                                                |
| `textOff` | Text             | Wort während falsch                                                                                                                   |

## Füllstand

`tplRelTank` ( _relativ_ setzen) ·`tplAbsTank` ( _absolut_ festlegen) · Standardkachel 4 Spalten × 4 Zeilen

![Füllstand](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/tank.png)

Eine Zisterne, ein Öltank, ein Pelletlager, eine Batterie: eine Messlatte mit einer Skala daneben, denn niemand liest den Füllstand als Zahl ab – man liest ihn als Höhe. Stellt man einen Warnpegel ein, leuchtet die Anzeige rot auf, bevor der Tank leer ist.

| Attribut        | Nimmt   | Was es tut                                                                                                                                  |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `oid`           | Zustand | Objekt-ID                                                                                                                                   |
| `unit`          | Text    | Einheit                                                                                                                                     |
| `min`           | Nummer  | Leer bei                                                                                                                                    |
| `max`           | Nummer  | Vollständig bei                                                                                                                             |
| `low`           | Nummer  | Warnung unten                                                                                                                               |
| `digits`        | Nummer  | Dezimalzahlen                                                                                                                               |
| `valuePosition` | wählen  | Wo die Zahl steht —`right` Daneben `top` Darüber hinaus, `bottom` Darunter, `inside` An der Bar, `none` Nirgends (Standardeinstellung) `right`) |

Der Assistent wählt dieses Widget für die Gerätetypen aus `fillLevel` Die

## Sensor

`tplRelSensor` ( _relativ_ setzen) ·`tplAbsSensor` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Sensor](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/sensor.png)

Ein Zustand, der immer nur eines von zwei Dingen sein kann: ein Fenster, eine Tür, Bewegung, Rauch, Wasser. Sagt man ihm, was er beobachtet, findet er sein Symbol und seine Worte; kennzeichnet man ihn als Alarm, leuchtet er rot auf, wenn er auslöst.

| Attribut   | Nimmt            | Was es tut                                                                                                                                                                           |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `oid`      | Zustand          | Objekt-ID                                                                                                                                                                            |
| `kind`     | wählen           | Was es überwacht —`contact` Kontakt, `window` Fenster, `door` Tür, `motion` Bewegung, `smoke` Rauch oder Feuer, `water` Wasser, `light` Licht, `generic` Alles andere (Standard) `contact`) |
| `alarm`    | Kontrollkästchen | Als Alarm behandeln                                                                                                                                                                  |
| `inverted` | Kontrollkästchen | Umgekehrt                                                                                                                                                                            |
| `textOn`   | Text             | Das Wort ist zwar wahr                                                                                                                                                               |
| `textOff`  | Text             | Wort während falsch                                                                                                                                                                  |
| `iconOn`   | Symbol           | Symbol, wenn aktiv                                                                                                                                                                   |
| `iconOff`  | Symbol           | Symbol im inaktiven Zustand                                                                                                                                                          |
| `colorOn`  | Farbe            | Farbe bei Aktivität                                                                                                                                                                  |
| `colorOff` | Farbe            | Farbe im inaktiven Zustand                                                                                                                                                           |

Der Assistent wählt dieses Widget für die Gerätetypen aus `window`, `windowTilt`, `door`, `motion`, `fireAlarm`, `floodAlarm`, `coAlarm`, `contact`, `buttonSensor` Die

## Fenster oder Tür

`tplRelWindow` ( _relativ_ setzen) ·`tplAbsWindow` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Fenster oder Tür](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/window.png)

Ein Fenster oder eine Tür, die als Einheit gezeichnet ist: geschlossen, gekippt oder offen. Die Form wird quer durch den Raum erkannt, noch bevor jemand ein Wort liest.

| Attribut    | Nimmt            | Was es tut                                                         |
| ----------- | ---------------- | ------------------------------------------------------------------ |
| `oid`       | Zustand          | Objekt-ID                                                          |
| `kind`      | wählen           | Was es überwacht —`window` Fenster, `door` Tür (Standard) `window`) |
| `handle`    | wählen           | Griff am —`right` Rechts, `left` Links (Standard) `right`)          |
| `tiltValue` | Text             | Wert für geneigt                                                   |
| `inverted`  | Kontrollkästchen | Umgekehrt                                                          |

Der Assistent wählt dieses Widget für die Gerätetypen aus `window`, `windowTilt`, `door` Die

## Wetter

`tplRelWeather` ( _relativ_ setzen) ·`tplAbsWeather` ( _absolut_ festlegen) · Standardmäßig wird die gesamte Breite × 4 Zeilen als Kachel angezeigt

![Wetter](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/weather.png)

_ohne Wettervorhersage (`days` = 0)_

Das aktuelle Wetter und seine zukünftige Entwicklung. Jeder Wetteradapter zeigt dieselben Messwerte unter unterschiedlichen Bezeichnungen an. Jeder Messwert entspricht einem Feld, dessen Bezeichnung auf der Karte angezeigt wird: Bei nur einer Temperaturangabe handelt es sich um ein Thermometer, bei allen Messwerten um eine Wetterstation. Die Symbole entsprechen denen des jeweiligen Adapters – ein Widget mit eigenen Symbolen würde die zugehörige Vorhersage nicht wiedergeben.

| Attribut           | Nimmt            | Was es tut                                                                                  |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------- |
| `source`           | wählen           | Woher das Wetter kommt —`manual` Von Hand, `instance` Aus einer Instanz (Standard) `manual`) |
| `instance`         | Beispiel         | Wetteradapter                                                                               |
| `oid`              | Zustand          | Temperatur jetzt                                                                            |
| `oidText`          | Zustand          | Was der Himmel tut                                                                          |
| `oidIcon`          | Zustand          | Bild vom Wetter                                                                             |
| `oidFeelsLike`     | Zustand          | Fühlt sich an wie                                                                           |
| `oidHumidity`      | Zustand          | Luftfeuchtigkeit                                                                            |
| `oidWind`          | Zustand          | Wind                                                                                        |
| `oidPrecipitation` | Zustand          | Regenwahrscheinlichkeit                                                                     |
| `unit`             | Text             | Einheit                                                                                     |
| `windUnit`         | Text             | Einheit des Windes                                                                          |
| `days`             | Nummer           | Tage der Vorhersage (Standard) `0`)                                                         |
| `plain`            | Kontrollkästchen | Einfache Karte                                                                              |

**Prognose** – diese Felder existieren einmal pro Zeile und sind nummeriert: `oidDayIcon1`, `oidDayIcon2`, …

| Attribut     | Nimmt   | Was es tut              |
| ------------ | ------- | ----------------------- |
| `oidDayIcon` | Zustand | Bild des Tages          |
| `oidDayMin`  | Zustand | Tiefster Wert des Tages |
| `oidDayMax`  | Zustand | Höchster Wert des Tages |
| `oidDayName` | Zustand | Name des Tages          |

Der Assistent wählt dieses Widget für die Gerätetypen aus `weatherCurrent`, `weatherForecast` Die

## Alarmanlage

`tplRelSecurity` ( _relativ_ setzen) ·`tplAbsSecurity` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Alarmanlage](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/security.png)

Scharfgeschaltet, unscharfgeschaltet oder Alarm ausgelöst – das sind die drei Zustände, nicht mehr und nicht weniger. Was die Scharfschaltung bedeutet (alle sind draußen oder jemand schläft oben), ist systemabhängig: Wo es in der Beschreibung steht, werden diese als Schaltflächen auf der Karte angezeigt; wo nicht, werden die mitgelieferten Schaltflächen verwendet. Wie beim Schloss fragt es standardmäßig nach beiden Eingabemethoden, und eine PIN kann festgelegt werden. Ein Haus per Tablet im Flur zu entschärfen, ist genau die Aktion, die einen kosten sollte.

| Attribut     | Nimmt            | Was es tut            |
| ------------ | ---------------- | --------------------- |
| `oid`        | Zustand          | Bewaffnet             |
| `oidAlarm`   | Zustand          | Abschalten            |
| `oidArmAway` | Zustand          | Arm — alle raus       |
| `oidArmHome` | Zustand          | Arm — jemand zu Hause |
| `oidDisarm`  | Zustand          | Entwaffnen            |
| `oidDelay`   | Zustand          | Arm mit Verzögerung   |
| `inverted`   | Kontrollkästchen | Umgekehrt             |
| `zones`      | Nummer           | Zonen (Standard) `0`) |

**Zonen** – diese Felder existieren einmal pro Zeile und sind nummeriert: `oidZone1`, `oidZone2`, …

| Attribut   | Nimmt   | Was es tut    |
| ---------- | ------- | ------------- |
| `oidZone`  | Zustand | Zone          |
| `zoneName` | Text    | Name der Zone |

## Blind

`tplRelBlind` ( _relativ_ setzen) ·`tplAbsBlind` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Blind](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/blind.png)

Eine Jalousie mit dem Fenster, in dem sie hängt: Sie lässt sich mit der Maus ziehen oder mit den Pfeiltasten „Hoch“, „Stopp“ und „Runter“ bedienen. Angezeigt wird der aktuelle Zustand, der in ioBroker die einfallende Lichtmenge angibt.

| Attribut    | Nimmt            | Was es tut                                                                                                                                 |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`      | wählen           | Kontrolle -`auto` Soweit die Bundesstaaten dies zulassen, `level` Schieberegler und Position, `buttons` Nur Schaltflächen (Standard) `auto`) |
| `oid`       | Zustand          | Objekt-ID                                                                                                                                  |
| `oidActual` | Zustand          | Rückmeldung                                                                                                                                |
| `oidUp`     | Zustand          | Hoch                                                                                                                                       |
| `oidStop`   | Zustand          | Stoppen                                                                                                                                    |
| `oidDown`   | Zustand          | Runter                                                                                                                                     |
| `min`       | Nummer           | Minimum                                                                                                                                    |
| `max`       | Nummer           | Maximal                                                                                                                                    |
| `step`      | Nummer           | Schritt                                                                                                                                    |
| `inverted`  | Kontrollkästchen | Umgekehrt                                                                                                                                  |

Der Assistent wählt dieses Widget für die Gerätetypen aus `blind`, `blindButtons`, `gate` Die

## Sperren

`tplRelLock` ( _relativ_ setzen) ·`tplAbsLock` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Sperren](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/lock.png)

Ein Schloss: verriegelt oder nicht, mit dem Türöffner daneben, sofern vorhanden. Es fragt standardmäßig in beide Richtungen nach der Benutzung – ein Armaturenbrett hängt dort, wo jeder vorbeigeht, und eine Haustür wird nicht geöffnet, nur weil der Ärmel den Bildschirm berührt hat. Eine PIN kann dafür festgelegt werden.

| Attribut    | Nimmt            | Was es tut             |
| ----------- | ---------------- | ---------------------- |
| `oid`       | Zustand          | Sperren und Entsperren |
| `oidActual` | Zustand          | Rückmeldung            |
| `oidOpen`   | Zustand          | Türöffner              |
| `inverted`  | Kontrollkästchen | Umgekehrt              |

Der Assistent wählt dieses Widget für die Gerätetypen aus `lock` Die

## Kamera

`tplRelCamera` ( _relativ_ setzen) ·`tplAbsCamera` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Kamera](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/camera.png)

_Das Bild hier ist nur ein Platzhalter, es zeigt keine Kamera._

Das Bild, das eine Kamera aufnimmt: vom Kameraadapter, von einer Türklingel über HTTP oder direkt von einem System, das es überträgt. Ein Standbild muss erneut abgerufen werden, um aktuell zu bleiben; dafür ist das Intervall vorgesehen. Auf einem Grundriss ist die Kamera ein Punkt – der Klick öffnet die Karte, und dort befindet sich das Bild.

| Attribut  | Nimmt   | Was es tut                                                                                                      |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `src`     | Text    | Adresse des Bildes                                                                                              |
| `oid`     | Zustand | Bild aus einem Bundesstaat                                                                                      |
| `refresh` | Nummer  | Alle (s) ein neues Bild (Standardeinstellung) `10`)                                                             |
| `fit`     | wählen  | Wie es die Box ausfüllt —`cover` Füllen und beschneiden, `contain` Alles anzeigen (Standardeinstellung) `cover`) |
| `rotate`  | wählen  | Umgedreht von —`0` Gar nicht, `90` 90°, `180` 180°, `270` 270° (Standard) `0`)                                     |

Der Assistent wählt dieses Widget für die Gerätetypen aus `camera`, `image` Die

## Saugroboter

`tplRelVacuum` ( _relativ_ setzen) ·`tplAbsVacuum` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Saugroboter](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/vacuum.png)

Ein Roboter ist ein Gerät, dem man zwei Befehle gibt – los und zurück – und das man ansonsten nur ansieht. Was er über sich selbst aussagt, sagt er in seinen eigenen Worten, aus dem Objekt selbst heraus: Kein Hersteller stimmt dem zu. Die Karte, die manche Roboter verwenden, ist ein Bild hinter einer Adresse, das die Kamera anzeigt.

| Attribut      | Nimmt   | Was es tut               |
| ------------- | ------- | ------------------------ |
| `oid`         | Zustand | Starten und Stoppen      |
| `oidStatus`   | Zustand | Was es tut               |
| `oidBattery`  | Zustand | Batterie                 |
| `oidCharging` | Zustand | Lädt                     |
| `oidPause`    | Zustand | Pause                    |
| `oidHome`     | Zustand | Zurück zum Dock schicken |
| `oidMode`     | Zustand | Modus                    |

Der Assistent wählt dieses Widget für die Gerätetypen aus `vacuumCleaner` Die

## Spieler

`tplRelMedia` ( _relativ_ setzen) ·`tplAbsMedia` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Spieler](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/media.png)

Was gerade läuft und welche vier Tasten man benutzt. Welche Tasten ein Spieler hat, ist individuell – manche haben einen Modus, der gleichzeitig Wiedergabe und Pause ermöglicht, andere haben für jede Aktion eine eigene Taste. Jede Taste bildet also ein Feld, und die Karte zeigt an, welche Tasten dem Spieler zugewiesen sind. Wo ein Cover vorhanden ist, besteht die Karte hauptsächlich aus diesem Element: Ein Titel in 12 Punkt verrät, was gerade läuft, das Cover zeigt an, welche Tasten man am anderen Ende des Raumes benutzt.

| Attribut      | Nimmt   | Was es tut           |
| ------------- | ------- | -------------------- |
| `oid`         | Zustand | Spielen oder nicht   |
| `oidTitle`    | Zustand | Titel                |
| `oidArtist`   | Zustand | Künstler             |
| `oidCover`    | Zustand | Abdeckung            |
| `oidPlay`     | Zustand | Spielen              |
| `oidPause`    | Zustand | Pause                |
| `oidPrev`     | Zustand | Vorheriger Titel     |
| `oidNext`     | Zustand | Nächster Titel       |
| `oidVolume`   | Zustand | Volumen              |
| `oidMute`     | Zustand | Stumm                |
| `oidElapsed`  | Zustand | Bisher gespielt (s)  |
| `oidDuration` | Zustand | Länge der Strecke(n) |
| `min`         | Nummer  | Minimum              |
| `max`         | Nummer  | Maximal              |

Der Assistent wählt dieses Widget für die Gerätetypen aus `media` Die

## Waschmaschine / Trockner

`tplRelAppliance` ( _relativ_ setzen) ·`tplAbsAppliance` ( _absolut_ festlegen) · Standardkachel 4 Spalten × 4 Zeilen

![Waschmaschine / Trockner](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/appliance.png)

Das einzige Gerät im Haus, das nur aus einem einzigen Grund beachtet wird: ob es schon fertig ist. Der Ring zeigt den Fortschritt des Programms an, die Mitte die verbleibende Zeit und darunter die voraussichtliche Endzeit. Alle Statusanzeigen sind optional – ein Gerät, das nur die verbleibenden Minuten anzeigt, hat statt eines Rings eine sich drehende Trommel.

| Attribut        | Nimmt   | Was es tut                                                                                                                 |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `oid`           | Zustand | Status                                                                                                                     |
| `runValue`      | Text    | Wert während des Betriebs                                                                                                  |
| `oidRunning`    | Zustand | Läuft                                                                                                                      |
| `oidProgram`    | Zustand | Programm                                                                                                                   |
| `oidRemaining`  | Zustand | Übrige Zeit                                                                                                                |
| `remainingUnit` | wählen  | Die verbleibende Zeit zählt —`minutes` Minuten, `seconds` Sekunden `hours` Std, `clock` Stunden:Minuten (Standard) `minutes`) |
| `oidStart`      | Zustand | Begann bei                                                                                                                 |
| `oidEnd`        | Zustand | Bereit bei                                                                                                                 |
| `kind`          | wählen  | Maschine —`washer` Waschmaschine, `dryer` Wäschetrockner `dishwasher` Geschirrspüler (Standard) `washer`)                    |

## Taste

`tplRelButton` ( _relativ_ setzen) ·`tplAbsButton` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Taste](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/button.png)

_schreibt einen Wert_

![Taste](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/button-dialog.png)

_zeigt eine Seite über derjenigen, auf der sie steht._

Beim Drücken passiert etwas, und danach wird nichts angezeigt: eine Szene, ein Skript, eine Türklingel, ein Tor. Bei einem als Impulsrelais geschalteten Relais kann es einen Moment später einen zweiten Wert schreiben und so ein Skript speichern, das nur für diesen Moment existiert. Es kann vor dem Auslösen eine PIN anfordern.

| Attribut       | Nimmt     | Was es tut                                                                                                                              |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `action`       | wählen    | Auf der Presse —`value` Gib einen Wert ein, `navigate` Gehe zu einer Seite, `dialog` Diese Seite über dieser anzeigen (Standard) `value`) |
| `oid`          | Zustand   | Objekt-ID                                                                                                                               |
| `view`         | Ansichten | Seite                                                                                                                                   |
| `dialogSize`   | wählen    | Größe des Dialogs —`small` Klein, `medium` Medium, `large` Groß, `full` Das gesamte Fenster (Standard) `medium`)                           |
| `text`         | Text      | Wort auf den Knopf                                                                                                                      |
| `value`        | Text      | Wert zu schreiben                                                                                                                       |
| `releaseValue` | Text      | Wert nach dem Loslassen                                                                                                                 |
| `releaseAfter` | Nummer    | Nach (ms)                                                                                                                               |
| `color`        | Farbe     | Farbe                                                                                                                                   |

Der Assistent wählt dieses Widget für die Gerätetypen aus `button` Die

## Liste

`tplRelList` ( _relativ_ setzen) ·`tplAbsList` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Liste](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/list.png)

Mehrere Zustände auf einer Karte, jeweils in einer eigenen Zeile: Schalter, Schieberegler und Messwerte. Die Funktion einer Zeile ergibt sich aus ihrem Objekt – ein beschreibbarer boolescher Wert ist ein Schalter, eine Zahl zwischen zwei Grenzwerten ein Schieberegler, alles andere ein Messwert – und auch Name und Symbol einer Zeile werden vom Objekt übernommen.

| Attribut | Nimmt  | Was es tut             |
| -------- | ------ | ---------------------- |
| `rows`   | Nummer | Zeilen (Standard) `3`) |

**Zeilen** – diese Felder existieren einmal pro Zeile und sind nummeriert: `oidRow1`, `oidRow2`, …

| Attribut      | Nimmt   | Was es tut                                                                                                                                                                          |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oidRow`      | Zustand | Zustand                                                                                                                                                                             |
| `rowName`     | Text    | Name                                                                                                                                                                                |
| `rowIcon`     | Symbol  | Symbol                                                                                                                                                                              |
| `rowKind`     | wählen  | Betrieben mit —`auto` Aus dem Objekt heraus `switch` Schalten, `slider` Schieberegler `select` Auswahl, `value` Nur zum Lesen `button` Taste, `delimiter` Trennzeichen (Standard) `auto`) |
| `rowText`     | Text    | Beschriftung des Buttons                                                                                                                                                            |
| `rowTextOn`   | Text    | Das Wort ist zwar wahr                                                                                                                                                              |
| `rowTextOff`  | Text    | Wort während falsch                                                                                                                                                                 |
| `rowIconOn`   | Symbol  | Symbol, wenn aktiv                                                                                                                                                                  |
| `rowIconOff`  | Symbol  | Symbol im inaktiven Zustand                                                                                                                                                         |
| `rowColorOn`  | Farbe   | Farbe bei Aktivität                                                                                                                                                                 |
| `rowColorOff` | Farbe   | Farbe im inaktiven Zustand                                                                                                                                                          |
| `rowUnit`     | Text    | Einheit                                                                                                                                                                             |

## Tisch

`tplRelTable` ( _relativ_ setzen) ·`tplAbsTable` ( _absolut_ festlegen) · Standardmäßig wird die gesamte Breite × 6 Zeilen angezeigt

![Tisch](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/table.png)

Die Zeilen, die ein Status als JSON speichert: die nächsten Abfahrten, die offenen Alarme, die Geräte eines Gateways. Welche Spalten angezeigt werden, kann den Daten überlassen oder einzeln benannt werden, mit Überschrift, Breite, Ausrichtung und dem Text vor und hinter jeder Zelle.

| Attribut         | Nimmt            | Was es tut                                      |
| ---------------- | ---------------- | ----------------------------------------------- |
| `oid`            | Zustand          | Staat mit den Zeilen                            |
| `withHead`       | Kontrollkästchen | Überschriftenzeile (Standard) `true`)           |
| `zebra`          | Kontrollkästchen | Jede zweite Zeile schattiert (Standard) `true`) |
| `headColor`      | Farbe            | Farbe der Überschrift                           |
| `headBackground` | Farbe            | Hintergrund der Überschrift                     |
| `maxRows`        | Nummer           | Höchstens so viele Reihen                       |
| `columns`        | Nummer           | Beschriebene Spalten (Standard) `3`)            |

**Spalten** – diese Felder existieren einmal pro Zeile und sind nummeriert: `columnKey1`, `columnKey2`, …

| Attribut           | Nimmt  | Was es tut                                                                     |
| ------------------ | ------ | ------------------------------------------------------------------------------ |
| `columnKey`        | Brauch | Geben Sie die Daten ein.                                                       |
| `columnTitle`      | Text   | Überschrift                                                                    |
| `columnAlign`      | wählen | Ausrichtung -`left` Links, `center` Zentriert, `right` Rechts (Standard) `left`) |
| `columnWidth`      | Text   | Breite                                                                         |
| `columnPrefix`     | Text   | vor dem Wert                                                                   |
| `columnSuffix`     | Text   | Hinter dem Wert                                                                |
| `columnWords`      | Text   | Ein Wort pro Wert                                                              |
| `columnColor`      | Farbe  | Farbe                                                                          |
| `columnBackground` | Farbe  | Hintergrund                                                                    |
| `columnRules`      | Brauch | Farbe nach Wert                                                                |

## Diagramm

`tplRelChart` ( _relativ_ setzen) ·`tplAbsChart` ( _absolut_ festlegen) · Standardmäßig wird die gesamte Breite × 4 Zeilen als Kachel angezeigt

![Diagramm](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/chart.png)

Was ein Wert als eigenständige Karte bewirkt: zwei Zustände im Vergleich, ein Heiztag, die Leistung der letzten Woche. Der Messwert trägt seine Geschichte hinter seiner Zahl; dies gilt, wenn der Verlauf selbst im Vordergrund steht. Er erfasst nur das, was ein Verlaufsadapter aufzeichnet.

| Attribut  | Nimmt            | Was es tut                                                                                                             |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `oid`     | Zustand          | Objekt-ID                                                                                                              |
| `oid2`    | Zustand          | Zweiter Wert                                                                                                           |
| `hours`   | wählen           | Zeitraum des Diagramms —`1` 1 Stunde, `6` 6 Stunden, `12` 12 Stunden, `24` 1 Tag `72` 3 Tage, `168` 7 Tage (Standard) `24`) |
| `toolbar` | Kontrollkästchen | Schaltflächen für den Zeitraum (Standard) `true`)                                                                      |
| `step`    | Kontrollkästchen | Wert beibehalten                                                                                                       |
| `spline`  | Kontrollkästchen | Glatte Linie                                                                                                           |
| `color`   | Farbe            | Farbe der Linie                                                                                                        |
| `color2`  | Farbe            | Farbe der zweiten Linie                                                                                                |

Der Assistent wählt dieses Widget für die Gerätetypen aus `chart` Die

## Uhr

`tplRelClock` ( _relativ_ setzen) ·`tplAbsClock` ( _absolut_ festlegen) · Standardkachel 4 Spalten × 4 Zeilen

![Uhr](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/clock.png)

_Ziffern, mit dem Datum_

![Uhr](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/clock-analog.png)

_Hände_

Das Einzige auf dem Armaturenbrett, das kein Gerät ist. Ein Tablet an der Wand dient fast den ganzen Tag als Uhr, und eines, dessen Datum man in der Ecke der Systemleiste ablesen muss, ist keine richtige Uhr. Ob mit Zeigern oder Ziffern, mit dem Datum darunter.

| Attribut      | Nimmt            | Was es tut                                                               |
| ------------- | ---------------- | ------------------------------------------------------------------------ |
| `mode`        | wählen           | Hände oder Finger —`analog` Hände, `digital` Ziffern (Standard) `analog`) |
| `withSeconds` | Kontrollkästchen | Mit Sekunden                                                             |
| `withDate`    | Kontrollkästchen | Mit dem Datum                                                            |
| `color`       | Farbe            | Farbe der Hände                                                          |

## Seitenkachel

`tplRelLink` ( _relativ_ setzen) ·`tplAbsLink` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 2 Zeilen

![Seitenkachel](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/link.png)

Eine Karte, die irgendwohin führt: zu einer anderen Seite dieses Projekts oder zu einer eigenen Adresse. Eine Startseite mit einer Kachel pro Raum ist übersichtlicher als eine Liste am Rand, und auf einem Grundriss ist ein Marker, der die Detailseite eines Raums öffnet, die naheliegendste Geste.

| Attribut    | Nimmt               | Was es tut             |
| ----------- | ------------------- | ---------------------- |
| `view`      | Ansichten auswählen | Seite, zu der es führt |
| `url`       | Text                | Adresse stattdessen    |
| `newWindow` | Kontrollkästchen    | In einem eigenen Tab   |
| `subtitle`  | Text                | Zeile unter dem Namen  |
| `color`     | Farbe               | Farbe                  |

## Text

`tplRelText` ( _relativ_ setzen) ·`tplAbsText` ( _absolut_ festlegen) · Standardmäßig wird die gesamte Breite × 1 Zeile als Kachel angezeigt

![Text](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/text.png)

Wörter, die kein Gestaltungselement darstellen: eine Überschrift über einem Abschnitt, ein Raumname auf einem Grundriss, eine Notiz. Sie können nach ihrem Text den Wert eines Zustands tragen und sind nicht von einer Karte umgeben – eine Überschrift in einem Rahmen ist keine Überschrift.

| Attribut | Nimmt            | Was es tut                                                                                                           |
| -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| `text`   | Text             | Text                                                                                                                 |
| `icon`   | Symbol           | Symbol                                                                                                               |
| `oid`    | Zustand          | Nach dem Text angeben                                                                                                |
| `unit`   | Text             | Einheit                                                                                                              |
| `size`   | wählen           | Größe -`header` Überschrift, `title` Titel, `normal` Normal, `small` Klein (Standard) `title`)                          |
| `align`  | wählen           | Ausrichtung -`left` Links, `center` Zentriert, `right` Rechts, `between` Text links, Wert rechts (Standardwert) `left`) |
| `bold`   | Kontrollkästchen | Fett (Standard) `true`)                                                                                              |
| `color`  | Farbe            | Farbe                                                                                                                |

## Webseite

`tplRelIframe` ( _relativ_ setzen) ·`tplAbsIframe` ( _absolut_ festlegen) · Standardkachel 6 Spalten × 4 Zeilen

![Webseite](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/iframe.png)

Eine Webseite innerhalb eines Widgets: eine Kamera, eine Karte eines anderen Adapters, ein Fahrplan, eine Karte. Es kann sich selbst neu laden, wenn sich Seiten nicht von selbst aktualisieren. Was es nicht kann, ist, in die Seite einzugreifen – ein Browser behält einen Frame einer anderen Website in sich selbst, und das ist auch richtig so.

| Attribut    | Nimmt            | Was es tut                    |
| ----------- | ---------------- | ----------------------------- |
| `src`       | Text             | Adresse                       |
| `oid`       | Zustand          | Adresse aus einem Bundesstaat |
| `refresh`   | Nummer           | alle (s) neu laden            |
| `scrolling` | Kontrollkästchen | Mai scrollen                  |
| `radius`    | Nummer           | Abgerundete Ecken             |

## Themenwechsler

`tplRelTheme` ( _relativ_ setzen) ·`tplAbsTheme` ( _absolut_ festlegen) · Standardkachel 4 Spalten × 2 Zeilen

![Themenwechsler](../../../../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/img/standard/theme.png)

Ein Dashboard in einem Flur wird bei Tag und Nacht genutzt, und welches Design dafür verwendet werden soll, kann das Projekt nicht vorhersehen. Die Umschaltung ändert die Laufzeitumgebung selbst, sodass sich alle Karten, Markierungen und das Menü entsprechend anpassen. Die Auswahl wird im Browser gespeichert. Eine Ansicht, die immer im Dunkelmodus angezeigt werden soll, verwendet stattdessen ein bestimmtes Design, während eine Ansicht, die dem Rest des Geräts entsprechen soll, dem Browserdesign folgt.

| Attribut    | Nimmt  | Was es tut                                                                                                                    |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `mode`      | wählen | Was es bewirkt —`toggle` Schalten, `fixed` Immer dieses Thema, `system` Folgen Sie dem Browser (Standardeinstellung). `toggle`) |
| `themeName` | wählen | Thema —`light` Licht, `dark` Dunkel, `modernLight` Licht (neues Design), `modernDark` Dunkel (neues Design) (Standard) `dark`)   |