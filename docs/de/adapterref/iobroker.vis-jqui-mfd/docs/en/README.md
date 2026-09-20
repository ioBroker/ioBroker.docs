---
chapters: {"pages":{"en/adapterref/iobroker.vis-jqui-mfd/README.md":{"title":{"en":"ioBroker.vis-jqui-mfd"},"content":"en/adapterref/iobroker.vis-jqui-mfd/README.md"},"en/adapterref/iobroker.vis-jqui-mfd/docs/en/README.md":{"title":{"en":"jqui-mfd widgets for vis-2"},"content":"en/adapterref/iobroker.vis-jqui-mfd/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jqui-mfd/docs/en/README.md
title: jqui-mfd-Widgets für vis-2
hash: vjlplaeX8bEB5AsaNGl4+MHvwqpW4WXEj1YCkUEWFFI=
---
# jqui-mfd-Widgets für vis-2

Die jqui-mfd-Widgets bestehen aus 27 Schaltflächen mit den Symbolen des [OpenAutomation-Iconsets](https://github.com/OpenAutomationProject/knx-uf-iconset) für Lampen, Steckdosen, Rollläden, Markisen, Ventile, Fenster, Türen, Heizung und Kameras. Viele davon öffnen einen Dialog zur Gerätesteuerung. Diese Seite beschreibt die Version **vis-2** . vis (vis-1) verfügt über dieselben Widgets mit denselben Einstellungen.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen und Migration](#requirements-and-migration)
  - [vis-2-Design oder vis-1-Look](#vis-2-theme-or-vis-1-look)
  - [Der Button und das jQuery UI-Theme](#the-button-and-the-jquery-ui-theme)
  - [Symbole und Symbolfarben](#icons-and-icon-colors)
  - [Im Editor eingegebene Werte](#values-entered-in-the-editor)
  - [Dialoge](#dialogs)
- [Licht/Dimmer, Lichtschalter, Dimmer + Dialog](#lightdimmer-light-switch-dimmer--dialog)
- [Ein/Aus + Dialog](#onoff--dialog---tplmfdlightonoffdialog)
- [Steckdose und Steckdosenschalter](#socket-and-socket-switch)
- [Rollladen, Jalousie, Ventil](#shutter-blind-valve)
- [Custom10](#custom10---tplmfdcustom10-tplmfdcustom10dialog)
- [Heizung + Dialog](#heating--dialog---tplmfdheating)
- [Fenster, Dachfenster, Garage](#window-roof-window-garage)
- [Tür](#door---tplmfddoor)
- [Fenster mit Drehgriff](#window-with-rotary-handle---tplmfdwindow)
- [Kameras](#cameras)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein

### Anforderungen und Migration

Die Widgets befinden sich im Widget-Set **„jQuery UI MFD“** in der Widget-Liste des vis-2-Editors. Sie benötigen **vis-2 Version 2.12.8** oder neuer.

Mit vis-1 erstellte Projekte funktionieren weiterhin ohne Änderungen. Beide Versionen verwenden dieselben Widget-IDs (`tplMfdLight`, `tplMfdShutterDialog`, ...) und dieselben Attributnamen, und vis-2 wählt die React-Version automatisch aus. Alle Einstellungen werden übernommen.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

### vis-2-Design oder vis-1-Look

![vis-2 Thema, Licht](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/mui-light.png)

![vis-2-Theme, dunkel](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/mui-dark.png)

| Einstellung | Attribut | Standard           | Beschreibung                                                                                                                                                                                                                                                                                                         |
| ----------- | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vis-2 Thema | `mui`    | auf (neue Widgets) | Das Widget wird in den Farben des vis-2-Themes dargestellt: Die Schaltfläche ist eine Oberfläche des Themes; beim Drücken nimmt sie die Primärfarbe an, das Symbol die Textfarbe. Die Dialoge verwenden dieselben Farben. Aus: Das jQuery-UI-Design von vis-1 (siehe [unten](#the-button-and-the-jquery-ui-theme) ). |

Alle in vis-2 erstellten Widgets haben diese Option aktiviert und verwenden das vis-2-Design (hell, dunkel oder ein anderes). Widgets aus vis-1 und solche, die mit einer älteren Version dieses Adapters erstellt wurden, haben **keinen Wert** dafür und behalten das vis-1-Design bei, sodass sich ein bestehendes Projekt nicht ändert. Der Editor zeigt einen solchen fehlenden Wert standardmäßig aktiviert an und markiert das Feld rot: Deaktivieren und aktivieren Sie das Kontrollkästchen, um das Widget auf das vis-2-Design umzuschalten.

Zum Thema Vis-2:

- Die Symbole übernehmen die Textfarbe des Designs – dunkel in einem hellen, weiß in einem dunklen Design. Beim Klicken auf eine Schaltfläche wird die Textfarbe der Primärfarbe angezeigt; ohne _Schaltflächenrechteck_ wird das Symbol eines aktivierten oder geöffneten Widgets in der Primärfarbe dargestellt. Die konfigurierte _Symbolfarbe_ hat immer Vorrang.
- _Das Symbol zum Invertieren_ wird nicht benötigt; lassen Sie es deaktiviert.
- Das jQuery UI-Theme der Ansicht hat keinen Einfluss auf diese Widgets.

| Helles Thema                                  | Dunkles Thema                                 |
| --------------------------------------------- | --------------------------------------------- |
| ![Dialog, Licht](../img/mui-dialog-light.png) | ![Dialog, dunkel](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/mui-dialog-dark.png) |

### Der Button und das jQuery UI-Theme

Jedes Widget ist ein Symbol auf einem Button. In der Ansicht 1 ( _vis-2-Theme_ deaktiviert oder nicht festgelegt) wird der Button durch das **jQuery UI-Theme der Ansicht** gezeichnet (Ansichtseinstellungen, _Theme_ ), genau wie in vis-1: Das Widget enthält die Klassen `ui-widget ui-button ui-corner-all ui-state-default` Das Design bestimmt Farben, Farbverläufe und Ecken. Wenn Sie das Design ändern, ändern sich auch alle Schaltflächen entsprechend.

| Redmond                              | UI-Leichtigkeit                                   | dunkler Bienenstock                                | ui-darkness                                  |
| ------------------------------------ | ------------------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| ![Redmond](../img/theme-redmond.png) | ![UI-Leichtigkeit](../img/theme-ui-lightness.png) | ![dunkler Bienenstock](../img/theme-dark-hive.png) | ![ui-darkness](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/theme-ui-darkness.png) |

Die Symbole sind weiß. Bei einem hellen Design wie _Redmond_ aktivieren Sie die **Option „Symbole invertieren“** oder wählen Sie eine **Symbolfarbe** .

![Schaltflächenoptionen](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/button-options.png)

| Einstellung        | Attribut      | Standard | Beschreibung                                                                                                      |
| ------------------ | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| Rechteckiger Knopf | `asButton`    | An       | Zeichnet den Button – entweder des jQuery UI-Themes oder des vis-2-Themes. Aus: Es wird nur das Symbol angezeigt. |
| Symbol umkehren    | `invert_icon` | aus      | Kehrt das Symbol um: Weiß wird zu Schwarz.                                                                        |

**Gedrückt und mit der Maus darüberfahren.** Die Schaltfläche wird als gedrückt angezeigt (`ui-state-active`) solange das Gerät eingeschaltet oder geöffnet ist – die Lampe leuchtet, die Steckdose ist eingeschaltet, das Fenster ist geöffnet. Widgets, die auf einen Klick reagieren, leuchten ebenfalls unter dem Mauszeiger auf (`ui-state-hover` Die Tabellen der Widgets geben an, wann ein Widget angeklickt wird.

Eine in den allgemeinen Einstellungen des Widgets eingegebene CSS-Klasse wird dem Button hinzugefügt, sodass Ihre eigenen CSS-Regeln weiterhin funktionieren.

### Symbole und Symbolfarben

Die Icons sind SVG-Grafiken und bleiben in jeder Widget-Größe scharf. Die Standardgröße eines Widgets beträgt 76 x 76 Pixel. Lampe, Rollladen, Jalousie und Ventil sind keine Grafiken, sondern werden mit exakten Werten gezeichnet, sodass 37 % tatsächlich 37 % entsprechen.

![Symbolfarben](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/icon-colors.png)

| Einstellung                           | Attribut                      | Beschreibung                                                                                                                                                                                                                                                         |
| ------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Symbolfarbe                           | `iconColor`                   | Farbe des Symbols, zum Beispiel `#e17009` oder `orange` Leer: weiß.                                                                                                                                                                                                    |
| Symbolfarbe 0 % ... Symbolfarbe 100 % | `iconColor0`... `iconColor10` | Farben der Widgets, die einen Wert anzeigen (Licht, Rollladen, Ventil, Jalousie), jeweils für einen Wertebereich: `iconColor0` unter 10%, `iconColor1` ab 10%, ..., `iconColor10` bei _Max_ - die Schritte der vis-1 Bilder. Ein leeres Bild erhält _die Symbolfarbe_ . |

Die weiße Farbe des Symbols wird durch eine Farbe ersetzt. Auch Ihre eigenen Symbole können farbig gestaltet werden, sofern es sich um weiße SVG-Bilder handelt. Andere Bilder (PNG, JPG) werden unverändert angezeigt.

### Im Editor eingegebene Werte

_Min_ , _Max_ und die Werte der Zustände ( _Wert für GEÖFFNET_ , _Wert für EIN_ , ...) werden als Text eingegeben. Die Widgets wandeln sie folgendermaßen um:

| Eingegebener Text      | Bedeutung                      |
| ---------------------- | ------------------------------ |
| `true` /`false`        | boolescher Wert `true` /`false` |
| `0`, `1`, `42.5`, ... | Nummer                         |
| irgendetwas anderes    | den Text, wie er ist           |
| (leer)                 | die Standardeinstellung        |

Ein Zustandswert und ein konfigurierter Wert werden nur lose verglichen: `1`, `"1"` Und `true` sind gleich.

### Dialoge

Die Widgets mit _dem Zusatz „+ Dialog“_ im Namen öffnen beim Anklicken einen Dialog. Dieser Dialog überlagert die gesamte Ansicht, lässt sich über die Titelleiste verschieben und schließt sich mit dem **„x“** , der **Escape-Taste** oder – falls konfiguriert – automatisch. Er verwendet die Farben des vis-2-Themes. Ist das _vis-2-Theme_ deaktiviert, hat er ein eigenes helles oder dunkles Erscheinungsbild. Im Editor öffnen sich die Dialoge nicht; ein Klick wählt das Widget aus.

![Dimmerdialog](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/dimmer-dialog.png)

| Einstellung                  | Attribut                    | Standard     | Beschreibung                                                                                                                                                                    |
| ---------------------------- | --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dialogtitel                  | `title`                     |              | Text der Titelleiste. Leer: die Objekt-ID (Kameras: kein Titel).                                                                                                                |
| Kein Header                  | `noHeader`                  | aus          | Blendet die Titelleiste aus. Die Schaltfläche „Schließen“ bleibt erhalten.                                                                                                      |
| Automatisches Schließen (ms) | `autoclose`                 |              | Schließt den Dialog nach dieser Zeit. Jeder Klick im Dialog startet die Zeit erneut. Werte unter 60 werden als Sekunden interpretiert. Leer oder 0: Der Dialog bleibt geöffnet. |
| Modal                        | `modal`                     | aus          | Verdunkelt den Bereich hinter dem Dialogfeld. Ein Klick auf den dunklen Bereich schließt das Dialogfeld.                                                                        |
| Dialogbreite                 | `dialog_width`              | siehe Widget | Breite. Eine Zahl in Pixeln. `50%` oder `30em` sind auch möglich.                                                                                                                 |
| Dialoghöhe                   | `dialog_height`             | siehe Widget | Mindesthöhe. Der Dialog wächst mit seinem Inhalt.                                                                                                                               |
| Dialog oben / Dialog links   | `dialog_top` /`dialog_left` |              | Position im Fenster, zum Beispiel `20` oder `10%` Leer: zentriert.                                                                                                                |
| Überlauf X / Überlauf Y      | `overflowX` /`overflowY`    |              | Scrollleisten des Inhalts: `visible`, `hidden`, `scroll`, `auto`, ...                                                                                                           |

Der Dialog ist nie größer als das Fenster. Nicht jeder Dialog enthält alle Einstellungen; die Tabellen der Widgets listen die Unterschiede auf.

**Die Wertedialoge** (Dimmer, Rollladen, Jalousie, Ventil, Custom10, Heizung) verfügen über eine Reihe von Schaltflächen für feste Werte, einen Schieberegler und eine Zeile mit dem Wert:

| Einstellung      | Attribut      | Beschreibung                                                                                                                                                                                                                                                                         |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Wert anzeigen    | `show_value`  | Fügt den Wert selbst zur Zeile hinzu, z. B. `42% (42 %)` Die                                                                                                                                                                                                                          |
| Einheiten        | `units`       | Die Einheit steht hinter dem Wert.                                                                                                                                                                                                                                                   |
| Arbeitsobjekt-ID | `oid-working` | Ein Objekt, das ist `true` während sich das Gerät bewegt, z.B. `WORKING` eines HomeMatic-Rollladenantriebs. Während es `true` Der Schieberegler bleibt an der Stelle, an der Sie ihn losgelassen haben, anstatt den Positionen zu folgen, die das Gerät während seiner Bewegung meldet. |

Der Schieberegler speichert den Wert einmalig, sobald Sie ihn loslassen. Die Schaltfläche mit dem aktuellen Wert wird hervorgehoben.

## Licht/Dimmer, Lichtschalter, Dimmer + Dialog

`tplMfdLight`, `tplMfdLightCtrl`, `tplMfdLightDialog`

Die Lampe zeigt die Helligkeit stufenlos an: Unterhalb von 1 % des Bereichs ist sie ausgeschaltet, darüber leuchten die Strahlen nacheinander im Uhrzeigersinn von unten links auf – alle 10 % leuchtet ein Strahl mehr auf, der dazwischenliegende wird größer.

![Leichte Schritte](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/light-steps.png)

- **Licht/Dimmer** (`tplMfdLight`) zeigt nur den Zustand an.
- **Lichtschalter** (`tplMfdLightCtrl`) schaltet beim Klicken um: von _Min_ zu _Max_ , von _Max_ zu _Min_ . Ein Wert dazwischen wird von der Mitte des Bereichs nach oben auf _Min_ und darunter auf _Max_ gesetzt. Ohne _Min_ und _Max_ wird zwischen den beiden Werten umgeschaltet. `false` Und `true` (eine Zahl: bis `0` von 0,5 aufwärts bis `1` (siehe unten). **Für einen Dimmer von 0 bis 100 geben Sie _Min_ = 0 und _Max_ = 100 ein.**
- **Dimmer + Dialog** (`tplMfdLightDialog`) öffnet einen Dialog mit den _Optionen Aus / 25% / 50% / 75% / 100%_ des Bereichs und einem Schieberegler von _Min_ bis _Max_ in Schritten von 1%.

| Einstellung                                         | Attribut                      | Standard  | Beschreibung                                                                            |
| --------------------------------------------------- | ----------------------------- | --------- | --------------------------------------------------------------------------------------- |
| Objekt-ID                                           | `oid`                         |           | Zustand der Lampe. `true` zählt als _Max_ , `false` als _Min_ .                           |
| Min. / Max.                                         | `min` /`max`                  | 0 / 100   | Wertebereich. Der Lichtschalter verwendet diese Werte als Ein-/Aus-Wert, siehe oben.    |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                               |           | Siehe [Allgemeines](#general) .                                                         |
| Symbolfarbe 0 % ... 100 %                           | `iconColor0`... `iconColor10` |           | Farbe für jeweils 10 % des Farbbereichs, `iconColor0` auch für die ausgeschaltete Lampe. |
| Arbeitsobjekt-ID                                    | `oid-working`                 |           | Nur Dimmer + Dialog, siehe [Dialoge](#dialogs) .                                        |
| Dialogeinstellungen                                 |                               | 470 x 210 | Nur Dimmer + Dialog, siehe [Dialoge](#dialogs) , mit _Wert_ und _Einheiten_ anzeigen.   |

Der Knopf wird gedrückt, während der Wert über _Min_ liegt. Der Lichtschalter und der Dimmer unter der Maus leuchten auf.

## Ein/Aus + Dialog -`tplMfdLightOnOffDialog`

Eine Lampe, die mit den beiden Tasten _„Aus_ “ und _„Ein“_ einen Dialog öffnet.

![Ein-/Aus-Dialog](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/onoff-dialog.png)

| Einstellung                            | Attribut                      | Standard                              | Beschreibung                                                                                                                                       |
| -------------------------------------- | ----------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                              | `oid`                         |                                       | Zustand zum Umschalten.                                                                                                                            |
| Arbeitsobjekt-ID                       | `oid-working`                 |                                       | Wird von diesem Widget nicht verwendet.                                                                                                            |
| Min. / Max.                            | `min` /`max`                  | 0 / 100                               | Die Werte der Schaltflächen _„Aus“_ und _„Ein“_ werden geschrieben. **Für einen booleschen Zustand geben Sie Folgendes ein: `false` Und `true` Die** |
| Symbol für AUS / Symbol für EIN        | `iconOff` /`iconOn`           | ausgeschaltete / eingeschaltete Lampe | Eigene Bilder für beide Staaten.                                                                                                                   |
| Symbolfarbe für AUS / für EIN          | `iconColorOff` /`iconColorOn` |                                       | Farben der beiden Symbole.                                                                                                                         |
| Symbol umkehren, Schaltflächenrechteck |                               |                                       | Siehe [Allgemeines](#general) .                                                                                                                    |
| Text für AUS / Text für EIN            | `textOff` /`textOn`           | _Aus_ / _Ein_                         | Texte der beiden Schaltflächen.                                                                                                                    |
| Dialogeinstellungen                    |                               | 440 x 200                             | Siehe [Dialoge](#dialogs) .                                                                                                                        |

Die Lampe ist an – Symbol _an_ , Taste gedrückt – wenn der Zustand _Max_ entspricht (falls _Max_ eingestellt ist), wenn er sich von _Min_ unterscheidet (falls nur _Min_ eingestellt ist), andernfalls, wenn er nicht `false`, `0`, `off` oder leer.

## Steckdose und Steckdosenschalter

`tplMfdSocket`, `tplMfdSocketCtrl`

Eine Steckdose, die ihren Zustand anzeigt; die Schalterversion schaltet sie per Klick um.

| Einstellung                            | Attribut                        | Standard      | Beschreibung                                                                                                                             |
| -------------------------------------- | ------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                              | `oid`                           |               | Zustand der Steckdose.                                                                                                                   |
| Min. / Max.                            | `min` /`max`                    | 0 / 1         | Ein- und Ausschaltwert. Die Steckdose ist eingeschaltet, solange der Zustand nicht _Min_ ist. `true` zählt als _Max_ , `false` als _Min_ . |
| Zustand umkehren                       | `invert_state`                  | aus           | Wechselt ein und aus, für einen Zustand, der ist `true` wenn die Steckdose ausgeschaltet ist.                                             |
| Symbol für AUS / Symbol für EIN        | `icon_off` /`icon_on`           | Socket-Bilder | Eigene Bilder für beide Staaten.                                                                                                         |
| Symbolfarbe für AUS / für EIN          | `iconColor_off` /`iconColor_on` |               | Farben der beiden Symbole.                                                                                                               |
| Symbol umkehren, Schaltflächenrechteck |                                 |               | Siehe [Allgemeines](#general) .                                                                                                          |

Der Knopf wird gedrückt, während die Steckdose eingeschaltet ist.

**Steckdosenschalter** (`tplMfdSocketCtrl`) schaltet per Klick wie ein Lichtschalter: zwischen _Min_ und _Max_ oder zwischen `false` Und `true` Ohne sie. Es leuchtet unter dem Mauszeiger auf. Die Gruppe „ **Steuerung“** ersetzt dies durch andere Aktionen:

| Einstellung                 | Attribut                        | Beschreibung                                                                                                                                        |
| --------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL für EIN / URL für AUS   | `urlTrue` /`urlFalse`           | Diese URLs werden beim Ein- und Ausschalten aufgerufen. Der ioBroker-Server ruft sie auf, nicht der Browser. Leere _URL für AUS_ : die URL für EIN. |
| Objekt-ID für EIN / für AUS | `oidTrue` /`oidFalse`           | Diese Objekte werden beim Ein- oder Ausschalten anstelle der Objekt-ID geschrieben. Leere _Objekt-ID für AUS_ : das Objekt für EIN.                 |
| Wert für EIN / Wert für AUS | `oidTrueValue` /`oidFalseValue` | Die ihnen zugewiesenen Werte. Leer: _Max_ oder `true`, _Unerheblich_ `false` Die                                                                     |

Bei Verwendung von URLs oder Objekten für EIN/AUS und **ohne** Objekt-ID merkt sich das Widget seinen Zustand selbst – nach einem Neuladen der Seite ist es standardmäßig ausgeschaltet.

## Rollladen, Jalousie, Ventil

`tplMfdShutter`, `tplMfdShutterDialog`, `tplMfdBlind`, `tplMfdBlindDialog`, `tplMfdValve`, `tplMfdValveDialog`

Eine Position wird angezeigt, die für den exakten Wert gezeichnet ist; in den Dialogversionen wird dieser Wert festgelegt.

![Rollladen, Jalousie und Ventil](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/levels.png)

- **Fensterladen** : Bei _maximaler_ Öffnung ist das Fenster geöffnet; je niedriger der Wert, desto weiter fahren die Lamellen aus dem Gehäuse heraus.
- **Markise** : von eingefahren ( _Min_ ) bis ausgefahren ( _Max_ ); der Stoff dehnt sich aus und die Vorderkante bewegt sich nach unten.
- **Ventil** : Die Scheibe dreht sich von aufrecht - geschlossen ( _Min_ ) - auf gleicher Höhe mit dem Rohr - geöffnet ( _Max_ ).

| Einstellung                                         | Attribut                      | Standard                     | Beschreibung                                                                                                                                                                                                                                                               |
| --------------------------------------------------- | ----------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                                           | `oid`                         |                              | Position, z.B. `LEVEL` Die                                                                                                                                                                                                                                                  |
| Min. / Max.                                         | `min` /`max`                  | 0 / 100                      | Reichweite.                                                                                                                                                                                                                                                                |
| Wert umkehren                                       | `invert_value`                | aus                          | Bei Geräten, die die entgegengesetzte Richtung melden (z. B. 100 = Verschluss geschlossen), wird der Schieberegler invertiert und die Werte der Dialogfeld-Schaltflächen vertauscht.                                                                                       |
| Aktiven Hintergrund anzeigen                        | `show_active`                 | aus                          | Der Knopf wird gedrückt, während der Wert nicht _Max_ ist (der Verschluss ist nicht vollständig geöffnet), und er leuchtet unter der Maus auf.                                                                                                                             |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                               |                              | Siehe [Allgemeines](#general) .                                                                                                                                                                                                                                            |
| Symbolfarben                                        | `iconColor0`... `iconColor10` |                              | Für jede 10%-Markierung des Farbbereichs ist eine Farbe angegeben (siehe [Symbole und Symbolfarben](#icons-and-icon-colors) ). Die Blindenversion hat fünf Farben: `iconColor0` (unter 25%), `iconColor25`, `iconColor5` (ab 50%), `iconColor75`, `iconColor10` (bei _Max_ ). |
| Arbeitsobjekt-ID                                    | `oid-working`                 |                              | Nur Dialogversionen, siehe [Dialoge](#dialogs) .                                                                                                                                                                                                                           |
| Dialogeinstellungen                                 |                               | 450 x 210 (Ventil 440 x 200) | Nur Dialogversionen, siehe [Dialoge](#dialogs) , mit _Wert anzeigen_ und _Einheiten_ .                                                                                                                                                                                     |

Der Dialog enthält die Schaltflächen _geschlossen / 25 % / 50 % / 75 % / offen_ ( _Min_ ... _Max_ ) und einen Schieberegler.

![Verschlussdialog](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/shutter-dialog.png)

## Custom10 -`tplMfdCustom10`, `tplMfdCustom10Dialog`

Elf eigene Bilder. Voreingestellt mit Ventilbildern.

![Custom10](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/custom10.png)

Für jeden Schritt von 0 bis 10 gibt es drei Einstellungen in der Gruppe **„Symbole“** :

| Einstellung    | Attribut                      | Beschreibung                                                                               |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| Symbolwert N%  | `iconValue0`... `iconValue10` | Wenn der Zustand genau diesen Wert hat (`1` passt auch `"1"`), wird dieses Bild angezeigt. |
| Symbol N%      | `icon0`... `icon10`           | Das Bild.                                                                                  |
| Symbolfarbe N% | `iconColor0`... `iconColor10` | Farbe des Bildes, siehe [Symbole und Symbolfarben](#icons-and-icon-colors) .               |

Das Widget sucht zunächst nach einem Schritt, dessen _Symbolwert_ dem Zustand entspricht. Falls kein solcher Schritt vorhanden ist, wird der Schritt des Bereichs wie beim Ventil verwendet: `icon0` unter 10 % des Bereichs zwischen _Min_ und _Max_ , `icon1` ab 10%, ..., `icon10` bei _Max_ . `true` zählt als _Max_ , `false` als _Min_ .

Die übrigen Einstellungen – _Objekt-ID_ , _Min_ ., _Max._ , _Schaltflächenrechteck_ , _Wert umkehren_ , _Aktiven Hintergrund anzeigen_ – und für die Dialogversion die Dialogeinstellungen (440 x 200) – funktionieren wie am [Ventil](#shutter-blind-valve) . Custom10 hat kein _Symbol zum Umkehren_ und keine _Symbolfarbe_ .

## Heizung + Dialog -`tplMfdHeating`

Ein Thermostat. Der Heizkörper – oder die Temperaturanzeige als Text – öffnet einen Dialog mit einer Schaltfläche pro Temperatur und einem Schieberegler.

![Heizung](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/heating.png)

![Heizungsdialog](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/heating-dialog.png)

| Einstellung                                         | Attribut             | Standard    | Beschreibung                                                                                                                                                                       |
| --------------------------------------------------- | -------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                                           | `oid`                |             | Temperatur einstellen.                                                                                                                                                             |
| Arbeitsobjekt-ID                                    | `oid-working`        |             | Siehe [Dialoge](#dialogs) .                                                                                                                                                        |
| Min. / Max. / Schritt                               | `min` /`max` /`step` | 18 / 30 / 2 | Die Schaltflächen des Dialogfelds reichen von _Minimum_ bis _Maximum_ in _Schritten_ ; der Schieberegler verwendet dieselben Werte. Es werden maximal 100 Schaltflächen angezeigt. |
| Dezimalstellen                                      | `roundnumber`        | 0           | Dezimalstellen der Schaltflächen und der Texte.                                                                                                                                    |
| Anzeige                                             | `checkboxDisplay`    | Bild        | `image`: das Heizkörpersymbol. `text`: die Temperatur, z.B. `21.5 °C` Die                                                                                                          |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                      |             | Siehe [Allgemeines](#general) .                                                                                                                                                    |
| Dialogeinstellungen                                 |                      | 600 x 200   | Siehe [Dialoge](#dialogs) , ohne Position und Überlauf.                                                                                                                            |

Die Heizung wird nie eingeschaltet.

## Fenster, Dachfenster, Garage

`tplMfdWindowBool`, `tplMfdRoofWindowBool`, `tplMfdGarage`

Ein Kontakt mit den geschlossenen und geöffneten Staaten.

![Kontakte](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/contacts.png)

| Einstellung                                         | Attribut                               | Standard                         | Beschreibung                                                                                                                    |
| --------------------------------------------------- | -------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                                           | `oid`                                  |                                  | Status des Kontakts.                                                                                                            |
| Zustand umkehren                                    | `invert_state`                         | aus                              | Tauschgeschäfte wurden eröffnet und geschlossen.                                                                                |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                                        |                                  | Siehe [Allgemeines](#general) .                                                                                                 |
| Wert für GESCHLOSSEN / Wert für GEÖFFNET            | `closed_value` /`opened_value`         |                                  | Ohne _Wert für OPENED_ jede Zahl über 0 und `true` ist offen. Nur mit diesem Wert ist alles offen, alles andere ist geschlossen. |
| Symbol für GESCHLOSSEN / für GEÖFFNET               | `closed_icon` /`opened_icon`           | Fenster, Dachfenster, Garagentor | Eigene Bilder.                                                                                                                  |
| Symbolfarbe für GESCHLOSSEN / für GEÖFFNET          | `closed_iconColor` /`opened_iconColor` |                                  | Farben pro Bundesstaat. Leer: _Symbolfarbe_ .                                                                                   |

Der Knopf wird gedrückt, während die Tür geöffnet ist.

## Tür -`tplMfdDoor`

Eine Tür mit den drei Zuständen geschlossen, gekippt und geöffnet (siehe Abbildung oben).

| Einstellung                                         | Attribut                                               | Standard  | Beschreibung                                                                        |
| --------------------------------------------------- | ------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------- |
| Objekt-ID                                           | `oid`                                                  |           | Zustand der Tür. `true` ist geöffnet `false` und kein Wert ist geschlossen.           |
| Zustand umkehren                                    | `invert_state`                                         | aus       | Es wird lediglich das Aussehen des gedrückten Knopfes ausgetauscht, nicht das Bild. |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                                                        |           | Siehe [Allgemeines](#general) .                                                     |
| Wert für GESCHLOSSEN / GENEIGT / GEÖFFNET           | `closed_value` /`tilted_value` /`opened_value`         | 0 / 2 / 1 | Alle anderen Werte gelten als geöffnet.                                             |
| Symbole und Symbolfarben                            | `closed_icon`, `closed_iconColor`, `tilted_icon`, ... |           | Eigene Bilder und Farben pro Bundesstaat.                                           |

Der Knopf wird gedrückt, während die Tür nicht geschlossen ist.

## Fenster mit Drehgriff -`tplMfdWindow`

Ein Fenster mit einem oder zwei Flügeln, die jeweils mit einem Drehgriffsensor ausgestattet sind.

![Fenster mit Drehgriff](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/window-handle.png)

| Einstellung                                         | Attribut                                               | Standard  | Beschreibung                                                                                                                                            |
| --------------------------------------------------- | ------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Symbol umkehren, Schaltflächenrechteck, Symbolfarbe |                                                        |           | Siehe [Allgemeines](#general) .                                                                                                                         |
| Schärpen zählen                                     | `slide_count`                                          | 1         | Ein oder zwei Fensterflügel.                                                                                                                            |
| Fenstertyp N                                        | `slide_type1`, `slide_type2`                           |           | `left` oder `right`: Zu welchem Fensterflügel der Sensor gehört. Bei einem Fensterflügel `right` spiegelt das Fenster wider.                             |
| Fenstersensor N                                     | `oid-slide-sensor1`, `oid-slide-sensor2`               |           | Zustand des Griffs dieses Fensterflügels.                                                                                                               |
| Wert für GESCHLOSSEN / GENEIGT / GEÖFFNET           | `closed_value` /`tilted_value` /`opened_value`         | 0 / 2 / 1 | Messwerte der Sensoren. Mit einem Fensterflügel `true` ist geöffnet und `false` geschlossen.                                                              |
| Symbole und Symbolfarben                            | `closed_icon`, `closed_iconColor`, `tilted_icon`, ... |           | Eigene Bilder und Farben für das gesamte Fenster. Das Fenster gilt als geöffnet, wenn ein Flügel geöffnet ist, und als gekippt, wenn einer gekippt ist. |

Bei zwei Fensterflügeln müssen beide Fensterflügeltypen eingestellt werden. Das Widget hat keine eigene Objekt-ID und wird im gedrückten Zustand nie angezeigt.

## Kameras

`tplMfdCamSnapshot`, `tplValMfdCamSnapshot`, `tplMfdCamMjpg`, `tplValMfdCamMjpg`, `tplMfdCamVideo`, `tplValMfdCamVideo`, `tplMfdCamVideoObject`

Ein Kamerasymbol, das das Bild oder Video einer Kamera öffnet. Die Versionen _von Objekt_ (`tplVal...`) die URL aus einem Status anstatt aus einer Einstellung übernehmen.

![Kameras](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/cameras.png)

![Kameradialog](../../../../../en/adapterref/iobroker.vis-jqui-mfd/docs/img/camera-dialog.png)

Allen Kameras gemeinsam:

| Einstellung                         | Attribut        | Standard  | Beschreibung                                                                                                                                                                                                     |
| ----------------------------------- | --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID mit URL                   | `oid`           |           | Versionen nur _vom Objekt_ : Der Status enthält die URL des Bildes oder Videos.                                                                                                                                  |
| Alternativtext                      | `alt`           |           | Alternativer Text des Symbols.                                                                                                                                                                                   |
| Text                                | `text`          |           | Text unter dem Symbol.                                                                                                                                                                                           |
| Schaltflächenrechteck, Symbolfarbe  |                 |           | Siehe [Allgemeines](#general) .                                                                                                                                                                                  |
| Symbol                              | `icon`          | Kamera    | Eigenes Bild, z. B. die Snapshot-URL der Kamera, damit der Button das Bild anzeigt.                                                                                                                              |
| Symbol umkehren                     | `invert_icon`   | aus       | Siehe [Allgemeines](#general) .                                                                                                                                                                                  |
| Symbolaktualisierungsintervall (ms) | `icon_interval` |           | Lädt Ihr eigenes _Symbol_ alle paar Millisekunden erneut. Leer oder 0: niemals.                                                                                                                                  |
| Dialogeinstellungen                 |                 | 640 x 480 | Siehe [Dialoge](#dialogs) . Das Bild füllt die gesamte Breite des Dialogs aus, _die Dialoghöhe_ entspricht der Bildhöhe. Scrollleisten sind standardmäßig ausgeblendet, sofern _„Überlauf“_ nicht aktiviert ist. |

Das Bild wird nur geladen, solange der Dialog geöffnet ist.

| Widget                                                            | eigene Einstellungen                                                                     | Beschreibung                                                                                                                                                                                                                      |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kamera/Schnappschuss (`tplMfdCamSnapshot`)                       | `url`, `interval` (2000)                                                                 | Lädt den Snapshot unter _der URL_ alle paar Millisekunden _(Update interval_ ms) erneut, solange der Dialog geöffnet ist.                                                                                                         |
| Kameraaufnahme/Schnappschuss vom Objekt (`tplValMfdCamSnapshot`) | `interval` (2000)                                                                        | Gleiches gilt für die URL aus dem Objekt.                                                                                                                                                                                         |
| Cam/Video (img) (`tplMfdCamMjpg`)                                | `url`                                                                                    | Es wird ein MJPEG-Stream angezeigt. Der Stream wird gestoppt, wenn das Dialogfeld geschlossen wird, und fortgesetzt, sobald die Seite wieder im Hintergrund angezeigt wird. Dieses Dialogfeld _schließt sich nicht automatisch_ . |
| Kamera/Video (Bild) vom Objekt (`tplValMfdCamMjpg`)              |                                                                                          | Gleiches gilt für die URL aus dem Objekt, mit _Auto close_ .                                                                                                                                                                      |
| Cam/Video (html5) (`tplMfdCamVideo`)                             | `src_url`, `poster_url`, `use_object`                                                    | Spielt das Video unter _der Stream-URL_ in einem HTML5-Player ab. _Die Poster-URL_ wird bis zum Start des Videos angezeigt. Das Video wird mithilfe _des Objekt-Tags_ eingebettet. `<object>` stattdessen.                         |
| Cam/Video (html5) aus Objekt (`tplValMfdCamVideo`)               | `poster_url`, `use_object`                                                               | Gleiches gilt für die URL aus dem Objekt.                                                                                                                                                                                         |
| Kamera/Video (Objekt) (`tplMfdCamVideoObject`)                   | `src_url`, `qtsrc_url`, `type_application` (Video/QuickTime), `plugin`, `autoplay` (WAHR) | Bindet das Video für ein Browser-Plugin (QuickTime) ein. Aktuelle Browser verfügen nicht über solche Plugins – bevorzugen Sie die HTML5-Version.                                                                                  |

## Unterschiede zu vis-1

Die React-Widgets verhalten sich wie die vis-1-Widgets. Dies sind die Unterschiede:

- **vis-2-Design.** Neue Widgets verwenden das vis-2-Design anstelle des jQuery-UI-Designs (siehe [vis-2-Design oder vis-1-Design)](#vis-2-theme-or-vis-1-look) . Widgets aus vis-1 behalten ihr Aussehen, bis _das vis-2-Design_ aktiviert wird.

- **Es gibt keine jQuery UI-Dialoge mehr.** Die Dialoge haben ein eigenes Design, das dem hellen und dunklen Farbschema von vis-2 folgt. Sie lassen sich verschieben, mit _der Escape-Taste_ schließen und durch einen Klick auf den dunklen Bereich eines modalen Dialogs schließen. Sie werden nicht im Editor geöffnet.

- **Der Schieberegler schreibt einmal** , bevor er losgelassen wird. vis-1 hat bei jeder Bewegung des Schiebereglers einen Wert gesendet.

- **Automatisches Schließen 0 bedeutet Aus.** vis-1 schloss den Dialog nach einer Sekunde mit 0.

- **Die Objekt-ID funktioniert.** vis-1 hat das falsche Attribut gelesen und ignoriert.

- **Lampe, Fensterladen, Jalousie und Ventil werden mit dem exakten Wert gezeichnet,** anstatt eines von elf (Jalousie: fünf) Bildern anzuzeigen – 37 % zeigt nicht mehr das 30-%-Bild. Bei 10 %, 20 % usw. entspricht die Zeichnung dem Bild von vis-1. Die Farben ändern sich weiterhin in den Schritten von vis-1.

- **Die Symbolfarben erreichen jedes Symbol.** vis-1 hat die Symbole nicht eingefärbt. `fill` Attribute wie z. B. die ausgeschaltete Lampe gingen verloren, und das zugehörige PNG-Symbol verlor sich vollständig, sobald eine Farbe festgelegt wurde. Die Symbole sind jetzt immer im SVG-Format.

- **Die Anzeige des aktiven Hintergrunds** von Rollladen, Jalousie, Ventil und Custom10 vergleicht mit _dem Maximalwert_ des Widgets. vis-1 wird mit 1 verglichen, sodass ein Rollladen von 0 bis 100 fast die ganze Zeit gedrückt war.

- **Steckdosenschalter:** Der gedrückte Zustand entspricht _dem Invertierungszustand_ des Symbols. Ohne Objekt-ID ändert sich nicht nur der Schalter, sondern auch das Symbol.

- **Fenster mit Drehgriff:** Die jeweiligen Symbole pro Bundesland werden angezeigt. vis-1 bot diese zwar an, ignorierte sie aber.

- **Die Dialogschaltflächen** eines booleschen Zustands sind hervorgehoben: `true` gleicht einen Button mit dem Wert ab `true` oder `1` Die

- **Wert für EIN/AUS** des Steckdosenschalters: leer schreibt _Max_ / _Min_ . vis-1 schrieb einen leeren Text.

- **Heizung, wie im Text** dargestellt `--` anstatt `NaN` solange kein Wert vorhanden ist.

- Die Versionen des Snapshot- _Objekts_ und der MJPEG-Kamera bieten keine _URL_ mehr an. Dies hatte in vis-1 keine Auswirkung.