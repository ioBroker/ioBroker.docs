---
chapters: {"pages":{"en/adapterref/iobroker.sungrow-local/README.md":{"title":{"en":"ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/README.md"},"en/adapterref/iobroker.sungrow-local/README_de.md":{"title":{"en":"ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.sungrow-local/README_de.md"},"en/adapterref/iobroker.sungrow-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sungrow-local/vis-templates/README.md
title: vis-Vorlagen für ioBroker.sungrow-local
hash: rNLz4DaUAfiPeHpNc5wQyog/r7Sc4mYTEw9KJ3mjElY=
---
# vis-Vorlagen für ioBroker.sungrow-local

Vorgefertigte Ansichten für **Vis 1** (`iobroker.vis` 1.x). Sie verwenden nur Datenpunkte von `sungrow-local.0` Sie funktionieren daher mit jeder Installation dieses Adapters: Es werden keine Skripte oder weitere Adapter benötigt. Dunkles Design, 1280 × 800 px. Beschriftungen sind auf Deutsch.

| Datei                           | Inhalt                                                                                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `view_Sungrow_Fluss.json`       | Startseite: Animierter Energiefluss (Photovoltaikanlage oben, Netz links, Batterie rechts, Haus unten, Wechselrichter in der Mitte). Die Linien bewegen sich in Flussrichtung, die Linienbreite entspricht der Leistung. |
| `view_Sungrow_Akku.json`        | Batterie: Ladezustand, Leistung, Spannung/Stromstärke, SoH, Temperatur, Zyklen, heutige Energie, Grenzwerte (nur Anzeige)                                                                                                |
| `view_Sungrow_WR.json`          | Wechselrichter & Netz: MPPT-Strings, Phasen (Spannung, Strom, Zähler, Backup), Frequenz, Leistungsfaktor                                                                                                                 |
| `view_Sungrow_Diagnose.json`    | Adapterdiagnose: Verbindungsaufbau, Wiederverbindungen, Rundenzeit/Antwortzeit/Timeouts/Fehler/Übersprungene Verbindungen pro Gruppe, Schreibstatistiken, letzte Fehler                                                  |
| `widget_Akku-Symbol_blau.json`  | Batteriesymbol als einzelnes Widget, blau (wie in den Ansichten verwendet)                                                                                                                                               |
| `widget_Akku-Symbol_gruen.json` | Batteriesymbol als einzelnes Widget, schwarzer Rahmen / grüne Füllung für helle Hintergründe                                                                                                                             |

## Import

1. Öffnen Sie den Vis-Editor (`http://<iobroker>:8082/vis/edit.html`).
2. Für jede Ansicht: Klicken Sie im Editor-Tab **„Ansichten“** auf **„Ansicht importieren** “ und fügen Sie den Inhalt ein. `view_<Name>.json` und geben Sie den Namen **genau** so ein, wie er im Dateinamen steht (`Sungrow_Fluss`, `Sungrow_Akku`, `Sungrow_WR`, `Sungrow_Diagnose` Die Navigationsschaltflächen verlinken zu diesen Namen (`#Sungrow_Akku` …).
3. Nur Batteriesymbol: Öffnen Sie eine beliebige Ansicht, klicken Sie im Tab **„Widgets“** auf **„Widgets importieren** “ und fügen Sie den Inhalt ein. `widget_Akku-Symbol_<colour>.json` Die
4. Speichern. Öffnen. `…/vis/index.html#Sungrow_Fluss` Die

Andere Instanz? Ersetzen `sungrow-local.0.` z.B. `sungrow-local.1.` in den Dateien vor dem Import.

## Berechnete Werte

Alle Berechnungen erfolgen mit Vis-Bindungen (`{a:id;b:id;formula}`) innerhalb der HTML-Widgets.

- **Batteriebetrieb mit Richtungsangabe:** Registrierungsnummer 43022 `Battery_power` Es gibt kein Schild. Die Richtungsangabe stammt vom Schild 43021. `Battery_current` ( **positiv = Entladung, negativ = Ladung** – an der Referenzanlage verifiziert: positiver Strom, sinkender Ladezustand; korrigiert in Version 0.4.0, frühere Vorlagen zeigten die umgekehrte Richtung an). Batterie (+ Entladung) =`43021 > 0 ? +43022 : (43021 < 0 ? −43022 : 0)` Die Batterieansicht zeigt den Strom mit umgekehrtem Vorzeichen (+ = Laden), um der Legende zu entsprechen.
- **Haushaltsverbrauch** =`max(0, 43034 Total_active_power_output + 35601 power_total-EnergyMeter)` (Wechselstromausgang des Wechselrichters + Netz; 35601: positiv = Import, negativ = Export). Er enthält keine Wechselrichterverluste und ist unabhängig vom Vorzeichen der Batterie. Ein Generator, den der Wechselrichter nicht misst (z. B. eine kleine Windkraftanlage), führt zu einer zu geringen Größe; der Balken für die Leistungsverteilung („Versorgung von“) berücksichtigt weiterhin PV + Batterie + Netz. 43008 `Load_power` wird nicht verwendet, da es auf mehreren Geräten den Wert 0 anzeigt.
- **Akkustatus:** |Akkuleistung| < 20 W → Leerlauf (keine Animation), ansonsten Laden/Entladen. Der Leuchtstreifen im Akku bewegt sich beim Laden nach oben (3,5 s) und beim Entladen nach unten/links (5 s). `prefers-reduced-motion` wird respektiert.
- **Verbleibende** Entladezeit = gespeicherte Energie ÷ Entladeleistung; **Vollladung** = (Kapazität − gespeicherte Energie) ÷ Ladeleistung. Gespeicherte Energie = 43023 SoC × 43039 Kapazität / 100.
- **Netzlinien:** Orange = Import (Stromfluss zum Wechselrichter), Grün = Export. Linien unter 10 W (Batterie: 20 W) sind grau und nicht animiert.

## Anmerkungen

- Animationen sind CSS-Keyframes innerhalb eines HTML-Widgets. vis 1 behandelt jedes `{…}` in einer Zeile als Bindung. Im CSS, `{` Und `}` Sie befinden sich daher nie in derselben Zeile. Behalten Sie dies bei, wenn Sie das CSS bearbeiten.
- Die Effizienzanzeige auf der Batterieseite verwendet die BMS-Zähler 40746/40748 (`inputRegisters.2` Ohne BMS-Block wird "–" angezeigt.
- Die Ansichten zeigen lediglich Werte an. Sie enthalten keine Steuerelemente, die Daten an den Wechselrichter senden.