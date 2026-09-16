---
chapters: {"pages":{"en/adapterref/iobroker.grohe-smarthome/README.md":{"title":{"en":"ioBroker.grohe-smarthome"},"content":"en/adapterref/iobroker.grohe-smarthome/README.md"},"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md":{"title":{"en":"ioBroker Grohe Smarthome Adapter"},"content":"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.grohe-smarthome/docs/en/README.md
title: ioBroker Grohe Smarthome-Adapter
hash: 3ZJorsCs1wuZnr/O235TZKV4TgaQZc0DMZUZ2ZdmPR4=
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
| **Bewässerungsmodus** | Startzeit (h + min), Stoppzeit (h + min), Aktive Tage (Mo-So), Speichern-Schaltfläche |

**Hinweis zur Druckmessung:** Die Leitungsprüfung wird vom Gerät automatisch durchgeführt - in der Regel über Nacht, wenn kein Wasser fließt. Durch Drücken der Starttaste wird der Befehl `measure_now` gesendet, den das Gerät nur ausführt, wenn das **Ventil geschlossen** ist und kein Wasser fließt. Die Ergebnisse werden immer im Status `pressureMeasurement.*` angezeigt, unabhängig davon, ob die Prüfung manuell oder automatisch ausgelöst wurde.

**Hinweis zu den Bewässerungseinstellungen:** Änderungen an einzelnen Bewässerungsfeldern (Zeiten, Wochentagswechsel) werden lokal gespeichert, aber **nicht** sofort an die API gesendet. Klicken Sie auf **Bewässerungseinstellungen speichern**, um alle Werte in einem einzigen API-Aufruf zu senden. Dadurch werden mehr als sieben API-Aufrufe vermieden, wenn Sie die Wochentage einzeln umschalten.

**Hinweis zu Auszahlungslimit und Sprinklereinstellungen:** Diese Werte werden alle 10 Abfragezyklen (ca. 50 Minuten bei einem Intervall von 300 Sekunden, immer bei der ersten Abfrage) von der Grohe-API abgerufen. Änderungen in der Grohe-App werden innerhalb dieses Zeitraums in ioBroker übernommen.

**Grohe Blue Home / Professional - Registerkarte „Steuerung“:**

| Gruppe | Steuerelemente |
|---|---|
| **Ausgabe** | Zapfart (Still / Mittel / Kohlensäurehaltig), Menge (ml), Ausgabetaste |
| **Service** | CO₂-Reset-Taste, Filter-Reset-Taste |

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
<applianceId>.consumption.lastWaterConsumption   l
<applianceId>.consumption.lastMaxFlowRate        l/min
```

**`totalWaterConsumption`:** Die Grohe Dashboard API liefert keine zuverlässige Gesamtsumme. Der Adapter berechnet diese anhand von `/data/aggregated`: Einmal täglich wird die historische Gesamtsumme (Installationsdatum → heute, gruppiert nach Jahr) abgerufen; bei jeder fünften Abfrage wird der Verbrauch des aktuellen Tages addiert.

### Druckmesskanal
Aktualisiert bei jeder 10. Umfrage. Nur vorhanden, wenn die API Daten liefert (können anfänglich fehlen).

```
<applianceId>.pressureMeasurement.dropOfPressure   bar
<applianceId>.pressureMeasurement.isLeakage        boolean
<applianceId>.pressureMeasurement.leakageLevel     string
<applianceId>.pressureMeasurement.startTime        date string
```

Die Rohrprüfung läuft automatisch (in der Regel über Nacht). Sie kann manuell über die Taste `startPressureMeasurement` ausgelöst werden. Das **Ventil muss jedoch geschlossen sein** und es darf kein Wasser fließen, damit das Gerät den Befehl akzeptiert und ausführt. Die Benachrichtigung `20_333` (Rohrprüfung abgeschlossen) wird nach Abschluss der Prüfung versendet.

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

**Schlummerfunktion** - schaltet Alarme vorübergehend stumm:

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

Durch das Setzen dieses Wertes wird dieser sofort an die Grohe-API gesendet. Der Wert wird bei jeder zehnten Abfrage erneut von der API ausgelesen.

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

<applianceId>.controls.sprinkler.save   boolean button – sends all sprinkler values to the API
```

Start- und Stoppzeiten werden als separate Stunden (0-23) und Minuten (0-59) gespeichert. Der Adapter kombiniert diese intern zu Minuten ab Mitternacht, bevor die Daten an die API gesendet werden. Änderungen an einzelnen Feldern werden lokal gespeichert, aber erst nach dem Klicken auf „Speichern“ an die API gesendet.

Der Bewässerungsplan wird alle 10 Abfragen von der Grohe API neu eingelesen.

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

**`remainingFilter` vs. `remainingFilterApp`:** Die Grohe App zeigt den verbrauchsbasierten API-Wert (`remainingFilter`) für den Filter nicht an. Zusätzlich wird er auf eine feste Lebensdauer von 360 Tagen seit dem letzten Filterwechsel begrenzt (`dateFilterReplacement`). Daher werden Nutzer unabhängig von der tatsächlichen Nutzung nach etwa einem Jahr zum Filterwechsel aufgefordert. `remainingFilterApp` entspricht diesem Verhalten (Minimum des verbrauchs- und zeitbasierten Werts) und der Anzeige der Grohe App.

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
| `/details` (Konfiguration) | jede 10. Abfrage | Sense Guard | Bewässerungsplan, Entnahmelimit; immer bei der ersten Abfrage |
| `/data/aggregated` (heute) | jede 5. Umfrage | Sense Guard | Heutiger Verbrauch für `totalWaterConsumption` |
| `/data/aggregated` (historisch) | einmal täglich | Sinneswächter | Historische Basis für `totalWaterConsumption` |
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
3. Falls die Aktualisierung fehlschlägt oder kein Token vorhanden ist, wird eine vollständige Anmeldung mit E-Mail-Adresse und Passwort durchgeführt.
4. Das neue Aktualisierungstoken wird **verschlüsselt** (`enc:<...>`) in `auth.refreshToken` gespeichert.

Unverschlüsselte Token aus älteren Versionen werden automatisch in den verschlüsselten Speicher migriert.

Bei einem HTTP-Fehler 401 wird die Anfrage nach einer Token-Aktualisierung einmal wiederholt.

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
| HTTP 401 | Token aktualisiert, Anfrage einmal wiederholt |
| HTTP 404 auf `/pressuremeasurement` | Nur Debug-Protokoll (noch keine Messdaten sind normal) |
| HTTP 404 bei `/dashboard` | Wechselt zur Fallback-Erkennung |
| HTTP 404 auf `/dashboard` | Wechselt zur Fallback-Suche |

---

## Modulübersicht
| Datei | Zweck |
|---|---|
| `main.js` | Adapterkern: Abfrage, Zustandsverwaltung, Befehlsverarbeitung, Geräte-Manager-Meldungen |
| `lib/groheClient.js` | Grohe API-Client: Authentifizierte Anfragen, automatische Aktualisierung bei 401 |
| `lib/auth.js` | OAuth-/Keycloak-Anmeldung und Token-Aktualisierung |
| `lib/notificationManager.js` | Sendet Push-Benachrichtigungen an konfigurierte Anbieter |
| `lib/notificationMessages.js` | Lokalisierte Nachrichtenvorlagen und Grohe-Benachrichtigungstexte (11 Sprachen) |
| `lib/apiDump.js` | Vollständiger API-Struktur-Dump für Diagnosezwecke (ausgelöst durch die Option „Rohzustände“) |
| `lib/apiDump.js` | Vollständiger API-Struktur-Dump für Diagnosezwecke (ausgelöst durch die Option "Raw states") |