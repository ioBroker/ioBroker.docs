---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.telegram-menu/README.md
title: ioBroker.telegram菜单
hash: 2ZoGnQ+X7mp0FZjZvnbaziNVHWjl3jAbMcjBrz7Gwu4=
---
![标识](../../../en/adapterref/iobroker.telegram-menu/admin/telegram-menu.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.telegram-menu.svg)
![下载](https://img.shields.io/npm/dm/iobroker.telegram-menu.svg)
![安装数量](https://iobroker.live/badges/telegram-menu-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/telegram-menu-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.telegram-menu.png?downloads=true)

# IoBroker.telegram 菜单
![测试和发布](https://github.com/MiRo1310/ioBroker.telegram-menu/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告的使用从 js-controller 3.0 开始。

## IoBroker 电报菜单适配器
轻松创建电报菜单

您可以创建具有单独菜单的不同组，然后将用户分配给这些组。

**如果您喜欢它，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## 文档
[🇺🇸 文档](./docs/en/README.md)

[🇩🇪 文档](./docs/de/README.md)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- FIX: #338 Exchange value does not work in newline

### 2.4.3 (2025-06-05)

- FIX: #332 Copy dropdown
- FIX: SetDynamicValue 
- FIX: Change value in getStatus

### 2.4.2 (2025-05-26)

- FIX: Error returnText is empty

### 2.4.1 (2025-05-26)

- Fix some errors and update tests

### 2.4.0 (2025-05-24)

- FEAT: Extension for get by function 
- FIX: Errors reported by sentry

### 2.3.1 (2025-05-20)


- FIX: #309 SetState only sets false
- FIX: #311 Delete does not navigate

### 2.3.0 (2025-05-12)

- FIX: #303 GetState output in incorrect order
- FIX: #296 Frontend fixes
- FIX: #295 Delete button not working
- FIX: #291 Menu button not working
- FEAT: Nodejs >= 20.0.0
- FEAT: Add sentry
- FEAT: Add mocha tests

### 2.2.4 (2025-04-13)

- FIX: #279 Backslash is in the message when using newline

### 2.2.2 (2025-03-20)

- FIX: Style and update dependencies

### 2.2.1 (2025-01-12)

- FIX: Infinite loop on open events
- FIX: #248 Error converting time

### 2.2.0 (2025-01-02)

- FEAT: #237 Navigate by nav-button-click to action
- FIX: Cannot get value false in return text
- FIX: Delete row in Actions
- FIX: HttpRequest
- FEAT: Navigation styling and selectable menus

### 2.1.10 (2025-01-02)

- FIX: Return text for menus was not send

### 2.1.9 (2025-01-01)

- FIX: #224 Submenu trigger

### 2.1.7 (2024-12-08)

- FIX: #220 Delete button doesn´t work
- FEAT: Styling

### 2.1.6 (2024-12-04)

- FEAT: Styling

### 2.1.5 (2024-12-04)

- CHORE: Update dependencies
- FIX: #211 No input is possible
- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 2.1.4 (2024-11-23)

- FIX: #203 Scrolling in table

### 2.1.3 (2024-10-21)

- FIX: User checkbox error message
- FEAT: #194 Styling

### 2.1.2 (2024-10-18)

- FIX: Different telegram instances cannot be selected
- FIX: Cannot set values in setState
- Styling

### 2.1.1 (2024-10-16)

- FIX: Adapter ui cannot be loaded

### 2.1.0 (2024-10-15)

- FIX: #191 No picture can be send
- FEAT: #175 Copy function in Action, Renamed Switch to Toggle
- FIX: #176 Error in setDynamic value
- FIX: #181 Required values in setState

### 2.0.0 (2024-08-11)

- Js-controller >=5.0.19 is required
- FIX: Colors in triggerOverview
- FIX: #154 #152 Import config from file
- Delete messages adjusted

### 1.7.4 (2024-06-24)

- FEAT: #160 Expand setDynamicValue

### 1.7.3 (2024-06-22)

- FIX: Multi-user fixed
- FIX: #159 Functions fixed

### 1.7.2 (2024-06-17)

- FIX: #158 Telegram-menu connection
- FIX: #155 DynSwitch

### 1.7.1 (2024-06-10)

- FIX: Delete Messages
- FIX: Add new row in action
- FIX: Error setState "value.includes is not a function"
- FIX: #144 Add new feature in setState: Now it is possible to set a static Value with a dynamic Value from id

### 1.7.0 (2024-05-11)

- Switched to "Typescript"

### 1.6.3 (2024-02-27)

- FIX: Bug in copy card fixed
- FIX: #104 HTTP Request Beta
- FIX: #111 status Value in dynamicSwitch
- FIX: #112 change value
- FIX: Bug in copy card fixed
- FIX: #104 HTTP Request Beta
- FIX: #111 status Value in dynamicSwitch
- FIX: #112 change value
- **_Change!!!_** menu:deleteAll removes automatic Request Ids which are older than 48h from list. The list is
  completely deleted once during the update
- FIX: menu:number with negativ Values, see the documentation
- FIX: menu:number with negativ Values, see the documentation

### 1.6.2 (2024-01-07)

- FIX: #102 **_Breaking Change!!!_** menu:dynSwitch with decimal numbers, if you use it, you have to adjust the function
  manually. For more information, see the documentation
- FIX: #106 **_Breaking Change!!!_** fixed change `{status:'id':'ID':true}` has now a new parameter, check docs
- FIX: #107 one line menu without workaround
- FIX: #103 scrollbar in Navigation and Action
- FIX: #102 **_Breaking Change!!!_** menu:dynSwitch with decimal numbers, if you use it, you have to adjust the function
  manually. For more information, see the documentation
- FIX: #106 **_Breaking Change!!!_** fixed change `{status:'id':'ID':true}` has now a new parameter, check docs
- FIX: #107 one line menu without workaround
- FIX: #103 scrollbar in Navigation and Action
- Small visual changes in actions for small screens
- FIX: Checkbox send menu after restart in settings
- FIX: #94 Menu:number with Float Numbers fixed
- FIX: Checkbox send menu after restart in settings
- FIX: #94 Menu:number with Float Numbers fixed
- Trigger Info - Overview of all menus and users, only visual but without functions
- Remaining text reattached

### 1.6.1 (2023-12-27)

- FIX: Shoppinglist
- FIX: Shoppinglist

### 1.6.0 (2023-12-26)

- Json Table in combination with the alexa-shoppinglist adapter can remove items
- Json Table without Head
- FIX: Menu:back
- Json Table in combination with the alexa-shoppinglist adapter can remove items
- Json Table without Head
- FIX: Menu:back
- Possibility to stop sending Menu after restart (after save)

### 1.5.1 (2023-12-20)

- No Icons in events condition
- FIX: Copy events and echarts
- Moveable DropBox
- No Icons in events condition
- FIX: Copy events and echarts
- Moveable DropBox

### 1.5.0 (2023-12-19)

- FIX: #92 send echarts
- FIX: #93 Scrollbar in Menus
- FIX: #89 go back to menu by setting setDynamicValue
- Delete all Messages by Bot
- FIX: #92 send echarts
- FIX: #93 Scrollbar in Menus
- FIX: #89 go back to menu by setting setDynamicValue
- Delete all Messages by Bot

### 1.4.0 (2023-12-16)

- #88 Menu with dynamic Values
- #87 Event opens a menu

### 1.3.0 (2023-12-13)

- insert Dynamic Values

### 1.2.3 (2023-12-12)

- small fixes
- Menu Entrys will sorted by Name

### 1.2.2 (2023-12-11)

- style fix and Helper Card texts expanded

### 1.2.1 (2023-12-11)

- fix in parse_Mode SetState

### 1.2.0 (2023-12-10)

- textarea in Helper Card
- text table from Json
- It is now possible to copy rows into the same menu
- small fixes
- fixed parse_mode in submenu
- get json as inline-Keyboard Table

### 1.1.0 (2023-12-08)

- confirm the set and not processed state
- fixed User checkbox check
- new Icons
- Error by Starting with new Values of Ack and Parse_mode
- #85 bindings
- added {time} to Navigation
- #82 Get Location
- #85 get state.ls oder state.ts from a state and converts to a local time
- #81 get Status of more than one ID
- #83 New line in Text
- fixed menu:number

### 1.0.1 (2023-12-06)

- fixed Error read UserList
- remove ack:true and ack:false from Confirm Message, and create a checkbox for it
- parse-Mode HTML

### 0.9.3 (2023-12-04)

- fixed scrolling
- values changed to value not icon
- fixed save Value from HelperCard
- changeValue extends
- small fixes
- it is now possible to mark text in draggable rows

### 0.9.2 (2023-11-26)

- fixed error when the Adapter starts
- Drag & Drop in Action Card

### 0.9.0 (2023-11-26)

- React UI with more features
- #75 fixed add new row in Action and edit it

### 0.8.7 (2023-11-25)

- React UI with more features

### 0.8.6 (2023-11-21)

- fixed change and set value

### 0.8.5 (2023-11-10)

- fixed, menu:back in Subnavigation

### 0.8.4 (2023-11-08)

- round values in getState
- fixed, rename menuname
- fixed calling submenus in subordinate menus
- convert type values to type of target ID

### 0.8.3 (2023-10-23)

- fix, step smaller than 1 in submenu number and percent
- global fixes in submenu

### 0.8.2 (2023-10-22)

- fix {status:...}

### 0.8.1 (2023-10-22)

- hotfix, submenu switch

### 0.8.0 (2023-10-22)

- text blocks created as a selection list, including the selection of the ID
- text in submenus is now editable in the textfield in the navigation
- set ID by open a menu
- get status
- small fixes

### 0.7.2 (2023-10-15)

- submenu Number fixed
- text is lost when editing #63
- convert milliseconds value to a local time specification
- setstate and get result of another state with text adjusted

### 0.7.1 (2023-10-02)

- bugfix, Error read UserListTypeError: Cannot read properties of undefined

### 0.7.0 (2023-10-01)

- #53 feature: sendPicture von server-path
- #52 icons are missing, copy data
- #51 by creating a new Menu, the Users are not shown

### 0.6.10 (2023-09-23)

- bug fix

### 0.6.9 (2023-09-23)

- Rearranging listed actions #49
- when calling up the submenu, Text was send no entry found, fixed
- bug switch menu, fixed
- set a state, and receive the change of another state

### 0.6.8 (2023-09-16)

- chatId in UI
- trigger is not displayed when editing, fixed

### 0.6.7 (2023-09-05)

- fixed, send menu with error

### 0.6.6 (2023-09-03)

- add info-big.png

### 0.6.5 (2023-09-01)

- get user by chatID and send back to this chatID

### 0.6.4 (2023-08-20)

- Trigger check, used triggers are no longer available in action, in nav it is visualized that the trigger is already in
  use

### 0.6.3 (2023-08-17)

- user check, least one user must be checked

### 0.6.2 (2023-08-14)

- Active Menu Output fixed
- change instance, user will be load from new instance

### 0.6.1 (2023-08-13)

- bug fixed style

### 0.6.0 (2023-08-13)

- checkbox for Telegram Users
- styling
- small fixes
- Add Row Button in Nav for every Row
- More Groups with the same User
- Trigger generates without saving

### 0.5.1 (2023-08-05)

- sent to the wrong instance, fixed

### 0.5.0 (2023-08-05)

- trigger avoid duplicate entries and sort alphabetical
- adapter stops responding after some time, fixed #42
- generate Trigger in Action, fixed
- math value for getstate
- settings instance #41, menus, fixed
- no spellcheck for input fields
- menu go back to last Sides

### 0.4.2 (2023-07-30)

- menu switch ersetzt menu yes-no, on-off, it is possible to customize text and value with this menu

### 0.4.1 (2023-07-30)

- Return text for submenus adjusted

### 0.4.0 (2023-07-28)

- change output value for getState
- checkbox to disbale Text No Entry found in the settings #34
- submenu
- **changed!!!**, states are always set with ack false
- adapter does not restart when telegram restarts #35

### 0.3.0 (2023-07-02)

- add ack Flag
- Copy-Button to copy User-elements to activ User

### 0.2.0 (2023-05-28)

- rename button
- create groups with users

### 0.1.1 (2023-05-18)

- shift rows
- small fixes
- Darkmode fixed
- option, return text without value
- get all Values of functions

### 0.1.0 (2023-05-07)

- Fixes
- Style
- Confirmation, that the value has been set
- Second User Menu fixed

### 0.0.8 (2023-05-01)

- Send Grafana Diagrams

### 0.0.7 (2023-04-23)

- Bugs fixed
- Translate

### 0.0.6 (2023-04-18)

- Fixed SetState and GetState
- Translate

### 0.0.2 (2023-04-16)

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2025 MiRo1310 <michael.roling@gmx.de>

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