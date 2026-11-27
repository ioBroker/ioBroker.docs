---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# Beispielsätze für smart-text2command (Deutsch)

Die folgenden Sätze zeigen die derzeit unterstützten Befehlsarten.
**Geräte-, Raum-, Funktions- und Datenpunktnamen sind Beispiele:**
Ersetze sie durch die Namen oder Aliase deiner ioBroker-Konfiguration.
Der Adapter verwendet keine fest eingebauten Gerätenamen.
Ein Gerät muss erkannt und die jeweilige Aktion am Datenpunkt freigegeben sein.
Bei mehreren passenden Geräten oder Datenpunkten fragt der Adapter nach.

## Lampen, Dimmer und farbiges Licht

**Ein- und ausschalten** – benötigt einen freigegebenen Schalt-Datenpunkt
mit Rolle `switch`:

- „Schalte die Lampe im Wohnzimmer ein.“
- „Schalte die Lampe im Wohnzimmer aus.“
- „Mach das Licht an.“
- „Ist die Lampe im Wohnzimmer an?“

**Helligkeit setzen und abfragen** – benötigt einen passenden numerischen
Datenpunkt, zum Beispiel mit Rolle `level.brightness` oder `value.brightness`
und `level.dimmer` oder `value.dimmer` (aktuell noch nicht im admin enthalten,
`level` kann temporär als ERsatz verwendet werden):

- „Stelle die Helligkeit der Lampe auf 40 Prozent.“
- „Dimme die Lampe auf 60 Prozent.“
- „Wie hell leuchtet die Lampe im Wohnzimmer?“
- „Mach die Lampe etwas heller.“
- „Mach die Lampe viel dunkler.“
- „Mach die Lampe auf maximale Helligkeit.“
- „Mach die Lampe auf minimale Helligkeit.“

Bei einem allgemein benannten Prozent-Datenpunkt mit Rolle `level` kann der
Datenpunktname helfen: „Mach den Dimmer der Lampe viel heller.“
Sind mehrere passende Prozent-Datenpunkte vorhanden, fragt der Adapter nach.

**Farben und Weißlicht** – Farbnamen benötigen `level.color.rgb` oder
`level.color.rgbw`; Warmweiß und Kaltweiß benötigen `level.color.temperature`:

- „Stelle Lampe5 auf Strohgelb.“
- „Stelle Lampe5 auf Lila.“
- „Stelle Lampe4 auf Warmweiß.“
- „Stelle Lampe4 auf Kaltweiß.“
- „Mach Lampe5 etwas satter.“
- „Mach Lampe5 blasser.“
- „Mach Lampe4 wärmer.“
- „Mach Lampe4 kühler.“

Weitere Farbnamen stehen in [`resources/colors/names.json`](https://github.com/oweitman/ioBroker.smart-text2command/blob/main/resources/colors/names.json);
selbst angelegte Farbnamen sind ebenfalls möglich.
Bei einem unbekannten Farbnamen fragt der Adapter nach.
Relative Farbänderungen benötigen einen gültigen aktuellen Wert.
Das Ändern der Farbe schaltet die Lampe nicht automatisch ein.

## Thermostate und Heizung

Zum Setzen ist ein freigegebener Sollwert nötig mit Rolle (`level.temperature`
und `value.temperature`). Abfragen können einen freigegebenen Messwert lesen:

- „Stelle die Heizung im Wohnzimmer auf 21 Grad.“
- „Setze die Solltemperatur im Wohnzimmer auf 21,5 Grad.“
- „Wie warm ist es im Wohnzimmer?“
- „Welche Temperatur misst das Thermostat im Wohnzimmer?“
- „Mach die Heizung etwas wärmer.“
- „Stell die Heizung um 2 Grad wärmer.“
- „Mach die Heizung deutlich kühler.“

Relative Änderungen funktionieren für passende °C- und °F-Datenpunkte mit
gültigem Wertebereich und aktuellem Wert. Celsius-Zielwerte werden auf
halbe Grad gerundet.

## Ventilatoren und andere Prozentsteller

Ein freigegebener numerischer Prozent-Datenpunkt mit Rolle
`level.speed` (aktuell noch nicht im admin verfügbar, `level` kann temporär als
Ersatz verwendet werden) mit passendem Wertebereich kann kontinuierlich
verstellt werden. Beispiel für ein Gerät namens „Ventilator“:

- „Mach den Ventilator im Wohnzimmer schneller.“
- „Mach den Ventilator etwas langsamer.“
- „Mach den Ventilator viel schneller.“
- „Mach den Ventilator im Wohnzimmer auf Maximum.“
- „Mach den Ventilator auf Minimum.“

Relative Änderungen wie „schneller“ benötigen einen gültigen aktuellen Wert.
„Auf Maximum“ und „auf Minimum“ setzen direkt `common.max` beziehungsweise
`common.min`. Wenn ein Gerät mehrere passende Prozent-Datenpunkte besitzt,
fragt der Adapter nach. Ein Datenpunkt mit geordneten, numerischen Schlüsseln in
`common.states` kann auch relativ über deklarierte Stufen verstellt werden,
etwa „Ventilator um 2 Stufen stärker“. Die Schlüssel müssen die tatsächlich
schreibbaren Werte sein, beispielsweise `0`, `30`, `60` und `100`; die
zugehörigen Texte sind Beschriftungen. „Stelle den Ventilator auf Stufe 2“ als
direkte Auswahl einer Stufennummer wird derzeit nicht unterstützt. Die zweite
Stufe lässt sich mit „Stelle den Ventilator auf 60 Prozent“ setzen, wenn `60`
als Wert eingetragen ist.

## Rollläden und Lamellen

Die Beispiele setzen freigegebene Datenpunkte für Position (`level.blind`) und
Lamellenstellung (`level.tilt`) voraus:

- „Stelle den Rollladen im Wohnzimmer auf 25 Prozent.“
- „Welche Position hat der Rollladen im Wohnzimmer?“
- „Stelle die Lamellen im Wohnzimmer auf 40 Prozent.“
- „Wie stehen die Lamellen im Wohnzimmer?“
- „Rollladen ganz öffnen.“
- „Rollladen ganz schließen.“
- „Mach den Rollladen etwas weiter auf.“
- „Mach die Lamellen steiler.“
- „Mach die Lamellen flacher.“

In der derzeitigen Zuordnung bedeutet bei
`level.blind` **0 % offen, 100 % geschlossen**. Bei `level.tilt` bedeutet
**0 % waagerecht/offen, 100 % senkrecht/verdunkelt**. Die Richtung relativer
Änderungen lässt sich am Datenpunkt umkehren.

## Audio und Medien

Für Lautstärke ist ein freigegebener numerischer Datenpunkt mit Rolle
`level.volume` oder `value.volume` nötig. Titelwechsel benötigt freigegebene
Tasten mit `button.next` beziehungsweise `button.previous`:

- „Mach die Musik etwas lauter.“
- „Mach die Musik viel leiser.“
- „Musik weiter.“
- „Musik zurück.“

## Steckdosen, Schalter und Tasten

Schaltbare Geräte können mit einem freigegebenen Schalt-Datenpunkt (Rolle `switch`)
bedient und abgefragt werden.
Benannte Tasten benötigen eine Freigabe für die Aktion „Drücken“:

- „Schalte die Steckdose ein.“
- „Schalte die Steckdose aus.“
- „Ist die Steckdose an?“
- „Drücke die Taste AUF am Rollladen im Wohnzimmer.“
- „Betätige den Knopf STOP.“

## Sensoren, Messwerte und weitere Datenpunkte

Lesbare, freigegebene Datenpunkte können über ihren Geräte- oder Datenpunktnamen
abgefragt werden. Schreibbare numerische Datenpunkte können auf einen konkreten
Wert gesetzt werden, wenn der Ziel-Datenpunkt eindeutig ist:

- „Welche Temperatur hat der Raum?“
- „Welchen Wert hat der Sensor?“
- „Zeige die Helligkeit der Lampe.“
- „Welchen Wert haben die Lamellen im Wohnzimmer?“
- „Setze den Wert der Lamellen im Wohnzimmer auf 60 Prozent.“

Für freigegebene Feuchte-Sollwerte mit passender Rolle und Einheit sind auch
relative Sätze wie „Mach den Luftbefeuchter etwas feuchter“ oder „Mach den
Luftbefeuchter trockener“ möglich. Die tatsächliche Funktion hängt von den
Rollen und Grenzen der eingerichteten Datenpunkte ab.

## Geräte und Räume erfragen

- „Welche Räume kennst du?“
- „Welche Geräte sind im Wohnzimmer?“
- „Welche Geräte kennst du?“
- „Welche Funktionen hat die Lampe im Wohnzimmer?“
- „Was kann die Lampe im Wohnzimmer?“

Bei unklaren Angaben fragt der Adapter nach Raum, Gerät, Datenpunkt oder Wert.
Eine Rückfrage kann beantwortet oder mit „Abbrechen“ beendet werden.
Geplante Aktionen lassen sich im Testlabor zunächst analysieren, ohne einen
Datenpunkt zu schreiben.