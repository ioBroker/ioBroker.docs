---
chapters: {"pages":{"en/adapterref/iobroker.hiob/README.md":{"title":{"en":"ioBroker.hiob"},"content":"en/adapterref/iobroker.hiob/README.md"},"en/adapterref/iobroker.hiob/docs/en/README.md":{"title":{"en":"ioBroker.hiob Adapter for ioBroker"},"content":"en/adapterref/iobroker.hiob/docs/en/README.md"},"en/adapterref/iobroker.hiob/docs/en/example.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/example.md"},"en/adapterref/iobroker.hiob/docs/en/app.md":{"title":{"en":"Step 1: Installation and APP setup"},"content":"en/adapterref/iobroker.hiob/docs/en/app.md"},"en/adapterref/iobroker.hiob/docs/en/enum.md":{"title":{"en":"Step 1: Create Enums"},"content":"en/adapterref/iobroker.hiob/docs/en/enum.md"},"en/adapterref/iobroker.hiob/docs/en/widgets.md":{"title":{"en":"Step 3: Create Widgets"},"content":"en/adapterref/iobroker.hiob/docs/en/widgets.md"},"en/adapterref/iobroker.hiob/docs/en/sreens.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/sreens.md"},"en/adapterref/iobroker.hiob/docs/en/backups.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/backups.md"},"en/adapterref/iobroker.hiob/docs/en/general.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/general.md"},"en/adapterref/iobroker.hiob/docs/en/secureCon.md":{"title":{"en":"Secure connection"},"content":"en/adapterref/iobroker.hiob/docs/en/secureCon.md"},"en/adapterref/iobroker.hiob/docs/en/aessecure.md":{"title":{"en":"Step 1: AES states"},"content":"en/adapterref/iobroker.hiob/docs/en/aessecure.md"},"en/adapterref/iobroker.hiob/docs/en/custom.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/custom.md"},"en/adapterref/iobroker.hiob/docs/en/notifications.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/notifications.md"},"en/adapterref/iobroker.hiob/docs/en/example_log.md":{"title":{"en":"ioBroker Logs"},"content":"en/adapterref/iobroker.hiob/docs/en/example_log.md"},"en/adapterref/iobroker.hiob/docs/en/example_ram.md":{"title":{"en":"ioBroker RAM"},"content":"en/adapterref/iobroker.hiob/docs/en/example_ram.md"},"en/adapterref/iobroker.hiob/docs/en/example_updates.md":{"title":{"en":"ioBroker Infos, News and Updates"},"content":"en/adapterref/iobroker.hiob/docs/en/example_updates.md"},"en/adapterref/iobroker.hiob/docs/en/example_window.md":{"title":{"en":"ioBroker Status Windows"},"content":"en/adapterref/iobroker.hiob/docs/en/example_window.md"},"en/adapterref/iobroker.hiob/docs/en/example_door.md":{"title":{"en":"ioBroker Status doors"},"content":"en/adapterref/iobroker.hiob/docs/en/example_door.md"},"en/adapterref/iobroker.hiob/docs/en/button.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/button.md"},"en/adapterref/iobroker.hiob/docs/en/value.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/value.md"},"en/adapterref/iobroker.hiob/docs/en/advanced.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/advanced.md"},"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md"},"en/adapterref/iobroker.hiob/docs/en/division.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/division.md"},"en/adapterref/iobroker.hiob/docs/en/webview.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/webview.md"},"en/adapterref/iobroker.hiob/docs/en/table.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/table.md"},"en/adapterref/iobroker.hiob/docs/en/graph.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/graph.md"},"en/adapterref/iobroker.hiob/docs/en/color.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/color.md"},"en/adapterref/iobroker.hiob/docs/en/media_player.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/media_player.md"}}}
---
![Logo](../../admin/hiob.png)

-   [Back to Summary](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)
-   [Step 1: Installation and APP setup](/#/docs/adapterref/iobroker.hiob/docs/en/app.md)
-   [Step 2: Create Enums](/#/docs/adapterref/iobroker.hiob/docs/en/enum.md)
-   [Step 3: Create Widgets](/#/docs/adapterref/iobroker.hiob/docs/en/widgets.md)
-   [step 4: Create Screens](/#/docs/adapterref/iobroker.hiob/docs/en/sreens.md)
-   [Step 5: Create Backups](/#/docs/adapterref/iobroker.hiob/docs/en/backups.md)

## Create enums and APP `ioBroker Settings` + `Device Settings`

# Step 1: Create Enums

1. Creates a new enum `job` (all lower case). “Hiob” must be entered under “Name” and “Edit ID”. The other fields are optional.

![ENUM](img/create_enum.png)
![ENUM](img/create_enum_save.png)

2. Now you can create as many categories as you want under ENMU `hiob`. It would be advantageous to choose categories such as light, sockets or rooms. It is then a little easier to find the desired states in the APP.

![ENUM](img/create_category.png)
![ENUM](img/create_enum_save.png)

3. It is recommended to create adapter states as `alias`. The adapter `alias-manager` is recommended for this. Then create a new `channel` here and add the states there with the `alias manager`. states under 0_userdata.x or javascript.x do not necessarily have to be created as aliases.

![ENUM](img/create_alias.png)

4. Now drag the desired states into the Job lists.

![ENUM](img/create_category_datapoint.png)

5. Go back to the APP in `ioBroker Settings` and press `Update` and then `Sync`.

![ENUM](img/../../de/img/app_login_wo_pw_suc.png)

6. Now switch to `Device Settings` in the APP. If the categories are displayed in green, then everything worked. If the categories are red, please run `Update` again and then `Sync`.
Categories can be deleted by swiping from right to left. These appear again after `Update` & `Sync`. It is possible to create your own categories and enter new states into them. Of course, these must be available in the ioBroker. However, these will also be deleted after `Update` & `Sync`. Therefore, after the settings/changes, make a backup or create a new backup!!!

![ENUM](img/../../de/img/app_dev_settings_green.png)
![ENUM](img/../../de/img/app_cat_del.png)

7. You can create a new category by clicking on the + sign. Enter a name here that can be easily assigned.

![ENUM](img/../../de/img/app_create_cat.png)

8. New states can be added by pressing `Add data point man.`. The ID must exist in ioBroker. E.g.: Name: Worx Party Mode and ID: worx.0.702470273301009453d9.mower.partyMode. But it would be better to create everything using alias and then assign it to the enums.
Then press save.

![ENUM](../de/img/app_create_cat_dp.png)

9. Tap on a category to go to the next view. Change the names or IDs here or add new states. States can be deleted by swiping from right to left. `Ignore/Override Devicestatus`: Reachable of the device is ignored

![ENUM](img/../../de/img/app_edit_device.png)
![ENUM](img/../../de/img/app_new_device.png)
![ENUM](img/../../de/img/app_del_device.png)

10. By clicking on the 'i', additional information about the data point appears.

![ENUM](img/../../de/img/app_device_add_infos.png)

# Add Enum is currently not working!!!

-   [Back to Summary](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)
-   [Step 1: Installation and APP setup](/#/docs/adapterref/iobroker.hiob/docs/en/app.md)
-   [Step 2: Create Enums](/#/docs/adapterref/iobroker.hiob/docs/en/enum.md)
-   [Step 3: Create Widgets](/#/docs/adapterref/iobroker.hiob/docs/en/widgets.md)
-   [step 4: Create Screens](/#/docs/adapterref/iobroker.hiob/docs/en/sreens.md)
-   [Step 5: Create Backups](/#/docs/adapterref/iobroker.hiob/docs/en/backups.md)