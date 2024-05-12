![Logo](admin/Logo_of_WireGuard.svg)

# ioBroker.wireguard
![Logo](admin/wireguard.svg)

[![NPM version](https://img.shields.io/npm/v/iobroker.wireguard.svg)](https://www.npmjs.com/package/iobroker.wireguard)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wireguard.svg)](https://www.npmjs.com/package/iobroker.wireguard)
![Number of Installations](https://iobroker.live/badges/wireguard-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/wireguard-stable.svg)
![Test and Release](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)
[![NPM](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)](https://nodei.co/npm/iobroker.wireguard/)

## wireguard adapter for ioBroker
Connect to WireGuard hosts and grab connection information on peers. This adapter is intended to be a monitoring instance for your WireGuard hosts. It supports plain installations and docker as well. 

> If you like this adapter and consider supporting me <br/>
> [![Donate with payPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Prerequisites
* running ssh server on every host to monitor
* The wg executable (wg.exe on Windows) needs to be in the search path
* username and password of a user with the permission to execute the wg command 

## Installation steps
* Check whether your WireGuard host is running an ssh server. If not - install one. If you can open a commandline using putty (or similar) you're running an ssh server.
* make sure the user you like to use for this is able to execute `wg` (same for Windows and Linux). **This user needs admin privileges!**
* To sum up the test: open a remote command line, log in and execute the `wg show` command. If you receive a proper result you're done and can use these data to run the adapter.  
* Do this for every host you like to monitor
* Install the adapter and configure it

## Config options
Since WireGuard internally only uses the public keys to identify peers, but they are pretty inconvenient to read and recognize for humans the translation page was added. Feel free to add public keys and Names to it to get the names integrated into the object tree.

* Main page
  - Name: Just a symbolic name for the host, since it's more convenient and better memorable than it's IP address
  - Host address: IP address of the host. A fqdn or dns name works also. If you're running WireGuard and ioBroker on the same host you can just use `localhost` as IP.
  - Port: Port number of your ssh server. Default: 22
  - User: The user which executes the script on the host (will be stored encrypted)
  - Password: Password for this user (will be stored encrypted)
  - sudo: whether the wg command should be executed using sudo or not (requires valid config of sudoers! -> see [security hints])
  - Docker: Executes a `docker exec`command to reach a wireguard server inside a docker container. Please check if it fits your needs or whether you may switch to a supported container.
  - poll interval: pause between each poll in seconds (will also delay the first run after adapter start)
  - Container: Name of your docker container. Often "wireguard", but may differ especially when running more than one on a single server
* Translation page
    - Public Key: The public key of one of your peers
    - group name: A symbolic name for this peer
* Config files page
  - Name: Must be the same as on the Main page 
  - Interface: Name of the interface stored in this config file (wg0, wg1, ...)
  - config file: fully qualified path and name of the config file for this interface (/etc/wireguard/wg0.conf, ...)

### executed command line depends on checkboxes:
* No checkbox checked: `wg show all dump` will be executed (for root-like users and use of the SetUID-Bit)
* Sudo checkbox is checked: `sudo wg show all dump` will be executed (works with proper sudoers line)
* Docker checkbox is checked: `docker exec -it wireguard /usr/bin/wg show all dump` will be executed
* Sudo and Docker checkboxes are checked: `sudo docker exec -it wireguard /usr/bin/wg show all dump` will be executed

> If you use WireGuard in a docker container, I assume you are familiar enough with both technologies and security concepts to configure your system to execute the shown commands in a way that doesn't ask for any password.  

### Docker 
Basically everything said about regular installations also applies for docker and works the same way.
Except the needed checkboxes to get the proper command executed and the needed sudoers line. If you use WireGuard inside 
a docker container you may need sudoers lines similar to this:
```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * remove
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * allowed-ips *
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg syncconf * * 
```
This adapter expects the name `wireguard` for your WireGuard container and the `wg` command in `/usr/bin/`inside the container. 
These values currently can't be customized.

## How it works
* info.connection of the adapter is used to indicate that at least one WireGuard interface is online and reported by `wg show all`. If no Wireguard interface is online - nothing is reported. In that case an error gets logged and the adapters' traffic light turns yellow. 
* This adapter opens an ssh shell on every configured host, executes the `wg show all dump` command, drops the shell and parses the result.
* Since every public key is unique, the adapter uses them to translate the public key into user-friendly, readable and recognisable names.
* WireGuard unfortunately doesn't provide the "connected" state by itself. It only provides the last handshake information.
Since handshakes usually occur every 120 seconds - this adapter calculates the connected state that way, that it assumes a peer is connected when the last handshake is received
less than 130 seconds before.

## Security hints
> I highly recommend the use of sudoers under Linux! 

These security hints rely mainly on linux since it's security system is more complex than the windows one. On a Windows server you'll simply need to use an administrative user. 
Since the `wg` command (which is executed to grab the state of WireGuard) requires administrative permissions, think well of what you are doing here and how you configure the user you place in config.
To protect these credentials as well as possible both - username and password - are encrypted.

Basically there are three ways to execute the command:
* use an administrative user (root or similar). This will work but expose your entire server in case the credentials get lost/stolen.
* use of SetUID-Bit: By setting this bit (as far as I understood) each and every user is allowed to execute the flagged file with administrative privileges without needing any password. **This includes hackers**. So setting this bit on the wg command exposes the entire wg-command with all it's power. If you like to do so execute `chmod u+s /usr/bin/wg` as an administrator.  
* use of sudoers: From my perspective, the most secure way is to set up a new simple user with basic privileges and add a simple line to the sudoers file which allows this user to execute the needed command without entering a password - and ONLY THIS command. Please refer to the documentation of your distribution for proper information on editing the sudoers file and using visudo. The screenshot below shows what needs to be added to the file. `wireguard-monitoring-user` is the user of your choice. The rest needs to be exactly like you see.
  ```
  #iobroker.wireguard adapter
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * remove
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * allowed-ips *
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg syncconf * * 
  ```
  This setting allows the `<wireguard-monitoring-user>` on `ALL` hosts to execute the `wg show all dump` command from the directory `/usr/bin/` (may need to be changed on your distribution) without needing a password (`NOPASSWD`).
![Image](admin/sudoers_config.png)

## known issues
* none

## Changelog
### **WORK IN PROGRESS**

### 1.6.4 (2024-05-08)
* (grizzelbee) Upd: Dependencies got updated

### 1.6.3 (2024-04-16)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Removed annoying warning when setting null or undefined values (introduced in v1.6.2)
* (grizzelbee) Upd: Requiring at least admin v6.13.16

### 1.6.2 (2024-03-26)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: fixed sentry issues WIREGUARD-2B & WIREGUARD-2C
* (grizzelbee) Upd: Adapter requires at least node 18.x

### 1.6.1 (2023-09-14)
* (mcm1957) Fix: [#90](https://github.com/Grizzelbee/ioBroker.wireguard/pull/90) adapter-core 3.x.x is known to fail during installation at node 14 as npm 6 fails to install peerDependencies. So this adapter requires node 16 or newer
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: removed some old news entries in io-package file

### 1.5.11 (2023-08-30)
* (grizzelbee) Fix: [#88](https://github.com/Grizzelbee/ioBroker.wireguard/issues/88) Avoid warning: Cannot read properties of undefined (reading 'at') when user- or devicename is empty

### 1.5.10 (2023-08-17)
* (grizzelbee) Fix: Adapter doesn't crash anymore when user or device name is missing in config.

### 1.5.9 (2023-08-12)
* (grizzelbee) Fix: First device of any user was missing in users viewing
* (grizzelbee) New: Added an icon to peers, users, peer and user

### 1.5.8 (2023-08-11)
* (grizzelbee) Fix: Interface is now correctly set to offline if host is not reachable. 

### 1.5.7 (2023-08-10)
* (grizzelbee) Fix: Added missing icon file
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy
* (grizzelbee) Fix: Another icon fix

### 1.5.2 (2023-08-09)
* (grizzelbee) Fix: Adapter does not crash anymore when host isn't reachable
* (grizzelbee) Fix: Added .releaseconfig file 
* (grizzelbee) Fix: Added icon to interface-device
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy

### 1.5.1 (2023-08-08)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.wireguard/issues/65) No names in object tree
* (grizzelbee) Fix: [#64](https://github.com/Grizzelbee/ioBroker.wireguard/issues/64) Online state of interface isn't set correctly if more than one server is queried
* (grizzelbee) Upd: Dependencies got updated

### 1.5.0 (2023-06-27)
* (grizzelbee) Deprecated: The current peer name/description will be dropped in one of the next versions. So please move over to Username/Device config.
* (grizzelbee) New: Splitted Peer names in config in user and device names; So that you are able to group devices by user
* (grizzelbee) New: Some new data fields: connectedPeers, connectedPeersCount, connectedUsers, connectedUsersCount and connection states per user
* (grizzelbee) Fix:  [#61](https://github.com/Grizzelbee/ioBroker.wireguard/issues/61) Fixed continuous recreation of objects
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Dropped support for NodeJS 12
* (grizzelbee) Upd: Added support for NodeJS 18

### 1.4.1 (2022-10-26)
* (grizzelbee) New: Showing number of currently connected peers for each interface

### 1.4.0 (2022-09-09)
* (grizzelbee) New: [#37](https://github.com/Grizzelbee/ioBroker.wireguard/issues/37) Added config options for port and docker container name
* (grizzelbee) Chg: Moved over to new jsonConfig Admin UI

### 1.3.2 (2022-09-07)
* (grizzelbee) New: [#38](https://github.com/Grizzelbee/ioBroker.wireguard/issues/38) Fixed "Adapter doesn't come online" bug caused by pseudo-tty settings 

### 1.3.1 (2022-06-26)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added button to resume a single peer

### 1.3.0 (2022-06-25)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added buttons to suspend single and restore all peers of an interface
* (grizzelbee) Chg: Changed polling log entry from info to debug 
* (grizzelbee) Upd: dependencies got updated

### 1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### 1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### 1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### 1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### 1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### 1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### 1.0.0 (2022-02-25)
* (grizzelbee) New: Added individual online state indicator for each interface
* (grizzelbee) fix: Improved some data roles
* (grizzelbee) fix: Improved documentation

### v0.9.5 (2022-02-22)
* (grizzelbee) New: dropped use of wg-json script - not needed anymore
* (grizzelbee) New: making internal use of wg show all dump command and self parsing the result
* (grizzelbee) New: Added windows support by using the wg show all command
* (grizzelbee) Upd: moved dependency **admin** to globalDependency as requested during adapter review

### v0.9.2 (2022-02-20)
* (grizzelbee) Fix: removed unnecessary secret from index_m.html file
* (grizzelbee) Fix: Using info.connection of adapter to indicate that at least one interface is online.
* (grizzelbee) Fix: Updated adapter icon

### v0.9.1 (2022-02-19)
* (grizzelbee) New: Improved optical quality of admin page - no technical improvements

### v0.9.0 (2022-02-18)
* (grizzelbee) New: Improved documentation
* (grizzelbee) New: Username and password for WireGuard hosts are getting encrypted now

### v0.8.0 (2022-02-17)
* (grizzelbee) New: admin extended with second page
* (grizzelbee) New: data file is getting parsed
* (grizzelbee) New: data tree is getting populated
* (grizzelbee) New: entire basic functionality is implemented
* (grizzelbee) New: added plugin sentry

### v0.2.0 (2022-02-16)
* (grizzelbee) New: admin is working as expected
* (grizzelbee) New: first steps in backend

### v0.1.0 (2022-02-14)
* (grizzelbee) working on admin

### v0.0.1
* (grizzelbee) initial release


## sentry.io
This adapter uses sentry.io to collect details on crashes and report it automated to the author.
The [ioBroker.sentry plugin](https://github.com/ioBroker/plugin-sentry) is used for it. Please refer to
the [plugin homepage](https://github.com/ioBroker/plugin-sentry) for detailed information on what the plugin does, which information is collected and how to disable it, if you don't like to support the author with you're information on crashes.

### Disclaimer
This project is not related to WireGuard in any way. The name WireGuard and the WireGuard logo are only used to refer to this project and are the property of their owners. They are not part of this project.


## License
MIT License


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Copyright
Copyright (c) 2024 grizzelbee <open.source@hingsen.de>
