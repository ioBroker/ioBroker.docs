---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/images.md
title: 处理图像
hash: Rd0zm6eZ+Bir4OYRlqu5jeUQpCtIZuqIekiMBNLut0Y=
---
--- 标题：处理图像 lastChanged：07/31/2019 ---

# 如何使用图片
从下载页面下载图像后，使用图像工具（例如 Balena-Etcher）将它们写入 SD 卡。

每个单独图像的进一步程序可以不同。
这就是为什么在下载页面上的每个图像下方都有一个 **信息** 按钮。

如果单击它，将出现属于该图像的自述文件。

进一步的程序和安全说明存储在那里。

当前测试镜像“2021-07-30-ioBrokerPi-lite.img”可以在Unix下使用以下命令写入SD卡：

** 须藤卸载 / 开发 / sdx **

** sudo dd bs = 1M if = 2021-07-30-ioBrokerPi-lite.img of = / dev / sdx ***