---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: HQiGwb/IOtE6OzKlihV2P+iO/laki3OXzDEDJV9HWDk=
---
![Logo](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.dreame.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![Anzahl der Installationen](https://iobroker.live/badges/dreame-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/dreame-stable.svg)
![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

# ioBroker.dreame

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

![Live-Karten-Widget](../../../en/adapterref/iobroker.dreame/docs/Pics/Map-Screen.jpg)

## Dreame-Adapter für ioBroker

Adapter für Dreame und MOVA Saugroboter und Mähroboter.

**Unterstützte Marken:** Dreame, MOVA (in den Adaptereinstellungen auswählen)

**Getestet mit:** L10, L20, X40, A2 1200 (Rasenmäher), MOVA 600, MOVA 1000

---

## Installation

### Über ioBroker Admin (empfohlen)

1. Stellen Sie sicher, dass das Repository „Neueste Version“ unter Admin → Einstellungen → Repositories aktiviert ist.
2. Gehen Sie zum Reiter „Adapter“ und suchen Sie nach „dreame“.
3. Klicken Sie auf Installieren

Der Adapter ist aktuell im **neuesten** Repository verfügbar. Die Aufnahme in das stabile Repository wurde beantragt (siehe Status unter <https://github.com/ioBroker/ioBroker.repositories/pull/6200> ).

### Über die Befehlszeile

```
iobroker install dreame@latest
```

### Für die Adapterentwicklung

Wenn Sie zum Adaptercode selbst beitragen möchten (und ihn nicht nur verwenden):

```
git clone https://github.com/TA2k/ioBroker.dreame.git
cd ioBroker.dreame
npm install
npm link
```

---

## Konfiguration

| Einstellung              | Beschreibung                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud-Dienst             | Wählen Sie je nach Ihrer App **Dreame** oder **MOVA** aus.                                                                                                                                                    |
| E-Mail-App               | Ihre Dreame/MOVA-App-Anmelde-E-Mail                                                                                                                                                                           |
| App-Passwort             | Ihr Dreame/MOVA-App-Passwort                                                                                                                                                                                  |
| Karte abrufen            | Lädt die Karte beim Start des Adapters und _anschließend alle paar_ Minuten aus der Cloud; verwaltet außerdem Raumnamen und gespeicherte Kartenbilder. Erforderlich für das untenstehende Karten-Widget.      |
| Aktualisierungsintervall | Zyklus (Minuten), in dem der Adapter aktiv die Cloud abfragt – Kartenabruf **und** allgemeiner Gerätestatus (Akku, Reinigungsstatus usw.). Höhere Werte reduzieren die Cloud-Anfragen, verzögern aber beides. |

> MOVA-Geräte (600, 1000) nutzen dasselbe Cloud-Backend wie Dreame, jedoch mit unterschiedlichen Domains. Wählen Sie **MOVA** , wenn Sie die MOVA-App verwenden.

---

## Vakuum (L10, L20, X40, ...)

Der Adapter erstellt Zustände für Saugroboter verzögert – nur die von Ihrem Gerät tatsächlich gemeldeten Eigenschaften erscheinen im Objektbaum. Die Zustände werden nach dem Start des Adapters und nach dem ersten Abfragezyklus schrittweise gefüllt. Die folgenden Tabellen zeigen alle bekannten möglichen Zustände; Ihr Gerät meldet möglicherweise nur eine Teilmenge.

### Vakuumstatus

| Zustand                  | Beschreibung                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Zustand                  | Roboterstatus (1=Reinigung, 2=Standby, 3=Pause, 5=Rückkehr, 6=Laden, 7=Wischen, 8=Trocknen, 9=Waschen, ...)                                   |
| Fehler                   | Fehlercode                                                                                                                                    |
| Batteriestand            | Akkuprozentsatz                                                                                                                               |
| Ladestatus               | 1=Wird geladen, 2=Wird nicht geladen, 3=Abgeschlossen, 5=Zurück zum Ladevorgang                                                               |
| Status                   | Reinigungsstatus (0=Leerlauf, 1=Pausiert, 2=Reinigung, 3=Zurück zum Startpunkt, 6=Wird geladen, 18=Segment, 19=Zone, 20=Punkt, 21=Kartierung) |
| Reinigungszeit           | Aktuelle Reinigungszeit (min)                                                                                                                 |
| gereinigter Bereich      | Aktuell gereinigte Fläche (m²)                                                                                                                |
| Reinigungsfortschritt    | Reinigungsfortschritt (%)                                                                                                                     |
| Trocknungsfortschritt    | Trocknungsfortschritt (%)                                                                                                                     |
| Aufgabenstatus           | Aufgabe (0=Abgeschlossen, 1=Automatisch, 2=Zone, 3=Segment, 4=Punkt, 5=Kartierung)                                                            |
| Aufgabentyp              | Aufgabentyp                                                                                                                                   |
| Seriennummer             | Seriennummer                                                                                                                                  |
| Fehler                   | Fehlerdetails                                                                                                                                 |
| Warnstatus               | Warnstatus                                                                                                                                    |
| Wassertank               | 0 = Nicht installiert, 1 = Installiert, 10 = Mop installiert                                                                                  |
| Selbstwaschbasis-Status  | Status der Selbstwaschbasis                                                                                                                   |
| Wischmopp-Station        | Wischmopp in der Station                                                                                                                      |
| Wischmopppad installiert | Moppbezug installiert                                                                                                                         |
| Entwässerungsstatus      | Entwässerungsstatus                                                                                                                           |
| Gerätefähigkeit          | Gerätefunktionskennzeichen                                                                                                                    |

#### Verbrauchsmaterial

| Zustand                 | Beschreibung                              |
| ----------------------- | ----------------------------------------- |
| Hauptbürste links       | Lebensdauer der Hauptbürsten (%)          |
| Hauptbürstenzeit links  | Verbleibende Zeit für die Hauptbürste (h) |
| Seitenbürste links      | Lebensdauer der Seitenbürste (%)          |
| Seitenbürstenzeit links | Verbleibende Zeit zum Seitenbürsten (h)   |
| Filter links            | Filterlebensdauer (%)                     |
| Filterzeit links        | Verbleibende Filterzeit (h)               |
| sensor-dirty-left       | Sensorlebensdauer (%)                     |
| sensor-dirty-time-left  | Verbleibende Sensorzeit (h)               |
| Rad verschmutzt links   | Radlebensdauer (%)                        |

#### Stationsstatus

| Zustand                    | Beschreibung                                                      |
| -------------------------- | ----------------------------------------------------------------- |
| Status des Reinwassertanks | 0 = Installiert, 1 = Nicht installiert, 2 = Niedriger Wasserstand |
| Schmutzwassertank-Status   | 0 = Installiert, 1 = Nicht installiert oder nicht vollständig     |
| Staubbeutelstatus          | 0 = Installiert, 1 = Nicht installiert, 2 = Prüfen                |
| Waschmittelstatus          | Waschmittelstatus                                                 |
| Warmwasserstatus           | Warmwasserstatus                                                  |

#### Statistiken

| Zustand                    | Beschreibung                                  |
| -------------------------- | --------------------------------------------- |
| erste Reinigung            | Datum der ersten Reinigung (Unix-Zeitstempel) |
| Gesamtreinigungszeit       | Gesamtreinigungszeit (min)                    |
| Reinigungszähler           | Gesamtzahl der Reinigungen                    |
| Gesamtfläche der Reinigung | Gesamtfläche der Reinigung (m²)               |

#### AutoSwitch analysierte Werte

Diese werden aus den folgenden Daten extrahiert:`auto-switch-settings` JSON und als einzelne Zustände verfügbar:

| Zustand               | Beschreibung                                               |
| --------------------- | ---------------------------------------------------------- |
| Selbsttrocknung       | Automatische Trocknung: 0 = aus, 1 = ein                   |
| Kollisionsvermeidung  | Kollisionsvermeidung: 0 = aus, 1 = ein                     |
| Aufhelllicht          | Licht im Dunkeln: 0 = aus, 1 = an                          |
| Fleckenvermeidung     | Fleckenvermeidung: 0 = aus, 1 = an                         |
| Wischtyp              | 0 = Täglich, 1 = Genau, 2 = Tiefgründig                    |
| Clean-Genie           | CleanGenius: 0=Aus, 1=Routine, 2=Intensiv                  |
| Reinigungsroute       | 1=Standard, 2=Intensiv, 3=Tiefenkurs, 4=Schnellkurs        |
| breitere Ecken        | Eckabdeckung: 0=Aus, 1=Hohe Frequenz, -7=Niedrige Frequenz |
| Bodenrichtung         | Reinigungsrichtung für den Boden: 0 = aus, 1 = ein         |
| Haustierorientiert    | Reinigung speziell für Haustiere: 0 = aus, 1 = an          |
| maximale Saugkraft    | Maximale Saugleistung: 0 = aus, 1 = ein                    |
| Heißwäsche            | Heißwäsche: 0 = aus, 1 = an                                |
| UV-Sterilisation      | UV-Sterilisation: 0 = aus, 1 = ein                         |
| Ultra-Reinigungsmodus | Ultra-Reinigungsmodus: 0 = Aus, 1 = Ein                    |
| Mopp-Verlängerung     | Moppverlängerung: 0=aus, 1=ein                             |
| intelligentes Laden   | Intelligentes Laden: 0 = aus, 1 = ein                      |

### Fernbedienung für Staubsauger

| Zustand                          | Beschreibung                                                            |
| -------------------------------- | ----------------------------------------------------------------------- |
| Saugniveau                       | 0 = Leise, 1 = Standard, 2 = Stark, 3 = Turbo                           |
| Wasservolumen                    | 1 = Niedrig, 2 = Mittel, 3 = Hoch                                       |
| Reinigungsmodus                  | 0 = Fegen, 1 = Wischen, 2 = Fegen + Wischen, 3 = Wischen nach dem Fegen |
| Teppichverstärkung               | Teppichverstärkung ein/aus                                              |
| Hindernisvermeidung              | Hindernisvermeidung ein/aus                                             |
| KI-Erkennung                     | KI-Erkennungs-Bitfeld                                                   |
| Kindersicherung                  | Kindersicherung ein/aus                                                 |
| Teppichempfindlichkeit           | 1 = Niedrig, 2 = Mittel, 3 = Hoch                                       |
| Teppicherkennung                 | Teppicherkennung ein/aus                                                |
| Teppichreinigung                 | 0 = Vermeiden, 1 = Anpassen, 2 = Ignorieren                             |
| Selbstreinigung                  | Selbstreinigung ein/aus                                                 |
| Trocknungszeit                   | 2 = 2 Stunden, 3 = 3 Stunden, 4 = 4 Stunden                             |
| automatischer Moppaufsatz        | Automatischer Wischmopp ein-/ausschalten                                |
| Wischmopp-Waschniveau            | Wischmopp-Waschniveau                                                   |
| automatische Wassernachfüllung   | Automatische Wassernachfüllung ein/aus                                  |
| automatische Waschmittelzugabe   | Automatische Waschmittelzugabe ein/aus                                  |
| dnd-enable                       | Bitte nicht stören ein/aus                                              |
| dnd-start / dnd-end              | DND-Zeitbereich                                                         |
| Volumen                          | Lautstärkepegel                                                         |
| automatische Staubabsaugung      | Automatische Staubabsaugung ein/aus                                     |
| automatische Entleerungsfrequenz | Automatische Entleerungsfrequenz                                        |
| Feuchtigkeitsgrad                | Feuchtigkeitsgrad (1–32)                                                |
| Cleangenius-Modus                | 0=Aus, 1=Routine, 2=Tief                                                |
| Wassertemperatur                 | 0=Kalt, 1=Warm, 2=Heiß, 3=Kochend                                       |
| geräuschloses Trocknen           | Geräuschloses Trocknen ein/aus                                          |
| Haarkompression                  | Haarkompression ein/aus                                                 |
| Wischen mit Reinigungsmittel     | Wischen mit Reinigungsmittel ein/aus                                    |

#### AutoSwitch-Befehle festlegen

Diese schreiben direkt in die AutoSwitch-Einstellungen des Geräts (Eigenschaft 4-50):

| Zustand                             | Beschreibung                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| automatische Trocknung einstellen   | Automatische Trocknung einstellen: 0 = aus, 1 = ein                                 |
| Kollisionsvermeidung einstellen     | Kollisionsvermeidung einstellen: 0 = aus, 1 = ein                                   |
| Aufhelllicht einstellen             | Fülllicht einstellen: 0 = aus, 1 = an                                               |
| Vermeidung von Fleckenbildung       | Fleckenvermeidung einstellen: 0 = aus, 1 = ein                                      |
| Set-Mopp-Typ                        | Wischtyp einstellen: 0=Täglich, 1=Genau, 2=Tiefenreinigung                          |
| set-clean-genius                    | CleanGenius einstellen: 0=Aus, 1=Routine, 2=Intensiv                                |
| Reinigungsroute einrichten          | Reinigungsprogramm einstellen: 1=Standard, 2=Intensiv, 3=Tiefenreinigung, 4=Schnell |
| breitere Ecken                      | Breitere Ecken einstellen: 0=Aus, 1=Hohe Frequenz, -7=Niedrige Frequenz             |
| set-floor-direction                 | Bodenrichtung einstellen: 0=aus, 1=ein                                              |
| set-haustierorientiert              | Haustierfokus einstellen: 0 = aus, 1 = an                                           |
| intelligentes Laden einstellen      | Intelligentes Laden einstellen: 0 = aus, 1 = ein                                    |
| Heißwäsche einstellen               | Heißwäsche einstellen: 0 = aus, 1 = ein                                             |
| UV-Sterilisation                    | UV-Sterilisation einstellen: 0 = aus, 1 = ein                                       |
| set-max-suction                     | Maximale Saugkraft einstellen: 0 = aus, 1 = ein                                     |
| Set-Ultra-Clean                     | Ultra-Reinigung einstellen: 0 = aus, 1 = ein                                        |
| set-mop-extend                      | Moppverlängerung einstellen: 0=aus, 1=ein                                           |
| smarte Trocknung                    | Intelligente Trocknungsfunktion einstellen: 0 = aus, 1 = ein                        |
| Selbstreinigungsfrequenz einstellen | 0 = Pro Zimmer, 1 = Standard, 2 = Hoch                                              |
| Set-intensive-Teppich               | Intensivteppich einstellen: 0=aus, 1=ein                                            |
| Spaltreinigung                      | Spaltreinigungserweiterung einstellen: 0 = aus, 1 = ein                             |
| Wischen unter Möbeln                | Wischen unter Möbeln einstellen: 0 = aus, 1 = ein                                   |
| benutzerdefiniertes Wischen         | Benutzerdefinierten Wischmodus einstellen: 0 = aus, 1 = ein                         |

#### Aktionen

> **Breaking Change seit Version 0.3.18:** Aktionszustände (`start-clean` ,`stop` ,`pause` ,`return-to-dock` ,`locate` ,`start-washing` ,`start-auto-empty` ,`clear-warning` (und alle Reset-Tasten) sind jetzt **vom Typ Boolean / Rolle Taste** . Schreiben`true` Um sie auszulösen, müssen Skripte oder Vis-Widgets, die zuvor einen Zeichenfolgenwert geschrieben haben, aktualisiert werden.

| Zustand                    | Beschreibung                                                             |
| -------------------------- | ------------------------------------------------------------------------ |
| Neustart                   | Reinigung starten (Taste)                                                |
| Pause                      | Reinigung pausieren (Taste)                                              |
| stoppen                    | Reinigung stoppen (Taste)                                                |
| Rückkehr zum Dock          | Zurück zum Dock (Schaltfläche)                                           |
| start-custom-clean         | Benutzerdefinierte Bereinigung starten (Wert: JSON mit piid/Wert-Paaren) |
| Waschen starten            | Wischmopp-Waschvorgang starten (Taste)                                   |
| start-auto empty           | Automatisches Leeren starten (Schaltfläche)                              |
| lokalisieren               | Roboter lokalisieren / Ton abspielen (Taste)                             |
| klare Warnung              | Warnung löschen (Schaltfläche)                                           |
| Hauptbürste zurücksetzen   | Hauptbürstenverbrauchsmaterial zurücksetzen (Taste)                      |
| Seitenbürste zurücksetzen  | Seitenbürsten-Verbrauchsteil zurücksetzen (Taste)                        |
| Reset-Filter               | Filterverbrauchsmaterial zurücksetzen (Taste)                            |
| Reset-Sensor               | Sensor-Verbrauchsmaterial zurücksetzen (Taste)                           |
| fetchMap                   | Karte vom Gerät abrufen (Schaltfläche)                                   |
| benutzerdefinierter Befehl | Benutzerdefinierten MIoT-Befehl senden (JSON)                            |

#### Zimmerreinigung

`dreame.0.XXXX.remote.start-custom-clean`

```json
[
  { "piid": 1, "value": 18 },
  { "piid": 10, "value": "{\"selects\":[[X,1,3,2,1]]}" }
]
```

X = Raum-ID. Mehrere Räume:`{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}`

#### Schalterbelegung

`dreame.0.XXXXXXX.remote.customCommand` :

```json
{ "siid": 6, "aiid": 2, "in": [{ "piid": 4, "value": "{\"sm\":{},\"mapid\":X}" }] }
```

X = mapId (siehe`dreame.0.XXXX.status.map-list` )

---

### Individuelle Zimmerreinigung

Mit der Funktion **„Benutzerdefinierte Raumreinigung“** können Sie einzelne Räume auswählen und den Roboter nur in diese Räume schicken, anstatt die gesamte Etage reinigen zu lassen. Saugstärke und Wassermenge gelten global für alle ausgewählten Räume.

#### Schritt-für-Schritt-Anleitung

**a) Benennen Sie Ihre Karte (optional, empfohlen für Haushalte mit mehreren Etagen)**

Wenn eine Karte zum ersten Mal erkannt wird,`map.maps.<id>.mapName` wird mit dem Platzhalterwert erstellt`"Map <id>"` (z.B`"Map 1"` Dieser Zustand ist direkt beschreibbar – ändern Sie den Wert im ioBroker-Objektbaum in einen aussagekräftigen Wert, z. B. von`"Map 1"` Zu`"Ground Floor"` Der Kanalname von`map.maps.<id>` Die Aktualisierung erfolgt automatisch, sobald Sie den neuen Wert speichern. Ein Neustart des Adapters ist nicht erforderlich.

**b) Aktive Karte festlegen**

Schreiben Sie die Karten-ID (z. B.`1` ) Zu`remote.custom-room-cleaning.active-map` Nur die Räume, die zu dieser Karte gehören, werden beim Start an den Roboter gesendet. Die in Schritt (a) erstellte Karte hilft Ihnen dabei, die IDs den einzelnen Etagen zuzuordnen.

**c) Zimmer auswählen**

Unter`remote.custom-room-cleaning.map-<id>/` Jeder erkannte Raum wird als boolescher Zustand dargestellt. Die Kanal- und Zustandsnamen zeigen den übersetzten Raumnamen aus der Karte an (z. B.`kitchen` ,`living-room` ,`bathroom` Stellen Sie die gewünschten Räume ein auf`true` Die

**d) Saugstärke und Wassermenge einstellen (optional)**

`remote.suction-level` Und`remote.water-volume` Die Einstellungen sollen auf alle ausgewählten Räume angewendet werden. Um abweichende Werte zu erhalten, müssen diese vor dem Start der Reinigung festgelegt werden. Es handelt sich dabei um dieselben Zustände, die auch für die reguläre Reinigung verwendet werden.

**e) Starten Sie den Reinigungslauf.**

Satz`remote.custom-room-cleaning.start` Zu`true` Der Adapter erstellt die Raumauswahl anhand der Kontrollkästchen der aktiven Karte, sendet sie an den Roboter und setzt die`start` Staat zu`false` automatisch.

#### Fortgeschritten: direkt`customCommand` Bearbeitung

`remote.custom-room-cleaning.customCommand` Speichert die Rohauswahl als JSON-Zeichenkette. Sie können sie auch direkt schreiben, wenn Sie das bevorzugen:

```json
{"selects":[[roomId, repeats, suctionLevel, waterVolume, index], ...]}
```

Beispiel — Küche (ID 4) einmal bei starker Saugkraft, mittlerer Wassermenge:

```json
{"selects":[[4, 1, 2, 2, 1]]}
```

Der`customCommand` Die Zimmer-Kontrollkästchen sind **bidirektional synchronisiert** : Die Bearbeitung eines Kontrollkästchens aktualisiert das andere automatisch. Schreiben`customCommand` Aktualisiert direkt die Kontrollkästchen der aktiven Karte; durch Aktivieren eines Kontrollkästchens wird die Karte neu erstellt.`customCommand` Beide Wege sind gleichwertig.

#### Bekannte Einschränkungen

- **Globale Saug-/Wassereinstellung** – Saugstärke und Wassermenge sind für alle ausgewählten Räume identisch eingestellt. Raumspezifische Einstellungen (wie in der Tabelle dargestellt)`map.cleanset.*` ) werden von dieser Funktion nicht unterstützt.
- **Mehrgeschossige Haushalte wurden mit einer Karte getestet** – die Mehrkartenstruktur (eine Kanalgruppe pro Karte) ist vollständig implementiert, jedoch wurde bisher nur der Betrieb mit einer einzelnen Karte umfassend auf realer Hardware getestet. Mehrgeschossige Haushalte mit zwei oder mehr Karten sollten funktionieren, wurden aber noch nicht vollständig verifiziert.

---

### Staubsauger-Abkürzungen

Verknüpfungen (Schnellbefehle, die in der Dreame-App erstellt wurden) werden aus den Eigenschaften 4–48 (Base64-kodierte Namen) extrahiert. Jede Verknüpfung erhält einen eigenen Kanal unter`deviceId.shortcuts.{id}` :

| Zustand | Beschreibung                              |
| ------- | ----------------------------------------- |
| Name    | Entschlüsselter Abkürzungsname            |
| läuft   | Ob die Verknüpfung gerade ausgeführt wird |
| Start   | Schaltfläche zum Starten der Verknüpfung  |

Kanäle werden beim Start des Adapters automatisch neu erstellt (nicht erst bei der nächsten Änderung auf App-Seite) und automatisch entfernt, wenn eine Verknüpfung in der App gelöscht wird.

---

### Zeitpläne

In der Dreame-App erstellte Zeitpläne (Eigenschaft 8-2) werden pro Zeitplaneintrag in einen Kanal aufgeteilt unter`deviceId.schedule.{id}` :

| Zustand     | Beschreibung                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ermöglicht  | Ob der Zeitplan aktiv ist – beschreibbar, schaltet den Zeitplan direkt auf dem Roboter um.                                                                                            |
| Zeit        | Tageszeit, zu der der Zeitplan ausgelöst wird (`HH:MM` )                                                                                                                              |
| Wochentage  | An Wochentagen läuft der Zeitplan (derzeit immer auf Deutsch, z. B.`Mo,Mi,Fr` oder`täglich` )                                                                                         |
| Typ         | Art des Reinigungsplans: Zimmerreinigung, Reinigung aller Zimmer oder eine Abkürzung                                                                                                  |
| Zimmer      | _(Nur für Zimmerreinigungspläne)_ JSON-Array, ein Eintrag pro Zimmer mit eigenem Modus/Saugkraft/Route/Zyklen/Feuchtigkeit und übersetztem Zimmernamen                                |
| Parameter   | _(Nur Zeitpläne für alle Räume)_ JSON-Objekt mit Modus/Saugkraft/Route/Zyklen/Feuchtigkeit, angewendet auf den gesamten Boden                                                         |
| Shortcut-ID | _(Nur für Verknüpfungszeitpläne)_ die numerische ID der verknüpften Verknüpfung                                                                                                       |
| Waise       | _(Nur Kurzzeitpläne)_`true` wenn die verknüpfte Verknüpfung nicht mehr existiert (in der App gelöscht wurde) —`enabled` sollte in diesem Fall nicht als verlässlich angesehen werden. |

Die Zeitplankanäle werden beim Start des Adapters automatisch neu erstellt und beim Löschen eines Zeitplans in der App automatisch entfernt, genau wie die oben genannten Verknüpfungen.

---

### Live-Karten-Widget

Der Adapter beinhaltet ein browserbasiertes Live-Karten-Widget: Roboterposition, Reinigungspfad und gereinigte Räume werden in Echtzeit während der Reinigung aktualisiert. Es wird direkt vom Adapter bereitgestellt – ein vis-Widget oder ein zusätzlicher Adapter ist nicht erforderlich – und kann als iFrame in vis, Grafana oder ein benutzerdefiniertes Dashboard eingebunden werden.

#### Aufstellen

- Zum Ausliefern der Seite wird der ioBroker **-Webadapter** (beliebige Instanz) benötigt.
- Öffne es bei`%web_protocol%://%ip%:%web_port%/dreame/` — z.B.`http://<your-iobroker>:8082/dreame/` Ein vorgefertigter Link („Dreame-Map“) befindet sich auf der ioBroker-Startseite und neben dieser Instanz in der Adapterliste.
- **Die Option „Karte abrufen“** muss aktiviert sein (siehe [Konfiguration](#configuration) ) – ohne sie verfügt das Widget über keine Daten.
- Falls noch keine Karte angezeigt wird, starten Sie den Adapter einmal, während sich der Roboter in seiner Dockingstation befindet, damit die erste vollständige Karte geladen werden kann.
- Mehrere Roboter in derselben Instanz: Das Widget zeigt im Header einen Geräteumschalter an, wenn mehr als ein Gerät gefunden wird, oder man kann direkt eines auswählen mit`?did=<did>` in der Adresse.

> **Kamera-/VSLAM-Roboter werden nicht unterstützt.** Geräte, die per Kamera statt per Lidar navigieren (z. B. Mijia 1C/1T, Dreame F9), werden vom Karten-Widget nicht erfasst – es wurde ausschließlich für Lidar-Roboter entwickelt und getestet. Der Adapter protokolliert eine Warnung, und die Karte bleibt für diese Geräte leer.

#### Aussehen

Alle Darstellungseinstellungen befinden sich im Widget selbst – öffnen Sie das Zahnradsymbol in der oberen rechten Ecke. Es stehen vier Farbmodi zur Verfügung:

| Modus      | Beschreibung                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Licht      | Festes helles Design                                                                                                                                                |
| Dunkel     | Dunkles Design (Standard) fest eingestellt                                                                                                                          |
| Hauptfarbe | Wählen Sie eine Grundfarbe; Seitenleiste, Rahmen und Text werden automatisch davon abgeleitet, wobei ein Kontrastcheck erfolgt, damit der Text immer lesbar bleibt. |
| Brauch     | Fünf individuell wählbare Farben (Hintergrund, Seitenleiste, Schaltflächen, Rahmen, Text) für volle Kontrolle                                                       |

<table>
<tr>
<td width="50%"><img src="docs/Pics/Map-Dark.jpg" alt="Dark theme"></td>
<td width="50%"><img src="docs/Pics/Map-White.jpg" alt="Light theme"></td>
</tr>
</table>

#### Merkmale

- Geräteumschalter in der Kopfzeile für Setups mit mehreren Robotern
- Anpassbares Layout: Seitenleiste links/rechts, UI-Zoom, Seitenleistenbreite, Kartendrehung
- Die Bedienfelder können einzeln ein- oder ausgeblendet werden (Reinigung, Schnellzugriffe, Station, Wartung, Wasser & Wischmopp, Statistiken) – bei einigen Bedienfeldern können zusätzlich einzelne Zeilen/Kacheln darin ausgeblendet werden (z. B. Saugstufe oder Feuchtigkeit im Bedienfeld Reinigung).
- Schnellzugriffsleiste: Eine Kachel pro App-Verknüpfung; tippen Sie darauf, um die App direkt aus dem Widget zu starten.
- Die Schaltfläche „Zeitpläne“ öffnet eine Tabelle aller in der Dreame-App erstellten Zeitpläne (Zeit, Wochentage, Typ, Einstellungen pro Raum oder für die gesamte Etage) mit einem Ein-/Ausschalter für jeden Zeitplan. Ein Zeitplan, der auf eine gelöschte Verknüpfung verweist, zeigt einen gesperrten Schalter an, anstatt stillschweigend keine Aktion auszuführen.
- Die Widget-Benutzeroberfläche ist in Deutsch und Englisch verfügbar, entsprechend der Systemsprache von ioBroker.
- Kioskmodus (`?gear=0` ) blendet das Einstellungs-Zahnrad aus – für schreibgeschützte Displays (Wandtablets, Dashboards)
- Das aktuelle Erscheinungsbild und die Bedienfeldeinstellungen können als kompakter Link exportiert werden (`?cfg=<blob>` ), um ein Setup schnell über mehrere Einbettungen hinweg zu teilen oder wiederzuverwenden, ohne die gespeicherte Konfiguration zu verändern.
- Verbrauchszähler für Wassertank und Wischmopp (Wasser- und Wischmopp-Bedienfeld)
- Mit einem Klick auf die Standarddarstellung und Bedienfeldeinstellungen zurücksetzen, unabhängig von der gespeicherten Adapterkonfiguration

#### Kiosk-/iFrame-Beispiel

Kombinieren`?gear=0` (Einstellungen ausblenden) mit einem`?cfg=` Im Einstellungsfeld wird ein Link generiert, um eine vorkonfigurierte, schreibgeschützte Ansicht einzubetten:

```
http://<your-iobroker>:8082/dreame/?gear=0&cfg=<blob>
```

Der`<blob>` wird vom Abschnitt "Link" im Einstellungsfeld des Widgets generiert und betrifft nur diesen Browser-Tab/diese Einbettung – die für das Widget selbst gespeicherten Einstellungen werden niemals überschrieben.

---

## Rasenmäher (A2, A2 1200, ...)

Der Adapter unterstützt Dreame-Mähroboter mit dedizierten Zuständen und Kartendarstellung. Zustände werden verzögert erstellt – nur die vom Gerät tatsächlich gemeldeten Eigenschaften erscheinen im Objektbaum.

### Mäherstatus

| Zustand                        | Beschreibung                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Status                         | Mäherstatus (1=Mähen, 2=Standby, 3=Pausiert, 5=Kehrt zurück, 6=Wird geladen, 11=Kartierung, 13=Geladen, 14=Aktualisierung)      |
| Fehler                         | Fehlercode                                                                                                                      |
| Batteriestand                  | Akkuprozentsatz                                                                                                                 |
| Ladezustand                    | Ladezustand                                                                                                                     |
| Arbeitsmodus                   | Aktueller Arbeitsmodus                                                                                                          |
| Mähzeit                        | Aktuelle Mähzeit (min)                                                                                                          |
| Mähfläche                      | Aktuell gemähte Fläche (m²)                                                                                                     |
| Aufgabenstatus                 | Aufgabenstatus                                                                                                                  |
| Fehler                         | Fehlerdetails                                                                                                                   |
| Warnstatus                     | Warnstatus                                                                                                                      |
| Einstellungen aktualisieren    | Einstellungen werden über MQTT (2-51) geändert. Wert:`[en,hours]` =Regen`0/1` =Frost,`[en,start,end]` =Niedrige Geschwindigkeit |
| Zonenstatus                    | Zonenmähstatus pro Bereich                                                                                                      |
| KI-Hindernisse                 | KI hat Hindernisse erkannt                                                                                                      |
| Selbstprüfung                  | Selbsttest-Diagnoseergebnis                                                                                                     |
| Gesamtmähzeit                  | Gesamte Mähzeit (min)                                                                                                           |
| Gesamtzahl der Mähvorgänge     | Gesamtzahl der Mähvorgänge                                                                                                      |
| Gesamtmähfläche                | Gesamte gemähte Fläche (m²)                                                                                                     |
| Regenschutz                    | Regenschutzeinstellungen (WRP):`[enabled, wait_hours, sensitivity]`                                                             |
| Frostschutz                    | Frostschutz (FDP): 0 = aus, 1 = ein                                                                                             |
| niedrige Geschwindigkeit       | Nachtmodus mit niedriger Geschwindigkeit (NIEDRIG):`[enabled, start_min, end_min]`                                              |
| dnd-Einstellungen              | Nicht stören-Einstellungen (DND):`[enabled, start_min, end_min]`                                                                |
| Batteriekonfiguration          | Batteriekonfiguration (BAT):`[return%, max%, charge_en, ?, start, end]`                                                         |
| Volumen                        | Lautstärke (VOL): 0-100                                                                                                         |
| Kindersicherungs-Konfiguration | Kindersicherung (CLS): 0 = aus, 1 = ein                                                                                         |
| ai-obstacle-cfg                | KI-Hindernisvermeidung (AOP): 0 = aus, 1 = ein                                                                                  |
| Diebstahlsicherung             | Diebstahlsicherung (STUN): 0 = aus, 1 = ein                                                                                     |
| Scheinwerfer                   | Scheinwerfereinstellungen (LIT):`[enabled, start, end, l1, l2, l3, l4]`                                                         |
| Rasenschutz                    | Rasenschutz (PROT): 0=aus, 1=ein                                                                                                |
| Klingenstunden                 | Betriebsstunden des Rotorblatts (max. 100 h)                                                                                    |
| Klingengesundheit              | Klingengesundheit 0-100%                                                                                                        |
| Bürstenstunden                 | Betriebsstunden der Bürste (max. 500 h)                                                                                         |
| Zähnepflege                    | Zustand der Zahnbürste 0-100 %                                                                                                  |
| Roboter-Wartungsstunden        | Wartungsstunden für den Roboter (max. 60 Stunden)                                                                               |
| Roboterwartung und -gesundheit | Roboterwartungszustand 0-100%                                                                                                   |
| Kollisionsvermeidung           | Kollisionsvermeidung (AutoSwitch LessColl): 0 = aus, 1 = ein                                                                    |
| Aufhelllicht                   | Fülllicht (AutoSwitch FillinLight): 0=aus, 1=ein                                                                                |
| Clean-Genie                    | CleanGenius (AutoSwitch SmartHost): 0=Aus, 1=Routine, 2=Tiefenreinigung                                                         |
| Reinigungsroute                | Reinigungsroute (AutoSwitch CleanRoute): 1=Standard, 2=Intensiv, 3=Tiefenreinigung, 4=Schnellreinigung                          |
| breitere Ecken                 | Erweiterte Eckabdeckung (AutoSwitch MeticulousTwist): 0=Aus, 1=Hohe Frequenz, 7=Niedrige Frequenz                               |
| Bodenrichtung                  | Reinigung in Bodenrichtung (AutoSwitch MaterialDirectionClean): 0=aus, 1=ein                                                    |
| Haustierorientiert             | Reinigung speziell für Haustiere (AutoSwitch PetPartClean): 0 = aus, 1 = ein                                                    |
| automatisches Laden            | Automatisches Laden (AutoSwitch SmartCharge): 0 = aus, 1 = ein                                                                  |
| Schnitthöhe                    | Schnitthöhe in mm (VOR)                                                                                                         |
| Hindernisdistanz-Konfiguration | Hindernisabstand in mm (PRE)                                                                                                    |
| Mähmodus                       | Mähmodus (PRE): 0 = Standard, 1 = Effizient                                                                                     |
| Richtungsänderung              | Richtungsänderung (PRE): 0=automatisch, 1=aus                                                                                   |
| Kantenmähen                    | Kantenmähen (VOR): 0=aus, 1=ein                                                                                                 |
| Kantenerkennung                | Kantenerkennung (PRE): 0=aus, 1=ein                                                                                             |

#### Positions- und Aufgabendaten (Binärprotokoll, live)

Diese Zustände werden aus binären MQTT-Nachrichten befüllt und verzögert erstellt – sie erscheinen erst, nachdem der Rasenmäher seine erste binäre Aktualisierung gesendet hat.

**Aus dem Roboterpositionspaket (SIID 1-5):**

| Zustand                 | Beschreibung                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Roboterposition         | Aktuelle Roboterposition (JSON):`{"x":..., "y":..., "angle":...}`                      |
| Mähfortschritt          | Aktueller Aufgabenfortschritt (%)                                                      |
| gemähte Fläche          | Im Rahmen der aktuellen Aufgabe fertiggestellte Fläche (m²)                            |
| Gesamtmähfläche-Aufgabe | Geplante Gesamtfläche für die aktuelle Aufgabe (m²)                                    |
| Mähaufgabe              | Vollständige Aufgabendaten im JSON-Format:`{regionId, taskId, percent, total, finish}` |

**Aus dem Gerätetelemetriepaket (SIID 1-1):**

| Zustand          | Beschreibung                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Dockposition     | Dock-/Ladeposition JSON:`{"x":..., "y":..., "angle":...}` (wird beim Andocken aktualisiert)             |
| Andockzustand    | IN\_STATION / OUT\_OF\_STATION / PAUSE\_DOCKING / FINISH\_DOCKING / DOCKING\_FAILED / DOCKING\_IN\_BASE |
| Standort-Status  | Standortstatus (0–3)                                                                                    |
| Akkustand-Live   | Aktueller Akkustand (%) aus der binären Telemetrie                                                      |
| Lade-Live        | Ladezustand: 0 = Lädt nicht, 1 = Lädt                                                                   |
| WLAN-RSSI        | WLAN-Signalstärke (dBm)                                                                                 |
| LTE-RSSI         | LTE-Signalstärke (dBm)                                                                                  |
| ble-rssi         | Bluetooth-Signalstärke (dBm)                                                                            |
| Fehlercode-Binär | Roher Fehlercode aus der binären Telemetrie                                                             |
| Pin-Zustand      | Pin-Status (0/1)                                                                                        |
| Abdocken         | Abdocken-Flag (0/1)                                                                                     |
| Kamerazustand    | Kamerastatus                                                                                            |

### Mäherfernbedienung

| Zustand                             | Beschreibung                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Start-Mähen                         | Mähvorgang starten (Taste)                                                                                |
| Stoppmähen                          | Mähen stoppen (Taste)                                                                                     |
| Pause-Mähen                         | Mähen pausieren (Taste)                                                                                   |
| Anlaufgebühr                        | Zurück zum Dock (Schaltfläche)                                                                            |
| Start-Mähen-Ext.                    | Benutzerdefiniertes Mähen starten (Zonen-/Segmentreinigung mit Parametern)                                |
| klare Warnung                       | Warn-/Fehlerstatus löschen (Schaltfläche)                                                                 |
| Hindernisvermeidung                 | Hindernisvermeidung ein/aus                                                                               |
| KI-Erkennung                        | KI-Erkennung ein/aus                                                                                      |
| Kindersicherung                     | Kindersicherung ein/aus                                                                                   |
| dnd-enable                          | Bitte nicht stören ein/aus                                                                                |
| dnd-start / dnd-end                 | DND-Zeitbereich                                                                                           |
| Zeitplan                            | Mähplan                                                                                                   |
| Regenschutzset                      | Regenschutz einstellen:`{"value":1,"time":8,"sen":0}` oder`{"value":0}`                                   |
| Frostschutz einstellen              | Frostschutz einstellen: 0 = aus, 1 = ein                                                                  |
| niedrige Geschwindigkeit einstellen | Nachts niedrige Geschwindigkeit einstellen:`{"value":1,"time":[1200,480]}` oder`{"value":0}`              |
| set-dnd                             | Nicht stören aktivieren:`{"value":1,"time":[1200,480]}` oder`{"value":0}`                                 |
| set-child-lock                      | Kindersicherung einstellen: 0 = aus, 1 = ein                                                              |
| Lautstärke einstellen               | Lautstärke einstellen: 0-100                                                                              |
| set-ai-obstacle                     | KI-Hindernisvermeidung einstellen: 0 = aus, 1 = ein                                                       |
| Diebstahlschutz einstellen          | Diebstahlsicherung einstellen: 0 = aus, 1 = ein                                                           |
| Scheinwerfer einstellen             | Scheinwerfer einstellen:`{"value":1,"time":[480,1200],"light":[1,1,1,1]}`                                 |
| set-path-display                    | Pfadanzeige einstellen: 0=aus, 1=ein                                                                      |
| Rasenschutz einstellen              | Rasenschutz einstellen: 0 = aus, 1 = ein                                                                  |
| Verbrauchsmaterialien zurücksetzen  | Verbrauchsmaterialien zurücksetzen:`{"value":[0,brush,robot]}`                                            |
| Roboter finden                      | Roboter finden (Ton abspielen, Knopf drücken)                                                             |
| Schlossroboter                      | Roboter sperren (Taste)                                                                                   |
| fetchMap                            | Karte vom Gerät abrufen (Schaltfläche)                                                                    |
| generate-3dmap                      | 3D-LIDAR-Karte generieren (Schaltfläche)                                                                  |
| benutzerdefinierter Befehl          | Benutzerdefinierten MIoT-Befehl senden                                                                    |
| Kollisionsvermeidung einstellen     | Kollisionsvermeidung einstellen (AutoSwitch): 0 = aus, 1 = ein                                            |
| Aufhelllicht einstellen             | Fülllicht einstellen (AutoSwitch): 0 = aus, 1 = ein                                                       |
| set-clean-genius                    | CleanGenius einstellen (AutoSwitch): 0=Aus, 1=Routine, 2=Tiefenreinigung                                  |
| Reinigungsroute einrichten          | Reinigungsprogramm einstellen (AutoSwitch): 1=Standard, 2=Intensiv, 3=Tiefenreinigung, 4=Schnellreinigung |
| automatisches Laden einstellen      | Automatisches Laden einstellen (AutoSwitch): 0 = aus, 1 = ein                                             |
| Schnitthöhe einstellen              | Schnitthöhe in mm einstellen (VOR)                                                                        |
| Mähmodus einstellen                 | Mähmodus einstellen (VOREINSTELLUNGEN): 0 = Standard, 1 = Effizient                                       |
| Kantenmähen                         | Kantenmähen einstellen (VOR): 0=aus, 1=ein                                                                |
| Kantenerkennung                     | Kantenerkennung einstellen (PRE): 0=aus, 1=ein                                                            |
| Richtungsänderung festlegen         | Richtungsänderung einstellen (VORHERIGUNG): 0=automatisch, 1=aus                                          |
| mow-all                             | Alle Bereiche mähen (Schaltfläche, o=100)                                                                 |
| Mähzone                             | Ausgewählte Zonen mähen — CSV`"1,3"` oder JSON`"[1,3]"` (o=102)                                           |
| Mähplan                             | Starten Sie den Mähvorgang gemäß gespeichertem Plan (Schaltfläche, o=104).                                |
| Mäh-Hindernis-Scan                  | Hinderniserkennungslauf (Taste, o=105)                                                                    |
| Mähkante                            | Mähkontur: JSON`{"edge":[[x,y],...]}` (o=101)                                                             |
| Mähfleck                            | Mähbereich: JSON`{"area":{...}}` (o=103)                                                                  |
| Mäh-Änderungs-Karte                 | Aktive Karte wechseln (Nummer, 0-basierter Index, o=200)                                                  |

#### Mähen bestimmter Zonen

Jede auf der Karte definierte Mähfläche wird als eigener Kanal dargestellt unter`dreame.0.<did>.mower.map.slot<X>.zone<zoneId>` Öffnen Sie den Objektbrowser von ioBroker, navigieren Sie zu Ihrem Rasenmäher und dann zu`mower.map` und Sie werden einen sehen`slot0` ,`slot1` , ... pro gespeicherter Karte. Jeder Speicherplatz enthält eine`zone<N>` Kanal pro Mähfläche – zum Beispiel`slot0.zone1` ,`slot0.zone3` Innerhalb jeder Zone findet man`name` (wie in der App angezeigt),`area` (m²),`time` , Und`path` Die

Der **numerische Teil nach`zone`** ist die Zonen-ID, die Sie schreiben`remote.mow-zone` Wenn der Baum also so aussieht:

```text
dreame.0.<did>.mower.map.slot0.zone1     name = "Front lawn"
dreame.0.<did>.mower.map.slot0.zone3     name = "Back lawn"
dreame.0.<did>.mower.map.slot0.zone5     name = "Side strip"
```

Dann:

Einzelzone – Rasenmähen „Vorgarten“:

```text
dreame.0.<did>.remote.mow-zone = "1"
```

Mehrere Zonen – Mähen Sie „Vorderrasen“ + „Hinterrasen“ + „Seitenstreifen“:

```text
dreame.0.<did>.remote.mow-zone = "1,3,5"
```

Das JSON-Format funktioniert auch – nützlich für Blockly- oder JavaScript-Skripte:

```text
dreame.0.<did>.remote.mow-zone = "[1,3,5]"
```

Blockly / JavaScript-Adapter-Beispiel:

```js
setState('dreame.0.' + did + '.remote.mow-zone', '1,3', false);
```

Der Mäher analysiert die Liste, beginnt mit dem Mähen der ausgewählten Bereiche und kehrt nach Abschluss des Mähvorgangs zur Ladestation zurück. Um den Mähvorgang mittendrin zu stoppen, drücken Sie`stop-mow` (o=2) oder`pause-mow` (o=4). Zuerst werden die Karten gewechselt (`mow-change-map` ) ist erforderlich, wenn sich die Zielzonen auf einer anderen Karte befinden – andernfalls können die Zonen-IDs nicht aufgelöst werden.

#### Wechseln der aktiven Karte

Verfügt der Mäher über mehrere Karten, wählen Sie die aktive Karte aus, bevor Sie die Zonen-IDs schreiben:

```text
dreame.0.<did>.remote.mow-change-map = 0   // first map
dreame.0.<did>.remote.mow-change-map = 1   // second map
```

### Rasenmäher-Abkürzungen

Verknüpfungen werden aus den Eigenschaften 4-48 (Base64-kodierte Namen) extrahiert. Jede Verknüpfung erhält einen eigenen Kanal unter`deviceId.shortcuts.{id}` :

| Zustand | Beschreibung                              |
| ------- | ----------------------------------------- |
| Name    | Entschlüsselter Abkürzungsname            |
| läuft   | Ob die Verknüpfung gerade ausgeführt wird |
| Start   | Schaltfläche zum Starten der Verknüpfung  |

### Geschichte der Rasenmäher

Der Reinigungsverlauf wird über die Cloud-API abgerufen (letzte 20 Mähvorgänge).

| Zustand                          | Beschreibung                                          |
| -------------------------------- | ----------------------------------------------------- |
| Datum des letzten Mähens         | Datum der letzten Mähsitzung                          |
| letzte Mähdauer                  | Dauer der letzten Sitzung (Minuten)                   |
| Bereich des letzten Mähens       | In der letzten Sitzung gemähte Fläche (m²)            |
| letzter Mähvorgang abgeschlossen | Ob die letzte Sitzung erfolgreich abgeschlossen wurde |
| history-json                     | JSON-Array der letzten 20 Sitzungen                   |

### Mäherkarte

Die Kartendaten werden über die Dreame iotuserdata API abgerufen (nicht über MQTT wie bei Staubsaugern).

| Zustand        | Beschreibung                                              |
| -------------- | --------------------------------------------------------- |
| Kartenbild     | Gerenderte Karte als PNG (base64-Daten-URL)               |
| Slot0.Zone\_X  | Zonendaten (Name, Bereich, Mähzeit)                       |
| Mähpfad        | Rohkoordinaten des Mähpfads                               |
| Einstellungen  | Mäheinstellungen pro Zone                                 |
| Zeitplan       | Mähplan                                                   |
| 3dmap-URL      | URL zum Herunterladen der 3D-LIDAR-Karte (vorab signiert) |
| 3dmap-progress | Fortschritt der 3D-Kartengenerierung (0-100%)             |

**Kartenabfrage:** Die Karte wird beim Start des Adapters und über die`fetchMap` Taste. Während des aktiven Mähvorgangs (Status 1, 3, 5, 11) wird die Karte automatisch alle 30 Sekunden abgefragt, um den Mähpfad zu verfolgen.

**Kartendarstellung:** Erfordert die optionale`canvas` npm-Paket. Die Karte zeigt Zonen (grün), Konturen (weiße Umrisse), Mähwege (gelb), verbotene Bereiche (rot) und Hindernisse (rote Kreise).

**3D-LIDAR-Karte:** Presse`generate-3dmap` um den Mäher zum Scannen und Hochladen einer 3D-Punktwolkenkarte zu veranlassen. Die heruntergeladene Datei ist eine PCD-Datei (Punktwolkendaten), die mit Tools wie CloudCompare oder MeshLab angezeigt werden kann. Der Fortschritt wird verfolgt in`3dmap-progress` Nach Abschluss des Vorgangs wird die vorab signierte Download-URL geschrieben an`3dmap-url` Die URL ist temporär und läuft nach einigen Stunden ab.

#### Benutzerdefinierte Befehle für den Rasenmäher

Über`dreame.0.XXXXXX.remote.customCommand` :

```json
{
  "siid": 5,
  "aiid": 9,
  "in": [{ "order": 4, "region": [1], "type": "order" }]
}
```

## Bekannte Einschränkungen

**Der Objektbaum füllt sich schrittweise (verzögerte Zustandserstellung).** Zustände werden erst angezeigt, wenn das Gerät die entsprechende Eigenschaft mindestens einmal gemeldet hat. Nach einer Neuinstallation oder einem Neustart des Adapters kann der Baum einige Minuten lang unvollständig erscheinen – dies ist das erwartete Verhalten.

**L40s Pro Ultra und ähnliche Geräte: Einige Zustände erscheinen erst nach aktiver Nutzung.** Eigenschaften in der SIID 4-Gruppe (`cleaning-mode` 4-23,`suction-level` 4:4,`water-volume` 4-5) und SIID 28 (`wetness-level` 28-1) kann vom Gerät nur nach einer aktiven Reinigungssitzung, nicht aber während der Leerlaufabfrage, ausgelöst werden. Diese Zustände werden erst angezeigt, nachdem mindestens ein Reinigungszyklus nach der Installation oder dem Neustart des Adapters abgeschlossen wurde.

**`cleaning-mode`Bei einigen** Geräten, darunter auch dem L40s Pro Ultra, konnten in Versionen vor 0.3.18 anstelle des dokumentierten Bereichs von 0–3 Rohwerte (z. B. 5120, 5121, 5122) angezeigt werden. Dies lag daran, dass der Adapter einen zusammengesetzten Wert, der Modus, Fläche und Luftfeuchtigkeit in einer einzigen Ganzzahl kombiniert, nicht dekodieren konnte. Seit Version 0.3.18 wird dieser Wert korrekt dekodiert. Sollten nach dem Update weiterhin Rohwerte über 1000 angezeigt werden, melden Sie bitte ein Problem mit Angabe Ihres Gerätemodells und des angezeigten Rohwerts.

---

## Übersetzungen

Staatsnamen und -beschreibungen sind in 11 Sprachen verfügbar: Englisch, Deutsch, Russisch, Portugiesisch, Niederländisch, Französisch, Italienisch, Spanisch, Polnisch, Ukrainisch und Chinesisch (vereinfacht).

`lib/i18n/en.json` ist die maßgebliche Quelle. Alle anderen Sprachen werden daraus generiert.`npm run translate` Korrekturen an nicht-englischen Übersetzungen sollten als Pull Requests (PRs) für die jeweilige Übersetzung eingereicht werden.`lib/i18n/<lang>.json` Datei.

---

## Credits

- **TA2k** – Inhaber des Repositorys und ursprünglicher Entwickler des Adapters
- **RicardoHipp** – Original-Kartenrenderer. Die Kartendarstellung dieses Widgets basiert auf diesem Renderer (MIT-Lizenz).
- **Sefina-DS (David)** – Mitentwickler, Widget-Neuentwicklung, Live-Tests
- **Community** – krobipd, flapman, volvodani und alle anderen, die Probleme melden und Geräte testen

## Changelog

### 0.4.7 (2026-09-06)
- New tap-to-sequence widget for custom cleaning order directly on the map with room badges, plus a fresh-water/detergent widget for L20 Ultra. Fix Issue #126: clean-water-tank-status bit-mask handling and derived Boolean states for r2253* (L20 Ultra) models. Fix Issue #119: correct mop-pad status on Dreame X60 Pro Ultra Complete (r6001a) via a new model-override layer — removes the dead mop-in-station property, renames the mop-handling pulse, and remaps SIID 4 PIID 6 to actual mop-pad presence on r6001*. Adds status codes 116/117/121/122 (Installing mop, Removing mop, Entering dock, Exiting dock) globally for all vacuum models. Thanks to @SilentM1978 for the detailed live traces that made the r6001a fix possible.

### 0.4.6 (2026-08-29)
- Attempted fix for issue #124 layer 4 (missing pixel raster on r2253c/r2253w): map background, walls, and room fills were not rendered even though overlays and metadata came through correctly. Adds a fallback to combined_pixel_type when the base pixel raster is empty (matching Home Assistant's renderer), and introduces permanent [MERGE-DEBUG] info-level logging (dimensions, pixel counts, wall/segment counts) so this failure mode is instantly diagnosable if it returns. Models whose base raster is already populated (e.g. r9419h) are unchanged. Thanks to luckyheiko for the pinpoint analysis.

### 0.4.5 (2026-08-28)
- Fix for issue #124 (Layer 3): map rendering could crash on the frontend when the device reported detected carpets with an invalid polygon field (null or malformed). Adds a filter in lib/mapMerge.js so invalid carpets never reach the frontend, a defensive guard in the carpet drawing routine in www/js/karte/merger.js, and a generic try/catch around overlay drawing so a single bad overlay never breaks the whole map rendering. The unreferenced legacy widget page www/legacy.html, which carried the same bug, is removed. Combined with 0.4.3 (comma-truncation) and 0.4.4 (AES decryption), this closes the full end-to-end map path for r2253c/r2253w. Thanks to luckyheiko for identifying the root cause and proposing the fix approach.

### 0.4.4 (2026-08-28)
- Fix for issue #124 (Layer 2): map payload for r2253c, r2253w and similar newer Dreame models is AES-256-CBC encrypted; the adapter now derives the AES key from the object_name comma suffix (SHA256, first 32 hex chars as UTF-8), uses a model-specific IV, and decrypts the payload before zlib inflation. Combined with the 0.4.3 comma-truncation fix, this closes the full end-to-end map download path for r2253 models. Also fixes a long-standing bug in lib/dreame.js where the persistent MAP_LIST path used an empty IV instead of the model-specific one. Models without a comma suffix in the object_name (e.g. r9419h/L40s) are unchanged. Thanks to luckyheiko and ralfheitz for the diagnostic logs.

### 0.4.3 (2026-08-28)
- Fix for issue #124 (HTTP 404 on map download for r2253c, r2253w and similar newer Dreame models where the Dreame backend returns an object_name with a comma suffix that the OSS storage does not resolve): the adapter now transparently retries with the object_name truncated at the first comma. Models without a comma in the object_name (e.g. r9419h/L40s) are unchanged. Diagnostic [MAP-DIAG] logging from 0.4.2 remains but only fires when the fallback also fails; new [MAP-DIAG-2] captures the retry outcome for future analysis.

### 0.4.2 (2026-08-27)
- Diagnostic release for issue #124 (HTTP 404 on r2253c/L20 Ultra map download): adds temporary [MAP-DIAG] logging on HTTP errors during fresh map downloads (model, did, object_name, download_url, HTTP status, timing, content-type, response body head) to distinguish race, region and object-name-format hypotheses. No functional changes; fallback to persistent MAP_LIST map unchanged. Diagnostic will be reverted in 0.4.3 together with the actual fix.

### 0.4.1 (2026-08-03)
- Added Schedules: schedules created in the Dreame app are now parsed into `schedule.<id>.*` states (time, weekdays, type, enabled toggle, per-room or whole-floor settings with translated room names and enum values, linked shortcut for shortcut-type schedules). See [Schedules](#schedules).
- Widget: added a Schedules panel/button showing all schedules in a table with an on/off switch each; schedules pointing at a deleted shortcut show a locked switch instead of silently failing.
- Widget: added a Shortcuts panel — one tile per app shortcut, tap to start it directly.
- Fixed app shortcuts being unavailable on vacuums (previously mower-only); shortcut channels are now rebuilt on adapter restart and cleaned up when deleted in the app.
- Widget: full German/English translation of every panel (Cleaning, Shortcuts, Schedules, Station, Maintenance, Water & Mop, Statistics, Kopf/Fehler status and error text), following the ioBroker system language.
- Widget: individual rows/tiles within a panel can now be hidden, not just whole panels (e.g. hide suction level or moisture on the Cleaning panel).
- Widget: menu width control changed from a slider (which visibly drifted under the pointer while dragging) to a number field with −/+ buttons, matching the existing UI zoom control.
- Widget: fixed a label/input association bug where clicking the "UI zoom"/"Menu width" caption activated the adjacent minus button instead of focusing the field (#104, thanks RicardoHipp).
- Widget: the cleaning-mode tile is no longer locked as soon as any room is selected — testing showed the robot does honour the globally set mode for room cleaning except for the combined vacuum+mop mode (#103, thanks RicardoHipp).
- Widget: removed the unused, never-wired-up Mopp panel placeholder; `configVersion` bumped 5→6 to clean up any leftover `panels.mopp` config entry.
- Retyped six MIoT settings from `boolean` to `number` (auto-dust-collecting, auto-lds-coverage, clean-carpets-first, silent-drying, hair-compression, mopping-with-detergent) — devices reporting a value outside 0/1 had those silently rejected before. Thanks to krobipd for the analysis.
- Fixed several `map.*` states logging "has no existing object" on first creation (missing `await` before the object was created).
- Named 13 previously raw/unnamed status datapoints (mop pad and dirty water tank consumables, firmware/MCU version, cleaning-related flags, camera light, current city, cleaning mode) after cross-checking them against another adapter on the same hardware. Thanks to krobipd.
- Decoded `status.error` (previously a raw numeric code) into readable, translated text for 98 error codes, cross-checked against two independent sources. Thanks to krobipd.
- Added a fallback so `status.state`/`status.battery-level` still populate on models whose regular status poll omits them (e.g. Aqua10 Ultra / r95475). Thanks to krobipd.
- Added `remote.go-to-point` (x/y/use-current-position/start): send the robot to a stored map coordinate to look around, without cleaning on the way. Thanks to krobipd.
- Added per-device `info.online` reachability state with one log line per online/offline transition, replacing silent timeout logging.
- Bumped `pako` (map data compression) from 2.x to 3.x.

### 0.4.0 (2026-07-31)
- Modular widget rebuild: customizable appearance (light/dark/main-color/custom themes), configurable panels, kiosk mode with URL-based configuration sharing, robot switcher for multi-device setups.

### 0.3.26 (2026-07-20)
- Fixed stream-status (siid 10001 piid 1) type warning: the value is a streaming-session object, not a number - state declaration corrected to type string / role json, matching the convention used for dnd-task, task-info and zone-status (#82). The boolean type mismatch reported by flapman on remote.auto-dust-collecting, mopping-with-detergent, hair-compression, silent-drying, auto-lds-coverage and clean-carpets-first is already covered by the boolean coercion added in 0.3.25 - please update. Thanks to krobipd for reporting the exact device payload and preparing the fix.

### 0.3.25 (2026-07-20)
- Fixed room-specific cleaning settings being written to the wrong room (cleanset used RoomOrder instead of the real room id) (#95). Fixed boolean switches being rejected by the device - values are now sent as 1/0 (#94). Fixed adapter reboot loop on devices without a generated map, e.g. MOVA Z70 (#83). Fixed multi-room cleaning only cleaning the first selected room on 5th gen devices. Fixed swapped cleaning modes (vacuum/vacuum+mop) on devices with liftable mop pads. Fixed stream-status type warning (#82). German translation: renamed dining hall segment from Speisesaal to Esszimmer. Thanks to RicardoHipp for reporting and analyzing several of these issues.

### 0.3.24 (2026-07-01)
- Fixed custom room cleaning bug where switching active-map without touching a checkbox left customCommand holding room IDs from the previously selected map, causing the robot to clean the wrong room (room segment IDs are not unique across maps). customCommand is now rebuilt automatically whenever active-map changes, and is recomputed fresh from the active map's checkboxes immediately before every start as a final safeguard. Start is now aborted with a warning if no room is selected for the active map.

[Older changelogs can be found there](https://github.com/TA2k/ioBroker.dreame/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 TA2k <tombox2020@gmail.com>

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