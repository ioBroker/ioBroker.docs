---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.navimow/README.md
title: ioBroker.navimow
hash: /dfuufJDfFc8U3mcpQlLavm1IFoBpUZi0yttV+6zzWA=
---
![Логотип](../../../en/adapterref/iobroker.navimow/admin/navimow.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.navimow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.navimow.svg)
![Количество установок](https://iobroker.live/badges/navimow-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/navimow-stable.svg)
![Лицензия GitHub](https://img.shields.io/github/license/TA2k/ioBroker.navimow)
![Проблемы на GitHub](https://img.shields.io/github/issues/TA2k/ioBroker.navimow)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/TA2k/ioBroker.navimow)
![узел](https://img.shields.io/node/v/iobroker.navimow)
![НПМ](https://nodei.co/npm/iobroker.navimow.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.navimow/workflows/Test%20and%20Release/badge.svg)

# ioBroker.navimow

## Адаптер Navimow для ioBroker

Адаптер ioBroker для роботизированных газонокосилок [Segway Navimow](https://navimow.segway.com/) . Использует официальный REST API [SDK Navimow](https://github.com/segwaynavimow/navimow-sdk) и MQTT для обновлений в реальном времени.

Сам адаптер работает на всех платформах, на которых работает ioBroker. Для дополнительной карты скошенной травы требуется библиотека [@napi-rs/canvas](https://github.com/Brooooooklyn/canvas) , которая поставляется с предварительно собранными бинарными файлами для Linux (glibc и musl), Windows и macOS на x64 и arm64. Если ни один из предварительно собранных файлов не подходит для хоста, библиотека просто не загружается: адаптер выводит одно предупреждение, карта остается пустой, и все остальное продолжает работать.

## Функции

- Вход через OAuth2 с помощью учетной записи Navimow.
- Обновления статуса в режиме реального времени через MQTT (WebSocket Secure)
- Периодический опрос состояния HTTP совместно с MQTT
- Монитор местоположения MQTT с контролируемым переподключением во время активного кошения
- Пульт дистанционного управления: Запуск, Стоп, Пауза, Возобновление, Подключение к док-станции
- Автоматическое обновление токена при повторном подключении MQTT

Периодический HTTP-опрос обновляет общие значения состояния (например, состояние батареи и состояние транспортного средства), чтобы поддерживать их в актуальном состоянии. Данные о местоположении и ходе кошения (`location.mowingPercentage` Данные предоставляются протоколом MQTT. Во время активного кошения адаптер отслеживает поток данных о местоположении по протоколу MQTT и выполняет контролируемое переподключение MQTT, если обновления местоположения перестают поступать, в то время как HTTP по-прежнему сообщает об активном состоянии кошения.

## Часовой

Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Настраивать

1. Откройте настройки адаптера в административной панели ioBroker.
2. Нажмите **«Открыть страницу входа в Navimow»** , чтобы открыть страницу входа в Navimow.
3. Войдите в систему, используя свою учетную запись Navimow.
4. После входа в систему браузер отображает ошибку «страница недоступна» — это ожидаемо.
5. Скопируйте полный URL-адрес из адресной строки браузера (содержит)`?code=XXXXX` )
6. Вставьте URL-адрес в поле **«Код авторизации»** и сохраните.
7. Адаптер обменивает код на токен и запускается автоматически.

Токен обновляется автоматически. Повторный вход в систему требуется только в случае истечения срока действия токена обновления.

Параметр **«Интервал опроса HTTP»** определяет периодический интервал опроса состояния HTTP в минутах (0 отключает его, максимум — один день). MQTT остается активным параллельно для обновлений в реальном времени. Опрос активируется только после получения ответа от предыдущего, поэтому медленное облачное хранилище не может одновременно запускать два опроса.

Установка интервала на`0` Отключает периодический опрос и полагается исключительно на MQTT. Потому что брокер только отправляет данные.`state` Даже во время работы газонокосилки адаптер продолжает выполнять один HTTP-запрос состояния, если в течение 15 минут не поступает обновление статуса по протоколу MQTT. Без этого резервного варианта батарея и`vehicleState` Они сохраняли бы свои последние значения в течение нескольких часов, пока газонокосилка находится на зарядке и подключена к зарядному устройству.

## Штаты

Для каждого газонокосилки создаются следующие каналы:

| Канал                     | Описание                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `{deviceId}.general`      | Информация об устройстве (название, модель, серийный номер, версия прошивки)                |
| `{deviceId}.status`       | Текущее состояние (состояние транспортного средства, батарея, положение, сигнал)            |
| `{deviceId}.status.json`  | Исходный JSON-файл последнего обновления статуса.                                           |
| `{deviceId}.events`       | События MQTT                                                                                |
| `{deviceId}.attributes`   | Атрибуты устройства MQTT                                                                    |
| `{deviceId}.remote`       | Кнопки пульта дистанционного управления                                                     |
| `{deviceId}.location`     | Отслеживание положения газонокосилки и хода кошения в режиме реального времени (через MQTT) |
| `{deviceId}.diagnostics`  | Диагностика с помощью сторожевого таймера местоположения MQTT                               |
| `{deviceId}.dockPosition` | Положение зарядной станции, с возможностью записи.                                          |

### состояние транспортного средства

Он`status.vehicleState` Состояние содержит текущее состояние газонокосилки.

Данные поступают из MQTT.`state` Как только канал сообщает об изменении, он вызывает соответствующее поле.`state` и HTTP API вызывает его`vehicleState` Однако оба протокола используют одни и те же значения, а HTTP-запрос отвечает из кэша на стороне сервера, который может отставать на одну-две минуты — было замечено, что он сообщает об обратном.`isDocked` Что касается газонокосилки, которая косила траву. Если телеканал штата высказался за последние три минуты, его мнение остается неизменным, и опрос, проведенный в промежутке, не перекрывает его. Пока газонокосилка стоит на месте, канал замолкает, и опрос снова занимает эфирное время.

**Чтобы проверить, работает ли газонокосилка в данный момент, проверьте следующее:`isRunning` :**

```javascript
on({ id: 'navimow.0.DEVICE_ID.status.vehicleState', change: 'any' }, (obj) => {
  if (obj.state.val === 'isRunning') {
    log('Mower is mowing!');
  }
});
```

| Ценить             | Описание                            |
| ------------------ | ----------------------------------- |
| `isRunning`        | Кошение травы                       |
| `isDocked`         | Пристыкован                         |
| `isIdle`           | Праздный                            |
| `isPaused`         | Приостановлено                      |
| `isDocking`        | Возвращение к причалу               |
| `isMapping`        | Картографирование                   |
| `isLifted`         | Снято (Ошибка)                      |
| `Error`            | Ошибка                              |
| `inSoftwareUpdate` | Обновление программного обеспечения |
| `Self-Checking`    | Самопроверка                        |
| `Offline`          | Офлайн                              |

### Пульты дистанционного управления

| Состояние         | Описание                                              |
| ----------------- | ----------------------------------------------------- |
| `remote.Refresh`  | Запустить ручное обновление состояния                 |
| `remote.start`    | Начните косить                                        |
| `remote.stop`     | Приостановите покос (см. ниже)                        |
| `remote.pause`    | Приостановить кошение                                 |
| `remote.resume`   | Возобновить покос травы                               |
| `remote.dock`     | Вернуться к причалу                                   |
| `remote.resetMap` | Очистите карту кошения (только при включенной карте). |

Это кнопки: на них написано, а не прочитано. То, что делает газонокосилка, находится внутри.`status.vehicleState` .

`remote.resetMap`Отбрасывает трек, изображение и рамку этого устройства и начинает карту заново. Это необходимо для того, чего адаптер не может знать самостоятельно — например, для перерисованного газона или разделения его на зоны — и это единственный сброс, при котором также отбрасывается рамка: рамка описывает сад, и именно в случае перерисованного сада стоит снова проводить измерения.

`remote.stop` Приостанавливает выполнение задачи, а не завершает её — в публичном API нет функции «завершения задачи», и`start` Возобновляет задачу, созданную приложением, вместо того, чтобы начинать новую. Сброс прогресса кошения — функция, доступная только в приложении.

### Расположение

Он`location` канал получает данные о местоположении в реальном времени и о ходе кошения (`mowingPercentage` ) через MQTT во время работы газонокосилки. Координаты указаны относительно зоны кошения (в метрах), а не GPS. Эти значения не получены путем периодического опроса состояния по протоколу HTTP.

| Состояние               | Описание                         |
| ----------------------- | -------------------------------- |
| `location.postureX`     | Положение X (м)                  |
| `location.postureY`     | Положение Y (м)                  |
| `location.postureTheta` | Угол поворота (рад)              |
| `location.vehicleState` | код штата транспортного средства |
| `location.time`         | Отметка времени                  |

`location.vehicleState` Это число, и его значение не задокументировано — ни SDK Navimow, ни привязка openHAB не знают соответствия. Поэтому адаптер не преобразует его и передает по мере поступления. Используйте`status.vehicleState` для документально подтвержденного состояния.

Данные о местоположении можно визуализировать в виде карты скашивания с помощью Grafana (например, с помощью панелей Plotly или Geomap) или ioBroker.vis.

### Диагностика

Он`diagnostics` В канале содержатся значения только для чтения, предназначенные для мониторинга местоположения по протоколу MQTT.

| Состояние                            | Описание                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `diagnostics.lastLocationMessage`    | Отметка времени последнего полученного сообщения о местоположении по протоколу MQTT. |
| `diagnostics.locationMqttStale`      | `true` если поток данных о местоположении устарел во время работы газонокосилки      |
| `diagnostics.lastMqttRecovery`       | Временная метка последнего контролируемого восстановления MQTT                       |
| `diagnostics.lastLocationAgeSeconds` | Возраст последнего сообщения о местоположении MQTT в секундах                        |

Если HTTP-опрос сообщает об активном состоянии кошения, но не сообщает о состоянии MQTT`location` Если сообщение получено в течение как минимум трех минут, адаптер помечает поток данных о местоположении как устаревший и переподключается к MQTT. Частота переподключений ограничена одним разом в пять минут на устройство. Батарея, состояние и`vehicleState` Обновление будет продолжаться посредством периодического HTTP-опроса независимо от этого сторожевого таймера.

### Карта покоса травы

Адаптер отображает карту скашивания в реальном времени в виде изображения PNG (URI данных base64) в состоянии`{deviceId}.map` Карта автоматически обновляется во время кошения и очищается при начале новой сессии кошения.

**Карта неверна, если только...`mapEnabled` Установлено.** Это единственная дорогостоящая функция этого адаптера, и система, которая никогда не использует изображение, не должна его оплачивать. В выключенном состоянии ничего не собирается, не принимается решений и не отображается, четыре необходимых состояния не создаются, и единственное, что делают сообщения о местоположении, — это заполнение.`location.*` Как и прежде. Включение вступает в силу при следующем запуске экземпляра, что и так происходит при сохранении настроек. Выключение оставляет состояния в том же состоянии — они сохраняют последнее изображение и фоновую музыку, и удаление этих данных из-за галочки не является решением адаптера.

Отрисовка не бесплатна: вся дорожка размещается на холсте, преобразуется в PNG-файл, и происходит запись состояния в формате base64 размером от 43 до 65 КиБ — около 80 мс в цикле обработки событий для дорожки, занимающей целую сессию, в том же цикле, который принимает сообщения MQTT, из которых состоит карта. Таким образом, позиция ожидает максимум...`mapRenderInterval` Время рендеринга составляет секунды (1–30, по умолчанию 3), и все поступающие за это время позиции отображаются в одном последующем рендере. Две секунды — это максимально плавная работа, о которой сообщает газонокосилка; для слабой травы или большого газона лучше использовать более высокое время. Рендеры, которые должны быть правильными сразу — например, газонокосилка, приближающаяся к док-станции, сброс карты, зарядная станция, перемещенная вручную, — выполняются без ожидания, независимо от настроек.

Новая сессия определяется по данным о ходе кошения, которые отображаются в каждом сообщении о местоположении: для новой сессии она начинается с нуля и продолжается с того места, где остановилась, когда косилка продолжает работу после перерыва на зарядку. Состояние косилки не позволяет отличить одно от другого — косилка, которая подключается к зарядной станции на полпути, а затем снова выезжает, выглядит точно так же, как и косилка, начинающая новую сессию, — поэтому карта очищается, когда прогресс падает ниже последнего зафиксированного значения, а не при изменении состояния. Если косилка вообще не сообщает о ходе работы, карта автоматически очищается при выходе из зарядной станции для кошения; этот механизм отключается навсегда, как только будет зафиксирован хотя бы один прогресс.

Процесс идет правильно, но с задержкой: косилка начинает движение только после того, как скошен целый процент травы, поэтому в первые минуты после выезда из дока косилка все еще показывает данные за предыдущую сессию. Скошенная площадь (`subtotalArea` ) — это то же самое в квадратных метрах, и это поле, которое косилка обнуляет в тот момент, когда приступает к новой задаче — сообщение о начале работы уже содержит`0.0` м² рядом с устаревшими 100 % предыдущей сессии. Таким образом, адаптер очищает карту при снижении площади — снижении, оправдывающем это название, поскольку площадь является вычисленным значением, и один неверный шаг не должен стереть след — и сохраняет прогресс в качестве второго свидетеля для газонокосилок, которые вообще не сообщают о площади. Перерыв на зарядку не приводит к снижению ни одного из них: газонокосилка, которая загрузилась на 224,15 м² и 61 %, вернулась, сообщив о 227,26 м² и 62 %. Площадь является накопителем — за ту же сессию он отслеживал увеличение`mowingWeekArea` с точностью до 0,05 м² — и у недельного счетчика нет причин сбрасываться для зарядки.

Каждое показание потока данных о местоположении считается достоверным только в том случае, если оно является самым новым из отправленных газонокосилкой. Брокер доставляет данные с задержкой: данные о ходе кошения, отправленные в 11:48, были зафиксированы в 13:34, после того как сессия, к которой они принадлежали, завершилась на 100%, и, будучи принятыми за текущие, были восприняты как перезапуск и очистили карту от завершенной сессии. Позиции в одном и том же потоке данных регулярно переупорядочиваются на несколько секунд. Поэтому показание, которое было обойдено, отбрасывается при распаковке сообщения, и после этого с ним ничего не происходит — ни с решением по сессии, ни с треком, ни с чем-либо еще.`location` штаты. Каждый вид чтения имеет свои особенности, отличающиеся друг от друга.`type` Косилка устанавливает метку: одна метка, с интервалом в две секунды, позволяет заглушить процесс кошения, и такие метки ставятся лишь раз в процент.

До получения одного из двух ответов адаптер фиксирует положение гусеницы на момент отъезда газонокосилки, поэтому положения, зафиксированные за это время, сохраняются после сброса, а не удаляются вместе с завершившейся сессией. Если ответа так и не поступает, запуск засчитывается как продолжение через пять минут, и гусеница сохраняется.

Разделение газона на зоны не приводит ни к одному из этих сообщений. Задача по разделению зоны вообще не отправляет никаких сообщений о ходе выполнения — это измеряется за полтора часа работы по зоне, а не за один час, в то время как сессия обработки всего газона отправляет сообщение примерно каждые две минуты — поэтому последние зарегистрированные данные о ходе выполнения могут быть многодневной давности, в то время как газонокосилка косит зону каждый день. Таким образом, это заменяется двумя вещами. Зоны, которые газонокосилка называет в`location.partitionIds` Начинается новая сессия при изменении зоны, когда одна зона сменяется другой. И прогресс, которому больше шести часов, больше не засчитывается как одна: по истечении этого времени газонокосилка, покидающая зарядную станцию, очищает карту, точно так же, как и в случае с газонокосилкой, которая изначально не сообщала о прогрессе. Шесть часов — это намного больше любого перерыва на зарядку — активная сессия не может так затихать — и намного меньше, чем день между двумя покосами. Что это стоит: задача по зоне, которая прерывается для зарядки на более длительный срок, возвращается как новая сессия и теряет собранные данные.`remote.resetMap` предназначено для того, что не подпадает ни под одно из правил.

Каждый сброс также устанавливает`location.mowingPercentage` ,`location.currentMowProgress` и`location.subtotalArea` Сброс к нулю, потому что косилка только увеличивает эти значения, а задача зоны перестает их сообщать: то, что осталось, — это последнее слово сессии, которая закончилась несколько дней назад и отображается как "эта сессия" рядом с картой, которая только что была очищена. Ноль — это то, что было скошено в только что начавшейся сессии. Там, где сброс происходит из сообщения, содержащего информацию о прогрессе, реальные значения записываются поверх них мгновение спустя из того же сообщения.`location.mowingWeekArea` его оставляют в покое — он учитывает неделю, а не сессию.

След за ним проходит в`{deviceId}.mapTrack` в формате JSON,`{ "percentage": 42, "area": 176.5, "progressAt": 1787650712963, "points": [[x, y], …] }` С координатами косилки, округленными до сантиметров. Данные записываются не чаще, чем каждые 30 секунд, пока поступают координаты, и еще раз при остановке адаптера, а также считываются при запуске — таким образом, после перезапуска карта отображает текущую сессию, а не остается зафиксированной на последнем изображении до тех пор, пока косилка снова не начнет движение. Прогресс, площадь скошенной травы и время получения данных о прогрессе сохраняются вместе с данными, поскольку в противном случае перезапуск не смог бы отличить новую сессию от возобновленной, а также определить, является ли текущий прогресс текущим по сравнению с прогрессом, оставшимся от давно завершенной сессии; данные, записанные более старой версией, не содержат информации о прогрессе и поэтому удаляются один раз, при первом запуске после обновления, поэтому карта остается пустой до тех пор, пока косилка снова не начнет движение. Она очищается вместе с картой при начале новой сессии кошения.

#### Стиль трека

Три варианта настройки адаптера определяют способ прокладки трассы, позволяя подобрать цвет, соответствующий изображению сада под ней:

| Параметр         | Диапазон             | По умолчанию | Описание                                                                                                                                            |
| ---------------- | -------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapEnabled`     | вкл, выкл            | выключенный  | Пока эта функция отключена, ничто из нижеперечисленного не применяется, и ничего не собирается и не выводится.                                      |
| `mapLineColor`   | любой цвет           | пустой       | Пустой слой сохраняет градиент от синего в начале до зеленого в текущей позиции.                                                                    |
| `mapLineOpacity` | 0.05 – 1             | 1            | Ниже цифры 1 сквозь дорожку просвечивает фоновое изображение.                                                                                       |
| `mapLineWidth`   | 0.5 – 10             | 1.5          | Ширина линии в пикселях                                                                                                                             |
| `mapMarker`      | точка, газонокосилка | точка        | Текущее положение, представленное в виде красной точки или газонокосилки, если смотреть сверху, изменилось в зависимости от направления её взгляда. |
| `mapMarkerSize`  | 4 – 60               | 10           | Размер маркера в пикселях; для распознавания газонокосилки требуется примерно от 16 до 24 пикселей.                                                 |

Маркер газонокосилки поворачивается`location.postureTheta` Направление движения косилки определяется самой косилкой. Оно начинается с первой позиции в сессии и остается справа, пока косилка стоит на месте. Если в позиции отсутствует указание направления движения, маркер следует за последним пройденным участком. Направление движения перемещается вместе с колеей.`mapTrack` в качестве необязательного третьего элемента каждой позиции, поэтому восстановленный трек сохраняет его, а трек, написанный без него, по-прежнему читается.

Маркеры начальной и текущей позиции сохраняют свои цвета и остаются непрозрачными независимо от движения трассы. Непрозрачность применяется ко всей трассе в целом, а не к каждому сегменту, поэтому участок, по которому газонокосилка проехала дважды, будет не темнее, чем участок, по которому она проехала один раз.

#### Зарядная станция

Карта отображает зарядную станцию, как только узнает её местоположение. API не указывает это — в SDK Navimow нет конечной точки, передающей координаты, — но положение, которое газонокосилка сообщает при приближении к док-станции, — это положение станции, с учётом длины самой косилки, поэтому используется именно это значение.

Его принимают один раз, а затем оставляют в покое:`vehicleState` Данные о местоположении отстают на минуту, поэтому, когда газонокосилка возвращается на место, она по-прежнему отображается как пристыкованная, и для получения второго мнения в этом случае пришлось бы пройтись по станции через весь сад после нее.

Эта должность предполагает проживание в`{deviceId}.dockPosition` как`{"x":…,"y":…}` и может быть записано от руки — для исправления или установки значения без ожидания стыковки. Запись пустого значения приводит к его игнорированию, и следующая стыковка будет проверена заново. Кадр расширяется, чтобы включить станцию, поэтому он не может оказаться за пределами изображения.

#### Размер трека

Газонокосилка сообщает о своем местоположении каждые две секунды и движется по длинным прямым полосам, поэтому большая часть поступающих данных лежит на линии, уже нарисованной на карте. Таким образом, местоположение сохраняется только тогда, когда оно отклоняется как минимум на два сантиметра от прямой линии между соседними объектами — в записанной сессии, в которой местоположения уменьшались вдвое, а нарисованная траектория смещалась максимум на один пиксель.

Трек может содержать 10 000 позиций. На достаточно большом участке, чтобы заполнить это пространство, трек не обрезается спереди — именно эту часть сессии и призвана отображать карта, — а снова истончается с более крупным допуском, так что вся сессия остается видимой, и исчезают только ее детали. В журнале это фиксируется, когда происходит.

#### Рамка для карты

Рамка представляет собой прямоугольник сада в координатах газонокосилки, который покрывает изображение на карте, и она опубликована в`{deviceId}.mapFrame` :

```json
{ "minX": -18, "maxX": 14, "minY": -3, "maxY": 29, "width": 800, "height": 800, "scale": 25 }
```

Изображение **полностью** закрывает кадр — его левый край находится...`minX` его правый край`maxX` его верхний край`maxY` его нижний край`minY` Без рамки вокруг и с одной шкалой для обеих осей. Таким образом, мировая позиция оказывается в точке`(x - minX) * scale` пиксели слева и`(maxY - y) * scale` пикселей сверху. Длина изображения по длинной стороне не превышает 800 пикселей; короткая сторона повторяет форму рамки.

Границы указаны **в метрах в собственной системе координат газонокосилки** — те же числа, что и`{deviceId}.location.postureX` и`postureY` а не пиксели изображения. Адаптер расширяет рамку на два метра, фиксируя ее на целых метрах, всякий раз, когда газонокосилка выезжает за ее пределы, и никогда больше не сужает ее. Она сохраняется после перезапуска и новой сессии кошения, поэтому положение сохраняет свой пиксель от одного рендеринга и одной сессии к другой, что и позволяет накладывать карту поверх фотографии сада.

Поскольку рамка никогда не сужается, случайное отклонение от заданного положения далеко за пределами сада навсегда расширит её. Поэтому положение, находящееся более чем в десяти метрах от предыдущего, не принимается за чистую монету: оно сохраняется до тех пор, пока следующее сообщение либо не подтвердит его — например, косилка действительно находится в другом месте после отъезда от причала — либо не опровергнет, в этом случае оно отбрасывается. Если рамка всё же отображается неправильно, удалите её.`mapFrame` **и**`mapTrack` Проверьте состояние устройства и перезапустите адаптер; рама изготавливается только из направляющей, поэтому необходимо заменить и то, и другое.

#### Сценарий позиционирования VIS

Чтобы разместить значок вашей газонокосилки поверх карты в ioBroker VIS — например, поверх фотографии сада, а не поверх отображаемой трассы — этот скрипт преобразует положение газонокосилки в пиксели вашего изображения VIS. Он считывает границы сада из...`mapFrame` вместо того, чтобы спрашивать вас о них, поэтому нечего измерять и ничего не нужно отслеживать по мере роста каркаса:

```javascript
// === Configuration ===
const deviceId = 'NAVIMOW'; // Your device ID
const prefix = 'navimow.0.' + deviceId;

// Where the image sits in the VIS view and how big it is (px)
const bildX = 580;
const bildY = 573;
const bildPosX = 30;
const bildPosY = 30;

// Robot icon size (px)
const robX = 32;
const robY = 26;

// Datapoints for VIS widget position (create manually)
const dpPosX = '0_userdata.0.Navimow.Pos_X';
const dpPosY = '0_userdata.0.Navimow.Pos_Y';
const dpRotation = '0_userdata.0.Navimow.Rotation';

on({ id: [prefix + '.location.postureX', prefix + '.location.postureY'], change: 'any' }, () => {
  const posX = getState(prefix + '.location.postureX').val;
  const posY = getState(prefix + '.location.postureY').val;
  const frameRaw = getState(prefix + '.mapFrame').val;
  if (posX == null || posY == null || !frameRaw) return;
  const frame = JSON.parse(frameRaw);

  // The map image covers exactly the frame, no border: its corners are the frame's corners.
  const pctX = (posX - frame.minX) / (frame.maxX - frame.minX);
  const pctY = (frame.maxY - posY) / (frame.maxY - frame.minY);

  setState(dpPosX, Math.round(bildPosX + bildX * pctX - robX / 2), true);
  setState(dpPosY, Math.round(bildPosY + bildY * pctY - robY / 2), true);

  // Which way it faces, in degrees clockwise from pointing right - what CSS rotate() wants.
  const theta = getState(prefix + '.location.postureTheta').val;
  if (theta != null) {
    setState(dpRotation, Math.round((-theta * 180) / Math.PI), true);
  }
});
```

**Настраивать:**

1. Используйте`{deviceId}.map` Используйте изображение в качестве фонового для вида VIS — оно уже точно покрывает рамку, поэтому ничего выравнивать не нужно. Чтобы использовать фотографию своего сада, один раз выровняйте фотографию с этим изображением; с этого момента все расчеты остаются теми же, поскольку рамка больше не перемещается.
2. Создайте точки данных`Pos_X` ,`Pos_Y` и`Rotation` под`0_userdata.0`
3. Набор`bildX` /`bildY` в зависимости от размера, в котором отображается изображение, и`bildPosX` /`bildPosY` к своему положению в поле зрения
4. Добавьте виджет VIS со значком газонокосилки и привяжите к нему CSS-код.`left` /`top` к точкам данных местоположения и`transform: rotate(…deg)` к вращению

Если вам нужно только посмотреть на трассу, все это не требуется —`map` Состояние дел представляет собой законченную картину, и`mapMarker` На нем уже нарисована газонокосилка.

## API

Основано на [Navimow SDK](https://github.com/segwaynavimow/navimow-sdk) и [интеграции с Navimow HA](https://github.com/segwaynavimow/NavimowHA) .

| Конечная точка                             | Цель                                            |
| ------------------------------------------ | ----------------------------------------------- |
| `POST /openapi/oauth/getAccessToken`       | Обмен и обновление токенов OAuth2               |
| `GET /openapi/smarthome/authList`          | Найти устройства                                |
| `POST /openapi/smarthome/getVehicleStatus` | Получить статус устройства                      |
| `POST /openapi/smarthome/sendCommands`     | Отправка команд (протокол Google Smart Home)    |
| `GET /openapi/mqtt/userInfo/get/v2`        | Получение учетных данных для подключения к MQTT |

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2026-08-31)

- (typhosj) Start a new mowing session when the mower moves on to another zone, which a lawn split into zones announces in `location.partitionIds`
- (typhosj) Stop letting a mowing progress from a session long over hold the map of that session on screen: past six hours it counts for as little as none at all, and the mower leaving the dock clears the map. A zone task reports no progress whatsoever, so without this the map of the last whole-lawn session stayed up while the mower mowed a zone of it every day
- (typhosj) Put the mowed area and the mowing progress back to zero when a session is reset, so a zone run no longer shows the area and the percentage of a session days over
- (typhosj) Add `remote.resetMap`, which clears the track, the picture and the frame — for a lawn re-mapped or split into zones, where the adapter cannot see that a session ended
- (typhosj) Write the position, the heading and the two areas as numbers: the mower sends them as strings, so `location.postureX`, `postureY`, `postureTheta`, `subtotalArea` and `mowingWeekArea` used to be `text`/`string` states that no chart could draw and no script could compare without parsing them again
- (typhosj) Give the measured states their unit — metres, radians, square metres, percent — instead of naming it in brackets in the state's name

### 1.1.1 (2026-08-18)

- (typhosj) Register a release in Sentry only where a token for it is configured: without one `sentry-cli` answers 401 and fails the whole deploy job, after npm has already published

### 1.1.0 (2026-08-18)

- (typhosj) The remote controls are buttons now: they are written, not read, and no longer carry the mower state, which `status.vehicleState` says anyway
- (typhosj) Put the keys of every cloud payload through `FORBIDDEN_CHARS` before `json2iob` makes object ids of them, so a key the API spells with a forbidden character cannot land as an id nobody can address
- (typhosj) Arm the next status poll only once the one before it has come back, instead of on a fixed interval
- (typhosj) Cap the polling interval at a day in the adapter too, not only in the settings dialog
- (typhosj) Keep the authorization code out of the debug log and store it encrypted and protected
- (typhosj) Say in the README that the mowing map needs a prebuild of `@napi-rs/canvas`, that `stop` pauses rather than ends the job, and drop the German quotes from the setup steps
- (typhosj) Translate the admin settings into all eleven languages ioBroker asks for, from an `admin/i18n` folder instead of labels written into `jsonConfig.json`
- (typhosj) Say the length of the access token in the debug log instead of the first twenty characters of it, and keep the body of a failed token refresh out of the log entirely
- (typhosj) Put the device id through `FORBIDDEN_CHARS` before it becomes an object id, whether it came from the cloud or from an MQTT topic
- (typhosj) Fix the type check and let CI run it, so it cannot go red again unnoticed
- (typhosj) Require node.js 22, publish through npm's trusted publishing, and let the tests wait for lint and the type check
- (typhosj) Move the oldest changelog entries to `CHANGELOG_OLD.md`, and add `@iobroker/adapter-dev` so the `translate` script has the tool it calls

### 1.1.0-rc.0 (2026-08-17)

- (typhosj) Report a cloud outage after three failed polls instead of the first one, and let a single 502 pass as a warning
- (typhosj) Warn on a dropped MQTT connection and only report an error once it persists, because the broker takes most of them back within seconds
- (typhosj) Do not clear the map when the mower reports no task, which emptied the track of the last session overnight
- (typhosj) Log a failed API call as one readable line instead of the HTML error page a gateway answers with
- (typhosj) Draw the mower in the dock while the track is still empty, so it does not go missing from the picture after a session reset
- (typhosj) Keep the charging station on the map through a session reset, so the map is not blank while the mower is still leaving the dock
- (typhosj) Stop collecting positions while the mower stands in the dock, so its pose drift no longer grows the track and widens the map overnight
- (typhosj) Keep the MQTT connection alive while the mower stands still, so the position stream no longer dies out silently after ten idle minutes
- (typhosj) Ignore the all-zero posture a standing mower sends, so the marker no longer jumps off the map
- (typhosj) Render a live mowing map as a PNG in `{deviceId}.map`, drawn in a fixed frame so the picture stays put while the mower is out (#7)
- (typhosj) Keep the mowing track in `{deviceId}.mapTrack`, so the map survives an adapter restart instead of freezing on its last image (#7)
- (typhosj) Decide a new mowing session by the mowing progress, so a charging break no longer throws away the track of a session that is still running (#23)
- (typhosj) Keep the first minute of a new session, which the mower still reports as the one before (#23)
- (typhosj) Clear the map on the mowed area falling back to zero, which the mower reports minutes before the mowing progress catches up (#23)
- (typhosj) Ignore a mowing progress the broker delivers late, which read as a new session and cleared the map of one that had just finished (#23)
- (typhosj) Ignore every late location reading, not only the mowing progress, so an overtaken position no longer reaches the track or the states either (#23)
- (typhosj) Subscribe every MQTT channel once instead of twice, so each message is parsed and stored once
- (typhosj) Keep the mower state value list off `location.vehicleState`, which is a number and can never take any of them
- (typhosj) Stop refreshing the OAuth token once per failed MQTT connect attempt, without giving up the refresh that recovers an expired one
- (typhosj) Look for devices again on every poll, so a discovery that failed at startup no longer leaves the adapter idle until it is restarted by hand
- (typhosj) Try a failed token refresh again instead of dropping the chain, so a network outage over a refresh window no longer takes the adapter offline until a restart
- (typhosj) Load the canvas library on first use, so a host without a prebuild for it runs the adapter without a map instead of not running it at all
- (typhosj) The mowing map is a setting now and off by default, so an installation that does not want it pays nothing for it (#7)
- (typhosj) Keep the whole session in the track rather than its last 5000 positions, so the beginning no longer disappears off the map while the mower is still out (#7)
- (typhosj) Track colour, opacity and width can be set, so the map can be laid over a picture of the garden (#7)
- (typhosj) Draw the map at most every `mapRenderInterval` seconds instead of on every position, so a session no longer spends minutes of event loop and state writes on pictures nobody sees (#7)
- (typhosj) Stop the disconnect watchdog from asking for a timer while the adapter is shutting down, which only earned a warning in the log
- (typhosj) Publish the mower state from the MQTT state channel instead of the lagging HTTP cache
- (typhosj) Refresh the status over HTTP when MQTT goes quiet in MQTT-only mode (#18)
- (TA2k) Retry the MQTT connection after a transient credential failure (#18)
- (TA2k) Keep the MQTT broker password and the refresh token out of the debug log
- (TA2k) Read the battery level from `capacityRemaining` again
- (typhosj) HTTP polling defaults to 5 minutes and can be switched off with 0; the admin UI checks the range
- (typhosj) Fix the findings of the ioBroker repository checker (#11)

### 1.0.2 (2026-04-04)

- (TA2k) Add MQTT location topic with real-time position tracking
- (TA2k) Generic MQTT topic handling via wildcard subscription

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 TA2k <tombox2020@gmail.com>

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