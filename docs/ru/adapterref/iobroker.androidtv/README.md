---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.androidtv.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.androidtv.svg
BADGE-Number of Installations: https://iobroker.live/badges/androidtv-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/androidtv-stable.svg
BADGE-Test and Release: https://github.com/Schimi1983/ioBroker.androidtv/workflows/Test%20and%20Release/badge.svg
BADGE-GitHub Sponsors: https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white
BADGE-PayPal: https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.androidtv/README.md
title: ioBroker.androidtv - Инструкции
hash: YP3wvZgeoGBAY2riUWk1qffBzt9DcWuvrr/rAjS9pjY=
---
![логотип](../../../de/admin/androidtv.png)

![Спонсоры GitHub](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Spenden-00457C?logo=paypal&logoColor=white)

# ioBroker.androidtv – Инструкции

Управляйте своим **NVIDIA SHIELD** , другими **устройствами Android TV / Google TV** и **Amazon Fire TV** через ioBroker: включайте и выключайте их, запускайте приложения, нажимайте кнопки на пульте дистанционного управления и смотрите, что сейчас запущено.

Страницы товаров: [NVIDIA SHIELD TV](https://www.nvidia.com/de-de/shield/) , [Android TV / Google TV](https://www.android.com/intl/de_de/tv/) , [Amazon Fire TV](https://www.amazon.de/firetv) .

**Требования:** Node.js 22, js-controller 6.0.11 и Admin 7.6.20 или более поздняя версия. ioBroker должен иметь доступ к устройству в сети. Облачная учетная запись не требуется.

## Обстановка

### 1. Добавьте устройство

Настройки экземпляра › вкладка **«Устройства»** › **Добавить устройство** : Введите имя и **IP-адрес** устройства (их можно найти в сетевых настройках устройства; в идеале, назначьте статический IP-адрес в маршрутизаторе). Затем выберите **тип устройства** :

| Тип устройства                                                                                 | Для                                                                        | Как дела                                                                                                   | Ваша уникальность заключается в том, что вы делаете.    |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Android TV / Google TV – Стандарт**                                                          | NVIDIA SHIELD, Chromecast с Google TV, телевизоры с Android TV / Google TV | Включение/выключение, Приложения, Кнопки пульта дистанционного управления, Громкость                       | Введите код с телевизора.                               |
| **Android TV / Google TV – с отображением названия и воспроизведением/паузой (требуется ADB)** | те же самые устройства                                                     | Все вышеперечисленное + заголовок, воспроизведение/пауза, позиция                                          | Введите код и включите _сетевую отладку_ на устройстве. |
| **Amazon Fire TV**                                                                             | Fire TV Stick, Cube, телевизоры с Fire TV                                  | Включение/выключение, Приложения, Кнопки пульта дистанционного управления, Название, Воспроизведение/Пауза | Включите _отладку ADB_ на устройстве.                   |

Сомневаетесь? Начните с **настроек по умолчанию** — вы можете изменить их в любое время.

### 2. Подключитесь

**Стандартная процедура:** включите устройство, нажмите **«Сопряжение устройства»** на его карте и введите 6-значный код с телевизора. Готово – индикатор состояния на карте загорится зеленым.

Соедините устройство **с кнопками воспроизведения/паузы,** как описано выше. Затем на устройстве откройте **«Настройки» > «Параметры устройства» > «Параметры разработчика»** и включите **сетевую отладку** (нет параметров разработчика? Перейдите в _«Информация»_ > семь раз нажмите **«Создать** »). Некоторые телевизоры (например, Philips) также требуют **отладки по USB** . На телевизоре подтвердите **«Разрешить отладку?»** , **выбрав «Всегда разрешать** ».

**Amazon Fire TV:** На вашем Fire TV перейдите **в «Настройки» › «Мой Fire TV» › и откройте «Параметры разработчика».** Включите **отладку ADB** (нет параметров разработчика? Щелкните имя устройства 7 раз, чтобы _открыть информацию_ ). На вашем телевизоре подтвердите выбор **пункта «Разрешить отладку по USB?»** , выбрав « **Всегда разрешать** ».

> ADB (отладка) позволяет другим устройствам в вашей сети получать доступ к телевизору. Используйте только в своей доверенной сети.

### 3. Дополнительно: включение из глубокого режима ожидания.

Некоторые устройства (например, Fire TV) отключают свою сеть в режиме глубокого ожидания. Включите функцию **«Пробуждение по локальной сети»** / **«Сетевой режим ожидания»** на устройстве и введите **MAC-адрес** в настройках устройства (значок шестеренки на карточке) — в идеале, на маршрутизаторе (для проводных подключений: MAC-адрес интерфейса локальной сети).

## операция

Каждое устройство отображается как `androidtv.0.<Name>`:

| Что                                     | Точка данных                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| Включите/выключите, оно включено?       | `power`                                                                           |
| Какое приложение запущено?              | `currentAppName` (например. `Netflix`), Идентификатор приложения в `currentApp`    |
| Запустить приложение                    | кнопки в `apps`                                                                    |
| Кнопки пульта дистанционного управления | кнопки в `keys` (например. `keys.home`, `keys.playPause`, `keys.volumeUp`)         |
| Введите текст                           | `sendText`                                                                        |
| Что сейчас показывают?                  | `media.title`, `media.state`, `media.position` (не в _стандартной комплектации_ ) |
| Связаны между собой?                    | `info.connected` читаемый статус в `info.status`                                   |

Эти данные можно использовать в скриптах, Blockly, сценах или визуализациях так же, как и любые другие.

### Снаряжение для райдера

Каждое устройство представляет собой карточку, отображающую его состояние и запущенное приложение. Переключатель активирует/деактивирует устройство, кнопка контроллера открывает быстрые элементы управления (питание, отключение звука, громкость, воспроизведение/пауза, главный экран), а другие кнопки выполняют сопряжение, переподключение, изменение настроек или удаление устройства. Изменения сохраняются немедленно и перезапускаются — страница настроек закрывается без сохранения перед внесением каких-либо других изменений.

### Избранное приложения

Вкладка **«Избранное»** : каждая запись становится кнопкой на каждом устройстве. Введите **веб-ссылку** или **идентификатор** приложения (запустите приложение на телевизоре и...). `currentApp` (читать).

| Приложение  | Android TV / SHIELD             | Fire TV              |
| ----------- | ------------------------------- | -------------------- |
| Netflix     | `https://www.netflix.com/title` | даже                 |
| YouTube     | `https://www.youtube.com`       | даже                 |
| Disney+     | `https://www.disneyplus.com`    | даже                 |
| Prime Video | `https://app.primevideo.com`    | `com.amazon.firebat` |

Идентификаторы приложений работают на Fire TV и с типом устройства _, включающим название и функции воспроизведения/паузы_ . Ссылка, которая открывает только веб-браузер, не будет запущена (примечание в журнале).

## Проблемы и решения

- **"Требуется сопряжение"** : повторное сопряжение (шаг 2) – необходимо после сброса настроек устройства.
- **«Не подключено»** : устройство выключено или недоступно. Адаптер автоматически переподключится.
- **Если он не включается через некоторое время** : глубокий режим ожидания — настройте функцию Wake-on-LAN (шаг 3). Удалите MAC-адрес из маршрутизатора, а не из самого маршрутизатора. `info.mac` (Это может быть MAC-адрес Wi-Fi). Для разных сетей: введите широковещательный адрес в настройках устройства (например, `192.168.20.255`).
- Выбор **пункта «Выключить» в меню устройства** полностью выключает его — после этого включается только собственный пульт дистанционного управления.
- **SHIELD автоматически включается после выключения** : телевизор активирует его через HDMI-CEC, пока на экране отображается входной сигнал. Переключитесь на другой вход или выключите телевизор заранее. Адаптер обнаружит это через ADB и отобразит соответствующую информацию. `power` правильный.
- **На экране телевизора постоянно отображается сообщение «Использовать клавиатуру на мобильном устройстве»** : в настройках устройства (значок шестеренки на карте) снимите галочку с _пункта «Текущее приложение и ввод текста»_ .
- **На дисплее громкости ничего не отображается** : громкость регулируется телевизором/AV-ресивером (HDMI-CEC); кнопки регулировки громкости по-прежнему работают.
- **На Netflix и Prime Video нет названия** (Prime Video отображает только "PrimeVideo"): эти приложения не передают название на Android; функции воспроизведения/паузы и позиционирования работают. YouTube отображает название и канал.

Технические характеристики, все данные и известные ограничения: [README (на английском языке)](https://github.com/Schimi1983/ioBroker.androidtv/blob/main/README.md#technical-details) .

## Поддерживать

Сообщения об ошибках и идеи: [Проблемы](https://github.com/Schimi1983/ioBroker.androidtv/issues) · Вопросы и отзывы: [форум ioBroker](https://forum.iobroker.net/topic/85827/test-adapter-androidtv-v0.2.x-latest)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (@GermanBluefox) Added the message "help": a description of all messages and data points for AI agents (e.g. pi-agent), and `common.supportedMessages.help`
- (Schimi) `currentAppName` shows "ORF ON" on Fire TV
- (Schimi) Clearer log hint when an app ID is started without ADB
- (Schimi) Setup hint: some TVs (e.g. Philips) also need USB debugging
- (Schimi) Playback info: if several apps report playback, the app in the foreground wins; changes of the playback info are written to the debug log

### 0.3.0 (2026-11-19)

- (Schimi, Voodoo2man) Devices are now managed as cards in the tab **Devices** (ioBroker device manager): status, quick controls, pairing, reconnect, settings and remove – replaces the device table (#5, #11)
- (Voodoo2man) Disabled devices no longer show the last online status (also `power`)
- (Schimi) New data point `currentAppName`: readable name of the running app (e.g. "Netflix" instead of `com.netflix.ninja`)
- (Schimi) `power` stays correct when the TV wakes the device again via HDMI-CEC right after switching it off (short check via ADB)
- (Schimi) Clearer device type names in the settings ("standard", "with title and play/pause (ADB required)", "Amazon Fire TV") with a short explanation
- (Schimi) Documentation rewritten: shorter, requirements, tips for Wake-on-LAN, HDMI-CEC and Prime Video; German guide linked in the adapter information

### 0.2.3 (2026-11-12)

- (Schimi) Device and app IDs are now unique regardless of upper/lower case
- (Schimi) Reconnect interval, playback update interval and ADB port are checked in the adapter, not only in the settings page
- (Schimi) README: links to the supported products
- (Schimi) Pairing and connection status texts in all 11 languages (was English/German only)
- (Schimi) The object for the internal files is now created from io-package.json

### 0.2.2 (2026-10-31)

- (Schimi) Object names translated into all 11 languages

### 0.2.1 (2026-10-31)

- (Schimi) Clearer error text for an invalid MAC address, translated into all languages
- (Schimi) Fast forward and rewind buttons use the official roles `button.fastforward` / `button.fastreverse`

### 0.2.0 (2026-10-29)

- (Schimi) Wake-on-LAN: `power` = on also switches on devices in deep standby without network (enter the MAC address in the device settings; optional broadcast address in the expert settings)
- (Schimi) Faster reconnect after Wake-on-LAN

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 Schimi <github@world-mg.de>

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