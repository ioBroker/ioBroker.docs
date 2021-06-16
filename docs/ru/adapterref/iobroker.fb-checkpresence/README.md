---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: Z1IAPH1AFvuhK6O6okTb1JeGm4LYqDzN76Z39ij0Ymw=
---
![Логотип](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Количество установок (последнее)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Статус зависимости](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)

# IoBroker.fb-checkpresence
** Тесты: ** ![Тестирование и выпуск](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Адаптер fb-checkpresence для ioBroker
Адаптер проверяет присутствие членов семьи над фритцбоксом.
Вы должны указать имя члена семьи и mac-адрес (или ip-адрес) используемого устройства.
Комментарий не является обязательным, и вы можете включить или отключить члена семьи.
Точка данных основана на имени члена.

### Предварительные условия адаптера
Для правильной работы вам необходимо установить адаптер истории. Вы можете выбрать один из следующих адаптеров:

* История
* SQL
* InfluxDB

## Используемое устройство
Для этого адаптера используется AVM Fritzbox. Здесь вы можете найти информацию о Fritzbox https://avm.de/produkte/fritzbox/.
Сервисы fritzbox используются по протоколу TR-064.

### Условия Fritzbox
Используемый интерфейс TR-064 от fritzbox описан здесь: https://avm.de/service/schnittstellen/.
Используются следующие услуги и действия TR-064:

* Хосты: 1 - X_AVM-DE_GetHostListPath (поддерживается с 2017-01-09)
* Хосты: 1 - X_AVM-DE_GetMeshListPath
* Хосты: 1 - GetSpecificHostEntry
* Хосты: 1 - X_AVM-DE_GetSpecificHostEntryByIP (поддерживается с 18 мая 2016 г.)
* DeviceInfo: 1 - GetSecurityPort
* DeviceInfo: 1 - GetInfo
* WANPPPConnection: 1 - GetInfo
* WANIPConnection: 1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig: 1 - перезагрузка
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

По умолчанию интерфейс TR-064 не активирован. Однако это можно легко изменить через веб-интерфейс FritzBox. Для этого войдите в свой FritzBox и убедитесь, что режим эксперта активирован.
Затем вы найдете ниже «Домашняя сеть» Обзор домашней сети »Настройки сети» пункт «Разрешить доступ для приложений». Здесь вы должны установить флажок, а затем перезапустить FritzBox один раз.

Подсказка: после изменения параметров не забудьте перезапустить Fritzbox!<img src="doc/access_settings_network.JPG"/>

## Диалог конфигурации
### Общий
Значения конфигурации проверены, и можно сохранить только правильные значения. В противном случае кнопка сохранения неактивна.

### IP-адрес, пользователь и пароль Fritzbox
Конфигурация ip-адреса, пользователя и пароля необходима для получения данных устройства из fritzbox.
Следовательно, пользователь должен быть создан в fritzbox. Это требуется для более новой версии прошивки (> = 7.25) fritzbox. См. Здесь информацию: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%.1Box. Пароль зашифрован и не был сохранен в виде открытого текста. Имя пользователя и пароль могут содержать не более 32 символов. См. Информацию: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf % 20nicht% 20leer% 20sein.
Подсказка: в некоторых случаях могло случиться так, что fritzbox заблокировал пользователя, если пароль был введен неправильно.
Часто в журнале появляется сообщение о тайм-ауте. Пожалуйста, проверьте, правильно ли вы ввели имя пользователя и пароль. Затем вам необходимо перезагрузить fritzbox.

### Параметр SSL
В некоторых случаях адаптер не мог подключиться к fritzbox. Может помочь отключить эту опцию.
В этом случае адаптер пытается подключиться без https.

### Интервал
У вас есть отдельные интервалы для членов семьи и устройств Fritzbox.
Интервал для устройств Fritzbox можно настроить от 1 до 59 минут. Обычно значение от 1 до 5 минут является оптимальным интервалом для чтения данных fritzbox. Члены семьи могут быть настроены от 10 до 600. Каждый новый цикл начинается, если предыдущий цикл завершен.

### Время фильтрации
Если время фильтрации больше 0 с, состояние члена семьи проверяется дважды (после времени фильтрации), если состояние меняется на ложное. Если состояние истинно, состояние устанавливается немедленно.

### Адаптер истории
По адаптеру истории вычисляются некоторые значения. Вы можете выбрать, будет ли использоваться история, sql или адаптер infxdb для этих вычислений. Адаптер истории должен быть установлен предварительно, после чего его можно будет выбрать в диалоговом окне конфигурации.
Если конфигурация истории отключена, то вычисление некоторых значений не может быть осуществлено.

### Формат даты
Параметры маски формата даты описаны на этой веб-странице: https://www.npmjs.com/package/dateformat.
Маска формата используется для форматирования объектов таблиц html и json.

### Создание устройств FB
Если этот параметр отмечен, объекты создаются для каждого устройства в списке устройств Fritzbox.
Если этот параметр отключен, информация о сетке также отключена.

### Ресинхронизация объектов устройства FB
Если этот параметр отмечен, то объект устройства FB повторно синхронизируется со списком устройств Fritzbox.

### Создание информации о сетке
Эта опция может быть отмечена, если создание FB устройств разрешено. Если этот параметр отмечен, объекты сетки создаются для каждого устройства в списке устройств Fritzbox.

### Информация о гостях
Если этот параметр отмечен, создаются состояния для гостей.

### Генерация qr-кода
Если эта опция отмечена, генерируется qr-код от гостевой wlan.

### Настройки членов семьи
Для настроенного члена семьи вы должны ввести имя члена, имя хоста, Mac- и IP-адрес, комментарий, и вы можете включить или отключить члена. Группа не обязательна.
Если вы оставите группу пустой и установите флаг совместимости в значение true, поведение будет похоже на более старую версию adaper. Вы можете использовать состояние присутствия члена семьи или состояние, напрямую сопоставленное с именем члена семьи. В будущей версии вы должны использовать состояние присутствия. Это поведение можно включить / выключить с помощью флажка совместимости: -> compatibility = true: поведение как в более старой версии с пустой группой.
-> совместимость = true и группа не пуста: новое поведение. Все состояния под папкой familymembers.
-> совместимость = false: новое поведение. Все состояния под папкой familymembers.

Для каждого члена адаптер создает состояние присутствия и проверяет, присутствует ли член или нет. Состояние было изменено, если изменилось состояние присутствия.
Вы также можете включить фильтрацию для члена. Если состояние истинно, состояние немедленно меняется на истинное. Если это ложь, то значение будет проверено снова после истечения времени фильтрации.
Если состояние в обоих случаях ложно, то состояние меняется на ложное. В остальном это не изменится.

Для получения информации о скорости в объектах необходимо выбрать опцию fb-devices.

### Настройки белого списка
В белый список вы можете вставить все известные устройства. Любые неизвестные устройства перечислены в объекте черного списка.
Если вы установите флажок в заголовке таблицы, будут выбраны все устройства.

## Функции
### Проверка поддержки AVM
Функция проверяет наличие используемых функций fritzbox. Доступность регистрируется как информация. Если у вас есть проблемы, посмотрите, все ли функции установлены на true. Также для пользователя проверяются права доступа, и для функции устанавливается значение false, если права доступа неверны.

### Включение / выключение гостевой wlan
В гостевой папке вы можете установить для состояния wlan значение true или false, а затем гостевой wlan включится или выключится.

### QR-код гостевой беспроводной сети
QR-код гостевой wlan сохраняется в состоянии wlanQR в гостевой папке. QR-код может отображаться на vis в виджете Basic - Bool SVG.

### Включение / выключение доступа в Интернет устройств Fritzbox
В папке FB-devices вы можете установить для отключенного состояния значение true или false, а доступ в Интернет для этого устройства будет заблокирован в Fritzbox.

### Получить гостей, черный список
В этой функции проверяется, вошел ли какой-либо пользователь в систему как гость. Также проверяется, нет ли какого-либо устройства в белом списке.
Эти устройства добавлены в черный список.

### Стань активным
Для каждого члена семьи вычисляется присутствие, даты приезда и отъезда, а также несколько других сведений, которые сохраняются в объекте-члене, если выбран адаптер истории.

### Номер хоста, активные устройства
Количество устройств и количество активных берутся из фритцбокса.

## Объекты
### Наличие объекта Все
Если присутствуют все члены семьи, то объект верен.

### Наличие объекта
Если присутствует один член семьи, то объект верен.

### Объектные устройства
Все эти устройства перечислены в fritzbox.

### Объект activeDevices
Это количество всех активных устройств в fritzbox

### Объект html, json
Эти объекты представляют собой таблицы (json и html), в которых содержится информация о приходе и уходе всех членов семьи.

### Информация об объекте
Здесь перечислены сведения о последнем обновлении и состоянии подключения адаптера.

### Объект гость
Здесь перечислены сведения о количестве активных гостей и объекты таблицы с информацией об устройстве в ней.

### Черный список объектов
Здесь перечислены сведения о количестве неизвестных устройств и объекты таблицы с информацией о неизвестных устройствах.

### Объект member.present
Здесь вы найдете информацию о присутствии участника в текущий день и о том, как долго этот участник имел статус истинный с момента последнего изменения.

### Объект member.absent
Здесь вы найдете информацию об отсутствии участника в текущий день и о том, как долго участник находился в статусе false с момента последнего изменения.

### Объект member.comming, member.going
Здесь вы найдете информацию, когда член семьи прибывает или выходит из дома.

### Объект member.history, member.historyHtml
Здесь вы найдете информацию об истории текущего дня.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### __WORK IN PROGRESS__
* (afuerhoff) html input pattern fixed for password and user
* (afuerhoff) dependencies updated

### 1.1.5 (2021-06-03)
* (afuerhoff) dependencies updated
* (afuerhoff) checkservice fixed

### 1.1.4 (2021-05-11)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Mesh handling optimized 

### 1.1.3 (2021-03-31)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated

### 1.1.2 (2021-01-13)
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) documentation edited 

### 1.1.1 (2020-12-27)
* (afuerhoff) Configuration optimized
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Documentation added
* (afuerhoff) Mesh handling optimized

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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