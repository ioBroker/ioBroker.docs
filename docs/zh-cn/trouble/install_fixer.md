---
title: ioBroker 安装修复程序
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/install_fixer.md
hash: vuNKANk55QX5AJTCYrnPDujE/RNVWMlxzXnLfRIHcSI=
---
# 修复ioBroker安装的用户权限问题
Installation Fixer 解决了 ioBroker 安装的用户权限问题。
在 2018 年底，尤其是 2019 年 1 月，@AlCalzone 彻底修改了 ioBroker 安装程序，因此从 2019 年 2 月开始的当前版本中，所有权利问题都已成为过去。 ioBroker 不再以“root”身份运行，而是在一个单独的用户下运行，该用户被允许为当前的 ioBroker 适配器执行他需要能够执行的所有操作。
因此，对于所有新安装来说一切都很好。

但是，如果有人更早安装了 ioBroker 怎么办？他仍然以root身份运行？还是在新安装程序的第一天？ **感谢@AlCalzone，我们现在也有一个解决方案：安装修复程序**

使用命令，将 /opt/iobroker 中的现有安装提升到与当前新安装相同的级别。以后也可以反复使用该脚本来更新这方面的安装。
重要提示：此脚本不会更新 nodejs、npm、js-controller 或任何适配器。仅编辑系统权限等。
尝试并在[讨论线程](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)中提供反馈

!> [请注意]：Docker 下的应用程序应该不是必需的，因为无论如何一切都以 root 身份运行，由于缺乏明确的经验和反馈，我们目前建议不要使用应用程序。如果有人想尝试并提供反馈：使用完全由您自担风险。一定要事先做好备份，知道自己在做什么！

请注意此线程中的常见问题解答帖子！

与安装程序一样，要执行的脚本是从 GitHub 加载的，因此始终是最新的。命令是：

```
curl -sL https://iobroker.net/fix.sh | bash -
```

＃＃常问问题
**您必须使用修复程序吗？** 我们建议更新安装并因此使用修复程序。这为您提供了一个安装，如果有问题，我们也可以支持。使用 npm 5 及更高版本时，使用 root 或 sudo 以及新的安装程序会出现越来越多的问题，因此基于 Linux 的系统的修复程序会考虑到这一点并尝试防止这些问题。安全方面也不应该被忽视。

**我在哪里可以看到修复程序在做什么？** 我们尽量使安装程序和修复程序保持最新。
两者都有一个变更日志。
[安装人员](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md) [固定器](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md) 否则，如果您对 shell 编程有所了解，请直接观看脚本 :-)

**运行修复程序的最佳用户是什么？** 这并不重要。最好以普通用户的身份运行它，然后您可以使用它。

**运行修复程序的最佳目录是什么？** 也没关系。当前的修复程序（2019-02-21）预计将安装在 /opt/iobroker

**修复程序适用于哪些操作系统？** 适用于所有基于 Linux 的系统。 Windows 不在此处介绍。

**修复程序到底做了什么？** 修复程序创建一个 ioBroker 用户，为该用户正确设置文件和目录权限，以及一些 sudo 权限以及在没有 root 的情况下使用 ioBroker 和 npm 所需的一切。

**如果有更新，是否可以多次运行修复程序？** 可以，这明确旨在使安装程序随着安装程序的发展保持最新。

**是否有特殊情况需要额外运行修复程序？**修复程序在使用redis和备份时也处理特殊权限。如果应用程序中已经安装了 Redis，则一切都会自动正确设置。如果稍后安装 Redis，则修复程序会正确设置所有内容。

**安装fixer也可以在Docker下使用吗？**目前经验很少，结果很参差不齐。因此，我们目前建议不要使用它，因为容器中的所有内容通常都以 root 身份运行，因此无论如何都无关紧要。如果您仍然喜欢它并想提供反馈：请自行承担使用 Docker 的风险，并且永远不要在没有备份和知道您在做什么的情况下使用它！

**如果我不确定出了什么问题，我该怎么办？** 你可以简单地事先复制 ioBroker 目录，除了权限之外什么都不会改变。