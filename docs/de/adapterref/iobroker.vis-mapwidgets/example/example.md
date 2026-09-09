---
chapters: {"pages":{"en/adapterref/iobroker.vis-mapwidgets/README.md":{"title":{"en":"ioBroker.mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/README.md"},"en/adapterref/iobroker.vis-mapwidgets/example/example.md":{"title":{"en":"Examples for mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/example/example.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-mapwidgets/example/example.md
title: Beispiele für Kartenwidgets
hash: PgdqwDtG9KdWLfN6IUjQB5v7iHgeC+I5DZibQ7SKuj0=
---
# Beispiele für Kartenwidgets

Vorbereitung auf den Test.

Bitte importieren Sie die Bilder aus dem Verzeichnis test-images nach /vis.0/

![Testbilder in vis](../../../../en/adapterref/iobroker.vis-mapwidgets/example/test-images/test-images.png)

## Verzeichnisbeispiel3MarkersJSON

Der Datenpunkt enthält 3 Marker in unterschiedlichen Konfigurationen.

Zum Testen:

- Erstelle einen Datenpunkt vom Typ String in userdata.0.3Marker
- Kopiere den Inhalt der Datei datapoint-userdata.0.3Marker.json in den Datenpunkt.
- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![Beispiel3MarkersJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/Example3MarkersJSON/Example3MarkersJSON.png)

## Verzeichnis BeispielpfadJSON

Der Datenpunkt enthält einen Pfad in Frankfurt am Main

Zum Testen:

- Erstelle einen Datenpunkt vom Typ String in userdata.0.path
- Kopiere den Inhalt der Datei datapoint-userdata.0.path.json in den Datenpunkt.
- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![BeispielpfadJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePathJSON/ExamplePathJSON.png)

## VerzeichnisbeispielPolygonJSON

Der Datenpunkt enthält verschiedene Arten von Rechtecken, Kreisen und Polygonen.

Zum Testen:

- Erstelle einen Datenpunkt vom Typ String in userdata.0.polygon
- Kopiere den Inhalt der Datei datapoint-userdata.0.polygon.json in den Datenpunkt
- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![BeispielPolygonJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePolygonJSON/ExamplePolygonJSON.png)

## VerzeichnisbeispielButtonFlytoScript

Das Beispiel enthält ein Skript zur Anpassung der Kartensteuerung mit zwei Schaltflächen für einen Flug zwischen Frankfurt und New York. Es enthält außerdem ein Anwendungsbeispiel für die Funktion \`waitFotGlobal\` und benutzerdefinierte Kartensteuerelemente.

Zum Testen:

- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![BeispielButtonFlytoScript](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleButtonFlytoScript/ExampleButtonFlytoScript.png)

## VerzeichnisbeispielVollständigerTest

Das Beispiel enthält alle Tests zusammen.

Zum Testen:

- Erstelle einen Datenpunkt vom Typ String in userdata.0.leaflet
- Kopiere den Inhalt der Datei datapoint-userdata.0.leaflet.json in den Datenpunkt
- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![BeispielvollständigerTest](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png)

## VerzeichnisbeispielFitBoundsJSON

Dieses Beispiel demonstriert die Funktionalität der Option „fitBounds“ anhand eines Pfades. Im Beispielprojekt sind Kartenmittelpunkt und Zoomstufe explizit auf 0 gesetzt. Dieses Verhalten wird jedoch durch die Option „fitBounds“ überschrieben, die die Karte auf dem Pfad zentriert und die optimale Zoomstufe berechnet.

Zum Testen:

- Erstelle einen Datenpunkt vom Typ String in userdata.0.fitBounds
- Kopiere den Inhalt der Datei datapoint-userdata.0.fitBounds.json in den Datenpunkt.
- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

![ExampleFitBoundsJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleFitBoundsJSON/ExamplefitBounds.png)

## Verzeichnis BeispielPluginGeocoderScript

Dieses Beispiel demonstriert die Verwendung von Leaflet-Plugins sowie die`loadCSS` Und`loadScript` Funktionen. Genauer gesagt, wird gezeigt, wie das [Leaflet Geocoder-Plugin](https://github.com/perliedman/leaflet-control-geocoder) integriert wird. Dieses Beispiel verwendet keinen Datenpunkt; die Option „Offenlegen“ muss jedoch in den Karteneinstellungen aktiviert sein.

Zum Testen:

- Importieren Sie die Projekt-ZIP-Datei in Vis und öffnen Sie sie.

Nach dem Import finden Sie die folgenden Details auf der Registerkarte „Skript“.

```javascript
// A separate function is required for using the 'await' keyword. Alternatively, the Promise/then notation must be used.
async function load() {
    // Use try/catch to handle errors in await functions
    try {
        // Load the CSS stylesheet as described in the plugin documentation
        await window.iobroker.mapwidgets.loadCSS(
            'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
        );
        // Load the javascript as described in the plugin documentation
        await window.iobroker.mapwidgets.loadScript(
            'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js',
        );
        // Wait for the map object to be created by the widget. The "Expose" option must be checked in the widget settings.
        let map = await window.iobroker.mapwidgets.waitForGlobal('iobroker.mapwidgets.w00001.map', 200, 5000);
        // // Once the map object is available, the geocoder control can be added to the map.
        new L.Control.Geocoder().addTo(map);
    } catch (e) {
        console.log(e.message);
    }
}
load();
```

![BeispielPluginGeocoderScript](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePluginGeocoderScript/ExamplePluginGeocoderScript.png)

## VerzeichnisbeispielPfadverlauf

Dieses Beispiel zeigt, wie man einen Pfad aus dem Verlauf anzeigt. Dazu wird ein Auswahlfeld verwendet, das mit der`jsonTemplate` Widget (vom gleichnamigen Adapter),

Sie können einen Pfad für ein bestimmtes Datum aus einer erweiterten JSON-Datenstruktur auswählen und ihn im Leaflet-Karten-Widget anzeigen lassen.

Die erweiterte Datenstruktur ist wie folgt organisiert:

```json
{
    "2026-07-03T12:00:00.000Z": {
        "map": {}
    },
    "2026-07-04T12:00:00.000Z": {
        "map": {}
    },
    "2026-07-05T12:00:00.000Z": {
        "map": {}
    }
}
```

Jeder von der`new Date()` Es kann ein Konstruktor (mit einem einzigen Parameter) verwendet werden. Beispielsweise ein JavaScript-Zeitstempel oder eine Datumszeichenkette im ISO-Format. Für eine bessere Lesbarkeit wird das ISO-Format empfohlen: <https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/Date>

Die eigentlichen Kartendaten, wie in der Adapterdokumentation beschrieben, sind in den jeweiligen Dateien enthalten.`map` Attribut.

Alle Pfade sollten die`fitbounds=true` Optionen so eingestellt, dass die Karte automatisch den richtigen Ansichtsbereich und die richtige Zoomstufe auswählt (siehe Beispieldaten).

Ein vollständiges JSON-Beispiel finden Sie in dieser Datei: [ExamplePathHistoryJSON](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/ExamplePathHistory/datapoint.userdata.0.pathhistory.json)

Der`jsonTemplate` Für das Auswahlfeld wurde folgendes Widget verwendet: <https://github.com/oweitman/ioBroker.vis-jsontemplate>

Wählen Sie den Datenpunkt aus, der die vorbereitete Datenstruktur enthält. Verwenden Sie die folgende Vorlage:

[jsonTemplate](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/ExamplePathHistory/jsonTemplate.txt)

Innerhalb dieser Vorlage befindet sich am Anfang ein lokaler Datenpunkt namens`local_map` kann optional angepasst werden; für dieses Beispiel sollte es jedoch unverändert bleiben.

Zum Schluss platzieren Sie einfach das Mapwidgets Leaflet-Widget und stellen es ein.`local_map` als sein Datenpunkt.

![Beispielpfadverlauf](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePathHistory/ExamplePathHistory.png)