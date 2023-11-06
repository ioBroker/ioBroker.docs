---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: A96T9KF5U5AVrmYLAJDO4JXZRD8QOO7fJfpoZZk4czg=
---
# IoBroker.webui

![Количество установок](https://iobroker.live/badges/webui-installed.svg)
![Стабильная версия](https://iobroker.live/badges/webui-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.webui.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webui.svg)
![НПМ](https://nodei.co/npm/iobroker.webui.png?downloads=true)

вебуи для ioBroker

![изображение](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Обучающие видеоролики (атм. только на немецком языке)
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
  - редактирование HTML-кода в режиме разделенного просмотра
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
Вы можете создавать собственные многоразовые элементы управления CustomControl в WebUI. Он может иметь отдельный Javascript, свойства и шаблон.

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

Вам нужно создать экран «Пуск», это первый экран, вызываемый при открытии runtime.html, но вы можете изменить его с помощью параметра запроса: runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- fix upercase screen names in runtime
- raster in designer is now adjustable
- copy object nodes now copies complete string
- context menu to directly edit custom element
TODO: fix handler path in script
TODO: uiChangedView
TODO: error when importing invalid file (for example html instead of json)

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

Copyright (c) 2023 jogibear9988 <jochen.kuehner@gmx.de>