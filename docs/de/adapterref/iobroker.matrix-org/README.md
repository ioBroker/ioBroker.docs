---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.matrix-org/README.md
title: ioBroker.matrix-org
hash: CW0AYPSP4fFJezrWC6bDJmYH8psL1qoZRvlc2zN/EIg=
---
![Logo](../../../en/adapterref/iobroker.matrix-org/admin/matrix-logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.matrix-org.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.matrix-org.svg)
![Anzahl der Installationen](https://iobroker.live/badges/matrix-org-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/matrix-org-stable.svg)
![Test und Freigabe](https://github.com/oelison/ioBroker.matrix-org/workflows/Test%20and%20Release/badge.svg)

# ioBroker.matrix-org

## Matrix-Org-Adapter für ioBroker

Adapter für Matrix-Push-Nachrichten. Vielen Dank an Matrix ( <https://matrix.org/> ), die Plattform für kostenlose Kommunikation.

### Konfiguration

Am besten: Betreiben Sie Ihren eigenen Client auf Ihrem Server!

Erstelle einen eigenen Benutzer mit Passwort für deinen Bot. Erstelle einen Raum für alle Mitglieder, die Bot-Nachrichten erhalten möchten. Füge deinen Bot diesem Raum hinzu (nicht erforderlich, wenn der automatische Beitritt aktiviert ist). Füge alle Mitglieder diesem Raum hinzu. Trage alle Daten in die Konfiguration ein (Bot-Name, Passwort, Raumname).

### Verwendung

Fügen Sie beliebig viele Instanzen hinzu. Weisen Sie \`matrix-org.0.sendMessage\` nach Belieben einen Wert zu, beispielsweise mit JavaScript. Wenn Sie \`matrix.0.sendMessage\` den Wert „image“ zuweisen, wird das Matrix-Logo an Ihren Kanal gesendet. Alternativ können Sie in JavaScript Folgendes verwenden:

```
sendTo("matrix-org.0", "Hello World!");
```

Oder verwenden Sie das Blockly-Symbol in Sendto.

Für Images vom lokalen Dateisystem (Linux):

```
sendTo("matrix-org.0",{file: "file:///tmp/images/test.png"});
```

Für Images aus dem lokalen Dateisystem (Windows):

```
sendTo("matrix-org.0",{file: "file:///C:/tmp/images/test.png"});
```

Abbildungen dienen als Referenz:

```
sendTo("matrix-org.0",{file: "https://www.abcd/images/test.png"});
```

Für Bilder im Base64-Format:

```
sendTo("matrix-org.0",{file:{type:"image/png",base64:"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"}});
```

Oder

```
sendTo("matrix-org.0",{file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7ZdhCoAgDEZnd9D737T8xJkNNY1Ef+yB2LTcC1qWOT20kCBgjIkh0WwfmeuIxyGYnRzIPElgFSqgAvsKOOdCzeZ1y7EcZzDG16HvwtckihLdA4xxk3HeGGttc17Cc+lN6Ds/dlO6w6/ItQHn7H4GcDK3Em/zNboE5KKjcQstQxVQARVYLlDdC2YzvBfMQgVUYB8BlMWfn2E1ZJ7Fv+dEF0UZoNhXp9NnAAAAAElFTkSuQmCC"});
```

Für HTML beachten Sie bitte diese Spezifikation: <https://spec.matrix.org/v1.3/client-server-api/#mroommessage-msgtypes> Beispiel:

```
sendTo("matrix-org.0",{html: "<h1>Hello World!</h1>", text: "Hello World!"});
```

oder

```
sendTo("matrix-org.0",{html: "<table><tr><td>1</td><td>2</td></tr><tr><td>a</td><td>b</td></tr><table>", text: "Your client can not show html!"});
```

Kann Ihr Client HTML nicht dekodieren, wird der Text angezeigt. Unterstützt Ihr Client keine Tabellen, wird entweder der Text oder einfach „12ab“ angezeigt.

### Um Ihre Konfiguration zu testen, verwenden Sie sendMessage.

Öffnen Sie einfach die Objekte und ändern Sie die Zeichenkette einer Matrix-Org-Instanz. Meistens ist der Port 443, wenn Sie ein öffentliches System wie Matrix.org verwenden. Der Port ist manchmal 8448, wenn Sie ein selbst gehostetes System ohne Proxy haben, aber das wissen Sie ja.

Wenn Sie es testen möchten: Server: matrix.org Port: 443 Raum: #test-ioBroker-adapter:matrix.org Treten Sie diesem Raum bei und probieren Sie es mit Ihren eigenen Zugangsdaten aus.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* some bumps

### 1.2.2 (2026-03-29)
* string normalisation due to bug report #95
* some bumbs

### 1.2.1 (2026-02-12)
* set body in send file to matrix

### 1.2.0 (2025-10-17)
* upgrade matrix-js-sdk to 38.4.0 node 22 required
* switch to ESM
* eslint 9 (what a messi commit)

### 1.1.0 (2024-11-23)
* upgrade matrix-js-sdk
* auto join added (default false)

### 1.0.0 (2023-04-01)
* upgrade matrix-js-sdk (node 18 needed)

[Older changelogs can be found there](https://github.com/oelison/ioBroker.matrix-org/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Christian Oelschlegel <iobrokermatrix@sciphy.de>

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