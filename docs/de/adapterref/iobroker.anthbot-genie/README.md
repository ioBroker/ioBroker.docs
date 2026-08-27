---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anthbot-genie/README.md
title: ioBroker.anthbot-genie
hash: RZf++aYfBhPSkpO9B4y4spJoWHj4aIvbXN0wchv6A/A=
---
# IoBroker.anthbot-genie

![GitHub-Version](https://img.shields.io/github/v/release/reloxx13/ioBroker.anthbot-genie)
![NPM-Version](https://img.shields.io/npm/v/iobroker.anthbot-genie.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anthbot-genie.svg)
![ioBroker installiert](https://iobroker.live/badges/anthbot-genie-installed.svg)
![Lizenz](https://img.shields.io/github/license/reloxx13/ioBroker.anthbot-genie)
![ioBroker-Phase](https://img.shields.io/badge/ioBroker%20phase-latest--repo-green)
![ioBroker-Forum](https://img.shields.io/badge/ioBroker-forum-blue)
![NPM](https://nodei.co/npm/iobroker.anthbot-genie.png?downloads=true)

<img src="admin/anthbot-genie.png" alt="Logo" width="80" />

[![Test und Release](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml/badge.svg?branch=main)](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml)

Inoffizieller ioBroker-Adapter für [Anthbot Genie Mähroboter](https://de.anthbot.com/products/genie-mahroboter), mit Fokus auf detaillierte Genie-Telemetrie, Diagnose und Mähwerkssteuerung für Genie 600/1000/3000/5000 und die neueren Modelle M5/M9.

Der Adapter verbindet sich mit dem Anthbot-Cloud-Konto, erkennt gebundene Mäher, liest Cloud- und IoT-Schattendaten und stellt einen umfassenden Zustandsbaum für Status, Einstellungen, Mäherbefehle, Zonendaten, Verbrauchsmaterialien, Standort, Diagnosedaten und Rohdaten zur Fehlerbehebung in ioBroker bereit.

Es richtet sich an Benutzer, die mehr als eine einfache Online-/Akku-/Statusanzeige wünschen: RTK- und Basisstationsstatus, Firmware- und OTA-Details, Netzwerk- und SIM-Informationen, GPS- und Positionsdaten, Kartenlebenszyklus-Zeitstempel, Mäherfehlerdetails, Lebensdauer von Verbrauchsmaterialien, Regeneinstellungen, Zonenmetadaten und beschreibbare Mähsteuerungen werden als ioBroker-Zustände bereitgestellt.

Dieser Adapter ist im ioBroker-Repository `latest` verfügbar. Bitte melden Sie Feedback und Testergebnisse im Repository [ioBroker-Forumsthread](https://forum.iobroker.net/topic/84983).

Ein Beispiel für einen ioBroker Blockly mit Bedingungen für die Mähautomatisierung finden Sie in [Blockly-Automatisierungsbeispiel](https://forum.iobroker.net/topic/84392/2).

## Merkmale
- Anthbot-Cloud-Login mit verschlüsselter Passwortspeicherung in der nativen ioBroker-Konfiguration
- Automatische Erkennung von Rasenmähern, die mit dem konfigurierten Anthbot-Konto verbunden sind
- Regions- und IoT-Endpunktsuche pro Mäher
- Automatische Aktualisierung temporärer IoT-Anmeldeinformationen nach AWS IoT `403`-Antworten
- Umfrage zu Immobilien und Dienstleistungsschatten
- Detaillierte Statusanzeigen für Verbindung, Online-Status, Akku, Mäherstatus, Ladestatus, Mähzeit, Mähfläche, Gesamtmähzeit/-fläche, Kartenstatus, Kartierungsstatus, Fehler, aktiver Mähmodus, Punktmähen und Zonenanzahl
- Diagnosestatus für RTK-Fix, RTK-Basisstation, Warnungen zu bewegten Antennen, Firmware-Versionen, OTA-Fortschritt, WLAN, Mobilfunk, SIM, Bluetooth, Kamera-/Karten-Flags, Hindernisvermeidung, Sicherheitsflags, Systemzeitstempel und cloudbasierte Mäherfehlerdaten
- Standortzustände für Anti-Verlust-GPS-Koordinaten und lokale Mäherposition
- Verbrauchsmaterial-Lebensdaueranzeigen und Reset-Tasten für Ladeanschluss, Kameras und Rotorblätter
- Beschreibbare Steuerungszustände für das Mähen der gesamten Karte, das Mähen von Zonen, die Schnitthöhe, die Sprachlautstärke, die benutzerdefinierte Mährichtung, die Hindernisvermeidung, die Regeneinstellungen und das Mähen in der Nähe des Ladeplatzes
- Befehlszustände für Vollmähen, Stopp, Rückkehr zur Ladestation, Pause mit Rückkehr zur Ladestation, Grasauswurf, Scheibenwartungsmodus, Kantenmähen, Mähen in der Nähe des Ladeplatzes, Punktmähen, Aktualisieren, manuelles Zonenmähen und automatisches Zonenmähen
- Manuelle und automatische Zonenmetadaten als JSON-Zustände, einschließlich aktiver manueller Zonen-IDs
- Schreibgeschützte PNG-Kartenbilddateien enthalten Angaben zur nativen Karte, zur RTK-Mähflächenmaske und zum historischen Mähpfad.
- Rohdaten von Eigenschaftsschatten, Dienstschatten, Anthbot-Ereigniscode-Übersetzungen und Bereichsdefinitions-Payloads zur Fehlerbehebung und zum Debuggen der Automatisierung

## Anforderungen
- ioBroker mit js-controller `>= 6.0.11`
- ioBroker Admin `>= 7.6.20`
- Node.js `>= 22`
- Anthbot-Konto mit mindestens einem gebundenen Genie-Rasenmäher
- Internetzugang vom ioBroker-Host zur Anthbot-Cloud und zum AWS IoT-Endpunkt

## Installation
Der Adapter ist im ioBroker `latest`-Repository verfügbar und kann über die ioBroker-Adapteransicht oder über die CLI installiert werden.

### IoBroker-Administrator
Falls das Repository `latest` noch nicht aktiv ist, öffnen Sie ioBroker Admin, gehen Sie zu **Einstellungen -> Repositories**, wählen Sie `latest` aus oder aktivieren Sie es, und aktualisieren Sie die Adapterliste.

Öffnen Sie anschließend die Adapteransicht, suchen Sie nach `anthbot-genie` und installieren Sie den Adapter aus dem Repository `latest`.

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
- `npm install` installiert Laufzeit- und Entwicklungsabhängigkeiten.
- `npm run lint` überprüft den Codestil mit ESLint.
- `npm run lint:fix` wendet automatisch behebbare ESLint-Änderungen an.
- `npm run check` führt TypeScript- und Node.js-Syntaxprüfungen für den Adapter-Einstiegspunkt, die Split-Bibliotheksmodule und die Testdateien durch.
- `npm run test:js` führt Unit-Tests aus.
- `npm run test:package` führt Paketvalidierungstests aus.
- `npm run test:integration` führt Integrationstests aus.
- `npm run test` führt `check`, Unit-Tests und die Paketvalidierung aus.
- `npm run check:repo` führt den ioBroker-Repository-Checker aus.
- `npm run translate` führt den Übersetzungs-Workflow des ioBroker-Adapters für die Entwicklungsumgebung aus.
- `npm run release` erstellt eine neue ioBroker-Paketversion.

## Übersetzungen
- Die Admin/JSON-Konfigurationsübersetzungen befinden sich in `admin/i18n/<lang>.json`.
- Die Übersetzungen der Objektnamen im Backend/Runtime befinden sich in `i18n/<lang>.json`.
- Nach dem Hinzufügen oder Entfernen übersetzbarer Zeichenketten aktualisieren Sie die englischen Quelldateien und führen Sie `npm run translate` aus, damit zukünftige Synchronisierungen von Weblate und adapter-dev aufeinander abgestimmt bleiben.

## Konfiguration
Öffnen Sie die Adapterinstanzkonfiguration in ioBroker Admin und stellen Sie Folgendes ein:

| Einstellungen | Beschreibung | Standardwerte |
| --- | --- | --- |
| Anthbot-Kontoname | Benutzername oder E-Mail-Adresse des Anthbot-Kontos | leer |
| Anthbot-Kontopasswort | Anthbot-Kontopasswort, verschlüsselt von ioBroker gespeichert | leer |
| Vorwahl | Telefon- oder Kontovorwahl, z. B. `49` für Deutschland | `49` |
| Abfrageintervall in Sekunden | Abfrageintervall für Mähdaten. Der Adapter erzwingt mindestens 10 Sekunden. | `60` |
| Karte abrufen (hohe CPU-Auslastung) | Native Karte, RTK-Maske und historischen Mähpfad herunterladen und rendern | `false` |
| Karte mit Pfaden generieren (noch höhere CPU-Auslastung) | Historischen Mähpfad herunterladen und in das Kartenbild einfügen. Erfordert das Abrufen der Karte. | `false` |
| Fehlerbeschreibungssprache | Sprache, die für Anthbot-Cloud-Fehlerbeschreibungen verwendet wird | `English` |
| Sprache der Fehlerbeschreibung | Sprache, die für Anthbot-Cloud-Fehlerbeschreibungen verwendet wird | `Englisch` |

Wenn eine der beiden Kartenoptionen deaktiviert ist, stellt der Adapter die Anforderung und Darstellung dieser Kartendaten ein und lässt die vorhandenen Kartenstatuswerte unverändert.

Nach dem Speichern der Konfiguration starten oder starten Sie die Adapterinstanz neu.

## Staaten
Der Adapter erstellt für jede Rasenmäher-Seriennummer einen Gerätebaum. Falls Anthbot jemals eine Seriennummer mit Zeichen zurückgibt, die für ioBroker-Objekt-IDs unsicher sind, normalisiert der Adapter nur diese Zeichen, während die ursprüngliche Seriennummer in den nativen Metadaten des Geräteobjekts erhalten bleibt:

```text
anthbot-genie.<instance>.<serial>.*
```

### Info
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `info.connection` | Boolescher Wert | Globaler Adapter-Cloud-Verbindungsstatus |
| `<serial>.info.model` | Zeichenkette | Rasenmähermodell/-kategorie |
| `<serial>.info.region` | Zeichenkette | Anthbot/AWS IoT-Region |
| `<serial>.info.endpoint` | Zeichenkette | IoT-Endpunkt für Schattenzugriff |
| `<serial>.info.online` | boolescher Wert | Vom Rasenmäher gemeldeter Online-Status |
| `<serial>.info.charging` | boolescher Wert | Gibt an, ob der Rasenmäher gerade geladen wird |
| `<serial>.info.lastServiceCommand` | Zeichenkette | Letzter gemeldeter Dienstbefehl |
| `<serial>.info.lastPoll` | Zeichenkette | ISO-Zeitstempel der letzten erfolgreichen Abfrage |
| `<serial>.info.lastPoll` | Zeichenkette | ISO-Zeitstempel der letzten erfolgreichen Abfrage |

### Kennzahlen
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `<serial>.metrics.batteryLevel` | Nummer | `%` | Akkustand |
| `<serial>.metrics.status.robotRaw` | Zeichenkette | | Rohroboterstatus |
| `<serial>.metrics.status.modeRaw` | Zeichenkette | | Rohdaten des `mode.value`-Status, die von den Modellen M5/M9 gemeldet werden |
| `<serial>.metrics.mowing.time` | Nummer | `s` | Gemeldete Mähzeit |
| `<serial>.metrics.mowing.area` | Nummer | `m2` | Gemeldete Mähfläche |
| `<serial>.metrics.mowing.totalTime` | Nummer | `s` | Gesamte Mähzeit, gemeldet von den Modellen M5/M9 |
| `<serial>.metrics.mowing.totalArea` | Anzahl | `m2` | Von den Modellen M5/M9 gemeldete Gesamtmähfläche |
| `<serial>.metrics.mowing.borderActive` | boolescher Wert | | Randmähen aktiv |
| `<serial>.metrics.mowing.nearChargerActive` | boolescher Wert | | Mähen in der Nähe der Ladestation aktiv |
| `<serial>.metrics.mowing.fullYardActive` | boolescher Wert | | Rasenmähen im gesamten Garten aktiv |
| `<serial>.metrics.pointMowing.active` | boolescher Wert | | Punktmähen aktiv |
| `<serial>.metrics.pointMowing.x` | Nummer | | Letzte Mähpunkt-X-Koordinate |
| `<serial>.metrics.pointMowing.y` | Nummer | | Letzte Mähpunkt-Y-Koordinate |
| `<serial>.metrics.zones.manualCount` | Nummer | | Anzahl der manuellen Zonen |
| `<serial>.metrics.zones.autoCount` | Nummer | | Anzahl der automatischen Zonen |
| `<serial>.metrics.map.totalArea` | Anzahl | `m2` | Gesamtfläche der Kartierung |
| `<serial>.metrics.map.status` | Zeichenkette | | Rohdaten-Zuordnungsstatus |
| `<serial>.metrics.map.mappingTaskState` | Zeichenkette | | Von M5/M9-Modellen gemeldeter Mapping-Task-Status |
| `<serial>.metrics.error.code` | Nummer | | Letzter Mähfehlercode |
| `<serial>.metrics.error.description` | Zeichenkette | | Lesbare Fehlerbeschreibung aus der zwischengespeicherten Anthbot-Ereigniscodeliste, sofern bekannt |
| `<serial>.metrics.error.active` | boolescher Wert | | Gibt an, ob ein Mähwerksfehler ungleich Null aktiv ist |
| `<serial>.metrics.error.active` | boolean | | Gibt an, ob ein Mähwerksfehler ungleich Null aktiv ist |

Der Adapter verwendet für alle unterstützten Mähermodelle denselben Zustandsbaum. Bei Modellen, die die M5/M9-spezifischen Nutzdatenfelder nicht bereitstellen, werden die Zustände `metrics.status.modeRaw`, `metrics.mowing.totalTime`, `metrics.mowing.totalArea` und `metrics.map.mappingTaskState` zwar erstellt, bleiben aber leer oder sind `null`.

### Kartenbilder
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `<serial>.map.image` | Zeichenkette | Native Navigationskarte als PNG-Daten-URI |
| `<serial>.map.imageWithMowedPath` | Zeichenkette | Native Navigationskarte mit dem heruntergeladenen historischen Mähpfad als PNG-Daten-URI |
| `<serial>.map.mowedPath` | Zeichenkette | JSON-Array mit den exakten historischen Pfadpunkten, die für `map.imageWithMowedPath` verwendet wurden |
| `<serial>.map.mowedPath` | string | JSON-Array mit den exakten historischen Pfadpunkten, die für `map.imageWithMowedPath` verwendet wurden |

Die drei Bildzustände sind schreibgeschützt und verwenden die Rolle `media.image`. Der Zustand `map.mowedPath` ist ebenfalls schreibgeschützt und verwendet die Rolle `json`. Der Adapter lädt die Kartendatei `multi_maps` von Anthbot herunter, extrahiert `maps/remote_map_navi.map` und rendert das native Raster mit der anwendungskompatiblen Lichtpalette. `map.image` enthält nur die Karte; `map.imageWithRtkMask` fügt das vollständige Raster der gemähten Fläche `maps/rtk_mask_map` hinzu. `map.imageWithMowedPath` fordert `req_history_mapping_path` an, lädt `path_<SN>.txt` herunter, stellt den historischen Pfad blau dar und fügt die aktuelle Mäherposition als gelbes Robotersymbol sowie die darunterliegende Markierung für die Ladestation hinzu. `map.mowedPath` enthält dieselben JSON-Pfadpunkte wie die entsprechende PNG-Datei. Die Werte `x` und `y` verwenden die Zentimeterkoordinaten des historischen Pfads; dividieren Sie diese durch `100`, um sie in die von den Positionszuständen verwendeten Meter der lokalen Karte umzurechnen. Die mitgelieferten App-Assets sind so ausgerichtet, dass die Mähwerksfront nach unten zeigt und mithilfe von `location.pose.yaw - 90°` gedreht wird (beispielsweise zeigt eine Live-Gierbewegung von etwa `-16°` nach rechts); der generierte Fallback verwendet dieselbe Ausrichtung. Die Ladestationsmarkierung und die schreibgeschützten Zustände `location.charger.x`/`location.charger.y` werden aus `charger_point` in `maps/remote_map.json` gelesen; die Zustandskoordinaten werden in Metern angezeigt. Beide Overlay-Bilder stellen konfigurierte Sperrzonen rot dar. Das historische Bild greift niemals auf das kurzlebige `curpath` zurück. Die Bilder und der Pfadstatus werden aktualisiert, wenn sich die native Kartenidentität, der Zeitstempel, der Verlaufspfad, die Mähwerksposition oder der Ladepunkt ändern. Fehlende oder ungültige Kartendaten führen dazu, dass die Zustände leer bleiben, während der Adapter weiterhin abfragt.

Die beiden Karteneinstellungen steuern bewusst unterschiedliche Funktionen:

- `fetchMap = false`: Es wird kein Kartenarchiv, Raster, PNG oder Verlaufspfad angefordert. Die vorhandenen Werte der Karten- und Ladestationskoordinaten bleiben unverändert, sodass eine zuvor generierte Karte und Ladestationsposition weiterhin angezeigt werden können, jedoch nicht aktualisiert werden.
- `fetchMap = true` und `generateMapWithPaths = false`: Der Zustand der nativen Karte und der RTK-Maske wird aktualisiert. Der historische Pfad wird nicht angefordert, und `map.imageWithMowedPath` und `map.mowedPath` bleiben unverändert. Verwenden Sie `map.image` oder `map.imageWithRtkMask` für die ressourcenschonendere Kartenansicht.
- Beide Einstellungen `true`: Alle drei Bildzustände und der Zustand `map.mowedPath` werden generiert; `map.imageWithMowedPath` enthält den historischen Pfad und das aktuelle Robotersymbol.

#### VIS: Karte mit integriertem Robotersymbol
Verwenden Sie diesen direkten Pfad, wenn beide Karteneinstellungen aktiviert sind. Binden Sie das VIS-Bild-Widget an `<serial>.map.imageWithMowedPath`; der Adapter zeichnet bereits den historischen Pfad und das Robotersymbol in der aktuellen Position. Ein zweites VIS-Symbol-Widget ist nicht erforderlich. Behalten Sie das native Seitenverhältnis des PNG-Containers bei (`404:488`).

#### VIS: Karte mit separatem Overlay-Symbol
Verwenden Sie diesen ressourcenschonenderen Pfad bei `fetchMap = true` und `generateMapWithPaths = false`. Binden Sie das Bild-Widget an `<serial>.map.image` oder `<serial>.map.imageWithRtkMask` und platzieren Sie anschließend ein transparentes Symbol-Widget absolut darüber. Binden oder berechnen Sie dessen Position anhand von `<serial>.location.pose.x` und `<serial>.location.pose.y`. Diese Zustände sind in Metern angegeben; die Kartenmetadaten liefern Ursprung und Auflösung. Platzieren Sie beide Widgets im selben relativ positionierten Container und verwenden Sie dasselbe Seitenverhältnis (`404:488`), da `object-fit: contain` sonst Letterboxing verursachen und das Overlay-Symbol verschieben kann. Bei `fetchMap = false` zeigt das Kartenbild möglicherweise noch einen alten Zustand an, aber weder die Karte noch ihre separate Overlay-Position werden vom Adapter aktualisiert.

Nachdem die Positions-Zustands-Meterkonvertierung durchgeführt wurde, sind `location.pose.x` und `location.pose.y` Meter. Konvertieren Sie diese mithilfe der Kartenkopfdaten aus `maps/remote_map.json` in Kartenpixel:

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

Für den aktuellen Snapshot platzieren `pose.x = 0.094` und `pose.y = 0.356` das Symbol ungefähr an Pixel `(309, 289)` bzw. `left: 76.5%` und `top: 59.2%`. Definieren Sie `poseYaw` aus `<serial>.location.pose.yaw`. Bei einem Symbol mit der Vorderseite nach unten wenden Sie `poseYaw - 90` an, sodass eine Live-Gierbewegung um `-16` die Vorderseite nach rechts ausrichtet. Der Adapter veröffentlicht derzeit keine Kartenbreite, -höhe, -auflösung oder -ursprung als Zustände. Daher müssen diese Werte aktualisiert werden, wenn der Mäher eine neue Karte erstellt. Vermischen Sie nicht die Karten-Array-Pixel mit den Meterkoordinaten des Mähers.

#### Gierwinkel: Ursprung und Berechnung
`<serial>.location.pose.yaw` ist die vom Anthbot als `pose.yaw` gemeldete Mährichtung. Sie wird in Grad angegeben und nicht von Millimetern umgerechnet. Der Adapter wandelt lediglich `pose.x` und `pose.y` von Millimetern in Meter um; der Gierwinkel wird unverändert übernommen. X/Y beschreiben die Position des Mähers, daher darf der Gierwinkel nicht allein aus der aktuellen Position berechnet werden.

Für ein separates VIS-Symbol, dessen Quellbild die Vorderseite des Mähwerks nach unten zeigt, berechnen Sie die Bildrotation mit einem festen Offset `90°`:

```js
const yawDeg = Number(yawState); // <serial>.location.pose.yaw
const iconRotationDeg = yawDeg - 90;

icon.style.transform = `translate(-50%, -50%) rotate(${iconRotationDeg}deg)`;
```

Der Offset `-90°` richtet die Ausrichtungskonvention von Anthbot an der Vorderseite des Objekts aus. Dieselbe Formel wird für das integrierte Kartensymbol und dessen generierte Ausweichoption verwendet. Beispiele: `yaw = 90°` führt zu einer Bildrotation von `0°` (Vorderseite unten), während der Wert `yaw = -16°` zu `-106°` (entspricht `254°`) führt und die Vorderseite nach rechts ausrichtet. Steht keine Gierachse zur Verfügung, behält das Objekt seine standardmäßige Ausrichtung (Vorderseite unten) bei.

#### Quelle des Robotersymbols
Das untersuchte Anthbot-App-Bundle enthält lokale Kartenmarkierungsressourcen, darunter die Genie-Ressource `pic_device_map`, modellspezifische Varianten für S2/S3/M9Pro und die Ladegerätmarkierung `view_map_battery_position`. Es handelt sich dabei um von der App ausgewählte, verpackte UI-Dateien. Die Cloud-/API-Payload und das heruntergeladene Kartenarchiv liefern weder eine wiederverwendbare Symbol-URL noch einen Symbolstatus. Der Adapter verpackt die passenden, von der App abgeleiteten Markierungsressourcen für bekannte Modelle und verwendet seine eigene, in sich geschlossene Robotermarkierung, falls eine Ressource fehlt, nicht lesbar ist oder das Modell unbekannt ist. Der Adapter ist unabhängig von der Installation der App.

### Standort
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `<serial>.location.gps.latitude` | Nummer | GPS-Breitengrad aus Anti-Verlust-Positionsdaten |
| `<serial>.location.pose.x` | Nummer | Lokale Mäherposition X in Metern |
| `<serial>.location.pose.y` | Nummer | Lokale Mäherposition Y in Metern |
| `<serial>.location.pose.yaw` | Nummer | Lokale Mäherposition Gierwinkel |
| `<serial>.location.pose.type` | Zeichenkette | Gemeldeter Pose-Typ |
| `<serial>.location.charger.x` | Nummer | Ladepunkt X-Koordinate in Metern aus den Metadaten der nativen Karte |
| `<serial>.location.charger.y` | Nummer | Y-Koordinate des Ladegeräts in Metern aus den Metadaten der nativen Karte |
| `<serial>.location.charger.y` | Nummer | Y-Koordinate der Ladestation in Metern aus den Metadaten der nativen Karte |

### Diagnose
Der Kanal `diagnostics` stellt schreibgeschützte Fehlerbehebungsdaten bereit, die aus dem Mähwerksschatten abgeleitet werden. Dazu gehören der RTK-Status, der RTK-Basisstatus, Kamera-/Karten-/Netzwerk-Flags, Hindernisvermeidung, Firmware-Versionen, OTA-Fortschritt, WLAN-/SIM-Details, Zeitstempel und der nächste Termin. Bei den Modellen M5/M9 ordnet der Adapter außerdem `net_config.*`, `mode.value`, `error.value`, `map.map_area`, `mapping_task.state`, `mowing_time.value` und `mowing_area.value` dem bestehenden ioBroker-Zustandsbaum zu, sofern die Bedeutungen übereinstimmen.

### Verbrauchsmaterialien
| Bundesland | Typ | Einheit | Beschreibung |
| --- | --- | --- | --- |
| `<serial>.consumable.chargingPort.life` | Nummer | `%` | Lebensdauer des Ladeanschlusses |
| `<serial>.consumable.cameras.life` | Nummer | `%` | Lebensdauer der Kameras |
| `<serial>.consumable.cameras.reset` | boolescher Wert | | Lebensdauer der Kamera zurücksetzen |
| `<serial>.consumable.blades.life` | Nummer | `%` | Lebensdauer der Klingen |
| `<serial>.consumable.blades.reset` | boolesch | | Lebensdauer der Klingen zurücksetzen |
| `<serial>.consumable.blades.reset` | boolean | | Lebensdauer der Klingen zurücksetzen |

Der Rasenmäher akzeptiert nur dann Befehle zum Zurücksetzen der Verbrauchsmaterialien, wenn der entsprechende Lebensdauerwert bei oder unter 5 % liegt.

### Steuerelemente
Schreibbare Steuerungszustände aktualisieren die Mähereinstellungen über den Anthbot IoT-Dienstschatten. Der Adapter übernimmt die modellspezifische Kodierung der Schattennutzlast intern, sodass dieselben ioBroker-Steuerungszustände für alle unterstützten Mähermodelle verwendet werden können.

| Bundesland | Typ | Bereich | Beschreibung |
| --- | --- | --- | --- |
| `<serial>.controls.fullMapMowing.mowHeight` | Nummer | `30..70 mm`, 5-mm-Schritte | Schnitthöhe für die gesamte Karte festlegen |
| `<serial>.controls.fullMapMowing.customMowingDirection` | Nummer | `0..180 deg` | Benutzerdefinierte Mährichtung für die gesamte Karte festlegen |
| `<serial>.controls.fullMapMowing.customMowingDirectionEnabled` | Boolescher Wert | `true`/`false` | Benutzerdefinierte Mährichtung für die gesamte Karte aktivieren oder deaktivieren |
| `<serial>.controls.zoneMowing.mowHeight` | Nummer | `30..70 mm`, 5 mm Schritte | Schnitthöhe für Zonenmähen einstellen |
| `<serial>.controls.zoneMowing.mowCount` | Anzahl | `1..3` | Mähdurchgänge der Zone festlegen |
| `<serial>.controls.zoneMowing.customMowingDirection` | Nummer | `0..180 deg` | Mährichtung der Zone festlegen |
| `<serial>.controls.zoneMowing.customMowingDirectionEnabled` | Boolescher Wert | `true`/`false` | Zonenmährichtung aktivieren oder deaktivieren |
| `<serial>.controls.zoneMowing.obstacleAvoidanceEnabled` | Boolescher Wert | `true`/`false` | Zonen-Hindernisvermeidung aktivieren oder deaktivieren |
| `<serial>.controls.zoneMowing.obstacleAvoidanceLevel` | Nummer | `0..2` | Zonen-Hindernisvermeidungsstufe festlegen |
| `<serial>.controls.voiceVolume` | Nummer | `0..100 %` | Sprachlautstärke einstellen |
| `<serial>.controls.rain.perceptionEnabled` | Boolescher Wert | `true`/`false` | Regenwahrnehmung aktivieren oder deaktivieren |
| `<serial>.controls.rain.continueTimeHours` | Nummer | `0..8 h` | Regendauer in Stunden einstellen |
| `<serial>.controls.nearChargerMowing.enabled` | Boolescher Wert | `true`/`false` | Mähen in der Nähe des Ladestapels aktivieren oder deaktivieren |
| `<serial>.controls.nearChargerMowing.mowHeight` | Nummer | `30..70 mm`, 5 mm Schritte | Schnitthöhe für Mähen in der Nähe des Ladeplatzes einstellen |
| `<serial>.controls.nearChargerMowing.mowCount` | Nummer | `1..3` | Mähvorgänge in der Nähe des Ladestapels einstellen |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceEnabled` | Boolescher Wert | `true`/`false` | Hindernisvermeidung in der Nähe des Ladestapels aktivieren oder deaktivieren |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | Nummer | `0..2` | Hindernisvermeidungsstufe in der Nähe des Ladepunkts festlegen |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | Zahl | `0..2` | Legt die Hindernisvermeidungsstufe in der Nähe der Ladestation fest |

### Befehle
Befehlszustände sind beschreibbar. Tastenzustände werden nach der Ausführung auf `false` zurückgesetzt. Zonenbefehlszustände werden nach der Ausführung auf eine leere Zeichenkette zurückgesetzt. Verbrauchsmaterial-Reset-Tasten sind unter `consumable` zugänglich.

| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `<serial>.commands.device.find` | Boolescher Wert | Roboter finden |
| `<serial>.commands.device.cancelRtkAntennaMoved` | Boolesch | Warnung „RTK-Antenne bewegt“ abbrechen |
| `<serial>.commands.docking.startReturn` | boolesch | Zurück zur Ladestation |
| `<serial>.commands.docking.pauseReturn` | boolescher Wert | Pause Rückkehr zur Ladestation |
| `<serial>.commands.maintenance.startGrassDump` | boolescher Wert | Grasablagerung starten |
| `<serial>.commands.maintenance.startDiskMaintenance` | Boolesch | Festplattenwartungsmodus starten |
| `<serial>.commands.mowing.startFullMap` | Boolescher Wert | Mähen der gesamten Karte starten |
| `<serial>.commands.mowing.startZone` | Zeichenkette | Mähen einer oder mehrerer manueller Zonen starten |
| `<serial>.commands.mowing.startAutoZone` | Zeichenkette | Mähen einer oder mehrerer automatischer Zonen starten |
| `<serial>.commands.mowing.startPoint` | Zeichenkette | Startpunkt für das Mähen mit `x,y` oder `{"x":123,"y":456}` |
| `<serial>.commands.mowing.startEdge` | boolescher Wert | Kantenmähen starten |
| `<serial>.commands.mowing.startNearCharger` | boolesch | Mähen in der Nähe des Ladestapels beginnen |
| `<serial>.commands.mowing.pause` | boolescher Wert | Mähen pausieren |
| `<serial>.commands.mowing.resume` | boolescher Wert | Mähen fortsetzen |
| `<serial>.commands.mowing.stop` | boolescher Wert | Alle Mähvorgänge stoppen |
| `<serial>.commands.mowing.end` | boolescher Wert | Mähvorgang beenden |
| `<serial>.commands.mowing.stopPoint` | boolescher Wert | Mähen an Stopppunkt |
| `<serial>.commands.mowing.stopPoint` | boolean | Stopppunkt für das Mähen |

Die Verfügbarkeit von `commands.maintenance.startDiskMaintenance`, `commands.maintenance.startGrassDump`, `commands.mowing.startEdge`, `commands.mowing.startNearCharger` und `commands.mowing.startPoint` kann vom Mähermodell, der Firmware, dem aktuellen Mähmodus und den Karten-/Randdaten abhängen.

### Zonen
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `<serial>.zones.manual.list` | JSON-Zeichenfolge | Bekannte manuelle/benutzerdefinierte Zonen |
| `<serial>.zones.autoList` | JSON-Zeichenfolge | Bekannte automatische/regionale Zonen |
| `<serial>.zones.autoList` | JSON-Zeichenfolge | Bekannte automatische/regionale Zonen |

### Rohdaten
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `<serial>.raw.shadow.property` | JSON-Zeichenkette | Rohdaten des Eigenschaftsschattens |
| `<serial>.raw.shadow.event-code` | JSON-Zeichenkette | Zwischengespeicherte Anthbot-Ereigniscode-Übersetzungsnutzlast, die für Fehlerbeschreibungen verwendet wird |
| `<serial>.raw.areaDefinition` | JSON-Zeichenkette | Rohdaten der Bereichsdefinition |
| `<serial>.raw.areaDefinition` | JSON-Zeichenkette | Rohdaten der Bereichsdefinition |

## Zonenmähen
Der Adapter legt die manuellen/benutzerdefinierten Zonen des Rasenmähers in folgenden Bereichen frei:

```text
<instance>.<serial>.zones.manual.list
```

Dieser Status enthält ein JSON-Array mit bekannten Zonen. Verwenden Sie `id` oder den exakten Wert von `name` aus dieser Liste, um mit dem Mähen zu beginnen.

Schreiben Sie die Auswahl an:

```text
<instance>.<serial>.commands.mowing.startZone
```

Zulässige Werte:

- eine Zone nach ID: `3`
- eine Zone mit dem Namen: „Vorgarten“
- mehrere Zonen als durch Kommas getrennte IDs oder Namen: `3,5,Hinterhof`
- mehrere Zonen als JSON-Array: `[3,5,"Hinterhof"]`

Nach einem erfolgreichen Schreibvorgang sendet der Adapter `custom_area_mow_start` mit den übereinstimmenden manuellen Zonen-IDs und löscht `commands.mowing.startZone` wieder.

Automatische Zonen funktionieren auf ähnliche Weise:

```text
<instance>.<serial>.zones.autoList
<instance>.<serial>.commands.mowing.startAutoZone
```

Bei automatischen Zonen löst der Adapter die ausgewählten Zonen-IDs oder -Namen in die Zonenkoordinaten auf und sendet `region_mow_start`.

## Fehlerbehebung
### Adapter verbindet sich nicht
- Überprüfen Sie Benutzername, Passwort und Vorwahl.
- Prüfen Sie, ob der Rasenmäher in der Anthbot-App mit demselben Konto sichtbar ist.
- Erhöhen Sie den Protokollierungsgrad des Adapters auf `debug` und starten Sie die Instanz neu.
- Überprüfen Sie `anthbot-genie.<instance>.info.connection`.

### Es werden keine Mäherobjekte erstellt
- Das Anthbot-Konto muss mindestens einen gebundenen Rasenmäher haben.
- Überprüfen Sie das Adapterprotokoll auf „Für dieses Konto wurden keine Anthbot-Geräte gefunden“.
- Stellen Sie sicher, dass der ioBroker-Host über einen Internetzugang verfügt.

### Befehle funktionieren nicht
- Prüfen Sie zunächst, ob die Statusabfrage funktioniert.
- Überprüfen Sie, ob der Zielzustand unter der richtigen Rasenmäher-Seriennummer liegt.
- Vergleichen Sie bei Zonenbefehlen den geschriebenen Wert mit den IDs und Namen in `zones.manual.list` oder `zones.autoList`.
- Der Adapter aktualisiert die temporären IoT-Anmeldeinformationen automatisch einmal nach einem AWS IoT `403`-Fehler; falls die Befehle nach diesem Wiederholungsversuch immer noch fehlschlagen, überprüfen Sie das Adapterprotokoll auf modellspezifische Payload- oder Mäherstatusfehler.
- Überprüfen Sie `raw.shadow.service` und das Adapterprotokoll auf Befehlsfehler.

## Credits
Ein besonderer Dank gilt den Anthbot Genie-Community-Projekten, die den Anthbot-Cloud-Workflow und die Befehlszuordnung wesentlich verständlicher gemacht haben:

- [vincentjanv](https://github.com/vincentjanv/anthbot_genie_ha)
- [AdrianTIonut](https://github.com/AdrianTIonut/anthbot_genie_ha)

Besonderer Dank gilt [@Riza-Aslan](https://github.com/Riza-Aslan) für die Forschungs- und Nutzlastzuordnungsarbeiten zur Unterstützung von M5/M9, die in dieses Adapter-Update eingeflossen sind.

Dieser ioBroker-Adapter ist ein unabhängiges Projekt, baut aber auf öffentlichen API-Forschungs- und Implementierungsideen aus der Community-Arbeit auf.

## Rechtliche Hinweise
Dieses Projekt ist inoffiziell und steht in keiner Verbindung zu Anthbot, wird weder von Anthbot unterstützt, gesponsert noch genehmigt.

Die Namen, Marken und Logos von Anthbot und Genie gehören ihren jeweiligen Eigentümern. Details finden Sie in [NOTICE.md](NOTICE.md).

Ältere Changelog-Einträge sind im Archiv [CHANGELOG_OLD.md](CHANGELOG_OLD.md) zu finden.

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 reloxx13

See [LICENSE](LICENSE) for details.