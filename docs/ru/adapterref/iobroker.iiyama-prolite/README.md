---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iiyama-prolite/README.md
title: ioBroker.iiyama-prolite
hash: k6h+d0a3i9I2E0LHdbljni/mjDFLHUSnsnIungXtl5w=
---
![Логотип](../../../en/adapterref/iobroker.iiyama-prolite/admin/iiyama-prolite.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.iiyama-prolite.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iiyama-prolite.svg)
![Количество установок](https://iobroker.live/badges/iiyama-prolite-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/iiyama-prolite-stable.svg)

# IoBroker.iiyama-prolite
**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.iiyama-prolite/workflows/Test%20and%20Release/badge.svg)

## Адаптер iiyama для ioBroker
Контроль [Профессиональные дисплеи iiyama ProLite (https://iiyama.com/gl_en/products/) подключаются через последовательный порт RS232 или TCP/IP (LAN) с использованием официального протокола связи iiyama. iiyama — производитель дисплеев — см. [iiyama.com]](https://iiyama.com/).

## Функции
- **Поддержка двух типов подключения**: управление дисплеями через последовательный порт RS232 или сетевое соединение TCP/IP.
- **Комплексное управление**: питание, источник входного сигнала, громкость, параметры видео и аудио.
- **Мониторинг в реальном времени**: Автоматический опрос состояния дисплея с настраиваемыми интервалами.
- **Поддержка нескольких моделей дисплеев**: Поддерживает дисплеи серии ProLite LH (см. список совместимости)
- **Очередь команд**: Последовательное выполнение команд предотвращает ошибки связи.

## Поддерживаемые модели дисплеев
- ProLite LH3252HS-B1
- ProLite LH4352UHS-B1
- ProLite LH5052UHS-B1
- ProLite LH5552UHS-B1
- ProLite LH6552UHS-B1
- ProLite LH9852UHS-B2
- ProLite LH4342UHS-B1/B3
- ProLite LH5042UHS-B1/B3
- ProLite LH5542UHS-B1/B3
- ProLite LH6542UHS-B1/B3
- ProLite LH7542UHS-B1/B3
- ProLite LH8642UHS-B1/B3

## Установка
1. Установите адаптер из репозитория адаптеров ioBroker.
2. Настройте параметры подключения в конфигурации адаптера.

## Конфигурация
### Настройки подключения
**Тип подключения**: выберите между TCP/IP (LAN) или последовательным (RS232) соединением.

#### TCP/IP-соединение
- **IP-адрес**: IP-адрес дисплея
- **TCP-порт**: Обычно 5000 (по умолчанию для дисплеев iiyama)

#### Последовательное соединение
- **Последовательный порт**: Путь к последовательному устройству (например, `/dev/ttyUSB0` в Linux или `COM1` в Windows)
- **Скорость передачи данных**:
- 9600 для большинства моделей
- 115200 только для серии LHxx42UHS-B1

### Настройки дисплея
- **Идентификатор монитора**: идентификатор, заданный на дисплее (1-255). Значение по умолчанию — 1.
- **Интервал опроса**: Как часто обновлять отображаемый статус (5-300 секунд). По умолчанию — 30 секунд.
- **Режим энергосбережения**: Режим энергосбережения, настроенный на вашем дисплее (1-4). Он влияет на то, как можно управлять дисплеем в выключенном состоянии:
- **Режим 1**: WOL выключен, пробуждение от источника входного сигнала выключено, подсветка выключена
- TCP-соединение обрывается при выключении дисплея.
— Невозможно разбудить по сети (функция WOL отключена)
- Для включения необходимо использовать ИК-пульт дистанционного управления или кнопку на передней панели.
- **Режим 2**: WOL выключен, пробуждение от источника входного сигнала включено, подсветка выключена
- TCP-соединение обрывается при выключении дисплея.
— Невозможно разбудить по сети (функция WOL отключена)
- Может автоматически включаться при обнаружении сигнала источника HDMI.
- **Режим 3**: WOL включен, пробуждение от источника входного сигнала выключено
- Возможность пробуждения через Wake-on-LAN (требуется настройка MAC-адреса)
— Адаптер отправляет магический пакет WOL, а затем команду включения питания.
- **Режим 4**: WOL включен, пробуждение от источника сигнала включено (**рекомендуется для управления по сети**)
- Возможность пробуждения через Wake-on-LAN (требуется настройка MAC-адреса)
— Адаптер отправляет магический пакет WOL, а затем команду включения питания.
- Также может автоматически включаться при обнаружении сигнала источника HDMI.
- **MAC-адрес** (необходим для режимов 3 и 4): MAC-адрес сетевого интерфейса дисплея, используемый для функции Wake-on-LAN.
- **Адрес широковещательной рассылки WOL** (необязательно): адрес широковещательной рассылки подсети для пакета WOL. Если поле пустое, адрес определяется на основе IP-адреса хоста (например, `192.168.1.100` → `192.168.1.255`).

## Использование
### Доступные состояния
#### Управление питанием
- `power` - Включение/выключение дисплея (логическое значение)

#### Источники ввода
- `inputSource` - Выберите источник ввода:
- HDMI, HDMI 2, HDMI 3, HDMI 4
- DVI-D
- DisplayPort, DisplayPort 2
- VGA
- USB, USB 2

#### Объем
- `volume.main` - Громкость основного динамика (0-100%)
- `volume.audioOut` - Громкость аудиовыхода (0-100%)

#### Настройки видео
- `video.brightness` - Яркость (0-100%)
- `video.contrast` - Контраст (0-100%)
- `video.color` - Насыщенность цвета (0-100%)
- `video.sharpness` - Резкость (0-100%)
- `video.tint` - Оттенок/Цветовой тон (0-100%)
- `video.blackLevel` - Уровень черного (0-100%)
- `video.gamma` - Выбор гамма-кривой
- `video.colorTemperature` - Предустановка цветовой температуры
- `video.pictureFormat` - Формат изображения/соотношение сторон

#### Настройки звука
- `audio.treble` - Уровень высоких частот (0-100)
- `audio.bass` - Уровень басов (0-100)

#### Информация (только для чтения)
- `info.connection` - Состояние соединения
- `info.standby` - Дисплей находится в режиме ожидания/недоступен, пока адаптер продолжает работать.
- `info.operatingHours` - Общее время работы
- `info.serialCode` - Отображение серийного номера

#### Команды
- `commands.autoAdjust` - Запустить автоматическую настройку VGA (напишите `true`)

### Пример использования в Blockly/JavaScript
```javascript
// Turn display on
setState('iiyama-prolite.0.power', true);

// Switch to HDMI input
setState('iiyama-prolite.0.inputSource', 13); // 13 = HDMI

// Set volume to 50%
setState('iiyama-prolite.0.volume.main', 50);
setState('iiyama-prolite.0.volume.audioOut', 50);

// Adjust brightness
setState('iiyama-prolite.0.video.brightness', 75);
```

## Технические характеристики
### Реализация протокола
Данный адаптер реализует протокол последовательной связи iiyama RS232, описанный в официальном примечании к применению. Протокол использует:

- **Формат пакета**: Заголовок (0xA6), Идентификатор монитора, Категория, Страница, Код функции, Длина, Управление данными, Данные, Контрольная сумма
- **Контрольная сумма**: XOR всех байтов, кроме контрольной суммы.
- **Тайм-аут ответа**: 5000 мс
- **Задержка команд**: 100 мс между командами для предотвращения переполнения буфера.

### Управление соединениями
- **Автоматическое переподключение**: до 10 попыток с задержкой в 5 секунд.
- **Очередь команд**: Обеспечивает последовательную отправку команд.
- **Опрос состояния**: Регулярное обновление всех параметров отображения.

## Поиск неисправностей
### Дисплей не отвечает
1. **Проверьте физическое соединение**: Убедитесь, что кабель правильно подключен.
2. **Проверьте IP-адрес/порт** (TCP) или **последовательный порт** (RS232)
3. **Проверьте идентификатор монитора**: он должен совпадать с идентификатором, настроенным на дисплее.
4. **Проблемы с последовательным подключением**:
— Проверьте скорость передачи данных (9600 или 115200 для серии B1).
— Проверьте права доступа к последовательному порту в Linux: `sudo usermod -a -G dialout iobroker`
5. **Проблемы с TCP-соединением**:
- Для управления питанием по сети настройте дисплей в режим энергосбережения 3 или 4.
- Режим 1 или 2: TCP-соединение обрывается при выключении дисплея - невозможно разбудить устройство по сети
- Режим 3: Требуется функция Wake-on-LAN - настройте MAC-адрес в параметрах адаптера.
- Режим 4: Рекомендуемый - TCP остается активным, команды управления питанием работают напрямую.
— Проверьте настройки брандмауэра

### Команды не работают
- **Ожидание ответа**: Протокол требует ожидания подтверждения между командами.
- **Проверьте экранное меню**: Гарантируется работа только тех команд, которые доступны в экранном меню дисплея.
- **Слишком частый опрос**: Увеличьте интервал опроса, если возникают ошибки связи.

## Отказ от ответственности
iiyama и ProLite являются товарными знаками соответствующих владельцев. Этот адаптер является проектом сообщества и не связан с компанией iiyama, не одобрен ею и не поддерживается ею.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.1.4 (2026-07-16)
* (Alan Paris) Removed the manufacturer protocol PDF from the repository and its git history
* (Alan Paris) Added a 10 s TCP connection timeout so an unreachable display no longer hangs the connect
* (Alan Paris) Redacted MAC addresses in log output (only the last three octets are shown)
* (Alan Paris) Changed the brightness state role to `level.dimmer`
* (Alan Paris) Poll cycles are now skipped while the previous cycle is still processing, preventing command-queue backlog
* (Alan Paris) Documented reserved protocol command/input-source codes that are not yet exposed as states

### 0.1.3 (2026-07-06)
* (Alan Paris) Updated serialport dependency to 13.0.0

### 0.1.2 (2026-07-06)
* (Alan Paris) Create channel objects for info/volume/video/audio/commands so every state has an intermediate parent object (fixes repochecker E3009)

### 0.1.1 (2026-07-05)
* (Alan Paris) Enabled automated npm publishing via GitHub Actions trusted publishing (OIDC)

### 0.1.0 (2026-07-05)
* (Alan Paris) Initial release: TCP/IP and serial (RS232) control of iiyama ProLite displays
* (Alan Paris) Power, input source, volume, video and audio control with status polling
* (Alan Paris) Wake-on-LAN support for Power Save Modes 3 and 4, with subnet-broadcast derivation
* (Alan Paris) Automatic reconnection with slow standby polling to recover when a display is powered on

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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