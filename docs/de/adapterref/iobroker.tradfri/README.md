---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tradfri/README.md
title: ioBroker.tradfri
hash: 1/BdBjV+kOxM6ivEgzwqK0bKJ78VpMtF9v88n3GBAMA=
---
![Logo](../../../en/adapterref/iobroker.tradfri/admin/tradfri.png)

![Build-Status](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)
![Gesamtzahl der Benachrichtigungen](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)
![Anzahl der Installationen](http://iobroker.live/badges/tradfri-stable.svg)

# ioBroker.tradfri

## Anforderungen

- Linux (z. B. Raspberry Pi) / OSX / Windows
- NodeJS >= 12.x
- Trådfri-Tor

## Installation

1. Installieren Sie diesen Adapter über die iobroker-Admin-GUI oder über`npm install iobroker.tradfri --production`
2. Fügen Sie in der ioBroker-GUI eine Adapterinstanz hinzu.
3. Konfigurieren Sie die Instanz, indem Sie die IP-Adresse/den Hostnamen Ihres Gateways und den Sicherheitscode eingeben, der sich auf dem Etikett an der Unterseite befindet.

### Behebung von Installationsproblemen:

#### Linux/OSX:

Stellen Sie sicher, dass Sie die aktuellste veröffentlichte Version installieren. Falls Kompilierungsfehler auftreten, müssen Sie möglicherweise build-essential installieren.

```
apt-get -y install build-essential
```

#### Windows:

Wenn Sie ältere NodeJS-Versionen (< 10) verwenden, kann die Installation mit folgendem Fehler im Protokoll fehlschlagen:

```
Can't find Python executable "python", you can set the PYTHON env variable.
```

Um das Problem zu beheben, öffnen Sie eine administrative Shell:

1. Drücken Sie die<kbd> ⊞ Windows</kbd> Schlüssel
2. Eingeben`cmd` , Presse<kbd> Strg</kbd> +<kbd> Schicht</kbd> +<kbd> Eingeben</kbd>
3. Bestätigen Sie die Benutzerkontensteuerung (UAC) und führen Sie folgenden Befehl aus:

```
npm install --add-python-to-path --global windows-build-tools
```

Dies kann eine Weile dauern... danach sollte die Installation erfolgreich sein.

## Senden benutzerdefinierter CoAP-Pakete

Sie können benutzerdefinierte CoAP-Pakete von anderen Adaptern senden, indem Sie`sendTo` Beispiel aus JavaScript:

```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```

Der`options` Das Objekt sieht wie folgt aus:

```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```

Das Ergebnisobjekt`ret` sieht folgendermaßen aus:

```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog
[Older changes](https://github.com/AlCalzone/ioBroker.tradfri/blob/master/CHANGELOG_OLD.md)
<!--
	Placeholder for next release:
	### __WORK IN PROGRESS__
-->
### 3.1.3 (2022-04-24)
* Fix: support for Node.js 18

### 3.1.2 (2021-12-31)
* Fixed a typo preventing the adapter from controlling air purifiers

### 3.1.1 (2021-12-21)
* Fix: actually create states for STARKVIND Air Purifier

### 3.1.0 (2021-12-19)
* Add support for STARKVIND Air Purifier

### 3.0.2 (2021-12-03)
* Improve support for older browsers
* Update dependencies

## License
The MIT License (MIT)

Copyright (c) 2017-2022 AlCalzone <d.griesel@gmx.net>

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