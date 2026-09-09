---
chapters: {"pages":{"en/adapterref/iobroker.poolcontrol/README.md":{"title":{"en":"ioBroker.poolcontrol"},"content":"en/adapterref/iobroker.poolcontrol/README.md"},"en/adapterref/iobroker.poolcontrol/docs/en/help.md":{"title":{"en":"PoolControl – Help & Documentation"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/help.md"},"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md":{"title":{"en":"PoolControl – Function Overview"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/docs/en/function_overview.md
title: PoolControl - Funktionsübersicht
hash: ECvNCMcrZAbMi2IehpQw2TeCTGVZaDImssPL0mzwHx8=
---
# PoolControl – Funktionsübersicht

## 1. Was ist PoolControl?

PoolControl ist ein ioBroker-Adapter zur Steuerung und Überwachung eines privaten Poolsystems. Der Adapter vereint Pumpensteuerung, Temperaturauswertung, Solarsteuerung, Betrieb von Photovoltaik-Überschussstrom, Heizungssteuerung, Laufzeit- und Verbrauchsanalysen sowie Text- und Sprachausgabe in einer gemeinsamen Objektstruktur.

Der Adapter ist modular aufgebaut. Beim Start werden zunächst die Datenpunkte erstellt und anschließend die einzelnen Hilfsmodule gestartet. Die zentrale Pumpenumschaltung erfolgt über`pump.pump_switch` ; eine konfigurierte reale Steckdose wird vom Pumpenhelfer damit synchronisiert.

Die verfügbaren Datenpunkte können im ioBroker-Objektbaum, in VIS, Blockly und anderen Adaptern verwendet werden. PoolControl stellt zahlreiche strukturierte Text-, JSON- und HTML-Datenpunkte bereit, die direkt in VIS, Blockly oder anderen Visualisierungssystemen genutzt werden können.

## 2. Hauptfunktionen

PoolControl deckt folgende Hauptbereiche ab:

- Pumpensteuerung mit automatischen, zeitbasierten, manuellen, PV- und Systemmodi
- Prioritäts- und Besitzlogik über`pump.active_helper`
- Temperaturmanagement für bis zu sechs Sensorfunktionen einschließlich Diagnose und Wiederherstellung
- Standard-Sonnenschutz und erweiterter Sonnenschutz
- Photovoltaik-Überschusssteuerung der Pumpe
- Heizungs- oder Wärmepumpensteuerung
- Frostschutz
- Laufzeit-, Umlauf-, Verbrauchs- und Kostenberechnung
- Plausibilitätsdiagnostik für die Zirkulationsberechnung unter`circulation.plausibility`
- Tägliche, wöchentliche und monatliche Statistiken zu den Temperaturen
- Solar Insights und Photovoltaic Insights unter`analytics.insights.*`
- Zentrale Text- und Sprachausgabe über eine gemeinsame Warteschlangenstruktur
- Diagnostischer Bereich`SystemCheck.debug_logs`
- pH-, TDS- und ORP/Redox-Bewertung ohne automatische Dosierung
- Optionale zusätzliche Aktuatoren für Beleuchtung, zusätzliche Pumpen und pumpengekoppelte Geräte
- Folgepumpengeräte mit Validierung externer Zielzustände

## 3. Pumpensteuerung

Die Pumpe ist der zentrale Aktor des Adapters. Der interne Schaltzustand wird gespeichert in`pump.pump_switch` Wenn in der Admin-Konfiguration ein echter Socket konfiguriert ist,`pumpHelper` spiegelt diesen internen Zustand im externen ioBroker-Datenpunkt wider und übernimmt umgekehrt Änderungen vom Socket zurück in den PoolControl-Status.

Folgende Pumpenmodi werden im Code unterstützt oder verwendet:

- `auto` : normaler automatischer Betrieb, der unter anderem für Solar- und Heizungsanlagen relevant ist
- `auto_pv` PV-Überschussbetrieb
- `manual` : manuelle Bedienung
- `time` : Zeitsteuerung
- `off` : aus
- `controlHelper` : interne Steuerung für Wartung, Rückspülung und zusätzliche Pumpvorgänge
- `timeHelper` ,`frostHelper` ,`heatHelper` ,`speechTextHelper` : Interne Status-/Hilfsmodi, die von Hilfsfunktionen festgelegt oder ausgewertet werden.

Die Prioritätenverwaltung erfolgt über`pump.active_helper` Es zeigt an, welcher Helfer die Pumpe aktuell besitzt oder die Prioritätskontrolle darüber hat. Im Code sind insbesondere folgende Punkte sichtbar:

- `controlHelper` für Wartungsarbeiten, Rückspülungen und zusätzliche Pumpvorgänge
- `timeHelper` für aktive Zeitfenster
- `solarHelper` für Standard-Solarbetrieb
- `solarExtendedHelper` für verlängerten Solarbetrieb
- `photovoltaicHelper` für PV-Überschussbetrieb
- `frostHelper` zum Frostschutz
- `heatHelper` für Heizbetrieb

Mehrere Helfer überprüfen diesen Wert, bevor die Pumpe umgeschaltet wird. Dies verhindert beispielsweise, dass Solar- oder PV-Anlagen die aktive Wartung oder die Zeitsteuerung außer Kraft setzen.

Die automatische Zusatzpumpfunktion dient dazu, das tägliche Umwälzziel zu erreichen. Sie benötigt in der Regel keine Temperaturwerte. Ist die Solarsteuerung aktiv und liegen sowohl die Kollektor- als auch die Pooltemperatur im zulässigen Bereich, wird die Zusatzpumpfunktion deaktiviert, solange der Kollektor nicht wärmer als der Pool ist.

Der Basiszirkulationsfaktor wird gespeichert in`general.min_circulation_per_day` Der Admin-Wert ist nur der Anfangswert bei der Ersteinrichtung oder wenn der Status leer/ungültig ist. Der Status ist beschreibbar, persistent und beschränkt auf`0.5` Zu`3.0` Aktualisierung der Änderungen`circulation.daily_required` Und`circulation.daily_remaining` Die

Optional,`control.circulation.temperature_factor.*` erhöht diesen Basiswert ausgehend von einem konfigurierten Temperaturschwellenwert. Der ausgewählte Sensor muss aktiviert sein und einen gültigen Wert liefern. Der Basiswert wird nicht überschrieben;`general.min_circulation_effective_per_day` enthält den effektiven Wert begrenzt auf`3.0` , während`general.min_circulation_effective_reason` enthält die technische Begründung. Das Tagesziel und der Restbetrag basieren auf dem Effektivwert;`circulation.daily_total` bleibt unverändert.

Die Zirkulationsberechnung wird auch diagnostisch überwacht unter`circulation.plausibility` Die Diagnose prüft auf unplausible Pumpenleistung, unplausible Durchflussberechnungen und sprunghafte Änderungen des täglichen Fördervolumens, die schneller auftreten als physikalisch plausibel. Sie speichert ausschließlich Diagnoseinformationen in ihren eigenen Zuständen und ändert weder die Pumpensteuerung noch die PV- oder Solarlogik oder die Berechnungsformel für den Förderstrom.

Die Sicherheitslogik umfasst:

- Spiegelung der aktuellen Pumpenleistung auf`pump.current_power`
- Fehlerstatus`pump.error`
- Statusausgabe`pump.status`
- Überlastprüfung basierend auf`pump.pump_max_watt`
- Erkennung von Strom, obwohl die Pumpe ausgeschaltet ist oder Strom fehlt, während die Pumpe eingeschaltet ist
- Kurze Kulanzzeiten nach Start und Stopp, damit kurze Stromübergänge nicht sofort als Fehler behandelt werden.
- Optionale Sicherheitsbedienung im manuellen Modus über`pump.manual_safety_enabled`

Darüber hinaus gibt es Wohn- und Lernbereiche:

- `pump.live.*` für aktuelle Leistung, Stromstärke, Durchfluss in Prozent und letzten Durchflusswert
- `pump.learning.*` für erlernte Leistungs- und Durchflussbereiche, Abweichungen und Toleranzen
- `pump.learning.reset` um die gelernten Pumpenwerte nach Pumpenwechseln oder fehlerhafter Anlernung zurückzusetzen;`pump.learning.tolerance_percent` wird gehalten
- `pump.pressure.*` für Drucksensordaten, Trendanalyse, Lernwerte und Diagnose
- `pump.speed.*` für Empfehlungen oder Zustände einer variablen Pumpendrehzahl

`pump.learning.*` Die Funktion bleibt rein passiv und dient der Diagnose. Die Reset-Taste hat auch keinen Einfluss auf die Pumpensteuerung, den PV-Modus, die Live-Werte oder andere Funktionen.`pump.pressure.learning.*` Die

## 4. Zeitkontrolle

Die Zeitsteuerung befindet sich unter`timecontrol.*` Es gibt drei Zeitfenster (`time1` ,`time2` ,`time3` ) mit:

- Aktiver Schalter
- Startzeit
- Endzeit
- Auswahl unter der Woche
- optionaler Intervallbetrieb (`interval_active` ,`interval_every_min` ,`interval_run_min` )

Der`timeHelper` Es wird jede Minute geprüft, ob eines der aktiven Zeitfenster für den aktuellen Wochentag gültig ist. Die Zeitsteuerung schaltet nur um, wenn`pump.mode = time` ist festgelegt.

Wenn ein Zeitfenster aktiv ist, setzt der Helfer die Einstellungen`pump.active_helper` Zu`timeHelper` Aktualisierungen`speech.time_active` und Schalter`pump.pump_switch` Wenn das Zeitfenster abläuft oder der Pumpmodus verlassen wird, gibt der Helfer die Priorität wieder frei.

Wenn der Intervallbetrieb aktiviert ist, ist der Zyklus stets an den Startzeitpunkt des jeweiligen Fensters gekoppelt. Standardmäßig beträgt die Intervallperiode 60 Minuten und die Laufzeit 15 Minuten. Die Laufzeit darf die Intervallperiode nicht überschreiten; bei einer ungültigen Konfiguration bleiben die Benutzereinstellungen erhalten, und das betroffene Fenster wechselt zurück in den bestehenden kontinuierlichen Betrieb.

Mehrere Fenster verwenden eine ODER-Verknüpfung, daher kann ein pausiertes Intervall kein anderes Fenster deaktivieren, das gerade eine Aktion anfordert. Die exklusive Endzeit begrenzt die Laufzeit jedes Intervalls. Da die bestehende 60-Sekunden-Prüfung unverändert bleibt, kann die physische Umschaltung fast 60 Sekunden nach dem berechneten Zeitpunkt erfolgen.`timecontrol.status_text` liefert den übersetzten Diagnosestatus.

## 5. Sonnenschutz

Die Standard-Sonnenschutzsteuerung befindet sich unter`solar.*` und wird ausgeführt von`solarHelper` Es arbeitet im Modus`solar.control_mode = standard` Die

Wichtige Datenpunkte sind:

- `solar.solar_control_active` : Hauptschalter für Solarsteuerung
- `solar.control_mode` Auswahl zwischen Standard- und erweitertem Modus
- `solar.temp_on` Einschaltschwelle
- `solar.temp_off` : Abschaltschwelle
- `solar.hysteresis_active` : vorbereitete Hystereseoption
- `solar.request_active` : interne Solaranfrage
- `solar.collector_surface_delta` : Stromkollektor minus Beckenoberflächendifferenz
- `solar.collector_warning` : Warnungsstatus des Sammlers
- `solar.warn_active` ,`solar.warn_temp` ,`solar.warn_speech` : Warnungslogik

Die Standardlogik vergleicht die Kollektortemperatur mit der Beckenoberflächentemperatur.`solar.collector_surface_delta` Die aktuelle Differenz wird als numerischer Echtzeitdatenpunkt angezeigt. Die Pumpe wird angefordert, sobald der Kollektor ausreichend warm ist und die Differenz positiv ist. Sie wird nicht angefordert, wenn die Abschalttemperatur unter den konfigurierten Schwellenwert fällt oder keine positive Differenz vorliegt.

Die erweiterte Solarsteuerung legt die Stromdifferenz zwischen Kollektor und ausgewählter Poolreferenz offen über`solar.extended.collector_pool_reference_delta` Die Referenz wird weiterhin ausgewählt über`solar.extended.pool_temperature_source` Die

Hinweis: Änderungen an der Referenz für Solar Extended-Pools (`solar.extended.pool_temperature_source` ) werden automatisch zur Laufzeit angewendet. Ein Neustart des Adapters ist nicht erforderlich. Da Solar Extended mit einem zyklischen Prüfintervall arbeitet, werden Aktualisierungen der Berechnung, der Steuerlogik und der`solar.extended.collector_pool_reference_delta` Der Vorgang kann bis zu etwa 60 Sekunden dauern.

Die Steuerung ist nur aktiv, wenn:

- Die Poolsaison ist aktiv
- Solarenergie wird aktiviert
- `pump.mode = auto`
- Der Solarmodus ist`standard`
- Es gibt keine höhere Priorität durch`controlHelper` oder`timeHelper`

Die Warnmeldungen des Sammlers`solar.collector_warning` Wenn die Warntemperatur erreicht ist, wird sie automatisch zurückgesetzt. Sobald die Temperatur des Kollektors auf 90 Prozent des Warnwertes oder darunter sinkt, wird die Warntemperatur automatisch zurückgesetzt.

## 6. Photovoltaik- und PV-Überschussfunktionen

Die PV-Funktion befindet sich unter`photovoltaic.*` und wird ausgeführt von`photovoltaicHelper` Es liest zwei externe Datenpunkte aus der Admin-Konfiguration:

- PV-Erzeugungsleistung
- Haushaltsverbrauch

Daraus berechnet der Adapter:

- `photovoltaic.power_generated_w`
- `photovoltaic.power_house_w`
- `photovoltaic.power_surplus_w`
- `photovoltaic.surplus_active`
- `photovoltaic.status_text`
- `photovoltaic.last_update`

Die Einschaltlogik nutzt den berechneten Überschuss. Ein PV-Überschuss gilt als aktiv, wenn:

`PV generation - house consumption >= pump.pump_max_watt + photovoltaic.threshold_w`

Die Pumpe wird nur dann eingeschaltet, wenn:

- Die Saison ist aktiv
- `pump.mode = auto_pv`
- Der PV-Überschuss ist ausreichend
- Die optionale Umlaufsperre gilt nicht.

Mit`photovoltaic.afterrun_min` Eine Nachlaufpumpe kann konfiguriert werden, nachdem der Überschuss aufgebraucht ist.`photovoltaic.ignore_on_circulation` Die PV-Steuerung kann gestoppt oder verhindert werden, wenn das tägliche Zirkulationsziel bereits erreicht ist.

Ein Sonderfall ist die Sicherheitsüberbrückung bei solarer Überhitzung: wenn`solar.collector_warning` Wenn der PV-Helfer aktiv ist, kann er die Pumpe unabhängig vom PV-Überschuss einschalten, um den Kollektor zu schützen.

## 7. Temperatur- und Sensorfunktionen

Temperaturmanagementprozesse mit bis zu sechs Sensorrollen:

- `collector` : Sammler
- `outside` : Außentemperatur
- `surface` : Beckenoberfläche
- `ground` : Beckenboden
- `flow` : fließen
- `return` : zurückkehren

Die Sensoren werden in der Admin-Konfiguration aktiviert und mit externen ioBroker-Objekt-IDs verbunden.`temperatureHelper` Liest externe Werte und schreibt sie in die eigenen Datenpunkte des Adapters unter`temperature.<sensor>.current` Die

Zusätzlich werden folgende Werte berechnet:

- Tägliches Minimum und tägliches Maximum pro Sensor
- Wechselgeld pro Stunde (`delta_per_hour` )
- `temperature.delta.collector_outside`
- `temperature.delta.surface_ground`
- `temperature.delta.flow_return`

Die Temperaturdiagnose protokolliert für jede aktive Sensorrolle den letzten gültigen Wert, dessen Zeitstempel, die seit der letzten Aktualisierung verstrichenen Minuten sowie den Quellstatus. Der Quellstatus zeigt normale, verzögerte, fehlende oder ungültige Aktualisierungen an. Wechselt ein Sensor in den Warnzustand, kann die Wiederherstellungslogik den konfigurierten externen Status einmalig selektiv auslesen und, falls der Wert gültig ist, den normalen Verarbeitungsprozess erneut durchführen.

Diese Werte werden in verschiedenen Bereichen verwendet, darunter Solarenergie, Solar Insights, Heizung, Frostschutz, Statistik und Textausgabe.

## 8. Heizung und Heizfunktionen

Die Heizungssteuerung befindet sich unter`heat.*` und wird ausgeführt von`heatHelper` Laut README befindet sich diese Funktion in der Testphase; die Steuerlogik ist jedoch im Code vorhanden.

Die Heizung kann einen externen Schaltaktor oder einen booleschen Steuerdatenpunkt ansteuern. Wichtige Einstellungen und Zustände sind:

- `heat.control_active` Heizungsregelung aktiv
- `heat.control_type` : Art des externen Ziels
- `heat.control_object_id` : externer Steuerungsdatenpunkt
- `heat.target_temperature` : Zieltemperatur
- `heat.max_temperature` : maximale Sicherheitstemperatur
- `heat.pump_prerun_minutes` : Pumpenvorlauf vor Heizbeginn
- `heat.pump_afterrun_minutes` : Pumpennachlauf nach Ende der Erwärmung
- `heat.heating_request` : internes Anforderungssignal
- `heat.active` ,`heat.blocked` ,`heat.mode` ,`heat.reason` ,`heat.info`

Die Steuerung funktioniert nur, wenn:

- Die Poolsaison ist aktiv
- Es ist kein Wartungsmodus aktiv
- Die Heizungsregelung ist eingeschaltet.
- `pump.mode = auto`
- Es liegt eine gültige Oberflächentemperatur vor.
- Die Höchsttemperatur wurde noch nicht erreicht.

Der Helfer schaltet die Pumpe bei Bedarf ein und speichert intern, ob er sie selbst eingeschaltet hat. Beim Abschalten wird die Pumpe vom Heizungshelfer nur dann abgeschaltet, wenn dieser zuvor die Steuerung übernommen hatte. Dadurch werden Konflikte mit anderen Betriebsarten reduziert.

## 9. Bereiche Statistik, Trends und Einblicke

### `analytics.statistics.*`

Der Statistikbereich wertet Temperaturdaten aus. Für aktive Sensoren werden Tageswerte gespeichert.`analytics.statistics.temperature.today.*` :

- Minimum
- Maximal
- Durchschnitt
- Zeiten des Minimums und Maximums
- Anzahl der Messpunkte
- JSON- und HTML-Zusammenfassungen
- Tägliche manuelle Rückstellung pro Sensor

Darüber hinaus gibt es wöchentliche und monatliche Helfer:

- `statisticsHelperWeek` schreibt unter`analytics.statistics.temperature.week.*`
- `statisticsHelperMonth` schreibt unter`analytics.statistics.temperature.month.*`

Beide Bereiche generieren außerdem strukturierte Zusammenfassungen für einzelne Sensoren und Gesamtausgaben.

### Solar Insights

Solar Insights befinden sich unter`analytics.insights.solar.*` Dieser Bereich dient der Analyse, nicht der Steuerung.

Die Struktur ist wie folgt:

- `analytics.insights.solar.inputs.*`
- `analytics.insights.solar.calculation.*`
- `analytics.insights.solar.results.*`
- `analytics.insights.solar.logbook.*`
- `analytics.insights.solar.debug.*`

Der Code beschreibt Solar Insights ausdrücklich als Schätzwert. Je nach Verfügbarkeit werden Kollektor, Referenzpool, Durchfluss, Rücklauf, Außentemperatur, Durchflussrate und Wetterdaten berücksichtigt. Unter anderem werden folgende Werte berechnet bzw. ausgegeben:

- verwendete und verfügbare Sensoren
- Qualitätsniveau und Vertrauenswert
- Pool-Referenzquelle
- Flussquelle
- thermische Leistung
- geschätzter täglicher Zuwachs
- geschätztes Wirkungsgradverhältnis
- Aktive Minuten heute
- Spitzenleistung heute
- JSON-, HTML- und Textausgabe
- Debug-Gründe und letzte Aktualisierung

Die Funktion „Solar-Logbuch“ schreibt aktuelle Einträge, ein Tagesprotokoll als JSON/Text und HTML-Einträge unter`analytics.insights.solar.logbook.*` Die

### Einblicke in die Photovoltaik

Photovoltaic Insights befinden sich unter`analytics.insights.photovoltaic.*` Dieser Bereich analysiert PV-Überschusslaufzeiten und verfügt auch nicht über eine eigene Steuerungslogik.

Unter anderem werden folgende Dinge aufgezeichnet:

- PV-Überschussstrom
- ob ein PV-Überschuss aktiv ist
- Pumpenleistung
- ob der PV-Helfer die Pumpe besitzt
- Laufzeit heute
- Energieverbrauch im PV-Betrieb
- geschätzte Einsparungen basierend auf dem Strompreis
- Zählung beginnt heute
- Zusammenfassung als Text, JSON und HTML
- Debug-Texte und Gründe

Die Laufzeit wird nur dann gezählt, wenn ein PV-Überschuss aktiv ist und`photovoltaicHelper` Die Pumpe ist im Besitz des Eigentümers. Laut Codekommentaren werden Nachlaufzeiten der Pumpe nicht als PV-Überschusslaufzeit gezählt.

### Pool Insights

Pool Insights befinden sich unter analytics.insights.pool.\*. Dieser Bereich bietet eine regelbasierte Gesamtanalyse und liest vorhandene PoolControl-Daten aus den Bereichen Temperatur, Laufzeit, Pumpe, Solar, Photovoltaik, Verbrauch und Wasserchemie. Version 1 ist standardmäßig deaktiviert und erstellt ausschließlich eigene Analyseausgaben in den Formaten Text, JSON und HTML.

Pool Insights steuert weder die Wasserzufuhr noch die Pumpe oder die Aktuatoren. Optional kann die Zusammenfassung an speech.queue übergeben werden, wenn der entsprechende Schalter aktiviert ist.

### COP- und Effizienzfunktionen

Effizienzwerte und Schätzwerte sind im Code, insbesondere im Bereich „Solar Insights“, sichtbar, beispielsweise thermische Leistung, geschätzter Tagesgewinn und geschätzter Wirkungsgrad. Eine eigenständige, vollständig separate COP-Regelung für Wärmepumpen lässt sich aus dem Code nicht direkt ableiten.

## 10. Sprach- und Textausgabe

Zentrale Ausgänge laufen über`speech.queue` Viele Helfer schreiben Nachrichten in diese Warteschlange;`speechHelper` verarbeitet sie weiter. Die zentrale Warteschlangenstruktur verhindert konkurrierende oder doppelte Nachrichtensysteme. Neue Sprach- und Textausgaben sind absichtlich für die zentrale Verarbeitung vorgesehen.`speech.queue` Die

Wichtige Datenpunkte sind:

- `speech.active` : globale Aktivierung
- `speech.queue` : zentrale Nachrichtenwarteschlange
- `speech.last_text` : letzter Ausgabetext
- `speech.start_text` ,`speech.end_text` : Pumpentexte
- `speech.solar_active` ,`speech.time_active` ,`speech.frost_active` : interne Kontextsignale
- `speech.amazon_alexa.*` Alexa-Ruhezeiten und -Status

Je nach Konfiguration kann der Helfer folgende Ausgaben tätigen:

- Alexa, über einen konfigurierten externen Datenpunkt
- Telegram, via`sendTo`
- E-Mail, via`sendTo`

Für Alexa gibt es Ruhezeiten an Wochentagen und Wochenenden. Während einer Ruhezeit ist die Alexa-Ausgabe gesperrt; andere Ausgabekanäle sind davon nicht automatisch betroffen.

Textausgaben existieren hauptsächlich als lesbare Zustände in den jeweiligen Bereichen, zum Beispiel Status, Debug, KI, Chemie, Solar Insights, PV Insights, JSON und HTML-Ausgaben. Ein separater Objektkanal namens`textoutputs` ist aus dem Code nicht eindeutig ableitbar.

## 11. Chemie, pH-Wert, TDS und ORP/Redox-Bereiche

Die Chemiebereiche sind vorhanden und werden beim Start des Adapters erstellt. Sie dienen aktuell der Analyse, Auswertung und Trendbeobachtung von Wasserwerten. Sie werden für Auswertungen und Empfehlungen verwendet, nicht für die automatische Dosierung, Chlorregelung oder automatische Aktuatorsteuerung.

### pH-Wert-Bewertung

Das Gebiet`chemistry.ph.*` Unterstützt:

- Aktivierung der pH-Wert-Messung
- Manuelle pH-Wert-Bestimmung
- Externer ioBroker-Datenpunkt als pH-Quelle
- Plausibilitätsprüfung
- Quellstatus
- Messortlogik
- Verlauf des letzten und vorherigen gültigen Werts
- Bewertungs- und Empfehlungstexte
- Optionaler manueller Mischvorgang

Im Code steht ausdrücklich: keine automatische Dosierung und keine Steuerung durch chemische Aktuatoren.

### TDS-Bewertung

Das Gebiet`chemistry.tds.*` Unterstützt:

- Aktivierung der TDS-Auswertung
- Manueller TDS-Wert in ppm
- Externer ioBroker-Datenpunkt als Quelle
- Plausibilitätsprüfung
- Messortlogik
- Referenzwert
- Geschichte
- Trends über 24 Stunden, 7 Tage und 30 Tage
- Bewertung anhand von Absolutwert, Referenzabweichung und Trend
- Text-, JSON- und HTML-Zusammenfassungen

Auch hier heißt es im Code: keine automatische Steuerung, keine automatische Dosierung und keine Pumpensteuerung.

### ORP/Redox-Bewertung

Das Gebiet`chemistry.orp.*` ist als Analyse- und Empfehlungsbereich vorhanden. Er unterstützt manuelle Werte oder einen externen ioBroker-Datenpunkt als ORP-Quelle, Plausibilitätsprüfungen, Messortlogik, Verlauf, Trends, Auswertung und Zusammenfassungen in Text-, JSON- und HTML-Format.

Die ORP-Bewertung kann einen pH-Referenzwert verwenden und diesen unabhängig vom ORP-Wert synchronisieren. Sie dient der Klassifizierung und Empfehlung von Maßnahmen. Es erfolgt keine automatische Chlorregelung, keine automatische Dosierung und keine automatische Pumpen- oder Aktorsteuerung auf Basis des ORP-Werts.

### Zweistufige begrenzte Chemiegeschichte

Die bestehenden Zustände \`chemistry.ph.history.samples\_json\`, \`chemistry.tds.history.samples\_json\` und \`chemistry.orp.history.samples\_json\` speichern weiterhin die kurzfristige Historie. In einem 15-Minuten-Intervall speichert jeder Zustand maximal 7 Tage, 672 Proben und 64 KB UTF-8-Daten. Die neuen internen Zustände \`chemistry.ph.history.daily\_json\`, \`chemistry.tds.history.daily\_json\` und \`chemistry.orp.history.daily\_json\` bilden persistente Ringpuffer auf Basis eines lokalen Kalendertages. Diese enthalten die Werte für Minimum, Maximum, Durchschnitt, letzten Wert und Anzahl und umfassen maximal 32 Einträge und 8 KB pro Zustand.

Die 24-Stunden- und 7-Tage-Vergleiche verwenden samples\_json; die 30-Tage-Referenz nutzt vorzugsweise den letzten Wert des entsprechenden Tagesaggregats. Alle bestehenden Referenz-, Delta-, Trend- und Zusammenfassungszustände bleiben unverändert. Eine noch gültige skalare 30-Tage-Referenz und sicher lesbare Legacy-Samples füllen den Tagespuffer bei seiner ersten Initialisierung; anschließend wird das kompakte Tagesaggregat für jedes neu gespeicherte gültige Sample aktualisiert. Zu große Legacy-JSON-Dateien werden vor dem Parsen verworfen. Die Tagesaggregate ergänzen die Rohdaten, ersetzen sie aber nicht. Rohdaten langfristiger Historien gehören weiterhin in eine ioBroker-Historien- oder Zeitreihendatenbank.

Falls js-controller nicht starten kann, weil states.jsonl bereits zu groß ist, ist eine manuelle oder externe Bereinigung erforderlich, bevor der Adapter ausgeführt werden kann.

### ### Chemiewerkzeuge

PoolControl enthält einfache Chemie-Rechner als Hilfsmittel für die manuelle Poolpflege. Diese Rechner dienen ausschließlich Berechnungs- und Informationszwecken. Es werden keine Chemikalien automatisch dosiert.

**Aktuell enthalten:**

- **pH Plus Rechner**

  - Berechnet die benötigte Menge an pH Plus
  - Berücksichtigt das Poolvolumen, den aktuellen pH-Wert und den Ziel-pH-Wert.
  - Alle Eingabewerte können manuell angepasst werden.

- **pH-Minus-Rechner**

  - Berechnet die benötigte Menge an pH Minus
  - Berücksichtigt das Poolvolumen, den aktuellen pH-Wert und den Ziel-pH-Wert.
  - Alle Eingabewerte können manuell angepasst werden.

- **Salzrechner**

  - Berechnet die benötigte Salzmenge in Kilogramm.
  - Berücksichtigt das Poolvolumen, die aktuelle Salzkonzentration und die angestrebte Salzkonzentration.
  - Alle Eingabewerte können manuell angepasst werden.

**Merkmale:**

- Vorbefüllungen verfügbare PoolControl-Werte (z. B. Poolvolumen)
- Eingabewerte können jederzeit manuell überschrieben werden.
- Plausibilitätsprüfungen und Fehlererkennung
- Ergebnistexte mit zusätzlichen Informationen
- Keine automatische Chemikaliendosierung
- Nur zu Berechnungs- und Informationszwecken

## 12. Hardware-, MQTT- und ESP32-Integration

Die bestehende Implementierung verbindet externe Hardware größtenteils über frei konfigurierbare ioBroker-Objekt-IDs:

- Pumpenanschluss
- Aktuelle Pumpenleistung
- Temperatursensoren
- Drucksensor
- PV-Erzeugung
- Haushaltsverbrauch
- Heizungsaktuator
- Solar Extended Aktuator
- Beleuchtung und zusätzliche Pumpen

Zusätzliche Aktuatoren sind erhältlich unter`actuators.*` Dazu gehören Beleuchtung, Zusatzpumpen und Nachführpumpen. Nachführpumpen können externe Geräte automatisch mit dem Pumpenstatus koppeln. Externe Zielzustände werden validiert, einschließlich Existenz, boolescher Typ und Schreibbarkeit. Typische Beispiele sind UV-Systeme, Wasserspiele und Zusatzfilter.

Die Integration von Drucksensoren ist implementiert. Der Administratorhinweis erwähnt explizit externe Sensoren und eine PoolControl PressureBox.`pump.pressure.*` Enthält aktuellen Druck, vorherigen Druck, Normalbereich, gespeicherte Werte, Trendwerte, Diagnosedaten und Reset-Funktion.

Die MQTT/ESP32-Integration wird in den Entwicklungsnotizen erwähnt als`mqttNodeHelper.js` Für externe PoolControl-Knoten ist im aktuellen Projektstatus keine entsprechende Hilfsdatei vorhanden. Daher sollte dieser Bereich als Vorbereitung oder Planung betrachtet werden.

Vorbereitete oder geplante Hardware-Boxen:

- PressureBox: sichtbar unterstützt oder vorbereitet in der Konfigurationshinweis- und Druckbereichsanzeige
- TempBox, LevelBox und zusätzliche Sensorboxen: in der README-Datei/den Entwicklungsnotizen als geplante Erweiterungen erwähnt.
- AquaBox: Nicht eindeutig aus dem Code ableitbar.

## 13. VIS-, HTML- und Widget-Bereiche

Der Adapter generiert zahlreiche Datenpunkte, die direkt in VIS, VIS2, Blockly oder Dashboards verwendet werden können. Dazu gehören Status, Laufzeit, Temperatur, Statistiken, chemische Zusammensetzung, Solarstrom und PV-Leistung.

HTML-Ausgaben sind in mehreren Analysebereichen vorhanden:

- Temperaturstatistik
- Solar Insights
- Solarlogbuch
- Einblicke in die Photovoltaik
- pH-Wert-Bewertung
- TDS-Bewertung
- ORP/Redox-Bewertung

JSON-Ausgaben sind ebenfalls vorhanden, insbesondere für:

- Statusübersichten
- Statistische Zusammenfassungen
- Solar Insights
- Einblicke in die Photovoltaik
- pH-Wert-Bewertung
- TDS-Bewertung
- ORP/Redox-Bewertung

Derzeit liegt der Fokus auf der Bereitstellung strukturierter Datenpunkte, HTML-Ausgaben und JSON-Zusammenfassungen zur kostenlosen Verwendung in VIS, Blockly oder anderen Dashboard-Systemen.

## 14. Diagnose- und Debug-Funktionen

Der zentrale Diagnosebereich heißt`SystemCheck.debug_logs.*` Die

Es bietet:

- Auswahl eines Zielgebiets über`SystemCheck.debug_logs.target_area`
- Kontinuierliches Protokoll unter`SystemCheck.debug_logs.log`
- Funktion löschen über`SystemCheck.debug_logs.clear`
- Überwachung sehr schneller Zustandsänderungen
- Die Protokollgröße wird auf ungefähr die letzten 60.000 Zeichen begrenzt.

Darüber hinaus existieren zahlreiche bereichsspezifische Status- und Debug-Datenpunkte, zum Beispiel:

- `status.summary`
- `status.overview_json`
- `status.system_ok`
- `status.system_warning`
- `status.system_warning_text`
- `pump.status`
- `pump.error`
- `solar.extended.reason`
- `solar.extended.info`
- `analytics.insights.solar.debug.*`
- `analytics.insights.photovoltaic.debug.*`

Zusätzliche Diagnosewerte für die Kreislaufberechnung werden gespeichert unter`circulation.plausibility` Sie zeigen Status, Schweregrad, Meldungsschlüssel, Warnungen zu Stromfluss/Sprung und die zugehörigen Vergleichswerte an. Diese Werte helfen bei der Fehlersuche bei ungewöhnlichen Durchflusswerten, führen aber keine automatische Korrektur durch.

Der Adapter hat außerdem einen`migrationHelper` Diese Funktion wird beim Startvorgang zuletzt vor den Hilfsfunktionen ausgeführt und bereitet Struktur- und Aktualisierungsanpassungen vor. Details zu den einzelnen Migrationen werden in dieser Übersicht nicht gesondert behandelt.

## 15. Export- und Analysefunktionen

Es werden hauptsächlich interne Analyseergebnisse implementiert:

- JSON-Zusammenfassungen
- HTML-Zusammenfassungen
- Textzusammenfassungen
- Tägliche, wöchentliche und monatliche Statistiken
- Einblicke in Solarenergie und Photovoltaik
- pH-Wert-Bewertung
- TDS-Trendauswertung
- ORP/Redox-Bewertung
- Statusübersicht als JSON

Ein direkter CSV- oder Excel-Export wird in der README-Datei und den Entwicklerhinweisen als geplante Erweiterung erwähnt. Eine fertige CSV-Exportfunktion lässt sich aus dem aktuellen Code jedoch nicht eindeutig ableiten.

## 16. Anforderungen und typische Verwendung

Technische Anforderungen gemäß den Projektunterlagen:

- Node.js`>= 22`
- ioBroker js-Controller`>= 6.0.11`
- ioBroker-Administrator`>= 7.6.20`
- Der Adapter läuft als JavaScript/Node.js-Daemon.
- Hauptsächlich hilfs- und ereignisbasierte Verarbeitung

Typischer Aufbau:

- Legen Sie die Poolgröße und die Mindestumwälzung in den allgemeinen Einstellungen fest.
- Pumpenanschluss konfigurieren und optional Stromanschluss
- Richten Sie bei Bedarf Temperatursensoren ein, insbesondere für Solar-, Heizungs-, Frostschutz- und Analysefunktionen.
- Wählen Sie den gewünschten Pumpenmodus aus.
- Aktivieren Sie Solar-, PV-, Zeitschaltuhr-, Heizungs- und Frostschutzsysteme nach Bedarf.
- Sprachausgabe nur aktivieren, wenn Alexa/Telegram/E-Mail korrekt konfiguriert sind
- Integrieren Sie Analysebereiche in VIS oder Dashboards über JSON/HTML/Text-Zustände

## 17. Wichtige Hinweise und Systemgrenzen

- Der Adapter kann reale Hardware umschalten. Die sichere elektrische und hydraulische Installation ist nicht in den Vorschriften geregelt und muss vom Betreiber gewährleistet werden.
- Die chemischen Parameter pH-Wert, TDS und ORP/Redox dienen der Auswertung und Empfehlung von Empfehlungen. Es findet keine automatische Dosierung oder automatische Chlorregelung statt.
- Solar Insights und Photovoltic Insights sind Analysebereiche. Sie ersetzen keine kalibrierten Energiezähler.
- Die Werte von Solar Insights werden im Code als Schätzwerte implementiert und hängen stark von der Sensorqualität, den Durchflusswerten und den verfügbaren Temperaturdaten ab.
- PV Insights berücksichtigt nur den PV-Überschussbetrieb, wenn`photovoltaicHelper` Die Pumpe gehört ihm.
- Eigene VIS-Widgets, CSV/Excel-Export und MQTT/ESP32-Knoten sind als Planungs- oder Vorbereitungsmaßnahmen erkennbar, existieren aber im aktuellen Code nicht als fertige Module.
- Bei Funktionen, die externe Objekt-IDs verwenden, hängt das Verhalten von korrekt konfigurierten ioBroker-Datenpunkten und geeigneten Rollen/Werten ab.

## 18. Zusammenfassung für neue Benutzer

PoolControl ist ein modularer Pooladapter, der die Pumpe als zentrales Element steuert und Solar-, PV-, Zeitsteuerungs-, Frostschutz-, Heizungs-, Sensor-, Statistik- und Meldungsfunktionen darum herum organisiert.

Für den Anfang genügt in der Regel Folgendes:

- Pumpenanschluss konfigurieren
- Beckengröße und Umwälzziel festlegen
- Richten Sie bei Bedarf Temperatursensoren ein, insbesondere für Solar-, Heizungs-, Frostschutz- und Analysefunktionen.
- Wählen Sie den gewünschten Pumpenmodus aus.
- Aktivieren Sie dann schrittweise Solarenergie, Photovoltaik, Heizung, Sprachübertragung und Analysefunktionen.

Die wichtigsten Zustände für den täglichen Gebrauch sind`pump.status` ,`pump.pump_switch` ,`pump.mode` ,`pump.active_helper` ,`status.summary` ,`circulation.daily_remaining` ,`solar.request_active` ,`photovoltaic.surplus_active` und die Ausgaben unter`analytics.*` Die

Vorbereitete oder geplante Bereiche sind im Projekt sichtbar, sollten aber nicht mit vollständig fertigen Funktionen verwechselt werden. Insbesondere MQTT/ESP32-Knoten, native VIS-Widgets und der CSV-/Excel-Export sollten anhand des aktuellen Code-Standes als Planungs- oder Vorbereitungsbereiche klassifiziert werden.