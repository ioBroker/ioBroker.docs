---
title: 用户
lastChanged: 09.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/users.md
hash: Li7Kk2AK3eAMQe855up3wP5w3oTNxQo4i6DeGGwDmvw=
---
# 用户页面
可以在此页面上创建用户和组，并可以为组分配权限。

![用户页面](../../de/admin/media/ADMIN_Benutzer_numbers.png)

现有组在左侧，用户在右侧。

可以通过简单的拖放操作将用户拖入组中。

## 1.) 新组
单击此图标后，将打开另一个窗口：

![创建新组](../../de/admin/media/ADMIN_Benutzer_newgroup_allgemein.png)

该窗口由两个子单元组成。

＃＃＃ 一般的
基本的东西在这里输入：

**名称** - 组的名称。此名称可以自由选择，但必须是唯一的。

**ID** - ID 将自动填写

**说明** - 可以在此字段中输入对该组职责的说明。

**预览** - 自动显示并包含完整的 ID `system.group.groupname`。

可以通过 [+] 按钮添加图标，但也可以将其拖放到窗口上。

**颜色** - 组的图块以此处设置的颜色突出显示。

＃＃＃ 访问权限
为组分配权限。为了使用户具有某些权限，必须将他们分配到适当的组。

![组访问权限](../../de/admin/media/ADMIN_Benutzer_newgroup_rechte.png)

各种任务的访问权限在此处分配。

## 2.) 新用户
单击此图标后，将打开另一个窗口：

![创建新用户](../../de/admin/media/ADMIN_Benutzer_newuser.png)

**名称** - 用户的名称。此名称可以自由选择，但必须是唯一的。

**ID** - ID 将自动填写

**描述** - 可以在此字段中输入用户的描述。

**预览** - 自动显示并包含完整的 ID system.group.Username。

**密码** - 用户的密码

**重复密码** - 为防止输入错误，必须在此处再次输入密码