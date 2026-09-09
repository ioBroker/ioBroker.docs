---
chapters: {"pages":{"en/adapterref/iobroker.go-e/README.md":{"title":{"en":"ioBroker.go-echarger"},"content":"en/adapterref/iobroker.go-e/README.md"},"en/adapterref/iobroker.go-e/docs/Readme.md":{"title":{"en":"Functionalities"},"content":"en/adapterref/iobroker.go-e/docs/Readme.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.go-e/docs/Readme.md
title: Funktionalitäten
hash: XiTTyTCIlckKJlTWKhavSUtLZ1QL7eWSkB0od0oxbH8=
---
# Funktionalitäten

## Allgemein

Dieser Adapter sammelt die Daten über die HTTP-API von Ihrem e-GoCharger via WLAN.

## Installation

Sie können einfach eine Instanz zu ioBroker mit dem go-e Adapter hinzufügen.

## Hardwarekonfiguration

Um den Adapter zu aktivieren, müssen Sie die HTTP-Schnittstelle über die App aktivieren.

1. Verbinden Sie das Mobilgerät mit dem WLAN-Hotspot der Hardware.
2. Öffnen Sie die go-eCharger-App
3. Gehe zu Cloud
4. Erweiterte Einstellungen
5. HTTP-Schnittstelle aktivieren

## Konfiguration des ioBroker-Adapters

- Server oder IP-Adresse Bitte geben Sie hier den Hostnamen oder die IP-Adresse ein, um eine Verbindung zum go-eCharger herzustellen. Standardmäßig registriert sich der go-eCharger mit dem angegebenen Hostnamen.

- Das Service-Update-Intervall definiert, in welchen Intervallen der Status vom Adapter angefordert wird. Empfohlen: 30 Sekunden. Der Hersteller empfiehlt mindestens 5 Sekunden.

- Das Aktualisierungsintervall legt fest, wie oft der Adapter eine Neukonfiguration (z. B. max. Ampere) zulassen soll. Zu häufige Konfigurationen können die Hardware und das Fahrzeug beschädigen!

## Entscheidungsmatrix: Anwendungsfall zur Adapterfunktion

Wenn Sie nicht wissen, welche Funktion Sie in Ihrem Skript oder Ihrer Umgebung verwenden sollten, nutzen Sie einfach diese Tabelle und die Beispiele:

| Verfügbare Daten       |       Beispiel      | Funktion/Attribut verwenden      | Anwendungsfallbeschreibung                                                                                                                                                                     |
| :--------------------- | :-----------------: | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| verfügbare Ampere      |         10A         | Ampere                           | Sie wissen, wie viel Strom andere Geräte in Ihrer Umgebung in Ampere verbrauchen und wissen, dass der Adapter nur mit einer bestimmten Amperezahl belastet werden sollte.                      |
| verfügbare Watt        |       11.000 W      | max\_watts                       | Anhand Ihres Solarstroms können Sie sehen, wie viel Energie Sie empfangen, und möchten die gesamte Energie nutzen, um Ihr Auto zu beladen.                                                     |
| Delta verfügbare Watt  | +1.000 W / -1.000 W | Verstärkerpegel in Watt anpassen | Sie haben eine Solaranlage installiert und betreiben einige Geräte parallel dazu; den restlichen verfügbaren Strom beziehen Sie über Ihren herkömmlichen Stromzähler.                          |
| ioBroker implementiert |      Objekt-IDs     | Einstellungen                    | Sie haben Ihre Solaranlage, Ihre Hausbatterie oder Ihren Hausverbrauch in ioBroker implementiert. Verbinden Sie die Geräte mit diesem Adapter und lassen Sie ihn die Arbeit für Sie erledigen. |

# Adapterfunktionen

In diesem Absatz werden zusätzliche Funktionalitäten aufgelistet, die für eine einfachere Implementierung in ioBroker zur Verwendung mit anderen Geräten genutzt werden können.

- [Zugriffsstatus](#access-state)
- [Aufladen erlauben](#allow-chargeing)
- [Ampere](#ampere)
- [AmperePV](#amperePV)
- [Energie](#energy)
  - [Verstärkerpegel in Watt anpassen](#-adjust-the-ampere-level-by-using-watts)
  - [max\_watts](#-maximum-watts)
- [max\_load](#-max-load)
- Einstellungen
  - Ampere-Level1
  - Ampere-Level 2
  - Ampere-Level 3
  - Ampere-Level 4
  - Ampere-Level 5
  - Farbe
    - Leerlauf
    - Aufladen
    - beenden
  - LED-Energiesparmodus
  - LED-Helligkeit
- [Stoppzustand](#stop-state)
- [Entsperrstatus](#unlock-state)
- [Fremdkörper](#foreign-objects)
- [Mindestens 6 A laden](#load-at-least-6a)
- [phaseSwitchModeBuffer](#phaseSwitchModeBuffer)

## Zugriffsstatus

| go-e Attribut                                                                                      | Typ        | Einheit | Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [ast](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Modus   |      go-e.0.access\_state |

Zugriffskontrolle zur Auswahl der Zugriffsmethode für das Gerät. 0: Offen 1: RFID / App erforderlich 2: Strompreis / Automatisch

## Laden zulassen

| go-e Attribut                                                                                      | Typ        | Einheit | Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [alw](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Modus   |    go-e.0.allow\_charging |

Laden zulassen: PWM-Signal kann vorhanden sein 0: nein 1: ja

## Ampere

| go-e Attribut                                                                                         | Typ        | Einheit | Beispiel Attributposition |
| ----------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [Ampere](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  |             go-e.0.ampere |

Dieses Attribut legt die Stromstärke (in Ampere) fest, die für die Belastung verwendet werden kann. Der Amperewert für die PWM-Signalisierung wird in ganzen Ampere (6–32 A) angegeben.

## AmperePV

| go-e Attribut                                                                                      | Typ        | Einheit | Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [AMX](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  |             go-e.0.ampere |

Dieses Attribut entspricht Ampere, speichert die Daten jedoch nicht dauerhaft. Nach einem Neustart gehen diese Informationen verloren. Ampere ist aufgrund des EEPROM des Geräts nur 100.000 Mal beschreibbar. Bei Verwendung einer Photovoltaikanlage mit go-e sollten Sie dieses Attribut anstelle von Ampere nutzen.

## Energie

Passen Sie alle Energieeinstellungen an. Dieser Knoten ist nicht beschreibbar, enthält aber mehrere Schalter.

### Maximale Wattzahl

| go-e Attribut | Typ        | Einheit | Beispiel Attributposition |
| ------------- | ---------- | ------- | ------------------------: |
| -             | ganze Zahl | Watt    |  go-e.0.energy.max\_watts |

Die Hardware kann die Stromstärke (in Ampere) während des Lastvorgangs anpassen. Photovoltaik- oder Verbrauchsmessgeräte geben die Leistung in Watt an, nicht in Ampere. Um die Wattzahl für die Berechnung mit den angeschlossenen Phasen oder dem angeschlossenen Netzteil zu verwenden, muss die Stromstärke in Ampere umgerechnet werden.

Für dieses Set`go-e.0.energy.max_watts` (0 ist Ihre Instanz des Adapters) mit der maximal zulässigen Wattzahl. Der Aktualisierungsprozess wird nur alle 30 Sekunden an das Gerät gesendet. Diese Einstellung kann im Einstellungsmenü geändert werden, es wird jedoch empfohlen, dies nicht häufiger zu tun. Weitere Informationen finden Sie im [offiziellen Handbuch](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20DE.md) .

## Stellen Sie die Amperezahl mithilfe der Wattzahl ein.

| go-e Attribut                                                                                                                                                                                                             | Typ        | Einheit |           Beispiel Attributposition |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | ----------------------------------: |
| -                                                                                                                                                                                                                         | ganze Zahl | Watt    | go-e.0.energy.adjustAmpLevelInWatts |
| Wenn Ihre Photovoltaikanlage genau die Wattzahl liefert, die in Ihrer Umgebung derzeit nicht ausreicht, kann diese Funktion die Amperezahl anpassen, indem sie eine bestimmte Wattzahl übergibt.                          |            |         |                                     |
| Wenn Sie beispielsweise die Leistung Ihres Autoladers um 1000 Watt erhöhen möchten, geben Sie einfach den Wert 1000 ein. Umgekehrt gilt: Wenn Sie die Leistung um 1000 Watt reduzieren möchten, geben Sie hier -1000 ein. |            |         |                                     |

Der Endpunkt in diesem Adapter ist`go-e.0.energy.adjustAmpLevelInWatts` Der Aktualisierungsprozess wird nur alle 30 Sekunden an das Gerät gesendet. Diese Einstellung kann im Einstellungsmenü geändert werden, es wird jedoch empfohlen, dies nicht häufiger zu tun.

## Maximale Belastung

| go-e Attribut                                                                                      | Typ        | Einheit | Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [dwo](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  |          go-e.0.max\_load |
| Abschaltwert in kWh, wenn stp==2, für den dws-Parameter                                            |            |         |                           |

## Einstellungen

Dieser Knoten gruppiert mehrere Attribute für allgemeine Einstellungen. Der Knoten selbst ist nicht beschreibbar.

### Ampere-Stufe 1-5

| go-e Attribut                                                                                      | Typ        | Einheit |      Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | -----------------------------: |
| [al1](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  | go-e.0.settings.ampere\_level1 |
| [al2](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  | go-e.0.settings.ampere\_level2 |
| [al3](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  | go-e.0.settings.ampere\_level3 |
| [al4](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  | go-e.0.settings.ampere\_level4 |
| [al5](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  | go-e.0.settings.ampere\_level5 |

Ampere-Stufe 1 für den Druckknopf am Gerät. 6–32: Ampere-Stufe aktiviert. 0: Stufe deaktiviert (wird übersprungen). Ampere-Stufe 2 für den Druckknopf am Gerät. Muss entweder 0 oder >11 sein.

## Stoppzustand

| go-e Attribut                                                                                      | Typ        | Einheit | Beispiel Attributposition |
| -------------------------------------------------------------------------------------------------- | ---------- | ------- | ------------------------: |
| [stp](https://github.com/goecharger/go-eCharger-API-v1/blob/master/go-eCharger%20API%20v1%20EN.md) | ganze Zahl | Ampere  |        go-e.0.stop\_state |

Automatische Abschaltung. Der Ladevorgang wird nach Erreichen der angegebenen kWh-Menge automatisch gestoppt. 0: Deaktiviert; 2: Abschaltung nach Erreichen einer bestimmten kWh-Menge.

## Kabelentsperrmodus (Entsperrzustand)

Einstellung der Kabelverriegelung. Diese Einstellung definiert, wann das Kabel verriegelt und entriegelt wird. 0: Verriegelt, solange das Auto angeschlossen ist (Standard). 1: Automatische Entriegelung nach dem Ladevorgang. 2: Kabel immer verriegelt lassen.

## Fremdkörper

Wenn Sie Adapter anderer Hersteller verwenden, um den aktuellen Energieverbrauch oder die PV-Erzeugung auszulesen, können Sie diese Objekte direkt nutzen. Dafür benötigen Sie keine eigenen zusätzlichen Skripte.

Wir verwenden hier den Adapter von Fronius. Man könnte aber jedes beliebige Objekt verwenden.

### Verfügbare Solarenergie

Dieses Attribut erklärt, wie viel Leistung dieser Adapter zum Laden des Autos verwenden kann.

Beispiel:

| go-e Adaptername                | Attribut des Fremdadapters   | Beispielwert | Einstellungen nurBestätigen | Einstellungen heben sich auf? | Anmerkungen                                                                                                                                                                                                                 |
| :------------------------------ | :--------------------------- | :----------: | :-------------------------: | :---------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| solarPowerForeignObjectID       | fronius.0.powerflow\.P\_Grid |    -1000.0   |             WAHR            |              WAHR             | Fronius liefert die Werte, die an das negative Grig gesendet werden. Dafür müssen Sie Folgendes einstellen:`Negative?` Einstellung. Fronius sendet die Werte mit`ack:true` Aktivieren Sie daher die`Only ack?` Einstellung. |
| houseConsumptionForeignObjectID | _leer_                       |       -      |              -              |               -               | Fronius liefert keinen separaten Wert für PV\_Production. Dieser ist bereits in PV\_GRID enthalten; siehe oben.                                                                                                             |
| houseConsumptionForeignObjectID | fronius.0.powerflow\.P\_Akku |    -1000.0   |             WAHR            |              WAHR             | Wenn Sie das Laden des Autos priorisieren möchten, bevor Sie Ihre Heimbatterie laden, können Sie die Akku-Last ebenfalls hinzufügen.                                                                                        |
| bufferToSolar                   | _fester Wert_                |      100     |              -              |               -               | Dies ist ein Puffer, der verhindert, dass Energie aus dem Netz bezogen wird, wenn die Sonne untergeht. Er sollte den Aktualisierungszeitraum von 60 Sekunden abdecken.                                                      |

Dies sollte zu einem Automatismus wie in diesem Diagramm führen:![Beladung von PV-Wagen bei schlechtem Wetter](../../../../en/adapterref/iobroker.go-e/docs/PV_LoadBadWeather.png)

# Mindestens 6 A Last

Diese Option legt fest, dass der Adapter das Auto auch dann weiterlädt, wenn nicht genügend Solarenergie zur Verfügung steht, allerdings mit reduzierter Geschwindigkeit.

# phaseSwitchModeBuffer

Standardwert: 500 W

Dies ist der Puffer für die Einstellungen in phaseSwitchWatts. Dieser Puffer reduziert den Umschlag beim Wechsel zwischen 1-phasigem und 3-phasigem Lastbetrieb. Zum Deaktivieren auf 0 setzen.\
&#x20;Der Standardwert für phaseSwitchWatts beträgt 4200 Watt.

'''Beispiel:''' Setup: phaseSwitchWatts = 4200; phaseSwitchModeBuffer = 500;

| pGrid \[Watt] | aktueller Modus | erforderlicher Modus | erklären                                                               |
| :------------ | :-------------: | :------------------: | :--------------------------------------------------------------------- |
| 7000          |     3-phasig    |       3-phasig       | normaler Betrieb                                                       |
| 4000          |     3-phasig    |       3-phasig       | Bereit zum Umschalten auf Einphasenbetrieb, aber Puffer nicht erreicht |
| 3699          |     3-phasig    |       1-phasig       | Schalter erreicht                                                      |
| 2000          |     1-phasig    |       1-phasig       | normaler Betrieb                                                       |
| 4201          |     1-phasig    |       1-phasig       | Bereit zum Umschalten, aber Puffer nicht erreicht                      |
| 4701          |     1. Phase    |       3-phasig       | Schaltebene erreicht                                                   |