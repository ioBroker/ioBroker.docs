---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.residents.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.residents.svg
BADGE-Number of Installations: https://iobroker.live/badges/residents-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/residents-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.residents.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.residents/README.md
title: жители
hash: ZTA45eYXfVkiwThISlNrnOQqoQYoEAF1v93Rk/ct5OQ=
---
# Резиденты
Этот адаптер помогает отображать присутствие и статус активности каждого соседа по комнате. Из этого формируется логический общий статус всех соседей по комнате и их присутствие или текущая активность дома. Жильцы представлены собственными виртуальными устройствами типа «сосед по комнате», «гость» или «домашнее животное».

Мы можем различать краткосрочное и долгосрочное отсутствие с некоторой способностью предсказывать ожидаемую прибыль. Основываясь на этой информации, при длительном отсутствии отопление может быть снижено либо немного, либо больше, чем обычно. Когда житель возвращается домой, дом знает, что нужно подготовиться к скорому прибытию человека.

Помимо простой логики присутствия/отсутствия присутствие дополняется тем фактом, что человек бодрствует или спит дома. Здесь поддерживается довольно сложный процесс сна и бодрствования, чтобы обеспечить комфортные процедуры бодрствования для каждого человека и самого дома.

Адаптер также предназначен для _в будущем_ поддержки сложной системы маршрутизации уведомлений. Это позволяет адресовать сообщения конкретному человеку из ваших собственных сценариев, независимо от транспортной среды. Фактическая транспортная среда может быть определена динамически на основе статуса присутствия и активности. Так, например. B. Замените голосовые уведомления дома текстовыми сообщениями вдали от дома, перенаправив сообщение на другой адаптер ioBroker. Сообщения также могут быть перенаправлены на определенное устройство в комнате, в которой находится резидент, например, на динамик или дисплей.

## Конфигурация

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0-beta.2 (2023-03-12)

-   (jpawlowski) Pets are now allowed to follow the presence of guest residents

## License

MIT License

Copyright (c) 2022-2023 Julian Pawlowski <metres_topaz.0v@icloud.com>

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