---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.automatic-feeder/README.md
title: ioBroker.automatic-feeder
hash: 4zYYV48p9P/TSfvM+Gnfat/sE2s+3g5iYzBG+KrsNys=
---
![Logo](../../../en/adapterref/iobroker.automatic-feeder/admin/automatic-feeder.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.automatic-feeder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.automatic-feeder.svg)
![Anzahl der Installationen](https://iobroker.live/badges/automatic-feeder-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/automatic-feeder-stable.svg)
![NPM](https://nodei.co/npm/iobroker.automatic-feeder.png?downloads=true)

# IoBroker.automatic-feeder
**Tests:** ![Test und Freigabe](https://github.com/ssbingo/ioBroker.automatic-feeder/workflows/Test%20and%20Release/badge.svg)

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## Adapter für automatische Zuführung für ioBroker
Dieser Adapter verwandelt jeden vorhandenen ioBroker-Schalter (z. B. eine smarte Steckdose, ein Relais, einen GPIO-Ausgang) in einen programmierbaren **automatischen Futterautomaten**. Er schaltet den Ausgang für eine festgelegte Anzahl von Sekunden zu den von Ihnen konfigurierten Zeiten ein und berücksichtigt dabei Temperatur und Tag-Nacht-Rhythmus, sodass die Fütterung nie zum falschen Zeitpunkt erfolgt.

Dieses Dokument ist eine vollständige Bedienungsanleitung. Falls Sie den Adapter noch nie benutzt haben, lesen Sie ihn bitte von oben bis unten durch – die **Schnellstartanleitung** führt Sie in wenigen Minuten zur ersten Fütterung, der Rest erklärt jede Option im Detail.

> 🇩🇪 Deutsche Anleitung: [doc/de/README.md](doc/de/README.md) · andere Sprachen: siehe > [Dokumentation](#documentation) unten.

---

## Inhaltsverzeichnis
1. [Was der Adapter bewirkt](#1-what-the-adapter-does)
2. [Anforderungen](#2-Anforderungen)
3. [Installation](#3-Installation)
4. [Schnellstart](#4-quick-start--your-first-feeding)
5. [Die Einstellungsseite im Detail](#5-the-settings-page-in-detail)
6. [Objekte / Datenpunkte](#6-objects--data-points)
7. [Beispiele / Rezepte](#7-examples--recipes)
8. [Telegram-Benachrichtigungen](#8-telegram-notifications)
9. [Fehlerbehebung & FAQ](#9-troubleshooting--faq)
10. [Protokollierung & Debugging](#10-logging--debugging)
11. [Dynamische Fütterung – Hintergrund & Quellen](#11-dynamic-feeding--background--sources)

---

## 1. Was der Adapter bewirkt
Eine „Fütterung“ ist ganz einfach: **Einschalten eines Ausgangs → eine konfigurierbare Anzahl von Sekunden warten → wieder ausschalten**. Bei einem umgebauten Futterautomaten gibt der laufende Motor während dieser Sekunden das Futter aus.

Der Adapter kann **bis zu 5 Switches** verwalten, jeder davon völlig unabhängig und mit einem eigenen, nach dem Switch benannten Konfigurationsreiter. Sie legen pro Switch fest:

* **wann** es füttert – entweder zu **festen Zeiten** (z. B. 08:00 und 18:00 Uhr) oder in einem **Intervall**

innerhalb eines Zeitfensters (z. B. alle 60 Minuten zwischen 08:00 und 18:00 Uhr);

* **Wie lange** der Ausgang eingeschaltet bleibt (Einspeisungsdauer in Sekunden);
* **ob die Fütterung blockiert werden soll**, wenn die Wasser- oder Lufttemperatur zu niedrig/zu hoch ist;
* **ob die Fütterung auf das astronomische Tagesfenster beschränkt werden soll** (Sonnenaufgang/Sonnenuntergang mit pro Schalter

Offsets, von einem System, einem gemeinsam genutzten oder pro Switch bestimmten Standort);

* **ob der Schalter überwacht werden soll** (prüfen, ob er tatsächlich ein- und ausgeschaltet wurde) und optional

Sende eine **Telegram**-Nachricht über das Ergebnis;

* **ob die Fütterung während einer wiederkehrenden **Winter**-Saison reduziert oder ausgesetzt werden soll** – optional mit

Telegram-Erinnerungen vor Beginn und Ende;

* **ob das Intervall und die Portion automatisch an die Wasser-/Lufttemperatur angepasst werden sollen**

(**dynamische Zuführung**, Q10-Modell);

* ob die Zufuhr blockiert werden soll, wenn der gelöste Sauerstoffgehalt (O₂) zu niedrig ist;
* **Bis zu 3 einmalige Fütterungspausen** (absolute Datums- und Zeiträume, z. B. eine Quarantäne nach

(Auffüllung) mit einer **Telegram**-Nachricht am Anfang und Ende jeder Nachricht;

* ein **Haupt-Pauseschalter** („Fütterung jetzt unterbrechen“), der **jegliche** Fütterung sofort unterbricht.

für einen Schalter, bis Sie ihn wieder ausschalten, mit einer **Telegram**-Nachricht bei jedem Umschalten.

Sie können die Zufuhr auch **manuell** jederzeit auslösen – entweder über die Einstellungsseite des Adapters (Schaltfläche mit frei wählbarer Dauer) oder über einen Datenpunkt (z. B. eine Schaltfläche in einer VIS-Ansicht).

Optional integriert der Adapter die **Automatische Zuführungsrelaisplatine** (ein ESP32 mit drei Timer-Tasten und eigener Weboberfläche). Sie entscheiden **pro Schalter**, ob diese Platine verwendet wird. Wenn Sie sie in den allgemeinen Einstellungen für einen Schalter aktivieren, erhält dieser Schalter eine **Relais**-Registerkarte. Dort können Sie die Netzwerkadresse der Platine festlegen, die Verbindung testen und die Zuführungszeiten der drei Tasten (S1–S3) direkt über den Adapter konfigurieren.

Wichtig: Der Adapter erstellt den Switch niemals selbst. Er steuert ein Objekt, das bereits in Ihrem ioBroker-System existiert. Dieses Objekt wählen Sie in der Konfiguration aus.

---

## 2. Anforderungen
| Sie benötigen | Details |
|----------|---------|
| **ioBroker** mit **admin ≥ 8.0.0**, **js-controller ≥ 6.0.11** und **Node.js ≥ 22** | Erforderliche Mindestversionen. Die Konfigurationsseite basiert auf React 19, wie es auch von admin 8 verwendet wird. |
| **Ein Schalterobjekt** | Jeder beschreibbare ioBroker-Zustand, der Ihren Feeder ein-/ausschaltet – z. B. eine intelligente Steckdose (`shelly.0.…`, `sonoff.0.…`, `zigbee.0.…`), ein Relais, eine Skriptvariable. |
| *(optional)* **Geokoordinaten** | Wird verwendet, um Sonnenaufgang/Sonnenuntergang für das **astronomische Fenster** pro Switch zu berechnen. Nur erforderlich, wenn ein Switch dieses Fenster verwendet; wird aus den ioBroker-Systemeinstellungen, einer gemeinsamen Position oder pro Switch konfiguriert. |
| *(optional)* Temperaturobjekte | Vorhandene Zustände mit Luft- und/oder Wassertemperatur zur Temperaturblockierung oder dynamischen Zufuhr. Zuweisung **pro Schalter** auf der Registerkarte „Schalter“. |
| *(optional)* Eine **Telegram**-Instanz | Der offizielle `telegram`-Adapter, konfiguriert und aktiv, falls Sie Push-Benachrichtigungen wünschen. |
| *(optional)* Eine **Telegram**-Instanz | Der offizielle `Telegram`-Adapter, konfiguriert und aktiv, falls Sie Push-Benachrichtigungen wünschen. |
| Internetzugang auf dem ioBroker-Host | Nur für die Adresssuche/-zuordnung in der Konfiguration. Der normale Betrieb funktioniert offline. |

---

## 3. Installation
1. Öffnen Sie im ioBroker **admin** die Registerkarte **Adapter**.
2. Suchen Sie in der Liste nach **automatischer Zuführer** und klicken Sie auf **Installieren**.
3. Erstellen Sie eine **Instanz** des Adapters.
4. Öffnen Sie die Instanzeinstellungen (das Zahnradsymbol) – Sie sollten die Konfigurationsseite mit der

Registerkarte **Allgemeine Einstellungen**. Falls diese leer bleibt, siehe [Fehlerbehebung](#9-troubleshooting--faq).

---

## 4. Schnellstart – Ihre erste Fütterung
Das Ziel: Jetzt sofort einen Schalter für 5 Sekunden betätigen, um zu beweisen, dass alles funktioniert.

1. **Öffnen Sie die Einstellungen** der automatischen Fütterungsinstanz.
2. Auf der Registerkarte **Allgemeine Einstellungen**:
* Lassen Sie unter **Standort** die Option *Systemeinstellungen für alle Schalter verwenden* ausgewählt (nur relevant, wenn

(Sie aktivieren später das astronomische Fenster). Sie können auch einen gemeinsamen Standort auswählen oder ihn pro Schalter konfigurieren.

* Scrollen Sie nach unten zu **Schalter** und klicken Sie auf **Schalter hinzufügen**.
* Geben Sie ihm einen **Namen** (z. B. „Koiteich“). Dieser Name wird zum Titel eines eigenen Tabs.
* Klicken Sie auf das Listensymbol neben **Objekt wechseln** und wählen Sie den Zustand aus, der Ihren Zustand ändert.

Zuleitung (z. B. Ihre smarte Steckdose). Stellen Sie sicher, dass der Schalter **aktiv** ist (Kontrollkästchen links).

3. **Speichern** (das Diskettensymbol/Häkchen unten). Ein neuer Tab mit dem Namen Ihrer Switch wird angezeigt.
4. Öffnen Sie den **Reiter „Schalter“**. Stellen Sie oben unter **Manuelle Fütterung** eine Dauer ein (z. B. `5`).

Sekunden) und klicken Sie auf **Jetzt füttern**. Die Ausgabe sollte sich für 5 Sekunden einschalten und dann wieder ausschalten.

5. Legen Sie im Menüband unter **Fütterungsplan** den tatsächlichen Fütterungsplan fest (z. B. fest).

Geben Sie die Zeiten 08:00 und 18:00 Uhr sowie die **Fütterungsdauer** unter **Fütterungsaktion** ein und speichern Sie anschließend.

Das war's – der Adapter versorgt die Stromversorgung nun automatisch. Im Folgenden werden die verschiedenen Optionen ausführlich erläutert.

---

## 5. Die Einstellungsseite im Detail
Die Konfiguration enthält einen Reiter **Allgemeine Einstellungen** sowie **einen Reiter pro Schalter** (dieser wird automatisch erstellt, sobald ein Schalter benannt wurde). Falls eine Seite nicht scrollt, vergrößern Sie das Fenster oder verwenden Sie die Bildlaufleiste rechts – alle Abschnitte sind erreichbar.

### 5.1 Registerkarte „Allgemeine Einstellungen“
#### Standort (für das astronomische Fenster)
Der Standort dient zur Berechnung von Sonnenaufgang und Sonnenuntergang für das **astronomische Zeitfenster**, das pro Switch aktiviert werden kann (siehe *Einschränkungen* auf der Registerkarte „Switch“). Er wird nur benötigt, wenn mindestens ein Switch dieses Zeitfenster nutzt. Drei Optionen:

* **Systemeinstellungen für alle Switches verwenden** – bezieht Breiten- und Längengrad vom ioBroker-System

Konfiguration (empfohlen, falls diese bereits festgelegt sind). Die aktuellen Werte werden angezeigt.

* **Ein gemeinsamer Standort für alle Schalter** – eine einzige Position festlegen, die alle Schalter verwenden:
* Geben Sie eine **Adresse** ein und drücken Sie auf **Suchen**. Der Adapter löst sie auf (über OpenStreetMap /

    Nominatim) und setzt einen Marker.

* Oder **klicken Sie auf die Karte** / **ziehen Sie die Markierung** an die genaue Stelle.
* Breitengrad/Längengrad können auch direkt eingegeben werden; die Karte folgt.
* **Konfigurieren Sie den Standort individuell pro Switch** – jeder Switch definiert seinen eigenen Standort auf

einen eigenen Tab (nützlich, wenn sich Futterstellen, z. B. Teiche, an verschiedenen Orten befinden).

Die Adresssuche läuft im Adapter-Backend, daher muss die **Instanz** dafür ausgeführt werden.

Die Kartenkacheln und die Suche benötigen Internetzugang.

Die **Sonnenaufgangs-/Sonnenuntergangs-Offsets werden pro Switch konfiguriert** (unter *Einschränkungen*), und die berechneten Zeiten werden pro Switch als `status.sunrise` / `status.sunset` veröffentlicht und jede Nacht automatisch neu berechnet.

#### Schalter
Die Liste der Futterstellen (bis zu 5). Für jeden Eintrag:

* **Aktiv** (Kontrollkästchen) – nur aktive Schalter werden eingeplant.
* **Name** – Freitext; wird zum Tab-Titel des Schalters und zum Kanalnamen in der Objektstruktur.
* **Schaltobjekt** – der aktuelle ioBroker-Zustand, der gesteuert werden soll. Verwenden Sie das Listensymbol zum Durchsuchen, oder

das Kreuz zu klären.

Verwenden Sie **Schalter hinzufügen**, um einen weiteren (maximal 5) Schalter zu erstellen, und das Papierkorbsymbol, um einen zu entfernen. Beim Entfernen eines Schalters werden auch dessen Datenpunkte gelöscht.

* **Dieser Schalter verwendet die Relaisplatine der automatischen Zuführung** (pro Schalterumschaltung) – schalten Sie diese nur ein

für einen Schalter, dessen Einspeisestation die optionale automatische Einspeiserelaisplatine (ESP32) verwendet. Im eingeschalteten Zustand erhält dieser Schalter eine zusätzliche **Relais**-Registerkarte (siehe [5.3](#53-relay-board-tab-optional)).

### 5.2 Registerkarten wechseln
Jeder konfigurierte Schalter erhält eine eigene Registerkarte mit seinem Namen. Diese enthält die folgenden Abschnitte.

#### Manuelle Fütterung
* **Dauer der manuellen Zufuhr (Sekunden)** – die durch Drücken der Taste benötigte Zeit.
* **Jetzt füttern** – startet sofort eine Fütterung mit dieser Dauer. Nützlich zum Testen oder für eine

zusätzlicher Abschnitt. (Ob Blöcke ignoriert werden, hängt von der Einstellung *Manueller Auslöser ignoriert alle Blöcke* in den *Einschränkungen* ab.)

* Die Instanz muss ausgeführt werden und die Konfiguration **gespeichert** sein, damit die Schaltfläche funktioniert.

#### Fütterungsplan
Wählen Sie **einen** Modus:

* **Feste Zeiten** – eine Liste von Uhrzeiten (`HH:mm`). Fügen Sie beliebig viele hinzu; die Zufuhr läuft

an jedem von ihnen jeden Tag. Beispiel: `08:00` und `18:00`.

* **Intervall innerhalb eines Zeitfensters** – wiederholte Zufuhr innerhalb eines Fensters:
* **Fensterbeginn** / **Fensterende** – z. B. 08:00 bis 18:00 Uhr.
* **Intervall (Minuten)** – z. B. 60 → Fütterung um 08:00, 09:00, …, bis zum Ende des Zeitfensters,

    täglich.

Wenn das **astronomische Fenster** aktiviert ist (siehe *Einschränkungen*), werden die festen Start- und Endzeiten durch das Sonnenaufgangs-/Sonnenuntergangsfenster ersetzt und ausgeblendet; das Intervall läuft dann zwischen Sonnenaufgang und Sonnenuntergang. Die nächste geplante Zeit ist immer im Datenpunkt `status.nextFeeding` sichtbar.

#### Fütterungsaktion
* **Fütterungsdauer (Sekunden)** – wie lange der Ausgang während einer geplanten Fütterung eingeschaltet bleibt.
* **Ein-Wert** / **Aus-Wert** – die Werte, die in das Schalterobjekt geschrieben werden. Standardwert ist `true`.

und `false`, die für die meisten Smart Plugs/Relais geeignet sind. Falls Ihr Gerät Zahlen oder Text erwartet, geben Sie hier z. B. `1` / `0` oder `ON` / `OFF` ein.

#### Temperatur- und Sauerstoffquellen
Jeder Schalter (jede Fütterungsstation) verfügt über **eigene** Sensoren – verschiedene Teiche/Behälter können unterschiedliche Objekte verwenden:

* **Lufttemperatur** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, in dem die Lufttemperatur dieser Station gemessen wird.
* **Wassertemperatur** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, in dem die Wassertemperatur dieser Station gemessen wird.

Dies ist der primäre **Futterzonensensor** (platzieren Sie ihn dort, wo die Fische tatsächlich fressen, nicht an der Oberfläche).

* **Wassertemperatur (Tiefe)** – *optionaler zweiter* Wassersensor (z. B. in Bodennähe). Wird nur einmal angezeigt.

Der primäre Wassersensor ist aktiviert. Bei zwei Sensoren wählen Sie einen **Kombinationsmodus** für die dynamische Fütterung: *Fütterungszone (nur flach)* [Standard], *Mittelwert beider*, *Kälteste Schicht* oder *Saisonal* (verwendet den Flachwassersensor, solange der Wert einen Schwellenwert erreicht oder überschreitet, ansonsten den Tiefensensor). Der Temperatur-**Block** verwendet immer die **kältere** der beiden Schichten. Ein zweiter Sensor ist nur in **tiefen, ungemischten Teichen** hilfreich (eine laufende Pumpe durchmischt das Wasser und beseitigt jegliche Schichtung) – siehe *Dynamische Fütterung – Hintergrund & Quellen*.

* **Sauerstoff (O₂)** – Kreuzen Sie das Kästchen an und wählen Sie den Aggregatzustand, der den gelösten Sauerstoff enthält.

Nur numerische Zustände sind sinnvoll. Die aktuellen Werte werden den Datenpunkten `status.airTemperature`, `status.waterTemperature`, `status.waterTemperatureDeep`, `status.oxygen` (und `status.waterStratification` = flach − tief) dieses Schalters zugeordnet. Die Schwellenwerte sind unten festgelegt (*Temperaturblockierung*), und die Temperaturen steuern auch die *dynamische Zufuhr*.

#### Temperaturblockierung
Wird nur für die oben aktivierten Temperaturquellen angezeigt (*Temperatur- und Sauerstoffquellen*). Pro Schalter können Sie Folgendes einstellen:

* **Blockieren nach Wassertemperatur** – *Blockieren, wenn darunter* und/oder *Blockieren, wenn darüber* (°C) einstellen.
* **Blockierung nach Lufttemperatur** – Gleiches gilt für Luft.

Liegt die aktuelle Temperatur außerhalb des zulässigen Bereichs, wird die Zufuhr übersprungen und der Grund in `status.blockReason` geschrieben. (Ist ein Temperaturwert unbekannt, wird diese Quelle nicht blockiert.)

#### Einschränkungen
* **Fütterung auf das astronomische Tagesfenster (Sonnenaufgang/Sonnenuntergang + Zeitzonen) beschränken** – wenn eingeschaltet,

Die Fütterung ist auf das anhand des Standorts dieses Schalters berechnete Tagesfenster beschränkt. Bei *Intervall* und *Dynamischer Fütterung* ersetzt dieses Fenster den festen Start-/Endzeitraum; bei *Festen Zeiten* dient es als Tag-/Nachtwächter (Zeiten außerhalb des Fensters werden übersprungen). Wenn diese Option aktiviert ist, können Sie Folgendes einstellen:

* **Minuten nach Sonnenaufgang** – Startzeitpunkt ist diese Anzahl Minuten *nach* Sonnenaufgang (Standardwert 0).
* **Minuten vor Sonnenuntergang** – Stoppen Sie so viele Minuten *vor* Sonnenuntergang (Standard 0).
* **Standort für diesen Schalter** – wird nur angezeigt, wenn der allgemeine *Standort* auf *individuell* eingestellt ist:

Wählen Sie für diesen Schalter *Systemeinstellungen verwenden* oder *Bestimmten Standort definieren* (Adresssuche + Karte). Die berechneten Zeiten werden in `status.sunrise` / `status.sunset` angezeigt.

* **Manuelle Auslösung ignoriert alle Blöcke** – wenn aktiviert, werden die manuelle Schaltfläche und die Schaltfläche `feedNow` /

`feedFor` Datenpunkte werden auch dann übertragen, wenn eine Temperatur-/Fenstersperre aktiv ist.

#### Dynamische Fütterung
Optional: Passen Sie das Fütterungsintervall und die Fütterungsdauer mithilfe des Q10-Modells an die Temperatur an (der Stoffwechsel verdoppelt sich etwa pro +10 °C). Erfordert eine aktive Temperaturquelle; feste Zeiten werden dann durch ein Intervall innerhalb des vorgegebenen Bereichs ersetzt.

* **Aktivieren/Quelle** – Schalten Sie es ein und wählen Sie die Wasser- oder Lufttemperatur. Wenn ein zweiter (Tiefen-)Wassersensor konfiguriert ist, wird die hier verwendete Wassertemperatur gemäß dem gewählten Kombinationsmodus aus beiden Schichten kombiniert (siehe *Temperatur- und Sauerstoffquellen*).
* **Referenzwert / Q10** – das Basisintervall und die Basisdauer gelten bei der Referenztemperatur (z. B. 20 °C); Q10 beträgt typischerweise 2–2,5 (der Stoffwechsel verdoppelt sich ungefähr pro +10 °C – siehe *Dynamische Fütterung – Hintergrund & Quellen*).
* **Intervall/Dauer (Basis, Minimum, Maximum)** – Grenzen für das berechnete Intervall (Minuten) und die Dauer (Sekunden). **Das Basisintervall und das maximale Intervall müssen größer als 0 sein**, andernfalls kann keine Fütterung geplant werden.
* **Mittelwertbildungsfenster / Hysterese** – ein gleitender Durchschnitt (z. B. 24 h) glättet Spitzen; die Hysterese vermeidet eine Neuplanung aufgrund kleinster Änderungen.

Die aktuellen Werte sind in `status.dynamicAvgTemperature`, `status.dynamicRate`, `status.dynamicIntervalMin` und `status.dynamicDurationSec` aufgeführt. Eine optionale **Sauerstoffquelle (O₂)** kann die Fütterung unterbrechen, wenn der gelöste Sauerstoffgehalt unter einen Schwellenwert sinkt. Die Winterpause hat Vorrang vor der dynamischen Fütterung.

Wenn die dynamische Fütterung aktiviert ist, aber kein gültiges Intervall berechnet werden kann (Basis- oder Maximalintervall ist 0 oder ein ungültiges Zeitfenster), wird nichts eingeplant: `status.nextFeeding` bleibt leer und `status.blockReason` zeigt einen Hinweis an. Legen Sie ein Basisintervall und ein Maximalintervall größer als 0 fest.

#### Winterpause
Pro Schalter kann eine wiederkehrende **Winterpause** definiert werden (saisonal, angegeben als `MM-DD` Daten, die sich jedes Jahr wiederholen und sich um Neujahr erstrecken können).

* **Winterpause aktivieren** – Pause einschalten.
* **Winterbeginn / Winterende** – Wählen Sie den Tag und Monat aus einem Kalender (angezeigt im Format TT.MM), z. B. 01.11 bis 15.03.
* **Fütterungsmodus** – während der Pause entweder **die Fütterung aussetzen**, mit einem **reduzierten** eigenen Intervall füttern oder **einmal täglich** zu einer festgelegten Zeit füttern; es gilt eine gesonderte **Fütterungsdauer im Winter**.
* **Erinnerungen (Telegram)** – Eine tägliche Erinnerung wird in den Tagen vor Beginn und vor Ende (zuletzt am selben Tag) zur konfigurierten Uhrzeit versendet. Eine Telegram-Installation ist erforderlich (siehe unten).

Der aktuelle Zustand wird im Datenpunkt `status.winterActive` angezeigt. Die Fütterung wird nach Ende der Pause automatisch fortgesetzt.

#### Fütterungspausen
**Fütterung jetzt unterbrechen (Hauptschalter).** Oben in diesem Abschnitt befindet sich ein **Ein/Aus-Schalter**, mit dem Sie die Fütterung für diesen Bereich **sofort und dauerhaft** unterbrechen können. Dies überschreibt die darunter stehenden zeitbasierten Pausen **und** alle Fütterungsmodi (feste Zeiten, Intervallfütterung, dynamische Fütterung, Winterpause). Schalten Sie den Schalter wieder **aus**, und die Fütterung wird genau wie zuvor konfiguriert fortgesetzt; es sind keine weiteren Änderungen erforderlich. Durch Umschalten wird eine **Telegram**-Nachricht gesendet (*ein* / *aus*). Typischer Anwendungsfall: eine spontane Unterbrechung (Medikamentengabe, Wartung, Wasseraufbereitung) ohne Änderung eines Fütterungsplans. Die Einstellungen können auf der Einstellungsseite **und über VIS/Skripte** unter `settings.pauseNow` vorgenommen werden. Der aktuelle Status wird unter `status.pauseManual` angezeigt.

Unterhalb des Hauptschalters können Sie bis zu **3 einmalige Fütterungspausen** pro Schalter festlegen, um absolute Zeiträume zu planen, in denen die Fütterung **vollständig ausgesetzt** wird (höhere Priorität als alle Fütterungsmodi). Typischer Anwendungsfall: eine **Quarantäne nach dem Besatz**, wenn neue Fische für eine gewisse Zeit nicht gefüttert werden sollen.

* **Pause 1 / 2 / 3** – Ankreuzen zum Aktivieren, dann einen **Start** und einen **Ende** auswählen (Datum + Uhrzeit, angezeigt im Format `TT.MM.JJJJ HH:mm`), z. B. `15.07.2026 08:00` bis `22.07.2026 18:00`.
Die Fütterung wird unterbrochen, solange sich der laufende Prozess in einer aktivierten Pause befindet, und wird nach deren Ende automatisch fortgesetzt.
* Zu Beginn und am Ende jeder Pause wird jeweils eine Telegram-Nachricht gesendet (eine Telegram-Instanz ist erforderlich, siehe unten). Startet der Adapter, während eine Pause bereits aktiv ist, wird nur die Endnachricht gesendet.
* Bearbeitbar auf der Einstellungsseite **und über VIS/scripts** über die `settings.*`-Zustände (z. B. `settings.pause1Start`).

Der aktuelle Zustand wird in `status.pauseActive` und `status.pauseActiveUntil` angezeigt (der Hauptschalter steuert auch `status.pauseActive`).

#### Wechsel der Aufsicht
Nach dem Umschalten kann der Adapter überprüfen, ob der Schalter **tatsächlich** den Ein- bzw. Aus-Zustand erreicht hat, und pro Fütterung eines von drei Ergebnissen melden:

| Ergebnis | Bedeutung | Botschaft |
|--------|---------|---------|
| ✅ Erfolg | Schalter wie erwartet ein- und ausgeschaltet | "Fütterung für x s ausgelöst." |
| ❌ Einschalten fehlgeschlagen | Der Schalter hat den EIN-Zustand nicht bestätigt | "Die Zufuhr konnte nicht durchgeführt werden. Überprüfen Sie den Schalter!" |
| ❌ Ausschalten fehlgeschlagen | Es schaltete sich ein, aber nicht wieder aus | "Fehler: Der Netzstecker hat nicht abgeschaltet!" |

Die Nachricht wird in der konfigurierten ioBroker-Systemsprache (standardmäßig Englisch) gesendet.

* **Überprüfen Sie, ob der Schalter tatsächlich ein- und ausgeschaltet werden kann** – dies ermöglicht die Überwachung.
* **Verifizierungs-Timeout (Sekunden)** – wie lange auf die Bestätigung gewartet werden soll.
* **Verifizierungsversuche** – Anzahl der gestaffelten Wiederholungsprüfungen vor der Meldung eines Fehlers (Standard: 3). Bei jedem Versuch wird auch der aktuelle Status ausgelesen, sodass verzögerte Statusrückmeldungen (z. B. bei Homematic-Funkgeräten) keinen Fehlalarm mehr auslösen.

**Wichtig:** Die Überwachung funktioniert nur, wenn der Schalter seinen tatsächlichen Zustand zurückmeldet, d. h. wenn das Zielobjekt mit `ack=true` aktualisiert wird (typisch für intelligente Steckdosen/Relais mit Statusrückmeldung).

Ein einfacher Hilfswert, der nicht berücksichtigt wird, würde immer einen Fehler melden – in diesem Fall sollte die Überwachung für diesen Schalter deaktiviert werden.

Das Ergebnis wird auch in den Datenpunkten `status.lastResult` (Text) und `status.error` (Boolescher Wert) gespeichert, sodass Sie darauf reagieren können (z. B. eine eigene Benachrichtigung auslösen).

#### Telegram-Benachrichtigungen
Sende die Überwachungsmeldungen an Telegram – konfiguriert **pro Switch**:

* **Nachrichtensprache** – die Sprache aller ausgehenden Nachrichten für diesen Switch (Telegram, Sayit und

(die Feeding-Ankündigung): *Systemsprache* (die ioBroker-Systemsprache) oder eine spezifische Sprache. Die Statusdatenpunkte sind davon nicht betroffen.

* **Telegram-Instanz** – Wählen Sie eine der installierten `telegram.*`-Instanzen (oder *Keine*) aus.

Telegram für diesen Schalter deaktivieren). Falls kein Telegram installiert ist, wird dies im entsprechenden Feld angezeigt.

* **Telegram-Empfänger (optional)** – ein bestimmter Benutzer-/Chatname, wie in Telegram konfiguriert.

Adapter; Feld leer lassen, um an alle konfigurierten Empfänger zu senden.

* **Kontrollkästchen** – Wählen Sie aus, welche Meldungen gesendet werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder

Abschaltfehler.

Die **Erinnerungen zur Winterpause** (falls aktiviert, siehe *Winterpause*) werden unabhängig von diesen Überwachungs-Checkboxes an dieselbe Telegram-Instanz gesendet.

Die vollständige Konfiguration finden Sie in [Telegram-Benachrichtigungen](#8-telegram-notifications).

#### Sayit-Benachrichtigungen
Sprechen Sie dieselben Überwachungsnachrichten über eine **Sayit (Text-to-Speech)**-Instanz – konfiguriert **pro Schalter**, unabhängig von Telegram (beide können gleichzeitig aktiv sein):

* **Sayit-Instanz** – Wählen Sie eine der installierten `sayit.*`-Instanzen (oder *Keine*, um Sayit zu deaktivieren).

(für diesen Schalter). Falls kein Schalter installiert ist, wird dies im Feld angezeigt.

* **Lautstärke (0–100, optional)** – die Sprechlautstärke für diesen Schalter; lassen Sie dieses Feld leer, um den Schalter zu verwenden

Die Standardeinstellung der Sayit-Instanz.

* **Testansage** – neben der Instanzauswahl: gibt einen kurzen Testtext über die Sprachausgabe aus.

Sie können eine Instanz auswählen, um die Audioausgabe sofort zu überprüfen, ohne auf eine Zufuhr warten zu müssen.

* **Kontrollkästchen** – Wählen Sie aus, welche Meldungen vorgelesen werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder

Abschaltfehler (die gleichen drei wie bei Telegram, hier aber separat ausgewählt).

Der gesprochene Text verwendet die **Nachrichtensprache**, die oben im Telegram-Bereich ausgewählt wurde.

#### Fütterungsankündigung
Kündige eine bevorstehende Fütterung zu einem konfigurierbaren Zeitpunkt im Voraus via Telegram und/oder Sayit an:

* **Fütterung im Voraus ankündigen** – schaltet die Ankündigung ein.
* **Vorlaufzeit (Minuten)** – wie lange vor dem Versand der Ankündigung (z. B. `5`).
* **Ankündigung per Telegram** / **Ankündigung über Sayit** – der/die Kanal(e), der/die für die Ankündigung verwendet werden

(Jede Instanz muss wie oben konfiguriert werden).

Die Ankündigung wird für jede Fütterung gemeinsam geplant. Sollte die Fütterung zum Ankündigungszeitpunkt **blockiert oder pausiert** sein (z. B. nachts, aufgrund von Temperatur, Sauerstoffmangel oder einer Fütterungspause), wird die Ankündigung übersprungen, sodass niemals eine Fütterung versprochen wird, die nicht stattfindet. Manuelle Fütterungen (über die Schaltfläche *Jetzt füttern* / `feedFor`) erfolgen ohne Vorlaufzeit und werden nicht angekündigt.

### 5.3 Relaisplatinenanschluss (optional)
Dieser Tab wird nur angezeigt, wenn die Option **Dieser Schalter verwendet die automatische Zufuhrrelaisplatine** in den allgemeinen Einstellungen aktiviert ist (siehe [5.1](#switches)). Jede Relaisplatine gehört zu einem Schalter (Zufuhrstation). Die Platine ist ein ESP32 mit drei Timer-Tasten (S1–S3) und einer eigenen Weboberfläche, die über Ihr Netzwerk auf **Port 80** erreichbar ist. Der Adapter **konfiguriert** die Platine lediglich und **zeigt ihren Status an** – er löst keine Zufuhr durch die Platine aus (die Tasten werden direkt auf der Platine betätigt).

**Hinweis:** Die Relaisplatine für die automatische Zuführung wird parallel als **separates Projekt** entwickelt.

Der Adapter funktioniert auch ohne sie einwandfrei – die Platine ist eine optionale, praktische Ergänzung. Da sie unabhängig weiterentwickelt wird, können sich einige Details unabhängig vom Adapter ändern.

* **Boardadresse (IP- oder mDNS-Host)** – z. B. `192.168.1.50` oder `feeder.local`. Eine feste IP-Adresse ist die

Am zuverlässigsten ist mDNS (`.local`), funktioniert aber nur, wenn Ihr Hostsystem die Domain auflösen kann. Ein Suffix `:port` ist zwar zulässig, aber in der Regel nicht erforderlich (Standard: `80`).

* **Testverbindung und Abrufzeiten** – kontaktiert die Platine einmal. Ein grüner *Verbunden*-Chip und die

Die Host-/IP-Adresse/Firmware der Platine bestätigt eine funktionierende Verbindung; die drei Tastendrückzeiten werden anschließend von der Platine in die unten stehenden Felder ausgelesen. Ein roter Chip mit der Aufschrift „Nicht verbunden“ signalisiert einen Fehler.

* **Tastenbetätigungszeiten (Sekunden)** – die Betätigungszeit jeder Taste **S1**, **S2** und **S3**

(1–600 s). Da diese **auch über die Weboberfläche des Boards bearbeitet werden können**, sollten sie immer zuerst *abgerufen* und dann angepasst werden.

* **Spart Zeit beim Schreiben an die Tafel** – schreibt die drei Werte an die Tafel.
* **Board neu starten** – startet den ESP32 über seine API neu (`POST /api/reboot`). Nach einer Bestätigung

Das Board startet daraufhin neu und ist für einige Sekunden offline, kommt dann aber automatisch wieder zurück.

Am unteren Rand des Tabs zeigt eine **Systemübersicht** die Live-Systemdaten des Boards nach einem erfolgreichen Verbindungstest (über die Schaltfläche *Verbindung und Abrufzeiten testen*): Firmware-Version und Build, Hostname, IP-Adresse, Wi-Fi-Netzwerk, Signalstärke (dBm), MAC-Adresse, Betriebszeit, freier Speicher und der Grund für den letzten Reset (in Klartext angezeigt, z. B. „Software“).

Die Verbindung wird auch in den Objektbaum gespiegelt und alle 60 Sekunden aktualisiert – siehe die `relay.*` Datenpunkte in [Abschnitt 6](#6-objects--data-points).

---

## 6. Objekte / Datenpunkte
**Hinweis:** Alle Zeitstempel werden in der **systeminternen Zeitzone** angezeigt (Format `DD.MM.YYYY HH:MM:SS`, z. B. `01.07.2026 16:20:00`). Bei VIS und Skripten hat jeder Zeitstempel zusätzlich einen **numerischen Zwilling**, der mit `…Ts` endet (Unix-Zeit in **Millisekunden**, `0` = keine Angabe) – ideal für Countdowns und Zeitbalken ohne String-Parsing und unabhängig vom Anzeigeformat.

Der Adapter erzeugt die folgenden Zustände unter seinem Namensraum (`automatic-feeder.<instance>.`).

**Global**

| Datenpunkt | Typ | Bedeutung |
|------------|------|---------|
| `info.connection` | boolean (ro) | Der Adapter läuft und die Konfiguration ist gültig. |

**Pro Schalter, unter `switches.<id>.`** (`<id>` ist eine interne ID wie `sw-0`)

Direkt unter dem Schalter befinden sich der manuelle Auslöser und zwei Unterkanäle:

* **`status`** (`switches.<id>.status.*`) – die unten aufgeführten schreibgeschützten Statusdatenpunkte.
* **`settings`** (`switches.<id>.settings.*`) – eine **bearbeitbare** Spiegelung der Einstellungen dieses Schalters

Die Konfiguration wird durch das Schreiben eines neuen Werts (über VIS oder ein Skript) geändert. Anschließend wird die Instanz neu gestartet, damit die Änderung wirksam wird. Einige abgeleitete Felder sind schreibgeschützt (z. B. `winterWindow`).

* **`Relay`** (`switches.<id>.relay.*`) – nur vorhanden, wenn dieser Schalter eine Relaisplatine verwendet; die

Die am Ende der Tabelle aufgeführten Datenpunkte zum Status der Relaisplatine sind schreibgeschützt.

| Datenpunkt | Typ | Bedeutung |
|------------|------|---------|
| `feedNow` | boolean (rw) | Schreiben Sie `true`, um eine manuelle Zufuhr auszulösen. |
| `status.feedingActive` | boolean (ro) | Ein Feeding läuft gerade. |
| `status.feedingEndsTs` | Nummer (ro) | Ende der **laufenden** Datenzufuhr als Unix-Zeit in ms (`0` = keine Datenzufuhr) — für einen Live-Countdown (z. B. 15 → 0 s) in VIS. |
| `status.feedingDurationSec` | Zahl (ro) | Gesamtdauer der **laufenden** Fütterung in Sekunden (`0` = keine Fütterung) — ermöglicht es einem VIS-Widget, einen genauen Fortschrittsring neben dem Countdown zu zeichnen. |
| `status.lastFeeding` | Zeichenkette (ro) | Zeitstempel der letzten Fütterung. |
| `status.lastFeedingTs` | Nummer (ro) | Letzte Fütterung als Unix-Zeit in ms (`0` = noch keine). |
| `status.nextFeeding` | Zeichenkette (ro) | Zeitstempel der nächsten geplanten Fütterung. |
| `status.nextFeedingTs` | Nummer (ro) | Nächste geplante Fütterung als Unix-Zeit in ms (`0` = nichts geplant). |
| `status.blocked` | boolean (ro) | Der letzte Versuch wurde blockiert. |
| `status.blockReason` | Zeichenkette (ro) | Warum es blockiert wurde (Nacht / Temperatur / Sauerstoff), in der Systemsprache. |
| `status.blockReasonCode` | Zeichenkette (ro) | Der Blockierungsgrund als **stabiler maschinenlesbarer Code** (z. B. `blockNight`, `blockWaterBelow`, `blockPauseManual`; leer = nicht blockiert) — für die Symbol-/Farblogik in VIS, unabhängig von der Sprache. |
| `status.lastResult` | Zeichenkette (ro) | Ergebnistext des letzten Fütterungsversuchs. |
| `status.error` | boolean (ro) | Beim letzten Versuch ist ein Schaltfehler aufgetreten. |
| `status.winterActive` | boolean (ro) | Die Winterpause ist derzeit aktiv. |
| `status.winterLastStartReminder` | Zeichenkette (ro) | Datum der letzten gesendeten "Winterbeginn"-Erinnerung. |
| `status.winterLastEndReminder` | Zeichenkette (ro) | Datum der letzten gesendeten Erinnerung "Winterende". |
| `status.pauseManual` | boolean (ro) | Die manuelle Master-Pause (*Feeding jetzt anhalten* / `settings.pauseNow`) ist aktiviert. |
| `status.pauseActive` | boolean (ro) | Eine einmalige Fütterungspause ist derzeit aktiv. |
| `status.pauseActiveUntil` | Zeichenkette (ro) | Ende der aktuell aktiven Fütterungspause (leer, falls keine vorhanden). |
| `status.pauseActiveUntilTs` | Nummer (ro) | Ende der aktiven Fütterungspause als Unix-Zeit in ms (`0` = keine). |
| `status.dynamicAvgTemperature` | Nummer (ro) | Durchschnittliche Temperatur, die bei der dynamischen Zufuhr verwendet wird. |
| `status.dynamicRate` | Nummer (ro) | Q10-Ratenfaktor, der aktuell durch dynamische Zuführung angewendet wird. |
| `status.dynamicIntervalMin` | Nummer (ro) | Aktuell berechnetes dynamisches Intervall (Minuten). |
| `status.dynamicDurationSec` | Zahl (ro) | Aktuell berechnete dynamische Dauer (Sekunden). |
| `status.airTemperature` | Nummer (ro) | Eigener Lufttemperaturquellenwert dieses Schalters. |
| `status.waterTemperature` | Nummer (ro) | Eigener Wassertemperaturquellenwert dieses Schalters (Speisezone / Flachwassersensor). |
| `status.waterTemperatureDeep` | Nummer (ro) | Der optionale Wert des Tiefenwassertemperatursensors dieses Schalters. |
| `status.waterStratification` | Anzahl (ro) | Temperaturdifferenz flach − tief (nur mit zwei Wassersensoren). |
| `status.oxygen` | Nummer (ro) | Eigener Wert der gelösten Sauerstoffquelle dieses Schalters. |
| `status.sunrise` / `status.sunset` | string (ro) | Berechneter Sonnenaufgang/Sonnenuntergang für den Standort dieses Schalters (astronomisches Fenster). |
| `status.sunriseTs` / `status.sunsetTs` | Zahl (ro) | Sonnenaufgang/Sonnenuntergang als Unix-Zeit in ms — z. B. für einen Tagesfortschrittsbalken in VIS. |
| `relay.connected` | boolean (ro) | Die für diesen Schalter konfigurierte Relaisplatine ist erreichbar (nur wenn dieser Schalter eine Relaisplatine verwendet). |
| `relay.info` | Zeichenkette (ro) | Relaisplatinenidentität (Host / IP / Firmware) der letzten erfolgreichen Abfrage. |
| `relay.active` | boolean (ro) | Der Timer der Relaisplatine läuft aktuell. |
| `relay.remaining` | Zahl (ro) | Verbleibende Sekunden auf dem Laufzeittimer der Relaisplatine. |
| `relay.remaining` | Zahl (ro) | Verbleibende Sekunden auf dem Laufzeittimer der Relaisplatine. |

Sie können diese in VIS, Skripten oder anderen Adaptern verwenden – zum Beispiel, um `status.nextFeeding` auf einem Dashboard anzuzeigen oder auf `status.error = true` zu reagieren, um Ihren eigenen Alarm zu senden.

---

## 7. Beispiele / Rezepte
**Koiteich, zweimal täglich, nur wenn es warm genug ist**

* Modus *Feste Zeiten* → `08:00`, `18:00`; Dauer `6` s.
* Aktivieren Sie auf der Registerkarte „Schalter“ unter „Temperatur & Sauerstoffquellen“ die Option „Wassertemperatur“ und wählen Sie die gewünschte Option aus.

der Sensor; dann *Blockierung durch Wassertemperatur* → *Blockierung, wenn unterhalb* `8` °C (keine Fütterung bei Kälte).

Unter *Einschränkungen* aktivieren Sie *Feeding auf das astronomische Tagesfenster beschränken*, damit nichts

Nach Einbruch der Dunkelheit gefüttert.

**Voliere, nur tagsüber (astronomisches Fenster)**

* Modus *Intervall innerhalb eines Zeitfensters* → Intervall `90` min; Dauer `3` s.
* Unter *Einschränkungen* das astronomische Fenster mit Offsets `30` / `30` min → feed aktivieren

Läuft von 30 Minuten nach Sonnenaufgang bis 30 Minuten vor Sonnenuntergang und passt sich automatisch den Jahreszeiten an.

**Koiteich, temperaturadaptiv (dynamische Fütterung)**

* Aktivieren Sie auf der Registerkarte „Schalter“ unter „Temperatur- und Sauerstoffquellen“ die Option „Wassertemperatur“ und wählen Sie den Sensor aus.
* Öffnen Sie dann *Dynamische Zufuhr*, aktivieren Sie diese und geben Sie *Wassertemperatur* als Quelle ein.
* Referenztemperatur 20 °C, Q10 2,2, Basisintervall 60 min (min. 30, max. 480), Basisdauer 5 s

(min `2`, max `15`). Es frisst dann häufiger und etwas mehr, wenn es warm ist, und weniger, wenn es kalt ist.

**Winterpause für den Teich**

* Öffnen Sie im Schaltermenü die Option *Winterpause*, aktivieren Sie sie und stellen Sie *Winterstart* auf 01.11 und *Winterende* ein.

`15.03`, Modus *Zufuhr unterbrechen*.

* Optional können Sie die Erinnerungen aktivieren, damit Sie einige Tage vor Beginn/Ende eine Telegram-Nachricht erhalten.

**Quarantäne nach Wiederauffüllung des Vorrats (Fütterungspause)**

* Öffnen Sie auf der Registerkarte „Schalter“ die Option „Fütterungspausen“, aktivieren Sie „Pause 1“ und stellen Sie „Start“ auf „15.07.2026 08:00“ ein.

*Ende* `22.07.2026 18:00` → In diesem Zeitfenster findet überhaupt keine Zufuhr statt, danach wird sie automatisch fortgesetzt.

* Bei konfigurierter Telegram-Instanz erhalten Sie eine Nachricht zu Beginn und am Ende der Pause.

**Stromzufuhr jetzt unterbrechen (Hauptschalter)**

* Öffnen Sie im Menü „Fütterungspausen“ die Option „Fütterung jetzt unterbrechen“ oder geben Sie `true` ein.

`automatic-feeder.0.switches.sw-0.settings.pauseNow` von einem VIS-Schalter.

* Die gesamte Nahrungszufuhr wird sofort gestoppt (und setzt damit alle Modi außer Kraft), bis Sie das Gerät wieder ausschalten; jeder Schalter

Sendet eine Telegram-Nachricht. `status.pauseManual` zeigt den Live-Status an.

**Manueller Zusatzteil über eine VIS-Taste**

* Fügen Sie in VIS eine Schaltfläche ein, die `true` in `automatic-feeder.0.switches.sw-0.feedNow` schreibt.
Oder verwenden Sie einen Schieberegler/ein Zahlenfeld, das die **Sekunden** ausgibt.

`automatic-feeder.0.switches.sw-0.feedFor` → wird **einmalig mit genau dieser Dauer** gefüttert (keine Konfigurationsänderung, kein Neustart; der Zustand wird anschließend auf `0` zurückgesetzt).

* Optional kann *Manueller Trigger ignoriert alle Blöcke* eingestellt werden, sodass er immer aktiv ist.

---

## 8. Telegram-Benachrichtigungen
1. Installieren und konfigurieren Sie den **Telegram**-Adapter (erstellen Sie einen Bot mit @BotFather, geben Sie den Namen ein).

Token, starte einen Chat mit deinem Bot). Stelle sicher, dass die Telegram-Instanz **läuft**.

2. Öffnen Sie im automatischen Feeder im **Tab „Wechseln“** die **Telegram-Benachrichtigungen**:
* Wählen Sie Ihre **Telegram-Instanz** aus dem Dropdown-Menü aus (z. B. `telegram.0`).
* Optional können Sie einen **Empfänger** eingeben (den im Telegram-Adapter angezeigten Benutzer-/Chatnamen); lassen Sie

Leerzeichen, um alle zu benachrichtigen.

* Markieren Sie die gewünschten Meldungen: *Fütterung erfolgreich*, *Fütterung fehlgeschlagen*, *Abschaltfehler*.
3. Speichern. Ab sofort werden die ausgewählten Überwachungsergebnisse an Telegram (mit dem Präfix „“) gesendet.

Switch-Name). Hierfür muss die *Switch-Überwachung* für diesen Switch aktiviert sein.

4. Die **Erinnerungen an die Winterpause** verwenden dieselbe Telegram-Instanz und denselben Empfänger. Sie sind

Die Einstellungen werden im Abschnitt *Winterpause* (Tage vor Beginn/Ende und zur Erinnerungsstunde) vorgenommen und erfordern **keine** Überwachung zur Aktivierung.

---

## 9. Fehlerbehebung & Häufig gestellte Fragen
Die Einstellungsseite ist leer/weiß. Laden Sie den Browser mit **Strg+Umschalt+R** neu (möglicherweise hat der Administrator eine ältere Seite zwischengespeichert). Sollte das Problem weiterhin bestehen, starten Sie die Instanz neu und öffnen Sie die Einstellungen erneut.

**Das neue Symbol / die Änderung wird nicht angezeigt.** Browser-Cache – Neuladen mit **Strg+Umschalt+R** erzwingen.

**Es wird nichts zugeführt.** Überprüfen Sie der Reihe nach: Der Schalter ist **aktiv**; ein **Schalterobjekt** ist ausgewählt; der **Zeitplan** ist gültig (`status.nextFeeding` zeigt eine Uhrzeit an); er ist nicht **blockiert** (siehe `status.blocked` / `status.blockReason`); das **astronomische Fenster** schließt die Uhrzeit nicht aus; setzen Sie die **Protokollierungsstufe** der Instanz auf `debug` und beobachten Sie das Protokoll.

**Die Fütterung erfolgt nachts nie, obwohl ich das möchte.** Deaktivieren Sie die Option „Fütterung auf das astronomische Tagesfenster beschränken“ für diesen Schalter oder passen Sie die Sonnenaufgangs-/Sonnenuntergangs-Offsets an. Wenn das astronomische Fenster aktiviert ist, der Schalter aber keine gültigen Koordinaten hat, bleibt der Fensterschutz inaktiv und eine Warnung wird protokolliert.

**Die Überwachung meldet immer einen Fehler.** Ihr Schalterobjekt meldet wahrscheinlich nicht seinen tatsächlichen Zustand zurück (`ack=true`). Verwenden Sie entweder einen Schalter mit Statusrückmeldung oder deaktivieren Sie die *Schaltüberwachung* für diesen Schalter.

**Dynamische Zufuhr ändert nichts.** Stellen Sie sicher, dass die ausgewählte Temperaturquelle (Wasser oder Luft) im Schalter-Tab („Temperatur- und Sauerstoffquellen“) aktiviert ist und Werte liefert. Direkt nach einem Neustart wird der gleitende Durchschnitt noch berechnet und beginnt daher mit den Basiswerten. Beachten Sie `status.dynamicAvgTemperature` und `status.dynamicIntervalMin`.

Die dynamische Datenzufuhr ist aktiviert, es werden jedoch keine Daten zugeführt (`status.nextFeeding` ist leer). Das Basisintervall oder das maximale Intervall ist 0 (oder das Zeitfenster ist ungültig), daher kann kein Intervall berechnet werden – `status.blockReason` zeigt dann einen Hinweis an. Legen Sie ein Basisintervall und ein maximales Intervall größer als 0 (sowie ein gültiges Zeitfenster) fest. Hinweis: Wenn Sie *sowohl* das minimale als auch das maximale Intervall auf 0 setzen, ist das Ergebnis ebenfalls 0.

**Es wird nicht gefüttert, obwohl nicht Winter ist (oder es wird gefüttert, obwohl eine Fütterungspause geplant ist).** Überprüfen Sie die Daten der *Winterpause* (`Winter start` / `Winter end`, Format TT.MM) und den Modus. Der Datenpunkt `status.winterActive` zeigt an, ob die Pause aktuell aktiv ist.

**Die Adresssuche zeigt an, dass die Instanz ausgeführt werden muss.** Starten Sie die automatische Feeder-Instanz – die Geokodierung läuft im Backend.

**Telegram-Nachrichten kommen nicht an.** Ist im Menü „Wechseln“ eine Telegram-Instanz ausgewählt? Ist der Telegram-Adapter konfiguriert und aktiv? Ist mindestens ein Nachrichtentyp ausgewählt und ist die *Wechselüberwachung* aktiviert?

---

## 10. Protokollierung und Debugging
Der Adapter protokolliert auf den Standard-IOBroker-Ebenen. Um detaillierte Meldungen anzuzeigen, erhöhen Sie die Protokollierungsstufe der Instanz (Instanzen → automatic-feeder.x → Protokollierungsstufe) auf **debug** oder **silly**.

* **Fehler** – Fehler, die Aufmerksamkeit erfordern (z. B. ein Schreibvorgang auf den Switch ist fehlgeschlagen).
* **Warnung** – Fehlkonfiguration (keine Koordinaten, ungültiger Zeitplan …).
* **Info** – Meilensteine (Start, Ausführung oder Blockierung einer Zufuhr, manueller Auslöser).
* **Debug** – detaillierter Ablauf (Planungsentscheidungen, Temperaturaktualisierungen, Geokodierung, Ein/Aus)

Werte, Überprüfung bestätigt/Zeitüberschreitung).

* **unsinnig** – sehr ausführliche Protokollierung (jeder Timer, jede Blockprüfung, jede Zustandsänderung).

---

## 11. Dynamische Fütterung – Hintergrund und Quellen
Fische (Kois, Goldfische, Teichkarpfen) sind **wechselwarm (wechselwarm)**: Ihr Stoffwechsel richtet sich nach der Wassertemperatur. Als Faustregel gilt, dass sich die Stoffwechselrate mit jedem Temperaturanstieg um 10 °C etwa **verdoppelt**, was genau dem **Q10-Koeffizienten** (typischerweise 2–3) entspricht, den dieser Adapter verwendet. Daher ist es physiologisch gerechtfertigt, bei warmem Wasser häufiger und etwas mehr und bei kaltem Wasser weniger zu füttern.

**Praktische Temperaturempfehlung (Koi/Teichfische):**

* **unter ~4–5 °C** – nicht füttern (Winterpause beachten).
* **~4–10 °C** – kaum aktiv; nur selten oder gar nicht füttern, leicht verdauliches (Weizenkeim-) Futter.
* **~10–15 °C** – reduzierte Nahrungsaufnahme; das Immunsystem ist noch geschwächt (~12 °C).
* **~15–25 °C** – optimaler Wachstumsbereich, volle Nährstoffversorgung.
* **oberhalb von ~28 °C** – gelöster **Sauerstoff** wird zum limitierenden Faktor → der O₂-Block ist hier nützlich.

**Wo messen und warum ein zweiter Sensor nötig ist:** Entscheidend ist die Temperatur des Wassers, in dem sich die Fische tatsächlich aufhalten (ihre **Futterzone**), *nicht* die Oberflächentemperatur (die um mehrere Grad abweichen kann). In einem Teich, der durch eine laufende Pumpe durchmischt wird, oder in einem flachen Teich genügt ein gut platzierter Sensor. Nur in einem **tiefen, undurchmischten Teich** schichtet sich das Wasser: Oberhalb von 4 °C befindet sich das warme Wasser oben (unten ist es kälter); unterhalb von 4 °C kehrt sich dies um, sodass sich am Grund eine etwa 4 °C warme Zone bildet. Hier bietet ein **zweiter (tieferer) Sensor** Vorteile – zur Sicherheit (Futter aus der kältesten Schicht), für eine saisonale Umschaltung zwischen flachem und tiefem Wasser und um die Schichtung sichtbar zu machen (`status.waterStratification`). Für die meisten Teiche ist er optional.

**Quellen / Weiterführende Literatur:**

Volkoff H. & Rønnestad I. (2020): *Einfluss der Temperatur auf Fress- und Verdauungsprozesse bei Fischen.* Temperature 7(4):307–320. <https://pubmed.ncbi.nlm.nih.gov/33251280/>
* K.O.I. – *Wassertemperatur und Koi.* <https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi>
* K.O.I. – *Die Wissenschaft hinter kaltem Wasser in Koiteichen.* <https://koiorganisationinternational.org/koi-articles/science-behind-cold-water-koi-ponds>
* Pond Informer – *Koi-Fütterungsleitfaden.* <https://pondinformer.com/koi-feeding-guide/>

Diese Werte dienen als allgemeine Richtlinie für Koi/Teichfische und ersetzen nicht die Beobachtung Ihrer eigenen Tiere. Passen Sie die Referenztemperatur, Q10, Grenzwerte und Schwellenwerte an Ihre Fischart und Ihre Haltungsbedingungen an.

## Dokumentation
- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.10.0 (2026-08-05)
* (ssbingo) **Admin UI now runs on React 19** — the configuration page uses the same React version that ioBroker **admin 8** ships; `@iobroker/adapter-react-v5` updated to 8.3.2
* (ssbingo) **Raised the minimum requirements**: **admin ≥ 8.0.0**, **js-controller ≥ 6.0.11** and **Node.js ≥ 22**
* (ssbingo) `@mui/material` and `@mui/icons-material` are now explicit direct dependencies. They stay on **MUI 6** for now because `adapter-react-v5` still requires it (it imports `Grid2`, removed in MUI 7+); the move to **MUI 9** follows automatically once the library supports it
* (ssbingo) No changes to feeding, notifications or data points — this release only modernizes the admin build and baseline versions

### 1.9.9 (2026-07-17)
* (ssbingo) The relay tab's **System overview** now also shows the **firmware release version** (`ver`, e.g. `0.0.15`) in addition to the firmware build date
* (ssbingo) The **last reset reason** is now spelled out in plain, localized words — the board sends a short code (`sw`, `poweron`, `wdt`, `brownout`, `deepsleep`, `panic`, …), which the adapter shows as e.g. “Software”, “Power-on”, “Watchdog”

### 1.9.8 (2026-07-17)
* (ssbingo) Fix (state role): `switches.<id>.relay.connected` now uses the role **`indicator.reachable`** instead of `indicator.connected` — the relay board is a physical LAN device (ESP32), not an adapter instance, and the ioBroker stateroles spec reserves `indicator.connected` for instances. Objects created by older versions are corrected automatically on start

### 1.9.7 (2026-07-15)
* (ssbingo) Maintenance: re-aligns the published version with the current GitHub state (which contained a CI-only change keeping the deploy action on the floating `@v1` major tag, per repochecker S3044). No functional or shipped-code changes

### 1.9.6 (2026-07-15)
* (ssbingo) Maintenance: updated a development dependency (`@types/node` → 22.20.1) and pinned the CI deploy action to a fixed version (`ioBroker/testing-action-deploy@v1.5.1`); Dependabot now keeps `pdfmake` on the 0.2.x line (0.3.x has an incompatible server API). No functional changes

### 1.9.5 (2026-07-15)
* (ssbingo) New comprehensive **German PDF handbook** ([doc/de/Handbuch.pdf](doc/de/Handbuch.pdf)) with a modern, colourful design — generated from `tools/build-handbook.js` (`npm run doc:handbook`) and linked from the German documentation
* (ssbingo) Added a note in the relay-board section (all 11 languages) that the **Automatic-Feeder relay board is developed in parallel as a separate project**

### 1.9.4 (2026-07-15)
* (ssbingo) The feeding announcement now also states the **approximate feeding duration** — e.g. "The next feeding starts in 5 minutes. The feeding will take about 8 seconds." The duration is the effective one (static/winter/dynamic), localized with correct singular/plural in every language
* (ssbingo) The **Sayit volume** is now set shortly before the spoken text (small delay) so it reliably applies to that announcement instead of the previous one

### 1.9.3 (2026-07-15)
* (ssbingo) Fix: the **Sayit volume** is now written to the instance's own `tts.volume` state (only if it exists) instead of a `tts.text` prefix — the volume actually takes effect now, and the announcement **test no longer hangs** when a volume is set. An empty volume keeps the Sayit instance's own volume

### 1.9.2 (2026-07-15)
* (ssbingo) New **Test announcement** button next to the Sayit instance selection — speaks a short test text through the selected instance so you can check the audio output without waiting for a feeding
* (ssbingo) The feeding announcement now uses the **correct singular/plural** form of "minutes" for each language (e.g. "1 minute" vs "5 minutes"; Russian/Polish/Ukrainian 1 / 2–4 / 5+ forms), via the language's CLDR plural rules

### 1.9.1 (2026-07-15)
* (ssbingo) The feeding announcement now uses the final text **"The next feeding starts in X minutes"** (localized in the switch's selected message language; `X` = the configured lead time)

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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