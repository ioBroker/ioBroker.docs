---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: dyiNK9AVp62nMMJsfcoffa31tFuUYZBB4doaN9vSptI=
---
![Логотип](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Количество установок](http://iobroker.live/badges/tuya-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# IoBroker.tuya
![Тестируйте и выпускайте](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер ioBroker для подключения к нескольким небольшим и дешевым устройствам Wi-Fi, которые должны быть подключены к облаку Tuya и в основном используют приложение Smartlife/Alexa-Skill. Адаптер поддерживает чтение обновлений состояния в реальном времени и управление этими устройствами после синхронизации с соответствующим приложением для мобильного телефона.

Устройства Tuya — это смарт-устройства Wi-Fi ESP8266MOD от Shenzhen Xenon.

Помимо устройств, которые можно использовать с приложением Smart Live или приложением Tuya.

Адаптер локально подключается ко всем устройствам, которые «всегда в вайфае». Устройства, которые подключаются к сети только при возникновении события, отправляют свои данные и снова отключаются (в основном **устройства с питанием от батареи**), поддерживаются только при использовании MQTT-соединения Tuya IoT Platform (см. ниже).

Один экземпляр адаптера может локально обнаруживать и подключаться ко всем устройствам в сети, которая маршрутизирует UDP-пакеты! Для сред Docker требуются дополнительные действия и, возможно, Macvlan или что-то подобное!

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения ими или какими-либо связанными с ними дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет коммерческой цели.** **TUYA является товарным знаком Tuya Global Inc.**

## Функциональность: только локальные или облачные функции
Этот адаптер при желании может работать в основном без Tuya Cloud.

Если это требуется, необходима однократная синхронизация с учетной записью приложения Tuya Cloud, как только будут добавлены новые устройства. Это можно сделать, введя облачные учетные данные в конфигурацию адаптера и нажав кнопку «синхронизировать один раз». Нет необходимости хранить учетные данные в облаке!

**Примечание. Когда синхронизация приложений завершена, приложение Tuya Mobile может информировать о входе с устройства Android в учетную запись Tuya. Это от Адаптера!**

Затем адаптер будет прослушивать локальные сообщения UDP, чтобы найти локальные IP-адреса устройств и установить локальное соединение. Это возможно только в том случае, если приложение Tuya НЕ открыто ни на одном устройстве, потому что большинство устройств допускают только одно локальное подключение.

Если вы решите сохранить свои учетные данные для входа в приложение Tuya (приложение Smart Life или приложение Tuya Smart) в конфигурации адаптера, устройства будут автоматически обновляться при запуске каждого адаптера. Кроме того, состояния устройств, которые не подключены локально, можно опрашивать и контролировать через облако Tuya.

Для поддержки обновлений в реальном времени устройств, которые не подключены локально, а также, например. устройства на батарейках, вы можете дополнительно зарегистрировать свою учетную запись на платформе Tuya IoT, связать свою учетную запись приложения и использовать соединение Cloud-MQTT. Чтобы зарегистрировать учетную запись на платформе Tuya IoT, следуйте инструкциям в [Платформа Интернета вещей Туя](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).
**Примечание. Учетная запись платформы IoT активна только в течение некоторого времени, после чего ее необходимо продлевать ежемесячно!**

С этим набором функций вы можете выбирать между всеми доступными вариантами и работать с системами Tuya Cloud или (кроме однократной синхронизации) без них. Вам решать.

«Прежний» App-Proxy-Sync по-прежнему доступен в конфигурации адаптера, но больше не рекомендуется. Сделать новую One Time Cloud Sync намного проще.

### Если обнаружение UDP не работает
Если устройства не обнаруживаются должным образом через их UDP-пакеты, вы можете установить IP-адрес вручную, установив для состояния IP-адреса устройства правильный IP-адрес.
Первая альтернатива — отредактировать объект устройства. См. https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636.

### Примечание для устройств с питанием от батареи
Как уже было сказано выше, устройства с батарейным питанием не поддерживаются данным адаптером при использовании только локальных подключений! Причина в том, что они не все время онлайн для экономии энергии. Всякий раз, когда они получают сигнал, они подключаются к сети, отправляют обновление на облачные серверы Tuya и снова отключаются. Они не посылают UDP-пакеты или находятся в сети достаточно долго, чтобы к ним мог подключиться адаптер.

С помощью функции Tuya App Cloud данные можно опрашивать, но этого может быть недостаточно для датчиков дверей/окна/присутствия. Они должны работать только с MQTT-соединением Tuya IoT Platform.

## Proxy-Sync (Fallback): совместимые мобильные приложения и версии
Текущие версии Tuya Smart, а также приложения Smartlife **больше не совместимы** с тем, как работает адаптер, поскольку Tuya шифрует весь трафик, который может перехватить адаптер. На данный момент все еще работают некоторые старые версии приложений ...

* Приложение Smartlife <3.14, лучшее 3.12.6!!
* Приложение Tuya Smart <3.14, лучше всего 3.12.x
* Приложение STL Smart Home 1.1.1 (последняя дата: сентябрь 2019 г.)
* Домашнее приложение Ucomen (??)

**Важное примечание для пользователей iOS.** Описанный здесь подход с использованием прокси больше не работает. Как только у вас появится приложение Smart Life версии 3.10 или выше, связь из приложения больше не будет видна прокси-серверу. Но он по-прежнему работает со всеми версиями приложений Android, поэтому лучшим подходом является эмулятор Android, как примерно описано на https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- Гер%C3%A4te/19

Для этого в первую очередь вам необходимо добавить собственный корневой сертификат на ваше мобильное устройство.
Когда вы нажимаете «Запустить прокси» в конфигурации экземпляра адаптера, сертификат создается для вашей системы и показывает QR-код для места загрузки. В идеале отсканируйте QR-код с помощью мобильного устройства и следуйте инструкциям по добавлению и доверию этому корневому сертификату.
Если местоположение QR-кода недоступно (это может произойти при использовании Docker или чего-то подобного), откройте «Proxy Web Info Port» в своем браузере и нажмите «Root-CA» в навигации, и вы также можете загрузить файл CA.

Теперь обязательно закройте/убейте соответствующее смарт-приложение Tuya.
После этого добавьте прокси-порт и хост ioBroker в качестве «ручного» прокси для вашего WLAN-соединения на вашем мобильном телефоне.

Теперь откройте соответствующее приложение Tuya Smart и/или перезагрузите его.

Конфигурация администратора покажет сообщение об успешном завершении, если соответствующий пакет данных был получен, а затем выключит прокси-сервер через 10 секунд. Теперь вы можете удалить прокси-сервер со своего телефона, а также не доверять сертификату.

Непосредственно после этого объекты должны быть обновлены с более значимыми именами и с этого момента автоматически получать оперативные обновления и должны иметь возможность общаться.

Синхронизация необходима только изначально или после того, как вы добавили новые устройства в свое приложение.

Некоторые образы для некоторых мобильных ОС можно найти в разделе [Прокси-страница](PROXY.md).

## Устройства, которые не передают актуальные данные
Мы обнаружили некоторые устройства (скорее всего, устройства с состоянием питания/тока), которые могут отображать актуальные значения только тогда, когда к ним подключено мобильное приложение. Когда приложение закрывается, они остаются на старых значениях.

В настоящее время эти устройства в большинстве случаев работают только через «интервал опроса». Они не предоставляют актуальные значения сами по себе. Вы можете попытаться обойти это, используя платформу iot от Tuya и включив опцию MQTT.

Некоторые из этих устройств также не передают актуальные значения при использовании опроса. Если у вас есть такое устройство, возможно, устройство нужно опрашивать по-другому. Это можно настроить вручную. Пожалуйста, сделайте следующее:

* Остановить экземпляр tuya
* Используйте Admin на вкладке «Объекты» и найдите объект с типом «устройство» затронутого устройства. В этой строке в представлении Admin Objects щелкните значок карандаша.
* В представлении JSON объекта вы видите «собственный» раздел. Добавьте новый ключ json в этот нативный раздел:

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

* Сохраните объект, перезапустите адаптер и проверьте, обновлены ли значения сейчас.

## Функции инфракрасного шлюза
В дереве объектов есть разные типы ИК-устройств

### ИК-шлюз/устройства-отправители
Это реальное устройство, которое у вас есть в качестве оборудования. Это устройство используется вспомогательными устройствами, определенными в мобильном приложении (см. ниже), и может использоваться для изучения и отправки пользовательских ИК-кодов.

Состояние «ir-learn» в этом устройстве является триггером, который можно использовать для изучения IR-кодов. Полученный код затем принимается в состоянии «202» как данные в кодировке base64.

Состояние «ir-send» может использоваться для отправки на устройство IR-кода в кодировке base64. Это можно использовать для отправки выученного кода из состояния «ir-learn».

**Этот способ управления работает только на «основном ИК-устройстве».**

### ИК-подустройства
ИК-подустройства имеют множество состояний «ir-*», которые являются кнопками для запуска соответствующей кнопки/ИК-кода. Их состояния должны соответствовать расположению кнопок в мобильном приложении.

Некоторые устройства имеют комбинированные состояния, такие как «M0_T20_S3» (найденные кондиционером Daikin), что означает режим 0, температура 20 и скорость (вентилятора) 3. На самом деле вам нужно выбрать правильную кнопку. До сих пор мы не нашли универсального/автоматического способа узнать, какая кнопка какая.
Само мобильное приложение также пытается запомнить эти настройки, поэтому, как только вы запускаете что-либо с адаптером (или реальным ИК-контроллером устройства), информация из приложения устаревает.

## Функции сцен
Когда учетные данные облака приложения вводятся и сохраняются, адаптер также считывает сцены из приложения и создает их как объекты в адаптере. Сцены можно активировать, установив для состояния сцены значение true.

Затем запуск отправляется в облако.

## Функции групп
Адаптер также считывает определенные группы и создает в адаптере соответствующие состояния. Значение группы также опрашивается из облака и обновляется в адаптере.
При управлении группами это также делается через облако, потому что в противном случае статус группы не будет синхронизирован.

## Кредиты
Работа адаптера была бы невозможна без отличной работы @codetheweb, @kueblc и @NorthernMan54 (https://github.com/codetheweb/tuyapi) и https://github.com/clach04/python-tuya. , https://github.com/uzlonewolf/tinytuya и многие другие.

## Как сообщать о проблемах и запросах функций
Пожалуйста, используйте для этого задачи GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Режим эксперта -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не от администратора, потому что администратор обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

При возникновении проблем с синхронизацией Tuya App Cloud можно создать дополнительный журнал с помощью следующего процесса:

* Остановить адаптер в админке
* Откройте оболочку на хосте ioBroker
* выполнить `DEBUG=@tuyapi/cloud* iobroker debug tuya`
* получить лог из командной строки

Отправьте журнал со ссылкой на созданную проблему GitHub по адресу iobroker@fischer-ka.de.

## Changelog
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

Copyright (c) 2018-2022 Apollon77 <iobroker@fischer-ka.de>

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