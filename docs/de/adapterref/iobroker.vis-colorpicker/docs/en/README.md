---
chapters: {"pages":{"en/adapterref/iobroker.vis-colorpicker/README.md":{"title":{"en":"ioBroker.vis-colorpicker"},"content":"en/adapterref/iobroker.vis-colorpicker/README.md"},"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md":{"title":{"en":"Color picker widgets for vis-2"},"content":"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-colorpicker/docs/en/README.md
title: Farbauswahl-Widgets für vis-2
hash: LrfdTjl5kBtZA/uSdmv1dVd5PgBtNkyi+hCP/zXXvIA=
---
# Farbauswahl-Widgets für vis-2
Neun Widgets zum Einstellen und Anzeigen von Farben: drei allgemeine Farbauswahlfelder, eines für Homematic-Lampen und fünf für Philips Hue-Lampen. Diese Seite beschreibt die **vis-2**-Version. vis (vis-1) bietet dieselben Widgets mit denselben Einstellungen, wird jedoch mit jQuery-Bibliotheken anstelle von React dargestellt.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
- [Anforderungen und Migration](#requirements-and-migration)
- [Woher die Farbe kommt und wohin sie geht](#where-the-colour-comes-from-and-where-it-goes)
- [Faktor und Genauigkeit](#factor-and-precision)
- [Der Picker im Widget](#the-picker-in-the-widget)
- [Wenn die Farbe angegeben ist](#when-the-colour-is-written)
- [Dunkles Design](#dark-theme)
- [Philips HUE: Ein Befehl pro Änderung](#philips-hue-one-command-per-change)
- [Farbraum einer Lampe](#Farbraum-einer-Lampe)
- [RGB-Spektrum - `tplRGBSpectrum`](#rgb-spectrum---tplrgbspectrum)
- [Homematic spectrum - `tplSpectrumHomematic`](#homematic-spectrum---tplspectrumhomematic)
- [Farbrad - `tplRGBFarbtastic`](#color-wheel---tplrgbfarbtastic)
- [RGB color - `tplJscolor`](#rgb-color---tpljscolor)
- [Philips HUE - `tplHUEjscolor`](#philips-hue---tplhuejscolor)
- [HUE XY picker - `tplHUEPickerXY`](#hue-xy-picker---tplhuepickerxy)
- [HUE XY Indikator - `tplHUEIndicatorXY`](#hue-xy-indicator---tplhueindicatorxy)
- [HUE CT picker - `tplHUEPickerCT`](#hue-ct-picker---tplhuepickerct)
- [HUE CT Indikator - `tplHUEIndicatorCT`](#hue-ct-indicator---tplhueindicatorct)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein
### Anforderungen und Migration
Die Widgets befinden sich im Widget-Set „Farbauswahl“ des vis-2-Editors. Die hier beschriebenen React-Versionen benötigen **vis-2 2.12.8** oder neuer; bei älteren vis-2-Versionen werden stattdessen die vis-1-Widgets verwendet.

Mit vis-1 erstellte Projekte funktionieren weiterhin unverändert. Beide Versionen verwenden dieselben Widget-IDs (`tplRGBSpectrum`, `tplJscolor`, `tplHUEjscolor`, ...) und dieselben Attributnamen. vis-2 wählt die passende React-Version automatisch aus. Alle Einstellungen werden übernommen.

In den folgenden Tabellen ist **Einstellung** die Bezeichnung im vis-2-Editor und **Attribut** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt als JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

### Woher die Farbe kommt und wohin sie geht
Die meisten Widgets können gleichzeitig an drei Zustandsgruppen gebunden werden. Jede ausgefüllte Gruppe wird **beschrieben**, wenn sich die Farbe ändert:

| Gruppe | Attribute | Was wird gespeichert? |
|---|---|---|
| RGB-Zeichenkette | `rgb-oid` | `#ff8800`. Ausgelesen werden `#rgb`, `#rrggbb`, `rgb(255,136,0)`, `hsl(...)`, `hsv(...)` und `white` / `black`. |
| Farbton, Sättigung, Helligkeit | `hue-oid`, `sat-oid`, `bri-oid` | Farbton 0…360 plus zwei Werte, deren Bereich vom Widget abhängt (siehe unten). Alle drei müssen eingestellt werden. |
| Farbton, Sättigung, Helligkeit | `hue-oid`, `sat-oid`, `bri-oid` | Farbton 0…360 plus zwei Werte, deren Bereich vom Widget abhängt, siehe unten. Alle drei müssen eingestellt werden. |

**Für die Farbdarstellung gewinnt die erste Gruppe mit einem Wert:** Die RGB-Zeichenkette vor den drei Kanälen und die vor Farbton/Sättigung/Helligkeit. Dies entspricht der Reihenfolge, in der die vis-1-Widgets ihre Handler gebunden haben, wobei der letzte Handler die angezeigte Farbe bestimmte.

Die beiden Spektrum-Widgets und das Farbrad arbeiten mit **HSL**: Sättigung und Helligkeit entsprechen `0...1` und werden beim Schreiben mit dem *Faktor* multipliziert. *RGB-Farbe* und *Philips-Farbton* arbeiten mit **HSV**, wie jscolor zuvor: Sättigung und Wert entsprechen `0...100` und werden durch den *Faktor* **dividiert**. Ein Widget ohne Zustand zeigt lediglich ein graues Schachbrettmuster an.

### Faktor und Genauigkeit
| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Faktor | `factor` (`divisor` in *Philips HUE*) | 1 | Die Zustände werden beim Lesen mit diesem Faktor multipliziert und beim Schreiben durch ihn dividiert. `255` wandelt Kanäle, die von 0 bis 1 laufen, in 0…255 um, `100` wandelt eine Sättigung von 0…1 in Prozent um. |
| Genauigkeit | `dezimal` | 0 | Nachkommastellen der geschriebenen Werte. |

### Die Auswahlliste im Widget
![RGB-Spektrum](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/spectrum.png)

Widgets, die in vis-1 nur ein kleines Farbfeld anzeigten, verfügen nun über die Einstellung **Farbauswahl im Widget** (`inline`). Dadurch ist das Widget selbst die Farbauswahl - kein Popup, kein Klick erforderlich, ideal für ein Wandpanel. Geben Sie dem Widget ausreichend Platz: etwa 200 x 150 Pixel für ein Quadrat mit Farbbalken.

Ohne diese Option zeigt das Widget das Farbfeld an, und ein Klick darauf öffnet das darunterliegende Bedienfeld. Das Bedienfeld schließt sich durch einen Klick an einer anderen Stelle oder durch Drücken der Escape-Taste.

### Wenn die Farbe geschrieben wird
*RGB-Spektrum* und *Homöomatisches Spektrum* speichern die Farbe beim Drücken von **Auswählen**, wie bereits in vis-1 - eine Lampe folgt also nicht jeder Zwischenfarbe. Alle anderen Widgets speichern die Farbe während des Ziehens, maximal alle 200 ms, und ein weiteres Mal beim Loslassen.

Während Sie ziehen, zeigt das Widget Ihre Farbe an, auch wenn die Zustände langsamer oder etwas anders reagieren; nach 1,5 Sekunden ohne Änderung folgt es wieder den Zuständen.

### Dunkles Design
![Dunkles Thema](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/dark-theme.png)

Das Bedienfeld, seine Schaltflächen und die Texte sind in den Farben des Vis-2-Designs gehalten. Die Farben der Auswahlfelder selbst sind in beiden Designs natürlich identisch.

### Philips Hue: Ein Befehl pro Änderung
Die fünf HUE-Widgets schreiben die Farbe nicht in `xy` oder `ct` - sie schreiben **einen Befehl** in den `command`-Zustand der Lampe, wie es der `hue`-Adapter erwartet:

```json
{ "transitiontime": 4, "xy": "0.4,0.4", "level": 80 }
{ "transitiontime": 4, "ct": "370" }
```

`transitiontime` ist die Einstellung *Übergangszeit* in Zehntelsekunden. `level` ist nur dann Teil des Befehls, wenn eine *Level-ID* konfiguriert ist - andernfalls würde die Einstellung einer Farbe auch die Helligkeit der Lampe ändern.

Wenn Sie im Editor den Befehlszustand auswählen, füllt das Widget die daneben stehenden Zustände (`xy`, `level`, `ct`) und den Farbraum aus dem Lampenmodell aus - die gleiche Hilfe, die die Vis-1-Widgets boten.

### Farbspektrum einer Lampe
![Farbpalette](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/gamut.png)

Eine Lampe kann nicht alle Farben erzeugen. *Farbraum/Modell* verwendet den Farbraumbuchstaben **A**, **B** oder **C** oder das Lampenmodell (`LCT001`, `LST002`, ...); ein leeres Feld stellt die gesamte Farbpalette dar. Das Farbfeld wird auf den Farbraum vergrößert, und Farben, die eine Lampe nicht darstellen kann, werden etwas dunkler gezeichnet.

## RGB-Spektrum - `tplRGBSpectrum`
![RGB-Spektrum](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/spectrum.png)

Ein Farbfeld, das eine Farbauswahl mit einem Sättigungsquadrat und einem Farbtonbalken öffnet - das Widget, das Spectrum in Vis-1 gezeichnet hat.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| RGB-ID | `rgb-oid` | | Zustand mit der Farbe als Zeichenkette. |
| Rot / Grün / Blau ID | `red-oid`, `green-oid`, `blue-oid` | | Die drei Kanäle, 0...255. |
| Farbton / Sättigung / Helligkeit ID | `hue-oid`, `sat-oid`, `bri-oid` | | Farbton 0...360, Sättigung und Helligkeit 0...1 mal *Faktor*. |
| Faktor / Genauigkeit | `factor`, `decimal` | 1 / 0 | Siehe [Faktor und Präzision](#factor-and-precision). |
| Faktor / Genauigkeit | `Faktor`, `Dezimal` | 1 / 0 | Siehe [Faktor und Genauigkeit](#Faktor-und-Genauigkeit). |

Die Farbe wird mit **Auswählen** gekennzeichnet; **Abbrechen** belässt den Zustand unverändert.

## Homematic-Spektrum - `tplSpectrumHomematic`
![Homöomatisches Spektrum](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/homematic.png)

Eine Homematic RGBW-Lampe benötigt eine Zahl: `0...199` ist die Position auf dem Farbkreis, `200` ist Weiß. Die Farbauswahl besteht daher aus dem Farbtonregler und einer Taste für Weiß.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Farb-ID | `color-oid` | | Lichtzustand, 0...200. |
| Auswahlfeld im Widget | `inline` | aus | Zeigt das Auswahlfeld anstelle des Farbfelds an. |

Die Farbe wird mit **Auswählen** angegeben. Das Ende des Balkens bleibt bei 199: In vis-1 wurde das letzte Pixel des Balkens auf 200 aufgerundet und das Licht weiß.

## Farbrad - `tplRGBFarbtastic`
![Farbkreis](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/farbtastic.png)

Das Rad: Der Ring bestimmt den Farbton, das Quadrat darin die Sättigung und die Helligkeit. Das Widget *ist* der Farbwähler und gibt während des Ziehens Eingaben aus.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| RGB-ID | `rgb-oid` | | Zustand mit der Farbe als Zeichenkette. |
| Farbton / Sättigung / Helligkeit ID | `hue-oid`, `sat-oid`, `bri-oid` | | Farbton 0...360, Sättigung und Helligkeit 0...1 mal *Faktor*. |
| Faktor / Genauigkeit | `factor`, `decimal` | 1 / 0 | Siehe [Faktor und Präzision](#factor-and-precision). |
| Faktor / Genauigkeit | `Faktor`, `Dezimal` | 1 / 0 | Siehe [Faktor und Genauigkeit](#Faktor-und-Genauigkeit). |

Das Rad ist immer der größte Kreis, der in das Widget passt und in seiner Mitte bleibt, daher kann das Widget jede beliebige Größe haben - in vis-1 waren es drei Bilder von 196 x 196 Pixeln.

## RGB-Farbe - `tplJscolor`
![RGB-Farbe](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/rgb_color.png)

Ein Label mit einem Farbfeld, das die Farbauswahl von jscolor öffnet: das Sättigungsfeld mit Farbtonleiste und einem Schließen-Button. Es schreibt während des Ziehens der Farbe.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Titel | `title` | `RGB:` | Text vor dem Farbfeld. |
| RGB-ID | `rgb-oid` | | Zustand mit der Farbe als Zeichenkette. |
| Auswahlfeld im Widget | `inline` | aus | Zeigt das Auswahlfeld anstelle des Farbfelds an. |
| Rot / Grün / Blau ID | `red-oid`, `green-oid`, `blue-oid` | | Die drei Kanäle, 0...255. |
| Farbton / Sättigung / Helligkeit ID | `hue-oid`, `sat-oid`, `bri-oid` | | Farbton 0...360, Sättigung und Wert 0...100 geteilt durch *Faktor*. |
| Faktor / Genauigkeit | `factor`, `decimal` | 1 / 0 | Siehe [Faktor und Präzision](#factor-and-precision). |
| Faktor / Genauigkeit | `Faktor`, `Dezimal` | 1 / 0 | Siehe [Faktor und Genauigkeit](#Faktor-und-Genauigkeit). |

## Philips HUE - `tplHUEjscolor`
![Philips Hue](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/hue_color.png)

Ein Knopf in der aktuellen Lampenfarbe. Ein Klick öffnet das Farbfeld der Lampe mit einem danebenliegenden Helligkeitsregler; beide senden beim Verschieben einen Befehl an die Lampe.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Befehls-ID | `command-oid` | | Der `command`-Zustand der Lampe. Durch Auswahl dieses Befehls werden die drei unten stehenden Felder ausgefüllt. |
| Level-ID | `level-oid` | | Der Zustand `level`, 0...100. Nur in diesem Zustand zeigt das Bedienfeld den Helligkeitsregler und den Befehl `level` an. |
| Farbraum/Modell | `gamut` | | Siehe [Farbspektrum einer Lampe](#gamut-of-a-lamp). |
| Übergangszeit | `transitionTime` | 4 | Zehntelsekunden, die die Lampe für den Wechsel benötigt. |
| Auswahlfeld im Widget | `inline` | aus | Zeigt das Farbfeld anstelle der Schaltfläche an. |
| Picker-Breite / -Höhe | `pickerWidth`, `pickerHeight` | 100 | Größe des Farbfelds im Panel in Pixeln. Hat keine Auswirkung, wenn sich der Picker im Widget befindet. |
| Hintergrundfarbe | `pickerBackground` | | Hintergrund hinter dem Farbfeld. |
| Schaltflächentext | `buttonName` | `HUE` | Text auf der Schaltfläche. |
| Schließen-Schaltfläche | `closeButton` | `close` | Beschriftung der Schaltfläche zum Schließen des Panels. Ein leeres Feld blendet sie aus. |
| Rot-/Grün-/Blau-ID, Teiler, Genauigkeit, RGB-ID | `red-oid`, ..., `divisor`, `decimal`, `rgb-oid` | | Die Farbe der Lampe wird ebenfalls in diese Zustände geschrieben, z. B. um sie für eine Szene beizubehalten. |
| Farbton-/Sättigungs-/Helligkeits-ID | `hue-oid`, `sat-oid`, `bri-oid` | | Entspricht HSV: Farbton 0...360, Sättigung und Helligkeit 0...100 geteilt durch *Divisor*. |
| Farbton-/Sättigungs-/Helligkeits-ID | `hue-oid`, `sat-oid`, `bri-oid` | | Entspricht HSV: Farbton 0...360, Sättigung und Helligkeit 0...100 geteilt durch *Divisor*. |

Die Farbe des Knopfes entspricht der Farbe des Punktes, immer bei voller Helligkeit - wie in vis-1, wo die Helligkeit über einen eigenen Schieberegler eingestellt werden konnte.

## Farbton-XY-Auswahl - `tplHUEPickerXY`
![Farbpalette](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/gamut.png)

Das Farbfeld der Lampe ist so groß wie das Widget. Ein Klick oder eine Ziehbewegung löst den Befehl aus.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Befehls-ID | `command-oid` | | Der `command` Zustand der Lampe. |
| Farbraum/Modell | `gamut` | | Siehe [Farbspektrum einer Lampe](#gamut-of-a-lamp). |
| Übergangszeit | `transitionTime` | 4 | Zehntelsekunden. |
| Übergangszeit | `transitionTime` | 4 | Zehntelsekunden. |

## HUE XY-Indikator - `tplHUEIndicatorXY`
![Indikatoren](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/indicators.png)

Füllt das Widget mit der Farbe, auf die die Lampe eingestellt ist. Es zeigt nur an.

| Einstellung | Attribut | Beschreibung |
|---|---|---|
| XY-ID | `xy-oid` | Der `xy` Zustand der Lampe. |
| Farbraum/Modell | `Farbraum` | Die Farbe wird mit dem Farbraum der Lampe umgerechnet. |

## HUE CT Picker - `tplHUEPickerCT`
![Farbtemperatur](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/ct.png)

Ein Balken reicht von warmweiß bis kaltweiß. Mit einem Klick lässt sich die Farbtemperatur der Lampe einstellen.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| Befehls-ID | `command-oid` | | Der `command` Zustand der Lampe. |
| Übergangszeit | `transitionTime` | 4 | Zehntelsekunden. |
| Einheit | `ctUnit` | Mired | Wie der Zustand die Temperatur hält. Eine Philips HUE Lampe verwendet **mired** (153…500); Lampen vieler anderer Adapter verwenden **Kelvin**. |
| Wärmste / Kälteste | `ctMin`, `ctMax` | 2000 / 6500 | Die beiden Enden des Balkens in Kelvin. Eine Lampe, die nur 2700-4000 K abdeckt, erreicht so ihren gesamten Farbbereich über die gesamte Breite des Widgets. |
| Wärmste / Kälteste | `ctMin`, `ctMax` | 2000 / 6500 | Die beiden Endpunkte des Balkens in Kelvin. Eine Lampe, die nur 2700-4000 K abdeckt, erreicht so ihren gesamten Bereich über die gesamte Breite des Widgets. |

Bei *Mired* wird der von der HUE-API gewünschte Mired-Wert übertragen, begrenzt auf 153…500; bei *Kelvin* wird die Temperatur unverändert ausgegeben.

## HUE CT-Indikator - `tplHUEIndicatorCT`
![Indikatoren](../../../../../en/adapterref/iobroker.vis-colorpicker/docs/img/indicators.png)

Das Widget zeigt die Farbe der eingestellten Weißtemperatur der Lampe an. Es zeigt nur diesen Wert an.

| Einstellung | Attribut | Standardwert | Beschreibung |
|---|---|---|---|
| CT-ID | `ct-oid` | | Zustand mit der Temperatur. |
| Wärmste / Kälteste | `ctMin`, `ctMax` | 2000 / 6500 | Der Bereich, in dem der Wert gespeichert wird. |
| Wärmste / Kälteste | `ctMin`, `ctMax` | 2000 / 6500 | Der Bereich, in dem der Wert gespeichert wird. |

## Unterschiede zu vis-1
Die React-Widgets funktionieren genauso wie die vis-1-Widgets und verwenden dieselben Attribute. Was ist der Unterschied?

- **Keine jQuery-Bibliotheken mehr.** spectrum, jscolor, farbtastic und der CIE-Helper von huepi werden nicht mehr geladen;

Die Farbauswahlfelder werden mit CSS und einem Canvas gezeichnet. Die mathematischen Grundlagen der HUE-Widgets sind unverändert und wurden eins zu eins übernommen - lediglich ein Punkt am Rand der Ebene (`y = 0`) erzeugt nun keine undefinierte Farbe mehr.

- **Der CT-Indikator ist ebenfalls ein React-Widget.** Seine vis-1-Vorlage ist mit `data-vis-2-ignore` gekennzeichnet.

Das Attribut „vis-2“ wird heute nicht ausgewertet, daher wurde es dort als EJS-Widget angezeigt.

- **Die Farbcodebuchstaben A, B und C funktionieren.** Der Tooltip von vis-1 hatte dies zwar versprochen, aber es wurden nur Modell-IDs erkannt.
- **Der *Divisor* des Philips Hue-Widgets wird verwendet.** Der Code vis-1 las dort „Faktor“, was das Widget auch tat.

nicht haben - der Divisor war immer 1.

- **Das Farbrad gibt eigentlich Farbton/Sättigung/Helligkeit an.** In Vis-1 führte diese Bindung zu einem Fehler, und das Lesen

Es behandelte die drei Werte als Rot, Grün und Blau.

- **Das Spektrum rundet Sättigung und Helligkeit nicht mehr.** Der Code vis-1 rundete die Werte von `0...1` auf

Es las ganze Zahlen ein, sodass eine Sättigung von 50 % zu 1 wurde.

- **Der Farbton wird als Zahl geschrieben**, nicht als Text - `tplJscolor` und `tplHUEjscolor` haben ihn mit `toFixed()` geschrieben.
- ** `level` ist nur dann im Befehl enthalten, wenn eine *Level-ID* festgelegt ist**, daher wird bei einer Farbänderung nicht auch die Helligkeit angepasst.
- **Ein Widget ohne Wert bleibt leer** (ein graues Schachbrettmuster), anstatt Weiß oder die Mitte des Feldes anzuzeigen.

Farbfeld.

- **Touch funktioniert.** Die Auswahlfelder reagieren auf Mausbewegungen, d. h. ein Finger steuert sie wie eine Maus; vis-1 reagiert nur auf Mausbewegungen.

für Mausereignisse.

- **Das Farbfeld der HUE-Widgets wird einmalig** mit 160 x 160 Pixeln berechnet und vom Browser skaliert. vis-1

Bei jeder Änderung wurde jedes Pixel des Widgets neu berechnet, was bei einem großen Auswahlfeld zu einer langsamen Performance führte.

- **Das Panel gehört zum Widget.** jscolor platziert sein Popup im Seiteninhalt; das React-Panel hängt darunter.

Das Widget bewegt sich selbst wieder ins Fenster zurück, wenn es dieses verlassen würde, und wird durch Drücken der Escape-Taste geschlossen.

- **Der Titel von *RGB-Farbe* ist Text.** vis-1 hat ihn als HTML in die Seite geschrieben; das React-Widget zeigt ihn als Text an.

und dekodiert nur Entitäten wie `&nbsp;`, sodass ein alter Titel immer noch so gelesen wird wie zuvor.

- **Neue Einstellungen:** *Auswahlfeld im Widget* für die vier Widgets mit Farbfeld sowie *Einheit*, *Wärmeteste* und

*Am kältesten* für die beiden CT-Widgets.