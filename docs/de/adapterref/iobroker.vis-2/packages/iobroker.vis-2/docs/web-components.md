---
chapters: {"pages":{"en/adapterref/iobroker.vis-2/README.md":{"title":{"en":"Next generation visualization for ioBroker: vis-2"},"content":"en/adapterref/iobroker.vis-2/README.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md":{"title":{"en":"Standard widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md":{"title":{"en":"jQui widgets - jQuery UI widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/web-components.md":{"title":{"en":"ioBroker web components in vis-2 (preview)"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/web-components.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/web-components.md
title: ioBroker-Webkomponenten in vis-2 (Vorschau)
hash: oN8p1YjsO9z4SOiC90k+5r4B/bImzguDDJvmxOGC+m0=
---
# ioBroker-Webkomponenten in vis-2 (Vorschau)

Eine Webkomponente ist ein benutzerdefiniertes Element, das von jeder ioBroker-Benutzeroberfläche angezeigt werden kann: vis-2, devices, aura, admin. Die Komponente enthält eine eigene Beschreibung ihrer Einstellungen. Der Host rendert diese Beschreibung als seine eigene Einstellungs-Benutzeroberfläche und stellt der Komponente eine Verbindung zu ioBroker sowie die Werte der Einstellungen bereit.

Der Vertrag – das Modul, das Manifest, die Eigenschaften des Elements, die Ereignisse, die Dialoge – und die Basisklasse für Komponenten befinden sich in[`@iobroker/web-components`](https://github.com/ioBroker/web-components) Diese Seite beschreibt lediglich die Funktion von vis-2 als Host. Die Host-Seite befindet sich in[`src-vis/src/Vis/WebComponents/`](https://github.com/iobroker/iobroker.vis-2/blob/master/packages/iobroker.vis-2/src-vis/src/Vis/WebComponents/) Die Demokomponente vis-2 bringt sich selbst mit.[`src-vis/public/demo-components/iob-state-tile.js`](https://github.com/iobroker/iobroker.vis-2/blob/master/packages/iobroker.vis-2/src-vis/public/demo-components/iob-state-tile.js) - wird nur auf dem Entwicklerserver in der Farbpalette angeboten.

## Wie vis-2 die Komponenten findet

Ein Adapter listet seine Komponenten auf in `common.webComponents` seiner `io-package.json` Die Manifestdateien befinden sich im zugehörigen Admin-Ordner. Sowohl Admin als auch Web verwenden diesen Ordner als `/adapter/<adapter>/` Im Manifest wird das ES-Modul des Elements wie folgt benannt: `module`, relativ zu sich selbst:

```json
"common": {
    "webComponents": ["webcomponents/my-tile.json"]
}
```

vis-2 liest es aus den Instanzobjekten (zur Laufzeit von `config.js`, die der Adapter schreibt mit `webComponents`) und löst die URLs mit `getWebComponentSources()` des Pakets, also vis-2 unter `/vis-2/` Auch hinter einem Reverse-Proxy werden dieselben Dateien gefunden. Ein ungültiges Manifest wird ausgelassen und ein Fehler in der Konsole angezeigt; ein Tag, das von zwei Komponenten verwendet wird, wird von der ersten Komponente übernommen.

Die Farbpalette und die Attribute stammen ausschließlich aus dem Manifest. vis-2 importiert das Modul einer Komponente, wenn ein Widget davon zum ersten Mal angezeigt wird (`importWebComponent()` Das Modul lädt das Modul einmalig für alle Widgets des Pakets und erstellt anschließend das Element. Kann das Modul nicht geladen werden oder definiert es das entsprechende Tag in seinem Manifest nicht, bleibt das Widget leer; der Editor zeigt den Grund dafür an.

Ein Modul, das sein Manifest exportiert (`@iobroker/web-components` Version 0.2) funktioniert weiterhin: vis-2 importiert es sofort, um das Manifest zu lesen. Die Demokomponente ist ein solches Modul.

Eine React-Komponente bündelt React nicht: Web- und Admin-Komponenten liefern jeweils eine Kopie pro Hauptversion. `/lib/esm/react-19.js` Und `/lib/esm/react-18.js`, sehen `REACT_19_URL` des Pakets.

## Das Widget

Jede Komponente wird zu einem Widget-Typ `tplWc_<tag>` in der Farbpalette seines Adapters, mit der Größe von `manifest.size` für ein neues Widget; `size.noResize` Dadurch ist das Widget nicht skalierbar. Wenn der Adapter eigene vis-2-Widgets besitzt, werden die Komponenten in diesem Set neben diesen platziert; andernfalls wird das Set entsprechend gekennzeichnet. `common.titleLang` Und `common.icon` des Adapters. Die Laufzeitumgebung lädt die Komponenten nur dann, wenn das Projekt eine solche Komponente anzeigt, und lädt dafür nicht die Widgets des Adapters.

Wenn der Adapter ebenfalls ein vis-2-Widget mit demselben Namen – also aus demselben Set und mit demselben Namen in der Palette, wie beispielsweise das „Flussdiagramm“ von flow – mitbringt, bietet die Palette nur das vis-2-Widget an. Bereits platzierte Widgets der Komponente bleiben unverändert.

Ein `objectId` Einstellung mit `root` bietet nur dieses Objekt und die darunter liegenden Objekte an, z.B.`"types": "config",
"root": "flow.0.diagrams"` Die

Das Element erhält folgende Eigenschaften:

| Eigentum   | In vis-2                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `socket`   | die Verbindung von vis-2                                                                                 |
| `settings` | Die Werte der Attribute, typisiert gemäß der Manifestdefinition; ein neues Objekt nur bei einer Änderung |
| `theme`    | die Farben, die Schriftart und die Ecken des Designs von vis-2 (`getWebComponentTheme`)                 |
| `editMode` | Wenn dies im Editor als wahr markiert ist, schreibt das Element dann nichts und öffnet keine Dialoge.    |
| `dialogs`  | MUI-Dialoge von vis-2, siehe unten                                                                       |

Bindungen funktionieren in jedem Feld: Das Widget übergibt die Werte, nachdem vis-2 sie aufgelöst hat.

## Die Einstellungen

vis-2 rendert keine JSON-Konfiguration. Es ordnet die Einstellungen des Manifests Feldern seines Attributbereichs zu:

| JSON-Konfiguration   | vis-2 Feld       | Anmerkungen                                                              |
| -------------------- | ---------------- | ------------------------------------------------------------------------ |
| `text`               | `text`           | `minRows > 1` bietet einen mehrzeiligen Editor                           |
| `password`           | `password`       |                                                                          |
| `number`             | `number`         | `min`, `max`, `step`                                                    |
| `slider`             | `slider`         | `min`, `max`, `step`                                                    |
| `checkbox`           | `checkbox`       |                                                                          |
| `color`              | `color`          |                                                                          |
| `select`             | `select`         | `options: [{ value, label }]`                                            |
| `selectSendTo`       | `custom`         | Optionen, die vom Adapter angefordert werden, siehe unten                |
| `autocompleteSendTo` | `custom`         | Text mit Vorschlägen des Bearbeiters; `freeSolo`, `maxLength`, `options` |
| `objectId`           | `id`             | `types` beschränkt den Objektbrowser (z. B. `config`), `root` der Zweig   |
| `instance`           | `instance`       | `adapter`                                                                |
| `header`             | `help`(deutlich) | `text`, kein Wert                                                       |
| `staticText`         | `help`           | `text`, kein Wert                                                       |
| `divider`            | `delimiter`      | kein Wert                                                                |

Registerkarten werden zu Gruppen im Attributbereich. `hidden` Und `disabled` sind JS-Ausdrücke über `data`, wie in JSON-Config. Jeder andere Typ wird als Textfeld angezeigt. vis-2 lässt eine Einstellung aus, deren Namen es für jedes Widget selbst verwendet (`name`, `class`, `comment`, `filterkey`, `locked`, `multi-views`, `visibility*`, `signals-*`, `lc-*`, `g_*`).

### Optionen des Adapters: `selectSendTo` Und `autocompleteSendTo`

Die Optionen dieser Einstellungen kennt nur der Adapter zur Laufzeit – seine Standorte, Geräte, Diagramme. vis-2 fragt eine Instanz mit `sendTo(instance, command, message)` über seine eigene Verbindung und zeigt die Antwort `[{ value, label }]` als die Optionen (`label` eine Zeichenkette oder `{ en, de, ... }` (Ein einfacher Wert ist seine eigene Bezeichnung). `getSendToRequest(setting, data, adapter)` Und `toSendToOptions(answer)` des Pakets (0.8) erledigen die Arbeit:

- Die Instanz ist `instance` der Umgebung, ein Muster wie `${data.instance}` Ohne es fragt vis-2 `<adapter>.0` des Adapters, der die Komponente bereitstellt. Die Nachricht lautet: `data` so wie es ist, oder `jsonData`, ein Muster über die Werte aller Einstellungen - typisiert, wie die Komponente sie abruft - das JSON ergibt. `command` Ist `send` falls fehlen.
- vis-2 fragt erneut, wann die Instanz, der Befehl, die Nachricht oder eine Einstellung in `alsoDependsOn` Änderungen werden 300 ms nach der letzten Änderung vorgenommen, sodass beim Eingeben einer Einstellung nur einmal nachgefragt wird. Es wartet 10 Sekunden auf die Antwort.
- `selectSendTo` Es handelt sich um eine Auswahlliste. Ein Wert, der nicht in der Antwort enthalten ist, bleibt erhalten und wird als „Nicht in der Liste“ markiert.
- `autocompleteSendTo` ist ein Textfeld mit der Antwort, dann das `options` des Manifests, als Vorschläge; `maxLength` begrenzt den Text. Durch Eingabe der Bezeichnung einer Option wird deren Wert gespeichert. Ohne `freeSolo` Ein Text, der keiner Option entspricht, wird als „Nicht in der Liste“ markiert – er wird aber trotzdem gespeichert, sodass nichts Eingegebenes verloren geht.
- Es gibt noch keinen Fall, in dem man fragen könnte (`${data.instance}` Wenn keine Instanz ausgewählt wird, keine Antwort erfolgt, ein Fehler auftritt, ein Timeout auftritt oder die Liste leer ist: Das Feld ist ein einfaches Textfeld, unter dem der Grund angezeigt wird, sodass der Wert bearbeitbar bleibt.

Der Wert wird wie jeder Wert in vis-2 als Text gespeichert und als Zeichenkette an die Komponente übergeben. Im Attributbereich sind diese Einstellungen `custom` Felder; das Feld wird nur geladen, wenn der Editor eines anzeigt. Eine Form von `dialogs.open()` zeigt sie auf die gleiche Weise an, mit den Werten der Form als `data` Die

## Ereignisse und Dialoge

- `iob-navigate` mit `detail: { view }`: vis-2 zeigt diese Ansicht an und bricht das Ereignis ab. Nicht im Editor.
- `dialogs.open()` mit einem Element: vis-2 rahmt es in einem MUI-Dialog ein; das Element schließt es mit `iob-dialog-close`, wessen `detail` ist das Ergebnis. Andernfalls führt das Schließen des Dialogs zu folgendem Ergebnis: `null` Die
- `dialogs.open()` mit einem Formular: vis-2 rendert das JSON-Konfigurationsfeld mit den Feldtypen der obigen Tabelle und gibt die Werte zurück, oder `null` bei Abbrechen.

Die Dialoge werden bei Bedarf geladen: Eine Seite, deren Komponenten nie einen Dialog öffnen, lädt diese auch nicht. Ein Dialog, der noch geöffnet ist, wenn das Widget verschwindet, beantwortet die Fragen. `null` Die

## Offene Punkte

- Größe in Rasterabschnitten (`visDefaultGrid`), und ob eine Komponente von ihrem Host eine andere Größe anfordern kann.
- Versionierung: Ein älteres Modul ist nach einer Aktualisierung des Adapters noch im Browser zwischengespeichert.