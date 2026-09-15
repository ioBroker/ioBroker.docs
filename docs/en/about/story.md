---
title: The story of ioBroker
lastChanged: 12.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/about/story.md
hash: biOoDvr4UoXFYTGxznp1rRLxO9hLTIrDp+MiIaJ1Sag=
---
# The story of ioBroker

It all started with a simple wish: a visualization of one's own home. From this grew a platform that now runs in many thousands of households, with adapters for almost every type of device and a community that is larger than the project itself. This page tells the story of how it got there, year by year.

## 2013: CCU.IO, the foundation stone

It all started with Homematic and the desire to finally have a clear overview of one's own devices. Sebastian Raff laid the foundation for the CCU.IO project this year. It was crucial for the integration of Homematic systems, and its architecture was therefore heavily based on Homematic.

We met through CCU.IO, and with it came the idea that underpins everything else: an open and flexible platform for home automation that is not tied to a single manufacturer.

![CCU.IO in 2013: the event list with motion detectors from your own home](../../de/about/media/ccu-io-2013.png)

_CCU.IO, 2013. Time, room, trade, name, type, value: the columns from back then describe the same things that ioBroker now calls objects and states._

## 2014: CCU.IO becomes ioBroker

A year later, around 150 people were using the project, and with that number of users, its limitations became apparent. CCU.IO had profound conceptual weaknesses that would have hampered long-term maintenance and further development. The values were stored in a JSON file; this was the project's standard, and for a system intended to grow, that's a dead end.

That's why we decided to create ioBroker. From the very beginning, the focus was on a highly modular structure that allows for flexible adaptation and expansion, rather than trying to fix an existing, organically grown architecture. The JSON file was replaced by a dedicated database, initially CouchDB, later Redis. ioBroker was intended to be a platform capable of meeting the challenges of the future.

Sebastian Raff left the project in 2014. His foundation supported everything that followed.

## 2016: Speaking and remote control

Two features are changing how ioBroker is used this year. Alexa integration brings voice control into the home, and the first cloud solution enables access from anywhere without having to open any ports on the router.

In the same year, Ingo Fischer ( [@apollon77](https://github.com/Apollon77) ) joins the core team. A project becomes a group.

## 2017: A company for infrastructure

Servers, domains, repositories, certificates: the more people use ioBroker, the less this infrastructure can depend on any single individual. With the support of Ortwin Tischler, the company behind ioBroker is therefore being created, whose task is precisely to secure the project's infrastructure.

Moritz Heusinger ( [@foxriver76](https://github.com/foxriver76) ) is joining the core team.

## In between: the foundation is growing

The years between the major milestones are the years in which the foundations become stable. Experience gained from working at Siemens flowed into the project and changed the perspective on maintainability and processes. React was chosen for the user interfaces, and a more robust testing strategy was added for the core system. Ingo and Moritz worked on the js-controller, the heart of the system, and the admin interface gradually evolved into what it is today.

![The admin around 2015: a table of instances](../../de/about/media/admin-2015.png)

_The admin around 2015: a list of instances, that was all that was needed back then._

![Admin 4 with tiles for each adapter](../../de/about/media/admin-4.png)

_Admin 4 includes tiles, material appearance, and an adapter catalog._

![Today's admin with the overview page](../../de/about/media/admin-heute.png)

_Today: an overview showing system status, adapters, instances and log at a glance._

## 2022: vis-2

This year, work begins on [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2) , the new visualization, and in the same year, a personal decision is made: resignation from Siemens and a full focus on ioBroker. vis-2 is released later that year.

## 2024: Ten years, and a meeting in Solingen

From 2014 to 2024, ioBroker celebrated its tenth anniversary. This milestone wasn't celebrated online, but for the first time in person: on November 9, 2024, at the Gläserne Werkstatt (Glass Workshop) in Solingen, at the first large ioBroker community meeting. Around 160 people attended, there were presentations, and many saw the faces behind the names they knew from the forum for the first time. The meeting was organized by Ingo Fischer and his team, with support from Shelly and Solingen Digital.

## Who makes ioBroker

ioBroker is the work of many hands: on the core, the adapters, the documentation, the forum, and the translations. Within the community, people know each other by their initials:

[@bluefox](https://github.com/GermanBluefox) , [@Apollon77](https://github.com/Apollon77) , [@foxriver76](https://github.com/foxriver76) , [@AlCalzone](https://github.com/AlCalzone) , [@arteck](https://github.com/arteck) , [@Garfonso](https://github.com/Garfonso) , [@simatec](https://github.com/simatec) , [@Firestorm](https://github.com/Feuersturm) , [@](https://github.com/Eistee82) Istee82 , [@Dutchman](https://github.com/DutchmanNL) , [@eric2905](https://github.com/Eric2905) , [@UncleSam](https://github.com/UncleSamSwiss) , [@Jey-Cee](https://github.com/Jey-Cee) , [@mcm1957](https://github.com/mcm1957) , [@ldittmar81](https://github.com/ldittmar81) , [@oelison](https://github.com/oelison) , [@klein0r](https://github.com/klein0r) , [@Homoran](https://github.com/Homoran)

and many, many other enthusiasts.

## The story continues

What is presented here as a review is primarily an invitation: ioBroker grows with the people who participate. Help is offered daily in the [forum](https://forum.iobroker.net/) , and anyone who would like to contribute can find an entry point in the ["Get Involved](/docs/community/README.md) " section.