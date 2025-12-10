---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
---
# Admin

管理适配器用于配置整个ioBroker-Installation及其所有适配器。
它提供了一个Web界面，可以通过“http：//<服务器的IP地址>：8081”打开
在Web浏览器中。此适配器与ioBroker一起自动安装。

## 配置：

适配器“admin”的配置对话框提供以下设置：
![img_002](img/admin_img_002.jpg)

**IP：** 可以在此处选择“admin”Web服务器的IP地址。
可以选择不同的IPv4和IPv6地址。默认值为0.0.0.0 \。
如果您认为，0.0.0.0是无效设置，请让它留在那里，因为它
绝对有效。如果更改地址，您将能够访问Web服务器
只能通过这个地址。 **端口：** 您可以指定“admin”Web服务器的端口。
如果PC或设备上有更多Web服务器，则必须自定义端口以避免出现问题
双端口分配。 **编码：** 如果应使用安全的https协议，则启用此选项。

**身份验证：** 如果您希望使用登录名/密码进行身份验证，则应启用此复选框。
用户“admin”的默认密码是“iobroker”**缓冲区：** 加速页面加载启用此选项。
通常只有开发人员想要取消选中此选项。

## 处理：

管理员的主页包含多个选项卡。 **适配器：** 这里的实例
可以安装或删除适配器。使用更新按钮
![img_005](img/admin_img_005.jpg)
如果新版本的适配器可用，我们可以在左上角看到。
![img_001](img/admin_img_001.jpg)

显示适配器的可用和已安装版本。对于整体观看的状态
适配器是彩色的（红色=在计划中;橙色= alpha;黄色= beta）。更新版本的更新
适配器也在这里制作。如果有更新的版本，标签的字体将为绿色。
如果最后一列中的问号图标处于活动状态，您可以从那里获取包含适配器信息的网站。
可用的适配器按字母顺序排序。已安装的实例位于列表的上半部分。

**实例：** 此处列出了已安装的实例，可以进行相应的配置。如果标题
实例加下划线，您可以点击它，相应的网站将被打开。

![img_003](img/admin_img_003.jpg)

**对象：** 管理对象（例如连接硬件的设置/变量/程序）

![img_004](img/admin_img_004.jpg)

**国家：** 当前状态（对象的值）
如果安装了适配器历史记录，则可以记录所选的数据点。
已记录的数据点在右侧选择，并显示绿色徽标。

**脚本：** 此选项卡仅在安装了“javascript”适配器时才有效。

**节点红色：** 此选项卡仅在安装并启用“node-red”适配器时可见。

**主机：** 安装了ioBroker的计算机。这里可以安装最新版本的js-controller。
如果有新版本，则选项卡的字母为绿色。要搜索新版本，您必须单击更新
左下角的图标。

**枚举：** 此处列出了CCU的收藏，交易和空格。

**用户：** 这里可以添加用户。要执行此操作，请单击（+）。默认情况下有一个管理员。

**组：** 如果单击左下角的（+），则可以创建用户组。从下拉菜单中，用户被分配到组。

**事件：** 条件的运行更新列表。 **日志：** 此处显示日志在选项卡实例中显示记录的日志级别
可以设置单个实例。在选择菜单中，选择显示的最小日志级别。如果发生错误
日志的字体显示为红色。

**主机：**
安装 ioBroker 的计算机信息。可以在此更新 js 控制器的当前版本。如果有新版本，标签页的标签会显示为绿色。

**日志：** 这里显示日志 在标签实例中，可以设置单个实例的日志级别。
可以设置单个实例的日志级别。在选择菜单中，可选择显示的最低日志级别。如果发生错误 
如果出现错误，则日志显示为红色。

**系统设置
语言、时间和日期格式等全系统设置可在此处打开的菜单中进行。

![img_006](img/admin_img_006.jpg)

版本库和安全设置也可以在这里进行设置。

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Layout fix in edit object dialog

### 7.7.20 (2025-11-15)
- (@GermanBluefox) Small optimizations
- (@GermanBluefox) Allowed to upload objects via text

### 7.7.19 (2025-10-26)
- (@GermanBluefox) Updated schema location for JsonConfig

### 7.7.18 (2025-10-25)
- (@GermanBluefox) Improvement of categories: drag&drop, visibility
- (@copilot) Added missing filterFunc property to jsonConfig objectId schema to match documentation and implementation
- (@copilot, @SimonFischer04) Added extended reverse proxy example section with screenshots, limitations (admin root requirement), and adapter compatibility notes
- (@copilot, @SimonFischer04) Fixed instances page reverse proxy link mapping so adapter localLinks are rewritten to the configured proxy paths (prefix matching + web port replacement, with duplicate link collapse)
- (@copilot, @SimonFischer04) Fixed intro page reverse proxy link remapping so links are correctly rewritten immediately and after navigating away and back (load reverseProxy config before instance scan and use prefix startsWith matching)
- (@GermanBluefox) Fixed multi-selection in the select ID dialog

### 7.7.3 (2025-09-25)
- Many GUI changes: See previous changelog below for details

### 7.7.2 (2025-09-24)
- (@copilot) Fixed JSONCONFIG table validator bug where validation errors persisted after deleting table rows
- (@GermanBluefox) Made small fix for JsonConfig component `state`
- (@copilot) Fixed repository refresh issue: repositories are now automatically refreshed when switching repository source (stable/latest) without requiring manual "Check for updates"
- (@copilot) Added CSV file editing support in file browser - CSV files can now be edited directly in the file manager
- (@copilot) Implemented sortable columns for instances table (name, status, memory, ID, host, loglevel)
- (@copilot) Fixed adapter license icon linking to use commercial license URL instead of GitHub license
- (@copilot) Fixed license icon spacing in list view to maintain consistent layout
- (@GermanBluefox) Allows entering minus values with JsonConfig number component
- (@copilot) Fixed textIP checkbox inconsistency between Objects and States tabs for the same host configuration
- (@GermanBluefox) Added icon to `www` folder for windows
- (@copilot) Confirmed and documented Copilot issue handling guidelines: PRs use neutral language (no "fixes" keywords), issues closed manually by maintainers, and "fixed" labels added when appropriate
- (@copilot) Enhanced Copilot instructions to make issue management policy more prominent - no auto-closing issues, manual validation required
- (@copilot) Enhanced repository timestamp display to show both generated and read timestamps - shows when repository data was generated and when it was last read by admin backend
- (@copilot) Fixed jsonConfig port validation to properly account for bind addresses, allowing the same port on different IP addresses
- (@copilot) Added error indicators to JSON Config tabs and accordions to improve the visibility of validation errors
- (@copilot) Added export/import functionality for accordion sections in JsonConfig allowing users to save accordion data as JSON files and import them back with replace or add options
- (@copilot) Fixed time difference warning that incorrectly appeared when the browser tab was inactive for a while
- (@copilot) For GitHub-installed adapters, show version + commit hash instead of just version
- (@copilot) Fixed table export error when table items contain null values
- (@copilot) Object Browser: Added formatted duration display for values with role "value.duration" - shows time durations in HH:mm:ss format instead of raw seconds
- (@copilot) Enhanced GitHub Actions to skip tests when only README.md is changed, speeding up CI for Copilot PRs (tested with mixed file changes)
- (@GermanBluefox) Added the docker checker in JSON config
- (@copilot) Fixed js-controller update notifications to use "The js-controller" instead of "Adapter js-controller"
- (@copilot) Fixed JSONConfig sendTo jsonData attribute parser problem where backslashes (\) in text inputs caused JSON parsing errors
- (@copilot) Fixed step type behavior in chart display - "Schritte" now shows value until next point (step after) instead of step before
- (@copilot) Added all three-step type options (stepStart, stepMiddle, stepEnd) to chart display with clearer descriptions
- (@copilot) Fixed React error #62 in the Files tab caused by malformed CSS calc() function
- (@copilot) Added loading indicator to JSONConfig autocompleteSendTo component during sendTo operations
- (@copilot) Mark adapters removed from repository with "not maintained" text instead of empty version field
- (@copilot) Enhanced responsive design: modals and popups now use full screen on xs and sm breakpoints
- (@copilot) Added logout dropdown menu to user icon for improved user experience
- (@copilot) Updated OAuth2 documentation in DEVELOPER.md to include both cloud-based and direct callback approaches with clear guidance on when to use each method
- (@copilot) Only show adapters with satisfied dependencies in update all dialog
- (@copilot) Added new `readOnly` attribute for jsonEditor in jsonConfig - allows opening the editor to view JSON content without allowing modifications
- (@GermanBluefox) Reading of same instances was optimized in GUI
- (@GermanBluefox) Do not show the http page if admin is secured
- (@GermanBluefox) Show loading progress for custom tabs
- (@GermanBluefox) Fixing change of the language in the admin

## License

The MIT License (MIT)

Copyright (c) 2014-2025 bluefox <dogafox@gmail.com>