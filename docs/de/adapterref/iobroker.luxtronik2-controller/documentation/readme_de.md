---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"Luxtronik 2 Controller\\n\\nAdapter to control Luxtronik 2.x heat pumps."},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md
title: kein Titel
hash: zmswxOA/FXFtGmPfEoCGNqoWxHYmb7vCQu/XaYn4c/A=
---
## Installation & Konfiguration

1. Installieren Sie den Adapter über das ioBroker-Repository.

2. Tragen Sie in der Instanz-Konfiguration die IP-Adresse der Wärmepumpe ein.

3. Der Standard-Port lautet 8889.

4. Wählen Sie im Reiter „Datenpunkte“ die gewünschten Verzeichnisse (z. B. Heizung, Warmwasser, Tabellen) aus.

5. Definieren Sie im Reiter „Verhalten & Vorgabewerte“ die Standardwerte, auf die der Adapter nach manuellen Eingriffen zurückfallen soll.

## Aktionen & Automatisierungen (Ordner: Aktionen)

Der Adapter stellt im ioBroker-Objektbaum steuerbare Datenpunkte zur Verfügung:

1. Intelligente Takt-Optimierung (Regelung\_Aktiv) Bei aktiver Regelung reduziert der Adapter die Anzahl der Starts durch Kombination von Zyklen:

- **Kombinierter Takt** : Steht die Warmwasserbereitung zeitnah an und es besteht Heizbedarf, wird der Heizzyklus vorgezogen.

- **Heizen nach Warmwasser** : Nach einer Speicherladung wird die Funktion Heizen nach Warmwasser temporär aktiviert. Die Heizung läuft weiter, bis die gewünschte Rücklauftemperatur zuzüglich Hysterese erreicht ist.

- Nach Abschluss des kombinierten Taktes (Wechsel in den Leerlauf) setzt der Adapter alle veränderten Parameter auf die definierten Vorgabewerte zurück.

2. **Aktion** Zwangsheizen (Zwangsheizen) Prüft, ob sich die Anlage im Leerlauf befindet. Ist die aktuelle Rücklauftemperatur geringer als der Sollwert plus Hysterese, wird der Fußpunkt der Heizkurve temporär auf 35 °C angehoben, um einen Heiztakt auszulösen.

3. **Aktion** Zwangswarmwasser (Zwangswarmwasser) Prüft, ob die Warmwasser-Ist-Temperatur mindestens 1 K unter dem Sollwert liegt. Stirbt der Herbst, wird die Warmwasser-Hysterese auf 1 K reduziert, um die Aufheizung zu starten.

4. **Aktion** Zirkulation triggern (Activate\_Zip) Startet die Zirkulationspumpe für die in der Konfiguration festgelegte Dauer (zip\_aktiv). Befindet sich die Warmwassertemperatur bereits über dem Sollwert, nutzt der Adapter hilfsweise das interne Entlüftungsprogramm der Wärmepumpe, um die Zirkulation auszulösen, ohne bestehende Zeitprogramme zu überschreiben. Befindet sich die LWP nicht im Leerlauf, wird die aktive Tabelle für die Zirkulation angepasst und nach Ablauf wieder auf die offiziellen Werte zurückgesetzt.

## Erweiterte Integrationen und Überwachung

1. Bewegungsmelder-Kopplung (Smart-ZIP) Der Adapter bietet die Möglichkeit, ioBroker-Bewegungssensoren (z. B. im Badezimmer) direkt über die Konfigurationsoberfläche zu verknüpfen, um die Zirkulationspumpe bedarfsgerecht zu steuern.

- **Funktionsweise** : Registriert der Adapter eine Bewegung an einem abonnierten Sensor, wird geprüft, ob die Zirkulationspumpe bereits physisch läuft.

- **Sperrzeit-Logik** : Um ein permanentes Takten der Pumpe bei kontinuierlicher Bewegung zu verhindern, wird die in der Konfiguration hinterlegte Sperrzeit (Standard: 10 Minuten) abgeglichen. Ist dieser seit dem letzten Lauf verstrichen, wird das Makro Activate\_Zip automatisch ausgelöst.

2. Fehler-Benachrichtigungen (Alarm-Management) Der Adapter überwacht kontinuierlich den Fehlerspeicher der Luxtronik-Steuerung und vergleicht die Zeitstempel der hinterlegten Codes. Tritt eine neue Störung auf, stellt das System zwei Alarmierungswege zur Verfügung:

- **ioBroker Benachrichtigungszentrale** : Der Fehler wird nativ an das ioBroker-System übergeben und in der Kategorie lwpError (System-Glocke) hinterlegt.

- **Telegram-Integration** : Sofern konfiguriert, sendet der Adapter eine formatierte Nachricht (inkl. Fehlercode, Klartextbeschreibung und Zeitstempel) direkt an die angegebene Telegram-Instanz.

- **Test-Funktion** : Über den Button in den Adapter-Einstellungen kann jederzeit ein Test-Alarm ausgelöst werden. Dieser liest den historischen Fehlerspeicher aus und simuliert den reibungslosen Versand über die konfigurierten Kanäle.

## Eigene Werte anlegen (Custom States)

Zusätzliche Datenpunkte der Luxtronik-Steuerung können manuell eingebunden werden:

1. Öffnet die Adapter-Einstellungen und wählt die **benutzerdefinierten Datenpunkte** aus.

2. Füge einen neuen Eintrag hinzu.

3. Tragen Sie die entsprechende **Luxtronik ID (Index)** ein.

4. Wähle die Datenquelle:
   - Messwert (rawValues): Lesezugriff für Sensordaten (Index 3004).

   - Parameter (rawParams): Lese- und Schreibzugriff für Einstellungen (Index 3003).

5. Definieren Sie den Namen und den gewünschten Datentyp (Zahl, Text, Boolean, oder Datum/Uhrzeit).

6. Nach dem Speichern wird der Datenpunkt im Verzeichnis Benutzer angelegt.