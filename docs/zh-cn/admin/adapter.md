---
title: 适配器
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/adapter.md
hash: svGv1TgKOa2pP8zn85C5t9Xd7FgJNy5dfaEK2af4S84=
---
# 适配器选项卡
可用和已安装的适配器在此处显示和管理。

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。只需将鼠标放在图标上一会儿。

![管理员选项卡](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### 1 - 切换视图
此按钮可用于在平铺视图和表格视图之间切换（切换功能）

### 2 - 更新广告
每次重新启动时，它都会自动检查更新。此按钮可用于手动开始搜索或触发页面刷新。

### 3 - 仅显示已安装的适配器
选择此图标时，仅显示已安装实例的适配器（切换功能）

### 4 - 查看带有更新的适配器
当您选择此图标时，仅显示更新可用的适配器（切换功能）。可更新适配器的磁贴有一个绿色标题。如果适配器没有更新，则会显示相应的消息。

此外，标题栏中还会出现另一个图标：

![管理员选项卡](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

通过单击此图标 (8)，将更新所有可用的适配器。

### 5 - 从自定义 URL 安装适配器
!> **警告：使用此选项可能会导致 ioBroker 安装出现问题。** GitHub 适配器可能仍在开发中，因此可能无法正常工作！这些只能在生产系统中谨慎使用。建议等待稳定版！

可以使用 Octocat 图标从它们自己的路径（URL 或文件路径）或 GitHub 的预发布版本安装适配器。

单击此图标后，将打开相应的选择窗口：

![从 GitHub 安装](../../de/admin/media/ADMIN_Adapter_GitHub.png)

在 ***FROM GITHUB*** 选项卡下，只需从下拉菜单中选择所需的适配器并安装最新的预发行版。

如果选择了 ***ANY*** 选项卡，则可以在该字段中输入任何文件路径或任何 URL（例如，外部适配器开发人员的 URL）并安装相应的适配器。

### 6 - 打开专家模式
专家模式还可以安装旧版本的适配器。如果选择此按钮 (9)，则磁贴中会出现一个附加图标，可用于安装早期版本。

![安装其他版本](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

### 7 - 过滤器
在这里，您可以使用过滤词来搜索特定的适配器。