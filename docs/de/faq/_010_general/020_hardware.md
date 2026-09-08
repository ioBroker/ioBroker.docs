## Auf welcher Hardware läuft ioBroker?

Überall dort, wo eine aktuelle Node.js-Version läuft: Raspberry Pi, Mini-PC,
NAS, Server, virtuelle Maschine.

Als Mindestausstattung gelten **2 GB RAM und 32 GB Speicherplatz**, empfohlen
werden 4 GB (besser 6 bis 8 GB) und 64 GB. Die vollständige Tabelle steht unter
[Anforderungen](/docs/install/requirements.md),
Empfehlungen zu einzelnen Geräteklassen unter
[Hardware](/docs/install/hardware.md).

Drei Dinge, an denen erfahrungsgemäß am meisten hängt:

* **Kein Dauerbetrieb auf einer SD-Karte.** ioBroker schreibt ständig. Eine
  SD-Karte hält das eine Weile aus und stirbt dann, meist ohne Vorwarnung. Auf
  einem Raspberry Pi gehört das System auf eine SSD.
* **Ein ordentliches Netzteil.** Ein großer Teil der Fehler, die wie
  Softwarefehler aussehen, sind Spannungseinbrüche.
* **Genug RAM.** Jede Instanz braucht Speicher. Wer viel vorhat, fängt nicht mit
  1 GB an.
