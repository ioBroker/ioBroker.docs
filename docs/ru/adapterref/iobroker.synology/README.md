---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: ioBroker Synology адаптер
hash: vAORVxNbS+kgucR7rGseu/Q5efleCD0vxS/Pk8714oI=
---
![Логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](https://iobroker.live/badges/synology-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.synology.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)

# ioBroker Synology адаптер

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Описание

Этот драйвер позволяет получать данные и управлять вашим NAS-сервером Synology.

### Настройки двухфакторной аутентификации

Если вы используете двухфакторную аутентификацию в DSM6/7, см. инструкции [здесь.](/#/docs/adapterref/iobroker.synology/docs/en/template.md)

### Совместимость

Для работы этого адаптера требуется Node.js версии 24 или новее. Поддержка DSM 5 прекращена, поскольку текущие определения API Synology включают только DSM 6 и DSM 7. Существующие настройки DSM 5 не изменяются автоматически; перед запуском адаптера настройте поддерживаемую версию DSM.

### Перезагрузка и выключение

Начиная с версии 2.1.4, адаптер будет делать это через SSH, поэтому, пожалуйста, укажите порт SSH в настройках адаптера. Вы можете увидеть его в настройках Synology:![графика](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png)![графика](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### sendMethod

Вы можете отправить любую команду (метод), задав объект sendMethod, например: Получение информации о станции видеонаблюдения — это метод getInfo без дополнительных параметров.

`{"method": "getInfo", "params": {}}`

### Контроль

**commands.reboot** - перезагрузка NAS

**commands.wake** - отправить команду Wake On Lan на NAS

**commands.shutdown** - выключение NAS

_**SurveillanceStation.cameras.{NAMECAM}**_ :

- Включено - Текущее состояние и включение/выключение камеры
- linkSnapshot - URL для создания снимка

_**SurveillanceStation.HomeMode.status\_on**_ - Текущий статус и включение/выключение домашнего режима

_**SurveillanceStation.getSnapshotCamera**_ - Получает снимок по номеру камеры; файл сохраняется в каталоге. `...iobroker-data\synology_0\snapshotCam_2.jpg`

_**AudioStation.players.{PLAYERID}**_ :

- Воспроизведение, пауза, остановка, следующий, предыдущий — управление воспроизведением (кнопка, только в истинном состоянии)
- Повтор - Регулятор повтора (Выкл., Все, Один)
- перемешивание - Управление перемешиванием (истина/ложь)
- Громкость - Регулировка громкости с помощью пульта дистанционного управления проигрывателем (0-100)
- seek - Управление поиском при воспроизведении (0-100)
- play\_folder - Добавить треки из папки в плейлист (например, с идентификатором папки). `dir_5816`)
- play\_track - Воспроизводит трек по его идентификатору (например, `music_120847`)
- current\_play - Управление и статус текущего трека по его номеру в плейлисте (например, `14`)

_**HyperBackup**_ :

- taskCount - количество настроенных задач Hyper Backup
- listTasks — массив JSON, содержащий идентификатор каждой задачи, её имя, текущий статус/состояние и ход выполнения, а также время последнего/следующего резервного копирования, последний результат и сведения об ошибке (если имеются).
- tasks.{DSM ID} — канал только для чтения для каждой задачи, названный в честь задачи на NAS, с его идентификатором и отдельными состояниями для доступных значений задачи. Числовые идентификаторы используются напрямую (например, `tasks.3`); нечисловые идентификаторы соответствуют сейфу `id_<hex>` сегменты канала, при этом исходный идентификатор остается в `id` штат. Отображаемые названия штатов: `Task ID`, `Task name`, `Backup status`, `Task state`, `Current backup progress`, `Last backup time`, `Next scheduled backup`, `Last backup result`, `Last backup error`, `Last backup error code`, и `Last backup progress details`; `last_bkp_time` и `next_bkp_time` использовать `date` роль для отображения данных в ioBroker с учетом даты.

Состояние Hyper Backup — только для чтения. Адаптер запрашивает данные у DSM. `SYNO.Backup.Task` API; сводные состояния сохраняются параллельно с динамическими каналами задач. Каналы синхронизируются после каждого корректного ответа списка задач, включая пустой список; некорректные списки не запускают очистку. Временные сбои статуса для каждой задачи сохраняют существующие значения статуса. Поле последнего прогресса декодируется из JSON-кодированного значения DSM, если это возможно.

_**DownloadStation**_ :

- activeTask - количество незавершенных загрузок
- listTasks - массив с незавершенными загрузками
- shedule\_enabled, shedule\_emule\_enabled - Состояние и управление запланированными или немедленными загрузками
- add\_hash\_download - добавить в список хэшей для скачивания (например) `8BD3CAD02FC9ECB661A12378414FA310D3F3FE03`)
- add\_url\_download - добавить URL для скачивания или magnet-ссылку
- папка — папка для загрузки, задается перед добавлением файла для скачивания; в противном случае файл будет загружен в папку по умолчанию.
- pause\_task, resume\_task - Приостановить загрузку и возобновить её. (например) `dbid_170` или `170` или `all`)

### Ящик для сообщений

```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
### **WORK IN PROGRESS**
- (Voodoo2man) Corrected object state defaults and bound the 2FA delay to the adapter lifecycle.

### 4.1.0 (2026-10-31)
- (Voodoo2man) Reduced 2FA first-start delays by reusing station sessions and skipping disabled or unavailable optional APIs.
- (Voodoo2man) Added Hyper Backup
- (Voodoo2man) Corrected object state defaults and sendMethod input handling.

### 4.0.0 (2026-10-24)
- (Voodoo2man) Added remaining free capacity for each storage volume.
- (Voodoo2man) Corrected Surveillance Station camera status mapping.
- (GermanBluefox) Fixed crash when polling interval is stored as string (#559)
- (Voodoo2man) Corrected adapter state defaults and polling interval handling.
- (Voodoo2man) Migrated Synology API access to the published syno library, retained automatic 2FA and adapter APIs, and required Node.js 24; DSM 5 support was removed.
- (Voodoo2man) Raised the minimum Admin and js-controller versions.

### 3.3.2 (2026-10-23)
- (Voodoo2man) Migrated the adapter to TypeScript, preserved legacy 2FA settings, and configured runtime builds during npm deployment.

### 3.3.1 (2026-10-18)
- (Voodoo2man) Improved polling defaults, connection logging, and handling of invalid credentials.
- (Voodoo2man) Filtered harmless SSH notices and bound timers to the adapter lifecycle.
- (Voodoo2man) Corrected semantic roles for system, volume, download, and surveillance states.
- (Voodoo2man) Corrected the hard disk capacity state role.
- (Voodoo2man) Migrated linting to ESLint 9 with the ioBroker standard configuration.

### 3.3.0 (2026-10-17)
- (Voodoo2man) Added a guarded FFmpeg fallback for H.265 camera snapshots.
- (Voodoo2man) Added optional SMART attribute polling over SSH.
- (Voodoo2man) Changed SSH error logging from debug to warn.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.synology/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2023 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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