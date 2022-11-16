---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-проверить наличие
hash: ANcfPN8XM6iNeu0x5GYV3TL+khg8BcdtpfSv7YtbpKM=
---
![Логотип](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Количество установок (последние)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)

# IoBroker.fb-checkpresence
**Тесты:** ![Тестируйте и выпускайте](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Адаптер fb-checkpresence для ioBroker
Адаптер проверяет присутствие членов семьи над fritzbox.
Необходимо заполнить имя члена семьи и mac-адрес (или ip-адрес) используемого устройства.
Комментарий не является обязательным, и вы можете включить или отключить члена семьи.
Точка данных основана на имени члена.

### Использовался открытый исходный код
#### Формат даты npm v4.5.3
(c) 2007-2009 Стивен Левитан <stevenlevithan.com> npm: https://www.npmjs.com/package/dateformat github: https://github.com/felixge/node-dateformat лицензия: MIT

### Предварительные условия адаптера
Для корректной работы необходимо установить адаптер истории. Вы можете выбрать один из следующих адаптеров:

* История
* SQL
* Приток БД

## Используемое устройство
Для этого адаптера используется AVM Fritzbox. Здесь вы можете найти информацию о Fritzbox https://avm.de/produkte/fritzbox/.
Службы fritzbox используются по протоколу TR-064.

### Условия Fritzbox
Используемый интерфейс TR-064 от fritzbox описан здесь: https://avm.de/service/schnittstellen/.
Используются следующие услуги и действия TR-064:

* Хосты: 1 — X_AVM-DE_GetHostListPath (поддерживается с 09 января 2017 г.)
* Хосты: 1 — X_AVM-DE_GetMeshListPath
* Хосты: 1 — GetSpecificHostEntry
* Хосты: 1 — X_AVM-DE_GetSpecificHostEntryByIP (поддерживается с 18 мая 2016 г.)
* DeviceInfo:1 — GetSecurityPort
* Информация о устройстве: 1 — Получить информацию
* WANPPPConnection:1 — Получить информацию
* WANIPConnection:1 — Получить информацию
* WLANConfiguration3 — SetEnable
* WLANConfiguration3 — получить информацию
* WLANConfiguration3 — GetSecurityKeys
* X_AVM-DE_HostFilter — запретить WANAccess по IP
* X_AVM-DE_HostFilter — GetWANAccessByIP
* DeviceConfig:1 - Перезагрузить
* LANConfigSecurity1 — X_AVM-DE_GetCurrentUser

По умолчанию интерфейс TR-064 не активирован. Однако это можно легко изменить через веб-интерфейс FritzBox. Для этого войдите в свой FritzBox и убедитесь, что режим эксперта активирован.
Затем вы найдете ниже «Домашняя сеть» Обзор домашней сети» Настройки сети» пункт «Разрешить доступ для приложений». Там вы должны активировать флажок, а затем один раз перезапустить FritzBox.

Подсказка: после изменения параметров не забудьте перезапустить Fritzbox!<img src="doc/access_settings_network.JPG"/>

## Диалог конфигурации
### Общий
Значения конфигурации проверяются, и могут быть сохранены только правильные значения. В противном случае кнопка сохранения неактивна.

### IP-адрес Fritzbox, имя пользователя и пароль
Конфигурация ip-адреса, пользователя и пароля необходима для получения данных устройства из fritzbox.
Поэтому пользователь должен быть создан в fritzbox. Это требуется для более новой версии прошивки (>= 7.25) fritzbox. См. здесь дополнительную информацию: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Пароль зашифрован и не был сохранен в открытом виде. Имя пользователя и пароль могут содержать не более 32 символов. Для получения информации см.: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf %20nicht%20leer%20sein.
Подсказка: в некоторых случаях могло случиться так, что fritzbox заблокировал пользователя, если пароль был введен неправильно.
Часто в журнале появляется сообщение об истечении времени ожидания. Пожалуйста, проверьте, правильно ли вы ввели имя пользователя и пароль. Затем вам нужно перезагрузить fritzbox.

### SSL-опция
В некоторых случаях адаптер не мог подключиться к fritzbox. Это может помочь отключить эту опцию.
В этом случае адаптер пытается подключиться без https.

### Интервал
У вас есть отдельные интервалы для членов семьи и устройств Fritzbox.
Интервал для устройств Fritzbox можно настроить от 10 до 3600 с. Обычно значение от 60 до 300 секунд является оптимальным интервалом для чтения данных fritzbox. Члены семьи могут быть настроены от 10 до 600. Каждый новый цикл начинается, если предыдущий цикл завершен.

### Время фильтрации
Если время фильтрации больше 0 с, состояние члена семейства проверяется дважды (по истечении времени фильтрации), если состояние меняется на false. Если состояние истинно, состояние устанавливается немедленно.

### Адаптер истории
По адаптеру истории рассчитываются некоторые значения. Вы можете выбрать, будет ли для этих расчетов использоваться история, адаптер sql или influxdb. Адаптер истории должен быть предварительно установлен, а затем его можно выбрать в диалоговом окне конфигурации.
Если конфигурация истории отключена, расчет некоторых значений не может быть реализован.

### Формат даты
Параметры маски формата даты описаны на этой веб-странице: https://www.npmjs.com/package/dateformat.
Маска формата используется для форматирования объектов таблицы html и json.

### Создание устройств FB
Если этот параметр отмечен, создаются объекты для каждого устройства в списке устройств Fritzbox.
Если эта опция отключена, информация о сетке также будет отключена.

### Ресинхронизация объектов устройства FB
Если эта опция отмечена, то объект устройства FB повторно синхронизируется со списком устройств из Fritzbox.

### Создание информации о сетке
Эту опцию можно отметить, если разрешено создание FB-устройств. Если этот параметр отмечен, создаются объекты сетки для каждого устройства в списке устройств Fritzbox.

### Информация о гостях
Если эта опция отмечена, создаются состояния для гостей.

### Генерация qr-кода
Если эта опция включена, генерируется qr-код из гостевого wlan.

### Настройки члена семьи
Для настроенного члена семьи вы должны ввести имя члена, имя хоста, mac- и ip-адрес, комментарий, и вы можете включить или отключить члена. Группа необязательна.
Если вы оставите группу пустой и установите для флага совместимости значение true, поведение будет похоже на более старую версию адаптера. Вы можете использовать состояние присутствия от члена семьи или состояние, напрямую сопоставленное с именем члена семьи. В будущей версии вы должны использовать состояние присутствия. Это поведение можно включить/отключить с помощью флажка совместимости: -> compatibility = true: поведение старой версии с пустой группой.
-> совместимость = истина и группа не пуста: новое поведение. Все состояния в папке familymembers.
-> совместимость = ложь: новое поведение. Все состояния в папке familymembers.

Для каждого члена адаптер создает состояние присутствия и проверяет, присутствует ли член или отсутствует. Состояние было изменено, если изменилось состояние присутствия.
Вы также можете включить фильтрацию для участника. Если состояние истинно, оно немедленно меняется на истинно. Если оно ложно, то значение будет снова проверено по истечении времени фильтрации.
Если в обоих случаях состояние ложно, то состояние меняется на ложное. В противном случае он не меняется.

Чтобы получить информацию о скорости в объектах, вы должны выбрать опцию fb-devices.

### Активировать присутствие вручную
В javascript вы можете активировать присутствие вручную. При отправке сообщения адаптеру каждое новое сообщение блокируется на 10 секунд. Вы получаете отрицательный результат (false), если сообщение заблокировано.
Истинно, если сообщение получено от адаптера.
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### Настройки белого списка
В белый список можно вставить каждое известное устройство. Любые неизвестные устройства заносятся в черный список.
Если установить флажок в заголовке таблицы, будут выбраны все устройства.

## Функции
### Проверка поддержки AVM
Функция проверяет доступность используемых функций fritzbox. Доступность регистрируется как информация. Если у вас есть проблемы, посмотрите, все ли функции установлены на true. Также проверяются права доступа для пользователя, и для функции устанавливается значение false, если право доступа неверно.

### Включить/выключить гостевой wlan
В гостевой папке вы можете установить для состояния wlan значение true или false, а затем включить или выключить гостевой wlan.

### QR-код гостевой сети
QR-код гостевого wlan сохраняется в состоянии wlanQR в гостевой папке. QR-код может отображаться в основном виджете Bool SVG.

### Включить / выключить доступ в Интернет устройств Fritzbox
В папке FB-устройства вы можете установить для отключенного состояния значение true или false, а доступ в Интернет для этого устройства будет заблокирован в Fritzbox.

### Получить гостей, черный список
В этой функции проверяется, вошел ли какой-либо пользователь в систему как гость. Также проверяется, нет ли какого-либо устройства в белом списке.
Эти устройства добавлены в черный список.

### Будьте активны
Для каждого члена семьи вычисляются присутствие, даты прихода и ухода и некоторые другие данные, которые сохраняются в объекте члена, если выбран адаптер истории.

### Номер хоста, активные устройства
Количество устройств и количество активных можно получить из fritzbox.

## Объекты
### Наличие объектаВсе
Если присутствуют все члены семьи, то объект верен.

### Наличие объекта
Если присутствует один член семьи, то объект верен.

### Объектные устройства
Это все перечисленные устройства в fritzbox

### Объект activeDevices
Это количество всех активных устройств в fritzbox.

### Объект html, json
Эти объекты представляют собой таблицы (json и html) с информацией о приходе и уходе всех членов семьи.

### Информация об объекте
Здесь перечислены сведения о последнем обновлении и состоянии подключения от адаптера.

### Объект гость
Здесь перечислены сведения о количестве активных гостей и табличных объектов с информацией об устройстве.

### Черный список объектов
Здесь перечислены сведения о количестве неизвестных устройств и табличных объектов с информацией о неизвестном устройстве.

### Объект member.present
Здесь вы найдете информацию о присутствии участника в текущий день и о том, как долго участник находится в статусе true с момента последнего изменения.

### Объект member.отсутствует
Здесь вы найдете информацию об отсутствии участника в текущий день и о том, как долго участник находился в статусе false с момента последнего изменения.

### Объект member.comming, member.going
Здесь вы найдете информацию, когда член семьи прибывает или уезжает из дома.

### Объект member.history, member.historyHtml
Здесь вы найдете информацию об истории текущего дня.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### 1.1.21 (2022-09-05)
* (afuerhoff) dependencies updated

### 1.1.20 (2022-09-05)
* (afuerhoff) issue [#136](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/136) force update on demand
* (afuerhoff) issue [#139](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/139) Add family members fixed
* (afuerhoff) issue [#140](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/140) Add family members dialogbox fixed
* (afuerhoff) issue [#129](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/129) Dateformat library changed

### 1.1.19 (2022-07-08)
* (afuerhoff) issue [#137](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/137) guest device listed twice

### 1.1.18 (2022-07-04)
* (afuerhoff) issue [#67](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/67) fbdevices states for vpn connection added
* (afuerhoff) issue [#128](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/128) Restart adapter after cycle error

### 1.1.17 (2022-06-15)
* (afuerhoff) issue [#126](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/126) bugfix undefined historyAlive object
* (afuerhoff) log optimized

## License
MIT License

Copyright (c) 2019-2022 Achim Fürhoff <achim.fuerhoff@outlook.de>

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