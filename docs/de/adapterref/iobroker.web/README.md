---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: 5tn98OjELn7lq9d0K9WQAgr8fnJMj7kVxeNvrcY/ig8=
---
![Logo](../../../en/adapterref/iobroker.web/admin/web.png)

![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.web.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Webserver auf Basis von Node.js und Express zum Lesen der Dateien aus der ioBroker-Datenbank.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Web-Sockets optimieren
Bei einigen Web-Sockets-Clients kommt es zu Leistungsproblemen bei der Kommunikation.

Manchmal liegt dieses Problem daran, dass die socket.io-Kommunikation auf einen langen Polling-Mechanismus zurückgreift.

Sie können die Option „Web-Sockets erzwingen“ aktivieren, um die ausschließliche Verwendung von Web-Sockets-Transport zu erzwingen.

## Lassen Sie uns Zertifikate verschlüsseln
Lesen [Hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Erweiterungen
Der Webtreiber unterstützt Erweiterungen.
Die Erweiterung ist ein URL-Handler, der bei einer solchen URL-Anfrage aufgerufen wird.
Die Erweiterungen ähneln dem normalen Adapter, haben jedoch keinen laufenden Prozess und werden vom Webserver aufgerufen.

Beispielsweise kann der Benutzer einen speziellen Proxy-Adapter aktivieren und andere Geräte (wie Webcams) auf demselben Webserver erreichen.
Es ist erforderlich, dass alle Dienste auf einem Webserver verfügbar sind.

Die Weberweiterung könnte und sollte die Funktion `unload` unterstützen, die `promise` zurückgeben könnte, wenn der Entladevorgang einige Zeit in Anspruch nimmt.

Weitere Informationen zu Web-Erweiterungen finden Sie unter [Hier](WEB-EXTENSIONS-HOWTO.md).

## Brute-Force-Schutz
Wenn die Authentifizierung aktiviert ist und der Benutzer innerhalb einer Minute fünfmal ein falsches Passwort eingibt, muss er mindestens eine Minute bis zum nächsten Versuch warten.
Nach dem 15. falschen Versuch muss der Benutzer eine Stunde warten.

## Option „Angemeldet bleiben“
Wenn diese Option aktiviert ist, bleibt der Benutzer einen Monat lang angemeldet. Andernfalls bleibt der Benutzer für die konfigurierte Anmeldezeitüberschreitung angemeldet.

## Zugriffsstatuswerte
Auf die normalen Zustandswerte können Sie über die HTTP-Get-Anfrage zugreifen.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

oder greifen Sie auf Dateien wie diese zu:

```
http://IP:8082/vis-2.0/javascript.picture.png =>
[IMAGE]
```

## Option "Basisauthentifizierung"
Ermöglicht die Anmeldung per Standardauthentifizierung durch Senden von `401` Unauthorized mit einem `WWW-Authenticate`-Header.
Dies kann für Anwendungen wie *FullyBrowser* verwendet werden. Bei einmaliger Eingabe falscher Anmeldedaten werden Sie zur Anmeldeseite weitergeleitet.

## Benutzerliste
Sie können die Liste der Benutzer definieren, die auf den Webserver zugreifen können. Sie können die Zugriffsrechte für angemeldete Benutzer ändern.

Wenn der Benutzer nicht in der Liste ist, kann er nicht auf den Webserver zugreifen.

Es ist einfacher, für jedes Objekt und jeden Status die Zugriffsrechte für den jeweiligen Benutzer festzulegen.

## Erweiterte Optionen
### Standardweiterleitung
Wenn beim Öffnen des Webports im Browser keine APP-Auswahl angezeigt werden soll, sondern eine bestimmte Anwendung, kann hier der Pfad angegeben werden (z.B. `/vis/`), damit dieser Pfad automatisch geöffnet wird.

## OAuth2-Authentifizierung
Der Webadapter unterstützt die OAuth2-Authentifizierung.

Um die Tokens zu erhalten, muss der Benutzer die URL aufrufen:

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` bedeutet, dass das Token im Browser gespeichert und für die nächsten Anfragen verwendet wird und ist optional.

Die Antwort lautet:

```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```

Weitere Informationen finden Sie hier: https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 7.0.6 (2025-03-09)
* (@GermanBluefox) Corrected the login for iobroker.visu app
* (@GermanBluefox) Corrected load of TypeScript Web extensions

### 7.0.4 (2025-03-04)
* (@GermanBluefox) Corrected the login page
* (@GermanBluefox) Removed the frequent debug output

### 7.0.3 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.1 (2025-03-02)
* (@GermanBluefox) [Breaking change] Removed simple-api as it could be connected as web-extension
* (@GermanBluefox) updated packages
* (@GermanBluefox) removed gulp in a build process
* (@GermanBluefox) Migrated GUI to vite
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Added new 404 and the directory list pages

### 6.3.1 (2024-09-23)
* (@foxriver76) added new admin icon (svg)

### 6.3.0 (2024-06-27)
* (bluefox) Corrected call of getObjectView with null parameter
* (bluefox) updated packages
* (bluefox) GUI was migrated to a non-style framework

### 6.2.6 (2024-05-25)
* (bluefox) Preparations for a custom loading background
* (bluefox) updated packages

### 6.2.5 (2024-02-22)
* (bluefox) Just some packages were updates

### 6.2.4 (2024-02-17)
* (klein0r) Extensions may block the web instance
* (klein0r) Fixed directory listing

### 6.2.3 (2023-12-18)
* (foxriver76) updated the websocket library to increase the maximum file size from 100 MB to 500 MB

### 6.2.2 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 6.2.1 (2023-12-04)
* (bluefox) Added the user access list option

### 6.1.10 (2023-10-16)
* (bluefox) Corrected the start screen

### 6.1.7 (2023-10-16)
* (bluefox) Added the public accessibility check

### 6.1.6 (2023-10-13)
* (bluefox) Corrected adapter termination if the alias has no target
* (bluefox) Corrected socket.io connection

### 6.1.4 (2023-10-08)
* (foxriver76) upgrade socketio and ws dependencies to fix a vis subscribe problem

### 6.1.3 (2023-09-28)
* (bluefox) upgraded socketio and ws dependencies to correct the error by unsubscribing on client disconnect

### 6.1.2 (2023-09-14)
* (foxriver76) upgraded socketio and ws dependencies

### 6.1.1 (2023-09-05)
* (mcm1957) Added missing node16 requirement

### 6.1.0 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 6.0.3 (2023-07-27)
* (bluefox) Updated packages
* (bluefox) Implemented the possibility to view folder content

### 6.0.1 (2023-03-20)
* (bluefox) Removed letsencrypt handling from web adapter

### 5.5.3 (2023-03-17)
* (bluefox) Increased max size of the uploaded file via socket.io to 200MB (from 10MB)

### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed reading projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used a new version of socket classes

## License
The MIT License (MIT)

Copyright (c) 2014-2025 Bluefox <dogafox@gmail.com>

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