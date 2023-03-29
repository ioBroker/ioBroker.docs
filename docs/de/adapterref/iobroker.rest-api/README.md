---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rest-api/README.md
title: REST-API-Adapter
hash: MuAe9zV/tno/70JhUmaXdIDSIYyEN+FgP2l2uFKG+T4=
---
![Logo](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/rest-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![Prüfungen](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# REST-API-Adapter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

Dies ist eine RESTFul-Schnittstelle zum Lesen der Objekte und Zustände von ioBroker und zum Schreiben/Steuern der Zustände über HTTP-Get/Post-Anforderungen.

Der Zweck dieses Adapters ist ähnlich wie bei simple-api. Aber dieser Adapter unterstützt Long-Polling und URL-Hooks für Abonnenten.

Es hat eine sehr nützliche Webschnittstelle, um mit den Anfragen zu spielen:

![Bildschirmfoto](../../../en/adapterref/iobroker.rest-api/img/screen.png)

## Verwendung
Rufen Sie den Browser ```http://ipaddress:8093/``` auf und verwenden Sie die Swagger-Benutzeroberfläche, um die Zustände und Objekte anzufordern und zu ändern.

Einige Anfragebeispiele:

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - Status als JSON lesen
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` - Status als String lesen (nur Wert)
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - Status mit GET schreiben (nur für Rückkompatibilität mit simple-api)
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` - Nachricht an javascript.0 senden im Skript `scriptName`

## Status- oder Objektänderungen abonnieren
Ihre Anwendung könnte Benachrichtigungen über jede Status- oder Objektänderung erhalten.

Dazu muss Ihre Anwendung einen HTTP(S)-Endpunkt bereitstellen, um die Aktualisierungen zu akzeptieren.

Beispiel in node.js siehe hier [demoNodeClient.js](examples/demoNodeClient.js)

## Lange Abfrage
Dieser Adapter unterstützt das Abonnieren von Datenänderungen über lange Abfragen.

Beispiel für Browser finden Sie hier: [demoNodeClient.js](examples/demoBrowserClient.html)

## Weberweiterung
Dieser Adapter kann als Web-Erweiterung ausgeführt werden. In diesem Fall ist der Pfad unter http://iipaddress:8082/rest verfügbar

## Notiz
- `POST` dient immer zum Erstellen einer Ressource (egal ob dupliziert wurde)
- `PUT` dient zum Prüfen, ob die Ressource existiert, dann aktualisieren, andernfalls neue Ressource erstellen
- `PATCH` dient immer zum Aktualisieren einer Ressource

## Befehle
Zusätzlich können Sie viele Socket-Befehle über eine spezielle Schnittstelle ausführen:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

Z.B.

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - um den Status von `system.adapter.admin.0.alive` zu lesen
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - um die Datei `admin.admin/admin.png` als JSON-Ergebnis zu lesen
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - um die Datei `admin.admin/admin.png` als Datei zu lesen
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - um admin neu zu starten

Sie können alle Befehle auch mit der POST-Methode anfordern. Als Körper muss ein Objekt mit Parametern angegeben werden. Z.B:

```
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

Sie können keine POST-Anfrage an Befehle über die GUI senden.

<!-- STARTEN -->

### Zustände
- `getStates(pattern)` - Ruft die Liste der Zustände für das Muster ab (z. B. für system.adapter.admin.0.*). GUI kann Probleme bei der Visualisierung der Antwort haben.
- `getForeignStates(pattern)` - dasselbe wie getStates
- `getState(id)` - Statuswert nach ID abrufen
- `setState(id, state)` - Statuswert mit JSON-Objekt setzen (z. B. `{"val": 1, "ack": true}`)
- `getBinaryState(id)` - Binärstatus nach ID abrufen
- `setBinaryState(id, base64)` - Setzt den Binärzustand nach ID

### Objekte
- `getObject(id)` - Objekt nach ID abrufen
- `getObjects()` - holt alle Zustände und Räume. GUI kann Probleme bei der Visualisierung der Antwort haben.
- `getObjectView(design, search, params)` - bestimmte Objekte abrufen, z. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` - Objekt mit JSON-Objekt setzen (z. B. `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- `delObject(id, options)` - Objekt nach ID löschen

### Dateien
- `readFile(adapter, fileName)` - Datei lesen, z.B. adapter=vis.0, fileName=main/vis-views.json. Außerdem können Sie die Option in der Abfrage „binary=true“ festlegen, um die Antwort als Datei und nicht als JSON zu erhalten
- `readFile64(adapter, fileName)` - Datei als base64-String lesen, z.B. adapter=vis.0, fileName=main/vis-views.json. Außerdem können Sie die Option in der Abfrage „binary=true“ festlegen, um die Antwort als Datei und nicht als JSON zu erhalten
- `writeFile64(adapter, fileName, data64, options)` - Datei schreiben, z.B. adapter=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- `unlink(adapter, name)` - Datei oder Ordner löschen
- `deleteFile(adapter, name)` - Datei löschen
- `deleteFolder(Adapter, Name)` - Ordner löschen
- `renameFile(adapter, oldName, newName)` - Datei umbenennen
- `rename(adapter, oldName, newName)` - Datei oder Ordner umbenennen
- `mkdir(adapter, dirName)` - Ordner erstellen
- `readDir(adapter, dirName, options)` - Inhalt des Ordners lesen
- `chmodFile(adapter, fileName, options)` - Dateimodus ändern. Z.B. adapter=vis.0, fileName=main/*, options = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - Dateieigentümer ändern. Z.B. adapter=vis.0, fileName=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - prüft, ob die Datei existiert

### Admins
- `getHostByIp(ip)` - Hostinformationen nach IP lesen. z.B. von localhost
- `readLogs(host)` - liest den Dateinamen und die Größe der Protokolldateien. Sie können sie mit http://ipaddress:8093/<fileName> lesen
- `delState(id)` - Zustand und Objekt löschen. Das gleiche wie delObject
- `getRatings(update)` - Adapterbewertungen lesen (wie in Admin)
- `getCurrentInstance()` - Adapternamensraum lesen (immer rest-api.0)
- `checkFeatureSupported(feature)` - prüft, ob das Feature vom js-Controller unterstützt wird.
- `decrypt(encryptedText)` - String mit Systemgeheimnis entschlüsseln
- `encrypt(plainText)` - Zeichenkette mit Systemgeheimnis verschlüsseln
- `getAdapters(adapterName)` - Objekte vom Typ "Adapter" abrufen. Sie können optional adapterName definieren
- `updateLicenses(login, password)` - Lizenzen vom ioBroker.net-Portal lesen
- `getCompactInstances()` - Liste von Instanzen mit kurzen Informationen lesen
- `getCompactAdapters()` - Liste der installierten Adapter mit Kurzinformationen lesen
- `getCompactInstalled(host)` - kurze Informationen über installierte Adapter lesen
- `getCompactSystemConfig()` - kurze Systemkonfiguration lesen
- `getCompactSystemRepositories()`
- `getCompactRepository(host)` - kurzes Repository lesen
- `getCompactHosts()` - erhält kurze Informationen über Hosts
- `addUser(user, pass)` - neuen Benutzer hinzufügen
- `delUser(Benutzer)` - Benutzer löschen
- `addGroup(group, desc, acl)` - neue Gruppe erstellen
- `delGroup(group)` - Gruppe löschen
- `changePassword(user, pass)` - Benutzerpasswort ändern
- `getAllObjects()` - liest alle Objekte als Liste. GUI kann Probleme bei der Visualisierung der Antwort haben.
- `extendObject(id, obj)` - Objekt nach ID mit JSON ändern. (z. B. `{"common":{"enabled": true}}`)
- `getForeignObjects(pattern, type)` - dasselbe wie getObjects
- `delObjects(id, options)` - Objekte nach Muster löschen

### Andere
- `log(text, level[info])` - keine Antwort - Protokolleintrag zum ioBroker-Protokoll hinzufügen
- `getHistory(id, options)` - Verlauf lesen. Siehe Optionen: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- `httpGet(url)` - URL vom Server lesen. Sie können "binary=true" setzen, um die Antwort als Datei zu erhalten
- `sendTo(adapterInstance, command, message)` - Befehl an Instanz senden. Z.B. adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}} `
- `listPermissions()` - statische Informationen mit Funktionsberechtigungen lesen
- `getUserPermissions()` - Objekt mit Benutzerrechten lesen
- `getVersion()` - Adaptername und Version lesen
- `getAdapterName()` - Adapternamen lesen (immer rest-api)
- `getAdapterInstances(adapterName)` - Objekte vom Typ "Instanz" abrufen. Sie können optional adapterName definieren

<!-- ENDE -->

## Machen
- [ ] Implementierung von GET-, PATCH-, POST- und DELETE-Dateioperationen

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
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

Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>