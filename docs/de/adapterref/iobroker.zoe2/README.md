---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zoe2/README.md
title: iobroker.zoe2
hash: K21DgQ+IUTLyS1wTFygNaZjG2Ci0pD+4jljysqHrYDY=
---
![Logo](../../../en/adapterref/iobroker.zoe2/admin/zoe.png)

![Build-Status](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)
![Bekannte Schwachstellen](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zoe2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zoe2-installed.svg)
![Lizenz](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)

# iobroker.zoe2

\=================

**Tests:**

**Downloads**

**Lizenz:**

**Merkmale:**[![Funktionswünsche](https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

Einfacher ioBroker-Adapter, um einige grundlegende Werte vom Renault ZOE zu erhalten und in ioBroker zu verwenden.

WICHTIG!!! WENN SIE VON EINER VERSION VOR 0.2.2 AKTUALISIEREN, MÜSSEN SIE IHR PASSWORT NEU EINGEBEN, DA DAS PASSWORT AB VERSION 0.2.2 VERSCHLÜSSELT GESPERRT WIRD!!!

**API-SCHLÜSSEL!!! FALLS DER ADAPTER NICHT MEHR FUNKTIONIERT, SCHAUEN SIE BITTE IMMER AUF <https://github.com/fungus75/ioBroker.zoe2/wiki> NACH, DA RENAULT DEN API-SCHLÜSSEL HÄUFIG ÄNDERT!!!**

HINWEIS: Dieser Adapter verwendet dieselbe API wie die My Renault App. Sie müssen die My Renault App jedoch einrichten, bevor Sie diesen Adapter verwenden. Beispiel für Android: <https://play.google.com/store/apps/developer?id=RENAULT+SAS> – Wenn Sie die alte API verwenden möchten, nutzen Sie bitte stattdessen <https://github.com/fungus75/ioBroker.zoe> .

HINWEIS: DIES BEFINDET SICH IN EINEM SEHR FRÜHEN ENTWICKLUNGSSTUDIE, DIE NUTZUNG ERFOLGT AUF EIGENE GEFAHR.

HINWEIS: NACH JEDEM UPDATE DES ADAPTERS GEHEN SIE ZUM EINSTELLUNGSBILDSCHIRM, ÄNDERN SIE EINE EINSTELLUNG, SO DASS DAS SPEICHERN AKTIVIERT IST, ÄNDERN SIE SIE WIEDER ZURÜCK UND KLICKEN SIE AUF SPEICHERN!

Falls dieser Adapter in der ioBroker-Admin-Ansicht nicht verfügbar ist, verwenden Sie bitte den folgenden Befehl, um ihn zu installieren (über die Befehlszeile Ihres ioBroker-Servers):

`npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/`

Alternativ können Sie in der Adapteransicht die GitHub-Schaltfläche (mit der Bezeichnung „Von eigener URL installieren“) verwenden und diese URL auf dem Tab „Andere“ eingeben. Dies kann auch verwendet werden, um auf die aktuelle Adapterversion zu aktualisieren.

`https://github.com/fungus75/ioBroker.zoe2/tarball/master/` (Falls diese URL nicht funktioniert, verwenden Sie stattdessen <https://github.com/fungus75/ioBroker.zoe2.git> )

Mit dieser Methode können Sie den Adapter auf die neueste Version aktualisieren.

Danach sollte der Adapter in der ioBroker-Admin-Ansicht angezeigt werden.

### Konfiguration

- Sie müssen Benutzername, Passwort und Fahrgestellnummer (VIN) genauso festlegen, wie Sie es in meiner Renault-App getan haben.
- Diese Länderversionen funktionieren derzeit: de\_DE
- Möglicherweise benötigen Sie My-ZEConnect oder ähnliche Dienste von Renault, um dies nutzen zu können.
- Nach dem Speichern dauerte es etwa 15 Minuten, bis die Objekte (zoe.0 usw.) erstellt waren.

### Merkmale

- Lesen Sie diese Parameter von Zoe ab:
  - Ladestufe in Prozent
  - Aufladen als boolescher Wert
  - als boolescher Wert eingesteckt
  - Restreichweite in Kilometern
  - verbleibende Ladezeit
  - berechneter Endpunkt des Ladevorgangs (charging\_finished\_at)
  - Batterietemperatur
  - Außentemperatur (nicht sehr genau)
  - Ladeleistung
  - Batteriekapazität
  - Verfügbare Batterieenergie
  - gpsLatitude und gpsLongitude funktionieren nur auf neueren ZOEs.
- Geben Sie diese Parameter ein:
  - preconNow: Startet Precon/HVAC (schreibt true in den entsprechenden Knoten oder drückt die Taste)
  - LadenAbbrechen: Beendet den Ladevorgang
  - chargeEnable: Aktiviert das Laden

Ladekontrolle:

Mit den beiden Tasten chargeCancel und chargeEnable lässt sich die Ladefunktion steuern. Wird chargeCancel gedrückt (oder der Wert „true“ in diesen Parameter geschrieben), wird die Ladefunktion deaktiviert. ZOE sollte nicht laden, solange das Netzkabel angeschlossen ist. Bei meinem ZOE der 1. Generation hat dies keine Auswirkung; möglicherweise funktioniert es bei neueren ZOE-Modellen.

Sobald chargeEnable gedrückt wird (oder der Wert true in diesen Parameter geschrieben wird), sollte die Ladefunktion wieder funktionieren.

So funktioniert es: \`chargeEnable\` erstellt einen Ladeplan, der täglich zur im Einstellungsbildschirm festgelegten Uhrzeit beginnt und 15 Minuten dauert. Dies scheint die kürzeste einstellbare Ladezeit zu sein. Das vollständige Deaktivieren des Ladevorgangs ist mit der aktuellen API (oder den bekannten Teilen davon) nicht möglich.

Einige Parameter funktionieren nur auf neueren ZOEs.

### Testet mit den folgenden ZOEs:

- Zoe Phase 2 (Danke Jack-RK-24)
- Zoe R210 (1. Generation, getestet von fungus75)
- Zoe R90 (Danke an arturwolf)

### Bitte beachten Sie!!

Die Kommunikation mit ZOE oder Renault-Services erfolgt ausschließlich im 10-Minuten-Intervall. Wenn Sie also „preconNow“ oder „chargeNow“ drücken, dauert es bis zum nächsten Intervall, bis die Anfrage an ZOE gesendet wird, und bis zum darauffolgenden Intervall, bis der Status zurückgesendet wird.

Die neue ZOE-API von Renault scheint sehr lückenhaft zu sein. Das bedeutet, dass sie nur dann neue Werte anzeigt, wenn etwas Wichtiges passiert. Meinen Erkenntnissen zufolge ist der Akkustand das Wichtigste. Das heißt, beispielsweise wird die Außentemperatur nicht aktualisiert, wenn das Auto zu Hause steht. Nur wenn der ZOE geladen wird, wird die Außentemperatur aktualisiert. Auch nach Abschluss des Ladevorgangs erfolgt keine Aktualisierung. Während der Fahrt sinkt der Akkustand kontinuierlich, weshalb die Aktualisierung eigentlich sehr regelmäßig erfolgen sollte.

### Danke

Vielen Dank [an https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren](https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren) , <https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome-neue-api-2020> , <https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html> , <https://github.com/edent/Renault-Zoe-API> , <https://github.com/jamesremuscat/pyze> und <https://github.com/hacf-fr/renault-api> für Ihre hervorragende Dokumentation und Arbeit.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 0.2.12 (2025-08-17)
- Fixes bug ChargeStartOrCancel

### 0.2.11 (2025-04-10)
- Fixes bug with totalMileage

### 0.2.10 (2024-10-27)
- Fixes according to ioBroker-Bot notification
  
### 0.2.9 (2024-04-27)
- BugFix Cockpit und Batterie json structure changed by Renault

### 0.2.8 (2024-04-27)
- BugFix Cockpit und Batterie (thanks to @MCP-KC, @gik007)

### 0.2.7 (2024-04-08)
- BugFix gps Location (thanks to @MCP-KC)

### 0.2.6 (2022-07-22)
- API Timeout configurable via config-screen
- Improved stability

### 0.2.5 (2022-03-30)
- Better error messages if kameronapikey changed
- Link to github-wiki added to admin-screen
- updated dependencies

### 0.2.4 (2022-02-16)
- Replaced obsolete Request-Library by axios
- Code-Adjustments

### 0.2.3 (2021-07-29)
- Code Adjustments, Error-Handling

### 0.2.2 (2021-07-26)
- Store Password Encrypted (You have to reset it, if updating from older version)

### 0.2.1 (2021-07-23)
- Code optimisation 

### 0.2.0 (2021-02-12)
- Adapter supports compact mode (required if adapter should be listed in official repo)

### 0.1.5 (2021-02-09)
- bugfix gigya parameter changed https://github.com/fungus75/ioBroker.zoe2/issues/17

### 0.1.4 (2021-02-05)
- added: kamereonapikey as setup parameter because it changed by Feb. 1st
- added: stopChargeWorkaroundHour: Because the API has no feature to stop charging, the stop-charging button starts scheduled charging to a very uncommon time. Configure the hour with that parameter
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/15
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/16
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/14

### 0.1.3 (2020-11-17)
- added: setup-value useHVACApi, see https://github.com/fungus75/ioBroker.zoe2/issues/10

### 0.1.2 (2020-07-28)
- changed: call charge-start API when "pressed" chargeEnable. Hopefully it helps on older ZOEs

### 0.1.1 (2020-07-18)
- added chargeCancel and chargeEnable. See "controll charging"

### 0.1.0 (2020-07-03)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/6, thanks to https://github.com/damack

### 0.0.9 (2020-06-25)
- added: getLocation can be turned on/off in config (useful for older ZOEs which do not allow getLocation)

### 0.0.8 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/3

### 0.0.7 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- added: gpsLatitude
- added: gpsLongitude 

### 0.0.6 (2020-04-30)
- added: chargingPower
- added: batteryCapacity
- added: batteryAvailableEnergy
- changed: Using battery-status v2 API (supplies better values for newer ZOEs, thanks Jack-RK-24 for testing)

### 0.0.5 (2020-04-29)
- added: config-paramter ignore API error (when set, the Adapter tries to ignore some API-Errors)

### 0.0.4 (2020-04-21)
- added: preconNow => starts precon (hvac)

### 0.0.3 (2020-04-16)
- added: totalMileage

### 0.0.2 (2020-04-15)
- first working version for github
- reads out some values (as shown in the Features list)

### 0.0.1 (2020-04-06)
- nonworking version, just to create initial repo on github
- code taken 1:1 from iobroker.zoe
- small adjustments, first access to the new renault api

## License
The MIT License (MIT)

Copyright (c) 2024-2026 RenePilz <rene@pilz.cc>

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