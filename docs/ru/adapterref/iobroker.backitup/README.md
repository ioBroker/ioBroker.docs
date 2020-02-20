---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.backitup/README.md
title: без названия
hash: bzs5oxDy5vnxzGAnMRWCNpBWfGCNZoo3NkG//y1V+lc=
---
Backitup - это решение для резервного копирования, которое обеспечивает циклическое резервное копирование установки ioBroker, а также Homematic CCU.

Адаптер подходит для мультиплатформ и может использоваться в дополнение к установкам Linux на установках Windows и Mac.

Крепление CIFS должно иметь установленные cifs-utils.

    - `sudo apt-get установить cifs-utils`

Для монтирования NFS должен быть установлен nfs-common.

    - `sudo apt-get install nfs-common`

## 1. Тип резервного копирования
Backitup предлагает возможность выполнения трех типов (опционально с резервным копированием БД) различных типов резервного копирования циклически или нажатием кнопки. По умолчанию каждая резервная копия помещается в каталог / opt / iobroker / backups /. При желании можно настроить загрузку по FTP или, в качестве альтернативы, использовать монтирование CIFS.

1. Стандартное резервное копирование
   - Эта резервная копия соответствует резервной копии, содержащейся в ioBroker, которую можно запустить в консоли с помощью вызова «./iobroker backup». Однако здесь это делается с помощью указанных настроек в конфигурации адаптера или виджета OneClick Backup без использования консоли.
2. Резервное копирование CCU (Homematic)
   - Эта резервная копия дает возможность сохранить 3 различных варианта установки homematic (оригинал CCU / pivCCU / Raspberrymatic). Выполнение этой резервной копии также можно выполнить с помощью указанных параметров в конфигурации адаптера или виджета OneClick Backup.
3. MySQL резервного копирования (локальный)
   - Эта отдельно настраиваемая резервная копия, если она активирована, создается «минимально» для каждой резервной копии, а также удаляется после истечения указанного времени хранения. FTP или CIFS также действительны для этой резервной копии, если она не установлена для других типов резервных копий ioBroker.
4. Redis резервное копирование
   - Эта отдельно настраиваемая резервная копия, если она активирована, создается «минимально» для каждой резервной копии, а также удаляется после истечения указанного времени хранения. FTP или CIFS также действительны для этой резервной копии, если она не установлена для других типов резервных копий ioBroker.
5. Архивирование данных истории
   - Эта отдельно настраиваемая резервная копия, если она активирована, создается «минимально» для каждой резервной копии, а также удаляется после истечения указанного времени хранения. FTP или CIFS также действительны для этой резервной копии, если она не установлена для других типов резервных копий ioBroker.

## 2. Используйте Ftp, CIFS, NFS, Copy или Dropbox для дополнительного резервного копирования на Nas?
  - CIFS:
    - Монтирование CIFS не является проблемой в Linux.
    - Следует отметить, что cifs-utils установлен
    - Путь должен выглядеть следующим образом (например: "/ Sharename / Pfadangabe")
    - При желании вы можете включить / отключить необходимость удаления резервных копий с NAS.
  - NFS:
    - Монтирование NFS не является проблемой в Linux.
    - Следует отметить, что установлен nfs-common
    - Путь должен выглядеть следующим образом (например: "/ Sharename / Pfadangabe")
    - При желании вы можете включить / отключить необходимость удаления резервных копий с NAS.
  - FTP:
    - FTP возможен на всех ОС и служит альтернативой монтированию CIFS
    - Путь в FTP всегда должен начинаться с "/" (например: "/ путь")
    - При желании вы можете включить / отключить необходимость удаления резервных копий с NAS.
  - Копировать:
    - Если монтирование CIFS невозможно, существует еще одна возможность функции копирования.
    - В настройках CIFS необходимо указать путь, где должна быть сделана копия
    - Спецификация IP-адреса должна оставаться пустой для функции копирования
  - Dropbox:
    - Чтобы использовать резервную копию в Dropbox, токен доступа и приложение должны быть созданы по адресу https://www.dropbox.com/developers/apps
    - Шаг 1. Используйте кнопку «Создать резервную копию»
    - Шаг 2. Выберите «Dropbox API»
    - Шаг 3: выберите «Папка приложения»
    - Шаг 4. Дайте «Назовите свое приложение»
    - Шаг 5: нажать кнопку «Сгенерированный токен доступа» (токен вводится в настройках Backitup)
    - В вашем Dropbox теперь есть новая папка под названием «Приложения»
  - Google Диск:
    - Чтобы использовать резервную копию на Google Диске, токен доступа должен быть загружен. Вы можете сделать это на странице конфигурации
    - ioBroker атакует только определенные области. Код для oAuth можно посмотреть [здесь] (https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js).
    - Никакие токены или пользовательские данные не хранятся в облаке.

## 3. Использование
1. Адаптер создает 7 точек данных для использования в Vis
- oneClick.ccu -> служит триггерным триггером для резервного копирования CCU (можно установить значение true в Vis с помощью кнопки)
- oneClick.minimal -> служит триггерным триггером для стандартной резервной копии (можно установить значение true в Vis с помощью кнопки)

- history.html -> служит журналом истории, который в Vis через CCS настраивается проектом.
- history.ccuLastTime -> хранит дату и время создания последней резервной копии CCU
- history.minimalLastTime -> хранит дату и время создания последней стандартной резервной копии
    - history.ccuSuccess -> показывает состояние «истина» при успешном резервном копировании
    - history.minimalSuccess -> показывает состояние «истина» при успешном резервном копировании

2. Показать историю входа в Vis
   - Можно отобразить журнал истории, например, в HTML-виджете, введя следующую строку в HTML:

```
{backitup.0.history.html}
```

Синтаксис: {BackitupInstance.history.html}

3. CCS форматирование журнала истории:

```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-minimal
       {
           float:left;
           color:white;
           font-size:20px;
       }
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```

4. Кнопка OneClick с текстом статуса
   - Если для точки данных OneClick установлено значение true, соответствующая резервная копия запускается и по истечении предварительно определенного времени эта точка данных снова устанавливается в значение false, поэтому можно создать кнопку со статусом, изменив следующую строку и введя ее в Vis в виде текста кнопки:

```
{wert: backitup.0.oneClick.minimal; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

Синтаксис: {значение: <BackitupInstance> .oneClick. <Триггерный триггер>; значение === "правда" || стоит === правда? «Текст при создании резервной копии»: «Стандартный текст»}

5. Backitup поддерживает следующие мессенджеры для уведомления после успешного резервного копирования.
   - Телеграмма
   - Пушовер
   - электронная почта

## 4. Восстановить:
Можно восстановить минимальное резервное копирование, а также mysql, данные истории и редисы либо с локального пути, из Dropbox, GoogleDrive, через FTP или с NAS.
В настоящее время восстановление все еще находится в бета-версии.

Резервное копирование CCU должно быть восстановлено через веб-интерфейс CCU.

Для всех типов резервного копирования iobroker останавливается во время восстановления, а затем автоматически перезапускается.

Те, кто предпочитает вручную восстанавливать свои резервные копии, должны сделать следующее:

1. Восстановите минимальную / нормальную резервную копию ioBroker:
    - Резервная копия должна быть в каталоге «opt / iobroker / backups /» как обычно
    - Его можно восстановить из консоли с помощью команды: «iobroker restore (номер резервной копии из списка)».
    - После восстановления необходим "iobroker upload all"

2. Восстановите резервную копию Raspberrymatic / CCU:
    - Скопируйте файл * .sbk через SCP в каталог / usr / local / tmp directory на Raspberrymatic.
    - Войдите в Raspberrymatic через консоль от имени пользователя root.
    - Выполните команду: «/bin/restoreBackup.sh / user / local / tmp / YourBackupFileName» на Raspberrymatic.
    - Выполните команду: «перезагрузка» на Raspberrymatic, чтобы перезапустить PI
    - В качестве альтернативы, резервная копия, конечно, также может быть восстановлена как обычно через веб-интерфейс.

3. Восстановите Redis:
    - База данных Redis должна быть распакована в соответствующую папку во время восстановления. (Пример: / var / lib / redis)

4. Восстановить историю:
    - База данных истории должна быть распакована в соответствующую папку во время восстановления.

## 6. Устранение неисправностей
    1. Чтобы регистрировать ошибки, Backitup должен быть установлен на «отладку» в экземплярах райдера ioBroker.

## 7. Обнаружены ошибки / решения:
Вот список проблем, с которыми мы столкнулись до сих пор, и их решения, если они есть.

1. У Олифалла (с форума) возникла проблема, заключающаяся в том, что после Восстановления веб-интерфейс ioBrokers был недоступен, выполнив следующие шаги через консоль, он мог это исправить:
    - статус sudo iobroker
    - Сообщение = "Нет связи с состояниями 127.0.0.0:6379[redis"
    - sudo apt-get установить редис-сервер

2. Если монтирование CIFS с IP-адресом невозможно, следует использовать имя хоста NAS.
3. Если вы используете пароль со специальными символами в cifs-mount, пользователи заметили, что тогда пароль должен быть сохранен в кавычках в конфигурации.
4. По мнению некоторых пользователей, cifs-mount не может обрабатывать очень длинные пароли. Если монтирование не работает, пароль будет немного укорочен (у меня работает 12 символов).
5. Если адаптер не устанавливается, проверьте свои версии node и nodejs. Адаптер не поддерживает версии <Узел 8.
6. Если ваша система iobroker была установлена с новым сценарием установщика, вы можете не иметь всех прав для нового пользователя iobroker.

    К сожалению, это также относится к backitup, поскольку backitup использует некоторые системные команды.

Чтобы решить проблему с отсутствующими правами, теперь есть исправление для скрипта установщика iobroker.
Пожалуйста, выполните следующие команды в вашей среде Iobroker в консоли:

```
curl -sL https://iobroker.net/fix.sh | bash -
sudo reboot
```

8. Если вы получаете ошибку при создании базы данных Redis, проверьте, есть ли у вашего пользователя iobroker права и существует ли он в группе пользователей Redis.

    Если это не так, вы можете исправить это с помощью следующей команды в консоли.

```
sudo usermod -a -G redis iobroker
sudo reboot
```

    Если вы не настроили установку Iobroker с помощью сценария установки, и у вашего пользователя другое имя, замените его на пользователя в команде «iobroker».

## Changelog

### 1.3.0 (22.11.2019)
* (simatec) support end for the total backup
* (simatec) Added backup of history data path
* (simatec) Added startup of all adapters after restore
* (simatec) Revision of the restoration for Redis
* (simatec) revision of log issues
* (simatec) Rebuild the start / stop processes under Unix
* (simatec) Rebuilding the start / stop processes under Windows
* (simatec) new translations
* (simatec) adjustments to the new Windows Installer
* (simatec) adjustments to the new Linux installer
* (simatec) fixed some small bugs

### 1.2.2 (20.10.2019)
* (simatec) Fix update process

### 1.2.1 (19.10.2019)
* (simatec) Fix CIFS password with special characters

### 1.2.0 (02.07.2019)
* (bluefox) Google Drive was added
* (simatec) Support for node 6 ended

### 1.1.4 (08.04.2019)
* (simatec) Support for SMB3
* (simatec) Backup for Zigbee Database
* (simatec) Restore for Zigbee Database

### 1.1.3 (12.03.2019)
* (simatec) Timeout for email sending
* (simatec) Timeout for pushover sending
* (simatec) Timeout for telegram sending
* (simatec) Code cleaned up

### 1.1.2 (21.02.2019)
* (simatec) exec Start for iobroker
* (simatec) Fix umount before Restore

### 1.1.1 (12.02.2019)
* (simatec) Fix iobroker-stop for total backup

### 1.1.0 (10.02.2019)
* (simatec) stable Release

### 1.0.9 (02.02.2019)
* (simatec) Add New umount query
* (simatec) Add Umount wait by device busy
* (simatec) Add Timeout for History settings
* (simatec) Add Notification only on error

### 1.0.8 (26.01.2019)
* (simatec) modification for new installer
* (simatec) WOL-waittime adjustable
* (simatec) Fix History settings

### 1.0.7 (17.01.2019)
* (simatec) better start/stop Handling for backup and restore

### 1.0.6 (16.01.2019)
* (simatec) Fix Start/Stop for new iobroker-installer

### 1.0.5 (14.01.2019)
* (simatec) Fix compact mode
* (simatec) Fix total backup
* (simatec) better history handling for html
* (simatec) better history handling
* (simatec) error Message for telegram
* (simatec) error Message for E-Mail
* (simatec) error Message for pushover

### 1.0.4 (08.01.2019)
* (simatec) support for compact mode

### 1.0.3 (06.01.2019)
* (simatec) Bugfix

### 1.0.2 (05.01.2019)
* (simatec) Fix start/stop for new iobroker-Installer

### 1.0.1 (30.12.2018)
* (simatec) Fix delete old Files
* (simatec) Add wake on LAN for CIFS and NFS

### 1.0.0 (24.12.2018)
* (simatec) Stable Release

### 0.4.4 (19.12.2018)
* (simatec) Fix cifs-mount User

### 0.4.3 (17.12.2018)
* (simatec) Add device ID for pushover

### 0.4.2 (10.12.2018)
* (simatec) Fix mount / umount
* (simatec) Fix Readme

### 0.4.1 (07.12.2018)
* (simatec) Added boolean for backup Success
* (simatec) Added Selection menu SMB type (CIFS)
* (simatec) Added Checkbox for mount as root (sudo)

### 0.4.0 (04.12.2018)
* (simatec) Added Pushover Notification

### 0.3.9 (03.12.2018)
* (simatec) Fix cifs/nfs mount and umount

### 0.3.8 (08.11.2018)
* (simatec) Fix notifications format
* (simatec) Fix Telegram User

### 0.3.7 (07.11.2018)
* (simatec) Added e-mail notification
* (simatec) Create backup directory on first boot
* (simatec) many small changes
* (peoples) Fix Telegram SilentNotice
* (peoples) Added Possibility to select a Telegram Receiver
* (peoples) Added Possibility to select a Telegram Notification length
* (peoples) Some Translations

### 0.3.6 (16.10.2018)
* (simatec) Fix Dropbox Backup
* (simatec) Fix Restore path for ownDir
* (simatec) Fix FTP and NAS path
* (simatec) Fix Access Token for dropbox

### 0.3.5 (03.10.2018)
* (simatec) Fix Translation
* (simatec) Fix Filename Suffix for Restore
* (peoples) Bugfix Title for Backup deletion

### 0.3.4 (01.10.2018)
* (simatec) Fix Restart after total-backup

### 0.3.3 (27.09.2018)
* (simatec) Fix Backup-Directoy for dropbox
* (simatec) Fix Restart after total-backup
* (simatec) Fix error Log on cifs

### 0.3.2 (25.09.2018)
* (simatec) Fix Filename for ccu backup

### 0.3.1 (25.09.2018)
* (simatec) Fix FTP Directory
* (simatec) delete old Files

### 0.3.0 (24.09.2018)
* (bluefox/simatec) Add Multiplatform (Windows/Linux/Mac)
* (bluefox/simatec) Backitup switched to Javascript
* (bluefox/simatec) shell support removed
* (bluefox/simatec) Deleting old backups up to the last X backups added
* (bluefox/simatec) restore feature added (beta)
* (bluefox/simatec) Restore added via NAS/FTP/Local/Dropbox (Beta)
* (simatec) NFS support added
* (bluefox) Dropbox Support added
* (bluefox) Fix History
* (peoples) Added silent mode for telegram
* (simatec) Redis/mysql added with standard backup
* (simatec) translations added
* (simatec) Docs adapted

### 0.2.7 (29.07.2018)
* (simatec) Fix Delete old Files

### 0.2.6 (27.07.2018)
* (bluefox) Configurable redis path was added
* (simatec) Translations Script
* (simatec) Fix FTP Upload

### 0.2.5 (26.07.2018)
* (simatec) Check for dependencies
* (simatec) Delete older files if number of files greater than X
* (simatec) Check for Backup Dir
* (simatec) Translations added

### 0.2.4 (23.07.2018)
 * (peoples) Some Bugfixes
 * (peoples) Added translations in words.js


### 0.2.3 (19.07.2018)
 * (bluefox) The backup buttons in configuration dialog were added
 * (bluefox) Show bash output text
 * (peoples) Bug Fix Mysql-Login Error

### 0.2.2 (17.07.2018)
 * (peoples/simatec/bluefox) Bug Fix Code

### 0.2.1 (15.07.2018)
 * (peoples/simatec) Bug Fix

### 0.2.0 (14.07.2018)
 * (blufox) Code formatting

### 0.1.8 (11.07.2018)
 * (darkiop) MySQL-Sicherung um Host- und Portabfrage erweitert
 * (peoples) Versendende Telegram-Instanz wählbar
 * (peoples) Telegram-Nachrichten angepasst an Verbindungstyp
 * (peoples) History-Log angepasst an Verbindungstyp
 * (simatec) Komprimierung der MySQL-Datenbank-Sicherung eingebaut
 * (simatec) Anpassung der Konfigoberfläche an Telegram-Instanz Auswahl

### 0.1.7 (05.07.2018)
 * (peoples) Datenpunkte in io-package definiert

### 0.1.6 (04.07.2018)
 * (simatec/peoples) Beta Version

### 0.1.5 (03.07.2018)
 * (peoples) Log Einträge neu formatiert

### 0.1.4 (02.07.2018)
 * (simatec/peoples) diverse Anpassungen

### 0.1.3 (01.07.2018)
 * (simatec/peoples) Sprachen hinzugefügt

### 0.1.2 (30.06.2018)
 * (simatec/peoples) Erste Beta-Version

### 0.1.0 (25.06.2018)
 * (simatec/peoples) Erste Git-Adapter-Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2019 simatec <nais@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.