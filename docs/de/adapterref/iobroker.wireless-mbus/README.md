---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: hjoPsz84eeGIspT5Vhyzef5SoGWx0XbQXK7uevCjvcs=
---
![Logo](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![installierte Anzahl](https://iobroker.live/badges/wireless-mbus-installed.svg)
![stabile Version](https://iobroker.live/badges/wireless-mbus-stable.svg)

# ioBroker.wireless-mbus

Dieser Adapter ermöglicht den Empfang drahtloser M-Bus-Daten von unterstützten Empfängern. Der Implementierungsumfang der Geräte variiert, jedoch können wMBus-Modi für alle aufgeführten Geräte konfiguriert werden.

- Embit WMB-Module
- Amber Wireless AMB8465 ( **Achtung:** Der Befehlsmodus (UART\_CMD\_Out\_Enable) ist aktiviert!)
- IMST iM871A
- IMST iU891A-XL
- CUL

Der WMBUS-Stack wurde aus dem FHEM-Projekt übernommen und umfassend überarbeitet und neu strukturiert. Die Tests erfolgten mit Rohdaten aus dem Internet, OMS-Beispieldaten und Testdaten aus der jmbus-Bibliothek. Einige Grenzfälle sind noch ungetestet.

Die Erstellung, Aktualisierung usw. des Geräts basiert größtenteils auf dem M-Bus-Adapter von Apollon77 (siehe unten).

Wenn der Adapter verschlüsselte Telegramme empfängt, sollte die Geräte-ID automatisch auf der Registerkarte „AES-Schlüsselkonfiguration“ angezeigt werden.

Falls der Parser fehlschlägt, werden die unformatierten Telegram-Daten im Zustand info.rawdata gespeichert.

_Achtung:_ Der Amber-Empfänger scheint im C-Modus nach einiger Zeit (oder nach einer bestimmten Anzahl empfangener Nachrichten) abzustürzen. Hardwarefehler?

_IMST iM871A-Variante:_ Es gibt einen „RWE Smart Home“-USB-Empfänger, der im Prinzip ein IMST iM871A ist, aber der Kernel lädt den entsprechenden Treiber nicht automatisch. Hier ist eine Einzeiler-Anweisung, um eine udev-Regel zu erstellen, die das Problem behebt:

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

## Links:

- [WMBus-Stack-Modul](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
- [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
- [Original WMBUS Stack: wm-bus](https://github.com/soef/wm-bus)
- [M-Bus-Protokoll](http://www.m-bus.com/files/MBDOC48.PDF)
- [OMS-Spezifikationen](https://oms-group.org/en/download4all/oms-specification/)

## Ersteinrichtung

Die Ersteinrichtung erfordert die Konfiguration der Grundlagen (Hardwareverbindung zum WMBus-Empfänger) und die Einrichtung von AES-Schlüsseln für alle zu erfassenden verschlüsselten WMBus-Knoten. Die AES-Schlüssel stellen dabei die größte Herausforderung dar.

### Grundlegende Einrichtung

Hierfür muss das passende USB-Gerät und die korrekte Baudrate ausgewählt werden ( **üblicherweise** für IMST iM871A: 57600 Baud; IMST iU891A-XL: 115200 Baud; Amber: 9600 Baud; Embit: 9600 Baud; CUL: 38400 oder 9600 Baud). Die meisten **Messgeräte** senden im „T-Modus“.

Ab Version 0.9.0 unterstützt der Adapter auch die Verbindung zu seriellen Geräten, die über einen TCP-Socket erreichbar sind. Die Benutzeroberfläche spiegelt dies jedoch (noch) nicht wider; Sie müssen „Benutzerdefinierter Port“ auswählen und den Hostnamen eingeben.`tcp://host:port` Die

### Weitere Optionen

- **Unveränderte Zustände aktualisieren** : Beim Eintreffen eines Telegramms werden alle Zustände aktualisiert, auch wenn sich ihr Wert nicht geändert hat. (Standard: aktiviert)
- **Energieeinheiten auf kWh umrechnen** : Alle Energieeinheiten (Wh und J) werden in kWh umgerechnet. (Standard: Aus)
- **Gerät nach aufeinanderfolgenden Fehlern vorübergehend sperren** : Wenn 10 aufeinanderfolgende Telegramme desselben Geräts nicht erfolgreich verarbeitet werden können, wird das Gerät bis zum Neustart des Adapters ignoriert (Standard: aktiviert).
- **Es werden nur Geräte mit bereits vorhandenem Objektbaum verarbeitet** : Telegramme von Geräten ohne Objektbaum werden ignoriert, sodass keine neuen Geräte erstellt werden – dies ist nützlich, sobald alle relevanten Zähler eingerichtet sind. Telegramme, die überhaupt nicht dekodiert werden können, werden ebenfalls ignoriert: Sie fügen kein Gerät zur AES-Schlüsselliste hinzu und werden nicht geschrieben.`info.rawdata` Die automatische Sperrliste zählt die Geräte weiterhin, sodass ein unerwünschtes Gerät keinen Dekodierungsversuch mehr verursacht – dies wird nur nicht im Protokoll vermerkt. Die Geräte werden beim Start des Adapters neu gesucht. Ein Gerät, das Sie aus der Objektliste löschen, ist nach dem nächsten Neustart endgültig entfernt, und ein Gerät, das wieder erkannt werden soll, muss ebenfalls neu geladen werden. (Standard: deaktiviert)

Kompakttelegramme (die von einigen Kamstrup-Geräten verwendet werden) werden automatisch unterstützt: Die Struktur eines vollständigen Telegramms wird – zusammen mit dem Gerät, sodass sie auch nach einem Neustart des Adapters erhalten bleibt – gespeichert und zum Dekodieren der Kompakttelegramme wiederverwendet. Lediglich die Kompakttelegramme, die ein Gerät sendet, bevor es zum ersten Mal ein vollständiges Telegramm gesendet hat, können nicht dekodiert werden und werden stillschweigend übersprungen.

### AES-Schlüssel

Die Geräte-ID setzt sich aus dem Herstellercode und der Geräte-ID zusammen (z. B. AAA-12345678). Der Schlüssel kann entweder als Klartext mit 16 Zeichen oder als Hexadezimalzeichenkette mit 32 Zeichen (16 Byte) eingegeben werden.

Die einfachste Methode zum Einrichten der Schlüssel besteht darin, den Adapter ohne Schlüsselkonfiguration zu starten und auf ein verschlüsseltes Telegramm zu warten. Anschließend generiert der Adapter einen Eintrag mit dem Schlüssel „UNBEKANNT“. (Wenn die Option „Nur Geräte mit Objektstruktur verarbeiten“ aktiviert ist, kann kein Gerät auf einen Schlüssel warten – die Schaltfläche ist dann deaktiviert und zeigt dies an.) Anschließend können Sie den entsprechenden Schlüssel eingeben und die Einstellungen speichern. Falls Sie unbekannte oder zu entfernende Geräte sehen (z. B. Geräte von Nachbarn), können Sie diese im Tab „Blockierte Geräte“ (siehe unten) eintragen.

### Unerwünschte Geräte blockieren

Über die Registerkarte „Blockierte Geräte“ können Sie vollständig verhindern, dass der Adapter Telegramme von unerwünschten Geräten verarbeitet.

Sie müssen lediglich die Geräte-ID eingeben (z. B. AAA-12345678), die Sie aus der Objektstruktur erhalten, nachdem ein Telegramm empfangen und analysiert wurde, oder aus dem (Debug-)Protokoll.

Wenn Sie das Gerät anschließend aus der Objektstruktur löschen, wird der Adapter es nicht erneut erstellen.

## Aktualisierung von Version 0.11.x

Version 0.12.0 ersetzt den integrierten Telegram-Parser durch die Bibliothek [wireless-mbus-parser](https://github.com/lvogt/wireless-mbus-parser) . Die Objekt-IDs bleiben unverändert, aber vier Dinge ändern sich:

- **Die Messwerte sind jetzt Zahlen** , kein vorformatierter Text mehr.`"474.240"` wurde`474.24` Die Staaten waren schon immer vom Typ`mixed` ioBroker selbst hat damit kein Problem, wohl aber ein History-Backend, das die Daten als Text gespeichert hat: InfluxDB akzeptiert keine Zahlen für Felder, die Zeichenketten enthalten, und der SQL-Adapter speichert einen Datentyp pro Datenpunkt. Daher beginnen diese Datenreihen von vorn. Überprüfen Sie nach dem Update das Log Ihres History-Adapters und entscheiden Sie für jede Datenreihe einzeln, ob die alten Daten gelöscht oder neben den neuen beibehalten werden sollen.
- **Skripte und Visualisierungen, die diesen Text vergleichen oder formatieren,** müssen überprüft werden:`state.val === '474.240'` Die Werte stimmen nicht mehr überein, und ein Widget, das auf der festen Anzahl von Dezimalstellen basierte, zeigt jetzt eine einfache Zahl an.
- **Tarif und Geräteeinheit wurden von den falschen Bits ausgelesen** und sind nun korrekt, daher ändern sich die _Bezeichnungen_ der Zustände eines Zählers mit mehreren Tarifen. Ihre IDs bleiben unverändert.
- **Reservierte und unbekannte VIFs können von der Bibliothek unterschiedlich benannt werden** , sodass einige Zustände ungewöhnlicher Zähler unter einer neuen ID erscheinen. Die alten bleiben erhalten und können gelöscht werden – alles andere wird wie zuvor beschrieben.

Die Option „Cache für Unterstützung kompakter Frames“ ist ebenfalls entfallen: Kompakte Telegramme werden jetzt immer unterstützt, und das erste Telegramm eines Meters wird nicht mehr zur automatischen Sperrliste gezählt.

### Techem- und Diehl-(PRIOS)-Messgeräte

Version 0.12.0 enthielt diese beiden Fehler: Ein Techem-Wärmekostenrechner meldete unter Namen wie „…“ unsinnige Ergebnisse.`VIF_RETURN_TEMP` Ein Techem-Wärmezähler konnte nicht ausgelesen werden und landete auf der automatischen Sperrliste, und ein PRIOS-Wasserzähler meldete sein Volumen als Heizkosteneinheit. Version 0.12.1 liest sie wieder korrekt aus – die von Version 0.12.0 erstellten Zustände bleiben erhalten und können gelöscht werden; die korrekten Zustände werden mit dem nächsten Telegramm geschrieben.

Zwei ihrer Zustände sind anders benannt als in Version 0.11.x, da die Werte der vorherigen Periode nun die Speichernummer tragen, zu der sie gehören (`1-1-…` statt`1-0-…` ), und die verbleibende Batterielebensdauer eines PRIOS-Zählers wird in Monaten statt in Jahren angegeben.

## Aufgaben

- Telegramme für S-Modus-Empfänger senden?
- Handhabungszähler mit "mehreren Telegrammen"

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.12.3 (2026-09-07)
* (ChL) Fix the CUL initialisation on the receivers that lose the first byte written after the line has been idle: every command is now sent with a separator in front of it, which is what gets lost instead of the command letter, and setting the mode waits for its confirmation rather than failing on a line that crossed it (#312)

### 0.12.2 (2026-09-05)
* (ChL) Add an option to only handle devices that already have an object tree, so that no new devices are created and no telegram of a device without one is reported
* (ChL) Remember the record layout of a device, so that its compact telegrams are decoded right after a restart of the adapter
* (ChL) Update wireless-mbus-parser to 1.3.1, which fixes the date of the current reading of a Techem meter - it used to be stamped with the year it was decoded in rather than with the year of the meter
* (ChL) Report at the log level the message deserves: a receiver that stays away no longer writes an error with every attempt, what the hardware says about itself is a warning, and the noise of the air is debug

### 0.12.1 (2026-09-05)
* (ChL) Fix Techem and Diehl (PRIOS) meters, which 0.12.0 decoded wrongly or not at all - the states it wrote for them carry wrong names and values and can be deleted
* (ChL) Fix the adapter stopping instead of blocking a device whose telegrams keep failing to decode
* (ChL) A 64 bit measured value with a scaling factor is a number now, like every other measured value

### 0.12.0 (2026-09-03)
* (ChL) Replace the built-in telegram parser with the wireless-mbus-parser library
* (ChL) New admin configuration UI (JSON config); a serial port can now simply be typed in, the separate "custom port" field is gone
* (ChL) Fix shutdown of the adapter: a serial connection over TCP was not closed properly and could reconnect itself while the adapter was stopping
* (ChL) Measured values are now stored as numbers instead of preformatted strings - a history adapter that stored them as text starts a new series
* (ChL) Fix decoding of the tariff and device unit of a data record
* (ChL) Compact telegrams are now supported without a separate option; the option "Cache for compact frames support" was removed
* (ChL) Follow further ioBroker repository recommendations: move the test code below `test/`, use the short `admin/i18n/<lang>.json` layout and clean up the keywords
* (ChL) Run the adapter tests only after linting and type checking succeeded
* (ChL) Use the adapter's own timer functions, so pending timers are cleared when the adapter is unloaded
* (ChL) Fix receivers getting stuck after disturbed reception: a damaged telegram no longer takes the following ones with it, and no longer leaves the adapter yellow until it is restarted by hand (#308, #309)
* (ChL) The adapter reconnects to the receiver instead of staying idle or stopping when the connection fails
* (ChL) Fix telegrams getting lost when several meters transmit at once, and damaged data being reported as readings of devices that do not exist
* (ChL) Declare the state that holds the raw data of an unreadable telegram as text rather than as a numeric value

### 0.11.0 (2026-08-29)
* (ChL) Require node.js 22 or newer, js-controller >=6.0.11 and admin >=7.6.20
* (ChL) Switch to @iobroker/eslint-config (ESLint 9 + Prettier)
* (ChL) Add release-script based release management
* (ChL) Include the admin translations in the published package

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de  
Copyright (c) 2021 - 2026 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)