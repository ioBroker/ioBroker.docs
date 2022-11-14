---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.puppeteer/README.md
title: ioBroker.puppeteer
hash: ZnCM+j2vcSykqibFuRmMp4P4/WEy44jI65uogH0Ac2g=
---
![标识](../../../en/adapterref/iobroker.puppeteer/admin/puppeteer.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.puppeteer.svg)
![下载](https://img.shields.io/npm/dm/iobroker.puppeteer.svg)
![安装数量](https://iobroker.live/badges/puppeteer-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/puppeteer-stable.svg)
![新PM](https://nodei.co/npm/iobroker.puppeteer.png?downloads=true)

# IoBroker.puppeteer
**测试：** ![测试和发布](https://github.com/foxriver76/ioBroker.puppeteer/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 puppeteer 适配器
基于 Chrome 生成截图的无头浏览器

## 免责声明
Puppeteer 是 Google Inc. 的产品。此模块的开发人员绝不会得到 Google Inc. 或任何相关子公司、徽标或商标的认可或附属。

＃＃ 如何
适配器可以通过状态完全配置，并且不在管理界面中提供设置。
状态（除了`url`）不会得到适配器的任何确认标志，并且确认标志通常被忽略。

＃＃＃ 状态
＃＃＃＃ 文件名
指定图像的文件名（完整路径）。

#### 网址
指定要从中截取屏幕截图的 url。如果写入状态，将立即创建屏幕截图。
创建截图后，适配器会将 url 状态的 ack 标志设置为 true。

＃＃＃＃ 完整页面
如果此状态评估为 true，它将执行整个页面的屏幕截图。裁剪选项将被忽略。

####cropLeft/顶部/高度/宽度
在`px`中配置裁剪选项以仅截取页面的所需部分。
如果 `fullPage` 设置为 true，则不会执行裁剪。

#### WaitForSelector
选择器在页面上可见后将截取屏幕截图，例如`#time`。如果 `waitForSelector` 处于活动状态，则其他等待操作（如 `renderTime`）将被忽略。

#### 渲染时间
以毫秒为单位等待页面呈现的间隔

### 消息
或者，您可以通过向适配器发送消息来截取屏幕截图。
除了 `url` 和 `ioBrokerOptions` 之外的所有选项都直接传递给 Puppeteer API，当前支持的参数可以在下面找到，有关更新的版本，请查看 [接口说明](https://pptr.dev/api/puppeteer.screenshotoptions)。
此外，您可以定义 `waitOption` 来等待给定时间或选择器。最后，您可以使用 `ioBrokerOptions.storagePath` 选项将屏幕截图直接保存到 `0_userdata.0` 下的 ioBroker 存储中，然后可以通过管理和可视化适配器查看。

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
        log(`Sucessfully took screenshot: ${obj.result}`);
      }
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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