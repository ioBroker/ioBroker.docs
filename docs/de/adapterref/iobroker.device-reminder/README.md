---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.device-reminder/README.md
title: ioBroker.Geräteerinnerung
hash: AC1M7Hjse+bdfa5qeC4KGtQGHGSNwAeVOgQeu6VonJM=
---
![Logo](../../../en/adapterref/iobroker.device-reminder/admin/device-reminder.png)

![Anzahl der Installationen (stabil)](http://iobroker.live/badges/device-reminder-stable.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/device-reminder-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# IoBroker.device-reminder
![Testen und Freigeben](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)

## Deutsche Readme benötigt?<br> [deutsche Readme](https://github.com/Xenon-s/ioBroker.device-reminder/blob/master/README_GER.md)
<br>

# Adapter zur Überwachung von Gerätezuständen Version
Dieser Adapter kann mittels Messbuchsen erkennen, ob ein Gerät eingeschaltet, in Betrieb oder ausgeschaltet ist und darauf reagieren. Benachrichtigungen können dann automatisch per Telegram, WhatsApp, Alexa, Sayit, Pushover und E-Mail versendet werden (Mehrfachauswahl pro Gerät möglich). Auch das automatische Ausschalten der Steckdose nach Abschluss des Vorgangs (auch zeitverzögert) ist möglich. Bei vorgegebener Laufzeit ist es möglich, pro Datenpunkt einen Alarm auszugeben (mit externem Skript liefert der Datenpunkt nur True/False oder als Anzeige im Vis). Hierzu genügt es, die Vorlaufzeit einfach in Minuten in den Datenpunkt 'device-reminder.X.XXX.config.runtime max' einzutragen.

# Was ist zu beachten?
Das Aktualisierungsintervall des &quot;Live-Verbrauchswertes (wird **&quot;\_energy &quot;**)&quot; sollte bei den meisten Geräten nicht mehr als 10 Sekunden betragen, da es sonst zu sehr verzögerten Meldungen kommen kann. Der Adapter selbst fragt die Werte alle 10 Sekunden ab und verwendet ereignisbasiert neue Werte. Dies spart dem System<br> Befehl in der Tasmota-Konsole: TelePeriod 10

# Was ist pro Gerät möglich?
- Benachrichtigung beim Gerätestart
- Benachrichtigung bei Betriebsende des jeweiligen Gerätes
- Telegrammbenachrichtigung (mehrere IDs sind möglich)
- Alexa-Benachrichtigung (mehrere IDs sind möglich)
- WhatsApp-Benachrichtigung (mehrere IDs sind möglich)
- Pushover-Benachrichtigung (mehrere IDs sind möglich)
- E-Mail-Benachrichtigung (mehrere IDs sind möglich)
- Signalbenachrichtigung (mehrere IDs sind möglich)
- Matrix-Benachrichtigung (mehrere IDs sind möglich)
- Benachrichtigungen können frei erstellt oder durch ein externes Skript vorgegeben werden
- Datenpunkte mit aktuellem Status, Live-Verbrauch und zuletzt gesendeter Statusmeldung, um Werte dieses Adapters in anderen Skripten zu verwenden
- Geräte können auf Wunsch (auch zeitverzögert) abgeschaltet werden, wenn der Prozess als beendet erkannt wurde
- Sprachassistenten können pro Datenpunkt vorübergehend deaktiviert werden
- Laufzeitüberwachung in Minuten: Bei Überschreitung der Zeit wird ein Alarm an alle ausgewählten Messenger gesendet

# Anweisung
## Grundlegendes vorab
Bei jeder Gerätegruppe, Alexa etc. gibt es einen Button &quot;Eingaben prüfen&quot;. Wird dieser Button angeklickt, werden die vorhandenen Eingaben auf Plausibilität geprüft und man bekommt sofort eine Antwort, ob alle Eingaben korrekt sind. Wenn man Änderungen vorgenommen hat, muss dieser Button immer angeklickt werden! Der Button muss immer angeklickt werden, wenn er erscheint!<br> ![check_btn_false.png](admin/pictures/check_btn_false.png)<br> ![check_btn_true.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/check_btn_true.png)

## Gerät erstellen
![Gerät hinzufügen.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDevice.png)

- **Gerätename**: Frei wählbarer Name
- **Gerätetyp**: hier muss ausgewählt werden um welches Gerät es sich handelt, damit die Berechnungen im Adapter korrekt ausgeführt werden können
- **Verbrauch**: Durch Klick auf den Button mit den drei weißen Punkten öffnet sich Ihre Objektverwaltung. Wählen Sie dort den Datenpunkt aus, der den **aktuellen Live-Verbrauch** anzeigt.
- **Ein-/Ausschalten**: Klicke auf die Schaltfläche mit den drei weißen Punkten, um deine Objektverwaltung zu öffnen. Wähle dort den Datenpunkt aus, der deine **Steckdose ein-/ausschaltet** (keine Pflicht). Ist dieser nicht ausgewählt, kann keine automatische Abschaltung erfolgen.
- **Starttext**: Benachrichtigung die beim Start des Gerätes versendet werden soll (auch Sonderzeichen sind möglich)
- Endtext\*\*: Benachrichtigung, die gesendet werden soll, wenn das Gerät seinen Vorgang beendet hat (auch Sonderzeichen sind möglich)

Bei **Starttext** und **Endtext** können Sie auch eine Nachricht von einem externen Datenpunkt abrufen. Diese Nachricht wird mit 1 Sekunde Verzögerung vom Datenpunkt gelesen, nachdem sich der Gerätestatus geändert hat. So können Sie eine Nachricht von einem externen Skript abrufen. Der Adapter erkennt automatisch, ob eine Nachricht von einem Datenpunkt stammt oder manuell eingegeben wurde. Um einen Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei weißen Punkten und wählen Sie anschließend den entsprechenden Datenpunkt aus. **Bitte beachten**: Es kann nur entweder ein Datenpunkt **oder** eine manuell eingegebene Nachricht verwendet werden!<br>

# Geräte konfigurieren
![Geräte konfigurieren.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/configureDevices.png)

- **aktiv**: Ist standardmäßig aktiviert. Hier können Sie ein Gerät vorübergehend deaktivieren, sodass es keine Benachrichtigungen mehr sendet.
- Gerät\*\*: wird automatisch erstellt
- **Alexa**: alle bisher angelegten Alexas werden hier aufgelistet und können per Klick hinzugefügt werden
- **sayit**: alle bisher angelegten Sayit-Geräte werden hier aufgelistet und können per Klick hinzugefügt werden
- **Telegram**: alle bisher angelegten Telegram-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **WhatsApp**: Alle zuvor erstellten WhatsApp-Benutzer werden hier aufgelistet und können durch Anklicken hinzugefügt werden
- **Pushover**: alle bisher angelegten Pushover-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **E-Mail**: Alle zuvor erstellten E-Mail-Benutzer werden hier aufgelistet und können durch Anklicken hinzugefügt werden
- **Signal**: alle bisher angelegten Signal-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **Matrix**: alle bisher angelegten Matrix-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **Ausschaltverzögerung**: Hier können Sie optional eine Ausschaltverzögerung in **Minuten** eingeben. Nach Ablauf der Ausschaltverzögerung wird die Steckdose ausgeschaltet, _sofern die automatische Ausschaltung aktiviert ist_. Die Endbenachrichtigung des Gerätes bleibt von einer Ausschaltverzögerung unberührt! Kann nur verwendet werden, wenn unter "Geräte" auch ein Ausschaltdatenpunkt hinterlegt wurde.
- **Abbrucherkennung**: Wenn aktiviert, versucht der Adapter zu erkennen, ob ein Gerät vor der Benachrichtigung bereits manuell ausgeschaltet wurde und benachrichtigt dann nicht mehr.

Nach dem Klick auf "**Speichern und schließen**" wird nun für jedes neu angelegte Gerät ein Ordner unter _Objekte -> Geräteerinnerung_ angelegt, in dem

- Nicht stören (wenn aktiviert, werden keine Nachrichten per **Spracherinnerung** versendet)
- Laufzeit max
- den aktuellen Zustand des Gerätes
- Laufzeitalarm
- durchschnittlicher Verbrauch (kann als Hilfestellung zur Ermittlung eigener Grenzwerte dienen)
- die letzten Läufe im JSON-Format
- die letzte Laufzeit in hh:mm:ss
- der aktuelle Live-Verbrauch
- die Nachricht an die Boten
- die aktuelle Laufzeit in hh:mm:ss
- die aktuelle Laufzeit in Millisekunden

wird angezeigt.<br>

## Testbutton
![testButton.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/testButton.png)

In jedem Messenger gibt es einen Test-Button. Wird dieser angeklickt, wird eine Testnachricht an den jeweiligen Messenger gesendet. Sollte keine Nachricht eingehen, überprüfen Sie bitte die Konfiguration. Der Adapter selbst prüft nicht, ob die Nachricht angekommen ist!

## Zeige die Speichern-Buttons an, wenn sie nicht automatisch angezeigt werden
![force_save_buttons.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/force_save_buttons.png)

Da die Speichern-Buttons gelegentlich nicht angezeigt werden, wurde ein Button hinzugefügt, der dies erzwingt. Drückt man diesen, erscheinen die Speichern-Buttons. Das Speichern erfolgt jedoch auf eigene Gefahr, da der Adapter die Eingaben nicht prüft! Der Adapter kann abstürzen oder die Konfigurationsdaten können verloren gehen.

## Alexa erstellen
![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addAlexa.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- alexa2/../announcement'/'speak'\*\*: Hier musst du den Datenpunkt auswählen, der deine Alexa sprechen lässt. Um den Datenpunkt auszuwählen, klickst du einfach auf den Button mit den drei kleinen weißen Punkten.
- **Lautstärke 0–100**: Lautstärke, mit der Ihre Alexa sprechen soll (von 0 – 100 %).

Über die letzten beiden Felder lässt sich ein Zeitraum festlegen, in dem deine Alexa Sprachausgaben durchführen darf. Standardmäßig ist der Zeitraum von 00:00 – 23:59 Uhr aktiv.

- **aktiv ab**: Startzeitpunkt des Benachrichtigungszeitraums
- **aktiv bis**: Endzeitpunkt der Benachrichtigungsfrist

## SayIt-Gerät erstellen
![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSayit.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **'sayit/../text'**: wähle den Datenpunkt "Text" im jeweiligen sayIt-Geräteordner aus. Hier wird die Textausgabe gesendet.
- **Lautstärke 0-100**: Lautstärke, mit der Ihr Sayit-Gerät sprechen soll (von 0 - 100%)
- **aktiv ab**: Startzeitpunkt des Benachrichtigungszeitraums
- **inaktiv ab**: Endzeitpunkt der Benachrichtigungsfrist

## Pushover-Benutzer erstellen
![addPushover.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addPushover.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **Pushover-Instanz**: die Instanz, an die die Nachricht gesendet werden soll
- **Betreff**: optionaler Betreff der Nachricht
- **Geräte-ID**: optionale Geräte-ID, an die die Nachricht gesendet werden soll
- **Priorität**: Die Priorität, mit der gesendet werden soll
- **Ton**: Der Ton, der abgespielt wird, wenn Pushover die Nachricht empfängt
- **TTL**: Dauer, nach der eine Nachricht gelöscht werden soll (Sekunden)

## E-Mail-Benutzer erstellen
![addEmail.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addEmail.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **Absenderadresse**: E-Mail-Adresse, von der die E-Mail gesendet wird
- **Empfängeradresse**: E-Mail-Adresse, die die Nachricht erhalten soll

## Signalbenutzer erstellen
![addSignal.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addSignal.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **Signalinstanz**: Die installierte Instanz, an die gesendet werden soll

## Telegrammbenutzer erstellen
![addTelegram.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addTelegram.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **Telegram-Instanz**: Die installierte Instanz, an die gesendet werden soll
- **Benutzername/Vorname/Chat-ID auswählen**: Wählen Sie, ob an den Benutzernamen, Vornamen oder die Chat-ID gesendet werden soll (empfohlen). Die Daten werden in der Telegram-Instanz gespeichert. Bei Eingabe einer negativen Chat-ID wird die Nachricht an eine Gruppe gesendet.
- **Benutzernamen oder Vornamen oder Chat-ID eingeben**: Geben Sie den Benutzernamen, Vornamen oder die Chat-ID ein, je nachdem, was ausgewählt wurde

## WhatsApp-Benutzer erstellen
![addWhatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addWhatsapp.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **'whatsapp-cmb/../sendMessage'**: Der Datenpunkt des Whatsapp-Adapters, an den die Nachricht gesendet werden soll.

## Discord-Benutzer erstellen
![addDiscord.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/addDiscord.png)

- **Name**: Frei wählbarer Name, auch Sonderzeichen sind möglich.
- **Discord-Instanz**: Die installierte Instanz, an die gesendet werden soll.
- **Benutzer-ID**: Die Discord-Benutzer-ID
- **Chat-Tag**: Der Discord-Benutzertag
- **Chatname**: Der Discord-Benutzername (**Pflichtfeld**)
- **Server-ID**: Die Discord-Server-ID
- **Kanal-ID**: Die Discord-Kanal-ID

# Standardgeräte
![Standardgeräte.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/default-devices.png) Diese Werte wurden über mehrere Monate und mithilfe zahlreicher Tester ermittelt. Veränderungen der Werte können dazu führen, dass Geräte nicht mehr korrekt erfasst werden und es zu Fehlmeldungen kommt.

# Benutzerdefinierte Geräte
![benutzerdefinierte Geräte.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/custom-devices.png) Diese Werte können vom Benutzer angepasst und dann verwendet werden. Nachfolgend die Erklärung:

- **Schwellenwert 'Start' (Watt)**: Startwert in Watt, der überschritten werden muss, damit das Gerät als gestartet erkannt wird.
- **Schwellenwert 'Ende' (Watt)**: Endwert in Watt, der unterschritten werden muss, damit das Gerät als beendet erkannt wird.
- **Schwellwert 'Standby' (Watt)**: Schwellwert, ab dem das Gerät als "AUS" oder "IM STANDBY" gekennzeichnet wird. Liegt der aktuell berechnete Wert unterhalb des **Standby**-Schwellwerts, wird das Gerät als ausgeschaltet erkannt.
- **Anzahl Startwerte**: Hiermit wird angegeben, wie oft der „Startwert“ **hintereinander** überschritten werden muss. Ein einmaliges Unterschreiten dieses Wertes führt zu einem Startabbruch. Der Durchschnitt dieser Werte muss über dem Startwert liegen, damit das Gerät als gestartet erkannt wird.<br>

_Beispiel: Der Wert sollte 10W betragen und 3 mal hintereinander überschritten werden. 1. 15W, 2. 1W, 15W => Startphase wurde abgebrochen, da der zweite Wert unter 10 lag._.

**Anzahl Endwerte**: Hiermit wird angegeben, wie viele Werte aufgezeichnet werden sollen, bevor berechnet wird, ob das Gerät bereit ist. Je weniger Werte hier angegeben sind, desto ungenauer ist das Ergebnis und das Risiko von Fehlalarmen steigt. Je höher der Wert, desto genauer ist die Aufzeichnung. Der Nachteil ist jedoch, dass die Fertigmeldung stark verzögert gesendet wird. Ende wird erst erkannt, wenn "Anzahl Endwerte" erreicht ist und der Durchschnittsverbrauch unter dem "Schwellenwert 'Ende' (Watt)" liegt.

_Kurze Beispielrechnung:_ Alle 10 Sekunden kommen Verbrauchswerte rein. **Schwellenwert &#39;Ende&#39; (Watt)** ist auf 50 eingestellt, **Anzahl Endwerte** ist auf 100 eingestellt. Nachdem das Gerät als gestartet erkannt wurde, werden 100 Werte (_dauert 100Werte x 10 Sekunden = 1000 Sekunden_) aufgezeichnet und erst dann der Durchschnittswert gebildet. Liegt dieser unter 50, wird nach ca. 16,5 Minuten (wir merken uns **Anzahl Endwerte** = 100 Werte) **Fertig** erkannt und eine Meldung (falls konfiguriert) raus. Liegt der Wert über 50, passiert nichts, da das Gerät noch in Betrieb ist. Jeder weitere Wert ersetzt nun den ältesten und nach jedem neuen Wert wird ein neuer Durchschnitt berechnet.<br>

# Unterstützung
**Wenn Ihnen meine Arbeit gefällt:**<br>

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)<br><br>

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 4.x

- (xenon-s) new Admin UI in jsonConfig

### 3.1.2 (2024-01-22)

- (xenon-s) bugfix: [issue #381](https://github.com/Xenon-s/ioBroker.device-reminder/issues/381)
- (xenon-s) bugfix: [issue #382](https://github.com/Xenon-s/ioBroker.device-reminder/issues/382)

### 3.1.1 (2024-01-20)

- (xenon-s) bugfix: [issue #380](https://github.com/Xenon-s/ioBroker.device-reminder/issues/380)

### 3.1.0 (2024-01-19)

**Attention! Check the Telegram settings after the update! You must now enter either the username, firstname or the ChatID!**

- (xenon-s) enhancement "Add comment field "Default / Custom values": [issue #337](https://github.com/Xenon-s/ioBroker.device-reminder/issues/337)
- (xenon-s) enhancement "Integrate Discord": [issue #341](https://github.com/Xenon-s/ioBroker.device-reminder/issues/341)
- (xenon-s) enhancement "Integrate Pushover TTL": [issue #342](https://github.com/Xenon-s/ioBroker.device-reminder/issues/342)
- (xenon-s) enhancement "Button to check the messenger configuration": [issue #379](https://github.com/Xenon-s/ioBroker.device-reminder/issues/379)
- (xenon-s) bugfix: [issue #344](https://github.com/Xenon-s/ioBroker.device-reminder/issues/344)
- (xenon-s) bugfix: [issue #345](https://github.com/Xenon-s/ioBroker.device-reminder/issues/345)
- (xenon-s) bugfix: [issue #346](https://github.com/Xenon-s/ioBroker.device-reminder/issues/346)
- (xenon-s) bugfix: [issue #363](https://github.com/Xenon-s/ioBroker.device-reminder/issues/363)
- (xenon-s) Optimization : MessageHandler revised

### 3.0.1 (2023-10-18)

- (xenon-s) Update testing: [issue #325](https://github.com/Xenon-s/ioBroker.device-reminder/issues/325)
- (xenon-s) bugfix: [issue #327](https://github.com/Xenon-s/ioBroker.device-reminder/issues/327)
- (xenon-s) bugfix: [issue #328](https://github.com/Xenon-s/ioBroker.device-reminder/issues/328)
- (xenon-s) bugfix: [issue #329](https://github.com/Xenon-s/ioBroker.device-reminder/issues/329)
- (xenon-s) bugfix: [issue #344](https://github.com/Xenon-s/ioBroker.device-reminder/issues/344)
- (xenon-s) bugfix: [issue #346](https://github.com/Xenon-s/ioBroker.device-reminder/issues/346)

### 3.0.0 (2023-10-18)

**Breaking Changes**

- Made basic changes to the adapter structure, because there were numerous problems with the new "js-Controller 5.x". It is mandatory to reinstall the adapter!
- Numerous bug fixes
- New messengers added
- Admin GUI fundamentally reworked
- Whatsapp and Telegram must now be created manually
- (xenon-s) Fixes for js-controller 5.\*
- (xenon-s) bugfix: [issue #278](https://github.com/Xenon-s/ioBroker.device-reminder/issues/278)
- (xenon-s) bugfix: [issue #273](https://github.com/Xenon-s/ioBroker.device-reminder/issues/273)
- (xenon-s) bugfix: [issue #267](https://github.com/Xenon-s/ioBroker.device-reminder/issues/267)
- (xenon-s) bugfix: [issue #218](https://github.com/Xenon-s/ioBroker.device-reminder/issues/218)
- (xenon-s) bugfix: [issue #207](https://github.com/Xenon-s/ioBroker.device-reminder/issues/207)
- (xenon-s) GUI Fixes "devices" : switch may be empty, but then no longer selectable
- (xenon-s) add: [issue #258: Signal Messenger added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/258)
- (xenon-s) add: [issue #245: Matrix added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/245)
- (xenon-s) add: [issue #185: pushover device id added](https://github.com/Xenon-s/ioBroker.device-reminder/issues/185)
- (xenon-s) bugfix [issue #210](https://github.com/Xenon-s/ioBroker.device-reminder/issues/210)
- (xenon-s) bugfix [issue #169](https://github.com/Xenon-s/ioBroker.device-reminder/issues/169)
- (xenon-s) bugfix [issue #297](https://github.com/Xenon-s/ioBroker.device-reminder/issues/297)

### 1.2.9 (2021-06-22)

- (xenon-s) bugfix: error catching JSON last operations doesn't work

### 1.2.4 (2021-06-13)

- (xenon-s) bugfix: incorrect JSON format

### 1.2.3 (2021-06-13)

- (xenon-s) bugfix: [issue #76](https://github.com/Xenon-s/ioBroker.device-reminder/issues/76) messages from datapoint were not displayed
- (xenon-s) bugfix: [issue #75](https://github.com/Xenon-s/ioBroker.device-reminder/issues/75) "undefined is not a valid state"

### 1.2.1 (2021-05-01)

- (xenon-s) Adapter structure redesigned to classes
- (xenon-s) Admin UI design and inputs made more user friendly
- (xenon-s) Telegram bug fixed
- (xenon-s) Fix for js-controller 3.3.\*
- (xenon-s) new datapoints added (runtime max, last runs as JSON, last runtime, runtime max, runtime alert)
- (xenon-s) add: runtime-alert

### 1.0.0 (2021-01-05)

- (xenon-s) initial commit version 1.0

## License

MIT License

Copyright (c) 2024 xenon-s <ente_s@hotmail.de>

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