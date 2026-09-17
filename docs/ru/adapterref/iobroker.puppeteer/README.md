---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.puppeteer/README.md
title: ioBroker.puppeteer
hash: 2drb/FmQEDurvwCVGhf47Gh8fn/mmCuNT16mC+sb9OA=
---
![Логотип](../../../en/adapterref/iobroker.puppeteer/admin/puppeteer.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.puppeteer.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.puppeteer.svg)
![Количество установок](https://iobroker.live/badges/puppeteer-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/puppeteer-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.puppeteer.png?downloads=true)
![Тестирование и выпуск](https://github.com/foxriver76/ioBroker.puppeteer/workflows/Test%20and%20Release/badge.svg)

# ioBroker.puppeteer

## Адаптер Puppeteer для ioBroker

Безголовый браузер для создания скриншотов на основе Chrome

## Отказ от ответственности

Puppeteer — продукт компании Google Inc. Разработчики этого модуля никоим образом не связаны с компанией Google Inc., ее дочерними компаниями, логотипами или товарными знаками и не получают от них никакой поддержки.

## Безголовые среды

Обратите внимание, что в **системах без графического интерфейса** (например, на серверах Linux без графического интерфейса) Chromium/Chrome требует наличия некоторых разделяемых библиотек. Адаптер автоматически устанавливает многие отсутствующие зависимости. `osDependencies` В Linux это возможно, но в зависимости от вашего дистрибутива вам всё равно может потребоваться установить браузер (например, `chromium-browser` или `google-chrome-stable`) вручную и настройте его с помощью опции **"Использовать внешний браузер"** .\
&#x20;Если ioBroker запущен от имени root (например, внутри контейнера Docker), вам также может потребоваться передать параметр. `--no-sandbox` и `--disable-setuid-sandbox` аргументы внутри настроек адаптера.

```bash
sudo apt update
sudo apt install chromium -y
which chromium # check the path to the browser executable, e.g. /usr/bin/chromium
chromium --version
```

После этого настройте адаптер для использования установленного браузера, активировав опцию **«Использовать внешний браузер»** и указав путь к исполняемому файлу браузера (например, `/usr/bin/chromium`).

## Инструкция

Адаптер полностью настраивается через состояния и не предоставляет настроек в административном интерфейсе. Состояния (помимо) `url`) не получит никаких флагов подтверждения от адаптера, и флаги подтверждения, как правило, игнорируются.

### Штаты

#### имя файла

Укажите имя файла (полный путь) изображения.

#### url

Укажите URL-адрес, с которого вы хотите сделать снимок экрана. Если состояние указано, снимок экрана будет создан немедленно. После создания снимка экрана адаптер установит флаг подтверждения (ack) состояния URL-адреса в значение true.

#### полная страница

Если это условие выполняется, будет сделан снимок экрана всей страницы. Параметры обрезки будут проигнорированы.

#### cropLeft/Hop/Height/Width

Настройте параметры обрезки в `px` Чтобы сделать снимок экрана только нужного сегмента страницы. Если `fullPage` Если установлено значение true, обрезка выполняться не будет.

#### waitForSelector

Скриншот будет сделан после того, как селектор станет видимым на странице, например. `#time`. Если `waitForSelector` активен, другие ожидают операций, таких как `renderTime` игнорируются.

#### renderTime

Интервал в миллисекундах, в течение которого страница будет отрисована.

### Сообщения

В качестве альтернативы, вы можете делать снимки экрана, отправляя сообщения адаптеру. Все варианты, кроме... `url` и `ioBrokerOptions` Параметры передаются непосредственно в API Puppeteer; список поддерживаемых параметров приведен ниже; для получения более актуальной информации ознакомьтесь [с описанием API](https://pptr.dev/api/puppeteer.screenshotoptions) . Кроме того, вы можете определить `waitOption` Дождитесь заданного времени или выбора элемента управления. Наконец, вы можете использовать `ioBrokerOptions.storagePath` опция для сохранения скриншотов непосредственно в хранилище ioBroker в разделе `0_userdata.0` которые затем можно просмотреть через административные и визуализационные адаптеры.

```typescript
sendTo('puppeteer.0', 'screenshot', { url: 'https://www.google.com',
      ioBrokerOptions?: {
        /**
         * Define a filename for the ioBroker storage e.g. test.png
         */
        storagePath: string;
      },
      /**
       * Define at most one wait option
       * You can also look for other waitOptions currently supported by Puppeteer API
       * see e.g. https://puppeteer.github.io/puppeteer/docs/puppeteer.page.waitforfilechooser
       */
      waitOption?: {
        /**
         * Define a Timeout in ms
         */
        waitForTimeout?: 5000,
    
        /**
         * Wait for a given id/tag/etc to be occured
         */
        waitForSelector?: '#testId'
      },
      /**
       * Optionally, specify the viewport manually, see https://pptr.dev/api/puppeteer.viewport
       */
      viewportOptions?: {
        width: 800,
        height: 600
      },
      /**
       * The file path to save the image to. The screenshot type will be inferred
       * from file extension. If path is a relative path, then it is resolved
       * relative to current working directory. If no path is provided, the image
       * won't be saved to the disk.
       */
      path?: string,
      /**
       * When true, takes a screenshot of the full page.
       * @defaultValue false
       */
      fullPage?: boolean,
      /**
       * An object which specifies the clipping region of the page.
       */
      clip?: {         
        x: number,
        y: number,
        width: number,
        height: number 
      };
      /**
       * Quality of the image, between 0-100. Not applicable to `png` images.
       */
      quality?: number,
      /**
       * Hides default white background and allows capturing screenshots with transparency.
       * @defaultValue false
       */
      omitBackground?: boolean,
      /**
       * Encoding of the image.
       * @defaultValue 'binary'
       */
      encoding?: 'base64' | 'binary',
      /**
       * If you need a screenshot bigger than the Viewport
       * @defaultValue true
       */
      captureBeyondViewport?: boolean,
      /**
       * When the navigation is considered finished. Defaults to `networkidle2` for backwards compatibility,
       * but for pages with persistent connections (WebSockets, SSE) — e.g. ioBroker vis, Home Assistant
       * Lovelace, Grafana — `networkidle2` will never trigger and the screenshot will only be taken once
       * `navigationTimeout` is reached. Use `'load'` or `'domcontentloaded'` for those pages and combine
       * with `waitOption.waitForSelector` to wait for a real "ready" marker.
       * @defaultValue 'networkidle2'
       */
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2',
      /**
       * Maximum time in milliseconds for `page.goto()` and any subsequent `waitFor…` calls.
       * Lower values free up the renderer process faster when a page hangs.
       * @defaultValue 30000
       */
      navigationTimeout?: number,
  }, obj => {
      if (obj.error) {
        log(`Error taking screenshot: ${obj.error.message}`, 'error');
      } else {
        // the binary representation of the image is contained in `obj.result`
        log(`Successfully took screenshot: ${obj.result}`);
      }
});
```

## Получите ответ с помощью GET/POST-запроса.

Вы можете использовать `rest-api` адаптер для получения ответа на операции sendTo через HTTP:

```bash
curl -X 'GET' \
  'http://192.168.1.129:8093/v1/sendto/puppeteer.0?message=screenshot&data=%7B%22url%22%3A%22http%3A%2F%2F192.168.1.129%3A8082%2Fvis-2%2F%3Fmain%23SeeedColor%22%2C%22ioBrokerOptions%22%3A%7B%22storagePath%22%3A%22color.png%22%7D%2C%22waitOption%22%3A%7B%22waitForSelector%22%3A%22.battery%22%7D%2C%22viewportOptions%22%3A%7B%22width%22%3A800%2C%22height%22%3A480%7D%2C%22captureBeyondViewport%22%3Afalse%2C%22waitUntil%22%3A%22load%22%7D&responseContentType=image%2Fpng' \
  -H 'accept: application/json'
```

## Веб-расширение

Адаптер регистрируется как веб-расширение `web` Благодаря адаптеру, скриншоты можно запускать, просто перейдя по ссылке. Дополнительный порт не открывается: маршруты работают на веб-экземпляре, который вы выбираете в настройках адаптера, и, следовательно, используют его настройки HTTP/HTTPS и аутентификацию.

Настройки:

- **Веб-экземпляр** - который `web` экземпляр предоставляет ссылку (`*` = все они).
- **URL-путь** — путь, по которому установлено расширение (по умолчанию). `puppeteer` Оно должно быть уникальным, если несколько экземпляров Puppeteer расширяют один и тот же веб-экземпляр.

При настройках по умолчанию скриншот доступен по адресу: `http://<web-ip>:8082/puppeteer/?url=<URL>` где URL — это страница, которую вы хотите захватить (абсолютный номер). `http://` или `https://` (только URL-адреса). Вы также можете указать дополнительные параметры:

- `fullPage=true` сделать снимок экрана всей страницы
- `waitForSelector=#testId` дождаться выполнения заданного селектора перед созданием скриншота
- `waitForTimeout=5000` подождать заданное время в миллисекундах перед созданием снимка экрана (используется только если `waitForSelector` не задано)
- `width=800&height=600` указать размер области просмотра для снимка экрана
- `clipLeft=0&clipTop=0&clipWidth=800&clipHeight=600` указать параметры обрезки для скриншота
- `quality=80` Чтобы указать качество скриншота (только для форматов JPEG/WebP)
- `omitBackground=true` чтобы скрыть стандартный белый фон и разрешить создание снимков экрана с прозрачностью
- `encoding=base64` Укажите кодировку изображения (по умолчанию — бинарная).
- `captureBeyondViewport=true` Разрешить создание скриншотов большего размера, чем область просмотра (по умолчанию — true).
- `type=jpeg/png/webp` Чтобы указать тип скриншота (по умолчанию — png).
- `waitUntil=load|domcontentloaded|networkidle0|networkidle2` Определяет момент завершения навигации (по умолчанию: `networkidle2` См. **советы по созданию панелей мониторинга с данными в реальном времени** ниже.
- `navigationTimeout=15000` максимальное время в миллисекундах для `page.goto()` и последующие ожидания (по умолчанию: `30000` Более низкие значения позволяют быстрее освобождать процессы рендеринга при зависании страницы.

В ответе вы получите двоичное представление изображения, которое можно напрямую отобразить в браузере, или строку в формате Base64. `{ result: "base64" }` в зависимости от указанной кодировки.

### Советы по созданию дашбордов на основе данных в реальном времени (vis / vis-2 / Lovelace / Grafana)

По умолчанию `waitUntil=networkidle2` Ожидание продолжается до тех пор, пока у страницы не останется менее трех открытых сетевых соединений в течение 500 мс. Панели мониторинга, поддерживающие постоянное соединение WebSocket или Server-Sent-Events — включая **ioBroker vis/vis-2** , **Home Assistant Lovelace** и **Grafana** — никогда не достигают этого состояния, поэтому каждый снимок экрана будет блокироваться до тех пор, пока `navigationTimeout` Проходит (по умолчанию 30 секунд). Пока страница зависает, процесс рендеринга Chromium продолжает потреблять \~100–200 МБ RSS.

Для использования этих панелей мониторинга воспользуйтесь:

- `waitUntil=load` (или `domcontentloaded`) — **не** ждет, пока WebSocket перейдет в режим ожидания, и
- `waitForSelector=<a-selector-that-only-exists-once-the-data-is-rendered>` — чтобы убедиться, что вы действительно захватываете отрендеренный контент, а не пустой скелет.

Рекомендуемые готовые селекторы:

| Панель управления         | Селектор                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| ioBroker vis 1            | `#vis_container .vis-view`                                                                      |
| ioBroker vis-2            | `#materialUI`                                                                                   |
| Домашний помощник Лавлейс | `home-assistant-main` (и по желанию) `hui-view ha-card` (после того, как карты будут отображены) |
| Графана                   | `.panel-content` или `.dashboard-container`                                                      |

Необязательно: добавить небольшой `waitForTimeout` (например `200`) для стабилизации анимации графиков.

Пример:

```
http://<web-ip>:8082/puppeteer/?url=http://homeassistant.local:8123/lovelace/0&waitUntil=load&waitForSelector=hui-view&waitForTimeout=300
```

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @foxriver67 ( <https://github.com/foxriver76> ), который создал его до предыдущих релизов.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-09-15)
* (@GermanBluefox) Added a web extension for `ioBroker.web`, so screenshots can be taken by calling a link
* (@GermanBluefox) Added the option to limit the simultaneous renders to avoid overload of the system
* (@GermanBluefox) Fixed renderer-process leak when navigation or screenshot threw — pages are now always closed
* (@GermanBluefox) Added per-request `waitUntil` and `navigationTimeout` parameters (message API + web server) to support live-data dashboards (vis, Lovelace, Grafana) without hitting the network-idle timeout

### 1.0.0 (2026-09-10)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation

### 0.4.0 (2024-09-17)
* (@foxriver76) updated puppeteer dependency
* (@foxriver76) allowed specifying an external browser for puppeteer

### 0.3.0 (2024-05-19)
* (foxriver76) allowed specifying additional arguments for the puppeteer process
* (foxriver76) updated puppeteer dependency

### 0.2.8 (2024-01-09)
* (foxriver76) update puppeteer dependency

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Moritz Heusinger <moritz.heusinger@gmail.com>

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