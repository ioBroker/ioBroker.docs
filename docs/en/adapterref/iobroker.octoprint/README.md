---
---
![Logo](../../admin/octoprint.png)

# ioBroker.octoprint

**Tested with [OctoPrint](https://github.com/OctoPrint/OctoPrint/releases) 1.10.3**

## Features

### Information

- Get version information
- Get printer information (when ``operational``)
- Get current print job information (when ``printing``)
- Get file list information (when not ``printing``)

### Tools

- Set tool temperature (when ``operational``)
- Set bed temperature (when ``operational``)
- Extrude / Retract (when ``operational``)

### Commands

- Printer: Connect, disconnect and home
- Job: Start, Pause, Resume, Cancel, Restart
- SD-Card: Init, Refresh, Release
- Custom Printer Commands
- System Commands
- Jog X, Y and Z axis
- Select a file or print it

### Supported Plugins

- [Display Layer Progress](https://github.com/OllisGit/OctoPrint-DisplayLayerProgress) - tested with version 1.28.0 (requires **adapter version 2.1.0** or later)
- [Slicer Thumbnails](https://github.com/jneilliii/OctoPrint-PrusaSlicerThumbnails) - tested with version 1.0.0 (requires **adapter version 2.2.0** or later)

## Important!

DO NOT restart your OctoPrint instance (or any other instance) with code like this:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Since the `API key` is a protected attribute since version 1.1.0, this will remove the configured API key. The reason is, that `getObject` doesn't return protected information (so the api key is not included in the returned object). When you save the object, you will save an object without the key.

Please use state `system.adapter.octoprint.0.alive` to stop/start the instance.