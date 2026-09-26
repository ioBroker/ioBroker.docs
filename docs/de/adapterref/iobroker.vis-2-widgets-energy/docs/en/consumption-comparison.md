---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md
title: Verbrauchsvergleich
hash: 025hP4HctoMTfruw4y9ME5s3xksfYy29q0SWL6mm/pU=
---
# Verbrauchsvergleich

![Energievergleich](../../img/comparison.png)![Kreisdiagramm](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/pie.png)

Vergleicht die **aktuellen Werte** mehrerer Datenpunkte miteinander – beispielsweise als Balkendiagramm für eine Rangliste oder als Kreisdiagramm für die Anteile eines Ganzen. Es wird keine Historieninstanz benötigt; die Werte werden live ausgelesen.

## Konfiguration

### Gemeinsam

| Feld               | Bedeutung                                                           |
| ------------------ | ------------------------------------------------------------------- |
| Ohne Rahmen / Name | Karte und Titel                                                     |
| Typ                | Balkendiagramm oder Kreisdiagramm                                   |
| Geräteanzahl       | Wie viele Datenpunkte werden verglichen, mindestens 2?              |
| Sortierung         | Gemäß Konfiguration, entweder größtes zuerst oder kleinstes zuerst  |
| Dezimalzahlen      | Dezimalstellen der Werte in der QuickInfo und in den Beschriftungen |
| Keine Animation    | Zeichne sofort, anstatt zu animieren                                |
| Animationsdauer    | In Millisekunden                                                    |

### Balkendiagramm

| Feld           | Bedeutung                                                    |
| -------------- | ------------------------------------------------------------ |
| Orientierung   | Horizontale Balken (erstes Gerät oben) oder vertikale Balken |
| Werte anzeigen | Schreibe den Wert neben jeden Balken.                        |

### Kreisdiagramm

| Feld                 | Bedeutung                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Innenradius          | Größe des Lochs in der Mitte, in Prozent. 0 entspricht einem vollständigen Tortendiagramm. |
| Innentitel           | Text in der Mitte, über dem inneren Wert                                                   |
| Innere Objekt-ID     | Der Datenpunkt wird in der Mitte angezeigt, z. B. die Gesamtsumme.                         |
| Innerer Wert Einheit | Direkt nach dem inneren Wert geschrieben                                                   |
| Legende anzeigen     | Unterhalb der Tabelle werden die Geräte mit ihren Werten aufgelistet.                      |
| Legende Höhe         | Welchen Anteil der Höhe die Legende einnimmt, in Prozent                                   |
| Etiketten ausblenden | Schreiben Sie die Prozentsätze nicht in die Segmente.                                      |
| Etikettenpräzision   | Dezimalstellen dieser Prozentsätze                                                         |

### Stufe 1 … n

| Feld          | Bedeutung                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| OID           | Der Datenpunkt. Name und Farbe werden vom Objekt übernommen.              |
| Name          | Auf der Achse, in der Legende und in der QuickInfo angezeigt              |
| Farbe         | Farbe des Balkens oder Segments                                           |
| Einheit       | Wenn Sie dieses Feld leer lassen, wird die Einheit des Objekts verwendet. |
| Multiplikator | Skalierung, z.B. `0.001` für Wh → kWh                                      |

## Einheiten

Jedes Gerät hat seine **eigene** Einheit – der Tooltip, die Beschriftungen und die Legende zeigen die Einheit dieses Geräts an, die x-Achse ist mit der ersten konfigurierten Einheit beschriftet.

> **Wichtige Änderung in Version 2.0.0:** Dieses Widget rechnet W nicht mehr in Wh oder kW in kWh um und teilt Wh nicht mehr durch 1000. Es zeigt den tatsächlichen Wert mit der tatsächlichen Einheit an. Falls Ihr Dashboard plötzlich 1000-fach höhere Werte anzeigt, stellen Sie _den Multiplikator_ dieses Geräts auf „true“ ein. `0.001` Die
>
> Bis Version 2.0.1 wurden die Einheiten der Geräte vertauscht, sobald mehrere Geräte im Spiel waren, da die Tabelle die Geräte zwar in umgekehrter Reihenfolge darstellte, die Einheit aber anhand der Position in der Darstellung ermittelt wurde. Behoben.

## Rezept: Wohin fließt der Strom?

1. _Typ_ =`pie`, _Innenradius_ =`55` _Anzahl der Geräte_ =`4` Die
2. Stufe 1 … 4 = der tägliche Verbrauch von Haushalt, Wärmepumpe, Wandbox und Pool.
3. _Innere Objekt-ID_ = der Gesamtverbrauch des Tages, _Innerer Titel_ =`Today` Die
4. _Die Legende sollte so eingeblendet werden_ , dass auch die Absolutwerte lesbar sind.

## Fehlerbehebung

- **Ein Gerät zeigt 0 an.** Seine Objekt-ID ist nicht festgelegt, oder der Datenpunkt hat noch keinen Wert.
- **Die Prozentangaben ergeben nicht 100 %.** _Die Genauigkeit der Beschriftung_ rundet sie; der Kuchen selbst ist exakt.
- **Die Einheit in der Anzeige ist falsch.** Legen Sie _die Einheit_ explizit am Gerät fest, anstatt sich auf das Objekt zu verlassen.