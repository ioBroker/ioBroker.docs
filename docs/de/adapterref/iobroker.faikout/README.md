---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.faikout/README.md
title: ioBroker.faikout
hash: tAkGEwvU31TCWSWTUtUhXAqkqZWQA09NLt0PoVWavZk=
---
![Logo](../../../en/adapterref/iobroker.faikout/admin/faikout.png)

# ioBroker.faikout

Verbinden Sie Daikin-Klimaanlagen, die mit einem [Faikout](https://codeberg.org/RevK/ESP32-Faikout) -Modul ausgestattet sind, mit ioBroker – ausschließlich über MQTT, komplett lokal, ohne Cloud und ohne Hersteller-API.

Der Adapter bringt **seinen eigenen MQTT-Broker** mit. Sie verbinden die Faikout-Module damit, und das war's; kein separater Broker, kein `mqtt` Adapterinstanz und keine Beeinträchtigung Ihrer bereits laufenden MQTT-Konfiguration.

## Warum ein spezieller Adapter?

Ein Faikout-Modul emuliert auch die alte lokale Daikin HTTP-API, sodass es mit dem `daikin` Adapter. Über MQTT hingegen werden deutlich mehr Informationen bereitgestellt – insbesondere Werte, die die HTTP-API überhaupt nicht liefert:

| Wert                                            | HTTP (`daikin` Adapter) | MQTT (dieser Adapter) |
| ----------------------------------------------- | ----------------------- | --------------------- |
| Luftfeuchtigkeit in Innenräumen                 | nicht gemeldet          | Ja                    |
| Energiezähler (gesamt / Heizung / Kühlung)      | nicht gemeldet          | Ja                    |
| Aktuelle Leistungsaufnahme                      | nicht gemeldet          | Ja                    |
| Kompressordrehzahl                              | gemeldet als 0          | Ja                    |
| Lüftergeschwindigkeit                           | nicht gemeldet          | Ja                    |
| Kältemitteltemperatur                           | nicht gemeldet          | Ja                    |
| Bedarfsgrenze, Lamellenwinkel, Voreinstellungen | nicht gemeldet          | Ja                    |
| WLAN- und Gerätediagnose                        | nur Version             | Ja                    |

## Datenpunkte werden dynamisch erstellt

Ein Faikout-Modul veröffentlicht ein Feld nur dann, wenn die angeschlossene Klimaanlage es tatsächlich unterstützt, und seine eigenen Einstellungen können weitere Felder ausblenden. Es gibt daher **keine feste Liste von Feldern** : Der Adapter erstellt genau die Datenpunkte, die er empfängt, und lässt die übrigen stillschweigend weg. Zwei Geräte unterschiedlicher Modelle führen daher berechtigterweise zu unterschiedlichen Objektstrukturen.

Felder, die der Adapter noch nicht kennt, werden trotzdem erstellt, wobei der Typ vom Wert abgeleitet wird, und im Protokoll vermerkt.

Objekte werden pro Gerät gruppiert:

- `<device>.control.*` — beschreibbar: Leistung, Modus, Zieltemperatur, Lüfter, Schwenkfunktion, Voreinstellung, Bedarf, Eco, Leistungsstark, Komfort, Streamer, Sensor, LED, Leise, Befeuchten. `selectedMode` ist der Betriebsmodus ohne „Aus“: Solange das Gerät läuft, entspricht dies `mode` Im ausgeschalteten Zustand behält es den zuletzt eingestellten Modus bei (aus dem nativen Status des Moduls übernommen). Durch Schreiben wird der Modus gesendet und das Gerät eingeschaltet.
- `mode`, `fan`, `swing` Und `preset` Es handelt sich um Text, so wie er vom Modul ausgegeben wird. Jeder Wert hat ein numerisches Gegenstück (`modeNum`, `fanNum`, `swingNum`, `presetNum`) mit `common.states` wie zum Beispiel `{0: "off", 1: "heat_cool", 2: "cool", 3: "heat", 4: "dry", 5: "fan_only"}` Für Lovelace und andere Tools, die Zahlen erwarten. Beide sind beschreibbar und bedeuten dasselbe: Ein Befehl an eine der beiden sendet genau einen Befehl an das Modul (als Text); beide werden mit `ack=true` Sobald das Modul die Bestätigung übermittelt hat, sind die Werte fixiert; neue Werte einer zukünftigen Firmware werden angehängt.
- `<device>.status.*` — Messwerte: Temperatur, Luftfeuchtigkeit, Energie, Leistung, Kompressor- und Lüfterdrehzahl
- `<device>.info.*` — Gerätediagnose: IP-Adresse, WLAN-Signal, Betriebszeit, Firmware

## Aufstellen

1. Installieren Sie den Adapter und öffnen Sie die Instanzkonfiguration.
2. Wählen Sie den Broker-Port (Standard) `1888` Es darf keine Konflikte mit anderen MQTT-Brokern geben. Optional können Sie einen Benutzernamen und ein Passwort festlegen; wenn Sie den Benutzernamen leer lassen, werden nicht authentifizierte Verbindungen zugelassen, was in einem Heimnetzwerk üblicherweise der Fall ist.
3. Öffnen Sie die Weboberfläche jedes Fakeout-Moduls, gehen Sie zu **Einstellungen → Allgemein** und stellen Sie **den MQTT-Host** auf ein. `<ioBroker IP>:<port>` Das Modul verbindet sich von selbst wieder.

### ioBroker in Docker ausführen

Der Broker-Port muss vom Container veröffentlicht werden, sonst können die Module ihn nicht erreichen. Fügen Sie eine Portweiterleitung für den konfigurierten Port hinzu.

### Moduleinstellungen für den vollständigen Datensatz

Was der Adapter anzeigen kann, hängt von den Einstellungen im Fakeout-Modul ab (Weboberfläche, **Einstellungen** ; die meisten befinden sich unter den **erweiterten** Einstellungen; ältere Firmware schreibt sie ohne Punkt, z. B. „false“). `haenable`, `nohumidity` Dies sind die relevanten:

| Einstellung                                                                                                             | Erforderlicher Wert                   | Wirkung                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **MQTT-Host** (Grundlagen)                                                                                              | `<ioBroker IP>:<port>`                | Verbindet das Modul mit dem Broker des Adapters.                                                                                                                                                                                                                                                                               |
| `ha.enable` ("Home Assistant")                                                                                          | **an** (Standardeinstellung)          | Das Modul veröffentlicht seine Messwerte (`state/<name>`) **nur** solange diese Funktion eingeschaltet ist. Aus bedeutet: Nur Diagnose, keine Temperatur-, Energie- oder Modusinformationen usw. – der Adapter protokolliert dann eine Warnung.                                                                               |
| `ha.fanrpm`                                                                                                             | auf (empfohlen)                       | Lüftergeschwindigkeit `status.fanfreq` Die Drehzahl wird in Umdrehungen pro Minute (rpm) statt in Hertz (Hz) angegeben (Standard: Hz, eine Dezimalstelle). Der Adapter erkennt das Gerät selbst (über die Home Assistant-Erkennung des Moduls) und stellt den Status entsprechend ein; die Drehzahlangabe ist einfach präziser. |
| `ha.comprpm`                                                                                                            | auf (empfohlen)                       | Kompressordrehzahl `status.comp` in U/min statt Hz (Standard: Hz). Wird auch automatisch erkannt.                                                                                                                                                                                                                               |
| `ha.switches`                                                                                                           | An                                    | Fügt hinzu `autoe` (Hauptschalter der eigenen Automatisierung des Moduls) zu den Messwerten.                                                                                                                                                                                                                                    |
| `no.hvacaction`                                                                                                         | **aus** (Standardeinstellung ist ein) | Fügt hinzu `action` — was das Gerät gerade tut (Heizen, Kühlen, Leerlauf …).                                                                                                                                                                                                                                                    |
| `no.humidity`                                                                                                           | Aus (Standardeinstellung)             | Luftfeuchtigkeit `hum` Schalten Sie es nur ein, wenn das Gerät keinen Feuchtigkeitssensor hat.                                                                                                                                                                                                                                  |
| `no.demand`                                                                                                             | Aus (Standardeinstellung)             | Nachfragelimit `demand` Die                                                                                                                                                                                                                                                                                                     |
| `no.led`                                                                                                                | **aus** (Standardeinstellung ist ein) | LED-Steuerung – nur wenn die Display-LED des Geräts geschaltet werden kann.                                                                                                                                                                                                                                                    |
| `no.humidify`                                                                                                           | aus (Standardeinstellung ist ein)     | Steuerung des Luftbefeuchters – nur für Geräte mit Luftbefeuchter.                                                                                                                                                                                                                                                             |
| andere `no.*` (`econo`, `powerful`, `comfort`, `streamer`, `quiet`, `sensor`, `swingv`, `swingh`, `flap`, `antifreeze`) | Aus (Standardeinstellung)             | Jede dieser Optionen verbirgt die entsprechende Funktion. Aktivieren Sie sie nur für Funktionen, die Ihrem Gerät tatsächlich fehlen.                                                                                                                                                                                           |
| `livestatus`                                                                                                            | auf (empfohlen)                       | Sofortige Meldungen statt jeder `reporting` Sekunden, siehe unten.                                                                                                                                                                                                                                                              |
| `reporting`                                                                                                             | 60 (Standardwert)                     | Intervall der periodischen Meldung in Sekunden.                                                                                                                                                                                                                                                                                |

Für Energiezähler, Leistungsaufnahme, Kompressor- und Lüfterdrehzahl, Kältemittel und Außentemperatur sind keine Einstellungen erforderlich: Das Modul liest diese Daten automatisch vom Gerät aus. Ob die Werte angezeigt werden, hängt ausschließlich vom Modell ab – ein Gerät, das keinen Wert meldet, verfügt schlichtweg über keinen entsprechenden Datenpunkt.

### Schnelleres Feedback

Ein Modul meldet standardmäßig alle 60 Sekunden seinen Status (`reporting` Einstellung), sodass ein Befehl erst mit dem nächsten Bericht bestätigt wird – rechnen Sie mit bis zu einer Minute. Aktivieren `livestatus` Eine Einstellung in den **Zusatzoptionen** des Moduls bewirkt, dass die Meldung sofort erfolgt.

### Einstellungen, die die Klimaanlage nicht akzeptiert

Ein Modul sendet eine Einstellung an die Klimaanlage und liest sie zurück. Wenn das Gerät nach mehreren Durchläufen immer noch seinen alten Wert meldet (`s21.tries` (Standardwert: 10), verwirft das Modul die Änderung, zeigt den Wert der Einheit erneut an und veröffentlicht die abgelehnten Felder auf `error/<name>/failed-set` Bis dahin zeigt das Modul bereits den angeforderten Wert an, es sieht also so aus, als ob etwas ihn zurückgesetzt hätte.

Der Adapter protokolliert dies als Warnung (`… the air conditioner did not accept demand=90 …`) und speichert die letzte Ablehnung in `<device>.info.failedSet` als JSON mit den angeforderten Werten und der Zeit: `{"time":"2026-11-05T14:40:51.085Z","settings":{"demand":90}}` Der Adapter selbst sendet in dieser Situation nichts.

Bekannter Fall: **Nachfragesteuerung** (`control.demand` Einige Geräte erkennen den Befehl, zeigen aber weiterhin 100 % an – dies tritt bei Geräten auf, die noch mit dem Daikin-eigenen WLAN-Adapter ausgestattet sind. Das Modul kann nur den Prozentsatz weiterleiten; die Modi der Daikin-App (Aus/Automatisch/Fest) sind nicht Teil der bekannten S21-Schnittstelle. Der Econo-Modus wird nur im laufenden Betrieb des Geräts aktiviert.

### Lovelace, Typerkennung und andere Werkzeuge, die Zahlen erwarten

Das Modul spricht Text (`mode` =`"cool"`), und die Textzustände bleiben die Hauptform für Skripte, Vis und die Gerätekarten. Lovelace konvertiert jedoch die Schlüssel von `common.states` zu Zahlen, wenn es eine Klimaentität schreibt; mit Textschlüsseln ergibt dies `NaN` und der Befehl geht verloren. Verwenden Sie die numerischen Zwillinge in `<device>.control.*` für solche Werkzeuge:

| Zustand     | Rolle                       | Werte                                                                               |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------- |
| `modeNum`   | `level.mode.airconditioner` | 0 Aus, 1 Heizen/Kühlen, 2 Kühlen, 3 Heizen, 4 Entfeuchten, 5 Nur Lüfter             |
| `fanNum`    | `level.mode.fan`            | 0 Automatik, 1 Nacht, 2 niedrig, 3 niedrig-Mittel, 4 mittel, 5 mittel-Hoch, 6 hoch  |
| `swingNum`  | `level.mode.swing`          | 0 Aus, 1 Ein, 2 Vertikal, 3 Horizontal, 4 Beides, 5 Komfort, 6 Horizontaler Komfort |
| `presetNum` | `level.mode`                | 0 für Zuhause, 1 für Öko, 2 für Boost                                               |

Die Rollen ermöglichen es dem Typendetektor, sie als Teil einer Klimaanlage zu erkennen. Schreiben `2`, `"2"` oder das Etikett `"cool"` Zu `modeNum` sendet einen Befehl `cool` zum Modul; `modeNum` Und `mode` sind beide eingestellt mit `ack=true` Wenn das Modul dies bestätigt, wird ein Wert außerhalb der Liste verworfen und eine Warnung im Protokoll ausgegeben. Die Zwillinge werden mit dem ersten Bericht eines Moduls nach dem Update erstellt.

## Visualisierung (vis Templates)

Der Ordner[`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.faikout/blob/main/vis-templates/) Enthält vorgefertigte **vis 1-** Ansichten für zwei Einheiten: Übersicht, eine Detailseite pro Einheit mit Steuerelementen, Energiehistorie und eine Telefonansicht. Sie verwenden ausschließlich Datenpunkte von `faikout.0` und die Widgets dieses Adapters – keine Skripte, keine anderen Adapter. Importanleitung: [vis-templates/README.md](/#/docs/adapterref/iobroker.faikout/vis-templates/README.md) .

## Markenrecht und Beziehung zum Hardwareprojekt

_Faikout_ ist eine eingetragene Marke der Andrews & Arnold Ltd. Dieser Adapter ist eine unabhängige Software und steht in keiner Verbindung zu Andrews & Arnold Ltd oder den Entwicklern von [ESP32-Faikout](https://codeberg.org/RevK/ESP32-Faikout) . Er wird von diesen auch nicht unterstützt. Der Name dient lediglich der Angabe, mit welcher Hardware der Adapter kommuniziert.

Der Quellcode des Hardwareprojekts ist nicht enthalten. Der Adapter wurde von Grund auf für die MQTT-Schnittstelle entwickelt; Feldnamen und Wertelisten müssen übereinstimmen, da dies vom Protokoll vorgegeben ist. Das Hardwareprojekt ist unter der GPL lizenziert, dieser Adapter unter der MIT-Lizenz – es handelt sich um separate Werke, die über ein Netzwerkprotokoll kommunizieren.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-11-19)
- `control.swing` / `swingNum`: new value `H+C` (`horizontalComfort`, number 6) for comfort mode with
  horizontal swing. Comfort is a mode of the vertical louvres; the swing selector (e.g. in Lovelace) can now
  combine it with horizontal swing. Needs Faikout firmware with `H+C` support; older firmware reports `C`
  during comfort and treats a written `H+C` as `off`.
- Renamed modules (issue #6): after changing the hostname of a module, the adapter kept the old name in memory
  until the next restart and, once its objects were deleted, logged `State "...consumption..." has no existing
  object` every hour. The module is now recognised by its hardware ID (`info.id`): the old name is no longer
  updated, its consumption counters (today, month, JSON series) continue under the new name, and its objects
  stay untouched until you delete them (SmarthomeElektroniker)
- Deleted objects are noticed while the adapter runs: a deleted device is dropped, a deleted state or branch is
  created again before the next write; states are no longer written to objects that do not exist
  (SmarthomeElektroniker)
- Dev dependency `@iobroker/testing` 6.3.2 (SmarthomeElektroniker)

### 0.2.0 (2026-11-13)
- Numeric twins of the text control states: `control.modeNum`, `fanNum`, `swingNum` and `presetNum` with
  `common.states` (`{0: "off", 1: "heat_cool", ...}`) and the roles `level.mode.airconditioner`,
  `level.mode.fan`, `level.mode.swing` and `level.mode`, for Lovelace and the type detector (forum thread
  85668). Both forms are writable; a command on either sends exactly one command to the module, both are set
  with `ack=true` when the module confirms. Text states, vis widgets and device cards are unchanged.

### 0.1.0 (2026-11-12)
- Device manager support (`@iobroker/dm-utils`): one card per air conditioner in the admin tab "Devices"
  with the running operation (mode, current action, room/target/outside temperature, fan speed, humidity,
  power, energy today), one WiFi symbol for connection and signal (four levels plus dBm, crossed out
  when the module is disconnected), warning when the unit does not respond.
  On/off is a toggle in the status line that follows the state live and asks for confirmation. Mode (without
  "off", shows the last mode while the unit is off), target temperature (slider) and fan speed (Auto, Quiet and
  five level bars) can be changed directly on the card, also while the unit is off; choosing a mode switches the
  unit on. Everything is on the card itself, there is no separate control dialog. All controls write the
  `control.*` states, so commands take the usual path. No configuration actions on the cards.
- New state `control.selectedMode` (see above). German name of the outside temperature with "ß".

### 0.0.19 (2026-11-10)
- A setting the air conditioner does not accept (module message `error/<name>/failed-set`, e.g. demand control) is
  logged as a clear warning instead of the bare payload, and the last rejection is stored in the new state
  `info.failedSet` (requested values and time). Other module errors are logged with their topic (`comms`, …).
- Much lower CPU and database load (issue #5): states are only written when their value changes (unchanged values are
  refreshed every 5 minutes so their timestamp stays current), the hourly JSON series only at the change of hour, the
  daily/monthly series only when their content changes, and the meter readings in the device object at the change of
  hour, after a rebase, every 10 minutes at most and on shutdown – instead of everything on every module message.

### 0.0.18 (2026-10-25)
- VIS widgets: fixed rendering in the vis runtime – the widgets showed nothing and logged `missing ) after argument list`.
  They now subscribe the data points of their device themselves (vis only subscribed the device object), so values
  and states are shown and kept up to date. Energy history: works with vis 1 (`getStates`), shows a fixed range
  (last 24 hours / 31 days / 12 months) and formats numbers in the VIS language.
- VIS widgets: the accent colour follows the mode again (heating orange, cooling blue, off grey) – jQuery 1.11 in vis 1
  cannot set CSS custom properties with `.css()`, so it always stayed blue.
- New: vis templates (`vis-templates/`) – overview, detail page per unit, energy and phone view.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

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