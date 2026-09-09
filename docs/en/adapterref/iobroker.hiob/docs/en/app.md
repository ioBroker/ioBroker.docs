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

## Installation and APP setup `ioBroker Settings`

# Step 1: Installation and APP setup

# Step 1: Instance Settings

1. Please enter a free port (default is 8090). If the selected port is occupied, the next free port will be used. This is written to the log and should then be copied into the config instance.
2. For the graphic widget you need either the SQL or Histroy adapter to record changes to states. Please select either a SQL or History instance.
3. Now start the adapter.

![instance.png](img/instance.png)

# Step 2: Create User (OPTIONAL)

## A new user must be created for password login

1. Select users on the left and add users on the right.

![create_user.png](img/create_user.png)

2. Enter the username and a password here. Then press save.

![create_user_with_pw.png](img/create_user_with_pw.png)

# Step 3 with password: Login with password (local login)

1. Enter the IP of your ioBroker, port, user and password here and press the “Reconnect” button.

![app_login_first.png](../de/img/app_login_first.png)

2. Then under Objects, set the state `approved`, from the correct device, to true (without the Confirmed check mark)

![request_approved_wo_pw.png](img/request_approved_wo_pw.png)

3. Stimmt das Passwort oder der Username nicht wechselt der Datenpunkt wieder auf false und in der APP wird ein roter Text `Login declined` angezeigt. Bitte dann den Username und Passwort überprüfen und den Datenpunkt erneut auf true setzen.

4. If everything has been entered correctly, the green text “Logged in” will now appear.

![app_login_with_pw.png](../de/img/app_login_with_pw.png)
![approved_with_pw.png](../de/img/approved_with_pw.png)

5. (Optional) Now a forwarding can be entered so that you can also switch outside the network. Beforehand, the APP must receive the “Location” access rights. Then enter the WiFi network and the URL. Now set up a forwarding in the Fritzbox. But this is not recommended!! VPN access would be better. E.g. use the APP “VpnCilla” (chargeable).

![app_access.png](../de/img/app_access.png)![app_second_ip.png](../de/img/app_second_ip.png)

# Step 3 without password: Login with password (local login)

1. Uncheck the box “Use Password Login” and enter your IP + port from ioBroker and press the “Reconnect” button.

![app_login_first_wo_pw.png](../de/img/app_login_first_wo_pw.png)

2. Set the state `noPwdAllowed` to true (without the Confirmed checkmark) and then set the `approved` state to true (without the Confirmed checkmark).

![request_approved_wo_pw.png](img/request_approved_wo_pw.png)

3. If everything was implemented correctly then it should look like this.

![app_login_wo_pw_suc.png](../de/img/app_login_wo_pw_suc.png)
![approved_wo_pw.png](../de/img/approved_wo_pw.png)

# Important informations

- If you want to block a user, simply set the “approved” state to false.
- A green checkmark now appears at the top left of the view when you are connected.
- If a red WLAN symbol flashes there, then no connection can be established. Either you are not on the same network or the state “approved” is false.

![app_connection_on.png](../de/img/app_connection_on.png)
![app_connection_off.png](../de/img/app_connection_off.png)

-   [Secure Connection](/#/docs/adapterref/iobroker.hiob/docs/en/secureCon.md)
-   [Simple AES encryption](/#/docs/adapterref/iobroker.hiob/docs/en/aessecure.md)

-   [Back to Summary](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)
-   [Step 1: Installation and APP setup](/#/docs/adapterref/iobroker.hiob/docs/en/app.md)
-   [Step 2: Create Enums](/#/docs/adapterref/iobroker.hiob/docs/en/enum.md)
-   [Step 3: Create Widgets](/#/docs/adapterref/iobroker.hiob/docs/en/widgets.md)
-   [step 4: Create Screens](/#/docs/adapterref/iobroker.hiob/docs/en/sreens.md)
-   [Step 5: Create Backups](/#/docs/adapterref/iobroker.hiob/docs/en/backups.md)