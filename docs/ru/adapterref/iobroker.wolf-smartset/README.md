---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: HnhXfR/SVlPFwpg3YJePcFIBYPTlFqqhrmuu9LtafCQ=
---
![Логотип](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Количество установок (стабильное)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Адаптер wolf-smartset для ioBroker
Подключите Wolf Heating к iobroker.

Этот адаптер подключается к серверу Wolf Smartset (https://wolf-smartset.com) для мониторинга и управления вашим отопительным устройством Wolf. Это не локальное подключение. Преимущество заключается в том, что вы можете использовать приложение Wolf Smartset или [Портал Wolf Smartset](https://wolf-smartset.com), а также параллельно получать и задавать значения параметров в ioBroker.

## Требования
Вам необходимо устройство отопления/климата Wolf, оснащенное модулем WLAN/LAN ISM7i (он же Link Home), подключенное к серверу Wolf Smartset, а также авторизованная учетная запись Wolf Smartset для вашего устройства.

## Настройки экземпляра адаптера
### Вкладка: Основные настройки
#### Учетная запись Wolf Smartset
Для подключения к серверу Wolf Smartset вам понадобится ваш

- `Имя пользователя` и
- `Пароль`

который вы также используете для входа в приложение Wolf Smartset или [Портал Wolf Smartset](https://wolf-smartset.com).

#### Устройство Волка
Ваша учётная запись Wolf связана с одним или несколькими устройствами Wolf. Для каждого устройства требуется отдельный экземпляр адаптера ioBroker.

После первой установки вам необходимо выбрать конкретный

- `Устройство` для каждого экземпляра.

Как только вы ввели действительные `Username` и `Password`,

- «Список устройств Wolf» будет заполнен устройствами, закрепленными за вашей учетной записью.

После выбора устройства из списка нажмите на

- «ИСПОЛЬЗУЙТЕ ЭТО УСТРОЙСТВО» для подтверждения выбора.

### Вкладка: Расширенные настройки
Расширенные настройки позволяют адаптировать работу адаптера к вашим потребностям. Как правило, все расширенные настройки можно оставить по умолчанию.

#### Интервалы цикла опроса и списки параметров
После подключения к серверу Wolf Smartset адаптер будет периодически опрашивать значения параметров с сервера.

- `Опрос всех параметров`: адаптер всегда будет опрашивать все параметры, найденные на сервере. Эта стратегия опроса обратно совместима с версией адаптера 1.x.

Адаптер также поддерживает более сложную стратегию опроса, основанную на двух независимых циклах опроса с различными интервалами цикла.

- `Короткий интервал цикла опроса`: введите интервал в __секундах__. Сервер Wolf Smartset определяет абсолютный минимальный интервал опроса (в настоящее время 60 секунд), который не следует уменьшать. Если указать значение ниже этого минимального интервала, сервер не отреагирует ожидаемым образом или даже может прервать сеанс. Адаптер периодически запрашивает текущий минимальный интервал опроса у сервера. Если настроенный интервал опроса меньше минимального интервала опроса, указанного сервером, вы получите предупреждение от адаптера, и вам следует соответствующим образом скорректировать интервал опроса.
- «Длительный интервал цикла опроса»: введите интервал в __минутах__ для второго цикла опроса.

Сервер Wolf Smartset группирует различные параметры устройств в различные пакеты, идентифицируемые числовым значением BundleId. В интерфейсе администратора __ioBroker__ BundleId для различных групп параметров находятся в представлении __Object__ под экземпляром __wolf-smartset__ на уровне канала.

- `Параметры пакета`: в этой таблице можно определить, какие группы значений параметров следует опрашивать в том или ином цикле опроса. Рекомендуется:
- «Включить в короткий цикл опроса» все быстро изменяющиеся значения параметров (например, рабочие состояния) и
- «Включить в длинный цикл опроса» редко изменяющиеся значения параметров (например, параметры конфигурации устройства).

API Wolf Smartset требует, чтобы каждый запрос на опрос включал, помимо списка опрашиваемых параметров, BundleId. Не совсем понятно, как BundleId соотносится с реальным списком параметров, но в большинстве случаев значение «Default» должно быть приемлемым: оно соответствует наибольшему выбранному BundleId для данного цикла опроса. Любые другие настройки здесь предназначены для экспериментального использования. Настройте BundleId для использования в качестве:

- `BundleId для короткого цикла опроса`
- `BundleId для длинного цикла опроса`

Если вы настроили `Poll all Parameters`, BundleId, используемый в запросах на опрос, будет установлен на 1000. Это, вероятно, исключит некоторые параметры Expert (см. ниже) из результата. Поэтому, если вы планируете опрашивать параметры Expert, вам, вероятно, не следует использовать `Poll all Parameters`.

#### Вход эксперта
API Wolf Smartset определяет два уровня доступа к параметрам устройства: __User__ и __Expert__. Соответственно, в представлении __Object__ пользовательского интерфейса __ioBroker Admin__ вы найдете соответствующие два поддерева: __Benutzer__ и __Fachmann__. После первоначальной аутентификации адаптер переходит в режим пользователя и получает все доступные значения параметров только один раз при инициализации. После этого, во время периодических опросов, он будет получать только обновления значений параметров уровня пользователя (т.е. значений в дереве __Benutzer__).

Если вы проверите

- `Выполните вход в систему как эксперт` и введите правильный
- `Экспертный пароль`,

адаптер выполнит вход в систему эксперта во время инициализации, а также будет получать периодические обновления значений параметров экспертного уровня (как показано в дереве __Fachmann__) во время цикла опроса, с которым они связаны.

__!!! Важное примечание по уровню эксперта: Начните !!!__

Уровень «Эксперт», похоже, ведёт себя как ящик Пандоры! Тесты показали, что выйти из уровня «Эксперт» после его включения довольно сложно. Хотя адаптер полностью выходит из системы и удаляет все локально кэшированные данные аутентификации (токены OpenId и идентификатор сеанса) при отключении настройки `Do Expert Login` и перезапуске экземпляра, похоже, этого недостаточно для сервера Wolf Smartset.

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

Хотя на первый взгляд пребывание в режиме эксперта не кажется слишком проблематичным, есть по крайней мере один побочный эффект, который может стать для вас реальной проблемой:

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

Это влияет, в частности, на следующие ParameterIds и, вероятно, также на другие:

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

Итак, если вы полагаетесь на постоянную и точную передачу таких статистических данных до начала периода, дважды подумайте, стоит ли проверять `Do Expert Login`. Не жалуйтесь: если у вас возникнут проблемы с возвращением на уровень пользователя, вас предупредили!

__!!! Важное примечание по уровню эксперта: Конец !!!__

#### Проверьте наличие изменений в публичном IP-адресе
Сервер Wolf Smartset распознаёт IP-адрес клиента. Это означает, что он связывает некоторую информацию о состоянии приложения с публичным IP-адресом клиентского приложения. Таким образом, если вы настроили `Do Expert Login` и публичный IP-адрес адаптера изменился (например, после перезагрузки маршрутизатора), адаптеру потребуется повторно аутентифицироваться на сервере Wolf Smartset, чтобы снова включить режим Expert. Поскольку адаптер выполняет повторную аутентификацию только каждый час, может потребоваться до __одного часа, прежде чем адаптер снова перейдёт в режим Expert__.

Если это слишком долго для вас, вы можете проверить

- «Включить проверку публичного IP»: в этом случае адаптер будет проверять ваш публичный IP-адрес через [ipify.org](https://ipify.org) __каждый 4-й цикл короткого опроса__ и запустит повторную аутентификацию при изменении. Таким образом, адаптер вернется в режим эксперта __не позднее, чем через 4 цикла короткого опроса__.

#### API-профилирование
Профилирование API позволяет отслеживать использование API Wolf Smartset адаптера. Если вы

- «Включить профилирование API», адаптер будет обновлять следующие объекты в __дереве объектов экземпляра адаптера__ для каждого запроса опроса:
- info_api
- poll_req_bundle_id: BundleId, используемый в запросе на опрос
- poll_req_num_params: количество параметров, запрошенных адаптером
- poll_resp_num_params: количество параметров, возвращенных сервером
- poll_resp_num_params: количество значений параметров, возвращенных с сервера (возвращенные параметры могут иметь или не иметь связанное значение)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mcm1957) Dependencies have been updated.

### 2.1.2 (2025-08-14)
- (mcm1957) Adapter requires admin 7.6.17 now.
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2025-08-05)
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2025-08-05)
- (flingo64) Change: Log periodic message '_refreshAuthToken(): ERROR ...' with level info
- (flingo64) Bugfix (#458): set instance state to connected only if initialization went fine
- (flingo64) Bugfix: if configured BundleId for poll requests is not available on server, use default BundleId
- (flingo64) Enhancement: option 'Poll all Parameters' implements backward compatible poll strategy
- (flingo64) Enhancement(#459, #465): added more BundleIds (4300, 10000, 10700, 14000, 14700, 15600, 15700, 15800) for AdminUI as found on different Wolf device configurations

### 2.0.1 (2025-04-18)
- (flingo64) Bugfix: fixed various typos in Readme and translations
- (flingo64) Bugfix: Fixed an AdminUI issue (#450 - 'No device selected') when the device information contained line break (e.g. in ContactInformation, Description or Comment )
- (flingo64) Enhancement for AdminUI: support for more than one device in list of devices returned from Wolf Smartset server

### 2.0.0 (2025-04-02)
- (flingo64) BREAKING CHANGE: Please reenter your login credentials.
- (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
- (flingo64) A general code cleanup and partial rewrite has been done.
- (flingo64) Trigger re-initalization has been added, if api returns an error (server might be down temporarily).
- (flingo64) Expert login and periodic re-login have been added (#242).
- (flingo64) Support for level 3 objects `time programs` / `party mode` / `vacation mode` has been added.
- (flingo64) Request UserInfo from Wolf server, check whether adapter instance's poll interval meets requirements (60 sec) added.
- (flingo64) ParameterId lists for each Wolf BundleId created and show `BundleIds` for each channel added
- (flingo64) Support for two sepearate poll cycles to avoid server abuse reactions has been added. 
- (flingo64) Switched AdminUI to `jsconConfig`.

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 MeisterTR <meistertr.smarthome@gmail.com>

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