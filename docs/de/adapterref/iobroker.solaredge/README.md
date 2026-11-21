---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solaredge/README.md
title: ioBroker.soledge
hash: AV7QafEOMWoi9lsm6f9H2AJfS02iCQ3ciu5yipRU+HE=
---
![Logo](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![NPM-Version](https://img.shields.io/npm/v/iobroker.solaredge.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solaredge-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solaredge-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)

# ioBroker.soledge

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Solaredge-Adapter für ioBroker

Die Daten werden über die SolarEdge Monitoring API v2 vom SolarEdge-Überwachungsportal abgerufen. Der Adapter liest die aktuelle Leistung und den Energieverbrauch pro Tag/Monat/Jahr/Lebenszeit, optional auch den aktuellen Leistungsfluss (SolarEdge dokumentiert den Leistungsfluss nur für kostenpflichtige Tarife; mit OAuth2 Site Access funktioniert es derzeit auch im kostenlosen Tarif, dies kann sich jedoch ändern).

Sie können auch Modbus auf Ihrem SolarEdge-Gerät aktivieren, sofern es sich um ein neueres Modell handelt, und die Daten direkt auslesen.

### Aufstellen

Die Monitoring-API v1 (API-Schlüssel vom Monitoring-Portal) wurde von SolarEdge am 1. November 2026 abgeschaltet. v1-API-Schlüssel funktionieren nicht mit v2.

**Website-ID:** Bei OAuth2 wird die Website-ID aus der Umleitungs-URL übernommen (`site_id=...`) automatisch. Melden Sie sich mit einem API-Schlüssel unter <https://monitoring.solaredge.com> an. Die Site-ID ist die für Ihre Site angezeigte „ID“, z. B. 12345.

**Website-Zugriff (OAuth2, Hausbesitzer):**

1. Erstellen Sie ein Konto im [SolarEdge-Entwicklerportal](https://developer.solaredge.com/) und erstellen Sie eine Site-Access-Anwendung mit folgendem Umfang: `SITE_DATA` Geben Sie als Umleitungs-URI den in den Instanzeinstellungen angezeigten Wert ein (Standardwert). `https://localhost/` Das Weiterleitungsziel muss nicht existieren. Tipp: Verwenden Sie die Adresse Ihres ioBroker-Adminbereichs (z. B. ioBroker.example.com). `http://192.168.1.10:8081/` Anschließend öffnet der Browser nach der Zugriffsgewährung die Admin-Oberfläche anstelle einer Fehlerseite. Die Umleitungs-URI in der App und in den Instanzeinstellungen muss identisch sein.
2. Geben Sie in den Instanzeinstellungen die Client-ID und das Client-Geheimnis der Anwendung ein und speichern Sie die Einstellungen.
3. Kopieren Sie den in den Instanzeinstellungen angezeigten Autorisierungslink, öffnen Sie ihn in Ihrem Browser, melden Sie sich an und gewähren Sie Zugriff.
4. Der Browser wird zur Umleitungs-URI weitergeleitet (die Seite kann möglicherweise nicht geladen werden). Kopieren Sie die vollständige URL aus der Adressleiste in das Feld „Autorisierungscode oder Umleitungs-URL“ und speichern Sie die Eingabe. Autorisierungscodes sind nur kurze Zeit gültig; die Instanz wird direkt nach dem Speichern gestartet und fordert die Token an.

Die Token werden verschlüsselt gespeichert in `solaredge.X.info.auth` und werden automatisch aktualisiert. Falls die Autorisierung abläuft oder widerrufen wird (Aktualisierungstoken verfallen nach 30 Tagen ohne Nutzung), wiederholen Sie die Schritte 3 und 4.

**Fleet Access (API-Schlüssel, Installateure):** Wählen Sie den Zugriffstyp "Fleet Access" und geben Sie den App-API-Schlüssel ein.

**Guthaben:** Jeder API-Aufruf verbraucht 1 Guthaben Ihres SolarEdge-Entwicklerkontos (kostenloses Kontingent: 2000 Guthaben/Monat, aufgeteilt auf alle Anwendungen des Kontos). Der Adapter ist so konzipiert, dass er deutlich darunter bleibt.

- Standardmäßig erfolgt die Aktualisierung alle 30 Minuten. Instanzen mit dem alten Standardwert (alle 15 Minuten) werden bei der Aktualisierung einmalig geändert.
- 1 Aufruf pro Durchlauf: die heutige Energie in Viertelstunden, die die heutige Energie und die aktuelle Leistung (Durchschnitt der letzten vollen Viertelstunde) angibt.
- 2 Anrufe pro Tag für Monats-, Jahres- und Lebenszeitenergie bis Mitternacht; die heutige Energie wird hinzugerechnet.
- Nachts keine Anrufe (Option „Keine API-Aufrufe nachts“, verwendet den Standort aus den Systemeinstellungen): von 30 Minuten vor Sonnenaufgang bis 1 Stunde nach Sonnenuntergang.

Das entspricht etwa 1200 Anrufen pro Monat im Sommer (Deutschland) und weniger im Winter. Ein 15-Minuten-Takt erfordert im Sommer etwa 2300 Anrufe pro Monat, was das kostenlose Kontingent übersteigt. Die Option „Aktuellen Stromfluss ablesen“ fügt pro Durchlauf einen Anruf hinzu (etwa 2400 Anrufe pro Monat im Sommer bei einem 30-Minuten-Takt). Nutzen Sie daher bei der Stromflussabfrage im kostenlosen Kontingent einen stündlichen Takt.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @92lleo ( <https://github.com/92lleo> ) nicht möglich gewesen, der den Code für die ersten Versionen geschrieben und ihn an ioborker-community-adapters veröffentlicht hat.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
### 2.0.0 (2026-10-16)
- (mcm1957) BREAKING: Adapter has been migrated to SolarEdge Monitoring API v2. A new API key must be generated at https://developer.solaredge.com/ — v1 keys are not valid in v2.
- (mcm1957) BREAKING: The `currentPowerFlow` feature now requires a Business Pro or Enterprise tier subscription at SolarEdge.
- (Garfonso) OAuth2 Site Access (client id/secret of your own SolarEdge app) has been added, Fleet Access API key is optional. See README for setup.
- (Garfonso) Time ranges are now sent in local time and API units are converted correctly.
- (Garfonso) Power flow reads the v2 response; new states for battery power, charge level and grid/battery status. Power flow currently also works on the free tier with OAuth2 Site Access.
- (Garfonso) API calls reduced to about 1 per run and 2 per day, no calls at night. Default schedule is every 30 minutes now, existing instances with every 15 minutes are changed once.
- (Garfonso) Instance settings are responsive for all screen sizes. The OAuth2 setup steps are shown next to the related fields.
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 1.4.1 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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