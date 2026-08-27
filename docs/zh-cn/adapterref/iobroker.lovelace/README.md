---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: 4G4upW+1HwUgzb8VJT9mbK15u5J0x90mW5PcDJEzVQs=
---
![标识](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![安装数量](http://iobroker.live/badges/lovelace-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![测试与发布](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 Lovelace 适配器
借助此适配器，您可以使用 Home Assistant Lovelace UI 为 ioBroker 构建可视化界面。

## 文档
* 📘 [英文文档](docs/en/README.md)
* 📗 [德语文档](docs/de/README.md)

文档涵盖配置（自动/手动实体）、面板和特殊实体（警报、定时器、天气、地图、视频等）、自定义卡片、主题、图标、通知、语音控制和故障排除。

＃＃ 发展
### 洛夫莱斯的原始资料
使用的源代码在这里：https://github.com/GermanBluefox/home-assistant-polymer 。

### 待办事项
安全权限必须从当前用户获取，而不是从默认用户获取。

＃＃＃ 版本
使用的 home-assistant-frontend 版本为 20260527.7，浏览器模块版本为 2.13.5

### 如何构建新版 Lovelace
首先，必须**手动**将 https://github.com/home-assistant/frontend（开发分支）合并到 https://github.com/GermanBluefox/home-assistant-polymer.git（***iob*** 分支！）。

ioBroker 的所有更改均以注释 `// IoB` 标记。

截至目前（20260527.1），以下文件已被修改：

- `build-scripts/gulp/app.js` - 添加新的 gulp 任务 develop-iob
- `build-scripts/gulp/rspack.js` - 添加新的 gulp 任务 rspack-dev-app
- `build-scripts/rspack.cjs` - 禁用生产构建中的源映射以减少生成的文件数量。
- `src/data/icons.ts` - 暂时保留旧图标。
- `src/data/weather.ts` - 添加从 URL 显示天气图标的支持。
- `src/dialogs/more-info/const.ts` - 如果是图片，则移除天气状态和历史记录
- `src/dialogs/more-info/ha-more-info-dialog.ts` - 移除实体设置按钮和选项卡
- `src/dialogs/more-info/ha-more-info-history.ts` - 移除历史记录中的“显示更多”链接
- `src/dialogs/more-info/ha-more-info-logbook.ts` - 移除日志簿中的“显示更多”链接
- `src/dialogs/more-info/controls/more-info-weather.ts` - 添加从 URL 显示天气图标的支持。
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - 禁用语音助手配置
- `src/entrypoints/core.ts` - 添加无身份验证选项
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - 添加从 URL 显示天气图标的支持。
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - 添加支持通过身份验证从 URL 显示天气图标。
- `src/panels/lovelace/hui-root.ts` - 添加了通知按钮，禁用了管理仪表盘链接，隐藏了添加（设备/自动化/区域/人员）按钮，打开了 Lovelace 看板的编辑面板对话框，并从 hass.panels 获取实时仪表盘标题
- `src/layouts/hass-router-page.ts` - 防止在重建期间 updatePageEl 出现未定义的路由（面板重命名崩溃）。
- `src/panels/config/dashboard/ha-config-dashboard.ts` - 隐藏设置部分（自动化、应用程序、语音助手、系统、人员、提示）。
- `src/panels/config/ha-panel-config.ts` - 隐藏设备和服务中的集成选项卡，将设备和服务磁贴放置在 /config/devices 上。
- `src/panels/config/developer-tools/ha-panel-developer-tools.ts` - 从开发者工具中移除 yaml、events 和 assist 选项卡。
- `src/panels/config/developer-tools/developer-tools-router.ts` - 默认使用状态选项卡（yaml 已移除）。
- `src/panels/config/info/ha-config-info.ts` - 隐藏 about 中的 doc/credits/community/license 链接（保留键盘快捷键）。
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - 在内置仪表盘列表中显示固定面板（包括 browser-mod）。
- `src/panels/profile/ha-panel-profile.ts` - 隐藏用户配置文件中的安全选项卡。
- `src/util/documentation-url.ts` - 用于链接到 iobroker 帮助而不是 home assistant。
- `src/html/index.html.template` - 移除 HA iOS 应用的 Safari 智能应用横幅（apple-itunes-app meta）（#418）。
- `.husky/pre-commit` - 移除 git 提交钩子。

之后，检出`./build`文件夹中的修改版本。然后。

1. 进入 ./build 目录。
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` 是 https://github.com/home-assistant/frontend.git 的一个分支，但有些内容被修改了（参见前面的文件列表）。
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. 使用 `gulp build-app` 构建发布版本，或使用 `gulp develop-iob` 构建调试版本。修改后，可以使用 `webpack-dev-app` 加快构建速度，但最终版本准备就绪后，仍然需要运行 `build-app`。
7. 在适配器仓库中运行脚本 `hass_frontend/static_cards/newFrontend.sh` 以更新前端（假设这两个仓库位于同一文件夹中，如果不是，请调整脚本，最好添加一些参数处理并提交 PR，谢谢 :smile: ）
8. 运行 `gulp rename` 任务。
9. 更新 `README.md` 中的版本。

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### **WORK IN PROGRESS**
* (Garfonso/Claude) History and logbook no longer show duplicate adjacent entries when the history backend re-logs unchanged values (e.g. InfluxDB "still record the same values"). (#711)
* (Garfonso/Claude) Docs: added a complete near-default theme example that removes the bell. (#705)
* (Garfonso/Claude) Energy/statistics graphs no longer draw a phantom line into the future when the requested range ends after now (e.g. InfluxDB carrying the last value forward).
* (Garfonso/Claude) Use the adapter's own timers (auto-cleaned on stop) and added the missing Russian translation for one setting. (#712)

### 6.1.1 (2026-06-25)
* (Garfonso/Claude) Fixed a crash (adapter restart loop) when a room enum has no name; the area list no longer brings the adapter down.
* (Garfonso/Claude) Custom dialog: device classes are sorted with clearer labels (id + unit), missing classes were added, device/state class can be cleared, and `has_time`/`has_date` no longer cause spurious "unsaved changes".
* (Garfonso/Claude) Auto-detected temperature/humidity/illuminance sensors now report `state_class: measurement` (for HA statistics).
* (Garfonso/Claude) Custom dialog: device class is suggested from the state's unit, and state class from the unit, when unambiguous.

### 6.1.0 (2026-06-23)
* (Garfonso/Claude) Remove HA-App Banner on iPhone (#418).
* (Garfonso/Claude) New manual entity types `device_tracker` and `person` to show presence/GPS on the map, with object pickers for the presence and location states.
* (Garfonso/Claude) Manual `cover` entities can now be configured with object pickers (e.g. an automatic window), reusing the full cover logic.
* (Garfonso/Claude) Reorganized the user documentation into matching English and German pages under `docs/en` / `docs/de` (entities, cards & UI, features), linked from the README; development/build notes stay in the README.
* (Garfonso/Claude) Fixed history/logbook stopping to load after a while (a hung history request could permanently block all following ones).
* (Garfonso/Claude) Manual `lock` and `media_player` entities can now be configured with object pickers for their states.
* (Garfonso/Claude) Vacuum cleaners are now supported (auto-detection + manual object pickers): start/stop/pause, fan speed and battery.
* (Garfonso/Claude) New manual entity types `humidifier` and `water_heater`, configurable with object pickers.
* (Garfonso/Claude) Manual `light` and `climate` (thermostat) entities can now be configured with object pickers (brightness/colour/temperature, target/mode/…), reusing the full converters.
* (Garfonso/Claude) Fixed room and function being swapped in the auto-generated name of advanced lights.
* (Garfonso/Claude) Manual `device_tracker`/`person` entities can get a picture (entity_picture) from a fixed URL or a state, plus a battery level and (device_tracker) a source type.
* (Garfonso/Claude) More manual-entity options: cover tilt open/close/stop, light white/RGBW/CIE colour states, sensor state class, humidifier device class.
* (Garfonso/Claude) Manual `fan` entities now have object pickers (on/off, speed/preset, oscillation, direction).
* (Garfonso/Claude) Vacuum can show its map (URL or base64 state) as the entity picture.
* (Garfonso/Claude) Removed `plant`, `weblink` and `history_graph` from the manual entity types (no longer Home Assistant entity domains).

### 6.0.4 (2026-06-18)
* (Garfonso/Claude) Bound the number of history points fetched per request, so a large history graph can no longer overload the states database.
* (Garfonso/Claude) Manual entities on `system.*`/`script.*` objects (e.g. a JavaScript adapter state) no longer disappear after a restart. (#709)
* (Garfonso/Claude) Manual entities now honor the friendly name and icon set via the frontend's entity settings, and editing them no longer briefly reverts the change.

### 6.0.3 (2026-06-18)
* (Garfonso/Claude) Manually mapped objects outside `alias.0` no longer disappear after a restart when "only generate from alias" is active. (#704)
* (Garfonso/Claude) Limit concurrent history requests to avoid overloading the states database connection.
* (Garfonso/Claude) Fixed a crash in the map card caused by history updates without attributes.
* (Garfonso/Claude) Removed the browser tab title setting; set the dashboard title instead.
* (Garfonso/Claude) Calendar card no longer flickers/reloads in a loop when the calendar source updates frequently.

### 6.0.2 (2026-06-17)
* (Garfonso/Claude) Reduced object-database load (skip our own internal objects, yield during processing) and removed leftover debug logging.
* (Garfonso/Claude) browser_mod re-applies its settings (e.g. hidden sidebar) after a browser registers, so it no longer needs an F5 (hopefully).
* (Garfonso/Claude) Above ~50 referenced states the adapter subscribes to all states at once and filters itself, to reduce database load.
* (Garfonso/Claude) Statistics history is fetched in pages, so a large energy/history request can no longer overload the states database.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2019-2026, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.