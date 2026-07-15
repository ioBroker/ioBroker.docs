---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/README.md
title: ioBroker-Adapter für Life360 (nächste Generation)
hash: LJzjPPkeIFkh3FtPq6/AeHZwmpVqJx4c1ABLT5jRdPg=
---
![Logo](../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

![Anzahl der Installationen](https://iobroker.live/badges/life360ng-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/life360ng-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.life360ng.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.life360ng.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter für Life360 (nächste Generation)
---

## Aktualisiert für EU-Nutzer mit moderner tokenbasierter Authentifizierung.
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

**Hinweis:** Tokens sind lange gültig (in der Regel mehrere Monate). Nach Ablauf der Gültigkeit wird im Adapterprotokoll ein Verbindungsfehler angezeigt. Wiederholen Sie die oben genannten Schritte, um ein neues Token zu erhalten.

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

**Life360-Orte nicht verfügbar?** Life360 hat den API-Zugriff auf Cloud-Orte für einige Konten (insbesondere EU-Gratiskonten) eingeschränkt. Wenn im Adapterprotokoll `All place sources returned 0 places` angezeigt wird, liefert die Life360-API keine Ortsdaten mehr für Ihr Konto. **Abhilfe:** Definieren Sie Ihre Orte im Tab [Meine Orte](#my-places) – diese funktionieren unabhängig von der Life360-Cloud und bieten dieselbe Anwesenheitserkennung.

### Tracker
Der Adapter beinhaltet einen optionalen GPS-Routenlogger, der die Bewegungen jedes Life360-Mitglieds aufzeichnet und interaktive Leaflet-Karten generiert, die direkt über eine URL in jedem Browser, ioBroker Vis oder Jarvis-Dashboard zugänglich sind.

#### So funktioniert es
Bei jeder GPS-Positionsaktualisierung prüft der Tracker, ob die neue Position mindestens **minDistance** Meter vom zuletzt aufgezeichneten Punkt entfernt ist. Ist dies der Fall, wird der Punkt an einen GeoJSON-LineString für den aktuellen Tag angehängt. Der vollständige Verlauf wird in `allTime.geojson` gespeichert, und monatliche Backups werden in `currentYear.MM.geojson` geschrieben.

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

Die Karte aktualisiert sich automatisch – es ist keine zusätzliche Konfiguration erforderlich.

**Hinweis:** Der vollständige Routenverlauf (`allTime.geojson`) wächst kontinuierlich. Bei einem Abfrageintervall von 60 Sekunden und einer Mindestdistanz von 20 Metern ist mit etwa **1 MB pro Person und Jahr** zu rechnen – deutlich innerhalb der Speichergrenzen von ioBroker.

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
### 1.10.2 (2026-05-25)
- (skvarel) Updated @alcalzone/release-script and related plugins to minimum required version 5.2.0
- (skvarel) Updated minimum required Node.js engine from 20 to 22 in package.json
- (skvarel) Replaced custom wait/sleep helper with the built-in adapter.delay() method

### 1.10.1 (2026-05-24)
- (skvarel) Life360 places display settings in Map Display tab are now hidden when "Process Life360 places" is disabled in the Integration tab
- (skvarel) Added "Enable own places" checkbox in the Integration tab; disabling it hides the My Places tab, related Map Display settings and own place markers in the map hamburger menus
- (skvarel) Added descriptive info text to the Logging tab explaining what verbose logging records and when to use it

### 1.10.0 (2026-05-23)
- (skvarel) Improved Life360 places discovery with multiple API fallbacks: v3 endpoint, embedded v4 circle data (including singular "place" key), and direct v4 places endpoint; logs a one-time info message when no places are available via any source (affects some EU free-tier accounts); added documentation note about this API restriction
- (skvarel) Added person display name aliases in the Integration tab: assign a custom alias per person used in tracker map headers, legend labels, and ioBroker object display names; circle map header name setting moved to the same tab
- (skvarel) Fixed `people.<id>.disconnected` and `people.<id>.isConnected` states always showing wrong values because the Life360 API returns the `disconnected` field as a string instead of a boolean
- (skvarel) Added `notifications.lastSpokenText` state that stores every notification text for use in Blockly, Sonos, or other automations without requiring Telegram or Alexa
- (skvarel) Added Auto-Refresh checkbox (default on) and Live Follow checkbox to tracker map hamburger menus; in the circle map, clicking a person's name in the legend focuses the map on that person's route

### 1.9.1 (2026-05-20)
- (skvarel) Fixed tracker map showing wrong day (yesterday's route) for users in timezones ahead of UTC: date calculations now use local time instead of UTC, preventing GPS points and the default date range from being assigned to the previous day between midnight and the UTC offset hour
- (skvarel) Reduced risk of Cloudflare rate-limiting: API retry loops now abort immediately on a 403/503 block instead of hammering the API with further requests; added a short delay between consecutive API calls within each poll cycle

### 1.9.0 (2026-05-18)
- (skvarel) Added place-specific notification overrides table in the Notifications tab: configure custom arrival and leave messages per place and person, with optional suppression of the default standard message; place and person columns use dropdowns populated from known places and Life360 persons

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