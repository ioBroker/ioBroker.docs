---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: TqfTBZ14ipWOHZEM5vYMcTxv//UOU3mtRfvsOq3kFj8=
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

![Testen und Freigeben](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Anforderungen
– NodeJS >= 20.x
- ioBroker >= 6.0.11, mit Admin >= 6.x
- Innoxel Master 3 Smart Home-System

## Installation
Bis der Adapter Teil des stabilen Repositorys ist, können Sie die neueste Version installieren, indem Sie den Expertenmodus in ioBroker aktivieren und den Adapter von npm installieren. Installieren Sie ihn nicht direkt von Github, da dies beim Start des Adapters zu einem Fehler führt („Startdatei nicht gefunden“).

Der Adapter kann direkt aus den stabilen/Beta-Repositories installiert werden. Erstellen Sie nach der Installation eine neue Instanz und konfigurieren Sie die Einstellungen:

- Verbindungseinstellungen für den Zugriff auf Innoxel Master
- IP-Adresse
  - Hafen
- Benutzername
- Passwort
- Abfrageintervalle für verschiedene Bereiche
- Zustandsänderungen (z.B. Schalter, Dimmer)
- Raumklima / Thermostate
  - Wetter
- Details zum Innoxel-Mastergerät (erfordert Administratorrechte für den Benutzer, der eine Verbindung zum Innoxel-Master herstellt)

Bitte beachten: Installieren Sie den Adapter nicht direkt von Github, dies führt zu einem Fehler beim Start des Adapters („Startdatei nicht gefunden“).

## Unterstützte Module und Firmware
Eine Vorabversion dieses Adapters funktionierte mehr als 2 Jahre lang mit der Firmware 1.4.1.0 und dann 1.5.1.0.

Die ursprünglich veröffentlichte Version wurde mit der Firmware 1.6.0.0 getestet.

Folgende Module wurden getestet/werden unterstützt:

- Innoxel Master 3
Schalter 8 G1
- Motor 4 x 230 VAC G1
- Dimmbar 4 x 600 VA
- Taster RGB
- Thermo
- Wetterstation P03/3-RS485-CET

Wenn es bei Ihnen mit anderen Modulen funktioniert oder Sie andere Module haben, die nicht funktionieren, können Sie gerne ein Problem melden.

## Nachrichten
Der Adapter unterstützt die in den folgenden Abschnitten beschriebenen Nachrichten.

### Trigger im Modul
Simulieren Sie das Drücken einer Taste auf einem „Taster“.

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> ist die ID/Adresse des „Tasters“
- <code>channelId</code> ist der Index der Schaltfläche auf dem „Taster“
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn die Aktion ausgeführt wurde

### SetZDimWert
Simulieren Sie das Drücken einer Taste auf einem „Taster“.

```ts
sendTo(
  "innoxel.0",
  "setDimValue",
  "<moduleId>:<channelId>:<dimValue>:<dimSpeed>",
  callback
);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
  // do something after value has been set
});
```

- <code>moduleId</code> ist die ID/Adresse des Dimmermoduls
- <code>channelId</code> ist der Kanal des Dimmers auf dem Modul
- <code>dimValue</code> ist der einzustellende Prozentwert (0-100)
- <code>dimSpeed</code> (optional) ist die zu verwendende Dimmgeschwindigkeit (0-15)
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn die Aktion ausgeführt wurde

### Temperatur einstellen
Heiz- oder Kühltemperatur einstellen.

```ts
sendTo(
  "innoxel.0",
  "setTemperature",
  "<moduleId>:<temperatureType>:<temperature>",
  callback
);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> ist die ID/Adresse des Raumklimamoduls
- <code>temperatureType</code> ist der einzustellende Temperaturtyp (absenceSetbackTemperatureCooling, absenceSetbackTemperatureHeating, nightSetbackTemperatureCooling, nightSetbackTemperatureHeating, setTemperatureCooling, setTemperatureHeating, )
- <code>temperature</code> , die in 0,5°-Schritten eingestellt werden soll. Es gibt auch einen Min/Max-Wert, abhängig vom Typ
- <code>callback</code> (optional) Rückruffunktion, die aufgerufen wird, wenn die Aktion ausgeführt wurde

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2024-11-17)

- (matthsc) drop support for Node 18
- (matthsc) switch admin to json config
- (matthsc) prepare for future controller versions (fix deprecation warnings)
- (matthsc & dependabot) dependency updates

### 0.4.2 (2024-08-11)

- (matthsc & dependabot) dependency updates

### 0.4.1 (2024-03-23)

- (matthsc) log soap messages in log level silly
- (matthsc) fix another potential error when updating modules
- (matthsc & dependabot) dependency updates

### 0.4.0 (2024-03-20)

- (matthsc) fix potential error when processing identities
- (matthsc) drop support for Node 16

### 0.3.1 (2023-05-23)

- (matthsc) change actual value from temperature sensor if it doesn't provide values
- (matthsc & dependabot) dependency updates

### 0.3.0 (2023-04-22)

- (matthsc) allow to set heating/cooling temperatures
- (matthsc & dependabot) dependency updates

### 0.2.0 (2022-09-28)

- (matthsc) drop support for Node 12 and js-controller 3
- (matthsc) implement migrations from create-adapter
- (matthsc & dependabot) dependency updates

### 0.1.5 (2022-02-12)

- (matthsc) don't always terminate adapter on errors while updating identities
- (matthsc) improve error messages

### 0.1.4 (2022-01-25)

- (matthsc) fix double decryption issues with password in adapter admin
- (matthsc) change input field types in adapter admin

### 0.1.3 (2022-01-16)

- (matthsc) improve error messages

### 0.1.2 (2022-01-07)

- (matthsc) catch authentication errors
- (matthsc) fix authentication
- (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

- (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

- (matthsc) initial release

## License

MIT License

Copyright (c) 2024 matthsc <matthsc@gmx.net>

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