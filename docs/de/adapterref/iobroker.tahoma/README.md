---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: f3IyGRGAXDoHRJcAWd+pn4bYu3GiViFdyaMf/f0C9vw=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/tahoma-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tahoma-stable.svg)

![Github-Release-Status](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt steht in keiner Verbindung zu Somfy. Ursprünglich basiert es auf dem Skript von https://forum.iobroker.net/post/336001 und wurde von https://github.com/StrathCole/ioBroker.tahoma abgeleitet.

Der Adapter verbindet sich mit der Tahomalink-Endbenutzer-API und steuert die Geräte. Die Einrichtung erfolgt über die Tahoma Box (und höchstwahrscheinlich auch über Connexoon).
Der Adapter ist noch nicht voll funktionsfähig, sollte aber die meisten Aktionen zur Steuerung von Jalousien, Rollläden usw. unterstützen.

Bitte lesen Sie bei Problemen zuerst auch die [Häufig gestellte Fragen](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md).

## Aktuell getestete Geräte
Dieser Adapter sollte grundsätzlich alle über __tahomalink.com__ erreichbaren Geräte unterstützen, für den Adapterentwickler ist es jedoch schwierig, dies zu garantieren. Hauptsächlich, weil die Dokumentation der verwendeten Somfy-API (zumindest öffentlich) nicht existiert und der Entwickler nur Somfy-Geräte testen kann, die er selbst besitzt oder mit Unterstützung williger Teilnehmer testen kann.

Geräte, die über tahomalink.com gesteuert werden können, werden in der Regel auch von diesem Adapter unterstützt. Dazu gehören:

| Gerät | Unterstützung für Online-API | Unterstützung für lokale API |
|-|-|-|
| Tahoma-Box | ✓ | ✓ |
| Connexoon | ✓ | ✓ ([nachweisen](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
| Tahoma-Schalter | ✓ | ✓ |
| Konnektivitätskit | ✓ ([Beweis](https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗ ([Beweis](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

Die Funktionsfähigkeit der folgenden Somfy-Geräte mit diesem Adapter wurde überprüft:

S&SO RS100 io
- Oximo io
- Sonnensensor Sunis io
Temperatursensor io
- Rauchmelder io
Adapterstecker io

## Konfiguration
Die folgenden Konfigurationsparameter werden vom Adapter unterstützt.

| Parameter | (Standard-)Wert | Beschreibung |
| Benutzername | _`<your Tahomalink user>`_ | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos. |
| Passwort | _`<Your Tahomalink password>`_ | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos. |
| Abfrageintervall | `20000` | Zeit (in Millisekunden), nach der der Adapter versucht, neue Daten von Tahomalink zu erhalten. |
| PIN der Tahoma-Box | Format ähnlich wie `1234-5678-9012` | __ <sup>Nur für LocalAPI</sup> __ Eindeutige PIN Ihrer Tahoma-Box, bereitgestellt von Somfy. Weitere Infos zur Aktivierung/Verwendung [Hier](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| PIN der Tahoma-Box | Format ähnlich wie `1234-5678-9012` | __ <sup>Nur für LocalAPI</sup> __ Eindeutige PIN Ihrer Tahoma-Box, bereitgestellt von Somfy. Weitere Informationen zur Aktivierung/Verwendung [hier](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) | | MDNS verwenden | `false` | __ <sup>Nur für LocalAPI</sup> __ Wenn auf „true“ gesetzt, wird versucht, mDNS zu verwenden, um den lokalen Hostnamen Ihrer Tahoma-Box aufzulösen. Wird möglicherweise nicht von allen Routern unterstützt und ist daher standardmäßig deaktiviert. |
| Anmeldeversuche <sup>1</sup> <sup>2</sup> | `3` | Anzahl der Versuche, sich nach einem Anmeldefehler erneut anzumelden. |
| Verzögerung zwischen Anmeldeversuchen <sup>1</sup> <sup>2</sup> | `30` | Zeit (in Sekunden), die zwischen Anmeldeversuchen gewartet werden soll. |
| Verzögerung nach fehlgeschlagener Anmeldung <sup>1</sup> <sup>2</sup> | `120` | Zeit (in Sekunden), die gewartet werden soll, nachdem alle aufeinanderfolgenden Anmeldeversuche fehlgeschlagen sind. |
| Verzögerung vor Wiederholungsversuch der Apply-Warteschlange <sup>1</sup> <sup>2</sup> | `1500` | Zeit (in Millisekunden), die gewartet werden soll, bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, falls diese verloren gegangen sind. |
| Verzögerung vor Wiederholungsversuch der Apply-Warteschlange <sup>1</sup> <sup>2</sup> | `1500` | Zeit (in Millisekunden), die gewartet werden soll, bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, falls diese verloren gegangen sind. |

 <sup>1</sup> Diese Konfigurationseinstellungen sind nur in Admin 5 (neue GUI) oder höher sichtbar und konfigurierbar.

 <sup>2</sup> Alle Werte beziehen sich auf die Anmeldung bei Tahomalink, das aus Entwicklungssicht weitgehend eine Blackbox ist. Wenn Sie die Werte hier zu niedrig konfigurieren, besteht erfahrungsgemäß die Möglichkeit, dass Somfy Ihr Konto vorübergehend sperrt. Verwenden Sie daher die Standardwerte hier mit Bedacht!

## Staaten
### Tahoma.X.location
Der Status in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Straßenadresse und Längen-/Breitengrad.

### Tahoma.X.devices.*.deviceURL
Dieser Status enthält die Geräte-URL, die von Tahoma zur Identifizierung des Geräts verwendet wird.

### Tahoma.X.devices.*.commands
Diese Zustände enthalten Tastenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open`, aber auch einige weitere.
Einige Befehle enden mit `:slow`, sofern vom Gerät unterstützt. Diese aktivieren den langsamen oder sogenannten Lautlosmodus.

### Tahoma.X.devices.*.states
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Einige Zustände haben am Ende ein `:slow`, sofern vom Gerät unterstützt. Das Setzen dieser Zustände aktiviert die niedrige Geschwindigkeit oder den sogenannten Lautlosmodus.

| Gerätestatus | Bearbeitbar | Zweck/Beschreibung |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | Bietet Informationen zum aktuellen Bereitstellungsstatus und steuert diesen. 100 bedeutet vollständige Bereitstellung, 0 bedeutet nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, manche haben stattdessen `ClosureState`. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Bietet Informationen zum aktuellen Schließzustand und steuert diesen. 100 bedeutet vollständig geschlossen, 0 bedeutet offen. Nicht alle Geräte haben diesen Wert, manche haben stattdessen `DeploymentState`. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe „tahoma.X.devices.*.states.core:ClosureState“ |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe „tahoma.X.devices.*.states.core:OrientationState“ |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält `closed`, wenn das Gerät zu 100 % geschlossen oder zu 0 % eingesetzt ist, und andernfalls `open`. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält „geschlossen“, wenn das Gerät zu 100 % geschlossen oder zu 0 % eingesetzt ist, und andernfalls „offen“. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Wenn ein Sensor das Gerät gesperrt hat, wird dies hier angegeben, zB ein Windsensor, der eine Markise blockiert. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available`, wenn das Gerät derzeit verfügbar ist. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe „tahoma.X.devices.*.states.core:PriorityLockTimerState“ | | _tahoma.X.devices.*.states.moving_ | | Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`<br/> **Bemerkung:**<br/> Dies funktioniert nur zuverlässig, wenn eine Verbindung zur Tahoma-API (nicht zur lokalen API) besteht, da die lokale API nicht genügend Aktionsereignis-Updates bereitstellt, um diesen Status korrekt zu berechnen. `core:MovingState` sollte jedoch in beiden Fällen funktionieren. |

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