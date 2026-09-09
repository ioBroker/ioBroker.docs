---
title: Categories
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/enums.md
hash: V8a4DF6h0klOJtf9+RX3B0dcAdkbKp4dWM+lFpOrYHI=
---
# Tab Categories

Categories sort data points by **rooms** and **functions**A data point can be in both: the ceiling light in the living room belongs to the room.
_Living room_ and for its function _Light_.

This rider was formerly called **Enumerations**Internally, the objects are still called... `enum.rooms.*` and `enum.functions.*`.

The benefit lies in everything that builds upon it: visualizations, voice control via Alexa or Google Home, and scripts accessing groups of devices through it. "Turn off the living room lights" only works if the room and its function are properly defined.

## functions

<img src="media/admin_kategorien_funktionen.png" alt="Der Reiter Kategorien mit den Funktionen" width="900" />

On the left are the categories with their associated data points, on the right the object tree. A data point is assigned by dragging it from the tree onto the desired category.

Above the list is a **filter**, buttons to expand and collapse all categories and a **+**, which creates a new category. **+**
The top left button creates a top-level category.

## Rooms

<img src="media/admin_kategorien_raeume.png" alt="Der Reiter Kategorien mit den Raeumen" width="900" />

The rooms work the same way. Using the pencil icon next to the tab name, you can change the name, icon, and color of a category. The color changes the entire group, making the list easier to read.

Rooms may be nested: _Ground floor_ can _Living room_ and _Kitchen_
contain.

A data point can also be assigned directly in the tab.
[objects](/docs/admin/objects.md) about the columns _Space_ and _functio&#x6E;_&#x42;oth methods modify the same objects.

!> Assignments belong at the **Data point**, not to the channel or the device, otherwise the evaluating adapters will not know which value to switch.