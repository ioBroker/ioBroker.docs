---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rest-api/README.md
title: REST-API 适配器
hash: BVfjhb1Gx9apADa3SuQvZnxWh9WASBG6M7ZIn4QunPY=
---
![标识](../../../en/adapterref/iobroker.rest-api/admin/rest-api.png)

![安装数量](http://iobroker.live/badges/rest-api-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rest-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rest-api.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.rest-api.svg?branch=master)
![新公共管理](https://nodei.co/npm/iobroker.rest-api.png?downloads=true)

# REST-API 适配器
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

这是一个 RESTFul 接口，用于从 ioBroker 读取对象和状态，并通过 HTTP Get/Post 请求写入/控制状态。

此适配器的用途与 simple-api 类似。但此适配器支持长轮询和用于订阅的 URL 钩子。

它有一个有用的 Web 界面来处理请求：

![截屏](../../../en/adapterref/iobroker.rest-api/img/screen.png)

＃＃ 用法
在浏览器中调用`http://ipaddress:8093/`并使用 Swagger UI 请求和修改状态和对象。

一些请求示例：

- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal` - 以 JSON 格式读取状态
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal/plain` - 以字符串形式读取状态（仅值）
- `http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?value=5` - 使用 GET 写入状态（仅用于与 simple-api 的向后兼容）
- `http://ipaddress:8093/v1/sendto/javascript.0?message=toScript&data={"message":"MESSAGE","data":"FROM REST-API"}` - 向脚本 `scriptName` 中的 `javascript.0` 发送消息

＃＃＃ 验证
要启用身份验证，您必须在配置对话框中设置`Authentication`选项。

支持三种类型的身份验证：

- 查询中的凭证
- 基本身份验证
- OAuth2（承载者）

为了在查询中进行身份验证，您必须在查询中设置`user`和`pass`，如下所示：

```http
http://ipaddress:8093/v1/state/system.adapter.rest-api.0.memHeapTotal?user=admin&pass=admin
```

对于基本身份验证，您必须将`Authorization` 标头设置为值`Basic base64(user:pass)`。

对于 Oauth2 身份验证，您必须将 `Authorization` 标头设置为值 `Bearer <AccessToken>`。

可以使用 HTTP 请求检索访问令牌，例如：

```http
http://ipaddress:8093/oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker
```

答案是这样的：

```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```

## 订阅状态或对象的变化
您的应用程序可以通过状态或对象的每次变化获得通知。

为此，您的应用程序必须提供 HTTP(S) 端点来接受更新。

node.js 中的示例请参见此处[demoNodeClient.js](examples/demoNodeClient.js)

## 长轮询
该适配器支持通过长轮询订阅数据变化。

浏览器示例可在此处找到：[demoNodeClient.js](examples/demoBrowserClient.html)

## Web 扩展
此适配器可以作为 Web 扩展程序运行。在这种情况下，路径位于 `http://ipaddress:8082/rest` 下

＃＃ 注意
- `POST` 始终用于创建资源（无论是否重复）
- `PUT` 用于检查资源是否存在则更新，否则创建新资源
- `PATCH` 总是用于更新资源

## 命令
此外，您可以通过特殊接口执行许多套接字命令：

`http://ipaddress:8093/v1/command/<commandName>?arg1=Value2&arg2=Value2`

例如。

- `http://ipaddress:8093/v1/command/getState?id=system.adapter.admin.0.alive` - 读取 `system.adapter.admin.0.alive` 的状态
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png` - 读取文件 `admin.admin/admin.png` 作为 JSON 结果
- `http://ipaddress:8093/v1/command/readFile?adapter=admin.admin&fileName=admin.png?binary` - 将文件 `admin.admin/admin.png` 读取为文件
- `http://ipaddress:8093/v1/command/extendObject?id=system.adapter.admin.0?obj={"common":{"enabled":true}}` - 重新启动管理员

您也可以使用 POST 方法请求所有命令。因为主体必须是带有参数的对象。例如：

```bash
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

### 州
- `getStates(pattern)` - 获取模式的状态列表（例如，system.adapter.admin.0.*）。GUI 可能无法通过可视化答案解决问题。
- `getForeignStates(pattern)` - 与 getStates 相同
- `getState(id)` - 通过 ID 获取状态值
- `setState(id, state)` - 使用 JSON 对象设置状态值（例如 `{"val": 1, "ack": true}`）
- `getBinaryState(id)` - 通过 ID 获取二进制状态
- `setBinaryState(id, base64)` - 通过 ID 设置二进制状态

### 对象
- `getObject(id)` - 通过 ID 获取对象
- `getObjects(list)` - 获取所有状态和房间。GUI 可能无法通过可视化答案解决问题。
- `getObjectView(design, search, params)` - 获取特定对象，例如 design=system, search=state, params=`{"startkey": "system.adapter.admin.", "endkey": "system.adapter.admin.\u9999"}`
- `setObject(id, obj)` - 使用 JSON 对象设置对象（例如 `{"common": {"type": "boolean"}, "native": {}, "type": "state"}`）
- `delObject(id, options)` - 根据 ID 删除对象

### 文件
- `readFile(adapter, fileName)` - 读取文件，例如 adapter=vis.0, fileName=main/vis-views.json。此外，您还可以设置查询中的选项 binary=true，以文件形式而非 JSON 形式获取答案。
- `readFile64(adapter, fileName)` - 将文件读取为 base64 字符串，例如 adapter=vis.0, fileName=main/vis-views.json。此外，您还可以在查询中设置 binary=true 选项，以文件形式而非 JSON 形式获取答案。
- `writeFile64(adapter, fileName, data64, options)` - 写入文件，例如 adapter=vis.0, fileName=main/vis-test.json, data64=eyJhIjogMX0=
- `unlink(adapter, name)` - 删除文件或文件夹
- `deleteFile(adapter, name)` - 删除文件
- `deleteFolder(adapter, name)` - 删除文件夹
- `renameFile(adapter, oldName, newName)` - 重命名文件
- `rename(adapter, oldName, newName)` - 重命名文件或文件夹
- `mkdir(adapter, dirName)` - 创建文件夹
- `readDir(adapter, dirName, options)` - 读取文件夹内容
- `chmodFile(adapter, fileName, options)` - 更改文件模式。例如：adapter=vis.0, fileName=main/*, options = `{"mode": 0x644}`
- `chownFile(adapter, fileName, options)` - 更改文件所有者。例如：adapter=vis.0, fileName=main/*, options = `{"owner": "newOwner", "ownerGroup": "newgroup"}`
- `fileExists(adapter, fileName)` - 检查文件是否存在

### 管理员
- `getHostByIp(ip)` - 通过 IP 读取主机信息。例如通过 localhost
- `readLogs(host)` - 读取日志文件的文件名和大小。您可以使用 http://ipaddress:8093/<fileName> 读取它们。
- `delState(id)` - 删除状态和对象。与 delObject 相同
- `getRatings(update)` - 读取适配器评级（与管理员相同）
- `getCurrentInstance()` - 读取适配器命名空间（始终为 rest-api.0）
- `decrypt(encryptedText)` - 使用系统机密解密字符串
- `encrypt(plainText)` - 使用系统机密加密字符串
- `getAdapters(adapterName)` - 获取“适配器”类型的对象。你可以自定义适配器名称。
- `updateLicenses(login, password)` - 从 ioBroker.net 门户读取许可证
- `getCompactInstances()` - 读取包含简短信息的实例列表
- `getCompactAdapters()` - 读取已安装适配器的列表及其简短信息
- `getCompactInstalled(host)` - 读取已安装适配器的简短信息
- `getCompactSystemConfig()` - 读取简短的系统配置
-`getCompactSystemRepositories()`
- `getCompactRepository(host)` - 读取短存储库
- `getCompactHosts()` - 获取主机的简短信息
- `addUser(user, pass)` - 添加新用户
- `delUser(user)` - 删除用户
- `addGroup(group, desc, acl)` - 创建新组
- `delGroup(group)` - 删除组
- `changePassword(user, pass)` - 更改用户密码
- `getAllObjects()` - 将所有对象读取为列表。GUI 可能会因答案的可视化而出现问题。
- `extendObject(id, obj)` - 使用 JSON 通过 ID 修改对象。（例如 `{"common":{"enabled": true}}`）
- `getForeignObjects(pattern, type)` - 与 getObjects 相同
- `delObjects(id, options)` - 根据模式删除对象

＃＃＃ 其他的
-`updateTokenExpiration（accessToken）`
- `log(text, level[info])` - 无答案 - 将日志条目添加到 ioBroker 日志
- `checkFeatureSupported(feature)` - 检查 js-controller 是否支持该功能。
- `getHistory(id, options)` - 读取历史记录。更多选项请参见：https://github.com/ioBroker/ioBroker.history/blob/master/docs/en/README.md#access-values-from-javascript-adapter
- `httpGet(url)` - 从服务器读取 URL。您可以设置 binary=true 以文件形式获取答案。
- `sendTo(adapterInstance, command, message)` - 向实例发送命令。例如：adapterInstance=history.0, command=getHistory, message=`{"id": "system.adapter.admin.0.memRss","options": {"aggregate": "onchange", "addId": true}}`
- `listPermissions()` - 读取具有函数权限的静态信息
- `getUserPermissions()` - 读取具有用户权限的对象
- `getVersion()` - 读取适配器名称和版本
- `getAdapterName()` - 读取适配器名称（始终为 rest-api）
-`客户端订阅（目标实例、消息类型、数据）`
- `getAdapterInstances(adapterName)` - 获取“实例”类型的对象。你可以自定义适配器名称

<!-- 结束 -->

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### 3.0.1 (2025-05-21)
* (@GermanBluefox) Corrected the web extension

### 3.0.0 (2025-04-27)
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Removed binary states

### 2.1.0 (2025-02-27)
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Replaced icons with SVG

### 2.0.3 (2024-07-13)
* (jkuenemund) Changed response for the endpoint get states to the dictionary in swagger

### 2.0.1 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`
* (theshengfui) Fixed history requests
* (bluefox) Minimum required node.js version is 16

### 1.1.0 (2023-05-03)
* (bluefox) Converting of the setState values to the according type
* (bluefox) Implemented file operations

### 1.0.5 (2023-03-27)
* (Apollon77) Prepare for future js-controller versions

### 1.0.4 (2022-08-31)
* (bluefox) Check if the port is occupied only on defined interface

### 1.0.2 (2022-07-27)
* (bluefox) Implemented binary read/write operations

### 1.0.1 (2022-07-27)
* (bluefox) Increased the max size of body to 100Mb

### 1.0.0 (2022-05-19)
* (bluefox) Final release

### 0.6.0 (2022-05-18)
* (bluefox) Added sendTo path

### 0.5.0 (2022-05-17)
* (bluefox) Some access errors were corrected

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

Copyright (c) 2017-2025 bluefox <dogafox@gmail.com>