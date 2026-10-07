---
chapters: {"pages":{"en/adapterref/iobroker.vis-2/README.md":{"title":{"en":"Next generation visualization for ioBroker: vis-2"},"content":"en/adapterref/iobroker.vis-2/README.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md":{"title":{"en":"Standard widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md":{"title":{"en":"jQui widgets - jQuery UI widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md
title: jQui-Widgets - jQuery UI-Widgets
hash: T3DKA2oJcdVN8JPeWaN1AY1/B7V4QSqkqE3uXBvwEu4=
---
# jQui-Widgets – jQuery UI-Widgets

Dies ist eine Sammlung von Widgets im Material-Design.

Ursprünglich wurde für die gestalteten Widgets in vis-1 das jQuery UI Framework verwendet, mittlerweile wurde es jedoch durch den Material-Stil (React JS MUI Framework) ersetzt.

Aus Gründen der Kompatibilität wird weiterhin der Name jQui verwendet.

Die Idee des Entwicklers im Jahr 2014 war, für jede Widget-Variante einen neuen Widget-Typ zu erstellen. Dies ist nicht mehr der Fall. Die Widgets sind nun flexibler konfigurierbar.

Folgende Haupt-Widgets stehen zur Verfügung:

## Binäre Steuerung (`tplJquiBool`)

Es verfügt über die folgenden abgeleiteten Widgets, die alle auf demselben basieren. `tplJquiBool` Widget:

- Boolescher Symbolbutton (tplIconStateBool)
- Binäres Symbol-Druckknopf (tplIconStatePushButton)
- Radiotasten (Ein/Aus) (tplJquiRadio)
- Umschaltknopf mit Symbol (tplJquiToogle)

## Zur URL springen (tplJquiButtonLink).

Es verfügt über die folgenden abgeleiteten Widgets:

- Zur URL springen (in neuem Fenster) (tplJquiButtonLinkBlank)
- Navigationsschaltfläche (tplJquiButtonNav)
- Navigation mit Passwort (tplJquiNavPw)
- Schaltfläche=>Seitendialog (tplContainerButtonDialog)
- Containerdialog (tplContainerDialog)
- Symbol=>Seitendialog (tplContainerIconDialog)
- HTML-Dialog (tplJquiDialog)
- Externer Dialog (tplContainerDialogExternal)
- Symboldialog (tplJquiIconDialog)
- URL im Backend aufrufen (tplIconHttpGet)
- Direkt zur URL (mit Symbol) (tplIconLink)
- Navigationssymbol (tplJquiIconNav)

## Dialog-Schließen-Schaltfläche (tplJquiButtonDialogClose)

## Input (tplJquiInput)

Es verfügt über die folgenden abgeleiteten Widgets:

- Eingabe mit Taste (tplJquiInputSet)

## Datumseingabe (tplJquiInputDate)

## Zeiteingabe (tplJquiInputDatetime)

## Schieberegler (tplJquiSlider)

Es verfügt über die folgenden abgeleiteten Widgets:

- Vertikaler Schieberegler (tplJquiSliderVertical)

## Zustandssteuerung (tplJquiButtonState). Sie verfügt über die folgenden abgeleiteten Widgets:

- Radio-Liste mit Werten (tplJquiRadioList)
- Optionsfeld (Schritte) (tplJquiRadioSteps)
- Aus Liste auswählen (tplJquiSelectList)

## Schreibe den Wert (tplIconState). Er hat die folgenden abgeleiteten Widgets:

- Inkrementieren mit Symbol (tplIconInc)