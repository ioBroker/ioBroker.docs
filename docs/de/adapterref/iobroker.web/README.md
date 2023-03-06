---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: o5xc+g7/g6wP3/8ROBkVgNHLEDKIK1YPwBJkDMzpcGk=
---
![Logo](../../../en/adapterref/iobroker.web/admin/web.png)

![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.web.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Testen und freigeben](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Webserver auf Basis von Node.js und Express zum Lesen der Dateien aus ioBroker DB.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Web-Sockets optimieren
Bei einigen Web-Sockets-Clients gibt es Leistungsprobleme bei der Kommunikation.
Manchmal ist dieses Problem auf einen Fallback der socket.io-Kommunikation auf einen langen Abfragemechanismus zurückzuführen.
Sie können die Option *Force Web-Sockets* so einstellen, dass nur die Verwendung von Web-Sockets-Transport erzwungen wird.

## Lassen Sie uns Zertifikate verschlüsseln
Lesen [Hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Erweiterungen
Webtreiber unterstützt Erweiterungen.
Die Erweiterung ist ein URL-Handler, der aufgerufen wird, wenn eine solche URL-Anfrage erscheint.
Die Erweiterungen sehen aus wie der normale Adapter, haben aber keinen laufenden Prozess und werden vom Webserver aufgerufen.

Z.B. Der Benutzer kann einen speziellen Proxy-Adapter aktivieren und andere Geräte (wie Webcams) auf demselben Webserver erreichen.
Es ist erforderlich, alle Dienste unter einem Webserver verfügbar zu machen.

Die Web-Erweiterung könnte und sollte die `unload`-Funktion unterstützen, die `promise` zurückgeben könnte, wenn der Entladevorgang einige Zeit in Anspruch nimmt.

Lesen Sie mehr über Web-Erweiterungen [Hier](WEB-EXTENSIONS-HOWTO.md).

## Brute-Force-Schutz
Wenn die Authentifizierung aktiviert ist und der Benutzer innerhalb einer Minute fünfmal ein ungültiges Passwort eingibt, muss er bis zum nächsten Versuch mindestens eine Minute warten.
Nach dem 15. Fehlversuch muss der Benutzer 1 Stunde warten.

## Option "Angemeldet bleiben".
Wenn diese Option ausgewählt ist, bleibt der Benutzer einen Monat lang angemeldet.
Wenn nicht, bleibt der Benutzer für das konfigurierte "Login-Timeout" angemeldet.

## Greifen Sie auf die Werte des Status zu
Sie können über die HTTP-Get-Anforderung auf die normalen und binären Zustandswerte zugreifen.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

oder

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

Das Bild muss wie folgt in den Javascript-Adapter geschrieben werden:

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## Option "Basisauthentifizierung".
Ermöglicht die Anmeldung über die Standardauthentifizierung durch Senden von `401` Unautorisiert mit einem `WWW-Authenticate`-Header.
Dies kann für Anwendungen wie *FullyBrowser* verwendet werden. Wenn Sie einmal die falschen Zugangsdaten eingeben, werden Sie zur Anmeldeseite weitergeleitet.

## Erweiterte Optionen
### Standardweiterleitung
Wenn beim Öffnen des Webports im Browser keine APP-Auswahl angezeigt werden soll, sondern eine bestimmte Anwendung, könnte hier der Pfad angegeben werden (z. B. `/vis/`), damit dieser Pfad automatisch geöffnet wird.

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed to read projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used new version of socket classes

## License
The MIT License (MIT)

Copyright (c) 2014-2023 Bluefox <dogafox@gmail.com>

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