---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rest-api/README.md
title: REST-API 适配器
hash: +50yZp/vx0ShiOLZMAqd0toyG5T4ew35wizIEVsBt3E=
---
![标识](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![安装数量](http://iobroker.live/badges/rest-api-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![新PM](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# REST-API 适配器
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

这是 RESTFul 接口，用于从 ioBroker 读取对象和状态，并通过 HTTP Get/Post 请求写入/控制状态。

这个适配器的目的类似于 simple-api。但是这个适配器支持订阅的长轮询和 URL 挂钩。

它有非常有用的网络界面来处理请求：

![截屏](../../../en/adapterref/iobroker.rest-api/img/screen.png)

＃＃ 用法
在浏览器中调用```http://ipaddress:8093/```并使用 Swagger UI 来请求和修改状态和对象。

一些请求示例：

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - 将状态读取为 JSON
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` - 将状态读取为字符串（唯一值）
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - 使用 GET 写入状态（仅用于与 simple-api 的向后兼容）

## 订阅状态或对象更改
您的应用程序可以通过状态或对象的每次更改来获得通知。

为此，您的应用程序必须提供 HTTP(S) 端点来接受更新。

node.js 中的示例请参见此处[demoNodeClient.js](examples/demoNodeClient.js)

## 长轮询
此适配器支持通过长轮询订阅数据更改。

浏览器示例可以在这里找到：[demoNodeClient.js](examples/demoBrowserClient.html)

## 网络扩展
此适配器可以作为 Web 扩展运行。在这种情况下，路径在 http://iipaddress:8082/rest 下可用

＃＃ 注意
- `POST` 始终用于创建资源（是否重复无关紧要）
- `PUT` 用于检查资源是否存在然后更新，否则创建新资源
- `PATCH` 总是用于更新资源

## 命令
此外，您可以通过特殊接口执行许多套接字命令：

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

例如。

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - 读取`system.adapter.admin.0.alive`的状态
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - 读取文件 `admin.admin/admin.png` 作为 JSON 结果
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - 将文件 `admin.admin/admin.png` 作为文件读取
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - 重启管理员

您也可以使用 POST 方法请求所有命令。因为 body 必须是带参数的对象。例如：

```
curl --location --request POST 'http://ipaddress:8093/v1/command/sendTo' \
--header 'Content-Type: application/json' \
--data-raw '{
"adapterInstance": "history.0",
"command": "getHistory",
"message": {"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}
}'
```

您不能通过 GUI 向命令发送 POST 请求。

<!-- 开始 -->

＃＃＃ 状态
- `getStates(pattern)` - 获取模式的状态列表（例如 system.adapter.admin.0.*）。 GUI 可以通过答案的可视化来解决问题。
- `getState(id)` - 通过 ID 获取状态值
- `setState(id, state)` - 使用 JSON 对象设置状态值（例如 `{"val": 1, "ack": true}`）
- `getBinaryState(id)` - 通过 ID 获取二进制状态
- `setBinaryState(id, base64)` - 通过 ID 设置二进制状态

### 对象
- `getObject(id)` - 通过 ID 获取对象
- `getObjects()` - 获取所有状态和房间。 GUI 可以通过答案的可视化来解决问题。
- `getObjectView(design, search, params)` - 获取特定对象，例如设计=系统，搜索=状态，参数=`{“startkey”：“system.adapter.admin。”，“endkey”：“system.adapter.admin。\u9999”}`
- `setObject(id, obj)` - 使用 JSON 对象设置对象（例如 `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`）
- `delObject(id, options)` - 按 ID 删除对象

### 文件
- `readFile(adapter, fileName)` - 读取文件，例如适配器=vis.0，文件名=main/vis-views.json。此外，您可以在查询 binary=true 中设置选项以将答案作为文件而不是作为 json
- `readFile64(adapter, fileName)` - 将文件读取为 base64 字符串，例如适配器=vis.0，文件名=main/vis-views.json。此外，您可以在查询 binary=true 中设置选项以将答案作为文件而不是作为 json
- `writeFile64(adapter, fileName, data64, options)` - 写入文件，例如适配器=vis.0，文件名=main/vis-test.json，data64=eyJhIjogMX0=
- `unlink(adapter, name)` - 删除文件或文件夹
- `deleteFile(adapter, name)` - 删除文件
- `deleteFolder(adapter, name)` - 删除文件夹
- `renameFile(adapter, oldName, newName)` - 重命名文件
- `rename(adapter, oldName, newName)` - 重命名文件或文件夹
- `mkdir(adapter, dirName)` - 创建文件夹
- `readDir(adapter, dirName, options)` - 读取文件夹的内容
- `chmodFile(adapter, fileName, options)` - 改变文件模式。例如。适配器=vis.0，文件名=main/*，选项=`{“模式”：0x644}`
- `chownFile(adapter, fileName, options)` - 更改文件所有者。例如。适配器=vis.0，文件名=main/*，选项=`{“所有者”：“新所有者”，“所有者组”：“新组”}`
- `fileExists(adapter, fileName)` - 检查文件是否存在

### 管理员
- `getHostByIp(ip)` - 通过 IP 读取主机信息。例如通过本地主机
- `readLogs(host)` - 读取日志文件的文件名和大小。您可以使用 http://ipaddress:8093/<fileName> 阅读它们
- `delState(id)` - 删除状态和对象。与 delObject 相同
- `getRatings(update)` - 读取适配器评级（如在管理员中）
- `getCurrentInstance()` - 读取适配器命名空间（总是 rest-api.0）
- `checkFeatureSupported(feature)` - 检查 js-controller 是否支持该功能。
- `decrypt(encryptedText)` - 使用系统密码解密字符串
- `encrypt(plainText)` - 使用系统密码加密字符串
- `getAdapterInstances(adapterName)` - 获取“实例”类型的对象。您可以选择定义适配器名称
- `getAdapters(adapterName)` - 获取“适配器”类型的对象。您可以选择定义适配器名称
- `updateLicenses(login, password)` - 从 ioBroker.net 门户读取许可证
- `getCompactInstances()` - 读取带有简短信息的实例列表
- `getCompactAdapters()` - 使用简短信息读取已安装适配器的列表
- `getCompactInstalled(host)` - 阅读有关已安装适配器的简短信息
- `getCompactSystemConfig()` - 读取简短的系统配置
- `getCompactRepository(host)` - 读取简短的存储库
- `getCompactHosts()` - 获取有关主机的简短信息
- `addUser(user, pass)` - 添加新用户
- `delUser(user)` - 删除用户
- `addGroup(group, desc, acl)` - 创建新组
- `delGroup(group)` - 删除组
- `changePassword(user, pass)` - 更改用户密码
- `getAllObjects()` - 将所有对象读取为列表。 GUI 可以通过答案的可视化来解决问题。
- `extendObject(id, obj)` - 使用 JSON 通过 ID 修改对象。 （例如`{"common":{"enabled": true}}`）
- `getForeignObjects(pattern, type)` - 与 getObjects 相同
- `getForeignStates(pattern)` - 与 getStates 相同
- `delObjects(id, options)` - 按模式删除对象

＃＃＃ 其他
- `log(text, level[info])` - 没有答案 - 将日志条目添加到 ioBroker 日志
- `getHistory(id, options)` - 读取历史。查看选项：https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- `httpGet(url)` - 从服务器读取 URL。您可以设置 binary=true 以将答案作为文件
- `sendTo(adapterInstance, command, message)` - 向实例发送命令。例如。 adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}} `
- `listPermissions()` - 读取具有函数权限的静态信息
- `getUserPermissions()` - 使用用户权限读取对象
- `getVersion()` - 读取适配器名称和版本
- `getAdapterName()` - 读取适配器名称（总是 rest-api）

<!-- END --> <!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 0.4.0 (2022-04-26)
* (bluefox) Added socket commands

### 0.3.6 (2022-04-22)
* (bluefox) Added object creation and enumerations reading

### 0.3.5 (2022-04-22)
* (bluefox) Allowed the reading of current subscriptions

### 0.3.4 (2022-04-20)
* (bluefox) Corrected subscription

### 0.3.1 (2022-04-15)
* (bluefox) First release

### 0.1.0 (2017-09-14)
* (bluefox) initial commit

## License
Apache 2.0

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>