---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: hltxFeYa4tUeonII7kmTyhAf59aCK9J8BCj2zDv+EJY=
---
![Logo](../../../en/adapterref/iobroker.web/admin/web.png)

![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.web.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)

# ioBroker.web

Webserver auf Basis von Node.js und Express zum Lesen der Dateien aus der ioBroker-Datenbank.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## WebSockets optimieren

Bei einigen WebSocket-Clients kann es zu Leistungsproblemen bei der Kommunikation kommen. Diese Probleme entstehen mitunter durch die Verwendung eines Long-Polling-Mechanismus anstelle der Socket.IO-Kommunikation. Sie können die Option _„WebSockets erzwingen“_ aktivieren, um die ausschließliche Verwendung von WebSockets zu erzwingen.

## Let's Encrypt-Zertifikate

[Hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) lesen

Eine Zertifizierungsstelle validiert eine HTTP-01-Anfrage auf Port 80, sodass diese Anfrage auf einem Host mit einer öffentlichen IP-Adresse an dem Adapter landet, der diesen Port belegt. Wenn **Answer ACME HTTP-01-Anfragen** aktiviert sind (`acmeChallenge` (Standardeinstellung) Diese Instanz dient den Tokens.`acme` Adapter veröffentlicht unter`/.well-known/acme-challenge/` und die`acme` Der Adapter muss den Zugriff auf den Port nicht unterbrechen. Nur Anfragen nach einem veröffentlichten Token werden hier beantwortet, alle anderen Anfragen werden unverändert weitergeleitet. Deaktivieren Sie diese Option, um den Pfad ausschließlich zur Webanwendung zu belassen.

## Erweiterungen

Der Webdriver unterstützt Erweiterungen. Eine dieser Erweiterungen ist der URL-Handler, der bei entsprechenden URL-Anfragen aufgerufen wird. Die Erweiterungen ähneln dem normalen Adapter, haben aber keinen eigenen Prozess und werden vom Webserver aufgerufen.

Beispielsweise kann der Benutzer einen speziellen Proxy-Adapter aktivieren und so andere Geräte (wie Webcams) auf demselben Webserver erreichen. Es ist erforderlich, dass alle Dienste über einen einzigen Webserver verfügbar sind.

Web-Erweiterungen könnten und sollten unterstützen`unload` Funktion, die zurückgeben könnte`promise` Wenn der Entladevorgang einige Zeit in Anspruch nimmt.

Mehr über Web-Erweiterungen können Sie [hier](/#/docs/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md) lesen.

## Schutz vor roher Gewalt

Ist die Authentifizierung aktiviert und gibt der Benutzer innerhalb einer Minute fünfmal ein falsches Passwort ein, muss er mindestens eine Minute warten, bevor er es erneut versuchen kann. Nach dem 15. Fehlversuch muss der Benutzer eine Stunde warten.

## Option „Angemeldet bleiben“

Wenn diese Option ausgewählt ist, bleibt der Benutzer einen Monat lang angemeldet. Andernfalls bleibt der Benutzer für das konfigurierte „Anmelde-Timeout“ angemeldet.

## Zugriff auf die Werte des Status

Sie können über eine HTTP-GET-Anfrage auf die Normalzustandswerte zugreifen.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

oder auf Dateien wie diese zugreifen:

```
http://IP:8082/vis-2.0/javascript.picture.png =>
[IMAGE]
```

Ab Version 8.0.0 können Sie Werte auch per HTTP-POST-Anfrage schreiben:

```
[POST] http://IP:8082/state/javascript.0.myVariable => true
```

Oder als JSON-Objekt mit zusätzlichen Parametern:

```
[POST] http://IP:8082/state/javascript.0.myVariable =>
{"val": true, "ack": false}
```

Hinweis: Um diese Funktion nutzen zu können, muss die Option „Status und Socket-Informationen deaktivieren“ in den Webadapter-Einstellungen deaktiviert sein.

## Zugriffsobjekte

Objekte (einschließlich Muster mit Platzhaltern) können per HTTP-GET-Anfrage gelesen werden. Die Antwort ist **immer ein JSON-Array** , da das Muster auf mehrere Objekte zutreffen kann.

Standardmäßig enthält jedes zurückgegebene Objekt nur`_id` ,`type` Und`common` Verwenden Sie die`extended` und/oder`native` Abfrageflags, um weitere Informationen anzufordern.

Wenn die`depth` Wird eine Abfrage verwendet und befindet sich ein passendes Objekt tiefer als die angeforderte Ebene, wird ein synthetischer Platzhalter genau in dieser Tiefe zurückgegeben:

```json
{ "_id": "0_userdata.0", "type": "virtual" }
```

Dadurch kann ein Baumbrowser erkennen, dass Inhalte unterhalb eines Zwischenpfads vorhanden sind, selbst wenn dieser Pfad selbst kein reales ioBroker-Objekt enthält. Virtuelle Objekte lassen dies absichtlich aus.`common` um die Nutzdaten klein zu halten – der Anzeigename kann abgeleitet werden von`_id` Ein reales Objekt mit derselben ID hat immer Vorrang vor seinem virtuellen Platzhalter.

```
http://IP:8082/object/0_userdata.0.branch.* =>
[ { "_id": "0_userdata.0.branch.a", "type": "state", "common": { ... } }, ... ]
```

Unterstützte Abfrageparameter:

| Parameter    | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | Nach Objekttyp filtern (z. B.`state` ,`channel` ,`device` ,`folder` ,`enum` ,`instance` , ...). **Standardwert`state`** wenn weggelassen. Weiter`all` Objekte jedes Typs abfragen.                                                                                                                                                                                                                                                                                                                                                                                              |
| `commonType` | Filtern nach`common.type` des Objekts (`number` ,`string` ,`boolean` ,`mixed` ,`array` ,`object` ).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `depth`      | Maximale Anzahl von durch Punkte getrennten Teilen in der Objekt-ID. Um beispielsweise nur die direkten Kinder von`0_userdata.0.branch` (die aus 3 Teilen besteht), Anfrage`/object/0_userdata.0.branch.*?depth=4` Die`depth=1` ist geräuschlos daran befestigt`depth=2` (ioBroker-Objekte existieren auf einer Ebene oder auf drei oder mehr Ebenen – die zweistufigen „Instanz“-Einträge wie`0_userdata.0` (Das ist es, was ein Browser auf der Wurzel des Baums tatsächlich benötigt). Alle echten Einzelsegmentobjekte werden aus demselben Grund aus der Antwort entfernt. |
| `extended`   | Passieren`?extended` oder`?extended=true` zusätzlich Systemattribute wie z.B. einbeziehen`acl` ,`from` ,`ts` ,`user` ,`enums` ,`_rev` Die                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `native`     | Passieren`?native` oder`?native=true` zusätzlich einzuschließen`native` Teil jedes Objekts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `system`     | Standardmäßig Objekte unter`system.*` Und`script.*` sind **ausgeblendet** . Pass`?system` oder`?system=true` um sie einzubeziehen.                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Beispiele:

```
[GET] http://IP:8082/object/0_userdata.0.branch.*?depth=4&type=all
[GET] http://IP:8082/object/0_userdata.0.*?type=state
[GET] http://IP:8082/object/0_userdata.0.*?type=state&commonType=boolean
[GET] http://IP:8082/object/system.adapter.web.0?native=true
[GET] http://IP:8082/object/system.adapter.web.0?extended=true&native=true
[GET] http://IP:8082/object/system.adapter.web.0
```

Hinweis: Um diese Funktion nutzen zu können, muss die Option „Objektübermittlung deaktivieren“ in den Webadaptereinstellungen deaktiviert sein.

## Option „Basisauthentifizierung“

Ermöglicht die Anmeldung per Basisauthentifizierung durch Senden`401` Nicht autorisiert mit einem`WWW-Authenticate` Kopfzeile. Dies kann für Anwendungen wie _FullyBrowser_ verwendet werden. Bei Eingabe falscher Anmeldedaten werden Sie zur Anmeldeseite weitergeleitet.

## Benutzerliste

Sie können die Liste der Benutzer definieren, die auf den Webserver zugreifen dürfen. Sie können die Zugriffsrechte für angemeldete Benutzer ändern.

Wenn der Benutzer nicht in der Liste steht, kann er nicht auf den Webserver zugreifen.

Es ist einfacher, als für jedes Objekt und jeden Zustand die Zugriffsrechte für den jeweiligen Benutzer festzulegen.

## Erweiterte Optionen

### Standardweiterleitung

Soll beim Öffnen des Webports im Browser keine App-Auswahl, sondern eine bestimmte Anwendung angezeigt werden, kann der Pfad hier angegeben werden (z. B.`/vis/` ) Dieser Pfad wird also automatisch geöffnet.

## OAuth2-Authentifizierung

Der Webadapter unterstützt die OAuth2-Authentifizierung.

Um die Token zu erhalten, muss der Benutzer die folgende URL aufrufen:

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` Das bedeutet, dass das Token im Browser gespeichert und für die nächsten Anfragen verwendet wird; die Angabe ist optional.

Die Antwort lautet etwa so:

```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```

Weitere Informationen finden Sie hier: <https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support>

## Autorisierung von Drittanbieterclients (OAuth)

Der oben genannte Token-Endpunkt erfordert, dass der Client das ioBroker-Passwort des Benutzers verarbeitet. Clients, die außerhalb Ihrer Kontrolle laufen – MCP-Clients oder Web-Erweiterungen, die diese bereitstellen – dürfen dies nicht tun. Durch Aktivieren von **„Drittanbieter-Clients zulassen“** in den Einstellungen wird zusätzlich der browserbasierte OAuth2-Autorisierungscode-Flow mit PKCE bereitgestellt: Der Client wird auf eine Anmelde- und Zustimmungsseite weitergeleitet, der Benutzer bestätigt die Eingabe, und der Client erhält ein Token, das an die angeforderte Ressource gebunden ist.

Diese Funktion ist standardmäßig deaktiviert. Wenn sie aktiviert ist:

- Clients entdecken den Server durch`/.well-known/oauth-authorization-server` und sich selbst registrieren, es sei denn, **die Option „Selbstregistrierung von Kunden zulassen“** ist deaktiviert.
- Nicht authentifizierte Anfragen, die _nicht_ danach fragen`text/html` werden beantwortet mit`401` und ein`WWW-Authenticate` Anstelle einer Weiterleitung zur Anmeldeseite wird eine Abfrage durchgeführt – eine Weiterleitung ist für einen API-Client nutzlos. Browser sind davon nicht betroffen.
- Web-Erweiterungen veröffentlichen ihre eigenen Ressourcenmetadaten unter`/.well-known/oauth-protected-resource/<path>` Diese Dokumente bleiben auch ohne Zugangsdaten lesbar.
- **Legen Sie die öffentliche URL fest** , wenn der Server hinter einem Reverse-Proxy läuft, und verwenden Sie HTTPS: Remote-Clients lehnen unverschlüsselte Daten ab.`http://` Die

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 9.1.4 (2026-08-31)

- (@GermanBluefox) Aktualisierte Pakete

### 9.1.3 (2026-08-28)

- (@GermanBluefox) Aktualisierte Pakete

### 9.1.2 (2026-08-27)

- (@GermanBluefox) Die Einstellung wurde hinzugefügt.`acmeChallenge` (standardmäßig aktiviert): Der Webserver beantwortet die vom ACME-Adapter veröffentlichten ACME HTTP-01-Herausforderungen, sodass der ACME-Adapter diese Instanz nicht mehr stoppen muss, um Port 80 zu erreichen.

### 9.1.1 (2026-08-26)

- (@GermanBluefox) Die fehlenden CORS-Header wurden für alle Routen behoben, die antworten, ohne die Anfrage weiterzuleiten – dies betraf den gesamten OAuth2-Server. Das Abrufen eines Tokens von einem Browser einer anderen Domain schlug fehl.`No Access-Control-Allow-Origin header is present` Die CORS-Middleware ist nun vor allen Routen anstatt dahinter registriert.
- (@GermanBluefox) Ein reflektierter Ursprung wird nun zusammen mit gesendet`Vary: Origin` und eine nicht festgelegte Ursprungs-, Methoden- oder Headerliste wird nicht mehr als Literalzeichenkette zurückgegeben.`undefined` in der Antwort

### 9.1.0 (2026-08-04)

- (@GermanBluefox) Der OAuth2-Autorisierungscode-Flow wurde mit PKCE hinzugefügt, sodass Drittanbieter-Clients (z. B. MCP-Clients) autorisiert werden können, ohne das Benutzerpasswort einzusehen.
- (@GermanBluefox) Nicht authentifizierte Nicht-HTML-Anfragen erhalten jetzt eine`401` Eine Authentifizierungsanfrage anstelle einer Anmeldeumleitung ist erforderlich, wenn OAuth aktiviert ist.
- (@GermanBluefox) Aktualisiert`@iobroker/webserver` bis 2.0.1

[Ältere Änderungsprotokolle finden Sie dort.](https://github.com/ioBroker/ioBroker.web/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2014-2026 Bluefox <dogafox@gmail.com>

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