---
title: 安装
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/virtualbox.md
hash: zoJH4HPQb5fjZZk7ln+yhEsqRR9r5z/9T/Z6NfOncwk=
---
# 在 VirtualBox 中设置和安装 ioBroker
@@@ http://www.iobroker.net/docu/?page_id=5358&lang=de @@@

首先我们获得当前稳定版本的 Debian https://www.debian.org/CD/http-ftp/#stable

再往下一点我们点击CD下的AMD64

现在我们下载`debian-8.4.0-amd64-netinst.iso` 如果有更新的版本请使用此版本，下载时最新版本是 Debian 8.4.0。
我使用`Netinst`，因为文件很小，并且安装仅从网络重新加载小内容。

然后我们创建一个新的虚拟机并为其命名。
在我的示例中 ioBroker_Debian_Jessie_x64 Rekord87.jpg 然后指定我们要分配给虚拟机的主内存大小。
在我的示例中 4GB RAM Recording88.jpg

点击创建磁盘录像89.jpg

选择VDI（虚拟图像盒）录制90.jpg

当谈到存储类型时，由每个人决定他们的选择。
在我的示例中，我使用动态分配 Recording91.jpg

现在我们可以更改虚拟机的文件名（如果需要）并输入可用于虚拟机的分区大小，在我的示例中为 10GB reporting92.jpg。

现在虚拟机已准备就绪。
如果我们现在单击“更改”，我们可以设置有关虚拟机的更多内容。

我们转到“大容量存储”选项卡，单击“控制器”下的“IDE”

CD 徽标出现在“属性”下的右侧。
我们单击此按钮并选择虚拟 CD/DVD 介质的文件。
现在让我们在资源管理器中导航到下载的 Debian ISO 文件并选择它。
整个事情应该是这样的：Recording93.jpg

由于我想访问网络中的 ioBroker，而不是子网络中的 ioBroker，因此我将选择设置为“已连接”下“网络”选项卡下的“网络桥 Recording94.jpg”

现在我们已经设置了所有必要的东西。
可以开始安装 Debian。
我们单击“开始”，最终出现下图。
我们选择安装recording95.jpg

语言：从 Recording96.jpg 中选择 GERMAN

位置：从 Recording97.jpg 中选择 GERMANY

键盘布局：从 Recording98.jpg 中选择 GERMAN

计算机名称：我们输入要安装的计算机的名称。
在我的示例 ioBrokerVM 中（如果有人想从其 ioBroker 生产系统恢复备份作为测试，请在此处输入与您的 RasPi / Cubie / BananaPi 等相同的名称。） Recording100.jpg

域名：您可以将此字段留空 Recording101.jpg

Root密码：您的root密码 Recording102.jpg

重复root密码：重复你的root密码 Recording103.jpg

创建用户：在我的示例中 NIPPY reporting104.jpg

创建用户名：在我的示例中为 NIPPY reporting105.jpg

用户密码：您的用户密码 Recording106.jpg

重复用户密码：再次输入您的用户密码 Recording107.jpg 时区：我们选择 BERLIN

录音108.jpg

硬盘分区1：我们选择GUIDED – USE FULL DISK Recording109.jpg

硬盘分区2：我们从Recording110.jpg中选择硬盘

硬盘分区 3：我们选择一个分区上的所有文件，推荐初学者 Recording111.jpg

对硬盘4进行分区：我们选择停止分区并应用更改 Recording112.jpg

硬盘分区 5：我们选择 YES Recording113.jpg Package Manager 配置 1：我们选择 GERMANY Recording115.jpg

包管理器配置2：我选择ftp.de.debian.orgrecording116.jpg

Package Manager 配置 3：可以将其留空并转到 CONTINUE Recording118.jpg

人气大赛：我选NO Recording119.jpg

软件选择：我们选择SSH SERVER & STANDARD SYSTEM TOOLS，然后取消选择其余的（如果选择） Recording120.jpg

GRUB 引导加载程序 1：我们选择“是”recording121.jpg

GRUB引导加载程序2：我们选择我们的HDD /dev/sda (ata-Vbox…………)recording122.jpg

安装完成：Recording123.jpg

现在系统重新启动，我们最终登录

登录：Record124.jpg

我们使用 root 帐户登录： 登录名：root 密码：您的密码 Recording125.jpg

现在让我们更新系统： apt-get install update 1

apt-get 安装更新 apt-get 安装升级 1

apt-get 安装升级

由于未安装 SUDO，请执行以下操作： aptitude install sudo 1

aptitude 安装 sudo

NPM 安装如下： apt-get install npm 1

apt-get 安装 npm

然后我们安装CURL： apt-get install curl 1

apt-get 安装curl

NodeJs的准备和安装curl -sL https://deb.nodesource.com/setup_4.x |须藤-E bash-1

卷曲-sL https://deb.nodesource.com/setup_4.x |须藤-E bash-

apt-get安装nodejs 1

apt-get安装nodejs

完成后，ioBroker 将被安装

首先我们创建iobroker目录： mkdir /opt/iobroker 1

mkdir /opt/iobroker

我们切换到iobroker目录：cd /opt/iobroker 1

cd /opt/iobroker

现在让我们安装 iobroker： npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

安装结束时应出现以下内容：Recording137.jpg

—

如果你愿意，你可以安装 htop，我在终端中使用它来查看内存使用情况/CPU 负载等。

这是通过以下命令安装的： apt-get install htop 1

apt-get 安装 htop

它的执行方式为： htop 1

顶部

看起来像这样：Recording139.jpg

我希望能让一些初学者更轻松地设置包括 ioBroker 在内的虚拟机。

对我来说，在虚拟机中安装 ioBroker 经常失败，但在 BananaPi 上它运行没有任何问题。

无论如何，这个安装例程在虚拟机上对我来说非常有效。

1 新增： 1.1 自动启动 VirtualBOX VM（Ubuntu 16.10）： 1.2 调整 3 个变量！ （如有必要，请注释掉第三个变量或添加更多变量，具体取决于虚拟机实例）

添加：自动启动VirtualBOX VM（Ubuntu 16.10）：

https://www.freesoftwareservers.com/ind…nd-vbox-5/

创建文件：

sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM 默认值 99 01 1

sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM 默认值 99 01

文件内容：

```
#! /bin/sh
# Start VirtualBox @boot
# /etc/init.d/StartVM
#

#Edit these variables!
VMUSER=user
VMNAME=VM1
VMNAME2=Test

case "$1" in
  start)
    echo "Starting VirtualBox VM ..."
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME &amp;
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME2 &amp;
    ;;
  stop)
    echo "Saving state of Virtualbox VM ..."
    sudo -u $VMUSER VBoxManage controlvm $VMNAME savestate
    sudo -u $VMUSER VBoxManage controlvm $VMNAME2 savestate
    ;;
  *)
    echo "Usage: /etc/init.d/StartVM {start|stop}"
    exit 1
    ;;
esac

exit 0
```

调整3个变量！ （如有必要，请注释掉第三个变量或添加更多变量，具体取决于虚拟机实例）

在 BIOS 中设置（如果它在计算机上运行），在发生电源故障时应恢复旧的 ON/OFF 状态。如果发生电源故障，它会重新启动，然后 VM 也会启动。

使用 VirtualBOX 和 Back in Time 创建备份

在 VirtualBOX 中，您可以轻松地手动创建保存点。只需要几秒钟和 1 次点击。始终在 iobroker 更新或脚本更改之前执行此操作！截图自 2016-04-26 22-48-04.png

您可以一键恢复之前的版本。

内存消耗：10 GB 的动态 VM 和 Ubuntu 16.10 Full + iobroker 占用约 1.7 GB 内存。我的 11 个快照占用了 8.6 GB。

我每晚都会使用“Back in Time”程序自动将我的整个个人区域（包括 VirtualBOX VM 目录）复制到第二个硬盘驱动器。那里保留了多个版本，并在一定时间后自动删除。
屏幕截图来自 2016-04-26 22-55-23.png 这将运行 VirtualBox。

```
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
```

您还可以安装扩展包；它还支持例如从主机到客户端的 USB 2.0 或 3.0 设备连接、从主机到客户端的网络摄像头直通以及 AES 加密。您可以下载它 [URL：https://www.virtualbox.org/wiki/Downloads]这里 - 第二点（扩展包）[/url] 您下载此文件并以管理员身份打开它，或者通过以下方式打开并安装它VirtualBOX /全局设置/附加包（但以管理员身份启动VirtualBOX）。

最低硬件要求非常低。你必须自己弄清楚它如何适合。理论上，512 RAM 和旧的 Intel 处理器就足够了。例如，它应该在所有英特尔 NUC 代上顺利运行。
为了连续运行，拥有一台省电的主机当然很重要。如今，您可以轻松组装功率小于 10 瓦的强大计算机。网上有各种10瓦PC的使用说明。重要的是，如果可能的话，避免使用自己的显卡，并拥有在低负载范围内高效的电源，并且不要使用高端主板，因为它的功能越多，吸收的芯片就越多力量。
我强烈推荐适用于 Windows 或 Ubuntu 的英特尔 NUC 系列。我将引用我的签名：在 Intel NUC NUC6i3SYH (i3 Skylake)、M.2 SSD、8 GB RAM、Ubuntu 16.10 上使用 VirtualBOX 的 Ubuntu VM 中的 iobroker。闲置时6-8W。

在 Virtualbox 中，我将虚拟机的网卡设置为“桥接”，这意味着虚拟机像自己的计算机一样挂在 LAN 路由器上。

并且通过安装的操作系统在虚拟机内正常设置固定IP。
在 Debian 中可以这样工作：

终端：

```
sudo nano /etc/network/interfaces
```

可能有这样的事情：

```
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
```

您将其更改为（小心，使数字适应您自己的环境）

```
 auto eth0
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
```

其中 eth0 是您自己的 LAN 设备的名称，它在虚拟机中可能会以不同的方式调用，更改时您必须将两个 eth0 单词替换为正确的名称。