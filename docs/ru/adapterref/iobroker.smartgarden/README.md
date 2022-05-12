---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: Wa01f7YH+BEzeP60HT6+danUNiUEIpgu+XOB+JpT350=
---
![Логотип](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Установлены](http://iobroker.live/badges/smartgarden-installed.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Статус сборки](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![Стабильный](http://iobroker.live/badges/smartgarden-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## Адаптер ioBroker smartgarden для смарт-системы GARDENA
Адаптер для смарт-системы GARDENA с использованием официального [API смарт-системы GARDENA](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) и сервисного обслуживания.

Адаптер позволяет разработать приложение (например, с VIS), которое можно использовать параллельно с официальным приложением GARDENA. Адаптер и его дополнительные функции не влияют ни на одну из основных функций приложения GARDENA и наоборот.

Адаптер не является полной заменой приложения GARDENA, а является дополнением для интеграции устройств GARDENA в умный дом с помощью ioBroker.
Наиболее важные действия можно выполнять с адаптером. Это также дает возможность реализовать собственные идеи, которые невозможно реализовать в приложении GARDENA.

## Поддерживаемые устройства
  - Газонокосилки-роботы GARDENA smart SILENO
  - Интеллектуальное управление поливом GARDENA
  - Умный нагнетательный насос GARDENA
  - Интеллектуальное управление поливом GARDENA
  - Интеллектуальный адаптер питания GARDENA
  - Интеллектуальный датчик GARDENA

Дополнительную информацию об устройствах см. в [GARDENA немецкий веб-сайт](https://www.gardena.com/de/produkte/smart/smartsystem/) и [здесь на английском](https://www.gardena.com/uk/products/smart/smart-system/).

## Требования
Для использования этого адаптера вам нужны две вещи:

1. учетная запись смарт-системы GARDENA
1. ключ приложения GARDENA

Чтобы получить обе вещи, перейдите в [https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/](https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/).

![получение_ключа_приложения](../../../en/adapterref/iobroker.smartgarden/getting_application_key.jpg)

**Примечание:**

  - Если у вас уже есть газонокосилка Husqvarna Automower® Connect или

GARDENA smart system, вы можете войти в систему с этой учетной записью и перейти к шагу 2, Создать приложение, чтобы получить ключ приложения.

	---

***И почти наверняка у вас есть учетная запись.*** *Используйте ту же учетную запись, что и для приложения GARDENA, в которой зарегистрированы ваши устройства GARDENA. В противном случае вы не получите доступ к своим устройствам.*

	---

  - Убедитесь, что вы подключили приложение (из шага 2) к API
    - API аутентификации ***и***
- API смарт-системы GARDENA.

И, конечно же, вам нужна работающая установка ioBroker, и у вас должен быть хотя бы один работающий [Умное устройство GARDENA](#supported-devices).

## Оглавление
  * [Адаптер ioBroker smartgarden для смарт-системы GARDENA](#iobroker-smartgarden-adapter-for-gardena-smart-system)
  * [Поддерживаемые устройства](#supported-devices)
  * [Требования](#требования)
  * [Оглавление](#оглавление)
  * [Установка](#установка)
  * [Установочный адаптер](#setup-adapter)
  * [Получение поддержки](#getting-support)
  * [Точки данных адаптера](#data-points-of-the-adapter)
     * [Общие сведения о точках данных](#general-things-to-know-about-data-points)
     * [Для SERVICE_MOWER](#for-service_mower)
     * [Для SERVICE_VALVE_SET](#for-service_valve_set)
     * [Для SERVICE_VALVE](#for-service_valve)
     * [Для SERVICE_POWER_SOCKET](#for-service_power_socket)
     * [Для SERVICE_SENSOR](#for-service_sensor)
     * [Для SERVICE_COMMON](#for-service_common)
  * [Ограничения скорости](#rate-limits)
  * [Полив запрещен во время скашивания](#Полив не разрешен во время скашивания)
     * [В чем проблема?](#в чем проблема)
* [Что делается?] (#что делается)
* [Основное поведение -- ПРЕДУПРЕЖДЕНИЕ](#basic-behaviour----предупреждение)
  * [Пожелания по точкам данных](#Пожелания по точкам данных)
  * [Примечание](#примечание)
  * [Журнал изменений](#журнал изменений)
     * [1.0.6](#106)
     * [1.0.5](#105)
     * [1.0.4](#104)
     * [предыдущие версии] (#103)
  * [Кредиты](#кредиты)
  * [Лицензия](#лицензия)

## Установка
Доступен адаптер

- в npm: установить с помощью `npm install iobroker.smartgarden`
- на GitHub по адресу https://github.com/jpgorganizer/ioBroker.smartgarden.

Описание установки с GitHub доступно [здесь](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren) (на немецком языке).

## Настройка адаптера
1. Установите адаптер
2. Создайте экземпляр адаптера
3. Проверьте и завершите настройку экземпляра

   **Если вы измените какое-либо значение этих настроек, перезапустите адаптер.**

3.1 Изменить имя пользователя, пароль и ключ приложения в конфигурации основного экземпляра

      | Параметр | Описание |
      | - | - |
      | имя пользователя | имя пользователя для смарт-системы GARDENA |
      | пароль | соответствующий пароль |
      | API-ключ | Ключ API (ключ приложения), например. под [Требования](#requirements) |

Обратите внимание, что пароль и ключ приложения закодированы и хранятся в адаптере и просто декодируются для аутентификации с помощью хоста приложения GARDENA.

3.2 Проверьте значения по умолчанию различных настроек и включите/выключите параметры в конфигурации экземпляра. Для большинства пользователей подойдут значения по умолчанию.

      | Параметр | Описание |
      | - | - |
      | предварительно определить состояния | предварительно определить все состояния Gardena API, независимо от того, передаются ли они в данный момент; включить или выключить; если включено, то создаются все состояния API смарт-системы GARDENA независимо от того, передаются они в данный момент сервисом GARDENA или нет; по умолчанию: выключено; *(новое в v0.4.0)*|
      | прогноз | использовать прогноз времени зарядки и оставшегося времени газонокосилки; включение/выключение прогнозируемой зарядки и времени скашивания косилки; по умолчанию: выключено; *(новое в v0.5.0)*|
      | циклы | количество циклов истории MOWER; вы можете использовать любое число от 3 (минимум), но 10 (по умолчанию) кажется хорошим значением; актуально только в том случае, если указанный выше *'прогноз'* включен; *(новое в v0.5.0)*|
      | проверка полива| используйте проверку, разрешен ли полив при скашивании; включить/выключить; по умолчанию: выключено; *(новое в v0.6.0)*|

3.3 Проверьте значения системных настроек по умолчанию и включите/выключите параметры в конфигурации экземпляра. **Большинству пользователей не нужно ничего менять на этой вкладке.**

      | Параметр | Описание |
      | - | - |
      | Логуровень | Уровень логирования: 0 = нет журнала, 1 = несколько журналов, 2 = еще несколько журналов, 3 = все журналы; по умолчанию: 0|
      | украсить журнал | укорачивать идентификаторы состояний в журнале; включить/выключить; по умолчанию: включено; *(новое в v1.0.5)*|
| ограничения скорости мониторинга | использовать мониторинг ограничений скорости API смарт-системы Gardena; включить/выключить; по умолчанию: выключено; *(новое в v1.0.2)*|
      | интервал повтора соединения | интервал повторных попыток подключения к веб-сервису Gardena в случае ошибки (в секундах); по умолчанию: 300, минимум: 60; *(новое в v1.0.3)*|
      | частота пинга | Частота отправки запросов Ping на веб-сервис Gardena (в секундах); по умолчанию: 150, минимум: 1, максимум: 300|
      | фактор авторизации | Фактор действительности токена аутентификации; по умолчанию: 1.001 |
      | URL-адрес авторизации| URL хоста аутентификации; по умолчанию: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev)|
      | Базовый URL| Базовый URL-адрес веб-сервиса; по умолчанию: [https://api.smart.gardena.dev](https://api.smart.gardena.dev)|

## Получение поддержки
Чтобы получить помощь, внимательно прочитайте этот [README](README.md) и [FAQ](FAQ.md).
Если вам нужна дополнительная поддержка, присоединяйтесь к [Ветка форума ioBroker](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system).

## Точки данных адаптера
Адаптер предназначен для мониторинга и управления устройствами смарт-системы GARDENA.
Для этого будет один `LOCATION` и один или несколько `DEVICE`.
Для каждого `DEVICE` будет

  - один `SERVICE_COMMON_<id>` и
  - один или несколько `SERVICE_<servicelink_type>_<id>`.

Где `<servicelink_type>` — это описание типа устройства, например MOWER или VALVE, а `<id>` — это (закодированный) идентификатор устройства GARDENA, используемый API.
См. описание ServiceLink в [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Управление/мониторинг каждого устройства возможно с помощью `SERVICE_<servicelink_type>`, перечисленных в следующей таблице. `SERVICE_COMMON` содержит общую информацию об устройстве.

  | устройство | SERVICE_<servicelink_type> |
  | - | - |
  | умная газонокосилка-робот SILENO | SERVICE_MOWER и SERVICE_COMMON |
  | интеллектуальное управление поливом | SERVICE_VALVE_SET, SERVICE_VALVE и SERVICE_COMMON |
  | умный насос давления | SERVICE_VALVE и SERVICE_COMMON |
  | умный контроль воды | SERVICE_VALVE и SERVICE_COMMON |
  | смарт-адаптер питания | SERVICE_POWER_SOCKET и SERVICE_COMMON |
  | умный датчик | SERVICE_SENSOR и SERVICE_COMMON |

Если вам нужна дополнительная информация о точках данных, см. [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).
Там вы найдете описание каждой точки данных; за исключением тех, которые помечены как точки данных адаптера, а не API интеллектуальной системы GARDENA.

Адаптер создает собственные точки данных для различных функций/параметров при выборе функции. Эти точки данных не удаляются автоматически при отмене выбора функции. Если вам больше не нужны эти точки данных, их можно удалить вручную.

### Общие сведения о точках данных
Адаптер не изменяет никаких значений, передаваемых API интеллектуальной системы GARDENA.
Единственное, что делается (начиная с версии 1.0.0), это проверка типа *timestamps* и *numbers*.

| проверить | описание |
| - | - |
| временные метки | все временные метки указаны в формате UTC; если полученная метка времени не является действительной меткой времени, вместо нее используется `01 Jan 1970 00:00:00Z` (нулевое время Unix). Поэтому, если вы видите эту дату/время, сообщите об этом. |
| номера | если число не является допустимым числом, вместо него используется `-1`. Так что, если вы видите этот номер, пожалуйста, сообщите. |

Запросы на управление устройством будут выполнены, как только команда будет принята интеллектуальным шлюзом. Успешное выполнение команды на самом устройстве можно наблюдать по соответствующему изменению состояния.
*Пример:* отправка команды для запуска службы VALVE интеллектуального управления водой приведет к изменению точки данных `activity_value` службы после того, как устройство обработает команду.

**Примечания:**

  - Запросы на управление устройством не могут быть отправлены, пока адаптер smartgarden не

    подключен к API смарт-системы GARDENA.

  - Убедитесь, что вы установили значение для команды с `ack=false`. См. [Глава Команды и статусы в Руководстве для разработчиков адаптеров] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)

### Для SERVICE_MOWER
#### Управление
Для управления устройством используйте точку данных

- `Activity_control_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы запустить газонокосилку.

  - Чтобы начать в течение определенного времени, установите значение запланированной продолжительности в

  секунд (пожалуйста, используйте число, кратное 60)

  - для автоматической работы установить строку `START_DONT_OVERRIDE`
  - отменить текущую операцию и вернуться к использованию зарядной станции

  строка `PARK_UNTIL_NEXT_TASK`

  - чтобы отменить текущую операцию, вернуться на зарядную станцию и игнорировать

  строка использования расписания `PARK_UNTIL_FURTHER_NOTICE`

  **Примечание.** Газонокосилка запускается только при полностью заряженном аккумуляторе.

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальные точки данных:

- `activity_mowing_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Эта точка данных показывает два разных состояния газонокосилки:

  - `true`: кошение или
  - `false`: не кошение.

Эту точку данных можно использовать для дальнейших действий, когда важно знать, безопасно ли косилка находится на газоне или нет.

В зависимости от значения точки данных `activity_value` устанавливается эта точка данных.
Подробности см. в следующей таблице.

  | `activity_value` | `activity_mowing_i` |
  |`OK_CHARGING` Газонокосилка должна косить, но недостаточный уровень заряда удерживает ее на зарядной станции. | ложный |
  |`PARKED_TIMER` Газонокосилка припаркована в соответствии с таймером и снова запустится в заданное время. | ложный |
  |`PARKED_PARK_SELECTED` Газонокосилка припаркована до дальнейшего уведомления. | ложный |
  |`PARKED_AUTOTIMER` Косилка пропускает скашивание из-за недостаточной высоты травы. | ложный |
  |`PAUSED` Косилка находится в состоянии ожидания с закрытым люком. | ложный |
  |`OK_CUTTING` Косилка работает в автоматическом режиме (по расписанию). | правда |
  |`OK_CUTTING_TIMER_OVERRIDDEN` Косилка косит вне графика. | правда |
  |`OK_SEARCHING` Газонокосилка ищет зарядную станцию. | правда |
  |`OK_LEAVING` Газонокосилка покидает зарядную станцию. | правда |
  |`NONE` Никаких действий не происходит, возможно, из-за ошибки. | правда |
  |`NONE` Никаких действий не происходит, возможно, из-за ошибки. | правда |
  |все остальные значения | правда |

- `batteryState_chargingTime_remain_i` *(под SERVICE_COMMON...)* и<br/>

`activity_mowingTime_remain_i` *(в SERVICE_MOWER...)*

  *Обе точки данных генерируются адаптером и не требуются из-за API интеллектуальной системы GARDENA.*

Эти точки данных показывают прогноз оставшегося времени зарядки и скашивания газонокосилки в секундах.
Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.

Для прогнозирования значения история последних нескольких циклов зарядки и скашивания сохраняется в двух состояниях `info.saveMowingHistory` и `info.saveChargingHistory`.

Эту функцию можно включить/выключить в конфигурации экземпляра адаптера вместе с количеством сохраненных циклов зарядки и скашивания в истории.

Чтобы эта функция заработала, **убедитесь, что по крайней мере один цикл скашивания и зарядки проходит без ошибок (например, не прерывается вручную или сенсорным управлением).** Лучше, если не менее трех циклов будут выполнены без ошибок.
Эта функция пытается распознать нормальный случай и первоначально предполагает, что следующий процесс является нормальным случаем. Если это ошибочно, то этот ошибочный прогон рассматривается как нормальный случай, а прогоны, которые затем проходят нормально, как случай сбоя. Если во время выполнения возникла ошибка, остановите адаптер, удалите две точки данных и запустите заново.

Дополнительные сведения об общих механизмах прогнозирования см. в [ПРОГНОЗ.md](FORECAST.md).

  **Примечания:**

    1. Прогнозные значения доступны только при наличии хотя бы одного полного

цикл зарядки и скашивания сохраняется в истории.

    2. История сохраняется в разделе «информация», поэтому, если требуется «МЕСТОПОЛОЖЕНИЕ»,

для удаления, напр. в случае будущего обновления он не теряется.

    3. Если вы отсоедините газонокосилку от интеллектуальной системы GARDENA и

повторно подключите его, история будет потеряна, потому что ваша газонокосилка получит новый идентификатор в интеллектуальной системе GARDENA. Это означает, что адаптер не может распознать косилку как предыдущую - может быть, это вторая косилка.
В этом случае рекомендуется удалить эти две точки данных и перезапустить адаптер, чтобы предыдущие (теперь старые) наборы истории не читались и не записывались постоянно. Затем адаптер начинает создавать новую историю.

4. Эта функция должна работать для более чем одной косилки, но

не проверял *(не могу этого сделать, т.к. у меня только одна косилка)*.
Если у вас более одной газонокосилки, пожалуйста, протестируйте и сообщите об ошибках и, конечно же, сообщите, работает ли она должным образом. Заранее спасибо за это.

- `lastErrorCode_value`

Обратите особое внимание на точку данных `lastErrorCode_value`.
Описание возможных значений можно найти по адресу https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, см. «MowerService — lastErrorCode».

### Для SERVICE_VALVE_SET
#### Управление
Для управления устройством используйте точку данных

- `stop_all_valves_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы остановить все клапаны.

  - Чтобы немедленно остановить все клапаны, используйте строку STOP_UNTIL_NEXT_TASK.

**Примечание.** Не отображайте значение этой точки данных в приложении, так как оно в основном не определено. Кроме того, эта точка данных не может служить триггером для ваших собственных действий, потому что она просто устанавливается в значение *null* после запуска команды.

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

### Для SERVICE_VALVE
#### Управление
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы запустить клапан.

  - Для запуска в течение определенного времени установите значение в секундах

  (пожалуйста, используйте число, кратное 60).

**Примечание.** Существуют некоторые ограничения допустимых значений.
Пожалуйста, сообщите, если вы видите другие ограничения.

    | устройство | предел |
    | - | - |
    |GARDENA умная система управления поливом| 5400 секунд (90 минут) |
    |GARDENA умный насос | 36000 (10 часов) |
    |GARDENA интеллектуальная система управления поливом | 36000 (10 часов) |

  - Чтобы отменить текущий полив и продолжить по расписанию, используйте строку

  `STOP_UNTIL_NEXT_TASK`

  - Чтобы пропустить автоматическую операцию до указанного времени, текущий активный

операция может быть отменена или не отменена (зависит от модели устройства) используйте строку `PAUSE_<number_of_seconds>`, например `PAUSE_86400` для приостановки на 24 часа (используйте число, кратное 60).

  - Чтобы восстановить автоматическую работу, если она была приостановлена, используйте строку `UNPAUSE`

- `irrigationWhileMowing_allowed_i` и `irrigationWhileMowing_mowerDefinition_i`

  *Эти точки данных генерируются адаптером и не требуются из-за API интеллектуальной системы GARDENA.*

Эти точки данных дают контроль над функцией *Полив не разрешен во время скашивания*.
Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.
Описание этой функции см. в главе [Во время скашивания не допускается полив](#Irrigation-not-allowed-while-mowing).

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальная точка данных:

- `duration_leftover_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

Значение описывает количество минут до закрытия клапана и прекращения полива.

    - Целое число, единица (`1`) или более.
    - `null`, если не определено

### Для SERVICE_POWER_SOCKET
#### Управление
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы запустить розетку.

  - Для запуска в течение определенного времени установите значение в секундах

  (пожалуйста, используйте число, кратное 60)

  - Чтобы включить устройство навсегда, используйте строку `START_OVERRIDE`.
  - Чтобы остановить устройство, используйте `STOP_UNTIL_NEXT_TASK`.
  - Чтобы пропустить автоматическую операцию до указанного времени. Текущая активная операция

НЕ будет отменен. Используйте строку `PAUSE_<number_of_seconds>`, например. `PAUSE_86400` для приостановки на 24 часа (используйте число, кратное 60).

  - Чтобы восстановить автоматическую работу, если она была приостановлена, используйте строку `UNPAUSE`

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальная точка данных:

- `duration_leftover_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Значение описывает количество минут до отключения розетки.

    - Целое число, единица (`1`) или более.
    - `null`, если не определено

### Для SERVICE_SENSOR
#### Управление
Нет доступных функций управления.

#### Мониторинг
Все точки данных предназначены только для мониторинга и информации.

### Для SERVICE_COMMON
`SERVICE_COMMON` содержит общую информацию об устройстве.
Описание интегрировано в описание других УСЛУГ_... там, где это необходимо.

## Ограничения скорости
Есть некоторые ограничения, о которых вы должны знать.
См. главу *Ограничения скорости* в [*ПРОЧТИ МЕНЯ*](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/readme) описания API смарт-системы GARDENA.

Чтобы помочь вам увидеть, достигли ли вы этих ограничений скорости, вы можете включить мониторинг в конфигурации экземпляра с параметром *monitoring Rate Limits*.

Если вы включили состояние мониторинга, `info.RateLimitCounter` актуализируется при каждом запросе.
В этом состоянии сохраняется структура данных с количеством запросов в месяц, день, час и за последние 30 и 31 день.

Структура находится в [JSON](https://en.wikipedia.org/wiki/JSON) и выглядит так:

```
{
  "2020": {                          <<< year
    "2020-08": {                     <<< month
      "count": 21,                   <<< number of requests for month
      "2020-08-27": {                <<< day
        "11": {                      <<< hour
          "count": 3                 <<< number of requests for hour
        },
        "12": {                      <<< hour
          "count": 13                <<< number of requests for hour
        },
        "count": 16                  <<< number of requests for day
      },
      "2020-08-28": {                <<< day
        "14": {                      <<< hour
          "count": 5                 <<< number of requests for hour
        },
        "count": 5                   <<< number of requests for day
      }
    }
  },
     ...
  "last30days": {
    "count": 2021                    <<< number of requests in last 30 days
  },
  "last31days": {
    "count": 2098                    <<< number of requests in last 31 days
  }
}
```

**Примечание:**

  - Этот час - это час времени в UTC
  - Что фактическое количество запросов может быть больше. Особенно как

  пока соответствующий период не полностью охвачен мониторингом.

  - Что эта структура становится очень большой и никогда не удаляется

адаптер. Поэтому, пожалуйста, время от времени удаляйте его вручную или отключайте мониторинг - по крайней мере, если у вас нет проблем с ограничениями скорости.

## Полив во время скашивания запрещен
### В чем проблема?
Если у вас есть и газонокосилка, и система орошения с выдвижными разбрызгивателями, существует риск того, что ваша косилка наткнется на выдвижной разбрызгиватель во время орошения и повредит его или сама нанесет ущерб.

Чтобы предотвратить это, система орошения или, лучше, отдельные клапаны должны быть выключены, когда косилка работает.

### Что делается?
С помощью этой функции можно остановить полив, когда газонокосилка находится на газоне. Это может быть определено отдельно для каждого клапана.

Для каждого клапана может быть определена одна или несколько косилок, для которых клапан не может быть открыт, пока косилка косит.
По сути, косилка имеет приоритет над поливом, т.е. если возникает конфликт, что косилка косит, а клапан открыт, то клапан закрывается и выставляется соответствующее предупреждение.

Дополнительно можно определить, что клапан никогда не должен открываться независимо от косилки. Например. можно использовать, если клапан или труба за ним повреждены.

Всю проверку можно включить или выключить в конфигурации экземпляра с помощью параметра *Проверка ирригации*.

Для каждого `SERVICE_VALVE` доступны три точки данных.
Они используются для настройки и для сообщений о предупреждениях.

  | точка данных | записываемый | Описание точек данных |
  | - | - | - |
  |`irrigationWhileMowing_allowed_i` | да |установите в `false`, если необходимо проверить, разрешен ли полив, когда газонокосилка косит газон, `true` в противном случае |
  |`irrigationWhileMowing_warningCode_i`| нет | Код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. в следующей таблице. Если установлено более одного предупреждения, коды объединяются с `+` (например, `STOPPED+UNKNOWN_MOWER`).|
  |`irrigationWhileMowing_warningCode_i`| нет | Код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. в следующей таблице. Если установлено более одного предупреждения, коды объединяются с помощью `+` (например, `STOPPED+UNKNOWN_MOWER`).|

* ***формат идентификатора косилки***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Вы можете скопировать этот идентификатор косилки со вкладки объектов ioBroker, см. красную стрелку на следующих рисунках.

  *с админкой v4.x.y:*

    ![идентификатор косилки](../../../en/adapterref/iobroker.smartgarden/mowerid.jpg)

  *с админкой v5.x.y:*

    ![идентификатор косилки](../../../en/adapterref/iobroker.smartgarden/mowerid_admin5.jpg)

* ***предупреждающие коды***

  | код предупреждения | описание|
  | - | - |
  | `NO_WARNING` |нет предупреждения, клапан открыт |
  | `STOPPED` |клапан автоматически закрывается, так как газонокосилка косит |
  | `FORBIDDEN` |клапан закрыт, поскольку в точке данных `irrigationWhileMowing_mowerDefinition_i`§ установлен специальный код `IRRIGATION_FORBIDDEN`|
  | `ЗАПРЕЩЕНО` |клапан закрыт, поскольку в точке данных `irrigationWhileMowing_mowerDefinition_i` установлен специальный код `IRRIGATION_FORBIDDEN`|

Эта функция запускается каждый раз, когда

- клапан открывается или
- косилка начинает косить

Он не запускается при изменении значений в точках данных, перечисленных выше.
Это означает: если возникает конфликтная ситуация и вы меняете `irrigationWhileMowing_allowed_i` с `true` на `false`, конфликт не распознается и конфликт продолжается. То же самое относится к изменению `irrigationWhileMowing_mowerDefinition_i`.

### Основное поведение -- ПРЕДУПРЕЖДЕНИЕ
Эта функция не может предотвратить открытие клапана во время кошения газонокосилкой. Например. это можно сделать вручную через приложение GARDENA или автоматически по расписанию.

Эта функция может максимально быстро закрыть клапан только в случае конфликта. И конфликт может быть и не распознан.
Так может случиться так, что вода будет пропущена.
**Например. невозможно предотвратить выдвижение выдвижных разбрызгивателей и попадание газонокосилки в выдвижные разбрызгиватели**, но вероятность того, что это произойдет, сведена к минимуму.
**Таким образом, ваше приложение должно убедиться, что этот конфликт никогда не произойдет.**

## Пожелания для точек данных
Этот адаптер сообщает **каждое значение** в виде точки данных, которая предоставляется через API интеллектуальной системы GARDENA. Если кому-то нужны дополнительные значения, свяжитесь с GARDENA и сообщите, что это значение также будет включено в API. Для этого перейдите на страницу ***Свяжитесь с нами и оставьте отзыв*** в нижнем колонтитуле страницы [Портал разработчиков GARDENA](https://developer.husqvarnagroup.cloud).

## Примечание
Это частный проект. Я не имею никакого отношения к GARDENA или Husqvarna.

## Кредиты
Большое спасибо GARDENA/Husqvarna за предоставление этого [общедоступный API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) и особая благодарность вашей команде поддержки за очень хорошую и очень быструю поддержку.

логотип smartgarden: http://www.freepik.com Разработано Freepik

## Changelog
### 1.0.6
* (jpgorganizer) 2022-May-04
  - some minor changes in documentation, including [Issue 41](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/41)
and new limit for SERVICE_VALVE (just smart Irrigation Control)
  - bug fix in error handling
  - changes due to new Gardena API v1.1.0
  - necessary changes due to changed behavior Gardena Service [Issue 43](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/43)
  - tests against js-controller 4.x, [Issue 40](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/40)
  
### 1.0.5
* (jpgorganizer) 2021-May-13
  - necessary adjustments due to js-controller v3.3; e.g. [Issue 29](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/29)
    - nearly all data points get deleted and created again with intended role/unit
    - data types for following data points changed from `string` to `number`: 
	  - for all devices: `rfLinkLevel_value` 
      - for mower: `batteryLevel_value`, `operatingHours_value` 
      - for sensor: `batteryLevel_value`, `soilHumidity_value`, `soilTemperature_value`, `lightIntensity_value`, `ambientTemperature_value`
  - compatibility test with node.js v14 and node.js v16 and added to Travis CI test; 
    compatibility test with the upcoming Admin 5 React UI;
    e.g. [Issue 30](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/30)
  - new parameter *beautify log* in instance configuration; makes state ids a little bit shorter in log if switched on

### 1.0.4
* (jpgorganizer) 2021-Feb-22
  - necessary adjustments due to js-controller v3.2
  - option `useTestVariable` in adapter/instance configuration removed

### 1.0.3
* (jpgorganizer) 2021-Jan-26
  - improved error handling
  - new parameter `connection retry interval`
  - axios vulnerability solved, using version `>=0.21.1`
  
### 1.0.2
* (jpgorganizer) 2020-Aug-30
  - monitoring rate limits, see chapter [Rate Limits](#rate-limits) and discussion at 
  [Issue 18](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/18)


### 1.0.1
* (jpgorganizer) 2020-Aug-17
  - better reconnection to GARDENA smart system server in case of your internet connection was broken
  - textual changes in io-package.json
  - improved README and FAQ
  
### 1.0.0
* (jpgorganizer) 2020-Jun-13
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET. e.g. 
	[Issue 14](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/14)
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12).
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`, e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12)
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 2020-May-03
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 2020-Apr-26
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer)  2020-Apr-25
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 2020-Apr-01
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 2020-Mar-31
  - Dependency get's resolved now
  
### 0.4.0 
* (jpgorganizer) 2020-Mar-31
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 2020-Mar-25
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 2020-Mar-24
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1 
* (jpgorganizer) 2020-Mar-01
  - initial release

## License

Copyright (c) 2020 - 2022 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2764 $ $Date: 2022-05-11 21:07:17 +0200 (Mi, 11 Mai 2022) $ --->