---
chapters: {"pages":{"en/adapterref/iobroker.dwd/README.md":{"title":{"en":"ioBroker.dwd"},"content":"en/adapterref/iobroker.dwd/README.md"},"en/adapterref/iobroker.dwd/docs/en/README.md":{"title":{"en":"DWD widgets"},"content":"en/adapterref/iobroker.dwd/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dwd/docs/en/README.md
title: DWD-Widgets
hash: N9K7UBi8tHWssXkRmPX96GKA1xOvjTnzy9Nh9QIeZTs=
---
# DWD-Widgets

Der `dwd` Der Adapter wird neben dem Adapter selbst mit drei Frontends geliefert:

| Wo                         | Was                                                       |
| -------------------------- | --------------------------------------------------------- |
| **vis / vis-2**            | Die `DWD warnings` Widget, im Widget-Set `dwd`              |
| **ioBroker.devices**       | Die `DWD warning` Kachel für das Dashboard                 |
| **Aura, Admin und andere** | die Webkomponente `<iob-dwd-warnings>` siehe Webkomponente |

Alle zeigen dieselben Daten an und sind gleich konfiguriert: Wählen Sie die Adapterinstanz und die Nummer der Warnung aus. Alles andere ist optional.

In den Instanzeinstellungen werden auch die aktuell aktiven Warnungen angezeigt, siehe [Instanzeinstellungen](#the-instance-settings) .

---

## Die Warnhinweise des Adapters

Der Adapter schreibt die Warnungen der konfigurierten Region in nummerierte Kanäle:

```
dwd.0.warning.headline       Amtliche WARNUNG vor WINDBÖEN
dwd.0.warning.text           WINDBÖEN
dwd.0.warning.description    Es treten Windböen mit Geschwindigkeiten ...
dwd.0.warning.instruction    recommendation of the DWD, often empty
dwd.0.warning.severity       0, 1 … 4, 9, 11, 19, 49, 50
dwd.0.warning.begin          start, milliseconds since epoch
dwd.0.warning.end            end, may be empty
dwd.0.numberOfWarnings       how many warnings are currently active
```

** `warning` ist immer die aktuell aktivste, schwerwiegendste Warnung.** Die Liste wird bei jedem Durchlauf neu sortiert, sodass ein Widget, das auf diese Warnung verweist, immer die aktuell schwerwiegendste Warnung anzeigt. `warning` Es wird immer das Wichtigste angezeigt – es bleibt nicht bei einem einzelnen Ereignis. Die anderen Kanäle sind `warning1`, `warning2`, … — die erste hat keine Nummer, es gibt keine `warning0` Die Anzahl der verfügbaren Kanäle wird in der Adapterkonfiguration festgelegt („Anzahl der Warnungen“, 1 … 10).

Wenn weniger Warnungen als Kanäle vorhanden sind, werden die verbleibenden Kanäle geleert. Die Widgets zeigen dann „Keine Warnung“ an.

### Warnungen für eine Gemeinde (Warnzelle)

Die Regionen umfassen Bezirke, Küsten- und Seengebiete. Um die Warnungen einer einzelnen Gemeinde zu erhalten, geben Sie zusätzlich deren **Warnzellen-ID** ein – 9-stellig, beginnend mit 1. `8` (`7` für die Bezirke Berlin und Hamburg). Die ID ist in der [Warnzellenliste des DWD](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/cap_warncellids_csv.csv?__blob=publicationFile\&v=3) aufgeführt (CSV, die Zeilen mit `8…` /`7…`; die Zeilen mit `1…` (diese Bezirke werden nicht akzeptiert).

Die Warnungen der Warnzelle werden vom Geoserver des DWD gelesen (`maps.dwd.de`) und werden **zusätzlich** zu denen der Region in einem eigenen Ordner mit derselben Struktur und derselben Anzahl an Kanälen gespeichert:

```
dwd.0.warncell.numberOfWarnings
dwd.0.warncell.warning.headline     most severe warning of the municipality
dwd.0.warncell.warning1.headline    second most severe
...
```

Was die Region betrifft, so hat der erste Kanal keine Nummer. Die Ordner- und Kanalnamen enthalten den Namen der Gemeinde, den der Adapter einmalig im DWD nachschlägt. Ohne Warnzellen-ID existiert der Ordner nicht; wenn die ID wieder entfernt wird, löscht der Adapter ihn beim nächsten Durchlauf. Die Karte (`map`) folgt weiterhin dem konfigurierten Bundesstaat.

### Die Farbe

Die Hintergrundfarbe stammt von `severity` und ist in beiden Widgets und im alten vis-1-Widget-Set identisch:

| Schwere | Bedeutung                      | Farbe     |
| ------- | ------------------------------ | --------- |
| 0       | keiner                         | —         |
| 1       | Wetterwarnung                  | `#ffeb3b` |
| 2       | Warnung vor erheblichem Wetter | `#fb8c00` |
| 3       | Unwetterwarnung                | `#e53935` |
| 4       | Warnung vor extremen Unwettern | `#880e4f` |
| 9       | Hitzewarnung                   | `#c99afe` |
| 11      | keine Warnung                  | `#c9f`    |
| 19      | UV-Warnung                     | `#fe68fe` |
| 49      | starke Hitze                   | `#e966fe` |
| 50      | extreme Hitze                  | `#f933fe` |

![Schweregradfarben](../../../../../en/adapterref/iobroker.dwd/docs/img/severity-colors.svg)

_Gerendert, wobei die Textfarbe dem jeweiligen Hintergrund zugeordnet ist._

Diese Farben transportieren die Bedeutung der Warnung und folgen daher **nicht** dem Hell/Dunkel-Thema. `#880e4f` Aufenthalte `#880e4f` In beiden Fällen. Lediglich die Textfarbe darüber wird automatisch ausgewählt (schwarz oder weiß), sodass der Text in beiden Designs lesbar bleibt.

---

## vis-2: die `DWD warnings` Widget

Widget-Set `dwd` Widget `DWD warnings` Die

![Das Widget in beiden Layouts](../../../../../en/adapterref/iobroker.dwd/docs/img/vis2-widget.svg)

### Einstellungen

| Einstellung               | Bedeutung                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Layout**                | `Full warning` — Überschrift, Beschreibung, Zeitraum und Anweisung. `Compact` — eine Zeile mit dem kurzen Warntext.                               |
| **Beispiel**              | welche `dwd` Instanz zum Lesen                                                                                                                    |
| **Warnung**               | Nummer der Warnung. `0` ist die schwerwiegendste (Kanal `warning`), `1` bedeutet `warning1` und so weiter.                                          |
| **Zeitformat**            | Wie Anfang und Ende gedruckt werden. Platzhalter: `YYYY`, `YY`, `MM`, `DD`, `hh`, `mm`, `ss`. Standard `DD.MM hh:mm` Nur im vollständigen Layout. |
| **Anleitung anzeigen**    | Shows `instruction` — die Empfehlung des DWD. Es ist oft leer. Nur im vollständigen Layout.                                                       |
| **Ohne Karte** / **Name** | die übliche Vis-2-Karte um das Widget herum                                                                                                      |

Unter **Objekt-IDs** gibt es noch einen weiteren Schalter:

| Einstellung                      | Bedeutung                                                                                                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objekt-IDs manuell festlegen** | Deaktiviert die Ableitung aus der Instanz und die Warnnummer und ermöglicht es Ihnen, das Widget auf sechs beliebige Zustände zu verweisen. Nur erforderlich, wenn die Zustände nicht von einer Instanz stammen. `dwd` Beispiel. |

### Kommt von vis-1

Das alte Widget-Set enthielt zwei Vorlagen. `tplDwdAdapter` (groß) und `tplDwdAdapterSmall` (kompakt). Das Vis-2-Widget ist **ein einzelnes** Widget, und die beiden Varianten sind die `Layout` Einstellung.

- Ansichten, die verwende&#x6E;** `tplDwdAdapter` ** Die Einstellungen werden automatisch vom vis-2-Widget übernommen – es registriert sich unter derselben Template-ID. Die bereits konfigurierten Objekt-IDs werden weiterhin verwendet, sodass das Widget die gleichen Inhalte wie zuvor anzeigt. Manuelle Änderungen sind nicht erforderlich.
- Ansichten, die verwende&#x6E;** `tplDwdAdapterSmall` ** Verwenden Sie weiterhin die alte vis-1-Vorlage, die noch ausgeliefert wird. Um sie in das vis-2-Widget zu übertragen, platzieren Sie eine `DWD warnings` Widget und Set `Layout` Zu `Compact` Die

> **Hinweis zum alten Standardwert:** Im Widget „vis-1“ war das Feld für die Anweisung vorausgefüllt mit `dwd.0.warning.hint` Dieser Zustand existiert nicht – der Adapter schreibt `dwd.0.warning.instruction` Wenn Ihre Anweisung leer blieb, lag es daran. Das vis-2-Widget verwendet den korrekten Zustand, wenn es die IDs selbst ableitet.

---

## ioBroker.devices: die `DWD warning` Fliese

Im Dashboard von `ioBroker.devices`, füge das Widget **DWD-Warnung hinzu** .

![Die Fliese in ihren drei Größen](../../../../../en/adapterref/iobroker.dwd/docs/img/devices-tiles.svg)

### Einstellungen

| Einstellung            | Bedeutung                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Beispiel**           | welche `dwd` Instanz zum Lesen                                                                           |
| **Warnung**            | Nummer der Warnung. `0` ist die schwerwiegendste (Kanal `warning`), `1` bedeutet `warning1` und so weiter. |
| **Zeitformat**         | Anfang und Ende werden mit denselben Platzhaltern wie oben gedruckt.                                    |
| **Zeitraum anzeigen**  | zeigt Beginn und Ende der Warnung an                                                                    |
| **Anleitung anzeigen** | Zeigt die Empfehlung des DWD an, standardmäßig deaktiviert.                                             |
| **Symbol** / **Name**  | die übliche Kachelüberschrift                                                                           |

### Die drei Größen

Die Kachel passt sich ihrer Größe im Dashboard an:

- **1×1** — Symbol und kurzer Warntext.
- **2×0,5** — ein Streifen: Symbol, Warntext in der Farbe der Warnstufe, Punkt.
- **2×1 und 2×2** – die Titelleiste mit dem Punkt, dann Überschrift, Beschreibung und, falls aktiviert, die Anweisung.

Die Kachel wird als „aktiv“ gekennzeichnet, solange eine Warnung vorliegt, und übernimmt die Farbe des Schweregrades als Akzentfarbe – so ist eine aktive Warnung im Dashboard sichtbar, ohne dass der Text gelesen werden muss.

---

## Webkomponente: `<iob-dwd-warnings>`

Der Adapter bringt die Warnung auch als [Webkomponente](https://github.com/ioBroker/web-components) mit: ein Element, das jede ioBroker-Benutzeroberfläche mit Unterstützung für `@iobroker/web-components` Ähnliche Anzeigen gibt es für Aura, Admin, Vis-2 und Geräte. Sie heißen **DWD-Warnung** , genau wie die Gerätekachel, daher bietet die Gerätekachel eine eigene an.

Es wird eine Warnung pro Instanz angezeigt: Überschrift, Punkt, Beschreibung und, falls aktiviert, die Anweisung sowie die Warnhinweisfarbe entsprechend der Schwere der Warnung – oder, im kompakten Layout, eine Zeile mit dem kurzen Warntext. Ohne Warnung wird „Keine Warnung“ angezeigt. Ein Klick auf die Warnung öffnet ein Dialogfeld mit allen Informationen. Das Element übernimmt die Farben und die Schriftart der Seite, auf der es angezeigt wird, und skaliert mit der Größe seines Rahmens.

| Einstellung            | Bedeutung                                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Beispiel**           | welche `dwd` Instanz zum Lesen                                                                                                                                   |
| **Warnungen für**      | `Region` - der Bereich der Instanzeinstellungen (`warning<n>`); `Municipality (warncell)` - die Warnzellen-ID der Instanzeinstellungen (`warncell.warning<n>`) |
| **Warnung**            | Nummer der Warnung. `0` ist die schwerwiegendste (Kanal `warning`), `1` bedeutet `warning1` und so weiter.                                                         |
| **Layout**             | `Full warning` oder `Compact` wie im vis-2-Widget                                                                                                                |
| **Name**               | wird die Warnung über dem Warnhinweis angezeigt; leer: nichts                                                                                                   |
| **Zeitraum anzeigen**  | zeigt Beginn und Ende der Warnung an                                                                                                                            |
| **Zeitformat**         | Anfang und Ende werden mit denselben Platzhaltern wie oben gedruckt.                                                                                            |
| **Anleitung anzeigen** | Zeigt die Empfehlung des DWD an, standardmäßig deaktiviert.                                                                                                     |

Die Einstellungen des vis-2-Widgets für manuell festgelegte Objekt-IDs haben kein Gegenstück: Sie existieren für Ansichten, die von vis-1 migriert wurden. Stattdessen wird die Gemeinde mit **Warnungen** ausgewählt.

---

## Die Instanzeinstellungen

Unterhalb der Konfiguration listen die Instanzeinstellungen die Warnungen auf, die derzeit für die konfigurierte Region aktiv sind:

![Die aktuellen Warnungen in den Instanzeinstellungen](../../../../../en/adapterref/iobroker.dwd/docs/img/config-warnings.svg)

Die Werte werden direkt aus den Zuständen gelesen, **nicht** aus dem Adapterprozess – der Adapter läuft im Zeitplanmodus und ist nur wenige Sekunden alle fünf Minuten aktiv, sodass alles, was die laufende Instanz abfragen müsste, normalerweise zu einem Timeout führen würde.

Eine Warnung, deren Überschrift leer ist, wird ausgeblendet, ebenso wie die `warning<n>` Kanäle, die nicht existieren, weil die „Anzahl der Warnungen“ zu niedrig eingestellt ist. Falls keine Warnung vorliegt, wird dies in einer einzelnen Zeile angezeigt. Die Liste aktualisiert sich automatisch, sobald der Adapter neue Werte schreibt – der Dialog muss nicht erneut geöffnet werden.

Wenn eine Warnzellen-ID festgelegt ist, folgen die Warnungen der Warnzelle unten in einer zweiten Liste derselben Art.

---

## Aufbauend auf dem Quellcode

```bash
npm run build            # adapter + all front-ends
npm run build:widgets    # only the vis-2 widget set -> widgets/dwd/
npm run build:devices    # only the devices tile     -> admin/dm-widgets/
npm run build:wc         # only the web component    -> admin/webcomponents/
```

Die Quellen sind in `src-widgets/` (vis-2), `src-devices/` (Geräte-Dashboard) und `src-webcomponents/` (Webkomponente). Die ersten beiden sind React + TypeScript, erstellt mit Vite und Modulföderation. Die Webkomponente ist ebenfalls React + TypeScript, erstellt mit Vite in ein ES-Modul, das React vom Host verwendet (`lib/esm/react-19.js` Die Komponentennamen und die URL werden wiederholt in `io-package.json` unter `common.visWidgets` Und `common.deviceWidgets` — das Hinzufügen eines Widgets bedeutet, die Oberfläche zu berühren `exposes` der Vite-Konfiguration **und** dieses Blocks.