---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwift/README.md
title: ioBroker.zwift
hash: BlDoN8IB4EAKqGtdVsmqVuIBFoomVDdV3NjqxeJZd0w=
---
![Logo](../../../en/adapterref/iobroker.zwift/admin/zwift.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zwift.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwift.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zwift-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zwift-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwift.png?downloads=true)
![Test und Freigabe](https://github.com/Flixhummel/ioBroker.zwift/workflows/Test%20and%20Release/badge.svg)

# ioBroker.zwift

## Zwift-Adapter für ioBroker

Fragt die Zwift-API nach Live-Trainingsdaten ab und stellt diese als ioBroker-Zustände zur Verfügung. Verfolge deine Leistung, Herzfrequenz, Trittfrequenz, Geschwindigkeit und mehr in Echtzeit während deiner Fahrt auf Zwift.

### Merkmale

- Live-Fahrerdaten werden alle 5 Sekunden aktualisiert (konfigurierbar).
- Leistungszonenberechnung in Echtzeit (Coggan 6-Zonen-Modell, FTP wird automatisch aus Ihrem Zwift-Profil ausgelesen)
- Umfassende Zwift-Profildaten: Identität, Radsportstatistiken, Laufstatistiken, Trikots, Drops, Serien
- Verbindungsstatusanzeige (`info.connection` )
- Automatische Token-Aktualisierung mit erneuter Authentifizierung als Fallback
- Verschlüsselte Speicherung von Anmeldeinformationen
- Metadatenaktualisierungen werden beim Neustart des Adapters automatisch angewendet (Einheitenkorrekturen, neue Felder).

### Konfiguration

| Einstellung              | Beschreibung                                        | Standard |
| ------------------------ | --------------------------------------------------- | -------- |
| **Zwift-E-Mail**         | Ihre Zwift-Konto-E-Mail                             | —        |
| **Zwift-Passwort**       | Ihr Zwift-Kontopasswort (verschlüsselt gespeichert) | —        |
| **Abstimmungsintervall** | Häufigkeit des Datenabrufs in Sekunden (3–300)      | 5        |

### Staaten

#### Fahrerdaten (werden in jedem Umfragezyklus aktualisiert)

| Zustand           | Einheit | Beschreibung                                                    |
| ----------------- | ------- | --------------------------------------------------------------- |
| `isRiding`        | —       | `true` wenn aktiv in einer Zwift-Welt                           |
| `power`           | W       | Aktuelle Ausgangsleistung                                       |
| `powerZone`       | —       | Aktuelle Leistungszone (1-6, Coggan-Modell, siehe unten)        |
| `heartrate`       | bpm     | Aktuelle Herzfrequenz                                           |
| `cadence`         | U/min   | Aktuelle Kadenz                                                 |
| `speed`           | km/h    | Aktuelle Geschwindigkeit                                        |
| `distance`        | km      | Zurückgelegte Strecke in der aktuellen Aktivität                |
| `altitude`        | M       | Aktuelle Höhe                                                   |
| `climbing`        | M       | Gesamter Höhengewinn in der aktuellen Aktivität                 |
| `gradient`        | %       | Aktuelles Gefälle/Neigung (positiv = bergauf, negativ = bergab) |
| `calories`        | kJ      | Verbrannte Kalorien (entspricht der Anzeige in Zwift im Spiel)  |
| `time`            | S       | Verstrichene Fahrzeit                                           |
| `laps`            | —       | Abgeschlossene Runden                                           |
| `progress`        | —       | Streckenfortschritt (Rohwert von Zwift)                         |
| `sport`           | —       | Sportart (0 = Radfahren)                                        |
| `groupId`         | —       | Gruppen-/Ereignis-ID (0 = keine Gruppe)                         |
| `x` ,`y`          | —       | Weltpositionskoordinaten                                        |
| `heading`         | —       | Fahrtrichtung                                                   |
| `lean`            | —       | Schräglage                                                      |
| `watchingRiderId` | —       | ID des beobachteten Fahrers                                     |
| `rideOns`         | —       | Ride On zählt                                                   |
| `courseId`        | —       | Aktuelle Kurs-ID                                                |
| `roadId`          | —       | Aktuelle Straßenkennung                                         |

#### Stromzonen

Der`powerZone` Der Leistungsstatus basiert auf dem Coggan-6-Zonen-Modell und wird automatisch anhand Ihrer aktuellen Leistung und Ihres FTP-Wertes berechnet. Der FTP-Wert wird aus Ihrem Zwift-Profil ausgelesen – eine manuelle Konfiguration ist nicht erforderlich.

| Zone | Name               | % der FTP |
| ---- | ------------------ | --------- |
| 1    | Aktive Erholung    | < 55 %    |
| 2    | Ausdauer           | 55-75%    |
| 3    | Tempo              | 76-90%    |
| 4    | Laktatschwelle     | 91-105%   |
| 5    | VO2 Max            | 106-120%  |
| 6    | Anaerobe Kapazität | > 120%    |

Wenn in Ihrem Zwift-Profil kein FTP-Server eingestellt ist,`powerZone` Der Status wird nicht aktualisiert.

#### Profildaten (werden einmalig beim Verbindungsaufbau abgerufen)

| Zustand                             | Einheit | Beschreibung                                   |
| ----------------------------------- | ------- | ---------------------------------------------- |
| `profile.id`                        | —       | Zwift-Spieler-ID                               |
| `profile.firstName`                 | —       | Vorname                                        |
| `profile.lastName`                  | —       | Nachname                                       |
| `profile.weight`                    | kg      | Gewicht                                        |
| `profile.height`                    | cm      | Höhe                                           |
| `profile.age`                       | —       | Alter                                          |
| `profile.male`                      | —       | Geschlechtsindikator                           |
| `profile.countryCode`               | —       | Landesvorwahl                                  |
| `profile.ftp`                       | W       | Funktionelle Schwellenleistung                 |
| `profile.totalDistance`             | km      | Allzeitdistanz                                 |
| `profile.totalDistanceClimbed`      | M       | Gesamter Höhengewinn                           |
| `profile.totalTimeInMinutes`        | min     | Gesamtfahrzeit                                 |
| `profile.totalWattHours`            | Wh      | Gesamtwattstunden                              |
| `profile.totalExperiencePoints`     | —       | Gesamt-EP                                      |
| `profile.targetExperiencePoints`    | —       | XP für die nächste Stufe erforderlich          |
| `profile.achievementLevel`          | —       | Aktuelles Niveau                               |
| `profile.totalGold`                 | —       | Gesamte Beute (Spielwährung)                   |
| `profile.totalInKomJersey`          | —       | Times worn KOM-Trikot                          |
| `profile.totalInSprintersJersey`    | —       | Times getragenes Sprinters-Trikot              |
| `profile.totalInOrangeJersey`       | —       | Das orangefarbene Trikot wurde so oft getragen |
| `profile.runAchievementLevel`       | —       | Aktueller Ausführungsstand                     |
| `profile.totalRunDistance`          | km      | Gesamtlaufstrecke                              |
| `profile.totalRunTimeInMinutes`     | min     | Gesamtlaufzeit                                 |
| `profile.totalRunExperiencePoints`  | —       | Gesamtlauf-XP                                  |
| `profile.targetRunExperiencePoints` | —       | Für die nächste Stufe wird Run XP benötigt.    |
| `profile.totalRunCalories`          | kJ      | Kalorienverbrauch beim Laufen (gesamt)         |
| `profile.streaksCurrentLength`      | —       | Länge der aktuellen Aktivitätsserie            |
| `profile.streaksMaxLength`          | —       | Längste Aktivitätsserie                        |
| `profile.streaksLastRideTimestamp`  | —       | Zeitstempel der letzten Fahrt in der Serie     |
| `profile.currentActivityId`         | —       | Aktuelle Aktivitäts-ID                         |
| `profile.powerSource`               | —       | Art der Stromquelle                            |

### So funktioniert es

Der Adapter authentifiziert sich bei der Zwift-API über denselben Endpunkt wie die Zwift Companion-App (`client_id=Zwift_Mobile_Link` Beim Start ruft es Ihr Zwift-Profil (einschließlich FTP) ab und fragt dann den Fahrerstatus über den Spiel-Relay-Server ab, dekodiert die Protobuf-Antwort, wandelt Rohwerte in für Menschen lesbare Einheiten um und aktualisiert den ioBroker-Zustandsbaum.

Wenn in Ihrem Profil ein FTP-Wert festgelegt ist, berechnet der Adapter einen Live-Wert.`powerZone` (1–6) bei jedem Abfragezyklus unter Verwendung des Coggan-Leistungszonenmodells. Eine manuelle FTP-Konfiguration ist nicht erforderlich.

Wenn Sie nicht aktiv in Zwift fahren, werden die Adaptersets`isRiding` Zu`false` und setzt die Abfrage fehlerfrei fort.

**Technischer Hinweis:** Statusobjekte werden erstellt mit`extendObjectAsync` statt`setObjectNotExistsAsync` Das bedeutet, dass Metadatenänderungen (korrigierte Einheiten, umbenannte Zustände, neue Felder) bei jedem Neustart des Adapters automatisch angewendet werden. Objekte müssen nach einem Update nicht gelöscht und neu erstellt werden.

### Smart-Home-Ideen

Da Ihre Zwift-Daten laut ioBroker verfügbar sind, können Sie Automatisierungen erstellen, die Ihr Indoor-Training im ganzen Haus erlebbar machen.

**Immersive Beleuchtung**

- Passen Sie Ihre LED-Streifen oder Hue-Lampen an die Herzfrequenzzonen an – blau für Erholung, grün für Ausdauer, gelb für Tempo, rot für Schwellentraining, blinkend rot für VO2max.
- Verwenden Sie die`powerZone` Zustand (1-6) zur direkten Steuerung von Farbschemata – keine Skripterstellung zur Zonenberechnung erforderlich
- Die Lichtfarbe ändert sich mit der Leistungsaufnahme – je stärker die Leistung, desto intensiver das Leuchten.
- Höhe durch Lichthelligkeit simulieren – beim Aufstieg dimmen, beim Abstieg aufhellen.
- Lass die Zimmerbeleuchtung blinken, wenn du ein Ride On erhältst.

**Adaptives Audio**

- Automatischer Wechsel der Wiedergabelisten basierend auf Ihrer Herzfrequenzzone oder Leistung – entspannte Beats zum Aufwärmen, hohe BPM für Intervalle.
- Spiele einen Soundeffekt ab, wenn du eine Runde abgeschlossen oder einen bestimmten Kalorienbedarf erreicht hast.
- Geben Sie Ihre aktuellen Statistiken in regelmäßigen Abständen per Text-zu-Sprache-Ansage bekannt.

**Dashboards und Anzeigen**

- Live-Leistung, Herzfrequenz, Geschwindigkeit und Trittfrequenz werden auf einem an der Wand montierten Tablet oder einem Smart-Display angezeigt.
- Zeigen Sie Distanz, Höhenmeter und Kalorienverbrauch auf einem Infopanel in Ihrer Schmerzhöhle an.
- Erstellen Sie ein VIS-Dashboard mit Ihren Gesamtstatistiken aus den Profildaten – Gesamtkilometer, Gesamthöhenmeter, XP-Level

**Klimaanlage**

- Schalten Sie einen intelligenten Ventilator ein, sobald Ihre Herzfrequenz einen bestimmten Schwellenwert überschreitet, und schalten Sie ihn während der Ruhephasen aus.
- Erhöhen Sie die Lüfterdrehzahl proportional zur Leistung.
- Die Klimaanlage wird aktiviert, sobald ein bestimmter Kalorienverbrauch überschritten wird.

**Heimwerkerbedarf**

- Nutzen Sie die Höhen-/Steigungsdaten, um einen selbstgebauten Trainer-Wipp- oder Neigungsmechanismus anzusteuern – bauen Sie Ihren eigenen Klettersimulator ähnlich dem Wahoo KICKR CLIMB.
- Steuere einen Servo- oder Linearantrieb über ioBroker, um den Rahmen deines Fahrrads in Echtzeit an die sich ändernde Steigung im Spiel anzupassen.

**Motivation und Gamifizierung**

- Lass eine Konfettimaschine oder Partylichter zünden, wenn du eine Fahrt beendest oder eine persönliche Bestleistung erreichst.
- Sende dir selbst eine Telegram- oder Pushover-Benachrichtigung mit deiner Fahrtzusammenfassung, wenn`isRiding` wechselt zu`false`
- Verfolgen Sie Ihre wöchentliche Distanz auf einer Sieben-Segment-Anzeige oder einem E-Ink-Bildschirm im Flur.
- Ein Fortschrittsbalken (LED-Streifen) zeigt den prozentualen Fortschritt Ihrer Route an.

**Familie und Haushalt**

- Bringen Sie eine „Bitte nicht stören“-Anzeigeleuchte außerhalb Ihres Zimmers an, wann immer`isRiding` Ist`true`
- Schalte deine Türklingel während einer Zwift-Session automatisch stumm.
- Sende eine Nachricht an den Smart Speaker deiner Familie: „Papa fährt Zwift, voraussichtliche Ankunftszeit: X Minuten“

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-04-19)
* Add `gradient` state (current slope in %, computed from altitude/distance deltas with a 5 m threshold, clamped to ±50 %)

### 0.1.2 (2026-03-03)
* Set up trusted publishing via OIDC for GitHub Actions deploy

### 0.1.1 (2026-03-03)
* Fix ESLint curly and prettier errors for CI

### 0.1.0 (2026-03-03)
* Poll Zwift API for live ride data (power, heartrate, cadence, speed, distance, altitude, climbing)
* Zwift profile data (FTP, weight, height, level, total stats)
* Power zone calculation based on FTP (Coggan 6-zone model)
* Configurable polling interval

### 0.0.1 (2026-03-02)
* (Flixhummel) initial release

## License
MIT License

Copyright (c) 2026 Flixhummel <hummelimages@googlemail.com>

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