---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: 57DoirkdYT8+yDIFkRkP0yThBtsTRyiG5BNo5eWz1Qw=
---
![Logo](../../../en/adapterref/iobroker.places/admin/places.png)

![Anzahl der Installationen](http://iobroker.live/badges/places-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.places.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.places/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/places/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.places.svg)

# ioBroker.places

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung

Dies ist ein ioBroker-Adapter zur Verarbeitung von Standortinformationsnachrichten, die mindestens einen Benutzer, eine Geoposition und einen Zeitstempel enthalten sollten. Der Adapter analysiert, ob sich die Standortinformationen innerhalb eines Radius um die in ioBroker konfigurierte Standortkonfiguration oder optional an anderen Orten befinden.

## Konfiguration

Es gibt nur einen obligatorischen Konfigurationswert: den Radius (in Metern), der zur Bestimmung des aktuellen Standorts eines Nutzers verwendet wird. Der Standort von ioBroker dient dazu, Nutzer zu identifizieren, die sich „zu Hause“ befinden; weitere Orte können in der Konfiguration hinzugefügt werden.

- **Radius** ( _Pflichtfeld_ ) sollte der Radius in Metern sein, der verwendet wird, um zu überprüfen, ob sich der Benutzer an einem bestimmten Ort befindet (z. B. zu Hause oder an einem benutzerdefinierten Ort).
- Mit **der Option „Name für Zuhause“** kann ein individueller Name für den Wohnort festgelegt werden.
- **Der Google Maps API-Schlüssel** wird zur Aktivierung der Geokodierung verwendet. Ein fehlender API-Schlüssel wird beim Öffnen der Konfigurationsseite von einer konfigurierten vis-map-Instanz (sofern vorhanden) abgerufen.
- **Die Geokodierung von Google Maps** kann aktiviert werden, um eine reale Adresse und eine Höhenangabe für eine bestimmte geografische Position zu erhalten.
- **Places** ist eine flexible Liste, die benutzerdefinierte Orte enthält, wobei jeder Ort gültige Werte für Name, Breitengrad und Längengrad haben sollte.
- **„Users“** ist eine flexible Liste, die Benutzerzuordnungen enthält.

## Verwendung

Um eine Standortaktualisierung zu verarbeiten, senden Sie einfach eine Nachricht mit folgender Syntax:

```
// send a message to all instances of places adapter
sendTo('places', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## Struktur für zurückgegebene Nachrichten

Der folgende Block zeigt, wie Antwortnachrichten aussehen. Jedem Wert ist im ioBroker-Objektbaum ein entsprechender Zustand zugeordnet.

```
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## Beispiel: OwnTracks + ioBroker.iot + ioBroker.places

### 1. Konfigurieren Sie iobroker.iot

Fügen Sie den benutzerdefinierten Dienst **xyz** unter **„Whitelist für Dienste“** hinzu.

### 2. Konfigurieren Sie die OwnTracks-Mobil-Apps

Ändern Sie den Modus auf **HTTP Privat** und verwenden Sie die folgende Adresse als **Host** : <https://iobroker.pro/service/custom_xyz/><user-app-key>

### 3. Konfigurieren Sie iobroker.places

Auf der Registerkarte „Integration“ müssen Sie die Cloud-Adapter-Instanz und **xyz** als Dienst auswählen. Der Adapter empfängt dann eingehende Anfragen an den Dienst und beginnt mit der Verarbeitung.

## Beispiel: Telegram + ioBroker.telegram + ioBroker.places

### 1. Konfigurieren Sie iobroker.telegram

Aktivieren Sie die Option zum **Speichern von Rohdatenanfragen** .

### 2. Skript erstellen (ioBroker.javascript)

Erstellen Sie ein kurzes Skript mit einem Abonnement für die Rohanfrage, fe von **telegram.0.communicate.requestRaw** , und senden Sie ein neues Anfrageobjekt an iobroker.places (oder eine Instanz davon):

```
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name, 
            latitude: data.location.latitude, 
            longitude: data.location.longitude, 
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## Credits

Die Implementierung basiert teilweise auf dem [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) -Adapter von dschaedls. Das Logo stammt von [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) und wurde so angepasst, dass es einen transparenten Hintergrund hat.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.4.0 (2026-03-24)
- (copilot) Adapter requires admin >= 7.7.22 now
- (raintonr) Don't zero out elevation when geocoding if it was provided (#290). 
- (mcm1957) Dependencies have been updated

### 1.3.0 (2025-05-13)
* (TicoM1) Defaultvalue for state `personsAtHome` has been corrected.
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >=7.4.10 now.
* (mcm1957) Several issues reported by repository checker have been fixed.
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.2 (2022-04-17)
* (Apollon77) Fix personsAtHome and anybodyAtHome states

### 1.1.1 (2022-03-29)
* (Apollon77) Allow (again?) to consume external subscribed state value independently of ack flag

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2022 BasGo <basgo@gmx.de>

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