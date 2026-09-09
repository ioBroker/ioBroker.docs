---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: ENcrYFNIRGq/6OpXnVs2KH18T9+lTJ+upbJRh+rCIYQ=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Anzahl der Installationen](http://iobroker.live/badges/philips-air-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# ioBroker.philips-air

![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg)
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Einzelheiten und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Philips Luftreiniger-Adapter für ioBroker

Verbindet Philips Luftreiniger und ausgewählte Philips/Versuni Ventilatoren mit ioBroker.
**Getestet mit AC2729 und den Philips/Versuni-Lüftern CX3550/01 und CX7550/01**, sollte aber mit neueren Luftreinigern funktionieren, die über lokales CoAP mit Verschlüsselung kommunizieren.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur Philips-Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendung

Geben Sie die IP-Adresse oder den Hostnamen Ihres Geräts ein. Sie finden diese Informationen in Ihrem Router, wo das Gerät häufig unter folgendem Namen angezeigt wird: `MiCO`Die meisten Geräte sind über CoAP erreichbar, was die Standardeinstellung ist. Einige ältere Geräte, wie z. B. der AC2729 und der AC3829, antworten nur über HTTP. Falls keine Verbindung hergestellt werden kann, ändern Sie das Protokoll in den Instanzeinstellungen. Wählen Sie anschließend Ihr Gerätemodell aus, damit der Adapter die passenden Steuerelemente für Ihr Gerät erstellt. Falls Ihr Modell nicht in der Liste enthalten ist, wählen Sie `Generic`Sie erhalten weiterhin alle schreibgeschützten Werte, jedoch keine modellspezifischen Steuerelemente. Es kann vorkommen, dass ein Gerät nicht alle Variablen meldet; diese bleiben im Objektbaum leer. Rohwerte, die der Adapter nicht erkennt, werden unter folgendem Pfad gesammelt: `unknownStates`.

### Die beiden Zeiteinstellungen

Beide Werte werden in Millisekunden angegeben und müssen nur selten geändert werden.

| Einstellung                | Standard | Was es tut                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auszeit                    | 30000    | Wie lange eine einzelne Anfrage an das Gerät dauern kann, bevor sie abgebrochen wird. Über HTTP entspricht dies dem Abfrageintervall.                                                                                                                                                                                             |
| Wiederverbindungsintervall | 30000    | Wie lange soll nach einem Verbindungsabbruch vor dem ersten Wiederholungsversuch gewartet werden? Bei weiteren Fehlversuchen verdoppelt sich die Wartezeit auf maximal fünf Minuten, um ein nicht erreichbares Gerät nicht zu überlasten. Die Wartezeit darf nicht kürzer sein als das Timeout für den aktiven Verbindungsaufbau. |

Über CoAP sendet das Gerät seinen Status selbstständig, ein Abfragen ist daher nicht erforderlich. Manche Geräte – beispielsweise der CX7550/01 – können stundenlang keine Statusmeldungen senden; der Adapter prüft die Verbindung dann direkt beim Gerät, anstatt sie neu aufzubauen.

### Welches Gerätemodell soll ich auswählen?

| Ihr Gerät                                                                                                        | Modell auswählen |
| ---------------------------------------------------------------------------------------------------------------- | ---------------- |
| AC2889 und die anderen klassischen Luftreiniger, zum Beispiel AC1214, AC2729, AC2939, AC3059, AC3829 oder AC4236 | `AC2889`         |
| AC3221                                                                                                           | `AC3221`         |
| Standventilator CX3550/01                                                                                        | `CX3550`         |
| CX7550/01 Turmventilator                                                                                         | `CX7550`         |
| Alles andere, oder wenn Sie sich unsicher sind                                                                   | `Generic`        |

Die klassischen Wasserreiniger melden alle die gleichen einfachen Schlüssel (`pwr`, `om`, `mode` usw.), weshalb ein Eintrag die gesamte Produktfamilie abdeckt. Bisher auf realer Hardware bestätigt: AC2729, AC2889, AC3221, AC3829, AC4236/14, CX3550/01 und CX7550/01.

Die Modellnummer allein sagt nichts über den Registersatz aus: Der AC4236/14 hat eine höhere Nummer als der AC3221, ist aber dennoch ein klassisches Gerät und benötigt `AC2889`Wählen Sie den Eintrag, der mit den von Ihrem Gerät gemeldeten Schlüsseln übereinstimmt, und nicht den, der dem Namen am ähnlichsten sieht.

Wenn Sie sich unsicher sind, wenden Sie sich an `Generic` Schauen Sie sich zunächst die Rohschlüssel unter `unknownStates`einfache Namen wie z. B. `pwr` oder `pm25` gemeint ist ein klassisches Gerät, Tasten wie z. B. `D03102` Dies bedeutet, dass es sich um ein Gerät der nächsten Generation handelt. Sollte Ihr Gerät ein solches Modell sein, das nicht in der Liste aufgeführt ist, erstellen Sie bitte ein Ticket mit einem Debug-Log – so wurden beispielsweise der CX7550/01 und der AC3221 hinzugefügt.

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

Die Timersteuerung wird für den CX3550/01 absichtlich nicht unterstützt. Lokale Timer-Schreibvorgänge können dazu führen, dass die Firmware die Timersteuerung aktiviert. `D03102` Zu `0`Dadurch wird der Lüfter abgeschaltet. Der Adapter stellt die Timer-Informationen des CX3550/01 daher nur als schreibgeschützten Status zur Verfügung.

Weitere Einzelheiten sind dokumentiert in [docs/CX3550.md](docs/CX3550.md).

## Philips/Versuni CX7550/01 Turmventilator

Der CX7550/01 („Smart Tower Fan 7000 Serie“) nutzt dieselbe lokale verschlüsselte CoAP-Verbindung, jedoch andere Rohwerte als der CX3550/01 – Auswahl `CX7550` als Gerätemodell.

Getestete Funktionen des CX7550/01:

- Ein-/Ausschalten
- Lüfterstufen 1 bis 12 und AutoAdapt
- Schlafmodus
- Natürliche Brise
- Oszillation ein/aus
- Timer (aus, 1 bis 12 Stunden) – auf diesem Modell beschreibbar
- Piepton ein/aus
- Bildschirmhelligkeit, Farbtemperaturanzeige und was das Display permanent anzeigt
- Raumtemperatur

Weitere Einzelheiten sind dokumentiert in [docs/CX7550.md](docs/CX7550.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.2.0 (2026-09-08)

- (tt-tom17) Added the combined allergen/sleep preset ("Allergie-/Ruhemodus") reported by the AC4236/14 (VMI1)
- (tt-tom17) Classic devices now show the total filter life next to the remaining hours, plus the device language and version (VMI1)
- (tt-tom17) The "wrong device model" warning is no longer silenced by a single register that both models use (VMI1)
- (tt-tom17) Fixed a device attribute spelled like one of the adapter's own state names being treated as a mapped value (VMI1)

### 2.1.0 (2026-08-29)

- (tt-tom17) Fixed error messages ("DB closed", "setTimeout called, but adapter is shutting down") that appeared in the log every time the adapter was stopped or restarted (MatthiasBosch)
- (tt-tom17) New setting "Log unknown device attributes as debug": moves the "Unknown raw device attribute" messages from the info log to the debug log (off by default)
- (tt-tom17) Fixed devices connected via CoAP reconnecting every few minutes, and the log filling with "connection lost / connected" pairs, although the connection was fine - this affected quiet devices such as the CX7550/01 (DrBakterius)
- (tt-tom17) A device that stays unreachable is now retried at growing intervals instead of every 30 seconds, and stops repeating the same error line in the log
- (tt-tom17) No longer suggests switching to CoAP when an HTTP device that was working loses its connection - the hint now only appears while HTTP has never worked (tukey42)

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
- (mcm1957) Dependencies have been updated

  

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