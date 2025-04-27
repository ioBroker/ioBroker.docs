---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rest-api/README.md
title: REST-API-Adapter
hash: /x+PdsrJoxpoit6cC2A/HsY7OG19SgWis9sdVNgnJV0=
---
![Logo](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/rest-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# REST-API-Adapter
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dies ist eine RESTFul-Schnittstelle zum Lesen der Objekte und Zustände von ioBroker und zum Schreiben/Steuern der Zustände über HTTP-Get/Post-Anfragen.

Der Zweck dieses Adapters ähnelt dem von simple-api. Dieser Adapter unterstützt jedoch Long-Polling und URL-Hooks zum Abonnieren.

Es verfügt über eine nützliche Weboberfläche zum Spielen mit den Anfragen:

![Screenshot](../../../en/adapterref/iobroker.rest-api/img/screen.png)

## Verwendung
Rufen Sie im Browser `http://ipaddress:8093/` auf und verwenden Sie die Swagger-Benutzeroberfläche, um die Zustände und Objekte anzufordern und zu ändern.

Einige Anfragebeispiele:

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - Status als JSON lesen
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` – Status als Zeichenfolge lesen (nur Wert)
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - Status mit GET schreiben (nur für Abwärtskompatibilität mit Simple-API)
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` – Senden Sie eine Nachricht an `javascript.0` im Skript `scriptName`

### Authentifizierung
Um die Authentifizierung zu aktivieren, müssen Sie im Konfigurationsdialog die Option `Authentication` setzen.

Es werden drei Arten der Authentifizierung unterstützt:

- Anmeldeinformationen in der Abfrage
- Grundlegende Authentifizierung
– OAuth2 (Träger)

Zur Authentifizierung in der Abfrage müssen Sie `user` und `pass` in der Abfrage wie folgt festlegen:

```http
http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?user=admin&pass=admin
```

Für die Basisauthentifizierung müssen Sie den Header `Authorization` mit dem Wert `Basic base64(user:pass)` setzen.

Für die OAuth2-Authentifizierung müssen Sie den Header `Authorization` mit dem Wert `Bearer <AccessToken>` setzen.

Das Zugriffstoken kann mit einer HTTP-Anfrage wie der folgenden abgerufen werden:

```http
http://ipaddress:8093/oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker
```

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

## Abonnieren Sie die Änderungen des Status oder Objekts
Ihre Anwendung könnte bei jeder Änderung des Status oder Objekts Benachrichtigungen erhalten.

Dazu muss Ihre Anwendung einen HTTP(S)-Endpunkt bereitstellen, um die Updates zu akzeptieren.

Beispiel in node.js siehe hier [demoNodeClient.js](examples/demoNodeClient.js)

## Lange Abfrage
Dieser Adapter unterstützt das Abonnieren von Datenänderungen über Long Polling.

Ein Beispiel für einen Browser finden Sie hier: [demoNodeClient.js](examples/demoBrowserClient.html)

## Web-Erweiterung
Dieser Adapter kann als Web-Erweiterung ausgeführt werden. In diesem Fall ist der Pfad unter `http://ipaddress:8082/rest` verfügbar.

## Beachten
- `POST` dient immer zum Erstellen einer Ressource (es spielt keine Rolle, ob sie dupliziert wurde)
- „PUT“ dient zum Prüfen, ob die Ressource vorhanden ist, und dann zum Aktualisieren, andernfalls zum Erstellen einer neuen Ressource
- `PATCH` dient immer zum Aktualisieren einer Ressource

## Befehle
Darüber hinaus können Sie viele Socket-Befehle über eine spezielle Schnittstelle ausführen:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

Z.B.

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - um den Status von `system.adapter.admin.0.alive` zu lesen
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - um die Datei `admin.admin/admin.png` als JSON-Ergebnis zu lesen
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - um die Datei `admin.admin/admin.png` als Datei zu lesen
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - um den Administrator neu zu starten

Sie können alle Befehle auch mit der POST-Methode anfordern. Der Body muss ein Objekt mit Parametern sein. Beispiel:

```
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

Sie können keine POST-Anfragen an Befehle über die GUI senden.

<!-- START -->

### Staaten
- `getStates(pattern)` - ruft die Statusliste für das Muster ab (z. B. für system.adapter.admin.0.*). Die GUI kann bei der Visualisierung der Antwort Probleme haben.
- `getForeignStates(pattern)` – dasselbe wie getStates
- `getState(id)` – Statuswert nach ID abrufen
- `setState(id, state)` – Statuswert mit JSON-Objekt festlegen (z. B. `{"val": 1, "ack": true}`)

### Objekte
- `getObject(id)` – Objekt nach ID abrufen
- `getObjects(list)` - ruft alle Zustände und Räume ab. Die GUI kann bei der Visualisierung der Antwort Probleme haben.
- `getObjectView(design, search, params)` - bestimmte Objekte abrufen, z. B. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` – Objekt mit JSON-Objekt festlegen (z. B. `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- `delObject(id, options)` – Objekt nach ID löschen

### Dateien
- `readFile(adapter, fileName)` - Datei lesen, z.B. adapter=vis.0, fileName=main/vis-views.json. Zusätzlich kann in der Abfrage die Option binary=true gesetzt werden, um die Antwort als Datei und nicht als JSON zu erhalten.
- `readFile64(adapter, fileName)` - liest die Datei als Base64-String, z. B. adapter=vis.0, fileName=main/vis-views.json. Zusätzlich kann in der Abfrage die Option binary=true gesetzt werden, um die Antwort als Datei und nicht als JSON zu erhalten.
- `writeFile64(adapter, fileName, data64, options)` - Datei schreiben, zB adapter=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- `unlink(adapter, name)` - Datei oder Ordner löschen
- `deleteFile(adapter, name)` - Datei löschen
- `deleteFolder(adapter, name)` - Ordner löschen
- `renameFile(adapter, oldName, newName)` - Datei umbenennen
- `rename(adapter, oldName, newName)` - Datei oder Ordner umbenennen
- `mkdir(adapter, dirName)` - Ordner erstellen
- `readDir(adapter, dirName, options)` - Inhalt des Ordners lesen
- `chmodFile(adapter, fileName, options)` - Dateimodus ändern. Z.B. adapter=vis.0, fileName=main/*, options = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - Dateibesitzer ändern. Z.B. adapter=vis.0, fileName=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - prüfen, ob die Datei existiert

### Administratoren
- `getHostByIp(ip)` - Hostinformationen nach IP lesen. z.B. nach localhost
- `readLogs(host)` - liest Dateinamen und Größe der Logdateien. Sie können sie mit http://ipaddress:8093/<fileName> lesen.
- `delState(id)` - Status und Objekt löschen. Dasselbe wie delObject
- `getRatings(update)` - Adapterbewertungen lesen (wie im Admin)
- `getCurrentInstance()` – Adapter-Namespace lesen (immer rest-api.0)
- `decrypt(encryptedText)` – Zeichenfolge mit Systemgeheimnis entschlüsseln
- `encrypt(plainText)` – Zeichenfolge mit Systemgeheimnis verschlüsseln
- `getAdapters(adapterName)` - ruft Objekte vom Typ "Adapter" ab. Optional kann adapterName definiert werden.
- `updateLicenses(login, password)` - Lizenzen vom ioBroker.net-Portal lesen
- `getCompactInstances()` - Liste der Instanzen mit Kurzinformationen lesen
- `getCompactAdapters()` - Liste der installierten Adapter mit Kurzinformationen lesen
- `getCompactInstalled(host)` - kurze Informationen über installierte Adapter lesen
- `getCompactSystemConfig()` - kurze Systemkonfiguration lesen
- `getCompactSystemRepositories()`
- `getCompactRepository(host)` - kurzes Repository lesen
- `getCompactHosts()` - kurze Informationen über Hosts abrufen
- `addUser(user, pass)` - neuen Benutzer hinzufügen
- `delUser(user)` – Benutzer löschen
- `addGroup(group, desc, acl)` – neue Gruppe erstellen
- `delGroup(group)` - Gruppe löschen
- `changePassword(user, pass)` - Benutzerpasswort ändern
- `getAllObjects()` - liest alle Objekte als Liste. Die GUI kann Probleme bei der Visualisierung der Antwort haben.
- `extendObject(id, obj)` – Objekt anhand der ID mit JSON ändern. (z. B. `{"common":{"enabled": true}}`)
- `getForeignObjects(Muster, Typ)` - dasselbe wie getObjects
- `delObjects(id, options)` – Objekte nach Muster löschen

### Andere
- `updateTokenExpiration(Zugriffstoken)`
- `log(text, level[info])` – keine Antwort – Logeintrag zum ioBroker-Log hinzufügen
- `checkFeatureSupported(feature)` – prüfen, ob die Funktion vom JS-Controller unterstützt wird.
- `getHistory(id, options)` - Verlauf lesen. Optionen finden Sie unter: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- `httpGet(url)` - URL vom Server lesen. Sie können binary=true setzen, um die Antwort als Datei zu erhalten.
- `sendTo(adapterInstance, command, message)` - Befehl an Instanz senden. Z.B. adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}`
- `listPermissions()` – statische Informationen mit Funktionsberechtigungen lesen
- `getUserPermissions()` - Objekt mit Benutzerberechtigungen lesen
- `getVersion()` - Adaptername und Version lesen
- `getAdapterName()` – Adapternamen lesen (immer Rest-API)
- `clientSubscribe(Zielinstanz, Nachrichtentyp, Daten)`
- `getAdapterInstances(adapterName)` - ruft Objekte vom Typ "Instance" ab. Optional kann adapterName definiert werden.

<!-- ENDE -->

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Removed binary states

### 2.1.0 (2025-02-27)
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Replaced icons with SVG

### 2.0.3 (2024-07-13)
* (jkuenemund) Changed response for the endpoint get states to the dictionary in swagger

### 2.0.1 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`
* (theshengfui) Fixed history requests
* (bluefox) Minimum required node.js version is 16

### 1.1.0 (2023-05-03)
* (bluefox) Converting of the setState values to the according type
* (bluefox) Implemented file operations

### 1.0.5 (2023-03-27)
* (Apollon77) Prepare for future js-controller versions

### 1.0.4 (2022-08-31)
* (bluefox) Check if the port is occupied only on defined interface

### 1.0.2 (2022-07-27)
* (bluefox) Implemented binary read/write operations

### 1.0.1 (2022-07-27)
* (bluefox) Increased the max size of body to 100Mb

### 1.0.0 (2022-05-19)
* (bluefox) Final release

### 0.6.0 (2022-05-18)
* (bluefox) Added sendTo path

### 0.5.0 (2022-05-17)
* (bluefox) Some access errors were corrected

### 0.4.0 (2022-04-26)
* (bluefox) Added socket commands

### 0.3.6 (2022-04-22)
* (bluefox) Added object creation and enumerations reading

### 0.3.5 (2022-04-22)
* (bluefox) Allowed the reading of current subscriptions

### 0.3.4 (2022-04-20)
* (bluefox) Corrected subscription

### 0.3.1 (2022-04-15)
* (bluefox) First release

### 0.1.0 (2017-09-14)
* (bluefox) initial commit

## License
Apache 2.0

Copyright (c) 2017-2025 bluefox <dogafox@gmail.com>