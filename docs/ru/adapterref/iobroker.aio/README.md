---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.aio/README.md
title: ioBroker.aio
hash: hxdApo1x+ruDwJurq3aDkiOCckP+6qwXENcy7+tGAns=
---
![Логотип](../../../en/adapterref/iobroker.aio/admin/aio.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.aio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.aio.svg)
![Количество установок (последние)](https://iobroker.live/badges/aio-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/aio-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.aio.svg)
![НПМ](https://nodei.co/npm/iobroker.aio.png?downloads=true)
![Тестирование и выпуск](https://github.com/Newan/ioBroker.aio/workflows/Test%20and%20Release/badge.svg)

# ioBroker.aio

## адаптер aio для ioBroker

Считывание значений с системы AIO Hansol Technics

## Справка по настройке

Добавьте IP-адрес вашего инвертора в конфигурацию. Адаптер сгенерирует следующий URL-адрес, используя предоставленный IP-адрес (ВАШ\_IP\_ЗДЕСЬ): http\://ВАШ\_IP\_ЗДЕСЬ/R3EMSAPP\_REAL.ems?file=ESSRealtimeStatus.json

## Тестовая конфигурация

Откройте в браузере URL-адрес http\://YOUR\_IP\_HERE/R3EMSAPP\_REAL.ems?file=ESSRealtimeStatus.json. В результате должна отобразиться JSON-строка следующего вида:

```javascript
{
    "ESSRealtimeStatus":{
        "ColecTm":"00000000000000",
        "PowerOutletPw":"0",
        "GridPw":0.00,
        "UnitPrice":0.00,
        "ConsPw":0.00,
        "BtSoc":0,
        "PcsPw":0.00,
        "AbsPcsPw":0.00,
        "PvPw":0.00,
        "GridStusCd":"0",
        "BtStusCd":"0",
        "BtPw":0.00,
        "OperStusCd":"0",
        "EmsOpMode":"0",
        "RankPer":0,
        "ErrorCnt":0
    }
}
```

## Changelog
### 0.1.1
* (Newan) add new object states

### 0.1.0
* (Newan) add weather infos

### 0.0.2
* (Newan) add typescript / react - bug fixes object types

### 0.0.1
* (Newan) initial release

## License
MIT License

Copyright (c) 2021 Newan <info@newan.de>

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