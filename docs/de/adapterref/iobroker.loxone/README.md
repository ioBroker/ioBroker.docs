---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.loxone/README.md
title: ioBroker.loxone
hash: YkjvNYRdWtmjOVjVA795TpNxsCDUbmN6c3+fCVavieY=
---
![Logo](../../../en/adapterref/iobroker.loxone/admin/loxone.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.loxone.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.loxone.svg)
![Anzahl der Installationen](https://iobroker.live/badges/loxone-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/loxone-stable.svg)
![NPM](https://nodei.co/npm/iobroker.loxone.png?downloads=true)

# IoBroker.loxone
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/loxone/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test und Freigabe](https://github.com/UncleSamSwiss/ioBroker.loxone/workflows/Test%20and%20Release/badge.svg)

## Loxone-Adapter für ioBroker
**_Dieser Adapter benötigt mindestens Node.js 20.x!_**

Ruft alle im Loxone Miniserver (und Loxone Miniserver Go) verfügbaren Informationen ab und stellt Änderungen in Echtzeit bereit.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Dialog zur Instanzkonfiguration.
2. Geben Sie die IP-Adresse oder den Hostnamen und den HTTP-Port (standardmäßig 80) Ihres Loxone-Miniservers ein.
3. Erstellen Sie einen neuen Benutzer im Loxone Miniserver (mithilfe der Anwendung Loxone Config), dem Sie ausschließlich Lese- und Schreibrechte für alle erforderlichen Variablen gewähren.
4. Geben Sie im Konfigurationsdialog den Benutzernamen und das zugehörige Passwort ein.
5. Konfiguration speichern
6. Schalten Sie den Adapter ein.

## Konfiguration
### Miniserver Hostname / IP
Dies ist die IP-Adresse oder der Hostname Ihres Loxone Miniservers oder Miniserver Go.

### Miniserver-Port
Dies ist der HTTP-Port Ihres Loxone Miniservers.

Der Miniserver ist standardmäßig so konfiguriert, dass er auf Port 80 lauscht, aber Sie haben dies möglicherweise geändert.

### Miniserver-Benutzername
Geben Sie einen gültigen Benutzernamen an, um auf den Loxone Miniserver zuzugreifen.

Aus Sicherheitsgründen wird dringend empfohlen, einen anderen Benutzer als „admin“ zu verwenden.

Der Benutzer benötigt lediglich Lesezugriff auf die Variablen, die Sie von ioBroker verwenden möchten.

### Miniserver-Passwort
Geben Sie das Passwort für den angegebenen Benutzernamen an (siehe oben).

### Namen synchronisieren
Dadurch werden die Namen in ioBroker aktualisiert, sobald sie sich in der Loxone-Konfiguration ändern.
Wenn diese Option deaktiviert ist, werden die Namen nur beim ersten Erkennen eines Steuerelements synchronisiert.

### Räume synchronisieren
Dadurch wird die Enumeration enum.rooms mit allen vom Loxone Miniserver bereitgestellten Räumen gefüllt und alle Steuerelemente werden miteinander verknüpft.

### Synchronisierungsfunktionen
Dadurch wird die Enumeration enum.functions mit allen vom Loxone Miniserver bereitgestellten Kategorien gefüllt und alle Steuerelemente werden miteinander verknüpft.

### Wetterserver
Wählen Sie aus, welche Wetterdaten Sie synchronisieren möchten:

Die Option „Wetterdaten nicht synchronisieren“ bewirkt keine Synchronisierung von Daten des Wetterservers.
- Bei der Option „Nur aktuelles Wetter synchronisieren“ werden die Daten unter „Tatsächlich“ synchronisiert.
- Die Option „24-Stunden-Wettervorhersage synchronisieren“ synchronisiert das aktuelle Wetter mit der Wettervorhersage für die nächsten 24 Stunden.
- Mit der Option „Gesamte Wettervorhersage synchronisieren“ werden das aktuelle Wetter und die gesamte Wettervorhersage (96 Stunden) synchronisiert.

## Staaten
Der Adapter verbindet sich automatisch mit dem konfigurierten Loxone Miniserver und erstellt Zustände für jeden gefundenen Steuerungszustand.

Die IDs der Bundesstaaten sind wie folgt formatiert: `loxone.<instance>.<control>.<state>`

- `<instance>` ist der Instanzindex des ioBroker-Adapters (normalerweise "0").
- `<control>` ist die UUID des Steuerelements.
- `<state>` ist der Zustand innerhalb des Steuerelements (weitere Informationen finden Sie unter [Unterstützte Steuerelementtypen](#supported-control-types)).

Der in Loxone Config angegebene Name für ein Steuerelement wird in ioBroker ausschließlich als Anzeigename verwendet.
Dies ist notwendig, da ein Benutzer denselben Namen für mehrere Steuerelemente wählen kann.

Weitere Informationen zu Steuerelementen und deren Zuständen finden Sie in der Loxone-API (insbesondere in der Strukturdatei): https://www.loxone.com/enen/kb/api/

## Kontrollierbarkeit
Standardmäßig blendet Loxone Miniserver viele Steuerelemente (und damit deren Zustände) vor der Weboberfläche aus.

Das bedeutet, dass sie auch für diesen ioBroker-Adapter unsichtbar sind.

### Verwendung in der Benutzeroberfläche
Um sicherzustellen, dass alle Ihre Statusangaben korrekt an ioBroker gemeldet werden, überprüfen Sie bitte, ob im Abschnitt „Benutzeroberfläche“ die Option „Verwenden“ aktiviert ist:

![Verwendung in den Benutzeroberflächeneinstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

### Diagnoseeingänge anzeigen
Um Diagnoseeingaben anzuzeigen (z. B. den Akkustand von Air-Geräten), überprüfen Sie bitte, ob die Option „Diagnoseeingaben anzeigen“ am Gerät aktiviert ist:

![Einstellungen für Diagnoseeingänge anzeigen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-display-diagnostics.png)

## Globale Staaten
Folgende globale Zustände werden derzeit von diesem Adapter bereitgestellt:

- `operatingMode`: die aktuelle Betriebsmodusnummer des Loxone Miniservers
- `operatingMode-text`: der aktuelle Betriebsmodus des Loxone Miniservers als Text
- „Sonnenaufgang“: die Anzahl der Minuten nach Mitternacht, bis die Sonne heute aufgeht
- `Sonnenuntergang`: die Anzahl der Minuten nach Mitternacht, bis die Sonne heute untergeht
- `Benachrichtigungen`: die Anzahl der Benachrichtigungen
- `modifications`: die Anzahl der Änderungen
- alle anderen globalen Staaten werden einfach als Texte gemeldet

## Unterstützte Steuerungstypen
Folgende Steuerungstypen werden von diesem Adapter derzeit unterstützt.

Hinter dem Namen des Bundesstaates kann man die Art des Bundesstaates erkennen:

- `(rw)`: lesbar und beschreibbar: Dieser Status kann über ioBroker geändert werden.
- `(ro)`: Schreibgeschützt: Dieser Zustand kann von ioBroker aus nicht geändert werden.
- `(wo)`: Schreibgeschützt: Der Wert dieses Zustands wird von diesem Adapter nicht gemeldet, kann aber geändert werden, wodurch eine Aktion auf dem Loxone Miniserver ausgelöst wird.

### AalSmartAlarm
Bereitgestellt von AAL Smart Alarm Control.

- `alarmLevel` (ro) die ID des aktuellen Alarmlevels
- 0 = Kein Alarm
- 1 = Sofortiger Alarm
- 2 = Verzögerter Alarm
- `alarmCause` (ro) Eine Zeichenkette, die die letzte Ursache für einen Alarm darstellt.
- `isLocked` (ro) Aktiver Reset, Eingaben werden ignoriert und daher werden keine Alarme ausgelöst
- `isLeaveActive` (ro) Die Eingabe „Abwesenheit“ ist gesetzt, es werden keine Alarme ausgeführt
- `disableEndTime` (ro) Endzeitpunkt, zu dem das Steuerelement deaktiviert werden soll
- `confirm` (wo) Bestätigung des ausstehenden Alarms
- `disable` (wo) Deaktiviert die Steuerung für einen bestimmten Zeitraum; es werden keine Alarme ausgelöst. Durch Setzen auf 0 wird der intelligente Alarm wieder aktiviert.
- `startDrill` (wo) Testalarm ausführen

### AalNotfall
Bereitgestellt durch die AAL Smart Emergency Button-Steuerung.

- `status` (ro) die ID des aktuellen Status
- 0 = Betrieb, Normalbetrieb, wartet auf Betätigung des Not-Aus-Knopfes
-1 = Alarm ausgelöst
- 2 = Reset-Eingang in der Konfiguration aktiviert, Steuerung wird abgeschaltet
- 3 = Die App hat die Steuerung vorübergehend deaktiviert.
- `disableEndTime` (ro) Endzeitpunkt, zu dem das Steuerelement deaktiviert werden soll
- `resetActive` (ro) Textstatus mit dem aktiven Reset-Eingang (wenn sich die Steuerung im Reset-Zustand befindet)
- `trigger` (wo) löst einen Alarm in der App aus
- `quit` (wo) einen aktiven Alarm beenden
- `disable` (wo) deaktiviert die Steuerung für die angegebene Zeit in Sekunden. Setzen Sie den Wert auf 0, um die Steuerung wieder zu aktivieren, falls sie deaktiviert war.

### Alarm
Bereitgestellt von der Einbruchmeldeanlage.

- `armed` (rw) boolescher Status (true / false) des Alarms; durch Schreiben von `true` in diesen Wert wird der Alarm sofort aktiviert (ohne die vordefinierte Verzögerung)
- `nextLevel` (ro) die ID der nächsten Alarmstufe
- 1 = Stumm
- 2 = Akustisch
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `nextLevelDelay` (ro) die Verzögerung des nächsten Levels in Sekunden
- `nextLevelDelayTotal` (ro) die Gesamtverzögerung des nächsten Levels in Sekunden
- `level` (ro) die ID des aktuellen Alarmlevels
- 1 = Stumm
- 2 = Akustisch
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `startTime` (ro) der Zeitstempel, zu dem der Alarm gestartet wurde
- `armedDelay` (ro) die Verzögerung beim Scharfschalten der Alarmsteuerung
- `armedDelayTotal` (ro) die Gesamtverzögerung der Aktivierung der Alarmsteuerung
- `sensors` (ro) die Liste der Sensoren
- `disabledMove` (rw) Die Bewegung ist deaktiviert (true) oder nicht (false)
- `delayedOn` (wo): Durch Schreiben eines beliebigen Werts in diesen Zustand wird der Alarm mit der konfigurierten Verzögerung aktiviert.
- `quit` (wo) Das Schreiben eines beliebigen Werts in diesen Zustand bestätigt den Alarm

### Zentrale Alarmanlage
Bereitgestellt durch die zentrale Einbruchmeldeanlage.

- `armed` (rw) boolescher Status (true / false) des Alarms; durch Schreiben von `true` in diesen Wert wird der Alarm sofort aktiviert (ohne die vordefinierte Verzögerung)
- `delayedOn` (wo): Durch Schreiben eines beliebigen Werts in diesen Zustand wird der Alarm mit der konfigurierten Verzögerung aktiviert.
- `quit` (wo) Das Schreiben eines beliebigen Werts in diesen Zustand bestätigt den Alarm

### Wecker
Bereitgestellt durch die Weckersteuerung.

- `isEnabled` (rw) boolescher Status (true / false) des Weckers
- `isAlarmActive` (ro) boolescher Wert (true / false) gibt an, ob der Alarm aktuell klingelt
- `confirmationNeeded` (ro) boolescher Wert (true / false) Gibt an, ob der Benutzer den Alarm bestätigen muss.
- `ringingTime` (ro) Countdown in Sekunden, wie lange der Wecker klingelt, bis er wieder in die Schlummertaste geht
- `ringDuration` (rw) Dauer in Sekunden, in der der Wecker klingelt
- `prepareDuration` (rw) Vorbereitungszeit in Sekunden
- `snoozeTime` (ro) Sekunden bis zum Ende der Schlummerfunktion
- `snoozeDuration` (rw) Dauer des Schlummerns in Sekunden
- `snooze` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der aktuelle Alarm stummgeschaltet.
- `dismiss` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der aktuelle Alarm beendet.

### AudioZone
Bereitgestellt von Music Server Zone.

- `serverState` (ro) Status des Musikservers:
- -3 = unbekannte/ungültige Zone
- -2 = nicht erreichbar
- -1 = unbekannt
- 0 = offline
- 1 = Initialisierung (Bootvorgang, Versuch, das System zu erreichen)
- 2 = online
- `playState` (rw) der Wiedergabestatus:
- -1 = unbekannt (dieser Wert kann nicht festgelegt werden)
- 0 = gestoppt (Durch Einstellen dieses Wertes wird die Wiedergabe pausiert)
- 1 = pausiert (durch Einstellen dieses Wertes wird die Wiedergabe pausiert)
- 2 = Wiedergabe (Durch Einstellen dieses Wertes wird die Wiedergabe gestartet/fortgesetzt)
- `clientState` (ro) Status des Clients:
- 0 = offline
- 1 = Initialisierung (Bootvorgang, Versuch, das System zu erreichen)
- 2 = online
- `power` (rw) gibt an, ob die Client-Stromversorgung aktiv ist oder nicht.
- `volume` (rw) aktuelle Lautstärke
- Den `maxVolume` (ro)-Zonen kann ein maximales Volumen zugewiesen werden.
- `shuffle` (rw) Gibt an, ob die Zufallswiedergabe in der Wiedergabeliste aktiviert ist.
- `sourceList` (ro) Liste, die alle Zonenfavoriten enthält
- `repeat` (rw) Wiederholungsmodus:
- -1 = unbekannt
- 0 = aus
- 1 = alle wiederholen
- 2 = -nicht verwendet-
- 3 = Aktuellen Eintrag wiederholen
- `songName` (ro) Liedname
- `duration` (ro) Länge des gesamten Tracks, -1 falls unbekannt (Stream)
- `progress` (rw) aktuelle Position in der Spur
- `album` (ro) Albumname
- `Künstler` (ro) Künstlername
- `station` (ro) Stationsname
- `genre` (ro) Genrename
- `cover` (ro) URL des Song-/Albumcoverbildes
- `source` (rw) aktuell ausgewählte Quellenkennung (siehe `sourceList` oben)
- `prev` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird zum vorherigen Abschnitt gewechselt.
- `next` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand führt zum nächsten Track

### Zentrale Audioanlage
Bereitgestellt vom zentralen Musikserver.

- `control` (wo) legt den Wiedergabestatus aller Spieler fest (`true` = Wiedergabe, `false` = Pause)

### Farbauswahl
Dieses Gerät erscheint nur innerhalb eines LightControllers.

- `rot` (rw) Rotwert des Farbwählers
- `grün` (rw) Grünwert des Farbwählers
- `blue` (rw) Blauwert des Farbwählers

Wenn einer oder mehrere der oben genannten Zustände über ioBroker festgelegt werden, wird erst nach etwa 100 ms ein Befehl an den Miniserver gesendet.
Dies verhindert, dass sich die Farbe bei einer einzelnen Benutzereingabe mehrfach ändert.

### Farbauswahl V2
Dieses Gerät wird nur innerhalb eines Light Controller V2 in der Loxone-Softwareversion 9 und höher angezeigt.

- `rot` (rw) Rotwert des Farbwählers
- `grün` (rw) Grünwert des Farbwählers
- `blue` (rw) Blauwert des Farbwählers

Wenn einer oder mehrere der oben genannten Zustände über ioBroker festgelegt werden, wird erst nach etwa 100 ms ein Befehl an den Miniserver gesendet.
Dies verhindert, dass sich die Farbe bei einer einzelnen Benutzereingabe mehrfach ändert.

### Daytimer / IRCDaytimer
Bereitgestellt durch Timer/Zeitplan.

- `mode` (ro) aktueller Betriebsmodus der Tageszeitschaltuhr
- `mode-text` (ro) Name des aktuellen Betriebsmodus der Tageszeitschaltuhr
- `override` (ro) die verbleibende Zeit des Timers
- `value` (ro) aktueller Wert, `true` oder `false` für digitale Werte und ein Wert für analoge Werte.
- `value-formatted` (ro) Aktueller formatierter Wert als Text
- `needsActivation` (ro) ist nur verfügbar, wenn das Steuerelement aktiviert werden muss.
- `resetActive` (ro) bleibt aktiv, solange der Reset-Eingang des Tagestimers aktiv ist.
- `pulse` (wo) aktiviert den neuen Wert, falls ein Eintrag aktiviert werden muss

### Dimmer
Bereitgestellt von Dimmern.

- `position` (rw) aktuelle Position des Dimmers
- `min` (ro) aktueller Minimalwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert
- `on` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Dimmer auf die zuletzt bekannte Position eingestellt.
- `off` (wo): Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Dimmer deaktiviert, die Position auf 0 gesetzt, die letzte Position jedoch beibehalten.

### EIBDimmer
Bereitgestellt von EIB/KNX-Dimmern.

- `position` (rw) aktuelle Position des Dimmers
- `on` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Dimmer auf die zuletzt bekannte Position eingestellt.
- `off` (wo): Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Dimmer deaktiviert, die Position auf 0 gesetzt, die letzte Position jedoch beibehalten.

### Fronius
Bereitgestellt vom Energiemonitor.

- `prodCurr` (ro) aktuelle Produktionsleistung
- `prodCurrDay` (ro) Energieproduktion am gesamten heutigen Tag
- `prodCurrMonth` (ro) Energieproduktion im gesamten aktuellen Monat
- `prodCurrYear` (ro) Energieproduktion im gesamten laufenden Jahr
- `prodTotal` (ro) Energieproduktion seit der Inbetriebnahme
- `consCurr` (ro) Stromaufnahme
- `consCurrDay` (ro) Energieverbrauch im Laufe des aktuellen Tages
- `consTotal` (ro) Energieverbrauch seit der Einrichtung
- `deliveryDay` (ro) unbekannt
- `earningsDay` (ro) wie viel Geld im Laufe des Tages verdient wurde, indem entweder der erzeugte Strom selbst verbraucht statt aus dem Netz bezogen wurde oder indem nicht verbrauchter Strom ins Netz eingespeist wurde.
- `earningsMonth` (ro) Wie viel Geld wurde im laufenden Monat verdient?
- `earningsYear` (ro) wie viel Geld im laufenden Jahr verdient wurde
- `earningsTotal` (ro) Wie viel Geld wurde seit der Gründung verdient?
- `gridCurr` (ro) Aktuelle Netzaufnahme/Netzeinspeisung. Bei einem negativen Wert wird Strom ins Netz eingespeist.
- `batteryCurr` (ro) Aktueller Lade-/Verbrauchswert der Batterie. Bei negativem Wert wird die Batterie geladen.
- `stateOfCharge` (ro) repräsentiert den Ladezustand der Batterie. 100 = vollständig geladen.
- `co2Factor` (ro) Wie viel CO2 wird benötigt, um eine kWh zu produzieren? Wird zur Berechnung der CO2-Einsparungen verwendet.
- `online` (ro) wahr: online, falsch: offline

### Tor
Bereitgestellt durch Torsteuerungen.

- `position` (ro) die Position von 1 = oben bis 0 = unten
- `aktiv` (rw) aktuelle Richtung der Torbewegung
-1 = schließen
-0 = bewegt sich nicht
- 1 = offen
- `preventOpen` (ro) Gibt an, ob das Öffnen der Tür verhindert werden soll.
- `preventClose` (ro) ob das Schließen der Tür verhindert werden soll

### Zentraltor
Bereitgestellt durch die zentrale Torsteuerung.

- `open` (wo) öffnet alle Tore
- `close` (wo) schließt alle Tore
- `stop` (wo) stoppt alle Torantriebe

### Stundenzähler
Bereitgestellt von

- `total` (ro) Gesamtzahl der Sekunden, die der Zähler bisher aktiv war
- `remaining` (ro) Wie viele Sekunden verbleiben, bis die nächste Wartung erforderlich ist
- `lastActivation` (ro) der Zeitstempel, wann der Zähler zuletzt aktiviert wurde
- `overdue` (ro) `false`, falls nicht überfällig, andernfalls ist eine Wartung erforderlich
- `maintenanceInterval` (ro) Sekunden bis zur nächsten Wartung
- `active` (ro) Gibt an, ob der Zähler aktuell aktiv ist oder nicht.
- `overdueSince` (ro) Sekunden seit Überschreitung des Wartungsintervalls
- `reset` (wo) bewirkt ein Zurücksetzen der folgenden Werte
- verbleibend bis zum Wartungsintervall
- überfällig auf 0
- überfälligSeit bis 0
- `resetAll` (wo) funktioniert wie `reset`, setzt aber auch
- Summe zu 0
- lastActivation auf 0

### InfoOnlyAnalog
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `value` (ro) der Zustandswert (Zahl) des Steuerelements
- `value-formatted` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des "Unit"-Formats aus Loxone Config)

### InfoOnlyDigital
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `aktiv` (ro) boolescher Status (wahr / falsch) des Steuerelements
- `active-text` (ro), falls konfiguriert, der Text, der dem Zustand entspricht
- `active-image` (ro), falls konfiguriert, das Bildäquivalent des Zustands
- `active-color` (ro), falls konfiguriert, die Farbdarstellung des Zustands

![InfoOnlyDigital-Einstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### Nur-Info-Text
Bereitgestellt von virtuellen Textstaaten.

- `text` (ro) der Statuswert des Steuerelements
- `text-formatted` (ro), falls konfiguriert, der formatierte Wert des Zustands

### Gegensprechanlage
Bereitgestellt von Türsteuerungen.

- `bell` (ro) ob die Glocke läutet
- `lastBellEvents` (ro) Array mit den Zeitstempeln für jede unbeantwortete Klingelaktivität.
- `version` (ro) Nur Loxone Intercoms - Text mit der aktuell installierten Firmware

Versionen

- `answer` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird die Glocke deaktiviert.

Dieser Kanaltyp kann weitere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Intelligenter Raumcontroller V2
Bereitgestellt vom intelligenten Raumcontroller V2 seit Miniserver 10.0.

TODO: Dokumentation fehlt derzeit

### Jalousie
Bereitgestellt durch verschiedene Arten von Jalousien (automatische und manuelle).

- `up` (rw) ob Jalousie nach oben rückt
- `down` (rw) ob sich Jalousie nach unten bewegt
- `position` (ro) Position der Jalousie, eine Zahl von 0 bis 1
    - Jalousie-Oberstellung = 0
    - Untere Jalousie-Position = 1
- `shadePosition` (ro) Position des Jalousierollos, eine Zahl von 0 bis 1
- Jalousien sind nicht beschattet = 0
- Jalousien sind abgedunkelt = 1
- `safetyActive` (ro) wird nur von Fahrzeugen mit Autopilot verwendet und stellt die Sicherheitsabschaltung dar.
- `autoAllowed` (ro) wird nur von Nutzern mit Autopilot verwendet.
- `autoActive` (rw) wird nur von Benutzern mit Autopilot verwendet
- `gesperrt` (ro) nur für Fahrzeuge mit Autopilot; dies repräsentiert den Ausgabe-QI in der Loxone-Konfiguration.
- `infoText` (ro) informiert z.B. darüber, was den gesperrten Zustand verursacht hat oder wodurch die Sicherheitsfunktion aktiviert wurde.
- `fullUp` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand löst eine vollständige Aufwärtsbewegung aus.
- `fullDown` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand löst eine vollständige Abwärtsbewegung aus.
- `shade` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird die Jalousie in die perfekte Position gebracht.

### Zentraljalousie
Bereitgestellt durch die zentrale Jalousiensteuerung.

- `autoActive` (rw) wird nur von Benutzern mit Autopilot verwendet
- `fullUp` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand löst eine vollständige Aufwärtsbewegung aus.
- `fullDown` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand löst eine vollständige Abwärtsbewegung aus.
- `shade` (wo) Schreiben eines beliebigen Wertes in diesen Zustand, um die Schattierungen aller Jalousien in die perfekte Position zu bringen

### Lichtsteuerung
Bereitgestellt von (Hotel-)Lichtsteuerungen.
Szenen können nur in den Loxone-Anwendungen geändert, aber in ioBroker ausgewählt werden.

- `activeScene` (rw) Nummer der aktuell aktiven Szene
- 0: Alles aus
- 1..8: Benutzerdefinierte Szene (Definition/Erlernen von Szenen muss mit den Loxone-Tools erfolgen)
- 9: alles an
- `sceneList` (ro) Liste aller Szenen
- `plus` (wo) wechselt zur nächsten Szene
- `minus` (wo) Änderungen zur vorherigen Szene

Dieser Kanaltyp kann weitere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Lichtsteuerung V2
Bereitgestellt von (Hotel-)Lichtsteuerungen in Loxone Software Version 9 und höher. Stimmungen können nur in den Loxone-Anwendungen geändert, aber in ioBroker ausgewählt und kombiniert werden.

- `moodList` (ro) Liste aller konfigurierten Stimmungsnamen
- `activeMoods` (rw) aktuell aktive Liste der Stimmungsnamen
- `favoriteMoods` (ro) Liste der Lieblingsstimmungsnamen
- `additionalMoods` (ro) Liste der nicht bevorzugten Stimmungsnamen
- `plus` (wo) wechselt zur nächsten Stimmung
- `minus` (wo) ändert den vorherigen Modus

Dieser Kanaltyp kann weitere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Zentrale Lichtsteuerung
Bereitgestellt von der zentralen Lichtsteuerung.

- `control` (wo) schaltet alle Lichter ein oder aus

### Briefkasten
Bereitgestellt von Paketsafe Air / Tree.

- `notificationsDisabledInput` (ro) Status der deaktivierten Benachrichtigungseingabe
- `packetReceived` (ro) Status, ob ein Paket empfangen wurde
- `mailReceived` (ro) Gibt an, ob eine E-Mail empfangen wurde
- `disableEndTime` (ro) Zeitstempel bis zum Deaktivieren der Benachrichtigungen
- `confirmPacket` (wo) Empfang eines Pakets bestätigen
- `confirmMail` (wo) Empfang der E-Mail bestätigen
- `disableNotifications` (wo) Deaktiviert die Benachrichtigungen für x Sekunden; 0 Sekunden zum Abbrechen des Timers

### Zähler
Bereitgestellt durch Stromzähler.

- `actual` (ro) der tatsächliche Wert (Zahl)
- `actual-formatted` (ro) falls konfiguriert, der formatierte Istwert des Zustands (unter Verwendung des "Unit"-Formats aus Loxone Config)
- `total` (ro) der Gesamtwert (Zahl)
- `total-formatted` (ro) falls konfiguriert, der formatierte Gesamtwert des Zustands (unter Verwendung des "Unit"-Formats aus Loxone Config)
- `reset` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Gesamtwert zurückgesetzt.

### Präsenzmelder
Bereitgestellt vom Präsenzmelder.

- `aktiver` (ro) Anwesenheitsstatus
- `locked` (ro) gesperrter Zustand
- `events` (ro) die Anzahl der Ereignisse
- `infoText` (ro) Grund, warum der Präsenzmelder gesperrt ist

### Druckknopf
Bereitgestellt durch virtuelle Drucktasteneingaben.

- `aktiv` (rw) der aktuelle Status des Druckknopfes
- `pulse` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand simuliert das Drücken des Knopfes nur für eine sehr kurze Zeit.

### Radio
Bereitgestellt durch Optionsfelder (8x und 16x).

- `activeOutput` (rw) ID des aktuell aktiven Ausgangs oder 0, falls keiner aktiv ist ("Alle aus")

### Fernbedienung
Bereitgestellt vom Mediencontroller. Nur grundlegende Lesefunktionen.

- `active` (ro) wahr, wenn der Miniserver die Befehle zum Umschalten der Modi oder zum Einschalten sendet.
- `mode` (ro) die Taste für den aktuellen Modus oder 0, wenn kein Modus ausgewählt ist ("Alles aus")"
- `timeout` (ro) das Timeout in Millisekunden

### Schieberegler
Bereitgestellt durch analoge virtuelle Eingänge.

- `value` (rw) der aktuelle Wert des Schiebereglers
- `value-formatted` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des "Unit"-Formats aus Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an.

### Rauchmelder
Bereitgestellt durch Stromzähler.

- `nextLevel` (ro) die ID der nächsten Alarmstufe
- 1 = Stumm
- 2 = Akustik
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `nextLevelDelay` (ro) Verzögerung des nächsten Levels in Sekunden
- `nextLevelDelayTotal` (ro) Gesamtverzögerung des nächsten Levels in Sekunden
- `level` (ro) die ID des aktuellen Alarmlevels
- 1 = Stumm
- 2 = Akustisch
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `sensors` (ro) die Liste der Sensoren
- `acousticAlarm` (ro) Status des akustischen Alarms: false für nicht aktiv und true für aktiv
- `testAlarm` (ro) Gibt an, ob testalarm aktiv ist
- `alarmCause` (ro) die Ursache des Alarms:
- 1 = Nur Rauchmelder
- 2 = nur Wasser
- 3 = Rauch und Wasser
- 4 = nur Temperatur
- 5 = Feuer und Temperatur
- 6 = Temperatur und Wasser
- 7 = Feuer, Temperatur und Wasser
- `startTime` (ro) Zeitstempel, wann der Alarm gestartet wurde
- `timeServiceMode` (rw) Verzögerung bis zur Deaktivierung des Dienstmodus
- `mute` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird die Sirene stummgeschaltet.
- `quit` (wo) Das Schreiben eines beliebigen Werts in diesen Zustand bestätigt den Rauchmelder

### Schalten
Bereitgestellt durch virtuelle Eingangsschalter.

- `aktiv` (rw) der aktuelle Status des Schalters

### Textstatus
Bereitgestellt vom „Staat“.

- `textAndIcon` (ro) der aktuelle Wert des Zustands

### Zeitschalter
Bereitgestellt durch Treppenhaus- und Multifunktionsschalter.

- `deactivationDelayTotal` (ro) Sekunden, wie lange der Ausgang aktiv bleibt, wenn der Timer verwendet wird
- `deactivationDelay` (ro) Countdown bis zur Deaktivierung des Ausgangs
- 0 = Der Ausgang ist ausgeschaltet
-1 = Der Ausgang ist dauerhaft eingeschaltet.
Andernfalls zählt der Zähler von „deactivationDelayTotal“ herunter.
- `on` (wo) Das Schreiben eines beliebigen Wertes in diesen Zustand aktiviert den Schalter dauerhaft ohne Deaktivierungsverzögerung.
- `off` (wo) Durch Schreiben eines beliebigen Wertes in diesen Zustand wird der Schalter deaktiviert.
- `pulse` (wo) betätigt den Schalter:
- Deaktivierungsverzögerung = 0
- Der Countdown startet von DeaktivierungsverzögerungGesamt bis 0
- falls es sich um einen Treppenhausschalter handelt:
- Deaktivierungsverzögerung = -1
- Keine Auswirkung, bleibt dauerhaft eingeschaltet.
- Deaktivierungsverzögerung > 0
- Startet den Countdown neu.
- falls es sich um einen Multifunktionsschalter handelt
- schaltet es aus (vom Countdown- oder Dauerbetrieb)

### Tracker
Bereitgestellt durch Treppenhaus- und Multifunktionsschalter.

- `entries` (ro) Liste der vom Miniserver zurückgegebenen Einträge

### UpDownAnalog
Bereitgestellt durch virtuelle Eingabe (Auf-Ab-Tasten).

- `value` (rw) der aktuelle Wert der Eingabe
- `value-formatted` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des "Unit"-Formats aus Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an.

### Wertselektor
Wertauswahl.

- `Wert` (rw) aktueller Wert
- `min` (ro) aktueller Minimalwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert

### WindowMonitor
Bereitgestellt durch Stromzähler.

- `numOpen` (ro) Anzahl der geöffneten Fenster und Türen
- `numClosed` (ro) Anzahl der geschlossenen Fenster und Türen
- `numTilted` (ro) Anzahl der geneigten Fenster und Türen
- `numOffline` (ro) Anzahl der nicht verfügbaren Fenster und Türen
- `numLocked` (ro) Anzahl der verriegelten Fenster und Türen
- `numUnlocked` (ro) Anzahl der unverschlossenen Fenster und Türen

Die Summe der Werte aus all diesen Zuständen entspricht der Anzahl der überwachten Fenster und Türen. Fenster/Türen mit zwei Zuständen werden immer dem „schlechtesten“ Zustand zugeordnet.

Für jedes überwachte Fenster/jede überwachte Tür gibt es ein Gerät mit einer Index-ID und einem entsprechenden Namen. Diese Geräte haben folgende Zustände:

- `geschlossen` (ro) Das Fenster / die Tür ist geschlossen
- `gekippt` (ro) Das Fenster / die Tür ist gekippt
- `open` (ro) Das Fenster / die Tür ist offen
- `verriegelt` (ro) Das Fenster/die Tür ist verschlossen.
- `unlocked` (ro) Das Fenster / die Tür ist unverschlossen

## Wetterserver
Die Wetterserverinformationen werden als Gerät mit mehreren Kanälen bereitgestellt.

Das Gerät heißt `WeatherServer`.

Es enthält:

- der Kanal „Aktuell“ mit den aktuellen Wetterwerten
- ein Kanal für jede Vorhersagestunde mit der Bezeichnung „StundeXX“, wobei „XX“ die Anzahl der Stunden ab jetzt ist.

Jeder Kanal enthält die folgenden Zustände:

- `barometricPressure`: numerischer Wert des Luftdrucks
- `barometricPressure-formatted`: formatierter barometrischer Druckwert mit Einheit
- `dewPoint`: numerischer Taupunktwert
- `dewPoint-formatted`: formatierter Taupunktwert mit Einheit
- `perceivedTemperature`: numerischer Wert der wahrgenommenen Temperatur
- `perceivedTemperature-formatted`: formatierter Wert der wahrgenommenen Temperatur mit Einheit
- `Niederschlag`: numerischer Niederschlagswert
- `precipitation-formatted`: formatierter Niederschlagswert mit Einheit
- `relativeHumidity`: numerischer Wert der relativen Luftfeuchtigkeit
- `relativeHumidity-formatted`: formatierter Wert der relativen Luftfeuchtigkeit mit Einheit
- `solarRadiation`: Wert der Sonneneinstrahlung
- `temperature`: numerischer Temperaturwert
- `temperature-formatted`: formatierter Temperaturwert mit Einheit
- `timestamp`: Zeitstempel der Daten als `value.time` (JavaScript-Zeit)
- `weatherType`: numerischer Aufzählungswert des Wettertyps
- `weatherType-text`: Textdarstellung des Wettertyps
- `windDirection`: Wert der Windrichtung
- `windSpeed`: Windgeschwindigkeitswert
- `windSpeed-formatted`: formatierter Windgeschwindigkeitswert mit Einheit

## Nicht unterstützte Steuerungstypen
Wenn Loxone neue Steuerungstypen einführt, werden diese von diesem Adapter meist nicht sofort unterstützt.

In diesem Fall steht vor dem Namen des Steuerelements „Unbekannt:“. Z. B. `Unknown: Wallbox`

Diese Steuerelemente enthalten alle vom Miniserver gemeldeten Zustände, jedoch sind es ausschließlich lesbare Zeichenketten.

Falls Sie eine bessere Unterstützung für einen neuen Steuerelementtyp benötigen, befolgen Sie bitte die Schritte im nächsten Abschnitt, um eine neue Funktion anzufordern.

**Sentry:** Nicht unterstützte Steuerelementtypen werden mithilfe von Sentry an die Entwickler gemeldet. So erhalten Sie möglicherweise neue Steuerelemente in der nächsten Version, ohne diese selbst anfordern zu müssen.

## Fehlerberichte und Funktionsanfragen
Bitte nutzen Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Falls Sie einen nicht unterstützten Steuerungstyp benötigen, geben Sie bitte den Namen an, wie er im Fehlerprotokoll von ioBroker aufgeführt ist, sowie den gesamten Rohinhalt des Geräts im ioBroker-Objektbaum:

Beispiel einer Protokolldatei für "LightController":

![Protokoll der fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

Nativer Wert von ioBroker > Objekte

![Details zur fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

## Rechtliches
Dieses Projekt steht in keiner direkten oder indirekten Verbindung zur Firma Loxone Electronics GmbH.

Loxone und Miniserver sind eingetragene Warenzeichen der Loxone Electronics GmbH.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.0 (2025-12-11)

- (raintonr) Set correct min/max target on IRCv2 when in override (#528)
- (raintonr) Fix compatibility with js-controller 7.1 (fixes #730)
- (UncleSamSwiss) Recreate project structure using latest create-adapter
- (mpaulustsx) Basic AudioZoneV2 implementation (#430)

### 3.0.1 (2023-03-30)

- (raintonr) Added info statistics (#364)
- (raintonr) Added missing states from IRCv2 (#365)
- (raintonr) Added basic functionality for Remote (Media Controller)
- (raintonr) Fixed ack overwrites of fast changing states (#399) and general ack improvements
- (raintonr) Fix crash when state changes occur during Miniserver reboot or otherwise unavailable (#298)
- (raintonr) Release script and other dependency updates

### 3.0.0 (2021-12-29)

- (tdesmet) Changed to lxcommunicator (fixes #210)
- (UncleSamSwiss) Updated all dependencies

### 2.2.3 (2021-07-06)

- (UncleSamSwiss) Reduced number of Sentry reports for unsupported controls.

### 2.2.2 (2021-06-23)

- (UncleSamSwiss) Explicitly setting adapter tier to 2.
- (UncleSamSwiss) Added support for Daytimer (IOBROKER-LOXONE-1Z)
- (UncleSamSwiss) Added support for Radio (IOBROKER-LOXONE-21)
- (UncleSamSwiss) Added support for Fronius (IOBROKER-LOXONE-1Y)
- (UncleSamSwiss) Added support for IRCDaytimer (IOBROKER-LOXONE-27)
- (UncleSamSwiss) Added support for Hourcounter (IOBROKER-LOXONE-23)
- (UncleSamSwiss) Added support for InfoOnlyText (IOBROKER-LOXONE-29)
- (UncleSamSwiss) Fixed issues with Lumitech color pickers (#150)

### 2.2.1 (2021-05-18)

- (UncleSamSwiss) Fixed typo causing "Cannot read property 'off' of undefined" (IOBROKER-LOXONE-2R, #72)
- (UncleSamSwiss) Improved Sentry reporting for structure file

### 2.2.0 (2021-05-17)

- (UncleSamSwiss) Unknown/unsupported controls are now shown with their states as read-only strings
- (raintonr) Fixes for auto-position based on percentage (#76)
- (raintonr) Added support for IRoomControllerV2 (#22)
- (UncleSamSwiss) Added experimental support for EIBDimmer (#15)
- (UncleSamSwiss) Added support for ValueSelector (#36)
- (UncleSamSwiss) Added support for TextState (#73)
- (UncleSamSwiss) Added support for UpDownAnalog (#57)
- (UncleSamSwiss) Fixed some "State has wrong type" warnings (#99, #128)
- (UncleSamSwiss) Added support for Lumitech color picker (#44)
- (UncleSamSwiss) Weather server data can now be filtered (#131)
- (UncleSamSwiss) Added support for PresenceDetector (IOBROKER-LOXONE-1R)
- (UncleSamSwiss) Added support for AAL Smart Alarm (IOBROKER-LOXONE-1X)
- (UncleSamSwiss) Added support for AAL Emergency Button (IOBROKER-LOXONE-1W)
- (UncleSamSwiss) Added support for Paketsafe (IOBROKER-LOXONE-1P)

### 2.1.0 (2020-12-21)

- (raintonr) Fixed: activeMoods can get stuck/not sync properly; all events is now handled with a queue (#58, #61, #62)
- (raintonr) Added open/close buttons to Garage/Gate Control (#59, #60)
- (pinkit) Added support for virtual text inputs (#48)
- (UncleSamSwiss) Updated to the latest adapter template
- (UncleSamSwiss) Changed log level of "Currently unsupported control type" message to "info" (#65)

### 2.0.2 (2020-10-26)

- (UncleSamSwiss) Fixed color picker updates (#52)
- (UncleSamSwiss) TimedSwitch to have `on`/`off` instead of `active` (#53)
- (UncleSamSwiss) Cleaning illegal characters for room and function names (#54)

### 2.0.1 (2020-09-24)

- (UncleSamSwiss) Fixed percentage states always showing 0% (#49)
- (UncleSamSwiss) Fixed analog virtual inputs wouldn't set the value 0 from ioBroker (#47)
- (UncleSamSwiss) Added translations to package information.

### 2.0.0

- **BREAKING:** Since the password is now encrypted, you will need to enter the password again after an update to this version!
- (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language

### 1.1.0

- (UncleSamSwiss) Added support for Miniserver Gen 2
- (sstroot) RGB for LightControllerV2
- (Apollon77) Updated CI Testing

### 1.0.0

- (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
- (alladdin) Fixed connection issues with Loxone Miniserver 10
- (UncleSamSwiss) Changed all write-only "switch"es to "button"s
- (UncleSamSwiss) Added support for AlarmClock control
- (Apollon77) Updated CI Testing

### 0.4.0

- (UncleSamSwiss) Improved support for Loxone Config 9
- (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0

- (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1

- (UncleSamSwiss) Added support for Slider control

### 0.2.0

- (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1

- (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0

- (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3

- (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2

- (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1

- (UncleSamSwiss) Initial version

## License

Copyright 2025 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.