---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: Mlho8Fb/5kV7FMKtUNBDi3f4f5aAe9lEJIi/3JCk/hQ=
---
# IoBroker.dysonAirPurifier
![Логотип](admin/dyson_logo.svg)![Логотип](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Количество установок (последние)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![Тестирование и выпуск] (https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml)

## Адаптер ioBroker для очистителей воздуха и вентиляторов Dyson
Этот адаптер соединяет ioBroker с различными очистителями воздуха Dyson.

Значок фаната в логотипе, созданный [Freepik](https://www.flaticon.com/de/autoren/freepik) с [www.flaticon.com](https://www.flaticon.com/de/).

### Поддерживаемые устройства
* Dyson Pure Cool Link Tower (TP02, ProductType 475)
* Dyson Pure Cool Tower, модель 2018 г. (TP04, ProductType 438)
* Формальдегид Dyson Pure Cool Tower, модель 2018 г. (TP07, тип продукта 438E)
* Dyson Pure Cool Link Desk (DP01, ProductType 469)
* Dyson Pure Cool Desk, модель 2018 г. (DP04, ProductType 520)
* Dyson Pure Hot+Cool Link (HP02, ProductType 455)
* Dyson Pure Hot+Cool Link New (Тип продукта 455A)
* Dyson Pure Hot+Cool, модель 2018 г. (HP04, тип продукта 527)
* Dyson Pure Hot+Cool (HP07, тип продукта 527E)
* Dyson Pure Humidify+Cool (PH01, тип продукта 358)
* Dyson Pure Humidify+Cool (PH03, тип продукта 358E)

## Функции
Подключает ваши вентиляторы, тепловентиляторы, очистители и увлажнители воздуха Dyson к ioBroker.

* Считывает значения с устройств и датчиков
* Может управлять устройствами, давая вам возможность изменять некоторые значения (основная мощность, колебания, нагрев, скорость вентилятора, ...)
* Читает список устройств с серверов Dyson
* Обрабатывает *неограниченное* количество поклонников (на самом деле ресурсы вашего хоста ioBroker ограничивают это количество).

## Как это работает
При запуске облако Dyson запрашивает все известные устройства, привязанные к вашей учетной записи, и их пароли MQTT. Имея этот список на руках, адаптер локально подключается ко всем устройствам и взаимодействует с ними.

* Подключение к облаку Dyson необходимо только для получения списка устройств, привязанных к вашей учетной записи, и их паролей MQTT.
* Поэтому новые устройства распознаются только при запуске адаптера.
* Облако Dyson запрашивается только один раз при запуске адаптера.
* Вентиляторы Dyson действуют как сервер MQTT, а адаптер — как клиент.
* Вся связь между устройствами и адаптером происходит только локально.
* Вся информация о подключении в адаптере сбрасывается и создается заново во время перезапуска.

## Установка
### Сентри.ио
Этот адаптер использует sentry.io для сбора сведений о сбоях и автоматического сообщения об этом автору. Для этого используется плагин [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

### Предпосылки
* Для этого адаптера требуется Node.js >= версии 10
* Требуется как минимум js-Controller 3.0.0
* Требуется как минимум Admin 4.0.9
* Чтобы запустить этот адаптер, вам потребуется учетная запись Dyson.
* Обязательно добавьте своего поклонника в свою учетную запись. Либо через приложение, либо онлайн.

### Установка адаптера
#### Использование нпм
Запустите ```npm install iobroker.dysonairpurifier``` в вашей установке ioBroker, чтобы получить последнюю версию этого адаптера из репозитория npm.

#### Альтернатива: использование URL-адреса GitHub
Установите через пользовательский интерфейс администратора ioBroker, указав последнюю стабильную версию на GitHub: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Вы также можете установить более старые версии выпуска, используя эти методы (указав тег версии, например, ```v0.6.0``` вместо ```master```в URL-адресе), но обычно предпочтительнее использовать самую последнюю версию.

### Требуются данные конфигурации
* Имя пользователя учетной записи Dyson
* Пароль учетной записи Dyson (этот адаптер поддерживает пароли длиной до 32 символов)
* IP-адрес ваших вентиляторов/очистителей воздуха в вашей локальной сети (не во всех случаях).

Имя пользователя и пароль Dyson являются общими данными конфигурации, которые необходимо ввести на странице конфигурации адаптера.
В отличие от этого IP-адрес вводится в поле `Hostname` в дереве устройств на закладке `devices`.

#### Как настроить адаптер
> При первом обычном запуске этого адаптера API Dyson запрашивается для всех ваших устройств, и все поддерживаемые устройства будут созданы в дереве устройств с их основной информацией, предоставленной API, и дополнительным полем `Hostaddress`.
> > Поэтому запустите адаптер один раз, и ваши устройства Dyson будут созданы в дереве устройств с их основными настройками.
> > Затем остановите адаптер, введите IP-адреса в поле (поля) `Hostaddress` в дереве устройств и перезапустите адаптер. После этого ваши устройства Dyson в дереве устройств должны быть заполнены данными.

* Обратите внимание *: из-за несовместимой реализации mDNS от Dyson вам необходимо указать локальный IP-адрес устройства * после первого запуска *.

*Дополнительное примечание*: начиная с версии 0.7.1 адаптер пытается подключиться к устройству по его имени хоста (серийному номеру), если адрес хоста/IP не указан. Это будет работать при двух предварительных условиях:

1. В вашей локальной сети работает DNS-сервер. Либо в вашем маршрутизаторе (например, у FritzBox есть работающий DNS), либо в выделенном.
2. Вы не изменили имя устройства по умолчанию.
3. Имя устройства правильно сопоставлено с его IP-адресом (на случай, если вы управляете своим DNS вручную).

### Двухфакторная аутентификация (начиная с версии 0.9.0)
После установки адаптера он должен запуститься автоматически, если нет, то сначала запустите его.
После обновления он также автоматически перезапустится. В обоих случаях он останется в "желтом" состоянии и, вероятно, покажет какие-то ошибки в логе - на данный момент это нормально.

* Откройте диалоговое окно конфигурации адаптера
* Как минимум заполните свой адрес электронной почты, пароль и код страны - остальное необязательно
* Нажмите кнопку электронной почты с кодом 2FA, чтобы начать процесс.
* Вы автоматически получите «challengeId» в соответствующем поле, электронное письмо и диалоговое окно с дальнейшими инструкциями.
* введите 6-значный код из электронного письма в поле «Одноразовый пароль Dyson»
* Нажмите кнопку «Готово»
* после этого вы должны были получить токен от Dyson (невидимый в целях безопасности)
* Нажмите «Сохранить и закрыть» после завершения настройки — адаптер должен запуститься заново и стать зеленым.

Все значения будут сохранены и показаны далее.
> Обычно вам не нужно делать это 2 FA по расписанию, но вы можете повторить это, когда это необходимо.

#### Если вы столкнулись с проблемой 401 во время 2-FA. Пожалуйста, попробуйте этот обходной путь:
1. Выйдите из приложения Dyson для смартфона.
2. Подождите несколько минут
3. Введите свои данные для входа в адаптер (если это еще не сделано) и выполните процедуру 2FA до конца.
4. Адаптер должен запуститься и загореться зеленым цветом.
5. подождите некоторое время (до часа или, может быть, больше, так как у Dyson есть блокировщик слишком большого количества запросов за короткий промежуток времени)
6. Войдите снова в приложение Dyson для смартфона, если хотите его использовать.

## Управление вашими устройствами
Этот адаптер в настоящее время может контролировать следующие состояния ваших устройств:

* FanMode, режим устройства (ручной, автоматический, выкл.)
* FanSpeed , Текущая скорость вентилятора
* Ночной режим, состояние ночного режима
* Колебание, Колебание вентилятора (вкл., выкл.).
* OscillationRight , Верхняя граница OscillationAngle
* OscillationLeft , Нижняя граница OscillationAngle
* Угол колебания , Угол колебания
* ContinuousMonitoring, непрерывный мониторинг датчиков окружающей среды, даже если устройство выключено.
* MainPower , Основная мощность вентилятора.
* AutomaticMode , Вентилятор работает в автоматическом режиме.
* Flowdirection , Направление, куда дует вентилятор. ВКЛ = спереди; OFF=Назад (он же Jet focus)
* Jetfocus, Направление куда дует вентилятор. ВКЛ = спереди; OFF=Назад (он же Jet focus)
* Режим обогрева, режим обогрева [ВКЛ/ВЫКЛ]
* HeatingTargetTemp , Целевая температура для нагрева
* AirQualityTarget, Целевое качество воздуха для автоматического режима.
* Режим увлажнения, вкл./выкл.
* HumidifyAutoMode, Авто/Выкл.
* Целевое автоматическое увлажнение, Целевое автоматическое увлажнение
* Целевое увлажнение, Целевое увлажнение вручную
* TemperatureUnit , Единица для отображения значений температуры в (отображение вентилятора).
* Жесткость воды, мягкая, средняя, жесткая

Насколько известно, возможные значения для этих состояний задокументированы ниже.
Скорость вентилятора допускает только значения от 1 до 10 и Авто. Если вы хотите установить скорость вращения вентилятора на 0, вам нужно отключить основное питание.
Что и делает приложение Dyson.

### Известные проблемы
* Нет автоматического определения IP устройств
* Иногда адаптер теряет соединение MQTT с вентилятором и не может восстановить соединение. В моем случае достаточно отключить вентилятор примерно на 10 секунд, чтобы перезагрузить его и снова подключить. Попробуйте.

## Объяснение данных API Dyson (полезная нагрузка сообщения)
Информация скопирована и расширена с <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>.

### ТЕКУЩЕЕ СОСТОЯНИЕ
| имя | значение | возможные значения | Единица |
|--------------|------------------------------------------------------------|----------------------|------|
| режим-причина | Текущий режим был установлен с помощью RemoteControl, App, Scheduler | КНР, ЛАПП, ЛЩ, ПУИ | |
| состояние-причина | | РЕЖИМ | |
| рсси | сила Wi-Fi | -100 - 0 | дБм |
| канал | WIFI-канал | 52 | |
| фкхп | | 96704 | |
| фгхп | | 70480 | |

#### Состояние продукта
| имя | значение | возможные значения | Единица |
|------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| эркд | Код последней ошибки | NONE или некоторые шестнадцатеричные значения | |
| фильм | оставшийся срок службы фильтра | 0000 - 4300 | часы |
| фмод | Режим | ВЕНТИЛЯТОР, АВТО, ВЫКЛ | |
| фпвр | Главная мощность | ВКЛ, ВЫКЛ | |
| фнст | Статус вентилятора | ВКЛ, ВЫКЛ, ВЕНТИЛЯТОР | |
| фнсп | Скорость вентилятора | 0001 - 0010, АВТО | |
| фдир | Фандиректор ака. Струйный фокус/ ВКЛ=Передний, ВЫКЛ=Задний | ВКЛ, ВЫКЛ | |
| фок | ДжетФокус | ВКЛ, ВЫКЛ | |
| нмод | Ночной режим | ВКЛ, ВЫКЛ | |
| осон | Колебание | ВКЛ, ВЫКЛ | |
| осал | Нижняя граница угла колебания | 0005 - 355 | ° (градусы) |
| Осау | Верхняя граница угла колебания | 0005 - 355 | ° (градусы) |
| оскс | ОсцилляцияАктивная | ВКЛ, ВЫКЛ, ПРОСТОЙ | |
| ансп | Угол колебания | КАСТ, 0180 | ° (градусы) |
| катар | Цель качества воздуха | 0001=Хорошо, 0002=Нормально, 0003=Плохо, 0004=Очень плохо | |
| ритм | Непрерывный мониторинг | ВКЛ, ВЫКЛ | |
| авто | Автоматический режим | ВКЛ, ВЫКЛ | |
| нмдв | Макс. скорость вращения в ночном режиме? | 0004 | |
| cflr | Статус Угольный фильтр | 0000 - 0100 | Процент |
| cflt | Угольный фильтр | КАРФ, НЕТ | |
| hflr | Статус HEPA-фильтр | 0000 - 0100 | Процент |
| hflt | HEPA-фильтр | ГХЭП, ГКОМ | |
| слтм | Таймер сна | ВКЛ, ВЫКЛ || |
| мод | Режим нагревателя [ВКЛ/ВЫКЛ] | ТЕПЛО | |
| hмакс | Целевая температура для обогрева | 0 .. 5000 | К |
| Юм | Режим увлажнения | ВКЛ, ВЫКЛ, | |
| верхний | Автоматический режим увлажнения | HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF | |
| мычать | Цель увлажнения | HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY | |
| cdrr | CleanDurationRemaining | целое число | минуты |
| прямоугольный | АвтоУвлажнениеЦель | целое число | % |
| клтр | время, оставшееся до следующей очистки | целое число | часы |
| ват | Жесткость воды | МЯГКАЯ = "2025", СРЕДНЯЯ = "1350", ЖЕСТКАЯ = "0675" | |
| wacd | Код предупреждения | НЕТ... | |
| рстф | сбросить жизненный цикл фильтра | «RSTF», «STET», RESET_FILTER_LIFE_IGNORE, RESET_FILTER_LIFE_ACTION | |
| сад | Формат температуры | ВКЛ=Цельсий, ВЫКЛ=Фаренгейт | |
| клкр | Цикл глубокой очистки | CLNO=неактивно, CLAC=Выполняется глубокая очистка, CLCM=Завершено | |
| хста | Состояние отопления | АКТИВНО/ПРОСТОЕ | |
| мста | Состояние увлажнения | Активный/холостой ход ВЫКЛ., HUMD | |
| пста | [HP0x] Неизвестно | INIT, CLNG, INV, OFF | |
| брил | неизвестно | 0002 | УРОВЕНЬ_НИЗКИЙ, УРОВЕНЬ_СРЕДНИЙ, УРОВЕНЬ_ВЫСОКИЙ |
| фкхп | неизвестно | | |
| наклон | [HP0x] Неизвестно | строка | |
| циферблат | [DP0x] Неизвестно | | |

| Коды ошибок | Значение |
|-------------|----------------------------------------------------------------------------------------------|
| НЕТ | Активной ошибки нет |
| 57С2 | неизвестно |
| 11Е1 | Осцилляция отключена. Пожалуйста, нажмите кнопку «Осцилляция» на пульте дистанционного управления, чтобы продолжить. |

#### Планировщик
| имя | значение | возможные значения | Единица |
|------|--------------------|-----------------|------|
| дств | летнее время | 0001... | |
| srsc | ? | 7с68... | |
| цид | часовой пояс? | 0001... | |

### ДАННЫЕ ДАТЧИКА ТОКА ОКРУЖАЮЩЕЙ СРЕДЫ
#### Данные
| имя | значение | возможные значения | Единица |
|------|----------------------------|-----------------|---------|
| воздействовать | Влажность (%) | 0000 - 0100 | Процент |
| договор | Пыль | 0000 - 0009 | |
| слтм | Таймер сна | ВЫКЛ... 9999 | Минуты |
| такт | Температура в Кельвинах | 0000 - 5000 | К |
| вакуум | летучие органические соединения | 0001 - 0009 | |
| хчо | Формальдегид ||
| 25 часов | ТЧ2,5 | 0018 ||
| 10 часов | ТЧ10 | 0011 ||
| ва10 | летучие органические соединения | 0004 ||
| ноксл | NO2 | 0000 - 0014 ||
| р25р | | 0019 ||
| р10р | | 0018 ||

### ДАННЫЕ ОБ ОКРУЖАЮЩЕЙ СРЕДЕ И ИСПОЛЬЗОВАНИИ
Избыточные значения?

#### Данные
| имя | смысл | возможные значения | Единица |
|-------------|--------------------------------------------------------------------------|---------------------------------------------|-------------|
| приятель0 - приятель9 | количество секунд, проведенных в этом уровне пыли с начала часа | 0000 - 3600 | |
| пальма | кажется медианным значением palX | | |
| том 0 - том 9 | количество секунд, проведенных на этом уровне голосового управления с начала часа | 0000 - 3600 | |
| том | кажется медианным значением volX | | |
| aql0 - aql9 | количество секунд, проведенных в этом уровне качества воздуха | max (pal, vol)) с начала часа | 0000 - 3600 | |
| акльм | кажется медианным значением aqlX | | |
| фафс | кажется, количество секунд, потраченных в определенное время | 0000 - 3600 | |
| фаос | кажется, количество секунд, потраченных в определенное время | 0000 - 3600 | |
| фофс | кажется, количество секунд, потраченных в определенное время | 0000 - 3600 | |
| фоны | кажется, количество секунд, потраченных в определенное время | 0000 - 3600 | |
| гул | влажность ? (%) | 0000 - 0100 | |
| тмпм | температура в кельвинах? | 0000 - 5000 | |

## Официальные уведомления
Dyson, pure cool, pure hot & cool и другие являются товарными знаками или зарегистрированными товарными знаками [Дайсон Лтд.](https://www.dyson.com) Все прочие товарные знаки являются собственностью соответствующих владельцев.

## Changelog

### V2.3.1 (2022-01-14) (Fairytale of doom)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) Upd: Updated documentation

### V2.3.0 (2021-12-02) (Fairytale of doom)
* (grizzelbee) New: Added some GUI elements for air quality in folder icons
* (grizzelbee) New: Added support for HEPA PTFE filters
* (grizzelbee) New: Added support for Combined PTFE filters
* (grizzelbee) Chg: Fanspeed is now a number (not string anymore) to work properly with IoT-Adapter. Please delete this data point and let get recreated. 

### V2.2.0 (2021-11-07) (Welcome to my wasteland)
* (grizzelbee) New: [#154](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/154) Added support for dyson Humidify+Cool PH03/358E.

### V2.1.4 (2021-10-20) (Running to the edge)
* (grizzelbee) New: [#152](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/152) Added token-indicator to config page in admin to show whether a token has already been received and saved or not.

### V2.1.3 (2021-10-17) (Running to the edge)
* (grizzelbee) Fix: [#148](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/148) Hostaddress is used properly when given.
* (grizzelbee) Fix: [#149](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/149) OscillationAngle "Breeze" is working now 
* (grizzelbee) Fix: [#150](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/150) Strange delay and jumping of boolean switches is fixed 

### V2.1.2 (2021-10-07) (Running to the edge)
* (grizzelbee) New: Removed NO2 from general AirQuality to be more compliant to dyson-app
* (grizzelbee) Upd: Code cleanup
* (grizzelbee) Upd: Removed delay between sending a command and new values getting displayed (max 30 Secs)


### V2.1.1 (2021-10-05) (Running to the edge)
* (grizzelbee) New: Added some more data points 
* (grizzelbee) New: Added switch for temperature unit of the fan display
* (grizzelbee) New: Improved logging of unknown data points
* (germanBluefox) Fix: Fixed icon links
* (grizzelbee) Fix: fixed dependencies badge
* (grizzelbee) Fix: added missing dependency plugin-sentry
* (grizzelbee) Fix: Setting HumidificationTarget now works

### V2.0.1 (2021-10-04) (Lost in forever)
* (grizzelbee) Fix: Turning on HeatingMode should work now
* (grizzelbee) Fix: Sentry-error [DYSONAIRPURIFIER-7](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
* (grizzelbee) Upd: Updated dependencies

### V2.0.0 (2021-09-26) (Lost in forever)
* (grizzelbee) New: Added DeepCleanCycle to known data points
* (grizzelbee) Fix: Switching water hardness now really works
* (grizzelbee) BREAKING CHANGES: Please recreate your object tree and test your scripts!
* (grizzelbee) Chg: All ON/OFF switches are now boolean types to be more compliant to ioBroker standards for VIS and other adapters. Please delete those data points and let them being recreated if necessary.
* (grizzelbee) Chg: All angles are numbers now
* (grizzelbee) Chg: All 2-way switches are boolean now
* 
### V1.1.0 (2021-09-15) (Coming home)
* (grizzelbee) New: Added correct tier-level to io-package
* (grizzelbee) New: improved logging of unknown data points
* (grizzelbee) New: Added support for dyson Pure Hot+Cool Link (ProductType 455A) 
* (grizzelbee) New: Added support for formaldehyde sensor
* (grizzelbee) New: oscillation angles can be set
* (grizzelbee) Upd: Improved OscillationAngle data point to display only the values supported by the current model  
* (grizzelbee) Fix: removed info: undefined is not a valid state value for id "Hostaddress"

### V1.0.0 (2021-08-26) (Dim the spotlight)
* (grizzelbee) Fix: [#130](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/130) Fixed the newly introduced bug showing wrong values for temperatures
* (grizzelbee) Upd: Pushed to version 1.0.0
* (grizzelbee) Upd: Updated dependencies

### V0.9.5 (2021-08-23) (Marching on)
* (grizzelbee) Doc: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Documented workaround for 2FA 401 Issue in ReadMe
* (grizzelbee) Fix: [#128](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/128) Fixed saving of config data
* (grizzelbee) Fix: [#107](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/107) Fixed type error on temperatures
* (grizzelbee) Fix: fixed warnings on startup

### V0.9.4 (2021-08-20) ()
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Credentials won't get logged but shown in a popup in admin when failing 2FA process. 
* (grizzelbee) New: Added adminUI tag to io-package
* (grizzelbee) New: Cleanup of io-package

### V0.9.3 (2021-08-19) (Paralyzed)
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Leading and trailing whitespaces will be removed from all config values when saving
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Password will be logged in clear text in case of a http 401 (unauthorized) error during 2FA
* (grizzelbee) Chg: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Removed general debug logging of 2FA login data


### V0.9.2 (2021-08-15) (Pearl in a world of dirt)
* (bvol)       New: [#114](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/114) Added Switzerland to country selection in config , Thanks, @BVol, for his code! 
* (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/119) Updated dyson certificate to enable connection again. Thanks, @Krobipd, for helping with the link
* (grizzelbee) Upd: Updated dependencies 

### V0.9.1 (2021-05-17) (Still breathing)
* (grizzelbee) New: [#105](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/105) TP02, HP02 and others supporting the fmod token are now able to switch from Off to Auto- and manual-mode

### V0.9.0 (2021-05-15) (Still breathing)
* (grizzelbee) New: Added ioBroker sentry plugin to report errors automatically 
* (grizzelbee) New: Added support for Dyson Pure Cool TP07 (438E)
* (grizzelbee) New: Added support for Dyson 2-factor login method
* (grizzelbee) New: Added "keep Sensorvalues" to config to prevent destroying old values when continuous monitoring is off and fan is switched off (TP02)  
* (grizzelbee) Fix: FilterLife should now be correctly in hours and percent in two separate data fields for fans supporting this (e.g. TP02)

### V0.8.2 (2021-04-09) (Still breathing)
* (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
* (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
* (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added support for dyson Hot+Cool Formaldehyde (527E)
* (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex


### V0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### V0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### V0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### V0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore, you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non-compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved error handling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) New: Editable data fields have now appropriate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### V0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Polling device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### V0.4.0 (2020-09-29)
* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try
* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use
* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use
* (grizzelbee) first development body (non-functional)

## License

MIT License

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

Copyright (c) 2020 .. 2022 Hanjo Hingsen <open-source@hingsen.de>