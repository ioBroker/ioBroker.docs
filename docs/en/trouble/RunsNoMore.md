---
title: ioBroker is no longer running
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/RunsNoMore.md
hash: +IimqxVNeVMpPXhNnAWhm8X76aM2a2RJemrZvve2pNs=
---
# IoBroker is no longer running
It often comes up in the forum that ioBroker is no longer running. But that is a statement that carries just as much information as: my car is not driving.

You don't think that there can be 1000 reasons why a car doesn't drive: no fuel, dead battery, flat tires and, and, and...

ioBroker is very modular and you can fix each part pretty easily. The configuration files are taken out of the directory with Node.js packages and as long as this configuration directory is still intact, nothing serious happened to the ioBroker installation.

The first thing you notice is that ioBroker doesn't run if "admin" isn't running. But there is more or less clear algorithm how to check what is broken.
Check if js-controller is running:

**Linux:**

````
Linux: ps -A | grep iobroker
````

**Windows:**

Check if node.exe process is there in Process Explorer (show all processes)

Under linux something like this must be visible:

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

If it's not running, then try to start ioBroker with

**Linux:**

```
cd /opt/iobroker
iobroker start
```

or **Windows:**

```
cd C:\ioBroker
iobroker start
```

If it still doesn't work or error messages appear, you can try to start the js-controller manually.

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

If error messages appear, you can try to update “js-controller”.

If the js-controller is running, the TCP ports 9000 and 9001 must be occupied. This can be checked with the command:

```
netstat -n -a -p TCP
```

The following lines must be visible:

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

When using Redis it should look like this:

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

If nothing is visible (or only one), then the ports are probably occupied by other programs. You can change the ports in */opt/iobroker/iobroker-data/iobroker.json*. Or reconfigure another program.

## Reinstall an adapter or js-controller
If an adapter or js-controller was running and not after the update, then most likely something went wrong with the update. But you can easily install an adapter again. All you have to do is write in the console:

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

Or for the js controller:

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## Check or node.js and npm are installed correctly
If js-controller is not running, it could also be that node.js is not installed at all.
It is recommended to use a 14.x version of node.js.

The Node.js version 16.x has been tested as far as possible (as of May 5th, 2022), with 18.x there is no guarantee that it will work.

The commands

```
node -v
npm -v
```

must show the same version number. If it is not, then you should uninstall and reinstall node.js. Or check the search path.

The uninstallation and installation of Node.js is analogous to the manual ioBroker installation (on Raspberry and other Linux systems).

The necessary steps are described in detail HERE.

And here you can find information about other systems..
Check if admin adapter is running

First check if admin is activated:

```
cd /opt/iobroker
iobroker list instances
```

you should see a line like this:

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

If it says "disabled" instead of "enabled", you can enable adapters like this:

```
iobroker start admin
```

If the IP address is not correct, then write:

```
iobroker set admin.0 --bind 0.0.0.0
```

to allow on all IP addresses.

You can also change port:

```
iobroker set admin.0 --port 8081
```

or turn off SSL:

```
iobroker set admin.0 --secure false
```

Then the instance must be visible at the port (default 8081).

With

```
netstat -n -a -p TCP
```

you can check whether the line can be found:

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

If it's still not running then you can start it manually and see if there are any errors: cd /opt/iobroker node node_modules/iobroker.admin/admin.js --logs

It could also be something in the log. The log file can be found at ***/opt/iobroker/log/iobroker.YYYY-MM-DD.log***.

You can with the command

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

view the file. Of course, YYYY-MM-DD must be replaced with the current date. (“cat” is only possible under Linux)

## Install another instance from admin
If the settings in the admin console have been changed and you can no longer access the admin page, there is still the option of installing a second admin instance.

Therefore:

```
iobroker add admin --port 8089
```

To run.

Here 8089 is a port that is certainly free. Then you can reach admin at http://ip:8089.

After the settings are correct again, you should uninstall the new (second on port 8089) instance to save resources.

## Npm has disappeared
>! This is currently happening with Debian (Raspbian) Buster

Due to a problem with npm, it can happen that after an upgrade from Linux, in which nodejs is usually also upgraded within a main version (6.x; 8.x, 10.x), suddenly nothing works anymore.

For example, adapters can no longer be installed, the error message is ***npm not found***

In the cases please check in the console:

node -v npm -v

Usually now (as of July 30th, 2019) the node version is 8.15.0 and npm is not found.

The normal procedure of upgrading npm does not work because npm is not there. Therefore you have to uninstall node first and then reinstall it:

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

Normally npm 6.x should now be installed.

If another main version (not 10.x) of Node was previously installed, the packages on node 10 still have to be compiled

```
cd /opt/iobroker
npm rebuild
```