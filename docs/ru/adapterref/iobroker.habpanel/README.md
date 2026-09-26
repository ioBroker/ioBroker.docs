---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: aSH9A13YJXwEXrBNweRSbqssJr9w/v5FtYlP+DSpb6w=
---
![Логотип](../../../en/adapterref/iobroker.habpanel/admin/habpanel.svg)

![Количество установок](http://iobroker.live/badges/habpanel-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![НПМ](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# ioBroker.habpanel

HABPanel — это облегченный интерфейс панели управления для ioBroker, основанный на OpenHAB HABpanel.

Примечательно, что в нем предусмотрен встроенный конструктор панелей управления, позволяющий легко создавать интерфейсы прямо на целевом устройстве.

## Установка

**Важно!** Этот адаптер нельзя установить напрямую из GitHub. Только из npm.

## Начиная

- При первом доступе к HABPanel в новом браузере или на новом устройстве вы увидите довольно пустой экран — следуйте инструкциям и начните с нажатия (или касания) значка в правом верхнем углу.
- Теперь вы находитесь в режиме редактирования, появилась ссылка ( _«Добавить новую панель управления»_ ), а также ссылка _«Расширенные настройки»_ .
- Если вы ранее использовали HABPanel и сохранили некоторые конфигурации панелей на сервере, перейдите в _«Расширенные настройки»_ и щелкните по своей предыдущей конфигурации — она мгновенно вернется. Или создайте свою первую панель мониторинга: щелкните/коснитесь ссылки _«Добавить новую панель мониторинга»_ и дайте ей имя.
- Нажмите/коснитесь плитки панели управления, чтобы перейти в редактор панели управления.
- Добавьте свой первый виджет: выберите меню _«Добавить виджет»_ и укажите тип виджета (например, «Dummy» — простой виджет, отображающий состояние элемента).
- Перемещайте виджет перетаскиванием и изменяйте его размер с помощью белой стрелки-шеврона, которая появляется при нажатии на виджет.
- Нажмите на три точки в правом верхнем углу виджета, чтобы открыть его контекстное меню, и выберите _«Редактировать...»._
- Отрегулируйте некоторые параметры (название, элемент openHAB и т. д.) и подтвердите изменения.
- Сохраните конфигурацию, нажав кнопку _«Сохранить»_ .
- Нажмите/коснитесь _«Запустить»_ , чтобы увидеть свою панель управления в действии — используйте кнопку «Назад» в браузере или стрелку, чтобы вернуться к началу.
- Когда вы будете удовлетворены своим набором панелей мониторинга, вернитесь в раздел _«Расширенные настройки»_ , затем нажмите/коснитесь _«Сохранить текущую конфигурацию в новую конфигурацию панели»_ ; это сохранит ее на сервере openHAB 2, как описано выше, и сделает ее доступной для повторного использования.

## Скриншоты

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.0 (2026-09-25)
- (nowrap) Chart series are no longer truncated to 500 values (#149)
- (nowrap) getHistory no longer invokes its callback twice on a late answer
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated.
- (@GermanBluefox) SVG Logo

### 0.5.0 (2022-02-16)
* (jogibear9988) added on support for new websockets

### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

## License
Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright 2017-2022 bluefox <dogafox@gmail.com>

Eclipse Public License