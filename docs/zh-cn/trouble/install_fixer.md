---
title: ioBroker 安装修复程序
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/install_fixer.md
hash: tHDEojwxIw6xJmU1S4wqOljPM1nQ4+ZV1CNRLe9Mxqc=
---
# 修复ioBroker安装的用户权限问题
安装修复程序解决了 ioBroker 安装的用户权限问题。
在 2018 年底，尤其是 2019 年 1 月，@AlCalzone 彻底修改了 ioBroker 安装程序，从 2019 年 2 月开始，所有权限问题在当前版本中都已成为过去。 ioBroker 不再以“root”身份运行，而是在其自己的用户下运行，该用户可以为当前 ioBroker 适配器执行他需要执行的所有操作。
所以所有新安装的一切都很好。

但如果有人较早安装了 ioBroker 呢？他还在以 root 身份运行吗？或者在新安装程序的最初几天？ **感谢@AlCalzone：安装修复程序，我们现在也有了解决方案**

使用命令，/opt/iobroker 中的现有安装将进入与当前新安装相同的状态。将来可以反复使用该脚本来更新这方面的安装。
重要提示：此脚本不会更新 nodejs、npm、js-controller 或任何适配器。除其他事项外，仅处理系统权限。
尝试一下并在 [讨论话题](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer) 中提供反馈

!> [请注意]：Docker 下的应用程序不是必需的，因为无论如何一切都以 root 身份运行，并且由于缺乏明确的经验和反馈，我们目前建议不要使用应用程序。如果有人想尝试并提供反馈：使用它的风险完全由您自己承担。一定要提前做好备份并知道自己在做什么！

请注意此线程中的常见问题解答帖子！

与安装程序一样，要执行的脚本是从 GitHub 加载的，因此始终是最新的。命令是：

```
curl -sL https://iobroker.net/fix.sh | bash -
```

＃＃ 常问问题
**您必须使用修复程序吗？** 我们建议更新安装，因此使用修复程序。这为您提供了安装，如果出现任何问题，我们也可以提供支持。对于 npm 5 及更高版本，使用 root 或 sudo 以及新安装程序时会出现越来越多的问题，因此基于 Linux 的系统的修复程序会考虑到这一点并尝试防止这些问题。安全方面也不容忽视。

**我在哪里可以看到修复程序的功能？** 我们尽力使安装程序和修复程序保持最新状态。
两者都有变更日志。
[安装人员](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md) [固定器](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md) 否则，如果您了解 shell 编程，请直接观看脚本:-)

**运行 Fixer 的最佳用户是什么？** 这并不重要。最好以普通用户身份运行它，然后您就可以使用它。

**哪个目录最适合运行修复程序？** 这并不重要。当前修复程序 (2019-02-21) 预计安装在 /opt/iobroker

**修复程序适用于哪些操作系统？** 适用于所有基于 Linux 的系统。这里不涉及Windows。

**修复程序到底做什么？** 修复程序创建一个 ioBroker 用户，为该用户正确设置文件和目录权限以及一些 sudo 权限以及无需 root 即可使用 ioBroker 和 npm 所需的一切。

**如果有更新，修复程序可以多次运行吗？** 是的，这是明确的目的，以便随着安装程序的进一步开发，安装程序始终保持最新状态。

**是否有特殊情况也应该执行修复程序？** 当使用redis和backitup时，修复程序还处理特殊权限。如果应用程序中已安装 Redis，则所有内容都会自动正确设置。如果稍后安装 Redis，修复程序也会正确设置所有内容。

**安装修复程序也可以在Docker下使用吗？** 目前经验很少，结果很复杂。因此，我们目前建议不要使用它，也是因为容器中的所有内容通常都以 root 身份运行，因此无论如何都不相关。如果您仍然喜欢它并想提供反馈：请自行承担使用 Docker 的风险，并且在没有备份且不了解自己正在做什么的情况下切勿使用！

**如果我不确定出了什么问题该怎么办？** 您可以简单地预先复制 ioBroker 目录，但除了权限之外，不会更改任何内容。