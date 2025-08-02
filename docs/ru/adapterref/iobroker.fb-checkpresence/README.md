---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-проверкаприсутствия
hash: jVJtLk82Puyn88CD0bxI5wf5ZncRx8sjThGlLTYDTi0=
---
![Логотип](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![Лицензия GitHub](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![Коммиты GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![Проблемы с GitHub](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Количество установок (последнее)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Стабильная версия](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![Последняя версия NPM](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-проверка присутствия
**Тесты:** ![Тест и выпуск](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Fb-checkpresence адаптер для ioBroker
Адаптер проверяет наличие членов семьи через fritzbox.
Необходимо указать имя члена семьи и mac-адрес (или ip-адрес) используемого устройства.
Комментарий необязателен, и вы можете включить или отключить члена семьи.
Точка данных основана на имени члена.

### Использован открытый исходный код
#### Npm dateformat v4.5.3
(c) 2007-2009 Стивен Левитан <stevenlevithan.com> npm: https://www.npmjs.com/package/dateformat github: https://github.com/felixge/node-dateformat лицензия: MIT

### Предварительные условия адаптера
Для корректной работы необходимо установить адаптер истории. Вы можете выбрать один из следующих адаптеров:

* История
* SQL
* InfluxDB

## Использованное устройство
Для этого адаптера используется AVM Fritzbox. Здесь вы можете найти информацию о Fritzbox https://avm.de/produkte/fritzbox/.
Службы fritzbox используются по протоколу TR-064.

### Условия Fritzbox
Используемый интерфейс TR-064 из fritzbox описан здесь: https://avm.de/service/schnittstellen/.
Используются следующие службы и действия TR-064:

* Хосты:1 - X_AVM-DE_GetHostListPath (поддерживается с 09.01.2017)
* Хосты:1 - X_AVM-DE_GetMeshListPath
* Хосты:1 - GetSpecificHostEntry
* Хосты:1 - X_AVM-DE_GetSpecificHostEntryByIP (поддерживается с 18.05.2016)
* DeviceInfo:1 - GetSecurityPort
* Информация об устройстве:1 - Получить информацию
* WANPPPConnection:1 - GetInfo
* WANIPConnection:1 - GetInfo
* WLANConfiguration3 - УстановитьВключить
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - Запретить доступ к WANA по IP
* X_AVM-DE_HostFilter - ПолучитьWANAccessByIP
* DeviceConfig:1 — Перезагрузка
* LANConfigSecurity1 — X_AVM-DE_GetCurrentUser

По умолчанию интерфейс TR-064 не активирован. Однако это можно легко изменить через веб-интерфейс FritzBox. Для этого войдите в свой FritzBox и убедитесь, что активирован экспертный вид. Затем вы найдете ниже «Домашняя сеть» Обзор домашней сети» Настройки сети пункт «Разрешить доступ для приложений». Там вам нужно активировать флажок, а затем перезапустить FritzBox один раз.

Совет: После изменения параметров не забудьте перезапустить Fritzbox!<img src="doc/access_settings_network.JPG"/>

## Диалог конфигурации
### Общий
Значения конфигурации проверяются, и только правильные значения могут быть сохранены. В противном случае кнопка сохранения будет неактивна.

### IP-адрес Fritzbox, пользователь и пароль
Конфигурация IP-адреса, пользователя и пароля необходима для получения данных устройства из fritzbox.
Поэтому в fritzbox необходимо создать пользователя. Это требуется для более новой версии прошивки (>= 7.25) fritzbox. См. здесь дополнительную информацию: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf Пароль зашифрован и не был сохранен в открытом виде. Имя пользователя и пароль могут содержать максимум 32 символа. Информацию см. по ссылке: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein.
Подсказка: в некоторых случаях fritzbox может заблокировать пользователя, если пароль был введен неправильно.
Часто в журнале появляется сообщение о тайм-ауте. Проверьте, правильно ли вы ввели имя пользователя и пароль. Затем вам нужно перезагрузить fritzbox.

### SSL-опция
В некоторых случаях адаптер не мог подключиться к fritzbox. Может помочь отключение этой опции.
В этом случае адаптер пытается подключиться без https.

### Интервал
У вас есть отдельные интервалы для членов семьи и устройств Fritzbox. 
Интервал для устройств Fritzbox можно настроить от 10 до 3600 с. Обычно значение от 60 до 300 секунд является оптимальным интервалом для чтения данных fritzbox. Членов семьи можно настроить от 10 до 600 с. Каждый новый цикл начинается, если предыдущий цикл завершен.

### Время фильтра
Если время фильтра больше 0 с, состояние члена семьи проверяется дважды (после времени фильтра), если состояние меняется на false. Если состояние true, состояние устанавливается немедленно.

### История адаптера
По адаптеру истории вычисляются некоторые значения. Вы можете выбрать, будет ли использоваться для этих вычислений история, адаптер sql или influxdb. Адаптер истории должен быть предварительно установлен и затем может быть выбран в диалоговом окне конфигурации.
Если конфигурация истории отключена, то расчет некоторых значений не может быть реализован.

### Формат даты
Параметры маски формата даты описаны на этой веб-странице: https://www.npmjs.com/package/dateformat.
Маска формата используется для форматирования объектов таблиц html и json.

### Создание устройств FB
Если эта опция отмечена, создаются объекты для каждого устройства в списке устройств Fritzbox.
Если эта опция отключена, то также отключена информация о сетке.

### Ресинхронизация объектов устройства FB
Если этот параметр отмечен, то объект устройства FB повторно синхронизируется со списком устройств Fritzbox.

### Создание информации о сетке
Эту опцию можно отметить, если разрешено создание устройств FB. Если эта опция отмечена, то создаются объекты сетки для каждого устройства в списке устройств Fritzbox.

### Информация для гостей
Если этот параметр отмечен, создаются состояния для гостей.

### Генерация QR-кода
Если эта опция отмечена, генерируется qr-код из гостевой сети WLAN. Вы можете отобразить этот QR-код в вашем VIS с помощью виджета &quot;Basic Boolesches SVG&quot;. Пожалуйста, используйте следующие настройки:<img src="doc/QRCode.png"/>

### Настройки члена семьи
Для настроенного члена семьи необходимо ввести имя члена, имя хоста, mac- и ip-адрес, комментарий, и вы можете включить или отключить члена. Группа необязательна.
Если вы оставите группу пустой и установите флаг совместимости на true, поведение будет как у старой версии адаптера. Вы можете использовать состояние присутствия из члена семьи или состояние, напрямую сопоставленное с именем члена семьи. В будущей версии вы должны будете использовать состояние присутствия. Это поведение можно включить/выключить с помощью флажка совместимости: -> совместимость = true: поведение как у старой версии с пустой группой.
-> совместимость = true и группа не пустая: новое поведение. Все состояния в папке familymembers.
-> совместимость = false: новое поведение. Все состояния в папке familymembers.

Для каждого участника адаптер создает состояние присутствия и проверяет, присутствует ли участник или отсутствует. Состояние было изменено, если состояние присутствия изменилось.
Вы также можете включить фильтрацию для участника. Если состояние true, состояние немедленно меняется на true. Если оно false, то значение будет снова проверено после времени фильтрации.
Если состояние в обоих случаях false, то состояние меняется на false. В противном случае оно не меняется.

Чтобы получить информацию о скорости в объектах, необходимо выбрать опцию fb-devices.

### Активация присутствия вручную
В javascript вы можете вручную активировать присутствие. Когда вы отправляете сообщение адаптеру, каждое новое сообщение блокируется на 10 секунд. Вы получаете отрицательный результат (false), если сообщение заблокировано.
True, если сообщение получено от адаптера.
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### Настройки белого списка
В белый список можно вставить любое известное устройство. Любые неизвестные устройства заносятся в объект черного списка.
Если вы отметите флажок в заголовке таблицы, будут выбраны все устройства.

В Javascript можно отправить элемент в белый список.
Отправленные данные (имя хоста, MAC) сравниваются со списком устройств Fritzbox. Если запись присутствует, проверяется, сохранена ли она уже в белом списке. Если нет, запись сохраняется в таблице конфигурации белого списка.

sendTo('fb-checkpresence.0', 'addDeviceToWhitelist', { hostname: 'devicename', mac: '00:00:00:00:00:00' } , function (result) { log(result, 'info'); });

## Функции
### Проверка поддержки AVM
Функция проверяет доступность используемых функций fritzbox. Доступность регистрируется как информация. Если у вас возникли проблемы, посмотрите, установлены ли все функции на true. Также проверяются права доступа для пользователя, и функция устанавливается на false, если права доступа неверны.

### Включить/выключить гостевой WLAN
В папке guest вы можете установить состояние wlan на true или false, после чего гостевой wlan включится или выключится.

### QR-код гостевой беспроводной сети
QR-код гостевого wlan сохраняется в состоянии wlanQR в папке guest. QR-код может отображаться в vis в базовом - Bool SVG-виджете.

### Включение/выключение доступа в Интернет устройств Fritzbox
В папке FB-devices вы можете установить состояние отключения на true или false, и доступ к Интернету этого устройства будет заблокирован в Fritzbox.

### Приглашайте гостей, вносите в черный список
В этой функции проверяется, вошел ли какой-либо пользователь в качестве гостя. Также проверяется, нет ли какого-либо устройства в указанном белом списке.
Эти устройства добавляются в черный список.

### Будьте активны
Для каждого члена семьи рассчитываются данные о его присутствии, датах прибытия и ухода, а также ряд других сведений, которые сохраняются в объекте члена семьи, если выбран адаптер истории.

### Номер хоста, активные устройства
Количество устройств и сколько из них активны, можно получить из fritzbox.

## Объекты
### Наличие объектаВсе
Если присутствуют все члены семьи, то объект истинный.

### Присутствие объекта
Если присутствует хотя бы один член семьи, то объект истинный.

### Объектные устройства
Это все перечисленные устройства в fritzbox

### Объект activeDevices
Это количество всех активных устройств в fritzbox.

### Объект html, json
Эти объекты представляют собой таблицы (json и html) с информацией о прибытии и отъезде всех членов семьи.

### Информация об объекте
Ниже приведена информация о последнем обновлении и состоянии подключения адаптера.

### Объект гость
Здесь приведена информация о количестве активных гостей и объектов таблицы с информацией об устройствах.

### Черный список объектов
Ниже приведена информация о количестве неизвестных устройств и объектов таблицы, содержащих информацию о неизвестных устройствах.

### Объект member.present
Здесь вы найдете информацию о присутствии участника на текущий день и о том, как долго участник имел статус true с момента последнего изменения.

### Объект member.absent
Здесь вы найдете информацию об отсутствии участника на текущий день и о том, как долго участник имел статус false с момента последнего изменения.

### Объект member.comming, member.going
Здесь вы найдете информацию о том, когда член семьи приезжает или уезжает из дома.

### Объект member.history, member.historyHtml
Здесь вы найдете информацию об истории сегодняшнего дня.

## Changelog
### 1.4.0 (2025-05-28)
* (afuerhoff) dependencies updated
* (afuerhoff) error handling optimized
* (afuerhoff) enhancement  [#336](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/336)
* (afuerhoff) issue [#337](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/337)
* (afuerhoff) issue [#335](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/335)

### 1.3.1 (2025-03-02)
* (afuerhoff) dependencies updated
* (afuerhoff) bug fixed [#333](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/333)
* (afuerhoff) bug fixed [#305](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/305)

### 1.3.0 (2025-02-14)
* (afuerhoff) dependencies updated
* (afuerhoff) eslint setup changed
* (afuerhoff) ipv6 ip-address and prefix added

### 1.2.8 (2024-11-20)
* (afuerhoff) bugfix configuration
* (afuerhoff) dependencies updated

### 1.2.7 (2024-11-18)
* (afuerhoff) bugfix [#319](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/319)

## License
MIT License

Copyright (c) 2019-2025 Achim Fürhoff <achim.fuerhoff@outlook.de>

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