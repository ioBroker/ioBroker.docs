---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: TCQcEbkT+dh0CSgRwx3z9y3is6KyOiewdftW3kXqibk=
---
![Логотип](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Количество установок (последние)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# ioBroker.wolf-smartset

## адаптер wolf-smartset для ioBroker

Подключите вашу систему отопления Wolf к iobroker.

Этот адаптер подключается к серверу Wolf Smartset ( <https://wolf-smartset.com> ) для мониторинга и управления вашим отопительным устройством Wolf. Это не локальное подключение. Преимущество заключается в том, что вы можете использовать приложение Wolf Smartset или [портал Wolf Smartset](https://wolf-smartset.com) , а также одновременно получать или устанавливать значения параметров в ioBroker.

## Требования

Для работы устройства Wolf для отопления/кондиционирования воздуха необходимо установить модуль ISM7i WLAN/LAN (также известный как Link Home), подключенный к серверу Wolf Smartset, а также авторизовать учетную запись Wolf Smartset для вашего устройства.

## Настройки экземпляра адаптера

### Вкладка: Основные настройки

#### Учетная запись Wolf Smartset

Для подключения к серверу Wolf Smartset вам потребуется ваше устройство.

- `Username` и
- `Password`

который вы также используете для входа в приложение Wolf Smartset или на [портал Wolf Smartset](https://wolf-smartset.com) .

#### Устройство Волка

Ваша учетная запись Wolf связана с одним или несколькими устройствами Wolf. Для каждого устройства требуется отдельный экземпляр адаптера ioBroker.

После первой установки вам необходимо выбрать конкретный вариант.

- `Device` для каждого случая.

Как только вы ввели действительный ввод`Username` и`Password` тот

- `List of Wolf Devices` будет заполнена данными об устройствах, привязанных к вашей учетной записи.

После выбора устройства из списка нажмите на

- `USE THIS DEVICE` Для подтверждения вашего выбора.

### Вкладка: Расширенные настройки

Расширенные настройки позволяют адаптировать работу адаптера к вашим потребностям. Как правило, все расширенные настройки можно оставить по умолчанию.

#### Интервалы циклов опроса и списки параметров

После подключения к серверу Wolf Smartset адаптер будет периодически опрашивать сервер о значениях параметров.

- `Poll all Parameters` Адаптер всегда будет опрашивать все параметры, найденные на сервере. Эта стратегия опроса обратно совместима с версией адаптера 1.x.

Адаптер также поддерживает более сложную стратегию опроса, основанную на двух независимых циклах опроса с различными интервалами.

- `Short Poll Cycle Interval` Введите интервал в **секундах** . Сервер Wolf Smartset задает абсолютный минимальный интервал опроса (в настоящее время 60 секунд), который не следует превышать. Если вы зададите значение ниже этого минимального интервала, сервер не будет отвечать должным образом или может даже разорвать вашу сессию. Адаптер периодически запрашивает у сервера текущий минимальный интервал опроса. Если настроенный интервал опроса ниже минимального интервала опроса, указанного сервером, вы получите предупреждение от адаптера, и вам следует соответствующим образом скорректировать интервал опроса.
- `Long Poll Cycle Interval` Введите интервал в **минутах** для второго цикла опроса.

Сервер Wolf Smartset группирует различные параметры устройств в разные пакеты, идентифицируемые числовым идентификатором BundleId. В **административном интерфейсе ioBroker** идентификаторы BundleId для различных групп параметров можно найти в представлении **объектов** под экземпляром **wolf-smartset** на уровне канала.

- `Parameters of Bundle` В этой таблице вы можете определить, какая группа значений параметров должна опрашиваться в каком цикле опроса. Рекомендуется:
  - `Include in Short Poll Cycle` все быстро меняющиеся значения параметров (например, рабочие состояния) и для
  - `Include in Long Poll Cycle` Значения параметров (например, параметры конфигурации устройства) изменяются очень редко.

API Wolf Smartset требует, чтобы каждый запрос на опрос включал, помимо списка параметров для опроса, также BundleId. Не совсем ясно, как BundleId соотносится с фактическим списком параметров, но в большинстве случаев значение «Default» должно быть приемлемым: оно соответствует наибольшему выбранному BundleId для данного цикла опроса. Любые другие настройки здесь предназначены для экспериментального использования. Настройте BundleId для использования следующим образом:

- `BundleId for Short Poll Cycle`
- `BundleId for Long Poll Cycle`

Если вы настроили`Poll all Parameters` В запросах на опрос значение BundleId установлено на 1000. Это, вероятно, исключит некоторые параметры Expert (см. ниже) из результата. Поэтому, если вы планируете опрашивать параметры Expert, вам, вероятно, не следует использовать этот метод.`Poll all Parameters` .

#### Вход для экспертов

API Wolf Smartset определяет два уровня доступа к параметрам устройства: **Пользовательский** и **Экспертный** . Соответственно, в представлении **объектов** **административного интерфейса ioBroker** вы найдете два соответствующих поддерева: **Benutzer** и **Fachmann** . После первоначальной аутентификации адаптер находится в Пользовательском режиме и получает все доступные значения параметров только один раз во время инициализации. После этого во время периодических опросов он будет получать только обновления значений параметров Пользовательского уровня (т.е. значения в дереве **Benutzer** ).

Если вы проверите

- `Do Expert Login` и введите правильный
- `Expert Password` ,

Адаптер выполнит экспертную авторизацию во время инициализации, а также будет получать периодические обновления значений параметров экспертного уровня (как показано в дереве **Фахмана** ) в течение цикла опроса, к которому они относятся.

**!!! Важное примечание об уровне «Эксперт»: Начало !!!**

Уровень «Эксперт» ведет себя как ящик Пандоры! Тесты показали, что выйти из этого уровня после его включения довольно сложно. Хотя при отключении адаптер полностью выходит из системы и удаляет все локально кэшированные данные аутентификации (токены OpenID и идентификатор сессии).`Do Expert Login` Похоже, что настройка и перезапуск экземпляра не подходят для сервера Wolf Smartset.

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

Хотя на первый взгляд оставаться в экспертном режиме не кажется слишком проблематичным, есть как минимум один побочный эффект, который может стать для вас настоящей проблемой:

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

Это затрагивает, в частности, следующие ParameterIds, а возможно, и другие:

```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

Таким образом, если вы полагаетесь на постоянную и точную поставку таких статистических данных за предшествующий период, вам следует дважды подумать, стоит ли их проверять.`Do Expert Login` Не жалуйтесь, если у вас возникнут проблемы с возвратом к уровню пользователя, вы предупреждены!

**!!! Важное примечание об уровне эксперта: Конец !!!**

#### Проверьте наличие изменений публичного IP-адреса.

Сервер Wolf Smartset учитывает IP-адреса клиентов. Это означает, что он связывает некоторую информацию о состоянии приложения с публичным IP-адресом клиентского приложения. Таким образом, если вы настроили`Do Expert Login` Если публичный IP-адрес адаптера изменится (например, после перезагрузки маршрутизатора), адаптеру потребуется повторно пройти аутентификацию на сервере Wolf Smartset, чтобы снова включить экспертный режим. Поскольку повторная аутентификация будет выполняться только каждый час, может потребоваться до **одного часа, прежде чем адаптер снова перейдет в экспертный режим** .

Если это для вас слишком долго, вы можете проверить.

- `Enable Public IP Checking` В этом случае адаптер будет проверять ваш публичный IP-адрес через [ipify.org](https://ipify.org) **каждые 4 коротких цикла опроса** и запускать повторную аутентификацию при изменении адреса. Таким образом, адаптер вернется в экспертный режим **не позднее чем через 4 коротких цикла опроса** .

#### Профилирование API

Профилирование API позволяет отслеживать использование адаптера Wolf Smartset API. Если вы

- `Enable API Profiling` При каждом запросе на опрос адаптер будет обновлять следующие объекты в **дереве объектов экземпляра адаптера** :
  - info\_api
    - poll\_req\_bundle\_id: идентификатор пакета (BundleId), используемый в запросе на опрос.
    - poll\_req\_num\_params: количество параметров, запрошенных адаптером.
    - poll\_resp\_num\_params: количество параметров, возвращаемых сервером.
    - poll\_resp\_num\_params: количество значений параметров, возвращаемых сервером (возвращаемые параметры могут иметь или не иметь связанное с ними значение).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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