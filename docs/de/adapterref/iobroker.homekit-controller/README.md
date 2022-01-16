---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-controller
hash: NQucAtiQUOyd1k9Pgl1FFdssx3fMn5PPmENuplDEnWQ=
---
![Logo](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![Anzahl der Installationen (neueste)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/homekit-controller-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-controller
![Testen und freigeben](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Homekit-Controller-Adapter für ioBroker
Mit diesem Adapter können Sie Geräte mit dem „Works with HomeKit“-Logo, die mit Apple Home verwendet werden können, koppeln und direkt steuern. Der Adapter unterstützt IP/WLAN-Geräte und auch BLE (Bluetooth LE)-Geräte. Der Adapter arbeitet vollständig lokal in Ihrem Netzwerk.

### Der Adapter ist nicht ...
... ioBroker-Geräte oder -Zustände anzubieten, die von einer Apple Home-App / einem Apple Home-System gesteuert werden sollen. Wenn Sie diese Richtung wünschen, verwenden Sie bitte den Adapter [Jahka](https://github.com/jensweigele/ioBroker.yahka).

... Thread-basierte Geräte unterstützen. Die Homekit-Thread-Spezifikationen sind noch nicht öffentlich verfügbar.

### Verwendung des Adapters
Der Adapter lauscht auf verfügbare Geräte in Ihrem Netzwerk.

Es gibt drei "Typen" von erkannten Geräten:

* **Nicht gekoppelte Geräte** sind Geräte, die erkannt wurden und zum Koppeln verfügbar sind. Für diese Geräte werden in ioBroker einige Grundzustände generiert, die einige Informations- und Verwaltungszustände enthalten. Durch Angabe der PIN können Sie diese Geräte mit dieser Adapterinstanz koppeln (siehe Abschnitt „Koppeln“ weiter unten).
* **Mit dieser Instanz gekoppelte** Geräte können vollständig gesteuert werden, aktualisieren Zustandswerte in „Echtzeit“ mithilfe von Abonnements (nur IP-Geräte) und Datenabfrageintervall. Das Gerät kann auch von dieser Instanz „entkoppelt“ werden (siehe Abschnitt unten).
* **Mit jemand anderem gekoppelte** Geräte sind Geräte, die erkannt, aber bereits mit einem anderen Controller gekoppelt wurden. Diese werden im Debug-Modus protokolliert, aber es werden keine Zustände für sie erstellt. Wenn Sie sie mit ioBroker verwenden möchten, müssen Sie sie zuerst von ihrem aktuellen Controller entkoppeln (manchmal nur mit einem Hard-Reset oder ähnlichem möglich - siehe Handbuch) und danach sollten sie als "nicht gekoppeltes Gerät" angezeigt werden.

Nach dem Pairing werden die unterstützten Zustände aus dem Gerät ausgelesen und Objekte und Zustände angelegt. Alle bekannten Datenpunkte, die im HomeKit-Standard definiert sind, sollten menschenlesbar benannt werden. Wenn Sie UUIDs als Namen sehen, hat der Gerätehersteller selbst definierte Daten hinzugefügt. Wenn bekannt ist, was sie bieten, könnte dies dem Adapter hinzugefügt werden (z. B. wie die für Elgato-Geräte hinzugefügten), um in der nächsten Version wie benannt angezeigt zu werden.

Die Datenpunkte werden mit richtigen Zuständen und, falls vorhanden, auch richtigen Rollen angelegt. Andernfalls werden generische Rollen verwendet.

### Informationen identifizieren
Geräte, die mit keinem Controller gekoppelt sind, haben einen admin.identify-Zustand, der mit „true“ ausgelöst werden kann. In diesem Fall sollte sich das betreffende Gerät identifizieren (z. B. sollte eine Lampe blinken oder ähnliches, damit es identifiziert werden kann). Diese Funktion ist nur verfügbar, solange das Gerät nicht mit einem Controller gekoppelt ist.

#### Kopplungsinformationen
Um das Gerät mit dieser Adapterinstanz zu koppeln, müssen Sie den Pin angeben, der auf dem Gerät angezeigt wird, oder ein Etikett oder ähnliches. Die PIN besteht aus 8 Zahlen neben einem QR-Code. Die Nummern müssen im Format 123-45-678 eingegeben werden (auch wenn die Bindestriche nicht auf dem Etikett gedruckt oder auf dem Bildschirm angezeigt werden!)

Im Moment muss die PIN in den Zustand admin.pairWithPin eingetragen werden - eine Admin-UI wird bald folgen.

Nach dem Koppeln des Geräts mit dieser Instanz ist es NICHT möglich, das Gerät parallel auch zur Apple Home App oder dergleichen hinzuzufügen.

Es kann Fälle geben, die immer noch problematisch für die Kopplung sind, da ich nur mit sehr wenigen Geräten testen konnte. Melden Sie daher bitte Probleme, und ich werde Sie mit Anweisungen unterstützen, um die erforderlichen Debugging-Daten zu erhalten.

#### Informationen zum Entkoppeln
Zum Entkoppeln lösen Sie einfach den "admin.unpair"-Zustand mit "true" aus und der Unpair-Prozess wird ausgeführt - eine Admin-Benutzeroberfläche wird in Kürze folgen.

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
Pairing mModus bringen PIN mit Bindestrichen eingeben

BLE: iobroker-Fix

https://github.com/noble/noble#running-on-linux

Adapterinstanz stoppen im Admin mach eine Shell auf den Rechner DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs Dann im Admin in de Adapter Konfig gehen ( adapter nicht dort nochmal starten ... der läuft schon auf der Kommendozeile) und einmal pairen und warten bis wieder fehler kommt und so Dann Log von der Shell bitte posten. Da sollte mehr drin sein. gerne als Datei hier anhängen Zusätzlich bitte im Admin unter Objekte mal das Device Objekt sichten von dem Gerät und da rechts auf den Stift klicken und auch das JSON posten was da angezeigt wird unter "Raw" oder so

Pair-Setup-Merkmal nicht gefunden

https://forum.iobroker.net/post/726590

### Ressourcen und Links
* Ressource, die versucht, Elgato-Sonderzustände zu dekodieren: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

### MACHEN
* Überprüfen Sie, wie der Adapter mit Tasten funktioniert (sie haben keinen Status, und ich besitze kein solches Gerät. Benötige Unterstützung dafür)
* Suchen Sie nach unterstützenden Videogeräten
* Sehen Sie sich Support-Geräte an, die Bilder anbieten
* Überprüfen Sie alle Fälle, in denen sich Polling-Updates überschneiden könnten - Feedback erforderlich, wenn es Probleme gibt

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing concurrent requests
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

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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