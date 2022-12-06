---
title: 什么是存储库？
lastChanged: 23.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/repositories.md
hash: oJPZN8wqKxzb10+8ew/iEJYEGY3P8rO/9VK6WmCvORU=
---
存储库是软件程序的中央存储库。

可以通过 ioBroker 管理界面显示和安装/更新的适配器通过中央存储库（存储库）进行管理。
默认情况下，ioBroker 在安装后配置，以便访问“稳定”存储库并提供存储在那里的适配器以供安装。

ioBroker 中有两个可用的存储库：

- **稳定**：在此存储库中，适配器在已经过测试的版本中可用，因此可以在生产系统上使用
- **beta**：此存储库中提供了适配器版本，这些版本当前处于测试阶段 (!)，并且可能仍包含一些错误。 beta 存储库以前称为 latest，由于名称的用途不是很清楚，因此将其从 latest 重命名为 beta。

?> 基本上，稳定存储库应该***始终***用于 ioBroker 的生产安装。 beta 存储库包含仍然包含错误并可能影响整个系统的版本。

## 仓库选择
通过扳手打开系统设置中的基本设置：

![](../../de/basics/media/Repository_IconBasicSettings.png)

![](../../de/basics/media/Repository_BasicsSettingsDefaultPath.png)

(1) 在 Repositories 选项卡中，可以通过激活“Active”列中的相应复选框来选择所需的存储库。

(2) 该按钮将标准存储库稳定和测试版的路径重置为标准路径。注意：此按钮还会删除手动添加的存储库

(3) 如果存储库在第一次导入后被识别为“稳定”存储库，则“稳定”列中的复选框会自动激活

稳定版和测试版存储库的默认路径是：

- 稳定 - 链接到存储库 http://download.iobroker.net/sources-dist.json
- 测试版 - 链接到存储库 http://download.iobroker.net/sources-dist-latest.json

如果选择了 beta 存储库，适配器概述中会出现相应的警告：

![](../../de/basics/media/Repository_AdapterRepInfo.png)

## 如果我需要 beta 存储库中的适配器，我该怎么办？
过去，这意味着在 ioBroker 中将存储库从稳定版切换到测试版，安装一个适配器，然后再切换回来。后者通常半途而废。

从 Admin 5 开始，无需更改存储库就方便多了！

- 激活专家模式
- 在“适配器”菜单中，转到“从您自己的 URL 安装”(GitHub) 按钮并切换到第一个选项卡“从 NPM”。
- 在“选择适配器”字段中，现在可以输入/选择要安装的所需适配器

这样一来，无需切换存储库即可安装最新的测试版。

![](../../de/basics/media/Repository_AdapterInstallNpm.png)

重要说明：只有在开发人员明确要求您这样做时（例如，作为 alpha 测试、错误修复等的一部分），才从 Github 安装适配器。直接从 Github 安装的适配器版本正在开发中，在此期间可能无法使用。

## 适配器如何进入测试版或稳定存储库？
早在适配器准备好通过管理界面安装到 ioBroker 之前，开发人员就提交了包含在存储库中的请求。发生这种情况时，有经验的开发人员会查看新的适配器源代码，并就新适配器可以包含在存储库中之前需要处理的项目向提出请求的开发人员提供反馈。

一个新的适配器首先在 beta 存储库中可用，然后可以由（beta）测试人员进行广泛测试。当测试阶段完成并修复报告的错误后，适配器的版本将在稳定存储库中可用。

在对适配器进行功能更改后，这通常只会在测试版存储库中再次可用以进行测试，直到测试阶段结束后为稳定存储库发布该版本。