---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/stateroles.md
title: Staatliche Rollen
hash: iQ0sPeHMl+oZq/pHTJCX2n465zmSPwYKbJHVgPyMB1w=
---
# Staatsrollen
Bei Objekten vom Typ `state` muss die Eigenschaft `common.role` auf eine der in der Liste unten definierten Rollen gesetzt werden.
Die Rolleninformationen sind sehr wichtige Informationen und ermöglichen es Visualisierungs- und Smart-Assistant-Adaptern, die Funktion des Objekts zu erkennen und auch, wie/ob sie sich auf andere Objekte im selben Kanal, Gerät oder Ordner beziehen.

Beispiel: Eine RGB-Lampe kann folgende drei Objekte (oder mehr) mit unterschiedlichen Rollen haben, die zusammengehören:

* `Schalter` - (Ein/Aus)
* `level.color.rgb` mit #RRGGBB Farbcode der Lampe
* `level.brightness` mit dem Helligkeitswert

Verschiedene Gerätevorlagen, die für die Erkennung mit den erforderlichen und optionalen Objekten und deren Rollen verwendet werden, finden Sie in den [Typ-Detektor-Repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Verbreitet
* `Staat` - sehr allgemeiner Zweck. Wenn Sie nicht wissen, welche Rolle der Staat hat, verwenden Sie diese.
* `text` `common.type = string`
* `text.url` `common.type = string` state val enthält eine URL zur Verwendung in einem Anker, iframe oder img
* `html` `common.type = string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - analysierbar durch `new Date(ddd)` string
* `Datum` `common.type = Zahl` - `Epochensekunden * 1000`

## Sensor (Boolean, schreibgeschützt)
`common.type=boolean, common.write=false`

* `sensor.window` - Fenster geöffnet-`true` oder geschlossen-`false`
* `sensor.door` - Tür geöffnet-`wahr` oder geschlossen-`falsch`
* `sensor.alarm` - einige allgemeine Alarme
* `sensor.alarm.flood` - Wasseraustritt
* `sensor.alarm.fire` - Feuersensor
* `sensor.alarm.secure` - Tür geöffnet, Fenster geöffnet oder Bewegung während des Alarms erkannt ist EIN.
* `sensor.alarm.power` - Kein Strom (`Spannung = 0`)
* `sensor.light` - Rückmeldung der Lampe, dass sie eingeschaltet ist
* `sensor.lock` - aktuelle Position des Schlosses
* `sensor.motion` - Bewegungssensor
* `sensor.rain` - Regen erkannt
* `sensor.noise` - Rauschen erkannt

## Schaltflächen (Boolean, nur schreiben)
`common.type=boolean, common.write=true, common.read=false`

* `Taste`
* `Taste.lang`
* `button.stop` - z.B. rollo halt,
* `Taste.Stop.Tilt`
* `button.start`
* `Knopf.öffnen.Tür`
* `Schaltfläche.Fenster.öffnen`
* `Knopf.öffnen.Blind`
* `Knopf.öffnen.kippen`
* `button.close.blind`
* `button.close.tilt`
* `Tastenmodus.`*
* `button.mode.auto`
* `Tastenmodus.manuell`
* `Knopf.Modus.Silent`

## Tasten als Sensor
`common.type=boolean, common.write=false, common.read=true`

* `button` - der Unterschied, dass `common.write=false`. Bitte vermeiden Sie diese Rolle und verwenden Sie `button.press` oder `button.long`.
* `Taste.lang`
* `Taste.drücken`

## Werte (Zahlen, schreibgeschützt)
`common.type=number, common.write=false`

* `Wert`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) Es ist wichtig, (`CLOSED/TILTED/ GEÖFFNET"). Werte können abweichen.
* `value.temperature` (`common.unit='°C' oder '°F' oder 'K'')
* `Wert.Feuchtigkeit`
* `value.brightness` - Leuchtdichte (Einheit: Lux, )
* `Wert.min`
* `Wert.max`
* `value.default`
* `value.battery` - Batteriestand
* `value.valve` - Ventilniveau
* `value.time` - getTime() des Date()-Objekts
* `value.interval` (common.unit='sec') - Intervall in Sekunden (kann 0,1 oder weniger betragen)
* ~~value.date (common.type=string) - Datum im Formular 2015.01.01 (ohne Zeit)~~
* ~~value.datetime (common.type=string) - Datum und Uhrzeit im Systemformat~~
* `value.gps.longitude` - GPS-Längengradkoordinaten
* `value.gps.latitude` - GPS-Breite
* `value.gps.elevation` - GPS-Höhe
* `value.gps` - Längen- und Breitengrad zusammen wie '5.56;43.45'
* `value.gps.accuracy` - Genauigkeit der aktuellen GPS-Messung
* `value.gps.radius` - Radius der aktuellen GPS-Messung
* `value.power` - tatsächliche Leistung (Einheit=W oder KW)
* `value.power.consumption` - Energieverbrauch (Einheit=Wh oder KWh)
* `value.power.reactive` - Blindleistung (Einheit=VAr)
* `value.direction` - (common.type=number ~~oder string~~, zeigt oben/unten, links/rechts, 4-Wege-Schalter, Windrichtung, ... an)
* `value.curtain` - aktuelle Position des Vorhangs
* `value.blind` - aktuelle Position der Jalousie (`max = ganz geöffnet, min = ganz geschlossen`)
* `value.tilt` - aktuelle Neigungsposition (`max = vollständig geöffnet, min = vollständig geschlossen`)
* `value.lock` - aktuelle Position der Sperre
* `value.speed` - Windgeschwindigkeit
* `Wert.Druck` - (Einheit: mbar)
* `Wert.Entfernung`
* `Wert.Entfernung.Sichtbarkeit`
* `value.severity` - ein gewisser Schweregrad (Zustände können angegeben werden), Höher ist wichtiger
* `value.warning` - einige Warnungen (Zustände können angegeben werden), Höher ist wichtiger
* `value.sun.elevation` - Sonnenstand in °
* `value.sun.azimuth` - Sonnenazimut in °
* `value.voltage` - Spannung in Volt, `unit=V`
* `value.current` - Strom in Ampere, `unit=A`
* `value.fill` - Füllstand, `unit=l,ml,m3,%`
* `value.blood.sugar` - Blutzuckerwert, `unit=mmol,mgdl`

## Indikatoren (boolean, schreibgeschützt)
`common.type=boolean, common.write=false`

Der Unterschied zwischen *Indikatoren* und *Sensoren* besteht darin, dass Indikatoren als kleines Symbol angezeigt werden. Sensoren als echter Wert.
Der Indikator darf also nicht allein im Kanal sein. Es muss sich um einen anderen Hauptstatus innerhalb des Kanals handeln.

* `Anzeige`
* `indicator.working` - zeigt an, dass das Zielsystem etwas ausführt, wie zum Beispiel Jalousien oder das Öffnen von Schlössern.
* `indicator.reachable` - Wenn das Gerät online ist
* `indicator.connected` - wird nur für Instanzen verwendet. Verwenden Sie `indicator.reachable` für Geräte
* `indicator.maintenance` - zeigt Systemwarnungen/Fehler, Alarme, Servicemeldungen, Batterie leer oder ähnliches an
* `Anzeige.Wartung.lowbat`
* `Anzeige.Wartung.Unerreichbarkeit`
* `Anzeige.Wartung.Alarm`
* `indicator.lowbat` - wahr, wenn die Batterie schwach ist
* `Anzeige.Alarm` - wie Anzeige.Wartung.Alarm
* `Indikator.alarm.fire` - Feuer erkannt
* `indicator.alarm.flood` - Hochwasser erkannt
* `indicator.alarm.secure` - Tür oder Fenster ist geöffnet
* `Indikator.Alarm.Health` - Gesundheitsproblem

## Ebenen (Zahlen, Lesen-Schreiben)
Mit **Stufen** können Sie einen Zahlenwert steuern oder einstellen.

`common.type=number, common.write=true`

* `Ebene`
* `level.co2` - 0-100% Luftqualität
* `level.dimmer` - Helligkeit ist auch dunkler
* `level.blind` - Jalousieposition einstellen (max = vollständig geöffnet, min = vollständig geschlossen)
* `level.temperature` - gewünschte Temperatur einstellen
* `level.valve` - Sollwert für Ventilposition
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - Farbe in ° `0-360; 0=rot, 120=grün, 240=blau, 360=rot(zyklisch)`
* `level.color.saturation`
* `level.color.rgb` - Hex-Farbe wie `#rrggbb`
* `level.color.luminance`
* `level.color.temperature` - Farbtemperatur in K° `2200 warmweiß, 6500° kaltweiß`
* `level.timer`
* `level.timer.sleep` - Sleep-Timer. 0 - aus, oder in Minuten
* ...
* `level.volume` - (`min=0, max=100`) - Lautstärke, aber min, max können abweichen. min < max
* `level.volume.group` - (`min=0, max=100`) - Lautstärke, für die Gerätegruppe
* `level.curtain` - Stellen Sie die Vorhangposition ein
* `level.tilt` - Stellen Sie die Neigungsposition der Jalousien ein (max = vollständig geöffnet, min = vollständig geschlossen)

## Schalter (Boolean, Read-Write)
Schalter steuert boolesches Gerät (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `Schalter`
* `switch.lock` - lock (`true - Lock öffnen, false - Lock schließen`)
* `switch.lock.door` - Türschloss
* `switch.lock.window` - Fenstersperre
* `switch.mode.boost` - Start/Stopp-Boost-Modus des Thermostats
* `switch.mode.party` - Party-Modus des Thermostats starten/stoppen
* `switch.power` - Ein/Aus-Thermostat oder Klimaanlage
* `Schalter.Licht`
* `switch.comfort` - Komfortmodus
* `switch.enable`
* `switch.power` - Ein-/Ausschalten
* `Schaltmodus.`*
* `switch.mode.auto` - Auto-Modus ein/aus
* `switch.mode.manual` - manueller Modus ein/aus
* `switch.mode.silent` - Silent-Modus ein/aus
* `switch.mode.moonlight` - Mondlichtmodus ein/aus
* `switch.mode.color` - Farbmodus an/aus
* `switch.gate` - schließt(false) oder öffnet(true) das Tor

## Klimaanlage oder Thermostat
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONÄR, VERTIKAL`
* `level.mode.airconditioner` - Klimaanlage: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, Heizungsthermostat: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - Thermostat: `AUTO, MANUAL, VACATION`,

 Zusätzlich zu diesen Zuständen sind normalerweise die `level.temperature` und `switch.power` erforderlich, um die Klimaanlage abzubilden.

TODO: Denken Sie an Ionisation und Oszillation.

## Staubsauger
* `level.mode.cleanup` - Aufzählung von `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Nur `AUTO` und `NORMAL` sind erforderlich.
* `level.mode.work` - Aufzählung von `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optionaler Zustand.
* `value.water` - 0-100% Wasserstand.
* `value.waste` - 0-100% Abfallbehälter-Niveau. (0% - leer, 100% - voll)
* `indicator.maintenance.waste` - Mülleimer ist dumm.
* `value.state` - `HOME, CLEANING, PAUSE` und so weiter.

Zusätzlich zu diesen Zuständen sind normalerweise die `switch.power` erforderlich, um den Staubsauger zuzuordnen. `switch.power` funktioniert in diesem Fall als: `true` - sauber, `false` - zurück nach Hause.
Optional `value.battery` und

## Tor
* `switch.gate` - schließt(false) oder öffnet(true) das Tor (erforderlich)
* `value.position` - Position des Tores in Prozent (100% geöffnet, 0% - geschlossen)
* `value.gate` - wie `value.position`
* `button.stop` - Torbewegung stoppen

## Medien
Sonderrollen für Mediaplayer

* `Taste.Stopp`
* `button.play`
* `button.weiter`
* `button.prev`
* `Taste.Pause`
* `Schalt.Pause`
* `Taste.Vorwärts`
* `button.reverse`
* `Taste.schnellvorlauf`
* `Taste.schneller Rücklauf`
* `Taste.Lautstärke.up`
* `Taste.Lautstärke.leiser`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - keiner, 1 - alle, 2 - eins
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - ['play','stop','pause'] oder [0 - pause, 1 - play, 2 - stop] oder [true - play/false - pause]
* `medien.künstler`
* `media.album`
* `media.titel`
* `media.title.next`
* `media.cover` - Cover-URL
* `media.cover.big` - große Cover-URL
* `media.cover.small` - winzige Cover-URL
* `media.duration.text` - zB "2:35"
* `media.duration` - (`common.type=number`) Sekunden
* `media.elapsed.text` - zB "1:30"
* `media.elapsed` - (`common.type=number`) Sekunden
* `media.broadcastDate` - (`common.type=string`) Sendedatum
* `media.mute` - (`common.type=boolean`) true ist stumm
* `media.season` - (`common.type=string`) Staffelnummer (wichtig der Typ ist wirklich "string", um das Fehlen der Staffel mit "" anzeigen zu können)
* `media.episode` - (`common.type=string`) Episodennummer (wichtig der Typ ist wirklich "string", um das Fehlen der Episode mit "" anzeigen zu können)
* `media.mute.group` - (`common.type=boolean`) Stummschaltung der Gerätegruppe
* `media.tts` - Text-to-Speech
* `media.bitrate` - kbps
* `media.genre` - Genre-Song
* `media.date` - Jahreslied
* `media.track` - (`common.type=string`) aktuelle Play-Track-ID [0 - ~] (wichtig, dass der Typ wirklich `string` ist, um das Fehlen des Tracks mit "" anzeigen zu können
* `media.playid` - Mediaplayer-Track-ID
* `media.add` - aktuelle Wiedergabeliste hinzufügen
* `media.clear` - aktuelle Playlist löschen (nur schreiben)
* `media.playlist` - json-Array wie
* `media.url` - URL zum Abspielen oder aktuelle URL
* `media.url.announcement` - URL zum Abspielen der Ankündigung
* `media.jump` - Anzahl der Elemente, die in die Playlist gesprungen werden sollen (kann negativ sein)
* `media.content` - Art der wiedergegebenen Medien wie Audio/mp3
* `media.link` - Zustand mit der aktuellen Datei
* `media.input` - Nummer oder String der Eingabe (AUX, AV, TV, SAT, ...)
* `level.bass` - Basspegel
* `level.treble` - Höhenpegel
* `switch.power.zone` - Leistungszone

```
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

* `media.browser` - Json-Array wie "Dateien"

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
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

## Wetter
* `value.temperature` - Aktuelle Temperatur
* `value.temperature.windchill` - Tatsächlicher Windchill
* `value.temperature.dewpoint` - Aktueller Taupunkt
* `value.temperature.feelslike` - Tatsächliche Temperatur "fühlt sich an"
* `value.temperature.min` - Minimale Temperatur in den letzten 24h
* `value.temperature.max` - Maximale Temperatur in den letzten 24h
* `value.humidity` - tatsächliche oder durchschnittliche Luftfeuchtigkeit
* `value.humidity.min` - tatsächliche Luftfeuchtigkeit
* `value.humidity.max` - tatsächliche Luftfeuchtigkeit
* `value.speed.wind` - aktuelle oder durchschnittliche Windgeschwindigkeit
* `value.speed.max.wind` - maximale Windgeschwindigkeit in den letzten 24h
* `value.speed.min.wind` - minimale Windgeschwindigkeit in den letzten 24h
* `value.speed.wind.gust` - tatsächliche Windböengeschwindigkeit
* `value.direction.wind` - aktuelle oder durchschnittliche Windrichtung in Grad
* `value.direction.max.wind` - aktuelle Windrichtung in Grad
* `value.direction.min.wind` - aktuelle Windrichtung in Grad
* `weather.direction.wind` - aktuelle oder durchschnittliche Windrichtung als Text, z.B. NNW
* `date` - aktuelles Datum oder Datum der letzten gelesenen Informationen
* `date.sunrise` - Sonnenaufgang für heute
* `date.sunset` - Sonnenuntergang für heute
* `dayofweek` - Wochentag als Text
* `location` - Textbeschreibung des Standorts (z.B. Adresse)
* `weather.icon` - Aktueller Status-Icon-URL für den Moment
* `weather.icon.wind` - Aktueller Wind-Icon-URL für den Moment
* `weather.icon.name` - Aktueller Name des Statussymbols
* `weather.state` - Aktuelle Wetterbeschreibung
* `value.precipitation` - (`type: number, unit: mm`) Niederschlag der letzten 24 Stunden Regen/Schnee (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.hour` - Tatsächlicher Niederschlag in der letzten Stunde
* `value.precipitation.today` - Aktuelle Niederschlagsmenge für heute (bis 0:00)
* `value.precipitation.chance` - Tatsächliche Niederschlagswahrscheinlichkeit für heute
* `value.precipitation.type` - Aktueller Niederschlagstyp für heute. (`Typ: Zahl`) Zustände: 0 - NEIN, 1 - REGEN, 2 - SCHNEE, 3 - HAGEL
* `value.radiation` - Tatsächliche Sonneneinstrahlung
* `value.uv` - Tatsächlicher UV-Wert
* `value.clouds` - Wolken am Himmel. 0% - keine Wolken, 100% - viele Wolken.
* `value.rain` - Tatsächliche Regenmenge in den letzten 24 Stunden
* `value.rain.hour` - Tatsächliche Regenmenge in der letzten Stunde
* `value.rain.today` - Aktuelle Regenmenge für heute (bis 0:00)
* `value.snow` - Tatsächlicher Schneestand in den letzten 24 Stunden
* `value.snow.hour` - Tatsächlicher Schneestand in der letzten Stunde
* `value.snow.today` - Aktueller Schneestand für heute (bis 0:00)
* `value.snowline` - Tatsächliche Schneegrenze in Metern
* `weather.chart.url` - URL zum Diagramm für den Wetterverlauf
* `weather.chart.url.forecast` - URL zum Diagramm für die Wettervorhersage
* `weather.html` - HTML-Objekt mit Wetterbeschreibung
* `Wetter.Titel` - Sehr kurze Beschreibung
* `weather.title.short` - Sehr, sehr kurze Beschreibung (Ein Wort)
* `weather.type` - Art der Wetterinformationen
* `weather.json` - JSON-Objekt mit spezifischen Daten
* `value.speed.wind.forecast.0` - Windgeschwindigkeitsvorhersage für heute
* `weather.state.forecast.0` - Wetterbeschreibung für heute
* `value.direction.wind.forecast.0` - Windrichtungsvorhersage für heute in Grad
* `weather.direction.wind.forecast.0` - Windrichtungsvorhersage für heute als Text
* `value.pressure.forecast.0` - Druckprognose für heute
* `value.temperature.min.forecast.0` - Min. Temperaturvorhersage für heute
* `value.temperature.max.forecast.0` - Max. Temperaturvorhersage für heute
* `value.precipitation.forecast.0` - (`type: number, unit: %`) Vorhersage der Niederschlagswahrscheinlichkeit für heute
* `value.prepitation.forecast.0` - (`Typ: Zahl, Einheit: mm`) Vorhersage des Niederschlagsniveaus für heute
* `weather.title.forecast.0` - Sehr kurze Beschreibung für morgen
* `value.precipitation.day.forecast.0` - Niederschlagsvorhersage für den Tag
* `value.precipitation.night.forecast.0` - Vorhersage des Niederschlags für die Nacht

* `date.forecast.1` - morgen Datum
* `weather.icon.forecast.1` - Symbol für morgen
* `weather.state.forecast.1` - Wetterzustand von morgen
* `Wert.Temperatur.Min.Prognose.1`
* `Wert.Temperatur.max.Vorhersage.1`
* `value.prepitation.forecast.1` - (`type: number, unit: %`) Vorhersage der Niederschlagswahrscheinlichkeit für morgen
* `value.prepitation.forecast.1` - (`Typ: Zahl, Einheit: mm`) Vorhersage des Niederschlagsniveaus für morgen
* `value.direction.wind.forecast.1`
* `Wert.Geschwindigkeit.Windvorhersage.1`
* `Wert.Druck.Vorhersage.1`

## Die Info
* `info.ip` - IP des Geräts
* `info.mac` - Mac des Geräts
* `info.name` - Name des Geräts
* `info.address` - eine andere Adresse (z.B. KNX)
* `info.serial` - Seriennummer
* `info.firmware` - Firmware-Version
* `info.hardware` - Hardwareversion
* `info.port` - TCP-Port
* `info.standby` - wahr, wenn sich das Gerät im Standby-Modus befindet
* `info.status` - Gerätestatus
* `info.display` - Informationen, die auf dem Gerätedisplay angezeigt werden
* `date.start` - Zeichenfolge oder Zahl
* `date.end` - Zeichenfolge oder Zahl

## Gesundheit
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - Körperfettindex in %
* `value.health.weight` - Körpergewicht in kg, lbs
* `value.health.bmi` - bmi-Index
* `value.health.calories` - verbrannte Kalorien
* `value.health.steps` - Schritte erledigt
* `value.health.bpm` - Herzschläge pro Minute

## Andere
* `URL`
* `url.icon` - Symbol (zusätzlich kann jedes Objekt `common.icon` haben)
* `url.cam` - Webkamera-URL
* `url.blank` - URL in neuem Fenster öffnen
* `url.same` - URL in diesem Fenster öffnen
* `url.audio` - URL für Audiodatei
* `text.phone` - Telefonnummer

* `adapter.messagebox` (`common.type=object, common.write=true`) zum Senden von Nachrichten an E-Mail, Pushover und andere Adapter
* `adapter.wakeup` (`common.type=boolean, common.write=true`) weckt den Adapter aus dem Suspend-Modus