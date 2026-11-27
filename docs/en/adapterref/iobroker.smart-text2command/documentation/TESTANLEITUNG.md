---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# Testanleitung ohne echte Geräte

Diese Anleitung erstellt virtuelle Datenpunkte unter `0_userdata.0`.
Die Werte werden nur in ioBroker gespeichert; es wird keine Hardware geschaltet.
Für den Test werden die Geräte und **jede Aktion** anschließend im Admin
von `smart-text2command.0` freigegeben.

## 1. Räume und Funktionen anlegen

In ioBroker Admin unter **Aufzählungen** (Enums) die Räume **Wohnzimmer** und
**Schlafzimmer** sowie die Funktionen **Licht** und **Heizung** anlegen.
Die automatisch erzeugten IDs sollten `enum.rooms.wohnzimmer`,
`enum.rooms.schlafzimmer`, `enum.functions.licht` und `enum.functions.heizung`
sein. Wenn Admin andere IDs vergibt, diese für die Raumabfrage merken: Der
Adapter wertet den letzten Teil der Raum-ID aus.

## 2. Testobjekte anlegen

Unter **Objekte → 0_userdata.0** vier Kanäle erstellen. Die Kanalnamen sind die
späteren Gerätenamen im Adapter. Darunter die folgenden States anlegen. `read` und
`write` sind Metadaten des States; sie müssen nach dem Setzen des Anfangswerts
wie in der Tabelle stehen bleiben.

Im ioBroker-Objekteditor kann das Feld **Gerät** bei diesen States leer bleiben:
Es wurden Kanäle, aber keine übergeordneten Objekte vom Typ `device` angelegt.
`smart-text2command` verwendet den nächstgelegenen Kanal als Gerät und übernimmt
dessen Name und Raumzuordnung.

| Kanal-ID unter `0_userdata.0` | Kanalname        | State-ID     | Rolle               | Typ     | read | write | Min | Max | Einheit | Anfangswert |
| ----------------------------- | ---------------- | ------------ | ------------------- | ------- | ---- | ----- | --: | --: | ------- | ----------- |
| `test_lampe_wohnzimmer`       | Lampe            | `POWER`      | `switch`            | boolean | ja   | ja    |   – |   – | –       | `false`     |
| `test_lampe_wohnzimmer`       | Lampe            | `HELLIGKEIT` | `level.brightness`  | number  | ja   | ja    |   0 | 100 | `%`     | `50`        |
| `test_lampe_schlafzimmer`     | Lampe            | `POWER`      | `switch`            | boolean | ja   | ja    |   – |   – | –       | `false`     |
| `test_heizung_wohnzimmer`     | Heizung          | `SOLL`       | `level.temperature` | number  | ja   | ja    |   5 |  30 | `°C`    | `21`        |
| `test_heizung_wohnzimmer`     | Heizung          | `IST`        | `value.temperature` | number  | ja   | nein  |   – |   – | `°C`    | `20`        |
| `test_sensor_schlafzimmer`    | Temperatursensor | `IST`        | `value.temperature` | number  | ja   | nein  |   – |   – | `°C`    | `19`        |

Beispiel einer vollständigen State-ID: `0_userdata.0.test_lampe_wohnzimmer.POWER`.
Die Rollen `level.dimmer` und `level.temperature.setpoint` müssen für diese
Anleitung nicht im Admin-Auswahlfeld vorhanden sein. `level.brightness` ist eine
unterstützte Alternative für den Dimmer; `level.temperature` bezeichnet den
schreibbaren Sollwert und `value.temperature` den Messwert.

Für die beiden **IST**-States kann es nötig sein, `write` vorübergehend zu
aktivieren, um im Admin einen Anfangswert einzutragen. Danach `write` wieder
auf **nein** setzen. Bei **POWER**, **HELLIGKEIT** und **SOLL** muss `write`
dauerhaft **ja** bleiben, sonst erkennt der Adapter keine schreibbare Aktion.
Eine Änderung von `write` nach der Freigabe ändert den Capability-Fingerprint
und erfordert eine erneute Freigabe.

## 3. Kanäle zuordnen

Die Kanäle (nicht nur einzelne States) in Admin den Aufzählungen zuordnen:

| Kanal                      | Raum         | Funktion |
| -------------------------- | ------------ | -------- |
| `test_lampe_wohnzimmer`    | Wohnzimmer   | Licht    |
| `test_lampe_schlafzimmer`  | Schlafzimmer | Licht    |
| `test_heizung_wohnzimmer`  | Wohnzimmer   | Heizung  |
| `test_sensor_schlafzimmer` | Schlafzimmer | Heizung  |

Die zwei Kanäle mit dem Namen **Lampe** sind absichtlich gleich benannt. Damit
lassen sich Rückfragen und die Raumzuordnung testen.

## 4. Adapter starten und Freigaben setzen

`smart-text2command.0` starten. Im Adapter-Admin unter **Geräte** prüfen, ob die
vier Kanäle mit ihren States erscheinen. Bei **jedem** gewünschten Gerät den
Schalter **Aktiv** einschalten und die konkreten Aktionen einzeln freigeben.
Eine Aktionsfreigabe allein aktiviert das Gerät nicht:

| Gerät                         | Freigaben                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| Lampe Wohnzimmer              | `turnOn`, `turnOff`, `getState` für `POWER`; `setValue`, `getValue` für `HELLIGKEIT` |
| Lampe Schlafzimmer            | `turnOn`, `turnOff`, `getState` für `POWER`                                          |
| Heizung Wohnzimmer            | `setValue` für `SOLL`; `getValue` für `IST`                                          |
| Temperatursensor Schlafzimmer | `getValue` für `IST`                                                                 |

Vor der Freigabe im Dialog Ziel-State, Rolle, Datentyp, Wertebereich und
Lese-/Schreibbarkeit prüfen. Falls ein State nach einer Metadatenänderung
`needsReview` zeigt, die betroffene Aktion erneut prüfen und freigeben.

Im Geräte-Tab zeigen die Raum- und Funktionsfilter die Namen der
ioBroker-Aufzählungen an. Hinter dem Gerätenamen steht die technische Geräte-ID
in Klammern. Jede Gerätekarte trennt Aliase von Aktionsfreigaben. Aliase stehen
in einer zweispaltigen Tabelle mit Sprachwahl und Eingabefeld; mit dem Plus kann
eine weitere unterstützte Sprache ergänzt werden.

Jede Gerätekarte lässt sich über den Pfeil am Kartenkopf einzeln auf- und
zuklappen. **Alle aufklappen/Alle zuklappen** steuert die gesamte gefilterte
Geräteliste, auch über mehrere Seiten hinweg.

Für die Formulierung **„könntest du freundlicherweise die Leuchte im Wohnzimmer
deaktivieren“** bei beiden Lampen den deutschen Alias `Leuchte` eintragen und
speichern. Der Raum unterscheidet die Geräte. Ohne Raum fragt der Adapter bei
mehreren passenden Räumen zuerst nach dem Raum. Die Aktion `turnOff` muss für
die jeweilige Lampe freigegeben und das Gerät aktiv sein.

Die Sammelaktionen verwenden ein Auge für Lesen, einen Stift für Schreiben und
beide Symbole für die Kombination. Grün öffnet die Freigabe, grau mit rotem
Verbotssymbol die Rücknahme. Beide Wege zeigen eine Prüfliste der betroffenen
Aktionen und Ziel-States; einzelne Einträge können abgewählt werden. Der Schalter
**Aktiv** bleibt eine eigene Entscheidung.

Die Filter für Raum und ioBroker-Funktion enthalten **Ohne** für Geräte ohne
entsprechende Zuordnung. Geräte ohne unterstützte Capability werden im Tab
**Geräte** ausgeblendet und nicht mitgezählt. **Geräte neu einlesen** fragt die
aktuellen ioBroker-Objekte erneut ab. Fehlende Objekte verschwinden danach aus
der Ansicht. Alte Freigaben bleiben gespeichert, können ohne den zugehörigen
State aber nicht ausgeführt werden und lösen allein keine Änderungswarnung aus.
Die kompakten Aktionschips zeigen mit einem Plus eine offene Freigabe und mit
einem Haken eine freigegebene Aktion; Anklicken öffnet die Prüfung beziehungsweise
widerruft die Freigabe. Für diesen Test müssen keine Datenpunkte gelöscht werden.

## 5. Im Testlabor prüfen

Warten, bis `smart-text2command.0.info.modelStatus` **ready** meldet.
Im **Testlabor** zuerst **Analysieren** verwenden; **Ausführen** schreibt bei
freigegebener Aktion tatsächlich in den virtuellen State.

| Eingabe                                           | Erwartung                                                                                                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Schalte die Lampe im Wohnzimmer ein`             | `POWER` der Wohnzimmerlampe wird `true`                                                                                                                                                 |
| `Schalte die Lampe aus`                           | Rückfrage nach dem Raum, weil zwei freigegebene Lampen in verschiedenen Räumen passen.                                                                                                  |
| `Dimme die Lampe im Wohnzimmer auf 40 Prozent`    | `HELLIGKEIT` wird `40`                                                                                                                                                                  |
| `Stelle die Heizung im Wohnzimmer auf 22 Grad`    | `SOLL` wird `22`                                                                                                                                                                        |
| `Stelle im Wohnzimmer die Temperatur auf 25 Grad` | Bei genau einem freigegebenen Temperaturziel wird `SOLL` auf `25` gesetzt; bei mehreren folgt eine Geräterückfrage.                                                                     |
| `Schreibe im Wohnzimmer die Solltemperatur`       | Rückfrage nach dem fehlenden Wert; nach `21 Grad` wird nur `SOLL` geschrieben.                                                                                                          |
| `Wie warm ist es im Wohnzimmer`                   | Analyse plant das Lesen von `IST` der Heizung; die Helligkeit der Lampe zählt nicht als Temperaturwert.                                                                                 |
| `Welche Temperatur hat die Heizung im Wohnzimmer` | Analyse erkennt `device.getValue` und plant das Lesen von `IST` der Heizung.                                                                                                            |
| `Wie warm ist es im Schlafzimmer`                 | Analyse plant das Lesen von `IST`; Ausführen liefert den Messwert. Bei mehreren passenden Lesegeräten folgt eine Rückfrage.                                                             |
| `Wie hell ist die Lampe im Schlafzimmer`          | `device.getValue`; mit den obigen Testdaten: „Ich kenne das Gerät in diesem Raum nicht.“, weil die Schlafzimmerlampe nur `POWER` besitzt. Es wird kein Wert aus dem Wohnzimmer gelesen. |
| `Schalte die Lampe im Kinderzimmer ein`           | „Ich kenne den Raum nicht.“, solange kein Raum `Kinderzimmer` angelegt ist.                                                                                                             |

Die NLP-Erkennung und die Geräteauflösung können bei einzelnen Formulierungen
Rückfragen auslösen. Im Testlabor die erkannten Intents, Gerätekandidaten und
den geplanten State-Zugriff prüfen. Für einen eindeutigen Lesetest kann auch
`Welchen Wert hat der Temperatursensor` verwendet werden.

Das Testlabor speichert seine Sessions im Datenverzeichnis der Adapterinstanz.
Über **Session-Historie** lassen sich auch nach einem Neuladen der Admin-Seite
frühere Gespräche öffnen. Für jede Nachricht kann die damalige technische Antwort
einschließlich Intent, Funktions- und Datenpunktdiagnose sowie geplantem Zugriff
angezeigt werden. **Neue Session** beginnt ein separates Gespräch; eine ausgewählte
historische Session kann gelöscht werden. Die Historie ist nur für Admin-Aufrufe
zugänglich und auf die letzten 30 Sessions mit jeweils 50 Anfragen begrenzt.
Aufrufe über die allgemeine `processText`-API anderer Adapter werden nicht in
die Testlabor-Historie aufgenommen.

Für einen erfolgreichen Helligkeitslesetest `Wie hell ist die Lampe im Wohnzimmer`
verwenden. Soll die Schlafzimmerlampe ebenfalls einen Helligkeitswert liefern,
dort einen lesbaren State mit Rolle `level.brightness` ergänzen,
**Geräte neu einlesen** und `getValue` für diesen State freigeben.

Die mitgelieferten Trainingssätze enthalten Schreibbefehle für Solltemperaturen
auf Deutsch und Englisch, auch ohne Zahlenwert. Nach einem Adapter-Neustart wird
ein vorhandenes Modell neu trainiert, wenn sich die Trainingssätze geändert haben.
Erst bei `info.modelStatus = ready` erneut testen.

Ein `0_userdata.0`-State simuliert nur den ioBroker-Datenpunkt. Dieser Test
bestätigt Erkennung, Freigabe und State-Zugriff; ein echter Geräteadapter muss
später separat getestet werden.

## 6. Rollladen im Wohnzimmer testen

Unter **Objekte → 0_userdata.0** einen weiteren Kanal `test_rollladen_wohnzimmer`
mit dem Namen **Rollladen** anlegen. Den **Kanal** dem Raum **Wohnzimmer** und
einer neuen Funktion **Beschattung** zuordnen. Die folgenden States darunter anlegen:

| State-ID        | Rolle         | Typ    | read | write | Min | Max | Einheit | Anfangswert |
| --------------- | ------------- | ------ | ---- | ----- | --: | --: | ------- | ----------- |
| `POSITION_SOLL` | `level.blind` | number | ja   | ja    |   0 | 100 | `%`     | `50`        |
| `POSITION_IST`  | `value.blind` | number | ja   | nein  |   0 | 100 | `%`     | `50`        |
| `LAMELLEN_SOLL` | `level.tilt`  | number | ja   | ja    |   0 | 100 | `%`     | `50`        |
| `LAMELLEN_IST`  | `value.tilt`  | number | ja   | nein  |   0 | 100 | `%`     | `50`        |

Eine vollständige ID lautet beispielsweise `0_userdata.0.test_rollladen_wohnzimmer.POSITION_SOLL`.
Für diese Rollen bedeutet `0 %` geschlossen beziehungsweise unten und `100 %`
vollständig geöffnet beziehungsweise oben. **Hochfahren** entspricht
somit `100 %`, **Herunterfahren** `0 %`; `25 %` und `75 %` sind direkte
Zielpositionen. Die Lamellenposition hat ihren eigenen Soll- und Istwert.

In der Geräteansicht zeigt der Adapter für jede Capability zuerst den im State
unter `common.name` eingetragenen Namen. Fehlt er, erscheint der letzte Teil der
State-ID, zum Beispiel `POSITION_SOLL`. Über diesen Namen kann die Funktion im
Testlabor angesprochen werden. Der Capability-Filter zeigt gleiche Namen nur
einmal; ein geänderter State-Name allein widerruft keine Aktionsfreigabe.

Falls Admin für einen **IST**-State keinen Anfangswert bei `write = nein` zulässt,
`write` kurzzeitig aktivieren, den Wert setzen und anschließend wieder auf **nein**
stellen. Bei den **SOLL**-States bleibt `write = ja`. Ein Schreibzugriff auf
`POSITION_SOLL` oder `LAMELLEN_SOLL` verändert die zugehörigen **IST**-States in
`0_userdata.0` nicht automatisch. Zum Simulieren einer Bewegung die Istwerte später
manuell ändern oder ein eigenes Testskript verwenden.

Optional lassen sich drei Taster für getrennte Fahrbefehle ergänzen:

| State-ID | Rolle                | Typ     | read | write | Befehl                |
| -------- | -------------------- | ------- | ---- | ----- | --------------------- |
| `AUF`    | `button.open.blind`  | boolean | nein | ja    | `true` fährt hoch     |
| `AB`     | `button.close.blind` | boolean | nein | ja    | `true` fährt herunter |
| `STOP`   | `button.stop.blind`  | boolean | nein | ja    | `true` stoppt         |

Diese Taster benötigen keinen Anfangswert. Auch sie bewegen in `0_userdata.0`
keinen Rollladen und ändern keinen Istwert. Die Rollen und ihre Bedeutung sind
in den [ioBroker-State-Rollen](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md)
beschrieben.

Nach dem erneuten Einlesen für `AUF`, `AB` und `STOP` jeweils die Aktion `press`
freigeben. Im Testlabor etwa `Drücke AUF am Rollladen im Wohnzimmer`, `Betätige
die Taste AB am Rollladen im Wohnzimmer` und `Drücke STOP am Rollladen im Wohnzimmer
` testen. Im Modus **Ausführen** wird jeweils `true` auf den gewählten
Taster geschrieben. `
Aktiviere die Taste AUF am Rollladen im Wohnzimmer` ist ebenfalls möglich. Bei
einem benannten Gerät mit genau einem freigegebenen Taster kann auch
`Schalte <Gerät> im <Raum>` diesen Taster auslösen. Bei mehreren passenden Tastern
folgt eine Rückfrage. Ein Button besitzt keine getrennten Ein- und Ausschaltaktionen
und keinen lesbaren Schaltzustand; ausdrücklich `ein` oder `aus` wird daher nicht
als Tastendruck behandelt.

Nach **Geräte neu einlesen** sollte der Rollladen im Geräte-Tab erscheinen. Das
Gerät aktivieren und `setValue` für `POSITION_SOLL` und `LAMELLEN_SOLL` sowie
`getValue` für `POSITION_IST` und `LAMELLEN_IST` freigeben. Im Testlabor dann
`Stelle den Rollladen im Wohnzimmer auf 25 Prozent`, `Stelle die Lamellen im
Wohnzimmer auf 75 Prozent`, `Welche Position hat der Rollladen im Wohnzimmer
` und `Wie stehen die Lamellen im Wohnzimmer` prüfen. Die Schreibbefehle ändern
nur die Soll-States; für eine geänderte Leseantwort die Istwerte manuell setzen.

Die Rollen `value.*` und `level.*` legen allein keine Zugriffsrechte fest. Der
Adapter nutzt `common.read` und `common.write`; ein lesbarer und schreibbarer
`value.blind`-State kann nach Freigabe sowohl `getValue` als auch `setValue`
anbieten. Semantische Fahrbefehle wie „Fahre hoch“ und „Fahre runter“ sind noch
nicht implementiert; die Button-Namen `AUF` und `AB` können mit „Drücke“ oder
„Betätige“ angesprochen werden.

Für einen Test mit der ganz allgemeinen Rolle `value` können die vier Zahlen-States
alternativ alle diese Rolle erhalten. Dann jedem State einen unterscheidbaren
Namen wie **Position Soll**, **Position Ist**, **Lamellen Soll** beziehungsweise
**Lamellen Ist** geben. Der Adapter nutzt diese Namen und die State-IDs zur
Funktionsauswahl; wenn er mehrere passende States findet, fragt er nach.
Die Lese- und Schreibrechte sowie die Freigaben bleiben wie oben beschrieben.