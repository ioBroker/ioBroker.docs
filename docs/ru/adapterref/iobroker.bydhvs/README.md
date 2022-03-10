---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: без заголовка
hash: Xu7CAnCfg6NNW84Iow+g4D7jl5exZKaoGiLMOGKkBHg=
---
![Логотип](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Адаптер bydhvs для ioBroker
Данные опроса батареи BYD HVS

## Английский:
## Введение
Этот адаптер получает данные от фотоэлектрической батареи byd (https://www.bydbatterybox.com/) и помещает их в точки данных в адаптере. К сожалению, официального API и документации нет, поэтому я использовал wireshark и симулятор byd-hvs-simulator, чтобы попытаться понять связь. Мой адаптер имитирует byd-app, отправляет подобные пакеты на устройство и анализирует ответы.

## Будь осторожен
В приложении beConnect есть два шага: на первом этапе вы получаете обычные данные, на втором шаге вы получаете подробные данные для всех ячеек (температура и напряжение отдельной ячейки и некоторые другие подробности). быть задержкой после одного из пакетов данных, пока я не получу результат. Я думаю, тем временем все клетки измеряются, но я не уверен. Я определенно не уверен, что вы повредите свою батарею слишком частым опросом этих данных, поэтому имейте в виду: вы действуете на свой страх и риск!

## Подсказка для систем с 5 модулями
Люди у которых 5 модулей: Детали ячейки читаются только для первых 4-х модулей - протокол одинаковый для 2-4 модулей. Я хотел бы расширить его на 5 модулей, но либо кто-нибудь купит мне три недостающих модуля ;-) чтобы я мог проанализировать протокол, либо я получу захват wireshark с рабочего соединения.

## Настройки
Интервал: Это просто: как часто (с) будут опрашиваться данные. IP-адрес: Это самоочевидно. Либо вы используете стандартный адрес (192.168.16.254) и меняете маршрутизацию дома, например: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Преимущество в том, что приложение beConnect тоже работает. Другая возможность: вы меняете IP-адрес ящика. Но: Будьте осторожны: текст на веб-странице сбивает с толку, и если вы не совсем уверены в том, что делаете: ПОЖАЛУЙСТА, не трогайте настройки. На немецких форумах читал от людей которые залочили свою систему и пути назад нет, либо быд присылает тебе замену ХВУ либо приходится покупать новый.
Детали батареи: как объяснялось выше: Вам нужны детали батареи? Если да: установите checkobx.
Сведения о батарее - каждые ... циклов: Также, как и выше, должен быть снят Тестовый режим - показывать данные в журнале ошибок: Если вы установите этот флажок: отправленные и полученные данные отображаются в журнале ошибок, поэтому вы можете легко загрузить данные и отправить их мне в случае ошибок.

## Немецкий:
## Ein wenig Erklärungen:
Prinzipiell ist der Adapter durch Anaylse der Datenpakete zwischen der BYD-App und dem BYD-Akku-System entstanden. Es werden im Wesentlichen die Daten aus dem TAB System Info und aus dem TAB Diagnosis dargestellt. Offensichtlich sind die Daten für "System Info" sofort in der Batterie bereit zum abholen, für die Diagnose-Daten sieht es so aus als wäre ein Messvorgang erforderlich, zwischen der Abfrage und den Werten muss ein Zeitintervall von gut 3 Sekunden eingehalten werden.

Ich bin mir nicht sicher ob das BYD-System durch zu häufige Abfragen beschädigt wird, а также: Es ist Dein Risiko был Du hier einträgst!

## Zu den Einstellungen:
Intervall: Zeitlicher Abstand zwischen den Abfragen des Adapters

IP-адрес: Eigentlich logisch, damit ist die IP-Adresse des Adapters gemeint. Dafür gibt es zwei Möglichkeiten: Entweder hält man sich an die Anleitung von Becker3 aus dem Photovoltaik-Forum, ist hier verlinkt: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID= 2215343#post2215343 . Das hat den Vorteil das auch die BYD-APP läuft und man mit dieser direkt die Daten, auch zum Vergleich, herankommt. Чтобы настроить IP-адрес с помощью BYD-Box на DHCP-сервере, выполните следующие действия. Ausdrücklich waren möchte ich vor Änderungen an den IP-Einstellungen der BOX! Im Forum kann man Berichte von Leute lesen die sich die Erreichbarkeit der Box dauerhaft runiert haben.

Batterie-Details: Steuerung, ob die Details zu den Zellen gelesen werden sollen

Lesezyklen zu Batterie-Details: Anzahl der "Normal-Lese-Zyklen" bis wieder einmal die Diagnose-Daten gelesen werden. Hier die Warnung dazu: Ich habe keine Idee ob man sich durch häufige Diagnose-Messungen Nachteile einhandelt, daher empfehle ich den Wert möglichst hoch zu setzen. Ich wüsste auch nicht was man mit den Diagnose-Daten im regelmäßigen Poll anfangen sollte.

Zu den Batterie-Größen: Der Adapter funktioniert auch für Zelltemperaturen und ZellSpannungen bei 2,3 и 4 Batterie-Modulen. Bei einem System mit 5 Modulen werden nur die Zellspannungen der ersten 128 Zellen angezeigt. Für die Zellen 129 bis 160 ist mir nicht bekannt wo die Daten gespeichert werden. Ich würde das gerne mit in den Adapter einbauen, benötige aber dafür einen Wireshark-Mittschnitt der Kommunikation zwischen der beConnect App und dem Speicher. Ich helper auch gerne wenn jemand nicht weiß wie man den Mittschnitt machen kann, entweder для Teamviewer или для сообщений на форуме. Offensichtlich funktioniert die Kommunikation für die 5. Einheit anders als bei den ersten 4 Einheiten.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.3.1 - testing
* Better detection of battery type and inverter
* SOC not only from normal data but from diagnosis-data, too. There we have one decimal place more
* removed frequency limit for battery detail data

### 1.3.0 (2021-11-06)
* updated even more dependencies
* official release with new state SOH

### 1.2.4-0 (2021-11-02)
* Added state: SOH
* updated dependencies as suggested from bot

### 1.2.3 (2021-06-18)
* changed ratio of logo

### 1.2.2 (2021-06-14)
* bump to new patch-level (to get rid of the "-0")

### 1.2.2-0 (2021-05-30)
* Create States for Diagnose-Data only if necessary
* changes according review of the adapter

###

## License
MIT License

Copyright (c) 2021 Christian <github@familie-herrmann.de>

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