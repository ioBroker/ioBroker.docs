## Was ist der js-controller?

Der js-controller ist der Kern von ioBroker. Er startet und stoppt die Instanzen,
verwaltet die beiden Datenbanken (Objekte und Zustände) und überwacht das System.
Ohne ihn läuft nichts.

Er ist kein Adapter und taucht deshalb nicht in der Adapterliste auf. Seine
Version steht im Reiter
[Hosts](/docs/admin/hosts.md), sein Update
läuft über
[ioBroker updaten](/docs/install/updateself.md).

!> Vor einem Update des js-controllers gehört ein
[Backup](/docs/config/backup.md) angelegt.
