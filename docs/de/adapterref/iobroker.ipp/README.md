---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ipp/README.md
title: ioBroker Internet Printing Protocol
hash: PjVqH5+X037kpTEnqw4SxSnl9LKebt524OVGM2mK1fg=
---
# ioBroker Internet Printing Protocol

![NPM-Version](https://img.shields.io/npm/v/iobroker.ipp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ipp.svg)

![Illustration zur Netzwerkdruckerüberwachung](../../../en/adapterref/iobroker.ipp/admin/ipp-banner.jpg)

## ioBroker Internet Printing Protocol Adapter

Der Adapter fragt konfigurierte Netzwerkdrucker mithilfe des Internet Printing Protocol (IPP) ab und veröffentlicht Informationen zur Verfügbarkeit (schreibgeschützt), zum Druckerstatus, zum Toner- oder Tintenstand sowie zu unterstützten Seitenzählern. Er verwendet `Get-Printer-Attributes` Die Kompatibilität basiert auf IPP/2.0; die Geräte- und Firmware-Unterstützung variiert, daher werden optionale Attribute möglicherweise nicht von allen Druckern gemeldet. Die Kompatibilität hängt von der IPP-Implementierung des jeweiligen Druckers ab; es wurde kein bestimmtes Gerät hinsichtlich dieser Implementierung getestet.

Für das Protokollmodell und die Attributdefinitionen siehe [RFC 8011](https://www.rfc-editor.org/rfc/rfc8011.html) .

Es werden Node.js 22 oder neuer, Admin 8.2.0 oder neuer und js-controller 7.2.2 oder neuer benötigt.

## Konfiguration

Konfigurieren Sie das Abfrageintervall und das Anforderungstimeout oben auf der Adapterkonfigurationsseite. Fügen Sie Drucker unten mithilfe des Geräte-Managers hinzu und verwalten Sie diese. Verwenden Sie die Aktionen **„Drucker hinzufügen“** , **„Bearbeiten** “ und „ **Entfernen** “. Die Druckerkarten zeigen den konfigurierten Host, den aktuellen Verbindungsstatus und das Modell an, sobald diese gemeldet werden. Beim Entfernen eines Druckers oder bei der Bereinigung älterer Systeme behält der Adapter einen Objekt-Unterbaum bei, falls ein untergeordnetes Element einen bestimmten Status aufweist. `common.custom` Einstellungen und Protokolle geben eine Warnung aus. Ein entfernter Drucker wird nicht mehr abgefragt, daher können gespeicherte Werte veralten. Nach dem Übertragen oder Entfernen der benutzerdefinierten Einstellungen sollten die gespeicherten Objekte bei Bedarf manuell gelöscht werden.

Druckerkonfigurationen werden pro Adapterinstanz in einem gesicherten Dateispeicher abgelegt (zum Beispiel unter `ipp.0/printer-config.json` Daher können durch das Speichern anderer Instanzeinstellungen im Adminbereich gleichzeitig vorgenommene Änderungen im Geräte-Manager nicht überschrieben werden. `native.printers` Konfigurationen und instanzspezifische Legacy-Konfigurationen werden gespeichert unter `ipp.0.info.printerConfig/printers.json` werden beim ersten Start automatisch migriert. Die vorherigen Daten wurden gemeinsam genutzt. `ipp/printer-config.json` Die Datei wird nicht automatisch migriert, da die zugehörige Instanz nicht sicher ermittelt werden kann. Stellen Sie die Druckerliste über den Geräte-Manager der entsprechenden Instanz wieder her. Vorhandene Drucker mit der alten ID `info` bleiben unabhängig von der Groß- und Kleinschreibung verwendbar; neue Drucker können nicht verwenden `info` in jeder Groß- und Kleinschreibung.

| Einstellung               | Beschreibung                                                                                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUSWEIS                   | Stabiler Objektbaumbezeichner; verwenden Sie 1-32 Buchstaben, Ziffern, Unterstriche oder Bindestriche. Deutsche Umlaute werden transliteriert (`ä` Zu `ae`, `ö` Zu `oe`, `ü` Zu `ue`, `ß` Zu `ss` Die ID kann nach ihrer Erstellung nicht mehr geändert werden, da sie die Status-IDs des Druckers bestimmt. |
| Etikett                   | Anzeigename für den Drucker.                                                                                                                                                                                                                                                                             |
| Gastgeber                 | Drucker-Hostname oder IP-Adresse ohne Schema, Port, Anmeldeinformationen, Pfad, Abfrage, Fragment oder eingebettete Leerzeichen. IPv6-Literale müssen in eckige Klammern gesetzt werden.                                                                                                                 |
| Hafen                     | IPP-Port; Standardwert ist `631` Die                                                                                                                                                                                                                                                                      |
| IPP-Ressourcenpfad        | Absoluter Ressourcenpfad ohne `..`, Leerzeichen, Abfrage oder Fragment; Standardwert ist `/ipp/print` Die                                                                                                                                                                                                 |
| Verwenden Sie TLS         | Verwenden Sie IPPS über TLS.                                                                                                                                                                                                                                                                             |
| TLS-Zertifikat überprüfen | Das TLS-Zertifikat des Druckers überprüfen; standardmäßig deaktiviert für selbstsignierte Druckerzertifikate.                                                                                                                                                                                            |

Das Abfrageintervall ist standardmäßig auf 60 Sekunden eingestellt und kann zwischen 10 Sekunden und 24 Stunden variieren. Das Anfrage-Timeout beträgt standardmäßig 5000 ms und ist auf 500–30000 ms begrenzt; es stellt eine feste Frist für die vollständige Anfrage und Antwort dar, einschließlich langsamer oder unvollständiger Antworten. Der Adapter sendet ausschließlich schreibgeschützte Daten. `Get-Printer-Attributes` Es handelt sich um einen reinen Funktionsmodus; er sendet keine Druckaufträge und ändert keine Druckereinstellungen. Konfigurieren Sie nur Drucker, die einen IPP-Endpunkt am ausgewählten Host, Port und Ressourcenpfad bereitstellen.

Leere Platzhalterzeilen werden beim Start und der Migration ignoriert. Andere ungültige Druckzeilen werden mit einer Warnung übersprungen, die die ungültigen Felder identifiziert. Die Debug-Protokollierung meldet konfigurierte Feldnamen und Werttypen, ohne die konfigurierten Werte auszugeben.

Wenn ein Drucker ausgeschaltet oder vorübergehend nicht erreichbar ist, markiert der Adapter ihn ohne Warnung im Protokoll als offline; Verbindungs- und Timeout-Details sind im Debug-Modus verfügbar. Fehler im IPP-Protokoll, TLS und in der Konfiguration werden weiterhin als Warnungen angezeigt.

## Staaten

Jeder konfigurierte Drucker erhält ein Gerät mit `status`, `supplies`, `counters`, Und `details` Kanäle. Zusätzliche skalare numerische, boolesche und Zeichenketten-IPP-Attribute werden direkt unter erstellt. `details` (Zum Beispiel, `details.printer_up_time` Zeichenkettenwerte werden als Rückgabewerte ausgegeben und können druckerspezifischen Text enthalten. Arrays und strukturierte Werte werden ausgelassen, und Attribute, die bereits durch kanonische Status-, Modell- und Zählerzustände repräsentiert werden, werden nicht dupliziert. Der Adapter fordert alle IPP-Attribute an und erstellt Zustände für zurückgegebene Werte, mit Ausnahme explizit ausgeschlossener Funktionen, ausführlicher Attributfamilien und Rohmarkierungswerte; ausgewählte Funktionen-/Standardattribute bleiben erhalten. Kanonische Attributnamen in Kleinbuchstaben, bestehend aus alphanumerischen Segmenten, die durch einzelne Bindestriche getrennt sind, behalten ihre normalisierten IDs; andere Quellnamen erhalten deterministische Suffixe. Zuvor veröffentlichte IDs können sich ändern, wenn ein Quellname nicht kanonisch war oder die Kollisionsbehandlung ein numerisches Suffix zugewiesen hat; alte Detailzustände werden nach einer erfolgreichen Abfrage gelöscht, sodass Automatisierungen, die diese IDs verwenden, möglicherweise aktualisiert werden müssen. `status.online` ist immer vorhanden; `status.model`, `status.message` und numerische `status.state` werden veröffentlicht, sofern unterstützt. Die vollständige gekürzte Version `printer-make-and-model` Der Wert wird offengelegt als `status.model` Statusmeldungen verwenden englische Bezeichnungen, die von IPP-Grundschlüsselwörtern abgeleitet sind, einschließlich anerkannter `-report`, `-warning`, Und `-error` Suffixe oder aus dem kanonischen Druckerzustand; die vom Gerät bereitgestellte `printer-state-message` wird nicht veröffentlicht. Der Zustandswert ist `0` (`off` Solange der Drucker nicht erreichbar ist, wird der Status aktualisiert und nach Wiederherstellung der Verbindung in den gemeldeten IPP-Zustand zurückgesetzt. Zuvor gelesene Messwerte bleiben auch offline verfügbar, und die letzten Tonermesswerte werden beibehalten, falls eine Abfrage keine gültigen Verbrauchsdaten liefert. Die Verbrauchsmaterialbezeichnungen verwenden anerkannte englische Farb-/Typbezeichnungen anstelle von Rohdaten. `marker-names`; wird eine englische Gattungsbezeichnung verwendet, wenn diese Bezeichnungen nicht verfügbar sind. IPP `marker-levels` Die angegebenen Prozentwerte werden direkt verwendet; optionale Markierungsstufen (niedrig/hoch) werden nicht neu skaliert. Ungültige, reservierte oder außerhalb des zulässigen Bereichs liegende Werte werden übersprungen, während die Tintenversorgung ihre ursprüngliche Position in den Markierungsarrays des Druckers beibehält. `pages_completed`, `impressions_completed`, Und `media_sheets_completed` Sie werden nur erstellt, wenn der Drucker sie meldet. Fehlende Zähler- und Detailwerte werden bei erfolgreichen Abfragen, auch nach einem Neustart des Adapters, gelöscht statt durch Null ersetzt. Anforderungsdetails werden nicht protokolliert.

Für die Meldung von Lieferengpässen kombiniert der Adapter jeweils `marker-names` Eintrag mit der gleichen Position `marker-levels` Eintrag; anerkannt `marker-types` Und `marker-colors` Geben Sie einen englischen Anzeigenamen an, während der ursprüngliche Markername für die bestehende Status-ID beibehalten wird. Falls kein erkannter Typ verfügbar ist, lautet der Anzeigename: `Supply N` Eine Lieferung wird übersprungen, wenn ihr Name oder Prozentwert fehlt, ungültig ist oder außerhalb des Bereichs von 0-100 liegt. Zählerzuordnung von `pages-completed`, `impressions-completed`, Und `media-sheets-completed` Zu `pages_completed`, `impressions_completed`, Und `media_sheets_completed` Wenn Sie fehlende Werte melden, geben Sie bitte das Druckermodell und die Firmware an, welche dieser IPP-Attribute der Drucker zurückgibt und welche Rohwerte oder Status-IDs fehlen.

[![Spenden Sie mit PayPal](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2026-11-19)

- (Voodoo2man) Exposed printer online/offline status in ioBroker Admin.
- (Voodoo2man) Preserved custom states in printer objects during cleanup.
- (Voodoo2man) Prevented empty legacy printer rows from causing startup warnings.

### 0.2.1 (2026-11-11)

- (Voodoo2man) Hardened printer configuration storage with normalized request timeouts, safer migration, per-instance file isolation, and cleanup of owned orphaned legacy roots.
- (Voodoo2man) Treated temporary printer gateway errors as offline states without warning-level logs.
- (Voodoo2man) Improved published printer data with stable detail IDs, English IPP reason labels, complete model names, and scalar text details that may retain printer-localized wording.
- (Voodoo2man) Combined basic settings and printer management on one configuration page.

### 0.2.0 (2026-11-08)

- (Voodoo2man) Hardened IPP response handling, corrected supply percentages and state clearing, preserved legacy printer configurations, normalized printer IDs, refreshed state metadata, localized Device Manager actions, scheduled polls after each completed cycle, and isolated Device Manager storage from Admin saves.
- (Voodoo2man) Aligned saved endpoint validation with polling, made colliding dynamic detail IDs unique, and removed unused UI translation entries.

### 0.1.1 (2026-11-07)

- (Voodoo2man) Kept the last toner readings when printers temporarily omit supply data.

### 0.1.0 (2026-11-03)

- (Voodoo2man) Replaced the printer list with Device Manager configuration and split basic settings into a separate tab.

Older release notes are available in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Voodoo2man <Voodoo2man@outlook.de>

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