---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.puppeteer/README.md
title: ioBroker.puppeteer
hash: 9pVkJK93gV6D3CyZBndpTP3HxMHaOu3VheHW9dtL+s8=
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

## Anleitung

Der Adapter ist vollständig über Zustände konfigurierbar und bietet keine Einstellungen in der Administratoroberfläche. Die Zustände (außer`url` ) erhält vom Adapter kein ack-flag und ack-flags werden generell ignoriert.

### Staaten

#### Dateiname

Geben Sie den Dateinamen (vollständigen Pfad) des Bildes an.

#### URL

Geben Sie die URL an, von der Sie einen Screenshot erstellen möchten. Wenn der Status „geschrieben“ ist, wird sofort ein Screenshot erstellt. Nach der Erstellung des Screenshots setzt der Adapter das Bestätigungsflag des URL-Status auf „true“.

#### vollständige Seite

Wenn diese Bedingung erfüllt ist, wird ein Screenshot der gesamten Seite erstellt. Die Zuschneideoptionen werden ignoriert.

#### Beschneiden links/oben/Höhe/Breite

Konfigurieren Sie die Zuschnittoptionen in`px` Nur den gewünschten Seitenabschnitt als Screenshot aufnehmen. Wenn`fullPage` Wenn diese Einstellung auf „true“ gesetzt ist, wird kein Zuschneiden durchgeführt.

#### waitForSelector

Der Screenshot wird aufgenommen, nachdem der Selektor auf der Seite sichtbar ist, z. B.`#time` . Wenn`waitForSelector` ist aktiv, andere Warteoperationen wie`renderTime` werden ignoriert.

#### renderTime

Wartezeit in Millisekunden bis zum Rendern der Seite

### Nachrichten

Alternativ können Sie Screenshots erstellen, indem Sie Nachrichten an den Adapter senden. Alle Optionen außer`url` Und`ioBrokerOptions` werden direkt an die Puppeteer-API übergeben. Die aktuell unterstützten Parameter finden Sie unten. Eine aktuellere Version finden Sie in der [API-Beschreibung](https://pptr.dev/api/puppeteer.screenshotoptions) . Zusätzlich können Sie definieren`waitOption` um eine bestimmte Zeit oder einen Selektor abzuwarten. Schließlich können Sie Folgendes verwenden:`ioBrokerOptions.storagePath` Option zum direkten Speichern von Screenshots im ioBroker-Speicher unter`0_userdata.0` diese können dann über Admin- und Visualisierungsadapter angezeigt werden.

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
  }, obj => {
      if (obj.error) {
        log(`Error taking screenshot: ${obj.error.message}`, 'error');
      } else {
        // the binary representation of the image is contained in `obj.result`
        log(`Successfully took screenshot: ${obj.result}`);
      }
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.0 (2024-09-17)
* (@foxriver76) updated puppeteer dependency
* (@foxriver76) allow to specify an external browser for puppeteer

### 0.3.0 (2024-05-19)
* (foxriver76) allowed to specify additional arguments for the puppeteer process
* (foxriver76) updated puppeteer dependency

### 0.2.8 (2024-01-09)
* (foxriver76) update puppeteer dependency

### 0.2.7 (2023-03-18)
* (foxriver76) update puppeteer dependency

### 0.2.6 (2022-08-14)
* (foxriver76) we now close the page also when screenshot taken via message

### 0.2.5 (2022-08-14)
* (foxriver76) we have optimized the viewport option

### 0.2.4 (2022-08-12)
* (foxriver76) allow settings viewport options
* (foxriver76) the default viewport is now the max resolution

### 0.2.3 (2022-08-12)
* (foxriver76) optimized path check for relative paths

### 0.2.1 (2022-06-09)
* (foxriver76) we now install required shared libraries on adapter installation on linux

### 0.2.0 (2022-05-20)
* (foxriver76) added option to save files to the ioBroker storage via messages by using `ioBrokerOptions.storagePath` (closes #2)

### 0.1.0 (2022-05-16)
* (foxriver76) initial release

## License
MIT License

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