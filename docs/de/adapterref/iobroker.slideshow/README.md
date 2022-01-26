---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.slideshow/README.md
title: ioBroker.slideshow
hash: 8/D05kkVGAGGdx8R2raAPYz/Nnw278Ps6uxt/JycIvw=
---
![Logo](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/slideshow-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/slideshow-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/gaudes/iobroker.slideshow.svg)
![NPM](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.slideshow
![Testen und freigeben](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[Englische Beschreibung](#english)

![Demo](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Diashow-Adapter für ioBroker
This Adapter for ioBroker stellt eine Diashow quasi als Bildschirmschoner für VIS zur Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Bilder von Bing.com
* Über VIS-Dateimanager hochgeladene Bilder
* Bilder aus beliebigem Pfad im Dateisystem
* Bilder von Synology PhotoStation

Zur Darstellung in VIS steht der Adapter ein Widget zur Verfügung.
This bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Zusätzlich kann ein Timeout eingestellt werden. Falls auf andere Ansicht im Projekt keine Aktion für das eingestellte Timeout erfolgt IST, WIRD ZUR Ansicht mit der Diashow gewechselt. Durck Click des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht wechseln.

Neben dem Bild selbst als Pfad oder Base64-kodiertes Objekt Werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt.
Diese sind abhängig von der ausgewählten Quelle:

| Objekt | Bing | Lokal und Dateisystem | Synologie | ------------ | ------------ | ------------ | ------------ | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Copyright-Informationen | Kommentar (EXIF-Informationen) | Dateiname | Datum | Datum der Anzeige auf Bing-Seite | Aufnahmedatum (EXIF-Information) | Aufnahmedatum

Der Button "updatepicturelist" als Objekt in ioBroker liest die Bilder aus den konfigurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder werden stündlich automatisch aktualisiert.

**Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab JS-Controller 3.0 verwendet.

###Konfiguration
In den Einstellungen des Adapters wird sterben Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, zB 10 Sekunden.
Außerdem kann eingestellt werden, wie oft die Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert.

Bei Auswahl der Quelle "Dateisystem" can dann Noch der Pfad im Dateisystem ausgewählt Werden, außerdem das Format (Hoch- oder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge.

Bei Auswahl der Quelle "Synology PhotoStation" muss die IP-Adresse oder der Hostname sowie Benutzername und Passwort angegeben werden. Download von Bildern durch Benutzer muss in den Einstellungen von PhotoStation aktiviert sein.

### VIS-Widget
Das Widget ist in der Kategorie "Diashow" enthalten.

Das Widget sollte in eine eigene Ansicht integriert werden. Hierdurch lässt sich der automatische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Abschnitt "Allgemein"
* Objekt-ID: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* Widget mit Bild füllen
* True (Standard) = Bild geleitet das Widget, der Bildrand ist möglicherweise abgeschnitten
* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Abschnitt "Effekt"
* SlideshowEffect: Als Effekt kann zwischen following gewählt werden:
* "Kein"
* "Fade": Einfaches Verblassen und Erscheinen
* "Übergang": Überblenden
* "jQuery-Effekt": Diverse jQuery-Effekte, beispielsweise Rolladen
* Übergangsphase: Zeit in Millisekunden für den Effekt, gute Werte sind 500 oder 1000ms
* Transition Style: Stil für "Transistion" und "jQuery-Effekt"
* jQuery-Effekt: Gewünschter jQuery-Effekt
* Abschnitt "Automatischer Diashow-Start"
* Aktivierung des unabhängigen Starts
* Timeout: Nach welcher Zeit ohne Aktion auf die Diashow-View wird gewechselt
* Ziel beim Klicken:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächste Einstellung)
* Kein, fällt zB ein eigener Button integriert werden soll
* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### FAQ
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt durch den Adapter. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Teilweise werden auch weitere Komponenten wie z.B. Samba bei Linux benötigt. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) can aber direkt über das Betriebssystem durchgeführt werden. Unter Linux erfolgt der Mount in einem angegebenen Verzeichnis, z.B. /mnt/bilder. Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden.

**Synologie**

Können für Synology PhotoStation weitere Einstellungen wie z.B. Auswahl des Albens integriert werden? Kann DSM 7 (Synology Photos) unterstützt werden?

Synology PhotoStation wird mit DSM 6 enden. Der Nachfolger, Synology Photos, erscheint mit DSM 7. DSM 7 ist aktuell noch Beta, die finale Version wird vermutlich Sommer 2021 erscheinen. Vermutlich ändert sich auch die Entwickler-Schnittstelle. Daher investiere ich keinen Aufwand mehr in die bisherige Version. Sobald DSM 7 offiziell erscheint, werde ich sterben Integration prüfen. Leider gab es für die bisherige Version keine offizielle Dokumentation von Synology.
Der Zugriff auf bestimmte Fotoalben bzw. Ordner kann jedoch in der aktuellen Version von PhotoStation einfach realisiert werden. Hierzu unter DSM einen Benutzer für Diashow anlegen und diesen Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Ordner geben.

##<a name="english"></a> Diashow-Adapter für ioBroker
Dieser Adapter für ioBroker bietet eine Diashow für VIS, wie ein Bildschirmschoner.

Die folgenden Quellen können tatsächlich verwendet werden:

* Die letzten acht täglichen Bilder von Bing.com
* Bilder vom VIS-Datei-Manager hochgeladen
* Bilder aus dem Dateisystempfad
* Bilder von Synology PhotoStation

Der Adapter stellt ein Widget für die Präsentation in VIS bereit, das Effekte beim Bildwechsel bietet, zum Beispiel sanftes Aus- und Einblenden.
Zusätzlich kann ein Timeout konfiguriert werden. Wenn auf anderen Ansichten im gleichen VIS-Projekt keine Aktionen für den definierten Timeout erfolgten, wird die Ansicht mit der Diashow gestartet. Mit einem Klick auf das Bild wechselt es zurück zur letzten Ansicht oder zu einer vordefinierten Ansicht.

Neben dem Bild als Pfad oder Base64 kodiertes Objekt werden weitere Objekte mit Bildinformationen in ioBroker erstellt.
Diese hängen von der ausgewählten Quelle ab:

| Objekt | Bing | Lokales und Dateisystem | Synologie | ------------ | ------------ | ------------ | ------------ | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Urheberrecht | Kommentar (EXIF-Informationen) | Dateiname | Datum | Auf der Bing-Seite angezeigtes Datum | Aufnahmedatum (EXIF-Informationen) | Aufnahmedatum

Der Button "Updatepicturelist" als Objekt in ioBroker liest die Bilder erneut aus der konfigurierten Quelle, nützlich zB nach dem Hinzufügen oder Entfernen von Bildern aus der Quelle. Bilder aus allen Quellen außer Bing werden normalerweise beim Start des Adapters geladen. Bing-Bilder werden automatisch stündlich aktualisiert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

### Aufbau
In den Adaptereinstellungen kann die Bildquelle gewählt werden. Obwohl das Intervall für Bildwechsel.
Ebenfalls konfigurierbar ist, wie oft die Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, 0 deaktiviert das automatische Update.

Bei Auswahl der Quelle "Dateisystem" kann der Pfad und das Format (Quer- oder Hochformat) der anzuzeigenden Bilder eingegeben werden. Auch die Reihenfolge kann konfiguriert werden.

Wenn die Quelle "Synology PhotoStation" ausgewählt ist, müssen die IP-Adresse oder der Hostname und ein Benutzername mit Passwort konfiguriert werden. Der Download von Bildern muss in den PhotoStation-Einstellungen aktiviert sein.

Achtung: Nach Änderungen (Hinzufügen oder Löschen) ist ein Neustart des Adapters erforderlich.

### VIS-Widget
Das Widget finden Sie in der Kategorie "Diashow".

Das Widget sollte in eine eigene Ansicht eingebunden werden, damit der automatische Start der Slideshow genutzt werden kann.

Es gibt folgende Konfigurationsmöglichkeiten:

* Kategorie "Allgemein"
* Objekt-ID: Das vom Adapter erzeugte ioBroker-Objekt muss angegeben werden, zum Beispiel "slideshow.0.picture"
* Widget mit Bild füllen
* True (Standard) = Bild füllt Widget aus, Bildrand kann abgeschnitten werden
* Falsch = Vollständiges Bild wird angezeigt, aber das Widget kann leere Zonen haben
* Kategorie "Effekt"
* Diashow-Effekt: Folgende Optionen stehen zur Verfügung:
* "Keiner"
* "Fade": Einfaches Aus- und Einblenden
* "Übergang": Überblendung
* „jQuery-Effekt“: Verschiedene jQuery-Effekte, zum Beispiel „blind“
* Übergangszeit: Zeit in Millisekunden für den Effekt, 500 oder 1000 sind empfohlene Werte
* Übergangsstil: Stil für "Transistion" und "jQuery-Effect"
* jQuery-Effekt: Gewünschter Effekt
* Kategorie "Automatischer Diashow-Start"
* Automatischen Start aktivieren
* Timeout: Nach welcher Zeit in Sekunden Inaktivität auf anderen Ansichten wird die Diashow gestartet
* Ziel bei Klick:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächste Einstellung)
* Keine, zum Beispiel bei der Einbindung eines anderen Widgets daher
* Zielansicht: Ansicht, die beim Verlassen der Diashow angezeigt werden soll

### FAQ
**Quelldateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt über den Adapter. ioBroker unterstützt mittlerweile eine Vielzahl von Betriebssystemen. Der Zugriff auf und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem völlig unterschiedlich. In einigen Fällen werden auch zusätzliche Komponenten wie Samba für Linux benötigt. Die Anbindung des Netzlaufwerks (Mapping oder Mount) kann direkt vom Betriebssystem erfolgen. Unter Linux erfolgt das Mounten in ein vorgegebenes Verzeichnis, z.B. /mnt/Bilder. Dieses Verzeichnis kann dann in der Adapterkonfiguration verwendet werden.

**Quell-Synologie**

Können zusätzliche Einstellungen wie die Albumauswahl für die Synology PhotoStation integriert werden? Kann DSM 7 (Synology Photos) unterstützt werden?

Synology PhotoStation endet mit DSM 6. Der Nachfolger Synology Photos erscheint mit DSM 7. DSM 7 ist derzeit noch Beta, die finale Version wird voraussichtlich im Sommer 2021 erscheinen. Vermutlich wird sich auch die Entwickleroberfläche ändern. Ich werde also keinen weiteren Aufwand in die Vorgängerversion investieren. Sobald DSM 7 offiziell freigegeben ist, werde ich die Integration überprüfen. Leider gab es für die Vorgängerversion keine offizielle Synology-Dokumentation.
Der Zugriff auf bestimmte Fotoalben oder Ordner kann jedoch in der aktuellen Version von PhotoStation problemlos implementiert werden. Legen Sie dazu unter DSM einen Benutzer für die Diashow an und geben Sie diesem Benutzer nur Berechtigungen für die gewünschten Fotoalben oder Ordner in der PhotoStation.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.1.4 (2021-04-18)
* (Gaudes) Configurable order for Filesystem (Git #37)
* (Gaudes) Configurable picture list update every n hours (Git #41)
* (Gaudes) Fix toggleClass for effect Transition (Git #42)
* (Gaudes) Configurable picture filling in widget (Git #38)
* (Gaudes) Fix for multiple widgets (Git #44)
* (Gaudes) Include Dependabot updates

### 0.1.3 (2021-04-07)
* (Gaudes) Handle Synology picture download error 502 (Sentry #A)
* (Gaudes) Fix update picture list (Git #30)
* (Gaudes) Handle passwords with special characters for Synology (Git #12)
* (Gaudes) Fix empty result (Sentry #9)
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Dependabot updates

### 0.1.2 (2021-03-09)
* (Gaudes) Fix error with breadcrumb on Synology login

### 0.1.1 (2021-03-08)
* (Gaudes) Rename Adapter to slideshow
* (Gaudes) Fix directory access denied (Sentry #4)
* (Gaudes) Error handling for Synology Login (Sentry #3)
* (Gaudes) Fix empty result (Sentry #2)
* (Gaudes) Fix file-not-found (Sentry #1)
* (Gaudes) Include Dependabot updates

### 0.1.0 (2021-02-26)
* (Gaudes) Prepare for beta tests
* (Gaudes) Include Dependabot updates

### 0.0.5 (2021-02-17)
* (Gaudes) Adaptive width and height in widget depending on orientation
* (Gaudes) Fix format option for Synology
* (Gaudes) Writing extended picture information to objects
* (Gaudes) Button for update picture list
* (Gaudes) Save picture count as object
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Sentry error reporting
* (Gaudes) Include Dependabot updates

### 0.0.4 (2021-01-21)
* (Gaudes) Allow PNG-files in Filesystem
* (Gaudes) Fix config problem with formats
* (Gaudes) Handle portrait orientation in widget

### 0.0.3 (2021-01-14)
* (Gaudes) Prepare for alpha tests

### 0.0.2 (2021-01-11)
* (Gaudes) initial release

## License
MIT License

Copyright (c) 2021 Gaudes <ralf@gaudes.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.