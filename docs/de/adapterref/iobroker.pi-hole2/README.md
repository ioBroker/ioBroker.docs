---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: dC/XCoMH5f/nSE0e0yLWYEOwmiduSLjsIHPM0wcq25Q=
---
# IoBroker.pi-hole2
![Logo](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pi-hole2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pi-hole2-stable.svg)
![nycrc-Konfiguration auf GitHub](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![NPM](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## Pi-hole2-Adapter für ioBroker
Verwalten Sie eine Pi-Hole-Installation >=v6.
Informationen von Pi-Hole abrufen.
Blockieren von Domänen starten/stoppen.
(Für Pi-Hole <v6 verwenden Sie bitte den Adapter ioBroker.pi-hole.)

VERWENDUNG AUF EIGENE GEFAHR!!! KEINE GARANTIE FÜR SCHÄDEN USW.!!!

Hilfe oder Hinweise sind willkommen.

Dieser Adapter wurde basierend auf einer Idee von Michael Schuster <development@unltd-networx.de> für Pi-Hole V6 neu geschrieben.

## Schritte
1. Installieren Sie den Adapter

2. Füllen Sie die Felder des Adapter-Admins aus. Geben Sie die URL des Pi-Hole-Geräts, das Passwort und obligatorisch das Intervall zur Aktualisierung der Werte des Pi-Hole-Geräts (Statistik im iobroker aktualisieren) ein. Eingaben in allen Aktualisierungsfeldern sind nur zwischen 1 Sekunde und 86400 Sekunden (24h) möglich.

## Funktionen
### Aktivieren/Deaktivieren der Blockierung
Um die Sperre zu aktivieren/deaktivieren, verwenden Sie bitte den Schalter im Datenpunkt Sperrung. Die Sperrzeit dient nur zum Deaktivieren der Sperre, um sie anschließend automatisch wieder zu aktivieren. Die Aktivierung erfolgt sofort.

### Detaillierte Informationen Zusammenfassung
Einige Daten aus der Zusammenfassung werden in Datenpunkte in Data.Summary extrahiert.
Dies kann in der Konfiguration aktiviert/deaktiviert werden.
Die Datenpunkte werden grün/rot hervorgehoben, wenn die Funktion aktiviert/deaktiviert ist.

### Detaillierte Informationen Version
Einige Daten aus der Version werden in Datenpunkte in Data.Version extrahiert.
Dies kann in der Konfiguration aktiviert/deaktiviert werden.
Die Datenpunkte werden grün/rot hervorgehoben, wenn die Funktion aktiviert/deaktiviert ist.

### Allgemeine SendTo-Funktion
Die Funktion „sendTo“ dient zum Senden von Befehlen an das Pi-Hole-Gerät.
Sie können die API auf Ihrem lokalen Rechner testen.
Gehen Sie zu [http://pihole/api/docs/#](http://pihole/api/docs/#), geben Sie Ihr Passwort ein und klicken Sie auf die Schaltfläche **Anmelden**.
Wenn die Domäne `pihole` nicht funktioniert, überprüfen Sie bitte den Hostnamen Ihrer Pi-Hole-Instanz oben rechts auf der Dashboard-Seite.

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

Wenn Sie Zeitstempel als Parameter verwenden möchten, beachten Sie bitte, dass Pi-Hole UNIX-Zeitstempel verwendet.
Diese zählen die Sekunden seit dem 1. Januar 1970. Ein JavaScript-Zeitstempel kann durch 1000 geteilt werden:

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## Visualisierung
### Versionen mit Widget-JSON-Template für vis und vis2
Das jsontemplate-Widget kann über die folgende Dokumentation installiert werden: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

Geben Sie in der Widget-Konfiguration den folgenden Datenpunkt ein:

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

Geben Sie in der Widget-Konfiguration den folgenden Datenpunkt ein:

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

## Todo Vorhandene Funktionen
- ~~Anmelden~~
- ~~Intervallzeit~~
- ~~Sperre aktivieren / deaktivieren~~
- ~~Zeitintervall aktivieren / deaktivieren~~
- ~~Version~~
- ~~Versionen~~
- ~~Zusammenfassung~~
- Typ
- ZusammenfassungRoh? Details sind mir nicht bekannt
- TopItems? Details nicht bekannt
- getQuerySources? Details nicht bekannt
- overTimeData10mins? Details sind mir nicht bekannt
- getForwardDestinations? Details sind mir nicht bekannt

## Todo Neue Funktionen
- ~~sendTo-Funktionen zum Steuern und Abrufen von Informationen mit Parametern~~

## Nicht implementierte oder geplante Funktionen
2FA
- https-Protokoll (möglich, aber nicht getestet)

## Fehlerbehebung
### WARNUNG: Keine freien API-Plätze verfügbar
Gehen Sie zu Ihrer Pi-Hole-Installation und löschen Sie unter **Einstellungen / Webinterface / API / Aktuell aktive Sitzungen** alle Sitzungen mit dem User Agent iobroker.pi-hole2.
Sie haben den Adapter zu oft neu gestartet und jedes Mal wird eine neue Sitzung angefordert.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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