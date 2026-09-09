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

## Create Backup `Config Sync`

- Here you can save your settings (widgets, screen and device) in ioBroker.
- These backups can only be deleted in ioBroker. Completely delete the desired object tree under 'Settings'.
- Press the plus sign at the bottom right.

![app_config_sync.png](img/../../de/img/app_config_sync.png)

- Enter the name of the backup folder that should be created.

![app_config_sync_create.png](img/../../de/img/app_config_sync_create.png)

- Then press save.

![app_config_sync_create_done.png](img/../../de/img/app_config_sync_create_done.png)

- Now press the 'Upload Settings' button to create a backup. Now you can e.g. For example, other users can load these settings using the “Load” button. Of course, multiple backups are possible.

![config_sync_iobroker.png](img/config_sync_iobroker.png)

-   [Back to Summary](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)
-   [Step 1: Installation and APP setup](/#/docs/adapterref/iobroker.hiob/docs/en/app.md)
-   [Step 2: Create Enums](/#/docs/adapterref/iobroker.hiob/docs/en/enum.md)
-   [Step 3: Create Widgets](/#/docs/adapterref/iobroker.hiob/docs/en/widgets.md)
-   [step 4: Create Screens](/#/docs/adapterref/iobroker.hiob/docs/en/sreens.md)
-   [Step 5: Create Backups](/#/docs/adapterref/iobroker.hiob/docs/en/backups.md)