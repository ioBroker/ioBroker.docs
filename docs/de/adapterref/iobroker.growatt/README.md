---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: ohne Titel
hash: w/wZnVe/W6/Uotei+a1qmXod98bfZVQ1gLVMVUEz6QE=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/growatt-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/growatt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter funktioniert über die Cloud-Server von Growatt. Es gibt auch den [Grott-Projekt](https://github.com/johanmeijer/grott), der die Daten aus der Kommunikation abfängt.

---

### Growatt-Adapter für ioBroker
ioBroker Growatt-Adapter zur Kommunikation mit dem Growatt Shine-Server.
Ich bin nicht angeschlossen.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger in die Cloud gesendet.
Sie können dies ändern, siehe unten.

Es sind nicht alle Anlagentypen umgesetzt.

Aktuell können nur Daten gelesen werden, das Schreiben von Parametern oder Ändern von Parametern ist nicht möglich.

### Kann ich auf einen Kaffee vorbeikommen?
Natürlich, wenn Ihnen meine Arbeit gefällt über Paypal an PLChome _at_ fontanestr _dot_ de

---

## Adapter-Admin-Seite
### Haupteinstellungen
#### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine App oder im Webportal verwenden.

#### Anmeldung mit gemeinsamem Schlüssel
Auf der Website von Growatt unter Energie, Anlagenmanagement, Betriebsmittel können Sie sich einen Schlüssel per E-Mail zusenden.

#### Anlagendaten lesen
Dieser Datensatz enthält die gespeicherten Stammdaten

#### Letzte Verlaufsdaten lesen
Liest den letzten Datensatz aus der Historie des Datenloggers.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Statusdaten lesen
Diese Daten sind nicht für alle Anlagen verfügbar (nicht INV/MAX/TLX). Dieser Datensatz enthält Livedaten.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Gesamtdaten lesen
Dieser Datensatz enthält Aggregatdaten.

#### Gerätedaten lesen
In diesem Datensatz sind einige Daten des Gerätes enthalten. Einige Daten sind auch in den anderen Kategorien verfügbar.

#### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

#### Fehlerprotokolleinträge lesen
Liest die Einträge im Störungsprotokoll des aktuellen Jahres und erstellt dazu Objekte mit den Meldungen. Es wird nur die erste Seite mit den aktuellsten Meldungen gelesen.

#### Wechselrichtereinstellungen schreiben
Ist diese aktiviert, können bei manchen Wechselrichtern einige Einstellungen bearbeitet werden.

Unterhalb des Elements Wechselrichter-Seriennummer werden Objekte für die Einstellungen angelegt. Für jede Einstellung wird ein Kanal angelegt.

Unter den Objekten befinden sich „read“, „write“, „msg“ und die Knotenwerte. Unter den Werten befinden sich die Parameter.

Konnten die Werte der Parameter gelesen werden, werden diese mit ACK=true geschrieben. Bei erfolgreichem Lesen mit ACK wird "read" auf true gesetzt. Schlägt das Lesen fehl, wird "Read" auf false ack=true gesetzt. Das Schreiben von "true" auf "Read" ohne ACK löst einen Lesevorgang aus. Wird eine neue Verbindung zur Cloud hergestellt, werden die Einstellungen ebenfalls ausgelesen.

Um die Einstellungen zu schreiben, müssen zunächst die Parameter gesetzt werden. Anschließend wird "write" auf true mit ack=false gesetzt.

Konnten die Daten erfolgreich geschrieben werden, wird "write" auf "true" ack=true gesetzt, hat der Wechselrichter einen Fehler gemeldet, wird "write" auf "false" ack=true gesetzt. Zusätzlich wird die Rückmeldung des Wechselrichters in den Status "msg" geschrieben.

Wenn das Schreiben erfolgreich war, wird automatisch das Lesen ausgelöst.

Der Wechselrichter kann immer nur eine Einstellung gleichzeitig ändern und der Übertragungsweg ist vom ioBroker über die Cloud zum WLAN-Adapter und dann zum Wechselrichter. Die Einstellungen werden über eine Warteschlange nacheinander abgearbeitet. Eine zu kurze Sitzungszeit kann zu Problemen führen.

Die Erstellung der Einstellungen erfolgte nach bestem Wissen und Gewissen. Der Autor übernimmt jedoch keine Haftung für darin enthaltene Fehler oder für Schäden, die durch die Nutzung der Software entstehen.

#### Wählen Sie es aus, wenn Ihre Growatt-Seite eine schwarze C&I-Seite ist
Wählen Sie es aus, wenn Ihre Growatt-Seite eine C&I-Anlagenseite mit dem Index bC oder plantDo im Pfad der Growatt-Weboberfläche ist.

Die schwarzen C&I-Seiten (kommerziell und industriell) haben einen anderen Pfad zu den Objekten, aber es scheint zu funktionieren, wenn dieses Kontrollkästchen aktiviert ist. Es hat den Index im Webpfad in indexbC geändert.

#### Timeout in Sekunden
Das Standard-Timeout für HTTP-Anfragen. Der Standardwert beträgt 60 Sekunden, wie bei Webbrowsern

#### Prozess-Timeout in Sekunden
Dieses Timeout überwacht die Datenerfassung vom Growatt-Server. Wenn der Server nicht alle Daten innerhalb dieser Zeit verarbeitet, wird ein Fehler gemeldet, die Sitzung beendet und ein neuer Zyklustimer gestartet. Der Standardwert beträgt 600 Sekunden.
Wenn der Wert 0 ist, wird diese Prüffunktion nicht ausgeführt.

#### Websitzung aufrechterhalten
Der Adapter meldet sich nur einmal an und nicht bei jeder Datenanfrage vom Growatt-Server. Standardmäßig ist er eingeschaltet.

#### Sitzungsdauer in Minuten
Hier können Sie einstellen, wann sich der Adapter vom Server abmeldet und wieder anmeldet. Eine 0 bedeutet, dass er sich nie abmeldet. Der Standardwert ist 0 = unendlich.

#### Zykluszeit in Sekunden
Das Intervall, in dem die Daten vom Server abgefragt werden. Die für die Datenabfrage benötigte Zeit wird dann von der nächsten abgezogen. Dauert die Abfrage länger als die Wartezeit, schläft der Adapter nur 100ms. Der Standardwert liegt bei 30 Sekunden.

#### Fehlerzykluszeit in Sekunden
Tritt beim Abfragen der Werte beim Growatt-Server ein Fehler auf, wird diese Zeit statt der Zykluszeit verwendet. Der Standardwert beträgt 120 Sekunden

#### Growatt-Server
Hier kann eine andere URL eingetragen werden, um beispielsweise die US-Domäne zu verwenden. Diese muss jedoch mit "https://" beginnen. Der Standardwert ist leer, daher wird https://server.growatt.com verwendet.

### Objekte verwalten
Hier kannst du festlegen, was mit jedem Wert (Objekt) passieren soll, der vom Wechselrichter abgeholt wird.
Es gibt sehr viele Werte, die nicht zu deinem Wechselrichter gehören. Diese kannst du hier entfernen.
Da es kein Event gibt, mit dem die Objektliste beim Speichern neu geladen werden kann, muss beim Speichern der Update-Button gedrückt werden.

#### Normal
Das Objekt bleibt bestehen, der Wert wird aktualisiert.

#### Löschen
Das Objekt wird gelöscht und der vom Wechselrichter geladene Wert verworfen.
Nach dem Update werden nur noch die ID und die Aktion angezeigt, da das Objekt nicht mehr existiert. Bei normaler Auswahl wird das Objekt nach dem Speichern neu angelegt.

#### Kein Update
Das Objekt bleibt bestehen, die Werte vom Wechselrichter werden verworfen.

### Logger verwalten
Die Instanz muss laufen und am Server angemeldet sein. Anschließend können über den Aktualisieren-Button in diesem Reiter die Einstellungen des Datenloggers aufgerufen werden.

Die Daten werden nicht automatisch abgefragt, die Abfrage kann nur über den Button erfolgen.

Die angezeigten Felder beim Datenlogger können nicht verändert werden. Es handelt sich nur um abgerufene Daten.

Bei jedem Logger werden Buttons angezeigt. Über den Button können Einstellungen bearbeitet werden.

_Bei der Verwendung von GROTT muss das Ändern von Einstellungen in der INI aktiviert sein._ Bitte die Einstellungen nicht verwenden, wenn ein Wert erscheint, den Sie nicht erwartet haben.

Achtung dies basiert auf Neuentwicklungen. Für Schäden am Gerät übernehme ich keine Haftung.

#### Schaltflächenintervall
Das aktuelle Intervall in Minuten wird aus dem Datenlogger ausgelesen und es erscheint ein Eingabeformular, in dem der Wert angepasst werden kann.
Erhält man eine erfolgreiche Antwort, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltflächenserver-IP
Hier kann der Server für die Datenübertragung auf den Logger eingestellt werden. Bei Verwendung von Grott oder US kann hier die lokale bzw. US-IP angegeben werden.

Erhält man eine erfolgreiche Antwort, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltflächenserver-Port
Hier kann der Port auf dem Server für die Datenübertragung zum Logger eingestellt werden.
Erhält man eine erfolgreiche Antwort, sollte der Datenlogger neu gestartet werden um die Einstellungen zu aktivieren.

#### Schaltfläche "Firmware überprüfen"
Es wird abgefragt, ob die Firmware des Datenloggers auf dem neuesten Stand ist.
Das Update muss auf der Growatt-Seite durchgeführt werden.

#### Schaltfläche Datenlogger neu starten
Jeder Bootvorgang ist gut.
Die Einstellungen werden übernommen.

---

## SendTo für Skripte
Es besteht die Möglichkeit per sendTo einen Befehl an die Instanz zu senden. Der Adapter antwortet dann.
Folgende Befehle werden umgesetzt.
Der Rückgabewert wird abhängig von der Parameterübergabe zurückgegeben. Werden die Parameter als JSON-String übergeben, wird ein JSON zurückgegeben. Werden die Parameter als Objekt übergeben, wird ein Objekt zurückgegeben.

### GetHistory
Dieser Befehl listet die Historie auf. Er kann beispielsweise verwendet werden, um Daten in einer Datenbank zu ergänzen.

Unabhängig vom Zeitbereich scheint Growatt immer 80 Datensätze zurückzugeben. Wenn das Intervall auf 1 Minute eingestellt ist und mehr als 80 Minuten benötigt werden, muss der Befehl mehrmals ausgeführt und der Start von 0 immer weiter erhöht werden.

| Parameter | Typ | Beschreibung |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Typ | String | Den Typ des Wechselrichters finden Sie im Objekt „growatt.-instance.-nr.-devices.-sn.-growattType“. |
| sn | String | Die Seriennummer des Wechselrichters finden Sie im Objektpfad „growatt.-instance-.-nr-.devices.-sn-“. |
| Startdatum | Datum | Der Start |
| Enddatum | Datum | Das Ende muss größer sein als der Anfang |
| start | Integer | 0 ist die Startseite des Aufrufs mit den aktuellsten Daten zuerst |

Beispielaufruf:

```
  sendTo('growatt.0','getHistory',{"type":"<your inverter type>","sn":"<your inverter serial>","startDate":new Date((new Date()).getTime()- 60*60*1000),"endDate":new Date() , "start":0},(res)=>{console.log(res)})
```

Beispielcode:

```
const sn = " your sn "; //your inverter sn
const inType = " your typ "; // the invertertyp
const hist = 'growatt.0. your nr .devices. your sn .historyLast.'; // the Path to history
const storeField =['accChargePower','etoGridToday']; //the fields to store
const history = "influx.0" //your History sql.0 or influx.0 or history.0 ...
const min = 10 // größer 10 min auffüllen....

on({id: hist+'calendar', change: "ne"},(obj)=>{
    if ((obj.state.val - obj.oldState.val) > min*60000) {
        console.log(obj.state.val - obj.oldState.val);
        function fillup(res) {
            res.forEach((r)=>{
                const ti = (new Date(r.calendar)).getTime();
                if (ti > obj.oldState.val && ti < obj.state.val) {
                    function store(n) {
                        sendTo(history, 'storeState', {
                            id: hist+n,
                            state: {ts: ti, val: r[n], ack: true}
                        }, result => {console.log(`added ${hist+n} ${new Date(ti)} ${r[n]}`)});
                    }
                    storeField.forEach((f) => {store(f)});
                }
            })
        }
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":0},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":1},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":2},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":3},fillup)
    }
});
```

### GetDatalogger
Sie erhalten Informationen zu den Datenloggern.
Diese Funktion hat keine Parameter. Es muss entweder "{}" oder {} übergeben werden.
Die Rückgabe ist ein Array von Objekten.

| Parameter | Typ | Beschreibung |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
Es liest das Intervall aus und gibt es zurück. Der Rückgabewert ist ein OBJ. Das Intervall ist in msg.

| Parameter | Typ | Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerIntervalRegister
Schreibt das Intervall in dem der Logger die Daten sendet.

| Parameter | Typ | Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### GetDataLoggerIpRegister
Es liest die IP, an die der Logger die Daten sendet und gibt sie zurück. Der Rückgabewert ist ein OBJ. Die IP steht in msg.

| Parameter | Typ | Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerIp
Es schreibt die IP, an die der Logger die Daten sendet. Es ist nützlich für das Grott-Projekt. Der Rückgabewert ist ein Objekt, das angibt, was passiert ist.

| Parameter | Typ | Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### GetDataLoggerPortRegister
Es liest den Port, an den der Logger die Daten sendet und gibt diese zurück. Der Rückgabewert ist ein OBJ. Die IP steht in msg.

| Parameter | Typ | Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerPort
Es schreibt den Port, an den der Logger die Daten sendet. Es ist nützlich für das Grott-Projekt. Der Rückgabewert ist ein Objekt, das angibt, was passiert ist.

| Parameter | Typ | Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### CheckLoggerFirmware
Ruft den Firmwarecheck vom Logger ab. Ist ein Update notwendig, sieht man das in der Antwort.

| Parameter | Typ | Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### Datalogger neu starten
Führt zu einem Warmstart des Datenloggers.

| Parameter | Typ | Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | string | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

---

## Interne Methode zum Beschleunigen des Datenintervalls
Schauen Sie sich Logger verwalten und Schaltflächenintervall an

## Externe App-Methode zum Beschleunigen des Datenintervalls
- Öffnen Sie die ShinePhone-App
- Klicken Sie unten auf den Anhang
- Oben rechts +, dann Liste Datenlogger
- Klicken Sie auf den vorhandenen Datenlogger
- Datenlogger konfigurieren
Drahtloser Hotspot-Modus
- Setzen Sie den Stick in den AP-Modus
- Mit WLAN-Hotspot verbinden, PW 123456789 ? <- Noch einmal prüfen
- Weitermachen
- Fortschrittlich
- Zeiteinstellung
- Intervall bis 1
- Geben Sie das Passwort „growattJJJJMMTT“ ein (z. B. „growatt20220209“)
- Entsperren
- Klicken und Änderungen übernehmen
- Hotspot-Modus beenden

## Beschleunigen Sie das Datenintervall externer alter Methoden
Im Hotspot-Modus ist es nur möglich, das Intervall auf der alten Firmware zu ändern.
Growatt hat die Website aus der Firmware entfernt.
Daher wurde auch die Beschreibung entfernt.

**Auf der Growatt-Seite gibt es keine Änderungen an den Diagrammen. Dort ist lediglich eine Änderung der Daten aus dem Datenlogger zu sehen.**

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 3.3.1 (2024-10-26)

- (PLCHome) Added ac charge for TLXH. Thanx to olli0815!
- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.3.0 (2024-10-25)

- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.2.5 (2024-08-13)

- (PLCHome) Solved the problem that no inverter list but result 2 was returned in NOAH.
- (PLCHome) Added NOAH.

### 3.2.4 (2024-07-03)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) no connection can be established password must now be transferred as MD5 hash.
- (PLCHome) cookie issue

### 3.2.3 (27.01.2024)

- (PLCHome) In Multiple Backflow the objects in Total Data and Status Data were swapped. Please delete the objects below Total Data and Status Data and restart the adapter after the update.

### 3.2.2 (27.01.2024)

- (PLCHome) Catching of the fault log messages is now possible (Thanx to ZioCain for the code)
- (PLCHome) Setting active power for MAX inverter (Thanx to sefina for testing)

### 3.2.1 (08.09.2023)

- (PLCHome) Additionally query the status information via the Plant List.

### 3.2.0 (01.09.2023)

- (PLCHome) Added inverter typ singleBackflow and multipleBackflow

### 3.1.2 (16.08.2023)

- (PLCHome) sendTo now also possible with objects as message data
- (PLCHome) Added message getHistory

### 3.1.1 (03.07.2023)

- (PLCHome) Added support for Growatt page when Plant is a C&I Plant page with indexbC or plantDo in Path of the Growatt web interface. Thanks to Denn281

### 3.0.4 (03.07.2023)

- (PLCHome) No retrieval of the other parameters value possible after parameter error
- (PLCHome) Grid first and Battery first setting on MIX may not work

### 3.0.3 (27.06.2023)

- (PLCHome) setting for tlx/tlxh time improved

### 3.0.2 (08.06.2023)

- (PLCHome) Write inverter settings, it can be activated via the config

  - mix
    - Time
    - Grid first
    - Battery first
    - Inverter On/Off
    - LoadFirst
    - Failsafe
    - PV active power rate
    - Backflow setting
      - Backflow setting power
    - EPSOn
  - tlx/tlxh
    - Time
    - PV active power rate

### 2.1.1 (17.04.2023)

- (PLCHome) Calendar structure was not always changed to timestamp
- (PLCHome) Improvement in the internal handling of objects without considering their case.

### 2.1.0 (14.04.2023)

- (PLCHome) Status data now also from TLX/TLXH
- (PLCHome) TLX Hybrid is now working
- (PLCHome) If there are different inverters, these are now shown

### 2.0.0 (06.10.2022)

- (PLCHome) Data logger settings can be called up and changed.
- (PLCHome) The server url can be changed.

### 1.2.1 (21.09.2022)

- (PLCHome) Added an offset to numeric values. My inverter reset te total quantity by itself. Now the total quantity can be corrected.

### 1.1.19 (30.08.2022)

- (PLCHome) HTML Header

### 1.1.17 (10.08.2022)

- (PLCHome) JSON Loopkiller

### 1.1.16 (10.08.2022)

- (PLCHome) https rejectUnauthorized false

### 1.1.15 (28.04.2022)

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values are empty

### 1.1.14 (26.04.2022)

- (PLCHome) Restart loop when exception

### 1.1.13 (08.04.2022)

- (PLCHome) total data and history data missing for type inv

### 1.1.12 (06.04.2022)

- (PLCHome) api maintance

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2024 PLCHome

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