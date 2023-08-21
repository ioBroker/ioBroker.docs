---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-Vakuum-Adapter
hash: bIUbX1gdnh92hTES+t2l/YxK7HMYGxG8DIFdFNWZhbk=
---
![Logo](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# IoBroker mihome-vacuum-Adapter
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche Beschreibung hier](README_de.md)

Mit diesem Adapter können Sie den Xiaomi-Staubsauger steuern.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Inhalt
 - [Bekannte Fehler](#known_errors)
    - [Fehler bei der Installation (Canvas)](#error_at_installation)
    - [HTTP-Fehler beim Abrufen des Token-Cookies{}](#http_error_when_getting_token_cookie{})
- [Setup](#Konfiguration)
    - [Adapter konfigurieren](#adapter-configuration)
        - [Steuerung über Alexa](#control-over-alexa)
        - [Zweiter Roboter](#second-robot)
    - [Valetudo konfigurieren](#valetudo-config)
- [Funktionen](#Funktionen)
    - [S50-Befehle](#commands-of-the-s50)
    - [Gehe zu](#goto)
- [Zone Clean](#zoneclean)
    - [Zimmer](#Zimmer)
    - [timer](#timer)
    - [Eigene Befehle](#send-your-own-commands)
    - [sendTo-Hook](#send-custom-commands-with-sendto)
- [Widget](#Widget)
- [Fehler](#Fehler)
- [Änderungsprotokoll](#changelog)

## Unterstützte Geräte und Funktionen
| Gerät | Grundlegende Steuerung | Geschichte | Zimmer | Karte |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| viomi.vacuum.v6 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v7 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v8 | :heavy_check_mark: | :x: |:x: | :x: |
| rockrobo.vacuum.v1 | :heavy_check_mark: | :heavy_check_mark: |:x: |:heavy_check_mark: |
| roborock.vacuum.s4 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5e | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.m1s | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a10 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a15 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| dreame.vacuum.r2205 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.r2216o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.r2228o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2008 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2009 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2027 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2028 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2029 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2036 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2041o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2114a | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2148o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
| dreame.vacuum.p2156o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |

## Bekannte Fehler
### Fehler bei der Installation
wenn Ihre Installation fehlerhaft läuft. Das Canvas-Paket konnte nicht installiert werden

„npm ERR! canvas@2.6.1 install: node-pre-gyp install --fallback-to-build npm ERR! Ausgangsstatus 1``

Bitte installieren Sie Canvas und die Bibliotheken manuell mit: „sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev“.

wechseln in: `cd /opt/iobroker/node_modules/iobroker.mihome-vacuum` dann `npm install canvas`

### HTTP-Fehler beim Abrufen des Token-Cookies{}
Manchmal kann keine Verbindung zur Xiaomi-Cloud hergestellt werden.
Bitte öffnen Sie den Browser, gehen Sie zu Mihome und melden Sie sich an. Geben Sie den Code ein, den Sie per E-Mail erhalten haben. Danach sollte die Verbindung funktionieren.

### Ruft nur Helo-Nachrichten-Timeout ab
Bitte stellen Sie sicher, dass Ihr Roboter mit der Mihome-App und NICHT mit der Roborock-App verbunden ist

### Keine Verbindung mit S7
Derzeit besteht ein Problem, wenn der Roboter und der ioBroker nicht dasselbe Subnetz verwenden.

## Aufbau
Derzeit ist das Auffinden des Tokens das größte Problem.
Eine Möglichkeit zum Extrahieren des Tokens ist die Verwendung dieses Dienstprogramms: https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor

Ansonsten folgen Sie bitte der Anleitung im Link:

[Token-Tutorial](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Adapterkonfiguration
- Bei der IP-Adresse muss die IP-Adresse des Roboters im Format „192.168.178.XX“ eingegeben werden
- Der Port des Roboters ist standardmäßig auf „54321“ eingestellt, dies sollte nicht geändert werden
- Eigener Port, sollte nur mit zweitem Roboter geändert werden
- Abfrageintervall Die Zeit in ms, in der die Statuswerte des Roboters abgerufen werden (sollte nicht <10000 sein)

#### Kontrolle über Alexa
Für Alexa wird der spezielle Steuerzustand `clean_home` erstellt.
Es handelt sich um einen Schalter, der bei `true` den Sauger startet und bei `false` nach Hause geht.
Es wird automatisch ein Smartgerät im Cloud-Adapter mit dem Namen „Staubsauger“ erstellt, der im Cloud-Adapter geändert werden kann.

#### Setzen Sie die angehaltene Zonenreinigung mit der Starttaste fort
Wenn diese Option aktiviert ist, setzt der Staubsauger die Zonenreinigung fort, wenn er den „Start“-Status auf „True“ setzt, wenn er während einer laufenden Zonenreinigung angehalten wurde.
Wenn diese Option deaktiviert ist, startet der Staubsauger eine neue „normale Reinigung“, wenn Sie den Startbefehl senden, auch wenn er während einer laufenden Zonenreinigung angehalten wurde.

- Experimentell: Über die Checkbox „Eigene Befehle senden“ werden Objekte erstellt, über die Sie eigene Befehle an den Roboter senden und empfangen können.

#### Zweiter Roboter
Sollen zwei Roboter über ioBroker gesteuert werden, müssen zwei Instanzen erstellt werden. Für den zweiten Roboter muss der eigene Port (Standard: 53421) für ioBroker geändert werden, damit beide Roboter ioBroker über unterschiedliche Ports erreichen können.

## Kartenkonfiguration
Es gibt zwei Möglichkeiten, die Karte zu erhalten. Die ersten holen sich die Karte aus der Cloud. Daher müssen Sie sich anmelden und den richtigen Roboter aus der Liste auswählen

Zweiter Weg ist die Karte von Valetudo (nur lokale Verbindung).
Daher müssen Sie Valetudo rooten und auf Ihrem Gerät installieren.
Sie können [Valetudo RE](https://github.com/rand256/valetudo) oder normal [Valetudo](https://github.com/Hypfer/Valetudo) verwenden.

![Konfig](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Um die Karte zu verwenden, müssen Sie in der Konfiguration Valetudo oder Originalkarte auswählen
- Das Anforderungsintervall muss mehr als 1000 ms betragen. Dies ist das Intervall für die Aktualisierung der HTML-Karte
- Das Kartenintervall muss mehr als 5000 ms betragen. Dieses Intervall aktualisiert die PNG-Kartendatei (Sie können dies für Telegram, Vis oder alles andere verwenden).
- Farbe Hier können Sie die Farben für das Kartenbeispiel auswählen:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- Roboter: Hier können Sie verschiedene Roboter oder andere Fahrzeuge für die Karte auswählen

### Kartennutzung
Die Karte wird entweder als base64-raw oder als PNG gespeichert.

Sie finden das Kartenbild in den folgenden Datenpunkten:

- base64: `mihome-vacuum.0.cleanmap.map64`
- PNG: `mihome-vacuum.0.cleanmap.mapURL`

Sie können beide Bilder als Bildquelle im gewünschten VIS verwenden. Im HTML-Stil können Sie das Bild folgendermaßen verwenden:

`<img src="mihome-vacuum.0.cleanmap.map64">`

Mit zusätzlichen Style-Tags können Sie die Größe und/oder Formatierung des Kartenstils ändern.

Um die Karte in `jarvis` zu verwenden, verwenden Sie einfach einen der Datenpunkte als URL des DisplayImage-Widgets.
Dort können Sie die Größe des Bildes oder des gesamten Widgets ändern. Im Falle des responsiven Designs von Jarvis ändert sich die Größe der Karte entsprechend der Anzeigegröße.

Um die Karte in `ioBroker VIS` anzuzeigen, können Sie ein normales HTML-Widget verwenden, z. B.:

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Die Verwendung der Base64-Karte ist schneller und zeigt die Position des Roboters in der Nähe in Echtzeit an.

## Funktionen
### Befehle des S50 (zweite Generation)
Die Kartengröße beträgt immer 52000mm x 52000mm, somit sind Werte von 0 bis 51999mm möglich.
Die Position und Lage der Karte kann leider nicht abgefragt werden, diese kann sich von Saugen zu Saugen ändern. Als Basis dient immer die letzte Saugkarte, auch in der App.
Wenn der Roboter nur einen Bereich aufnimmt und die Karte immer gleich aufbaut, kann man ihn zuverlässig an Orte schicken oder den Bereich saugen lassen.

#### Gehe zu
Um den Staubsauger an einen Punkt zu fahren, muss das „goTo“-Objekt wie folgt gefüllt werden:

```
xVal, yval
```

Die Werte müssen den oben genannten Bereich erfüllen und die x- und y-Koordinaten auf der Karte angeben.

Beispiel:

```
24,850.26500
```

#### Zonenreinigung
Um eine Zone zu saugen, muss ZoneClean wie folgt befüllt werden:

```
[X1, y1, x2, x2, count]
```

Dabei sind x und y die Koordinaten der rechteckigen Fläche und „zählen“ die Reinigungsvorgänge.
Sie können auch mehrere Bereiche gleichzeitig saugen lassen:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Beispiel:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Räume
neuere Staubsauger mit aktueller Home App unterstützen die Definition von Räumen, siehe [Video](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Jeder Raum in der aktuellen Karte verfügt über einen Index, der dann von der App aus dem Raum zugewiesen wird. Vom Roboter erhalten wir lediglich eine Zuordnung mit Raumnummer und Index. Der Adapter fragt diese Räume bei jedem Start des Adapters ab und erstellt für jeden Raum einen Kanal, der dann den aktuellen Raumindex kennt. Das Gleiche geschieht manuell mit der Schaltfläche „LoadRooms“. Dieser Kanal kann dann den ioBroker-Räumen zugewiesen werden. Wird der Button „roomClean“ gedrückt, wird der Index der Karte ermittelt und an den Roboter gesendet, damit dieser dann diesen Raum saugen kann. Zuvor wird die Lüfterleistung auf Einzelraumabsaugung eingestellt. Wenn Sie in der App noch keine Möglichkeit haben, die Räume zu benennen, besteht auch die Möglichkeit, einen solchen Kanal manuell durch Angabe des Kartenindexes zu erstellen. Es ist auch möglich, Zonenkoordinaten anstelle von mapIndex hinzuzufügen.
Wenn Sie mehrere Räume spontan reinigen möchten, können Sie dies über multiRoomClean tun, indem Sie die ioBroker-Räume diesem Datenpunkt zuordnen und dann den Button drücken.

#### Timer
Sobald der Staubsauger die Raumfunktion unterstützt (siehe oben), besteht auch die Möglichkeit, Timer zu erstellen, die dann die entsprechenden Raumkanäle ansteuern bzw. deren MapIndexes ermitteln.
Der Timer könnte direkt über Räume und/oder Raumkanäle ausgelöst werden.
Die Timer selbst werden über den Config-Bereich erstellt, werden dann aber zu einem Datenpunkt. Dort kann jeder Timer einmal aktiviert/deaktiviert oder übersprungen werden. Auch ein Direktstart ist möglich. Der Vorteil der ioBroker-Timer besteht darin, dass diese im VIS angezeigt und genutzt werden können und man den Roboter vom Internet trennen kann, da die Timer der App aus China ausgelöst werden.

### Senden Sie Ihre eigenen Befehle
HINWEIS: Diese Funktion sollte nur von Experten verwendet werden, da der Sauger durch falsche Befehle beschädigt werden kann

Der Roboter unterscheidet zwischen den Befehlen in Methoden (methods) und Parametern (params), die zur Spezifikation der Methoden dienen.
Unter dem Objekt `mihome-vacuum.X.control.X_send_command` können Sie eigene Befehle an den Roboter senden.
Die Objektstruktur muss wie folgt aussehen: method; [params], z. B. ``` app_segment_clean;[18,20] ```

Unter dem Objekt `mihome-vacuum.X.control.X_get_response` wird die Antwort nach dem Absenden vom Roboter eingetragen.
Wenn Parameter abgefragt wurden, erscheinen diese hier im JSON-Format. Wenn nur ein Befehl gesendet wurde, antwortet der Roboter nur mit „0“.

Die folgenden Methoden und Parameter werden unterstützt:

| Methode | Parameter | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                       |
| get_timer | | Gibt den eingestellten Timer zurückEinstellung der Saugzeiten BSp. 12 Uhr 30 in 5 Tagen |
| set_timer | `[["TIME_IN_MS",["30 12 * * 1,2,3,4,5",["start_clean",""]]]]` | Timer aktivieren/deaktivieren |
| upd_timer | `["1481997713308","on/off"]` | |
| | | Rettet die Zeiten des „Bitte nicht stören“ |
| get_dnd_timer | | DND-Zeiten löschen |
| set_dnd_timer | `[22,0,8,0]` | |
| set_dnd_timer | `[22,0,8,0]` | |
|                 |                                                                     |                                                                                          |
| app_rc_start | | Starten Sie die Fernbedienung |
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Bewegen. Die Sequenznummer muss kontinuierlich sein, WERT1 (Geschwindigkeit) = -0,3-0,3, WERT2 (Rotation) = -3,1-3,1, WERT3 (Dauer)|
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Bewegen. Die Sequenznummer muss kontinuierlich sein, WERT1 (Geschwindigkeit) = -0,3-0,3, WERT2 (Rotation) = -3,1-3,1, WERT3 (Dauer)|
| app_segment_clean | `[12,15]` | sauberes Zimmer mit Index 12 und 15 |
| app_segment_clean | `[12,15]` | sauberes Zimmer mit Index 12 und 15 |

Weitere Methoden und Parameter finden Sie hier ([Verknüpfung](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Senden Sie benutzerdefinierte Befehle mit sendTo
Sie können diese benutzerdefinierten Befehle auch von anderen Adaptern mit `sendTo` senden. Verwendung mit `method_id` und `params` wie oben definiert:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Das `response`-Objekt verfügt über zwei Eigenschaften: `error` und (wenn kein Fehler aufgetreten ist) `result`.

Auf diese Weise können auch einige vordefinierte Befehle ausgegeben werden:

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

Wenn nur ein einzelner Parameter möglich ist, können Sie nur einen String senden, andernfalls müssen Sie ein Objekt mit den erwarteten Parametern verwenden, z. B.:

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
| Reinigen Sie einen kleinen Bereich um den Roboter herum | `cleanSpot` | - Keine - | |
| Gehe zurück zur Basis | `charge` | - Keine - | |
| Sagen Sie „Hallo, ich bin hier!“ | `findMe` | - Keine - | |
| Überprüfen Sie den Status der Verbrauchsmaterialien (Pinsel usw.) | `getConsumableStatus` | - Keine - | |
| Status von Verbrauchsmaterialien (Pinsel usw.) zurücksetzen | `resetConsumables` | `consumable` | Zeichenfolge: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Erhalten Sie eine Zusammenfassung aller bisherigen Reinigungsvorgänge | `getCleaningSummary` | - Keine - | |
| Erhalten Sie eine detaillierte Zusammenfassung eines vorherigen Reinigungsprozesses | `getCleaningRecord` | `recordId` | |
| Holen Sie sich eine Karte | `getMap` | - Keine - | Unbekannt, was mit dem Ergebnis geschehen soll |
| Den aktuellen Status des Roboters abrufen | `getStatus` | - Keine - | |
| Rufen Sie die Seriennummer des Roboters ab | `getSerialNumber` | - Keine - | |
| Detaillierte Geräteinformationen abrufen | `getDeviceDetails` | - Keine - | |
| Rufen Sie den *Bitte-nicht-stören*-Timer ab | `getDNDTimer` | - Keine - | |
| Stellen Sie einen neuen *Bitte-nicht-stören*-Timer ein | `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Löschen Sie den *Bitte-nicht-stören*-Timer | `deleteDNDTimer` | - Keine - | |
| Aktuelle Lüftergeschwindigkeit abrufen | `getFanSpeed` | - Keine - | |
| Stellen Sie eine neue Lüftergeschwindigkeit ein | `setFanSpeed` | `fanSpeed` | `fanSpeed` ist eine Zahl zwischen 1 und 100 |
| Rufen Sie den aktuellen Waterbox-Modus ab | `getWaterBoxMode` | - Keine - | |
| Stellen Sie einen Wischmodus ein | `setMopMode` | `mopMode` | `mopMode` ist eine Zahl zwischen 300 und 303 |
| Rufen Sie den aktuellen Wischmodus ab | `getMopMode` | - Keine - | |
| Stellen Sie einen Wasserbox-Modus ein | `setWaterBoxMode` | `waterBoxMode`\| {waterBoxMode:`waterBoxMode`,waterBoxLevel:`waterBoxLevel`} | `waterBoxMode` ist eine Zahl zwischen 200 und 204 oder 207 -> dann müssen Sie auch `waterBoxLevel` als Zahl zwischen 1 - 30 | nachweisen |
| Starten Sie die Fernbedienungsfunktion | `startRemoteControl` | - Keine - | |
| Erteilen Sie einen Bewegungsbefehl für die Fernsteuerung | `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Die Sequenznummer muss fortlaufend sein, die Dauer wird in ms | angegeben |
| Beenden Sie die Fernbedienungsfunktion | `stopRemoteControl` | - Keine - | |
| Reinraum/Räume | `cleanRooms` | `rooms` | `rooms` ist ein durch Kommas getrennter String mit enum.rooms.XXX |
| sauberes Segment | `cleanSegments` | `rooms` \| {rooms:`rooms`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`} | `rooms` ist eine Zahl oder ein Array mit MapIndex oder ein durch Kommas getrennter String mit MapIndex |
| saubere Zone | `cleanZone` | `coordinates` \| {coordinates:`coordinates`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`,repeat:`iterations`} | `coordinates` ist ein String mit Koordinaten und Anzahl, siehe [ZoneClean](#zonecleaning) |
| Beginnen Sie mit der Staubsammlung | `startDustCollect` | - Keine - | |
| Stoppen Sie die Staubansammlung | `stopDustCollect` | - Keine - | |
| Moppwaschen starten | `startWashMop` | - Keine - | |
| Stoppen Sie das Waschen des Mopps | `stopWashMop` | - Keine - | |
| Stoppen Sie das Waschen des Mopps | `stopWashMop` | - Keine - | |

## Widget
![Widget](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Fehler
- Gelegentliche Verbindungsabbrüche, die jedoch nicht am Adapter liegen, sondern meist an den eigenen Netzwerken
- Widget zur Zeit ohne Funktion

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
    * () 
-->
### 4.0.0 (2023-08-15)
* (DemigodCode) inital version of dream support
* (Dirkhe) add Roborock S8 Ultra Pro

### 3.11.0 (2023-05-12)
* (TA2k) fix too much map request to prevent map rate limit in the app

### 3.10.1 (2023-04-10)
* (Dirkhe) fix waterBoxLevel 
* (Dirkhe) fix overwriting of roomStates from global

### 3.10.0 (2023-04-07)
* (Dirkhe) check also stockcommands in onMessage 
* (Dirkhe) add feature waterbox level #755

### 3.9.5 (2023-01-13)
* (Dirkhe) change type of unsupported features
* (Dirkhe) fix button/command loadRooms

### 3.9.4 (2023-01-11)
* (Dirkhe) cleanmap.mapURL typo fixed

### 3.9.3 (2023-01-11)
* (Dirkhe) fix loosing passwort in config
* (Dirkhe) move map Url to userspace instead of admin space #735
* (Dirkhe) change mapUrl to /mihome-vacuum.0.userfiles/actualMap.png

### 3.9.2 (2023-01-06)
* (Dirkhe) add function setUnsupportedFeature; if token changed, all stored unsupported Features will be cleared
* (dirkhe) fix bug from 3.9.1 for supported repeat devices

### 3.9.1 (2023-01-06)
* (Dirkhe) add step property to repeat DP
* (Dirkhe) add Queue Fallback mode for repeat
* (Dirkhe) remove wrong clearQueue button

### 3.9.0 (2023-01-04)
* (Dirkhe) add Mop washing #679
* (Dirkhe) trigger pauseResume only, if correct state is given #623
* (Dirkhe) add multiple clean iterations (repeat) #690
* (Dirkhe) housekeeping

### 3.8.8 (2022-11-30)
* (Dirkhe) fix behaviour of pauseResume #623

### 3.8.7 (2022-11-26)
* (Dirkhe) fix typo from translation for battary_live (based on viomi id) #629
* (Dirkhe) fix crash, if cloud-roomID is empty #702

### 3.8.6 (2022-11-12)
* (Dirkhe) Fix type for roomMopMode

### 3.8.5 (2022-11-10)
* (Dirkhe) move parseErrors to debug level
* (Dirkhe) avoid new instanziierung on reconnect

### 3.8.4 (2022-11-07)
* (Dirkhe) change logging for sendMessage to debug

### 3.8.3 (2022-11-01)
* (Dirkhe) change logging from timeouts
* (Dirkhe) hide parts of token in log

### 3.8.2 (2022-10-31)
* (Dirkhe) Bump canvas to 2.10.2
* (Dirkhe) disable map, if CANVAS not installed #681

### 3.8.1 (2022-10-30)
* (Dirkhe) remove deprecated node 12.x Version for workflow

### 3.8.0 (2022-10-30)
* (Dirkhe) fix missing stock command for mop_mode
* (Dirkhe) add mop mode also for cleanSegments and cleanZone
* (Dirkhe) add mop mode also for rooms
* (MeisterTR) map zooming amd show carpet

### 3.7.0 (2022-10-28)
* (Dirkhe) accept custom commands with single paramter
* (Dirkhe) optional parameter waterboxMode and fanSpeed for cleanSegments and cleanZone 
* (Dirkhe) fix crash on message send (#652)
* (Dirkhe) add mop mode (#670)
* (Dirkhe) adapt fan_power for S7 Ultra(#677)

### 3.6.0 (2022-07-07)
* (Dirkhe) add dust collecting

### 3.5.0 (2022-06-29)
* (Dirkhe) add Roborock S6 Pure model
* (Dirkhe) add/extend some Hints in readme
* (Dirkhe) add additional log info for cleanRooms
* (Dirkhe) fix error for wrong map-dp

### 3.4.2 (2022-06-24)
* (Apollon77) Update dependencies to allow better automatic rebuild

### 3.4.1 (2022-05-31)
* (Dirkhe) add missed Vacuum states
* (Dirkhe) add dock state Waste water tank full

### 3.4.0 (2022-05-28)
* (Apollon77) Fix several potential crash cases reported by Sentry

### 3.3.6 (2022-05-03)
* (Dirkhe) fix spotcleaning

### 3.3.5 (2022-02-07)
* (Dirkhe) fixed some errors
* (lasthead0) fix cyrillic issue RC4 lib#

### 3.3.3 (2022-01-20)
* (Dirkhe) fixed some errors
* (Dirkhe) add RC4

### 3.3.1 (2021-10-02)
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-Z
* (MeisterTR) fix some errors

### 3.3.0 (2021-10-01)
* (MeisterTR) fix no rooms for S5
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-4 DB closed
* (MeisterTR) fix connection error

### 3.2.2 (2021-07-16)
* (bluefox) the communication is corrected
* (bluefox) Added roles to be detected by type-detector

### 3.2.1 (2021-07-02)
* (Apollon77) Adjust several crash cases (IOBROKER-MIHOME-VACUUM-K, IOBROKER-MIHOME-VACUUM-J, IOBROKER-MIHOME-VACUUM-F, IOBROKER-MIHOME-VACUUM-7, IOBROKER-MIHOME-VACUUM-A, IOBROKER-MIHOME-VACUUM-4, IOBROKER-MIHOME-VACUUM-G, IOBROKER-MIHOME-VACUUM-C, IOBROKER-MIHOME-VACUUM-B, IOBROKER-MIHOME-VACUUM-Q, IOBROKER-MIHOME-VACUUM-M)

### 3.2.0 (02.06.2021)
* (MeisterTR) release candidate
* (MeisterTR) get consumable after reset

### 3.1.10 (23.05.2021)
* error fixed
* add sentry

### 3.1.6 (05.05.2021)
* minimize Disk write
* minimized Messages 
* changed warn Messages to debug
* extend Debuglog to find error for e2 vacuum
* added getStates when map is changed

### 3.1.5 (03.05.2021)
* try to fix the map error
* Map64 changed. now without img tags
* add Multimap support (get rooms and map when map is changed)
* select Multimaps
* fix error with zone coordinates
* add WiFi
* fix connection Problems
* fix Valetudo map
* add Mop state
* fix some objects

### 3.1.1 (18.4.2021)
 * Full rewrite
 * Fix map bug with multiple vacuums
 * fix performance Problems
 * better connection to vacuum
 * fix bug in ReloadMap button
 * Show Goto and Zone States ti find places
 * and many more...

### 2.2.5 (2021-04-02)
* added S7 Support
* bugfixes for S5 Max and others

### 2.2.4 (2020-09-15)
* (dirkhe) add config for send Pause Before Home

### 2.2.3 (2020-08-20)
* (dirkhe) room DP are not deleted, on map change

### 2.2.0 (2020-08-13)
* (MeisterTR) add test for Viomi and Dreame Api

### 2.1.1 (2020-07-10)
* (bluefox) Refactoring
* (bluefox) Support of compact mode added

### 2.0.10 (2020-07-05)
* try to start the cleaning 3 times, if robot not answers and some fixes

### 2.0.9 (2020-03-05)
* (dirkhe) add state info for room channels and change queue info from number to JSON

### 2.0.8 (2020-02-26)
* (dirkhe) decreased communication with robot

### 2.0.7 (2020-02-25)
* (dirkhe) add Resuming after pause for rooms

### 2.0.6 (2020-02-17)
* (MeisterTR) add rooms for s50 with map (cloud or Valetudo needed)

### 2.0.4 (2020-02-13)
* (MeisterTR) add cloud login to get token
* (MeisterTR) add cloud Map
* (MeisterTR) add new and old Map format
* (MeisterTR) rebuild config page

### 1.10.5 (2020-02-11)
* send Ping only if not connected, otherwise get_status
* set button states to true, if clicked
* move timer manager and room manager to own libs

### 1.10.4 (2020-02-06)
* (MeiserTR) add valetudo map support for gen3 and gen2 2XXX

### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed feature handling

### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zone cleaning).
* (BuZZy1337) Added setting for automatic resume of paused zone cleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zone clean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error caught , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, features, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

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