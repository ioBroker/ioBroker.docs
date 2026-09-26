---
chapters: {"pages":{"en/adapterref/iobroker.vis-fancyswitch/README.md":{"title":{"en":"ioBroker.vis-fancyswitch"},"content":"en/adapterref/iobroker.vis-fancyswitch/README.md"},"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md":{"title":{"en":"fancyswitch for vis-2"},"content":"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-fancyswitch/docs/en/README.md
title: fancyswitch für vis-2
hash: j4fDFWYtMyywY+sjFTvPDLQKG6DPU1NoFVTQSKQTimU=
---
# fancyswitch für vis-2

Das fancyswitch-Set enthält sieben Widgets zum Ein- und Ausschalten von Zuständen: drei Schieberegler, zwei Wippschalter, den Giva Labs iButton und einen kleinen Kippschalter. Diese Seite beschreibt die Version **vis-2** . vis (vis-1) bietet dieselben Widgets mit denselben Einstellungen; dort werden sie jedoch aus Bildern gerendert und können nicht skaliert werden, ohne unscharf zu werden.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/overview.svg)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen und Migration](#requirements-and-migration)
  - [Im Editor eingegebene Werte](#values-entered-in-the-editor)
  - [Einstellungen, die von den fünf Schaltertypen gemeinsam genutzt werden](#settings-shared-by-the-five-switch-styles)
- [Lichtschalter - tplFancySwitch1](#switch-light---tplfancyswitch1)
- [Slider dark - tplFancySwitch2](#slider-dark---tplfancyswitch2)
- [Schieberegler Dunkel EIN/AUS - tplFancyDarkAnAus](#slider-dark-onoff---tplfancydarkanaus)
- [Schieberegler dunkel AUS/EIN - tplFancyDarkAnAusRev](#slider-dark-offon---tplfancydarkanausrev)
- [Wippschalter - tplFancyDarkAnAusWippe](#rocker-switch---tplfancydarkanauswippe)
- [Giva Labs iButton - tplFancyGivaIButton](#giva-labs-ibutton---tplfancygivaibutton)
- [Kippschalter - tplFancyToggleswitch](#toggle-switch---tplfancytoggleswitch)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein

### Anforderungen und Migration

Die Widgets befinden sich im Widget-Set **„fancyswitch“** in der Widget-Liste des vis-2-Editors. Die hier beschriebenen React-Versionen benötigen **vis-2 2.12.8** oder neuer. Ältere vis-2-Versionen zeigen stattdessen die vis-1-Widgets an.

Mit vis-1 erstellte Projekte funktionieren weiterhin ohne Änderungen. Beide Versionen verwenden dieselben Widget-IDs (`tplFancySwitch1`, `tplFancyGivaIButton`, …) und dieselben Attributnamen, und vis-2 wählt die React-Version automatisch aus. Alle Einstellungen werden übernommen.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

### Im Editor eingegebene Werte

Beim Klicken auf das Widget werden die _Werte „Wahr“_ und _„Falsch“_ im Zustand gespeichert und mit dem aktuellen Zustandswert verglichen. Der Editor speichert diese Werte als Text, und das Widget wandelt den Text folgendermaßen um:

| Eingegebener Text  | An den Staat geschrieben |
| ------------------ | ------------------------ |
| _(leer)_           | `1` resp. `0`            |
| `true`             | die boolesche `true`     |
| `false`            | die boolesche `false`     |
| `0`, `1`, `23.5`   | diese Zahl               |
| `ON`, `closed`, … | dieser Text              |

Ein Zustandswert zählt als **eingeschaltet** , wenn

- Es handelt sich um eine Zahl größer als Null oder um einen Text, der wie eine solche Zahl aussieht, oder
- Sein Text entspricht exakt dem _Wahrheitswert_ , was der Art und Weise entspricht, wie Zustände wie `ON` /`OFF` Arbeit oder
- Es handelt sich um einen booleschen Wert. `true` und _der wahre Wert_ bedeutet "ein" (`true`, `1` oder eine beliebige positive Zahl).

`null` Und `undefined` werden als der _Wert „Falsch“_ behandelt.

### Einstellungen, die von den fünf Schaltertypen gemeinsam genutzt werden

`tplFancySwitch1`, `tplFancySwitch2`, `tplFancyDarkAnAus`, `tplFancyDarkAnAusRev` Und `tplFancyDarkAnAusWippe` Alle bieten die gleichen Einstellungen.

| Einstellung                      | Attribut                  | Beschreibung                                                                                                                               |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Objekt-ID                        | `oid`                     | Der angezeigte und geschriebene Status. Ohne ihn wird das Widget nur im „Aus“-Zustand angezeigt und ist nicht anklickbar.                  |
| Falscher Wert                    | `valFalse`                | Wert, der beim Ausschalten des Schalters geschrieben wird. Standardwert. `0` Die                                                            |
| Wahrer Wert                      | `valTrue`                 | Wert, der beim Einschalten des Schalters geschrieben wird. Standardwert. `1` Die                                                            |
| Zustand umkehren                 | `invert`                  | Zeigt und schreibt das Gegenteil – nützlich für einen Zustand, in dem `0` bedeutet "an".                                                    |
| Automatische Abschaltung in (ms) | `autoOff`                 | Nach dieser Anzahl Millisekunden wird der entgegengesetzte Wert wieder geschrieben. `0` schaltet die Funktion aus.                          |
| Nur lesen                        | `readOnly`                | Das Widget zeigt den Status an, reagiert aber nicht auf Klicks.                                                                            |
| Beschriftung (links/rechts)      | `text_false` /`text_true` | Der Text jeder Hälfte. `text_true` Die Hälfte bedeutet immer „ein“, also die linke für _Slider Dark EIN/AUS_ . Für keinen Text leer lassen. |

Durch Klicken auf eine Hälfte wird in den Zustand gewechselt, dessen Bezeichnung diese Hälfte trägt. `ON` schaltet den Zustand ein und durch Klicken `OFF` Es wird deaktiviert. Das Widget behält das Seitenverhältnis seiner Zeichnung bei, sodass ein breiter oder höher dargestelltes Widget scharf und zentriert in seinem Feld bleibt.

## Lichtschalter - tplFancySwitch1

![Lichtschalter](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/switch1.svg)

Der leuchtende Kippschalter: Ein Knopf ist in der Mitte beweglich. Die Hälfte, die den aktuellen Zustand anzeigt, ist gedrückt, die andere Hälfte richtet sich zum Betrachter hin auf und wirft einen Schatten; beim Zustandswechsel kippt der Knopf um. Beide Beschriftungen bleiben sichtbar; nichts leuchtet auf.

Einstellungen: siehe [Einstellungen, die von den fünf Schalterstilen gemeinsam genutzt werden](#settings-shared-by-the-five-switch-styles) .

## Slider dark - tplFancySwitch2

![Schieberegler dunkel](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/switch2.svg)

Der dunkle Schieberegler auf einem dunklen Bedienfeld. Der Drehknopf und beide Beschriftungen befinden sich auf einem Streifen, der wie bei einem echten Schiebeschalter hinter den Rahmen gleitet: Die Beschriftung des aktuellen Zustands ist sichtbar, die andere ist unter dem Rahmen verborgen. Beim Zustandswechsel gleitet der Streifen zur Seite. `ON` Die Beschriftung leuchtet cyan. Die Beschriftungen können beliebige kurze Texte sein, zum Beispiel `0` Und `I` Die

Einstellungen: siehe [Einstellungen, die von den fünf Schalterstilen gemeinsam genutzt werden](#settings-shared-by-the-five-switch-styles) .

## Schieberegler Dunkel EIN/AUS - tplFancyDarkAnAus

![Schieberegler Dunkelheit EIN/AUS](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/dark_an_aus.svg)

Derselbe Schieberegler ohne Bedienfeld, mit der Beschriftung „Ein“ auf der **linken** Hälfte (`EIN` /`AUS` (standardmäßig).

Einstellungen: siehe [Einstellungen, die von den fünf Schalterstilen gemeinsam genutzt werden](#settings-shared-by-the-five-switch-styles) .

## Schieberegler dunkel AUS/EIN - tplFancyDarkAnAusRev

![Schieberegler Dunkelheit AUS/EIN](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/dark_aus_an.svg)

Die gespiegelte Version, bei der sich das „On“-Label auf der **rechten** Hälfte befindet.

Einstellungen: siehe [Einstellungen, die von den fünf Schalterstilen gemeinsam genutzt werden](#settings-shared-by-the-five-switch-styles) .

## Wippschalter - tplFancyDarkAnAusWippe

![Kippschalter](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/rocker.svg)

Eine Taste mit Scharnier in der Mitte, ähnlich einem [Lichtschalter](#switch-light---tplfancyswitch1) : Die eine Hälfte im aktuellen Zustand ist gedrückt, die andere steht oben. Beim Zustandswechsel kippt die Taste in ihre Mittelstellung. Die „Ein“-Hälfte leuchtet cyan, solange sie gedrückt wird. Die obere Reihe zeigt die dunkle, die untere die helle Variante.

Abgesehen von den [gemeinsamen Einstellungen](#settings-shared-by-the-five-switch-styles) :

| Einstellung   | Attribut     | Beschreibung                                      |
| ------------- | ------------ | ------------------------------------------------- |
| Leichter Stil | `lightStyle` | Zeichnet die helle Variante anstelle der dunklen. |

## Giva Labs iButton - tplFancyGivaIButton

![iButton](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/ibutton.svg)

Ein Schiebeschalter mit blauer „Ein“-Oberfläche. Der Griff kann geklickt oder gezogen werden.

| Einstellung                  | Attribut              | Beschreibung                                                                                                                                                               |
| ---------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                    | `oid`                 | Der Zustand. Das Widget schreibt die booleschen Werte. `true` Und `false` Die                                                                                                |
| Nur lesen                    | `readOnly`            | Das Widget zeigt den Status an, reagiert aber nicht.                                                                                                                       |
| Prüfen                       | `test`                | Zeigt den Schalter in der Position „Ein“ an, während der Editor geöffnet ist, sodass das Erscheinungsbild auch ohne Status überprüft werden kann.                          |
| Beschriftung für „EIN“/„AUS“ | `labelOn` /`labelOff` | Die beiden Texte. Standard `ON` Und `OFF` Die                                                                                                                                |
| Griffgröße ändern            | `resizeHandle`        | `auto` Die Größenangaben auf den Etiketten sollten angepasst werden, sobald sie von den Angaben auf dem Griff abweichen. `ON` /`OFF`, `true` stets, `false` niemals (33 px). |
| Containergröße ändern        | `resizeContainer`     | `auto` wie oben; `false` Die Leiste wird so breit wie das Widget, was die einfachste Möglichkeit ist, ihr eine feste Größe zu geben.                                        |
| Drag & Drag aktivieren       | `enableDrag`          | Der Griff kann gezogen statt nur angeklickt werden.                                                                                                                        |
| Animation                    | `enableFx`            | Der Griff gleitet, anstatt zu springen.                                                                                                                                    |
| Wirkungsdauer (ms)           | `duration`            | Dauer dieser Animation. Standardwert `200` Die                                                                                                                              |

Der Balken ist 27 Pixel hoch – die Höhe des Originals – und ist im Widget vertikal zentriert.

## Kippschalter - tplFancyToggleswitch

![Kippschalter](../../../../../en/adapterref/iobroker.vis-fancyswitch/docs/img/toggleswitch.svg)

Zwei Beschriftungen mit einem kleinen Schieber dazwischen. Durch Klicken auf eine Beschriftung oder den Track wird umgeschaltet.

| Einstellung                 | Attribut                      | Beschreibung                                                                  |
| --------------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| Objekt-ID                   | `oid`                         | Der Zustand. Das Widget schreibt die booleschen Werte. `true` Und `false` Die   |
| Nur lesen                   | `readOnly`                    | Das Widget zeigt den Status an, reagiert aber nicht.                          |
| Prüfen                      | `test`                        | Zeigt den Schalter in der Position „Ein“ an, während der Editor geöffnet ist. |
| Bezeichnung für falsch/wahr | `text_false` /`text_true`     | Die beiden Texte. Standard `OFF` Und `ON` Die                                   |
| Hervorhebungsschalter       | `highlight_switch`            | Füllt die Schiene bis zum Griff, solange der Schalter eingeschaltet ist.      |
| Breite                      | `width`                       | Spurbreite zwischen den Beschriftungen in Pixeln. Standardwert `40` Die        |
| HTML vorher/nachher         | `html_prepend` /`html_append` | Freier HTML-Code links und rechts vom Schalter, wie in vis-1.                 |

Anders als in vis-1 benötigt dieses Widget kein jQuery UI Stylesheet mehr: Es verwendet die Farben des vis-2 Themes und funktioniert daher auch im dunklen Theme.

## Unterschiede zu vis-1

- Die Widgets werden als SVG gezeichnet, anstatt aus einer PNG-Datei ausgeschnitten zu werden, sodass sie frei in der Größe verändert werden können.
- Die Bezeichnungen der fünf Schalterstile sind jetzt Einstellungen; in vis-1 waren sie Teil des Bildes.
- Die Schalter bewegen sich, wenn sich der Zustand ändert: Die Schieber gleiten, ihre Beschriftungen bewegen sich mit dem Drehknopf, und die Kipphebel kippen über ihre Mittelstellung hinaus. In vis-1 sprang das Bild.
- Ein boolescher Zustand wird als "ein" erkannt, wenn _der Wert "True_ " auf seinem Standardwert belassen wird. `1`. In vis-1 a `true` wurde mit dem Text verglichen `1` und passten nie zusammen, deshalb blieb ein solches Widget deaktiviert.
- Im _Modus „Slider dark ON/OFF“_ schalten beide Hälften in den Zustand, den ihre Beschriftung anzeigt. Im Modus „vis-1“ schrieb die linke Hälfte immer den _Wert „False“_ , obwohl sie die … enthält. `EIN` Etikett.
- Der farbige Teil des Kippschalters vergrößert sich in Richtung „Ein“. In vis-1 füllte er die gesamte Spur aus, obwohl der Schalter ausgeschaltet war, da der jQuery UI-Schieberegler entsprechend konfiguriert war. `range: "max"` Die
- Jedes Widget bietet die _Option „Nur lesen“_ .
- Der leichte Kippschalter beleuchtet seine Taste mit einem dunkleren Cyan, das auf der hellen Oberfläche gut lesbar ist.