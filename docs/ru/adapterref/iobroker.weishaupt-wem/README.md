---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weishaupt-wem/README.md
title: ioBroker.weishaupt-wem
hash: F4866vNCXSe9t1AP1tmbJAaUgg1hot1aVMVXlIKMERQ=
---
![Логотип](../../../en/adapterref/iobroker.weishaupt-wem/admin/weishaupt-wem.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)

# IoBroker.weishaupt-wem
## Адаптер weishaupt-wem для ioBroker
Адаптер для портала Weishaupt WEM

## Домен портала WEM
Портал WEM позволяет использовать регионы, в которых используются неиспользуемые домены (`www.wemportal.com` или `www.wemportal.de`). Если вы вручную вошли в браузер в `www.wemportal.de` или на адаптере, сначала нужно войти в `403 Forbidden` (шлюз приложений Azure), а в адаптере-Einstellungen перейти в домен «WEM Portal Domain». Стандарт соответствует `www.wemportal.com`.

## Пользовательский командный пункт
Для индивидуального использования URL-адреса и его содержимого будет полезно. Для URL-адреса, заданного параметром на WEM-портале с Chrome, можно найти и найти информацию в Elements/Elemente с STRG+F в iframe, например, с dem name=&quot;RDWWriteParameter&quot; URL-адресом в источнике с правами, связанными с щелчком мыши, и скопируйте его снова. Für den Werte nach <option suchen und den gewünschten Wert unter value kopieren und als state Wert eintragen.
z.B.: <https://www.wemportal.com/Web/UControls...,>208557

## Поддержка приложений
Адаптер можно найти в приложении.

**weishaupt-wem.0.20999** «Имя через приложение»

**weishaupt-wem.0.20999.1-3.parameters** Здесь можно найти актуальный статус и его можно использовать с помощью **NumericValue** или **StringValue**. Вы найдете то, что нужно для Min Max Werte и unter **EnumValues**, и вы найдете описание для NumericValue

## Changelog

### 0.0.20

* (ta2k) Abgeschaltete Leistungs-/Prozentwerte (Aus/off/--) werden als numerische 0 gespeichert (kWh-Zähler bleiben unberührt)

### 0.0.19

* (ta2k) Fix Absturz "Canvas.Image is not a constructor" mit jsdom 30 / Node 24 (Canvas-Stub meldet sich jetzt als nicht installiert)

### 0.0.18

* (ta2k) Backoff bei 403 vom Azure Gateway (Rate-Limit / Bot-Schutz) statt Relogin-Sturm
* (ta2k) Anfragen entzerrt (Throttling zwischen App-Requests) analog hass-WEM-Portal
* (ta2k) Zentrale App-API-Anfrage mit einmaligem Relogin-Retry und Session-Ablauf-Erkennung
* (ta2k) Neue App-Daten: Geräte-Status/Fehler (DeviceStatus), Energiestatistik (Statistics, stündlich), Heizzeiten (CircuitTimes)
* (ta2k) Heizzeiten schreibbar über `circuitTimes.PARAMETERID.setSchedule` (CircuitTimes/Write)
* (ta2k) App-Header und Login gegen die App-APK v3.0.1 verifiziert (X-Api-Version 2.0.0.0, AppVersion 3.0.1, Android)
* (ta2k) Auswählbare Portal-Domain (.com / .de)
* (ta2k) Login/Status-Fehler beenden nicht mehr die Instanz (kein Crash bei fehlenden Parametern oder Status)

### 0.0.16

* (ta2k) Improve error and login handling
  
### 0.0.15

* (ta2k) add app support

### 0.0.14

* (ta2k) fix command sends
### 0.0.13

* (ta2k) update dependencies

### 0.0.9

* (ta2k) fix for Status label

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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