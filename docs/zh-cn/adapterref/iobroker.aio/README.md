---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.aio/README.md
title: ioBroker.aio
hash: roo9tF0KUZYwK75TsMA2ylVgUnb6q6uGGvzzFfFt+dY=
---
![标识](../../../en/adapterref/iobroker.aio/admin/aio.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.aio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.aio.svg)
![安装数量（最新）](https://iobroker.live/badges/aio-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/aio-stable.svg)
![依赖状态](https://img.shields.io/david/Newan/iobroker.aio.svg)
![新PM](https://nodei.co/npm/iobroker.aio.png?downloads=true)

# IoBroker.aio
**测试：** ![测试和发布](https://github.com/Newan/ioBroker.aio/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 aio 适配器
从 Hansol Technics AIO 系统读取值

##帮助配置
在配置中添加您的逆变器的 ip。适配器将使用提供的 ip (YOUR_IP_HERE) 生成以下 URL：http://YOUR_IP_HERE/R3EMSAPP_REAL.ems?file=ESSRealtimeStatus.json

## 测试配置
在浏览器中打开 URL http://YOUR_IP_HERE/R3EMSAPP_REAL.ems?file=ESSRealtimeStatus.json。输出应该是 JSON 字符串，例如：

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