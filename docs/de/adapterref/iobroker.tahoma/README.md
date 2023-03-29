---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: /u36vdt/QGfAt0NT2GYFz89qeEwptfVxxitwHElxe+I=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/tahoma-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tahoma-stable.svg)
![Sprachqualität: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.tahoma.svg?logo=lgtm&logoWidth=18)

![Github-Release-Status](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt hat keine Verbindung zu Somfy. Ursprünglich basierend auf dem Skript von https://forum.iobroker.net/post/336001 und Fork von https://github.com/StrathCole/ioBroker.tahoma.

Der Adapter verbindet sich mit der Endbenutzer-API von Tahomalink und steuert die Geräte, die über Tahoma Box (und höchstwahrscheinlich Connexoon) eingerichtet wurden.
Der Adapter ist noch nicht vollständig ausgestattet, sollte aber die meisten Aktionen zur Steuerung von Jalousien und Rollläden usw. unterstützen.

Bitte lesen Sie bei Problemen zuerst auch die [FAQ](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md).

## Aktuell getestete Geräte
Generell sollte dieser Adapter alle Geräte unterstützen, auf die über __tahomalink.com__ zugegriffen werden kann, aber für den Adapterentwickler ist es schwierig, dies zu garantieren. Vor allem, weil die Dokumentation der verwendeten Somfy-API (zumindest öffentlich) nicht existiert und der Entwickler nur Somfy-Geräte testen kann, die er selbst besitzt oder mit Unterstützung williger Teilnehmer testen kann.

Die folgenden Somfy-Geräte wurden verifiziert, um mit diesem Adapter zu funktionieren:

- S&SO RS100io
-Oximo io
- Sonnensensor Sunis io
- Temperatursensor io
- Rauchmelder io
- Adapterstecker io

## Aufbau
Die folgenden Konfigurationsparameter werden vom Adapter unterstützt.

| Parameter | (Standard-)Wert | Beschreibung |
| Benutzername | _`<your Tahomalink user>`_ | Erforderlich, um Ihr Tahoma-Konto zu authentifizieren. |
| Passwort | _`<Your Tahomalink password>`_ | Erforderlich, um Ihr Tahoma-Konto zu authentifizieren. |
| Abfrageintervall | `20000` | Zeit (in Millisekunden), nach der der Adapter versucht, neue Daten von Tahomalink zu erhalten. |
| PIN der Tahoma-Box | Format ähnlich `1234-5678-9012` | __ <sup>Nur für LocalAPI</sup> __ Eindeutige PIN Ihrer Tahoma-Box, die von Somfy bereitgestellt wird. Mehr Infos zur Aktivierung/Verwendung [Hier](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| Verwenden Sie MDNS | `false` | __ <sup>Nur für LocalAPI</sup> __ Wenn auf true gesetzt, wird versucht, mDNS zu verwenden, um den lokalen Hostnamen Ihrer Tahoma-Box aufzulösen. Wird möglicherweise nicht von allen Routern unterstützt, daher ist es standardmäßig deaktiviert. |
| Anmeldeversuche <sup>1</sup> <sup>2</sup> | `3` | Anzahl der Versuche, sich nach einem Anmeldefehler erneut anzumelden. |
| Verzögerung zwischen Anmeldeversuchen <sup>1</sup> <sup>2</sup> | `30` | Wartezeit (in Sekunden) zwischen Anmeldeversuchen. |
| Verzögerung nach fehlgeschlagener Anmeldung <sup>1</sup> <sup>2</sup> | `120` | Wartezeit (in Sekunden), nachdem alle aufeinanderfolgenden Anmeldeversuche fehlgeschlagen sind. |
| Verzögerung vor Wiederholung der Warteschlangenanwendung <sup>1</sup> <sup>2</sup> | `1500` | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Anwendungswarteschlange an Tahoma zu senden, falls sie verloren gehen. |
| Verzögerung vor Wiederholung der Warteschlangenanwendung <sup>1</sup> <sup>2</sup> | &quot;1500&quot; | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Anwendungswarteschlange an Tahoma zu senden, falls sie verloren gehen. |

<sup>1</sup> Diese Konfigurationswerte sind nur in Admin 5 (neue GUI) oder höher sichtbar und konfigurierbar.

<sup>2</sup> Alle Werte beziehen sich auf die Anmeldung bei Tahomalink, das aus Entwicklungssicht meist eine Blackbox ist. Wenn Sie die Zahlen hier zu niedrig konfigurieren, besteht erfahrungsgemäß eine gute Chance, dass Somfy Ihr Konto vorübergehend sperrt, also verringern Sie die Standardwerte hier mit Vorsicht!

## Zustände
### Tahoma.X.Standort
Das Bundesland in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Straße und Längen-/Breitengrad.

### Tahoma.X.Geräte.*.Geräte-URL
Dieser Status enthält die Geräte-URL, die von Tahoma verwendet wird, um das Gerät zu identifizieren.

### Tahoma.X.Geräte.*.Befehle
Diese Zustände enthalten Schaltflächenbefehle zum Steuern der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open`, aber auch einige mehr.
Einige der Befehle haben ein `:slow` am Ende, wenn dies vom Gerät unterstützt wird. Die Verwendung dieser ermöglicht eine niedrige Geschwindigkeit oder den sogenannten Silent-Modus.

### Tahoma.X.devices.*.states
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Einige der Zustände haben ein `:slow` am Ende, wenn dies vom Gerät unterstützt wird. Wenn Sie diese einstellen, wird eine niedrige Geschwindigkeit oder der sogenannte Silent-Modus aktiviert.

| Gerätezustand | Bearbeitbar | Zweck/Beschreibung |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:Bereitstellungsstatus_ | &#10003; | Stellt Informationen über den Status der aktuellen Bereitstellung bereit und steuert diesen. 100 bedeutet vollständig bereitgestellt, 0 ist nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `ClosureState`. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Bietet Informationen über und steuert den Status der aktuellen Schließung. 100 bedeutet vollständig geschlossen, 0 ist offen. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `DeploymentState`. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält `closed`, wenn das Gerät zu 100 % geschlossen oder zu 0 % bereitgestellt ist, und ansonsten `open`. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält „geschlossen“, wenn das Gerät zu 100 % geschlossen oder zu 0 % bereitgestellt ist, andernfalls „offen“. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Hat ein Sensor das Gerät gesperrt, wird dies hier angegeben, z. G. ein Windsensor blockiert eine Markise. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available` wenn das Gerät aktuell verfügbar ist. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` | | _tahoma.X.devices.*.states.moving_ | | Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`<br/> **Anmerkung:**<br/> Dies funktioniert nur zuverlässig, wenn es mit der Tahoma (nicht Local) API verbunden ist, da die Local API nicht genügend Action-Event-Updates bereitstellt, um diesen Status korrekt zu berechnen. `core:MovingState` sollte aber in beiden Fällen funktionieren. |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2022 Marius Burkard & Excodibur

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