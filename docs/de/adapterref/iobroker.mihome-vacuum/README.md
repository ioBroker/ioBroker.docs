---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker Mihome-Vakuumadapter
hash: DsREMFfOaw9z0dlnNY49Qlc84whjR++0OdAKQiGehj0=
---
![Logo](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# IoBroker Mihome-Vakuumadapter
![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung hier](README_de.md)

Mit diesem Adapter können Sie den Xiaomi-Staubsauger steuern.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Inhalt
 - [Bekannte Fehler](#known_errors)
    - [Fehler bei der Installation (Leinwand)](#error_at_installation)
    - [HTTP-Fehler beim Abrufen des Token-Cookies{}](#http_error_when_getting_token_cookie{})
- [Setup](#Konfiguration)
    - [Adapter konfigurieren](#adapter-configuration)
        - [Steuerung über Alexa] (#control-over-alexa)
        - [Zweiter Roboter](#second-robot)
    - [Vetudo konfigurieren](#valetudo-config)
- [Funktionen](#Funktionen)
    - [S50-Befehle](#Befehle-des-S50)
    - [Gehe zu](#goto)
- [zone clean](#zoneclean)
    - [Zimmer](#Zimmer)
    - [Zeitgeber](#Zeitgeber)
    - [Eigene Befehle] (#Sende-deine-eigenen-Befehle)
    - [sendTo Hook] (#send-custom-commands-with-sendto)
- [Widget] (#Widget)
- [Fehler](#Fehler)
- [Änderungsprotokoll](#Änderungsprotokoll)

## Unterstützte Geräte und Funktionen
| Gerät | Basissteuerung | Geschichte | Zimmer | Karte |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| viomi.vacuum.v6 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v7 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v8 | :heavy_check_mark: | :x: |:x: | :x: |
| rockrobo.vakuum.v1 | :heavy_check_mark: | :heavy_check_mark: |:x: |:schwere_check_mark: |
| roborock.vakuum.s4 | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |
| roborock.vakuum.s5 | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |
| roborock.vacuum.s5e | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |
| roborock.vacuum.m1s | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |
| roborock.vacuum.a10 | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |
| roborock.vacuum.a15 | :heavy_check_mark: | :schweres_Häkchen: |:schweres_Häkchen: |:schweres_Häkchen: |

## Bekannte Fehler
### Fehler bei der Installation
wenn Ihre Installation fehlerhaft ausgeführt wird. Das Canvas-Paket konnte nicht installiert werden

„npm ERR! canvas@2.6.1 install: node-pre-gyp install --fallback-to-build npm ERR! Ausgangszustand 1``

Bitte installieren Sie Canvas und die Bibliotheken manuell mit: `` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ``

wechseln in: `cd /opt/iobroker/node_modules/iobroker.mihome-vacuum` dann `npm install canvas`

### HTTP-Fehler beim Abrufen des Token-Cookies{}
Manchmal können Sie keine Verbindung zur Xiaomi-Cloud herstellen.
Bitte öffnen Sie den Browser, gehen Sie zu Mihome und melden Sie sich an. Geben Sie den Code ein, den Sie per Mail erhalten haben. Danach sollte die Verbindung funktionieren.

### Ruft nur Helo Message Timeout ab
BITTE stellen Sie sicher, dass Ihr Roboter mit der Mihome App und NICHT mit der Roborock App verbunden ist

### Keine Verbindung mit S7
Aktuell gibt es ein Problem, wenn der Robot und ioBroker nicht dasselbe Subnetz verwenden.

## Aufbau
Derzeit ist das Auffinden des Tokens das größte Problem.
Eine Option zum Extrahieren des Tokens ist die Verwendung dieses Dienstprogramms: https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor

Ansonsten folgen Sie bitte der Anleitung im Link:

[Token-Tutorial](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Adapterkonfiguration
- Als IP-Adresse muss die IP-Adresse des Roboters im Format „192.168.178.XX“ eingegeben werden
- Der Port des Roboters ist standardmäßig auf "54321" eingestellt, dies sollte nicht geändert werden
- Eigener Port, sollte nur mit zweitem Roboter geändert werden
- Abfrageintervall Die Zeit in ms, in der die Statuswerte des Roboters abgerufen werden (sollte nicht <10000 sein)

#### Kontrolle über Alexa
Für Alexa wird der spezielle Steuerungszustand `clean_home` erstellt.
Es ist ein Schalter, der bei `true` dem Sauger startet und bei `false` nach Hause geht.
Es wird automatisch ein intelligentes Gerät im Cloud-Adapter erstellt mit dem Namen „Staubsauger“, der im Cloud-Adapter geändert werden kann.

#### Angehaltene Zonenreinigung mit Starttaste fortsetzen
Wenn diese Option aktiviert ist, setzt der Staubsauger die Zonenreinigung fort, wenn der Status „Start“ auf „true“ gesetzt wird, wenn er während einer laufenden Zonenreinigung angehalten wurde.
Wenn diese Option deaktiviert ist, startet der Staubsauger eine neue "normale Reinigung", wenn Sie den Startbefehl senden, auch wenn er während einer laufenden Zonenreinigung angehalten wurde.

- Experimentell: Über die Checkbox „Eigene Befehle senden“ werden Objekte erstellt, über die man eigene Befehle an den Roboter senden und empfangen kann.

#### Zweiter Roboter
Sollen zwei Roboter über ioBroker gesteuert werden, müssen zwei Instanzen erstellt werden. Beim zweiten Robot muss der eigene Port (Default: 53421) für ioBroker geändert werden, damit beide Robots ioBroker über unterschiedliche Ports erreichen können.

## Kartenkonfig
Es gibt zwei Möglichkeiten, die Karte zu erhalten. Die ersten holen sich die Karte aus der Cloud. Daher müssen Sie sich anmelden und den richtigen Roboter aus der Liste auswählen

Zweiter Weg ist die Karte von Valetudo (nur lokale Verbindung).
Daher müssen Sie valetudo rooten und auf Ihrem Gerät installieren.
Sie können [Valetudo RE](https://github.com/rand256/valetudo) oder normal [Valetudo](https://github.com/Hypfer/Valetudo) verwenden.

![Konfig](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Um die Karte zu verwenden, müssen Sie in der Konfiguration Valetudo oder Originalkarte auswählen
- Anforderungsintervall muss mehr als 1000 ms betragen, dies ist das Intervall für die Aktualisierung der HTML-Karte
- Das Kartenintervall muss mehr als 5000 ms betragen. Dieses Intervall aktualisiert die PNG-Kartendatei (Sie können dies für Telegram oder Vis oder alles andere verwenden).
- Farbe dort können Sie die Farben für das Kartenbeispiel auswählen:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- Roboter dort kannst du verschiedene Roboter oder andere Fahrzeuge für die Map auswählen

### Kartennutzung
Die Karte wird entweder als base64-raw oder als PNG gespeichert.

Das Kartenbild finden Sie in folgenden Datenpunkten:

- base64: `mihome-vacuum.0.cleanmap.map64`
- PNG: `mihome-vacuum.0.cleanmap.mapURL`

Sie können beide Bilder als Bildquelle im gewünschten VIS verwenden. Im HTML-Stil können Sie das Bild folgendermaßen verwenden:

`<img src="mihome-vacuum.0.cleanmap.map64">`

Mit zusätzlichen Style-Tags können Sie den Kartenstil in der Größe ändern und/oder formatieren.

Um die Karte in `jarvis` zu verwenden, verwenden Sie einfach einen der Datenpunkte als URL des DisplayImage-Widgets.
Dort können Sie die Größe des Bildes oder des gesamten Widgets ändern. Im Falle des responsiven Designs von jarvis passt sich die Größe der Karte an die Anzeigegröße an.

Um die Karte in `ioBroker VIS` anzuzeigen, können Sie ein normales HTML-Widget verwenden, z. B.:

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Die Verwendung der base64-Karte ist schneller und zeigt die Position des Roboters in der Nähe in Echtzeit an.

## Funktionen
### Befehle des S50 (zweite Generation)
Die Kartengröße ist immer 52000 mm x 52000 mm, somit sind Werte von 0 bis 51999 mm möglich.
Position und Lage der Karte kann leider nicht abgefragt werden, diese kann sich von Saugen zu Saugen ändern. Als Grundlage dient immer die letzte Saugkarte, sowie in der App.
Nimmt der Roboter nur einen Bereich auf und baut die Karte immer gleich auf, kann man ihn zuverlässig an Orte schicken oder den Bereich saugen lassen.

#### Gehe zu
Um den Staubsauger zu einem Punkt zu fahren, muss das „goTo“-Objekt wie folgt gefüllt werden:

```
xVal, yval
```

Die Werte müssen dem oben genannten Umfang genügen und die x- und y-Koordinaten auf der Karte angeben.

Beispiel:

```
24,850.26500
```

#### Zonenreinigung
Um eine Zone zu saugen, muss ZoneClean wie folgt gefüllt werden:

```
[X1, y1, x2, x2, count]
```

Wobei x und y die Koordinaten der rechteckigen Fläche sind und die Reinigungsvorgänge "zählen".
Du kannst auch mehrere Bereiche gleichzeitig saugen lassen:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Beispiel:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Räume
Neuere Staubsauger mit aktueller Home App unterstützen die Definition von Räumen, siehe [Video](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Jeder Raum in der aktuellen Karte hat einen Index, der dann von der App dem Raum zugeordnet wird. Vom Roboter bekommen wir nur ein Mapping mit Raumnummer und Index. Der Adapter fragt diese Räume bei jedem Start des Adapters ab und erstellt für jeden Raum einen Kanal, der dann den aktuellen Raumindex kennt. Das gleiche passiert manuell mit dem Button loadRooms. Dieser Kanal kann dann den ioBroker-Räumen zugewiesen werden. Wird der Button roomClean gedrückt, wird der Index der Karte ermittelt und an den Roboter gesendet, damit dieser dann diesen Raum saugen kann. Davor wird die FAN-Leistung auf Einzelraumabsaugung eingestellt. Falls Sie noch keine Möglichkeit haben, die Räume in der App zu benennen, gibt es auch die Möglichkeit, einen solchen Kanal manuell durch Angabe des Kartenindexes anzulegen. Es ist auch möglich, Zonenkoordinaten anstelle von mapIndex hinzuzufügen.
Wenn Sie spontan mehrere Räume reinigen möchten, können Sie dies über multiRoomClean tun, indem Sie die ioBroker-Räume diesem Datenpunkt zuweisen und dann den Button drücken.

#### Timer
Sobald der Staubsauger die Raumfunktion unterstützt (siehe oben), ist es auch möglich, Timer zu erstellen, die dann die entsprechenden Raumkanäle auslösen oder deren MapIndexes ermitteln.
Der Timer könnte direkt über Räume und/oder Raumkanäle getriggert werden.
Die Timer selbst werden über den Config-Bereich angelegt, werden dann aber zu einem Datenpunkt. Dort kann jeder Timer einmalig aktiviert/deaktiviert oder übersprungen werden. Auch ein Direktstart ist möglich. Der Vorteil der ioBroker-Timer ist, dass sie im VIS angezeigt und verwendet werden können und Sie den Roboter vom Internet trennen können, da die Timer der App von China aus getriggert werden.

### Senden Sie Ihre eigenen Befehle
HINWEIS: Diese Funktion sollte nur von Experten verwendet werden, da der Sauger durch falsche Befehle beschädigt werden kann

Der Roboter unterscheidet zwischen den Befehlen in Methoden (methods) und Parametern (params), die zur Spezifikation der Methoden dienen.
Unter dem Objekt `mihome-vacuum.X.control.X_send_command` können Sie eigene Befehle an den Roboter senden.
Die Objektstruktur muss wie folgt aussehen: method; [params], zB ``` app_segment_clean;[18,20] ```

Unter dem Objekt `mihome-vacuum.X.control.X_get_response` wird die Antwort vom Roboter nach dem Absenden eingetragen.
Wurden Parameter abgefragt, erscheinen diese hier im JSON-Format. Wurde nur ein Befehl gesendet, antwortet der Roboter nur mit „0“.

Die folgenden Methoden und Parameter werden unterstützt:

| Methode | Parameter | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                       |
| get_timer | | Gibt den eingestellten Timer zurückSetzen der Saugzeiten BSp. 12 Uhr 30 in 5 Tagen |
| set_timer | `[["TIME_IN_MS",["30 12 * * 1,2,3,4,5",["start_clean",""]]]]` | Timer aktivieren / deaktivieren |
| upd_timer | `["1481997713308","ein/aus"]` | |
| | | Rettet die Zeiten des Do Not Disturb |
| get_dnd_timer | | DND-Zeiten löschen |
| set_dnd_timer | `[22,0,8,0]` | |
| set_dnd_timer | `[22,0,8,0]` | |
|                 |                                                                     |                                                                                          |
| app_rc_start | | Starten Sie die Fernsteuerung |
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Bewegen. Die Sequenznummer muss fortlaufend sein, WERT1 (Geschwindigkeit) = -0,3-0,3, WERT2 (Rotation) = -3,1-3,1, WERT3 (Dauer)|
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Bewegen. Die Sequenznummer muss fortlaufend sein, WERT1 (Geschwindigkeit) = -0,3-0,3, WERT2 (Rotation) = -3,1-3,1, WERT3 (Dauer)|
| app_segment_clean | `[12,15]` | Reinraum mit Index 12 und 15 |
| app_segment_clean | `[12,15]` | Reinraum mit Index 12 und 15 |

weitere Methoden und Parameter finden Sie hier ([Verknüpfung](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Senden Sie benutzerdefinierte Befehle mit sendTo
Sie können diese benutzerdefinierten Befehle auch von anderen Adaptern mit `sendTo` senden. Verwendung mit `method_id` und `params` wie oben definiert:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Das Objekt `response` hat zwei Eigenschaften: `error` und (wenn kein Fehler aufgetreten ist) `result`.

Einige vordefinierte Befehle können auch auf diese Weise ausgegeben werden:

```
sendTo("mihome-vacuum.0",
    commandName,
    param,
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);

```

Wenn nur ein einzelner Parameter möglich ist, können Sie nur einen String senden, andernfalls müssen Sie ein Objekt mit erwarteten Parametern verwenden, z.

```
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    "105",
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    {"fanSpeed" : 105},
    function (response) { /* do something with the result */}
);

```

Die unterstützten Befehle sind:

| Beschreibung | `commandName` | Erforderliche Parameter | Bemerkungen |
| Starten Sie den Reinigungsvorgang | `startVacuuming` | - Keine - | |
| Stoppen Sie den Reinigungsvorgang | `stopVacuuming` | - Keine - | |
| Unterbrechen Sie den Reinigungsvorgang | `pause` | - Keine - | |
| Wartende Jobs löschen | `clearQueue` | - Keine - | |
| Reinigen Sie einen kleinen Bereich um den Roboter | `cleanSpot` | - Keine - | |
| Gehen Sie zurück zur Basis | `charge` | - Keine - | |
| Sag "Hallo, ich bin hier drüben!" | `findMe` | - Keine - | |
| Überprüfen Sie den Status der Verbrauchsmaterialien (Pinsel usw.) | `getConsumableStatus` | - Keine - | |
| Status der Verbrauchsmaterialien (Pinsel usw.) zurücksetzen | `resetConsumables` | `consumable` | String: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Erhalten Sie eine Zusammenfassung aller bisherigen Reinigungsvorgänge | `getCleaningSummary` | - Keine - | |
| Erhalten Sie eine detaillierte Zusammenfassung eines früheren Reinigungsvorgangs | `getCleaningRecord` | `recordId` | |
| Holen Sie sich eine Karte | `getMap` | - Keine - | Unbekannt, was mit dem Ergebnis geschehen soll |
| Holen Sie sich den aktuellen Status des Roboters | `getStatus` | - Keine - | |
| Rufen Sie die Seriennummer des Roboters ab | `getSerialNumber` | - Keine - | |
| Detaillierte Geräteinformationen abrufen | `getDeviceDetails` | - Keine - | |
| Abrufen des *Bitte-nicht-stören*-Timers | `getDNDTimer` | - Keine - | |
| Stellen Sie einen neuen *Bitte-nicht-stören*-Timer ein | `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Löschen Sie den *Bitte-nicht-stören*-Timer | `deleteDNDTimer` | - Keine - | |
| Abrufen der aktuellen Lüftergeschwindigkeit | `getFanSpeed` | - Keine - | |
| Stellen Sie eine neue Lüftergeschwindigkeit ein | `setFanSpeed` | `fanSpeed` | `fanSpeed` ist eine Zahl zwischen 1 und 100 |
| Abrufen des aktuellen Waterbox-Modus | `getWaterBoxMode` | - Keine - | |
| Legen Sie einen Mop-Modus fest | `setMopMode` | `mopMode` | `mopMode` ist eine Zahl zwischen 300 und 303 |
| Rufen Sie den aktuellen Mop-Modus ab | `getMopMode` | - Keine - | |
| Stellen Sie einen Waterbox-Modus ein | `setWaterBoxMode` | `waterBoxMode` | `waterBoxMode` ist eine Zahl zwischen 200 und 204 |
| Starten Sie die Fernbedienungsfunktion | `startRemoteControl` | - Keine - | |
| Geben Sie einen Bewegungsbefehl für die Fernsteuerung aus | `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Die Sequenznummer muss fortlaufend sein, die Dauer ist in ms |
| Beenden Sie die Fernbedienungsfunktion | `stopRemoteControl` | - Keine - | |
| Reinraum/Reinräume | `cleanRooms` | `rooms` | `rooms` ist ein kommaseparierter String mit enum.rooms.XXX |
| sauberes Segment | `cleanSegments` | `rooms` \| {Räume:`rooms`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`} | `rooms` ist eine Zahl oder ein Array mit mapIndex oder ein kommaseparierter String mit mapIndex |
| saubere Zone | `cleanZone` | `coordinates` \| {Koordinaten:`coordinates`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,Lüftergeschwindigkeit:`fanSpeed`} | `coordinates` ist ein String mit Koordinaten und Anzahl, siehe [zoneClean](#zonecleaning) |
| start Entstaubung | `startDustCollect` | - Keine - | |
| stop Staubansammlung | `stopDustCollect` | - Keine - | |
| stop Staubansammlung | `stopDustCollect` | - Keine - | |

##-Widget
![Widget](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Fehler
- Gelegentliche Verbindungsabbrüche liegen aber nicht am Adapter sondern meist an den eigenen Netzen
- Widget zur Zeit ohne Funktion

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->
### 3.8.6 (2022-11-12)
* (deher) Fixtyp für roomMopMode

### 3.8.5 (2022-11-10)
* (Dirkhe) parseErrors auf Debug-Level verschieben
* (Dirkhe) Neuinstanziierung bei Reconnect vermeiden

### 3.8.4 (2022-11-07)
* (Dirkhe) Logging für sendMessage auf debug ändern

### 3.8.3 (2022-11-01)
* (Dirkhe) Logging von Timeouts ändern
* (Dirkhe) Teile des Tokens im Log verstecken

### 3.8.2 (2022-10-31)
* (Dirkhe) Bump Canvas auf 2.10.2
* (Dirkhe) Karte deaktivieren, wenn CANVAS nicht installiert ist #681

### 3.8.1 (2022-10-30)
* (Dirkhe) entfernt die veraltete Node 12.x-Version für den Workflow

### 3.8.0 (2022-10-30)
* (Dirkhe) fehlenden Bestandsbefehl für mop_mode behoben
* (Dirkhe) Mop-Modus auch für cleanSegments und cleanZone hinzugefügt
* (Dirkhe) Wischmodus auch für Räume hinzufügen
* (MeisterTR) Karte zoomen und Teppich anzeigen

### 3.7.0 (2022-10-28)
* (Dirkhe) Akzeptiere benutzerdefinierte Befehle mit einem einzigen Parameter
* (Dirkhe) optionale Parameter waterboxMode und fanSpeed für cleanSegments und cleanZone
* (Dirkhe) Absturz beim Senden einer Nachricht behoben (#652)
* (Dirkhe) Wischmodus hinzufügen (#670)
* (Dirkhe) fan_power für S7 Ultra anpassen (#677)

### 3.6.0 (2022-07-07)
* (Dirkhe) Staubsammeln hinzufügen

### 3.5.0 (2022-06-29)
* (Dirkhe) Roborock S6 Pure-Modell hinzugefügt
* (Dirkhe) einige Hinweise in Readme hinzugefügt/erweitert
* (Dirkhe) zusätzliche Protokollinformationen für cleanRooms hinzugefügt
* (Dirkhe) Fehler bei falschem Map-DP behoben

### 3.4.2 (2022-06-24)
* (Apollon77) Abhängigkeiten aktualisieren, um einen besseren automatischen Neuaufbau zu ermöglichen

### 3.4.1 (2022-05-31)
* (Dirkhe) fehlende Vakuumzustände hinzugefügt
* (Dirkhe) hinzufügen Hafenzustand Abwassertank voll

### 3.4.0 (2022-05-28)
* (Apollon77) Mehrere potenzielle Absturzfälle behoben, die von Sentry gemeldet wurden

### 3.3.6 (2022-05-03)
* (Dirkhe) Fleckreinigung behoben

### 3.3.5 (2022-02-07)
* (Dirkhe) hat einige Fehler behoben
* (lasthead0) kyrillisches Problem behoben RC4 lib#

### 3.3.3 (2022-01-20)
* (Dirkhe) hat einige Fehler behoben
* (Dirkhe) füge RC4 hinzu

### 3.3.1 (2021-10-02)
* (MeisterTR) IOBROKER-MIHOME-VACUUM-Z behoben
* (MeisterTR) behebt einige Fehler

### 3.3.0 (2021-10-01)
* (MeisterTR) fix keine Räume für S5
* (MeisterTR) Fix IOBROKER-MIHOME-VACUUM-4 DB geschlossen
* (MeisterTR) Verbindungsfehler behoben

### 3.2.2 (2021-07-16)
* (Bluefox) Die Kommunikation ist korrigiert
* (Blaufuchs) Rollen hinzugefügt, die vom Typ-Detektor erkannt werden sollen

### 3.2.1 (2021-07-02)
* (Apollon77) Mehrere Absturzfälle anpassen (IOBROKER-MIHOME-VACUUM-K, IOBROKER-MIHOME-VACUUM-J, IOBROKER-MIHOME-VACUUM-F, IOBROKER-MIHOME-VACUUM-7, IOBROKER-MIHOME-VACUUM-A, IOBROKER -MIHOME-VACUUM-4, IOBROKER-MIHOME-VACUUM-G, IOBROKER-MIHOME-VACUUM-C, IOBROKER-MIHOME-VACUUM-B, IOBROKER-MIHOME-VACUUM-Q, IOBROKER-MIHOME-VACUUM-M)

### 3.2.0 (02.06.2021)
* (MeisterTR) Veröffentlichungskandidat
* (MeisterTR) Verbrauchsmaterial nach Reset erhalten

### 3.1.10 (23.05.2021)
* Fehler behoben
* Wachposten hinzufügen

### 3.1.6 (05.05.2021)
* Festplattenschreiben minimieren
* minimierte Nachrichten
* Warnmeldungen zum Debuggen geändert
* Debuglog erweitern, um Fehler für e2-Vakuum zu finden
* getStates hinzugefügt, wenn die Karte geändert wird

### 3.1.5 (03.05.2021)
* Versuchen Sie, den Kartenfehler zu beheben
* Map64 geändert. jetzt ohne img-tags
* Multimap-Unterstützung hinzufügen (Räume und Karte erhalten, wenn die Karte geändert wird)
* Wählen Sie Multimaps
* Fehler mit Zonenkoordinaten behoben
* WLAN hinzufügen
* Verbindungsprobleme beheben
* Korrigieren Sie die Valetudo-Karte
* Mop-Zustand hinzufügen
* Repariere einige Objekte

### 3.1.1 (18.4.2021)
 * Vollständig neu schreiben
 * Kartenfehler mit mehreren Staubsaugern behoben
 * Leistungsprobleme beheben
 * bessere Verbindung zum Vakuum
 * Fehler im ReloadMap-Button behoben
 * Show Goto und Zone States, um Orte zu finden
 * und viele mehr...

### 2.2.5 (2021-04-02)
* S7-Unterstützung hinzugefügt
* Fehlerbehebungen für S5 Max und andere

### 2.2.4 (2020-09-15)
* (dirche) füge eine Konfiguration für send Pause Before Home hinzu

### 2.2.3 (2020-08-20)
* (dirkhe) Raum DP werden nicht gelöscht, bei Kartenwechsel

### 2.2.0 (2020-08-13)
* (MeisterTR) Test für Viomi und Dreame Api hinzugefügt

### 2.1.1 (2020-07-10)
* (Bluefox) Refactoring
* (Bluefox) Unterstützung des Kompaktmodus hinzugefügt

### 2.0.10 (2020-07-05)
* Versuchen Sie dreimal, die Reinigung zu starten, wenn der Roboter nicht antwortet, und einige Korrekturen

### 2.0.9 (2020-03-05)
* (dirche) füge Statusinformationen für Raumkanäle hinzu und ändere Warteschlangeninformationen von Nummer zu JSON

### 2.0.8 (2020-02-26)
* (dirche) verringerte Kommunikation mit dem Roboter

### 2.0.7 (2020-02-25)
* (dirkhe) add Wiederaufnahme nach Pause für Räume

### 2.0.6 (2020-02-17)
* (MeisterTR) Räume für s50 mit Karte hinzufügen (Cloud oder Valetudo benötigt)

### 2.0.4 (2020-02-13)
* (MeisterTR) Cloud-Login hinzufügen, um Token zu erhalten
* (MeisterTR) Cloud Map hinzufügen
* (MeisterTR) neues und altes Kartenformat hinzugefügt
* (MeisterTR) Konfigurationsseite neu erstellen

### 1.10.5 (2020-02-11)
* Ping nur senden wenn nicht verbunden, sonst get_status
* Schaltflächenstatus auf wahr setzen, wenn sie angeklickt werden
* Timer-Manager und Room-Manager in eigene Bibliotheken verschieben

### 1.10.4 (2020-02-06)
* (MeiserTR) Valetudo-Kartenunterstützung für gen3 und gen2 2XXX hinzugefügt

### 1.10.1 (2020-01-20)
* (dirkhe) Zone als Roomhandling hinzugefügt
* (dirkhe) Timer könnte Zimmerkanäle direkt

### 1.10.0 (2020-01-17)
* (dirkhe) Raumhandhabung hinzugefügt
* (dirche) Timer hinzugefügt
* (dirkhe) Feature-Handling geändert

### 1.1.6 (2018-12-06)
* (JoJ123) Lüftergeschwindigkeit für MOP (S50+) hinzugefügt.

### 1.1.5 (2018-09-02)
* (BuZZy1337) Beschreibung für Status 16 und 17 hinzugefügt (goTo und Zonenreinigung).
* (BuZZy1337) Einstellung für die automatische Wiederaufnahme der pausierten Zonenreinigung hinzugefügt.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Möglichkeit hinzugefügt, eine angehaltene Zonenreinigung fortzusetzen (Zustand: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) Behoben, dass der zoneCleanup-Status nicht funktioniert (Vakuum verließ nur das Dock, sagte "Finished ZoneCleanup" und kehrte sofort zum Dock zurück)

### 1.1.2 (2018-07-05)
* (BuZZy1337) Erkennung neuer Firmware / Vakuum der zweiten Generation behoben

### 1.1.1 (2018-04-17)
* (MeisterTR) Fehler abgefangen, Status für neue FW hinzugefügt

### 1.1.0 (2018-04-10)
* (mswiege) Das Widget ist fertig

### 1.0.1 (2018-01-26)
* (MeisterTR) bereit für admin3
* (MeisterTR) unterstützt SpotClean und Sprachpegel (v1)
* (MeisterTR) unterstützt zweite Generation (S50)
* (MeisterTR) Datenanfragen beschleunigen

### 0.6.0 (2017-11-17)
* (MeisterTR) verwendet 96-Zeichen-Token von Ios Backup
* (MeisterTR) schnellere Verbindung bei der ersten Nutzung

### 0.5.9 (2017-11-03)
* (MeisterTR) Kommunikationsfehler ohne i-net behoben
* (AlCalzone) Auswahl vordefinierter Leistungsstufen hinzufügen

### 0.5.7 (2017-08-17)
* (MeisterTR) Systemzeit und Roboterzeit vergleichen (keine Verbindung beheben, wenn Systemzeit unterschiedlich)
* (MeisterTR) Werte aktualisieren, wenn Roboter per Cloud starten

### 0.5.6 (2017-07-23)
* (MeisterTR) Option für Kistenschalter für Alexa-Steuerung hinzufügen

### 0.5.5 (2017-06-30)
* (MeisterTR) Zustände, Funktionen hinzufügen, Kommunikationsfehler beheben

### 0.3.2 (2017-06-07)
* (MeisterTR) keine Kommunikation nach Softwareupdate behoben (Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) Einstellung der Lüfterleistung korrigiert
* (Bluefox) Fehler abfangen, wenn Port belegt ist

### 0.3.0 (2017-04-08)
* (MeisterTR) füge weitere Staaten hinzu

### 0.0.2 (2017-04-02)
* (steinwedel) Implementierung einer besseren Decodierung von Paketen

### 0.0.1 (2017-01-16)
* (Bluefox) anfängliches Commit

## License
The MIT License (MIT)

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>

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