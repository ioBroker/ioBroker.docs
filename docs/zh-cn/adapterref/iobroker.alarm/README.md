---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: XlZMcUxxTRqFBI9uuC02NVMS0VGhEE1NEm/7i1cLpYg=
---
![标识](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![安装数量](http://iobroker.live/badges/alarm-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![依赖状态](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![已知漏洞](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

# IoBroker.alarm
**Github 操作**：

![GitHub 操作](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[英文说明](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker 警报
Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne große programmiertechnische Vorkenntnisse realisieren lässt。
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z. B. bei Nachtruhe oder De- und Aktivierung zu überwachen。 Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz "states", auf andere "states" möglich。 Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt。

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm 和 Passwort vorgenommen。

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen delay Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst wird (während dieser Zeit wird der Stille Alarm ausgelöst)
- Auslösezeit bei Warnungen/Sirene innen -> Bei Auslösung des Benachrichtigungskreises oder scharf innen Kreises, wird der jeweils zugehörige Datenpunkt für die Zeit auf true gesetzt

----------------------------------------------------------------------------------------------------------------------

### 标签 Benachrichtigungen
Benachrichtigungen über Andere Adapter wie z. B. Telegramm，Email oder andere。
[问题](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### 标签 Überwachung
Hier werden die Kreise der Anlage konfiguriert。
*die Namen der states lassen sich ändern*

Der Alarmkreis hat die Priorität „hoch” und hat bei aktivierter Anlage (scharf) Vorrang vor allen anderen Kreisen scharf intern befindet, dies entspricht einem Außenhautschutz einer Alarmanlage. Der Meldekreis dient nur zur Meldung während der Zustände scharf, scharf intern und bei der Nachtruhe。
* Es ist durchaus möglich, dass man für einem state, den Haken bei allen drei Kreisen macht。*

Sollte man einen Kontakt haben, der den Alarmkreis nicht sofort auslösen soll, kann man das Häkchen bei "stiller Alarm" aktivieren, dadurch wird nach Ablauf der eingestellten Zeit (Haupteinstellungen), der Alarm ausgelst

Sollte es erforderlich sein die Einzelnen States nicht auf *true*，sondern auf *false* zu triggern (z.B. Drahtbruchsichere Sensoren)，所以 kann man das Häkchen bei "negieren" setzen。

Sollte man im Tab Haupteinstellungen die Option "verlassen" aktiviert haben, kann man unter dem entsprechenden Datenpunkt "verlassen" anwählen。 Dies bewirkt, dass bei verzögerte Aktivierung, der Countdown nicht ablaufen muss, sondern es reicht z. B. die Tür zu schließen。

Die Kreise werden folgendermaßen überwacht：

#### 警报器：
Alarmanlage lässt sich nicht aktivieren (scharf schalten) wenn ein konfigurierter state aktiv ist。 Be aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage。

#### Scharf 实习生 Kreis：
Alle hier konfigurierten 状态 werden beim Zustand scharf intern überwacht und lösen unter anderem den internen Alarm aus.

####梅尔德克莱斯：
Der überwacht die konfigurierten 声明 auf Veränderungen 和 meldet 死亡。

----------------------------------------------------------------------------------------------------------------------

### 标签 Sprachausgabe
Ist eine gewünschte Sprachausgabe z. B. bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren。
*Man muss sich sicher sein, das der ausgewählte Datenpunkt, mit einem Text beschrieben werden kann！ Z.B. "sayit.0.tts"*

Möchte man sich die Ausgabe von Namen mit Ansagen lassen, kann man diese Option anwählen。

----------------------------------------------------------------------------------------------------------------------

### Tab Verknüpfungen
Hierist es möglich Adapter interne states direkt mit externen states zu verknüpfen。 Somit ist ein Umweg über ein Skript oder ähnlichen nicht erforderlich。
Es lässt sich somit z。 B. bei Beginn der Nachtruhe, eine Verriegelung des Türschlosses realisieren。
![标识](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

#### Eingabeverknüpfungen
触发器--> any = es wird bei jeder Änderung getriggert ne = es wird nur getriggert, wenn der Wert sich geändert

Auslösewert--> Ist der Wert, auf welchen getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

### 标签安德雷·阿勒姆
Es stehen einen zwei frei konfigurierbare Überwachungskreise zu Verfügung, diese werden bei Benutzung unabhängig dem Zustand der Alarmanlage ständig überwacht！ Als Voreinstellung sind diese als Feuer- und Wasseralarm beschriftet。 In der ganzen Konfiguration sind diese als Kreise 1 und 2 beschriftet und an den Nummern zu erkennen。

Sollte es erforderlich sein die Einzelnen States nicht auf *true*，sondern auf *false* zu triggern (z.B. Drahtbruchsichere Sensoren)，所以 kann man das Häkchen bei "negieren" setzen。

####Es ist darauf zu achten, dass keine States aus dem eigentlichen Hauptüberwachungskreisen benutzt werden！
----------------------------------------------------------------------------------------------------------------------

Der Adapterliefert eine ganze Anzahl an 指出：

####“警报.x.使用.....”。
Das sind die eigentlichen 状态 um die Alarmanlage zu bedenen。

- use.activate_nightrest -> Aktivierung der Nachtruhe
- use.activate_sharp_inside_circuit -> Aktivierung der Überwachung des Warnkreises（实习生）
- use.disable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable -> Aktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung/Aktivierung/Warnkreis/Aktivierung mit Verzögerungszeit
- use.quit_changes -> Rücksetzen der states *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed, other_alarms.one_changes, other_alarms.two_changes*
- use.toggle_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort
- use.toggle_with_delay -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit
- use.panic -> Händische Auslösung der Alarmanlage(Einbruch), auch wenn diese deaktiviertist

####“警报.x.状态....”
Hier lässte sich der Zustand der Anlageablesen。

- status.sleep -> Signalisiert den Zustand der automatischen Nachtruhe

#### "alarm.x.info...."
Liefert zusätzliche Informationen wie z.B. welche "Türen off sind" oder einen 日志状态。
Der log_today state wird um Mitternacht geleert。

#### "alarm.x.other_alarms ...."
Beinhaltet die Informationen für die "anderen" Alarmkreise 1 + 2。

----------------------------------------------------------------------------------------------------------------------

## 问题
- wenn man eine Telegram oder ähnliches über das + hinzufügt, kann man nur ein state der Instanz auswählen und man muss bis auf *telegram.0* alles löschen。

#### Wichtig, die Benutzung dieses Adapters geschieht auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Haftung übernommen！

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