---
title: 要求
lastChanged: 21.10.2023
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/requirements.md
hash: fOD9aR7DqwJ/mZ8rYoZiXZBx5RwJO6UVv25NfMmoWAg=
---
＃＃ 系统要求
|操作系统 |变体 |硬件环境（例如）| ioBroker 的最低要求 | ioBroker <sup>2</sup>推荐资源

|---|:---------:|:---------:|:---------:|:-------- -:| Linux 发行版 |推荐：Debian 包括相应的衍生品<sup>1</sup> | Raspberry PI、单平面计算机、迷你 PC（例如 NUC）、具有虚拟化环境的硬件 | 2GB 内存，32GB 存储容量 | &gt;= 4 GB（更好 6 GB - 8 GB）RAM，&gt;= 64 GB 存储容量 Docker | |迷你电脑（例如 NUC）、NAS <sup>3</sup> | 2GB 内存，32GB 存储容量 | &gt;= 4 GB（更好 6 GB - 8 GB）RAM，&gt;= 64 GB 存储容量 Windows | | PC、迷你 PC（例如 NUC）| 4 GB RAM，50 GB 存储容量（包括操作系统）| 8 GB RAM，100 GB 存储容量（包括操作系统） https://www.iobroker.net/#de/documentation/install/windows.md <sup>1</sup>建议在基于 Debian/Ubuntu 的 Linux 发行版（服务器没有桌面版本！）来安装。通常可以在其他 Linux 发行版上安装（只要支持有效的 Node.js 版本），但需要专业知识，因为安装/维护的标准脚本和说明是针对 Debian 量身定制的 |

<sup>2</sup>这些值基于 ioBroker 系统的典型平均安装经验，该系统具有约 40 个活动适配器、Grafana 和外部数据库

<sup>3</sup>对于在 NAS 上安装，适用 Docker 下的要求，以及用于 NAS 自身任务的额外资源。

- ioBroker 可以安装在所有支持 Node.js 的系统上。
- 如果数据点被历史化（例如使用历史适配器，在系统上存储文本文件），或者如果在此基础上另外安装和运行 Influx 或 MySQL 等数据库或其他应用程序，则所需的 RAM 和存储容量会增加系统
- 选择硬件时，请注意硬件的功耗，因为ioBroker将全天候运行（24/7运行）。一年中的用电量仅几瓦的差异就很明显。