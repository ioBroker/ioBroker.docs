---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeizungsSteuerung
hash: HtPZDpFlnVMy+mFo0WXd1Mq5ZxXAw++BojsegdWqp5g=
---
![Logo](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.heatingcontrol?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.heatingcontrol?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.heatingcontrol?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)

# IoBroker.Heizungssteuerung
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/heatingcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## Dokumentation
**Ich suche Unterstützung bei der Erstellung/Aktualisierung der Benutzerdokumentation und der FAQ's. Bei Interesse bitte melden...**

## Adapter zur Steuerung Ihrer Heizungsanlage.
Merkmale:

* Steuern Sie die Solltemperaturen aller Thermostate gemäß Zeitplan
* Konfigurieren Sie mehrere Heizperioden für jeden Tag und jede Nacht
* Unterstützt alle Arten von Thermostaten (Voraussetzung: muss in ioBroker verfügbar sein)
* Automatische Erkennung von Homematic-Geräten
* unterstützt mehrere Profile
* Wenn keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht, kann der Stellantrieb direkt aus dem Adapter geschaltet werden
* Aktuell wird der Aktor direkt bei Erreichen der Solltemperatur ausgeschaltet. Sobald die Solltemperatur unter der Isttemperatur liegt, wird der Aktor eingeschaltet. (To do: verbesserte Regelung implementieren)
* Es wird eine unbegrenzte Anzahl von Thermostaten, Aktoren und Sensoren pro Raum unterstützt
* Thermostat, Aktor und Sensor werden automatisch pro Raum erkannt. Hierzu wird die Funktion (z.B. „Heizen“) verwendet.
* Räume können innerhalb der Admin-Oberfläche ausgeschlossen werden, wenn ein Raum zwar einen Thermostat enthält, aber nicht gesteuert werden soll
* Sensor wird zur Reduzierung der Zieltemperatur genutzt (z.B. wenn ein Fenster geöffnet ist); optional mit SensorDelay
* Schnittstelle zum Feiertags-Adapter oder anderen zur Erkennung von Feiertagen. Feiertage können normale Tage oder Sonntage sein. (Admin-Einstellung)
* manuelle Temperaturübersteuerung für eine bestimmte Zeit
* vordefinierte Heizperiode
* Änderungen vom Thermostat übernehmen (optional)
* Visualisierung von [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) wird unterstützt. Vielen Dank!

[Häufig gestellte Fragen](doc/FAQ.md)

## Installation
## Einstellungen
### Hauptsächlich
* Funktion = Funktion zur Erkennung von Thermostaten, Aktoren und Sensoren pro Raum. Es ist eine der System-Enums
* Zeitzone = wird für Cron verwendet, um Cron-Jobs anzupassen
* Pfad zum Feiertags-Adapter = wenn Sie den Feiertags-Adapter nutzen möchten um automatisch Feiertage für heute zu erkennen, dann geben Sie hier den Pfad ein (z.B. feiernage.0)
* Alle Geräte löschen, wenn der Administrator öffnet = sollte deaktiviert sein. Aktivieren Sie es nur, wenn Sie alle Raum-, Aktuator- und Sensoreinstellungen löschen müssen. Eine Gerätesuche wird ausgeführt, wenn der Adapteradministrator öffnet
* Verwendeter Sensor = Wenn Sie Fenstersensoren haben und die Zieltemperatur bei geöffnetem Fenster senken möchten, aktivieren Sie diese Option.
* Verwendete Aktoren = wenn Sie Aktoren direkt vom Adapter aus steuern möchten. Nur für den Fall, dass keine direkte Verbindung zwischen Thermostat und Aktor besteht.
* Aktoren verwenden, wenn keine Heizperiode aktiv ist = nur gültig mit Aktoren. Definiert, wie Aktoren eingestellt werden, wenn keine Heizperiode aktiv ist
* Aktoren verwenden, wenn kein Thermostat vorhanden ist = nur gültig mit Aktoren. Wenn Sie Räume ohne Thermostat aber mit Heizungsaktor haben, können Sie diese dauerhaft ein- oder ausschalten

### Profil
* Profiltyp = drei verschiedene Profiltypen (Montag - Sonntag, oder Montag - Freitag und Samstag/Sonntag oder jeden Tag) werden unterstützt
* Anzahl der Profile = Wenn Sie mehr als ein Profil benötigen, erhöhen Sie diesen Wert. Sie können dann auswählen, welches Profil verwendet wird.
* Anzahl der Perioden = Definieren Sie, wie viele Tagesabschnitte mit unterschiedlichen Temperaturen Sie benötigen. Je mehr Sie festlegen, desto mehr Datenpunkte werden erstellt. Verwenden Sie besser einen niedrigen Wert (z. B. 5).
* „Feiertage wie Sonntag“ = wenn Sie an Feiertagen wie Sonntagen Zieltemperaturen festlegen möchten, aktivieren Sie diese Option. Ansonsten sind die Feiertagseinstellungen dieselben wie an normalen Tagen.
* Heizperiode = Start- und Enddatum der Heizperiode. Wird verwendet, um „HeizperiodeAktiv“ einzustellen.

### Geräte
* eine Liste aller Räume. Sie können hier einen Raum deaktivieren.
* Drücken Sie die Schaltfläche „Bearbeiten“ auf der rechten Seite, um das Einstellungsfenster für Thermostate, Aktoren und Sensoren für diesen Raum zu öffnen.

### Raum bearbeiten
* hier können Sie Objekt-IDs für Thermostate, Aktoren und Sensoren prüfen und festlegen
* Sie können manuell neue Thermostate, Aktoren oder Sensoren hinzufügen. Drücken Sie dazu einfach die +-Taste. Dann erscheint eine leere Zeile, die ausgefüllt werden muss. Die Bearbeiten-Taste öffnet eine Liste der im System verfügbaren Geräte.
* Thermostate:

** Name, Temperatur-Ziel-OID und aktuelle Temperatur-OID sollten festgelegt werden.

* Aktuatoren

** Name und OID für den Status sollten festgelegt werden

* Sensoren

** Name und OID für aktuellen Status sollten festgelegt werden

## Datenpunkte
| DP-Name | Beschreibung |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | wenn aus, werden die Profile nicht verwendet |
| CurrentProfile | aktuelles Profil auswählen (basierend auf 1, bedeutet, dass Profil 1 Datenpunkte unter heatingcontrol.0.Profiles.0 verwendet) |
| LastProgramRun | zeigt den letzten Zeitpunkt der Adapterausführung an |

### Temperaturabfall / -anstieg
| DP-Name | Beschreibung | Zieltemperatur für relative Abnahme | Zieltemperatur für absolute Abnahme |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent | Temperatur erhöhen, da Gäste es wärmer haben möchten | Aktuelle Profiltemperatur um Profiles.0.room.relative.GuestIncrease erhöhen | Ziel auf Profiles.0.room.absolute.GuestIncrease setzen |
| PartyNow | Temperatur senken, weil es heiß wird‘ | Aktuelle Profiltemperatur um Profiles.0.room.relative.PartyDecrease senken | Ziel auf Profiles.0.room.absolute.PartyDecrease setzen |
| Anwesend | wir sind anwesend, wenn wir nicht anwesend sind, Temperatur senken | aktuelle Profiltemperatur um Profiles.0.room.relative.AbsentDecrease senken | Ziel auf Profiles.0.room.absolute.AbsentDecrease setzen |
| VacationAbsent | wir sind abwesend, also senken wir die Temperatur auch am Wochenende | senken wir die aktuelle Profiltemperatur um Profiles.0.room.relative.VacationAbsentDecrease | setzen wir das Ziel auf Profiles.0.room.absolute.VacationAbsentDecrease |
| FireplaceModeActive | Temperatur senken, da Sie einen Kamin verwenden, wird | aktuelle Profiltemperatur um Profiles.0.room.relative.FireplaceModeDecrease senken | Ziel auf Profiles.0.room.absolute.FireplaceModeDecrease setzen |

| | wird automatisch zur einstellbaren Zeit zurückgesetzt

* Datenpunkte nur verfügbar, wenn "Allgemeine Profileinstellungen, Temperaturabsenkung" eingestellt ist
* in beiden Szenarien wird nur eine Tieferlegung verwendet (in der vorherigen Version des Adapters konnten mehrere Tieferlegungen verwendet werden)
* im absoluten Absenkungsszenario werden nur Zielwerte ungleich 0°C verwendet. Wenn Sie für einen bestimmten Raum keine Absenkung benötigen, belassen Sie die Absenkungswerte bei 0°C

### Keine Heizperiode
Es gibt drei Möglichkeiten

* Feste Temperatur pro Raum

Ist diese Option gewählt, erscheint für jeden Raum ein neuer Datenpunkt im Objektbaum. Hier kann eine feste Solltemperatur eingestellt werden, die dann gilt, wenn die Heizperiode nicht aktiv ist.

* Feste Temperatur für alle Räume

Mit dieser Option können Sie für jeden Raum eine Zieltemperatur festlegen, wenn die Heizperiode nicht aktiv ist.

* Nichts

Mit dieser Option wird nichts an den Thermostat gesendet, wenn keine Heizperiode aktiv ist. Die Zieltemperatur bleibt vom letzten Ziel, als die Heizperiode noch aktiv war.
In diesem Fall und wenn Sie Aktoren vom Adapter verwenden, haben Sie die Möglichkeit zu definieren, wie die Aktoren eingestellt werden sollen (aus, an oder so lassen, wie sie sind).

## Andere
* FeiertagGegenwart / FeiertagHeute

Wenn Sie im Adminbereich „Feiertag wie Sonntag“ oder „Feiertag wie Sonntag“ aktivieren, wird das Profil für Sonntag verwendet, wenn dem Adapter mitgeteilt wird, dass heute ein Feiertag ist oder Sie im Urlaub zu Hause sind.

### Fenster geöffnet
Wenn "Sensoren verwenden" aktiviert ist und Sensor(en) für einen Raum konfiguriert sind, dann

* Aktuelle Profiltemperatur verringern, wenn Fenster geöffnet ist (true) durch Profiles.0.room.WindowOpenDecrease, wenn relative Verringerung konfiguriert ist
* Ziel auf Profiles.0.room.absolute.WindowOpenDecrease setzen, wenn Fenster geöffnet ist (true), sofern absolute Verringerung konfiguriert ist

Optional kann eine Verzögerung verwendet werden. Wenn das Fenster nur für kurze Zeit geöffnet ist, kann die Sensorverzögerung eine Reduzierung verhindern und in sehr kurzer Zeit wieder zum Normalzustand zurückkehren.

## Ical-Unterstützung
Sie können Ihren Kalender oder einen anderen Datenpunkt verwenden, um Datenpunkte im Adapter zu ändern.
Konfigurieren Sie einfach Ereignisse von ical oder anderen Datenpunkten im Admin. Unterstützt werden

| Datenpunkt | Beschreibung |-------------------------------------|-------------------------------------------------------------------------- |heatingcontrol.0.Present | setze es auf „true“ (im Falle eines Booleschen Werts) oder auf eine Zahl höher als der Grenzwert (im Falle einer Zahl) |heatingcontrol.0.HolidayPresent | setze es auf „true“, wenn Sie im Urlaub zu Hause sind |heatingcontrol.0.VacationAbsent | setze es auf „true“, wenn Sie im Urlaub nicht zu Hause sind |heatingcontrol.0.GuestsPresent | setze es auf „true“ (im Falle eines Booleschen Werts) oder auf eine Zahl höher als der Grenzwert (im Falle einer Zahl) |heatingcontrol.0.PartyNow | setze es auf „true“ (im Falle eines Booleschen Werts) oder auf eine Zahl höher als der Grenzwert (im Falle einer Zahl)

Tipp: Mit Zahlendatenpunkten könnten Sie zählen, wie viele Personen sich im Haus befinden und dann beispielsweise entscheiden: „Wir haben genug für eine Party …“

## Änderungen vom Thermostat verwenden
Viele Benutzer haben sich eine Option gewünscht, mit der Änderungen vom Thermostat in den Adapter übernommen werden können. Nun sind vier Optionen implementiert:

| Option | Beschreibung |--------------------------|--------------------------------------------------------------------------- | nein | Änderungen vom Thermostat werden ignoriert | als Übersteuerung | Änderungen vom Thermostat werden als Übersteuerung übernommen; die Übersteuerungszeit muss vorab in heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime eingestellt werden | | wenn keine Übersteuerungszeit eingestellt ist, wird die Übersteuerung nicht ausgeführt | als neue Profileinstellung | Änderungen vom Thermostat werden als Zieltemperatur für den aktuellen Profilzeitraum übernommen | bis zum nächsten Profilpunkt | Änderungen vom Thermostat werden als Zieltemperatur bis zum nächsten Profilpunkt übernommen. Dies ist ein manueller Modus, daher werden nur Fenstersensoren verwendet. Alle anderen | | Erhöhungen/Verringerungen werden ignoriert. In jedem Raum gibt es einen Datenpunkt, um den manuellen Modus zu deaktivieren, bevor der nächste Profilpunkt erreicht wird.

## Erweitern Sie die Übersteuerung, wenn sich die Temperatur ändert
Das Standardverhalten für die Übersteuerung ist, dass die Übersteuerungszeit nicht geändert wird, wenn Sie die Temperatur ändern. Wenn Sie beispielsweise die Übersteuerung für 20 Minuten mit 25 °C starten und nach 15 Minuten auf 28 °C wechseln, werden 28 °C nur für die letzten 5 Minuten verwendet. Mit dieser Option starten Sie die Übersteuerung neu, wenn Sie die Übersteuerungstemperatur ändern.
Im obigen Beispiel würden dann 28 °C für 20 Minuten verwendet, was zu 15 Minuten 25 °C und 20 Minuten 28 °C führt

## Override-Modus
Im Adminbereich sind für alle Räume zwei Modi einstellbar.

* zeitgesteuert

Dies ist die bekannte Funktion, die eine Temperatur und eine Dauer verwendet. Die angegebene Temperatur wird für die Dauer verwendet und dann wird das Temperaturziel im Automatikmodus auf den Wert zurückgesetzt.

* bis zum nächsten Profilpunkt

Dies ist eine neue Funktion. Hier können wir eine Temperaturüberschreibung bis zum nächsten Profilpunkt verwenden. Die Dauer wird ignoriert, muss aber ungleich Null sein!

## Thermostat behandelt „Fenster ist offen“
Einige Thermostate können „Fenster ist offen“ selbst handhaben. In diesen Fällen wird eine direkte Verbindung zwischen Fenstersensor und Thermostat konfiguriert und das Thermostat reduziert die Zieltemperatur selbst, wenn ein Fenster geöffnet wird.
In Kombination mit der Option „Änderungen vom Thermostat verwenden“ / „bis zum nächsten Profilpunkt“ führt dies zu einem unerwarteten manuellen Zustand. In dieser Situation würde die reduzierte Temperatur bis zum nächsten Profilpunkt verwendet.
Aber der Adapter kann dieses Verhalten handhaben. Sie müssen die Option „Thermostat verarbeitet ‚Fenster ist offen‘“ aktivieren und Sie können Fenstersensoren auch im Adapter konfigurieren.
Wenn das Fenster geöffnet wird, wartet der Adapter maximal 3 Sekunden auf eine neue Zieltemperatur vom Thermostat. Wenn er in dieser Zeit eine neue Zieltemperatur empfängt, wird diese als reduzierte absolute Temperatur verwendet. Der Status ist dann „Fenster automatisch offen“. Sobald das Fenster geschlossen wird, wechselt der Status zurück auf Auto und das Thermostat setzt die ursprüngliche Zieltemperatur zurück. **Achtung** Verwenden Sie in diesem Fall nicht die Sensor-Öffnungsverzögerung. Wenn Sie sie verwenden, erscheint das Fenster-Öffnen-Ereignis, nachdem die Zieltemperatur vom Thermostat empfangen wurde. Dies führt zum manuellen Zustand.

## Kopierzeitraum und Kopierprofil
`` Heizungssteuerung.0.Profile.1.ProfileKopieren Heizungssteuerung.0.Profile.1.Raum.ProfileKopieren ``

Und

„heatingcontrol.0.Profiles.1.Küche.Fri.CopyPeriods“

CopyProfile kopiert den gesamten Inhalt des Profils, in dem die Schaltfläche gedrückt wird, in das nächste Profil. Im obigen Beispiel befindet sich die Schaltfläche in Profil 1. Die Schaltfläche kopiert alles von Profil 1 nach Profil 2.
Wenn Sie nur einen Raum kopieren möchten, verwenden Sie die Schaltfläche in einem bestimmten Raum.

Die CopyPeriods gibt es pro Tag bzw. Mo-Fr pro Raum. Damit werden die Stunden in den nächsten Abschnitt kopiert. Im obigen Beispiel kopiert CopyPeriods alle Stunden von Freitag im Raum Küche in die Stunden am Samstag im Raum Küche.

So kann man z.B. im Profil „jeden Tag einzeln“ die Stunden von Montag bis Sonntag kopieren...

## Wartungsmodus
zu tun

## Kaminmodus
zu tun

## Handhabung des Aktuators
zu tun

Umschaltung zwischen linear und linear mit Hysterese

Beschreiben Sie zwei neue Datenpunkte: heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset und heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset

## Erweiterte Aktuatorbehandlung
überprüft, ob der Wert richtig eingestellt wurde und ob eine Bestätigung erfolgt ist, andernfalls erfolgt ein erneuter Versuch ...

zu tun

## EVU Sperrzeit / PowerInterruption
bei Erreichen der EVU-Sperrzeit werden alle Aktoren abgeschaltet und nach Ablauf der Sperrzeit wieder eingeschaltet.

Status wechselt auf „EVU Sperrzeit“ / „PowerInterruption“ Ziel: Elektroheizungen gezielt abschalten und wieder einschalten um die Belastung der Schütze zu minimieren und Einschaltströme zu minimieren Konfiguration: Start-/Endzeitpunkt der EVU-Sperrzeit, mehrere Zeiträume konfigurierbar

## Probleme und Funktionsanfragen
* Wenn Sie auf Fehler stoßen oder Funktionswünsche für diesen Adapter haben, erstellen Sie bitte ein Problem im GitHub-Problembereich des Adapters unter [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues). Jedes Feedback wird geschätzt und hilft, diesen Adapter zu verbessern.

## Bekannte Probleme
### Adapter mit Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 – 10fach, 230 V
Es scheint, dass HmIP-FAL230-C10 in Kombination mit diesem Adapter nicht direkt als Aktor verwendet werden kann. Wenn Sie HmIP-FAL230-C10 zusammen mit Homematic-Thermostaten verwenden, sollte es funktionieren.
siehe auch [Forum](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### Fenster-Auf-Funktion der HM Thermostate
HM-Thermostate verfügen über eine Fenster-offen-Funktion in zwei Varianten. Zum einen als Temperatursturzerkennung und zum anderen in Verbindung mit einem Fensterkontakt.

Diese Funktion bewirkt, dass der Adapter bei geöffnetem Fenster in den manuellen Modus wechselt. Idealerweise sollte diese Funktion deaktiviert werden, um die Funktionalität des Adapters nicht zu beeinträchtigen.

Wenn der Thermostat Informationen vom Fenstersensor verwendet, sollte die Option „Thermostat behandelt Fenster offen“ aktiviert werden.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die grundsätzlich nie abstürzen.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.12.13 (2024-11-20)
* (René) see issue #607: minimum length of telegram user reduced to one char

### 2.12.12 (2024-11-20)
* (René) see issue #422: bug fix window open/close handling
* (René) update dependencies

### 2.12.11 (2024-10-21)
* (René) see issue #611: test with nodejs@22
* (René) see issue #617: bug fix: TemperaturOverrideRemainingTime is not correct after Override interruption

### 2.12.10 (2024-08-18)
* (René) update dependencies
* (René) adaption for new Vis-2 widgets (Weather / Heating)
* (René) bug fixes based on adapter checker recommendation

### 2.12.8 (2024-06-05)
* (René) bug fix heating period: calculation of cron job string fixed

### 2.12.7 (2024-05-28)
* (René) see issue #561: change of dependencies

### 2.12.5 (2024-03-01)
* (René) see issue #492: cron jobs recalculation is necessary after reboot if VacationAtHome and PublicHoliday is active
* (René) create cron job for PowerInterruption only if feature is active
* (René) bug fix: with cron 3.x status log of cron jobs were wrong

### 2.12.4 (2024-02-11)
* (René) dependencies updated
* (Marc-Berg) update readme "temperature decrease / increase"
* (René) in some cases undefined was sent in notification messages instead of actor name
* (René) bug fix related to cron@3.x.x: show next cron job event in log

### 2.12.3 (2024-01-12)
* (René) dependencies updated

### 2.12.2 (2023-12-16)
* (René) see issue #491: bug fix in offset calculation (NaN)

### 2.12.1 (2023-11-25)
* (René) issue #459: Show the number of objects that can be deleted in the log and indicate that they can be deleted in admin
* (René) issue #376: notification messages customizable

### 2.12.0 (2023-11-22)
* (René) dependencies updated
* (René) fix eslint reported issues
* (René) see issue #486: option to use offset calculation immediately
* (René) see issue #489: increase limit of status change list to 100

### 2.11.1 (2023-07-30)
* (René) dependencies updated

### 2.11.0 (2023-06-18)
* (René) see issue #368: units added in datapoints
* (René) see issue #361: EVU Sperrzeit / PowerInterruption (description see above)
* (René) see issue #359: support of discord added to notifications
* (René) see issue #367: wait for set target temperature before checking actor changes

### 2.10.6 (2023-01-31)
* (René) see issue #355: reset override is now also with Button ResetManual possible

### 2.10.5 (2023-01-21)
* (René) see issue #356: create list if room list is empty
* (René) see issue #357: remove change event when loading telegram data
* (René) handling of exceptions reported by sentry in notification modul

### 2.10.4 (2022-12-21)
* (René) UTF8 conversion for some files
* (René) more space for same values in admin

### 2.10.3 (2022-12-19)
* (René) see issue #347: waiting time for target temperature update from thermostat adjustable per room
* (René) see issue #348: bug fix to avoid unnecessary error message

### 2.10.1 (2022-12-10)
* (René) update dependencies
* (René) see issue #337: bug fix in calculate profil position
* (René) see issue #336: translation of notification mesaages
* (René) see issue #347: bug room status if option "thermostat handles windows open" is enabled and window opened and closed
* (René) some minor bug fixes

### 2.9.3 (2022-10-28)
* (René) update dependencies
* (René) see issue #323: add telegram user to select box
* (René) see issue #325: autodetect for HmIP-WTH-2 changed

### 2.9.2 (2022-08-19)
* (René) update dependencies

### 2.9.1 (2022-06-10)
* (René) bug fix timer id's for extended actor handling
* (René) bug fix exception in SetRoomTemperature

### 2.9.0 (2022-06-09)
* (René) see issue #302: adjustable info logging for temperature, aktor and window status change
* (René) see issue #306: extended handling to set actuator state and thermostat target temperature added

### 2.8.7 (2022-04-23)
* (René) see issue #312: bug fix in window is open handling if thermostat reduces temperature

### 2.8.6 (2022-03-31)
* (René) see issue #265 and #305: bg fix window handling for rooms with more then one window and sensors with regular status update

### 2.8.5 (2022-02-12)
* (René) sentry: Cannot read property 'PARENT_TYPE' of undefined
* (René) see issue #291: inter thermostat delay added
* (René) better logging for timediff measurement with external sensors
* (René) minimum temperature check added in offset calculation

### 2.8.4 (2022-01-29)
* (René) see issue #289: round offset to 0.5°C instead 0.25°C
* (René) see issue #292: set actors when room becomes inactive like out of heating period
* (René) see issue #291: inter actuator delay added
* (René) new datapoint to show current profile target temperature

### 2.8.3 (2022-01-07)
* (René) see issue #286: Loading the configuration fixed
* (René) target temperature rounded to 0.5°C instead 0.25°C to avoid rounding on thermostat itself

### 2.8.2 (2022-01-04)
* (René) see issue #285: absent and VacationAbsent exchanged to check reduced mode
* (René) see issue #271: ack flag set only if it's in own namespace, external DP'S acks are not set anymore

### 2.8.1 (2021-12-29)
* (René) see issue #283: show internal and external temperature sensors in room status
* (René) see issue #272: extend override only if different temperature was sent
* (René) see issue #278: reset remaining override time to 0 when override is canceled
* (René) offset not to be used when room is in reduced mode (e.g. window open)
* (René) see issue #271: set ack flag for changed DP after 2 seconds, to give a chance to other adpaters to react on un-acked DP's

### 2.8.0 (2021-12-18)
* (René) see issue #266: differrent regulators for actor handling added (linear and linear with hysteresis)

### 2.7.2 (2021-11-14)
* (René) bug fix load / save profiles: check fireplace mode added
* (René) reset offset if disabled or no sensor (see issue #274)
* (René) bug fix for override in case of "use changes from thermostat as override": reset and window open handling

### 2.7.1 (2021-10-20)
* (René) see issue #268: change of override in manual mode is mssing

### 2.7.0 (2021-10-18)
* (René) see issue #259: limit for temperature offset added
* (René) see issue #227: maximum time difference between standard sensor and external sensor added
* (René) see issue #264: some changes for Pittini-vis

### 2.6.2 (2021-09-29)
* (René) see issue #260: bug fix isActive not ignored

### 2.6.1 (2021-09-25)
* (René) see issue #258: bug fix fireplace mode and vis

### 2.6.0 (2021-09-17)
* (René) maintenance mode added

### 2.5.1 (2021-08-20)
* (René) see issue #255: bug fix fireplace mode

### 2.5.0 (2021-08-20)
* (René) fireplace mode added
* (René) see issue #247: disable temp offset calculation when heating is off
* (René) see issue #223: bug fix to find correct period
* (René) see issue #194: accept float as minimum / maximum in vis settings; add warning if minumum is lower then 4.5°C

### 2.4.3 (2021-06-17)
* (René) see issue #243: bug fix for HeatingPeriod when adpater starts
* (René) see issue #245: problem with manual mode when SensorOpenDelay is used
* (René) see issue #244: bug fix for WindowOpenImg

### 2.4.2 (2021-05-17)
* (René) logging for ActorsOn optimized

### 2.4.1 (2021-05-15)
* (René) see #233: remaining override time set also for choosen room in vis
* (René) bug fix public holiday detection

### 2.4.0 (2021-05-13)
* (René) make it ready for js-controller 3.3

### 2.3.2 (2021-04-18)
* (ericsboro) vis translation to russian
* (René) see issue #231: bug fix detect heating period

### 2.3.1 (2021-04-05)
* (René) some optimisations for vis translation

### 2.3.0 (2021-03-20)
* (René) see issue #187: show remaining override timeConverter
* (René) see issue #225: support different languages for vis
* (René) see issue #223: new overide mode "until next profile point"
* (René) bug fix to calculate average for temperatur offset

### 2.2.0 (2021-02-15)
* (René) see issue #146: different type of window sensor and also adjustable comparative value
* (René) see issue #110: optionally every room can be set to "no heating" with separate datapoint
* (René) see issue #185: maintenance function: Delete all unused datapoints (e.g. profiles) is implemented now for admin
* (René) see issue #185: maintenance function: Delete all devices related to a room, when a room is deleted is implemented now for admin
* (René) see issue #207: copy buttons for vis added
* (René) see issue #219: bug fix: DecreaseValues and ProfilName are copied in CopyProfile now

### 2.1.1 (2021-02-08)
* (René) bug fix Temperatur Offset: invert sign of TemperatureOffset

### 2.1.0 (2021-01-31)
* (René) see issue #198: add name to profile as a datapoint, used to be shown in visualisation
* (René) see issue #194: limit and step width for increase / decrease values adjustable in admin 
* (René) see issue #182: Temperatur Offset
* (René) see issue #212: ActiveTimeSlot inkorrekt for vis

### 2.0.4 (2021-01-28)
* (René) bug fix for issue #213: Warnung "!!! Statechange not handled"

### 2.0.3 (2021-01-24)
* (René) bug fix for issue #211: endless change of temperatures

### 2.0.2 (2021-01-22)
* (René) bug fix for issue #208: exception "undefined is not a valid state value"
* (René) bug fix for issue #209: Not all open windows are recognized

### 2.0.1 (2021-01-19)
* (René) bug fix for issue #204: do not take over reduced temperature in manual mode
* (René) bug fix for issue #203: Warnings "has no existing object, this might lead to an error"
* (René) bug fix for issue #205: override start

### 2.0.0 (2021-01-16)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* (optionally) extend override when temperature is changed; in standard new temperature is set, but timer is not changed
* (optionally) Thermostat handles "window is open"
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden

### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined]

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined]

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start

### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License
MIT License

Copyright (c) 2019-2024 René G. <info@rg-engineering.eu>

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