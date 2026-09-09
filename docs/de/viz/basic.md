---
title:       "Mitgelieferte Widgets"
lastChanged: "09.09.2026"
---

# Mitgelieferte Widgets

vis und vis-2 bringen fünf Widgetsätze selbst mit. Sie sind nach der
Installation sofort in der Palette und brauchen keinen weiteren Adapter:

| Satz | Inhalt |
| --- | --- |
| `basic` | Text, Zahl, Bild, Rahmen, Navigation: die Grundbausteine |
| `jqui` | Knöpfe, Eingabefelder, Auswahllisten, Schieberegler, Dialoge |
| `jqplot` | ein Zeigerinstrument |
| `swipe` | Seitenwechsel per Fingerwisch und ein Karussell |
| `tabs` | Reiter innerhalb einer Ansicht |

Damit lässt sich eine vollständige Bedienseite bauen. Erst wenn es hübscher
oder spezieller werden soll, kommen die
[Widgetsätze](/docs/viz/widgetsets.md) aus dem Adapterverzeichnis dazu.

?> Die Namen der Bausteine sind nicht übersetzt und stehen auch in einer
deutschen Oberfläche englisch in der Palette. Diese Seite nennt sie deshalb so,
wie sie dort zu finden sind.

## basic

Der Satz für alles, was einen Wert anzeigt oder eine Seite zusammenhält.

### Zahlen, Text und Zeit

| | Widget | Zeigt |
| --- | --- | --- |
| ![Number](media/widget_images/basic/Prev_ValueFloat.png) | `Number` | einen Zahlenwert, mit Einheit und wählbarer Nachkommastelle |
| ![String](media/widget_images/basic/Prev_ValueString.png) | `String` | eine Zeichenkette |
| ![String unescaped](media/widget_images/basic/Prev_ValueStringRaw.png) | `String (unescaped)` | dasselbe, wobei enthaltener HTML-Code auch dargestellt wird |
| ![String img src](media/widget_images/basic/Prev_ValueStringImg.png) | `String img src` | ein Bild, dessen Adresse im Datenpunkt steht |
| ![Input val](media/widget_images/basic/Prev_ValueInput.png) | `Input val` | ein Eingabefeld, das den Wert auch schreibt |
| ![Timestamp](media/widget_images/basic/Prev_ValueTimestamp.png) | `Timestamp`, `Timestamp Value`, `TimesValue` | einen Zeitstempel in verschiedenen Formaten |
| ![Last change](media/widget_images/basic/Prev_ValueLastchange.png) | `Last change Timestamp` | wann sich der Wert zuletzt geändert hat |
| ![ValueList](media/widget_images/basic/Prev_ValueList.png) | `ValueList Text` | einen von mehreren Texten, je nach Wert |
| ![ValueList HTML](media/widget_images/basic/Prev_ValueListHtml.png) | `ValueList HTML` | dasselbe, aber mit HTML statt reinem Text |
| ![ValueList HTML Style](media/widget_images/basic/Prev_ValueListHtml8.png) | `ValueList HTML Style` | dasselbe mit eigener CSS-Angabe je Wert |

### Ja und Nein

| | Widget | Zeigt |
| --- | --- | --- |
| ![Bool HTML](media/widget_images/basic/Prev_ValueBool.png) | `Bool HTML` | zwei verschiedene Texte für wahr und falsch |
| ![Bool HTML Control](media/widget_images/basic/Prev_ValueBoolCtrl.png) | `Bool HTML` (schaltend) | dasselbe, schaltet beim Klick auf die Fläche um |
| ![Bool Checkbox](media/widget_images/basic/Prev_ValueBoolCheckbox.png) | `Bool Checkbox` | ein Ankreuzfeld, das auch schaltet |
| ![Bool Select](media/widget_images/basic/Prev_ValueBoolSelect.png) | `Bool Select` | ein Klappfeld mit zwei Einträgen |
| ![Bool SVG](media/widget_images/basic/Prev_ValueBoolCtrlSvg.png) | `Bool SVG` | eine Zeichnung, die beim Klick einen Wert setzt |
| ![AckFlag](media/widget_images/basic/Prev_AckBool.png) | `AckFlag HTML` | ob der letzte Wert bestätigt wurde; ein Werkzeug zur Fehlersuche |
| ![HTML State](media/widget_images/basic/Prev_BasicState.png) | `HTML State` | einen Text, der bei 0 oder `false` ganz verschwindet; gut für Servicemeldungen |

### Bilder, Rahmen und fremde Inhalte

| | Widget | Zeigt |
| --- | --- | --- |
| ![HTML](media/widget_images/basic/Prev_HTML.png) | `HTML` | beliebigen HTML-Code |
| | `Svg shape` | eine einfache Form: Kreis, Rechteck, Linie |
| ![Image](media/widget_images/basic/Prev_Image.png) | `Image` | ein Bild, wahlweise regelmäßig neu geladen |
| ![Image 8](media/widget_images/basic/Prev_StatefulImage.png) | `Image 8` | eines von acht Bildern, je nach Wert |
| ![iFrame](media/widget_images/basic/Prev_iFrame.png) | `iFrame` | eine fremde Webseite im Fenster |
| ![iFrame 8](media/widget_images/basic/Prev_StatefulIFrame8.png) | `iFrame 8` | acht Seiten, umschaltbar über einen Wert |
| ![Border](media/widget_images/basic/Prev_tplFrame.png) | `Border` | einen Rahmen, wahlweise mit Titelbalken |
| ![Note](media/widget_images/basic/Prev_Note.png) | `Note` | einen Notizzettel |
| ![Table](media/widget_images/basic/Prev_TableBody.png) | `Table` | eine Tabelle aus einem Datenpunkt |

### Navigation und Ansichten

| | Widget | Tut |
| --- | --- | --- |
| ![Link](media/widget_images/basic/Prev_tplLink.png) | `link` | macht die ganze Fläche zu einem Verweis |
| ![HTML navigation](media/widget_images/basic/Prev_HTMLnavigation.png) | `HTML navigation` | wechselt auf eine andere Ansicht, mit Übergangseffekt |
| ![View in widget](media/widget_images/basic/Prev_ContainerView.png) | `view in widget` | bettet eine ganze Ansicht ein; der übliche Weg für eine gemeinsame Navigationsleiste |
| ![View in widget 8](media/widget_images/basic/Prev_StatefulContainerView8.png) | `view in widget 8` | zeigt eine von acht Ansichten, je nach Wert |
| | `Dialog` | öffnet eine Ansicht als Fenster |
| ![Filter dropdown](media/widget_images/basic/Prev_FilterDropdown.png) | `filter - dropdown` | blendet Widgets nach ihrem Filterbegriff ein und aus |

### Werkzeuge

| | Widget | Tut |
| --- | --- | --- |
| ![Full Screen](media/widget_images/basic/Prev_FullScreen.png) | `Full Screen` | schaltet den Vollbildmodus des Browsers um |
| ![Screen Resolution](media/widget_images/basic/Prev_ScreenResolution.png) | `Screen Resolution` | zeigt die Bildschirmgröße an und nennt die dafür passende Ansicht; nur beim Einrichten nützlich |
| ![HTML logout](media/widget_images/basic/Prev_HtmlLogout.png) | `HTML logout` | meldet den Benutzer ab |
| ![Gesture](media/widget_images/basic/Prev_ValueGesture.png) | `Gesture indicator` | zeigt erkannte Wischgesten an |

!> In **vis-2** fehlen vier Bausteine, die es in vis 1 noch gab: `Red Number`,
`Bulb on/off`, `Bar` und `Speech2Text`. Wer ein altes Projekt übernimmt, ersetzt
sie am besten durch Bausteine aus [Material](/docs/viz/widgets-material.md)
oder [Collection](/docs/viz/widgets-collection.md).

## jqui

Der Satz für Bedienelemente. Alles, was geklickt, eingetippt oder geschoben
wird, findet sich hier. Die Elemente sehen nach jQuery UI aus: schlicht und
etwas altbacken, aber zuverlässig.

### Knöpfe

| | Widget | Tut |
| --- | --- | --- |
| ![Button](media/widget_images/jqui/Prev_Jqui_NavButton.PNG) | `Button` | wechselt auf eine andere Ansicht |
| ![Button Icon](media/widget_images/jqui/Prev_Jqui_NavButtonIcon.PNG) | `navigation - Icon` | dasselbe als Symbol |
| ![Button Pw](media/widget_images/jqui/Prev_Jqui_NavButtonPW.PNG) | `navigation - Pw` | dasselbe, aber erst nach Eingabe eines Kennworts |
| ![Button State](media/widget_images/jqui/Prev_Jqui_ButtonState.PNG) | `Button State` | schreibt einen festen Wert in einen Datenpunkt |
| ![Button Link](media/widget_images/jqui/Prev_Jqui_Link.PNG) | `Button Link`, `Button Link _blank` | öffnet eine Adresse, im selben oder in einem neuen Fenster |
| ![Icon link](media/widget_images/jqui/Prev_Jqui_Iconlink.PNG) | `Icon link` | dasselbe als Symbol |
| ![Icon HTTP GET](media/widget_images/jqui/Prev_Jqui_UrlGet.PNG) | `Icon HTTP GET` | ruft im Hintergrund eine Adresse auf, ohne die Seite zu verlassen |

### Eingeben

| | Widget | Tut |
| --- | --- | --- |
| ![Input](media/widget_images/jqui/Prev_Jqui_Input.PNG) | `Input` | Textfeld, schreibt bei jeder Änderung |
| ![Input + Set](media/widget_images/jqui/Prev_Jqui_InputSet.PNG) | `ctrl - Input + Set-Button` | Textfeld, schreibt erst auf Knopfdruck |
| ![Input Date](media/widget_images/jqui/Prev_Jqui_ControlDate.PNG) | `ctrl - Input Date` | Datumsauswahl |
| ![Input Datetime](media/widget_images/jqui/Prev_Jqui_ControlDateTime.PNG) | `ctrl - Input Datetime` | Datum mit Uhrzeit |

### Auswählen und regeln

| | Widget | Tut |
| --- | --- | --- |
| ![Bool](media/widget_images/jqui/Prev_Jqui_Bool.PNG) | `Html Bool` | zeigt und schaltet einen Ja/Nein-Wert |
| ![Icon Toggle](media/widget_images/jqui/Prev_Jqui_IconToggle.PNG) | `Icon Toggle` | dasselbe mit zwei Symbolen |
| ![Radio](media/widget_images/jqui/Prev_Jqui_RadioButton.PNG) | `Radiobuttons on/off` | zwei Knöpfe für an und aus |
| ![Radio Liste](media/widget_images/jqui/Prev_Jqui_RadioButtonList.PNG) | `Radiobuttons ValueList` | ein Knopf je Wert aus einer Liste |
| ![Radio 25%](media/widget_images/jqui/Prev_Jqui_RadioButtonPercent.PNG) | `Radiobuttons 25%` | feste Stufen 0, 25, 50, 75, 100 |
| ![Select](media/widget_images/jqui/Prev_Jqui_SelectList.PNG) | `Select ValueList` | ein Klappfeld für längere Listen |
| ![Slider](media/widget_images/jqui/Prev_Jqui_SliderHorizontal.PNG) | `Slider horizontal` | Schieberegler, waagerecht |
| ![Slider vertikal](media/widget_images/jqui/Prev_Jqui_SliderVertical.PNG) | `Slider vertical` | Schieberegler, senkrecht |
| ![Icon State](media/widget_images/jqui/Prev_Jqui_ControlSetState.PNG) | `ctrl - Icon State` | Symbol, das beim Klick einen Wert setzt |
| ![Icon Increment](media/widget_images/jqui/Prev_Jqui_ControlIncrement.PNG) | `ctrl - Icon Increment` | Symbol, das einen Wert um einen Betrag ändert |

### Dialoge

| | Widget | Tut |
| --- | --- | --- |
| ![HTML Dialog](media/widget_images/jqui/Prev_JquiDialog.png) | `HTML - Dialog` | öffnet ein Fenster mit eigenem Inhalt |
| ![Icon Dialog](media/widget_images/jqui/Prev_JquiIconDialog.png) | `Icon - Dialog` | dasselbe, ausgelöst über ein Symbol |
| ![Container Dialog](media/widget_images/jqui/Prev_ContainerDialog.png) | `container - HTML - view in jqui Dialog` | öffnet eine ganze Ansicht als Fenster |
| ![Container Icon Dialog](media/widget_images/jqui/Prev_ContainerIconDialog.png) | `container - Icon - view in jqui Dialog` | dasselbe über ein Symbol |
| ![Container Button Dialog](media/widget_images/jqui/Prev_ContainerButtonDialog.png) | `container - Button - view in jqui Dialog` | dasselbe über einen Knopf |
| ![Button close](media/widget_images/jqui/Prev_Jqui_ButtonClose.PNG) | `Button dialog close` | schließt das geöffnete Fenster |

## jqplot

![MeterGauge](media/widget_images/jqplot/Prev_MeterGauge.png)

Ein einziges Widget, `MeterGauge`: ein Zeigerinstrument mit farbigen
Bereichen. Für mehr Auswahl gibt es eigene Sätze, siehe
[Zeigerinstrumente](/docs/viz/widgetsets.md).

## swipe

| | Widget | Tut |
| --- | --- | --- |
| ![Swipe](media/widget_images/swipe/Prev_Swipe.png) | `swipe Navigation` | wechselt zwischen Ansichten, wenn mit dem Finger gewischt wird |
| ![Carousel](media/widget_images/swipe/Prev_Carousel.png) | `Carousel` | zeigt mehrere Ansichten nacheinander, wie ein Karussell |

Beide sind vor allem für Telefone und Wandtablets gedacht.

## tabs

Ein Widget, `SliderTabs`: mehrere Ansichten hinter Reitern, zwischen denen
oben umgeschaltet wird.

## Was für alle gilt

Die Einstellungen, die jedes dieser Widgets hat (Name, Position, Sichtbarkeit,
CSS, Signale), sind unter
[Einstellungen eines Widgets](/docs/viz/widgets.md) beschrieben.
