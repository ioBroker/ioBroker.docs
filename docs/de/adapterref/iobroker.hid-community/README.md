---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hid-community/README.md
title: ioBroker.hid-community
hash: wrdc7UMRCczdXq6tBx2ACtPn3vjI1vq4ZZHKf7MXwTY=
---
![Logo](../../../en/adapterref/iobroker.hid-community/admin/hid.png)

![Anzahl der Installationen](http://iobroker.live/badges/hid-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hid-community.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.hid-Community
## Beschreibung
Adapter für HID-Geräte z.B. Apple-Fernbedienung

## Ersterstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.hid erstellt, aber nicht mehr gepflegt, also haben wir ihn in die iobroker-community verschoben, damit Fehler behoben werden können. Danke @soef für seine Arbeit.

## Installation
Bitte installieren Sie bia Admin

Es kann sein, dass folgende zusätzliche Dinge benötigt werden

* **Berechtigungen vorbereiten**: `iob fix` ausführen
* **Zusätzliche Pakete installieren**: `sudo apt install libusb-1.0-0-dev`
* **Richtige Rechte setzen**: Wenn das Gerät nicht geöffnet werden kann, schauen Sie bitte unter https://github.com/node-hid/node-hid#udev-device-permissions nach

## Zustände
Es gibt zwei Statusgruppen, Raw und Key. Die Schlüsselgruppe wird nur ausgelöst, wenn eine Zuordnung gefunden wird.

Bei einem Ereignis ändert sich nur einer der Zustände xxx.double, xxx.single und xxx.long.
Der Zustand xxx.dsl liefert die Ergebnisse .double, single oder long.
Aktion bedeutet abwärts, aufwärts oder wiederholen.

## Zuordnungen
Fügen Sie den Zuordnungsabschnitt in der Datei io-package.json hinzu oder bearbeiten Sie ihn, um die Namen der Tastencodes anzuzeigen.
Dies ist nicht notwendig, die Rohdatenstände werden trotzdem erstellt.

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

#### Anforderungen
Das node-hid-Modul funktioniert unter Windows 10 erst, wenn Sie eine kleine Änderung am node-hid-Projekt vornehmen.
Nach der Installation von iobroker.hid-community bearbeiten:

```
<path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid/hidapi/windows/hid.c
```

Finden:

```
open_device
```

Ändern Sie den 2. und 3. Parameter des Funktionsaufrufs „CreateFileA“:

```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ...

	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...
}
```

Um das node-hid-Modul neu zu erstellen, wechseln Sie in das Verzeichnis:

```
cd <path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid
```

ausführen:

```
npm install --build-from-source
```

Starten Sie das iobroker.hid-Community-Modul neu ...
-->

## Changelog
### 0.3.0 (2023-01-04)
* Renamed to hid-community

### 0.2.0 (2022-12-30)
* General updates

## License
The MIT License (MIT)

Copyright (c) 2015-2023 ioBroker-Community, soef <soef@gmx.net>

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