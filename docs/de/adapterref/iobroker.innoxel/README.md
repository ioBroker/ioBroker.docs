---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: HEjFi/yoc2LNXdA4xAbLmvgbX1xYMOhBWzioRLUNoF0=
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

![Test und Freigabe](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Anforderungen
- NodeJS >= 22.x
- ioBroker >= 6.0.11, mit Admin >= 6.x
- Innoxel Master 3 Smart-Home-System

## Installation
Bis der Adapter Teil des stabilen Repositorys ist, können Sie die neueste Version installieren, indem Sie den Expertenmodus in ioBroker aktivieren und den Adapter über npm installieren. Installieren Sie ihn nicht direkt von GitHub, da dies beim Start des Adapters zu einem Fehler führt („Startdatei nicht gefunden“).

Der Adapter kann direkt aus den Stable-/Beta-Repositories installiert werden. Nach der Installation erstellen Sie eine neue Instanz und konfigurieren die Einstellungen:

- Verbindungseinstellungen für den Zugriff auf den Innoxel-Master
- IP-Adresse
  - Hafen
- Benutzername
- Passwort
- Abstimmungsintervalle für verschiedene Gebiete
- Zustandsänderungen (z. B. Schalter, Dimmer)
- Raumklima / Thermostate
  - Wetter
- Details zum Innoxel-Mastergerät (erfordert Administratorrechte für den Benutzer, der die Verbindung zum Innoxel-Master herstellt)

Bitte beachten Sie: Installieren Sie den Adapter nicht direkt von GitHub, da dies beim Start des Adapters zu einem Fehler führt („Startdatei nicht gefunden“).

## Unterstützte Module und Firmware
Eine Vorabversion dieses Adapters funktioniert seit mehr als 2 Jahren mit der Firmware 1.4.1.0 und anschließend mit 1.5.1.0.

Die ursprünglich veröffentlichte Version wurde mit Firmware 1.6.0.0 getestet.

Folgende Module wurden getestet/werden unterstützt:

- Innoxel Master 3
- Schalter 8 G1
- Motor 4 x 230 VAC G1
- Abmessungen 4 x 600 VA
- Taster RGB
- Thermo
- Wetterstation P03/3-RS485-CET

Falls es bei Ihnen mit anderen Modulen funktioniert oder falls Sie andere Module haben, die nicht funktionieren, können Sie gerne ein Problem melden.

## Nachrichten
Der Adapter unterstützt die in den folgenden Abschnitten beschriebenen Nachrichten.

### TriggerInModule
Simulieren Sie das Drücken eines Knopfes an einem „Taster“.

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> ist die ID/Adresse des &quot;Testers&quot;
- <code>channelId</code> ist der Index der Schaltfläche auf dem &quot;Taster&quot;
- <code>callback</code> (optional): Callback-Funktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

### SetDimValue
Simulieren Sie das Drücken eines Knopfes an einem „Taster“.

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

- <code>moduleId</code> ist die ID/Adresse des Dimmermoduls.
- <code>channelId</code> ist der Kanal des Dimmers am Modul
- <code>dimValue</code> ist der einzustellende Wert in Prozent (0-100).
- <code>dimSpeed</code> (optional) ist die zu verwendende Dimmgeschwindigkeit (0-15).
- <code>callback</code> (optional): Callback-Funktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

### SetTemperature
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
- <code>temperatureType</code> ist der einzustellende Temperaturtyp (abwesenheitsbedingteRücksetztemperaturKühlung, abwesenheitsbedingteRücksetztemperaturHeizung, nachtsbedingteRücksetztemperaturKühlung, nachtsbedingteRücksetztemperaturHeizung, setTemperatureKühlung, setTemperatureHeizung, )
- <code>temperature</code> : Die einzustellende Temperatur in 0,5°-Schritten. Es gibt außerdem einen Minimal-/Maximalwert, abhängig vom Typ.
- <code>callback</code> (optional): Callback-Funktion, die aufgerufen wird, wenn eine Aktion ausgeführt wurde

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-05-16)
- (matthsc) implement adapter checker feedback and create-adapter migrations
- (copilot) Adapter requires node.js >= 22 now
- (matthsc & dependabot) dependency updates

### 1.0.1 (2024-12-09)
- (matthsc) implement adapter checker feedback
- (matthsc) cleanup changelog

### 1.0.0 (2024-11-17)

- (matthsc) drop support for Node 18
- (matthsc) switch admin to json config
- (matthsc) prepare for future controller versions (fix deprecation warnings)
- (matthsc & dependabot) dependency updates

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 matthsc <matthsc@gmx.net>

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