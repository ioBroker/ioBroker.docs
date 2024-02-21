---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: kein Titel
hash: vWjDtyP1CgPk43nFs0lzDip6hiUJB3n0/TiGkjPZNZc=
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
| Start | Ganzzahl | 0 ist die Startseite für den Anruf mit den aktuellsten Daten zuerst |

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

## Datenintervall externe alte Methode beschleunigen
Im Hotspot-Modus ist es nur auf der alten Firmware möglich, das Intervall zu ändern.
Growatt hat die Website aus der Firmware entfernt.
Daher wurde auch die Beschreibung entfernt.

**Es gibt keine Änderung an den Diagrammen auf der Growatt-Seite. Dort ist lediglich eine Änderung der Daten des Datenloggers zu erkennen.**

-\*-

## **IN ARBEIT**
- (PLCHome) Konfigurieren Sie diesen Adapter für die Verwendung des Release-Skripts.

## 3.2.3 (27.01.2024)
- (PLCHome) Bei Multiple Backflow wurden die Objekte in Gesamtdaten und Statusdaten vertauscht. Bitte löschen Sie die Objekte unter Gesamtdaten und Statusdaten und starten Sie den Adapter nach dem Update neu.

## 3.2.2 (27.01.2024)
- (PLCHome) Das Abfangen der Fehlerprotokollmeldungen ist jetzt möglich (Danke an ZioCain für den Code)
- (PLCHome) Wirkleistung für MAX-Wechselrichter einstellen (Danke an Sefina für den Test)

## 3.2.1 (08.09.2023)
- (PLCHome) Abfrage der Statusinformationen zusätzlich über die Anlagenliste.

## 3.2.0 (01.09.2023)
- (PLCHome) Wechselrichtertyp singleBackflow und multipleBackflow hinzugefügt

## 3.1.2 (16.08.2023)
- (PLCHome) sendTo jetzt auch mit Objekten als Nachrichtendaten möglich
- (PLCHome) Nachricht getHistory hinzugefügt

## 3.1.1 (03.07.2023)
- (PLCHome) Unterstützung für die Growatt-Seite hinzugefügt, wenn Plant eine C&I Plant-Seite mit indexbC oder plantDo im Pfad der Growatt-Weboberfläche ist. Danke an Denn281

## 3.0.4 (03.07.2023)
- (PLCHome) Nach Parameterfehler ist kein Abrufen der anderen Parameterwerte möglich
- (PLCHome) Die Einstellung „Grid First“ und „Battery First“ bei MIX funktioniert möglicherweise nicht

## 3.0.3 (27.06.2023)
- (PLCHome)-Einstellung für tlx/tlxh-Zeit verbessert

## 3.0.2 (08.06.2023)
- (PLCHome) Wechselrichtereinstellungen schreiben, kann über die Konfiguration aktiviert werden

  - mischen
    - Zeit
    - Raster zuerst
    - Batterie zuerst
    - Wechselrichter ein/aus
    - LoadFirst
    - Ausfallsicher
    - PV-Wirkleistungspreis
    - Rückflusseinstellung
      - Rückfluss-Einstellleistung
    - EPSOn
  - tlx/tlxh
    - Zeit
    - PV-Wirkleistungspreis

## 2.1.1 (17.04.2023)
- (PLCHome) Die Kalenderstruktur wurde nicht immer auf Zeitstempel geändert
- (PLCHome) Verbesserung der internen Handhabung von Objekten ohne Berücksichtigung ihres Falles.

## 2.1.0 (14.04.2023)
- (PLCHome) Statusdaten jetzt auch von TLX/TLXH
- (PLCHome) TLX Hybrid funktioniert jetzt
- (PLCHome) Falls unterschiedliche Wechselrichter vorhanden sind, werden diese nun angezeigt

## 2.0.0 (06.10.2022)
- (PLCHome) Datenlogger-Einstellungen können aufgerufen und geändert werden.
- (PLCHome) Die Server-URL kann geändert werden.

## 1.2.1 (21.09.2022)
- (PLCHome) Offset zu numerischen Werten hinzugefügt. Mein Wechselrichter hat die Gesamtmenge selbstständig zurückgesetzt. Jetzt kann die Gesamtmenge korrigiert werden.

## 1.1.19 (30.08.2022)
- (PLCHome) HTML-Header

## 1.1.17 (10.08.2022)
- (PLCHome) JSON Loopkiller

## 1.1.16 (10.08.2022)
- (PLCHome) https RejectUnauthorized false

## 1.1.15 (28.04.2022)
- (PLCHome) Apple-Geräte können die Konfigurationsseite des Adapters nicht mit Safari öffnen, alle Werte sind leer

## 1.1.14 (26.04.2022)
- (PLCHome) Schleife bei Ausnahme neu starten

## 1.1.13 (08.04.2022)
- (PLCHome) Gesamtdaten und Historiendaten fehlen für Typ Inv

## 1.1.12 (06.04.2022)
- (PLCHome) API-Wartung

## 1.1.11 (02.04.2022)
- (PLCHome) korrigierte Readme-Datei
- (PLCHome) feste Version

## 1.1.10 (02.04.2022)
- (PLCHome) hat die Warnung zum ersten Mal unterdrückt: /error.do?errorMess=errorNoLogin

## 1.1.9 (27.03.2022)
- (PLCHome) Machen Sie die Quelle etwas hübscher
- (PLCHome) Verschönern Sie die Readme-Datei
- (PLCHome) Test und Freigabe hinzugefügt
- (PLCHome) Verbesserung: i in der inneren und äußeren Schleife verwendet
- (PLCHome) Verbesserung ausgelöst durch „Sentry“-Probleme: undefiniertes Objekt
- (PLCHome) Verbesserung: Keine Verbindung zu „Sentry“

## 1.1.8 (16.03.2022)
- (PLCHome) Verbesserung, ausgelöst durch „Sentry“-Probleme

## 1.1.7 (13.02.2022)
- (PLCHome) „Sentry“ wurde hinzugefügt

## 1.1.6 (12.02.2022)
- (PLCHome) Lies mich

## 1.1.2 (12.02.2022)
- (PLCHome) Timeouts wartbar gemacht und angepasst. Das Anfrage-Timeout beträgt jetzt 60 Sekunden wie bei Chrome
- (PLCHome) Serveranfrage verbessert und zusätzlich gegen Aussterben gesichert
- (PLCHome) Berechnet den Ruhezustand bis zur nächsten Anforderung, um den Zyklus aufrechtzuerhalten. Der Mindestschlaf beträgt 100 ms
- (PLCHome) Fehlerausgabe: Wenn der Schlüssel abgelaufen ist, werden Anfragen mit einem Fehlercode weitergeleitet, der nun im Protokoll steht
- (PLCHome) Verbesserte Fehlerbehandlung
- (PLCHome) Verbessertes Debugging
- (PLCHome) Aktualisieren Sie die Includes

## 1.1.1 (27.05.2021)
- (PLCHome) Das Zeitlimit für Webanfragen wurde aufgrund von Anmeldeproblemen erhöht

## 1.1.0 (24.05.2021)
- (PLCHome) Verbesserung der Verbindung über Axios Session

## 1.0.1 (05.03.2021)
- (PLCHome) Es werden doppelte Schlüssel übertragen, ich versuche sie herauszufiltern.

## 1.0.0 (24.02.2021)
- (PLCHome) Lies mich
- (PLCHome) Fix: Erstellen Sie ein Datum aus der Zeit- oder Kalenderstruktur für die letzten Verlaufsdaten für alle Geräte, die manchmal nicht funktionieren

## 0.0.20 (09.02.2021)
- (PLCHome) Erstellen Sie ein Datum aus der Zeit- oder Kalenderstruktur für die letzten Verlaufsdaten für alle Geräte

## 0.0.19 (05.02.2021)
- (PLCHome) Die Daten aus dem Diagramm werden entfernt. Diese waren nur im 5-Minuten-Raster verfügbar. Die Leistung kann nun über die Historie abgefragt werden.
- (PLCHome) Objekte nicht ausgewählter Datenbereiche werden jetzt gelöscht.
- (PLCHome) Sie können Objekte auswählen, die ignoriert oder gelöscht werden sollen.
- (PLCHome) Ein Link zur Growatt-Seite wurde hinzugefügt, sodass der Adapter nun auch in der Übersicht erscheint.
- (PLCHome) Vor kurzem hat Growatt die Schreibweise von Werten geändert, wobei es sich bei den Buchstaben um Groß- und Kleinbuchstaben handelt. Aus diesem Grund werden die Objekte nun intern case-insensitiv behandelt. Sollte nach dem Update beim Start eine Warnung ins Log geschrieben werden, müssen Sie eines der beiden Objekte löschen. Sollte nach dem Update beim Start eine Warnung ins Log geschrieben werden, müssen Sie eines der beiden Objekte löschen. Und starten Sie dann den Adapter neu, damit er definitiv das verbleibende Objekt zum Speichern des Werts verwendet.

## 0.0.18 (23.01.2021)
- (PLCHome) falsche Versionsinformationen.

## 0.0.17 (21.01.2021)
- (PLCHome) behebt ein Datumsproblem in den Verlaufsdaten des Wechselrichters.

## 0.0.16 (20.01.2021)
- (PLCHome) npm-Paketversionsaktualisierung
- (PLCHome) Letzte Historie für alle Anlagen hinzufügen. Besonderer Dank geht an magix für den Schlüssel, damit ich die Wechselrichter-History-Funktion testen kann.

## 0.0.15 (04.12.2020)
- (PLCHome) npm-Paketversionsaktualisierung

## 0.0.14 (01.12.2020)
– (PLCHome) Verbesserung für Objekte, die nicht von der Growatt-Website zurückgegeben werden

## 0.0.12 (27.11.2020)
– (PLCHome) falsche Initialisierung für Shared Key: String statt Boolean

## 0.0.11 (27.11.2020)
- (PLCHome) Lies mich

## 0.0.10 (26.11.2020)
- (PLCHome) Anmeldung mit gemeinsamem Schlüssel
- (PLCHome) Letzter Wert des Diagramms, wenn keine Live-Daten vorhanden sind.
- (PLCHome) Änderung des Abfrageintervalls

## 0.0.9 (05.10.2020)
- (PLCHome) korrigiert keine Funktion „ADAPTER_AUTO_DECRYPT_NATIVE“

## 0.0.8 (05.10.2020)
- (PLCHome) io-Paket reparieren

## 0.0.7 (05.10.2020)
- (PLCHome) mit „@iobroker/adapter-core“: „^2.4.0“, die js-controller-Abhängigkeit muss >=2.0.0 sein!
– (PLCHome) io-package native definiert 5 Werte, Admin legt 7 fest
- (PLCHome) Passwort verschlüsselt speichern

## 0.0.6 (31.08.2020)
- (PLCHome)-Übersetzung mit dem ioBroker-Tool.

## 0,0,5
- (PLCHome) Erstveröffentlichung.

## 0.0.1
- (PLCHome) Erstveröffentlichung.

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

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