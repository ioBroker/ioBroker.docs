---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: qKl3jUBUbIAfp2+IKp9xFSeH5ZAUfTIlwtHbPgiTM3s=
---
![Логотип](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Количество установок](http://iobroker.live/badges/upnp-stable.svg)
![Логотип](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Изображение](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
1. [Немецкий](#german_description)
	 * [Был ли UPnP?](#was-ist-upnp)
	 * [Функциональное обеспечение](#функциональное обеспечение)
	 * [Объектструктура](#objektstruktur)
	 * [Всеобщие объекты](#всеобщие-объекты)
	 * [Объект Upnp](#upnp-объект)
* [Управление](#управление)
	 * [Geräte/Dienst Spezifische Besonderheiten](#gerätedienst-spezifische-besonderheiten)

2. [Английский](#english_description)
* [Что такое UPnP?](#что-такое-upnp)
* [Функциональное описание](#function-description)
* [Структура объекта](#структура-объекта)
* [Общие объекты](#general-objects)
* [Объекты Upnp](#object-structure)
* [Управление](#управление)
* [Особенности устройств/служб](#devicesservice-specific-features)

3. [Журнал изменений](#журнал изменений)

## Описание на немецком языке
### Изменение
Dient der Kommunikation und Interaktion mit allen UPnP-Fähigen Geräten.

#### Это был UPnP?
UPnP = универсальная технология Plug and Play. Это версия Eine Standardisierung der Kommunikation zwischen Geräten im Netzwerk Herzustellen.
Если вы хотите создать «Схемы», они будут записаны в форме einer xml Datei dargestellt. Sie enthalten alle Information über das Gerät или Software und deren Dienste die sie bereit stellen. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst festgelegten Schema, dadurch können schnell Informationen und Befehle ausgetauscht werden ohne das es notig ist zu wissen um welches Modell или welchem Hersteller das Gerät or die Software ist.  В der Vergangenheit была создана стандартизация для всех средств массовой информации и программного обеспечения. Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des «IoT – Internet of Things» с dieser Standardisierung zu vereinheitlichen.
В 2016 году в рамках «Фонда открытой связи» были приняты меры по поддержке форумов UPnP, что привело к сертификации UPnP-Fähigen Geräten durchgeführt и стандартизации.

#### Описание функций
Der Adaptor führt beim ersten Start einen Broadcast durch und Wertet die Antworten aus. Ответьте на ссылку на xml Dateien der Dienste. Кроме того, данные xml-файла включают объект в ioBroker и все необходимые сведения.

Zeitverzögert wird ein Dienst gestartet der auf Nachrichten von Geräten/Diensten wartet die sich anoder abmelden. Неправильная установка/выключение автоматически выполняется при использовании устройства. Если вы хотите, чтобы вы были уверены в том, что у вас есть статус и статус подписки, вам нужно, чтобы ioBroker получил (отправленное сообщение) автоматическое получение/завершение операции.

#### Объектструктура
Используйте или программное обеспечение для трансляции, используя собственные ангельские объекты. Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden в 3 категориях (Роль/роль): индикатор.состояние, действие и аргумент.

**state –** ist eine Variable die den Aktuellen zustand eines Objekts/Datenpunkts im Gerät/Dienst darstellt. Jeder индикатор.state шляпа einen bestimmten Введите число, строку, логическое значение,…. Darüber hinaus ist auch genau festgelegt welchen Wert или Wertebereich der inidcator.state haben kann, diese Angaben sind im «native» eines Objektshinterlegt.
Бишер реализовал родные:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- допущенные значения = Строки включены в список.
- минимум = Gibt den niedrigsten Zahlen wert an der Akzeptiert wird.
- максимум = Gibt den höchsten Zahlen wert an der Akzeptiert wird.
- шаг = Gibt an in welchen Schritten ein Wert verändert werden kann.

**кнопка –** «запрос» — это Befehl der an das Gerät/den Dienst geschickt werden kann und von diesem Aktzeptiert wird. Это предмет, который является предметом спора.

**аргумент –** является объектом einer Aktion-Channel. Der Type — это «gemischt», который больше всего не нужен. В книге «Объекты родного человека» найдена разнообразная информация, где вы можете найти аргументы и аргументы и другие.
Бишер беканте, уроженец:

- направление = Предоставьте Richtung в поиске статистики Informationsfluss.

«In» bedeutet es wird kein Wert zurück geliefert.
«Out» bedeutet es wird ein Wert zurück geliefert.

- linkedStateVariable = Gibt den Indicator.state an der für den Austausch der Daten

Zuständig ist.

-ArgumentNumber = Предоставить желаемый аргумент действия.

### Общие объекты
Folgenden Objekte finden sich für jedes Gerät/jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des UPnP Standards или Dienstbeschreibung des Jeweiligen Gerätes.

**Alive –** будет использоваться для установки «true» или «true» и адаптера на протяжении нескольких секунд с «null» для установки, если это не установлено/Dienst diesen nicht wieder для установки «true». Die Ablauf zeit ist abhängig davon welche Maximum Lebensdauer vom Gerät für das Alive signal mitgeteilt wurde. Wenn ein Gerät sich abmeldet wird der Status auf «false gesetzt». Es ist möglich dieses Objekt von Hand order per Skript auf «true» zu setzen, das sollte jedoch nur gemacht werden wenn wenn wenn man sicher ist dass dass das Gerät/Dienst erreichbar ist. Если вы живете вручную по «истинному» сообщению, то это значит, что это руководство по «ложному» сообщению, если ничего больше не происходит, да и другие падения Фелера могут быть отменены.

**Sid –** Идентификатор подписки. Это означает, что ваш хост может получить подписку на своего клиента. Die sid läuft nach einer vom определенно Zeit Ab, daher wird sie immer wieder Actualisiert. Sie gilt nur für einen bestimmten Dienst.

**request –** sendet einen SOAP-запрос с дополнительными опциями

### Объекты UPnP
Die hier auf gelisteten Objecte finden sich im UPnP Standard und/oder den Geräte-/Dinestbeschreibungen. Если вы не хотите, чтобы ваш список всех объектов был включен в список объектов, эти объекты и объекты, которые могут быть использованы для работы с объектами.

**(A_ARG_TYPE_)InstanceID –** Die InstanceID — это Häufigsten zu finden und Wird zwingend benötigt da sie die Instanz eines Dienstes angibt der angesprochen werden soll. В этом случае значение InstanceID = 0. Этот идентификатор будет отправлен в сообщение о событии от вашего имени и вашего сообщения, которое будет отправлено вам, с вашим сообщением.

**(A_ARG_TYPE_)Канал(*) –** Объект канала можно найти в режиме аудио/видео. Ein Channel muss zum Beispiel angegeben werden wenn die Lautstärke verändert werden soll. Mögliche Werte können Beispielsweise «Master», «LF» или «RF». В этом случае необходимо указать «Мастер» для Allgemeine Lautstärke, «LF» для ворнских ссылок и «RF» для ворна. Если вы хотите получить право на участие в программе «RF», вы должны дать человеку «RF» на Канале.

**(Set/Get)Volume(*) –** Объект Volume находится в процессе настройки аудио/видео. Je nachdem wo es vorkommt wird es zum Anzeigen der Lautstärke genutzt или zum einstellen der Lautstärke. Dieses Objekt, который погружает человека в разум и максимум, в котором он может находиться в диапазоне от 0 до 100. Die Schrittweite Liegt Normal bei 1, das bedeutet es können nur glatte Zahlen angeben werden.

### Управление
**кнопка –** «запрос» Eine Action stellt einen Befehl dar, der an das Gerät/den Dienst geschickt werden kann. Zu jeder Action gehören auch Argumente, die Zwingend angeben werden müssen. Человек действия – это его роль/роль, dort steht «действие». Beschreibt man die Action mit «send» wird der Befehl an das Gerät/den Dienst gesendet.

**state.argument.x –** Muss zwingend bei einer Действие может быть изменено, когда выполняется действие "state.argument.in". Вы можете найти человека в «Связанной переменной состояния». Имя «Связанная переменная состояния» является подсказкой для объекта «родной» -> «род.StateVariable».  Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es «native» -> Argument_No. Ein Argument erkennt man a seiner Rolle/role, dort steht «аргумент».  Manche strings müssen mit einem „““ в помещении Datenpunkt Geschrieben Werden. Es kann nicht pauschal beantwortet werden wann das der Fall ist, aber bei komplexen strings wie zum Beispiel URL’s kann das der Fall sein. Hier hilft nur ausprobieren. Will man ein " in einem Argument übergeben muss man "&quot;" verwenden.

**(Связанное состояние) Переменная –** Es Handelt sich um Variablen die für den Datenaustausch genutzt werden. В книге Native's der Variablen найдена разнообразная информация:

- разрешенные значения = gibt Auskunft über die möglichen Inhalte der Variable или был als Argument mit einer Action gesendet werden kann.
- минимум = der niedrigste Wert den die Переменная enthalten kann oder als Аргумент с einer Action gesendet werden kann.
-max= der höchste Wert den die Переменная enthalten kann oder als Аргумент с einer Action gesendet werden kann.
- шаг = gibt an in welchen Schritten ein Wert angeben wird.
- sendEvents = ? Mögliche Werte говорит «да» или «нет». Es ist aber völlig unklar было das zu bedeuten Hat. Die Annahme dass die Werte für diese Variable nur dann von einem Gerät/Dienst autotisch gesendet wenn wenn wenn wenn wenn «yes» bei sendEvents steht Hat sich nicht bestätigt.

Beispiel, wie man die Werte pollen kann:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auch die Möglichkeit bei dem "request" Objekt das Polling im Admin einzustellen. Dafür Klickt man auf das Schraubenschlüssel Символ объекта.

### Geräte/Dienst Spezifische Besonderheiten
**Sonos:** Для QPlay не нужна подписка на другие устройства. Möglicherweise ist hierfür eine Authentifikation notwendig

**Phillips Hue Bridge 2:** Внедрение стандартов UPnP в Hue Bridge 2 является частью приложения, но мы можем использовать Hue Bridge 2, чтобы он не работал через интерфейс UPnP.

**Yamaha:** Доступ к базовому API стандарта UPnP, только для собственного формата данных. Держите адаптер UPnP без возможности подключения.

**Sony:** Verwendet eine ScalarWebApi genannte Schnittstelle die über UPnP ansprechbar ist jedoch ein eigenes Daten Format verwendet. Держите адаптер UPnP без возможности подключения.

**Amazon Kindle:** Убедитесь, что UPnP Dienst bereit, jedoch wird keine UPnP-Dienstbeschreibung geliefert und kann daher nicht genutzt werden.

## Описание на английском
***Перевод https://www.deepl.com/translator***

### Предполагаемое использование
Служит для связи и взаимодействия со всеми устройствами, поддерживающими UPnP.

#### Что такое UPnP?
UPnP = Universal Plug and Play. Попытка стандартизировать связь между устройствами в сети. Для этого существуют так называемые «схемы», которые отображаются в виде XML-файла. Они содержат всю информацию об устройстве или программном обеспечении и его услугах, которые они предоставляют. Чтобы гарантировать, что эти услуги также могут быть использованы, предоставляется описание каждой услуги. Это описание следует схеме, определенной для услуги, что позволяет быстро обмениваться информацией и командами, не зная, какая модель или производитель устройства или программного обеспечения. В прошлом эта стандартизация в основном использовалась для медиа-устройств и программного обеспечения. В течение некоторого времени также предпринимались усилия по стандартизации связи «IoT - Internet of Things» с помощью этой стандартизации. Для этой цели в 2016 году был основан «Open Connectivity Foundation», который берет на себя задачи форума UPnP, который провел сертификацию устройств с поддержкой UPnP и создал стандарты.

#### Функциональное описание
Адаптер транслирует и оценивает ответы при первом запуске. Ответы содержат ссылку на xml-файлы сервисов. xml-файлы используются для создания объектов в ioBroker и заполнения их всей доступной информацией.

С задержкой запускается служба, которая ждет сообщений от устройств/служб, которые входят или выходят из системы. Новые обнаруженные устройства/службы автоматически добавляются к существующим. Вторая служба входит в систему на каждом доступном устройстве и подписывается на сообщения о состоянии, так что ioBroker автоматически уведомляется о любых изменениях (отправленных) на устройство/службу.

#### Структура объекта
Каждое устройство или программное обеспечение, реагирующее на трансляцию, создается как отдельный объект. Ниже этого объекта вы найдете все доступные службы с их возможностями. Возможности делятся на 3 категории (роль/роль): индикатор. состояние, действие и аргумент.

**state -** - это переменная, представляющая текущее состояние объекта/точки данных в устройстве/службе. Каждый indicator.state имеет определенный тип, такой как число, строка, логическое значение,..... Кроме того, также указывается, какое именно значение или диапазон значений может иметь inidcator.state, эти данные хранятся в "native" объекта. Ранее реализованные native:

- sendEvents = Значение до сих пор неизвестно.
- allowedValues = допустимые строки.
- минимум = Дает наименьшее значение, при котором значение принимается.
- максимум = Дает наибольшее значение, при котором производится приемка.
- шаг = Указывает, на каких шагах можно изменять значение.

**button -** "reuqest" — это команда, которая может быть отправлена и принята устройством/службой. Этот объект обычно имеет подобъект, аргумент.

**аргумент -** является подобъектом действия. Тип "смешанный", так как он не указан. Собственные объекты содержат различную информацию, они могут отличаться от аргумента к аргументу. Ранее известные собственные:

- direction = Указывает направление, в котором происходит поток информации. In "означает, что значение не возвращается. Out "означает, что возвращается значение.
- relatedStateVariable = Возвращает индикатор. состояние, за которое отвечает обмен данными.
- argumentNumber = Возвращает количество аргументов действия.

### Общие объекты
Следующие объекты находятся для каждого устройства/службы и требуются для администрирования. Они не являются частью стандарта UPnP или руководства по эксплуатации/устройству соответствующего устройства.

**Alive -** устанавливается в "true" устройством/службой и устанавливается в "null" адаптером через x секунд, если устройство/служба не устанавливает его в "true" снова. Время истечения зависит от максимального срока действия сигнала Alive, подаваемого устройством. Когда устройство выходит из системы, статус устанавливается в "false". Можно установить этот объект в "true" вручную или скриптом, но это следует делать только в том случае, если вы уверены, что устройство/служба доступны. Если Alive был установлен вручную в "true", его также следует вручную установить в "false", если он больше не нужен, в противном случае могут возникнуть ошибки.

**Sid -** Служит идентификатором подписки. Эта страница создается хостом каждый раз, когда подписка запрашивается клиентом. Sid запускается через определенное хостом время, поэтому он обновляется снова и снова. Он действителен только для определенной службы.

### Объекты UPnP
Перечисленные здесь объекты можно найти в стандарте UPnP и/или в device/dinest-descriptions. Это не полный список всех объектов, эта подборка объектов представляет только часто встречающиеся объекты.

**(A_ARG_TYPE_)InstanceID -** instanceID является наиболее распространенным и требуется, поскольку он указывает экземпляр службы, к которому необходимо обратиться. В большинстве случаев instanceID = 0. Этот идентификатор передается с каждым сообщением о событии службой и каждой командой, которая отправляется службе.

**(A_ARG_TYPE_)Канал (*) -** Объект канала связан с аудио/видео службами. Например, канал должен быть указан, если вы хотите изменить громкость. Возможные значения могут быть, например, "Master", "LF" или "RF". В этом примере "Master" означает общую громкость, "LF" - для левого фронта, а "RF" - для правого фронта. Если вы хотите изменить громкость только на правой передней панели, вам необходимо указать "RF" в Channel.

**(Установить/Получить)Громкость (*) -** Объект Громкость связан с аудио/видео службами. В зависимости от того, где он находится, он используется для отображения громкости или для регулировки громкости. Этот объект всегда имеет минимальное и максимальное значение, которые можно указать, в большинстве случаев диапазон значений составляет от 0 до 100. Размер шага обычно равен 1, что означает, что можно вводить только четные числа.

### Контроль
**button -** Действие "request" - это команда, которая может быть отправлена устройству/службе. Каждое действие также включает аргументы, которые должны быть указаны как обязательные. Действия можно распознать по их роли/роли, которая говорит "action". Если вы описываете действие с помощью "send", команда отправляется устройству/службе.

**state.argument.x -** Обязательно для действия, если роль - "state.argument.in". Возможные значения, которые могут/должны быть указаны, можно найти в "Related State Variable". Имя этой "Related State Variable" хранится в объекте в "native" -> "relatedStateVariable". Аргументы должны быть указаны в определенном порядке, для этого есть "native" -> Argument_No. Аргумент можно распознать по его роли/роли, где указано "argument". Некоторые строки должны быть записаны с """" в точке данных. На этот вопрос невозможно ответить однозначно, но со сложными строками, такими как URL, это может быть так. Полезно только попробовать. Если вы хотите передать " в аргументе, вы должны использовать """.

**(Related State) Variable -** Это переменные, используемые для обмена данными. В Native переменной есть некоторая информация:

- allowedValues = предоставляет информацию о возможном содержимом переменной или о том, что можно отправить в качестве аргумента с действием.
- минимум = наименьшее значение, которое переменная может содержать или которое может быть отправлено в качестве аргумента с действием.
- максимум = наибольшее значение, которое переменная может содержать или которое может быть отправлено в качестве аргумента с действием.
- шаг = указывает, на каких шагах указывается значение.
- sendEvents = ? Возможные значения: "yes" или "no". Но совершенно неясно, что это значит. Предположение о том, что значения этой переменной автоматически отправляются устройством/службой только в том случае, если в sendEvents установлено "yes", не подтвердилось.

Пример опроса значений:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Вы можете включить опрос в админке через конфигурацию объектов.

### Особенности устройств/услуг
**Sonos:** Невозможно создать подписку на QPlay. Для этого может потребоваться аутентификация.

**Phillips Hue Bridge 2:** Реализация стандарта UPnP в Hue Bridge 2 неисправна, поэтому Hue Bridge 2 обнаруживается, но недоступен через UPnP.

**Yamaha:** Использует API на основе стандарта UPnP, но с использованием собственного формата данных. В настоящее время это не поддерживается адаптером UPnP.

**Sony:** Использует интерфейс ScalarWebApi, называемый адресуемым UPnP, но использующий собственный формат данных. В настоящее время это не поддерживается адаптером UPnP.

**Amazon Kindle:** предоставляет службу UPnP, но описание службы UPnP не предоставляется, поэтому ее нельзя использовать.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog

### 1.1.0 (2024-09-30)
* (Jey Cee) Migrate config to JSONConfig 
* (Jey Cee) Fix issues found by adapter checker
* (Jey Cee) Use default test and release action

### 1.0.21 (2022-02-27)
* small fixes

### 1.0.20 (2021-12-04)
* (foxriver76) ensure compatibility with future controller versions
__requires controller v3.3.0__

### 1.0.19 (2021-05-28)
* (bluefox) added support for Admin5

### 1.0.17 (2021-02-21)
* (jey-cee) fix warning messages with js-controller 3.2.x [Github issue #63](https://github.com/iobroker-community-adapters/ioBroker.upnp/issues/63)

### 1.0.16 (2020-04-27)
* (jey-cee) fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable

### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs

### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2024 Jey Cee <iobroker@all-smart.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.