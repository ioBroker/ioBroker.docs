---
title: 管理适配器
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/adapter.md
hash: b14VKmtsTBtQx6FeYrZ5aIVC3KjWqCr596Aq978bx2M=
---
# 使用适配器的基础知识
在 ioBroker 上安装适配器和实例分几个阶段进行。

这些术语经常被混淆。本页旨在通过解释 ioBroker 最重要的管理任务应该如何执行以及它们背后的内容来阐明一些观点。

## 管理任务
### 安装新适配器
实际安装将使用适配器所需的数据从服务器加载到本地主机。此数据在安装时保持“最新”状态，直到更新为止。

**关于管理员**

此功能无法通过管理员使用，它会在创建实例（实例化）时自动添加前缀。

**通过控制台**

``iobroker install AdapterName``

### 创建适配器实例
为了能够在 ioBroker 中使用适配器，您需要该适配器的一个（或多个）实例。这些实例是通过实例选项卡在管理员中配置的。

**关于管理员**

如果要创建适配器的实例，可以通过单击左下角相应适配器磁贴中“管理”选项卡中的 (+) 来执行此操作。

![创建实例](../../de/tutorial/media/Instance_new.gif)

**通过控制台**

``iobroker add AdapterName``

如果主机上还没有适配器所需的文件，则会首先自动执行 iobroker install AdapterName。只有这样才能创建实例。

***通过 npm 通过控制台（仅供专家使用！）***

``cd /opt/iobroker``

``npm install iobroker.AdapterName``

**只有在所有其他方法因任何原因而失败时才应使用此版本。**

<span style="color:red">危险！在较新的安装上，直接使用 npm install 会导致安装后权限问题或失败。推荐使用iobroker命令！！</span>

### 升级适配器
如果有新版本的适配器，可以对其进行更新。适配器也需要另一个适配器的特定版本。因此，始终使所有适配器保持最新是有意义的

**关于管理员**

如果升级了适配器，则相应磁贴的标题栏将变为绿色。然后，新版本号以绿色显示在“可用版本”下的磁贴上，左侧的升级图标显示。如果您想立即升级此适配器，请单击此图标。

然后在后台运行两个进程，即实际升级适配器文件，然后将文件上传到实例。

![适配器更新](../../de/tutorial/media/Adapter_upgrade.gif)

**通过控制台**

``iobroker upgrade AdapterName``

### 上传适配器文件
此功能仅在特殊情况下需要。如果使用上述过程，则不需要此功能。

仅当知道自己在做什么的有经验的用户自己更改文件或从 Github 加载 beta 版本时，才需要此功能

通过管理员 要执行此操作，必须在“管理员”选项卡中激活专家模式。然后在磁贴中会出现更多图标。向上的箭头（右起第三个图标）执行此上传。

![适配器更新](../../de/tutorial/media/Adapter_upload.gif)

**通过控制台**

``iobroker upload AdapterName``

### 降级适配器
如果新版本出现问题，您可以再次降级适配器。

**关于管理员**

要降级，您首先必须切换到专家模式，然后调用可用版本列表：

![适配器更新](../../de/tutorial/media/Adapter_downgrade.gif)

此列表显示了开发人员为此功能发布的所有版本。

请在此处单击所需的版本。

**通过控制台**

``iobroker install AdapterName@ver.si.on``

其中 ***AdapterName*** 是 iobroker 更新中列出的所需适配器的名称，***ver.si.on*** 是格式正确的版本号。

***通过 npm 通过控制台（仅供专家使用！）***

``cd /opt/iobroker``

``npm install iobroker.AdapterName@ver.si.on``

**只有在所有其他方法因任何原因而失败时才应使用此版本。**

<span style="color:red">危险！在较新的安装中，直接使用 npm install 会导致安装后权限问题或失败。推荐使用iobroker命令！！</span>

##附加重要信息
### Admin 中的适配器列表
事实上，在所选存储库（主要设置）中只有一个可用的适配器列表。此处显示的内容尚未在主机上。

此列表每天 02:00 左右在服务器上更新，并在调用管理员时在线更新。如果没有与服务器的连接，无论出于何种原因，此列表仅包含已安装或根本无法加载的适配器。

### 不同的安装源
关于为什么人们谈论特定版本但不提供更新的问题不断出现。因此，这里应该再次说明其背景：

**适配器版本分为三层**

* 存储库稳定，一切稳定且经过测试
* 存储库最新，尚未完全测试
* Github，开发者，部分<span style="color:red">测试版甚至未完成</span>

版本</span>

如果没有太大变化，这些阶段都可以具有相同的版本，但在各个存储库或 Github 中也可能存在重大跳跃。

**您希望从中提供适配器版本的存储库**在子页面[主要设置](../admin/settings.md#Haupteinstellungen)的系统设置中指定。

可用的存储库列在子页面[存储库](../admin/settings.md#Verwahrungsorte)中。

**来自 Github 的开发者或测试版**通过 [八角猫图标](../admin/adapter.md#die-icons-im-einzelnen) #5 安装。

可以简单地在 ***Github*** 下拉菜单中，或者通过在 ***any*** 选项卡下输入 Github 存储库的地址。对于“外部”适配器开发人员尤其如此。

<span style="color:red">**只有在与开发者协商后才能安装 GitHub。**</span>

### 从 Github 安装
（<span style="color: red">仅供专家参考！</span> ）

Github 只能由专家安装。这里只有测试版，或者更糟糕的是，未完成的版本。<span style="color:red">他们的安装可能会破坏整个 ioBroker 安装！</span>

如果更新是通过 GitHub（Octocat 图标）进行的（或由存储库维护者建议通过论坛进行故障排除），则新文件仅保存在本地，但不提供给实例。因此，对于 1.5 以下的 js-controller 版本，必须手动进行上传。

为此，必须在“管理员”选项卡中激活专家模式。然后在磁贴中会出现更多图标。向上的箭头（右起第三个图标）执行此上传。