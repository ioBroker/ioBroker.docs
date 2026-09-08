---
chapters: {"pages":{"de/adapterref/iobroker.nut2/README.md":{"title":{"de":"ioBroker.nut2 — Einrichtung"},"content":"de/adapterref/iobroker.nut2/README.md"},"de/adapterref/iobroker.nut2/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.nut2/datapoints.md"},"de/adapterref/iobroker.nut2/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.nut2/faq.md"}}}
---
# Datenpunkte

Der Adapter bringt keine feste Liste an Datenpunkten mit. Er fragt den NUT-Server, was Ihre USV meldet (`LIST VAR`),
und baut den Baum aus der Antwort — zwei verschiedene USV-Modelle ergeben also zwei verschiedene Bäume. Was folgt,
erklärt die Teile, die immer gleich sind, und wie aus einer NUT-Variablen ein ioBroker-Datenpunkt wird.

Jeder Datenpunkt trägt eine kurze Erklärung in `common.desc`, und Wertelisten, Statustexte und Schweregrade erscheinen
in Ihrer ioBroker-Systemsprache.

## Vom NUT-Namen zur Objekt-ID

NUT benennt seine Variablen mit Punkten: `battery.charge.low`. ioBroker nutzt Punkte für die Hierarchie, deshalb bildet
der Adapter das ab:

- der **erste** Punkt trennt den Kanal ab — `battery`
- jeder weitere Punkt wird zum Bindestrich — `charge-low`

`battery.charge.low` landet damit unter `ups0.battery.charge-low`, und der Befehl `test.battery.start` unter
`ups0.commands.test-battery-start`. Eine Variable ganz ohne Punkt (manche Treiber melden ein blankes `ALARM`) hat
keinen Kanal und wird direkt unter dem Gerät angelegt.

Den echten NUT-Namen behält der Adapter intern, damit ein Schreibvorgang den richtigen Namen an den Server
zurückschickt — auch dort, wo die Abbildung nicht umkehrbar ist (Dreiphasen-Namen wie `input.L1-L2.voltage` enthalten
selbst einen Bindestrich).

## Adapterweite Datenpunkte

| Datenpunkt             | Bedeutung                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `info.connection`      | Der Adapter spricht mit dem NUT-Server. Über die Zugangsdaten sagt das nichts.                                |
| `info.upsTotal`        | Wie viele USVen der Server anbietet.                                                                          |
| `info.upsReachable`    | Wie viele davon die letzte Abfrage beantwortet haben.                                                         |
| `info.allUpsReachable` | Ein Wert statt jedes Geräts. **Falsch**, solange gar nichts gefunden wurde — „0 von 0" ist nicht „alles gut". |
| `notify`               | Beschreibbarer Auslöser. Jeder Schreibvorgang fragt sofort ab; siehe häufige Fragen.                          |

## Je USV

Jede USV am Server wird ein Gerät. Ihr Name kommt aus dem `desc`, das Sie in der `ups.conf` des Servers gesetzt haben;
ohne einen solchen nimmt der Adapter Hersteller und Modell aus der USV selbst.

### `info`

| Datenpunkt  | Bedeutung                                                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reachable` | Diese USV hat die letzte Abfrage beantwortet. Der Wert trägt auch das Online-Symbol am Geräteobjekt und geht auf falsch, wenn der Adapter stoppt — ein gestoppter Adapter darf nicht weiter behaupten, es sei alles in Ordnung. |
| `notify`    | Das letzte upsmon-Ereignis, das dieser USV zugeordnet wurde.                                                                                                                                                                    |

### `status` — der ausgewertete Zustand

NUT meldet den Zustand einer USV als eine Zeichenkette aus Kürzeln, z. B. `OL CHRG`. Damit lässt sich in einem Skript
schlecht arbeiten, deshalb zerlegt der Adapter sie:

| Datenpunkt        | Bedeutung                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `raw`             | Die Originalzeichenkette, unverändert.                                                                                                                                                                                               |
| `display`         | Dieselbe Information als lesbarer Text in Ihrer Sprache, z. B. „Am Netz, Lädt".                                                                                                                                                      |
| `severity`        | Eine einzige Zahl, 0–4 (siehe unten).                                                                                                                                                                                                |
| 19 Wahrheitswerte | Je einer pro bekanntem Statusflag: `online`, `onBattery`, `lowBattery`, `charging`, `discharging`, `replaceBattery`, `overloaded`, `bypass`, `calibrating`, `forcedShutdown`, `alarm`, `ecoMode`, `testing`, `overheat` und weitere. |

`charging` und `discharging` werden zusätzlich aus `battery.charger.status` gefüllt, weil manche USV-Modelle den
Ladezustand dort melden statt über die Flags `CHRG`/`DISCHRG`.

Ein Kürzel, das der Adapter nicht kennt, geht **nicht** verloren — es bleibt in `raw` und `display` sichtbar. Die
NUT-Spezifikation erlaubt Treibern ausdrücklich eigene Kürzel, und für jedes einen Wahrheitswert zu erfinden wäre
geraten.

#### Schweregrade

| Stufe | Bedeutung | Ausgelöst durch                               |
| ----- | --------- | --------------------------------------------- |
| 0     | OK        | Am Netz                                       |
| 1     | Info      | Spannung wird gesenkt/angehoben, Kalibrierung |
| 2     | Warnung   | Auf Batterie, Batterie tauschen, Bypass       |
| 3     | Kritisch  | Auf Batterie **und** Batterie schwach         |
| 4     | Notfall   | Erzwungene Abschaltung                        |

Der Schweregrad beschreibt ausschließlich die **Stromversorgungslage**. Störungsflags wie `overloaded`, `alarm` und
`off` heben ihn bewusst nicht an — sie haben eigene Wahrheitswerte, und sie einzurechnen würde eine einzige Zahl zwei
verschiedene Dinge bedeuten lassen.

### Die Messkanäle

Welche davon existieren, hängt ganz von Ihrem USV-Treiber ab:

| Kanal     | Enthält                                                                   |
| --------- | ------------------------------------------------------------------------- |
| `battery` | Ladung, Restlaufzeit, Spannung, Typ, Temperatur                           |
| `device`  | Hersteller, Modell, Seriennummer, Gerätetyp                               |
| `driver`  | Welcher NUT-Treiber diese USV bedient, seine Version und Parameter        |
| `input`   | Was vom Netz ankommt — Spannung, Frequenz, Umschaltschwellen              |
| `output`  | Was die USV abgibt — Spannung, Frequenz, Strom                            |
| `ups`     | Die USV selbst — Last, Leistung, Temperatur, Verzögerungen, Countdowns    |
| `outlet`  | Schaltbare Ausgänge und Ausgangsgruppen, falls das Modell sie hat         |
| `ambient` | Umgebungssensoren, falls die USV oder ein angeschlossener EMP sie liefert |

Werte werden in dem Typ gespeichert, der sie wirklich sind: Zahlen als Zahlen mit Einheit (V, Hz, A, Ah, %, W, VA, s,
°C), Ja/Nein-Angaben als Wahrheitswerte, feste Vokabulare (`enabled`/`disabled`/`muted`, `charging`/`discharging`/…)
als Auswahllisten. Ein Wert, der numerisch sein soll und es nicht ist, wird mit einer Warnung verworfen statt als Müll
gespeichert — mit `Infinity` kann kein Diagramm etwas anfangen.

Countdowns (`ups.timer.shutdown` und Geschwister) sind **leer**, solange kein Countdown läuft. Treiber sagen das
unterschiedlich — die einen melden `-1`, die anderen das Wort `NotActive` —, und weder „minus eine Sekunde" noch ein
Textfehler wären brauchbar.

### `commands`

Je eine Taste pro Befehl, den die USV anbietet — angelegt nur, wenn **Befehle aktivieren** an ist _und_ Zugangsdaten
hinterlegt sind. Ein Tastendruck schickt `INSTCMD` und setzt sich selbst zurück.

Befehle, die Strom wegnehmen (`load.off`, `shutdown.*`, `bypass.*`), tragen ein Warnzeichen am Anfang ihrer Erklärung.

## Wem diese Objekte gehören

Name, Beschreibung, Typ, Rolle und Einheit aller Datenpunkte gehören dem Adapter — eine Umbenennung im Objektbaum wird
beim nächsten Abgleich zurückgesetzt. Ihre **Aufzeichnungseinstellungen** sind die Ausnahme: Die gehören Ihnen, werden
nie angefasst, und wenn der Adapter einen eigenen Datenpunkt umbenennt, wandert die Aufzeichnung mit.

Eine USV, die vom NUT-Server verschwindet, verliert ihre Objekte; kommt sie zurück, werden sie neu angelegt.