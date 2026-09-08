## Was ist ein Adapter, was eine Instanz?

Ein **Adapter** ist ein Programm, das ein System an ioBroker anbindet, einen
Hersteller, ein Protokoll oder einen Dienst. Er ist zunächst nur das Programm und
tut von sich aus nichts.

Eine **Instanz** ist ein laufendes Exemplar davon, mit eigener Konfiguration. Erst
sie arbeitet. Vom selben Adapter kann es mehrere Instanzen geben, etwa eine
`hm-rpc.0` für Funk und eine `hm-rpc.1` für den drahtgebundenen Zweig.

Der Name der Instanz ist zugleich der Namensraum, unter dem ihre Objekte liegen:
alles von `javascript.0` beginnt mit `javascript.0.`.

Angelegt werden Instanzen im Reiter
[Adapter](/docs/admin/adapter.md), verwaltet
im Reiter [Instanzen](/docs/admin/instances.md).
