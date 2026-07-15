---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: cZy9mvENELEPraB4OeA9M82LjH4f5jvYy2a4xQAigak=
---
![Logo](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## Vw-connect-Adapter für ioBroker
Adapter für VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect und We Connect Go

Bitte aktualisieren Sie Ihr System auf Node 10.

<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Kurzfassung (Stand Juni 2026)
VW hat den klassischen App-Login für **VW ID, CUPRA und SEAT** abgeschaltet. Für diese Marken funktionieren nur noch zwei Wege – beide unten konfigurierbar, lassen sich auch parallel laufen:

- **EU Data Act Portal** — kostenlos, läuft automatisch nach einmaliger Browser-Aktivierung im Portal, liefert ein detailliertes Datenpaket aber **nur alle 15 Minuten** und ist in der Praxis **unzuverlässig**: das Auto liefert nur Daten, wenn es gerade aktiv ist (fahren, laden, Klima), parkende Autos erzeugen leere Datensätze. Außerdem hat das Portal selbst noch 5xx-Aussetzer.
- **Tibber Data API (empfohlen)** — kostenlos, **liefert aktuelle Werte** (SoC, Reichweite, Lade-Status). **Man muss keine Tibber-Stromkunde sein**, nur einen Tibber-Account in der App anlegen. Beim Anlegen verlangt die App eine deutsche Adresse – die muss **nicht korrekt sein**, irgendeine plausible Straße/PLZ reicht. Dann das Fahrzeug in der App verbinden und einen OAuth-Client unter <https://data-api.tibber.com/clients/manage> registrieren (Details in der Adapter-UI).

Für die anderen Marken (Audi, MyŠKODA, Seat Elli, ŠKODA Powerpass, Audi DataPlug, ŠKODA Alt, VW Connect Go) funktioniert der klassische Login weiterhin.

## VW-ID: Das EU-Datenschutzportal ist seit dem 1. Juni 2026 die einzige Datenquelle.
VW hat den klassischen VW-ID OAuth-Client (`a24fba63-...`) am **1. Juni 2026** eingestellt. Der IdP unter `identity.vwgroup.io/oidc/v1/authorize` gibt für diesen Client den HTTP-Statuscode 403 mit einer Auth0-Fehlerseite („Tenant-Fehlkonfiguration“) zurück; der BFF-Mirror unter `emea.bff.cariad.digital/auth/v1/idk/oidc/authorize` verhält sich genauso. Andere Markenclients (Audi `cc29b87a-...`, Skoda `3ea88bf9-...`, Seat/Cupra `f85e5b69-...`, VW Pkw EU-Datenschutzgesetz `9b58543e-...`) sind davon nicht betroffen.

Für `config.type === "id"` überspringt der Adapter nun vollständig die klassische Anmeldung und nutzt stattdessen die **Tibber Data API (empfohlen)** oder das EU-Datenschutzportal. **Sie MÜSSEN mindestens eine dieser Optionen einrichten, andernfalls findet kein Datenaustausch statt.** Siehe die Abschnitte „Tibber Data API“ und „EU-Datenschutzportal“ weiter unten.

## Cupra / SEAT: Klassische Anmeldung deaktiviert (seit 10.06.2026)
Das Cupra/SEAT OLA-Backend (`ola.prod.code.seat.cloud.vwgroup.com`) erzwingt seit etwa Juni 2026 **Firebase App Check** mit dem **Play Integrity**-Provider. Jeder API-Aufruf benötigt nun einen `X-Firebase-AppCheck`-Header. Die dekompilierte MyCupra 2.18.0 APK bestätigt: Ein OkHttp-Interceptor (`es.seat.ola.attestation.interceptor.AppCheckInterceptor`, Firebase-Projekt `ola-apps-prod`, App-ID `1:530284123617:android:9b9ba5a87c7ffd37fbeea0`) fügt das Token automatisch hinzu. Ohne dieses Token gibt der Server `403 Forbidden device detected, missing-device-token` zurück.

Play Integrity-Token werden von **Google Play-Diensten auf einem echten Android-Gerät** mit dem registrierten APK-Signaturzertifikat SHA-256 generiert. Ein Node.js-Adapter kann diese nicht erzeugen – es gibt keine dokumentierte Umgehungsmöglichkeit.

Für `config.type === "seatcupra"` und `"seat"` überspringt der Adapter nun die klassische Anmeldung. **Verwenden Sie stattdessen die Tibber Data API (empfohlen) oder das EU-Datenschutzportal** – beide funktionieren weiterhin für Fahrzeuge von Cupra und SEAT. Siehe die folgenden Abschnitte.

## Optional: EU-Datenschutzportal als zusätzliche Datenquelle (seit Version 0.9.0)
Für alle Marken des VW-Konzerns (VW, Audi, Škoda, Seat, Cupra) kann der Adapter **zusätzlich** die kontinuierlichen 15-Minuten-Datensätze nutzen, die VW über das EU-Datenschutzportal unter <https://eu-data-act.drivesomethinggreater.com> veröffentlicht. Dies ist **optional** – die klassische markenspezifische Anmeldung ist die primäre Datenquelle und funktioniert eigenständig. Der EU-Datenschutzpfad fügt pro Datensatz einige hundert zusätzliche Datenpunkte hinzu (hauptsächlich Diagnose-, Konfigurations- und Berichtsfelder) unter `<vin>.statuseudata.*` (mit Punktnotation in Snake Case, z. B. `battery_state_report.soc`, `mileage.value`, `parking_brake`, `charging_state_report.current_charge_state`).

Das Portal dient allen Marken – nur der OIDC-Markenschlüssel ist unterschiedlich. Der Adapter wählt den richtigen anhand Ihrer konfigurierten `type` aus:

| Adapter `type` | EU-Datenschutzgesetz-Marke |
| `VW ID / Volkswagen App` | `VOLKSWAGEN_PASSENGER_CARS` |
| `Audi E-tron`, `Audi DataPlug` | `AUDI` |
| `MyŠKODA`, `ŠKODA Alt` | `SKODA` |
| `My SEAT` | `SEAT` |
| `My CUPRA` | `CUPRA` |
| „Mein CUPRA“ | „CUPRA“ |

Um dies zu aktivieren, müssen Sie **einmalig** eine kontinuierliche Datenanfrage im Browser einrichten. Der Adapter lädt lediglich die vom Portal erzeugten Daten herunter; er kann die Anfrage nicht automatisch erstellen. Wenn Sie diesen Schritt überspringen, funktioniert der Adapter weiterhin einwandfrei; die EU-Datenschutz-Richtlinien bleiben im Protokoll jedoch unverändert.

### Datenanfrage einrichten (einmalig, im Browser)
1. Öffnen Sie <https://eu-data-act.drivesomethinggreater.com/> und **melden Sie sich mit Ihrem markenspezifischen Konto an** (die gleiche E-Mail-Adresse/das gleiche Passwort, die/das Sie in der Volkswagen / myAudi / MyŠKODA / SEAT Connect / MyCUPRA App und in den Einstellungen dieses Adapters verwenden).
2. Gehen Sie zu **Datencluster → Fahrzeugübersicht**.
3. Klicken Sie auf **Verbinden Sie Ihr Auto**, falls Ihre Fahrzeugidentifikationsnummer (VIN) noch nicht aufgeführt ist, und folgen Sie den Anweisungen auf dem Bildschirm zur Kopplung/Zustimmung.
4. Klicken Sie auf **Benutzerdefinierte Daten anfragen**. Hinweis vom Portal: Es kann immer nur eine benutzerdefinierte Datenanfrage gleichzeitig aktiv sein.
5. **Vereinbarung gemäß Artikel 4 EU Data Act** ankreuzen („Ich bestätige, dass ich die Vereinbarung gemäß Artikel 4 EU Data Act gelesen und akzeptiert habe.“) → **Weiter**.
6. **Datencluster auswählen**: **Alle Daten** anhaken („Alle für das EU-Datengesetz relevanten Datenpunkte“). Andere Cluster nur, wenn Sie gezielt einschränken möchten – wenn Sie nur einige auswählen, wird der Inhalt von „<vin>.statuseudata.*“ eingeschränkt.
7. **Name des Datenpakets** vergeben (frei wählbar, z.B. „ioBroker“). Erscheint später als `_dataset_name`-Präfix in den Dateinamen.
8. **Frequenz wählen**: **Alle 15 Minuten**. Andere Optionen (täglich) liefern nicht genug Auflösung für Live-Werte.
9. **Dauer**: **Kein Enddatum** (fortlaufend ohne Enddatum).
10. Anfrage absenden. Datensätze erscheinen in der Regel **15 Minuten bis einige Stunden** später. Die erste Datenmenge wird möglicherweise als `*_no_content_found.zip` angezeigt, bis Ihr Fahrzeug aktiv ist. Durch erzwungene Synchronisierung über die Volkswagen App oder während der Fahrt wird die Herstellerseite aktiviert.

Der Adapter verarbeitet die Anfrage automatisch – keine zusätzlichen Einstellungen in ioBroker erforderlich. Solange `type` gleich `VW ID / Volkswagen App` ist und Ihre Zugangsdaten mit dem Portal übereinstimmen, fragt er die Liste jede Minute ab und lädt nur dann eine neue ZIP-Datei herunter, wenn diese verfügbar ist.

Objektbaum pro Fahrzeugidentifikationsnummer (VIN), sobald die EU-Datenschutzgesetzgebung aktiviert ist:

```text
<vin>.general.vin
<vin>.general.nickname
<vin>.general.licensePlate
<vin>.general.imageLocation
<vin>.statuseudata.battery_state_report.soc          (= 58 %)
<vin>.statuseudata.battery_state_report.charge_power (= 0.0 kW)
<vin>.statuseudata.charging_state_report.current_charge_state
<vin>.statuseudata.mileage.value
<vin>.statuseudata.parking_brake
<vin>.statuseudata.locked
<vin>.statuseudata._dataset_name
<vin>.statuseudata._dataset_created_on
... and many more (depending on the Data Clusters you ticked on the portal)
```

### Fehlerbehebung (nur EU-Datenschutzgesetz – diese blockieren niemals den klassischen Datenfluss)
- **`EU-Datenschutzgesetz ... keine Datenanfrage konfiguriert`: Sie haben die oben beschriebenen portalseitigen Einstellungen nicht vorgenommen. Die klassische Anmeldung funktioniert vorerst weiterhin.
- **Das Portal hat N Datensätze, aber alle sind '_no_content_found':** Das Fahrzeug befand sich während jedes Messzeitpunkts im Ruhemodus. Synchronisieren Sie das Fahrzeug über die VW-App oder fahren Sie einfach einmal.
- **`<vin>.statuseudata` Kanal fehlt**: Das Portal verfügt noch über keine Inhaltsdatensätze — gleiche Lösung wie oben.
- **HTTP 400 direkt nach der Aktivierung**: Das Portal verarbeitet noch Ihre Datenanfrage. Das Problem behebt sich nach einigen Stunden von selbst.
- **Veraltete Werte**: Das Portal führt mehrere Berichts-Snapshots pro Datensatz zu einem flachen Array zusammen. Wenn dasselbe Feld mehrfach mit unterschiedlichen Werten vorkommt, wählt der Adapter deterministisch den Eintrag mit der kleinsten UUID aus (stabil über Aktualisierungen hinweg – gleiches Vorgehen wie bei der Home Assistant-Integration).
- **Referenzimplementierung** (Home Assistant, Python): <https://github.com/mikrohard/hass-vw-eu-data-act>

## Verwendung
Nutzen Sie den Status unter „Fernsteuerung“, um Ihr Fahrzeug fernzusteuern. Das normale Aktualisierungsintervall ist das Abfrageintervall für Daten aus der VAG Cloud. Die erzwungene Aktualisierung wird für Fahrzeuge ohne Elektroantrieb aktiviert. Dieses Intervall ist von VAG begrenzt, bis das Fahrzeug wieder eingeschaltet wird. Fahrtdaten sind nur für Fahrzeuge ohne Elektroantrieb verfügbar.

Die Klimatisierungstemperatur kann in .climater.settings.targetTemperature.content eingestellt werden.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## Erläuterung der Statusfelder
### Liste der Einträge
```

```

### 0.9.6 (2026-06-27)
- Verbesserung der EU-Datenanalyse

### 0.9.5 (2026-06-13)
- Cupra-App-Login deaktiviert

### 0.9.4 (2026-06-06)
- Tibber-Unterstützung hinzufügen

### 0.9.3 (2026-05-31)
- Verbesserung des EU-Datenabrufs

### 0.9.2 (2026-05-31)
- EU-Datenabrufunterstützung für Seat, Skoda und Audi hinzugefügt
- Verbesserung des EU-Datenabrufs

### 0.9.1 (2026-05-30)
- Normales Login für VW und Audi behoben
- optionalen Datenfluss des EU-Datenschutzportals hinzufügen

### 0.8.8 (2026-05-28)
- Audi- und VW-Login-Probleme beheben

### 0.8.7 (2026-05-27)
- Audi-Login reparieren

### 0.8.6 (2026-05-27)
- Problem mit der ID-Anmeldung beheben

### 0.8.5 (2026-05-24)
- Cupra reparieren

### 0.8.4 (2026-05-14)
- Skoda MQTT deaktivieren

### 0.8.3 (2026-05-10)
- Skoda MQTT reparieren

### 0.8.1 (2026-05-06)
- Skoda MQTT reparieren

### 0.8.0 (13.04.2026)
- Reparatur für Seat Cupra

### 0.7.16 (2026-03-18)
- Myskoda MQTT-Verbindung reparieren

### 0.7.15 (2025-11-26)
- VW-Refresh-Token reparieren

### 0.7.14 (2025-11-25)
- VW-ID-Anmeldung reparieren

### 0.7.13 (2025-11-09)
- Problem mit dem Skoda-Login behoben

### 0.7.12 (2025-05-05)
- Behebung des Problems mit dem Skoda-Refresh-Token
- Behebung des Problems mit der Lüftungsaktivierung
- neue, nicht unterstützte Endpunkte hinzufügen

### 0.7.9 (2025-03-20)
- Reparatur für das ID-Wandladegerät

### 0.7.7 (2025-03-02)
- Behebung des Problems mit der Standheizung und deren Dauer beim Skoda
- Behebung des Problems mit der Skoda-Sperre/Entriegelung

### 0.7.6 (2025-02-28)
- Behebung des Problems, dass der Ladestatus nur beim Start aktualisiert wird
- Behebung des Problems mit dem Zustand "Skoda bewegt sich"

### 0.7.3 (2025-02-26)
- Fehlerbehebung für set setTemperature
- Lösung für das Entriegelungsproblem bei Skoda

### 0.7.0 (2025-02-25)
- Lösung für Skoda und Seat
Die Zustandsstruktur wurde vollständig geändert. Bitte löschen Sie die alten Zustände unter „Objekte“.

### 0.6.1 (2024-10-01)
- Problem mit dem Skoda-Login behoben

### 0.6.0 (11.04.2024)
- zusätzliche Cupra-Zustände hinzufügen

### 0.5.4 (2024-03-17)
- Tür- und Fensterzustände reparieren

### 0.4.1
- VW-Statusaktualisierung beheben

### 0.0.65
- Cupra-Login reparieren

### 0.0.63
- VW/Skoda e-tron-Anmeldeproblem behoben

### 0.0.62
- Audi e-tron-Anmeldeproblem beheben

### 0.0.61
- ID-Anmeldung reparieren

### 0.0.60
Kleinere Verbesserungen. Das minimale Ladeintervall von WeCharge beträgt jetzt 15 Minuten.

### 0.0.55
- Fehlerbehebung bei der Aktualisierung des ID-Status

### 0.0.51
- Audi e-tron-Anmeldung reparieren

### 0.0.48
- Login-Probleme behoben, Audi-Update-Problem behoben, Limit für Wallbox hinzugefügt

### 0.0.43
- Erhöhung der Timeouts für Refresh-Token

### 0.0.42
- Skoda-Anmeldeproblem beheben

### 0.0.40
- Klimatisierungsversion 3 für neuere Fahrzeuge hinzufügen. Powerpass und Seat Elli hinzufügen.

### 0.0.39
- Problem mit der ID-Anmeldung beheben

### 0.0.36
- Skoda Enyaq-Unterstützung hinzufügen

### 0.0.35
- Kompatibilität mit NodeJS v10 hinzufügen

### 0.0.34
- Automatische Annahme neuer Datenschutzeinwilligungen hinzufügen

### 0.0.32
- korrekte Auswahl der letzten Reisen

### 0.0.31
- Mehrfachauswahl von Reisearten ermöglichen

### 0.0.30
- Problem mit mehreren Fahrzeugen behoben, VWv2-Modus hinzugefügt; derzeit gibt es keinen Unterschied zwischen VW und VWv2

### 0.0.29
- Skoda-RefreshToken-Problem behoben, kleinere Verbesserungen

### 0.0.26
- Fehlerbehebungen

### 0.0.25
- Wir berechnen zusätzlich Gebühren

### 0.0.24
- Hinzufügen einer Remote-Statusaktualisierung

### 0.0.23
- Sitz hinzugefügt und neue Klimatisierung v2

### 0.0.22
- Außentemperatur in °C auch für Skoda und Audi berechnen

### 0.0.21
- Remotes für ID hinzufügen

### 0.0.20
- Audi-Login reparieren, ID-Login hinzufügen

### 0.0.19
- Speichern von Statusobjekten im Status anhand ihrer ID anstatt anhand fortlaufender Nummern

### 0.0.18
- Behebung des Problems mit dem Akkustatus bei Modellen aus dem Jahr 2020

### 0.0.17
- Unterstützung für 2020er Modelle hinzufügen

### 0.0.16
- Behebung der 3 Probleme mit js.controller

### 0.0.11
- Audi-Fehler bei mehreren Fahrzeugen behoben
- Statusaktualisierungsfehler ausblenden, falls die Funktion nicht verfügbar ist

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

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