---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: 35YLzZGCcEvtRZxNdJtUJv+FJOfRzzS2HD5mbEVWV0w=
---
![Логотип](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Количество установок](http://iobroker.live/badges/alarm-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Известные уязвимости](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

# IoBroker.alarm
**Действия на гитхабе**:

![Действия на GitHub](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[английское описание](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## Тревога ioBroker
Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne große programmiertechnische Vorkenntnisse realisieren lässt.
Er bietet die Möglichkeit 3 Sicherheitskreise zu configurieren und diese z. B. bei Nachtruhe oder De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz "состояния", auf andere "состояния" möglich. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm и Passwort vorgenommen.

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen delay Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren / siren_inside für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst wird (während dieser Zeit wird der Stille Alarm ausgelöst)

----------------------------------------------------------------------------------------------------------------------

### Вкладка Benachrichtigungen
Benachrichtigungen über Andere Adapter wie z. B. Telegramm, Электронная почта или здесь.
[Проблема](#Probleme)

Bei Benachrichtungen den Telegram Adapter, ist es möglich User-oder Chat IDs zu benutzen.

----------------------------------------------------------------------------------------------------------------------

### Tab Überwachung
Hier werden die Kreise der Anlage configuriert.
*die Namen der States lassen sich ändern*

Der Alarmkreis hat die Priorität "hoch" und hat bei aktivierter Anlage (scharf) Vorrang vor allen anderen Kreisen. Er dient zur eigentlichen Überwachung der Anlage. Dies entspricht den Vollschutz einer Alarmanlage. scharf intern befindet, dies entspricht einem Außenhautschutz einer Alarmanlage.Der Meldekreis dient nur zur Meldung während der Zustände scharf, scharf intern und bei der Nachtruhe.
*Es ist durchaus möglich, dass man für einem state, den Haken bei allen drei Kreisen macht.*

Sollte man einen Kontakt haben, der den Alarmkreis nicht sofort auslösen soll, kann man das Häkchen bei "stiller Alarm" aktivieren, daturch wird nach Ablauf der eingestellten Zeit (Haupteinstellungen), der Alarm ausgelöst.

Sollte es erforderlich sein die Einzelnen States nicht auf *true*, sondern auf *false* zu triggern (z.B. Drahtbruchsichere Sensoren), so kann man das Häkchen bei "negieren" setzen.

Sollte man im Tab Haupteinstellungen die Option "verlassen" aktiviert haben, kann man unter dem entsprechenden Datenpunkt "verlassen" anwählen. Dies bewirkt, dass bei verzögerte Aktivierung, der Countdown nicht ablaufen muss, sondern es reicht z. B. die Tür zu schließen.

Die Kreise werden folgendermaßen überwacht:

#### Алармкрайс:
Alarmanlage lässt sich nicht aktivieren (scharf schalten) wenn ein konfigurierter state aktiv ist. Bei aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage.

#### Стажер Шарф Крайс:
Alle hier konfigurierten states werden beim Zustand scharf intern überwacht und lösen unter anderem den internen Alarm aus.

#### Мелдекрейс:
Der überwacht die konfigurierten states auf Veränderungen und melde dies.

----------------------------------------------------------------------------------------------------------------------

### Вкладка Sprachausgabe
Ist eine gewünschte Sprachausgabe z. B. bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen configurieren.
* Man muss sich sicher sein, das der ausgewählte Datenpunkt, mit einem Text beschrieben werden kann! З.Б. "скажи.0.tts"*

Möchte man sich die Ausgabe von Namen mit Ansagen lassen, kann man diese Option anwählen.

----------------------------------------------------------------------------------------------------------------------

### Вкладка Verknüpfungen
Hier ist es möglich Adapter interne States direkt mit externen States zu verknüpfen. Somit ist ein Umweg über ein Skript oder ähnlichen nicht erforderlich.
Es lässt sich somit z. B. bei Beginn der Nachtruhe, eine Verriegelung des Türschlosses realisieren.
![Логотип](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

#### Eingabeverknüpfungen
Trigger--> any = es wird bei jeder Änderung getriggert ne = es wird nur getriggert, wenn der Wert sich geändert

Auslösewert--> Ist der Wert, auf welchen getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

### Tab Andere Alarme
Es stehen einen zwei frei konfigurierbare Überwachungskreise zu Verfügung, diese werden bei Benutzung unabhängig dem Zustand der Alarmanlage ständig überwacht! Als Voreinstellung sind diese als Feuer- und Wasseralarm beschriftet. В der ganzen Konfiguration sind diese als Kreise 1 и 2 beschriftet und den Nummern zu erkennen.

Sollte es erforderlich sein die Einzelnen States nicht auf *true*, sondern auf *false* zu triggern (z.B. Drahtbruchsichere Sensoren), so kann man das Häkchen bei "negieren" setzen.

####Es ist darauf zu achten, dass keine States aus dem eigentlichen Hauptüberwachungskreisen benutzt werden!
----------------------------------------------------------------------------------------------------------------------

Der Adapter liefert eine ganze Anzahl an заявляет:

#### "alarm.x.use...".
Das sind die eigentlichen заявляет um die Alarmanlage zu bedienen.

- use.activate_nightrest -> Aktivierung der Nachtruhe
- use.activate_sharp_inside_circuit -> Aktivierung der Überwachung des Warnkreises (стажер)
- use.disable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable -> Aktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung/Aktivierung/Warnkreis/Aktivierung mit Verzögerungszeit
- use.quit_changes -> Rücksetzen состояний *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed, other_alarms.one_changes, other_alarms.two_changes*
- use.toggle_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Password
- use.toggle_with_delay -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit
- use.panic -> Händische Auslösung der Alarmanlage(Einbruch), auch wenn diese deaktiviert ist

#### "alarm.x.status...."
Hier lässte sich der Zustand der Anlageablesen.

- status.sleep -> Signalisiert den Zustand der Automatic Nachtruhe

#### "alarm.x.info...."
Liefert zusätzliche Informationen wie z.B. welche "Türen offen sind" oder einen Состояние журнала.
Der log_today state wird um Mitternacht geleert.

#### "alarm.x.other_alarms...."
Beinhaltet die Informationen für die "anderen" Alarmkreise 1 + 2.

----------------------------------------------------------------------------------------------------------------------

## Проблема
- wenn man eine Telegram oder ähnliches über das + hinzufügt, kann man nur ein state der Instanz auswählen und man muss bis auf *telegram.0* alles löschen.

#### Wichtig, die Benutzung dieses Adapters geschieht auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Haftung übernommen!

## Changelog

#### 3.0.3 (31.01.2022)
* (misanorot) changed burgle concept, added silent alarm at sharp inside, fixed little issues

#### 2.2.1 (20.01.2022)
* (misanorot) added notification when warnings at beginning night rest

#### 2.2.0 (16.01.2022)
* (misanorot) added telegram special parameters

#### 2.1.1 (07.11.2021)
* (misanorot) added countdown state for silent alarm

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

Copyright (c) 2019-2022 misanorot <audi16v@gmx.de>