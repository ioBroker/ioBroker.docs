---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.puppeteer/README.md
title: ioBroker.puppeteer
hash: VeLC461Ko9ywOY4dm7OHmZxThOgAd9HdahzVtSVIGDo=
---
![Логотип](../../../en/adapterref/iobroker.puppeteer/admin/puppeteer.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.puppeteer.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.puppeteer.svg)
![Количество установок](https://iobroker.live/badges/puppeteer-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/puppeteer-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.puppeteer.png?downloads=true)

# IoBroker.puppeteer
**Тесты:** ![Тестирование и выпуск](https://github.com/foxriver76/ioBroker.puppeteer/workflows/Test%20and%20Release/badge.svg)

##адаптер puppeteer для ioBroker
Безголовый браузер для создания скриншотов на базе Chrome

## Отказ от ответственности
Puppeteer является продуктом Google Inc. Разработчики этого модуля никоим образом не одобрены и не связаны с Google Inc. или какими-либо связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Как
Адаптер полностью настраивается через состояния и не предоставляет настроек в интерфейсе администратора.
Состояния (кроме `url`) не получат никаких флагов подтверждения от адаптера, а флаги подтверждения обычно игнорируются.

### Состояния
#### Имя файла
Укажите имя файла (полный путь) изображения.

#### URL
Укажите URL-адрес, с которого вы хотите сделать снимок экрана. Если состояние написано, скриншот будет создан сразу.
После создания снимка экрана адаптер установит для флага подтверждения состояния URL-адреса значение true.

#### Полная страница
Если это состояние имеет значение true, будет выполнен снимок экрана всей страницы. Параметры обрезки будут игнорироваться.

#### Обрезка слева/сверху/высоты/ширины
Настройте параметры обрезки в `px`, чтобы сделать скриншот только нужного сегмента страницы.
Если для параметра `fullPage` установлено значение true, обрезка выполняться не будет.

#### WaitForSelector
Снимок экрана будет сделан после того, как на странице появится селектор, например. `#time`. Если `waitForSelector` активен, другие операции ожидания, такие как `renderTime`, игнорируются.

####время рендеринга
Интервал в мс для ожидания рендеринга страницы

### Сообщения
Альтернативно вы можете делать снимки экрана, отправляя сообщения на адаптер.
Все параметры, кроме `url` и `ioBrokerOptions`, передаются непосредственно в API Puppeteer. Поддерживаемые в настоящее время параметры можно найти ниже. Для получения более актуальной версии проверьте [Описание API](https://pptr.dev/api/puppeteer.screenshotoptions).
Кроме того, вы можете определить `waitOption` для ожидания заданного времени или селектора. Наконец, вы можете использовать опцию `ioBrokerOptions.storagePath`, чтобы сохранять снимки экрана непосредственно в хранилище ioBroker под `0_userdata.0`, которые затем можно просмотреть через адаптеры администратора и визуализации.

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
  }, obj => {
      if (obj.error) {
        log(`Error taking screenshot: ${obj.error.message}`, 'error');
      } else {
        // the binary representation of the image is contained in `obj.result`
        log(`Successfully took screenshot: ${obj.result}`);
      }
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-05-19)
* (foxriver76) allowed to specify additional arguments for the puppeteer process
* (foxriver76) updated puppeteer dependency

### 0.2.8 (2024-01-09)
* (foxriver76) update puppeteer dependency

### 0.2.7 (2023-03-18)
* (foxriver76) update puppeteer dependency

### 0.2.6 (2022-08-14)
* (foxriver76) we now close the page also when screenshot taken via message

### 0.2.5 (2022-08-14)
* (foxriver76) we have optimized the viewport option

### 0.2.4 (2022-08-12)
* (foxriver76) allow settings viewport options
* (foxriver76) the default viewport is now the max resolution

### 0.2.3 (2022-08-12)
* (foxriver76) optimized path check for relative paths

### 0.2.1 (2022-06-09)
* (foxriver76) we now install required shared libraries on adapter installation on linux

### 0.2.0 (2022-05-20)
* (foxriver76) added option to save files to the ioBroker storage via messages by using `ioBrokerOptions.storagePath` (closes #2)

### 0.1.0 (2022-05-16)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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
