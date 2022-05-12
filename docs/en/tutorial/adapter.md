---
title: Manage adapters
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/adapter.md
hash: b14VKmtsTBtQx6FeYrZ5aIVC3KjWqCr596Aq978bx2M=
---
# Basics of using adapters
The installation of adapters and instances at ioBroker takes place in several stages.

These terms are often confused. This page aims to shed some light by explaining how the most important administrative tasks at ioBroker should be carried out and what is behind them.

## Administrative tasks
### Installing a new adapter
The actual installation loads the data required for using the adapter from the server to the local host. This data remains "current" at the time of installation until it is updated.

**About the admin**

This function is not available via the admin, it is automatically prefixed when creating an instance (instantiation).

**Via Console**

``iobroker install AdapterName``

### Creation of an instance of an adapter
To be able to use an adapter in ioBroker you need one (or more) instances of this adapter. These instances are configured in the Admin via the Instances tab.

**About the admin**

If you want to create an instance of an adapter, you can do this by clicking on the (+) in the Admin tab in the tile of the corresponding adapter at the bottom left.

![create instance](../../de/tutorial/media/Instance_new.gif)

**Via Console**

``iobroker add AdapterName``

If the necessary files for the adapter are not yet on the host, an iobroker install AdapterName is automatically executed first. Only then is the instance created.

***Via the console via npm (for experts only!)***

``cd /opt/iobroker``

``npm install iobroker.AdapterName``

**This version should only be used if all other methods fail for whatever reason.**

<span style="color:red">Danger! On newer installations, using npm install directly will cause post-installation permissions issues or fail. It is recommended to use the iobroker commands.!!</span>

### Upgrading an adapter
If there is a new version of an adapter, it can be updated. It also happens that adapters require a specific version of another adapter. Therefore, it makes sense to always keep all adapters up to date

**About the admin**

If an adapter is upgraded, the title bar of the corresponding tile changes to green. The new version number then appears in green on the tile under "Available version" and the upgrade icon to the left of it. If you want to upgrade this adapter now, click on this icon.

Two processes then run in the background, the actual upgrade of the adapter files and then the upload of the files to the instances.

![adapter update](../../de/tutorial/media/Adapter_upgrade.gif)

**Via Console**

``iobroker upgrade AdapterName``

### Upload adapter files
This function is only required in special cases. If the above procedure is used, this function is not necessary.

this function is only necessary if experienced users who know what they are doing change files themselves, or if a beta version is loaded from Github

Via the admin To do this, the expert mode must be activated in the Admin tab. Then further icons appear in the tile. The arrow pointing up (3rd icon from the right) executes this upload.

![adapter update](../../de/tutorial/media/Adapter_upload.gif)

**Via Console**

``iobroker upload AdapterName``

### Downgrade an adapter
If there are problems with a new version, you can downgrade an adapter again.

**About the admin**

To downgrade, you first have to switch to expert mode and then call up the list of available versions:

![adapter update](../../de/tutorial/media/Adapter_downgrade.gif)

This list shows all versions released by the developer for this function.

Please click on the desired version there.

**Via Console**

``iobroker install AdapterName@ver.si.on``

Where ***AdapterName*** is the name of the desired adapter as listed in iobroker update, and ***ver.si.on*** is the appropriately formatted version number.

***Via the console via npm (only for experts!)***

``cd /opt/iobroker``

``npm install iobroker.AdapterName@ver.si.on``

**This version should only be used if all other methods fail for whatever reason.**

<span style="color:red">Danger! On newer installations, using npm install directly will cause post-installation permissions issues or fail. It is recommended to use the iobroker commands.!!</span>

## Additional important information
### The adapter list in the admin
In fact, there is only a list of the adapters available in the selected repository (main settings). What is displayed here is not yet on the host.

This list is updated daily on the server at around 2 a.m. and updated online when the admin is called. If there is no connection to the server, for whatever reason, this list only contains the adapters that are already installed or cannot be loaded at all.

### The different installation sources
The question keeps popping up as to why people are talking about a specific version but not offering it for an update. Therefore, the background to this should be explained again here:

**There are three tiers of adapter release**

* Repository stable, everything stable and tested
* Repository latest, not fully tested yet
* Github, developer, partly <span style="color:red">beta versions or even unfinished</span>

versions </span>

These levels can all have the same version if not much is changed, but there can also be larger jumps in the various repositories or Github.

**The repository** from which you want to be offered your adapter versions is specified in the system settings in the subpage [main settings](../admin/settings.md#Haupteinstellungen).

The repositories available for this are listed in the subpage [repositories](../admin/settings.md#Verwahrungsorte).

**The developer or beta versions** from Github are installed via the [Octocat icon](../admin/adapter.md#die-icons-im-einzelnen) #5.

Either simply in the ***Github*** pull-down menu, or by entering the address of the Github repository under the ***any*** tab. This is particularly the case with "external" adapter developers.

<span style="color:red">**An installation of GitHub should only be carried out after consultation with the developer.**</span>

### Installing from Github
( <span style="color: red">only for experts!</span> )

Github should only be installed by experts. There are only beta versions here, or what is worse, unfinished versions. <span style="color:red">Their installation can destroy the entire ioBroker installation!</span>

If an update is carried out via GitHub (Octocat icon) anyway (or recommended by the maintainer of the repository for troubleshooting via the forum), the new files are only saved locally, but not supplied to the instances. Therefore, for versions of the js-controller below 1.5, an upload must then be carried out manually.

To do this, expert mode must be activated in the Admin tab. Then further icons appear in the tile. The arrow pointing up (3rd icon from the right) executes this upload.