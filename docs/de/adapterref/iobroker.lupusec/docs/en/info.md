---
chapters: {"pages":{"en/adapterref/iobroker.lupusec/README.md":{"title":{"en":"ioBroker.lupusec"},"content":"en/adapterref/iobroker.lupusec/README.md"},"en/adapterref/iobroker.lupusec/docs/en/info.md":{"title":{"en":"Sensor / Devices"},"content":"en/adapterref/iobroker.lupusec/docs/en/info.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lupusec/docs/en/info.md
title: Sensoren / Geräte
hash: UXcXTaL4cT+zdtnKjtx8ZtYan/Su46tcxu+i7lRpZU4=
---
# Sensoren / Geräte

Jeder Sensor und jedes Gerät sendet eine Vielzahl von Informationen. In ioBroker sehen Sie alle Statusinformationen, die auch in der Lupusec-App angezeigt werden. ioBroker bietet dieselben Funktionen zur Steuerung von Geräten wie Schaltern, Relais, Rollläden usw. wie die Lupusec-App. Die Einstellungen der Lupusec-Sensoren und -Geräte können jedoch nicht in ioBroker geändert werden. Technisch wäre dies zwar möglich, erscheint mir aber derzeit nicht sinnvoll.

## Allgemeine Informationen

Alle Sensoren und Geräte besitzen folgende Zustände.

| Zustand      | Beschreibungen                                                                                                                                                                | lesen/schreiben |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Bereich      | Alarmbereich                                                                                                                                                                  | lesen           |
| Batterie\_ok | Der Status ist „falsch“, wenn die Batterie des Sensors schwach oder leer ist.                                                                                                 | lesen           |
| Bypass       | Diese Aktion ermöglicht es Ihnen, die Bypass-Funktion des ausgewählten Sensors zu aktivieren oder zu deaktivieren. Diese Aktion kann nur auf Alarmsensoren angewendet werden. | lesen           |
| cond\_ok     | Zustand des Sensors in Ordnung                                                                                                                                                | lesen           |
| Name         | Name des Sensors                                                                                                                                                              | lesen/schreiben |
| RSSI         | Wert der Empfangssignalstärkeanzeige des Sensors                                                                                                                              | lesen           |
| tamper\_ok   | Manipulationskontakt ist zulässig. Diese Maßnahme kann nur bei Alarmsensoren angewendet werden.                                                                               | lesen           |
| Typ          | Sensortyp als Nummer                                                                                                                                                          | lesen           |
| Typname      | Sensortyp als Text                                                                                                                                                            | lesen           |
| Zone         | Sensorzone                                                                                                                                                                    | lesen           |

## Türkontakt / Fensterkontakt (Typ 4)

| Status            | Beschreibung | Lesen/Schreiben |
| ----------------- | ------------ | --------------- |
| Alarmstatus       |              | lesen           |
| alarm\_status\_ex |              | lesen           |
| Status            |              | lesen           |
| status\_ex        |              | lesen           |

## Wassersensor (Typ 5)

## Bewegungsmelder / 360-Grad-Bewegungsmelder (Typ 9)

## Rauchmelder / Wärmemelder (Typ 14)

## Statusanzeige / Mini-Innensirene (Typ 22)

## Netzschalter (Typ 24)

## 1-Kanal-Relais mit ZigBee-Repeater (Typ 24)

## 2-Kanal-Relais mit ZigBee-Repeater (Typ 24)

## Tastatur (Typ 37)

## Leistungsschalter-Messgerät (Typ 48)

## Raumsensor V1 (Typ 54)

## Dimmer (Typ 66)

## Farbton (Typ 74)

## Rollladenrelais V1 (Typ 76)

## Heizkörperthermostat (Typ 79)

## Heizkörperthermostat V2 (Typ 79)

## Lichtsensor (Typ 78)

## CO-Sensor (Typ 13)