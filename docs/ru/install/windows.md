---
title: Окна
lastChanged: 18.07.2019
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/windows.md
hash: XFdcrokNPGtTri8RFE+c4m/7TgKEDdKqtTLfO7BRt1s=
---
# Установка ioBroker на Windows
?> ***Эта статья в настоящее время расширяется*** .<br><br> Помогите с ioBroker. Обратите внимание на [Руководство по стилю ioBroker](community/styleguidedoc), чтобы изменения можно было легко применить.

Следующие инструкции проведут вас через пошаговые инструкции по установке. Пожалуйста, не пропускайте никаких шагов, так как некоторые команды дополняют друг друга.

## Проверить требования
!> Сначала проверьте, выполняет ли система все необходимые [Требования к установке](install/requirements).

Node.js требуется для запуска ioBroker. Далее предполагается, что на ПК не установлены ни Node.js, ни ioBroker. Если ioBroker уже установлен, перейдите к разделу [Обновление] ().

Чтобы узнать, установлен ли Node.js, комбинация клавиш <kbd>⊞ Windows</kbd> + <kbd>r</kbd> открывает диалоговое окно `Ausführen`, а затем команду

```
cmd.exe /C node -v & pause
```

вошел. После подтверждения команды появится окно.

![Версия Node.js](../../de/install/media/w02nodecheck.png) *Проверка Node.js*

Отображается сообщение об ошибке или установленная версия Node.js.

Если выводится номер версии Node.js, вы должны сначала проверить, соответствует ли он по-прежнему [Требования к установке] ().

Если сообщение об ошибке - `Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`, значит, node.js не установлен, а установка - [можно начать прямо сейчас](#nodeinst).

## Быстрый старт
?> Это краткое изложение шагов по установке предназначено для опытных пользователей ioBroker, которые уже установили ioBroker несколько раз.

Новички должны следовать [подробные инструкции](#nodeinst).

* Версия Node.js 8.x LTS [загрузка и установка] (install / nodejs).
* Откройте командную строку cmd.exe от имени администратора и выполните следующие команды одну за другой.

  исполняйте:

```
npm install --global windows-build-tools
md C:\iobroker
cd /d C:\iobroker
npm install iobroker
npm install --production --no-optional --logevel=error
iobroker status
```

<div id="nodeinst"></div>

## Установка Node.js и npm
Node.js устанавливается в соответствии с [этого руководства](install/nodejs).

## Установка ioBroker
?> ioBroker можно установить в любую папку на локальном жестком диске. Если путь установки содержит пробелы, полный путь должен быть заключен в кавычки для всех команд.
Пример команды: `dir "C:\ioBroker Testsystem"`.

?> Папка установки по умолчанию для ioBroker - `C:\iobroker`.

1. Откройте окно командной строки от имени администратора. Для этого используйте комбинацию клавиш

<kbd>⊞ Windows</kbd> + <kbd>r</kbd> откройте диалоговое окно `Ausführen` и введите команду

```
cmd
```

   Вход.

Поскольку окно командной строки должно быть открыто от имени администратора, заполните запись **не** с помощью `OK`, а с помощью комбинации клавиш `Strg` + `Umschalt` + `Eingabetaste` . Существует секретный вопрос, который необходимо подтвердить с помощью `Ja` или ввода пароля администратора.

!> Строка заголовка в открывшемся черном окне командной строки должна начинаться со слова `Administrator:`.

?> Некоторые адаптеры ioBroker содержат компоненты, которые необходимо компилировать для Windows. Поэтому перед установкой ioBroker устанавливаются так называемые `windows-build-tools`. Более подробную информацию о `windows-build-tools` можно найти в [быть найденным здесь](https://github.com/felixrieseberg/windows-build-tools).

1. `windows-build-tools` устанавливаются с помощью следующей команды:

```
npm install --global windows-build-tools
```

1. Затем в окне командной строки команду для создания папки установки.

   исполняйте:

```
md C:\iobroker
```

1. Теперь можно установить фактический установочный пакет ioBroker:

```
cd /d C:\iobroker
npm install iobroker
```

   Результат должен выглядеть так:

```
[...]
╭───────────────────────────────────────────────────────╮
│ The iobroker files have been downloaded successfully. │
│ To complete the installation, you need to run         │
│                                                       │
│   npm i --production --no-optional --logevel=error    │
│                                                       │
╰───────────────────────────────────────────────────────╯

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\iobroker\package.json'
npm WARN iobroker No description
npm WARN iobroker No repository field.
npm WARN iobroker No README data
npm WARN iobroker No license field.

+ iobroker@1.3.0
added 51 packages from 28 contributors and audited 83 packages in 6.937s
found 0 vulnerabilities
```

1. Установка ioBroker завершается следующими командами:

```
cd /d C:\iobroker
npm install --production --no-optional --logevel=error
```

Процесс установки может занять некоторое время. При запуске npm могут появляться красные сообщения об ошибках (gyp! ERR) в связи с модулем `unix-dgram`. Эти сообщения об ошибках можно игнорировать.

   Последние строки установки должны заканчиваться примерно так:

```
[...]
Write "iobroker start" to start the ioBroker
npm install node-windows@0.1.14 --production --no-optional --logevel=error --save --prefix "C:/iobroker"
ioBroker service installed. Write "serviceIoBroker start" to start the service and go to http://localhost:8081 to open the admin UI.
To see the outputs do not start the service, but write "node node_modules/iobroker.js-controller/controller"
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 (node_modules\unix-dgram):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 install: `node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

added 514 packages from 300 contributors and audited 1808 packages in 61.874s
found 23 vulnerabilities (17 low, 6 high)
run `npm audit fix` to fix them, or `npm audit` for details
```

1. Затем вы можете использовать команду

```
iobroker status
```

проверьте, запускался ли ioBroker автоматически как служба Windows.
Ответ должен быть либо

```
iobroker is running
```

   или

```
iobroker is not running
```

   звенеть.

   Если ioBroker не запустился автоматически, введите следующие команды:

```
net start iobroker.exe
iobroker status
```

   Ответ должен быть сейчас

```
iobroker is running
```

   звенеть.

?> В будущем ioBroker будет запускаться автоматически в фоновом режиме при каждом перезапуске системы.

1. Наконец, окно командной строки можно открыть, выполнив команду

```
exit
```

   закрывается.

?> Дальнейшая настройка происходит с помощью адаптера `Admin`. Он вызывается с помощью веб-браузера и адреса [http:// локальный: 8081](http://localhost:8081). Через сеть Конфигурация ioBroker подробно описана в главе [Конфигурация] ().

?> Теперь рекомендуется запустить [учебник] () для начинающих. Здесь шаг за шагом представлен интерфейс администрирования и сделаны необходимые базовые настройки.

## Обновить
@@@ tbd @@@

## Исправление проблем
@@@ tbd @@@