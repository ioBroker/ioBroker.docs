---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: +tbCESlGG5fdNULnJ0UmXUthVpC4zt2f2QJ+qUltyKA=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Anzahl der Installationen](http://iobroker.live/badges/philips-air-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Philips Luftreiniger-Adapter für ioBroker
Verbindet Philips Luftreiniger und ausgewählte Philips/Versuni Ventilatoren mit ioBroker.

**Getestet mit AC2729 und den Philips/Versuni Ventilatoren CX3550/01 und CX7550/01**, sollte aber auch mit neueren Luftreinigern funktionieren, die über lokales CoAP mit Verschlüsselung kommunizieren.

![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur Philips-Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendung
Geben Sie die IP-Adresse oder den Hostnamen Ihres Geräts ein. Sie finden diese Informationen in Ihrem Router, wo das Gerät häufig als `MiCO` angezeigt wird.
Die meisten Geräte sind über CoAP erreichbar, was die Standardeinstellung ist. Einige ältere Geräte, wie z. B. der AC2729 und der AC3829, antworten ausschließlich über HTTP. Sollte keine Verbindung hergestellt werden, ändern Sie das Protokoll in den Instanzeinstellungen.

Wählen Sie anschließend Ihr Gerätemodell aus, damit der Adapter die passenden Steuerelemente für Ihr Gerät erstellt. Falls Ihr Modell nicht in der Liste enthalten ist, wählen Sie `Generic`: Sie erhalten weiterhin alle schreibgeschützten Werte, jedoch keine modellspezifischen Steuerelemente.
Es kann vorkommen, dass ein Gerät nicht alle Variablen meldet; diese bleiben im Objektbaum leer. Rohwerte, die der Adapter nicht erkennt, werden unter `unknownStates` erfasst.

### Welches Gerätemodell soll ich auswählen?
| Ihr Gerät | Modell auswählen |
| --- | --- |
| AC2889 und die anderen klassischen Luftreiniger, zum Beispiel AC1214, AC2729, AC2939, AC3059 oder AC3829 | `AC2889` |
| Standventilator CX3550/01 | `CX3550` |
| Turmventilator CX7550/01 | `CX7550` |
| Alles andere, oder wenn Sie sich unsicher sind | `Generic` |
| Sonstiges oder falls Sie sich unsicher sind | `Generisch` |

Die klassischen Filter melden alle dieselben Klartextschlüssel (`pwr`, `om`, `mode` usw.), weshalb ein Eintrag die gesamte Familie abdeckt. Bisher auf folgenden Geräten bestätigt: AC2729, AC2889, AC3221, AC3829, CX3550/01 und CX7550/01.

Wenn Sie sich nicht sicher sind, verbinden Sie sich zuerst mit `Generic` und prüfen Sie die Rohschlüssel unter `unknownStates`: Einfache Namen wie `pwr` oder `pm25` bedeuten ein klassisches Gerät, Schlüssel wie `D03102` bedeuten ein Gerät der nächsten Generation. Falls sich Ihr Gerät als Modell der nächsten Generation herausstellt, das nicht in der Liste enthalten ist, erstellen Sie bitte ein Ticket mit einem Debug-Log – so wurden beispielsweise der CX7550/01 und der AC3221 hinzugefügt.

![Objekte](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Philips/Versuni CX3550/01 Lüfter
Der CX3550/01 wird über die lokale, verschlüsselte CoAP-Verbindung unterstützt. Es wird keine Cloud-API von Philips, Versuni oder HomeID verwendet.

Getestete Funktionen des CX3550/01:

- Ein-/Ausschalten
- Lüfterstufe 1, 2 und 3
- Schlafmodus
- Natürliche Brise
- Oszillation ein/aus
- Piepton ein/aus
- Statusablesung über lokales CoAP
- Timer-Statusanzeige

Die Timersteuerung wird für den CX3550/01 absichtlich nicht unterstützt. Lokale Timer-Schreibvorgänge können dazu führen, dass die Firmware `D03102` auf `0` setzt, wodurch der Lüfter abgeschaltet wird. Der Adapter stellt die Timerinformationen des CX3550/01 daher nur als schreibgeschützten Status bereit.

Weitere Einzelheiten sind in [docs/CX3550.md](docs/CX3550.md) dokumentiert.

## Philips/Versuni CX7550/01 Turmventilator
Der CX7550/01 ("Smart Tower Fan 7000 series") verwendet die gleiche lokale verschlüsselte CoAP-Verbindung, jedoch andere Rohwerte als der CX3550/01 - wählen Sie `CX7550` als Gerätemodell aus.

Getestete Funktionen des CX7550/01:

- Ein-/Ausschalten
- Lüfterstufen 1 bis 12 und AutoAdapt
- Schlafmodus
- Natürliche Brise
- Oszillation ein/aus
- Timer (aus, 1 bis 12 Stunden) - auf diesem Modell beschreibbar
- Piepton ein/aus
- Bildschirmhelligkeit, Farbtemperaturanzeige und was das Display permanent anzeigt
- Raumtemperatur

Weitere Einzelheiten sind in [docs/CX7550.md](docs/CX7550.md) dokumentiert.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-08-23)

- (tt-tom17) New "Device model" setting: pick your model so the adapter shows the correct controls for your device
- (tt-tom17) Added support for the AC3221 next-generation purifier (MatthiasBosch)
- (tt-tom17) Added support for the CX7550/01 tower fan (DrBakterius)
- (tt-tom17) The adapter now warns in the log when the selected model does not seem to match the connected device
- (tt-tom17) Values the adapter does not recognise are collected under "unknownStates"
- (tt-tom17) IMPORTANT: all state IDs starting with "cx" were renamed to generic names (for example "fanMode" instead of "cxFanMode"). Please select your device model once in the settings; the old "cx*" objects can be deleted manually
- (tt-tom17) Fixed switches that did nothing when a script or visualisation wrote them as the text "true"/"false" instead of a real on/off value
- (tt-tom17) Fixed devices connected via HTTP logging "Cannot parse: undefined" every time a command was sent; the device answer is now read correctly
- (tt-tom17) Fixed devices using the HTTP protocol (for example the AC3829 and AC2729) that stopped connecting in version 1.4.0 and only logged "fetch failed (UND_ERR_SOCKET)"; requests are sent the way these devices expect again

### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (mcm1957) Dependencies have been updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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