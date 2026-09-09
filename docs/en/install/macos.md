---
title: macOS
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/macos.md
hash: vCO7dFWZpG2M3bU2UAEuJhWFKfIt4gZNl+8pPqnCq4E=
---
# ioBroker on macOS

ioBroker runs on macOS because Node.js runs there. However, it's not the intended way to run it continuously.

**For a home automation system that needs to run reliably, macOS is the wrong choice.** The installation script, the forum instructions, and the troubleshooting tools are all designed for Debian and its derivatives. If you're stuck with a Mac, you're better off using [Docker](/docs/install/docker.md) or a virtual machine with Linux than installing directly on the system.

macOS is useful for two purposes: for experimentation and for developing adapters.

## For experimentation and development

The prerequisite is a current LTS version of Node.js, most easily obtained via [Homebrew](https://brew.sh) or a version control system like...`nvm` Which version is currently recommended can be found under [Node.js & npm](/docs/install/updatenode.md) .

Then in a separate directory:

```bash
mkdir iobroker && cd iobroker
npm install iobroker.js-controller
npx iobroker setup first
npx iobroker start
```

The interface of the admin adapter is then located under`http://localhost:8081` Available once it is installed and started:

```bash
npx iobroker add admin
```

?> The`iob` The shortcut is not created this way. Therefore, the commands are routed via...`npx iobroker ...` from the installation directory.

## What to expect

- Adapters that rely on Linux tools or on`systemd` Access is not possible or only partially possible.
- Connected hardware – wireless dongles, serial adapters – behaves differently under macOS and is hardly documented in the forum.
- Automatic startup on boot-up must be configured manually.

## The better way on a Mac

Developing your own adapter doesn't require a full installation anyway, but rather the`dev-server` , which sets up an encapsulated ioBroker environment for exactly one adapter. For home use: a dedicated, energy-efficient device running Linux is required – see [Hardware](/docs/install/hardware.md) .