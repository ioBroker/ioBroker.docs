---
title: Own adapter
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdev.md
hash: tjZ0IpeQA9cVp+SfHS+M3QMUoynw7Xeo8DVzEuxg1UE=
---
# Develop your own adapter

An adapter is a Node.js program that starts, monitors, and configures ioBroker. It connects a device, service, or function to the object tree: it creates objects, writes values to them, and reacts to values written by others.

Everything else is just technical know-how. Anyone who knows Node.js can write an adapter. What you additionally need to learn is manageable and is covered in this chapter.

## What makes an adapter special

An adapter is an npm package with a defined structure. It consists of four files:

| file                    | For what reason                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`          | The standard npm manifest: dependencies, startup file, scripts.                                                                                                                                             |
| `io-package.json`       | Everything ioBroker needs to know about the adapter: operating mode, configuration interface, default settings, objects that are created for each instance. See [io-package.json](/docs/dev/iopackage.md) . |
| `main.js`               | The program is started by ioBroker, logs in, does its work, and cleans up when it exits.                                                                                                                    |
| `admin/jsonConfig.json` | The configuration interface in the admin panel is described as JSON instead of HTML. See [JSON Config](/docs/dev/adapterjsonconfig.md) .                                                                    |

This includes a symbol, the translations, and the readme file.

## The CV of an institution

An adapter is not executed once, but rather operated as an **instance** . There can be multiple instances of the same adapter, each with its own configuration and its own branch in the object tree.

The usual procedure in the program:

- **`ready`** The instance starts. The configuration is read here (`this.config.<feld>` ), the connection was established and the user's own objects were created.
- **`stateChange`** Someone has written a value that the instance has subscribed to. Usually a command that is passed on to the device.
- **`message`** Another instance or script sends a request. See [Inter-instance messaging](/docs/dev/messagebox.md) .
- **`unload`** The instance will terminate. Stop the timer, close the connections, then call the callback. Skipping this step will leave processes that refuse to die.

How an instance is started is determined by...`common.mode` fixed: permanently ongoing (`daemon` ), according to schedule (`schedule` ), one-time (`once` ) and a few more special cases.

## The path from idea to adapter

**1. Check if it already exists.** A half-finished adapter that needs a partner is more valuable than a twelfth attempt at the same device. The [adapter list](/adapters) and [adapter requests](https://github.com/ioBroker/AdapterRequests/issues) provide this information.

**2. Create the framework.** The [Adapter Creator](https://adapter-creator.iobroker.in/) prompts for name, type, and operating mode and delivers a complete package including tests and GitHub configuration. The same can be done on the command line with

```bash
npx @iobroker/create-adapter@latest
```

Node.js version 18 or higher and npm version 9 or higher are required. The path in which it runs must not contain any spaces.

**3. Develop and test.** For this, there's the [dev-server](/docs/dev/devserver.md) : a small ioBroker installation in the project folder that restarts the adapter with every code change. No uploading to a production system, no messed-up apartment.

**4. Testing.** The framework includes tests that start the adapter and check whether it registers and shuts down correctly. See [Adapter Tests](/docs/dev/adaptertesting.md) .

**5. Publish.** First to npm, then to the ioBroker repository. The requirements for this are described under [Publishing Adapters](/docs/dev/adapterpublish.md) ; beforehand, it's advisable to run the [Adapter Checker](https://adapter-check.iobroker.in/) .

## Reading order

If you've never written an adapter before, it's best to read in this order:

1. [Recommendations for development](/docs/dev/bestpractices.md) : the principles that differentiate between an adapter and a script with an adapter name.
2. [io-package.json](/docs/dev/iopackage.md) : what ioBroker learns about the adapter.
3. [State roles](/docs/dev/stateroles.md) : how a value is named and categorized so that other adapters can understand it.
4. [JSON-Config](/docs/dev/adapterjsonconfig.md) : the configuration interface.
5. [Adapter reference](/docs/dev/adapterref.md) : the calls in detail.

## Further tools

| Tool                                                    | For what reason                                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Adapter Creator](https://adapter-creator.iobroker.in/) | Framework via a web form.                                                                         |
| [Adapter Checker](https://adapter-check.iobroker.in/)   | Check the repository against the requirements of the ioBroker repository.                         |
| [Translator](https://translator.iobroker.in/)           | Translates the adapter's text into the supported languages.                                       |
| `@iobroker/adapter-dev`                                 | Translation and construction as npm scripts in the project:`npm run translate` ,`npm run build` . |
| [dev-server](/docs/dev/devserver.md)                    | Development environment in the project folder.                                                    |

Questions about development belong in the [forum](https://forum.iobroker.net/category/8/entwicklung) , not in an issue on a different adapter. That's where the people who have already had the same problems hang out.