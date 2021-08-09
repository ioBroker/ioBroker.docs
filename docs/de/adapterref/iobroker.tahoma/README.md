---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: cPqOYG7QNS6lvH3iSlYXZHJcT/A0P/6YDaxL2MIfrr0=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Abhängigkeitsstatus](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/tahoma-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tahoma-stable.svg)
![Sprachnote: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.tahoma.svg?logo=lgtm&logoWidth=18)

![Github-Release-Status](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

#ioBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt hat keine Verbindung zu Somfy. Ursprünglich basierend auf dem Skript von https://forum.iobroker.net/post/336001 und gegabelt von https://github.com/StrathCole/ioBroker.tahoma.

Der Adapter stellt eine Verbindung zur Tahomalink-Endbenutzer-API her und steuert die über die Tahoma Box (und höchstwahrscheinlich Connexoon) eingerichteten Geräte.
Der Adapter ist noch nicht mit allen Funktionen ausgestattet, sollte aber die meisten Aktionen zur Steuerung von Jalousien und Rollläden usw. unterstützen.

Befolgen Sie einige der vom Adapter erstellten Zustände.

## Derzeit getestete Geräte
Generell sollte dieser Adapter alle Geräte unterstützen, auf die über __tahomalink.com__ zugegriffen werden kann, aber für den Adapter-Entwickler ist dies schwer zu garantieren. Vor allem, weil die Dokumentation der verwendeten Somfy-API (zumindest öffentlich) nicht existiert und der Entwickler nur Somfy-Geräte testen kann, die er selbst besitzt oder mit Unterstützung williger Teilnehmer testen kann.

Die folgenden Somfy-Geräte funktionieren mit diesem Adapter:

- S&SO RS100 io
- Oximo io
- Sonnensensor Sunis io
- Temperatursensor io
- Rauchsensor io
- Adapterstecker io

## Aufbau
Die folgenden Konfigurationsparameter werden vom Adapter unterstützt.

| Parameter | (Standard-)Wert | Beschreibung |
| Benutzername | _`<your Tahomalink user>`_ | Erforderlich, um Ihr Tahoma-Konto zu authentifizieren. |
| Passwort | _`<Your Tahomalink password>`_ | Erforderlich, um Ihr Tahoma-Konto zu authentifizieren. |
| Abfrageintervall | `20000` | Zeit (in Millisekunden), nach der der Adapter versucht, neue Daten von Tahomalink abzurufen. |
| Anmeldeversuche <sup>1</sup> <sup>2</sup> | `3` | Anzahl der Versuche, sich nach einem Anmeldefehler erneut anzumelden. |
| Verzögerung zwischen Anmeldeversuchen <sup>1</sup> <sup>2</sup> | `30` | Wartezeit (in Sekunden) zwischen den Anmeldeversuchen. |
| Verzögerung nach fehlgeschlagener Anmeldung <sup>1</sup> <sup>2</sup> | `120` | Wartezeit (in Sekunden), nachdem alle aufeinanderfolgenden Anmeldeversuche fehlgeschlagen sind. |
| Verzögerung vor erneutem Anwenden der Warteschlange <sup>1</sup> <sup>2</sup> | `1500` | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, falls diese verloren gehen. |
| Verzögerung vor erneutem Anwenden der Warteschlange <sup>1</sup> <sup>2</sup> | `1500` | Wartezeit (in Millisekunden), bevor ein zweiter Versuch unternommen wird, Änderungen aus der internen Apply-Warteschlange an Tahoma zu senden, falls diese verloren gehen. |

<sup>1</sup> Diese Konfigurationswerte sind nur in Admin 5 (neue GUI) oder höher sichtbar und konfigurierbar.

<sup>2</sup> Alle Werte beziehen sich auf die Anmeldung bei Tahomalink, die aus Entwicklungssicht meist eine Blackbox ist. Wenn Sie die Nummern hier zu niedrig konfigurieren, besteht erfahrungsgemäß eine gute Chance, dass Somfy Ihren Account vorübergehend sperrt, daher sollten Sie hier die Standardwerte vorsichtig senken!

## Zustände
### Tahoma.X.Standort
Das Bundesland in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Anschrift und Längen-/Breitengrad.

### Tahoma.X.devices.*.deviceURL
Dieser Status enthält die Geräte-URL, die von Tahoma verwendet wird, um das Gerät zu identifizieren.

### Tahoma.X.devices.*.commands
Diese Zustände enthalten Tastenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open` aber auch einige mehr.
Einige der Befehle haben am Ende ein `:slow`, sofern dies vom Gerät unterstützt wird. Wenn Sie diese verwenden, wird eine niedrige Geschwindigkeit oder der sogenannte Silent-Modus aktiviert.

### Tahoma.X.devices.*.states
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Einige der Zustände haben am Ende ein `:slow`, wenn sie vom Gerät unterstützt werden. Wenn Sie diese einstellen, wird eine niedrige Geschwindigkeit oder der sogenannte Silent-Modus aktiviert.

| Gerätezustand | Bearbeitbar | Zweck/Beschreibung |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | Stellt Informationen über und steuert den Status der aktuellen Bereitstellung. 100 bedeutet vollständig bereitgestellt, 0 ist nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, manche haben stattdessen `ClosureState`. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Stellt Informationen über und steuert den Status der aktuellen Schließung. 100 bedeutet vollständig geschlossen, 0 ist offen. Nicht alle Geräte haben diesen Wert, manche haben stattdessen `DeploymentState`. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Siehe `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält `closed`, wenn das Gerät zu 100 % geschlossen oder zu 0 % bereitgestellt ist, andernfalls `open`. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Enthält „geschlossen“, wenn das Gerät zu 100 % geschlossen oder zu 0 % bereitgestellt ist, andernfalls „offen“. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Wenn ein Sensor das Gerät gesperrt hat, wird dies hier angegeben, z. g. ein Windsensor, der eine Markise blockiert. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available` wenn das Gerät gerade verfügbar ist. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.moving_ | | Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction` |
| _tahoma.X.devices.*.states.moving_ | | Gibt an, ob sich das Gerät gerade bewegt. `0 = gestoppt`, `1 = hoch/aufheben`, `2 = runter/einsetzen`, `3 = unbekannte Richtung` |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2021 Marius Burkard

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