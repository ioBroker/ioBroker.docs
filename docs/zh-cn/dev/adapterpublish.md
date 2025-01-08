---
title: 发布
lastChanged: 21.01.2020
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterpublish.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: G9Qg1a+J3PRWRwDWflz0rxRNU5K80XmOyeE6fJZlKLI=
---
# 发布适配器
在考虑发布适配器之前，应在 [论坛测试帖](https://forum.iobroker.net/category/91/tester) 中提供该适配器进行测试。
如果测试成功并且适配器稳定，则应暂时将其添加到最新的存储库中。

如果适配器在某个版本号稳定运行，欢迎您将其转移到稳定存储库。这需要开发者自己结合用户反馈进行评估。

***更多当前要求可以在这里找到：*** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

## 最新存储库要求
0. 使用 [https://adapter-check.iobroker.in/](https://adapter-check.iobroker.in/) 测试适配器存储库。

1. 适配器的 GitHub 存储库在 ioBroker 中应有大写 B，而在 package.json 中必须为小写，因为 ``npm`` 不允许使用大写字母。

2. io-package.json 中的标题不应包含“ioBroker” 或“Adapter” 一词。

3. io-package.json（通用）中的“title”属性是适配器的英文简称。而“titleLang”包含“title”属性的翻译。 （扩展名 Lang 代表语言）

4. 适配器应包含 README.md 文件形式的说明。这至少应该有英文版本。也欢迎其他语言。这个[示例](https://github.com/foxriver76/ioBroker.denon)可以作为建议。

5. 适配器需要许可证。均位于 io-package.json 和 Github 存储库中的单独 [文件](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) 中。

   io-package.json 的示例：

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6、“www”目录和“widget”目录如果不用则应删除。

7. 在 io-package.json 中，应在 common 下创建一个 `type` 属性。为此，应从此[列表]（#adaptercategories）中指定最合适的类别。

8. 在 io-package.json 中，应在 common 下创建 `connectionType` 和 `dataSource` 属性。为此，应从此[列表]（#Adapter 连接类型）中指定最合适的连接类别。

9. 适配器创建的状态应该在 common 下具有其[角色](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles) `role` 的有效信息。

应避免使用角色`state`。

10. 适配器应使用模板中指定的测试。为此，可以将 Github 帐户链接到 Appveyor（Windows 测试）和 Travis CI（Linux 和 Mac OS 测试），并注册相应的存储库进行测试。

这两个持续集成工具已被证明适合 ioBroker 项目，并且对公共 Github 存储库免费。

欢迎开发者扩大测试范围。

11. 在 io-package.json 中，必须在 common 下至少为 `authors` 属性创建一个条目。

还必须在 package.json 中填写属性`author`。
或者，也可以通过使用 package.json 中的属性 `contributors` 为 npm 存储多个作者。

12. 适配器必须作为 npm 包提供。更多信息可以在[此处](https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm)找到。

13、需要在npm上添加ioBroker组织。即使开发人员由于时间或其他原因无法再维护包，这对于实现包的长期维护也是必要的。

更多信息请参见[这里](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet)。

## 稳定存储库要求
1. 适配器已成功添加到最新存储库
2. 该适配器有一个[论坛测试线程](https://forum.iobroker.net/viewforum.php?f=36)，其中已经给出了用户反馈。
3. 应实现发现功能。这是[Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery)中的一个功能，

自动检测用户是否可以使用适配器的实例。
为此，必须在 [发现适配器](https://github.com/ioBroker/ioBroker.discovery) 存储库上发出拉取请求。

## 将适配器添加到官方存储库
1. 应访问[官方 Github 存储库](https://github.com/ioBroker/ioBroker.repositories)，并根据存储库发出包含以下内容的拉取请求。

2. 请在现有适配器之间按字母顺序正确排列适配器。

3. 包含在稳定存储库中时必须声明版本号。随着适配器的进一步开发，必须对此进行更新。

4. 适配器应在 io-package.json 中设置列表属性“docs”，指示可以在相应语言中找到说明的位置。

语言被指定为键，Markdown 文件的路径被指定为值。
英文说明是强制性的（紧急情况下可以参考标准README）。德语说明也是可取的，因为大多数用户都说德语，但这是可选的。
详细的说明可以节省开发者在论坛上的大量时间。
可以在 [这里](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md) 中找到示例。

   例子：

```json
{
  "common": {
     "docs": {
         "de": "docs/de/README.md"
     }
  }
}
```

＃＃＃ 最新的
必须编辑文件`sources-dist.json`：

例子：

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

`published` 日期代表首次发布日期，不应更改。

＃＃＃ 稳定的
必须编辑文件`sources-dist-stable.json`：

例子：

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "version": "2.0.7",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

`published` 日期代表首次发布日期，不应更改。

## 适配器版本管理
适配器的当前版本号在 io-package.json 和 package.json 中指定。
两条信息必须匹配。版本号由两个点分成三部分。

```json
"version": "1.7.6"
```

第一部分（从左到右）代表 `Major Part`，第二部分代表 `minor` 部分，最后一部分代表 `micro` 部分。
版本号应根据以下列表增加：

- **micro**：仅修复了错误
- **次要**：已添加功能，但该版本与以前的版本兼容
- **主要**：主要更改不再提供与旧版本的向后兼容性

`news` 属性还应在 io-package.json 中维护。
这允许用户通过管理界面安装任何列出的版本（假设它已发布在 npm 上）。
版本号和更改应存储在这里。
可以使用任何支持的语言记录更改，并且至少应使用英语记录。

例子：

```json
"news": {
    "1.7.6": {
        "en": "Configuration dialog was corrected",
        "de": "Konfigurationsdialog wurde korrigiert",
        "ru": "Диалог конфигурации был исправлен",
        "pt": "A caixa de diálogo de configuração foi corrigida",
        "nl": "Configuratiedialoog is gecorrigeerd",
        "fr": "La boîte de dialogue de configuration a été corrigée",
        "it": "La finestra di configurazione è stata corretta",
        "es": "Se corrigió el diálogo de configuración",
        "pl": "Okno dialogowe konfiguracji zostało poprawione"
    },
    "1.7.5": {
        "en": "The roles were tuned",
        "de": "Die Rollen waren abgestimmt",
        "ru": "Роли были настроены",
        "pt": "Os papéis foram afinados",
        "nl": "De rollen zijn afgestemd",
        "fr": "Les rôles ont été réglés",
        "it": "I ruoli erano sintonizzati",
        "es": "Los roles fueron sintonizados",
        "pl": "Role zostały dostrojone"
    }
}
```

## 适配器类别
- `警报` - 安全系统
- “气候控制” - 空调系统、空气过滤器、加热器等
- `通信` - 为其他适配器提供数据，例如B.通过休息
- `日期和时间` - 例如B、日历
- “能源” - 电力监控、太阳能系统、逆变器等等。
- `计量` - 其他测量系统（例如水、天然气、石油）
- “花园” - 例如例如割草机、喷水灭火系统
- `general` - 通用适配器，例如管理、Web、发现
- `geoposition` - 物体或人的地理定位
- `硬件` - 各种多功能硬件，如Arduino、ESP、蓝牙等
- “健康” - 血压、心跳、体重……
-“家用”——厨房用具、吸尘器等。
- “基础设施” - 网络、NAS、打印机、电话
- `iot-systems` - 其他智能家居系统（硬件和软件）
- `照明` - 照明
- `逻辑` - 规则、脚本、解析器等。
- `messaging` - 用于发送和接收消息的适配器，例如例如通过电子邮件、电报...
- `misc-data` - 数据导出和导入、货币转换器等。
- “多媒体” - 电视、AVR、盒子、语音助手等。
- `网络` - Ping、网络发现、UPnP、...
- `protocols` - 通信协议，例如例如：MQTT
- `存储` - 日志记录、数据存储，例如B.关系数据库，...
- `utility` - 支持适配器，例如： B.备份
- `车辆` - 汽车
- `可视化` - 可视化适配器，如 vis 等。
- `visualization-icons` - 可视化图标
- `可视化小部件` - iobroker.vis 小部件
- `天气` - 天气信息、空气质量、环境信息

## 适配器连接类型
将 `io-package.json` 的 `common` 部分中的 `connectionType` 定义为：

- `local` - 提供与设备或集线器的直接通信。
- “云” - 该设备的集成是通过云完成的，需要有效的互联网连接

将 `common` 中的 `dataSource` 定义为：

- `poll` - 轮询状态意味着稍后可能会注意到更新。
- `push` - 当新状态可用时，ioBroker 将收到通知。
- `假设` - 无法确定设备的状态。 ioBroker 根据最后一个 ioBroker 命令获取状态。