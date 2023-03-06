![Logo](admin/onvif.png)

# ioBroker.onvif

[![NPM version](https://img.shields.io/npm/v/iobroker.onvif.svg)](https://www.npmjs.com/package/iobroker.onvif)
[![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)](https://www.npmjs.com/package/iobroker.onvif)
![Number of Installations](https://iobroker.live/badges/onvif-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/onvif-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)](https://nodei.co/npm/iobroker.onvif/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF adapter for ioBroker

**Adapter for ONVIF cameras**

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Kameras hinzufügen

### Discovery:

Bei jedem Adapterstart wird mit dem in der Einstellungen eingetragen Benutzername und Passwort eine Discovery durchgeführt und versuch sich in die Kamera einzuloggen. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

In den Einstellungen kann man die Discovery manuell ausführen. Falls die Kameras unterschiedliche Zugangsdaten haben müssen die jeweils eingegeben werden und eine discovery durchgeführt werden. Im Log sieht man Details zu dem Prozess.

Damit eine Kamera neu erkannt wird muss sie einfach unter Objekte gelöscht werden.

### Manuelle Suche

Es können Kameras manuell gesucht werden, falls Discovery nicht funktioniert. Dazu muss eine IP Range und Ports eingegeben und manuell ausgeführt werden. Im Log sieht man Details zu dem Prozess.

## Datenpunkte

onvif.0.IP_PORT.events Events der Kamera wie z.b. Bewegungserkennung. Manchmal muss ein Event ausgelöst werden damit er angezeigt wird.

onvif.0.IP_PORT.general Generelle Information über die Kameras

onvif.0.IP_PORT.infos Informationen über die Kamera werden nur bei Adapterstart aktualisiert oder bei remote.refresh

Video und Snapshot URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Steuerung der Kamera

onvif.0.IP_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP_PORT.remote.gotoHomePosition PTZ Kamera in die HomePosition setzen

onvif.0.IP_PORT.remote.gotoPreset PTZ Kamera Preset Nummer auswählen

onvif.0.IP_PORT.remote.snapshot Speichert ein snapshot unter onvif.0.IP_PORT.snapshot

## Message

Adapter nimmt Message "snapshot" entgegen und gibt ein Bild zurück

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,
      type: "photo",
      caption: "Kamera 2",
    });
  }
});
```

## Bewegungsmeldung zu Telegram

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,
          type: "photo",
          caption: "Camera 2",
        });
      }
    });
  }
});
```

## Snapshot in vis einbinden

Wenn möglich die snapshotUri verwenden z.B.
onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hohe Last hat._

#### Den Datenpunkt aktualisieren via onvif.0.IP_PORT.remote.snapshot

Den Datenpunkt onvif.0.IP_PORT.snapshot ein `String img src` element zuordnen

Oder als Alternative falls `String img src` nicht funktioniert

Den Datenpunkt onvif.0.IP_PORT.snapshot als `HTML` element in die vis einfügen mit folgendem Inhalt

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

# English

## Add cameras

### Discovery:

Each time the adapter is started, a discovery is performed with the user name and password entered in the settings and an attempt is made to log in to the camera. If the camera has not yet been added under Objects.

You can perform the discovery manually in the settings. If the cameras have different credentials, you have to enter them and perform a discovery. In the log you can see the details of the process.

In order for a camera to be detected again, it must simply be deleted under Objects.

### Manual search

Cameras can be searched for manually if Discovery does not work. To do this, an IP range and ports must be entered and executed manually. In the log you can see details about the process.

## Data points

onvif.0.IP_PORT.events Events of the camera like e.g. motion detection. Sometimes you have to trigger the event to see it.

onvif.0.IP_PORT.general General information about the cameras

onvif.0.IP_PORT.infos Information about the camera is only updated at adapter start or at remote.refresh

Video and Snapshot URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Control of the camera

onvif.0.IP_PORT.remote.refresh Updating the info data

onvif.0.IP_PORT.remote.gotoHomePosition Set PTZ camera to home position

onvif.0.IP_PORT.remote.gotoPreset Select PTZ camera preset number

onvif.0.IP_PORT.remote.snapshot Save snapshot to onvif.0.IP_PORT.snapshot

## Message

Adapter receives message "snapshot" and returns image

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,

      type: "photo",

      caption: "camera2",
    });
  }
});
```

## Motion message to Telegram

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,

          type: "photo",

          caption: "Camera 2",
        });
      }
    });
  }
});
```

## Include snapshot in vis

Use snapshot url when possible

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

Do not use this datapoint as a stream because the load on the HDD is too high.

Assign a `String img src` element to the datapoint onvif.0.IP_PORT.snapshot

Add the datapoint onvif.0.IP_PORT.snapshot as `HTML` element to vis with the following content

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

## Discussions / Diskussion und Fragen

<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

### 1.0.2

- (TA2k) Fixed a reonnect and empty event bug

### 1.0.1

- (TA2k) initial new release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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

```

```
