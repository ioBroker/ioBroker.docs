---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: fSnqPVjJjTyJTJj/UZea9dcomRiNu92/HLbsmdqYpvc=
---
![Logo](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## IP-Kamera-Adapter für ioBroker
Sie können Ihre Web-/IP-Kameras in vis und andere Visualisierungen integrieren.
Wenn Sie eine Kamera mit dem Namen `cam1` konfigurieren, ist sie auf dem Webserver unter `http(s)://iobroker-IP:8082/cameras.0/cam1` verfügbar.

**Verwenden Sie genau diese URL – ohne Dateiendung.** Jede Anfrage an diese URL ruft ein neues Bild von der Kamera ab, sodass ein regelmäßiges Neuladen ein Livebild liefert.

Der Adapter speichert das letzte Bild zusätzlich als Datei unter `cameras.0/cam1.jpg`, die der Webserver zufällig auch unter `http(s)://iobroker-IP:8082/cameras.0/cam1.jpg` bereitstellt. Diese Datei wird nur beim Start des Adapters und bei der Verarbeitung einer `image`-Nachricht überschrieben – sie wird **nicht** durch eine Anfrage aktualisiert. Wenn ein Widget auf `.jpg` zeigt, wird daher ein Bild angezeigt, das sich unabhängig vom konfigurierten Aktualisierungsintervall nie aktualisiert.

Zusätzlich könnte das Bild auch per Nachricht angefordert werden:

```js
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90,   // optional
    noCache: true // optional, if you want to get the image not from cache
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

Das Ergebnis liegt immer im Format `jpg` vor.

Unterstützte Kameras:

- `Reolink E1 Pro` via RTSP (wichtig, ohne `Pro` funktioniert es nicht)
- `Eufy` über den EUSEK-Adapter
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2-generation-via-onvif-f%C3%BCr-s6-q8-a7-2-generation-) der zweiten und dritten Generation über ONVIF (für S6, Q8, A7 2. Generation), A7 Pro, A9
- [WIWICam M1 über HiKam-Adapter](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- RTSP-nativ - falls Ihre Kamera das RTSP-Protokoll unterstützt.
- Screenshots per HTTP-URL – falls Sie den Screenshot Ihrer Kamera per URL abrufen können

### URL-Bild
Dies ist eine normale URL-Anfrage, bei der alle Parameter in der URL enthalten sind. Zum Beispiel `http://mycam/snapshot.jpg`

### URL-Bild mit Basisauthentifizierung
Dies ist eine URL-Anfrage für ein Bild, wobei alle Parameter in der URL enthalten sind. Sie können jedoch die Anmeldeinformationen für die Basisauthentifizierung angeben. Zum Beispiel: `http://mycam/snapshot.jpg`

### FFmpeg
Um auf Schnappschüsse von RTSP-Kameras zuzugreifen, können Sie ffmpeg verwenden. Sie müssen ffmpeg auf Ihrem System installieren:

Windows verfügt über vorkompiliertes ffmpeg, sodass kein Download erforderlich ist. (Die Windows-Version stammt von hier: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)
- Linux: `sudo apt-get install ffmpeg -y`

So aktualisieren Sie die Windows-Version von `ffmpeg`:

- Datei herunterladen: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
- Extrahieren Sie `bin/ffmpeg.exe`
- Benennen Sie `ffmpeg.exe` in `win-ffmpeg.exe` um.
- Komprimieren Sie `win-ffmpeg.exe` in eine `win-ffmpeg.zip`-Datei.
- Platzieren Sie `win-ffmpeg.zip` im Stammverzeichnis dieses Repositorys.
- Führen Sie `win-ffmpeg.exe --version` aus, um die Version zu erhalten, und speichern Sie sie in der Konstante `WIN_FFMPEG_VERSION` in `main.ts` (z. B. `2025-02-02-git-957eb2323a-full_build-www.gyan.dev`).

Hier ist ein Beispiel, wie man Reolink E1 hinzufügt:

![rtsp](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

### Ezviz – So aktivieren Sie RTSP für EZVIZ-Kameras wieder
Aus irgendeinem Grund hat EZVIZ beschlossen, RTSP für ihre Kameras zu deaktivieren:

- Öffnen Sie die EZVIZ-App und gehen Sie zu: Profil / Einstellungen / LAN-Live-Ansicht
- Starten Sie den Scanvorgang und wählen Sie dann die Kamera aus:
- Melden Sie sich mit Ihrem Kamerapasswort an (das Standardpasswort befindet sich auf dem Aufkleber der Kamera).
- Drücken Sie auf das Symbol „Einstellungen“ und wählen Sie „Lokale Diensteinstellungen“ aus.
- RTSP aktivieren

## So fügen Sie eine neue Kamera hinzu (Für Entwickler)
### Der einfache Weg: ein neuer Hersteller für den Universaltyp
Die meisten Kameras benötigen keinen Code. Der Typ `universal` wird durch die Datendateien in `src-admin/public/data/` gesteuert, die von ispyconnect.com generiert werden:

1. Fügen Sie den Hersteller der `MANUFACTURERS`-Zuordnung am Anfang von `tools/parser.js` hinzu.
2. Führen Sie `node tools/parser.js <Hersteller>` aus – dadurch wird die Datei `src-admin/public/data/<Hersteller>.json` erstellt.

und Aktualisierungen `manufacturers.json`

3. Führen Sie `node tools/logos.js` aus, um ein Logo hinzuzufügen. Dabei wird das Markenzeichen von `simple-icons` verwendet.

Die Kollektion enthält den Herstellernamen, andernfalls wird ein Monogramm generiert. Um stattdessen das eigentliche Logo zu verwenden, fügen Sie einfach `<manufacturer>.svg`, `.png` oder `.jpg` in `src-admin/public/data/` ein – bestehende Dateien werden niemals überschrieben (es sei denn, `--force` wird angegeben).

Der neue Hersteller erscheint dann in der Dropdown-Liste des Kameratyps „Nach Hersteller“.

### Ein spezieller Kameratyp
Nur erforderlich, wenn die Kamera eine eigene Logik benötigt. Erstellen Sie einen Pull Request mit:

- `src/types.d.ts` — Füge den Schlüssel zur `CameraType`-Union hinzu, füge eine `CameraConfigMyCam extends CameraConfig` hinzu

Schnittstelle und füge sie der Union `CameraConfigAny` hinzu

- `src/cameras/MyCamCamera.ts` — erweitert `GenericCamera` für einen einfachen HTTP-Snapshot oder `GenericRtspCamera`

für RTSP (füllen Sie `this.settings` und `this.decodedPassword` in `init()`, bevor Sie `super.init()` aufrufen)

- `src/cameras/Factory.ts` — Füge den `case` für den neuen Typ hinzu
- `src-admin/src/Types/MyCam.tsx` — der Konfigurationsdialog, der `ConfigGeneric` erweitert
- `src-admin/src/Tabs/Cameras.tsx` — Importiere den Dialog und füge ihn der `TYPES`-Struktur hinzu, z. B.

`mycam: { Config: MyCamConfig as unknown as IConfigGeneric, name: 'MyCam' },`. Der Schlüssel muss identisch sein mit dem im Backend verwendeten `type`.

- Füge die neuen Labels allen Dateien in `src-admin/src/i18n/` hinzu.

### Go2rtc (optional)
Wenn `go2rtc` in den Einstellungen aktiviert ist, ersetzt ein lokaler [go2rtc](https://github.com/AlexxIT/go2rtc)-Prozess die `ffmpeg`-Prozesse: einer pro Snapshot im Adapter und einer pro Kamera in der Web-Erweiterung. go2rtc hält pro Kamera eine einzige Verbindung und bedient alle Clients darüber.

go2rtc bindet seine API an `127.0.0.1` und ist vom Browser niemals direkt erreichbar. Der gesamte Zugriff erfolgt über den `web`-Adapter, sodass dieselbe Authentifizierung und dasselbe HTTP/HTTPS-Schema wie der Rest von ioBroker verwendet werden – es muss kein zusätzlicher Port geöffnet werden. Neben dem vorhandenen WebSocket bietet jede Kamera auch `/<instance>/<camera>/stream.mjpeg` an, das in einem einfachen `<img src="...">` verwendet werden kann.

Falls die Binärdatei nicht gefunden werden kann oder nicht startet, greift der Adapter transparent auf `ffmpeg` zurück.

## Todo
- [ ] Sendet neue Abonnementanfragen für RTSP-Kameras, wenn der Dialog geöffnet oder geschlossen wird.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 3.0.2 (2026-08-17)
* (@GermanBluefox) The web extension can now request snapshots via messages instead of the private HTTP server, which is used automatically when the cameras adapter runs on a different host than the web instance
* (@GermanBluefox) Fixed: a failed snapshot request answered with an empty `{}` instead of the error message

### 3.0.1 (2026-08-16)
* (@GermanBluefox) Completely rewritten in TypeScript
* (@GermanBluefox) Added Ezviz cameras
* (@GermanBluefox) Snapshot requests are answered with `Cache-Control: no-store` so browsers cannot show a stale frame
* (@GermanBluefox) Fixed: a list of allowed IPs was never split correctly, so any list with more than one address rejected every request
* (@GermanBluefox) Fixed: connections from the IPv6 loopback address were not recognized as local
* (@GermanBluefox) Fixed: a failed image request could terminate the adapter with `ERR_HTTP_HEADERS_SENT`
* (@GermanBluefox) The cameras are reachable immediately after start instead of only after the first frame of every camera was grabbed
* (@GermanBluefox) The web extension picks up a changed key by itself, without restarting ioBroker.web
* (@paul179) Added Steinel cameras (as manufacturer of the universal camera type)
* (@GermanBluefox) The universal camera type now offers ~50 manufacturers with ~13000 models, each with a logo
* (ioBroker-Bot) Removed the deprecated `common.materialize` from io-package.json
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now
* (ioBroker-Bot) Adapter requires node.js >= 22 now
* (@GermanBluefox) Added Instar cameras
* (@GermanBluefox) Added optional go2rtc support for snapshots and live streams, proxied via the web adapter
* (@GermanBluefox) Fixed: the second viewer of the same camera did not receive any picture
* (@GermanBluefox) Added two widgets for ioBroker.devices: RTSP camera and snapshot camera
* (@GermanBluefox) Fixed: the `.running` state did not start or stop the stream
* (@GermanBluefox) Fixed: width/height/angle of the `image` message were ignored
* (@GermanBluefox) Fixed: a camera in the dialog of the snapshot widget was never used

### 2.1.2 (2024-07-15)
* (bluefox) Updated packages

### 2.1.1 (2024-07-07)
* (bluefox) Removed withStyles package

### 2.0.8 (2024-06-09)
* (bluefox) Packages updated
* (bluefox) Allowed selecting another source (with bigger resolution) for URL cameras

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 bluefox <dogafox@gmail.com>

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