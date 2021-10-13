---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: XlZMcUxxTRqFBI9uuC02NVMS0VGhEE1NEm/7i1cLpYg=
---
![Logo](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Anzahl der Installationen](http://iobroker.live/badges/alarm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

#ioBroker.alarm
**Github-Aktionen**:

![GitHub-Aktionen](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Englische Beschreibung](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker-Alarm
Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne große programmiertechnische Vorkenntnisse realisieren lässt.
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z. B. bei Nachtruhe oder De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz "states", auf andere "states" möglich. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

----------------------------------------------------------------------------------------------------------------------

### Registerkarte Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm und Passwort vorgenommen.

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen delay Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst WIRD (während dieser Zeit wird der Stille Alarm ausgelöst)
- Auslösezeit bei Warnungen/Sirene innen -> Bei Auslösung des Benachrichtigungskreises oder scharf innen Kreises, wird der jeweils zugehörige Datenpunkt für die Zeit auf true gesetzt

----------------------------------------------------------------------------------------------------------------------

###Tab Benachrichtigungen
Benachrichtigungen über Andere Adapter wie z. B. Telegramm, E-Mail oder andere.
[Probleme](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### Registerkarte Überwachung
Hier werden die Kreise der Anlage konfiguriert.
*die Namen der Staaten lassen sich ändern*

Der Alarmkreis hat die Priorität „hoch“ und hat bei aktivierter Anlage (scharf) Vorrang vor allen anderen Kreisen. Er dient zur eigentlichen Überwachung der Anlage. Dies entspricht den Vollschutz Einer Alarmanlage. Der scharfe interne Kreis wird überwacht, wenn sterben Anlage sich im Zustand Der Meldekreis dient nur zur Meldung während der Zustände scharf, scharf intern und bei der Nachtruhe.
*Es ist durchaus möglich, dass man für einen Staat, den Haken bei allen drei Kreisen macht.*

Sollte man einen Kontakt haben, der den Alarmkreis nicht sofort auslösen soll, kann man das Häkchen bei "stiller Alarm" aktivieren, dadurch wird nach Ablauf der eingestellten Zeit (Haupteinstellungen), der Alarm ausgelöst.

Sollte es erforderlich sein, sterben Einzelstaaten nicht auf *wahr*, sondern auf *false* auszulösen (z.B. Drahtbruchsichere Sensoren), so kann man das Häkchen bei "negieren" setzen.

Sollte man im Tab Haupteinstellungen die Option "verlassen" aktiviert haben, kann man unter dem entsprechenden Datenpunkt "verlassen" anwählen. Stirbt bewirkt, dass bei verzögerte Aktivierung, der Countdown nicht ablaufen muss, sondern es reicht z. B. die Tür zu schließen.

Die Kreise werden wie folgt überwacht:

#### Alarmkreis:
Alarmanlage sich nicht aktivieren (scharf schalten), wenn ein konfigurierter Zustand aktiv ist. Bei aktivierter Alarmanlage Führt Eine Veränderung sofort zur Auslösung der Anlage.

#### Scharf interner Kreis:
Alle hier konfigurierten Zustände werden beim Zustand scharf intern überwacht und unter anderem den internen Alarm aus gelöst.

#### Meldekreis:
Der überwacht die konfigurierten Zustände auf Veränderungen und meldet dies.

----------------------------------------------------------------------------------------------------------------------

### Registerkarte Sprachausgabe
Ist eine gewünschte Sprachausgabe z. B. bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren.
*Man muss sich sicher sein, das der ausgewählte Datenpunkt, mit einem Text beschrieben werden kann! ZUM BEISPIEL. "sayit.0.tts"*

Möchte man sich sterben Ausgabe von Namen mit Ansagen lassen, kann man diese Option anwählen.

----------------------------------------------------------------------------------------------------------------------

###Tab-Verknüpfung
Hier ist es möglich Adapter interne Staaten direkt mit externen Staaten zu verknüpfen. Somit ist ein Skript oder ähnlicher Weg nicht erforderlich.
Es lässt sich somit z. B. bei Beginn der Nachtruhe, eine Verriegelung des Türschlosses realisiert.
![Logo](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

#### Eingabeverknüpfungen
Trigger --> any = es wird bei jeder Änderung getriggert ne = es wird nur getriggert, if der Wert sich geändert

Auslösewert--> Ist der Wert, auf welchen getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

###Tab Andere Alarme
Es stehen eineninen zwei frei konfigurierbaren Kreise zur Verfügung, this Werden Überwachen Bei Benutzung Unabhängig Dem Zustand Der Alarmanlage Ständig überwacht! Als Voreinstellung sind this as Feuer- und Wasseralarm beschriftet. In der ganzen Konfiguration sind this as Kreise 1 und 2 beschriftet und an den Nummern zu erkennen.

Sollte es erforderlich sein, sterben Einzelstaaten nicht auf *wahr*, sondern auf *false* auszulösen (z.B. Drahtbruchsichere Sensoren), so kann man das Häkchen bei "negieren" setzen.

####Es ist darauf zu achten, dass keine Staaten aus dem eigentlichen Hauptüberwachungskreisen benutzt werden!
----------------------------------------------------------------------------------------------------------------------

Der Adapter liefert eine ganze Anzahl an Staaten:

#### "alarm.x.benutzen.....".
Das sind die eigentlichen Zustände um die Alarmanlage zu beherrschen.

- use.activate_nightrest -> Aktivierung der Nachtruhe
- use.activate_sharp_inside_circuit -> Aktivierung der Überwachung des Warnkreises (intern scharf)
- use.disable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable -> Aktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung/Aktivierung/Warnkreis/Aktivierung mit Verzögerungszeit
- use.quit_changes -> Rücksetzen der Zustände *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed, other_alarms.one_changes, other_alarms.two_changes*
- use.toggle_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort
- use.toggle_with_delay -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit
- use.panic -> Händische Auslösung der Alarmanlage(Einbruch), auch wenn diese deaktiviert ist

#### "alarm.x.status...."
Hier lässte sich der Zustand der Anlage ablesen.

- status.sleep -> Signalisiert den Zustand der sicheren Nachtruhe

#### "alarm.x.info...."
Liefert zusätzliche Informationen wie z.B. Welche "Türen offen sind" oder einen Log-Status.
Der log_today state wird um Mitternacht geleert.

#### "alarm.x.andere_alarme...."
Beinhaltet die Informationen für die "anderen" Alarmkreise 1 + 2.

----------------------------------------------------------------------------------------------------------------------

##Probleme
- if man ein Telegramm oder ähnliches über das + hinzufügt, can man nur ein state der Instanz auswählen und man muss bis auf *telegram.0* alles löschen.

#### Wichtig, die Benutzung dieses Adapters geschieht auf eigene Gefahr, für Sonderfehlfunktionen wird keine Haftung übernommen!

## Changelog

#### 2.1.0 (11.10.2021)
* (misanorot) extend list states and speech output, added leave option

#### 2.0.2 (08.08.2021)
* (misanorot) fixed password issues

#### 2.0.1 (04.05.2021)
* (misanorot) fixed ack issues

#### 2.0.0 (22.03.2021)
* (misanorot) added other alarms

#### 1.9.0 (08.01.2021)
* (misanorot) added html states and fixed little issues

#### 1.8.0 (26.11.2020)
* (misanorot) added status.state_list to shortcuts

#### 1.7.0 (20.11.2020)
* (misanorot) changed notifications and fixed little issues

#### 1.6.0 (08.11.2020)
* (misanorot) changed time inputs to numbers

#### 1.5.0 (08.11.2020)
* (misanorot) added stop inside alarm with disable

#### 1.4.0 (05.11.2020)
* (misanorot) added silent alarm selection for every state

#### 1.3.0 (01.11.2020)
* (misanorot) added diffrent time options

#### 1.2.0 (09.07.2020)
* (misanorot) added countdown speech output

#### 1.1.0 (05.07.2020)
* (misanorot) Added input shortcuts

#### 1.0.0 (01.07.2020)
* (misanorot) added alarm and silent flash light

#### 0.9.0 (28.06.2020)
* (misanorot) Homekit integrated, set shortcuts only when changed

#### 0.8.0 (18.06.2020)
#### (misanorot) !!! Changed circuits dramatacly !!! Please do a new installation when you come from less versions

#### 0.7.5 (14.06.2020)
* (misanorot) fixed a few little issues

#### 0.7.0 (07.06.2020)
* (misanorot) edit notification sentences in admin

#### 0.6.0 (31.05.2020)
* (misanorot) changed speech output

#### 0.5.0 (14.05.2020)
* (misanorot) added use.list state

#### 0.4.0 (14.05.2020)
* (misanorot) added warn circuit monitoring

#### 0.3.0 (04.05.2020)
* (misanorot) expaned speech output

#### 0.2.2 (30.04.2020)
* (misanorot) added alexa2 speak output

#### 0.2.0 (22.04.2020)
* (misanorot) added more states

#### 0.1.2 (19.04.2020)
* (misanorot) status.state  activated

#### 0.1.1 (28.03.2020)
* (misanorot) added states and lists - fixed issues - translation

#### 0.1.0 ()
* (misanorot) add password for de/activation -- better logging

#### 0.0.9 (19.02.2020)
* (misanorot) add sayit

#### 0.0.8 (03.02.2020)
* (misanorot) initial release

## License
MIT License

Copyright (c) 2019-2021 misanorot <audi16v@gmx.de>