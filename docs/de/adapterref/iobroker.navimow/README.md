---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.navimow/README.md
title: ioBroker.navimow
hash: /dfuufJDfFc8U3mcpQlLavm1IFoBpUZi0yttV+6zzWA=
---
![Logo](../../../en/adapterref/iobroker.navimow/admin/navimow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.navimow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.navimow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/navimow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/navimow-stable.svg)
![GitHub-Lizenz](https://img.shields.io/github/license/TA2k/ioBroker.navimow)
![GitHub-Probleme](https://img.shields.io/github/issues/TA2k/ioBroker.navimow)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/TA2k/ioBroker.navimow)
![Knoten](https://img.shields.io/node/v/iobroker.navimow)
![NPM](https://nodei.co/npm/iobroker.navimow.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.navimow/workflows/Test%20and%20Release/badge.svg)

# ioBroker.navimow

## Navimow-Adapter für ioBroker

ioBroker-Adapter für [Segway Navimow](https://navimow.segway.com/) Mähroboter. Nutzt die offizielle [Navimow SDK](https://github.com/segwaynavimow/navimow-sdk) REST API und MQTT für Echtzeit-Updates.

Der Adapter selbst läuft auf jeder Plattform, auf der ioBroker ausgeführt wird. Die optionale Mähkarte benötigt [@napi-rs/canvas](https://github.com/Brooooooklyn/canvas) , das vorkompilierte Binärdateien für Linux (glibc und musl), Windows und macOS auf x64 und arm64 bereitstellt. Falls keine vorkompilierte Version für das Hostsystem verfügbar ist, wird die Bibliothek einfach nicht geladen: Der Adapter protokolliert eine Warnung, die Karte bleibt leer und alle anderen Funktionen bleiben erhalten.

## Merkmale

- OAuth2-Anmeldung über ein Navimow-Konto
- Echtzeit-Statusaktualisierungen via MQTT (WebSocket Secure)
- Regelmäßige HTTP-Statusabfrage parallel zu MQTT
- MQTT-Standortüberwachung mit kontrollierter Wiederverbindung während des aktiven Mähens
- Fernbedienung: Start, Stopp, Pause, Fortsetzen, Andocken
- Automatische Token-Aktualisierung bei MQTT-Wiederverbindung

Durch regelmäßige HTTP-Abfragen werden allgemeine Statuswerte (z. B. Akkustand, Status und Fahrzeugstatus) aktualisiert, um sie auf dem neuesten Stand zu halten. Standortdaten und Mähfortschritt (`location.mowingPercentage` Die Standortinformationen werden über MQTT bereitgestellt. Während des aktiven Mähvorgangs überwacht der Adapter den MQTT-Standortdatenstrom und führt eine kontrollierte MQTT-Wiederverbindung durch, wenn keine Standortaktualisierungen mehr eintreffen, während HTTP weiterhin einen aktiven Mäherstatus meldet.

## Posten

Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Aufstellen

1. Öffnen Sie die Adaptereinstellungen in ioBroker Admin.
2. Klicken Sie auf **„Navimow-Anmeldung öffnen“** , um die Navimow-Anmeldeseite zu öffnen.
3. Melden Sie sich mit Ihrem Navimow-Konto an.
4. Nach dem Login zeigt der Browser die Fehlermeldung „Seite nicht erreichbar“ an – das ist zu erwarten.
5. Kopieren Sie die vollständige URL aus der Adressleiste Ihres Browsers (enthält`?code=XXXXX` )
6. Fügen Sie die URL in das Feld **„Autorisierungscode“** ein und speichern Sie.
7. Der Adapter tauscht den Code gegen ein Token und startet automatisch.

Das Token wird automatisch aktualisiert. Eine erneute Anmeldung ist nur erforderlich, wenn das Aktualisierungstoken abläuft.

Die Einstellung **für das HTTP-Abfrageintervall** definiert das regelmäßige Abfrageintervall des HTTP-Status in Minuten (0 deaktiviert die Abfrage, maximal ein Tag). MQTT bleibt parallel aktiv, um Echtzeitaktualisierungen zu gewährleisten. Eine Abfrage wird erst aktiviert, wenn die vorherige Abfrage abgeschlossen ist. Daher kann eine langsame Cloud nicht zwei Abfragen gleichzeitig ausführen.

Das Intervall einstellen auf`0` Deaktiviert die regelmäßige Abfrage und setzt ausschließlich auf MQTT. Da der Broker nur die`state` Während der Mäher in Betrieb ist, führt der Adapter dennoch eine einzelne HTTP-Statusabfrage durch, wenn 15 Minuten lang keine MQTT-Statusaktualisierung eingegangen ist. Ohne diese Ausweichfunktion würden Akku und`vehicleState` würden ihre letzten Werte stundenlang beibehalten, während der Rasenmäher angedockt ist und geladen wird.

## Staaten

Für jedes Mähgerät werden die folgenden Kanäle erstellt:

| Kanal                     | Beschreibung                                                  |
| ------------------------- | ------------------------------------------------------------- |
| `{deviceId}.general`      | Geräteinformationen (Name, Modell, Seriennummer, Firmware)    |
| `{deviceId}.status`       | Aktueller Status (Fahrzeugstatus, Batterie, Position, Signal) |
| `{deviceId}.status.json`  | Rohdaten des letzten Statusupdates im JSON-Format             |
| `{deviceId}.events`       | MQTT-Ereignisse                                               |
| `{deviceId}.attributes`   | MQTT-Geräteattribute                                          |
| `{deviceId}.remote`       | Fernbedienungstasten                                          |
| `{deviceId}.location`     | Mäherposition und Mähfortschritt in Echtzeit (via MQTT)       |
| `{deviceId}.diagnostics`  | MQTT-Standortüberwachungsdiagnose                             |
| `{deviceId}.dockPosition` | Position der Ladestation, beschreibbar                        |

### Fahrzeugstatus

Der`status.vehicleState` Der Status enthält den aktuellen Mäherstatus.

Es wird vom MQTT-Server gespeist.`state` Der Kanal wird aufgerufen, sobald eine Änderung gemeldet wird. Der Kanal ruft das Feld auf.`state` und die HTTP-API ruft es auf`vehicleState` Beide verwenden jedoch dieselben Werte, und die HTTP-Variante antwortet aus einem serverseitigen Cache, der ein bis zwei Minuten verzögert sein kann – dies wurde in Berichten beobachtet.`isDocked` Für einen Rasenmäher, der gerade im Einsatz war. Wenn der staatliche Kanal innerhalb der letzten drei Minuten gesendet hat, bleibt sein Wert bestehen und wird durch eine dazwischenliegende Umfrage nicht überschrieben. Während der Rasenmäher an der Station steht, verstummt der Kanal und die Umfrage übernimmt wieder.

**Um zu überprüfen, ob der Rasenmäher gerade mäht, prüfen Sie Folgendes:`isRunning` :**

```javascript
on({ id: 'navimow.0.DEVICE_ID.status.vehicleState', change: 'any' }, (obj) => {
  if (obj.state.val === 'isRunning') {
    log('Mower is mowing!');
  }
});
```

| Wert               | Beschreibung        |
| ------------------ | ------------------- |
| `isRunning`        | Mähen               |
| `isDocked`         | Angedockt           |
| `isIdle`           | Leerlauf            |
| `isPaused`         | Angehalten          |
| `isDocking`        | Rückkehr zum Dock   |
| `isMapping`        | Abbildung           |
| `isLifted`         | Aufgehoben (Fehler) |
| `Error`            | Fehler              |
| `inSoftwareUpdate` | Software-Update     |
| `Self-Checking`    | Selbstprüfung       |
| `Offline`          | Offline             |

### Fernbedienungen

| Zustand           | Beschreibung                                     |
| ----------------- | ------------------------------------------------ |
| `remote.Refresh`  | Eine manuelle Statusaktualisierung auslösen      |
| `remote.start`    | Beginnen Sie mit dem Mähen                       |
| `remote.stop`     | Mähen unterbrechen (siehe unten)                 |
| `remote.pause`    | Mähen pausieren                                  |
| `remote.resume`   | Mähen fortsetzen                                 |
| `remote.dock`     | Zurück zum Dock                                  |
| `remote.resetMap` | Mähkarte löschen (nur bei eingeschalteter Karte) |

Das sind Knöpfe: Sie sind beschriftet, nicht gelesen. Was der Rasenmäher macht, ist in`status.vehicleState` Die

`remote.resetMap`Dabei werden die Spur, das Bild und der Rahmen des Geräts verworfen und die Karte neu erstellt. Dies dient dazu, Daten zu erfassen, die der Adapter nicht selbstständig erfassen kann – beispielsweise einen neu kartierten oder in Zonen unterteilten Rasen – und ist der einzige Reset, der auch den Rahmen löscht: Der Rahmen beschreibt den Garten, und ein gerade neu kartierter Garten ist genau der richtige Zeitpunkt für eine erneute Vermessung.

`remote.stop` Der Job wird lediglich pausiert, nicht beendet – die öffentliche API kennt keine „Endaufgabe“, und`start` Die App setzt die von ihr erstellte Aufgabe fort, anstatt eine neue zu starten. Das Zurücksetzen des Mähfortschritts ist eine Funktion, die nur in der App verfügbar ist.

### Standort

Der`location` Der Kanal empfängt Positionsdaten und Mähfortschrittsdaten in Echtzeit (`mowingPercentage` Die Koordinaten werden über MQTT übermittelt, solange der Mäher aktiv ist. Sie beziehen sich auf die Mähfläche (in Metern) und nicht auf GPS. Diese Werte werden nicht durch regelmäßige HTTP-Statusabfragen ermittelt.

| Zustand                 | Beschreibung       |
| ----------------------- | ------------------ |
| `location.postureX`     | Position X (m)     |
| `location.postureY`     | Position Y (m)     |
| `location.postureTheta` | Drehwinkel (rad)   |
| `location.vehicleState` | Fahrzeugstaatscode |
| `location.time`         | Zeitstempel        |

`location.vehicleState` ist eine Zahl, deren Bedeutung nicht dokumentiert ist – weder das Navimow SDK noch das openHAB-Binding kennen eine Zuordnung. Der Adapter übersetzt sie daher nicht und gibt sie unverändert weiter.`status.vehicleState` für den dokumentierten Zustand.

Die Positionsdaten können mithilfe von Grafana (z. B. mit dem Plotly- oder Geomap-Panel) oder ioBroker.vis als Mähkarte visualisiert werden.

### Diagnostik

Der`diagnostics` Der Kanal enthält schreibgeschützte Werte für den MQTT-Standort-Watchdog.

| Zustand                              | Beschreibung                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `diagnostics.lastLocationMessage`    | Zeitstempel der zuletzt empfangenen MQTT-Standortnachricht                   |
| `diagnostics.locationMqttStale`      | `true` wenn der Standortdatenstrom veraltet ist, während der Mäher aktiv ist |
| `diagnostics.lastMqttRecovery`       | Zeitstempel der letzten kontrollierten MQTT-Wiederherstellung                |
| `diagnostics.lastLocationAgeSeconds` | Alter der letzten MQTT-Standortnachricht in Sekunden                         |

Wenn HTTP-Abfragen einen aktiven Mähvorgang melden, aber MQTT keine Meldung liefert`location` Wenn eine Nachricht mindestens drei Minuten lang empfangen wird, markiert der Adapter den Standortdatenstrom als veraltet und stellt die MQTT-Verbindung wieder her. Die Wiederherstellungsrate ist auf maximal eine alle fünf Minuten pro Gerät begrenzt. Akku, Status und`vehicleState` werden weiterhin durch regelmäßige HTTP-Abfragen unabhängig von diesem Überwachungssystem aktualisiert.

### Mähplan

Der Adapter rendert eine Live-Mähkarte als PNG-Bild (Base64-Daten-URI) im Zustand`{deviceId}.map` Die Karte wird während des Mähvorgangs automatisch aktualisiert und beim Beginn einer neuen Mähsitzung gelöscht.

**Die Karte ist deaktiviert, es sei denn`mapEnabled` ist eingestellt.** Das ist die einzige teure Funktion dieses Adapters, und eine Installation, die nie ein Bild auswertet, sollte dafür keine Kosten verursachen. Im ausgeschalteten Zustand werden keine Daten erfasst, Entscheidungen getroffen oder Daten gezeichnet, die vier benötigten Zustände werden nicht erstellt, und die Standortmeldungen füllen lediglich die Daten.`location.*` Wie zuvor. Die Aktivierung wird beim nächsten Start der Instanz wirksam, was beim Speichern der Einstellungen ohnehin geschieht. Durch erneutes Deaktivieren bleiben die Zustände erhalten – sie enthalten das letzte Bild und die zugehörige Tonspur, und es liegt nicht in der Verantwortung des Adapters, diese Daten aufgrund einer Checkbox zu verwerfen.

Das Zeichnen ist nicht kostenlos: Die gesamte Spur wird auf eine Zeichenfläche übertragen, in eine PNG-Datei umgewandelt und der Base64-Status von 43 bis 65 KiB gespeichert – das bedeutet etwa 80 ms blockierte Ereignisschleife für eine Spur in Sitzungslänge, und zwar in derselben Schleife, die auch die MQTT-Nachrichten verarbeitet, aus denen die Karte besteht. Eine Position wartet daher höchstens`mapRenderInterval` Die Renderzeit beträgt 1–30 Sekunden (Standard: 3 Sekunden). Alle in der Zwischenzeit eintreffenden Positionen werden in der darauffolgenden Rendersequenz angezeigt. Zwei Sekunden gelten als optimale Darstellungszeit, wie vom Rasenmäher angegeben; bei leistungsschwachen Hosts oder großen Rasenflächen ist eine höhere Wartezeit empfehlenswert. Renderings, die sofort korrekt sein müssen – beispielsweise das Erreichen der Ladestation durch den Rasenmäher, ein Karten-Reset oder das manuelle Verschieben einer Ladestation – werden unabhängig von den Einstellungen ohne Wartezeit durchgeführt.

Eine neue Mähsitzung wird anhand des mit jeder Standortmeldung übermittelten Mähfortschritts erkannt: Der Fortschritt beginnt bei null und wird nach einer Ladepause an der unterbrochenen Stelle fortgesetzt. Der Mäherstatus kann die beiden Zustände nicht unterscheiden – ein Mäher, der zum Laden anhält und anschließend wieder losfährt, sieht genauso aus wie einer, der eine neue Sitzung startet. Daher wird die Karte gelöscht, sobald der Fortschritt unter den zuletzt gemessenen Wert fällt, und nicht bei einem Statuswechsel. Meldet ein Mäher überhaupt keinen Fortschritt, wird die Karte beim Verlassen der Ladestation zum Mähen gelöscht; diese Rücksetzfunktion wird endgültig deaktiviert, sobald einmal ein Fortschritt gemeldet wurde.

Der Fortschritt wird zwar korrekt angezeigt, aber verzögert: Er bewegt sich erst, wenn ein ganzes Prozent gemäht ist. Daher zeigt der Mäher in den ersten Minuten nach dem Verlassen der Dockingstation noch den Fortschritt der vorherigen Sitzung an. Die gemähte Fläche (`subtotalArea` ) entspricht der Fläche in Quadratmetern und ist die Fläche, die der Mäher auf Null zurücksetzt, sobald er eine neue Aufgabe übernimmt – die Startmeldung ist bereits vorhanden.`0.0` Die Fläche wird neben den unveränderten 100 % der vorherigen Sitzung angezeigt. Der Adapter löscht daher die Karte bei einem Flächenrückgang – ein tatsächlicher Rückgang, da die Fläche ein berechneter Wert ist und ein einzelner falscher Tick die Daten nicht löschen darf – und speichert den Fortschritt als zweiten Datenpunkt für Mähwerke, die keine Fläche melden. Eine Ladepause führt nicht zu einem Flächenrückgang: Ein Mähwerk, das mit 224,15 m² und 61 % angedockt war, meldete nach der Pause 227,26 m² und 62 %. Die Fläche ist ein Akkumulator – sie erfasste den Anstieg während derselben Sitzung.`mowingWeekArea` bis auf 0,05 m² genau – und ein Wochenzähler hat keinen Grund, sich für eine Ladung zurückzusetzen.

Jeder Messwert des Standortdatenstroms wird nur so lange berücksichtigt, wie er der aktuellste seiner Art ist, den der Mäher gesendet hat. Der Broker liefert verzögert: Ein um 11:48 Uhr gesendeter Mähfortschritt wurde erst um 13:34 Uhr empfangen, nachdem die zugehörige Sitzung bereits zu 100 % abgeschlossen war. Er wurde als Neustart interpretiert und die Karte einer beendeten Sitzung gelöscht. Positionen im selben Datenstrom werden routinemäßig um einige Sekunden verschoben. Ein überholter Messwert wird daher beim Entpacken der Nachricht verworfen, sodass anschließend keine weiteren Maßnahmen ergriffen werden – weder die Sitzungsentscheidung noch die Verfolgung noch die…`location` Staaten. Jede Lesart trägt ihr eigenes Merkmal, erkennbar an den`type` Der Mäher setzt es so: Ein einzelner Strich würde eine Position festlegen, einen alle zwei Sekunden, um den noch laufenden Mähvorgang zu unterbrechen, und diese Striche kommen nur einmal pro Prozent vor.

Solange keine der beiden Antworten eingeht, merkt sich der Adapter die Position der Fahrspur beim Start des Mähers. So bleiben die zwischenzeitlich gefahrenen Positionen nach dem Zurücksetzen erhalten und werden nicht mit der beendeten Sitzung gelöscht. Erfolgt keine Antwort, zählt der Start nach fünf Minuten als Fortsetzung und die Fahrspur bleibt erhalten.

Ein in Zonen unterteilter Rasen meldet weder das eine noch das andere. Ein Teilmäherauftrag sendet überhaupt keine Fortschrittsmeldung – gemessen über einen Zonenlauf von anderthalb Stunden, nicht einer Stunde, während ein Ganzrasenlauf etwa alle zwei Minuten eine Meldung sendet –, sodass der letzte aufgezeichnete Fortschritt Tage alt sein kann, obwohl der Mäher täglich eine Zone mäht. Zwei Dinge ersetzen ihn daher. Die Zonen, die der Mäher benennt in`location.partitionIds` Eine neue Sitzung wird gestartet, sobald sich die Zone ändert und eine Zone in die nächste übergeht. Ein Fortschritt, der älter als sechs Stunden ist, zählt nicht mehr: Danach löscht der Mäher, sobald er die Ladestation verlässt, die Karte – genau wie bei einem Mäher, der seinen Fortschritt nie gemeldet hat. Sechs Stunden liegen weit über einer möglichen Ladepause – eine laufende Sitzung kann nicht so lange pausieren – und weit unter dem üblichen Zeitraum von einem Tag zwischen zwei Mähvorgängen. Die Folge: Eine Zonenaufgabe, die länger als sechs Stunden zum Laden unterbrochen wird, wird als neue Sitzung wieder aufgenommen und verliert den zuvor aufgezeichneten Fortschritt.`remote.resetMap` ist für all das da, was keine der beiden Regeln erfasst.

Jeder Reset setzt auch`location.mowingPercentage` ,`location.currentMowProgress` Und`location.subtotalArea` Zurück auf Null, denn der Mäher erhöht die Werte nur, und eine Zonenaufgabe meldet sie gar nicht mehr: Was dort stand, war der letzte Eintrag einer Sitzung von vor Tagen, angezeigt als diese Sitzung neben einer Karte, die gerade gelöscht worden war. Null ist der Wert, den eine Sitzung gemäht hat, die gerade erst begonnen hat. Wo der Reset aus einer Nachricht stammt, die einen Fortschrittsbericht enthält, werden die tatsächlichen Werte einen Moment später aus derselben Nachricht darüber geschrieben.`location.mowingWeekArea` wird nicht berücksichtigt – es zählt die Woche, nicht die Sitzung.

Die dahinter liegende Strecke wird gehalten in`{deviceId}.mapTrack` als JSON,`{ "percentage": 42, "area": 176.5, "progressAt": 1787650712963, "points": [[x, y], …] }` Die Positionen in Mähwerkskoordinaten werden auf Zentimeter gerundet. Die Karte wird maximal alle 30 Sekunden aktualisiert, solange Positionsdaten eingehen, und ein weiteres Mal, wenn der Adapter stoppt. Beim Neustart wird sie wieder eingelesen. So zeigt die Karte nach einem Neustart den bisherigen Mähvorgang an, anstatt bis zur nächsten Mähbewegung auf dem letzten Bild einzufrieren. Fortschritt, gemähte Fläche und der Zeitpunkt des Fortschritts werden mitgespeichert, da sonst ein Neustart nicht zwischen einem neuen und einem fortgesetzten Mähvorgang unterscheiden könnte. Auch der aktuelle Fortschritt lässt sich nicht von dem einer längst beendeten Sitzung unterscheiden. Eine mit einer älteren Version erstellte Spur enthält den Fortschritt nicht und wird daher beim ersten Start nach dem Update einmalig gelöscht. Die Karte bleibt also leer, bis das Mähwerk wieder fährt. Sie wird zusammen mit der Karte gelöscht, wenn ein neuer Mähvorgang beginnt.

#### Track Style

Drei Adaptereinstellungen bestimmen, wie die Schiene gezeichnet wird, sodass sie an ein Bild des darunter liegenden Gartens angepasst werden kann:

| Einstellung      | Reichweite        | Standard | Beschreibung                                                                                                                                    |
| ---------------- | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapEnabled`     | Ein, Aus          | aus      | Solange dieses Gerät ausgeschaltet ist, gelten die folgenden Bedingungen nicht, und es werden keine Daten erfasst oder Zeichnungen angefertigt. |
| `mapLineColor`   | jede Farbe        | leer     | Bei „leer“ bleibt der Farbverlauf von Blau am Anfang zu Grün an der aktuellen Position erhalten.                                                |
| `mapLineOpacity` | 0.05 – 1          | 1        | Unterhalb von 1 ist ein Hintergrundbild durch die Schiene hindurch zu sehen.                                                                    |
| `mapLineWidth`   | 0.5 – 10          | 1.5      | Linienbreite in Pixeln                                                                                                                          |
| `mapMarker`      | Punkt, Rasenmäher | Punkt    | Die aktuelle Position als roter Punkt oder als Rasenmäher von oben gesehen, gedreht in die Richtung, in die er zeigt                            |
| `mapMarkerSize`  | 4 – 60            | 10       | Markierungsgröße in Pixeln; der Rasenmäher benötigt etwa 16 bis 24 Pixel, um als solcher erkennbar zu sein.                                     |

Der Mähwerksmarkierer wird gedreht durch`location.postureTheta` Die Fahrtrichtung gibt der Mäher selbst an. Sie beginnt an der ersten Position einer Fahrt und bleibt so lange rechts, wie der Mäher steht. Wo eine Position keine Fahrtrichtung hat, folgt die Markierung stattdessen dem zuletzt gefahrenen Streckenabschnitt. Die Fahrtrichtung folgt der Fahrspur.`mapTrack` als optionales drittes Element jeder Position, sodass eine wiederhergestellte Spur es beibehält und eine ohne es geschriebene Spur weiterhin lesbar ist.

Die Start- und Positionsmarkierungen behalten ihre Farben und bleiben undurchsichtig, unabhängig vom Streckenverlauf. Die Deckkraft bezieht sich auf die gesamte Strecke und nicht auf einzelne Abschnitte; ein Streckenabschnitt, den der Mäher zweimal befahren hat, ist also nicht dunkler als einer, den er nur einmal befahren hat.

#### Ladestation

Die Karte zeigt die Ladestation an, sobald deren Standort bekannt ist. Die API gibt dies nicht an – das Navimow SDK besitzt keinen Endpunkt mit Koordinaten –, aber die Position, die der Rasenmäher beim Einfahren in die Ladestation meldet, entspricht der Position der Station, abgesehen von der Länge des Mähers selbst. Dieser Wert wird verwendet.

Es wird einmal genommen und dann in Ruhe gelassen:`vehicleState` Die Positionsanzeige hinkt dem Standortstream um bis zu einer Minute hinterher, sodass der Rasenmäher, während er wieder herausfährt, noch als angedockt angezeigt wird. Eine zweite Meinungsäußerung würde dann bedeuten, dass die Station ihm durch den Garten folgt.

Die Stelle ist bewohnt in`{deviceId}.dockPosition` als`{"x":…,"y":…}` Der Wert kann manuell eingegeben werden – um ihn zu korrigieren oder ihn festzulegen, ohne auf ein Andocken warten zu müssen. Wird ein leerer Wert eingegeben, wird dieser verworfen und beim nächsten Andocken erneut geprüft. Der Rahmen wird so erweitert, dass die Station vollständig sichtbar ist und somit nicht außerhalb des Bildausschnitts liegen kann.

#### Spurgröße

Der Mäher meldet seine Position alle zwei Sekunden und fährt lange, gerade Bahnen, sodass der größte Teil des ankommenden Grases auf einer bereits auf der Karte eingezeichneten Linie liegt. Eine Position wird daher nur dann gespeichert, wenn sie mindestens zwei Zentimeter von der geraden Linie zwischen den benachbarten Mähern abweicht – in einer aufgezeichneten Sitzung, in der die Positionen halbiert und die eingezeichnete Fahrspur um maximal etwa ein Pixel verschoben wurde.

Eine Spur kann bis zu 10.000 Positionen umfassen. Auf einem ausreichend großen Gelände wird die Spur nicht am Anfang abgeschnitten – schließlich soll die Karte diesen Teil der Session darstellen –, sondern mit einer gröberen Toleranz weiter ausgedünnt, sodass die gesamte Session sichtbar bleibt und nur Details verloren gehen. Dies wird im Logbuch vermerkt.

#### Kartenrahmen

Der Rahmen ist das Rechteck des Gartens in Rasenmäherkoordinaten, das die Kartenabbildung abdeckt, und er wird veröffentlicht in`{deviceId}.mapFrame` :

```json
{ "minX": -18, "maxX": 14, "minY": -3, "maxY": 29, "width": 800, "height": 800, "scale": 25 }
```

Das Bild füllt den Rahmen **exakt** aus – seine linke Kante ist`minX` , seine rechte Kante`maxX` seine Oberkante`maxY` seine Unterkante`minY` , ohne Begrenzung und mit einer Skala für beide Achsen. Eine Weltposition liegt daher bei`(x - minX) * scale` Pixel von links und`(maxY - y) * scale` Pixel vom oberen Rand. Das Bild ist an seiner längeren Seite maximal 800 Pixel lang; die kürzere Seite folgt der Form des Rahmens.

Die Grenzen sind **Meter im eigenen Koordinatensystem des Rasenmähers** – dieselben Zahlen wie`{deviceId}.location.postureX` Und`postureY` Es handelt sich nicht um einzelne Bildpixel. Der Adapter erweitert den Rahmen um zwei Meter (auf ganze Meter gerundet), sobald der Rasenmäher ihn verlässt, und verkleinert ihn anschließend nicht wieder. Diese Erweiterung bleibt auch nach einem Neustart und einem neuen Mähvorgang erhalten, sodass die Pixel einer Position von einem Renderprozess zum nächsten unverändert bleiben. Genau das ermöglicht es, die Karte über ein Foto des Gartens zu legen.

Da der Rahmen nie verkleinert wird, würde eine Position weit außerhalb des Gartens ihn dauerhaft vergrößern. Eine Position, die mehr als zehn Meter von der vorherigen entfernt ist, wird daher nicht als korrekt angesehen: Sie wird zurückgehalten, bis die nächste Meldung sie entweder bestätigt – der Rasenmäher befindet sich beispielsweise tatsächlich woanders, nachdem er die Ladestation verlassen hat – oder ihr widerspricht. Im letzteren Fall wird sie verworfen. Sollte ein Rahmen dennoch falsch angezeigt werden, löschen Sie ihn.`mapFrame` **Und**`mapTrack` Zustände des Geräts und Neustart des Adapters; der Rahmen wird immer nur aus der Schiene aufgebaut, daher müssen beide entfernt werden.

#### VIS Position Script

Um Ihr eigenes Rasenmähersymbol in ioBroker VIS über der Karte zu platzieren – beispielsweise über einem Foto des Gartens anstatt über der gerenderten Strecke – wandelt dieses Skript die Position des Rasenmähers in Pixel Ihres VIS-Bildes um. Es liest die Gartengrenzen aus dem Bild aus.`mapFrame` Anstatt Sie danach zu fragen, gibt es nichts zu messen und nichts, was man im Auge behalten müsste, wenn der Rahmen wächst:

```javascript
// === Configuration ===
const deviceId = 'NAVIMOW'; // Your device ID
const prefix = 'navimow.0.' + deviceId;

// Where the image sits in the VIS view and how big it is (px)
const bildX = 580;
const bildY = 573;
const bildPosX = 30;
const bildPosY = 30;

// Robot icon size (px)
const robX = 32;
const robY = 26;

// Datapoints for VIS widget position (create manually)
const dpPosX = '0_userdata.0.Navimow.Pos_X';
const dpPosY = '0_userdata.0.Navimow.Pos_Y';
const dpRotation = '0_userdata.0.Navimow.Rotation';

on({ id: [prefix + '.location.postureX', prefix + '.location.postureY'], change: 'any' }, () => {
  const posX = getState(prefix + '.location.postureX').val;
  const posY = getState(prefix + '.location.postureY').val;
  const frameRaw = getState(prefix + '.mapFrame').val;
  if (posX == null || posY == null || !frameRaw) return;
  const frame = JSON.parse(frameRaw);

  // The map image covers exactly the frame, no border: its corners are the frame's corners.
  const pctX = (posX - frame.minX) / (frame.maxX - frame.minX);
  const pctY = (frame.maxY - posY) / (frame.maxY - frame.minY);

  setState(dpPosX, Math.round(bildPosX + bildX * pctX - robX / 2), true);
  setState(dpPosY, Math.round(bildPosY + bildY * pctY - robY / 2), true);

  // Which way it faces, in degrees clockwise from pointing right - what CSS rotate() wants.
  const theta = getState(prefix + '.location.postureTheta').val;
  if (theta != null) {
    setState(dpRotation, Math.round((-theta * 180) / Math.PI), true);
  }
});
```

**Aufstellen:**

1. Verwenden Sie die`{deviceId}.map` Verwenden Sie den Status als Hintergrundbild einer VIS-Ansicht – er deckt den Rahmen bereits exakt ab, sodass keine Ausrichtung erforderlich ist. Um stattdessen ein Foto Ihres Gartens zu verwenden, richten Sie das Foto einmalig am Statusbild aus; danach gelten dieselben Berechnungen, da sich der Rahmen nicht mehr bewegt.
2. Erstelle die Datenpunkte`Pos_X` ,`Pos_Y` Und`Rotation` unter`0_userdata.0`
3. Satz`bildX` /`bildY` auf die Größe, in der das Bild angezeigt wird, und`bildPosX` /`bildPosY` zu seiner Position in der Ansicht
4. Fügen Sie ein VIS-Widget mit einem Rasenmäher-Symbol hinzu und binden Sie dessen CSS.`left` /`top` zu den Positionsdatenpunkten und`transform: rotate(…deg)` zur Rotation

Wenn Sie nur die Rennstrecke sehen wollen, ist all das nicht nötig – die`map` Der Zustand ist ein abgeschlossenes Bild, und`mapMarker` Der Rasenmäher ist bereits darauf eingezeichnet.

## API

Basierend auf dem [Navimow SDK](https://github.com/segwaynavimow/navimow-sdk) und [der Navimow HA-Integration](https://github.com/segwaynavimow/NavimowHA) .

| Endpunkt                                   | Zweck                                        |
| ------------------------------------------ | -------------------------------------------- |
| `POST /openapi/oauth/getAccessToken`       | OAuth2-Token-Austausch und -Aktualisierung   |
| `GET /openapi/smarthome/authList`          | Geräte entdecken                             |
| `POST /openapi/smarthome/getVehicleStatus` | Gerätestatus abrufen                         |
| `POST /openapi/smarthome/sendCommands`     | Befehle senden (Google Smart Home-Protokoll) |
| `GET /openapi/mqtt/userInfo/get/v2`        | MQTT-Verbindungsdaten abrufen                |

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2026-08-31)

- (typhosj) Start a new mowing session when the mower moves on to another zone, which a lawn split into zones announces in `location.partitionIds`
- (typhosj) Stop letting a mowing progress from a session long over hold the map of that session on screen: past six hours it counts for as little as none at all, and the mower leaving the dock clears the map. A zone task reports no progress whatsoever, so without this the map of the last whole-lawn session stayed up while the mower mowed a zone of it every day
- (typhosj) Put the mowed area and the mowing progress back to zero when a session is reset, so a zone run no longer shows the area and the percentage of a session days over
- (typhosj) Add `remote.resetMap`, which clears the track, the picture and the frame — for a lawn re-mapped or split into zones, where the adapter cannot see that a session ended
- (typhosj) Write the position, the heading and the two areas as numbers: the mower sends them as strings, so `location.postureX`, `postureY`, `postureTheta`, `subtotalArea` and `mowingWeekArea` used to be `text`/`string` states that no chart could draw and no script could compare without parsing them again
- (typhosj) Give the measured states their unit — metres, radians, square metres, percent — instead of naming it in brackets in the state's name

### 1.1.1 (2026-08-18)

- (typhosj) Register a release in Sentry only where a token for it is configured: without one `sentry-cli` answers 401 and fails the whole deploy job, after npm has already published

### 1.1.0 (2026-08-18)

- (typhosj) The remote controls are buttons now: they are written, not read, and no longer carry the mower state, which `status.vehicleState` says anyway
- (typhosj) Put the keys of every cloud payload through `FORBIDDEN_CHARS` before `json2iob` makes object ids of them, so a key the API spells with a forbidden character cannot land as an id nobody can address
- (typhosj) Arm the next status poll only once the one before it has come back, instead of on a fixed interval
- (typhosj) Cap the polling interval at a day in the adapter too, not only in the settings dialog
- (typhosj) Keep the authorization code out of the debug log and store it encrypted and protected
- (typhosj) Say in the README that the mowing map needs a prebuild of `@napi-rs/canvas`, that `stop` pauses rather than ends the job, and drop the German quotes from the setup steps
- (typhosj) Translate the admin settings into all eleven languages ioBroker asks for, from an `admin/i18n` folder instead of labels written into `jsonConfig.json`
- (typhosj) Say the length of the access token in the debug log instead of the first twenty characters of it, and keep the body of a failed token refresh out of the log entirely
- (typhosj) Put the device id through `FORBIDDEN_CHARS` before it becomes an object id, whether it came from the cloud or from an MQTT topic
- (typhosj) Fix the type check and let CI run it, so it cannot go red again unnoticed
- (typhosj) Require node.js 22, publish through npm's trusted publishing, and let the tests wait for lint and the type check
- (typhosj) Move the oldest changelog entries to `CHANGELOG_OLD.md`, and add `@iobroker/adapter-dev` so the `translate` script has the tool it calls

### 1.1.0-rc.0 (2026-08-17)

- (typhosj) Report a cloud outage after three failed polls instead of the first one, and let a single 502 pass as a warning
- (typhosj) Warn on a dropped MQTT connection and only report an error once it persists, because the broker takes most of them back within seconds
- (typhosj) Do not clear the map when the mower reports no task, which emptied the track of the last session overnight
- (typhosj) Log a failed API call as one readable line instead of the HTML error page a gateway answers with
- (typhosj) Draw the mower in the dock while the track is still empty, so it does not go missing from the picture after a session reset
- (typhosj) Keep the charging station on the map through a session reset, so the map is not blank while the mower is still leaving the dock
- (typhosj) Stop collecting positions while the mower stands in the dock, so its pose drift no longer grows the track and widens the map overnight
- (typhosj) Keep the MQTT connection alive while the mower stands still, so the position stream no longer dies out silently after ten idle minutes
- (typhosj) Ignore the all-zero posture a standing mower sends, so the marker no longer jumps off the map
- (typhosj) Render a live mowing map as a PNG in `{deviceId}.map`, drawn in a fixed frame so the picture stays put while the mower is out (#7)
- (typhosj) Keep the mowing track in `{deviceId}.mapTrack`, so the map survives an adapter restart instead of freezing on its last image (#7)
- (typhosj) Decide a new mowing session by the mowing progress, so a charging break no longer throws away the track of a session that is still running (#23)
- (typhosj) Keep the first minute of a new session, which the mower still reports as the one before (#23)
- (typhosj) Clear the map on the mowed area falling back to zero, which the mower reports minutes before the mowing progress catches up (#23)
- (typhosj) Ignore a mowing progress the broker delivers late, which read as a new session and cleared the map of one that had just finished (#23)
- (typhosj) Ignore every late location reading, not only the mowing progress, so an overtaken position no longer reaches the track or the states either (#23)
- (typhosj) Subscribe every MQTT channel once instead of twice, so each message is parsed and stored once
- (typhosj) Keep the mower state value list off `location.vehicleState`, which is a number and can never take any of them
- (typhosj) Stop refreshing the OAuth token once per failed MQTT connect attempt, without giving up the refresh that recovers an expired one
- (typhosj) Look for devices again on every poll, so a discovery that failed at startup no longer leaves the adapter idle until it is restarted by hand
- (typhosj) Try a failed token refresh again instead of dropping the chain, so a network outage over a refresh window no longer takes the adapter offline until a restart
- (typhosj) Load the canvas library on first use, so a host without a prebuild for it runs the adapter without a map instead of not running it at all
- (typhosj) The mowing map is a setting now and off by default, so an installation that does not want it pays nothing for it (#7)
- (typhosj) Keep the whole session in the track rather than its last 5000 positions, so the beginning no longer disappears off the map while the mower is still out (#7)
- (typhosj) Track colour, opacity and width can be set, so the map can be laid over a picture of the garden (#7)
- (typhosj) Draw the map at most every `mapRenderInterval` seconds instead of on every position, so a session no longer spends minutes of event loop and state writes on pictures nobody sees (#7)
- (typhosj) Stop the disconnect watchdog from asking for a timer while the adapter is shutting down, which only earned a warning in the log
- (typhosj) Publish the mower state from the MQTT state channel instead of the lagging HTTP cache
- (typhosj) Refresh the status over HTTP when MQTT goes quiet in MQTT-only mode (#18)
- (TA2k) Retry the MQTT connection after a transient credential failure (#18)
- (TA2k) Keep the MQTT broker password and the refresh token out of the debug log
- (TA2k) Read the battery level from `capacityRemaining` again
- (typhosj) HTTP polling defaults to 5 minutes and can be switched off with 0; the admin UI checks the range
- (typhosj) Fix the findings of the ioBroker repository checker (#11)

### 1.0.2 (2026-04-04)

- (TA2k) Add MQTT location topic with real-time position tracking
- (TA2k) Generic MQTT topic handling via wildcard subscription

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 TA2k <tombox2020@gmail.com>

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