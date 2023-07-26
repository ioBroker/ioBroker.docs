---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: ol4x0rHy3INAcP+Q6hOW4O02EskWBI7/Af5wKSwTmHE=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/tahoma-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/tahoma-stable.svg)

![Github-Veröffentlichungsstatus](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt steht in keiner Verbindung zu Somfy. Ursprünglich basierend auf dem Skript, das von https://forum.iobroker.net/post/336001 übernommen und von https://github.com/StrathCole/ioBroker.tahoma gespalten wurde.

Der Adapter stellt eine Verbindung zur Tahomalink-Endbenutzer-API her und steuert die Geräte. Einrichtung über Tahoma Box (und höchstwahrscheinlich Connexoon).
Der Adapter ist noch nicht vollständig ausgestattet, sollte aber die meisten Aktionen zur Steuerung von Jalousien, Rollläden usw. unterstützen.

Bitte lesen Sie bei Problemen auch zuerst die [FAQ](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md).

## Derzeit getestete Geräte
Generell sollte dieser Adapter alle Geräte unterstützen, die über __tahomalink.com__ erreichbar sind, für den Adapterentwickler ist es jedoch schwierig, dies zu garantieren. Vor allem, weil die Dokumentation der verwendeten Somfy-API (zumindest öffentlich) nicht vorhanden ist und der Entwickler nur Somfy-Geräte testen kann, die er selbst besitzt oder mit Unterstützung williger Teilnehmer testen kann.

Geräte, die über tahomalink.com gesteuert werden können, werden in der Regel auch von diesem Adapter unterstützt. Das beinhaltet:

| Gerät | Unterstützung für Online-API | Unterstützung für lokale API |
|-|-|-|
| Tahoma-Box | ✓ | ✓ |
| Connexoon | ✓ | ✓ ([nachweisen](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
| Tahoma-Schalter | ✓ | ✓ |
| Konnektivitätskit | ✓ ([Beweis](https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗ ([Beweis](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

Die folgenden Somfy-Geräte funktionieren nachweislich mit diesem Adapter:

- S&SO RS100 io
- Oximo io
- Sonnensensor Sunis io
- Temperatursensor io
- Rauchsensor io
- Adapterstecker io

## Aufbau
Die folgenden Konfigurationsparameter werden vom Adapter unterstützt.

| Parameter | (Standard-)Wert | Beschreibung |
| Benutzername | _`<your Tahomalink user>`_ | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos. |
| Passwort | _`<Your Tahomalink password>`_ | Erforderlich zur Authentifizierung Ihres Tahoma-Kontos. |
| Abfrageintervall | `20000` | Zeit (in Millisekunden), nach der der Adapter versucht, neue Daten von Tahomalink abzurufen. |
| PIN der Tahoma-Box | Format ähnlich `1234-5678-9012` | __ <sup>Nur für LocalAPI</sup> __ Eindeutige PIN Ihrer Tahoma-Box, bereitgestellt von Somfy. Weitere Infos zur Aktivierung/Nutzung [Hier](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| Verwenden Sie MDNS | `false` | __ <sup>Nur für LocalAPI</sup> __ Wenn auf „true“ gesetzt, wird versucht, mDNS zu verwenden, um den lokalen Hostnamen Ihrer Tahoma-Box aufzulösen. Wird möglicherweise nicht von allen Routern unterstützt und ist daher standardmäßig deaktiviert. |
| Anmeldeversuche <sup>1</sup> <sup>2</sup> | `3` | Anzahl der erneuten Anmeldeversuche nach fehlgeschlagener Anmeldung. |
| Verzögerung zwischen Anmeldeversuchen <sup>1</sup> <sup>2</sup> | `30` | Wartezeit (in Sekunden) zwischen Anmeldeversuchen. |
| Verzögerung nach fehlgeschlagener Anmeldung <sup>1</sup> <sup>2</sup> | `120` | Wartezeit (in Sekunden), nachdem alle aufeinanderfolgenden Anmeldeversuche fehlgeschlagen sind. |
| Verzögerung vor dem erneuten Versuch der ApplyQueue <sup>1</sup> <sup>2</sup> | `1500` | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, für den Fall, dass diese verloren gehen. |
| Verzögerung vor dem erneuten Versuch der ApplyQueue <sup>1</sup> <sup>2</sup> | `1500` | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, für den Fall, dass diese verloren gehen. |

<sup>1</sup> Diese Konfigurationswerte sind nur in Admin 5 (neue GUI) oder höher sichtbar und konfigurierbar.

<sup>2</sup> Alle Werte beziehen sich auf die Anmeldung bei Tahomalink, was aus Entwicklungssicht größtenteils eine Blackbox ist. Wenn Sie die Zahlen hier zu niedrig konfigurieren, besteht erfahrungsgemäß eine gute Chance, dass Somfy Ihr Konto vorübergehend sperrt, daher sollten Sie die Standardwerte hier mit Vorsicht senken!

## Zustände
### Tahoma.X.location
Der Bundesstaat in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Straße und Längen-/Breitengrad.

### Tahoma.X.devices.*.deviceURL
Dieser Status enthält die Geräte-URL, die von Tahoma zur Identifizierung des Geräts verwendet wird.

### Tahoma.X.devices.*.commands
Diese Zustände enthalten Tastenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open`, aber auch einige mehr.
Einige der Befehle haben am Ende einen `:slow`, sofern dies vom Gerät unterstützt wird. Die Verwendung dieser ermöglicht eine niedrige Geschwindigkeit oder den sogenannten Silent-Modus.

### Tahoma.X.devices.*.states
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Einige Staaten haben am Ende einen `:slow`, sofern dies vom Gerät unterstützt wird. Wenn Sie diese einstellen, wird eine niedrige Geschwindigkeit oder der sogenannte Silent-Modus aktiviert.

| Gerätestatus | Bearbeitbar | Zweck/Beschreibung |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | Stellt Informationen über den Status der aktuellen Bereitstellung bereit und steuert diesen. 100 bedeutet vollständig bereitgestellt, 0 bedeutet nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `ClosureState`. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Stellt Informationen über den aktuellen Schließungsstatus bereit und steuert diesen. 100 bedeutet vollständig geschlossen, 0 ist offen. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `DeploymentState`. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe „tahoma.X.devices.*.states.core:ClosureState“ |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe „tahoma.X.devices.*.states.core:OrientationState“ |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält `closed`, wenn das Gerät zu 100 % geschlossen oder 0 % bereitgestellt ist, andernfalls `open`. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält „geschlossen“, wenn das Gerät zu 100 % geschlossen oder zu 0 % bereitgestellt ist, andernfalls „offen“. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Wenn ein Sensor das Gerät gesperrt hat, wird dies hier angezeigt, z. G. Ein Windsensor blockiert eine Markise. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available` wenn das Gerät derzeit verfügbar ist. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe „tahoma.X.devices.*.states.core:PriorityLockTimerState“ | | _tahoma.X.devices.*.states.moving_ | | Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`<br/> **Anmerkung:**<br/> Dies funktioniert nur dann zuverlässig, wenn eine Verbindung mit der Tahoma-API (nicht der lokalen API) besteht, da die lokale API nicht genügend Aktionsereignisaktualisierungen bereitstellt, um diesen Status korrekt zu berechnen. `core:MovingState` sollte jedoch in beiden Fällen funktionieren. |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2023 Marius Burkard & Excodibur

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