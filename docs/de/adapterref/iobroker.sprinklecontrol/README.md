---
BADGE-Number of Installations: http://iobroker.live/badges/sprinklecontrol-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true
---
![Logo](img/sprinklecontrol.png)
# SprinkleControl
### *Der Adapter zur individuellen automatischen Gartenbewässerung. << so wie es jeder mag >> ;-)*


---

<a id="inhaltsverzeichnis"></a>
# Inhaltsverzeichnis 
* [1 Grundlegendes](#1-grundlegendes)
* [2 Installation](#2-installation)
* [3 Konfiguration](#3-konfiguration)
* [4 Haupteinstellungen - Startseite](#4-haupteinstellungen) 
  * [4.1 Aufbau der Tabelle](#41-aufbau-der-tabelle) 
  * [4.2 spezifische Konfiguration des jeweiligen Bewässerungskreises](#42-spezifische-konfiguration-des-jeweiligen-bewsserungskreises)
    * [4.2.1 Haupteinstellungen des Ventils](#421-haupteinstellungen-des-ventils)
      * [4.2.1.1 Bewässerungseinstellungen](#4211-bewsserungseinstellungen)
      * [4.2.1.2 Einschaltpunkt zum Gießen](#4212-einschaltpunkt-zum-gieen)
        * [Berechnung der Verdunstung](#einschaltpunkt-berechnung)
        * [Bodenfeuchte-Sensor bistabil](#einschaltpunkt-bistabil)
        * [Bodenfeuchte-Sensor analog](#einschaltpunkt-analog)
        * [Start an festen Wochentagen (ohne Sensoren)](#einschaltpunkt-feste-tage)
    * [4.2.2 Pumpeneinstellungen des Ventils](#422-pumpeneinstellungen-des-ventils) 
* [5 Pumpen-Einstellungen](#5-pumpen-einstellungen) 
* [6 Zeit-Einstellungen](#6-zeit-einstellungen) 
* [7 Zusätzliche-Einstellungen](#7-zustzliche-einstellungen) 
  * [7.1 Astro-Einstellungen](#71-astro-einstellungen)
  * [7.2 Zusätzliche Benachrichtigungseinstellung](#72-zustzliche-benachrichtigungseinstellungen) 
  * [7.3 Sensoren zur Berechnung der Verdunstung](#73-sensoren-zur-berechnung-der-verdunstung) 
  * [7.4 Wettervorhersage](#74-wettervorhersage) 
* [8 Benachrichtigungen](#8-benachrichtigungen) 
  * [8.1 Telegram](#81-telegram) 
  * [8.2 Pushover](#82-pushover) 
  * [8.3 E-Mail](#83-e-mail) 
  * [8.4 WhatsApp](#84-whatsapp) 
* [9 Objekte](#9-objekte) 
  * [9.1 control](#91-control) 
  * [9.2 evaporation](#92-evaporation) 
  * [9.3 info](#93-info) 
  * [9.4 sprinkle](#94-sprinkle) 
* [10 Was ist für die Zukunft geplant](#10-was-ist-fr-die-zukunft-geplant) 

---


<a id="1-grundlegendes"></a>
# 1. Grundlegendes

In SprinkleControl werden die Umweltdaten (Temperatur, Luftfeuchtigkeit, Helligkeit, Windgeschwindigkeit, Regenmenge) ausgewertet.
Die so ermittelte Verdunstung dient der Ermittlung der theoretischen Bodenfeuchte, der einzelnen Bewässerungskreise.
Zu einer unter "Zeit-Einstellungen" festgelegten Zeit, werden die Bewässerungskreise aktiviert die einen festgelegten prozentualen Wert unterschreiten.
Diese verschiedenen Bewässerungskreise werden dann so angesteuert, das die max. Pumpenleistung (l/h) und die max. Anzahl der Bewässerungskreise nicht überschritten wird.
Beides ist individuell anpassbar.

![schaltverhalten.jpg](img/schaltverhalten.jpg)

**Beispiel eines Schaltverhaltens an einem Tag (Startzeit aller Ventile: 6:00)**      


Meine Bewässerung arbeitet mit dem Homematic IP Wettersensor plus (HmIP-SWO-PL) und **wurde nur mit dieser** getestet.
Im ioBroker Forum laufen aber auch einige Tests mit Wetterstationen über den Sainlogic Adapter.

---
* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="2-installation"></a>
# 2. Installation

Der Adapter befindet sich im "stable“ Verwahrungsort von ioBroker. Von hier kann er heruntergeladen werden. 
Um ihn installieren zu können muss man in den Adapter von ioBroker gehen und dort "VON GITHUB" anklicken. 
Unter "Adapter auswählen" wählt man dann "sprinkleControl [Dirk-Peter-md]" aus und drückt dann installieren.

Spätestens nach Refresh der Adapterliste steht der Adapter **Sprinkle Control** zur Verfügung.

Nach anklicken des (+) wird eine Instanz angelegt und die notwendigen Daten des Adapters vom Repository geladen:

---
* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="3-konfiguration"></a>
# 3. Konfiguration

Sollte in dem Installationsfenster die Checkbox "***schließen, wenn fertig***" nicht angehakt sein muss man dieses natürlich noch schließen.

Das Konfigurationsfenster besteht aus den Reitern:
* [4. Haupteinstellungen](#4-haupteinstellungen)
* [5. Pumpeneinstellungen](#5-pumpen-einstellungen)
* [6. Zeit-Einstellungen](#6-zeit-einstellungen)
* [7. Zusätzliche-Einstellungen](#7-zustzliche-einstellungen)
* [8. Benachrichtigungen ](#8-benachrichtigungen) (nur sichtbar, wenn Benachrichtigungen unter Zusätzliche-Einstellungen aktiviert ist)

---
* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="4-haupteinstellungen"></a>
# 4. Haupteinstellungen

Das Konfigurationsfenster öffnet sich automatisch mit den Haupteinstellungen

![main.png](img/main.jpg)

Auf dieser Seite ist eine Beispiel-ID abgelegt.
Diese bitte löschen und anschließend die eigenen IDs durch anklicken des (+) links oben über der Tabelle die eigenen Sprinkleraktoren hinzufügen.

Dabei bitte die Datenpunkte mit STATE (o. ä.) auswählen. NICHT das Gerät als solches.


![Select_ID.jpg](img/Select_ID.jpg)

Nach Abschluss der ID-Auswahl ist der Adapter bereits betriebsbereit, aber noch nicht an die eigenen Wünsche angepasst.

---


<a id="41-aufbau-der-tabelle"></a>
## 4.1. Aufbau der Tabelle

![main_tab.jpg](img/main_tab.jpg)

**Nr** – fortlaufende Nummer der gelisteten Bewässerungskreise

**aktiv** – Checkbox zur Aktivierung der Steuerung des entsprechenden Bewässerungskreises

**Name** – Name des Ventilkreises; (Dieser wird bei der Auswahl der ID automatisch aus den Objekten eingelesen. Dieser Name kann individuell angepasst werden. Es dürfen aber keine Duplikate vorkommen.)

**Objekt-ID-Sprinkler** – eindeutige ID des zu steuernden Datenpunkts in den Objekten

**(+)** – Hinzufügen/Ändern der ID

**Bleistift** – spezifische Konfiguration des jeweiligen Bewässerungskreises

**Pfeile** – verändern der Reihenfolge der verschiedenen Bewässerungskreise in der Tabelle

**Mülleimer** – Löschen der ID mit allen konfigurierten Daten!

---


<a id="42-spezifische-konfiguration-des-jeweiligen-bewsserungskreises"></a>
## 4.2. spezifische Konfiguration des jeweiligen Bewässerungskreises

Diese Konfigurationsebene besteht aus zwei Reitern: [**Haupteinstellungen**](#421-haupteinstellungen-des-ventils) und [**Pumpeneinstellungen**](#422-pumpeneinstellungen-des-ventils)

---


<a id="421-haupteinstellungen-des-ventils"></a>
### 4.2.1. Haupteinstellungen des Ventils

![Ventil-Haupteinstellung.jpg](img/Ventil-Haupteinstellung.jpg)

---


<a id="4211-bewsserungseinstellungen"></a>
#### 4.2.1.1 Bewässerungseinstellungen

![bew-einstellung.jpg](img/bew-einstellung.jpg)

* **Bewässerungszeit in min** – Einstellung der Zeit zum Bewässern in Minuten
    > **Information** → Unter "Berechnung der Verdunstung“ und "Bodenfeuchte-Sensor analog“ wird die Bewässerungszeit verlängert je weiter der Trigger "niedrigster Prozentsatz der Bodenfeuchte“ unterschritten wurde.
    > Bei **Start an festen Wochentagen (ohne Sensoren)** und **Bodenfeuchte-Sensor bistabil** erfolgt die Verlängerung proportional der extraterrestrische Strahlung ihrer Region.
* **maximale Bewässerungsverlängerung in %** – Begrenzung der Bewässerungsdauer in Prozent (100 % = Bewässerungsdauer wird nicht verlängert)
    > **Information** → Bei **Start an festen Wochentagen (ohne Sensoren)** und **Bodenfeuchte-Sensor bistabil** wird hier die Verlängerung der Bewässerungszeit angegeben. Wobei am 21.12.
     die Bewässerungszeit gleich der Eingabe und am 21.6. gleich der maximalen Verlängerung entspricht. Dazwischen wird die Bewässerungszeit proportional der extraterrestrische Strahlung ihrer Region angepasst.
* **Bewässerungsintervall in min** – Die Bewässerungsdauer wird in einem Intervall aufgeteilt. (z. B. 5 min an, mindestens 5 min aus, 5 min an, usw.)
    > **Tipp** –> Ich habe bei der Autoauffahrt ein Rasengitter verlegt. Hier läuft das Wasser beim Bewässern einfach nur die Schräge herunter. Durch die Bewässerung in Intervallen konnte ich dem entgegenwirken.

---


<a id="4212-einschaltpunkt-zum-gieen"></a>
#### 4.2.1.2 Einschaltpunkt zum Gießen

![einschaltpunkt-giessen.jpg](img/einschaltpunkt-giessen.jpg)

* Über **Methode zur Kontrolle der Bodenfeuchtigkeit** werden die verschiedenen Sensoren, zur Steuerung der Bewässerung und deren verhalten, festgelegt.
    > **Information** → Über [**„Zusätzliche Einstellungen" → „Wettervorhersage"**](#74-wettervorhersage) kann der Startvorgang verschoben werden, wenn es Regen soll. 
* zur Verfügung stehende Methoden:
  * [Berechnung der Verdunstung](#einschaltpunkt-berechnung)
  * [Bodenfeuchte-Sensor bistabil](#einschaltpunkt-bistabil)
  * [Bodenfeuchte-Sensor analog](#einschaltpunkt-analog)
  * [Start an festen Wochentagen (ohne Sensoren)](#einschaltpunkt-feste-tage)
    * Drei Tage Rhythmus
    * Jeden zweiten Tag
    * An festen Wochentagen

---


<a id="einschaltpunkt-berechnung"></a>
#### **Berechnung der Verdunstung**
        
  ![Berechnung der Verdunstung](img/ber-verdunstung.jpg)
  + ***Zusätzliche Bewässerung bei hoher Verdunstung***
    + **Zusätzliche Bewässerungszeit in min** Diese Zeile wird unter ZEIT EINSTELLUNGEN => Zusätzliche Startzeit aktiviert und ist für Gebiete mit Sandigen Boden gedacht, wo **eine Wassergabe** pro Tag nicht ausreichen würde.
      > **Tipp** -> maximale Bodenfeuchte nach der Bewässerung in (mm) <= 6; Bodenfeuchte = 100 % nach der Bewässerung = deaktiviert; Einschaltpunkt (Bodenfeuchte) der Bewässerungsventile in % >= 60
  
  + ***Einschaltpunkt zum Gießen***
    + **Methode zur Kontrolle der Bodenfeuchtigkeit** Hier wird die Art der Bewässerung ausgewählt, wie unter [4.2.1.2 Einschaltpunkt zum Gießen](#4212-einschaltpunkt-zum-gieen) beschrieben ist.
    + **Sensor im Gewächshaus** bei true (Auswahl) wird aktuelle Regenmenge und die Regenvorhersage nicht berücksichtigt
    + **Einschaltpunkt (Bodenfeuchte) der Bewässerungsventile in %** – Auslösetrigger: Wenn dieser Wert unterschritten wird, so beginnt zum Startzeitpunkt die Bewässerung.
    + **Bodenfeuchte = 100 % nach der Bewässerung** Bei Aktivierung, wird die Bodenfeuchte nach der Bewässerung auf 100 % gesetzt. Dies kann passieren, wenn eine Begrenzung der Bewässerungszeit über die Aktivierung der **maximalen Bewässerungsverlängerung in %** erfolgt.

  + ***maximale Bodenfeuchtigkeit***
    * **maximale Bodenfeuchte nach der Bewässerung in (mm)** – Max. Wassergehalt im Boden nach der Bewässerung.
        > **Tipp** –> Rasengitter: 5; Blumenbeet: 10; Rasenfläche: 14
    * **maximale Bodenfeuchte nach einem Regen in (%)** – Max. Wassergehalt im Boden nach einem kräftigen Regen. Die Prozentzahl bezieht sich auf die max. Bodenfeuchtigkeit nach der Bewässerung 
        > **Tipp** –> Je größer der Wert ist, um so länger wird nach einem kräftigen Regen nicht bewässert.

  + ***Funktionsweise Berechnung der Verdunstung***

  ![Beispiel einer Calculation](img/calculation.jpg)
  Die aktuelle Verdunstung wird ständig mit dem eintreffen neuer Wetterdaten von der Bodenfeuchte abgezogen (blaue Linie). Wenn nun zum Einschaltpunkt der Bewässerung die aktuelle Bodenfeuchte (actualSoilMoisture) unter dem Einschaltpunkt (im Diagramm 50%) liegt, so wird das Ventil gestartet.
  An der blauen Linie kann man auch die Zeitverlängerung gut erkennen. Wenn wir nun davon ausgehen, das die Bodenfeuchte bei 13,6 % lag, so ergibt sich eine Verlängerung der Bewässerung auf 104 min. Wenn wir nun eine so lange Bewässerung nicht wollen, so können wir unter Bewässerungseinstellungen => maximale Bewässerungsverlängerung in % das ganze begrenzen.
  In unserem Fall auf 100%. Beim Bewässern würden wir also die rote Linie wieder hinauf fahren und mit etwas unter 63,6 % die Bewässerung beenden, da ja während des Bewässerns auch eine Verdunstung stattfindet. Da nach der Bewässerung wir aber wieder mit 100 % Bodenfeuchtigkeit starten sollten, sollte man in diesem Fall **Bodenfeuchte = 100 % nach der Bewässerung** aktivieren.
  Eine Ausnahme bildet die zusätzliche Bewässerung!

  + ***Zusätzliche Bewässerung bei hoher Verdunstung***

  ![Beispiel einer Zusätzlichen Bewässerung](img/addTime.jpg)
  Wenn unter [**ZEIT EINSTELLUNGEN => Zusätzliche Startzeit**](#6-zeit-einstellungen) aktiviert wurde, so wird diese Zeile eingeblendet.
  Desweiteren müssen die ausgewählten Startbedingungen (ETpToday > x mm oder externe Freigabe) unter ZEIT EINSTELLUNGEN => Zusätzliche Startzeit erfüllt sein, damit die zusätzliche Startzeit aktive wird.
  Sind diese Bedingungen erfüllt, so startet die zusätzliche Bewässerung zur angegebenen Zeit, wenn actualSoilMoisture in unserem Beispiel des oberen Diagramms unter 40 % ist. Hierbei läuft die Bewässerung bis der Einschaltpunkt (60 %) wieder erreicht wurde.

---


<a id="einschaltpunkt-bistabil"></a>
+ **Bodenfeuchte-Sensor bistabil** 

    ![bistabil.jpg](img/bistabil.jpg)

    + **Zusätzliche Bewässerungszeit bei hoher Verdunstung**
      
      Diese Zeile wird unter ZEIT EINSTELLUNGEN => Zusätzliche Startzeit aktiviert und ist für Gebiete mit Sandigen Boden gedacht, wo **eine Wassergabe** pro Tag nicht ausreichen würde.
      + Aktivierung einer zusätzlichen Bewässerung unter Objekten:   sprinklecontrol. ... .control.addStartTimeSwitch Dies kann mittels externen Script erfolgen.
      + **Zusätzliche Bewässerungszeit in min** Zeit der zusätzlichen Bewässerung
        > Achtung: Wenn diese Zeit zu lang ist, wird dieses Ventil am nächsten Tag nicht starten, da der Boden noch zu feucht ist. (keine Verdunstung in der Nacht)

    + **Einschaltpunkt zum Gießen (Bodenfeuchte-Sensor → bistabil true(Bewässerung ein), false(Bewässerung aus))**

      + **Bodenfeuchte-Sensor** Auswahl des Sensors über das PLUS-Zeichen
      + **Sensor im Gewächshaus** bei true (Auswahl) wird die Regenvorhersage nicht berücksichtigt

---


<a id="einschaltpunkt-analog"></a>
+ **Bodenfeuchte-Sensor analog**

    ![analog.jpg](img/analog.jpg)
    
    + **Zusätzliche Bewässerung bei hoher Verdunstung**

      Diese Zeile wird unter ZEIT EINSTELLUNGEN => Zusätzliche Startzeit aktiviert und ist für Gebiete mit Sandigen Boden gedacht, wo **eine Wassergabe** pro Tag nicht ausreichen würde.
      + Aktivierung einer zusätzlichen Bewässerung unter Objekten:   sprinklecontrol. ... .control.addStartTimeSwitch Dies kann mittels externen Script erfolgen.
      + **Zusätzliche Bewässerungszeit in min** => Bewässerungszeit der zusätzlichen Bewässerung in Minuten
      + **Einschaltpunkt (Bodenfeuchte) der zusätzlichen Bewässerungszeit** → Einschaltpunkt der Bewässerung in Prozent des analogen Bodenfeuchtesensors
      > Achtung: Wenn die Bewässerungszeit zu lang ist, wird dieses Ventil am nächsten Tag nicht starten, da der Boden noch zu feucht ist. (keine Verdunstung in der Nacht)

    **Einschaltpunkt zum Gießen (Berechnung der Verdunstung → analog interne Umrechnung in 0 - 100 %)**
    + **Methode zur Kontrolle der Bodenfeuchtigkeit** → Bodenfeuchte-Sensor analog
    + **Bodenfeuchte-Sensor** → Auswahl des Sensors über das PLUS-Zeichen
    + **Sensor im Gewächshaus** → bei true (Auswahl) wird die Regenvorhersage nicht berücksichtigt
    + **Einschaltpunkt (Bodenfeuchte) der Bewässerungsventile in %** → Auslösetrigger: Wenn dieser Wert unterschritten wird, so beginnt zum Startzeitpunkt die Bewässerung.

  #### Konfiguration des analogen Bodenfeuchte-Sensors

  * **analoger Bodenfeuchte-Sensor bei 0 Prozent (Sensor in der Luft)** → Wert des Sensors an der Luft hier eingeben! Sollte dieser unterschritten werden erfolgt eine Warnung im Protokoll(Debug)
  * **analoger Bodenfeuchte-Sensor bei 100 Prozent (Sensor im Wasser)** → Wert des Sensors im Wasser hier eingeben! Sollte dieser überschritten werden erfolgt eine Warnung im Protokoll(Debug)

---


+ **Start an festen Wochentagen (ohne Sensoren)** <a id="einschaltpunkt-feste-tage"></a>

    ![festeTage.jpg](img/festeTage.jpg)
    **Auswahl der Bewässerungstage in der Woche**
    + **Sensor im Gewächshaus** → Bei Aktivierung wird durch eine Regenvorhersage die Bewässerung nicht um einen Tag verschoben. 
    + **Drei Tage Rhythmus** → Der 1. Tag der Bewässerung ist der Folgetag, nach dem Speichern der Konfiguration, und dann jeden 3. Tag in Folge.
    + **Jeden zweiten Tag** → Der 1. Tag der Bewässerung ist der Folgetag, nach dem Speichern der Konfiguration, und dann jeden 2. Tag in Folge.
    + **An festen Wochentagen** → Die Bewässerungstage werden individuell nach Wochentagen bestimmt.
    > **Info** → Die Bewässerungsdauer wird verlängert siehe [Bewässerungseinstellungen](#4211-bewsserungseinstellungen)
  > 
    > **Tipp** → Bei der Auswahl **Drei Tage Rhythmus** und **Jeden zweiten Tag** kann unter Objekte sprinkle.*.postponeByOneDay die Bewässerung um einen Tag weitergeschaltet werden.
    
---


<a id="422-pumpeneinstellungen-des-ventils"></a>
### 4.2.2. Pumpeneinstellungen des Ventils

![Ventil-Pumpeneinstellung.jpg](img/Ventil-Pumpeneinstellung.jpg)

* **Durchflussmenge** → ermittelte Durchflussmenge des aktuellen Bewässerungskreises
    > **Tipp** → steht oft in der Bedienungsanleitung bzw. im Internet
* **Booster** → nimmt alle aktiven Bewässerungskreise für 30 s vom Netz und schaltet sie danach wieder zu
    > **Tipp** → Meine Pumpe liefert max. 1800 l/h und meine Rasensprenger benötigen 1400 l/h, aber den vollen Druck zum Herausfahren. Mit der Booster Funktion kann ich nebenbei noch die Koniferen bewässern die nur 300 l/h benötigen.
    >> **Achtung** → Mit dieser Funktion sollte man sehr sparsam umgehen, da immer nur ein Bewässerungskreis mit aktiven Booster bewässern kann.    

---


* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="5-pumpen-einstellungen"></a>
# 5. Pumpen-Einstellungen
Hier werden die Einstellung der Hauptpumpe (z.B. Grundwasser), einer zweiten Pumpe (Zisterne) und der Spannungsversorgung der Regelkreise vorgenommen.
>Wenn das Schalten der Steuerspannung bzw. einer Pumpe bei Ihnen nicht vorgesehen ist, so lassen Sie dieses Feld einfach leer!

![Pumpeneinstellung.jpg](img/Pumpeneinstellung.jpg)

* **Einstellung der Ventile**

    * **Steuerspannung der Ventile** → Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie das STATE für die Steuerspannung der Ventile auswählen.
    Dieser Ausgang ist aktive, so wie eines der Ventile aktive ist.
    * **maximaler Parallelbetrieb der Ventile** → Hier kann die Anzahl der aktiven Ventile begrenzt werden. z. B. wenn die Leistung des Steuertrafos nicht ausreicht, mehrere Ventile parallel zu schalten. 
    * **Schaltabstand zwischen den Ventilen in ms** – Eingabe einer Zeit in Millisekunden. Diese ist die Wartezeit, bis zum Schalten des nächsten Ventils damit nicht z. B. 6 Ausgänge auf einmal schalten.
    
* **Einstellung der Pumpe**
    * **Hauptpumpe: ** → Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier wird das STATE der Pumpe hinterlegt, welche für die Wasserversorgung zuständig ist.
    * **maximale Pumpenleistung der Hauptpumpe in l/h: ** → Hier wird die maximale Pumpenleistung hinterlegt. Diese begrenzt dann die Bewässerungskreise, damit noch genügend Druck an den Ventilen ansteht.
        > **Achtung** → Hier muss die tatsächliche Pumpenleistung angegeben werden, nicht die vom Typenschild. Ich habe z. B. eine "Gardena 5000/5 LCD" diese schafft aber nur 1800l auf grund der Leitungslänge und nicht 4500l/h, wie auf dem Typenschild angegeben.  

* **Zisternenpumpe in Vorrangschaltung hinzufügen**
    * **Zisternenpumpe** → Hier wird die Pumpe der Zisterne eingetragen. Diese wird deaktiviert, so wie der Füllstand der Zisterne zu gering ist. Wobei die Hauptpumpe, in diesem Fall, die Bewässerung fortsetzt.
    * **maximale Pumpenleistung der Zisterne in l / h** → Hier wird die maximale Pumpenleistung hinterlegt. Diese begrenzt dann die Bewässerungskreise, damit noch genügend Druck an den Ventilen ansteht.
        > **Achtung** → Hier muss die tatsächliche Pumpenleistung angegeben werden, nicht die vom Typenschild. Ich habe z. B. eine "Gardena 5000/5 LCD" diese schafft aber nur 1800l auf grund der Leitungslänge und nicht 4500l/h, wie auf dem Typenschild angegeben. 
    * **Füllhöhe der Zisterne** → Angabe des Füllstandsensors für die Ermittlung der Füllhöhe in %.
        > **eingebaut** → Hm-Sen-Wa-Od kapazitiver Füllstandmesser von HomeMatic.
    * **Mindestfüllstand der Zysten in %** → Schaltpunkt, bei dessen Unterschreitung wird auf die Hauptpumpe umgeschaltet und bei laufender Bewässerung die Ventile je Verbrauchsmenge angepasst.
    
---


* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="6-zeit-einstellungen"></a>
# 6. Zeit-Einstellungen
In diesem Abschnitt wird die Startzeiten von SprinkleControl festgelegt.

![Zeiteinstellung.jpg](img/Zeiteinstellung.jpg)

## Startzeit
* **Beginnen Sie mit einer festen Startzeit** – Bei dieser Auswahl startet die Bewässerung zu einer festgelegten, unter "Startzeit in der Woche" festgelegten Zeit.
    * **Startzeit in der Woche** – Angabe der Startzeit in der Woche.
* **Startzeit bei Sonnenaufgang** – Wenn sie diese Option auswählen, so startet die Bewässerung bei Sonnenaufgang. Diese Zeit kann aber noch unter Zeitverschiebung variiert werden.
    * **Zeitverschiebung** – Eingabe der Zeitverschiebung bei Sonnenaufgang. (+/- 120 min)
* **Startzeit am Ende der goldenen Stunde** – Hier startet die Bewässerung zum Ende der Golden Hour.

---


## Zusätzliche Startzeit
* **Startbedingungen**
  * **Keine zusätzliche Startzeit** - zusätzlicher Start ist deaktiviert / ausgeschaltet
  * **Start bei ETpCurrent größer als** - Startfreigabe über interne berechnung der Verdunstung (Sensoren "(z.B. Homematic HmIP-SWO-PL)" zur Berechnung der Verdunstung notwendig)
    * **Start bei ETpCurrent größer als** - Eingabe der Verdunstung die zur Startzeit von *evaporation.ETpToday* erreicht sein muss.
  * **Start, mit externem Signal** - Aktivierung einer zusätzlichen Bewässerung unter Objekten:
    sprinklecontrol. ... .control.addStartTimeSwitch
  >Tipp: Über *control.addStartTimeSwitch* können sie die Zusätzliche Startzeit über ein kleines Skript nach Ihren Wünschen steuern. z.B. beim überschreiten einer bestimmten Temperatur

---


## Wochenendstart
* **andere Startzeit am Wochenende** – Soll die Bewässerung am Wochenende zu einer anderen Zeit starten (um z. B. den Nachbarn nicht zu verärgern), so kann man es hier aktivieren.
    * **Startzeit am Wochenende** – Startzeit für das Wochenende.

---


## Einstellung für die Startzeit an Feiertagen
* **Startzeit der Feiertage wie am Wochenende** – Wenn an Feiertagen auch wie am Wochenende die Bewässerung starten soll, so kann es hier aktiviert werden.
    * **Feiertage Instanz** – Hier muss dann aber noch die externe Feiertagsinstanz ausgewählt werden. (z. B. der Adapter "Deutsche Feiertage")
    
---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="7-zustzliche-einstellungen"></a>
# 7. Zusätzliche-Einstellungen

In den Extra-Einstellungen werden verschiedene Einstellungen eingegeben, die bei der Berechnung der Verdunstung unerlässlich sind.

![Extraeinstellungen.jpg](img/Extraeinstellungen.jpg)

---


<a id="71-astro-einstellungen"></a>
## 7.1 Astro-Einstellungen
* **Breiten- und Längengrad**
  Breiten- und Längengrad übernimmt SprinkleControl aus den ioBroker Systemeinstellungen.
  SprinkleControl berechnet anhand dieser Werte den Sonnenstand.

---


<a id="72-zustzliche-benachrichtigungseinstellungen"></a>
## 7.2 Zusätzliche Benachrichtigungseinstellungen

* **Benachrichtigungen aktivieren / deaktivieren**
  Einschalten des Reiters Benachrichtigungen. Hier werden dann die Einstellungen zur Kommunikation vorgenommen.

---


<a id="73-sensoren-zur-berechnung-der-verdunstung"></a>
## 7.3. Sensoren zur Berechnung der Verdunstung
> **Achtung** → Das Program ist auf die Sensoren der Homematic HmIP-SWO-PL zur Berechnung der Verdunstung abgestimmt!
> > **Andere mir bekannte verwendete Wetterstationen** → Eurochron Funk-Wetterstation EFWS 2900 mit Sainlogic Adapter.

![verdunstDiagra.jpg](img/verdunstDiagra.jpg)

Über die Sensoren wird die max. mögliche Verdunstung der pot. Evapotranspiration nach Penman ETp berechnet und zur Steuerung der Bewässerungsanlage genutzt.
Dies geschieht jedes Mal, wenn die Temperatur sich ändert.
> **Achtung** → Zur Berechnung der Verdunstung werden die Sensoren der Temperatur, der Feuchtigkeit, der Windgeschwindigkeit und der Helligkeit herangezogen. 
Diese müssen unbedingt für die Steuerung der Bewässerung über die Option „Berechnung der Verdunstung" verfügbar sein.

* **Temperatursensor** – Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie die ID des Luftsensors in °C auswählen.
* **Feuchtigkeitssensor** – Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie die ID des Feuchtigkeitssensors in % auswählen.
* **Windgeschwindigkeitssensor** – Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie die ID des Windgeschwindigkeitssensors in km/h auswählen.
* **Helligkeitssensor** – Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie die ID des Helligkeitssensors auswählen.
* **Regensensor** – Durch anklicken des (+) Symbols öffnet sich das Select-ID State Fenster. Hier können sie die ID des Zählers der Regenmenge in mm auswählen.

---


<a id="74-wettervorhersage"></a>
## 7.4 Wettervorhersage

Beim Aktivieren des Feldes "Wettervorhersage verwenden", erscheint ein Auswahlfeld. In diesem muss die Instanz vom Adapter "Das Wetter" ausgewählt werden.

* **Wettervorhersage verwenden**
* **Wettervorhersage-Dienst** 
  * **eigener Datenpunkt** → Steuerung mittels externen Signals (Script,Adapter) 
    * **Regenvorhersage - Pfad** → Über das + Zeichen können sie den Pfad zur Niederschlagsvorhersage eingeben.
    * **Niederschlags-Schwellwert in mm** → Erst wenn dieser Wert von der Regenvorhersage überschritten wird, so wird dieser beim Start der Bewässerung berücksichtigt.
  * **daswetter** → zugriff auf den Adapter "daswetter"
    * **Wählen Sie die Wettervorhersageinstanz aus** → daswetter.0
    * **Niederschlags-Schwellwert in mm** → Erst wenn dieser Wert von der Regenvorhersage überschritten wird, so wird dieser beim Start der Bewässerung berücksichtigt.
    >info: Im Adapter "Das Wetter“ muss der "Pfad 2: XML-Datei mit 5-Tage-Wettervorhersage und detaillierten Informationen für alle 3 Stunden" ausgefüllt sein,
    damit SprinkleControl auf das Objekt **„daswetter.0.NextDaysDetailed.Location_1.Day_1.rain_value"** zugreifen kann. Dieser Wert wird dann bei jedem Start im Automatikmodus zur Entscheidung einer Beregnung verwendet.


---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="8-benachrichtigungen"></a>
# 8 Benachrichtigungen

## Auswahl der Benachrichtigung
* **Benachrichtigungstyp** → Auswahl des Benachrichtigungsweges
  * [Telegram](#81-telegram) 
  * [Pushover](#82-pushover) 
  * [E-Mail](#83-e-mail) 
  * [Whatsapp](#84-whatsapp)
    
---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

--- 


<a id="81-telegram"></a>
### 8.1 Telegram
 
![Telegram.jpg](img/Telegram.jpg)
* **Telegraminstanz** – Instanz des Telegram-Adapters auswählen 
* **Telegramempfänger** – Telegram Empfänger auswählen
  > **Achtung** → Der Adapter muss laufen, damit ein Empfänger angezeigt und ausgewählt werden kann.
* **Benachrichtigungsstil** Umfang des Benachrichtigungstextes 
    + kurze Benachrichtigung → nur Startvorgänge 
    + Lange Benachrichtigung → umfangreiche Benachrichtigungen 
* **Warten auf den Versand (Sekunden)** – warten bis zum Versand 
* **Stille Nachricht** – Benachrichtigungston aus 
* **Benachrichtigung nur bei Fehlern** – noch nicht in Benutzung  

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="82-pushover"></a>
### 8.2 Pushover
 
![Pushover.jpg](img/Pushover.jpg)
* **Pushover-Instanz** – Instanz des Pushover-Adapters auswählen
* **Benachrichtigungsstil** Umfang des Benachrichtigungstextes
    + kurze Benachrichtigung → nur Startvorgänge
    + Lange Benachrichtigung → umfangreiche Benachrichtigungen
* **Warten auf den Versand (Sekunden)** – warten bis zum Versand
* **Geräte-ID (optional)** Geräte-ID eingeben (optional)
* **Benachrichtigungston** – Benachrichtigungston auswählen
* **Stille Nachricht** – Benachrichtigungston aus
* **Benachrichtigung nur bei Fehlern** – noch nicht in Benutzung

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="83-e-mail"></a>
### 8.3 E-Mail
 
![E-Mail.jpg](img/E-Mail.jpg)
* **E-Mail-Empfänger** – Empfänger der E-Mail
* **E-Mail-Absender** – Absender der E-Mail
* **E-Mail-Instanz** – Instanz des E-Mail-Adapters auswählen
* **Benachrichtigungsstil** Umfang des Benachrichtigungstextes
    + kurze Benachrichtigung → nur Startvorgänge
    + Lange Benachrichtigung → umfangreiche Benachrichtigungen
* **Warten auf den Versand (Sekunden)** → warten bis zum Versand
* **Benachrichtigung nur bei Fehlern** – noch nicht in Benutzung

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="84-whatsapp"></a>
### 8.4 WhatsApp
 
![WhatsApp.jpg](img/WhatsApp.jpg)
* **WhatsApp-Instanz** – Instanz des WhatsApp-Adapters auswählen
* **Benachrichtigungsstil** Umfang des Benachrichtigungstextes
    + kurze Benachrichtigung → nur Startvorgänge
    + Lange Benachrichtigung → umfangreiche Benachrichtigungen
* **Warten auf den Versand (Sekunden)** – warten bis zum Versand
* **Benachrichtigung nur bei Fehlern** – noch nicht in Benutzung

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

<a id="9-objekte"></a>
# 9 Objekte
![control.jpg](img/control.jpg)

---


<a id="91-control"></a>
## 9.1 control
* **Holiday** - Wenn Holiday auf true gesetzt wird, so wird die Bewässerung wie am Wochenende gestartet. Falls die Wochenendeinstellung aktiviert wurde. Die Verbindung mit einem Kalender wäre hier auch möglich.
* **addStartTimeSwitch** - Wird nur angezeigt, wenn unter Konfiguration, zusätzliche Startzeit, ein start mit externen Signal ausgewählt wurde.
* **autoOnOff** – Bei Einstellung "off“ ist der Automatikbetrieb der Bewässerungsanlage deaktiviert.
* **parallelOfMax** – z. B. (3 : 4) Drei Bewässerungskreise sind von vier möglichen aktive. (Dies ist nur eine Anzeige!)
* **restFlow** – Anzeige der noch möglichen Restfördermenge der Pumpe. (Dies ist nur eine Anzeige!)

---


<a id="92-evaporation"></a>
## 9.2 evaporation
Ich habe mich zur Berechnung der Verdunstung nach der Formel für die Berechnung der mittleren monatlichen Verdunstung nach Penman gerichtet. Dies ist für mich ausreichend, obwohl sie nicht zu 100 % umgesetzt wurde.
* **ETpCurrent** – Dies ist dei aktuelle Verdunstung als Tageswert.
* **ETpToday** – Hier wird die aktuelle Tagesverdunstung angezeigt. Diese wird in der Nacht um 0:05 zur ETpYesterday verschoben und dann wieder auf 0 gesetzt.
* **ETpYesterday** – ist die Anzeige der Verdunstung des gestrigen Tages.

---


<a id="93-info"></a>
## 9.3 info
* **cisternState** – Anzeige vom Status der Zisterne und deren Zustände, wenn sie vorhanden ist.
* **nextAutoStart** – Anzeige des nächsten Starts der Bewässerungsanlage.
* **rainToday** – Aktuelle Vorhersage für den Niederschlag des heutigen Tages, wenn es in der Konfiguration ausgewählt wurde.
* **rainTomorrow** – Niederschlagsmenge des morgigen Tages laut Vorhersage.

---


<a id="94-sprinkle"></a>
## 9.4 sprinkle
* **Auffahrt** – Ort des Geschehens (wurde in der Config unter Haupteinstellung → Name so individuell benannt)
  * **history**
    * **curCalWeekConsumed** – aktueller wöchentlicher Verbrauch in Liter des Beregnungskreises
    * **curCalWeekRunningTime** – aktuelle wöchentliche Gesamtlaufzeit des Beregnungskreises
    * **lastCalWeekConsumed** – letzter wöchentlicher Verbrauch in Liter des Beregnungskreises
    * **lastCalWeekRunningTime** – letzte wöchentliche Gesamtlaufzeit des Beregnungskreises
    * **lastConsumed** – Wasserverbrauch bei der letzten Bewässerung in Liter
    * **lastOn** – letzter Start des Beregnungskreises (05.07 14:14)
    * **lastRunningTime** – letzte Bewässerungsdauer
  * **actualSoilMoisture**
    * **Berechnung der Verdunstung** – aktuelle virtuelle Bodenfeuchte in % (max. 100 % nach der Beregnung, >100 % nach einem kräftigen Regen) (hat mit der tatsächlichen nichts zu tun)
    * **Bodenfeuchte-Sensor analog** - Zustand des Sensors true/false
    * **Bodenfeuchte-Sensor bistabil** – aktuelle virtuelle Bodenfeuchte in % (max. 100 % nach der Beregnung, >100 % nach einem kräftigen Regen) (hat mit der tatsächlichen nichts zu tun)
    * **Start an festen Wochentagen (ohne Sensoren)** - Anzeige des nächsten Starttermins z. B. Mon, Thu, Wed  
  * **autoOn** - Automatik ein (Hier könnt ihr die automatische Bewässerung dieses Kreises ausschalten, z. B. bei einer Reparatur, wobei manuelles Bewässern jederzeit möglich ist.)
  * **countdown** – Restzeit des Beregnungskreises
  * **postponeByOneDay** - Wird nur angezeigt, wenn Start mit festen Tagen in 2 bzw 3-Tagesintervallen ausgewählt wurde und dient zum weiterschalten der einzelnen Starttage.
  * **runningTime** – Laufzeit des Beregnungskreises
    - wenn hier eine Zahl > 0 eingegeben wird, so startet der Beregnungskreises für die angegebene Zeit in Minuten
    - bei eingabe einer 0 wird die Bewässerung des Beregnungskreises beendet
  * **sprinklerState** – Anzeige des Zustandes des Beregnungskreises
    - 0:off; => Beregnungskreis aus
    - 1: wait; → Beregnungskreis wartet auf eine frei werdende Kapazität der Pumpe
    - 2: on; → Beregnungskreis ein
    - 3: break; → Beregnungskreis wurde unterbrochen (Configuration, Intervall Beregnung)
    - 4: Boost; → Boost-Funktion des aktuellen Beregnungskreises ist aktiv (Configuration, Booster ein)
    - 5: off(Boost) → Beregnungskreis für 30 s unterbrochen, da eine Boost-Funktion aktive ist

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---


<a id="10-was-ist-fr-die-zukunft-geplant"></a>
# 10 Was ist für die Zukunft geplant
+ Async. arbeiten des Adapters
+ Überwachen ob Ventile wirklich geschaltet haben, mit Fehlermeldung über Benachrichtigung
+ Zisterne als Einzelpumpe mit Bewässerungsunterbrechung bei Unterschreitung minimalniveau
+ Ventile nach der Bewässerung x Minuten lang spülen (Bei Zisterne / Grundwasser kombination und eisenhaltigem Wasser)
+ Die Visualisierung, die ich früher noch plante, werde ich nicht weiter verfolgen. 

---

* [zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.2.13 (2022-09-06)
* (Dirk-Peter-md) various bugs fixed
* (Dirk-Peter-md) Preparing the stable release

### 0.2.12 (2022-07-17)
* (Dirk-Peter-md) fixDay(twoNd,threeRd) => postpone by one day
* (Dirk-Peter-md) Bug fixed => autoOn
* (Dirk-Peter-md) Additional post-watering => in case of high evaporation / switchable externally

### 0.2.11 (2022-05-22)
* (Dirk-Peter-md) Bug fixed => analog soil moisture sensor with negative characteristic
* (Dirk-Peter-md) Attention => maximum soil moisture in rain now in %

### 0.2.10 (2022-05-15)
* (Dirk-Peter-md) manual watering limited to a maximum of 100%
* (Dirk-Peter-md) Error whatsapp message fixed

### 0.2.9 (2022-04-10)
* (Dirk-Peter-md) Bug-Initialisierungsroutine

### 0.2.8 (2022-03-20)
* (Dirk-Peter-md) Adaptation for js controller 4
* (Dirk-Peter-md) switched main.js to async

### 0.2.7 (16.10.2021)
* (Dirk-Peter-md) zusätzliche Testnachrichten gelöscht, Readme aktualisiert

### 0.2.6 (03.10.2021)
* (Dirk-Peter-md) inGreenhouse in Bewässerungsverfahren "Calculation" hinzugefügt

### 0.2.5 (18.08.2021)
* (Dirk-Peter-md) Mehrfachverwendung von Bodenfeuchte-Sensoren
* (Dirk-Peter-md) Objekte mit \"def\": ... überarbeitet

### 0.2.4 (16.08.2021)
* (Dirk-Peter-md) Triggerpunktanzeige hinzufügen
* (Dirk-Peter-md) Fehler in der Bodenfeuchteanalyse behoben

### 0.2.3 (15.08.2021)
* (Dirk-Peter-md) index_m-Fehler behoben
* (Dirk-Peter-md) timeExtension (FixDay, bistabil) Fehler behoben

### 0.2.2 (27.07.2021)
* (Dirk-Peter-md) Fehler FixDay behoben
* (Dirk-Peter-md) Anzeige actualSoilMoisture überarbeitet
* (Dirk-Peter-md) Infomeldungen überarbeitet

### 0.2.1 (13.07.2021)
* (Dirk-Peter-md) Start an festen Wochentagen (ohne Sensoren) hinzugefügt
* (Dirk-Peter-md) Fehler behoben

### 0.2.0 (03.07.2021)
* (Dirk-Peter-md) Bodenfeuchte-Sensor hinzugefügt
* (Dirk-Peter-md) Schwellwert für Wettervorhersage hinzugefügt

### 0.1.7 (22.05.2021)
* (Dirk-Peter-md) Beschreibung in englischer Sprache hinzugefügt
* (Dirk-Peter-md) bereit für stable

### 0.1.5 (05.05.2021)
* (Dirk-Peter-md) Zurücksetzen der Regenmenge im 24-Stunden-Modus hinzugefügt

### 0.1.4 (21.04.2021)
* (Dirk-Peter-md) Fehler bei deaktivierter Wettervorhersage behoben

### 0.1.2 (30.12.2020)
* (Dirk-Peter-md) Beschreibung von SprinkleControl überarbeitet

### 0.0.12 (10.10.2020)
* (Dirk-Peter-md) Bewässerung über eine 2. Pumpe (Zisterne mit Vorrangschaltung) in abhängigkeit vom Füllstand hinzugefügt.


*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2024 Dirk Peter <dirk.peter@freenet.de>

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
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.