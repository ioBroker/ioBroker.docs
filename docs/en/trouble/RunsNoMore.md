---
title: ioBroker is no longer running
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/RunsNoMore.md
hash: Ga+TPCA7P3xhbRocb1+yR2lK4xmO52LrGRtPR4FOCqs=
---
# IoBroker is no longer running
It often comes up in the forum that ioBroker is no longer working. But that is a statement that contains just as much information as: my car doesn't run.

You don't think that there can be 1000 reasons why a car doesn't run: no fuel, battery empty, flat tires and, and, and...

ioBroker is very modular and you can fix any part pretty easily. The configuration files are taken out of the directory with Node.js packages and as long as this configuration directory is still intact, nothing serious has happened to the ioBroker installation.

The first thing you notice is that ioBroker is not running if “admin” is not running. But there is a more or less clear algorithm for checking what is broken.
Check if js-controller is running:

**Linux:**

````
Linux: ps -A | grep iobroker
````

**Windows:**

Check if node.exe process is there in Process Explorer (show all processes)

Under Linux something like this should be visible:

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

If it doesn’t work, try starting ioBroker with

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

If it still doesn't work or you get error messages, you can try starting the js-controller manually.

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

If you get error messages, you can try updating “js-controller”.

If the js-controller is running, then TCP ports 9000 and 9001 must be occupied. You can check this with the command:

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

If you don't see anything (or only one), then the ports are probably being used by other programs. You can change the ports in */opt/iobroker/iobroker-data/iobroker.json*. Or reconfigure another program.

## Reinstall an adapter or js-controller
If an adapter or js-controller was running and then stopped after the update, then something probably went wrong with the update. But you can easily reinstall an adapter. All you have to do is type in the console:

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

Or for the js-controller:

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## Check if node.js and npm are installed correctly
If js-controller is not running, it could be that node.js is not installed.
It is recommended to use a 14.x version of node.js.

Node.js version 16.x has been largely tested (as of May 5, 2022), but there is no guarantee that 18.x will work.

The orders

```
node -v
npm -v
```

must show the same version number. If this is not the case, then you should uninstall node.js and reinstall it. Or check the search path.

The uninstallation and installation of Node.js is analogous to the manual ioBroker installation (on Raspberry and other Linux systems).

The necessary steps are described in detail HERE.

And here you can find information about other systems..
Check whether the admin adapter is running

First check if admin is activated:

```
cd /opt/iobroker
iobroker list instances
```

you should see a line like this:

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

If it says “disabled” instead of “enabled”, you can enable the adapter like this:

```
iobroker start admin
```

If IP address is incorrect, then write:

```
iobroker set admin.0 --bind 0.0.0.0
```

to allow on all IP addresses.

You can also change port:

```
iobroker set admin.0 --port 8081
```

or disable SSL:

```
iobroker set admin.0 --secure false
```

Then the instance must be visible on the port (default 8081).

With

```
netstat -n -a -p TCP
```

you can check whether the line can be found:

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

If it still doesn't work, you can start it manually and see if there are any errors: cd /opt/iobroker node node_modules/iobroker.admin/admin.js --logs

There may also be something in the log. The log file can be found at ***/opt/iobroker/log/iobroker.YYYY-MM-DD.log***.

You can use the command

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

display the file. Of course, YYYY-MM-DD must be replaced with the current date. (“cat” is only possible under Linux)

## Install another instance from the admin
If the settings of the admin console have been changed and you can no longer access the admin page, there is still the possibility of installing a second admin instance.

For that:

```
iobroker add admin --port 8089
```

carry out.

Here, 8089 is a port that is definitely free. You can then reach the admin at http://ip:8089.

After the settings are correct again, you should uninstall the new (second on port 8089) instance to save resources.

## Npm has disappeared
>! Something like this is currently happening with Debian (Raspbian) Buster

Due to a problem with npm, it can happen that after an upgrade of Linux, which usually also includes an upgrade of nodejs within a main version (6.x; 8.x, 10.x), suddenly nothing works anymore.

For example, adapters can no longer be installed and the error message is ***npm not found***

In these cases please check in the console:

node -v npm -v

Usually (as of July 30, 2019) the node version is 8.15.0 and npm is not found.

The normal procedure to upgrade npm does not work because npm is not there. Therefore you have to uninstall node first and then reinstall it:

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

By now you should have npm 6.x installed.

If another main version (not 10.x) of Node was previously installed, the packages still need to be compiled on node 10

```
cd /opt/iobroker
npm rebuild
```