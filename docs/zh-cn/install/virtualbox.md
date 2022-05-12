---
title: 安装
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/virtualbox.md
hash: ojdJt/Bd/RzAa+nPIcMrXd0dcayKGusHGKxwmcoeNJY=
---
# 在 VirtualBox 中设置和安装 ioBroker
?> ***这是一个占位符***。<br><br>帮助 ioBroker 并扩展本文。请注意[ioBroker 风格指南](community/styleguidedoc)，以便更容易地采用更改。

@@@ http://www.iobroker.net/docu/?page_id=5358&lang=de @@@

首先，让我们获取 Debian 的最新稳定版本 https://www.debian.org/CD/http-ftp/#stable

在 CD 下再往下一点，我们点击 AMD64

现在我们下载“debian-8.4.0-amd64-netinst.iso” 如果有更新的版本，请使用它，在下载时 Debian 8.4.0 是最新的。
我使用 Netinst 是因为文件很小，而且安装只从网络重新加载小东西。

之后，我们创建一个新的虚拟机并为其命名。
在我的示例中 ioBroker_Debian_Jessie_x64 Recording87.jpg 然后指定我们要分配给 VM 的主内存量。
在我的例子中 4GB RAM Recording88.jpg

点击 Create Hard Disk Recording89.jpg

选择 VDI（虚拟图像框）Capture90.jpg

当涉及到存储类型时，您可以选择什么。
在我的示例中，我使用 DYNAMIC ALLOCATED Recording91.jpg

现在我们可以更改虚拟机的文件名（如果我们愿意的话）并输入虚拟机可用分区的大小。在我的示例中为 10GB Recording92.jpg

现在虚拟机设置好了。
如果我们现在单击更改，我们可以设置更多关于 VM 的内容。

我们转到选项卡 MASS STORAGE 单击控制器下：IDE

CD 徽标出现在右侧的属性下。
我们将单击它并选择选择虚拟 CD/DVD 媒体的文件。
现在我们在资源管理器中导航到下载的 Debian 的 ISO 文件并选择它。
整个事情应该看起来像这样：Recording93.jpg

由于我想在我的网络中而不是在子网络中访问 ioBroker，因此我在 CONNECTED TO 下的 NETWORK 选项卡下选择 NETWORK BRIDGE Recording94.jpg

现在我们已经设置了所有必要的东西。
Debian 的安装就可以开始了。
我们点击 START 并在下图中结束。
我们选择 INSTALL Recording95.jpg

语言：从 Recording96.jpg 中选择德语

地点：从 Recording97.jpg 中选择 GERMANY

键盘布局：从 Recording98.jpg 中选择 GERMAN

计算机名称：我们输入要安装的计算机的名称。
在我的示例 ioBrokerVM 中（如果有人想从他们的 ioBroker 生产系统播放备份作为测试，请输入与您的 Rasp Pi / Cubie / BananaPi 等相同的名称。）Recording100.jpg

域名：该字段可以留空 Recording101.jpg

根密码：您的根密码 Recording102.jpg

重复root密码：再次输入你的root密码 Recording103.jpg

创建用户：在我的示例中，NIPPY Recording104.jpg

创建用户名：在我的示例中，NIPPY Recording105.jpg

用户密码：您的用户密码 Recording106.jpg

重复用户密码：再次输入您的用户密码 Recording107.jpg 时区：我们选择柏林

录音108.jpg

分区磁盘 1：我们选择 GUIDED - USE FULL DISK Recording109.jpg

硬盘分区2：我们从Recording110.jpg中选择我们的硬盘

硬盘分区3：我们选择ALL FILES ON ONE PARTITION, RECOMMENDED FOR BEGINNERS Recording111.jpg

硬盘分区4：我们选择EXIT PARTITIONING AND SAVE CHANGES Recording112.jpg

硬盘分区5：我们选择YES Recording113.jpg Package Manager Configuration 1：我们选择GERMANY Recording115.jpg

配置 Package Manager 2：我选择了 ftp.de.debian.org Recording116.jpg

配置Package Manager 3：可以留空到CONTINUE Recording118.jpg

热门竞赛：我投了 NO Recording119.jpg

软件选择：我们选择 SSH SERVER & STANDARD SYSTEM TOOLS 其余我们取消选择（如果选择） Recording120.jpg

GRUB bootloader 1：我们选择 YES Recording121.jpg

GRUB bootloader 2：我们选择我们的硬盘 /dev/sda (ata-Vbox…………) Recording122.jpg

安装完成：Recording123.jpg

现在系统重新启动，我们登陆登录

登录：Recording124.jpg

我们使用我们的 root 帐户登录：登录：root 密码：您的密码分配 Recording125.jpg

现在我们更新系统：apt-get install update 1

apt-get 安装更新 apt-get 安装升级 1

apt-get 安装升级

由于未安装 SUDO，请执行以下操作： aptitude install sudo 1

能力安装须藤

NPM 安装如下： apt-get install npm 1

apt-get 安装 npm

然后我们安装 CURL：apt-get install curl 1

apt-get 安装 curl

准备并安装 NodeJs curl -sL https://deb.nodesource.com/setup_4.x |须藤 -E bash - 1

curl -sL https://deb.nodesource.com/setup_4.x |须藤 -E bash -

apt-get 安装 nodejs 1

apt-get 安装 nodejs

完成后，就会安装 ioBroker

首先我们创建 iobroker 目录： mkdir /opt/iobroker 1

mkdir /opt/iobroker

我们切换到 iobroker 目录： cd /opt/iobroker 1

cd /opt/iobroker

现在我们安装 iobroker： npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

安装结束时应出现以下内容：Recording137.jpg

—

如果你愿意，你仍然可以安装 htop。我在终端中使用它来查看内存使用率/CPU 负载等。

这是安装的：apt-get install htop 1

apt-get 安装 htop

它运行：htop 1

htop

看起来像这样：Recording139.jpg

我希望让一些初学者更容易设置包括 ioBroker 在内的 VM。

在 VM 中安装 ioBroker 对我来说经常失败，在 BananaPi 上它运行没有任何问题。

无论如何，这个安装例程在 VM 上对我来说非常有效。

1 补充： 1.1 自动启动VirtualBOX VM（Ubuntu 16.10）： 1.2 调整3个变量！ （如有必要，注释掉第三个变量或添加更多变量，具体取决于 VM 实例）

附录：自动启动VirtualBOX VM（Ubuntu 16.10）：

https://www.freesoftwareservers.com/ind ... nd-vbox-5/

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

调整3个变量！ （如有必要，注释掉第三个变量或添加更多变量，具体取决于 VM 实例）

在 BIOS 中设置（如果在计算机上运行），在发生电源故障时应恢复旧的 ON/OFF 状态。如果发生电源故障，它会重新启动，然后 VM 也会启动。

使用 VirtualBOX 和 Back in Time 创建备份

在 VirtualBOX 中，您可以轻松地手动创建保存点。只需几秒钟和 1 次点击。总是在 iobroker 更新或脚本更改之前执行此操作！截图日期为 2016-04-26 22-48-04.png

您可以一键恢复以前的版本。

内存消耗：10 GB 的动态 VM 和 Ubuntu 16.10 Full + iobroker 占用约 1.7 GB 内存。我的 11 个快照占用 8.6 GB。

我每天晚上使用“Back in Time”程序自动将我的整个个人区域（包括 VirtualBOX VM 目录）复制到第二个硬盘驱动器。有几个版本保留在那里，并在一段时间后自动删除。
截图日期为 2016-04-26 22-55-23.png 这是运行 VirtualBox。

```
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
```

您还可以安装扩展包，它还支持例如从主机到客户端的 USB 2.0 或 3.0 设备的连接、从主机到客户端的网络摄像头直通和 AES 加密。您可以在这里下载它 [URL:https://www.virtualbox.org/wiki/Downloads] – 第 2 点（扩展包）[/url] 下载此文件并以管理员身份打开它或通过 VirtualBOX 打开并安装它/全局设置/附加包（但以管理员身份启动 VirtualBOX）。

最低硬件要求非常低。你必须弄清楚它是如何适合的。理论上，512 RAM 和旧的 Intel 处理器就足够了。例如，它应该在所有英特尔 NUC 代上平稳运行。
为了连续运行，拥有一台省电的主机当然很重要。如今，您可以轻松地修补功能强大的 10 瓦以下的计算机。 Internet 上有各种 10 瓦 PC 手册。重要的是尽可能不要（自己的）显卡，并拥有在较低负载范围内高效的电源单元，并且不要使用高端主板，因为它具有的功能越多，芯片就越多在权力。
我真的可以推荐适用于 Windows 或 Ubuntu 的英特尔 NUC 系列。我将引用我的签名： iobroker in an Ubuntu VM with VirtualBOX on an Intel NUC NUC6i3SYH (i3 Skylake)、M.2 SSD、8 GB RAM、Ubuntu 16.10。 6-8W空闲。

在 Virtualbox 中，我将 VM 的网卡设置为“Bridged”，也就是说，VM 像单独的计算机一样连接到 LAN 路由器。

并且固定IP通过安装的操作系统在VM中非常正常地设置。
这在 Debian 上可以这样工作：

终端：

```
sudo nano /etc/network/interfaces
```

可能是这样的：

```
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
```

您将其更改为（注意，根据您自己的环境调整数字）

```
 auto eth0
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
```

其中 eth0 是您自己的 LAN 设备的名称，在 VM 中可能会以不同的方式调用它，更改时您需要将两个 eth0 单词替换为正确的名称。