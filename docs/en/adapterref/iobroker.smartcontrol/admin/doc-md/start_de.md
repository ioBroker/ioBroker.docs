---
chapters: {"pages":{"en/adapterref/iobroker.smartcontrol/README.md":{"title":{"en":"ioBroker.smartcontrol"},"content":"en/adapterref/iobroker.smartcontrol/README.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md"}}}
---
<!-- Markdown Collapsible Section, see https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab -->
<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Über diesen Adapter</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<br>In unserer Heim-Automation haben wir ja diverse **Auslöser**, z.B.
 * Bewegungsmelder im Flur löst aus, 
 * ein Wandschalter wird gedrückt, 
 * eine bestimmte Zeit tritt ein (etwa 30 Minuten nach Sonnenuntergang oder Mo-Fr um 7:00)

Gleichzeitig möchten wir oftmals, dass dabei zusätzliche Bedingungen (nicht) zutreffen (z.B. 'Heute ist Feiertag', 'Wohnzimmer-Fenster ist offen', Helligkeit ist größer 100 Lux, etc.).

Sobald also was auslöst, und optional Bedingungen zutreffen oder nicht zutreffen, sollen Ziel-Datenpunkte (d.h. **Zielgeräte**) geschaltet werden.
Außerdem soll etwa nach ausgelöstem Bewegungungsmelder ein Timer laufen, der (sobald keine Bewegung mehr) nach der eingestellten Anzahl Sekunden die Zielgeräte wieder abschaltet.

Smart Control kümmert sich entsprechend darum und führt alles gemäß IFTTT aus.

Ziel ist, hiermit viele JavaScripts und Blockly abzulösen und eine sehr anwenderfreundliche Möglichkeit für diverse Szenarien zu bieten.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Wie am besten starten?</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<br>Du gehst einfach durch die einzelnen Options-Seiten (obige Reiter) wie folgt durch:

| Reiter | Was machen |
|--------|------------|
|1. ZIELGERÄTE | Hier trägst du all deine zu schaltenden Ziel-Geräte ein, also Lichter, Radio, usw. Du kannst dort in der ersten Tabelle einzelne Geräte anlegen, und/oder in der zweiten Tabelle auch sogenannte "Aufzählungen" (Enums) nutzen. [Link zur Dokumentation: Aufzählungen](https://www.iobroker.net/#de/documentation/admin/enums.md) |
|2. ZUSÄTZLICHE BEDINGUNGEN | *Optional*: Hier trägst du zusätzliche Bedingungen ein, die (nicht) zutreffen sollen, z.B.: keiner anwesend, Feiertag heute, usw. |
|3. AUSLÖSER |Hier trägst du Auslöser ein, also z.B. Bewegungsmelder, Wandschalter, etc., sowie ggf. zeitabhängige Auslöser (z.B. jeden Tag um 8:00 Uhr). |
|4. ZONEN |Hier führst du alles zusammen, in dem du alle "Zonen" definierst (z.B. Badezimmer 1.OG, Kaffeeecke, usw.) und Auslöser und zu schaltende Zielgeräte zuweist, sowie auch weitere Bedingungen zur Ausführung definierst. |
| WEITERE OPTIONEN | Hier kannst du weitere Adapter-Optionen einstellen. |

### Durch Klicken auf die jeweils dunkelblau hinterlegte Überschrift erhältst du weitere Infos zu den Einstellungungen, Beispiel:

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_show-explanation.gif?raw=true)



### Hinweis: Auswahl-Felder (Drop-Down) in Tabellen

Auswahlfelder (Drop-Down-Menüs), die mehrere selektierbare Werte bieten, müssen "an der Seite" angeklickt werden. Dies ist ein Issue des ioBroker-Admin-Adapters, und nicht von Smart Control. [Das Issue ist gemeldet und adressiert](https://github.com/ioBroker/ioBroker.admin/issues/590) im ioBroker Admin Adapter, und wird mit dem nächsten Update kommen.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_dropdown-ani.gif?raw=true)


<br>Einfache Abhilfe: Klicke einfach auf den blauen Button links daneben, dann bekommst du einen viel besseren Auswahl-Dialog:

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_open-dialog.png?raw=true)


</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Adapter-Datenpunkte</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### smartcontrol.x.info.astroTimes

Hier findest du alle aktuellen Astrozeiten deiner Geo-Koordinaten, die du in den ioBroker-Admin-Optionen (Schraubschlüssel oben links) eingestellt hast.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-astro.png?raw=true)

### smartcontrol.x.info.log.zoneActivations.json

Mit `smartcontrol.x.info.log.zoneActivations.json` stellt der Adapter einen Datenpunkt bereit, der, sobald eine Zone erfolgreich ausgeführt wurde, Informationen hierzu als JSON zur Verfügung stellt (dabei erscheint der neueste Eintrag jeweils oben). In den Adapter-Optionen, im Reiter "WEITERE OPTIONEN", kannst du unter "Logging" die Anzahl der JSON-Einträge einstellen.

### smartcontrol.x.options

Hier kannst du für jede Optionen-Tabelle einzelne Zeilen an- und abschalten (Datenpunkt `active`).
<br>Zudem kannst du für alle Bewegungsmelder die Zeit in Sekunden (Datenpunkt `duration`) und die Grenze für die Helligkeit (Datenpunkt `briThreshold`) ändern.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-options-motion.png?raw=true)


**Bitte beachten:** Eine Änderung dieser Datenpunkte bewirkt einen Neustart der Adapter-Instanz, damit die Änderungen greifen können.

### smartcontrol.x.targetDevices

Für jede Tabellenzeile unter "1. ZIELGERÄTE" fügt der Adapter hier verknüpfte Datenpunkte hinzu. Wenn du diese Datenpunkte änderst, wird der ursprüngliche Ziel-Datenpunkt entsprechend geändert, und umgekehrt.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-target-devices.png?raw=true)


### smartcontrol.x.Test

Hier stehen dir Datenpunkte rein zum Testen des Adapters zur Verfügung. Diese Datenpunkte stellen keinerlei Funktionen oder Features zur Verfügung und dienen eben nur zum Testen dieses Adapters. Nach der ersten Installation einer Instanz dieses Adapters sind die Adapteroptionen mit einigen dieser Datenpunkte vorbelegt. Beginne z.B. mit dem Testen, indem du z.B. einen Auslöser-Datenpunkt aktivierst, also z.B. `smartcontrol.0.Test.trigger.Bathroom_motion` auf `true` setzt. Dann prüfst du, ob etwas ausgelöst wird (basierend auf den Einstellungen in "4. ZONEN" etc.).
<br>Das ioBroker-Log (ioBroker Admin > Log) liefert detaillierte Informationen. Für das Debugging setzt du bitte den Log-Level der Adapterinstanz auf 'debug', damit du viel mehr Informationen im Log erhältst.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-test.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Fragen / Probleme / Verbesserungsvorschläge</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### Fragen zur Bedienung, etc.

Frage am besten im ioBroker-Forum, idealerweise referenzierst du @Mic so dass ich als Entwickler eine Meldung bekomme. Aktueller Forum-Thread für diesen Adapter ist hier: [ioBroker-Forum: Smart Control](https://forum.iobroker.net/topic/36728/).

### Fehler / Bug

Prüfe zunächst das ioBroker Log auf sämtliche Hinweise und gehe diesen entsprechend nach. Falls du nicht sicher bist, ob du alles richtig gemacht hast in den Adapter-Einstellungen, siehe oben -> *Fragen zur Bedienung, etc.*. 
<br>Falls du wirklich einen durch diesen Adapter verursachten Fehler hast:
1. Gehe zu [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) und erstelle ein neues Issue. 
2. Beschreibe **ausführlich** die Problematik und Schritt für Schritt, was du getan hast als/bevor der Fehler auftrat. Setze außerdem das Log Level des Adapters auf "Debug", reproduziere den Fehler und stelle die Logausgabe in Code-Tags im Issue ein. ioBroker schneidet Log-Zeilen ab, daher gehst du dazu bitte direkt ins Logfile (durch Klicken auf "Download Log"). 
3. Füge Screenshots hinzu, soweit möglicherweise hilfreich für mich als Entwickler
4. Füge den Adapter-Optionen-Export hinzu, sofern möglicherweise sinnvoll zur Fehlersuche für mich: Ganz oben rechts in den SmartControl-Adapter-Optionen den blauen Button "Pfeil nach unten" anklicken.

### Erweiterungungswunsch (neues Feature)

Mach am besten ein neues Github-Issue auf unter [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues), in Deutsch oder Englisch. Wenn Deutsch deine Muttersprache ist, dann schreibe auch bitte in Deutsch und nicht Englisch auf Github. Das macht unsere Kommunikation deutlich einfacher und du brauchst dir keinen abbrechen :-) Nicht deutsch sprechende User können das dennoch dank Google Translate o.ä. super mitlesen und sich einbringen.


</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->