---
chapters: {"pages":{"en/adapterref/iobroker.telegram-menu/README.md":{"title":{"en":"ioBroker.telegram-menu"},"content":"en/adapterref/iobroker.telegram-menu/README.md"},"en/adapterref/iobroker.telegram-menu/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.telegram-menu/docs/en/README.md"}}}
---
![Logo](../../admin/telegram-menu.png)

## ioBroker telegram-menu Adapter

Create interactive Telegram menus for your ioBroker.

The adapter enables communication with the ioBroker via Telegram: switch data points, query values, send images and diagrams, trigger HTTP requests and much more. Menus are organized into groups and assigned to individual Telegram users.

* * *

### First steps

Help texts can be accessed directly in the adapter using this button:![Button HelperText](../pic/btnHelperTexte.png)

**Important:**In order for a menu to be used, at least one menu must be activated under “Telegram users” (checkbox on the right).

* * *

## Navigation

![Navigation](../pic/nav.png)

-   **Line 1 (green)**is the start navigation - it is sent automatically when the adapter starts or restarts and can be called up manually at any time.
-   The text on the right (e.g. “Choose an action”) is freely selectable, but cannot be empty.
-   Buttons within a line are marked with`,`separated.
-   A new button line will appear`&&`generated.

![Buttons in Telegram](../pic/image-1.png)

When the user presses a button, Telegram sends the button text to the adapter. This searches for the appropriate entry in the configuration - the**Call text must match exactly and may only appear once**(across all linked menus).

-   Various predefined submenus can be used, e.g. B. On/Off, percent or numbers (e.g. for roller shutter control). A new trigger is automatically created for each submenu in the action configuration - more on this below.

### Multiple menus

It is possible to switch from one menu to another. Useful if two people share the same menu, but one of the users should have access to an additional menu that the other does not have access to. The corresponding button is visible in both groups, but with a function that is only relevant for one of the users. For this to work,**The respective user must be registered in both groups**.

In order for the second menu (submenu) to function correctly, the trigger text of the submenu's homepage must be deactivated: simply leave the "Trigger" cell empty. The line then becomes**orange**and a message appears indicating that this is a submenu. (A`-`as a placeholder also still works.)

**Important:**Even with two linked menus, each call text can only appear once. However, two menus that have no common users and are not linked to each other may use the same entries (e.g. "Light" in both).

### Icons in Menü-Buttons

![Icon1](../pic/heizung-icon1.png)

Emojis can be used directly as button text - simply copy an emoji (e.g. from<https://www.getemojis.net/>) or via`Windows + .`insert. The emoji itself is inserted, not its HTML code.

![Icon2](../pic/heizung-icon2.png)

### Clear history

To delete all messages (similar to “Delete history” in the client), enter the following in a menu item:

    menu:deleteAll:Startseite

`Startseite`is the menu name that is called up after deletion. Only messages less than 48 hours old can be deleted.

* * *

### Return text placeholder

These expressions can be used anywhere in the return text in Navigation, SetState and GetState.

#### <span id="status"></span>Show status of a data point

    {status:'ID':true}

`ID`Replace with the desired data point ID. The expression must be placed directly where the status is to be displayed. The second parameter (`true`/`false`) controls whether`change{...}`may be applied to this value - relevant if several`{status:...}`-Queries appear in the same return text.

#### Exchange value

    change{"true":"an","false":"aus"}

Swaps the returned value with readable text. Can be right behind`{status:...}`or that`&&`- Placeholders stand.

#### Set data point when opening

    {set:'id':'ID',val,ack}

Sets a data point when opening a navigation.`ID`= data point ID,`val`= value to be set,`ack`= confirmed (`true`) or unconfirmed (`false`).

#### Send timestamp

For the last change of a data point:

    {time.lc,(DD MM YYYY hh:mm:ss:sss),id:'ID'}

For the last timestamp of a data point:

    {time.ts,(DD MM YYYY hh:mm:ss:sss),id:'ID'}

The format in the brackets is freely customizable. Unnecessary placeholders can be removed, but not renamed. Exception:`YYYY`can as`YY`be written.

#### Convert Unix timestamp to time

    {time}

Used in the return text where the converted value should appear.

#### line break

    \n

#### Parse Mode

Allows HTML formatting in Telegram messages:

| Tag                      | Depiction   |
| ------------------------ | ----------- |
| `<b>Text</b>`            | **fett**    |
| `<i>Text</i>`            | _italics_   |
| `<code>Text</code>`      | `Code`      |
| `<a href="URL">Link</a>` | Linked text |

Activate Parse Mode in the settings of the respective line and insert the text between the tags. Additional tags can be supported.

* * *

## Submenüs

![Submenus](../pic/image10.png)

Submenus are entered in the navigation in order to call them up. The`TRIGGER`must be unique (i.e. can only occur once) and refers to the trigger of the same name in the action configuration, where the ID to be switched is specified.

### Predefined submenus

**On/Off switch:**

    menu:switch-on.true-off.false:TRIGGER:

`on`/`off`are the button labels.`true`/`false`are automatically interpreted as Boolean, but can be replaced with any text.

* * *

**Percentage levels:**

    menu:percent10:TRIGGER:

Die`10`defines the step size and is variable.

* * *

**Number range:**

    menu:number1-20-2-unit:TRIGGER:

`1`–`20`is the range (also vice versa`20-1`possible),`2`the step size,`unit`the unit. For negative step sizes`(-)`put in front. Example:`menu:number16-36-4-°C:temperaturXY:`

* * *

**Dynamic menu:**

    menu:dynSwitch[Name1|value1, Name2|value2, value3]:TRIGGER:LengthOfRow:

Creates a menu from an array.`Name|Wert`defines the label and value of the respective button. Will just be a value without`|`specified, it also serves as a label.`LengthOfRow`indicates the number of buttons per line. Decimal numbers as a value are possible (e.g.`2.5`). The current value of a data point can also be used as the button name:`{status:'ID':true}`–[for further information see here](#status).

* * *

**Back:**

    menu:back

Goes back to the last page accessed (max. 20 pages).

<br>
<img src="../pic/menu_percent10_r2.png" width="800"/>
<img src="../pic/submenu_setstate.png" width="800"/>

* * *

## SetState

![SetState](../pic/setState.png)

-   Die Checkbox**"Switch"**(right) switches a Boolean data point between each call`true`and`false`. The trigger name must correspond exactly to the button text that should trigger the action.
-   Under**„Wert"**Any value can be entered. Create a separate SetState entry for different values.
-   States are defaulted to`ack:false`set - this is required to control other adapters with it. Should`ack:true`can be set directly, the checkbox**„Ack"**activate.
-   **Confirmation after`ack:true`:**As soon as the addressed adapter has the value`ack:true`confirmed, the return text will be sent. Placeholder for the set value in the return text:`&&`.

### Return text options for SetState

**Do not send the set value:**

    {novalue}

Is entered in the return text if the value should not appear in the confirmation.<br>![novalue](../pic/image5.png)

* * *

**Wait for another data point to change:**

```json
{"foreignId":"ID","text":"Wert wurde gesetzt:"}
```

Waits for`ack:true`of the specified data point and then sends the return text.`ID`Replace with the desired data point ID. The text can be freely adapted. The placeholder`&&`stands for the value of the monitored data point.

<details>
  <summary>Alte Version anzeigen (ausklappbar)</summary>

### Old (obsolete)

     {'id':'ID','text':'Wert wurde gesetzt:'} 

## </details>

**Immediate confirmation (without`ack:true`to wait):**

    {confirmSet:Wert wurde gesetzt:noValue}

Sends immediate feedback. This does not mean that an adapter actually processed the value.`noValue`suppresses the value display.

* * *

**Allow user to enter dynamic value:**

    {setDynamicValue:RequestText:Type:ConfirmText:ID}

After pressing the button, the adapter waits for the user to enter text and then writes it into the data point. Will be entered in the return field.

| Parameter     | Description                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `RequestText` | Prompt text sent to the user                                                                                                 |
| `Type`        | Data type:`boolean`,`number`or`string`                                                                                       |
| `ConfirmText` | Confirmation text after setting (your own text possible)                                                                     |
| `ID`          | Optional: ID of another data point whose value (according to`ack:true`) is displayed in the confirmation text. Wildcard:`&&` |

* * *

**Parse Mode, change, line break:**See section[Return text placeholder](#rückgabetext-platzhalter).

### Accept value from a submenu

Create the submenu as usual. Enter the static part in the value field of SetState and`{value}`Use as a placeholder for the value from the submenu.

### Combine static and dynamic value

In the value field, a static text can be combined with the current value of a data point:

    {id:ID}

`ID`Replace with the desired data point ID. The`&&`-Wildcard in the return text indicates where the result will be inserted. Without`&&`the result is appended at the end.

**Examples:**

| input                                                                      | Data point value | output         |
| -------------------------------------------------------------------------- | ---------------- | -------------- |
| `{id:0_userdata.0.Fenster_Status}`                                         | `true`           | `true`         |
| `{id:0_userdata.0.Count} {math:*2}`                                        | `5`              | `10`           |
| `Test {id:0_userdata.0.Count} {math:*2} Test`                              | `5`              | `Test Test 10` |
| `Test && {id:0_userdata.0.Count} {math:*2} Test`                           | `5`              | `Test 10 Test` |
| `Status && {id:0_userdata.0.Count} {math:*2} change{"10":"an","20":"aus"}` | `5`              | `Status an`    |

The result is always appended to the end of the text - unless`&&`is set, then it is inserted at the position of the placeholder.

* * *

## GetState

-   Placeholder`&&`specifies where the retrieved value appears in the return text.

-   `change{"true":"an","false":"aus"}`– replaces the returned value with readable text.

-   `{math:/10}`– apply mathematical calculation to the value (e.g.`/10`,`*2`,`+5`).

    ![math](../pic/image9.png)

-   `{round:2}`– Round value to N decimal places.

-   `{time}`– Convert Unix timestamps to local time.

-   Checkbox**„Newline"**– if there are several simultaneous GetState queries, the return text of each query is output on a new line.

### Get all values ​​of an ioBroker function

Instead of a specific ID`functions=Licht`enter (example). With`{common.name}`The name of the data point is displayed at the desired position in the output text.

![functions](../pic/functions.png)

### The table

**Display JSON as a text table:**

```json
{"tableData":[{"key":"value-1-inJSON","label":"Spalte 1"},{"key":"value-2-inJSON","label":"Spalte 2"}],"tableLabel":"Überschrift","type":"TextTable"}
```

1.  Under “ID” select a data point that contains a JSON.
2.  Adjust the JSON as above:`key`corresponds to the key in the JSON of the data point,`label`is the column name (will`label`is omitted`key`used as column name).
3.  `tableLabel`is the table heading (empty string = no heading).
4.  `type`must`"TextTable"`and must not be changed.

* * *

**View Alexa Shopping List:**

```json
{"tableData":[{"key":"name"}],"tableLabel":"Einkaufsliste","listName":"SHOP","type":"alexaShoppingList"}
```

Creates a list of buttons for the`alexa-shoppinglist`-Adapter. The buttons remove the respective item from the Alexa list.`listName`must match the list name created in Alexa (e.g.`SHOP`or`TOBUY`). The data point must be from`alexa-shoppinglist`-Adapter the stem.

![InlineTable](../pic/inlinetable-grafik.png)![TextTable](../pic/textable-grafik.png)

* * *

## Send Picture (Grafana)

-   Store a Grafana token in the settings.
-   Create a directory with full write permissions (e.g.`/opt/iobroker/grafana/`) to cache images.
-   Enter the rendering URL in the action. This can be found in Grafana under: Diagram → Share → Direct link to the rendered image. Deactivate the "Lock time range" option so that the current diagram is always sent.
-   If you have multiple diagrams, each file name must be unique, otherwise the images will overwrite each other.
-   Delay`0`→ Image will be sent immediately. Delay > 0 → Image is sent delayed by the specified value in seconds.

<img src="../pic/grafana.png" width="400"/>

* * *

## Send Location

1.  Select trigger.
2.  Latitude data point (`latitude`) and the longitude (`longitude`) indicate.

* * *

## Events

Integrated event listener: Waits for a data point to change status - if this is set (e.g. via a script or an adapter), a predefined menu opens automatically.

-   The specified condition is checked. Supported operators:`=`,`!=`,`<`,`>`,`<=`,`>=`. If no operator is selected, equality is checked by default.
-   It will be on`ack`of the data point checked.

* * *

## Echarts

Have charts sent directly from the Echarts adapter.

| Feld           | Description                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preset**     | Can be taken directly from the ioBroker object structure                                                                                                              |
| **Background** | Background color of the chart                                                                                                                                         |
| **Theme**      | `auto`,`default`,`dark`,`dark-bold`,`dark-blue`,`gray`,`vintage`,`macarons`,`infographic`,`shine`,`roma`,`azul`,`blue`,`royal`,`tech-blue`,`red`,`red-velvet`,`green` |
| **filename**   | Individual file name for the image                                                                                                                                    |

**Important:**A directory with full write permission must be specified in the settings.

* * *

## HTTP Request

Sends an HTTP request – with or without authentication.

-   **URL**– Mandatory field.
-   **User / password**– Optional, leave blank if necessary.
-   **filename**– can be left at the default value.

* * *

## Settings

| Attitude                    | Description                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Telegram instance**       | Selection of the Telegram instance if several instances are installed                                                                                                                    |
| **Text for no entry**       | Sent if no suitable menu entry was found. Can be deactivated using the checkbox next to it                                                                                               |
| **Resize Keyboard**         | Dynamically adjusts the keyboard height based on the number of lines. Standard:`false`([Telegram API](https://core.telegram.org/bots/api#replykeyboardmarkup))                           |
| **One Time Keyboard**       | Hides the keyboard after one use. Can be shown again using a special button in the input field. Standard:`false`([Telegram API](https://core.telegram.org/bots/api#replykeyboardmarkup)) |
| **Grafana Token**           | Optional – required for retrieving Grafana charts                                                                                                                                        |
| **directory**               | Cache for images and diagrams (Grafana and Echarts). Full write permissions required                                                                                                     |
| **Send menu after restart** | Can be disabled. If the option is deactivated, the menu must be called up manually the first time using the input field in the Telegram app                                              |