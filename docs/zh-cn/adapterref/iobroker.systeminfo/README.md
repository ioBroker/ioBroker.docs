---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.systeminfo/README.md
title: 系统信息
hash: YxrTeRdOWPWwOeQiFu2rqefDqRh+wNp9vRhonz20SwA=
---
![商标](../../../en/adapterref/iobroker.systeminfo/admin/systeminfo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI 构建状态](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![新PM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

＃ 系统信息
从系统读取（和写入）信息

## 适配器处理来自自己或其他系统和 Web 源的（系统）信息
它根据通过不同方法找到的信息生成状态

* 在操作系统中执行的命令
*要在本地或连接的系统上读取的文件
* 来自网页或 API 的结果
* Nodejs 工具命令

* 命令和文件也可以双向工作，这意味着您也可以将信息写入系统。
* 这允许访问和写入 Raspi 或 OrangePi 上的 GPIO 引脚，或者还可以控制 Raspi/Opi 上的绿色或红色 LED
* 它还允许获取/设置在 Lunux 中通过 /sys 访问的一些系统信息
* 使用了一个“系统信息”部分，适用于 Windows 和 Linux

它使用特殊的查询机制处理文本、HTML、json 和 XML 数据类型。

＃＃＃ 笔记
* 我想对网络上的一些模块表示感谢，这些模块是我用自己的代码使用或实现的。 Adapter 使用了一些外部模块，例如 [cheerio](https://github.com/cheeriojs/cheerio)、[systeminformation](https://github.com/sebhildebrandt/systeminformation) 和 [node-schedule](https:// /github.com/node-schedule/node-schedule) 原样。它还受到 [JSONPath](http://goessner.net/articles/JsonPath/index.html#e2) 和 [scrape-it](https://github.com/IonicaBizau/scrape-it) 的代码的启发但他们的代码没有直接使用，而是根据不同的需要重新实现。

＃＃ 配置
* 在适配器配置中配置（放大页面）
* 我存储了一个示例配置的图片 [这里](./admin/Systeminfo.Config.jpg)
    * 第一项是一个命令列表，它将在适配器启动时（逐行）执行。它可用于设置使用的 GPIO 端口。
    * 不执行以 '`#`' 开头的行
    * 如果第一个文本是 '`debug!`'，它会将适配器设置为调试模式，这会显示他尝试提取和接收的更多信息。
* 启动配置后，每个数据源的配置列表包括
    * 名称字段也可以包括
        * 如果名称以 '`-`' 开头，则该行将被忽略（关闭），就像没有时间表一样
        * `[*]`, `[name, ...]`, `[name/(value)]` 语法
        * 如果没有上述任何内容，则该名称用于按原样创建状态。
        * 如果在某处使用了 `[]`，则使用不同的方法在此处插入名称
            * `[*]` 如果返回多个元素，它们将作为数字插入。示例：如果返回 (n) 个元素，`Meldung[]` 将生成 `Meldung0`-`Meldung(n)`
            * `[name1,name2, ...]` 准确地创建了这些名称（例如 `System.Memory_[used, free, available]` 将创建三个名为 `System.Memory_used, System.Memory_free, System.Memory_available` 的状态）
            * `[name/value]` 获取对象属性 `name` 的名称（可能不同）和属性 `value` 的值。可以使用任何属性或值名称。
            * 没有值的 `[name/]` 将从 `name` 中获取名称，并为在此对象中找到的所有其他属性创建子状态（例如 `System.Network.[iface/]`）

    * 信息源的`type`和`source`可以是
        * `file`：`source` 字段描述了读取的文件名
        * `exec`：`source` 字段描述了一个被执行的单行命令
        * `info`：`source`字段描述单行`systeminfo`命令功能
        * `web`：`source` 字段描述了一个被读取的 Web URL（或描述访问的对象，这需要稍后记录！）。
        * 如果同时请求具有相同类型/源内容的多个条目，则请求被缓存！这意味着如果您安排每分钟执行一个命令并从同一命令中取出两个不同的数据项，则它只运行一次，并且只应用数据过滤器多次。
        * 如果您想检索更多项目，这有助于不要多次下载同一页面。

    * `regexp/filter`` 用于描述如何过滤接收到的文本
        * `Regexp` 语句，其中单个项目需要用 `()` 包围。

        示例：`/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` 将查找文本 `lic` 后跟空格，然后在所有行中以 `K` 结尾的数字，它将返回 3 个数字。这在 Linux 的 `df -BK` 命令中使用，以向我显示名称中以“lic”结尾的已挂载 NFS 共享的大小。

        * `JsonPath` 语句。我创建了一个特殊版本的 JsonPath 来从 Json 或任何 javascript 对象中选择数据。
            * 它的语法由一行选择器组成，可以是
            * `name` 一个属性名
            * `*` 此对象中的任何项，这可以是所有属性，或者如果对象是一个数组，则它是所有数组项
            * `[(...)]` 评估 `...` 以获得将被选择的属性名称。 `@` 将用作当前对象的占位符，并且可以在 eval 语句中使用。
            * `[?(...)]` 按...过滤此项的元素，

            示例：`list[?(@.user == 'pi')]`将首先选择属性`list`（它是一个数组），然后通过仅选择这些列表项来筛选列表，这些列表项具有`.user`设置为`pi`。

            * `[!(...)]` 将评估值作为新项目返回。通过这种方式，您可以从找到的对象中计算出您自己的数据。
            * `[name1,name2,name3]` 将只选择那些属性名称
            * `[0]` 将仅选择“第一个”（或第 n 个）元素或属性
            * `[start:end:step]` 将从 `start` 和 `<end` 开始的元素使用 `step`。都必须是数字，或者留空。 `start` 和 `end` 可以是负数，这意味着它们从 end 开始计算。示例：`[1:-1:2]` 将从第二个元素到最后一个元素，但不包括最后一个元素。最后一个是 `[-1::]`，前 3 个是 `[:3:]`，最后 3 个是 `[-3::]`
            * `..` 是一个递归下降选择器，这意味着 `..name` 将选择对象的“任何部门”中的属性名称！
        * `html WebObject query` 如果解析了 html，我创建了一个特殊的查询工具来从类似于 jQuery 的 web paqges 中选择项目。该工具创建了一个对象，该对象最终使用 `JsonPath` 进行解析。 **要遵循的文档**

    * `convert` 条目可以是
        * `json` 用于解析 json 数据，在 Web 条目上，这意味着接收到的文本将直接作为 json 处理，并且正则表达式/过滤器将是 `JsonParse` 语句/过滤器。
        * `xml` 用于 XML 数据，这意味着接收到的数据将从 XML 转换为 json 并按上述处理
        * `html` 将生成一个 `cheerio` 对象，然后使用特殊的 WebObject 查询进行搜索
        * `number` 或 `boolean` 会尝试将值转换为数字或布尔值，如果布尔值大于 0 为真，但像 **on** 或 **ein** 和 **true** 这样的字符串也会计算为真的。
        * `...` 将评估任何其他内容，例如 `!parseInt(@)`，在这种情况下，如果值为 `0`，则返回 **true**，如果值为更大的整数，则返回 **false**。

    * `role/type` 字段描述 ioBroker 字段 ty 并且可以命名 olso 一个单元。正常的字段类型是文本或转换中看到的值。
        * `json` 表示字段属性取自对象
        * `number|MB` 将定义一个单位为 MB（兆字节）的数字字段

    * `Write Command` 字段描述将用于写回项目的语句或评估。它目前仅适用于 '`exec`' 或 '`file`' 类型。
        * 对于 `exec`，它是一个命令行，可以包含将被评估的 `@(...)` 语句。示例：`gpio write 1 @(@ ? '0' : '1')` 如果状态为 true，则转换为 `gpio write 1 0`，如果为 false，则转换为 `gpio write 1 1`。如果 GPIO 引脚为“低”（0），这将控制我的 IR LED 灯。
        * 对于 `file`，它是一个简单的 eval 表达式，它被执行并写入文件。示例：`@ ? '1' : '0' ` 如果值为真，则写为 '1'，如果为假，则写为 '0'。

    * 最后是`schedule`。如果它为空，则根本不执行 ite！所有共享完全相同值的调度将与相同的缓存一起执行。
        * `cron-syntax` 你可以使用相同的 'cron'-syntax 就像 oBroker 使用 [node-schedule](https://github.com/node-schedule/node-schedule) 中描述的 inJavascript 调度
        * `time-syntax` 我创建了一个特殊的时间语法 `?:?(:?)` 这使它更容易
            * `*:16` 将在每小时的第 15 分钟请求此数据
            * `*/2:1:1` 将在第 1 分钟和第 1 秒每隔一小时请求一次。
            * `?s`, `?m`, `?h` with ?数字 >0 将每隔 ? 秒、每分钟或几小时运行一次请求，您不能一次指定多个项目！
        * 计划被分组到同一时间，如果您省略上面第一个示例中的秒数，它将被分配给某个数字，试图避免所有项目的秒数相同。这样做是为了不要同时运行太多命令。

＃＃ 已知的问题
* Beta 测试，未实现对网页的写入

## 重要/维希蒂格
* 需要节点 >=v4.5

## Changelog
### 0.3.0
* Added save and load config in admin screen

### 0.2.2
* First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
* New icon to separate it from info-Adapter

### 0.2.0
* First public beta includes jsonParse and WebQuery parse

### Todo for later revisions
* Allow import/export of configs to easily add new functions
* Allow access of web pages with authentication and also writing/postng web content

## License

The MIT License (MIT)

Copyright (c) 2017-2019, frankjoke <frankjoke@hotmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.