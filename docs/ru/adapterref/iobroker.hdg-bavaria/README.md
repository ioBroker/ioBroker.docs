---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hdg-bavaria/README.md
title: ioBroker.hdg-бавария
hash: mbnsvpEpxYiVe4/xyJFQjTrDt21Sf3WSJFwKsmMIPFw=
---
![Логотип](../../../en/adapterref/iobroker.hdg-bavaria/admin/hdg-bavaria.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.hdg-bavaria.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hdg-bavaria.svg)
![Количество установок (последних)](https://iobroker.live/badges/hdg-bavaria-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/hdg-bavaria-stable.svg)
![Статус зависимости](https://img.shields.io/david/stemaker/iobroker.hdg-bavaria.svg)
![НПМ](https://nodei.co/npm/iobroker.hdg-bavaria.png?downloads=true)

# IoBroker.hdg-бавария
**Тесты:** ![Тестирование и выпуск](https://github.com/stemaker/ioBroker.hdg-bavaria/workflows/Test%20and%20Release/badge.svg)

## Адаптер hdg-bavaria для ioBroker
Доступ к данным из HDG Control котлов HDG Bavaria. На данный момент поддерживается ограниченная конфигурация (К10-33, бак 850л с 3 датчиками температуры, настраиваемое количество контуров отопления). Другие могут быть добавлены по запросу.

У меня очень мало времени на этот проект, и я тем временем переехал в HA. Есть похожий интересный проект https://github.com/srt/hdg-exporter.

## Changelog
<ul>
  <li>v0.4.0
    <ul>
      <li>Support for multiple heat circuits.</li>
    </ul>
  </li>
  <li>v0.3.1
    <ul>
      <li>Added integration test.</li>
    </ul>
  </li>
  <li>v0.3.0
    <ul>
      <li>Added tracking energy of the tank. Temperature sensor data is used to evaluate the current thermal energy of the tank.
      Tank content is currently equally distributed to temperature sensors which might not be accurate depending on sensor positions.</li>
    </ul>
  </li>
  <li>v0.2.1
    <ul>
      <li>First released version</li>
    </ul>
  </li>
</ul>

## License
MIT License

Copyright (c) 2021 stemaker <app.stemaker@gmail.com>

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