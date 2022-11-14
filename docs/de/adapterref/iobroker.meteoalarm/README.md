---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: /vORLnUCUd3thgw0OfhRyfqUqpIgDnAPpJ/JAKnxP2M=
---
![Logo](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Anzahl der Installationen](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

meteoalarm Adapter für ioBroker ---------------------------------------------- --------------------------------- Dieser Adapter zieht Wetteralarme von https://meteoalarm.org, einschließlich Wind , Schnee, Regen, hohe und niedrige Temperaturen usw. Diese Informationen sind in der Landessprache und für detaillierte Regionen verfügbar.

HAFTUNGSAUSSCHLUSS: Zeitverzögerungen zwischen dieser Website und der Website www.meteoalarm.org sind möglich. Für die aktuellsten Informationen zu Alarmstufen, wie sie von den teilnehmenden nationalen Wetterdiensten veröffentlicht werden, verwenden Sie bitte https://www.meteoalarm.org.

Der Entwickler kann nicht garantieren, dass die Warnungen rechtzeitig behandelt werden oder dass es Fehler und Probleme gibt, die dazu führen, dass Warnungen überhaupt nicht behandelt werden!

## Wie man es benutzt
Wählen Sie Ihr Land und anschließend die Region, für die Sie die Warnungen erhalten möchten. Wenn Sie sich nicht sicher sind, wie Ihre Region heißt, gehen Sie bitte zu https://meteoalarm.org und versuchen Sie, sie auf der Karte zu finden.

## Fügen Sie es Ihrem Vis hinzu
Am einfachsten fügen Sie es Ihrem Vis hinzu, indem Sie das Widget basic - html verwenden und dort {meteoalarm.0.htmlToday} eingeben. Dadurch erhalten Sie ein vorgefertigtes HTML-Widget, das Sie im Setup anpassen können.

## Alarmtypen
|Alarmtyp|Beschreibung|
|:---:|:---:|
|1|Wind|
|2|Schnee/Eis|
|3|Donner & Blitz|
|4|Nebel|
|5|Hohe Temperatur|
|6|Niedertemperatur|
|7|Küstenereignis|
|8|Waldbrand|
|9|Lawine|
|10|Regen|
|11|Unbekannt|
|12|Hochwasser|
|13|Regenflut|

## Konfiguration
"Keine Hintergrundfarbe im HTML-Widget": Möglichkeit, das HTML-Widget ohne Hintergrundfarbe zu verwenden (z. B. wenn Sie das Farbobjekt verwenden möchten, um Ihr gesamtes Widget zu füllen, nicht nur das HTML-Widget)

"Warnfarben definieren": Möglichkeit, die Farben für die verschiedenen Alarmstufen im HEX-Code zu definieren. Wird für das HTML-Widget und auch für das Farbobjekt verwendet, um es manuell einem anderen Widget zuzuweisen

„Weiße Symbole verwenden“: Verwenden Sie weiße Symbole anstelle von schwarzen

„Icons“: Legen Sie die Größe des Icons im HTML-Widget fest

"Keine Symbole im Widget": Verwenden Sie das Symbol nicht im HTML-Widget. Sie können weiterhin in den Objekten darauf zugreifen. Dies ist nützlich, wenn Sie das Symbol getrennt vom Widget anzeigen möchten - z. in einer größeren Größe.

„Heute statt Wochentag“ Zeigt in der Kopfzeile des Widgets statt des Wochentags „heute“, „morgen“ oder „gestern“ an.

## Alarmstufen
|Alarmstufe|Beschreibung|
|:---:|:---:|
|Grün|Im Moment ist keine Warnung verfügbar.|
|Gelb|Das Wetter ist potenziell gefährlich. Die vorhergesagten Wetterphänomene sind nicht ungewöhnlich, jedoch sollte Aktivitäten, die meteorologischen Risiken ausgesetzt sind, erhöhte Aufmerksamkeit geschenkt werden. Informieren Sie sich über die zu erwartenden meteorologischen Bedingungen und gehen Sie keine vermeidbaren Risiken ein.|
|Orange|Das Wetter ist gefährlich. Ungewöhnliche meteorologische Phänomene wurden vorhergesagt. Schäden und Unfälle sind wahrscheinlich. Seien Sie sehr aufmerksam und vorsichtig und halten Sie sich über die erwarteten meteorologischen Bedingungen auf dem Laufenden. |
|Rot|Das Wetter ist sehr gefährlich. Ungewöhnlich intensive meteorologische Phänomene wurden vorhergesagt. Extreme Schäden und Unfälle, oft über große Flächen, bedrohen Leben und Sachwerte. |

## Benachrichtigungen
Es ist möglich, dass der Adapter Ihnen die Benachrichtigungen per Mail, Telegramm, Signal oder Pushover sendet.

*Signal
* Post
* Schwächling
* Telegramm
* Synochat

Verfügbare Einstellungen:

* Standort anzeigen: Wenn diese Einstellung aktiviert ist, wird der Standortname der Benachrichtigung hinzugefügt
* Warnstufe in Worten: Fügen Sie zusätzlich zu den Warnsymbolen die Warnstufe in Worten hinzu
* Keine Details: Fügen Sie der Benachrichtigung keine Beschreibung der Warnung hinzu - z. für Alexa
* "Keine Warnungen senden": Senden Sie eine Benachrichtigung, wenn alle Alarme beendet sind und im Moment keine Warnung vorliegt
* Warnstufensymbole: Wählen Sie aus, welche Symbole der Benachrichtigung hinzugefügt werden sollen

## Unterstützte Länder
* Österreich
* Deutschland
* Belgien
* BosnienHerzegowina
* Kroatien
* Zypern
* Tschechische Republik
* Dänemark
* Estland
* Finnland
* Frankreich
* Griechenland
* Ungarn
* Island
*Israel
* Italien
* Lettland
* Litauen
* Luxemburg
*Malta
* Niederlande
* Norwegen
* Polen
* Rumänien
* Serbien
* Slowakei
* Slowenien
* Spanien
* Schweden
* Schweiz
* Großbritannien

Wenn Sie Ihr Land nicht finden, erstellen Sie bitte ein Problem auf Github, und ich werde es gerne hinzufügen

## Nicht mögliche Länder
* Portugal (Geocode-Datei von meteoalarm.org ist wahrscheinlich falsch)
* Bulgarien (Geocode-Datei von meteoalarm.org ist wahrscheinlich falsch)

## 2.3.0 (2022-09-15)
* (jack-blackson) Fähigkeit, Alarme an andere Adapter zu senden (Telegramm, eMail, Pushover, Signal, Synochat
* (jack-blackson) Link im Alarmordner reparieren

## 2.2.1 (2022-07-28)
* (jack-blackson) Bugfix noOfAlarms und Nummerierung von Objekten

## 2.2.0 (2022-07-05)
* (jack-blackson) Objekt JSON hinzugefügt, das alle aktiven Fehler im JSON-Format enthält (z. B. für Benutzer von iqontrol)
* (jack-blackson) Erster Schritt, um doppelte Fehlermeldungen loszuwerden

## 2.1.5 (2022-06-13)
* (jack-blackson) Fehler „Fehler von InMemDB: Fehler: Nicht vorhanden“ behoben

## 2.1.4 (2022-05-26)
* (jack-blackson) Breadcrumb für Sentry hinzugefügt, um zu sehen, an welcher Stelle ein Fehler aufgetreten ist
* (jack-blackson) Tracking in Sentry starten, wenn XMLs ohne Geocode gesendet werden

## 2.1.3 (2022-05-23)
* (jack-blackson) Umgang mit Warnungen, die ohne Geocode gesendet werden -> Sentry IOBROKER-METEOALARM-3B

## 2.1.2 (2022-05-16)
* (jack-blackson) Bugfix für Änderung in xml (falscher Link für Warnung wurde verwendet) -> Sentry IOBROKER-METEOALARM-2Y und IOBROKER-METEOALARM-31

## 2.1.1 (08.02.2022)
* (jack-blackson) Aktualisierte Lizenzinformationen
* (jack-blackson) Fehler für js-controller 4.x behoben

## 2.1.0 (2022-02-03)
* (jack-blackson) Schweiz hinzugefügt

## 2.0.10 (2021-12-10)
* (Jack-Blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) Bugfix für Irland

## 2.0.9 (2021-11-27)
* (jack-blackson) Datum in Worten richtig berechnen - diesmal echt :)

## 2.0.10 (2021-12-10)
* (Jack-Blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) BUgfix für Irland

## 2.0.9 (2021-11-27)
* (jack-blackson) Datum in Worten richtig berechnen - diesmal echt :)
* (Jack-Blackson) Bugfix Sentry IOBROKER-METEOALARM-2N

## 2.0.8 (2021-11-26)
* (jack-blackson) Neuen Datenpunkt "Anzahl aktiver Alarme" hinzugefügt
* (jack-blackson) Angepasste Paketinformationen
* (jack-blackson) Bugfix Datumsdarstellung im HTML Widget für Warnungen 2 Tage im Voraus

## 2.0.7 (01.10.2021)
* (Jack-Blackson) Fehlerbehebung

## 2.0.6 (2021-09-29)
* (jack-blackson) Nordmazedonien hinzugefügt
* (jack-blackson) Fehlerbehebung für den Fehler „result.feed.entry.forEach ist keine Funktion“.

## 2.0.5 (2021-08-15)
* (jack-blackson) Bugfix-Datum in Worten

## 2.0.4 (2021-08-13)
* (Jack-Blackson) Bugfix-Liesmich-Link

## 2.0.3 (2021-08-09)
* (jack-blackson) Zeigt das Datum in Worten anstelle des Tages im HTML-Widget an
* (jack-blackson) Sprachcode für Belgien hinzugefügt

## 2.0.2 (2021-07-15)
* (Jack-Blackson) Fehlerbehebung

## 2.0.1 (2021-07-08)
* (jack-blackson) Name des Alarmordners in Alarm_X geändert
* (jack-blackson) Legen Sie im Setup fest, welche Alarme Sie sehen möchten
* (jack-blackson) Alarme nach Datum des Inkrafttretens sortieren

## 2.0.0 (2021-07-06)
* (jack-blackson) Wechsel zu Meteoalarm.org, kompletter Neuaufbau

## 1.2.1 (2021-06-05)
* (jack-blackson) Bugfix zur Behandlung von falschem XML (wenn Land statt Region verwendet wird)
* (jack-blackson) Luxemburg hinzugefügt

## 1.2.0 (2021-05-16)
* (jack-blackson) Neues Setup: "Keine Hintergrundfarbe im HTML-Widget", "Warnfarben definieren" und "Weiße Icons verwenden"
* (Jack-Blackson) Neue Symbole

## 1.1.11 (2021-05-09)
* (Jack-Blackson) Paketaktualisierungen

## 1.1.9 (2021-05-07)
* (Jack-Blackson) Paketaktualisierungen

## 1.1.5 (2021-05-02)
* (jack-blackson) Bugfix JS-Controller 3.3.1 Fehler, Fehlerbehandlung keine Sprache definiert

## 1.1.4 (2021-04-05)
* (jack-blackson) ENOTFOUND-Fehlermeldung behandeln, Sentry hinzugefügt

## 1.1.3 (2021-03-29)
* (jack-blackson) Fehler behebt Adapterprüfer

## 1.1.2 (2021-03-29)
* (jack-blackson) Bugfix für nicht funktionierende Datenaktualisierung, automatische Linkgenerierung aufgrund von CORS-Fehlern entfernt

## 1.1.1 (2020-10-28)
* (Jack-Blackson) Bugfix HTML-Daten

## 1.1.0 (2020-03-29)
* (jack-blackson) Bugfix Deutschland

## 1.0.9 (2020-02-06)
* (jack-blackson) Bugfix Deutschland

## 1.0.8 (2019-11-15)
* (jack-blackson) Polen, Moldawien, Griechenland, Rumänien hinzugefügt
* (jack-blackson) Neuen Datenpunkt hinzugefügt, um Link zur Wetterkarte zu erhalten

## 1.0.7 (2019-11-13)
* (jack-blackson) Tschechische Republik, Irland, Israel, Litauen, Lettland, Montenegro, Malta, Serbien, Schweden hinzugefügt

## 1.0.6 (2019-10-19)
* (jack-blackson) Schweiz & Slowakei hinzugefügt

## 1.0.5 (2019-09-22)
* (jack-blackson) Kleine Logging-Anpassungen

## 1.0.4 (2019-09-11)
* (Jack-Blackson) Travis-Fehler

## 1.0.3 (09.09.2019)
* (jack-blackson) Kleine Bugfixes, Änderung von Typ "deamon" zu "schedule"

## 1.0.2 (2019-08-25)
* (jack-blackson) Veröffentlichungsinfos neu geordnet

### 1.0.1 (2019-08-18)
* (jack-blackson) Bugfix kein Alarmsymbol

### 1.0.0 (2019-08-12)
* (Jack-Blackson) Release-Version

### 0.6.0 (2019-08-05)
* (jack-blackson) Wettersymbole lokal im Adapter speichern

### 0.5.0 (2019-07-21)
* (jack-blackson) Handle-Timeouts
* (jack-blackson) Übersetzungen für alle Sprachen
* (Jack-Blackson) URL-Prüfungen

### 0.4.0 (2019-07-20)
* (jack-blackson) Daten für NL, NO, HR, FI, ES hinzugefügt
* (jack-blackson) Typtext hinzugefügt, Typ ist jetzt leer, wenn Level 1 ist (keine Warnung)
* (jack-blackson) Angepasste Farben

### 0.3.0 (2019-07-13)
* (Jack-Blackson) HTML-Widget hinzugefügt
* (Jack-Blackson) Bugfix-Symbol

### 0.2.0 (2019-07-12)
* (jack-blackson) „Morgen“-Daten hinzugefügt

### 0.1.0 (2019-07-11)
* (Jack-Blackson) Erstversion

## Credits
Glocke im Symbol, entworfen von Freepik von www.flaticon.com

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2022 jack-blackson <blacksonj7@gmail.com>

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