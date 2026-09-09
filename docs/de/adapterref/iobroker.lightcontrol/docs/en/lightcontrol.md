---
chapters: {"pages":{"en/adapterref/iobroker.lightcontrol/README.md":{"title":{"en":"ioBroker.lightcontrol"},"content":"en/adapterref/iobroker.lightcontrol/README.md"},"en/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md":{"title":{"en":"LightControl"},"content":"en/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md
title: Lichtsteuerung
hash: zTS3Y0Z13xW/X2Cpoqtj/l144sFL7G37qMaIONtUKLw=
---
![Logo](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/lightcontrol.png)

# Lichtsteuerung

### _Lichtsteuerung von Lampen verschiedener Hersteller_

---

# Inhaltsverzeichnis

- [1 Merkmale](#1-features)
- [2 Installation](#2-installation)
- [3 Konfiguration](#3-konfiguration)
- [4 Gruppeneinstellungen](#4-gruppeneinstellungen)
  - [4.1 Lichtgruppen](#41-lichtgruppen)
  - [4.2 Allgemeine Einstellungen](#42-allgemeine-einstellungen)
- [5 Lichter und Sensoren](#5-lichter-und-sensoren)
  - [5.1 Beleuchtung](#51-lichter)
  - [5.2 Sensoren](#52-sensoren)
- [6 Datenpunkte](#7-datenpunkte)
  - [6.1 Datenpunkte für alle Gruppen](#61-datenpunkte-für-alle-gruppen)
  - [6.2 Datenpunkte für jede Gruppe](#62-datenpunkte-der-einzelnen-gruppe)
- [7. Was ist für die Zukunft geplant?](#6-was-ist-fr-die-zukunft-geplant)
- [8. Was nicht geplant ist](#8-was-ist-nicht-geplant)

---

# 1. Merkmale

- Gruppierung einer beliebigen Anzahl von Lampen/Glühbirnen
- Verwendung von Mischlampen/Farbsystemen und Umrechnung von Farbsystemen (hex, rgb, xy)
- Möglichkeit, jedem Lichtkörper Standardwerte zuzuweisen (gleiche Helligkeit trotz unterschiedlich starker Lichtquelle).
- Verwenden Sie beliebig viele Bewegungsmelder pro Gruppe
- Rampenfunktion (langsame Helligkeitsänderung zum Zielwert) für Ein- und Ausschalten
- Dimmen hoch und runter
- Automatische Abschaltung nach Zeit / Keine Abschaltung bei Bewegung;
- Automatische Abschaltung je nach Helligkeit
- Automatisches Einschalten beim Wechsel von einer bestimmten Helligkeit
- AutoOn im Dunkeln
- Automatisches Einschalten bei Erhöhung des Anwesenheitszählers ab einer bestimmten Helligkeit (Begrüßungslicht beim Nachhausekommen).
- Übersteuerung aktiviert (Reinigungslicht)
- Hauptschalter zum gleichzeitigen Ein- und Ausschalten aller Gruppen (gleichzeitige Anzeige, wenn alle Gruppen eingeschaltet sind)
- Info-Datenpunkt für "jede Gruppe ist eine"
- blinkend (Alarm, Türklingel usw.)
- Adaptive Helligkeit (Bei Außenhelligkeit über 1000 Lux volle Helligkeit (100 %), einschließlich linearer Abdunklung bis 0 Lux (2 %))
- Adaptive Farbtemperatur (4 dynamische Modi: Linear (linearer Anstieg von Sonnenaufgang bis Mittag, dann linearer Abfall bis Sonnenuntergang), Solar (berechnet anhand des Sinuswerts der Sonnenhöhe, maxCt ist saisonabhängig), SolarInterpolished (wie Solar, jedoch ohne saisonale Abhängigkeit), StartYourDay (linearer Abfall von der Startzeit bis Sonnenuntergang)![adaptive\_Ct.png](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/docs/de/img/adaptive_Ct.png)

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 2. Installation

Einfach über Adapter in ioBroker.

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 3. Konfiguration

Wenn das Kontrollkästchen " **_soll sich im Installationsfenster schließen, wenn fertig_** " nicht aktiviert ist, müssen Sie es schließen.

Das Konfigurationsfenster besteht aus folgenden Registerkarten:

- [4. Gruppeneinstellungen](#4-gruppen-einstellungen)
- [5. Beleuchtung und Sensoren](#5-lichter-und-sensoren)

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 4. Gruppeneinstellungen

Das Konfigurationsfenster öffnet sich automatisch mit den Gruppeneinstellungen, in denen die einzelnen Lichtgruppen erstellt werden.

## 4.1 Lichtgruppen

![Instanzeinstellungen - Lichtgruppen](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/02_Instance_Settings_LightGroups.jpg)

Durch Klicken auf das + wird eine neue Zeile erstellt.

- Beschreibung: Hier geben Sie der Gruppe einen Namen. Achtung: Erstellen Sie keine Duplikate!
- Individueller Lux-Sensor: Hier definieren Sie einen individuellen Lux-Sensor. Über die drei Punkte auf der rechten Seite kann eine Objekt-ID eingegeben werden. Bleibt das Feld leer, wird der globale Lux-Sensor für die Lichtgruppe verwendet, sofern eine solche definiert ist.

## 4.2 Allgemeine Einstellungen

![Instanzeinstellungen – Allgemein](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/01_Instance_Settings.jpg)

- **Globale Lux-Sensoreinstellungen**
  - Dieser Sensor wird global verwendet, es sei denn, innerhalb einer Gruppe wurde ein individueller Sensor ausgewählt.
  - Es muss ein numerischer Datenpunkt ausgewählt werden!
- **Einstellungen für die Farbtemperatur**
  - Minimalwert für die Farbtemperatur in Kelvin => Standard: 2700
  - Maximale Farbtemperatur in Kelvin => Standard: 6500
- **Dimm-Einstellungen**
  - Dimmstufen => Standard: 10
  - Minimale Helligkeit beim Dimmen über den Datenpunkt _DimmDown_ => Standard: 10
- **Anwesenheitseinstellungen**
  - Objekt-ID der Anwesenheit => Muss _wahr_ oder _falsch_ sein
  - Objekt-ID des Anwesenheitszählers => Muss eine Zahl sein.
- **Protokollierung**
  - Erweiterte Benutzerprotokollierung

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 5 Lichter und Sensoren

Alle Leuchten und Sensoren werden über die jeweiligen Datenpunkte den Lichtgruppen hinzugefügt:

![Benutzerdefinierte Konfiguration](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/07_customConfig_openSettings.jpg)

Nach dem Öffnen der Einstellungen muss die Konfiguration aktiviert werden:

![Benutzerdefinierte Konfiguration aktivieren](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/03_activate_customConfig.jpg)

## 5.1 Beleuchtung

![Lichteinstellungen](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/04_customConfig_light.jpg)

- **Objekttyp** In vielen Fällen erkennt LightControl, ob es sich um eine Lampe oder einen Sensor handelt. Falls nicht, wird \_Licht\_ als voreingestellt verwendet.

- **Lichtgruppe** Hier wählen Sie die zuvor in den Instanzeinstellungen definierten Lichtgruppen aus (Mehrfachauswahl möglich -> Fehler).

- **Lichtname:** Geben Sie einen Namen für das Licht ein. Zuvor definierte Namen werden zur Auswahl vorgeschlagen.

- **Funktion des Objekts:** In vielen Fällen erkennt LightControl die mögliche Funktion des Objekts. Sollte die automatische Erkennung nicht dem gewünschten Ergebnis entsprechen, wählen Sie die entsprechende Funktion über das Dropdown-Menü aus.

  <img src="img/06_customConfig_funcOfObject.jpg" width="200">

  - **Schalten**

    - Einschaltwert - _Wert für Beispiel: wahr_
    - Ausschaltwert - _Wert für Beispiel: false_

  - **Helligkeit**

    - Wert für minimale Helligkeit – _Wert der niedrigsten Helligkeit.z.B.0_
    - Wert für maximale Helligkeit - _Wert für maximale Helligkeit, z. B. 100_
    - Wert/Offset für Helligkeit - _Maximalwert zur Anpassung der Helligkeit an die anderen Lampen innerhalb der Gruppe._
    - Helligkeit zum Schalten verwenden – _Verwenden Sie den Helligkeitszustand der Lampe zum Ein-/Ausschalten anstelle des Leistungszustands._

  - **Farbtemperatur**

    - Wert für die minimale Farbtemperatur – _Minimalwert des Datenpunkts. z. B. 0_
    - Wert für die maximale Farbtemperatur – _Maximalwert des Datenpunkts, z. B. 100._
    - Verhalten der Farbtemperatur - _Bestimmung des Verlaufs der Farbtemperatur (von warmweiß zu kaltweiß, von kaltweiß zu warmweiß oder von trübweiß)_
    - Minimaler Kelvin-Wert – Entspricht dem Kelvin-Wert des Minimalwerts des Datenpunkts. Beispiel: 2700
    - Maximaler Kelvin-Wert – Entspricht dem Kelvin-Wert des Maximalwerts des Datenpunkts. Beispiel: 6500
    - Farbtemperatur senden - _Farbtemperaturwert auch dann festlegen, wenn die Lampe ausgeschaltet ist_

  - **Sättigung**

    - Wert für minimale Sättigung - _Wert für niedrigste Sättigung.z0_
    - Wert für maximale Sättigung - _Wert für maximale Sättigung, z. B. 100_
    - Sättigung senden – _Sättigungswert auch dann festlegen, wenn die Lampe ausgeschaltet ist_

  - **Modusumschalter**

    - Wert für Weißmodus – _Wert für Weißmodus, z. B. false_
    - Wert für den Farbmodus – _Wert für den Farbmodus, z. B. „true“._
    - Sende Modusschalter – _Lege den Wert des Modusschalters auch dann fest, wenn die Lampe ausgeschaltet ist._

  - **Farbe**
    - Farbtyp - _Art der Farbspezifikation (HEX => #FFFFFF // RGB => 255,255 // XY => \[0,4992,0,418])_
    - Standardwert für Farbe _– Standardwert, z. B. #FFFFFF_
    - Farbe senden – _Farbwert auch dann festlegen, wenn die Lampe ausgeschaltet ist_

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

## 5.2 Sensoren

### 4.2.1 Allgemeines

- Wenn ein Sensor auslöst, wird das Licht eingeschaltet (sofern in den Datenpunkten aktiviert).
- Der Abschaltvorgang wird erst dann gestartet, wenn ALLE Sensoren keine Daten mehr erfassen (sofern in den Datenpunkten aktiviert).

> Hinweis: Theoretisch können hier auch Schalter angegeben werden, sofern unterschiedliche Werte für Ein/Aus vorhanden sind. Der Abschaltvorgang hängt jedoch von der Einstellung ab; beispielsweise schaltet sich das Licht nach 60 Sekunden aus.

![Benutzerdefinierter Konfigurationssensor](../../../../../en/adapterref/iobroker.lightcontrol/docs/en/img/08_customConfig_sensor.jpg)

- Wert für Bewegung – _Wert für erkannte Bewegung; z. B. wahr_
- Wert für „keine Bewegung“ – _Wert für keine Bewegung, z. B. „false“._

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

# 6 Datenpunkte

## 6.1 Datenpunkte für alle Gruppen

- **Alle**
  - **Stromversorgung:** Alle Gruppen ein/aus / Anzeige, wenn alle Gruppen eingeschaltet sind
  - **anyOn:** _true,_ wenn mindestens eine Gruppe aktiv ist.

## 6.2 Datenpunkte für jede Gruppe

- **Gruppe**

  - **autoOffLux:** Automatische Abschaltung des Lichts bei Erreichen eines Helligkeitsschwellenwerts

    - **Aktiviert:** Automatische Abschaltung bei Helligkeit aktivieren/deaktivieren
    - **minLux:** minimaler Lichtwert
    - **dailyLock:** AutoOffTimed wird nicht ausgeführt, wenn false
    - **Operator:** Vergleichen Sie, ob das Licht oberhalb oder unterhalb _von minLux_ ausgeschaltet werden soll (z. B. > / < / >= / <=)

  - **autoOffTimed:** Automatische Abschaltung nach festgelegter Zeit (nur in Verbindung mit den Sensoren)

    - **Aktiviert:** Automatische Abschaltung aktivieren/deaktivieren
    - **autoOffTime:** Zeit bis zur automatischen Abschaltung in Sekunden
    - \*noAutoOffWhenMotion:\*\* Automatische Abschaltung wird bei Bewegung zurückgesetzt
    - **noticeEnabled:** Hinweis für AutoOff aktivieren/deaktivieren (Funktioniert derzeit nicht)
    - **noticeBri:** Helligkeit in Prozent vor der automatischen Abschaltung
    - **Hinweiszeit:** Zeit in Sekunden bis zur automatischen Abschaltung

  - **autoOnLux:** Automatisches Einschalten des Lichts bei Lux

    - **Aktiviert:** Aktivieren/Deaktivieren
    - **minLux:** Lux-Schwellenwert für die Umschaltung
    - **bri:** Helligkeit, mit der sich das Licht einschaltet
    - **Farbe:** die Farbe, mit der das Licht aufgeht
    - **switchOnlyWhenPresence:** Nur einschalten, wenn jemand zu Hause ist
    - **switchOnlyWhenNoPresence:** Nur einschalten, wenn niemand zu Hause ist
    - **dailyLock:** AutoOnLux wird nicht ausgeführt, wenn false
    - **Operator:** Vergleichen Sie, ob das Licht oberhalb oder unterhalb _von minLux_ eingeschaltet werden soll (z. B. > / < / >= / <=)

  - **autoOnMotion:** Das Licht schaltet sich automatisch ein, wenn sich das Licht bewegt.

    - **Aktiviert:** Aktivieren/Deaktivieren
    - **minLux:** Lux-Schwellenwert für die Umschaltung
    - **bri:** Helligkeit, mit der sich das Licht einschaltet
    - **Farbe:** die Farbe, mit der das Licht aufgeht

  - **autoOnPresenceIncrease:** Die Leuchte schaltet sich automatisch ein, wenn der Wert des Anwesenheitszählers einen bestimmten Wert überschreitet.

    - **Aktiviert:** Aktivieren/Deaktivieren
    - **minLux:** Lux-Schwellenwert für die Umschaltung
    - **bri:** Helligkeit, mit der sich das Licht einschaltet
    - **Farbe:** die Farbe, mit der das Licht aufgeht

  - **blinken:** blinken

    - **aktiviert:** Beginnt in einer Endlosschleife zu blinken, => hört auf zu blinken
    - **Start:** Beginnt zu blinken, bis die Zahl erreicht ist.
    - **Frequenz:** Blinkfrequenz in Sekunden
    - **Blinken:** Anzahl der Indikatoren
    - **bri:** Helligkeit der Lampen im Blinkmodus
    - **Farbe:** Farbe der Lampen im blinkenden Zustand

  - **rampOff:** Dimmen bei ausgeschaltetem Strom

    - **Aktiviert:** Aktivieren/Deaktivieren
    - **Zeit:** Dimmzeit (sollte nicht weniger als 10 Sekunden betragen)
    - **switchOutletsLast:** Lampen, die nur zuletzt ein-/ausgeschaltet werden?

  - **rampOn:** Hohe Abstimmung beim Einschalten

    - **Aktiviert:** Aktivieren/Deaktivieren
    - **Zeit:** Zeit für hohe Töne (sollte nicht weniger als 10 Sekunden betragen)
    - **switchOutletsLast:** Lampen, die nur zuletzt ein-/ausgeschaltet werden?

  - **adaptiveBri:** Adaptive Helligkeit ein/aus

  - **adaptiveCt:** Adaptive Farbtemperatur ein/aus

  - \*Adaptiver Modus:\*\* Adaptiver Farbtemperaturmodus
    - **Linear** (Sonnenaufgang -> Mittag -> Sonnenuntergang)
    - **Solar** (gemäß der Sonnenhöhe und dem berechneten Sinus ist maxCt saisonabhängig)
    - **SolarInterpolished** (wie Solar, aber ohne saisonale Abhängigkeit)
    - **StartYourDay** (linear absteigend von Startzeit - Sonnenuntergang)

  - **adaptiveCtTime:** Startzeit für adaptive Farbtemperaturen im Modus: StartYourDay

  - **bri:** Helligkeit einstellen (0-100%)

  - **Farbe:** Farbe als Hexadezimalwert festlegen (#FFFFFF)

  - **ct:** Farbwert in Kelvin festlegen

  - **dimmAmount:** Schritte zum Dimmen in %

  - **dimmDown:** Tastendimmung

  - **dimUp:** Tastenhöhe

  - \*isMotion:\*\* Sensoren aktivieren/deaktivieren

  - **Strom:** Ein-/Ausschalten

  - **powerCleaningLight:** Reinigungslicht (stellt Helligkeit auf 100 % und Farbtemperatur auf Kaltweiß ein)

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 7. Was ist für die Zukunft geplant?

- [ ] Codebereinigung...;-)
- [ ] Hinweisfunktion für AutoOff bei reduzierter Helligkeit
- [ ] Integration einfacher Tastenereignisse (Ein/Aus/Dimmen) für jede Gruppe

---

- [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

# 8. Was nicht geplant ist

- [x] Zeitpläne zum Aktivieren oder Deaktivieren von Funktionen oder zum Einstellen verschiedener Helligkeitsstufen usw.