---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-client
hash: ofz++iad9eq0lluL5KUB1IuSL9EjZGwEEsw5xWtEUxg=
---
![Logo](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![Anzahl der Installationen](http://iobroker.live/badges/mqtt-client-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![NPM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

# IoBroker.mqtt-client
## Adaptereinstellungen
![Adapter](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### Zu Connect-Thema und -Nachricht
Der ```on connect message``` wird jedes Mal an den ```on connect topic``` veröffentlicht, wenn der Client eine Verbindung zum Server herstellt oder wieder herstellt.

### Zuletzt Thema und Nachricht
Der ```last will message``` wird jedes Mal an den ```last will topic``` veröffentlicht, wenn der Client eine Verbindung zum Server herstellt oder wieder herstellt.
Der Server speichert diese Nachricht und sendet sie an seine Abonnenten, wenn der Client die Verbindung trennt.

### Abonnements
Durch Kommas getrennte Liste von Themen, die nicht von bestehenden Zuständen abgedeckt sind.
Empfangene Nachrichten werden in Zustände innerhalb des Namensraums des Adapters (z. B. mqtt.0) konvertiert und abonniert.
Sie können Themen entfernen, nachdem alle Status erstellt wurden.

### Präfix veröffentlichen
Beim Veröffentlichen wird dies allen Themen vorangestellt.
Standard ist leer (kein Präfix).

### Präfix abonnieren
Beim Abonnieren wird dies allen Themen vorangestellt.
Standard ist leer (kein Präfix).

## Zustandseinstellungen
![Zustand](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Aktiviert
Aktiviert oder deaktiviert die mqtt-client-Funktionalität für diesen Zustand.
Durch das Deaktivieren werden alle mqtt-client-Einstellungen aus diesem Zustand gelöscht.

### Thema
Das Thema, in dem dieser Zustand veröffentlicht und abonniert wird.
Standard: Zustands-ID in ein mqtt-Thema umgewandelt.

### Veröffentlichen
* ```enable``` Status wird veröffentlicht
* Der Status „nur Änderungen“ wird nur veröffentlicht, wenn sich sein Wert ändert
* ```als Objekt``` Der gesamte Zustand wird als Objekt veröffentlicht
* ```qos``` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```retain``` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Abonnieren
* ```enable```-Thema wird abonniert und der Status wird entsprechend aktualisiert
* ```changes only``` Status wird nur geschrieben, wenn sich der Wert geändert hat
* „as object“-Meldungen werden als Objekte interpretiert
* ```qos``` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` bei Zustandsaktualisierungen wird das ack-Flag entsprechend gesetzt

#### Notiz
* Wenn ack auf true gesetzt ist, werden die Objekte ack überschrieben, siehe ```as object```
* Um Nachrichtenschleifen zu verhindern, ist ```changes only``` immer aktiviert, wenn sowohl Publish als auch Subscribe aktiviert sind

## MACHEN
* Präfixe testen
* Verbinden/Wiederverbinden ohne saubere Sitzung

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog
### 1.5.0 (2022-01-26)
* IMPORTANT: This adapter now required at least js-controller 3.3.x
* (Apollon77) Fix crash cases

### 1.4.1 (2022-01-26)
* (bluefox) js-controller 3.3 optimizations

### 1.4.0 (2021-07-16)
* IMPORTANT: This adapter now required at least js-controller 2.0.0
* (Apollon77) js-controller 3.3 optimizations
* (AlCalzone) Unpublished expired states
* (AlCalzone) Only handle stat values if state exists

### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Update of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2016-2022 Pmant

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