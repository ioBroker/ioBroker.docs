---
title: material
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/material.md
hash: DTcG9uO45nV6sjtvLceyvS2IdVttRjdZd7skFQvwTI8=
---
# Visualization with material

The adapter
[material](/adapters/material)
It creates a user interface without requiring a single page to be drawn. It reads the
[Categories](/docs/basics/enums.md) and builds the following view from it: **Rooms** become pages **functions** to groups on it.

This makes it the opposite of vis: hardly any design freedom, but the surface is finished in minutes and remains up-to-date without any intervention.

## Requirement

The adapter shows **only** Data points are displayed that are assigned to a room or function. Without assignments, the interface remains empty.

Ideally, every data point should be included. **both** Categories, i.e., a room and a function. Only then does the adapter know where something is and what it does, and can correctly categorize and display it.

How the assignment is done is explained in the tab.
[Categories](/docs/admin/enums.md).

## Furnish

1. The adapter `material` in the rider
   [adapter](/docs/admin/adapter.md)
   Install and create an instance.
2. Maintain the categories "Rooms and Functions" if you haven't already done so.
3. The surface via the associated `web`-instance, usually
   `http://<adresse>:8082/material/`.

!> The adapter can only be installed from npm, not directly from GitHub.

## If something is missing

If the interface does not display a device or displays it incorrectly, it is almost always due to the categories or the **role** of the data point. The adapter recognizes whether something is a switch, a dimmer, or a measured value based on the role. Information on the different roles and their functions can be found below.
[Roll](/docs/basics/roles.md).

The full description with all settings is available in the
[Adapter documentation](/adapters/material).

Material is one of several self-assembling surfaces. A comparison of the possibilities is available in the
[Introduction](/docs/viz/README.md) of the chapter.