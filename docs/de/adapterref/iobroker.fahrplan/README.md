---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: kTK6yHU2pWIjDYV9j1ZE4GdWcFpfNoNcfgBXZsuoeM8=
---
![Logo](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/fahrplan-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/fahrplan-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![NPM](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

#ioBroker.fahrplan
![Testen und freigeben](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/fahrplan/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

##Fahrplan Adapter für ioBroker
### Deutsch
This Adapter for ioBroker used sterben mobile API von HAFAS used. HAFAS steht für HaCon Fahrplan-Auskunfts-System und wird von vielen europäischen Verkehrsunternehmen verwendet, unter anderem auch von der Deutschen Bahn.
Der Zugriff auf HAFAS erfolgt hierbei über [HAFAS-Client](https://github.com/public-transport/hafas-client).

Der Adapter bietet hierbei drei Funktionen:

#### Fahrplan für Verbindungen (Routen)
Die gewünschten Routen müssen in der Adapterkonfiguration eingerichtet und aktiviert werden.
Über einen konfigurierbaren Intervall ruft der Adapter dann regelmäßig die Verbindungsinformationen ab.
Die nächsten drei Verbindungen werden als HTML und optional auch detailliert als Objekte in ioBroker dargestellt.
Das HTML-Objekt kann einfach in VIS eingebunden werden.

#### Benachrichtigung bei Verspätungen der Routen
Für die konfigurierten Routen kann ein Verspätungsalarm aktiviert werden. So kann beispielsweise eine Benachrichtigung per Telegram oder Alexa erfolgen, falls alle oder eine bestimmte Verbindung verspätet ist.

#### Abfahrtstafeln für Stationen
Zusätzlich bietet der Adapter eine Abfahrtstafel für konfigurierte Stationen.
Hierbei werden die nächsten drei Abfahrten einer Station abgerufen und als Objekte und HTML dargestellt.

**Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab JS-Controller 3.0 verwendet.

### Englisch
Dieser Adapter für ioBroker verwendet die mobile API von HAFAS. HAFAS ist ein ÖPNV-Managementsystem, das von ÖPNV-Anbietern in ganz Europa eingesetzt wird, z.B. Deutsche Bahn.
[HAFAS-Client](https://github.com/public-transport/hafas-client) wird verwendet, um auf HAFAS zuzugreifen.

Der Adapter bietet drei Funktionen:

#### Fahrplan für Verbindungen (Strecken)
Die gewünschten Routen müssen in der Adapterkonfiguration konfiguriert und aktiviert werden.
Der Adapter ruft die Verbindungsinformationen in einem konfigurierten Intervall automatisch ab.
Die nächsten drei Verbindungen werden in ioBroker als HTML und optional als Detailobjekte gespeichert.
Das HTML-Objekt könnte problemlos in VIS verwendet werden.

#### Benachrichtigung bei Verspätungen auf Strecken
Für konfigurierte Routen kann eine Verzögerungsbenachrichtigung aktiviert werden. So kann es beispielsweise eine Benachrichtigung per Telegram oder Alexa geben, wenn sich alle oder eine bestimmte Verbindung verzögern.

#### Abfahrtszeiten für Bahnhöfe
Zusätzlich bietet der Adapter einen Abfahrtsfahrplan für konfigurierte Bahnhöfe.
Hier werden die nächsten drei Verbindungen empfangen und als Objekte und HTML erstellt.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

##Konfiguration
### Deutsch
Die Start- und Zielorte sowie Zwischenziele müssen mit ihrer numerischen ID angegeben werden.
Eine Suchfunktion ist im Tab Einstellungen integriert.

#### Registerkarte Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung |--------------------------------|--- | Anbieter | Auswahl des zu verwendenden Anbieters, aktuell DB und ÖBB | Aktualisierungsintervall | Intervall in dem die Route aktualisiert werden, Angabe in Minuten | Verspätet markieren ab | Verspätung in Minuten ab der Verbindung als verspätet markiert wird. Standardmäßig werden nur Verspätungen ab zwei Minuten markiert | Farbe für Pünktlich | Farbwert für bestätigte Pünktlichkeit | Farbe für Verspätungen | Farbwert für Verspätungen | Überschriftenerstellung | HTML-Tabellen werden mit Überschriften erzeugt | HTML-Ansicht erzeugen für Route | Erzeugt pro Route eine konfigurierbare HTML-Tabelle in einem Objekt | HTML-Ansicht erzeugen pro Verbindung | Erzeugt pro einzelne Verbindung eine HTML-Tabelle in einem Objekt | Detailierte Objekte speichern| Konfiguration der auszugebenden Objekte | JSON-Elemente speichern | Die Rückgabe von HAFAS erfolgt als JSON, this sollte zur Fehlerbehebung gespeichert werden

Auf der rechten Seite ist die Suchfunktion integriert. Zuerst muss ein Anbieter ausgewählt werden.
Danach kann über das Suchfeld und Drücken des Knopfs "Suche" nach einer Station gesucht werden.
Die Suchergebnisse der aktuellen Suche werden in der Tabelle angezeigt.

#### Reiter Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung |----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Aktiv | Wenn die Route aktiviert ist Werden die Verbindungsinfos aktualisiert | Von | Numerische ID von Startbahnhof oder Starthaltestelle (Ermittlung über Suche) | Von (Eigener Name) | Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML- und Verspätungstext used | Nach | Numerische ID von Zielbahnhof oder Zielhaltestelle (Ermittlung über Suche) | Nach (Eigener Name) | Benutzerdefinierter Name von Zielbahnhof oder Zielhaltestelle, für HTML- und Verspätungstext used | Über | Fahrt über bestimmten Ort angegeben als numerische ID (optional, sonst leer) | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Bus, S-Bahn, usw. Standardmäßig werden alle Verkehrsmittel ausgewählt | max. Umstiege | Maximale Anzahl an Umstiegen. 0 für nur direkte Verbindungen.
| Abfahrten | Anzahl abzurufender Fahrten | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahme auswählen | Zeit-Offset | Abfahrtszeit: 0 = Jetzt, sonst n Minuten = Jetzt plus n Minuten

#### Reiter Verspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung |----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Aktiv | Wenn der Verspätungsalarm aktiviert ist, wird dieser geprüft | Strecke | Route auf die sich der Alarm beziehen soll | Geplante Abfahrt | Geplante Abfahrtszeit der zu prüfenden Route (Leer = Alle Verbindungen) | Wochentag | Wochentage an denen die Prüfung erfolgen soll | Benachrichtigungen in Minuten | Anzahl der Minuten vor der Abfahrt, in denen benachrichtigt werden soll | Objekt für Ausgabetext | Angabe eines vorhandenen Objekts

Hinweis zum Ausgabetext: Hier kann neben einfachen Objekten für VIS z.B. auch das "speak"-Objekt des Alexa-Adapters or das "reponse"-Objekt des Telegramm-Adapters verwendet werden.

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung |----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Aktiv | Wenn der Eintrag aktiviert ist, wird dieser abgerufen | Von | Numerische ID von Startbahnhof oder Starthaltestelle (Ermittlung über Suche) | Von (Eigener Name) | Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML-Ausgabe verwendet | Abfahrten | Anzahl abzurufender Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Bus, S-Bahn, usw. Standardmäßig werden alle Verkehrsmittel ausgewählt | Zeit-Offset | Abfahrtszeit: 0 = Jetzt, sonst n Minuten = Jetzt plus n Minuten

### Englisch
Start und Ziel sowie Zwischenstopps müssen mit einer numerischen ID identifiziert werden.
Die Suchfunktion für diese IDs ist in den Tab-Einstellungen integriert.

#### Registerkarte Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

| Einstellung | Beschreibung |-----------------------------------------|--- | Anbieter | Auswahl des ÖPNV-Anbieters, aktuell DB und ÖBB | Aktualisierungsintervall | Intervall für Aktualisierungen der Routen in Minuten | Verspätet markieren nach Verzögerung in | Definieren Sie Minuten, nachdem eine Verspätung als Verspätung markiert werden soll, standardmäßig wird eine Verspätung markiert, wenn die Verspätung größer als eine Minute ist | Farbe für pünktliche | Farbe für rechtzeitig bestätigt | Farbe für Verzögerungen | Farbe für Verzögerungen | Erstellung von Schlagzeilen für HTML-Tabellen | Schlagzeilen für HTML-Tabellen erstellen | HTML-Ansicht für Route erstellen | Erstellt pro Route eine konfigurierbare HTML-Tabelle in einem Objekt | HTML-Ansicht pro Fahrt erstellen | Erstellt pro Fahrt eine HTML-Tabelle in einem Objekt | Detaillierte Objekte speichern | Konfiguration der Ausgangsobjekte | JSON-Elemente speichern | Rückgabe von HAFAS ist JSON, sollte zur Fehlerbehebung gespeichert werden

#### Registerkarte Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

Mit der +-Taste können neue Einträge in die Tabelle eingefügt werden.

| Einstellung | Beschreibung |-----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in Objekten und wird automatisch vergeben | Aktiv | Verbindungsinformationen werden aktualisiert, wenn die Route aktiv ist | Von | Numerische ID der Startstation oder Starthaltestelle | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Startstation oder Startstopp, verwendet in HTML- und Verzögerungsmeldungsausgabe | Nach | Numerische ID des Zielbahnhofs oder der Zielhaltestelle | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Zielbahnhof oder Zielhaltestelle, verwendet in HTML- und Verspätungsbenachrichtigungsausgabe | Über | Fahrt über Sonderstation als numerische ID (optional, standardmäßig leer) | Fahrzeug | Fahrzeugauswahl, z.B. Bus, S-Bahn, etc. Standardmäßig sind alle Fahrzeuge ausgewählt | max. Überweisungen | Maximale Transfers auf der Strecke, 0 nur für Direktverbindungen | Abflüge | Anzahl der zu empfangenden Abfahrten | Fahrrad | Wählen Sie nur Verbindungen, bei denen Fahrräder erlaubt sind | Zeitversatz | Abfahrtszeit: 0 = jetzt, sonst n Minuten = jetzt plus n Minuten

#### Registerkarte Alarmverzögerung
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

Mit der +-Taste können neue Einträge in die Tabelle eingefügt werden.

| Einstellung | Beschreibung |----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in Objekten und wird automatisch vergeben | Aktiv | Prüfen, ob Verzögerungsalarm aktiviert ist | Strecke | Route zu diesem Verzögerungsalarm | Geplante Abfahrt | Geplante Abfahrt der zu prüfenden Verbindung (Leer = Alle Routen) | Wochentage | Wochentage, an denen die Verbindung überprüft werden soll | Benachrichtigung in Minuten | Minuten vor Abflug bei aktivem Verspätungsalarm | Objekt für Ausgabetext | ioBroker-Status für Textausgabe

Hinweis zu "Objekt für Ausgabetext": Einfache Zustände für die Verwendung im VIS könnten verwendet werden, aber auch "Sprechen"-Zustand des Alexa-Adapters oder "Antwort"-Zustand des Telegramm-Adapters.

#### Registerkarte Abfahrtszeiten
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

Mit der +-Taste können neue Einträge in die Tabelle eingefügt werden.

| Einstellung | Beschreibung |-----------------------------------------|--- | Nr | Die Nummer entspricht dem Unterknoten in Objekten und wird automatisch vergeben | Aktiv | Verbindungsinformationen werden aktualisiert, wenn das Element aktiv ist | Von | Numerische ID der Startstation oder Starthaltestelle | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Startstation oder Startstopp, verwendet in HTML- und Verzögerungsmeldungsausgabe | Abflüge | Anzahl der zu empfangenden Abfahrten | Fahrzeug | Fahrzeugauswahl, z.B. Bus, S-Bahn, etc. Standardmäßig sind alle Fahrzeuge ausgewählt | Zeitversatz | Abfahrtszeit: 0 = jetzt, sonst n Minuten = jetzt plus n Minuten

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.2.0 (2021-09-19)
* (Gaudes) Remove support for SBB, not using HAFAS anymore
* (Gaudes) Fix Hafas error "Bad Gateway" with code 502 (Sentry #26)
* (Gaudes) Fix unkown station in route (Sentry #7)
* (Gaudes) Remove support for Node 10
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include Dependabot updates

### 1.1.1 (2021-06-22)
* (Gaudes) Advanced error reporting for HAFAS errors
* (Gaudes) Include Dependabot updates

### 1.1.0 (2021-06-04)
* (Gaudes) Time offset for routes and departure tables (Git #88)
* (Gaudes) Check if unloaded before writing/deleting objects (Sentry #7)
* (Gaudes) Include Dependabot updates

### 1.0.7 (2021-04-06)
* (Gaudes) Update HAFAS client to 5.15.2 (Fix error 'invalid json response body' with OEBB profile)
* (Gaudes) Configurable colors for delays and on time
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Include Dependabot updates

### 1.0.6 (2021-03-16)
* (Gaudes) Fix route selection in delay config
* (Gaudes) Fix SBB product suburban-train (Sentry #21)
* (Gaudes) Include Dependabot updates

## License
MIT License

Copyright (c) 2021 Ralf Gaudes <ralf@gaudes.net>

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