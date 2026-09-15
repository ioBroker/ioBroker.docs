---
chapters: {"pages":{"en/adapterref/iobroker.energiefluss/README.md":{"title":{"en":"ioBroker.energiefluss"},"content":"en/adapterref/iobroker.energiefluss/README.md"},"en/adapterref/iobroker.energiefluss/docs/en/README.md":{"title":{"en":"ioBroker.energiefluss"},"content":"en/adapterref/iobroker.energiefluss/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energiefluss/docs/en/README.md
title: ioBroker.energiefluss
hash: bdbxx489eOv/7Z916ZY/EDbN7kNbmROU7nxVcAsUTlY=
---
![Logo](../../../../../en/adapterref/iobroker.energiefluss/docs/en/admin/energiefluss.png)

# ioBroker.energiefluss

## Funktionen

**Design:**

- Ändern Sie die Farbe jedes einzelnen Gegenstands.
- Elemente können ausgewählt werden (Kreis oder Rechteck).
- Definiere einen Timer zum Austauschen von Werten und Beschreibungen innerhalb des Elements
- Texte innerhalb der Elemente können bearbeitet werden (\<br> fungiert als Zeilenumbruch).
- %-Texte können auch unterschiedliche Farben haben.
- Definiere für jede Linie eine andere Farbe.
- Linien können ausgeblendet werden, wenn für die Linie keine Animation aktiv ist.
- Definiere für jede Animation auf der Linie unterschiedliche Farben.
- Dicke der Elemente und Linien ändern
- Die Elemente werden mit verschiedenen Farben gefüllt (Elemente mit Prozentwerten können entsprechend ihrem Prozentwert gefüllt werden; wenn keine Farbe ausgewählt ist, ist das Element transparent).
- Schatten der Elemente ein-/ausblenden
- Schatten für Werte, Beschreibungen und Symbole können definiert werden
- Radius der Kreise ändern
- Ändern Sie die Breite, Höhe und Eckenrundung des Rechtecks.
- Definieren Sie Ihre eigene Farbe und Deckkraft für die Schatten (RGBA-Unterstützung).
- Schriftarten für Werte und Texte ändern (eigene Schriftarten können importiert werden)
- Texte, Werte, Symbole, Prozentangaben und Akkuanzeige neu ausrichten (höher oder niedriger).
- Ändern Sie die Schriftgröße für Beschriftungen, Werte und Prozentzeichen.
- Transparenz für Symbol, Linie, Text, Wert, Prozentwert und Restakkuanzeige möglich
- Weisen Sie dem Autosymbol eine Farbe zu, wenn es geladen wird.
- Einige Werte können unterschiedliche Farben haben, wenn ihr Wert unter einem Schwellenwert liegt (Verbrauch, Produktion, Netz und Batterie).
- Das Akkusymbol kann während des Lade- oder Entladevorgangs animiert werden.
- Anzahl der Animationspunkte, deren Abstand zueinander, Länge, Dauer, Stil und Breite auswählbar
- Mithilfe der automatischen Animationsgeschwindigkeit lässt sich der höchste Verbrauch innerhalb der benutzerdefinierten Elemente 1 bis 11 leicht ermitteln.
- Zeigt die verbleibende Ladezeit Ihres Akkus an (abhängig von Prozentzahl und Kapazität).
- Schlankes Design möglich – verringert den Abstand zum Batterieelement

**Technisch:**

- Definieren Sie Datenpunkte für jedes Element (fügen Sie einen zweiten Datenpunkt für Produktion, zusätzliche Produktion, Verbrauch und Raster als Anzeige hinzu, z. B. für eine tägliche Zusammenfassung).
- Es können 3 Solarerzeugungselemente konfiguriert werden (wenn 3 konfiguriert sind, wird Slim-Design deaktiviert).
- auch für Inselsysteme (Leitung von der Produktion zum Netz kann deaktiviert werden)
- Anzeige des Batteriestands im Fahrzeug oder am Batterieelement
- Unterschiedliche Zustände werden für die Einspeisung in das bzw. den Verbrauch aus dem Stromnetz verwendet.
- Umkehren Sie die Einstellungen, wenn Ihre Werte negativ sind (für Verbrauch, Einspeisung ins Netz, Laden/Entladen der Batterie).
- Verwenden Sie positive oder negative Werte für den Verbrauch.
- Berechnen Sie Ihren Verbrauch über Eigenproduktion und Netzeinspeisung, falls Sie keinen Stromzähler besitzen.
- Nutzen Sie verschiedene Zustände für Ihren Akku
- Fügen Sie 10 eigene Elemente für ein Verbrauchergerät mit unterschiedlichem Text, Werten und Symbol hinzu (2 Elemente können als zusätzliche Autoladestation konfiguriert werden, 2 Elemente fungieren als Balkon-Stromversorgung).
- Alle Werte von W in kW umrechnen
- Alle Werte können in W oder kW angegeben werden. Der Adapter wandelt die Werte entsprechend um.
- Wählen Sie die Anzahl der anzuzeigenden Dezimalstellen (0, 1, 2) – für Werte und Akkuladestand.
- Einheit auswählen (Freitext)
- Den Verbrauch des Autos und der Zusatzausstattung vom Verbrauch im Haushalt abziehen (auswählbar).
- Alle Objekte können über den Objektbrowser ausgewählt werden.
- Definiere einen Schwellenwert, um nur Werte oberhalb dieses Wertes anzuzeigen.

## Durchführung

Die Anzeige erfolgt über den Instanzlink. Dieser kann dann auch in ein iFrame oder ein HTML-Widget eingebunden werden.

## Benutzerdefinierte Elemente

![Beschreibung](../../../../../en/adapterref/iobroker.energiefluss/docs/en/docs/custom_elements.png)

## Symbole

Bitte schauen Sie im Wiki nach.