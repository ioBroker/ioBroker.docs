---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.harmony/README.md
title: ioBroker.harmony
hash: Icl1F6peKW51uwhYKAdA5qdghRDGZaAd6LxPWJyryP0=
---
![Logo](../../../en/adapterref/iobroker.harmony/admin/harmony.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.harmony)
![Downloads](https://img.shields.io/npm/dm/iobroker.harmony.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.harmony)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/harmony/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.harmony)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.harmony/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.harmony)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.harmony)
![NPM-Version](http://img.shields.io/npm/v/iobroker.harmony.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/harmony-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/harmony-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.harmony/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.harmony/actions/workflows/codeql.yml/badge.svg)

# ioBroker.harmony

**Version:**

**Tests:**

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## ioBroker Logitech Harmony Adapter

Der Logitech Harmony Adapter integriert einen oder mehrere Logitech Harmony Hubs in ein ioBroker-System.

Ein Logitech Harmony Hub kann eine Vielzahl von Unterhaltungselektronik- und Smart-Home-Geräten steuern. Über den Hub kann ioBroker Aktivitäten starten und stoppen, den Status einer Aktivität auslesen und Geräte durch virtuelle Tastendrücke fernsteuern.

![Harmony Hub](../../../en/adapterref/iobroker.harmony/media/harmony_850.jpg "Logitech Harmony Hub mit der Harmony Elite Fernbedienung")

## Überblick

### Logitech Harmony

Logitech Harmony ist mit über 270.000 Unterhaltungs- und Smart-Home-Geräten kompatibel. Dazu gehören Fernseher und Kabelreceiver, Disc-Player und Spielekonsolen bis hin zu AV-Receivern und Streaming-Media-Playern sowie intelligenter Beleuchtung, Türschlössern, Thermostaten und vielem mehr.

Mit Logitech Harmony können Sie Programme wechseln, die Lautstärke anpassen, Favoriten definieren und Beleuchtung sowie andere Smart-Geräte steuern. Das Highlight des Systems ist die Möglichkeit, Aktionen zu erstellen, die mehrere Geräte mit einem einzigen Tastendruck steuern.

1. Der Logitech Harmony Hub verbindet sich über WLAN mit dem Heimnetzwerk.
2. Harmony-Hubs besitzen keinen Ethernet-Anschluss.
3. Der Hub unterstützt ausschließlich das 2,4-GHz-WLAN-Band. Das 5-GHz-Band wird nicht unterstützt.
4. Es sollte ein 802.11 g/n-Router verwendet werden. 802.11 a/b wird nicht unterstützt.
5. Als Wi-Fi-Verschlüsselung unterstützt der Hub WEP 64/128, WPA Personal und WPA2-AES.
6. UPnP muss nicht aktiviert sein, damit die Harmony-App den Hub findet und mit ihm kommuniziert. Es muss jedoch aktiviert sein, damit der Hub selbst andere Geräte im Netzwerk finden und mit ihnen zusammenarbeiten kann – dies betrifft Geräte wie Philips Hue, Sonos, Nest, Roku oder Smart-TVs.
7. Die maximale Anzahl an Geräten pro Hub beträgt 8. Bis zu 15 Geräte sind möglich, wenn mindestens ein Harmony Touch oder Ultimate One als Fernbedienung am Hub registriert ist.
8. Die maximale Anzahl an Lieblingskanälen pro Mobilgerät beträgt 50.

### Der Logitech Harmony Adapter

Der Logitech Harmony Adapter findet automatisch jeden Logitech Harmony Hub, der sich über eine Wi-Fi-Verbindung im selben Netzwerk-Subnetz wie der ioBroker-Server befindet.

Die Objekte zum Auslösen von Gerätefunktionen und -aktivitäten (Befehlsmakros) werden vom Adapter automatisch in ioBroker erstellt. Der aktuelle Status des Hubs ist ebenfalls verfügbar. Durch Schreiben oder Lesen der erstellten Objekte kann deren Status geändert und somit Aktionen ausgelöst oder abgefragt werden.

## Voraussetzungen vor der Installation

Geräte und Aktivitäten können weder über den ioBroker-Adapter für das Logitech Harmony-System erstellt noch geändert werden. Bevor der Adapter verwendet wird, muss das Fernsteuerungssystem daher gemäß der Logitech-Anleitung eingerichtet werden und mit den gesteuerten Geräten kompatibel sein.

## Installation

Eine Instanz des Adapters wird über die ioBroker-Administrationsoberfläche installiert. Eine detaillierte Beschreibung der erforderlichen Installationsschritte finden Sie **[hier](https://www.iobroker.net/#en/documentation/admin/adapter.md)** .

Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

## Konfiguration

Der Adapter findet selbstständig alle Harmony-Hubs im Subnetz des ioBroker-Servers. In den meisten Installationen ist keinerlei Konfiguration erforderlich.

### Das Fenster "Logitech Harmony Adaptereinstellungen"

| Feld                      | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Netzwerkschnittstelle** | Die Schnittstelle, auf der der Adapter sucht. Auf Hosts mit mehreren Netzwerken (mehrere Netzwerkkarten, Docker, VPN) wählen Sie die richtige Schnittstelle aus, damit sowohl Broadcast als auch Antwort des Hubs diese verwenden. Die Broadcast-Adresse wird von dieser Schnittstelle abgeleitet, daher funktionieren auch andere Subnetzmasken als /24 (#331). Lassen Sie das Feld leer, um auf allen Schnittstellen zu suchen – dies ist die empfohlene Einstellung für die meisten Installationen. |
| **Entdeckungsintervall**  | Wie oft eine Erkennungsnachricht gesendet wird. Der Standardwert beträgt 2000 ms, der kleinste zulässige Wert ist 500 ms.                                                                                                                                                                                                                                                                                                                                                                              |
| **Manuelle Hub-IPs**      | Eine optionale Liste von Hub-Adressen. Sobald diese Liste mindestens einen Eintrag enthält, kontaktiert der Adapter genau diese Adressen und überspringt den Broadcast vollständig. Verwenden Sie diese Liste, wenn sich ein Hub in einem anderen Subnetz als ioBroker befindet oder wenn Broadcast-Verkehr in Ihrem Netzwerk blockiert ist (#147).                                                                                                                                                    |

Nach Abschluss der Konfiguration wird im Konfigurationsdialog Folgendes angezeigt:`SAVE AND CLOSE` Der Adapter wird anschließend neu gestartet.

Bei Instanzen, die von Version 2.1.0 oder älter aktualisiert wurden, wird die entfernte Einstellung _„Discovery-Subnets“_ beim ersten Start automatisch migriert: Eine Adresse, die die Broadcast-Adresse einer Ihrer Schnittstellen ist, wählt diese Schnittstelle aus; jede andere Adresse wird zu einer manuellen Hub-IP-Adresse. Der Adapter protokolliert die Konvertierungen.

## Instanzen

Durch die Installation des Adapters wurde eine aktive Instanz des Logitech Harmony Hub-Adapters erstellt.`Instances` Abschnitt.

![Beispiel](../../../en/adapterref/iobroker.harmony/media/a_harmony_instanz.png "Erstes Vorkommen")

Auf einem ioBroker-Server kann nur eine Instanz des Logitech Harmony-Adapters installiert werden.

Ob der Adapter aktiviert und mit dem Logitech Harmony Hub verbunden ist, wird durch die Farbe des Statusfelds der Instanz angezeigt. Wenn der Mauszeiger über das Symbol bewegt wird, werden weitere Details angezeigt.

## Objekte des Adapters

Im`Objects` In diesem Abschnitt werden alle Geräte und Aktivitäten, die der Adapter im Hub gefunden hat, baumartig aufgelistet. Zusätzlich geben die Objekte Auskunft darüber, ob die Kommunikation mit dem Hub reibungslos funktioniert.

![Objekte](../../../en/adapterref/iobroker.harmony/media/a_harmony_objekte.png "Objekte des Harmony-Adapters")

Jeder Zustand wird zusammen mit seinem Datentyp und seinen Berechtigungen aufgelistet. Berechtigungen können Lese- (R) oder Schreibberechtigungen (W) sein. Jeder Zustand ist mindestens lesbar (R), einige auch beschreibbar. Um einen bestimmten Zustand zu finden, empfiehlt sich die Suche mit der Tastenkombination „Strg + F“.

| Objekt                      | Zugang | Beschreibung                                                                                                       |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| **Harmonie.0**              | R      | Name des ersten _Exemplars_ des Logitech Harmony-Adapters                                                          |
|  **Harmony Hub**            | R      | Name des _Hubs_                                                                                                    |
|   **Apple TV Generation 3** | R      | Name eines _Geräts_ , enthält die Gerätefunktionen                                                                 |
|   **Denon AV-Empfänger**    | R      | Name eines _Geräts_ , enthält die Gerätefunktionen                                                                 |
|   **:**                     | R      | Weitere _Geräte_                                                                                                   |
|   **Aktivitäten**           | R      | Liste aller im Harmony-Hub programmierten _Aktivitäten_                                                            |
|   _**Hub blockiert**_       | R      | Zeigt an, ob der Hub momentan ausgelastet ist, d. h. eine Aktivität startet oder beendet oder einen Befehl sendet. |
|   _**Hub verbunden**_       | R      | Status der Verbindung zwischen Adapter und Hub                                                                     |

`hubBlocked` Und`hubConnected` Sie sind schreibgeschützt, das Schreiben in sie hat keine Auswirkung.

### Gerätefunktionen

Wird ein Gerät geöffnet, wird eine Liste mit allen zugehörigen Funktionen angezeigt. Diese Gerätefunktionen sind gerätespezifisch und unterscheiden sich daher zwischen verschiedenen Gerätetypen.

![Gerät](../../../en/adapterref/iobroker.harmony/media/a_harmony_geraet.png "Gerätefunktionen")

#### Auslösen einer Gerätefunktion

Jede Gerätefunktion`{instance}.{hub name}.{device}.{device function}` Löst die entsprechende Reaktion des angesprochenen Geräts aus. Die Werte der Gerätefunktionen können gelesen und geschrieben werden. Die Auslösung kann durch Klicken auf das Glockensymbol rechts neben der Funktion mit dem Mauszeiger getestet werden. Alternativ kann dort mit dem Stiftsymbol ein Wert eingegeben werden.

Die Werte haben die Einheit`milliseconds` Wird ein Wert zwischen 1 und 250 ms eingegeben, sendet der Harmony-Hub üblicherweise einen einzelnen Tastendruck der angegebenen Länge. Werte über 250 ms können dazu führen, dass die Gerätefunktion mehrmals ausgelöst wird.

Nachdem die Gerätefunktion ausgelöst wurde, ändert sich der Wert wieder auf 0.

### Aktivitäten

Alle im Harmony Hub angebotenen Aktivitäten sind unten aufgeführt.`activities` Die

![Aktivitäten](../../../en/adapterref/iobroker.harmony/media/a_harmony_activities.png "Aktivitäten")

#### Eine Aktivität starten

Eine Aktivität wird gestartet, indem bei der Aktivität eine Zahl größer als 0 eingegeben wird.`{instance}.{hub name}.activities.{activity}` Während die Aktivität ausgeführt wird, ändert sich dieser Wert zuerst auf 1 (= Start) und dann auf 2 (= aktiv).

#### Eine Aktivität beenden

Laufende Aktivitäten werden gestoppt, indem ihr Wert auf 0 gesetzt wird. Alternativ kann im Objekt eine beliebige Zahl eingegeben werden.`{instance}.{hub name}.activities.currentStatus` Die laufende Aktivität wird gestoppt. Während die Aktivität gestoppt wird,`{instance}.{hub name}.activities.currentStatus` Änderungen von 3 (= Stopp) auf 0 (= inaktiv).

#### Weitere Statuswerte

`{instance}.{hub name}.activities.currentActivity` Gibt die aktuell laufende Aktivität als Zeichenkette zurück.

`{instance}.{hub name}.activities.currentStatus` Zeigt den Status des Harmony-Hubs an. Die Werte bedeuten Folgendes:

- 0 = inaktiv
- 1 = Start
- 2 = aktiv
- 3 = Stopp

`{instance}.{hub name}.activities.{activity}` zeigt den Status einer einzelnen Aktivität an. Die Bedeutung der Werte ist dieselbe wie für`{instance}.{hub name}.activities.currentStatus` Die

## Deinstallation

Soll die Instanz erneut entfernt werden, wird sie mit dem ihr zugewiesenen Papierkorbsymbol gelöscht.`Instances` Abschnitt.

![Löschen](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_01.png)

Es erscheint eine Bestätigungsaufforderung, die mit _**OK**_ bestätigt werden muss.

![Delete2](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_02.png)

Anschließend erscheint erneut ein Fenster, das den Ablauf der Deinstallationsbefehle anzeigt.

![Löschen3](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_03.png)

Durch diese Deinstallation werden alle zur Instanz gehörenden Objekte vollständig entfernt.

Sollen die Installationsdateien vollständig vom Host gelöscht werden, muss dies über das Papierkorbsymbol in der Kachel des Harmony-Adapters erfolgen.`Adapters` Abschnitt.

## Häufig gestellte Fragen

1. **Die Verbindung zum Hub wird immer wieder unterbrochen.**

   Der Harmony-Hub benötigt eine stabile Funkverbindung zur Kommunikation mit dem Adapter. Die Verwendung eines WLAN-Zugangspunkts in unmittelbarer Nähe des Hubs wird empfohlen.

2. **Wie lässt sich am einfachsten ein „Alles aus“-Schalter über ioBroker implementieren?**

   Satz`{instance}.{hub name}.activities.currentStatus` auf 0.

3. **Unter Windows wird die Meldung angezeigt`ERR! code ENOGIT` Während der Installation des Adapters tritt ein Fehler auf, und der Adapter funktioniert nicht.**

   Laden Sie GIT von der Website <https://git-scm.com/download/win> herunter und installieren Sie es, bevor Sie den Harmony-Adapter installieren.

4. **Unter Linux wird die Meldung angezeigt`ERR! code ENOGIT` Während der Installation des Adapters tritt ein Fehler auf, und der Adapter funktioniert nicht.**

   Installieren Sie GIT über die Befehlszeile mit`sudo apt install git` vor der Installation des Harmony-Adapters.

5. **Skripte funktionieren nicht mehr mit neueren Versionen des Adapters.**

   Ab Version 0.9.1 des Adapters werden Objekte anders benannt.`harmony.0.Harmony_Hub` wurde`harmony.0.Harmony Hub` Beispielsweise sollten Sie die Objekte überprüfen und die darauf aufbauenden Komponenten, wie etwa Skripte, entsprechend anpassen.

   Ab Version 3.0.0 wird jeder Punkt in Hub-, Aktivitäts-, Geräte- und Befehlsnamen durch einen Punkt ersetzt.`_` Nicht nur der erste. Staaten, deren Name einen Punkt enthielt, werden unter der neuen ID neu erstellt, daher müssen auch Skripte, VIS-Ansichten und Aliase, die auf solche Staaten verweisen, angepasst werden.

6. **Das WLAN schaltet sich nachts automatisch ab. Nach dem erneuten Einschalten des WLANs verbindet sich der Adapter nicht automatisch wieder mit dem Hub.**

   Fügen Sie einen automatischen Neustart der Harmony-Instanz (Expertenmodus) etwa 5-10 Minuten nach dem Start des WLAN-Routers hinzu.

7. **Der Hub wurde nicht gefunden.**

   Prüfen Sie, ob sich der Hub tatsächlich im selben Netzwerk-Subnetz und VLAN wie der ioBroker-Server befindet. Sind Multicast-Übertragungen erlaubt oder werden sie vom Router gefiltert? Leuchtet die Status-LED am Hub grün? Ist der Hub über die Logitech-App erreichbar? Befolgen Sie die Anweisungen von Logitech, um Verbindungsprobleme zu beheben.

   Befindet sich der Hub in einem anderen Subnetz oder ist der Broadcast-Verkehr in Ihrem Netzwerk blockiert, geben Sie seine Adresse unter **„Manuelle Hub-IPs“** in den Instanzeinstellungen ein.

8. **Es kann nur eine Instanz des Adapters installiert werden.**

   Auf einem ioBroker-Server kann nur eine Instanz des Logitech Harmony-Adapters installiert werden.

## Beispiele

### JavaScript

Auslösende Gerätefunktionen. Hier wird der Denon AV-Receiver ein- oder ausgeschaltet, wenn sich der Wert eines anderen Zustands ändert.

```javascript
if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == true) {
  setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  // control switch == ON: switch without delay
} else if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == false) {
  // control switch == OFF: switch with a delay
  var timeout = setTimeout(function () {
    setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  }, 1000);
}
```

### Blockly

Auslösende Gerätefunktionen. Hier wird der Denon AV-Receiver ein- oder ausgeschaltet, wenn sich der Wert eines anderen Zustands ändert.

![Blockly](../../../en/adapterref/iobroker.harmony/media/a_hamony_simple_blockly.jpg "Blockly")

[Quellcode](https://github.com/iobroker-community-adapters/ioBroker.harmony/blob/master/media/a_harmony_blockly.xml)

## Links

- Herstellerseite <https://www.logitech.com/de-de/product/harmony-hub>

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2026-08-06)
- (copilot) Adapter requires node.js >= 22 now
- (krobipd) State ID sanitisation hardened — tab/newline and other whitespace in hub-supplied device names no longer crash subscribe (#98). Dots are also collapsed so labels cannot split the ID path. Empty results fall back to `unnamed`.
- (krobipd) Async event handlers (`stateChange`, hub discovery, client online/offline/state) now have proper error handling — a single failing await no longer terminates the adapter with an unhandled promise rejection.
- (krobipd) Existing activities are now correctly recognised on every restart — the inverted `if` in `initHub` left the bookkeeping empty and made every activity log as `Added new activity` after each adapter start. As a side effect, activities deleted on the hub are now also pruned from the state tree, and the per-activity `-control` state is no longer falsely flagged as stale during the cleanup pass.
- (GermanBluefox) **Breaking:** the `Discovery-Subnets` setting was replaced by a network interface selector plus a manual hub list. Existing instances are migrated automatically on first start — a directed broadcast address selects the matching interface, any other address is carried over as a manual hub IP. The conversion is written to the log and runs exactly once.
- (GermanBluefox) **Breaking:** dots in hub, activity, device and command names are now replaced by `_` throughout, not just the first one. States whose name contained a dot are recreated under the new ID and the outdated objects are removed on the next hub sync. Adapt scripts, VIS views and aliases that referenced such states.
- (GermanBluefox) Discovery now restarts by itself after a socket error, with a delay growing from 30 s to at most 5 min, instead of staying silently dead until the adapter is restarted.
- (GermanBluefox) A single unreachable address no longer stops discovery for every other hub — send failures are logged per address.
- (GermanBluefox) A broadcast address entered in the manual hub list works again instead of failing with `EACCES` on every ping.
- (GermanBluefox) Dependencies updated: TypeScript 6, `@tsconfig/node22`, `@iobroker/adapter-core` 3.4.3, `@iobroker/testing` 5.3.0. The unused `sinon-chai` and `chai-as-promised` test helpers are gone.
- (GermanBluefox) `npm run build` and `npm run check` compile without errors again. The sources carried 26 strict-mode violations — unguarded `null` accesses on hub clients and discovery sockets, `Array.pop()` results used as strings, and `delete` on properties typed as required — none of which were caught because the scripts had been failing for a while.
- (GermanBluefox) `npm run lint` works again. It reported nothing but parse errors on every file (`project` and `projectService` were both enabled), and `allowDefaultProject` sat outside `projectService`, so no rule ever ran. An unused `tsconfig.json` left over from the vendored discovery library was shadowing the real one for everything under `src/discover/` and hid the Node.js types from the linter.

### 2.1.0 (2026-04-15)
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.0.5 (2026-02-06)
* (@GermanBluefox) Corrected the type of value

### 2.0.4 (2026-01-29)
* (@brkai) Trying to fix the activities

### 2.0.3 (2025-11-04)
* (@GermanBluefox) Corrected the table in the configuration

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2019 Pmant <patrickmo@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.harmony/blob/master/CHANGELOG_OLD.md)