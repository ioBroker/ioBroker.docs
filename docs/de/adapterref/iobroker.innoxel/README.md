---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: YWvSHO+X/h/ZGS5buCxI8XnfX8yhZcFSbdgMIybvluo=
---
![Logo](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![Knoten](https://img.shields.io/node/v-lts/iobroker.innoxel)
![NPM-Version](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.innoxel)
![Anzahl der Installationen](https://iobroker.live/badges/innoxel-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/innoxel-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![NPM](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Adapter für Innoxel Master 3 (https://innoxel.ch)

![Testen und freigeben](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Anforderungen
- NodeJS >= 14.x
- ioBroker >= 4.x, mit Admin >= 5.x
- Innoxel Master 3 Smart Home-System

## Installation
Bis der Adapter Teil des stabilen Repositorys ist, können Sie die neueste Version installieren, indem Sie den Expertenmodus in ioBroker aktivieren und den Adapter von npm installieren. Installieren Sie es nicht direkt von Github, dies führt zu einem Fehler beim Start des Adapters ("cannot find start file").

Erstellen Sie nach der Installation eine neue Instanz und konfigurieren Sie die Einstellungen:

- Verbindungseinstellungen für den Zugriff auf den innoxel master
    -   IP Adresse
    -   Hafen
    -   Nutzername
    -   Passwort
- Polling-Intervalle für verschiedene Bereiche
    - Zustandsänderungen (z.B. Schalter, Dimmer)
    - Raumklima / Thermostate
    -   Wetter
    - Einzelheiten zum Innoxel-Master-Gerät

## Unterstützte Module und Firmware
Eine Vorabversion dieses Adapters funktioniert seit mehr als 2 Jahren mit Firmware 1.4.1.0 und dann 1.5.1.0.

Diese ursprünglich veröffentlichte Version wurde mit der Firmware 1.6.0.0 getestet.

Folgende Module wurden getestet/werden unterstützt:

- Innoxel-Master 3
- Schalter 8 G1
- Motor 4 x 230 VAC G1
- Dimmen Sie 4 x 600 VA
- Schnupper-RGB
- Therme
- Wetterstation P03/3-RS485-CET

Wenn es für Sie mit verschiedenen Modulen funktioniert oder Sie andere Module haben, die nicht funktionieren, können Sie gerne ein Problem eröffnen.

## Mitteilungen
Der Adapter unterstützt die in den folgenden Abschnitten beschriebenen Nachrichten.

### TriggerInModule
Simulieren Sie das Drücken einer Taste auf einem „Taster“.

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code> ist die ID/Adresse des &quot;Tasters&quot;
- <code>channelId</code> ist der Index des Buttons auf dem &quot;Taster&quot;
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

### SetDimValue
Simulieren Sie das Drücken einer Taste auf einem „Taster“.

```ts
sendTo("innoxel.0", "setDimValue", "<moduleId>:<channelId>:<dimValue>:<dimSpeed>", callback);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
    // do something after value has been set
});
```

- <code>moduleId</code> ist die ID/Adresse des Dimmermoduls
- <code>channelId</code> ist der Kanal des Dimmers auf dem Modul
- <code>dimValue</code> ist der einzustellende Wert in Prozent (0-100)
- <code>dimSpeed</code> (optional) ist die zu verwendende Dimmgeschwindigkeit (0-15)
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

### Temperatur einstellen
Heiz- oder Kühltemperatur einstellen.

```ts
sendTo("innoxel.0", "setTemperature", "<moduleId>:<temperatureType>:<temperature>", callback);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code> ist die ID/Adresse des Raumklimamoduls
- <code>temperatureType</code> ist der einzustellende Temperaturtyp (absenceSetbackTemperatureCooling, absenceSetbackTemperatureHeating, nightSetbackTemperatureCooling, nightSetbackTemperatureHeating, setTemperatureCooling, setTemperatureHeating, )
- <code>temperature</code> einzustellende Temperatur in 0,5°-Schritten. Je nach Typ gibt es auch einen Min/Max-Wert
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2023-04-22)

-   (matthsc) allow to set heating/cooling temperatures
-   (matthsc & dependabot) dependency updates

### 0.2.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc & dependabot) dependency updates

### 0.1.5 (2022-02-12)

-   (matthsc) don't always terminate adapter on errors while updating identities
-   (matthsc) improve error messages

### 0.1.4 (2022-01-25)

-   (matthsc) fix double decryption issues with password in adapter admin
-   (matthsc) change input field types in adapter admin

### 0.1.3 (2022-01-16)

-   (matthsc) improve error messages

### 0.1.2 (2022-01-07)

-   (matthsc) catch authentication errors
-   (matthsc) fix authentication
-   (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2023 matthsc <matthsc@gmx.net>

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