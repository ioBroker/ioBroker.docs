---
chapters: {"pages":{"en/adapterref/iobroker.device-reminder/README.md":{"title":{"en":"ioBroker.device-reminder"},"content":"en/adapterref/iobroker.device-reminder/README.md"},"en/adapterref/iobroker.device-reminder/README_GER.md":{"title":{"en":"ioBroker.device-reminder"},"content":"en/adapterref/iobroker.device-reminder/README_GER.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.device-reminder/README_GER.md
title: ioBroker.device-reminder
hash: PJ9UYOrdi8d9s/QbbehCYEs0o5jGnXn+4JS6IVKbY3s=
---
![Logo](../../../en/adapterref/iobroker.device-reminder/admin/device-reminder.png)

![Anzahl der Installationen (stabil)](http://iobroker.live/badges/device-reminder-stable.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/device-reminder-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Test und Freigabe](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# ioBroker.device-reminder

## Englische Readme-Datei benötigt?<br> [englische Readme](/#/adapters/device-reminder)

<br>

# Adapter zur Überwachung von Gerätezuständen Version

Dieser Adapter kann anhand von Messsteckdosen erkennen, ob ein Gerät eingeschaltet, in Betrieb ist oder ausgeschaltet wurde und darauf reagiert. Es können dann Nachrichten per Telegram, WhatsApp, Alexa, Sayit, Pushover und E-Mail (Mehrfachauswahl pro Gerät möglich) ausgegeben werden. Es ist ebenfalls möglich, die Steckdose nach Beendigung des Vorgangs automatisch abzuschalten (auch zeitverzögert). Bei vorgegebener Laufzeit ist es möglich, sich per Datenpunkt einen Alarm auszugeben (mit externem Script, der Datenpunkt liefert nur true/false oder als Anzeige in der Sicht). Hierfür genügt es, die Vorgabelaufzeit einfach in Minuten in den Datenpunkt „device-reminder.X.XXX.config.runtime max“ einzutragen.

# Was sollte beachtet werden?

Das Aktualisierungsintervall vom „Live-Verbrauchswert (heißt bei den meisten Geräten **„\_energy“** )“ sollte nicht länger als 10 Sekunden dauern, da es sonst zu sehr stark verzögerten Meldungen kommen kann. Der Adapter selber fragt alle 10 Sekunden die Werte ab und nutzt neue Werte Event-basiert. Das schont das System<br> Befehl in der Tasmota Konsole: TelePeriod 10

# Was ist pro Gerät möglich?

- Benachrichtigungen beim Gerätestart
- Benachrichtigung beim Vorgangsende des jeweiligen Geräts
- Telegram-Benachrichtigung (mehrere IDs sind möglich)
- Alexa-Benachrichtigung (mehrere IDs sind möglich)
- WhatsApp-Benachrichtung (mehrere IDs sind möglich)
- Pushover-Benachrichtung (mehrere IDs sind möglich)
- E-Mail-Benachrichtung (mehrere IDs sind möglich)
- Signal-Benachrichtung (mehrere IDs sind möglich)
- Matrix-Benachrichtung (Mehrere IDs sind möglich)
- Discord-Benachrichtung (Mehrere IDs sind möglich)
- Benachrichtigungen können frei erstellt oder auch von einem externen Script vorgegeben werden
- Datenpunkte mit dem aktuellen Zustand, Live-Verbrauch und zuletzt gesendete Statusmeldung, um Werte aus diesem Adapter in anderen Skripten verwenden zu können
- Geräte bei Bedarf abschalten (auch zeitverzögert), wenn der Vorgang beendet wurde
- Sprachassistenten können per Datenpunkt vorübergehend deaktiviert werden
- Laufzeitüberwachung in Minuten: Wird die Zeit überschritten, wird ein Alarm an alle ausgewählten Messenger gesendet

# Anleitung

## grundlegendes Vorab

Es gibt für jede Gruppe von Geräten, Alexa usw. den Button „Eingabe prüfen“. Wird dieser Button angeklickt, werden die vorhandenen Eingaben auf Plausibilität geprüft und man erhält sofort eine Antwort, ob alle Eingaben richtig sind. Hat man Änderungen vorgenommen, so muss dieser Button immer angeklickt werden! Der Button muss unbedingt immer dann angeklickt werden, wenn er erscheint! <br>![check\_btn\_false\_ger.png](admin/pictures/check_btn_false_ger.png)<br>![check\_btn\_true\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/check_btn_true_ger.png)

## Geräteanlegen

![device\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/device_ger.png)

- **Gerätename** : Frei wählbarer Name
- **Gerätetyp** : Hier muss ausgewählt werden, um welches Gerät es sich handelt, damit die Berechnungen im Adapter korrekt ausgeführt werden können
- **Verbrauch** : Per Klick auf die Schaltfläche mit den drei weißen Punkten öffnet sich Ihre Objektverwaltung. Es muss der Datenpunkt ausgewählt werden, welcher den **aktuellen Live-Verbrauch** anzeigt.
- **Schalter AN/AUS** : Per Klick auf die Schaltfläche mit den drei weißen Punkten öffnet sich Ihre Objektverwaltung. Es muss der Datenpunkt ausgewählt werden, welcher eure **Steckdose an/aus schaltet** (keine Pflicht). Ist dieser nicht angewählt, kann auch kein automatisches Ausschalten erfolgen
- **Starttext** : Benachrichtigung die gesendet werden soll, wenn das Gerät gestartet wird (auch Sonderzeichen sind möglich)
- **Endtext** : Benachrichtigung die gesendet werden soll, wenn das Gerät seinen Vorgang beendet hat (auch Sonderzeichen sind möglich)

Bei **Starttext** und **Endtext** kann man sich auch eine Nachricht aus einem externen Datenpunkt holen. Diese Nachricht wird mit 1 Sekunde Verzögerung aus dem Datenpunkt gelesen, nachdem sich der Status des Geräts geändert hat. Somit kann man sich per externem Script eine Nachricht erstellen lassen. Der Adapter erkennt automatisch, ob eine Nachricht aus einem Datenpunkt stammt oder ob diese manuell einfach nur eingegeben wurde. Um einen Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei weißen Punkten und wählen Sie dann den entsprechenden Datenpunkt aus. **Bitte beachten** : Es kann nur ein Datenpunkt **oder** eine händisch eingetragene Nachricht verwendet werden!<br>

# Geräte

![device\_conf\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/device_conf_ger.png)

- **aktiv** : Ist standardmäßig aktiviert. Hier kann man ein Gerät vorrübergehend deaktivieren, damit es keine Benachrichtigungen mehr sendet
- **Gerät** : wird automatisch angelegt
- **Alexa** : Alle zuvor erstellten Alexas werden hier aufgelistet und können per Klick hinzugefügt werden
- **sayit** : Alle zuvor erstellten sayit-Geräte werden hier aufgelistet und können per Klick hinzugefügt werden
- **Telegramm** : Alle zuvor angelegten Telegrammbenutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **WhatsApp** : Alle zuvor angelegten WhatsApp-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **Pushover** : Alle zuvor angelegten Pushover-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **E-Mail** : Alle zuvor angelegten E-Mail-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **Signal** : Alle zuvor angelegten Signalbenutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **Matrix** : Alle zuvor angelegten Matrixbenutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- **ausschalten** : Wenn ausgewählt, schaltet sich die Steckdose nach Beendigung des Vorgangs automatisch ab. Kann nur genutzt werden, wenn unter „Geräte“ auch ein Ausschaltdatenpunkt hinterlegt wurde
- **Ausschaltverzögerung** : Hier kann optional ein Timeout in **Minuten** eingegeben werden. Nach Ablauf des Timeouts wird die Steckdose, _wenn auto off denn altiviert ist_ , abgeschaltet. Die Endebenachrichtigung des Gerätes bleibt von einem Timeout jedoch unberührt! Kann nur genutzt werden, wenn unter „Geräte“ auch ein Ausschaltdatenpunkt hinterlegt wurde
- **Abbrucherkennung** : Wenn aktiviert, versucht der Adapter zu erkennen, ob ein Gerät bereits vor der Benachrichtigung von Hand abgeschaltet wurde und dann nicht mehr meldet.

Nachdem nun auf „ **Speichern und schließen** “ geklickt wurde, wird unter _Objekte -> Geräte-Erinnerung_ nun für jedes neu angelegte Gerät ein Ordner erstellt, in dem

- Bitte nicht stören (wenn aktiviert, werden keine Nachrichten per **Sprachassistent** versendet)
- maximale Laufzeit
- der aktuelle Zustand des Gerätes
- Laufzeitalarm
- AverageConsumption (Kann als Hilfe genutzt werden, um die eigenen Schwellwerte zu ermitteln)
- die letzten Durchgänge im JSON-Format
- die letzte Laufzeit in hh:mm:ss
- der aktuelle Live-Verbrauch
- die Nachricht an die Messenger
- die aktuelle Laufzeit in hh:mm:ss
- die aktuelle Laufzeit in Millisekunden

angezeigt wird.

## Test-Taste

![testButton\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/testButton_ger.png)

Es gibt in jedem Messenger einen Testknopf. Wird dieser angeklickt, wird eine Testnachricht an den jeweiligen Messenger gesendet. Kommt keine Nachricht an, bitte die Konfiguration prüfen. Der Adapter wurde nicht selbst getestet, ob die Nachricht angekommen ist!

## Einblenden der Save Buttons, diese sollten nicht automatisch angezeigt werden

![force\_save\_buttons\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/force_save_buttons_ger.png)

Da die Speicher-Buttons gelegentlich nicht angezeigt werden, wurde ein Button zum Erzwingen eben dieser eingebaut. Drückt man auf ihn, erscheinen die Speicherbuttons. Das Speichern erfolgt dann aber auf eigene Gefahr, da der Adapter den Eingang nicht prüft! Es kann zum Absturz des Adapters oder auch zum Datenverlust der Konfiguration kommen

## Alexa erstellen

![alexa\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/alexa_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **'alexa2/../announcement'/'speak'** : Hier muss **unbedingt** der Datenpunkt ausgewählt werden, welcher eure Alexa sprechen lässt. Um den Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei kleinen weißen Punkten.
- **Lautstärke 0-100** : Lautstärke, mit der eure Alexa sprechen soll (von 0 - 100%) Mit den 2 letzten Feldern kann ein Zeitraum erstellt werden, in dem eure Alexa Sprachausgaben tätigen darf. Standardmäßig ist der Zeitraum von 00:00 Uhr - 23:59 Uhr aktiv.
- **aktiv ab** : Startzeit des Benachrichtigungszeitraumes
- **aktiv bis** : Endzeit des Benachrichtigungszeitraumes

## SayIt-Benutzer erstellen

![sayit\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/sayit_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **'sayit/../text'** : Den Datenpunkt "text" im jeweiligen sayIt-Geräteordner auswählen. Hier wird die Textausgabe hingesendet.
- **Lautstärke 0-100** : Lautstärke, mit der Ihr Sayit-Gerät sprechen soll (von 0 - 100%)
- **aktiv ab** : Startzeit des Benachrichtigungszeitraumes
- **inaktiv ab** : Endzeit des Benachrichtigungszeitraumes

## pushover Benutzer erstellen

![pushover\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/pushover_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **Pushover-Instanz** : Die Instanz, an die gesendet werden soll
- **Betreff** : optionaler Betreff der Nachricht
- **Geräte-ID** : optionale Geräte-ID, die gesendet werden soll
- **Priorität** : Die Priorität, mit der gesendet werden soll
- **Klang** : Der Sound, der abgespielt werden soll, wenn Pushover die Nachricht erhält
- **TTL** : Dauer, nach der eine Nachricht gelöscht werden soll (Sekunden)

## E-Mail-Benutzer erstellen

![email\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/email_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **Absenderadresse** : E-Mailadresse, von der aus gesendet wird
- **Empfängeradresse** : E-Mailadresse, die die Nachricht empfangen soll

## Signal Benutzer erstellen

![signal\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/signal_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **Signal-Instanz** : Die installierte Instanz, an die gesendet werden soll

## Telegram-Benutzer erstellen

![telegram\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/telegram_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **Telegram-Instanz** : Die installierte Instanz, an die gesendet werden soll
- **Benutzername/Vorname/ChatID auswählen** : Auswählen, ob ein Benutzername, Vorname oder die ChatID (empfohlen) gesendet werden soll. Die Daten liegen in der Telegram-Instanz. Wird eine negative ChatID eingegeben, so wird eine Gruppe gesendet
- **Benutzername oder Vorname oder ChatID eingeben** : Den Benutzernamen, Vorname oder die ChatID eingeben, je nachdem was ausgewählt wurde

## WhatsApp-Benutzer erstellen

![whatsapp\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/whatsapp_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **'whatsapp-cmb/../sendMessage'** : Der Datenpunkt des Whatsapp-Adapters, an den die Nachricht gesendet werden soll

## Discord-Benutzer erstellen

![discord\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/discord_ger.png)

- **Name** : Frei wählbarer Name, auch Sonderzeichen sind möglich
- **Discord Instanz** : Die Discord Ziel-Instanz
- **Benutzer-ID** : Die Benutzer-ID
- **Chat-Tag** : Der Benutzer-Tag
- **Chatname** : Der Benutzername ( **Pflichtfeld** )
- **Server-ID** : Die Server-ID des Discord-Servers
- **Kanal-ID** : Die Kanal-ID des Discord-Servers

# Standard en

![default\_types\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/default_types_ger.png) Diese Werte wurden über einen Zeitraum von mehreren Monaten und mit Hilfe zahlreicher Tester ermittelt. Änderungen der Werte können dazu führen, dass Geräte nicht mehr ordnungsgemäß erfasst werden und es so zu Falschmeldungen kommt.

# Benutzerdefinierte Gerätetypen

![custom\_types\_ger.png](../../../en/adapterref/iobroker.device-reminder/admin/pictures/custom_types_ger.png) Diese Werte können vom Benutzer angepasst und dann genutzt werden. Im Folgenden die Erklärung dazu:

**WICHTIG** : Diese Schwellwerte beziehen sich immer auf den aktuellen Wert des _Durchschnittsverbrauchs_ , der im entsprechenden Datenpunkt des Gerätes im Device-Reminder-Ordner abgelesen werden kann! Dieser Wert wird berechnet und zeigt daher nie den aktuellen Live-Wert an!

- **Schwellwert 'Start' (Watt)** : Der Startwert in Watt muss überschritten werden, damit das Gerät als gestartet wird
- **Schwellwert 'Ende' (Watt)** : Endwert in Watt der unterschritten werden muss, damit das Gerät als beendet erkannt wird
- **Schwellwert 'Standby' (Watt)** : Schwellwert, um Gerät als „AUS“ oder „IN STANDBY“ anzuzeigen. Liegt der aktuell berechnete Wert unter dem Schwellwert **Standy** , so wird das Gerät als ausgeschaltet erkannt
- **Anzahl Startwerte** : Hier wird angegeben, wie oft der „Startwert“ **in Folge** überschritten werden muss. Ein einmaliges Unterschreiten führt zum Startabbruch. Der Durchschnitt dieser Werte muss über dem Startwert liegen, damit das Gerät als gestartet erkannt wird.<br> _Bsp: Der Wert soll 10W betragen und 3x in Folge überschritten werden. 1. 15W, 2. 1W, 15W => Startphase wurde abgebrochen, weil der zweite Wert unter 10 lag._
- **Anzahl Endwerte** : Hier wird angegeben, wie viele Werte aufgezeichnet werden sollen, bevor berechnet wird, ob das Gerät fertig ist. Je weniger Werte hier stehen, desto ungenauer ist das Ergebnis und die Gefahr von Falschmeldungen steigt. Je höher der Wert, umso genauer die Erfassung. Der Nachteil besteht jedoch darin, dass die Fertigmeldung stark verzögert gesendet wird. Ende wird erst dann erkannt, wenn „Anzahl Endwerte“ erreicht ist und der Durchschnittsverbrauch unter dem „Schwellwert ‚Ende‘ (Watt)“ liegt.

_Kurze Beispielrechnung:_ Es kommen alle 10 Sekunden Verbrauchswerte rein. **Schwellwert 'Ende' (Watt)** steht auf 50, **Anzahl Endwerte** auf 100. Nachdem das Gerät als gestartet wurde, werden 100 Werte ( _dauert 100Werte x 10 Sekunden = 1000 Sekunden_ ) aufgezeichnet und erst danach der Mittelwert gebildet. Liegt dieser unter 50, wird nach ca. 16,5 Minuten (wir erinnern uns an **eine Anzahl Endwerte** = 100 Werte) **fertig** erkannt und es geht eine Meldung (wenn denn konfiguriert) raus. Liegt der Wert über 50, passiert nichts, da das Gerät noch in Betrieb ist. Jeder weitere Wert wird nun durch den ältesten ersetzt und es wird nach jedem neuen Wert ein neuer Durchschnitt berechnet.<br>

# Unterstützung

**Falls euch meine Arbeit gefällt:**<br>

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=3EYML5A4EMJCW\&source=url)

## Changelog

Der Changelog ist in der englischen Version der readme zu finden <br>
[english readme](/#/adapters/device-reminder)
<br>

## License

MIT License

Copyright (c) 2024 xenon-s

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