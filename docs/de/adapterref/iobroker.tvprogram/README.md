---
chapters: {"pages":{"en/adapterref/iobroker.tvprogram/README.md":{"title":{"en":"ioBroker.tvprogram"},"content":"en/adapterref/iobroker.tvprogram/README.md"},"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tv-Programm
hash: u+jxjiQxQHN9F5+RN9ahusygyXUzpKhylTmPFS4lZC0=
---
![Logo](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tvprogram-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tvprogram-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![Test und Freigabe](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tv-Programm

## `tvprogram` Adapter für ioBroker

Dieser Adapter lädt Fernsehprogrammdaten herunter und stellt sie den ioBroker VIS-Widgets zur Verfügung. Die Programmdaten werden als Dateien im Adapterspeicher gespeichert, anstatt in Datenpunkte kopiert zu werden.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Adapterkonfiguration](#adapter-configuration)
  - [Programmquellen](#programme-sources)
  - [Alternative Kanallogos](#alternative-channel-logos)
- [Widgets](#widgets)
  - [Allgemeine Widget-Konfiguration](#common-widget-configuration)
  - [Zeitplan](#timetable)
  - [Favoriten](#favorites)
  - [TV-Steuerung](#tv-control)
  - [Suchen](#search)
- [Datenpunkte](#data-points)
- [`sendTo` Befehle](#sendto-commands)
- [Beispiele](#examples)
- [Merkmale](#features)
- [Geplante Arbeiten](#planned-work)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

## Installation

Installieren Sie den Adapter aus dem stabilen ioBroker-Repository. Verwenden Sie das Beta- oder das neueste Repository, um eine Entwicklungsversion zu testen.

Nach dem ersten Start warten Sie, bis der Adapter Programm- und Kanaldaten heruntergeladen hat, bevor Sie die Widgets konfigurieren.

## Adapterkonfiguration

Erstellen Sie für jede unabhängige Kanalauswahl, Favoritenliste und jedes Umschaltziel eine eigene TV-Konfiguration. Jeder Fernseher erhält unterhalb der Adapterinstanz einen eigenen Satz von Datenpunkten.

### Programmquellen

Der Adapter unterstützt folgende Programmquellen:

- **TV für alle**
- **IPTV-EPG.org**

Wählen Sie für IPTV-EPG.org das gewünschte Land und eine lokale tägliche Downloadzeit aus. `HH:mm` Der Download startet mit einem stabilen, zufälligen Zeitversatz von bis zu 60 Minuten nach diesem Zeitpunkt. Dadurch werden die Anfragen von verschiedenen ioBroker-Installationen verteilt.

Beim Start prüft der Adapter, ob die konfigurierte Quelle nutzbare Kanal- und Programmdaten für den aktuellen Sendetag enthält. Fehlende Daten werden sofort heruntergeladen. Fehlgeschlagene Downloads werden nach einer Stunde wiederholt.

Sendungen zwischen Mitternacht und 04:59 Uhr gehören zum vorherigen Sendetag. Durch Ändern der Quelle oder des IPTV-EPG-Landes werden der Programmcache und alle gespeicherten Senderauswahlen gelöscht. Wählen Sie die Sender nach dem Laden des neuen Programmführers erneut aus.

### Alternative Kanallogos

Stellen Sie die `optchnlogopath` Wenn Sie beispielsweise Quelllogos ersetzen möchten, verweisen Sie auf ein im Browser zugängliches Verzeichnis:

`http://192.1.2.3:8082/vis.0/icons/tvlogos/`

Verwenden Sie PNG-Dateinamen in Kleinbuchstaben, die auf der IPTV-EPG-Kanal-ID ohne das abschließende Ländersuffix basieren. `DasErste` ist ein Alias und verwendet immer `ard.png` Die

| Land        | Kanal-IDs                              | Logo-Dateinamen                      |
| ----------- | -------------------------------------- | ------------------------------------ |
| Deutschland | `DasErste.de`, `ZDF.de`, `RTL.de`      | `ard.png`, `zdf.png`, `rtl.png`      |
| Österreich  | `DasErste.at`, `ORF1.at`, `PULS4.at`   | `ard.png`, `orf1.png`, `puls4.png`   |
| Schweiz     | `DasErste.ch`, `SRF1.ch`, `ORFeins.ch` | `ard.png`, `srf1.png`, `orfeins.png` |

Für regionale IDs gilt dieselbe Regel: `ORF2Wien.at` wird `orf2wien.png`, Und `SRFzwei.ch` wird `srfzwei.png` Überprüfen Sie fehlgeschlagene Bildanfragen in den Entwicklertools des Browsers, falls ein Dateiname unklar ist.

Wann `optchnlogopath` Wenn die Widgets leer sind, verwenden sie Quelllogos. Die Kanalauswahl verwendet immer Quelllogos, damit die Kanäle erkennbar bleiben.

Beispiele für Einrichtung und Konvertierung finden Sie unter [den Logobeispielen des Alternativkanals](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#alternative-channel-logos) .

## Widgets

Die Widgets benötigen einen modernen Browser wie Chrome, Firefox, Safari, Opera oder den auf Chromium basierenden Edge. Internet Explorer und ältere Edge-Versionen werden nicht unterstützt.

### Allgemeine Widget-Konfiguration

Wählen Sie einen beliebigen Datenpunkt des gewünschten Fernsehers aus, normalerweise dessen `cmd` Datenpunkt. Das Widget ermittelt die restlichen Datenpunkt-IDs automatisch.

Die gängigen Anzeigeoptionen steuern die Breite des Kanallogos, die Zeilenhöhe, die Programmbilder, die Schriftgrößen, die bevorzugte Farbe und die Abmessungen des Detaildialogs. Konfigurieren Sie eine explizite Vorder- und Hintergrundfarbe, wenn das Ansichtsdesign den Programmeinträgen nicht genügend Kontrast bietet.

Falls Widgets nach der Installation fehlen oder veraltet sind, führen Sie Folgendes aus:

`iobroker upload tvprogram`

Beispiele für die CSS-Anpassung von Widgets finden Sie unter [Widget-Styling](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#widget-styling) .

### Zeitplan

Das Widget „Zeitplan“ zeigt Programme nach Kanal auf einer Zeitachse an. Es markiert die aktuelle Uhrzeit, unterstützt Zoom und Tagesnavigation und öffnet Programmdetails aus der vollständigen Programmübersicht.

Öffnen Sie die Kanalauswahl über das Widget-Menü. Klicken Sie auf eine Karte, um einen Kanal zu aktivieren oder zu deaktivieren. Aktive Kanäle werden zuerst angezeigt und behalten ihre benutzerdefinierte Reihenfolge bei. Ziehen Sie eine aktive Karte, um sie zu verschieben; auf Touchscreens halten Sie sie kurz gedrückt, bevor Sie sie ziehen. Die Suchfunktion filtert die sichtbaren Karten. Mit der Sortierschaltfläche können Sie inaktive Kanäle nach Quellreihenfolge, A–Z und Z–A sortieren. Das Häkchen speichert die Änderungen, das Kreuz oder die Escape-Taste schließen das Fenster ohne Speichern. Die Schaltfläche oben rechts schaltet zwischen der konfigurierten Größe und dem Vollbildmodus um.

Logos behalten ihre Proportionen und sind innerhalb der konfigurierten Kanalbreite und Zeilenhöhe zentriert. Bilder werden nahe am sichtbaren Bereich geladen, mit bis zu vier gleichzeitigen Anfragen und einem Wiederholungsversuch. Die vertikale Scrollleiste ist ausgeblendet; eine schmale horizontale Scrollleiste bleibt unterhalb der Programmzeilen sichtbar.

Nach dem Laden des aktuellen Tages wartet das Widget mindestens zehn Sekunden und lädt die Daten der beiden folgenden Sendetage vor. Laufende Bild-Downloads können diesen Vorgang verzögern.

| Attribut                | Standard/Beispiel     | Beschreibung                                |
| ----------------------- | --------------------- | ------------------------------------------- |
| `tvprogram_oid`         | `tvprogram.0.tv1.cmd` | Datenpunkt, der zum Fernseher gehört        |
| `widthItem`             | `120`                 | Breite eines 30-Minuten-Segments in Pixeln  |
| `heightRow`             | `35`                  | Programmzeilenhöhe in Pixeln                |
| `channeliconwidth`      | `35`                  | Verfügbare Kanallogobreite in Pixeln        |
| `showpictures`          | ermöglicht            | Programmbilder anzeigen, sofern verfügbar   |
| `headerfontpercent`     | `125`                 | Schriftgröße der Zeitüberschrift in Prozent |
| `broadcastfontpercent`  | `75`                  | Schriftgröße des Programms in Prozent       |
| `highlightcolor`        | `yellow`              | Lieblings-Strähnchenfarbe                   |
| `markerpositionpercent` | `25`                  | Aktuelle Zeitmarkierungsposition            |
| `dialogwidthpercent`    | `90`                  | Dialogbreite relativ zum Widget             |
| `dialogheightpercent`   | `90`                  | Dialoghöhe relativ zum Widget               |

### Favoriten

Das Favoriten-Widget listet anstehende Sendungen auf, deren Titel im TV-Menü angezeigt werden. `favorites` Datenpunkt. Die Ergebnisse sind nach Datum und Uhrzeit sortiert und werden jede Minute aktualisiert.

| Attribut                     | Standard/Beispiel     | Beschreibung                                  |
| ---------------------------- | --------------------- | --------------------------------------------- |
| `oid`                        | `tvprogram.0.tv1.cmd` | Datenpunkt, der zum Fernseher gehört          |
| `channelname`                | deaktiviert           | Kanalnamen statt Logos anzeigen               |
| `favorites_selectedchannels` | deaktiviert           | Ergebnisse auf ausgewählte Kanäle beschränken |
| `showweekday`                | ermöglicht            | Zeige den Wochentag                           |
| `maxfavorites`               | `10`                  | Maximale Anzahl der Ergebnisse                |
| `highlightcolor`             | `yellow`              | Lieblingssymbolfarbe                          |
| `channeliconwidth`           | `35`                  | Breite des Kanallogos in Pixeln               |

Wenn die Kanalauswahl beschränkt ist, verwendet Favoriten die Programmübersicht für denselben Fernseher. Bevor eine Auswahl gespeichert wird, werden die ersten vier Kanäle verwendet. Eine explizit leere Auswahl führt zu keinen Ergebnissen.

### TV-Steuerung

Die TV-Steuerung zeigt das aktuell laufende Programm oder das Programm zu einem festgelegten Zeitpunkt an. Ein Klick auf das Kanallogo löst einen Umschaltbefehl aus; ein Klick auf eine beliebige Stelle der Programmkarte öffnet deren Details. Die Liste lässt sich vertikal scrollen, ohne dass eine Scrollleiste angezeigt wird.

| Attribut               | Standard/Beispiel      | Beschreibung                                            |
| ---------------------- | ---------------------- | ------------------------------------------------------- |
| `oid`                  | `tvprogram.0.tv1.cmd`  | Datenpunkt, der zum Fernseher gehört                    |
| `time`                 | leer                   | Zeigen Sie das aktuelle Programm                        |
| `time`                 | `20:15`                | Zeigen Sie das Programm zu dieser Zeit für 120 Minuten. |
| `time`                 | `20:15/200`            | Verwenden Sie eine Anzeigedauer von 200 Minuten.        |
| `time`                 | ISO-Datumszeichenfolge | Programme zu einer absoluten Zeit anzeigen              |
| `heightRow`            | `35`                   | Programmzeilenhöhe in Pixeln                            |
| `channeliconwidth`     | `35`                   | Verfügbare Kanallogobreite in Pixeln                    |
| `showpictures`         | ermöglicht             | Programmbilder anzeigen, sofern verfügbar               |
| `broadcastfontpercent` | `75`                   | Schriftgröße des Programms in Prozent                   |
| `highlightcolor`       | `yellow`               | Lieblings-Strähnchenfarbe                               |
| `dialogwidthpercent`   | `90`                   | Breite des Detaildialogs                                |
| `dialogheightpercent`  | `90`                   | Höhe des Detaildialogs                                  |

### Suchen

Die Suche findet Programme anhand von Titel, Beschreibung, Kategorie und Startdatum. Mindestens der Suchtext oder eine Kategorie muss angegeben werden. Bei einem unveränderten aktuellen Datum startet die Suche zur aktuellen Uhrzeit; bei einem anderen Datum um Mitternacht. Alternative Senderlogos von `optchnlogopath` werden unterstützt. Die Ergebnisse scrollen vertikal, ohne dass eine Scrollleiste angezeigt wird.

| Attribut               | Standard/Beispiel     | Beschreibung                              |
| ---------------------- | --------------------- | ----------------------------------------- |
| `Object ID`            | `tvprogram.0.tv1.cmd` | Datenpunkt, der zum Fernseher gehört      |
| `showpictures`         | ermöglicht            | Programmbilder anzeigen, sofern verfügbar |
| `maxresults`           | `10`                  | Maximale Anzahl der Ergebnisse            |
| `heightRow`            | `35`                  | Programmzeilenhöhe in Pixeln              |
| `broadcastfontpercent` | `75`                  | Schriftgröße des Programms in Prozent     |
| `highlightcolor`       | `yellow`              | Lieblings-Strähnchenfarbe                 |
| `dialogwidthpercent`   | `90`                  | Breite des Detaildialogs                  |
| `dialogheightpercent`  | `90`                  | Höhe des Detaildialogs                    |

## Datenpunkte

Jeder konfigurierte Fernseher liefert folgende Datenpunkte:

| Datenpunkt       | Beschreibung                                                                 |
| ---------------- | ---------------------------------------------------------------------------- |
| `channelfilter`  | Ausgewählte Kanal-IDs in ihrer Anzeigereihenfolge als JSON                   |
| `cmd`            | Interne Kommunikation zwischen Widgets und dem Adapter                       |
| `favorites`      | Lieblingsprogrammtitel als JSON-Array                                        |
| `record`         | Programmdaten, die mit der Schaltfläche „Detailansicht“ aufgezeichnet wurden |
| `selectchannel`  | Kanal-ID wird durch Logo und Schalteraktionen geschrieben                    |
| `show`           | Ob Programm-Widgets nur Favoriten anzeigen                                   |
| `config`         | Veralteter Konfigurationsdatenpunkt                                          |
| `optchnlogopath` | Vom Browser zugängliche Basis-URL für benutzerdefinierte Kanallogos          |

Der `record` Wert enthält `startTime`, `endTime`, `title`, `channel`, `channelid`, `channelname` Und `eventid` Die

## `sendTo` Befehle

Verwenden Sie diese Befehle, um benutzerdefinierte Integrationen zu erstellen:

| Befehl                   | Eingang                               | Ergebnis             |
| ------------------------ | ------------------------------------- | -------------------- |
| `getServerData`          | `categories`, `genres` oder `channels` | Array                |
| `getServerTVProgram`     | Sendetag als `yyyy-mm-dd`              | Array                |
| `getServerBroadcast`     | `viewdate` Und `eventid`               | Objekt               |
| `getFavoritesData`       | Auswahl beliebter Titel               | Array                |
| `getServerBroadcastNow`  | Array von Kanal-IDs                   | Array                |
| `getServerBroadcastDate` | Kanal-IDs und Datum                   | Array                |
| `getServerBroadcastFind` | Filter und Datumsbereich              | Array                |
| `getServerInfo`          | Leeres Objekt                         | Verfügbare Sendetage |

Parameter und ausführbare Aufrufe sind dokumentiert in [`sendTo` Befehlsbeispiele](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md#sendto-command-examples) .

## Beispiele

Alle längeren Beispiele sind in [docs/EXAMPLES.md](/#/docs/adapterref/iobroker.tvprogram/docs/EXAMPLES.md) zu finden:

- CSS-Anpassung für Widgets
- `sendTo` Anfragen
- Harmony- und MagentaTV-Kanalumschaltung
- Einrichtung des alternativen Kanallogos
- Aufnahmeliste und Favoritenstatus-Skripte
- Vorlagen zur Hervorhebung von Datensätzen

## Merkmale

- Programmablauf mit aktueller Zeitmarkierung und automatischem Scrollen
- Konfigurierbare Kanalauswahl und -reihenfolge
- Programmdetaildialoge und Textkopie
- Tagesnavigation und Zoomsteuerung
- Favoritenfilter und Liste der zukünftigen Favoriten
- Kanalumschaltung über einen Datenpunkt
- Optionale Programmbilder und alternative Kanallogos
- Konfigurierbare Logobreite, Zeilenhöhe, Farben und Dialogabmessungen
- Datensatz aus Programmdetails

## Geplante Arbeiten

- Erwägen Sie ein zusätzliches Widget für hervorgehobene Programme.
- Bei ausreichender Nachfrage sollten Sie andere Programm- oder Hardwarequellen in Betracht ziehen.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.0.1 (2026-09-23)

- fix tests

### 5.0.0 (2026-09-23)

- Comprehensive revision
- New data source added

### 4.0.4 (2026-03-27)

- update dependencies
- fix repochecker
- tranform translation files

### 4.0.3 (2026-02-27)

- update dependencies
- improve error handling

### 4.0.2 (2026-01-27)

- improve position of dialogs
- reduce requests to data provider
- test remove node 18,extend to node 24

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>