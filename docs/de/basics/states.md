---
lastChanged: "06.06.2019"
---

# States und Datenpunkte

Ein **Datenpunkt** besteht aus einem statischen Objekt vom Typ "state" und aus einem dynamischen Zustand (state).

Eigenschaften eines Zustands sind
 * val - aktueller Wert
 * ack - Flag, das die Bestätigung des Wertes durch das Zielsystem anzeigt
 * ts  - Unix Zeitstempel der letzten Aktualisierung des Zustands (in Millisekunden)
 * lc  - Unix Zeitstempel der letzten Wertänderung  (in Millisekunden)
 * q - [Qualität](../dev/objectsschema.md#states)
 * from - (optional) Quelle(Adapter Instanz) der letzten Aktualisierung
 * user - (optional) Anwendername, wer als letzter den Wert geschrieben hat.
 * c - (optional) Kommentar
 * expire - (optional) Zeit in Sekunden, wann der Wert auf `null` resetet wird.
  
Attribute des statischen Objektes sind id, type = 'state', common, native. Folgende common-Attribute sind möglich:
* `common.type` (optional) - Standard ist 'mixed' = beliebiger Typ. Mögliche Werte: 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'file'.
* `common.name` (optional, string)
* `common.max` (optional, number)
* `common.step` (optional, number) - Intervall erhöhen / verringern. Z.B. 0.5 für Thermostat
* `common.unit` (optional, string)
* `common.def` (optional - der Standardwert)
* `common.defAck` (optional - wenn common.def gesetzt ist, wird dieser Wert als ack-Flag verwendet, js-controller 2.0.0+)
* `common.desc` (optional, string oder object) - Beschreibung, Objekt für mehrsprachige Beschreibung
* `common.read` (bool, obligatorisch) - true, wenn der Datenpunkt lesbar ist
* `common.write` (bool, obligatorisch) - true, wenn der Datenpunkt beschreibbar ist
* `common.role` (string, obligatorisch) - Rolle des Datenpunktes (wird in Benutzeroberflächen verwendet, um anzugeben, welches Widget ausgewählt werden soll)
* `common.states` (optional) Attribut mit Objekt möglicher Zustände` {'Wert': 'Wertname', 'Wert2': 'Wertname2', 0: 'AUS', 1: 'EIN'} `
* `common.workingID` (Zeichenfolge, optional) - wenn dieser Status den Hilfsstatus WORKING hat. Hier muss der vollständige Name oder nur der letzte Teil geschrieben werden, wenn die ersten Teile mit den tatsächlichen identisch sind. Wird für `HM.LEVEL` verwendet und hat normalerweise den Wert `WORKING`.
* `common.custom` (optional) - die Struktur mit benutzerdefinierten Einstellungen für bestimmte Adapter. Wie `{"influxdb.0": {"enabled": true, "alias": "name"}}`. Das Attribut `enabled` ist erforderlich. Wenn dies nicht der Fall ist, wird das gesamte Attribut gelöscht.

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md), 
   damit die Änderungen einfacher übernommen werden können.
