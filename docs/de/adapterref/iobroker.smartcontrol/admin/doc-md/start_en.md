---
chapters: {"pages":{"en/adapterref/iobroker.smartcontrol/README.md":{"title":{"en":"ioBroker.smartcontrol"},"content":"en/adapterref/iobroker.smartcontrol/README.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md
title: kein Titel
hash: G3631pt59P+qkYTBWX3b1C+8nN2D20sUwqxoBShMOF8=
---
<!-- Markdown Collapsible Section, see https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">About this adapter</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

In unserer Hausautomation haben wir mehrere **Auslöser** , z. B.

- Bewegungsmelder im Flur löst aus
- Ein Wandschalter wird gedrückt.
- ein bestimmter Zeitpunkt ist erreicht (z. B. 30 Minuten nach Sonnenuntergang oder Montag bis Freitag um 7:00 Uhr)

Darüber hinaus wünschen wir uns oft, dass zusätzliche Bedingungen (nicht) erfüllt sind (z. B. „Heute ist ein Feiertag“, „Das Wohnzimmerfenster ist geöffnet“, „Die Helligkeit beträgt mehr als 100 Lux“ usw.).

Sobald ein Ereignis ausgelöst wird und gegebenenfalls Bedingungen erfüllt sind oder nicht, sollten die Zielzustände (d. h. **die Zielgeräte** ) umgeschaltet werden. Zusätzlich sollte nach Auslösung eines Bewegungsmelders ein Timer starten, der die Zielgeräte nach der festgelegten Anzahl von Sekunden deaktiviert, sobald keine Bewegung mehr erkannt wird.

Smart Control kümmert sich darum und führt alles gemäß IFTTT aus.

Ziel ist es, viele JavaScript- und Blockly-Funktionen zu ersetzen und eine sehr benutzerfreundliche Umgebung für verschiedene Anwendungsfälle bereitzustellen.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">How to start?</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

Sie gehen einfach die einzelnen Optionsseiten (Registerkarten) wie folgt durch:

| Tab                        | Was zu tun                                                                                                                                                                                                                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Zielgeräte              | Hier geben Sie alle zu schaltenden Geräte ein, z. B. Lampen, Radio usw. In der ersten Tabelle können Sie einzelne Gerätezustände eingeben und/oder in der zweiten Tabelle sogenannte Aufzählungen („Enums“) verwenden. [Dokumentationslink: Aufzählungen](https://www.iobroker.net/#en/documentation/admin/enums.md) |
| 2. ZUSÄTZLICHE BEDINGUNGEN | _optional_ : Hier geben Sie zusätzliche Bedingungen ein, die (nicht) gelten sollen, z. B.: niemand anwesend, heute ist Feiertag usw.                                                                                                                                                                                 |
| 3. Auslöser                | Hier geben Sie Auslöser ein, z. B. Bewegungsmelder, Wandschalter usw., sowie zeitabhängige Auslöser (z. B. jeden Tag um 8:00 Uhr).                                                                                                                                                                                   |
| 4 ZONEN                    | Hier bringen Sie alles zusammen, indem Sie alle "Zonen" definieren (z. B. Badezimmer im 1. Stock, Kaffeeecke usw.) und Auslöser und zu schaltende Zielgeräte zuweisen sowie weitere Ausführungsbedingungen festlegen.                                                                                                |
| WEITERE OPTIONEN           | Hier können Sie zusätzliche Adapteroptionen einstellen.                                                                                                                                                                                                                                                              |

### Durch Klicken auf die dunkelblau hervorgehobene Überschrift erhalten Sie weitere Informationen zu den Einstellungen, zum Beispiel:

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_show-explanation.gif?raw=true)

### Hinweis: Dropdown-Felder in Tabellen

Dropdown-Felder mit mehreren auswählbaren Werten müssen seitlich angeklickt werden. Dies ist ein Problem des ioBroker-Admin-Adapters, nicht von Smart Control. [Das Problem wurde im ioBroker-Admin-Adapter gemeldet und behoben](https://github.com/ioBroker/ioBroker.admin/issues/590) und wird mit dem nächsten Update behoben sein.

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_dropdown-ani.gif?raw=true)

<br> Einfache Lösung: Klicken Sie einfach auf den blauen Knopf links daneben, und Sie erhalten einen deutlich besseren Auswahldialog:

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_open-dialog.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Adapter states</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### smartcontrol.x.info.astroTimes

Hier sehen Sie alle aktuellen Astro-Zeiten Ihrer Geokoordinaten, die Sie in den ioBroker-Admin-Optionen (Schraubenschlüssel oben links) festgelegt haben.

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-astro.png?raw=true)

### smartcontrol.x.info.log.zoneActivations.json

Mit<code> smartcontrol.x.info.log.zoneActivations.json</code> Der Adapter stellt einen Status bereit, der nach erfolgreicher Ausführung einer Zone Informationen im JSON-Format liefert (der neueste Eintrag erscheint oben). In den Adapteroptionen unter „WEITERE OPTIONEN“ → „Protokollierung“ können Sie die Anzahl der JSON-Einträge entsprechend anpassen.

### smartcontrol.x.options

Hier können Sie einzelne Zeilen jeder Optionstabelle ein- und ausschalten (Status „aktiv“).<br> Darüber hinaus können Sie die Zeit in Sekunden (Status 'duration') und den Helligkeitsschwellenwert (Status 'briThreshold') für alle Bewegungssensoren ändern.

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-options-motion.png?raw=true)

**Bitte beachten Sie:** Eine Änderung dieser Zustände führt zu einem Neustart der Adapterinstanz, damit die Änderungen wirksam werden können.

### smartcontrol.x.targetDevices

Für jede Tabellenzeile unter „1. ZIELGERÄTE“ fügt der Adapter hier verknüpfte Zustände hinzu. Wenn Sie diese Zustände ändern, wird der ursprüngliche Zielzustand entsprechend geändert und umgekehrt.

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-target-devices.png?raw=true)

### smartcontrol.x.Test

Hier finden Sie Zustände, die ausschließlich zum Testen des Adapters dienen. Diese Zustände bieten keine Funktionen oder Features und werden nur zum Testen des Adapters verwendet. Nach der ersten Installation einer Instanz dieses Adapters sind die Adapteroptionen mit einigen dieser Zustände voreingestellt. Starten Sie beispielsweise den Test, indem Sie einen Triggerzustand aktivieren, z. B. „smartcontrol.0.Test.trigger.Bathroom\_motion“ auf „true“ setzen. Anschließend prüfen Sie, ob etwas ausgelöst wird (basierend auf den Einstellungen in „4. ZONEN“ usw.).<br> Das ioBroker-Protokoll (ioBroker-Admin > Protokoll) enthält detaillierte Informationen. Zur Fehlersuche setzen Sie bitte den Protokollierungsgrad der Adapterinstanz auf „debug“, um weitere Informationen im Protokoll zu erhalten.

![Bild](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-test.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Questions / problems / suggestions for improvement</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### Fragen zur Nutzung usw.

Am besten stellen Sie Ihre Frage im ioBroker-Forum. Erwähnen Sie dabei idealerweise @Mic, damit ich als Entwickler benachrichtigt werde. Den aktuellen Thread zu diesem Adapter finden Sie hier: [ioBroker-Forum: Smart Control](https://forum.iobroker.net/topic/36728/) . Sie können Ihre Frage gerne auf Englisch oder Deutsch verfassen.

### Fehler / Bug

Prüfen Sie zunächst das ioBroker-Protokoll auf alle Hinweise und befolgen Sie diese entsprechend. Wenn Sie sich nicht sicher sind, ob Sie in den Adaptereinstellungen alles korrekt vorgenommen haben, lesen Sie bitte den Abschnitt „ _Fragen zur Verwendung usw.“_ weiter oben.<br> Falls tatsächlich ein Fehler durch diesen Adapter verursacht wird:

1. Gehe zu [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) und erstelle ein neues Issue.
2. Beschreiben Sie das Problem **detailliert** und Schritt für Schritt, was Sie getan haben, als/vor dem Auftreten des Fehlers. Stellen Sie außerdem den Protokollierungsgrad des Adapters auf „Debug“, reproduzieren Sie den Fehler und fügen Sie die Protokollausgabe in Code-Tags im Problembericht ein. ioBroker schneidet Protokollzeilen ab, daher rufen Sie die Protokolldatei bitte direkt auf (durch Klicken auf „Protokoll herunterladen“).
3. Fügen Sie Screenshots hinzu, falls diese für mich als Entwickler hilfreich sein könnten.
4. Fügen Sie die Adapteroptionen hinzu, falls diese für die Fehlersuche hilfreich sein könnten, indem Sie auf den blauen Pfeil nach unten in der oberen rechten Ecke der SmartControl-Adapteroptionen klicken.

### Verbesserungs-/Funktionsanfragen

Eröffnen Sie ein neues GitHub-Issue auf [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) , in Englisch oder Deutsch.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->