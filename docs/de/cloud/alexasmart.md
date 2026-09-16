---
title:       "Alexa Smarthome-Skill"
lastChanged: "08.09.2026"
---

# Der Alexa Smarthome-Skill

Mit dem Smarthome-Skill werden Geräte aus ioBroker für Alexa zu ganz normalen
Smart-Home-Geräten. Sie erscheinen in der Alexa-App, lassen sich Gruppen und
Routinen zuordnen und werden mit den Standardbefehlen bedient:

* „Alexa, schalte das Licht im Wohnzimmer ein"
* „Alexa, stelle die Heizung im Bad auf 21 Grad"
* „Alexa, dimme die Küche auf 30 Prozent"

Für diese Befehle muss nichts eingerichtet werden, was Alexa betrifft. Sie
gehören zum Sprachumfang von Alexa selbst. ioBroker liefert nur die Geräteliste.

## Abgrenzung zum Custom-Skill

| | Smarthome-Skill | [Custom-Skill](/docs/cloud/alexacustom.md) |
| --- | --- | --- |
| Befehle | Vorgegeben von Alexa | Frei, über den Aufruf `i o Broker` |
| Gut für | Schalten, Dimmen, Temperatur, Rollläden | Statusabfragen, Szenen, eigene Abläufe |
| Aufwand | Geräte auswählen, fertig | Befehle selbst festlegen |

Beide lassen sich gleichzeitig betreiben und ergänzen sich: der Smarthome-Skill
für den Alltag, der Custom-Skill für alles, wofür Alexa keine passende
Formulierung kennt.

## Einrichten

Der Smarthome-Skill ist Teil des
[iot-Adapters](/docs/cloud/iot.md). Dort
steht der vollständige Ablauf: Konto bei ioBroker.pro, Instanz einrichten,
Verbindung prüfen, Skill in der Alexa-App aktivieren und mit dem Konto
verknüpfen. Danach die Gerätesuche in der Alexa-App starten.

## Welche Geräte Alexa sieht

Die Geräteliste steht in der Konfiguration der iot-Instanz. Der Adapter schlägt
sie selbst vor, und zwar anhand der
[Kategorien](/docs/basics/enums.md) und der
[Rollen](/docs/basics/roles.md) der
Datenpunkte. Aus Raum und Funktion entsteht der Name, aus der Rolle die Art des
Geräts.

?> Deshalb lohnt sich die Pflege der Kategorien hier doppelt. Ein Datenpunkt
ohne Raum und Funktion taucht bei Alexa gar nicht erst auf, und die Zuordnung
gehört an den **Datenpunkt**, nicht an das Gerät oder den Kanal.

In der Liste lässt sich jedes Gerät umbenennen, abschalten oder einem anderen
Raum zuordnen. Der Name in dieser Liste ist der Name, den Sie später aussprechen.

!> Namen, die Alexa gut versteht, sind kurz, deutsch und eindeutig. `hm-rpc.0
Wohnzimmer Deckenlampe LEVEL` funktioniert nicht, `Deckenlampe` schon. Zwei
Geräte mit ähnlichem Namen führen dazu, dass Alexa das falsche schaltet.

## Wenn ein Gerät nicht auftaucht

1. Steht es in der Geräteliste der iot-Instanz? Wenn nein, fehlen Raum,
   Funktion oder eine passende Rolle.
2. Wurde die Gerätesuche in der Alexa-App nach der Änderung noch einmal
   gestartet? Neue Geräte kommen nicht von selbst dazu.
3. Steht die Verbindung? Der Zustand der iot-Instanz und das
   [Protokoll](/docs/admin/log.md) geben
   Auskunft.
4. Ist das Kontingent an Anfragen aufgebraucht? Die Grenzen stehen unter
   [IoT](/docs/cloud/iot.md).

## Was der Skill nicht kann

Alexa kennt für jede Geräteart einen festen Satz an Befehlen. Alles, was
darüber hinausgeht, also Rückfragen, Messwerte vorlesen, mehrstufige Abläufe,
gehört in den
[Custom-Skill](/docs/cloud/alexacustom.md)
oder in eine Alexa-Routine, die einen ioBroker-Datenpunkt schaltet.
