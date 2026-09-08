---
title:       "Zugangslizenzen"
lastChanged: "08.09.2026"
---

# Zugangslizenzen

Zugangslizenzen betreffen nicht ioBroker selbst, sondern die Dienste, die es mit
der Außenwelt verbinden. Es gibt zwei davon, und sie lassen sich einzeln oder
zusammen nutzen.

| Lizenz | Wofür | Zuständiger Adapter |
| --- | --- | --- |
| **Assistent** | Sprachsteuerung und Dienste | `iot` |
| **Fernzugriff** | Zugriff auf Oberflächen von unterwegs | `cloud` |

?> Beide gehen den Weg **von innen nach außen**. Es muss also kein Port im
Router geöffnet werden, und die Installation ist nicht aus dem Internet
erreichbar. Das ist der eigentliche Grund, warum es diese Dienste gibt.

## Die Assistenten-Lizenz

Sie schaltet frei:

* **Sprachsteuerung** über Amazon Alexa, Google Home und Yandex Alisa. Für Alexa
  gibt es zwei Skills: den
  [ioBroker.assistant Skill](https://www.amazon.de/ioBroker-ioBroker-assistant/dp/B0FJHBXDZ4)
  für die üblichen Befehle und den
  [Custom Skill](https://www.amazon.de/ioBroker-Custom/dp/B01MQL6Z1N) für eigene
  Abfragen und Formulierungen.
* **Dienste**: Geoposition für standortabhängige Automationen,
  Tasker-Integration und URL-Services über HTTP GET und POST.
* **Matter**: die Anbindung matterfähiger Geräte über die ioBroker-Matter-Bridge.

Zum Matter-Adapter gehört eine Unterscheidung, die oft übersehen wird: der
Adapter selbst ist kostenfrei, beliebig viele Matter-Geräte lassen sich
einbinden und steuern. Begrenzt ist nur der umgekehrte Weg, also eigene
ioBroker-Geräte über die Bridge an Apple Home, Google Home oder Alexa
weiterzugeben.

!> Ein „Befehl" ist nicht nur ein Sprachkommando, auch Statusabfragen zählen
dazu. Öffnen Sie die Alexa-App mit 100 Geräten, sendet Amazon sofort über 100
sogenannte StatusReport-Befehle, und im geöffneten Zustand fragt die App alle
paar Sekunden erneut. Das kommt von Amazon, ab der Alexa Smart Home API V3, und
lässt sich durch ioBroker nicht beeinflussen. Ein Kontingent kann dadurch auch
ohne ein einziges Sprachkommando aufgebraucht werden.

## Die Fernzugriff-Lizenz

Sie regelt, was von unterwegs erreichbar ist. Der Unterschied zwischen der
kostenfreien und der kostenpflichtigen Fassung liegt in drei Punkten:

* **Welche Oberflächen.** Kostenfrei ist die Anzeige der Visualisierung, mit der
  Pro-Fassung kommen Admin, Skripte, Lovelace, e-charts und weitere dazu.
* **Anzeigen oder bearbeiten.** Kostenfrei lässt sich vis-2 ansehen, nicht
  bearbeiten.
* **Browser oder App.** Die kostenfreie Fassung läuft im Browser, die
  Pro-Fassung auch in der [App](/docs/cloud/app.md).

Die Pro-Fassung des Fernzugriffs enthält die Assistenten-Lizenz mit.

## Welches Konto

| Was Sie wollen | Konto auf |
| --- | --- |
| Kostenfreier Fernzugriff | [ioBroker.net](https://iobroker.net) |
| Sprachassistenten oder erweiterter Fernzugriff | [ioBroker.pro](https://iobroker.pro) |

Die Einrichtung ist unter [IoT](/docs/cloud/iot.md) Schritt für Schritt
beschrieben. Konditionen und Kontingente stehen in der
[Lizenzübersicht](/productoverview), bestellt wird auf der
[Preisseite von ioBroker.pro](https://iobroker.pro/www/pricing#remote).
