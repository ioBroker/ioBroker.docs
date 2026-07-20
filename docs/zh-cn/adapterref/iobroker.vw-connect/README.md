---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: cZy9mvENELEPraB4OeA9M82LjH4f5jvYy2a4xQAigak=
---
![标识](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![依赖状态](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![已知漏洞](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## IoBroker 的 vw-connect 适配器
适用于大众 We Connect、We Connect ID、We Charge、myAudi、斯柯达 Connect、西雅特 Connect 和 We Connect Go 的适配器

请将您的系统更新至 Node 10。

<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Kurzfassung（2026 年六月展位）
VW hat den klassischen App-Login for **VW ID、CUPRA 和 SEAT** abgeschaltet。 Für diese Marken funktionieren nur noch zwei Wege — beide unten konfigurierbar, lassen sich auchparallel laufen:

- **欧盟数据法案门户** — kostenlos，läuft automatisch nach einmaliger Browser-Aktivierung im Portal，liefert einDetailliertes Datenpaket aber **nur alle** und ist in der Praxis **unzuverlässig**：das Auto liefert nur Daten wenn es gerade aktiv ist（fahren、laden、 Klima），parkende Autos erzeugen leere 数据集。 5xx-Aussetzer 之后的 Portal 本身。
- **Tibber 数据 API (empfohlen)** — kostenlos、**liefert aktuelle Werte**（SoC、Reichweite、Lade-Status）。 **Man muss kein Tibber-Stromkunde sein**，nur einen Tibber-Account in der App anlegen。 Beim Anlegen verlangt die App eine deutsche Adresse — die muss **nicht korrekt sein**, irgendeine plausible Straße/PLZ reicht.在 <https://data-api.tibber.com/clients/manage> registrieren 下应用程序和 einen OAuth-Client 中的 Dann das Fahrzeug（详细信息请参见 Adapter-UI）。

Für die anderen Marken（奥迪、MyŠKODA、Seat Elli、ŠKODA Powerpass、Audi DataPlug、ŠKODA Alt、VW Connect Go）经典登录功能。

## VW ID：欧盟数据法案门户网站现在是唯一的数据来源（自 2026 年 6 月 1 日起）
大众汽车已于**2026年6月1日**停用经典的VW-ID OAuth客户端（`a24fba63-...`）。位于`identity.vwgroup.io/oidc/v1/authorize`的身份提供商(IdP)会针对该客户端返回HTTP 403错误，并显示Auth0“租户配置错误”页面；位于`emea.bff.cariad.digital/auth/v1/idk/oidc/authorize`的BFF镜像也会执行相同的操作。其他品牌客户端（奥迪`cc29b87a-...`、斯柯达`3ea88bf9-...`、西雅特/Cupra `f85e5b69-...`、大众乘用车欧盟数据法案`9b58543e-...`）不受影响。

对于 `config.type === "id"`，适配器现在完全跳过了传统的登录方式，而是依赖于 **Tibber 数据 API（推荐）** 或欧盟数据法案门户网站。**您必须至少设置其中之一，否则数据流将无法建立。** 请参阅下方的“Tibber 数据 API”和“欧盟数据法案门户网站”部分。

## Cupra / SEAT：经典登录方式已禁用（自 2026 年 6 月 10 日起）
Cupra/SEAT OLA 后端（`ola.prod.code.seat.cloud.vwgroup.com`）大约在 2026 年 6 月开始强制使用 **Play Integrity** 提供商的 **Firebase 应用检查**。现在每个 API 调用都需要一个 `X-Firebase-AppCheck` 标头。反编译的 MyCupra 2.18.0 APK 证实：OkHttp 拦截器（`es.seat.ola.attestation.interceptor.AppCheckInterceptor`，Firebase 项目 `ola-apps-prod`，应用 ID `1:530284123617:android:9b9ba5a87c7ffd37fbeea0`）会自动附加该令牌。如果没有该令牌，服务器将返回 `403 Forbidden device detected, missing-device-token`。

Play 完整性令牌由 **Google Play 服务在真实的 Android 设备上使用已注册的 APK 签名证书 SHA-256 生成**。Node.js 适配器无法生成这些令牌——目前没有已知的绕过方法。

对于 `config.type === "seatcupra"` 和 `"seat"`，适配器现在跳过了传统的登录步骤。**请改用 Tibber 数据 API（推荐）或欧盟数据法案门户网站**——两者仍然适用于 Cupra 和 SEAT 车辆。请参阅以下章节。

## 可选：欧盟数据法案门户网站作为附加数据源（自 v0.9.0 起）
对于大众集团旗下所有品牌（大众、奥迪、斯柯达、西雅特、Cupra），该适配器**还可以**使用大众通过欧盟数据法案门户网站（<https://eu-data-act.drivesomethinggreater.com>）发布的连续15分钟数据集。这是**可选的**——传统的品牌专属登录方式才是主要数据源，并且可以独立运行。欧盟数据法案路径会在每个数据集中添加数百个额外的数据点（主要是诊断、配置和报告字段），这些数据点位于`<vin>.statuseudata.*`（蛇形命名法，以点号结尾，例如`battery_state_report.soc`、`mileage.value`、`parking_brake`、`charging_state_report.current_charge_state`）。

同一个门户网站服务于所有品牌——只有 OIDC 品牌密钥不同。适配器会根据您配置的 `type` 选择正确的密钥：

| 适配器 `type` | 欧盟数据法案品牌 |
| `VW ID / Volkswagen App` | `VOLKSWAGEN_PASSENGER_CARS` |
| `Audi E-tron`, `Audi DataPlug` | `AUDI` |
| `MyŠKODA`, `ŠKODA Alt` | `SKODA` |
| `My SEAT` | `SEAT` |
| `My CUPRA` | `CUPRA` |
| “我的 CUPRA” | '库普拉' |

要启用此功能，您必须**在浏览器中**设置一次持续数据请求；适配器仅下载门户网站生成的数据，无法为您创建请求。如果您跳过此步骤，适配器仍然可以正常工作，只是欧盟数据法案相关的日志中不会有任何记录。

### 设置数据请求（一次性，在浏览器中）
1. 打开 <https://eu-data-act.drivesomethinggreater.com/> 并**使用您的品牌专属帐户登录**（您在 Volkswagen / myAudi / MyŠKODA / SEAT Connect / MyCUPRA 应用程序和此适配器的设置中使用的电子邮件/密码相同）。
2. 转到**数据集群→车辆概览**。
3. 如果您的车辆识别码 (VIN) 尚未列出，请点击“连接您的车辆”，然后按照屏幕上的配对/同意步骤进行操作。
4. Klicke **Benutzerdefinierte Daten anfragen**（“获取定制数据”）。门户网站的说明：您可以将数据设置为活动状态。
5. **Vereinbarung gemäß Artikel 4 EU Data Act** ankreuzen（“Ich bestätige, dass ich die Vereinbarung gemäß Artikel 4 EU Data Act gelesen und akzeptiert habe。”）→ **Weiter**。
6. **数据集群 auswählen**：**所有数据** anhaken（“所有欧盟数据法相关数据点”）。 Andere Cluster nur wenn du gezielt einschränken willst - 仅选择一些限制“<vin>.statuseudata.*”将包含的内容。
7. **数据包名称** vergeben (frei wählbar, z.B.“ioBroker”)。 Erscheint später als `_dataset_name`-den 文件名中的前缀。
8. **频率**：**全部 15 分钟**。 Andere Optionen (täglich) liefern nicht genug Auflösung für Live-Werte。
9. **Dauer**：**Kein Enddatum**（fortlaufend ohne Enddatum）。
10. 请求未收到。数据集通常会在 **15 分钟到几小时后** 开始出现。第一批数据可能显示为 `*_no_content_found.zip`，直到您的车辆唤醒为止。通过大众汽车应用程序强制同步或行驶一次即可唤醒生产者端。

适配器会自动接收请求——无需在 ioBroker 中进行额外设置。只要 `type` 等于 `VW ID / Volkswagen App` 且您的凭据与门户匹配，它就会每分钟轮询一次列表，并且仅在出现新的 ZIP 文件时才下载。

欧盟数据法案生效后，每个车辆识别码 (VIN) 的对象树：

```text
<vin>.general.vin
<vin>.general.nickname
<vin>.general.licensePlate
<vin>.general.imageLocation
<vin>.statuseudata.battery_state_report.soc          (= 58 %)
<vin>.statuseudata.battery_state_report.charge_power (= 0.0 kW)
<vin>.statuseudata.charging_state_report.current_charge_state
<vin>.statuseudata.mileage.value
<vin>.statuseudata.parking_brake
<vin>.statuseudata.locked
<vin>.statuseudata._dataset_name
<vin>.statuseudata._dataset_created_on
... and many more (depending on the Data Clusters you ticked on the portal)
```

### 故障排除（仅限欧盟数据法案——这些不会阻碍常规流程）
- **“欧盟数据保护法……未配置数据请求”**：您尚未完成上述门户端设置。在此期间，传统登录方式仍然有效。
- **`portal 有 N 个数据集，但全部显示为“_no_content_found”**：车辆在每个采样时段都处于休眠状态。请通过大众汽车应用程序强制同步车辆，或者行驶一次。
- **`<vin>.statuseudata` 通道缺失**：门户网站尚无内容数据集 — 解决方法与上述相同。
- **激活后立即出现 HTTP 400 错误**：门户网站仍在处理您的数据请求。几个小时后会自动恢复。
- **过时值**：门户网站会将多个报告快照合并成每个数据集的一个扁平数组。如果同一字段多次出现且值不同，适配器会确定性地选择 UUID 最小的条目（刷新后仍然稳定——与 Home Assistant 集成采用的方法相同）。
- **参考实现**（Home Assistant，Python）：<https://github.com/mikrohard/hass-vw-eu-data-act>

＃＃ 用法
使用远程控制状态下的设置，即可远程控制您的车辆。

正常刷新是指从大众汽车集团 (VAG) 云平台接收数据的轮询间隔。强制刷新适用于非电动汽车，用于强制刷新数据。此刷新次数由大众汽车集团 (VAG) 限制，直至车辆再次启动。

行程数据仅适用于非电动汽车。

您可以在 .climate.settings.targetTemperature.content 中设置气候温度。

## 讨论和提问
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## 状态字段说明
### 条目列表
```

```

### 0.9.6 (2026-06-27)
- 欧盟数据解析能力提升

### 0.9.5 (2026-06-13)
- Cupra 应用登录已禁用

### 0.9.4 (2026-06-06)
- 添加 Tibber 支持

### 0.9.3 (2026-05-31)
- 改进 eudata 获取

### 0.9.2 (2026-05-31)
- 为 Seat、Skoda 和 Audi 添加 eudata 获取支持
- 改进 eudata 获取

### 0.9.1 (2026-05-30)
- 修复大众和奥迪的正常登录问题
- 添加可选的欧盟数据法案门户数据流

### 0.8.8 (2026-05-28)
- 修复奥迪和大众登录问题

### 0.8.7 (2026-05-27)
- 修复奥迪登录问题

### 0.8.6 (2026-05-27)
- 修复登录ID

### 0.8.5 (2026-05-24)
- 修复 Cupra

### 0.8.4 (2026-05-14)
- 禁用斯柯达 MQTT

### 0.8.3 (2026-05-10)
- 修复斯柯达 MQTT

### 0.8.1 (2026-05-06)
- 修复斯柯达 MQTT

### 0.8.0 (2026-04-13)
- 修复 Seat Cupra

### 0.7.16 (2026-03-18)
- 修复 MySkoda MQTT 连接

### 0.7.15 (2025-11-26)
- 修复大众汽车刷新令牌

### 0.7.14 (2025-11-25)
- 修复大众汽车ID登录问题

### 0.7.13 (2025-11-09)
- 修复斯柯达登录问题

### 0.7.12 (2025-05-05)
- 修复了斯柯达刷新令牌的问题
- 修复通风系统启动问题
- 添加新的不支持的端点

### 0.7.9 (2025-03-20)
- 修复了墙式充电器的 ID 问题

### 0.7.7 (2025-03-02)
- 修复斯柯达辅助加热和持续时间问题
- 修复斯柯达车门锁/解锁问题

### 0.7.6 (2025-02-28)
- 修复了仅在启动时更新充电状态的问题
- 修复斯柯达 ismoving 状态

### 0.7.3 (2025-02-26)
- 修复了 setTemperature 的问题
- 修复斯柯达解锁锁问题

### 0.7.0 (2025-02-25)
- 斯柯达和西雅特车型的修复方案
- 状态结构已完全更改，请删除对象下的旧状态。

### 0.6.1 (2024-10-01)
- 修复斯柯达登录问题

### 0.6.0 (2024-04-11)
- 添加额外的 Cupra 状态

### 0.5.4 (2024-03-17)
- 修复门窗状态

### 0.4.1
- 修复大众汽车状态更新

### 0.0.65
修复 Cupra 登录问题

### 0.0.63
- 修复大众/斯柯达 etron 登录问题

### 0.0.62
修复奥迪etron登录问题

### 0.0.61
- 修复 ID 登录问题

### 0.0.60
- 一些小改进。WeCharge 的最小充电间隔现在为 15 分钟。

### 0.0.55
- 修复 ID 状态更新

### 0.0.51
- 修复奥迪etron登录问题

### 0.0.48
- 修复登录问题，修复音频更新问题，增加 Wallbox 的使用限制

### 0.0.43
- 增加刷新令牌超时时间

### 0.0.42
- 修复斯柯达登录问题

### 0.0.40
- 为新款车型添加气候控制v3功能。添加Powerpass和Seat Elli功能。

### 0.0.39
- 修复登录ID

### 0.0.36
- 添加对斯柯达 Enyaq 的支持

### 0.0.35
- 添加对 NodeJS v10 的兼容性

### 0.0.34
- 添加自动接受新隐私同意的功能

### 0.0.32
- 正确选择最近几次旅行

### 0.0.31
- 启用多种行程类型的选择

### 0.0.30
- 修复多车问题，添加 VWv2 模式，目前 VW 和 VWv2 之间没有区别。

### 0.0.29
- 修复斯柯达 refreshToken 问题，以及其他一些小改进

### 0.0.26
- 修复错误

### 0.0.25
- 另加费用

### 0.0.24
- 添加远程状态更新

### 0.0.23
- 新增座椅和新的空调系统 v2

### 0.0.22
- 计算斯柯达和奥迪的室外温度（单位：摄氏度）

### 0.0.21
- 添加 ID 的远程控制

### 0.0.20
- 修复audi登录问题，添加ID登录

### 0.0.19
- 将状态对象按 ID 而不是连续数字保存到状态中

### 0.0.18
- 修复 2020 款车型的电池状态显示问题

### 0.0.17
- 增加对 2020 款机型的支持

### 0.0.16
- 修复 js.controller 3 的问题

### 0.0.11
- 修复奥迪车辆多车故障
- 如果功能不可用，则隐藏状态更新错误

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.