---
title:       "Adapter reference"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterref.md"
---

# Adapter reference
## Data structure - Objects and states

An adapter in ioBroker is an independent process, that reads and writes objects and states in a central data storage. Data storage can be represented as database (redis/couchDB) or just text file, but the connection way is always the same - via API. That means, the developer should not care about what the database it is and how the data will be stored and delivered there.

There are two types of data in the storage:

* Objects
* States

Objects are static descriptions of some data point. States are the dynamic values of data points. So normally for every state there is a object with description. (But not vice versa).

Objects additionally describe:

* configuration of hosts
* description of adapters
* configuration of adapter instances
* content of configuration HTML files
* content of WEB files
* enumerations
* users
* hierarchies of states (channels and devices)

You can explore the objects and the current state values in admin adapter on the "Objects"-tab.

The name of object consists of different parts. Every part is divided by "." from each other. There is a system objects (name starts with _ or "system.") and adapter objects (name starts with adapterName).

Note: here and forth adapterName is the name of the adapter that a developer wants to create.

The states can be grouped in channels and the channels in devices. Here is a example of Homematic groups and channels:

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

The state ID must always start with channel name and channel name with device name. E.g. in the state name hm-rpc.0.IEQ1234567.0.INFO above, the part hm-rpc.0.IEQ1234567.0 is the channel name and hm-rpc.0.IEQ1234567 is the device name.

It is used to build the coordination of device, channels and states in hierarchy.

?> Note: If adapter is not so complex, the devices and even channels can be omitted.

**Adapter** is just the package of files and placed in node_modules directory. For every adapter the description of this adapter can be found in object "system.adapter.adapterName". It is just the fields "common" and "native" from the io-package.json file. This entry is created automatically when iobroker install adapterName or iobroker add adapterName called. If the adapter was installed with npm install iobroker.adapterName no entry will be created till first instance creation. But it is not so important. The required for "updates" information will be read from io-package.json directly. Full list of common settings for adapter can be found [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter).

**Instance** is an instance of adapter. Depending on type of adapter more than one instance can be created , but for some adapters there is no use to create more than one instance. E.g. in case of vis or rickshaw only one instance can be created. This behavior is controlled by flags in io-package.json.

For each instance the configuration object can be found in the data storage under "system.adapter.adapterName.X" ID, where X is the adapter instance number. It contains the settings for this instance of the adapter. Normally it consist of "common" and "native" settings. Common settings are:

* `enabled`: true/false;
* `host`: host name where this instance must run;
* `mode`: none, daemon, subscribe, schedule, once;

Description can be found [here](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#instance).

`Native` settings consist of specific configurations for this adapter, e.g.: IP address of device, device settings and so on.

?> Note: Instances can run on different hosts (in multi-hosts systems) and the adapters can have different version on different hosts.

All adapter instance object IDs starts with adapterName.X, where X is number of adapter instance.

Objects have different types for different purposes.

For every adapter (not the instance) the following objects will be created automatically:

* `system.adapter.adapterName`: Description of adapter (like name, version number, ...)
* `adapterName`: Object that consists of HTML/JS/CSS files from "www" directory of adapter. This object will be created only if "www" directory is found in adapter package.
* `adapterName.admin`: Object that consists of HTML/JS/CSS files from "admin" directory of adapter package.

For every adapter instance 'X', the following objects will be created automatically:

* `system.adapter.adapterName.X`: configuration of adapter instance
* `system.adapter.adapterName.X.alive`: indication if instance alive (send messages every 30 seconds)
* `system.adapter.adapterName.X.connected`: indication if instance is connected to data storage, because it can be connected, but because of deadlock can not send alive messages.
* `system.adapter.adapterName.X.memHeapTotal`: memory usage
* `system.adapter.adapterName.X.memHeapUsed`: memory usage
* `system.adapter.adapterName.X.memRss`: memory usage
* `system.adapter.adapterName.X.uptime`: How many seconds adapter runs.

Explanation of memory states can be found [here](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

If adapter has mode 'none' or 'once', then alive, uptime, ... objects will not be created.
Directory structure of adapter

Adapter package must have some mandatory directories and files:

* `admin` (mandatory directory)
  * `index.html`
  * `xxx.png` - optional, better if it has name `adapterName.png` (any image formats are supported: jpeg, jpg, svg, bmp, ...)
* `www` - (optional directory)
* `lib` - (mandatory directory, because of `utils.js`)
  * `utils.js`
* `package.json` - mandatory
* `io-package.json` - mandatory
* `main.js` - mandatory (can be `adapterName.js`)

Note: lib/utils.js is a common file for all adapters, used to detect the position of js-controller and accordingly path to iobroker.js-controller/lib/adapter.js. Most actual utils.js can be downloaded here. Do not change this file.

## File naming

Adapter must must follow some naming convention to be accepted and started by ioBroker controller.

* On github (or somewhere else) it must have name *io**B**roker.adapterName*.
* If the adapter will be available on npm it must have name iobroker.adapterName, because npm doe snot allow capital letters in package names. It can be defined in in package.json
* GUI html file for configuration of adapter must have name admin/index.html. It can be more files in the "admin" directory, but index.html must exist.
* The start file of adapter must have name main.js or adapterName.js.
* Name of adapter must be unique, lowercase, with no special characters and without spaces. "-", "_" are allowed in the name of adapter.

## Structure of io-package.json

io-package.json is used by js-controller to show information about adapter and to know how to treat it. Complete description of all fields in common part can be found here

io-package.json will be read by "admin" to find out the online version of adapter.
### Common fields

#### Mandatory Fields

##### `adminUI`
* **Description**: Type of the admin UI for config, tab and custom. Custom means the part that is shown on object level, like for history settings. 
* **Type**: object
* **Possible values**:  
  - config: `html`, `json`, `materialize`, `none`
  - tab: `html`, `materialize`
  - custom: `json`
* **Example**: `"adminUI": {"config": "json", "tab": "html", "custom": "json"}`

##### `dataSource`
* **Description**: Specifies the method by which the adapter receives data from devices or services. This field is crucial for understanding the interaction pattern between the adapter and its data sources, ensuring that the adapter is configured to handle data input correctly.
* **Type**: string
* **Possible values**:
  - `none`: The adapter does not receive data from devices or external services directly.
  - `poll`: The adapter periodically requests data from devices or services. This is typical for scenarios where the adapter must actively query an API or device to retrieve the latest data.
  - `push`: Devices or services send data to the adapter proactively. This pattern is common in event-driven architectures where the device or service notifies the adapter of changes or updates without the adapter needing to request it.
  - `assumption`: The adapter makes assumptions about the state of devices or services based on predefined logic or patterns without receiving actual data from the devices. This might be used in scenarios where direct communication with the device is not possible or practical, and the adapter must infer the state based on other information.
* **Example**: `"dataSource": "poll"`

##### `desc`
* **Description**: A multilingual description of what the adapter does.
* **Type**: object
* **Possible values**: Object with language codes as keys and descriptions as values
* **Example**: `"desc": {"en": "This adapter allows...", "de": "Dieser Adapter ermöglicht..."}`

##### `keywords`
* **Description**: An array of keywords to help find the adapter in searches.
* **Type**: array
* **Possible values**: Every word that is related to the adapter.
* **Example**: `"keywords": [ "EnOcean", "Love" ] `

##### `license`
* **Description**: DEPRECATED with JS-controller version 5.0.19, do not use this field anymore.

##### `licenseInformation`
* **Description**: Information about the adapter's licensing, including type and, if applicable, a link to the full license text.
* **Type**: object
* **Possible values**: Object with license, type, and optionally link.
  - type: Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license.
* **Example**: `"licenseInformation": {"license": "MIT", "type": "free", "link": "https://opensource.org/licenses/MIT"}`

##### `loglevel`
* **Description**: Specifies the initial log level for the adapter instance.
* **Type**: string
* **Possible values**: `silly`, `debug`, `info`, `warn`, `error`

##### `mode`
* **Description**: Defines how the adapter is started.
* **Type**: string
* **Possible values**: `none`, `daemon`, `subscribe`, `schedule`, `once`, `extension`

##### `name`
* **Description**: The adapter's unique name without the "ioBroker." prefix. Not "ioBroker.adapterName".
* **Type**: String
* **Possible values**: Any valid string that uniquely identifies the adapter

##### `news`
* **Description**: Short changelog descriptions in all supported languages for the admin UI.
* **Type**: object
* **Possible values**:  Object with version numbers as keys and multilingual descriptions as values
* **Example**: `"news": {"1.0.0": {"en": "Initial release", "de": "Erstveröffentlichung"}}`

##### `platform`
* **Description**: Specifies the platform the adapter runs on. Currently, only Javascript/Node.js is supported.
* **Type**: string
* **Possible values**: `Javascript/Node.js`

##### `readme`
* **Description**: URL to the README page for the adapter. Used by admin adapter to show the link if "?" button clicked.
* **Type**: string
* **Possible values**: Any valid URL
* **Example**: `"readme": "https://github.com/ioBroker/ioBroker.adapterName#readme"`

##### `titleLang`
* **Description**: The adapter's name in all supported languages.
* **Type**: object
* **Possible values**: Object with language codes as keys and names as values
* **Example**: `"titleLang": {"en": "Adapter", "de": "Adapter"}`

##### `version`
* **Description**: The current version of the adapter, which must be the same as specified in package.json.
* **Type**: string
* **Possible values**: Semantic versioning format, https://semver.org/
* **Example**: `"version": "2.1.3"`

#### Optional Fields

##### `dependencies`
* **Description**: Defines the ioBroker modules and their specific versions that are required for the adapter to function correctly on the same host. This ensures that the adapter has all the necessary dependencies met within its operating environment, preventing runtime errors due to missing or incompatible modules.
* **Type**: array
* **Possible values**: An array containing strings or objects. Strings simply specify the names of required ioBroker modules without version constraints. Objects specify both the module names and their required version ranges, offering precise control over the versions of dependencies that the adapter needs to operate successfully.
* **Example**:  
`"dependencies": ["web"]`  
or  
`"dependencies": [ {"js-controller": ">=2.0.0"}, {"admin": ">=4.0.0"} ]`

##### `enabled`
* **Description**: If set to true, the adapter instance is activated upon addition.
* **Type**: boolean
* **Possible values**: `true`, `false`

##### `eraseOnUpload`
* **Description**: Specifies whether all existing data in the target directory should be erased before uploading new data. This is particularly relevant for adapters that manage or deploy files to a specific directory and need to ensure that only the latest version of their data or configuration is present, avoiding potential conflicts or outdated information.
* **Type**: boolean
* **Possible values**:
  - `true` (default): Before uploading new data, the adapter will clear the target directory of any existing files or data. This ensures that only the most recent upload is stored in the directory.
  - `false`: The adapter will upload new data without erasing existing files in the directory. This could be useful if the adapter needs to maintain a history of files or when existing data should not be removed.
* **Example**: `"eraseOnUpload": { "eraseOnUpload": true }`

##### `extIcon`
* **Description**:  URL to an external icon for the adapter, useful when the adapter is not yet installed.
* **Type**: string
* **Possible values**: Any valid URL
* **Example:**: `"extIcon": "https://example.com/icon.png"`

##### `getHistory`
* **Description**: Indicates whether the adapter supports the getHistory message, allowing it to retrieve historical data. This capability is essential for adapters that need to access past states or events. Starting from controller version 5, it is recommended to use the common.supportedMessages.getHistory field instead to specify this support more explicitly within the context of supported messages.
* **Type**: boolean
* **Possible values**: 
  - `true`: The adapter is capable of handling getHistory messages, meaning it can process requests for historical data.
  - `false`: The adapter does not support handling getHistory messages and cannot retrieve historical data upon request.
* **Example**: `"getHistory": true`


##### `globalDependencies`
* **Description**: Specifies the ioBroker modules that are required for the adapter to function properly, but unlike dependencies, these are needed on any host within a multi-host ioBroker setup. This ensures that necessary modules are available globally across the ioBroker installation, facilitating the adapter's operations that may depend on services or functionalities provided by these modules.
* **Type**: array
* **Possible values**: An array of strings or objects specifying the module names and their required versions. The version specification follows semantic versioning rules, allowing for precise control over the module versions that the adapter is compatible with.
* **Example**:  
`"globalDependencies": ["admin"]`  
or  
`"globalDependencies": [ {"admin": ">=2.0.0"}, {"web": ">=3.0.0"} ]`


##### `icon`
* **Description**: The filename of the adapter's icon within the admin directory.
* **Type**: string
* **Possible values**:  Any valid filename
* **Example**: `"icon": "icon.png"`

##### `localLinks`
* **Description**: Provides a way to define links to the web service of the adapter, which can be used to create buttons or links in the admin UI. This allows for easy access to the adapter's web interface or specific functionalities directly from the ioBroker admin panel. The _default key can be used to specify a default link, while other keys can define additional, context-specific links.
* **Type**: object
* **Possible values**:
    - A simple URL string for default usage: `{"_default": "http://localhost:5984/_utils"}`
    - An object specifying detailed properties for the link, including:
      - **link**: The URL to the web service or interface.
      - **color**: (Optional) A string value to specify the color of the link button or icon in the admin UI.
      - **pro**: (Optional) A boolean indicating whether the link is a pro feature.
      - **icon**: (Optional) The name or path of an icon to represent the link visually in the admin UI.
* **Note**: localLink can have special keys, that will be replaced by real values.
  - `%ip%`: will be replaced with IP address defined in first "web" instance.
  - `%field%`, where field is attribute from `native` part of configuration of adapter instance.
* **Example**:  
`"localLinks": {\"_default\": \"http://localhost:5984/_utils\"}`  
or  
`"localLinks":  {
  "configuration": {
  "link": "http://localhost:5984/_utils/config",
  "color": "blue",
  "pro": false,
  "icon": "config-icon.png"
  }
  }
  `  
or  
  `"localLinks": {\"_default\": \"http://%ip%:%port%/_utils\"}`

##### `logTransporter`
* **Description**: Indicates whether the adapter is designed to receive and possibly store or process log messages from other hosts and adapters within the ioBroker system. This functionality is essential for centralized logging solutions or adapters that perform log analysis, aggregation, or forwarding to external systems.
* **Type**: boolean
* **Possible values**:
  - `true`: The adapter can receive log messages from other hosts and adapters, making it responsible for handling such data according to its logic, whether it be storage, analysis, or forwarding.
  - `false`: The adapter does not have the capability to receive log messages from other parts of the ioBroker system and is not intended to be used as a log aggregator or processor.
* **Example**: `"logTransporter": true`

##### `messagebox`
* **Description**: Indicates if the adapter can receive system messages.
* **Type**: boolean
* **Possible values**: `true`, `false`

##### `notifications`
* **Description**: Defines notifications for the built-in notification system, allowing adapters to inform users about specific events or states.
* **Type**: array
* **Possible values**: scope, name, description, categories, severity, regex, limit
* **Example**:  
  `"notifications": [
  {
  "scope": "system",
  "name": {"en": "Low disk space", "de": "Wenig Speicherplatz"},
  "description": {"en": "The disk space is running low.", "de": "Der Speicherplatz wird knapp."},
  "categories": [
  {
  "category": "disk",
  "name": {"en": "Disk space warning", "de": "Warnung Speicherplatz"},
  "severity": "alert",
  "description": {"en": "Disk space on device is below 10%", "de": "Speicherplatz auf dem Gerät ist unter 10%"},
  "regex": ["Disk space below 10%"],
  "limit": 5
  }
  ]
  }
  ]`


##### `supportedMessages`
* **Description**: Object which defines, if the adapter supports receiving messages via sendTo. Additionally, it defines if specific messages are supported.
* **Type**: object
* **Possible values**: 
  - custom: `true`, `false`
  - deviceManager: `true`, `false`
  - notifications: `true`, `false`
* **Example**: `{ "supportedMessages": { "custom": true, "deviceManager": true } }`

    
### Object fields

objects - static objects for all instances of adapter (xxx.object) By installation of adapter (not the instance creation) some predefined objects (normally that describe something) can be created automatically. These objects must not depend on some specific instance and are common for all instances of this adapter. For example hm-rpc adapter has the structure description of all HomeMatic devices.

Additionally the new views can be defined. In SQL they are called "stored procedure" and in couchDB - views.

Note: do not mix with `vis` views.

For view definitions the javascript language is used. Here is the sample:

```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

Here are two views defined for hm-rpc adapter: `listDevices` and `paramsetDescription`.
They returns the set of filtered by view condition objects from data store. It can effective (if CouchDB used) request the specified list of objects.

To use view:

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
    {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
    function (err, doc) {
	    if (doc && doc.rows) {
		    for (var i = 0; i < doc.rows.length; i++) {
			    var id  = doc.rows[i].id;
			    var obj = doc.rows[i].value;
			    console.log('Found ' + id + ': ' + JSON.stringify(obj));
		    }
            if (!doc.rows.length) console.log('No objects found.');
	    } else {
		    console.log('No objects found: ' + err);
	    }
    }
);
```

Usage of `startkey` and `endkey` can be found on the same page too.

Note: usage of views is optional and demands from developer basic knowledge level about CouchDB.

### Instance object fields

Some specific objects or objects with type states can be defined in `instanceObjects` of `io-package.json`.

For every created instance all entries from `instanceObjects` field will be created.

For instance adapter `hm-rpc` creates state `updated` for every instance to give a signal to other adapter,
that some new devices are appeared in the data store and that they must be processed by `hm-rega`.

```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```

There is no need to give the full path of object and it cannot be done, because adapter instance is unknown.
You can use special word `%INSTANCE%` in `common.name` to show the it in the name of object. For instance:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Will be expanded to

```
"name": "Some new devices added in hm-rpc.0,
```

by creation of first instance.

### package.json

package.json is the npm packet standard description file and the full description can be found under https://docs.npmjs.com/files/package.json.

Short structure of `package.json`:

```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
    "myPacket1": "~0.3.1",
    "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```

!> All fields are mandatory. `devDependencies` should be inside too to enable the grunt tasks.

### Deploying

It is suggested to have the code on github. After the code is stable and lets to install adapter you can share you adapter to other user by asking them to install adapter as follow:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

If everything is OK and you have got positive feedback from users you can publish adapter on npm.
It would be good if before publishing you will create release on github.

Publishing can be done with following command:

```
npm publish
```

Call it in the adapter directory. Be sure, that you deleted all other files except required (e.g. `.idea`) or add them to `.gitignore` file.

Of course you must first create the account on npm

?> Note: you cannot publish twice the code with the same version. Increase version in `package.json` and `io-package.json` before publishing.

After the adapter is tested and other users find it useful, it can be taken into common repository, so it can be installed via `admin` adapter.

## How to create own adapter

Please check https://github.com/ioBroker/ioBroker.template for a template for your own adapter.

If you want to create a widget or an adapter with a widget please check https://github.com/ioBroker/ioBroker.example/tree/master/VIS for a template for your own adapter.

### Structure of main.js

```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

This line loads module `lib/utils.js`. It has common for all adapters function to find the root of `iobroker.js-controller`.
Because adapter can be installed in three different paths:

* `.../iobroker/node_modules/iobroker.adapterName` - this is standard path and suggested to use
* `.../iobroker.js-controller/node_modules/iobroker.adapterName` - used by debugging
* `.../iobroker.js-controller/adapter/adapterName` - old style (deprecated)

utils.js do nothing except looks for `iobroker.js-controller/lib/adapter.js` file and loads it.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

This line creates the object `adapter` with name `adapterName`. It loads all configuration for `adapterName.X` instance where X is the instance number of adapter.

`js-controller` starts an adapter as fork of own process with two parameters: instance and log level; like:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

It is all will be automatically processed in `adapter.js` and developer of the adapter must not care about it.

Adapter supports 3 other start flags:

* `--install` - Starts adapter even if no configuration exists. Used by adapter to execute some install procedure by installation of adapter.
* `--force` - Starts adapter even if it is disabled in configuration
* `--logs` - Show logs in the console, if they shown only in log table.

```
var myPacket1= require('myPacket1'); // add own module
```

Then you can load all other modules that required in adapter, like `fs`, `require` and so on.
Just do not forget to declare them in `package.json`.

### Options of adapter

You can create adapter object with just by name, like `utils.adapter('adapterName')` or with additional parameters, like:

```
var adapter = utils.adapter({
    name: 'adapterName',    // mandatory - name of adapter
    dirname: '',            // optional - path to adapter (experts only)
    systemConfig: false,    // optional - if system global config must be included in object
                            // (content of iobroker-data/iobroker.json)
        config: null,       // optional - alternate global configuration for adapter (experts only)
    instance: null,         // optional - instance of the adapter
    useFormatDate: false,   // optional - if adapter wants format date according to global settings.
                            // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,  // optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,     // optional - handler for subscribed objects changes
    message: null,          // optional - handler for messages for this adapter
    stateChange: null,      // optional - handler for subscribed states changes
    ready: null,            // optional - will be called when adapter is initialized
    unload: null,           // optional - will be called by adapter termination
    noNamespace: false      // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```

All handlers can be simulated by events (see below), like:

```
adapter.on('ready', function () {
    main();
});
```

### Attributes of adapter object

As you created `adapter` object with

```
var adapter = utils.adapter('adapterName');
```

following attributes will be created in this object instance:

* `name` - Name of adapter, e.g `adapterName`
* `host` - Host name, where the adapter instance runs
* `instance` - instance number of this adapter instance
* `namespace` - Namespace of adapter objects, e.g `adapterName.0`
* `config` - native part of adapter settings
* `common` - common part of adapter settings
* `systemConfig` - content of `iobroker-data/iobroker.json` (only if `options.systemConfig = true`)
* `adapterDir` - path to the adapter folder
* `ioPack` - content of `io-package.json`
* `pack` - content of `package.json`
* `log` - logger object
* `version` - adapter version
* `states` - (experts only)
* `objects` - (experts only)
* `connected` - if adapter connected to host

#### Most important events

```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
* adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

* // you can use the ack flag to detect if state is command(false) or status(true)
* if (!state.ack) {
* * adapter.log.info('ack is not set!');
* }
});
```

!> *Entry point*. Make all initialisations in main, because before "ready" there is no configuration.

```
adapter.on('ready', function () {
* main();
});
```

#### Logging

It is very important to have the ability to log the events for debug and controlling purposes. Following functions can be used to log the events:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

There is no need to indicate the origin or time of the message. These attributes will be added automatically, e.g.:

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Of course `console.log`, `console.debug` or `console.error` could be used too, but these messages will be visible only
if adapter started manually in console or programming IDE.

#### Instance configuration

There is an attribute of adapter object to read the configuration of the instance: `adapter.config`.
This object consist of `native` part of object `system.adapter.adapterName.X`. E.g. if `io-package.json` looks like:

```
{
   "common": {
       "name": "adapterName"
   },
   "native": {
       "location": "Stuttgart",
       "language": ""
   }
}
```

So the `adapter.config` is equal to:

```
{
   "location": "Stuttgart",
   "language": ""
}
```

and has the data entered by user in configuration dialog. You can access the **common **part of instance configuration with attribute "common" of object "adapter". E.g. for the shown io-package.json "adapter.common" will be:

```
{
   "name": "adapterName"
}
```

To access the ioBroker configuration (stored in file `iobroker-data/iobroker.json`) set the adapter option `systemConfig` to true.

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

To get the global date format the option `useFormatDate` must be set to true:

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

Date format will be available under adapter.dateFormat.

All other configurations can be read manually with `getForeignObject` function.
How to read state

There are two modes to read states in ioBroker adapter:

* event subscription (suggested)
* polling

To subscribe on own events the following command must be called:


`adapter.subscribeStates('*');` // subscribe on all variables of this adapter instance with pattern `adapterName.X.*`

`adapter.subscribeStates('memory*');` // subscribe on all variables of this adapter instance with pattern `adapterName.X.memory*`


To subscribe on other events:

`adapter.subscribeForeignStates('yr.*.forecast.html');` // subscribe on variable `forecast.html` of all adapter instances `yr`.

Wildcard "*" can be used in both functions.

After that you will get the event `stateChange` and can do something with this value.
After subscription you will not get the actual state, because events will come only on change.
To get the initial state you should perform "poll" one time at start (normally in "ready" event).

Polling To read own states at start or to read the values with interval use function `adapter.getState`, like here:

```
adapter.getState('myState', function (err, state) {

  adapter.log.info(
      'State ' + adapter.namespace + '.myState -' +
      '  Value: '    + state.val +
      ', ack: '      + state.ack +
      ', time stamp: '   + state.ts  +
      ', last changed: ' + state.lc
  );
});
```

Pay attention, that result will be returned asynchronous.

To read states of other adapters you should use `adapter.getForeignState` function. No wildcards are supported.

#### Commands and Statuses

We should distinguish between commands and statuses, when we are talking about states. "Command" has ack flag as false and will be sent by user (over vis, javascript-adapter, admin) to control the devices or specific adapter. Normally adapters (e.g. homematic) are subscribed on all own changes and if some state changes with ack=false, they will try to execute this command (e.g. light on).

"Status" has `ack` flag as true and indicate that it is from device or service.
E.g. if the weather adapter got new weather forecast, it will be published with `ack=true` or
if homematic thermometer measures new temperature, it will be published with `ack=true` too.
Even if the user physically will switch the light on, the new state will be published with `ack=true`.

`Ack=false` will be normally overwritten by execution after the response from device.

E.g. if the user in `vis` has pressed the button and sent command `hm-rpc.0.kitchen.light=ON`.
The Socket-io adapter will send to the `hm-rpc.0` instance the new state with `kitchen.light = {val: 1, ack: false}`.

Homematic adapter is subscribed for all states of `hm-rpc.0` and if the new state will be received with `ack=false`, it sends the new value to the physical switch.

Physical switch executes the command and sends to `hm-rpc` adapter the new own state ON.
The `hm-rpc.0` adapter publishes the new status of state `hm-rpc.0.kitchen.light={val: 1, ack: true}` (with time stamps).

This change will not be executed by hm-rpc adapter, because ack is true. And this is an acknowledgment from physical device.

#### How to write state

States can be written as commands or as statuses. For that `adapter.setState` and `adapter.setForeignState` must be used:

`adapter.setForeignState('otherAdapter.X.someState', 1);` // Control other adapter (there is no need to control own state, we can do it directly)

`adapter.setState('myState', 1, true);` // indicate new status of own state

`adapter.setState('myState', {val: 1, ack: true});` // the same as above

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

Note: Following commands are identical

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Structure of state

State is a javascript object with following attributes:

* `val`: Value of state (desired value or actual value)
* `ack`: direction flag. false for desired value and true for actual value. Default: false (command)
* `ts`: time stamp as the number of milliseconds between midnight of January 1, 1970 and the specified date. Result of method getTime() of Javascript object Date. Default: actual time.
* `lc`: last change time stamp. Same format as ts, but the time stamp of value change. It can be so that the value will be updated, but the value will stay the same. In this case lc will not be changed.
* `from`: name of the adapter instance, that set the value, e.g. "system.adapter.web.0" (In case of vis)
* `expire`: (optional) there is a possibility to set the expire timeout in seconds. After this period of time the variable will be set to "null". It will be used e.g. by "active" states of the adapter instances. If adapter instance will not trigger "active" state in 30 seconds it will be marked as down. To set state with expiration use following code setState('variable', {val: true, expire: 30})
* `q`: (optional) Quality. See here the description

Running modes of adapter

Adapter can run in different modes. The mode for adapter can me defined over common.mode attribute.

* `none` - this adapter will not be started.
* `daemon` - always running process (will be restarted if process exits)
* `subscribe` - is started when state system.adapter...alive changes to true. Is killed when .alive changes to false and sets .alive to false if process exits (will not be restarted when process exits)
* `schedule` - is started by schedule found in system.adapter...common.schedule - reacts on changes of .schedule by rescheduling with new state
* `once` - this adapter will be started every time the system.adapter.. object changed. It will not be restarted after termination.

Normally adapters should use mode daemon.

If adapter just checks something every X minutes it should use mode `schedule` and define cron schedule in common.schedule (e.g. `1 * * * *` - every hour)

#### How to read object

Objects can be read with getObject or getForeignObject command:

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
  }
});

adapter.getObject('myObject', function (err, obj) {

});
```

Functions are always asynchronous.

Objects of adapter must be organized in devices, channels and states.

See: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### How to write object

To write the objects generally two functions can be used: `setObject, setForeignObject`. But there are many help functions to modify objects:

* `extendObject, extendForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `createDevice, deleteDevice`
* `createChannel, deleteChannel`
* `createState, deleteState`
* `addStateToEnum, deleteStateFromEnum`

extendObject is just reads object, merges with given one and write object back.

Difference between `xxxObject` and `xxxForeignObject` is that `xxxObject` automatically extends the object id with `adapter.instance.` text.

Functions are always asynchronous.

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
    obj.native = {}; // modify object
    adapter.setForeignObject(obj._id, obj, function (err) {
      if (err) adapter.log.error(err);
    });
  }
});
```

#### info.connection

If the adapter establishes and monitors some connection (e.g. to controlled device), it should create and maintenance `info.connection` variable.

If it happens, the status of connection will be shown in the instance's list in `admin` and if desired,
the quality of states will be set up depends on the connection status.

## Functions
```
* setObject = function setObject(id, obj, callback)
* extendObject = function extendObject(id, obj, callback)
* setForeignObject = function setForeignObject(id, obj, callback)
* extendForeignObject = function extendForeignObject(id, obj, callback)
* getEnum = function getEnum(_enum, callback)
* getEnums = function getEnums(_enumList, callback)
* getForeignObjects = function getForeignObjects(pattern, type, enums, callback)
* findForeignObject = function findForeignState(id, type, callback)
* getForeignObject = function getForeignObject(id, callback)
* delObject = function delObject(id, callback)
* delForeignObject = function delForeignObject(id, callback)
* subscribeObjects = function subscribeObjects(pattern)
* subscribeForeignObjects = function subscribeObjects(pattern)
* setObjectNotExists = function setObjectNotExists(id, object, callback)
* setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback)
* createDevice = function createDevice(deviceName, common, _native, callback)
* createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback)
* createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
* deleteDevice = function deleteDevice(deviceName, callback)
* addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)
* deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback)
* deleteChannel = function deleteChannel(parentDevice, channelName, callback)
* deleteState = function deleteState(parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum('', parentDevice, parentChannel, stateName);
* getDevices = function getDevices(callback)
* getChannelsOf = function getChannelsOf(parentDevice, callback)
* getStatesOf = function getStatesOf(parentDevice, parentChannel, callback)
* addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)
* rmDir = function rmDir(path, callback)
* mkDir = function mkDir(path, mode, callback)
* readDir = function readDir(adapter, path, callback)
* unlink = function unlink(adapter, name, callback)
* rename = function rename(adapter, oldName, newName, callback)
* mkdir = function mkdir(adapter, dirname, callback)
* readFile = function readFile(adapter, filename, options, callback)
* writeFile = function writeFile(adapter, filename, data, mimeType, callback)
* formatDate = function formatDate(dateObj, isSeconds, _format)
* sendTo = function sendTo(objName, command, message, callback)
* sendToHost = function sendToHost(objName, command, message, callback)
* setState = function setState(id, state, callback)
* setForeignState = function setForeignState(id, state, callback)
* getState = function getState(id, callback)
* getStateHistory = function getStateHistory(id, start, end, callback)
* getForeignStateHistory = function getStateHistory(id, start, end, callback)
* idToDCS = function idToDCS(id)
* getForeignState = function getForeignState(id, callback)
* delForeignState = function delForeignState(id, callback)
* delState = function delState(id, callback)
* getStates = function getStates(pattern, callback)
* getForeignStates = function getForeignStates(pattern, callback)
* subscribeForeignStates = function subscribeForeignStates(pattern)
* unsubscribeForeignStates = function unsubscribeForeignStates(pattern)
* subscribeStates = function subscribeStates(pattern)
* getSession = function getSession(id, callback)
* setSession = function setSession(id, ttl, data, callback)
* destroySession = function destroySession(id, callback)
* getMessage = function getMessage(callback)
* lenMessage = function lenMessage(callback)
* setBinaryState = function setBinaryState(id, binary, callback)
* getBinaryState = function getBinaryState(id, callback)
* getPort = function adapterGetPort(port, callback)
* checkPassword = function checkPassword(user, pw, callback)
* setPassword = function setPassword(user, pw, callback)
* checkGroup = function checkGroup(user, group, callback)
* stop (common.mode: subscribe, schedule, once)
* terminate
* setInterval
* clearInterval
* setTimeout
* clearTimeout
* delay (since js-controller 4)
* log.debug(msg)
* log.info(msg)
* log.warn(msg)
* log.error(msg)
```

## Events

```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

### How to create instance

Before published to npm: copy into ioBroker/node_modules, go to `admin` and add instance After published at npm: go to `ioBroker/` and write `npm install iobroker.xxx --production --no-optional --logevel=error`, go to `admin` and add instance

## How to debug

* Start ioBroker
* Add instance of adapter
* Disable instance of adapter
* Start WebStorm
* Create Configuration for Debug with node.js
* Flags for application: `--force, instance, log level` (you can start the adapter as `node xxx.js 1 debug --force`, 1 is instance index (by default 0, debug is log level and `--force` means ignore "enabled: false" settings)

## admin.html

```
* function showMessage(message, title, icon)
* function getObject(id, callback)
* function getState(id, callback)
* function getEnums(_enum, callback)
* function getIPs(host, callback)
* function fillSelectIPs(id, actualAddr, noIPv4, noIPv6)
* function sendTo(_adapter_instance, command, message, callback)
* function sendToHost(host, command, message, callback)
* function fillSelectCertificates(id, type, actualValued)
* function getAdapterInstances(_adapter, callback)
* function getIsAdapterAlive(_adapter, callback)
* function addToTable(tabId, value, $grid, _isInitial)
* function enumName2Id(enums, name)
* function editTable(tabId, cols, values, top, onChange)
* function getTableResult(tabId, cols)
```

## Best practice
