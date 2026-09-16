---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/API.md
title: SAX Power Cloud API
hash: yFve5lLgf78ROSCg5ouh5VRTCfQKg0SvjnHK7v4+NNA=
---
# SAX Power Cloud API

## Umfang

Dieses Dokument beschreibt die vom Adapter verwendeten Cloud-Aufrufe. Die API ist hier nicht als öffentlicher oder stabiler Drittanbietervertrag dokumentiert. Das Verhalten der Endpunkte kann sich ohne Vorankündigung ändern.

Der Adapter nutzt die API ausschließlich zum Abrufen von Lesedaten.

## Standard-API-Basis-URL

```text
https://webserver.sax-power.net
```

Die Basis-URL ist in der Adapterinstanz konfigurierbar.

## Authentifizierung

### Token-Anforderung

```http
POST /api/auth/token/
```

Die Anfrage authentifiziert sich mit dem konfigurierten SAX Power-Benutzernamen bzw. der E-Mail-Adresse und dem Passwort.

Das zurückgegebene Bearer-Token wird im Speicher gehalten und nicht in den ioBroker-Zuständen gespeichert oder in Protokolle geschrieben.

## Live-Daten

```http
GET /api/auth/data/
```

Dieser Endpunkt gibt die dem Konto zugewiesenen Speichergeräte und deren aktuelle Werte zurück.

Der Adapter verwendet die Antwort für:

- Geräteerkennung
- Geräteinformationen
- Batterielebensdauerwerte
- Live-Werte des Stromnetzes
- optionale PV-Werte
- Anklagepunkt

Nicht jede Installation liefert alle möglichen Felder. Fehlende Werte werden als nicht verfügbar dargestellt, anstatt durch Null ersetzt zu werden.

## Historisches Energiediagramm

```http
GET /api/auth/energy_chart/
```

Der Adapter fordert unterstützte Zeiträume für eine ausgewählte Speicherseriennummer an.

Zu den validierten Periodenformaten gehören:

```text
week_YYYY-MM-DD
month_YYYY-MM-DD
year_YYYY-MM-DD
total_YYYY-MM-DD
```

Der SAX Power-Dienst verwendet möglicherweise ein anderes Parameterformat für tägliche Chartdaten. In Version 1.0 werden die heutigen Werte aus der aktuellen monatlichen Antwort abgeleitet.

## Historische Felder

Zu den beobachteten historischen Reaktionen können gehören:

- `m2`
- `m2N`
- `m4`
- `m5`
- `m5N`
- `total_m2`
- `total_m2N`
- `total_m4`
- `total_m5`
- `total_m5N`
- `de_time`
- `me_time`
- `year`

Der Adapterparser ordnet die relevanten Batterieenergiewerte folgenden Werten zu:

- geladene Energie
- freigesetzte Energie

Die Rohdaten der Cloud-Feldnamen werden absichtlich nicht als öffentlicher ioBroker-Objektvertrag offengelegt.

## Richtlinie für Anfragen

Version 1.0 funktioniert nur:

- Authentifizierungsanfragen
- Live-Daten lesen
- Historische Energiediagramme

Es funktioniert nicht:

- `PUT`
- `PATCH`
- `DELETE`
- Änderungen der Cloud-Konfiguration
- Steuerbefehle
- Modbus schreibt

## Umfragepolitik

Das minimale Abfrageintervall für die Cloud beträgt 60 Sekunden.

Das Live-Dashboard aktualisiert die ioBroker-Zustände unabhängig und erhöht nicht die SAX Power Cloud-Anforderungsrate.

## Fehlerbehandlung

Der Adapter behandelt die folgenden Fälle als unterschiedliche Fehler:

- DNS- oder Netzwerkfehler
- HTTP-Fehler
- Authentifizierungsfehler
- ungültige Antwortform
- fehlende Gerätedaten
- nicht verfügbares optionales Feld

Passwörter und Tokens werden von der Diagnoseausgabe ausgeschlossen.