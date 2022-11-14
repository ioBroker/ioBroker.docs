---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: адаптер ioBroker Synology
hash: 4tAxsbrofhQu1Y669v0bO0D6JTmSndG8lOnXZK54eL8=
---
![Логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](http://iobroker.live/badges/synology-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.synology.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)

# Адаптер ioBroker Synology
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Описание
Драйвер позволяет получать данные и управлять сервером Synology NAS.

### Настройки двухфакторной аутентификации
Если вы используете 2FA в DSM6/7, см. инструкции [здесь](docs/en/template.md)

### Перезагрузка и завершение работы
Адаптер будет делать это через SSH, начиная с версии 2.1.4, поэтому укажите порт SSH в настройках адаптера. Вы можете увидеть это в настройках Synology: ![графика](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png) ![графика](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### Метод отправки
Вы можете отправить любую команду (метод), задав объект sendMethod, например: Получить информацию о SurveillanceStation — это метод getInfo без дополнительных параметров.

```{"method": "getInfo", "params": {}}```

### Контроль
**commands.reboot** - перезагрузить NAS

**commands.shutdown** — выключение NAS

***SurveillanceStation.камеры.{NAMECAM}***:

* enabled - Текущий статус и включение/отключение камеры
* linkSnapshot - URL для снимка

***SurveillanceStation.HomeMode.status_on*** — Текущее состояние и включение/отключение домашнего режима.

***SurveillanceStation.getSnapshotCamera*** - Получить снимок по номеру камеры, файл сохраняется в каталоге ``...iobroker-data\synology_0\snapshotCam_2.jpg``

***AudioStation.players.{PLAYERID}***:

* play, pause, stop, next, prev - Управление воспроизведением (кнопка, только правда)
* Repeat - Управление повтором (Выкл., Все, Один)
* shuffle - управление перемешиванием (true/false)
* volume - Громкость удаленного плеера (0-100)
* seek - Управление поиском при воспроизведении (0-100)
* play_folder - Добавить треки из папки в список воспроизведения (id папки, например, ``dir_5816``)
* play_track - Воспроизведение трека по его идентификатору (например, ``music_120847``)
* current_play - Контроль и статус текущего трека по его номеру в плейлисте (например, ``14``)

***Станция загрузки***:

* activeTask - количество незавершенных загрузок
* listTasks - массив с незавершенными загрузками
* shedule_enabled, shedule_emule_enabled — статус и контроль запланированных или немедленных загрузок
* add_hash_download — добавить в загрузку хэшей (например, ``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``)
* add_url_download — добавить URL загрузки или магнитную ссылку
*folder - Папка для скачивания, устанавливается перед добавлением загрузки, иначе загружается в папку по умолчанию
* pause_task,resume_task — приостановить загрузку и возобновить. (например, ``dbid_170`` или ``170`` или ``все``)

### Окно сообщения
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## __РАБОТА В ПРОЦЕССЕ__
-->

### 2.1.13 (2022-11-05) *(McM1957) Код подготовлен для предстоящего выпуска js-контроллера. Ссылка на utils.controllerDir удалена. (#198) *(McM1957) Несколько базовых модулей были обновлены.
### 2.1.12 (2022-10-26)
*(McM1957) Удалена запись пароля в виде открытого текста.

### 2.1.11 (2022-10-24)
*(McM1957) Адаптер адаптирован для совместимости с node14.

### 2.1.10 (23.10.2022)
*(McM1957) Исправлена обработка паролей, содержащих специальные символы (например, знак доллара) (#180) *(McM1957) Базовые модули были обновлены в соответствии с предложением dependabot.

### 2.1.9 (2022-07-01)
* (Apollon77) Попробуйте предотвратить блокировку учетных записей при использовании 2FA при перезапуске NAS.

### 2.1.8 (2022-06-12)
* (Apollon77) замедление повторного подключения к DSM

### 2.1.7 (2022-04-26)
* (Apollon77) Попробуйте предотвратить блокировку учетных записей при использовании 2FA при перезапуске NAS.

### 2.1.6 (2022-04-04)
* (Apollon77) Фикс 2FA

### 2.1.5 (2022-04-03)
* (Apollon77) исправить определение версии DSM

### 2.1.4 (2022-04-03)
* (arteck) обходной путь для выключения и перезагрузки (настройте свой порт ssh в настройках)
* (Apollon77) предотвращает ошибку при настройке FileStation.info.items при запуске один раз

### 2.1.1 (2022-03-26)
* (Apollon77) Оптимизировано определение и настройка типов объектов.

### 2.1.0 (25 марта 2022 г.)
* ВАЖНО: После установки этой версии вам необходимо повторно ввести пароль один раз!
* (Apollon77) Снимки камеры теперь также хранятся в хранилище ioBroker, чтобы их было легче использовать в визуализации!
* (foxriver76) Скрыть отображение пароля в Admin при использовании Admin5
* (Apollon77) Фикс описания тома
* (Apollon77) Исправлены проблемы с типом, начиная с js-controller 3.3.

### 2.0.1 (2021-09-17)
* (MeisterTR) Обходной путь Конфигурационный пароль JSON

### 2.0.0
* (установщик) поддержка DSM7

### 1.1.3 (23 августа 2021 г.)
* (MeisterTR) Исправлена 2FA

### 1.1.2 (2021-08-12)
* (MeisterTR) Исправлены типы данных
* (MeisterTR) добавлен новый ConfigJson (если вы используете 2FA, повторите ввод в config)
* (MeisterTR) Снова исправлен снимок

### 1.1.1 (2021-08-09)
* (MeisterTR) фикс типа аптайма
* (MeisterTR) исправить неработающую ссылку на снимок

### 1.1.0 (2021-08-07)
* (MeisterTR) исправления для DSM7
* (MeisterTR) добавлен релиз-скрипт
* (MeisterTR) тестирование изменений
* (MeisterTR) изменение репозитория Syno на значение по умолчанию

### 1.0.1
* (thost96) исправление неправильного номера типа [проблема 78] (https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
* (установщик) изменены имена объектов в hdd_info [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) ВАЖНОЕ ИЗМЕНЕНИЕ: Пожалуйста, установите новый пароль в админке!
* (Apollon77) js-controller 3.0 теперь нужен минимум!
* (пароль магазина Apollon77 теперь зашифрован)

### 0.1.20
* (установщик) исправлена ошибка

### 0.1.18
* (установщик) изменить ссылку на обложку альбома

### 0.1.17
* (установщик) добавлена поддержка плагина Sentry

### 0.1.16
* (установщик) исправлена ошибка

### 0.1.15
* (установщик) исправлена ошибка в разборе информации
* (установщик) исправлен API undefined

### 0.1.14
* (установщик) исправлено отсутствие [датапойнтов] (https://github.com/instalator/ioBroker.synology/issues/43)
* (установщик) рефакторинг
* (установщик) Изменено логирование некоторых ошибок
* (установщик) Изменен формат сеанса в пакете syno

### 0.1.11
* (установщик) добавлено состояние motionDetected
* (SpectreKr*) Добавление в FS Sharing

### 0.1.10
* (установщик) исправлено копирование файла обложки
* (инсталлятор) исправление получения пакетов для DSM 5.x
* (установщик) Добавлена возможность выбора сервисов для получения данных

### 0.1.8
* (установщик) исправить ошибку addDownload
* (установщик) исправлен список радиостанций
* (установщик) исправлено получение обложки

### 0.1.7
* (установщик) исправлена 2FA
* (установщик) Добавлено руководство по настройке 2FA

### 0.1.6
* (установщик) фикс для 2fa
* (установщик) исправить ошибку
* (установщик) изменить журнал ошибок
* (установщик) фикс io-пакета
* (установщик) исправить ошибку состояния плеера

### 0.1.4
* (установщик) изменение для DownloadStation
* (инсталлятор) добавлен плейлист любимого радио
* (установщик) добавлена кнопка очистки плейлиста
* (установщик) рефакторинг

### 0.1.3
* (инсталлятор) изменить obj для исправления информации ss для кавер-версии песни
* (установщик) фикс для info.connection
* (установщик) добавлено исправление 6.2.3 для файлов браузера плеера
* (установщик) фикс для 2FA
* (установщик) исправлена ошибка добавления загрузки
* (установщик) добавлен список задач DownloadStation

### 0.1.2
* (установщик) исправлена ошибка

### 0.1.1
* (установщик) добавлено окно сообщений для моментального снимка
* (установщик) обновить ридми
* (установщик) добавлена ссылка ss для разных потоков
* (установщик) исправить ошибку
* (установщик) рефакторинг

### 0.1.0
* (установщик) добавлен переключатель HomeMode
* (установщик) изменение для audiostation
* (установщик) меняем на as и ss
* (установщик) добавлен функционал моментальных снимков
* (установщик) исправлен systemConfig
* (установщик) исправлено множество ошибок

### 0.0.4 (2018-10-07)
* (установщик) Изменен репозиторий библиотек
* (установщик) Добавлено в конфиг время опроса

### 0.0.3 (03.01.2018)
* (установщик) инициал

## Changelog
<!--

## License
The MIT License (MIT)

Copyright (c) 2021-2022 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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