---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.loxone/README.md
title: ioBroker.loxone
hash: ga2LonJ6jCCokaDpU/+QVaEICpDsRsKFjGw8A6lfQ2w=
---
![Logo](../../../en/adapterref/iobroker.loxone/admin/loxone.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.loxone.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.loxone.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/loxone-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/loxone-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/UncleSamSwiss/iobroker.loxone.svg)
![NPM](https://nodei.co/npm/iobroker.loxone.png?downloads=true)

# IoBroker.loxone
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/loxone/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und Freigeben](https://github.com/UncleSamSwiss/ioBroker.loxone/workflows/Test%20and%20Release/badge.svg)

## Loxone-Adapter für ioBroker
**_Dieser Adapter erfordert mindestens nodejs 18.x!_**

Holt alle im Loxone Miniserver (und Loxone Miniserver Go) verfügbaren Informationen und stellt Änderungen in Echtzeit bereit.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse oder den Hostnamen und den HTTP-Port (standardmäßig 80) Ihres Loxone Miniservers ein.
3. Legen Sie im Loxone Miniserver einen neuen Benutzer an (mittels der Anwendung Loxone Config), dem Sie lediglich Lese- und Schreibrechte auf alle benötigten Variablen erteilen.
4. Geben Sie den Namen dieses Benutzers und sein Passwort in den Konfigurationsdialog ein
5. Speichern Sie die Konfiguration
6. Starten Sie den Adapter

## Aufbau
### Miniserver-Hostname/IP
Dies ist die IP-Adresse oder der Hostname Ihres Loxone Miniservers oder Miniserver Go.

### Miniserver-Port
Dies ist der HTTP-Port Ihres Loxone Miniservers.

Standardmäßig ist der Miniserver so konfiguriert, dass er auf Port 80 lauscht, aber Sie haben dies möglicherweise geändert.

### Miniserver-Benutzername
Geben Sie einen gültigen Benutzernamen ein, um auf den Loxone Miniserver zuzugreifen.

Aus Sicherheitsgründen wird dringend empfohlen, einen anderen Benutzer als „admin“ zu verwenden.

Der Benutzer benötigt nur Lesezugriff auf die Variablen, die er von ioBroker verwenden möchte.

### Miniserver-Passwort
Geben Sie das Passwort für den angegebenen Benutzernamen ein (siehe oben).

### Namen synchronisieren
Dadurch werden die Namen in ioBroker aktualisiert, wenn sie sich in der Loxone-Konfiguration ändern.
Wenn dies deaktiviert ist, werden die Namen nur beim ersten Erkennen einer Steuerung synchronisiert.

### Räume synchronisieren
Dadurch wird die Aufzählung enum.rooms mit allen vom Loxone Miniserver bereitgestellten Räumen gefüllt und alle Steuerelemente verknüpft.

### Funktionen synchronisieren
Dadurch wird die Aufzählung enum.functions mit allen vom Loxone Miniserver bereitgestellten Kategorien gefüllt und alle Steuerelemente verknüpft.

### Wetterserver
Wählen Sie aus, welche Wetterdaten Sie synchronisieren möchten:

- "Keine Wetterdaten synchronisieren" synchronisiert nichts, was mit dem Wetterserver zu tun hat
- „Nur aktuelles Wetter synchronisieren“ synchronisiert die Daten unter „Aktuell“
- „24 Stunden Wettervorhersage synchronisieren“ synchronisiert das aktuelle Wetter und die 24 Stunden Wettervorhersage
- „Gesamte Wettervorhersage synchronisieren“ synchronisiert das aktuelle Wetter und die gesamte Wettervorhersage (96 Stunden)

## Zustände
Der Adapter verbindet sich automatisch mit dem konfigurierten Loxone Miniserver und erstellt für jeden gefundenen Steuerungszustand Status.

Die IDs der Staaten sind wie folgt formatiert: `loxone.<instance>.<control>.<state>`

- `<Instanz>` ist der Instanzindex des ioBroker-Adapters (normalerweise „0“)
- `<control>` ist die UUID des Steuerelements
- „<state>“ ist der Status innerhalb des Steuerelements (weitere Informationen finden Sie unter [Unterstützte Steuerelementtypen](#supported-control-types)).

Der bei der Konfiguration eines Steuerelements in Loxone Config angegebene Name wird nur als Anzeigename in ioBroker verwendet.
Der Grund hierfür ist, dass ein Benutzer für mehrere Steuerelemente denselben Namen wählen kann.

Weitere Informationen zu Steuerelementen und deren Zuständen finden Sie auch in der Loxone API (insbesondere in der Strukturdatei): https://www.loxone.com/de/kb/api/

## Sichtbarkeit kontrollieren
Standardmäßig verbirgt der Loxone Miniserver viele Steuerelemente (und damit deren Zustände) vor der Weboberfläche.

Das heißt, sie sind auch vor diesem ioBroker-Adapter verborgen.

### Verwendung in der Benutzeroberfläche
Um sicherzustellen, dass alle Ihre Status ordnungsgemäß an ioBroker gemeldet werden, überprüfen Sie bitte, ob im Abschnitt „Benutzeroberfläche“ die Option „Verwenden“ aktiviert ist:

![Verwendung in Benutzeroberflächeneinstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

### Diagnoseeingänge anzeigen
Um Diagnoseeingaben anzuzeigen (z. B. den Batteriestatus von Air-Geräten), überprüfen Sie bitte, ob beim Gerät die Option „Diagnoseeingaben anzeigen“ aktiviert ist:

![Einstellungen für Diagnoseeingänge anzeigen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-display-diagnostics.png)

## Globale Staaten
Die folgenden globalen Zustände werden derzeit von diesem Adapter bereitgestellt:

- `operatingMode`: die aktuelle Betriebsmodusnummer des Loxone Miniservers
- `operatingMode-text`: der aktuelle Betriebsmodus des Loxone Miniservers als Text
- `sunrise`: die Anzahl der Minuten nach Mitternacht, wenn die Sonne heute aufgeht
- „Sonnenuntergang“: die Anzahl der Minuten nach Mitternacht, bis zu denen die Sonne heute untergeht
- „Benachrichtigungen“: die Anzahl der Benachrichtigungen
- `modifications`: die Anzahl der Änderungen
- alle anderen globalen Zustände werden einfach als Texte gemeldet

## Unterstützte Steuerungstypen
Die folgenden Steuerungstypen werden derzeit von diesem Adapter unterstützt.

Hinter dem Namen des Staates ist die Art des Staates zu erkennen:

- `(rw)`: lesbar und beschreibbar: dieser Status kann von ioBroker aus geändert werden
- `(ro)`: schreibgeschützt: Dieser Status kann von ioBroker aus nicht geändert werden.
- `(wo)`: schreibgeschützt: Der Wert dieses Status wird von diesem Adapter nicht gemeldet, kann jedoch geändert werden, wodurch eine Aktion auf dem Loxone Miniserver ausgelöst wird.

### AalSmartAlarm
Wird durch die AAL Smart Alarm-Steuerung bereitgestellt.

- `alarmLevel` (ro) die ID der aktuellen Alarmstufe
- 0 = Kein Alarm
- 1 = Sofortiger Alarm
- 2 = Verzögerter Alarm
- „alarmCause“ (ro) Eine Zeichenfolge, die den letzten Grund für einen Alarm darstellt
- `isLocked` (ro) Reset aktiv, Eingaben werden ignoriert und somit keine Alarme ausgeführt
- `isLeaveActive` (ro) Leave-Eingang ist gesetzt, es werden keine Alarme ausgeführt
- `disableEndTime` (ro) Endzeit für die Deaktivierung des Steuerelements
- `confirm` (wo) Bestätigen des ausstehenden Alarms
- `disable` (wo) Deaktiviert die Steuerung für eine bestimmte Zeit, es werden keine Alarme ausgeführt. Wenn Sie den Wert auf 0 setzen, wird der Smart Alarm wieder aktiviert.
- `startDrill` (wo) Testalarm ausführen

### AalNotfall
Wird durch die AAL Smart Emergency Button-Steuerung bereitgestellt.

- `status` (ro) die ID des aktuellen Status
- 0 = läuft, Normalbetrieb, wartet auf Drücken der Not-Aus-Taste
- 1 = Alarm ausgelöst
- 2 = Reset-Eingang in Konfiguration aktiviert, Steuerung ist heruntergefahren
- 3 = App hat die Steuerung vorübergehend deaktiviert
- `disableEndTime` (ro) Endzeit für die Deaktivierung des Steuerelements
- `resetActive` (ro) Textstatus mit dem aktiven Reset-Eingang (wenn die Steuerung im Reset ist)
- „trigger“ (wo) löst einen Alarm von der App aus aus
- `quit` (wo) einen aktiven Alarm beenden
- `disable` (wo) deaktiviert die Steuerung für die angegebene Zeit in Sekunden. Auf 0 setzen, um die Steuerung erneut zu starten, wenn sie deaktiviert ist

### Alarm
Wird bereitgestellt durch die Einbruchmeldezentrale.

- „armed“ (rw) Boolescher Status (true / false) des Alarms; wenn Sie „true“ in diesen Wert schreiben, wird der Alarm sofort eingeschaltet (ohne die vordefinierte Verzögerung)
- `nextLevel` (ro) die ID der nächsten Alarmstufe
- 1 = Lautlos
- 2 = Akustik
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `nextLevelDelay` (ro) die Verzögerung des nächsten Levels in Sekunden
- `nextLevelDelayTotal` (ro) die Gesamtverzögerung der nächsten Ebene in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
- 1 = Lautlos
- 2 = Akustik
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `startTime` (ro) der Zeitstempel, wann der Alarm gestartet wurde
- `armedDelay` (ro) die Verzögerung der Scharfschaltung der Alarmanlage
- `armedDelayTotal` (ro) die Gesamtverzögerung der Scharfschaltung der Alarmanlage
- `sensors` (ro) die Liste der Sensoren
- `disabledMove` (rw) die Bewegung ist deaktiviert (true) oder nicht (false)
- `delayedOn` (wo): Durch das Schreiben eines beliebigen Wertes in diesen Status wird der Alarm mit der konfigurierten Verzögerung aktiviert.
- `quit` (wo) Das Schreiben eines beliebigen Wertes in diesen Status bestätigt den Alarm

### Zentralalarm
Wird durch eine zentrale Einbruchmeldeanlage gewährleistet.

- „armed“ (rw) Boolescher Status (true / false) des Alarms; wenn Sie „true“ in diesen Wert schreiben, wird der Alarm sofort eingeschaltet (ohne die vordefinierte Verzögerung)
- `delayedOn` (wo): Durch das Schreiben eines beliebigen Wertes in diesen Status wird der Alarm mit der konfigurierten Verzögerung aktiviert.
- `quit` (wo) Das Schreiben eines beliebigen Wertes in diesen Status bestätigt den Alarm

### Wecker
Wird durch Weckersteuerung bereitgestellt.

- `isEnabled` (rw) Boolescher Status (true / false) des Weckers
- `isAlarmActive` (ro) boolean (true / false), ob der Alarm gerade klingelt
- `confirmationNeeded` (ro) boolean (true / false), ob der Benutzer den Alarm bestätigen muss
- `ringingTime` (ro) Countdown in Sekunden, wie lange der Wecker klingelt, bis er wieder in die Schlummerfunktion wechselt
- `ringDuration` (rw) Dauer in Sekunden, in der der Wecker klingelt
- `prepareDuration` (rw) Vorbereitungszeit in Sekunden
- `snoozeTime` (ro) Sekunden bis zum Ende des Schlummerns
- `snoozeDuration` (rw) Dauer des Schlummerns in Sekunden
- `snooze` (wo) das Schreiben eines beliebigen Wertes in diesen Status schaltet den aktuellen Alarm aus
- `dismiss` (wo): Das Schreiben eines beliebigen Wertes in diesen Status verwirft den aktuellen Alarm

### AudioZone
Bereitgestellt von Music Server Zone.

- `serverState` (ro) Status des Musikservers:
- -3 = unbekannte/ungültige Zone
- -2 = nicht erreichbar
- -1 = unbekannt
- 0 = offline
- 1 = Initialisierung (Booten, Versuch, es zu erreichen)
- 2 = online
- „playState“ (rw) der Wiedergabestatus:
- -1 = unbekannt (dieser Wert kann nicht gesetzt werden)
- 0 = gestoppt (das Setzen dieses Wertes pausiert die Wiedergabe)
- 1 = pausiert (das Setzen dieses Wertes pausiert die Wiedergabe)
- 2 = Wiedergabe (durch Festlegen dieses Wertes wird die Wiedergabe gestartet/fortgesetzt)
- `clientState` (ro) Status des Clients:
- 0 = offline
- 1 = Initialisierung (Booten, Versuch, es zu erreichen)
- 2 = online
- „power“ (rw) ob die Client-Stromversorgung aktiv ist oder nicht
- `volume` (rw) aktuelle Lautstärke
- `maxVolume` (ro) Zonen können eine maximale Lautstärke zugewiesen werden
- „shuffle“ (rw), ob die zufällige Wiedergabeliste aktiviert ist oder nicht
- `sourceList` (ro) Liste mit allen Zonenfavoriten
- „repeat“ (rw) Wiederholungsmodus:
- -1 = unbekannt
- 0 = aus
- 1 = alles wiederholen
- 2 = -nicht verwendet-
- 3 = aktuelles Element wiederholen
- `songName` (ro) Songname
- „Dauer“ (ro) wie lang der gesamte Track ist, -1 wenn nicht bekannt (Stream)
- „progress“ (rw) aktuelle Position im Track
- `album` (ro) Albumname
- `artist` (ro) Künstlername
- `station` (ro) Stationsname
- `genre` (ro) Genre-Name
- „Cover“ (ro) URL des Song-/Album-Coverbilds
- „source“ (rw) aktuell ausgewählte Quellenkennung (siehe „sourceList“ oben)
- `prev` (wo) Das Schreiben eines beliebigen Wertes in diesen Status wechselt zum vorherigen Titel
- „next“ (wo): Das Schreiben eines beliebigen Wertes in diesen Status führt zum nächsten Track.

### Zentrales Audio
Wird vom zentralen Musikserver bereitgestellt.

- „control“ (wo) legt den Wiedergabestatus aller Player fest („true“ = Wiedergabe, „false“ = Pause)

### Farbwähler
Dieses Gerät kommt nur in einem LightController vor.

- `red` (rw) Rotwert des Farbwählers
- `green` (rw) Grünwert des Farbwählers
- `blue` (rw) Blauwert des Farbwählers

Das Setzen eines oder mehrerer der oben genannten Zustände von ioBroker aus sendet erst nach ca. 100 ms einen Befehl an den Miniserver.
Dadurch soll verhindert werden, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Farbwähler V2
Dieses Gerät erscheint nur innerhalb eines Light Controllers V2 in der Loxone-Softwareversion 9 und höher.

- `red` (rw) Rotwert des Farbwählers
- `green` (rw) Grünwert des Farbwählers
- `blue` (rw) Blauwert des Farbwählers

Das Setzen eines oder mehrerer der oben genannten Zustände von ioBroker aus sendet erst nach ca. 100 ms einen Befehl an den Miniserver.
Dadurch soll verhindert werden, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Tagestimer / IRCTagestimer
Wird durch Timer/Zeitplan bereitgestellt.

- `mode` (ro) aktueller Betriebsmodus des Tagestimers
- `mode-text` (ro) aktueller Betriebsmodusname des Tagestimers
- `override` (ro) die verbleibende Zeit des Timers
- `value` (ro) aktueller Wert, `true` oder `false` für digital und ein Wert für analog
- `value-formatted` (ro) aktuell formatierter Wert als Text
- `needsActivation` (ro) nur verfügbar, wenn das Steuerelement aktiviert werden muss
- `resetActive` (ro) bleibt aktiv, solange der Reset-Eingang des Tagestimers aktiv ist
- „pulse“ (wo) aktiviert den neuen Wert, wenn ein Eintrag aktiviert werden muss

### Dimmer
Wird durch Dimmer bereitgestellt.

- `position` (rw) aktuelle Position für den Dimmer
- `min` (ro) aktueller Minimalwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert
- `on` (wo) das Schreiben eines beliebigen Wertes in diesen Status setzt den Dimmer auf die letzte bekannte Position
- `off` (wo) das Schreiben eines beliebigen Wertes in diesen Status deaktiviert den Dimmer, setzt die Position auf 0, merkt sich aber die letzte Position

### EIBDimmer
Wird durch EIB/KNX-Dimmer bereitgestellt.

- `position` (rw) aktuelle Position für den Dimmer
- `on` (wo) das Schreiben eines beliebigen Wertes in diesen Status setzt den Dimmer auf die letzte bekannte Position
- `off` (wo) das Schreiben eines beliebigen Wertes in diesen Status deaktiviert den Dimmer, setzt die Position auf 0, merkt sich aber die letzte Position

### Fronius
Zur Verfügung gestellt vom Energiemonitor.

- `prodCurr` (ro) aktuelle Produktionsleistung
- `prodCurrDay` (ro) Energieproduktion für den gesamten aktuellen Tag
- `prodCurrMonth` (ro) Energieproduktion im gesamten aktuellen Monat
- `prodCurrYear` (ro) Energieproduktion im gesamten laufenden Jahr
- `prodTotal` (ro) Energieproduktion seit der Gründung
- `consCurr` (ro) aktuelle Verbrauchsleistung
- `consCurrDay` (ro) Energie, die während des aktuellen Tages verbraucht wurde
- `consTotal` (ro) verbrauchte Energie seit der Einrichtung
- `deliveryDay` (ro) unbekannt
- `earningsDay` (ro) wie viel Geld wurde im Laufe der Zeit verdient, indem entweder der produzierte Strom selbst verbraucht wurde, anstatt ihn aus dem Netz zu beziehen, oder indem nicht genutzter produzierter Strom in das Netz eingespeist wurde
- „earningsMonth“ (ro) wie viel Geld wurde im aktuellen Monat verdient
- „earningsYear“ (ro) wie viel Geld wurde im laufenden Jahr verdient
- `earningsTotal` (ro) wie viel Geld wurde seit der Gründung verdient
- `gridCurr` (ro) aktueller Netzverbrauch/Stromlieferung. Wenn negativ, wird Strom ins Netz geliefert.
- `batteryCurr` (ro) aktuelle Lade-/Verbrauchsleistung der Batterie. Wenn negativ, wird die Batterie geladen.
- „stateOfCharge“ (ro) stellt den Ladezustand der Batterie dar. 100 = vollständig geladen.
- `co2Factor` (ro) Wie viel CO2 wird zur Herstellung einer kWh benötigt, wird zur Berechnung der CO2-Einsparungen verwendet
- `online` (ro) true: online, false: offline

### Tor
Wird durch Torsteuerungen bereitgestellt.

- `position` (ro) die Position von 1 = oben bis 0 = unten
- „active“ (rw) aktuelle Richtung der Torbewegung
- -1 = schließen
- 0 = keine Bewegung
- 1 = offen
- `preventOpen` (ro): ob das Öffnen der Tür verhindert wird
- `preventClose` (ro) ob das Schließen der Tür verhindert wird

### Zentrales Tor
Wird durch eine zentrale Torsteuerung gewährleistet.

- `open` (wo) öffnet alle Tore
- `close` (wo) schließt alle Tore
- `stop` (wo) stoppt alle Tormotoren

### Stundenzähler
Zur Verfügung gestellt von

- „total“ (ro) Gesamtzahl der Sekunden, die der Zähler bisher aktiv war
- „verbleibend“ (ro): wie viele Sekunden verbleiben, bis die nächste Wartung erforderlich ist
- `lastActivation` (ro) der Zeitstempel, wann der Zähler das letzte Mal aktiviert wurde
- `overdue` (ro) `false` wenn nicht überfällig, andernfalls ist eine Wartung erforderlich
- `maintenanceInterval` (ro) Sekunden bis zur nächsten Wartung
- „active“ (ro), ob der Zähler derzeit aktiv ist oder nicht
- `overdueSince` (ro) Sekunden seit Überschreitung des Wartungsintervalls
- `reset` (wo) bewirkt ein Zurücksetzen der folgenden Werte
- verbleibendes Wartungsintervall
- überfällig bis 0
- überfällig seit bis 0
- `resetAll` (wo) wie `reset`, setzt aber auch
- insgesamt 0
- lastActivation auf 0

### InfoOnlyAnalog
Dafür sorgen virtuelle Zustände sowie der Loxone Touch-Schalter.

- `value` (ro) der Statuswert (Nummer) der Steuerung
- `value-formatted` (ro) sofern konfiguriert, der formatierte Wert des Status (unter Verwendung des „Unit“-Formats von Loxone Config)

### InfoOnlyDigital
Dafür sorgen virtuelle Zustände sowie der Loxone Touch-Schalter.

- `active` (ro) Boolescher Status (true / false) des Steuerelements
- `active-text` (ro) falls konfiguriert, das Textäquivalent des Status
- `active-image` (ro) wenn konfiguriert, das Bildäquivalent des Status
- `active-color` (ro) falls konfiguriert, das Farbäquivalent des Status

![InfoOnlyDigital-Einstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### InfoOnlyText
Wird durch virtuelle Textzustände bereitgestellt.

- `text` (ro) der Statuswert des Steuerelements
- `text-formatted` (ro) falls konfiguriert, der formatierte Wert des Status

### Gegensprechanlage
Wird durch Türsteuerungen bereitgestellt.

- `bell` (ro) ob die Glocke läutet
- `lastBellEvents` (ro) Array mit den Zeitstempeln für jede Klingelaktivität, die nicht beantwortet wurde
- `version` (ro) Nur Loxone Sprechanlagen - Text der die aktuell installierte Firmware enthält

Versionen

- `answer` (wo): Das Schreiben eines beliebigen Wertes in diesen Status deaktiviert die Klingel

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Intelligenter Raumcontroller V2
Wird seit Miniserver 10.0 durch den intelligenten Raumcontroller V2 bereitgestellt.

TODO: Dokumentation fehlt derzeit

### Jalousie
Zur Verfügung stehen verschiedene Jalousienarten (automatisch und manuell).

- `up` (rw) ob Jalousie sich nach oben bewegt
- `down` (rw) ob die Jalousie sich nach unten bewegt
- `position` (ro) Position der Jalousie, eine Zahl von 0 bis 1
- Jalousie obere Position = 0
- Jalousie untere Position = 1
- `shadePosition` (ro) Beschattungsposition der Jalousie, eine Zahl von 0 bis 1
- Jalousien sind nicht beschattet = 0
- Jalousien sind abgedunkelt = 1
- `safetyActive` (ro) wird nur von denen mit Autopilot verwendet, dies stellt die Sicherheitsabschaltung dar
- `autoAllowed` (ro) wird nur von Benutzern mit Autopilot verwendet
- `autoActive` (rw) wird nur von Benutzern mit Autopilot verwendet
- `locked` (ro) nur bei denen mit Autopilot, dies entspricht dem Ausgang QI in Loxone Config
- „infoText“ (ro) informiert beispielsweise darüber, was den Sperrzustand verursacht hat oder was dazu geführt hat, dass die Sicherung aktiviert wurde.
- `fullUp` (wo) das Schreiben eines beliebigen Wertes in diesen Status löst eine vollständige Aufwärtsbewegung aus
- `fullDown` (wo) das Schreiben eines beliebigen Wertes in diesen Status löst eine vollständige Abwärtsbewegung aus
- `shade` (wo): Das Schreiben eines beliebigen Wertes in diesen Status schattiert die Jalousie in die perfekte Position

### Zentraljalousie
Wird über die zentrale Jalousiesteuerung bereitgestellt.

- `autoActive` (rw) wird nur von Benutzern mit Autopilot verwendet
- `fullUp` (wo) das Schreiben eines beliebigen Wertes in diesen Status löst eine vollständige Aufwärtsbewegung aus
- `fullDown` (wo) das Schreiben eines beliebigen Wertes in diesen Status löst eine vollständige Abwärtsbewegung aus
- `shade` (wo) schreibt einen beliebigen Wert in diesen Status, um alle Jalousien in die perfekte Position zu bringen

### Lichtsteuerung
Wird von (Hotel-)Lichtsteuerungen bereitgestellt.
Szenen können nur in den Loxone-Anwendungen geändert, aber im ioBroker ausgewählt werden.

- `activeScene` (rw) aktuell aktive Szenennummer
- 0: alles aus
- 1..8: benutzerdefinierte Szene (Definition/Lernen von Szenen muss mit den Loxone-Tools erfolgen)
- 9: alle an
- `sceneList` (ro) Liste aller Szenen
- `plus` (wo) wechselt zur nächsten Szene
- `minus` (wo) Änderungen an der vorherigen Szene

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Licht-Controller V2
Wird von (Hotel-)Lichtsteuerungen in der Loxone Software ab Version 9 bereitgestellt.
Stimmungen können nur in den Loxone-Anwendungen geändert, im ioBroker jedoch ausgewählt und kombiniert werden.

- `moodList` (ro) Liste aller konfigurierten Stimmungsnamen
- `activeMoods` (rw) aktuell aktive Liste der Stimmungsnamen
- `favoriteMoods` (ro) Liste der beliebtesten Stimmungsnamen
- `additionalMoods` (ro) Liste der nicht bevorzugten Stimmungsnamen
- `plus` (wo) wechselt zur nächsten Stimmung
- `minus` (wo) wechselt zur vorherigen Stimmung

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im entsprechenden Kapitel.

### Zentrale Lichtsteuerung
Wird durch eine zentrale Lichtsteuerung bereitgestellt.

- „control“ (wo) schaltet alle Lichter ein oder aus

### Briefkasten
Bereitgestellt von Paketsafe Air/Tree.

- `notificationsDisabledInput` (ro) Status des deaktivierten Benachrichtigungseingangs
- `packetReceived` (ro) Gibt an, ob ein Paket empfangen wurde
- `mailReceived` (ro) Gibt an, ob eine E-Mail empfangen wurde
- `disableEndTime` (ro) Zeitstempel, bis die Benachrichtigungen deaktiviert werden
- `confirmPacket` (wo) Empfang eines Pakets bestätigen
- `confirmMail` (wo) Empfang der Mail bestätigen
- `disableNotifications` (wo) Deaktiviert die Benachrichtigungen für x Sekunden; 0 Sekunden zum Abbrechen des Timers

### Meter
Wird durch Verbrauchszähler bereitgestellt.

- `actual` (ro) der tatsächliche Wert (Zahl)
- `actual-formatted` (ro) sofern konfiguriert, der formatierte Istwert des Zustands (unter Verwendung des „Unit“-Formats aus der Loxone Config)
- `total` (ro) der Gesamtwert (Zahl)
- `total-formatted` (ro) sofern konfiguriert, der formatierte Gesamtwert des Status (unter Verwendung des „Unit“-Formats von Loxone Config)
- `reset` (wo) Das Schreiben eines beliebigen Wertes in diesen Status setzt den Gesamtwert zurück

### Anwesenheitsmelder
Wird durch einen Anwesenheitsmelder bereitgestellt.

- `aktiver` (ro) Anwesenheitsstatus
- `locked` (ro) gesperrter Zustand
- `events` (ro) die Anzahl der Ereignisse
- `infoText` (ro) Grund warum der Präsenzmelder gesperrt ist

### Druckknopf
Wird durch virtuelle Tastereingänge bereitgestellt.

- `active` (rw) der aktuelle Zustand des Tasters
- `pulse` (wo): Das Schreiben eines beliebigen Wertes in diesen Status simuliert das Drücken der Taste nur für eine sehr kurze Zeit.

### Radio
Wird durch Optionsfelder (8x und 16x) bereitgestellt.

- `activeOutput` (rw) ID des aktuell aktiven Ausgangs oder 0 wenn keiner aktiv ist ("Alle aus")

### Fernbedienung
Wird vom Mediencontroller bereitgestellt.
Nur grundlegende Lesefunktion.

- `active` (ro) true wenn der Miniserver die Befehle zum Umschalten der Modi oder zum Einschalten sendet
- `mode` (ro) die Taste für den aktuellen Modus oder 0, wenn kein Modus ausgewählt ist („Alles aus“)“
- `timeout` (ro) das Timeout in Millisekunden

### Schieberegler
Wird durch analoge virtuelle Eingänge bereitgestellt.

- `value` (rw) der aktuelle Wert des Schiebereglers
- `value-formatted` (ro) sofern konfiguriert, der formatierte Wert des Status (unter Verwendung des „Unit“-Formats von Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an

### Rauchmelder
Wird durch Verbrauchszähler bereitgestellt.

- `nextLevel` (ro) die ID der nächsten Alarmstufe
- 1 = Lautlos
- 2 = Akustik
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `nextLevelDelay` (ro) Verzögerung der nächsten Ebene in Sekunden
- `nextLevelDelayTotal` (ro) Gesamtverzögerung der nächsten Ebene in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
- 1 = Lautlos
- 2 = Akustik
- 3 = Optisch
- 4 = Intern
- 5 = Extern
- 6 = Fernbedienung
- `sensors` (ro) die Liste der Sensoren
- `acousticAlarm` (ro) Zustand des akustischen Alarms false für nicht aktiv und true für aktiv
- `testAlarm` (ro) ob Testalarm aktiv ist
- „alarmCause“ (ro) die Ursache des Alarms:
- 1 = nur Rauchmelder
- 2 = nur Wasser
- 3 = Rauch und Wasser
- 4 = nur Temperatur
- 5 = Feuer und Temperatur
- 6 = Temperatur und Wasser
- 7 = Feuer, Temperatur und Wasser
- `startTime` (ro) Zeitstempel, wann der Alarm gestartet wurde
- `timeServiceMode` (rw) Verzögerung bis der Servicemodus deaktiviert wird
- `mute` (wo) das Schreiben eines beliebigen Wertes in diesen Status schaltet die Sirene stumm
- `quit` (wo) Das Schreiben eines beliebigen Wertes in diesen Status bestätigt den Rauchalarm

### Schalten
Wird durch virtuelle Eingabeschalter bereitgestellt.

- „active“ (rw) der aktuelle Zustand des Schalters

### Textstatus
Zur Verfügung gestellt vom „Staat“.

- `textAndIcon` (ro) der aktuelle Wert des Status

### Zeitschalter
Wird durch Treppenhaus- und Multifunktionsschalter bereitgestellt.

- `deactivationDelayTotal` (ro) Sekunden, wie lange der Ausgang aktiv ist, wenn der Timer verwendet wird
- `deactivationDelay` (ro) Countdown bis der Ausgang deaktiviert wird
- 0 = der Ausgang ist ausgeschaltet
- -1 = der Ausgang ist dauerhaft eingeschaltet
- Andernfalls wird von DeactivationDelayTotal heruntergezählt
- `on` (wo) das Schreiben eines beliebigen Wertes in diesen Zustand aktiviert den Schalter dauerhaft ohne Deaktivierungsverzögerung
- `off` (wo) das Schreiben eines beliebigen Wertes in diesen Status deaktiviert den Schalter
- „pulse“ (wo) pulsiert den Schalter:
- Deaktivierungsverzögerung = 0
- Startet den Countdown von DeactivationDelayTotal bis 0
- wenn es sich um einen Treppenhausschalter handelt:
- Deaktivierungsverzögerung = -1
- Keine Wirkung, bleibt dauerhaft an.
- Deaktivierungsverzögerung > 0
- Startet den Countdown neu
- ob es sich um einen Multifunktionsschalter handelt
- schaltet es aus (vom Countdown oder permanent eingeschalteten Zustand)

### Tracker
Wird durch Treppenhaus- und Multifunktionsschalter bereitgestellt.

- „entries“ (ro) Liste der vom Miniserver zurückgegebenen Einträge

### AufwärtsAbwärtsAnalog
Wird durch virtuellen Eingang bereitgestellt (Auf-Ab-Tasten).

- `value` (rw) der aktuelle Wert der Eingabe
- `value-formatted` (ro) sofern konfiguriert, der formatierte Wert des Status (unter Verwendung des „Unit“-Formats von Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an

### Werteselektor
Werteauswahl.

- `value` (rw) aktueller Wert
- `min` (ro) aktueller Minimalwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert

### FensterMonitor
Wird durch Verbrauchszähler bereitgestellt.

- `numOpen` (ro) Anzahl der offenen Fenster und Türen
- `numClosed` (ro) Anzahl der geschlossenen Fenster und Türen
- `numTilted` (ro) Anzahl der gekippten Fenster und Türen
- `numOffline` (ro) Anzahl der Fenster und Türen, die nicht verfügbar sind
- `numLocked` (ro) Anzahl der verriegelten Fenster und Türen
- `numUnlocked` (ro) Anzahl der entriegelten Fenster und Türen

Die Summe der Werte aller dieser Zustände entspricht der Anzahl der überwachten Fenster und Türen. Die Fenster/Türen mit zwei Zuständen werden immer zum „schlechtesten“ Zustand gezählt.

Für jedes überwachte Fenster / jede überwachte Tür gibt es ein Gerät mit einem Index als ID und dem angegebenen Namen. Sie haben die folgenden Zustände:

- `closed` (ro) das Fenster / die Tür ist geschlossen
- `kippen` (ro) das Fenster / die Tür ist gekippt
- `open` (ro) das Fenster / die Tür ist offen
- `locked` (ro) das Fenster / die Tür ist verschlossen
- `unlocked` (ro) das Fenster / die Tür ist unverschlossen

## Wetterserver
Die Wetterserverinformationen werden als Gerät mit mehreren Kanälen bereitgestellt.
Das Gerät heißt `WeatherServer`.
Es enthält:

- der Kanal „Actual“ mit den aktuellen Wetterwerten
- ein Kanal für jede Prognosestunde mit der Bezeichnung „HourXX“, wobei „XX“ die Anzahl der Stunden ab jetzt ist

Jeder Kanal enthält die folgenden Zustände:

- `barometricPressure`: numerischer Luftdruckwert
- `barometricPressure-formatted`: formatierter Luftdruckwert mit Einheit
- `dewPoint`: numerischer Taupunktwert
- `dewPoint-formatted`: formatierter Taupunktwert mit Einheit
- `perceivedTemperature`: numerischer Wert der wahrgenommenen Temperatur
- `perceivedTemperature-formatted`: formatierter wahrgenommener Temperaturwert mit Einheit
- `precipitation`: numerischer Niederschlagswert
- `precipitation-formatted`: formatierter Niederschlagswert mit Einheit
- `relativeHumidity`: numerischer relativer Feuchtigkeitswert
- `relativeHumidity-formatted`: formatierter relativer Feuchtigkeitswert mit Einheit
- `solarRadiation`: Solarstrahlungswert
- „temperature“: numerischer Temperaturwert
- `temperature-formatted`: formatierter Temperaturwert mit Einheit
- `timestamp`: Zeitstempel der Daten als `value.time` (JavaScript-Zeit)
- „weatherType“: numerischer Aufzählungswert für den Wettertyp
- `weatherType-text`: Textdarstellung des Wettertyps
- `windDirection`: Windrichtungswert
- „windSpeed“: Windgeschwindigkeitswert
- `windSpeed-formatted`: formatierter Windgeschwindigkeitswert mit Einheit

## Nicht unterstützte Steuerelementtypen
Wenn Loxone neue Steuerungstypen hinzufügt, werden diese meistens nicht sofort von diesem Adapter unterstützt.

In diesem Fall steht vor dem Namen des Steuerelements „Unbekannt:“. Beispiel: `Unknown: Wallbox`

Diese Steuerelemente enthalten alle vom Miniserver gemeldeten Zustände, es handelt sich jedoch ausschließlich um schreibgeschützte Zeichenfolgen.

Wenn Sie bessere Unterstützung für einen neuen Steuerungstyp benötigen, befolgen Sie bitte die Schritte im nächsten Abschnitt, um eine neue Funktion anzufordern.

**Sentry:** Nicht unterstützte Steuerelementtypen werden den Entwicklern über Sentry gemeldet. Auf diese Weise erhalten Sie möglicherweise in der nächsten Version neue Steuerelemente, ohne diese selbst anfordern zu müssen.

## Fehlerberichte und Funktionsanfragen
Bitte verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie einen nicht unterstützten Steuerungstyp benötigen, geben Sie bitte den Namen so an, wie er im Fehlerprotokoll von ioBroker gemeldet wird, sowie den gesamten Rohinhalt des Geräts im ioBroker-Objektbaum:

Beispiel einer Protokolldatei für „LightController“:

![Protokoll der fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

Nativer Wert von ioBroker > Objekte

![Details zur fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

## Rechtliches
Dieses Projekt steht in keiner direkten oder indirekten Verbindung mit der Firma Loxone Electronics GmbH.

Loxone und Miniserver sind eingetragene Marken der Loxone Electronics GmbH.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (raintonr) Set correct min/max target on IRCv2 when in override (#528)

### 3.0.1 (2023-03-30)

-   (raintonr) Added info statistics (#364)
-   (raintonr) Added missing states from IRCv2 (#365)
-   (raintonr) Added basic functionality for Remote (Media Controller)
-   (raintonr) Fixed ack overwrites of fast changing states (#399) and general ack improvements
-   (raintonr) Fix crash when state changes occur during Miniserver reboot or otherwise unavailable (#298)
-   (raintonr) Release script and other dependency updates

### 3.0.0 (2021-12-29)

-   (tdesmet) Changed to lxcommunicator (fixes #210)
-   (UncleSamSwiss) Updated all dependencies

### 2.2.3 (2021-07-06)

-   (UncleSamSwiss) Reduced number of Sentry reports for unsupported controls.

### 2.2.2 (2021-06-23)

-   (UncleSamSwiss) Explicitly setting adapter tier to 2.
-   (UncleSamSwiss) Added support for Daytimer (IOBROKER-LOXONE-1Z)
-   (UncleSamSwiss) Added support for Radio (IOBROKER-LOXONE-21)
-   (UncleSamSwiss) Added support for Fronius (IOBROKER-LOXONE-1Y)
-   (UncleSamSwiss) Added support for IRCDaytimer (IOBROKER-LOXONE-27)
-   (UncleSamSwiss) Added support for Hourcounter (IOBROKER-LOXONE-23)
-   (UncleSamSwiss) Added support for InfoOnlyText (IOBROKER-LOXONE-29)
-   (UncleSamSwiss) Fixed issues with Lumitech color pickers (#150)

### 2.2.1 (2021-05-18)

-   (UncleSamSwiss) Fixed typo causing "Cannot read property 'off' of undefined" (IOBROKER-LOXONE-2R, #72)
-   (UncleSamSwiss) Improved Sentry reporting for structure file

### 2.2.0 (2021-05-17)

-   (UncleSamSwiss) Unknown/unsupported controls are now shown with their states as read-only strings
-   (raintonr) Fixes for auto-position based on percentage (#76)
-   (raintonr) Added support for IRoomControllerV2 (#22)
-   (UncleSamSwiss) Added experimental support for EIBDimmer (#15)
-   (UncleSamSwiss) Added support for ValueSelector (#36)
-   (UncleSamSwiss) Added support for TextState (#73)
-   (UncleSamSwiss) Added support for UpDownAnalog (#57)
-   (UncleSamSwiss) Fixed some "State has wrong type" warnings (#99, #128)
-   (UncleSamSwiss) Added support for Lumitech color picker (#44)
-   (UncleSamSwiss) Weather server data can now be filtered (#131)
-   (UncleSamSwiss) Added support for PresenceDetector (IOBROKER-LOXONE-1R)
-   (UncleSamSwiss) Added support for AAL Smart Alarm (IOBROKER-LOXONE-1X)
-   (UncleSamSwiss) Added support for AAL Emergency Button (IOBROKER-LOXONE-1W)
-   (UncleSamSwiss) Added support for Paketsafe (IOBROKER-LOXONE-1P)

### 2.1.0 (2020-12-21)

-   (raintonr) Fixed: activeMoods can get stuck/not sync properly; all events is now handled with a queue (#58, #61, #62)
-   (raintonr) Added open/close buttons to Garage/Gate Control (#59, #60)
-   (pinkit) Added support for virtual text inputs (#48)
-   (UncleSamSwiss) Updated to the latest adapter template
-   (UncleSamSwiss) Changed log level of "Currently unsupported control type" message to "info" (#65)

### 2.0.2 (2020-10-26)

-   (UncleSamSwiss) Fixed color picker updates (#52)
-   (UncleSamSwiss) TimedSwitch to have `on`/`off` instead of `active` (#53)
-   (UncleSamSwiss) Cleaning illegal characters for room and function names (#54)

### 2.0.1 (2020-09-24)

-   (UncleSamSwiss) Fixed percentage states always showing 0% (#49)
-   (UncleSamSwiss) Fixed analog virtual inputs wouldn't set the value 0 from ioBroker (#47)
-   (UncleSamSwiss) Added translations to package information.

### 2.0.0

-   **BREAKING:** Since the password is now encrypted, you will need to enter the password again after an update to this version!
-   (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language

### 1.1.0

-   (UncleSamSwiss) Added support for Miniserver Gen 2
-   (sstroot) RGB for LightControllerV2
-   (Apollon77) Updated CI Testing

### 1.0.0

-   (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
-   (alladdin) Fixed connection issues with Loxone Miniserver 10
-   (UncleSamSwiss) Changed all write-only "switch"es to "button"s
-   (UncleSamSwiss) Added support for AlarmClock control
-   (Apollon77) Updated CI Testing

### 0.4.0

-   (UncleSamSwiss) Improved support for Loxone Config 9
-   (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0

-   (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1

-   (UncleSamSwiss) Added support for Slider control

### 0.2.0

-   (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1

-   (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0

-   (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3

-   (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2

-   (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1

-   (UncleSamSwiss) Initial version

## License

Copyright 2023 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.