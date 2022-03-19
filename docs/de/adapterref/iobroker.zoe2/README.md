---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zoe2/README.md
title: iobroker.zoe2
hash: oW9VhDORgC2vmTQS4upQauxpQQ+JToYEbO/FNWWyeJs=
---
![Logo](../../../en/adapterref/iobroker.zoe2/admin/zoe.png)

![Build-Status](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)
![Bekannte Schwachstellen](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zoe2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zoe2-installed.svg)
![Lizenz](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)

# Iobroker.zoe2
=================

**Tests:**

**Downloads**

**Lizenz:**

**Eigenschaften:** [![Funktionsanfragen](https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

Einfacher ioBroker-Adapter, um einige Grundwerte von Renault ZOE zu erhalten und in ioBroker zu verwenden.

WICHTIG!!! WENN SIE VON EINER VERSION VOR 0.2.2 AKTUALISIEREN, MÜSSEN SIE IHR PASSWORT NEU EINGEBEN, WEIL AB 0.2.2 DAS PASSWORT VERSCHLÜSSELT GESPEICHERT WIRD!!!

**API-SCHLÜSSEL!!! WENN DER ADAPTER NICHT FUNKTIONIERT, SCHAUEN SIE BITTE IMMER AUF https://github.com/fungus75/ioBroker.zoe2/wiki, WEIL RENAULT HÄUFIG IHREN API-SCHLÜSSEL ÄNDERT!!!**

BITTE BEACHTEN SIE: DIESER ADAPTER VERWENDET DIESELBE API WIE DIE MY RENAULT APP. SIE MÜSSEN ABER MEINE RENAULT-APP EINRICHTEN, UM ZU ARBEITEN, BEVOR SIE DIESEN ADAPTER VERWENDEN. dh auf Android: https://play.google.com/store/apps/developer?id=RENAULT+SAS - wenn Sie die alte API verwenden möchten, verwenden Sie bitte https://github.com/fungus75/ioBroker.zoe stattdessen.

BITTE BEACHTEN SIE: DIES IST EIN SEHR FRÜHER ENTWICKLUNGSSTAND, NUTZUNG AUF EIGENE GEFAHR

BITTE BEACHTEN SIE: NACH JEDEM ADAPTER-UPDATE GEHEN SIE ZUM SETUP-BILDSCHIRM, ÄNDERN SIE ETWAS, DASS DAS SPEICHERN AKTIVIERT IST, ÄNDERN SIE ES ZURÜCK UND DRÜCKEN SIE SPEICHERN!

Falls dieser Adapter nicht auf der ioBroker-Admin-Ansicht verfügbar ist, verwenden Sie bitte den folgenden Befehl, um ihn zu installieren (von der Befehlszeile auf Ihrem ioBroker-Server):

```npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

Oder Sie verwenden den GitHub-Button (Beschriftung: Von eigener URL installieren) in der Adapter-Ansicht und geben diese URL auf dem "Other"-Tab ein. Dies kann auch zum Update auf die aktuelle Adapter-Version verwendet werden:

```https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

(wenn diese URL nicht funktioniert, verwenden Sie stattdessen https://github.com/fungus75/ioBroker.zoe2.git)

Sie können die Methode verwenden, um den Adapter auf die neueste Version zu aktualisieren.

Danach sollte der Adapter in der ioBroker-Admin-Ansicht erscheinen.

### Aufbau
- Sie müssen Benutzername, Passwort und Fahrgestellnummer festlegen, wie Sie es in meiner Renault-App getan haben
- Diese Länderversionen funktionieren derzeit: de_DE
- Möglicherweise benötigen Sie My-Z.E.Connect oder ähnliche Dienste von Renault, um dies zu nutzen
- Nach dem Speichern dauerte es etwa 15 Minuten, um die Objekte zu erstellen (zoe.0 usw.)

### Merkmale
- Lesen Sie diese Parameter von Zoe:
   - charge_level in Prozent
   - Laden als boolescher Wert
   - als boolean aufgesteckt
   - Restreichweite in Kilometer
   - verbleibende Ladezeit
   - berechneter Ladeendpunkt (charging_finished_at)
   - Batterietemperatur
   - Außentemperatur (nicht so genau)
   - Ladeleistung
   - Batteriekapazität
   - BatterieVerfügbare Energie
   - gpsLatitude und gpsLongitude, funktioniert nur auf neueren ZOEs
- Schreiben Sie diese Parameter:
   - preconNow: startet precon/hvac (true auf diesen Knoten schreiben oder die Taste drücken)
   - chargeCancel: stoppt den Ladevorgang
   - chargeEnable: ermöglicht das Aufladen

Steuerladung:

Mit den beiden Tasten chargeCancel und chargeEnable kann die Ladefunktion gesteuert werden. Wenn chargeCancel gedrückt wird (oder true in diesen Parameter geschrieben wird), wird die Ladefunktion deaktiviert. ZOE sollte nicht aufgeladen werden, wenn das Netzkabel angeschlossen ist. Auf meinem ZOE der 1. Generation hat dies keine Auswirkung, also funktioniert es vielleicht auf neueren ZOEs?

Sobald chargeEnable gedrückt wird (bzw. true in diesen Parameter geschrieben wird), sollte die Ladefunktion wieder funktionieren.

Wie wird das gemacht: chargeEnable erstellt einen Ladeplan, der jeden Tag zu der von Ihnen im Setup-Bildschirm festgelegten Uhrzeit beginnt und 15 Minuten dauert. Das sieht so aus, als wäre dies die kürzeste einzustellende Menge. Das vollständige Abschalten des Ladevorgangs ist mit der aktuellen API (oder den bekannten Teilen der aktuellen API) nicht möglich.

Einige Parameter funktionieren nur auf neueren ZOEs.

### Getestet mit folgenden ZOEs:
- Zoe Phase 2 (Danke Jack-RK-24)
- Zoe R210 (1. Generation, getestet von fungus75)
- Zoe R90 (Dank arturwolf)

### Bitte beachten Sie!!
Die Kommunikation mit ZOE oder Renault-Services erfolgt nur während der Intervallzeiten von 10 Minuten.
Wenn Sie also preconNow oder chargeNow drücken, dauert es bis zum nächsten Intervall, um es an ZOE zu senden, und es dauert bis zum nächsten Intervall, um den Status zurückzuerhalten.

Die neue ZOE-API von Renault scheint sehr lasch zu sein. Das bedeutet, dass es nur dann neue Werte anzeigt, wenn es etwas Wichtiges gibt.
Soweit ich herausgefunden habe, ist das Wichtigste der Akkustand. Das bedeutet z.B. die Außentemperatur wird nicht aktualisiert, wenn das Auto zu Hause steht. Nur wenn z.B. der ZOE lädt, wird die Außentemperatur aktualisiert. Wenn der Ladevorgang beendet ist, immer noch kein neues Update. Während der Fahrt wird der Batteriestand immer niedriger und sollte daher sehr regelmäßig aktualisiert werden.

### Danke
https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren, https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome- neue-api-2020, https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html, https://github.com/edent/Renault-Zoe-API, https://github.com/jamesremuscat/pyze und https://github.com/hacf-fr/renault-api für Ihre großartige Dokumentation und Arbeit.

## Changelog

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

Copyright (c) 2021 RenePilz <rene@pilz.cc>

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