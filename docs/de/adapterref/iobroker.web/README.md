---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: Gs/qbO+1pjIZueRWwbBH8E8MU5eC7XTFLuIcG2bG22I=
---
![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.web.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)

<img src="admin/web.svg" width="100" height="100" />

# ioBroker.web

Webserver auf Basis von Node.js und Express zum Lesen der Dateien aus der ioBroker-Datenbank.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## WebSockets optimieren

Bei einigen WebSocket-Clients kann es zu Leistungsproblemen bei der Kommunikation kommen. Diese Probleme entstehen mitunter durch die Verwendung eines Long-Polling-Mechanismus anstelle der Socket.IO-Kommunikation. Sie können die Option _„WebSockets erzwingen“_ aktivieren, um die ausschließliche Verwendung von WebSockets zu erzwingen.

## Let's Encrypt-Zertifikate

[Hier](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) lesen

Eine Zertifizierungsstelle validiert eine HTTP-01-Anfrage auf Port 80, sodass diese Anfrage auf einem Host mit einer öffentlichen IP-Adresse an dem Adapter landet, der diesen Port belegt. Wenn **Answer ACME HTTP-01-Anfragen** aktiviert sind (`acmeChallenge` (Standardeinstellung) Diese Instanz dient den Tokens. `acme` Adapter veröffentlicht unter `/.well-known/acme-challenge/` und die `acme` Der Adapter muss den Zugriff auf den Port nicht unterbrechen. Nur Anfragen nach einem veröffentlichten Token werden hier beantwortet, alle anderen Anfragen werden unverändert weitergeleitet. Deaktivieren Sie diese Option, um den Pfad ausschließlich zur Webanwendung zu belassen.

## HTTP/2

Mit aktiviertem HTTPS verwendet der Webserver HTTP/2: Der Browser lädt die Seite und alle zugehörigen Dateien über eine einzige Verbindung mit vielen parallelen Anfragen. Clients, die HTTP/2 nicht unterstützen, greifen automatisch auf HTTP/1.1 zurück, und WebSockets funktionieren weiterhin – Browser öffnen sie über eine separate HTTP/1.1-Verbindung. Ohne HTTPS hat diese Option keine Auswirkung, da Browser ausschließlich HTTP/2 über TLS verwenden.

Wenn ein Client oder eine Web-Erweiterung Probleme damit hat, schalten Sie die Option **"HTTP/2 verwenden** " um. `http2`) um bei HTTP/1.1 zu bleiben.

## Erweiterungen

Der Webdriver unterstützt Erweiterungen. Eine dieser Erweiterungen ist der URL-Handler, der bei entsprechenden URL-Anfragen aufgerufen wird. Die Erweiterungen ähneln dem normalen Adapter, haben aber keinen eigenen Prozess und werden vom Webserver aufgerufen.

Beispielsweise kann der Benutzer einen speziellen Proxy-Adapter aktivieren und so andere Geräte (wie Webcams) auf demselben Webserver erreichen. Es ist erforderlich, dass alle Dienste über einen einzigen Webserver verfügbar sind.

Web-Erweiterungen könnten und sollten unterstützen `unload` Funktion, die zurückgeben könnte `promise` Wenn der Entladevorgang einige Zeit in Anspruch nimmt.

Mehr über Web-Erweiterungen erfahren Sie [hier](/#/docs/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md) .

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

Standardmäßig enthält jedes zurückgegebene Objekt nur `_id`, `type` Und `common` Verwenden Sie die `extended` und/oder `native` Abfrageflags, um weitere Informationen anzufordern.

Wenn die `depth` Wird eine Abfrage verwendet und befindet sich ein passendes Objekt tiefer als die angeforderte Ebene, wird ein synthetischer Platzhalter genau in dieser Tiefe zurückgegeben:

```json
{ "_id": "0_userdata.0", "type": "virtual" }
```

Dadurch kann ein Baumbrowser erkennen, dass Inhalte unterhalb eines Zwischenpfads vorhanden sind, selbst wenn dieser Pfad selbst kein reales ioBroker-Objekt enthält. Virtuelle Objekte lassen dies absichtlich aus. `common` um die Nutzdaten klein zu halten – der Anzeigename kann abgeleitet werden von `_id` Ein reales Objekt mit derselben ID hat immer Vorrang vor seinem virtuellen Platzhalter.

```
http://IP:8082/object/0_userdata.0.branch.* =>
[ { "_id": "0_userdata.0.branch.a", "type": "state", "common": { ... } }, ... ]
```

Unterstützte Abfrageparameter:

| Parameter    | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | Nach Objekttyp filtern (z. B. `state`, `channel`, `device`, `folder`, `enum`, `instance`, ...). **Standardwert `state` ** wenn weggelassen. Weiter `all` Objekte jedes Typs abfragen.                                                                                                                                                                                                                                                                                                                                                                                              |
| `commonType` | Filtern nach `common.type` des Objekts (`number`, `string`, `boolean`, `mixed`, `array`, `object`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `depth`      | Maximale Anzahl von durch Punkte getrennten Teilen in der Objekt-ID. Um beispielsweise nur die direkten Kinder von `0_userdata.0.branch` (die aus 3 Teilen besteht), Anfrage `/object/0_userdata.0.branch.*?depth=4` Die `depth=1` ist geräuschlos daran befestigt `depth=2` (ioBroker-Objekte existieren auf einer Ebene oder auf drei oder mehr Ebenen – die zweistufigen „Instanz“-Einträge wie `0_userdata.0` (Das ist es, was ein Browser auf der Wurzel des Baums tatsächlich benötigt). Alle echten Einzelsegmentobjekte werden aus demselben Grund aus der Antwort entfernt. |
| `extended`   | Passieren `?extended` oder `?extended=true` zusätzlich Systemattribute wie z.B. einbeziehen `acl`, `from`, `ts`, `user`, `enums`, `_rev` Die                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `native`     | Passieren `?native` oder `?native=true` zusätzlich einzuschließen `native` Teil jedes Objekts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `system`     | Standardmäßig Objekte unter `system.*` Und `script.*` sind **ausgeblendet** . Pass `?system` oder `?system=true` um sie einzubeziehen.                                                                                                                                                                                                                                                                                                                                                                                                                                              |

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

## Die frühere integrierte „Simple API“

Bis Version 6.x verfügte dieser Adapter über einen **integrierten „Simple-API“** -Schalter, der Adressen wie beispielsweise beantwortete. `http://ip:8082/get/<id>` Und `http://ip:8082/set/<id>?value=…` direkt. Der Schalter ist seit Version 7.0 nicht mehr vorhanden. `simple-api` Der Adapter übernahm diese Funktion und kann **innerhalb** dieses Webservers als Web-Erweiterung ausgeführt werden, wodurch die alten Adressen unverändert wiederhergestellt werden – kein Skript, das diese verwendet, muss angepasst werden.

### Einrichtung

1. Installieren Sie den Adapte&#x72;** `simple-api` ** und eine Instanz davon erstellen.
2. Öffnen Sie die Einstellungen dieser Instanz und legen Sie unter **„Webinstanz“** die Webinstanz fest, die die Website bereitstellen soll, z. B. `web.0` (Leer gelassen, `simple-api` (Er betreibt stattdessen einen eigenen Server auf Port 8087 – das funktioniert auch, aber dann enthalten die Adressen seinen Port und nicht den dieses Servers.)
3. Speichern. Die Webinstanz wird neu gestartet und meldet die eingebundenen Pfade in ihrem Protokoll.

### Die Adressen

Läuft als Erweiterung, `simple-api` Antworten unter zwei Präfixen:

```
http://ip:8082/get/<id>                     the address as it was up to web 6.x
http://ip:8082/simple-api.0/get/<id>        the same, below the name of the instance
```

Für bestehende Skripte ändert sich also nichts:

```
http://ip:8082/set/0_userdata.0.Alarm.disable?value=true
http://ip:8082/getPlainValue/0_userdata.0.Temperature
```

Es sind die bekannten Befehle: `get`, `getPlainValue`, `getBulk`, `set`, `setBulk`, `setValueFromBody`, `toggle`, `getObjects`, `objects`, `getStates`, `states`, `search` Und `query` Die

### Authentifizierung

Unter welchem Benutzerkonto eine Anfrage ausgeführt wird, hängt von den **Authentifizierungseinstellungen** dieser Webinstanz ab:

- **Aus** – jede Anfrage wird als der Benutzer ausgeführt, der unter „Zugriff auf die Weboberfläche als“ konfiguriert ist.
- **Bei** der Anfrage muss sich die Anfrage auf eine von drei Arten identifizieren: mit der Sitzung eines Browsers, der an diesem Server angemeldet ist, mit einem `Authorization: Basic` Kopfzeile oder mit `?user=…&pass=…` in der Abfragezeichenfolge. Anmeldeinformationen in einer Abfragezeichenfolge werden unverschlüsselt übertragen und landen in Protokollen und im Browserverlauf. Verwenden Sie daher die Browserverlaufsdatei, wenn überhaupt, nur über HTTPS.

### Wenn Sie lieber die neuere API verwenden möchten.

`rest-api` ist der Nachfolger mit einer versionierten Schnittstelle und läuft auf die gleiche Weise als Web-Erweiterung. Seine Adressen unterscheiden sich –`get/<id>` wird `v1/state/<id>` und das vollständige Zustandsobjekt benötigt `?withInfo=true`:

```
http://ip:8082/v1/state/<id>?withInfo=true
```

## Option „Basisauthentifizierung“

Ermöglicht die Anmeldung per Basisauthentifizierung durch Senden `401` Nicht autorisiert mit einem `WWW-Authenticate` Kopfzeile. Dies kann für Anwendungen wie _FullyBrowser_ verwendet werden. Bei Eingabe falscher Anmeldedaten werden Sie zur Anmeldeseite weitergeleitet.

## Benutzerliste

Sie können die Liste der Benutzer definieren, die auf den Webserver zugreifen dürfen. Sie können die Zugriffsrechte für angemeldete Benutzer ändern.

Wenn der Benutzer nicht in der Liste steht, kann er nicht auf den Webserver zugreifen.

Es ist einfacher, als für jedes Objekt und jeden Zustand die Zugriffsrechte für den jeweiligen Benutzer festzulegen.

Neben einzelnen Benutzern können Sie auch ganze Gruppen zulassen. Ein Benutzer kann sich anmelden, sobald er in der Benutzerliste steht **oder** Mitglied einer der zugelassenen Gruppen ist – welche Gruppe es ist, spielt keine Rolle. Mitglieder einer zugelassenen Gruppe werden in der Benutzerliste automatisch als ausgewählt angezeigt, sodass Sie sie nicht erneut hinzufügen müssen. Durch das Hinzufügen einer Gruppe bleibt die Liste übersichtlich: Jeder, der der Gruppe später beitritt, kann sich anmelden, ohne dass Änderungen an dieser Instanz erforderlich sind.

Über _die Weboberfläche von Access legen Sie fest,_ mit welchen Zugriffsrechten der Zugriff erfolgt:

- **Eingeloggter Benutzer** – jeder behält seine eigenen Berechtigungen, sodass jeder Benutzer nur das sieht, was ihm seine Gruppen erlauben.
- **Ein bestimmter Benutzer** – jede zulässige Anmeldung agiert mit den Rechten dieses einen Benutzers, unabhängig davon, wer sich anmeldet. Dies ist die einfachste Möglichkeit, mehreren Personen einen gemeinsamen Satz von Berechtigungen zuzuweisen.

Ein Login, der weder den Benutzern noch den Gruppen entspricht, wird abgelehnt, und die Instanz protokolliert `User system.user.<name> is not in the user list` Die

Diese Liste legt lediglich fest, **wer sich anmelden darf** – sie vergibt keine Berechtigungen. Im Hintergrund gelten weiterhin die üblichen ioBroker-ACLs, sodass der Benutzer Leserechte für die Objekte, Zustände und Dateien benötigt, die er einsehen soll. Eine Gruppe mit allen aktivierten Berechtigungen ist daher nicht dasselbe wie die Administratorgruppe: Mitglieder von `system.group.administrator` Alle Dateiprüfungen müssen bestanden werden, alle anderen müssen die ACL der einzelnen Datei bestehen. Hochgeladene Dateien mit `0x660` (`defaultNewAcl.file` In `system.config`) gewährt "anderen" nichts, sodass ein Adapter, dessen Dateien so aussehen, einem Benutzer, der weder deren Eigentümer noch Mitglied der Eigentümergruppe ist, mit einem 404-Fehler antwortet.

## Erweiterte Optionen

### Standardweiterleitung

Soll beim Öffnen des Webports im Browser keine App-Auswahl, sondern eine bestimmte Anwendung angezeigt werden, kann der Pfad hier angegeben werden (z. B. `/vis/`) Dieser Pfad wird also automatisch geöffnet.

### Einbetten dieses Servers in eine andere Website

Ein Browser behandelt ein Cookie ohne …`SameSite` Attribut als `SameSite=Lax` und behält sie für sich, sobald die Seite zu einer anderen Herkunft gehört. Ein Dashboard, das eine Seite dieses Servers in ein `<iframe>` Daher erhält der Benutzer eine Anfrage ohne Sitzung und wird aufgefordert, sich innerhalb des Frames erneut anzumelden - während die gleiche Seite direkt geöffnet wird und funktioniert.

**„Einbettung auf anderen Websites zulassen“** sendet den Session-Cookie mit `SameSite=None; Secure` und sorgt dafür, dass dieser Fall funktioniert. Zwei Dinge gehen damit einher:

- Es benötigt TLS. Browser akzeptieren `SameSite=None` nur zusammen mit `Secure` Und ein als sicher gekennzeichneter Cookie wird niemals über normale Daten übertragen. `http://` Sie müssen also entweder die Verschlüsselung hier aktivieren oder TLS an einem Reverse-Proxy vor diesem Server beenden und **die öffentliche URL entsprechend festlegen.** `https://` Die Option „Adresse“ wird ignoriert und eine Warnung im Protokoll ausgegeben, obwohl beides nicht der Fall ist. Bei der Proxy-Variante muss der Proxy die Adresse senden. `X-Forwarded-Proto: https` Dadurch erfährt der Server, dass der Browser TLS verwendet hat. Ohne diesen Header wird kein Session-Cookie ausgegeben und niemand kann sich anmelden.
- Es gibt auf, was `SameSite` Schützt vor Folgendem: Der Session-Cookie wird dann mit Anfragen von _jeder_ anderen Website gesendet, nicht nur von derjenigen, in die Sie diesen Server einbetten. Lassen Sie diese Option deaktiviert, es sei denn, Sie betten diesen Server tatsächlich irgendwo ein.

Es hängt auch davon ab, ob der Browser noch Cookies von Drittanbietern akzeptiert, was bei der Chromium-Familie jedoch schrittweise eingestellt wird. Die Möglichkeit, dies weiterhin zu ermöglichen, besteht darin, ein OAuth2-Token in der URL zu übertragen, anstatt sich auf ein Cookie zu verlassen, das überhaupt kein seitenübergreifendes Cookie benötigt.

```html
<iframe src="https://iobroker.example.com:8082/some-page?token=<access_token>"></iframe>
```

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

- Clients entdecken den Server durch `/.well-known/oauth-authorization-server` und sich selbst registrieren, es sei denn, **die Option „Selbstregistrierung von Kunden zulassen“** ist deaktiviert.
- Nicht authentifizierte Anfragen, die _nicht_ nachfragen `text/html` werden beantwortet mit `401` und ein `WWW-Authenticate` Anstelle einer Weiterleitung zur Anmeldeseite wird eine Abfrage durchgeführt – eine Weiterleitung ist für einen API-Client nutzlos. Browser sind davon nicht betroffen.
- Web-Erweiterungen veröffentlichen ihre eigenen Ressourcenmetadaten unter `/.well-known/oauth-protected-resource/<path>` Diese Dokumente bleiben auch ohne Zugangsdaten lesbar.
- **Legen Sie die öffentliche URL fest** , wenn der Server hinter einem Reverse-Proxy läuft, und verwenden Sie HTTPS: Remote-Clients lehnen unverschlüsselte Daten ab. `http://` Die

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 9.1.12 (2026-10-04)

- (@GermanBluefox) Behoben: Bei aktiviertem Cache wird eine Datei, die ein Adapter unter demselben Namen erneut schreibt, neu ausgeliefert, anstatt dauerhaft in der zuerst gelesenen Version gespeichert zu werden. Das war die Ursache. `sayit` Die gleiche Meldung wird wiederholt. Der Cache hatte keinerlei Möglichkeit, von einer Änderung zu erfahren – der Adapter hatte die zwischengespeicherten Dateien nie abonniert. Das ändert sich nun, allerdings nur für diese Namensräume, und der Eintrag wird gelöscht, sobald sich die Datei ändert.
- (@GermanBluefox) Behoben: Ein Adapter, der als Web-Erweiterung läuft, ist auf der Übersichtsseite mit diesem Server verknüpft, anstatt mit einem eigenen Port, auf dem kein Dienst lauscht. Der Eintrag, den ein solcher Adapter bereitstellt, lautet: `welcomePage()` wurde erst erfasst, nachdem die Liste bereits bereinigt und ihre Links aufgelöst worden waren, daher wurde sie nie erfasst. `localLink` Die Seite wurde wortlos gelöscht und hinterließ nur den toten Link von `common.localLinks` hinter
- (@GermanBluefox) Die Ordnerübersicht sieht jetzt aus wie die Admin-Oberfläche: Eine App-Leiste zeigt Pfad und Anzahl der Einträge an, Ordner- und Dateisymbole werden angezeigt, die Größe in einer lesbaren Einheit, und die Seite wählt automatisch ein helles und ein dunkles Design aus den Systemeinstellungen. Ein Ordner mit 0 Byte zeigt nun „0 B“ statt nichts an, und der Pfad nach oben führt nicht mehr vom Stammverzeichnis eines Adapters aus, wo er zuvor angezeigt wurde.
- (@GermanBluefox) Ein unerwarteter Fehler beim Lesen einer Sitzung beendet die Instanz nicht mehr. Der Sitzungsspeicher antwortet aus einem eigenen Task, sodass eine Ausnahme in einem seiner Callbacks weder Express noch einen anderen Task erreicht. `try/catch` Der Controller beendete den gesamten Webserver aufgrund einer einzigen Anfrage. Die vier Callback-Funktionen sind nun abgesichert und antworten stattdessen mit einem 500-Fehler. Dasselbe galt für zwei Promises in `onObjectChange` /`onStateChange` ohne `catch`, wobei ein abgelehnter Lesevorgang der Socket-URL als unbehandelte Ablehnung eintraf
- (@GermanBluefox) Die Option „Einbettung auf anderen Websites zulassen“ wurde hinzugefügt: Der Session-Cookie wird mit `SameSite=None; Secure` Eine Seite dieses Servers behält ihre Sitzung bei, wenn sie von einer anderen Website in einem iFrame eingebettet wird. Hierfür ist SSL oder ein HTTPS-Reverse-Proxy mit der festgelegten öffentlichen URL erforderlich. SSL ist standardmäßig deaktiviert, da dadurch der Schutz verloren geht. `SameSite` regelt gegen Anfragen ausländischer Seiten
- (@GermanBluefox) Behoben: ein Aufruf von `/prolongSession` Die Instanz wird nicht mehr beendet. Die Sitzung wurde dem Speicher ohne Gültigkeitsdauer übergeben, der Speicher hat das Sitzungsobjekt selbst verwendet, und die Typprüfung des Controllers hat den Adapter mit der Fehlermeldung „Parameter ttl muss vom Typ Zahl sein“ beendet. Die Sitzung wird außerdem unter der ID, die ihr Cookie enthält, zurückgeschrieben. `req.session.id` Es handelt sich um eine andere Sitzung, sobald express-session eine neue Sitzung für die Anfrage startete, und dann wurde die falsche Sitzung verlängert.
- (@GermanBluefox) Behoben: Eine Adresse ohne schließenden Schrägstrich -`/vis-2` anstatt `/vis-2/` Die Fehlermeldung führt zur Anwendung anstatt zu einem 404-Fehler. Sie wird, wie jeder andere Webserver auch, mit einer Weiterleitung zur Adresse mit Schrägstrich beantwortet.
- (@GermanBluefox) Ein 404-Fehler gibt die angeforderte Adresse an, nicht den Dateinamen, der nach dem Abschneiden des Adapternamens übrig bleibt, und protokolliert dies im Debug-Modus.
- (@hdering) Eine Webinstanz, die neu gestartet wird, um eine geänderte Web-Erweiterung zu laden, protokolliert dies als Information mit dem Grund anstelle der Warnung "Beendet (-100): Ohne Grund"

### 9.1.11 (2026-10-02)

- (@hdering) Das Aktualisieren eines Adapters mit einer Web-Erweiterung startet nur die Webinstanzen neu, auf denen er ausgeführt wird, nicht jede Webinstanz.
- (@GermanBluefox) Behoben: Ein Benutzer, der über die „Benutzerliste“ aufgrund einer Gruppe zugelassen wurde, wurde unabhängig von der jeweiligen Gruppe zugelassen. Bisher wurde nur die erste Gruppe, der der Benutzer angehörte, mit den zulässigen Gruppen verglichen. Daher wurde ein Benutzer, der mehreren Gruppen angehörte, abgelehnt, wenn die erste Gruppe nicht in der Liste aufgeführt war. Die Reihenfolge der Gruppen entspricht ihrer Erstellungsreihenfolge, was den Eindruck erweckte, dies sei willkürlich.

### 9.1.9 (2026-09-28)

- (@GermanBluefox) OnScreen-Status für App hinzugefügt

### 9.1.8 (2026-09-24)

- (@GermanBluefox) Ein leerer Körper für `cloud.X.remote.command` wird mit einem 400-Fehler abgelehnt, anstatt einen leeren Befehl zu schreiben, der ohne Wort verworfen wird.

### 9.1.7 (2026-09-21)

- (@joltcoke) Behoben: Nach dem Login landete der Benutzer erneut auf der angeforderten Seite, selbst wenn die URL einen Query-String enthielt. Das Ziel wurde nach der Dekodierung anhand einer Zeichenliste ohne "=" validiert, sodass jeder gültige Query-Parameter den Benutzer stattdessen zur Root-Seite weiterleitete. Ein Fragment der angeforderten URL wurde ebenfalls gespeichert.
- (@GermanBluefox) Behoben: Bei einem Tippfehler im Passwort wird man nun mit einer Fehlermeldung zur Anmeldeseite weitergeleitet, anstatt einen 404-Fehler zu erhalten. Die angeforderte Seite geht dabei nicht verloren.
- (@GermanBluefox) Behoben: Ein Deep Link, der mit einer JavaScript-Datei beantwortet wurde, behielt seine gesamte Abfragezeichenfolge bei – sie war beim ersten „&“ abgeschnitten worden.
- (@GermanBluefox) Ein Ziel mit einem Steuerzeichen wird erneut abgelehnt: Browser entfernen Tabulatoren und Zeilenumbrüche, bevor sie eine URL lesen, die zu "/" wurde.<TAB> /host" in einen Link umwandeln, der diesen Server verlässt

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