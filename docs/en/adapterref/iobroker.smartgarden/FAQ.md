---
chapters: {"pages":{"en/adapterref/iobroker.smartgarden/README.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/README.md"},"en/adapterref/iobroker.smartgarden/FAQ.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FAQ.md"},"en/adapterref/iobroker.smartgarden/FORECAST.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FORECAST.md"}}}
---
![Logo](admin/smartgarden.png) 

# ioBroker.smartgarden

## FAQ


| Question | Answer |
| - | - |
| I always get `Error: 401` | Verify again username, password and API key |
| I updated my js-Controller to 3.x.y, since then I get an error `.... required adapter "@jpgorganizer/utils" not found!'` | The easiest way to fix that is to uninstall the adapter and reinstall it again.|
| I don't get values for forecast of mowing or charging time | delete datapoints `info.saveMowingHistory` and   `info.saveChargingHistory` and start again. Make sure that you have at least one mowing / charging cycle without errors |
| after an update from version < 0.5.0 to version >= 0.5.0 all id's have changed | yes, this was necessary due to support of History adapter. For more info see Changelog |
| I would like to have more/other values for my devices | please read chapter *Wishes for data points* in [README](/#/adapters/smartgarden) |
| I get `invalid date` for each timestamp | this behaviour should be fixed with versions > 0.6.0 |
| I always get `Error: getlocations: no data` | this error was an error of the Gardena Smart API and is fixed by Gardena |
| Do I need the Gardena Bridge or is it possible to operate the Gardena smart system without the bridge | You need the bridge. The bridge connects your devices to the Gardena cloud and the smartgarden adapter communicates with the Gardena cloud |
| My devices, like my mower, are not responding to my commands. | Please check that you have set the value for command with `ack=false`. See [Chapter Commands and Statuses in Guide for adapter developers](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)|
| Why does my mower / my valve / my power socket start for one minute, although I set another command, like `PARK_UNTIL_NEXT_TASK` for a mower. | It is very likely that you misspelled the command. If the adapter doesn'r recognize the command the device gets started for 60 seconds. |
| I can't enter an application secret. The field is inactive. | Please delete username and password. Only either application secret or username and password can be entered.|


<!--- SVN: $Rev: 2931 $ $Date: 2023-06-14 21:18:24 +0200 (Mi, 14 Jun 2023) $ --->