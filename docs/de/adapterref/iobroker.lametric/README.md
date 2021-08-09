---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: B8jOLP7FaNUbsP2j03ZQAzejHOezL11HtuI7N+7I6RM=
---
![Logo](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lametric.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![Stabil](http://iobroker.live/badges/lametric-stable.svg)
![Eingerichtet](http://iobroker.live/badges/lametric-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

# IoBroker.lametric
Mit diesem Adapter können Sie Statusinformationen zu Ihrem [LaMetric-Zeit](https://haus-auto.com/p/amz/LaMetricTime) *(Affiliate Link)* abrufen und Benachrichtigungen an diesen senden.
Sie benötigen lediglich die IP-Adresse Ihres Geräts und den API-Entwicklerschlüssel.

## Aufbau
Getestet mit LaMetric-Firmware *2.2.1* (empfohlen)

Ihren persönlichen Schlüssel erhalten Sie [hier](https://developer.lametric.com/).

![API-Schlüssel](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

## Merkmale
- Displayhelligkeit einstellen (Prozent, Auto-Modus/Manuell-Modus)
- Audiolautstärke einstellen (Prozent)
- Bildschirmschoner konfigurieren (aktivieren/deaktivieren, zeitbasiert, bei Dunkelheit)
- Bluetooth aktivieren/deaktivieren und Bluetooth-Namen ändern
- Wechseln Sie zwischen Apps (nächste, vorherige, gehen Sie zu einer bestimmten App)
- Senden Sie Benachrichtigungen mit Block (mit konfigurierbarer Priorität, Ton, Symbolen, Text, ...)
- Steuern Sie spezielle Apps wie Uhr, Radio, Stoppuhr oder Wetter
- Verwenden Sie *My Data (DIY)* LaMetric App, um dauerhafte Informationen anzuzeigen

Die Funktionen werden durch die [offizielle API-Funktionen](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html) eingeschränkt.

## Blockly-Beispiele
Sie können eine einfache Zeichenfolge als Nachricht verwenden, die als einzelner Rahmen angezeigt wird

![Einzelrahmen](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

Um mehrere Frames anzuzeigen, können Sie auch ein Array als Nachricht bereitstellen

![mehrere Rahmen](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

Wenn Sie Diagrammrahmen verwenden möchten, müssen Sie ein Array von Zahlen als Rahmen angeben

![Diagrammdatenrahmen](../../../en/adapterref/iobroker.lametric/docs/blockly3.png)

##Meine Daten (DIY) *(Version > 1.1.0)*
LaMetric bietet eine App (auf dem integrierten App-Markt) zum Abfragen benutzerdefinierter Daten an. Diese App heißt [Meine Daten DIY](https://apps.lametric.com/apps/my_data__diy_/8942). Dieser Adapter erstellt einen neuen Zustand im erforderlichen Format.
Sie können den Simple API Adapter verwenden, um die Daten an die LaMetric Time zu übertragen.

```ioBroker LaMetric Adapter -> State with Frame information <- Simple API Adapter <- My Data DIY App <- LaMetric```

### Konfiguration (mit Authentifizierung)
1. Installieren Sie den [Simple API ioBroker Adapter](https://github.com/ioBroker/ioBroker.simple-api)
2. Erstellen Sie einen neuen ioBroker-Benutzer namens "lametric" mit einem benutzerdefinierten Passwort (z. B. HhX7dZl3Fe)
3. Fügen Sie den Benutzer "lametric" der Gruppe "Benutzer" hinzu
4. Installieren Sie diese *My Data DIY* App auf Ihrem LaMetric Time (verwenden Sie Market)
5. Öffnen Sie die App-Einstellungen *My Data (DIY)* und konfigurieren Sie die einfache API-URL (siehe unten)
6. Gehen Sie zur Adapterkonfiguration und konfigurieren Sie die Frames mit Ihren benutzerdefinierten Informationen (Symbol und Text).

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?&user=lametric&pass=HhX7dZl3Fe
```

**Achten Sie darauf, bei Bedarf IP, Port, Benutzer und Passwort in der URL zu aktualisieren!**

### Konfiguration (ohne Authentifizierung)
1. Installieren Sie den [Simple API ioBroker Adapter](https://github.com/ioBroker/ioBroker.simple-api)
2. Installieren Sie diese *My Data DIY* App auf Ihrem LaMetric Time (verwenden Sie Market)
3. Öffnen Sie die App-Einstellungen *My Data (DIY)* und konfigurieren Sie die einfache API-URL (siehe unten).
4. Gehen Sie zur Adapterkonfiguration und konfigurieren Sie die Frames mit Ihren benutzerdefinierten Informationen (Symbol und Text).

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/
```

**Achten Sie darauf, bei Bedarf IP und Port in der URL zu aktualisieren!**

### Rahmenkonfiguration *(Version > 1.1.0)*
- Verwenden Sie das Plus-Symbol, um so viele Rahmen hinzuzufügen, wie Sie möchten
- Symbol: Wählen Sie ein Symbol von der [offiziellen Website](https://developer.lametric.com/icons) und geben Sie die ID in das Konfigurationsfeld ein. **Wichtig: Fügen Sie ein i (für statische Symbole) oder ein a (für animierte Symbole) als Präfix für diese ID hinzu. (Beispiel: `i3389`)
- Text: Geben Sie einfach die Textinformationen für den Rahmen ein. Sie können Zustände in geschweiften Klammern verwenden. Diese Informationen werden durch den entsprechenden Wert des Zustands ersetzt. (Beispiel: `{youtube.0.channels.HausAutomatisierungCom.statistics.subscriberCount} Abonnenten`)

Beispielkonfiguration von 2 Frames:

![Beispielrahmenkonfiguration](../../../en/adapterref/iobroker.lametric/docs/myDataDIYConfig.png)

## Spezielle Apps / Widgets *(Version > 1.1.2)*
Sie können einige Apps mit benutzerdefinierten Informationen steuern

### Uhr.Zifferblatt
Zulässige Werte sind:

- entweder `Wetter`, `page_a_day`, `custom` oder `none`
- benutzerdefinierte Symboldaten im Format `data:image/png;base64,<base64 encoded png binary>` oder `data:image/gif;base64,<base64 encoded gif binary>`

Beispiel: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==`

###countdown.konfigurieren
Zulässiger Wert: Zeit in Sekunden

##Skripte
Um die Nachricht in Ihrer la-Metrik anzuzeigen, senden Sie einfach eine Nachricht mit dem Skriptadapter an diese Instanz:

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "[info|warning|critical]",
        iconType: "[none|info|alert]",
        sound: "<string from sound list>",
        lifeTime: <milliseconds>,
        icon: "<icon>",
        text: "<string|array>",
        cycles: <integer>
    }
);
```

Beispiel Einzelrahmen:

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "info",
        iconType: "none",
        sound: "cat",
        lifeTime: 5000,
        icon: "i31820",
        text: "test",
        cycles: 1
    }
);
```

Beispiel für mehrere Frames:

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "info",
        iconType: "none",
        sound: "cat",
        lifeTime: 5000,
        icon: "i31820",
        text: ["frame 1", "frame 2", "frame 3"],
        cycles: 1
    }
);
```

Beispiel um einige Informationen zyklisch anzuzeigen:

```JavaScript
let i = 0;
function show() {
    console.log('Show ' + i);
    sendTo(
        "lametric.0",
        "notification",
        {
            priority: "info",
            iconType: "info",
            lifeTime: 5000,
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAySURBVBhXY4AAYdcKk1lngCSUDwHIfAQbzgLqgDCgIqRLwFkQCYQoBAD5EATl4wQMDADhuxQzaDgX0gAAAABJRU5ErkJggg==",
            text: "Hi " + i,
            cycles: 1
        }
    );
    i++;
}
setInterval(show, 10000);
show();
```

## Changelog

### 1.3.1

* (klein0r) Added local start and end time for screensaver

### 1.3.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.2.1

* (klein0r) Extended regex for My Data (DIY)

### 1.2.0

* (klein0r) Added hide if value for My Data (DIY)
* (klein0r) Remove frames without text from My Data (DIY)
* (klein0r) Allow dynamic states for My Data (DIY) icons

### 1.1.3

* (klein0r) Fixed async object creation

### 1.1.2

* (klein0r) Delete app channels if app was deleted on LaMetric
* (klein0r) Custom app configuration (clockface, countdown duration)

### 1.1.1

* (klein0r) Fixed replacement issue for My Data (DIY)
* (klein0r) Updated README with more configuration details

### 1.1.0

* (klein0r) Added support for My Data (DIY)

### 1.0.1

* (klein0r) Added chart data support to notification

### 1.0.0

* (klein0r) First stable release
* (klein0r) Added iobroker sentry
* (klein0r) Added brightness and volume limit information (min, max)

### 0.0.10

* (klein0r) Switched to axios lib

### 0.0.9

* (klein0r) Added missing translations
* (GermanBluefox) Improved Blockly and main.js

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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