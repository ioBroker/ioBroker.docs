---
chapters: {"pages":{"en/adapterref/iobroker.anthbot-genie/README.md":{"title":{"en":"ioBroker.anthbot-genie"},"content":"en/adapterref/iobroker.anthbot-genie/README.md"},"en/adapterref/iobroker.anthbot-genie/NOTICE.md":{"title":{"en":"Legal Notice"},"content":"en/adapterref/iobroker.anthbot-genie/NOTICE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anthbot-genie/README.md
title: ioBroker.anthbot-genie
hash: 76cpC8sE0XdOuG28Mx5Tq82mmRQGctO7XEEXDdnP38k=
---
# ioBroker.anthbot-genie

![Test und Freigabe](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml/badge.svg?branch=main)
![GitHub-Version](https://img.shields.io/github/v/release/reloxx13/ioBroker.anthbot-genie)
![NPM-Version](https://img.shields.io/npm/v/iobroker.anthbot-genie.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anthbot-genie.svg)
![ioBroker installiert](https://iobroker.live/badges/anthbot-genie-installed.svg)
![Lizenz](https://img.shields.io/github/license/reloxx13/ioBroker.anthbot-genie)
![ioBroker-Phase](https://img.shields.io/badge/ioBroker%20phase-latest--repo-green)
![ioBroker-Forum](https://img.shields.io/badge/ioBroker-forum-blue)
![NPM](https://nodei.co/npm/iobroker.anthbot-genie.png?downloads=true)

<img src="admin/anthbot-genie.png" alt="Logo" width="80" /> 

Inoffizieller ioBroker-Adapter für [Anthbot Genie Mähroboter](https://de.anthbot.com/products/genie-mahroboter) , mit Fokus auf detaillierte Genie-Telemetrie, Diagnose und Mähersteuerung für die Modelle Genie 600/1000/3000/5000 und die neueren Modelle M5/M9.

Der Adapter verbindet sich mit dem Anthbot-Cloud-Konto, erkennt gebundene Mäher, liest Cloud- und IoT-Schattendaten und stellt einen umfassenden Zustandsbaum für Status, Einstellungen, Mäherbefehle, Zonendaten, Verbrauchsmaterialien, Standort, Diagnosedaten und Rohdaten zur Fehlerbehebung in ioBroker bereit.

Es richtet sich an Benutzer, die mehr als eine einfache Online-/Akku-/Statusanzeige wünschen: RTK- und Basisstationsstatus, Firmware- und OTA-Details, Netzwerk- und SIM-Informationen, GPS- und Positionsdaten, Kartenlebenszyklus-Zeitstempel, Mäherfehlerdetails, Lebensdauer von Verbrauchsmaterialien, Regeneinstellungen, Zonenmetadaten und beschreibbare Mähsteuerungen werden als ioBroker-Zustände bereitgestellt.

Dieser Adapter ist im ioBroker verfügbar.`latest` Repository. Bitte berichten Sie über Feedback und Testergebnisse im [ioBroker-Forum](https://forum.iobroker.net/topic/84983) .

Ein Beispiel für einen ioBroker Blockly mit Bedingungen für die Mähautomatisierung finden Sie im [Blockly-Automatisierungsbeispiel](https://forum.iobroker.net/topic/84392/2) .

## Merkmale

- Anthbot-Cloud-Login mit verschlüsselter Passwortspeicherung in der nativen ioBroker-Konfiguration
- Automatische Erkennung von Rasenmähern, die mit dem konfigurierten Anthbot-Konto verbunden sind.
- Regions- und IoT-Endpunktsuche pro Mäher
- Automatische Aktualisierung temporärer IoT-Anmeldeinformationen nach AWS IoT`403` Antworten
- Umfrage zu Immobilien- und Dienstleistungsschatten
- Detaillierte Statusangaben für Verbindung, Online-Status, Akku, Mäherstatus, Ladestatus, Mähzeit, Mähfläche, Gesamtmähzeit/-fläche, Kartenstatus, Kartierungsstatus, Fehler, aktiver Mähmodus, Punktmähen und Zonenanzahl
- Diagnosestatus für RTK-Fix, RTK-Basisstation, Warnungen zu bewegten Antennen, Firmware-Versionen, OTA-Fortschritt, WLAN, Mobilfunk, SIM, Bluetooth, Kamera-/Karten-Flags, Hindernisvermeidung, Sicherheitsflags, Systemzeitstempel und cloudbasierte Mäherfehlerdaten
- Standortzustände für Anti-Verlust-GPS-Koordinaten und lokale Mäherposition
- Verbrauchsmaterialien, Lebensdauerstatus und Reset-Tasten für Ladeanschluss, Kameras und Rotorblätter
- Beschreibbare Steuerungszustände für das Mähen der gesamten Karte, das Mähen von Zonen, die Schnitthöhe, die Sprachlautstärke, die benutzerdefinierte Mährichtung, die Hindernisvermeidung, die Regeneinstellungen und das Mähen in der Nähe der Ladestation.
- Befehlszustände für Vollmähen, Stopp, Rückkehr zur Ladestation, Pause mit Rückkehr zur Ladestation, Grasauswurf, Scheibenwartungsmodus, Kantenmähen, Mähen in der Nähe des Ladeplatzes, Punktmähen, Aktualisieren, manuelles Zonenmähen und automatisches Zonenmähen
- Manuelle und automatische Zonenmetadaten als JSON-Zustände, einschließlich aktiver manueller Zonen-IDs
- Schreibgeschützte PNG-Kartenbilder enthalten Angaben zur nativen Karte, zur RTK-Mähflächenmaske und zum historischen Mähpfad.
- Rohdaten von Eigenschaftsschatten, Dienstschatten, Anthbot-Ereigniscode-Übersetzungen und Bereichsdefinitions-Payloads zur Fehlerbehebung und zum Debuggen der Automatisierung

## Anforderungen

- ioBroker mit js-Controller`>= 6.0.11`
- ioBroker-Administrator`>= 7.6.20`
- Node.js`>= 22`
- Anthbot-Konto mit mindestens einem gebundenen Genie-Rasenmäher
- Internetzugang vom ioBroker-Host zur Anthbot-Cloud und zum AWS IoT-Endpunkt

## Installation

Der Adapter ist im ioBroker verfügbar.`latest` Das Repository kann über die ioBroker-Adapteransicht oder über die Befehlszeilenschnittstelle (CLI) installiert werden.

### ioBroker-Administrator

Wenn die`latest` Das Repository ist noch nicht aktiv. Öffnen Sie ioBroker Admin, gehen Sie zu **Einstellungen -> Repositories** und wählen Sie diese aus oder aktivieren Sie sie.`latest` und aktualisieren Sie die Adapterliste.

Öffnen Sie anschließend die Adapteransicht und suchen Sie nach`anthbot-genie` und installieren Sie den Adapter von der`latest` Repository.

### CLI

Installation mit:

```bash
iobroker repo set latest
iobroker update
iobroker add anthbot-genie
```

oder explizit mit einer Versionsangabe:

```bash
iobroker add anthbot-genie@0.1.13
```

## Unterstützte Geräte

- Genie 600
- Genie 1000
- Genie 3000
- Genie 5000
- M5
- M9

Andere Anthbot-Modelle funktionieren möglicherweise auch, wenn sie die gleiche Cloud- und Shadow-Payload-Struktur verwenden, sind hier aber noch nicht explizit abgebildet oder dokumentiert.

## Entwicklung

- `npm install` Installiert Laufzeit- und Entwicklungsabhängigkeiten.
- `npm run lint` Überprüft den Codestil mit ESLint.
- `npm run lint:fix` Wendet automatisch behebbare ESLint-Änderungen an.
- `npm run check` Führt TypeScript- und Node.js-Syntaxprüfungen für den Adapter-Einstiegspunkt, die aufgeteilten Bibliotheksmodule und die Testdateien durch.
- `npm run test:js` führt Unit-Tests aus.
- `npm run test:package` führt Paketvalidierungstests durch.
- `npm run test:integration` führt Integrationstests durch.
- `npm run test` Läufe`check` , Unit-Tests und Paketvalidierung.
- `npm run check:repo` führt den ioBroker-Repository-Checker aus.
- `npm run translate` Führt den ioBroker adapter-dev Übersetzungsworkflow aus.
- `npm run release` erstellt eine neue ioBroker-Paketversion.

## Übersetzungen

- Admin/JSON-Konfigurationsübersetzungen befinden sich in`admin/i18n/<lang>.json` Die
- Backend-/Laufzeit-Objektnamenübersetzungen befinden sich in`i18n/<lang>.json` Die
- Nach dem Hinzufügen oder Entfernen übersetzbarer Zeichenketten aktualisieren Sie die englischen Quelldateien und führen Sie das Programm aus.`npm run translate` So bleiben zukünftige Synchronisierungen von Weblate und adapter-dev aufeinander abgestimmt.

## Konfiguration

Öffnen Sie die Adapterinstanzkonfiguration in ioBroker Admin und stellen Sie Folgendes ein:

| Einstellung                                              | Beschreibung                                                                                                                      | Standard          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Anthbot-Kontobenutzername                                | Benutzername oder E-Mail-Adresse des Anthbot-Kontos                                                                               | leer              |
| Anthbot-Kontopasswort                                    | Das Anthbot-Kontopasswort wird verschlüsselt von ioBroker gespeichert.                                                            | leer              |
| Vorwahl                                                  | Telefon- oder Kontovorwahl, zum Beispiel`49` für Deutschland                                                                      | `49`              |
| API-Host                                                 | Anthbot Cloud-API-Host                                                                                                            | `api.anthbot.com` |
| Abfrageintervall in Sekunden                             | Abfrageintervall für Mähwerksdaten. Der Adapter erzwingt ein Intervall von mindestens 10 Sekunden.                                | `60`              |
| Karte abrufen (hohe CPU-Auslastung)                      | Laden Sie die native Karte, die RTK-Maske und den historischen Mähpfad herunter und rendern Sie ihn.                              | `false`           |
| Karte mit Pfaden generieren (noch höhere CPU-Auslastung) | Laden Sie den historischen Mähpfad herunter und stellen Sie ihn in der Kartenabbildung dar. Dies erfordert das Abrufen der Karte. | `false`           |
| Fehlerbeschreibungssprache                               | Sprache, die für Anthbot-Cloud-Fehlerbeschreibungen verwendet wird                                                                | `English`         |

Wenn eine der beiden Kartenoptionen deaktiviert ist, stellt der Adapter die Anforderung und Darstellung dieser Kartendaten ein und lässt die vorhandenen Kartenstatuswerte unverändert.

Nach dem Speichern der Konfiguration starten oder starten Sie die Adapterinstanz neu.

## Staaten

Der Adapter erstellt für jede Rasenmäher-Seriennummer einen Gerätebaum. Falls Anthbot jemals eine Seriennummer mit Zeichen zurückgibt, die für ioBroker-Objekt-IDs unsicher sind, normalisiert der Adapter nur diese Zeichen, während die ursprüngliche Seriennummer in den nativen Metadaten des Geräteobjekts erhalten bleibt:

```text
anthbot-genie.<instance>.<serial>.*
```

### Info

| Zustand                            | Typ             | Beschreibung                                      |
| ---------------------------------- | --------------- | ------------------------------------------------- |
| `info.connection`                  | boolescher Wert | Globaler Adapter-Cloud-Verbindungsstatus          |
| `<serial>.info.alias`              | Zeichenkette    | Mower-Alias von Anthbot                           |
| `<serial>.info.model`              | Zeichenkette    | Rasenmähermodell/Kategorie                        |
| `<serial>.info.region`             | Zeichenkette    | Anthbot/AWS IoT-Region                            |
| `<serial>.info.endpoint`           | Zeichenkette    | IoT-Endpunkt für Schattenzugriffe                 |
| `<serial>.info.online`             | boolescher Wert | Online-Statusmeldung des Rasenmähers              |
| `<serial>.info.charging`           | boolescher Wert | Ob der Rasenmäher gerade lädt                     |
| `<serial>.info.lastServiceCommand` | Zeichenkette    | Letzter gemeldeter Dienstbefehl                   |
| `<serial>.info.lastPoll`           | Zeichenkette    | ISO-Zeitstempel der letzten erfolgreichen Umfrage |

### Kennzahlen

| Zustand                                     | Typ             | Einheit | Beschreibung                                                                                                         |
| ------------------------------------------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `<serial>.metrics.batteryLevel`             | Nummer          | `%`     | Batteriestand                                                                                                        |
| `<serial>.metrics.status.mower`             | Zeichenkette    |         | Normalisierter Mäherstatus                                                                                           |
| `<serial>.metrics.status.robotRaw`          | Zeichenkette    |         | Rohroboterstatus                                                                                                     |
| `<serial>.metrics.status.modeRaw`           | Zeichenkette    |         | Roh`mode.value` Statusmeldungen der Modelle M5/M9                                                                    |
| `<serial>.metrics.mowing.time`              | Nummer          | `s`     | Gemeldete Mähzeit                                                                                                    |
| `<serial>.metrics.mowing.area`              | Nummer          | `m2`    | Gemeldete Mähfläche                                                                                                  |
| `<serial>.metrics.mowing.totalTime`         | Nummer          | `s`     | Die gesamte Mähzeit wurde von den Modellen M5/M9 gemeldet.                                                           |
| `<serial>.metrics.mowing.totalArea`         | Nummer          | `m2`    | Die von den Modellen M5/M9 gemeldete Gesamtmähfläche                                                                 |
| `<serial>.metrics.mowing.borderActive`      | boolescher Wert |         | Randmähen aktiv                                                                                                      |
| `<serial>.metrics.mowing.nearChargerActive` | boolescher Wert |         | Mähen in der Nähe des Ladegeräts aktiv                                                                               |
| `<serial>.metrics.mowing.fullYardActive`    | boolescher Wert |         | Volles Rasenmähen aktiv                                                                                              |
| `<serial>.metrics.pointMowing.active`       | boolescher Wert |         | Punktmähen aktiv                                                                                                     |
| `<serial>.metrics.pointMowing.x`            | Nummer          |         | Letzter Mähpunkt X-Koordinate                                                                                        |
| `<serial>.metrics.pointMowing.y`            | Nummer          |         | Letzter Mähpunkt Y-Koordinate                                                                                        |
| `<serial>.metrics.zones.manualCount`        | Nummer          |         | Anzahl der manuellen Zonen                                                                                           |
| `<serial>.metrics.zones.autoCount`          | Nummer          |         | Anzahl der automatischen Zonen                                                                                       |
| `<serial>.metrics.map.totalArea`            | Nummer          | `m2`    | Gesamtfläche                                                                                                         |
| `<serial>.metrics.map.status`               | Zeichenkette    |         | Rohkartenstatus                                                                                                      |
| `<serial>.metrics.map.mappingTaskState`     | Zeichenkette    |         | Kartierungsaufgabenstatus, der von M5/M9-Modellen gemeldet wird                                                      |
| `<serial>.metrics.error.code`               | Nummer          |         | Letzter Mäher-Fehlercode                                                                                             |
| `<serial>.metrics.error.description`        | Zeichenkette    |         | Eine für Menschen lesbare Fehlerbeschreibung aus der zwischengespeicherten Anthbot-Ereigniscodeliste, sofern bekannt |
| `<serial>.metrics.error.active`             | boolescher Wert |         | Ob ein Mäherfehler ungleich Null aktiv ist                                                                           |

Der Adapter behält für alle unterstützten Mähermodelle denselben Zustandsbaum bei. Bei Modellen, die die M5/M9-spezifischen Nutzdatenfelder nicht bereitstellen, werden die Zustände`metrics.status.modeRaw` ,`metrics.mowing.totalTime` ,`metrics.mowing.totalArea` , Und`metrics.map.mappingTaskState` werden zwar erstellt, bleiben aber leer oder`null` Die

### Kartenbilder

| Zustand                           | Typ          | Beschreibung                                                                             |
| --------------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `<serial>.map.image`              | Zeichenkette | Native Navigationskarte als PNG-Daten-URI                                                |
| `<serial>.map.imageWithRtkMask`   | Zeichenkette | Native Navigationskarte mit Anthbot's`rtk_mask_map` als PNG-Daten-URI                    |
| `<serial>.map.imageWithMowedPath` | Zeichenkette | Native Navigationskarte mit dem heruntergeladenen historischen Mähpfad als PNG-Daten-URI |
| `<serial>.map.mowedPath`          | Zeichenkette | JSON-Array mit den exakten historischen Pfadpunkten, die für`map.imageWithMowedPath`     |

Die drei Bildzustände sind schreibgeschützt und verwenden die`media.image` Rolle. Die`map.mowedPath` Der Zustand ist schreibgeschützt und verwendet den`json` Rolle. Der Adapter lädt Anthbots herunter.`multi_maps` Kartendatei, Auszüge`maps/remote_map_navi.map` und rendert das native Raster mit der app-kompatiblen Lichtpalette.`map.image` enthält nur die Karte;`map.imageWithRtkMask` fügt das vollständige hinzu`maps/rtk_mask_map` Raster der gemähten Fläche;`map.imageWithMowedPath` Anfragen`req_history_mapping_path` , Downloads`path_<SN>.txt` Der historische Verlauf wird blau dargestellt, und die aktuelle Mäherposition wird als gelbes Robotersymbol sowie die darunterliegende Markierung für das native Ladegerät hinzugefügt.`map.mowedPath` enthält dieselben JSON-Pfadpunkte, die auch von dieser PNG-Datei verwendet werden.`x` Und`y` Die Werte verwenden die nativen Zentimeterkoordinaten des historischen Pfades; dividieren Sie sie durch`100` um sie in die von den Pose-Zuständen verwendeten lokalen Kartenmeter umzurechnen. Die mitgelieferten App-Assets sind so ausgerichtet, dass die Vorderseite des Mähers nach unten zeigt, und werden mithilfe von`location.pose.yaw - 90°` (zum Beispiel eine Gierenbewegung von etwa`-16°` zeigt vorne rechts an; der generierte Fallback verwendet dieselbe Ausrichtung. Die Lademarkierung und das schreibgeschützte`location.charger.x` /`location.charger.y` Die Staaten werden gelesen von`charger_point` In`maps/remote_map.json` Die Koordinaten des Zustands werden in Metern angezeigt. Beide Overlay-Bilder stellen konfigurierte Sperrzonen rot dar. Das historische Bild greift nie auf die kurzlebige Version zurück.`curpath` Die Bilder und der Pfadstatus werden aktualisiert, wenn sich die Kartenidentität, der Zeitstempel, der Verlauf, die Position des Mähers oder der Ladepunkt ändern. Fehlende oder ungültige Kartendaten führen dazu, dass die Statuswerte leer bleiben, während der Adapter weiterhin Daten abfragt.

Die beiden Karteneinstellungen steuern bewusst unterschiedliche Funktionen:

- `fetchMap = false` Es wird kein Kartenarchiv, Raster, PNG oder Verlaufspfad angefordert. Die bestehenden Werte der Karten- und Ladestationskoordinaten bleiben unverändert, sodass eine zuvor generierte Karte und Ladestationsposition weiterhin angezeigt werden können, jedoch nicht aktualisiert werden.
- `fetchMap = true` Und`generateMapWithPaths = false` Die nativen Karten- und RTK-Maskenzustände werden aktualisiert. Der historische Pfad wird nicht angefordert.`map.imageWithMowedPath` Und`map.mowedPath` bleiben unverändert.`map.image` oder`map.imageWithRtkMask` für die Kartenansicht mit geringerer CPU-Auslastung.
- Beide Einstellungen`true` : alle drei Bildzustände und die`map.mowedPath` Zustände werden generiert;`map.imageWithMowedPath` enthält den historischen Pfad und das aktuelle Robotersymbol.

#### VIS: Karte mit integriertem Robotersymbol

Verwenden Sie diesen direkten Pfad, wenn beide Karteneinstellungen aktiviert sind. Binden Sie das VIS-Bild-Widget an`<serial>.map.imageWithMowedPath` Der Adapter zeichnet bereits den historischen Pfad und das Robotersymbol in der aktuellen Position. Es wird kein zweites VIS-Symbol-Widget benötigt. Behalten Sie das native Seitenverhältnis des PNG-Bildcontainers bei.`404:488` ).

#### VIS: Karte mit separatem Overlay-Symbol

Verwenden Sie diesen Pfad mit geringerer CPU-Auslastung, wenn`fetchMap = true` Und`generateMapWithPaths = false` Binden Sie das Bild-Widget an`<serial>.map.image` oder`<serial>.map.imageWithRtkMask` Platzieren Sie anschließend ein transparentes Symbol-Widget absolut darüber. Binden oder berechnen Sie dessen Position anhand dessen.`<serial>.location.pose.x` Und`<serial>.location.pose.y` Diese Werte sind in Metern angegeben; die Kartenmetadaten liefern den Ursprung und die Auflösung. Platzieren Sie beide Widgets im selben, relativ positionierten Container und verwenden Sie dasselbe Seitenverhältnis (`404:488` ), ansonsten`object-fit: contain` kann Letterboxing einführen und das Overlay-Symbol verschieben. Wenn`fetchMap = false` Das Kartenbild zeigt möglicherweise noch einen alten Zustand an, aber weder die Karte noch ihre separate Overlay-Position werden vom Adapter aktualisiert.

Nach der Implementierung der Positions-Zustands-Anzeige,`location.pose.x` Und`location.pose.y` sind Meter. Konvertieren Sie sie mithilfe der Kartenkopfdaten in Kartenpixel.`maps/remote_map.json` :

```js
const map = {
    width: 404,
    height: 488,
    resolution: 0.05,
    xMin: -15.353175,
    yMin: -9.549684,
};

const pixelX = (poseX - map.xMin) / map.resolution;
const pixelY = map.height - 1 - (poseY - map.yMin) / map.resolution;
const poseYaw = Number(poseYawState); // <serial>.location.pose.yaw

icon.style.left = `${(pixelX / map.width) * 100}%`;
icon.style.top = `${(pixelY / map.height) * 100}%`;
icon.style.transform = `translate(-50%, -50%) rotate(${poseYaw - 90}deg)`;
```

Für die aktuelle Momentaufnahme`pose.x = 0.094` Und`pose.y = 0.356` Platzieren Sie das Symbol ungefähr bei Pixel`(309, 289)` , oder`left: 76.5%` Und`top: 59.2%` . Definieren`poseYaw` aus`<serial>.location.pose.yaw` ; mit einem nach unten zeigenden Symbol anwenden`poseYaw - 90` also ein lebendes Gieren um`-16` Die Vorderseite zeigt nach rechts. Der Adapter veröffentlicht derzeit weder Kartenbreite, -höhe, -auflösung noch -ursprung als Zustände. Daher müssen diese Werte aktualisiert werden, wenn der Mäher eine neue Karte erstellt. Kartenpixel dürfen nicht mit den Meterkoordinaten des Mähers vermischt werden.

#### Gierwinkel: Ursprung und Berechnung

`<serial>.location.pose.yaw` ist die von Anthbot gemeldete Mährichtung als`pose.yaw` Es wird in Grad angegeben und nicht von Millimetern umgerechnet. Der Adapter wandelt nur um.`pose.x` Und`pose.y` von Millimetern in Meter; der Gierwinkel wird unverändert weitergegeben. X/Y beschreiben die Position des Mähers, daher darf der Gierwinkel nicht allein aus der aktuellen Position berechnet werden.

Für ein separates VIS-Symbol, dessen Quellbild die Vorderseite des Mähers nach unten zeigt, berechnen Sie die Bildrotation mit einem festen Wert.`90°` Versatz:

```js
const yawDeg = Number(yawState); // <serial>.location.pose.yaw
const iconRotationDeg = yawDeg - 90;

icon.style.transform = `translate(-50%, -50%) rotate(${iconRotationDeg}deg)`;
```

Der`-90°` Der Offset richtet die Überschriftenkonvention von Anthbot an der Vorderseite des Kartenelements aus. Dieselbe Formel wird für das integrierte Kartensymbol und dessen generierte Ausweichoption verwendet. Beispiele:`yaw = 90°` führt zu`0°` Bilddrehung (Vorderseite nach unten), während der Live-Wert`yaw = -16°` führt zu`-106°` (entspricht`254°` ) und richtet die Vorderseite nach rechts aus. Falls die Gierachse nicht verfügbar ist, behält das Objekt seine standardmäßige Ausrichtung mit der Vorderseite nach unten bei.

#### Quelle des Robotersymbols

Das untersuchte Anthbot-App-Bundle enthält lokale Kartenmarkierungsressourcen, einschließlich des Genie.`pic_device_map` Asset, modellspezifische S2/S3/M9Pro-Varianten und die`view_map_battery_position` Lademarkierung. Hierbei handelt es sich um von der App ausgewählte, verpackte UI-Dateien. Die Cloud-/API-Nutzdaten und das heruntergeladene Kartenarchiv liefern keine wiederverwendbare Symbol-URL oder Symbolstatusinformationen. Der Adapter verpackt die passenden, von der App generierten Markierungselemente für bekannte Modelle und verwendet ein eigenes, in sich geschlossenes Roboter-Markierungselement, falls ein Element fehlt, nicht lesbar ist oder das Modell unbekannt ist. Der Adapter ist unabhängig von der Installation der App.

### Standort

| Zustand                           | Typ          | Beschreibung                                                          |
| --------------------------------- | ------------ | --------------------------------------------------------------------- |
| `<serial>.location.gps.latitude`  | Nummer       | GPS-Breitengrad aus Anti-Verlust-Positionsdaten                       |
| `<serial>.location.gps.longitude` | Nummer       | GPS-Längengrad aus Anti-Verlust-Positionsdaten                        |
| `<serial>.location.pose.x`        | Nummer       | Lokaler Rasenmäher positioniert X in Metern                           |
| `<serial>.location.pose.y`        | Nummer       | Lokaler Rasenmäher positioniert sich Y in Metern                      |
| `<serial>.location.pose.yaw`      | Nummer       | Lokaler Rasenmäher positioniert sich Gier                             |
| `<serial>.location.pose.type`     | Zeichenkette | Gemeldeter Haltungstyp                                                |
| `<serial>.location.charger.x`     | Nummer       | Koordinaten von Ladegerät X in Metern aus den nativen Kartenmetadaten |
| `<serial>.location.charger.y`     | Nummer       | Ladepunkt Y-Koordinate in Metern aus den nativen Kartenmetadaten      |

### Diagnostik

Der`diagnostics` Der Kanal stellt schreibgeschützte Fehlerbehebungsdaten bereit, die aus dem Mähwerksschatten abgeleitet werden, darunter RTK-Status, RTK-Basisstatus, Kamera-/Karten-/Netzwerk-Flags, Hindernisvermeidung, Firmware-Versionen, OTA-Fortschritt, WLAN-/SIM-Details, Zeitstempel und der nächste Termin. Bei den Modellen M5/M9 kartiert der Adapter auch`net_config.*` ,`mode.value` ,`error.value` ,`map.map_area` ,`mapping_task.state` ,`mowing_time.value` , Und`mowing_area.value` in den bestehenden ioBroker-Zustandsbaum, wo die Bedeutungen übereinstimmen.

### Verbrauchsmaterial

| Zustand                                  | Typ             | Einheit | Beschreibung                                 |
| ---------------------------------------- | --------------- | ------- | -------------------------------------------- |
| `<serial>.consumable.chargingPort.life`  | Nummer          | `%`     | Lebensdauer des Ladeanschlusses              |
| `<serial>.consumable.chargingPort.reset` | boolescher Wert |         | Lebensdauer des Ladeanschlusses zurücksetzen |
| `<serial>.consumable.cameras.life`       | Nummer          | `%`     | Lebensdauer der Kameras                      |
| `<serial>.consumable.cameras.reset`      | boolescher Wert |         | Lebensdauer der Kameras zurücksetzen         |
| `<serial>.consumable.blades.life`        | Nummer          | `%`     | Lebensdauer der Klingen                      |
| `<serial>.consumable.blades.reset`       | boolescher Wert |         | Lebensdauer der Klingen zurücksetzen         |

Der Rasenmäher akzeptiert nur dann Befehle zum Zurücksetzen der Verbrauchsmaterialien, wenn der entsprechende Lebensdauerwert bei oder unter 5 % liegt.

### Bedienelemente

Schreibbare Steuerungszustände aktualisieren die Mähereinstellungen über den Anthbot IoT-Dienstschatten. Der Adapter übernimmt die modellspezifische Kodierung der Schattennutzlast intern, sodass dieselben ioBroker-Steuerungszustände für alle unterstützten Mähermodelle verwendet werden können.

| Zustand                                                        | Typ             | Reichweite                  | Beschreibung                                                                      |
| -------------------------------------------------------------- | --------------- | --------------------------- | --------------------------------------------------------------------------------- |
| `<serial>.controls.fullMapMowing.mowHeight`                    | Nummer          | `30..70 mm` , 5 mm Schritte | Schnitthöhe für die gesamte Karte festlegen                                       |
| `<serial>.controls.fullMapMowing.includeEdgeTrimming`          | boolescher Wert | `true` /`false`             | Beziehen Sie das Kantenschneiden in die Mähung der gesamten Fläche ein.           |
| `<serial>.controls.fullMapMowing.customMowingDirection`        | Nummer          | `0..180 deg`                | Benutzerdefinierte Mährichtung für die gesamte Karte festlegen                    |
| `<serial>.controls.fullMapMowing.customMowingDirectionEnabled` | boolescher Wert | `true` /`false`             | Benutzerdefinierte Mährichtung für die gesamte Karte aktivieren oder deaktivieren |
| `<serial>.controls.zoneMowing.mowHeight`                       | Nummer          | `30..70 mm` , 5 mm Schritte | Zonenmähschnitthöhe einstellen                                                    |
| `<serial>.controls.zoneMowing.mowCount`                        | Nummer          | `1..3`                      | Zonenmähvorgänge einstellen                                                       |
| `<serial>.controls.zoneMowing.customMowingDirection`           | Nummer          | `0..180 deg`                | Zonenmährichtung einstellen                                                       |
| `<serial>.controls.zoneMowing.customMowingDirectionEnabled`    | boolescher Wert | `true` /`false`             | Zonenmährichtung aktivieren oder deaktivieren                                     |
| `<serial>.controls.zoneMowing.obstacleAvoidanceEnabled`        | boolescher Wert | `true` /`false`             | Zonen-Hindernisvermeidung aktivieren oder deaktivieren                            |
| `<serial>.controls.zoneMowing.obstacleAvoidanceLevel`          | Nummer          | `0..2`                      | Zonen-Hindernisvermeidungsniveau festlegen                                        |
| `<serial>.controls.voiceVolume`                                | Nummer          | `0..100 %`                  | Sprachlautstärke einstellen                                                       |
| `<serial>.controls.rain.perceptionEnabled`                     | boolescher Wert | `true` /`false`             | Regenwahrnehmung aktivieren oder deaktivieren                                     |
| `<serial>.controls.rain.continueTimeHours`                     | Nummer          | `0..8 h`                    | Regendauer in Stunden einstellen                                                  |
| `<serial>.controls.nearChargerMowing.enabled`                  | boolescher Wert | `true` /`false`             | Mähen in der Nähe der Ladesäule aktivieren oder deaktivieren                      |
| `<serial>.controls.nearChargerMowing.mowHeight`                | Nummer          | `30..70 mm` , 5 mm Schritte | Stellen Sie die Schnitthöhe für das Mähen in der Nähe der Ladesäule ein.          |
| `<serial>.controls.nearChargerMowing.mowCount`                 | Nummer          | `1..3`                      | Mähvorgänge in der Nähe des Ladeplatzes einstellen                                |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceEnabled` | boolescher Wert | `true`/`false`              | Hindernisvermeidung in der Nähe der Ladesäule aktivieren oder deaktivieren        |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel`   | Nummer          | `0..2`                      | Hindernisvermeidungsstufe in der Nähe des Ladeplatzes einstellen                  |

### Befehle

Befehlszustände sind beschreibbar. Schaltflächenzustände werden zurückgesetzt.`false` Nach der Ausführung werden die Zonenbefehlszustände nach der Ausführung auf eine leere Zeichenkette zurückgesetzt. Verbrauchsmaterial-Reset-Tasten sind darunter zugänglich.`consumable` Die

| Zustand                                              | Typ             | Beschreibung                                                   |
| ---------------------------------------------------- | --------------- | -------------------------------------------------------------- |
| `<serial>.commands.device.find`                      | boolescher Wert | Finde den Roboter                                              |
| `<serial>.commands.device.refresh`                   | boolescher Wert | Alle Mähereigenschaften anfordern und Status aktualisieren     |
| `<serial>.commands.device.cancelRtkAntennaMoved`     | boolescher Wert | Warnung „RTK-Antenne bewegt“ abbrechen                         |
| `<serial>.commands.docking.startReturn`              | boolescher Wert | Zur Ladestation zurückkehren                                   |
| `<serial>.commands.docking.pauseReturn`              | boolescher Wert | Pause, zurück zur Ladestation                                  |
| `<serial>.commands.maintenance.startGrassDump`       | boolescher Wert | Grasablagerung beginnen                                        |
| `<serial>.commands.maintenance.startDiskMaintenance` | boolescher Wert | Festplattenwartungsmodus starten                               |
| `<serial>.commands.mowing.startFullMap`              | boolescher Wert | Starten Sie die Mähung der gesamten Karte.                     |
| `<serial>.commands.mowing.startZone`                 | Zeichenkette    | Beginnen Sie mit dem Mähen einer oder mehrerer manueller Zonen |
| `<serial>.commands.mowing.startAutoZone`             | Zeichenkette    | Starten Sie das Mähen einer oder mehrerer automatischer Zonen. |
| `<serial>.commands.mowing.startPoint`                | Zeichenkette    | Mähen mit Startpunkt`x,y` oder `{"x":123,"y":456}`             |
| `<serial>.commands.mowing.startEdge`                 | boolescher Wert | Kantenmähen beginnen                                           |
| `<serial>.commands.mowing.startNearCharger`          | boolescher Wert | Beginnen Sie mit dem Mähen in der Nähe des Ladeplatzes.        |
| `<serial>.commands.mowing.pause`                     | boolescher Wert | Mähen pausieren                                                |
| `<serial>.commands.mowing.resume`                    | boolescher Wert | Mähen fortsetzen                                               |
| `<serial>.commands.mowing.stop`                      | boolescher Wert | Alle Mäharbeiten einstellen                                    |
| `<serial>.commands.mowing.end`                       | boolescher Wert | Mähen am Ende                                                  |
| `<serial>.commands.mowing.stopPoint`                 | boolescher Wert | Stopppunktmähen                                                |

Verfügbarkeit von`commands.maintenance.startDiskMaintenance` ,`commands.maintenance.startGrassDump` ,`commands.mowing.startEdge` ,`commands.mowing.startNearCharger` , Und`commands.mowing.startPoint` kann vom Mähermodell, der Firmware, dem aktuellen Mähmodus und den Karten-/Randdaten abhängen.

### Zonen

| Zustand                           | Typ               | Beschreibung                               |
| --------------------------------- | ----------------- | ------------------------------------------ |
| `<serial>.zones.manual.list`      | JSON-Zeichenkette | Bekannte manuelle/benutzerdefinierte Zonen |
| `<serial>.zones.manual.activeIds` | JSON-Zeichenkette | Aktuell aktive manuelle Zonen-IDs          |
| `<serial>.zones.autoList`         | JSON-Zeichenkette | Bekannte automatische/regionale Zonen      |

### Rohdaten

| Zustand                          | Typ               | Beschreibung                                                                                                |
| -------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `<serial>.raw.shadow.property`   | JSON-Zeichenkette | Rohdaten des Schatten-Nutzlast                                                                              |
| `<serial>.raw.shadow.service`    | JSON-Zeichenkette | Rohdienst-Schattennutzlast                                                                                  |
| `<serial>.raw.shadow.event-code` | JSON-Zeichenkette | Zwischengespeicherte Anthbot-Ereigniscode-Übersetzungsnutzlast, die für Fehlerbeschreibungen verwendet wird |
| `<serial>.raw.areaDefinition`    | JSON-Zeichenkette | Rohbereichsdefinition Nutzlast                                                                              |

## Zonenmähen

Der Adapter legt die manuellen/benutzerdefinierten Zonen des Rasenmähers in folgenden Bereichen frei:

```text
<instance>.<serial>.zones.manual.list
```

Dieser Status enthält ein JSON-Array mit bekannten Zonen. Verwenden Sie das`id` oder das genaue`name` Beginnen Sie mit dem Mähen anhand dieser Liste.

Schreiben Sie die Auswahl an:

```text
<instance>.<serial>.commands.mowing.startZone
```

Zulässige Werte:

- eine Zone nach ID:`3`
- eine Zone nach Namen:`Front yard`
- mehrere Zonen als durch Kommas getrennte IDs oder Namen:`3,5,Back yard`
- mehrere Zonen als JSON-Array:`[3,5,"Back yard"]`

Nach einem erfolgreichen Schreibvorgang sendet der Adapter`custom_area_mow_start` mit den übereinstimmenden manuellen Zonen-IDs und Löschungen`commands.mowing.startZone` wieder.

Automatische Zonen funktionieren auf ähnliche Weise:

```text
<instance>.<serial>.zones.autoList
<instance>.<serial>.commands.mowing.startAutoZone
```

Bei automatischen Zonen löst der Adapter die ausgewählten Zonen-IDs oder -Namen in die Zonenkoordinaten auf und sendet sie.`region_mow_start` Die

## Fehlerbehebung

### Der Adapter verbindet sich nicht.

- Bitte überprüfen Sie Benutzername, Passwort und Vorwahl.
- Vergewissern Sie sich, dass der Rasenmäher in der Anthbot-App mit demselben Konto sichtbar ist.
- Erhöhen Sie den Protokollierungsgrad des Adapters auf`debug` und die Instanz neu starten.
- Überprüfen`anthbot-genie.<instance>.info.connection` Die

### Es werden keine Mäherobjekte erstellt.

- Das Anthbot-Konto muss mindestens einen gebundenen Rasenmäher haben.
- Überprüfen Sie das Adapterprotokoll auf`No Anthbot devices found for this account` Die
- Überprüfen Sie, ob der ioBroker-Host über einen Internetzugang verfügt.

### Befehle funktionieren nicht

- Prüfen Sie zunächst, ob die Statusabfrage funktioniert.
- Prüfen Sie, ob der Zielzustand unter der richtigen Rasenmäher-Seriennummer liegt.
- Vergleichen Sie bei Zonenbefehlen den geschriebenen Wert mit den IDs und Namen in`zones.manual.list` oder`zones.autoList` Die
- Der Adapter aktualisiert die temporären IoT-Anmeldeinformationen nach jedem AWS IoT-Vorgang automatisch.`403` Falls die Befehle auch nach diesem Wiederholungsversuch noch fehlschlagen, überprüfen Sie das Adapterprotokoll auf modellspezifische Nutzlast- oder Mäherstatusfehler.
- Überprüfen`raw.shadow.service` und das Adapterprotokoll für Befehlsfehler.

## Credits

Ein besonderer Dank gilt den Anthbot Genie-Community-Projekten, die den Anthbot-Cloud-Workflow und die Befehlszuordnung wesentlich verständlicher gemacht haben:

- [vincentjanv](https://github.com/vincentjanv/anthbot_genie_ha)
- [AdrianTIonut](https://github.com/AdrianTIonut/anthbot_genie_ha)

Besonderer Dank gilt [@Riza-Aslan](https://github.com/Riza-Aslan) für die Forschungsarbeit zur Unterstützung von M5/M9 und die Nutzlastzuordnungsarbeit, die dieses Adapter-Update ermöglicht haben.

Dieser ioBroker-Adapter ist ein unabhängiges Projekt, baut aber auf öffentlichen API-Forschungs- und Implementierungsideen aus der Community-Arbeit auf.

## Rechtlicher Hinweis

Dieses Projekt ist inoffiziell und steht in keiner Verbindung zu Anthbot, wird weder von Anthbot unterstützt, gesponsert noch genehmigt.

Die Namen, Marken und Logos von Anthbot und Genie gehören ihren jeweiligen Eigentümern. Weitere Informationen finden Sie in [der Datei NOTICE.md](/#/docs/adapterref/iobroker.anthbot-genie/NOTICE.md) .

Ältere Changelog-Einträge sind in [CHANGELOG\_OLD.md](https://github.com/reloxx13/ioBroker.anthbot-genie/blob/main/CHANGELOG_OLD.md) archiviert.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- Add separate read-only PNG map image states for the native map, RTK mowed-area mask, and downloaded historical mowing path.
- Add an opt-in Admin checkbox for map downloads and rendering because map generation can use significant CPU.
- Add a second opt-in Admin checkbox for historical path rendering because it uses additional CPU and cloud requests.
- Expose local mower pose X/Y states in metres for direct map positioning.
- Expose charger point X/Y states in metres from the native map metadata.
- Expose the historical mowing path used by the PNG as a JSON state.
- Rotate the integrated robot map icon according to the mower pose yaw.
- Render the native charger marker from the map metadata below the mower icon.

### 0.1.13 (2026-06-08)

- Add M5/M9 payload parity for status, battery, error, network, RTK, map, and total mowing metrics while keeping the existing ioBroker state tree stable.
- Refresh temporary IoT credentials once on AWS IoT `403` responses and retry the failed shadow read or command publish automatically.
- Refactor the large adapter sources into focused CommonJS modules for Anthbot cloud/shadow clients, payload helpers, adapter object definitions, state derivation, and command handling without changing state IDs or command payload behavior.
- Expand `npm run check` so syntax validation covers the split `lib/anthbot`, `lib/adapter`, and unit test files through the dedicated syntax-check helper.

### 0.1.12 (2026-06-06)

- (reloxx13) **FIXED**: Create the global `info` channel and correct the mower status role so the adapter object structure passes ioBroker review checks.

### 0.1.11 (2026-06-06)

- Refresh existing mower device/channel/state objects with `extendObjectAsync` so updated runtime i18n names are applied to already-created objects, not only new ones.

### 0.1.10 (2026-06-06)

- Align ioBroker object metadata with the repository object-structure checker by creating the global `info` channel, correcting the mower status role, and emitting full recommended i18n keys for object names.
- Keep admin translations in the repository-checker-friendly `admin/i18n/<lang>.json` layout and load backend/runtime object-name translations from root `i18n/<lang>.json` files via adapter-core `I18n`.

### 0.1.9 (2026-06-06)

- Drop the temporary `--legacy-peer-deps` GitHub Actions install override now that the lockfile supports plain `npm ci` again.
- Re-enable ESLint in the GitHub Actions quick-check job and align the local lint config with the checked JavaScript codebase.
- Clean up repository metadata so local `repochecker` no longer reports actionable findings.

[Older changelogs can be found there](https://github.com/reloxx13/ioBroker.anthbot-genie/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 reloxx13

See [LICENSE](https://github.com/reloxx13/ioBroker.anthbot-genie/blob/main/LICENSE) for details.