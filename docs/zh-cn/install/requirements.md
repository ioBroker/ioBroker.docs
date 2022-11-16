---
title: 要求
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/requirements.md
hash: Opfh6IzsupO+aH9II8ZSGygSZ/9Gh1AWeFjbpBIXsi4=
---
＃ 系统要求
@@@ 包含 RAM、CPU、操作系统、Node.js、npm、构建工具、网络、磁盘空间、SD 卡大小的表 @@@

##重新安装
| |变体 |版本 |
|---|:---------:|:-------:|

**运行时环境** | | Node.js | 32 位/64 位<br>ppc641e<br> armv61、armv71、arm64<br> aix-ppc64, s390x | 8.12.0 **包管理器** | |节点数据包管理器 npm | | 6.4.1

ioBroker 可以安装在所有可以使用 Node.js 的系统上。

## 现有安装
| |变体 |版本 |
|---|:---------:|:-------:|

**运行时环境** | | Node.js | 32 位/64 位<br>ppc641e<br> armv61、armv71、arm64<br> aix-ppc64, s390x | 6.0.0 - 10.10.0 <sup>*1</sup> **包管理器** | |节点数据包管理器 npm | | 3.0.0 - 4.6.1 5.7.1 - 6.4.1

<sup>*1</sup>以下适配器在 Node.js 版本 &gt;= 10.0 时仍然存在问题：

- maxcul (由于串口依赖)
- noolite（由于串口依赖）
- 潮湿（由于 pty.js 依赖）

## 支持的操作系统
| |变体 |
|---|:---------:|

*视窗* |视窗 7 | 32 位/64 位 Windows Server 2008 R2 | 64 位/IA64 版 Windows 8 | 32 位/64 位 Windows Server 2012 | 64 位 Windows 8.1 | 32 位/64 位 Windows Server 2012 R2 | 64 位 Windows 10 | 32 位/64 位 Windows Server 2016 | 64 位 *Linux 发行版* |拱门和衍生物 | Debian 及其衍生产品 |例如 Ubuntu、Bananian、<br> Cubian、Raspbian、Knoppix Gentoo 及其衍生产品 |红帽及其衍生产品 |例如 Fedora、Pidora、<br> CentOS、Mandriva Slackware 和衍生产品 |例如 openSUSE* 他* | macOS |从零开始的 64 位 Linux |