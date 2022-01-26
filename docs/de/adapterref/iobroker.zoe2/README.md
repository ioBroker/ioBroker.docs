---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zoe2/README.md
title: iobroker.zoe2
hash: xATBsHPQs9reFoRoo/mvwZcvKKOax41Is81G+jX0Plc=
---
![Logo](../../../en/adapterref/iobroker.zoe2/admin/zoe.png)

![Build-Status](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)
![Bekannte Schwachstellen](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zoe2.svg)
![Lizenz](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)

#iobroker.zoe2
=================

**Tests:**

**Downloads**

**Lizenz:**

**Eigenschaften:** [![Funktionsanfragen](https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

Einfacher ioBroker-Adapter, um einige Grundwerte von Renault ZOE zu erhalten und in ioBroker zu verwenden.

WICHTIG!!! WENN SIE VON EINER VERSION VOR 0.2.2 AKTUALISIEREN, MÜSSEN SIE IHR PASSWORT NEU EINGEBEN, WEIL AB 0.2.2 DAS PASSWORT VERSCHLÜSSELT GESPEICHERT IST!!!

BITTE BEACHTEN SIE: DIESER ADAPTER VERWENDET DIE GLEICHE API WIE DIE MY RENAULT APP. ABER SIE MÜSSEN MEINE RENAULT-APP EINRICHTEN, BEVOR SIE DIESEN ADAPTER VERWENDEN. dh auf Android: https://play.google.com/store/apps/developer?id=RENAULT+SAS - wenn Sie die alte API verwenden möchten, verwenden Sie bitte https://github.com/fungus75/ioBroker.zoe stattdessen.

BITTE BEACHTEN SIE: DIES IST EIN SEHR FRÜHER ENTWICKLUNGSSTAND, VERWENDUNG AUF EIGENES RISIKO

BITTE BEACHTEN SIE: NACH JEDEM UPDATE DES ADAPTERs GEHEN SIE ZUM SETUP-BILDSCHIRM, ÄNDERN SIE ETWAS, DAMIT SPEICHERN AKTIVIERT IST, ÄNDERN SIE ES ZURÜCK UND DRÜCKEN SIE SPEICHERN!

Wenn dieser Adapter in der ioBroker-Admin-Ansicht nicht verfügbar ist, verwenden Sie bitte den folgenden Befehl, um ihn zu installieren (von der Befehlszeile auf Ihrem ioBroker-Server):

```npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

Oder Sie verwenden den GitHub-Button (beschriftet: Von eigener URL installieren) in der Adapter-Ansicht und geben diese URL auf dem "anderen"-Tab ein. Damit kann auch auf die aktuelle Adapter-Version aktualisiert werden:

```https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

(Wenn diese URL nicht funktioniert, verwenden Sie stattdessen https://github.com/fungus75/ioBroker.zoe2.git)

Sie können die Methode verwenden, um den Adapter auf die neueste Version zu aktualisieren.

Danach sollte der Adapter in der ioBroker-Admin-Ansicht angezeigt werden.

### Aufbau
- Sie müssen Benutzername, Passwort und VIN wie in meiner Renault-App einstellen
- Diese Locales ("Laenderversionen") funktionieren derzeit: de_DE
- Eventuell benötigst du dazu ein My-Z.E.Connect oder ähnliche Dienste von Renault
- Nach dem Speichern dauerte das Erstellen der Objekte ca. 15 Minuten (zoe.0 usw.)

### Merkmale
- Lesen Sie diese Parameter von Zoe:
   - charge_level in Prozent
   - Aufladen als Boolean
   - als boolean gesteckt
   - verbleibende Reichweite in Kilometer
   - verbleibende Ladezeit
   - berechneter Ladeendpunkt (charging_finished_at)
   - Batterietemperatur
   - Außentemperatur (nicht so genau)
   - Ladeleistung
   - Batteriekapazität
   - BatterieVerfügbareEnergie
   - gpsLatitude und gpsLongitude, funktioniert nur auf neueren ZOEs
- Schreiben Sie diese Parameter:
   - preconNow: startet precon/hvac (schreiben Sie true an diesen Knoten oder drücken Sie die Taste)
   - chargeCancel: Beendet den Ladevorgang
   - chargeEnable: ermöglicht das Laden

Kontrollieren Sie das Laden:

Mit den beiden Tasten chargeCancel und chargeEnable kann die Ladefunktion gesteuert werden. Wenn chargeCancel gedrückt wird (oder in diesen Parameter true geschrieben wird), wird die Ladefunktion deaktiviert. ZOE sollte nicht aufgeladen werden, wenn das Netzkabel angeschlossen ist. Auf meinem ZOE der 1. Generation hat dies keine Auswirkungen, also funktioniert es vielleicht auf neueren ZOEs?

Sobald chargeEnable gedrückt wird (oder in diesen Parameter true geschrieben wird), sollte die Ladefunktion wieder funktionieren.

So geht's: chargeEnable erstellt einen Ladeplan, der jeden Tag zu der von Ihnen im Setup-Bildschirm definierten Stunde beginnt und 15 Minuten dauert. Das scheint der kürzeste einzustellende Betrag zu sein. Das vollständige Ausschalten des Ladens ist mit der aktuellen API (oder den Teilen der aktuellen API, die bekannt sind) nicht möglich.

Einige Parameter funktionieren nur auf neueren ZOEs.

### Getestet mit folgenden ZOEs:
- Zoe Phase 2 (Danke Jack-RK-24)
- Zoe R210 (1. Generation, getestet von fungus75)
- Zoe R90 (Danke arturwolf)

### Bitte beachten Sie!!
Die Kommunikation mit ZOE oder Renault-Services erfolgt nur während der Pausenzeiten mit 10 Minuten.
Wenn Sie also preconNow oder chargeNow drücken, dauert es bis zum nächsten Intervall, um es an ZOE zu senden und es dauert bis zum nächsten Intervall, um den Status zurück zu erhalten.

Die neue ZOE API von Renault scheint sehr lacy zu sein. Das heißt, es zeigt nur dann neue Werte an, wenn es etwas Wichtiges gibt.
Soweit ich herausgefunden habe, ist der Akkustand am wichtigsten. Das bedeutet d.h. die Außentemperatur wird nicht aktualisiert, wenn das Auto zu Hause steht. Nur wenn d.h. die ZOE lädt, die Außentemperatur wird aktualisiert. Wenn der Ladevorgang beendet ist, immer noch kein neues Update. Während der Fahrt wird der Akkustand immer niedriger und sollte daher sehr regelmäßig aktualisiert werden.

### Vielen Dank
https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren, https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome- neue-api-2020, https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html, https://github.com/edent/Renault-Zoe-API, https://github.com/jamesremuscat/pyze und https://github.com/hacf-fr/renault-api für deine tolle Dokumentation und Arbeit.

## Changelog

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