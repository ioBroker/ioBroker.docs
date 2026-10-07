---
chapters: {"pages":{"en/adapterref/iobroker.flow/README.md":{"title":{"en":"ioBroker.flow"},"content":"en/adapterref/iobroker.flow/README.md"},"en/adapterref/iobroker.flow/examples/README.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.flow/examples/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flow/examples/README.md
title: Beispiele
hash: rOqgVeeW4R3+JazwPVbA+iAM4d6Mh26Tf8vcNBKm9dM=
---
# Beispiele

Vollständige Diagramme als Ausgangspunkt. Öffnen Sie den Designer, verwenden Sie **„Importieren“** , fügen Sie die Datei ein und geben Sie dann die Status-IDs ein. `"oid": ""` In diesen Dateien befindet sich eine leere Stelle, die auf einen Eintrag wartet.

---

## `hybrid-12v.json` — 12-V-Inselbetriebene/Hybridinstallation

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../src-widgets/public/img/prev_hybrid-12v-dark.svg">
  <img alt="hybrid-12v" src="../src-widgets/public/img/prev_hybrid-12v.svg">
</picture>

Eine DC-gekoppelte Konfiguration: Vier MPPT-Ladegeräte speisen eine 12-V-Batteriebank, ein DC-Zweig wird direkt von der Batterie gespeist, ein Wechselrichter erzeugt 230 V für die Haushaltsgeräte, und das Netz kann sowohl die AC-Seite versorgen als auch die Batterie laden.

### Was soll gebunden werden?

Dreizehn Status-IDs, die meisten davon Zähler, die Sie bereits haben. Die als _abgeleitet_ gekennzeichneten benötigen nichts – das Diagramm ermittelt sie anhand der Verbindungen.

| Element                               | Was es braucht                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **MPPT 1 … 4**                        | Leistung jedes Ladereglers in W                                                                                                               |
| **Produktion**                        | _Das Ergebnis_ ist die Summe dessen, was übrig bleibt. Sein Symbol gibt den Tagesertrag in kWh an.                                            |
| **Gleichstrom 12 V**                  | Leistung des 12-V-Zweigs in W                                                                                                                 |
| **Batterie**                          | _abgeleitet_ -- Netto der beiden Linien. `soc` misst den Ladezustand in %, das Abzeichen den Ladestrom in Ampere.                              |
| **Wechselrichter**                    | Scheinleistung in Virginia. `action` Der Wechselrichter kann umgeschaltet werden – den Schaltzustand dort eintragen.                           |
| **Wechselstrom 220 V**                | Leistung auf der Wechselstromseite, in W                                                                                                      |
| **Netz**                              | Netzleistung in Watt. Positiv = Leistungsaufnahme, negativ = Einspeisung                                                                      |
| **Wasch-/Spülmaschine, Herd, Boiler** | Je ein Meter, in W                                                                                                                            |
| **Verbindungen**                      | Jeweils ein Zustand: MPPT→Produktion, Produktion→DC/Batterie/Wechselrichter, Batterie→DC, Netz→Batterie, Netz→AC, Wechselrichter→AC, AC→Gerät |

Alles, wofür Sie keinen Zähler haben: Lassen Sie es leer. Eine ungebundene Verbindung bleibt grau und wird nicht animiert, der Rest des Diagramms bleibt davon unberührt.

### Zwei Dinge, die man wissen sollte

**Die Batterieleistung ist nicht festgelegt, sondern wird abgeleitet.** Sie ergibt sich aus der Differenz zwischen Lade- und Gleichstromleitung: 196 W fließen in den Gleichstromzweig, während 156 W vom Ladegerät kommen. Daraus werden 40 W angezeigt, und das Vorzeichen gibt die Richtung an. Um direkt vom Batteriemanagementsystem (BMS) zu lesen, können Sie dem Knoten einen Wert zuweisen.

**Die Ladeleistung wird in Watt angegeben, der Ladestrom als Kennziffer.** Im Originaldiagramm ist auf der Leitung vom Netz zur Batterie „12 A“ ausgedruckt. Das ist eine Einheit in Watt, und sobald ein Knoten seinen Wert von dieser Leitung ableitet, werden Ampere und Watt vertauscht. Die Leitung überträgt also die Ladeleistung, und der Strom befindet sich im Ladezustand, wo er immer gleich angezeigt wird und nicht versehentlich addiert werden kann. Wenn Sie die Anzeige auf der Leitung bevorzugen, stellen Sie die Einheit dieser Verbindung entsprechend ein. `A` und dem Batterieknoten eine eigene Wertquelle zuweisen.

### Wo es sich vom Original unterscheidet

- Die **vier MPPT-Messwerte** sind Knoten, die mit _Produktion_ verbunden sind und keine vier eigenständigen Zahlen darstellen, sodass _Produktion_ ihren Wert aus ihnen ableiten kann.
- Die **drei Geräte** sind an _220 V Wechselstrom_ angeschlossen. Im Originalzustand waren sie nicht angeschlossen.
- Die **Anzeige des Ladezustandsverlaufs (z.** B. 98 % vor einigen Stunden) hat noch kein Äquivalent – im Widget gibt es keinen Zugriff auf den Verlauf.