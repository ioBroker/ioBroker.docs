---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sourceanalytix/README.md
title: SourceAnalytix
hash: Mu0+aTQgi2hAhsss5FPBmyGvMLr0K5q3MpcnqyMt9GA=
---
# SourceAnalytix

![NPM-Version](https://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/sourceanalytix-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/sourceanalytix-stable.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.sourceanalytix/actions/workflows/test-and-release.yml/badge.svg)

SourceAnalytix wandelt kumulierte Zählerstände oder regelmäßig aktualisierte Stromwerte in Statistiken zu Verbrauch, Lieferung, Kosten und Erträgen um. Es unterstützt Festpreise, geplante Preisänderungen, dynamische Tarife aus ioBroker-Bundesstaaten und vom Anbieter gesteuerte Tarife.

Der Adapter benötigt **Admin 7.6.20 oder neuer** , **js-controller 6.0.11 oder neuer** und **Node.js 22 oder neuer** .

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?

Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird die Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der ioBroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird Ihre Installations-ID mit übermittelt. Diese anonyme Kennung enthält keine persönlichen Informationen wie Ihren Namen oder Ihre E-Mail-Adresse. Sie ermöglicht die Gruppierung von Fehlern und zeigt an, wie viele Installationen betroffen sind.

## Merkmale

- Aktuelle Tages-, Wochen-, Monats-, Quartals- und Jahressummen
- Optionale Werte der Vorperiode und Einnahmen des laufenden Jahres (Wochentage, Wochen, Monate und Quartale)
- Optionale archivierte Wochen-, Monats- und Quartalsstatistiken unterhalb jedes Kalenderjahres
- Verbrauchs- und Lieferberechnungen
- Kosten- und Ertragsberechnungen mit einem optionalen monatlichen Grundpreis
- Feste, planmäßige, staatlich bereitgestellte und vom Wahlschalter kontrollierte Stückpreise
- Preisverlauf mit Zeitstempel, der bereits berechnete Kosten beibehält
- Automatische Umrechnung zwischen kompatiblen Energie-, Volumen-, Massen- und metrischen Längeneinheiten
- Integration der Leistungsmesswerte über ihre tatsächlichen Aktualisierungsintervalle, optional unter Ignorieren negativer Messwerte
- Wiederherstellung verpasster Kalenderübergänge nach einem Neustart, auf Anfrage oder durch stündliche Überprüfung
- Bearbeitung von Zählerrückstellungen, Zähleraustauschen und kleinen Rückwärtsschwankungen
- Ein kompakter, automatisch aktualisierter JSON-Statistikstatus pro aktiver Quelle

## Aufstellen

### 1. Konfigurieren Sie die Adapterinstanz

Über die Registerkarte **„Allgemeine Einstellungen“** wird gesteuert, welche detaillierten Statistiken erstellt werden. Durch Deaktivieren einer Option werden die entsprechenden optionalen Statuswerte entfernt, während die normalen Summen des aktuellen Zeitraums und die vorhandenen archivierten Jahre erhalten bleiben.

![Allgemeine Einstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

| Einstellung                                 | Ergebnis                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Jahresstatistik: Wochen / Monate / Quartale | Die unten aufgeführten Werte der Geschäfte wurden bereits vervollständigt.`<source>.<year>` zum historischen Vergleich.   |
| Aktuelles Jahr: Wochentag                   | Speichert die Werte der aktuellen Woche nach Wochentagen.                                                                 |
| Aktuelles Jahr: Wochen / Monate / Quartale  | Speichert unten Werte für jede Periode`<source>.currentYear` Die                                                          |
| Aktuelles Jahr: Vorherige Periode           | Speichert den abgeschlossenen Tag, die Woche, den Monat, das Quartal und das Jahr sowie die Wochentagswerte der Vorwoche. |
| Runden: Dezimalzahlen für Verbrauchswerte   | Dezimalzahlen für berechnete Größen und Zählerstände,`3` standardmäßig.                                                   |
| Runden: Dezimalzahlen für Kostenwerte       | Dezimalzahlen für berechnete Kosten und Erträge,`2` standardmäßig.                                                        |

Beide Rundungseinstellungen akzeptieren`-1` Um den exakten berechneten Wert ohne Rundung zu speichern, kann eine einzelne Datenquelle davon abweichen: Ihre Felder **„Dezimalstellen für Verbrauchswerte“** und **„Dezimalstellen für Kostenwerte“** überschreiben die globale Einstellung und verwenden diese, wenn sie leer sind. Die Rundung betrifft nur die in Zustände geschriebenen Werte; interne Berechnungen, die kumulativen Messwerte und die persistenten Speicher behalten stets die volle Genauigkeit, sodass im Laufe der Zeit kein Genauigkeitsverlust auftritt.

SourceAnalytix speichert die zuletzt erfolgreich verarbeiteten Kalenderperioden. Falls der Adapter oder ioBroker um Mitternacht nicht ausgeführt wird, werden verpasste Änderungen für Tag, Woche, Monat, Quartal und Jahr beim nächsten Start einmalig verarbeitet.

Ein Rollover kann auch ohne Neustart der Instanz ausgelöst werden, was nützlich ist, wenn festgestellt wird, dass die Instanz kurz nach Mitternacht nicht mehr verfügbar ist:

- Satz`sourceanalytix.<instance>.info.recoverPeriods` Zu`true` Der Knopf setzt sich nach Beendigung des Laufs automatisch zurück.
- Oder senden Sie eine Nachricht über ein Skript:`sendTo('sourceanalytix.<instance>', 'recoverPeriods', {}, result => log(result.recovered))` Die Antwort enthält die Anzahl der Quellen, deren Rollover verarbeitet wurde.

Eine stündliche Überprüfung führt die gleiche Wiederherstellung automatisch durch, sodass ein verpasster Rollover, während der Adapter nach einem Host-Suspend oder einer Systemzeitkorrektur weiterlief, automatisch korrigiert wird. Jede Route ist idempotent: Quellen, deren Perioden bereits aktuell sind, werden übersprungen.

### 2. Preisdefinitionen erstellen

Öffnen Sie **die Preisdefinitionen** und fügen Sie die Kategorien hinzu, die die Quellstaaten verwenden sollen.

![Preisdefinitionen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)

| Feld                       | Beschreibung                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Kategorie                  | Die eindeutige Kennung wird im Feld **„Preisdefinition auswählen“** des Quellstaates angezeigt.                 |
| Beschreibung               | Freitextbeschreibung des Tarifs.                                                                                |
| Kostenart                  | Wählt die`costs` /`consumed` oder`earnings` /`delivered` Ergebniskategorien.                                    |
| Einheit                    | Zieleinheit für den Verbrauch und Nenner des Stückpreises.                                                      |
| Preisquelle                | Festpreis, numerischer ioBroker-Status- oder Tarifwähler.                                                       |
| Preis pro Einheit          | Einzelpreis für einen Festtarif oder der inaktive/Basispreis für einen Selektor.                                |
| Preisstatus                | Vollständige Kennung des numerischen Preisstatus oder Tarifauswahlstatus.                                       |
| Aktiver Tarifpreis         | Der Preis gilt, solange ein Auswahlfeld aktiv ist.                                                              |
| Wert des aktiven Selektors | Optionaler exakter Wert, der den alternativen Tarif aktiviert.                                                  |
| Gültig ab                  | Optionales Datum, ab dem der Tarif einschließlich seines monatlichen Grundpreises gilt.                         |
| Preis pro Monat            | Monatlicher Grundpreis, gilt nur für Quellen, bei denen **die Option „Grundpreis einschließen“** aktiviert ist. |

#### Feste und planmäßige Preise

Wählen Sie **„Festpreis“** und geben Sie **den Preis pro Einheit** ein. Wenn Sie einen Tarif ändern, legen Sie **„Gültig** ab“ auf das Datum fest, an dem der neue Preis in Kraft tritt. Der vorherige Preis bleibt gespeichert und wird nicht rückwirkend angewendet.

#### Dynamischer Preiszustand

Wählen Sie **unter „Status“** den Status aus, der den aktuellen numerischen Stückpreis enthält. SourceAnalytix abonniert diesen Status und protokolliert jede Änderung mit dem zugehörigen Zeitstempel. Sowohl Zahlen als auch numerische Zeichenketten mit Punkt oder Komma als Dezimaltrennzeichen werden akzeptiert.

Der Statuswert muss die Systemwährung pro ausgewählter Zieleinheit darstellen, z. B. Währung/kWh, wenn die Preisdefinition verwendet wird.`kWh` Konvertieren Sie Werte wie Cent pro kWh im Quelladapter oder in einem Skript, bevor Sie sie verwenden.

#### Tarifauswahl

Wählen Sie **im Tarifauswahlmenü** den gewünschten Tag-/Nacht-, Relais-, Kontakt- oder andere Zweipreistarife aus:

- **Der Preis pro Einheit** ist der inaktive/Basispreis.
- **Der aktive Tarifpreis** wird verwendet, solange der Selektor aktiv ist.
- Ohne **aktiven Selektorwert** ,`true` Bei von Null verschiedenen Zahlen und häufig vorkommenden Wahrheitszeichenketten wird der alternative Tarif aktiviert.
- Bei **der Auswahl „Aktiv“** wird der alternative Tarif nur dann aktiviert, wenn die Zeichenkettendarstellung exakt übereinstimmt.

#### Beschreibbarer aktueller Preis

Jede Kategorie legt Folgendes offen`sourceanalytix.<instance>.priceDefinitions.<category>.currentPrice` Skripte und Visualisierungen können diesem Zustand einen numerischen Wert zuweisen, um sofort einen neuen Preis anzuwenden. Der Wert wird außerdem der mit einem Zeitstempel versehenen Preishistorie hinzugefügt.

#### Historische Preisberechnung

Preise sind zeitabhängig. Ein neuer Preis gilt erst ab dem Zeitpunkt seiner Änderung und ändert niemals bereits angefallene Kosten für früheren Konsum.

Bei einem kumulativen Zähler kennt SourceAnalytix die Verbrauchsdifferenz zwischen zwei Ablesungen. Wenn innerhalb dieses Zeitraums eine oder mehrere Preisänderungen stattgefunden haben, wird die Differenz proportional auf die verstrichenen Zeitabschnitte verteilt und jeder Anteil zum für diesen Abschnitt gültigen Preis abgerechnet. Eine Preisänderung genau zum Zeitpunkt der späteren Zählerablesung gilt für den folgenden Zeitraum.

Die genauen Kosten und die Preishistorie bleiben auch nach einem Neustart des Adapters erhalten. Eine explizite Neuberechnung alter historischer Daten ist derzeit nicht implementiert.

#### Monatlicher Grundpreis

Aktivieren Sie die **Option „Grundpreis für eine Quelle einbeziehen“** , um den konfigurierten Monatspreis hinzuzufügen. **„Gültig ab“** definiert auch den ersten Monat, in dem diese Gebühr erhoben wird. Der volle Grundpreis wird einmalig bei Inkrafttreten des Tarifs und anschließend zu Beginn jedes folgenden Kalendermonats gebucht. Preisänderungen im Laufe eines Monats werden erst ab der nächsten Monatsbuchung wirksam, während die Preise der Vormonate unverändert bleiben. Bestehende Tarife ohne Gültigkeitsdatum behalten ihr bisheriges Verhalten bei und beginnen mit Beginn des aktuellen Kalenderjahres.

Die Tages- und Wochensummen beinhalten die volle Monatsgebühr nur dann, wenn das Buchungsdatum in diesen Zeitraum fällt. Die Monats-, Quartals- und Jahressummen enthalten die vollen Gebühren, die in den jeweiligen Kalenderperioden gebucht wurden.

### 3. Aktivieren Sie einen Quellzustand

SourceAnalytix wird über die benutzerdefinierten ioBroker-Einstellungen jedes Quellzustands konfiguriert. Öffnen Sie **„Objekte“** , klicken Sie auf das Schraubenschlüssel-/Konfigurationssymbol des gewünschten Zustands und erweitern Sie die SourceAnalytix-Instanz.

![Symbol für benutzerdefinierte Einstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)

![Quellstatuseinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| Einstellung                                                | Beschreibung                                                                                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Ermöglicht                                                 | Aktiviert diese Quelle für die ausgewählte SourceAnalytix-Instanz.                                                                        |
| Alias                                                      | Optionaler Anzeigename für das generierte Gerät. Er ändert nicht die generierte Status-ID.                                                |
| Preisdefinition auswählen                                  | Obligatorische Kategorie gemäß den Preisdefinitionen des Adapters.                                                                        |
| Einheit auswählen                                          | Quelleinheit. Die automatische Erkennung sollte aktiviert bleiben, wenn das Quellobjekt über eine korrekte, unterstützte Einheit verfügt. |
| Kosten berechnen                                           | Erstellt und aktualisiert Kosten- oder Ertragszustände.                                                                                   |
| Einschließlich des Grundtarifs                             | Fügt den monatlichen Grundpreis der Preisdefinition hinzu.                                                                                |
| Verbrauch berechnen                                        | Erstellt und aktualisiert Verbrauchs- oder Lieferzustände.                                                                                |
| Durchschnittliche Leistungswerte zwischen Aktualisierungen | Optionaler Berechnungsmodus für Leistungszustände; siehe [Leistungszustände](#power-states) .                                             |
| Negative Potenzwerte ignorieren                            | Zählt negative Leistungsmesswerte als`0 W` ; siehe [Leistungszustände](#power-states) .                                                   |
| Zählerwerte speichern                                      | Speichert Zählerstände in den aktivierten Erfassungszeiträumen.                                                                           |
| Erkennung von Gerätewertrücksetzungen                      | Die kumulierte Gesamtsumme wird auch nach einem Zähler-Reset oder -Austausch fortgeführt.                                                 |
| Schwelle                                                   | Die größte Rückwärtsschwankung wird als Messjitter ignoriert und in der Zieleinheit ausgedrückt.                                          |

Die Quellstatus-ID wird in die generierte SourceAnalytix-Geräte-ID umgewandelt, indem Punkte durch doppelte Unterstriche ersetzt werden.

## Quellenwerte und Einheiten

### Kumulative Quellzustände

Verwenden Sie eine kumulative Summe, die normalerweise nur steigt, zum Beispiel Tasmota.`ENERGY_Total` oder dem Gesamtverbrauch eines intelligenten Zählers. Verwenden Sie keinen Wert wie beispielsweise`ENERGY_Today` Dieser Wert wird absichtlich täglich zurückgesetzt. Falls kein kumulativer Gesamtwert verfügbar ist, erstellen Sie einen solchen in einem vorgelagerten Adapter oder Skript.

Bei kumulativen Quellen wird der Verbrauch wie folgt berechnet:

```text
current cumulative reading - reading at the beginning of the period
```

Bei der ersten Aktivierung initialisiert SourceAnalytix leere oder Nullwerte für Tag, Woche, Monat, Quartal und Jahr mit dem aktuellen normalisierten Zählerstand. Dadurch wird verhindert, dass der bisherige Gesamtverbrauch als neuer Verbrauch angezeigt wird. Die Werte bleiben bearbeitbar und werden bei späteren Starts nicht überschrieben.

![Periodenstartwerte](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)

Geben Sie manuelle Startwerte in der durch die Preisdefinition ausgewählten **Zieleinheit** ein. Jeder Wert muss den Zählerstand zu Beginn des jeweiligen Zeitraums darstellen, nicht den Verbrauch während des Zeitraums.

### Machtzustände

Leistungswerte wie z.B.`W` oder`kW` Die Messwerte werden über die tatsächliche Zeit zwischen den Zustandsaktualisierungen integriert, um Energie zu erzeugen. Die erste Messung dient der Festlegung des Ausgangswerts und erzeugt keinen Verbrauch.

Standardmäßig wird der vorherige Leistungswert für das gesamte Intervall als gültig betrachtet. Aktivieren Sie die Option **„Durchschnittliche Leistungswerte zwischen Aktualisierungen“** für Sensoren, die regelmäßig Daten liefern und sich nur allmählich ändern. SourceAnalytix verwendet dann den Durchschnitt aus vorherigem und aktuellem Wert. Lassen Sie diese Option deaktiviert für Geräte, die abrupt umschalten, wenn die Aktualisierung das Umschaltereignis markiert.

Manche Wechselrichter melden im ausgeschalteten Zustand eine stark negative Leistung, die andernfalls als negative Energie integriert würde und den Gesamtertrag mindern würde. Aktivieren Sie die **Option „Negative Leistungswerte ignorieren“,** um solche Messwerte als negative Energie zu berücksichtigen.`0 W` Der Messwert wird gespeichert statt verworfen, sodass das Intervall weiterläuft; würde man ihn verwerfen, bliebe der letzte positive Wert als Basiswert erhalten und würde über die gesamte Ausfallzeit integriert.

### Unterstützte Einheiten

SourceAnalytix konvertiert Werte automatisch nur zwischen kompatiblen Größen:

| Menge               | Unterstützte Einheiten                  |
| ------------------- | --------------------------------------- |
| Leistung            | `GW` ,`MW` ,`kW` ,`W` ,`mW`             |
| Energie             | `GWh` ,`MWh` ,`kWh` ,`Wh` ,`mWh`        |
| Kubikvolumen        | `km³` ,`m³` ,`dm³` ,`cm³` ,`mm³`        |
| Flüssigkeitsvolumen | `hl` ,`l` ,`dl` ,`cl` ,`ml`             |
| Masse               | `t` ,`kg` ,`g`                          |
| Metrische Länge     | `km` ,`m` ,`dm` ,`cm` ,`mm` ,`µm` ,`nm` |

Liter und Kubikmeter lassen sich ineinander umrechnen. Inkompatible Umrechnungen, wie beispielsweise Kilogramm in kWh oder Meter in Liter, werden verworfen, um irreführende Ergebnisse zu vermeiden.

## Generierte Zustände

Für jede Quelle erstellt SourceAnalytix eine`cumulativeReading` und die aktivierten Ergebnisbäume:

| Weg                                  | Inhalt                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| `<source>.currentYear.consumed`      | Aktuelle Verbrauchssummen für Kostenkategorien.                                |
| `<source>.currentYear.delivered`     | Aktuelle Liefersummen nach Verdienstkategorien.                                |
| `<source>.currentYear.costs`         | Aktuelle Gesamtkosten.                                                         |
| `<source>.currentYear.earnings`      | Aktuelle Gesamteinnahmen.                                                      |
| `<source>.currentYear.meterReadings` | Optionale Zählerstände für aktivierte Zeiträume.                               |
| `<source>.<year>`                    | Optionale archivierte Wochen-, Monats- und Quartalsstatistiken.                |
| `<source>.statisticsJson`            | Kompakte Statistiken des laufenden Jahres für VIS, Skripte und andere Adapter. |

Die grundlegenden aktuellen und optionalen vorherigen Zustände verwenden Namen wie z. B.`01_currentDay` ,`02_currentWeek` ,`03_currentMonth` ,`04_currentQuarter` ,`05_currentYear` und ihre`previous` Äquivalente.

Vorherige Werte werden mit dem Zeitstempel der Periode, zu der sie gehören, geschrieben.`23:59:59` Am letzten Tag, nicht zum Zeitpunkt des Rollovers. Verlaufsadapter protokollieren daher einen abgeschlossenen Tag, eine Woche, einen Monat, ein Quartal oder ein Jahr innerhalb dieses Zeitraums, was Visualisierungen wie Flot erwarten.

### Statistiken JSON

Jede aktive Quelle legt automatisch einen schreibgeschützten Bereich offen.`statisticsJson` Staat mit Rolle`json` Es sind keine zusätzlichen Einstellungen erforderlich. Es enthält dieselben berechneten Werte wie die einzelnen Bundesstaaten und führt keine separate Berechnung durch.

```json
{
  "schemaVersion": 1,
  "year": 2026,
  "source": {
    "id": "smartmeter.0.total",
    "name": "Electricity meter",
    "unit": "kWh"
  },
  "quantity": {
    "type": "consumed",
    "current": {
      "day": 4.21,
      "week": 28.65,
      "month": 114.32,
      "quarter": 301.77,
      "year": 894.15
    },
    "previous": null,
    "periods": {
      "weekdays": null,
      "previousWeekdays": null,
      "weeks": {},
      "months": {},
      "quarters": {}
    }
  },
  "financial": {
    "type": "costs",
    "currency": "EUR",
    "current": {
      "day": 1.24,
      "week": 8.47,
      "month": 34.19,
      "quarter": 89.51,
      "year": 261.42
    },
    "previous": null,
    "periods": {
      "weekdays": null,
      "previousWeekdays": null,
      "weeks": {},
      "months": {},
      "quarters": {}
    }
  },
  "meterReadings": null
}
```

`quantity` stellt entweder dar`consumed` oder`delivered` Werte.`financial` stellt entweder dar`costs` oder`earnings` Die`meterReadings` wird befüllt, wenn die Zählerwertspeicherung aktiviert ist. Deaktivierte Berechnungen und periodische Datenerfassungen werden dargestellt durch`null` Das Schema bleibt also vorhersehbar.

Wochentagsnutzung`1` für Montag bis`7` für Sonntag. Wochen- und Monatstasten sind mit Nullen aufgefüllt, und Vierteljahrestasten verwenden`1` durch`4` Es werden nur die Sammlungen des aktuellen Jahres und optional die Werte der vorherigen Periode berücksichtigt, um ein unbegrenztes Anwachsen des Zustands zu verhindern. Der ioBroker-Status-Zeitstempel gibt an, wann die JSON-Datei zuletzt geändert wurde.

Der Zustand wird beim Start des Adapters anhand vorhandener Statistiken neu erstellt, und seine Schreibvorgänge werden in die normalen Berechnungen einbezogen. Wenn eine Datenquelle deaktiviert oder gelöscht wird, bleibt der letzte JSON-Wert zusammen mit dem übrigen berechneten Verlauf erhalten und wird nicht mehr aktualisiert.

## Zählerrückstellungen und -korrekturen

Bei aktivierter Reset-Erkennung wird eine Verringerung des Verbrauchs oberhalb **des Schwellenwerts** als tatsächlicher Zählerreset oder -austausch interpretiert. SourceAnalytix speichert einen Offset und führt die kumulative Messung fort, ohne den vorherigen Verbrauch zu verlieren. Kleinere Rückwärtsänderungen werden als Jitter behandelt und ignoriert. Ein Schwellenwert von`0` Jede Verringerung wird als Neustart betrachtet.

Wenn die Reset-Erkennung deaktiviert ist, werden sinkende Messwerte der Quelle akzeptiert und können die berechneten Summen verringern. Dieser Modus ist nur für Quellen vorgesehen, bei denen dieses Verhalten erwartet wird.

Um einen bereits falschen Fehler zu korrigieren`cumulativeReading` :

1. Die SourceAnalytix-Instanz stoppen.
2. **Objekte** öffnen und Expertenmodus aktivieren.
3. Richtig`<source>.cumulativeReading` Die
4. Öffnen Sie die benutzerdefinierten SourceAnalytix-Einstellungen des Quellstatus und korrigieren Sie die betroffenen Periodenstartwerte in derselben Zieleinheit.
5. Starten Sie den Adapter erneut und überprüfen Sie die Ergebnisse der aktuellen Periode.

![Korrektur eines kumulativen Messwerts](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

Eine Änderung des aktuellen Stückpreises führt nicht zu einer Neuberechnung der historischen Kosten. Derzeit findet keine benutzerinduzierte Neuberechnung der historischen Kosten statt.

## Fehlerbehebung

### Die Quelle ist nicht initialisiert.

- Überprüfen Sie, ob die benutzerdefinierte Konfiguration für die richtige SourceAnalytix-Instanz aktiviert ist.
- Wählen Sie eine vorhandene Preisdefinition aus. Eine Preisdefinition ist auch dann erforderlich, wenn nur der Verbrauch aktiviert ist.
- Stellen Sie sicher, dass die Quelleinheit vom Objekt erkannt werden kann, oder wählen Sie sie manuell aus.
- Prüfen Sie, ob die Quell- und Zieleinheiten kompatible Größen darstellen.
- Überprüfen Sie das Adapterprotokoll, um den genauen Ablehnungsstatus oder Konfigurationswert zu ermitteln.

### Der Verbrauch beginnt mit der vollständigen Ablesung des Zählers über die gesamte Lebensdauer.

Dies kennzeichnet normalerweise alte oder manuell eingegebene Periodenstartwerte. Stellen Sie die Startwerte für Tag, Woche, Monat, Quartal und Jahr auf die entsprechenden historischen Zählerstände ein. Für den heutigen Wert gilt üblicherweise:

```text
current cumulative reading - consumption since the beginning of today
```

### Dynamische Preise scheinen fehlerhaft zu sein.

- Prüfen Sie, ob der Preisstatus die Währung pro Zieleinheit angibt und nicht Cent, es sei denn, der Wert wurde umgerechnet.
- Prüfen Sie den Zeitstempel des Preisstatus und die Messwerte des Quellzählers.
- Beachten Sie, dass die Differenz zwischen Preisänderungen und der verstrichenen Zeit durch die verstrichene Zeit geteilt wird, da kein feineres Verbrauchsprofil verfügbar ist.
- Überprüfen`priceDefinitions.<category>.currentPrice` zum aktuellen Preis.

## Bekannte Einschränkungen

- Die automatische historische Neuberechnung ist absichtlich deaktiviert, und es ist derzeit keine explizite Neuberechnungsaktion verfügbar.
- Vom Benutzer konfigurierbare rollierende Perioden sind nicht implementiert.
- Einheitenlose Zähler, Zeiteinheiten und digitale Größeneinheiten werden nicht unterstützt.

## Credits

Die Ursprünge des Adapters reichen zurück bis zu einer Arbeit von pix im Jahr 2016: [ioBroker-Forum-Thread](https://forum.iobroker.net/viewtopic.php?f=21\&t=2262)

Es wurde später verbessert durch`@hadering` und als [homematic\_verbrauchszaehler](https://github.com/hdering/homematic_verbrauchszaehler) veröffentlicht.

## Unterstützt mich

Wenn Ihnen meine Arbeit gefällt, erwägen Sie bitte eine persönliche Spende.

Dies ist ein persönlicher Spendenlink für DutchmanNL und steht in keiner Verbindung zum ioBroker-Projekt.

[![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](https://paypal.me/DutchmanNL)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

## Changelog
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 0.5.6 (2026-08-02)
* The monthly basic price is booked as a full charge when the tariff first becomes valid and at the beginning of every following calendar month, instead of being spread over the days of a month ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* **Valid from** now also defines the first month the monthly basic price is charged, while tariffs without a validity date keep starting at the beginning of the current calendar year ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* Monthly basic prices are recorded in their own `basicPriceHistory` state, so a price change during a month only applies to the next monthly booking and already booked months stay unchanged ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* **Valid from** is available for every price source, not only for fixed prices, and a selected date becomes effective at local midnight ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).

### 0.5.5 (2026-08-01)
* Previous day, week, month, quarter and year values are written with the timestamp of the period they belong to (23:59:59 on its last day), so history adapters and Flot plot them in the correct period ([#497](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/497)).
* The number of decimals for consumption and cost values is configurable globally and per source, including an option to store the exact value without rounding ([#934](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/934)).
* A missed calendar rollover can be processed without restarting the instance, through the new `info.recoverPeriods` button or a `recoverPeriods` message, and an hourly check recovers a rollover the scheduler missed while the adapter kept running ([#905](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/905)).
* The midnight scheduler can no longer raise an unhandled rejection, and its cron job and timers are stopped when the instance shuts down ([#904](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/904)).

### 0.5.4 (2026-08-01)
* Each active source automatically exposes a compact `statisticsJson` state containing its current-year quantity, financial and optional meter-reading statistics ([#361](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/361), [#967](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/967)).
* Monthly basic prices are no longer imported into the variable-cost accumulator and added a second time after a restart ([#1188](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1188)).

### 0.5.3 (2026-07-28)
* Power states can optionally ignore negative readings, so inverters which report a negative power while switched off no longer reduce the accumulated yield ([#466](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/466)).

### 0.5.2 (2026-07-28)
* The npm release workflow no longer fails at the Sentry step: commit association is disabled because the previous release commit is not reachable in the shallow, squash-merged history ([#1179](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1179)).
* README now carries the standard Sentry notice required by the ioBroker repository checker ([#1179](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1179)).

[Older changelog entries](https://github.com/DrozmotiX/ioBroker.sourceanalytix/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 DrozmotiX Services B.V.

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