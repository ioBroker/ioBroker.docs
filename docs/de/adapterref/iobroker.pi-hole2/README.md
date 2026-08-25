---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: HwWYE6ADMhcIgO1IwXByzAU2KYvRt4ReBuACjCGlhbY=
---
# IoBroker.pi-hole2
![Logo](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pi-hole2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pi-hole2-stable.svg)
![nycrc-Konfiguration auf GitHub](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![NPM](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## Pi-hole2-Adapter für ioBroker
Eine Pi-hole-Installation ab Version 6 verwalten.
Informationen von Pi-hole abrufen. Domains blockieren/deaktivieren.

(Für Pi-hole-Versionen unter 6 verwenden Sie bitte den Adapter ioBroker.pi-hole.)

BENUTZUNG AUF EIGENE GEFAHR!!! ABSOLUT KEINE GEWÄHRLEISTUNG FÜR SCHÄDEN USW.!!!

Hilfe oder Hinweise sind willkommen.

Dieser Adapter wurde für Pi-hole V6 auf der Grundlage einer Idee von Michael Schuster <development@unltd-networx.de> neu geschrieben.

## Schritte
1. Installieren Sie den Adapter

2. Füllen Sie die Felder des Adapter-Admins aus. Geben Sie die URL des Pi-hole-Geräts, das Passwort und – obligatorisch – das Aktualisierungsintervall für die Pi-hole-Werte (Statistikaktualisierung in iobroker) ein. Die Eingabe in alle Aktualisierungsfelder ist auf Werte zwischen 1 Sekunde und 86400 Sekunden (24 Stunden) beschränkt.

## Funktionen
### Blockierung aktivieren/deaktivieren
Um die Blockierung zu aktivieren/deaktivieren, verwenden Sie bitte den Schalter in den Datenpunkt-Blockierungseinstellungen. Die Blockierungszeit dient lediglich dazu, die Blockierung zu deaktivieren und sie anschließend automatisch wieder zu aktivieren. Die Aktivierung erfolgt sofort.

### Zusammenfassung der detaillierten Informationen
Einige Daten aus der Zusammenfassung werden in Datenpunkte in Data.Summary extrahiert.

Dies kann in den Konfigurationseinstellungen aktiviert/deaktiviert werden. Die Datenpunkte werden grün/rot hervorgehoben, wenn die Funktion aktiviert/deaktiviert ist.

### Detaillierte Informationen Version
Einige Daten aus der Versionstabelle werden in Datenpunkte in Data.Version extrahiert.
Dies kann in den Konfigurationseinstellungen aktiviert/deaktiviert werden. Die Datenpunkte werden grün/rot hervorgehoben, wenn die Funktion aktiviert/deaktiviert ist.

### Aktuelle Domains pro Kunde
Die optionalen clientseitigen Domänenstatistiken lesen das Pi-hole-Abfrageprotokoll für den aktuellen lokalen Kalendertag. Standardmäßig werden sie stündlich aktualisiert. Clientanfragen werden auf 10 Prozent dieses Aktualisierungsintervalls verteilt, um die Last auf Pi-hole zu reduzieren. Dieser Prozentsatz ist von 0 bis 90 konfigurierbar. Der Adapter berechnet die individuelle Pause anhand der aktuellen Clientanzahl, sodass die Summe aller Pausen das Aktualisierungsintervall niemals überschreiten kann.

Für jeden benannten Pi-hole-Client erzeugt der Adapter zwei JSON-Zustände:

```text
pi-hole2.0.Clients.<clientName>.permitted
pi-hole2.0.Clients.<clientName>.blocked
pi-hole2.0.Clients.<clientName>.QueriesTotal
pi-hole2.0.Clients.<clientName>.QueriesBlocked
```

Jeder Wert ist ein JSON-Array, z. B. `[{"domain":"example.org","count":12}]`. Eine Domain kommt in jedem Array nur einmal vor, und die Einträge sind absteigend nach Häufigkeit sortiert. Zeichen, die in einer ioBroker-Objekt-ID nicht zulässig sind (einschließlich `.` und `#`), werden durch `_` ersetzt. Falls zwei Clientnamen zur gleichen ID führen, trennt ein numerisches Suffix deren Status.

`QueriesTotal` enthält die absolute Anzahl aller für den Client gelesenen Anfragen, während `QueriesBlocked` die absolute Anzahl der blockierten Anfragen enthält. Die Namen folgen der gleichen Konvention wie die detaillierten Zusammenfassungsdatenpunkte.

Die Clientnamen von Pi-hole werden anhand der von den Anfragen zurückgegebenen Clientinformationen ihren IP-Adressen zugeordnet. Ein Client mit Hostnamen behält den anonymisierten Hostnamen als ioBroker-Objekt-ID, während der Anzeigename des Kanalobjekts dessen IP-Adresse enthält. Meldet Pi-hole nur eine IP-Adresse, wird diese anonymisierte IP-Adresse sowohl als Objekt-ID als auch als Anzeigename verwendet.

Die Datenschutzeinstellungen von Pi-hole sowie die Pi-hole-Einstellungen `excludeClients`/`excludeDomains` gelten auch für diese Daten. Der Adapter liest lediglich das Abfrageprotokoll; er ändert weder Zulassungs- noch Sperrlisten.

Die optionale Bereinigung inaktiver Clients wird einmal täglich nach 00:05 Uhr ausgeführt. Dabei wird ein Clientkanal rekursiv gelöscht, wenn sein Kanalobjekt seit Beginn des vorherigen Kalendertages nicht aktualisiert wurde und sein Status `QueriesTotal` `0` lautet. Dies bedeutet, dass am gesamten vorherigen Tag keine Schreibvorgänge stattfanden. Zukünftige Zeitstempel werden nicht als Aktivität gewertet. Neue Clientkanäle werden erst erstellt, nachdem mindestens eine Abfrage für den aktuellen Tag gefunden wurde.

### Allgemeine SendTo-Funktion
Die Funktion `sendTo` dient zum Senden von Befehlen an das Pi-hole-Gerät.

Sie können die API auf Ihrem lokalen Rechner testen.

Gehen Sie zu [http://pihole/api/docs/#](http://pihole/api/docs/#), geben Sie Ihr Passwort ein und klicken Sie auf die Schaltfläche **Anmelden**.

Falls die Domain `pihole` nicht funktioniert, überprüfen Sie bitte den Hostnamen Ihrer Pi-hole-Instanz oben rechts auf der Dashboard-Seite.

#### Beispiel
```javascript
sendTo(
    'pi-hole2.0',
    'piholeapi',
    {
        method: 'GET',
        endpoint: '/history/clients',
        params: {
            N: 20,
        },
    },
    function (data) {
        console.log(data);
    },
);
```

Wenn Sie Zeitstempel als Parameter verwenden möchten, beachten Sie bitte, dass Pi-hole UNIX-Zeitstempel verwendet.

Diese zählen die Sekunden seit dem 1. Januar 1970. Ein JavaScript-Zeitstempel kann durch 1000 geteilt werden:

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## Visualisierung
### Versionen mit Widget-JSON-Vorlage für Vis und Vis2
Das jsontemplate-Widget kann über die folgende Dokumentation installiert werden: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

Geben Sie in der Widget-Konfiguration die folgenden Datenpunkte ein:

```javascript
pi-hole2.0.Version
```

und die folgende Vorlage:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 100px;
    }
    p.pihole .version {
        display: inline-block;
        width: 50px;
    }
</style>
<p class="pihole"><span class="pihole name">core.local:</span><span class="pihole version"><%- data.version.core.local.version %></span></p>
<p class="pihole"><span class="pihole name">core.remote:</span><span class="pihole version"><%- data.version.core.remote.version %></span></p>
<p class="pihole"><span class="pihole name">web.local:</span><span class="pihole version"><%- data.version.web.local.version %></span></p>
<p class="pihole"><span class="pihole name">web.remote:</span><span class="pihole version"><%- data.version.web.remote.version %></span></p>
<p class="pihole"><span  class="pihole name">ftl.local:</span><span class="pihole version"><%- data.version.ftl.local.version %></span></p>
<p class="pihole"><span class="pihole name">ftl.remote:</span><span class="pihole version"><%- data.version.ftl.remote.version %></span></p>

```

### Zusammenfassung mit Widget-JSON-Vorlage für vis und vis2
Das jsontemplate-Widget kann über die folgende Dokumentation installiert werden: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

Geben Sie in der Widget-Konfiguration die folgenden Datenpunkte ein:

```javascript
pi-hole2.0.Summary
```

und die folgende Vorlage:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 150px;
    }
    p.pihole .number {
        display: inline-block;
        width: 70px;
        text-align: right;
    }
</style>
<p class="pihole"><span class="pihole name">queries.total:</span><span class="pihole number"><%- data.queries.total %></span></p>
<p class="pihole"><span class="pihole name">queries.blocked:</span><span class="pihole number"><%- data.queries.blocked %></span></p>
<p class="pihole"><span class="pihole name">clients.active:</span><span class="pihole number"><%- data.clients.active %></span></p>
<p class="pihole"><span class="pihole name">clients.total:</span><span class="pihole number"><%- data.clients.total %></span></p>

```

## Todo Bestehende Funktionen
- ~~login~~
- ~~Intervallzeit~~
- ~~Blockierung aktivieren / deaktivieren~~
- ~~Aktivieren / Deaktivieren des Zeitintervalls~~
- ~~Version~~
- ~~Versionen~~
- ~~Zusammenfassung~~
- Typ
- Zusammenfassung (Rohfassung)? Details unbekannt.
- Top-Artikel? Details unbekannt
- getQuerySources? Details unbekannt
- Überstundendaten 10 Minuten? Details unbekannt
- getForwardDestinations ? Details unbekannt

## Todo Neue Funktionen
- ~~sendTo-Funktionen zum Steuern und Abrufen von Informationen mit Parametern~~

## Nicht implementierte oder geplante Funktionen
- 2FA
- HTTPS-Protokoll (möglich, aber nicht getestet)

## Fehlerbehebung
### WARNUNG: Keine kostenlosen API-Lizenzen verfügbar
Gehen Sie zu Ihrer Pi-hole-Installation und löschen Sie unter **Einstellungen / Webinterface / API / Aktuell aktive Sitzungen** alle Sitzungen mit dem User-Agent iobroker.pi-hole2.
Sie haben den Adapter zu oft neu gestartet, und jedes Mal wird eine neue Sitzung angefordert.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-08-23)

- Optional cleanup of clients if no update took place the previous day and QueriesTotal is 0.
- Unnamed clients with IP addresses have been added. Only clients that have performed at least one DNS query
  during the day are added.

### 1.4.2 (2026-08-22)

- fix pihole session handling

### 1.4.1 (2026-08-21)

- An issue with the Pi-hole API prevented all data from being retrieved; this has been fixed.

### 1.4.0 (2026-08-21)

- Added QueriesTotal and QueriesBlocked as counts per client.
- move coverage dir to docs/coverage.
- fix setTimeout and setObject

### 1.3.0 (2026-08-20)

- Added configurable per-client daily domain statistics for permitted and blocked queries, including safe request distribution and JSON datapoints
  sorted by query count.

### 1.2.0 (2026-06-10)

- fix errors
- add test and coverage
- improve and harden error handling

### 1.1.1 (2025-07-25)

- fix translation

### 1.1.0 (2025-07-24)

- add update indicators for different pihole components in the Data/Versions datapoints

### 1.0.0 (2025-07-16)

- If the adapter was already installed, please remove all existing data points of the adapter and restart the adapter.
- first beta channel release

### 0.4.2 (2025-07-16)

- set rejectUnauthorized to false
- remove some double jsdoc blocks
- fixed comments from adapter review

    remove unload event, create datapoint "Data", adjust state roles, check and limit refresh input parameters, fix roles

### 0.4.1 (2025-06-27)

- fix repochecker issues
- update packages
- remove history datapoint
- add jsdoc
- fix Blockingtime enabling
- fix datapoint coloring

### 0.4.0 (2025-06-25)

- Make extraction of detail values ​​for version/summary deactivatable

### 0.3.0 (2025-06-25)

- add translation files
- rework refresh logic aligned with pihole
- encrypt password (Password must be entered again )
- add detailed datapoints for Summary and Version for selected data

### 0.2.3 (2025-06-25)

- small documentation bugfix
- adjust user agent and add trouble shooting info
- add visualization example for versions
- add visualization example for summary

### 0.2.2 (2025-06-24)

- fix github action file

### 0.2.1 (2025-06-24)

- enable NPM deploy

### 0.2.0 (2025-06-24)

- (oweitman) first npm release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

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