---
chapters: {"pages":{"en/adapterref/iobroker.energiefluss-erweitert/README.md":{"title":{"en":"ioBroker.energiefluss-erweitert"},"content":"en/adapterref/iobroker.energiefluss-erweitert/README.md"},"en/adapterref/iobroker.energiefluss-erweitert/docs/en/README.md":{"title":{"en":"⚡ Energy Flow Workspace – Feature Overview"},"content":"en/adapterref/iobroker.energiefluss-erweitert/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energiefluss-erweitert/docs/en/README.md
title: ⚡ Energy Flow Workspace - Funktionsübersicht
hash: jSiMkfxKxZXNi8/eMFS2KtRgQhspLeKQQaLozIginDU=
---
# ⚡ Energy Flow Workspace – Funktionsübersicht

## 🌐 Allgemein

- [x] Konfiguration über Weboberfläche anstelle von ioBroker
- [x] Frei einstellbare Arbeitsflächenbreite und -höhe
- [x] Für jedes Element können Standardwerte festgelegt werden, sodass diese nicht jedes Mal einzeln geändert werden müssen.
- [x] Alle Datenpunktanzeigen können individuell konfiguriert werden:
  - Die Quelle kann W oder kW sein.
  - Die Umrechnung von W in kW ist möglich
  - Die Einheit wird pro Element ausgewählt.
  - Jede Datenquelle kann ihren eigenen Schwellenwert haben.
  - Die Anzahl der Dezimalstellen ist wählbar (0, 1, 2).
- [x] Benutzer können über den Objektbrowser eine unbegrenzte Anzahl von Datenpunkten hinzufügen, die im Adapter verwendet werden sollen.
- [x] Benutzerdefinierte CSS-Stile können für den gesamten Arbeitsbereich integriert werden.
- [x] Erinnerungsbenachrichtigung beim Verlassen der Seite mit ungespeicherten Änderungen
- [x] Der aktuelle Status wird während der Elementkonfiguration gespeichert, sodass er in seinen ursprünglichen Zustand zurückversetzt werden kann.
- [x] Alle Seiten sind responsiv und laufen auf PCs, Tablets und Smartphones, inklusive Konfigurationsunterstützung.
- [x] Der Adapter nutzt schnellere ioBroker-WebSockets und reagiert dadurch etwa 10-mal schneller bei gleichzeitig 10-mal geringerer Ressourceneffizienz im Browser.
- [x] Verschiedene Grundeinstellungen können definiert werden, um Farben, Größen und Formen voreinzustellen.

---

## 📑 Ansichten / Tabs

- [x] Die Erstellung von Ansichten/Registerkarten ist möglich
- [x] Registerkarten können Symbole und Text enthalten.
- [x] Ansichten/Registerkarten können flexibel ein- oder ausgeblendet werden.

---

## 🧩 Elemente

- [x] Auf der Arbeitsfläche können **unbegrenzt viele** Elemente platziert werden (Texte, Datenpunkte, Rechtecke, Kreise, Symbole usw.).
- [x] Größe, Position, Farbe, Schatten und Transparenz sind anpassbar
- [x] Positionierung per Maus, Tastatur oder Koordinateneingabe
- [x] Durch Ausrichten der Elemente mit der Maus lassen sich mehrere Elemente zusammen verschieben.
- [x] Elemente relativ zueinander ausrichten (zentriert, rechts, links, oberer Rand, unterer Rand, vertikale Mitte)
- [x] Rechtecken oder Kreisen kann ein Datenpunkt zugewiesen werden, und sie erhalten eine Füllfarbe basierend auf dem Wert (Prozentwert oder Absolutwert):
  - **Prozentualer Anteil:** Das Element wird proportional zum Datenpunkt gefüllt.
  - **Maximalwert:** Das Element wird proportional zu einem Maximalwert gefüllt. Beispiel: Maximalwert 4000, Datenpunktwert 3000 → 3000 / 4000 × 100 = 75 %
- [x] Web-URLs können verlinkt werden, um durch Klicken/Tippen Aktionen auszulösen.
  - Zu den Anzeigeoptionen gehören Overlay, neue Seite (Registerkarte) oder dieselbe Seite.
- [x] Elemente können dupliziert werden
- [x] CSS-Klassen können verschiedenen Datenpunktzuständen zugewiesen werden: Aktiv positiv, Aktiv negativ, Inaktiv positiv und Inaktiv negativ

---

## 📝 SMS

- [x] Der Zeitpunkt der letzten Aktualisierung des Datenpunkts kann angezeigt werden (relativ zur Gegenwart, deutscher Zeitstempel, US-amerikanischer Zeitstempel).
- [x] Verfügbare Textausrichtungsoptionen (rechts, zentriert, links)
- [x] Datenpunkte, die sowohl positive als auch negative Werte liefern, können auch dann als positiv angezeigt werden, wenn sie negativ sind.

---

## 🎨 Symbole

- [x] Icons von [Iconify](https://iconify.design/) können direkt in den Energy Flow Workspace integriert werden.
- [x] Größe, Position, Farbe, Schatten und Transparenz sind anpassbar
- [x] Datenpunkt zuweisen

---

## ✨ Animation

- [x] Anpassbar (Partikelfarbe, Linienfarbe)
- [x] Positiver oder negativer Datenpunktwert
- [x] Schwellenwertunterstützung
- [x] Geschwindigkeit oder Partikelanzahl können je nach Belastung angepasst werden.
- [x] Bidirektionale Linien möglich (die Animationsrichtung wird beim Wechsel von positiv zu negativ umgekehrt)

---

## 🔗 Verbindungen

- [x] Elemente (Kreise oder Rechtecke) können beliebig miteinander verbunden werden. Unterstützt **Elementmodus** und **Verbindungspunktmodus** .
  - **Element:** Die Linie dockt automatisch am nächstgelegenen geeigneten Einstiegspunkt an und bewegt sich dynamisch, wenn das Element neu positioniert wird.
  - **Anschlusspunkt:** Die Linie ist einem von 12 verfügbaren festen Eingangspunkten zugeordnet und behält diese Zuordnung auch dann bei, wenn sich das Element bewegt.
- [x] Jede Leitung kann wiederhergestellt werden, selbst wenn bereits Einstellungen darauf angewendet wurden.

---

## 🧮 Berechnungen

- [x] Die Laufzeitberechnung des Akkus (Laden und Entladen) kann über die Quelle erfolgen.