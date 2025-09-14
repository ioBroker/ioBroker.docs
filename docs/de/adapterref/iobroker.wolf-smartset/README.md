---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: HnhXfR/SVlPFwpg3YJePcFIBYPTlFqqhrmuu9LtafCQ=
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

Dieser Adapter verbindet sich mit dem Wolf Smartset Server (https://wolf-smartset.com) zur Überwachung und Verwaltung Ihres Wolf-Heizgeräts. Dies ist keine lokale Verbindung. Der Vorteil ist, dass Sie die Wolf Smartset App oder [Wolf Smartset Portal](https://wolf-smartset.com) verwenden und parallel Parameterwerte im ioBroker empfangen oder setzen können.

## Anforderungen
Sie benötigen ein Wolf-Heiz-/Klimagerät mit einem ISM7i-WLAN/LAN-Modul (auch bekannt als Link Home), das mit dem Wolf Smartset-Server verbunden ist, sowie ein für Ihr Gerät autorisiertes Wolf Smartset-Konto.

## Adapterinstanzeinstellungen
### Registerkarte: Haupteinstellungen
#### Wolf Smartset-Konto
Um eine Verbindung zum Wolf Smartset-Server herzustellen, benötigen Sie Ihre

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

#### Polling-Zyklusintervalle und Parameterlisten
Der Adapter fragt – nachdem er eine Verbindung zum Wolf Smartset-Server hergestellt hat – regelmäßig Parameterwerte vom Server ab.

- „Alle Parameter abfragen“: Der Adapter fragt immer alle auf dem Server gefundenen Parameter ab. Diese Abfragestrategie ist abwärtskompatibel mit Adapterversion 1.x

Der Adapter unterstützt auch eine anspruchsvollere Abfragestrategie, die auf zwei unabhängigen Abfragezyklen mit unterschiedlichen Zyklusintervallen basiert.

- „Kurzes Abfrageintervall“: Geben Sie das Intervall in __Sekunden__ ein. Der Wolf Smartset Server definiert ein absolutes Mindestabfrageintervall (derzeit 60 Sekunden), das Sie nicht unterschreiten sollten. Wenn Sie einen Wert unterhalb dieses Mindestintervalls konfigurieren, reagiert der Server nicht wie erwartet oder trennt möglicherweise sogar Ihre Sitzung. Der Adapter fragt das aktuelle Mindestabfrageintervall regelmäßig vom Server ab. Liegt das konfigurierte Abfrageintervall unter dem vom Server angegebenen Mindestabfrageintervall, erhalten Sie vom Adapter eine Warnmeldung und sollten Ihr Abfrageintervall entsprechend anpassen.
- „Langes Abfragezyklusintervall“: Geben Sie das Intervall in __Minuten__ für den zweiten Abfragezyklus ein.

Der Wolf Smartset-Server gruppiert die verschiedenen Geräteparameter in verschiedenen Bundles, die durch eine numerische BundleId identifiziert werden. In der __ioBroker Admin__-Benutzeroberfläche finden Sie die BundleIds für die verschiedenen Parametergruppen in der __Object__-Ansicht unterhalb der __wolf-smartset__-Instanz auf Kanalebene.

- `Parameter des Bundles`: In dieser Tabelle können Sie festlegen, welche Parameterwertegruppe in welchem Polling-Zyklus abgefragt werden soll. Es empfiehlt sich:
- `In den kurzen Abfragezyklus einbeziehen` alle sich schnell ändernden Parameterwerte (z.B. Betriebszustände) und
- `In Long Poll Cycle einschließen`, selten wechselnde Parameterwerte (z. B. Gerätekonfigurationsparameter).

Die Wolf Smartset API erfordert, dass jede Polling-Anfrage neben einer Liste der abzufragenden Parameter auch eine BundleId enthält. Es ist nicht ganz klar, wie sich die BundleId auf die eigentliche Parameterliste bezieht, aber in den meisten Fällen sollte „Standard“ ausreichen: Sie entspricht der größten ausgewählten BundleId für den jeweiligen Polling-Zyklus. Alle anderen Einstellungen dienen experimentellen Zwecken. Konfigurieren Sie die zu verwendende BundleId wie folgt:

- `BundleId für kurzen Poll-Zyklus`
- `BundleId für langen Poll-Zyklus`

Wenn Sie `Poll all Parameters` konfiguriert haben, wird die in den Abfrageanforderungen verwendete BundleId auf 1000 gesetzt. Dadurch werden wahrscheinlich einige Expertenparameter (siehe unten) vom Ergebnis ausgeschlossen. Wenn Sie also Expertenparameter abfragen möchten, sollten Sie `Poll all Parameters` wahrscheinlich nicht verwenden.

#### Experten-Login
Die Wolf Smartset API definiert zwei Zugriffsebenen für Geräteparameter: __User__ und __Expert__. Dementsprechend finden Sie in der __Object__-Ansicht der __ioBroker Admin__-Benutzeroberfläche die beiden entsprechenden Unterbäume: __Benutzer__ und __Fachmann__. Nach der ersten Authentifizierung befindet sich der Adapter im Benutzermodus und erhält nur einmal während der Initialisierung alle verfügbaren Parameterwerte. Danach erhält er bei regelmäßigen Abfragen nur noch Aktualisierungen für Parameterwerte auf Benutzerebene (d. h. Werte im __Benutzer__-Baum).

Wenn Sie

- `Experten-Login durchführen` und die korrekte
- „Expertenpasswort“,

Der Adapter führt während der Initialisierung eine Expertenanmeldung durch und empfängt während des Abfragezyklus, dem sie zugeordnet sind, auch regelmäßige Aktualisierungen der Parameterwerte auf Expertenebene (wie im __Fachmann__-Baum angezeigt).

__!!! Wichtiger Hinweis zum Expertenlevel: Start !!!__

Die Expertenstufe scheint sich wie die Büchse der Pandora zu verhalten! Tests zeigten, dass es ziemlich schwierig war, die Expertenstufe zu verlassen, sobald sie aktiviert war. Obwohl der Adapter sich vollständig abmeldet und alle lokal zwischengespeicherten Authentifizierungsdaten (OpenId-Token und Sitzungs-ID) entfernt, wenn die Einstellung `Do Expert Login` deaktiviert und die Instanz neu gestartet wird, scheint dies für den Wolf Smartset-Server nicht gut genug zu sein.

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

Wenn Sie also auf eine konstante und präzise Bereitstellung solcher Statistikwerte vor der Periode angewiesen sind, sollten Sie zweimal überlegen, ob Sie `Do Expert Login` aktivieren. Beschweren Sie sich nicht, wenn Sie Probleme haben, wieder auf die Benutzerebene zurückzukehren, wurden Sie gewarnt!

__!!! Wichtiger Hinweis zum Expertenlevel: Ende !!!__

#### Auf Änderungen der öffentlichen IP prüfen
Der Wolf Smartset-Server erkennt die Client-IP-Adresse. Das bedeutet, dass er einige Anwendungsstatusinformationen mit der öffentlichen IP-Adresse der Client-Anwendung verknüpft. Wenn Sie also `Do Expert Login` konfiguriert haben und sich die öffentliche IP des Adapters ändert (z. B. nach einem Router-Neustart), muss sich der Adapter erneut beim Wolf Smartset-Server authentifizieren, um den Expertenmodus wieder zu aktivieren. Da der Adapter nur stündlich eine erneute Authentifizierung durchführt, kann es bis zu __einer Stunde dauern, bis der Adapter wieder im Expertenmodus ist__.

Wenn Ihnen das zu lang ist, können Sie

- `Öffentliche IP-Prüfung aktivieren`: In diesem Fall prüft der Adapter Ihre öffentliche IP-Adresse über [ipify.org](https://ipify.org) __jeden vierten Short Poll Cycle__ und löst bei Änderung eine erneute Authentifizierung aus. Auf diese Weise ist der Adapter __spätestens nach 4 Short Poll Cycles__ wieder im Expertenmodus.

#### API-Profiling
API-Profiling ermöglicht Ihnen die Verfolgung der Wolf Smartset API-Nutzung des Adapters. Wenn Sie

- `API-Profiling aktivieren`, der Adapter aktualisiert die folgenden Objekte im __Adapter-Instanz-Objektbaum__ für jede Polling-Anforderung:
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
### **WORK IN PROGRESS**
- (mcm1957) Dependencies have been updated.

### 2.1.2 (2025-08-14)
- (mcm1957) Adapter requires admin 7.6.17 now.
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2025-08-05)
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2025-08-05)
- (flingo64) Change: Log periodic message '_refreshAuthToken(): ERROR ...' with level info
- (flingo64) Bugfix (#458): set instance state to connected only if initialization went fine
- (flingo64) Bugfix: if configured BundleId for poll requests is not available on server, use default BundleId
- (flingo64) Enhancement: option 'Poll all Parameters' implements backward compatible poll strategy
- (flingo64) Enhancement(#459, #465): added more BundleIds (4300, 10000, 10700, 14000, 14700, 15600, 15700, 15800) for AdminUI as found on different Wolf device configurations

### 2.0.1 (2025-04-18)
- (flingo64) Bugfix: fixed various typos in Readme and translations
- (flingo64) Bugfix: Fixed an AdminUI issue (#450 - 'No device selected') when the device information contained line break (e.g. in ContactInformation, Description or Comment )
- (flingo64) Enhancement for AdminUI: support for more than one device in list of devices returned from Wolf Smartset server

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