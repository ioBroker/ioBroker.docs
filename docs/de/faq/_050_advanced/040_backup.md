## Sollte ich ein Backup machen? Wovon?

Ja, und zwar bevor etwas passiert, nicht danach.

ioBroker bringt dafür den Adapter **BackItUp** mit, im Admin unter dem Menüpunkt
**Backup**. Er sichert die beiden Datenbanken (Objekte und Zustände), die
Konfiguration und auf Wunsch auch die Daten angebundener Systeme, eine
HomeMatic-CCU, Grafana, InfluxDB, die Skripte des javascript-Adapters.

Sinnvoll ist:

* ein täglicher automatischer Lauf,
* die Ablage **außerhalb** des ioBroker-Rechners (NAS, Netzlaufwerk, Cloud),
* und mindestens einmal ein Rückspieltest. Ein Backup, das noch nie
  zurückgespielt wurde, ist eine Vermutung.

Ein Backup gehört außerdem **vor** jedes größere Update, besonders vor einem
Update des js-controllers oder einem Wechsel der Node.js-Hauptversion.

Ausführlich: [Backup](/docs/config/backup.md)
