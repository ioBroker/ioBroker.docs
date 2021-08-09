---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: bbKCZ49g0LWG4EJYAGtuSSRM1C6FmTKx/qpQ3e+qTHY=
---
![Логотип](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Установлены](http://iobroker.live/badges/smartgarden-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Статус сборки](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![Стабильный](http://iobroker.live/badges/smartgarden-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8C7M7MH3KPYDC&source=url)

## IoBroker smartgarden адаптер для умной системы GARDENA
Адаптер для умной системы GARDENA с использованием официального [API интеллектуальной системы GARDENA](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) и сервиса.

Адаптер позволяет разрабатывать приложение (например, с VIS), которое можно использовать параллельно с официальным приложением GARDENA. Адаптер и его дополнительные функции не влияют ни на одну из основных функций приложения GARDENA и наоборот.

Адаптер не является полной заменой приложения GARDENA, а является дополнением для интеграции устройств GARDENA в умный дом с помощью ioBroker.
Наиболее важные действия можно выполнять с помощью адаптера. Он также предлагает возможность реализовать свои собственные идеи, которые невозможны с приложением GARDENA.

## Поддерживаемые устройства
  - Умные газонокосилки-роботы SILENO GARDENA
  - Умный контроль орошения GARDENA
  - Умный напорный насос GARDENA
  - Умный контроль воды GARDENA
  - Умный адаптер питания GARDENA
  - Умный датчик GARDENA

Дополнительные сведения об устройствах см. В разделах [GARDENA Немецкий сайт](https://www.gardena.com/de/produkte/smart/smartsystem/) и [здесь на английском](https://www.gardena.com/uk/products/smart/smart-system/).

## Требования
Для использования этого адаптера вам понадобятся две вещи:

1. Учетная запись умной системы GARDENA
1. ключ приложения GARDENA

Чтобы получить обе вещи, перейдите к [https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/](https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/).

![get_application_key](../../../en/adapterref/iobroker.smartgarden/getting_application_key.jpg)

**Примечание:**

  - Если у вас уже есть Husqvarna Automower® Connect или

Учетная запись умной системы GARDENA, вы можете войти в систему с этой учетной записью и перейти к шагу 2, создать приложение, чтобы получить ключ приложения.

	---

*** И почти наверняка у вас есть учетная запись. *** *Используйте ту же учетную запись, что и для приложения GARDENA, в котором зарегистрированы ваши устройства GARDENA. В противном случае вы не получите доступа к своим устройствам.*

	---

  - Убедитесь, что вы подключили приложение (из шага 2) к API
  - API аутентификации ***и***
- API интеллектуальной системы GARDENA.

И, конечно же, вам потребуется работающая установка ioBroker и у вас должен быть хотя бы один [Смарт-устройство GARDENA](#supported-devices).

## Оглавление
  * [Адаптер ioBroker smartgarden для умной системы GARDENA] (# iobroker-smartgarden-adapter-for-gardena-smart-system)
  * [Поддерживаемые устройства] (# поддерживаемых устройств)
  * [Требования] (# требований)
  * [Оглавление] (# оглавление)
  * [Установка] (# установка)
  * [Настроечный адаптер] (# setup-adapter)
  * [Получение поддержки] (# Get-support)
  * [Точки данных адаптера] (# точки данных адаптера)
     * [Общие сведения о точках данных] (# общие сведения о точках данных)
     * [Для SERVICE_MOWER] (# для-service_mower)
     * [Для SERVICE_VALVE_SET] (# для-service_valve_set)
     * [Для SERVICE_VALVE] (# для-service_valve)
     * [Для SERVICE_POWER_SOCKET] (# for-service_power_socket)
     * [Для SERVICE_SENSOR] (# для-service_sensor)
     * [Для SERVICE_COMMON] (# для-service_common)
  * [Ограничения скорости] (# ограничения скорости)
  * [Орошение запрещено во время скашивания] (# Орошение-запрещено-во время скашивания)
     * [В чем проблема?] (# В чем-проблема)
* [Что делается?] (# Что делается)
* [Базовое поведение - ПРЕДУПРЕЖДЕНИЕ] (# базовое поведение ---- предупреждение)
  * [Пожелания по точкам данных] (# Пожелания по точкам данных)
  * [Примечание] (# примечание)
  * [Список изменений] (# список изменений)
     * [1.0.5] (# 105)
     * [1.0.4] (# 104)
     * [1.0.3] (# 103)
     * [предыдущие версии] (# 102)
  * [Кредиты] (# кредитов)
  * [Лицензия] (# лицензия)

## Монтаж
Адаптер доступен

- at npm: установить с помощью `npm install iobroker.smartgarden`
- в GitHub по адресу https://github.com/jpgorganizer/ioBroker.smartgarden.

Описание того, как установить с GitHub, доступно в [здесь](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren) (немецкий язык).

## Настроить адаптер
1. Установите адаптер.
2. Создайте экземпляр адаптера.
3. Проверьте и завершите настройку экземпляра.

  **Если вы измените какое-либо значение этих параметров, перезапустите адаптер.**

3.1 Измените имя пользователя, пароль и ключ приложения в конфигурации основного экземпляра

      | Параметр | Описание |
      | - | - |
      | имя пользователя | имя пользователя умной системы GARDENA |
      | пароль | соответствующий пароль |
      | Ключ API | API Key (ключ приложения), например согласно [Требования](#requirements) |

Обратите внимание, что пароль и ключ приложения закодированы и хранятся в адаптере и просто декодируются для аутентификации с хостом приложения GARDENA.

3.2 Проверьте значения по умолчанию для различных настроек и включите / выключите опции в конфигурации экземпляра. Для большинства пользователей подойдут значения по умолчанию.

      | Параметр | Описание |
      | - | - |
   | предварительно определить состояния | предварительно определить все состояния Gardena API независимо от того, передаются они в данный момент; включить или выключить; если он включен, то создаются все состояния API интеллектуальной системы GARDENA, независимо от того, передаются они в данный момент сервисом GARDENA или нет; по умолчанию: выключено; *(новое в v0.4.0)* |
   | прогноз | использовать прогноз времени зарядки и оставшегося времени косилки; включить / выключить прогнозируемую зарядку и время кошения косилки; по умолчанию: выключено; *(новое в v0.5.0)* |
   | циклы | количество циклов истории MOWER; вы можете использовать любое число от 3 (минимум), но 10 (по умолчанию) кажется хорошим значением; актуально, только если включен вышеуказанный *'прогноз'* *(новое в v0.5.0)* |
   | проверка орошения | используйте проверку, разрешен ли полив во время кошения; включить / выключить; по умолчанию: выключено; *(новое в v0.6.0)* |

3.3. Проверьте значения по умолчанию для системных настроек и включите / выключите опции в конфигурации экземпляра. **Большинству пользователей не нужно ничего менять на этой вкладке.**

      | Параметр | Описание |
      | - | - |
      | Loglevel | Loglevel: 0 = нет журнала, 1 = несколько журналов, 2 = еще несколько журналов, 3 = все журналы; по умолчанию: 0 |
   | украсить журнал | сделать идентификаторы состояния в журнале короче; включить / выключить; по умолчанию: включено; *(новое в v1.0.5)* |
| мониторинг пределов скорости | использовать мониторинг лимитов скорости API интеллектуальной системы Gardena; включить / выключить; по умолчанию: выключено; *(новое в v1.0.2)* |
   | интервал повторной попытки подключения | интервал повторной попытки подключения к Gardena Webservice в случае ошибки (в секундах); по умолчанию: 300, минимум: 60; *(новое в v1.0.3)* |
      | частота пинга | Частота отправки пингов на Gardena Webservice (в секундах); по умолчанию: 150, минимум: 1, максимум: 300 |
      | фактор аутентификации | Фактор действительности токена аутентификации; по умолчанию: 1.001 |
      | Auth-URL | URL-адрес хоста аутентификации; по умолчанию: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev) |
      | Базовый URL | Базовый URL-адрес веб-службы; по умолчанию: [https://api.smart.gardena.dev] (https://api.smart.gardena.dev) |

## Получение поддержки
Чтобы получить помощь, внимательно прочтите этот [README] (README.md) и [FAQ](FAQ.md).
Если вам нужна дополнительная поддержка, присоединяйтесь к [Тема на форуме ioBroker](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system).

## Точки данных адаптера
Адаптер предназначен для мониторинга и управления устройствами интеллектуальной системы GARDENA.
Для этого будет один `LOCATION` и один или несколько `DEVICE`.
Для каждого `DEVICE` будет

  - один `SERVICE_COMMON_ <id>` и
  - один или несколько `SERVICE_ <servicelink_type> _ <id>`.

Где `<servicelink_type>` - это описание типа устройства, например MOWER или VALVE, а `<id>` - это (закодированный) идентификатор устройства GARDENA, используемый API.
См. Описание ServiceLink в [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Управление / мониторинг для каждого устройства возможен с помощью `SERVICE_<servicelink_type>`, перечисленных в следующей таблице. `SERVICE_COMMON` предоставляет общую информацию об устройстве.

  | устройство | SERVICE_ <servicelink_type> |
  | - | - |
  | умная газонокосилка-робот SILENO | SERVICE_MOWER и SERVICE_COMMON |
  | умный контроль орошения | SERVICE_VALVE_SET, SERVICE_VALVE и SERVICE_COMMON |
  | умный нагнетательный насос | SERVICE_VALVE и SERVICE_COMMON |
  | умный контроль воды | SERVICE_VALVE и SERVICE_COMMON |
  | умный адаптер питания | SERVICE_POWER_SOCKET и SERVICE_COMMON |
  | умный датчик | SERVICE_SENSOR и SERVICE_COMMON |

Если вам нужна дополнительная информация о точках данных, см. [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).
Там вы найдете описание каждой точки данных; кроме тех, которые помечены как точки данных адаптера, а не API интеллектуальной системы GARDENA.

Адаптер создает свои собственные точки данных для различных функций / опций, когда функция выбрана. Эти точки данных не удаляются автоматически при отмене выбора функции. Если вам больше не нужны эти точки данных, их можно удалить вручную.

### Общие сведения о точках данных
Адаптер не изменяет значения, передаваемые API интеллектуальной системы GARDENA.
Единственное, что сделано (начиная с версии 1.0.0) - это проверить тип *временных меток* и *чисел*

| проверить на | описание |
| - | - |
| отметки времени | все временные метки указаны в формате UTC; если полученная метка времени не является действительной меткой времени, вместо нее используется `01 Jan 1970 00:00:00Z` (нулевое время Unix). Так что, если вы видите эту дату / время, сообщите об этом. |
| числа | если число не является допустимым числом, вместо него используется «-1». Если вы видите это число, сообщите об этом. |

Запросы на управление устройством будут выполнены, как только команда будет принята интеллектуальным шлюзом. Об успешном выполнении команды на самом устройстве можно судить по соответствующему изменению состояния.
* Пример: * отправка команды для запуска службы VALVE в системе Smart Water Control приведет к изменению точки данных `activity_value` службы после того, как устройство обработало команду.

**Заметки:**

  - Запросы на управление устройством не могут быть отправлены, пока адаптер smartgarden не отправлен

    подключен к API интеллектуальной системы GARDENA.

  - Убедитесь, что вы установили значение для команды с `ack = false`. См. [Главные команды и статусы в Руководстве для разработчиков адаптеров] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)

### Для SERVICE_MOWER
#### Контроллинг
Для управления устройством используйте точку данных

- `activity_control_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы запустить газонокосилку.

  - Для запуска в течение определенного времени установите значение планируемой продолжительности в

  секунды (используйте число, кратное 60)

  - для автоматической работы установите строку `START_DONT_OVERRIDE`
  - для отмены текущей операции и возврата к использованию зарядной станции

  строка `PARK_UNTIL_NEXT_TASK`

  - чтобы отменить текущую операцию, вернитесь на зарядную станцию и проигнорируйте

  использовать строку расписания `PARK_UNTIL_FURTHER_NOTICE`

 **Примечание.** Газонокосилка запускается только с полностью заряженным аккумулятором.

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Особые данные:

- `activity_mowing_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Эта точка данных показывает два разных состояния газонокосилки:

  - `true`: косить или
  - `false`: не косить.

Эту точку данных можно использовать для дальнейших действий, когда важно знать, безопасно ли газонокосилка находится на газоне или нет.

Эта точка данных устанавливается в зависимости от значения точки данных `activity_value`.
См. Подробную информацию в следующей таблице.

  | `activity_value` | `activity_mowing_i` |
  | `OK_CHARGING` Косилка должна косить, но недостаточный уровень заряда удерживает ее в зарядной станции. | ложь |
  | `PARKED_TIMER` Газонокосилка запаркована по таймеру, снова запустится в заданное время. | ложь |
  | `PARKED_PARK_SELECTED` Газонокосилка припаркована до дальнейшего уведомления. | ложь |
  | `PARKED_AUTOTIMER` Косилка пропускает скашивание из-за недостаточной высоты травы. | ложь |
  | `PAUSED` Газонокосилка находится в состоянии ожидания с закрытым люком. | ложь |
  | `OK_CUTTING` Газонокосилка работает в автоматическом режиме (расписание). | правда |
  | `OK_CUTTING_TIMER_OVERRIDDEN` Газонокосилка работает вне графика. | правда |
  | `OK_SEARCHING` Газонокосилка ищет зарядную станцию. | правда |
  | `OK_LEAVING` Газонокосилка покидает зарядную станцию. | правда |
  | `NONE` Нет активности, возможно, из-за ошибки. | правда |
  | `NONE` Никаких действий не происходит, возможно, из-за ошибки. | правда |
  | все остальные значения | правда |

- `batteryState_chargingTime_remain_i` *(в SERVICE_COMMON ...)* и<br/>

`activity_mowingTime_remain_i` *(в разделе SERVICE_MOWER ...)*

  *Обе точки данных генерируются адаптером и не требуются благодаря API интеллектуальной системы GARDENA.*

Эти точки данных показывают прогноз оставшегося времени зарядки и стрижки газонокосилки в секундах.
Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.

Для прогнозирования значения история последних нескольких циклов зарядки и стрижки сохраняется в двух состояниях: `info.saveMowingHistory` и `info.saveChargingHistory`.

Эту функцию можно включить / выключить в конфигурации экземпляра адаптера вместе с количеством сохраненных циклов зарядки и стрижки в истории.

Чтобы запустить эту функцию, **убедитесь, что хотя бы один цикл стрижки и зарядки выполняется без ошибок (например, не прерывается вручную или с помощью сенсорного управления).** Лучше, если хотя бы три цикла будут выполнены без ошибок.
Эта функция пытается распознать нормальный случай и изначально предполагает, что следующий процесс является нормальным. Если это неисправно, то этот ошибочный цикл рассматривается как нормальный случай, а цикл, который затем проходит нормально, как случай неисправности. Если во время выполнения произошла ошибка, остановите адаптер, удалите две точки данных и начните заново.

Для получения дополнительной информации об общих механизмах прогнозирования см. [FORECAST.md](FORECAST.md).

  **Заметки:**

    1. Значения прогноза доступны только в том случае, если хотя бы один полный

цикл зарядки и стрижки сохраняется в истории.

    2. История сохраняется в разделе «info», так что если «LOCATION» необходимо

для удаления, например в случае будущего обновления он не теряется.

    3. Если вы отключите газонокосилку от интеллектуальной системы GARDENA и

подключите его снова, история будет потеряна, потому что ваша газонокосилка получит новый идентификатор в интеллектуальной системе GARDENA. Это означает, что адаптер не может распознать косилку как предыдущую - может быть, это вторая.
В этом случае рекомендуется удалить эти две точки данных и перезапустить адаптер, чтобы предыдущие (теперь старые) наборы истории не читались и не записывались постоянно. Затем адаптер начинает создавать новую историю.

4. Эта функция должна работать более чем с одной косилкой, но она

не тестировалось *(не могу, потому что у меня только одна косилка)* Если у вас несколько косилок, пожалуйста, проверьте и сообщите об ошибках и, конечно, сообщите, работает ли она должным образом. Заранее спасибо за это.

- `lastErrorCode_value`

Обратите особое внимание на точку данных `lastErrorCode_value`.
Описание возможных значений можно найти на https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, см. «MowerService - lastErrorCode»

### Для SERVICE_VALVE_SET
#### Контроллинг
Для управления устройством используйте точку данных

- `stop_all_valves_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы остановить все клапаны.

  - Чтобы немедленно остановить все клапаны, используйте строку `STOP_UNTIL_NEXT_TASK`

** Примечание. ** Не отображайте значение этой точки данных в вашем приложении, так как значение в большинстве случаев не определено. Кроме того, эта точка данных не может служить триггером для ваших собственных действий, потому что для нее просто установлено значение *null* после запуска команды.

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

### Для SERVICE_VALVE
#### Контроллинг
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы запустить клапан.

  - Для запуска в течение определенного времени установите значение на значение в секундах

  (пожалуйста, используйте число, кратное 60).

** Примечание. ** Допустимые значения имеют некоторые ограничения.
Сообщите, если вы видите другие ограничения.

    | устройство | предел |
    | - | - |
    | Умное управление поливом GARDENA | 3540 секунд (59 минут) |
    | Умный насос GARDENA | 36000 (10 часов) |
    | GARDENA умный контроль воды | 36000 (10 часов) |

  - Чтобы отменить текущий полив и продолжить работу по расписанию, используйте строку

  `STOP_UNTIL_NEXT_TASK`

  - Чтобы пропустить автоматическую операцию до указанного времени, текущий активный

операция может или не может быть отменена (зависит от модели устройства), используйте строку `PAUSE_<number_of_seconds>`, например `PAUSE_86400` для паузы на 24 часа (используйте число, кратное 60)

  - Для восстановления автоматической работы, если она была приостановлена, используйте строку `UNPAUSE`

- `irrigationWhileMowing_allowed_i` и` irrigationWhileMowing_mowerDefinition_i`

  *Эти точки данных генерируются адаптером и не требуются из-за API интеллектуальной системы GARDENA.*

Эти точки данных позволяют управлять функцией *Орошение во время кошения запрещено* Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.
Описание этой функции см. В главе [Орошение во время кошения запрещено.](#Irrigation-not-allowed-while-mowing).

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальная точка данных:

- `duration_leftover_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

Значение описывает количество минут до закрытия клапана и прекращения полива.

    - Целое число, единица (`1`) или более.
    - `null`, если не определено

### Для SERVICE_POWER_SOCKET
#### Контроллинг
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы включить розетку.

  - Для запуска в течение определенного времени установите значение на значение в секундах

  (пожалуйста, используйте число, кратное 60)

  - Чтобы включить устройство навсегда, используйте строку `START_OVERRIDE`.
  - Чтобы остановить устройство, используйте `STOP_UNTIL_NEXT_TASK`.
  - Пропустить автоматическую операцию до указанного времени. Текущая активная операция

НЕ будет отменен. Используйте строку `PAUSE_<number_of_seconds>`, например `PAUSE_86400` для паузы на 24 часа (используйте число, кратное 60)

  - Для восстановления автоматической работы, если она была приостановлена, используйте строку `UNPAUSE`

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальная точка данных:

- `duration_leftover_i`

  *Эта точка данных создается адаптером и не требуется из-за API интеллектуальной системы GARDENA.*

  Значение описывает количество минут до отключения розетки.

    - Целое число, единица (`1`) или более.
    - `null`, если не определено

### Для SERVICE_SENSOR
#### Контроллинг
Нет доступных функций управления.

#### Мониторинг
Все точки данных предназначены только для мониторинга и информации.

### Для SERVICE_COMMON
В `SERVICE_COMMON` представлена общая информация об устройстве.
Описание интегрируется в описание других УСЛУГ _..., где это необходимо.

## Пределы скорости
Вам следует помнить о некоторых ограничениях.
См. Главу *Ограничения скорости* в [*ПРОЧТИ МЕНЯ*](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/readme) описания API интеллектуальной системы GARDENA.

Чтобы помочь вам увидеть, достигли ли вы этих пределов скорости, вы можете включить мониторинг в конфигурации экземпляра с помощью параметра *Monitoring Rate Limits*

Если вы включили состояние мониторинга, `info.RateLimitCounter` обновляется с каждым запросом.
В этом состоянии сохраняется структура данных с количеством запросов в месяц, день, час и за последние 30 и 31 день.

Структура находится в [JSON](https://en.wikipedia.org/wiki/JSON) и выглядит как

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

  - Этот час - это час времени по всемирному координированному времени.
  - Что реальное количество запросов может быть больше. Особенно как

  до тех пор, пока соответствующий период не будет полностью охвачен мониторингом.

  - Эта структура становится очень большой и никогда не удаляется

адаптер. Поэтому, пожалуйста, периодически удаляйте его вручную или отключите мониторинг - по крайней мере, если у вас нет проблем с ограничениями скорости.

## Орошение во время кошения запрещено.
### В чем проблема?
Если у вас есть и газонокосилка, и ирригационная система с выдвижными дождевателями, существует риск того, что ваша газонокосилка столкнется с выдвижным дождевателем во время полива, что приведет к ее повреждению или повреждению.

Чтобы этого не произошло, во время стрижки газонокосилку следует отключать систему полива или, что лучше, отдельные клапаны.

### Что делается?
С помощью этой функции можно остановить полив, когда косилка находится на газоне. Это можно определить отдельно для каждого клапана.

Для каждого клапана можно определить одну или несколько косилок, для которых нельзя открывать клапан во время кошения.
По сути, газонокосилка имеет приоритет перед поливом, т.е. если возникает конфликт, когда газонокосилка работает и клапан открыт, клапан закрывается и устанавливается соответствующее предупреждение.

Кроме того, можно определить, что клапан никогда не должен открываться независимо от косилки. Например. может использоваться при повреждении клапана или трубы за ним.

Всю проверку можно включить или выключить в конфигурации экземпляра с помощью параметра *проверка полива*

Для каждого `SERVICE_VALVE` доступны три точки данных.
Они используются для настройки и отправки предупреждений.

  | точка данных | записываемый | Описание точек данных |
  | - | - | - |
  | `irrigationWhileMowing_allowed_i` | да | установите на `false`, если необходимо проверить, разрешен ли полив, когда газонокосилка косит газон, в противном случае - на `true` |
  | `irrigationWhileMowing_warningCode_i` | нет | код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. В следующей таблице. Если установлено несколько предупреждений, коды объединяются с `+` (например, `STOPPED+UNKNOWN_MOWER`). |
  | `irrigationWhileMowing_warningCode_i` | нет | код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. В следующей таблице. Если установлено более одного предупреждения, коды объединяются с помощью `+` (например, `STOPPED + UNKNOWN_MOWER`). |

* ***формат идентификатора косилки***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Вы можете скопировать этот идентификатор косилки из вкладки объектов ioBroker, см. Красную стрелку на следующем рисунке.

  ![идентификатор косилки](../../../en/adapterref/iobroker.smartgarden/mowerid.jpg)

* ***коды предупреждений*** </br>

  | код предупреждения | описание |
  | - | - |
  | `NO_WARNING` | нет предупреждения, клапан открыт |
  | `STOPPED` | клапан автоматически закрывается, потому что косилка косит |
  | `FORBIDDEN` | клапан закрыт, поскольку в точке данных `irrigationWhileMowing_mowerDefinition_i` установлен специальный код `IRRIGATION_FORBIDDEN` |
  | `FORBIDDEN` | клапан закрыт, потому что в точке данных` irrigationWhileMowing_mowerDefinition_i` установлен специальный код `IRRIGATION_FORBIDDEN` |

Эта функция запускается каждый раз, когда

- клапан открывается или
- косилка начинает косить

Он не запускается, когда вы изменяете значения в точках данных, перечисленных выше.
Это означает: если возникает конфликтная ситуация и вы меняете `irrigationWhileMowing_allowed_i` с `true` на `false`, конфликт не распознается, и конфликт будет продолжаться. То же самое относится и к изменению `irrigationWhileMowing_mowerDefinition_i`.

### Основное поведение - ПРЕДУПРЕЖДЕНИЕ
Эта функция не может предотвратить открытие клапана во время кошения. Например. это можно сделать вручную через приложение GARDENA или автоматически по расписанию.

Эта функция позволяет максимально быстро закрыть клапан только в случае конфликта. И конфликт тоже нельзя признать.
Так что может случиться так, что вода будет пропущена.
**Например. невозможно предотвратить выдвижение выдвижных разбрызгивателей и удар газонокосилки по выдвижным разбрызгивателям **, но вероятность того, что это произойдет, сведена к минимуму.
** Таким образом, ваше приложение должно убедиться, что этого конфликта никогда не произойдет. **

## Пожелания для точек данных
Этот адаптер сообщает **каждое значение** как точку данных, которая предоставляется через API интеллектуальной системы GARDENA. Если кому-то нужны дополнительные значения, свяжитесь с GARDENA и сообщите им, что это значение также будет включено в API. Для этого перейдите к ***Свяжитесь с нами и оставьте отзыв*** в нижнем колонтитуле [Портал разработчиков GARDENA](https://developer.husqvarnagroup.cloud).

## Примечание
Это частный проект. Я не имею отношения к GARDENA или Husqvarna.

## Кредиты
Большое спасибо GARDENA / Husqvarna за предоставление этого [общедоступный API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) и особую благодарность вашей службе поддержки за очень хорошую и очень быструю поддержку.

Логотип smartgarden: http://www.freepik.com Разработано Freepik

## Changelog
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

Copyright (c) 2020, 2021 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2507 $ $Date: 2021-05-13 18:07:01 +0200 (Do, 13 Mai 2021) $ --->