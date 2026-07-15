---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: RX5gJmwINYaHb24oUVM7SD+u2tYaXo/mtiJf7P5Zl/4=
---
![Logo](../../../en/adapterref/iobroker.web/admin/web.png)

![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.web.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![Test und Freigabe](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Webserver auf Basis von Node.js und Express zum Lesen der Dateien aus der ioBroker-Datenbank.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## WebSockets optimieren
Bei einigen WebSocket-Clients kann es zu Leistungsproblemen bei der Kommunikation kommen.
Dieses Problem wird mitunter durch die Verwendung eines Long-Polling-Mechanismus anstelle der Socket.IO-Kommunikation verursacht. Sie können die Option „WebSockets erzwingen“ aktivieren, um die ausschließliche Verwendung von WebSockets zu erzwingen.

## Let's Encrypt-Zertifikate
Lesen Sie [Hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Erweiterungen
Der Webdriver unterstützt Erweiterungen.
Die Erweiterung ist ein URL-Handler, der aufgerufen wird, wenn eine entsprechende URL-Anfrage eingeht. Die Erweiterungen ähneln dem normalen Adapter, haben aber keinen eigenen Prozess und werden vom Webserver aufgerufen.

Beispielsweise kann der Benutzer einen speziellen Proxy-Adapter aktivieren und so andere Geräte (wie Webcams) auf demselben Webserver erreichen.
Es ist erforderlich, dass alle Dienste über einen einzigen Webserver verfügbar sind.

Die Web-Erweiterung könnte und sollte die Funktion `unload` unterstützen, die `promise` zurückgeben könnte, wenn der Entladevorgang einige Zeit in Anspruch nimmt.

Mehr über Web-Erweiterungen können Sie unter [Hier](WEB-EXTENSIONS-HOWTO.md) nachlesen.

## Schutz vor Brute-Force-Angriffen
Wenn die Authentifizierung aktiviert ist und der Benutzer innerhalb einer Minute fünfmal ein falsches Passwort eingibt, muss er mindestens eine Minute warten, bevor er es erneut versuchen kann. Nach dem 15. Fehlversuch muss der Benutzer eine Stunde warten.

## Option "Angemeldet bleiben"
Wenn diese Option ausgewählt ist, bleibt der Benutzer einen Monat lang angemeldet. Andernfalls bleibt der Benutzer für die konfigurierte Anmeldezeitüberschreitung angemeldet.

## Zugriff auf die Werte des Zugriffszustands
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
Objekte (einschließlich Muster mit Platzhaltern) können per HTTP-GET-Anfrage gelesen werden. Die Antwort ist **immer ein JSON-Array**, da das Muster auf mehrere Objekte zutreffen kann.

Standardmäßig enthält jedes zurückgegebene Objekt nur `_id`, `type` und `common`. Verwenden Sie die Abfrageparameter `extended` und/oder `native`, um weitere Daten anzufordern.

Wenn die Abfrage `depth` verwendet wird und sich ein übereinstimmendes Objekt tiefer als die angeforderte Ebene befindet, wird ein synthetischer Platzhalter genau in dieser Tiefe zurückgegeben:

```json
{ "_id": "0_userdata.0", "type": "virtual" }
```

Dadurch kann ein Baumbrowser erkennen, dass Inhalte unterhalb eines Zwischenpfads vorhanden sind, selbst wenn dieser Pfad selbst kein reales ioBroker-Objekt enthält. Virtuelle Objekte lassen `common` absichtlich weg, um die Nutzdaten klein zu halten – der Anzeigename kann von `_id` abgeleitet werden. Ein reales Objekt mit derselben ID hat immer Vorrang vor seinem virtuellen Platzhalter.

```
http://IP:8082/object/0_userdata.0.branch.* =>
[ { "_id": "0_userdata.0.branch.a", "type": "state", "common": { ... } }, ... ]
```

Unterstützte Abfrageparameter:

| Parameter | Beschreibung |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | Filtert nach Objekttyp (z. B. `state`, `channel`, `device`, `folder`, `enum`, `instance`, ...). **Standardmäßig wird `state` verwendet**, wenn dieser Parameter weggelassen wird. Verwenden Sie `all`, um Objekte aller Typen abzufragen. |
| `depth` | Absolute Maximalanzahl von durch Punkte getrennten Teilen in der Objekt-ID. Um beispielsweise nur die direkten Kinder von `0_userdata.0.branch` (das 3 Teile hat) abzurufen, fordern Sie `/object/0_userdata.0.branch.*?depth=4` an. `depth=1` wird stillschweigend auf `depth=2` begrenzt (ioBroker-Objekte existieren auf 1 Ebene oder 3+ Ebenen – die 2-stufigen „Instanz“-Einträge wie `0_userdata.0` sind das, was ein Browser auf der Wurzel des Baums tatsächlich benötigt). Alle echten Einzelsegmentobjekte werden aus dem gleichen Grund aus der Antwort entfernt. |
| `extended` | Übergeben Sie `?extended` oder `?extended=true`, um zusätzlich Systemattribute wie `acl`, `from`, `ts`, `user`, `enums`, `_rev` einzuschließen. |
| `native` | Übergeben Sie `?native` oder `?native=true`, um zusätzlich den Teil `native` jedes Objekts einzuschließen. |
| `system` | Objekte unter `system.*` und `script.*` sind standardmäßig **ausgeblendet**. Übergeben Sie `?system` oder `?system=true`, um sie einzuschließen. |
| `system` | Standardmäßig sind Objekte unter `system.*` und `script.*` **ausgeblendet**. Verwenden Sie `?system` oder `?system=true`, um sie einzuschließen. |

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

## Option "Basisauthentifizierung"
Ermöglicht die Anmeldung per Basisauthentifizierung durch Senden der Meldung „`401` Nicht autorisiert“ mit einem Header „`WWW-Authenticate`“.

Dies kann für Anwendungen wie *FullyBrowser* verwendet werden. Bei Eingabe falscher Anmeldedaten werden Sie zur Anmeldeseite weitergeleitet.

## Benutzerliste
Sie können die Liste der Benutzer definieren, die auf den Webserver zugreifen dürfen. Sie können die Zugriffsrechte für angemeldete Benutzer ändern.

Wenn der Benutzer nicht in der Liste steht, kann er nicht auf den Webserver zugreifen.

Es ist einfacher, als für jedes Objekt und jeden Zustand die Zugriffsrechte für den jeweiligen Benutzer festzulegen.

## Erweiterte Optionen
### Standardweiterleitung
Soll beim Öffnen des Webports im Browser keine App-Auswahl, sondern eine bestimmte Anwendung angezeigt werden, kann der Pfad hier angegeben werden (z. B. `/vis/`), sodass dieser Pfad automatisch geöffnet wird.

## OAuth2-Authentifizierung
Der Webadapter unterstützt die OAuth2-Authentifizierung.

Um die Token zu erhalten, muss der Benutzer die folgende URL aufrufen:

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` bedeutet, dass das Token im Browser gespeichert und für die nächsten Anfragen verwendet wird; die Angabe ist optional.

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

Weitere Informationen finden Sie hier: https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->
### 9.0.0 (2026-06-21)
* (@GermanBluefox) Verwendete Bibliotheken für die Socket-Kommunikation anstelle von Adaptern
* (@GermanBluefox) Migriert zu TS 6

### 8.3.0 (2026-06-12)
* (@SimonFischer04) Option „rootPath“ hinzugefügt, um den Betrieb hinter einem Reverse-Proxy zu unterstützen.

### 8.2.0 (2026-05-21)
* (@GermanBluefox) Der GET-Endpunkt `/object/<ID>` wurde mit den Abfrageparametern `type`, `commonType`, `depth`, `extended`, `native` und `system` zum Lesen von Objekten hinzugefügt (Wildcards werden unterstützt). Standardmäßig werden nur `_id`, `type` und `common` zurückgegeben, wobei `type` standardmäßig auf `state` gesetzt ist. Objekte unter `system.*` / `script.*` werden ausgeblendet. Mit dem Parameter `depth` werden bei tieferen Übereinstimmungen synthetische Platzhalter `type: "virtual"` erzeugt, sodass ein Baumbrowser erkennen kann, dass darunter Inhalte vorhanden sind.
* (@GermanBluefox) Die Einstellung „Objektzustellung deaktivieren“ wurde hinzugefügt, um den Endpunkt `/object/<ID>` ein- bzw. auszuschalten.

### 8.1.0 (2026-04-13)
* (@GermanBluefox) Pakete aktualisiert.
* (@GermanBluefox) Mögliche Fehler korrigiert

### 8.0.0 (18.02.2026)
* (@GermanBluefox) Pakete aktualisiert. Die minimale Node.js-Version ist jetzt 20.0.0.
* (@GermanBluefox) Binärzustände entfernt
* (@GermanBluefox) Möglichkeit hinzugefügt, Werte über den Endpunkt `/state/` mit `POST` zu schreiben.

[Ältere Änderungsprotokolle finden Sie dort.](CHANGELOG_OLD.md)

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