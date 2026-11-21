---
chapters: {"pages":{"en/adapterref/iobroker.web/README.md":{"title":{"en":"ioBroker.web"},"content":"en/adapterref/iobroker.web/README.md"},"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md":{"title":{"en":"Web extensions"},"content":"en/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: QU5x44ZlNBT3wbOqUlp+SsA8enj4wLIHHKhPoBtmtt0=
---
![Anzahl der Installationen](https://iobroker.live/badges/web-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.web.svg)
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

Soll beim Öffnen des Webports im Browser keine App-Auswahl angezeigt werden, sondern eine bestimmte Anwendung, kann der Pfad hier angegeben werden (z. B. `/vis/`) Dieser Pfad wird also automatisch geöffnet.

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

## Single Sign-On (OIDC)

Nutzer können sich anstelle eines Passworts mit einem OpenID Connect-Identitätsanbieter (z. B. Keycloak) auf der Anmeldeseite anmelden. Daraufhin wird eine zusätzliche Schaltfläche **für Single Sign-On** angezeigt; Benutzername und Passwort bleiben weiterhin verfügbar.

Web verwendet die gleiche Kontoverknüpfung wie der Admin-Adapter: die Identität (`sub`) des Anbieters wird gespeichert in `common.externalAuthentication.oidc.sub` Für einen bestehenden ioBroker-Benutzer. **Web erstellt weder Benutzer noch verknüpft es Identitäten.** Verknüpfen Sie den Benutzer zuerst im Admin-Adapter. Eine nicht verknüpfte Identität wird abgelehnt und die Anmeldeseite zeigt einen Fehler an.

Einstellungen ( **die Authentifizierung** muss aktiviert sein und ist standardmäßig deaktiviert):

- **Single Sign-On (OIDC)** – aktiviert diese Funktion. Ohne Aussteller- und Client-ID werden keine Leistungen angeboten. Die Verwendung mit der [Benutzerliste](#user-list) ist nicht möglich (siehe unten).
- **OIDC-Aussteller-URL** – die Adresse des Anbieters, z. B. `https://keycloak.example.com/realms/home` Die
- **OIDC-Client-ID** – der für diese Webinstanz registrierte Client.
- **OIDC-Client-Geheimnis** – optional. Lassen Sie dieses Feld für einen öffentlichen Client leer; dieser verwendet dann PKCE. Das Geheimnis wird verschlüsselt gespeichert.
- **OIDC-Bereiche** - Standard `openid profile email`. Nur `openid` wird benötigt, weil nur die `sub` wird verwendet.
- **Öffentliche URL** – die externe Adresse dieses Servers. Die Einstellungen zeigen die Umleitungs-URI für die Registrierung beim Anbieter an: `<public URL>/sso-callback` Ohne eine öffentliche URL wird diese aus der Anfrage abgeleitet, was hinter einem Reverse-Proxy nicht korrekt ist.

Was passiert beim Einloggen?

- Das Ergebnis wird als Einmalcode an die Anmeldeseite übermittelt und gegen das Webtoken eingetauscht. Tokens erscheinen niemals in der URL.
- Der Benutzer meldet sich als der verknüpfte ioBroker-Benutzer an, und zwar als kein anderer. Einem deaktivierten Benutzer wird der Zugriff verweigert, wie beispielsweise bei einem Passwort (abgesehen von …). `admin`).
- Sitzungsdauer: dieselbe wie bei einer Passwortanmeldung über `/oauth/token` Das Zugriffstoken ist bis zum Ablauf des _Anmelde-Timeouts_ gültig, das Aktualisierungstoken mindestens 30 Tage lang.
- Der Zugriffstoken-Cookie wird mit dem Ende der Browsersitzung ungültig. Im Gegensatz zur Anmeldung mit einem Passwort wird ihm durch die Option „Angemeldet bleiben“ keine dauerhafte Gültigkeitsdauer zugewiesen; sie legt lediglich fest, wo die Anmeldeseite die Token im Browser speichert.
- Nach Ablauf des Tokens erscheint die Anmeldeseite erneut. Ein weiterer Klick auf _„Single Sign-On“_ ermöglicht die Anmeldung ohne Passwort, sofern die Sitzung beim Identitätsanbieter noch gültig ist.
- Das Abmelden vom Web beendet lediglich die Websitzung. Die Sitzung beim Identitätsanbieter bleibt bestehen, sodass beim nächsten Klick auf _Single Sign-On_ eine erneute Anmeldung ohne Passwort möglich ist.

### Single Sign-On und die Benutzerliste

Single Sign-On und die [Benutzerliste](#user-list) schließen sich gegenseitig aus. Bei _aktivierter Webinterface-Zugriffsoption_ würde die Benutzerliste einen anderen Benutzer in das Anmeldetoken einfügen. Dieses Token ist sowohl für den Admin-Adapter als auch für alle anderen Adapter gültig: Ein Benutzer könnte dort ebenfalls die Rechte des ausgewählten Benutzers erhalten. Die Einstellungen bieten daher nur eine der beiden Optionen. Sind beide aktiviert (z. B. aufgrund einer älteren Konfiguration), deaktiviert das Webinterface Single Sign-On und protokolliert eine Warnung, sodass die Benutzerliste weiterhin Anwendung findet.

### Keycloak einrichten

Der `sub` Die Benutzerkennung ist für alle Clients eines Realms identisch, daher funktioniert die im Admin-Adapter erstellte Verknüpfung auch für Webanwendungen. Wir empfehlen, pro Adapter einen Client zu verwenden (z. B. einen für Admin und einen für Web) im selben Realm.

- Gültige Umleitungs-URI: genau `https://<host>:<port>/sso-callback` der Webinstanz, kein Platzhalter.
- Aktivieren Sie nur den _Standard-Workflow_ .
- Ein für den Administratorclient ausgestelltes Token wird von Web abgelehnt, da die Zielgruppe nicht übereinstimmt.
- Keycloak erfordert HTTPS für alle Redirect-URIs außer `localhost` Aktivieren Sie die Verschlüsselung oder legen Sie eine öffentliche HTTPS-URL fest.

## Zwei-Faktor-Authentifizierung

Ein Benutzer kann die Zwei-Faktor-Authentifizierung mithilfe einer Authentifizierungs-App (Google Authenticator, Microsoft Authenticator, Aegis, 2FAS usw.) im Admin-Adapter aktivieren: Menü des angemeldeten Benutzers, _Zwei-Faktor-Authentifizierung_ . Die Einstellung wird mit dem Benutzer gespeichert und gilt daher sowohl für die Web- als auch für die Admin-Oberfläche.

- Auf der Anmeldeseite wird nach dem Passwort nach dem Code gefragt. Beim Anmeldeformular wird zuerst das Passwort überprüft, anschließend wird nur noch der Code abgefragt (dieser zweite Schritt ist 5 Minuten gültig). Alternativ kann einmalig einer der 10 Backup-Codes verwendet werden.
- `POST /loginApp` Und `POST /oauth/token` Antwort `401` mit `{"error": "otp_required"}` oder `"otp_invalid"` Der Client sendet den Code als `otp` mit der nächsten Anfrage.
- Ein Benutzer mit Zwei-Faktor-Authentifizierung kann sich nicht nur mit dem Passwort anmelden: Basisauthentifizierung, ein Passwort in der URL und die Anmeldung über einen Socket mit Benutzername und Passwort werden abgelehnt. Skripte und Geräte, die sich auf diese Weise anmelden, benötigen entweder einen eigenen Benutzer ohne Passwort oder ein Token.
- Beim Single Sign-On wird kein Code abgefragt: Hier ist der Identitätsanbieter dafür verantwortlich.
- Falsche Codes zählen beim [Brute-Force-Schutz](#brute-force-protection) genauso wie falsche Passwörter.
- Nach Verlust eines Telefons schaltet ein Administrator dieses im Benutzerdialogfeld der Administration aus. Falls der Administrator selbst ausgesperrt ist: `iobroker object set system.user.admin common.externalAuthentication.totp=null`

## Autorisierung von Drittanbieterclients (OAuth)

Der oben genannte Token-Endpunkt erfordert, dass der Client das ioBroker-Passwort des Benutzers verarbeitet. Clients, die außerhalb Ihrer Kontrolle laufen – MCP-Clients oder Web-Erweiterungen, die diese bereitstellen – dürfen dies nicht tun. Durch Aktivieren **von „Drittanbieter-Clients zulassen“** in den Einstellungen wird zusätzlich der browserbasierte OAuth2-Autorisierungscode-Flow mit PKCE bereitgestellt: Der Client wird auf eine Anmelde- und Zustimmungsseite weitergeleitet, der Benutzer bestätigt die Eingabe, und der Client erhält ein Token, das an die angeforderte Ressource gebunden ist.

Diese Funktion ist standardmäßig deaktiviert. Wenn sie aktiviert ist:

- Clients entdecken den Server durch `/.well-known/oauth-authorization-server` und sich selbst registrieren, es sei denn, **die Option „Selbstregistrierung von Kunden zulassen“** ist deaktiviert.
- Nicht authentifizierte Anfragen, die _nicht_ nachfragen `text/html` werden beantwortet mit `401` und ein `WWW-Authenticate` Anstelle einer Weiterleitung zur Anmeldeseite wird eine Abfrage durchgeführt – eine Weiterleitung ist für einen API-Client nutzlos. Browser sind davon nicht betroffen.
- Web-Erweiterungen veröffentlichen ihre eigenen Ressourcenmetadaten unter `/.well-known/oauth-protected-resource/<path>` Diese Dokumente bleiben auch ohne Zugangsdaten lesbar.
- **Legen Sie die öffentliche URL fest** , wenn der Server hinter einem Reverse-Proxy läuft, und verwenden Sie HTTPS: Remote-Clients lehnen unverschlüsselte Daten ab. `http://` Die

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 9.7.0 (2026-11-15)
* (@GermanBluefox) Two-factor authentication with an authenticator app: the login page asks for the code after the password, users with it cannot log in with the password alone (basic authentication, socket)
* (@GermanBluefox) Updated `@iobroker/webserver` to 3.5.0 and `@iobroker/socket-classes` to 2.11.0 (two-factor authentication)

### 9.6.0 (2026-11-13)
* (@matthiasnissen) Added optional single sign-on with OpenID Connect for users that are linked in the admin adapter. It cannot be used together with the user list
* (@GermanBluefox) Updated `@iobroker/webserver` to 3.4.1: a disabled user cannot sign in with single sign-on, like with a password (apart from `admin`)

### 9.5.1 (2026-11-09)
* (@GermanBluefox) The setting "Login timeout" (`ttl`) applies to the OAuth2 access token now. Before, the access token always expired after 1 hour, whatever was set. The refresh token lives at least 30 days, or as long as the access token if that is longer
* (@GermanBluefox) Updated `@iobroker/socket-classes` to 2.10.4: a logged-in user without the permission `other.sendto` may now send `checkLicense` to vis and `dm:loadItems` to devices, so that widgets with a license and the device tiles work for users who may only look. Also: no more "REAUTHENTICATE!" log flood, and the host commands `readDiskDir` and `deleteDiskFile` need the permission for `cmdExec`

### 9.5.0 (2026-11-06)
* (@GermanBluefox) web, its socket clients and the web extensions no longer take subscriptions away from each other. js-controller keeps one subscription per pattern, so when an extension like rest-api gave up a state, the socket clients of web and the other extensions got no more changes of it either. web now notes who subscribed what and unsubscribes in the database only when nobody needs the pattern any more. What a stopped extension still holds is given up for it (#196)

### 9.4.0 (2026-11-05)
* (@GermanBluefox) A changed web extension no longer restarts web every time: a write of its instance object that changes nothing is ignored, and a newly enabled extension is started while web keeps running. An extension that sets `supportsHotReload` is stopped and started again with its new settings, or just stopped when it is disabled - the sessions and socket connections of everybody else stay. A new version of an extension still restarts web. See [WEB-EXTENSIONS-HOWTO.md](/#/docs/adapterref/iobroker.web/WEB-EXTENSIONS-HOWTO.md)
* (@GermanBluefox) Every web extension gets a router of its own, so web can take all of its routes back when it stops
* (@GermanBluefox) Updated packages

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