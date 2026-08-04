---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sourceanalytix/README.md
title: SourceAnalytix
hash: XCKmJ2EPbS52X84K8YwmuIUkMNQH/9qZ7LOHloy0ME0=
---
# SourceAnalytix

![NPM-Version](https://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/sourceanalytix-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/sourceanalytix-stable.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) [![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.sourceanalytix/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/DrozmotiX/ioBroker.sourceanalytix/actions/workflows/test-and-release.yml)

SourceAnalytix wandelt kumulierte Zählerstände oder regelmäßig aktualisierte Stromwerte in Statistiken zu Verbrauch, Lieferung, Kosten und Erträgen um. Es unterstützt Festpreise, geplante Preisänderungen, dynamische Tarife aus ioBroker-Bundesstaaten und vom Anbieter gesteuerte Tarife.

Der Adapter benötigt **Admin 7.6.20 oder neuer**, **js-controller 6.0.11 oder neuer** und **Node.js 22 oder neuer**.

Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Dieser Adapter verwendet die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird die Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der ioBroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird Ihre Installations-ID mit übermittelt. Diese anonyme Kennung enthält keine persönlichen Informationen wie Ihren Namen oder Ihre E-Mail-Adresse. Sie ermöglicht die Gruppierung von Fehlern und zeigt an, wie viele Installationen betroffen sind.

## Merkmale
- Aktuelle Tages-, Wochen-, Monats-, Quartals- und Jahressummen
- Optionale Werte der Vorperiode und Einnahmen des laufenden Jahres nach Wochentagen, Wochen, Monaten und Quartalen
- Optionale archivierte Wochen-, Monats- und Quartalsstatistiken unterhalb jedes Kalenderjahres
- Verbrauchs- und Lieferberechnungen
- Kosten- und Ertragsberechnungen mit einem optionalen monatlichen Grundpreis
- Feste, planmäßige, staatlich vorgegebene und vom Wahlschalter gesteuerte Stückpreise
- Zeitgestempelte Preishistorie, die bereits berechnete Kosten beibehält
- Automatische Umrechnung zwischen kompatiblen Energie-, Volumen-, Massen- und metrischen Längeneinheiten
- Integration der Leistungsmesswerte über ihre tatsächlichen Aktualisierungsintervalle, wobei negative Messwerte optional ignoriert werden
- Wiederherstellung verpasster Kalenderüberläufe nach einem Neustart, auf Anfrage oder durch stündliche Überprüfung
- Bearbeitung von Zählerrückstellungen, Zähleraustauschen und kleinen Rückwärtsschwankungen
- Ein kompakter, automatisch aktualisierter JSON-Statistikstatus pro aktiver Quelle

## Aufstellen
### 1. Konfigurieren Sie die Adapterinstanz
Die Registerkarte **Allgemeine Einstellungen** steuert, welche detaillierten Statistiken erstellt werden. Durch Deaktivieren einer Option werden die entsprechenden optionalen Statuswerte entfernt, während die normalen Summen des aktuellen Zeitraums und die vorhandenen archivierten Jahre erhalten bleiben.

![Allgemeine Einstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

| Einstellung | Ergebnis |
| --- | --- |
| Jahresstatistik: Wochen / Monate / Quartale | Abgeschlossene Werte der Filialen unterhalb von `<source>.<year>` zum historischen Vergleich. |
| Aktuelles Jahr: Wochen / Monate / Quartale | Speichert Werte für jeden Zeitraum unterhalb von `<source>.currentYear`. |
| Aktuelles Jahr: Wochen / Monate / Quartale | Speichert Werte für jeden Zeitraum unten<source> .currentYear`. |
| Rundung: Dezimalstellen für Verbrauchswerte | Dezimalstellen für berechnete Mengen und Zählerstände, standardmäßig `3`. |
| Rundung: Dezimalzahlen für Kostenwerte | Dezimalzahlen für berechnete Kosten und Erträge, standardmäßig `2`. |
| Rundung: Dezimalzahlen für Kostenwerte | Dezimalzahlen für berechnete Kosten und Erträge, standardmäßig „2“. |

Beide Rundungseinstellungen akzeptieren `-1`, um den exakten berechneten Wert ungerundet zu speichern. Eine einzelne Datenquelle kann davon abweichen: Ihre Felder **Dezimalstellen für Verbrauchswerte** und **Dezimalstellen für Kostenwerte** überschreiben die globale Einstellung und verwenden diese, wenn sie leer sind. Die Rundung betrifft nur die in Zustände geschriebenen Werte; interne Berechnungen, die kumulativen Messwerte und die persistenten Speicher behalten stets die volle Genauigkeit, sodass im Laufe der Zeit kein Genauigkeitsverlust auftritt.

SourceAnalytix speichert die zuletzt erfolgreich verarbeiteten Kalenderperioden. Falls der Adapter oder ioBroker um Mitternacht nicht ausgeführt wird, werden verpasste Änderungen für Tag, Woche, Monat, Quartal und Jahr beim nächsten Start einmalig verarbeitet.

Ein Rollover kann auch ohne Neustart der Instanz ausgelöst werden, was nützlich ist, wenn festgestellt wird, dass die Instanz kurz nach Mitternacht nicht mehr verfügbar ist:

- Setzen Sie `sourceanalytix.<instance>.info.recoverPeriods` auf `true`. Die Schaltfläche wird nach Abschluss des Laufs zurückgesetzt.
Alternativ kann eine Nachricht über ein Skript gesendet werden: `sendTo('sourceanalytix.<instance>', 'recoverPeriods', {}, result => log(result.recovered))`. Die Antwort enthält die Anzahl der Quellen, deren Rollover verarbeitet wurde.

Eine stündliche Überprüfung führt die gleiche Wiederherstellung automatisch durch, sodass ein verpasster Rollover, während der Adapter nach einem Host-Suspend oder einer Systemzeitkorrektur weiterlief, automatisch korrigiert wird. Jede Route ist idempotent: Quellen, deren Perioden bereits aktuell sind, werden übersprungen.

### 2. Preisdefinitionen erstellen
Öffnen Sie **Preisdefinitionen** und fügen Sie die Kategorien hinzu, die die Quellstaaten verwenden sollen.

![Preisdefinitionen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)

| Feld | Beschreibung |
| --- | --- |
| Kategorie | Eindeutige Kennung, die im Feld **Preisdefinition auswählen** des Quellstaates angezeigt wird. |
| Beschreibung | Freitextbeschreibung des Tarifs. |
| Kostenart | Wählt die Ergebniskategorien `costs`/`consumed` oder `earnings`/`delivered` aus. |
| Einheit | Zieleinheit für den Verbrauch und Nenner des Stückpreises. |
| Preisquelle | Festpreis, numerischer ioBroker-Status- oder Tarifwähler. |
| Preis pro Einheit | Stückpreis für einen Festtarif oder der inaktive/Basispreis für einen Selektor. |
| Preisstatus | Vollständige ID des numerischen Preisstatus oder Tarifauswahlstatus. |
| Aktiver Tarifpreis | Preis, der gilt, solange ein Selektor aktiv ist. |
| Aktiver Auswahlwert | Optionaler exakter Wert, der den alternativen Tarif aktiviert. |
| Gültig ab | Optionales Datum, ab dem der Tarif einschließlich seines monatlichen Grundpreises gilt. |
| Preis pro Monat | Monatlicher Grundpreis, gilt nur für Quellen mit aktivierter Option **Grundpreis inklusive**. |

#### Feste und planmäßige Preise
Wählen Sie **Festpreis** und geben Sie den **Preis pro Einheit** ein. Wenn Sie einen Tarif ändern, legen Sie **Gültig ab** das Datum fest, an dem der neue Preis in Kraft tritt. Der vorherige Preis bleibt gespeichert und wird nicht rückwirkend angewendet.

#### Dynamischer Preisstatus
Wählen Sie **Statuswert** und anschließend den Status mit dem aktuellen numerischen Stückpreis aus. SourceAnalytix abonniert diesen Status und protokolliert jede Änderung mit dem zugehörigen Zeitstempel. Sowohl Zahlen als auch numerische Zeichenketten mit Punkt oder Komma als Dezimaltrennzeichen werden akzeptiert.

Der Statuswert muss die Systemwährung pro ausgewählter Zieleinheit darstellen, z. B. Währung/kWh, wenn die Preisdefinition `kWh` verwendet. Werte wie Cent pro kWh müssen vor ihrer Verwendung im Quelladapter oder einem Skript umgerechnet werden.

#### Tarifauswahl
Wählen Sie im **Tarifauswahlfeld** den gewünschten Tag-/Nacht-, Relais-, Kontakt- oder andere Zweipreistarife aus:

- **Der Preis pro Einheit** ist der inaktive/Basispreis.
- Solange der Selektor aktiv ist, wird der **aktive Tarifpreis** verwendet.
- Ohne **Aktiven Selektorwert** aktivieren `true`, von Null verschiedene Zahlen und gewöhnliche Wahrheitszeichenketten den alternativen Tarif.
- Bei **Aktivem Selektorwert** wird der alternative Tarif nur bei exakter Übereinstimmung der Zeichenkettendarstellung aktiviert.

#### Beschreibbarer aktueller Preis
Jede Kategorie stellt `sourceanalytix.<instance>.priceDefinitions.<category>.currentPrice` bereit. Skripte und Visualisierungen können diesem Zustand einen numerischen Wert zuweisen, um sofort einen neuen Preis anzuwenden. Der Wert wird außerdem der mit einem Zeitstempel versehenen Preishistorie hinzugefügt.

#### Historische Preisberechnung
Preise sind zeitabhängig. Ein neuer Preis gilt erst ab dem Zeitpunkt seiner Änderung und ändert niemals bereits angefallene Kosten für früheren Konsum.

Bei einem kumulativen Zähler kennt SourceAnalytix die Verbrauchsdifferenz zwischen zwei Ablesungen. Wenn innerhalb dieses Zeitraums eine oder mehrere Preisänderungen stattgefunden haben, wird die Differenz proportional auf die verstrichenen Zeitabschnitte verteilt und jeder Anteil zum für diesen Abschnitt gültigen Preis abgerechnet. Eine Preisänderung genau zum Zeitpunkt der späteren Zählerablesung gilt für den folgenden Zeitraum.

Die genauen Kosten und die Preishistorie bleiben auch nach einem Neustart des Adapters erhalten. Eine explizite Neuberechnung alter historischer Daten ist derzeit nicht implementiert.

#### Monatlicher Grundpreis
Aktivieren Sie **Grundpreis einschließen** für eine Quelle, um den konfigurierten Monatspreis hinzuzufügen. **Gültig ab** definiert auch den ersten Monat, in dem diese Gebühr erhoben wird. Der volle Grundpreis wird einmalig bei Inkrafttreten des Tarifs und anschließend zu Beginn jedes folgenden Kalendermonats gebucht. Eine Preisänderung im Laufe eines Monats wird für die Buchung des Folgemonats wirksam, während die Preise der Vormonate unverändert bleiben. Bestehende Tarife ohne Gültigkeitsdatum behalten ihr bisheriges Verhalten bei und beginnen mit Beginn des aktuellen Kalenderjahres.

Die Tages- und Wochensummen beinhalten die volle Monatsgebühr nur dann, wenn das Buchungsdatum in diesen Zeitraum fällt. Die Monats-, Quartals- und Jahressummen enthalten die vollen Gebühren, die in den jeweiligen Kalenderperioden gebucht wurden.

### 3. Aktivieren eines Quellzustands
SourceAnalytix wird über die benutzerdefinierten ioBroker-Einstellungen jedes Quellzustands konfiguriert. Öffnen Sie **Objekte**, klicken Sie auf das Schraubenschlüssel-/Konfigurationssymbol des gewünschten Zustands und erweitern Sie die SourceAnalytix-Instanz.

![Symbol für benutzerdefinierte Einstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)

![Quellstatuseinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| Schauplatz | Beschreibung |
| --- | --- |
| Aktiviert | Aktiviert diese Quelle für die ausgewählte SourceAnalytix-Instanz. |
| Alias | Optionaler Anzeigename für das generierte Gerät. Ändert nicht die generierte Status-ID. |
| Preisdefinition auswählen | Obligatorische Kategorie aus den Preisdefinitionen des Adapters. |
| Einheit auswählen | Quelleinheit. Automatische Erkennung aktiviert lassen, wenn das Quellobjekt über eine korrekte, unterstützte Einheit verfügt. |
| Kosten berechnen | Erstellt und aktualisiert Kosten- oder Ertragszustände. |
| Inklusive Grundpreis | Fügt den monatlichen Grundpreis der Preisdefinition hinzu. |
| Verbrauch berechnen | Erstellt und aktualisiert Verbrauchs- oder Lieferzustände. |
| Durchschnittliche Leistungswerte zwischen Aktualisierungen | Optionaler Berechnungsmodus für Leistungszustände; siehe [Machtzustände](#power-states). |
| Negative Leistungswerte ignorieren | Negative Leistungsmesswerte werden als `0 W` gezählt; siehe [Leistungszustände](#power-states). |
| Zählerstände speichern | Speichert Zählerstände in den aktivierten Erfassungszeiträumen. |
| Erkennung von Gerätewert-Resets | Führt die kumulative Gesamtsumme nach einem Zähler-Reset oder -Austausch fort. |
| Schwellenwert | Größte Rückwärtsschwankung, die als Messjitter ignoriert wird, ausgedrückt in der Zieleinheit. |

Die Quellstatus-ID wird in die generierte SourceAnalytix-Geräte-ID umgewandelt, indem Punkte durch doppelte Unterstriche ersetzt werden.

## Quellwerte und Einheiten
### Kumulative Quellzustände
Verwenden Sie einen kumulativen Gesamtwert, der normalerweise nur ansteigt, z. B. Tasmota `ENERGY_Total` oder den Gesamtverbrauch eines Smart Meters. Verwenden Sie keinen Wert wie `ENERGY_Today`, der absichtlich täglich zurückgesetzt wird. Falls kein kumulativer Gesamtwert verfügbar ist, erstellen Sie einen in einem Upstream-Adapter oder -Skript.

Bei kumulativen Quellen wird der Verbrauch wie folgt berechnet:

```text
current cumulative reading - reading at the beginning of the period
```

Bei der ersten Aktivierung initialisiert SourceAnalytix leere oder Nullwerte für Tag, Woche, Monat, Quartal und Jahr mit dem aktuellen normalisierten Zählerstand. Dadurch wird verhindert, dass der bisherige Gesamtverbrauch als neuer Verbrauch angezeigt wird. Die Werte bleiben bearbeitbar und werden bei späteren Starts nicht überschrieben.

![Periodenstartwerte](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)

Geben Sie manuelle Startwerte in der durch die Preisdefinition ausgewählten **Zieleinheit** ein. Jeder Wert muss den Zählerstand zu Beginn des jeweiligen Zeitraums darstellen, nicht den Verbrauch während des Zeitraums.

### Leistungszustände
Leistungswerte wie `W` oder `kW` werden über die tatsächliche Zeit zwischen den Zustandsaktualisierungen integriert, um Energie zu erzeugen. Die erste Messung legt den Basiswert fest und erzeugt keinen Verbrauch.

Standardmäßig wird der vorherige Leistungswert für das gesamte Intervall als gültig betrachtet. Aktivieren Sie **Durchschnittliche Leistungswerte zwischen Aktualisierungen** für Sensoren, die regelmäßig Daten melden und sich nur allmählich ändern; SourceAnalytix verwendet dann den Durchschnitt des vorherigen und des aktuellen Werts. Lassen Sie diese Option für Geräte deaktiviert, die abrupt umschalten, wenn die Aktualisierung das Umschaltereignis markiert.

Manche Wechselrichter melden im ausgeschalteten Zustand eine stark negative Leistung, die andernfalls als negative Energie integriert würde und den Gesamtertrag mindern würde. Aktivieren Sie **Negative Leistungswerte ignorieren**, um solche Messwerte als `0 W` zu zählen. Der Messwert wird begrenzt statt verworfen, sodass das Intervall weiterläuft; würde man ihn verwerfen, bliebe die letzte positive Leistung als Basiswert erhalten und würde über die gesamte Ausfallzeit integriert.

### Unterstützte Einheiten
SourceAnalytix konvertiert Werte automatisch nur zwischen kompatiblen Größen:

| Menge | Unterstützte Einheiten |
| --- | --- |
| Leistung | `GW`, `MW`, `kW`, `W`, `mW` |
| Kubisches Volumen | `km³`, `m³`, `dm³`, `cm³`, `mm³` |
| Flüssigkeitsvolumen | `hl`, `l`, `dl`, `cl`, `ml` |
| Masse | `t`, `kg`, `g` |
| Metrische Länge | `km`, `m`, `dm`, `cm`, `mm`, `µm`, `nm` |
| Metrische Länge | `km`, `m`, `dm`, `cm`, `mm`, `µm`, `nm` |

Liter und Kubikmeter lassen sich ineinander umrechnen. Inkompatible Umrechnungen, wie beispielsweise Kilogramm in kWh oder Meter in Liter, werden verworfen, um irreführende Ergebnisse zu vermeiden.

## Generierte Zustände
Für jede Quelle erstellt SourceAnalytix ein `cumulativeReading` und die aktivierten Ergebnisbäume:

| Pfad | Inhalt |
| --- | --- |
| `<source>.currentYear.consumed` | Aktuelle Gesamtverbrauchswerte für Kostenkategorien. |
| `<source>.currentYear.costs` | Aktuelle Gesamtkosten. |
| `<source>.currentYear.earnings` | Aktuelle Gesamteinnahmen. |
| `<source>.currentYear.meterReadings` | Optionale Zählerstände für aktivierte Zeiträume. |
| `<source>.<year>` | Optionale archivierte Wochen-, Monats- und Quartalsstatistiken. |
| `<source>.statisticsJson` | Kompakte Statistiken des laufenden Jahres für VIS, Skripte und andere Adapter. |
| `<source> .statisticsJson` | Kompakte Statistiken des laufenden Jahres für VIS, Skripte und andere Adapter. |

Die grundlegenden aktuellen und optionalen vorherigen Zustände verwenden Namen wie `01_currentDay`, `02_currentWeek`, `03_currentMonth`, `04_currentQuarter`, `05_currentYear` und ihre `previous`-Äquivalente.

Vorherige Werte werden mit dem Zeitstempel des zugehörigen Zeitraums (z. B. `23:59:59` am letzten Tag) anstatt des Zeitpunkts des Überlaufs gespeichert. Verlaufsadapter protokollieren daher einen abgeschlossenen Tag, eine Woche, einen Monat, ein Quartal oder ein Jahr innerhalb dieses Zeitraums, was Visualisierungen wie Flot erwarten.

### Statistik-JSON
Jede aktive Quelle stellt automatisch einen schreibgeschützten Zustand `statisticsJson` mit der Rolle `json` bereit; es sind keine zusätzlichen Einstellungen erforderlich. Dieser Zustand enthält dieselben berechneten Werte wie die einzelnen Zustände und führt keine separate Berechnung durch.

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

`quantity` repräsentiert entweder die Werte von `consumed` oder `delivered`. `financial` repräsentiert entweder die Werte von `costs` oder `earnings`. `meterReadings` wird belegt, wenn die Zählerwertspeicherung aktiviert ist. Deaktivierte Berechnungen und periodische Datenerfassungen werden durch `null` dargestellt, sodass das Schema vorhersehbar bleibt.

Wochentage werden mit `1` für Montag bis `7` für Sonntag gekennzeichnet. Wochen- und Monatsschlüssel werden mit führenden Nullen aufgefüllt, Quartalsschlüssel mit `1` bis `4`. Es werden nur Sammlungen des aktuellen Jahres und optionale Werte der vorherigen Periode berücksichtigt, um ein unbegrenztes Anwachsen des Zustands zu verhindern. Der ioBroker-Status-Zeitstempel gibt an, wann die JSON-Datei zuletzt geändert wurde.

Der Zustand wird beim Start des Adapters anhand vorhandener Statistiken neu erstellt, und seine Schreibvorgänge werden in die normalen Berechnungen einbezogen. Wenn eine Datenquelle deaktiviert oder gelöscht wird, bleibt der letzte JSON-Wert zusammen mit dem übrigen berechneten Verlauf erhalten und wird nicht mehr aktualisiert.

## Zählerrücksetzungen und -korrekturen
Bei aktivierter Reset-Erkennung wird eine Verringerung des Verbrauchs oberhalb des **Schwellenwerts** als tatsächlicher Zähler-Reset oder -Austausch interpretiert. SourceAnalytix speichert einen Offset und führt die kumulative Messung fort, ohne den vorherigen Verbrauch zu verlieren. Kleinere Rückwärtsänderungen werden als Jitter betrachtet und ignoriert. Ein Schwellenwert von `0` behandelt jede Verringerung als Reset.

Wenn die Reset-Erkennung deaktiviert ist, werden sinkende Messwerte der Quelle akzeptiert und können die berechneten Summen verringern. Dieser Modus ist nur für Quellen vorgesehen, bei denen dieses Verhalten erwartet wird.

Um einen bereits fehlerhaften `cumulativeReading` zu korrigieren:

1. Beenden Sie die SourceAnalytix-Instanz.
2. Öffnen Sie **Objekte** und aktivieren Sie den Expertenmodus.
3. Korrigieren Sie `<source> .kumulativeLesung`.
4. Öffnen Sie die benutzerdefinierten SourceAnalytix-Einstellungen des Quellstatus und korrigieren Sie die betroffenen Periodenstartwerte in derselben Zieleinheit.
5. Starten Sie den Adapter erneut und überprüfen Sie die Ergebnisse der aktuellen Periode.

![Korrektur eines kumulativen Messwerts](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

Eine Änderung des aktuellen Stückpreises führt nicht zu einer Neuberechnung der historischen Kosten. Derzeit findet keine benutzerinduzierte Neuberechnung der historischen Kosten statt.

## Fehlerbehebung
### Die Quelle ist nicht initialisiert
- Überprüfen Sie, ob die benutzerdefinierte Konfiguration für die richtige SourceAnalytix-Instanz aktiviert ist.
- Wählen Sie eine vorhandene Preisdefinition aus. Eine Preisdefinition ist auch dann erforderlich, wenn nur der Verbrauch aktiviert ist.
- Stellen Sie sicher, dass die Quelleinheit vom Objekt erkannt werden kann oder wählen Sie sie manuell aus.
- Prüfen Sie, ob die Quell- und Zieleinheiten kompatible Größen darstellen.
- Überprüfen Sie das Adapterprotokoll auf den genauen Ablehnungsstatus oder Konfigurationswert.

### Der Verbrauch beginnt mit der vollständigen Zählerablesung über die gesamte Lebensdauer.
Dies kennzeichnet normalerweise alte oder manuell eingegebene Periodenstartwerte. Stellen Sie die Startwerte für Tag, Woche, Monat, Quartal und Jahr auf die entsprechenden historischen Zählerstände ein. Für den heutigen Wert gilt üblicherweise:

```text
current cumulative reading - consumption since the beginning of today
```

### Dynamische Preise scheinen fehlerhaft zu sein
- Prüfen Sie, ob der Preisstatus die Währung pro Zieleinheit angibt und nicht Cent, es sei denn, der Wert wurde umgerechnet.
- Überprüfen Sie den Zeitstempel des Preisstatus und die Messwerte des Quellzählers.
- Beachten Sie, dass die Differenz zwischen den Zählerpreisänderungen durch die verstrichene Zeit geteilt wird, da kein feineres Verbrauchsprofil verfügbar ist.
- Überprüfen Sie `priceDefinitions.<category>.currentPrice` auf den aktuellen Preis.

## Bekannte Einschränkungen
- Die automatische historische Neuberechnung ist absichtlich deaktiviert, und es ist derzeit keine explizite Neuberechnungsaktion verfügbar.
- Vom Benutzer konfigurierbare rollierende Perioden sind nicht implementiert.
Einheitenlose Zähler, Zeiteinheiten und digitale Größeneinheiten werden nicht unterstützt.

## Credits
Die Wurzeln des Adapters reichen zurück bis zu einer Arbeit von pix im Jahr 2016: [ioBroker-Forumsthread](https://forum.iobroker.net/viewtopic.php?f=21&t=2262)

Später wurde es durch `@hadering` verbessert und als [homematic_verbrauchszaehler](https://github.com/hdering/homematic_verbrauchszaehler) veröffentlicht.

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, erwägen Sie bitte eine persönliche Spende.

Dies ist ein persönlicher Spendenlink für DutchmanNL und steht in keiner Verbindung zum ioBroker-Projekt.

[![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](https://paypal.me/DutchmanNL)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### __IN BEARBEITUNG__ -->

## Changelog
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

[Older changelog entries](CHANGELOG_OLD.md)

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