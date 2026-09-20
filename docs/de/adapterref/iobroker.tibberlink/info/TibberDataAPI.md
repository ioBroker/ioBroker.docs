---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/info/TibberDataAPI.md
title: Tibber Data API - Forschungsnotizen
hash: 4ni1PJ1CRZ+JKsfkitP3m0zq4l4oIfgD8tYtZs8UNT8=
---
# Tibber Data API – Forschungsnotizen

Referenzhinweise zur Fahrzeug-/Ladegerätintegration in[`src/lib/tibberDataAPI.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberDataAPI.ts) Zusammengestellt aus der offiziellen Dokumentation und dem interaktiven Playground (das Schema ist ohne Anmeldung nicht vollständig abrufbar, daher stammen die folgenden Gerätebeispiele aus der Debug-Ausgabe eines echten Adapters).

## Die beiden Tibber-APIs (sie sind getrennt!)

| API                          | Gastgeber                                                                                             | Zweck                                                                          | Authentifizierung      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------- |
| **Entwickler / GraphQL-API** | `api.tibber.com` (Dokumentation: [developer.tibber.com](https://developer.tibber.com) )               | Energiepreise, Verbrauchshistorie, Pulse-Live-Feed                             | Persönliches API-Token |
| **Daten-API**                | `data-api.tibber.com` (Dokumentation: [data-api.tibber.com/docs](https://data-api.tibber.com/docs/) ) | IoT-Gerätedaten: Fahrzeuge, Ladegeräte, Wärmepumpen, Wechselrichter, Batterien | OAuth2 (PKCE)-Client   |

Die Developer/GraphQL API gibt **keine** Daten zu Ladegeräten/Fahrzeuggeräten preis – dafür ist ausschließlich die Data API zuständig.

## Nützliche Links

- Dokumentationsübersicht: <https://data-api.tibber.com/docs/>
- Erste Schritte: <https://data-api.tibber.com/docs/get-started/>
- Authentifizierung: <https://data-api.tibber.com/docs/auth/>
- Bereiche: <https://data-api.tibber.com/docs/scopes/>
- Kunden verwalten (Kunden-ID/Kundenschlüssel erstellen): <https://data-api.tibber.com/clients/manage/>
- Unterstützte Geräte: <https://data-api.tibber.com/docs/devices/supported/>
- Live-Events: <https://data-api.tibber.com/docs/devices/live-events/>
- Geräteverlauf: <https://data-api.tibber.com/docs/devices/device-history/>
- Ratenbegrenzung: <https://data-api.tibber.com/docs/api-usage/rate-limiting/>
- Interaktiver Spielplatz: <https://data-api.tibber.com/playground/>

## Authentifizierung (OAuth2 PKCE)

- Autorisierungs-URL: `https://thewall.tibber.com/connect/authorize`
- Token-URL: `https://thewall.tibber.com/connect/token`
- Umleitungs-URI, die vom Adapter verwendet wird: `http://localhost/` (muss exakt mit der Clientkonfiguration übereinstimmen, inklusive abschließendem Schrägstrich)
- Angefragte Bereiche: `openid offline_access data-api-homes-read data-api-vehicles-read data-api-chargers-read`
- Der Adapter verwendet ein festes PKCE-Verifizierer-/Challenge-Paar (die Sicherheit ergibt sich aus dem Client-Secret); das Refresh-Token wird im Zustand gespeichert. `info.tibberDataApiRefreshToken` Die

## Vom Adapter verwendete Endpunkte

Base: `https://data-api.tibber.com/v1`

| Verfahren | Weg                                  | Anmerkungen                                                              |
| --------- | ------------------------------------ | ------------------------------------------------------------------------ |
| ERHALTEN  | `/homes`                             | Liste der Häuser (kann ein Array zurückgeben oder `{ homes: [...] }`).   |
| ERHALTEN  | `/homes/{homeId}/devices`            | **Geräteliste** – nur grundlegende Informationen, **keine Funktionen** . |
| ERHALTEN  | `/homes/{homeId}/devices/{deviceId}` | **Gerätedetails** — beinhaltet `capabilities` (die Live-Werte).           |

> Roaming-Geräte wie Elektrofahrzeuge werden **allen** Haushalten des Benutzers zugeordnet. Da der Listenendpunkt keine Funktionen bietet, muss der Adapter für jedes Gerät den Detailendpunkt aufrufen, um Werte auszulesen und den Gerätetyp zu klassifizieren.

## Geräteschema (aus der Spielwiese)

### `GET /v1/homes/{homeId}/devices` (Liste)

```json
{
  "devices": [
    {
      "id": "string",
      "externalId": "string",
      "info": { "name": "string", "brand": "string", "model": "string" },
      "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 }
    }
  ]
}
```

### `GET /v1/homes/{homeId}/devices/{deviceId}` (Detail)

```json
{
  "id": "string",
  "externalId": "string",
  "info": { "name": "string", "brand": "string", "model": "string" },
  "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 },
  "status": { "lastSeen": "2026-07-30T06:25:23.770Z" },
  "attributes": [
    { "id": "string", "status": "string", "ssid": "string", "bssid": "string", "ipAddress": "string" }
  ],
  "capabilities": [
    { "id": "string", "description": "string", "value": "...", "unit": "string", "availableValues": ["..."] }
  ]
}
```

Feldnotizen:

- `info.name` Und `info.brand` sind **erforderlich** ; `info.model` ist optional (bestmögliche Werte).
- `externalId` = externe Kennung eines Drittanbieters (bei einem Pulse ist dies häufig der QR-Code); `id` ist die öffentlich adressierbare ID, die nur in dieser API existiert.
- `status.lastSeen` = Zeitstempel, wann das Gerät zuletzt von Tibber gesehen wurde (vom Adapter geschrieben als `LastSeen`).
- `attributes[]` = Verbindungsinformationen (WLAN-SSID/BSSID, IP-Adresse, …). Werden derzeit nicht vom Adapter geschrieben.
- **Es gibt keine oberste Ebene `type` /`category` Feld** — Der Gerätetyp muss aus den Fähigkeiten abgeleitet werden (siehe Klassifizierung unten).

## Gerätekategorien (gemäß Dokumentation)

Die Daten-API stellt derzeit Folgendes bereit:

1. Fahrzeuge (OEM-verbundene Elektrofahrzeuge)
2. Ladestationen für Elektrofahrzeuge (EVSE)
3. Thermostate / Klimageräte (Thermostate, Wärmepumpen, Raumheizgeräte)
4. Solarwechselrichter (Produktionskennzahlen)
5. Heimspeicher / Hybrid-Energiesysteme
6. Ältere Wechselrichter

> Die Dokumentation warnt ausdrücklich: _„Neue Kategorien können ohne grundlegende Änderungen auftreten“_ und empfiehlt _, „unbekannte Attribute/Funktionen vorsorglich zu behandeln“._ Aus diesem Grund beschreibt der Adapter die Ladefunktionen generisch und **überspringt** Gerätetypen, die er nicht explizit erkennt.

## Funktionsbeispiele (echte Debug-Ausgabe)

### Fahrzeug — BMW i3

```json
[
  { "id": "storage.stateOfCharge",       "description": "state of charge",                 "value": 0,   "unit": "%" },
  { "id": "storage.targetStateOfCharge", "description": "target state of charge",           "value": 100, "unit": "%" },
  { "id": "range.remaining",             "description": "estimated remaining driving range","value": 0,   "unit": "m" },
  { "id": "connector.status",            "description": "vehicle plug status",              "value": "unknown", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",             "description": "vehicle charging status",          "value": "unknown", "availableValues": ["charging","idle","unknown"] }
]
```

### Ladegerät — go-e

```json
[
  { "id": "grid.phaseCount",                  "description": "number of phases being used for charging", "value": 1, "unit": "" },
  { "id": "connector.status",                 "description": "charger connector status",                 "value": "connected", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",                  "description": "charger charging status",                  "value": "idle",      "availableValues": ["charging","idle","unknown"] },
  { "id": "charging.current.max",             "description": "maximum allowed charge current",           "value": 8, "unit": "A" },
  { "id": "charging.current.offlineFallback", "description": "fallback current if charger goes offline", "value": 0, "unit": "A" }
]
```

Notiz: `range.remaining` wird in **Metern** angegeben (`m`) — Der Adapter wandelt dies in km für Fahrzeuge um.

## Geräteklassifizierung im Adapter

Da kein Gerät vorhanden ist `type` Feld, Klassifizierung ist fähigkeitsbasiert und **positiv** (keine Auffangkategorie):

| Typ                 | Erkannt von                                        | Begründung                                                                                                                                                      |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fahrzeug            | besitzt die Fähigkeit `range.remaining`             | Nur ein Auto hat eine Reichweite. `storage.stateOfCharge` wird **nicht** verwendet, da Heimbatterien/Wechselrichter dies ebenfalls melden.                       |
| Ladegerät           | hat eine Fähigkeits-ID, die mit `charging.current.` | Nur ein EVSE (Elektrofahrzeug-Ladegerät) steuert den Ladestrom. `connector.status` /`charging.status` werden mit Fahrzeugen geteilt und sind daher unzureichend. |
| Irgendetwas anderes | —                                                  | Bewusst übersprungen (Debug-Protokoll), damit zukünftige Kategorien (Wechselrichter, Wärmepumpen, Batterien) bewusst hinzugefügt werden können.                 |

Die Ladezustände werden generisch geschrieben: ein Zustand pro Fähigkeit, benannt nach der bereinigten Fähigkeits-ID (`charging.current.max` →`charging_current_max`), typisiert aus dem Wert (Zahl / boolescher Wert / Zeichenkette), mit der von der API bereitgestellten `description` als Zustandsbeschreibung.