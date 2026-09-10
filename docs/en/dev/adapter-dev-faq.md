---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapter-dev-faq.md
title: Frequently Asked Questions about Adapter Development
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: WlpOBYGcwiu++SpCIndv54w52pM2YZvBlNw14sl8pSs=
---
# Frequently Asked Questions about Adapter Development

Short answers to questions asked in the forum and the Discord channel`#adapter` They appear repeatedly. A detailed description can be found on the linked page.

## Publish

### In which files is the version number located?

In`package.json` and`io-package.json` , including the change notice in`io-package.json` (`common.news` ) and in the`README.md` Nobody has to maintain it by hand:`npm run release patch` Complete all tasks at once, apply the label, and push it to GitHub. See [Publishing](/docs/dev/adapterpublish.md) .

The numbers follow the [semantic versioning](https://semver.org/lang/de/) :`patch` for bug fixes,`minor` for new features,`major` for changes that affect existing installations.

### I've released it. When will users see the new version?

Not immediately. The administrator doesn't reread the repository on every request, but at intervals. If you don't want to wait, click the refresh icon under **Adapters** in the administrator interface or run the command in the console.`iobroker update` on.

Furthermore, a new version first appears in the repository.`latest` . Into the`stable` It will only migrate after a probationary period without any error messages.

### How does a new adapter even get into the repository?

Via a pull request at [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) . Requirements and procedure are described under [Publishing](/docs/dev/adapterpublish.md) .

## Development and testing

### How do I test the adapter without disassembling an installation?

Using the [dev-server](/docs/dev/devserver.md) , it creates its own small installation in the project folder, starts the adapter from there, and reloads it whenever there is a change.

### How do I find a runtime error?

`dev-server debug` during development,`iobroker debug <adapter>.0` on a running system. Both describe [debugging](/docs/dev/adapterdebug.md) .

### How do I test the compact mode?

In compact mode, the adapter does not run as a separate process, but within the process of the js-controller. For this to work, the file must have two starting methods:

```js
if (require.main !== module) {
    module.exports = options => new MeinAdapter(options);
} else {
    new MeinAdapter();
}
```

It is enabled in the instance configuration under **Compact Mode** . It is important that the adapter is in`unload` -The handler really cleans up everything: timers, connections, observers. Otherwise, something will remain in the shared process.

### How do I receive crash notifications?

The plugin [@iobroker/plugin-sentry](https://github.com/ioBroker/plugin-sentry) provides information on what data is transmitted and how users can disable it under [Crash Reports](/docs/ecosystem/sentry.md) .

## configuration

### How do I validate user input in the adapter code?

Via the [message box](/docs/dev/messagebox.md) . The configuration page sends the values with`sendTo` The adapter sends the request to the instance, checks it, and returns the result. The [JSON configuration](/docs/dev/adapterjsonconfig.md) includes ready-made elements that do exactly that.

For the instance to accept messages, it must`"messagebox": true` in the block`common` the`io-package.json` stand.

### Do I need to do another one?`index_m.html` build?

No. Configuration pages are now described as [JSON configurations](/docs/dev/adapterjsonconfig.md) . The old HTML pages will still work, but they are no longer intended for use with a new adapter.

## Files and data

### I am writing a file and receive a warning in the log.

The message reads in essence:

```
writeFile will not write this file (picture.jpg) in future versions:
<adapter> is not an object of type "meta"
```

Files need an object of type`meta` as a storage location. The easiest way is to place it over`instanceObjects` to:

```json
"instanceObjects": [
    {
        "_id": "",
        "type": "meta",
        "common": {
            "name": "Dateien von <Adapter>",
            "type": "meta.user"
        },
        "native": {}
    }
]
```

Downloading and saving looks like this:

```js
const antwort = await axios.get(url, { responseType: 'arraybuffer' });
await this.writeFileAsync(this.namespace, 'picture.jpg', antwort.data);
```

Why`common.type` and`common.role` And what that has to do with data backup is explained under [Saving Files](/docs/dev/filestorage.md) .

### Why isn't my condition being recorded?

Because the corresponding object is missing.`setState` If no object exists, a warning is issued. Objects are detected at startup.`setObjectNotExists` created, see [adapter reference](/docs/dev/adapterref.md) .

## Something is missing here

This collection thrives on contributions. If you have a question that's missing here and have found an answer, you can add it using the edit link in the top right corner. A link to an adapter where the solution can be found is more helpful to others than a lengthy explanation.