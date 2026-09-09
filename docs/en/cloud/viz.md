---
title: Visualizations via the cloud
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/viz.md
hash: /r7ZrzcI0wv8r+GveNm7eexgP15bH4x7q0sJ1BTqGkQ=
---
# Visualizations via the cloud

A visualization that runs in a browser at home is initially inaccessible remotely. The obvious solution of opening a port in the router is the worst possible approach: the interface would then be exposed to the internet, and all that would protect it would be a password.

The planned route leads via the
[IoT adapter](/docs/cloud/iot.md)It establishes the connection from the inside out. The router remains closed, yet the interface is still accessible via the service's address.

## How it all fits together

The visualization itself is handled by an instance of the `web`The IoT adapter is delivered with this information. The IoT adapter passes this specific instance outwards. Its configuration allows you to select which specific instance to use. `web`-instance that should be.

This means that the same rules apply to external access as to access from home: the same interface, the same users, the same rights.

## Proceed

1. The [IoT adapter](/docs/cloud/iot.md)
   Set it up and check that the connection is established.
2. In its configuration the `web`-Select the instance under which the visualization runs.
3. At this `web`-instance
   [Registration](/docs/config/login.md)
   Turn it on and create users for the relevant people.
4. Try it from a mobile network, not your own Wi-Fi. Otherwise, you'll only be testing the route within your house.

Without login enabled, the interface would be accessible to anyone who knows the address. What a user is allowed to see and control is described below.
[Access management](/docs/config/userrights.md).

## borders

- Using the service takes some time. This isn't noticeable when operating switches or reading values, but it is for real-time video images.
- Embedded content from the local network does not work from outside the network. Anyone who embeds a camera image in their visualization using its local address will see a blank field when viewing remotely.
- The number of requests is limited depending on the package. An interface that reloads values every second consumes more resources than one that waits for changes.

Those who primarily use the interface on their phone should take a look at the
[official app](/docs/cloud/app.md)
Take a look. It follows the same path, but is designed for the phone.