---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miele-local/README.md
title: ioBroker.miele-local
hash: SVst0I2yT29yy+nVo0oiHAVhQ0FmawLLWHSmdh40gnY=
---
![Логотип](../../../en/adapterref/iobroker.miele-local/admin/miele-local.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.miele-local.svg)
![Лицензия: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

# IoBroker.miele-local
*Прочитайте это на другом языке: [Немецкая документация](/#/docs/adapterref/iobroker.miele-local/README_de.md).*

Этот адаптер подключает современные бытовые приборы **Miele@Home** **локально, без подключения к интернету**.
Он использует локальный протокол Miele (`MieleH256` / DOP2) напрямую через локальную сеть - без облачной учетной записи во время работы, без обходного пути через API сторонних производителей Miele.

Однократный вход в систему с помощью вашей учетной записи Miele необходим только для получения локального ключа для всего домохозяйства (GroupID/GroupKey). После этого адаптер работает в автономном режиме, а приложение Miele продолжает работать без изменений.

**Что делает программа:** считывает текущее состояние каждого устройства в текстовом формате, записывает каждую завершенную программу с указанием потребления ресурсов и - если вы это разрешите - запускает, останавливает и приостанавливает их.

**Что ей нужно:** один логин и либо mDNS в вашей сети, либо IP-адреса устройств.

## Быстрый старт
1. Установите адаптер и создайте экземпляр.
2. На вкладке **Вход** выберите свою страну и выполните три шага, описанные ниже.
3. Вставьте полученный адрес `miele://…` и нажмите **Получить ключ группы**.
4. Сохраните. Адаптер находит ваши устройства и создает их состояния.

Если адаптер работает в контейнере Docker с мостовым сетевым подключением, обнаружение ничего не выявит - введите IP-адреса вручную на вкладке **Устройства**. См. [Сеть](#network-ports-docker-push).

### Пошаговый процесс входа в систему
Итоговый адрес использует схему `miele://` мобильного приложения. Настольные браузеры не могут его открыть, поэтому страница останавливается на вращающемся колесике, и вам приходится самостоятельно считывать адрес из браузера.

1. **Подготовьте инструменты разработчика.** Нажмите **Открыть страницу входа** - откроется новая вкладка. Нажмите там **F12**, переключитесь

Перейдите на вкладку **Сеть** и сохраните журнал:

- **Chrome / Edge / Brave:** поставьте галочку напротив **Сохранить журнал**.
- **Firefox:** значок шестеренки ⚙️ → **Сохранить журналы**.
2. **Войдите в систему.** Введите адрес электронной почты и пароль вашей учетной записи в приложении Miele. После этого страница зависнет.

Успех здесь определяется, например, работой прядильного колеса или сообщением о неудавшейся загрузке.

3. **Скопируйте адрес.** На вкладке «Сеть» прокрутите до последней (обычно выделенной красным) записи, начинающейся с

`redirect?redirect_uri=miele…` или `miele://oauth2-code/…`. Щелкните правой кнопкой мыши → **Скопировать URL**, вставьте его в поле **URL перенаправления miele://** и нажмите **Получить GroupKey**.

Затем GroupID и GroupKey сохраняются в конфигурации экземпляра, при этом ключ зашифрован. Эта процедура больше никогда не потребуется.

**Сбой входа с ошибкой `invalid_request … unknown contextId`?** Сервис авторизации Miele переключается между двумя доменами во время входа в систему и теряет сессию, если блокировщик рекламы или строгая защита сторонних файлов cookie создают помехи. Откройте страницу входа в приватном окне без расширений.

**Переход на другую систему.** Идентификатор группы (GroupID) и ключ группы (GroupKey) никогда не меняются. Резервная копия конфигурации ioBroker (например, BackItUp) переносит их; на новой системе повторный вход занимает две минуты. На странице администратора ключ отображается только в качестве заполнителя.

Что вы получите
Каждый бытовой прибор становится одним устройством, идентификатором которого служит его серийный номер. Ниже него:

### `state` - что делает устройство в данный момент
| Государство | Значение |
|---|---|
| `status` | рабочее состояние. Число содержит текст в виде списка значений, поэтому в обозревателе объектов и VIS отображается «Используется» вместо `5`. |
| `programId` / `programText` | программа тренировок |
| `programPhase` / `programPhaseText` | этап в рамках программы |
| `remainingMinutes`, `elapsedMinutes`, `startInMinutes` | время в минутах |
| `remainingSeconds`, `elapsedSeconds` | до секунды, если включено |
| `estimatedEndTime` / `estimatedEndTimeText` | прогнозируемое завершение (временная метка в мс / `HH:MM`) |
| `progress` | ход выполнения программы в % (прошло / (прошло + осталось)), 0, пока ничего не выполняется |
| `temperature`, `targetTemperature` (плюс зоны 2 и 3) | температуры |
| `signalDoor`, `signalInfo`, `signalFailure` | дверные и сигнальные флажки |
| `mobileStart` | принимает ли устройство в данный момент дистанционное управление |
| `light`, `spinningSpeed`, `dryingStepText` | для конкретного прибора |
| `light`, `spinningSpeed`, `dryingStepText` | специфичный для прибора |

Исходные числа и их аналоги `…Text` существуют рядом намеренно: сравнивается и строится график на основе исходного значения, отображается текст. Начиная с версии 0.3.37, само исходное значение содержит список в виде простого текста, поэтому в большинстве случаев текстовое состояние больше не требуется.

**Язык текстов.** Состояния `…Text` написаны на немецком языке или на английском, если опция «Названия состояний на немецком языке» отключена - это не изменилось, скрипты сравнивают их.
Карточки диспетчера устройств их не используют: начиная с версии 0.5.1, карточка отображает исходное значение вместе с таблицей значений на **языке системы** ioBroker (все одиннадцать языков администрирования). Статус, тип программы, этап и фаза сушки представлены полностью на каждом языке. Названия программ берутся из переводов сообщества Home Assistant; для польского языка программы для стиральной машины и сушилки берутся из польской инструкции по эксплуатации Miele (`lib/werte_eigen.js`, только названия, которые там встречаются слово в слово). Там, где ни один из источников не имеет названия (полностью украинское, польское для других приборов и для программ, отсутствующих в инструкции, русское и голландское частично), карточка отображает английское название - ничего не угадывается. Неизвестное исходное значение отображается в виде его номера.

**Текстовые состояния на другом языке (необязательно).** *Опрос и значения → Язык текстовых состояний* записывает `statusText`, `programText`, `programPhaseText`, `programTypeText` и `dryingStepText` - и списки значений исходных состояний - на любом из одиннадцати языков администрирования вместо немецкого или английского. Если для языка нет перевода, записывается текст на английском языке. Названия программ берутся из Home Assistant, а для польских стиральных и сушильных машин - из польских инструкций по эксплуатации Miele, как указано на карточках. По умолчанию все остается как есть.

При отключенной опции "Названия штатов на немецком языке" названия и описания штатов намеренно остаются в формате простого английского текста: многоязычное название вернуло бы немецкое название в немецкой административной панели, и эта опция стала бы бессмысленной.

### `control` - команды (только при включенном управлении устройством)
`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`: запишите `true` для отправки команды; адаптер подтверждает каждую команду, причина сбоя указана в комментарии к состоянию.

`canStart`, `canStop`, `canPause`, `canPowerOn`, `canPowerOff` (только для чтения) указывают, имеет ли команда смысл в текущем состоянии и поддерживается ли она устройством - на платах устройств отображаются кнопки, VIS может делать то же самое.

### `info` - что представляет собой прибор
`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`, `protocolVersion`, `operatingHours`, а также счетчики опроса `pollTotal`, `pollErrors`, `pollRetries`, `pollErrorRate`. `lastError` содержит причину сбоя последнего запроса.

### `eco` - энергия и вода
`eco.energy` (кВт·ч), `eco.energyWh` (Вт·ч), `eco.water` (л), если прибор предоставляет эти данные, плюс `eco.source`, указывающий источник, из которого получено значение. См. DOP2; пока что стиральные машины предоставляют эти данные. **Энергия не является измерением:** стиральная машина сообщает количество энергии, которое она *планирует* для основной стирки - запланированное время нагрева × номинальная мощность нагревателя при 230 В (WCR860: 2020 Вт).
Оно устанавливается один раз при начале нагрева и никогда не обновляется; оно не включает в себя ни двигатель, ни насосы и электронику, ни нагрев других фаз, а холодные или короткие программы показывают 0. Измеренное на WCR860, оно соответствует реальному нагреву обычных теплых программ с точностью до нескольких процентов, но не общему потреблению. Для получения реального значения введите состояние счетчика измерительного прибора на вкладке **Опрос и значения** - адаптер затем запишет, что фактически отобразилось в каждой программе.

Адаптер также запрашивает контекст устройства `2/1585` (и `2/391`) независимо от контекста стиральной машины `2/6195`. Его значения отображаются в `detail.ecoFeedback` (только если прибор их сохраняет): потребление энергии и воды последней программы (6.3/6.4), счетчики времени работы (6.5/6.6) и контейнеры TwinDos/AutoDos (6.7). Значения «последней программы» **не** заменяют `eco.*` - во время работы они по-прежнему отображают предыдущую программу. Приборы без `2/6195` (например, посудомоечная машина) получают данные о потреблении за программу из **разницы счетчиков времени работы** между началом и концом; тогда `eco.*` принимает это значение, а `eco.source` означает `Appliance (lifetime counters 2/1585)`.

### `history` и `stats` - что произошло
Каждая завершенная программа записывается с указанием продолжительности, программы, потребляемой энергии и воды. Сами приборы ничего не хранят, поэтому история начинается с момента включения функции и не может быть заполнена задним числом. `history.cyclesJson` содержит последние программы, `stats.week`, `stats.month`, `stats.year` и `stats.total` - соответствующие им суммы.

### `control` - только если вы это разрешите
`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`. Запись `true` запускает команду; состояние сбрасывается. Команды работают только при включенной функции **MobileStart / удаленного управления** на устройстве, а некоторые прошивки полностью отклоняют запись в DOP2.

Переключение `powerOn` и `powerOff` происходит аналогично приложению Miele (начиная с версии 0.4.3): они записывают состояние устройства в конечный узел DOP2 `2/1586` (4 = включено, 1 = выключено). Если устройство находится в спящем режиме и отвечает HTTP 500, оно пробуждается с помощью `{"DeviceAction":2}`, и запись повторяется, максимум дважды. Только после этого предпринимается попытка использовать более старый UserRequest `2/1583`. Кофемашины с протоколом версии 2 переключаются через DOP1. После этого состояние считывается снова; комментарий `c` состояния указывает, какой способ сработал и изменилось ли состояние. В случае сбоя, `c` поясняет HTTP-статус: **404** = коммуникационный модуль не предлагает управление DOP2 (например, XKM EK057), **403** = удаленное управление на устройстве отключено, **500** = устройство не принимает команду в текущем состоянии. При уровне логирования **debug** каждый шаг регистрируется с указанием ресурса, HTTP-статуса и ответа в шестнадцатеричном формате (без ключей).

## Настройки
| Вкладка | Что она содержит |
|---|---|
| **Вход** | страна, пошаговый вход, введенный адрес |
| **Устройства** | Обнаружение mDNS, сканирование резервных IP-адресов, ручное определение IP-адресов |
| **Опросы и значения** | интервалы опроса, названия немецких земель, время с точностью до секунды, EcoFeedback, счетчик энергии, внутреннее устройство устройства |
| **Пункты Push и порты** | дополнительный канал реального времени и его входящий порт, дополнительный сервер времени |
| **Управление** | переключатель, создающий состояния, допускающие запись |
| **История** | запись завершенных программ, кольцевой буфер, сохранение, адаптер истории |
| **Диагностика** | все функции для поиска неисправностей и картирования поля - по умолчанию отключены |
| **Продвинутый уровень** | Идентификатор группы и ключ группы вручную |

В административной панели под каждым полем находится пояснение; на этой странице они не повторяются.

## Сеть: порты, Docker, push
| Направление | Порт | Назначение | Требуется |
|---|---|---|---|
| входящий | TCP *порт push* (по умолчанию 18082) | устройства отправляют обновления в ioBroker | только с push-уведомлениями |
| входящий/исходящий | UDP 5353 (mDNS) | обнаружение и регистрация push-уведомлений | для обнаружения |
| исходящий | TCP 80 → устройства | чтение состояний, отправка команд | да |
| исходящий | TCP 443 → miele-iot.com | получить GroupKey | только для входа |
| входящий | TCP *порт сервера времени* (по умолчанию 8780) | устройства получают время своих часов | только через сервер времени |

Без push-уведомлений **входящий порт** не требуется. Для mDNS ioBroker и устройства должны находиться в одном широковещательном сегменте. Раздельные беспроводные сети или VLAN для IoT, брандмауэры (включая брандмауэр Windows на тестовой машине) и маршрутизаторы, фильтрующие многоадресную рассылку, также препятствуют обнаружению. Во всех этих случаях ручное составление списка IP-адресов является надежным способом.

**Docker.** В контейнере с мостовой сетью многоадресная рассылка не перенаправляется, поэтому обнаружение ничего не находит - введите IP-адреса вручную, опрос после этого работает нормально. Push-уведомления там вообще не работают, потому что устройства не могут связаться с контейнером: адрес обратного вызова находится за NAT.
Для надежной отправки требуется `network_mode: host`.

**Как работает push-уведомления.** Адаптер регистрируется для каждого устройства как одноранговый узел домохозяйства (`PUT /Devices/<series>/SuperVision/<own-fab>`) и подписывается на уведомления с помощью URL-адреса обратного вызова. Затем устройство отправляет изменения без запроса в течение секунды. Не каждый модуль может это сделать: более старые модули XKM EK037 и EK057 принимают подписку и ничего не отправляют. Опрос остается надежным способом передачи данных.

## Сервер времени для устройств (опционально)
В бытовой технике Miele время устанавливается с помощью **собственного HTTP-запроса, а не NTP**. Модуль связи определяет `ntp.mcs2.miele.com` и запрашивает данные каждые 30 секунд, пока не получит ответ:

```
GET http://ntp.mcs2.miele.com/V2/NTP/ HTTP/1.1
Host: ntp.mcs2.miele.com
Accept: application/vnd.miele.v1+json
```

Miele отвечает `{"time":<Unix seconds>}`. Устройство **без доступа в интернет** (сеть IoT без выхода) никогда не получает этот ответ: его часы сбиваются, и после изменения времени они могут оставаться на летнем времени. Опция DHCP NTP или NTP-сервер в вашей сети не помогут - устройство не использует NTP.

Адаптер может дать тот же ответ из вашей сети. Включите **Push & ports → Answer the devices' time request** (по умолчанию выключено) и выберите порт (по умолчанию 8780). **Само по себе это ничего не меняет**: пункт назначения фиксирован в модуле, поэтому вам необходимо перенаправить устройства - одно из следующих:

1. **Маршрутизатор: NAT назначения / переадресация портов.** Источник = устройства Miele, назначение

`ntp.mcs2.miele.com` (в настоящее время `52.136.223.17`; проверьте `nslookup`) TCP 80, транслируется в IP-адрес ioBroker и порт, указанный здесь. На UniFi: *Настройки → Маршрутизация → NAT → NAT назначения*.
Сервис может оставаться на высоком порту; маршрутизатор выполняет трансляцию 80 → порта.

**Если ioBroker находится в той же подсети, что и устройства**, добавьте NAT источника (маскировку, например, на собственный адрес маршрутизатора) и для этого потока - в противном случае ioBroker отвечает устройству напрямую, ответ поступает не с того адреса, который запросило устройство, и он отбрасывается.
Также разрешите этот поток в брандмауэре маршрутизатора, если он фильтрует трафик внутри этой сети или зоны.

2. **Перезапись DNS** (AdGuard Home, Pi-hole, dnsmasq): `ntp.mcs2.miele.com` → IP-адрес ioBroker.

Затем устройство подключается к **порту 80** этого IP-адреса, поэтому сервис должен быть доступен по этому адресу: в Docker сопоставьте порт 80 хоста с настроенным портом (`-p 80:8780`); без Docker либо установите порт 80 (требуются права root или `CAP_NET_BIND_SERVICE`), либо перенаправьте порт 80 через брандмауэр хоста. Порт 80 не должен быть занят другим веб-сервером на этом хосте.

**Docker:** при использовании мостового сетевого взаимодействия порт должен быть включен в сопоставление портов контейнера - добавление порта означает пересоздание контейнера. Если один из сопоставленных портов не используется, используйте его.

**Брандмауэр:** брандмауэр на хосте (например, Synology DSM) должен разрешать TCP-трафик к этому порту с устройств.

**Проверка:** `info.timeServer.running` соответствует `true`; `info.timeServer.requests`, `lastRequest`, `lastClient` и `info.timeServer.clients.<ip>.*` учитывают каждый отвеченный запрос. В зависимости от настроек Docker и NAT источника отправитель может отображаться как шлюз Docker (например, `172.17.0.1`) или маршрутизатор вместо устройства. Если ничего не приходит, проблема в перенаправлении или брандмауэре, а не в адаптере.

**Ограничения:** сервис предоставляет **только UTC**. Часовой пояс и летнее время устанавливаются самим устройством (на устройстве или в приложении Miele). Все запросы, кроме `GET /V2/NTP/`, получают ошибку 404. Запросы регистрируются только на уровне отладки.

### Поддержание местного времени на часах прибора (необязательно)
Некоторые устройства правильно определяют UTC, но применяют летнее время по собственному расписанию - духовка H2469BP продолжала работать по летнему времени даже после изменения расписания 25.10.2026. **Push & ports → Keep the appliance clock on local time** (по умолчанию отключено) проверяет каждое устройство при запуске и каждый час через `Settings/TimeSync` и, если его часы отличаются от местного времени ioBroker (часовой пояс хоста/контейнера ioBroker) более чем на 2 минуты, устанавливает их с помощью подписанного запроса, содержащего только `DateTime` (`NTPEnabled`, `UTCOffset` и `TimeMaster` остаются без изменений). Каждое исправление регистрируется на уровне информации; `<appliance>.info.timeSync.lastDeviation` (секунды, положительное значение = устройство опережает время) и `lastSet` показывают результат. Устройства, которые не сообщают `TimeSync` (например, G5840, WCR860, ответ 503), остаются без изменений. Работает без указанного выше сервера времени и без параметра "Разрешить управление".

## Конфиденциальность
Адаптер не хранит **никаких персональных данных**. GroupID, GroupKey и токен обновления хранятся только в зашифрованной конфигурации экземпляра или в объектах ioBroker. Никакие данные не передаются третьим лицам; в обычном режиме работы облачное соединение отсутствует.

Одно важное исключение: при сборе диагностических данных записываются **время начала и окончания каждой программы**. Эти данные сохраняются в вашем экземпляре системы, но если вы передаете собранные данные или их CSV-экспорт кому-либо, вы передаете эти значения вместе с ними.

## Совместимость и ограничения
- Протестировано в стиральной машине (WCR860/EK037), посудомоечной машине (G5840/EK037) и духовке.

(H2469BP/EK057).

- Холодильные приборы обычно имеют локальный доступ только для чтения; микропрограмма отклоняет запись.
- Для работы функции управления требуется MobileStart на устройстве; некоторые версии прошивки отвечают на запросы DOP2 кодами 404 или 500.
- Функция EcoFeedback доступна не везде. Протестированная здесь посудомоечная машина не потребляет ни энергии, ни воды.

Счетчик перемещается по любому читаемому листу - для этого устройства значения должны поступать из облака.

- Функция Push - это добавление, выполняемое по мере возможности, с опросом значения по умолчанию.

## Диагностика
Все функции в этом разделе **по умолчанию отключены** и не требуются для повседневной работы. Он существует только для одного вопроса: какое из полей *вашего* прибора содержит данные об энергии и воде. Номера полей различаются в зависимости от серии, а значения по умолчанию в адаптере взяты из модели WCR860.

**Необработанные поля.** Записывает все поля эко-листа в `eco.fieldsJson` вместо только двух оцененных.

**Сбор данных.** Записывается один набор данных для каждой завершенной программы - модель, программа, все исходные поля и, в конце, конечное состояние каждого ответчика. Для преобразования этого в сопоставление адаптеру требуется эталонное значение: либо из облачного адаптера, либо введенное вручную в `collection.inputEnergy` и `collection.inputWater` после завершения программы. `collection.progress` указывает, чего еще не хватает, `collection.finding` содержит результат: какое поле подходит, с каким делителем и насколько близко.

**Сканирование листовых адресов.** Адреса DOP2 записываются как `unit/attribute`, и лишь небольшое количество этих адресов где-либо задокументировано. Сканирование работает в адресном пространстве достаточно бережно, чтобы не перегружать модуль; `collection.scanJson` собирает полученные данные, включая серийный номер, MAC-адрес, IP-адрес и имя Wi-Fi. **Для совместного использования используйте `collection.scanJsonAnonym` **: те же данные, но замаскированные. Адреса, ответ на которые адаптер еще не может декодировать, сохраняются как полученные вместе с текстом ошибки и необработанными байтами, поэтому сканирование всегда завершается. `collection.trendLeaf` записывает один листовой адрес в режиме реального времени во время выполнения программы - поле, значение которого увеличивается по мере потребления, является тем, которое вам нужно.

**Экспорт в CSV.** Кнопка на вкладке «Диагностика» записывает две таблицы в файловую область экземпляра и открывает первую:

- `collection-<date>.csv` - одна строка на каждую программу: время, программа, эталонные значения, каждый исходный файл.

Поля отображаются в отдельном столбце, а для каждого поля в конце указывается значение в начале, в конце и разница между ними. Для счетчиков за все время существования счетчика имеет значение только эта разница.

- `finding-<date>.csv` - по одной строке на каждое поле: насколько хорошо оно соответствует эталону, наилучший делитель,

Среднее значение и наибольшее отклонение. Именно для этого и существует эта коллекция.

Разделители: точка с запятой, десятичная запятая, спецификация материалов - двойной щелчок открывает их в электронной таблице.

**Исследование неизвестного устройства.** [docs/geraet-erkunden.md](/#/docs/adapterref/iobroker.miele-local/docs/geraet-erkunden.md) (на немецком языке) описывает всю процедуру по порядку: когда сканировать, как отличить отказ от сигнала занятости, как считывать последовательность чисел после ее получения и что требуется для нового поля, прежде чем оно станет состоянием. В нем также зафиксировано, что *не* сработало, чтобы никто не смог это повторить.

## Правовая информация / отказ от ответственности
Это **неофициальный, частный** проект, **не связанный с [Miele & Cie. KG](https://www.miele.com/)**, и не одобренный и не проверенный ими. «Miele», «Miele@home» и связанные с ними названия являются товарными знаками [Miele & Cie. KG](https://www.miele.com/) и используются здесь только в описательных целях для обозначения совместимости. Информацию о самих приборах можно получить у производителя по адресу <https://www.miele.com/>.

Адаптер использует локальный протокол, который был публично задокументирован путем **обратного проектирования**. Использование осуществляется **на ваш собственный риск**; в зависимости от устройства/прошивки это может повлиять на гарантийные претензии. Программное обеспечение предоставляется под лицензией MIT **без каких-либо гарантий** (см. LICENSE). Автор не несет ответственности за повреждение устройств, данных или любые другие последствия использования.

## Благодарности
Особая благодарность **[мейстермоппер](https://github.com/meistermopper)**, опытному разработчику адаптеров ioBroker, который самостоятельно проверил этот адаптер и внес существенные улучшения: периодическое фоновое обнаружение устройств, выходящих из спящего режима, состояние подключения для каждого устройства, исправленные роли и единицы измерения состояний, явные значения по умолчанию для всех состояний и документация на немецком языке. Его работа вошла в релиз 0.3.0.

Локальный протокол (`MieleH256`, DOP2, provisioning) основан на результатах публичной работы по обратному проектированию проектов `MieleRESTServer` (akappner), `home-assistant-miele-mobile` и `ha-miele-at-lan`.

## Благодарности
Таблицы программ и этапов в `lib/enums.js` и сопоставление типов устройств с таблицами взяты из [Домашний помощник](https://github.com/home-assistant/core) (лицензия Apache 2.0, © авторы Home Assistant), переняты из [ха-миле-ат-лан](https://github.com/tiehfood/ha-miele-at-lan) (MIT, © tiehfood) и перепроверены по [ioBroker.miele-unbound](https://github.com/meistermopper/ioBroker.miele-unbound) (MIT, © meistermopper). Благодарим все три проекта.

Переводы названий статуса, фазы и программы в `lib/werte_ha.js` (отображаемые на карточках диспетчера устройств) представляют собой переводы, выполненные сообществом для интеграции Home Assistant с Miele (лицензия Apache 2.0, © авторы Home Assistant), извлеченные с помощью `tools/werte-uebersetzungen.js`; пробелы и некоторые исправления приведены в `lib/werte_eigen.js`.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-19)
- (SmarthomeElektroniker) DOP2 parser reads type 33 (list of structures, AStruct). Until now a leaf containing it (e.g. `2/1585`, `2/17`, `2/131`) failed completely with "Unknown DOP2 field type 33".
- (SmarthomeElektroniker) The device context `2/1585` (and `2/391` as fallback) is queried independently of the washing-machine leaf `2/6195`. Values of the appliance's own EcoFeedback (fields 6.3–6.6, 6.29, 6.31) honour the unit type (121/46 = Wh, 45 = kWh, 44 = l) and are only created if the appliance keeps them; TwinDos/AutoDos containers (6.7) appear as JSON. Appliances without `2/6195` (dishwasher) get energy and water per programme from the difference of the lifetime counters 6.5/6.6. The "last programme" values no longer replace `eco.*` while a programme runs.
- (SmarthomeElektroniker) Leaf scan: answers that cannot be decoded count as answered (status 200, error text and raw bytes kept separately), so the scan always completes. New `collection.scanJsonAnonym` without serial number, module number, MAC, IP and Wi-Fi name, for sharing.
- (SmarthomeElektroniker) Leaf scan is now slow and gentle: each appliance has its own independent pace, at most one request every 25 s per appliance and never two at once to the same appliance - a hanging appliance no longer holds up the others; the scan gives way while the regular polling of that appliance is running (during a programme at most one per minute per appliance, where a 500 never counts), back-off of 5 → 30 min after connection errors. Rejections (404/500) only become final after two answers at least 6 h apart while the module is proven awake; 500s from old scans are asked again. `14/1565` is masked in `scanJsonAnonym`.
- (SmarthomeElektroniker) `/State.ExtendedState` is logged (debug) and kept as raw hex in `collection.extendedState`, for diagnostics only.
- (SmarthomeElektroniker) Names according to the measurements of 13.11.2026 (object IDs unchanged): `eco.energy`/`eco.energyWh` "Heating energy (setpoint at 230 V)", `detail.process.heatingEnergy`/`heatingTime` "(setpoint)", field 16 `energyConsumed` "Drive energy" in Wh (final value kept after the programme), field 4 "Elapsed time".
- (SmarthomeElektroniker) Debug log: one line per appliance for 2/6195, 2/1585, 2/391 and ExtendedState, without the full serial number.
- (SmarthomeElektroniker) Debug log: no more "final phase" / "final reading attempt" lines for appliances that have rejected the eco leaf and both context leaves - nothing was queried there anyway.
- (KPIotr89) New option **Language of the text states** (Polling & values): `statusText`, `programText`, `programPhaseText`, `programTypeText`, `dryingStepText` and the value lists of the raw states in any of the eleven admin languages. Default unchanged (German or English, following "State names in German"); missing translations fall back to English. Polish programme names for washing machines and tumble dryers, word for word from Miele's Polish operating instructions, also on the device manager cards. Thanks to @KPIotr89 for the contribution (PR #23)

### 0.5.2 (2026-11-12)
- (SmarthomeElektroniker) Fix: a card could show "not connected" and still offer the On button (or the light). After a stop or restart of the adapter the `control.can*` states kept their last value, and appliances not found at start kept them as well. Now the adapter clears them on stop and for every appliance not found at start; an appliance that is not reachable or reports status 255 ("not connected") gets no button at all
- (SmarthomeElektroniker) The light button now also follows two read-only states, `control.canLightOn` and `control.canLightOff` (exactly one is true while the appliance is reachable). The card looks as before
- (SmarthomeElektroniker) German texts: `fan_plus` is now „Heißluft plus“ (was „Umluft“, also in the combined modes with moisture plus and microwave), `eco_fan_heat` „Eco-Heißluft“, programme `automatic` „Automatik“ (was „Automatic“), drying steps 4–7 corrected (they had wrong names) to „Handbügelfeucht 1/2“, „Maschinenbügelfeucht“, „Glätten“. **Visible change:** the German `state.programText` and `state.dryingStepText` change accordingly - scripts that compare against the old German text must be adjusted
- (SmarthomeElektroniker) French: the Off button reads „Éteindre“ (was „Arrêt“) and On „Allumer“, so Off and Stop („Arrêter“) are clearly distinguishable

### 0.5.1 (2026-11-12)
- (SmarthomeElektroniker) Device manager cards show status, programme, phase, programme type and drying step in the system language of ioBroker, in all eleven admin languages. Until now the card showed the `…Text` states, which the adapter writes only in German or English. The card now uses the raw values (`state.status`, `programId`, `programPhase`, `programType`, `dryingStep`) with a value table in the system language; the `…Text` states are unchanged, scripts that compare against them keep working
- (SmarthomeElektroniker) Translations: the community translations of the Home Assistant Miele integration, own translations where a language is missing there (Ukrainian, Polish, large parts of Russian and Dutch, status 144/145) and a few corrections. Programme names only from Home Assistant, otherwise English - nothing guessed
- (SmarthomeElektroniker) Descriptions of `control.can*` and `state.progress` in all eleven languages

### 0.5.0 (2026-11-12)
- (SmarthomeElektroniker) Device manager support (`@iobroker/dm-utils`, issue #22, suggested by mcm1957): one card per appliance for the running operation. The header shows name and model, the serial number appears once below it. Status, programme, phase, start time, remaining time and estimated end (large), plus a progress bar; empty values are hidden instead of showing as blank lines. Fault, door open, notices on the appliance display and a locked remote start (MobileStart) are shown as coloured lines while they are active. Expanding the card shows further values (temperatures, elapsed time, spin speed, light, MobileStart, EcoFeedback, operating hours). Deliberately no configuration actions on the cards
- (SmarthomeElektroniker) With device control enabled the card shows only the commands that make sense right now and that the appliance supports: off → On; ready/programmed → Start, Off; running → Pause, Stop; paused → Start, Stop; end/fault → Off. Start only with MobileStart, Pause only on washing machines and dryers, no switching of fridges and hobs. The buttons follow the state live; every command except the light asks for confirmation and writes the existing `control.*` states
- (SmarthomeElektroniker) The light is a single toggle button: symbol, label and tooltip show the current state, a click switches to the opposite, without confirmation. The percentage sits right next to the progress bar
- (SmarthomeElektroniker) Fix: manual inputs, the scan switch and the fine recording of the data collection (`collection.*`) had no effect since the channel was renamed from `sammlung` in 0.3.38
- (SmarthomeElektroniker) New states `control.canPowerOn`, `canPowerOff`, `canStart`, `canPause`, `canStop` (read only, also usable in VIS) and `state.progress` (programme progress in %)

### 0.4.3 (2026-11-10)
- (SmarthomeElektroniker) `control.powerOn`/`powerOff` now switch like the Miele app: DOP2 leaf `2/1586` (appliance state 4 = on, 1 = off), on HTTP 500 wake-up with `{"DeviceAction":2}` and retry (at most two rounds), the previous UserRequest `2/1583` only as fallback; coffee machines with protocol version 2 via Dop1 object 1101. The effect is checked by reading the status again, failures are explained by HTTP status (403/404/500), RemoteEnable is only logged, every step is in the debug log

### 0.4.2
- (SmarthomeElektroniker) Maintenance: trimmed the version news in `io-package.json` (repository checker W1032/W2004), no functional change

### 0.4.1
- (SmarthomeElektroniker) New option **Keep the appliance clock on local time** (Push & ports, off by default): checks `Settings/TimeSync` at start and every hour and sets the appliance clock to the local time of ioBroker if it differs by more than 2 minutes. Only the `DateTime` field is written. States `info.timeSync.lastSet` and `info.timeSync.lastDeviation` per appliance

### 0.4.0
- (SmarthomeElektroniker) New optional **Miele time server** (Push & ports, off by default): answers the appliances' HTTP time request `GET http://ntp.mcs2.miele.com/V2/NTP/` with `{"time":<Unix seconds>}`, so appliances without internet keep the right time. The appliances must be redirected to it (destination NAT on the router or a DNS rewrite) - see "Time server for the appliances". Answered requests are counted under `info.timeServer.*`, per sender under `info.timeServer.clients.*`
- (SmarthomeElektroniker) Leaf table: `DateTimeInfo` is attribute 122 in unit 14 (`14/122`), not `2/122`

### 0.3.47
- (SmarthomeElektroniker) A command under `control.*` that cannot be executed (control disabled, appliance not connected, HTTP error, connection error) is now acknowledged (`val=false`, `ack=true`) with the reason in the state comment `c` and a matching quality `q`. Until now it stayed unacknowledged - one `control.powerOn` stood there for 52 days
- (SmarthomeElektroniker) Unacknowledged commands left over from before a restart are closed on start and are **not** sent to the appliance
- (SmarthomeElektroniker) `remainingMinutes`/`remainingHHMM` are 0 while the appliance is off, finished or not connected (status 1/7/255), and no end time is calculated. A G5840 reported a remaining time of 0:01 while switched off
- (SmarthomeElektroniker) A lost connection to an appliance and its return are logged once at info level (until now only at debug)
- (SmarthomeElektroniker) The IP fallback search ("Search the subnet for the new IP if a device drops out") also runs in the background when mDNS discovery is off - exactly the Docker bridge setup it is meant for. It only probes appliances that currently fail, and searches every /24 network that has a missing appliance, not only the network of the first configured IP

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction. See the [LICENSE](https://github.com/SmarthomeElektroniker/ioBroker.miele-local/blob/main/LICENSE) file for the full text.