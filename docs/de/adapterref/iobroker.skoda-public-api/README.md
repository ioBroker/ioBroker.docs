---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/README.md
title: ioBroker.skoda-public-api
hash: 6NtPA4PJ5bAhjF/Y3m8MovE65BUGaPfPx8gshEpUhfw=
---
![Logo](../../../en/adapterref/iobroker.skoda-public-api/admin/skoda-public-api.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.skoda-public-api.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.skoda-public-api.svg)
![Anzahl der Installationen](https://iobroker.live/badges/skoda-public-api-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/skoda-public-api-stable.svg)
![NPM](https://nodei.co/npm/iobroker.skoda-public-api.png?downloads=true)
![Test und Freigabe](https://github.com/tmarthy/ioBroker.skoda-public-api/workflows/Test%20and%20Release/badge.svg)

# ioBroker.skoda-public-api

## skoda-public-api-Adapter für ioBroker

Lesen und steuern Sie Škoda-Fahrzeuge über die offizielle [MyŠkoda Public API](https://public.api.connect.skoda-auto.cz/docs) .

Der Adapter ist auf npm veröffentlicht. Einbindung in ioBroker `latest` Das Repository wird unter [ioBroker.repositories#6592](https://github.com/ioBroker/ioBroker.repositories/pull/6592) verfolgt. Entwicklungsstatus und offene Aufgaben sind in [HANDOFF.md](/#/docs/adapterref/iobroker.skoda-public-api/HANDOFF.md) dokumentiert.

### Die eine Einschränkung, die alles prägt

Die API erlaubt **20 Anfragen pro Stunde und Fahrzeugidentifikationsnummer (VIN)** . Es gibt einen einzigen Lese-Endpunkt, mehrere Befehls-Endpunkte, keine Push-Funktionen, keine Webhooks und keinen Endpunkt für den Betriebsstatus – ein Befehl gibt Folgendes zurück: `202 Accepted` Das Ergebnis erfahren Sie erst durch eine spätere Abfrage, was erneut Datenvolumen kostet. Eine nahezu Echtzeit-Überwachung ist mit dieser API nicht möglich, ebenso wenig wie die Verladung von PV-Überschussstrom mit Strommodulation. Planen Sie entsprechend.

## API-Schlüssel abrufen

Der Adapter verwendet die **offizielle** MyŠkoda Public API – nicht die per Reverse Engineering entwickelte App-Schnittstelle, die `iobroker.vw-connect` spricht mit.

1. Öffnen Sie die MyŠkoda-App (Version 8.16 oder neuer) und gehen Sie zu **API-Schlüssel** .
2. Wählen Sie die Fahrzeuge aus, auf die der Schlüssel zugreifen darf. Der Schlüssel ist an diese Auswahl gebunden: Eine nicht ausgewählte Fahrgestellnummer (VIN) wird mit einem Fehlercode beantwortet. `403`, egal wie korrekt es aussieht.
3. Kopieren Sie den Schlüssel in die Adapterinstanz. Er **läuft** nach einer gewissen Zeit ab – der Adapter überwacht das Ablaufdatum und warnt Sie (siehe [Schlüsselablauf](#key-expiry) ).

Der Schlüssel wird verschlüsselt gespeichert (`encryptedNative` Geben Sie es in der Admin-Oberfläche ein, **nicht** im Objektbrowser: Ein Klartextwert wird dort beim Start als verschlüsselt behandelt und wird zu unleserlichem Datenmüll.

## Konfiguration

| Feld                                                       | Standard   | Was es tut                                                                                                                             |
| ---------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| API-Schlüssel                                              | —          | Der Schlüssel aus der App. Erforderlich.                                                                                               |
| Fahrzeuge                                                  | —          | Eine Zeile pro Fahrgestellnummer. **Die API verfügt über keine Fahrzeugliste** , daher wird jede Fahrgestellnummer manuell eingegeben. |
| Basisintervall                                             | 15 Minuten | Schrittfrequenz, wenn nichts passiert. Mindestens 5.                                                                                   |
| Intervall während des Ladevorgangs oder der Klimatisierung | 5 Minuten  | Trittfrequenz während der Fahrt. Mindestens 3.                                                                                         |
| Maximaler Intervall für ein Schlaffahrzeug                 | 60 Minuten | Obergrenze für den Frische-Rückgang, siehe unten.                                                                                      |
| Für Befehle reservierte Anfragen                           | 6          | Die Abstimmung endet, sobald nur noch so viele Anfragen übrig sind.                                                                    |
| Befehlslebensdauer                                         | 10 Minuten | Ein in der Warteschlange befindlicher Befehl, der innerhalb dieser Zeit nicht gesendet werden konnte, wird verworfen.                  |
| DREHEN                                                     | —          | Wird nur für die Zusatzheizung benötigt. Niemals in einen Ruhezustand versetzen.                                                       |
| Parkposition lesen                                         | An         | Im ausgeschalteten Zustand wird die Position **nicht einmal von der API angefordert** .                                                |

Es gibt eine Schaltfläche **„Verbindung testen“** . Sie sendet genau eine Anfrage (von 20) und teilt Ihnen in einfachen Worten mit, was falsch ist – ein Tippfehler in der Fahrzeugidentifikationsnummer (VIN) und ein Schlüssel, der nicht zum Fahrzeug passt, führen beide zum gleichen Ergebnis. `403` Und das schlussfolgert niemand aus dem reinen Fehler.

Es gibt bewusst **kein Feld für den API-Server** . Ein sichtbares Feld „API-Server“ würde dazu verleiten, den Adapter – und seinen Schlüssel – auf einen externen Host zu verweisen. Für die Entwicklung wird die Basis-URL aus der Umgebungsvariablen bezogen. `SKODA_API_BASE_URL` Die

## Was Sie erhalten

Der Objektbaum unter `<vin>` Die API-Antwort wird 1:1 abgebildet. Objekte werden **nur für Teile erstellt, die das Fahrzeug tatsächlich liefert** – ein batterieelektrischer Enyaq hat keine `fuelStatus` Daher treten solche Zustände nicht auf. Nichts wird jemals automatisch gelöscht.

Adapterspezifische Darstellungen:

- `<vin>.parkingPosition.position` —`lat;lon` in einem Bundesstaat, für VIS-Karten und Geofencing-Adapter.
- `<vin>.chargingProfiles.profiles.<id>.*` — Die Profile werden anhand **der Profil-ID** und nicht anhand des Index abgerechnet. Andernfalls würden beim Löschen eines Profils in der App alle anderen Profile stillschweigend verschoben. `configurationJson` Stellt das vollständige Profil für atomare Lese-/Schreibaktualisierungen bereit.

### Aktualisieren-Schaltfläche

Jedes konfigurierte Fahrzeug verfügt über ein `<vin>.refresh` Schaltfläche. Schreiben `true` mit `ack: false` um eine frühzeitige Abfrage anzufordern, beispielsweise wenn Ihre Wanddose ein angeschlossenes Kabel erkennt:

```javascript
setState('skoda-public-api.0.<VIN>.refresh', true);
```

Die Taste wird zurückgesetzt auf `false` mit `ack: true` Die Verarbeitung des Auslösers bestätigt nicht, dass aktuelle Fahrzeugdaten vorliegen. Anfragen vor oder während derselben Abfrage werden zusammengefasst. Die Abfrage umfasst die Parkposition, sofern aktiviert und unterstützt. Die üblichen Kontingente, Befehlsreserven und Fehlerverzögerungen gelten weiterhin. Anschließend wird die automatische Abfrage im Intervall des gemeldeten Fahrzeugstatus und der Aktualität fortgesetzt. Das kürzere aktive Intervall gilt während des Lade- oder Klimatisierungsprozesses, nicht nur beim Anschließen an die Steckdose. Diese Schaltfläche kann Škoda nicht dazu zwingen, eine aktuellere Position bereitzustellen, und es wird keine zusätzliche Überprüfungsabfrage durchgeführt, wenn die Position noch veraltet ist.

### Der `info` Staaten

| Zustand                                    | Bedeutung                                                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                          | `false` Wenn der Schlüssel abgelehnt wird (401/403). **Bleibt `true` Wenn das Kontingent erschöpft ist** – ein leeres Budget ist normal, kein Fehler.                                                    |
| `<vin>.rateLimit.*`                        | `limit`, `remaining`, `resetAt`, `lastRequestAt` — das separate Budget für diese Fahrgestellnummer, aus dem `RateLimit-*` Header und der Speicher des Adapters werden über Neustarts hinweg gespeichert. |
| `info.apiKey.expiresAt`, `.daysRemaining`  | vom `X-API-Key-Expires-At` Kopfzeile jeder Antwort.                                                                                                                                                      |
| `<vin>.info.dataAge`                       | Sekunden seit dem neuesten `carCapturedTimestamp` in der Antwort.                                                                                                                                        |
| `<vin>.info.lastErrors`                    | Der `errors[]` der letzten Antwort als JSON.                                                                                                                                                             |
| `<vin>.info.lastCommand.*`                 | `name`, `result`, `timestamp`, `problemType` des letzten Befehls.                                                                                                                                        |
| `<vin>.info.commandConfirmation.<group>.*` | Annahme, Zielvorgabe, Frist und beobachtete Bestätigung des zuletzt angenommenen Befehls in jeder Kontrollgruppe.                                                                                       |
| `<vin>.info.polling.nextPollAt`            | Geplante Fälligkeitszeit des nächsten Abfrageversuchs in Unix-Millisekunden; `0` während der Abstimmung, ausgesetzt oder wiederholt lokale staatliche Schreibvorgänge.                                   |
| `<vin>.info.polling.lastSuccessfulPollAt`  | Zeitpunkt der letzten erfolgreichen Antwort der Fahrzeug-API in Unix-Millisekunden; bleibt über Neustarts hinweg erhalten. `0` falls keine aufgezeichnet wurden.                                         |
| `<vin>.info.polling.reason`                | Aktueller Scheduler-Status oder Grund für das Warten, mit lesbaren Bezeichnungen im Objektbrowser.                                                                                                      |

**Unvollständige Antworten sind normal.** Meldet die API ein fehlerhaftes Teil oder fehlt ein Feld in einem zurückgegebenen Teil, behalten die zugehörigen Zustände ihren letzten Wert mit der Qualität „nicht gut“. Dies gilt auch für Zustände, die nach einem Neustart und dem Entfernen von Ladeprofilen erhalten bleiben. Zurückgegebene Werte erhalten ihre Qualität zurück, selbst wenn sich ihr Wert nicht geändert hat. Teile, die absichtlich von der Anfrage ausgeschlossen wurden, bleiben unverändert. `dataAge` Misst das Alter des neuesten Fahrzeug-Zeitstempels bei der letzten erfolgreichen Abfrage; es handelt sich nicht um eine Live-Uhr oder eine Frischegarantie für jeden einzelnen Staat.

### Umfragediagnostik

Die drei `info.polling` Die Statusinformationen werden für jedes konfigurierte Fahrzeug separat verwaltet, auch vor der ersten erfolgreichen Antwort. Sie werden aktualisiert, wenn der Scheduler seinen Plan ändert, und verbrauchen keine zusätzlichen API-Anfragen.

| `reason`           | Bedeutung                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `STARTUP`          | Die erste Abstimmung steht an.                                                                                                                                     |
| `POLLING`          | Eine Fahrzeuganfrage wird bearbeitet.                                                                                                                              |
| `IDLE_INTERVAL`    | Warten auf das normale Intervall.                                                                                                                                  |
| `ACTIVE_INTERVAL`  | Warten auf das Lade-/Klimatisierungsintervall.                                                                                                                     |
| `COMMAND_INTERVAL` | Das kürzere Intervall wird nach einem Befehl verwendet.                                                                                                            |
| `UNCHANGED_DATA`   | Die Fahrzeugzeitstempel haben sich nicht geändert, daher wurde das Intervall verlängert. Dies ist kein Beweis dafür, dass sich das Fahrzeug im Ruhemodus befindet. |
| `MANUAL_REFRESH`   | Durch eine manuelle Aktualisierung wurde die nächste Abstimmung vorgezogen.                                                                                        |
| `VERIFICATION`     | Nach Annahme des Befehls wurde eine Überprüfungsabfrage geplant.                                                                                                   |
| `COMMAND_RESERVE`  | Die Abfrage hat die Befehlsreserve erreicht; Anfragen für Befehle werden bis zum Zurücksetzen des Kontingents zurückgehalten.                                      |
| `QUOTA`            | Warten auf Kontingent, einschließlich API-Ratenbegrenzungsantworten.                                                                                               |
| `STARTUP_GUARD`    | Warten auf den Schutz des gespeicherten Kontingents nach einem Neustart.                                                                                           |
| `AUTH_ERROR`       | Der API-Schlüssel wurde abgelehnt; die Abfragefrequenz wird auf das Fehlerintervall reduziert.                                                                     |
| `ERROR_RETRY`      | Warten vor dem erneuten Versuch einer fehlgeschlagenen Anfrage.                                                                                                    |
| `ERROR_INTERVAL`   | Warten auf das reguläre Intervall nach einer fehlgeschlagenen Anfrage oder nach Ausschöpfung der Wiederholungsversuche.                                            |
| `WRITE_RETRY`      | Es wurde eine API-Antwort empfangen, aber die lokalen Statusänderungen müssen wiederholt werden; es ist noch keine neue API-Anfrage geplant.                       |
| `SUSPENDED`        | Die API gab den Fehlercode 404 zurück; die Abfrage dieser Fahrgestellnummer wird bis zum Neustart des Adapters ausgesetzt.                                         |

`nextPollAt` Es handelt sich um einen geplanten Zeitpunkt, nicht um eine Garantie für aktuelle Daten zu diesem Zeitpunkt. Das Datenkontingent wird vor dem Senden erneut geprüft, und die Anfrage eines anderen Fahrzeugs kann die Übermittlung verzögern. Eine erfolgreiche Abfrage kann unveränderte oder unvollständige Fahrzeugdaten enthalten: Vergleichen Sie `info.dataAge`, das Individuum `carCapturedTimestamp` Werte und Qualitätsmerkmale für Frische. Befehle und der Administratorverbindungstest werden nicht fortgesetzt. `lastSuccessfulPollAt` Lokale Schreibwiederholungsversuche speichern auch den Zeitpunkt der ursprünglichen erfolgreichen Antwort. Wenn der Adapter gestoppt wird, behalten diese Zustände ihre letzten Werte; der Zeitplan ist nur gültig, solange die Instanz ausgeführt wird, und wird beim nächsten Start überschrieben.

### Anzeigeeinheiten

Die folgenden numerischen Werte verwenden besser lesbare Anzeigeeinheiten. Ihre Status-IDs behalten die API-Feldnamen einschließlich der ursprünglichen Einheitensuffixe bei:

| Staat unten `<vin>`                                       | Anzeigeeinheit | Beispiel                    |
| -------------------------------------------------------- | -------------- | --------------------------- |
| `charging.status.battery.remainingCruisingRangeInMeters` | km             | API `352000` → Zustand `352` |
| `activeVentilation.durationInSeconds`                    | min            | API `600` → Zustand `10`     |
| `auxiliaryHeating.durationInSeconds`                     | min            | API `90` → Zustand `1.5`      |

Andere Bereiche und der Kilometerzähler verwenden bereits Kilometer; die Ladezeit wird bereits in Minuten angegeben. Werte werden ohne Rundung dividiert. Vorhandene Objekteinheiten und Standardbeschreibungen werden aktualisiert, sobald der entsprechende Wert das nächste Mal empfangen wird; benutzerdefinierte Namen bleiben erhalten. Skripte, die diese drei Zustände auslesen, müssen km/min verwenden. Vorhandene aufgezeichnete Zeitreihen werden nicht überschrieben. API-Antworten und Befehlsnutzdaten behalten die API-Einheiten bei.

## Fahrzeugsteuerung

Jeder vom Fahrzeug unterstützte Bereich erhält drei Zustände, zum Beispiel unter `<vin>.charging`:

- `enabled` Der Schalter (switch) enthält den **Zielzustand** . Durch Schreiben wird ein Befehl gesendet – es sei denn, der Zielzustand entspricht bereits dem, was die letzte Abfrage ergeben hat; in diesem Fall wird nichts gesendet. `info.lastCommand.result` liest `COALESCED` Die
- `start` Und `stop` (Schaltflächen) **erzwingen** den Aufruf. Sie sind der Ausweg, wenn die abgefragten Daten zehn Minuten alt und nicht mehr aktuell sind.

Der `enabled` Schalter akzeptieren nur boolesche Werte `true` Und `false` Andere Werte, einschließlich Zeichenketten wie z. B. `"true"`, Zahlen und `null` Sie werden ohne API-Anfrage oder Bestätigung ignoriert. Sie ersetzen keine ausstehenden Befehle oder Aktualisierungen. `info.lastCommand` Die

** `ack = true` Das bedeutet „an die API übergeben“, nicht „das Auto hat es getan“.** Die API beantwortet einen Befehl mit `202 Accepted` Es bietet keinen Endpunkt, der das Ergebnis meldet; der Adapter plant 60 Sekunden später eine Überprüfungsabfrage, und nur diese Abfrage zeigt an, was tatsächlich passiert ist. Jeder, der darauf aufbauend Automatisierungen entwickelt, muss dies wissen.

Während ein Befehl auf Bestätigung wartet, ist auch die Wiederholung desselben Schalterwerts möglich. `COALESCED` Ein gegenteiliger Wert kann dennoch einen Befehl senden. Ein übereinstimmender Fahrzeugzeitstempel, der neuer ist als der des akzeptierten Befehls, beendet diese Wartephase. Ohne Bestätigung dauert sie maximal die konfigurierte Befehlslebensdauer (standardmäßig 10 Minuten). Danach kann ein neuer Schreibvorgang am Schalter wiederholt werden. Das Ablaufen des Befehls führt nicht automatisch zu einer erneuten Befehlsübertragung.

### Sichtbare Befehlsbestätigung

Die Bestätigung nutzt **ausschließlich die bestehenden Fahrzeugabfragen** . Diese Funktion fügt keine API-Aufrufe, keine schnellere Abfrage und keine zusätzlichen Verifizierungsanfragen hinzu. Die bestehende Verifizierungsabfrage nach einem akzeptierten Befehl unterliegt weiterhin dem Kontingent. Ein separater lokaler Timer protokolliert Timeouts, ohne das Fahrzeug abzufragen oder den Befehl erneut zu senden.

Nach einem von der API akzeptierten Befehl prüfen `<vin>.info.commandConfirmation.<group>.status`:

| Status        | Bedeutung                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WAITING`     | Die API hat den Befehl akzeptiert; passende neuere Fahrzeugdaten wurden noch nicht gefunden.                                                                                                       |
| `CONFIRMED`   | Eine spätere bestehende Abfrage meldete den angeforderten Wert mit einem Zeitstempel, der neuer war als die API-Akzeptanz.                                                                         |
| `TIMED_OUT`   | Innerhalb der konfigurierten Befehlslebensdauer, gemessen ab API-Akzeptanz, wurde keine Bestätigung beobachtet. Dies beweist jedoch **nicht** , dass das Fahrzeug den Befehl nicht ausgeführt hat. |
| `INTERRUPTED` | Ein konfigurierter Adapterneustart hat eine unvollständige Beobachtung des vorherigen Prozesses beendet. Es wird kein Befehl automatisch erneut gesendet.                                          |

Gruppen sind `charging`, `airConditioning`, `auxiliaryHeating`, `activeVentilation`, `chargingLimit`, `chargingMode` Und `chargingProfiles.<id>` Jeder Eintrag enthält den zuletzt **akzeptierten** Befehl für diese Steuerung; es handelt sich nicht um eine Befehlshistorie. Ein neu akzeptierter Befehl ersetzt den vorherigen Eintrag in derselben Gruppe. Andere Gruppen und Fahrzeuge bleiben unabhängig. Wiederholte zusammengefasste Schreibvorgänge verlängern die Bestätigungsfrist nicht. In der Warteschlange befindliche, ungültige oder abgelehnte Befehle erstellen oder ersetzen keine Bestätigungsdatensätze; ihr Ergebnis bleibt verfügbar. `info.lastCommand` Die

Jede Gruppe stellt außerdem Folgendes bereit:

- `name`: der akzeptierte Befehl, zum Beispiel `charging.start` Die
- `target`: der angeforderte Wert als JSON (`true`, `90`, `"TIMER"`, oder ein vollständiges Profil).
- `sentAt`: API-Akzeptanzzeit in Unix-Millisekunden.
- `expiresAt`: Bestätigungsfrist, in Unix-Millisekunden.
- `confirmedAt` Zeitpunkt, zu dem die übereinstimmenden Daten beobachtet wurden, in Unix-Millisekunden; `0` ansonsten.

Ein ioBroker-JavaScript-Skript kann beispielsweise Bestätigungen ohne Abfragen überwachen:

```js
on({ id: 'skoda-public-api.0.<VIN>.info.commandConfirmation.charging.status', change: 'any' }, obj => {
    if (obj.state.ack && obj.state.val === 'CONFIRMED') {
        log('The requested charging state was observed in newer vehicle data.');
    }
});
```

Der Status wird nach den anderen Feldern des Datensatzes geschrieben, auch wenn ein neuer akzeptierter Befehl einen bereits vorhandenen ersetzt. `WAITING`. Lesen `name`, `target` Und `sentAt` um die Beobachtung zu identifizieren. Die Bestätigung ändert nichts. `info.lastCommand.result` oder schreiben Sie den Kontrollwert erneut: `SENT` Und `ack: true` weiterhin API-Akzeptanz bedeuten.

Der entsprechende Antwortblock muss über einen eigenen neueren verfügen. `carCapturedTimestamp` Fehlende oder defekte Teile, nicht zusammengehörige Zeitstempel und unbekannte Fahrzeugzustände können einen Befehl nicht bestätigen. Ein neuerer übereinstimmender Zustand ist eine Beobachtung, keine serverseitige Empfangsbestätigung; ein anderer Client könnte dieselbe Einstellung angefordert haben. Daten, die erstmals nach dem Stichtag erfasst werden, werden im Datensatz gelöscht. `TIMED_OUT` Bei einem konfigurierten Neustart werden nur unfertige Vorgänge ausgeführt. `WAITING` Aufzeichnungen werden `INTERRUPTED` Abgeschlossene Datensätze bleiben erhalten. Während der Adapter gestoppt ist, werden keine lokalen Bestätigungstimer ausgeführt und gespeicherte Werte bleiben unverändert.

### Ladegrenze

Schreibe eine Zahl mit `ack = false` Zu `skoda-public-api.0.<vin>.charging.settings.targetStateOfChargeInPercent` Um den maximalen Ladezustand festzulegen, beispielsweise 80, 90 oder 100. Dieser Status wird angezeigt, sobald das Fahrzeug ein Ladeziel meldet. Im ioBroker JavaScript-Adapter:

```js
setState('skoda-public-api.0.<vin>.charging.settings.targetStateOfChargeInPercent', 90, false);
```

Der Adapter akzeptiert nur **die Werte 50, 60, 70, 80, 90 und 100 Prozent** , entsprechend den 10-Prozent-Schritten der App. Andere Werte werden ohne API-Aufruf lokal abgelehnt. Derselbe Status zeigt nach dem Schreiben den angeforderten Wert an und wird durch Fahrzeugabfragen aktualisiert. Vorhandene Objekte werden beim ersten Abfragevorgang nach dem Neustart des Adapters automatisch so aktualisiert, dass sie mit einem Minimum von 50, einem Maximum von 100 und einer Schrittweite von 10 beschreibbar sind. `ack = true` Nach dem Senden bedeutet API-Akzeptanz; überprüfen Sie diesen Status nach der Verifizierungsabfrage, um zu bestätigen, dass das Fahrzeug das Limit angewendet hat. Wiederholte Meldungen eines bereits gemeldeten oder noch ausstehenden akzeptierten Ziels werden zusammengefasst. Ausstehende Limitänderungen ersetzen sich gegenseitig unabhängig vom Ein-/Ausschalten des Ladevorgangs. Ungültige Eingaben schlagen lokal fehl, ohne das API-Kontingent zu verbrauchen; die Ergebnisse werden protokolliert. `info.lastCommand` Ein abgelehnter Wert wird nicht automatisch erneut versucht.

### Lademodus

Schreibe eine Zeichenkette mit `ack: false` Zu `<vin>.charging.settings.preferredChargeMode`:

```js
setState('skoda-public-api.0.<VIN>.charging.settings.preferredChargeMode', 'TIMER', false);
```

Der Adapter akzeptiert `MANUAL`, `TIMER`, `TIMER_CHARGING_WITH_CLIMATISATION`, `PREFERRED_CHARGING_TIMES`, `ONLY_OWN_CURRENT`, `IMMEDIATE_DISCHARGING` Und `HOME_STORAGE_CHARGING` **nur wenn das Fahrzeug diesen Modus auflistet `charging.settings.availableChargeModes` ** Nach dem Start ist eine erfolgreiche Abfrage erforderlich. Unbekannte, nicht verfügbare oder nicht-Zeichenkettenwerte führen zu einem lokalen Fehler, ohne dass das Kontingent verbraucht wird. Der bestehende Modusstatus ist nach dem Upgrade bei der ersten Abfrage beschreibbar.

### Ladeprofile

#### Einzelne Felder bearbeiten und zusammen anwenden

Nach einer erfolgreichen Umfrage wird jedem vollständigen Profil ein lokaler Redakteur zugewiesen. `<vin>.chargingProfiles.profiles.<id>.edit`:

1. Ändern `name` oder verfügbare Felder unter `settings`, wie zum Beispiel `settings.targetStateOfChargeInPercent` Und `settings.maxChargingCurrent` Die
2. Vorhandene Timer anpassen unter `timers.<timerId>` (`enabled`, `type`, `time`, `oneOffDay` und Einzelpersonen `recurringOn.MONDAY` …`SUNDAY` Schalter), oder vorhandene Fenster unter `preferredChargingTimes.<windowId>` (`enabled`, `startTime`, `endTime`).
3. Booleschen Wert schreiben `true` mit `ack: false` Zu `edit.apply` ( **Profiländerungen anwenden** ). Der Adapter validiert und übermittelt das vollständige Profil über die bestehende Warteschlange.

Mehrere Bearbeitungen führen zu **einer Profilaktualisierung** , nicht zu einer Anfrage pro Feld. Staging, Zurücksetzen und Validieren verwenden keine Fahrzeug-API-Anfragen. Es findet kein zusätzlicher Lesevorgang vor der Anwendung statt, kein neues Polling und keine automatische Anwendung oder erneute Übertragung. Bestehende Quoten-, Wiederholungs- und Verifizierungsregeln gelten weiterhin für den übermittelten Befehl. Eine unveränderte Anwendung sendet nichts; wiederholte Anfragen an dasselbe akzeptierte Ziel werden in der Warteschlange zusammengefasst.

Zum Beispiel im ioBroker JavaScript-Adapter:

```js
const edit = 'skoda-public-api.0.<VIN>.chargingProfiles.profiles.1.edit';
await setStateAsync(`${edit}.name`, 'Home', false);
await setStateAsync(`${edit}.settings.targetStateOfChargeInPercent`, 90, false);
await setStateAsync(`${edit}.apply`, true, false);
```

`edit.reset` ( **Profilentwurf zurücksetzen** ) verwirft lokale Änderungen und verwendet das zuletzt abgefragte Profil. `edit.dirty` Zeigt Änderungen gegenüber der Ausgangsvorlage des Entwurfs an; diese Angabe bleibt nach der Einreichung gültig, bis eine Umfrage das Zielwert ermittelt oder Sie sie zurücksetzen. `edit.conflict` weist auf ein geändertes oder nicht verfügbares Basisprofil hin; `edit.message` erklärt Validierung und Übermittlung. Ein Feld `ack: true` Das bedeutet, dass die Befehle **lokal gespeichert** , nicht gesendet oder ausgeführt werden. Die Befehlsergebnisse bleiben in diesem Speicher. `info.lastCommand` Und `info.commandConfirmation.chargingProfiles.<id>` Die

Umfragen sichern bearbeitete Entwürfe. Wenn sich das Profil während der Bearbeitung ändert, ist die Anwendung blockiert: Setzen Sie die Änderungen zurück und wenden Sie sie erneut auf die neue Basis an. Eine andere ausstehende/laufende Profilaktualisierung blockiert ebenfalls die Übermittlung durch den Editor, bis sie abgeschlossen oder abgelaufen ist. Entwürfe werden nach einem Neustart des Adapters nicht wiederhergestellt: Die erste gültige Umfrage initialisiert sie erneut, und gespeicherte Editorwerte können erst nach dieser Umfrage übermittelt werden. Fehlende/fehlerhafte Profile können nicht angewendet werden. Optionale Einstellungen werden nur angezeigt, wenn sie vom Fahrzeug bereitgestellt werden; Timer-/Fenster-IDs und unbekannte API-Felder bleiben erhalten, und Einträge können hier nicht erstellt oder gelöscht werden.

Boolesche und numerische Editorfelder verwenden Konfigurationsrollen, sofern sie innerhalb eines Kanals eindeutig sind (`switch.setting`, `level.setting.battery`, `level.setting.battery.min` Textfelder verwenden den generischen `text` Rollen- und Wochentagswechsel `switch` Detaillierte Rollen kommen daher nie zweimal im selben Kanal vor. Es handelt sich weiterhin um lokale Entwürfe; nur Apply übermittelt sie. Feldnamen und Hilfetexte unterstützen alle ioBroker-Sprachen; Auswahlbezeichnungen, Editormeldungen und Statusbezeichnungen für Abfragen/Bestätigungen verwenden die ioBroker-Systemsprache (starten Sie den Adapter nach dem Ändern der Sprache neu). API-Werte wie z. B. `ONE_OFF` und Diagnosecodes wie `WAITING` oder `QUOTA` Die bestehenden Diagnose-Label-Maps werden migriert, einschließlich der abgeschlossenen Bestätigungen. Die Backend-Protokolle bleiben in englischer Sprache.

`edit.available` Zeigt an, ob die letzte Umfrage ein gültiges Profil enthält. Entfernte Felder, Timer oder Profile behalten ihre letzten Werte, ihre Steuerelemente werden jedoch schreibgeschützt (`common.read: true`, `common.write: false`) mit Qualität `q: 1` und eine erläuternde Beschreibung. Ihre Rollen werden `indicator` für Boolesche Werte (einschließlich deaktivierter Schaltflächen), `value` für Zahlen, und `text` für Zeichenketten. Zurückgebende Felder erhalten ihre ursprünglichen Steuerungsfunktionen zurück; aktive Schaltflächen bleiben schreibgeschützt (`read: false`, `write: true` Direkte Schreibvorgänge in nicht verfügbare Felder werden ignoriert und ihre gespeicherten Werte wiederhergestellt. Sobald ein Feld wieder verfügbar ist, werden seine Steuerelemente und seine Qualität wiederhergestellt. `q: 0` werden automatisch wiederhergestellt. Gespeicherte Editor-Steuerelemente sind beim Start ebenfalls deaktiviert, bis die erste gültige Abfrage erfolgt. Diese Verfügbarkeitsprüfungen verwenden ausschließlich vorhandene Abfragen und lokale ioBroker-Daten.

Vorhandene Objekte erhalten aktualisierte, adaptereigene Metadaten, ohne gelöscht zu werden; benutzerdefinierte Namen und nicht damit zusammenhängende Einstellungen wie die Verlaufskonfiguration bleiben erhalten.

#### Aktualisieren Sie das vollständige JSON direkt

Jedes vollständige Profil mit einer sicheren ganzzahligen ID erhält einen beschreibbaren JSON-String-Status: `<vin>.chargingProfiles.profiles.<id>.configurationJson` Es enthält das vollständige Profil, einschließlich `id`, `name`, `settings`, `timers` Und `preferredChargingTimes` Lesen Sie diesen Zustand, ändern Sie die gewünschten Felder und schreiben Sie das vollständige JSON zurück:

```js
const id = 'skoda-public-api.0.<VIN>.chargingProfiles.profiles.1.configurationJson';
const state = getState(id);
if (state && state.ack && state.q === 0) {
    const profile = JSON.parse(state.val);
    profile.settings.maxChargingCurrent = 'REDUCED';
    setState(id, JSON.stringify(profile), false);
}
```

Die API ersetzt das **gesamte Profil** . Behalten Sie alle Felder bei, die Sie nicht ändern, einschließlich der von der API bereitgestellten Zusatzfelder; senden Sie kein unvollständiges Einstellungsobjekt. Der Adapter validiert Pflichtfelder, numerische IDs, Prozentwerte (0–100), unterstützte Einstellungswerte, boolesche Flags, eindeutige Timer-IDs, Wochentage und Uhrzeiten (`HH:mm` Aktivierte Timer benötigen außerdem eine Uhrzeit und die entsprechende Wochentagsauswahl. Die Uhrzeiten basieren auf der Ortszeit des Fahrzeugs. Die Profil-ID muss mit dem Statuspfad und einem vollständigen Profil aus der letzten Abfrage übereinstimmen. Diese Steuerung aktualisiert bestehende Profile; sie erstellt oder löscht keine. Die bestehenden Profildetails bleiben schreibgeschützt; verwenden Sie die separate Ansicht. `edit` Im unteren Bereich sind die schrittweisen Änderungen vorgesehen.

Wenn eine nachfolgende Abfrage das Profil ändert, entfernt oder auslässt, bevor eine Aktualisierung in der Warteschlange gesendet wird, schlägt die Aktualisierung lokal fehl. Lesen Sie das neueste Profil und senden Sie Ihre Änderungen erneut. Änderungen, die nach der letzten Abfrage in der App vorgenommen wurden, können weiterhin mit einem Schreibvorgang konkurrieren: Die API verfügt über keinen Mechanismus für bedingte Aktualisierungen. Vermeiden Sie daher die gleichzeitige Bearbeitung desselben Profils.

Modus, Ladebegrenzung, Start/Stopp und jedes Profil haben unabhängige Warteschlangeneinträge. Neue Schreibvorgänge ersetzen ausstehende Aktualisierungen für dieselbe Einstellung oder dasselbe Profil; identische gemeldete oder ausstehende akzeptierte Werte werden zusammengeführt. Ungültige Eingaben lassen ausstehende gültige Befehle unberührt und melden `FAILED` ohne Bestätigung. `ack: true` bedeutet API-Akzeptanz; die Verifizierungsabfrage prüft anschließend den gemeldeten Modus/das Profil, vorbehaltlich des üblichen Kontingents. Ein Bestätigungs-Timeout führt nicht automatisch zu einer erneuten Aktualisierung. Die öffentliche API gibt außerdem die unterstützten Operationen bekannt in `<vin>.operations` Die

`info.lastCommand.result` ist eines von:

| Ergebnis              | Bedeutung                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SENT`                | An die API übergeben.                                                                                        |
| `QUEUED`              | Warten auf die Quote; es wird von selbst veröffentlicht.                                                     |
| `COALESCED`           | Keine Anfrage: Das Ziel entspricht dem bekannten Zustand oder einem Befehl, der noch auf Bestätigung wartet. |
| `EXPIRED`             | Aussortiert, konnte innerhalb seiner Lebensdauer nicht versendet werden.                                     |
| `REJECTED_BY_VEHICLE` | Das Fahrzeug hat die Fahrt verweigert (nicht unterstützt, deaktiviert oder belegt).                          |
| `FAILED`              | Alles Weitere – siehe Protokoll.                                                                             |

## Kadenz oder warum Ihre Daten eine Stunde alt sein können

Ein geparktes Fahrzeug meldet **dasselbe** `carCapturedTimestamp` Bei jeder Abfrage. Schnellere Abfragen kosten das gesamte Kontingent und bringen keinerlei Vorteile. Daher verdoppelt der Adapter sein Intervall jedes Mal, wenn sich der Zeitstempel nicht ändert, bis zum konfigurierten Maximum. Sobald das Fahrzeug neue Daten meldet oder ein Befehl gesendet wird, kehrt er sofort zum Basisintervall zurück.

Was Ihnen diese API unabhängig von ihrer Konfiguration nicht bieten kann:

- **Keine sekundengenaue Überwachung.** 20 Anfragen pro Stunde entsprechen einer Anfrage alle drei Minuten, und das ist das gesamte Budget.
- **Es erfolgt keine sofortige Benachrichtigung, wenn der Ladevorgang beendet ist.** Sie erfahren es bei der nächsten Abstimmung.
- **Keine Strommodulation in Ampere.** Die API kann einen Zielladezustand, einen Lademodus und ein Profil festlegen. `REDUCED` /`MAXIMUM` Voreinstellung. Die Stromstärke kann nicht stufenlos angepasst werden, daher wird im Beispiel mit Überladung eine Ein-/Aus-Steuerung verwendet.

## PV-Überschussladung

`examples/pv-surplus-charging.js` ist eine kommentierte Vorlage für den ioBroker JavaScript-Adapter: Einschaltschwelle, Ausschaltschwelle mit Verzögerung, minimale Ein- und Ausschaltzeiten, eine Obergrenze für Schaltvorgänge pro Stunde und Auswertung von `info.lastCommand.result` Die Steuerungslogik befindet sich bewusst **außerhalb** des Adapters – jede PV-Anlage hat unterschiedliche Status-IDs und Zählersemantik.

Zwei Dinge entscheiden darüber, ob das für Sie funktioniert:

- **Stellen Sie den Wechselstrom-Ladestrom ein auf `REDUCED` in der MyŠkoda App oder im entsprechenden Ladeprofil.** Profilaktualisierungen werden unterstützt. `settings.maxChargingCurrent` Es gibt keinen dedizierten Befehl für die globale Stromeinstellung oder die Einstellung beliebiger Stromstärken. `MAXIMUM` Das Fahrzeug zieht die Leistung, die die Wallbox liefert, und ein kleiner Überschuss reicht dafür nicht aus.
- **Messen Sie, wie viel Ihr Fahrzeug tatsächlich verbraucht** (`charging.status.chargePowerInKw`) und legen Sie Ihre Schwellenwerte anhand dieser Zahl fest, nicht anhand der Angabe auf der Wanddose.

## Ablaufdatum des Schlüssels

Der Schlüssel kann nicht automatisch erneuert werden – die API bietet diese Funktion nicht an, und die Erstellung eines neuen Schlüssels erfordert einen Benutzer mit dem entsprechenden Telefon. Da die Werte im Baum ihren letzten Zustand beibehalten, wenn das Abrufen fehlschlägt, würde ein abgelaufener Schlüssel andernfalls wochenlang unbemerkt bleiben. Der Adapter eskaliert daher einmal täglich: ein `info` Nach 14 Tagen eine Meldung, nach 7 Tagen eine Warnung, nach 2 Tagen ein Fehler, ab 7 Tagen zusätzlich eine ioBroker-Benachrichtigung und eine Warnung, sobald der Schlüssel verloren geht.

## Fehlerbehebung

| Symptom                                                      | Ursache                                                                                                                                                                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `403 api-key-not-authorized`                                 | Entweder enthält die Fahrzeugidentifikationsnummer (VIN) einen Tippfehler, oder das Fahrzeug wurde bei der Schlüsselerstellung nicht ausgewählt. Die Schaltfläche **„Verbindung testen“** gibt dies an. |
| `401 api-key-expired`                                        | Neuer Schlüssel erforderlich. `info.connection` geht zu `false` und die Abstimmungsfrequenz sinkt auf einmal pro Stunde.                                                                                  |
| `429 rate-limit-exceeded`                                    | Budget aufgebraucht. Normalbetrieb; der Adapter wartet auf das Zeitfenster und hält den Betrieb aufrecht. `info.connection` bei `true` Die                                                                |
| Befehle bewirken nichts.                                     | Überprüfen `info.lastCommand.result` Die `COALESCED` bedeutet, dass das Ziel bereits dem letzten bekannten Zustand entsprach – verwenden Sie die `start` /`stop` Tasten zum Erzwingen des Anrufs.          |
| Staaten stellen die Aktualisierung ein                       | Schau dir das an `<vin>.info.dataAge` Ein Schlafwagen wird absichtlich immer seltener kontrolliert.                                                                                                      |
| Es ist unklar, wann die nächste Abstimmung stattfinden wird. | Überprüfen `<vin>.info.polling.nextPollAt` Und `.reason`; `.lastSuccessfulPollAt` zeigt die letzte erfolgreiche API-Antwort an.                                                                           |

## Kompaktmodus

Der Adapter unterstützt den ioBroker Compact Mode mit unabhängigen Instanzen in einem gemeinsamen Prozess. Die Zuordnung der Compact-Gruppen erfolgt über Ihre ioBroker-Installation. Siehe [Überprüfungs- und Herunterfahrverhalten](/#/docs/adapterref/iobroker.skoda-public-api/docs/compact-mode.md) .

## Sprachen

Die Adapterkonfiguration und der Objektbaum werden übersetzt. Backend-Protokolle, Benachrichtigungen und Verbindungstestergebnisse sind immer in Englisch, sodass sie unabhängig von der Systemsprache von ioBroker für Supportanfragen nützlich bleiben.

## Haftungsausschluss

Škoda und MyŠkoda sind Marken von Škoda Auto. Dieses Projekt ist ein unabhängiger Open-Source-Adapter und steht in keiner Verbindung zu Škoda Auto und wird auch nicht von Škoda Auto unterstützt. Es nutzt die öffentlich dokumentierte MyŠkoda Public API mit einem vom Fahrzeughalter selbst erstellten Schlüssel. Das Adapter-Symbol ist ein originelles, markenneutrales Projekt-Artwork und reproduziert nicht das offizielle Škoda-Logo; es wird unter der MIT-Lizenz dieses Projekts verbreitet.

## Changelog

### 0.1.11 (2026-09-20)

- Use a catalogued ioBroker role for editable profile names, complete the instance-object name translations, and fill missing translations on existing `info.connection` objects at startup.

### 0.1.10 (2026-09-20)

- Add a writable charging limit with input validation, quota handling and verification polling.
- Ignore non-boolean on/off switch writes instead of interpreting them as stop commands.
- Add writable charging mode and complete charging-profile JSON controls with validation, independent queues and verification polling.
- Expose per-vehicle polling diagnostics: next due time, persistent last successful poll and the current waiting reason.
- Expose per-control command confirmation and local timeouts using existing polls only, without additional API requests.
- Add local charging-profile editors with individual fields, weekday switches, apply/reset buttons and conflict detection; batch changes into one profile update.
- Refine editor setting roles and translated help/choices; migrate existing metadata and mark unavailable controls read-only until their data returns.
- Keep unavailable roles consistent with access rights, avoid repeated detailed roles per channel, and localize editor messages and polling/confirmation labels without changing state codes.

### 0.1.9 (2026-09-06)
- Used ioBroker-managed request timers and removed news for the skipped npm version 0.1.7.

### 0.1.8 (2026-09-06)
- Kept Windows CI stable while retaining Compact Mode controller coverage on Unix hosts.

### 0.1.7 (2026-09-06)
- Added and verified ioBroker Compact Mode support.

### 0.1.6 (2026-09-06)
* (Thomas Marthy) limited adapter news to the seven entries supported by the repository builder

### 0.1.5 (2026-09-06)
* (Thomas Marthy) aligned the test workflow and changelog archive with repository checker requirements

### 0.1.4 (2026-09-06)
* (Thomas Marthy) added complete backend translations for all supported ioBroker languages

### 0.1.3 (2026-09-06)
* (Thomas Marthy) completed missing admin UI translations for all supported languages

### 0.1.2 (2026-09-06)
* (Thomas Marthy) resolved repository checker warnings for CI test discovery, environment access, changelog archiving and npm packaging

### 0.1.1 (2026-09-06)
* (Thomas Marthy) completed ioBroker object name translations for all supported languages

### 0.1.0 (2026-09-05)
* (Thomas Marthy) fixed ioBroker state roles reported by object structure validation
* (Thomas Marthy) added German and English backend messages, notifications, connection-test results and object names
* (Thomas Marthy) ensured compiled code and backend translations are included in the npm package

### 0.0.2 (2026-09-05)
* (Thomas Marthy) enabled npm Trusted Publishing for automated releases

### 0.0.1 (2026-09-05)
* (Thomas Marthy) initial release

## License
MIT License

Copyright (c) 2026 Thomas Marthy <iobroker@marthy.ch>

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