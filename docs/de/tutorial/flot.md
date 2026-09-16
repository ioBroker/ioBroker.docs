---
title:       "Diagramme"
lastChanged: "08.09.2026"
---

# Diagramme

Aufgezeichnete Werte werden erst als Verlauf nützlich. Diese Seite zeigt den Weg
vom mitgeschriebenen Datenpunkt zum Diagramm auf einer Seite.

?> Vorher müssen Werte aufgezeichnet werden. Ohne Aufzeichnung bleibt jedes
Diagramm leer, siehe
[Werte aufzeichnen](/docs/tutorial/history.md).

## Welcher Adapter

| Adapter | Anmerkung |
| --- | --- |
| **echarts** | Der aktuelle Diagrammadapter. Für neue Diagramme die erste Wahl. |
| **flot** | Der ältere. In vielen bestehenden Installationen noch im Einsatz. |
| **grafana** | Kein ioBroker-Adapter, sondern ein eigenes Programm. Lohnt sich bei sehr vielen Diagrammen und Auswertungen. |

Für den Anfang: `echarts`. Er bringt einen eigenen Reiter in den Admin mit, in
dem Diagramme zusammengestellt werden.

## Ein Diagramm bauen

1. Den Adapter installieren und eine Instanz anlegen.
2. Den neuen Reiter öffnen und ein Diagramm anlegen.
3. Eine erste **Linie** hinzufügen und ihr den aufgezeichneten Datenpunkt
   zuweisen. Dabei wird auch angegeben, aus welcher Quelle die Daten kommen,
   also aus `history`, `influxdb` oder `sql`.
4. Zeitraum und Beschriftung einstellen und speichern.

Wenn die Linie leer bleibt, liegt es fast immer an einem von drei Punkten: der
Datenpunkt wird gar nicht aufgezeichnet, es ist die falsche Quelle ausgewählt,
oder der eingestellte Zeitraum liegt vor dem Beginn der Aufzeichnung.

## Sinnvolle Einstellungen

* **Zeitraum passend wählen.** Eine Temperatur über 24 Stunden ist lesbar, über
  ein Jahr nicht mehr.
* **Zusammenfassen.** Bei langen Zeiträumen nicht jeden Messwert zeichnen,
  sondern Mittelwerte je Stunde oder Tag. Das entlastet den Browser deutlich.
* **Einheit an die Achse.** Ein Diagramm ohne Einheit ist eine Kurve ohne
  Aussage.
* **Zwei Achsen bei verschiedenen Größen.** Temperatur und Luftfeuchte auf
  derselben Achse ergeben ein unlesbares Bild.

## Ins Bild einbauen

Ein fertiges Diagramm lässt sich in eine
[Visualisierung](/docs/tutorial/viz.md)
einbinden. Dafür gibt es in den gängigen Widgetsätzen ein Widget, das ein
gespeichertes Diagramm anzeigt. Sie geben dort nur noch an, welches.

!> Ein Diagramm mit sehr vielen Punkten lädt langsam, besonders auf einem
Tablet. Wenn eine Seite träge wird, ist meistens ein Diagramm die Ursache.

## Wie es weitergeht

Die Grundlagen stehen jetzt. Was regelmäßig wiederkommt, ist das Aktualisieren:
[Updates einspielen](/docs/tutorial/updates.md).
