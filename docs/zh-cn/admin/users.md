---
title: 用户
lastChanged: 09.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/users.md
hash: oZ3qSniVB/6nJrC+RQpIGbzQm7B9Dxjq1tcB3EHTX1I=
---
# 用户页面
在此页面上，可以创建用户和组，并向组分配权限。

![用户页面](../../de/admin/media/ADMIN_Benutzer_numbers.png)

现有组位于左侧，用户位于右侧。

只需拖放即可将用户拖入组。

## 1.) 新组
单击该图标后，将打开另一个窗口：

![创建新组](../../de/admin/media/ADMIN_Benutzer_newgroup_allgemein.png)

该窗口由两个子单元组成。

＃＃＃ 一般来说
这里输入基本的东西：

**名称** - 组的名称。该名称可以自由选择，但必须是唯一的。

**ID** - ID是自动填写的

**说明** - 可以在此字段中输入该组任务的说明。

**预览** - 自动显示并包含完整 ID `system.group.groupname`。

可以使用 [+] 按钮添加图标，也可以将其拖放到窗口上。

**颜色** - 该组的图块用此处设置的颜色突出显示。

### 访问权限
权限被分配给组。为了让用户拥有一定的权限，必须将他们分配到相应的组中。

![组访问权限](../../de/admin/media/ADMIN_Benutzer_newgroup_rechte.png)

此处分配各种任务的访问权限。

## 2.) 新用户
单击该图标后，将打开另一个窗口：

![创建新用户](../../de/admin/media/ADMIN_Benutzer_newuser.png)

**名称** - 用户的名称。该名称可以自由选择，但必须是唯一的。

**ID** - ID是自动填写的

**说明** - 可以在此字段中输入有关用户的说明。

**预览** - 自动显示并包含完整 ID sytem.group.Username。

**密码** - 用户的密码

**重复密码** - 为了防止输入错误，必须在此处再次输入密码