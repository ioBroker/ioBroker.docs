---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/lib/install-ha-rpi.md
title: 密码 hacluster
hash: /vstRhgCT9bo7qG0EOjpSOU5Tqq3WZU5vac3deOOXtQ=
---
#
##
＃＃＃ 来源
https://www.raspberrypi.org/downloads/raspbian/ https://downloads.raspberrypi.org/raspbian_lite_latest Raspbian Stretch Lite 最小镜像基于 Debian Stretch 版本：2018 年 6 月发布日期：2018-06-27 内核版本：4.14

2018-06-27-raspbian-stretch-lite.img

### 蚀刻机
https://etcher.io/

在分区`boot`中创建文件`ssh`。

### 腻子
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

＃＃ 连接
调用腻子用户： pi paswoort raspberry raspberrypi in putty

sudo passwd root sudo nano /etc/ssh/sshd_config 搜索 PermitRootLogin 并将其更改为 yes, remove # 你可以使用此命令再次撤消以 root 身份登录 sudo passwd -l root su

易于更新 易于升级

raspi 配置

2 网络选项主机名wifi国家设置为de Enter SSID Enter password

4 I1 更改语言环境 de_DE.UTF-8 UTF-8 空栏选择

7 高级选项 A1 扩展文件系统

重启 欢迎使用 fdisk (util-linux 2.29.2)。
更改将仅保留在内存中，直到您决定写入它们。
在使用 write 命令之前要小心。

命令（m 寻求帮助）：磁盘 /dev/mmcblk0：14.9 GiB，15931539456 字节，31116288 扇区单位：1 * 512 = 512 字节扇区大小（逻辑/物理）：512 字节/512 字节 I/O 大小（最小/最佳）：512字节/512字节磁盘标签类型：dos磁盘标识符：0x8e9e2675

设备引导开始结束扇区大小 ID 类型 /dev/mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

命令（m 寻求帮助）： 分区号（1,2，默认 2）： 分区 2 已被删除。

命令（m 寻求帮助）：分区类型 p 主（1 个主，0 个扩展，3 个空闲）e 扩展（逻辑分区的容器）选择（默认 p）：分区号（2-4，默认 2）：第一个扇区（2048 -31116287，默认 2048）：最后一个扇区，+sectors 或 +size{K,M,G,T,P}（98304-31116287，默认 31116287）：创建了一个新的分区 2，类型为“Linux”，大小为 14.8 GiB .
分区 #2 包含一个 ext4 签名。

命令（m 寻求帮助）：磁盘 /dev/mmcblk0：14.9 GiB，15931539456 字节，31116288 扇区单位：1 * 512 = 512 字节扇区大小（逻辑/物理）：512 字节/512 字节 I/O 大小（最小/最佳）：512字节/512字节磁盘标签类型：dos磁盘标识符：0x8e9e2675

设备引导开始结束扇区大小 ID 类型 /dev/mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

命令（m 寻求帮助）：分区表已被更改。
调用 ioctl() 重新读取分区表。
重新读取分区表失败。：设备或资源忙

内核仍然使用旧表。新表将在下次重新启动或运行 partprobe(8) 或 kpartx(8) 后使用。

fdisk -l /dev/mmcblk0

纳米 /etc/dhcpcd.conf

接口 eth0 静态 ip_address=10.10.1.1/24

接口 wlan0 静态 ip_address=192.168.179.161/24 静态路由器=192.168.179.1 静态域名服务器=192.168.179.10

接口 eth0 静态 ip_address=10.10.1.2/24

接口 wlan0 静态 ip_address=192.168.179.162/24 静态路由器=192.168.179.1 静态域名服务器=192.168.179.10

纳米 /etc/hosts 192.168.179.161 iob1 192.168.179.162 iob2 10.10.1.1 iob1p 10.10.1.2 iob2p

apt install policycoreutils-python-utils psmisc libssl-dev

https://www.server-world.info/en/note?os=Debian_9&p=ssh&f=4

https://www.debian.org/devel/passwordlessssh

#######################################
centos

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum install NetworkManager-tui nmtui

localectl set-locale LANG=de_DE.utf8 yum update -y /usr/bin/rootfs-expand

ssh -l root iob1

timedatectl set-timezone 欧洲/柏林

setenforce 0 sed -i.bak "s/SELINUX=enforcing/SELINUX=permissive/g" /etc/selinux/config systemctl mask firewalld.service systemctl stop firewalld.service iptables --flush

# 密码 hacluster
更改用户 hacluster 的密码。
新密码：重新输入新密码：passwd：所有身份验证令牌更新成功。

[root@iob1 ~]# pcs cluster auth iob1 iob2 Username: hacluster Password: iob2: Authorized iob1: Authorized [root@iob1 ~]# pcs cluster setup --name iobrokerc iob1 iob2 正在销毁节点上的集群：iob1, iob2...
iob2：停止集群（起搏器）...
iob1：停止集群（起搏器）...
iob2：成功销毁集群 iob1：成功销毁集群

将“pacemaker_remote authkey”发送到“iob1”、“iob2” iob1：成功分发文件“pacemaker_remote authkey” iob2：成功分发文件“pacemaker_remote authkey”正在向节点发送集群配置文件...
iob1：成功 iob2：成功

正在同步节点 iob1、iob2 上的 pcsd 证书...
iob2：成功 iob1：成功 在节点上重新启动 pcsd 以重新加载证书...
iob2：成功 iob1：成功

[root@iob1 ~]# pcs cluster start --all iob1: Starting Cluster...
iob2：启动集群...

[root@iob1 ~]# corosync-cfgtool -s 打印环状态。
本地节点 ID 1 RING ID 0 id = 192.168.179.54 状态 = 环 0 活动且无故障 [root@iob1 ~]# corosync-cmapctl | grep 成员 runtime.totem.pg.mrp.srp.members.1.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.1.ip (str) = r(0) ip(192.168.179.54 ) runtime.totem.pg.mrp.srp.members.1.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.1.status (str) = 加入 runtime.totem.pg.mrp.srp .members.2.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.2.ip (str) = r(0) ip(192.168.179.63) runtime.totem.pg.mrp.srp。 members.2.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.2.status (str) = 加入 [root@iob1 ~]# pcs status corosync

会员信息 ---------------------- Nodeid Votes Name 1 1 iob1 (local) 2 1 iob2

[root@iob1 ~]# pcs status 集群名称：iobrokerc 警告：没有 stonith 设备并且 stonith-enabled 不为假 堆栈：corosync 当前 DC：iob2（版本 1.1.18-11.el7_5.3-2b07d5c5a9） - 具有仲裁的分区最后更新：2018 年 8 月 24 日星期五 12:18:14 最后更改：2018 年 8 月 24 日星期五 12:15:30 由 hacluster 通过 iob2 上的 crmd

配置了 2 个节点 配置了 0 个资源

在线：[ iob1 iob2 ]

没有资源

守护进程状态： corosync：激活/禁用起搏器：激活/禁用 pcsd：激活/启用

[root@iob1 ~]# crm_verify -L -V 错误：unpack_resources：资源启动已禁用，因为没有定义 STONITH 资源错误：unpack_resources：使用 stonith-enabled 选项配置一些或禁用 STONITH 错误：unpack_resources：注意：具有共享数据的集群需要 STONITH 以确保数据完整性 检查期间发现的错误：配置无效

[root@iob1 ~]# pcs 属性设置 stonith-enabled=false

[root@iob1 ~]# crm_verify -L -V

百胜安装哪个

[root@iob1 ~]# pcs resource create ClusterIP ocf:heartbeat:IPaddr2 \ > ip=192.168.179.160 cidr_netmask=32 op monitor interval=30s

[root@iob1 ~]# pcs status 集群名称：iobrokerc 堆栈：corosync 当前 DC：iob2（版本 1.1.18-11.el7_5.3-2b07d5c5a9） - 具有仲裁的分区 最后更新时间：2018 年 8 月 24 日星期五 12:26:57最后更改：2018 年 8 月 24 日星期五 12:23:51，root 通过 iob1 上的 cibadmin

配置了 2 个节点 配置了 1 个资源

在线：[ iob1 iob2 ]

完整资源列表：

 ClusterIP (ocf::heartbeat:IPaddr2)：已停止

失败的动作：

* iob2 上的 ClusterIP_monitor_0 '未安装' (5): call=5, status=complete, exitreason='设置问题: 找不到命令: ip',

    last-rc-change='Fri Aug 24 12:23:52 2018', queued=0ms, exec=192ms

* iob1 上的 ClusterIP_monitor_0 '未安装' (5): call=5, status=complete, exitreason='Setup problem: could't find command: ip',

    last-rc-change='Fri Aug 24 12:23:52 2018', queued=0ms, exec=194ms

守护进程状态： corosync：激活/禁用起搏器：激活/禁用 pcsd：激活/启用

[root@iob1 ~]# pcs resource defaults resource-stickiness=100 警告：默认值不适用于使用自己定义的值覆盖它们的资源[root@iob1 ~]# pcs resource defaults resource-stickiness: 100

百胜安装 git python gcc-c++ make

https://stackoverflow.com/questions/48320850/installing-epel-repository-on-centos-7-breaks-yum-functionality cat > /etc/yum.repos.d/epel.repo << EOF [epel] 名称=用于 armhfp 的 Epel 重建 baseurl=https://armv7.dev.centos.org/repodir/epel-pass-1/ enabled=1 gpgcheck=0

EOF

[root@iob1 7]# yum install nodejs npm npm install -g npm@4

[root@iob1 npm]# node -v v6.14.3 [root@iob1 npm]# npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root@iob1 dev]# yum install parted 加载插件：fastestmirror 从缓存加载镜像速度hostfile 包 parted-3.1-29.el7.armv7hl 已安装在最新版本中。
无事可做 [root@iob1 dev]# parted -l | grep Error [root@iob1 dev]# parted /dev/sda mklabel gpt 警告：现有的分区表和 /dev/sda 上的所有数据将被删除。你想继续吗？是/否/否？是 信息：您可能需要调整 /etc/fstab。

[root@iob1 dev]# parted -a opt /dev/sda mkpart primary ext4 0% 100% 信息：您可能需要调整 /etc/fstab。

[root@iob1 dev]# lsblk NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT sda 8:0 1 1,9G 0 disk └─sda1 8:1 1 1,9G 0 part mmcblk0 179:0 0 14,8G 0 disk ├ ─mmcblk0p2 179:2 0 488M 0 部分 [SWAP] ├─mmcblk0p3 179:3 0 13.7G 0 部分 / └─mmcblk0p1 179:1 0 668M 0 部分 /boot [root@iob1 dev]# mkfs.ext4 -L iob1d / dev/sda1 mke2fs 1.42.9 (28-Dec-2013) Filesystem-Label=iob1d OS-Type: Linux Blocksize=4096 (log=2) Fragmentsize=4096 (log=2) Stride=0 blocks, Stripewidth=0 blocks 122400 inode，488704 个块 24435 个块 (5.00%) 为超级用户保留 第一个数据块=0 最大文件系统块=501219328 15 个块组 每组 32768 个块，每组 32768 个片段 每组 8160 个 inode 存储在块中的超级块备份副本：32768、98304、 163840、229376、294912

为组表请求空间：完成写入 inode 表：完成创建日志（8192 个块）：完成写入超级块和文件系统记帐信息：完成

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p /root/rpmbuild/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}

百胜安装 -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar。广州

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1使 km-rpm

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

cd drbd-9.0.15-1

cd /root/rpmbuild/RPMS/armv7h1

rpm -Uvh drbd-xen* drbd-udev* drbd-pacemaker* drbd-bash-completion* drbd-utils-*.rpm drbd-km-*.rpm drbd-8*