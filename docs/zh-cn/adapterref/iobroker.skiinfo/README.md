---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: 6aSEES/WuLqmEA2uTN3WjAWcEd+NfAfpLl8mUuQ0fYw=
---
# IoBroker.skiinfo
![标识](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![安装数量](https://iobroker.live/badges/skiinfo-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/skiinfo-stable.svg)
![GitHub 上的 nycrc 配置](https://img.shields.io/nycrc/oweitman/iobroker.skiinfo?preferredThreshold=functions)
![新公共管理](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)

**测试：**![测试和发布](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 skiinfo 适配器
通过此适配器，您可以了解山区、山谷和新雪的当前积雪深度，以及欧洲各地的开放式缆车。

＃＃ 配置
该适配器不需要任何配置。

## Vis 和小部件
以下小部件确实存在

- [`Skiinfo browser`](#skiinfo-browser) - 浏览所有可用的

国家、地区和区域，并设置喜爱的区域。

- [`Skiinfo Favorites`](#skiinfo-favorite) - 仅显示最喜欢的滑雪区。

更多信息

- 使用 [`CSS 类`](#css-classes) 进行单独样式设置

### Skiinfo 浏览器
该小部件允许您浏览所有可用的国家、地区和领土并设置收藏夹。

您可以使用表头切换每列的排序方式（默认、降序或升序）。
您可以使用区域列中的搜索图标进行搜索。
您可以使用星号图标切换收藏模式。
所有条目都可以缩减到收藏夹中，以便更快地找到收藏夹。

选择配置数据点作为数据点。

### Skiinfo 最爱
该小部件用于仅显示您最喜欢的滑雪场。
使用表头，您可以切换每列的排序模式（默认、降序、升序）。
使用星形图标，您可以从收藏列表中删除该区域。

作为数据点，请选择配置数据点。

### CSS 类
#### `widgetID` 和 `skiinfo`
所有 CSS 类都包含两个基类 `widgetID` 和 `skiinfo`。
这允许您将格式应用于单个小部件，或者在使用多个 skiinfo 小部件时，将格式应用于所有 skiinfo 小部件。

#### `countries`、`regions` 和 `areas`
每个不同的信息区域都可以用这 3 个 CSS 类分别处理

#### 信息区域国家、地区和区域
3 个信息区域均由一个普通的 HTML 表组成。

#### 国家和地区选定元素
每个选定的元素都位于一个 span 元素中，并被赋予 CSS 类 `selected`。

#### 格式化区域部分中的列
表格标题使用了 CSS 类 tharea 和 thsort。
每个列元素都使用了 `txtr`（用于右对齐）和 `txtl`（用于左对齐）格式。

#### 最喜欢的明星
收藏星标可放置在 span 元素中，并通过 CSS 类 `favorite` 进行访问。如果某个元素已被收藏，则 span 元素会添加 `selected` 进行补充。

CSS 类的示例
##### 为选定的国家或地区元素指定不同的颜色
```css
.skiinfo .selected {
    color: green;
}
```

##### `regions` 元素的不同格式
```css
.skiinfo.regions span {
    color: grey;
}
```

## 可用的 sendTo 命令
### 获取服务器滑雪数据
获取客户端所请求的滑雪数据的当前数据。

getServerSkiData 的参数
没有任何

getServerSkiData 的示例
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### 获取服务器国家数据
如果尚未加载国家数据，则加载该数据并将数据发送回客户端。

#### GetServerCountryData 的参数
- 国家代码

#### GetServerCountryData 示例
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### 获取服务器区域数据
如果尚未加载国家和地区数据，则加载该数据并将数据发送回客户端。

#### GetServerRegionData 的参数
- 国家代码
- 区域代码

#### GetServerRegionData 示例
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### 添加服务器收藏
为指定的国家和地区添加收藏区域。
如果收藏区域不存在，则会添加。
将更新后的数据发送回客户端。

#### AddServerFavorite 的参数
- 国家代码
- 区域代码

#### AddServerFavorite 示例
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### 删除服务器收藏夹
删除指定国家和地区的收藏区域。
将更新后的数据发送回客户端。

#### DelServerFavorite 的参数
- 国家代码
- 区域代码

#### DelServerFavorite 示例
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## 待办事项
- 待定义

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-10-08)

- test remove node 18,extend to node 24
- add filter button in browser to reduce all entries to favorites.

### 0.5.0 (2025-04-16)

- add search for regions in browser

### 0.4.1 (2025-04-08)

- fix url
- fix classname of CountryList
- improve icons with round corners
- fix advices from code review
- fix global dependency

### 0.4.0 (2025-03-05)

- fix version info

### 0.3.0 (2025-03-05)

- release

### 0.2.0 (2025-03-05)

- enable npm deploy

### 0.1.0 (2025-03-05)

- initial release
- The color for favorites has now been made selectable
- minor CSS improvements
- Documentation of the sendTo commands has been added.
- The documentation of the CSS classes has been added.

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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