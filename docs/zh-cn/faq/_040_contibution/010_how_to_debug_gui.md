---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/faq/_040_contibution/010_how_to_debug_gui.md
title: 无题
hash: eh141K6ZgUBSAOs1s5Ypj/mn6GJoohoZ3t/LHHuvcd0=
---
## 在图形用户界面中报告错误
ioBroker 有许多用 JavaScript 编写的图形界面。

许多界面目前正在使用 ReactJS 开发。
如果在这样的界面中发生错误，或者响应冻结，或者站点行为异常，那么您可以并且应该报告错误。

为此，您必须打开浏览器控制台并在那里找到错误消息。
每个浏览器的浏览器控制台都不同，但大多数浏览器在开发人员视图中都有控制台，开发人员视图通常可以通过 F12（Chrome、Firefox、Edge）访问。

重要的是**首先打开浏览器控制台，然后重新加载页面 (F5)*，然后执行导致错误的操作。

这是 Chrome 浏览器控制台的样子：![Chrome 中的浏览器控制台](../../../de/faq/_040_contibution/media/010_browser_console.png)

如果控制台在页面加载后打开，则错误消息如下所示：![没有来源的错误](../../../de/faq/_040_contibution/media/010_browser_without_sources.png)

像这样，如果在页面加载之前打开控制台：![来源错误](../../../de/faq/_040_contibution/media/010_browser_with_sources.png)

您可能会注意到，它显示了发生错误的文件名和行号。

使用此信息（以及适配器的版本号），我们可以重现或修复错误。