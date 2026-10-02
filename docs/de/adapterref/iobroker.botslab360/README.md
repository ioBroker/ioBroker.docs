---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.botslab360/README.md
title: ioBroker.botslab360
hash: P4PNjxI2RbXsk/6KBGPZg6sAAUUb8SDQJ07aBdLQaqg=
---
![Logo](../../../en/adapterref/iobroker.botslab360/admin/botslab360.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.botslab360.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.botslab360.svg)
![Anzahl der Installationen](https://iobroker.live/badges/botslab360-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/botslab360-stable.svg)
![NPM](https://nodei.co/npm/iobroker.botslab360.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.botslab360/workflows/Test%20and%20Release/badge.svg)

# ioBroker.botslab360

## botslab360-Adapter für ioBroker

Adapter für Botslab / 360 Saugroboter.

## Aufstellen

1. Erstelle eine Instanz des Adapters.
2. Wählen Sie den **Server** aus, der zu der App passt, in der Ihr Konto erstellt wurde:
   - **International (Botslab)** für Konten aus der Botslab-App.
   - **China (360Robot)** für Konten der 360Robot-App (`q.smart.360.cn` Verwenden Sie diese Option, wenn die internationale Anmeldung meldet, dass das Konto nicht existiert.
3. Geben Sie die **E-Mail-Adresse** und **das Passwort** Ihres Kontos ein.
4. Wählen Sie für den internationalen Server die **Region** aus, zu der Ihr Konto gehört (na1 / eu1 / ap1). Der Adapter versucht automatisch, die anderen Regionen zu finden, falls das Konto in der ausgewählten Region nicht gefunden wird. Die Region wird für den chinesischen Server ignoriert.

### Captcha

Wird beim Login ein Captcha abgefragt, speichert der Adapter das Bild als Daten-URL in `info.captchaImage` und protokolliert es auch direkt (laden Sie das Protokoll herunter, um es anzuzeigen). Lösen Sie das Problem und schreiben Sie den Code dazu. `info.captchaRequest` Um die Anmeldung fortzusetzen.

## Steuern

Unter remote können Befehle gesendet werden.

## Status

Der Status Abruf für Verbrauchsgüter und Karte muss manuell getriggert werden. Beim China-Server werden Gerätezustände asynchron über eine Push-Verbindung geliefert und unter `<sn>.status` veröffentlicht.

## Fragen und Diskussion

<https://forum.iobroker.net/topic/60046/test-adapter-360-staubsauger-botslab>

## Changelog

### 0.3.1

- (TA2k) Fix the China (360Robot) session mint (errno 100) and recognize the expired-session error so login and device polling work

### 0.3.0

- (TA2k) Add a China (360Robot / q.smart.360.cn) backend selectable via the new Server option, for accounts that cannot log in on the international servers

### 0.2.1

- (TA2k) Auto-retry other regions when the account is not found; verbose debug logging; log the captcha image inline

### 0.2.0

- (TA2k) Switch to headless email/password login on the /v1 API; cookie login is no longer required

### 0.1.0

- (TA2k) Add login with an existing 360 web session

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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