---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/docs/en/tracker.md
title: Registerkarte: Fahrtenbuch
hash: IizM1fEw9w7/sm1XBEJp0EGdIQM5QyfagAdwnrYsJGY=
---
![Logo](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Die nächste Generation [zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)
(ab Version 1.4.0 - nur die neueste Version bietet den vollen Funktionsumfang)

# Registerkarte: Logbuch
## Logbuch- und Kartenfunktionen
Der ioBroker life360ng-Adapter bietet umfassende Logbuch- und Kartenfunktionen für jede verfolgte Person:

- **Individuelle Karten für jede Person:** Für jede Person, bei der die Ortung aktiviert ist, steht eine eigene Karte zur Verfügung, die die zurückgelegten Routen (geoJSON-basiert) und die aktuelle Position anzeigt.
- **Familienkarte:** Zusätzlich zeigt eine Familienkarte die Routen aller aktivierten Personen gemeinsam an.
- **Integrierter Datumswähler:** Die Karten-HTML-Datei enthält einen Kalender, um einen bestimmten Tag auszuwählen und die Route für diesen Tag anzuzeigen.
- **Flexible Integration:** Karten können direkt im Browser geöffnet oder als iFrame in Visualisierungen eingebettet werden (z. B. ioBroker VIS).
- **Kartendarstellung:** Farben, Routenstil, Ortsmarkierungen und Layout werden auf der Registerkarte [Kartendarstellung](/#/docs/adapterref/iobroker.life360ng/docs/en/mapdisplay.md) konfiguriert.

Alle Details zur Konfiguration und Verwendung finden Sie weiter unten und in der Adapterkonfiguration.

## Verwendung der Personenkarte und Familienkarte
Der ioBroker life360ng-Adapter bietet zwei Kartentypen zur Visualisierung von Bewegungsdaten:

### 1. Personenkarte
Jede Person, bei der die Ortung aktiviert ist, erhält ihre eigene Karte. Diese Karte zeigt die zurückgelegten Routen als farbige Linien (geoJSON-basiert) und die aktuellen Positionen an.

- **Aktivierung:** Aktivieren Sie die gewünschte Person im Adapter unter "Tracker" (`enabled`).
- **Eigene Karte:** Die Option `ownMap` steuert, ob für diese Person eine separate Karte erstellt wird.
- **Zugriff:** Die Karten-URL finden Sie im Objektbaum unter `life360ng.<instance>.tracker.<person>.url`.

### 2. Familienkarte
Die Familienkarte zeigt die Routen aller behinderten Personen zusammen auf einer Karte.

- **Aktivierung:** Mindestens eine Person muss die Option `familyMap` im Tracker aktiviert haben.
- **Zugriff:** Die URL für die Kreiskarte ist unter `life360ng.<instance>.tracker.circle.url` verfügbar.

Alle Einstellungen zur Kartendarstellung (Farben, Routenstil, Ortsmarkierungen, Layout) befinden sich auf der Registerkarte **[Kartendarstellung](/#/docs/adapterref/iobroker.life360ng/docs/en/mapdisplay.md)**.

### 3. Datumsauswahl
Die Karten-HTML-Datei enthält eine Datumsauswahl. Damit können Sie einen bestimmten Tag auswählen und die Route für diesen Tag anzeigen lassen. Standardmäßig wird die aktuelle Route angezeigt. Die Datumsauswahl ist besonders nützlich, um Bewegungen an bestimmten Tagen zu überprüfen.

**Hinweis:** Die Darstellung kann je nach verwendetem Browser variieren.

#### Standard-Sichtbereich
Unter **Allgemein → Standardansicht (Tage)** können Sie festlegen, wie viele Tage standardmäßig angezeigt werden, wenn die Karte geöffnet wird.

| Wert | Wirkung |
|---|---|
| 1 (Standard) | Es wird nur die heutige Route angezeigt |
| 2 | Heute und gestern |
| N | Heute und die N−1 vorherigen Tage |

Bei jedem Öffnen der Karte wird das Startdatum basierend auf dem konfigurierten Wert auf heute minus (N−1) Tage festgelegt. Durch manuelles Anpassen des Datumsauswahlfelds ändert sich die Ansicht nur für die aktuelle Sitzung.

---

### 4. Hamburger-Menü (☰)
Klicken Sie auf das ☰-Symbol oben rechts, um das Einstellungsmenü zu öffnen. Die Einstellungen werden pro Karte im Sitzungsspeicher des Browsers gespeichert und bleiben erhalten, bis der Tab geschlossen wird.

| Option | Beschreibung |
|---|---|
| **Route** | Zeigt die zurückgelegte Route als farbige Linie auf der Karte an. Wenn die Routenfunktion aktiviert ist, wird auch eine Datumsbereichsauswahl angezeigt. |
| **Orte** | Zeigt Life360-Orte als Flaggenmarkierungen auf der Karte an. |
| **Ortsradius** | Zeigt den konfigurierten Radiuskreis um jeden Life360-Ort an. |
| **Meine Orte** | Zeigt benutzerdefinierte Orte (Meine Orte) als Flaggenmarkierungen auf der Karte an. |
| **Meine Orte Radius** | Zeigt den Radiuskreis um jeden benutzerdefinierten Ort an. |
| **Tageshighlight** | Aktiviert die interaktive Funktion „Tageshighlight“ (siehe unten). |
| **Fußzeile** | Zeigt oder blendet die Legende unterhalb der Karte ein. |
| **Kartengröße** | Zeigt die aktuellen Kartenabmessungen in der Kopfzeile an. |
| **Automatische Aktualisierung** | Lädt die Seite automatisch im konfigurierten Abfrageintervall neu. Standardmäßig aktiviert. Deaktivieren Sie diese Funktion, um die aktuelle Ansicht einzufrieren. |
| **Live-Folgen** | Die Karte wird bei jedem Seitenaufruf zur aktuellen GPS-Position der ausgewählten Person verschoben. Durch Aktivieren von Live-Folgen wird die automatische Aktualisierung aktiviert. |
| **↻ Neu laden** | Lädt die Karte vollständig neu. |

#### Live folgen
Wenn **Live-Folgen** aktiviert ist, schwenkt die Karte nach jedem Seitenaufruf automatisch zur aktuellsten GPS-Position der verfolgten Person. So können Sie eine Person in Echtzeit verfolgen, ohne die Karte berühren zu müssen.

- Durch Aktivieren von Live Follow wird **automatisch die automatische Aktualisierung aktiviert**, sodass die Seite regelmäßig neu geladen wird, um neue Positionen zu erfassen.
- Das Deaktivieren von Live Follow deaktiviert **nicht** die automatische Aktualisierung - diese wird danach unabhängig voneinander gesteuert.
In der **Kreiskarte** wird die Person, der gefolgt wird, durch die aktuell fokussierte Person bestimmt (die zuletzt in der Legende angeklickte). Wenn keine Person fokussiert wurde, folgt die Karte der Person, deren Route angezeigt wird.
- Die angegebene Position ist der letzte aufgezeichnete GPS-Punkt des ausgewählten Tagesbereichs.

#### Tageshighlight
Wenn die **Tageshervorhebung** aktiviert ist, können Routen auf der Karte interaktiv hervorgehoben werden:

**Bewegen Sie den Mauszeiger über eine Linie:** Die Route für diesen Tag wird vorübergehend hervorgehoben - die Linie wird dicker und verblasst an allen anderen Tagen. Wenn Sie den Mauszeiger entfernen, wird der Normalzustand wiederhergestellt. Ein Tooltip zeigt das Datum der Route an.
**Klicken Sie auf eine Linie:** Die Markierung wird fixiert. Die Route bleibt aktiv, und es erscheint ein Popup mit dem Datum (Personenkarte) bzw. dem Namen und dem Datum (Familienkarte). Durch erneutes Klicken auf dieselbe Linie oder auf den Kartenhintergrund wird die Fixierung aufgehoben.
- **Klicken Sie auf eine Markierung:** Öffnet das Popup für diese Markierung (Start- oder Endpunkt des Tages), ohne die Tageshervorhebung auszulösen.

> **Hinweis:** Sobald eine Route durch einen Klick gesperrt ist, wird der Tooltip für die Linien beim Überfahren mit der Maus unterdrückt - die gesperrte Ansicht bleibt unberührt.

Die generierten HTML-, CSS- und JS-Dateien werden im ioBroker-Dateisystem gespeichert. Sie können diese unter **Admin → Dateien → `life360ng.<instance>/tracker/`** anzeigen und verwalten.

---

## Erläuterungen der Punkte und Markierungen auf den Karten
| Typ | Grund |
|---|:---|
|Dunkle Punkte: | Beginn des Tages|
|Lichtpunkte: | Endpunkt des Tages|
|Pin/Markierung: | Aktueller Standort|

---

## Datenmanagement
Die Routendaten (`allTime.geojson`) nehmen mit der Zeit zu. Der Adapter bietet zwei Möglichkeiten, die Dateigrößen zu kontrollieren:

### Automatische Bereinigung (Aufbewahrungszeitraum)
Unter **Allgemein → Aufbewahrung (Tage)** können Sie festlegen, wie viele Tage Routendaten aufbewahrt werden sollen. Ältere Daten werden bei jedem Adapterstart und einmal täglich automatisch gelöscht. Der Wert `0` bedeutet unbegrenzte Aufbewahrung.

### Manuelle Reinigung für Einzelpersonen
Die **Personentabelle** enthält eine **Spalte "Datensatz löschen."**. Aktivieren Sie das Kontrollkästchen für eine Person und speichern Sie die Konfiguration. Der Datensatz `allTime.geojson` dieser Person wird auf die letzte bekannte Position reduziert.

⚠️ Da die Familienkarte aus den individuellen Personendaten erstellt wird, wird sie beim Löschen der Datensätze einer Person automatisch aktualisiert.

Die monatlichen GeoJSON-Dateien (`currentYear.MM`) bleiben davon unberührt.