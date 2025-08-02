---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg
BADGE-NPM: https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rmb-bhkw/README.md
title: ioBroker.rmb-bhkw
hash: zoj+7OuNABF3BLUzmmJ+uzxv1Qyto6bT7eBw3cLsVXU=
---
![标识](../../../de/adapterref/iobroker.rmb-bhkw/admin/neoTower.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg)
![国家公共管理](https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true)

# IoBroker.rmb-bhkw
![测试与发布](https://github.com/satchafunkilus/ioBroker.rmb-bhkw/workflows/Test%20and%20Release/badge.svg)

## IoBroker 人民币 CHP 适配器
通过RMB Energy客户门户[人民币能源网](https://www.rmbenergie.com/login-report/)从RMB CHP（例如Remeha eLina）读取数据，并将这些数据作为ioBroker中的对象提供。这意味着即使没有系统可选的 ModBus 接口也可以访问数据。

＃＃ 使用
该适配器作为“预定”适配器运行，并按指定的时间间隔从客户门户提取数据。系统本身大约每 15 分钟才会将数据推送到客户门户，因此遗憾的是该数据不是实时数据。将适配器间隔设置为非常短的时间也没有什么意义。数据查询默认值为5min。

该适配器使用 Chromium 浏览器的无头版本来解析来自客户门户的数据。您可以使用适配器附带的 Chromium 版本或外部版本。

### 包含的 Chrome 版本
如果要使用包含的版本，则必须在 ioBroker 主机系统上满足 Chromium 依赖关系。适配器在安装过程中尝试自行安装缺少的依赖项。如果缺少这些依赖项之一，适配器会在日志中引发错误，指示缺少库。例如，可以使用以下命令将它们安装在 Debian/Ubuntu 系统上：

```
sudo apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

如果 ioBroker 安装在不同的操作系统上，依赖项的包名称可能有不同的名称 - 快速 Google 搜索可能会有所帮助。然后必须为相应的操作系统安装它们。或者，您可以切换为使用外部浏览器。

### 外部 Chrome 浏览器
如果由于缺少依赖项而无法使用提供的浏览器，建议将 Chromium 浏览器作为单独的容器运行。为此，建议使用图像[无浏览器/chrome](https://hub.docker.com/r/browserless/chrome/)。例如，可以使用以下命令创建此图像

```
docker run -p 3000:3000 browserless/chrome
```

然后可以通过 `http://[IP-des-docker-hosts]:3000` 进行访问。如果出现容器的 Web 界面，则说明它正在按预期工作，并且可以在适配器配置中输入相应的路径。

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