---
chapters: {"pages":{"en/adapterref/iobroker.go-e/README.md":{"title":{"en":"ioBroker.go-echarger"},"content":"en/adapterref/iobroker.go-e/README.md"},"en/adapterref/iobroker.go-e/docs/Readme.md":{"title":{"en":"Functionalities"},"content":"en/adapterref/iobroker.go-e/docs/Readme.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.go-e/README.md
title: ioBroker.go-echarger
hash: zX70YMf7v0mTpOjZafA6U5EiR0zjLuU5kd6ciU8vh84=
---
![Логотип](../../../en/adapterref/iobroker.go-e/admin/go-echarger.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.go-e.svg)
![Apache 2.0](https://img.shields.io/github/license/MK-2001/ioBroker.go-eCharger)
![Загрузки](https://img.shields.io/npm/dm/iobroker.go-e.svg)
![Количество установок (последние)](http://iobroker.live/badges/go-e-installed.svg)
![Версия установки (стабильная)](http://iobroker.live/badges/go-e-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/MK-2001/ioBroker.go-e/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.go-e.png?mini=true)
![Значок кодификации](https://app.codacy.com/project/badge/Grade/34be1ff5fb7943c4aab5ec6a06f0e4a5)

# ioBroker.go-echarger

# Настенное зарядное устройство go-eCharger

![Изображение товара](../../../en/adapterref/iobroker.go-e/admin/go-eCharger-HOME-Wallbox.png) Для получения более подробной информации посетите <https://go-e.co/>

## Уведомление

В настоящее время этот адаптер работает только с API v1. Поддержка API v2 пока не добавлена. Пожалуйста, убедитесь, что в приложении включен API v1.

Адаптер позволяет использовать API v1 и использовать его функции в V2. Немного информации о том, как активировать приложение API v1 и v2, включено.

## Адаптер go-eCharger для ioBroker

**EN** go-e — это приглашение к электрическому движению. Электромобильность — наша движущая сила, а наша основная компетенция — это технологии зарядки электромобилей. От индивидуальных зарядных станций для электромобилей до фотоэлектрических подключений и управления нагрузкой целых зданий — мы предлагаем комплексные системные решения для всех требований современной электромобильности.

**DE** go-e ist die Aufforderung, sich elektrisch zu bewegen. e-Mobilität - это Antrieb, wobei unsere Kerncompetenz die Ladetechnik für Elektroautos ist. Для получения дополнительной информации о Ladestation für e-Autos используйте фотовольтаическую привязку, которая будет использоваться для последнего управления электромобилями, а также с использованием Anbieter Gesamtheitlicher Systemlösungen для комплексного обслуживания современной электронной мобильности.

## Руководство пользователя ioBroker-Adapter / Краткое руководство по началу работы

Инструкцию по установке и настройке можно найти здесь: [Инструкция по адаптеру](/#/docs/adapterref/iobroker.go-e/docs/Readme.md)

## Руководство разработчика

Присоединяйтесь к сообществу адаптеров <https://t.me/goECharger>

Официальная документация по API: <https://github.com/goecharger/go-eCharger-API-v1> <https://github.com/goecharger/go-eCharger-API-v2>

Официальная поддержка продукта: <https://go-e.co/support/>

## Переводы

Большинство переводов взяты с сайта [https://translator-ui.iobroker.in.](https://translator-ui.iobroker.in) Если что-то пошло не так во время перевода, пожалуйста, помогите.

## Авторские права

Авторские права (c) 2024 MK-2001 <go-e@itinsi.de>

## Changelog

### 1.0.42
* Changed Adapter Core


### 1.0.41
* Update of dependencies
* Default PSM Grid mode selectable
* Bug in negate when using go-e software (Thanks to Markus D.)
* ioBroker updates on core packes (dependencies update)

### 1.0.38
* Bug on Negate Watts if use Go-e charger

### 1.0.35
* switch between ioBroker and go-e Hardware logic for PV-Calculation
* Adding phaseSwitch Buffer to reduce switch on coudy days
* improved documentation
* Bug #232
* Wrong deafult value type

### 1.0.32
* Timer for loading

### 1.0.31
* Versioning updates

### 1.0.30
* added max ampere in settings
* Added level to switch 1-phase to 3 pahases
* enables phasesSwitchMode
* Only possible if V2 is enabled
* some bugs

### 1.0.29
* Bugfixes.

[Additional moved here](https://github.com/MK-2001/ioBroker.go-e/blob/master/CHANGELOG_OLD.md)

## License
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.