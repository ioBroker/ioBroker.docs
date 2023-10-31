---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: YmnxW7ZtzsG+u0IO1fpwJZaBmGWFwiFcPvcI1jn7j5Q=
---
![Logo](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.roadtraffic)
![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roadtraffic/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.roadtraffic)
![NPM-Version](http://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/roadtraffic-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/roadtraffic-installed.svg)

# IoBroker.roadtraffic
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/roadtraffic/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## Über diesen Adapter
Dieser Adapter verwendet die HERE.com-API, um den Verkehr auf Ihren Routen zu überprüfen. Sie können mehrere Routen konfigurieren und der Adapter prüft die tatsächliche Verkehrssituation und zeigt Ihnen an, wie lange Ihre Fahrt dauern wird.
Der Adapter verfügt über einen Wecker – so können Sie dem Adapter mitteilen, wann Sie bei der Arbeit sein müssen – und der Adapter beginnt mit der Radiowiedergabe und macht eine Ansage auf Alexa (Alexa2-Adapter erforderlich) – oder Sie können Ihr eigenes Skript verwenden, um zu reagieren auf den Alarm des Adapters..

## Erste Schritte
So lass uns gehen:

1. Gehen Sie zu https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account und erstellen Sie ein kostenloses HERE.com-Entwicklerkonto (Freemium).

![Hier1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2. Stellen Sie sicher, dass Freemium ausgewählt ist, und füllen Sie das Formular auf der linken Seite aus. (Vorname, Nachname, E-Mail usw.)

![Hier2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3. Klicken Sie auf „Für HERE-Konto registrieren ...“ und vergessen Sie nicht, das Kontrollkästchen (Akzeptieren Sie die Servicebedingungen usw.) anzukreuzen.

![Hier3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4. Noch einmal: Stimmen Sie den Allgemeinen Geschäftsbedingungen zu und klicken Sie auf die Schaltfläche „Codierung starten“.

![Hier4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5. Auf der nächsten Seite befinden Sie sich bereits auf Ihrem HERE.com-Dashboard. Suchen Sie nach dem REST-Bereich und klicken Sie auf „App generieren“.

![Hier5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6. Klicken Sie auf „API-Schlüssel erstellen“ – Sie erhalten einen API-Schlüssel. Öffnen Sie die Instanzeinstellungen des Roadtraffic-Adapters in ioBroker und fügen Sie den API-Schlüssel in das Konfigurationsfeld ein.

![Hier6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7. Klicken Sie in den Instanzeinstellungen auf das Plus-Symbol und erstellen Sie Ihre erste Route.

Nachdem Sie alle Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf „Speichern und schließen“.
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Wecker
In den Instanzeinstellungen können Sie den Wecker aktivieren, indem Sie das Kontrollkästchen „Weckerfunktion aktivieren“ aktivieren.
Sie sollten den Alexa2-Adapter installiert und in den Alexa2-Instanzeinstellungen auf die Verwendung einer Push-Verbindung eingestellt haben.
Wählen Sie das Alexa-Gerät aus, das über den Adapter gesteuert werden soll, und geben Sie die TuneIn-Sender-ID ein, die abgespielt werden soll, wenn der Alarm ausgelöst wird.
Die Alarmlautstärke hat einen Bereich von 0-100.
Mit der Speak-Zeichenfolge können Sie die Ansage von Alexa steuern.
Standard ist: Guten Morgen %name. Bei aktueller Verkehrslage benötigst du %dur zur Arbeit.

15 Sekunden nachdem Alexa begonnen hat, die angegebene TuneIn-Station abzuspielen, wird die Zeichenfolge angesagt.
Wenn Sie beispielsweise eine Route mit dem Namen „Daniel“ haben und der Alarm ausgelöst wird, sagt Alexa: Guten Morgen Daniel. Bei aktueller Verkehrslage benötigen Sie 29 Minuten zur Arbeit.

Lassen Sie die Zeichenfolge „Sprechen“ leer, wenn Sie möchten, dass der Adapter nur mit der Wiedergabe der TuneIn Station beginnt und keine Ansage erhält.

Jede Route verfügt über 7 Alarmkanäle (Montag-Sonntag).
In jedem Kanal gibt es folgende Zustände:

* Ankunftszeit: Geben Sie die Uhrzeit ein, zu der Sie an Ihrem Ziel sein möchten (Beispiel: 07:30 ist halb sieben Uhr morgens).
* Badezeit: Geben Sie die Zeit ein, die zur Reisedauer hinzugefügt werden soll. (Beispiel: 45 ist 45 Minuten. Nehmen wir an, Sie haben die Ankunftszeit auf 10:00 Uhr, die Badezeit auf 30 Minuten und die aktuelle Reisedauer auf 1 Stunde eingestellt. Dann wird der Adapter um 08:30 Uhr (Ankunftszeit – Badezeit – Reisedauer) ausgelöst.
* aktiviert: Auf „true“ setzen, wenn Sie den Alarm für diesen Tag aktivieren möchten
* ausgelöst: Der Adapter setzt diesen Status auf „True“, wenn der Alarm ausgelöst wird. (Sie können es beispielsweise mit eigenen Skripten verwenden.) Der ausgelöste Status wird um 00:00 Uhr des entsprechenden Tages auf „false“ zurückgesetzt. (Der Samstag-Trigger wird am Samstag um 00:00 Uhr auf „false“ gesetzt).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2023-10-27)
* (mcm1957) Error logging has been corrected.

### 1.0.1 (2023-10-26)
* (mcm1957) Issues reported by ioBroker adapter checker and lint have been fixed.

### 1.0.0 (2023-10-26)
* (mcm1957) This adapter has been moved into iobroker-community-organization.
* (mcm1957) Adapter requires nodejs 18.x or newer now.
* (mcm1957) Dependencies have been updated.

### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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