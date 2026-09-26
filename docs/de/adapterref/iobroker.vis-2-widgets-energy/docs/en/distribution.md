---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md
title: Verteilung
hash: Yu59kz+ECYuTWWtl3MijtNH2M2Gmi7lVetrp3KY+aFs=
---
# Verteilung

![Energieverteilung](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/distribution.png)

Ein animiertes Flussdiagramm. Das Haus befindet sich in der Mitte, der Netzanschluss und bis zu zehn weitere Knotenpunkte (Photovoltaikanlage, Batteriespeicher, Wandbox, Wärmepumpe, Pool usw.) sind kreisförmig darum angeordnet. Ein Punkt bewegt sich entlang jeder Verbindungslinie; seine Richtung zeigt den Energiefluss an, seine Geschwindigkeit den Wert.

Der Ring um das Haus ist in Segmente unterteilt, eines pro Knotenpunkt, deren Größe sich nach dem Anteil dieses Knotenpunkts am Gesamtring richtet.

## Anforderungen

Nur Live-Werte, keine historischen Daten. Ein Datenpunkt pro Knoten, plus je einer für das Haus und das Stromnetz.

## Konfiguration

### Gemeinsam

| Feld                           | Bedeutung                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Ohne Rahmen                    | Ziehen Sie ohne die Karte                                                              |
| Name                           | Titel in der Kopfzeile der Karte                                                       |
| Standardfarbe                  | Farbe von Linien und Kreisen, die keine eigene Farbe haben                             |
| Standardkreisgröße             | In Prozent der Widget-Breite                                                           |
| Standarddistanzgröße           | Abstand zwischen dem Haus und den Knotenpunkten, in Prozent der Widget-Breite          |
| Standard-Schriftgröße          | In Pixeln. Ein Knoten mit eigener Schriftgröße ist diesem hier überlegen.              |
| Standardradiusgröße            | Radius, der von Kreisen ohne eigene Größe verwendet wird, in Prozent der Widget-Breite |
| Knoten zählen                  | Wie viele Knoten werden zusätzlich zum Raster gezeichnet?                              |
| Linienbreite                   | Dicke der Kreise und der Segmente des Hausrings in Pixeln                              |
| Keine Animation                | Stoppt die sich bewegenden Punkte. Nützlich bei schwachen Tablets.                     |
| Die Werte bleiben unverändert. | Deaktiviert die automatische Umrechnung, siehe [Einheiten](#units)                     |

### Heimatkreis

| Feld                                            | Bedeutung                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| Home OID                                        | Der Energieverbrauch des Hauses. Name und Farbe werden automatisch ausgefüllt. |
| Heimname                                        | Beschriftung unter dem mittleren Kreis                                         |
| Startseitenfarbe / Textfarbe                    | Farbe des Kreises und seines Etiketts                                          |
| Standard-Symbol / Benutzerdefiniertes Symbol    | Symbol im Kreis. Ein eigenes Bild ersetzt das Standardbild.                    |
| Größe des Startkreises / Abstand / Schriftgröße | Die Standardeinstellungen für diesen Kreis überschreiben                       |
| Symbolgröße                                     | In Prozent der Kreisgröße                                                      |
| Einheiten                                       | Lassen Sie das Feld leer, um die Einheit des Datenpunkts zu verwenden.         |
| Multiplikator / Runde                           | Skalierung und Dezimalzahlen                                                   |

### Stromleitungskreis

Alles rund ums Zuhause, plus:

| Feld                         | Bedeutung                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Stromleitung OID             | Die Energie wird aus dem Netz bezogen. Ein **negativer** Wert bedeutet, dass Energie in das Netz eingespeist wird.              |
| Rückleitung OID              | Separater Datenpunkt für die Einspeisung, falls der Zähler die beiden Richtungen separat meldet.                                |
| Energie zurückgeben Farbe    | Farbe des Eingangswertes innerhalb des Kreises                                                                                  |
| Ausblenden, wenn kleiner als | Unterhalb dieses Wertes wird der Kreis ausgeblendet. Bei einem leeren Wert ist er immer sichtbar. Im Editor bleibt er sichtbar. |
| Richtung umkehren            | Ändert die Richtung des sich bewegenden Punktes um                                                                              |
| Bewegungsgeschwindigkeit     | Je größer die Zahl, desto langsamer bewegt sich der Punkt bei gleichem Wert.                                                    |

### Knoten 1 … n

Die gleichen Felder wie die Stromleitung, plus:

| Feld          | Bedeutung                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- |
| OID 2         | Ein zweiter Wert innerhalb des Kreises, z. B. der Ladezustand einer Batterie in Prozent. |
| OID 2 Einheit | Lassen Sie das Feld leer, um die Einheit dieses Datenpunkts zu verwenden.                |

## Einheiten

Ein Datenpunkt, dessen Einheit `Wh` wird durch 1000 geteilt und angezeigt als `kWh` und ein Wert ohne Einheit wird `kWh` Dies ist ein historisches Verhalten, das beibehalten wird, damit sich bestehende Ansichten nicht ändern. Aktivieren Sie die Option **„Werte unverändert anzeigen“,** um den Wert und die Einheit des Datenpunkts exakt so zu erhalten, wie sie sind.

> Bis Version 2.0.1 wurde der Wert geteilt, die Einheit blieb jedoch gleich. `Wh` 1500 Wh wurden also als „1,5 Wh“ angezeigt. Die Einheit wurde nun zusammen mit dem Wert korrigiert.

## Richtung des Punktes

Standardmäßig fließt ein **positiver** Wert zum Haus hin und ein negativer Wert davon weg. Dies entspricht einem Netzzähler (positiv = Strom aus dem Netz bezogen) und einem PV-Wechselrichter (positiv = Strom erzeugt). Bei einem Datenpunkt, der die Zählrichtung umkehrt – beispielsweise eine Batterie, die eine Entladung als negativ meldet – aktivieren Sie die Option **„Richtung umkehren“** für diesen Knoten.

## Rezept: Stromnetz, PV-Anlage, Batterie und Wallbox

1. _Anzahl der Knoten_ = 3.
2. _Die OID der Stromleitung_ entspricht dem Netzzähler. _Die Rückleitungs-OID der Stromleitung_ darf nur dann gesetzt werden, wenn die Einspeisung über einen eigenen Datenpunkt verfügt.
3. Knoten 1: die PV-Produktion. Standard-Symbol „Solarstrom“.
4. Knoten 2: die Batterieleistung. _OID 2_ = der Ladezustand, _OID 2 Einheit_ =`%`. Schalten Sie _die Richtungsumkehr_ ein, wenn Ihr Wechselrichter einen negativen Ladezustand meldet.
5. Knoten 3: die Wandbox. _Ausblenden, wenn kleiner als_ =`50` Der Kreis verschwindet also, solange kein Auto geladen wird.

## Fehlerbehebung

- **Es bewegt sich nichts.** Der Punkt wird nur gezeichnet, solange der Wert ungleich 0 ist. Aktivieren Sie auch _„Keine Animation“_ .
- **Ein Kreis fehlt.** _Er wird ausgeblendet, wenn der Wert kleiner als_ der aktuelle Wert ist. Im Editor bleiben ausgeblendete Kreise sichtbar, sodass sie weiterhin konfiguriert werden können.
- **Alle Werte sind 1000-fach zu groß.** _Multiplikator_ einstellen auf `0.001`, oder schalten Sie _„Werte unverändert anzeigen“_ aus, wenn der Datenpunkt tatsächlich in Wh liegt.
- **Die Beschriftung eines Knotens wird abgeschnitten.** Verringern Sie _die Standard-Schriftgröße_ oder geben Sie dem Knoten mit _der Abstandsgröße_ mehr Platz.