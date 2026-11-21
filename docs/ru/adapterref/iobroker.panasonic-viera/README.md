---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.panasonic-viera/README.md
title: ioBroker.panasonic-viera
hash: +nvR4AcRog79ShVYmtLuauzVCTS/AidGc8z3dlgx+aU=
---
![логотип](../../../en/adapterref/iobroker.panasonic-viera/admin/panasonic-viera.png)

![Статус сборки](https://github.com/iobroker-community-adapters/ioBroker.panasonic-viera/actions/workflows/test-and-release.yml/badge.svg)
![Количество установок](https://iobroker.live/badges/panasonic-viera-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.panasonic-viera.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.panasonic-viera.svg)
![НПМ](https://nodei.co/npm/iobroker.panasonic-viera.png?downloads=true)

# ioBroker.panasonic-viera

## Адаптер для смарт-телевизора Panasonic Viera, совместимый с ioBroker.

Это адаптер ioBroker для вашего смарт-телевизора Panasonic Viera.

## Настройка и сопряжение

### 1. Подготовьте телевизор.

1. Включите телевизор.
2. Открыть `Menu -> Network -> TV Remote App Settings` и включите **все** эти **функции** :
   - **Пульт от телевизора**
   - **Работает на основе приложений**
   - **Сетевой резерв**
3. Открыть `Menu -> Network -> Network Status -> Status Details` и запишите IP-адрес телевизора. Лучше всего присвоить телевизору фиксированный IP-адрес в маршрутизаторе, чтобы он не изменился в дальнейшем.

### 2. Выясните, требуется ли сопряжение вашего телевизора.

- **Более старые телевизоры (примерно до 2019 года)** взаимодействуют с адаптером в незашифрованном виде. **Сопряжение не** требуется: введите только IP-адрес, а поля **«Идентификатор приложения»** и **«Ключ шифрования»** оставьте пустыми.
- **Более новые телевизоры** принимают только зашифрованные команды. Им необходимы **идентификатор приложения** и **ключ шифрования** , которые адаптер получает один раз, сопрягая его с PIN-кодом, отображаемым на телевизоре (шаг 4).

Если вы не уверены, попробуйте сначала без сопряжения: введите только IP-адрес, сохраните и нажмите любую клавишу на вкладке « **Пульт дистанционного управления»** . Если телевизор реагирует, значит, все готово. Если нет, выполните сопряжение.

### 3. Введите IP-адрес

1. Убедитесь, что `panasonic-viera` Экземпляр **запущен** (в журнале может по-прежнему отображаться сообщение «Пожалуйста, настройте» — это нормально). Поиск телевизоров и сопряжение выполняются запущенным экземпляром.
2. Откройте настройки экземпляра.
3. **IP-адрес** : щелкните в поле. Вам будет предложен выбор телевизоров, подключенных к вашей сети. В противном случае введите IP-адрес.

### 4. Выполните сопряжение телевизора (только для более новых моделей).

Все настройки находятся во вкладке **«Настройки»** , в разделе **«Сопряжение» (только для новых телевизоров)** :

1. **Включите** телевизор (не переводите в режим ожидания).
2. Нажмите кнопку **«Показать PIN-код» на телевизоре** . На экране телевизора отобразится 4-значный PIN-код для пульта дистанционного управления «ioBroker».
3. Введите PIN-код в **поле, отображаемое на экране телевизора** .
4. Нажмите **«Сопряжение»** . **Идентификатор приложения** и **ключ шифрования** будут заполнены.
5. **Сохраните** настройки. Устройство перезапустится и будет взаимодействовать с телевизором в зашифрованном виде.

Сам PIN-код не сохраняется, сохраняются только идентификатор приложения и ключ шифрования.

Если это не сработает:

- **PIN-код не отображается** или появляется сообщение о том, что телевизор не отвечает: телевизор должен быть **включен** (не в режиме ожидания), **пульт дистанционного управления** должен быть включен (шаг 1), а IP-адрес должен совпадать с IP-адресом телевизора.
- **Неверный PIN-код** : он был введен неправильно. Введите его снова и нажмите **«Сопряжение»** . Если PIN-код исчез с экрана телевизора, снова нажмите **«Показать PIN-код» на телевизоре** — на экране телевизора отобразится новый PIN-код.
- **«Пожалуйста, дождитесь, пока телевизор отобразит PIN-код»** : сначала нажмите кнопку **«Показать PIN-код» на телевизоре** . Также после перезагрузки устройства или по истечении более 5 минут потребуется ввести новый PIN-код.
- **Ошибка сразу после "Показать PIN-код на телевизоре"** на старых телевизорах: старые телевизоры не поддерживают сопряжение — оно им не нужно (шаг 2).

### 5. Проверьте, работает ли оно.

`panasonic-viera.0.info.connection` становится `true` При этом телевизор отвечает на вызовы, а вкладка «Пульт **дистанционного управления»** в настройках управляет телевизором.

Если телевизор перестал реагировать после обновления прошивки или сброса до заводских настроек, выполните сопряжение снова (шаг 4).

## Канал `tv` (детектор типа)

Помимо существующих объектов, адаптер создает канал. `panasonic-viera.0.tv`, который детектор типов ioBroker (>= 6.2.0) распознает как тип устройства. `tv` С помощью программы Visualizations и адаптера устройств можно управлять телевизором:

| Состояние       | Роль                            | Описание                                                                                              |
| --------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `tv.power`      | `switch.power`                  | Вкл./Выкл. (У телевизора есть только кнопка-переключатель, она отправляется только при необходимости) |
| `tv.key`        | `media.key`                     | ключ: `UP`, `DOWN`, `SELECT`, `BACK`, `HOME`, `NUMBER_1`, `RED`, ...                                  |
| `tv.volume`     | `level.volume`                  | объем 0-100                                                                                           |
| `tv.muted`      | `media.mute`                    | немой                                                                                                 |
| `tv.volumeUp`   | `button.volume.up`              | увеличить громкость                                                                                   |
| `tv.volumeDown` | `button.volume.down`            | уменьшить громкость                                                                                   |
| `tv.input`      | `media.input`                   | `TV`, `HDMI1`... `HDMI4`                                                                             |
| `tv.app`        | `media.app`                     | Запустить приложение: `YOUTUBE`, `NETFLIX`, `PRIME_VIDEO`, `BROWSER`, ...                             |
| `tv.unreach`    | `indicator.maintenance.unreach` | Телевизор не отвечает на пинг.                                                                        |

`tv.app` В первую очередь, адаптер предлагает YouTube, Netflix, Prime Video и браузер. Как только телевизор включен, адаптер считывает установленные на телевизоре приложения и предлагает те из них, которые распознает устройство определения типа устройства. На вкладке «Пульт **дистанционного управления»** расположены кнопки для этих же приложений.

Для включения телевизора через сеть необходимы **режимы «Сетевой режим ожидания»** и **«Включение от приложений»** на телевизоре.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (bluefox) Added connectionType and dataSource to io-package.json
- (bluefox) Corrected the role of info.tv_on
- (bluefox) Adapter is tested with node.js 22, 24 and 26

### 2.2.0 (2026-10-29)
- (bluefox) The adapter was refactored to TypeScript and JsonConfig
- (bluefox) Fixed the buttons basic.VOLUP, basic.VOLDOWN and basic.LEFT, they sent an invalid key
- (bluefox) The adapter no longer restarts when the TV answers the ping but not the mute request
- (bluefox) The IP field offers the TVs found in the network
- (bluefox) Newer (encrypted) TVs can be paired with a PIN directly in the settings
- (bluefox) Added a remote control to the instance settings (tab "Remote control", requires admin 8)
- (bluefox) Added the channel `tv` for the device type `tv` of the type-detector, so visualizations and the devices adapter can control the TV
- (bluefox) Apps like YouTube and Netflix can be started (`tv.app` and buttons in the remote control)
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (copilot) **CI/CD**: Updated GitHub Copilot instructions template to v0.5.7

### 2.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.0 (2021-05-09)
* (jens-maus) added support to set Application and Encryption Key in adapter admin
* (jens-maus) changed adapter to use node-panasonic-viera to support modern TV models

### 1.0.2
* (cyberindy) some fixes

### 1.0.1
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2021 ldittmar <iobroker@lmdsoft.de>, Jens Maus <mail@jens-maus.de>

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