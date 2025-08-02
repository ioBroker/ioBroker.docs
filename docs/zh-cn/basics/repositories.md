---
title: 什么是存储库？
lastChanged: 23.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/repositories.md
hash: IzW9bZryoELmq+VV6xs1s9c+RUIKf/FwJo2BN75kEvg=
---
存储库是软件程序的中央存储位置。

可以通过 ioBroker 管理界面查看和安装/更新的适配器通过中央存储位置（存储库）进行管理。
默认情况下，安装后，ioBroker 会进行配置，以便访问“稳定”存储库并提供存储在那里的适配器以供安装。

ioBroker 中有两个可用的存储库：

- **稳定**：在此存储库中，适配器在已经过测试的版本中可用，因此可以在生产系统上使用
- **beta**：此存储库包含当前处于测试阶段（！）的适配器版本，并且可能仍包含多个错误。 Beta 存储库以前称为“latest”，但由于名称中的用途并不明确，因此将其从“latest”重命名为“beta”。

?> 基本上，稳定存储库应该***始终*** 用于 ioBroker 的高效安装。 Beta 存储库包含的版本仍然存在错误，并且可能会影响整个系统。

## 存储库选择
使用扳手打开系统设置中的基本设置：

![](../../de/basics/media/Repository_IconBasicSettings.png)

![](../../de/basics/media/Repository_BasicsSettingsDefaultPath.png)

(1) 在“存储库”选项卡中，可以通过激活“活动”列中相应的复选框来选择所需的存储库。

(2) 使用 按钮，标准存储库 stable 和 beta 的路径将重置为标准路径。注意：此按钮还会删除手动添加的存储库

(3) 在“稳定”列中，如果存储库在第一次读取后被识别为“稳定”存储库，则自动激活该复选框

稳定版和测试版存储库的默认路径是：

- 稳定 - 链接到存储库 http://download.iobroker.net/sources-dist.json
- beta - 链接到存储库 http://download.iobroker.net/sources-dist-latest.json

如果选择了测试版存储库，适配器概述中将出现相应的警告：

![](../../de/basics/media/Repository_AdapterRepInfo.png)

## 如果我需要 beta 存储库中的适配器，我该怎么办？
过去，这意味着将 ioBroker 中的存储库从稳定版切换到测试版，安装一个适配器，然后再次切换回来。后者通常会半途而废。

从 Admin 5 开始，这更加方便，无需更改存储库！

- 激活专家模式
- 在“适配器”菜单中，单击“从自己的 URL 安装”(GitHub) 按钮，然后切换到第一个选项卡“从 NPM”。
- 在“选择适配器”字段中，您现在可以输入/选择应安装的所需适配器

这样您就可以安装最新的测试版，而无需更改存储库。

![](../../de/basics/media/Repository_AdapterInstallNpm.png)

重要提示：仅当开发人员明确要求您安装来自 Github 的适配器时（例如，作为 alpha 测试、错误修复等的一部分）。直接从 Github 安装的适配器版本正在开发中，因此可能暂时无法运行。

## 适配器如何进入测试版或稳定版存储库？
早在适配器可通过管理界面安装在 ioBroker 中之前，开发人员就提交了包含在存储库中的请求。一旦发生这种情况，经验丰富的开发人员就会查看新的适配器源代码，并向提出请求的开发人员提供反馈，其中包含在将新适配器包含在存储库中之前需要处理的要点。

新的适配器首先在 beta 存储库中提供，然后可以由（beta）测试人员进行广泛的测试。当测试阶段完成并且报告的错误已修复时，适配器的版本将在稳定存储库中提供。

对适配器进行功能更改后，通常只能在 beta 存储库中进行测试，直到测试阶段完成后发布稳定存储库的版本。