---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sourceanalytix/README.md
title: QuelleAnalytix
hash: LLPnGzrlZ1I5NA2VHediHsTe4UoQfTn1ioqqIKEUK98=
---
# SourceAnalytix

![NPM-Version](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/sourceanalytix-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sourceanalytix-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.sourceanalytix.svg)
![NPM](https://nodei.co/npm/iobroker.sourceanalytix.png?downloads=true)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Testen und freigeben](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter nutzt den Dienst [Sentry.io](https://sentry.io), um mir als Entwickler automatisch Ausnahmen und Codefehler sowie neue Geräteschemata zu melden.** Weitere Details siehe unten!

Detaillierte Analyse Ihres Energie-, Gas- und Flüssigkeitsverbrauchs Jede Quelle (kWh, Wh, Watt, l/h oder m3) kann für Datenanalysen verwendet werden:

## Eigenschaften
#### Grundfunktionen
| Zustand | Funktionalität | Beschreibung |
|--|--|--|
| >Gerät<.cumulativeReading | [Werte akkumulieren](#cumulativereading) | Kumulierte Werte berechnen<br/> einschließlich [Transformation](#valueTransformation)<br/> Der kumulierte Wert kann geändert werden, indem Sie [diese Schritte] ausführen](#cumulativereading-reset) |
| &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;aktuellesJahr | [Statistik für das aktuelle Jahr](#current-period) | Speichern Sie statistische Informationen des aktuellen Jahres auf Ebene<br/> &gt;Gerät.&gt;aktuellesJahr&lt;.&gt;ausgewählter Zeitraum&lt; |
| &gt;Jahr&lt;.&gt;aktuellesJahr.&gt;Verbrauchsart &lt; | [Verbrauch](#consumptioncalculation) | Root-Ordner zum Speichern von Verbrauchsdaten<br/> (aktueller Wert - vorheriger Wert).<br/> Kann Verbrauch oder Lieferung sein |
| &gt;Jahr&lt;.&gt;aktuellesJahr.&gt;Kostenart &lt; | [Kosten](#costcalculation) | Stammordner zum Speichern von Kostendaten.<br/> aktueller Wert * Kosten + Grundpreis<br/> Kann Verbrauch oder Lieferung sein |
| &gt;Jahr&lt;.&gt;aktuellesJahr.&gt;Kostenart &lt; | [Kosten](#kostenkalkulation) | Stammordner zum Speichern von Kostendaten.<br/> aktueller Wert * Kosten + Grundpreis<br/> Kann Verbrauch oder Lieferung sein |

Alle Landesstandorte sind nach Bundeslandnamen gruppiert und in Punkt- und [Kategorie](#categories)-Strukturen getrennt.<br/> Berechnungen werden automatisch verarbeitet und Werte in die richtige Einheit umgewandelt, wie in [Preis-Definitionen](#price-definitionsprice-definitions) definiert.

Bei Problemen lesen Sie bitte zuerst die **[Fehlerbehebung](#troubleshooting)**!

## Wie man
### Status-Aktivierung
![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)

![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| Konfigurationselement | Beschreibung |
|--|--|
| aktiviert | Status für SourceAnalytix aktivieren |
| Alias | Standard: Name des Zustands, Name des Geräts wie in SA| . angezeigt |
| Typ auswählen | obligatorisch, wählen Sie Ihre Berechnungsart, um nach [Preis-Definitionen](#price-definitions) | . zu berechnen |
| Einheit auswählen | Standard: automatisch, bei Bedarf manuell auswählen (siehe Protokolle) |
| Kosten | Kostenkalkulation |
| ohne (ohne) Grundgebühr | Grundgebühr in Kostenkalkulation einbeziehen |
| Verbrauch | Verbrauchsdaten berechnen |
| Zählerwerte | aktuelle Zählerwerte speichern | | Zählerstand um<br/> Anfang von x : | Startwert des Zählers für eine bestimmte zu verarbeitende Periode<br/> Berechnung Strom - startValue|

### Grundkonfiguration (Adapterinstanz)
![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

#### Kumulativer Messwert
*ToDo: Logik beschreiben*

#### Verbrauchsberechnung
*ToDo: Logik beschreiben*

#### Kostenkalkulation
*ToDo: Logik beschreiben*

#### Werttransformation
*ToDo: Dokumentlink zur Bibliothek (auch Dokumentbibliothek!)*<br/> *ToDo : Umwandlung von Watt in kWh dokumentieren*<br/> *ToDo : Einheitenumwandlung dokumentieren (wie Watt, in Wh in KWh)*

#### Jahresstatistik
Speichern Sie statistische Informationen zu Verbrauch/Preisen und/oder Kosten/Einnahmen auf Jahresebene<br/> &gt; &gt;Gerät.&gt;diesesJahr&lt;.&gt;Kategorie&lt;.&gt;ausgewählter Zeitraum

Diese Informationen werden normalerweise für die Datenspeicherung und für historische Vergleiche verwendet.<br/> Staaten sind nach einem bestimmten Zeitraum gruppiert (wie Jahr 2020 vs. 2021, Erz Februar 2019 vs. Februar usw.)

&gt;#### *Wochen*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Erträge<br/> &gt; Verbrauch/Lieferung&lt;.Wochen.**WocheNr**&lt; &gt;#### *Monate*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Erträge<br/> &gt; Verbrauch/Lieferung&lt;.Monate.**Monat**&lt; &gt;#### *Quartals*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Erträge<br/> &gt; Verbrauch/Lieferung&lt;.Viertel.**Qx**&lt;

#### Derzeitige Periode
Speichern Sie statistische Informationen des aktuellen Jahres auf der Ebene : >Gerät.>aktuellesJahr<.>ausgewählter Zeitraum

&gt;#### *Wochen*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Erträge<br/> &gt; Verbrauch/Lieferung&lt;.Wochen.**WocheNr**&lt; &gt;#### *Monate*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Erträge<br/> &gt; Verbrauch/Lieferung&lt;.Monate.**Monat**&lt; &gt;#### *Quartals*<br/> &gt;Gerät&lt;.&gt;Jahr&lt;.&gt;Kosten/Ertrag &gt; Verbrauch/Lieferung&lt;.Quartals.**Qx**&lt;

Diese Informationen werden normalerweise für die tägliche/wöchentliche/monatliche Berechnung von . verwendet<br/> Kosten/Ertrag und/oder Verbrauch/Lieferung gruppiert nach Zeitraum

>ToDo: Screenshots hinzufügen<

#### Kategorien
| Kategorie | Typ | Beschreibung |
|--|--|--|
| Kosten | finanzielle | Ergebnis Berechnungswert * Selbstkostenpreis + Grundpreis |
| Verdienst | finanzielle | Ergebnis der Berechnung Wert * Verdienstpreis + Grundpreis |
| Verbrauch | Berechnungen | Ergebnis des Rechenwertes als Kosten - Startwert<br/> von Jahr/Monat/Quartal usw. |
| Lieferung | Berechnungen | Ergebnis des Berechnungswertes als Auslieferung - Startwert<br/> von Jahr/Monat/Quartal usw. |

### Fehlerbehebung
Bevor wir mit der Fehlerbehebung beginnen, ist es wichtig zu verstehen, wie Source analytix initialisiert wird, da hier Fehler auftreten können, siehe Abschnitt Probleme.
Die folgende Reihenfolge wird behandelt:

1) SourceAnalytix starten 2) Alle für SourceAnalytix aktivierten Zustände auflisten 3) Zustände einleiten, für jeden Zustand:

* Aktuelle kumulierte Reading lesen<br/>

      (falls vorhanden) und Speicherwerte aus Zustand

    * Überprüfen Sie, ob die Einheit verarbeitet werden kann {Problem 1}
    * Prüfen Sie, ob der Kostentyp ausgewählt ist {Problem 2}
    * Überprüfen Sie, ob eine gültige Preisdefinition für die Kostenart {Problem 3} vorhanden ist
    * Überprüfen Sie, ob vorheriger Init-Wert > aktueller kumulierter Wert {Problem 4}
    * Überprüfen Sie, ob gültig von vorherigem Geräte-Reset bekannt ist > aktueller kumulierter Wert {Problem 5}
    * Speichern Sie alle Daten im Speicher

4) Zustände für jeden Zustand initialisieren:

    * Zustand kumulatives Lesen erstellen (zum Speichern von Berechnungsergebnissen, kann auch nur für W bis kWh verwendet werden) {Ausgabe 6}
    * Staaten erstellen, wie in der Statuskonfiguration ausgewählt {Ausgabe 7}
    * Berechnung starten

5) Bei Zustandsänderung/Aktualisierung

    * Überprüfen Sie, ob die Informationen korrekt sind
    * Wert in die richtige Einheit umwandeln (Zustandseinheit in die in der Zustandskonfiguration gewählte Einheit)
    * Überprüfen Sie, ob die Werteingabe korrekt ist (aktueller Wert **>** previousInit-Wert) {Siehe **7 Beim Zurücksetzen des Geräts** Ausgabe 8}
    * berechnen {Ausgabe 9}
      * Für Watt: Berechnen Sie Watt in kWh, berechnen Sie cumulatedReading = currentReading + cumulatedReading
      * Für andere: cumulatedReading berechnen = currentReading + previousDeviceReset (falls vorhanden)

6) Nachts (00.00)

    * Alle SourceAnalytix-aktivierten Zustände auflisten
    * Startwerte (Tag/Woche/Jahr/Monat) zurücksetzen

7) Beim Geräte-Reset

* Aktuellen Wert als previousDeviceReset- und previousInit-Wert speichern<br/>

Wenn das Gerät erneut zurückgesetzt wird (erkannt durch den vorherigenInit-Wert),<br/> currentReading + previousDeviceReset wird wie previousDeviceReset gespeichert.

**Problem 1** Keine Einheit definiert für ....., kann keine Berechnungen ausführen<br/> Bitte wählen Sie die richtige Einheit in den Statuseinstellungen

**Ausgabe 2** Keine Kostenart definiert für ....., bitte Berechnungsart bei Zustandseinstellung auswählen<br/> Bitte wählen Sie den gewünschten Kostentyp aus, um zu verstehen, welcher Betrag für die Berechnungen verwendet werden soll

**Ausgabe 3** Ausgewählter Typ ... existiert nicht in Preisdefinitionen<br/> Jetzt werden Preisdefinitionen für den gewählten Kostentyp gefunden, bitte überprüfen Sie Ihre Preiseinstellung (Konfiguration anpassen)

**Ausgabe 4** Einstellungen prüfen für ..... ! Bekannter Initialwert : ..... &gt; bekannter kumulierter Wert ..... kann nicht fortgesetzt werden<br/> Der bekannte Initialwert &gt; bekannte kumulierte Werte, dies kann durch Entfernen oder Ändern dieser Objekte im Zustand Rohobjekt gelöst werden modify

```"valueAtDeviceInit": xxxx```

**Ausgabe 5** Einstellungen prüfen für ..... ! Bekannter WertAtDeviceReset : ..... &gt; bekannter kumulativer Wert ..... kann nicht fortfahren<br/> Der bekannte Initialwert &gt; bekannte kumulierte Werte, dies kann gelöst werden<br/> Entfernen oder Ändern dieser Objekte im Zustand Rohobjekt

```valueAtDeviceReset": xxxx```

**Problem 6** Status für kumulatives Lesen wird nicht erstellt<br/> Zustandsinitialisierung ist fehlgeschlagen, siehe Ausgabe 1 bis 5

**Ausgabe 7** Staaten für Kostenmesswerte werden nicht erstellt<br/> Berechnungsart ist in den Statuseinstellungen nicht aktiviert ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

### Preisdefinitionen
![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)

**Ausgabe 8** aktueller Wert **&lt;** previousInit<br/> Ein Gerätereset wird erkannt, siehe Funktion 7

**Ausgabe 9** Meine Berechnungen sind falsch<br/>

#### CumulativeReading-Reset 1) Überprüfen Sie, ob die richtige Einheit ausgewählt ist (oder nicht ausgewählt, SA versucht automatisch zu erkennen) 2) Überprüfen Sie, ob der cumulatedReading den korrekten Gesamtwert Ihres Messwerts widerspiegelt, wenn nicht<br/>
        - Stoppen Sie SA
        - Gehe zu Tab-Objekten

          ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

        - Wechseln Sie in den Expertenmodus
        - Ändern Sie den kumulierten Messwert
        - Expertenmodus verlassen
        - Stellen Sie sicher, dass die Startwerte richtig eingestellt sind
- SA starten<br/>

3) Stellen Sie sicher, dass die Startwerte richtig eingestellt sind<br/> SA verarbeitet Berechnungen durch cumulatedReading - bekanntes cumulatedReading zu Beginn der Periode. <b/>Diese Startwerte werden in den Zustandseinstellungen definiert und sollten &lt; als **currentReading** sein.<br/> Bitte stellen Sie sicher, kumulatives Lesen &gt;= DayStart &gt;= WeekStart &gt;= MonthStart &gt;= QuarterStart &gt;= YearStart ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)</b>

4) Überprüfen Sie diese Werte im Zustandsrohobjekt:

```valueAtDeviceReset": xxx```

```"valueAtDeviceInit": xxx```

<!-- **Problem 6** Einstellung – Status für SourceAnalytix kann nicht deaktiviert werden

Im RAW NUR "Verbrauch":false umgestellt, gespeichert. Das wurde behalten (wo ggf. noch nicht false, auch bei "enabled": false und bei "costs": false ) In der Objekt-Übersicht ist der Schraubenschlüssel nachwievor blau. Dann mit dem Schraubenschlüssel in das Objekt, SA war nicht der Haken bei aktiviert drin. Dort einmal auf aktiviert, nicht speichern, wieder auf deaktiviert, speichern.
Kontrolle im RAW, ob SA-EIntrag nun weg => jup, is nun fott -->

<!--

* Verfolgen Sie den Verbrauch täglich, wöchentlich, monatlich, vierteljährlich, jährlich
* Kosten berechnen (aktueller Preis ist konfigurierbar)
* Kann für Stromverbrauch, Flüssigkeiten und GAS verwendet werden
* Eingabewerte können wh/kWh/Watt/m3/l . sein

-->

Dieser Adapter hat seine Wurzeln dank Pix im Jahr 2016 https://forum.iobroker.net/viewtopic.php?f=21&t=2262

Welches durch `@hadering` verbessert und auf github https://github.com/hdering/homematic_verbrauchszaehler . veröffentlicht wurde

## Machen
* [ ] Dokumentation!
* [ ] Periodenberechnung wählbar aber noch nicht implementiert
* [ ] monatlicher Selbstkostenpreis noch nicht in der Kalkulation berücksichtigt
* [ ] Neuberechnung auf Basis von Zählerwerten (konfigurierbar nach Datum)
* [ ] Hinzufügen von Objektzuständen für den vorherigen [x]Tag, [x]Woche, [x]Monat, [x]Quartal, [x]Jahr konfigurierbar in den Adaptereinstellungen

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, denken Sie bitte über eine persönliche Spende nach (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um sich einen Überblick über Fehler ihrer Anwendungen zu verschaffen. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, dann ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog

### 0.4.9 (2021-05-31)
* (DutchmanNL) Added support for Admin 5 (Requires Admin >= 5.1.2)
* (Bluefox) Fix error in admin

### 0.4.8 (2021-01-20)
#### Breaking changes
* (DutchmanNL) Breaking!!! Move current values to currentYear [#135](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/135)
* (DutchmanNL & ToTXR4Y) MajorChange !: Replaced **Current_Reading** with **CumulativeReading** [226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)

#### New Features
* (DutchmanNL) Code cleanup
* (DutchmanNL) Add back "currentYear"
* (DutchmanNL) (debug) Logging improved
* (DutchmanNL) Weekly reset of weekdays
* (DutchmanNL) Calculation for all states
* (DutchmanNL) change default log-level to info
* (DutchmanNL) Calculation for previous states [#242](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/242)
* (DutchmanNL) Optimized error reporting (Sentry)
* (DutchmanNL) Removed unneeded settings in configuration
* (DutchmanNL) Implemented new configuration for "currentYear"
* (DutchmanNL & ToTXR4Y) implement "05_currentYear" in year root folder [#280](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/280)
* (DutchmanNL) Implemented category cumulative values under year statistics
* (DutchmanNL & ToTXR4Y) implement cached memory slot for initialisation value [#226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)
* (DutchmanNL & ToTXR4Y) Implement log messages if state attributes are changed
* (DutchmanNL & ToTXR4Y) Implement automatically detection of currency from admin settings [#247](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/247)

#### BugFixes
* (DutchmanNL) Bugfix : dev: 0 bug workaround
* (DutchmanNL) Do not round cumulated reading
* (DutchmanNL) Bugfix : delete states in create function
* (DutchmanNL) Bugfix : quarters.1 has no existing object
* (DutchmanNL) Bugfix : Calculations for "previous" values
* (DutchmanNL) Bugfix : Incorrect initialisation for states
* (DutchmanNL) Bugfix : Avoid NULL & 0 values at night reset
* (DutchmanNL) Bugfix : 05_currentYear has no existing object
* (DutchmanNL) Bugfix : Avoid calculation of non-Initialised states
* (DutchmanNL) Bugfix : Cannot read property 'stateDetails' of null
* (DutchmanNL) Correct error handling of "Watt" state initialisation
* (DutchmanNL) Bugfix : Ensure a proper reset and init of Watt values
* (DutchmanNL) Bugfix : Avoid loop if init value is set and > reading
* (DutchmanNL) Bugfix : Caught sentry error : Alias xxxxx has no target
* (DutchmanNL & ToTXR4Y) Bugfix : Rebuild calculation logic which solves :
  * Watt values : Ensure proper reading start (0 instead of current watt value)
    Watt values : Ensure proper reading calculation with exponent (0 instead of current watt value) [#281](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/281)
  * All calculations : correct handling  of device reset (if value is reset or 0)
* (DutchmanNL) Bugfix : Incorrect initialisation for Watt values with 0 input
* (DutchmanNL) Bugfix : Only create cumulatedXXX in year statistics if activated
* (DutchmanNL) Bugfix : Incorrect warn message if configuration for objects is changed
* (DutchmanNL) Bugfix : Error {Is not a number, cannot continue calculation} if value =  0
* (DutchmanNL) Bugfix : Throw error if value is NULL for troubleshooting instead of handling incorrect calculation
* (DutchmanNL) Bugfix : Ensure daily reset does not destroy cumulative memory value (Fixes NULL values for Watt after night reset)

### 0.4.7 (2020-09-15) Solved NULL error's & daily resets
* (DutchmanNL) Implement Sentry
* (DutchmanNL) Implement configuration for Price definitions
* (DutchmanNL) Bugfix: NULL value issue  at daily reset
* (DutchmanNL) Bugfix: Issue found in selection of category
* (DutchmanNL) Bugfix: Category issue (read value of undefined)
* (DutchmanNL) Bugfix: Issue in storing meter values by month
* (DutchmanNL) Bugfix: Wrong reading value for Watt initialisation
* (DutchmanNL) Bugfix: Warnings at object creations (js-controller 3.x)
* (DutchmanNL) Bugfix: wrong interpretation of start values at value resets
* (DutchmanNL) Bugfix: Proper error message instead of code crash if no cost type defined
* (DutchmanNL) Add device name for log messages if device value < than currently known value
* (DutchmanNL) Bugfix : Crash at adapter start if chosen Type is not present in instance configuration    

### 0.4.2 (2020-04-12) BugFixes
* (DutchmanNL) Translations updated
* (DutchmanNL) Bugfix : Values do not reset at new day start
* (DutchmanNL) Bugfix : Handle calculations when reading = 0
* (DutchmanNL) Bugfix : Handle calculations at initialisation
* (DutchmanNL) Bugfix : Pause all calculation during day-reset
* (DutchmanNL) Do not calculate values is state is update with same value as previous

### 0.4.0 (2020-04-05) Adapter completely redesigned, please test carefully
* (DutchmanNL) Complete code rebuild
* (DutchmanNL) Change data points to root by year
* (DutchmanNL) Delete unneeded states automatically
* (DutchmanNL) Calculation by quarter implemented
* (DutchmanNL) Storage of meter values implemented
* (DutchmanNL) Rebuild calculation logic to handle in memory instead of object DB (performance)

### 0.3.0   
* (DutchmanNL) m³ Implemented

### 0.2.5
* (xXBJXx) Fix wrong storage of start meter values

### 0.2.41
* (DutchmanNL) Fix wrong storage of daily reset of meter values

### 0.2.3
* (Xoroles & DutchmanNL) fix watt calculation, thank you @Xoroles !

### 0.2.29
* (DutchmanNL) implemented w to kWh calculations :) with thanks to @AlCalzone and @andiling !

### 0.2.276
* (DutchmanNL) implemented meter readings
* (DutchmanNL & @AlCalzone) code improvements & stability
* (DutchmanNL) fix issue with liquid unit reading (m3)

### 0.2.273
* (DutchmanNL) fix issue in daily reset of start values
* (DutchmanNL) Fix badges in readme
* (DutchmanNL) exclude calculations of `w` from current routines (it will be implemented in next versions)

### 0.2.272
* (DutchmanNL) change logic of initialisation
* (DutchmanNL) fix issue in calculation handling
* (DutchmanNL) extract unit definition to central function
* (DutchmanNL) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (DutchmanNL) implement compact mode
* (DutchmanNL) fix testing issues
* (DutchmanNL) fix error "unit" or "tolowercase" is undefined
* (DutchmanNL) fixed installation issues

### 0.2.27
* (DutchmanNL) fixed issue related to multihost installations with slave as target

### 0.2.26
* (DutchmanNL) fixed issue in calculations for gas environments and liquids
* (DutchmanNL) improve logging related to issue analytics

### 0.2.25
* (DutchmanNL) add option in state setting to automatically OR manually choose the measurement unit (for cases device state does not have correct value)

### 0.2.24
* (DutchmanNL) add support for heating pumps
* (DutchmanNL) improvements in adapter configuration screen

### 0.2.2
* (DutchmanNL) fixed reset of start values
* (DutchmanNL) removed uneeded logging "Write calculations for : "
* (DutchmanNL) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise, only erros will be shown and add/del devices
* (DutchmanNL) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (DutchmanNL) small fixed in configuration screen to show logging options

### 0.2.1
* (DutchmanNL) fixed "current_day" missing in object tree
* (DutchmanNL) fixed log messages "removed from SourceAnalytix"
* (DutchmanNL) fixed unit issue to support upper and lower case in values
* (DutchmanNL) fixed unit issue replace strange characters
* (DutchmanNL) remove intervall setting from configuration screen (handle by state subscription now!)
* (DutchmanNL) remove start measurement from state configuration screen (not need, please use day start, week start etc !)

### 0.2.0
* (DutchmanNL) rebuild logic to calculate values (beta testing)
* (DutchmanNL) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (DutchmanNL) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (DutchmanNL) fixed issue incorrect states are added to monitoring
* (DutchmanNL) fixed issue calculation not stopped when state removed from monitoring
* (DutchmanNL) always store all current measurements to values of categories regardless setting year etc
* (DutchmanNL) code cleanup and optimisation
* (DutchmanNL) added logging option "status notification"
* (DutchmanNL) implement new translation mechanism


### 0.1.9 
* (DutchmanNL) Adapter moved to community development tree
* (DutchmanNL) added npm version and test-status to readme
* (DutchmanNL) finalized new konfiguration screen & translations
* (DutchmanNL) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (DutchmanNL) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (DutchmanNL) added options to year analytics to choose values (days,weeks,years etc)
* (DutchmanNL) option added for Developer logging
* (DutchmanNL) Basic price is currently not considered in cost calculations !
* (DutchmanNL) Values day start, week start etc are currently not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (DutchmanNL) konfiguration pages completely redesigned : Please do not enter values yet !
* (DutchmanNL) master konfiguration added to globally define costs
* (DutchmanNL) intervall settings moved to global setting instead of each state separated
* (DutchmanNL) instead of cost-price in each state use drop down menu to choose values from global settings
* (DutchmanNL) fixed naming and translations

### 0.1.6
* (DutchmanNL) fixed data reset for quarter values (thank you Jens !)
* (DutchmanNL) fixed usage of alias
* (DutchmanNL) fixed issue in calculation of earnings and delivery
* (DutchmanNL) logging improvement
* (DutchmanNL) fixed log messages
* (DutchmanNL) calculation for m3 values
* (DutchmanNL) calculation for l values

### 0.1.5
* (DutchmanNL) improved state write logic, only sent write commando when needed

### 0.1.3
* (DutchmanNL) add support for calculation of Wh values

### 0.1.0
* (DutchmanNL) first public beta release
* (DutchmanNL) fixed translations
* (DutchmanNL) rebuild calculation logic
* (DutchmanNL) fixed calculation of start offset
* (DutchmanNL) adjustable if state is used for consumption or delivery
* (DutchmanNL) limited possible logging to kWh only for this moment
* (DutchmanNL) only create states and channels for logging types selected

### 0.0.9
* (DutchmanNL) fixed wrong calculation of start values
* (DutchmanNL) fixed wrong calculation of quarter values
* (DutchmanNL) prepare public beta and travis testing
* (DutchmanNL) change name to SourceAnalytix
* (DutchmanNL) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (DutchmanNL) configurable unit for every state, automatically from object state. Currently, only kWh supported !

### 0.0.8
* (DutchmanNL) configurable intervall for every state

### 0.0.7
* (DutchmanNL) automated reset of start values

### 0.0.6
* (DutchmanNL) fixed issue with travis build
* (DutchmanNL) fixed wrong information in package-json

### 0.0.4
* (DutchmanNL) cost calculation
* (DutchmanNL) adjustable starting point of measurement
* (DutchmanNL) support of multiple device states instead of 1
* (DutchmanNL) fixed calculation of current consumptions

### 0.0.3
* (DutchmanNL) code optimisation

### 0.0.2
* (DutchmanNL) creation of object structure
* (DutchmanNL) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL

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