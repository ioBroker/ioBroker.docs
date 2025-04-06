---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: /fAHrUoAIV+m6YdGp/L2QU9PWPyUeAI5pOafYsMDdcA=
---
![Logo](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Wolf-Smartset-Adapter für ioBroker
Verbinden Sie Ihre Wolf-Heizung mit iobroker.

Dieser Adapter verbindet sich mit dem Wolf Smartset-Server (https://wolf-smartset.com), um Ihr Wolf-Heizgerät zu überwachen und zu verwalten. Dies ist keine lokale Verbindung. Der Vorteil ist, dass Sie die Wolf Smartset-App oder [Wolf Smartset Portal](https://wolf-smartset.com) verwenden und parallel dazu Parameterwerte im ioBroker empfangen oder einstellen können.

## Anforderungen
Sie benötigen ein Wolf Heiz-/Klimagerät mit einem ISM7i WLAN/LAN-Modul (auch bekannt als Link Home), das mit dem Wolf Smartset-Server verbunden ist, sowie ein für Ihr Gerät autorisiertes Wolf Smartset-Konto.

## Adapterinstanzeinstellungen
### Registerkarte: Haupteinstellungen
#### Wolf Smartset-Konto
Um eine Verbindung zum Wolf Smartset Server herzustellen, benötigen Sie Ihre

- `Benutzername` und
- `Passwort`

mit dem Sie sich auch bei der Wolf Smartset App oder dem [Wolf Smartset Portal](https://wolf-smartset.com) anmelden.

#### Wolf-Gerät
Ihr Wolf-Konto ist mit einem oder mehreren Wolf-Geräten verknüpft. Jedes Gerät benötigt eine eigene ioBroker-Adapterinstanz.

Nach der Erstinstallation müssen Sie eine bestimmte

- „Gerät“ für jede Instanz.

Sobald Sie eine gültige `Username` und `Password` eingegeben haben,

- „Liste der Wolf-Geräte“ wird mit den Ihrem Konto zugewiesenen Geräten gefüllt.

Nachdem Sie das Gerät aus der Liste ausgewählt haben, klicken Sie auf

- „DIESES GERÄT VERWENDEN“, um Ihre Auswahl zu bestätigen.

### Registerkarte: Erweiterte Einstellungen
Mit den erweiterten Einstellungen können Sie den Betrieb des Adapters an Ihre Bedürfnisse anpassen. Normalerweise können Sie alle erweiterten Einstellungen auf den Standardeinstellungen belassen.

#### Polling-Zyklus-Intervalle und Parameterlisten
Der Adapter fragt nach der Verbindung mit dem Wolf Smartset-Server regelmäßig Parameterwerte vom Server ab. Er unterstützt zwei unabhängige Abfragezyklen mit unterschiedlichen Zyklusintervallen.

- „Kurzes Abfrageintervall“: Geben Sie das Intervall in Sekunden ein. Der Wolf Smartset Server definiert ein absolutes Mindestabfrageintervall (derzeit 60 Sekunden), das Sie nicht unterschreiten sollten. Wenn Sie einen Wert unterhalb dieses Mindestintervalls konfigurieren, reagiert der Server nicht wie erwartet oder trennt möglicherweise sogar Ihre Sitzung. Der Adapter fragt das aktuelle Mindestabfrageintervall regelmäßig vom Server ab. Liegt das konfigurierte Abfrageintervall unter dem vom Server angegebenen Mindestabfrageintervall, erhalten Sie vom Adapter eine Warnmeldung und sollten Ihr Abfrageintervall entsprechend anpassen.
- „Langes Abfragezyklusintervall“: Geben Sie das Intervall in Minuten für den zweiten Abfragezyklus ein.

Der Wolf Smartset-Server gruppiert die verschiedenen Geräteparameter in verschiedenen Paketen, die durch eine numerische BundleId identifiziert werden. In der __ioBroker Admin__-Benutzeroberfläche finden Sie die BundleIds für die verschiedenen Parametergruppen in der __Object__-Ansicht unterhalb der __wolf-smartset__-Instanz auf Kanalebene.

- `Parameter des Bundles`: In dieser Tabelle können Sie festlegen, welche Parameterwertegruppe in welchem Polling-Zyklus abgefragt werden soll. Es empfiehlt sich:
- `In den kurzen Poll-Zyklus einbeziehen` alle sich schnell ändernden Parameterwerte (z.B. Betriebszustände) und
- `In langen Poll-Zyklus einschließen`, wobei sich Parameterwerte selten ändern (z. B. Gerätekonfigurationsparameter).

Die Wolf Smartset API erfordert, dass jede Polling-Anfrage neben einer Liste der abzufragenden Parameter auch eine BundleId enthält. Es ist nicht ganz klar, wie sich die BundleId auf die eigentliche Parameterliste bezieht, aber in den meisten Fällen sollte „Standard“ ausreichen: Sie entspricht der größten ausgewählten BundleId für den jeweiligen Polling-Zyklus. Alle anderen Einstellungen dienen experimentellen Zwecken. Konfigurieren Sie die zu verwendende BundleId wie folgt:

- `BundleId für kurzen Poll-Zyklus`
- `BundleId für langen Poll-Zyklus`

#### Login exportieren
Die Wolf Smartset API definiert zwei Zugriffsebenen für Geräteparameter: __User__ und __Expert__. Dementsprechend finden Sie in der __Object__-Ansicht der __ioBroker Admin__-Benutzeroberfläche die beiden entsprechenden Unterbäume: __Benutzer__ und __Fachmann__. Nach der ersten Authentifizierung befindet sich der Adapter im Benutzermodus und empfängt während der Initialisierung nur einmal alle verfügbaren Parameterwerte. Danach empfängt er bei regelmäßigen Abfragen nur Aktualisierungen für Parameterwerte auf Benutzerebene (d. h. Werte im __Benutzer__-Baum).

Wenn Sie

- `Experten-Login durchführen` und die korrekte
- „Expertenpasswort“,

Der Adapter führt während der Initialisierung eine Expertenanmeldung durch und empfängt während des Abfragezyklus, dem sie zugeordnet sind, auch regelmäßige Aktualisierungen der Parameterwerte auf Expertenebene (wie im __Fachmann__-Baum angezeigt).

__!!! Wichtiger Hinweis zum Expertenlevel: Start !!!__

Die Expertenstufe scheint sich wie die Büchse der Pandora zu verhalten! Tests zeigten, dass es recht schwierig war, die Expertenstufe zu verlassen, sobald sie aktiviert war. Obwohl der Adapter sich beim Deaktivieren der Einstellung `Do Expert Login` und Neustart der Instanz vollständig abmeldet und alle lokal zwischengespeicherten Authentifizierungsdaten (OpenID-Token und Sitzungs-ID) entfernt, scheint dies für den Wolf Smartset-Server nicht ausreichend zu sein.

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

Obwohl es auf den ersten Blick nicht allzu problematisch erscheint, im Expertenmodus zu bleiben, gibt es mindestens einen Nebeneffekt, der für Sie ein echtes Problem darstellen könnte:

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

Dies betrifft insbesondere folgende ParameterIds und vermutlich auch weitere:

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

Wenn Sie also auf eine konstante und präzise Bereitstellung solcher Vorperiodenstatistikwerte angewiesen sind, sollten Sie zweimal überlegen, ob Sie `Do Expert Login` aktivieren. Beschweren Sie sich nicht, wenn Sie Probleme haben, wieder auf die Benutzerebene zurückzukehren, Sie wurden gewarnt!

__!!! Wichtiger Hinweis zum Expertenlevel: Ende !!!__

#### Auf Änderungen der öffentlichen IP-Adresse prüfen
Der Wolf Smartset-Server erkennt die Client-IP-Adresse. Das bedeutet, dass er einige Anwendungsstatusinformationen mit der öffentlichen IP-Adresse der Client-Anwendung verknüpft. Wenn Sie also `Do Expert Login` konfiguriert haben und sich die öffentliche IP-Adresse des Adapters ändert (z. B. nach einem Router-Neustart), muss sich der Adapter erneut beim Wolf Smartset-Server authentifizieren, um den Expertenmodus wieder zu aktivieren. Da der Adapter nur stündlich eine erneute Authentifizierung durchführt, kann es bis zu __einer Stunde dauern, bis der Adapter wieder im Expertenmodus ist__.

Wenn Ihnen das zu lang ist, können Sie

- „Öffentliche IP-Prüfung aktivieren“: In diesem Fall prüft der Adapter Ihre öffentliche IP-Adresse über [ipify.org](https://ipify.org) __jeden vierten Short Poll Cycle__ und löst bei Änderung eine erneute Authentifizierung aus. Dadurch kehrt der Adapter __spätestens nach 4 Short Poll Cycles__ in den Expertenmodus zurück.

#### API-Profiling
API-Profiling ermöglicht Ihnen die Verfolgung der Wolf Smartset API-Nutzung des Adapters. Wenn Sie

- „API-Profiling aktivieren“, der Adapter aktualisiert für jede Polling-Anforderung die folgenden Objekte im __Adapter-Instanz-Objektbaum__:
- info_api
- poll_req_bundle_id: die in der Poll-Anfrage verwendete BundleId
- poll_req_num_params: die Anzahl der vom Adapter angeforderten Parameter
- poll_resp_num_params: die Anzahl der vom Server zurückgegebenen Parameter
- poll_resp_num_params: die Anzahl der vom Server zurückgegebenen Parameterwerte (zurückgegebene Parameter können einen zugehörigen Wert haben, müssen es aber nicht)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-04-02)
- (flingo64) BREAKING CHANGE: Please reenter your login credentials.
- (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
- (flingo64) A general code cleanup and partial rewrite has been done.
- (flingo64) Trigger re-initalization has been added, if api returns an error (server might be down temporarily).
- (flingo64) Expert login and periodic re-login have been added (#242).
- (flingo64) Support for level 3 objects `time programs` / `party mode` / `vacation mode` has been added.
- (flingo64) Request UserInfo from Wolf server, check whether adapter instance's poll interval meets requirements (60 sec) added.
- (flingo64) ParameterId lists for each Wolf BundleId created and show `BundleIds` for each channel added
- (flingo64) Support for two sepearate poll cycles to avoid server abuse reactions has been added. 
- (flingo64) Switched AdminUI to `jsconConfig`.

### 2.0.0-internal
- (flingo64) further internal changes omitted from news section due to size limitations
  - Demystified (decoded) API constants (array _021a[])
  - All API strings (URL, paths, params) as constants
  - Fixed various typechecker and eslint/prettier warnings
  - Replaced deprecated ioBroker async functions by sync function equivalents
  - Re-ordered and renamed private functions in main.js and admin/wss.js
  - Reorganized adapter initialization / openIdInit for more robust error handling
  - Added openId logout on instance unload to force a fresh AuthN on next adapter start
  - Added API Profiling option to track requested BundleId / # of requested params and # of returned params / # of returned values
  - Migrated translations from words.js to i18n
  - Added complete translation for all adapter instance setting strings
  - Disabled code for caching of auth data to allow a clean re-auth when required by server or on adapter reload
  - Added optional Check for public IP changes for faster Wolf Smartset expert session recovery
  - README: added descriptions on all instance settings and adpater operation

### 1.2.4 (2024-12-22)
- (flingo64) Bugfix for issues #281, #329, #365, #406: ioBroker object limits min/max use Wolf Smartset Min/MaxValueCondition if available, otherwise use Min/MaxValue now.
- (flingo64) Added some comments on Wolf Smartset ControlTypes
- (flingo64) Modified misspelled variable name to 'SubMenuEntry'
- (flingo64) Add NamePrefix, if exists, to object names (e.g. 'A1: ', 'WP001: ') for better parameter identification
- (mcm1957) Adapter has been adapted to @iobroker/eslint-config and eslint 9.x.
- (mcm1957) Dependencies have been updated

### 1.2.3 (2024-04-29)
- (mcm1957) Dependencies have been updated

### 1.2.2 (2024-04-22)
- (flingo64) A crash during re-authentication has been fixed. OpenIdInit will be called only once to avoid endless loop during re-authentication.

### 1.2.1 (2024-04-19)
- (flingo64) Initialization added to openId. This fixes GET_AUTH_TOKEN_ERROR [#304, #330]

### 1.2.0 (2024-04-19)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.1 (2023-01-26)
* (Apollon77) Adjusted to new Login procedure
* (Apollon77) Tokens are now stored and tried to be refreshed automatically
* (Apollon77) Errors in session updates will try to create new session or authenticate anew
* (Apollon77) Generates folder and channel structures for created states
* (Apollon77) Fix some more crash cases
* (Apollon77) make sure adapter is stopped correctly in all cases

### 1.0.0 (2021-07-31)
* (MeisterTR) fix Sentry: IOBROKER-WOLF-SMARTSET-6,IOBROKER-WOLF-SMARTSET-5, IOBROKER-WOLF-SMARTSET-7,IOBROKER-WOLF-SMARTSET-8,IOBROKER-WOLF-SMARTSET-1,IOBROKER-WOLF-SMARTSET-3,IOBROKER-WOLF-SMARTSET-4
* (MeisterTR) Change api from app data to Web PEASE DELETE ADAPTER AND REINSTALL OR DELETE ALL OBJECTS
* (MEISTERTR) added "FACHMANN" states

### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection

### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change

### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 MeisterTR <meistertr.smarthome@gmail.com>

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