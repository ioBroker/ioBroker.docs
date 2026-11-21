---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-eusec/README.md
title: ioBroker.vis-2-widgets-eusec
hash: vpfyrQGr/tpWkGvzYXY7w6sD3U/UH02OOkkC1X7pau4=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-eusec/admin/vis-2-widgets-eusec.png)

# ioBroker.vis-2-widgets-eusec

Widgets für vis-2, die die Kameras des [eusec-](https://github.com/iobroker-community-adapters/ioBroker.eusec) Adapters ( [eufy Security](https://us.eufylife.com/collections/security) ) anzeigen. Erfordert eusec 3.0.2 oder höher. Die Widgets werden sowohl in vis-2 mit React 18 als auch in vis-2 mit React 19 geladen.

**Dieses Projekt steht in keiner Verbindung zu Anker oder eufy. eufy und eufy Security sind Marken ihrer jeweiligen Inhaber und werden hier lediglich zur Benennung der Kameras verwendet, mit denen die Widgets kompatibel sind.**

## Widgets

- **Live-Kamera** : Spielt den Livestream ab, solange das Widget sichtbar ist, und stoppt ihn, sobald es ausgeblendet wird. Zeigt das letzte Bild an, bis das erste Bild eintrifft, oder eine Ladeanimation, falls die Option „Während der Stream lädt“ dies vorgibt. Schwenk- und Neigesteuerung sind für Kameras mit dieser Funktion verfügbar; ab EUSEC 3.2.0 sind dies voreingestellte Tasten.
- **Ereignis-Popup** : unsichtbar, bis einer seiner Auslöser zutrifft (standardmäßig) `ringing` Und `person_detected` Wenn die Kamera (sofern vorhanden) aktiviert ist, wird der Livestream in einem Dialog geöffnet und nach einer festgelegten Zeit wieder geschlossen. Ein Trigger, der kurz vor dem Anzeigen der Ansicht ausgelöst wurde (weniger als die Schließzeit), öffnet die Ansicht weiterhin. Ein Skript kann daher nach dem Ereignis zur Ansicht wechseln. Dasselbe gilt, wenn die Seite die Verbindung verloren hat, beispielsweise auf einem Tablet, dessen Kiosk-App die Seite im Bildschirmschoner pausiert: Ein zwischenzeitlich ausgelöster und weiterhin aktiver Trigger öffnet die Ansicht. Die Ansicht wird nur in der Ansicht geöffnet, in der sie platziert ist. Platzieren Sie sie daher in jeder Ansicht, in der sie angezeigt werden soll, oder in einer Ansicht, die von allen anderen Ansichten eingebunden wird.
- **Momentaufnahme** : Das letzte Bild der Kamera und ihr Alter. Ein Fingertipp öffnet den Livestream.

Der Dialog des Ereignis-Popups und der Screenshot übernehmen Titel, Größe, Farben und Schriftart aus der Attributgruppe „Dialog“.

Wählen Sie in jedem Widget den Kamerakanal aus (`eusec.0.<station>.cameras.<camera>`) als "Kamera"; alle Zustände werden von dort aus ermittelt.

## Was von der EU-SEC-Version abhängt

| EU-Securities    | Verhalten                                                                                                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.0.2 bis 3.3.x  | Das Widget schreibt `start_stream` wartet auf `livestream` und schreibt `stop_stream` wenn es schließt.                                                                                                                                    |
| 3.2.0 und später | Voreingestellte Tasten für Kameras mit Voreinstellungen.                                                                                                                                                                                |
| 3.4.0 und später | Wenn „Livestreams auf Abruf“ aktiviert ist, startet der Stream beim Öffnen des Players. Der Player meldet, wann ein Bild wiedergegeben wird, wenn die Station mit einer anderen Kamera belegt ist und wenn eine Kamera nicht antwortet. |

## Bekannte Grenzen

- **HTTPS:** go2rtc stellt den Livestream ausschließlich über HTTP bereit. Eine über HTTPS geöffnete Vis-2-Seite kann ihn daher nicht anzeigen; dies wird im Widget angezeigt.
- **Mehrere Darstellungen vor eusec 3.4:** ein Widget, das Schreibvorgänge schließt `stop_stream` Bei einem gestarteten Stream wird das Bild auf einem anderen Bildschirm, der dieselbe Kamera zeigt, ebenfalls beendet. Mit EUSEC 3.4 und Livestreams on Demand tritt dieses Problem nicht auf.
- **Zwei Pop-ups gleichzeitig** für zwei übereinander gestapelte Kameras, die neueste oben.

## Wechsel von vis2-eusec

Bis Version 0.1.1 wurde dieser Adapter so genannt `vis2-eusec`.ioBroker benennt Widget-Adapter für vis-2 `vis-2-widgets-<name>` So geht es weiter als `vis-2-widgets-eusec`.vis-2 speichert den Namen des Widget-Sets in jedem Widget eines Projekts, und die Laufzeitumgebung lädt nur die dort benannten Sets. Ansichten, die mit .vis-2 erstellt wurden `vis2-eusec` Daher benötigen wir den neuen Namen nur einmal:

1. Installieren `vis-2-widgets-eusec` und löschen Sie die Instanz von `vis2-eusec` Die
2. Im Adminbereich, Registerkarte „Dateien“, öffnen `vis-2.0/<project>/` und herunterladen `vis-views.json` Die
3. Ersetzen Sie jedes `vis2-eusec` in der Datei mit `vis-2-widgets-eusec` und laden Sie es in denselben Ordner hoch.
4. Vis-2 neu laden.

Alle Widgets und ihre Einstellungen bleiben unverändert.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (typhosj) New attribute "While the stream loads": shows a loading animation instead of the last event picture until the livestream plays; it stands still when the system asks for reduced motion
- (typhosj) The event popup also opens for a trigger that turned true while the page had lost its connection, for example under the screensaver of a kiosk tablet
- (typhosj) After a lost connection, the live view and the snapshot pick up what changed meanwhile (a new event picture, a stream that ended, eusec stopping or starting) instead of waiting for the next change

### 1.0.0 (2026-11-12)

- (typhosj) The live view no longer opens with a focus ring around the close button; the dialog itself takes the focus, and Tab still reaches the button
- (typhosj) The live view shows the last event picture uncropped while the stream loads, in the same framing as the video, instead of cutting it to fill the widget
- (typhosj) A widget no longer stops a livestream that another display had started (eusec before 3.4, or with on-demand streaming switched off)
- (typhosj) Devices with a compatibility stream are recognised however their serial numbers are written in the eusec settings
- (typhosj) When the camera of a widget changes at runtime, the new camera starts instead of the widget reporting an ended stream
- (typhosj) A live widget outside the visible area no longer starts a stream for a moment
- (typhosj) The 360° button sits in the middle of the direction pad instead of the top left corner
- (typhosj) A change of the pan and tilt display setting takes effect without reloading the view
- (typhosj) Pressing a control in a dialog and releasing the mouse outside it no longer closes the dialog
- (typhosj) Escape closes only the dialog in front when several are open
- (typhosj) Choosing another camera for the event popup in the editor replaces the triggers that were filled in for the previous camera
- (typhosj) The age of a snapshot reads "1 minute ago" instead of "60 seconds ago"

### 0.2.0 (2026-10-18)

- (typhosj) Renamed from vis2-eusec to vis-2-widgets-eusec; views built with vis2-eusec need the new name once, see "Moving from vis2-eusec"

### 0.1.1 (2026-10-13)

- (typhosj) The widgets are translated into all eleven languages of ioBroker
- (typhosj) The keyboard focus stays inside the livestream dialog while it is open

### 0.1.0 (2026-10-13)

- (typhosj) Initial version: live player, event popup and snapshot widget

## License

MIT License

Copyright (c) 2026 typhosj <typhosj@gmx.de>

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