---
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miboxer-wl433/README.md
title: ioBroker.miboxer-wl433
hash: cIg8cEoRyLm1TUeCCEnX+dGJZ5barpPrxThodcMgh/A=
---
![Логотип](../../../en/adapterref/iobroker.miboxer-wl433/admin/miboxer-wl433.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.miboxer-wl433.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.miboxer-wl433.svg)
![Количество установок](https://iobroker.live/badges/miboxer-wl433-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/miboxer-wl433-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.miboxer-wl433.png?downloads=true)
![Тестирование и выпуск](https://github.com/ssbingo/ioBroker.miboxer-wl433/workflows/Test%20and%20Release/badge.svg)

# IoBroker.miboxer-wl433
---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img alt="Купи мне кофе" src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## Адаптер для подсветки бассейна MiBoxer WL-433 для ioBroker
Локальное управление освещением для бассейна **MiBoxer PW01 / PW02** LoRa (433 МГц) через шлюз **MiBoxer WL-433** - без облачных сервисов, без голосового помощника, непосредственно в вашей локальной сети.

Производитель: [MiBoxer (Futlight Optoelectronics)](https://miboxer.com/) - страницы товара: [Шлюз WL-433](https://miboxer.com/product/lora-433mhz-gateway), [Подсветка бассейна PW01](https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz), [FUT086 пульт](https://miboxer.com/product/8-zone-lora-433mhz-remote-control)

### Отказ от ответственности
Это **неофициальный проект сообщества**. Он **не связан, не одобрен и не поддерживается** компанией Shenzhen Futlight Optoelectronics Co., Ltd. (MiBoxer / Mi-Light) или компанией Tuya. «MiBoxer», «Mi-Light» и «Tuya» являются товарными знаками соответствующих владельцев и используются только для описания совместимости устройств. Используйте этот адаптер на свой страх и риск.

### Как это работает
Шлюз WL-433 содержит модуль Wi-Fi Tuya. Для локальной сети это **одно** устройство Tuya - все подключенные к нему лампы управляются через это единственное устройство, шлюз пересылает команды на лампы по протоколу LoRa (433 МГц).
Адаптер взаимодействует со шлюзом напрямую по протоколу **Tuya LAN Protocol 3.3** (TCP-порт 6668, шифрование AES с использованием локального ключа устройства), основанному на проверенной библиотеке [туяпи](https://github.com/codetheweb/tuyapi) (также используемой ioBroker.tuya). Поддерживаются также версии протокола 3.1, 3.4 и 3.5 на случай, если обновление прошивки изменит это.

Управление лампами, зонами и сценариями осуществляется с помощью собственных команд шлюза, указанных в **базовом файле данных 101** - тех же команд, которые отправляет приложение MiBoxer. Шлюз сообщает о своем состоянии таким же образом; адаптер также запрашивает его при подключении и при каждом обновлении состояния.

```text
ioBroker (this adapter) ──LAN: Tuya protocol 3.3, TCP 6668──► WL-433 ──LoRa 433 MHz──► PW01 / PW02
```

**Руководство пользователя** с подробным описанием каждого шага для начинающих (установка, настройки, зоны, таймеры, примеры, устранение неполадок): [[Английский](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) ([PDF]](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Manual_miboxer-wl433.pdf)) · [Deutsch](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Handbuch_miboxer-wl433.pdf)).

Исходные данные (анализ протокола, источники, план тестирования, расшифрованная точка данных 101) доступны на немецком языке: [doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.pdf)). Руководство для начинающих по подключению ламп к шлюзу: [doc/Guide_connect_PW01_to_WL-433.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_connect_PW01_to_WL-433.pdf); немецкий: [PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf)).

### Поддерживаемое оборудование
| Устройство | Роль | Статус |
| --- | --- | --- |
| Шлюз MiBoxer WL-433 LoRa 433 МГц | Требуется, адаптер подключается к нему | Протестировано с реальным шлюзом (протокол Tuya 3.3, точка данных 101) |
| MiBoxer PW01 (27 Вт RGB+CCT PAR56) | Подсветка для бассейна, подключенная к шлюзу | Целевое устройство |
| MiBoxer PW02 (18 Вт RGB+CCT PAR56) | Подсветка для бассейна, подключена к шлюзу | Та же линейка продуктов, ожидается совместимость |
| Другие лампы MiBoxer LoRa 433 МГц (UW01, UW02, UW03, RD-9L) | Лампы, подключенные к шлюзу | Не тестировались |

### Предварительные условия
1. Шлюз настраивается в приложении MiBoxer, и лампы подключаются к нему.
2. **Идентификатор устройства и локальный ключ** шлюза. Производитель не поддерживает платформу разработчика Tuya для данного устройства.

WL-433, но приложение MiBoxer записывает оба значения в свой отладочный журнал: на Android читайте журнал с помощью программы просмотра logcat, например *LogFox*, пока приложение запускается и управляет шлюзом. **Локальный ключ меняется при каждом повторном сопряжении шлюза** - тогда его нужно прочитать и ввести заново. Пошаговое руководство для начинающих (для Android, iPhone и iPad): [doc/Guide_device-ID_and_local-key.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_device-ID_and_local-key.pdf); немецкий: [doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md)).

3. Шлюз доступен из ioBroker (в той же сети). Рекомендуется зарезервировать DHCP-адрес для шлюза; если IP-адрес отсутствует

После настройки адреса адаптер обнаруживает шлюз через его UDP-широковещательные сообщения (порты 6666/6667).

4. **Устройства Tuya обычно поддерживают только одно локальное подключение.** В ходе тестирования приложение MiBoxer и адаптер были подключены друг к другу.

В то же время, но если соединение постоянно обрывается, закройте приложение на телефонах в той же сети и не управляйте шлюзом одновременно с помощью других локальных интеграций (ioBroker.tuya, Home Assistant, tinytuya).

### Конфигурация
В настройках экземпляра есть две вкладки: **Шлюз** (подключение и управление зонами) и **Таймеры** (см. [Таймеры](#timers)).

| Настройки (вкладка «Шлюз») | Описание |
| --- | --- |
| Идентификатор устройства | Идентификатор устройства Tuya шлюза WL-433 |
| Локальный ключ | 16-символьный локальный ключ Tuya (хранится в зашифрованном виде) |
| IP-адрес шлюза | Оставьте поле пустым, чтобы шлюз автоматически находился в локальной сети |
| Версия протокола Tuya | 3.3 для WL-433 (доступны версии 3.1, 3.4 и 3.5) |
| Поиск шлюза в локальной сети | Кнопка: находит шлюз по его идентификатору устройства и заполняет поля IP-адреса и версии протокола. Без идентификатора устройства отображает список всех найденных устройств Tuya |
| Задержка повторного подключения | Количество секунд до повторной попытки подключения после потери или сбоя соединения (по умолчанию 30) |
| Интервал обновления статуса | Количество секунд между полными запросами статуса (по умолчанию 60, 0 = использовать только обновления, отправленные шлюзом) |
| Управление зонами | *Выбор зоны* (по умолчанию) или *один канал на зону*, см. [Зоны](#zones) |

### Зоны
Шлюз управляет до 8 зонами (как и пульт дистанционного управления FUT086). Каждая команда может быть отправлена в одну зону или во все зоны, но шлюз отображает **только один статус для всех ламп: последнюю настройку, в зависимости от зоны, в которую она была отправлена**. Приложение MiBoxer также не отображает отдельный статус для каждой зоны. Настройка *Управление зонами* предлагает два варианта:

| Вариант | Штаты | Подходит для |
| --- | --- | --- |
| **Селектор зон** (по умолчанию) | `light.*` показывает состояние шлюза. `light.zone` (0 = все зоны, 1-8) выбирает зону, в которую отправляются команды `light.*`. | Для большинства пользователей: каждое состояние показывает, что сообщает шлюз |
| **Один канал на зону** | `light.*` отображает состояние шлюза и отправляет данные во все зоны. Кроме того, `zones.zone1` … `zones.zone8` управляют каждой зоной отдельно. Канал зоны отображает последние значения, отправленные в эту зону и подтвержденные шлюзом; он остается пустым до тех пор, пока в зону не будет отправлено какое-либо сообщение. | Скрипты и визуализации, которые напрямую взаимодействуют с зонами |

При изменении настроек состояния другого варианта удаляются.

### Таймеры
Вкладка **Таймеры** в настройках экземпляра содержит до **50 таймеров**. Они работают локально в адаптере, даже без интернета, и могут делать больше, чем таймеры приложения MiBoxer: события солнца со смещением, случайное изменение, сезон, зоны, цвета, сцены и выключение через определенный промежуток времени. Добавить таймер можно с помощью **+**, открыть его для изменения, скопировать или удалить с помощью кнопок в поле ввода. Изменения вступают в силу после сохранения настроек (перезапуска экземпляра).

| Поле | Описание |
| --- | --- |
| Активно | Выключает этот таймер, не удаляя его |
| Имя | Отображается в журнале и в `timers.overview` |
| Триггер | *Время суток* или солнечное событие: рассвет, восход солнца, золотой час (вечер), закат, сумерки, ночь |
| Время суток | Только для триггера *Время суток* |
| Смещение | Минуты (−720 до 720), отрицательное значение = раньше - например, закат −15 |
| Случайное смещение | До ± минут (0-120), генерируется заново для каждого запуска - для имитации присутствия |
| Сезон от / до | `DD.MM.`, например, `01.05.` до `30.09.`; сезон, охватывающий весь новый год (`01.11.` до `28.02.`), также подходит; пусто = весь год |
| Сезон с / по | `ДД.ММ.`, например, с `01.05.` по `30.09.`; сезон, охватывающий весь новый год (`01.11.` по `28.02.`), также подходит; пусто = весь год |
| Зона | Все зоны или зоны 1-8 |
| Действие | Включение, выключение, белый свет (цветовая температура 2700-6500 K), цвет, сцена M1-M9, только яркость |
| Яркость | 1-100 %, пустое значение = без изменений (не для выключения) |
| Выключить через | Минут (0-1440), 0 = не выключать (не для *Выключить*) |

- **Солнечные события** рассчитываются на основе данных о местоположении, указанных в настройках системы ioBroker (широта и долгота).

[солнечный кальций](https://github.com/mourner/suncalc). Без указания местоположения эти таймеры игнорируются с предупреждением. В дни, когда событие не происходит (полярные регионы), таймер не запускается.

- Таймер отправляет те же команды, что и состояния: в режиме зоны *селектор зоны* в свою зону (`light.zone` не является

изменено), в режиме *один канал на зону* через `zones.zone<n>` (все зоны: `light.*`). Шлюз подтверждает их как любую другую команду.

- Если шлюз не подключен к моменту истечения таймера, этот запуск пропускается (предупреждение в журнале) - он не повторяется.

  позже.

- Таймеры с неполными настройками игнорируются; в журнале и файле `timers.overview` указана причина.
- Указано местное время системы ioBroker; учитывается переход на летнее время.
- Таймеры приложения MiBoxer хранятся и запускаются в облаке Tuya (они только включают или выключают все зоны).

(точка данных 20 и требуется интернет). Адаптер не может считывать или изменять их, но видит их влияние в состоянии.
Оба типа таймеров можно использовать одновременно.

### Штаты
| Штат | Описание |
| --- | --- |
| `info.connection` | Подключение к шлюзу |
| `light.on` | Вкл. / выкл. |
| `light.mode` | `white`, `colour` или `scene` - ввод этого параметра переключает режим (цветовой режим с последним оттенком, режим сцены с последней сценой) |
| `light.brightness` | Яркость 1-100 % от текущего режима. Значение 0 выключает, значение выше 0 включает |
| `light.colorTemperature` | Цветовая температура 2700-6500 K с шагом 100 K (переключается в белый режим) |
| `light.color` | Цвет как `#rrggbb` при максимальной яркости (переключается в цветовой режим). При записи задаются оттенок и насыщенность, яркость значения RGB игнорируется - используйте `light.brightness` |
| `light.hue` | Оттенок 0-360° (переключает в цветовой режим) |
| `light.saturation` | Насыщенность 0-100 % (переключение в цветовой режим) |
| `light.scene` | Сцена 1-9 (M1-M9 в приложении), 0 = сцена отсутствует. Написание 1-9 запускает сцену |
| `light.speedUp` / `light.speedDown` | Кнопки S+ / S- приложения: скорость сцены выше/ниже. Шлюз не сообщает скорость |
| `light.countdown` | Количество секунд до переключения ламп шлюзом (0 = выключено, стандартная точка данных 26) |
| `light.zone` | Только с селектором зоны: зона команд `light.*`, 0 = все зоны, 1-8 |
| `zones.zone<n>.*` | Только с одним каналом на зону: `on`, `mode`, `brightness`, `colorTemperature`, `color`, `hue`, `saturation`, `scene`, `speedUp`, `speedDown` для зоны n |
| `settings.dmxAddress` | Начальный адрес 1-512 входа DMX512 шлюза - оттуда используются 5 каналов: красный, зеленый, синий, холодный белый, теплый белый (меню *DMX* в приложении). Запись отправляет сигнал в зону `light.zone` (селектор зон) или во все зоны; шлюз подтверждает это. |
| `timers.active` | `false` приостанавливает все таймеры (например, во время праздников или при запуске скрипта), `true` запускает их снова |
| `timers.nextRun` | Следующий таймер запускается с именем предыдущего таймера (`paused (…)`, а `timers.active` - с именем `false`) |
| `timers.lastRun` | Последний запуск таймера с указанием имени и действия |
| `timers.overview` | JSON-список всех таймеров: расписание, действие, следующий запуск, причина игнорирования таймера |
| `dp101.raw` | Последняя точка данных 101 кадра в формате Base64 - при записи значение отправляется без изменений |
| `dp101.hex` | Последняя точка данных 101 кадра в шестнадцатеричном формате - запись отправляет кадр, контрольная сумма добавляется или исправляется автоматически |
| `dp101.checksumValid` | Контрольная сумма последнего кадра действительна |
| `dp101.history` | JSON-список последних 50 кадров (`rx` = получен, `tx` = отправлен) с меткой времени; повторяющиеся одинаковые ответы о статусе не добавляются |
| `raw.dp<n>` | Каждая последующая точка данных, которую сообщает шлюз, создается автоматически (доступна для записи) |
| `raw.dp<n>` | Каждая последующая точка данных, которую сообщает шлюз, создается автоматически (доступна для записи) |

Значения, требующие выбора режима или включения освещения, отправляются так же, как и в приложении MiBoxer: например, цветовая температура в цветовом режиме сначала переключается в белый режим, а яркость в выключенном состоянии сначала включает свет. Быстрые изменения (например, с помощью ползунка) объединяются, отправляется только последнее значение. Команды принимаются только во время подключения шлюза. Команда считается выполненной, когда в следующем статусе шлюза отображаются её значения (примерно через 2,5 секунды); до этого момента состояние не подтверждается.

### Основы работы с данными - протокол
Устройство WL-433 передает информацию о лампах, зонах и сценах в формате данных 101, специфичном для производителя: 12-байтовые кадры, закодированные в Base64, последний байт представляет собой 8-битную сумму байтов 0-10. Этот формат был декодирован 22.09.2026 из кадров состояния реального шлюза и команд, которые приложение MiBoxer записывает в свой журнал Android:

| Кадр | Байты (шестнадцатеричное значение) | Значение |
| --- | --- | --- |
| Команда (приложение / адаптер → шлюз) | `41 00 00 0B cc vv vv vv vv zz 80 ss` | `cc` команда: `01` оттенок 0-255 (значение в байтах 5-8, переключает в цветовой режим), `02` яркость 1-100 %, `03` цветовая температура 0-38 (2700 K + 100 K с шагом), `04` насыщенность 0-100 %, `05` сцена 1-9, `06` клавиша (`01` включено, `02` выключено, `03` S-, `04` S+, `06` белый режим); `zz` зона: `00` все, `01`-`08` |
| Статус (шлюз → приложение) | `42`/`44` `00 00 00 mm hh tt bb ss 0B dd xx` | `42` отчет об изменениях (примерно через 2,5 с после последнего изменения), `44` ответ на запрос; `mm` режим: `00` выключено, `01` цветной, `02` белый, `03`-`0B` сцены 1-9; `hh` оттенок, `tt` шаг цветовой температуры, `bb` яркость, `ss` насыщенность (0 в белом режиме), `dd` младший байт начального адреса DMX. Зона не является частью состояния |
| Начальный адрес DMX | `49 00 00 0B 02 aa aa 00 00 zz 80 ss` | `aa aa` адрес 1-512 (старший байт, младший байт), `zz` зона; ответ `49 00 00 0B 02 01 tt bb ss aa aa xx` |
| Начальный адрес DMX | `49 00 00 0B 02 aa aa 00 00 zz 80 ss` | Адрес `aa aa` 1-512 (старший байт, младший байт), зона `zz`; ответ `49 00 00 0B 02 01 tt bb ss aa aa xx` |

Ключ `06 05` также выключает свет (второй раз он остается выключенным, это не переключатель); чем он отличается от `06 02`, пока неизвестно, адаптер его не использует. Стандартные точки данных 20-23 определяются шлюзом на основе этих команд; адаптер использует только точку данных 20 (вкл/выкл, сообщается раньше, чем статус) и следует статусу точки данных 101 для всего остального. Запись точки данных цвета Tuya 24 не меняет цвет ламп - приложение MiBoxer также ее не использует.

Прямой доступ для ваших собственных экспериментов: `dp101.hex` принимает 11 байтов (контрольная сумма добавляется), например:

`43 00 00 80 00 00 00 00 00 80 80` запрашивает статус.

### Ограничения
- Шлюз отображает один и тот же статус для всех ламп (последняя настройка), а не статус каждой зоны отдельно - см. [Зоны](#зоны).
- Скорость сцены (S+ / S-) не отображается шлюзом.
- Получить ли лампе команду по LoRa невозможно: статус определяется шлюзом.
- Шлюз по-прежнему передает информацию о своем состоянии в облако Tuya. Полная блокировка доступа в интернет может привести к его неработоспособности.

Ненадежно. Таймерам приложения MiBoxer требуется облачное хранилище, а таймерам адаптера - нет.

### Ведение журналов и отладка
Адаптер ведет журналы в соответствии с установленной концепцией, поэтому журнал может быть полезен для устранения неполадок в любое время:

| Уровень | Что регистрируется |
| --- | --- |
| ошибка | Ошибки конфигурации, препятствующие работе адаптера (отсутствует идентификатор устройства, локальный ключ не содержит 16 символов) |
| Предупреждение | Проблемы, требующие немедленного решения - сообщались один раз и повторялись только на уровне отладки до их устранения: шлюз отклоняет соединения, данные, которые невозможно декодировать (неверный локальный ключ), команды, которые шлюз не подтвердил, запросы состояния, на которые не был дан ответ, неожиданные значения точек данных или кадров состояния, таймеры с неполными настройками или без указания положения для солнечных событий, таймеры, которые не смогли переключить освещение, адрес запуска DMX, который шлюз не подтвердил |
| информация | Этапы: сводка конфигурации в начале, шлюз найден, соединение установлено, соединение потеряно, соединение снова стабильно, объекты другого варианта зоны удалены, количество активных таймеров, таймеры приостановлены или снова активны |
| отладка | Каждый шаг с его входными данными, решениями и длительностью: изменение состояния → преобразование в 101 кадр данных (с указанием причины добавления кадров, например, «сначала включение») → очередь команд → отправка → подтверждение по статусу (или по отсутствующему значению), каждая полученная точка данных и статус, а также обновляемые ею состояния, запросы статуса, обнаружение, каждый таймер с его расписанием, следующий запуск (солнечное событие, смещение, случайный сдвиг) и выполнение. Команды (`#12`) и попытки подключения (`Attempt #3`) нумеруются, поэтому можно проследить все строки одной команды |
| глупый | Кроме того, трассировка протокола библиотеки tuyapi (пакеты, пинг/понг) с тегом `[tuyapi]` |

Каждое сообщение начинается с тега компонента: `[cfg]` конфигурация, `[conn]` соединение, `[rx]` шлюз → состояния, `[cmd]` состояния → команды, `[queue]` очередь команд, `[poll]` обновление состояния и запрос состояния, `[disc]` обнаружение, `[dp101]` необработанные кадры, `[timer]` таймеры, `[unload]` завершение работы, `[tuyapi]` трассировка библиотеки. Локальный ключ и ключи сессии никогда не отображаются в журнале - в сводке конфигурации отображается только длина ключа.

Чтобы изменить уровень: Администрирование → **Экземпляры** → экспертный режим → уровень логирования `miboxer-wl433.0` → `debug` (или `silly` для трассировки протокола; после этого перезапустите экземпляр). При сообщении о проблеме, пожалуйста, приложите отладочный журнал и содержимое `dp101.history`.

## Разработка
`npm run build` компилирует исходный код TypeScript, `npm test` запускает модульные и пакетные тесты. `npm run test:e2e` запускает адаптер во временной установке ioBroker с использованием имитированного WL-433 (протокол Tuya 3.3 на `127.0.0.1:6668`, широковещательная передача UDP на порту 6667, команды и статус точки данных 101, как у реального шлюза) - эти порты должны быть свободны.

Локальная тестовая система с [dev-сервер](https://github.com/ioBroker/dev-server) (администратор на порту 8091):

```bash
npx dev-server setup --adminPort 8091 --symlinks   # once, creates .dev-server/
npm run simulator                                   # optional: simulated WL-433 in a second terminal
npm run dev-server watch                            # starts ioBroker + adapter, restarts on code changes
```

Администратор: `http://<IP of the development machine>:8091` (сервер разработки прослушивает все интерфейсы локально <http://127.0.0.1:8091>). Без реального оборудования настройте экземпляр, используя значения, выведенные `npm run simulator` (идентификатор устройства, локальный ключ, IP-адрес `127.0.0.1`). `npm run dev-server debug` запускает адаптер с инспектором для отладчика VS Code.

## Документация
Переведённая документация:

- 🇩🇪 [Немецкая документация](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/de/README.md)
- 🇷🇺 [Документация на английском языке](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/ru/README.md)
- 🇳🇱 [Nederlandse documentatie](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/nl/README.md)
- 🇫🇷 [Французская документация](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/fr/README.md)
- 🇮🇹 [Итальянская документация](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/it/README.md)
- 🇪🇸 [Документация на испанском языке](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/es/README.md)
- 🇵🇱 [Польская документация](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pl/README.md)
- 🇵🇹 [Португальская документация](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pt/README.md)
- 🇺🇦 [Документация украинской](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/uk/README.md)
- 🇨🇳 [简体中文文档](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/zh-cn/README.md)

Благодарности: контрольная сумма точки данных 101 и первые опубликованные кадры взяты из обсуждения tinytuya [#623](https://github.com/jasonacox/tinytuya/discussions/623) (пользователи *Silverstar* и *uzlonewolf*). Солнечные события рассчитаны с помощью [солнечный кальций](https://github.com/mourner/suncalc) Владимира Агафонкина (лицензия BSD-2-Clause).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2026-11-02)

- (ssbingo) English versions of the beginner guides (device ID and local key, linking PW01 lamps to the gateway); the guide button in the instance settings opens the guide in English or, with German admin language, in German; dependency updates

### 0.2.1 (2026-09-22)

- (ssbingo) Object names in all 11 languages of the admin (object check E6001 of the ioBroker repository); existing objects are updated at the next start

### 0.2.0 (2026-09-22)

- (ssbingo) Local timers in the new tab *Timers* of the instance settings (up to 50): time of day or sun event with offset and random shift, weekdays, season, zone, every light action and switching off after a duration; states `timers.active`, `timers.nextRun`, `timers.lastRun` and `timers.overview`
- (ssbingo) DMX start address of the gateway's DMX512 input readable and writable (`settings.dmxAddress`)
- (ssbingo) Documented: DMX command, key `06 05`, cloud timers of the MiBoxer app; manuals with a new timer chapter

### 0.1.0 (2026-09-22)

- (ssbingo) Datapoint 101 decoded: lamps, zones and scenes are now controlled with the gateway's own commands (the colour could not be set before), the status is read from datapoint 101 and requested actively
- (ssbingo) New states: hue, saturation, scene M1–M9, buttons S+ / S-; zones selectable in the settings as zone selector (`light.zone`) or one channel per zone
- (ssbingo) Commands are confirmed by the status of the gateway, a warning is logged if the gateway does not confirm them; detailed debug output for every step
- (ssbingo) German and English user manual for beginners

### 0.0.1 (2026-09-21)

- (ssbingo) Initial release: local control of the WL-433 gateway via the Tuya LAN protocol (on/off, mode, brightness, colour temperature, colour, countdown), raw access to datapoint 101 with checksum handling and gateway search in the local network, detailed component-tagged debug logging with correlation IDs and durations (secrets are never logged)

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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