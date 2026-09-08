## Wie richte ich ein eigenes SSL-Zertifikat ein?

Die Zertifikate liegen zentral in den
[Systemeinstellungen](https://www.iobroker.net/#de/documentation/admin/settings.md)
im Reiter **Zertifikate** und werden von admin, web, simple-api und socketio
benutzt.

Ab Werk sind `defaultPrivate` und `defaultPublic` eingetragen. Die sind in **jeder**
ioBroker-Installation gleich und damit nicht sicher. Sie verschlüsseln zwar, aber
prüfen lässt sich damit nichts.

Drei Wege zu einem eigenen Zertifikat:

* **Selbst erzeugt**: reicht im eigenen Netz, der Browser warnt aber jedes Mal.
* **Let's Encrypt**: kostenlos und automatisch erneuert, braucht aber eine von
  außen erreichbare Adresse und Port 80. Einzurichten im gleichnamigen Reiter.
* **Gekauft**: als Datei hinterlegen oder den Pfad angeben.

!> Ein neues Zertifikat zuerst mit dem **web**-Adapter ausprobieren, nicht mit dem
Admin. Sonst sperrt man sich unter Umständen selbst aus.

?> Wer nur von unterwegs auf ioBroker zugreifen möchte, braucht das alles nicht:
Der [iot-Adapter](https://www.iobroker.net/#de/adapters/adapterref/iobroker.iot/README.md)
kommt ohne offene Ports und ohne eigenes Zertifikat aus.
