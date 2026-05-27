---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.midea/README.md
title: ioBroker.midea
hash: rN8jfwxs85SLopsq8p9KCqOXt0t8ZLeiXzJA2gUVZQ8=
---
![Logo](../../../en/adapterref/iobroker.midea/admin/midea.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.midea.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.midea.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/midea-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/midea-stable.svg)
![NPM](https://nodei.co/npm/iobroker.midea.png?downloads=true)

# IoBroker.midea
ioBroker-Adapter für Klimaanlagen von Midea, Dimstal und Royal Clima. Kommuniziert direkt über das **Midea LAN-Protokoll** mit Ihrem Gerät – Firmware-Versionen V3 (Standard), V2 und V1 werden unterstützt. Die Cloud-Verbindung wird nur für den Abruf von Verschlüsselungstoken für V3-Geräte und zur Anreicherung der Gerätenamen benötigt; V1- und V2-Geräte funktionieren ohne Cloud-Anbindung.

## So funktioniert es
1. UDP-Broadcast auf Port 6445, um alle Midea-Geräte im LAN zu ermitteln.

Die Firmware V3 antwortet mit einem 5a5a/8370 Binärframe, V2 mit einem rohen 5a5a Frame und V1 mit einer `<?xml …>` Antwort (der Adapter öffnet dann eine kurze TCP-Roundtrip-Verbindung zum Gerät, um dessen Geräte-ID zu erfahren).

2. Bei V3-Appliances authentifiziert sich der Adapter gegenüber der konfigurierten Cloud.

(Standardmäßig MSmartHome; NetHome Plus, Midea Air oder Ariston Clima sind in der *Cloud-App* auswählbar) und fragt nach dem gerätespezifischen `{token, key}`-Paar, das für den LAN-Handshake benötigt wird. Geräte der Versionen V1 und V2 benötigen kein Cloud-Token – die Erkennung allein genügt zur Steuerung.

3. Ab diesem Zeitpunkt erfolgt die Steuerung über TCP/6444. V3 verwendet den 8370-Transport.

(AES-256-CBC + HMAC-SHA-256-Sitzung) umschließt AES-128-ECB-verschlüsselte Befehlskörper. V1 und V2 senden dieselben AES-128-ECB-Befehlskörper in unkomprimierten 5a5a-Paketen ohne 8370-Umschlag und ohne Sitzungsschlüssel.

Die Cloud dient ausschließlich dem Abruf von V3-Token/Schlüsselpaaren und der Auflistung von Geräten, die die Übertragung nicht erreicht hat. Es werden keine Live-Daten über den Cloud-Pfad übertragen.

## Anforderungen
- Node.js **20** oder neuer.
- Der ioBroker-Host muss eine L2-Broadcast-Domäne mit dem Gerät teilen — UDP

6445 muss es erreichen. Über VLANs hinweg benötigen Sie einen UDP-Broadcast-Relay (z. B.
`udpbroadcastrelay`).

- Für Geräte mit V3-Firmware (die meisten Geräte der aktuellen AC-Produktpalette): ein Cloud-Konto

In der entsprechenden App. *MSmartHome* (`com.midea.ai.overseas`, [Google Play](https://play.google.com/store/apps/details?id=com.midea.ai.overseas)) ist die Standardeinstellung. *NetHome Plus*, *Midea Air* und *Ariston Clima* werden ebenfalls unterstützt und können in den Einstellungen der *Cloud-App* ausgewählt werden. Geräte mit Firmware V1 und V2 werden ohne Cloud gesteuert und ignorieren die Anmeldeinformationen.

## Konfiguration
| Feld | Beschreibung |
| ---------- | ----------------------------------------------------------------------------- |
| `user` | E-Mail-Adresse Ihres MSmartHome-Kontos. |
| `interval` | Abfrageintervall in Sekunden (5–3600, Standard 30). Jedes Gerät wird lokal abgefragt. |
| `Intervall` | Abfrageintervall in Sekunden (5–3600, Standardwert 30). Jedes Gerät wird lokal abgefragt. |

## Objektbaum
```text
midea.0
├── info.connection                 — boolean: cloud reachable
└── <deviceId>
    ├── info.*                      — id, name, host, mac, firmware, online…
    ├── capabilities.*              — flags reported by the appliance (B5)
    ├── status.*                    — current device state (read-only)
    └── control.*                   — writeable commands
```

### Steuerung (Wohnklimaanlage, 0xAC)
| Steuerung | Typ | Beschreibung |
| --------------------- | ------- | ---------------------------------------------- |
| `powerOn` | Boolescher Wert | Gerät ein-/ausschalten |
| `temperatureSetpoint` | Nummer | 16–31 °C (60–87 °F) |
| `temperatureUnit` | Aufzählung | Celsius / Fahrenheit |
| `fanSpeed` | Zahl | 0–102 (102 = automatisch) |
| `fanSpeedName` | enum | silent / low / medium / high / full / auto |
| `swing` | enum | aus / vertikal / horizontal / beides |
| `ecoMode` | Boolescher Wert | Eco-Modus |
| `turboMode` | Boolescher Wert | Turbomodus |
| `sleepMode` | Boolescher Wert | Schlafmodus |
| `purify` | Boolesch | Ionisator / Reinigung |
| `dryClean` | Boolescher Wert | Interner Trockner |
| `frostProtection` | Boolesch | 8 °C Frostschutzheizung |
| `toggleDisplay` | Taste | LED-Innenanzeige ein-/ausschalten |
| `toggleDisplay` | Taste | Schaltet die LED-Innenanzeige ein/aus |

Der `status.*`-Baum zeigt alle vom Gerät gemeldeten Daten an (Innen-/Außentemperatur, Schwenkachsen, Fehlercodes, Timerstatus, Gesamtverbrauch `powerUsage` in kWh usw.).
Der `capabilities.*`-Baum spiegelt die B5-Funktionsantwort wider, sodass Sie Ihre Skripte entsprechend den vom Gerät tatsächlich unterstützten Funktionen verzweigen können.

### Bedienelemente (Luftentfeuchter, 0xA1)
| Steuerung | Typ | Beschreibung |
| ------------------ | ------- | -------------------------------------------- |
| `powerOn` | Boolescher Wert | Gerät ein-/ausschalten |
| `targetHumidity` | Nummer | 0–100 % Zielfeuchtigkeit |
| `fanSpeed` | Nummer | 0–127 (40 stumm, 60 niedrig, 80 hoch, 102 automatisch) |
| `fanSpeedName` | enum | silent / low / medium / high / auto |
| `ionMode` | Boolescher Wert | Ionisator-/Anionenmodus |
| `sleepMode` | Boolescher Wert | Schlafmodus |
| `pumpSwitch` | boolesch | Ablaufpumpe ein/aus |
| `verticalSwing` | Boolescher Wert | Vertikaler Schwenk |
| `tankWarningLevel` | Nummer | Warnschwelle für den Tank (0–100 %) |
| `tankWarningLevel` | Zahl | Warnschwelle für den Tank (0–100 %) |

Der `status.*`-Baum zeigt alle vom Gerät gemeldeten Daten an (Innen-/Außentemperatur, Schwenkachsen, Fehlercodes, Timerstatus, Gesamtverbrauch `powerUsage` in kWh usw.).
Der `capabilities.*`-Baum spiegelt die B5-Funktionsantwort wider, sodass Sie Ihre Skripte entsprechend den vom Gerät tatsächlich unterstützten Funktionen verzweigen können.

## Unterstützte Gerätetypen
Die Abdeckung umfasst alle 36 Midea V3-Gerätetypen, die in [midea-lokal](https://github.com/midea-lan/midea-local) beschrieben sind.

Volle Kontrolle:

- `0xAC` Klimaanlage für Wohngebäude, `0xCC` Klimaanlage für Gewerbebetriebe, `0xA1` Luftentfeuchter, `0xFA` Ventilator,

`0xFC` Luftreiniger, `0xFD` Luftbefeuchter.

- `0xCE` Frischluft, `0xCF` Wärmepumpe, `0xCD` Wärmepumpen-Warmwasserbereiter,

`0xC3` Wärmepumpensteuerung (Zonen, Warmwasser, leise/öko/desinfizieren).

- `0xDA` Toplader-Waschmaschine, `0xDB` Frontlader-Waschmaschine, `0xDC` Trockner.
- `0xE2` elektrischer Warmwasserbereiter, `0xE3` Gas-Warmwasserbereiter, `0xE6` Gaskessel,

`0xFB` Elektroheizung.

- Geschirrspüler `0xE1`, Mikrowelle `0xB0`, Einbaubackofen `0xBF`, Dunstabzugshaube `0xB6`,

`0xB8` Staubsauger, `0xC2` intelligente Toilette, `0xED` Wasserreiniger.

- `0x13`-Leuchte, `0x26`-Badheizung, `0x34`-Badgeschirrspüler,

`0x40` Badezimmerlüfter.

Schreibgeschützte Metadaten (kein `MessageSet` vorgelagert definiert):

- Kühlschrank `0xCA`.
- `0xE8` Schnellkochtopf, `0xEA`/`0xEC` Reiskocher.
- `0xB1` Backofen, `0xB3` Dampfgarer, `0xB4` Backofen-Dampfgarer-Kombination.
- `0xAD` Luftfilterkasten (PM2.5 / VOC-Sensor).

Für jeden steuerbaren Typ werden die beschreibbaren Felder unter `devices.<id>.controls.*` angezeigt; Sensorwerte landen unter `devices.<id>.status.*`.

### Steuerung (Lüfter, 0xFA)
| Steuerung | Typ | Beschreibung |
| ------------------ | ------- | ------------------------------------------------------- |
| `powerOn` | Boolescher Wert | Gerät ein-/ausschalten |
| `mode` | enum | normal / natural / sleep / comfort / silent / baby / … |
| `fanSpeed` | Nummer | 1–26 |
| `oscillate` | Boolescher Wert | Oszillation ein/aus |
| `oscillationMode` | enum | aus / oszillation / neigung / curve-w / curve-8 / beides |
| `oscillationAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 |
| `tiltingAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |
| `tiltingAngle` | enum | off / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40 |

### Bedienelemente (Luftreiniger, 0xFC)
| Steuerung | Typ | Beschreibung |
| ------------------- | ------- | ------------------------------------------------- |
| `powerOn` | Boolescher Wert | Gerät ein-/ausschalten |
| `fanSpeedName` | enum | auto / Standby / niedrig / mittel / hoch |
| `anion` | Boolescher Wert | Anion / Ionisator |
| `childLock` | boolescher Wert | Kindersicherung |
| `screenDisplayName` | enum | hell / gedimmt / aus |
| `detectMode` | enum | off / pm25 / methanal |
| `standby` | Boolescher Wert | Automatischer Standby bei sauberer Luft |
| `standby` | boolescher Wert | Automatischer Standby bei sauberer Luft |

Der Statusbaum zeigt pm25, tvoc, hcho, filter1Life und filter2Life als schreibgeschützte Sensorwerte an.

### Bedienelemente (Luftbefeuchter, 0xFD)
| Steuerung | Typ | Beschreibung |
| ------------------- | ------- | -------------------------------------------------------------------- |
| `powerOn` | Boolescher Wert | Gerät ein-/ausschalten |
| `targetHumidity` | Nummer | 0–100 % Zielfeuchtigkeit |
| `fanSpeedName` | enum | niedrigste / niedrig / mittel / hoch / automatisch / aus |
| `screenDisplayName` | enum | hell / gedimmt / aus |
| `disinfect` | Boolescher Wert | Desinfektionszyklus |
| `desinfizieren` | Boolescher Wert | Desinfektionszyklus |

Der Statusbaum stellt currentHumidity, currentTemperature und tank als schreibgeschützte Sensorwerte zur Verfügung.

## Fehlerbehebung
- **`LAN-Erkennung hat 0 Geräte gefunden`** — Ihr ioBroker-Host befindet sich nicht im Netzwerk

Die Broadcast-Domäne muss mit der des Geräts übereinstimmen, oder UDP 6445 ist durch eine Firewall geschützt.

- **`Token/Schlüssel konnte nicht abgerufen werden für …`** — Das Gerät ist offline in der Cloud

Das Konto oder die Anmeldeinformationen in der Adapterkonfiguration sind falsch.

- **`LanClient: timeout`** — Der AC ist über UDP erreichbar, aber TCP/6444 wird nicht unterstützt.

Die Verbindung ist blockiert, oder ein anderer LAN-Client (z. B. die Smartphone-App) ist bereits verbunden.
Es ist jeweils nur eine TCP-Steuerungssitzung zulässig.

Schalten Sie den Adapter auf Debug-Protokollierung um – jeder Protokollschritt (Cloud-Aufrufe, UDP-Erkennung, TCP-Handshake, verschlüsselte Frames) wird mit Nutzlastgrößen und Geräte-IDs protokolliert, sodass die Implementierung allein anhand der Protokolle diagnostiziert werden kann.

## Changelog

<!-- 
  Placeholder for next versions. Do NOT remove. 
-->
### 1.8.3 (2026-05-25)

-   Adds a NetHome Plus Fallback for ot working devices

### 1.8.1 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 ("value is illegal") by aligning
    the V3 cloud request with the msmart-ng reference: drops the
    `uid:null` and `platformId` body fields, the `Authorization` header,
    switches the `random` header to crypto-random hex and the `stamp`
    to UTC.

### 1.8.0 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 on regional accounts: the V3
    client now follows the cloud's MAS re-route, sends the missing
    auth header, and falls back from LITTLE to BIG udpId.

### 1.7.1 (2026-05-20)

-   Adds a fixture-driven test suite for the unified `_processFrame`
    hook introduced in 1.7.0. Covers all 26 device classes and replays
    two real captures (A1 dehumidifier) so future parser changes break
    loudly. No runtime behaviour change.

### 1.5.0 (2026-05-19)

-   Adds LAN support for V1- and V2-firmware appliances. They are now
    discovered alongside V3 devices and controlled directly over TCP/6444 —
    no cloud token required (V1 only needs the cloud for the device list, V2
    works fully offline).
-   Tested only against V3 hardware; V1/V2 paths are ported from the
    `midea-local` reference implementation. Reports of mis-decoded frames are
    welcome.

### 1.4.0 (2026-05-19)

-   Adds NetHome Plus, Midea Air and Ariston Clima cloud accounts (V3 firmware
    appliances). Pick the cloud variant in the new "Cloud app" setting; the
    default stays MSmartHome.
-   Object tree simplified: devices now appear directly under the instance
    (no `devices.<id>` prefix) and the controls channel is now called
    `control`.
-   On first 1.4.0 start the old object tree is cleared automatically. If you
    want to start fresh later, set `info.migrationV1` to `false` and restart
    the adapter.
-   V1-firmware appliances on the LAN are not supported — they show up in
    the cloud list but never respond to local discovery.

### 1.3.1 (2026-05-19)

-   Controls now stay automatically in sync with the device status across all
    appliance types.
-   Internal refactor — no behavior changes for end users.

### 1.3.0

-   Coverage for all 36 Midea appliance types.
-   Full control for heat pumps, washers and dryer, water heaters, gas boiler,
    electric heater, dishwashers, microwave, oven, range hood, vacuum, smart
    toilet, water purifier, bathroom light/heater/fan and fresh-air.
-   Read-only data for refrigerator, pressure/rice cookers, oven/steamer and
    air-box.

### 1.2.0

-   Full control for fan, air purifier, and humidifier.

### 1.1.0

-   Full control for dehumidifier and commercial AC.
-   Poll interval is now in seconds (default 30 s).

### 1.0.0

-   Breaking change: rewritten on the LAN-first Midea V3 protocol. The cloud is
    only used to fetch each device's token/key.
-   Adds device discovery, local status polling, full AC controls and metadata
    for other appliances.

### 0.0.7

-   Last release of the legacy implementation.

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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