---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/upgrade-guide.md
title: 升级指南
hash: +lmDvpRkMN/aKqmxGEl5xOSrI02XbHtP6/PB3GpLFDc=
---
# 升级指南
## 脚本文件系统镜像的禁止目录
**自 JavaScript 适配器 v5.5.0 起**，以下位置（相对于 ioBroker 基目录，通常为 `/opt/iobroker`）不允许使用：

* ioBroker 基目录本身以及上面的任何路径！
* `./iobroker-data` 本身，自定义子目录（选择一个不与任何适配器重叠的名称！）
* `./iobroker-data/backup-objects` 或以下任何内容
* `./iobroker-data/files` 或以下任何内容
* `./iobroker-data/backitup` 或以下任何内容
* `./backups` 或者下面的任何内容
* `./node_modules` 或下面的任何内容
* `./log` 或者下面的任何内容

脚本文件系统镜像将把脚本的所有源文件存储在您的文件系统中，并允许您在 Web 编辑器之外使用您最喜欢的脚本编辑器编辑文件。所有更改都会双向同步。

启用脚本文件系统镜像时，请确保创建一个**专用的新目录**，并且**不要**使用包含其他内容的现有目录。还请确保没有其他脚本或进程更改所提供目录中的文件，以防止出现访问问题。
任何位置都需要由“iobroker”用户可写！

## 请求 httpGet
**自 JavaScript 适配器 v8.0.0 起**，`request` 包已弃用，在脚本中使用它会引发警告。JavaScript 适配器需要在某个时候删除该包。为了使迁移尽可能简单，沙盒提供了请求 HTTP 资源的新功能。

### JavaScript
示例代码：

```js
const request = require('request');

schedule('*/30 * * * *', () => {
    const options = ;

    request({ url: 'https://api.forecast.solar/estimate/', method: 'GET' }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const resObj = JSON.parse(body);

            // ...
        }
    });
});
```

移民：

1. 删除 `request` 包的导入
2. 使用原生方法 `httpGet`（详情见文档）
3.更新回调函数参数
4. 将“body”替换为“response.data”

```js
schedule('*/30 * * * *', () => {
    httpGet('https://api.forecast.solar/estimate/', (err, response) => {
        if (err) {
            console.error(err);
        } else if (response.statusCode == 200) {
            const resObj = JSON.parse(response.data);

            // ...
        }
    });
});
```

### 块状
- `request` 块仅支持 HTTP GET（不支持其他方法） - 用 `http (GET)` 替换该块
- 需要创建一个名为“result”的自定义变量才能使用响应。现在不再需要这样做了。删除该变量并使用专用块来处理结果参数（如在触发器块中）。

![Blockly 请求 httpGet](../../../en/adapterref/iobroker.javascript/img/upgrade-guide/request-httpGet.png)