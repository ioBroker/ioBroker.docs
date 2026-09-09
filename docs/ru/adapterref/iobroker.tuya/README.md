---
chapters: {"pages":{"en/adapterref/iobroker.tuya/README.md":{"title":{"en":"ioBroker.tuya"},"content":"en/adapterref/iobroker.tuya/README.md"},"en/adapterref/iobroker.tuya/PROXY.md":{"title":{"en":"Proxy instructions for mobile Phones"},"content":"en/adapterref/iobroker.tuya/PROXY.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: +h2lzblNtCaJsmIO0aT58QkIMbodiFiABq6EAwdlKj4=
---
![Логотип](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Количество установок](http://iobroker.live/badges/tuya-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# ioBroker.tuya

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер ioBroker предназначен для подключения нескольких небольших и недорогих Wi-Fi-устройств, подключенных к облаку Tuya и использующих в основном приложение Smartlife/навык Alexa. Адаптер поддерживает чтение обновлений состояния в реальном времени и управление этими устройствами после синхронизации с соответствующим мобильным приложением.

Помимо устройств, совместимых с приложениями Smart Live или Tuya.

Адаптер локально подключается ко всем устройствам, которые «всегда находятся в сети Wi-Fi». Устройства, которые подключаются к сети только при возникновении события, отправляют свои данные и снова отключаются (в основном, **устройства с батарейным питанием** ), поддерживаются только с помощью подключения MQTT к платформе Tuya IoT (см. ниже).

Один экземпляр адаптера может локально обнаруживать и подключаться ко всем устройствам в сети, маршрутизирующей UDP-пакеты! Для сред Docker это требует дополнительных действий и, возможно, использования Macvlan или аналогичных функций!

**Примечание: На одном хосте может работать только один экземпляр этого адаптера из-за используемых сетевых портов.**

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.** **TUYA является товарным знаком компании Tuya Global Inc.**

## Функциональность: только локальное использование или поддержка облачных функций.

При желании этот адаптер может в основном работать и без облачного сервиса Tuya.

Для этого требуется однократная синхронизация с учетной записью приложения Tuya Cloud сразу после добавления новых устройств. Это можно сделать, введя учетные данные облака в конфигурацию адаптера и нажав кнопку «однократная синхронизация». Хранить учетные данные облака не требуется!

**Примечание: После завершения синхронизации приложений приложение Tuya Mobile может сообщить о входе в учетную запись Tuya с устройства Android. Это происходит из адаптера!**

Затем адаптер будет прослушивать локальные UDP-сообщения, чтобы найти локальные IP-адреса устройств и установить локальное соединение. Это возможно только в том случае, если приложение Tuya НЕ открыто ни на одном устройстве, поскольку большинство устройств допускают только одно локальное соединение.

Если вы решите сохранить свои учетные данные для входа в приложение Tuya (приложение Smart Life или Tuya Smart) в конфигурации адаптера, то устройства будут автоматически обновляться при каждом запуске адаптера. Кроме того, состояние устройств, не подключенных локально, можно отслеживать и контролировать через облако Tuya.

Для поддержки обновлений в реальном времени устройств, не подключенных локально, а также, например, устройств с батарейным питанием, вы можете дополнительно зарегистрировать учетную запись на платформе Tuya IoT, связать свою учетную запись приложения и использовать соединение Cloud-MQTT. Для регистрации учетной записи на платформе Tuya IoT следуйте инструкциям на [самой платформе Tuya IoT](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx) . **Примечание: учетная запись на платформе IoT активна только в течение определенного времени и требует ежемесячного продления!**

Если вы используете платформу Tuya IoT и получаете в журнале сообщение типа «Используйте опрос приложения в облаке, поскольку последнее обновление MQTT было 29 часов назад. Пожалуйста, проверьте статус вашего облака Tuya IoT, чтобы убедиться, что ни одна служба не истекла», это означает, что в последнее время не было сообщений MQTT, и, скорее всего, срок действия основной службы IoT истек. Войдите в платформу Tuya IoT и проверьте статус основной службы IoT. Если срок ее действия истек, продлите ее (возможно, ежемесячно напрямую или до 6 месяцев с ручной проверкой сотрудниками Tuya). Прямая ссылка: <https://eu.iot.tuya.com/cloud/products?productType=all>

Благодаря этому набору функций вы можете выбирать из всех доступных вариантов и работать с системами Tuya Cloud или (за исключением разовых синхронизаций) без них. Решать вам.

Прежний способ синхронизации через App-Proxy-Sync по-прежнему доступен в конфигурации адаптера, но больше не рекомендуется. Гораздо проще выполнить новую одноразовую облачную синхронизацию.

### Если обнаружение UDP не работает

Если устройства некорректно определяются через их UDP-пакеты, вы можете установить IP-адрес вручную, задав IP-состояние устройства на правильный IP-адрес. Предыдущий вариант — отредактировать объект устройства. См. <https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636>

### Примечание для устройств с батарейным питанием

Как уже говорилось выше, устройства с батарейным питанием не поддерживаются этим адаптером при использовании только локальных подключений! Причина в том, что они не находятся в сети постоянно, чтобы экономить энергию. Как только они получают сигнал, они подключаются к сети, отправляют обновление на облачные серверы Tuya и снова отключаются. Они не отправляют никаких UDP-пакетов и не находятся в сети достаточно долго, чтобы адаптер мог к ним подключиться.

Использование функции Tuya App Cloud позволяет получать данные, но этого может быть недостаточно для датчиков открытия дверей/окон/присутствия. Они должны работать только с подключением MQTT к платформе Tuya IoT.

## Синхронизация через прокси (резервный вариант): совместимые мобильные приложения и версии.

Текущие версии приложений Tuya Smart и Smartlife **больше не совместимы** с работой адаптера, поскольку Tuya шифрует весь трафик, который адаптер может перехватить. Пока что некоторые старые версии приложений всё ещё работают...

- Приложение Smartlife <3.14, лучшее 3.12.6!!
- Приложение Tuya Smart <3.14, лучший результат 3.12.x
- Приложение STL Smart Home 1.1.1 (последняя версия — сентябрь 2019 г.)
- Приложение Ucomen Home (??)

**Важное примечание для пользователей iOS:** описанный здесь подход с использованием прокси больше не работает. Начиная с версии приложения Smart Life 3.10 или выше, связь между приложением и прокси-сервером становится невидимой. Однако он по-прежнему работает со всеми версиями приложений Android, поэтому наилучший подход — это использование эмулятора Android, как примерно описано в <https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19>

Для этого сначала необходимо добавить пользовательский корневой сертификат на ваше мобильное устройство. Когда вы нажмете «Запустить прокси» в конфигурации экземпляра адаптера, сертификат будет создан для вашей системы, и отобразится QR-код, ведущий к месту загрузки. В идеале отсканируйте QR-код с помощью вашего мобильного устройства и следуйте инструкциям, чтобы добавить этот корневой сертификат и подтвердить доверие к нему. Если местоположение QR-кода недоступно (это может произойти при использовании Docker или подобных сервисов), откройте «Информация о порте веб-прокси» в вашем браузере и нажмите «Корневой центр сертификации» в меню навигации, после чего вы сможете загрузить файл центра сертификации.

Теперь обязательно закройте/завершите работу соответствующего приложения Tuya Smart. После этого добавьте Proxy-Port и хост ioBroker в качестве "ручного" прокси для вашего беспроводного подключения на мобильном телефоне.

Теперь откройте соответствующее приложение Tuya Smart и/или пополните его.

В настройках администратора отобразится сообщение об успешном получении соответствующего пакета данных, после чего прокси-сервер будет отключен через 10 секунд. Теперь вы можете удалить прокси-сервер со своего телефона, а также снять доверие с сертификата.

Сразу после этого объектам следует присвоить более осмысленные имена, после чего они будут автоматически получать обновления в режиме реального времени и смогут взаимодействовать друг с другом.

Синхронизация необходима только на начальном этапе или после добавления новых устройств в приложение.

Некоторые изображения для мобильных ОС можно найти на [Proxy-Page](/#/docs/adapterref/iobroker.tuya/PROXY.md) .

## Устройства, которые не предоставляют актуальные данные.

Мы обнаружили несколько устройств — скорее всего, это устройства с датчиками питания/тока — которые могут отображать актуальные значения только при подключении к ним мобильного приложения. После закрытия приложения отображаются старые значения.

В настоящее время эти устройства в большинстве случаев работают только через «интервал опроса». Они не предоставляют актуальные значения самостоятельно. Вы можете попробовать обойти это, используя платформу IoT от Tuya и включив опцию MQTT.

Некоторые из этих устройств также не предоставляют актуальные значения при использовании опроса. Если у вас такое устройство, возможно, его необходимо опрашивать другим способом. Это можно настроить вручную. Пожалуйста, выполните следующие действия:

- Остановите экземпляр Tuya.
- В разделе «Администрирование» на вкладке «Объекты» найдите объект с типом «устройство», соответствующий вашему устройству. В представлении «Администрирование объектов» в этой строке нажмите значок карандаша.
- В JSON-представлении объекта вы увидите раздел "native". Добавьте новый JSON-ключ в этот раздел native:

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

- Сохраните объект, перезапустите адаптер и проверьте, обновились ли значения.

## Характеристики инфракрасного шлюза

В дереве объектов представлены различные типы ИК-устройств.

### ИК-шлюз/передающие устройства

Это реальное устройство, которое вы используете в качестве аппаратного обеспечения. Это устройство используется вспомогательными устройствами, определенными в мобильном приложении (см. ниже), и может использоваться для обучения и отправки пользовательских ИК-кодов.

В этом устройстве состояние "ir-learn" представляет собой триггер, который можно использовать для обучения ИК-кодам. Затем обученный код принимается в состоянии "202" в виде данных, закодированных в base64.

Состояние "ir-send" можно использовать для отправки ИК-кода, закодированного в base64, на устройство. Это же состояние можно использовать для отправки заученного кода из состояния "ir-learn".

**Этот способ управления работает только с "основным ИК-устройством".**

### ИК-субустройства

ИК-подсистемы имеют множество состояний "ir-\*", каждое из которых представляет собой кнопку для запуска соответствующего кода кнопки/ИК-датчика. Состояния ИК-датчика должны соответствовать расположению кнопок в мобильном приложении.

У некоторых устройств есть комбинированные состояния, например, "M0\_T20\_S3" (как у кондиционера Daikin), что означает режим 0, температуру 20 и скорость вентилятора 3. Фактически, вам нужно выбрать правильную кнопку. До сих пор мы не нашли универсального/автоматизированного способа определить, какая кнопка за что отвечает. Само мобильное приложение также пытается запомнить эти настройки, поэтому, как только вы активируете что-либо с помощью адаптера (или реального ИК-контроллера устройства), информация из приложения устаревает.

## Особенности сцен

Когда учетные данные облачного приложения вводятся и сохраняются, адаптер также считывает сцены из приложения и создает их в виде объектов в адаптере. Сцены можно запустить, установив состояние сцены в значение true.

Затем сигнал запуска отправляется в облако.

## Функции групп

Адаптер также считывает определенные группы и создает соответствующие состояния в адаптере. Значение группы также запрашивается из облака и обновляется в адаптере. При управлении группами это также делается через облако, поскольку в противном случае статус группы будет рассинхронизирован.

## Преобразованные/улучшенные точки данных

Данные по некоторым точкам данных закодированы, поэтому их необходимо расшифровать и повторно зашифровать, если они могут изменяться.

### Поля растрового изображения

Некоторые поля содержат битовые карты, то есть они представляют собой числа, и каждый бит в этом числе соответствует состоянию. Адаптер преобразует эти поля в подсостояния, такие как X-0 (для бита 0), X-1 (для бита 1) и так далее. Метка бита добавляется к имени состояния. В настоящее время битовые поля недоступны для записи.

### Состояния цвета RGB (идентификаторы 24/5/colour/colour\_data)

Данные о цвете RGB декодируются в объект 5-rgb/24-rgb в виде значения RGB в формате "#rrggbb". Текущий цвет декодируется в это состояние и может быть установлен путем задания этого состояния. Убедитесь, что используете правильный режим лампы (белый/цветной), поскольку цвет имеет значение только тогда, когда активен цветовой режим.

### Состояния измерения мощности (идентификаторы 5/6/7/фаза\_a/фаза\_b/фаза\_c)

Состояния измерения мощности декодируются в объекты X-current, X-power и X-voltage. Состояние X-power имеет значение только для некоторых устройств. Эти состояния недоступны для записи.

### Состояния тревоги устройства (IDs 17/alarm\_set\_2)

Состояния тревоги декодируются в объект 17-decoded, значением которого является JSON. JSON содержит массив со списком определенных типов тревоги и их пороговыми значениями. Вы можете изменять и устанавливать этот JSON для изменения настроек тревоги. Известны следующие типы тревоги (но, возможно, не все из них поддерживаются всеми устройствами):

- перегрузка по току
- трехфазный\_дисбаланс\_тока
- амперметр\_перенапряжение
- пониженное напряжение
- трехфазные\_потери\_тока
- сбой питания
- магнитный
- недостаточный\_баланс
- задолженность
- перенапряжение батареи
- cover\_open
- meter\_cover\_open
- вина

## Кредиты

Создание этого адаптера было бы невозможно без огромной работы @codetheweb, @kueblc и @NorthernMan54 ( <https://github.com/codetheweb/tuyapi> ), а также [https://github.com/clach04/python-tuya, https://github.com/uzlonewolf/tinytuya](https://github.com/clach04/python-tuya,https://github.com/uzlonewolf/tinytuya) и многих других.

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

Пожалуйста, используйте для этого раздел "Проблемы" на GitHub.

Лучше всего установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем, пожалуйста, получите лог-файл с диска (подкаталог "log" в каталоге установки ioBroker, а не из административной панели, поскольку административная панель обрезает строки). Если вы не хотите предоставлять его в рамках задачи на GitHub, вы также можете отправить его мне по электронной почте ( <iobroker@fischer-ka.de> ). Пожалуйста, добавьте ссылку на соответствующую задачу на GitHub И опишите, что я вижу в логе и в какое время.

При возникновении проблем с синхронизацией приложений Tuya в облаке можно создать дополнительные журналы событий с помощью следующего процесса:

- Остановите адаптер в административной панели.
- Откройте командную оболочку на хосте ioBroker.
- выполнять`DEBUG=@tuyapi/cloud* iobroker debug tuya`
- Получите лог из командной строки. Отправьте лог со ссылкой на созданную проблему на GitHub по адресу <iobroker@fischer-ka.de>

## Changelog
### 3.18.2 (2026-08-25)
* (@Apollon77) Removes the http-mitm-proxy patching because no longer needed

### 3.18.1 (2026-08-24)
* (@Apollon77) Fixed initial setting and value correction for special Temp values
* (@Apollon77) Updating Tuyapi to latest version to prevent parsing issues
* (@Apollon77) Adjust timestamps from MQTT
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

Copyright (c) 2018-2026 Apollon77 <iobroker@fischer-ka.de>

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