---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-system.md
title: 系统设置
hash: oKEU2KVCb/vFwsN+dbBvAxWAKluBKE0yIrUNfvA+VtU=
---
# 系统设置
ioBroker 的基本参数设置在这里。

![管理员系统设置](../../../de/adapterref/iobroker.admin/img/tab-system_Systemeinstellungen.jpg)

##主要设置
### 系统语言
您可以选择系统语言：德语、英语、俄语

### 单位温度
这个值被一些适配器使用。可能是°C 或°F。

＃＃＃ 货币
目前它不使用适配器

＃＃＃ 日期格式
选择日期应如何在 admin 和 vis 中显示。

### 分隔符
浮点值的逗号或句点

### 默认历史实例
默认情况下，此 SQL/History/InfluxDB 适配器实例用于 flot 和人力车（图表）。

## 存储库或存储库
![](../../../de/adapterref/iobroker.admin/img/tab-system_Verwahrungsorte2.jpg)

ioBroker 可以从不同的来源获取适配器列表。在安装过程中输入以下源：

* **默认** - http://download.iobroker.net/sources-dist.json - 每天 01:00 在服务器上生成。

访问速度非常快，但版本信息最长可达 24 小时。

* **在线** - https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json - 存储库

是从在线资源生成的。访问可能需要很长时间，这是最新的来源

* **sources - conf/sources-dist.json** - 也是自动生成的，也需要很长时间，但链接可能已过期（某些适配器可能丢失）

## 证书
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_33_54-ioBroker.jpg)

这是用于 SSL/HTTPS 通信的证书的中心位置。证书由 admin、web、simple-api、socketio 使用。默认安装标准证书。你不能用它来验证任何东西。它们仅用于 SSL 通信。因为证书是开放的，你应该使用自己的（自签名）证书，购买真正的证书，或者切换到 Let's Encrypt。与默认证书的通信是不安全的，如果有人想读取流量，可以这样做。请务必安装您自己的证书。例如。根据[linux](http://guides.intertech.de/ssl_certificate_self.html)。

##让我们加密
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_40_07-ioBroker.jpg)

Let's Encrypt 是来自独立 Internet 安全研究组 (ISRG) 的免费、自动化和开源的_证书颁发机构_。

有关 Let's Encrypt 的更多信息，请参阅[这里](https://letsencrypt.org/)。

一些安装使用动态 DNS 或类似的方式通过从那里分配的地址到达他们自己的域。 ioBroker 支持 Let's Encrypt 组织自动请求和更新证书。

使用 Let's Encrypt 的免费证书的选项几乎存在于每个可以启动 Web 服务器并支持 HTTPS 的适配器中。

如果您激活使用证书的选项，而不是自动更新，则相应的实例会尝试使用存储的证书。

如果启用了自动更新，实例会尝试从 Let's Encrypt 请求证书并自动更新它们。

当第一次调用相应的地址时，第一次请求证书。这意味着，例如，如果您将“sub.domain.com”配置为地址，然后调用[https://sub.domain.com](https://sub.domain.com/)，则将首次请求证书，这可能需要一段时间才能得到答案。

颁发证书是一个复杂的过程，但是如果您按照下面的说明进行操作，应该很容易获得免费证书。

**方法：**

1. 必须使用输入的电子邮件地址创建一个新帐户（在系统设置中进行设置）
2. 生成一个随机密钥作为帐户的密码。
3、创建账号后，系统会在80端口打开一个小网站，验证地址。
4.让我们加密**总是**使用端口**80**检查地址。
5. 如果端口 80 已被其他服务使用，则适用第 4 点 - 即为其他服务分配不同的端口！
6. 小型网络服务器启动时，系统设置中指定地址的证书请求被发送到 Let's encrypt 服务器。
7. Let's Encrypt 服务器发送回一个挑战短语以响应请求，并在一段时间后尝试在地址“http://yourdomain:80/.well-known/acme-challenge/”处读取这个挑战短语。
8. 当服务器从我们这边收到这个挑战短语时，Let's Encrypt 服务器发送证书。这些保存在系统设置中输入的目录中。

这听起来很复杂，但您所要做的就是选中几个复选框并在系统设置中输入电子邮件地址和网址。

收到的证书有效期约为 90 天。首次颁发这些证书后，将启动另一项自动延长有效期的任务。

这个话题非常复杂，可能会出现成千上万的问题。如果这不起作用，我们建议您在旅途中使用云适配器进行访问。

**Let's Encrypt 仅适用于 node.js 版本 >=4.5**

＃＃ 统计数据
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_48_46-ioBroker.jpg)

ioBroker 管理员将以下信息发送到 download.iobroker.net：

<pre>{“uuid”：“56cf0d20-XXXX-YYYY-BBBB-66eec47ZZZZZ”，“语言”：“de”，“主机”：[{“版本”：“0.15.1”，“平台”：“Javascript/Node. js”，“类型”：“win32”}]，“适配器”：{“管理员”：{“版本”：“1.0.2”，“平台”：“Javascript/Node.js”}，“hm-rpc &quot;: { &quot;version&quot;: &quot;1.1.2&quot;, &quot;platform&quot;: &quot;Javascript/Node.js&quot; } } }</pre>

这可以通过将统计设置为“**无**”来禁用。

但是，开发人员要求提供以下信息：

<pre>我们努力使这个项目起步。
作为回报，我们要求您向我们发送使用统计信息。
不会向 ioBroker.org 发送任何私人信息。
每次更新适配器列表时，也会发送匿名统计信息。
非常感谢！</pre>