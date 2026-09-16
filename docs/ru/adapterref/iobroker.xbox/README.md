---
BADGE-Build Status: https://github.com/foxriver76/ioBroker.xbox/workflows/Test%20and%20Release/badge.svg
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xbox/README.md
title: Адаптер Xbox
hash: w8NpF+RSmDIkbo8FUymSp16/6OC8VRY/TqUdHS60ZtA=
---
![логотип](../../../de/adapterref/iobroker.xbox/media/xbox.png)

# Адаптер Xbox

Адаптер Xbox позволяет интегрировать игровую консоль Xbox One или Xbox One X в систему ioBroker.

## обзор

### Игровая консоль Xbox One

Xbox One — это игровая консоль, разработанная Microsoft, которая позволяет запускать популярные современные видеоигры. Кроме того, Xbox One способна управлять различными компонентами домашней кинотеатральной системы и позволяет использовать приложения Microsoft.<br/> В настоящее время существуют и другие версии Xbox One, включая Xbox One X и Xbox One S, которые предлагают те же функции, что и оригинальная консоль, но с улучшенной производительностью.

### Адаптер Xbox

Адаптер Xbox можно подключить одновременно к одной консоли Xbox One, что позволяет управлять ею и считывать информацию.<br/> Адаптер автоматически создает все команды и состояния в виде объектов. Большинство из этих состояний также можно считывать, например, текущее название, состояние включения и т. д. Путем выборочной записи или чтения из этих объектов можно изменять их состояние, тем самым запуская или запрашивая действия.

## Требования перед установкой

1. Перед добавлением адаптера необходимо установить на хост-системе как минимум Python 3.5.
2. Если Xbox необходимо включить через адаптер, в настройках консоли должен быть установлен [режим «Быстрая загрузка»](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes) .

## День благодарения

Большое спасибо [команде Open Xbox](https://openxbox.org/) за разработку и предоставление [xbox-rest-server](https://github.com/OpenXbox/xbox-smartglass-rest-python) и связанных с ним библиотек.

## установка

Экземпляр адаптера устанавливается через административный интерфейс ioBroker. Подробные инструкции по необходимым шагам установки можно найти здесь (TODO:LINK).<br/><br/> После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## конфигурация

![Конфигурация адаптера](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "конфигурация")<br/><span style="color:grey"> _Административный интерфейс_</span>

| Поле                           | Описание                                                                                         |
| :----------------------------- | :----------------------------------------------------------------------------------------------- |
| Идентификатор Xbox Live        | Введите здесь свой идентификатор Xbox Live, который можно найти в настройках консоли.            |
| IP                             | Введите здесь IP-адрес консоли.                                                                  |
| Аутентификация через Xbox Live | Если флажок установлен, вы войдете в Xbox Live, используя свой адрес электронной почты и пароль. |
| Адрес электронной почты        | Введите здесь адрес электронной почты вашей учетной записи Xbox Live.                            |
| пароль                         | Введите пароль от вашей учетной записи Xbox Live здесь.                                          |

После завершения настройки появится диалоговое окно настроек со следующим содержимым:`SPEICHERN UND SCHLIEßEN` Выход. Это приведет к перезагрузке адаптера.

## Пример

Установка адаптера была произведена в данной зоне.`Instanzen` Создан активный экземпляр адаптера Xbox. <br/><br/>![Пример](../../../de/adapterref/iobroker.xbox/media/instance.png "Пример")<br/><span style="color:grey"> _Первый случай_</span>

На сервере ioBroker можно создать несколько экземпляров адаптера Xbox. Один экземпляр также может быть подключен к нескольким серверам ioBroker одновременно. Если один сервер ioBroker должен управлять несколькими устройствами, для каждого Xbox следует создать отдельный экземпляр.<br/><br/> Цвет поля состояния экземпляра указывает на то, активирован ли адаптер или подключен ли он к Xbox. При наведении курсора мыши на значок отображается более подробная информация.

## Объекты-адаптеры

В этом районе`Objekte` Вся информация и действия, поддерживаемые Xbox, представлены в виде древовидной структуры. Кроме того, предоставляется информация о том, насколько бесперебойно осуществляется связь с Xbox.

![объекты](../../../de/adapterref/iobroker.xbox/media/objects.png "Товары Xbox")</br><span style="color:grey"> _Объекты адаптера Xbox_</span>

Объекты перечислены ниже, сгруппированы по каналам. Для каждой точки данных указан соответствующий тип данных и права доступа. Если это кнопка, тип и права доступа опускаются. Права доступа могут быть чтением (R) или записью (W). Каждая точка данных может быть прочитана (R), а некоторые — записаны. Для поиска конкретной точки данных рекомендуется использовать сочетание клавиш «Ctrl + F».

### Канал: Информация

- info.connection

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  | логический |      Р      |

  _Индикатор только для чтения, который имеет значение true, когда ioBroker подключен к Xbox._

- info.currentTitles

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _JSON-строка только для чтения, состоящая из пар ключ-значение. Ключом является название воспроизводимого в данный момент трека, а значением — идентификатор трека, преобразованный в шестнадцатеричный формат. Этот идентификатор можно использовать для запуска нужного трека через состояние \`settings.launchTitle\`._

- info.activeTitleName

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Содержит название активной дорожки (дорожки переднего плана) в виде строки._

- info.activeTitleId

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Содержит идентификатор заголовка, отображаемого на переднем плане, преобразованный в шестнадцатеричный формат в виде строки._

- info.activeTitleImage

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Содержит ссылку на обложку книги в виде строки, расположенную на переднем плане._

- info.activeTitleType

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Содержит тип заголовка, находящегося на переднем плане, в виде строки только для чтения, например, 'Game'._

- info.gamertag

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Строковое значение, содержащее никнейм текущей авторизованной учетной записи._

- info.gamerscore

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    число   |      Р      |

  _Числовое значение, содержащее показатель Gamerscore текущей авторизованной учетной записи._

- info.installedApplications

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |      Р      |

  _Строка, содержащая список установленных приложений, разделённых запятыми. DLC-дополнения исключены._

- info.authenticated

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  | логический |      Р      |

  _Логическое значение, которое означает «истина», если аутентификация в Xbox Live прошла успешно, в противном случае — «ложь»._

### Канал: Настройки

- настройки.питание

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  | логический |     Р/В     |

  _Логическое значение, используемое для включения и выключения Xbox. Это значение также служит индикатором того, включен или выключен Xbox в данный момент._

- settings.launchTitle/launchStoreTitle

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |     Р/В     |

  _Установка строкового значения в виде шестнадцатеричного идентификатора игры позволяет запустить игру на Xbox. Идентификатор активной игры можно определить с помощью состояния \`info.currentTitles\`. Это состояние подтверждается после отправки на Xbox, но это не обязательно означает, что команда была выполнена._

  _Пример:_

  ```javascript
  setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
  ```

  _`launchStoreTitle`позволяет использовать описательные названия_

- настройки.вводТекст

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    нить    |     Р/В     |

  _Запись в строковое состояние позволяет вставлять текст в активное поле ввода, например, для отправки личного сообщения или ввода кода. Состояние подтверждается после его передачи на Xbox, что не означает, что команда была выполнена._

  _Пример:_

  ```javascript
  setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
  ```

- настройки.gameDvr

  |                                            Тип данных                                           | Авторизация |
  | :---------------------------------------------------------------------------------------------: | :---------: |
  |                                               нить                                              |      В      |
  |        \*Записываемая строка, в которой фиксируется заданное время игры. Состояние игры:        |             |
  |                       Доступно, если в настройках включена аутентификация.                      |             |
  | Подтвержденная учетная запись также должна быть авторизована в Xbox и иметь установленную игру. |             |
  |                                  должно быть на переднем плане.                                 |             |

  _Пример:_

  ```javascript
  setState('settings.gameDvr', '-60,30', false); // zeichne die letzten 60 Sekunden bis zu den nächsten 30 Sekunden auf (90 Sekunden gesamt)
  ```

### Канал: Геймпад

- геймпад.а

  _Имитирует кнопку A на контроллере._

- геймпад.б

  _Имитирует кнопку B на контроллере._

- геймпад.x

  _Имитирует кнопку X на контроллере._

- геймпад.y

  _Имитирует кнопку Y на контроллере._

- геймпад.очистка

  _Имитирует кнопку «Очистить» на контроллере._

- gamepad.dPadDown

  _Имитирует кнопку "вниз" на крестовине контроллера._

- gamepad.dPadUp

  _Имитирует кнопку "вверх" на крестовине контроллера._

- геймпад.dPadRight

  _Имитирует правую кнопку D-pad на контроллере._

- геймпад.dPadLeft

  _Имитирует левую кнопку DPAD на контроллере._

- gamepad.enroll

  _Имитирует кнопку «Зарегистрироваться» на контроллере._

- геймпад.левое плечо

  _Имитирует нажатие левой плечевой кнопки на контроллере._

- геймпад.правое плечо

  _Имитирует нажатие правой плечевой кнопки на контроллере._

- геймпад.левый джойстик

  _Имитирует нажатие левого стика контроллера._

- геймпад.правый джойстик

  _Имитирует нажатие правого стика контроллера._

- геймпад.меню

  _Имитирует кнопку меню на контроллере._

- gamepad.nexus

  _Имитирует кнопку Nexus (Xbox) на контроллере._

- gamepad.view

  _Имитирует кнопку «Просмотр» на контроллере._

### Канал: Медиа

- медиа.поиск

  | Тип данных | Авторизация |
  | :--------: | :---------: |
  |    число   |     Р/В     |

  _Числовое значение, используемое для перехода к определенной точке в медиаконтенте. Состояние подтверждается после поступления на сервер, что не означает, что запрос был выполнен._

- медиа.плей

  _Кнопка для воспроизведения медиаконтента._

- медиа.пауза

  _Кнопка для приостановки воспроизведения медиаконтента._

- media.playPause

  _Комбинированная кнопка воспроизведения/паузы для медиаконтента._

- медиа.бэк

  _Кнопка «Назад» для просмотра медиаконтента._

- media.channelDown

  _Кнопка, переключающая канал медиаконтента на нижний уровень._

- media.channelUp

  _Кнопка, переключающая канал вверху списка медиаконтента._

- медиа.быстраяПередача

  _Кнопка для перемотки медиаконтента вперед._

- медиа.меню

  _Кнопка меню для просмотра медиаконтента._

- media.nextTrack

  _Кнопка, позволяющая переходить к следующему треку при воспроизведении медиаконтента._

- media.previousTrack

  _Кнопка, позволяющая переходить к предыдущему треку при воспроизведении медиаконтента._

- медиа.запись

  _Кнопка записи для воспроизведения медиаконтента._

- медиа.перемотка

  _Кнопка для перемотки медиаконтента назад._

- медиа.стоп

  _Кнопка «Стоп» для воспроизведения медиаконтента._

- медиа.просмотр

  _Кнопка «Просмотреть» для просмотра медиаконтента._

### Папка: Друзья

Для каждого друга создается канал, содержащий несколько состояний только для чтения.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.1.2 (2025-02-06)
* (@foxriver76) upgrade lib to fix most of the commands

### 1.1.0 (2023-09-04)
* (foxriver76) allow to send web API commands even if Xbox is locally not connected

### 1.0.2 (2022-12-14)
* (foxriver76) we have ensured, that instance object is existing again

### 1.0.1 (2022-11-02)
* (foxriver76) we have optimized error logging messages

### 1.0.0 (2022-09-09)
* (foxriver76) updated dependencies
* (foxriver76) see previous beta versions

### 1.0.0-beta.10 (2022-08-20)
* (foxriver76) we now determine correct store locale for germany if system language is "de"

### 1.0.0-beta.9 (2022-08-07)
* (foxriver76) we fixed `activeTitleName` of applications which have no short title

### 1.0.0-beta.8 (2022-08-03)
* (foxriver76) removed unused messagebox

### 1.0.0-beta.7 (2022-08-02)
* (foxriver76) we have revived acknowledgment flag for power on state

### 1.0.0-beta.6 (2022-08-02)
* (foxriver76) we are now synchronizing friends

### 1.0.0-beta.5 (2022-08-01)
* (foxriver76) fixed `activeTitleImage` which is now the cover and always an url
* (foxriver76) optimized `launchStoreTitle` by preventing API calls for DLCs
* (foxriver76) added gamerscore as state (synched every 10 minutes)
* (foxriver76) added list of installed applications to a new state

### 1.0.0-beta.4 (2022-07-30)
* (foxriver76) we have optimized `launchStoreTitle` to check for installed apps first
* (foxriver76) we have optimized error logging

### 1.0.0-beta.2 (2022-07-30)
* (foxriver76) added `launchStoreTitle` state to launch apps by their names

### 1.0.0-beta.1 (2022-07-29)
* (foxriver76) fixed missing state objects

### 1.0.0-beta.0 (2022-07-29)
* (foxriver76) complete TypeScript rewrite
* (foxriver76) removed Python dependencies by siwtching to Xbox API written in Node.js
* (foxriver76) fixed title launch (closes #39)
* (foxriver76) fixed Xbox Live Auth (closes #63)

### 0.7.10 (2022-05-20)
* (foxriver76) fixed error with mising admin ui on new installations

### 0.7.9 (2022-05-20)
* (foxriver76) fixed wrong default value of `media.seek` (closes #113)

### 0.7.8 (2022-02-20)
* (foxriver76) we now set `unsafePerm` flag to ensure compatibility with future controller
* (foxriver76) updated dependencies

### 0.7.7 (2021-04-18)
* (foxriver76) do not log rest server logging on levels above debug, so it can be activated when needed

### 0.7.6 (2021-03-29)
* (foxriver76) added `requests` package as pip dev
* (foxriver76) added logging for rest server

### 0.7.3 (2020-12-25)
* (foxriver76) fixed debug logging on discovery

### 0.7.2 (2020-11-23)
* (foxriver76) removed logging of error on adapter stoppage due to rest server termination
* (foxriver76) removed warn logging for debugging
* (foxriver76) fixed currentTitles and activeTitle states

### 0.7.0 (2020-11-04)
* (foxriver76) replaced deprecated requests module by axios
* (foxriver76) migrated to xbox-smartglass 1.3
* (foxriver76) removed Python3.6 support 
* (foxriver76) event based rest server startage (faster and more robust)
* (foxriver76) GameDVR now supports custom time

### 0.6.9 (2020-11-02)
* (foxriver76) dependency upgrade, fixes installation problems

### 0.6.8 (2020-09-24)
* (foxriver76) minor optimization

### 0.6.5 (2020-05-28)
* (foxriver76) fixed problem with auth-only states

### 0.6.4 (2020-05-11)
* (foxriver76) compatibility with controller v3

### 0.6.3 (2020-04-02)
* (foxriver76) try specific python versions first on install
* (foxriver76) bump dependency, because of auth bug in smartglass

### 0.6.1 (2020-03-17)
* (foxriver76) fixes for compact mode compatibility
* (foxriver76) more translations added
* (foxriver76) minor optimizations

### 0.6.0 (2020-03-01)
* (foxriver76) dependency upgrade (smartglass has been refactored)
* __python 3.6 required!__

### 0.5.12 (2020-01-17)
* (foxriver76) let js-controller know which apt packages are required

### 0.5.11 (2019-11-27)
* (foxriver76) we not try to install apt packages any longer if already installed

### 0.5.8
* (foxriver76) increased stopTimeout to successfully shut down adapter on windows based systems
* (foxriver76) now using setStateChanged instead of own implementation

### 0.5.7
* (foxriver76) fix gamertag not set if no state on the object exists yet

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2023 Moritz Heusinger <moritz.heusinger@gmail.com>

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