---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/info/PulseMeterModes.md
title: Tibber Pulse - unterstützte Messmodi
hash: t952l5QwHkfvA2KVdqK5eCjDd5IAAoWXm7s/o6Ei1IM=
---
# Tibber Pulse – unterstützte Messmodi

Referenzhinweise für die lokale Pulse-Telegrammanalyse in[`src/lib/tibberLocal.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.ts) Die

Wenn der Adapter die Tibber Bridge lokal abfragt (`/metrics.json` Die Brücke meldet einen numerischen Wert. `meter_mode` in seiner `node_status` Dieser Wert teilt der Bridge (und dem Adapter) mit, wie der angeschlossene Netzzähler sein Telegramm kodiert. Der Adapter liest ihn ein in `this.meterMode` und leitet die rohe HEX-Nutzlast an den passenden Parser weiter.

Es gibt zwei grundlegend verschiedene Telegrammkodierungen:

- **Binäre SML** (Smart Message Language, IEC 62056-5-3) – eine Binärstruktur, die mit der Escape-Sequenz beginnt. `1b1b1b1b`. Analysiert von `extractAndParseSMLMessages()` Die
- **Klarer OBIS-Text** (IEC 62056-21, "Mode D" ASCII) – für Menschen lesbare Zeilen wie `1-0:1.8.0*255(007459.78471652*kWh)`. Analysiert von `extractAndParseAsciiMessages()` Die

## Modus → Parser-Zuordnung

| `meter_mode` | Codierung            | Parser                                                                              | Beispielmeter                                       |
| ------------ | -------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------- |
| **1**        | Klarer OBIS-Text     | `extractAndParseAsciiMessages()`                                                    | ZPA GH305                                           |
| **2**        | _nicht beobachtet_   | Fällt an den SML-Parser durch + Warnung                                             | —                                                   |
| **3**        | Binäres SML          | `extractAndParseSMLMessages()`                                                      | ISKRA ISK00 7034, EasyMeter Q3AA2064, EMH eHZB, EFR |
| **4**        | Klarer OBIS-Text (¹) | `extractAndParseAsciiMessages()`                                                    | eBZ DD3                                             |
| **5**        | Klarer OBIS-Text     | `extractAndParseAsciiMessages()`                                                    | eBZ (EBZ5DD32R06…)                                  |
| _andere_     | _unbekannt_          | Fällt an den SML-Parser durch +`Potential problems with Pulse meter mode X` Warnung | —                                                   |

¹ Einige Zähler melden `meter_mode=4` senden aber tatsächlich **binäres SML** (beobachtet an EMH-Messgeräten, Problem [#912](https://github.com/hombach/ioBroker.tibberlink/issues/912) ). Die Modi 4 und 5 beinhalten daher eine Schutzprüfung: Wenn die Nutzlast mit beginnt `1b1b1b1b` Der SML-Parser wird unabhängig vom gemeldeten Modus verwendet.

## Geschichte

- Die Unterstützung für Modus 5 wurde für eBZ-Zähler, die Klartext-OBIS-Text senden, hinzugefügt ( [#931](https://github.com/hombach/ioBroker.tibberlink/issues/931) ). Vor der Behebung des Fehlers wurde Modus 5 an den SML-Parser weitergeleitet, der keine Klartext-Telegramme lesen kann, wodurch alle Pulse-Status auf ihrem letzten Wert eingefroren wurden.
- Modus 4 binärer SML-Schutz für EMH-Zähler hinzugefügt ( [#912](https://github.com/hombach/ioBroker.tibberlink/issues/912) ).

## Hinweise zum Hinzufügen eines neuen Modus

1. Nehmen Sie das unformatierte Telegramm aus der Debug-Logzeile. `got HEX data from local pulse: <hex>` Die
2. Um die Kodierung zu bestimmen, dekodieren Sie den Text (z. B. durch Einfügen in <https://tasmota-sml-parser.dicp.net> für SML oder durch Hexadezimaldekodierung in ASCII für OBIS-Text).
3. Füge die Modusnummer hinzu zu `switch (this.meterMode)` In `tibberLocal.ts` (SML →`extractAndParseSMLMessages`, OBIS-Text →`extractAndParseAsciiMessages`) und auf die Zulassungsliste `[1, 3, 4, 5]` Dadurch wird die Warnung „Mögliche Probleme“ unterdrückt.
4. Fügen Sie einen Regressionstest hinzu in[`src/lib/tibberLocal.test.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.test.ts) Verwenden Sie das echte Telegramm und aktualisieren Sie die obige Tabelle.