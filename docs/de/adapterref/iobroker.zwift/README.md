---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwift/README.md
title: ioBroker.zwift
hash: S8apDFfbEgcwgr5LFt4CrRJ/PkngguUVgLtoq+SI7tI=
---
![Logo](../../../en/adapterref/iobroker.zwift/admin/zwift.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zwift.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwift.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zwift-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zwift-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwift.png?downloads=true)

# IoBroker.zwift
**Tests:** ![Test und Freigabe](https://github.com/Flixhummel/ioBroker.zwift/workflows/Test%20and%20Release/badge.svg)

## Zwift-Adapter für ioBroker
Fragt die Zwift-API nach Live-Trainingsdaten ab und stellt diese als ioBroker-Zustände zur Verfügung. Verfolge deine Leistung, Herzfrequenz, Trittfrequenz, Geschwindigkeit und mehr in Echtzeit während deiner Fahrt auf Zwift.

### Merkmale
- Live-Fahrerdaten werden alle 5 Sekunden aktualisiert (konfigurierbar)
- Echtzeit-Leistungszonenberechnung (Coggan 6-Zonen-Modell, FTP wird automatisch aus Ihrem Zwift-Profil ausgelesen)
- Umfassende Zwift-Profildaten: Identität, Radsportstatistiken, Laufstatistiken, Trikots, Drops, Serien
- Verbindungsstatusanzeige (`info.connection`)
- Automatische Token-Aktualisierung mit erneuter Authentifizierung als Fallback
- Verschlüsselte Speicherung von Anmeldeinformationen
- Metadatenaktualisierungen werden beim Neustart des Adapters automatisch angewendet (Einheitenkorrekturen, neue Felder)

### Konfiguration
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| **Zwift-E-Mail** | Die E-Mail-Adresse Ihres Zwift-Kontos | — |
| **Zwift-Passwort** | Ihr Zwift-Kontopasswort (verschlüsselt gespeichert) | — |
| **Abfrageintervall** | Wie oft Daten abgerufen werden sollen, in Sekunden (3–300) | 5 |

### Staaten
#### Fahrerdaten (werden in jedem Umfragezyklus aktualisiert)
| Bundesland | Einheit | Beschreibung |
|-------|------|-------------|
| `isRiding` | — | `true` wenn aktiv in einer Zwift-Welt |
| `powerZone` | — | Aktuelle Leistungszone (1-6, Coggan-Modell, siehe unten) |
| `heartrate` | bpm | Aktuelle Herzfrequenz |
| `cadence` | U/min | Aktuelle Trittfrequenz |
| `speed` | km/h | Aktuelle Geschwindigkeit |
| `distance` | km | Zurückgelegte Strecke in der aktuellen Aktivität |
| `altitude` | m | Aktuelle Höhe |
| `climbing` | m | Gesamter Höhengewinn in der aktuellen Aktivität |
| `gradient` | % | Aktuelle Steigung (positiv = bergauf, negativ = bergab) |
| `calories` | kJ | Verbrannte Kalorien (entspricht der Anzeige in Zwift im Spiel) |
| `time` | s | Vergangene Fahrzeit |
| `laps` | — | Abgeschlossene Runden |
| `progress` | — | Routenfortschritt (Rohwert von Zwift) |
| `sport` | — | Sportart (0 = Radfahren) |
| `groupId` | — | Gruppen-/Ereignis-ID (0 = keine Gruppe) |
| `x`, `y` | — | Weltpositionskoordinaten |
| `heading` | — | Fahrtrichtung |
| `lean` | — | Schräglage |
| `watchingRiderId` | — | ID des beobachteten Fahrers |
| `rideOns` | — | Anzahl der Fahrten |
| `courseId` | — | Aktuelle Kurs-ID |
| `roadId` | — | Aktuelle Straßen-ID |
| `roadId` | — | Aktuelle Straßen-ID |

#### Stromzonen
Der Zustand `powerZone` basiert auf dem Coggan-6-Zonen-Modell und wird automatisch aus Ihrer aktuellen Leistung und Ihrem FTP-Wert berechnet. Der FTP-Wert wird aus Ihrem Zwift-Profil ausgelesen – eine manuelle Konfiguration ist nicht erforderlich.

| Zone | Name | % des FTP-Verkehrs |
|------|------|----------|
| 1 | Aktive Erholung | < 55 % |
| 2 | Ausdauer | 55-75% |
| 3 | Tempo | 76-90% |
| 4 | Laktatschwelle | 91-105% |
| 5 | VO2 Max | 106-120% |
| 6 | Anaerobe Kapazität | > 120% |

Wenn in Ihrem Zwift-Profil kein FTP-Server eingestellt ist, wird der Status `powerZone` nicht aktualisiert.

#### Profildaten (werden einmalig beim Verbindungsaufbau abgerufen)
| Bundesland | Einheit | Beschreibung |
|-------|------|-------------|
| `profile.id` | — | Zwift-Spieler-ID |
| `profile.lastName` | — | Nachname |
| `profile.weight` | kg | Gewicht |
| `profile.height` | cm | Höhe |
| `profile.age` | — | Alter |
| `profile.male` | — | Geschlechtsindikator |
| `profile.countryCode` | — | Ländervorwahl |
| `profile.ftp` | W | Funktionsschwellenleistung |
| `profile.totalDistance` | km | Gesamtdistanz |
| `profile.totalDistanceClimbed` | m | Gesamter Höhengewinn |
| `profile.totalTimeInMinutes` | min | Gesamtfahrzeit |
| `profile.totalWattHours` | Wh | Gesamtwattstunden |
| `profile.totalExperiencePoints` | — | Gesamt-EP |
| `profile.targetExperiencePoints` | — | Für das nächste Level benötigte XP |
| `profile.achievementLevel` | — | Aktuelles Level |
| `profile.totalGold` | — | Gesamte Beute (Spielwährung) |
| `profile.totalInKomJersey` | — | Anzahl der getragenen KOM-Trikots |
| `profile.totalInSprintersJersey` | — | Anzahl der getragenen Sprinters-Trikots |
| `profile.totalInOrangeJersey` | — | Anzahl der getragenen Orange-Trikots |
| `profile.runAchievementLevel` | — | Aktueller Runlevel |
| `profile.totalRunDistance` | km | Gesamtlaufstrecke |
| `profile.totalRunTimeInMinutes` | min | Gesamtlaufzeit |
| `profile.totalRunExperiencePoints` | — | Gesamt-EP |
| `profile.targetRunExperiencePoints` | — | Für das nächste Level wird Run XP benötigt |
| `profile.totalRunCalories` | kJ | Kalorienverbrauch beim Laufen (gesamt) |
| `profile.streaksCurrentLength` | — | Aktuelle Aktivitätsserienlänge |
| `profile.streaksMaxLength` | — | Längste Aktivitätsserie |
| `profile.streaksLastRideTimestamp` | — | Zeitstempel der letzten Fahrt in der Serie |
| `profile.currentActivityId` | — | Aktuelle Aktivitäts-ID |
| `profile.powerSource` | — | Art der Stromquelle |
| `profile.powerSource` | — | Art der Stromquelle |

### So funktioniert es
Der Adapter authentifiziert sich bei der Zwift-API über denselben Endpunkt wie die Zwift Companion App (`client_id=Zwift_Mobile_Link`). Beim Start ruft er Ihr Zwift-Profil (inklusive FTP) ab, fragt anschließend den Fahrerstatus über den Spiel-Relay-Server ab, dekodiert die Protobuf-Antwort, wandelt die Rohwerte in lesbare Einheiten um und aktualisiert den ioBroker-Zustandsbaum.

Wenn in Ihrem Profil ein FTP-Wert festgelegt ist, berechnet der Adapter bei jedem Abfragezyklus einen aktuellen Wert für `powerZone` (1–6) anhand des Coggan-Leistungszonenmodells. Eine manuelle FTP-Konfiguration ist nicht erforderlich.

Wenn Sie in Zwift nicht aktiv fahren, setzt der Adapter `isRiding` auf `false` und fährt mit dem Abfragen fort, ohne Fehler zu verursachen.

**Technischer Hinweis:** Statusobjekte werden mit `extendObjectAsync` anstatt mit `setObjectNotExistsAsync` erstellt. Das bedeutet, dass Metadatenänderungen (korrigierte Einheiten, umbenannte Status, neue Felder) bei jedem Neustart des Adapters automatisch angewendet werden. Sie müssen Objekte nach einem Update nicht löschen und neu erstellen.

### Smart-Home-Ideen
Da Ihre Zwift-Daten laut ioBroker verfügbar sind, können Sie Automatisierungen erstellen, die Ihr Indoor-Training im ganzen Haus erlebbar machen.

**Immersive Beleuchtung**

Passen Sie Ihre LED-Streifen oder Hue-Lampen an die Herzfrequenzzonen an – blau für Erholung, grün für Ausdauer, gelb für Tempo, rot für Schwellentraining, blinkend rot für VO2max.
- Verwenden Sie den `powerZone`-Zustand (1-6), um Farbschemata direkt zu steuern – Sie müssen keine Skripte erstellen, um die Zonen selbst zu berechnen.
Die Lichtfarbe ändert sich mit der Leistungsaufnahme – je höher die Leistungsaufnahme, desto intensiver das Leuchten.
- Höhe durch Lichthelligkeit simulieren – beim Aufstieg abdunkeln, beim Abstieg aufhellen.
- Lass deine Zimmerbeleuchtung blinken, wenn du ein Ride On erhältst

**Adaptives Audio**

- Automatischer Wechsel der Wiedergabelisten basierend auf Ihrer Herzfrequenzzone oder Leistung – entspannte Beats zum Aufwärmen, hohe BPM für Intervalle.
- Spiele einen Soundeffekt ab, wenn du eine Runde abgeschlossen oder einen bestimmten Kalorienbedarf erreicht hast.
- Geben Sie Ihre aktuellen Statistiken in regelmäßigen Abständen per Text-zu-Sprache-Ausgabe bekannt.

**Armaturenbretter und Displays**

- Anzeige von Live-Leistung, Herzfrequenz, Geschwindigkeit und Trittfrequenz auf einem an der Wand montierten Tablet oder Smart-Display
- Zeigt zurückgelegte Distanz, Höhenmeter und Kalorienverbrauch auf einem Infopanel in deiner Schmerzhöhle an
- Erstelle ein VIS-Dashboard mit deinen Gesamtstatistiken aus den Profildaten – Gesamtkilometer, Gesamthöhenmeter, XP-Level

**Klimakontrolle**

- Schalten Sie einen intelligenten Ventilator ein, wenn Ihre Herzfrequenz einen bestimmten Schwellenwert überschreitet, und schalten Sie ihn während der Ruhephasen aus.
- Erhöhen Sie die Lüfterdrehzahl proportional zur Leistungsaufnahme.
- Aktivieren Sie die Klimaanlage, sobald ein bestimmter Kalorienverbrauch überschritten wird.

**DIY-Hardware**

- Verwenden Sie die Höhen-/Steigungsdaten, um einen selbstgebauten Trainer-Wipp- oder Neigungsmechanismus anzusteuern – bauen Sie Ihren eigenen Klettersimulator ähnlich dem Wahoo KICKR CLIMB.
- Steuere einen Servo- oder Linearantrieb über ioBroker, um den Rahmen deines Fahrrads in Echtzeit an die sich ändernde Steigung im Spiel anzupassen.

**Motivation und Gamifizierung**

- Aktiviere eine Konfettimaschine oder Partylichter, wenn du eine Fahrt beendest oder eine persönliche Bestleistung erreichst.
- Sende dir selbst eine Telegram- oder Pushover-Benachrichtigung mit deiner Fahrtzusammenfassung, wenn `isRiding` auf `false` wechselt.
- Verfolgen Sie Ihre wöchentliche Distanz auf einer Sieben-Segment-Anzeige oder einem E-Ink-Bildschirm im Flur
- Ein Fortschrittsbalken (LED-Streifen) zeigt den prozentualen Fortschritt Ihrer Route an.

**Familie und Haushalt**

- Stellen Sie eine "Bitte nicht stören"-Anzeigeleuchte außerhalb Ihres Zimmers ein, die immer dann aufleuchtet, wenn `isRiding` auf `true` gesetzt ist.
- Schalte deine Türklingel während einer Zwift-Session automatisch stumm.
- Sende eine Nachricht an den Smart Speaker deiner Familie: "Papa fährt Zwift, voraussichtliche Ankunftszeit in X Minuten"

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