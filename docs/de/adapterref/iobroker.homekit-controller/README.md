---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-controller
hash: +2YzgHirnHHWaBtRjfXGg0pLsndjbJJuAgYkUoisYvA=
---
![Logo](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![Anzahl der Installationen (neueste)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/homekit-controller-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-controller
![Testen und freigeben](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Homekit-Controller-Adapter für ioBroker
Mit diesem Adapter können Sie Geräte mit dem „Works with HomeKit“-Logo, die mit Apple Home verwendet werden können, koppeln und direkt steuern. Der Adapter unterstützt IP/WLAN-Geräte und auch BLE (Bluetooth LE)-Geräte. Der Adapter arbeitet vollständig lokal in Ihrem Netzwerk.

### Der Adapter ist nicht ...
... das Angebot von ioBroker-Geräten oder -Zuständen, die von einer Apple Home-App / einem Apple Home-System gesteuert werden sollen. Wenn Sie diese Richtung wünschen, verwenden Sie bitte den Adapter [Jahka](https://github.com/jensweigele/ioBroker.yahka).

... unterstützt "nur" Thread-basierte Geräte. Die Homekit-Thread-Spezifikationen sind noch nicht öffentlich verfügbar. Nach aktuellem Kenntnisstand unterstützen alle Geräte auf dem Markt auch BLE oder WLAN, der Adapter wird also einfach nicht Thread sondern andere Wege zur Kommunikation nutzen.

### Verwendung des Adapters
Der Adapter lauscht auf verfügbare Geräte in Ihrem Netzwerk.

Es gibt drei "Typen" von erkannten Geräten:

* **Nicht gekoppelte Geräte** sind Geräte, die erkannt wurden und zum Koppeln verfügbar sind. Für diese Geräte werden in ioBroker einige Grundzustände generiert, die einige Informations- und Verwaltungszustände enthalten. Durch Angabe der PIN können Sie diese Geräte mit dieser Adapterinstanz koppeln (siehe Abschnitt „Koppeln“ weiter unten).
* **Mit dieser Instanz gekoppelte** Geräte können vollständig gesteuert werden, aktualisieren Zustandswerte in „Echtzeit“ mithilfe von Abonnements (nur IP-Geräte) und Datenabfrageintervall. Das Gerät kann auch von dieser Instanz „entkoppelt“ werden (siehe Abschnitt unten).
* **Mit jemand anderem gekoppelte** Geräte sind Geräte, die erkannt, aber bereits mit einem anderen Controller gekoppelt wurden. Diese werden im Debug-Modus protokolliert, aber es werden keine Zustände für sie erstellt. Wenn Sie sie mit ioBroker verwenden möchten, müssen Sie sie zuerst von ihrem aktuellen Controller entkoppeln (manchmal nur mit einem Hard-Reset oder ähnlichem möglich - siehe Handbuch) und danach sollten sie als "nicht gekoppeltes Gerät" angezeigt werden.

Nach dem Pairing werden die unterstützten Zustände aus dem Gerät ausgelesen und Objekte und Zustände angelegt. Alle bekannten Datenpunkte, die im HomeKit-Standard definiert sind, sollten menschenlesbar benannt werden. Wenn Sie UUIDs als Namen sehen, hat der Gerätehersteller selbst definierte Daten hinzugefügt. Wenn bekannt ist, was sie bieten, könnte dies dem Adapter hinzugefügt werden (z. B. wie die für Elgato-Geräte hinzugefügten), um in der nächsten Version wie benannt angezeigt zu werden.

Die Datenpunkte werden mit richtigen Zuständen und, falls vorhanden, auch richtigen Rollen angelegt. Andernfalls werden generische Rollen verwendet.

### Informationen identifizieren
Geräte, die mit keinem Controller gekoppelt sind, haben einen `admin.identify` Zustand, der mit `true` ausgelöst werden kann. In diesem Fall sollte sich das entsprechende Gerät identifizieren (z. B. sollte eine Lampe blinken oder ähnliches, damit es identifiziert werden kann). Diese Funktion ist nur verfügbar, solange das Gerät nicht mit einem Controller gekoppelt ist.

#### Kopplungsinformationen
Um das Gerät mit dieser Adapterinstanz zu koppeln, müssen Sie den Pin angeben, der auf dem Gerät angezeigt wird, oder ein Etikett oder ähnliches. Die PIN besteht aus 8 Zahlen neben einem QR-Code. Die Nummern müssen im Format 123-45-678 eingegeben werden (auch wenn die Bindestriche nicht auf dem Etikett gedruckt oder auf dem Bildschirm angezeigt werden!)

Im Moment muss die PIN in den Zustand admin.pairWithPin eingetragen werden - eine Admin-UI wird in Kürze folgen.

Nach dem Koppeln des Geräts mit dieser Instanz ist es NICHT möglich, das Gerät parallel auch zur Apple Home App oder dergleichen hinzuzufügen.

Es kann Fälle geben, die immer noch problematisch für die Kopplung sind, da ich nur mit sehr wenigen Geräten testen konnte, also melden Sie bitte Probleme, und ich werde Sie mit Anweisungen unterstützen, um die erforderlichen Debugging-Daten zu erhalten.

#### Informationen zum Entkoppeln
Zum Entkoppeln löst man einfach den `admin.unpair` Zustand mit "true" aus und der Unpair-Prozess wird ausgeführt - ein Admin UI folgt in Kürze.

#### Besondere Hinweise zur Verwendung von IP-Geräten
IP-Geräte werden mithilfe von UDP-Paketen erkannt, daher muss sich Ihr Host im selben Netzwerk wie die Geräte befinden. Daran führt derzeit kein wirklicher Weg vorbei, da der verwendete MDNS-Record wichtige Informationen für den Pairing-Prozess enthält.
Insbesondere bei der Verwendung von Docker müssen Sie Wege finden (Host-Modus, Macvlan, ...), um die UDP-Pakete anzuzeigen.

Die größte Herausforderung für WLAN-basierte IP-Geräte ohne Bedienelemente oder Bildschirm besteht darin, sie in Ihr WLAN-Netzwerk zu integrieren. Höchstwahrscheinlich gibt es eine herstellerspezifische mobile App, um die Geräte anfänglich zu Ihrem Netzwerk hinzuzufügen. Wenn dieser anfängliche Vorgang das Gerät auch mit Apple Home koppelt, müssen Sie es möglicherweise danach entkoppeln (z. B. https://www.macrumors.com/how-to/delete-homekit-device/). Danach sollte es sich in Ihrem WLAN befinden und für die Kopplung mit diesem Adapter verfügbar sein.

Sobald ein IP-Gerät gekoppelt ist und die IP gleich bleibt, verbindet sich der Adapter beim Start direkt mit dem Gerät. PIN also am besten die IP in deinem Router. Wenn sich die IP geändert hat, sollte die Verbindung bei der nächsten Erkennung hergestellt und die IP aktualisiert werden.

#### Besondere Hinweise zur Verwendung von BLE-Geräten
Standardmäßig ist BLE in den Adaptereinstellungen deaktiviert. Nach der Aktivierung können die erreichbaren Geräte erkannt werden.

Aufgrund der Einschränkungen von Bluetooth-Geräten sind keine "Echtzeit-Updates" von Zustandsänderungen verfügbar. Die Geräte melden "wichtige Zustandsänderungen" (z. B. die "Ein"-Zustandsänderungen) durch spezielle Pakete, die eine sofortige Datenaktualisierung auslösen. Zusätzlich werden die Daten in den definierten Datenabfrageintervallen aktualisiert. Stellen Sie sie nicht zu kurz ein!

Nach einem Neustart des Adapters können Bluetooth-Geräte nicht direkt verbunden werden - das System muss mindestens ein Erkennungspaket vom Gerät erhalten, um die erforderlichen Verbindungsdetails zu erhalten. Dies bedeutet, dass BLE-Geräte möglicherweise etwas verzögert verfügbar sind.

### Fehlerbehebung
#### Bekannte inkompatible Geräte
Wenn Sie Probleme haben, das Gerät mit diesem Adapter zu koppeln, versuchen Sie bitte, es mit der normalen iOS Apple Home App zu koppeln. Wenn dies nicht funktioniert, dann ist etwas komisch mit dem Gerät und dann kann auch dieser Adapter nicht helfen. Versuchen Sie einen Reset, aber sonst gibt es keine Chance.

Dies ist z.Zt. bei einigen `Tado Door Locks` so. Sie müssen mit `Tado App` gekoppelt werden, wodurch das Gerät irgendwie in Apple Home registriert wird, jedoch nicht über einen offiziellen Kopplungsprozess.

Außerdem können `Nuki 3 Locks (BLE)` nicht gekoppelt werden, da sie Hardware-Authentifizierungskomponenten verwenden, die von Apple nicht öffentlich dokumentiert sind.

Für Netatmo hat ein Benutzer herausgefunden, wie eine Kopplung möglich sein könnte, wenn es Probleme gab. Siehe https://github.com/Apollon77/ioBroker.homekit-controller/issues/233#issuecomment-1311983379

#### Andere potenzielle Probleme, die Sie vor dem Öffnen eines Tickets überprüfen sollten
##### Für BLE-Geräte
* Wenn Sie Probleme haben, dass die BLE-Verbindung nicht funktioniert oder Sie Fehler erhalten, wenn der Adapter versucht, die BluetoothLE-Verbindung zu initialisieren, führen Sie bitte zuerst „iobroker fix“ aus, um sicherzustellen, dass alle Berechtigungen und erforderlichen Funktionen richtig eingestellt sind.
* Wenn dies nicht hilft, überprüfen Sie bitte https://github.com/noble/noble#running-on-linux
* Bitte stellen Sie sicher, dass Ihr System auf dem neuesten Stand ist, einschließlich Kernel `apt update && apt dist-upgrade`
* Versuchen Sie, das entsprechende BLE-Gerät mit z. `sudo hciconfig hci0 zurücksetzen`
* Geben Sie bei Problemen auch die Ausgabe von `uname -a` und `lsusb` an
* Low-Level-BLE-Geräteprotokoll kann mit `sudo hcidump -t -x >log.txt` abgerufen werden (in einer zweiten Shell zusätzlich zum Ausführen des Adapters)

##### Allgemeine Hinweise
* Verfügt das Gerät über einen Pairing-Modus oder einen solchen, der zuerst aktiviert werden muss? Aber lesen Sie auch das Handbuch sorgfältig durch, vielleicht ist der Pairing-Modus für ein anderes Legacy-Protokoll oder eine Bridge, aber nicht für Apple Home.
* Wenn beim Pairing-Versuch der Fehler „Pair-Setup-Merkmale nicht gefunden“ auftritt, unterstützt das Gerät im Grunde genommen das Pairing über Homekit in seinem aktuellen Zustand nicht. Da kann der Adapter nichts machen!
* Bitte achten Sie darauf, die PIN mit Bindestrichen in der Form „XXX-XX-XXX“ einzugeben. Andere Formate sollten von der Bibliothek bereits mit einem Fehler abgelehnt werden, aber nur um sicherzugehen

## Debugging
Wenn Sie Probleme haben und ein Problem melden möchten (siehe unten), ist das erweiterte Debug-Protokoll immer hilfreich.

* Bitte stoppen Sie die Adapterinstanz im iobBroker Admin
* Öffnen Sie eine Shell auf dem entsprechenden Server
* Starten Sie den Adapter manuell mit `DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs`
* Tun Sie dann, was auch immer den Fehler verursacht, und holen Sie sich das Protokoll von der Shell und posten Sie es mit dem Problem.
* Poste auch das Konsolenprotokoll in der Ausgabe. Dadurch wird ein Protokoll auf Protokollebene generiert.
* Suchen Sie außerdem das relevante Objekt auf der Admin-Registerkarte "Objekte", klicken Sie rechts auf den Bleistift und geben Sie den JSON des Objekts an.

### Ressourcen und Links
* Ressource, die versucht, Sonderzustände von „Elgato“ zu entschlüsseln: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

### MACHEN
* Überprüfen Sie, wie der Adapter mit Tasten funktioniert (sie haben keinen Status, und ich besitze kein solches Gerät. Benötige Unterstützung dafür)
* Suchen Sie nach unterstützenden Videogeräten
* Schauen Sie sich Support-Geräte an, die Bilder anbieten (Methode ist da, aber nie in Aktion gesehen)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.6 (2023-01-05)
* (Apollon77) Upgrade noble library

### 0.5.5 (2022-12-31)
* (Apollon77) Downgrade noble library again

### 0.5.3 (2022-12-22)
* (bluefox) Corrected active TAB Background

### 0.5.2 (2022-12-22)
* (bluefox) Updated GUI packages
* (Apollon77) Upgraded noble BLE library

### 0.5.1 (2022-06-10)
* (Apollon77) Optimizations for BLE connections

### 0.5.0 (2022-06-08)
* (Apollon77) Add Connection identifier for Admin object list
* (Apollon77) Count polling errors and reinitialize device connection when too many errors occur
* (Apollon77) Optimize adapter startup to prevent double initialization of devices

### 0.4.4 (2022-05-06)
* (Apollon77) Add Host header to HTTP devices to prevent issues with some devices
* (Apollon77) Fix several edge case issues

### 0.4.3 (2022-01-25)
* (Apollon77) make sure all connections get closed on reconnect

### 0.4.2 (2022-01-25)
* (Apollon77) Reset HTTP connection if timeouts happen on data polling

### 0.4.1 (2022-01-21)
* (Apollon77) Optimize close of connections on adapter stop

### 0.4.0 (2022-01-21)
* (Apollon77) performance increase by using persistent connections to IP devices and many more optimizations
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing of concurrent requests
* (Apollon77) Optimize value update handling and better detect stale data to force an update on next polling

### 0.3.3 (2021-10-26)
* (bluefox) Fix the Discovery checkboxes

### 0.3.1 (2021-10-25)
* (Apollon77) Fix datatype of lastDiscovered state

### 0.3.0 (2021-10-24)
* (Apollon77) BREAKING CHANGE: All channel names will be changed and a number gets added at the end of the name. Please manually delete the ones without such a number

### 0.2.0 (2021-10-23)
* (bluefox) Add Admin UI
* (Apollon77) Store pairing data additionally in an instance directory and retry them on start if objects where deleted or such
* (Apollon77) Add info.lastDiscovered state with a timestamp to allow manual cleanup of devices that are paired somewhere else then with the adapter instance (because such objects would currently not be deleted)
* (Apollon77) Add missing device and channel objects
* (Apollon77) Always convert bool-type to boolean because it might be numbers coming from the devices
* (Apollon77) sort devices for Admin UI to have those with available actions on top
* (Apollon77) Enhance error messages
* (Apollon77) Adjust some roles

### 0.1.0 (2021-10-19)
* (Apollon77) Optimizations and added some Elgato states
* (Apollon77) Initial GitHub release

### 0.0.x
* (Apollon77) Initial commit and Alpha GitHub testing

## License
MIT License

Copyright (c) 2021-2023 Ingo Fischer <github@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.