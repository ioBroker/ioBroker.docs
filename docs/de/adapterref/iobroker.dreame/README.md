---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: naCLadNH5twq/v+MT5/mrkqMaQZI642DviDDAUn+ZI0=
---
![Logo](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.dreame.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![Anzahl der Installationen](https://iobroker.live/badges/dreame-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/dreame-stable.svg)
![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)

# IoBroker.dreame
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Dreame-Adapter für ioBroker
Adapter für Dreame und MOVA Saugroboter und Mähroboter.

**Unterstützte Marken:** Dreame, MOVA (in den Adaptereinstellungen auswählen)

**Getestet mit:** L10, L20, X40, A2 1200 (Rasenmäher), MOVA 600, MOVA 1000

---

## Installation
### Über ioBroker Admin (empfohlen)
1. Stellen Sie sicher, dass das Repository „Neueste Version“ unter aktiv ist.

Admin → Einstellungen → Repositories

2. Gehen Sie zum Tab „Adapter“ und suchen Sie nach „dreame“.
3. Klicken Sie auf Installieren

Der Adapter ist aktuell im **neuesten** Repository verfügbar. Die Aufnahme in das stabile Repository wurde beantragt (siehe Status unter https://github.com/ioBroker/ioBroker.repositories/pull/6200).

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
| Schauplatz | Beschreibung |
| --------------- | --------------------------------------------------- |
| Cloud-Service | Wählen Sie je nach App **Dreame** oder **MOVA** aus |
| App-E-Mail | Ihre Dreame/MOVA-App-Anmelde-E-Mail |
| App-Passwort | Ihr Dreame/MOVA-App-Passwort |
| Karte abrufen | Kartendarstellung aktivieren (höhere CPU-Auslastung) |
| Aktualisierungsintervall | Abfrageintervall in Minuten |

MOVA-Geräte (600, 1000) nutzen dasselbe Cloud-Backend wie Dreame, jedoch mit unterschiedlichen Domains. Wählen Sie **MOVA**, wenn Sie die MOVA-App verwenden.

---

## Vakuum (L10, L20, X40, ...)
Der Adapter erstellt Zustände für Saugroboter verzögert – nur die von Ihrem Gerät tatsächlich gemeldeten Eigenschaften erscheinen im Objektbaum. Die Zustände werden nach dem Start des Adapters und nach dem ersten Abfragezyklus schrittweise gefüllt. Die folgenden Tabellen zeigen alle bekannten möglichen Zustände; Ihr Gerät meldet möglicherweise nur eine Teilmenge.

### Vakuumstatus
| Bundesland | Beschreibung |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Status | Roboterstatus (1=Reinigung, 2=Standby, 3=Pause, 5=Rückkehr, 6=Laden, 7=Wischen, 8=Trocknen, 9=Waschen, ...) |
| Fehler | Fehlercode |
| Akkustand | Akkuprozentsatz |
| Ladestatus | 1=Wird geladen, 2=Wird nicht geladen, 3=Abgeschlossen, 5=Zurück zum Ladegerät |
| Status | Reinigungsstatus (0=Leerlauf, 1=Angehalten, 2=Reinigung, 3=Zurück zum Startpunkt, 6=Wird geladen, 18=Segment, 19=Zone, 20=Punkt, 21=Kartierung) |
| Reinigungszeit | Aktuelle Reinigungszeit (Min.) |
| gereinigte Fläche | Aktuell gereinigte Fläche (m²) |
| Reinigungsfortschritt | Reinigungsfortschritt (%) |
| Trocknungsfortschritt | Trocknungsfortschritt (%) |
| Aufgabenstatus | Aufgabe (0=Abgeschlossen, 1=Automatisch, 2=Zone, 3=Segment, 4=Punkt, 5=Kartierung) |
| Aufgabentyp | Aufgabentyp |
| Seriennummer | Seriennummer |
| Fehler | Fehlerdetails |
| Warnstatus | Warnstatus |
| Wassertank | 0=Nicht installiert, 1=Installiert, 10=Wischmopp installiert |
| Status der Selbstwaschanlage | Status der Selbstwaschanlage |
| Wischmopp im Bahnhof | Wischmopp im Bahnhof |
| Moppbezug installiert | Moppbezug installiert |
| Entwässerungsstatus | Entwässerungsstatus |
| Gerätefähigkeit | Gerätefähigkeitsflags |

#### Verbrauchsmaterialien
| Bundesland | Beschreibung |
| ---------------------- | ------------------------ |
| Hauptbürste links | Lebensdauer der Hauptbürste (%) |
| main-brush-time-left | Verbleibende Zeit für den Hauptpinsel (h) |
| Seitenbürste links | Lebensdauer der Seitenbürste (%) |
| verbleibende Seitenbürstenzeit | Verbleibende Seitenbürstenzeit (h) |
| Filter links | Filterlebensdauer (%) |
| verbleibende Filterzeit | Verbleibende Filterzeit (h) |
| Sensor-verschmutzt-links | Sensorlebensdauer (%) |
| sensor-dirty-time-left | Verbleibende Sensorzeit (h) |
| Rad links verschmutzt | Radlebensdauer (%) |

#### Stationsstatus
| Bundesland | Beschreibung |
| ----------------------- | ----------------------------------------- |
| Status des Frischwassertanks | 0=Installiert, 1=Nicht installiert, 2=Niedriger Wasserstand |
| Status des Schmutzwassertanks | 0=Installiert, 1=Nicht installiert oder voll |
| Staubbeutelstatus | 0=Installiert, 1=Nicht installiert, 2=Prüfen |
| Waschmittelstatus | Waschmittelstatus |
| Warmwasserstatus | Warmwasserstatus |

#### Statistiken
| Bundesland | Beschreibung |
| ------------------- | ------------------------------------ |
| first-cleaning-date | Datum der ersten Reinigung (Unix-Zeitstempel) |
| Gesamtreinigungszeit | Gesamtreinigungszeit (Min.) |
| Reinigungsanzahl | Gesamtzahl der Reinigungen |
| Gesamtreinigungsfläche | Gesamtreinigungsfläche (m²) |

#### AutoSwitch analysierte Werte
Diese werden aus dem `auto-switch-settings` JSON extrahiert und stehen als einzelne Zustände zur Verfügung:

| Bundesland | Beschreibung |
| ------------------- | ---------------------------------------------- |
| automatische Trocknung | Automatische Trocknung: 0=aus, 1=ein |
| Kollisionsvermeidung | Kollisionsvermeidung: 0=aus, 1=ein |
| Aufhelllicht | Aufhelllicht im Dunkeln: 0=aus, 1=an |
| Fleckenvermeidung | Fleckenvermeidung: 0=aus, 1=ein |
| Wischtyp | 0=Täglich, 1=Genau, 2=Gründlich |
| clean-genius | CleanGenius: 0=Aus, 1=Routine, 2=Intensiv |
| Reinigungsroute | 1=Standard, 2=Intensiv, 3=Gründlich, 4=Schnell |
| breitere Ecken | Eckabdeckung: 0=Aus, 1=Hohe Frequenz, -7=Niedrige Frequenz |
| Bodenrichtung | Reinigung in Bodenrichtung: 0=aus, 1=ein |
| Haustierorientiert | Haustierorientierte Reinigung: 0=aus, 1=ein |
| maximale Saugkraft | Maximale Saugleistung: 0=aus, 1=ein |
| Heißwäsche | Heißwäsche: 0=aus, 1=ein |
| UV-Sterilisation | UV-Sterilisation: 0=aus, 1=ein |
| Ultra-Reinigungsmodus | Ultra-Reinigungsmodus: 0=aus, 1=ein |
| mop-extend | Mop-Verlängerung: 0=aus, 1=ein |
| Intelligentes Laden | Intelligentes Laden: 0=aus, 1=ein |

### Fernbedienung für Staubsauger
| Bundesland | Beschreibung |
| ---------------------- | ----------------------------------------------------- |
| Saugstärke | 0=Leise, 1=Standard, 2=Stark, 3=Turbo |
| Wassermenge | 1=Niedrig, 2=Mittel, 3=Hoch |
| Reinigungsmodus | 0=Kehren, 1=Wischen, 2=Kehren + Wischen, 3=Wischen nach dem Kehren |
| Teppichverstärkung | Teppichverstärkung ein/aus |
| Hindernisvermeidung | Hindernisvermeidung ein/aus |
| KI-Erkennung | KI-Erkennungs-Bitfeld |
| Kindersicherung | Kindersicherung ein/aus |
| Teppichempfindlichkeit | 1=Niedrig, 2=Mittel, 3=Hoch |
| Teppicherkennung | Teppicherkennung ein/aus |
| Teppichreinigung | 0=Vermeiden, 1=Anpassen, 2=Ignorieren |
| Selbstreinigung | Selbstreinigung ein/aus |
| Trocknungszeit | 2=2h, 3=3h, 4=4h |
| Auto-Moop-Montage | Automatischer Mopp-Montagemechanismus ein/aus |
| Wischmopp-Waschstufe | Wischmopp-Waschstufe |
| Automatische Wassernachfüllung | Automatische Wassernachfüllung ein/aus |
| Automatische Waschmittelzugabe | Automatische Waschmittelzugabe ein/aus |
| Nicht stören aktivieren | Nicht stören ein/aus |
| D&D-Start / D&D-Ende | D&D-Zeitraum |
| Lautstärke | Lautstärkepegel |
| Automatische Staubabsaugung | Automatische Staubabsaugung ein/aus |
| automatische Entleerungsfrequenz | Automatische Entleerungsfrequenz |
| Feuchtigkeitsgrad | Feuchtigkeitsgrad (1–32) |
| cleangenius-Modus | 0=Aus, 1=Routine, 2=Tief |
| Wassertemperatur | 0=Kalt, 1=Warm, 2=Heiß, 3=Kochend |
| Geräuschloses Trocknen | Geräuschloses Trocknen ein/aus |
| Haarkompression | Haarkompression ein/aus |
| Wischen mit Reinigungsmittel | Wischen mit Reinigungsmittel ein/aus |

#### AutoSwitch-Set-Befehle
Diese schreiben direkt in die AutoSwitch-Einstellungen des Geräts (Eigenschaft 4-50):

| Bundesland | Beschreibung |
| --------------------------- | ------------------------------------------------------------ |
| automatische Trocknung einstellen | Automatische Trocknung einstellen: 0=aus, 1=ein |
| set-collision-avoidance | Kollisionsvermeidung einstellen: 0=aus, 1=ein |
| set-fill-light | Fülllicht einstellen: 0=aus, 1=ein |
| Fleckenvermeidung einstellen | Fleckenvermeidung einstellen: 0=aus, 1=ein |
| set-mopping-type | Wischtyp festlegen: 0=Täglich, 1=Genau, 2=Tiefenreinigung |
| set-clean-genius | CleanGenius einstellen: 0=Aus, 1=Routine, 2=Tiefenreinigung |
| Reinigungsroute festlegen | Reinigungsroute festlegen: 1=Standard, 2=Intensiv, 3=Gründlich, 4=Schnell |
| set-wider-corner | Breitere Ecken einstellen: 0=Aus, 1=Hohe Frequenz, -7=Niedrige Frequenz |
| set-floor-direction | Bodenrichtung festlegen: 0=aus, 1=ein |
| set-pet-focused | Haustierfokus einstellen: 0=aus, 1=ein |
| set-smart-charging | Intelligentes Laden einstellen: 0=aus, 1=ein |
| Heißwäsche einstellen | Heißwäsche einstellen: 0=aus, 1=ein |
| UV-Sterilisation einstellen | UV-Sterilisation einstellen: 0=aus, 1=ein |
| set-max-suction | Maximale Saugleistung einstellen: 0=aus, 1=ein |
| set-ultra-clean | Ultra-Reinigung einstellen: 0=aus, 1=ein |
| set-mop-extend | Mop-Verlängerung einstellen: 0=aus, 1=ein |
| set-smart-drying | Intelligentes Trocknen einstellen: 0=aus, 1=ein |
| set-self-clean-frequency | 0=Pro Raum, 1=Standard, 2=Hoch |
| set-intensive-carpet | Intensivteppich einstellen: 0=aus, 1=ein |
| set-gap-cleaning | Erweiterung für die Spaltreinigung einstellen: 0=aus, 1=ein |
| set-mopping-under-furniture | Wischen unter Möbeln einstellen: 0=aus, 1=ein |
| set-custom-mopping | Benutzerdefinierten Wischmodus einstellen: 0=aus, 1=ein |

#### Aktionen
**Wichtige Änderung seit Version 0.3.18:** Aktionszustände (`start-clean`, `stop`, > `pause`, `return-to-dock`, `locate`, `start-washing`, `start-auto-empty`, > `clear-warning` und alle Reset-Schaltflächen) sind jetzt **vom Typ Boolean / Rolle Schaltfläche**.

Schreiben Sie `true`, um sie auszulösen. Skripte oder Vis-Widgets, die zuvor einen String-Wert geschrieben haben, müssen aktualisiert werden.

| Bundesland | Beschreibung |
| ------------------ | ------------------------------------------------------ |
| start-clean | Reinigung starten (Schaltfläche) |
| Pause | Reinigung pausieren (Schaltfläche) |
| Stopp | Reinigung stoppen (Taste) |
| Zurück zum Dock | Zurück zum Dock (Schaltfläche) |
| start-custom-clean | Benutzerdefinierte Bereinigung starten (Wert: JSON mit piid/Wert-Paaren) |
| Waschvorgang starten | Wischmopp-Waschvorgang starten (Taste) |
| start-auto-empty | Automatisches Leeren starten (Schaltfläche) |
| lokalisieren | Roboter lokalisieren / Ton abspielen (Taste) |
| Warnung löschen | Warnung löschen (Schaltfläche) |
| reset-main-brush | Hauptpinsel-Verbrauchsmaterial zurücksetzen (Schaltfläche) |
| Seitenbürste zurücksetzen | Verbrauchsmaterial zum Zurücksetzen der Seitenbürste (Taste) |
| Filter zurücksetzen | Verbrauchsmaterial „Filter zurücksetzen“ (Schaltfläche) |
| Reset-Sensor | Verbrauchsmaterial Reset-Sensor (Taster) |
| fetchMap | Karte vom Gerät abrufen (Schaltfläche) |
| customCommand | Benutzerdefinierten MIoT-Befehl senden (JSON) |

#### Zimmerreinigung
`dreame.0.XXXX.remote.start-custom-clean`

```json
[
  { "piid": 1, "value": 18 },
  { "piid": 10, "value": "{\"selects\":[[X,1,3,2,1]]}" }
]
```

X = Raum-ID. Mehrere Räume: `{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}`

#### Schalterbelegung
`dreame.0.XXXXXXX.remote.customCommand`:

```json
{ "siid": 6, "aiid": 2, "in": [{ "piid": 4, "value": "{\"sm\":{},\"mapid\":X}" }] }
```

X = mapId (siehe `dreame.0.XXXX.status.map-list`)

---

### Individuelle Zimmerreinigung
Mit der Funktion **Benutzerdefinierte Raumreinigung** können Sie einzelne Räume auswählen und den Roboter nur in diese Räume schicken, anstatt die gesamte Etage reinigen zu lassen. Saugstärke und Wassermenge gelten global für alle ausgewählten Räume.

#### Schritt-für-Schritt-Anleitung
**a) Benennen Sie Ihre Karte (optional, empfohlen für Haushalte mit mehreren Etagen)**

Wird eine Karte erkannt, wird `map.maps.<id>.mapName` mit dem Platzhalterwert `"Map <id>"` (z. B. `"Map 1"`) erstellt. Dieser Zustand ist direkt beschreibbar – ändern Sie den Wert im ioBroker-Objektbaum in einen aussagekräftigen Wert, z. B. von `"Map 1"` in `"Ground Floor"`. Der Kanalname von `map.maps.<id>` wird automatisch aktualisiert, sobald Sie den neuen Wert speichern. Ein Neustart des Adapters ist nicht erforderlich.

**b) Aktive Karte festlegen**

Schreiben Sie die Karten-ID (z. B. `1`) in `remote.custom-room-cleaning.active-map`. Nur die Räume, die zu dieser Karte gehören, werden beim Start an den Roboter gesendet. Die in Schritt (a) erstellte Karte hilft Ihnen, die ID der jeweiligen Etage zuzuordnen.

**c) Zimmer auswählen**

Unter `remote.custom-room-cleaning.map-<id>/` wird jeder erkannte Raum als boolescher Zustand dargestellt. Die Kanal- und Zustandsnamen zeigen den übersetzten Raumnamen aus der Karte (z. B. `kitchen`, `living-room`, `bathroom`). Die gewünschten Räume werden auf `true` gesetzt.

**d) Saugstärke und Wassermenge einstellen (optional)**

Die Zustände `remote.suction-level` und `remote.water-volume` gelten für alle ausgewählten Räume. Legen Sie diese Werte vor dem Start fest, wenn Sie von den Standardwerten abweichen möchten. Dies sind dieselben Zustände, die auch für die reguläre Reinigung verwendet werden.

**e) Benutzerdefinierten Reinigungsmodus aktivieren**

`remote.customized-cleaning` muss vor dem Start auf `true` gesetzt sein. Andernfalls wird der Startbefehl abgelehnt und eine Warnung protokolliert. Dies ist eine Gerätevoraussetzung und wird nicht automatisch festgelegt.

**f) Starten Sie den Reinigungslauf**

Setzen Sie `remote.custom-room-cleaning.start` auf `true`. Der Adapter erstellt die Raumauswahl anhand der Kontrollkästchen der aktiven Karte, sendet sie an den Roboter und setzt den Zustand `start` automatisch auf `false` zurück.

#### Erweitert: Direkte Bearbeitung von `customCommand`
`remote.custom-room-cleaning.customCommand` enthält die Rohauswahl als JSON-Zeichenkette. Sie können sie auch direkt schreiben, wenn Sie dies bevorzugen:

```json
{"selects":[[roomId, repeats, suctionLevel, waterVolume, index], ...]}
```

Beispiel — Küche (ID 4) einmal bei starker Saugkraft, mittlerer Wassermenge:

```json
{"selects":[[4, 1, 2, 2, 1]]}
```

Die Felder `customCommand` und die Kontrollkästchen für die Räume sind **bidirektional synchronisiert**: Die Bearbeitung eines Feldes aktualisiert automatisch das andere. Durch direktes Schreiben in `customCommand` werden die Kontrollkästchen der aktiven Karte aktualisiert; durch Aktivieren eines Kontrollkästchens wird `customCommand` neu erstellt. Beide Vorgehensweisen sind gleichwertig.

#### Bekannte Einschränkungen
- **Nur globale Saug-/Wasserzufuhr** – Saugstärke und Wassermenge werden für alle ausgewählten Räume identisch eingestellt. Raumspezifische Einstellungen (wie in `map.cleanset.*` angezeigt) werden von dieser Funktion nicht unterstützt.
- **Voraussetzung für `customized-cleaning`** — `remote.customized-cleaning` muss vor dem Start von `start` manuell aktiviert werden. Der Adapter aktiviert es nicht automatisch.
**Mehrgeschossige Nutzung mit einer Karte getestet** – Die Mehrkartenstruktur (eine Kanalgruppe pro Karte) ist vollständig implementiert, jedoch wurde bisher nur der Betrieb mit einer einzelnen Karte umfassend auf realer Hardware getestet. Mehrgeschossige Haushalte mit zwei oder mehr Karten sollten funktionieren, wurden aber noch nicht vollständig verifiziert.

---

## Rasenmäher (A2, A2 1200, ...)
Der Adapter unterstützt Dreame-Mähroboter mit dedizierten Zuständen und Kartendarstellung. Zustände werden verzögert erstellt – nur die vom Gerät tatsächlich gemeldeten Eigenschaften erscheinen im Objektbaum.

### Mäherstatus
| Bundesland | Beschreibung |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Status | Mäherstatus (1=Mäht, 2=Standby, 3=Pausiert, 5=Kehrt zurück, 6=Wird geladen, 11=Kartierung, 13=Geladen, 14=Wird aktualisiert) |
| Fehler | Fehlercode |
| Akkustand | Akkuprozentsatz |
| Ladezustand | Ladezustand |
| Arbeitsmodus | Aktueller Arbeitsmodus |
| Mähzeit | Aktuelle Mähzeit (min) |
| Mähfläche | Aktuell gemähte Fläche (m²) |
| Aufgabenstatus | Aufgabenstatus |
| Fehler | Fehlerdetails |
| Warnstatus | Warnstatus |
| Einstellungen aktualisieren | Einstellungen ändern via MQTT (2-51). Wert: `[en,hours]`=Regen, `0/1`=Frost, `[en,start,end]`=Niedrige Geschwindigkeit |
| Zonenstatus | Mähstatus der Zone pro Bereich |
| KI-Hindernisse | Von der KI erkannte Hindernisse |
| Selbsttest | Ergebnis der Selbsttestdiagnose |
| Gesamt-Mähzeit | Gesamt-Mähzeit (min) |
| Gesamtzahl der Mähvorgänge | Gesamtzahl der Mähvorgänge |
| Regenschutz | Regenschutzeinstellungen (WRP): `[enabled, wait_hours, sensitivity]` |
| Regenschutz | Regenschutzeinstellungen (WRP): `[aktiviert, Wartezeit_Stunden, Empfindlichkeit]` |
| Niedrige Geschwindigkeit | Nachtmodus mit niedriger Geschwindigkeit (NIEDRIG): `[enabled, start_min, end_min]` |
| dnd-Einstellungen | Nicht stören-Einstellungen (DND): `[enabled, start_min, end_min]` |
| battery-config | Batteriekonfiguration (BAT): `[return%, max%, charge_en, ?, start, end]` |
| battery-config | Batteriekonfiguration (BAT): `[return%, max%, charge_en, ?, start, end]` |
| Lautstärke | Lautstärke (VOL): 0-100 |
| child-lock-cfg | Kindersicherung (CLS): 0=aus, 1=ein |
| ai-obstacle-cfg | KI-Hindernisvermeidung (AOP): 0=aus, 1=ein |
| Scheinwerfer | Scheinwerfereinstellungen (LICHT): `[enabled, start, end, l1, l2, l3, l4]` |
| Scheinwerfer | Scheinwerfereinstellungen (LICHT): `[aktiviert, Start, Ende, l1, l2, l3, l4]` |
| Rasenschutz | Rasenschutz (PROT): 0=aus, 1=ein |
| Betriebsstunden des Messers | Betriebsstunden des Messers (max. 100 h) |
| Klingenzustand | Klingenzustand 0-100% |
| Bürstenstunden | Betriebsstunden der Bürste (max. 500 h) |
| Bürstenzustand | Bürstenzustand 0-100% |
| robot-maintenance-hours | Wartungsstunden für den Roboter (max. 60 Stunden) |
| robot-maintenance-health | Roboterwartungszustand 0-100% |
| Kollisionsvermeidung | Kollisionsvermeidung (AutoSwitch LessColl): 0=aus, 1=ein |
| Aufhelllicht | Aufhelllicht (AutoSwitch FillinLight): 0=aus, 1=ein |
| clean-genius | CleanGenius (AutoSwitch SmartHost): 0=Aus, 1=Routine, 2=Tief |
| Reinigungsroute | Reinigungsroute (AutoSwitch CleanRoute): 1=Standard, 2=Intensiv, 3=Tiefenreinigung, 4=Schnell |
| breitere Ecken | Breitere Eckenabdeckung (AutoSwitch MeticulousTwist): 0=Aus, 1=Hohe Frequenz, 7=Niedrige Frequenz |
| Bodenrichtung | Reinigung in Bodenrichtung (AutoSwitch MaterialDirectionClean): 0=aus, 1=ein |
| Haustierorientiert | Haustierorientierte Reinigung (AutoSwitch PetPartClean): 0=aus, 1=ein |
| Automatisches Laden | Automatisches Laden (AutoSwitch SmartCharge): 0=aus, 1=ein |
| Schnitthöhe | Schnitthöhe in mm (VOR) |
| obstacle-distance-cfg | Hindernisabstand in mm (VORHER) |
| Mähmodus | Mähmodus (VOREIN): 0=Standard, 1=Effizient |
| Richtungsänderung | Richtungsänderung (VORHER): 0=automatisch, 1=aus |
| Kantenmähen | Kantenmähen (VORHER): 0=aus, 1=ein |
| Kantenerkennung | Kantenerkennung (PRE): 0=aus, 1=ein |

#### Positions- und Aufgabendaten (Binärprotokoll, live)
Diese Zustände werden aus binären MQTT-Nachrichten befüllt und verzögert erstellt – sie erscheinen erst, nachdem der Rasenmäher seine erste binäre Aktualisierung gesendet hat.

**Aus dem Roboterpositionspaket (SIID 1-5):**

| Bundesland | Beschreibung |
| -------------------- | ------------------------------------------------------------------ |
| robot-position | Aktuelle Roboterposition JSON: `{"x":..., "y":..., "angle":...}` |
| Mähfortschritt | Aktueller Fortschritt (%) |
| gemähte Fläche | Im aktuellen Arbeitsgang bearbeitete Fläche (m²) |
| Mähaufgabe | Vollständige Aufgabendaten im JSON-Format: `{regionId, taskId, percent, total, finish}` |
| Mähaufgabe | Vollständige Aufgabendaten im JSON-Format: `{regionId, taskId, percent, total, finish}` |

**Aus dem Gerätetelemetriepaket (SIID 1-1):**

| Bundesland | Beschreibung |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| dock-position | JSON-Position der Dockingstation/Ladestation: `{"x":..., "y":..., "angle":...}` (wird beim Andocken aktualisiert) |
| Andockstatus | IN_STATION / OUT_OF_STATION / PAUSE_DOCKING / FINISH_DOCKING / DOCKING_FAILED / DOCKING_IN_BASE |
| Standortstatus | Standortstatus (0–3) |
| battery-level-live | Aktueller Akkustand (%) aus binären Telemetriedaten |
| Ladevorgang live | Live-Ladevorgang: 0=Laden nicht, 1=Laden |
| wifi-rssi | WLAN-Signalstärke (dBm) |
| LTE-RSSI | LTE-Signalstärke (dBm) |
| ble-rssi | Bluetooth-Signalstärke (dBm) |
| error-code-binary | Roher Fehlercode aus binären Telemetriedaten |
| Pin-Status | Pin-Status (0/1) |
| Abdocken | Abdocken-Flag (0/1) |
| Kamerastatus | Kamerastatus |

### Fernbedienung für Rasenmäher
| Bundesland | Beschreibung |
| ----------------------- | ------------------------------------------------------------------------ |
| Mähvorgang starten | Mähen starten (Taste) |
| Mähen stoppen | Mähvorgang stoppen (Taste) |
| Mähen pausieren | Mähen pausieren (Taste) |
| Startladung | Zurück zur Ladestation (Taste) |
| start-mow-ext | Benutzerdefinierten Mähvorgang starten (Zonen-/Segmentreinigung mit Parametern) |
| Warnung löschen | Warn-/Fehlerstatus löschen (Schaltfläche) |
| Hindernisvermeidung | Hindernisvermeidung ein/aus |
| KI-Erkennung | KI-Erkennung ein/aus |
| Kindersicherung | Kindersicherung ein/aus |
| Nicht stören aktivieren | Nicht stören ein/aus |
| D&D-Start / D&D-Ende | D&D-Zeitraum |
| Zeitplan | Mähplan |
| set-rain-protection | Regenschutz einstellen: `{"value":1,"time":8,"sen":0}` oder `{"value":0}` |
| set-low-speed | Niedrige Geschwindigkeit für Nacht einstellen: `{"value":1,"time":[1200,480]}` oder `{"value":0}` |
| set-dnd | Nicht stören einstellen: `{"value":1,"time":[1200,480]}` oder `{"value":0}` |
| set-dnd | Nicht stören einstellen: `{"value":1,"time":[1200,480]}` oder `{"value":0}` |
| set-child-lock | Kindersicherung aktivieren: 0=aus, 1=ein |
| Lautstärke einstellen | Lautstärke einstellen: 0-100 |
| set-ai-obstacle | KI-Hindernisvermeidung einstellen: 0=aus, 1=ein |
| set-headlight | Scheinwerfer einstellen: `{"value":1,"time":[480,1200],"light":[1,1,1,1]}` |
| set-headlight | Scheinwerfer einstellen: `{"value":1,"time":[480,1200],"light":[1,1,1,1]}` |
| set-path-display | Pfadanzeige festlegen: 0=aus, 1=ein |
| reset-consumables | Verbrauchsmaterialien zurücksetzen: `{"value":[0,brush,robot]}` |
| reset-consumables | Verbrauchsmaterialien zurücksetzen: `{"value":[0,brush,robot]}` |
| Roboter finden | Roboter suchen (Ton abspielen, Schaltfläche) |
| Verriegelungsroboter | Verriegelungsroboter (Taste) |
| fetchMap | Karte vom Gerät abrufen (Schaltfläche) |
| generate-3dmap | 3D-LIDAR-Karte generieren (Schaltfläche) |
| customCommand | Benutzerdefinierten MIoT-Befehl senden |
| set-collision-avoidance | Kollisionsvermeidung einstellen (AutoSwitch): 0=aus, 1=ein |
| set-fill-light | Fülllicht einstellen (AutoSwitch): 0=aus, 1=ein |
| set-clean-genius | CleanGenius einstellen (AutoSwitch): 0=Aus, 1=Routine, 2=Tiefenreinigung |
| Reinigungsroute festlegen | Reinigungsroute festlegen (Automatische Umschaltung): 1=Standard, 2=Intensiv, 3=Tiefenreinigung, 4=Schnellreinigung |
| set-auto-charging | Automatisches Laden einstellen (AutoSwitch): 0=aus, 1=ein |
| Schnitthöhe einstellen | Schnitthöhe in mm einstellen (VORHERUNG) |
| set-mow-mode | Mähmodus einstellen (VORHER): 0=Standard, 1=Effizient |
| Kantenmähen einstellen | Kantenmähen einstellen (VORHER): 0=aus, 1=ein |
| Kantenerkennung einstellen | Kantenerkennung einstellen (PRE): 0=aus, 1=ein |
| Richtungsänderung einstellen | Richtungsänderung einstellen (VORHERIGUNG): 0=automatisch, 1=aus |
| Mähzone | Ausgewählte Zonen mähen — CSV `"1,3"` oder JSON `"[1,3]"` (o=102) |
| mow-zone | Ausgewählte Zonen mähen — CSV `"1,3"` oder JSON `"[1,3]"` (o=102) |
| Mähplan | Mähen gemäß gespeichertem Plan starten (Schaltfläche, o=104) |
| mow-edge | Mähkontur: JSON `{"edge":[[x,y],...]}` (o=101) |
| Mähfleck | Mähfleckbereich: JSON `{"area":{...}}` (o=103) |
| Mähfleck | Mähfleckbereich: JSON `{"area":{...}}` (o=103) |
| mow-change-map | Aktive Karte wechseln (Nummer, 0-basierter Index, o=200) |

#### Mähen bestimmter Zonen
Jeder auf der Karte definierte Mähbereich wird als eigener Kanal unter `dreame.0.<did>.mower.map.slot<X>.zone<zoneId>` angezeigt. Öffnen Sie den Objektbrowser von ioBroker, navigieren Sie zu Ihrem Mäher und anschließend zu `mower.map`. Dort sehen Sie pro gespeicherter Karte jeweils einen Kanal `slot0`, `slot1` usw. Jeder Slot enthält einen Kanal `zone<N>` pro Mähbereich – beispielsweise `slot0.zone1`, `slot0.zone3`. Innerhalb jeder Zone finden Sie die Kanäle `name` (wie in der App angezeigt), `area` (m²), `time` und `path`.

Der **numerische Teil nach `zone`** ist die Zonen-ID, die Sie in `remote.mow-zone` eintragen. Wenn der Baum also folgendermaßen aussieht:

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

Der Mäher analysiert die Liste, beginnt mit dem Mähen der ausgewählten Zonen und kehrt anschließend zur Ladestation zurück. Um den Mähvorgang zu stoppen, drücken Sie `stop-mow` (o=2) oder `pause-mow` (o=4). Falls sich die Zielzonen auf einer anderen Karte befinden, muss zuvor die Karte gewechselt werden (`mow-change-map`), da die Zonen-IDs sonst nicht aufgelöst werden können.

#### Wechseln der aktiven Karte
Verfügt der Mäher über mehrere Karten, wählen Sie die aktive Karte aus, bevor Sie die Zonen-IDs schreiben:

```text
dreame.0.<did>.remote.mow-change-map = 0   // first map
dreame.0.<did>.remote.mow-change-map = 1   // second map
```

### Rasenmäher-Abkürzungen
Verknüpfungen werden aus den Eigenschaften 4-48 (base64-kodierte Namen) extrahiert. Jede Verknüpfung erhält einen eigenen Kanal unter `deviceId.shortcuts.{id}`:

| Bundesland | Beschreibung |
| ------- | ----------------------------------------- |
| Name | Entschlüsselter Kurzname |
| läuft | Gibt an, ob die Verknüpfung gerade ausgeführt wird |
| Start | Schaltfläche zum Starten der Verknüpfung |

### Geschichte der Rasenmäher
Der Reinigungsverlauf wird über die Cloud-API abgerufen (letzte 20 Mähvorgänge).

| Bundesland | Beschreibung |
| ------------------ | ------------------------------------------- |
| Datum des letzten Mähvorgangs | Datum der letzten Mähsitzung |
| Dauer der letzten Mähsitzung | Dauer der letzten Sitzung (Minuten) |
| last-mow-area | In der letzten Sitzung gemähte Fläche (m²) |
| last-mow-completed | Ob die letzte Mähsitzung erfolgreich abgeschlossen wurde |
| history-json | JSON-Array der letzten 20 Sitzungen |

### Mäherkarte
Die Kartendaten werden über die Dreame iotuserdata API abgerufen (nicht über MQTT wie bei Staubsaugern).

| Bundesland | Beschreibung |
| -------------- | -------------------------------------- |
| mapImage | Gerenderte Karte als PNG (base64-Daten-URL) |
| slot0.zone_X | Zonendaten (Name, Fläche, Mähzeit) |
| Mähpfad | Rohkoordinaten des Mähpfads |
| Einstellungen | Mäheinstellungen pro Zone |
| Zeitplan | Mähplan |
| 3dmap-url | URL zum Herunterladen der 3D-LIDAR-Karte (vorab signiert) |
| 3dmap-progress | Fortschritt der 3D-Kartengenerierung (0-100%) |

**Kartenabfrage:** Die Karte wird beim Start des Adapters und über die Schaltfläche `fetchMap` abgerufen. Während des aktiven Mähvorgangs (Status 1, 3, 5, 11) wird die Karte automatisch alle 30 Sekunden abgefragt, um den Mähpfad zu verfolgen.

**Kartendarstellung:** Erfordert das optionale npm-Paket `canvas`. Die Karte zeigt Zonen (grün), Konturen (weiße Umrisse), Mähwege (gelb), Sperrzonen (rot) und Hindernisse (rote Kreise).

**3D-LIDAR-Karte:** Drücken Sie `generate-3dmap`, um den Mäher zum Scannen und Hochladen einer 3D-Punktwolkenkarte zu veranlassen. Die heruntergeladene Datei ist eine PCD-Datei (Point Cloud Data), die mit Tools wie CloudCompare oder MeshLab angezeigt werden kann. Der Fortschritt wird in `3dmap-progress` verfolgt. Nach Abschluss des Vorgangs wird die vorab signierte Download-URL in `3dmap-url` gespeichert. Die URL ist temporär und läuft nach einigen Stunden ab.

#### Benutzerdefinierte Befehle für den Rasenmäher
Über `dreame.0.XXXXXX.remote.customCommand`:

```json
{
  "siid": 5,
  "aiid": 9,
  "in": [{ "order": 4, "region": [1], "type": "order" }]
}
```

## Bekannte Einschränkungen
**Der Objektbaum füllt sich schrittweise (verzögerte Zustandserstellung).** Zustände werden erst angezeigt, wenn das Gerät die entsprechende Eigenschaft mindestens einmal gemeldet hat. Nach einer Neuinstallation oder einem Neustart des Adapters kann der Baum einige Minuten lang unvollständig erscheinen – dies ist das erwartete Verhalten.

**L40s Pro Ultra und ähnliche Geräte: Einige Zustände werden erst nach aktiver Nutzung angezeigt.** Eigenschaften der SIID-Gruppe 4 (`cleaning-mode` 4-23, `suction-level` 4-4, `water-volume` 4-5) und SIID 28 (`wetness-level` 28-1) werden vom Gerät möglicherweise erst nach einer aktiven Reinigungssitzung, nicht aber während der Abfrage im Leerlauf, übertragen.

Diese Zustände werden erst angezeigt, nachdem nach der Installation oder dem Neustart des Adapters mindestens ein Reinigungszyklus abgeschlossen wurde.

**`cleaning-mode` Rohwerte auf einigen Geräten** Versionen vor 0.3.18 konnten auf einigen Geräten, darunter dem L40s Pro Ultra, zusammengesetzte Rohwerte (z. B. 5120, 5121, 5122) anstelle des dokumentierten Bereichs von 0–3 ausgeben. Dies lag daran, dass der Adapter einen zusammengesetzten Wert, der Modus, Fläche und Luftfeuchtigkeit in einer einzigen Ganzzahl kombiniert, nicht dekodieren konnte. Seit Version 0.3.18 wird dieser Wert korrekt dekodiert. Sollten nach dem Update weiterhin Rohwerte über 1000 angezeigt werden, melden Sie bitte ein Problem mit Angabe Ihres Gerätemodells und des angezeigten Rohwerts.

---

## Übersetzungen
Staatsnamen und -beschreibungen sind in 11 Sprachen verfügbar: Englisch, Deutsch, Russisch, Portugiesisch, Niederländisch, Französisch, Italienisch, Spanisch, Polnisch, Ukrainisch und Chinesisch (vereinfacht).

`lib/i18n/en.json` ist die maßgebliche Quelle. Alle anderen Sprachen werden daraus über `npm run translate` generiert. Korrekturen an nicht-englischen Übersetzungen sollten als Pull Requests (PRs) für die jeweilige `lib/i18n/<lang>.json`-Datei eingereicht werden.

---

## Changelog

### 0.3.24 (2026-07-01)
- Fixed custom room cleaning bug where switching active-map without touching a checkbox left customCommand holding room IDs from the previously selected map, causing the robot to clean the wrong room (room segment IDs are not unique across maps). customCommand is now rebuilt automatically whenever active-map changes, and is recomputed fresh from the active map's checkboxes immediately before every start as a final safeguard. Start is now aborted with a warning if no room is selected for the active map.

### 0.3.23 (2026-07-01)
- Added map name synchronization: renaming a map via map.maps.<id>.mapName now automatically updates the corresponding remote.custom-room-cleaning channel name. Changed active-map state to a dropdown (common.states) showing map names with their id instead of requiring the raw numeric id to be typed manually.

### 0.3.22 (2026-06-28)
- Added custom room cleaning feature under remote.custom-room-cleaning: select rooms per map via checkboxes, bidirectionally synchronized with customCommand, using global suction level and water volume; start triggers a real multi-zone cleaning command. Added editable map name state (map.maps.<id>.mapName) to rename maps directly in ioBroker admin without adapter restart. Fixed I18n initialization order on startup so mapName state is now correctly created on first start. Fixed cleanset channel names to show translated room names instead of raw path strings. Added JSON validation before sending customCommand to device. Fixed multi-language index suffix for rooms with identical types (e.g. Bedroom 2). Fixed German translation for corridor room type (Flur).

### 0.3.21 (2026-06-25)
- Added lazy-created, translated states for mower position, battery, position/DND, schedule and statistics data (mower SIID 2/3/4/5/8/12). Fixed state ordering bug where settings (rain protection, child lock, etc.) appeared empty on first adapter start. Added translations for all mower config/AutoSwitch/preference states in 11 languages. Fixed boolean states incorrectly storing numeric 0/1 instead of true/false (affects auto-dust-collecting, dnd-enable, resume-cleaning and 15 other states). Improved fallback handling for unknown properties: registered 3 previously-unmapped properties (camera stream status, map object name, robot-cleaner property 2-6) and stopped creating misleading writable states for properties we cannot confirm are writable. Added a one-time cleanup for leftover phantom states from the old fallback mechanism. Updated installation instructions in README (the adapter is now available directly via ioBroker Admin from the Latest repository). Fixed adapter crash (unhandled promise rejection) when a device reports an unmapped property with an undefined value.

### 0.3.20 (2026-06-24)
- Added lazy-created, translated states for mower position, battery, position/DND, schedule and statistics data (mower SIID 2/3/4/5/8/12). Fixed state ordering bug where settings (rain protection, child lock, etc.) appeared empty on first adapter start. Added translations for all mower config/AutoSwitch/preference states in 11 languages. Fixed boolean states incorrectly storing numeric 0/1 instead of true/false (affects auto-dust-collecting, dnd-enable, resume-cleaning and 15 other states). Improved fallback handling for unknown properties: registered 3 previously-unmapped properties (camera stream status, map object name, robot-cleaner property 2-6) and stopped creating misleading writable states for properties we cannot confirm are writable. Added a one-time cleanup for leftover phantom states from the old fallback mechanism. Updated installation instructions in README (the adapter is now available directly via ioBroker Admin from the Latest repository).

### 0.3.19 (2026-06-23)
- Documentation fix: 0.3.18 changelog entry was missing from README.md due to a release script bug. No functional changes.

### 0.3.18 (2026-06-23)
- Vacuum states are now created lazily — only properties actually reported by the device appear in the object tree, filling in gradually after adapter start. All vacuum states now have full translations in 11 languages. Fixed cleaning-mode encoding for L40s Pro Ultra and similar models (mode, area and humidity were previously combined into a single raw value). Action buttons (start, stop, reset, etc.) now display correctly as buttons instead of raw text. Added translated, lazily-created states for mower position/task data (binary protocol). Fixed data loss on first write to rawCompound states (previous compound value was discarded before decoding, causing partial state updates). Added min/max range (1-32) for wetness-level state. BREAKING CHANGE: Action states (start-clean, stop-clean, return-to-base, etc.) changed from type string/text to boolean/button. Scripts or Vis widgets that write string values to these states must be updated to write true instead.

### 0.3.17 (2026-06-21)

- Fix command sent for some states
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.3.7 (2026-04-28)

- Fix mower SETTINGS/SCHEDULE parsing: reassemble chunked data before JSON.parse (fixes warning every 30s)
- Fix mower actions: remove dangerous start-zone-mow (was sending DOCK), add pause-mow and clear-warning
- Remove mower stop-mow-ext (no HA equivalent)

### 0.3.6 (2026-04-21)

- Add dedicated vacuum state tree (createVacuumRemotes) with ~85 status, ~32 remote, ~22 AutoSwitch, ~13 action states
- Add vacuum consumable reset buttons (main brush, side brush, filter, sensor)
- Add vacuum AutoSwitch parsing (25 features: auto-drying, collision-avoidance, fill-light, clean-genius, cleaning-route, etc.)
- Add vacuum action buttons (start, pause, stop, return-to-dock, locate, start-washing, start-auto-empty, clear-warning)
- Add vacuum station status (clean/dirty water tank, dust bag, detergent, hot water)
- Add vacuum extended settings (wetness, CleanGenius mode, water temperature, silent drying, hair compression)
- Add 20 new vacuum status enums (draining, dust bag drying, floor maintaining, finding pet, etc.)
- Fix mower return-to-dock command (was siid:3 aiid:1, now correct siid:5 aiid:3)
- Fix mower start-zone-mow was sending DOCK command (siid:2 aiid:3 remapped to siid:5 aiid:3) — removed, use start-mow-ext with params instead
- Fix mower missing pause-mow action — added (siid:5 aiid:4)
- Fix mower missing clear-warning action — added (siid:4 aiid:3)
- Remove mower stop-mow-ext (siid:4 aiid:2, no HA equivalent)
- Fix set_properties method for writable states (was incorrectly sending as action)
- Fix boolean action commands now send in:[] parameter

### 0.3.5 (2026-04-19)

- Add AutoSwitch properties (4-50): collision avoidance, fill light, CleanGenius, cleaning route, auto charging, etc.
- Add PRE mowing preferences: cutting height, obstacle distance, mow mode, edge mowing, edge detection, direction change
- Add shortcuts support (4-48): parsed names, running state, start buttons
- Add cleaning history via cloud API (last 20 mow sessions with date, duration, area, completion)
- Fix battery byte parsing (buf[11] & 0x7F + charging bit 7)

### 0.3.4 (2026-04-19)

- Add mower settings states from getCFG (rain protection, frost protection, low speed, DND, battery config, volume, headlight, AI obstacle, camera, anti-theft, etc.)
- Load all settings on startup and auto-reload on prop.2.51 MQTT trigger
- Add dedicated remote states for setting CFG values (set-rain-protection, set-frost-protection, set-volume, find-robot, lock-robot, etc.)
- Split consumables into individual states (blade-hours, brush-hours, robot-maintenance-hours + health %)
- Add individual consumable reset buttons (reset-blade, reset-brush, reset-robot-maintenance)
- Correct prop.2.51 as generic settings-update trigger (WRP/FDP/LOW)
- Remove invalid cleaning-progress (4-63) from mower states

[Older changelogs can be found there](CHANGELOG_OLD.md)

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