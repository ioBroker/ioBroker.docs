---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/states.md
title: States and data points
hash: MOsvNxcXWYjRz8dmEGJh+aRa220Vu/VeRkYJYlt2zFQ=
---
# States and data points
A **data point** consists of a static object of the "state" type and a dynamic state (state).

Are properties of a state

 * val - current value
 * ack - Flag that shows the confirmation of the value by the target system
 * ts - Unix time stamp of the last update of the status (in milliseconds)
 * lc - Unix time stamp of the last change in value (in milliseconds)
 * q - [quality] (../ dev / objectsschema.md # states)
 * from - (optional) source (adapter instance) of the last update
 * user - (optional) user name, who was the last to write the value.
 * c - (optional) comment
 * expire - (optional) time in seconds when the value is reset to `null`.

?> ***This is a placeholder*** .<br><br> Help with ioBroker and expand this article. Please note the [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.