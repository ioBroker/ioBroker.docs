---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: kein Titel
hash: yeK+7qjG/tFGYwYR2fP9xAxycdFZPprsP44FK5e2mZ8=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/growatt-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/growatt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter funktioniert über die Cloud-Server von Growatt. Es gibt auch den [Grott-Projekt](https://github.com/johanmeijer/grott), der die Daten aus der Kommunikation abfängt.

---

### Growatt-Adapter für ioBroker
ioBroker Growatt-Adapter zur Kommunikation mit Growatt Shine Server.
Ich bin nicht angeschlossen.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger an die Cloud gesendet.
Sie können es ändern, siehe unten.

Nicht alle Anlagentypen werden umgesetzt.

Derzeit können nur Daten gelesen werden, das Schreiben von Parametern oder das Ändern von Parametern ist nicht möglich.

---

## Adapter-Administratorseite
### Haupteinstellungen
#### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine-App oder im Webportal verwenden.

#### Anmeldung mit gemeinsamem Schlüssel
Auf der Growatt-Website unter Energie, Anlagenmanagement, Betriebstools können Sie sich einen Schlüssel per E-Mail zusenden.

#### Anlagendaten lesen
Dieser Datensatz enthält die hinterlegten Stammdaten

#### Letzte Verlaufsdaten lesen
Liest den letzten Datensatz aus der Historie des Datenloggers.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Statusdaten lesen
Diese Daten sind nicht für alle Anlagen verfügbar (nicht INV/MAX/TLX). Dieser Datensatz enthält Live-Daten.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Gesamtdaten lesen
Dieser Datensatz enthält Aggregationsdaten.

#### Gerätedaten lesen
Dieser Datensatz enthält einige Daten vom Gerät. Einige Daten sind auch in den anderen Kategorien verfügbar.

#### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

#### Fehlerprotokolleinträge lesen
Liest die Einträge im Störungsprotokoll des aktuellen Jahres und erstellt hierfür Objekte mit den Meldungen. Es wird nur die erste Seite mit den aktuellsten Berichten gelesen.

#### Wechselrichtereinstellungen schreiben
Wenn diese aktiviert ist, können einige Einstellungen für einige Wechselrichter bearbeitet werden.

Für die Einstellungen werden Objekte unterhalb des Wechselrichter-Seriennummernelements erstellt. Für jede Einstellung wird ein Kanal erstellt.

Unterhalb der Objekte befinden sich „read“, „write“, „msg“ und die Knotenwerte. Unter den Werten befinden sich Parameter.

Konnten die Werte der Parameter gelesen werden, werden sie mit ACK=true geschrieben. „read“ wird bei erfolgreichem Lesen mit ack auf true gesetzt. Wenn das Lesen fehlschlägt, wird „Read“ auf false ack=true gesetzt. Das Schreiben von „true“ auf „Read“ ohne ACK löst einen Lesevorgang aus. Wird eine neue Verbindung zur Cloud hergestellt, werden die Einstellungen ebenfalls ausgelesen.

Um die Einstellungen zu schreiben, müssen zunächst die Parameter eingestellt werden. Dann wird „write“ mit ack=false auf true gesetzt.
Wenn die Daten erfolgreich geschrieben wurden, wird „write“ auf „true“ ack=true gesetzt, wenn der Wechselrichter einen Fehler gemeldet hat, wird „write“ auf „false“ ack=true gesetzt. Zusätzlich wird die Rückmeldung des Wechselrichters in den Status „msg“ geschrieben.

War das Schreiben erfolgreich, wird automatisch das Lesen ausgelöst.

Der Wechselrichter kann jeweils nur eine Einstellung ändern und der Übertragungsweg verläuft vom ioBroker über die Cloud zum WLAN-Adapter und dann zum Wechselrichter. Die Einstellungen werden nacheinander über eine Warteschlange abgearbeitet. Eine zu kurze Sitzungszeit kann zu Problemen führen.

Das Verfassen der Einstellungen erfolgte nach bestem Wissen und Gewissen. Der Autor übernimmt jedoch keine Haftung für enthaltene Fehler oder für Schäden, die durch die Nutzung der Software entstehen.

#### Wählen Sie es aus, wenn Ihre Growatt-Seite eine schwarze C&I-Seite ist
Wählen Sie es aus, wenn Ihre Growatt-Seite eine C&I-Pflanzenseite mit indexbC oder plantDo im Pfad der Growatt-Weboberfläche ist.

Die schwarzen C&I-Seiten (gewerblich und industriell) haben einen anderen Pfad zu den Objekten, aber es scheint zu funktionieren, wenn dieses Kontrollkästchen aktiviert ist. Der Index wurde im Webpfad in indexbC geändert.

#### Timeout in Sekunden
Das Standard-Timeout für HTTP-Anfragen. Der Standardwert beträgt 60 Sekunden, wie bei Webbrowsern

#### Prozess-Timeout in Sekunden
Dieses Timeout überwacht die Datenerfassung vom Growatt-Server. Verarbeitet der Server innerhalb dieser Zeit nicht alle Daten, wird ein Fehler gemeldet, die Sitzung beendet und ein neuer Zyklustimer gestartet. Der Standardwert beträgt 600 Sekunden.
Bei einem Wert von 0 wird diese Prüffunktion nicht ausgeführt.

#### Websitzung beibehalten
Der Adapter meldet sich nur einmal an und nicht bei jeder Datenanfrage vom Growatt-Server. Standardmäßig ist es aktiviert.

#### Sitzungszeit in Minuten
Hier können Sie einstellen, wann sich der Adapter vom Server abmeldet und wieder anmeldet. Eine 0 bedeutet, dass Sie sich nie abmelden. Der Standardwert ist 0=unendlich.

#### Zykluszeit in Sekunden
Das Intervall, in dem die Daten vom Server angefordert werden. Die für die Datenabfrage benötigte Zeit wird dann von der nächsten abgezogen. Dauert die Abfrage länger als die Wartezeit, schläft der Adapter nur 100 ms. Der Standardwert beträgt 30 Sekunden.

#### Fehlerzykluszeit in Sekunden
Tritt beim Abfragen der Werte beim Growatt-Server ein Fehler auf, wird diese Zeit anstelle der Zykluszeit verwendet. Der Standardwert beträgt 120 Sekunden

#### Growatt-Server
Hier kann eine andere URL eingegeben werden, um beispielsweise die US-Domain zu verwenden. Es muss jedoch mit „https://“ beginnen. Der Standardwert ist leer, daher wird https://server.growatt.com verwendet.

### Objekte verwalten
Hier können Sie festlegen, was mit jedem Wert (Objekt) passieren soll, der vom Wechselrichter erfasst wird.
Es gibt viele Werte, die nicht zu Ihrem Wechselrichter gehören. Diese können hier entfernt werden.
Da es kein Ereignis gibt, mit dem die Objektliste beim Speichern neu geladen werden kann. Beim Drücken von „Speichern“ muss die Schaltfläche „Aktualisieren“ verwendet werden.

#### Normal
Das Objekt bleibt erhalten, der Wert wird aktualisiert.

#### Löschen
Das Objekt wird gelöscht und der vom Wechselrichter geladene Wert verworfen.
Nach dem Update werden nur noch die ID und die Aktion angezeigt, da das Objekt nicht mehr existiert. Bei normaler Auswahl wird das Objekt nach dem Speichern erneut erstellt.

#### Kein Update
Das Objekt bleibt bestehen, die Werte vom Wechselrichter werden verworfen.

### Logger verwalten
Die Instanz muss ausgeführt und beim Server angemeldet sein. Anschließend können die Einstellungen des Datenloggers über den Aktualisieren-Button in diesem Reiter aufgerufen werden.
Die Daten werden nicht automatisch abgefragt, die Anfrage kann nur über den Button erfolgen.
Die für den Datenlogger angezeigten Felder können nicht geändert werden. Es handelt sich lediglich um abgerufene Daten.
Für jeden Logger werden Schaltflächen angezeigt. Einstellungen können mit der Schaltfläche bearbeitet werden.
_Bei Verwendung von GROTT muss das Ändern von Einstellungen in der INI aktiviert sein._ Bitte verwenden Sie die Einstellungen nicht, wenn ein Wert erscheint, den Sie nicht erwartet haben.
Achtung, dies basiert auf Reingeneering. Für Schäden am Gerät übernehme ich keine Haftung.

#### Tastenintervall
Das aktuelle Intervall in Minuten wird aus dem Datenlogger ausgelesen und es erscheint eine Eingabemaske, in der der Wert angepasst werden kann.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Server-IP
Hier kann der Server für die Datenübertragung auf dem Logger eingestellt werden. Bei Verwendung von Grott oder US kann hier die lokale oder US-IP angegeben werden.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Server-Port
Hier kann der Port auf dem Server für die Datenübertragung auf den Logger eingestellt werden.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Firmware überprüfen
Es wird abgefragt, ob die Firmware des Datenloggers aktuell ist.
Das Update muss auf der Growatt-Seite durchgeführt werden.

#### Schaltfläche Datenlogger neu starten
Jeder Stiefel ist gut.
Die Einstellungen werden übernommen.

---

## SendTo für Skripte
Es ist möglich, über sendTo einen Befehl an die Instanz zu senden. Der Adapter antwortet dann.
Die folgenden Befehle sind implementiert.
Der Rückgabewert wird abhängig von der Parameterübergabe zurückgegeben. Wenn die Parameter als JSON-String übergeben werden, wird ein JSON zurückgegeben. Werden die Parameter als Objekt übergeben, wird ein Objekt zurückgegeben.

### GetHistory
Dieser Befehl listet den Verlauf auf. Es kann beispielsweise zur Ergänzung von Daten in einer Datenbank verwendet werden.
Unabhängig vom Zeitraum scheint Growatt immer 80 Datensätze zurückzugeben. Ist das Intervall auf 1 Minute eingestellt und werden mehr als 80 Minuten benötigt, muss der Befehl mehrmals ausgeführt und der Start bei 0 immer weiter erhöht werden.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Typ | Zeichenfolge | Den Typ des Wechselrichters finden Sie im Objekt „growatt. – Instanz – . – nr – .devices. – sn – .growattType“. |
| sn | Zeichenfolge | Die Seriennummer des Wechselrichters finden Sie im Objektpfad „growatt. - Instanz - . - nr - .devices. - sn -“. |
| Startdatum | Datum | Der Atart |
| Enddatum | Datum | Der Endmast wird größer als der Anfang |
| Start | Ganzzahl | 0 ist die Startseite für den Anruf mit den neuesten Daten zuerst |

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
Es gibt Ihnen Informationen über die Datenlogger.
Diese Funktion hat keine Parameter. Es muss entweder „{}“ oder {} übergeben werden.
Die Rückgabe ist ein Array von Objekten.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
Es liest das Intervall aus und gibt es zurück. Der Rückgabewert ist ein OBJ. Das Intervall ist in msg angegeben.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerIntervalRegister
Schreibt das Intervall, in dem der Logger die Daten sendet.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### GetDataLoggerIpRegister
Es liest die IP, an die der Logger die Daten sendet, und gibt sie zurück. Der Rückgabewert ist ein OBJ. Die IP ist in msg.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerIp
Es schreibt die IP, an die der Logger die Daten sendet. Es ist nützlich für das Grott-Projekt. Der Rückgabewert ist ein Objekt, das sagt, was passiert ist.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### GetDataLoggerPortRegister
Es liest den Port, an den der Logger die Daten sendet, und gibt sie zurück. Der Rückgabewert ist ein OBJ. Die IP ist in msg.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### SetDataLoggerPort
Es schreibt den Port, an den der Logger die Daten sendet. Es ist nützlich für das Grott-Projekt. Der Rückgabewert ist ein Objekt, das sagt, was passiert ist.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------- | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |
| Wert | Ganzzahl | Der neue Wert in Minuten |

Ein Objekt wird mit einer Nachricht zurückgegeben.

### CheckLoggerFirmware
Ruft den Firmware-Check vom Logger auf. Ob ein Update notwendig ist, können Sie der Antwort entnehmen.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

### RestartDatalogger
Bewirkt einen Warmstart des Datenloggers.

| Parameter | Geben Sie | ein Beschreibung |
| --------- | ------ | ------------------------------------------------------------- |
| sn | Zeichenfolge | Die Seriennummer des Loggers wird von getDatalogger zurückgegeben. |

---

## Interne Methode des Datenintervalls beschleunigen
Schauen Sie sich „Logger verwalten“ und „Schaltflächenintervall“ an

## Externe App-Methode zur Beschleunigung des Datenintervalls
- Öffnen Sie die ShinePhone-App
- Klicken Sie unten auf den Anhang
- Oben rechts +, dann Datenlogger auflisten
- Klicken Sie auf vorhandenen Datenlogger
- Datenlogger konfigurieren
- Drahtloser Hotspot-Modus
- Versetzen Sie den Stick in den AP-Modus
- Mit WLAN-Hotspot verbinden, PW 123456789? <- nochmal prüfen
- Weitermachen
- Fortschrittlich
- Zeiteinstellung
- Intervall bis 1
- Geben Sie das Passwort „growattJJJJMMTT“ ein (z. B. „growatt20220209“).
- Freischalten
- Klicken Sie auf und übernehmen Sie die Änderungen
- Hotspot-Modus verlassen

## Externe alte Methode des Datenintervalls beschleunigen
Im Hotspot-Modus ist eine Änderung des Intervalls nur auf der alten Firmware möglich.
Growatt hat die Website aus der Firmware entfernt.
Daher wurde auch die Beschreibung entfernt.

**Es gibt keine Änderung an den Diagrammen auf der Growatt-Seite. Dort ist lediglich eine Änderung der Daten des Datenloggers zu erkennen.**

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (PLCHome) Configure this adapter to use the release script.

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