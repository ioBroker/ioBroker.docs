---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md
title: kein Titel
hash: VsMjsTPOGBpRKa1EggxylPppzakBUxaTI/jqiIhM2Ik=
---
#### Anwendungsfall für ein konfigurierbares segmentiertes Messgerät

##### **Einführung**

Dieser Anwendungsfall erstellt ein responsives SVG-Messgerät mit dem `JSON Template` Widget. Es ist von der folgenden Darstellung inspiriert; der Bildhintergrund wird bewusst nicht wiedergegeben, da die Vorlage selbst transparent ist.

![Konfigurierbares segmentiertes Messgerät](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/gauge.jpeg)

Die Vorlage enthält:

- Konfigurierbare absolute Minimal- und Maximalwerte
- Konfigurierbare Start- und Stoppwinkel und Balkenbreite
- ein farbiger oder transparenter Hintergrundbogen
- beliebig viele Sektoren mit absoluten oder prozentualen Grenzen
- eine einfarbige Fläche oder ein bogenförmiger Farbverlauf für jeden Sektor
- optionale absolute oder prozentuale Grenzwertbezeichnungen
- ein absoluter oder prozentualer Wert genau in der Mitte der SVG-Anzeige
- Konfigurierbare Werttypografie und ein optionales Wertfeld
- ein konfigurierbarer äußerer Sicherheitsabstand für lange Begrenzungsetiketten
- Die numerische Eingabe erfolgt entweder als Zahl oder als numerische Zeichenkette.

Es wird keine externe Bibliothek benötigt. Das Messgerät dient nur der Anzeige.

---

##### **Integration in VIS oder VIS-2**

1. Füge die `JSON Template` Widget zur Ansicht hinzufügen.
2. Legen Sie die Anzahl der zusätzlichen Datenpunkte fest auf `1` Die
3. Wählen Sie den numerischen Quelldatenpunkt unter **Datenpunkte\[1]** aus.
4. Eingeben `gaugevalue` als Variablenname für diesen Datenpunkt.
5. Öffnen Sie den Vorlageneditor und fügen Sie den gesamten Inhalt ein.[`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs) Die
6. Geben Sie dem Widget genügend Platz, zum Beispiel 500 x 310 Pixel.
7. Setzen Sie den Hintergrund des VIS-Widgets auf transparent, wenn außerhalb der Vorlage eine Hintergrundfarbe konfiguriert ist.

Mit dem Variablennamen `gaugevalue` Die Datenpunkt-ID ist verfügbar als `gaugevalue`, während sein aktueller Wert verfügbar ist als `gaugevalue_value` Die Vorlage verwendet `gaugevalue_value` und akzeptiert eine Zahl oder eine numerische Zeichenkette. Der Haupt-JSON-Datenpunkt und die EJS-Variable `data` werden nicht verwendet.

---

##### **Konfiguration**

Alle Optionen befinden sich am Anfang der Vorlage.

| Option                              | Beschreibung                                                                |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `gaugeMin`, `gaugeMax`              | Der absolute Eingangsbereich wird durch 0 und 100 Prozent dargestellt.      |
| `gaugeStartAngle`, `gaugeStopAngle` | Bogenwinkel; 0° ist oben, 90° ist rechts und -90° ist links                 |
| `gaugeBarWidth`                     | Breite des SVG-Bogens                                                       |
| `gaugeBackgroundColor`              | CSS-Farbe für den inaktiven Bogen, oder `transparent`                       |
| `gaugeMargin`                       | Freier Platz um das Messgerät für lange Begrenzungsbeschriftungen           |
| `gaugeSectors`                      | Array mit einer beliebigen Anzahl farbiger Bereiche                         |
| `showSectorLabels`                  | Zeigt oder blendet Sektorgrenzenbezeichnungen ein oder aus                  |
| `labelMode`                         | Zeigt Grenzen an als `absolute` oder `percent` Werte                          |
| `gaugeEndLabelGap`                  | Abstand zwischen einem horizontalen Bogen und seinen Min/Max-Beschriftungen |
| `gaugeMinLabelOffsetX/Y`            | Feinjustierung des absoluten Mindestlabels                                  |
| `gaugeMaxLabelOffsetX/Y`            | Feinjustierung des absoluten Maximallabels                                  |
| `showValue`                         | Zeigt oder blendet den aktuellen Wert aus                                   |
| `valueMode`                         | Zeigt den aktuellen Wert an als `absolute` oder `percent`                    |
| `valueBoxEnabled`                   | Aktiviert oder deaktiviert das Feld hinter dem Wert                         |
| `gradientSegments`                  | Anzahl der für jeden Farbverlauf verwendeten SVG-Elemente                   |

Jeder Sektor hat einen `type`, `start`, Und `stop` Sein Typ ist entweder `absolute` oder `percent`. Verwenden `color` für einen soliden Sektor oder verwenden `colorFrom` Und `colorTo` für einen Gradienten:

```javascript
const gaugeSectors = [
    {
        type: 'absolute',
        start: 0,
        stop: 1280,
        colorFrom: '#70df00',
        colorTo: '#c6ff26',
    },
    {
        type: 'percent',
        start: 25,
        stop: 60,
        color: '#ff9700',
    },
];
```

Es werden nur die Sektorabschnitte bis zum aktuellen Wert gezeichnet. Der verbleibende Teil des Messgeräts verwendet `gaugeBackgroundColor` Sektorwerte außerhalb des Messbereichs werden sicher begrenzt.

Wenn die Start- und Stoppwinkel genau `-90` Und `90` Die absoluten Minimal- und Maximalwerte der Messskala befinden sich stets direkt unterhalb der linken und rechten Bogenenden. Diese beiden Beschriftungen verwenden immer absolute Werte und die Formatierung für absolute Beschriftungen. `gaugeMargin` wenn lange Werte oder Suffixe mehr Platz am Rand des Widgets benötigen.

Verwenden `gaugeEndLabelGap` um beide Beschriftungen näher an den Balken heran oder weiter von ihm weg zu bewegen. Die vier `gaugeMinLabelOffset...` Und `gaugeMaxLabelOffset...` Die Einstellungen ermöglichen eine unabhängige horizontale und vertikale Feinjustierung. Negative Y-Werte verschieben eine Beschriftung nach oben, positive Y-Werte nach unten.

---

##### **Wertformatierung**

Verwenden `valueDecimals`, `valuePrefix`, `valueSuffixAbsolute`, Und `valueSuffixPercent` um den angezeigten Wert zu formatieren. Schriftart, -größe, -stärke und -farbe werden über die entsprechenden Einstellungen gesteuert. `valueFont...` Einstellungen.

Der aktuelle Wert befindet sich immer exakt in der horizontalen und vertikalen Mitte der gesamten SVG-Anzeige. Es gibt keinen separaten Wertpositionsmodus. Die Standardfarbe des Werts ist Weiß. Ändern `valueColor` zu einer dunklen Farbe wie `#222222` wenn das transparente Messgerät auf einem hellen Hintergrund platziert wird.

Satz `valueBoxEnabled` Zu `true` Der Wert wird in einem konfigurierbaren Feld angezeigt. Füllung, Rahmen, Eckenradius und Innenabstand werden durch die `valueBox...` Einstellungen.

Für die Begrenzungsbeschriftungen gibt es separate Einstellungen für Schriftart, Farbe, Dezimalstellen und Suffix.

---

##### **Technische Hinweise**

- Die vollständige Implementierung wird gepflegt in[`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs) Die
- Die Ausgabe verwendet ausschließlich SVG; es werden weder Canvas noch externe Bibliotheken verwendet.
- CSS-Selektoren sind unterhalb des Gültigkeitsbereichs definiert. `#<%- widgetid %>` Die
- Die Sicherheit der VIS-Bindung wird dadurch gewährleistet, dass die öffnenden und schließenden geschweiften Klammern in separaten Zeilen angeordnet sind.
- NEIN `setInterval()` und es wird keine clientseitige Datenserialisierung verwendet.
- Mehrere Instanzen können in einer Ansicht platziert werden.
- Die Vorlage dient nur der Anzeige und schreibt nicht in den Quelldatenpunkt.