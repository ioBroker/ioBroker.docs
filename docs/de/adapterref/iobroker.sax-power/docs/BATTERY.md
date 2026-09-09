---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/BATTERY.md
title: Batteriemodelle, entsprechende Ladezyklen und Zustand
hash: cQsI5jScikTj7MGlnVakmovfHYWwapw1deYEFcyDR4E=
---
# Batteriemodelle, entsprechende Ladezyklen und Zustand

## Geltungsbereich und Terminologie

Alle aktuell unterstützten SAX Power-Systeme sind netzgekoppelte Batteriespeichersysteme. Der Adapter behandelt daher die von der SAX Power-Energiediagramm-API zurückgegebenen Energiewerte als netzseitige Werte.

Der Adapter trennt absichtlich:

- der von SAX Power gemeldete Zykluszähler (`data_cycle` )
- Äquivalente vollständige Zyklen, transparent aus der Cloud-Historie berechnet.
- ein explizit geschätzter Batteriezustandswert, der vom Adapter berechnet wird

Diese Werte sind nicht austauschbar.

## Unterstützte Modelle und Kapazitäten

| Konfigurations-ID | Modell                      | Nennkapazität | Nutzbare Kapazität |
| ----------------- | --------------------------- | ------------: | -----------------: |
| `home-5.8`        | SAX Power Home 5,8 kWh      |      5,76 kWh |           5,20 kWh |
| `home-plus-7.7`   | SAX Power Home Plus 7,7 kWh |      7,68 kWh |           7,00 kWh |

Die Nennkapazität wird für die Zyklusberechnung verwendet, da der Vergleich mit dem von SAX gemeldeten Zähler darauf hindeutet, dass SAX ebenfalls die Nennkapazität verwendet. Die nutzbare Kapazität dient als Referenzkapazität für die Zustandsbewertung und steht für spätere Energiemanagementfunktionen zur Verfügung.

Die Dashboard-API liefert derzeit keine zuverlässige Modellkennung. Der Adapter erkennt die mit dem SAX Power-Konto verknüpften Speichersysteme automatisch und verwendet deren Seriennummern ausschließlich als interne, stabile Kennungen. Benutzer können in der Verwaltungsoberfläche keine Geräte hinzufügen oder umbenennen; sie können lediglich jedem erkannten Speichersystem ein Modell zuweisen. Ohne eine solche Zuweisung stellt der Adapter die kapazitätsabhängigen berechneten Werte nicht zur Verfügung, sondern schätzt sie.

Die Statusseite zeigt den gemeldeten Zählerstand, die berechneten Tages-/Monats-/Jahres-/Gesamtwerte sowie die Verfügbarkeit jedes erkannten Speichersystems an. Bei mehreren Systemen werden zusätzlich die kapazitätsgewichteten kombinierten Zykluswerte angezeigt. Der Wochenwert ist weiterhin als ioBroker-Objekt verfügbar, wird aber in der kompakten Verwaltungsübersicht bewusst nicht dargestellt.

## Gemeldete Zykluszahl

Das Live-Datenfeld`data_cycle` wird wie folgt dargestellt:

```text
devices.<serialNumber>.battery.cycles.reported
```

Es handelt sich um den unveränderten Zählerstand, der von SAX Power gemeldet wird. Dieser kann gerundet sein und internen Regeln folgen, die nicht öffentlich dokumentiert sind.

## Berechnete äquivalente Vollzyklen

Für jedes Gerät und jeden Zeitraum berechnet der Adapter:

\[ EFC = \frac{E\_{charge} + E\_{discharge}}{2 \times C\_{nominal}} ]

Wo:

- (E\_{charge}) ist die geladene Wechselstromenergie in kWh für den Zeitraum
- (E\_{Entladung}) ist die abgegebene Wechselstromenergie in kWh für den Zeitraum
- (C\_{nominal}) ist die konfigurierte nominale Batteriekapazität in kWh.

Das Ergebnis wird auf drei Dezimalstellen gerundet. Perioden sind`day` ,`week` ,`month` ,`year` , Und`total` Die

Beispiel für ein Home 5.8-System:

```text
(2711.74 kWh + 2433.62 kWh) / (2 × 5.76 kWh) = 446.646 cycles
```

Der berechnete Gesamtwert beschreibt lediglich die von der SAX Power Cloud bereitgestellten historischen Daten. Er kann geringfügig abweichen.`cycles.reported` aufgrund von Rundungen, fehlender Historie, Wechselstromwandlungsverlusten oder internen SAX-Regeln.

## Mehrere Speichersysteme

Die Zykluswerte werden niemals addiert. Der Gesamtanlagenwert wird aus dem kombinierten Durchsatz und der kombinierten Nennkapazität berechnet:

\[ EFC\_{system} = \frac{\sum\_i (E\_{charge,i} + E\_{discharge,i})} {2 \times \sum\_i C\_{nominal,i}} ]

Dies ist ein kapazitätsgewichteter, äquivalenter Vollzykluswert für das gesamte installierte Speichersystem. Alle erkannten Geräte müssen ein konfiguriertes Modell aufweisen; andernfalls ist das kombinierte, kapazitätsabhängige Ergebnis nicht verfügbar.

## Batteriezustand

Der untersuchte SAX Power Dashboard-Datenverkehr enthält keinen direkten Statuswert. Der Adapter leitet daher einen explizit geschätzten Wert aus qualifizierten Live-Entladeläufen ab. Solange nicht genügend Läufe vorliegen, schreibt er`null` und legt den Fortschritt der Sammlung offen durch`validRuns` ,`requiredRuns` ,`rejectedRuns` und die`activeRun*` Staaten.

Der Wert wird als **geschätzter Batteriezustand (SoH)** bezeichnet, nicht als BMS-SoH. Jeder qualifizierte Testlauf verwendet:

\[ Health\_{estimated} = \frac{E\_{discharged,observed}}{C\_{usable,reference} \times \frac{SOC\_{start} - SOC\_{end}}{100}} \times 100% ]

Die gemessene Entladungsenergie ergibt sich aus der von der SAX-Cloud gemeldeten absoluten Batterieleistung und der zwischen aufeinanderfolgenden Messungen verstrichenen Zeit:

\[ E\_{discharged,observed} = \sum\_i \frac{|P\_i| \times \Delta t\_i}{3{,}600{,}000} ]

Die Leistung wird in Watt, die verstrichene Zeit in Millisekunden und das Ergebnis in kWh angegeben. Die Referenzenergie entspricht der nutzbaren Kapazität des konfigurierten Modells multipliziert mit der beobachteten SOC-Spanne.

Die erste Messung startet einen Messlauf, trägt aber keine Energie bei, da kein vorhergehendes Intervall existiert. Jede nachfolgende Messung ordnet ihre gemeldete absolute Leistung dem seit der vorherigen Messung verstrichenen Intervall zu (rechteckige Integration). Folglich hängt die Genauigkeit vom Messintervall der Wolke und von der Genauigkeit der gemeldeten SOC- und Leistungswerte ab.

Ein Messlauf wird immer dann ausgewertet, wenn sich die Richtung ändert, die nutzbare Abtastung aufhört oder die Batterieleistung unter 100 W fällt. Er ist nur gültig, wenn alle folgenden Bedingungen erfüllt sind:

- Die Laufrichtung ist Entladung;
- Die SOC-Spanne vom Anfang bis zum Ende beträgt mindestens 40 Prozentpunkte;
- Jedes integrierte Intervall ist positiv und nicht länger als 15 Minuten;
- Der SOC-Wert bleibt im Bereich von 0–100%;
- Der SOC-Wert steigt zwischen aufeinanderfolgenden Proben während der Entleerung um nicht mehr als zwei Prozentpunkte an;
- Die integrierte Energie ist größer als null;
- Die daraus resultierende Schätzung ist endlich und liegt zwischen 50 % und 120 %.

Ladevorgänge werden zwar hinsichtlich ihres Fortschritts verfolgt, jedoch aufgrund von Wechselstrom-Ladeverlusten, die das Ergebnis verfälschen würden, für die Kapazitätsschätzung verworfen. Kurze, unterbrochene, umgekehrte, unplausible und Ladevorgänge werden inkrementiert.`rejectedRuns` bei der Bewertung.

Nach fünf gültigen Entladeläufen veröffentlicht der Adapter den Median der letzten fünf Schätzwerte. Der Median macht das Ergebnis weniger anfällig für einzelne, ungewöhnlich hohe oder niedrige Messwerte. Einzelne akzeptierte Schätzwerte werden intern mit zwei Dezimalstellen gespeichert; der veröffentlichte Median wird auf eine Dezimalstelle gerundet und auf den Bereich von 0–110 % begrenzt. Ein Messwert außerhalb dieses Bereichs wird vor der Medianberechnung verworfen. Bis zu 20 der letzten akzeptierten Schätzwerte werden gespeichert, sodass spätere gültige Läufe das veröffentlichte Fünf-Lauf-Fenster kontinuierlich aktualisieren.

Der vollständige Tracker-Checkpoint wird gespeichert in`devices.<serial>.battery.health.progress` Dies umfasst Zähler, akzeptierte Schätzungen, Erfassungs- und Auswertungszeitstempel sowie alle aktiven Läufe. Die Datenerfassung wird daher auch nach einem Neustart des Adapters fortgesetzt. Der Status ist intern (`role: json` ) und sollten nicht manuell bearbeitet werden.

Semantik des Gesundheitszustands:

- `collectingData` Es wurde noch kein Lauf ausgewertet;
- `insufficientData` Es existiert mindestens ein gültiger oder abgelehnter Lauf, aber es stehen weniger als fünf gültige Läufe zur Verfügung;
- `available` Es liegen fünf gültige Läufe vor und eine Schätzung wird veröffentlicht.

Für mehrere Speichersysteme`summary.battery.health.value` Diese Information ist nur verfügbar, wenn für jedes konfigurierte Gerät ein Schätzwert vorliegt. Es handelt sich um das arithmetische Mittel der einzelnen Geräteschätzungen, gerundet auf eine Dezimalstelle. Bis dahin lautet der zusammenfassende Status:`collectingData` ;`insufficientData` Die Daten werden pro Gerät angezeigt. Die zusammenfassenden Laufzähler sind Summen über alle Geräte hinweg; die Details der aktiven Läufe bleiben gerätespezifisch.

## Datenquellen und Einschränkungen

- Live-Zähler: SAX Power Dashboard-Live-Datenantwort, Feld`data_cycle`
- Periodenenergie: SAX Power Energiediagramm-Historie, Felder dokumentiert in [FIELD\_REFERENCE.md](/#/docs/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md)
- Modellkapazitäten: explizite Adaptermodelltabelle und Zuordnung pro Seriennummer
- Berechnete Zyklen: lokale deterministische Berechnung; werden nicht an SAX Power zurückgeschrieben.
- Gesundheit: Lokale Schätzung auf der Klimaanlagenseite nach fünf qualifizierten Entladeläufen; niemals ein SAX/BMS-SoH-Wert

Die Schätzung ist keine Laborleistungsmessung. Insbesondere Wechselstrom-Umwandlungsverluste, Eigenverbrauch, SOC-Quantifizierung, Wolken-Abtastrate, Temperatur und Betriebsbedingungen können sie beeinflussen. Sie dient als transparenter Langzeitindikator und nicht als Nachweis für Gewährleistungsansprüche.

Die API des SAX Power Dashboards ist nicht dokumentiert und kann sich ändern. Der Adapter speichert die Rohdaten der Geräteantwort während der Diagnose, um zukünftige Überprüfungen zu ermöglichen.