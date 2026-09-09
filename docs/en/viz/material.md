---
title: material
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/material.md
hash: DTcG9uO45nV6sjtvLceyvS2IdVttRjdZd7skFQvwTI8=
---
# Visualization with material

The adapter [material](/adapters/material) generates a user interface without requiring a single page to be drawn. It reads the [categories](/docs/basics/enums.md) and builds the view from them: **rooms** become pages, and **functions** become groups on them.

This makes it the opposite of vis: hardly any design freedom, but the surface is finished in minutes and remains up-to-date without any intervention.

## Requirement

The adapter **only** displays data points that are assigned to a room or function. Without assignments, the interface remains empty.

Ideally, each data point should belong to **both** categories: a space and a function. Only then can the adapter know where something is and what it does, and correctly categorize and display it.

How categories are assigned is explained in the [Categories](/docs/admin/enums.md) tab.

## Furnish

1. The adapter`material` Install in the [Adapter](/docs/admin/adapter.md) tab and create an instance.
2. Maintain the categories "Rooms and Functions" if you haven't already done so.
3. The surface via the associated`web` -instance, usually`http://<adresse>:8082/material/` .

!> The adapter can only be installed from npm, not directly from GitHub.

## If something is missing

If the interface does not display a device or displays it incorrectly, this is almost always due to the categories or the **role** of the data point. The adapter uses the role to determine whether something is a switch, a dimmer, or a measured value. Information on the available roles and their functions can be found under [Roles](/docs/basics/roles.md) .

The complete description with all settings can be found in the [adapter's documentation](/adapters/material) .

Material is one of several self-assembling surfaces. A comparison of the possibilities is given in the chapter [introduction](/docs/viz/README.md) .