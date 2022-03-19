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
Connect to WireGuard hosts and grab connection information on peers. This adapter is intended to be a monitoring instance for your WireGuard hosts. 

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
  - User: The user which executes the script on the host (will be stored encrypted)
  - Password: Password for this user (will be stored encrypted)
  - sudo: whether the wg command should be executed using sudo or not (requires valid config of sudoers! -> see [security hints])
  - poll interval: pause between each poll in seconds (will also delay the first run after adapter start) 
* Translation page
    - Public Key: The public key of one of your peers
    - group name: A symbolic name for this peer
 

## How it works
* info.connection of the adapter is used to indicate that at least one WireGuard interface is online and reported by `wg show all`. If no Wireguard interface is online - nothing is reported. In that case an error gets logged and the adapters' traffic light turns yellow. 
* This adapter opens an ssh shell on every configured host, executes the `wg show all dump` command, drops the shell and parses the result.
* Since every public key is unique, the adapter uses them to translate the public key into user-friendly, readable and recognisable names.
* WireGuard unfortunately doesn't provide the "connected" state by itself. It only provides the last handshake information.
Since handshakes usually occur every 120 seconds - this adapter calculates the connected state that way, that it assumes a peer is connected when the last handshake is received
less than 130 seconds before.

## Security hints
> I hardly recommend the use of sudoers under Linux! 

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
  ```
  This setting allows the `<wireguard-monitoring-user>` on `ALL` hosts to execute the `wg show all dump` command from the directory `/usr/bin/` (may need to be changed on your distribution) without needing a password (`NOPASSWD`).
![Image](admin/sudoers_config.png)

## known issues
* none

## Changelog
### v1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### v1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### v1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### v1.0.0 (2022-02-25)
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
Copyright (c) 2022 grizzelbee <open.source@hingsen.de>
