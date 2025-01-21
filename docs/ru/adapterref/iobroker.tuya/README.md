---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: 29T6j+eK0Sc9MCrmeGWPu2W6fsjPDsa2fr1B5jO+E4o=
---
![Логотип](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Количество установок](http://iobroker.live/badges/tuya-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# IoBroker.tuya
![Тест и выпуск](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер ioBroker для подключения к нескольким небольшим и дешевым устройствам Wifi, которые подключены к Tuya Cloud и в основном используют Smartlife App/Alexa-Skill. Адаптер поддерживает чтение обновлений статуса в реальном времени и управление этими устройствами после синхронизации с соответствующим приложением для мобильного телефона.

Кроме устройств, которые можно использовать с приложениями Smart Live или Tuya.

Адаптер локально подключается ко всем устройствам, которые «всегда подключены к Wi-Fi». Устройства, которые подключаются к сети только при возникновении события, отправляют данные и снова отключаются (в основном **устройства с питанием от батареи**), поддерживаются только с использованием подключения Tuya IoT Platform MQTT (см. ниже).

Один экземпляр адаптера может локально обнаруживать и подключаться ко всем устройствам в сети, которая маршрутизирует пакеты UDP! Для сред Docker это требует дополнительных действий и, возможно, Macvlan или аналогичного!

**Примечание: на одном хосте может работать только один экземпляр этого адаптера из-за используемых сетевых портов.**

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками их соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения ими или любыми связанными дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей.** **TUYA является товарным знаком Tuya Global Inc.**

## Функциональность: локальные и поддерживаемые облаком функции
При желании этот адаптер может работать без Tuya Cloud.

Если это необходимо, необходимо выполнить однократную синхронизацию с учетной записью Tuya Cloud App сразу после добавления новых устройств. Это можно сделать, введя учетные данные облака в конфигурацию адаптера и нажав кнопку «синхронизировать один раз». Хранить учетные данные облака не нужно!

**Примечание: Когда App Sync выполнен, приложение Tuya Mobile может сообщить о входе с устройства Android в учетную запись Tuya. Это от адаптера!**

Затем адаптер будет прослушивать локальные UDP-сообщения, чтобы найти локальные IP-адреса устройств и установить локальное соединение. Это возможно только тогда, когда приложение Tuya НЕ открыто ни на одном устройстве, поскольку большинство устройств допускают только одно локальное соединение.

Если вы решили сохранить учетные данные для входа в приложение Tuya (приложение Smart Life или приложение Tuya Smart) в конфигурации адаптера, то устройства будут автоматически обновляться при каждом запуске адаптера. Кроме того, состояния устройств, которые не подключены локально, можно опрашивать и контролировать через облако Tuya.

Для поддержки обновлений в реальном времени для устройств, которые не подключены локально, а также, например, для устройств на базе аккумуляторов, вы можете дополнительно зарегистрировать себе учетную запись на платформе Tuya IoT и связать свою учетную запись приложения и использовать соединение Cloud-MQTT. Чтобы зарегистрировать себе учетную запись на платформе Tuya IoT, следуйте инструкциям на [Платформа Интернета вещей Tuya](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).
**Примечание: учетная запись платформы IoT активна только в течение некоторого времени и должна ежемесячно продлеваться после этого!**

Если вы используете платформу Tuya IoT и получаете сообщение в журнале типа «Используйте опрос облака приложений, так как последнее обновление MQTT было 29 часов назад. Проверьте статус Tuya IoT Cloud, чтобы срок действия ни одной службы не истек», то это означает, что в последний раз не было сообщений MQTT, и, скорее всего, срок действия iot Core Service истек. Войдите в платформу Tuya IoT и проверьте статус iot Core Service. Если срок действия истек, продлите его (возможно ежемесячно напрямую или до 6 месяцев с ручным процессом проверки сотрудниками Tuya.
Прямая ссылка: https://eu.iot.tuya.com/cloud/products?productType=all

С этим набором функций вы можете выбирать между всеми доступными опциями и работать с системами Tuya Cloud или (помимо одноразовых синхронизаций) без них. Решать вам.

"Бывший" App-Proxy-Sync все еще доступен в Adapter Config, но больше не рекомендуется. Гораздо проще сделать новую One Time Cloud Sync.

### Если обнаружение UDP не работает
Если устройства не определяются правильно через их UDP-пакеты, вы можете установить IP вручную, установив состояние IP устройства на правильный IP.
Первая альтернатива — это редактирование объекта устройства. См. https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

### Примечание для устройств с питанием от батареи
Как уже было сказано выше, устройства с питанием от батареи не поддерживаются этим адаптером при использовании только локальных подключений! Причина в том, что они не находятся в сети все время для экономии энергии. Всякий раз, когда они получают сигнал, они выходят в сеть, отправляют обновление на облачные серверы Tuya и снова выходят в офлайн. Они не отправляют никаких UDP-пакетов или находятся в сети достаточно долго, чтобы адаптер мог подключиться к ним.

Используя функцию Tuya App Cloud, можно опрашивать данные, но этого может быть недостаточно для датчиков дверей/окон/присутствия. Они должны работать только с подключением Tuya IoT Platform MQTT.

## Proxy-Sync (резервный вариант): совместимые мобильные приложения и версии
Текущие версии Tuya Smart, а также Smartlife App **больше не совместимы** с тем, как работает адаптер, поскольку Tuya зашифровала весь трафик, который адаптер мог перехватить. На данный момент некоторые старые версии приложений все еще работают...

* Приложение Smartlife <3.14, лучшее 3.12.6!!
* Tuya Smart App <3.14, лучше всего 3.12.x
* Приложение STL Smart Home 1.1.1 (последняя версия от сентября 2019 г.)
* Приложение Ucomen Home (??)

**Важное примечание для пользователей iOS:** Описанный здесь подход с использованием прокси больше не работает. Как только у вас появится приложение Smart Life версии 3.10 или выше, связь от приложения больше не будет видна прокси. Но оно по-прежнему работает со всеми версиями приложений Android, поэтому лучшим подходом будет эмулятор Androis, как примерно описано на https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19

Для этого вам, прежде всего, нужно добавить пользовательский корневой сертификат на ваше мобильное устройство.
Когда вы нажимаете «Запустить прокси» в конфигурации экземпляра адаптера, сертификат создается для вашей системы и показывает QR-код для места загрузки. В идеале отсканируйте QR-код с помощью вашего мобильного устройства и следуйте процессу, чтобы добавить и доверять этому корневому сертификату.
Если местоположение QR-кода недоступно (это может случиться при использовании Docker или чего-то подобного), откройте «Порт веб-информации прокси» в вашем браузере и нажмите «Корневой CA» в навигации, и вы также сможете загрузить файл CA.

Теперь обязательно закройте/уничтожьте соответствующее смарт-приложение Tuya.
После этого добавьте Proxy-Port и хост ioBroker в качестве «ручного» прокси для вашего WLAN-подключения на вашем мобильном телефоне.

Теперь откройте соответствующее приложение Tuya Smart и/или перезагрузите его.

Конфигурация администратора покажет сообщение об успешном завершении, если соответствующий пакет данных был получен, а затем отключит прокси через 10 секунд. Теперь вы можете удалить прокси со своего телефона, а также перестать доверять сертификату.

Сразу после этого объекты должны быть обновлены, им должны быть присвоены более осмысленные имена, и с этого момента они должны автоматически получать обновления в реальном времени и иметь возможность обмениваться данными.

Синхронизация необходима только на начальном этапе или после добавления новых устройств в приложение.

Некоторые образы для некоторых мобильных ОС можно найти по адресу [Прокси-страница](PROXY.md).

## Устройства, которые не предоставляют актуальные данные
Мы обнаружили некоторые устройства - скорее всего, устройства с состояниями питания/тока - которые могут иметь эффект, что они показывают актуальные значения только тогда, когда к ним подключено мобильное приложение. Когда приложение закрыто, они остаются на старых значениях.

В настоящее время эти устройства в большинстве случаев работают только через «интервал опроса». Они не предоставляют обновленные значения самостоятельно. Вы можете попытаться обойти это, используя платформу iot от Tuya и включив опцию MQTT.

Некоторые из этих устройств также не предоставляют актуальные значения при использовании опроса. Если у вас есть такое устройство, возможно, его нужно опрашивать по-другому. Это можно настроить вручную. Пожалуйста, сделайте следующее:

* Остановить экземпляр туи
* Используйте Admin на вкладке "Объекты" и найдите объект с типом "устройство" затронутого устройства. В этой строке в представлении Admin Objects щелкните значок карандаша.
* В представлении JSON объекта вы видите раздел "native". Добавьте новый ключ json внутри этого раздела native:

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

* Сохраните объект, перезапустите адаптер и проверьте, обновились ли теперь значения.

## Возможности инфракрасного шлюза
В дереве объектов имеются различные типы ИК-устройств.

### ИК-шлюз/устройства-отправители
Это реальное устройство, которое у вас есть как Hardware. Это устройство используется подустройствами, определенными в мобильном приложении (см. ниже), и может использоваться для обучения и отправки пользовательских ИК-кодов.

Состояние "ir-learn" в этом устройстве является триггером, который может использоваться для обучения ИК-кодам. Затем изученный код принимается в состоянии "202" как закодированные в base64 данные.

Состояние "ir-send" может использоваться для отправки ИК-кода, закодированного в base64, на устройство. Это может использоваться для отправки изученного кода из состояния "ir-learn".

**Этот способ управления работает только на «главном ИК-устройстве».**

### Дополнительные ИК-устройства
У ИК-дополнительных устройств есть много состояний "ir-*", которые являются кнопками для запуска соответствующего кода Button/IR. Состояния ir должны соответствовать расположению кнопок в мобильном приложении.

Некоторые устройства имеют комбинированные состояния, такие как «M0_T20_S3» (обнаружено кондиционером Daikin), что означает режим 0, температуру 20 и скорость (вентилятора) 3. На самом деле вам нужно выбрать правильную кнопку. До сих пор мы не нашли универсального/автоматизированного способа узнать, какая кнопка какая.
Само мобильное приложение также пытается запомнить эти настройки, поэтому, как только вы активируете что-либо с помощью адаптера (или настоящего ИК-контроллера устройства), информация из приложения устаревает.

## Особенности сцен
Когда учетные данные облака приложения вводятся и сохраняются, адаптер также считывает сцены из приложения и создает их как объекты в адаптере. Сцены можно запустить, установив состояние сцены на true.

Затем сигнал отправляется в облако.

## Возможности групп
Адаптер также считывает определенные группы и создает соответствующие состояния в адаптере. Значение группы также опрашивается из облака и обновляется в адаптере.
При управлении группами это также делается через облако, потому что в противном случае состояние группы будет рассинхронизировано.

## Преобразованные/улучшенные точки данных
Данные из некоторых точек данных закодированы, поэтому их необходимо расшифровать и повторно зашифровать, если разрешено их изменение.

### Поля растрового изображения
Некоторые поля содержат битовые карты, что означает, что они являются числом, и каждый бит в этом числе представляет состояние. Адаптер преобразует эти поля в подсостояния, такие как X-0 (для бита 0), X-1 (для бита 1) и так далее. Метка бита добавляется к имени состояния.
В настоящее время битовые поля не могут быть записаны.

### Состояния цвета RGB (идентификаторы 24/5/colour/colour_data)
Точки данных цвета RGB декодируются в объект 5-rgb/24-rgb как значение RGB в форме "#rrggbb". Текущий цвет декодируется в это состояние и также может быть установлен путем установки этого состояния.
Обязательно используйте правильный режим лампы (белый/цветной), поскольку цвет имеет значение только при активном цветовом режиме.

### Состояния измерения мощности (ИД 5/6/7/фаза_a/фаза_b/фаза_c)
Состояния измерения мощности декодируются в объект X-ток, X-мощность и X-напряжение. X-мощность имеет значение только для некоторых устройств.
Эти состояния не подлежат записи.

### Состояния тревог устройства (ID 17/alarm_set_2)
Состояния тревоги декодируются в 17-декодированный объект с json в качестве значения. JSON содержит массив со списком определенных типов тревог и их пороговых значений. Вы можете изменить и настроить этот JSON, чтобы изменить настройки тревоги. Известны следующие типы тревог (но, возможно, не все поддерживаются всеми устройствами):

* перегрузка по току
* трехфазный_ток_дисбаланс
* амперметр_перенапряжение
* пониженное_напряжение
* трехфазная_потеря_тока
* сбой_питания
* магнитный
* недостаточный_баланс
* задолженность
* перенапряжение_аккумулятора
* крышка_открыта
* счетчик_крышка_открыта
* вина

## Кредиты
Работа адаптера была бы невозможна без отличной работы @codetheweb, @kueblc и @NorthernMan54 (https://github.com/codetheweb/tuyapi), а также https://github.com/clach04/python-tuya,https://github.com/uzlonewolf/tinytuya и многих других.

## Как сообщать о проблемах и запрашивать новые функции
Для этого используйте GitHub issues.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Режим эксперта -> Уровень журнала столбцов). Затем, пожалуйста, получите файл журнала с диска (подкаталог "log" в каталоге установки ioBroker, а не из Admin, потому что Admin обрезает строки). Если вам не нравится предоставлять его в задаче GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую задачу GitHub И также опишите, что я вижу в журнале в какое время.

При возникновении проблем с синхронизацией Tuya App Cloud можно создать дополнительный журнал, выполнив следующий процесс:

* Остановите адаптер в Администраторе
* Откройте оболочку на хосте ioBroker
* выполнить `DEBUG=@tuyapi/cloud* iobroker debug tuya`
* получить журнал из командной строки

Отправьте журнал со ссылкой на созданную проблему GitHub на iobroker@fischer-ka.de

## Changelog

### __WORK IN PROGRESS__
* (@Apollon77) Fixed initial setting and value correction for special Temp values
* (@Apollon77) More schema information were added/updated

### 3.17.0 (2025-01-08)
* (@Apollon77) Added support for Tuya 3.5 devices
* (@Apollon77) Fixed several errors report by Sentry
* (@Apollon77) Tried to reduce memory usage by only loading Schema definitions when needed and giving memory free afterward
* (@Apollon77) More schema information were added/updated
* (@Apollon77) Added enhanced logic for AC/DC states and generalized it for more devices
* (@Apollon77) Fixed raw data parsing for some devices
* (@Apollon77) Adjusted special handling for TempSet, TempCurrent and FloorTemp states to return correct values
* (@simatec) Responsive Design added

### 3.16.0 (2024-08-15)
* js-controller 5.0 is now required at least
* (Apollon77) Improves stability
* (Apollon77) Tries to support phase_X information with 10 bytes
* (Apollon77) More schema information were added/updated

### 3.15.0 (2023-11-23)
* (agraf) Add support to login with "Ledvance" App account
* (Apollon77) Add support to login with "Sylvania" App account
* (Apollon77) Fixed several smaller issues reported by Sentry
* (Apollon77) More schema information added/updated

### 3.14.2 (2023-03-24)
* (Apollon77) prevent state polling to hang when decide do not return new data
* (Apollon77) More schema information added/updated

### 3.14.1 (2023-02-09)
* (Apollon77) Also adjust min/max when using multipliers
* (Apollon77) More schema information added/updated

### 3.14.0 (2023-01-28)
* (Apollon77) Added special handling for needed multiplier for TempSet(2), TempCurrent(3) and floorTemp(102) objects
* (Apollon77) More schema information added/updated

### 3.13.1 (2023-01-16)
* (Apollon77) More schema information added/updated

### 3.13.0 (2023-01-10)
* (Apollon77) Add generic support for gateways (and so also WLAN Gateways)
* (Apollon77) More schema information added/updated

### 3.12.1 (2023-01-03)
* (Apollon77) More schema information added/updated

### 3.12.0 (2022-12-29)
* (Apollon77) Added decoding of phase_a/b/c and alarm_set_2
* (Apollon77) Added fallback for cloud polling when no values were updated using MQTT connection
* (Apollon77) Added decoding of bitmaps (read only for now)

### 3.11.4 (2022-12-28)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.3 (2022-12-22)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.2 (2022-12-20)
* (Apollon77) More schema information added/updated
* (Apollon77) A crash case reported by Sentry is prevented

### 3.11.1 (2022-12-15)
* (Apollon77) More schema information added/updated
* (Apollon77) Prevent crash case reported by Sentry

### 3.11.0 (2022-12-14)
* (Apollon77) Added support to control Zigbee Devices via Hubs locally
* (Apollon77) Prevent crash case when new unencrypted device is discovered
* (Apollon77) More schema information added/updated

### 3.10.2 (2022-12-05)
* (Apollon77) Optimize IR - now works locally and via cloud in all cases

### 3.10.1 (2022-12-05)
* (Apollon77) Make info.ip writable to allow manual setting of IP address

### 3.10.0 (2022-12-05)
* (Apollon77) Added support for groups
* (Apollon77) Add support for a second type of IR blaster
* (Apollon77) Added cloud session refresh while adapter is running
* (Apollon77) Add custom handling for bright_value fields with missing scale factor (10..1000 will be now 1..100);
* (Apollon77) Base64 encoded raw values are now decoded again when the decoded value is readable ascii
* (Apollon77) Allow to flag devices manually that need "refresh instead of get" to get current data - use "useRefreshToGet: true" in device object native section
* (Apollon77) More schema information added/updated

### 3.9.4 (2022-11-19)
* (Apollon77) More schema information added/updated

### 3.9.3 (2022-11-17)
* (Apollon77) Optimize Tuya protocol 3.4 discovery
* (Apollon77) Prevent restart schedules that are too short when cloud is used
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) More schema information added/updated

### 3.9.2 (2022-11-16)
* (Apollon77) Optimize discovery and device connection checks
* (Apollon77) IPs of unconnected devices can be set via the ip state now
* (Apollon77) Fix crash cases reported by Sentry

### 3.9.1 (2022-11-14)
* (Apollon77) Add support for local control of Tuya protocols 3.2 and 3.4
* (TA2k/Apollon77) Add basic support for IR devices (Gateway and Sub Devices)
* (Apollon77) Convert special colour/colour_data values to an additional rgb state
* (Apollon77) Allow to define that devices do not connect locally (this prevents error logs, and they work via cloud if data are provided)
* (Apollon77) Add support for more cloud MQTT notifications
* (Apollon77) More schema information added/updated

### 3.8.1 (2022-11-06)
* (TA2k/Apollon77) Add App-Cloud Sync deceasing the proxy
* (Apollon77) Add support for device polling using App-Cloud for devices not connected
* (Apollon77) Add support for realtime cloud state updates using Tuya IoT Platform MQTT connection
* (Apollon77) Allow to update names of device objects when changed in App
* (Apollon77) Use read Schema details from Sync instead the already contained ones
* (Apollon77) React to device infos from MQTT connection and update/add device objects
* (Apollon77) When Datapoints (e.g sockets) have custom names, also use them as State Names
* (Apollon77) More schema information added

### 3.7.2 (2022-10-23)
* (Apollon77) Prevent warnings for invalid min/max values

### 3.7.0 (2022-10-22)
* (Apollon77) Optimizations for Proxy mode to prevent certificate issues
* (Apollon77) Allow to also "click" on the certificate to download the certificate file
* (Apollon77) Adjust min/max values if a scale is defined
* (Apollon77) More schema information added

### 3.6.15 (2022-01-24)
* (Apollon77) More schema information added
* (Apollon77) Recreate Proxy SSL certificates once older than 3 months to prevent ssl errors

### 3.6.14 (2021-11-07)
* (Apollon77) More schema information added

### 3.6.13 (2021-10-28)
* (Apollon77) More schema information added

### 3.6.11 (2021-09-05)
* (Apollon77) More schema information added

### 3.6.9 (2021-07-18)
* (Apollon77) Adjust reconnect handling on initialization

### 3.6.8 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.7 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.6 (2021-07-17)
* (Apollon77) Fix reconnect handling
* (Apollon77) More schema information added

### 3.6.5 (2021-06-23)
* (Apollon77) Make sure for enums values are set with correct type
* (Apollon77) More schema information added

### 3.6.3 (2021-06-04)
* (Apollon77) More schema information added
* (Apollon77) Update tuyapi

### 3.6.2 (2021-05-10)
* (Apollon77) type "bitmap" is a number
* (Apollon77) More schema information added

### 3.6.1 (2021-04-11)
* (Apollon77) More schema information added

### 3.6.0 (2021-04-02)
* (Apollon77) Fix broken data updates because of tuyaapi change
* (Apollon77) Optimize "json unvalid" cases by refreshing data manually differently 
* (Apollon77) More schema information added

### 3.5.9 (2021-03-28)
* (Apollon77) More schema information added

### 3.5.8 (2021-03-24)
* (Apollon77) More schema information added

### 3.5.7 (2021-03-18)
* (Apollon77) Fix crash case (Sentry IOBROKER-TUYA-P9)
* (Apollon77) More schema information added

### 3.5.6 (2021-02-09)
* (Apollon77) More schema information added

### 3.5.4 (2021-01-30)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-TUYA-MG)
* (Apollon77) More schema information added

### 3.5.3 (2021-01-13)
* (Apollon77) More schema information added

### 3.5.2 (2020-12-24)
* (Apollon77) More schema information added

### 3.5.0 (2020-12-10)
* (Apollon77) More schema information added
* (Apollon77) Try to decode "raw" values via base64

### 3.4.3 (2020-11-29)
* (Apollon77) More schema information added

### 3.4.2 (2020-11-19)
* (Apollon77) More schema information added

### 3.4.1 (2020-11-05)
* (Apollon77) More schema information added
* (Apollon77) fix IP lookup via UDP

### 3.4.0 (2020-10-29)
* (Apollon77) update tuya-api library

### 3.3.15 (2020-10-29)
* (Apollon77) More schema information added

### 3.3.14 (2020-09-15)
* (Apollon77) More schema information added

### 3.3.12 (2020-08-26)
* (Apollon77) More schema information added
* (Apollon77) Crash case prevented (Sentry IOBROKER-TUYA-89)

### 3.3.11 (2020-08-18)
* (Apollon77) More schema information added

### 3.3.10 (2020-08-02)
* (Apollon77) More schema information added

### 3.3.9 (2020-07-16)
* (Apollon77) More schema information added

### 3.3.8 (2020-07-09)
* (Apollon77) Work around invalid data that are returned by some devices
* (Apollon77) More schema information added

### 3.3.7 (2020-07-01)
* (Apollon77) More schema information added

### 3.3.6 (2020-06-29)
* (Apollon77) More schema information added

### 3.3.5 (2020-06-11)
* (Apollon77) More schema information added
* (Apollon77) Optimizations and fixes

### 3.3.2 (2020-03-19)
* (Apollon77) Many new schemas added

### 3.2.3 (2020-03-08)
* (Apollon77) Many new schemas added

### 3.2.2 (2020-02-08)
* (Apollon77) New schemas added
* (Apollon77) Better handle strange case where qrcode library is not existing

### 3.2.0 (2020-02-05)
* (Apollon77) Many new schemas added
* (Apollon77) Add Infos about compatible App versions with link to enhanced docs
* (Apollon77) try to detect unsupported apps when trying to sync and write warning in logfile
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.1.16 (2019-12-26)
* (Apollon77) New schemas added
* (Apollon77) prevent crash when proxy request had no hosts array

### 3.1.15 (2019-12-24)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.14 (2019-12-20)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.13 (2019-12-11)
* (Apollon77) New schemas added

### 3.1.12 (2019-12-07)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.11 (2019-12-06)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.10 (2019-12-05)
* (Apollon77) New schemas added

### 3.1.9 (2019-11-30)
* (Apollon77) New schemas added
* (Apollon77) Improve error handling for proxy web port

### 3.1.8 (2019-11-28)
* (Apollon77) New schemas added
* (Apollon77) Add check for invalid proxy port

### 3.1.7 (2019-11-26)
* (Apollon77) New schemas added

### 3.1.6 (2019-11-25)
* (Apollon77) New schemas added
* (Apollon77) Optimize Sentry integration and dedupe errors

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2025 Apollon77 <iobroker@fischer-ka.de>

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