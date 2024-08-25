---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: hHIZNEpqahzbPHmd5jNTEvsyMnBQA3XJMv/XzPDzXXo=
---
# IoBroker.webui

![Количество установок](https://iobroker.live/badges/webui-installed.svg)
![Стабильная версия](https://iobroker.live/badges/webui-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.webui.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webui.svg)
![НПМ](https://nodei.co/npm/iobroker.webui.png?downloads=true)

вебуи для ioBroker

![изображение](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Обучающие видео (атм. только на немецком языке)
https://www.youtube.com/@jogibear9988

## Описание
Это полноценная система визуализации для ioBroker.

Он включает в себя такие функции, как:

  - собственный простой язык сценариев
  - привязка к объектам ioBroker, включая конвертеры и выражения JavaScript.
  - вставка изображений из буфера обмена
  - перетаскивание внешних изображений
  - перетащите объекты ioBroker для автоматического создания привязок
  - перетащите объекты ioBroker в Свойства, чтобы создать к ним привязки.
  - относительные пути сигналов к объектам ioBroker на экранах (полный путь можно передать снаружи на экран)
  - редактирование HTML-кода в разделенном режиме
  - глобальная поддержка таблиц стилей
  - использование пакетов npm, содержащих веб-компоненты
  - экраны внутри экранов
  - используйте все пакеты значков от ioBroker
  - используйте графики от ioBroker
  - использовать идентификаторы объектов комбинированных сигналов, например. "webui.0.test3.{webui.0.test3.select}" -> в качестве имени сигнала будет использоваться значение из webui.0.test3.select.

## Монтаж
### Зависимости
  - Вам необходимо установить веб-адаптер. Он работает со следующими настройками: ![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)

## Концепции
### Описание
Конструктор использует веб-компоненты, поэтому разрабатываемый вами HTML-код находится внутри Shdowroot веб-компонента. Это мужские вещи, ты не можешь их стилизовать<body> или<html> внутри таблицы стилей. Чтобы стилизовать внешний макет, используйте селектор «:host». Это также означает, что вы не можете использовать обработчики событий «on...». Используйте назначение события «@...».

### Пользовательские элементы управления в WebUI
Вы можете создавать собственные повторно используемые элементы управления CustomControl в WebUI. Он может иметь отдельный Javascript, свойства и шаблон.

Вы можете использовать синтаксис двойных скобок и синтаксис двойных фигурных скобок «BaseCustomWebcomComponent» для создания привязок из шаблона к свойствам, определенным в конструкторе. Curylbrackets создают двусторонние привязки.
Если вы используете диалоговое окно «Привязки», вы можете привязаться к свойству с помощью ??Propertyname и к объекту ioBroker в свойстве через ?Propertyname.
В сценариях вы также можете писать сигналы, определенные в пользовательских свойствах.

Вы также можете включить Javascript в свой CustomControl или Screen. Также вы можете использовать экспорт функции «init(instance)», которая будет вызываться при создании экземпляра вашего CustomControl. (а также можно использовать подключенные и отключенные функции)

## Спонсорство
Если вы хотите помочь развитию, спонсируйте этот проект по адресу https://github.com/sponsors/jogibear9988.

## Разработка
  * Установите репозиторий как адаптер в IOBroker.
  * Загрузите репозиторий в дополнительный каталог «dev», не разрабатывайте его внутри каталога ioBroker Node_modules.
  * Выполните следующие шаги внутри каталога «dev».

  * Установить зависимости

```
  $ npm install
```

  * Скомпилируйте Typescript после внесения изменений (или нажмите Ctrl + Shift + B в VsCode и выберите «tsc watch»)

```
  $ npm run tsc
```

  * Настройте файл config.js, чтобы он соответствовал вашему IP-адресу и порту вашего iobroker.

   (При запуске npm build файл config.js в корне репозитория будет заменен файлом в «/config»).

```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

  * Запустите приложение на локальном сервере.

```
  $ npm start
```

  * Перейдите в Chrome к [localhost:8000](), чтобы увидеть приложение.

### Подробнее о разработке
  - Бегать

```
  $ npm run reflection
```

   воссоздать файлы отражений для сценариев, которые используются для сетки свойств.

  - Бегать

```
  $ npm run build
```

   скопировать скомпилированные файлы и node_modules в папку www, чтобы адаптер можно было установить через github

  - Бегать

```
  $ npm run release
  $ npm publish
```

чтобы создать правильную фиксацию выпуска для iobroker. Будьте осторожны, это также нажимает на git-репо.
Обязательно отредактируйте «CHANGELOG.md» перед этим, текст «## **РАБОТА В ПРОЦЕССЕ**» в README.Md будет использоваться для информации о версии.

## Информация об адаптере.
Адаптер основан на следующем компоненте Designer: https://github.com/node-projects/web-comComponent-designer.

Вам нужно создать экран «Пуск», это первый экран, который вызывается при открытии runtime.html, но вы можете изменить его с помощью параметра запроса: runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 1.11.3 (2024-06-02)
- fix load subfolders

### 1.11.2 (2024-06-01)
- screens grid view

### 1.11.1 (2024-05-31)
- fix icons view path

### 1.11.0 (2024-05-31)
- add a icons view

### 1.10.9 (2024-05-30)
- show undo count

### 1.10.8 (2024-05-30)
- better tooltip for multiplex
- remove unused solution entries

### 1.10.7 (2024-05-29)
- fix iframe d&d

### 1.10.6 (2024-05-29)
- better evt editor for new events

### 1.10.5 (2024-05-29)
- show events on webui controls

### 1.10.4 (2024-05-29)
- work on events

### 1.10.3 (2024-05-29)
- add events service for manifest

### 1.10.2 (2024-05-28)
- fix getDomelement

### 1.10.1 (2024-05-28)
- support classlist in setElementProperty

### 1.10.0 (2024-05-28)
- fix screen & parent screen access

### 1.9.10 (2024-05-28)
- fixes for blockly

### 1.9.9 (2024-05-28)
- fix firefox

### 1.9.8 (2024-05-27)
- try faster loading

### 1.9.7 (2024-05-27)
- fix change root style

### 1.9.6 (2024-05-27)
- fix null ref

### 1.9.5 (2024-05-27)
- few small changes

### 1.9.4 (2024-05-27)
- fix scripts not workin

### 1.9.3 (2024-05-27)
- update packages

### 1.9.2 (2024-05-27)
- fix screenviewer styles

### 1.9.1 (2024-05-27)
- fix first div styled from designer when zoom

### 1.9.0 (2024-05-27)
- fix zooming of child screens

### 1.8.9 (2024-05-26)
- one more spec. calculation fix

### 1.8.8 (2024-05-26)
- need to await stylesheet parse

### 1.8.7 (2024-05-26)
- fix specificity calculation

### 1.8.6 (2024-05-21)
- fix in designer property grid

### 1.8.5 (2024-05-21)
- stretch property for screenviewer
- screennames in property list (property services now async)

### 1.8.4 (2024-05-20)
- fix typo in bindingshelper

### 1.8.3 (2024-05-20)
- fix style parsing and style bindings at runtime

### 1.8.2 (2024-05-19)
- fix in manifest parser of designer

### 1.8.1 (2024-05-19)
- fix manifest parsing

### 1.8.0 (2024-05-19)
- bindings inside of css

### 1.7.8 (2024-05-19)
- fix remove of ctx menu

### 1.7.7 (2024-05-17)
- fix stylesheet matching

### 1.7.6 (2024-05-17)
- fix edit text in transformed surface

### 1.7.5 (2024-05-17)
- more fixes with transformed elements

### 1.7.4 (2024-05-16)
- designer transformation fixes

### 1.7.3 (2024-05-15)
- fix transform combinations in designer
- fix treeview jump to

### 1.7.2 (2024-05-15)
- few more small designer fixes

### 1.7.1 (2024-05-15)
- fix in designer

### 1.7.0 (2024-05-15)
- Add screen contextmenu
- support editing of repeat in grid colum/row templates
- designer updates
- force styles

### 1.6.5 (2024-05-07)
- designer update

### 1.6.4 (2024-05-05)
- expand/collapse of child nodes in tree
- undock all windows

### 1.6.3 (2024-05-05)
- jump to all css declarations

### 1.6.2 (2024-05-04)
- jump to styles

### 1.6.1 (2024-05-02)
- better icons

### 1.6.0 (2024-05-02)
- remove metro ui

### 1.5.4 (2024-05-02)
- fix delay command

### 1.5.3 (2024-05-02)
- fixes after package updates

### 1.5.2 (2024-05-02)
- removed missing prop

### 1.5.1 (2024-05-02)
- add delay in blockly & npm updates

### 1.5.0 (2024-04-28)
- nicer two way bindings

### 1.4.9 (2024-04-24)
- fix toastify

### 1.4.8 (2024-04-20)
- fix for controller v6

### 1.4.7 (2024-04-20)
- compact mode on controler 6 support

### 1.4.6 (2024-04-10)
- fix encoding for all files

### 1.4.5 (2024-04-10)
- fix gulp5 copy breaks fonts

### 1.4.4 (2024-04-10)
- fix compile error

### 1.4.3 (2024-04-10)
- fix copy of font

### 1.4.2 (2024-04-09)
- stretch support in screens

### 1.4.1 (2024-04-09)
- support relative signal paths in scripts

### 1.4.0 (2024-04-08)
- parameter support for scripts

### 1.3.2 (2024-04-02)
- designer upd

### 1.3.1 (2024-04-01)
- designer updates for toolbars

### 1.3.0 (2024-04-01)
- designer update

### 1.2.13 (2024-03-28)
- disabled control fix

### 1.2.12 (2024-03-28)
- add dayjs for date formating

### 1.2.11 (2024-03-28)
- add a indirection level in complex signal binding

### 1.2.10 (2024-03-28)
- package upgrades

### 1.2.9 (2024-03-26)
- try fix runtime once more

### 1.2.8 (2024-03-26)
- runtime should not load designer

### 1.2.7 (2024-03-26)
- fix used wrong script system

### 1.2.6 (2024-03-25)
- one more small runtime fix

### 1.2.5 (2024-03-25)
- fix runtime once more

### 1.2.4 (2024-03-25)
- fix runtime

### 1.2.3 (2024-03-24)
- designer upgrade for new features

### 1.2.2 (2024-03-11)
- fix broken signals selector in scripts

### 1.2.1 (2024-03-11)
- build broken after refactoring

### 1.2.0 (2024-03-11)
- extracted some code for usability
- better text edit
- better split view (selection matches now)
- round pixel values

### 1.1.4 (2024-03-02)
- designer-update: mathML support, svg foreignObject support
- better text edit support

### 1.1.3 (2024-02-29)
- text edit now workin
- package updates

### 1.1.2 (2024-02-27)
- fix broken designer package

### 1.1.1 (2024-02-27)
- designer and docking fixes

### 1.1.0 (2024-02-26)
- support undock to new browser window
- preview fixes for position: static in styles

### 1.0.56 (2024-02-26)
- screenviewer - add also nodes from domparser head

### 1.0.55 (2024-02-22)
- more designer fixes

### 1.0.54 (2024-02-22)
- multiple designer fixes

### 1.0.53 (2024-02-19)
- fix lazy bound lit event name

### 1.0.52 (2024-02-19)
- fix captured local

### 1.0.51 (2024-02-19)
- fix lazy loaded lit elments
- fix script url

### 1.0.50 (2024-02-18)
- again fix in class binding

### 1.0.49 (2024-02-18)
- class is attribute in bindings
- fix error logging

### 1.0.48 (2024-02-17)
- fix wunderbaum error

### 1.0.47 (2024-02-15)
- designer fixes with property grid

### 1.0.46 (2024-02-15)
- designer updates

### 1.0.45 (2024-02-12)
- update designer with bugfixes

### 1.0.44 (2024-02-11)
- fix bindings in designer

### 1.0.43 (2024-02-11)
- refresh tree when controls deleted

### 1.0.42 (2024-02-11)
- fix grid resize
- fix grid extension display

### 1.0.41 (2024-02-10)
- better element drawing (with undo)
- better title extension

### 1.0.40 (2024-02-10)
- dblclick in solution should not change tool
- designer update for performance fixes

### 1.0.39 (2024-02-09)
- upgrade designer package once more to fix some issues

### 1.0.38 (2024-02-09)
- fix blockly
- add blockly templated string
- work on adopted styles
- update designer to fix snaplines

### 1.0.37 (2024-01-31)
- designer fix for background

### 1.0.36 (2024-01-31)
- upgade to new designer for better style encapsulation

### 1.0.35 (2024-01-30)
- package upgrades (fix in designer for css patching)
- typos

### 1.0.34 (2024-01-28)
- indirect signal for $ access

### 1.0.33 (2024-01-24)
- one more designer update

### 1.0.32 (2024-01-24)
- fix for nested stylesheets

### 1.0.31 (2024-01-23)
- string could be null

### 1.0.30 (2024-01-22)
- better script errors

### 1.0.29 (2024-01-22)
- remove a few errors

### 1.0.28 (2024-01-22)
- npm upgrade for error of undoservice

### 1.0.27 (2024-01-22)
- toast message on errors

### 1.0.26 (2024-01-22)
- npm package upgrades

### 1.0.25 (2024-01-21)
- use appendChild

### 1.0.24 (2024-01-21)
- fix later loaded scripts

### 1.0.23 (2024-01-21)
- twoway should only set first value
- fix error with noParse

### 1.0.22 (2024-01-20)
- fix binding with unit
- fix refactor service missing command

### 1.0.21 (2024-01-19)
- fix designer grid overlay
- stecil ackage hacks

### 1.0.20 (2024-01-18)
- fix broken split view

### 1.0.19 (2024-01-17)
- simpler one way bindings with expressions

### 1.0.18 (2024-01-17)
- text selection selects in designer

### 1.0.17 (2024-01-16)
- fix opacity of D&D node

### 1.0.16 (2024-01-16)
- fix drag drop of tree nodes

### 1.0.15 (2024-01-14)
- support upper/lowercase and spaces in screens & controls

### 1.0.13 (2024-01-14)
- correct event name in lit bindings

### 1.0.12 (2024-01-14)
- upgrade baseCustomWebcomp for attribute binding

### 1.0.11 (2024-01-14)
- API for reading object lists

### 1.0.10 (2024-01-14)
- fix selected tool

### 1.0.9 (2024-01-14)
- bugfix controls editor

### 1.0.8 (2024-01-14)
- fix import/export

### 1.0.7 (2024-01-14)
- bigger formula editor when multiline

### 1.0.6 (2024-01-14)
- draw widgets when selected in tree

### 1.0.5 (2024-01-14)
- bind to iobroker objects (via $ prefix)

### 1.0.4 (2024-01-14)
- fix open screens in folders

### 1.0.3 (2024-01-14)
- only lowercase folders

### 1.0.2 (2024-01-14)
- variablen in convertern
- configurable meta tags

### 1.0.1 (2024-01-13)
- fix issue with npm

### 1.0.0 (2024-01-13)
- new script command: CalculateSignalValue
- javascript code completition
- better types in code completition
- fix writing of child nodes if content is bound at design time
- use monaco editor in expressions
- use custom var names in expressions
- Screens & Controls can have subfolders
- decl. shadow dom support in screen viewer
- allow 'local_' as tag prefix for local vars

### 0.23.3 (2024-01-04)
- add local valueAsNumber property

### 0.23.2 (2024-01-03)
- again fix runtime was not initialized

### 0.23.1 (2024-01-03)
- fix runtime was not initialized

### 0.23.0 (2024-01-03)
- todo, support 2way bindings too custom properties
- code completition for iobrokerHandler and runtime
- simple scripts, access value of event

### 0.22.7 (2023-12-25)
- and one more...

### 0.22.6 (2023-12-25)
- and one more fix on importmaps

### 0.22.5 (2023-12-25)
- more fixes with import map

### 0.22.4 (2023-12-25)
- work on export directive

### 0.22.3 (2023-12-25)
- fix missing .js extensions

### 0.22.2 (2023-12-25)
- fix scripts

### 0.22.1 (2023-12-25)
- add open screen in blockly

### 0.22.0 (2023-12-25)
- work on esbuild (but not yet ready, delayed till blockly is ESM)
- bugfixes with scripts
- remove typescript, use javascript directly
- typed value on SetValue function

### 0.21.3 (2023-12-20)
- fix set style

### 0.21.2 (2023-12-20)
- more commands in blockly

### 0.21.1 (2023-12-19)
- fixed paths

### 0.21.0 (2023-12-19)
- start of blockly support

### 0.20.7 (2023-12-15)
- fix importmap creation missed "/"

### 0.20.6 (2023-12-12)
- few wunderbaum fixes

### 0.20.5 (2023-12-11)
- better custom properties view

### 0.20.4 (2023-12-11)
- fix in css prop binding

### 0.20.3 (2023-12-11)
- update designer npm

### 0.20.2 (2023-12-11)
- fix for class binding

### 0.20.1 (2023-12-11)
- binding for classes

### 0.20.0 (2023-12-11)
- allow bindings to css vars

### 0.19.3 (2023-12-10)
- switch loglevel

### 0.19.2 (2023-12-10)
- package updates

### 0.19.1 (2023-12-07)
- fix load error

### 0.19.0 (2023-12-07)
- waitForReady needs to be awaited

### 0.18.15 (2023-12-06)
- fix missing null check

### 0.18.14 (2023-12-06)
- fix normal binding unsubscribe

### 0.18.13 (2023-12-06)
- fix historic binding unsubscribe

### 0.18.12 (2023-12-06)
- remove bindings in customcontrols

### 0.18.11 (2023-12-06)
- fix broken load historic

### 0.18.10 (2023-12-06)
- load historic only when previous load is finished

### 0.18.9 (2023-12-05)
- fix tooltips

### 0.18.8 (2023-12-05)
- lazy remove the title

### 0.18.7 (2023-12-05)
- better fix for monaco

### 0.18.6 (2023-12-05)
- fix for monaco bug
- title removed

### 0.18.5 (2023-12-05)
- code completition for base custom webcomponent
- object property type

### 0.18.4 (2023-12-03)
- better text for historic bindings cancel

### 0.18.3 (2023-12-03)
- fix reload in dynamics editor

### 0.18.2 (2023-12-03)
- ui for historic binding
- fixes in refactor view

### 0.18.1 (2023-12-03)
- fixes in refactor service

### 0.18.0 (2023-12-01)
- tooltip in solution explorer
- npm upgrade of designer
- refactor view for bindings and scripts

### 0.17.0 (2023-11-29)
- remove 2 uneeded files
- designer update

### 0.16.6 (2023-11-28)
- check for invalid propertynames
- move properties

### 0.16.5 (2023-11-27)
- copy screen and custom controls

### 0.16.4 (2023-11-27)
- fix usage of webui in windows

### 0.16.3 (2023-11-24)
- extra style for font declarations, they are not allowed in shadow dom

### 0.16.2 (2023-11-23)
- fix remove script command

### 0.16.1 (2023-11-23)
- additional file dnd

### 0.16.0 (2023-11-23)
- add additional files node and upload

### 0.15.1 (2023-11-22)
- export as xml (screens & controls)
- binding historic with reload
- fix dialog

### 0.15.0 (2023-11-19)
- uncloseable dialog 
- css properties for dialog
- binding to historic data

### 0.14.1 (2023-11-12)
- dialog centered

### 0.14.0 (2023-11-12)
- add simple dialog

### 0.13.1 (2023-11-11)
- two way bindings with expressions

### 0.13.0 (2023-11-09)
- fix upercase screen names in runtime
- raster in designer is now adjustable
- copy object nodes now copies complete string
- context menu to directly edit custom element
- fix handler path in script
- uiChangedView now workin
- error when importing invalid file (for example html instead of json)

### 0.12.3 (2023-09-20)
- after eval removal, functions need a return

### 0.12.2 (2023-09-20)
- events names for 2way bindings need a editor

### 0.12.1 (2023-09-20)
- two way for indirect bindings

### 0.12.0 (2023-09-20)
- support indirect bindings via {...} in signals (like in vis)

### 0.11.2 (2023-09-17)
- check npm package name

### 0.11.1 (2023-09-16)
- fix build on windows

### 0.11.0 (2023-09-11)
- dragdrop fixes
- screen/control size fixes
- connected/disconnected callbacks

### 0.10.0 (2023-09-10)
- new script commands
- bugfix with bindings and empty events
- select exported function in javascript
- bugfix in save of screens
- typescript in scripts
- started work on translateable runtime

### 0.9.0 (2023-09-06)
- signal selector in properties
- screen selector in properties
- new screen had style in scripts
- indirect value/property acces from scripts via editor
- list multiple undo entries (on hold of undo)

### 0.8.0 (2023-09-03)
- update designer to add and fix some commands
- move screen/control scripts out of html code
- add a javascript editor view
- bugfix when states where null after a fresh install
- designer addons do now work again
- docking framework updated, cause of bugs with undocking

### 0.7.0 (2023-09-01)
- screens and controls have now settings (width, height, useGlobalStyle)

### 0.6.0 (2023-09-01)
- removed many uneeded files from installation

### 0.5.1 (2023-09-01)
- show version in ui

### 0.5.0 (2023-09-01)
- signal as property type
- removed svg-image control
- shorter custom control tag name
- better dynamics editor
- dock ui fixes
- control ui from backend (switch view, reload)

### 0.4.0 (2023-08-30)
- remove uneeded files from upload
- remove icons into extra iobroker packages
- support icon adapters
- rename screens & controls

### 0.3.0 (2023-08-29)
- default value for custom properties
- open screens only once
- property bindings default one way

### 0.2.3 (2023-08-28)
- rework how custom controls are initalized

### 0.2.2 (2023-08-28)
- better support & fixes of custom elements
- enum properties in custom controls
- sample custom controls

### 0.2.1 (2023-08-28)
- null ref fix in bindings

### 0.2.0 (2023-08-28)
- Import/Export of Screens/Images/Controls
- Define your own Controls directly in webui
- Drag/Drop of Icons/Images to Properties
- Drag/Drop of objects to Bindings-Editor Signalname
- Basic functionality of CustomControls

### 0.1.0 (2023-08-27)
-   initial public release

## License
The MIT License (MIT)

Copyright (c) 2024 jogibear9988 <jochen.kuehner@gmx.de>
