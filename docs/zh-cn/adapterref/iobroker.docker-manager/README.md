---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.docker-manager/README.md
title: ioBroker Docker 管理器适配器
hash: AVRvjIKjjeynfbQqaUN+aR3yujAFB5bKoI7uKsR9uuM=
---
![标识](../../../en/adapterref/iobroker.docker-manager/admin/docker-manager.svg)

![安装数量](http://iobroker.live/badges/docker-manager-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.docker-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.docker-manager.svg)

# IoBroker Docker 管理器适配器
![测试与发布](https://github.com/ioBroker/ioBroker.docker-manager/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/docker-manager/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 介绍
此适配器是一个用于管理 Docker 容器的图形用户界面。

它允许您直接从 ioBroker 管理界面轻松创建、启动、停止和删除 Docker 容器。

该适配器提供了一种用户友好的方式来管理您的 Docker 环境，而无需使用命令行工具。

### Docker镜像和容器的说明
Docker 是一个开源平台，用于自动化部署、扩展和管理容器中的应用程序。

容器是轻量级的、隔离的环境，其中包含运行应用程序所需的所有组件，例如代码、运行时、库和配置。

借助 Docker，开发人员可以交付一致且可移植的应用程序，而无需考虑底层基础架构。

这有助于团队协作，简化在不同系统上运行应用程序的过程，并提高可扩展性。

Docker 镜像是一个轻量级、独立且可执行的软件包，它包含了运行软件所需的一切，包括代码、运行时环境、库、环境变量和配置文件。

您可以将其视为应用程序及其依赖项在特定时间点的快照。

在 ioBroker 表示法中，它类似于一个适配器。

另一方面，Docker 容器是 Docker 镜像的运行时实例。它是一个轻量级的、隔离的环境，用于运行由 Docker 镜像定义的应用程序。

运行 Docker 镜像时，它会创建一个容器，该容器封装了应用程序及其依赖项，使其能够在不同的环境中一致地运行。

用 ioBroker 表示法来说，它类似于适配器的一个实例。

## 先决条件
- 您的系统需要安装并运行 Docker。
运行 ioBroker 进程的用户必须拥有访问 Docker 守护进程的权限。通常的做法是将用户添加到 `docker` 用户组。或者，也可以直接调用 `iob fix` 命令来设置权限。

如何安装 Docker
- 有关安装说明，请参阅 Docker 官方文档：https://docs.docker.com/get-docker/
安装 Docker 后，请确保 Docker 服务正在运行。您可以使用以下命令检查 Docker 服务的状态：
- 在 Linux 系统上：`systemctl status docker`
- 在 Windows 和 macOS 系统上，Docker Desktop 应该正在运行。

## 使用 Docker API
该适配器可以使用 Docker API 与其他主机上的 Docker 守护进程通信。要启用此功能，您需要将 Docker 守护进程配置为监听 TCP 套接字。

### 在 Linux 上启用 Docker API
1. 打开 Docker 服务配置文件。该文件的位置可能因 Linux 发行版而异。常见位置包括：
- `/lib/systemd/system/docker.service`
- `/etc/docker/daemon.json`
- `/etc/systemd/system/docker.service`
2. 如果该文件是 `/etc/docker/daemon.json`，请添加或修改 `hosts` 条目以包含 TCP 套接字。例如：

```json
{
    "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}
```

如果该文件是 systemd 服务文件（例如，`/lib/systemd/system/docker.service`），请修改 `ExecStart` 行，使其包含 `-H tcp://0.0.0.0:2375` 选项。例如：

```
ExecStart=/usr/bin/dockerd -H fd:// -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock
```

3. 保存更改并退出编辑器。
4. 重启 Docker 服务以应用更改：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

5. 运行以下命令验证 Docker 守护进程是否正在监听 TCP 套接字：

```bash
netstat -tuln | grep 2375
```

## 待办事项
BackItUp 应该支持 `/opt/iobroker/docker-volumes`
- 考虑一下 js-controller 是否会移除不再使用但仍带有标签的 Docker 组件
- Docker 安装程序：`iob docker <移除>`
- 进度指示器：添加/拉取镜像，创建容器

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 0.1.3 (2025-10-15)

- (@GermanBluefox) Updated packages

### 0.1.2 (2025-10-09)

- (@GermanBluefox) Added volume browsing
- (@GermanBluefox) Added text file read from volume

### 0.1.1 (2025-09-26)

- (@GermanBluefox) Added network tab

### 0.0.3 (2025-09-17)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>