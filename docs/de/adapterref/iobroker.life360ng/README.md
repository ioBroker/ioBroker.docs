---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/README.md
title: ioBroker.life360ng
hash: 8YBAEnXTNSs2o7nPuClIsc0fVulNS9uGllpwlRzYJyk=
---
# IoBroker.life360ng
![Logo](../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

![Anzahl der Installationen](https://iobroker.live/badges/life360ng-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/life360ng-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.life360ng.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.life360ng.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Life360-Adapter für ioBroker (nächste Generation)
ioBroker-Adapter für [Leben360](https://www.life360.com) — aktualisiert für EU-Benutzer mit moderner tokenbasierter Authentifizierung.

**Haftungsausschluss:** Dies ist ein inoffizieller, von der Community entwickelter Adapter. Er steht in keiner Verbindung zu Life360, Inc. und wird von diesem Unternehmen auch nicht unterstützt. Er wird kostenlos für den privaten, nicht-kommerziellen Gebrauch im Bereich Hausautomation zur Verfügung gestellt. Die Nutzung erfolgt auf eigene Gefahr. Life360 behält sich das Recht vor, die API jederzeit und ohne Vorankündigung zu deaktivieren oder zu ändern.

**Datenschutz:** Alle von Life360 abgerufenen Daten werden ausschließlich auf Ihrem lokalen ioBroker-System gespeichert. Dieser Adapter übermittelt **keine** Daten an Dritte oder externe Cloud-Dienste über die Life360-API hinaus.

## Beschreibung
Dieser Adapter verbindet sich mit den Cloud-Diensten [Leben360](https://www.life360.com), um Personen zu verfolgen und ihre Anwesenheit an definierten Orten zu erkennen. Er ruft Daten zu Kreisen, Mitgliedern und Orten ab und speichert diese als ioBroker-Zustände, die in einem konfigurierbaren Intervall aktualisiert werden.

## Dokumentation
- 🇺🇸 [Dokumentation](https://github.com/inventwo/ioBroker.life360ng/blob/main/docs/en/README.md)
- 🇩🇪 [Dokumentation](https://github.com/inventwo/ioBroker.life360ng/blob/main/docs/de/README.md)

## Konfiguration
### Bearer-Token (für EU-Nutzer erforderlich)
Life360 hat die passwortbasierte Anmeldung für EU-Nutzer deaktiviert. Beantragen Sie manuell ein Bearer-Token:

1. Öffnen Sie [https://life360.com/login](https://life360.com/login) in Ihrem Browser.
2. Öffnen Sie die Entwicklertools Ihres Browsers (**F12**) und wechseln Sie zur Registerkarte **Netzwerk**.
3. Geben Sie Ihre E-Mail-Adresse ein und klicken Sie auf **Weiter**.
4. Geben Sie den an Ihre E-Mail-Adresse gesendeten Einmalcode ein.
5. Suchen Sie die **POST**-Anfrage mit dem Namen `token` (OPTIONS ignorieren).
6. Kopieren Sie in **Vorschau** / **Antwort** den Wert von `access_token`.
7. Fügen Sie es in das Feld **Bearer-Token** in der Adapterkonfiguration ein.

**Hinweis:** Geben Sie das Token OHNE das Wort „Bearer“, OHNE Leerzeichen und OHNE Anführungszeichen ein!

**Hinweis:** Tokens sind lange gültig (in der Regel mehrere Monate). Nach Ablauf der Gültigkeitsdauer wird im Adapterprotokoll ein Verbindungsfehler angezeigt. Wiederholen Sie die oben genannten Schritte, um ein neues Token zu erhalten.

![Token](../../../en/adapterref/iobroker.life360ng/img/readme_anonym.png)

### Meine Orte
Fügen Sie private Orte hinzu, die für die Life360-Cloud-Dienste nicht sichtbar sind. Der Adapter prüft bei jeder Abfrage die Anwesenheit an Ihren benutzerdefinierten Orten.

- Geben Sie dem Ort einen **Namen**.
- Geografische Position (Breitengrad und Längengrad) festlegen.
- Radius in Metern einstellen.

### Integration
Wählen Sie aus, welche Life360-Daten verarbeitet werden sollen: Kreise, Orte, Personen.

### Standortverfolgung
Aktivieren Sie die Standortverfolgung, um den Personendatenpunkten Geopositionierungsdetails (Breitengrad, Längengrad, `locationName`) hinzuzufügen.

## Hinweise zur Migration / zum Upgrade
### Aktualisierung von Version 1.0.x auf 1.1.0
Die interne Objekthierarchie wurde umstrukturiert, um den Objekttypregeln von ioBroker zu entsprechen.

**Bitte führen Sie nach dem Update die folgenden Schritte aus:**

1. Beenden Sie die Adapterinstanz.
2. Löschen Sie alle Objekte des Adapters (in ioBroker Admin:

Objekte → life360ng.0 → Alle löschen)

3. Starten Sie die Adapterinstanz erneut.
4. Alle Datenpunkte werden automatisch neu erstellt.

> ⚠️ Ihre bestehenden Skripte und Automatisierungen müssen **nicht** geändert werden – > alle Datenpunkt-IDs bleiben gleich.

## Staaten
### Kreise
Life360-Kreise mit ihren zugehörigen Orten und der Anwesenheit ihrer Mitglieder.

| Bundesland | Typ | Beschreibung |
|---|---|---|
| `circles.<id>.name` | Text | Kreisname (z. B. `Family skvarel`) |
| `circles.<id>.memberCount` | Wert | Anzahl der Kreiselemente *(kann null sein)* |
| `circles.<id>.createdAt` | Datum | Erstellungsdatum des Kreises |
| `circles.<id>.timestamp` | Datum | Letzte Datenaktualisierung |
| `circles.<id>.places.<placeId>.<memberId>.isPresent` | Indikator | Mitglied ist an diesem Ort anwesend |
| `circles.<id>.places.<placeId>.membersPresent` | Wert | Anzahl der Mitglieder, die sich derzeit an diesem Ort befinden |
| `circles.<id>.places.<placeId>.membersPresent` | Wert | Anzahl der Mitglieder, die sich aktuell an diesem Ort befinden |

### Info
| Bundesland | Typ | Beschreibung |
|---|---|---|
| `info.connection` | boolescher Wert | `true` bei Verbindung mit der Life360-Cloud |

### Meine Orte
Benutzerdefinierte Orte, die in der Adapterkonfiguration definiert sind (werden nicht mit der Life360-Cloud synchronisiert).

Struktur: `myplaces.<placeName>.<memberName>.*`

| Bundesland | Typ | Beschreibung |
|---|---|---|
| `myplaces.<place>.<member>.distance` | Wert.Distanz | Entfernung zum Platzierungsmittelpunkt in Metern |
| `myplaces.<place>.<member>.startTimestamp` | Datum | Zeitstempel, zu dem das Mitglied den Ort betreten hat |
| `myplaces.<place>.<member>.timestamp` | Datum | Zeitstempel der letzten Prüfung |
| `myplaces.<place>.gps-coordinates` | value.gps | Ortszentrum als JSON `{"lat":..,"lng":..}` |
| `myplaces.<place>.latitude` | value.gps.latitude | Ortszentrum-Breitengrad |
| `myplaces.<place>.longitude` | value.gps.longitude | Ortszentrum-Längengrad |
| `myplaces.<place>.members` | Liste | Alle Mitglieder wurden an diesem Ort überprüft |
| `myplaces.<place>.membersCount` | Wert | Gesamtzahl der verfolgten Mitglieder |
| `myplaces.<place>.membersPresent` | Liste | Namen der aktuell anwesenden Mitglieder |
| `myplaces.<place>.membersPresentCount` | Wert | Anzahl der aktuell anwesenden Mitglieder |
| `myplaces.<place>.radius` | Wert | Konfigurierter Radius in Metern |
| `myplaces.<place>.timestamp` | Datum | Letzte Datenaktualisierung |
| `myplaces.<place>.urlMap` | text.url | OpenStreetMap-Link zum Ort |
| `myplaces.<place>.urlMapIframe` | text.url | Google Maps-Einbettungs-URL |
| `myplaces.<place>.urlMapIframe` | text.url | Google Maps-Einbettungs-URL |

### Menschen
Jedes Mitglied des Life360-Kreises erhält seinen eigenen Kanal unter `people.<id>`, wobei `<id>` die Life360-UUID des Mitglieds ist.

| Bundesland | Typ | Beschreibung |
|---|---|---|
| `people.<id>.avatar` | text.url | URL des Profilbilds |
| `people.<id>.createdAt` | Datum | Datum der Kontoerstellung |
| `people.<id>.disconnected` | Indikator | App ist explizit getrennt |
| `people.<id>.firstName` | Text | Vorname |
| `people.<id>.gps-coordinates` | value.gps | GPS-Position als JSON `{"lat":..,"lng":..}` |
| `people.<id>.id` | Text | Life360-Mitglieds-UUID |
| `people.<id>.isConnected` | indicator.reachable | App ist verbunden und erreichbar |
| `people.<id>.isSharingLocation` | Indikator | Standortfreigabe ist aktiv |
| `people.<id>.lastName` | Text | Nachname |
| `people.<id>.lastPositionAt` | Datum | Zeitstempel der letzten Positionsaktualisierung |
| `people.<id>.latitude` | value.gps.latitude | Aktuelle geografische Breite |
| `people.<id>.locationName` | Text | Aktueller Ortsname (z. B. `Home`) |
| `people.<id>.longitude` | value.gps.longitude | Aktuelle Längengradangabe |
| `people.<id>.status` | Text | Verbindungsstatus (z. B. `Ok`) |
| `people.<id>.timestamp` | Datum | Zeitstempel der letzten Datenaktualisierung |
| `people.<id>.urlMap` | text.url | OpenStreetMap-Link zur aktuellen Position |
| `people.<id>.urlMapIframe` | text.url | Google Maps-Einbettungs-URL |
| `people.<id>.urlMapOsmIframe` | text.url | OpenStreetMap-Einbettungs-URL (iFrame) |
| `people.<id>.urlMapOsmIframe` | text.url | Einbettbare OpenStreetMap-URL (iFrame) |

**Hinweis:** `isConnected` zeigt an, ob die Life360-App erreichbar ist, während `disconnected` einen expliziten Verbindungsabbruch signalisiert.

Beide können bei einem Verbindungsverlust gleichzeitig den Wert `false` annehmen.

### Orte
Life360-Orte werden direkt aus der Life360-Cloud synchronisiert (definiert in der Life360-App).

Diese Orte sind **schreibgeschützt** und können im Adapter nicht konfiguriert werden.

| Bundesland | Typ | Beschreibung |
|---|---|---|
| `places.<id>.name` | Text | Ortsname (z. B. `Refugium`) |
| `places.<id>.circleId` | Text | UUID des Kreises, zu dem dieser Ort gehört |
| `places.<id>.ownerId` | Text | UUID des Ortsbesitzers |
| `places.<id>.gps-coordinates` | value.gps | Ortszentrum als JSON `{"lat":..,"lng":..}` |
| `places.<id>.latitude` | value.gps.latitude | Ortszentrum-Breitengrad |
| `places.<id>.longitude` | value.gps.longitude | Ortszentrum-Längengrad |
| `places.<id>.radius` | Wert | Radius in Metern |
| `places.<id>.timestamp` | Datum | Letzte Datenaktualisierung |
| `places.<id>.urlMap` | text.url | OpenStreetMap-Link zum Ort |
| `places.<id>.urlMapIframe` | text.url | Google Maps-Einbettungs-URL |
| `places.<id>.urlMapIframe` | text.url | Google Maps-Einbettungs-URL |

> **Hinweis:** Informationen zu benutzerdefinierten Orten mit Anwesenheitserkennung finden Sie in [myplaces](#myplaces).

### Tracker
Der Adapter beinhaltet einen optionalen GPS-Routenlogger, der die Bewegungen jedes Life360-Mitglieds aufzeichnet und interaktive Leaflet-Karten generiert, die direkt über eine URL in jedem Browser, ioBroker Vis oder Jarvis-Dashboard zugänglich sind.

#### So funktioniert es
Bei jeder Aktualisierung der GPS-Position prüft der Tracker, ob die neue Position mindestens **minDistance** Meter vom zuletzt aufgezeichneten Punkt entfernt ist. Ist dies der Fall, wird der Punkt an einen GeoJSON-LineString für den aktuellen Tag angehängt. Der vollständige Verlauf wird in `allTime.geojson` gespeichert, und monatliche Backups werden in `currentYear.MM.geojson` geschrieben.

Eine HTML-Karte wird nach jeder Aktualisierung automatisch (neu) generiert und im ioBroker-Dateisystem gespeichert. Sie ist sofort über HTTP zugänglich.

#### Aktivieren des Trackers
1. Öffnen Sie die Adapterkonfiguration.
2. Aktivieren Sie unter **Tracker / Routenlogger** die Verfolgung für jede Person.
3. Optional kann für jede Person eine **Familienkarte** aktiviert werden, um diese in die kombinierte Familienansicht aufzunehmen.
4. Stellen Sie den **Mindestabstand** (Standard: 20 m) ein, um GPS-Rauschen herauszufiltern.
5. Speichern und den Adapter neu starten.

#### Karten-URLs
Jede Person und die Familiengruppe erhält eine eigene Karten-URL, die als ioBroker-Status gespeichert wird:

| Bundesland | Beschreibung |
|---|---|
| `tracker.<Name>.url` | Relative URL der individuellen Karte der Person |
| `tracker.circle.url` | Relative URL der kombinierten Kreiskarte |
| `tracker.circle.urlLocal` | Vollständige URL mit ioBroker-Server-IP und Webadapter-Port |
| `tracker.circle.urlLocal` | Vollständige URL mit ioBroker-Server-IP und Webadapter-Port |

Das URL-Format ist:

```
/<namespace>/tracker/<name>.html
```

Öffnen Sie diese URL in einem beliebigen Browser. Die Karte wird im konfigurierten Abfrageintervall automatisch aktualisiert.

**Hinweis:** Die Tracker-Karten werden vom Server [ioBroker-Webadapter](https://github.com/ioBroker/ioBroker.web) bereitgestellt. Stellen Sie sicher, dass dieser installiert ist und ausgeführt wird. Der Status `urlLocal` wird automatisch aus der IP-Adresse des Servers und dem Port des Webadapters (Standard: 8082) erstellt.


Die generierten HTML-, CSS- und JS-Dateien werden im ioBroker-Dateisystem gespeichert und können unter **Admin → Dateien → `life360ng.<instance>/tracker/`** eingesehen werden.

#### Kartenmerkmale
- **Interaktive Leaflet-Karte** – Schwenken und Zoomen, basierend auf OpenStreetMap
- **Datumsauswahl** — Navigation zwischen allen aufgezeichneten Tagen (vollständiger Verlauf, keine Begrenzung)
- **Farbcodierte Routen** – jede Person hat ihre eigene, konfigurierbare Routenfarbe
- **Start-/Endmarkierungen** – kennzeichnen deutlich die erste und letzte Position des Tages
- **Automatische Aktualisierung** — Die Seite wird automatisch neu geladen (Abfrageintervall + 10 s)
- **Familienkarte** – alle berechtigten Personen auf einer kombinierten Karte mit Legende
- **Flaggenmarkierungen** — Life360-Orte und eigene benutzerdefinierte Orte (Meine Orte) können als Flaggenmarkierungen auf der Karte angezeigt werden, jeweils mit konfigurierbarer Farbe, Größe und Deckkraft (0,0 = unsichtbar, 1,0 = vollständig sichtbar).

#### Einzelne Kartenmerkmale
- **Routen-Kontrollkästchen:** Jede Einzelpersonenkarte verfügt über ein „Routen“-Kontrollkästchen, mit dem die Routenanzeige für den ausgewählten Zeitraum ein- und ausgeschaltet werden kann. Der Status wird pro Person im Browser gespeichert und bleibt auch nach einem Seitenneuladen erhalten.
- **Dynamische Datumsauswahl:** Die Datumsbereichsauswahl wird nur angezeigt, wenn die Route aktiviert ist. Wenn die Route deaktiviert ist, wird nur der letzte bekannte Punkt angezeigt.
- **Personalisierte Farben:** Die Farbe der Checkbox entspricht der Farbe der Person.
- **Konsistente Kopfzeile:** Die Höhe der Kopfzeile bleibt unabhängig vom Status der Checkboxen konstant.

#### Tracker-Staaten
##### Konfiguration (`tracker.config.*`)
Alle Farb- und Verhaltenseinstellungen können zur Laufzeit geändert werden – die Karten werden sofort neu gerendert, ohne dass der Adapter neu gestartet werden muss.

| Bundesland | Typ | Beschreibung |
|---|---|---|

| `tracker.config.enabled` | Boolescher Wert | Routenprotokollierung aktivieren/deaktivieren |as ghst

##### Pro-Personen-Daten (`tracker.<Name>.*`)
| Bundesland | Typ | Beschreibung |
|---|---|---|
| `tracker.<Name>.allTime.geojson` | Zeichenkette (JSON) | Vollständiger GeoJSON-Verlauf (alle Tage) |
| `tracker.<Name>.mapSize` | Zahl (KB) | Dateigröße der generierten HTML-Karte |
| `tracker.<Name>.url` | text.url | HTTP-URL der Karte der Person |
| `tracker.<Name>.urlLocal` | text.url | HTTP-URL mit der IP-Adresse des ioBroker-Servers und dem Port des Webadapters |
| `tracker.<Name>.urlLocal` | text.url | HTTP-URL mit der IP-Adresse des ioBroker-Servers und dem Port des Webadapters |

##### Kreisdiagramm (`tracker.circle.*`)
| Bundesland | Typ | Beschreibung |
|---|---|---|
| `tracker.circle.allTime.geojson` | Zeichenkette (JSON) | Zusammengeführtes GeoJSON aller Kreiselemente |
| `tracker.circle.mapSize` | Zahl (KB) | Dateigröße der generierten HTML-Karte |
| `tracker.circle.url` | text.url | HTTP-URL der kombinierten Kreiskarte |
| `tracker.circle.urlLocal` | text.url | HTTP-URL mit der IP-Adresse des ioBroker-Servers und dem Port des Webadapters |
| `tracker.circle.urlLocal` | text.url | HTTP-URL mit der IP-Adresse des ioBroker-Servers und dem Port des Webadapters |

#### Einbetten in Vis / Jarvis
Verwenden Sie die Karten-URL in einem **iFrame-Widget** (Vis) oder einer **URL-Kachel** (Jarvis):

```
/life360ng.0/tracker/<name>.html
```

Die Karte aktualisiert sich selbst – keine zusätzliche Konfiguration erforderlich.

**Hinweis:** Der vollständige Routenverlauf (`allTime.geojson`) wächst kontinuierlich. Bei einem Abfrageintervall von 60 Sekunden und einer Mindestentfernung von 20 Metern ist mit etwa **1 MB pro Person und Jahr** zu rechnen – deutlich innerhalb der Speichergrenzen von ioBroker.

Verwenden Sie die Option **Aufbewahrungsdauer (Tage)** in der Adapterkonfiguration, um Daten, die älter als eine bestimmte Anzahl von Tagen sind, automatisch zu entfernen (0 = unbegrenzt aufbewahren). Die Bereinigung erfolgt bei jedem Adapterstart und einmal täglich.

Um die aufgezeichneten Routendaten einer Person manuell zu löschen, aktivieren Sie das Kontrollkästchen **„Aufzeichnung löschen.“** in der Personentabelle und speichern Sie die Konfiguration. Der Routenverlauf (`allTime.geojson`) der Person wird auf den letzten bekannten Punkt reduziert. Da die Familienkarte aus den individuellen Personendaten erstellt wird, wird sie ebenfalls automatisch aktualisiert. Die monatlichen GeoJSON-Dateien (`currentYear.MM`) bleiben davon unberührt.

Die Routenfarben pro Person werden in den Adaptereinstellungen (Registerkarte „Tracker“) konfiguriert.

## Unterstützung
Wenn Ihnen unsere Arbeit gefällt und Sie uns unterstützen möchten, freuen wir uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zu ioBroker.)

[![Spende](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Credits
Dieser Adapter basiert auf der Originalarbeit von [MiGoller](https://github.com/MiGoller).<br> Vielen Dank für die erste Umsetzung und die Idee! Dieses Repository enthält Optimierungen und Weiterentwicklungen.<br> Hinweis: Der ursprüngliche [Repository](https://github.com/MiGoller/ioBroker.life360) ist archiviert und wird nicht mehr aktualisiert.

## Ältere Änderungen
- [CHANGELOG_OLD.md](https://github.com/inventwo/ioBroker.life360ng/blob/main/CHANGELOG_OLD.md)

## Changelog

<!--
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (skvarel) Added place-specific notification overrides table in the Notifications tab: configure custom arrival and leave messages per place and person, with optional suppression of the default standard message; place and person columns use dropdowns populated from known places and Life360 persons
- (skvarel) Extended the Alexa test button to send two back-to-back announcements so sequential playback and restoration of the original volume can be verified directly from the adapter UI
- (skvarel) Added a longer pause between Alexa announcements when the adapter must fall back to inline `volume;text` commands, giving the device more time to restore the previous volume before the next message
- (skvarel) Reworked Alexa volume handling again: life360ng now saves the current `Player.volume`, sets the configured announcement volume explicitly for the speech, and restores the original device volume afterwards so the test button and real notifications follow the configured volume reliably


### 1.8.0 (2026-05-17)
- (skvarel) Fixed unhandled promise rejections ("DB closed") at adapter shutdown caused by async DB operations running after the Redis connection was already closed; adapter now sets an unloading flag to prevent new operations from starting and catches any remaining DB errors gracefully
- (skvarel) Added Notifications tab with Telegram support: send a message when a person arrives at a known place (Life360 app places, own places and/or unknown places); configurable per person with prefix text and per recipient with instance number and Chat ID
- (skvarel) Added Alexa announcements support: announce location arrivals via Amazon Echo devices using the ioBroker Alexa2 adapter; configurable device list with speak state ID and announcement volume (volume is automatically restored by the Alexa adapter after each announcement)

### 1.7.0 (2026-05-14)
- (skvarel) Fixed crash on fresh install caused by adapter writing tracker files before the namespace meta object was created
- (skvarel) Improved error message when Life360 API requests are blocked by Cloudflare (IP rate-limited); no longer logs the full HTML response
- (skvarel) Hovering over a route point or line now temporarily highlights the active day (thicker line, full opacity, other days faded) when "Day highlight" is enabled; the tooltip on a line shows date (person map) or name and date (circle map)
- (skvarel) Clicking a line now opens a single popup at the cursor position with date and name instead of opening all marker popups
- (skvarel) Added optional radius circles for Life360 places and own places (My Places) on the tracker map; toggleable via new "Place radius" and "My Place radius" checkboxes in the hamburger menu; circles use the same color as the flag markers
- (skvarel) Updated documentation
- (skvarel) Added per-person minimum distance setting to the tracker table; a value of 0 falls back to the global minimum distance

### 1.6.0 (2026-05-12) 
- (skvarel) Added refresh button to the hamburger menu
- (skvarel) Clicking a route point in multi-day view now highlights the active day (thicker line, full opacity) while other days fade into the background; all timestamps for the selected day open simultaneously; clicking the map background or the same point again resets the view
- (skvarel) Added "Day highlight" toggle to the hamburger menu to switch between single-popup and day-highlight mode; state persists per map in the browser
- (skvarel) Reduced popup size (smaller font and padding) for a less dominant appearance
- (skvarel) Added configurable popup opacity in the Map Display settings (default: 1.0)
- (skvarel) Active day highlight and open popups are restored after auto-refresh
- (skvarel) Added configurable default view range for the date picker; the map opens showing the last N days by default on every load

### 1.5.2 (2026-05-10)
- (skvarel) Added configurable opacity for flag markers (Life360 places and own places)

### 1.5.1 (2026-05-10)
- (skvarel) Extracted shared map JS and CSS from HTML tracker files into static files served once by the web adapter, reducing the size of each GPS-update HTML file significantly
- (skvarel) Fixed JSDoc type warnings introduced by updated ESLint config (jsdoc/reject-any-type, jsdoc/reject-function-type)
- (skvarel) Added documentation for tracker file storage location (Admin → Files → life360ng.<instance>/tracker/)
- (skvarel) Added separate docs page for the Map Display tab (colors, route style, place flags, layout) in English and German; moved map appearance content out of the Logbook docs page

## License

MIT License

Copyright (c) 2026 skvarel <sk@inventwo.com>

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