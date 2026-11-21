---
chapters: {"pages":{"en/adapterref/iobroker.grohe-smarthome/README.md":{"title":{"en":"ioBroker.grohe-smarthome"},"content":"en/adapterref/iobroker.grohe-smarthome/README.md"},"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md":{"title":{"en":"ioBroker Grohe Smarthome Adapter"},"content":"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.grohe-smarthome/docs/en/README.md
title: ioBroker Grohe Smarthome-Adapter
hash: xHw4HbCTiefLa2/KFC8+RpO9zXhqBwAzvvjQh4RQ6tw=
---
# IoBroker Grohe Smarthome-Adapter
Dieser Adapter verbindet ioBroker mit der **Grohe Smarthome / Ondus** Cloud und stellt Grohe-Geräte als Zustände und Steuerelemente innerhalb von ioBroker bereit.

Unterstützte Geräte:

| Gerät | Typ |
|---|---|
| **Grohe Sense** | `101` |
| **Grohe Blue Home** | `104` |
| **Grohe Blue Professional** | `105` |
| **Grohe Blue Professional** | 105 |

Der Adapter meldet sich über den OIDC/Keycloak-Flow von Grohe an, speichert ein **verschlüsseltes Aktualisierungstoken** in einem Zustand und fragt die Grohe Cloud-API in einem konfigurierbaren Intervall ab.

Ideen und Konzept stammen aus der Home Assistant-Integration **ha-grohe_smarthome**. Besonderer Dank gilt **Flo-Schilli**.

---

## Konfiguration
Die Adapterkonfiguration ist in zwei Registerkarten unterteilt.

### Registerkarte „Einstellungen“
| Schauplatz | Beschreibung |
|---|---|
| **E-Mail** | Die E-Mail-Adresse Ihres Grohe-/Ondus-Kontos |
| **Passwort** | Ihr Grohe-/Ondus-Kontopasswort |
| **Abfrageintervall (Sekunden)** | Abfrageintervall - Minimum **60 s**, Standard **300 s** |
| **Rohzustände** | Gibt die vollständige API-Antwortstruktur zur Diagnose im Protokoll aus. Die Abfrage wird nach 3 Zyklen beendet. Deaktivieren und neu starten für normalen Betrieb. |

Der Adapter speichert das Aktualisierungstoken im Status `auth.refreshToken` (verschlüsselt), **nicht** in der Konfiguration. Das Schreiben der Konfiguration würde einen Neustart auslösen und den Tokenfluss unterbrechen.

### Registerkarte „Benachrichtigungen“
Aktivieren Sie Push-Benachrichtigungen, um über Geräteereignisse informiert zu werden. Die Nachrichten werden in der in Ihrem ioBroker-System konfigurierten Sprache versendet.

#### Benachrichtigungskategorien
| # | Kategorie | Beispiele |
|---|---|---|
| 1 | **Kritische Alarme** | Überschwemmung erkannt, Sensorfehler, Systemfehler |
| 2 | **Warnungen** | Niedriger Batteriestand, Temperatur/Luftfeuchtigkeit außerhalb des zulässigen Bereichs, WLAN-Verbindung unterbrochen, Gerät online/offline, Blaufilter/CO₂-Wert niedrig |
| 3 | **Ventil- und Steuerungsereignisse** | Ventil geöffnet / geschlossen, Wasserausgabe |
| 4 | **Verbindungsfehler** | HTTP-Polling-Fehler (z. B. HTTP 403), die bei jedem Fehler gesendet werden |

#### Benachrichtigungssymbole
| Symbol | Bedeutung |
|---|---|
| 🚨 | Kritischer Alarm (Grohe Kategorie 30) |
| ⚠️ | Warnung (Grohe Kategorie 20), Gerät offline, Abfragefehler |
| ✅ | Gerät online, Umfrage wiederhergestellt |
| 🔓 | Ventil geöffnet |
| 🔒 | Ventil geschlossen |
| 💧 | Wasserausgabe |
| ℹ️ | Letzte Benachrichtigung geändert |

#### Unterstützte Anbieter
| Anbieter | Notizen |
|---|---|
| **Telegram** | Instanz; optional Benutzer- oder Chat-ID |
| **Pushover** | Instanz; optional Titel, Gerät |
| **WhatsApp** (`whatsapp-cmb`) | Instanz; optional Telefonnummer |
| **Signal** (`signal-cmb`) | Instanz; optional Telefonnummer |
| **Matrix** (`matrix-org`) | Instanz |
| **Matrix** (`matrix-org`) | Instanz |
| **Synology Chat** | Instanz; Kanalname (erforderlich) |

---

## Gerätemanager
Der Adapter ist in den ioBroker **Gerätemanager** integriert. Wählen Sie ein registriertes Grohe-Gerät aus, um dessen Kachel zu öffnen.

### Gerätekachel
Jede Kachel zeigt Live-Statusindikatoren und wichtige Messwerte auf einen Blick.

| Gerät | Statusanzeigen | Kachelwerte |
|---|---|---|
| **Grohe Sense** | Online, WLAN-Qualität, Akku | Temperatur, Luftfeuchtigkeit, Akku |
| **Grohe Sense Guard** | Online, WLAN-Qualität, Ventilwarnung | Wassertemperatur, Durchflussrate, Druck, Tagesverbrauch, Ventil öffnen/schließen |
| **Grohe Blue** | Online, WLAN-Qualität | CO₂-Rest, Filterrest, Letzte Messung |

### Detailansicht (Registerkarte „Info“)
Klicken Sie auf die Kachel, um die Detailansicht zu öffnen. Der **Info-Tab** zeigt Folgendes an:

- Geräte-ID, Gerätetyp, Online-Status, Update verfügbar, WLAN-Qualität
- Neueste Benachrichtigung und Zeitstempel
- Gerätespezifische Messungen (siehe die gerätespezifischen Abschnitte weiter unten)

### Detailansicht (Registerkarte „Steuerelemente“)
Die Registerkarte **Steuerung** ist für Grohe Sense Guard- und Grohe Blue-Geräte verfügbar. Sie ist in Funktionsgruppen unterteilt, die jeweils durch eine Trennlinie voneinander abgegrenzt sind.

**Grohe Sense Guard - Registerkarte „Steuerung“:**

| Gruppe | Steuerelemente |
|---|---|
| **Ventilsteuerung** | Ventil öffnen-Taste, Ventil schließen-Taste |
| **Druckmessung** | Startknopf *(Ventil muss geschlossen sein - siehe Hinweis unten)* |
| **Schlummerfunktion** | Aktivanzeige (schreibgeschützt), Eingabe der Dauer (1-240 Min.), Schlummerfunktion starten, Schlummerfunktion stoppen |
| **Wasserbeschränkungen** | Maximale Entnahmemenge (0-2000 l) |
| **Bewässerungsmodus** | Startzeit (h + min), Stoppzeit (h + min), Aktive Tage (Mo-So), Status (gespeichert / nicht gespeichert), Speichern-Schaltfläche |

**Hinweis zur Druckmessung:** Die Leitungsprüfung wird vom Gerät automatisch durchgeführt - in der Regel über Nacht, wenn kein Wasser fließt. Durch Drücken der Starttaste wird der Befehl `measure_now` gesendet, den das Gerät nur ausführt, wenn das **Ventil geschlossen** ist und kein Wasser fließt. Die Ergebnisse werden immer im Status `pressureMeasurement.*` angezeigt, unabhängig davon, ob die Prüfung manuell oder automatisch ausgelöst wurde.

**Hinweis zu den Bewässerungseinstellungen:** Änderungen an einzelnen Bewässerungsfeldern (Zeiten, Wochentagswechsel) werden lokal gespeichert, aber **nicht** sofort an die API gesendet. Klicken Sie auf **Bewässerungseinstellungen speichern**, um alle Werte in einem einzigen API-Aufruf zu senden. Dadurch werden mehr als sieben API-Aufrufe vermieden, wenn Sie die Wochentage einzeln umschalten.

**Hinweis zu Auszahlungslimit und Sprinklereinstellungen:** Diese Werte werden bei jeder Abfrage aus den Dashboard-Daten übernommen (kein zusätzlicher API-Aufruf). Falls das Dashboard keine Konfiguration enthält, werden diese alle zehnte Abfrage über `/details` ausgelesen. Änderungen in der Grohe-App werden daher in der Regel bei der nächsten Abfrage in ioBroker angezeigt. Solange `controls.sprinkler.pending` `true` entspricht (ungespeicherte Änderungen), werden die Sprinklerfelder **nicht** von der API überschrieben.

**Grohe Blue Home / Professional - Registerkarte „Steuerung“:**

| Gruppe | Steuerelemente |
|---|---|
| **Ausgabe** | Zapfart (Still / Mittel / Kohlensäurehaltig), Menge (ml), Ausgabetaste |
| **Service** | CO₂-Reset-Taste, Filter-Reset-Taste |

---

## Webkomponente
Der Adapter bringt die Webkomponente **Grohe Appliance** (`<iob-grohe-device-card>`, [ioBroker-Webkomponenten](https://github.com/ioBroker/web-components)).
Hosts wie devices, vis-2 oder admin bieten sie in ihrer Palette an; sie sieht aus wie die Karte des Geräte-Managers.

| Teil | Inhalt |
|---|---|
| Kopfzeile | Gerätesymbol, Name, Typ; Statussymbole: Verbindungs-/WLAN-Qualität, Akku (Sense), Ventil geschlossen (Sense Guard), Update verfügbar. Rot bei Offline-Status |
| ⓘ-Taste | Dialog mit Informationen, die auf der Karte nicht angezeigt werden: Geräte-ID, Typ, Online-Status, WLAN-Qualität, Update, letzte Messung, letzte Benachrichtigung mit Kategorie und Uhrzeit; Sense Guard: durchschnittlicher Tages-/Monatsverbrauch, letzte Entnahme, Druckmessung (Zeit, Abfall, Leckage), Schlummerdauer; Blau: Wartung (Filter in der App, letzte Reinigung/CO₂-Abgabe/Filterwechsel, Zähler) und Betrieb (Betriebs- und Pumpenzeiten, Zapfzyklen, Wasserlaufzeiten, Leerlaufzeiten, Stromausfälle). Die Statuswerte werden beim Öffnen des Dialogs einmalig ausgelesen; Zeilen ohne Wert werden ausgelassen. Funktioniert auch offline. |
| **Info**-Registerkarte | die Werte der Gerätemanager-Kachel (Sense: Temperatur, Luftfeuchtigkeit, Batterie; Sense Guard: Ventil, Wassertemperatur, Durchflussrate, Druck, Tages-/Gesamtverbrauch, Druckabfall; Blau: CO₂ und Filter in % und Litern), letzte Messung und letzte Benachrichtigung |
| **Steuerungs-Registerkarte** (Sense Guard) | Ventil öffnen/schließen, Druckmessung starten (nur bei geschlossenem Ventil), Schlummerfunktion starten (Dauer wird abgefragt)/Schlummerfunktion stoppen, Entnahmemengenbegrenzung, Sprinklermodus (Zeiten und Tage in einem Dialog, Speicherung in einem Aufruf) |
| **Steuerungs-Reiter** (Blau) | Zapfhahnart, Menge (± 50 ml), Ausgabe; CO₂-/Filter nach Bestätigung zurücksetzen |

| Schauplatz | Bedeutung |
|---|---|
| Instanz | Adapterinstanz (leer: `grohe-smarthome.0`) |
| Gerät | Gerät der Instanz (leer: das erste); die Liste stammt vom Adapter (`sendTo`-Befehl `getDevices`) |

Befehle durchlaufen dieselben `controls.*`-Zustände wie der Geräte-Manager, daher verarbeitet der Adapter sie wie gewohnt: zuerst die Werte (z. B. `controls.snooze.duration`, `controls.tapType`, `controls.tapAmount`), zuletzt den Auslöser. Die Karte sendet keine zusätzlichen Anfragen an die Grohe Cloud und ändert die Abfragestrategie nicht. Solange ein Gerät offline ist, sind die Steuerelemente deaktiviert; im Editor eines Hosts schreibt die Karte nichts.

| Gastgeber | Hinweis |
|---|---|
| Geräte (≥ 4.3) | Bearbeitungsmodus → „Widget hinzufügen“ → „Grohe Smarthome“ → „Grohe-Gerät“; die Größe 2×2 ist am besten geeignet. Nach einem Update die Adapterdateien erneut hochladen (`iobroker upload grohe-smarthome`) und die Seite neu laden. |
| Aura | Stellen Sie in den Widget-Einstellungen **Klicken Sie auf die Komponente** auf **Komponente** ein, andernfalls speichert Aura die Klicks. |

Quelle: `src-webcomponents/`; `npm run build` bündelt es in `admin/webcomponents/device-card.js` (die erstellte Datei wird eingecheckt).

`common.webComponents` in `io-package.json` listet den einfachen Manifestpfad auf, da Geräteversion 4.4 die Objektkurzform ignoriert.

---

## IoBroker-Zustandsstruktur
Geräte werden im Adapter-Namespace erstellt:

```
grohe-smarthome.0.<applianceId>.*
```

### Zustände, die allen Geräten gemeinsam sind
```
<applianceId>.status.online                 boolean
<applianceId>.status.updateAvailable        boolean
<applianceId>.status.wifiQuality            number (if available)

<applianceId>.notifications.latestMessage       string
<applianceId>.notifications.latestTimestamp     string (date)
<applianceId>.notifications.latestCategory      number
<applianceId>.notifications.latestCategoryName  string
<applianceId>.notifications.latestType          number
```

Grohe Benachrichtigungskategorien: `0` Werbung · `10` Information · `20` Warnung · `30` Alarm · `40` WebURL

---

## Grohe Sense (Typ 101)
### Messungen
```
<applianceId>.temperature           °C
<applianceId>.humidity              %
<applianceId>.battery               %
<applianceId>.lastMeasurement       date string
```

---

## Grohe Sense Guard (Typ 103)
### Messungen
```
<applianceId>.temperature           °C    water temperature
<applianceId>.flowRate              l/min
<applianceId>.pressure              bar
<applianceId>.lastMeasurement       date string
<applianceId>.valveOpen             boolean (indicator – read only)
```

### Konsumkanal
```
<applianceId>.consumption.daily                  l
<applianceId>.consumption.averageDaily           l
<applianceId>.consumption.averageMonthly         l
<applianceId>.consumption.totalWaterConsumption  l   (calculated, see note)
<applianceId>.consumption.totalWaterConsumptionSync  (internal sync data, JSON)
<applianceId>.consumption.lastWaterConsumption   l
<applianceId>.consumption.lastMaxFlowRate        l/min
```

** `totalWaterConsumption`:** Die Grohe Dashboard API liefert keinen zuverlässigen Gesamtverbrauchswert. Der Adapter berechnet diesen anhand von `/data/aggregated`: > > - Der Verlauf seit dem Installationsdatum wird **nur einmal** in Kalenderjahr-Blöcken abgerufen (ein Timeout kostet nur einen Block; der nächste Versuch wird von dort fortgesetzt). Das Ergebnis wird in `totalWaterConsumptionSync` gespeichert und bleibt auch nach Neustarts des Adapters erhalten.

- Danach werden nur noch der aktuelle und der vorherige Monat **einmal täglich** abgerufen (verspätete Uploads vom Gerät werden so erfasst).

- Bei jeder fünften Abfrage wird der Verbrauch des aktuellen Tages addiert.

- Schlägt eine Anfrage fehl, behält der Status seinen letzten Wert bei - er wird niemals auf 0 gesetzt.

> Die erste Berechnung nach der Installation oder Aktualisierung des Adapters kann bei älteren Geräten einige Abfragen erfordern. Um die Gesamtsumme von Grund auf neu zu berechnen, löschen Sie `totalWaterConsumptionSync`.

### Druckmesskanal
Aktualisiert bei jeder 10. Umfrage. Nur vorhanden, wenn die API Daten liefert (können anfänglich fehlen).

```
<applianceId>.pressureMeasurement.dropOfPressure   bar
<applianceId>.pressureMeasurement.isLeakage        boolean
<applianceId>.pressureMeasurement.leakageLevel     string
<applianceId>.pressureMeasurement.startTime        date string
```

Die Rohrprüfung läuft automatisch (in der Regel über Nacht). Sie kann manuell über die Taste `startPressureMeasurement` ausgelöst werden. Dabei muss das **Ventil geschlossen sein** und es darf kein Wasser fließen, damit das Gerät den Befehl akzeptiert und ausführt. Die Benachrichtigung `20_333` (Rohrprüfung abgeschlossen) wird nach Abschluss der Prüfung versendet.

### Steuerelemente
Die Steuerelemente sind auf der Registerkarte **Steuerelemente** der Detailansicht des Geräte-Managers und als beschreibbare ioBroker-Zustände verfügbar.

**Ventil:**

```
<applianceId>.controls.valveOpen       boolean button – opens the valve
<applianceId>.controls.valveClose      boolean button – closes the valve
```

**Druckmessung:**

```
<applianceId>.controls.startPressureMeasurement   boolean button
```

Das Ventil muss vor der Auslösung geschlossen sein. Das Gerät führt die Prüfung automatisch durch, sobald die Bedingungen erfüllt sind.

**Schlummerfunktion** - Alarme werden vorübergehend stummgeschaltet:

```
<applianceId>.controls.snooze.active     boolean (read-only) – snooze currently active
<applianceId>.controls.snooze.duration   number  1–240 min
<applianceId>.controls.snooze.start      boolean button – activates snooze for the set duration
<applianceId>.controls.snooze.stop       boolean button – deactivates snooze immediately
```

Der Status `active` wird bei jeder dritten Abfrage von der Grohe API gelesen und unmittelbar nach Start-/Stopp-Aktionen aktualisiert.

**Wasserbeschränkungen:**

```
<applianceId>.controls.withdrawalAmountLimit   number  0–2000 l
```

Ein geänderter Wert wird nach **3 Sekunden** ohne weitere Änderungen an die Grohe API gesendet (nur der letzte Wert zählt, z. B. während der Eingabe). Der Status übernimmt den Wert aus der API-Antwort. Der Wert wird bei jeder Abfrage anhand der Dashboard-Daten aktualisiert. Ein gerade eingegebener Wert wird bis zu 15 Minuten lang nicht durch ältere Werte aus der API überschrieben (gilt auch für die Sprinklereinstellungen), bis Grohe den neuen Wert bestätigt hat.

**Sprinklermodus** - Bewässerungsplan:

```
<applianceId>.controls.sprinkler.startHour      number  0–23 h
<applianceId>.controls.sprinkler.startMinute    number  0–59 min
<applianceId>.controls.sprinkler.stopHour       number  0–23 h
<applianceId>.controls.sprinkler.stopMinute     number  0–59 min

<applianceId>.controls.sprinkler.activeMonday     boolean switch
<applianceId>.controls.sprinkler.activeTuesday    boolean switch
<applianceId>.controls.sprinkler.activeWednesday  boolean switch
<applianceId>.controls.sprinkler.activeThursday   boolean switch
<applianceId>.controls.sprinkler.activeFriday     boolean switch
<applianceId>.controls.sprinkler.activeSaturday   boolean switch
<applianceId>.controls.sprinkler.activeSunday     boolean switch

<applianceId>.controls.sprinkler.save     boolean button – sends all sprinkler values to the API
<applianceId>.controls.sprinkler.pending  boolean indicator (read-only) – true = unsaved changes
```

Start- und Stoppzeiten werden als separate Stunden (0-23) und Minuten (0-59) gespeichert. Der Adapter kombiniert diese intern zu Minuten ab Mitternacht, bevor die Daten an die API gesendet werden. Änderungen an einzelnen Feldern werden lokal gespeichert, aber erst nach dem Klicken auf „Speichern“ an die API gesendet.

Der Bewässerungsplan wird bei jeder Abfrage anhand der Dashboard-Daten aktualisiert - außer wenn `pending` `true` entspricht. Nach dem Speichern werden die Zustände anhand der API-Antwort festgelegt und `pending` zurückgesetzt. Beim Start des Adapters hat die Gerätekonfiguration immer Vorrang.

---

## Grohe Blue Home / Professional (Typ 104 / 105)
### Messungen
```
<applianceId>.remainingCo2              %
<applianceId>.remainingFilter           %
<applianceId>.remainingFilterApp        %
<applianceId>.remainingCo2Liters        l
<applianceId>.remainingFilterLiters     l

<applianceId>.cyclesCarbonated
<applianceId>.cyclesStill

<applianceId>.operatingTime             min
<applianceId>.pumpRunningTime           min
<applianceId>.maxIdleTime               min
<applianceId>.timeSinceRestart          min

<applianceId>.waterRunningCarbonated    min
<applianceId>.waterRunningMedium        min
<applianceId>.waterRunningStill         min

<applianceId>.dateCleaning              date string
<applianceId>.dateCo2Replacement        date string
<applianceId>.dateFilterReplacement     date string
<applianceId>.lastMeasurement           date string

<applianceId>.cleaningCount
<applianceId>.filterChangeCount
<applianceId>.powerCutCount
<applianceId>.pumpCount
```

**Aktualität der Messwerte:** Grohe Blue Geräte übertragen Messwerte **nicht** automatisch. Der Adapter sendet alle drei Abfragezyklen den Befehl `get_current_measurement`. Anschließend fragt eine Hintergrundschleife alle 10 Sekunden (bis zu 3 Versuche / insgesamt 30 Sekunden) erneut `/details` ab, bis ein aktueller Zeitstempel erscheint. Nach dem Start des Adapters kann es 1-2 Abfragezyklen dauern, bis die aktuellen Werte angezeigt werden.

** `remainingFilter` vs. `remainingFilterApp`:** Die Grohe App zeigt den verbrauchsbasierten API-Wert (`remainingFilter`) für den Filter nicht an. Zusätzlich wird er auf eine feste Lebensdauer von 360 Tagen seit dem letzten Filterwechsel begrenzt (`dateFilterReplacement`). Daher werden Nutzer unabhängig von der tatsächlichen Nutzung nach etwa einem Jahr zum Filterwechsel aufgefordert. `remainingFilterApp` entspricht diesem Verhalten (Minimum des verbrauchs- und zeitbasierten Werts) und der Anzeige der Grohe App.

### Steuerelemente
```
<applianceId>.controls.tapType        number  1 = still · 2 = medium · 3 = carbonated
<applianceId>.controls.tapAmount      number  ml, 50–2000 in steps of 50
<applianceId>.controls.dispenseTrigger  boolean button

<applianceId>.controls.resetCo2       boolean button
<applianceId>.controls.resetFilter    boolean button
```

Durch das Setzen von `dispenseTrigger` auf `true` werden `tapType` und `tapAmount` gelesen, der Ausgabevorgang ausgeführt und anschließend alle drei Zustände wieder auf `false` / `0` zurückgesetzt.

---

## Umfragestrategie
Um API-Aufrufe zu minimieren und eine Ratenbegrenzung (HTTP 403) zu vermeiden, werden verschiedene Endpunkte in unterschiedlichen Frequenzen abgefragt:

| Endpunkt | Häufigkeit | Geräte | Hinweise |
|---|---|---|---|
| `/dashboard` | jede Abfrage | Alle | Kernsensordaten |
| `/command` (gelesen) | jede 3. Abfrage | Sense Guard | Valve-Status; liest auch unmittelbar nach Befehlen zurück |
| `/snooze` (gelesen) | jede 3. Abfrage | Sense Guard | Schlummerstatus; HTTP 404 = kein aktiver Schlummermodus |
| `/command` (`get_current_measurement`) | jede 3. Abfrage | Blau | Löst eine neue Messung auf dem Gerät aus |
| `/details` (Überprüfung) | bis zu 3× nach Aktualisierung | Blau | Hintergrundabfrage für neue Daten (10-Sekunden-Intervalle, max. 30 Sekunden) |
| `/details` (Konfiguration) | jede 10. Abfrage | Sense Guard | Nur wenn das Dashboard kein `config` enthält; Bewässerungsplan, Entnahmelimit |
| `/data/aggregated` (heute) | jede 5. Umfrage | Sense Guard | Heutiger Verbrauch für `totalWaterConsumption` |
| `/data/aggregated` (Verlauf) | einmalig | Sense Guard | Vollständiger Verlauf in Kalenderjahr-Abschnitten, gespeichert in `totalWaterConsumptionSync` |
| `/data/aggregated` (letzte Monate) | einmal täglich | Sense Guard | Aktueller und vorheriger Monat für `totalWaterConsumption` |
| `/pressuremeasurement` | jede 10. Abfrage | Sense Guard | Ändert sich nur nach einer Pipe-Prüfung |
| `/pressuremeasurement` | jede 10. Abfrage | Sense Guard | Ändert sich nur nach einer Rohrprüfung |

**Tipp:** Sollten HTTP-403-Fehler auftreten, erhöhen Sie das Abfrageintervall. Die Grohe Cloud-API hat Ratenbegrenzungen.

### Exponentielles Backoff
Bei Abfragefehlern erhöht der Adapter automatisch das Intervall:

1. Jeder aufeinanderfolgende Ausfall **verdoppelt** das Intervall (300 → 600 → 1200 → 2400 → 3600 s).
2. Maximal: **1 Stunde**.
3. Nach Ablauf einer Stunde: Pause bis **12:00** Mittag, oder, falls es bereits nach Mittag ist, bis **00:00** Mitternacht.
4. Nach einer **erfolgreichen** Abfrage wird das Intervall auf den konfigurierten Wert zurückgesetzt.

---

## Authentifizierung
Beim Start:

1. Das gespeicherte Aktualisierungstoken wird aus `auth.refreshToken` gelesen.
2. Sofern verfügbar, aktualisiert der Adapter die Token automatisch.
3. Falls das Aktualisierungstoken abgelehnt wird oder kein Token vorhanden ist, wird eine vollständige Anmeldung mit E-Mail-Adresse und Passwort durchgeführt.
4. Das neue Refresh-Token wird **verschlüsselt** (`enc:<...>`) in `auth.refreshToken` gespeichert.

Wenn die Anmeldung beim Start fehlschlägt (z. B. weil noch kein Netzwerk besteht oder Grohe Anfragen vorübergehend ablehnt), stoppt der Adapter **nicht**: Er versucht es erneut mit dem regulären [exponentielles Backoff](#exponential-backoff).

Unverschlüsselte Token aus älteren Versionen werden automatisch in den verschlüsselten Speicher migriert.

Während der Laufzeit:

- Bei einem **HTTP 401**-Fehler (oder einem abgelaufenen Zugriffstoken) werden die Token aktualisiert und die Anfrage einmal wiederholt.
- Falls Grohe das Refresh-Token ablehnt, meldet sich der Adapter **erneut** mit E-Mail-Adresse und Passwort an - ein Neustart ist nicht erforderlich.
- Netzwerkfehler, HTTP 429 und Serverfehler (5xx) während der Aktualisierung lösen keine neue Anmeldung aus; der nächste Abfragevorgang versucht es erneut.
- Erneuerte Aktualisierungstoken werden in `auth.refreshToken` gespeichert.

---

## Fallback-Erkennung
Wenn `/dashboard` den HTTP-Statuscode 404 zurückgibt (bei einigen älteren Konten), schaltet der Adapter auf die Fallback-Erkennung um:

1. Extrahiert die Benutzer-ID aus dem JWT-Zugriffstoken.
2. Ruft `/users/{userId}` auf, um Standorte zu erhalten.
3. Ruft pro Gerät `/rooms` → `/appliances` + `/details` + `/notifications` ab.

Der Fallback-Modus wird einmalig beim Start erkannt und für die gesamte Lebensdauer der Instanz beibehalten.

---

## Fehlerbehandlung
| Situation | Verhalten |
|---|---|
| Abfragefehler | `info.connection` → `false`; exponentieller Backoff |
| Anmeldeversuch beim Start fehlgeschlagen | Erneuter Versuch mit exponentiellem Backoff |
| HTTP 401 | Token aktualisiert, Anfrage wird einmal wiederholt; falls das Aktualisierungstoken abgelehnt wird, erneute Anmeldung mit E-Mail-Adresse/Passwort |
| HTTP 404 auf `/pressuremeasurement` | Nur Debug-Protokoll (noch keine Messdaten sind normal) |
| HTTP 404 bei `/dashboard` | Wechselt zur Fallback-Erkennung |
| HTTP 404 auf `/dashboard` | Wechselt zur Fallback-Suche |

---

## Modulübersicht
| Datei | Zweck |
|---|---|
| `main.js` | Adapterkern: Abfrage, Zustandsverwaltung, Befehlsverarbeitung, Geräte-Manager-Meldungen |
| `lib/web-components.js` | Backend der Webkomponente: Geräteliste für ihre Einstellungen (`getDevices`) |
| `src-webcomponents/` | Quellcode der Webkomponente (Browser-ESM); gebündelt in `admin/webcomponents/` durch `npm run build` |
| `admin/webcomponents/` | Webkomponentenmanifest (handgeschrieben), Symbol und erstelltes Modul |
| `lib/groheClient.js` | Grohe API-Client: Authentifizierte Anfragen, Token-Erneuerung / erneute Anmeldung bei 401 |
| `lib/waterConsumptionTracker.js` | Gesamtwasserverbrauch des Sense Guard |
| `lib/auth.js` | OAuth-/Keycloak-Anmeldung und Token-Aktualisierung |
| `lib/notificationManager.js` | Sendet Push-Benachrichtigungen an konfigurierte Anbieter |
| `lib/notificationMessages.js` | Lokalisierte Nachrichtenvorlagen und Grohe-Benachrichtigungstexte (11 Sprachen) |
| `lib/apiDump.js` | Vollständiger API-Strukturauszug für Diagnosezwecke (ausgelöst durch die Option „Rohzustände“) |
| `lib/apiDump.js` | Vollständiger API-Struktur-Dump für Diagnosezwecke (ausgelöst durch die Option "Raw states") |