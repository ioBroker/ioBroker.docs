---
title: Node.js and npm
lastChanged: 13.10.2025
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/nodejs.md
hash: 38xyrXo/C1YwLwdNL8ZM8DCwvUJijKb+SFiC8oRyvO4=
---
With the iobroker installation script, a separate installation of Node.js and npm is no longer necessary on the recommended Linux systems! See [Installation under Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker and its adapters are primarily written in the JavaScript programming language. Since a computer cannot execute JavaScript directly, a runtime environment is required – this is provided by Node.js.

Debian- and Ubuntu-based distributions are recommended.

Currently, ioBroker recommends the LTS version **Node.js 22**. Odd-numbered versions must not be used.

## Standard update of Node.js
Starting with js-controller 5.5.x, a new console command for updating Node.js is available:

```
iobroker nodejs-update
```

This command automatically downloads and installs the recommended LTS version **Node.js 22** as well as the corresponding npm.

If you want to specifically switch to a different version (e.g., Node.js 24), specify the desired version as a parameter:

```
iobroker nodejs-update 24
```

## Alternative manual installation
If manual installation or a specific version is desired, use the Nodesource repository:

```
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For a different version, adjust `setup_22.x` accordingly (e.g. `setup_24.x`).