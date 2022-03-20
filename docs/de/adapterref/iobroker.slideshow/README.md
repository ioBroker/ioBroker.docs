---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.slideshow/README.md
title: ioBroker.slideshow
hash: 0567hUtbU7xUZRXy7s5faV7yRsbM5uJboFkUTFKLxTQ=
---
![Logo](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/slideshow-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/slideshow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.Diashow
![Testen und freigeben](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung](#deutsch)

[Englische Beschreibung](#english)

![Demo](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Diashow-Adapter für ioBroker
Dieser Adapter für ioBroker stellt eine Diashow quasi als Bildschirmschoner für VIS zur Verfügung.

Folgende Quellen stehen aktuell zur Verfügung:

* Die letzten acht täglichen Bilder von Bing.com
* Via VIS-Dateimanager hochgeladene Bilder
* Bilder aus beliebigem Pfad im Dateisystem
* Bilder von Synology PhotoStation und Synology Photo

Zur Darstellung in VIS stellt der Adapter ein Widget zur Verfügung.
This bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden.
Zusätzlich kann ein Timeout eingestellt werden. Sofern auf andere Ansicht im Projekt keine Aktion für das eingestellte Timeout erfolgt, wird zur Ansicht mit der Diashow gewechselt. Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht gewechselt.

Neben dem Bild selbst als Pfad oder Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt.
Diese sind abhängig von der ausgewählten Quelle:

| Objekt | Bin | Lokal und Dateisystem | Synologie | ----------- | ----------- | ----------- | ----------- | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Copyright-Informationen | Kommentar (EXIF-Informationen) | Dateiname | Datum | Datum der Anzeige auf Bing-Seite | Aufnahmedatum (EXIF-Informationen) | Aufnahmedatum

Der Button "Bildliste aktualisieren" als Objekt in ioBroker liest die Bilder aus den konfigurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern. Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen. Bing-Bilder werden stündlich automatisch aktualisiert.

**Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab JS-Controller 3.0 verwendet.

### Konfiguration
In den Einstellungen des Adapters wird die Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, beispielsweise 10 Sekunden.
Außerdem kann eingestellt Werden, wie oft die Liste der Bilder aktualisiert werden soll. Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert.

Bei Auswahl der Quelle "Dateisystem" kann dann noch der Pfad im Dateisystem ausgewählt Werden, außerdem das Format (Hoch- oder Querformat) der angezeigten Bilder sowie die Reihenfolge.

Bei Auswahl der Quelle "Synology PhotoStation" muss die DSM-Version, die IP-Adresse oder der Hostname sowie Benutzername und Passwort angegeben werden. Download von Bildern durch Benutzer muss in den Einstellungen von PhotoStation aktiviert sein.

### VIS-Widget
Das Widget ist in der Kategorie "Slideshow" enthalten.

Das Widget sollte in eine eigene Ansicht integriert werden. So lässt sich der automatische Start der Diashow nutzen.

Folgende Einstellungen sind möglich:

* Abschnitt "Allgemein"
* Objekt-ID: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* Widget mit Bild füllen
* True (Standard) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
* False = Das vollständige Bild WIRD angezeigt, das Widget kann jedoch leere Zonen haben
* Abschnitt "Effekt"
* SlideshowEffect: Als Effekt kann zwischen following gewählt werden:
* "keine"
* "Fade": Einfaches Verblassen und Erscheinen
* "Übergang": Überblenden
* "jQuery-Effekt": Diverse jQuery-Effekte, beispielsweise Rolladen
* Übergangsphase: Zeit in Millisekunden für den Effekt, gute Werte sind 500 oder 1000ms
* Transition Style: Stil für "Transition" und "jQuery-Effekt"
* jQuery-Effekt: Gewünschter jQuery-Effekt
* Abschnitt "Automatischer Diashow-Start"
* Aktivierung des automatischen Starts
* Timeout: Nach welcher Zeit ohne Aktion auf die Diashow-Ansicht gewechselt wird
* Ziel beim Klicken:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächste Einstellung)
* Kein, falls beispielsweise ein eigener Button integriert werden soll
* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

### FAQ
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt durch den Adapter. ioBroker unterstützt mittlerweile sehr viele Betriebssysteme. Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich. Teilweise werden auch weitere Komponenten wie z.B. Samba bei Linux benötigt. Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) kann aber direkt über das Betriebssystem durchgeführt werden. Unter Linux erfolgt der Mount in einem angegebenen Verzeichnis, z.B. /mnt/bilder. Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden.

**Synology**

Können für Synology PhotoStation weitere Einstellungen wie z.B. Auswahl des Albums integriert werden?

Der Zugriff auf bestimmte Fotoalben bzw. Ordner kann jedoch in der aktuellen Version von PhotoStation einfach realisiert werden. Hierzu unter DSM einen Benutzer für die Diashow anlegen und diesem Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw. Ordner geben.

##<a name="english"></a> Diashow-Adapter für ioBroker
Dieser Adapter für ioBroker bietet eine Diashow für VIS, wie einen Bildschirmschoner.

Die folgenden Quellen können tatsächlich verwendet werden:

* Die letzten acht täglichen Bilder von Bing.com
* Bilder hochgeladen mit VIS-File-Manager
* Bilder aus dem Dateisystempfad
* Bilder von Synology PhotoStation oder Synology Photo

Der Adapter stellt ein Widget für die Präsentation in VIS zur Verfügung, das Effekte beim Bildwechsel bietet, zum Beispiel sanftes Aus- und Einblenden.
Zusätzlich kann ein Timeout konfiguriert werden. Wenn auf anderen Ansichten im selben VIS-Projekt keine Aktionen für das definierte Timeout erfolgt sind, wird die Ansicht mit der Diashow gestartet. Mit einem Klick auf das Bild wechselt es zurück zur letzten Ansicht oder zu einer vordefinierten Ansicht.

Neben dem Bild als Pfad oder Base64-kodiertem Objekt sind weitere Objekte mit Bildinformationen in ioBroker erstellt.
Diese sind abhängig von der gewählten Quelle:

| Objekt | Bin | Lokal und Dateisystem | Synologie | ----------- | ----------- | ----------- | ----------- | info1 | Titel | Titel (EXIF-Informationen) | Titel | info2 | Beschreibung | Betreff (EXIF-Informationen) | Beschreibung | info3 | Urheberrecht | Kommentar (EXIF-Informationen) | Dateiname | Datum | Auf der Bing-Seite angezeigtes Datum | Aufnahmedatum (EXIF-Informationen) | Aufnahmedatum

Der Button "Bildliste aktualisieren" als Objekt in ioBroker liest die Bilder aus der konfigurierten Quelle neu ein, nützlich zum Beispiel nach dem Hinzufügen oder Entfernen von Bildern aus der Quelle. Bilder aus allen Quellen außer Bing werden normalerweise beim Start des Adapters geladen. Bing-Bilder werden automatisch stündlich aktualisiert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

### Aufbau
In den Adaptereinstellungen kann die Bildquelle ausgewählt werden. Obwohl das Intervall für Bildwechsel.
Ebenfalls konfigurierbar ist, wie oft die Bilderliste aktualisiert werden soll. Die Einstellung erfolgt in Stunden, 0 deaktiviert die automatische Aktualisierung.

Bei Auswahl der Quelle „Dateisystem“ kann der Pfad und das Format (Quer- oder Hochformat) der anzuzeigenden Bilder angegeben werden. Auch die Reihenfolge kann konfiguriert werden.

Wenn die Quelle „Synology PhotoStation“ ausgewählt wird, müssen die Synology DSM-Version, die IP-Adresse oder der Hostname und ein Benutzername mit Passwort konfiguriert werden. Das Herunterladen von Bildern muss in den PhotoStation-Einstellungen aktiviert sein.

Achtung: Nach Änderungen (Hinzufügen oder Löschen) ist ein Neustart des Adapters erforderlich.

### VIS-Widget
Das Widget ist in der Kategorie "Slideshow" zu finden.

Das Widget soll in eine eigene Ansicht eingebunden werden, damit der automatische Start der Slideshow genutzt werden kann.

Es gibt folgende Konfigurationsmöglichkeiten:

* Kategorie "Allgemein"
* Objekt-ID: Das vom Adapter erstellte ioBroker-Objekt muss bereitgestellt werden, zum Beispiel "slideshow.0.picture"
* Widget mit Bild füllen
* True (Standard) = Bild füllt Widget aus, Rand des Bildes kann abgeschnitten werden
* False = Vollständiges Bild wird angezeigt, aber das Widget kann leere Bereiche haben
* Kategorie "Effekt"
* SlideshowEffect: Folgende Optionen stehen zur Verfügung:
* "Keiner"
* "Fade": Einfaches Aus- und Einblenden
* "Übergang": Überblendung
* "jQuery-Effekt": Verschiedene jQuery-Effekte, zum Beispiel "blind"
* Übergangszeit: Zeit in Millisekunden für den Effekt, 500 oder 1000 sind empfohlene Werte
* Übergangsstil: Stil für "Übergang" und "jQuery-Effekt"
* jQuery-Effekt: Gewünschter Effekt
* Kategorie "Automatischer Diashow-Start"
* Aktivieren Sie den automatischen Start
* Timeout: Nach welcher Zeit in Sekunden der Inaktivität auf anderen Ansichten wird die Diashow gestartet
* Ziel auf Klick:
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächste Einstellung)
* Keine, zB beim Einbinden eines anderen Widgets daher
* Zielansicht: Ansicht, die beim Verlassen der Diashow angezeigt werden soll

### FAQ
**Quelldateisystem**

Können Netzlaufwerke eingebunden werden?

Ja, aber nicht direkt über den Adapter. ioBroker unterstützt mittlerweile eine Vielzahl von Betriebssystemen. Der Zugriff auf und die Verbindung von Netzwerkfreigaben ist je nach Betriebssystem völlig unterschiedlich. Teilweise werden auch zusätzliche Komponenten wie Samba für Linux benötigt. Die Anbindung des Netzlaufwerks (Mapping oder Mount) kann direkt vom Betriebssystem erfolgen. Unter Linux erfolgt der Mount in einem vorgegebenen Verzeichnis, z.B. / mnt / Bilder. Dieses Verzeichnis kann dann in der Adapterkonfiguration verwendet werden.

**Quelle Synology**

Können zusätzliche Einstellungen wie Albumauswahl für Synology PhotoStation integriert werden? Kann DSM 7 (Synology Photos) unterstützt werden?

Synology PhotoStation endet mit DSM 6. Der Nachfolger Synology Photos erscheint mit DSM 7. DSM 7 ist derzeit noch Beta, die finale Version erscheint voraussichtlich im Sommer 2021. Vermutlich wird sich auch die Entwickleroberfläche ändern. Ich werde also keinen weiteren Aufwand in die Vorgängerversion investieren. Sobald DSM 7 offiziell freigegeben ist, werde ich die Integration prüfen. Leider gab es für die Vorgängerversion keine offizielle Synology-Dokumentation.
Der Zugriff auf bestimmte Fotoalben oder Ordner lässt sich jedoch problemlos in der aktuellen Version von PhotoStation implementieren. Erstellen Sie dazu unter DSM einen Benutzer für die Diashow und geben Sie diesem Benutzer nur Berechtigungen für die gewünschten Fotoalben oder Ordner in der PhotoStation.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Include support for Synology DSM 7
* (Gaudes) Remove support for Node 10
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

Copyright (c) 2022 Gaudes <ralf@gaudes.net>

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