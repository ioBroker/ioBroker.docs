---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.puppeteer/README.md
title: ioBroker.puppeteer
hash: 2drb/FmQEDurvwCVGhf47Gh8fn/mmCuNT16mC+sb9OA=
---
![Logo](../../../en/adapterref/iobroker.puppeteer/admin/puppeteer.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.puppeteer.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.puppeteer.svg)
![Anzahl der Installationen](https://iobroker.live/badges/puppeteer-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/puppeteer-stable.svg)
![NPM](https://nodei.co/npm/iobroker.puppeteer.png?downloads=true)
![Test und Freigabe](https://github.com/foxriver76/ioBroker.puppeteer/workflows/Test%20and%20Release/badge.svg)

# ioBroker.puppeteer

## Puppeteer-Adapter für ioBroker

Headless-Browser zur Generierung von Screenshots basierend auf Chrome

## Haftungsausschluss

Puppeteer ist ein Produkt von Google Inc. Die Entwickler dieses Moduls werden in keiner Weise von Google Inc. oder deren Tochtergesellschaften, Logos oder Marken unterstützt oder sind mit diesen verbunden.

## Umgebungen ohne Kopf

Bitte beachten Sie, dass Chromium/Chrome auf **Systemen ohne grafische Benutzeroberfläche** (wie Linux-Servern) bestimmte gemeinsam genutzte Bibliotheken benötigen. Der Adapter installiert viele fehlende Abhängigkeiten automatisch über `osDependencies` unter Linux, aber je nach Ihrer Distribution müssen Sie möglicherweise trotzdem einen Browser installieren (z. B. `chromium-browser` oder `google-chrome-stable` manuell und konfigurieren Sie es über die Option **"Externen Browser verwenden"** .\
&#x20;Wenn ioBroker als Root ausgeführt wird (z. B. in einem Docker-Container), müssen Sie möglicherweise auch die folgenden Berechtigungen übergeben: `--no-sandbox` Und `--disable-setuid-sandbox` Argumente innerhalb der Adaptereinstellungen.

```bash
sudo apt update
sudo apt install chromium -y
which chromium # check the path to the browser executable, e.g. /usr/bin/chromium
chromium --version
```

Konfigurieren Sie anschließend den Adapter so, dass er den installierten Browser verwendet, indem Sie die Option **„Externen Browser verwenden“** aktivieren und den Pfad zur Browser-Programmdatei angeben (z. B. ). `/usr/bin/chromium`).

## Anleitung

Der Adapter ist vollständig über Zustände konfigurierbar und bietet keine Einstellungen in der Administratoroberfläche. Die Zustände (außer `url`) erhält vom Adapter kein ack-flag und ack-flags werden generell ignoriert.

### Staaten

#### Dateiname

Geben Sie den Dateinamen (vollständigen Pfad) des Bildes an.

#### URL

Geben Sie die URL an, von der Sie einen Screenshot erstellen möchten. Wenn der Status „geschrieben“ ist, wird sofort ein Screenshot erstellt. Nach der Erstellung des Screenshots setzt der Adapter das Bestätigungsflag des URL-Status auf „true“.

#### vollständige Seite

Wenn dieser Zustand als wahr ausgewertet wird, wird ein Screenshot der gesamten Seite erstellt. Die Zuschneideoptionen werden ignoriert.

#### Beschneiden links/oben/Höhe/Breite

Konfigurieren Sie die Zuschnittoptionen in `px` Nur den gewünschten Seitenabschnitt als Screenshot aufnehmen. Wenn `fullPage` Wenn diese Einstellung auf „true“ gesetzt ist, wird kein Zuschneiden durchgeführt.

#### waitForSelector

Der Screenshot wird aufgenommen, nachdem der Selektor auf der Seite sichtbar ist, z. B. `#time`. Wenn `waitForSelector` ist aktiv, andere Warteoperationen wie `renderTime` werden ignoriert.

#### renderTime

Wartezeit in Millisekunden bis zum Rendern der Seite

### Nachrichten

Alternativ können Sie Screenshots erstellen, indem Sie Nachrichten an den Adapter senden. Alle Optionen außer `url` Und `ioBrokerOptions` werden direkt an die Puppeteer-API übergeben. Die aktuell unterstützten Parameter finden Sie unten. Eine aktuellere Version finden Sie in der [API-Beschreibung](https://pptr.dev/api/puppeteer.screenshotoptions) . Zusätzlich können Sie definieren `waitOption` um eine bestimmte Zeit oder einen Selektor abzuwarten. Schließlich können Sie Folgendes verwenden: `ioBrokerOptions.storagePath` Option zum direkten Speichern von Screenshots im ioBroker-Speicher unter `0_userdata.0` diese können dann über Admin- und Visualisierungsadapter angezeigt werden.

```typescript
sendTo('puppeteer.0', 'screenshot', { url: 'https://www.google.com',
      ioBrokerOptions?: {
        /**
         * Define a filename for the ioBroker storage e.g. test.png
         */
        storagePath: string;
      },
      /**
       * Define at most one wait option
       * You can also look for other waitOptions currently supported by Puppeteer API
       * see e.g. https://puppeteer.github.io/puppeteer/docs/puppeteer.page.waitforfilechooser
       */
      waitOption?: {
        /**
         * Define a Timeout in ms
         */
        waitForTimeout?: 5000,
    
        /**
         * Wait for a given id/tag/etc to be occured
         */
        waitForSelector?: '#testId'
      },
      /**
       * Optionally, specify the viewport manually, see https://pptr.dev/api/puppeteer.viewport
       */
      viewportOptions?: {
        width: 800,
        height: 600
      },
      /**
       * The file path to save the image to. The screenshot type will be inferred
       * from file extension. If path is a relative path, then it is resolved
       * relative to current working directory. If no path is provided, the image
       * won't be saved to the disk.
       */
      path?: string,
      /**
       * When true, takes a screenshot of the full page.
       * @defaultValue false
       */
      fullPage?: boolean,
      /**
       * An object which specifies the clipping region of the page.
       */
      clip?: {         
        x: number,
        y: number,
        width: number,
        height: number 
      };
      /**
       * Quality of the image, between 0-100. Not applicable to `png` images.
       */
      quality?: number,
      /**
       * Hides default white background and allows capturing screenshots with transparency.
       * @defaultValue false
       */
      omitBackground?: boolean,
      /**
       * Encoding of the image.
       * @defaultValue 'binary'
       */
      encoding?: 'base64' | 'binary',
      /**
       * If you need a screenshot bigger than the Viewport
       * @defaultValue true
       */
      captureBeyondViewport?: boolean,
      /**
       * When the navigation is considered finished. Defaults to `networkidle2` for backwards compatibility,
       * but for pages with persistent connections (WebSockets, SSE) — e.g. ioBroker vis, Home Assistant
       * Lovelace, Grafana — `networkidle2` will never trigger and the screenshot will only be taken once
       * `navigationTimeout` is reached. Use `'load'` or `'domcontentloaded'` for those pages and combine
       * with `waitOption.waitForSelector` to wait for a real "ready" marker.
       * @defaultValue 'networkidle2'
       */
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2',
      /**
       * Maximum time in milliseconds for `page.goto()` and any subsequent `waitFor…` calls.
       * Lower values free up the renderer process faster when a page hangs.
       * @defaultValue 30000
       */
      navigationTimeout?: number,
  }, obj => {
      if (obj.error) {
        log(`Error taking screenshot: ${obj.error.message}`, 'error');
      } else {
        // the binary representation of the image is contained in `obj.result`
        log(`Successfully took screenshot: ${obj.result}`);
      }
});
```

## Antwort per GET/POST-Anfrage erhalten

Sie können die `rest-api` Adapter zum Empfangen der Antwort für sendTo-Operationen via HTTP:

```bash
curl -X 'GET' \
  'http://192.168.1.129:8093/v1/sendto/puppeteer.0?message=screenshot&data=%7B%22url%22%3A%22http%3A%2F%2F192.168.1.129%3A8082%2Fvis-2%2F%3Fmain%23SeeedColor%22%2C%22ioBrokerOptions%22%3A%7B%22storagePath%22%3A%22color.png%22%7D%2C%22waitOption%22%3A%7B%22waitForSelector%22%3A%22.battery%22%7D%2C%22viewportOptions%22%3A%7B%22width%22%3A800%2C%22height%22%3A480%7D%2C%22captureBeyondViewport%22%3Afalse%2C%22waitUntil%22%3A%22load%22%7D&responseContentType=image%2Fpng' \
  -H 'accept: application/json'
```

## Weberweiterung

Der Adapter registriert sich als Web-Erweiterung des `web` Der Adapter ermöglicht das Erstellen von Screenshots durch einfaches Aufrufen eines Links. Es wird kein zusätzlicher Port geöffnet: Die Routen befinden sich auf der Webinstanz, die Sie in den Adaptereinstellungen auswählen, und teilen sich daher deren HTTP/HTTPS-Einstellungen und Authentifizierung.

Einstellungen:

- **Webinstanz** - welche `web` Die Instanz dient dem Link (`*` (alle von ihnen).
- **URL-Pfad** – der Pfad, unter dem die Erweiterung eingebunden ist (Standardwert) `puppeteer` Es muss eindeutig sein, wenn mehrere Puppeteer-Instanzen dieselbe Webinstanz erweitern.

Mit den Standardeinstellungen ist der Screenshot verfügbar unter `http://<web-ip>:8082/puppeteer/?url=<URL>`, wobei URL die Seite ist, die Sie erfassen möchten (absolut). `http://` oder `https://` Nur URLs). Sie können auch zusätzliche Parameter angeben:

- `fullPage=true` einen Screenshot der gesamten Seite erstellen
- `waitForSelector=#testId` Warten, bis ein bestimmter Selektor erreicht ist, bevor der Screenshot erstellt wird
- `waitForTimeout=5000` eine bestimmte Zeit in Millisekunden warten, bevor ein Screenshot erstellt wird (wird nur verwendet, wenn `waitForSelector` (ist nicht festgelegt)
- `width=800&height=600` die Ansichtsfenstergröße für den Screenshot festlegen
- `clipLeft=0&clipTop=0&clipWidth=800&clipHeight=600` die Zuschneideoptionen für den Screenshot festlegen
- `quality=80` um die Qualität des Screenshots festzulegen (nur für JPEG/WebP)
- `omitBackground=true` um den standardmäßigen weißen Hintergrund auszublenden und das Aufnehmen von Screenshots mit Transparenz zu ermöglichen
- `encoding=base64` um die Kodierung des Bildes festzulegen (Standard ist binär).
- `captureBeyondViewport=true` um Screenshots zu ermöglichen, die größer als der Anzeigebereich sind (Standardeinstellung ist „true“).
- `type=jpeg/png/webp` um den Typ des Screenshots festzulegen (Standard ist png).
- `waitUntil=load|domcontentloaded|networkidle0|networkidle2` Steuert, wann die Navigation als abgeschlossen gilt (Standard: `networkidle2` Siehe unten **die Tipps für Live-Daten-Dashboards** .
- `navigationTimeout=15000` maximale Zeit in ms für `page.goto()` und anschließende Wartezeiten (Standard: `30000` Niedrigere Werte führen dazu, dass Renderer-Prozesse schneller freigegeben werden, wenn eine Seite hängt.

Die Antwort ist die Binärdarstellung des Bildes, die direkt im Browser angezeigt werden kann, oder eine Base64-Zeichenkette. `{ result: "base64" }` abhängig von der angegebenen Kodierung.

### Tipps für Live-Daten-Dashboards (vis / vis-2 / Lovelace / Grafana)

Standardeinstellung `waitUntil=networkidle2` Die Anwendung wartet, bis die Seite weniger als drei offene Netzwerkverbindungen für 500 ms aufweist. Dashboards mit einer permanenten WebSocket- oder Server-Sent-Events-Verbindung – darunter **ioBroker vis/vis-2** , **Home Assistant Lovelace** und **Grafana** – erreichen diesen Zustand nie, daher wird jeder Screenshot blockiert, bis die Verbindung wiederhergestellt ist. `navigationTimeout` (Standardmäßig 30 Sekunden) vergehen. Während die Seite nicht reagiert, verbraucht der Chromium-Renderer-Prozess weiterhin ca. 100–200 MB RSS-Daten.

Verwenden Sie für diese Dashboards Folgendes:

- `waitUntil=load` (oder `domcontentloaded`) — wartet **nicht** darauf, dass WebSockets inaktiv werden, und
- `waitForSelector=<a-selector-that-only-exists-once-the-data-is-rendered>` — um sicherzustellen, dass Sie tatsächlich gerenderte Inhalte erfassen und nicht nur ein leeres Gerüst.

Empfohlene Auswahllisten:

| Armaturenbrett          | Wähler                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| ioBroker vis 1          | `#vis_container .vis-view`                                                                |
| ioBroker vis-2          | `#materialUI`                                                                             |
| Home Assistant Lovelace | `home-assistant-main` (und optional `hui-view ha-card` sobald die Karten gerendert wurden) |
| Grafana                 | `.panel-content` oder `.dashboard-container`                                               |

Optional: ein kleines `waitForTimeout` (z.B `200`) damit die Diagrammanimationen sich stabilisieren.

Beispiel:

```
http://<web-ip>:8082/puppeteer/?url=http://homeassistant.local:8123/lovelace/0&waitUntil=load&waitForSelector=hui-view&waitForTimeout=300
```

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @foxriver67 ( <https://github.com/foxriver76> ) nicht möglich gewesen, der die vorherigen Versionen dieses Adapters erstellt hat.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-09-15)
* (@GermanBluefox) Added a web extension for `ioBroker.web`, so screenshots can be taken by calling a link
* (@GermanBluefox) Added the option to limit the simultaneous renders to avoid overload of the system
* (@GermanBluefox) Fixed renderer-process leak when navigation or screenshot threw — pages are now always closed
* (@GermanBluefox) Added per-request `waitUntil` and `navigationTimeout` parameters (message API + web server) to support live-data dashboards (vis, Lovelace, Grafana) without hitting the network-idle timeout

### 1.0.0 (2026-09-10)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation

### 0.4.0 (2024-09-17)
* (@foxriver76) updated puppeteer dependency
* (@foxriver76) allowed specifying an external browser for puppeteer

### 0.3.0 (2024-05-19)
* (foxriver76) allowed specifying additional arguments for the puppeteer process
* (foxriver76) updated puppeteer dependency

### 0.2.8 (2024-01-09)
* (foxriver76) update puppeteer dependency

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Moritz Heusinger <moritz.heusinger@gmail.com>

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