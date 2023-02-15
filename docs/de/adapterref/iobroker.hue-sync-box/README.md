---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hue-sync-box/README.md
title: ioBroker.hue-Sync-Box
hash: TwPvpTI0WugmeEEYQaO99mQZkBRXGcQtNFGvSp8OepI=
---
![Logo](../../../en/adapterref/iobroker.hue-sync-box/admin/hueSyncBox.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hue-sync-box.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hue-sync-box.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hue-sync-box-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hue-sync-box-stable.svg)

# IoBroker.hue-Sync-Box
![Testen und freigeben](https://github.com/xXBJXx/ioBroker.hue-sync-box/workflows/Test%20and%20Release/badge.svg)

## Hue-sync-box-Adapter für ioBroker
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Der Adapter erfordert eine Node.js-Version >= 16.x
### Was ist die Philips Hue Sync Box?
Die Philips Hue Sync Box ist ein Gerät, mit dem Sie die Farben und Lichteffekte Ihrer Philips Hue-Leuchten mit dem Bildschirm Ihres Computerbildschirms synchronisieren können. Dies ist möglich, indem die Sync Box die Farben und Lichteffekte Ihres Bildschirms erkennt und an Ihre Philips Hue-Leuchten übermittelt.

### Was kann der Adapter?
Der Adapter pollt alle 15 Sekunden die Philips Hue Sync Box API und aktualisiert die Datenpunkte entsprechend.
Es gibt einige Datenpunkte, die die Einstellungen der Sync Box verändern können (z. B. der Sync-Ein/Aus-Schalter, Umschalten der HDMI-Eingänge usw.).
Jede Änderung der Datenpunkte wird sofort an die Philips Hue Sync Box gesendet und löst eine Aktualisierung der Datenpunkte aus.
Es können gleichzeitig mehrere Philips Hue Sync-Boxen erstellt werden.

## Was ist erforderlich, um den Adapter zu verwenden?
- IP-Adresse der Philips Hue Sync Box (nur IPv4)
- Hue Sync Box-Token (siehe unten)

## Wie füge ich die Philips Hue Sync Box dem Adapter hinzu?
1. Öffnen Sie die Adapterkonfiguration und klicken Sie auf die Schaltfläche „Box hinzufügen“.
2. Geben Sie einen Namen für die Box ein, der Name darf nur 1x sein, da er als ID verwendet wird.
3. Geben Sie die IP-Adresse der Box ein. (nur IPv4) (kleiner Hinweis: bei der Eingabe der IP-Adresse wird automatisch bei jeder 3. Ziffer ein Punkt eingefügt)

   ![name_ip_token](../../../en/adapterref/iobroker.hue-sync-box/admin/media/name_ip_token.png)

4. Klicken Sie auf die Schaltfläche „Box registrieren“, es öffnet sich ein neues Fenster, in dem Sie die Box registrieren können (siehe unten)

   ![Anmeldung](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration.png)

5. Sobald der Button „Registrierung“ gedrückt wird, startet der Vorgang, dann haben Sie 30 Sekunden Zeit, den Button auf der Box zu drücken und gedrückt zu halten

ca. 3 Sekunden bis die LED grün blinkt. (siehe unten) ![Anmeldung](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration_timer.png)

6. Nachdem Sie die Gerätetaste losgelassen haben, wird nach einigen Sekunden der Token angezeigt und in das Feld eingefügt. (siehe unten)

![Zeichen](admin/media/registration_successful.png) ![Zeichen](../../../en/adapterref/iobroker.hue-sync-box/admin/media/token.png)

7. Jetzt können Sie auf die Schaltfläche "Hinzufügen" klicken und die Box wird hinzugefügt. Anschließend müssen Sie nur noch auf die Schaltfläche "Speichern" klicken, um die Konfiguration zu speichern.

   ![Adapter_GUI](../../../en/adapterref/iobroker.hue-sync-box/admin/media/Adapter_GUI.png)

## Löschen Sie die Hue-Sync-Box vom Adapter
### Aufmerksamkeit! Damit das Löschen mit den Optionen funktioniert, muss der Token über die Registrierungsfunktion des Adapters erstellt worden sein.
1. Öffnen Sie die Adapterkonfiguration und klicken Sie auf die Schaltfläche "Löschen" Mülleimer-Symbol.
2. Ein neues Fenster mit 2 Optionen wird geöffnet. Wählen Sie die Option aus, die Sie verwenden möchten. Wenn keine der Optionen ausgewählt ist, wird die Box nur aus gelöscht

   Konfig. (siehe unten)

   - `von der Box abmelden` - die Box wird aus dem Adapter gelöscht und der Token wird aus der Box gelöscht
   - `Objekt löschen` - Die Box wird aus dem Adapter gelöscht und die Objekte werden aus dem ioBroker gelöscht

     ![delete_box](../../../en/adapterref/iobroker.hue-sync-box/admin/media/delete_device.png)

Sie können auch beide Optionen gleichzeitig auswählen dann wird die Box aus dem Adapter gelöscht und die Objekte aus dem ioBroker gelöscht und der Token aus der Box gelöscht.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.5 (2023-02-06)
* (xXBJXx) Dependency update

### 0.3.4 (2023-01-15)
* (xXBJXx) fixed Sentry error reporting

### 0.3.3 (2023-01-14)
* (xXBJXx) fixed a bug

### 0.3.2 (2023-01-13)
* (xXBJXx) update dependencies
* (xXBJXx) Log output extended and improved
* (xXBJXx) Added data point for the response JSON
* (xXBJXx) Added data point "Reachable" to check if the box is reachable

### 0.3.1 (2022-12-20)
* (xXBJXx) Fixed error message that occurs after a successful registration.

### 0.3.0 (2022-12-20)
* (xXBJXx) added delete function for objects and Token
* (xXBJXx) added funktion for sync the `execution.intensity` state

### 0.2.1 (2022-12-17)
* (xXBJXx) typo corrected in README
* (xXBJXx) Fixed a bug when sending commands to the box

### 0.2.0 (2022-12-17)
* (xXBJXx) Optimization and improvement of the registration process

### 0.1.0 (2022-12-16)
* (Issi) First release

## License
MIT License

Copyright (c) 2022-2023 Issi <issi.dev.iobroker@gmail.com>

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