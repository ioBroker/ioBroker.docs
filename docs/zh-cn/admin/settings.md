---
title: 系统设置
lastChanged: 04.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/settings.md
hash: lM2IWu4wvbcfSXcaHwSJQr0F4JoNrjlFKHbAXdiJmQs=
---
可以使用屏幕标题栏中的扳手图标从任何管理菜单项访问系统设置。

![系统设置](../../de/admin/media/ADMIN_Settings_main.png)

## 系统设置
在主设置中，设置了ioBroker的基本参数，这些参数也供ioBroker中的适配器使用。

一些参数已从主机设置中获取。

**系统语言**

这意味着您可以在不同的系统语言之间进行选择。可能尚未完全支持所有语言。

**温度单位**

某些适配器使用此值。 °C 或 °F 是可能的。

**货币**

可以在此处输入所需的货币格式，例如欧元。目前没有适配器使用此功能。

**日期格式**

指定的选择显示在 admin 和 vis 中。

**浮动分隔符**

浮点值的逗号或句点

**标准历史**

如果安装了适配器用于记录数据点，则在此处选择适当的适配器

如果只安装了一个历史适配器（SQL/History/InfluxDB），则使用该适配器；如果有多个可用，则可以选择一个。

**专家模式**

待定

**默认日志级别**

待定

**一周的第一天**

待定

**本地设置**

待定

## 存储库
![](../../de/admin/media/ADMIN_Settings_repos.png)

ioBroker可以从不同的来源获取适配器列表。安装期间输入以下来源：

*稳定：http://download.iobroker.net/sources-dist.json
* 测试版：http://download.iobroker.net/sources-dist-latest.json

如果在此处输入了旧安装中的其他存储库，则应删除它们，因为它们不再维护。

## 许可证
![](../../de/admin/media/ADMIN_Settings_licences.png)

## 证书
![证书](../../de/admin/media/ADMIN_Settings_certificates.png)

这是用于 SSL/HTTPS 通信的证书的中心位置。这些证书由 admin、web、simple-api、socketio 使用。默认情况下安装标准证书。你无法用这个来验证任何东西。它们仅用于 SSL 通信。由于证书是开放的，您应该使用自己的（自签名）证书、购买真正的证书或切换到 Let’s Encrypt。使用默认证书的通信并不安全，如果有人想要读取流量，则可以这样做。请务必安装您自己的证书。
例如。在Linux下。

证书可以指定为路径或通过拖放完全上传

<span style="color:red">通常最好使用 Web 适配器测试新证书，而不是直接使用管理适配器，这样您就不会将自己锁定在系统之外。</span>

指定路径时，iobroker 用户必须具有正确的权限。

对于文件本身 644，对于父目录 755。

如果权限不正确，将会出现如下错误消息：

``web.0 (24704) Cannot create webserver: Error: error:0909006C:PEM routines:get_name:no start line``

您可以通过以 root 用户身份登录服务器，然后切换到 iobroker 用户并列出证书文件来检查访问权限：

``su iobroker``

``ls -l /Pfad/zum/Zertifikat``

您应该在行的开头看到 **-rw-r--r--** 。

如果链接的是实际证书，则必须检查链接目标的权限。

这里有一条消息，比如

``ls: Zugriff auf '/Pfad/zum/Zertifikat' nicht möglich: Keine Berechtigung``

权利需要调整。

作为文件的 root 用户：

``chmod 644 /Pfad/zum/Zertifikat``

对于父目录：

``chmod 755 /Pfad/zum``

## 让我们加密 SSL
![让我们加密](../../de/admin/media/ADMIN_Settings_letsencrypt.png)

Let’s Encrypt 是来自独立互联网安全研究小组 (ISRG) 的免费、自动化和开源证书颁发机构。

有关 Let’s Encrypt 的更多信息，请参阅[这里](https://letsencrypt.org/)。

某些安装使用动态 DNS 或类似的方式通过分配的地址到达您自己的域。 ioBroker 支持自动请求和续订 Let’s Encrypt 组织的证书。

几乎每个可以启动 Web 服务器并支持 HTTPS 的适配器中都存在使用 Let’s Encrypt 免费证书的选项。

如果您激活使用证书的选项，但未激活自动更新，则相应的实例会尝试使用已保存的证书。

如果激活自动更新，实例会尝试向 Let's Encrypt 请求证书并自动更新它们。

第一次调用相应地址时，将首次请求证书。这意味着，例如，如果您将“sub.domain.com”配置为地址，然后访问 https://sub.domain.com，则将首次请求证书，这可能需要一段时间才能完成答案来了。

颁发证书是一个复杂的过程，但如果您按照下面的说明操作，应该很容易获得免费证书。

**程序：**

必须使用输入的电子邮件地址创建一个新帐户（在系统设置中进行设置）

生成一个随机密钥作为帐户的密码。

创建帐户后，系统会在端口 80 上打开一个小网站来确认地址。

Let's encrypt 始终使用端口 80 来检查地址。

如果端口 80 已被另一个服务使用，则第 4 点开始发挥作用 - 即为另一个服务分配不同的端口！

当小型 Web 服务器启动时，系统设置中指定的地址的证书请求将发送到 Let's encrypt 服务器。

Let’s Encrypt 服务器发送回一个挑战短语来响应请求，并在一段时间后尝试在地址“http://yourdomain:80/.well-known/acme-challenge/”处读取该挑战短语。

当服务器收到我们这边发回的质询短语时，Let’s Encrypt 服务器会发送证书。它们保存在系统设置中输入的目录中。

这听起来很复杂，但您所要做的就是激活几个复选框并在系统设置中输入电子邮件地址和网址。

收到的证书的有效期约为 90 天。首次颁发这些证书后，将启动另一个任务，自动延长其有效期。

这个话题非常复杂，有成千上万的事情可能会出错。如果这不起作用，我们建议在旅途中使用 IoT 适配器进行访问。

Let’s Encrypt 仅适用于 Node.js 版本 >=4.5

## 默认访问控制列表
![访问权](../../de/admin/media/ADMIN_Settings_zugriffsrechte.png)

在此子页面中，可以为所有用户/组设置各个区域的访问权限

＃＃ 统计数据
![统计数据](../../de/admin/media/ADMIN_Settings_statistics.png)

这样我们就可以大致了解安装（使用的适配器）和地理分布，我们将非常高兴收到此信息。

您可以发送不同数量的信息。该范围可以在左侧选择。

右侧显示将发送哪些数据。
该数据是绝对匿名评估的。