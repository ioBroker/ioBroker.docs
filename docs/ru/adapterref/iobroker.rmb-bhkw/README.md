---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg
BADGE-NPM: https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rmb-bhkw/README.md
title: ioBroker.rmb-bhkw
hash: zoj+7OuNABF3BLUzmmJ+uzxv1Qyto6bT7eBw3cLsVXU=
---
![логотип](../../../de/adapterref/iobroker.rmb-bhkw/admin/neoTower.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg)
![НПМ](https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true)

# IoBroker.rmb-bhkw
![Тестирование и выпуск](https://github.com/satchafunkilus/ioBroker.rmb-bhkw/workflows/Test%20and%20Release/badge.svg)

## Адаптер RMB CHP для ioBroker
Считывает данные из ТЭЦ RMB (например, Remeha eLina) через клиентский портал RMB Energy [rmbenergie.com](https://www.rmbenergie.com/login-report/) и делает их доступными в виде объектов в ioBroker. Это означает, что доступ к данным возможен даже без дополнительного системного интерфейса ModBus.

## Использовать
Адаптер работает как «запланированный» адаптер и извлекает данные с клиентского портала через указанный интервал. Сама система передает данные на клиентский портал примерно каждые 15 минут, поэтому, к сожалению, эти данные не являются данными в реальном времени. Также нет смысла устанавливать очень короткий интервал времени для адаптера. Значение по умолчанию для запроса данных — 5 минут.

Адаптер использует автономную версию браузера Chromium для анализа данных с клиентского портала. Вы можете использовать версию Chromium, поставляемую с адаптером, или внешнюю версию.

### Включенная версия Chrome
Если будет использоваться включенная версия, зависимости Chromium должны быть соблюдены в хост-системе ioBroker. Адаптер пытается самостоятельно установить отсутствующие зависимости во время установки. Если одна из этих зависимостей отсутствует, адаптер выдает в журнал ошибку, указывающую на отсутствие библиотеки. Их можно установить, например, в системе Debian/Ubuntu с помощью:

```
sudo apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

Если ioBroker установлен в другой операционной системе, имена пакетов зависимостей могут иметь другие названия — здесь, вероятно, поможет быстрый поиск в Google. Затем их необходимо установить для соответствующей операционной системы. Альтернативно вы можете переключиться на использование внешнего браузера.

### Внешний браузер Chrome
Если поставляемый браузер невозможно использовать из-за отсутствия зависимостей, рекомендуется запустить браузер Chromium как отдельный контейнер. Для этой цели рекомендуется использовать изображение [без браузера/хром](https://hub.docker.com/r/browserless/chrome/). Такое изображение можно создать, например, командой

```
docker run -p 3000:3000 browserless/chrome
```

и затем к нему можно получить доступ в разделе `http://[IP-des-docker-hosts]:3000`. Если появляется веб-интерфейс контейнера, значит, он работает должным образом, и соответствующий путь можно ввести в конфигурации адаптера.

## Changelog
### 1.0.7 (2023-11-30)
* BREAKING CHANGE due to renaming of object ids
* Changed object IDs to English
* Prevented forbidden chars in object IDs
* Changed objects to read-only
* Changed logs to english
* Changed some logs from info to debug

### 1.0.6 (2023-05-29)
* Added option to allow insecure certificates, as rmbenegie portal is not updating their certificates in time, leading to data not being able to be pulled

### 1.0.5 (2023-02-18)
* Added Admin5 UI
* Updated dependencies

### 1.0.4 (2022-05-16)
* Missing dependencies for chromium are now installed automatically, therefore internal browser should also work in docker container
* Added random delay in polling of data to prevent DDoS on RMB servers
* Code cleanup
* Fixed icon paths
* Added english readme section

### 1.0.3 (2022-04-16)
* Improved handling of errors (Adapter does no longer pull data when server is offline, leading to empty/null states)

### 1.0.2 (2022-04-15)
* Fixed versioning issue in io-package.json (for real)

### 1.0.1 (2022-04-15)
* Fixed versioning issue in io-package.json

### 1.0.0 (2022-04-15)
* (satchafunkilus) First major release

### 1.0.0-0 (2022-04-15)
* (satchafunkilus) First functional release

### 0.0.2 (2022-04-15)
* (satchafunkilus) initial release

## License
MIT License

Copyright (c) 2023 satchafunkilus

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