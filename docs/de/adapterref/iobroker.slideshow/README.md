---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.slideshow/README.md
title: ioBroker.Diashow
hash: JzFpziqmjAlUpvoVt6P6xVMXV1nenar3ljFNKgEY15M=
---
![Logo](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/slideshow-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/slideshow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.Diashow
![Testen und Freigeben](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[Englische Beschreibung](#english)

![Demo](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Diashow Adapter für ioBroker
Dieser Adapter für ioBroker stellt eine Diashow quasi als Bildschirmschoner für VIS zur Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Bilder von Bing.com
* Über VIS-Dateimanager hochgeladene Bilder
* Bilder aus beliebigem Pfad im Dateisystem
* Bilder von Synology PhotoStation und Synology Photo

Zur Darstellung in VIS stellt der Adapter ein Widget zur Verfügung.
Dies bietet auch Funktionen für Effekte beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Zusätzlich kann ein Timeout eingestellt werden. Sofern auf andere View im Projekt keine Aktion für das eingestellte Timeout erfolgt, wird zur View mit der Diashow gewechselt. Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht geändert.

Neben dem Bild selbst als Pfad oder Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt.
Diese sind abhängig von der ausgewählten Quelle:

| Objekt | Bing | Lokales und Dateisystem | Synologie | ----------- | ----------- | ----------- | ----------- | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Copyright-Informationen | Kommentar (EXIF-Informationen) | Dateiname | Datum | Datum der Anzeige auf Bing-Seite | Aufnahmedatum (EXIF-Informationen) | Aufnahmedatum

Der Button „updatepicturelist“ als Objekt in ioBroker liest die Bilder aus den konfigurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme von Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder werden fortlaufend automatisch aktualisiert.

**Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird mit JS-Controller 3.0 verwendet.

### Konfiguration
In den Einstellungen des Adapters wird die Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, beispielsweise 10 Sekunden.
Außerdem kann eingestellt werden, wie oft die Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert.

Bei Auswahl der Quelle „Dateisystem“ kann dann noch der Pfad im Dateisystem ausgewählt werden, außerdem das Format (Hoch- oder Querformat) der angezeigten Bilder sowie die Reihenfolge.

Bei Auswahl der Quelle „Synology PhotoStation“ müssen die DSM-Version, die IP-Adresse oder der Hostname sowie Benutzername und Passwort angegeben werden. Der Download von Bildern durch Benutzer muss in den Einstellungen von PhotoStation aktiviert sein.

### VIS-Widget
Das Widget ist in der Kategorie „Slideshow“ enthalten.

Das Widget sollte in eine eigene Ansicht integriert werden. Hierdurch lässt sich der automatische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Abschnitt "Allgemein"
	* Objekt-ID: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise „slideshow.0.picture“
* Widget mit Bild füllen
		* True (Standard) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
		* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Abschnitt "Effekt"
	* SlideshowEffect: Als Effekt kann zwischen folgenden gewählt werden:
* "Kein"
		* „Fade“: Einfaches Verblassen und Erscheinen
		* „Übergang“: Überblenden
		* „jQuery-Effekt“: Diverse jQuery-Effekte, beispielsweise Rolladen
	* Übergangsphase: Zeit in Millisekunden für den Effekt, gute Werte sind 500 oder 1000ms
	* Transition Style: Stil für „Transistion“ und „jQuery-Effekt“
	* jQuery-Effekt: Gewünschter jQuery-Effekt
* Abschnitt „Automatischer Diashow-Start“
	* Aktivierung des automatischen Starts
	* Timeout: Nach welcher Zeit ohne Aktion auf die Diashow-Ansicht geändert wird
* Ziel beim Klicken:
		* Zuletzt verwendete Ansicht
		* Konfigurierte Ansicht (siehe nächste Einstellung)
		* Nein, falls beispielsweise ein eigener Button integriert werden soll
	* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### Häufig gestellte Fragen
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt durch den Adapter. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem völlig unterschiedlich. Teilweise werden auch weitere Komponenten wie z.B. Samba wird unter Linux benötigt. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) kann aber direkt über das Betriebssystem durchgeführt werden. Unter Linux erfolgt der Mount in einem angegebenen Verzeichnis, z.B. /mnt/bilder. Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden.

**Synology**

Können für Synology PhotoStation weitere Einstellungen wie z.B. Auswahl des Albums integriert werden?

Der Zugriff auf bestimmte Fotoalben bzw. Ordner kann jedoch in der aktuellen Version von PhotoStation einfach realisiert werden. Hierzu unter DSM einen Benutzer für Slideshow anlegen und dieser Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Ordner geben.

##<a name="english"></a> Diashow-Adapter für ioBroker
Dieser Adapter für ioBroker bietet eine Diashow für VIS, ähnlich einem Bildschirmschoner.

Folgende Quellen können konkret genutzt werden:

* Die letzten acht Tagesbilder von Bing.com
* Bilder hochgeladen mit VIS-File-Manager
* Bilder vom Dateisystempfad
* Bilder von Synology PhotoStation oder Synology Photo

Der Adapter stellt ein Widget für die Präsentation im VIS zur Verfügung, welches Effekte beim Bildwechsel bietet, beispielsweise sanftes Aus- und Einblenden.
Zusätzlich kann ein Timeout konfiguriert werden. Wenn in anderen Ansichten im selben VIS-Projekt innerhalb des definierten Timeouts keine Aktionen erfolgen, wird die Ansicht mit der Slideshow gestartet. Mit einem Klick auf das Bild wird dann wieder zur letzten Ansicht oder einer vordefinierten Ansicht zurückgewechselt.

Neben dem Bild als Pfad oder Base64-kodiertes Objekt werden in ioBroker noch weitere Objekte mit Bildinformationen erstellt.
Diese hängen von der gewählten Quelle ab:

| Objekt | Bing | Lokal und Dateisystem | Synology | ----------- | ----------- | ----------- | ----------- | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Copyright | Kommentar (EXIF-Informationen) | Dateiname | Datum | Auf der Bing-Seite angezeigtes Datum | Aufnahmedatum (EXIF-Informationen) | Aufnahmedatum

Der Button "updatepicturelist" als Objekt im ioBroker liest die Bilder aus der konfigurierten Quelle erneut ein, nützlich beispielsweise nach dem Hinzufügen oder Entfernen von Bildern aus der Quelle. Bilder aus allen Quellen, außer Bing, werden normalerweise beim Start des Adapters geladen. Bing-Bilder werden automatisch stündlich aktualisiert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

### Konfiguration
In den Adaptereinstellungen kann die Bildquelle gewählt werden. Ebenso das Intervall für den Bildwechsel.
Konfigurierbar ist auch, wie oft die Bilderliste aktualisiert werden soll. Die Einstellung erfolgt in Stunden, 0 deaktiviert die automatische Aktualisierung.

Bei der Auswahl der Quelle "Dateisystem" kann der Pfad angegeben werden und das Format (Querformat oder Hochformat) der anzuzeigenden Bilder. Auch die Reihenfolge kann konfiguriert werden.

Wenn die Quelle „Synology PhotoStation“ ausgewählt ist, müssen die Synology DSM-Version, die IP-Adresse oder der Hostname und ein Benutzername mit Passwort konfiguriert werden.

Achtung: Nach Änderungen (Hinzufügen oder Löschen) ist ein Neustart des Adapters erforderlich.

### VIS-Widget
Das Widget ist in der Kategorie „Diashow“ zu finden.

Das Widget sollte in eine eigene Ansicht eingebunden werden, damit der automatische Start der Slideshow genutzt werden kann.

Es bestehen folgende Konfigurationsmöglichkeiten:

* Kategorie „Allgemein“
* Objekt-ID: Es muss das vom Adapter erstellte ioBroker Objekt angegeben werden, zum Beispiel „slideshow.0.picture“
* Widget mit Bild füllen
* True (Standard) = Bild füllt Widget, Bildrand kann abgeschnitten werden
* False = Das vollständige Bild wird angezeigt, aber das Widget kann leere Zonen haben
* Kategorie „Effekt“
* DiashowEffekt: Folgende Optionen stehen zur Verfügung:
* „Keine“
* „Fade“: Einfaches Ausblenden und Einblenden
* „Übergang“: Überblendung
* "jQuery-Effekt": Verschiedene jQuery-Effekte, zum Beispiel "blind"
* Übergangszeit: Zeit in Millisekunden für den Effekt, 500 oder 1000 sind empfohlene Werte
* Transition Style: Style für "Transistion" und "jQuery-Effekt"
* jQuery-Effekt: Gewünschter Effekt
* Kategorie „Automatischer Diashow-Start“
* Automatischen Start aktivieren
* Timeout: Nach welcher Zeit in Sekunden der Inaktivität auf anderen Ansichten wird die Diashow gestartet
* Ziel beim Klicken:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächste Einstellung)
* Keine, zum Beispiel bei der Integration eines anderen Widgets daher
* Zielansicht: Ansicht, die beim Verlassen der Diashow angezeigt werden soll

### Häufig gestellte Fragen
**Quelldateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, allerdings nicht direkt über den Adapter. ioBroker unterstützt mittlerweile eine Vielzahl von Betriebssystemen. Der Zugriff und die Anbindung von Netzwerkfreigaben ist je nach Betriebssystem völlig unterschiedlich. Teilweise werden auch noch Zusatzkomponenten wie Samba für Linux benötigt. Die Anbindung des Netzlaufwerks (Mapping bzw. Mount) kann direkt über das Betriebssystem erfolgen. Unter Linux erfolgt das Mounten in ein angegebenes Verzeichnis, z.B. /mnt/pictures. Dieses Verzeichnis kann dann in der Adapterkonfiguration verwendet werden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.2.1 (2024-11-18)
* (Gaudes) Update in package.json for VIS

### 0.2.0 (2024-11-13)
* (Gaudes) Include support for Synology DSM 7
* (Gaudes) Add controls for start/stop
* (Gaudes) Remove support for older Node versions
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include adapter-dev
* (Gaudes) Include Dependabot updates

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

Copyright (c) 2024 Gaudes <ralf@gaudes.net>

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