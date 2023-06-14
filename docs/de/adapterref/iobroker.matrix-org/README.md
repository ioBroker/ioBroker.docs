---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.matrix-org/README.md
title: ioBroker.matrix-org
hash: thDSPGk0mvt0gLe1EZ7FJPRN6KyItq0/2Hx0xO/FJeY=
---
![Logo](../../../en/adapterref/iobroker.matrix-org/admin/matrix-logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.matrix-org.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)
![Anzahl der Installationen](https://iobroker.live/badges/matrix-org-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/matrix-org-stable.svg)
![NPM](https://nodei.co/npm/iobroker.matrix-org.png?downloads=true)

# IoBroker.matrix-org
**Tests:** ![Test und Freigabe](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

## Matrix-org-Adapter für ioBroker
Adapter für Matrix-Push-Nachrichten. Vielen Dank für die Erstellung von Matrix (https://matrix.org/) für die Erstellung einer vollständigen kostenlosen Kommunikationsbasis

### Aufbau
Am besten: Führen Sie Ihren eigenen Client auf Ihrem Server aus!

Erstellen Sie einen eigenen Benutzer als Ihren BOT mit Passwort. Erstellen Sie einen Raum für alle Mitglieder, die die Bot-Nachrichten wünschen. Fügen Sie Ihren BOT zu diesem Raum hinzu (nicht erforderlich, wenn die automatische Verbindung aktiviert ist). Fügen Sie alle Mitglieder zu diesem Raum hinzu. Fügen Sie alle Daten in die Konfiguration ein. (BOT-Name, Passwort, Raumname)

### Verwendung
Fügen Sie so viele Instanzen hinzu, wie Sie benötigen. Fügen Sie mit js einen Wert zu „matrix-org.0.sendMessage“ hinzu, wie Sie möchten. Wenn Sie „image“ auf „matrix.0.sendMessage“ setzen, wird das Matrix-Logo an Ihren Kanal gesendet.
Oder verwenden Sie in js:

```
sendTo("matrix-org.0", "Hello World!");
```

Oder verwenden Sie das Blockly-Symbol in Sendto.

Für Bilder aus dem lokalen Dateisystem (Linux):

```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```

Für Bilder aus dem lokalen Dateisystem (Windows):

``` 
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```

Für Bilder als Referenz:

```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```

Für Bilder in base64:

```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```

Oder

```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```

Für HTML befolgen Sie bitte diese Spezifikation: https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes Z. B.:

```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```

oder

```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```

Wenn Ihr Client HTML nicht dekodieren kann, erhalten Sie den Text.
Wenn Ihr Client keine Tabelle unterstützt, zeigt er entweder den Text oder einfach 12ab an.

### Um Ihre Konfiguration zu testen, verwenden Sie sendMessage
Öffnen Sie einfach die Objekte und ändern Sie die Zeichenfolge einer Matrix-org-Instanz. Meistens ist der Port 443, wenn Sie ein öffentliches System wie Matrix.org haben. Der Port ist manchmal 8448, wenn Sie ein selbstgehostetes System ohne Proxy haben, aber dann wissen Sie es Es.

Wenn Sie es testen möchten: Server: matrix.org Port: 443 Raum: #test-ioBroker-adapter:matrix.org Treten Sie diesem Raum bei und probieren Sie es mit Ihren eigenen Anmeldeinformationen aus

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* upgrade matrix-js-sdk
* auto join added (default false)

### 1.0.0 (2023-04-01)
* upgrade matrix-js-sdk (node 18 needed)

### 0.1.6 (2023-04-01)
* last version for node 16
* updated libs according dependabot accept matrix-js-sdk

### 0.1.5 (2023-03-02)
* downgrade for node 16
* translation for configuration

### 0.1.4 (2023-02-04)
* update of dependencies
* small readme improvement

### 0.1.3 (2022-11-03)
* updates of dependencies

### 0.1.2 (2022-08-12)
* base64 with html format added again
* html messages added

### 0.1.1 (2022-08-08)
* bugfix local file system was not working
* bugfix base64 was not working
* unit test added

### 0.1.0 (2022-08-05)
* sending files added
* sending from url and base64 encoded data
* image ans video mime types are send as image and video all others as file

### 0.0.7 (2022-07-24)
* removed all axios request
* replaced with matrix-js-sdk calls
* no logoff during the whole time
* test with servers with access token expiery need to be done
* sync added
* receive message added (please check on update and not on change to react on the same message)

### 0.0.6 (2022-07-10)
* repeat false set for stable admin v5.3.8
* Readme with example improved (how to chose port 443 or 8448)
* some more debug output on errors

### 0.0.5 (2022-07-08)
* sendMessage stay in for fast config testing
* index_m.html and files from admin/build removed
* password encryption and protection enabled
* password field now as type password
* detection of missing config give an error log
* detection of unread room data give an error log
* encodeURI() used where possible
* catching termination during await for avoid errors when writing on ioBroker database
* adding matrix to blockly symbol

### 0.0.4 (2022-07-02)
* blockly added
* onMessage method added

### 0.0.3 (2022-06-26)
* Invalid workflow line 54 in test-and-release.yml (leading space removed)

### 0.0.2 (2022-06-26)
* (oelison) message sending by setting object sendMessage implemented
* (oelison) most "try/catch" done
* (oelison) Readme completed.

### 0.0.1 (2022-06-26)
* (oelison) initial release

## License
MIT License

Copyright (c) 2023 Christian Oelschlegel <iobrokermatrix@sciphy.de>

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