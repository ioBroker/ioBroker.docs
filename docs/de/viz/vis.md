---
title:       "vis"
lastChanged: "09.09.2026"
---

# vis

**vis** war lange die Visualisierung von ioBroker: eine Oberfläche, in der man
sich seine Bedienseiten selbst zusammenstellt, mit Bausteinen statt mit Code.
Sehr viele Anlagen laufen bis heute damit.

!> **Für ein neues Projekt ist [vis-2](/docs/viz/vis-2.md) die richtige Wahl.**
Es ist der Nachfolger und wird weiterentwickelt. Diese Seite beschreibt das
ursprüngliche vis und richtet sich an alle, die ein bestehendes Projekt
weiterpflegen.

## Voraussetzungen

vis braucht den Adapter **web**, der bei der Installation mitkommt. Sonst ist
nichts einzurichten außer der Lizenz. Sie wird im Konto auf
[iobroker.net](https://iobroker.net) verwaltet und ist für die private Nutzung
kostenfrei, siehe [Adapterlizenzen](/docs/licenses/adapter.md).

?> Es kann nur **eine** vis-Instanz geben.

## Aufrufen

| | Adresse |
| --- | --- |
| Anzeige | `http://<server>:8082/vis/index.html` |
| Eine bestimmte Ansicht | `.../vis/index.html#Ansichtsname` |
| Editor | `http://<server>:8082/vis/edit.html` |
| Weiteres Projekt | `.../vis/<projekt>/index.html#Ansichtsname` |

Beide Adressen stehen auch als Verweis im Reiter **Instanzen**. Beim ersten
Aufruf legt vis eine Beispielansicht an.

Ein Projekt besteht aus mehreren **Ansichten** (im Editor „Views"), auf denen
die Widgets frei platziert werden.

## Der Editor

Der Editor teilt sich in vier Bereiche:

| Bereich | Inhalt |
| --- | --- |
| **Kopfleiste** oben | vier Reiter mit den Werkzeugen, dazu Hilfe und Rückgängig |
| **Widgetleiste** links | alle verfügbaren Widgets, mit Filterfeld und Auswahl des Widgetsatzes |
| **Arbeitsfläche** Mitte | die Ansicht, auf der die Widgets liegen |
| **Eigenschaften** rechts | die Einstellungen des Gewählten, mit den Reitern Views, Widget und CSS |

Die vier Reiter der Kopfleiste:

| Reiter | Wofür |
| --- | --- |
| **Views** | Ansicht auswählen, anlegen, umbenennen, löschen |
| **Widgets** | Widget auswählen, kopieren, löschen, mehrere ausrichten |
| **Tools** | Auflösung, Gitter, Kennungen, Ansicht exportieren und importieren |
| **Setup** | Thema, Sprache, Projekte, Dateimanager, Einstellungen, Objektbrowser |

![Werkzeugleiste des Reiters Widgets](media/iobroker_vis_Editor_Widgets_Header.jpg)

Mehrere Widgets lassen sich mit gedrückter Maustaste oder mit Strg-Klick
zusammen auswählen. Danach richtet die Werkzeugleiste sie aus, verteilt sie mit
gleichem Abstand oder gibt ihnen dieselbe Größe. Ihre Eigenschaften lassen sich
dann gemeinsam ändern.

?> Zwei Schalter im Reiter **Widgets** helfen beim Bauen: Der eine friert die
Werte ein, damit sich beim Einrichten nichts unter den Händen ändert, der andere
sperrt das Verschieben, damit ein fertiges Layout nicht aus Versehen verrutscht.

## Auflösung und Standardansicht

![Werkzeugleiste des Reiters Tools](media/iobroker_vis_Editor_Tools_Header.JPG)

Unter **Auflösung** wird eine Bildschirmgröße gewählt, worauf der Editor einen
Rahmen einzeichnet. Er ist nur eine Hilfslinie; in der laufenden Anzeige ist er
unsichtbar.

Zusammen mit dem Häkchen **Default** wird daraus etwas Nützliches: vis merkt
sich, welche Ansicht für welche Auflösung die Standardansicht ist, und wechselt
beim Drehen eines Tablets von selbst. Man baut also eine Ansicht für Hochformat
und eine für Querformat, und das Gerät zeigt jeweils die passende.

**Gitter** lässt Widgets beim Verschieben einrasten, entweder an benachbarten
Elementen oder an einem festen Raster in Pixeln.

**Instanz-ID** und **Browser-ID** identifizieren einen einzelnen Browser. Über
die Steuerschnittstelle lässt sich damit gezielt ein bestimmtes Gerät
ansprechen, statt aller.

Eine einzelne Ansicht wird unter **exportieren** als Text ausgegeben und unter
**importieren** wieder eingelesen. So kommen Beispiele aus dem Forum in das
eigene Projekt.

## Projekte

Standardmäßig gibt es das Projekt `main`. Seine Dateien liegen in der
Installation unter `iobroker-data/files/vis.0/main`.

Mehrere Projekte anzulegen lohnt sich, weil **beim Laden eines Projekts alle
seine Ansichten mitgeladen werden**. Ein Projekt für das Telefon mit wenigen,
schlanken Ansichten startet spürbar schneller als das große Hauptprojekt, gerade
über Mobilfunk. Üblich ist eine Trennung nach Geräten: `main` für den Rechner,
je ein Projekt für Wandtablet und Telefon.

!> Ansichten lassen sich zwischen Projekten nur über exportieren und importieren
kopieren, und ein Navigationswidget kann **nicht** von einem Projekt in ein
anderes verweisen.

Ein ganzes Projekt wird unter **Setup → Projekte** als ZIP exportiert, mit
Bildern, dem Stylesheet `vis-user.css` und den Definitionen `vis-views.json`.
Zum Einlesen zieht man die ZIP-Datei auf das Fenster und vergibt einen Namen.
Wahlweise geht der Export auch anonymisiert.

Ebenfalls unter **Setup**: der **Dateimanager**, mit dem sich Bilder und andere
Dateien ohne Zusatzprogramm in den Dateispeicher von ioBroker laden lassen, und
der **Objektbrowser**, der eine Objekt-ID zum Einfügen in die Zwischenablage
legt.

## Einstellungen für den Betrieb

![Projekteinstellungen](media/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

| Einstellung | Wofür |
| --- | --- |
| **Neuladen falls keine Verbindung länger als** | Nach dieser Zeit ohne Verbindung lädt die Ansicht vollständig neu. Auf „nie" gestellt, passiert das nie. |
| **Wiederverbindungsintervall** | Wie oft ein neuer Verbindungsversuch unternommen wird. |
| **Dunkler Reconnect-Screen** | Damit ein Tablet im Schlafzimmer beim Neuladen nicht hell aufleuchtet. |
| **Löschen aus RAM nicht aktive Views** | Nach dieser Zeit werden ungenutzte Ansichten aus dem Speicher geworfen. Auf einem Tablet mit wenig Arbeitsspeicher hilft das, dafür dauert der nächste Aufruf länger. |

## Widgets

In der Widgetleiste links wird nach einem Begriff gefiltert oder ein
Widgetsatz ausgewählt; der Stern steht für alle Sätze. Ein Widget wird auf die
Arbeitsfläche gezogen oder mit **Einfügen** an der linken oberen Ecke abgelegt.

Welche Bausteine zur Auswahl stehen, hängt von den installierten Widgetsätzen
ab, siehe [Widgetsätze](/docs/viz/widgetsets.md). Die Einstellungen, die jedes
Widget hat, stehen unter
[Einstellungen eines Widgets](/docs/viz/widgets.md).

Zugewiesen wird ein Datenpunkt im Abschnitt **Allgemein** der rechten
Eigenschaftenleiste. Dort sitzen auch Größe, Schrift, Farben, Hintergrund und
Rahmen. Der Reiter **CSS** nimmt eigene Angaben auf.

## Was in vis-2 anders ist

* Eine Ansicht heißt dort **Seite**.
* Der Editor ist neu aufgebaut: Palette links, Attribute rechts, Seiten als
  Reiter.
* Widgets können **relativ** liegen und ordnen sich dann von selbst an, statt
  an festen Koordinaten zu kleben.
* Navigation und Anwendungsleiste sind eingebaut und müssen nicht aus Widgets
  gebaut werden.
* Lese- und Schreibrechte lassen sich je Benutzer vergeben.

Die klassischen Widgetsätze laufen in vis-2 weiter. Einzelheiten unter
[vis-2](/docs/viz/vis-2.md).
