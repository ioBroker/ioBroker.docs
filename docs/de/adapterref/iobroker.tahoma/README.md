---
chapters: {"pages":{"en/adapterref/iobroker.tahoma/README.md":{"title":{"en":"ioBroker.tahoma"},"content":"en/adapterref/iobroker.tahoma/README.md"},"en/adapterref/iobroker.tahoma/FAQ.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.tahoma/FAQ.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: XC7thve6xfmrHVPlCXG/6rDmufffEn2kPl3V8Ai+T4Y=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/tahoma-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tahoma-stable.svg)
![GitHub-Veröffentlichungsstatus](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)

# ioBroker.tahoma

Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt steht in keiner Verbindung zu Somfy. Es basiert ursprünglich auf dem Skript von <https://forum.iobroker.net/post/336001> und wurde von <https://github.com/StrathCole/ioBroker.tahoma> abgeleitet.

Der Adapter verbindet sich mit der Tahomalink-Endbenutzer-API und steuert die Geräte. Die Einrichtung erfolgt über die Tahoma Box (und höchstwahrscheinlich Connexoon).\
&#x20;Der Adapter ist noch nicht vollständig ausgestattet, sollte aber die meisten Funktionen zur Steuerung von Jalousien, Rollläden usw. unterstützen.

Bitte lesen Sie bei Problemen zunächst die [FAQ](/#/docs/adapterref/iobroker.tahoma/FAQ.md) .

## Aktuell getestete Geräte

Dieser Adapter sollte grundsätzlich alle Geräte unterstützen, die über **tahomalink.com** erreichbar sind. Für den Entwickler ist dies jedoch schwer zu garantieren. Hauptgrund dafür ist, dass die Dokumentation der verwendeten Somfy-API (zumindest öffentlich) nicht existiert und der Entwickler nur Somfy-Geräte testen kann, die er selbst besitzt oder mit Unterstützung von freiwilligen Testpersonen erproben kann.

Geräte, die über tahomalink.com gesteuert werden können, werden in der Regel auch von diesem Adapter unterstützt. Dazu gehören:

| Gerät             | Unterstützung für Online-API                                            | Unterstützung für die lokale API                                                                                         |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Tahoma-Box        | ✓                                                                       | ✓                                                                                                                        |
| Connexoon         | ✓                                                                       | ✓ ( [Beweis](https://github.com/Excodibur/ioBroker.tahoma/issues/241) )                                                  |
| Tahoma-Schalter   | ✓                                                                       | ✓                                                                                                                        |
| Konnektivitätsset | ✓ ( [Beweis](https://github.com/Excodibur/ioBroker.tahoma/issues/171) ) | ✗ ( [Beweis](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf) ) |

Folgende Somfy-Geräte wurden nachweislich mit diesem Adapter kompatibel:

- S\&SO RS100 io
- Oximo io
- Sonnensensor Sunis io
- Temperatursensor-Io
- Rauchmelder io
- Adapterstecker io

## Konfiguration

Der Adapter unterstützt die folgenden Konfigurationsparameter.

| Parameter                                                                                   | (Standardwert)                     | Beschreibung                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Benutzername                                                                                | _`<your Tahomalink user>`_         | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos.                                                                                                                                                                                                             |
| Passwort                                                                                    | _`<Your Tahomalink password>`_     | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos.                                                                                                                                                                                                             |
| Abstimmungsintervall                                                                        | `20000`                            | Zeit (in Millisekunden), nach der der Adapter versucht, neue Daten von Tahomalink abzurufen.                                                                                                                                                                        |
| PIN der Tahoma-Box                                                                          | Format ähnlich wie`1234-5678-9012` | **<sup>Nur für LocalAPI</sup>** Ihre individuelle PIN für Ihre Tahoma-Box erhalten Sie von Somfy. Weitere Informationen zur Aktivierung/Nutzung finden Sie [hier.](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode)                                  |
| Lokale IP-Adresse                                                                           |                                    | Optional. Nur verwenden, wenn Sie über die angegebene IP-Adresse eine Verbindung zur lokalen API Ihrer Tahoma-Box herstellen möchten, anstatt den Standard-DNS-Eintrag zu verwenden.`gateway-<pin>` Das funktioniert für die meisten Installationen einwandfrei.    |
| Verwenden Sie MDNS                                                                          | `false`                            | **<sup>Nur für LocalAPI</sup>** Wenn diese Option aktiviert ist, wird versucht, den lokalen Hostnamen Ihrer Tahoma-Box mithilfe von mDNS aufzulösen. Da dies möglicherweise nicht von allen Routern unterstützt wird, ist diese Funktion standardmäßig deaktiviert. |
| Anmeldeversuche<sup> 1</sup><sup> 2 </sup>                                                  | `3`                                | Anzahl der Versuche, sich nach einem fehlgeschlagenen Anmeldevorgang erneut anzumelden.                                                                                                                                                                             |
| Verzögerung zwischen Anmeldeversuchen<sup> 1</sup><sup> 2 </sup>                            | `30`                               | Wartezeit (in Sekunden) zwischen den Anmeldeversuchen.                                                                                                                                                                                                              |
| Verzögerung nach fehlgeschlagener Anmeldung<sup> 1</sup><sup> 2 </sup>                      | `120`                              | Wartezeit (in Sekunden), nachdem alle aufeinanderfolgenden Anmeldeversuche fehlgeschlagen sind.                                                                                                                                                                     |
| Verzögerung vor dem erneuten Versuch der Warteschlangenanwendung<sup> 1</sup><sup> 2 </sup> | `1500`                             | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Anwendungswarteschlange an Tahoma zu senden, falls der erste Versuch verloren gegangen ist.                                                                   |

<sup> 1</sup> Diese Konfigurationswerte sind nur in Admin 5 (neue GUI) oder späteren Versionen sichtbar und konfigurierbar.

<sup> 2</sup> Alle Werte beziehen sich auf die Anmeldung bei Tahomalink, das aus Entwicklersicht weitgehend undurchsichtig ist. Erfahrungsgemäß kann es bei zu niedrigen Einstellungen dazu führen, dass Somfy Ihr Konto vorübergehend sperrt. Gehen Sie daher bei niedrigeren Standardwerten vorsichtig vor!

## Staaten

### tahoma.X.location

Die Bundesstaaten in diesem Baum enthalten die persönlichen Daten des Benutzers, wie Stadt, Straße und Längen-/Breitengrad.

### tahoma.X.devices.\*.deviceURL

Dieser Status enthält die Geräte-URL, die von Tahoma zur Identifizierung des Geräts verwendet wird.

### tahoma.X.devices.\*.commands

Diese Zustände enthalten Tastenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie beispielsweise:`close` Und`open` aber auch noch einige mehr.\
&#x20;Einige der Befehle haben eine`:slow` Am Ende, sofern vom Gerät unterstützt. Die Verwendung dieser Optionen aktiviert einen niedrigen Geschwindigkeitsmodus oder den sogenannten Silent-Modus.

### tahoma.X.devices.\*.states

Diese Statusangaben enthalten den aktuellen Status der Geräte wie folgt. Einige der Statusangaben enthalten eine`:slow` Am Ende, sofern vom Gerät unterstützt. Durch diese Einstellungen wird ein niedriger Geschwindigkeitsmodus oder der sogenannte Silent-Modus aktiviert.

| Gerätestatus                                                | Bearbeitbar | Zweck/Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _tahoma.X.devices.\*.states.core:DeploymentState_           | ✓           | Liefert Informationen über den Status der aktuellen Bereitstellung und steuert diesen. 100 bedeutet vollständig bereitgestellt, 0 bedeutet nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, einige haben`ClosureState` stattdessen.                                                                                                                                                                                                 |
| _tahoma.X.devices.\*.states.core:TargetDeploymentState_     | ✓           | Sehen`tahoma.X.devices.*.states.core:DeploymentState` Verwenden Sie dies beispielsweise, um die Position der Jalousie direkt zu ändern.                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.coreClosureState_               | ✓           | Liefert Informationen über den aktuellen Schließzustand und steuert diesen. 100 bedeutet vollständig geschlossen, 0 bedeutet offen. Nicht alle Geräte verfügen über diesen Wert, manche haben`DeploymentState` stattdessen.                                                                                                                                                                                                                   |
| _tahoma.X.devices.\*.states.core:TargetClosureState_        | ✓           | Sehen`tahoma.X.devices.*.states.core:ClosureState`                                                                                                                                                                                                                                                                                                                                                                                            |
| _tahoma.X.devices.\*.states.core:OrientationState_          | ✓           | Liefert Informationen über die Ausrichtung von Lamellen und steuert diese (z. B. bei Rollläden). Nicht alle Geräte bieten diese Funktion.                                                                                                                                                                                                                                                                                                     |
| _tahoma.X.devices.\*.states.core:TargetOrientationState_    | ✓           | Sehen`tahoma.X.devices.*.states.core:OrientationState`                                                                                                                                                                                                                                                                                                                                                                                        |
| _tahoma.X.devices.\*.states.core:NameState_                 |             | Enthält den aktuellen Namen des Geräts.                                                                                                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.core:OpenClosedState_           |             | Enthält`closed` wenn das Gerät zu 100 % geschlossen oder zu 0 % ausgefahren ist und`open` ansonsten.                                                                                                                                                                                                                                                                                                                                          |
| _tahoma.X.devices.\*.states.core:PriorityLockTimerState_    |             | Wenn ein Sensor das Gerät blockiert, wird dies hier vermerkt, z. B. wenn ein Windsensor eine Markise blockiert.                                                                                                                                                                                                                                                                                                                               |
| _tahoma.X.devices.\*.states.core:RSSILevelState_            |             | Die aktuelle Signalqualität des Geräts.                                                                                                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.core:StatusState_               |             | `available` sofern das Gerät aktuell verfügbar ist.                                                                                                                                                                                                                                                                                                                                                                                           |
| _tahoma.X.devices.\*.states.io:PriorityLockLevelState_      |             | Sehen`tahoma.X.devices.*.states.core:PriorityLockTimerState`                                                                                                                                                                                                                                                                                                                                                                                  |
| _tahoma.X.devices.\*.states.io:PriorityLockOriginatorState_ |             | Sehen`tahoma.X.devices.*.states.core:PriorityLockTimerState`                                                                                                                                                                                                                                                                                                                                                                                  |
| _tahoma.X.devices.\*.states.moving_                         |             | Gibt an, ob sich das Gerät gerade bewegt.`0 = stopped` ,`1 = up/undeploy` ,`2 = down/deploy` ,`3 = unknown direction`<br/> **Bemerkung:**<br/> Dies funktioniert nur zuverlässig, wenn eine Verbindung zur Tahoma-API (nicht zur Local-API) hergestellt wird, da die Local-API nicht genügend Aktionsereignis-Aktualisierungen liefert, um diesen Zustand korrekt zu berechnen.`core:MovingState` Sollte aber in beiden Fällen funktionieren. |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

<!--
	Placeholder for the next version (add instead of version-number-headline below):
	## __WORK IN PROGRESS__
-->
### 0.11.0 (2025-04-15)
- Feature: Added option to specify IP address for access to local API (https://github.com/Excodibur/ioBroker.tahoma/issues/424)

### 0.10.4 (2024-04-28)
- Fixed: Warning resolved about invalid element in jsonConfig

### 0.10.3 (2024-01-29)
- Fixed: Some crashed caused by event-updates were fixed with a workaround.

### 0.10.2 (2023-03-25)
- Fixed: Improved core:MovingState. Should reflect moving blinds correctly now.

### 0.10.1 (2023-01-23)
- Fixed: Clear bearer token, if connection to local API fails, so new one can be fetched.

### 0.10.0 (2023-01-03)
- Fixed warnings about _Failed getting execution state_ when using the local API.

## License

The MIT License (MIT)

Copyright (c) 2020-2025 Marius Burkard & Excodibur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.