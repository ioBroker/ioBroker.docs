---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/stateroles.md
title: Staatliche Rollen
hash: dYFtKGiq7nipkX2SNOKhI/HgRHRaJ3OqPl2evIBAZmg=
---
# Rollen der Bundesstaaten
Objekte des Typs `state` benötigen eine Eigenschaft `common.role`, die auf eine der unten definierten Rollen gesetzt ist.
Die Rolleninformationen sind sehr wichtig und ermöglichen es Visualisierungs- und Smart-Assistant-Adaptern, die Funktion des Objekts zu erkennen und festzustellen, ob und wie es mit anderen Objekten im selben Kanal, Gerät oder Ordner zusammenhängt.

## Staatliche Rollentypen
Folgende Staatsrollentypen existieren:

### Operative Staaten
Betriebszustände dienen der Steuerung der normalen Funktionalität eines Geräts. Eine RGB-Lampe kann die folgenden drei (oder mehr) Objekte mit unterschiedlichen, zusammengehörigen Funktionen aufweisen:

* `Schalter` (Ein/Aus)
* `level.color.rgb` mit dem Farbcode #RRGGBB der Lampe
* `level.brightness` mit dem Helligkeitswert

Auch der Reinigungsmodus bzw. der zu reinigende Raum eines Saugroboters ist ein solcher Betriebszustand. Diese Zustände verwenden die unten stehende Definition ohne jegliche Anpassungen.

Bitte verwenden Sie den detailliertesten Rollennamen, der die meisten Informationen enthält (z. B. sollte `level.color.temperature` für die Farbtemperatur anstelle von `level` verwendet werden, oder `switch.power` ist besser als `switch` für die Leistungssteuerung eines Geräts).
Bei der Verwendung detaillierter Rollennamen (mehrerer Ebenen) ist es außerdem wichtig, dieselbe Rolle nicht zweimal innerhalb eines Kanals eines Geräts zu verwenden.

Verschiedene Gerätevorlagen, die für die Erkennung mit den erforderlichen und optionalen Objekten und ihren Rollen verwendet werden, finden Sie in [Repository für Typdetektoren](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

### Konfigurations-/Einstellungszustände
Staaten, die weitere „nicht-operative“ Einstellungen der Geräte konfigurieren, können auch die folgenden grundlegenden Rollendefinitionen verwenden, um den Kontext des Typs und der Verwendung des angegebenen Werts genauer zu erläutern. **Fügen Sie jedoch ".setting." als zweite Ebene des Rollennamens hinzu.** Zum Beispiel:

* Mit `level.setting.color.temperature` und einem Wert zwischen 0 und 100 % kann die „Startfarbtemperatur“ einer Glühbirne eingestellt werden.
* Mit `switch.setting` (Ein/Aus) lassen sich Einstellungen definieren, die ein- oder ausgeschaltet werden können (z. B. die Kindersicherungsfunktion).

Benutzeroberflächen können diese speziellen Rollen nutzen, um Geräteeinstellungen zu ermitteln und diese in einem „Einstellungen“-Dialog für das Gerät anzuzeigen oder zu ignorieren.

Bitte beachten Sie: Diese Rollen wurden im Juni 2025 definiert, daher verwenden viele (ältere) Adapter sie möglicherweise nicht. Zukünftig kann/sollte dieser Statustyp gegebenenfalls verwendet werden.

### Allgemeine Zustände
Falls keine passende Rolle gefunden werden kann oder der Anwendungsfall nicht spezifisch ist, können Sie auf die unten definierten **allgemeinen** Rollen zurückgreifen.

## Staatliche Rollenkategorien
### Gemeinsam
* `state` – ein sehr häufiger Anwendungsfall. Wenn Sie nicht wissen, welche Rolle der Zustand hat, verwenden Sie diesen.
* `text` `common.type = string`
* `text.url` `common.type = string` state val enthält eine URL zur Verwendung in einem Anker, iFrame oder Bild.
* `html` `common.type = string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - parsbar durch `new Date(ddd)` string
* `date` `common.type = number` - `epoch seconds * 1000`

### Sensor (Boolesche Werte, schreibgeschützt)
`common.type=boolean, common.write=false`

* `sensor` - generischer Sensorstatus zur Darstellung eines Status: aktiv - `true` oder inaktiv `false`
* `sensor.contact` - allgemeiner Kontakt: offen - `true` oder geschlossen - `false`
* `sensor.window` - Fenster geöffnet - `true` oder geschlossen - `false`
* `sensor.door` - Tür geöffnet - `true` oder geschlossen - `false`
* `sensor.alarm` - einige gängige Alarme
* `sensor.alarm.flood` - Wasserleckage
* `sensor.alarm.fire` - Feuermelder
* `sensor.alarm.secure` - Tür geöffnet, Fenster geöffnet oder Bewegung erkannt, während der Alarm aktiv ist.
* `sensor.alarm.power` - Keine Stromversorgung (`voltage = 0`)
* `sensor.light` - Rückmeldung der Lampe, dass sie eingeschaltet ist
* `sensor.lock` - Aktueller Status des Schlosses: entriegelt - `true` oder verriegelt - `false`
* `sensor.motion` - Bewegungssensor
* `sensor.rain` - Regen erkannt
* `sensor.noise` - Rauschen erkannt
* `sensor.switch` - Schalterstatus: ein - `true` oder aus - `false`

### Schaltflächen (Boolesche Werte, schreibgeschützt)
`common.type=boolean, common.write=true, common.read=false`

Schaltflächen haben normalerweise keinen Wert und dienen lediglich dazu, beim Drücken ein Ereignis (TRUE) auszulösen. Daher muss das Attribut „read-flag“ auf „FALSE“ gesetzt sein.
Benutzeroberflächen sollten den Wert dieses Zustands weder auslesen noch erwarten, dass er nach der Ausführung einer Aktion auf „FALSE“ zurückgesetzt wird. Schaltflächenereignisse, die durch onChange eines Adapters ausgelöst werden, sollten mit ACK = TRUE bestätigt werden, um anzuzeigen, dass das Ereignis erkannt und verarbeitet wurde.

* `button`
* `button.long`
* `button.stop` - z.B. rollo stop,
* `button.stop.tilt`
* `button.start`
* `button.resume`
* `button.open.door`
* `button.open.window`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode.`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

### Tasten als Sensoren
`common.type=boolean, common.write=false, common.read=true`

* `button` – der Unterschied liegt darin, dass `common.write=false` verwendet wird. Bitte vermeiden Sie diese Funktion und verwenden Sie stattdessen `button.press` oder `button.long`.
* `button.long`
* `button.press`

### Werte (Zahlen, schreibgeschützt)
`common.type=number, common.write=false`

* `Wert`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) Es ist wichtig, dass (`CLOSED/TILTED/OPEN`) vorhanden ist. Die Werte können unterschiedlich sein.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'`)
* `value.humidity`
* `value.co2` - CO2 (Einheit: ppm)
* `value.brightness` - Leuchtdichtewert (Einheit: Lux)
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - Akkuladestand
* `value.valve` - Ventilpegel
* `value.time` - getTime() des Date()-Objekts
* `value.interval` (common.unit='sec') - Intervall in Sekunden (kann 0,1 oder weniger sein)
* ~~value.date (common.type=string) - Datum im Format 2015.01.01 (ohne Uhrzeit)~~
* ~~value.datetime (common.type=string) - Datum und Uhrzeit im Systemformat~~
* `value.gps.longitude` - GPS-Längenkoordinaten
* `value.gps.latitude` - GPS-Breitengrad
* `value.gps.elevation` - GPS-Höhen
* `value.gps` - Längen- und Breitengrad zusammen, z. B. '5.56;43.45'
* `value.gps.accuracy` - Genauigkeit der aktuellen GPS-Messung
* `value.gps.radius` - Radius der aktuellen GPS-Messung
* ~~`value.power.consumption` - Energieverbrauch (Einheit=Wh oder kWh)~~
* ~~`value.power.production` - Energieproduktion (Einheit=Wh oder kWh)~~
* `value.energy` - Energie (Einheit=Wh, kWh oder m³ für Benzin)
* `value.energy.active` - Wirkenergie (Einheit=Ws, Wh, kWh)
* `value.energy.reactive` - reaktive Energie (Einheit=vars, kVarh)
* `value.energy.consumed` - verbrauchte Energie (Einheit=Ws, Wh, kWh)
* `value.energy.produced` - erzeugte Leistung (Einheit=Ws, Wh oder kWh)
* `value.power` - Energieleistung (Einheit=W oder kW)
* `value.power.active` - Wirkleistung (Einheit=W, kW)
* `value.power.reactive` - Blindleistung (Einheit=var, kVar)
* `value.power.consumed` - verbrauchte Leistung (Einheit=W oder kW)
* `value.power.produced` - erzeugte Leistung (Einheit=W oder kW)
* `value.direction` - (common.type=number, zeigt oben/unten, links/rechts, 4-Wege-Schalter, Windrichtung, ... 0 - nichts, 1 - oben/öffnen, 2 - unten/schließen, 3 - undefiniert)
* `value.curtain` - tatsächliche Position des Vorhangs
* `value.blind` - tatsächliche Position der Jalousie (`max = vollständig geöffnet, min = vollständig geschlossen`)
* `value.tilt` - tatsächliche Neigungsposition (`max = vollständig geöffnet, min = vollständig geschlossen`)
* `value.lock` - tatsächliche Position der Sperre
* `value.speed` - Windgeschwindigkeit
* `value.pressure` - (Einheit: mbar)
* `value.distance`
* `value.distance.visibility`
* `value.severity` – eine Angabe zum Schweregrad (Zustände können angegeben werden), je höher, desto wichtiger
* `value.warning` - eine Warnung (Zustände können angegeben werden), je höher der Wert, desto wichtiger
* `value.sun.elevation` - Sonnenstand in °
* `value.sun.azimuth` - Sonnenazimut in °
* `value.voltage` - Spannung in Volt, `unit=V`
* `value.current` - Stromstärke in Ampere, `unit=A`
* `value.frequency` - Frequenz in Hz, `unit=Hz`
* `value.fill` - Füllstand, `unit=l,ml,m3,%`
* `value.blood.sugar` - Blutzuckerwert, `unit=mmol,mgdl`

### Indikatoren (boolesch, schreibgeschützt)
`common.type=boolean, common.write=false`

Der Unterschied zwischen *Indikatoren* und *Sensoren* besteht darin, dass Indikatoren als kleines Symbol angezeigt werden, Sensoren hingegen als realer Wert.

Daher kann ein Indikator nicht allein im Kanal vorkommen. Er muss Teil eines anderen Hauptzustands innerhalb des Kanals sein.

* `Indikator`
* `indicator.working` - zeigt an, dass das Zielsystem gerade eine Aktion ausführt, z. B. das Öffnen von Jalousien oder Schlössern.
* `indicator.reachable` - Gibt an, ob ein Gerät online ist
* `indicator.connected` – wird nur für Instanzen verwendet. Verwenden Sie `indicator.reachable` für Geräte.
* `indicator.direction` - `true` - Aufwärts/Eröffnung, `false` - Abwärts/Schluss. Verwenden Sie besser `value.direction`.
* `indicator.error` - true, wenn ein Fehlerzustand vorliegt
* `indicator.maintenance` - zeigt Systemwarnungen/-fehler, Alarme, Servicemeldungen, leeren Akku oder ähnliches an
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` - wahr, wenn der Akku schwach ist
* `indicator.alarm` - entspricht indicator.maintenance.alarm
* `indicator.alarm.fire` - Feuer erkannt
* `indicator.alarm.flood` - Überschwemmung erkannt
* `indicator.alarm.secure` - Tür oder Fenster ist geöffnet
* `indicator.alarm.health` - Gesundheitsproblem

### Stufen (Zahlen, Lesen/Schreiben)
Mit **Levels** können Sie einen Zahlenwert steuern oder festlegen.

`common.type=number, common.write=true`

* `level`
* `level.humidity` – Luftfeuchtigkeit als Sollwert, z. B. für Luftbefeuchter/Klimageräte.
* `level.battery` - Zielspannung/-kapazität der Batterie, z. B. zum Laden
* `level.battery.min` - Mindestspannung/Mindestkapazität der Batterie
* `level.battery.max` - Maximale Batteriespannung / -kapazität
* `level.valve` - Öffnungswert für Ventile
* `level.pressure` -
* `level.pressure.min` - minimal zulässiger Luft- oder Öldruckwert
* `level.pressure.max` - maximal zulässiger Luft- oder Öldruckwert
* `level.voltage` - Zielspannung für Generatoren
* `level.voltage.min` - Mindestspannung für Generatoren
* `level.voltage.max` - maximale Spannung für Generatoren
* `level.current` - Zielstrom, z. B. für geladene Akkus
* `level.current.min` - Mindeststrom, z. B. für batteriebetriebene Geräte
* `level.current.max` - Maximalstrom, z. B. für batteriebetriebene Geräte
* `level.frequency` - Zielfrequenz für Generatoren
* `level.frequency.min` - Mindestfrequenz für Generatoren oder für Alarme im Stromnetz
* `level.frequency.max` - Maximalfrequenz für Generatoren oder für Alarme im Stromnetz
* `level.fill` - Sollwert für beliebige Füllstandszustände eines Containers
* `level.brightness` - Leuchtdichtewert (Einheit: Lux)
* `level.min` - Mindeststufe zulässig
* `level.max` - maximal zulässige Stufe
* `level.default` - Standardstufe
* `level.dimmer` - Die Helligkeit ist ebenfalls geringer.
* `level.blind` - Jalousieposition festlegen (max = vollständig geöffnet, min = vollständig geschlossen)
* `level.temperature` - gewünschte Temperatur einstellen
* `level.valve` - Sollwert für die Ventilposition
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - Farbe in ° `0-360; 0=Rot, 120=Grün, 240=Blau, 360=Rot(zyklisch)`
* `level.color.saturation`
* `level.color.rgb` - Hexadezimalfarbe wie `#rrggbb` (`common.type=string`)
* `level.color.rgbw` - Hexadezimalfarbe wie `#rrggbbww` (`common.type=string`)
* `level.color.cie` - CIE-Farbe im Format `[x, y]` (`common.type=string`)
* `level.color.luminance`
* `level.color.temperature` - Farbtemperatur in K° `2200 warmweiß, 6500° kaltweiß`
* `level.effect` - Effekt, üblicherweise für Lichter. Sollte eine Liste möglicher Effekte in `common.states` enthalten. (`common.type=string`).
* `level.timer`
* `level.timer.sleep` – Schlaftimer. 0 – aus, oder in Minuten.
* ...
* `level.volume` - (`min=0, max=100`) - Lautstärke, wobei min und max unterschiedlich sein können. min < max
* `level.volume.group` - (`min=0, max=100`) - Lautstärke für die Gerätegruppe
* `level.curtain` - legt die Vorhangposition fest
* `level.tilt` - Legt die Neigungsposition der Jalousien fest (max = vollständig geöffnet, min = vollständig geschlossen)
* `level.speed` - Geschwindigkeit, z. B. Lüfter, Ventilator, ..

### Schalter (Boolesche Werte, Lese-/Schreibzugriff)
Der Schalter steuert ein boolesches Gerät (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock` - Sperre (`true - Sperre öffnen, false - Sperre schließen`)
* `switch.lock.door` - Türschloss
* `switch.lock.window` - Fenstersperre
* `switch.mode.boost` - Start/Stopp des Boost-Modus des Thermostats
* `switch.mode.party` - Startet/Stoppt den Partymodus des Thermostats
* `switch.power` - Ein-/Ausschalten von Strom, Thermostat oder Klimaanlage
* `switch.light`
* `switch.comfort` - Komfortmodus
* `switch.enable`
* `switch.mode.`*
* `switch.mode.auto` - Automatikmodus ein-/ausschalten
* `switch.mode.manual` - Manueller Modus ein/aus
* `switch.mode.silent` - Stummmodus ein-/ausschalten
* `switch.mode.moonlight` - Mondlichtmodus ein-/ausschalten
* `switch.mode.color` - Farbmodus ein/aus
* `switch.gate` - schließt (false) oder öffnet (true) das Tor

### Klimaanlage oder Thermostat
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - Klimaanlage: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, Heizungsthermostat: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - Thermostat: `AUTO, MANUAL, VACATION`,
* `value.mode.airconditioner` - aktueller Gerätestatus: `IDLE`, `HEAT`, `COOL` (0,1,2 in Apple Home)

Zusätzlich zu diesen Staaten sind normalerweise die `level.temperature` und `switch.power` erforderlich, um die Klimaanlage zu kartieren.

TODO: Über Ionisation und Oszillation nachdenken.

### Staubsauger
* `level.mode.cleanup` - Aufzählung von `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Nur `AUTO` und `NORMAL` sind erforderlich.
* `level.mode.work` - Aufzählung von `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optionaler Status.
* `value.water` - 0-100% Wasserstand.
* `value.waste` - Füllstand des Abfallbehälters (0-100%). (0% - leer, 100% - voll)
* `indicator.maintenance.waste` - Der Papierkorb ist ein Idiot.
* `value.state` - `HOME, CLEANING, PAUSE` und so weiter.

Zusätzlich zu diesen Zuständen ist normalerweise `switch.power` erforderlich, um den Staubsauger zu lokalisieren. `switch.power` funktioniert in diesem Fall wie folgt: `true` – Reinigen, `false` – Zurück zum Startpunkt.
Optional `value.battery` und

### Tor
* `switch.gate` - schließt (false) oder öffnet (true) das Tor (erforderlich)
* `value.position` - Position des Tores in Prozent (100 % geöffnet, 0 % geschlossen)
* `value.gate` - entspricht `value.position`
* `button.stop` - Stoppt die Bewegung des Tores

### Medien
Besondere Rollen für Medienschaffende

* `button.stop`
* `button.play`
* `button.next`
* `button.prev`
* `button.pause`
* `switch.pause`
* `button.forward`
* `button.reverse`
* `button.fastforward`
* `button.fastreverse`
* `button.volume.up`
* `button.volume.down`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - keine, 1 - alle, 2 - eins
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - `['play','stop','pause']` oder `[0 - Pause, 1 - Wiedergabe, 2 - Stopp]` oder `[true - Wiedergabe/false - Pause]`
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover` - Cover-URL
* `media.cover.big` - URL für großes Cover
* `media.cover.small` - URL für winziges Cover
* `media.duration.text` - z.B. "2:35"
* `media.duration` - (`common.type=number`) Sekunden
* `media.elapsed.text` - z.B. "1:30"
* `media.elapsed` - (`common.type=number`) Sekunden
* `media.broadcastDate` - (`common.type=string`) Sendedatum
* `media.mute` - (`common.type=boolean`) true bedeutet stummgeschaltet
* `media.season` - (`common.type=string`) Saisonnummer (wichtig: Der Typ ist tatsächlich "string", um das Fehlen einer Saison mit "") angeben zu können.
* `media.episode` - (`common.type=string`) Episodennummer (wichtig: Der Typ ist tatsächlich "string", um das Fehlen einer Episode mit "") anzeigen zu können.
* `media.mute.group` - (`common.type=boolean`) Stummschaltung einer Gruppe von Geräten
* `media.tts` - Text-zu-Sprache
* `media.bitrate` - kbps
* `media.genre` - Genre-Song
* `media.date` - Jahr des Liedes
* `media.track` - (`common.type=string`) ID des aktuell wiedergegebenen Titels `[0 - ~]` (wichtig: Der Typ muss tatsächlich `string` sein, um das Fehlen eines Titels mit "") anzeigen zu können.
* `media.playid` - Titel-ID des Mediaplayers
* `media.add` - Aktuelle Playlist hinzufügen
* `media.clear` - Aktuelle Wiedergabeliste löschen (nur schreibend)
* `media.playlist` - JSON-Array wie
* `media.url` - URL zum Abspielen oder aktuelle URL
* `media.url.announcement` - URL zum Abspielen einer Ankündigung
* `media.jump` - Anzahl der Elemente, zu denen in der Wiedergabeliste gesprungen werden soll (kann negativ sein)
* `media.content` - Art des wiedergegebenen Mediums, z. B. Audio/MP3
* `media.link` - Status der aktuellen Datei
* `media.input` - Zahl oder Zeichenkette des Eingangs (AUX, AV, TV, SAT, ...)
* `level.bass` - Basspegel
* `level.treble` - Höhenpegel
* `switch.power.zone` - Stromzone

```json
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* `media.browser` - JSON-Array wie "files"

```json5
[
    {
        "fanart": "",
        "file": "", // smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", // directory
        "label": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

### Wetter
* `Datum` - tatsächliches Datum oder Datum der letzten gelesenen Informationen
* `date.forecast.1` - Datum von morgen
* `date.sunrise` - Sonnenaufgang für heute
* `date.sunset` - Sonnenuntergang für heute
* `dayofweek` - Wochentag als Text
* `location` - Textbeschreibung des Standorts (z. B. Adresse)
* `value.clouds` - Wolken am Himmel. 0% - keine Wolken, 100% - viele Wolken.
* `value.direction.max.wind` - tatsächliche Windrichtung in Grad
* `value.direction.min.wind` - tatsächliche Windrichtung in Grad
* `value.direction.wind` - tatsächliche oder durchschnittliche Windrichtung in Grad
* `value.direction.wind.forecast.0` - Windrichtungsvorhersage für heute in Grad
* `value.direction.wind.forecast.1` - Windrichtungsvorhersage für morgen in Grad
* `value.humidity` - tatsächliche oder durchschnittliche Luftfeuchtigkeit
* `value.humidity.max` - tatsächliche Luftfeuchtigkeit
* `value.humidity.min` - tatsächliche Luftfeuchtigkeit
* `value.precipitation` - (`Typ: Zahl, Einheit: mm`) Niederschlag für die letzten 24 Stunden Regen/Schnee (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.chance` - Tatsächliche Niederschlagswahrscheinlichkeit für heute
* `value.precipitation.day.forecast.0` - Niederschlagsvorhersage für den Tag
* `value.precipitation.forecast.0` - (`type: number, unit: %`) Vorhersage der Niederschlagswahrscheinlichkeit für heute
* `value.precipitation.forecast.0` - (`type: number, unit: mm`) Vorhersage der Niederschlagsmenge für heute
* `value.precipitation.forecast.1` - (`type: number, unit: %`) Vorhersage der Niederschlagswahrscheinlichkeit für morgen
* `value.precipitation.forecast.1` - (`type: number, unit: mm`) Vorhersage der Niederschlagsmenge für morgen
* `value.precipitation.hour` - Tatsächliche Niederschlagsmenge der letzten Stunde
* `value.precipitation.night.forecast.0` - Niederschlagsvorhersage für die Nacht
* `value.precipitation.today` - Tatsächliche Niederschlagsmenge für heute (bis 0:00 Uhr)
* `value.precipitation.type` – Tatsächliche Niederschlagsart für heute. (`type: number`) Werte: 0 – NEIN, 1 – REGEN, 2 – SCHNEE, 3 – HAGEL
* `value.pressure.forecast.0` - Vorhersage des Luftdrucks für heute
* `value.pressure.forecast.1`
* `value.radiation` - Tatsächliche Sonneneinstrahlung
* `value.rain` - Tatsächliche Niederschlagsmenge der letzten 24 Stunden
* `value.rain.hour` - Tatsächliche Regenmenge der letzten Stunde
* `value.rain.today` - Tatsächliche Niederschlagsmenge für heute (bis 0:00 Uhr)
* `value.snow` - Tatsächliche Schneehöhe der letzten 24 Stunden
* `value.snow.hour` - Tatsächliche Schneehöhe der letzten Stunde
* `value.snow.today` - Aktuelle Schneehöhe für heute (bis 0:00 Uhr)
* `value.snowline` - Tatsächliche Schneegrenze in Metern
* `value.speed.max.wind` - maximale Windgeschwindigkeit der letzten 24 Stunden
* `value.speed.min.wind` - minimale Windgeschwindigkeit der letzten 24 Stunden
* `value.speed.wind` - tatsächliche oder durchschnittliche Windgeschwindigkeit
* `value.speed.wind.forecast.0` - Windgeschwindigkeitsvorhersage für heute
* `value.speed.wind.forecast.1` - Windgeschwindigkeitsvorhersage für morgen
* `value.speed.wind.gust` - tatsächliche Windböengeschwindigkeit
* `value.temperature` - Tatsächliche Temperatur
* `value.temperature.dewpoint` - Tatsächlicher Taupunkt
* `value.temperature.feelslike` - Gefühlte Temperatur
* `value.temperature.max` - Maximale Temperatur der letzten 24 Stunden
* `value.temperature.max.forecast.0` - Maximale Temperaturvorhersage für heute
* `value.temperature.max.forecast.1` - Vorhergesagte Höchsttemperatur für morgen
* `value.temperature.min` - Minimale Temperatur der letzten 24 Stunden
* `value.temperature.min.forecast.0` - Minimale Temperaturvorhersage für heute
* `value.temperature.min.forecast.1` - Minimale Temperaturvorhersage für morgen
* `value.temperature.windchill` - Tatsächliche Windchill-Temperatur
* `value.uv` - Tatsächlicher UV-Pegel
* `weather.chart.url` - URL zur Grafik für die Wetterhistorie
* `weather.chart.url.forecast` - URL zur Grafik für die Wettervorhersage
* `weather.direction.wind` - tatsächliche oder durchschnittliche Windrichtung als Text, z. B. NNW
* `weather.direction.wind.forecast.0` - Windrichtungsvorhersage für heute als Text
* `weather.html` - HTML-Objekt mit Wetterbeschreibung
* `weather.icon` - Aktuelle URL des Status-Symbols
* `weather.icon.forecast.1` - Symbol für morgen
* `weather.icon.name` - Aktueller Name des Status-Symbols
* `weather.icon.wind` - Aktuelle URL des Windsymbols
* `weather.json` - JSON-Objekt mit spezifischen Daten
* `weather.state` - Aktuelle Wetterbeschreibung
* `weather.state.forecast.0` - Wetterbeschreibung für heute
* `weather.state.forecast.1` - Wetterzustand von morgen
* `weather.title` - Sehr kurze Beschreibung
* `weather.title.forecast.0` - Sehr kurze Beschreibung für morgen
* `weather.title.short` - Sehr, sehr kurze Beschreibung (Ein Wort)
* `weather.type` - Art der Wetterinformationen

### Info
* `info.ip` - IP-Adresse eines Geräts
* `info.mac` - MAC-Adresse eines Geräts
* `info.name` - Name eines Geräts
* `info.address` - eine andere Adresse (z. B. KNX)
* `info.serial` - Seriennummer
* `info.firmware` - Firmware-Version
* `info.hardware` - Hardwareversion
* `info.port` - TCP-Port
* `info.standby` - true, wenn sich das Gerät im Standby-Modus befindet
* `info.status` - Status eines Geräts
* `info.display` - Informationen, die auf dem Gerätedisplay angezeigt werden
* `info.model` - Gerätemodell
* `date.start` - Zeichenkette oder Zahl
* `date.end` - Zeichenkette oder Zahl

### Gesundheit
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - Körperfettanteil in %
* `value.health.weight` - Körpergewicht in kg, lbs
* `value.health.bmi` - BMI-Index
* `value.health.calories` - verbrannte Kalorien
* `value.health.steps` - durchgeführte Schritte
* `value.health.bpm` - Herzschläge pro Minute

### Andere
* `url`
* `url.icon` - Symbol (zusätzlich kann jedes Objekt ein `common.icon` haben)
* `url.cam` - URL der Webcam
* `url.blank` - URL in einem neuen Fenster öffnen
* `url.same` - URL in diesem Fenster öffnen
* `url.audio` - URL für eine Audiodatei
* `text.phone` - Telefonnummer
* `time.span` – Zeitdifferenz in Millisekunden (common.type=number), d. h. Zeit seit der letzten Aktualisierung, Dauer der Operation, Zeit bis zum nächsten Versuch, ...
* `time.interval` - Intervallwert in ms (common.type=number), d. h. ein Abfrageintervall
* `time.timeout` - Timeout-Wert in Millisekunden (common.type=number), d. h. Timeouts für Kommunikationsanfragen
* `chart` - JSON-Array mit Diagrammdaten, z. B. `[{ts: 1678575600000, val: 1}, {ts: 1678579200000, val: 2}]`

* `adapter.messagebox` (`common.type=object, common.write=true`) wird verwendet, um Nachrichten an E-Mail, Pushover und andere Adapter zu senden.
* `adapter.wakeup` (`common.type=boolean, common.write=true`) Adapter aus dem Ruhezustand aufwecken