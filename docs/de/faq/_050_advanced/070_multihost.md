## Was ist ein Multihost-System?

Mehrere Rechner, die zusammen eine ioBroker-Installation bilden. Einer ist der
**Master**: bei ihm liegen die beiden Datenbanken. Die übrigen Hosts holen sich
die Daten von dort und führen nur ihre eigenen Instanzen aus.

Sinnvoll ist das vor allem aus zwei Gründen:

* **Räumlich**: ein zweiter Rechner steht dort, wo der Funkstick hingehört.
* **Lastverteilung**: rechenintensive Adapter laufen auf eigener Hardware.

Verwaltet wird alles über den Admin des Masters; im Reiter
[Instanzen](/docs/admin/instances.md) lässt
sich nach Host filtern, im Reiter
[Hosts](/docs/admin/hosts.md) steht jeder
Rechner mit seinen Werten.

!> Der Master ist der einzelne Punkt, an dem alles hängt. Fällt er aus, steht das
ganze System. Ein Multihost-Aufbau macht die Installation **nicht**
ausfallsicherer, sondern zunächst nur größer.

Ausführlich: [Multihost](/docs/config/multihost.md)
