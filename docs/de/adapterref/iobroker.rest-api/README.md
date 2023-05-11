---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rest-api/README.md
title: REST-API-Adapter
hash: 47/zBapa3b3KU/a954z053ZqAlREJhhi4oO31yBhVMk=
---
![Logo](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![Anzahl der Installationen](http://iobroker.live/badges/rest-api-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# REST-API-Adapter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dies ist eine RESTFul-Schnittstelle zum Lesen der Objekte und Zustände von ioBroker und zum Schreiben/Steuern der Zustände über HTTP-Get/Post-Anfragen.

Der Zweck dieses Adapters ähnelt dem von simple-api. Dieser Adapter unterstützt jedoch Long-Polling und URL-Hooks für Abonnements.

Es verfügt über eine sehr nützliche Weboberfläche, um mit den Anfragen zu spielen:

![Bildschirmfoto](../../../en/adapterref/iobroker.rest-api/img/screen.png)

## Verwendung
Rufen Sie im Browser ```http://ipaddress:8093/``` auf und verwenden Sie die Swagger-Benutzeroberfläche, um die Zustände und Objekte anzufordern und zu ändern.

Einige Anfragebeispiele:

- „http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal“ – Status als JSON lesen
- „http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain“ – Status als String lesen (nur Wert)
- „http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5“ – Status mit GET schreiben (nur für Rückkompatibilität mit simple-api)
- „http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={“message“: „MESSAGE“, „data“: „FROM REST-API“}` – Senden Sie eine Nachricht an Javascript. 0 im Skript „scriptName“.

## Abonnieren Sie die Änderungen des Status oder Objekts
Ihre Anwendung könnte bei jeder Änderung des Zustands oder Objekts Benachrichtigungen erhalten.

Dazu muss Ihre Anwendung einen HTTP(S)-Endpunkt bereitstellen, um die Aktualisierungen zu akzeptieren.

Beispiel in node.js siehe hier [demoNodeClient.js](examples/demoNodeClient.js)

## Lange Umfrage
Dieser Adapter unterstützt das Abonnieren von Datenänderungen über Long Polling.

Ein Beispiel für einen Browser finden Sie hier: [demoNodeClient.js](examples/demoBrowserClient.html)

## Web-Erweiterung
Dieser Adapter kann als Web-Erweiterung ausgeführt werden. In diesem Fall ist der Pfad unter http://iipaddress:8082/rest verfügbar

## Notiz
- „POST“ dient immer zum Erstellen einer Ressource (egal, ob diese dupliziert wurde)
- „PUT“ dient zum Überprüfen, ob eine Ressource vorhanden ist, und zum anschließenden Aktualisieren. Andernfalls wird eine neue Ressource erstellt
- „PATCH“ dient immer der Aktualisierung einer Ressource

## Befehle
Darüber hinaus können Sie viele Socket-Befehle über eine spezielle Schnittstelle ausführen:

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

Z.B.

- „http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive“ – um den Status von „system.adapter.admin.0.alive“ zu lesen
- „http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png“ – um die Datei „admin.admin/admin.png“ als JSON-Ergebnis zu lesen
- „http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary“ – um die Datei „admin.admin/admin.png“ als Datei zu lesen
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` – um den Administrator neu zu starten

Sie können alle Befehle auch mit der POST-Methode anfordern. Als Körper muss ein Objekt mit Parametern vorliegen. Z.B:

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

<!-- START -->

### Zustände
- „getStates(pattern)“ – Ruft die Liste der Zustände für das Muster ab (z. B. für system.adapter.admin.0.*). GUI kann Probleme bei der Visualisierung der Antwort haben.
- „getForeignStates(pattern)“ – dasselbe wie getStates
- „getState(id)“ – Zustandswert nach ID abrufen
- `setState(id, state)` – Statuswert mit JSON-Objekt festlegen (z. B. `{"val": 1, "ack": true}`)
- „getBinaryState(id)“ – Binärstatus anhand der ID abrufen
- `setBinaryState(id, base64)` – Binärstatus anhand der ID festlegen

### Objekte
- „getObject(id)“ – Objekt anhand der ID abrufen
- `getObjects()` – alle Zustände und Räume abrufen. GUI kann Probleme bei der Visualisierung der Antwort haben.
- `getObjectView(design, search, params)` – spezifische Objekte abrufen, z.B. design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` – Objekt mit JSON-Objekt festlegen (z. B. `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`)
- „delObject(id, options)“ – Objekt nach ID löschen

### Dateien
- `readFile(adapter, fileName)` – Datei lesen, z.B. adapter=vis.0, fileName=main/vis-views.json. Darüber hinaus können Sie in der Abfrage die Option „binary=true“ festlegen, um die Antwort als Datei und nicht als JSON zu erhalten
- `readFile64(adapter, fileName)` – Datei als Base64-String lesen, z.B. adapter=vis.0, fileName=main/vis-views.json. Darüber hinaus können Sie in der Abfrage die Option „binary=true“ festlegen, um die Antwort als Datei und nicht als JSON zu erhalten
- `writeFile64(adapter, fileName, data64, options)` – Datei schreiben, z.B. adapter=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- „unlink(adapter, name)“ – Datei oder Ordner löschen
- `deleteFile(adapter, name)` – Datei löschen
- `deleteFolder(adapter, name)` – Ordner löschen
- `renameFile(adapter, oldName, newName)` – Datei umbenennen
- „rename(adapter, oldName, newName)“ – Datei oder Ordner umbenennen
- `mkdir(adapter, dirName)` – Ordner erstellen
- „readDir(adapter, dirName, Optionen)“ – Inhalt des Ordners lesen
- `chmodFile(adapter, fileName, options)` – Dateimodus ändern. Z.B. adapter=vis.0, fileName=main/*, Optionen = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` – Dateieigentümer ändern. Z.B. adapter=vis.0, fileName=main/*, Optionen = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- „fileExists(adapter, fileName)“ – prüfen Sie, ob die Datei vorhanden ist

### Admins
- „getHostByIp(ip)“ – Hostinformationen nach IP lesen. z.B. von localhost
- „readLogs(host)“ – Dateinamen und Größe der Protokolldateien lesen. Sie können sie mit http://ipaddress:8093/<fileName> lesen
- „delState(id)“ – Status und Objekt löschen. Identisch mit delObject
- „getRatings(update)“ – Adapterbewertungen lesen (wie in admin)
- `getCurrentInstance()` – Adapter-Namespace lesen (immer rest-api.0)
- „checkFeatureSupported(feature)“ – prüfen Sie, ob die Funktion vom js-controller unterstützt wird.
- „decrypt(encryptedText)“ – Zeichenfolge mit Systemgeheimnis entschlüsseln
- „encrypt(plainText)“ – Zeichenfolge mit Systemgeheimnis verschlüsseln
- `getAdapters(adapterName)` – Objekte vom Typ „Adapter“ abrufen. Sie können optional den Adapternamen definieren
- „updateLicenses(login, password)“ – Lizenzen vom ioBroker.net-Portal lesen
- `getCompactInstances()` – Liste der Instanzen mit Kurzinformationen lesen
- `getCompactAdapters()` – Liste der installierten Adapter mit kurzen Informationen lesen
- „getCompactInstalled(host)“ – kurze Informationen zu installierten Adaptern lesen
- `getCompactSystemConfig()` – kurze Systemkonfiguration lesen
- `getCompactSystemRepositories()`
- „getCompactRepository(host)“ – kurzes Repository lesen
- `getCompactHosts()` – kurze Informationen über Hosts abrufen
- „addUser(user, pass)“ – neuen Benutzer hinzufügen
- „delUser(user)“ – Benutzer löschen
- „addGroup(group, desc, acl)“ – neue Gruppe erstellen
- `delGroup(group)` – Gruppe löschen
- „changePassword(user, pass)“ – Benutzerpasswort ändern
- `getAllObjects()` – liest alle Objekte als Liste. GUI kann Probleme bei der Visualisierung der Antwort haben.
- „extendObject(id, obj)“ – Objekt nach ID mit JSON ändern. (z. B. `{"common":{"enabled": true}}`)
- „getForeignObjects(pattern, type)“ – dasselbe wie getObjects
- „delObjects(id, options)“ – Objekte nach Muster löschen

### Andere
- „log(text, level[info])“ – keine Antwort – Protokolleintrag zum ioBroker-Protokoll hinzufügen
- „getHistory(id, options)“ – Verlauf lesen. Optionen finden Sie unter: https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- „httpGet(url)“ – URL vom Server lesen. Sie können „binary=true“ festlegen, um die Antwort als Datei zu erhalten
- „sendTo(adapterInstance, command, message)“ – Befehl an Instanz senden. Z.B. adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss", "options": {"aggregate": "onchange", "addId": true}} `
- „listPermissions()“ – statische Informationen mit Funktionsberechtigungen lesen
- `getUserPermissions()` – Objekt mit Benutzerberechtigungen lesen
- `getVersion()` – Adapternamen und -version lesen
- `getAdapterName()` – Adapternamen lesen (immer Rest-API)
- `getAdapterInstances(adapterName)` – Objekte vom Typ „Instanz“ abrufen. Sie können optional den Adapternamen definieren

<!-- ENDE -->

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
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

Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>