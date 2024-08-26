---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-облако
hash: VVsWVsdGF1A8M5qtOJuvubLxQgPSehFFE9QaiFSt6WI=
---
![Логотип](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![Количество установок](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/mihome-cloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Адаптер mihome-cloud для ioBroker
Адаптер для устройств Mi Home Cloud

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

# Процедура входа
Введите почту и пароль приложения.

# Контроль
mihome-cloud.0.ID.удаленный

Может отправлять команды либо устанавливать состояние неподтвержденного в истинное.

Если команда ожидает ввода, они перечислены в имени, а в качестве значения по умолчанию перечислены идентификаторы.

Имя и ID можно найти в статусе. Возможные значения можно найти, нажав на карандаш, а затем под состояниями.

Входные значения могут быть, например. `["10",0,1] `

Если дистанционное управление невозможно, сцены/умные сценарии можно создавать и выполнять в mihome-cloud.0.scenes.

Пример: Уборка помещения роботом-пылесосом.

mihome-cloud.0.id.remote.set-room-clean в качестве входной развертки set-room-clean 7-3 in[clean-room-id,clean-room-mode,clean-room-oper] [24, 25,26].

Потенциально идентификаторы комнат можно найти по адресу:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

оба требуют [clean-current-map] [33] в качестве входных данных

mihome-cloud.0.id.status.clean-current-map развертка clean-current-map 7-33

к сожалению, null. В качестве альтернативы вы можете использовать

mihome-cloud.0.id.status.cur-карта-идентификатор

или

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list] запросите список карт и посмотрите результат в mihome-cloud.0.id.status.map -list map map-list 10-4

Затем вы можете установить этот идентификатор

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii развертка get-preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii, чистый-предпочтение-на-ii]

Формат: [1673811000]

Затем вы получаете информацию в разделе:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

или

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1", "1_11_0_0_0_0_1", "1_12_1_1_2_0_1", "1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

С информацией, которую вы затем можете использовать

формат mihome-cloud.0.id.remote.start-room-sweep ["10", "11", "12", "13"]

или

mihome-cloud.0.id.remote.set-room-clean

Формат ["10",0,1]

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

# Войти
Die App Mail и пароль автоматически.

# Штойерунг
mihome-cloud.0.ID.удаленный

Können Befehle gesendet entweder den State unbestätigt auf true setzen.

Wenn ein Befehl Input erwartet werden die im Namen aufgezählt und als default Wert werden die IDs aufgelistet.

Имя и ID найти человека под статусом. Mögliche Werte findet man auf den Bleistift drückt und dann unter States.

Eingabewerte könnte z.b. `["10",0,1] `

Падения под удаленным keine Steuerung могут быть вызваны Szenen/Smart Szenario ангельскими верденами и умирают в михом-облаке.0.scenes ausgeführt werden.

Bsp: Saugroboter Raumreinigung

mihome-cloud.0.id.remote.set-room-clean benötigt als Входная развертка set-room-clean 7-3 in[clean-room-id,clean-room-mode,clean-room-oper] [24, 25,26]

Potenziel находит человека Идентификаторы комнат в:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

beide benötigen [clean-current-map] [33] als Input

mihome-cloud.0.id.status.clean-current-map развертка clean-current-map 7-33

ist leider null Man kann alternativ

mihome-cloud.0.id.status.cur-карта-идентификатор

Нуцен Одер

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list] die Kartenliste abfragen und sieht das result under mihome-cloud.0.id.status.map -list map map-list 10-4

Diese Id kann man dann setzen

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii развертка get-preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii, чистый-предпочтение-на-ii]

Формат: [1673811000]

Dann erhält man die Informationen unter:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

Одер

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1", "1_11_0_0_0_0_1", "1_12_1_1_2_0_1", "1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

Mit den Informationen kann man dann

mihome-cloud.0.id.remote.start-room-sweep Формат ["10","11","12","13"]

Одер

mihome-cloud.0.id.remote.set-room-clean

Формат ["10",0,1]

## Обсуждение и обсуждение
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog

### 0.0.5

- (TA2k) Bugfixes

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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
