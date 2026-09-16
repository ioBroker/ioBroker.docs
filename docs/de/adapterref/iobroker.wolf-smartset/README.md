---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: TCQcEbkT+dh0CSgRwx3z9y3is6KyOiewdftW3kXqibk=
---
![Logo](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# ioBroker.wolf-smartset

## wolf-smartset-Adapter für ioBroker

Verbinden Sie Ihre Wolf-Heizung mit iobroker.

Dieser Adapter verbindet sich mit dem Wolf Smartset-Server ( <https://wolf-smartset.com> ), um Ihr Wolf-Heizgerät zu überwachen und zu steuern. Es handelt sich nicht um eine lokale Verbindung. Der Vorteil: Sie können die Wolf Smartset-App oder [das Wolf Smartset-Portal](https://wolf-smartset.com) nutzen und gleichzeitig Parameterwerte in ioBroker empfangen oder festlegen.

## Anforderungen

Sie benötigen ein Heizungs-/Klimagerät von Wolf, das mit einem ISM7i WLAN/LAN-Modul (auch bekannt als Link Home) ausgestattet ist, das mit dem Wolf Smartset-Server verbunden ist, sowie ein für Ihr Gerät autorisiertes Wolf Smartset-Konto.

## Adapterinstanzeinstellungen

### Registerkarte: Haupteinstellungen

#### Wolf Smartset-Konto

Um eine Verbindung zum Wolf Smartset-Server herzustellen, benötigen Sie Folgendes:

- `Username` Und
- `Password`

mit denen Sie sich auch bei der Wolf Smartset App oder dem [Wolf Smartset Portal](https://wolf-smartset.com) anmelden können.

#### Wolf Device

Ihr Wolf-Konto ist mit einem oder mehreren Wolf-Geräten verknüpft. Jedes Gerät benötigt eine eigene ioBroker-Adapterinstanz.

Nach der Erstinstallation müssen Sie eine bestimmte Option auswählen.

- `Device` für jeden einzelnen Fall.

Sobald Sie einen gültigen Wert eingegeben haben`Username` Und`Password` Die

- `List of Wolf Devices` wird mit den Ihrem Konto zugewiesenen Geräten gefüllt.

Nachdem Sie das Gerät aus der Liste ausgewählt haben, klicken Sie auf

- `USE THIS DEVICE` um Ihre Auswahl zu bestätigen.

### Registerkarte: Erweiterte Einstellungen

Die erweiterten Einstellungen ermöglichen es Ihnen, die Funktionsweise des Adapters an Ihre Bedürfnisse anzupassen. Normalerweise können Sie alle erweiterten Einstellungen auf den Standardwerten belassen.

#### Abfragezyklusintervalle und Parameterlisten

Der Adapter wird – nach der Verbindung mit dem Wolf Smartset-Server – regelmäßig Parameterwerte vom Server abfragen.

- `Poll all Parameters` Der Adapter fragt stets alle auf dem Server verfügbaren Parameter ab. Diese Abfragestrategie ist abwärtskompatibel mit Adapterversion 1.x.

Der Adapter unterstützt außerdem eine ausgefeiltere Abfragestrategie, die auf zwei unabhängigen Abfragezyklen mit unterschiedlichen Zyklusintervallen basiert.

- `Short Poll Cycle Interval` Geben Sie das Intervall in **Sekunden** ein. Der Wolf Smartset-Server definiert ein absolutes Mindestabfrageintervall (derzeit 60 Sekunden), das Sie nicht unterschreiten sollten. Wenn Sie einen Wert unterhalb dieses Mindestintervalls konfigurieren, reagiert der Server nicht wie erwartet oder trennt möglicherweise sogar Ihre Sitzung. Der Adapter fragt das aktuelle Mindestabfrageintervall regelmäßig vom Server ab. Wenn das konfigurierte Abfrageintervall unter dem vom Server angegebenen Mindestintervall liegt, erhalten Sie eine Warnmeldung vom Adapter und sollten Ihr Abfrageintervall entsprechend anpassen.
- `Long Poll Cycle Interval` Geben Sie das Intervall in **Minuten** für den zweiten Abfragezyklus ein.

Der Wolf Smartset-Server gruppiert die verschiedenen Geräteparameter in unterschiedliche Pakete, die durch eine numerische BundleId identifiziert werden. In der **ioBroker-Admin-** Benutzeroberfläche finden Sie die BundleIds für die verschiedenen Parametergruppen in der **Objektansicht** unterhalb der **Wolf-Smartset** -Instanz auf Kanalebene.

- `Parameters of Bundle` In dieser Tabelle können Sie festlegen, welche Parameterwertegruppe in welchem Abfragezyklus abgefragt werden soll. Es empfiehlt sich, Folgendes zu beachten:
  - `Include in Short Poll Cycle` alle sich schnell ändernden Parameterwerte (z. B. Betriebszustände) und bis
  - `Include in Long Poll Cycle` Parameterwerte ändern sich selten (z. B. Gerätekonfigurationsparameter).

Die Wolf Smartset API erfordert, dass jede Abfrageanfrage neben einer Liste der abzufragenden Parameter auch eine BundleId enthält. Es ist nicht ganz klar, wie die BundleId mit der eigentlichen Parameterliste zusammenhängt, aber in den meisten Fällen sollte „Standard“ ausreichen: Sie entspricht der höchsten ausgewählten BundleId für den jeweiligen Abfragezyklus. Alle anderen Einstellungen dienen experimentellen Zwecken. Konfigurieren Sie die zu verwendende BundleId wie folgt:

- `BundleId for Short Poll Cycle`
- `BundleId for Long Poll Cycle`

Wenn Sie konfiguriert haben`Poll all Parameters` Die in den Abfrageanfragen verwendete BundleId ist auf 1000 gesetzt. Dies führt wahrscheinlich dazu, dass einige Expert-Parameter (siehe unten) vom Ergebnis ausgeschlossen werden. Wenn Sie also Expert-Parameter abfragen möchten, sollten Sie diese Methode wahrscheinlich nicht verwenden.`Poll all Parameters` Die

#### Experten-Login

Die Wolf Smartset API definiert zwei Zugriffsebenen für Geräteparameter: **Benutzer** und **Experte** . Dementsprechend finden Sie in der **Objektansicht** der **ioBroker-Admin** -UI die beiden zugehörigen Unterstrukturen: **Benutzer** und **Fachmann** . Nach der initialen Authentifizierung befindet sich der Adapter im Benutzermodus und empfängt alle verfügbaren Parameterwerte einmalig während der Initialisierung. Anschließend empfängt er bei regelmäßigen Abfragen nur noch Aktualisierungen der Parameterwerte auf Benutzerebene (d. h. Werte in der **Benutzerstruktur** ).

Wenn Sie überprüfen

- `Do Expert Login` und geben Sie die richtige ein
- `Expert Password` ,

Der Adapter führt während der Initialisierung eine Expertenanmeldung durch und empfängt außerdem während des zugehörigen Abfragezyklus periodische Aktualisierungen der Parameterwerte auf Expertenebene (wie im **Fachmannbaum** dargestellt).

**!!! Wichtiger Hinweis für Experten: Start !!!**

Der Expertenmodus scheint sich wie eine Büchse der Pandora zu verhalten! Tests haben gezeigt, dass es ziemlich schwierig ist, den Expertenmodus wieder zu verlassen, sobald er aktiviert ist. Obwohl der Adapter beim Deaktivieren den Benutzer vollständig abmeldet und alle lokal zwischengespeicherten Authentifizierungsdaten (OpenID-Token und Sitzungs-ID) löscht.`Do Expert Login` Nach dem Einstellen und Neustarten der Instanz scheint dies für den Wolf Smartset-Server nicht ausreichend zu sein.

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

Auf den ersten Blick mag es nicht allzu problematisch erscheinen, im Expertenmodus zu bleiben, doch es gibt mindestens einen Nebeneffekt, der für Sie ein echtes Problem darstellen könnte:

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

Dies betrifft insbesondere die folgenden ParameterIds und wahrscheinlich auch weitere:

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

Wenn Sie also auf eine konstante und präzise Bereitstellung solcher Vorperiodenstatistikwerte angewiesen sind, sollten Sie sich gut überlegen, ob Sie überprüfen sollten.`Do Expert Login` Beschwert euch nicht, wenn ihr Schwierigkeiten habt, wieder auf Benutzerstufe zurückzukehren – ihr wurdet gewarnt!

**!!! Wichtiger Hinweis für Experten: Ende !!!**

#### Prüfen Sie auf Änderungen der öffentlichen IP-Adresse

Der Wolf Smartset-Server ist client-IP-adressenbewusst. Das bedeutet, er verknüpft bestimmte Anwendungsstatusinformationen mit der öffentlichen IP-Adresse der Clientanwendung. Wenn Sie also Folgendes konfiguriert haben:`Do Expert Login` Ändert sich die öffentliche IP-Adresse des Adapters (z. B. nach einem Router-Neustart), muss sich der Adapter erneut beim Wolf Smartset-Server authentifizieren, um den Expertenmodus wieder zu aktivieren. Da die Authentifizierung nur stündlich erfolgt, kann es bis zu **einer Stunde dauern, bis der Adapter wieder im Expertenmodus ist** .

Falls Ihnen das zu lang ist, können Sie Folgendes überprüfen:

- `Enable Public IP Checking` In diesem Fall überprüft der Adapter Ihre öffentliche IP-Adresse über [ipify.org](https://ipify.org) **alle vier Abfragezyklen** und veranlasst bei Änderungen eine erneute Authentifizierung. Dadurch befindet sich der Adapter **spätestens nach vier Abfragezyklen** wieder im Expertenmodus.

#### API-Profilierung

API-Profiling ermöglicht es Ihnen, die Nutzung der Wolf Smartset API durch den Adapter zu verfolgen.

- `Enable API Profiling` Der Adapter aktualisiert für jede Abfrageanforderung die folgenden Objekte im **Objektbaum der Adapterinstanz** :
  - info\_api
    - poll\_req\_bundle\_id: die im Poll-Request verwendete BundleId
    - poll\_req\_num\_params: die Anzahl der vom Adapter angeforderten Parameter.
    - poll\_resp\_num\_params: die Anzahl der vom Server zurückgegebenen Parameter.
    - poll\_resp\_num\_params: die Anzahl der vom Server zurückgegebenen Parameterwerte (zurückgegebene Parameter können einen zugeordneten Wert haben oder auch nicht)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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