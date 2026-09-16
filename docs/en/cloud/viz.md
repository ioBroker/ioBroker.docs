---
title: Visualizations via the cloud
lastChanged: 16.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/viz.md
hash: qT6pVfk0SUAudcH/LOt48zmVyqeDnC/bpuhtNWgwCKs=
---
# Visualizations via the cloud

A visualization that runs in a browser at home is initially inaccessible remotely. The obvious solution of opening a port in the router is the worst possible approach: the interface would then be exposed to the internet, and all that would protect it would be a password.

The intended route uses the **cloud** adapter, the remote access adapter. It establishes the connection from the inside out. The router remains closed, yet the interface is still accessible via the service's address.

Not to be confused with the [IoT adapter](/docs/cloud/iot.md) . That one is responsible for voice assistants, services, and MCP access, not for remote access.

## How it all fits together

The visualization itself is handled by an instance of the`web` The adapter is delivered. The cloud adapter passes this exact instance outwards. Its configuration allows you to select which one.`web` -instance that should be.

This means that the same rules apply to external access as to access from home: the same interface, the same users, the same rights.

## Proceed

1. Set up the **cloud** adapter and check that the connection is established.
2. In its configuration the`web` -Select the instance under which the visualization runs.
3. At this`web` -Enable [login](/docs/config/login.md) in the instance and create users for the relevant persons.
4. Try it from a mobile network, not your own Wi-Fi. Otherwise, you'll only be testing the route within your house.

Without login enabled, the interface would be accessible to anyone who knows the address. [Access control settings](/docs/config/userrights.md) define what a user is allowed to see and do.

## borders

- Using the service takes some time. This isn't noticeable when operating switches or reading values, but it is for real-time video images.
- Embedded content from the local network does not work from outside the network. Anyone who embeds a camera image in their visualization using its local address will see a blank field when viewing remotely.
- The number of requests is limited depending on the package. An interface that reloads values every second consumes more resources than one that waits for changes.

Anyone who primarily uses the interface on their phone should check out the [official app](/docs/cloud/app.md) . It follows the same approach but is designed specifically for phones.